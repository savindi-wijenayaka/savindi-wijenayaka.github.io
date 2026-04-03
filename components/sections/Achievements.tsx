"use client";

import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Achievements, { AchievementCategories } from "@/data/achievements";
import { useState } from "react";

export default function AchievementsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const categories = ["All", ...AchievementCategories];

  const filtered =
    activeCategory === "All"
      ? Achievements
      : Achievements.filter((a) => a.category === activeCategory);

  return (
    <section
      id="achievements"
      style={{
        background: "var(--bg-void)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <RevealOnScroll>
          <SectionHeader
            label="Achievements"
            accent="lavender"
            plain="Highlights & "
            italic="honours"
            description="Competitions, awards, and milestones across engineering and leadership."
          />
        </RevealOnScroll>

        {/* Category filter */}
        <RevealOnScroll>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "5px 14px",
                    borderRadius: "var(--radius-sm)",
                    border: `1px solid ${isActive ? "var(--border-lavender)" : "var(--border)"}`,
                    background: isActive ? "var(--lavender-glow)" : "transparent",
                    color: isActive ? "var(--lavender)" : "var(--text-muted)",
                    cursor: "pointer",
                    transition: "all 150ms",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </RevealOnScroll>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {filtered.map((ach, idx) => {
            const isEngineering = ach.category === "Engineering";
            const accent = isEngineering ? "var(--blue)" : "var(--lavender)";
            const borderAccent = isEngineering
              ? "var(--border-blue)"
              : "var(--border-lavender)";

            return (
              <RevealOnScroll key={ach.id} delay={idx * 60}>
                <div
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    borderLeft: `2px solid ${accent}`,
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    position: "relative",
                    transition: "transform 220ms, border-color 220ms",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "translateY(-3px)";
                    el.style.borderColor = borderAccent;
                    const overlay = el.querySelector(".ach-overlay") as HTMLElement;
                    if (overlay) overlay.style.transform = "translateY(0)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "translateY(0)";
                    el.style.borderColor = "var(--border)";
                    el.style.borderLeftColor = accent;
                    const overlay = el.querySelector(".ach-overlay") as HTMLElement;
                    if (overlay) overlay.style.transform = "translateY(100%)";
                  }}
                >
                  {/* Card content */}
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "flex-start",
                      padding: "1.25rem 1.5rem",
                    }}
                  >
                    {/* Photo */}
                    <div
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: "var(--radius-md)",
                        overflow: "hidden",
                        flexShrink: 0,
                        border: "1px solid var(--border)",
                        position: "relative",
                      }}
                    >
                      <Image
                        src={ach.photo}
                        alt={ach.award}
                        fill
                        sizes="72px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {/* Award title */}
                      <div
                        style={{
                          fontFamily: "var(--font-sans), system-ui, sans-serif",
                          fontSize: 15,
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          marginBottom: 3,
                          lineHeight: 1.3,
                        }}
                      >
                        {ach.title}
                      </div>

                      {/* Competition */}
                      <div
                        style={{
                          fontSize: 13,
                          color: "var(--text-secondary)",
                          marginBottom: 4,
                        }}
                      >
                        {ach.award}
                      </div>

                      {/* Meta */}
                      <div
                        style={{
                          display: "flex",
                          gap: "0.75rem",
                          flexWrap: "wrap",
                          alignItems: "center",
                        }}
                      >
                        {ach.level && (
                          <span
                            style={{
                              fontFamily: "var(--font-mono), monospace",
                              fontSize: 10,
                              color: "var(--text-muted)",
                              letterSpacing: "0.06em",
                            }}
                          >
                            {ach.level}
                          </span>
                        )}
                        <span
                          style={{
                            fontFamily: "var(--font-mono), monospace",
                            fontSize: 11,
                            color: accent,
                            letterSpacing: "0.04em",
                          }}
                        >
                          {ach.year}
                        </span>
                      </div>

                      {ach.representing && (
                        <div
                          style={{
                            fontFamily: "var(--font-mono), monospace",
                            fontSize: 10,
                            color: "var(--text-muted)",
                            marginTop: 3,
                            letterSpacing: "0.04em",
                          }}
                        >
                          {ach.representing}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hover overlay with description */}
                  <div
                    className="ach-overlay"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(7, 12, 24, 0.93)",
                      backdropFilter: "blur(8px)",
                      transform: "translateY(100%)",
                      transition: "transform 250ms var(--ease-out)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      padding: "1.25rem 1.5rem",
                    }}
                  >
                    <div
                      style={{
                        height: 2,
                        background: accent,
                        borderRadius: 1,
                        marginBottom: "0.75rem",
                      }}
                    />
                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--text-secondary)",
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {ach.description}
                    </p>
                    {ach.projectUrl && (
                      <a
                        href={ach.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: "var(--font-mono), monospace",
                          fontSize: 11,
                          color: accent,
                          textDecoration: "none",
                          marginTop: "0.75rem",
                          letterSpacing: "0.06em",
                          display: "inline-block",
                        }}
                      >
                        View Project ↗
                      </a>
                    )}
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
