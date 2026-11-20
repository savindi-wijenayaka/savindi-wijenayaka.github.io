import type { MDXComponents } from "mdx/types";

const components = {
  img: ({ alt, src, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? ""}
      style={{
        width: "100%",
        height: "auto",
        borderRadius: "var(--radius-md)",
        margin: "1.5rem 0",
        display: "block",
      }}
      {...props}
    />
  ),
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1
      style={{
        fontFamily: "var(--font-sans), system-ui, sans-serif",
        fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
        fontWeight: 700,
        color: "var(--ink)",
        lineHeight: 1.25,
        margin: "2.5rem 0 1rem",
      }}
    >
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2
      style={{
        fontFamily: "var(--font-sans), system-ui, sans-serif",
        fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)",
        fontWeight: 600,
        color: "var(--ink)",
        lineHeight: 1.3,
        margin: "2rem 0 0.75rem",
      }}
    >
      {children}
    </h2>
  ),
  // The post title is the page's h1 and the posts were written with ### and #### subheads,
  // so each markdown level renders one element level up: no skipped levels in the outline.
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h2
      style={{
        fontFamily: "var(--font-sans), system-ui, sans-serif",
        fontSize: "clamp(1.25rem, 2.2vw, 1.5rem)",
        fontWeight: 600,
        color: "var(--ink)",
        lineHeight: 1.4,
        margin: "1.75rem 0 0.5rem",
      }}
    >
      {children}
    </h2>
  ),
  h4: ({ children }: { children?: React.ReactNode }) => (
    <h3
      style={{
        fontFamily: "var(--font-sans), system-ui, sans-serif",
        fontSize: "1.125rem",
        fontWeight: 600,
        color: "var(--ink)",
        lineHeight: 1.4,
        margin: "1.5rem 0 0.4rem",
      }}
    >
      {children}
    </h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p
      style={{
        fontSize: "1rem",
        lineHeight: 1.8,
        color: "var(--ink-2)",
        margin: "0 0 1.25rem",
      }}
    >
      {children}
    </p>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      style={{ color: "var(--plum)", textDecoration: "underline" }}
    >
      {children}
    </a>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote
      style={{
        borderLeft: "3px solid var(--plum)",
        paddingLeft: "1.25rem",
        margin: "1.5rem 0",
        color: "var(--muted)",
        fontStyle: "italic",
      }}
    >
      {children}
    </blockquote>
  ),
  code: ({ children }: { children?: React.ReactNode }) => (
    <code
      style={{
        fontFamily: "var(--font-mono), monospace",
        fontSize: "0.875em",
        background: "var(--card2)",
        color: "var(--plum)",
        borderRadius: "3px",
        padding: "0.15em 0.4em",
      }}
    >
      {children}
    </code>
  ),
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre
      className="blog-pre"
      style={{
        background: "var(--card2)",
        border: "1px solid var(--line)",
        borderRadius: "var(--radius-md)",
        padding: "1.25rem",
        overflowX: "auto",
        margin: "1.5rem 0",
        fontFamily: "var(--font-mono), monospace",
        fontSize: "0.875rem",
        lineHeight: 1.65,
        color: "var(--ink-2)",
      }}
    >
      {children}
    </pre>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="blog-ul">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="blog-ol">{children}</ol>
  ),
  hr: () => (
    <hr
      style={{
        border: "none",
        borderTop: "1px solid var(--line)",
        margin: "2rem 0",
      }}
    />
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
