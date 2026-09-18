"""Public JSON API. No auth - this is meant to be consumed by other blue-team
tooling, scripts, and dashboards, same spirit as ransomware.live's public API.
"""
from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from .. import queries
from ..db import get_db
from ..models import RuleSource
from ..schemas import CVEDetailOut, CVEOut, GapOut, SearchOut, StatsOut, TechniqueDetailOut, TechniqueOut, RuleOut

router = APIRouter(prefix="/api", tags=["api"])


@router.get("/stats", response_model=StatsOut)
def stats(db: Session = Depends(get_db)):
    return queries.get_stats(db)


@router.get("/gaps", response_model=list[GapOut])
def gaps(
    days: int = Query(30, ge=0, le=3650, description="0 = ignore publish date (used automatically when kev_only=true)"),
    kev_only: bool = Query(False),
    min_cvss: float | None = Query(None, ge=0, le=10),
    limit: int = Query(50, ge=1, le=200),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
):
    rows = queries.list_gaps(db, days=days, kev_only=kev_only, min_cvss=min_cvss, limit=limit, offset=offset)
    return [GapOut(cve=CVEOut.model_validate(r)) for r in rows]


@router.get("/rules", response_model=list[RuleOut])
def rules(
    source: RuleSource | None = None,
    limit: int = Query(50, ge=1, le=200),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
):
    rows = queries.list_recent_rules(db, source=source, limit=limit, offset=offset)
    return [RuleOut.from_rule(r) for r in rows]


@router.get("/cve/{cve_id}", response_model=CVEDetailOut)
def cve_detail(cve_id: str, db: Session = Depends(get_db)):
    cve = queries.get_cve(db, cve_id)
    rules_ = queries.rules_for_cve(db, cve_id)
    if cve is None and not rules_:
        raise HTTPException(status_code=404, detail=f"{cve_id} not found")
    # A CVE row always exists once any rule references it (the ingest layer
    # creates a stub row before it creates the junction row), so `cve` can
    # only be None here if `rules_` is also empty - already handled above.
    return CVEDetailOut(
        cve=CVEOut.model_validate(cve),
        rule_count=len(rules_),
        rules=[RuleOut.from_rule(r) for r in rules_],
    )


@router.get("/technique/{technique_id}", response_model=TechniqueDetailOut)
def technique_detail(technique_id: str, db: Session = Depends(get_db)):
    technique = queries.get_technique(db, technique_id)
    rules_ = queries.rules_for_technique(db, technique_id)
    if technique is None and not rules_:
        raise HTTPException(status_code=404, detail=f"{technique_id} not found")
    # As with CVEs: a technique row always exists once any rule references it.
    return TechniqueDetailOut(
        technique=TechniqueOut.model_validate(technique),
        rule_count=len(rules_),
        rules=[RuleOut.from_rule(r) for r in rules_],
    )


@router.get("/search", response_model=SearchOut)
def search(q: str = Query(..., min_length=2, max_length=200), db: Session = Depends(get_db)):
    result = queries.search(db, q)
    return SearchOut(
        kind=result.kind,
        query=result.query,
        cve=CVEOut.model_validate(result.cve) if result.cve is not None else None,
        cve_rules=[RuleOut.from_rule(r) for r in result.cve_rules] if result.cve_rules is not None else None,
        technique=TechniqueOut.model_validate(result.technique) if result.technique is not None else None,
        technique_rules=[RuleOut.from_rule(r) for r in result.technique_rules] if result.technique_rules is not None else None,
        rules=[RuleOut.from_rule(r) for r in result.rules] if result.rules is not None else None,
    )
