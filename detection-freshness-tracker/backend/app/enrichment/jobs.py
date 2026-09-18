"""Enrichment orchestration: pulls from NVD / CISA KEV / MITRE ATT&CK and
upserts into the DB. Called by the scheduler (app/scheduler.py) and by the
CLI for manual backfills.
"""
from __future__ import annotations

import logging
from datetime import datetime, timedelta, timezone

from sqlalchemy import select
from sqlalchemy.orm import Session

from ..config import Settings
from ..models import AttackTechnique, CVE, EnrichmentState
from . import kev as kev_mod
from .attack import fetch_techniques
from .nvd import NvdClient, best_cvss, description, modified_at, published_at

logger = logging.getLogger(__name__)


def _touch_state(session: Session, feed: str, ok: bool, error: str | None = None) -> None:
    state = session.get(EnrichmentState, feed)
    if state is None:
        state = EnrichmentState(feed=feed)
        session.add(state)
    state.last_run_at = datetime.now(timezone.utc)
    state.last_run_ok = ok
    state.last_error = error


def _apply_nvd_data(cve_row: CVE, cve_data: dict) -> None:
    cve_row.description = description(cve_data)
    cve_row.published_date = published_at(cve_data)
    cve_row.last_modified_date = modified_at(cve_data)
    score, version, severity = best_cvss(cve_data)
    cve_row.cvss_score = score
    cve_row.cvss_version = version
    cve_row.cvss_severity = severity
    cve_row.raw_nvd_data = cve_data
    cve_row.enriched = True
    cve_row.last_enriched_at = datetime.now(timezone.utc)


def enrich_recent_cves(session: Session, settings: Settings) -> int:
    """Pull every CVE published in the last `nvd_lookback_days` days and
    upsert it - this is what powers the coverage-gap view."""
    client = NvdClient(api_key=settings.nvd_api_key)
    since = datetime.now(timezone.utc) - timedelta(days=settings.nvd_lookback_days)
    try:
        cve_list = client.get_recent(since)
    except Exception as exc:  # noqa: BLE001
        logger.exception("NVD recent-CVE pull failed")
        _touch_state(session, "nvd_recent", ok=False, error=str(exc))
        return 0

    count = 0
    for cve_data in cve_list:
        cve_id = cve_data.get("id")
        if not cve_id:
            continue
        row = session.get(CVE, cve_id)
        if row is None:
            row = CVE(cve_id=cve_id)
            session.add(row)
        _apply_nvd_data(row, cve_data)
        count += 1

    _touch_state(session, "nvd_recent", ok=True)
    logger.info("NVD recent-CVE pull: %d CVEs upserted (since %s)", count, since.date())
    return count


def enrich_stale_referenced_cves(session: Session, settings: Settings, limit: int = 100) -> int:
    """Individually fetch CVEs that some rule references but that the bulk
    recent-CVE pull hasn't covered (older CVEs, or ones NVD published outside
    the lookback window). Capped per run to stay within NVD's rate limit."""
    client = NvdClient(api_key=settings.nvd_api_key)
    stale = session.execute(select(CVE).where(CVE.enriched.is_(False)).limit(limit)).scalars().all()

    count = 0
    for row in stale:
        try:
            cve_data = client.get_cve(row.cve_id)
        except Exception as exc:  # noqa: BLE001
            logger.warning("NVD lookup failed for %s: %s", row.cve_id, exc)
            continue
        if cve_data is None:
            # NVD has no record (bad ID, reserved-but-unpublished, etc). Mark
            # enriched anyway so we stop retrying it every cycle.
            row.enriched = True
            row.last_enriched_at = datetime.now(timezone.utc)
            continue
        _apply_nvd_data(row, cve_data)
        count += 1

    if stale:
        _touch_state(session, "nvd_backfill", ok=True)
    logger.info("NVD backfill: %d/%d stale CVEs enriched", count, len(stale))
    return count


def sync_kev(session: Session, settings: Settings) -> int:
    try:
        catalog = kev_mod.fetch_kev_catalog(settings.cisa_kev_url)
    except Exception as exc:  # noqa: BLE001
        logger.exception("CISA KEV pull failed")
        _touch_state(session, "kev", ok=False, error=str(exc))
        return 0

    count = 0
    for cve_id, entry in catalog.items():
        row = session.get(CVE, cve_id)
        if row is None:
            # Create a stub even without NVD data yet, so the KEV filter on
            # the gap view is complete regardless of NVD pull timing.
            row = CVE(cve_id=cve_id, enriched=False)
            session.add(row)
        row.is_kev = True
        row.kev_date_added = kev_mod.kev_date_added(entry)
        row.kev_ransomware_use = entry.get("knownRansomwareCampaignUse")
        count += 1

    _touch_state(session, "kev", ok=True)
    logger.info("CISA KEV sync: %d entries", count)
    return count


def sync_attack_techniques(session: Session, settings: Settings) -> int:
    try:
        techniques = fetch_techniques(settings.attack_stix_url)
    except Exception as exc:  # noqa: BLE001
        logger.exception("MITRE ATT&CK pull failed")
        _touch_state(session, "attack", ok=False, error=str(exc))
        return 0

    count = 0
    for t in techniques:
        row = session.get(AttackTechnique, t.technique_id)
        if row is None:
            row = AttackTechnique(technique_id=t.technique_id)
            session.add(row)
        row.name = t.name
        row.tactic_names = ", ".join(t.tactic_names) if t.tactic_names else None
        row.is_subtechnique = t.is_subtechnique
        row.parent_technique_id = t.parent_technique_id
        row.url = t.url
        row.is_deprecated = t.is_deprecated
        count += 1

    _touch_state(session, "attack", ok=True)
    logger.info("MITRE ATT&CK sync: %d techniques", count)
    return count
