import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostMeta, getPostSlugs, type PostMeta } from "@/lib/blog";
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
  // Some excerpts are just a greeting; fall back to a real description for search results.
  const description =
    meta.excerpt && meta.excerpt.length >= 60
      ? meta.excerpt
      : `${meta.title}. ${meta.readingTime ? `A ${meta.readingTime}-minute read` : "An article"} by Savindi Wijenayaka.`;
  // A page-level openGraph replaces the root one, so always supply an image.
  const image = meta.coverImage ?? "/assets/brand/og_image.png";
  return {
    title: meta.title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: meta.title,
      description,
      type: "article",
      publishedTime: meta.date,
      tags: meta.tags,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description,
      images: [image],
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
      <BackLink href="/blog" label="← Writing" />

      <div className="bl-tags" style={{ marginBottom: "1rem" }}>
        {meta.featured && meta.publication && <TagChip label={meta.publication} variant="bordered" />}
        {meta.tags.map((t) => (
          <TagChip key={t} label={t} />
        ))}
      </div>

      <h1 className="bl-post-title">{meta.title}</h1>

      <div className="bl-meta" style={{ marginBottom: "1.5rem" }}>
        <span>{formatDate(meta.date)}</span>
        {meta.readingTime && <span>{meta.readingTime} min read</span>}
        <a href={meta.mediumUrl} target="_blank" rel="noopener noreferrer">
          Read on Medium ↗
        </a>
      </div>

      {meta.coverImage && (
        <div className="bl-cover">
          <Image src={meta.coverImage} alt="" fill priority sizes="(max-width: 800px) 100vw, 800px" />
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
      <div className="blog-body">
        <PostContent />
      </div>
    </article>
  );
}
