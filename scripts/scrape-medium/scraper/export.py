"""Parse Medium export HTML files from the posts/ folder."""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

from bs4 import BeautifulSoup


@dataclass
class ArticleData:
    title: str
    date: str                          # ISO YYYY-MM-DD
    canonical_url: str                 # https://medium.com/@user/slug-id
    excerpt: str
    body_html: str                     # cleaned inner HTML of <section data-field="body">
    cover_image_url: Optional[str] = None
    tags: list[str] = field(default_factory=list)   # not in export HTML
    featured: bool = False                           # not in export HTML
    publication: Optional[str] = None               # not in export HTML


def _parse_date(soup: BeautifulSoup) -> str:
    time_tag = soup.find("time", class_="dt-published")
    if time_tag and time_tag.get("datetime"):
        try:
            dt = datetime.fromisoformat(str(time_tag["datetime"]).replace("Z", "+00:00"))
            return dt.astimezone(timezone.utc).strftime("%Y-%m-%d")
        except ValueError:
            pass
    return datetime.now(timezone.utc).strftime("%Y-%m-%d")


def _parse_excerpt(soup: BeautifulSoup) -> str:
    subtitle = soup.find("section", attrs={"data-field": "subtitle"})
    if not subtitle:
        return ""
    # Use BeautifulSoup's get_text to decode HTML entities automatically
    raw = re.sub(r"\s+", " ", subtitle.get_text()).strip()
    if len(raw) > 220:
        raw = raw[:220].rsplit(" ", 1)[0] + "…"
    return raw


def _parse_cover(body_section: BeautifulSoup) -> Optional[str]:
    """Return the src of the first <img> in the first <figure> of the body."""
    fig = body_section.find("figure")
    if fig:
        img = fig.find("img")
        if img and img.get("src"):
            return str(img["src"])
    return None


def _clean_body(body_section: BeautifulSoup) -> str:
    """
    Strip Medium export boilerplate before conversion:
    - <hr class="section-divider"> decorative rules → would become --- in markdown
    - First .graf--title heading → already in frontmatter
    - First <figure> → cover image already shown by PostHero
    """
    for hr in body_section.find_all("hr", class_="section-divider"):
        hr.decompose()

    title_el = body_section.find(class_="graf--title")
    if title_el:
        title_el.decompose()

    first_fig = body_section.find("figure")
    if first_fig:
        first_fig.decompose()

    return str(body_section)


def load_export_dir(input_dir: Path) -> list[ArticleData]:
    """
    Parse all article HTML files from a Medium export posts/ directory.
    Comment responses and non-article files (no body section) are skipped.
    Returns articles sorted newest-first.
    """
    articles: list[ArticleData] = []

    for html_file in sorted(input_dir.glob("*.html")):
        # Skip unpublished draft files
        if html_file.name.startswith("draft_"):
            continue

        try:
            soup = BeautifulSoup(html_file.read_text(encoding="utf-8"), "lxml")
        except Exception:
            continue

        # Must have a body section
        body_section = soup.find("section", attrs={"data-field": "body"})
        if not body_section:
            continue

        # Real articles always have at least one heading (h2/h3/h4).
        # Comment responses and short replies have none.
        if not body_section.find(["h2", "h3", "h4"]):
            continue

        # Must have a canonical URL in the footer
        canonical_tag = soup.find("a", class_="p-canonical")
        if not canonical_tag or not canonical_tag.get("href"):
            continue

        title_tag = soup.find("h1", class_="p-name")
        title = title_tag.get_text(strip=True) if title_tag else html_file.stem

        cover = _parse_cover(body_section)

        articles.append(
            ArticleData(
                title=title,
                date=_parse_date(soup),
                canonical_url=str(canonical_tag["href"]),
                excerpt=_parse_excerpt(soup),
                cover_image_url=cover,
                body_html=_clean_body(body_section),
            )
        )

    articles.sort(key=lambda a: a.date, reverse=True)
    return articles
