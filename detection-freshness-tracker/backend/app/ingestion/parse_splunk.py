"""Parser for splunk/security_content (ESCU) detection files (YAML).

Verified against a real detection (detections/web/
confluence_unauthenticated_remote_code_execution_cve_2022_26134.yml) fetched
live from the repo. Real (current) shape:

    name: Confluence Unauthenticated Remote Code Execution CVE-2022-26134
    id: fcf4bd3f-a79f-4b7a-83bf-2692d60b859c
    version: 10
    creation_date: '2022-06-03'
    modification_date: '2026-05-13'
    status: production
    description: |
        The following analytic detects attempts to exploit CVE-2022-26134 ...
    references: [...]
    cve:
        - CVE-2022-26134
    mitre_attack_id:
        - T1505
        - T1190
        - T1133

This is the best-behaved of the three sources: `cve` and `mitre_attack_id`
are dedicated, structured, top-level fields — no regex guessing needed for
the common case. Older ESCU schema revisions nested these same fields under
a `tags:` block instead, so that shape is checked as a fallback for rules
that haven't been migrated, plus a text-regex fallback as a last resort so a
schema drift never means silently losing a rule's CVE coverage.
"""
from __future__ import annotations

from datetime import datetime
from typing import Any

import yaml

from .normalize import extract_cves_from_text, normalize_technique_id
from .types import ParsedRule


def _coerce_date(value: Any) -> datetime | None:
    if value is None:
        return None
    if isinstance(value, datetime):
        return value
    text = str(value).strip()
    for fmt in ("%Y-%m-%d", "%Y-%m-%dT%H:%M:%S", "%Y/%m/%d"):
        try:
            return datetime.strptime(text, fmt)
        except ValueError:
            continue
    return None


def _as_list(value: Any) -> list:
    if value is None:
        return []
    if isinstance(value, list):
        return value
    return [value]


def _as_text(value: Any) -> str:
    if value is None:
        return ""
    if isinstance(value, list):
        return "\n".join(str(v) for v in value)
    return str(value)


def parse_splunk_rule(raw_content: str, file_path: str) -> ParsedRule:
    try:
        data = yaml.safe_load(raw_content)
        if not isinstance(data, dict):
            raise ValueError("YAML root is not a mapping")
    except Exception as exc:  # noqa: BLE001
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

    tags_block = data.get("tags") if isinstance(data.get("tags"), dict) else {}

    title = str(data.get("name") or file_path)
    description = data.get("description")
    references = data.get("references") or []

    raw_cves = _as_list(data.get("cve")) or _as_list(tags_block.get("cve"))
    cve_ids: set[str] = set()
    cve_confidence: dict[str, str] = {}
    for cve in raw_cves:
        cve_text = str(cve).strip().upper()
        if cve_text:
            cve_ids.add(cve_text)
            cve_confidence[cve_text] = "structured"

    inferred = extract_cves_from_text(title, _as_text(description), _as_text(references))
    for cve in inferred:
        cve_ids.add(cve)
        cve_confidence.setdefault(cve, "inferred")

    raw_techniques = _as_list(data.get("mitre_attack_id")) or _as_list(tags_block.get("mitre_attack_id"))
    technique_ids: set[str] = set()
    for t in raw_techniques:
        tid = normalize_technique_id(str(t))
        if tid:
            technique_ids.add(tid)

    source_rule_id = str(data.get("id") or file_path)

    return ParsedRule(
        source_rule_id=source_rule_id,
        title=title,
        description=str(description) if description else None,
        file_path=file_path,
        status=str(data.get("status")) if data.get("status") else None,
        level=str(tags_block.get("severity")) if tags_block.get("severity") else None,
        author=str(data.get("author")) if data.get("author") else None,
        created_date=_coerce_date(data.get("creation_date") or data.get("date")),
        updated_date=_coerce_date(data.get("modification_date") or data.get("last_updated")),
        cve_ids=cve_ids,
        cve_confidence=cve_confidence,
        technique_ids=technique_ids,
        raw_content=raw_content,
    )


def rule_html_url(file_path: str, branch: str = "develop") -> str:
    return f"https://github.com/splunk/security_content/blob/{branch}/{file_path}"


def rule_raw_url(file_path: str, branch: str = "develop") -> str:
    return f"https://raw.githubusercontent.com/splunk/security_content/{branch}/{file_path}"


__all__ = ["parse_splunk_rule", "rule_html_url", "rule_raw_url"]
