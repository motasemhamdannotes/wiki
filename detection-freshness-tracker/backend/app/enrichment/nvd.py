"""NVD API 2.0 client.

Schema verified against a live `cveId=CVE-2021-44228` lookup:

    {
      "vulnerabilities": [
        {
          "cve": {
            "id": "CVE-2021-44228",
            "published": "2021-12-10T10:15:09.143",
            "lastModified": "2026-08-11T19:33:44.513",
            "descriptions": [{"lang": "en", "value": "..."}],
            "metrics": {
              "cvssMetricV31": [{"cvssData": {"baseScore": 10.0, "baseSeverity": "CRITICAL"}, ...}],
              "cvssMetricV30": [...],
              "cvssMetricV2":  [{"cvssData": {"baseScore": 9.3, "baseSeverity": "HIGH"}, ...}]
            }
          }
        }
      ],
      "totalResults": 1
    }

We prefer the highest CVSS version available (v3.1 > v3.0 > v2) and always
take the first ("Primary") entry in whichever metric list is used.

Rate limiting: NVD allows 5 requests/30s without an API key, 50/30s with one
(see NVD_API_KEY in .env). `_request` sleeps between calls accordingly - this
app's polling cadence (a handful of individual CVE lookups plus one
paginated recent-CVEs pull every few hours) stays comfortably inside that
even unauthenticated.
"""
from __future__ import annotations

import logging
import time
from datetime import datetime, timedelta, timezone
from typing import Any

import httpx
from tenacity import retry, retry_if_exception_type, stop_after_attempt, wait_exponential

logger = logging.getLogger(__name__)

BASE_URL = "https://services.nvd.nist.gov/rest/json/cves/2.0"
_PAGE_SIZE = 200


class NvdClient:
    def __init__(self, api_key: str = "", timeout: float = 30.0):
        self._api_key = api_key or None
        self._timeout = timeout
        self._min_interval = 0.7 if api_key else 6.5  # stay under 50/30s or 5/30s
        self._last_call = 0.0

    def _headers(self) -> dict[str, str]:
        return {"apiKey": self._api_key} if self._api_key else {}

    def _throttle(self) -> None:
        elapsed = time.monotonic() - self._last_call
        if elapsed < self._min_interval:
            time.sleep(self._min_interval - elapsed)
        self._last_call = time.monotonic()

    @retry(
        reraise=True,
        stop=stop_after_attempt(4),
        wait=wait_exponential(multiplier=2, min=2, max=30),
        retry=retry_if_exception_type((httpx.TransportError, httpx.HTTPStatusError)),
    )
    def _get(self, params: dict[str, Any]) -> dict[str, Any]:
        self._throttle()
        resp = httpx.get(BASE_URL, params=params, headers=self._headers(), timeout=self._timeout)
        if resp.status_code == 429:
            # NVD's own throttling - back off harder than our normal retry wait.
            time.sleep(10)
            resp.raise_for_status()
        resp.raise_for_status()
        return resp.json()

    def get_cve(self, cve_id: str) -> dict[str, Any] | None:
        data = self._get({"cveId": cve_id})
        vulns = data.get("vulnerabilities") or []
        return vulns[0]["cve"] if vulns else None

    def get_recent(self, since: datetime, until: datetime | None = None) -> list[dict[str, Any]]:
        """Pull every CVE published in [since, until). NVD caps each window
        to 120 days, so callers should keep `since` reasonably recent (this
        app's NVD_LOOKBACK_DAYS default is 30)."""
        until = until or datetime.now(timezone.utc)
        results: list[dict[str, Any]] = []
        start_index = 0
        while True:
            data = self._get(
                {
                    "pubStartDate": _iso(since),
                    "pubEndDate": _iso(until),
                    "resultsPerPage": _PAGE_SIZE,
                    "startIndex": start_index,
                }
            )
            vulns = data.get("vulnerabilities") or []
            results.extend(v["cve"] for v in vulns if "cve" in v)
            total = data.get("totalResults", len(results))
            start_index += len(vulns)
            if start_index >= total or not vulns:
                break
        return results


def _iso(dt: datetime) -> str:
    # NVD wants millisecond precision, no offset ambiguity.
    return dt.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.000")


def best_cvss(cve_data: dict[str, Any]) -> tuple[float | None, str | None, str | None]:
    """Returns (score, version, severity), preferring v3.1 > v3.0 > v2."""
    metrics = cve_data.get("metrics", {}) or {}
    for key, version in (("cvssMetricV31", "3.1"), ("cvssMetricV30", "3.0"), ("cvssMetricV2", "2.0")):
        entries = metrics.get(key) or []
        if entries:
            cvss = entries[0].get("cvssData", {})
            return cvss.get("baseScore"), version, cvss.get("baseSeverity")
    return None, None, None


def description(cve_data: dict[str, Any]) -> str | None:
    for d in cve_data.get("descriptions", []) or []:
        if d.get("lang") == "en":
            return d.get("value")
    return None


def published_at(cve_data: dict[str, Any]) -> datetime | None:
    return _parse_nvd_dt(cve_data.get("published"))


def modified_at(cve_data: dict[str, Any]) -> datetime | None:
    return _parse_nvd_dt(cve_data.get("lastModified"))


def _parse_nvd_dt(value: str | None) -> datetime | None:
    if not value:
        return None
    try:
        return datetime.fromisoformat(value).replace(tzinfo=timezone.utc)
    except ValueError:
        return None


__all__ = ["NvdClient", "best_cvss", "description", "published_at", "modified_at"]
