import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  source: "medium";
  mediumUrl: string;
  coverImage?: string;
  featured: boolean;
  readingTime?: number;
  publication?: string;
}

export function getAllPostMetas(): PostMeta[] {
  const manifestPath = path.join(CONTENT_DIR, "manifest.json");
  if (!fs.existsSync(manifestPath)) return [];
  try {
    const raw = fs.readFileSync(manifestPath, "utf-8");
    return JSON.parse(raw) as PostMeta[];
  } catch {
    return [];
  }
}

export function getPostSlugs(): string[] {
  return getAllPostMetas().map((p) => p.slug);
}

export function getPostMeta(slug: string): PostMeta | null {
  return getAllPostMetas().find((p) => p.slug === slug) ?? null;
}
