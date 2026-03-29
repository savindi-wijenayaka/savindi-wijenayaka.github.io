/**
 * External blog posts (e.g. Medium articles).
 * These are merged with local MDX posts in /app/blog/page.tsx, sorted by date.
 *
 * To add a Medium post:
 * 1. Copy the object structure below
 * 2. Fill in the real title, excerpt, url, date, and tags
 * 3. The post will automatically appear in the blog listing and home preview
 */

export interface BlogLink {
  title: string;
  excerpt: string;
  url: string;
  date: string; // ISO format: "YYYY-MM-DD"
  tags: string[];
  source: "medium";
}

const BlogLinks: BlogLink[] = [
  // Add your Medium posts here. Example:
  // {
  //   title: "Understanding Attention Mechanisms in Deep Learning",
  //   excerpt: "A deep dive into how attention mechanisms work in transformer models and why they revolutionised NLP and computer vision.",
  //   url: "https://savindi-wijenayaka.medium.com/your-post-slug",
  //   date: "2024-03-15",
  //   tags: ["Deep Learning", "Transformers", "NLP"],
  //   source: "medium",
  // },
];

export default BlogLinks;
