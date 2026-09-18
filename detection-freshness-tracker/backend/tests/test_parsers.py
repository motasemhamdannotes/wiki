"""Parser tests against real rule files pulled live from each upstream repo
(see the fixtures/ dir and the docstrings in app/ingestion/parse_*.py for
provenance). These lock in the field-mapping assumptions the whole app
depends on, so a schema drift upstream shows up as a failing test instead of
silently-wrong data in production.
"""
from conftest import FIXTURES

from app.ingestion.parse_elastic import parse_elastic_rule
from app.ingestion.parse_sigma import parse_sigma_rule
from app.ingestion.parse_splunk import parse_splunk_rule


def test_sigma_log4j_rule():
    content = (FIXTURES / "sigma_log4j.yml").read_text()
    parsed = parse_sigma_rule(content, "rules-emerging-threats/2021/Exploits/CVE-2021-44228/web_cve_2021_44228_log4j.yml")

    assert parsed.parse_error is None
    assert parsed.source_rule_id == "5ea8faa8-db8b-45be-89b0-151b84c82702"
    assert parsed.title == "Log4j RCE CVE-2021-44228 Generic"
    assert parsed.status == "test"
    assert parsed.level == "high"
    assert parsed.author == "Florian Roth (Nextron Systems)"
    # No `cve.*` tag on this rule - must come from the inferred (title-regex) path.
    assert parsed.cve_ids == {"CVE-2021-44228"}
    assert parsed.cve_confidence["CVE-2021-44228"] == "inferred"
    # attack.initial-access is a tactic tag, not a technique - must NOT show up here.
    assert parsed.technique_ids == {"T1190"}
    assert parsed.created_date.year == 2021
    assert parsed.updated_date.year == 2022


def test_sigma_structured_cve_tag():
    content = """
title: Fake rule with structured CVE tag
id: 00000000-0000-0000-0000-000000000000
status: experimental
tags:
    - attack.t1055.001
    - cve.2023-12345
logsource:
    category: process_creation
detection:
    selection:
        Image: '*\\\\evil.exe'
    condition: selection
level: medium
"""
    parsed = parse_sigma_rule(content, "rules/windows/fake.yml")
    assert parsed.cve_ids == {"CVE-2023-12345"}
    assert parsed.cve_confidence["CVE-2023-12345"] == "tagged"
    assert parsed.technique_ids == {"T1055.001"}


def test_elastic_curveball_rule():
    content = (FIXTURES / "elastic_curveball.toml").read_text()
    parsed = parse_elastic_rule(content, "rules/windows/defense_evasion_cve_2020_0601.toml")

    assert parsed.parse_error is None
    assert parsed.source_rule_id == "56557cde-d923-4b88-adee-c61b3f3b5dc3"
    assert "CVE-2020-0601 - CurveBall" in parsed.title
    assert parsed.status == "production"
    assert parsed.level == "low"
    assert parsed.author == "Elastic"
    # No dedicated CVE field in this schema - must be inferred from the rule name.
    assert parsed.cve_ids == {"CVE-2020-0601"}
    assert parsed.cve_confidence["CVE-2020-0601"] == "inferred"
    # Structured [[rule.threat.technique]] + nested subtechnique.
    assert parsed.technique_ids == {"T1553", "T1553.002"}
    assert parsed.created_date.year == 2020
    assert parsed.updated_date.year == 2026


def test_splunk_confluence_rule():
    content = (FIXTURES / "splunk_confluence.yml").read_text()
    parsed = parse_splunk_rule(content, "detections/web/confluence_unauthenticated_remote_code_execution_cve_2022_26134.yml")

    assert parsed.parse_error is None
    assert parsed.source_rule_id == "fcf4bd3f-a79f-4b7a-83bf-2692d60b859c"
    assert parsed.title == "Confluence Unauthenticated Remote Code Execution CVE-2022-26134"
    assert parsed.status == "production"
    # Dedicated structured `cve:` field - highest confidence.
    assert parsed.cve_ids == {"CVE-2022-26134"}
    assert parsed.cve_confidence["CVE-2022-26134"] == "structured"
    assert parsed.technique_ids == {"T1505", "T1190", "T1133"}
    assert parsed.created_date.year == 2022
    assert parsed.updated_date.year == 2026


def test_malformed_yaml_is_reported_not_raised():
    parsed = parse_sigma_rule("title: [unterminated", "rules/bad.yml")
    assert parsed.parse_error is not None


def test_malformed_toml_is_reported_not_raised():
    parsed = parse_elastic_rule("this is not = = toml [[[", "rules/bad.toml")
    assert parsed.parse_error is not None
