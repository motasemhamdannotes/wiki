

[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)

- [Full blue team notes and reference](https://buymeacoffee.com/notescatalog/e/142868)
- [BTL1 Study Notes](https://buymeacoffee.com/notescatalog/e/327370)
- [Blue Team Labs Cheat Sheet](https://buymeacoffee.com/notescatalog/e/520305)
# Analyst & Defender Reference

## 01 · Shell Style & Timestamps

During incident response, every shell session should carry a visible timestamp. When you're capturing screenshots, writing up a timeline, or correlating actions across machines, having the date and time baked into your prompt removes ambiguity and makes your evidence more defensible. The three common shells on a responder's toolkit each require a slightly different approach.

### CMD Timestamp

The `setx` command writes the new prompt value to the registry so it persists across sessions. The `$H$H$H` sequence is three backspace characters to remove the microseconds portion of the time display. The `$_` and `--$g` give a visual line break so the actual command input appears on a fresh line below the timestamp and path.

```cmd
setx prompt $D$S$T$H$H$H$S$B$S$P$_--$g
```

### PowerShell Timestamp

Create (or open) your PowerShell profile and insert a custom `prompt` function. This embeds the current date and time before every prompt, helping you correlate actions with log timestamps later. Remember that the execution policy must allow scripts before the profile will load.

```powershell
# Create profile if it doesn't exist
New-Item $Profile -ItemType file -Force

# Insert this function into the profile file
function prompt { "[$(Get-Date)]" + " | PS " + "$(Get-Location) > " }

# Allow profile scripts to run
Set-ExecutionPolicy RemoteSigned
```

### Bash Timestamp

Open `.bashrc` and replace the `PS1` variable. The snippet below colours the prompt purple, shows day-month-year and time with timezone, then displays only the last two directories to keep the prompt readable. The `source ~/.bashrc` command reloads the configuration immediately.

```bash
sudo nano ~/.bashrc
# Replace PS1 with:
PS1='\[\033[00;35m\][`date +"%d-%b-%y %T %Z"`] ${PWD#"${PWD%/*/*}/"}\n\[\033[01;36m\]-> \[\033[00;37m\]'
source ~/.bashrc
```

---

## 02 · Windows — OS Queries

Understanding the baseline of a machine — its hostname, domain membership, OS version, patch level, and hardware — is the first step in any investigation. These queries establish context before you start hunting.

### Get Fully Qualified Domain Name

```powershell
([System.Net.Dns]::GetHostByName(($env:computerName))).Hostname

# Get just the domain name
(Get-WmiObject -Class win32_computersystem).domain
```

### OS and PowerShell Version Summary

```powershell
$Bit = (get-wmiobject Win32_OperatingSystem).OSArchitecture
$V = $host | select-object -property "Version"
$Build = (Get-WmiObject -class Win32_OperatingSystem).Caption
write-host "$env:computername is a $Bit $Build with Pwsh $V"
```

### Hardware and Disk Info

BIOS, processor, model, and disk space can all be relevant during forensics — particularly when checking for virtualization indicators or unusual hardware that may indicate a compromised system.

```powershell
# BIOS Info
gcim -ClassName Win32_BIOS | fl Manufacturer, Name, SerialNumber, Version

# Processor
gcim -ClassName Win32_Processor | fl Caption, Name, SocketDesignation

# Computer Model
gcim -ClassName Win32_ComputerSystem | fl Manufacturer, Systemfamily, Model, SystemType

# Disk space in GB
gcim -ClassName Win32_LogicalDisk |
Select -Property DeviceID, @{L='FreeSpaceGB';E={"{0:N2}" -f ($_.FreeSpace /1GB)}}, @{L="Capacity";E={"{0:N2}" -f ($_.Size/1GB)}} | fl
```

### Time Info

Accurate time is critical for correlating logs across machines and with SIEM data. The human-readable form is useful for screenshots; the machine-comparable form is ideal for programmatic comparisons.

```powershell
# Human-readable timestamp
Get-Date -UFormat "%a %Y-%b-%d %T UTC:%Z"

# Machine-comparable UTC format (great for log comparisons)
[Xml.XmlConvert]::ToString((Get-Date).ToUniversalTime(), [System.Xml.XmlDateTimeSerializationMode]::Utc)

# Compare local vs UTC
$Local = get-date; $UTC = (get-date).ToUniversalTime()
write-host "LocalTime: $Local"; write-host "UTC: $UTC"
```

### Patch Level

When verifying that a patch has been applied, start with `get-hotfix`. If that doesn't show the expected KB, go to the Microsoft support page for the patch, find a file it should have updated (like `EventsInstaller.dll`), and manually compare the file's `LastWriteTimeUtc` on the host. A day or two of discrepancy between the Microsoft date and the host date is normal and should not cause alarm — what matters is that the file is present.

```powershell
# Show all patches sorted by date
get-hotfix | select-object HotFixID, InstalledOn | Sort-Object -Descending -property InstalledOn | format-table -autosize

# Find why an update failed
$Failures = gwmi -Class Win32_ReliabilityRecords
$Failures | ? message -match 'failure' | Select -ExpandProperty message

# Manually verify a patch file exists and check its timestamp
$file = 'EventsInstaller.dll'; $directory = 'C:\windows'
gci -Path $directory -Filter $file -Recurse -force | sort-object -descending -property LastWriteTimeUtc | fl *
```

---

## 03 · Windows — Account Queries

Account activity is one of the primary indicators of compromise in a Windows environment. Attackers routinely create new accounts, elevate existing ones, or abuse machine accounts (`$` suffix) because those accounts are frequently overprivileged and fall below the radar of analysts who focus only on human user accounts.

### Users Recently Created in Active Directory

Run this on a Domain Controller. A creation time of 2am or any weekend timestamp is immediately suspicious and worth investigating. Adjust the `-7` to expand or narrow the search window.

```powershell
import-module ActiveDirectory
$When = ((Get-Date).AddDays(-7)).Date
Get-ADUser -Filter {whenCreated -ge $When} -Properties whenCreated | sort whenCreated -descending
```

### Hone in on a Suspicious User

Use the `SamAccountName` from the query above to pull all properties of a specific account. The `LastLogonDate`, `PasswordLastSet`, `Enabled`, and `MemberOf` fields are particularly valuable.

```powershell
import-module ActiveDirectory
Get-ADUser -Identity HamBurglar -Properties *
```

### Local Enabled Accounts

```powershell
Get-LocalUser | ? Enabled -eq "True"
```

### Who Is Currently Logged In

```powershell
qwinsta   # show current sessions on this machine
quser     # alternative
```

### Find All Logged-In Users Across AD

For enterprise-wide visibility, the `Get-UserSession.ps1` and `Get-RemotePSSession.ps1` scripts by YossiSassi are recommended. Be aware that running these across a large AD will generate significant data.

### Evict a User (Emergency Response)

When an adversary has compromised a user account and is actively using it, the response is to force them out of existing sessions, change the password immediately (twice — once to invalidate any cached or known credentials, once to set the real new one), and optionally disable the account. Change the password twice because an adversary who knows the current password can sometimes race you to reauthenticate even during a password reset.

```powershell
# Show sessions, then target the session ID
qwinsta
logoff 2 /v

# Change password twice for AD accounts
$user = "lizzie"; $newPass = "HoDHSyxkzP-cuzjm6S6VF-7rvqKyR"
Set-ADAccountPassword -Identity $user -Reset -NewPassword (ConvertTo-SecureString -AsPlainText "6;wB3yj9cI8X" -Force) -verbose
Set-ADAccountPassword -Identity $user -Reset -NewPassword (ConvertTo-SecureString -AsPlainText "$newPass" -Force) -verbose

# For local (non-domain) machines
net user frank "lFjcVR7fW2-HoDHSyxkzP"

# Disable an AD account
$user = "lizzie"
Disable-ADAccount -Identity "$user"
(Get-ADUser -Identity $user).enabled   # verify
Enable-ADAccount -Identity "$user" -verbose  # re-enable when ready
```

### Disable a Local Account

```powershell
Disable-LocalUser -name "bad_account$"
```

### Evict from a Group

Good for rapidly removing a compromised account from `Administrators` or remote management groups without fully disabling the account.

```powershell
$user = "erochester"
remove-adgroupmember -identity Administrators -members $User -verbose -confirm:$false
```

### Machine Accounts in Interesting Groups

Adversaries frequently exploit machine accounts because they are often poorly monitored. This command surfaces any computer accounts that are members of groups they should not be in — a sign of misconfiguration or active exploitation.

```powershell
Get-ADComputer -Filter * -Properties MemberOf | ? {$_.MemberOf}

# Reset machine account password (deprives adversary of obtained credentials)
Reset-ComputerMachinePassword
```

### All Users' PowerShell History

Windows 10 and later PowerShell saves the last 4096 commands to a per-user file. During an IR you want to read all users' histories, not just the current shell's history. This loop walks all user profile paths and prints each history file in turn.

```powershell
$Users = (Gci C:\Users\*\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadline\ConsoleHost_history.txt).FullName
$Pasts = @($Users)
foreach ($Past in $Pasts) {
  write-host "`n----User Pwsh History Path $Past---`n" -ForegroundColor Magenta
  get-content $Past
}

# Also check the system account history
cat c:\windows\system32\config\systemprofile\appdata\roaming\microsoft\windows\powershell\psreadline\consolehost_history.txt
```

---

## 04 · Windows — Service Queries

Services are a common persistence mechanism. Adversaries install malicious services, or hijack existing ones by modifying their binary path. The key queries here expose what is running, what executable backs it, and — critically — services whose binary path sits outside of `System32`, which is worth investigating even though it doesn't guarantee malice.

### Show All Running Services and Their Binaries

```powershell
# List services with status
get-service | Select Name, DisplayName, Status | sort status -descending | ft -Property * -AutoSize | Out-String -Width 4096

# Show the underlying executable for each running service
Get-WmiObject win32_service | ? State -match "running" | select Name, DisplayName, PathName, User | sort Name | ft -wrap -autosize
```

### Investigate a Specific Service

```powershell
$Name = "eventlog"
gwmi -Class Win32_Service -Filter "Name = '$Name' " | fl *
```

### Kill a Service

```powershell
Get-Service -DisplayName "meme_service" | Stop-Service -Force -Confirm:$false -verbose
```

### Hunt for Sneaky Services

Adversaries have been observed registering services whose binaries live outside `System32`. Querying the registry directly (rather than relying on the Service Manager UI, which can be bypassed) gives a more reliable view. Filter out `System32` results first to reduce noise, but remember that placing malware in `System32` is also possible.

```powershell
Get-ItemProperty -Path "HKLM:\System\CurrentControlSet\services\*" |
ft PSChildName, ImagePath -autosize | out-string -width 800

# Filter out System32 to surface anomalies more quickly
Get-ItemProperty -Path "HKLM:\System\CurrentControlSet\services\*" |
where ImagePath -notlike "*System32*" |
ft PSChildName, ImagePath -autosize | out-string -width 800
```

---

## 05 · Windows — Network Queries

Network visibility is essential during an IR. The combination of process-to-connection mapping, DNS cache inspection, BITS transfer auditing, and hosts file integrity checking together paint a picture of who or what a machine has been communicating with.

### TCP Connections with Process and Command Line

This is one of the most powerful single queries in the Blue Team Notes. It shows the local and remote IP/port, the process name, and the full command line of the process owning each connection — far more informative than `netstat -b` alone.

```powershell
Get-NetTCPConnection |
select LocalAddress, localport, remoteaddress, remoteport, state,
  @{name="process"; Expression={(get-process -id $_.OwningProcess).ProcessName}},
  @{Name="cmdline"; Expression={(Get-WmiObject Win32_Process -filter "ProcessId = $($_.OwningProcess)").commandline}} |
sort Remoteaddress -Descending | ft -wrap -autosize

# Search/filter by a specific application (e.g., AnyDesk)
... | Select-String -Pattern 'anydesk'
```

### Internet Connections Sorted by Time Established

```powershell
Get-NetTCPConnection -AppliedSetting Internet |
select-object -property remoteaddress, remoteport, creationtime |
Sort-Object -Property creationtime | format-table -autosize
```

### Unique Remote IPs — Surface Anomalies

Sorting and de-duplicating remote IP addresses is extremely effective at making unusual destinations stand out against the background of regular traffic to known services.

```powershell
(Get-NetTCPConnection).remoteaddress | Sort-Object -Unique
```

### Hone In on a Specific IP

```powershell
Get-NetTCPConnection | ? {($_.RemoteAddress -eq "1.2.3.4")} |
select-object -property state, creationtime, localport, remoteport | ft -autosize
```

### UDP Connections

```powershell
Get-NetUDPEndpoint | select local*, creationtime, remote* | ft -autosize
```

### Kill a Connection

```powershell
stop-process -verbose -force -Confirm:$false (Get-Process -Id (Get-NetTCPConnection -RemoteAddress "1.2.3.4").OwningProcess)
```

### Check Hosts File (Potential DNS Hijacking)

Malware sometimes modifies the hosts file to redirect traffic for banking sites or update servers to attacker-controlled IPs. The timestamp alone is not trustworthy, but a recently modified hosts file combined with anomalous DNS entries is a strong indicator.

```powershell
gc -tail 4 "C:\Windows\System32\Drivers\etc\hosts"     # last 4 lines (most important)
gc "C:\Windows\System32\Drivers\etc\hosts"              # full file
gci "C:\Windows\System32\Drivers\etc\hosts" | fl *Time* # check timestamps
```

### DNS Cache — Catch Unusual Destinations Including C2

The DNS cache captures every hostname the machine has resolved, including C2 domains. Filter out your known internal naming conventions so that unusual or external domains stand out more clearly. If a suspicious IP appears, take it to WHOIS or VirusTotal for further investigation.

```powershell
Get-DnsClientCache | out-string -width 1000

# Filter out known-good internal naming patterns to reduce noise
Get-DnsClientCache |
? Entry -NotMatch "workst|servst|memes|kerb|ws|ocsp" |
out-string -width 1000
```

### IPv6 — Deprioritise (Reduce MitM Attack Surface)

Since Windows Vista, the OS prioritises IPv6 over IPv4. This behaviour can be abused for man-in-the-middle attacks. Rather than disabling IPv6 entirely (which can cause stability issues), it is better to change the registry value that controls prioritisation. A full network-level fix should be made at the DHCP server.

```powershell
# Check if machine prioritises IPv6
ping $env:COMPUTERNAME -n 4   # IPv6 address in output = it prioritises IPv6

# De-prioritise IPv6 via registry
New-ItemProperty "HKLM:\SYSTEM\CurrentControlSet\Services\Tcpip6\Parameters\" -Name "DisabledComponents" -Value 0x20 -PropertyType "DWord"
Set-ItemProperty "HKLM:\SYSTEM\CurrentControlSet\Services\Tcpip6\Parameters\" -Name "DisabledComponents" -Value 0x20
# Restart computer for effect
```

### BITS Transfers — Data Exfiltration Detection

Background Intelligent Transfer Service (BITS) is a common living-off-the-land mechanism for both downloading malware and exfiltrating data, because it uses legitimate Windows infrastructure and persists across reboots. Filter out known-good BITS jobs (Windows Update, Office updates, OEM telemetry) and specifically hunt for Upload transfers, which are almost always suspicious in an enterprise context.

```powershell
Get-BitsTransfer | fl DisplayName, JobState, TransferType, FileList, OwnerAccount, BytesTransferred, CreationTime, TransferCompletionTime

# Filter known-good jobs and focus on uploads (potential exfil)
Get-BitsTransfer |
? TransferType -match "Upload" |
fl DisplayName, JobState, TransferType, FileList, OwnerAccount, BytesTransferred, CreationTime, TransferCompletionTime
```

---

## 06 · Windows — Remoting & RDP Queries

Remoting protocols are prime lateral movement channels. Knowing who has open WinRM sessions, where RDP connections are originating, and whether any certificates are expired or suspicious is critical in an active investigation.

### PowerShell Remoting Sessions

```powershell
Get-PSSession

# Deep WinRM session query — includes client IP, runtime, and inactivity
get-wsmaninstance -resourceuri shell -enumerate |
select Name, State, Owner, ClientIP, ProcessID, MemoryUsed,
  @{Name = "ShellRunTime"; Expression = {[System.Xml.XmlConvert]::ToTimeSpan($_.ShellRunTime)}},
  @{Name = "ShellInactivity"; Expression = {[System.Xml.XmlConvert]::ToTimeSpan($_.ShellInactivity)}}
```

The `ClientIP` field reveals the originating IP of the WinRM session. The `ShellRunTime` shows how long the session has been active in HH:MM:SS — a session that has been running for hours without user interaction is a red flag.

### Remoting Permissions

```powershell
Get-PSSessionConfiguration | fl Name, PSVersion, Permission
```

### Check Constrained Language Mode

PowerShell Constrained Language Mode limits the available commands and language features. While it can be trivially bypassed by sophisticated adversaries, knowing whether it is configured is useful baseline information.

```powershell
$ExecutionContext.SessionState.LanguageMode
```

### RDP Settings

```powershell
# Check if RDP is enabled
if ((Get-ItemProperty "hklm:\System\CurrentControlSet\Control\Terminal Server").fDenyTSConnections -eq 0) {write-host "RDP Enabled"} else {"RDP Disabled"}

# Block RDP immediately (and disable the firewall rule)
Set-ItemProperty -Path 'HKLM:\System\CurrentControlSet\Control\Terminal Server' -name "fDenyTSConnections" -value 1
Disable-NetFirewallRule -DisplayGroup "Remote Desktop"
```

### Query RDP Event Logs

RDP logs are complex but two event logs are particularly useful. Event ID 1149 in `TerminalServices-RemoteConnectionManager/Operational` indicates a successful RDP connection and includes the source IP. Event ID 21 in `TerminalServices-LocalSessionManager/Operational` records session logons. Look for any public IP addresses making inbound RDP connections — this indicates the service is exposed to the internet.

```powershell
get-winevent -path "./Microsoft-Windows-TerminalServices-RemoteConnectionManager%4Operational.evtx" |
? id -match 1149 | sort Time* -descending | fl time*, message

get-winevent -path "./Microsoft-Windows-TerminalServices-LocalSessionManager%4Operational.evtx" |
? id -match 21 | sort Time* -descending | fl time*, message
```

### Current RDP Sessions

```powershell
qwinsta
qwinsta /counter   # with session statistics
```

### Check Certificates

Expired certificates in active use are a surprisingly common finding. Use the `-ExpiringInDays 0` flag to surface all already-expired certificates without sorting through the full store.

```powershell
gci "cert:\" -recurse | fl FriendlyName, Subject, Not*
gci "cert:\*" -recurse -ExpiringInDays 0 | fl FriendlyName, Subject, Not*   # expired only
```

---

## 07 · Windows — Firewall Queries & Endpoint Isolation

Understanding the firewall state helps identify policy gaps, and having a ready "code red" isolation command is essential for quickly cutting off a compromised machine while preserving the state of the system for forensics.

### Firewall Profiles and Rules

```powershell
# List profile names
(Get-NetFirewallProfile).name

# Show enabled rules for a specific profile
Get-NetFirewallProfile -Name Public | Get-NetFirewallRule | ? Enabled -eq "true"

# Stack filters: enabled + inbound
Get-NetFirewallRule -Enabled True -Direction Inbound

# Show disabled rules (may reveal gaps an adversary exploited)
Get-NetFirewallRule | ? Enabled -notmatch "true"
```

### Code Red — Isolate an Endpoint

This is the nuclear option for isolating a compromised machine. It blocks all inbound and outbound traffic, disables the network adapter, and displays a warning message to the user. Use it when a machine needs to be preserved for forensics but must be immediately severed from the network to prevent lateral movement or continued exfiltration.

```powershell
New-NetFirewallRule -DisplayName "Block all outbound traffic" -Direction Outbound -Action Block | out-null
New-NetFirewallRule -DisplayName "Block all inbound traffic" -Direction Inbound -Action Block | out-null
$adapter = Get-NetAdapter | foreach { $_.Name }; Disable-NetAdapter -Name "$adapter" -Confirm:$false
Add-Type -AssemblyName PresentationCore, PresentationFramework
[System.Windows.MessageBox]::Show('Your Computer has been Disconnected from the Internet for Security Issues. Please do not try to re-connect to the internet. Contact the Security Helpdesk.','Security Alert',[System.Windows.MessageBoxButton]::OK,[System.Windows.MessageBoxImage]::Information)
```

---

## 08 · Windows — SMB Queries

SMB is a primary vector for both lateral movement and data exfiltration. Seeing which SMB dialect (version) is in use is important because SMBv1 contains EternalBlue-class vulnerabilities. Seeing open shares reveals potential exfiltration targets or shadow paths.

### List Shares

```powershell
Get-SMBShare
```

### List Active SMB Connections and Versions

```powershell
Get-SmbConnection
Get-SmbConnection | select Dialect, Servername, Sharename | sort Dialect
# Look for Dialect "1" — SMBv1 is a serious risk
```

### Remove an SMB Share

```powershell
Remove-SmbShare -Name MaliciousShare -Confirm:$false -verbose
```

---

## 09 · Windows — Process Queries

Process analysis is the cornerstone of endpoint threat hunting. Knowing what is running, who owns it, what command line it was started with, what network connections it holds, and what its hash is provides the full picture needed to distinguish legitimate activity from malice.

### Processes with TCP Connections (Combined View)

This query — which appears twice in the original notes because of its importance — shows you the local/remote IP and port, process name, and full command line in a single output. It is one of the most powerful one-liners available to a Windows defender.

```powershell
Get-NetTCPConnection |
select LocalAddress, localport, remoteaddress, remoteport, state,
  @{name="process"; Expression={(get-process -id $_.OwningProcess).ProcessName}},
  @{Name="cmdline"; Expression={(Get-WmiObject Win32_Process -filter "ProcessId = $($_.OwningProcess)").commandline}} |
sort Remoteaddress -Descending | ft -wrap -autosize
```

### Show All Processes with Their Owning User

```powershell
get-process * -Includeusername

# Hunting suspicious processes by user context
gwmi win32_process |
Select Name, @{n='Owner';e={$_.GetOwner().User}}, CommandLine |
sort Name -unique -descending | Sort Owner | ft -wrap -autosize
```

### Full Command Line of All Processes

```powershell
gwmi win32_process |
Select Name, ProcessID, @{n='Owner';e={$_.GetOwner().User}}, CommandLine |
sort name | ft -wrap -autosize | out-string
```

### Check if a Specific Process Is Running

```powershell
$process = "memes"
if (ps | where-object ProcessName -Match "$process") {
  Write-Host "$process present on "; hostname
} else {
  write-host "$process absent from "; hostname
}
```

### Get Process Hash (For VirusTotal Lookup)

Hash all running processes and compare unusual ones against threat intelligence. Note that `sha256` is preferred over MD5 for modern investigations.

```powershell
foreach ($proc in Get-Process | select path -Unique) {
  try {
    Get-FileHash $proc.path -Algorithm sha256 -ErrorAction stop |
    ft hash, path -autosize -HideTableHeaders | out-string -width 800
  } catch {}
}
```

### Show All DLLs Loaded by a Process

```powershell
get-process -name "memestask" -module
get-process -name "memestask" -module | fl   # granular detail
```

### Sort by Least CPU-Intensive Processes

Malicious processes tend to be lightweight so they don't get noticed in Task Manager. Sorting by ascending CPU usage (rather than the usual descending) puts these quiet processes at the top of the output.

```powershell
gps | Sort CPU |
Select -Property ProcessName, CPU, ID, StartTime |
ft -autosize -wrap | out-string -width 800
```

### Stop a Process

```powershell
Get-Process -Name "memeprocess" | Stop-Process -Force -Confirm:$false -verbose
```

### Process Tree

Download `pslist.exe` from Sysinternals and run it with the `-t` flag to produce a visual parent-child tree of all processes. This is invaluable for understanding how a suspicious process was spawned and what it has spawned in turn.

```cmd
pslist.exe -t
```

---

## 10 · Windows — Recurring Tasks & Persistence

Persistence mechanisms are how adversaries survive reboots. The Blue Team Notes cover all major Windows persistence channels: scheduled tasks, WMI event subscriptions, Run registry keys, startup folders, PowerShell profiles, login scripts, screensavers, and shortcut hijacking. Some of these channels — particularly registry-based schtask manipulation and WMI subscriptions — can be invisible to standard tooling.

### Get All Scheduled Tasks (with User Context)

```powershell
schtasks /query /FO CSV /v | convertfrom-csv |
where { $_.TaskName -ne "TaskName" } |
select "TaskName", "Run As User", Author, "Task to Run" |
fl | out-string
```

### Find What a Specific Task Is Executing

```powershell
$task = Get-ScheduledTask | where TaskName -EQ "meme task"
$task.Actions

# Get full XML export for detail
$task = "CacheTask"
get-scheduledtask -taskpath (Get-ScheduledTask -Taskname "$task").taskpath | Export-ScheduledTask
```

### Detect Registry-Invisible Schtasks

Threat actors can manipulate scheduled tasks in a way that removes them from the Task Scheduler UI while keeping them active via the registry. Querying the registry `TaskCache` keys directly exposes these hidden tasks. The loop below parses the binary `Actions` field and renders it as a readable string so you can see what binary or command the hidden task is executing.

```powershell
# Loop through hidden schtasks in registry and decode their Actions
(Get-ItemProperty "HKLM:\Software\Microsoft\Windows NT\CurrentVersion\Schedule\Taskcache\Tasks\*").PSChildName |
Foreach-Object {
  write-host "----Schtask ID: $_---" -ForegroundColor Magenta
  $hexstring = Get-ItemProperty "HKLM:\Software\Microsoft\Windows NT\CurrentVersion\Schedule\Taskcache\Tasks\$_" | Select -ExpandProperty Actions
  $fixedstring = [System.Text.Encoding]::Unicode.GetString($hexstring) -replace '[^a-zA-Z0-9\\._\-\:\%\/\$ ]', ' '
  write-host $fixedstring
}

# Once you have the suspicious task ID, find its name under \Tree
$ID = "{XYZ}"
get-itemproperty -path "HKLM:\Software\Microsoft\Windows NT\CurrentVersion\Schedule\Taskcache\Tree\*" |
? Id -Match "$ID" | fl *Name, Id, PsPath
```

To **eradicate** registry-hidden schtasks, delete both registry keys via Regedit's GUI to avoid permission problems:

- `HKLM\...\Taskcache\Tasks\{ID}`
- `HKLM\...\Taskcache\Tree\{TaskName}`

### Compare Registry vs Filesystem Schtasks

Legitimate scheduled tasks have corresponding XML files on disk. Tasks present in the registry but absent from `C:\Windows\System32\Tasks\` may be hidden or malicious.

```powershell
$Reg = (Get-ItemProperty -path "HKLM:\Software\Microsoft\Windows NT\CurrentVersion\Schedule\Taskcache\tree\*").PsChildName
$XMLs = (ls C:\windows\System32\Tasks\).Name
Compare-Object $Reg $XMLs
```

### Startup Programs

```powershell
Get-CimInstance Win32_StartupCommand | Select-Object Name, command, Location, User | Format-List

# User startup folders
(gci "c:\Users\*\appdata\roaming\microsoft\windows\start menu\programs\startup\*").fullname
```

### Login Script Persistence via Registry

```powershell
mount -PSProvider Registry -Name HKU -Root HKEY_USERS
(gp "HKU:\*\Environment").UserInitMprLogonScript

# Get SID of user with a login task
gp "HKU:\*\Environment" | FL PSParentPath, UserInitMprLogonScript

# Remove the malicious logon script
remove-itemproperty "HKU:\SID-\Environment\" -name "UserInitMprLogonScript" -whatif   # preview first
remove-itemproperty "HKU:\SID-\Environment\" -name "UserInitMprLogonScript" -verbose
```

### PowerShell Profile Persistence

Adversaries can insert their malware into the PowerShell profile so it runs every time any user opens a PowerShell session. Audit all profile files across all users.

```powershell
echo $Profile
type $Profile

# Audit all user profiles at once
(gci C:\Users\*\Documents\WindowsPowerShell\*profile.ps1, C:\Windows\System32\WindowsPowerShell\v1.0\*profile.ps1).FullName |
Foreach-Object { write-host "----$_---" -ForegroundColor Magenta; gc $_ }
```

### Shortcut (LNK) Hijacking

Adversaries inject their malicious commands into `.lnk` shortcut files so that when a user clicks the shortcut, both the legitimate application and the malware execute. Sort by `LastModified` to surface recently altered shortcuts, then filter by date for scale.

```powershell
# Sort all shortcuts by last modification date
Get-CimInstance Win32_ShortcutFile | sort LastModified -desc | fl FileName, Name, Target, LastModified

# Filter to only show shortcuts modified after a specific date
Get-CimInstance Win32_ShortcutFile |
where-object {$_.lastmodified -gt [datetime]::parse("01/01/2024")} |
sort LastModified -desc | fl FileName, Name, Target, LastModified
```

### WMI Persistence (Hunt and Remove)

WMI event subscriptions are a highly effective and often-overlooked persistence mechanism. They consist of three linked components — an `EventFilter` (the trigger), an `EventConsumer` (the action), and a `FilterToConsumerBinding` (the link). All three must be removed to fully eradicate the persistence.

```powershell
# Detect WMI persistence
Get-CimInstance -Namespace root\Subscription -Class __FilterToConsumerBinding
Get-CimInstance -Namespace root\Subscription -Class __EventFilter
Get-CimInstance -Namespace root\Subscription -Class __EventConsumer

# Remove WMI persistence (change "EVIL" to the actual name)
gcim -Namespace root\Subscription -Class __EventFilter | ? Name -eq "EVIL" | Remove-CimInstance -verbose
gcim -Namespace root\Subscription -Class __EventConsumer | ? Name -eq "EVIL" | Remove-CimInstance -verbose
gwmi -Namespace root\Subscription -Class __FilterToConsumerBinding | ? Consumer -match "EVIL" | Remove-WmiObject -verbose
```

> **Note on CIM vs WMI:** Microsoft is decommissioning `WMIC`. Prefer `Get-CimInstance` over `Get-WmiObject` in new queries for long-term compatibility.

### Run and RunOnce Registry Keys

Run keys cause programs to execute at every login. RunOnce keys execute once and then delete themselves. A `!` prefix in the name means the key deletes itself even if the task fails. A `*` prefix means the key can run even in Safe Mode. Querying all four key locations together covers both HKLM (all users) and HKCU (per user) variants.

```powershell
$RunKeys = @(
  'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run',
  'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce',
  'HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run',
  'HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce'
)
foreach ($key in $RunKeys) { Get-ItemProperty -Path $key -ErrorAction SilentlyContinue }
```

---

## 11 · Windows — File Queries

File queries during an IR are about finding things that should not be there, verifying things that should be there, and checking timestamps. PowerShell's `Get-ChildItem` (alias `gci`) is exceptionally flexible and supports wildcards, recursive search, and chaining with hashing and signature verification.

### Check if a File or Path Exists

```powershell
test-path "C:\windows\system32\evil.exe"
```

### Recursive Search with Wildcards

PowerShell allows wildcards in directory names, which is invaluable when you want to search across all user temp directories without knowing usernames in advance.

```powershell
gci "C:\Users\*\AppData\Local\Temp\*" -Recurse -Force -File -Include *.ps1, *.psm1, *.txt |
ft lastwritetime, name -autosize | out-string -width 800
```

### List Directory Structure

```powershell
tree /f /a   # Full ASCII tree of current directory
```

### Find Files by Hash or Signature

```powershell
# Get hash of a specific file
Get-FileHash "C:\path\to\file.exe" -Algorithm SHA256

# Compare hash against known-bad
Get-FileHash "C:\suspicious.exe" | ? Hash -eq "KNOWN_BAD_HASH"
```

---

## 12 · Windows — Registry Queries

The registry is both a configuration store and a forensic artefact. Timestamps on registry keys can indicate when a change was made; values can contain embedded commands, base64 payloads, or encoded malware.

### Query the Run Keys (Persistence)

See the [[https://claude.ai/chat/9a3cadc5-7310-4a92-896f-0b16344ffaa3#run-and-runonce-registry-keys]] for the full query.

### Query All Values Under a Key

```powershell
Get-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon"
```

### Check Userinit and Shell Values

Attackers sometimes modify `Userinit` or `Shell` values under `Winlogon` to load malware at login.

```powershell
Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon" | select Userinit, Shell
# Normal: Userinit = C:\Windows\system32\userinit.exe,
# Normal: Shell = explorer.exe
```

---

## 13 · Windows — Driver & DLL Queries

Malicious drivers and DLLs represent advanced persistence and evasion techniques. A signed driver or DLL does not mean it is safe — malicious actors can obtain or steal signing certificates. Similarly, an unsigned file is not automatically malicious — many legitimate Windows files are unsigned. Filter for `Invalid` signatures first to reduce the volume of output.

### Driver Queries

```powershell
# List all loaded drivers
driverquery /v /fo csv | ConvertFrom-Csv | ft Name, DisplayName, Path -autosize
gci C:\Windows\System32\drivers | select name, lastwritetime | sort lastwritetime -desc
```

### DLL Queries

```powershell
# Get signatures for System32 DLLs
gci -path C:\Windows\*, C:\Windows\System32\* -file -force -include *.dll |
Get-AuthenticodeSignature

# Filter for INVALID signatures only (reduces noise significantly)
gci -path C:\Windows\*, C:\Windows\System32\* -file -force -include *.dll |
Get-AuthenticodeSignature | ? Status -eq "Invalid"

# Get hashes for System32 DLLs
gci -path C:\Windows\*, C:\Windows\System32\* -file -force -include *.dll | get-filehash
```

---

## 14 · Windows — AV & Defender Queries

Microsoft Defender is present on modern Windows systems and can be queried via PowerShell. During an incident you want to know what threats it has detected, whether it is currently enabled and actively protecting, and whether any attacker has weakened it by adding exclusions or disabling components.

### Query Defender Detections

```powershell
# Show all current threats
Get-MpThreat

# Detailed detection info (time, action success)
Get-MpThreatDetection | Format-List threatID, *time, ActionSuccess

# Drill down into a specific threat by ID
Get-MpThreat -ThreatID <ID>
```

### Scan and Update Defender

```powershell
Update-MpSignature
Start-MpScan                           # quick scan
Start-MpScan -ScanType FullScan        # full scan
Start-MpScan -ScanPath "C:\temp"       # targeted path scan
```

### Check if Defender Components Are Enabled

Adversaries frequently try to disable real-time protection, behaviour monitoring, or cloud-delivered protection. Querying the Defender preferences surfaces whether any component has been turned off.

```powershell
Get-MpPreference | fl *Enable*, *Disable*, *Real*
```

### AV Exclusions (Attacker-Planted Exclusions)

Adversaries sometimes add exclusions to prevent Defender from scanning their tools or persistence paths. While some legitimate software vendors also require exclusions, any unexpected exclusion warrants investigation.

```powershell
(Get-MpPreference).ExclusionPath
(Get-MpPreference).ExclusionProcess
(Get-MpPreference).ExclusionExtension

# Remove a specific exclusion
Remove-MpPreference -ExclusionProcess 'velociraptor' -ExclusionPath 'C:\Users\IEUser\Pictures' -ExclusionExtension '.pif' -force -verbose
```

---

## 15 · Windows — Log Queries

From a security perspective, querying logs on the endpoint itself is less reliable than querying a centralised SIEM, because compromised endpoints cannot be fully trusted. However, for initial triage and for troubleshooting log forwarding issues, direct endpoint log queries are essential.

### Show Enabled Logs with Data

```powershell
Get-WinEvent -ListLog * |
where-object {$_.IsEnabled -eq "True" -and $_.RecordCount -gt "0"} |
sort-object -property LogName | format-table LogName -autosize -wrap
```

### Verify Sysmon Is Writing Logs

Sysmon occasionally stops writing to its event log while continuing to run. This one-liner checks the last write time and alerts if it has not been updated in the last day, signalling that Sysmon may have silently stalled.

```powershell
$b = (Get-WinEvent -ListLog Microsoft-Windows-Sysmon/Operational).lastwritetime
$a = Get-WinEvent -ListLog Microsoft-Windows-Sysmon/Operational |
  where-object {(new-timespan $_.LastWriteTime).days -ge 1}
if ($a -eq $null) { Write-host "sysmon_working" } else { Write-host "$env:computername $b" }
```

### Query Specific Event IDs

```powershell
# Get the last 20 security events
Get-WinEvent -LogName Security -MaxEvents 20 | fl TimeCreated, Id, Message

# Filter for specific event ID (e.g., 4624 = successful logon)
Get-WinEvent -LogName Security | ? Id -eq 4624 | fl TimeCreated, Message

# Query from an exported log file
Get-WinEvent -Path ".\Security.evtx" | ? Id -eq 4625 | fl TimeCreated, Message
```

---

## 16 · Linux

Linux investigations focus on command history, process trees, network connections, and file system artefacts. The same principle applies as on Windows: query logs and artefacts from a trusted location (a SIEM or forensic workstation) rather than relying solely on the potentially compromised endpoint.

### Bash History

```bash
# View current user history
cat ~/.bash_history
history

# Search history for specific commands (e.g., wget, curl, nc)
history | grep -E "wget|curl|nc |ncat|python"

# Check all users' bash histories
cat /home/*/.bash_history
cat /root/.bash_history

# Show history with timestamps (if HISTTIMEFORMAT is set)
HISTTIMEFORMAT="%F %T " history
```

### Grep and Ack — Efficient Log Searching

```bash
# Recursive grep with line numbers and context
grep -rn "keyword" /var/log/

# Case-insensitive grep
grep -i "failed password" /var/log/auth.log

# Grep with context (3 lines before and after match)
grep -B3 -A3 "Accepted publickey" /var/log/auth.log

# ack (faster for code/config searching)
ack "pattern" /etc/

# Show unique entries only
grep "Failed password" /var/log/auth.log | sort | uniq -c | sort -rn
```

### Processes and Network Connections

```bash
# All processes with user context
ps aux
ps -ef

# Process tree
ps auxf
pstree -p

# Network connections with process info
ss -tulpn                              # listening ports + process
ss -antlp                              # all TCP connections + process
netstat -antlp 2>/dev/null

# Active external connections
ss -antlp | grep ESTABLISHED

# Lsof for network connections
lsof -i                               # all network connections
lsof -i tcp                           # TCP only
lsof -i :443                          # connections on port 443
lsof -p <PID>                         # all files/connections for a specific PID
```

### Files

```bash
# Find recently modified files (last 24 hours)
find / -mtime -1 -type f 2>/dev/null

# Find SUID/SGID binaries
find / -perm -u=s -type f 2>/dev/null
find / -perm -g=s -type f 2>/dev/null

# Find world-writable files
find / -perm -o=w -type f 2>/dev/null

# Find files modified within a time window (useful during IR)
find /var/www /etc /tmp /home -newer /tmp/reference_file -type f 2>/dev/null

# Check hash of a file
sha256sum /usr/bin/nc
md5sum /etc/passwd

# Strings in binary (look for embedded commands or C2 addresses)
strings /tmp/suspicious_binary | grep -E "http|wget|curl|bash"

# Check file type (overrides extension)
file /tmp/suspicious
```

### Bash Tips

```bash
# Check /etc/passwd for unusual shells or new users
cat /etc/passwd | grep -v nologin | grep -v false

# Check /etc/sudoers and sudo group membership
cat /etc/sudoers
getent group sudo

# Check for cron jobs (user and system)
crontab -l
cat /etc/crontab
ls /etc/cron.d/ /etc/cron.hourly/ /etc/cron.daily/

# Check running services
systemctl list-units --type=service --state=running

# Check listening services
ss -tulpn | grep LISTEN

# Loaded kernel modules (look for unusual modules)
lsmod | sort

# Check /tmp and /dev/shm for dropped files
ls -la /tmp/ /dev/shm/ /var/tmp/

# Check for unusual SUID files created recently
find / -perm -4000 -mtime -7 -type f 2>/dev/null
```

---

## 17 · macOS

macOS investigations have their own distinct artefact set. The `plist` file format is pervasive throughout macOS for configuration and persistence. Quarantine events, TCC database access, and the built-in security mechanisms (Gatekeeper, XProtect, notarization) all provide valuable forensic artefacts.

### Reading .plist Files

```bash
# Read binary plist
plutil -p /Library/Preferences/com.apple.TimeMachine.plist

# Convert binary plist to XML for reading
plutil -convert xml1 file.plist -o -

# Read with defaults command
defaults read /Library/Preferences/com.apple.loginwindow
```

### Quarantine Events

When a user downloads a file through Safari or another quarantine-aware application, macOS records this in a SQLite database. This is an excellent source of evidence for what a user downloaded and from where.

```bash
sqlite3 ~/Library/Preferences/com.apple.LaunchServices.QuarantineEventsV2 \
  "select datetime(LSQuarantineTimeStamp + 978307200, 'unixepoch'), LSQuarantineAgentName, LSQuarantineDataURLString, LSQuarantineSenderName from LSQuarantineEvent order by LSQuarantineTimeStamp"
```

### Install History

```bash
system_profiler SPInstallHistoryDataType
# or
cat /Library/Receipts/InstallHistory.plist | plutil -p -
```

### Most Recently Used (MRU) Files

```bash
# Recent documents per application
ls ~/Library/Application\ Support/com.apple.sharedfilelist/
plutil -p ~/Library/Application\ Support/com.apple.sharedfilelist/com.apple.LSSharedFileList.RecentDocuments.sfl2
```

### macOS Audit Logs

```bash
# Read audit trail (binary format)
praudit -l /var/audit/current

# Filter for specific user
grep -l "username" /var/audit/*

# Convert audit log to XML
praudit -x /var/audit/current
```

### Admin Group Members

```bash
dscl . -read /Groups/admin GroupMembership
# Or via dseditgroup
dseditgroup -o checkmember -m username admin
```

### Persistence Locations on macOS

The primary persistence mechanisms on macOS are LaunchAgents (per-user), LaunchDaemons (system-wide), Login Items, and cron. Persistence via LaunchAgents and LaunchDaemons is most common in malware targeting macOS.

```bash
# LaunchAgents (per-user — run as the user)
ls ~/Library/LaunchAgents/
ls /Library/LaunchAgents/

# LaunchDaemons (system-wide — run as root)
ls /Library/LaunchDaemons/
ls /System/Library/LaunchDaemons/

# Login Items (GUI)
osascript -e 'tell application "System Events" to get the name of every login item'

# Inspect a suspicious plist
plutil -p /Library/LaunchDaemons/com.suspicious.service.plist
```

### Transparency, Consent, and Control (TCC)

TCC controls which applications have access to sensitive data (Contacts, Photos, Microphone, etc.). The TCC database can be inspected to see which applications have been granted access, and whether unusual applications have managed to obtain sensitive permissions.

```bash
# User TCC database
sqlite3 ~/Library/Application\ Support/com.apple.TCC/TCC.db \
  "SELECT client, service, auth_value, last_modified FROM access ORDER BY last_modified DESC"

# System TCC database (requires root)
sudo sqlite3 /Library/Application\ Support/com.apple.TCC/TCC.db \
  "SELECT client, service, auth_value FROM access"
```

### Built-In Security Mechanisms

```bash
# Check Gatekeeper status
spctl --status

# Check SIP (System Integrity Protection) status
csrutil status

# Check XProtect version
system_profiler SPInstallHistoryDataType | grep XProtect

# Check notarization of a specific binary
spctl -a -vvv /path/to/application.app
```

---

## 18 · Malware Analysis

When a suspicious file is encountered, the first step is rapid triage — understanding what it is without necessarily executing it. The tools here cover hashing for threat intelligence lookups, PowerShell decode/deobfuscation, and process monitoring.

### Rapid Malware Analysis (Static)

```bash
# File type identification
file suspicious_file

# String extraction (look for C2 IPs, URLs, commands)
strings suspicious_file | grep -E "http|https|cmd|powershell|exec"

# Entropy check (high entropy suggests packed/encrypted content)
# High entropy (>7.0) in a PE file often indicates packing
python3 -c "import math, sys; data=open(sys.argv[1],'rb').read(); p=[data.count(bytes([i]))/len(data) for i in range(256)]; print(-sum(p[i]*math.log2(p[i]) for i in range(256) if p[i]))" suspicious_file

# Check PE headers
objdump -f suspicious.exe
```

### Hash Check and VirusTotal Lookup

```powershell
# Windows — hash a suspicious file
Get-FileHash "C:\suspicious.exe" -Algorithm SHA256

# Linux/macOS
sha256sum /path/to/suspicious
md5sum /path/to/suspicious
```

Once you have the hash, submit it to [VirusTotal](https://www.virustotal.com/) or search [MalwareBazaar](https://bazaar.abuse.ch/) before executing the file. The `file://` submission method on VirusTotal will also run behavioural analysis.

### Unquarantine Malware (Windows Defender)

When Defender quarantines a file you need to analyse, you can restore it to a safe location for investigation.

```powershell
# List quarantined items
Get-MpThreat

# Restore a specific quarantine item (use with caution — in an isolated environment)
Start-MpScan -ScanType Custom -ScanPath "C:\quarantined_sample"
```

### Process Monitor

Sysinternals Process Monitor is the definitive tool for monitoring what a process does in real time — file system access, registry changes, network calls. Run it before executing a suspect sample in an isolated VM and filter the output to the process of interest to capture all its behaviour.

### Decoding PowerShell

Base64-encoded PowerShell is extremely common in malware. The encoding is always `UTF-16LE` on Windows. The fastest decode method uses `[System.Text.Encoding]::Unicode.GetString()` in PowerShell, or you can use CyberChef (operation: "From Base64" → "Decode text" with encoding `UTF-16LE (1200)`).

```powershell
# Decode a base64-encoded PowerShell payload
$encoded = "JABjAGwAaQBlAG4AdA..."
[System.Text.Encoding]::Unicode.GetString([System.Convert]::FromBase64String($encoded))

# Or pipe the base64 directly
echo "JABjAGwAaQBlAG4AdA==" | base64 -d | iconv -f UTF-16LE
```

---

## 19 · SOC Tooling

### Sigma Rule Conversion

Sigma is a generic rule format for SIEM detections. The `sigma` CLI tool (and its successor `sigconverter`) converts Sigma rules into the query language of your specific SIEM (Splunk SPL, Elastic DSL, Microsoft Sentinel KQL, etc.).

```bash
# Convert a Sigma rule to Splunk SPL
sigma convert -t splunk -p splunk_windows sigma_rule.yml

# Convert to KQL for Microsoft Sentinel
sigma convert -t microsoft365defender sigma_rule.yml

# Convert with pipeline
sigma convert -t elasticsearch -p ecs_windows sigma_rule.yml
```

The [SOC Prime Threat Detection Marketplace](https://socprime.com/) provides a large library of pre-converted detection rules for common SIEM platforms, often with MITRE ATT&CK coverage mapped directly to the rule.

---

## 20 · Honeypots

Honeypots are deceptive defensive mechanisms designed to attract adversaries and alert defenders to malicious activity. A well-placed internal honeypot — one that an adversary would logically want to attack — can give defenders precious warning time before real damage is done. As the Blue Team Notes point out, Chris Sanders is the authority on honeypot design, but even simple implementations can be highly effective in internal networks.

### Fake Telnet Honeypot (Linux)

Telnet is rarely used legitimately in modern environments. Anything connecting to a Telnet honeypot is almost certainly an adversary or an automated scanner. The `ncat` listener records all commands issued by the connecting party to a log file.

```bash
# Set up fake telnet on port 23, log all input
ncat -nvlkp 23 > hp_telnet.log 2>&1
# -l listen, -k keep alive for multiple connections, -p port

# Monitor the log
tail -f hp_telnet.log
```

### Fake Web Server Honeypot

A web server that responds with an "error" (deliberately) will keep an adversary engaged longer than one that silently drops connections, giving you more time to respond. The fake error message psychologically encourages the adversary to spend time trying to "fix" the error.

```bash
# Simple Python HTTP honeypot
python3 -m http.server 8080 > webserver_honeypot.log 2>&1

# Better: use a Flask app that logs all requests and returns a fake error
```

### wget Alias Honeypot (Linux, Detect Lateral Movement)

One of the more creative techniques in the Blue Team Notes. By aliasing `wget` to first `curl` a known-good monitoring server before executing the real `wget`, you can detect when an adversary runs `wget` on a machine. The curl sends the machine's FQDN to your monitoring server, alerting you to which machine is under attack — all without the adversary's knowledge, because the output of the curl is discarded.

```bash
# IRL version — insert this into /etc/profile or .bashrc
alias wget='curl http://honey.monitoring-server.example/$(hostname -f) > /dev/null 2>&1; wget'
# The ;wget at the end still executes the real wget, so the adversary notices nothing
```

---

## 21 · Network Traffic Analysis

### Capture Traffic

```bash
# tcpdump — capture to file, avoid resolving names (faster)
sudo tcpdump -i eth0 -w capture.pcap -n

# Capture specific port
sudo tcpdump -i eth0 port 443 -w tls_traffic.pcap

# Capture traffic to/from a specific host
sudo tcpdump -i eth0 host 1.2.3.4 -w host_traffic.pcap

# Show capture in real time (human readable)
sudo tcpdump -i eth0 -A -n
```

### TShark (Command-Line Wireshark)

TShark is the command-line version of Wireshark and is significantly more powerful than `tcpdump` for analysing captured traffic.

```bash
# Basic read of a pcap
tshark -r capture.pcap

# Filter for HTTP traffic
tshark -r capture.pcap -Y "http"

# Extract HTTP request URIs
tshark -r capture.pcap -Y "http.request" -T fields -e http.host -e http.request.uri

# Find user agents (look for unusual ones — Mimikatz, Cobalt Strike, etc.)
tshark -r capture.pcap -Y "http.user_agent" -T fields -e ip.src -e http.user_agent | sort | uniq -c | sort -rn

# DNS conversations — find C2 beaconing patterns
tshark -r capture.pcap -Y "dns" -T fields -e frame.time -e ip.src -e dns.qry.name

# DHCP details
tshark -r capture.pcap -Y "dhcp" -T fields -e dhcp.option.hostname -e dhcp.option.vendor_class_id -e ip.src

# Get MAC addresses
tshark -r capture.pcap -T fields -e eth.src -e eth.dst | sort | uniq

# Filter between two specific IPs
tshark -r capture.pcap -Y "ip.addr == 192.168.1.10 && ip.addr == 192.168.1.20"

# Stats on protocols in the capture
tshark -r capture.pcap -q -z io,phs

# SMB file interactions
tshark -r capture.pcap -Y "smb2.filename" -T fields -e ip.src -e smb2.filename

# Extract credentials from cleartext protocols
tshark -r capture.pcap -Y "ftp.request.command == PASS || telnet" -T fields -e ip.src -e ftp.request.arg
```

### TLS Decryption

If you have the TLS session keys (from a `SSLKEYLOGFILE` environment variable set on the client during capture), you can decrypt TLS traffic in Wireshark or TShark.

```bash
# Load key file and decrypt
tshark -r encrypted.pcap -o "ssl.keylog_file:/path/to/keys.log" -Y "http" -T fields -e http.host -e http.request.uri

# Sanity check: confirm key is working
tshark -r encrypted.pcap -o "ssl.keylog_file:/path/to/keys.log" -Y "ssl.handshake" | head -5
```

### Extract Files from PCAP

```bash
# NetworkMiner (GUI — best for file extraction)
# Run NetworkMiner, load the pcap, browse extracted files/images/credentials

# TShark: export HTTP objects
tshark -r capture.pcap --export-objects http,./extracted_http/

# TShark: export SMB objects
tshark -r capture.pcap --export-objects smb,./extracted_smb/
```

### PCAP Analysis — Adversary Command Recovery

```bash
# What commands did an adversary run over HTTP
tshark -r capture.pcap -Y "http.request.method == POST" -T fields -e ip.src -e http.request.uri -e http.file_data

# TCP payload — extract what was sent on a specific port
tshark -r capture.pcap -Y "tcp.port == 4444" -T fields -e data.text
```

---

## 22 · Digital Forensics (DFIR)

### Volatility — Memory Forensics

Volatility is the standard framework for analysing memory dumps. Volatility 3 does not require a profile; Volatility 2 requires specifying one.

```bash
# Volatility 3 basics
vol -f memory.dmp windows.info         # basic system info
vol -f memory.dmp windows.pslist       # running processes
vol -f memory.dmp windows.pstree       # process tree
vol -f memory.dmp windows.cmdline      # command lines of processes
vol -f memory.dmp windows.netscan      # network connections
vol -f memory.dmp windows.filescan     # files open in memory
vol -f memory.dmp windows.dlllist      # loaded DLLs per process
vol -f memory.dmp windows.malfind      # injected code regions

# Dump a specific process
vol -f memory.dmp windows.pslist | grep <PID>
vol -f memory.dmp windows.dumpfiles --pid <PID>

# Volatility 2 — requires profile
vol.py -f memory.dmp imageinfo         # detect profile
vol.py -f memory.dmp --profile=Win10x64_19041 pslist
vol.py -f memory.dmp --profile=Win10x64_19041 cmdline
vol.py -f memory.dmp --profile=Win10x64_19041 netscan
```

### Quick Windows Forensics Artefacts

The following artefacts are among the most important to collect and analyse during a Windows IR. Together they can establish a timeline of execution, network activity, and file access dating back weeks or months.

**Prefetch** — Windows keeps records of the last ~128 (SSD) or ~1024 (HDD) application executions in `C:\Windows\Prefetch\`. Each `.pf` file contains the executable name, run count, and last eight execution timestamps.

```powershell
# Query prefetch files directly
gci C:\Windows\Prefetch\ | select Name, LastWriteTime | sort LastWriteTime -desc
```

**Background Activity Moderator (BAM)** — Tracks when executables were last run by each user. Survives reboots.

```powershell
# BAM entries per user SID
gp "HKLM:\SYSTEM\CurrentControlSet\Services\bam\State\UserSettings\*" -ErrorAction SilentlyContinue
```

**ShimCache (AppCompatCache)** — Registry artefact recording executable metadata. Provides evidence of executables that ran or were present on a system.

```powershell
gp "HKLM:\SYSTEM\CurrentControlSet\Control\Session Manager\AppCompatCache" | select AppCompatCache
```

**Amcache** — `C:\Windows\AppCompat\Programs\Amcache.hve` records SHA1 hashes of recently executed programs, install times, and linked entries to setupinfo. Extract with Registry Explorer or AmcacheParser.

**Jump Lists** — `C:\Users\<user>\AppData\Roaming\Microsoft\Windows\Recent\AutomaticDestinations\` — record recently opened files per application, including files opened from network shares.

**SRUM (System Resource Usage Monitor)** — `C:\Windows\System32\sru\SRUDB.dat` — tracks network bytes sent/received per application over a rolling 30–60 day window. Invaluable for quantifying data exfiltration.

**WER (Windows Error Reporting)** — `C:\ProgramData\Microsoft\Windows\WER\` — crash reports that may reveal malware that crashed during execution, often including partial memory dumps.

**Certutil History** — certutil maintains a cache at `%USERPROFILE%\AppData\LocalLow\Microsoft\CryptnetUrlCache\`. Adversaries frequently use certutil to download files, and this cache records what was downloaded.

```powershell
gci "$env:USERPROFILE\AppData\LocalLow\Microsoft\CryptnetUrlCache\Content\" |
select Name, LastWriteTime | sort LastWriteTime -desc
```

### Chainsaw — Rapid Event Log Analysis

[Chainsaw](https://github.com/WithSecureLabs/chainsaw) is a fast, Sigma-compatible event log parser that can triage a Windows event log collection in minutes. It maps detections to MITRE ATT&CK.

```bash
# Hunt for threats using built-in Sigma rules
chainsaw hunt evtx_logs/ -s sigma_rules/ --mapping mappings/sigma-event-logs-all.yml -r rules/ --json

# Search for specific keywords or patterns
chainsaw search "mimikatz" evtx_logs/ --json

# Dump all event logs to JSON
chainsaw dump evtx_logs/ --json
```

### Browser History

Browser history is frequently overlooked in incident investigations but can reveal exactly what an adversary was researching, which resources they accessed, or how a victim user was socially engineered.

```bash
# Chrome history (SQLite)
sqlite3 "$HOME/.config/google-chrome/Default/History" \
  "SELECT datetime(last_visit_time/1000000-11644473600,'unixepoch'), url, title FROM urls ORDER BY last_visit_time DESC LIMIT 100"

# Windows Chrome history
sqlite3 "C:\Users\$env:USERNAME\AppData\Local\Google\Chrome\User Data\Default\History" \
  "SELECT datetime(last_visit_time/1000000-11644473600,'unixepoch'), url FROM urls ORDER BY last_visit_time DESC"

# Firefox history (SQLite)
sqlite3 ~/.mozilla/firefox/*.default-release/places.sqlite \
  "SELECT datetime(last_visit_date/1000000,'unixepoch'), url FROM moz_places ORDER BY last_visit_date DESC LIMIT 100"
```

### Which Logs to Pull in an Incident

When collecting logs for an IR, the following are the highest-priority sources across Windows environments:

|Log Source|Location / Channel|Key Event IDs|
|---|---|---|
|**Security**|`Security.evtx`|4624 (logon), 4625 (failed logon), 4648 (explicit creds), 4672 (admin logon), 4688 (process creation), 4698/4702 (schtask)|
|**System**|`System.evtx`|7034/7036 (service events), 7045 (new service installed)|
|**PowerShell**|`Microsoft-Windows-PowerShell/Operational`|4103 (module logging), 4104 (script block logging)|
|**Sysmon**|`Microsoft-Windows-Sysmon/Operational`|1 (process create), 3 (network connect), 11 (file create), 22 (DNS query)|
|**RDP**|`TerminalServices-RemoteConnectionManager/Operational`|1149 (RDP connection)|
|**WinRM**|`Microsoft-Windows-WinRM/Operational`|6 (connection), 91 (session created)|
|**DNS Client**|`Microsoft-Windows-DNS-Client/Operational`|3008 (DNS query)|
|**Firewall**|`Microsoft-Windows-Windows Firewall with Advanced Security/Firewall`|2004 (rule added), 2006 (rule deleted)|

### USB Device History

USB artefacts can prove that data was copied to removable media.

```powershell
# Registry key showing USB devices connected to this machine
gp "HKLM:\SYSTEM\CurrentControlSet\Enum\USBSTOR\*\*" |
select FriendlyName, HardwareID, *time* | sort *time* -desc

# Also check the SetupAPI log for USB device install history
gc "C:\Windows\INF\setupapi.dev.log" | select-string "USB"
```

### Reg Ripper

[RegRipper](https://github.com/keydet89/RegRipper3.0) is a framework for parsing offline registry hives to extract forensic artefacts. It is invaluable when analysing a registry hive acquired from a compromised or powered-off system, where live registry queries are not possible.

```bash
# Extract all artefacts from the SYSTEM hive
rip.pl -r SYSTEM -f system > system_output.txt

# Extract SAM hive (local accounts and password hashes)
rip.pl -r SAM -f sam > sam_output.txt

# Extract SOFTWARE hive (installed applications, run keys, etc.)
rip.pl -r SOFTWARE -f software > software_output.txt

# Extract specific plugin (e.g., network interfaces)
rip.pl -r SYSTEM -p nic2 > nic_output.txt
```

---

