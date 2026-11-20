import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { formatDate } from "@/lib/format";
import type { BlogLink } from "@/data/blog-links";

function PostCard({ post }: { post: BlogLink }) {
  const inner = (
    <>
      <div className="post-cover">
        {post.coverImage && (
          <Image src={post.coverImage} alt="" fill sizes="(max-width: 900px) 100vw, 340px" />
        )}
      </div>
      <div className="post-body">
        <time dateTime={post.date}>
          {formatDate(post.date)}
          {post.readingTime ? ` · ${post.readingTime} min read` : ""}
        </time>
        <h3>{post.title}</h3>
      </div>
    </>
  );

  return post.isInternal ? (
    <Link href={post.url} className="post">
      {inner}
    </Link>
  ) : (
    <a href={post.url} target="_blank" rel="noopener noreferrer" className="post">
      {inner}
    </a>
  );
}

export default function BlogSection({ posts }: { posts: BlogLink[] }) {
  const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <section className="sec" id="writing">
      <div className="wrap">
        <RevealOnScroll>
          <p className="eyebrow">Writing</p>
          <h2 className="sec-title">Notes from the work</h2>
          <p className="lede">Articles on ML, Python and cloud.</p>
        </RevealOnScroll>
        <div className="posts">
          {latest.map((p, i) => (
            <RevealOnScroll key={p.url} delay={i * 70}>
              <PostCard post={p} />
            </RevealOnScroll>
          ))}
        </div>
        <p style={{ marginTop: 24 }}>
          <Link className="link" href="/blog">
            All articles <span aria-hidden>→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
