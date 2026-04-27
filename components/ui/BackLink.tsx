"use client";

import Link from "next/link";

export default function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        fontFamily: "var(--font-mono), monospace",
        fontSize: 12,
        color: "var(--text-muted)",
        textDecoration: "none",
        letterSpacing: "0.06em",
        marginBottom: "2rem",
        transition: "color 200ms",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--lavender)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)")}
    >
      {label}
    </Link>
  );
}
