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
  coverImage?: string; // optional — place images in /public/assets/blog/
  isInternal?: boolean; // true for locally scraped articles (links to /blog/[slug])
  readingTime?: number;
  publication?: string;
}

const BlogLinks: BlogLink[] = [
  {
    title: "SPARC-ME: Building a Python Library for Standardised Biomedical Datasets",
    excerpt: "How our team built a Python library that lets researchers programmatically read, create, and convert standardised biomedical datasets — and why open science infrastructure matters.",
    url: "https://savindi-wijenayaka.medium.com/",
    date: "2022-08-10",
    tags: ["Open Science", "Python", "Biomedical"],
    source: "medium",
    coverImage: "/assets/achievements/sparc-2022.png",
  },
  {
    title: "3D Anatomy on the Cloud: Building SPARC-SPy",
    excerpt: "A walkthrough of how we generated 3D visualisations of anatomical scaffold datasets on a cloud platform, making biomedical research data more accessible and reusable.",
    url: "https://savindi-wijenayaka.medium.com/",
    date: "2024-08-20",
    tags: ["Python", "3D Visualisation", "SPARC"],
    source: "medium",
    coverImage: "/assets/achievements/sparc-2024.jpeg",
  },
  {
    title: "Tackling Class Imbalance in Customer Churn Prediction",
    excerpt: "A look at the strategies we used for handling severely imbalanced data in a churn prediction challenge — from SMOTE to ensemble methods and evaluation beyond accuracy.",
    url: "https://savindi-wijenayaka.medium.com/",
    date: "2020-10-05",
    tags: ["Machine Learning", "Data Science", "Python"],
    source: "medium",
    coverImage: "/assets/achievements/datastorm-2020.jpg",
  },
];

export default BlogLinks;
