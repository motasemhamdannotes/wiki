from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime


@dataclass
class ParsedRule:
    """Normalized output of every source-specific parser. `parse_error` is
    set (and every other field left best-effort) when a file fails to parse
    at all, so ingestion can log-and-skip instead of crashing the batch."""

    source_rule_id: str
    title: str
    description: str | None
    file_path: str
    status: str | None
    level: str | None
    author: str | None
    created_date: datetime | None
    updated_date: datetime | None
    cve_ids: set[str] = field(default_factory=set)
    # cve_id -> True if it came from a structured field (higher confidence)
    cve_confidence: dict[str, str] = field(default_factory=dict)
    technique_ids: set[str] = field(default_factory=set)
    raw_content: str = ""
    parse_error: str | None = None
