"""Check whether an article has already been scraped."""

from __future__ import annotations

from pathlib import Path


def is_already_scraped(slug: str, output_dir: Path) -> bool:
    """Return True if a markdown file for this slug already exists."""
    return (output_dir / f"{slug}.md").exists()
