import type { MetadataRoute } from "next";
import { getAllPostMetas } from "@/lib/blog";

export const dynamic = "force-static";

const SITE = "https://savindi.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostMetas().map((p) => ({
    url: `${SITE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [
    { url: SITE, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/blog`, changeFrequency: "monthly", priority: 0.7 },
    ...posts,
  ];
}
