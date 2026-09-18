"""MITRE ATT&CK Enterprise technique/tactic loader (STIX 2.1 bundle).

Schema verified against a live fetch of enterprise-attack.json (~26k STIX
objects). The fields we use, on `attack-pattern` objects:

    {
      "type": "attack-pattern",
      "revoked": false,
      "x_mitre_deprecated": false,           # not present on active techniques
      "x_mitre_is_subtechnique": true,
      "name": "Extra Window Memory Injection",
      "kill_chain_phases": [{"kill_chain_name": "mitre-attack", "phase_name": "privilege-escalation"}],
      "external_references": [
        {"source_name": "mitre-attack", "external_id": "T1055.011", "url": "https://attack.mitre.org/techniques/T1055/011"}
      ]
    }

and on `x-mitre-tactic` objects, used only to map a tactic's kill-chain
`phase_name` (e.g. "privilege-escalation") to its display name ("Privilege
Escalation"):

    {"type": "x-mitre-tactic", "x_mitre_shortname": "privilege-escalation", "name": "Privilege Escalation"}
"""
from __future__ import annotations

from dataclasses import dataclass

import httpx


@dataclass
class TechniqueInfo:
    technique_id: str
    name: str
    tactic_names: list[str]
    is_subtechnique: bool
    parent_technique_id: str | None
    url: str | None
    is_deprecated: bool


def _external_id(obj: dict) -> str | None:
    for ref in obj.get("external_references", []) or []:
        if ref.get("source_name") == "mitre-attack":
            return ref.get("external_id")
    return None


def _url(obj: dict) -> str | None:
    for ref in obj.get("external_references", []) or []:
        if ref.get("source_name") == "mitre-attack":
            return ref.get("url")
    return None


def fetch_techniques(stix_url: str, timeout: float = 120.0) -> list[TechniqueInfo]:
    resp = httpx.get(stix_url, timeout=timeout, follow_redirects=True)
    resp.raise_for_status()
    bundle = resp.json()
    objects = bundle.get("objects", [])

    tactic_display = {
        obj.get("x_mitre_shortname"): obj.get("name")
        for obj in objects
        if obj.get("type") == "x-mitre-tactic" and obj.get("x_mitre_shortname")
    }

    techniques: list[TechniqueInfo] = []
    for obj in objects:
        if obj.get("type") != "attack-pattern":
            continue
        technique_id = _external_id(obj)
        if not technique_id:
            continue

        is_sub = bool(obj.get("x_mitre_is_subtechnique"))
        parent_id = technique_id.split(".")[0] if is_sub and "." in technique_id else None

        tactic_names = [
            tactic_display.get(phase.get("phase_name"), phase.get("phase_name"))
            for phase in obj.get("kill_chain_phases", []) or []
            if phase.get("kill_chain_name") == "mitre-attack"
        ]

        techniques.append(
            TechniqueInfo(
                technique_id=technique_id,
                name=obj.get("name") or technique_id,
                tactic_names=[t for t in tactic_names if t],
                is_subtechnique=is_sub,
                parent_technique_id=parent_id,
                url=_url(obj),
                is_deprecated=bool(obj.get("x_mitre_deprecated") or obj.get("revoked")),
            )
        )
    return techniques


__all__ = ["TechniqueInfo", "fetch_techniques"]
