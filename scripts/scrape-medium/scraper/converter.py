"""Convert Medium export HTML to clean Markdown."""

from __future__ import annotations

import re

from markdownify import MarkdownConverter

# Unicode spaces Medium injects for typographic line-break control
_UNICODE_SPACES = str.maketrans({
    "\xa0":  " ",   # non-breaking space  (most common)
    "\u200a": " ",  # hair space          (around em-dashes)
    "\u2009": " ",  # thin space
    "\u202f": " ",  # narrow no-break space
})

_NOISE_RE = re.compile(
    r"^\s*(Follow|Subscribe|Sign (in|up)|Get started|Clap|More from|Written by|"
    r"\d+ (claps?|min read)).*$",
    flags=re.MULTILINE | re.IGNORECASE,
)


class _ExportConverter(MarkdownConverter):
    """
    Extends markdownify to handle Medium export HTML specifics:

    - <pre data-code-block-lang="yaml"> blocks contain hljs <span>s and <br/> for
      newlines. By the time convert_pre is called, markdownify has already reduced
      those spans to plain text and converted <br/> to newlines, so `text` is the
      clean code content. We just add the language marker.

    - Inline <code> is handled by markdownify's default convert_code → `backtick`.
    """

    def convert_pre(self, el, text, convert_as_inline=False, **kwargs):  # noqa: ANN001
        lang = el.get("data-code-block-lang", "")
        return f"\n\n```{lang}\n{text.strip()}\n```\n\n"


def export_html_to_markdown(html: str) -> str:
    """Convert the body HTML from a Medium export file to clean Markdown."""
    md = _ExportConverter(
        heading_style="ATX",
        bullets="-",
        strip=["script", "style", "noscript", "aside", "header", "footer"],
        newline_style="",
    ).convert(html)

    # Normalise Medium typographic Unicode spaces → regular ASCII space
    md = md.translate(_UNICODE_SPACES)

    # Remove Medium noise lines (clap counts, sign-up prompts, etc.)
    md = _NOISE_RE.sub("", md)

    # Normalise whitespace around images
    md = re.sub(r"\n!\[([^\]]*)\]\(([^)]+)\)\n", r"\n\n![\1](\2)\n\n", md)

    # Strip trailing whitespace per line
    md = "\n".join(line.rstrip() for line in md.splitlines())

    # Max 2 consecutive blank lines
    md = re.sub(r"\n{3,}", "\n\n", md).strip()

    return md
