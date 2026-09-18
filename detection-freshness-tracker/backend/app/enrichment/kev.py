"""CISA Known Exploited Vulnerabilities (KEV) catalog client.

Schema verified against a live fetch of the catalog:

    {
      "title": "...",
      "catalogVersion": "...",
      "dateReleased": "...",
      "count": 1694,
      "vulnerabilities": [
        {
          "cveID": "CVE-2026-59822",
          "vendorProject": "BerriAI",
          "product": "LiteLLM",
          "vulnerabilityName": "...",
          "dateAdded": "2026-09-02",
          "shortDescription": "...",
          "requiredAction": "...",
          "dueDate": "2026-09-16",
          "knownRansomwareCampaignUse": "Unknown",
          "notes": "...",
          "cwes": ["CWE-287", "CWE-306"]
        }
      ]
    }

This is the single highest-signal input for the "gap" view: a CVE with no
matching detection AND a KEV entry means it's confirmed under active
exploitation with nothing tracked to catch it.
"""
from __future__ import annotations

from datetime import datetime
from typing import Any

import httpx


def fetch_kev_catalog(url: str, timeout: float = 60.0) -> dict[str, dict[str, Any]]:
    """Returns {cve_id: kev_entry} for O(1) lookup during rule/CVE enrichment."""
    resp = httpx.get(url, timeout=timeout, follow_redirects=True)
    resp.raise_for_status()
    data = resp.json()
    return {v["cveID"]: v for v in data.get("vulnerabilities", []) if v.get("cveID")}


def kev_date_added(entry: dict[str, Any]) -> datetime | None:
    raw = entry.get("dateAdded")
    if not raw:
        return None
    try:
        return datetime.strptime(raw, "%Y-%m-%d")
    except ValueError:
        return None


__all__ = ["fetch_kev_catalog", "kev_date_added"]
