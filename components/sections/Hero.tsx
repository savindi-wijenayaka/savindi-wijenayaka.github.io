"use client";

import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ParallaxLayer from "@/components/ui/ParallaxLayer";
import Socials from "@/data/socials";
import ResearchConstellation from "@/components/ui/ResearchConstellation";
import { SECTION_IDS } from "@/components/ui/FullpageScroll";

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

      {/* Floating research fragments — purely atmospheric, right half of hero */}
      <div
        className="hero-research-tags"
        aria-hidden
        style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}
      >
        <ResearchConstellation />
      </div>

      <ParallaxLayer speed={0.12} style={{ position: "relative", zIndex: 1, width: "100%" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(3rem, 8vw, 5rem) clamp(1.5rem, 5vw, 4rem)",
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
              marginBottom: "2.2rem",
              lineHeight: 1.9,
            }}
          >
            Building intelligent systems that learn, adapt, and make sense of
            complex data - from research to production.
          </p>
        </RevealOnScroll>

        {/* Impact stats */}
        <RevealOnScroll delay={280}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.75rem",
              marginBottom: "2.4rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { value: "4", color: "var(--blue)", label: "Domains" },
              null,
              {
                split: ["3+", "3+"],
                colors: ["var(--emerald)", "var(--lavender-soft)"],
                label: "Yrs Industry / Academia",
              },
              null,
              { value: "8", color: "var(--emerald)", label: "Projects" },
            ].map((item, i) =>
              item === null ? (
                <span
                  key={i}
                  aria-hidden
                  style={{
                    display: "inline-block",
                    width: 1,
                    height: 30,
                    background: "var(--border-emerald)",
                  }}
                />
              ) : (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "clamp(1.3rem, 2.4vw, 1.7rem)",
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    {item.split ? (
                      <>
                        <span style={{ color: item.colors![0] }}>{item.split[0]}</span>
                        <span style={{ color: "var(--text-muted)", fontSize: "0.7em" }}> / </span>
                        <span style={{ color: item.colors![1] }}>{item.split[1]}</span>
                      </>
                    ) : (
                      <span style={{ color: item.color }}>{item.value}</span>
                    )}
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 10,
                      color: "var(--text-muted)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              )
            )}
          </div>
        </RevealOnScroll>

        {/* CTA buttons */}
        <RevealOnScroll delay={320}>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
            <a
              href="/CV_SavindiWijenayaka_ML.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-accent="emerald"
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
                boxShadow: "none",
                transition: "transform 200ms, box-shadow 200ms",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.boxShadow = "0 0 12px rgba(99,196,173,0.30)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.boxShadow = "none";
                el.style.transform = "translateY(0)";
              }}
            >
              Download CV
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(
                  new CustomEvent("fullpage:goto", {
                    detail: { index: SECTION_IDS.indexOf("projects") },
                  })
                );
              }}
              data-accent="blue"
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
              View My Work
            </a>
          </div>
        </RevealOnScroll>

        {/* Social links */}
        <RevealOnScroll delay={380}>
          <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
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
                    color: "var(--text-muted)",
                    fontSize: 18,
                    transition: "color 150ms, transform 150ms ease-out",
                    display: "flex",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = "var(--emerald)";
                    el.style.transform = "scale(1.2)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = "var(--text-muted)";
                    el.style.transform = "scale(1)";
                  }}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </RevealOnScroll>

      </div>
      </ParallaxLayer>
    </section>
  );
}
