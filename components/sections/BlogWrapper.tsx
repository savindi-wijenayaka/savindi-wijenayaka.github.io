import { getAllPostMetas } from "@/lib/blog";
import BlogSection from "./Blog";
import StaticBlogLinks, { BlogLink } from "@/data/blog-links";

export default function BlogWrapper() {
  const scraped = getAllPostMetas();

  let posts: BlogLink[];

  if (scraped.length > 0) {
    // Only show featured posts (up to 5) on the home page
    const featured = scraped.filter((p) => p.featured).slice(0, 5);
    const source = featured.length > 0 ? featured : scraped.slice(0, 5);

    posts = source.map((p) => ({
      title: p.title,
      excerpt: p.excerpt,
      url: `/blog/${p.slug}`,
      date: p.date,
      tags: p.tags,
      source: "medium" as const,
      coverImage: p.coverImage,
      isInternal: true,
      readingTime: p.readingTime,
      publication: p.publication,
    }));
  } else {
    // Fallback to static data while manifest doesn't exist yet
    posts = StaticBlogLinks;
  }

  return <BlogSection posts={posts} />;
}
