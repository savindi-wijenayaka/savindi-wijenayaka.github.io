"""Build frontmatter dicts and generate URL-safe slugs."""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Optional

from slugify import slugify as _slugify

from .export import ArticleData


def make_slug(title: str) -> str:
    """Generate a URL-safe slug from an article title (max 60 chars)."""
    return _slugify(title, max_length=60, word_boundary=True, separator="-")


def calculate_reading_time(markdown_text: str) -> int:
    """Estimate reading time in minutes (average 200 wpm)."""
    words = len(markdown_text.split())
    return max(1, round(words / 200))


def build_frontmatter(
    article: ArticleData,
    slug: str,
    cover_web_path: Optional[str],
    markdown_body: str,
) -> dict:
    """Return a dict representing the YAML frontmatter for this article."""
    fm: dict = {
        "title": article.title,
        "slug": slug,
        "date": article.date,
        "excerpt": article.excerpt,
        "tags": article.tags,
        "source": "medium",
        "mediumUrl": article.canonical_url,
        "featured": article.featured,
        "readingTime": calculate_reading_time(markdown_body),
        "convertedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
    }
    if cover_web_path:
        fm["coverImage"] = cover_web_path
    if article.publication:
        fm["publication"] = article.publication
    return fm


def frontmatter_to_yaml(fm: dict) -> str:
    """Serialize frontmatter dict to YAML string (no external library needed)."""
    lines = ["---"]
    for key, value in fm.items():
        if isinstance(value, str):
            # Escape quotes in the value
            escaped = value.replace('"', '\\"')
            lines.append(f'{key}: "{escaped}"')
        elif isinstance(value, bool):
            lines.append(f"{key}: {str(value).lower()}")
        elif isinstance(value, int):
            lines.append(f"{key}: {value}")
        elif isinstance(value, list):
            if value:
                items = ", ".join(f'"{v}"' for v in value)
                lines.append(f"{key}: [{items}]")
            else:
                lines.append(f"{key}: []")
        else:
            lines.append(f"{key}: {value}")
    lines.append("---")
    return "\n".join(lines)
