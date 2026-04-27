"use client";

import Socials from "@/data/socials";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "1.75rem clamp(1.25rem, 5vw, 3rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
        background: "var(--bg-base)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "10.5px",
          color: "var(--text-muted)",
          letterSpacing: "0.08em",
          margin: 0,
        }}
      >
        © {new Date().getFullYear()} Savindi Wijenayaka
      </p>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {Socials.map((s, i) => {
          const Icon = s.icon;
          return (
            <a
              key={i}
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              style={{
                color: "var(--text-muted)",
                fontSize: 16,
                transition: "color 150ms",
                display: "flex",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "var(--lavender)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)")
              }
            >
              <Icon />
            </a>
          );
        })}
      </div>
    </footer>
  );
}
