

[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)

# 1. Core Concept : What Apache Tomcat Is

## Definition

**Apache Tomcat** is:

- A **Java-based web server**
- A **Servlet container**
- Used to host **Java web applications**

Tomcat implements:

- Java Servlet specification
- JavaServer Pages (JSP)
- WebSocket support

---
## Key Purpose

Tomcat allows:

- Running **Java web applications**
- Hosting **dynamic web content**
- Processing Java-based HTTP requests

Typical deployments include:

- Enterprise web applications
- Internal business dashboards
- Middleware APIs
- Authentication systems

---

# 2. Core Components of Tomcat

Understanding internal architecture is critical for:

- Security assessments
- Incident response
- Troubleshooting

---

## Catalina — Servlet Container

**Catalina** is:

- The core Tomcat engine
- Responsible for:
    - Servlet lifecycle
    - Request processing
    - Session management

Key functions:

- Load servlets
- Map URLs
- Handle application logic

---

## Coyote — HTTP Connector

**Coyote**:

- Handles **incoming HTTP requests**
- Converts them into Java servlet requests

Typical behavior:

Client → HTTP Request → Coyote → Catalina → Response

---

## Jasper — JSP Engine

**Jasper**:

- Compiles JSP files into Java servlets
- Executes dynamic page logic

Workflow:

JSP → Compiled → Java Servlet → Executed

---

# 3. Tomcat Directory Structure

Understanding directory layout is essential for:

- Security auditing
- Web shell detection
- Persistence detection

---

## Base Directory Layout

Typical path:

/opt/tomcat/

---

## Critical Directories

### bin/

Contains:

- Startup scripts
- Shutdown scripts

Examples:

startup.sh  
shutdown.sh  
catalina.sh

Security relevance:

- Script modification indicates persistence

---

### conf/

Contains:

- Configuration files

Important files:

server.xml  
web.xml  
tomcat-users.xml  
context.xml

Security relevance:

- Authentication settings
- Port configurations
- Role assignments

---

### logs/

Contains:

- Server logs
- Access logs

Typical files:

catalina.out  
localhost.log  
access_log.*

Security relevance:

Primary forensic evidence source.

---

### webapps/

Contains:

- Deployed applications

Example:

/opt/tomcat/webapps/ROOT/

Security relevance:

Common location for:

- Web shells
- Backdoors
- Malicious WAR files

---

### work/

Contains:

- Temporary compiled files
- JSP compilation output

Security relevance:

- Contains generated servlet code
- Useful during forensic review

---

### temp/

Contains:

- Temporary runtime files

Security relevance:

Potential staging area for payloads.

---

# 4. Default Ports and Services

Understanding ports is critical for:

- Network scanning
- Service discovery
- Firewall auditing

---

## Default Ports

|Port|Protocol|Purpose|
|---|---|---|
|8080|HTTP|Web access|
|8443|HTTPS|Secure web access|
|8009|AJP|Apache JServ Protocol|
|8005|Shutdown|Server shutdown|

---

## Security Implications

### Port 8009 — AJP

Commonly abused in:

- Ghostcat vulnerability (AJP exploitation)

---

### Port 8005 — Shutdown Port

Risk:

- Unauthorized shutdown attempts

---

# 5. Tomcat Deployment Model

Understanding deployment is necessary for:

- Web exploitation
- Malware persistence detection

---

## WAR File Deployment

Applications packaged as:

.war (Web Application Archive)

Deployment method:

- Place `.war` file inside:

/opt/tomcat/webapps/

Tomcat automatically:

- Extracts WAR
- Deploys application

---

## Security Relevance

Malicious actors may:

- Upload WAR shells
- Deploy persistence payloads

---

# 6. Starting and Stopping Tomcat

## Start Server

./startup.sh

---

## Stop Server

./shutdown.sh

---

## Using catalina.sh

Alternative control:

./catalina.sh start

./catalina.sh stop

---

## Service-Based Management

Some systems use:

sudo systemctl start tomcat

sudo systemctl stop tomcat

sudo systemctl status tomcat

---

# 7. Configuration Files

These files define:

- Security controls
- Network behavior
- Application access

---

## server.xml

Controls:

- Connectors
- Ports
- Threads

Example concept:

<Connector port="8080" protocol="HTTP/1.1"/>

Security relevance:

- Port exposure control
- SSL configuration

---

## web.xml

Controls:

- Default servlet behavior
- MIME types
- Security constraints

Security relevance:

Defines:

- Access policies
- Session handling

---

## tomcat-users.xml

Defines:

- Users
- Roles

Example structure:

<user username="admin" password="password" roles="manager-gui"/>

Security risk:

- Weak credentials
- Default accounts

---

## context.xml

Controls:

- Application-level configuration

Security relevance:

- Database connections
- Resource definitions

---

# 8. Accessing Tomcat Web Interface

Typical access URL:

http://localhost:8080

---

## Manager Interface

Common path:

http://localhost:8080/manager/html

Purpose:

- Deploy applications
- Monitor services

Security risk:

If exposed publicly:

- Remote WAR upload possible

---

## Host Manager

Path:

http://localhost:8080/host-manager/html

Purpose:

- Manage virtual hosts

Security risk:

- Virtual host manipulation

---

# 9. Logging System

Logs are critical for:

- Incident response
- Threat detection
- Troubleshooting

---

## Log Directory

/opt/tomcat/logs/

---

## Key Log Files

### catalina.out

Contains:

- Startup logs
- Application output

Use cases:

- Error investigation
- Runtime debugging

---

### localhost.log

Contains:

- Application-specific logs

Use cases:

- Web attack tracing

---

### access_log.*

Contains:

- HTTP request logs

Example entry:

192.168.1.10 - - [10/Jan/2024:13:55:36] "GET /index.jsp HTTP/1.1" 200

Security relevance:

Primary detection source for:

- Web attacks
- Enumeration
- Exploitation attempts

---

# 10. Security-Relevant Attack Surface

Understanding attack vectors is essential for:

- Blue team detection
- Red team simulation

---

## Common Attack Vectors

### Default Credentials

Target file:

tomcat-users.xml

Typical risk:

admin:admin  
tomcat:tomcat

---

### WAR Upload Exploitation

Path:

/manager/html

Attack chain:

Login → Upload WAR → Execute shell

---

### AJP Exploitation

Port:

8009

Used in:

- Ghostcat exploitation

---

### Directory Traversal

Targets:

webapps/

Potential outcome:

- Sensitive file exposure

---

# 11. Detection Opportunities

## Suspicious Indicators

Look for:

- Unexpected WAR files
- Unknown directories in webapps
- Abnormal login attempts
- Unauthorized deployments

---

## Suspicious Files

Common attacker artifacts:

shell.war  
cmd.jsp  
backdoor.jsp

Locations:

/opt/tomcat/webapps/

---

## Suspicious Logs

Look for:

POST /manager/html  
PUT requests  
Unexpected WAR deployments  
Repeated authentication failures

---

# 12. Blue Team Monitoring Focus

Critical monitoring areas:

---

## File Integrity Monitoring

Monitor:

/opt/tomcat/webapps/  
/opt/tomcat/conf/

Watch for:

- Unauthorized file changes
- New deployments

---

## Log Monitoring

Monitor:

/opt/tomcat/logs/

Key indicators:

- Repeated login attempts
- Suspicious URL access
- Exploit signatures

---

## Network Monitoring

Watch traffic to:

|Port|Risk|
|---|---|
|8080|Web attacks|
|8009|AJP exploitation|
|8005|Shutdown abuse|

---

# 13. Hardening Concepts

Security controls should include:

---

## Disable Default Accounts

Modify:

tomcat-users.xml

Remove:

Default admin users

---

## Restrict Manager Access

Allow:

Internal IP only

Block:

Public Internet access

---

## Disable Unused Ports

Especially:

8009 (AJP)  
8005 (Shutdown)

---

## Use HTTPS

Enable:

Port 8443  
SSL/TLS encryption

---

# 14. Analyst Operational Relevance

Understanding Tomcat supports:

- Web server incident response
- Java application debugging
- Webshell detection
- Persistence analysis

---

## SOC Workflow Example

Typical scenario:

Alert → Suspicious POST request  
↓  
Check access_log  
↓  
Identify WAR upload  
↓  
Investigate webapps directory  
↓  
Remove malicious payload

---

# 15. Red Team Relevance

Tomcat commonly used in:

- Privilege escalation labs
- Web shell deployment exercises
- Persistence techniques

Typical exploitation:

Upload WAR → Execute JSP shell

---

# 16. Critical File Locations Summary

|Path|Purpose|
|---|---|
|`/opt/tomcat/bin/`|Server control scripts|
|`/opt/tomcat/conf/`|Configuration files|
|`/opt/tomcat/logs/`|Logs|
|`/opt/tomcat/webapps/`|Applications|
|`/opt/tomcat/work/`|Compiled JSP files|
|`/opt/tomcat/temp/`|Temporary data|

---

# 17. Essential Command Reference

## Service Control

./startup.sh  
./shutdown.sh  
./catalina.sh start  
./catalina.sh stop

---

## System Service Control

sudo systemctl start tomcat  
sudo systemctl stop tomcat  
sudo systemctl status tomcat

---

## Directory Navigation

cd /opt/tomcat/  
ls webapps/  
ls logs/

---

# What the Host Manager Is

## Definition

**Tomcat Host Manager** is:

- A **web-based administration interface**
- Used to manage **virtual hosts** inside Apache Tomcat
- Accessible via HTTP browser interface

Primary URL path:

http://<target>:8080/host-manager/html

---

## Purpose

Host Manager allows:

- Creating virtual hosts
- Deleting virtual hosts
- Deploying applications per host
- Managing web application directories

---

## Security Relevance

Host Manager exposure:

- Enables infrastructure modification
- Allows remote virtual host creation
- May enable persistence and lateral movement

---

# 2. Virtual Host Fundamentals

## What Is a Virtual Host

A **virtual host** allows:

- Multiple domains on a single Tomcat instance
- Logical separation of web applications

Example:

example1.local → Host A  
example2.local → Host B

Each host:

- Has its own application directory
- Uses its own configuration

---

## Default Virtual Host

Default host typically:

localhost

Default application directory:

/opt/tomcat/webapps/

---

## Custom Virtual Hosts

New hosts create:

/opt/tomcat/webapps/<hostname>/

Example:

/opt/tomcat/webapps/test.local/

---

# 3. Access Requirements

## Authentication Roles

Host Manager requires specific roles defined in:

/opt/tomcat/conf/tomcat-users.xml

Required role:

admin-gui

---

## Example User Configuration

<user username="admin" password="password" roles="admin-gui"/>

---

## Security Risk

Weak credentials in:

tomcat-users.xml

Lead to:

- Full administrative access
- Remote host manipulation

---

# 4. Accessing Host Manager Interface

## URL Path

http://<target>:8080/host-manager/html

---

## Typical Workflow

1. Navigate to interface
2. Authenticate
3. Manage virtual hosts

---

## Security Implications

If exposed publicly:

Attackers may:

- Create new hosts
- Deploy applications
- Establish persistence

---

# 5. Host Creation

## Purpose

Create new virtual host instance.

---

## Required Parameters

Typical host creation fields:

- Host name
- Application base directory
- Auto deployment flag
- XML validation settings

---

## Host Directory Creation

Example:

Creating host:

test.local

Creates:

/opt/tomcat/webapps/test.local/

---

## Security Relevance

Attackers may:

- Create hidden hosts
- Store malicious applications

---

# 6. Host Deletion

## Purpose

Remove virtual host from system.

---

## Security Implication

Attackers may:

- Delete legitimate hosts
- Disrupt service availability

This behavior resembles:

Service disruption attack

---

# 7. Host Listing

## Purpose

Display all configured hosts.

---

## Analyst Use Case

Useful for:

- Enumerating deployed hosts
- Identifying suspicious entries

---

## Security Relevance

Unexpected hosts may indicate:

- Persistence
- Unauthorized deployment

---

# 8. Application Deployment via Host Manager

## Deployment Workflow

Typical deployment:

1. Select host
2. Upload WAR file
3. Deploy application

---

## Deployment Location

WAR files deployed into:

/opt/tomcat/webapps/<hostname>/

---

## Security Risk

Common attacker behavior:

Upload malicious WAR → Execute shell

---

## Suspicious Artifacts

Look for:

shell.war  
cmd.jsp  
reverse.jsp

---

# 9. Directory Structure Changes

Host creation modifies:

/opt/tomcat/webapps/

New directory example:

/opt/tomcat/webapps/evil.local/

---

## Detection Indicator

Unexpected directories:

Unknown host folders  
Unexpected application paths

---

# 10. Logging Behavior

Host operations recorded in:

/opt/tomcat/logs/

Important logs:

catalina.out  
localhost_access_log.*

---

## Suspicious Log Entries

Look for:

POST /host-manager/html  
Host creation requests  
WAR uploads  
Authentication attempts

---

## Example Access Log Entry

192.168.1.20 - - [10/Jan/2024:13:55:36] "POST /host-manager/html HTTP/1.1" 200

---

# 11. Attack Surface Analysis

## High-Risk Exposure

Public exposure of:

/host-manager/html

Creates:

Administrative attack surface

---

## Typical Attack Chain

Discover Tomcat  
↓  
Brute-force credentials  
↓  
Access Host Manager  
↓  
Create virtual host  
↓  
Deploy WAR payload  
↓  
Establish persistence

---

## Attack Goals

Attackers may:

- Deploy web shells
- Create hidden environments
- Maintain persistence

---

# 12. Detection Opportunities

## File-Based Indicators

Monitor:

/opt/tomcat/webapps/

Look for:

New host directories  
Unexpected WAR files  
Unknown JSP files

---

## Authentication Indicators

Look for:

Repeated login attempts  
Failed authentication  
New admin access

---

## Network Indicators

Monitor requests to:

/host-manager/html

Suspicious behaviors:

POST requests  
Unauthorized logins  
Repeated connection attempts

---

# 13. Blue Team Monitoring Focus

## Directory Monitoring

Critical directories:

/opt/tomcat/webapps/  
/opt/tomcat/conf/

Watch for:

Unauthorized host creation  
Unexpected directory changes

---

## Log Monitoring

Monitor:

/opt/tomcat/logs/

Key events:

Host creation logs  
WAR deployment activity  
Authentication attempts

---

## Credential Monitoring

Audit:

tomcat-users.xml

Look for:

Weak passwords  
Default credentials  
Unauthorized users

---

# 14. Hardening Considerations

## Restrict Access to Host Manager

Allow:

Internal networks only

Block:

External Internet access

---

## Use Strong Authentication

Modify:

/opt/tomcat/conf/tomcat-users.xml

Avoid:

Default credentials  
Weak passwords

---

## Disable Unused Interfaces

If Host Manager not required:

Remove access roles  
Disable feature

---

## Apply Role-Based Access Control

Ensure:

Minimal privilege roles

Assigned only to:

Trusted administrators

---

# 15. Incident Response Use Cases

## Suspicious WAR Deployment

Workflow:

Alert → Suspicious POST  
↓  
Check access logs  
↓  
Identify deployment  
↓  
Inspect webapps directory  
↓  
Remove malicious host

---

## Unauthorized Host Creation

Detection workflow:

New directory detected  
↓  
Verify configuration  
↓  
Check authentication logs  
↓  
Remove unauthorized host

---

# 16. Red Team Operational Relevance

Host Manager frequently used for:

- Persistence deployment
- Web shell installation
- Infrastructure manipulation

---

## Typical Red Team Workflow

Gain credentials  
↓  
Access /host-manager/html  
↓  
Create host  
↓  
Upload WAR payload  
↓  
Execute reverse shell

---

# 17. Critical Files and Locations

|Path|Purpose|
|---|---|
|`/opt/tomcat/conf/tomcat-users.xml`|User authentication|
|`/opt/tomcat/webapps/`|Host directories|
|`/opt/tomcat/logs/`|Logging data|
|`/opt/tomcat/conf/server.xml`|Virtual host definitions|

---

# 18. Essential Operational Commands

## Directory Monitoring

ls /opt/tomcat/webapps/

---

## Log Review

cat /opt/tomcat/logs/catalina.out

tail -f /opt/tomcat/logs/localhost_access_log.*

---

## Configuration Review

cat /opt/tomcat/conf/tomcat-users.xml

---

## Search for Suspicious Files

find /opt/tomcat/webapps/ -name "*.war"

find /opt/tomcat/webapps/ -name "*.jsp"

## Apache Tomcat — Manager App How-To

The **Tomcat Manager** is a built-in web application installed by default at context path `/manager`. It enables runtime management of deployed web applications **without restarting the entire server** — a critical capability in production environments.

### Core Capabilities

- Deploy a new web application from an uploaded WAR file
- Deploy a new web application from the server filesystem
- List currently deployed applications and active sessions
- Reload an existing application to reflect code or config changes in `/WEB-INF/classes` or `/WEB-INF/lib`
- List OS and JVM property values
- List available global JNDI resources
- Start a stopped application
- Stop a running application without undeploying it
- Undeploy an application and optionally remove its document base

### Three Interfaces Available

|Interface|URL Path|Best For|
|---|---|---|
|**HTML (GUI)**|`/manager/html`|Browser-based human administration|
|**Text (Script)**|`/manager/text/{command}`|Shell scripts, automation, curl|
|**Ant Tasks**|N/A — build.xml|CI/CD build pipeline integration|

### Adding Manager to a New Virtual Host

```xml
<!-- Place in: $CATALINA_BASE/conf/[enginename]/[hostname]/manager.xml -->
<Context privileged="true" antiResourceLocking="false"
         docBase="${catalina.home}/../tomcat9-admin/manager">
  <Valve className="org.apache.catalina.valves.RemoteAddrValve"
         allow="127\.0\.0\.1" />
</Context>
```

> 💡 **Note:** If Tomcat is configured for multiple virtual hosts, a separate Manager instance is needed for each host.

---

## 02 · Configuring Manager Application Access

### Why Access is Disabled by Default

Tomcat ships with Manager access **completely disabled** by default. No user in the default `$CATALINA_BASE/conf/tomcat-users.xml` is assigned a manager role. This prevents unauthorized remote management.

### Available Manager Roles

|Role|Access Level|
|---|---|
|`manager-gui`|HTML interface only|
|`manager-status`|"Server Status" page only|
|`manager-script`|Text (plain) interface + Server Status page|
|`manager-jmx`|JMX proxy interface + Server Status page|

> ⚠️ **Security Warning:** The HTML interface is protected against **CSRF attacks**. The text and JMX interfaces are **NOT protected against CSRF**. Follow these rules:
> 
> - If you use a browser to access the text or JMX interface, **close all browser windows** after use to terminate the session
> - **Never grant** `manager-script` or `manager-jmx` roles to a user who also has `manager-gui`
> - The JMX proxy is effectively a **low-level root-like administrative interface** — treat it accordingly

### Configuring Users — tomcat-users.xml

The default realm (`UserDatabaseRealm` + `MemoryUserDatabase`) reads from `$CATALINA_BASE/conf/tomcat-users.xml`.

```xml
<!-- Add manager-script role to an existing user -->
<user username="craigmcc" password="secret" roles="standard,manager-script" />

<!-- Create a new dedicated manager user -->
<user username="tomcat-admin" password="Str0ngP@ss!" roles="manager-gui,manager-script" />

<!-- Minimal: script-only access for automation -->
<user username="deploy-bot" password="Bot$ecret!" roles="manager-script" />
```

### Configuring Users — Other Realm Types

|Realm Type|How to Add Role|
|---|---|
|`UserDatabaseRealm` / `MemoryRealm`|Edit `$CATALINA_BASE/conf/tomcat-users.xml` as above|
|`DataSourceRealm` / `JDBCRealm`|Add `manager-script` role via SQL in your database|
|`JNDIRealm`|Add `manager-script` role to user entries in your LDAP directory|

### Restricting Access by IP Address

```xml
<!-- Restrict Manager to localhost only (recommended for production) -->
<Context privileged="true">
  <Valve className="org.apache.catalina.valves.RemoteAddrValve"
         allow="127\.0\.0\.1"/>
</Context>

<!-- Allow multiple trusted IP addresses -->
<Context privileged="true">
  <Valve className="org.apache.catalina.valves.RemoteAddrValve"
         allow="127\.0\.0\.1|10\.0\.0\.5|192\.168\.1\.100"/>
</Context>
```

> 💡 **Analyst Note:** The first authentication attempt to any Manager command triggers HTTP Basic Auth. The username and password must match a valid entry in the configured realm with the appropriate `manager-xxx` role.

---

## 03 · HTML User-Friendly Interface

```
http://{host}:{port}/manager/html
```

- Requires the **`manager-gui`** role
- Protected against **CSRF** via random per-session tokens embedded in all page links
- If the CSRF token expires, navigate back to the main page or the _List Applications_ page to refresh it
- Full documentation available at the HTML Manager how-to guide

---

## 04 · Text Interface — Supported Manager Commands

### Command URI Structure

All text-interface commands follow this pattern:

```
http://{host}:{port}/manager/text/{command}?{parameters}
```

- Most commands use **HTTP GET**
- The `/deploy` (WAR upload) command uses **HTTP PUT**
- Responses are plain text (`text/plain`) — first line is always `OK` or `FAIL`

### Authentication with curl

```bash
# Basic auth for all curl commands
curl -u tomcat-admin:Str0ngP@ss! "http://localhost:8080/manager/text/list"

# Alternatively, store credentials in .netrc
echo "machine localhost login tomcat-admin password Str0ngP@ss!" >> ~/.netrc
chmod 600 ~/.netrc
curl --netrc "http://localhost:8080/manager/text/list"
```

---

### Common Parameters

Most commands accept one or more of these parameters:

|Parameter|Description|
|---|---|
|`path`|Context path of the webapp (must start with `/`). Use `/` for ROOT. Cannot target the Manager app itself.|
|`version`|Version label used with parallel deployment. Must be combined with `path`. Ignored if `path` is absent.|
|`war`|URL of a WAR file, unpacked directory, or context `.xml` file. Accepted formats: `file:/absolute/path/to/dir`, `file:/absolute/path/to/app.war`, `file:/absolute/path/to/context.xml`, `directory` (relative to appBase), `webapp.war` (relative to appBase)|

---

### Deploy a New WAR Remotely (HTTP PUT)

Uploads a WAR file directly from the client machine and installs it on the server.

```bash
# Deploy WAR via HTTP PUT — basic
curl -u admin:pass -T /local/path/myapp.war \
  "http://localhost:8080/manager/text/deploy?path=/myapp"

# Deploy with update flag (undeploys existing app first)
curl -u admin:pass -T /local/path/myapp.war \
  "http://localhost:8080/manager/text/deploy?path=/myapp&update=true"

# Deploy with a tag for later redeployment
curl -u admin:pass -T /local/path/myapp.war \
  "http://localhost:8080/manager/text/deploy?path=/myapp&tag=v1.2.0"

# Deploy WAR with a specific Context config file
curl -u admin:pass -T /local/path/myapp.war \
  "http://localhost:8080/manager/text/deploy?path=/myapp&config=file:/etc/tomcat/context.xml"
```

**URL Parameters:**

|Parameter|Default|Description|
|---|---|---|
|`update`|`false`|If `true`, undeploys the existing app at that path before deploying|
|`tag`|(none)|Associates a tag label with the deployment for later reuse|
|`config`|(none)|Absolute URL to a Context `.xml` file (`file:/path/to/context.xml`)|

**Expected Responses:**

```
OK - Deployed application at context path /myapp
FAIL - Application already exists at path /myapp
FAIL - Encountered exception [check Tomcat logs]
```

> ⚠️ **Note:** This is the logical opposite of `/undeploy`. The WAR is installed into the `appBase` directory of the virtual host.

---

### Deploy from a Local Path (HTTP GET)

Deploys a webapp already present on the Tomcat server's filesystem.

#### Deploy a Directory or WAR by URL

```bash
# Deploy an unpacked directory at a specific path
curl -u admin:pass \
  "http://localhost:8080/manager/text/deploy?path=/footoo&war=file:/path/to/foo"

# Deploy a WAR file — path defaults to the WAR name without extension
curl -u admin:pass \
  "http://localhost:8080/manager/text/deploy?war=file:/path/to/bar.war"
# Result: deployed at context path /bar
```

#### Deploy from the Host appBase

```bash
# Deploy a sub-directory named 'foo' from the appBase (context path = /foo)
curl -u admin:pass \
  "http://localhost:8080/manager/text/deploy?war=foo"

# Deploy bar.war from the appBase (context path = /bar)
curl -u admin:pass \
  "http://localhost:8080/manager/text/deploy?war=bar.war"
```

---

### Deploy a Previously Tagged Webapp

Re-deploy a WAR that was previously deployed using a `tag` parameter. The WAR is stored in the Manager webapp's work directory.

```bash
# Redeploy previously tagged webapp
curl -u admin:pass \
  "http://localhost:8080/manager/text/deploy?path=/footoo&tag=footag"
```

> ⚠️ **Note:** Do not delete the Manager webapp's work directory — it stores tagged WARs needed for this command.

---

### Deploy via Context Configuration .xml File

Requires the Host's `deployXML` flag to be set to `true`.

```xml
<!-- Example context.xml file content -->
<Context path="/foobar" docBase="/path/to/application/foobar">
</Context>
```

```bash
# Deploy using a context .xml file only
curl -u admin:pass \
  "http://localhost:8080/manager/text/deploy?config=file:/path/to/context.xml"

# Deploy using a context .xml + external WAR file (WAR overrides docBase in xml)
curl -u admin:pass \
  "http://localhost:8080/manager/text/deploy?config=file:/path/context.xml&war=file:/path/bar.war"
```

---

### Deployment Notes & Error Reference

**Behaviour flags to know:**

|Condition|Behaviour|
|---|---|
|Host has `unpackWARs=true`|Deployed WAR is automatically unpacked into a directory in appBase|
|Host has `autoDeploy=true`|Context path **must match** directory/WAR name (without `.war`)|
|Host has `deployXML=false`|Cannot deploy via context `.xml` files; cannot deploy outside appBase|

**Common Deployment Error Messages:**

|Error|Cause & Fix|
|---|---|
|`Application already exists at path /foo`|Use `update=true` to replace, or undeploy first|
|`Document base does not exist or is not a readable directory`|Check the `war` parameter path and permissions|
|`Encountered exception`|Check Tomcat logs — likely a `web.xml` parse error or missing class|
|`Invalid application URL was specified`|URL must start with `file:` and WAR URLs must end in `.war`|
|`Invalid context path was specified`|Context path must start with `/`; use `/` for ROOT|
|`Context path must match the directory or WAR file name`|With `autoDeploy=true`, the path must match the filename|
|`Only web applications in the Host web application directory can be installed`|`deployXML=false` is blocking an out-of-appBase deployment|

---

### List Currently Deployed Applications

```bash
curl -u admin:pass "http://localhost:8080/manager/text/list"
```

**Example Response:**

```
OK - Listed applications for virtual host localhost
/webdav:running:0:webdav
/examples:running:0:examples
/manager:running:0:manager
/:running:0:ROOT
/test:running:0:test##2
/test:running:0:test##1
```

Response format per line: `{context_path}:{status}:{active_sessions}:{display_name}`

---

### Reload an Existing Application

Shuts down and restarts the application in-place — useful after updating classes in `/WEB-INF/classes` or JARs in `/WEB-INF/lib` without a full redeploy.

```bash
curl -u admin:pass "http://localhost:8080/manager/text/reload?path=/examples"
```

**Expected Response:**

```
OK - Reloaded application at context path /examples
```

> ⚠️ **Limitation:** Reload is **not supported** for apps deployed directly from a WAR file. Only works for apps deployed from an unpacked directory. For WAR-deployed apps, use `undeploy` then `deploy` (or `deploy?update=true`).

**Common Errors:**

|Error|Cause|
|---|---|
|`No context exists for path /foo`|No app deployed at that path|
|`No context path was specified`|`path` parameter is required|
|`Reload not supported on WAR deployed at path /foo`|App was deployed as a WAR file — use undeploy + redeploy instead|

---

### List OS and JVM Properties

```bash
curl -u admin:pass "http://localhost:8080/manager/text/serverinfo"
```

Returns: Tomcat version, OS name/version/architecture, JVM version and provider.

---

### Session Statistics

```bash
# View session stats for a specific application
curl -u admin:pass "http://localhost:8080/manager/text/sessions?path=/examples"
```

**Example Response:**

```
OK - Session information for application at context path /examples
Default maximum session inactive interval 30 minutes
<1 minutes: 1 sessions
1 - <2 minutes: 1 sessions
```

Shows the default session timeout and a breakdown of active sessions grouped by their remaining idle time in one-minute buckets.

---

### Expire Sessions

```bash
# Expire sessions idle for more than 15 minutes
curl -u admin:pass "http://localhost:8080/manager/text/expire?path=/examples&idle=15"

# Expire ALL active sessions immediately
curl -u admin:pass "http://localhost:8080/manager/text/expire?path=/examples&idle=0"
```

**Example Response:**

```
OK - Session information for application at context path /examples
Default maximum session inactive interval 30 minutes
1 - <2 minutes: 1 sessions
3 - <4 minutes: 1 sessions
>0 minutes: 2 sessions were expired
```

> 💡 `/sessions` and `/expire` are aliases for the same command. The presence of the `idle` parameter is what triggers expiration.

---

### Start an Existing Application

Restarts a previously stopped application and makes it available again. Useful when a dependency (e.g., a database) was temporarily unavailable and has recovered.

```bash
curl -u admin:pass "http://localhost:8080/manager/text/start?path=/examples"
```

**Expected Response:**

```
OK - Started application at context path /examples
```

**Common Errors:**

|Error|Cause|
|---|---|
|`No context exists for path /foo`|No app deployed at that path|
|`No context path was specified`|`path` parameter is required|
|`Encountered exception`|Check Tomcat logs|

---

### Stop an Existing Application

Makes the application unavailable without undeploying it. Requests to a stopped application return HTTP 404. The app shows as `stopped` in the list command.

```bash
curl -u admin:pass "http://localhost:8080/manager/text/stop?path=/examples"
```

**Expected Response:**

```
OK - Stopped application at context path /examples
```

> 💡 **Best Practice:** Use `stop` instead of `undeploy` when you want to temporarily take an app offline (e.g., during maintenance, database issues) and bring it back later without re-deploying.

---

### Undeploy an Existing Application

Gracefully shuts down and **permanently removes** the application. Also deletes the WAR file, unpacked directory, and XML context definition from the filesystem.

```bash
curl -u admin:pass "http://localhost:8080/manager/text/undeploy?path=/examples"
```

**Expected Response:**

```
OK - Undeployed application at context path /examples
```

> ⚠️ **WARNING — Destructive Operation:** This command **deletes** all application artifacts from `appBase` (typically `webapps/`), including:
> 
> - The `.WAR` file
> - The unpacked application directory
> - The XML Context definition in `$CATALINA_BASE/conf/[enginename]/[hostname]/`
> 
> If you only want to take the app offline temporarily, use `/stop` instead.

**Common Errors:**

|Error|Cause|
|---|---|
|`No context exists named /foo`|No app with that name is deployed|
|`No context path was specified`|`path` parameter is required|

---

### Find Memory Leaks

Attempts to identify web applications that caused memory leaks when stopped, reloaded, or undeployed.

```bash
# Basic leak detection
curl -u admin:pass "http://localhost:8080/manager/text/findleaks"

# Include a status line in the response
curl -u admin:pass "http://localhost:8080/manager/text/findleaks?statusLine=true"
```

**Example Response:**

```
/leaking-webapp
```

Each context path listed indicates an app where classes from previous runs are still loaded in memory. An app reloaded multiple times may appear multiple times.

> ⚠️ **Critical Warning:** This command **triggers a full garbage collection (GC)**. Never use it lightly in production — it can cause significant pauses. Results should always be **confirmed with a profiler** (JConsole, VisualVM, etc.).
> 
> Full GC can be unreliable from Java code. If the JVM uses `-XX:+DisableExplicitGC`, the GC may not run — verify with GC logging or JConsole.

---

### SSL/TLS Diagnostics

```bash
# List SSL/TLS cipher suites supported by each connector
curl -u admin:pass "http://localhost:8080/manager/text/sslConnectorCiphers"

# List SSL/TLS certificate chain for each connector
curl -u admin:pass "http://localhost:8080/manager/text/sslConnectorCerts"

# List SSL/TLS trusted certificates for each connector
curl -u admin:pass "http://localhost:8080/manager/text/sslConnectorTrustedCerts"

# Reload TLS configuration without restarting Tomcat
curl -u admin:pass "http://localhost:8080/manager/text/sslReload"

# Reload TLS config for a specific virtual host
curl -u admin:pass "http://localhost:8080/manager/text/sslReload?tlsHostName=www.example.com"
```

---

### Thread Dump

Generates a JVM thread dump — useful for diagnosing deadlocks and hung threads.

```bash
curl -u admin:pass "http://localhost:8080/manager/text/threaddump"
```

Output is the full thread dump of all JVM threads, including stack traces.

---

### VM Info

Returns detailed JVM diagnostics — similar to `jinfo` output.

```bash
curl -u admin:pass "http://localhost:8080/manager/text/vminfo"
```

Returns: JVM system properties, runtime flags, memory pool stats, and thread info.

---

### Save Configuration

Persists the current server configuration to `server.xml` (renames the existing file as a backup).

```bash
# Save entire server config
curl -u admin:pass "http://localhost:8080/manager/text/save"

# Save config for a specific deployed webapp to context.xml
curl -u admin:pass "http://localhost:8080/manager/text/save?path=/myapp"
```

> 💡 A `StoreConfig` MBean must be present for this command to work. Configure it via `StoreConfigLifecycleListener` in `server.xml`.

---

## 05 · Server Status

Provides runtime information about the server. Any `manager-xxx` role grants access.

```bash
# HTML format
curl -u admin:pass "http://localhost:8080/manager/status"

# HTML format — include deployed app details
curl -u admin:pass "http://localhost:8080/manager/status/all"

# XML format (machine-readable)
curl -u admin:pass "http://localhost:8080/manager/status?XML=true"

# XML format — include deployed app details
curl -u admin:pass "http://localhost:8080/manager/status/all?XML=true"
```

### Information Returned

**Server & JVM Section:**

- Tomcat version, JVM version, JVM provider
- OS name, version, and architecture

**Memory Section:**

- JVM heap memory usage (used, committed, max)
- Non-heap memory usage

**Connector Section (for each AJP and HTTP connector):**

- Max threads, min/max spare threads
- Current thread count and busy thread count
- Max and total processing time
- Request and error counts
- Bytes received and sent

**Thread Stage Table (all active threads):**

|Stage|Description|
|---|---|
|`Parse and Prepare Request`|Request headers being parsed or encoding preparation underway|
|`Service`|Thread actively processing a request and generating a response|
|`Finishing`|Flushing remaining response data to the client|
|`Keep-Alive`|Connection held open awaiting the next request from client|
|`Ready`|Thread is idle and available|

> 💡 The `/status/all` endpoint additionally shows per-application metrics for each deployed webapp.

---

## 06 · JMX Proxy Servlet

### What is the JMX Proxy Servlet?

A lightweight HTTP proxy that exposes Tomcat's internals (and any MBean-registered class) for **get**, **set**, **query**, and **invoke** operations via simple HTTP requests. It is extremely powerful but requires familiarity with JMX concepts.

- Requires **`manager-jmx`** role
- Effectively grants **root-level administrative access** to the JVM internals
- Useful for shell-based monitoring and configuration scripting

### JMX Query Command

List MBeans matching a wildcard query.

```bash
# Query all request processors
curl -u admin:pass "http://localhost:8080/manager/jmxproxy/?qry=*%3Atype%3DRequestProcessor%2C*"
# Decoded: qry=*:type=RequestProcessor,*

# Query all loaded servlets
curl -u admin:pass "http://localhost:8080/manager/jmxproxy/?qry=*%3Aj2eeType=Servlet%2c*"
# Decoded: qry=*:j2eeType=Servlet,*

# Query a specific named MBean
curl -u admin:pass "http://localhost:8080/manager/jmxproxy/?qry=Catalina%3Atype%3DEnvironment%2Cresourcetype%3DGlobal%2Cname%3DsimpleValue"
# Decoded: qry=Catalina:type=Environment,resourcetype=Global,name=simpleValue

# Query ALL MBeans (very verbose)
curl -u admin:pass "http://localhost:8080/manager/jmxproxy/"
```

### JMX Get Command

Retrieve the value of a specific MBean attribute.

```
http://localhost:8080/manager/jmxproxy/?get=BEANNAME&att=MYATTRIBUTE&key=MYKEY
```

|Parameter|Required|Description|
|---|---|---|
|`get`|✅ Yes|Full MBean name|
|`att`|✅ Yes|Attribute name to retrieve|
|`key`|Optional|Key within a `CompositeData` attribute|

```bash
# Get current heap memory usage
curl -u admin:pass "http://localhost:8080/manager/jmxproxy/?get=java.lang:type=Memory&att=HeapMemoryUsage"

# Get only the 'used' field from the heap memory composite
curl -u admin:pass "http://localhost:8080/manager/jmxproxy/?get=java.lang:type=Memory&att=HeapMemoryUsage&key=used"

# Get thread count
curl -u admin:pass "http://localhost:8080/manager/jmxproxy/?get=java.lang:type=Threading&att=ThreadCount"

# Get Tomcat connector max threads
curl -u admin:pass "http://localhost:8080/manager/jmxproxy/?get=Catalina:type=ThreadPool,name=%22http-nio-8080%22&att=maxThreads"
```

### JMX Set Command

Modify an MBean attribute value at runtime (no restart needed).

```
http://localhost:8080/manager/jmxproxy/?set=BEANNAME&att=MYATTRIBUTE&val=NEWVALUE
```

|Parameter|Required|Description|
|---|---|---|
|`set`|✅ Yes|Full MBean name|
|`att`|✅ Yes|Attribute name to modify|
|`val`|✅ Yes|New value to assign|

```bash
# Turn up debug level on ErrorReportValve at runtime
curl -u admin:pass "http://localhost:8080/manager/jmxproxy/?set=Catalina%3Atype%3DValve%2Cname%3DErrorReportValve%2Chost%3Dlocalhost&att=debug&val=10"
# Decoded bean: Catalina:type=Valve,name=ErrorReportValve,host=localhost
# Expected: Result: ok

# Attempting to set an invalid type returns a descriptive error:
# Error: java.lang.NumberFormatException: For input string: "cow"
```

### JMX Invoke Command

Invokes a method on an MBean.

```
http://localhost:8080/manager/jmxproxy/?invoke=BEANNAME&op=METHODNAME&ps=PARAM1,PARAM2
```

```bash
# Example: trigger GC via JMX
curl -u admin:pass "http://localhost:8080/manager/jmxproxy/?invoke=java.lang:type=Memory&op=gc"

# Invoke a diagnostic operation on a connector
curl -u admin:pass "http://localhost:8080/manager/jmxproxy/?invoke=Catalina:type=ProtocolHandler,port=8080&op=pause"
```

> ⚠️ **Security Note:** The JMX Proxy interface has effectively **no output sanitization** and can expose sensitive system properties, internal state, and enable runtime modification of nearly any server parameter. Restrict access rigorously and monitor usage.

---

## 07 · Executing Manager Commands with Ant

Tomcat ships with Ant task definitions that wrap the Manager text interface, enabling build-pipeline integration.

### Setup — build.xml

```xml
<project name="MyWebApp" default="compile" basedir=".">

  <!-- Define the custom Ant tasks for Tomcat management -->
  <taskdef resource="org/apache/catalina/ant/catalina.tasks"
           classpath="${tomcat.home}/lib/catalina-ant.jar"/>

  <!-- Connection properties -->
  <property name="tomcat.url"      value="http://localhost:8080/manager/text"/>
  <property name="tomcat.username" value="deploy-bot"/>
  <property name="tomcat.password" value="Bot$ecret!"/>
  <property name="app.path"        value="/myapp"/>
  <property name="app.war"         value="${basedir}/dist/myapp.war"/>

</project>
```

### Common Ant Tasks

```xml
<!-- Deploy a WAR -->
<deploy url="${tomcat.url}"
        username="${tomcat.username}"
        password="${tomcat.password}"
        path="${app.path}"
        war="file:${app.war}"
        update="true"/>

<!-- Undeploy an application -->
<undeploy url="${tomcat.url}"
          username="${tomcat.username}"
          password="${tomcat.password}"
          path="${app.path}"/>

<!-- Start a stopped application -->
<start url="${tomcat.url}"
       username="${tomcat.username}"
       password="${tomcat.password}"
       path="${app.path}"/>

<!-- Stop a running application -->
<stop url="${tomcat.url}"
      username="${tomcat.username}"
      password="${tomcat.password}"
      path="${app.path}"/>

<!-- Reload an application -->
<reload url="${tomcat.url}"
        username="${tomcat.username}"
        password="${tomcat.password}"
        path="${app.path}"/>

<!-- List all deployed applications -->
<list url="${tomcat.url}"
      username="${tomcat.username}"
      password="${tomcat.password}"/>
```

### Capturing Task Output

```xml
<!-- Capture the output of a Manager task into a property -->
<list url="${tomcat.url}"
      username="${tomcat.username}"
      password="${tomcat.password}"
      outputproperty="manager.list.output"/>

<echo message="Deployed apps: ${manager.list.output}"/>
```

> 💡 Requires Ant 1.4 or later and `catalina-ant.jar` on the classpath (found in `$CATALINA_HOME/lib/`).

---

## Quick Reference Cheatsheet

### Text Interface Commands

|Action|URL|
|---|---|
|List all apps|`GET /manager/text/list`|
|Deploy WAR (upload)|`PUT /manager/text/deploy?path=/app`|
|Deploy from server path|`GET /manager/text/deploy?war=file:/path/to/app.war`|
|Deploy from appBase|`GET /manager/text/deploy?war=app.war`|
|Deploy from context XML|`GET /manager/text/deploy?config=file:/path/context.xml`|
|Redeploy by tag|`GET /manager/text/deploy?path=/app&tag=mytag`|
|Reload app|`GET /manager/text/reload?path=/app`|
|Start app|`GET /manager/text/start?path=/app`|
|Stop app|`GET /manager/text/stop?path=/app`|
|Undeploy app|`GET /manager/text/undeploy?path=/app`|
|Session stats|`GET /manager/text/sessions?path=/app`|
|Expire sessions|`GET /manager/text/expire?path=/app&idle=15`|
|Server info (OS/JVM)|`GET /manager/text/serverinfo`|
|Find memory leaks|`GET /manager/text/findleaks`|
|Thread dump|`GET /manager/text/threaddump`|
|VM info|`GET /manager/text/vminfo`|
|Save config|`GET /manager/text/save`|
|SSL cipher info|`GET /manager/text/sslConnectorCiphers`|
|SSL cert chain|`GET /manager/text/sslConnectorCerts`|
|SSL trusted certs|`GET /manager/text/sslConnectorTrustedCerts`|
|Reload TLS config|`GET /manager/text/sslReload`|

### Server Status URLs

|URL|Output|
|---|---|
|`/manager/status`|HTML status page|
|`/manager/status/all`|HTML status + all webapp details|
|`/manager/status?XML=true`|Machine-readable XML status|
|`/manager/status/all?XML=true`|XML status + all webapp details|

### JMX Proxy URLs

|Action|URL Pattern|
|---|---|
|Query MBeans|`/manager/jmxproxy/?qry=QUERY`|
|Get attribute|`/manager/jmxproxy/?get=BEAN&att=ATTR`|
|Get composite key|`/manager/jmxproxy/?get=BEAN&att=ATTR&key=KEY`|
|Set attribute|`/manager/jmxproxy/?set=BEAN&att=ATTR&val=VALUE`|
|Invoke method|`/manager/jmxproxy/?invoke=BEAN&op=METHOD&ps=PARAMS`|

### Manager Role Summary

|Role|HTML GUI|Server Status|Text Interface|JMX Proxy|
|---|---|---|---|---|
|`manager-gui`|✅|✅|❌|❌|
|`manager-status`|❌|✅|❌|❌|
|`manager-script`|❌|✅|✅|❌|
|`manager-jmx`|❌|✅|❌|✅|

---


