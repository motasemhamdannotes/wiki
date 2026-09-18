"""Server-rendered HTML pages. Deliberately plain: GET forms with query
params for filters, no JS framework, no CDN dependency - see the top of
templates/base.html for why.
"""
from __future__ import annotations

from fastapi import APIRouter, Depends, Query, Request
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

from .. import queries
from ..config import get_settings
from ..db import get_db
from ..models import RuleSource

router = APIRouter(include_in_schema=False)
templates = Jinja2Templates(directory="app/templates")
settings = get_settings()


def _fmt_date(value, fmt: str = "%Y-%m-%d") -> str:
    return value.strftime(fmt) if value else "—"


def _fmt_datetime(value, fmt: str = "%Y-%m-%d %H:%M UTC") -> str:
    return value.strftime(fmt) if value else "—"


templates.env.filters["date"] = _fmt_date
templates.env.filters["datetime"] = _fmt_datetime


def _ctx(request: Request, **kwargs) -> dict:
    return {"request": request, "site_url": settings.site_url, **kwargs}


@router.get("/")
def home(request: Request, db: Session = Depends(get_db)):
    stats = queries.get_stats(db)
    gaps = queries.list_gaps(db, days=30, kev_only=False, min_cvss=None, limit=8)
    recent_rules = queries.list_recent_rules(db, limit=8)
    return templates.TemplateResponse(
        "index.html",
        _ctx(request, stats=stats, gaps=gaps, recent_rules=recent_rules),
    )


@router.get("/search")
def search(request: Request, q: str = Query("", max_length=200), db: Session = Depends(get_db)):
    q = q.strip()
    if not q:
        return RedirectResponse("/")

    result = queries.search(db, q)
    if result.kind == "cve":
        return RedirectResponse(f"/cve/{result.cve.cve_id}")
    if result.kind == "technique":
        return RedirectResponse(f"/technique/{result.technique.technique_id}")
    return templates.TemplateResponse("search_results.html", _ctx(request, result=result))


@router.get("/cve/{cve_id}")
def cve_detail(request: Request, cve_id: str, db: Session = Depends(get_db)):
    cve = queries.get_cve(db, cve_id)
    rules = queries.rules_for_cve(db, cve_id)
    return templates.TemplateResponse(
        "cve_detail.html",
        _ctx(request, cve=cve, cve_id=cve_id.upper(), rules=rules),
    )


@router.get("/technique/{technique_id}")
def technique_detail(request: Request, technique_id: str, db: Session = Depends(get_db)):
    technique = queries.get_technique(db, technique_id)
    rules = queries.rules_for_technique(db, technique_id)
    return templates.TemplateResponse(
        "technique_detail.html",
        _ctx(request, technique=technique, technique_id=technique_id.upper(), rules=rules),
    )


@router.get("/rules")
def rules(
    request: Request,
    source: str = Query(""),
    page: int = Query(1, ge=1),
    db: Session = Depends(get_db),
):
    per_page = 40
    source_enum = None
    if source:
        try:
            source_enum = RuleSource(source)
        except ValueError:
            source_enum = None
    rows = queries.list_recent_rules(db, source=source_enum, limit=per_page + 1, offset=(page - 1) * per_page)
    has_next = len(rows) > per_page
    rows = rows[:per_page]
    return templates.TemplateResponse(
        "rules.html",
        _ctx(request, rules=rows, source=source, page=page, has_next=has_next, sources=list(RuleSource)),
    )


@router.get("/gaps")
def gaps(
    request: Request,
    days: int = Query(30, ge=0, le=3650),
    kev_only: bool = Query(False),
    min_cvss: float | None = Query(None, ge=0, le=10),
    page: int = Query(1, ge=1),
    db: Session = Depends(get_db),
):
    per_page = 40
    rows = queries.list_gaps(
        db, days=days, kev_only=kev_only, min_cvss=min_cvss, limit=per_page + 1, offset=(page - 1) * per_page
    )
    has_next = len(rows) > per_page
    rows = rows[:per_page]
    total = queries.count_gaps(db, days=days, kev_only=kev_only, min_cvss=min_cvss)
    return templates.TemplateResponse(
        "gaps.html",
        _ctx(
            request, gaps=rows, days=days, kev_only=kev_only, min_cvss=min_cvss,
            page=page, has_next=has_next, total=total,
        ),
    )


@router.get("/about")
def about(request: Request, db: Session = Depends(get_db)):
    stats = queries.get_stats(db)
    return templates.TemplateResponse("about.html", _ctx(request, stats=stats, settings=settings))
