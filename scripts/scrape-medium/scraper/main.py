"""CLI entrypoint — convert Medium export HTML files to Markdown."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from rich.console import Console
from rich.progress import Progress, SpinnerColumn, TextColumn
from rich.table import Table

from .converter import export_html_to_markdown
from .export import load_export_dir
from .frontmatter import build_frontmatter, frontmatter_to_yaml, make_slug
from .idempotency import is_already_scraped
from .images import download_cover_image
from .manifest import write_manifest

console = Console()

REPO_ROOT = Path(__file__).resolve().parents[3]
DEFAULT_OUTPUT_DIR = REPO_ROOT / "content" / "blog"
DEFAULT_IMAGES_DIR = REPO_ROOT / "public" / "assets" / "blog"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Convert Medium export HTML files to Markdown for the website.\n"
            "Point --input-dir at the posts/ folder inside the Medium export ZIP."
        )
    )
    parser.add_argument(
        "--input-dir",
        type=Path,
        required=True,
        metavar="DIR",
        help="Path to the posts/ folder from the Medium export ZIP",
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=DEFAULT_OUTPUT_DIR,
        help=f"Directory for Markdown output (default: {DEFAULT_OUTPUT_DIR})",
    )
    parser.add_argument(
        "--images-dir",
        type=Path,
        default=DEFAULT_IMAGES_DIR,
        help=f"Directory for downloaded cover images (default: {DEFAULT_IMAGES_DIR})",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Re-convert articles that already have a Markdown file.",
    )
    return parser.parse_args()


def write_markdown_file(slug: str, frontmatter: dict, body_md: str, output_dir: Path) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)
    yaml_block = frontmatter_to_yaml(frontmatter)
    content = f"{yaml_block}\n\n{body_md}\n"
    (output_dir / f"{slug}.md").write_text(content, encoding="utf-8")


def main() -> None:
    args = parse_args()

    if not args.input_dir.is_dir():
        console.print(f"[red]Error:[/red] --input-dir does not exist: {args.input_dir}")
        sys.exit(1)

    console.rule("[bold]Medium Export Converter[/bold]")
    console.print(f"Input dir  : [cyan]{args.input_dir}[/cyan]")
    console.print(f"Output dir : [cyan]{args.output_dir}[/cyan]")
    console.print(f"Images dir : [cyan]{args.images_dir}[/cyan]")
    console.print(f"Force      : [cyan]{args.force}[/cyan]")
    console.print()

    # ── When forcing, wipe existing markdown + manifest for a clean rebuild ──
    if args.force and args.output_dir.exists():
        for stale in args.output_dir.glob("*.md"):
            if stale.name != "_placeholder.md":
                stale.unlink()
        manifest = args.output_dir / "manifest.json"
        if manifest.exists():
            manifest.write_text("[]", encoding="utf-8")

    # ── Load export HTML files ─────────────────────────────────────────────
    with console.status("[bold]Loading export HTML files…[/bold]"):
        articles = load_export_dir(args.input_dir)

    console.print(f"[green]✓[/green] Found {len(articles)} articles")

    # ── Convert each article ───────────────────────────────────────────────
    all_frontmatters: list[dict] = []
    converted = 0
    skipped = 0
    failed = 0

    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        console=console,
    ) as progress:
        task = progress.add_task("Converting…", total=len(articles))

        for article in articles:
            slug = make_slug(article.title)
            progress.update(task, description=f"[dim]{slug[:55]}[/dim]")

            if not args.force and is_already_scraped(slug, args.output_dir):
                skipped += 1
                progress.advance(task)
                continue

            try:
                body_md = export_html_to_markdown(article.body_html)

                cover_web_path = None
                if article.cover_image_url:
                    cover_web_path = download_cover_image(
                        article.cover_image_url, slug, args.images_dir
                    )

                fm = build_frontmatter(article, slug, cover_web_path, body_md)
                write_markdown_file(slug, fm, body_md, args.output_dir)
                all_frontmatters.append(fm)
                converted += 1

            except Exception as exc:
                console.print(f"[red]✗[/red] Failed: {slug} — {exc}")
                failed += 1

            progress.advance(task)

    # ── Update manifest ────────────────────────────────────────────────────
    if all_frontmatters:
        manifest_path = args.output_dir / "manifest.json"
        write_manifest(all_frontmatters, manifest_path)
        console.print(f"[green]✓[/green] Manifest updated: {manifest_path}")

    # ── Summary ────────────────────────────────────────────────────────────
    console.print()
    table = Table(title="Summary", show_header=False, box=None)
    table.add_row("[green]Converted[/green]", str(converted))
    table.add_row("[yellow]Skipped[/yellow] (already exists)", str(skipped))
    table.add_row("[red]Failed[/red]", str(failed))
    console.print(table)

    if failed > 0:
        sys.exit(1)
