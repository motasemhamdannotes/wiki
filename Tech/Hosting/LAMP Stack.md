

[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)
# LAMP Stack : Linux, Apache, MySQL, PHP Setup

# 1. Core Concept — What a LAMP Stack Is

## Definition

**LAMP** stands for:

- **Linux** — Operating system
- **Apache** — Web server
- **MySQL** — Database server
- **PHP** — Server-side scripting language

Used to:

- Host dynamic web applications
- Support database-driven websites
- Provide backend processing logic

---

## Typical Architecture

Client (Browser)  
        ↓  
Apache Web Server  
        ↓  
PHP Interpreter  
        ↓  
MySQL Database

---

## Security Relevance

LAMP stacks:
- Are widely deployed production environments
- Represent high-value attack surfaces
- Frequently targeted due to misconfigurations

---

# 2. Initial System Preparation

## Update System Packages

Required before installing services.

### Command
```bash
sudo apt update
sudo apt upgrade
```

---

## Analyst Relevance

Outdated systems:

- Increase vulnerability exposure
- Enable exploitation of known CVEs

---

# 3. Apache Installation

## Install Apache2

### Command

sudo apt install apache2

---

## Verify Apache Installation

Check Apache status:

sudo systemctl status apache2

---

## Start Apache (If Needed)

sudo systemctl start apache2

---

## Enable Apache at Boot

sudo systemctl enable apache2

---

## Test Web Server

Open in browser:

http://localhost

Expected result:

Apache Default Page

---

## Apache Web Root Directory

Default:

/var/www/html

---

## Analyst Relevance

Common attacker targets:

/var/www/html

Because it stores:

- Website files
- Upload directories
- Web shells

---

# 4. Firewall Configuration

## Allow HTTP Traffic

Required for web access.

### Command

sudo ufw allow in "Apache"

---

## Verify Firewall Status

sudo ufw status

---

## Security Relevance

Firewall misconfiguration may:

- Block legitimate traffic
- Allow unauthorized access

---

# 5. MySQL Installation

## Install MySQL Server

### Command

sudo apt install mysql-server

---

## Verify MySQL Service
```bash
sudo systemctl status mysql
```
---

## Secure MySQL Installation

Run security script:
```bash
sudo mysql_secure_installation
```

---

## Security Script Prompts Include
- Set root password
- Remove anonymous users
- Disable remote root login
- Remove test database
- Reload privilege tables

---

## Analyst Relevance
Weak MySQL configurations enable:
- Database compromise
- Credential theft
- Data exfiltration

---

# 6. PHP Installation

## Install PHP and Apache PHP Module

### Command
```bash
sudo apt install php libapache2-mod-php php-mysql
```
---

## Verify PHP Installation

Check version:
```php
php -v
```

---

## Test PHP Execution

Create test file:
```bash
sudo nano /var/www/html/info.php
```
Add content:
```php
<?php  
phpinfo();  
?>
```
Access via browser:
```http
http://localhost/info.php
```

Expected result:
PHP configuration page

---

## Security Relevance

Leaving `phpinfo()` exposed:

- Leaks sensitive system data
- Reveals configuration details
- Assists attackers in exploitation

---

# 7. Apache Directory Index Configuration

## Modify Apache Index Priority

Apache loads files in order.

Modify:

sudo nano /etc/apache2/mods-enabled/dir.conf

---

## Default Order Example

DirectoryIndex index.php index.html index.cgi index.pl index.xhtml index.htm

---

## Restart Apache After Changes

sudo systemctl restart apache2

---

## Security Relevance

Improper index configuration may:

- Reveal unintended files
- Expose backup data

---

# 8. Apache Virtual Hosts

## Purpose

Virtual hosts allow:

- Hosting multiple websites
- Running separate domain configurations

---

## Create Virtual Host Directory

sudo mkdir /var/www/example.com

---

## Set Ownership

sudo chown -R $USER:$USER /var/www/example.com

---

## Set Permissions

sudo chmod -R 755 /var/www/example.com

---

## Create Test Page

nano /var/www/example.com/index.html

Example content:

<html>  
<head>  
<title>Welcome</title>  
</head>  
<body>  
<h1>Example Domain</h1>  
</body>  
</html>

---

## Create Virtual Host Configuration

sudo nano /etc/apache2/sites-available/example.com.conf

Example configuration:

<VirtualHost *:80>  
    ServerAdmin admin@example.com  
    ServerName example.com  
    ServerAlias www.example.com  
    DocumentRoot /var/www/example.com  
    ErrorLog ${APACHE_LOG_DIR}/error.log  
    CustomLog ${APACHE_LOG_DIR}/access.log combined  
</VirtualHost>

---

## Enable Virtual Host
```bash
sudo a2ensite example.com.conf
```

---

## Disable Default Site
```bash
sudo a2dissite 000-default.conf
```

---

## Reload Apache
`sudo systemctl reload apache2`

---

## Analyst Relevance
Virtual hosts introduce:

- Additional attack surfaces
- Domain-level segmentation
- Logging complexities

---

# 9. File Permissions and Ownership

## Default Web Directory Permissions

Typical:
`755`
Ownership:
`www-data:www-data`

---

## Change Ownership
`sudo chown -R www-data:www-data /var/www/html`

---

## Change Permissions
`sudo chmod -R 755 /var/www/html`

---

## Security Relevance
Improper permissions allow:
- Unauthorized file uploads
- Web shell deployment
- Privilege escalation

---

# 10. MySQL Database Access

## Login to MySQL
`sudo mysql`

---

## Create Database
`CREATE DATABASE example_db;`

---

## Create User
`CREATE USER 'example_user'@'localhost' IDENTIFIED BY 'password';`

---

## Grant Privileges
`GRANT ALL PRIVILEGES ON example_db.* TO 'example_user'@'localhost';`

---

## Apply Changes
`FLUSH PRIVILEGES;`

---

## Security Relevance
Weak database privileges:
- Increase lateral movement risk
- Enable privilege escalation

---

# 11. Logging System
Logs are critical for:
- Incident response
- Threat detection
- Troubleshooting

---

## Apache Logs Location

/var/log/apache2/

---

## Important Log Files

### Access Log

/var/log/apache2/access.log

Tracks:

- Incoming HTTP requests

Example entry:
```http
192.168.1.5 - - [10/Jan/2024:14:22:01] "GET /index.html HTTP/1.1" 200
```

---

### Error Log
`/var/log/apache2/error.log`

Tracks:
- Server errors
- Application failures

---

## MySQL Logs Location

Typical:
`/var/log/mysql/`

---

## Detection Value
Logs help detect:
- Web exploitation attempts
- Brute-force attacks
- Injection attacks

---

# 12. Common Attack Surface

## Web Root Exposure

Primary directory:

/var/www/html

Common attack targets:

uploads/  
backup/  
temp/

---

## PHP Exploitation

Common vectors:

File upload vulnerabilities  
Remote code execution  
PHP misconfiguration

---

## Database Exploitation

Common techniques:

SQL Injection  
Credential reuse  
Privilege escalation

---

# 13. Detection Opportunities

## Suspicious File Indicators

Monitor:

/var/www/html/

Look for:

shell.php  
cmd.php  
backdoor.php  
upload.php

---

## Suspicious Log Activity

Look for:

Repeated POST requests  
SQL error messages  
Unexpected 500 responses  
Long URL strings

---

## Suspicious Database Activity

Indicators:

Unexpected login attempts  
Privilege escalation events  
Database enumeration

---

# 14. Hardening Considerations

## Remove Test Files

Delete:

sudo rm /var/www/html/info.php

---

## Disable Directory Listing

Modify Apache config:

Options -Indexes

---

## Restrict File Permissions

Ensure:

755 directories  
644 files

---

## Use Strong Database Credentials

Avoid:

Default usernames  
Weak passwords  
Shared credentials

---

## Limit Apache Modules

Disable unused modules:

sudo a2dismod module_name

---

## Restart Apache After Changes

sudo systemctl restart apache2

---

# 15. Blue Team Monitoring Focus

## Web Directory Monitoring

Monitor:

/var/www/

Watch for:

Unauthorized file uploads  
Unexpected directory creation  
Permission changes

---

## Log Monitoring

Monitor:

/var/log/apache2/

Key indicators:

SQL errors  
Authentication failures  
Large payload uploads

---

## Database Monitoring

Monitor:

/var/log/mysql/

Watch for:

Unauthorized database access  
Privilege modifications  
Data extraction activity

---

# 16. Incident Response Use Cases

## Web Shell Detection

Workflow:

Alert → Suspicious file upload  
↓  
Check web directory  
↓  
Identify malicious file  
↓  
Remove payload  
↓  
Review logs

---

## SQL Injection Detection

Workflow:

Alert → SQL error detected  
↓  
Inspect logs  
↓  
Identify malicious input  
↓  
Patch vulnerability

---

# 17. Critical Files and Locations

|Path|Purpose|
|---|---|
|`/var/www/html/`|Web root directory|
|`/etc/apache2/apache2.conf`|Apache configuration|
|`/etc/apache2/sites-available/`|Virtual host configs|
|`/var/log/apache2/`|Apache logs|
|`/var/log/mysql/`|MySQL logs|

---

# 18. Essential Operational Commands

## Apache Service Control

sudo systemctl start apache2  
sudo systemctl stop apache2  
sudo systemctl restart apache2  
sudo systemctl status apache2

---

## MySQL Service Control

sudo systemctl start mysql  
sudo systemctl stop mysql  
sudo systemctl restart mysql  
sudo systemctl status mysql

---

## Apache Site Management

sudo a2ensite example.com.conf  
sudo a2dissite 000-default.conf

---

## Module Management

sudo a2enmod module_name  
sudo a2dismod module_name

---

## Log Monitoring

tail -f /var/log/apache2/access.log  
tail -f /var/log/apache2/error.log