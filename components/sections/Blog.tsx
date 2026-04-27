"use client";

import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import TagChip from "@/components/ui/TagChip";
import { formatDate } from "@/lib/format";
import { BlogLink } from "@/data/blog-links";

function CoverPlaceholder() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(135deg, var(--bg-elevated) 0%, var(--lavender-dim) 60%, var(--bg-elevated) 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <rect x="4" y="4" width="20" height="14" rx="2" stroke="var(--lavender)" strokeWidth="1.2" opacity="0.4" />
        <path d="M4 13l5-4 4 3 4-5 7 7" stroke="var(--lavender)" strokeWidth="1.2" opacity="0.4" strokeLinejoin="round" />
        <circle cx="9" cy="9" r="1.5" fill="var(--lavender)" opacity="0.4" />
        <line x1="4" y1="22" x2="24" y2="22" stroke="var(--lavender)" strokeWidth="1" opacity="0.25" />
        <line x1="4" y1="25" x2="18" y2="25" stroke="var(--lavender)" strokeWidth="1" opacity="0.15" />
      </svg>
    </div>
  );
}

function PostLinkWrapper({
  post,
  className,
  style,
  onMouseEnter,
  onMouseLeave,
  children,
}: {
  post: BlogLink;
  className?: string;
  style?: React.CSSProperties;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  children: React.ReactNode;
}) {
  if (post.isInternal) {
    return (
      <Link
        href={post.url}
        data-accent="lavender"
        className={className}
        style={{ textDecoration: "none", ...style }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      data-accent="lavender"
      className={className}
      style={{ textDecoration: "none", ...style }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
}

function FeaturedPost({ post }: { post: BlogLink }) {
  return (
    <PostLinkWrapper
      post={post}
      style={{ display: "block" }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        const title = el.querySelector(".blog-title") as HTMLElement;
        const img = el.querySelector(".blog-img-inner") as HTMLElement;
        const arrow = el.querySelector(".blog-arrow") as HTMLElement;
        if (title) title.style.color = "var(--lavender)";
        if (img) img.style.transform = "scale(1.04)";
        if (arrow) arrow.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        const title = el.querySelector(".blog-title") as HTMLElement;
        const img = el.querySelector(".blog-img-inner") as HTMLElement;
        const arrow = el.querySelector(".blog-arrow") as HTMLElement;
        if (title) title.style.color = "var(--text-primary)";
        if (img) img.style.transform = "scale(1)";
        if (arrow) arrow.style.opacity = "0.55";
      }}
    >
      <div className="blog-featured-grid">
        {/* Image */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "var(--radius-md)",
            aspectRatio: "16 / 10",
          }}
        >
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 48vw"
              className="blog-img-inner"
              style={{
                objectFit: "cover",
                transition: "transform 400ms var(--ease-out)",
              }}
            />
          ) : (
            <CoverPlaceholder />
          )}
        </div>

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "1rem" }}>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {post.tags.map((t) => (
              <TagChip key={t} label={t} variant="bordered" />
            ))}
          </div>

          <h3
            className="blog-title"
            style={{
              fontFamily: "var(--font-sans), system-ui, sans-serif",
              fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
              fontWeight: 600,
              color: "var(--text-primary)",
              lineHeight: 1.3,
              margin: 0,
              transition: "color 220ms",
            }}
          >
            {post.title}
          </h3>

          <p
            style={{
              fontSize: 14,
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              margin: 0,
              maxWidth: "52ch",
            }}
          >
            {post.excerpt}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                color: "var(--text-muted)",
                letterSpacing: "0.04em",
              }}
            >
              {formatDate(post.date)}
            </span>
            <span
              className="blog-arrow"
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 12,
                color: "var(--lavender)",
                opacity: 0.55,
                transition: "opacity 220ms",
                letterSpacing: "0.04em",
              }}
            >
              {post.isInternal ? "Read article →" : "Read on Medium ↗"}
            </span>
          </div>
        </div>
      </div>
    </PostLinkWrapper>
  );
}

function SecondaryPost({ post, delay }: { post: BlogLink; delay: number }) {
  return (
    <RevealOnScroll delay={delay}>
      <PostLinkWrapper
        post={post}
        style={{
          display: "flex",
          gap: "1.5rem",
          alignItems: "flex-start",
          paddingTop: "1.5rem",
          paddingBottom: "1.5rem",
          borderTop: "1px solid var(--border)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          const title = el.querySelector(".blog-title") as HTMLElement;
          const img = el.querySelector(".blog-img-inner") as HTMLElement;
          if (title) title.style.color = "var(--lavender)";
          if (img) img.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          const title = el.querySelector(".blog-title") as HTMLElement;
          const img = el.querySelector(".blog-img-inner") as HTMLElement;
          if (title) title.style.color = "var(--text-primary)";
          if (img) img.style.transform = "scale(1)";
        }}
      >
        {/* Thumbnail */}
        <div
          style={{
            width: 120,
            height: 80,
            flexShrink: 0,
            position: "relative",
            overflow: "hidden",
            borderRadius: "var(--radius-sm)",
          }}
        >
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="120px"
              className="blog-img-inner"
              style={{
                objectFit: "cover",
                transition: "transform 350ms var(--ease-out)",
              }}
            />
          ) : (
            <CoverPlaceholder />
          )}
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "1rem",
              marginBottom: "0.4rem",
            }}
          >
            <h4
              className="blog-title"
              style={{
                fontFamily: "var(--font-sans), system-ui, sans-serif",
                fontSize: 15,
                fontWeight: 600,
                color: "var(--text-primary)",
                margin: 0,
                lineHeight: 1.35,
                transition: "color 220ms",
              }}
            >
              {post.title}
            </h4>
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                color: "var(--text-muted)",
                letterSpacing: "0.04em",
                flexShrink: 0,
                paddingTop: 2,
              }}
            >
              {formatDate(post.date)} {post.isInternal ? "→" : "↗"}
            </span>
          </div>

          <p
            style={{
              fontSize: 13,
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              margin: "0 0 0.5rem",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            } as React.CSSProperties}
          >
            {post.excerpt}
          </p>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {post.tags.map((t) => (
              <TagChip key={t} label={t} />
            ))}
          </div>
        </div>
      </PostLinkWrapper>
    </RevealOnScroll>
  );
}

export default function BlogSection({ posts }: { posts: BlogLink[] }) {
  if (posts.length === 0) return null;

  const [featured, ...rest] = posts;

  return (
    <section
      id="blog"
      style={{
        background: "var(--bg-base)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <RevealOnScroll>
          <SectionHeader
            label="Writing"
            accent="lavender"
            plain="From the "
            italic="notebook"
            description="Thoughts on machine learning, open science, and building things that matter."
          />
        </RevealOnScroll>

        {/* Featured post */}
        <RevealOnScroll>
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "2rem", paddingBottom: "2rem" }}>
            <FeaturedPost post={featured} />
          </div>
        </RevealOnScroll>

        {/* Secondary posts */}
        {rest.map((post, i) => (
          <SecondaryPost key={post.url + i} post={post} delay={i * 60} />
        ))}

        {/* View all */}
        <RevealOnScroll>
          <div
            style={{
              borderTop: "1px solid var(--border)",
              paddingTop: "1.5rem",
              display: "flex",
              justifyContent: "flex-end",
              gap: "1.5rem",
            }}
          >
            <Link
              href="/blog"
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 12,
                color: "var(--text-muted)",
                letterSpacing: "0.08em",
                textDecoration: "none",
                transition: "color 200ms",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--lavender)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)")}
            >
              View all writing →
            </Link>
            <a
              href="https://savindi-wijenayaka.medium.com/"
              target="_blank"
              rel="noopener noreferrer"
              data-accent="lavender"
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 12,
                color: "var(--text-muted)",
                letterSpacing: "0.08em",
                textDecoration: "none",
                transition: "color 200ms",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--lavender)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)")}
            >
              View on Medium ↗
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
