"""Enrichment client tests. NVD/KEV/ATT&CK are exercised against local fixture
files with httpx.get monkeypatched, rather than live network calls, so CI
doesn't depend on external services being reachable."""
import json

import httpx
from conftest import FIXTURES

from app.enrichment import kev
from app.enrichment.attack import fetch_techniques
from app.enrichment.nvd import best_cvss, description


class _FakeResponse:
    def __init__(self, payload):
        self._payload = payload

    def raise_for_status(self):
        pass

    def json(self):
        return self._payload


def test_kev_catalog_indexed_by_cve(monkeypatch):
    payload = json.loads((FIXTURES / "kev_mini.json").read_text())
    monkeypatch.setattr(httpx, "get", lambda *a, **kw: _FakeResponse(payload))

    catalog = kev.fetch_kev_catalog("https://example.invalid/kev.json")
    assert set(catalog.keys()) == {"CVE-2021-44228", "CVE-2022-26134"}
    assert catalog["CVE-2021-44228"]["knownRansomwareCampaignUse"] == "Known"

    added = kev.kev_date_added(catalog["CVE-2021-44228"])
    assert added.year == 2021 and added.month == 12 and added.day == 10


def test_attack_techniques_parsed_and_filtered(monkeypatch):
    payload = json.loads((FIXTURES / "attack_mini.json").read_text())
    monkeypatch.setattr(httpx, "get", lambda *a, **kw: _FakeResponse(payload))

    techniques = fetch_techniques("https://example.invalid/attack.json")
    by_id = {t.technique_id: t for t in techniques}

    # Revoked technique must still be included (callers may want to know it's
    # deprecated) but flagged.
    assert set(by_id.keys()) == {"T1190", "T1553.002", "T9999"}

    t1190 = by_id["T1190"]
    assert t1190.name == "Exploit Public-Facing Application"
    assert t1190.tactic_names == ["Initial Access"]
    assert t1190.is_subtechnique is False
    assert t1190.is_deprecated is False

    sub = by_id["T1553.002"]
    assert sub.is_subtechnique is True
    assert sub.parent_technique_id == "T1553"

    revoked = by_id["T9999"]
    assert revoked.is_deprecated is True


def test_nvd_cvss_preference_order():
    cve_data = {
        "metrics": {
            "cvssMetricV31": [{"cvssData": {"baseScore": 10.0, "baseSeverity": "CRITICAL"}}],
            "cvssMetricV2": [{"cvssData": {"baseScore": 9.3, "baseSeverity": "HIGH"}}],
        }
    }
    score, version, severity = best_cvss(cve_data)
    assert (score, version, severity) == (10.0, "3.1", "CRITICAL")


def test_nvd_description_picks_english():
    cve_data = {"descriptions": [{"lang": "es", "value": "no"}, {"lang": "en", "value": "yes"}]}
    assert description(cve_data) == "yes"
