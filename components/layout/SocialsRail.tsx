"use client";

import Socials from "@/data/socials";

export default function SocialsRail() {
  return (
    <div
      style={{
        position: "fixed",
        left: "clamp(1.25rem, 3vw, 2rem)",
        bottom: 0,
        zIndex: 90,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "3.5rem",
      }}
    >
      {/* Connecting line — sits behind the buttons, runs through the stack and trails off past the last icon */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: 1,
          transform: "translateX(-50%)",
          background: "var(--border-emerald)",
        }}
      />

      {Socials.map((s) => {
        const Icon = s.icon;
        return (
          <a
            key={s.label}
            href={s.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            data-accent="emerald"
            style={{
              position: "relative",
              zIndex: 1,
              width: 50,
              height: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-emerald)",
              color: "var(--text-muted)",
              fontSize: 18,
              marginBottom: "1.4rem",
              transition: "color 150ms, border-color 150ms, transform 150ms, box-shadow 150ms",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "var(--emerald)";
              el.style.borderColor = "var(--emerald)";
              el.style.transform = "scale(1.1)";
              el.style.boxShadow = "var(--glow-emerald)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "var(--text-muted)";
              el.style.borderColor = "var(--border-emerald)";
              el.style.transform = "scale(1)";
              el.style.boxShadow = "none";
            }}
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
}
