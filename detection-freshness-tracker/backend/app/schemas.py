"""Pydantic response models for the public JSON API (app/routers/api.py)."""
from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict


class RuleOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    source: str
    title: str
    status: str | None
    level: str | None
    author: str | None
    html_url: str
    updated_date_native: datetime | None
    created_date_native: datetime | None

    @classmethod
    def from_rule(cls, rule) -> "RuleOut":
        return cls(
            source=rule.source.value,
            title=rule.title,
            status=rule.status,
            level=rule.level,
            author=rule.author,
            html_url=rule.html_url,
            updated_date_native=rule.updated_date_native,
            created_date_native=rule.created_date_native,
        )


class CVEOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    cve_id: str
    description: str | None = None
    published_date: datetime | None = None
    cvss_score: float | None = None
    cvss_version: str | None = None
    cvss_severity: str | None = None
    is_kev: bool = False
    kev_date_added: datetime | None = None
    enriched: bool = False


class CVEDetailOut(BaseModel):
    cve: CVEOut
    rule_count: int
    rules: list[RuleOut]


class TechniqueOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    technique_id: str
    name: str
    tactic_names: str | None = None
    is_subtechnique: bool = False
    url: str | None = None


class TechniqueDetailOut(BaseModel):
    technique: TechniqueOut
    rule_count: int
    rules: list[RuleOut]


class GapOut(BaseModel):
    cve: CVEOut


class StatsOut(BaseModel):
    rule_counts: dict[str, int]
    total_rules: int
    total_cves_tracked: int
    total_techniques_tracked: int
    gap_count_30d: int
    gap_count_kev: int
    sources: list[dict]
    feeds: list[dict]


class SearchOut(BaseModel):
    kind: str
    query: str
    cve: CVEOut | None = None
    cve_rules: list[RuleOut] | None = None
    technique: TechniqueOut | None = None
    technique_rules: list[RuleOut] | None = None
    rules: list[RuleOut] | None = None
