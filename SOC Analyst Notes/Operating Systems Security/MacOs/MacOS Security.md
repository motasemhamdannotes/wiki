

[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)

**The full macOS security guide can be unlocked by subscribing to the membership**

# macOS Security and Privacy Guide

**Scope:** Apple silicon Macs running a currently supported version of macOS. Targeted at power users adopting enterprise-standard security, and privacy-conscious novice users.

> ⚠️ **Intel CPUs are hardware-vulnerable** (e.g., checkm8) in ways Apple cannot patch. Apple silicon is the minimum hardware recommendation. Newer chips are always more secure.

---

## 01 · Basics

Core security principles that apply to every macOS setup:

- **Create a threat model** — understand your adversaries before choosing mitigations
- **Keep the system updated** — patch OS and all software regularly
    
    ```bash
    softwareupdate --install --all   # CLI update (no Apple Account required)
    ```
    
- **Subscribe** to [Apple security-announce](https://lists.apple.com/mailman3/lists/security-announce.lists.apple.com/) for security bulletins
- **Encrypt sensitive data** — FileVault for the drive, built-in Passwords app for credentials
- **Follow 3-2-1 backup model** — 3 copies, 2 different media, 1 offsite
- **Encrypt backups** before writing to external media or cloud storage
- **Verify backups** by accessing them regularly
- **Click carefully** — install only from official developer sources (website, GitHub, App Store)

> 💡 **Core principle:** A system is only as secure as its administrator is capable of making it. No single tool or technique guarantees perfect security — security is layered and incremental.

---

## 02 · Threat Modeling

Threat modeling is the **first and most important step** in any security and privacy posture. Define it before applying any mitigations.

### Process: Four Questions

1. **Identify Assets** — What are you protecting? (phone, laptop, passwords, browsing history, etc.) Categorize: _public / sensitive / secret_
2. **Identify Adversaries** — Who might attack you and why? (financial gain, surveillance, curiosity)
3. **Identify Capabilities** — What can each adversary actually do? Rank from unsophisticated to advanced
4. **Identify Mitigations** — What control counters each capability? Balance security vs. usability

### Threat Matrix Example

|Adversary|Motivation|Capabilities|Mitigation|
|---|---|---|---|
|Roommate|See private chats / browsing history|Screen visibility, shoulder-surfing|Biometrics, privacy screen, lock when idle|
|Thief|Steal personal info, drain bank accounts|Steal unlocked device, shoulder-surf PIN|Keep in sight, biometrics, Find My, always locked|
|Criminal|Financial|Social engineering, commodity malware, password reuse, vulnerability exploits|Sandboxing, keep OS/apps updated, auto-updates on|
|Corporation|User data for marketing|Telemetry and behavioral tracking|Block network connections, reset unique identifiers, avoid saving payment data|
|Nation State / APT|Targeted surveillance|Passive internet surveillance, advanced cryptanalysis, traffic analysis|Open-source E2EE, diceware passwords, hardware with secure element, power off device when idle, canary tokens|

> 💡 Threat models evolve over time — reassess them periodically as your situation changes.

---

## 03 · Hardware

- Use the **newest Apple silicon Mac** you can — newer chips have better security features
- Avoid hackintoshes and unsupported Macs that can't run the latest macOS
- **Purchase anonymously** if your threat model requires it: pay cash in person, not online or by card
- For **wireless accessories**, prefer Apple peripherals — they auto-update via the system and support BLE Privacy (randomized Bluetooth MAC)
- Third-party accessories may not support BLE Privacy, making them trackable

---

## 04 · Installing macOS

- Always install the **latest compatible version** of macOS — recent versions include security patches older versions lack
- Multiple [installation methods](https://support.apple.com/102662) are available

### System Activation

Apple silicon Macs verify against Apple's server database for stolen/activation-locked devices on every macOS reinstall. This is part of Apple's theft prevention system and requires network access.

### Apple Account

- **Not required** to use macOS
- Requires a phone number and syncs significant data to iCloud by default
- You can [disable iCloud sync](https://support.apple.com/102651) or enable [Advanced Data Protection](https://support.apple.com/guide/security/advanced-data-protection-for-icloud-sec973254c5f/web) (E2EE for iCloud)
- Required for App Store, iCloud, Apple Music, and most Apple services

### App Store

- Curated and requires **App Sandbox** and **Hardened Runtime** — strongest software security guarantees on macOS
- Offers automatic updates integrated into the OS
- Trade-off: requires Apple Account login; Apple can link your account to downloaded apps

### Virtualization (Apple Silicon)

|Tool|Type|Notes|
|---|---|---|
|[UTM](https://mac.getutm.app/)|Free GUI|macOS + Windows 11 ARM; App Store version adds auto-updates|
|[VirtualBuddy](https://github.com/insidegui/VirtualBuddy)|Free GUI|macOS 12+ only|
|[Bushel](https://getbushel.app/)|Free GUI|Lightweight; choose "Ask App Not to Track" on first launch|
|[VMware Fusion](https://knowledge.broadcom.com/external/article/315638)|Free (Broadcom)|Requires Broadcom account + ~12 agreements|
|[tart](https://tart.run/)|CLI|Install via Homebrew|
|[Parallels](https://www.parallels.com/)|Paid|Requires account, payment data — review privacy notice|

---

## 05 · First Boot

- Use a **strong diceware password** for the first user account — no hint
- Be aware your **real name** will populate the computer name and local hostname (visible on local networks)

```bash
# Rename your Mac after setup to avoid leaking real name
sudo scutil --set ComputerName MacBook
sudo scutil --set LocalHostName MacBook
```

Also verify/update in **System Settings > About**.

---

## 06 · Admin and User Accounts

### Key Concepts

- The **first account is always an admin** — member of the `admin` group, has `sudo` access
- `sudo` can be [exploited](https://bogner.sh/2014/03/another-mac-os-x-sudo-password-bypass/) by concurrently running programs
- **Best practice (Apple-recommended):** Use a separate **standard user** for day-to-day work; use the admin account only for installations and system config

### How It Works in Practice

- Admin account does **not** need to be used from the macOS login screen
- When a Terminal command requires elevated privileges, macOS prompts for admin credentials from the standard user shell
- Hide the admin account and its home directory to reduce exposure

### Caveats

- Only admins can install to `/Applications` — standard users get an auth prompt or can install to `~/Applications` instead
- App Store apps install to `/Applications` and require no extra auth for standard users
- `sudo` is unavailable in standard user shells — use `su` or `login` to enter an admin shell when needed
- Some third-party apps assume admin access and may require running from the admin account directly

### Setup Commands

```bash
# Demote the original account to standard user (run from a new admin account)
sudo dscl . -delete /Groups/admin GroupMembership <username>
sudo dscl . -delete /Groups/admin GroupMembers <GeneratedUID>

# Find the GeneratedUID of an account
dscl . -read /Users/<username> GeneratedUID
```

---

## 07 · Firmware

- Verify firmware security is set to **Full Security** (default setting)
- Full Security prevents tampering with the OS at the firmware level
- Check in **System Settings > Privacy & Security > Security** or via Apple Configurator

---

## 08 · FileVault

- All Apple silicon Macs are **encrypted by default** at the hardware level
- Enabling **FileVault** requires a password to decrypt and access drive data
- Use a [strong diceware password](https://www.eff.org/dice) — memorable but long

### What FileVault Also Does

- Acts as a **firmware password** — prevents booting from external media
- Prevents access to **Recovery mode** without the password
- Prevents **DFU revival** without the password

### Recovery Key

- FileVault prompts for a recovery key — **store it somewhere safe offline**
- You may use iCloud to unlock the disk — be aware that anyone with iCloud access can also unlock it

```bash
# Check FileVault status
fdesetup status

# Enable FileVault
sudo fdesetup enable
```

---

## 09 · Lockdown Mode

- **Lockdown Mode** significantly reduces attack surface by disabling numerous features across the OS
- Keeps the OS usable but eliminates many vectors used by advanced spyware (e.g., NSO Pegasus-class)
- Enable in **System Settings > Privacy & Security > Lockdown Mode**
- Can be disabled **per site** in Safari on trusted sites while remaining globally active

> 💡 Lockdown Mode also [disables WebRTC](https://www.sevarg.net/2022/07/20/ios16-lockdown-mode-browser-analysis) in Safari, preventing IP leaks.

---

## 10 · Firewall

### Application Layer Firewall (Built-in)

Blocks **incoming connections only**. Cannot monitor or block outgoing connections.

```bash
# Enable the application firewall
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on

# Enable stealth mode (no response to ICMP ping or closed port scans)
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setstealthmode on

# Disable auto-whitelisting of signed apps
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setallowsigned off
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setallowsignedapp off

# Restart the firewall after changes
sudo pkill -HUP socketfilterfw
```

> 💡 **Stealth mode** prevents your Mac from responding to ICMP pings and closed TCP/UDP port scans — makes it harder for attackers to discover the machine on a network.

### Third-Party Firewalls (Incoming + Outgoing)

|Tool|Type|Notes|
|---|---|---|
|[Little Snitch](https://www.obdev.at/products/littlesnitch/index.html)|Paid|Per-connection control; most feature-rich|
|[LuLu](https://objective-see.com/products/lulu.html)|Free / Open Source|From Objective-See; great for most users|
|[Radio Silence](https://radiosilenceapp.com/)|Paid|Minimal UI, blocks outgoing silently|

> ⚠️ Third-party firewalls **can be bypassed** by programs running as root or through OS vulnerabilities. They are still valuable but do not guarantee absolute protection. Use **Silent Mode** (allow all) initially, then review and tune.

### Kernel Packet Filtering (pf)

Most powerful but most complex. Controlled via `pfctl` and configuration files.

```bash
# Example pf rules file (pf.rules)
wifi = "en0"
ether = "en7"
set block-policy drop
set fingerprints "/etc/pf.os"
set ruleset-optimization basic
set skip on lo0
scrub in all no-df
table <blocklist> persist
block in log
block in log quick from no-route to any
block log on $wifi from { <blocklist> } to any
block log on $wifi from any to { <blocklist> }
antispoof quick for { $wifi $ether }
pass out proto tcp from { $wifi $ether } to any keep state
pass out proto udp from { $wifi $ether } to any keep state
pass out proto icmp from $wifi to any keep state
```

```bash
# Enable pf and load config
sudo pfctl -e -f pf.rules

# Disable pf
sudo pfctl -d

# Add IP to blocklist
sudo pfctl -t blocklist -T add 1.2.3.4

# View blocklist
sudo pfctl -t blocklist -T show

# Create logging interface
sudo ifconfig pflog0 create

# View filtered/blocked packets
sudo tcpdump -ni pflog0

# Query an ASN for its IP ranges (e.g., Facebook AS32934)
whois -h whois.radb.net '!gAS32934'

# Block an entire organization's IP ranges
sudo pfctl -t blocklist -T add 31.13.24.0/21 31.13.64.0/24 157.240.0.0/16
```

---

## 11 · Services (launchd)

macOS services are managed by **launchd**. System services are protected by SIP — do not disable SIP to tinker with them.

```bash
# List running user agents
launchctl list

# List running system daemons
sudo launchctl list

# Inspect a specific service
launchctl list com.apple.Maps.mapspushd

# Read a launch daemon's plist
defaults read /System/Library/LaunchDaemons/com.apple.apsd.plist

# View all service status
find /var/db/com.apple.xpc.launchd/ -type f -print -exec defaults read {} \; 2>/dev/null
```

- Manage login items in **System Settings > General > Login Items & Extensions**
- View System, Quick Look, Finder extensions in **System Settings > Privacy & Security > Extensions**
- Use `man` and `strings` on the binary listed in `ProgramArguments` to understand what a daemon does

---

## 12 · Siri Suggestions and Spotlight

- Some queries still sent to Apple even with on-device processing for most functions
- Review [Apple's Privacy Policy for Siri Suggestions](https://www.apple.com/legal/privacy/data/en/siri-suggestions-search/) for exact data sent
- Disable Siri Suggestions in **System Settings > Siri & Spotlight**

---

## 13 · Homebrew

```bash
# Install Homebrew (review the script before running)
/bin/bash -c "$(curl -fsSL https://brew.sh/install.sh)"

# Keep packages updated (on trusted networks only)
brew upgrade

# Check package info before installing
brew info <package>

# Opt out of Homebrew analytics
brew analytics off
# Or set in shell rc:
export HOMEBREW_NO_ANALYTICS=1

# Extra security: disable insecure redirects
export HOMEBREW_NO_INSECURE_REDIRECT=1
```

> ⚠️ **Security Warning:** Homebrew requests "App Management" or "Full Disk Access" permission to the terminal. This is effectively equivalent to **disabling TCC entirely** for the terminal. Any non-sandboxed app can execute code with those permissions by injecting into `.zshrc`. Grant these permissions **only if you fully understand and accept the risk**.

---

## 14 · DNS

### DNS Profiles (macOS 11+)

Configure encrypted DNS, domain filtering, and DNSSEC via DNS configuration profiles.

- Create a custom profile at [dns.notjakob.com](https://dns.notjakob.com/)
- Or use provider profiles: [Quad9](https://docs.quad9.net/Setup_Guides/MacOS/Big_Sur_and_later_\(Encrypted\)/), [AdGuard](https://adguard-dns.io/en/public-dns.html), [NextDNS](https://nextdns.io/)

### Hosts File

```bash
# Edit the hosts file
sudo vi /etc/hosts

# Block a domain (IPv4)
0.0.0.0 example.com

# Also block IPv6
::1 example.com

# Append a community blocklist (e.g., StevenBlack)
curl https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts | sudo tee -a /etc/hosts
```

**Recommended host blocklists:**

- [StevenBlack/hosts](https://github.com/StevenBlack/hosts) — combined multi-category list
- [Sinfonietta/hostfiles](https://github.com/Sinfonietta/hostfiles) — category-specific lists
- [someonewhocares.org](https://someonewhocares.org/hosts/zero/hosts) — classic Dan Pollock list

### DNSCrypt

Encrypts DNS traffic in transit.

```bash
# Install
brew install dnscrypt-proxy

# Edit config to use a non-standard port (for combining with dnsmasq)
# File: /usr/local/etc/dnscrypt-proxy.toml
# Change: listen_addresses = ['127.0.0.1:5355', '[::1]:5355']

# Start the service
sudo brew services restart dnscrypt-proxy

# Confirm it is running
sudo lsof +c 15 -Pni UDP:5355
```

**To block non-dnscrypt DNS traffic via pf:**

```
block drop quick on !lo0 proto udp from any to any port = 53
block drop quick on !lo0 proto tcp from any to any port = 53
```

### Dnsmasq

Caches DNS replies, blocks TLDs, and prevents upstream queries for unqualified names.

```bash
# Install (with DNSSEC support)
brew install dnsmasq --with-dnssec

# Start dnsmasq (sudo required to bind to port 53)
sudo brew services start dnsmasq

# Set dnsmasq as the local DNS resolver
sudo networksetup -setdnsservers "Wi-Fi" 127.0.0.1

# Confirm configuration
scutil --dns | head
networksetup -getdnsservers "Wi-Fi"

# Test DNSSEC — expect NOERROR + 'ad' flag
dig +dnssec icann.org | head

# Test DNSSEC failure — expect SERVFAIL
dig www.dnssec-failed.org | head
```

---

## 15 · Certificate Authorities

- macOS ships with **100+ root CA certificates** from corporations and governments worldwide
- These CAs can issue TLS certificates for any domain — a compromised or coerced CA can enable a MITM attack
- Apple blocks CAs that prove untrustworthy and enforces [strict requirements](https://www.apple.com/certificateauthority/ca_program.html)

```bash
# Inspect system root certificates via CLI
security find-certificate -a -p /System/Library/Keychains/SystemRootCertificates.keychain
```

- Manually **Never Trust** specific CAs via **Keychain Access > System Roots** if required
- Risk of MITM via rogue CA is low but [[https://en.wikipedia.org/wiki/DigiNotar#Issuance_of_fraudulent_certificates]] (DigiNotar)

---
