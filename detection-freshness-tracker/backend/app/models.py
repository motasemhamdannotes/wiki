"""Database schema.

Three rule sources feed one normalized `rules` table. Each rule is linked to
zero or more CVEs and zero or more ATT&CK techniques via junction tables, so
"is there a detection for CVE-X / T-Y yet" is a single join.
"""
from __future__ import annotations

import enum
import uuid
from datetime import datetime

from sqlalchemy import (
    Boolean,
    DateTime,
    Enum,
    Float,
    ForeignKey,
    Index,
    Integer,
    String,
    Text,
    UniqueConstraint,
    func,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .db import Base


def _uuid() -> str:
    return str(uuid.uuid4())


class RuleSource(str, enum.Enum):
    sigma = "sigma"
    elastic = "elastic"
    splunk = "splunk"


class MatchConfidence(str, enum.Enum):
    structured = "structured"  # came from a dedicated metadata field (e.g. splunk `cve:`)
    tagged = "tagged"          # came from a tag namespace (e.g. sigma `cve.2021-44228`)
    inferred = "inferred"      # regex-extracted from free text (title/description)


class Rule(Base):
    __tablename__ = "rules"
    __table_args__ = (
        UniqueConstraint("source", "source_rule_id", name="uq_rule_source_id"),
        Index("ix_rules_source", "source"),
        Index("ix_rules_updated_native", "updated_date_native"),
    )

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    source: Mapped[RuleSource] = mapped_column(Enum(RuleSource, name="rule_source"), nullable=False)
    source_rule_id: Mapped[str] = mapped_column(String(255), nullable=False)

    title: Mapped[str] = mapped_column(String(500), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    file_path: Mapped[str] = mapped_column(String(1000), nullable=False)
    html_url: Mapped[str] = mapped_column(String(1000), nullable=False)
    raw_url: Mapped[str] = mapped_column(String(1000), nullable=False)

    status: Mapped[str | None] = mapped_column(String(50), nullable=True)  # test/production/experimental/deprecated...
    level: Mapped[str | None] = mapped_column(String(50), nullable=True)   # severity/risk level, normalized to a string
    author: Mapped[str | None] = mapped_column(String(500), nullable=True)

    # Dates as reported by the rule file itself (may be missing/unparseable).
    created_date_native: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    updated_date_native: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    # Our own bookkeeping.
    content_hash: Mapped[str] = mapped_column(String(64), nullable=False)
    raw_content: Mapped[str] = mapped_column(Text, nullable=False)
    first_seen_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    last_seen_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
    is_deleted: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    cves: Mapped[list["RuleCVE"]] = relationship(back_populates="rule", cascade="all, delete-orphan")
    techniques: Mapped[list["RuleTechnique"]] = relationship(back_populates="rule", cascade="all, delete-orphan")


class CVE(Base):
    __tablename__ = "cves"

    cve_id: Mapped[str] = mapped_column(String(20), primary_key=True)  # e.g. CVE-2021-44228
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    published_date: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    last_modified_date: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    cvss_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    cvss_version: Mapped[str | None] = mapped_column(String(10), nullable=True)
    cvss_severity: Mapped[str | None] = mapped_column(String(20), nullable=True)

    is_kev: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    kev_date_added: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    kev_ransomware_use: Mapped[str | None] = mapped_column(String(10), nullable=True)

    # Rules can reference a CVE we haven't fetched full NVD metadata for yet
    # (e.g. NVD hasn't published it, or the enrichment job hasn't run). This
    # flag distinguishes "we don't know" from "confirmed no metadata".
    enriched: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    raw_nvd_data: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    last_enriched_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    rules: Mapped[list["RuleCVE"]] = relationship(back_populates="cve", cascade="all, delete-orphan")


class AttackTechnique(Base):
    __tablename__ = "attack_techniques"

    technique_id: Mapped[str] = mapped_column(String(20), primary_key=True)  # e.g. T1190, T1055.001
    name: Mapped[str] = mapped_column(String(500), nullable=False)
    tactic_names: Mapped[str | None] = mapped_column(String(500), nullable=True)  # comma-joined for simplicity
    is_subtechnique: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    parent_technique_id: Mapped[str | None] = mapped_column(String(20), nullable=True)
    url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    is_deprecated: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    rules: Mapped[list["RuleTechnique"]] = relationship(back_populates="technique", cascade="all, delete-orphan")


class RuleCVE(Base):
    __tablename__ = "rule_cve_map"
    __table_args__ = (UniqueConstraint("rule_id", "cve_id", name="uq_rule_cve"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    rule_id: Mapped[str] = mapped_column(String(36), ForeignKey("rules.id", ondelete="CASCADE"), nullable=False)
    cve_id: Mapped[str] = mapped_column(String(20), ForeignKey("cves.cve_id", ondelete="CASCADE"), nullable=False)
    confidence: Mapped[MatchConfidence] = mapped_column(
        Enum(MatchConfidence, name="match_confidence"), nullable=False, default=MatchConfidence.inferred
    )

    rule: Mapped[Rule] = relationship(back_populates="cves")
    cve: Mapped[CVE] = relationship(back_populates="rules")


class RuleTechnique(Base):
    __tablename__ = "rule_technique_map"
    __table_args__ = (UniqueConstraint("rule_id", "technique_id", name="uq_rule_technique"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    rule_id: Mapped[str] = mapped_column(String(36), ForeignKey("rules.id", ondelete="CASCADE"), nullable=False)
    technique_id: Mapped[str] = mapped_column(
        String(20), ForeignKey("attack_techniques.technique_id", ondelete="CASCADE"), nullable=False
    )

    rule: Mapped[Rule] = relationship(back_populates="techniques")
    technique: Mapped[AttackTechnique] = relationship(back_populates="rules")


class IngestState(Base):
    """One row per tracked git repo: last commit SHA we fully processed, so
    the worker can `git fetch` + diff instead of re-parsing everything."""

    __tablename__ = "ingest_state"

    source: Mapped[RuleSource] = mapped_column(Enum(RuleSource, name="rule_source"), primary_key=True)
    last_commit_sha: Mapped[str | None] = mapped_column(String(64), nullable=True)
    last_synced_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    last_sync_ok: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    last_error: Mapped[str | None] = mapped_column(Text, nullable=True)


class EnrichmentState(Base):
    """One row per enrichment feed (nvd_recent, kev, attack) tracking last run."""

    __tablename__ = "enrichment_state"

    feed: Mapped[str] = mapped_column(String(50), primary_key=True)
    last_run_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    last_run_ok: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    last_error: Mapped[str | None] = mapped_column(Text, nullable=True)
