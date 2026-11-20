import { getAllPostMetas } from "@/lib/blog";
import BlogListClient from "@/components/blog/BlogListClient";
import type { Metadata } from "next";

const description = "Articles on machine learning, open science, and building things that matter.";

export const metadata: Metadata = {
  title: "Writing",
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Writing | Savindi Wijenayaka",
    description,
    url: "/blog",
    type: "website",
    images: [{ url: "/assets/brand/og_image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing | Savindi Wijenayaka",
    description,
    images: ["/assets/brand/og_image.png"],
  },
};

export default function BlogPage() {
  const posts = getAllPostMetas().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <header className="bl-head">
        <h1 className="bl-title">
          From the <em>notebook</em>
        </h1>
        <p className="bl-lede">
          Thoughts on machine learning, open science, and building things that matter.
          Originally published on{" "}
          <a href="https://savindi-wijenayaka.medium.com/" target="_blank" rel="noopener noreferrer">
            Medium
          </a>
          .
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="bl-empty">No articles yet. Check back soon.</p>
      ) : (
        <BlogListClient posts={posts} />
      )}
    </>
  );
}
