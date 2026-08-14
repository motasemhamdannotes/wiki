

# Bug Bounty Tools : Beginner Reference Notes

[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)

> Get the full BUH BOUNTY PACK in PDF [here](https://buymeacoffee.com/notescatalog/e/528934)

> A structured reference of tools used in authorised bug bounty hunting and web application security research, organised by workflow stage. All tools listed are for use only on systems you have explicit permission to test.

---

## 01 · Proxy & Network Sniffers
These tools sit between your browser and the target, intercepting and allowing manipulation of every HTTP/S request and response. They are the foundation of manual web application testing. Burp Suite is the de facto industry standard for bug bounty work; ZAP and Caido are strong free/lightweight alternatives.

|Tool|Description|Language|Author|
|---|---|---|---|
|[Burp Suite](https://portswigger.net/burp)|The primary proxy for intercepting, inspecting, and modifying web traffic. Free Community Edition covers most bug bounty needs; Pro adds the active scanner, Intruder with full speed, and the BApp Store.|Java|PortSwigger|
|[OWASP ZAP](https://www.owasp.org/index.php/OWASP_Zed_Attack_Proxy_Project)|A fully free, open-source proxy maintained by OWASP. Good alternative to Burp Community for users without a Pro licence. Includes an active scanner and a scripting engine.|Java|OWASP|
|[Caido](https://caido.io/)|A modern, lightweight web security auditing toolkit. Browser-based UI, designed as a more approachable alternative to Burp. Growing rapidly in the community.|Web|Caido|
|[Wireshark](https://www.wireshark.org/)|Full network protocol analyser — captures and decodes raw network packets at every layer. Useful for understanding traffic at a lower level than a web proxy, and for analysing non-HTTP protocols.|C, C++|The Wireshark Team|

---

## 02 · Burp Suite Extensions

Burp's extension ecosystem (the BApp Store) dramatically expands its built-in capabilities. The extensions below are among the most commonly recommended for bug bounty work. Install via **Extender → BApp Store** in Burp, or download `.jar` files from the BApp Store links and load manually. Python-based extensions require Jython.

|Extension|Description|Language|
|---|---|---|
|[Logger++](https://portswigger.net/bappstore/470b7057b86f41c396a97903377f3d81)|Logs all requests and responses from every Burp tool (Proxy, Repeater, Scanner, etc.) in a single sortable table. Supports CSV export for reporting and filtering. Essential for keeping track of activity across a large engagement.|Java|
|[AuthMatrix](https://portswigger.net/bappstore/30d8ee9f40c041b0bfec67441aad158e)|Structured approach to authorisation testing. You define a matrix of users, roles, and HTTP requests, then AuthMatrix runs each request in the context of each user and highlights where access controls fail. Excellent for IDOR and privilege escalation testing.|Python (Jython 2.7+)|
|[Autorize](https://portswigger.net/bappstore/f9bbac8c4acf4aefa4d7dc92a991af2f)|Automatically re-sends every request made by a high-privilege user using a low-privilege user's session token, highlighting responses that indicate unauthorised access. Highly effective for finding broken object-level authorisation issues with minimal manual effort.|Python (Jython)|
|[Burp Bounty](https://portswigger.net/bappstore/618f0b2489564607825e93eeed8b9e0a)|Allows you to write custom scan profiles — essentially building your own active scan checks for specific vulnerabilities relevant to a target. Useful when you know a target stack has a particular weakness you want to test systematically.|—|
|[Param Miner](https://portswigger.net/bappstore/17d2949a985c4b7ca092728dba871943)|Discovers hidden and unlinked GET/POST parameters by brute-forcing parameter names. Particularly valuable when hunting for web cache poisoning, where unkeyed parameters are the exploitation vector. Can also find hidden parameters that lead to other vulnerability classes.|—|

---

## 03 · Asset Discovery & Subdomain Enumeration

Mapping a target's external attack surface — all subdomains, IP ranges, and web-facing services — is always the first phase of bug bounty recon. The tools below range from passive (no direct DNS queries to the target) to active (resolving discovered names directly).

|Tool|Description|
|---|---|
|[Amass](https://github.com/OWASP/Amass)|The most comprehensive subdomain enumeration and network mapping tool available. Combines passive sources (certificates, DNS datasets, APIs), active DNS resolution, and brute forcing. Produces excellent graph-based output showing relationships between assets. Maintained under OWASP.|
|[subfinder](https://github.com/projectdiscovery/subfinder)|A fast, modular passive subdomain discovery tool from ProjectDiscovery. Queries dozens of passive sources simultaneously. Best used alongside Amass for maximum coverage — the two tools often find different subdomains.|
|[dnsgen](https://github.com/ProjectAnte/dnsgen)|Generates permutations and mutations of known domain names (e.g., `api.target.com` → `api-v2.target.com`, `staging-api.target.com`). Pipe results through a DNS resolver like massdns or dnsx to find live hosts.|
|[BuiltWith](https://builtwith.com/)|Browser extension (Chrome/Firefox) that identifies the full technology stack of any web page — framework, CMS, analytics, CDN, advertising platforms, and over 18,000 other technology categories. Useful for fingerprinting targets and identifying technologies with known vulnerabilities.|

---

## 04 · Fuzzing & Content Discovery

Once live hosts are identified, content discovery finds hidden paths, files, parameters, and endpoints that were never linked from the application's public interface. These are frequently where the most interesting functionality lives.

### Directory & Path Fuzzing

|Tool|Description|
|---|---|
|[FFuF](https://github.com/ffuf/ffuf)|The fastest and most flexible fuzzing tool in current use. Written in Go, it supports directory fuzzing, virtual host discovery, GET/POST parameter fuzzing, and header fuzzing. Highly configurable with filters for status code, content length, word count, and response time. The `-recursion` flag enables deep recursive directory discovery.|
|[dirsearch](https://github.com/maurosoria/dirsearch)|A Python-based directory and file brute-forcer. Slightly slower than FFuF but has a very clean output format and a good built-in wordlist. Good choice for targeted, careful directory enumeration on a specific subdomain.|
|[FeroxBuster](https://github.com/epi052/feroxbuster)|A recursive content discovery tool written in Rust — fast, with built-in auto-recursion and smart filtering. Handles large-scale enumeration across many hosts well and integrates cleanly into scripted workflows.|

### HTTP Toolkit & Crawling

|Tool|Description|
|---|---|
|[httpx](https://github.com/projectdiscovery/httpx)|A fast, multi-purpose HTTP toolkit from ProjectDiscovery. Takes a list of hosts/IPs and probes them for live HTTP/S services, capturing status codes, titles, server headers, tech stack, and more. The go-to tool for the "which of these subdomains are actually alive?" step.|
|[meg](https://github.com/tomnomnom/meg)|Efficiently fetches a large list of paths across a large list of hosts — cycling through hosts rather than exhausting all paths on one host before moving to the next. Avoids hammering a single server and is ideal for checking a specific path (e.g., `/phpinfo.php`) across thousands of hosts simultaneously.|
|[hakrawler](https://github.com/hakluke/hakrawler)|A fast Go web crawler optimised for bug bounty. Discovers forms, API endpoints, subdomains, linked documents, and JavaScript files. Reads from stdin so it integrates cleanly into pipeline-style recon workflows.|
|[waybackurls](https://github.com/tomnomnom/waybackurls)|Fetches every URL the Wayback Machine has indexed for a domain. Excellent for discovering old endpoints, exposed parameters, legacy API versions, and backup files that may still be accessible on the live site.|
|[nuclei](https://github.com/projectdiscovery/nuclei)|A template-based vulnerability scanner from ProjectDiscovery. Runs community-maintained YAML templates for known vulnerabilities, misconfigurations, exposed panels, and information disclosures against a list of targets. One of the most actively maintained tools in the ecosystem — new templates are added constantly for recent CVEs.|

---

## 05 · Recon Frameworks

Recon frameworks tie together subdomain enumeration, HTTP probing, screenshotting, vulnerability scanning, and reporting into automated pipelines. They are particularly valuable when managing continuous recon across large programs or multiple targets simultaneously.

|Tool|Description|
|---|---|
|[reconftw](https://github.com/six2dez/reconftw)|Automates the entire recon process end-to-end: subdomain enumeration, DNS resolution, HTTP probing, screenshot, port scanning, vulnerability scanning, and more. Highly configurable and one of the most complete single-tool recon solutions available.|
|[Sn1per](https://github.com/1N3/Sn1per)|An automated attack surface discovery and penetration testing framework. Discovers hidden assets, performs port scanning, vulnerability detection, and produces structured HTML reports. A paid professional version is also available.|
|[Spiderfoot](https://github.com/smicallef/spiderfoot)|An OSINT automation platform that integrates with hundreds of data sources — DNS, WHOIS, Shodan, social media, threat intelligence feeds, and more. Useful for building a comprehensive intelligence picture of a target organisation before testing.|
|[reNgine](https://github.com/yogeshojha/rengine)|A web-based reconnaissance suite with a focus on highly configurable, streamlined recon workflows. Includes a dashboard, scan history, and integrations with many standard recon tools. Good for teams or individuals who want a GUI-based recon management platform.|
|[AutoRecon](https://github.com/Tib3rius/AutoRecon)|A multi-threaded network reconnaissance tool that automatically enumerates discovered services. Originally designed for CTF and OSCP environments, but applicable to bug bounty port-scanning phases. Runs nmap then automatically launches service-specific enumeration scripts based on what it finds.|
|[Osmedeus](https://github.com/j3ssie/osmedeus)|A workflow engine for offensive security built for running large-scale recon against many targets. Highly customisable — you define the workflow and Osmedeus executes it. Designed for teams and continuous recon setups.|

---

## 06 · OSINT Search Engines

These passive sources can reveal a target's infrastructure, email addresses, source code, acquired companies, and much more — entirely without sending a single packet to the target. Good OSINT should always precede active testing.

|Tool|Description|Creator|
|---|---|---|
|[Shodan](https://www.shodan.io/)|Continuously scans the entire internet and indexes banners, certificates, and service information. Allows filtering by IP range, organisation, port, product, and certificate subject. A Pro account is strongly recommended for bug bounty work — gives access to more results and historical data.|John Matherly|
|[Censys](https://censys.io/)|Similar to Shodan, Censys indexes hosts, certificates, and open services. Particularly strong on TLS certificate data, making it excellent for finding subdomains and assets via certificate transparency records.|Censys|
|[hunter.io](https://www.hunter.io/)|Finds and verifies email addresses associated with a domain. Useful for finding contact details for security teams or for understanding an organisation's email format.|Hunter Team|
|[intelx.io](https://intelx.io/)|A comprehensive OSINT search engine that searches across historical data breaches, leaked databases, paste sites, Tor, and other dark web sources alongside conventional web indexing. Described as a Swiss army knife of OSINT.|Intelligence X|
|[crt.sh](https://crt.sh/)|Searches certificate transparency logs — every publicly trusted TLS certificate ever issued is logged here. Searching by domain returns all known subdomains that have had certificates issued, including expired ones and those on internal or staging systems. Completely free and no account needed.|Sectigo|
|[VirusTotal](https://www.virustotal.com/)|Beyond malware scanning, VirusTotal is a useful OSINT source for WHOIS records, passive DNS history, subdomain enumeration, and file/URL analysis. Querying a domain reveals historical DNS resolutions and related infrastructure.|VirusTotal Team|
|[ZoomEye](https://www.zoomeye.org/)|A Chinese-operated internet scanning search engine similar to Shodan. Can surface infrastructure that Shodan misses, particularly assets hosted in Asian cloud providers or regions.|Knownsec|
|[NerdyData](https://nerdydata.com/)|A search engine for HTML/CSS/JS source code. Can find all websites using a specific script, tracking pixel, analytics ID, or code snippet — useful for identifying the full scope of assets belonging to a target via shared code.|NerdyData|
|[Crunchbase](https://www.crunchbase.com/)|Business intelligence platform tracking company acquisitions, funding rounds, and subsidiaries. When a large company acquires a startup, the startup's domains often fall within scope — Crunchbase helps identify these acquisition targets.|TechCrunch|
|[Searchcode](https://searchcode.com/)|Searches source code across GitHub, GitLab, BitBucket, and other code hosting platforms for specific functions, APIs, libraries, and strings. Useful for finding hardcoded credentials, API keys, and internal endpoints in public repositories.|searchcode|

---

## 07 · Exploitation

|Tool|Description|Language|Author|
|---|---|---|---|
|[sqlmap](http://sqlmap.org/)|The standard tool for automated SQL injection detection and exploitation. Detects injection points, fingerprints the database, and can extract data, escalate to OS-level access, and bypass WAFs. Always confirm injection manually before running sqlmap on a live target — automated tools can cause unintended damage.|Python|sqlmapproject|

---

## 08 · Scanners

Port and service scanners establish what is listening on a target's IP space. Combined with OSINT and subdomain enumeration, port scanning completes the picture of a target's exposed attack surface.

|Tool|Description|Language|Author|
|---|---|---|---|
|[Nmap](https://nmap.org/)|The definitive port scanner. Supports service version detection (`-sV`), OS fingerprinting (`-O`), scriptable enumeration via the Nmap Scripting Engine (NSE), and output to multiple formats for import into other tools. Slower than masscan but significantly more reliable for accurate results, particularly on filtered hosts.|C, C++, Python, Lua|Gordon Lyon|
|[Masscan](https://github.com/robertdavidgraham/masscan)|An internet-scale port scanner capable of scanning the entire IPv4 address space in minutes by transmitting at up to 10 million packets per second. Used for fast initial discovery across large CIDR ranges; typically followed by targeted nmap for accurate service detection. Less reliable than nmap for comprehensive results on individual hosts.|C|Robert David Graham|
|[KeyHacks](https://github.com/streaak/keyhacks)|A reference repository documenting quick methods to verify whether leaked API keys are valid and what services they grant access to. Covers keys for AWS, Slack, GitHub, Stripe, Twilio, Google Cloud, and dozens of other services. Invaluable when you find credentials in source code, config files, or environment variables.|—|streaak|
|[Nmap Command Helper](https://competent-goldberg-e5eefe.netlify.app/)|An interactive web-based tool for building nmap commands. Includes a training feature to help memorise common flag combinations. Useful reference for beginners still learning nmap syntax.|—|0x0n0x|

---

## 09 · Mobile Hacking

Mobile application security testing requires a different toolkit from web testing. The tools below cover static analysis (decompiling APKs and IPAs to read the source), dynamic analysis (intercepting runtime behaviour and hooking functions), and forensic acquisition.

|Tool|Description|Language|Author|
|---|---|---|---|
|[Frida](https://frida.re/)|A dynamic instrumentation framework that lets you inject JavaScript or Python into running native apps on Android and iOS. Used to hook functions, bypass SSL pinning, modify runtime behaviour, and extract data from running applications. The foundation of most modern mobile dynamic analysis.|—|—|
|[jadx](https://github.com/skylot/jadx)|Decompiles Android `.dex` and `.apk` files back into readable Java source code. The cleanest and most widely used Android decompiler. Excellent GUI with search, cross-referencing, and export features.|Java|skylot|
|[Ghidra](https://ghidra-sre.org/)|NSA's open-source software reverse engineering suite. A full decompiler and disassembler supporting dozens of processor architectures. Used for native binary analysis (`.so` files, stripped binaries) where jadx alone is insufficient.|Java|NSA|
|[dex2jar](https://github.com/pxb1988/dex2jar)|Converts Android `.dex` files to `.jar` files so they can be opened in Java decompilers like jadx or JD-GUI. A common intermediate step in the Android decompilation workflow.|Java, Smali|Bob Pan|
|[Andriller](https://github.com/den4uk/andriller)|A forensic acquisition tool for Android devices. Performs read-only, non-destructive data extraction without modifying the device. Useful for extracting databases, application data, and communications for analysis.|Python|Denis Sazonov|
|[[Mobile Security Framework)](https://github.com/MobSF/Mobile-Security-Framework-MobSF/|MobSF (Mobile Security Framework)]]|An all-in-one automated mobile application security testing platform. Supports static analysis of APK, IPA, and APPX files, as well as dynamic analysis (runtime testing) with an emulator or device. Provides a web UI, REST API for CI/CD integration, and detailed vulnerability reports.|Python|MobSF Team|
|[objection](https://github.com/sensepost/objection)|A runtime mobile exploration toolkit built on top of Frida. Provides a command-line interface for common mobile security tasks — SSL pinning bypass, class and method listing, memory exploration, file system access — without needing to write Frida scripts manually. Works on both Android and iOS without requiring a jailbreak.|Python, TypeScript|sensepost|
|[RMS - Runtime Mobile Security](https://github.com/m0bilesecurity/RMS-Runtime-Mobile-Security)|A web interface for Android runtime manipulation. Lets you enumerate, hook, and modify Java classes and methods on a running application through a browser UI rather than command line.|Python|@mobilesecurity_|

---

## 10 · Notes & Organisation

Managing findings, tracking recon results, and organising infrastructure are often overlooked but critically important, especially when working on large programs over extended periods.

|Tool|Description|Language|Author|
|---|---|---|---|
|[Axiom](https://github.com/pry0cc/axiom)|A set of utilities for spinning up and managing a dynamic cloud infrastructure for bug bounty and pentesting. Allows you to create, configure, and destroy fleets of VPS instances on demand — ideal for running distributed recon or scanning tasks at scale.|Bash|@pry0cc|
|[ReconNess](https://github.com/reconness/reconness)|A web-based platform for managing all your recon data in one place. Run tools, store results, track subdomain state over time, and focus on potentially vulnerable targets without managing raw files.|C#|Reconness|
|[Updog](https://github.com/sc0tfree/updog)|A replacement for Python's SimpleHTTPServer that adds HTTPS support, file uploads, and HTTP basic auth. Useful for quickly hosting files during an engagement (e.g., serving payloads to test SSRF, exfiltrating data from a test environment).|Python|sc0tfree|
|[Notion](https://notion.so/)|A flexible notes and project management platform. Popular in the bug bounty community for building personal methodology wikis, tracking program scopes, and organising findings before writing reports.|—|Notion Labs|
|[Joplin](https://joplinapp.org/)|A free, open-source Markdown-based note-taking application with notebook organisation, tagging, search, and sync. A strong privacy-focused alternative to Notion for storing sensitive engagement notes locally.|JavaScript|Laurent Cozic|
|[Xmind](https://www.xmind.net/)|Mind mapping software for visualising attack flows, application structures, and vulnerability chains. Useful for planning testing approaches and communicating complex vulnerability relationships in reports.|—|XMind Ltd.|
|[PenTest.ws](https://pentest.ws/features)|A web application for organising penetration test data — hosts, services, vulnerabilities, and credentials — with a built-in reporting module for producing deliverables.|—|PenTest.ws|

---

## 11 · Wordlists & Utilities

### Wordlists

Good wordlists are the backbone of directory fuzzing, subdomain brute-forcing, and parameter discovery. The two collections below together cover virtually all use cases.

|Wordlist|Description|
|---|---|
|[SecLists](https://github.com/danielmiessler/SecLists)|The most comprehensive collection of wordlists for security testing. Covers directory/file fuzzing, subdomain brute-forcing, password lists, usernames, fuzzing payloads, and more. Maintained by Daniel Miessler. Should be installed on every bug bounty setup.|
|[Assetnote Wordlists](https://wordlists.assetnote.io/)|Technology-specific and regularly updated wordlists generated by Assetnote by crawling the web and extracting patterns. Particularly strong for API path discovery and framework-specific fuzzing. Often finds paths that SecLists misses.|

### Utilities

|Tool|Description|Author|
|---|---|---|
|[CyberChef](https://gchq.github.io/CyberChef/)|A browser-based data transformation toolkit. Supports encoding/decoding (Base64, URL, hex, Unicode), encryption, hashing, compression, data format conversion, and dozens of other operations — all chainable into "recipes". Essential for decoding obfuscated payloads, analysing tokens, and preparing exploit strings.|GCHQ|
|[webhook.site](https://webhook.site/)|Instantly creates a unique URL and email address that captures all incoming HTTP requests and emails in real time. Used for testing SSRF, XXE out-of-band callbacks, open redirects, and email injection — anywhere you need a listener without setting up your own server.|fredsted|
|[requestcatcher.com](https://requestcatcher.com/)|Similar to webhook.site — creates a subdomain that forwards all incoming HTTP requests to your browser in real time. Simple, requires no account, and is quick to spin up for rapid SSRF or blind injection testing.|—|
|[canarytokens.org](https://canarytokens.org/)|Generates "canary tokens" — special URLs, document embeds, DNS names, and other tripwires that silently alert you when triggered. Useful for testing blind SSRF, blind XXE, email injection, and for planting detection tripwires in documents or URLs during an assessment.|Thinkst Canary|
|[ReconPi](https://github.com/x1mdev/ReconPi)|A lightweight recon toolkit configured to run on a Raspberry Pi. Automates subdomain enumeration, HTTP probing, and vulnerability scanning — useful for running persistent, low-power continuous recon.|@x1m_martijn|

---