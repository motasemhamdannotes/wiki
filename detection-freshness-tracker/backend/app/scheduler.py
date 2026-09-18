"""Worker process entrypoint. Runs ingestion + enrichment jobs on a schedule.

Deliberately a single long-running APScheduler process rather than
Celery+broker: at this app's scale (a handful of jobs, hours-long intervals,
one worker) a message broker is pure ops overhead. If this ever needs to
scale to multiple workers, swap BlockingScheduler for Celery beat + workers
without touching the job functions themselves - they're plain
`(session, settings) -> int` calls with no scheduler-specific code inside.
"""
from __future__ import annotations

import logging
import sys
import time

from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.triggers.interval import IntervalTrigger

from .config import get_settings
from .db import init_db, session_scope
from .enrichment.jobs import enrich_recent_cves, enrich_stale_referenced_cves, sync_attack_techniques, sync_kev
from .ingestion.ingest import sync_source
from .models import RuleSource

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
    stream=sys.stdout,
)
logger = logging.getLogger("scheduler")

settings = get_settings()


def job_sync_rules() -> None:
    for source in RuleSource:
        try:
            with session_scope() as session:
                summary = sync_source(source, settings, session)
            logger.info(
                "[%s] parsed_ok=%d parse_errors=%d deleted=%d skipped=%d",
                source.value, summary.parsed_ok, summary.parse_errors, summary.deleted, summary.skipped_non_rule,
            )
        except Exception:  # noqa: BLE001
            logger.exception("Rule sync failed for source=%s", source.value)


def job_enrich_recent_cves() -> None:
    try:
        with session_scope() as session:
            enrich_recent_cves(session, settings)
            enrich_stale_referenced_cves(session, settings, limit=150)
    except Exception:  # noqa: BLE001
        logger.exception("NVD enrichment job failed")


def job_sync_kev() -> None:
    try:
        with session_scope() as session:
            sync_kev(session, settings)
    except Exception:  # noqa: BLE001
        logger.exception("KEV sync job failed")


def job_sync_attack() -> None:
    try:
        with session_scope() as session:
            sync_attack_techniques(session, settings)
    except Exception:  # noqa: BLE001
        logger.exception("ATT&CK sync job failed")


def run_all_once() -> None:
    """Used on cold start (so the site has data immediately) and by the CLI's
    `full-sync` command."""
    job_sync_attack()
    job_sync_kev()
    job_enrich_recent_cves()
    job_sync_rules()


def main() -> None:
    init_db()

    logger.info("Running initial sync before entering the schedule loop...")
    run_all_once()

    scheduler = BlockingScheduler(timezone="UTC")
    scheduler.add_job(
        job_sync_rules, IntervalTrigger(minutes=settings.rules_poll_interval_minutes),
        id="sync_rules", max_instances=1, coalesce=True,
    )
    scheduler.add_job(
        job_enrich_recent_cves, IntervalTrigger(minutes=settings.nvd_recent_poll_interval_minutes),
        id="enrich_cves", max_instances=1, coalesce=True,
    )
    scheduler.add_job(
        job_sync_kev, IntervalTrigger(minutes=settings.kev_poll_interval_minutes),
        id="sync_kev", max_instances=1, coalesce=True,
    )
    scheduler.add_job(
        job_sync_attack, IntervalTrigger(hours=settings.attack_poll_interval_hours),
        id="sync_attack", max_instances=1, coalesce=True,
    )

    logger.info(
        "Scheduler started. rules=%dmin nvd=%dmin kev=%dmin attack=%dh",
        settings.rules_poll_interval_minutes, settings.nvd_recent_poll_interval_minutes,
        settings.kev_poll_interval_minutes, settings.attack_poll_interval_hours,
    )
    try:
        scheduler.start()
    except (KeyboardInterrupt, SystemExit):
        pass


if __name__ == "__main__":
    main()
