"""Keeps local clones of the three rule repos in sync and reports exactly
which files changed since the last successful sync.

Why local clones instead of polling the GitHub REST/contents API: these
repos hold thousands of rule files between them, and a full API walk on
every poll cycle would either blow through GitHub's unauthenticated rate
limit (60 req/hr) or need a token just to keep up. `git fetch` + `git diff
--name-status <old>..<new>` costs one fetch per cycle regardless of repo
size, and gives us exactly the added/modified/deleted files with no
guessing. Clones are full (not shallow) so a diff against a SHA from weeks
ago is always possible.
"""
from __future__ import annotations

import logging
import subprocess
from dataclasses import dataclass
from pathlib import Path

logger = logging.getLogger(__name__)


class GitSyncError(RuntimeError):
    pass


@dataclass
class DiffResult:
    old_sha: str | None
    new_sha: str
    added: list[str]
    modified: list[str]
    deleted: list[str]
    renamed: list[tuple[str, str]]  # (old_path, new_path)

    @property
    def changed_count(self) -> int:
        return len(self.added) + len(self.modified) + len(self.deleted) + len(self.renamed)


def _run(args: list[str], cwd: str | Path | None = None, timeout: int = 600) -> str:
    try:
        result = subprocess.run(
            args,
            cwd=cwd,
            capture_output=True,
            text=True,
            timeout=timeout,
            check=True,
        )
    except subprocess.CalledProcessError as exc:
        raise GitSyncError(f"`{' '.join(args)}` failed: {exc.stderr.strip()}") from exc
    except subprocess.TimeoutExpired as exc:
        raise GitSyncError(f"`{' '.join(args)}` timed out after {timeout}s") from exc
    return result.stdout


def sync_repo(repo_dir: Path, repo_url: str, branch: str) -> str:
    """Ensure `repo_dir` holds an up-to-date clone of `repo_url`@`branch` and
    return the latest commit SHA on that branch (as `origin/<branch>`).

    Two things keep this cheap and crash-safe:

    - A `--filter=blob:none` ("partial clone" - commit/tree objects up
      front, file contents fetched lazily on first read) looks tempting here
      but is actively worse for this workload: verified against
      elastic/detection-rules, it clones in ~1s instead of ~13s, but the
      *first* full ingest then reads every one of ~2000 rule files, and
      lazy-fetching each blob one `git show` at a time (no batching) took
      over 5 minutes and was still going when a normal full clone does the
      same 2000 reads, entirely local, in under 5 seconds. So this uses a
      normal full clone - ~430MB for elastic/detection-rules, in the same
      ballpark for the other two - which is a trivial amount of disk for a
      VPS and is fetched once, not on every cycle.
    - We never check out a working tree, and we never touch the local
      `<branch>` ref at all - only `refs/remotes/origin/<branch>`. Fetching
      straight into a checked-out branch is refused by git (even under
      --no-checkout, HEAD still symbolically points at it), which is exactly
      what `git fetch origin <branch>:<branch>` used to hit here. Fetching
      with no refspec args instead relies on the remote-tracking refspec
      `--single-branch` sets up at clone time, updates
      `origin/<branch>`, and never touches HEAD - so there's nothing to
      protect and nothing for a crash mid-fetch to corrupt. The caller
      tracks "last processed SHA" itself (in the DB, see ingest.py) rather
      than relying on local repo state.
    """
    repo_dir.parent.mkdir(parents=True, exist_ok=True)
    ref = f"origin/{branch}"

    if not (repo_dir / ".git").exists():
        logger.info("Cloning %s (%s) into %s", repo_url, branch, repo_dir)
        _run(
            ["git", "clone", "--branch", branch, "--single-branch", "--no-checkout", repo_url, str(repo_dir)],
            timeout=1800,
        )
        return _run(["git", "rev-parse", ref], cwd=repo_dir).strip()

    logger.info("Fetching %s", repo_url)
    _run(["git", "fetch", "--quiet", "origin"], cwd=repo_dir, timeout=1800)
    return _run(["git", "rev-parse", ref], cwd=repo_dir).strip()


def diff_since(repo_dir: Path, old_sha: str | None, new_sha: str, subdirs: list[str]) -> DiffResult:
    """List file changes between old_sha and new_sha, restricted to `subdirs`.
    On a first sync (old_sha is None) every tracked file is reported as added."""
    added: list[str] = []
    modified: list[str] = []
    deleted: list[str] = []
    renamed: list[tuple[str, str]] = []

    if old_sha is None:
        for subdir in subdirs:
            out = _run(["git", "ls-tree", "-r", "--name-only", new_sha, "--", subdir], cwd=repo_dir)
            added.extend(line for line in out.splitlines() if line.strip())
        return DiffResult(old_sha, new_sha, added, modified, deleted, renamed)

    if old_sha == new_sha:
        return DiffResult(old_sha, new_sha, added, modified, deleted, renamed)

    args = ["git", "diff", "--name-status", "-M", f"{old_sha}..{new_sha}", "--", *subdirs]
    try:
        out = _run(args, cwd=repo_dir)
    except GitSyncError:
        # old_sha isn't reachable anymore (e.g. the volume was recreated, or
        # upstream rewrote history past it). Fall back to a full resync
        # rather than erroring the whole cycle out.
        logger.warning("Diff base %s unreachable for %s, falling back to full resync", old_sha, repo_dir)
        return diff_since(repo_dir, None, new_sha, subdirs)
    for line in out.splitlines():
        if not line.strip():
            continue
        parts = line.split("\t")
        status = parts[0]
        if status.startswith("A"):
            added.append(parts[1])
        elif status.startswith("M"):
            modified.append(parts[1])
        elif status.startswith("D"):
            deleted.append(parts[1])
        elif status.startswith("R"):
            renamed.append((parts[1], parts[2]))
        # Copies (C...) intentionally ignored: treated as no-op, the copy source stays authoritative.

    return DiffResult(old_sha, new_sha, added, modified, deleted, renamed)


def read_file_at(repo_dir: Path, sha: str, file_path: str) -> str | None:
    """Read a file's content as of a given commit (avoids racing a concurrent
    fetch mutating the working tree mid-parse)."""
    try:
        return _run(["git", "show", f"{sha}:{file_path}"], cwd=repo_dir)
    except GitSyncError:
        return None
