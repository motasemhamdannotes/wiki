"""Query layer shared by the JSON API and the HTML page routes, so the two
never drift on what "covered" / "gap" actually means.
"""
from __future__ import annotations

import re
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone

from sqlalchemy import and_, func, not_, or_, select
from sqlalchemy.orm import Session

from .models import CVE, AttackTechnique, EnrichmentState, IngestState, Rule, RuleCVE, RuleSource, RuleTechnique

_CVE_RE = re.compile(r"^CVE-\d{4}-\d{4,7}$", re.IGNORECASE)
_TECHNIQUE_RE = re.compile(r"^T\d{4}(\.\d{3})?$", re.IGNORECASE)


# ---------------------------------------------------------------------------
# Stats / health
# ---------------------------------------------------------------------------

def get_stats(session: Session) -> dict:
    rule_counts = dict(
        session.execute(
            select(Rule.source, func.count(Rule.id)).where(Rule.is_deleted.is_(False)).group_by(Rule.source)
        ).all()
    )
    total_rules = sum(rule_counts.values())
    total_cves = session.execute(select(func.count()).select_from(CVE)).scalar_one()
    total_techniques = session.execute(select(func.count()).select_from(AttackTechnique)).scalar_one()

    gap_30d = count_gaps(session, days=30, kev_only=False, min_cvss=None)
    gap_kev = count_gaps(session, days=0, kev_only=True, min_cvss=None)

    ingest_states = session.execute(select(IngestState)).scalars().all()
    enrich_states = session.execute(select(EnrichmentState)).scalars().all()

    return {
        "rule_counts": {source.value: rule_counts.get(source, 0) for source in RuleSource},
        "total_rules": total_rules,
        "total_cves_tracked": total_cves,
        "total_techniques_tracked": total_techniques,
        "gap_count_30d": gap_30d,
        "gap_count_kev": gap_kev,
        "sources": [
            {
                "source": s.source.value,
                "last_synced_at": s.last_synced_at,
                "ok": s.last_sync_ok,
            }
            for s in ingest_states
        ],
        "feeds": [
            {"feed": e.feed, "last_run_at": e.last_run_at, "ok": e.last_run_ok}
            for e in enrich_states
        ],
    }


# ---------------------------------------------------------------------------
# Coverage gaps - the headline feature
# ---------------------------------------------------------------------------

def _covered_cve_ids_subquery():
    return (
        select(RuleCVE.cve_id)
        .join(Rule, Rule.id == RuleCVE.rule_id)
        .where(Rule.is_deleted.is_(False))
        .distinct()
    )


def _gap_filters(days: int, kev_only: bool, min_cvss: float | None):
    covered = _covered_cve_ids_subquery()
    filters = [not_(CVE.cve_id.in_(covered))]

    if kev_only:
        filters.append(CVE.is_kev.is_(True))
    elif days and days > 0:
        cutoff = datetime.now(timezone.utc) - timedelta(days=days)
        filters.append(
            or_(
                CVE.published_date >= cutoff,
                and_(CVE.is_kev.is_(True), CVE.kev_date_added >= cutoff),
            )
        )

    if min_cvss is not None:
        filters.append(CVE.cvss_score >= min_cvss)

    return filters


def count_gaps(session: Session, days: int, kev_only: bool, min_cvss: float | None) -> int:
    stmt = select(func.count()).select_from(CVE).where(*_gap_filters(days, kev_only, min_cvss))
    return session.execute(stmt).scalar_one()


def list_gaps(
    session: Session,
    days: int = 30,
    kev_only: bool = False,
    min_cvss: float | None = None,
    limit: int = 50,
    offset: int = 0,
) -> list[CVE]:
    stmt = (
        select(CVE)
        .where(*_gap_filters(days, kev_only, min_cvss))
        .order_by(
            CVE.is_kev.desc(),
            CVE.cvss_score.desc().nulls_last(),
            CVE.published_date.desc().nulls_last(),
        )
        .limit(limit)
        .offset(offset)
    )
    return list(session.execute(stmt).scalars().all())


# ---------------------------------------------------------------------------
# Rule browsing
# ---------------------------------------------------------------------------

def list_recent_rules(
    session: Session, source: RuleSource | None = None, limit: int = 50, offset: int = 0
) -> list[Rule]:
    stmt = select(Rule).where(Rule.is_deleted.is_(False))
    if source is not None:
        stmt = stmt.where(Rule.source == source)
    stmt = stmt.order_by(Rule.updated_date_native.desc().nulls_last(), Rule.last_seen_at.desc()).limit(limit).offset(offset)
    return list(session.execute(stmt).scalars().all())


# ---------------------------------------------------------------------------
# CVE / technique detail
# ---------------------------------------------------------------------------

def get_cve(session: Session, cve_id: str) -> CVE | None:
    return session.get(CVE, cve_id.upper())


def rules_for_cve(session: Session, cve_id: str) -> list[Rule]:
    stmt = (
        select(Rule)
        .join(RuleCVE, RuleCVE.rule_id == Rule.id)
        .where(RuleCVE.cve_id == cve_id.upper(), Rule.is_deleted.is_(False))
        .order_by(Rule.updated_date_native.desc().nulls_last())
    )
    return list(session.execute(stmt).scalars().all())


def get_technique(session: Session, technique_id: str) -> AttackTechnique | None:
    return session.get(AttackTechnique, technique_id.upper())


def rules_for_technique(session: Session, technique_id: str) -> list[Rule]:
    stmt = (
        select(Rule)
        .join(RuleTechnique, RuleTechnique.rule_id == Rule.id)
        .where(RuleTechnique.technique_id == technique_id.upper(), Rule.is_deleted.is_(False))
        .order_by(Rule.updated_date_native.desc().nulls_last())
    )
    return list(session.execute(stmt).scalars().all())


# ---------------------------------------------------------------------------
# Search - the "is there a detection for this yet?" box
# ---------------------------------------------------------------------------

@dataclass
class SearchResult:
    kind: str  # "cve" | "technique" | "rules"
    query: str
    cve: CVE | None = None
    cve_rules: list[Rule] | None = None
    technique: AttackTechnique | None = None
    technique_rules: list[Rule] | None = None
    rules: list[Rule] | None = None


def search(session: Session, query: str, limit: int = 25) -> SearchResult:
    q = query.strip()

    if _CVE_RE.match(q):
        cve_id = q.upper()
        cve = get_cve(session, cve_id)
        rules = rules_for_cve(session, cve_id)
        if cve is None and rules:
            # Rules reference it but enrichment hasn't created the row yet -
            # synthesize a bare-minimum placeholder so the page still renders.
            cve = CVE(cve_id=cve_id, enriched=False)
        return SearchResult(kind="cve", query=q, cve=cve, cve_rules=rules)

    if _TECHNIQUE_RE.match(q):
        technique_id = q.upper()
        technique = get_technique(session, technique_id)
        rules = rules_for_technique(session, technique_id)
        if technique is None and rules:
            technique = AttackTechnique(technique_id=technique_id, name=technique_id)
        return SearchResult(kind="technique", query=q, technique=technique, technique_rules=rules)

    like = f"%{q}%"
    stmt = (
        select(Rule)
        .where(Rule.is_deleted.is_(False), or_(Rule.title.ilike(like), Rule.description.ilike(like)))
        .order_by(Rule.updated_date_native.desc().nulls_last())
        .limit(limit)
    )
    rules = list(session.execute(stmt).scalars().all())
    return SearchResult(kind="rules", query=q, rules=rules)
