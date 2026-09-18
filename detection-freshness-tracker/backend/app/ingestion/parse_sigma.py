"""Parser for SigmaHQ/sigma rule files.

Verified against a real rule (rules-emerging-threats/2021/Exploits/CVE-2021-44228/
web_cve_2021_44228_log4j.yml) fetched live from the repo. Real shape:

    title: Log4j RCE CVE-2021-44228 Generic
    id: 5ea8faa8-db8b-45be-89b0-151b84c82702
    status: test
    description: Detects exploitation attempt against log4j RCE ...
    references: [...]
    author: Florian Roth (Nextron Systems)
    date: 2021-12-10
    modified: 2022-02-06
    tags:
        - attack.initial-access
        - attack.t1190
        - detection.emerging-threats
    logsource: {...}
    detection: {...}
    falsepositives: [...]
    level: high

Notably: this rule has NO `cve.2021-44228` tag even though the spec defines
that convention — the CVE only appears in the title/description as plain
text. So CVE extraction here is regex-first (title+description+references),
with the `cve.*` tag namespace layered on top for rules that do use it.
ATT&CK techniques come from `attack.tNNNN[.NNN]` tags; `attack.<tactic-name>`
tags are tactic references, not techniques, and are ignored here (a rule's
CVE/technique coverage is what matters for this app, not its tactics).
"""
from __future__ import annotations

from datetime import date, datetime
from typing import Any

import yaml

from .normalize import (
    content_hash,
    extract_cves_from_text,
    normalize_cve_tag,
    normalize_technique_tag,
)
from .types import ParsedRule


def _coerce_date(value: Any) -> datetime | None:
    if value is None:
        return None
    if isinstance(value, datetime):
        return value
    if isinstance(value, date):
        return datetime(value.year, value.month, value.day)
    if isinstance(value, str):
        for fmt in ("%Y-%m-%d", "%Y/%m/%d"):
            try:
                return datetime.strptime(value.strip(), fmt)
            except ValueError:
                continue
    return None


def _as_text(value: Any) -> str:
    if value is None:
        return ""
    if isinstance(value, list):
        return "\n".join(str(v) for v in value)
    return str(value)


def parse_sigma_rule(raw_content: str, file_path: str) -> ParsedRule:
    try:
        # A handful of sigma files are multi-document (correlation rules with
        # `---` separators). We only care about the first document, which is
        # always the primary detection with title/id/tags.
        docs = list(yaml.safe_load_all(raw_content))
        data = next((d for d in docs if isinstance(d, dict)), None)
        if data is None:
            raise ValueError("no YAML mapping document found")
    except Exception as exc:  # noqa: BLE001 - deliberately broad, this feeds a skip-and-log path
        return ParsedRule(
            source_rule_id=file_path,
            title=file_path,
            description=None,
            file_path=file_path,
            status=None,
            level=None,
            author=None,
            created_date=None,
            updated_date=None,
            raw_content=raw_content,
            parse_error=f"YAML parse error: {exc}",
        )

    title = str(data.get("title") or file_path)
    description = data.get("description")
    tags = data.get("tags") or []
    if not isinstance(tags, list):
        tags = [tags]
    references = data.get("references") or []

    cve_ids: set[str] = set()
    cve_confidence: dict[str, str] = {}

    for tag in tags:
        cve = normalize_cve_tag(str(tag))
        if cve:
            cve_ids.add(cve)
            cve_confidence[cve] = "tagged"

    inferred = extract_cves_from_text(title, _as_text(description), _as_text(references))
    for cve in inferred:
        cve_ids.add(cve)
        cve_confidence.setdefault(cve, "inferred")

    technique_ids: set[str] = set()
    for tag in tags:
        technique = normalize_technique_tag(str(tag))
        if technique:
            technique_ids.add(technique)

    source_rule_id = str(data.get("id") or file_path)

    return ParsedRule(
        source_rule_id=source_rule_id,
        title=title,
        description=str(description) if description else None,
        file_path=file_path,
        status=str(data.get("status")) if data.get("status") else None,
        level=str(data.get("level")) if data.get("level") else None,
        author=str(data.get("author")) if data.get("author") else None,
        created_date=_coerce_date(data.get("date")),
        updated_date=_coerce_date(data.get("modified") or data.get("date")),
        cve_ids=cve_ids,
        cve_confidence=cve_confidence,
        technique_ids=technique_ids,
        raw_content=raw_content,
    )


def rule_html_url(file_path: str, branch: str = "master") -> str:
    return f"https://github.com/SigmaHQ/sigma/blob/{branch}/{file_path}"


def rule_raw_url(file_path: str, branch: str = "master") -> str:
    return f"https://raw.githubusercontent.com/SigmaHQ/sigma/{branch}/{file_path}"


__all__ = ["parse_sigma_rule", "rule_html_url", "rule_raw_url", "content_hash"]
