"""Shared normalization helpers used by every source-specific parser.

Each rule ecosystem exposes CVE/ATT&CK references differently (see the
docstrings in parse_sigma.py / parse_elastic.py / parse_splunk.py for the
verified real-world shapes). Everything funnels through here so the rest of
the app only ever deals with two normalized forms:

  CVE:       "CVE-2021-44228"          (uppercase, hyphenated)
  Technique: "T1190" / "T1055.001"     (uppercase, dot for subtechnique)
"""
from __future__ import annotations

import hashlib
import re

_CVE_RE = re.compile(r"CVE-\d{4}-\d{4,7}", re.IGNORECASE)
_TECHNIQUE_TAG_RE = re.compile(r"^t(\d{4})(?:\.(\d{3}))?$", re.IGNORECASE)
_TECHNIQUE_ID_RE = re.compile(r"^T\d{4}(?:\.\d{3})?$")


def extract_cves_from_text(*texts: str | None) -> set[str]:
    """Regex-scan free text (titles, descriptions, references) for CVE IDs.
    This is the fallback used when a rule doesn't have a dedicated CVE field
    — which, per real Elastic/Sigma rules, is actually the common case."""
    found: set[str] = set()
    for text in texts:
        if not text:
            continue
        for match in _CVE_RE.findall(text):
            found.add(match.upper())
    return found


def normalize_cve_tag(tag: str) -> str | None:
    """Sigma-style `cve.2021-44228` tag -> `CVE-2021-44228`."""
    tag = tag.strip().lower()
    if tag.startswith("cve."):
        rest = tag[len("cve."):]
        candidate = f"CVE-{rest}"
        if _CVE_RE.fullmatch(candidate):
            return candidate.upper()
    return None


def normalize_technique_tag(tag: str) -> str | None:
    """Sigma-style `attack.t1190` or `attack.t1055.001` tag -> `T1190` / `T1055.001`."""
    tag = tag.strip().lower()
    if tag.startswith("attack."):
        tag = tag[len("attack."):]
    m = _TECHNIQUE_TAG_RE.match(tag)
    if not m:
        return None
    base, sub = m.groups()
    return f"T{base}.{sub}" if sub else f"T{base}"


def normalize_technique_id(raw: str) -> str | None:
    """Elastic/Splunk already give plain `T1190` / `T1055.001` — just validate/uppercase."""
    candidate = raw.strip().upper()
    if _TECHNIQUE_ID_RE.match(candidate):
        return candidate
    return None


def content_hash(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8", errors="replace")).hexdigest()
