
[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net]

- Complete Web Hacking Study Notes From [here](https://buymeacoffee.com/notescatalog/e/280732)

## 1. What This Reference Covers

This cheatsheet condenses the handbook into a repeatable workflow covering:

- Web and HTTP fundamentals
    
- Reconnaissance, crawling, content discovery, and fingerprinting
    
- Burp Suite workflow and module selection
    
- WAF identification and behavioral testing
    
- Common web vulnerabilities and verification patterns
    
- REST, SOAP, and GraphQL API testing
    
- WordPress, Joomla, Drupal, and Jenkins review
    
- Automated scanners and supporting utilities
    
- Reporting, remediation, and certification revision cues
    

### Core mental model

For every feature, ask:

1. **What input does the application trust?**
    
2. **Where is that input processed or stored?**
    
3. **Which identity performs the action?**
    
4. **What authorization decision should occur?**
    
5. **Can the request be replayed, reordered, modified, or sent through another method?**
    
6. **What changes when the user, object ID, content type, origin, or HTTP method changes?**
    

---

# 2. Rules of Engagement and Testing Discipline

Before touching the target:

- Confirm scope: domains, subdomains, APIs, ports, accounts, and excluded systems.
    
- Confirm permitted techniques: scanning, brute-force simulation, file upload, race testing, and out-of-band callbacks.
    
- Set request-rate limits and testing windows.
    
- Use dedicated test accounts and test data.
    
- Capture baseline requests before modifying anything.
    
- Prefer reversible, harmless proof:
    
    - `alert(1)` for XSS
        
    - `id` or `whoami` for command execution
        
    - `sleep 5` for blind injection
        
    - `/etc/hostname` or a supplied lab file for file-read proof
        
    - A marker string or test record instead of changing production data
        
- Record the exact request, response, account, timestamp, and observed impact.
    
- Remove uploaded files, test users, modified objects, or configuration changes after validation.
    

---

# 3. Web Fundamentals

## 3.1 Web application layers

|Layer|Typical technologies|Security focus|
|---|---|---|
|Frontend|HTML, CSS, JavaScript, React, Angular, Vue|DOM XSS, client-side authorization assumptions, exposed secrets, source-map leakage|
|Backend|PHP, Python, Java, Node.js, Ruby|Injection, file handling, authentication, deserialization, template injection|
|Database|MySQL, PostgreSQL, MSSQL, MongoDB, Redis|SQL/NoSQL injection, excessive privileges, exposed backups|
|Transport|HTTP/HTTPS, WebSockets|Headers, cookies, TLS, method handling, CORS, origin validation|
|API|REST, SOAP, GraphQL|BOLA, BFLA, mass assignment, inventory issues, unsafe data consumption|

## 3.2 HTTP request structure

```
POST /api/v1/profile HTTP/1.1
Host: target.example
Authorization: Bearer <TOKEN>
Content-Type: application/json
Cookie: session=<SESSION_ID>

{"displayName":"tester"}
```

A request contains:

1. Request line: method, path, protocol version
    
2. Headers: host, authorization, cookies, content type, origin, user agent
    
3. Optional body: form data, JSON, XML, multipart data
    

## 3.3 HTTP response structure

```
HTTP/1.1 200 OK
Content-Type: application/json
Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Lax
Cache-Control: no-store

{"status":"updated"}
```

## 3.4 Methods and security implications

|   |   |   |
|---|---|---|
|Method|Intended use|Testing questions|
|`GET`|Retrieve data|Can IDs be changed? Is sensitive data placed in URLs?|
|`POST`|Create or submit|Injection, duplicate actions, mass assignment|
|`PUT`|Replace resource|Can a low-privilege user overwrite another object?|
|`PATCH`|Partial update|Can hidden fields such as `role` or `isAdmin` be changed?|
|`DELETE`|Remove resource|Can another user's object be deleted?|
|`OPTIONS`|Advertise methods|Does it expose hidden write methods?|
|`HEAD`|Headers without body|Is authentication enforced consistently?|
|`TRACE`|Reflect request|Is it enabled unnecessarily?|

## 3.5 Status-code interpretation

|   |   |
|---|---|
|Code|Practitioner interpretation|
|`200`|Success; compare body and side effects|
|`201`|Resource created|
|`204`|Action succeeded without response body|
|`301/302`|Follow redirects and check whether state changed|
|`400`|Useful schema or parsing feedback|
|`401`|Authentication absent or rejected|
|`403`|Identity accepted but authorization denied|
|`404`|Resource not found, or deliberately hidden|
|`405`|Current method rejected; test permitted alternatives|
|`429`|Rate limiting is present|
|`500`|Potential parser, injection, type, or logic failure|
|`503`|Service unavailable; stop if testing caused instability|

---

# 4. Encoding, Origins, Cookies, and Sessions

## 4.1 Encoding quick reference

```
# URL encode with Python
python3 -c 'import urllib.parse; print(urllib.parse.quote("test value"))'

# Base64 encode/decode
echo -n 'user:password' | base64
echo 'dXNlcjpwYXNzd29yZA==' | base64 -d
```

Remember:

- **Encoding is not encryption.**
    
- URL encoding changes unsafe URL characters into `%xx`.
    
- Base64 is reversible and often appears in tokens, credentials, or serialized values.
    
- HTML entities prevent characters from being interpreted as markup.
    
- Multiple decoding layers can create filter inconsistencies.
    

## 4.2 Same-Origin Policy

An origin is the combination of:

- Protocol
    
- Host
    
- Port
    

Different protocol, host, or port means a different origin.

Controlled exceptions include:

- CORS response headers
    
- `postMessage`
    
- Cross-origin loading of some images, styles, and scripts
    
- Legacy `document.domain` behavior
    

## 4.3 Cookie attributes

|   |   |
|---|---|
|Attribute|Purpose|
|`Domain`|Controls which hosts receive the cookie|
|`Path`|Limits the cookie to a path|
|`Expires` / `Max-Age`|Defines lifetime|
|`Secure`|Sends cookie only over HTTPS|
|`HttpOnly`|Prevents JavaScript access|
|`SameSite=Strict`|Strongest cross-site restriction|
|`SameSite=Lax`|Allows limited top-level navigation use|
|`SameSite=None; Secure`|Permits cross-site use over HTTPS|

### Cookie review checklist

- Is the session cookie `Secure` and `HttpOnly`?
    
- Is `SameSite` appropriate?
    
- Is the `Domain` broader than necessary?
    
- Does the session ID rotate after login and privilege changes?
    
- Is the token placed in the URL?
    
- Does logout invalidate the server-side session?
    
- Are old tokens accepted after password reset?
    

---

# 5. Engagement Methodology

## Phase 1 - Map the target

Collect:

- IP addresses and virtual hosts
    
- Subdomains
    
- Technologies and versions
    
- Navigation and workflows
    
- Authentication mechanisms
    
- User roles
    
- Input areas
    
- API endpoints and versions
    
- Defensive controls and WAF behavior
    

## Phase 2 - Enumerate content

Review:

- `/robots.txt`
    
- `/sitemap.xml`
    
- Page source
    
- JavaScript files
    
- Source maps
    
- HTTP headers
    
- Backup files
    
- Debug routes
    
- API documentation
    
- Old or unused endpoints
    

## Phase 3 - Identify attack surfaces

Prioritize:

- Login, registration, and password reset
    
- Search and filtering
    
- Profile or account updates
    
- File upload and download
    
- Object IDs
    
- Comments and support tickets
    
- URL-fetching features
    
- XML/JSON inputs
    
- Admin or management functions
    
- Background jobs
    
- WebSocket messages
    
- Checkout, coupon, or transaction workflows
    

## Phase 4 - Manual testing

Use one controlled change at a time:

1. Capture a valid request.
    
2. Send it to Repeater.
    
3. Modify one variable.
    
4. Compare status, length, body, timing, and side effects.
    
5. Repeat as a different user.
    
6. Test alternate methods and content types.
    
7. Verify impact with a harmless proof.
    

## Phase 5 - Automation

Use automation after understanding the request:

- Fuzz paths and parameters
    
- Replay authenticated requests
    
- Filter noise by status, size, words, or lines
    
- Avoid large wordlists until a reliable baseline is established
    

## Phase 6 - Reporting

Every finding should include:

- Title and severity
    
- Affected endpoint or component
    
- Preconditions and account role
    
- Exact request and relevant response
    
- Observed impact
    
- Reproduction steps
    
- Root cause
    
- Remediation
    
- Cleanup performed
    
- OWASP/CWE/API Top 10 mapping where relevant
    

---

# 6. Reconnaissance and Content Discovery

## 6.1 Basic inspection

```
curl -i https://target.example/
curl -I https://target.example/
curl -v https://target.example/
```

Look for:

- Server banners
    
- Framework cookies
    
- Security headers
    
- Redirect behavior
    
- `Allow` headers
    
- CORS headers
    
- Caching directives
    
- Verbose errors
    

## 6.2 Technology fingerprinting

```
whatweb https://target.example
```

Also inspect:

- `Server`
    
- `X-Powered-By`
    
- Cookie names such as `PHPSESSID`, `JSESSIONID`, `XSRF-TOKEN`
    
- HTML generators
    
- JavaScript package names
    
- CMS paths and assets
    

## 6.3 Photon

```
python3 photon.py -u "https://target.example"
python3 photon.py -u "https://target.example" -l 3
python3 photon.py -u "https://target.example" -clone
python3 photon.py -u "https://target.example" -o target-output
```

Useful options:

- `-l`: crawl depth
    
- `-clone`: local copy
    
- `-o`: output directory
    
- `-keys`: search for keys
    
- `-dns`: DNS/subdomain data
    
- `-wayback`: add archived URLs
    
- `-headers`: custom headers
    
- `-cookie`: authenticated crawling
    

## 6.4 Hakrawler

```
hakrawler -url https://target.example -d 3
hakrawler -url https://target.example -subs -forms -js -robots
hakrawler -url https://target.example -proxy http://127.0.0.1:8080
hakrawler -url https://target.example -silent > urls.txt
```

## 6.5 Gobuster

```
# Directories and files
gobuster dir \
  -u https://target.example \
  -w /usr/share/wordlists/dirb/common.txt \
  -x php,html,txt,bak

# Through Burp
gobuster dir \
  -u https://target.example \
  -w /usr/share/wordlists/dirb/common.txt \
  -p http://127.0.0.1:8080

# Virtual hosts
gobuster vhost \
  -u http://TARGET_IP \
  --domain target.example \
  --append-domain \
  -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt

# DNS subdomains
gobuster dns \
  -d target.example \
  -w /usr/share/wordlists/dns/namelist.txt
```

Useful filters:

- `--exclude-length`
    
- `-b 404`
    
- `-s 200,204,301,302,401,403`
    
- `-k` for approved lab systems using self-signed TLS
    
- `-c` to supply a cookie
    
- `-H` to supply a header
    

## 6.6 ffuf

```
# Directories
ffuf -u https://target.example/FUZZ \
  -w /usr/share/seclists/Discovery/Web-Content/raft-medium-words.txt

# Extensions
ffuf -u https://target.example/FUZZ \
  -w words.txt \
  -e .php,.html,.txt,.bak

# Show selected response codes
ffuf -u https://target.example/FUZZ \
  -w words.txt \
  -mc 200,204,301,302,401,403

# Hide a known false-positive size
ffuf -u https://target.example/FUZZ \
  -w words.txt \
  -fs 5120

# Parameter discovery
ffuf -u 'https://target.example/page?FUZZ=1' \
  -w /usr/share/seclists/Discovery/Web-Content/burp-parameter-names.txt
```

## 6.7 Wfuzz

```
wfuzz -c \
  -w /usr/share/wordlists/dirb/common.txt \
  --hc 404 \
  https://target.example/FUZZ

wfuzz -c \
  -z file,/usr/share/seclists/Discovery/Web-Content/raft-large-files.txt \
  -b "session=<SESSION_ID>" \
  --hc 301,403,404 \
  https://target.example/FUZZ
```

---

# 7. Burp Suite Rapid Reference

## Target

Use it to:

- Add the application to scope
    
- Exclude third-party domains
    
- Review the site map
    
- Build an endpoint inventory
    

## Proxy

Use it to:

- Intercept and modify browser traffic
    
- Review HTTP and WebSocket history
    
- Capture authenticated requests
    
- Send requests to other modules
    

Default proxy listener:

```
127.0.0.1:8080
```

Install Burp's CA certificate in the test browser to inspect HTTPS traffic.

## Repeater

Best for:

- Manual parameter manipulation
    
- Authorization testing
    
- Method switching
    
- Content-type testing
    
- Differential response analysis
    
- Building minimal proofs
    

Shortcut:

```
Ctrl+R
```

## Intruder

|   |   |
|---|---|
|Attack type|Use|
|Sniper|One payload set tested across selected positions|
|Battering Ram|Same payload placed in all positions|
|Pitchfork|Parallel matching of multiple payload lists|
|Cluster Bomb|Every combination of multiple payload lists|

Useful features:

- Grep-Match: flag responses containing selected strings
    
- Grep-Extract: extract dynamic values
    
- Payload processing: encode or transform payloads
    
- Response-length and status comparison
    

## Decoder

Use for:

- URL encoding/decoding
    
- Base64
    
- Hex
    
- Hash generation
    
- Recursive smart decoding
    

## Comparer

Use for word- or byte-level comparison of:

- Responses from two users
    
- Authorized and unauthorized requests
    
- Baseline and modified requests
    
- Different content types or methods
    

## Sequencer

Use to evaluate randomness of:

- Session IDs
    
- Reset tokens
    
- CSRF tokens
    
- Nonces
    

Prefer a controlled test environment because live capture can generate thousands of requests.

---

# 8. WAF Fingerprinting

## Passive indicators

```
curl -I https://target.example
```

Common headers:

|   |   |
|---|---|
|Indicator|Likely technology|
|`server: cloudflare`, `cf-ray`|Cloudflare|
|`X-Sucuri-ID`|Sucuri|
|`X-CDN: Imperva`|Imperva|
|`Akamai-Origin-Hop`|Akamai|
|`X-F5-Application`|F5|

## Behavioral comparison

Compare a normal request with a harmless signature probe in an authorized lab.

Watch for:

- `403 Forbidden`
    
- `406 Not Acceptable`
    
- Vendor-specific block pages
    
- CAPTCHA or challenge headers
    
- Increased response time
    
- Response-length changes
    

## Tools

```
wafw00f https://target.example

nmap -p 80,443 \
  --script http-waf-fingerprint \
  target.example
```

### Practitioner note

A WAF response is not proof that the backend is secure. Test normalization differences among:

- URL encoding
    
- JSON and XML
    
- Headers
    
- Path segments
    
- Query strings
    
- Multipart bodies
    

---

# 9. Vulnerability Verification Matrix

|   |   |   |   |
|---|---|---|---|
|Vulnerability|First signal|Low-impact proof|Primary remediation|
|SQL injection|SQL error, conditional response, delay|`'` then boolean/time check|Parameterized queries|
|NoSQL injection|Type/operator accepted|`$ne` or `$regex` against a test account|Enforce scalar types and allowlists|
|IDOR/BOLA|Object ID controls resource|Cross-account access to a test object|Object-level authorization|
|XXE|XML parser accepts DTD|Read supplied lab file or controlled callback|Disable external entities|
|Traversal/LFI|File parameter accepts paths|Read `/etc/hostname` or lab marker|Canonicalize and allowlist paths|
|CSRF|State change lacks binding token|Harmless profile-field change|CSRF tokens and SameSite|
|XSS|Input executes in browser|`alert(1)`|Context-aware output encoding|
|File upload|Uploaded content is executable or reachable|Benign text marker with unexpected extension|Store outside webroot; validate content|
|JWT flaw|Signature/claims weakly verified|Modify harmless claim in lab|Enforce algorithm, key, and claims|
|SSRF|Server fetches supplied URL|Request a controlled endpoint|URL allowlist and network egress controls|
|Command injection|Shell metacharacters alter behavior|`; id` or delay|Avoid shell execution; safe APIs|
|SSTI|Template expression evaluated|`{{7*7}}` or engine-specific arithmetic|Never concatenate input into templates|
|Deserialization|Untrusted object material is parsed|Type/error proof with benign payload|Safe formats and integrity validation|
|Race condition|Parallel requests create impossible state|Duplicate test action|Atomic transactions and locking|
|CORS issue|Arbitrary origin receives credentials|Controlled origin with test account|Strict origin allowlist|
|Mass assignment|Extra fields accepted|Add harmless hidden field|Explicit server-side field allowlist|

---

# 10. SQL Injection

## 10.1 Manual workflow

1. Identify an input used in a database query.
    
2. Test a quote and observe errors or response differences.
    
3. Determine injection type:
    
    - Error-based
        
    - UNION-based
        
    - Boolean blind
        
    - Time-based blind
        
    - Second-order
        
4. Determine column count where relevant.
    
5. Identify reflected columns.
    
6. Enumerate only the minimum data required to prove impact.
    
7. Assess database-user privileges.
    
8. Stop before destructive changes.
    

### Common probes

```
'
''
' AND '1'='1
' AND '1'='2
' ORDER BY 1--
' UNION SELECT 1,2,3--
```

### Time-based verification

Use a database-appropriate delay only after a baseline is established.

```
' AND SLEEP(5)--
```

## 10.2 sqlmap

Capture the request from Burp and save it as `request.txt`.

```
# Identify DBMS and banner
sqlmap -r request.txt --banner --batch

# Current database
sqlmap -r request.txt --current-db --batch

# Enumerate tables
sqlmap -r request.txt -D <DATABASE> --tables --batch

# Enumerate columns
sqlmap -r request.txt -D <DATABASE> -T <TABLE> --columns --batch

# Dump approved test data only
sqlmap -r request.txt \
  -D <DATABASE> \
  -T <TABLE> \
  -C <COLUMN1,COLUMN2> \
  --dump --batch

# Blind response matching
sqlmap -r request.txt \
  --string="KNOWN_TRUE_TEXT" \
  --batch

# Second-order testing
sqlmap -r request.txt \
  --second-order="https://target.example/result-page" \
  -p <PARAMETER> \
  --batch
```

## 10.3 Second-order SQL injection

Key characteristic:

- Payload is stored at **input A**
    
- Payload executes later at **sink B**
    

Method:

1. Use unique naming per module.
    
2. Track where stored values reappear.
    
3. Test all workflows that consume the value.
    
4. Refresh sessions when automated tooling poisons client-side state.
    
5. Use `--second-order` with the page that triggers execution.
    

## 10.4 Prevention

- Prepared statements
    
- Parameterized queries
    
- Minimum database privileges
    
- Input type validation
    
- Safe error handling
    
- Monitoring and regular review
    
- WAF as an additional control, not the primary fix
    

---

# 11. NoSQL Injection

## Common forms

- Syntax injection
    
- Operator injection
    

### Operator proof

Form-encoded examples in an authorized lab:

```
user[$ne]=invalid&pass[$ne]=invalid
user=admin&pass[$regex]=^.{8}$
```

JSON example:

```
{
  "username": {"$gt": ""},
  "password": {"$gt": ""}
}
```

Review whether the backend expects strings but accepts objects or arrays.

### Prevention

- Enforce exact input types
    
- Reject keys beginning with `$`
    
- Use schema validation
    
- Avoid directly passing request objects into database filters
    
- Apply authentication and authorization independently of query results
    

---

# 12. IDOR and BOLA

## Testing sequence

1. Create object A as user A.
    
2. Capture the request used to read, update, or delete it.
    
3. Sign in as user B.
    
4. Replay the request with object A's identifier.
    
5. Test IDs in:
    
    - URL paths
        
    - Query strings
        
    - JSON fields
        
    - Nested objects
        
    - Headers
        
    - File names
        
6. Test read and write operations separately.
    

```
for id in {1..20}; do
  curl -s "https://api.target.example/v1/objects/$id" \
    -H "Authorization: Bearer <USER_B_TOKEN>"
done
```

A `403` versus `404` difference may reveal object existence.

### Remediation

- Resolve the object through the authenticated user's allowed collection.
    
- Do not rely on unpredictable UUIDs alone.
    
- Check authorization for every object and every action.
    

---

# 13. XML Injection and XXE

## Detection

- Change `Content-Type` to XML.
    
- Add harmless XML nodes and observe parsing behavior.
    
- Test whether DTDs are accepted.
    

Low-impact file-read proof:

```
<?xml version="1.0"?>
<!DOCTYPE root [
  <!ENTITY test SYSTEM "file:///etc/hostname">
]>
<root>&test;</root>
```

Blind/OOB testing should use a controlled collaboration endpoint and written approval.

### Risks

- Local file disclosure
    
- SSRF
    
- Internal service interaction
    
- Denial of service
    
- Potential command execution in unsafe parser environments
    

### Remediation

- Disable DTDs and external entities
    
- Use hardened parser settings
    
- Validate against strict schemas
    
- Prefer JSON where XML features are unnecessary
    
- Restrict network access from parser processes
    

---

# 14. Directory Traversal and File Inclusion

## Traversal probes

```
../../../../etc/hostname
..%2f..%2f..%2f..%2fetc%2fhostname
..\..\..\..\Windows\win.ini
```

Test:

- Raw traversal
    
- URL-encoded traversal
    
- Double encoding
    
- Mixed separators
    
- Absolute paths
    
- Null-byte behavior only in legacy lab environments
    

## PHP filter read

```
php://filter/convert.base64-encode/resource=index.php
```

## LFI versus RFI

|   |   |
|---|---|
|Type|Behavior|
|LFI|Includes a local file from the target host|
|RFI|Includes a remote resource, usually requiring unsafe PHP settings|

### Remediation

- Never pass raw user input into file paths
    
- Map identifiers to server-side allowlisted files
    
- Canonicalize and verify the final path
    
- Store sensitive files outside reachable paths
    
- Disable remote includes
    

---

# 15. CSRF

## Test conditions

A state-changing request may be vulnerable when:

- Authentication depends only on cookies
    
- No unpredictable CSRF token is present
    
- The token is not bound to the session
    
- The token can be removed
    
- The server accepts state changes through `GET`
    
- Origin and Referer are not validated
    
- SameSite protection is insufficient for the flow
    

## Basic test flow

1. Capture a harmless profile update.
    
2. Remove the CSRF token.
    
3. Change method if applicable.
    
4. Replay from another origin in a controlled test.
    
5. Verify whether the state changed.
    

### Remediation

- Strong per-session or per-request CSRF tokens
    
- `SameSite` cookies
    
- Origin/Referer validation
    
- Re-authentication for critical actions
    
- Avoid state changes through `GET`
    

---

# 16. HTML Injection and XSS

## 16.1 Types

|   |   |
|---|---|
|Type|Execution model|
|Reflected XSS|Payload appears in the immediate response|
|Stored XSS|Payload is stored and later rendered|
|DOM XSS|Client-side JavaScript moves attacker-controlled data into a dangerous sink|
|Blind XSS|Stored payload executes in a different administrative or backend view|

## 16.2 Safe detection payloads

```
<script>alert(1)</script>
"><script>alert(1)</script>
<img src=x onerror=alert(1)>
<svg onload=alert(1)>
```

Test the exact output context:

- HTML body
    
- Attribute
    
- JavaScript string
    
- URL
    
- CSS
    
- DOM sink
    

## 16.3 DOM review

Sources often include:

- `location`
    
- `location.hash`
    
- `location.search`
    
- `document.referrer`
    
- `postMessage`
    
- local/session storage
    

Dangerous sinks include:

- `innerHTML`
    
- `outerHTML`
    
- `document.write`
    
- `eval`
    
- `setTimeout` with strings
    
- `setAttribute` in unsafe contexts
    

## 16.4 Prevention

- Context-aware output encoding
    
- Sanitize permitted HTML with a mature library
    
- Avoid dangerous DOM sinks
    
- Content Security Policy as defense in depth
    
- `HttpOnly` cookies to reduce session theft impact
    
- Validate and constrain URL schemes
    

---

# 17. File Upload Vulnerabilities

## Review checklist

- Extension validation
    
- MIME type validation
    
- File signature or magic-byte validation
    
- Filename normalization
    
- Double extensions
    
- Case variations
    
- Alternate executable extensions
    
- Image-converter behavior
    
- Storage location
    
- Direct public access
    
- Server-side execution
    
- Archive extraction and path traversal
    
- Metadata and embedded content
    
- Size and decompression limits
    

## Safe verification

Upload a benign marker file and test:

- Whether the server renames it
    
- Whether content is served with a safe MIME type
    
- Whether it is stored outside the webroot
    
- Whether path components are honored
    
- Whether active content is executed
    

### Remediation

- Store outside webroot
    
- Generate server-side filenames
    
- Allowlist extensions and MIME types
    
- Re-encode images
    
- Strip metadata
    
- Disable execution
    
- Scan content
    
- Limit size and archive expansion
    

---

# 18. JWT Testing

A JWT contains:

```
header.payload.signature
```

Review claims:

- `alg`
    
- `kid`
    
- `sub`
    
- `aud`
    
- `iss`
    
- `exp`
    
- `nbf`
    
- Role or privilege claims
    

## Inspection and lab testing

```
python3 jwt_tool.py <TOKEN>

# Test unsigned-token acceptance
python3 jwt_tool.py <TOKEN> -X a

# Test a weak HMAC secret in an approved lab
python3 jwt_tool.py <TOKEN> \
  -C \
  -d /usr/share/wordlists/rockyou.txt

# Interactive claim modification
python3 jwt_tool.py <TOKEN> -T
```

Check whether the server:

- Enforces the expected algorithm
    
- Rejects `none`
    
- Separates asymmetric and symmetric verification
    
- Validates `exp`, `nbf`, `aud`, and `iss`
    
- Treats `kid` as untrusted input
    
- Rejects modified claims
    
- Rotates and protects signing keys
    

---

# 19. SSRF

## Common input locations

- URL preview
    
- Webhook
    
- Image import
    
- PDF generation
    
- Avatar fetch
    
- Feed import
    
- Callback URL
    
- Cloud integration
    
- API proxy
    

## Safe probes

```
http://127.0.0.1/
http://localhost/
http://[::1]/
```

Use a controlled endpoint to verify outbound requests.

## Test dimensions

- Redirect following
    
- Alternate IP representations
    
- URL user-info syntax
    
- DNS rebinding protections
    
- Scheme restrictions
    
- Internal ports
    
- Cloud metadata access
    
- Response reflection versus blind behavior
    

### Remediation

- Strict scheme and destination allowlists
    
- Resolve and validate the final IP
    
- Revalidate after redirects
    
- Block private, loopback, link-local, and metadata ranges
    
- Restrict egress at the network layer
    
- Use dedicated fetch services with minimal access
    

---

# 20. Command Injection

## Detection

Verbose proof:

```
; id
&& id
| id
```

Blind timing proof:

```
; sleep 5
```

Windows timing alternatives may use controlled ping delays.

## Common injection operators

```
;
&&
||
|
`
$()
```

Test in:

- Hostname/IP fields
    
- Diagnostic tools
    
- File conversion
    
- Backup functions
    
- Git or package operations
    
- Image processing
    
- Administrative utilities
    

### Remediation

- Do not invoke a shell
    
- Use safe language APIs with argument arrays
    
- Allowlist expected values
    
- Reject metacharacters
    
- Run the service with minimal privileges
    
- Apply timeouts and sandboxing
    

---

# 21. Server-Side Template Injection

## Detection expressions

|   |   |
|---|---|
|Engine family|Example probe|
|Jinja2 / Twig-like|`{{7*7}}`|
|Freemarker-like|`${7*7}`|
|ERB-like|`<%= 7*7 %>`|
|Pug-like|`#{7*7}`|

## Methodology

1. Find where user input is rendered into a template.
    
2. Submit arithmetic probes.
    
3. Compare encoded and raw output.
    
4. Identify the engine from syntax and errors.
    
5. Confirm only with a harmless expression.
    
6. Review whether sandbox escape or code execution is theoretically possible.
    
7. Do not proceed to command execution unless explicitly authorized.
    

### Remediation

- Pass user input as data, not template source
    
- Do not dynamically construct template strings
    
- Use sandboxing as defense in depth
    
- Remove dangerous helpers and object access
    
- Patch the template engine
    

---

# 22. Session Hijacking and Unvalidated Redirects

## Session risk factors

- HTTP instead of HTTPS
    
- Missing `Secure` or `HttpOnly`
    
- XSS
    
- Session IDs in URLs
    
- No rotation after login
    
- Tokens accepted after logout
    
- Predictable or weak tokens
    

## Redirect testing

```
https://target.example/redirect?url=https://example.org/
```

Test whether the destination is:

- Arbitrary
    
- Scheme-relative
    
- Encoded
    
- Nested in another URL
    
- Restricted only by weak substring matching
    

### Remediation

- Map short destination identifiers to server-side URLs
    
- Allowlist scheme, host, and port
    
- Reject user-info and ambiguous URL syntax
    
- Show an interstitial warning when leaving the domain
    

---

# 23. Insecure Deserialization

## Warning signs

- Long opaque cookies
    
- Base64-encoded object data
    
- Java serialization markers
    
- PHP serialized strings
    
- Framework-specific object structures
    
- Errors mentioning `unserialize`, object streams, or gadget classes
    

## Tools mentioned in the handbook

- `ysoserial` for Java proof generation
    
- Java Deserialization Scanner for Burp
    
- `PHPGGC` for PHP gadget-chain analysis
    

Use these only in an isolated lab or under explicit authorization.

## Prevention

- Prefer JSON with strict schemas
    
- Never deserialize untrusted native objects
    
- Sign and authenticate serialized data
    
- Allowlist permitted classes
    
- Remove known gadget chains
    
- Run the process with minimum privileges
    

---

# 24. Cross-Origin and CORS Testing

## Review headers

```
Origin: https://attacker.example
Access-Control-Allow-Origin: https://attacker.example
Access-Control-Allow-Credentials: true
```

Test:

- Arbitrary origin reflection
    
- `null` origin
    
- Subdomain trust
    
- Suffix or substring validation
    
- Credentials enabled with broad origins
    
- Preflight and non-preflight differences
    

### Secure pattern

- Exact origin allowlist
    
- No wildcard with credentials
    
- Minimal permitted methods and headers
    
- `Vary: Origin`
    
- Server-side authorization regardless of CORS
    

---

# 25. Security Misconfiguration, Insecure Design, and Outdated Components

Review:

- Default accounts
    
- Debug mode
    
- Stack traces
    
- Directory listing
    
- Backup and export files
    
- Exposed admin panels
    
- Public Swagger or GraphQL consoles
    
- Weak TLS
    
- Missing security headers
    
- Overly broad CORS
    
- Unused methods
    
- Old API versions
    
- Exposed source code
    
- Outdated plugins, themes, libraries, and frameworks
    

Remember:

- **Security misconfiguration** is an unsafe deployment or setting.
    
- **Insecure design** is a missing or flawed security control in the workflow itself.
    
- **Outdated components** create known-vulnerability exposure and dependency risk.
    

---

# 26. Authentication, Password Reset, and Business Logic

## Authentication checklist

- Username enumeration
    
- Password policy
    
- Rate limiting
    
- Account lockout
    
- MFA bypass
    
- Session rotation
    
- Remember-me behavior
    
- Alternate login endpoints
    
- OAuth state and redirect validation
    
- Default credentials
    
- Password reset token entropy
    
- Reset-token expiry and single use
    
- Host-header influence on reset links
    

## Business-logic checklist

- Can steps be skipped?
    
- Can quantities be negative?
    
- Can coupons be reused or stacked?
    
- Can price or currency fields be changed?
    
- Can a user act on another account?
    
- Can a transaction be replayed?
    
- Can state transitions occur out of order?
    
- Does the server trust client-calculated totals?
    
- Are controls enforced only in the UI?
    

---

# 27. Race Conditions

## Testing workflow

1. Capture the state-changing request.
    
2. Establish the expected single-request result.
    
3. Send requests sequentially.
    
4. Send the same requests in parallel.
    
5. Compare balances, inventory, coupon usage, or object counts.
    
6. Stop if the system becomes unstable.
    

Targets include:

- Coupon redemption
    
- Balance transfer
    
- Password reset
    
- Invitation acceptance
    
- Inventory purchase
    
- File processing
    
- One-time action tokens
    

### Remediation

- Atomic database transactions
    
- Unique constraints
    
- Row-level locking
    
- Idempotency keys
    
- Server-side state checks inside the transaction
    

---

# 28. API Pentesting

## 28.1 API types

|   |   |   |
|---|---|---|
|Type|Format|Key testing focus|
|REST|JSON/XML|Methods, BOLA, mass assignment, versions|
|SOAP|XML|XXE, schema flaws, WS-* configuration|
|GraphQL|JSON|Introspection, authorization, batching, query depth|

## 28.2 Endpoint discovery

```
ffuf -u https://api.target.example/FUZZ \
  -w /usr/share/seclists/Discovery/Web-Content/api/api-endpoints.txt \
  -mc 200,201,204,400,401,403

waybackurls target.example | grep -i 'api\|/v1/\|/v2/'
gau target.example | grep -i 'api\|/v1/\|/v2/'

curl https://api.target.example/swagger.json -o swagger.json
curl https://api.target.example/openapi.json -o openapi.json
```

Common paths:

```
/swagger
/swagger-ui/
/swagger.json
/openapi.json
/api-docs
/redoc
/graphql
/graphiql
/api/health
/api/status
/api/internal/
/api/debug/
/v1/
/v2/
/beta/
/legacy/
```

## 28.3 Request templates

```
# GET
curl -X GET https://api.target.example/v1/users/123 \
  -H "Authorization: Bearer <TOKEN>"

# POST JSON
curl -X POST https://api.target.example/v1/users \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"username":"tester","email":"tester@example.org"}'

# OPTIONS
curl -X OPTIONS https://api.target.example/v1/users -i

# Test unauthenticated behavior
curl https://api.target.example/v1/users
```

## 28.4 OWASP API Security Top 10 (2023)

|   |   |   |
|---|---|---|
|ID|Category|Rapid test|
|API1|BOLA|Change object IDs across users|
|API2|Broken Authentication|Missing, expired, or modified token|
|API3|Broken Object Property Level Authorization|Over-fetching and mass assignment|
|API4|Unrestricted Resource Consumption|Rate, size, depth, and batch limits|
|API5|Broken Function Level Authorization|Call admin functions as a normal user|
|API6|Sensitive Business Flows|Automate actions intended to be limited|
|API7|SSRF|Supply internal or controlled URLs|
|API8|Security Misconfiguration|CORS, debug, TLS, defaults, verbose errors|
|API9|Improper Inventory Management|Old, beta, test, and undocumented versions|
|API10|Unsafe Consumption of APIs|Untrusted third-party response handling|

## 28.5 Seven-phase API workflow

1. Reconnaissance
    
2. Endpoint enumeration
    
3. Authentication testing
    
4. Authorization testing
    
5. Business logic and input validation
    
6. Information disclosure review
    
7. Reporting and OWASP mapping
    

## 28.6 Hidden methods and unused endpoints

For every discovered endpoint:

```
curl -X OPTIONS https://api.target.example/v1/resource/1 -i
```

Test whether `GET`, `PATCH`, `PUT`, or `DELETE` enforce different authorization.

## 28.7 Mass assignment

Cross-reference read and write models.

Example:

```
{
  "displayName": "tester",
  "role": "admin",
  "isAdmin": true,
  "credit": 99999
}
```

Use a harmless hidden field in production-like environments. Validate whether:

- The server accepts the field
    
- The field changes state
    
- An error reveals the expected type
    
- Privileged fields can be modified
    

### Remediation

- Explicit allowlist of writable properties
    
- Separate DTOs for each operation
    
- Server-controlled privilege fields
    
- Schema validation
    
- Object-property authorization
    

## 28.8 GraphQL

Schema test:

```
curl -X POST https://api.target.example/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __schema { types { name } } }"}'
```

Review:

- Introspection exposure
    
- Per-field authorization
    
- Nested query depth
    
- Aliases and batching
    
- Excessive response data
    
- Mutation authorization
    
- Rate and complexity limits
    

---

# 29. Common Platforms

## 29.1 WordPress

Identify:

- `/wp-admin/`
    
- `/wp-login.php`
    
- `/wp-content/`
    
- `/wp-includes/`
    
- Generator tags
    
- REST API
    
- XML-RPC
    
- Themes and plugins
    
- Backup configuration files
    

```
wpscan --url https://target.example \
  --enumerate ap,at,cb,dbe
```

Options described in the handbook:

- `ap`: all plugins
    
- `at`: all themes
    
- `cb`: configuration backups
    
- `dbe`: database exports
    
- `vp`: vulnerable plugins
    
- `vt`: vulnerable themes
    
- `u`: users
    

Review:

- Outdated core, plugins, and themes
    
- Exposed backups
    
- REST user enumeration
    
- XML-RPC exposure
    
- File-editor access
    
- Unsafe upload permissions
    
- Default or weak credentials
    

## 29.2 Joomla

Review:

- Version
    
- Extensions and templates
    
- Configuration and backup files
    
- REST API
    
- Logs and debug mode
    
- CLI exposure
    
- Administrator access
    
- Known vulnerable extensions
    

## 29.3 Drupal

Review:

- Version
    
- Modules and themes
    
- Configuration files
    
- REST and GraphQL
    
- Users and content
    
- Backup and debug files
    
- Known Drupalgeddon-era exposure
    

```
droopescan scan drupal -u https://target.example/
```

## 29.4 Jenkins

Review:

- Version
    
- Authentication realm
    
- Anonymous access
    
- Script Console
    
- CLI
    
- Plugins
    
- Build jobs and pipelines
    
- Stored credentials
    
- Agents
    
- Webhooks
    
- Job parameters
    
- Workspace and build logs
    

High-risk conditions include:

- Anonymous administrative access
    
- Script Console access
    
- Secrets in build logs
    
- Overprivileged agents
    
- Pipeline definitions writable by untrusted users
    
- Unvalidated webhook inputs
    

---

# 30. Automated Scanners and Utilities

## Nikto

```
nikto -h https://target.example
nikto -h https://target.example -ssl
nikto -h https://target.example -Plugins <PLUGIN_NAME>
```

Use it to identify common misconfigurations and known web-server issues, then manually validate results.

## OWASP ZAP

Use for:

- Proxying browser traffic
    
- Automated scans
    
- Manual request review
    
- Forced browsing
    
- Fuzzing
    
- Report generation
    

## Nmap HTTP scripts

```
nmap --script='http-vuln*' target.example
```

## WhatWeb

```
whatweb https://target.example
```

## Uniscan

```
uniscan -u https://target.example/ -qd
```

The handbook describes it as testing for LFI, RFI, and RCE indicators.

### Scanner rule

A scanner finding is a hypothesis until manually verified. A clean scan does not prove the application is secure, especially for:

- Second-order vulnerabilities
    
- Business logic
    
- Authorization
    
- Race conditions
    
- Encrypted client-side state
    
- Multi-step workflows
    

---

# 31. WebSocket Testing

## Architecture

WebSockets maintain a long-lived bidirectional channel after an HTTP upgrade handshake.

## Review checklist

- Authentication at connection time
    
- Authorization for every message
    
- Session expiration after connection
    
- Origin validation
    
- Message schema validation
    
- Replay protection
    
- Rate and connection limits
    
- TLS (`wss://`)
    
- Object-level authorization
    
- Cross-Site WebSocket Hijacking
    
- Server behavior after role changes or logout
    

## Burp workflow

1. Capture the handshake in Proxy.
    
2. Review cookies, tokens, and `Origin`.
    
3. Open WebSockets history.
    
4. Modify a harmless message.
    
5. Replay as another user.
    
6. Change object IDs and action fields.
    
7. Test malformed and unexpected message types.
    
8. Observe whether the server trusts client-side fields.
    

---

# 32. Rapid Reporting Template

````
## Finding: [Concise vulnerability title]

**Severity:** Critical / High / Medium / Low / Informational  
**Affected component:** [Endpoint, parameter, feature]  
**Account required:** [None / user / admin / specific role]

### Summary
[What control failed and why it matters.]

### Reproduction
1. [Capture baseline request.]
2. [Modify one value.]
3. [Send request.]
4. [Observe response or side effect.]

### Evidence
```http
[Relevant request]
````

```
[Relevant response]
```

### Impact

[Confidentiality, integrity, availability, account, or business impact.]

### Root cause

[Missing authorization, unsafe query construction, unsafe parser, etc.]

### Remediation

[Specific engineering fix.]

### Cleanup

[Test objects/files/configuration removed.]

```

---

# 33. Certification Preparation Map

## Concepts to memorize

- Request/response anatomy
- Method semantics
- Status-code interpretation
- Cookie flags
- SOP versus CORS
- Burp modules and Intruder attack types
- SQLi types
- XSS types and contexts
- SSRF versus XXE
- LFI versus RFI
- Authentication versus authorization
- IDOR/BOLA versus BFLA
- Mass assignment
- JWT structure and claim validation
- OWASP API Security Top 10
- Race-condition prerequisites
- Scanner limitations

## Practical skills to rehearse

- Proxy browser traffic through Burp
- Scope a target
- Send a request to Repeater
- Compare responses from two users
- Discover content with ffuf/Gobuster
- Identify hidden parameters
- Test alternate HTTP methods
- Test authorization with two accounts
- Inspect and modify JSON/XML
- Locate Swagger/OpenAPI
- Analyze cookies and JWTs
- Build a minimal, non-destructive proof
- Write a clear finding with remediation

## Fast recall cues

| Symptom | First hypothesis |
|---|---|
| Different user's data after changing an ID | IDOR/BOLA |
| Extra JSON fields accepted | Mass assignment |
| `500` after quote or object injection | Injection/type failure |
| Five-second delay | Blind SQLi or command injection |
| Arithmetic evaluates in output | SSTI |
| Server fetches supplied URL | SSRF |
| XML entity returns file content | XXE |
| Payload executes later in another workflow | Second-order injection |
| Repeated parallel request creates duplicate benefit | Race condition |
| Regular user can call admin route | BFLA |
| Response contains fields hidden by UI | Excessive data exposure/property authorization |
| Arbitrary origin receives credentialed data | CORS misconfiguration |

---

# 34. Final Engagement Checklist

## Before testing

- [ ] Written authorization
- [ ] Scope confirmed
- [ ] Test accounts available
- [ ] Burp scope configured
- [ ] Logging and note-taking ready
- [ ] Request-rate limits agreed
- [ ] Backup/restore ownership confirmed

## During testing

- [ ] Baseline captured
- [ ] One variable changed at a time
- [ ] Two-user authorization testing performed
- [ ] Methods and content types reviewed
- [ ] Old/API/debug endpoints checked
- [ ] Business workflows reviewed
- [ ] Scanner results manually validated
- [ ] Destructive behavior avoided
- [ ] Evidence preserved

## Before delivery

- [ ] Findings reproduced
- [ ] False positives removed
- [ ] Severity tied to demonstrated impact
- [ ] Requests and responses sanitized
- [ ] Remediation is specific
- [ ] Test artifacts removed
- [ ] Retest criteria included
```