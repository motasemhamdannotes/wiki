

[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)
# MySQL Server Deployment with Docker on Linux

> **Field Manual · MISC / Linux · Analyst & Learner Reference** Covers the complete workflow: pull → run → configure → connect → persist → manage → compose.

## 01 · Prerequisites

Before deploying MySQL with Docker, ensure the following are in place on your Linux host.

### Install Docker (Debian / Ubuntu)

```bash
# Remove old versions
sudo apt remove docker docker-engine docker.io containerd runc

# Install dependencies
sudo apt update
sudo apt install -y ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Set up the stable repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Add current user to docker group (avoids sudo on every command)
sudo usermod -aG docker $USER
newgrp docker

# Verify installation
docker --version
docker run hello-world
```

### Install Docker (RHEL / CentOS / Fedora)

```bash
# Install via dnf
sudo dnf remove docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine
sudo dnf install -y dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo dnf install -y docker-ce docker-ce-cli containerd.io
sudo systemctl start docker
sudo systemctl enable docker
```

> 💡 **Note:** Docker Desktop is available for Linux but the Docker Engine (CLI-based) is the standard choice for servers and lab environments.

---

## 02 · Pulling the MySQL Image

Docker Hub hosts the official MySQL image maintained by the MySQL team. Pulling the image before running ensures you have the latest build cached locally.

```bash
# Pull the latest MySQL image (defaults to latest stable)
docker pull mysql

# Pull a specific version (recommended for reproducibility)
docker pull mysql:8.0
docker pull mysql:8.4
docker pull mysql:5.7

# Pull from Oracle Container Registry (enterprise builds)
docker pull container-registry.oracle.com/mysql/community-server:8.0
docker pull container-registry.oracle.com/mysql/enterprise-server:8.0

# List all locally available images
docker images

# Inspect image metadata
docker inspect mysql:8.0
```

> 💡 **Version Pinning:** Always pin a version tag (e.g., `mysql:8.0`) in production and lab environments. Using `latest` can cause unexpected behavior when the upstream image updates.

---

## 03 · Running the MySQL Container

### Minimal — Quick Start

```bash
# Simplest possible run: sets root password, runs in background
docker run --name mysql-server -e MYSQL_ROOT_PASSWORD=rootpass -d mysql:8.0
```

### Full — Recommended Run Command

```bash
docker run \
  --name mysql-server \
  --restart on-failure \
  -e MYSQL_ROOT_PASSWORD=StrongRootPass123! \
  -e MYSQL_DATABASE=mydb \
  -e MYSQL_USER=appuser \
  -e MYSQL_PASSWORD=AppUserPass123! \
  -p 3306:3306 \
  -v mysql-data:/var/lib/mysql \
  -v /etc/mysql/custom.cnf:/etc/mysql/conf.d/custom.cnf:ro \
  -d mysql:8.0
```

### Flag Breakdown

|Flag|Purpose|
|---|---|
|`--name mysql-server`|Assign a human-readable container name|
|`--restart on-failure`|Auto-restart on crash; supports `RESTART` SQL command inside sessions|
|`-e MYSQL_ROOT_PASSWORD=...`|**Required.** Sets the root password|
|`-e MYSQL_DATABASE=...`|Creates a database on first start|
|`-e MYSQL_USER=...`|Creates a non-root user on first start|
|`-e MYSQL_PASSWORD=...`|Password for the above non-root user|
|`-p 3306:3306`|Maps host port → container port (HOST:CONTAINER)|
|`-v mysql-data:/var/lib/mysql`|Named volume for data persistence|
|`-d`|Detached mode (background execution)|

### Verify the Container is Running

```bash
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Check container logs
docker logs mysql-server

# Follow logs in real time
docker logs -f mysql-server

# Check container resource usage
docker stats mysql-server
```

---

## 04 · Environment Variables Reference

The official MySQL Docker image is configured exclusively through environment variables on first initialization. Changes after the container is first started **do not re-initialize** the database.

|Variable|Required|Description|
|---|---|---|
|`MYSQL_ROOT_PASSWORD`|✅ Yes (or ALLOW_EMPTY_PASSWORD)|Sets the password for the `root` superuser account|
|`MYSQL_DATABASE`|Optional|Creates a database with this name on startup|
|`MYSQL_USER`|Optional|Creates a non-root user (requires `MYSQL_PASSWORD`)|
|`MYSQL_PASSWORD`|Optional|Password for `MYSQL_USER`|
|`MYSQL_ALLOW_EMPTY_PASSWORD`|Optional|Set to `yes` to allow root with no password (**never in production**)|
|`MYSQL_RANDOM_ROOT_PASSWORD`|Optional|Generates a random root password; printed to stdout once|
|`MYSQL_ONETIME_PASSWORD`|Optional|Marks root account as expired — must change on first login|
|`MYSQL_ROOT_HOST`|Optional|Allows root login from specified host (default: `localhost`). Use `%` to allow any host|
|`MYSQL_INITDB_SKIP_TZINFO`|Optional|Skips timezone table population on init|

```bash
# Example: Use a randomly generated root password (check logs for it)
docker run --name mysql-server \
  -e MYSQL_RANDOM_ROOT_PASSWORD=yes \
  -d mysql:8.0

# Retrieve the generated password from container logs
docker logs mysql-server 2>&1 | grep "GENERATED ROOT PASSWORD"
```

> ⚠️ **Important:** All `MYSQL_*` init variables are only processed during the **first** container start (when `/var/lib/mysql` is empty). If the data directory already has data, these variables are ignored.

---

## 05 · Connecting to MySQL

### Shell Access — Inside the Container

```bash
# Open a bash shell inside the running container
docker exec -it mysql-server bash

# From inside the container shell, connect to MySQL CLI
mysql -u root -p

# One-liner: connect to MySQL directly (no intermediate shell)
docker exec -it mysql-server mysql -u root -p

# Connect as a specific user to a specific database
docker exec -it mysql-server mysql -u appuser -p mydb
```

### Connect from the Host Machine (Port Mapped)

```bash
# Using mysql client on host (requires mysql-client installed)
mysql -h 127.0.0.1 -P 3306 -u root -p

# Install mysql client on host without the full server
sudo apt install -y mysql-client       # Debian/Ubuntu
sudo dnf install -y mysql              # RHEL/Fedora
```

### Connect from Another Docker Container

```bash
# Both containers must be on the same Docker network
# Use the container name as the hostname
mysql -h mysql-server -P 3306 -u root -p
```

### Connect Using GUI Tools

```bash
# MySQL Workbench / DBeaver / TablePlus connection settings:
# Host:     127.0.0.1
# Port:     3306   (or whatever HOST port you mapped with -p)
# User:     root   (or appuser)
# Password: <your MYSQL_ROOT_PASSWORD>
# Database: mydb   (optional)
```

### Basic MySQL Commands After Connecting

```sql
-- Show all databases
SHOW DATABASES;

-- Use a specific database
USE mydb;

-- Show all tables in current database
SHOW TABLES;

-- Show current logged-in user
SELECT USER();

-- Show MySQL server version
SELECT VERSION();

-- Create a new database
CREATE DATABASE testdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create a new user
CREATE USER 'newuser'@'%' IDENTIFIED BY 'SecurePass123!';

-- Grant privileges to user
GRANT ALL PRIVILEGES ON testdb.* TO 'newuser'@'%';
FLUSH PRIVILEGES;

-- Show all users
SELECT User, Host FROM mysql.user;
```

---

## 06 · Persisting Data with Volumes

By default, all MySQL data lives inside the container at `/var/lib/mysql`. If the container is removed, **all data is lost**. Volumes solve this.

### Named Volume (Recommended)

```bash
# Docker manages the volume location on the host
docker run --name mysql-server \
  -e MYSQL_ROOT_PASSWORD=rootpass \
  -v mysql-data:/var/lib/mysql \
  -d mysql:8.0

# Inspect volume location on host
docker volume inspect mysql-data

# List all volumes
docker volume ls
```

### Bind Mount (Direct Host Path)

```bash
# Mount a specific host directory — useful for direct file access
docker run --name mysql-server \
  -e MYSQL_ROOT_PASSWORD=rootpass \
  -v /data/mysql:/var/lib/mysql \
  -d mysql:8.0
```

> ⚠️ **Bind mount permission issue:** MySQL runs as UID 999 inside the container. If using a bind mount, ensure the host directory is owned by UID 999:
> 
> ```bash
> sudo chown -R 999:999 /data/mysql
> ```

### Volume Management

```bash
# Create a volume manually before use
docker volume create mysql-data

# Remove a volume (DESTRUCTIVE — deletes all data in it)
docker volume rm mysql-data

# Remove all unused volumes (CAREFUL in production)
docker volume prune
```

> 💡 **Analyst Note:** Named volumes are preferred over bind mounts for portability. Use bind mounts when you need to inspect or edit files directly from the host filesystem.

---

## 07 · Custom Configuration (my.cnf)

You can override MySQL's default configuration by mounting a custom config file or directory.

### Create a Custom Config File

```bash
# Create the config file on the host
cat > /etc/mysql/custom.cnf << 'EOF'
[mysqld]
# General settings
max_connections        = 200
wait_timeout           = 28800
interactive_timeout    = 28800

# Character set
character-set-server   = utf8mb4
collation-server       = utf8mb4_unicode_ci

# InnoDB tuning
innodb_buffer_pool_size    = 256M
innodb_log_file_size       = 64M
innodb_flush_log_at_trx_commit = 1

# Logging
general_log            = 1
general_log_file       = /var/log/mysql/general.log
slow_query_log         = 1
slow_query_log_file    = /var/log/mysql/slow.log
long_query_time        = 2

# Networking
bind-address           = 0.0.0.0
EOF
```

### Mount Config at Container Start

```bash
# Mount as a single config file (read-only)
docker run --name mysql-server \
  -e MYSQL_ROOT_PASSWORD=rootpass \
  -v /etc/mysql/custom.cnf:/etc/mysql/conf.d/custom.cnf:ro \
  -d mysql:8.0

# Mount an entire config directory
docker run --name mysql-server \
  -e MYSQL_ROOT_PASSWORD=rootpass \
  -v /path/to/conf.d:/etc/mysql/conf.d:ro \
  -d mysql:8.0
```

### Verify Config Was Applied

```bash
# Check active config inside the container
docker exec -it mysql-server mysql -u root -p -e "SHOW VARIABLES LIKE 'max_connections';"
docker exec -it mysql-server mysql -u root -p -e "SHOW VARIABLES LIKE 'character%';"
```

---

## 08 · Container Lifecycle Management

```bash
# ── START / STOP / RESTART ──────────────────────────────────────

# Stop the container gracefully (sends SIGTERM to mysqld)
docker stop mysql-server

# Start a stopped container
docker start mysql-server

# Restart the container
docker restart mysql-server

# Pause/unpause the container (SIGSTOP)
docker pause mysql-server
docker unpause mysql-server


# ── REMOVE ──────────────────────────────────────────────────────

# Remove a stopped container (data volume is NOT deleted)
docker rm mysql-server

# Force-remove a running container
docker rm -f mysql-server

# Remove container AND its anonymous volumes
docker rm -v mysql-server


# ── INSPECT & DEBUG ─────────────────────────────────────────────

# Full container details (JSON)
docker inspect mysql-server

# Check resource consumption
docker stats mysql-server --no-stream

# View real-time logs
docker logs -f mysql-server

# View last N lines of logs
docker logs --tail 50 mysql-server

# View container processes
docker top mysql-server

# Execute an arbitrary command inside the container
docker exec mysql-server mysqladmin -u root -p status
docker exec mysql-server ls /var/lib/mysql


# ── IMAGE MANAGEMENT ────────────────────────────────────────────

# List local images
docker images

# Remove a specific image
docker rmi mysql:8.0

# Remove all unused images
docker image prune -a
```

---

## 09 · Networking & Port Exposure

### Default Behaviour

By default, MySQL listens on port `3306` inside the container. Without `-p`, this port is **not accessible from the host**.

```bash
# Map host port 3306 → container port 3306
docker run --name mysql-server \
  -e MYSQL_ROOT_PASSWORD=rootpass \
  -p 3306:3306 \
  -d mysql:8.0

# Map to a different host port (e.g., if 3306 is taken)
docker run --name mysql-server \
  -e MYSQL_ROOT_PASSWORD=rootpass \
  -p 3307:3306 \
  -d mysql:8.0

# Bind only to localhost (more secure — no external access)
docker run --name mysql-server \
  -e MYSQL_ROOT_PASSWORD=rootpass \
  -p 127.0.0.1:3306:3306 \
  -d mysql:8.0
```

### Container Networking with a Custom Network

Using a custom Docker network allows containers to communicate by name, without exposing ports to the host.

```bash
# Create a dedicated Docker network
docker network create mysql-net

# Run MySQL on that network
docker run --name mysql-server \
  --network mysql-net \
  -e MYSQL_ROOT_PASSWORD=rootpass \
  -d mysql:8.0

# Run an app container on the same network — connects via container name
docker run --name my-app \
  --network mysql-net \
  -e DB_HOST=mysql-server \
  -e DB_PORT=3306 \
  -d my-app-image

# Inspect the network
docker network inspect mysql-net

# List all networks
docker network ls
```

> 💡 **Security Best Practice:** Never expose MySQL's port (`3306`) to the public internet directly. Use `-p 127.0.0.1:3306:3306` to restrict access to localhost only, or use a dedicated Docker network and let your application container connect internally without any port mapping.

---

## 10 · Docker Compose Setup

Docker Compose is the preferred way to manage multi-container setups (e.g., MySQL + application + cache) declaratively.

### Minimal `docker-compose.yml`

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: mysql-server
    restart: on-failure
    environment:
      MYSQL_ROOT_PASSWORD: StrongRootPass123!
      MYSQL_DATABASE: mydb
      MYSQL_USER: appuser
      MYSQL_PASSWORD: AppUserPass123!
    ports:
      - "127.0.0.1:3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql

volumes:
  mysql-data:
```

### Full Production-Oriented `docker-compose.yml`

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: mysql-server
    restart: on-failure
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${MYSQL_DATABASE}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
    ports:
      - "127.0.0.1:3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql
      - ./config/custom.cnf:/etc/mysql/conf.d/custom.cnf:ro
      - ./init:/docker-entrypoint-initdb.d:ro   # init SQL scripts
    networks:
      - backend
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-p${MYSQL_ROOT_PASSWORD}"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s

  app:
    image: my-app:latest
    container_name: my-app
    restart: on-failure
    depends_on:
      mysql:
        condition: service_healthy
    environment:
      DB_HOST: mysql
      DB_PORT: 3306
      DB_USER: ${MYSQL_USER}
      DB_PASSWORD: ${MYSQL_PASSWORD}
      DB_NAME: ${MYSQL_DATABASE}
    ports:
      - "8080:8080"
    networks:
      - backend

networks:
  backend:
    driver: bridge

volumes:
  mysql-data:
    driver: local
```

### Environment File (`.env`)

```bash
# Store secrets in .env — never commit this to git
MYSQL_ROOT_PASSWORD=StrongRootPass123!
MYSQL_DATABASE=mydb
MYSQL_USER=appuser
MYSQL_PASSWORD=AppUserPass123!
```

```bash
# Add to .gitignore
echo ".env" >> .gitignore
```

### Compose Commands

```bash
# Start all services (detached)
docker compose up -d

# Start and rebuild images
docker compose up -d --build

# Stop all services (containers preserved)
docker compose stop

# Stop and remove containers (volumes preserved)
docker compose down

# Stop and remove containers AND volumes (DESTRUCTIVE)
docker compose down -v

# View logs for all services
docker compose logs -f

# View logs for mysql only
docker compose logs -f mysql

# Execute a command inside the mysql service container
docker compose exec mysql mysql -u root -p

# Scale a service (e.g., multiple app instances)
docker compose up -d --scale app=3
```

### Initialization Scripts

Place `.sql` or `.sh` files in a directory mounted at `/docker-entrypoint-initdb.d/`. They run once on first container start in alphabetical order.

```bash
mkdir -p ./init

# Example init script: create tables on startup
cat > ./init/01-schema.sql << 'EOF'
CREATE TABLE IF NOT EXISTS users (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    username    VARCHAR(100) NOT NULL UNIQUE,
    email       VARCHAR(255) NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
EOF

# Example init script: seed data
cat > ./init/02-seed.sql << 'EOF'
INSERT INTO users (username, email) VALUES
  ('admin', 'admin@example.com'),
  ('testuser', 'test@example.com');
EOF
```

> 💡 **Note:** Init scripts only run when `/var/lib/mysql` is empty (fresh volume). They do not re-run on container restart.

---

## 11 · Backup & Restore

### Backup with mysqldump

```bash
# Dump a single database to a SQL file
docker exec mysql-server mysqladmin -u root -pYOURPASS status
docker exec mysql-server mysqldump -u root -pYOURPASS mydb > backup_mydb.sql

# Dump all databases
docker exec mysql-server mysqldump -u root -pYOURPASS --all-databases > backup_all.sql

# Dump with compression
docker exec mysql-server mysqldump -u root -pYOURPASS mydb | gzip > backup_mydb_$(date +%F).sql.gz

# Dump specific tables only
docker exec mysql-server mysqldump -u root -pYOURPASS mydb users orders > backup_tables.sql
```

### Restore from Backup

```bash
# Restore a single database
docker exec -i mysql-server mysql -u root -pYOURPASS mydb < backup_mydb.sql

# Restore from compressed backup
gunzip < backup_mydb_2025-01-01.sql.gz | docker exec -i mysql-server mysql -u root -pYOURPASS mydb

# Restore all databases
docker exec -i mysql-server mysql -u root -pYOURPASS < backup_all.sql
```

### Scheduled Automated Backups (Cron)

```bash
# Add to crontab (runs daily at 2:00 AM)
crontab -e

# Add this line:
0 2 * * * docker exec mysql-server mysqldump -u root -pYOURPASS --all-databases | gzip > /backups/mysql_$(date +\%F).sql.gz

# Keep only the last 7 days of backups
0 3 * * * find /backups -name "mysql_*.sql.gz" -mtime +7 -delete
```

---

## 12 · Security Notes

### Credentials Management

```bash
# NEVER pass passwords as plaintext in shell history
# BAD:
docker exec mysql-server mysql -u root -prootpass

# BETTER: prompt for password interactively
docker exec -it mysql-server mysql -u root -p

# BEST: use a .my.cnf client config file inside the container
docker exec mysql-server bash -c 'echo "[client]
user=root
password=rootpass" > /root/.my.cnf && chmod 600 /root/.my.cnf'
```

### Disable Root Remote Login

```sql
-- After connecting, restrict root to localhost only
ALTER USER 'root'@'%' IDENTIFIED BY 'rootpass' ACCOUNT LOCK;
DELETE FROM mysql.user WHERE User='root' AND Host='%';
FLUSH PRIVILEGES;

-- Only allow root from localhost
UPDATE mysql.user SET Host='localhost' WHERE User='root';
FLUSH PRIVILEGES;
```

### Use Least-Privilege Application Users

```sql
-- Create a dedicated app user with minimal permissions
CREATE USER 'appuser'@'%' IDENTIFIED BY 'SecureAppPass!';

-- Grant only what is needed (not GRANT ALL)
GRANT SELECT, INSERT, UPDATE, DELETE ON mydb.* TO 'appuser'@'%';
FLUSH PRIVILEGES;

-- Verify permissions
SHOW GRANTS FOR 'appuser'@'%';
```

### Hardening Checklist

```bash
# 1. Never expose 3306 to the public internet
#    Use: -p 127.0.0.1:3306:3306 (not -p 3306:3306)

# 2. Run containers as non-root where possible
docker run --user 1000:1000 ...

# 3. Use Docker secrets in Swarm mode (not plain env vars)
echo "rootpass" | docker secret create mysql_root_password -
# Then reference in compose: MYSQL_ROOT_PASSWORD_FILE: /run/secrets/mysql_root_password

# 4. Keep the image updated
docker pull mysql:8.0
docker stop mysql-server && docker rm mysql-server
# Re-run with the same volume — data persists

# 5. Scan image for vulnerabilities
docker scout cves mysql:8.0
# or
trivy image mysql:8.0

# 6. Restrict container capabilities
docker run --cap-drop ALL --cap-add CHOWN --cap-add DAC_OVERRIDE ...
```

> ⚠️ **Penetration Testing Note:** MySQL on port 3306 is a frequent target. Common findings include:
> 
> - Root login accessible from `%` (any host)
> - Blank or default passwords
> - MySQL version disclosure via banner
> - Unencrypted connections (no SSL/TLS configured)
> - Overly permissive GRANT ALL on all databases

---

## Quick Reference Cheatsheet

### Container Commands

|Task|Command|
|---|---|
|Pull image|`docker pull mysql:8.0`|
|Run container|`docker run --name mysql-server -e MYSQL_ROOT_PASSWORD=pass -d mysql:8.0`|
|Open MySQL CLI|`docker exec -it mysql-server mysql -u root -p`|
|Open bash shell|`docker exec -it mysql-server bash`|
|View logs|`docker logs -f mysql-server`|
|Stop container|`docker stop mysql-server`|
|Start container|`docker start mysql-server`|
|Remove container|`docker rm mysql-server`|
|Check status|`docker ps -a`|

### MySQL CLI Quick Commands

|Task|SQL|
|---|---|
|List databases|`SHOW DATABASES;`|
|Use database|`USE mydb;`|
|List tables|`SHOW TABLES;`|
|Describe table|`DESCRIBE tablename;`|
|List users|`SELECT User, Host FROM mysql.user;`|
|Show grants|`SHOW GRANTS FOR 'user'@'host';`|
|Current user|`SELECT USER();`|
|Server version|`SELECT VERSION();`|
|Show variables|`SHOW VARIABLES LIKE 'max_connections';`|

### Key Paths Inside the Container

|Path|Purpose|
|---|---|
|`/var/lib/mysql`|Data directory (mount a volume here)|
|`/etc/mysql/my.cnf`|Main config file|
|`/etc/mysql/conf.d/`|Config override directory|
|`/docker-entrypoint-initdb.d/`|SQL/shell init scripts (run on first start)|
|`/var/log/mysql/`|Log files|
_