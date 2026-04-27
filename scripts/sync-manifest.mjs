/**
 * sync-manifest.mjs
 *
 * Scans content/blog/*.md, reads each file's frontmatter, and rebuilds
 * manifest.json. Runs automatically via the prebuild / predev npm hooks.
 *
 * The markdown frontmatter is the source of truth — including `featured`.
 * To feature a post: set `featured: true` in the .md file and rebuild.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_DIR = path.join(ROOT, "content", "blog");
const MANIFEST_PATH = path.join(CONTENT_DIR, "manifest.json");

function calcReadingTime(body) {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

const files = fs
  .readdirSync(CONTENT_DIR)
  .filter((f) => f.endsWith(".md") && f !== "_placeholder.md")
  .sort();

const entries = [];
let added = 0;
let synced = 0;

// Load existing manifest so we can detect truly new entries
const existing = new Set();
if (fs.existsSync(MANIFEST_PATH)) {
  try {
    JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8")).forEach((e) =>
      existing.add(e.slug)
    );
  } catch {}
}

for (const file of files) {
  const { data: fm, content: body } = matter(
    fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8")
  );

  // Skip files that don't look like blog posts
  if (!fm.title && !fm.slug) continue;

  const slug = fm.slug || path.basename(file, ".md");
  const isNew = !existing.has(slug);

  const entry = {
    title: fm.title || slug,
    slug,
    date: fm.date
      ? String(fm.date).slice(0, 10)
      : new Date().toISOString().slice(0, 10),
    excerpt: fm.excerpt || "",
    tags: fm.tags || [],
    source: fm.source || "medium",
    mediumUrl: fm.mediumUrl || "",
    featured: fm.featured === true,
    readingTime: fm.readingTime || calcReadingTime(body),
    convertedAt:
      fm.convertedAt || new Date().toISOString().replace(/\.\d+Z$/, "Z"),
  };

  if (fm.coverImage) entry.coverImage = fm.coverImage;
  if (fm.publication) entry.publication = fm.publication;

  entries.push(entry);
  if (isNew) added++;
  else synced++;
}

// Sort newest-first
entries.sort((a, b) => b.date.localeCompare(a.date));

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(entries, null, 2) + "\n", "utf-8");

console.log(
  `sync-manifest: ${added} new, ${synced} synced → manifest.json (${entries.length} total)`
);
