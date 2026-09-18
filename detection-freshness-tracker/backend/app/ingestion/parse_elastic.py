"""Parser for elastic/detection-rules rule files (TOML).

Verified against a real rule (rules/windows/defense_evasion_cve_2020_0601.toml)
fetched live from the repo. Real shape:

    [metadata]
    creation_date = "2020/03/19"
    integration = ["windows", "system"]
    maturity = "production"
    updated_date = "2026/05/04"

    [rule]
    author = ["Elastic"]
    description = \"\"\"...\"\"\"
    name = "Windows CryptoAPI Spoofing Vulnerability (CVE-2020-0601 - CurveBall)"
    risk_score = 21
    rule_id = "56557cde-d923-4b88-adee-c61b3f3b5dc3"
    severity = "low"
    tags = ["Domain: Endpoint", "Tactic: Defense Evasion", ...]
    ...

    [[rule.threat]]
    framework = "MITRE ATT&CK"
    [[rule.threat.technique]]
    id = "T1553"
    name = "Subvert Trust Controls"
    [[rule.threat.technique.subtechnique]]
    id = "T1553.002"
    name = "Code Signing"
    [rule.threat.tactic]
    id = "TA0005"
    name = "Defense Evasion"

Elastic has no dedicated CVE field — CVEs show up as plain text in `name` /
`description` (as above: "CVE-2020-0601" embedded in the rule name), so CVE
extraction is entirely regex-based here. ATT&CK techniques come from the
structured `rule.threat[].technique[]` (+ nested `.subtechnique[]`) tables,
which is a proper structured field.
"""
from __future__ import annotations

import tomllib
from datetime import datetime
from typing import Any

from .normalize import extract_cves_from_text, normalize_technique_id
from .types import ParsedRule


def _coerce_date(value: Any) -> datetime | None:
    if not value or not isinstance(value, str):
        return None
    for fmt in ("%Y/%m/%d", "%Y-%m-%d"):
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


def _extract_techniques(rule_block: dict[str, Any]) -> set[str]:
    technique_ids: set[str] = set()
    for threat in rule_block.get("threat", []) or []:
        if not isinstance(threat, dict):
            continue
        for technique in threat.get("technique", []) or []:
            if not isinstance(technique, dict):
                continue
            tid = normalize_technique_id(str(technique.get("id", "")))
            if tid:
                technique_ids.add(tid)
            for sub in technique.get("subtechnique", []) or []:
                if not isinstance(sub, dict):
                    continue
                sid = normalize_technique_id(str(sub.get("id", "")))
                if sid:
                    technique_ids.add(sid)
    return technique_ids


def parse_elastic_rule(raw_content: str, file_path: str) -> ParsedRule:
    try:
        data = tomllib.loads(raw_content)
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
            parse_error=f"TOML parse error: {exc}",
        )

    metadata = data.get("metadata", {}) or {}
    rule = data.get("rule", {}) or {}

    title = str(rule.get("name") or file_path)
    description = rule.get("description")
    references = rule.get("references") or []
    note = rule.get("note") or ""

    cve_ids = extract_cves_from_text(title, _as_text(description), _as_text(references), _as_text(note))
    cve_confidence = {cve: "inferred" for cve in cve_ids}

    technique_ids = _extract_techniques(rule)

    author = rule.get("author")
    author_str = ", ".join(author) if isinstance(author, list) else (str(author) if author else None)

    source_rule_id = str(rule.get("rule_id") or file_path)

    return ParsedRule(
        source_rule_id=source_rule_id,
        title=title,
        description=str(description) if description else None,
        file_path=file_path,
        status=str(metadata.get("maturity")) if metadata.get("maturity") else None,
        level=str(rule.get("severity")) if rule.get("severity") else None,
        author=author_str,
        created_date=_coerce_date(metadata.get("creation_date")),
        updated_date=_coerce_date(metadata.get("updated_date")),
        cve_ids=cve_ids,
        cve_confidence=cve_confidence,
        technique_ids=technique_ids,
        raw_content=raw_content,
    )


def rule_html_url(file_path: str, branch: str = "main") -> str:
    return f"https://github.com/elastic/detection-rules/blob/{branch}/{file_path}"


def rule_raw_url(file_path: str, branch: str = "main") -> str:
    return f"https://raw.githubusercontent.com/elastic/detection-rules/{branch}/{file_path}"


__all__ = ["parse_elastic_rule", "rule_html_url", "rule_raw_url"]
