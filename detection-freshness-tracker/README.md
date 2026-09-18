# Detection Rule Freshness Tracker

Answers one question: **is there a detection for this yet?**

It watches three of the most widely used open detection-rule repos —
[SigmaHQ/sigma](https://github.com/SigmaHQ/sigma),
[elastic/detection-rules](https://github.com/elastic/detection-rules), and
[splunk/security_content](https://github.com/splunk/security_content) (ESCU)
— extracts every CVE and MITRE ATT&CK technique each rule covers, and
cross-references that against recent CVEs (NVD + CISA KEV) and the full
ATT&CK technique catalog. The result is a searchable "is CVE-2024-3400
covered yet" lookup, plus a live list of high-signal CVEs — especially ones
CISA has confirmed are being actively exploited — that none of the three
repos has a rule for yet.

Validated end-to-end against live data while building this: **8,001 real
rules** ingested cleanly across all three sources (2,085 Elastic / 3,757
Sigma / 2,159 Splunk, zero parse errors), correctly cross-referencing e.g.
Log4Shell (CVE-2021-44228) to 13 real detections across Sigma and Splunk.

## How it works

```
┌──────────────┐   git clone/fetch    ┌────────────┐
│ SigmaHQ/sigma│ ───────────────────▶ │            │
├──────────────┤                      │   worker   │──▶ Postgres ◀──┐
│elastic/detect│ ───────────────────▶ │ (scheduler)│                │
├──────────────┤                      │            │                │
│splunk/secu...│ ───────────────────▶ └────────────┘                │
└──────────────┘                            │                       │
  NVD / CISA KEV / MITRE ATT&CK ────────────┘                       │
                                                                      │
                                        ┌────────────┐               │
  browser / API client ───────────────▶│    api     │───────────────┘
                                        │ (FastAPI)  │
                                        └────────────┘
```

- **worker**: a single long-running process (`app/scheduler.py`) that polls
  the three rule repos (default every 2h), NVD's recent-CVE feed (every 3h),
  CISA KEV (every 12h), and MITRE ATT&CK (weekly). See [`app/ingestion/`](backend/app/ingestion)
  and [`app/enrichment/`](backend/app/enrichment).
- **api**: FastAPI app serving both the HTML site (`app/routers/pages.py`,
  server-rendered Jinja2, no JS framework, no CDN dependency) and a public
  read-only JSON API (`app/routers/api.py`, documented at `/docs`).
- **db**: Postgres. Schema in [`app/models.py`](backend/app/models.py).
- **caddy**: reverse proxy + automatic HTTPS for your subdomain.

### Why a local git clone instead of the GitHub API

Between the three repos there are ~8,000 rule files. Polling that via the
GitHub REST/contents API would either blow through the unauthenticated rate
limit (60 req/hr) or need a token just to keep up. Instead the worker keeps
a full local clone of each repo (~450MB for elastic/detection-rules, ~50MB
for sigma, similar for splunk — trivial for a VPS) and does `git fetch` +
`git diff --name-status <last-processed-sha>..<new-sha>` every cycle, which
costs one fetch regardless of repo size and tells us exactly which files
changed. The "last processed SHA" is tracked in Postgres, not local git
state, so a crash mid-cycle just means the same range gets diffed again —
see the docstrings in `app/ingestion/git_sync.py` and `ingest.py` for the
full reasoning (including a partial-clone optimization that was tried and
measured to be *slower* for this workload — also documented there).

### Why regex fallback for CVE extraction

Verified against live rules from each repo (fixtures + provenance notes in
`app/ingestion/parse_*.py`):

| Source | CVE field | ATT&CK field |
|---|---|---|
| Splunk ESCU | dedicated `cve:` list (structured) | dedicated `mitre_attack_id:` list (structured) |
| Elastic | **none** — only appears in `name`/`description` text | structured `[[rule.threat.technique]]` tables |
| Sigma | `cve.YYYY-NNNNN` tag *sometimes* — often only in `title`/`description` | `attack.tNNNN[.NNN]` tags (structured) |

So every parser regex-extracts `CVE-\d{4}-\d{4,7}` from title/description as
a fallback, and every `rule_cve_map` row is tagged with how it was found
(`structured` / `tagged` / `inferred`) in case you want to filter by
confidence later — the UI doesn't currently distinguish them because in
practice the inferred matches are reliable (rule titles are well-formed),
but the data's there.

### What "coverage gap" means

A CVE published (or added to CISA's KEV catalog) within the selected window
that **no non-deleted rule in any of the three repos currently references**.
It is not proof no detection exists anywhere — only that none of these
three repos has shipped one. See `/about` on the running site, and
`app/queries.py::_gap_filters`.

## Local development

Requires Docker. From the repo root:

```bash
cp .env.example .env
# edit .env: at minimum set POSTGRES_PASSWORD and DATABASE_URL to match,
# and SITE_DOMAIN=localhost for local dev.

docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

This exposes Postgres on `5432` and the API directly on `8000` (no Caddy/TLS
locally). Then, in another terminal, run the initial ingest:

```bash
docker compose exec worker python -m app.cli full-sync
```

That takes a few minutes the first time (cloning all three repos + pulling
ATT&CK/KEV/NVD data). Once it finishes, visit http://localhost:8000.

Without Docker: create a venv, `pip install -r backend/requirements-dev.txt`,
point `DATABASE_URL` at a local Postgres, `python -m app.cli init-db`, then
`uvicorn app.main:app --reload` (from `backend/`) and `python -m app.scheduler`
in a second terminal for the worker.

Run tests (parsers are tested against real rule files pulled live from each
repo, not synthetic ones — see `backend/tests/fixtures/`):

```bash
cd backend && pip install -r requirements-dev.txt && python -m pytest tests/ -v
```

## Deploying to your subdomain (VPS + Docker)

Only one process on the VPS can bind port 80/443 at a time — that's an OS
constraint, not something Docker or this app can route around. So which of
the two paths below applies depends entirely on whether anything else on
this box already owns those ports:

- **This VPS is dedicated to this app — nothing else is listening on
  80/443**: use the bundled Caddy. It owns 80/443 and gets you automatic
  HTTPS with no extra config.
- **This VPS already serves other sites** (you run nginx, Apache, or
  another Caddy for your main domain, say): that existing server has to
  stay the single thing holding 80/443. The app publishes to
  `127.0.0.1:8010` instead, and you add one more vhost/site block to your
  existing server that reverse-proxies your subdomain to it — same pattern
  you'd use for any other subdomain-on-shared-VPS. Ready-made configs for
  both nginx and Apache are in `deploy/`.

Common to both paths:

1. **DNS**: point an A/AAAA record for your subdomain (e.g.
   `detect.yourdomain.com`) at the VPS's IP.
2. **Server**: any VPS with Docker + Docker Compose installed. 2GB RAM / 2
   vCPU / 20GB disk is comfortably enough (the three repo clones total
   under 1GB; Postgres data is small).
3. **Clone this repo onto the server**, then `cp .env.example .env` and set
   `POSTGRES_PASSWORD` and `DATABASE_URL` (and `SITE_DOMAIN`/`SITE_URL`).

### Path A — dedicated VPS, bundled Caddy

```bash
docker compose -f docker-compose.yml -f docker-compose.caddy.yml up -d --build
docker compose exec worker python -m app.cli full-sync   # first run only
```

Caddy automatically requests and renews a TLS cert for `SITE_DOMAIN`. After
the first sync finishes, the site is live at `https://SITE_DOMAIN`.

### Path B — behind an existing nginx/Apache/other web server

1. Set up the vhost/site block for your subdomain in your existing web
   server, pointing it at `127.0.0.1:8010` (or your `API_HOST_PORT`). Copy
   from `deploy/nginx.conf.example` or `deploy/apache.conf.example` —
   both include the exact enable-module / enable-site / certbot commands.
2. Get a cert via your existing server's certbot plugin (`certbot --nginx
   -d ...` or `certbot --apache -d ...`) — it edits the vhost it just found
   by `server_name`/`ServerName` to add TLS and a `:80`→`:443` redirect, so
   you don't hand-write any TLS config.
3. Bring up the app stack — **not** the Caddy overlay, since your existing
   server already owns 80/443:
   ```bash
   docker compose -f docker-compose.yml -f docker-compose.local-proxy.yml up -d --build
   docker compose exec worker python -m app.cli full-sync   # first run only
   ```
4. `api` is published to `127.0.0.1` only — reachable from your web server
   on the same host, not directly from the internet, so all traffic is
   forced through your web server's TLS/vhost routing.

Either path: the worker keeps polling on its own from then on (see `.env`
for intervals). Check `/about` on the site for last-sync status per source.

**Get an NVD API key** (free, takes a minute): https://nvd.nist.gov/developers/request-an-api-key —
without one you're limited to 5 requests/30s, which is still enough for this
app's polling cadence, but a key gives more headroom if you lower the poll
intervals later.

### Updating

```bash
git pull
docker compose -f docker-compose.yml -f docker-compose.caddy.yml up -d --build        # path A
docker compose -f docker-compose.yml -f docker-compose.local-proxy.yml up -d --build  # path B
```

Rule/CVE/ATT&CK data isn't lost on redeploy — it lives in the `db_data`
Docker volume, and the git clones live in `repo_cache`, so a redeploy is
fast (no full resync).

### Operational commands

```bash
docker compose exec worker python -m app.cli sync-rules --source sigma
docker compose exec worker python -m app.cli sync-cves
docker compose exec worker python -m app.cli sync-kev
docker compose exec worker python -m app.cli sync-attack
docker compose logs -f worker    # watch the scheduler
docker compose logs -f api
```

## Extending

- **Add a fourth rule source**: add a `parse_<source>.py` following the
  pattern in `app/ingestion/` (each one has a docstring documenting the
  *verified* real-world schema it was built against — don't guess at a
  schema, fetch a live example first), register it in `app/ingestion/ingest.py`'s
  `_EXTENSIONS` / `_PARSERS` / `_URL_BUILDERS` dicts, add its repo config to
  `Settings`, and add the enum value to `RuleSource` in `models.py`.
- **Alembic migrations**: the app currently uses `Base.metadata.create_all()`
  on startup, which is fine for a schema that isn't changing yet. If you
  start evolving the schema against live data, add Alembic before you need
  it, not after.
- **Auth / rate limiting**: the JSON API is wide open by design (same spirit
  as ransomware.live's public API). If you want to rate-limit it, that's a
  Caddy-level concern (`Caddyfile`) — the app itself doesn't need to know.

## Known limitations

- CVE extraction from Sigma/Elastic rule text is regex-based where those
  repos don't provide a structured field. This is accurate for well-formed
  rule titles/descriptions (which is nearly all of them) but can miss a CVE
  mentioned only deep in a rule's `detection:`/`query:` logic, or in a
  non-standard format.
- The "gap" view only reflects these three repos. A CVE can be well-covered
  by a commercial vendor's private detections and still show up as a gap
  here.
- NVD's public API can be slow/rate-limited without an API key; the recent-
  CVE pull and the older-CVE backfill both respect that automatically, but
  full backfill of very old referenced CVEs can take a while.
