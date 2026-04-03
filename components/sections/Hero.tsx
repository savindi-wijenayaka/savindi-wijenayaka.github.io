"use client";

import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Socials from "@/data/socials";

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: 62,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Frosted vignette — keeps hero text readable over the neural canvas */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 75% 90% at 20% 50%, var(--bg-void) 38%, transparent 75%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(3rem, 8vw, 5rem) clamp(1.5rem, 5vw, 4rem)",
          position: "relative",
          zIndex: 1,
          width: "100%",
        }}
      >
        {/* Role tag */}
        <RevealOnScroll>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              color: "var(--emerald)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "1.8rem",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 28,
                height: 1,
                background: "var(--emerald)",
              }}
            />
            Machine Learning Engineer
            <span
              style={{
                display: "inline-block",
                width: 28,
                height: 1,
                background: "var(--emerald)",
              }}
            />
          </div>
        </RevealOnScroll>

        {/* Name */}
        <RevealOnScroll delay={80}>
          <h1
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "clamp(2rem, 7vw, 5rem)",
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.05em",
              color: "var(--text-primary)",
              marginBottom: "1.5rem",
            }}
          >
            <span style={{ display: "block" }}>Savindi</span>
            <span
              style={{
                display: "block",
                color: "var(--emerald)",
                fontStyle: "italic",
                textShadow: "0 0 40px rgba(99,196,173,0.30)",
              }}
            >
              Wijenayaka
              <span
                style={{
                  display: "inline-block",
                  width: "0.55em",
                  height: 3,
                  background: "var(--emerald)",
                  marginLeft: 4,
                  verticalAlign: "-0.08em",
                  animation: "blink 1.1s step-end infinite",
                  boxShadow: "var(--glow-emerald)",
                }}
              />
            </span>
          </h1>
        </RevealOnScroll>

        {/* Function-style subtitle */}
        <RevealOnScroll delay={160}>
          <p
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "clamp(0.8rem, 1.6vw, 0.95rem)",
              color: "var(--text-muted)",
              marginBottom: "1.5rem",
              letterSpacing: "0.05em",
            }}
          >
            <span style={{ color: "var(--emerald)" }}>engineer</span>
            <span style={{ color: "var(--text-muted)" }}>(</span>
            <span style={{ color: "var(--blue)" }}>nlp</span>
            <span style={{ color: "var(--text-muted)" }}>, </span>
            <span style={{ color: "var(--blue)" }}>cv</span>
            <span style={{ color: "var(--text-muted)" }}>, </span>
            <span style={{ color: "var(--blue)" }}>mlops</span>
            <span style={{ color: "var(--text-muted)" }}>, </span>
            <span style={{ color: "var(--lavender)" }}>research</span>
            <span style={{ color: "var(--text-muted)" }}>)</span>
          </p>
        </RevealOnScroll>

        {/* Description */}
        <RevealOnScroll delay={240}>
          <p
            style={{
              fontSize: 17,
              color: "var(--text-secondary)",
              fontWeight: 400,
              maxWidth: 520,
              marginBottom: "2.8rem",
              lineHeight: 1.9,
            }}
          >
            Building intelligent systems that learn, adapt, and make sense of
            complex data — from research to production.
          </p>
        </RevealOnScroll>

        {/* CTA buttons */}
        <RevealOnScroll delay={320}>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
            <a
              href="#projects"
              style={{
                display: "inline-block",
                padding: "11px 26px",
                fontFamily: "var(--font-mono), monospace",
                fontSize: "11.5px",
                fontWeight: 400,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: 3,
                background: "var(--emerald)",
                color: "var(--bg-void)",
                border: "1.5px solid var(--emerald)",
                transition: "background 200ms, color 200ms, transform 200ms",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "transparent";
                el.style.color = "var(--emerald)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "var(--emerald)";
                el.style.color = "var(--bg-void)";
                el.style.transform = "translateY(0)";
              }}
            >
              View My Work
            </a>
            <a
              href="/CV_SavindiWijenayaka_ML.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "11px 26px",
                fontFamily: "var(--font-mono), monospace",
                fontSize: "11.5px",
                fontWeight: 400,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: 3,
                background: "transparent",
                color: "var(--text-primary)",
                border: "1.5px solid var(--border-emerald)",
                transition: "border-color 200ms, color 200ms, transform 200ms",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "var(--blue)";
                el.style.color = "var(--blue)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "var(--border-emerald)";
                el.style.color = "var(--text-primary)";
                el.style.transform = "translateY(0)";
              }}
            >
              Download CV
            </a>
          </div>
        </RevealOnScroll>

        {/* Social links */}
        <RevealOnScroll delay={380}>
          <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
            {Socials.map((s, i) => {
              const Icon = s.icon;
              return (
                <a
                  key={i}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.link}
                  style={{
                    color: "var(--text-muted)",
                    fontSize: 18,
                    transition: "color 150ms",
                    display: "flex",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = "var(--emerald)")
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
        </RevealOnScroll>
      </div>
    </section>
  );
}
