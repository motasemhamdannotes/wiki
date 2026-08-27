

[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)

# curl : Command Reference Notes

## 01 · Help & Verbosity

```bash
curl -h                 # short help
curl --help             # same as -h
curl --manual           # full man page

curl -v                 # verbose — shows request and response headers
curl -vv                # even more verbose — includes TLS handshake details
```

---

## 02 · Output & File Download

By default `curl` writes the response body to stdout. All three output methods below are equivalent ways to redirect to a file.

```bash
# Redirect stdout to a file with the shell
curl http://url/file > file

# Write to a named file with curl's own flag
curl -o file http://url/file
curl --output file http://url/file

# Write to a file using the remote filename (honours Content-Disposition)
curl -O http://url/file
curl --remote-name http://url/file

# Download and display only headers (HEAD request)
curl -I url
curl --head url

# Execute a remote script inline (pipe into bash)
bash <(curl -s http://url/myscript.sh)

# Silent mode — suppress progress meter and errors
curl -s http://url/endpoint
curl --silent http://url/endpoint

# Suppress output (useful with -w for timing/size checks only)
curl -s -o /dev/null http://url/endpoint

# Follow redirects
curl -L http://url/endpoint
curl --location http://url/endpoint
```

---

## 03 · Authentication

```bash
# HTTP Basic Authentication
curl --user username:password http://example.com/
curl -u username:password http://example.com/

# Prompt for password (avoids password in shell history)
curl -u username http://example.com/
```

---

## 04 · SSL / TLS

```bash
# Allow insecure connections (skip certificate verification)
# Use when connecting to servers with self-signed certificates
curl -k https://server_with_self_signed_cert/endpoint
curl --insecure https://server_with_self_signed_cert/endpoint

# Specify a CA bundle for certificate verification
curl --cacert /path/to/ca-bundle.crt https://example.com/

# Use a client certificate
curl --cert /path/to/client.crt --key /path/to/client.key https://example.com/
```

> **Security note:** `-k` / `--insecure` disables certificate validation entirely. Use only in controlled environments — never in production automation.

---

## 05 · HTTP Requests

```bash
# Specify the HTTP method explicitly
# -X, --request <METHOD>
curl -X GET    http://url/endpoint
curl -X POST   http://url/endpoint
curl -X PUT    http://url/endpoint
curl -X DELETE http://url/endpoint
curl -X PATCH  http://url/endpoint

# HEAD request (headers only)
curl -X HEAD http://url/endpoint
# or
curl -I http://url/endpoint
```

---

## 06 · HTTP Headers

```bash
# -H, --header <header> — pass one or more custom headers
curl -H 'Content-Type: application/json' http://url/endpoint

# Multiple headers
curl -H 'Accept: application/json' \
     -H 'Authorization: Bearer <TOKEN>' \
     http://url/endpoint

# Custom User-Agent (common for bypassing basic bot filters)
curl -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) \
  AppleWebKit/537.36 (KHTML, like Gecko) \
  Chrome/80.0.3987.163 Safari/537.36' \
  http://url/endpoint

# Send a cookie
curl -H 'Cookie: session=abc123' http://url/endpoint
# or
curl -b 'session=abc123' http://url/endpoint

# Save response headers to a file
curl -D headers.txt http://url/endpoint
```

---

## 07 · POST Data

```bash
# -d, --data <data>   — HTTP POST body (sets method to POST implicitly)
# Content-Type defaults to application/x-www-form-urlencoded

# Simple form data
curl -d 'username=admin&password=secret' http://url/login

# JSON body (must set Content-Type explicitly)
curl -d '{"key":"value"}' \
     -H 'Content-Type: application/json' \
     http://url/endpoint

# POST data from a file
curl -d @payload.json \
     -H 'Content-Type: application/json' \
     http://url/endpoint

# Multipart/form-data (file upload)
curl -F 'file=@/path/to/file.txt' http://url/upload
curl -F 'name=value' -F 'file=@/path/to/file.txt' http://url/upload
```

---

## 08 · Configuration Files

Rather than passing all flags on the command line (and exposing credentials in shell history), flags and their values can be stored in a config file. One option per line; long-form flags without the leading `--`:

```bash
curl -K file            # read config from a specific file
curl --config file      # same

# Default config file location (UNIX-like systems)
$HOME/.curlrc
```

**Example `~/.curlrc`:**

```
# Always be verbose
verbose

# Default headers
header = "Accept: application/json"
header = "User-Agent: myclient/1.0"

# Store credentials (readable only by the current user — chmod 600)
user = "username:password"
```

---

## 09 · Write-Out Parameters (`-w`)

The `-w` / `--write-out` flag prints formatted information to stdout after a transfer completes. It is most useful combined with `-s -o /dev/null` to suppress the response body and print only the metrics you care about.

```bash
# General syntax
curl -w '<FORMAT>' -s -o /dev/null http://url/endpoint

# Example: print HTTP response code only
curl -w '%{response_code}\n' -s -o /dev/null http://example.com

# Example: print total time in seconds
curl -w '%{time_total}\n' -s -o /dev/null http://example.com

# Example: print header size (bytes)
curl -w '%{size_header}\n' -s -o /dev/null http://google.com

# Example: multi-field timing breakdown (useful for performance profiling)
curl -w "DNS: %{time_namelookup}s\nConnect: %{time_connect}s\nTLS: %{time_appconnect}s\nTTFB: %{time_starttransfer}s\nTotal: %{time_total}s\n" \
  -s -o /dev/null https://example.com
```

### Full Write-Out Variable Reference

**Response content and codes:**

|Variable|Description|
|---|---|
|`%{content_type}`|The `Content-Type` of the response document|
|`%{response_code}`|HTTP response status code (e.g. `200`, `404`, `301`)|
|`%{http_connect}`|HTTP response code from the last proxy CONNECT response|
|`%{redirect_url}`|The URL a redirect would lead to (when not following with `-L`)|
|`%{url_effective}`|The final URL that was fetched (after redirects, if `-L` was used)|
|`%{filename_effective}`|The filename curl ultimately wrote to (used with `-O` or `-o`)|
|`%{ftp_entry_path}`|The initial path on the remote FTP server after login|

**Connection and IP info:**

|Variable|Description|
|---|---|
|`%{local_ip}`|Local IP address of the most recent connection (IPv4 or IPv6)|
|`%{local_port}`|Local port number of the most recent connection|
|`%{remote_ip}`|Remote IP address of the most recent connection (IPv4 or IPv6)|
|`%{remote_port}`|Remote port number of the most recent connection|
|`%{num_connects}`|Number of new TCP connections made during the transfer|
|`%{num_redirects}`|Number of redirects followed (requires `-L`)|

**Transfer sizes (in bytes):**

|Variable|Description|
|---|---|
|`%{size_download}`|Total bytes downloaded (body only)|
|`%{size_header}`|Total bytes of downloaded response headers|
|`%{size_request}`|Total bytes sent in the HTTP request|
|`%{size_upload}`|Total bytes uploaded|

**Transfer speeds (bytes/sec):**

|Variable|Description|
|---|---|
|`%{speed_download}`|Average download speed for the entire transfer|
|`%{speed_upload}`|Average upload speed for the entire transfer|

**Timing (all in seconds, with millisecond resolution):**

|Variable|Description|Notes|
|---|---|---|
|`%{time_namelookup}`|Time from start until DNS resolution completed|High values → slow DNS or misconfigured resolver|
|`%{time_connect}`|Time from start until TCP connect completed|Includes `time_namelookup`|
|`%{time_appconnect}`|Time from start until SSL/TLS handshake completed|Includes `time_connect`; 0 for plain HTTP|
|`%{time_pretransfer}`|Time from start until the first byte was about to be sent|Includes all protocol negotiation|
|`%{time_starttransfer}`|Time from start until first response byte received (TTFB)|Includes server processing time|
|`%{time_redirect}`|Total time for all redirect steps (name lookup → connect → transfer)|0 if no redirects|
|`%{time_total}`|Total time for the complete operation|Displayed with millisecond resolution|

**SSL:**

|Variable|Description|
|---|---|
|`%{ssl_verify_result}`|Result of SSL peer certificate verification — `0` = success, non-zero = failure code|

---

### Practical Write-Out One-Liners

```bash
# Check if an endpoint is up (print status code only)
curl -w '%{response_code}' -s -o /dev/null http://example.com

# Full timing breakdown for performance diagnosis
curl -w "namelookup: %{time_namelookup}s\nconnect: %{time_connect}s\nappconnect: %{time_appconnect}s\npretransfer: %{time_pretransfer}s\nredirect: %{time_redirect}s\nstarttransfer: %{time_starttransfer}s\ntotal: %{time_total}s\n" \
  -s -o /dev/null https://example.com

# Check response code + redirect destination without following
curl -w 'Status: %{response_code}\nRedirects to: %{redirect_url}\n' \
  -s -o /dev/null http://example.com

# Verify TLS is working (ssl_verify_result = 0 means valid cert)
curl -w 'TLS verify result: %{ssl_verify_result}\n' \
  -s -o /dev/null https://example.com

# Get download speed and size
curl -w 'Downloaded: %{size_download} bytes at %{speed_download} bytes/sec\n' \
  -s -o /dev/null https://example.com/largefile.zip

# Print effective URL (useful when following redirects with -L)
curl -w '%{url_effective}\n' -s -o /dev/null -L http://example.com
```

---

