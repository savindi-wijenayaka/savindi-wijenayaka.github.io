import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllPostMetas, getPostMeta, getPostSlugs, type PostMeta } from "@/lib/blog";
import BackLink from "@/components/ui/BackLink";
import TagChip from "@/components/ui/TagChip";
import type { Metadata } from "next";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getPostMeta(slug);
  if (!meta) return { title: "Post Not Found" };
  return {
    title: meta.title,
    description: meta.excerpt,
    openGraph: {
      title: meta.title,
      description: meta.excerpt,
      type: "article",
      publishedTime: meta.date,
      tags: meta.tags,
      images: meta.coverImage ? [{ url: meta.coverImage }] : [],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function PostHero({ meta }: { meta: PostMeta }) {
  return (
    <header style={{ marginBottom: "3rem" }}>
      {/* Back link */}
      <BackLink href="/blog" label="← Writing" />

      {/* Tags */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        {meta.featured && meta.publication && (
          <TagChip label={meta.publication} variant="bordered" />
        )}
        {meta.tags.map((t) => (
          <TagChip key={t} label={t} />
        ))}
      </div>

      {/* Title */}
      <h1
        style={{
          fontFamily: "var(--font-sans), system-ui, sans-serif",
          fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
          fontWeight: 700,
          color: "var(--text-primary)",
          lineHeight: 1.2,
          margin: "0 0 1rem",
        }}
      >
        {meta.title}
      </h1>

      {/* Meta row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          alignItems: "center",
          fontFamily: "var(--font-mono), monospace",
          fontSize: 12,
          color: "var(--text-muted)",
          letterSpacing: "0.04em",
          marginBottom: "1.5rem",
        }}
      >
        <span>{formatDate(meta.date)}</span>
        {meta.readingTime && <span>{meta.readingTime} min read</span>}
        <a
          href={meta.mediumUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--lavender)", textDecoration: "none" }}
        >
          Read on Medium ↗
        </a>
      </div>

      {/* Cover image */}
      {meta.coverImage && (
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            overflow: "hidden",
            borderRadius: "var(--radius-md)",
            marginBottom: "2.5rem",
          }}
        >
          <Image
            src={meta.coverImage}
            alt={meta.title}
            fill
            priority
            sizes="(max-width: 800px) 100vw, 800px"
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
    </header>
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getPostMeta(slug);

  if (!meta) notFound();

  const { default: PostContent } = await import(`@/content/blog/${slug}.md`);

  return (
    <article>
      <PostHero meta={meta} />
      <div
        style={{
          fontSize: "1rem",
          lineHeight: 1.8,
          color: "var(--text-secondary)",
        }}
      >
        <PostContent />
      </div>
    </article>
  );
}
