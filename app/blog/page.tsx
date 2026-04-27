import { getAllPostMetas } from "@/lib/blog";
import BlogListClient from "@/components/blog/BlogListClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing",
  description: "Articles on machine learning, open science, and building things that matter.",
};

export default function BlogPage() {
  const posts = getAllPostMetas().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <header style={{ marginBottom: "3rem" }}>
        <p
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--lavender)",
            margin: "0 0 0.75rem",
          }}
        >
          Writing
        </p>
        <h1
          style={{
            fontFamily: "var(--font-sans), system-ui, sans-serif",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 700,
            color: "var(--text-primary)",
            margin: "0 0 1rem",
            lineHeight: 1.2,
          }}
        >
          From the <em>notebook</em>
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            margin: 0,
            maxWidth: "55ch",
          }}
        >
          Thoughts on machine learning, open science, and building things that matter.
          Originally published on{" "}
          <a
            href="https://savindi-wijenayaka.medium.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--lavender)" }}
          >
            Medium
          </a>
          .
        </p>
      </header>

      {posts.length === 0 ? (
        <p
          style={{
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono), monospace",
            fontSize: 13,
          }}
        >
          No articles yet — check back soon.
        </p>
      ) : (
        <BlogListClient posts={posts} />
      )}
    </>
  );
}
