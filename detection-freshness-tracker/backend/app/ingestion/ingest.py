"""Orchestrates one sync cycle for a single rule source: clone/fetch the
repo, diff since the last processed commit, parse changed files, and upsert
the results into the database.
"""
from __future__ import annotations

import logging
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path

from sqlalchemy import select
from sqlalchemy.orm import Session

from ..config import Settings
from ..models import AttackTechnique, CVE, IngestState, Rule, RuleCVE, RuleSource, RuleTechnique
from . import git_sync
from .normalize import content_hash
from .parse_elastic import parse_elastic_rule, rule_html_url as elastic_html, rule_raw_url as elastic_raw
from .parse_sigma import parse_sigma_rule, rule_html_url as sigma_html, rule_raw_url as sigma_raw
from .parse_splunk import parse_splunk_rule, rule_html_url as splunk_html, rule_raw_url as splunk_raw
from .types import ParsedRule

logger = logging.getLogger(__name__)

_EXTENSIONS = {
    RuleSource.sigma: {".yml", ".yaml"},
    RuleSource.elastic: {".toml"},
    RuleSource.splunk: {".yml", ".yaml"},
}

_PARSERS = {
    RuleSource.sigma: parse_sigma_rule,
    RuleSource.elastic: parse_elastic_rule,
    RuleSource.splunk: parse_splunk_rule,
}

_URL_BUILDERS = {
    RuleSource.sigma: (sigma_html, sigma_raw),
    RuleSource.elastic: (elastic_html, elastic_raw),
    RuleSource.splunk: (splunk_html, splunk_raw),
}


@dataclass
class SyncSummary:
    source: RuleSource
    old_sha: str | None
    new_sha: str
    parsed_ok: int = 0
    parse_errors: int = 0
    deleted: int = 0
    skipped_non_rule: int = 0


def _repo_config(source: RuleSource, settings: Settings) -> tuple[str, str, list[str]]:
    if source == RuleSource.sigma:
        return settings.sigma_repo_url, settings.sigma_repo_branch, settings.subdirs(settings.sigma_rules_subdirs)
    if source == RuleSource.elastic:
        return settings.elastic_repo_url, settings.elastic_repo_branch, settings.subdirs(settings.elastic_rules_subdirs)
    if source == RuleSource.splunk:
        return settings.splunk_repo_url, settings.splunk_repo_branch, settings.subdirs(settings.splunk_rules_subdirs)
    raise ValueError(source)


def _get_or_create_cve(session: Session, cve_id: str) -> CVE:
    cve = session.get(CVE, cve_id)
    if cve is None:
        cve = CVE(cve_id=cve_id, enriched=False)
        session.add(cve)
        session.flush()
    return cve


def _get_or_create_technique(session: Session, technique_id: str) -> AttackTechnique:
    technique = session.get(AttackTechnique, technique_id)
    if technique is None:
        # Placeholder until the ATT&CK enrichment job fills in the real name/tactic.
        technique = AttackTechnique(technique_id=technique_id, name=technique_id, is_deprecated=False)
        session.add(technique)
        session.flush()
    return technique


def _upsert_rule(session: Session, source: RuleSource, parsed: ParsedRule, branch: str) -> None:
    html_builder, raw_builder = _URL_BUILDERS[source]

    stmt = select(Rule).where(Rule.source == source, Rule.source_rule_id == parsed.source_rule_id)
    rule = session.execute(stmt).scalar_one_or_none()

    new_hash = content_hash(parsed.raw_content)
    if rule is not None and rule.content_hash == new_hash and not rule.is_deleted:
        # File touched (e.g. a rename) but content identical - just refresh path/URLs.
        rule.file_path = parsed.file_path
        rule.html_url = html_builder(parsed.file_path, branch)
        rule.raw_url = raw_builder(parsed.file_path, branch)
        return

    if rule is None:
        rule = Rule(
            source=source,
            source_rule_id=parsed.source_rule_id,
            content_hash=new_hash,
            raw_content=parsed.raw_content,
            title=parsed.title,
            file_path=parsed.file_path,
            html_url=html_builder(parsed.file_path, branch),
            raw_url=raw_builder(parsed.file_path, branch),
        )
        session.add(rule)
    else:
        rule.content_hash = new_hash
        rule.raw_content = parsed.raw_content
        rule.title = parsed.title
        rule.file_path = parsed.file_path
        rule.html_url = html_builder(parsed.file_path, branch)
        rule.raw_url = raw_builder(parsed.file_path, branch)
        rule.is_deleted = False

    rule.description = parsed.description
    rule.status = parsed.status
    rule.level = parsed.level
    rule.author = parsed.author
    rule.created_date_native = parsed.created_date
    rule.updated_date_native = parsed.updated_date
    session.flush()

    # Re-sync CVE/technique junctions from scratch - simplest correct approach,
    # cheap given each rule maps to a handful of CVEs/techniques at most.
    session.query(RuleCVE).filter(RuleCVE.rule_id == rule.id).delete()
    session.query(RuleTechnique).filter(RuleTechnique.rule_id == rule.id).delete()

    for cve_id in parsed.cve_ids:
        _get_or_create_cve(session, cve_id)
        confidence = parsed.cve_confidence.get(cve_id, "inferred")
        session.add(RuleCVE(rule_id=rule.id, cve_id=cve_id, confidence=confidence))

    for technique_id in parsed.technique_ids:
        _get_or_create_technique(session, technique_id)
        session.add(RuleTechnique(rule_id=rule.id, technique_id=technique_id))


def _mark_deleted(session: Session, source: RuleSource, file_path: str) -> int:
    # We match rules by (source, source_rule_id), not file_path, so a delete
    # by path only works if we can find the rule that currently owns that
    # path. This is a best-effort soft delete; a renamed-then-deleted file in
    # the same diff window is rare enough not to special-case further.
    stmt = select(Rule).where(Rule.source == source, Rule.file_path == file_path)
    rule = session.execute(stmt).scalar_one_or_none()
    if rule is not None and not rule.is_deleted:
        rule.is_deleted = True
        return 1
    return 0


def sync_source(source: RuleSource, settings: Settings, session: Session) -> SyncSummary:
    repo_url, branch, subdirs = _repo_config(source, settings)
    repo_dir = Path(settings.git_cache_dir) / source.value
    extensions = _EXTENSIONS[source]
    parser = _PARSERS[source]

    # The DB, not local git state, is authoritative for "what did we last
    # process" - see git_sync.sync_repo's docstring for why.
    existing_state = session.get(IngestState, source)
    old_sha = existing_state.last_commit_sha if existing_state else None

    new_sha = git_sync.sync_repo(repo_dir, repo_url, branch)
    diff = git_sync.diff_since(repo_dir, old_sha, new_sha, subdirs)
    summary = SyncSummary(source=source, old_sha=old_sha, new_sha=new_sha)

    logger.info(
        "[%s] %s -> %s: %d added, %d modified, %d deleted, %d renamed",
        source.value, old_sha or "(initial)", new_sha,
        len(diff.added), len(diff.modified), len(diff.deleted), len(diff.renamed),
    )

    to_parse = list(diff.added) + list(diff.modified) + [new for _old, new in diff.renamed]

    for file_path in to_parse:
        if Path(file_path).suffix.lower() not in extensions:
            summary.skipped_non_rule += 1
            continue
        content = git_sync.read_file_at(repo_dir, new_sha, file_path)
        if content is None:
            summary.parse_errors += 1
            continue
        parsed = parser(content, file_path)
        if parsed.parse_error:
            logger.warning("[%s] failed to parse %s: %s", source.value, file_path, parsed.parse_error)
            summary.parse_errors += 1
            continue
        _upsert_rule(session, source, parsed, branch)
        summary.parsed_ok += 1

    for file_path in diff.deleted:
        summary.deleted += _mark_deleted(session, source, file_path)
    for old_path, _new_path in diff.renamed:
        # The rename's new path was already re-parsed above (matched by
        # embedded rule id), so the old path is just gone.
        _mark_deleted(session, source, old_path)

    state = existing_state
    if state is None:
        state = IngestState(source=source)
        session.add(state)

    state.last_commit_sha = new_sha
    state.last_synced_at = datetime.now(timezone.utc)
    state.last_sync_ok = True
    state.last_error = None

    return summary
