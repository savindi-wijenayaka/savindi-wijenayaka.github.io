"""Write and update the manifest.json article index."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Optional


def _article_to_manifest_entry(fm: dict) -> dict:
    """Convert a frontmatter dict to a manifest entry (drop scrapedAt)."""
    entry = {k: v for k, v in fm.items() if k != "scrapedAt"}
    return entry


def write_manifest(
    entries: list[dict],
    manifest_path: Path,
) -> None:
    """
    Merge new entries into the existing manifest and write it.
    Entries are keyed by slug; existing entries are updated, new ones appended.
    Final list is sorted newest-first by date.
    """
    manifest_path.parent.mkdir(parents=True, exist_ok=True)

    existing: list[dict] = []
    if manifest_path.exists():
        try:
            existing = json.loads(manifest_path.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            existing = []

    # Index existing by slug
    by_slug: dict[str, dict] = {e["slug"]: e for e in existing}

    for entry in entries:
        manifest_entry = _article_to_manifest_entry(entry)
        slug = manifest_entry["slug"]
        # Preserve manually-set fields from the existing manifest entry
        if slug in by_slug:
            manifest_entry.setdefault("featured", by_slug[slug].get("featured", False))
            manifest_entry["featured"] = by_slug[slug].get("featured", manifest_entry.get("featured", False))
        by_slug[slug] = manifest_entry

    # Sort newest first
    merged = sorted(by_slug.values(), key=lambda e: e.get("date", ""), reverse=True)

    manifest_path.write_text(
        json.dumps(merged, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
