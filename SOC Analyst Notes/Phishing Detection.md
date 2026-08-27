

[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)

# Detecting Phishing : Analyst & SOC Notes

> **Domain:** Threat Intelligence | Phishing Detection | Domain Monitoring | Brand Protection  
> **Relevance:** SOC Analyst, Threat Hunter, Blue Team, HTCD, CDSA, Security+ Domain 4

---

## 1. FOUNDATION : WHY DETECTION STARTS WITH DOMAIN MONITORING

### 1.1 The Core Assumption
Effective phishing detection begins with a single key assumption: **attackers will try to mimic or abuse your domain name** in some way  through typosquatting, homoglyphs, keyword embedding, subdomain abuse, or certificate impersonation.

This means your detection posture must be **proactive and continuous**, not reactive. By the time a phishing email hits a user's inbox, the infrastructure is already live. The goal is to find and disrupt that infrastructure before  or as close to the moment  it becomes operational.

> **Analyst Note:** This approach does **not** detect phishing campaigns that use a completely unrelated domain (e.g., `youwonthelottery.com` to phish `example.com` users). Those require email-layer controls (DMARC analysis, content filtering, attachment sandboxing). The domain-monitoring methodology covered here targets the far more common case where attackers register a lookalike domain to increase credibility.

### 1.2 Where This Fits in the Defensive Stack

|Detection Layer|Technique|Timing|
|---|---|---|
|**Pre-registration**|Monitoring newly registered domain feeds|Before the attack launches|
|**At registration**|Certificate Transparency (CT) monitoring|Within minutes of domain going live|
|**Post-registration**|DNS twist enumeration, favicon hash hunting|Ongoing — catch what CT misses|
|**At delivery**|Email gateway DMARC/SPF/DKIM checks|When the phishing email is sent|
|**At click**|Proxy / DNS RPZ blocking|When user clicks the link|
|**Post-click**|SIEM alerting on DNS NXDOMAIN patterns|After the fact — catch reachback|

This guide focuses on the **pre-delivery layers** , the threat intelligence and domain monitoring capabilities.

---

## 2. DOMAIN NAME VARIATION DETECTION

### 2.1 Why Typosquatting Works Against Users

Attackers register domains that are visually or typographically similar to legitimate domains  close enough that a rushed or inattentive user will not notice the difference in an email, especially on mobile where the URL bar is truncated. Common mutation types include:

|Mutation Type|Example (target: `example.com`)|Description|
|---|---|---|
|Character substitution|`examp1e.com`|Letter replaced with similar-looking character|
|Homoglyph|`еxample.com` (Cyrillic е)|Unicode character visually identical to ASCII|
|Transposition|`exmaple.com`|Two adjacent characters swapped|
|Addition|`examples.com`|Extra character inserted|
|Omission|`examle.com`|Character dropped|
|Hyphenation|`example-login.com`|Hyphens + keywords added|
|Keyword embedding|`example-secure.com`, `login-example.com`|Brand name inside a longer domain|
|TLD swap|`example.net`, `example.co`|Different top-level domain|
|Bit-flipping|`windnws.com` (from `windows.com`)|Single bit flip in a character's binary value|
|Subdomain abuse|`example.com.attacker.net`|Legitimate domain appears as a subdomain|

---

### 2.2 Tools for Generating and Checking Lookalike Domains

#### dnstwist

`dnstwist` generates a comprehensive list of domain permutations and automatically resolves each one flagging those that are registered and have an IP assigned.

```bash
# Install dnstwist
pip3 install dnstwist
# Or: sudo apt install dnstwist

# Basic usage — generate all permutations and check DNS resolution
dnstwist example.com

# Show only registered domains (filter out unresolved)
dnstwist --registered example.com

# Include MX records (identifies domains receiving email — phishing-ready)
dnstwist --registered --mxcheck example.com

# Output to CSV for import into SIEM or spreadsheet
dnstwist --registered --format csv example.com > lookalikes.csv

# Output to JSON for programmatic processing
dnstwist --registered --format json example.com > lookalikes.json

# Enable SSDeep fuzzy hashing of web pages (detect cloned login pages)
dnstwist --registered --ssdeep example.com

# Full comprehensive scan — all checks enabled
dnstwist --registered --mxcheck --ssdeep --geoip example.com

# Scan with custom dictionary for targeted permutations
dnstwist --dictionary wordlist.txt example.com
```

#### urlcrazy

`urlcrazy` focuses on typosquatting mutations ,  keystroke errors and character confusion patterns based on keyboard layout proximity.

```bash
# Install
sudo apt install urlcrazy
# Or: gem install urlcrazy

# Basic scan — generate typosquatting variants
urlcrazy example.com

# Show only registered domains
urlcrazy -r example.com

# Output to CSV
urlcrazy -f csv -o output.csv example.com

# Check with popularity metrics (uses Google)
urlcrazy -p example.com
```

> **Analyst Note:** Run both tools — they use different mutation algorithms and complement each other. `dnstwist` covers more mutation types (homoglyphs, bit-flipping, IDN). `urlcrazy` focuses on keyboard-adjacency typos that reflect how real users mistype. Feed the combined output into a deduplication pipeline, then resolve all candidates and prioritise those with active DNS records, MX records (can send email), or web servers listening on 80/443.

---

### 2.3 DNS Log Monitoring : NXDOMAIN Hunting

Even before an attacker registers a typosquatted domain, **your own users may be reaching for it**  mistyping your domain in browsers or clicking malformed links. These failed lookups appear as `NXDOMAIN` responses in DNS logs.

```bash
# If you run internal DNS — extract NXDOMAIN queries from logs
grep "NXDOMAIN\|SERVFAIL" /var/log/named/queries.log | \
  awk '{print $NF}' | sort | uniq -c | sort -rn | head -50

# Look for domains similar to your own
grep "NXDOMAIN" /var/log/named/queries.log | \
  grep -i "yourcompany\|yourbrand\|yourdomain"

# In Splunk/SIEM — query for NXDOMAIN responses containing your brand
# index=dns_logs record_type=NXDOMAIN query=*yourbrand*
# | stats count by query | sort -count
```

> **Analyst Note:** A spike in `NXDOMAIN` queries for a specific lookalike domain from inside your network is a strong early warning signal. It may mean: (1) an attacker has registered it and sent phishing emails, and users are clicking; or (2) the domain is pre-registered and users are organically finding it before the attacker activates it. In either case — pre-block or sinkhole the domain immediately.

---

## 3. BIT-FLIPPING DOMAIN DETECTION

### 3.1 What Is Bit-Flipping?

Bit-flipping (also called bitsquatting) exploits hardware memory errors specifically, random bit flips in RAM or caches  , that cause a character in a domain name to change. A single bit flip in the domain `windows.com` can produce `windnws.com`. Attackers pre-register these variants to passively capture traffic from devices that experience memory errors.

**Reference:** [Hijacking Traffic to Microsoft's windows.com with Bit-Flipping](https://www.bleepingcomputer.com/news/security/hijacking-traffic-to-microsoft-s-windowscom-with-bitflipping/)

```bash
# dnstwist includes bit-flip mutation by default
dnstwist --registered example.com

# To see only bit-flip variants:
dnstwist example.com | grep "bitsquatting"

# Generate bit-flip variants manually (Python)
python3 - << 'EOF'
domain = "example"
for i, char in enumerate(domain):
    for bit in range(8):
        flipped = chr(ord(char) ^ (1 << bit))
        if flipped.isalnum() or flipped == '-':
            candidate = domain[:i] + flipped + domain[i+1:]
            print(f"{candidate}.com")
EOF
```

> **Analyst Note:** Bit-flip domains are less immediately actionable for phishing detection (the exploit requires a hardware memory error on the victim's device) but are worth including in monitoring. More commonly relevant are **homoglyph attacks** — visually identical Unicode characters used to create domains indistinguishable to the naked eye.

---

## 4. BASIC AND ADVANCED DOMAIN CHECKS

### 4.1 Basic Checks on Suspicious Domains
Once you have a list of candidate suspicious domains, validate them with the following checks:

```bash
# Check if the domain has a web server on HTTP/HTTPS
curl -s -o /dev/null -w "%{http_code}" http://suspicious-domain.com
curl -s -o /dev/null -w "%{http_code}" https://suspicious-domain.com

# Check if port 3333 is open (Gophish default port)
# Attackers often forget to change the default phishing framework port
nmap -p 3333 suspicious-domain.com
curl -s http://suspicious-domain.com:3333

# Get domain registration age
whois suspicious-domain.com | grep -i "creation date\|registered\|created"

# Check domain age via RDAP (machine-readable, scriptable)
curl -s https://rdap.verisign.com/com/v1/domain/suspicious-domain.com | \
  jq -r '.events[] | select(.eventAction=="registration") | .eventDate'

# Take a screenshot of the web page for visual inspection
# Using gowitness (Go-based headless browser screenshotter)
gowitness single https://suspicious-domain.com
# Output saved to screenshots/

# Using eyewitness
eyewitness --single https://suspicious-domain.com
```

**What to prioritise:**

|Signal|Risk Level|Action|
|---|---|---|
|Domain registered < 7 days ago|Critical|Immediate investigation|
|Domain registered < 30 days ago|High|Add to watchlist|
|Port 3333 open|Critical|Active phishing framework — report/block|
|Login form similar to your domain|Critical|Takedown request + IOC sharing|
|MX records present|High|Domain can send/receive phishing email|
|No content yet (parked page)|Medium|Monitor — infrastructure may be staging|
|Let's Encrypt certificate|Medium|Combined with other signals = suspicious|

---

### 4.2 Advanced Automated Monitoring

For continuous monitoring, build a pipeline that runs automatically:

```bash
#!/bin/bash
# Automated daily phishing domain monitoring pipeline

TARGET_DOMAIN="example.com"
BASELINE_HASH_DIR="./login_hashes/"
SUSPICIOUS_DOMAINS_FILE="suspicious_domains.txt"

# Step 1: Generate fresh lookalike list
dnstwist --registered --format json $TARGET_DOMAIN > lookalikes_today.json

# Step 2: Extract only registered domains
cat lookalikes_today.json | jq -r '.[] | select(.dns_a != null) | .domain' \
  > $SUSPICIOUS_DOMAINS_FILE

# Step 3: Check each for gophish (port 3333)
while IFS= read -r domain; do
  if nc -z -w 3 $domain 3333 2>/dev/null; then
    echo "[CRITICAL] Gophish detected on: $domain"
  fi
done < $SUSPICIOUS_DOMAINS_FILE

# Step 4: Compare login forms using ssdeep
# First, generate hashes of your legitimate login pages
# ssdeep https://example.com/login > baseline.ssdeep

# Then compare against suspicious domain login pages
while IFS= read -r domain; do
  SUSPICIOUS_HASH=$(curl -s https://$domain | ssdeep -b -)
  ssdeep -m baseline.ssdeep <(echo "$SUSPICIOUS_HASH") && \
    echo "[ALERT] Similar login form found at: $domain"
done < $SUSPICIOUS_DOMAINS_FILE

# Step 5: Send junk credentials to confirm redirect (honeypot test)
# If a phishing page redirects to the real domain after submission = confirmed
curl -s -L -X POST https://suspicious-domain.com/login \
  -d "username=honeypot_user&password=honeypot_pass" \
  -D - | grep -i "location:"
```

> **Analyst Note:** The **credential submission test** (sending fake creds and checking if you are redirected to the legitimate site) is a strong confirmation signal. Many phishing kits capture the entered credentials and then silently redirect the victim to the real login page to avoid suspicion. A redirect to your real domain = confirmed phishing infrastructure. Document the redirect chain as evidence for takedown requests.

---

## 5. FAVICON HASH HUNTING (SHODAN / ZOOMEYE / CENSYS)

### 5.1 Why Favicon Hashing Works

Phishing kits frequently copy the favicon (browser tab icon) from the brand they impersonate to increase visual legitimacy. Internet-wide scanners (Shodan, ZoomEye, Censys) compute and store a **MurmurHash3** of the base64-encoded favicon for every host they scan. This means you can take your brand's favicon hash and find every host on the internet serving that same icon — including phishing infrastructure.

### 5.2 Generate the Favicon Hash

```python
# Python — generate MurmurHash3 of a brand's favicon
import base64
import requests
import mmh3

# Install required libraries: pip3 install requests mmh3

def get_favicon_hash(favicon_url):
    """
    Compute the Shodan/ZoomEye MurmurHash3 favicon hash.
    Works with any brand favicon URL.
    """
    response = requests.get(favicon_url, timeout=10)
    # base64.encodebytes adds line breaks — this is intentional for Shodan compat
    b64_favicon = base64.encodebytes(response.content)
    favicon_hash = mmh3.hash(b64_favicon)
    return favicon_hash

# Example: PayPal favicon
hash_value = get_favicon_hash("https://www.paypal.com/favicon.ico")
print(f"Favicon hash: {hash_value}")
# Example output: 309020573

# Use your own brand's favicon URL
hash_value = get_favicon_hash("https://www.example.com/favicon.ico")
print(f"Your brand's favicon hash: {hash_value}")
```

### 5.3 Pivot on the Hash in Internet Scanners

```bash
# Shodan search via web UI
# http.favicon.hash:309020573

# Shodan CLI
shodan search --fields ip_str,port,hostnames "http.favicon.hash:309020573"

# Shodan API
curl "https://api.shodan.io/shodan/host/search?key=<SHODAN_KEY>&query=http.favicon.hash:309020573" | \
  jq '.matches[].ip_str'

# ZoomEye — similar syntax
# iconhash: "309020573"

# Censys (requires account)
# via Censys Search UI: services.http.response.favicons.md5_hash="<HASH>"
```

> **Analyst Note:** Favicon hash hits are **leads**, not confirmed findings. Validate each result by visiting the page, reviewing the TLS certificate, and checking the domain against your CT monitoring data. Combine the favicon hash signal with domain age (RDAP), brand keywords in the domain name, and certificate issuer to prioritise triage. The combination of all three signals is a high-confidence indicator.

---

## 6. URL TELEMETRY HUNTING WITH URLSCAN.IO

### 6.1 What urlscan.io Provides

urlscan.io is a free and paid service that scans URLs and stores their full metadata: screenshots, DOM content, network requests, TLS certificate information, and resource origins. Its search API lets you hunt for brand abuse, cloned pages, and lookalike infrastructure at scale.

### 6.2 Search Queries and API Usage

```bash
# Install jq for JSON processing (if not already installed)
sudo apt install jq

# --- UI Search Queries (use in the urlscan.io search box) ---

# Find all domains containing your brand name (excluding your legit domains)
page.domain:(/.*yourbrand.*/ AND NOT yourbrand.com AND NOT www.yourbrand.com)

# Find pages hotlinking your assets (loading images/scripts from your domain)
domain:yourbrand.com AND NOT page.domain:yourbrand.com

# Restrict to recently scanned results (last 7 days)
page.domain:(/.*yourbrand.*/) AND date:>now-7d

# Find pages using specific phishing kit keywords
page.title:"Login" AND page.domain:(/.*yourbrand.*/)

# --- API Queries ---

# Search for lookalike domains mentioning your brand (last 7 days)
curl -s "https://urlscan.io/api/v1/search/?q=page.domain:(/.*yourbrand.*/%20AND%20NOT%20yourbrand.com)%20AND%20date:>now-7d" \
  -H "API-Key: <YOUR_URLSCAN_API_KEY>" | \
  jq '.results[].page.url'

# Get full result details including TLS info
curl -s "https://urlscan.io/api/v1/search/?q=page.domain:(/.*yourbrand.*/)&size=100" \
  -H "API-Key: <YOUR_URLSCAN_API_KEY>" | \
  jq '.results[] | {url: .page.url, tlsIssuer: .page.tlsIssuer, tlsAgeDays: .page.tlsAgeDays, date: .task.time}'

# Get screenshot of a specific scan result
# First get the UUID from the search results
SCAN_UUID="<uuid-from-search-results>"
curl -s "https://urlscan.io/screenshots/${SCAN_UUID}.png" -o phish_screenshot.png
```

**Key fields to pivot on from urlscan.io results:**

|Field|What to Look For|
|---|---|
|`page.tlsIssuer`|Let's Encrypt on a lookalike domain = suspicious|
|`page.tlsValidFrom`|Very recent certificate (`tlsAgeDays` < 7) = high risk|
|`page.tlsAgeDays`|< 7 days + brand keyword in domain = critical|
|`task.source`|`certstream-suspicious` = came from CT monitoring → tied to fresh domain|
|`page.title`|"Login", "Sign In", "Verify Account" on a lookalike = phishing|

---

## 7. CERTIFICATE TRANSPARENCY (CT) MONITORING

### 7.1 Why Certificate Transparency Is So Effective

Every time a TLS certificate is issued by a Certificate Authority, its details are permanently logged in public Certificate Transparency logs. This is a legal requirement for all publicly-trusted CAs. This means that **within minutes of a phishing domain receiving a certificate, it is publicly visible**  even before it receives any traffic.

This makes CT monitoring one of the most powerful early-warning signals available: you can see phishing infrastructure being built, often before the first phishing email is sent.

### 7.2 crt.sh — Manual CT Search

```bash
# Search crt.sh for certificates containing your brand keyword
# Web UI: https://crt.sh/?q=%25paypal%25

# API query — get JSON output for programmatic processing
curl -s "https://crt.sh/?q=%25yourbrand%25&output=json" | \
  jq -r '.[].name_value' | \
  sort -u

# Filter to recent certificates only (last 30 days)
curl -s "https://crt.sh/?q=%25yourbrand%25&output=json" | \
  jq -r '.[] | select(.not_before > "2024-01-01") | .name_value' | \
  sort -u

# Filter to Let's Encrypt certs only (most common for phishing)
curl -s "https://crt.sh/?q=%25yourbrand%25&output=json" | \
  jq -r '.[] | select(.issuer_name | contains("Let'\''s Encrypt")) | .name_value' | \
  sort -u

# Exclude your own legitimate domains
curl -s "https://crt.sh/?q=%25yourbrand%25&output=json" | \
  jq -r '.[].name_value' | \
  grep -v "yourbrand.com$\|www.yourbrand.com$" | \
  sort -u
```

### 7.3 CertStream : Real-Time CT Monitoring

**CertStream** provides a real-time websocket stream of all newly issued certificates from CT logs. This enables near-instant detection of new phishing domains.

**Reference:** [CertStream Medium post](https://medium.com/cali-dog-security/introducing-certstream-3fc13bb98067)  
**Pre-built tool:** [phishing_catcher](https://github.com/x0rz/phishing_catcher)

```bash
# Install certstream Python library
pip3 install certstream

# Basic CertStream listener — watch for your brand keywords in real time
python3 - << 'EOF'
import certstream
import tqdm

KEYWORDS = ["yourbrand", "yourcompany", "yourproduct"]

def process_cert(message, context):
    if message['message_type'] == "certificate_update":
        domains = message['data']['leaf_cert']['all_domains']
        for domain in domains:
            for keyword in KEYWORDS:
                if keyword.lower() in domain.lower():
                    # Exclude your own legitimate domains
                    if "yourbrand.com" not in domain:
                        print(f"[ALERT] Suspicious cert detected: {domain}")

certstream.listen_for_events(process_cert, url='wss://certstream.calidog.io/')
EOF

# Install and run phishing_catcher (pre-built, more sophisticated scoring)
git clone https://github.com/x0rz/phishing_catcher.git
cd phishing_catcher
pip3 install -r requirements.txt

# Edit suspicious.yaml to add your brand keywords
# Then run:
python3 catch_phishing.py
```

**Triage priorities for CT hits:**

|Signal|Priority|
|---|---|
|Newly registered domain (NRD) < 7 days + brand keyword|Critical|
|Privacy-proxy WHOIS (registrant hidden)|High|
|Unknown/low-reputation registrar|High|
|Let's Encrypt cert with very recent `NotBefore`|High|
|Domain on your allowlist (your own cert)|Ignore — allowlist it|

---

## 8. NEWLY REGISTERED DOMAIN (NRD) MONITORING

### 8.1 Why NRDs Are High Risk

Attackers register infrastructure close to their campaign launch date to minimise the window during which defenders can discover and block it. Domains registered in the last 7–30 days associated with your brand keywords are a strong leading indicator of active or imminent phishing campaigns.

```bash
# Domain age check via RDAP — scriptable and machine-readable
# (No rate limits compared to WHOIS)

# Verisign RDAP for .com/.net domains
curl -s "https://rdap.verisign.com/com/v1/domain/suspicious-domain.com" | \
  jq -r '.events[] | select(.eventAction=="registration") | .eventDate'

# Generic RDAP redirector (works across TLDs)
curl -s "https://www.rdap.net/domain/suspicious-domain.com" | \
  jq -r '.events[] | select(.eventAction=="registration") | .eventDate'

# Batch RDAP check for a list of domains
while IFS= read -r domain; do
  reg_date=$(curl -s "https://www.rdap.net/domain/$domain" | \
    jq -r '.events[] | select(.eventAction=="registration") | .eventDate' 2>/dev/null)
  echo "$domain: $reg_date"
done < suspicious_domains.txt

# Tag domains into age buckets
python3 - << 'EOF'
import json, subprocess
from datetime import datetime, timezone

domains = ["suspicious1.com", "suspicious2.com"]

for domain in domains:
    result = subprocess.run(
        ["curl", "-s", f"https://www.rdap.net/domain/{domain}"],
        capture_output=True, text=True
    )
    try:
        data = json.loads(result.stdout)
        for event in data.get("events", []):
            if event.get("eventAction") == "registration":
                reg_date = datetime.fromisoformat(
                    event["eventDate"].replace("Z", "+00:00")
                )
                age_days = (datetime.now(timezone.utc) - reg_date).days
                if age_days < 7:
                    risk = "CRITICAL"
                elif age_days < 30:
                    risk = "HIGH"
                else:
                    risk = "MEDIUM"
                print(f"{domain}: {age_days} days old — {risk}")
    except:
        print(f"{domain}: RDAP lookup failed")
EOF
```

### 8.2 Newly Registered Domain Feeds

```bash
# Whoxy newly registered domain feed
# https://www.whoxy.com/newly-registered-domains/
# Provides daily lists of newly registered domains by TLD

# Download and search for brand keywords
curl -s https://www.whoxy.com/newly-registered-domains/recent.php | \
  grep -i "yourbrand\|yourcompany"

# High-risk TLDs to monitor with extra suspicion
# .zip, .mov (confused with file extensions — used in lures)
# .cc, .tk, .ml, .ga, .cf (free or low-cost — common in phishing)
# New gTLDs: .app, .dev, .online, .site, .xyz
```

---

## 9. TLS/JA4 FINGERPRINTING : DETECTING AITM PROXY INFRASTRUCTURE

### 9.1 AiTM (Adversary-in-the-Middle) Phishing

Modern sophisticated phishing increasingly uses **AiTM reverse proxy frameworks** (e.g., Evilginx2, Modlishka, Muraena) that sit between the victim and the legitimate site. These steal session cookies — bypassing MFA — by relaying the full authenticated session through the attacker's proxy.

Detection at the domain/certificate level is identical to standard phishing. Additional network-level signals include TLS fingerprinting.

### 9.2 JA4 Fingerprint Detection

```bash
# JA4 fingerprints characterise TLS client/server behaviour
# Evilginx and similar frameworks may exhibit consistent JA4 values

# Capture JA4 hashes at egress using zeek or suricata
# Zeek with JA4 plugin:
# https://github.com/corelight/zeek-spicy-wildcard

# Query zeek SSL logs for known-bad JA4 fingerprints
grep "known_bad_ja4_value" /var/log/zeek/ssl.log

# Suricata JA4 rule example
# alert tls any any -> any any (msg:"Possible Evilginx JA4"; ja4:"<KNOWN_HASH>"; sid:9000001;)

# Enrich TLS certificate metadata for lookalike hosts
# Collect: issuer, SAN count, wildcard use, validity period, CN
openssl s_client -connect suspicious-domain.com:443 -servername suspicious-domain.com \
  </dev/null 2>/dev/null | openssl x509 -noout -text | \
  grep -A2 "Subject Alternative Name\|Issuer\|Not Before\|Not After"
```

> **Analyst Note:** JA4 fingerprints should be treated as **enrichment signals**, not standalone blockers. AiTM frameworks evolve and may randomise or rotate TLS parameters. Use JA4 as a correlation datapoint alongside domain age, CT monitoring, and favicon hashing. A domain that matches on three or more signals is a high-confidence finding warranting immediate action.

---

## 10. KEY CONCEPTS & ANALYST TAKEAWAYS

### 10.1 Phishing Detection Signal Strength Matrix

|Signal|Strength|Automation|Notes|
|---|---|---|---|
|Port 3333 open (Gophish)|Critical|High|Strong — attacker left default port exposed|
|Login form clone (ssdeep match)|Critical|Medium|Confirm visually before acting|
|Junk credentials redirect to real domain|Critical|Medium|Confirms active phishing infrastructure|
|Domain < 7 days old + brand keyword|High|High|NRD + keyword = strong combined signal|
|CT alert (brand keyword in new cert)|High|High|Near-real-time via CertStream|
|Favicon hash match in Shodan|High|Medium|Validate with content and cert check|
|MX record on lookalike domain|High|High|Domain is phishing-ready for email|
|urlscan.io TLS age < 7 days|High|High|Combine with keyword match|
|NXDOMAIN spike for lookalike from inside org|High|High|Users already clicking — block immediately|
|Similar login form (visual inspection)|Medium|Low|Manual triage step|
|Subdomain of legitimate domain structure|Medium|Medium|e.g., `yourcompany.com.attacker.net`|
|`.zip` / `.mov` TLD + brand keyword|Medium|High|High confusion potential in lures|

---

### 10.2 Recommended Daily SOC Workflow

```
Daily Automated Checks (scheduled, ~5 minutes runtime):
  1. Run dnstwist --registered on your primary domain(s)
  2. Query crt.sh API for new certs with brand keywords
  3. Check RDAP age on all new lookalike domains found
  4. Search urlscan.io for brand domain patterns (last 24h)
  5. Check for port 3333 on newly discovered IPs

Real-Time Monitoring (always-on):
  6. CertStream listener for brand keywords
  7. DNS RPZ / NXDOMAIN monitoring for internal lookups
  8. Egress proxy logs for connections to NRDs

Weekly:
  9. Review Shodan/ZoomEye favicon hash hits
  10. Check newly registered domain feeds (Whoxy) for brand keywords
  11. Review ssdeep similarity scores on candidate phishing pages
  12. Update allowlists to reduce false positives
```

---

### 10.3 Takedown and Response Actions

When phishing infrastructure is confirmed:

```
1. Collect evidence:
   - Screenshot the phishing page
   - Save the full HTTP response (curl -v)
   - Document the TLS certificate details
   - Record the IP, hosting provider, registrar

2. Report to:
   - Domain registrar (WHOIS abuse contact)
   - Hosting provider (abuse@<provider>.com)
   - Google Safe Browsing: https://safebrowsing.google.com/safebrowsing/report_phish/
   - Microsoft SmartScreen: https://www.microsoft.com/en-us/wdsi/support/report-unsafe-site
   - Anti-Phishing Working Group (APWG): reportphishing@apwg.org
   - PhishTank: https://phishtank.org/add_web_phish.php

3. Internal actions:
   - Add domain/IP to DNS blocklist (RPZ sinkhole)
   - Add to email gateway blocklist
   - Send internal user awareness alert
   - Notify threat intelligence team for IOC sharing
   - Check SIEM for users who may have visited the site
```

---

### 10.4 Quick Reference : Essential Commands

```bash
# --- LOOKALIKE DISCOVERY ---
dnstwist --registered --mxcheck --format json example.com > lookalikes.json
urlcrazy -r example.com

# --- DOMAIN AGE (RDAP) ---
curl -s https://rdap.verisign.com/com/v1/domain/suspicious.com | \
  jq -r '.events[] | select(.eventAction=="registration") | .eventDate'

# --- PORT 3333 CHECK (GOPHISH) ---
nmap -p 3333 suspicious-domain.com

# --- FAVICON HASH ---
python3 -c "
import base64,requests,mmh3
b64=base64.encodebytes(requests.get('https://example.com/favicon.ico').content)
print(mmh3.hash(b64))"

# Shodan query: http.favicon.hash:<HASH>

# --- CERTIFICATE TRANSPARENCY ---
curl -s "https://crt.sh/?q=%25yourbrand%25&output=json" | \
  jq -r '.[].name_value' | sort -u | grep -v "yourbrand.com$"

# --- URLSCAN.IO ---
curl -s "https://urlscan.io/api/v1/search/?q=page.domain:(/.*yourbrand.*/)%20AND%20date:>now-7d" \
  -H "API-Key: <KEY>" | jq '.results[].page.url'

# --- TLS CERT INSPECTION ---
openssl s_client -connect suspicious.com:443 </dev/null 2>/dev/null | \
  openssl x509 -noout -text | grep "Issuer\|Not Before\|Subject"

# --- LOGIN FORM SIMILARITY ---
ssdeep -r ./legitimate_login_pages/ > baseline.ssdeep
curl -s https://suspicious-domain.com | ssdeep -b - | \
  ssdeep -m baseline.ssdeep -
```

---

### 10.5 Tools Reference

|Tool|Platform|Install|Purpose|
|---|---|---|---|
|**dnstwist**|Linux/Windows/Mac|`pip3 install dnstwist`|Domain permutation generation and DNS resolution|
|**urlcrazy**|Linux|`sudo apt install urlcrazy`|Typosquatting variant generation|
|**CertStream**|Linux|`pip3 install certstream`|Real-time CT log monitoring|
|**phishing_catcher**|Linux|GitHub|Keyword-based CT monitoring with scoring|
|**crt.sh**|Browser / API|Free web service|CT log search by keyword|
|**ssdeep**|Linux|`sudo apt install ssdeep`|Fuzzy hash comparison of web page content|
|**gowitness**|Linux|`go install`|Headless browser screenshots of suspect pages|
|**Shodan**|Browser / CLI|`pip3 install shodan`|Favicon hash pivot, port discovery|
|**urlscan.io**|Browser / API|Free + paid API|URL/domain telemetry, screenshots, TLS data|
|**nmap**|Linux/Windows/Mac|`sudo apt install nmap`|Port scanning (check port 3333 for Gophish)|
|**Arjun**|Linux|`pip3 install arjun`|(General API testing — not specific to this topic)|
|**Zeek + JA4**|Linux|`sudo apt install zeek`|TLS fingerprinting at egress|
|**whoxy**|Web API|whoxy.com|Newly registered domain feeds|
|**RDAP**|curl / Python|Built-in (HTTP)|Machine-readable domain age lookup|

## Phishing FAQs
### what type of cyberattack involves customizing a phishing message for a specific person

**Spear phishing** is a type of cyberattack where the attacker crafts a phishing message specifically for one person, team, or organization. Instead of blasting the same generic email to thousands of people, this method focuses on a carefully selected target. That targeted approach makes spear phishing one of the most effective forms of **social engineering attacks** used today.

#### Key Characteristics of Spear Phishing
**Detailed Research and Custom Messages**  
Attackers spend time gathering information about their target before sending anything. Public sources such as professional profiles, company websites, and social media platforms like LinkedIn or Facebook provide enough details to build messages that look legitimate and relevant.

**Impersonation of Trusted Sources**  
Most spear phishing emails appear to come from someone the target already trusts. This could be a coworker, manager, vendor, or business partner. The familiarity lowers suspicion and increases the chance that the victim will act quickly.

**Highly Personalized Content**  
Unlike standard phishing emails, spear phishing messages often include the recipient’s name, job role, department details, or references to real projects. This level of personalization makes the message feel authentic and urgent.

**Higher Success Rates Than Traditional Phishing**  
Although spear phishing represents a smaller share of total phishing attempts, it accounts for a large portion of successful security breaches. The precision and credibility of these attacks significantly increase their effectiveness.

#### Common Types of Spear Phishing Attacks
**Whaling Attacks**  
Whaling targets senior executives or high-ranking individuals such as CEOs, CFOs, or government leaders. These attacks focus on gaining access to large financial transfers or highly sensitive corporate data.

**Business Email Compromise (BEC)**  
In a **Business Email Compromise** attack, the attacker either gains control of an executive’s email account or creates a convincing imitation of it. Employees are then instructed to send money, approve payments, or share confidential information.

**Clone Phishing**  
Clone phishing involves copying a real email that was previously sent to the victim. The attacker duplicates the message but replaces safe links or attachments with malicious ones, making the email appear familiar and trustworthy while delivering harmful content.