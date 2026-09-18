"""Central app configuration, read from environment variables (see .env.example)."""
from __future__ import annotations

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # Core
    site_domain: str = "localhost"
    site_url: str = "http://localhost:8000"
    dev_mode: bool = False
    log_level: str = "INFO"

    # Database
    database_url: str = "postgresql+psycopg://detection_tracker:detection_tracker@localhost:5432/detection_tracker"

    # Rule sources
    sigma_repo_url: str = "https://github.com/SigmaHQ/sigma.git"
    sigma_repo_branch: str = "master"
    sigma_rules_subdirs: str = "rules,rules-emerging-threats,rules-threat-hunting"

    elastic_repo_url: str = "https://github.com/elastic/detection-rules.git"
    elastic_repo_branch: str = "main"
    elastic_rules_subdirs: str = "rules"

    splunk_repo_url: str = "https://github.com/splunk/security_content.git"
    splunk_repo_branch: str = "develop"
    splunk_rules_subdirs: str = "detections"

    git_cache_dir: str = "/data/repos"

    # Enrichment
    nvd_api_key: str = ""
    cisa_kev_url: str = "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json"
    attack_stix_url: str = (
        "https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/enterprise-attack/enterprise-attack.json"
    )

    # Scheduling
    rules_poll_interval_minutes: int = 120
    nvd_recent_poll_interval_minutes: int = 180
    kev_poll_interval_minutes: int = 720
    attack_poll_interval_hours: int = 168
    nvd_lookback_days: int = 30

    def subdirs(self, csv: str) -> list[str]:
        return [s.strip() for s in csv.split(",") if s.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
