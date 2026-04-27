"use client";

import Image from "next/image";
import Link from "next/link";
import TagChip from "@/components/ui/TagChip";
import { formatDate } from "@/lib/format";
import type { PostMeta } from "@/lib/blog";

function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <article
        style={{
          display: "grid",
          gridTemplateColumns: post.coverImage ? "1fr auto" : "1fr",
          gap: "1.5rem",
          alignItems: "flex-start",
          padding: "1.75rem 0",
          borderTop: "1px solid var(--border)",
          cursor: "pointer",
          transition: "opacity 200ms",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
      >
        <div style={{ minWidth: 0 }}>
          {/* Tags */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.6rem" }}>
            {post.featured && post.publication && (
              <TagChip label={post.publication} variant="bordered" />
            )}
            {post.tags.slice(0, 3).map((t) => (
              <TagChip key={t} label={t} />
            ))}
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-sans), system-ui, sans-serif",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              fontWeight: 600,
              color: "var(--text-primary)",
              lineHeight: 1.35,
              margin: "0 0 0.5rem",
            }}
          >
            {post.title}
          </h2>

          {/* Excerpt */}
          <p
            style={{
              fontSize: 14,
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              margin: "0 0 0.75rem",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            } as React.CSSProperties}
          >
            {post.excerpt}
          </p>

          {/* Meta */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              color: "var(--text-muted)",
              letterSpacing: "0.04em",
            }}
          >
            <span>{formatDate(post.date)}</span>
            {post.readingTime && <span>{post.readingTime} min read</span>}
          </div>
        </div>

        {/* Thumbnail */}
        {post.coverImage && (
          <div
            style={{
              width: 100,
              height: 70,
              flexShrink: 0,
              position: "relative",
              overflow: "hidden",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="100px"
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
      </article>
    </Link>
  );
}

export default function BlogListClient({ posts }: { posts: PostMeta[] }) {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
