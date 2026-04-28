"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Socials from "@/data/socials";

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        background: "var(--bg-base-t)",
        borderTop: "1px solid var(--border)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "clamp(2rem, 4vw, 3rem) clamp(1.5rem, 5vw, 4rem)",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <RevealOnScroll>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SectionHeader
              label="Contact"
              accent="lavender"
              plain="Let's "
              italic="connect"
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={80}>
          <p
            style={{
              fontSize: 17,
              color: "var(--text-secondary)",
              lineHeight: 1.9,
              marginBottom: "2rem",
              fontWeight: 300,
            }}
          >
            Open to interesting problems, research collaborations, and
            conversations about AI systems.
          </p>
        </RevealOnScroll>


        <RevealOnScroll delay={240}>
          <div
            style={{
              display: "flex",
              gap: "0.85rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {Socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "9px 20px",
                    borderRadius: "var(--radius-sm)",
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "11.5px",
                    textDecoration: "none",
                    border: "1px solid var(--border-lavender)",
                    color: "var(--text-secondary)",
                    transition: "all 200ms",
                    letterSpacing: "0.05em",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = "var(--lavender)";
                    el.style.color = "var(--lavender)";
                    el.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = "var(--border-lavender)";
                    el.style.color = "var(--text-secondary)";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  <Icon size={14} />
                  {s.label}
                </a>
              );
            })}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
