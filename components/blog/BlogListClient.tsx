import Image from "next/image";
import Link from "next/link";
import TagChip from "@/components/ui/TagChip";
import { formatDate } from "@/lib/format";
import type { PostMeta } from "@/lib/blog";

function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`bl-item${post.coverImage ? " has-cover" : ""}`}
    >
      <div style={{ minWidth: 0 }}>
        <div className="bl-tags">
          {post.featured && post.publication && <TagChip label={post.publication} variant="bordered" />}
          {post.tags.slice(0, 3).map((t) => (
            <TagChip key={t} label={t} />
          ))}
        </div>
        <h2>{post.title}</h2>
        <p className="bl-excerpt">{post.excerpt}</p>
        <div className="bl-meta">
          <span>{formatDate(post.date)}</span>
          {post.readingTime && <span>{post.readingTime} min read</span>}
        </div>
      </div>

      {post.coverImage && (
        <div className="bl-thumb">
          <Image src={post.coverImage} alt="" fill sizes="(max-width: 600px) 100px, 168px" />
        </div>
      )}
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
