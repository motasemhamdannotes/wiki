

[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)

## Windows Internals and Components
### Processes
We can make the process tangible by observing them in the _Windows Task Manager_. The task manager can report on many components and information about a process.
There are multiple utilities available that make observing processes easier; including [Process Hacker 2](https://github.com/processhacker/processhacker), [Process Explorer](https://docs.microsoft.com/en-us/sysinternals/downloads/process-explorer), and [Procmon](https://docs.microsoft.com/en-us/sysinternals/downloads/procmon).
**Processes Components**
- `Private Virtual Address Space`: Virtual memory addresses that the process is allocated. A memory manager is used to translate virtual addresses to physical addresses. Providing virtual addresses to processes as if it were physical addresses prevents collisions between processes. Applications may use more virtual memory than physical memory allocated; the memory manager will transfer or page virtual memory to the disk to solve this problem. The theoretical maximum virtual address space is 4 GB on a 32-bit x86 system.
- `Executable Program`: Defines code and data stored in the virtual address space.
- `Open Handles`: Defines handles to system resources accessible to the process.
- `Security Context`: The access token defines the user, security groups, privileges, and other security information.
- `Process ID`: Unique numerical identifier of the process.
- `Threads`: Section of a process scheduled for execution. Threads control the process execution and share the same details and resources as their parent process, such as code, global variables, etc.
### DLLs
A DLL is a library that contains code and data that can be used by more than one program at the same time so that the operating system and the programs load faster, run faster, and take less disk space on the computer.
DLLs can be loaded in a program using _load-time dynamic linking_ or _run-time dynamic linking_.
When loaded using _load-time dynamic linking_, explicit calls to the DLL functions are made from the application. You can only achieve this type of linking by providing a header (_.h_) and import library (_.lib_) file.
When loaded using _run-time dynamic linking_, a separate function (`LoadLibrary` or `LoadLibraryEx`) is used to load the DLL at run time. Once loaded, you need to use `GetProcAddress` to identify the exported DLL function to call.
### Portable Executable Format
The PE (**P**ortable **E**xecutable) format defines the information about the executable and stored data. The PE format also defines the structure of how data components are stored.
PE has the below components:
- The **DOS Header** defines the type of file. The `MZ` DOS header defines the file format as `.exe`
- The **DOS Stub** is a program run by default at the beginning of a file that prints a compatibility message. This does not affect any functionality of the file for most users.
- The **PE File Header** provides PE header information of the binary. Defines the format of the file, contains the signature and image file header, and other information headers.
- The **Data Dictionaries** are part of the image optional header. They point to the image data directory structure.
- The **Section Table** will define the available sections and information in the image. As previously discussed, sections store the contents of the file, such as code, imports, and data.

### Threads
﻿A thread is an executable unit employed by a process and scheduled based on device factors. We can simplify the definition of a thread: "controlling the execution of a process."

### Virtual Memory
Virtual memory allows other internal components to interact with memory as if it was physical memory without the risk of collisions between applications.
Virtual memory provides each process with a [private virtual address space](https://docs.microsoft.com/en-us/windows/win32/memory/virtual-address-space). A memory manager is used to translate virtual addresses to physical addresses. By having a private virtual address space and not directly writing to physical memory, processes have less risk of causing damage.
The memory manager will also use _pages_ or _transfers_ to handle memory. Applications may use more virtual memory than physical memory allocated; the memory manager will transfer or page virtual memory to the disk to solve this problem.
The theoretical maximum virtual address space is 4 GB on a 32-bit x86 system.

## Description of Common Directories and Registry Keys in Windows
### Directories 
**DNS file**
```
C:\Windows\System32\drivers\etc\hosts 
```
**Network Config file**
```
C:\Windows\System32\drivers\etc\networks 
```
**Usernames and Password**
```
C:\Windows\System32\config\SAM 
```
**Security Log**
```
C:\Windows\System32\config\SECURITY 
```
**Software Log**
```
C:\Windows\System32\config\SOFTWARE 
```
**System Log**
```
C:\Windows\System32\config\SYSTEM 
```
**Windows Event Logs**
```
C:\Windows\System32\winevt\ 
```
**Backup of Users and Passwords**
```
C:\Windows\repair\SAM
```
**Windows All User Startup**
```
C:\ProgramData\Microsoft\Windows\StartMenu\Programs\StartUp
```
**Windows User Startup**
```
C:\Users\*\AppData\Roaming\Microsoft\
Windows\Start Menu\Programs\Startup
```
**Prefetch files**
```
C:\Windows\Prefetch
```
**Amcache.hve**
```
C:\Windows\AppCompat\Programs\Amcache.hve 
```
**NTUSER.dat**
```
C:\Windows\Users\*\NTUSER.dat NTUSER.dat
```
### Registry
**OS Information**
```
HKLM\Software\Microsoft\WindowsNT\CurrentVersion /v ProductName 
```
**Product Name**
```
HKLM\Software\Microsoft\WindowsNT\CurrentVersion /v ProductName
```
**Install Date**
```
HKLM\Software\Microsoft\WindowsNT\CurrentVersion /v InstallDate
```
**Registered Owner**
```
HKLM\Software\Microsoft\WindowsNT\CurrentVersion /v RegisteredOwner
```
**System Root**
```
HKLM\Software\Microsoft\WindowsNT\CurrentVersion /v SystemRoot
```
**Time Zone**
```
HKLM\System\CurrentControllerSet\Control\TimeZoneInformation /v ActiveTimeBias
```
**Mapped Network Drives**
```
HKLM\Software\Microsoft\Windows NT\CurrentVersion\Explorer\Map Network Drive
MRU
```
**Mounted Devices**
```
HKLM\System\MountedDevices
```
**USB Devices**
```
HKLM\System\CurrentControllerSet\Enum\USBStor
```
**Audit Policies**
```
HKLM\Security\Policy\PolAdTev
```
**Installed Software (Machine)**
```
HKLM\Software
```
**Installed Software (User)**
[1]
```
HKCU\Software
```
[2]
```
wmic product get name,version,vendor
```
**Recent Documents**
```
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\RecentDocs
```
**Recent User Locations**
```
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\ComDlg32\LastVistitedMRU
```
**Typed URLs**
```
HKCU\Software\Microsoft\InternetExplorer\TypedURLs
```
**MRU List**
```
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\RunMRU
```
**Last Registry Key Accessed**
```
HKCU\Software\Microsoft\Windows\CurrentVersion\Applets\RegEdit /v LastKey
```
**View installed updates**
This information will give you an idea of how quickly systems are being patched and updated.
```
wmic qfe get Caption,Description,HotFixID,InstalledOn
```
## Networking
### Auditing Network Settings & Connections
**With netstat**
We use the options `-a` to display all listening ports and active connections. The `-b` lets us find the binary involved in the connection, while `-n` is used to avoid resolving IP addresses and port numbers. Finally, `-o` display the process ID (PID).
Open Connections
```
C:\> netstat ano
```
Listening Ports
```
netstat -an findstr LISTENING
```
Other netstat commands
```
C:\> netstat -e
C:\> netstat -naob
C:\> netstat -nr
C:\> netstat -vb
C:\> nbtstat -s
```
**TCP View**
"TCPView is a Windows program that will show you detailed listings of all TCP and UDP endpoints on your system, including the local and remote addresses and state of TCP connections. On Windows Server 2008, Vista, and XP, TCPView also reports the name of the process that owns the endpoint. TCPView provides a more informative and conveniently presented subset of the Netstat program that ships with Windows. The TCPView download includes Tcpvcon, a command-line version with the same functionality." (official definition)
![[Notes Cataloge/IT & System Admin Notes/Windows OS/tcpview-1.png]]

**View routing table**
```
C:\> route print
```
**View ARP table**
```
C:\> arp -a
```
**View IP info**
```
ipconfig/all
```
**View DNS settings**
```
C:\> ipconfig /displaydns
```
**Proxy Information**
```
C:\> netsh winhttp show proxy
```
**All IP configs**
```
C:\> ipconfig /allcompartments /all
```
**Network Interfaces**
```
C:\> netsh wlan show interfaces
C:\> netsh wlan show all
```
**With registry**
```
C:\> reg query
"HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Internet Settings\Connections\WinHttpSettings"
C:\> type %SYSTEMROOT%\system32\drivers\etc\hosts
```
**With wmic**
```
C:\> wmic nicconfig get
descriptions,IPaddress,MACaddress

C:\> wmic netuse get
name,username,connectiontype, localname
```
**Downloading a file from the command line**
```
Certutil -urlcache -f ‘url’
```
**Listing network shares on windows:**
```
net view \\10.10.20.229 /all
```
**Allow an incoming connection on specific port in the firewall**
Instead of the GUI interface, you can execute the below command
```
netsh advfirewall firewall add rule name="allowed_PORT" protocol=TCP dir=in localip=machine-ip  localport=port action=allow
```
Or you can do the same using Powershell
```
New-NetFirewallRule -DisplayName
"allowed_PORT" -Direction Inbound -Protocol TCP –LocalPort port -Action Allow
```
**Removing an Old IP**
```
ipcongif /release
```
**Add new ip address**
```
ipconfig /renew
```
**Refresh cache for the DNS**
```
ipconfig /flushdns
```
### Windows Port forwarding 
#### With Netsh command
**Syntax**
```
netsh interface portproxy add v4tov4 listenaddress=localaddress listenport=localport connectaddress=destaddress connectport=destport
```
- **listenaddress** –is a local IP address to listen for incoming connection.
- **listenport** – a local TCP port number to listen on (the connection is waiting on)
- **connectaddress** – is a local or remote IP address (or DNS name) to which you want to redirect the incoming connection
- **connectport** – is a TCP port to which the connection from `listenport` is forwarded to.

**Example**
The below command will redirect connections on port 3340 to 3389 and will let you to access RDP service on a non-standard port.
```
netsh interface portproxy add v4tov4 listenport=3340 listenaddress=10.1.1.110 connectport=3389 connectaddress=172.10.10.2
```
`10.1.1.110` Your computer IP address on which portforwarding is enabled.

`172.10.10.2` the remote server hosting RDP service on port 3389

Next you can use RDP and connect using port 3340.

`Note`: Make sure port 3340 is allowed in windows firewall as an incoming connection and also make sure that **iphlpsvc** (IP Helper) service running on your Windows device

After all the configs are complete, you can display all portforwarding rules enabled on the machine using the below command
[1]
```
netsh interface portproxy show all
```
[2]
```
netsh interface portproxy dump
```
In order to remove a specific port forwarding rule, run the below
```
netsh interface portproxy delete v4tov4 listenport=3340 listenaddress=10.1.1.110
```
To remove all port forwarding rules
```
netsh interface portproxy reset
```
### Network Shares
```
C:\> net use \\<TARGET IP ADDRESS>
C:\> net share
C:\> net session
```
With wmic
```
C:\> wmic volume list brief

C:\> wmic logicaldisk get
description,filesystem,name,size

C:\> wmic share get name,path
```
### Netsh Utility
**Saved wireless profiles**
```
netsh wlan show profiles
```
**Export wifi plaintext pwd**
```
netsh wlan export profile folder=. key=clear
```
**List interface IDs/MTUs**
```
netsh interface ip show interfaces
```
**Set IP**
```
netsh interface ip set address local static
IP netmask gateway ID
```
**Set DNS server**
```
netsh interface ip set dns local static ip
```
**Set interface to use DHCP**
```
netsh interface ip set address local dhcp
```
**Disable Firewall**
```
netsh advfirewall set currentprofile state off
netsh advfirewall set allprofiles state off
```
## Management
### System Info
**General**
```
systeminfo
```
**Check if machine is domain joined**
```
systeminfo | findstr Domain
```
**Date and Time**
```
C:\> echo %DATE% %TIME%
```
**Export OS info into a file with Powershell**
```
Get-WmiObject -class win32 operatingsjstem | select -property | exportcsv
c:\os.txt
```
**Host-Name**
```
C:\> hostname
```
**All systeminfo**
```
C:\> systeminfo
```
OS Name
```
C:\> systeminfo I findstr /B /C:"OS Name" /C:"OS Version"
```
System info with wmic
```
C:\> wmic csproduct get name
C:\> wmic bios get serialnumber
C:\> wmic computersystem list brief
```
System info with sysinternals
```
C:\> psinfo -accepteula -s -h -d

Ref. https://technet.microsoft.com/enus/
sysinternals/psinfo.aspx
```
### System Management Tools
Windows offers some great set of system management tools such as tools dedicated to display system information, troubleshooting problems, Event viewer, UAC settings, etc. All can be found by typing the below in the search box
```
msconfig --> Tools Tab
```
#### Troubleshooting Tool
Enter the below command in 'CMD'
```
C:\Windows\System32\control.exe /name Microsoft.Troubleshooting
```
#### Manage UAC
Enter the below command in 'CMD'
```
UserAccountControlSettings.exe
```
#### Computer Management Tool
Enter the below command in 'CMD'
```
compmgmt.msc
```
#### View Sys Info Tool
Enter the below command in 'CMD'
```
msinfo32.exe
```
#### Resource Monitor Tool
Enter the below command in 'CMD'
```
resmon.exe
```
#### Group Policy Management
**Definition**
Group policy editor is a windows administration tool that enables users to customize a number of crucial settings on their PCs or networks. Administrators have the ability to set up launch programs, password requirements, and which apps or settings users can modify.
To access the GUI of group policy editor
- Open Search in the Toolbar and type Run, or select Run from your Start Menu.
- Type ‘gpedit.msc’ in the Run command and click OK.
![[Notes Cataloge/IT & System Admin Notes/Windows OS/gpedit-1.webp]]
You can edit the setting by double-clicking on the related entry:
![[Notes Cataloge/IT & System Admin Notes/Windows OS/gpedit-2.webp]]

**Components**
- ***Computer Configuration:*** These policies apply to the local computer, and do not change per user.
- ***User Configuration:*** These policies apply to users on the local machine, and will apply to any new users in the future, on this local computer.
- Those two main categories are further broken down into sub-categories:
- ***Software Settings:*** Software settings contain software specific group policies: this setting is empty by default.

**Command Line Config**
Any of the commands below will list the current GPO settings and the second and third ones will send the output to an external file
```
C:\> gpresult /r
C:\> gpresult /z > <OUTPUT FILE NAME>.txt
C:\> gpresult /H report.html /F
```
With wmic
```
C:\> wmic qfe
```
#### Regular Windows
Use the user accounts in the control panel.
You can also change details about a specific user by running.
#### Managing users
##### Windows Server without AD
Use the utility 'RUN' and type the below
```
lusrmgr.msc
```
You will be able to manager groups and users more in details. Just type the below in the search box
```
netplwiz
```
#### Netview Tool
**Hosts in current domain**
```
net view /domain
```
**Hosts in example.com**
```
net view /domain:example.com
```
**All users in current domain**
```
net user /domain
```
**Add user**
```
net user user pass /add
```
**Add user to Administrators**
```
net localgroup "Administrators" user /add
```
**Show Domain password policy**
```
net accounts /domain
```
**List local Admins**
```
net localgroup "Administrators"
```
**List domain groups**
```
net group /domain
```
**List users in Domain Admins**
```
net group "Domain Adrnins" /domain
```
**List domain controllers for current domain**
```
net group "Domain Controllers 11 /domain
```
**Current SMB shares**
```
net share
```
**Active SMB sessions**
```
net session I find I "\\"
```
**Unlock domain user account**
```
net user user /ACTIVE:jes /domain
```
**Change domain user password**
```
net user user '' newpassword '' /domain
```
**Share folder**
```
net share share c:\share /GRANT:Everyone,FULL
```
#### PSexec
**Execute file hosted on an SMB share on a remote machine providing the credentials**
```
psexec /accepteula \\ targetiP -u domain\user -p password -c -f \\smbiP\share\file.exe
```
**Execute a command on a remote machine but authenticating through LM/NTLM hashing**
```
psexec /accepteula \\ ip -u Domain\user -p LM:NTLM cmd.exe ipconfig/all
```
**Remotely execute command as system**
```
psexec /accepteula \\ ip -s cmd.exe
```
### User Info and Management
Current user
```
C:\> whoami
```
Retrieve all users
```
C:\> net users
```
Retrieve administrators
```
C:\> net localgroup administrators
```
Retrieve administrators Groups
```
C:\> net group administrators
```
Retrieve user info with wmic
```
C:\> wmic rdtoggle list
C:\> wmic useraccount list
C:\> wmic group list
C:\> wmic netlogin get name, lastlogon,badpasswordcount
C:\> wmic netclient list brief
```
**Using history file**
```
C:\> doskey /history> history.txt
```
**Get information about other users according to department**
```
PS> Get-NetUser -filter "department=HR*"
```
## Services and processes
**Listing processes**
```
C:\> tasklist
```
Some filtering is helpful because the output is expected to be very long. You can check all available filters by displaying the help page using `tasklist /?`
**Listing processes with services**
```
C:\> tasklist /SVC
```
**Listing processes with DLLs**
```
C:\> tasklist /m
```
**Listing a specific process**
If you want to search for tasks related to `sshd.exe`, you can use the command `tasklist /FI "imagename eq sshd.exe"`. The `/FI` option specifies a filter, where `imagename eq sshd.exe` filters the tasks to only show those with the image name matching `sshd.exe`.
```
tasklist /FI "imagename eq sshd.exe"
```
**Listing Processes with remote IPs**
```
tasklist /S ip /v
```
**Listing Processes with their executables**
```
C: \> tasklist /SVC /fi "imagename eq svchost.exe"
```
**Force Process to terminate**
```
taskkill /PID pid /F
```
**Scheduled tasks list**
One of the below commands can be used
[1]
```
schtasks /query /fo LIST /v
```
[2]
```
schtasks /query /fo LIST 2>nul | findstr TaskName
```
[3]
```
dir C:\windows\tasks
```
[4]
```
schtasks /query /fo LIST /v
```
[5]
```
Get-ScheduledTask | where {$_.TaskPath -notlike "\Microsoft*"} | ft TaskName,TaskPath,State
```
[6]
```
Get-ScheduledTask
```
**Managing network services**
```
C:\> net start
```
**Managing services with `sc` and `wmic`**
```
C:\> sc query
C:\> wmic service list brief
C:\> wmic service list conf ig
C:\> wmic process list brief
C:\> wmic process list status
C:\> wmic process list memory
C:\> wmic job list brief | findstr "Running"
```
**Services running with PowerShell**
```
[1]
PS C:\> Get-Service I Where-Object { $_.Status -eq "running" }

[2]
get-service
```
**Description of common Windows processes**
***System***
The System process (process ID 4) is the home for a special kind of thread that runs only in kernel mode a kernel-mode system thread. System threads have all the attributes and contexts of regular user-mode threads (such as a hardware context, priority, and so on) but are different in that they run only in kernel-mode executing code loaded in system space, whether that is in Ntoskrnl.exe or in any other loaded device driver. In addition, system threads don't have a user process address space and hence must allocate any dynamic storage from operating system memory heaps, such as a paged or nonpaged pool.
![[Notes Cataloge/IT & System Admin Notes/Windows OS/system-1.png]]

***smss.exe***
This process, also known as the **Windows Session Manager**, is responsible for creating new sessions. It is the first user-mode process started by the kernel.
Smss.exe starts csrss.exe (Windows subsystem) and wininit.exe in Session 0, an isolated Windows session for the operating system, and csrss.exe and winlogon.exe for Session 1, which is the user session.
 ***csrss.exe***
Client Server Runtime Process is the user-mode side of the Windows subsystem. This process is always running and is critical to system operation. If this process is terminated by chance, it will result in system failure. This process is responsible for the Win32 console window and process thread creation and deletion. For each instance, csrsrv.dll, basesrv.dll, and winsrv.dll are loaded (along with others).
***wininit.exe***
The **Windows Initialization Process**, **wininit.exe**, is responsible for launching services.exe (Service Control Manager), lsass.exe (Local Security Authority), and lsaiso.exe within Session 0. It is another critical Windows process that runs in the background, along with its child processes.
![[wininit-tree.png]]

***services.exe***
Its primary responsibility is to handle system services: loading services, interacting with services and starting or ending services. It maintains a database that can be queried using a Windows built-in utility, `sc.exe`. Information regarding services is stored in the registry, `HKLM\System\CurrentControlSet\Services`
This process is the parent to several other key processes: svchost.exe, spoolsv.exe, msmpeng.exe, and dllhost.exe, to name a few.
![[Notes Cataloge/IT & System Admin Notes/Windows OS/services-tree.png]]

***Svchost***
The **Service Host** (Host Process for Windows Services), or **svchost.exe**, is responsible for hosting and managing Windows services.
![[Notes Cataloge/IT & System Admin Notes/Windows OS/dcomlaunch.png]]
`Image Path`: %SystemRoot%\System32\svchost.exe
`Parent Process`: services.exe
`Number of Instances`: Many
`User Account`: Varies (SYSTEM, Network Service, Local Service) depending on the svchost.exe instance. In Windows 10, some instances run as the logged-in user.
`Start Time`: Typically within seconds of boot time. Other instances of svchost.exe can be started after boot.

***lsass.exe***
Local Security Authority Subsystem Service (**LSASS**) is a process in Microsoft Windows operating systems that is responsible for enforcing the security policy on the system. It verifies users logging on to a Windows computer or server, handles password changes, and creates access tokens. It also writes to the Windows Security Log.

***Winlogon.exe***
This process is also responsible for loading the user profile. It loads the user's NTUSER.DAT into HKCU, and userinit.exe loads the user's shell.
![[Notes Cataloge/IT & System Admin Notes/Windows OS/winlogon-tree.png]]

***Explorer.exe***
This process gives the user access to their folders and files. It also provides functionality for other features, such as the Start Menu and Taskbar.

## File and Directory Management 
#### Directories
You can use `cd` without parameters to display the current drive and directory. It is the equivalent of asking the system, _where am I?_
You can view the child directories using `dir`.
- `dir /a` - Displays hidden and system files as well.
- `dir /s` - Displays files in the current directory and all subdirectories.

You can type `tree` to visually represent the child directories and subdirectories.

You can navigate to any directory by using the command `cd target_directory`, which is similar to double-clicking on the target directory on your desktop. Additionally, you can use `cd ..` to move up one level in the directory hierarchy.

To create a directory, use the command `mkdir directory_name`, where `mkdir` stands for "make directory." To remove a directory, use the command `rmdir directory_name`, where `rmdir` stands for "remove directory."

#### Viewing Files
When working with the command line, you can view the contents of a text file using the `type` command. This command displays the entire content of the file on your screen, which is particularly convenient for shorter files that fit within your terminal window. For longer files, you might prefer the `more` command. It shows the file contents one page at a time, allowing you to press the Spacebar to advance by a page or Enter to move down one line.

The `copy` command allows you to copy files from one location to another.
```
copy file1.txt file2.txt
```
Similarly, you can move files using the `move` command.
```
C:\example>move test2.txt .. 
1 file(s) moved.
```
Finally, we can delete a file using `del` or `erase`.
```
C:\example>erase test2.txt
```
#### Searching Files
Based on the extension
[1]
```
C:\> dir /A /5 /T:A *.exe *.dll *.bat *·PS1 *.zip
```
[2] Below will do the same as above but specifying a date which will list the files newer than the date used in the command
```

C:\> for %G in (.exe, .dll, .bat, .ps) do forfiles -p "C:" -m *%G -s -d +1/1/2023 -c "cmd /c echo @fdate @ftime @path"
```
**Based on the name**
```
C:\> dir /A /5 /T:A bad.exe
```
**Based on date** 
Below will find `.exe` files after `01/01/2023`
```
C:\> forfiles /p C:\ /M *.exe /5 /0 +1/1/2023 /C "cmd /c echo @fdate @ftime @path"
```
**Based on date with Powershell**
Below will return files that were modified past 09/21/2023
```
Get-Childitem -Path c:\ -Force -Rec~rse -Filter '.log -ErrorAction
Silentl~Con~inue I where {$ .LastWriteTime -gt ''2012-09-21''}
```
**Based on the size**
Below will find files smaller than 50MB
```
C:\> forfiles /5 /M * /C "cmd /c if @fsize GEO
5097152 echo @path @fsize"
```
Based alternate data streams
```
C:\> streams -s <FILE OR DIRECTORY>
```
[Tool link](https://technet.microsoft.com/enus/sysinternals/streams.aspx)
#### Prcoessing
**Display file content**
```
[1]
get-content file

[2]
type file
```
Pipe output to clipboard
```
C:\> some_command.exe I clip
```
Output clip to file
```
PS C:\> Get-Clipboard> clip.txt
```
**Combine contents of multiple files**
```
C:\> type <FILE NAME 1> <FILE NAME 2> <FILE NAME 3>> <NEW FILE NAME>
```
**Compare two files for changes**
```
PS C:\> Compare-Object (Get-Content ,<LOG FILE NAMEl>.log) -DifferenceObject (Get-Content.<LOG FILENAME 2>.log)
```
**Download a file over http with Powershell**
```
(new-object sjstem.net.webclient) .downloadFile("url","C:\temp")
```
#### Permissions Management
Check permissions of a file
```
icacls FILE
```
## Startup and Autorun Management
**With wmic**
```
C:\> wmic startup list full
C:\> wmic ntdomain list brief
```
**By viewing the contents startup folder**
```
C:\> dir
"%SystemDrive%\ProgramData\Microsoft\Windows\Start Menu\P rog rams\Startup"

C:\> dir "%SystemDrive%\Documents and Settings\All

Users\Sta rt Menu\Prog rams\Sta rtup"
C:\> dir %userprofile%\Start Menu\Programs\Startup

C:\> %ProgramFiles%\Startup\

C:\> dir C:\Windows\Start Menu\Programs\startup

C:\> dir "C:\Users\%username%\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup"

C:\> dir "C:\ProgramData\Microsoft\Windows\Start
Menu\Programs\Startup"

C:\> dir "%APPDATA%\Microsoft\Windows\Start
Menu\Programs\Startup"

C:\> dir "%ALLUSERSPROFILE%\Microsoft\Windows\Start
Menu\Programs\Startup"

C:\> dir "%ALLUSERSPROFILE%\Start
Menu\Programs\Startup"
```
Through wininit
```
C:\> type C:\Windows\winstart.bat
C:\> type %windir%\wininit.ini
C:\> type %windir%\win.ini
```
**With Sysinternal tools**
```
C:\> autorunsc -accepteula -m
C:\> type C:\Autoexec.bat"
```
**You can also export the output to a CSV file**
```
C:\> autorunsc.exe -accepteula -a -c -i -e -f -l -m -v
```
**With regsitry**
```
C:\> reg query HKCR\Comfile\Shell\Open\Command

C:\> reg query HKCR\Batfile\Shell\Open\Command

C:\> reg query HKCR\htafile\Shell\Open\Command

C:\> reg query HKCR\Exefile\Shell\Open\Command

C:\> reg query HKCR\Exefiles\Shell\Open\Command

C:\> reg query HKCR\piffile\shell\open\command

C:\> reg query uHKCU\Control Panel\Desktop"

C:\> reg query
HKCU\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer\Run

C:\> reg query
HKCU\Software\Microsoft\Windows\CurrentVersion\Run

C:\> reg query
HKCU\Software\Microsoft\Windows\CurrentVersion\Runonce

C:\> reg query
HKCU\Software\Microsoft\Windows\CurrentVersion\RunOnceEx

C:\> reg query
HKCU\Software\Microsoft\Windows\CurrentVersion\RunServices

C:\> reg query
HKCU\Software\Microsoft\Windows\CurrentVersion\RunServicesOnce

C:\> reg query
HKCU\Software\Microsoft\Windows\CurrentVersion\Windows\Run

C:\> reg query
HKCU\Software\Microsoft\Windows\CurrentVersion\Windows\Load

C:\> reg query
HKCU\Software\Microsoft\Windows\CurrentVersion\Windows\Scripts

C:\> reg query «HKCU\Software\Microsoft\Windows
NT\CurrentVersion\Windows« /f run

C:\> reg query «HKCU\Software\Microsoft\Windows
NT\CurrentVersion\Windows« /f load

C:\> reg query
HKCU\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer\Run

C:\> reg query
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\RecentDocs

C:\> reg query
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\ComDlg32\LastVisitedMRU

C:\> reg query
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\ComD1g32\0pen5aveMRU

C:\> reg query
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\ComDlg32\LastVisitedPidlMRU

C:\> reg query
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\ComD1g32\0pen5avePidlMRU /s

C:\> reg query
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\RunMRU

C:\> reg query
«HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders"

C:\> reg query
uHKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders"

C:\> reg query
HKCU\Software\Microsoft\Windows\CurrentVersion\Applets\RegEdit /v LastKey

C:\> reg query "HKCU\Software\Microsoft\InternetExplorer\TypedURLs"

C:\> reg query
uHKCU\Software\Policies\Microsoft\Windows\ControlPanel \Desktop"

C: \> reg query uHKLM\SOFTWARE\Mic rosoft\Act iveSetup\Installed Components" /s

C:\> reg query
"HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\explorer\User Shell Folders"

C:\> reg query
"HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\explorer\Shell Folders"

C:\> reg query
HKLM\Software\Microsoft\Windows\CurrentVersion\explorer\ShellExecuteHooks

C:\> reg query
"HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Browser Helper Objects" /s

C:\> reg query
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Explorer\Run

C:\> reg query
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run

C:\> reg query
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Runonce

C:\> reg query
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnceEx

C:\> reg query
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\RunServices
C:\> reg query

HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\RunServicesOnce

C:\> reg query
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Winlogon\Userinit

C:\> reg query
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\shellServiceObjectDelayLoad

C:\> reg query "HKLM\SOFTWARE\Microsoft\Windows
NT\CurrentVersion\Schedule\TaskCache\Tasks" /s

C:\> reg query "HKLM\SOFTWARE\Microsoft\Windows
NT\CurrentVersion\Windows"

C:\> reg query "HKLM\SOFTWARE\Microsoft\Windows
NT\CurrentVersion\Windows" /f Appinit_DLLs

C:\> reg query "HKLM\SOFTWARE\Microsoft\Windows
NT\CurrentVersion\Winlogon" /f Shell

C: \> reg query "HKLM\SOFTWARE\Mic rosoft\WindowsNT\CurrentVersion\Winlogon" /f Userinit

C:\> reg query
HKLM\SOFTWARE\Policies\Microsoft\Windows\Systern\Scripts
C:\> reg query

HKLM\SOFTWARE\Classes\batfile\shell\open\cornrnand

C:\> reg query
HKLM\SOFTWARE\Classes\cornfile\shell\open\cornrnand

C:\> reg query
HKLM\SOFTWARE\Classes\exefile\shell\open\command

C:\> reg query
HKLM\SOFTWARE\Classes\htafile\Shell\Open\Command

C:\> reg query
HKLM\SOFTWARE\Classes\piffile\shell\open\command

C:\> reg query "HKLM\SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Explorer\Browser Helper Objects" /s

C:\> reg query
"HKLM\SYSTEM\CurrentControlSet\Control\Session
Manager"

C:\> reg query
"HKLM\SYSTEM\CurrentControlSet\Control\Session
Manager\KnownDLLs"

C:\> reg query
"HKLM\SYSTEM\ControlSet001\Control\Session
Manager\KnownDLLs"
```
## Windows Event Logs
### Definition
Event logs are records created by Windows OS for the purpose of troubleshooting issues, assessing performance and security investigation.
### Elements of Event Logs
- **System Logs:** Records events associated with the Operating System segments. They may include information about hardware changes, device drivers, system changes, and other activities related to the device.
- **Security Logs:** Records events connected to logon and logoff activities on a device. The system's audit policy specifies the events. The logs are an excellent source for analysts to investigate attempted or successful unauthorized activity.
- **Application Logs**: Records events related to applications installed on a system. The main pieces of information include application errors, events, and warnings.
- **Directory Service Events:** Active Directory changes and activities are recorded in these logs, mainly on domain controllers.
- **File Replication Service Events:** Records events associated with Windows Servers during the sharing of Group Policies and logon scripts to domain controllers, from where they may be accessed by the users through the client servers.
- **DNS Event Logs:** DNS servers use these logs to record domain events and to map out
- **Custom Logs:** Events are logged by applications that require custom data storage. This allows applications to control the log size or attach other parameters, such as ACLs, for security purposes.
### Tools 
1. **Event Viewer** (GUI-based application)
![[Notes Cataloge/IT & System Admin Notes/Windows OS/event-viewer-1.gif]]
For example, in the below image there are 44 events logged. You might see a different number. Each column of the pane presents a particular type of information as described below:
- ***Level:*** Highlights the log recorded type based on the identified event types specified earlier. In this case, the log is labeled as **Information**.
- ***Date and Time:*** Highlights the time at which the event was logged.
- ***Source:*** The name of the software that logs the event is identified. From the above image, the source is PowerShell.
- ***Event ID:*** This is a predefined numerical value that maps to a specific operation or event based on the log source. This makes Event IDs not unique, so `Event ID 4103` in the above image is related to Executing Pipeline but will have an entirely different meaning in another event log.
- ***Task Category:*** Highlights the Event Category. This entry will help you organize events so the Event Viewer can filter them. The event source defines this column.
![[Notes Cataloge/IT & System Admin Notes/Windows OS/event-viewer-2.png]]

2. **Wevtutil.exe** (command-line tool)
***Running it from the command line***
```
wevtutil.exe
```
***requesting the help menu***
```
wevtutil.exe /?
```
You can start by copying the event logs into an external log files so that you can investigate them separately.
```
C:\> wevtutil epl Security C:\<BACK UP
PATH>\mylogs.evtx
C:\> wevtutil epl System C:\<BACK UP
PATH>\mylogs.evtx
C:\> wevtutil epl Application C:\<BACK UP
PATH>\mylogs.evtx
```
Auditing the application logs and returning 3 results, descending order and text format
```
wevtutil qe Application /c:3 /rd:true /f:text
```
***Clear all logs***
```powershell
PS C:\> wevtutil el I Foreach-Object {wevtutil cl "$_"}
```
3. **Get-WinEvent** (PowerShell cmdlet)
This is a PowerShell cmdlet called **Get-WinEvent**. Per Microsoft, the Get-WinEvent cmdlet "gets events from event logs and event tracing log files on local and remote computers." It provides information on event logs and event log providers. Additionally, you can combine numerous events from multiple sources into a single command and filter using XPath queries, structured XML queries, and hash table queries.

***Auditing all the logs in the local PC***
[1]
```powershell
PS C:\> Get-WinEvent -ListLog * | Select-Object LogName, RecordCount, IsClassicLog, IsEnabled, LogMode, LogType | Format-Table -AutoSize
```
[2]
```powershell
PS C:\> Get-Eventlog -list
```
***Auditing log providers***
```powershell
Get-WinEvent -ListProvider * | Format-Table -Autosize
```
***Listing log providers with 'powershell' as a keyword***
```powershell
Get-WinEvent -ListProvider *PowerShell
```
***Listing events related to windows powershell***
```powershell
Get-WinEvent -ListProvider Microsoft-Windows-PowerShell  | Format-Table Id, Description
```
***Listing available logs containing given keyword***
```powershell
Get-WinEvent -ListLog * | findstr “kw”
```
***Listing events on a specific log path***
```powershell
Get-WinEvent -FilterHashtable @{logname=”Microsoft-Windows-PrintService/Admin”} | fl -property *
```
***Finding process related information using a given keyword about the process***
```powershell
Get-WinEvent -Path .\file.evtx -FilterXPath ‘*/System/EventID=1’ | Sort-Object TimeCreated | Where-Object {$_.Message -like “*kw*”} | fl
```
## Troubleshooting
### Fixing corrupted system files
Execute the below commands 
```
DISM /Online /Cleanup-Image /ScanHealth
DISM /Online /Cleanup-Image /RestoreHealth
sfc /scannow
```
### Hard Disk not detected when installing windows from usb 
![[windows-hdd-notfound-installinng-windows.jpg]]
Press shift+F10 to start the command promopt.
Execute the below command to start DISKPART
```
DISKPART
```
Then list volumes using the below command
```
list volume
```
Select the volume to which you want to install windows  and execute the below commands
```
select disk [disknumber]
clean
convert mbr
create partition primary
active
format quick fs=ntfs
```
### Java Error 1603
This error happens when you attempt to install/update JAVA for Windows. There are multiple options/steps to take to resolve this issue.
#### Choose earlier version to install
First uninstall any prior version
```
https://www.java.com/en/download/uninstalltool.jsp
```
Then simply go the below link and choose prior version 
```
https://www.oracle.com/tr/java/technologies/javase/javase8-archive-downloads.html
```
#### Disable The current AV
Try to disable your AV solution whether it's Windows defender or any third party AV.
#### Use Microsoft install/uninstall troubleshooter
Download the tool from the below link
```
https://support.microsoft.com/en-gb/help/17588/fix-problems-that-block-programs-from-being-installed-or-removed
```
#### Delete KB2918614 Update
This was update was known to cause conflict with Java.
Simple go to  **Programs in Features** then click on **View installed updates** link in the left pane.
You will see the list of installed updates. Search for KB2918614. Click on the KB2918614 Windows update and click **Uninstall** button.
### Fix System corrupted files
Run CMD as admin and execute the below commands
```
DISM /Online /Cleanup-Image /ScanHealth
DISM /Online /Cleanup-Image /ScanHealth
DISM /Online /Cleanup-Image /RestoreHealth
sfc/scannow
```
### Fixing BSOD
#### 1. Download and Run BlueScreenView
- Download from: https://www.nirsoft.net/utils/blue_screen_view.html
- Run the executable; it’s portable—no installation needed.
#### 2. Scan for Crash Dumps
- BlueScreenView automatically loads **`minidump` files** (usually from `C:\Windows\Minidump`) created during crashes.
#### 3. Analyze Crash Information
- **Upper Pane:** Lists each crash with date/time, bug check code (e.g., `0x0000007E`), and parameters.
- **Lower Pane:** Displays loaded drivers during the crash.
    - **Highlighted drivers** (in pink/red): Likely culprits.
#### 4. Identify the Faulty Driver or Module
- Look for:
    - **`Bug Check String`** (e.g., `IRQL_NOT_LESS_OR_EQUAL`)
    - **`Caused By Driver`** (e.g., `nvlddmkm.sys`)
    - This points to a specific driver that may have caused the BSOD.
#### 5. Apply the Fix
Based on the suspected cause:
- **Outdated Driver:**
    - Update via **Device Manager** or the **manufacturer's website**.
- **Recently Installed Software/Update:**
    - Uninstall via `Control Panel > Programs`.
- **Faulty Hardware:**
    - Run diagnostics (e.g., **MemTest86** for RAM, **chkdsk** for HDD).
- **Corrupted System Files:**
    - Run Command Prompt as admin and use:
```
sfc /scannow
```
**Overheating Issues:**
- Check cooling, fans, and thermal paste.
#### 6. Reboot and Test
- After applying changes, reboot and monitor for stability.
- If another BSOD occurs, re-check with BlueScreenView.

### Fixing winload.exe is missing or corrupt issue on Windows 7 startup
Only the Windows 7 bootloader has support for booting from a VHD and is also capable of booting into Windows XP.  

To reinstall the Windows 7 bootloader, insert a Windows 7 installation disc, select the repair option, then open the command prompt. 

From there, run the commands `bootrec /fixmbr` followed by `bootrec /fixboot`.
### Fixing Startup Issues
- Insert the Windows installation USB into your drive and restart the computer.

- When prompted, press any key to boot from the USB.

- Choose your language, time, currency format, and keyboard input method, then click **Next**.

- Select **Repair your computer**.

- Pick the operating system you wish to repair and click **Next**.

- In the **System Recovery Options**, select **Command Prompt**.

- At the prompt, type `Bootrec.exe` and press **Enter**.

Here are the available Bootrec options:

- **/FixMbr**  
    Writes a new master boot record (MBR) compatible with Windows Vista/7 to the system partition. It doesn’t change the partition table. Use this if the MBR is corrupted or contains nonstandard code.
    
- **/FixBoot**  
    Installs a new boot sector using a Windows Vista/7-compatible version. Use this if:
    
    - The current boot sector is nonstandard or corrupted.
        
    - An older Windows OS was installed after Vista/7, causing the system to boot with NTLDR instead of Bootmgr.
        
- **/ScanOs**  
    Scans all drives for Windows Vista/7 installations not listed in the Boot Configuration Data (BCD). Use it if installations are missing from the boot menu.
    
- **/RebuildBcd**  
    Searches all drives for Vista/7 installations and lets you add them to the BCD store. Use this to completely rebuild the BCD.
    

**Note:** If you're troubleshooting a “Bootmgr Is Missing” error and rebuilding the BCD doesn’t help, try exporting and deleting the BCD store, then rebuild it again:
```
bcdedit /export C:\BCD_Backup  
c:  
cd boot  
attrib bcd -s -h -r  
ren c:\boot\bcd bcd.old  
bootrec /RebuildBcd
```
## Windows Security and Hardening
### Disable Always Install Elevated
Navigate to the below configs in group policy and make sure/set the value is `Disabled.`
```
Computer Configuration\Administrative Templates\Windows Components\Windows Installer

User Configuration\Administrative Templates\Windows Components\Windows Installer
```
### Anti-KeyLoggers
- `Zemana AntiLogger (Free)`
This "free" version is a bare-bones keylogger-detector. In fact, it's quite stripped down but if all you require is being alerted then this might be for you.
- `SpyShelter STOP-LOGGER`
The Free version offers more than Zemana does in that you get screenshot capture. It will also alert you to any code that tries to swipe your keystrokes from you but the Free version is not 64-bit compatible. It is $24.99.
### Windows Defender and Windows Firewall
#### Windows Defender
These two come pre-installed in nearly all new and modern Windows operating systems. An average user can safely rely on them for security given that they practice safety controls when downloading files from the internet or when dealing with email attachments.

On server editions of Windows, make sure to block inbounds ports 135,137,138,139 if have file shares whether the PCs are on a workgroup or domain. You can simply do that by creating an inbound rule in Windows firewall and block the aforementioned ports.

**Windows Security** is also available in **Settings**.
![[Notes Cataloge/IT & System Admin Notes/Windows OS/windows-security-1.png]]
 - **Green** means your device is sufficiently protected, and there aren't any recommended actions.
- **Yellow** means there is a safety recommendation for you to review.
- **Red** is a warning that something needs your immediate attention.

Windows defender offers three types of scans:
- **Quick scan** - Checks folders in your system where threats are commonly found.
- **Full scan** - Checks all files and running programs on your hard disk. This scan could take longer than one hour.
- **Custom scan** - Choose which files and locations you want to check.
#### Network Profiles in Windows Firewall
Windows Firewall offers **two types of network profiles**. It determines your current network type using **Network Location Awareness (NLA)** and automatically applies the corresponding firewall settings. Each profile can have distinct firewall configurations tailored to different security needs.

🔹 **Private Networks**: Used when connected to a trusted home network. This profile allows for **more relaxed** firewall settings, enabling secure device communication within the network.

🔹 **Guest or Public Networks**: Applied when connected to an **untrusted** network, such as those in **coffee shops, restaurants, or public spaces**. This profile is configured for **higher security**, often **blocking all incoming connections** while permitting only essential outgoing connections. For example, when on a public Wi-Fi network, you might want to **restrict inbound traffic** while still allowing necessary outbound communication.
![[Notes Cataloge/IT & System Admin Notes/Windows OS/net-profiles-1.png]]

#### Managing Firewall Settings
You can customize **which applications** are allowed or blocked in each network profile:

✅ **Allow/Disallow Applications**  
To modify app permissions, navigate to the **application settings** . This section lists all installed apps, allowing you to **check or uncheck** applications based on whether they should be permitted on your selected network profile.

✅ **Turning Windows Firewall On/Off**  
By default, **Windows Defender Firewall** is **enabled**. If needed, you can access the firewall settings (highlighted as **2**) to turn it **on or off** for each network profile. However, Microsoft **recommends keeping the firewall enabled** and instead suggests **blocking all incoming connections** rather than completely disabling it.

✅ **Restoring Default Settings**  
If you need to **reset** the firewall settings, you can select the **"Restore Defaults"** option ). This will revert all firewall configurations back to their **original settings**.

#### Creating a Custom Firewall Rule

1️⃣ **Open Advanced Settings**  
From the main dashboard, select **"Advanced Settings."** This opens a new tab where you can manage rules.
![[Notes Cataloge/IT & System Admin Notes/Windows OS/custom-rules-1.png]]
2️⃣ **Choose Outbound Rules**  
Click **"Outbound Rules"** on the left, then **"New Rule"** on the right. This starts the rule creation wizard.
![[Notes Cataloge/IT & System Admin Notes/Windows OS/custom-rules-2.png]]
3️⃣ **Select Custom Rule**  
In the first step, choose **"Custom"** and click **Next.**
![[Notes Cataloge/IT & System Admin Notes/Windows OS/custom-rules-3.png]]
4️⃣ **Apply to All Programs**  
In the next step, select **"All Programs"** and proceed.
![[Notes Cataloge/IT & System Admin Notes/Windows OS/custom-rules-4.png]]
5️⃣ **Set Protocol and Ports**

- Choose **"TCP"** as the protocol.
- Leave the **Local port** as is.
- Under **Remote port**, select **"Specific ports"** and enter **80,443** (separated by a comma, no spaces).

6️⃣ **Scope Settings**  
Keep the **local and remote IP addresses** unchanged and proceed.

7️⃣ **Block the Connection**  
In the **Action tab**, select **"Block the connection"** and continue.
![[custom-rules-5.png]]
8️⃣ **Apply to All Network Profiles**  
Ensure all network profiles are checked.

9️⃣ **Name the Rule**  
Give your rule a name and description, then click **Finish.**

The rule is now listed under outbound rules, preventing outgoing traffic on **ports 80 and 443.**
#### Firewall Operations
Auditing current firewall rules
```
C:\> netsh advfirewall firewall show rule name=all
```
Turn off/on the firewall
```
C:\> netsh advfirewall set allprofile state on
C:\> netsh advfirewall set allprof ile state off
```
Block inbound and allow outbound traffic.
This rule can be used on workstations that don't play the role of a server
```
C:\> netsh advfirewall set currentprofile
firewallpolicy blockinboundalways,allowoutbound
```
Open port 80 and allow inbound http traffic.
Usually it's applied on machines that play the role of a webserver
```
C:\> netsh advfirewall firewall add rule name="Open
Port 80" dir=in action=allow protocol=TCP
localport=80
```
Allow an application to receive inbound traffic. 
```
C:\> netsh advfirewall firewall add rule name="My
Application" dir=in action=allow
program="C:\MyApp\MyApp.exe" enable=yes
```
Allow an application to receive inbound traffic and specify the profile, remote IP and subnet. 
The profile value can be `public`, `private` or `domain`
```
netsh advfirewall firewall add rule name="My
Application" dir=in action=allow
program="C:\MyApp\MyApp.exe" enable=yes
remoteip=ip1,172.16.0.0/16,LocalSubnet
profile=domain
```
Delete a rule
```
C:\> netsh advfirewall firewall delete rule
name=rule name program="C:\MyApp\MyApp.exe"
```
Setting up the logging location
```
C:\> netsh advfirewall set currentprofile logging
C:\<LOCATION>\<FILE NAME>
```
Firewall logs location
```
C:\>%systemroot%\system32\LogFiles\Firewall\pfirewa
ll. log
```
You can also disable logging using Powershell
```
PS C:\> Get-Content
$env:systemroot\system32\LogFiles\Firewall\pfirewal.log
```
Alternatively, you can control firewall settings using the GUI:
![[Notes Cataloge/IT & System Admin Notes/Windows OS/windows-firewall-1.png]]
#### Windows Smart Screen
Microsoft Defender SmartScreen protects against phishing or malware websites and applications, and the downloading of potentially malicious files.
![[Notes Cataloge/IT & System Admin Notes/Windows OS/windows-app-control-1.png]]
Additionally, exploit protection is built into Windows 11 to help protect your device against attacks.
![[Notes Cataloge/IT & System Admin Notes/Windows OS/windows-exploit-protection-1.png]]

### Disable Modifying Scheduled Tasks
Useful if applied on non-admin endpoints
[1]
```
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\Task Scheduler5.0" /v DragAndDrop /t REG_DWORD /d 1
```
[2]
```
reg add "
HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\Task Scheduler5.0" /v Execution /t REG_DWORD /d 1
```
[3]
```
reg add "
HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\Task Scheduler5.0" /v Task Creation /t REG_DWORD /d 1
```
[4]
```
reg add "
HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\Task Scheduler5.0" /v Task Deletion /t REG_DWORD /d 1
```
### Disable RunOnce
Useful to fight against rootkits and malwares
```
reg add
HKLM\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer /v DisableLocalMachineRunOnce /t REG_DWORD /d 1
```
### Enabling Credential Guard
Prevent credential dumping in Windows 10 by enabling windows credential guard. Execute the below commands to modify the registry
[1]
```
reg add
"HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\DeviceGuard" /v "EnableVirtualizationBasedSecurity" /d 1 /t REG_DWORD
```
[2]
```
reg add
"HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\DeviceGuard" /v "RequirePlatformSecurityFeatures" /d 1 /t REG_DWORD
```
[3]
```
reg add
"HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\LSA" /v "LsaCfgFlags" /d 1 /t REG_DWORD
```
### Enable UAC
User Account Control (UAC) is a feature that enforces enhanced access control and ensures that all services and applications execute in non-administrator accounts. It helps mitigate malware's impact and minimizes privilege escalation by bypassing UAC. Actions requiring elevated privileges will automatically prompt for administrative user account credentials if the logged-in user does not already possess these.
To access UAC, go to `Control Panel -> User Accounts` and click on `Change User Account Control Setting`. Keep the notification level "**Always Notify**" in the User Account Control Settings.
### Setting a Password Policy
Open group policy editor and Go to `Security settings > Account Policies > Password policy`
![[Notes Cataloge/IT & System Admin Notes/Windows OS/password-policy.png]]
### Setting a lockout policy
To protect your system password from being guessed by an attacker, we can set out a lockout policy so the account will automatically lock after certain invalid attempts. To set a lockout policy, go to `Local Security Policy > Windows Settings > Account Policies > Account Lockout Policy` and configure values to lock out hackers after three invalid attempts.
![[Notes Cataloge/IT & System Admin Notes/Windows OS/lockout-policy.png]]
### Disabling RDP and SMB
if you don't need remote assistance through RDP protocol and you don't host file sharing server through SMB then it would be better from a security standpoint to disable them
**Disabling RDP**
In Windows, settings > Remote Desktop and tick the box `Don't allow remote connections to this computer`
![[rdp-disallow.png]]
**Disabling SMB**
Execute the below in Powershell
```
Disable-WindowsOptionalFeature -Online -FeatureName SMB1Protocol
```
### Application Security
#### Installing apps only from Microsoft store
Go to `Setting > Select Apps and Features` and then select `The Microsoft Store only`
#### Running Applications from a sandbox
To run applications safely, we can use a temporary, isolated, lightweight desktop environment called Windows Sandbox. We can install software inside this safe environment, and this software will not be a part of our host machine, it will remain sandboxed. Once the Windows Sandbox is closed, everything, including files, software, and states will be deleted. We would require Virtualization enabled on our OS to run this feature.
for enabling the Sandbox feature are as below:
`Click Start > Search for 'Windows Features' and turn it on > Select Sandbox > Click OK to restart`
![[sandbox-1.png]]

#### Control App Execution Rules Through AppLocker
AppLocker is a recently introduced feature that allows users to block specific executables, scripts, and installers from execution through a set of rules. We can easily configure them on a single PC or network through a GUI by the following method:
![[applocker-1.png]]
Below you can see how an app can be blocked based on publisher name
![[applocker-2.gif]]
### Enabling Microsoft Smartscreen
Microsoft SmartScreen helps to protect you from phishing/malware sites and software when using Microsoft Edge. It helps to make informed decisions for downloads and lets you browse safely in Microsoft Edge.
To turn on the Smart Screen, go to `Settings > Windows Security > App and Browser Control > Reputation-based Protection`. Scroll down and turn on the `SmartScreen option`.
### Boot Security
Secure boot – an advanced security standard checks that your system is running on trusted hardware and firmware before booting, which ensures that your system boots up safely while preventing unauthorised software access from taking control of your PC, like malware. 
You are already in a secure boot environment if you run a modern PC with Unified Extensible Firmware Interface UEFI (the best replacement for BIOS) or Windows 10. 
To check if secure boot is enabled, type the below command below in `run`
```
msinfo32
```
and locate the row where it says `secure boot state`
You can enable secure boot from BIOS by following the below steps
```
1. - You can often access this menu by pressing a key while your PC is booting, such as F1, F2, F12, or Esc.
Or
- From Windows, hold the Shift key while selecting Restart. 
- Go to Troubleshoot > Advanced Options: UEFI Firmware Settings.
        
2. Find the Secure Boot setting in your BIOS menu. If possible, set it to Disabled. 
3. This option is usually in either the Security tab, the Boot tab, or the Authentication tab.
    
3. Save changes and exit. The PC reboots.
```
### Virus and Malware Removal
#### Automated Removal with Removal Tools
**GMER**
GMER will attempt to find any rootkits by scanning files, registry entries, drives and processes.
```
http://www2.gmer.net/
```
**Windows Defender**
Performing an offline scan with windows security is another method of detecting rootkits and viruses on your window operating system.
### Disk Encryption
Microsoft, for its business edition of Windows, utilises the encryption tools by BitLocker.
Go to `Start > Control Panel > System and Security > BitLocker Drive Encryption`. You can easily see if the option to BitLocker Drive Encryption is enabled or not.
![[bitlocker-1.png]]
## Backup and Recovery
### Group Policy Update and Recovery
Backup GPO Audit Policy to backup file
```
C:\> auditpol /backup /file:C\auditpolicy.csv
```
Restore GPO Audit Policy from backup file
```
C:\> auditpol /restore /file:C:\auditpolicy.csv
```
Backup All GPOs in domain and save to Path
```
PS C:\> Backup-Gpo -All -Path \\<SERVER>\<PATH TO BACKUPS>
```
Restore All GPOs in domain and save to Path
```
PS C:\> Restore-GPO -All -Domain <INSERT DOMAIN
NAME> -Path \\Serverl\GpoBackups
```
### Volume Shadow Service
VSS is used to create snapshots of files/entire volumes while they are still in use. You can create or store shadow copies on a local disk, external hard drive, or network drive. Every time a system restore point is created, you will have a valid shadow copy. Shadow Copy maintains snapshots of the entire volumes, so you can also use shadow copies to recover deleted files besides restoring system.
**Enabling and Creating Shadow Copies and system restore points**
Steps
```
Step 1. Type **Create a restore point** in the search box and select it. Then, in the System Properties, **choose a drive** and click **Configure**.

Step 2. In the new window, tick **Turn on system protection** and click **Apply** to enable.

Step 3. Click **Create** to enable volume shadow copy in Windows 10.
```
**Creating Shadow Copies and Restore Points using Task Scheduler**
By using task scheduler, you can create shadow copies and restore points at a regular time intervals.
Steps
```
Step 1. Open Task Scheduler. You can click **Start**, type **task scheduler** and select it from the list.

Step 2. Click **Create Task** and then specify a name for the task (eg: ShadowCopy).

Step 3. Create a new trigger. You can click the **Triggers** tab and **New...** option at the lower location, then select one setting among one time, daily, weekly, monthly.

Step 4. Enable shadow copy. You can click the **Actions** tab and **New... option**, type **wmic** under the Program or script option, input the argument **shadowcopy call create Volume=C:\** at the blank box on the right side.
```
**Restoring Shadow Copies using previous versions**
Steps
```
Step 1. **Navigate to the file or folder** you want to restore in a previous state and right-click it, then select Restore Previous Versions from the drop-down menu. In addition, you still can select **Properties** and click the **Previous Versions** tab.

Step 2. Select the correct version of file or folder to restore.

In this window, you can see 3 options, including **Open**, **Copy**, **Restore**.  
● The Open button will navigate to the location where the file or folder is stored.   
● The Copy button allows you to copy file or folder to another location on the computer, even on external hard drive.  
● The Restore button gives you a chance to restore the file or folder to the same location and replace the existing version.
```
**Restore Snapshots and Shadow Copies using Shadow Explorer Tool**
Download the tool from the below link
```
https://www.shadowexplorer.com/downloads.html
```
**Managing Shadow Copies From The Command Line**
Start Volume Shadow Service
```
C:\> net start VSS
```
List all shadow files and storage
```
C:\> vssadmin List ShadowStorage
```
List all shadow files
```
C:\> vssadmin List Shadows
```
Browse Shadow Copy for files/folders
```
C:\> mklink /d c:\<CREATE FOLDER>\<PROVIDE FOLDER NAME BUT DO NOT CREATE> \\?\GLOBALROOT\Device\HarddiskVolumeShadowCopyl\
```
Revert back to a selected shadow file on Windows Server
```
C:\> vssadmin revert shadow /shadow={<SHADOW COPYID>} /ForceDismount
```
List a files previous versions history using
`volrest.exe`
```
C:\> "\Program Files (x86)\Windows Resource
Kits\Tools\volrest.exe" "\\localhost\c$\<PATH TO FILE>\<FILE NAME>"
```
Revert back to a selected previous file version or
@GMT file name for specific previous version using volrest.exe
```
C:\> subst Z: \\localhost\c$\$\<PATH TO FILE>

C:\> "\Program Files (x86)\Windows Resource
Kits\Tools\volrest.exe" "\\localhost\c$\<PATH TO FILE>\<CURRENT FILE NAME OR @GMT FILE NAME FROM LIST COMMAND ABOVE>" /R:Z:\

C:\> subst Z: /0
```
Revert back a directory and subdirectory files
previous version using volrest.exe
```
C: \> "\Program Files (x86) \Windows Resource
Kits\Tools\volrest.exe" \\localhost\c$\<PATH TO
FOLDER\*·* /5 /r:\\localhost\c$\<PATH TO FOLDER>\
```
Link to `volrest.exe
```
Ref. https://www.microsoft.com/enus/
download/details.aspx?id=17657
```
**Managing Shadow Copies using wmic and PowerShell**
Revert back to a selected shadow file on Windows Server and Windows 7 and 10 using wmic
```
C:\> wmic shadowcopy call create Volume='C:\'
```
Create a shadow copy of volume C on Windows 7 and 10
```
PS C:\> (gwmi -list win32_shadowcopy).Create('C:\','ClientAccessible')
```
Create a shadow copy of volume C on Windows Server 2003 and 2008:
```
C:\> vssadmin create shadow /for=c:
```
Create restore point on Windows
```
C:\> wmic.exe /Namespace:\\root\default Path
SystemRestore Call CreateRestorePoint "%DATE%", 100,7
```
List of restore points
```
PS C:\> Get-ComputerRestorePoint
```
Restore from a specific restore point
```
PS C:\> Restore-Computer -RestorePoint <RESTORE
POINT#> -Confirm
```
### Winlogon Password Recovery
#### Active@ Password Changer
This utility is designed to reset or remove passwords for local user accounts on Windows systems.
##### Step-by-Step Guide to Using Active@ Password Changer

**Download and Prepare the Tool**

- **Download**: Visit the official website: [password-changer.com](https://www.password-changer.com/) and download the appropriate version of Active@ Password Changer.
- **Create Bootable Media**:
    - **USB Drive**: Use the included Bootable Disk Creator to write the ISO to a USB flash drive.
    - **CD/DVD**: Burn the ISO image to a CD/DVD using your preferred disc burning software.
        
**Boot from the Created Media**

- **Insert**: Place the bootable USB or CD/DVD into the computer with the lost password.
- **Restart**: Reboot the computer and enter the BIOS/UEFI settings (commonly by pressing keys like F2, F12, Delete, or Esc during startup).
- **Set Boot Priority**: Adjust the boot order to prioritize the USB or CD/DVD drive.
- **Save and Exit**: Save the changes and exit the BIOS/UEFI settings. The computer should now boot into the Active@ Password Changer environment.

**Reset the Password**

- **Launch the Tool**: Once booted, the Active@ Password Changer interface will appear.
- **Select Search Option**: Choose to search all volumes for the Microsoft Security Account Manager (SAM) database or select the specific volume manually.
![[active-1.png]]
- **Choose SAM Database**: If multiple SAM databases are found, select the appropriate one corresponding to your Windows installation.
![[active-2.png]]
- **Select User Account**: From the list of local user accounts, select the one for which you want to reset the password.
- **Reset Password**: Opt to clear (blank) the user's password. You can also modify other account attributes, such as unlocking the account or setting the password to never expire.
- **Apply Changes**: Confirm and apply the changes.
- **Exit**: Once done, exit the tool and remove the bootable media.
    
**Log into Windows**
- **Restart**: Reboot your computer normally.
- **Login**: At the Windows login screen, select the user account you reset and log in. If you cleared the password, you should be able to access the account without entering a password.

#### The Offline NT Password & Registry Editor
The Offline NT Password & Registry Editor (also known as `chntpw`) is a free, open-source tool designed to reset or remove passwords for local user accounts on Windows systems. It operates by modifying the Security Account Manager (SAM) database where Windows stores user credentials. This tool is particularly useful when you've forgotten your Windows password and need to regain access to your system.

**Important Considerations:**
- **Local Accounts Only**: This tool works exclusively with local user accounts. It cannot reset passwords for Microsoft online accounts or Active Directory domain accounts.
- **Encryption Limitations**: If your Windows partition is encrypted with BitLocker or a similar encryption tool, `chntpw` will not be able to access the SAM database.
- **Data Backup**: Always ensure you have a backup of important data before proceeding, as improper use can lead to data loss.

**Step-by-Step Guide to Using Offline NT Password & Registry Editor:**

1. **Download the Tool**:
    - Visit the official website: [https://pogostick.net/~pnh/ntpasswd/](https://pogostick.net/~pnh/ntpasswd/)
    - Download the bootable ISO image suitable for creating a CD or USB drive.
    
2. **Create Bootable Media**:
    - **For USB**:
        - Use a tool like Rufus to create a bootable USB drive with the downloaded ISO.
        - Insert a USB drive (at least 1GB in size) into your computer.
        - Open Rufus, select the USB drive, choose the downloaded ISO file, and start the process.
            
    - **For CD/DVD**:
        - Use disc burning software to burn the ISO image to a CD or DVD.
            
3. **Boot from the Created Media**:
    - Insert the bootable USB or CD/DVD into the locked computer.
    - Restart the computer and enter the BIOS/UEFI settings (usually by pressing a key like F2, F12, Delete, or Esc during startup).
    - Change the boot order to prioritize the USB or CD/DVD drive.
    - Save changes and exit the BIOS/UEFI settings.
    - The computer should now boot into the Offline NT Password & Registry Editor interface.
        
4. **Navigate the Tool**:
    - Upon booting, the tool will display a series of text-based menus.
    - Follow the prompts to select the Windows partition (usually detected automatically).
    - The tool will then locate the SAM database file, typically found at `\Windows\System32\Config\SAM`.[
        
5. **Reset the Password**:
    - Choose the option to edit user data and passwords.
    - Select the user account for which you want to reset the password.
    - You will be presented with options to clear (blank) the password or promote the user to an administrator.
    - Choose the desired action and confirm.
        
6. **Save Changes and Exit**:
    - After making the changes, the tool will prompt you to write the changes to disk.
    - Confirm by typing 'y' and pressing Enter.
    - Once done, remove the bootable media and restart the computer.[What is Going On?+1Achievable Test Prep+1](https://whatisgon.wordpress.com/2010/01/28/chntpw-tutorial-resetting-windows-passwords-editing-registry-linux/?utm_source=chatgpt.com)
        
7. **Log into Windows**:
    - Upon rebooting, you should be able to log into the user account without a password or with the new password you've set.

#### Ophcrack
Ophcrack is a free, open-source tool designed to recover lost Windows passwords by leveraging precomputed hash tables known as rainbow tables. It supports both LM and NTLM hash types and can be utilized via a bootable LiveCD/USB or as a Windows application. 
Here's a step-by-step guide to using Ophcrack:
##### Method 1: Using Ophcrack LiveCD (Simplest Approach)

**Ideal for:** Users who are locked out of their Windows system and need a straightforward recovery method.

**Step 1: Download Ophcrack LiveCD**

- Visit the official Ophcrack website: [https://ophcrack.sourceforge.io/](https://ophcrack.sourceforge.io/)
- Navigate to the “Download ophcrack LiveCD” section.
- Choose the appropriate version based on your Windows OS:
    
    - For Windows XP: _ophcrack XP LiveCD_
    - For Windows Vista/7: _ophcrack Vista/7 LiveCD_[Wikipedia+2Achievable+24winkey.com+2](https://blog-next.achievable.me/bcipdx2014/recovering-passwords-with-ophcrack?utm_source=chatgpt.com)
        

These downloads are ISO files that will be used to create bootable media.

**Step 2: Create Bootable USB or CD/DVD**
- **For USB:** Use a tool like [Rufus](https://rufus.ie/) to write the ISO to a USB drive.
- **For CD/DVD:** Utilize your operating system's built-in disc burning software or third-party tools to burn the ISO to a disc.

**Step 3: Boot from the LiveCD/USB
- Insert the bootable media into the locked computer.
- Restart the computer and enter the BIOS/UEFI settings (commonly by pressing keys like F2, F12, Delete, or Esc during startup).
- Set the boot priority to the USB or CD/DVD drive.
- Save changes and exit the BIOS/UEFI.

![[oph-1.png]]

**Step 4: Recover the Password**

- Ophcrack will automatically launch and begin scanning for user accounts.
- It will attempt to recover passwords using the included rainbow tables.
- Recovered passwords will be displayed on the screen
    
**Note:** The effectiveness depends on the complexity of the password and the available rainbow tables.

##### Method 2: Using the Ophcrack Windows Application (Advanced)

**Ideal for:** Users who have access to another account on the same machine or are comfortable with more technical procedures.

**Step 1: Download and Install Ophcrack**
- Go to [https://ophcrack.sourceforge.io/](https://ophcrack.sourceforge.io/) and download the Windows version of Ophcrack.
- Install the application on a computer with administrative privileges.

**Step 2: Extract Password Hashes**
- Use a tool like _pwdump_ or _samdump2_ to extract password hashes from the SAM file.
- These tools will generate a file containing the hashes needed for Ophcrack.
    
**Step 3: Download Appropriate Rainbow Tables**
- Visit the Ophcrack tables page: [https://ophcrack.sourceforge.io/tables.php](https://ophcrack.sourceforge.io/tables.php)
- Download the rainbow tables that match your Windows version and password complexity.
- Extract the tables to a known directory.
    
**Step 4: Configure and Run Ophcrack**
- Open Ophcrack and load the extracted hash file via the "Load" option.
- Navigate to "Tables" and add the directory containing the downloaded rainbow tables.
- Click on "Crack" to initiate the password recovery process.[

**Note:** This method provides more flexibility and can handle complex passwords, but requires additional steps and technical knowledge.
## BIOS Management
### BIOS Update
Updating BIOS is a very sensitive task and may break your system therefore only update the BIOS when you encounter the below reasons
- System keeps crashing 
- Current version of the BIOS is vulnerable
- Current BIOS is causing conflict with new hardware you have just added.
- Find your BIOS version and model
You can use the system information tool
```
msinfo32.exe
```
Navigate ---> System Summary and then take a note of the below
```
System Model
BIOS version/date
BIOS Mode
```
- Next step is to check the manufacturer website for the current BIOS model you have above (Use Google) and then download the latest update.
- Extract the contents of the Zipped file and move it to an external USB flash drive
- Restart your PC and access your BIOS by entering `F12` It may change according to your PC model.
- Navigate to **settings** --> **Update & Security > Recovery > Restart Now (under Advanced startup)**. In the window that pops up, select **Troubleshoot > Advanced options > UEFI Firmware Settings > Restart**.
- If you see **Backup** tab in BIOS settings, simply choose to backup your BIOS to the USB flash before proceeding.
- After you have restarted, go to BIOS again and choose **Update** then choose the update tool that you have stored in your USB in the previous steps.
## Resources and Links
### Utilities and programs
```
https://www.snapfiles.com/
https://www.bytesin.com/
https://www.soft32.com/
http://www.kcsoftwares.com/?download#SUMo
https://portableapps.com/
https://sharewareonsale.com/
https://www.cnet.com/
https://www.howtogeek.com/
https://filehippo.com
```
### Network Tools
#### Network Monitor
```
https://www.bvsystems.be/netmon.php
```
#### Anonymous SMS Senders
```
https://txtemnow.com/
https://www.afreesms.com/freesms/
```
#### Anonymous Email Senders
```
http://www.send-email.org/
```
### Video Tools
```
https://en.savefrom.net/391GA/
https://youtube-mp3-online.com/en
```
### File Processing Tools
```
http://www.cutepdf.com/products/cutepdf/writer.asp
https://www.sodapdf.com/
```
### Email Tools
```
https://www.massmailsoftware.com/
```
### Security Tools
```
https://www.ciphershed.org/
https://securityxploded.com/
https://packetstormsecurity.com
https://kidlogger.net/
```
### Backup and Recovery Tools
```
https://filehippo.com/download_recuva/
```
### AVs
**Avira**
```
https://filehippo.com/download_avira/
```
**Microsoft365**
```
https://learn.microsoft.com/en-us/microsoft-365/security/intelligence/safety-scanner-download?view=o365-worldwide
```
**MalwareBytes**
```
https://www.malwarebytes.com/
```
### Collaboration and Sharing Tools
```
https://www.box.com/
```
### FlashBoot
FlashBoot is a powerful software designed to create bootable USB drives, making it easier to install or run Windows from a USB device. It caters to both casual users and IT professionals, offering various options such as full OS installation on USB, drive cloning, and driver integration for seamless Windows installation.

### Privacy & Security Tools
**ArmorTools**
**ArmorTools** allows you to create secure virtual disks encrypted using AES128/AES256 algorithms, encrypt files and folder contents using any file as a password. **ArmorTools** removes traces of the user's work on the computer, clears the history of visiting sites, deletes confidential information without the possibility of recovery.
```
https://armortools.com/
```

**Installation Process**
1. **Download FlashBoot** from the official website.
2. **Run the installer** and follow the setup instructions.
3. **Select the desired operation** (e.g., create a bootable USB, install Windows to USB).
4. **Insert a USB drive** and let FlashBoot format and prepare it.
5. **Follow on-screen instructions** to complete the process.

### Recovering Lost License Keys
**Recover Keys** is a simple yet comprehensive Windows application designed to safeguard activation keys for software products installed on your local or remote network computers in the event of a system or hard disk crash.
```
https://recover-keys.com/
```
### Windows Repair Toolbox
Windows Repair Toolbox is a powerful, all-in-one application designed to diagnose, repair, and maintain Windows systems. It provides quick access to a wide range of third-party and built-in Windows utilities, helping users troubleshoot system issues efficiently. Whether you need malware removal, hardware diagnostics, or system optimization, this toolbox consolidates essential tools in one easy-to-use interface.
#### Features
**Centralized Troubleshooting Tools**
The software groups utilities into categories such as repairs, malware removal, testing, notes, and Windows settings for streamlined navigation.
**Auto-Updated Tools**
Windows Repair Toolbox automatically downloads the latest versions of necessary repair utilities, ensuring users always have the most up-to-date solutions.
**Malware Removal Integration**
It includes reputable third-party security tools that help detect and eliminate malware, spyware, and viruses.
**Hardware & System Testing**
The toolbox provides diagnostics for CPU, RAM, GPU, hard drive health, and network performance to identify potential hardware issues.
**Built-in Notes for Repairs**
Users can keep logs and notes within the toolbox, making it easier to track repair steps for future reference.
**Quick Access to Windows Utilities**
It includes shortcuts to essential Windows tools such as chkdsk, Task Manager, MSConfig, Registry Editor, and System Restore.
**Unattended Repair Mode**
Certain repair processes can be automated, allowing fixes to run without manual intervention.
**Portable & Lightweight**
Windows Repair Toolbox does not require installation and can be run from a USB drive, making it convenient for IT professionals.
**Selective Tool Download**
Users can choose and download only the necessary tools, saving system resources and avoiding unnecessary clutter.
**User-Friendly Interface**
The toolbox is designed for ease of use, catering to both beginners and advanced users.
#### How to Use
1. **Download and Run** Windows Repair Toolbox (no installation required).
2. **Choose a Tool Category** (e.g., repairs, malware removal, testing).
3. **Select a Utility** to diagnose or fix system issues.
4. **Follow On-Screen Instructions** for the selected tool.
5. **Monitor System Performance** using built-in testing tools.