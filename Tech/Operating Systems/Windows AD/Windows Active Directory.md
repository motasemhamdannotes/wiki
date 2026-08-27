

[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)

Get Full AD Directory Security and Pentesting Premium Notes below:
- [AD Pentesting](https://buymeacoffee.com/notescatalog/e/267507)
- [AD Engineering and Design](https://buymeacoffee.com/notescatalog/e/350678)
- [AD Security](https://buymeacoffee.com/notescatalog/e/350685)
# Active Directory Pentesting : Introduction to Identities

> **Domain:** Active Directory | Identity & Access Management | LDAP Enumeration  
> **Relevance:** OSCP, CPTS, HTB CDSA, AD Pentesting Fundamentals

## 1. IDENTITY & ACCESS MANAGEMENT (IAM) : FOUNDATIONS

### 1.1 What Is an IAM System?
Identity and Access Management is the framework a network uses to answer two fundamental security questions:

- **Authentication:** _Who are you?_ (Identity verification)
- **Authorization:** _What are you allowed to do?_ (Access control)

Every attack on Active Directory is, at its core, an attack on one or both of these two functions. Understanding the components of IAM tells you _where_ those attacks land.

|IAM Component|Role|AD Equivalent|
|---|---|---|
|**Directory**|Stores identity data (users, groups, computers)|AD DS (Active Directory Domain Services)|
|**Directory Management Tool**|Administers directory objects|RSAT, PowerShell, ADUC|
|**Access Control**|Enforces who can access what|ACLs, DACLs, Group Policy|
|**Privilege Management**|Controls elevated access|AdminSDHolder, Protected Users, PAM|
|**Audit & Reporting**|Records what happened and by whom|Windows Event Logs, SIEM|

**Analyst Note:** During a pentest, your goal is to abuse the gaps in these five components. Misconfigurations in Access Control (e.g., over-permissive ACLs) and Privilege Management (e.g., excessive Domain Admin membership) are the most common escalation paths in AD environments.

### 1.2 Identity Subsystems by Platform
Understanding where credentials are stored on each platform is foundational for post-exploitation.

#### Linux Identity Storage

|File|Contents|Attack Relevance|
|---|---|---|
|`/etc/passwd`|Usernames, UIDs, GIDs, home dirs, shells|World-readable — leaks usernames and shell info|
|`/etc/shadow`|Password hashes (requires root to read)|Target for offline hash cracking after privilege escalation|

```bash
# Read passwd (any user)
cat /etc/passwd

# Read shadow (requires root/sudo)
sudo cat /etc/shadow

# Dump shadow via LDAP backend (if OpenLDAP is configured)
sudo slapcat
```

#### Windows Identity Storage

|Component|Description|Attack Relevance|
|---|---|---|
|**SAM (Security Account Manager)**|Stores local user account hashes|Target for local hash extraction (reg save, secretsdump)|
|**NTDS.dit**|Domain user hashes on Domain Controllers|Primary target for DCSync, VSS shadow copy attacks|
|**LSASS**|Caches credentials in memory at runtime|Target for Mimikatz, lsass dump attacks|

**Analyst Note:** In AD engagements, the SAM is only relevant for local accounts. The real prize is `NTDS.dit` on Domain Controllers, which contains hashes for every domain user. Extracting and cracking these hashes equals full domain compromise.

---

### 1.3 Identity Management Solutions

|Platform|Solution|Notes|
|---|---|---|
|Linux|OpenLDAP|Open-source LDAP server; common in hybrid environments|
|Windows|Active Directory (AD DS)|Microsoft's enterprise directory service; dominant in corporate environments|
|Third-party / Federated|Shibboleth, Okta, Azure AD (Entra ID)|Identity providers (IdPs); often bridged to on-prem AD|

**Analyst Note:** Modern environments often run **hybrid identity** — on-prem AD synchronized to Azure AD via Azure AD Connect. Compromising on-prem AD can cascade into the cloud tenant if sync is configured. Always check for AD Connect during enumeration.

---

### 1.4 Authentication Mechanisms

|Method|Security Level|Pentesting Angle|
|---|---|---|
|**Username + Password**|Low–Medium|Brute force, spray, default creds, pass-the-hash|
|**Password Hashes**|Medium|Pass-the-hash, offline cracking, NTLM relay|
|**Complex Passwords**|Medium|Defeated by hash-based attacks (hash ≠ password knowledge)|
|**Multifactor Authentication (MFA)**|High|Bypassed via token theft, adversary-in-the-middle (AiTM), MFA fatigue|

**Analyst Note:** "Complex passwords" is described as a "failed solution" in the source — this is because in Windows environments, the NTLM hash of a complex password can still be used for lateral movement without knowing the plaintext. This is the entire premise of **Pass-the-Hash (PtH)** attacks. Password complexity protects against cracking but not against hash reuse.

---

## 2. THE LDAP PROTOCOL

### 2.1 Core Concepts

**LDAP (Lightweight Directory Access Protocol)** is the protocol used to query and modify directory services like Active Directory and OpenLDAP. Understanding LDAP is mandatory for AD enumeration because virtually every AD query under the hood is an LDAP query.

|Property|Detail|
|---|---|
|**Purpose**|Query and manage directory information (users, groups, OUs, computers)|
|**Architecture**|Distributed — can query across multiple servers|
|**Port 389**|Standard LDAP (cleartext or STARTTLS)|
|**Port 636**|LDAPS — LDAP over SSL/TLS (encrypted)|
|**Base DN**|Starting point for queries, e.g., `dc=corp,dc=local`|
|**Authentication**|Anonymous bind, simple bind (username+password), SASL (Kerberos/NTLM)|

**Analyst Note:** Anonymous LDAP bind is a critical misconfiguration. If a domain allows unauthenticated LDAP queries, an attacker with no credentials can enumerate the full list of users, groups, computers, and OUs. Always check for this during external and initial-access phases.

---

### 2.2 LDAP Enumeration — Command Reference

#### Nmap LDAP Script Scan

```bash
# Basic LDAP service discovery and enumeration (unauthenticated)
nmap -p 389 <TARGET_IP> --script ldap-search

# Authenticated LDAP query — enumerate users with admin privileges
nmap -p 389 <TARGET_IP> \
  --script ldap-search \
  --script-args="ldap.username=<DOMAIN\\username>,ldap.password=<password>,ldap.qfilter=users" \
  -Pn
```

**Flag breakdown:**

- `--script ldap-search` — runs nmap's built-in LDAP search script
- `ldap.username` — bind DN or `DOMAIN\username` format
- `ldap.password` — bind password
- `ldap.qfilter=users` — filters results to user objects only
- `-Pn` — skip host discovery (useful when ICMP is blocked)

---

#### ldapsearch — Full Manual Enumeration

`ldapsearch` is the most powerful command-line LDAP client. Master this tool for AD enumeration.

```bash
# Anonymous bind — enumerate entire directory from base DN
ldapsearch -x -b "dc=corp,dc=local" -H ldap://<TARGET_IP>

# Authenticated bind — enumerate with credentials
ldapsearch -x -D "cn=user,dc=corp,dc=local" -w "Password123" \
           -b "dc=corp,dc=local" -H ldap://<TARGET_IP>

# Query specific attributes — get all users and their descriptions
ldapsearch -x -b "dc=corp,dc=local" -H ldap://<TARGET_IP> \
           "(objectClass=user)" sAMAccountName description

# Find all groups
ldapsearch -x -b "dc=corp,dc=local" -H ldap://<TARGET_IP> \
           "(objectClass=group)" cn member

# Find Domain Admins members
ldapsearch -x -b "dc=corp,dc=local" -H ldap://<TARGET_IP> \
           "(cn=Domain Admins)" member

# Find accounts with no password required (PASSWD_NOTREQD flag)
ldapsearch -x -b "dc=corp,dc=local" -H ldap://<TARGET_IP> \
           "(&(objectClass=user)(userAccountControl:1.2.840.113556.1.4.803:=32))"

# Find AS-REP Roastable accounts (no pre-auth required)
ldapsearch -x -b "dc=corp,dc=local" -H ldap://<TARGET_IP> \
           "(&(objectClass=user)(userAccountControl:1.2.840.113556.1.4.803:=4194304))"
```

**Analyst Notes on ldapsearch flags:**

|Flag|Meaning|
|---|---|
|`-x`|Simple authentication (not SASL)|
|`-b`|Base DN — starting point for the search|
|`-H`|LDAP URI (`ldap://` or `ldaps://`)|
|`-D`|Bind DN — the account to authenticate as|
|`-w`|Password (use `-W` to prompt interactively)|
|`-LLL`|Suppress LDIF comments and version line (cleaner output)|

---

### 2.3 OpenLDAP Server — Direct Database Interaction

```bash
# Connect to the server (SSH)
ssh <username>@<TARGET_IP>

# Dump the entire LDAP database in LDIF format (requires root/sudo)
sudo slapcat

# Decode a base64-encoded password found in LDIF output
echo -n "<base64_encoded_password>" | base64 --decode
```

**Why `slapcat` matters:** When you have local root access to an OpenLDAP server, `slapcat` dumps the raw database including all password hashes. This is the Linux equivalent of extracting `NTDS.dit` from a Windows DC.

**Analyst Note:** Passwords in OpenLDAP LDIF files are frequently stored as `{SSHA}`, `{MD5}`, or `{CRYPT}` hashes. Base64 decode them first to expose the hash format, then crack with hashcat. Clear-text passwords encoded in base64 (no hash prefix) are also common in poorly secured deployments.

---

## 3. ACTIVE DIRECTORY DOMAIN SERVICES (AD DS)

### 3.1 Core Components

Active Directory Domain Services is the full identity platform. Understanding each component helps you understand what to attack and where misconfigurations live.

|AD DS Component|Description|Pentesting Significance|
|---|---|---|
|**Directory**|Database of all objects (users, computers, groups, GPOs)|Primary enumeration target|
|**Schema**|Defines object types and attributes|Schema extensions can reveal custom apps or misconfigs|
|**Global Catalog**|Partial replica of all objects in the forest|Used for cross-domain enumeration; port 3268/3269|
|**Group Policy Objects (GPOs)**|Enforces settings across machines and users|Misconfigured GPO permissions = lateral movement / persistence|
|**Replication Service**|Keeps DCs in sync (using DRSR protocol)|Abused by DCSync attack|
|**Security (IAM)**|Handles authentication and access control|Core attack surface for credential-based attacks|

---

### 3.2 Active Directory Hierarchy

Understanding the structural hierarchy is critical for understanding trust relationships and enumeration scope.

```
Forest (top-level security boundary)
└── Domain Tree
    ├── Parent Domain (e.g., corp.local)
    │   ├── Organizational Units (OUs)
    │   │   ├── Users
    │   │   ├── Computers
    │   │   └── Groups
    │   └── Child Domain (e.g., dev.corp.local)
    └── Child Domain (e.g., partner.corp.local)
```

**Key concepts for pentesters:**

- **Forest** is the ultimate security boundary — by default, trusts within a forest are transitive.
- **Domains** share a single LDAP namespace. Each domain has at least one Domain Controller.
- **OUs** are administrative containers used to apply Group Policy. They are not a security boundary.
- **Domain Controller (DC)** — holds the authoritative copy of the AD database (`NTDS.dit`). Compromise = game over.

---

### 3.3 Domain Controller Enumeration

```bash
# Identify domain controllers via DNS
nslookup -type=SRV _ldap._tcp.dc._msdcs.<DOMAIN>

# Or with nmap
nmap -p 389,636,3268,3269,88,53 <DC_IP> -sV

# Dmitry for passive domain/subdomain info gathering
dmitry <domain.com>
```

**Analyst Note:** `dmitry` is a multi-purpose passive recon tool. In the context of AD, it's useful for gathering domain-related subdomains, email formats, and open-source intelligence about the target organization before active enumeration begins.

---

### 3.4 Trust Relationships

Trusts define whether users in one domain can authenticate and access resources in another. They are a critical lateral movement and privilege escalation vector.

|Trust Type|Direction|Transitivity|Attack Relevance|
|---|---|---|---|
|**Parent-Child**|Two-way|Transitive|Compromise child → attack parent via SID history|
|**Tree-Root**|Two-way|Transitive|Cross-tree domain attacks|
|**External**|One-way or two-way|Non-transitive|Limited cross-forest enumeration|
|**Forest**|One-way or two-way|Transitive within forest|Cross-forest attacks if misconfigured|
|**Shortcut**|One-way or two-way|Transitive|Optimization trust — same attack surface as parent trust|

**Key Attack — SID History Injection:** If an attacker compromises a child domain and can inject a SID from the parent domain's Enterprise Admins group into a user's SID history token, they can escalate to Enterprise Admin in the parent domain.

---

## 4. AD MANAGEMENT TOOLS

### 4.1 Windows-Side Tools (Attacker & Admin Perspective)

#### RSAT (Remote Server Administration Tools)

```powershell
# Install RSAT on Windows (attacker-controlled machine joined to domain)
Add-WindowsCapability -Online -Name Rsat.ActiveDirectory.DS-LDS.Tools~~~~0.0.1.0

# List all domain users
Get-ADUser -Filter * -Properties *

# List all domain groups
Get-ADGroup -Filter *

# Get Domain Admins members
Get-ADGroupMember "Domain Admins"

# Find users with SPNs set (Kerberoastable)
Get-ADUser -Filter {ServicePrincipalName -ne "$null"} -Properties ServicePrincipalName

# Find users with no pre-auth required (AS-REP Roastable)
Get-ADUser -Filter {DoesNotRequirePreAuth -eq $true} -Properties DoesNotRequirePreAuth
```

#### PowerShell AD Module (Active Directory Enumeration)

```powershell
# Get current domain info
Get-ADDomain

# Get all Domain Controllers
Get-ADDomainController -Filter *

# Find computers with unconstrained delegation
Get-ADComputer -Filter {TrustedForDelegation -eq $true} -Properties TrustedForDelegation

# Find accounts with constrained delegation
Get-ADUser -Filter {msDS-AllowedToDelegateTo -ne "$null"} -Properties msDS-AllowedToDelegateTo

# Enumerate trust relationships
Get-ADTrust -Filter *
```

---

### 4.2 LDAP GUI Clients

#### Jxplorer (Cross-Platform LDAP Browser)

```bash
# Install on Debian/Ubuntu
sudo apt install jxplorer

# Launch the GUI
jxplorer
```

**How to use in a pentest:**

1. Connect to `ldap://<TARGET_IP>:389`
2. Choose **Anonymous** bind first — if it works, you have unauthenticated access
3. If not, use captured credentials to authenticate
4. Browse the directory tree to map out OUs, users, groups, computers
5. Export objects to LDIF for offline analysis

#### LDAPAdmin (Windows LDAP Browser)

- Download from: `https://sourceforge.net/projects/ldapadmin`
- Windows-native GUI — useful when operating from a domain-joined Windows foothold
- Can browse, modify, and export directory objects

---

## 5. ACTIVE DIRECTORY SECURITY AUDITING

### 5.1 What AD Auditing Covers

|Audit Area|What to Look For|
|---|---|
|**Directory Health**|Stale accounts, expired passwords, disabled users still in privileged groups|
|**Security Posture**|Kerberoastable SPNs, AS-REP roastable users, unconstrained delegation|
|**Privileged Access**|Unexpected Domain Admin members, AdminSDHolder discrepancies|
|**GPO Security**|Write permissions on GPOs, unlinked GPOs, GP preference passwords|
|**Trust Security**|Misconfigured cross-forest trusts, SID filtering disabled|

### 5.2 Collecting Audit Data

```bash
# Using Lepide AD Auditing Tool (Windows)
# cmd> lepide
# 1. Enter Domain Name or IP address
# 2. Enter admin username
# 3. Enter password
# 4. Click "Scan Now"

# Reference URLs for Lepide tools:
# Full platform:  https://www.lepide.com/data-security-platform/active-directory-auditing.html
# Free AD Admin tool: https://www.lepide.com/freetools/ad-users-with-admin-privileges.html
```

### 5.3 Recommended Open-Source Audit Tools

|Tool|Purpose|Command|
|---|---|---|
|**BloodHound**|Graph-based AD attack path analysis|`bloodhound-python -d corp.local -u user -p pass -c all`|
|**PingCastle**|AD security scoring and audit reports|`PingCastle.exe --healthcheck --server <DC_IP>`|
|**ADRecon**|Comprehensive AD data collection|`.\ADRecon.ps1`|
|**ldapdomaindump**|Dump AD data to HTML/JSON/grep-friendly files|`ldapdomaindump -u 'DOMAIN\\user' -p 'pass' <DC_IP>`|
|**PowerView**|PowerShell-based AD enumeration|`Import-Module PowerView.ps1`|

---

## 6. KEY CONCEPTS & ANALYST TAKEAWAYS

### 6.1 Core Mental Model for AD Pentesting

```
Phase 1: Unauthenticated Enumeration
  → LDAP anonymous bind (port 389)
  → DNS enumeration (SRV records, zone transfer)
  → SMB null sessions (port 445)
  → Identify usernames, domain name, DC IPs

Phase 2: Credential Acquisition
  → Password spray with discovered usernames
  → AS-REP Roasting (no pre-auth accounts)
  → Responder / LLMNR poisoning for NTLMv2 hashes

Phase 3: Authenticated Enumeration
  → BloodHound collection
  → Kerberoasting (SPNs)
  → LDAP deep-dive (delegations, ACLs, GPOs)
  → SMB share enumeration

Phase 4: Privilege Escalation
  → Exploit misconfigured ACLs (GenericAll, WriteDACL)
  → Kerberoast / crack high-value SPN hashes
  → Delegation abuse (unconstrained / constrained / RBCD)
  → DCSync (if replication rights obtained)

Phase 5: Domain Compromise
  → Extract NTDS.dit (all domain hashes)
  → Golden Ticket / Silver Ticket creation
  → Cross-domain / cross-forest attacks via trusts
```

---

### 6.2 Critical Ports Reference

|Port|Protocol|Service|Pentest Use|
|---|---|---|---|
|`53`|TCP/UDP|DNS|Zone transfers, SRV record enum|
|`88`|TCP/UDP|Kerberos|AS-REP Roasting, Kerberoasting, ticket attacks|
|`135`|TCP|RPC / WMI|Remote command execution, WMI enumeration|
|`139/445`|TCP|SMB/NetBIOS|Share enumeration, relay attacks, lateral movement|
|`389`|TCP/UDP|LDAP|Directory enumeration (unauthenticated or authenticated)|
|`636`|TCP|LDAPS|Encrypted LDAP — harder to intercept|
|`3268`|TCP|Global Catalog|Cross-domain LDAP queries|
|`3269`|TCP|Global Catalog SSL|Encrypted cross-domain LDAP|
|`5985/5986`|TCP|WinRM|Remote PowerShell sessions|

---

### 6.3 Common Misconfigurations to Hunt For

|Misconfiguration|Risk|Detection Method|
|---|---|---|
|Anonymous LDAP bind enabled|Full user/group enumeration without credentials|`ldapsearch -x -b "dc=..." -H ldap://<IP>`|
|Kerberoastable service accounts|Offline hash cracking of service account passwords|`GetUserSPNs.py` / `PowerView`|
|AS-REP Roastable users|Offline hash cracking without any credential|`GetNPUsers.py` / `PowerView`|
|Unconstrained delegation|Machine account ticket theft → DCSync|`Get-ADComputer -Filter {TrustedForDelegation -eq $true}`|
|Writable GPO permissions|Code execution across all affected machines|BloodHound `GPOLocalGroup` edges|
|Over-permissive ACLs (GenericAll)|Full object control → password reset / group membership|BloodHound `GenericAll` edges|
|SID filtering disabled on trusts|Cross-domain privilege escalation|`nltest /domain_trusts` + BloodHound|
|AdminSDHolder misconfiguration|Unexpected persistent admin rights|`Get-ADObject "CN=AdminSDHolder,CN=System,..."`|
|Password in LDAP description field|Credential exposure|`ldapsearch ... description`|
|Default domain admin password|Immediate domain compromise|Password spray with common defaults|

---

### 6.4 Tools Reference

|Tool|Platform|Purpose|Key Command|
|---|---|---|---|
|`nmap`|Linux/Windows|LDAP service scan|`nmap -p 389 <IP> --script ldap-search`|
|`ldapsearch`|Linux|LDAP enumeration|`ldapsearch -x -b "dc=..." -H ldap://<IP>`|
|`slapcat`|Linux (root)|Dump OpenLDAP DB|`sudo slapcat`|
|`dmitry`|Linux|Passive domain recon|`dmitry <domain.com>`|
|`jxplorer`|Linux/Windows|LDAP GUI browser|`sudo apt install jxplorer && jxplorer`|
|`LDAPAdmin`|Windows|LDAP GUI browser|GUI tool — connect via IP/port|
|`Lepide`|Windows|AD auditing platform|`cmd> lepide`|
|`BloodHound`|Linux/Windows|AD attack path graph|`bloodhound-python -d <domain> -u <user> -p <pass> -c all`|
|`ldapdomaindump`|Linux|LDAP data dump|`ldapdomaindump -u 'DOM\\user' -p 'pass' <DC_IP>`|
|`PowerView`|Windows (PS)|AD enumeration|`Import-Module PowerView.ps1`|
|`Impacket`|Linux|Suite of AD attack tools|`GetUserSPNs.py`, `secretsdump.py`, `GetNPUsers.py`|

---
