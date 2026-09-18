"""Manual operator commands, run inside the worker or api container, e.g.:

    docker compose exec worker python -m app.cli init-db
    docker compose exec worker python -m app.cli full-sync
    docker compose exec worker python -m app.cli sync-rules --source sigma
"""
from __future__ import annotations

import argparse
import logging
import sys

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s [%(name)s] %(message)s", stream=sys.stdout)


def main() -> None:
    parser = argparse.ArgumentParser(prog="app.cli")
    sub = parser.add_subparsers(dest="command", required=True)

    sub.add_parser("init-db", help="Create database tables if they don't exist.")
    sub.add_parser("full-sync", help="Run every ingestion + enrichment job once, in dependency order.")

    sync_rules = sub.add_parser("sync-rules", help="Sync rule repo(s).")
    sync_rules.add_argument("--source", choices=["sigma", "elastic", "splunk"], default=None, help="Default: all three.")

    sub.add_parser("sync-cves", help="Pull recent CVEs from NVD + backfill stale referenced CVEs.")
    sub.add_parser("sync-kev", help="Sync the CISA KEV catalog.")
    sub.add_parser("sync-attack", help="Sync MITRE ATT&CK techniques.")

    args = parser.parse_args()

    # Imported lazily so `--help` doesn't require a working DB connection.
    from .config import get_settings
    from .db import init_db, session_scope
    from .enrichment.jobs import enrich_recent_cves, enrich_stale_referenced_cves, sync_attack_techniques, sync_kev
    from .ingestion.ingest import sync_source
    from .models import RuleSource

    settings = get_settings()

    if args.command == "init-db":
        init_db()
        print("Database tables created.")
    elif args.command == "full-sync":
        from .scheduler import run_all_once

        init_db()
        run_all_once()
    elif args.command == "sync-rules":
        sources = [RuleSource(args.source)] if args.source else list(RuleSource)
        for source in sources:
            with session_scope() as session:
                summary = sync_source(source, settings, session)
            print(f"{source.value}: {summary}")
    elif args.command == "sync-cves":
        with session_scope() as session:
            n = enrich_recent_cves(session, settings)
            m = enrich_stale_referenced_cves(session, settings, limit=200)
        print(f"recent={n} backfilled={m}")
    elif args.command == "sync-kev":
        with session_scope() as session:
            n = sync_kev(session, settings)
        print(f"kev_entries={n}")
    elif args.command == "sync-attack":
        with session_scope() as session:
            n = sync_attack_techniques(session, settings)
        print(f"techniques={n}")


if __name__ == "__main__":
    main()
