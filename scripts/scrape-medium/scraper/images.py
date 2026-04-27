"""Download cover images to the public/assets/blog/ directory."""

from __future__ import annotations

import os
import time
from pathlib import Path
from typing import Optional
from urllib.parse import urlparse

import requests

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    ),
}


def download_cover_image(
    image_url: str,
    slug: str,
    dest_dir: Path,
) -> Optional[str]:
    """
    Download the cover image to dest_dir/{slug}.{ext}.
    Returns the web path (e.g. /assets/blog/slug.jpg) or None on failure.
    """
    if not image_url:
        return None

    dest_dir.mkdir(parents=True, exist_ok=True)

    # Determine file extension from URL
    parsed_path = urlparse(image_url).path
    ext = Path(parsed_path).suffix.lower()
    if ext not in {".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif"}:
        ext = ".jpg"

    dest_file = dest_dir / f"{slug}{ext}"

    # Skip download if already exists
    if dest_file.exists():
        return f"/assets/blog/{slug}{ext}"

    time.sleep(0.5)
    try:
        resp = requests.get(image_url, headers=HEADERS, timeout=15, stream=True)
        resp.raise_for_status()

        with open(dest_file, "wb") as f:
            for chunk in resp.iter_content(chunk_size=8192):
                f.write(chunk)

        return f"/assets/blog/{slug}{ext}"
    except requests.RequestException as e:
        print(f"[images] Failed to download cover for {slug}: {e}")
        return None
