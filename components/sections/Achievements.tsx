"use client";

import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionShell from "@/components/ui/SectionShell";
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
    <SectionShell id="achievements" bg="var(--bg-void)">
        <RevealOnScroll>
          <SectionHeader
            label="Achievements"
            accent="lavender"
            plain="Highlights & "
            italic="honours"
          />
        </RevealOnScroll>

        {/* Category filter */}
        <RevealOnScroll>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const tabAccentKey = cat === "Engineering" ? "emerald" : cat === "Extra Curriculum" ? "lavender" : "blue";
              const tabColor = cat === "Engineering"
                ? "var(--emerald)"
                : cat === "Extra Curriculum"
                ? "var(--lavender)"
                : "var(--blue)";
              const tabBorder = cat === "Engineering"
                ? "var(--border-emerald)"
                : cat === "Extra Curriculum"
                ? "var(--border-lavender)"
                : "var(--border-blue)";
              const tabGlow = cat === "Engineering"
                ? "var(--emerald-glow)"
                : cat === "Extra Curriculum"
                ? "var(--lavender-glow)"
                : "var(--blue-glow)";
              return (
                <button
                  key={cat}
                  data-accent={tabAccentKey}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "5px 14px",
                    borderRadius: "var(--radius-sm)",
                    border: `1px solid ${isActive ? tabBorder : "var(--border)"}`,
                    background: isActive ? tabGlow : "transparent",
                    color: isActive ? tabColor : "var(--text-muted)",
                    cursor: "pointer",
                    transition: "all 150ms",
                  }}
                  onMouseEnter={(e) => {
                    if (isActive) return;
                    const el = e.currentTarget;
                    el.style.borderColor = tabBorder;
                    el.style.color = tabColor;
                    el.style.background = tabGlow;
                  }}
                  onMouseLeave={(e) => {
                    if (isActive) return;
                    const el = e.currentTarget;
                    el.style.borderColor = "var(--border)";
                    el.style.color = "var(--text-muted)";
                    el.style.background = "transparent";
                  }}
                  onMouseDown={(e) => {
                    const el = e.currentTarget;
                    el.style.opacity = "0.7";
                    el.style.transform = "scale(0.97)";
                  }}
                  onMouseUp={(e) => {
                    const el = e.currentTarget;
                    el.style.opacity = "1";
                    el.style.transform = "scale(1)";
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
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.25rem",
          }}
        >
          {filtered.map((ach, idx) => {
            const isEngineering = ach.category === "Engineering";
            const accent = isEngineering ? "var(--emerald)" : "var(--lavender)";
            const borderAccent = isEngineering
              ? "var(--border-emerald)"
              : "var(--border-lavender)";

            return (
              <RevealOnScroll key={ach.id} delay={idx * 60} style={{ height: "100%" }}>
                <div
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    borderBottom: `2px solid ${accent}`,
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    position: "relative",
                    transition: "transform 220ms, border-color 220ms, box-shadow 220ms",
                    cursor: "default",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "translateY(-4px)";
                    el.style.borderColor = borderAccent;
                    el.style.borderBottomColor = accent;
                    el.style.boxShadow = `0 8px 32px rgba(0,0,0,0.35)`;
                    const overlay = el.querySelector(".ach-overlay") as HTMLElement;
                    if (overlay) overlay.style.opacity = "1";
                    if (overlay) overlay.style.transform = "translateY(0)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "translateY(0)";
                    el.style.borderColor = "var(--border)";
                    el.style.borderBottomColor = accent;
                    el.style.boxShadow = "none";
                    const overlay = el.querySelector(".ach-overlay") as HTMLElement;
                    if (overlay) overlay.style.opacity = "0";
                    if (overlay) overlay.style.transform = "translateY(8px)";
                  }}
                >
                  {/* Photo */}
                  <div
                    style={{
                      width: "100%",
                      height: 140,
                      position: "relative",
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={ach.photo}
                      alt={ach.award}
                      fill
                      sizes="(max-width: 768px) 100vw, 340px"
                      style={{ objectFit: "cover" }}
                    />
                    {/* Gradient fade into card body */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 48,
                        background: "linear-gradient(to bottom, transparent, var(--bg-elevated))",
                        pointerEvents: "none",
                      }}
                    />
                  </div>

                  {/* Meta info below photo */}
                  <div
                    style={{
                      padding: "1rem 1.25rem 1.25rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.35rem",
                      flex: 1,
                    }}
                  >
                    {/* Position / title — minHeight locks all cards to the same title height */}
                    <div
                      style={{
                        fontFamily: "var(--font-sans), system-ui, sans-serif",
                        fontSize: 15,
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        lineHeight: 1.3,
                        minHeight: "2.6rem",
                      }}
                    >
                      {ach.title}
                    </div>

                    {/* Competition / award */}
                    <div
                      style={{
                        fontSize: 13,
                        color: "var(--text-secondary)",
                        lineHeight: 1.4,
                      }}
                    >
                      {ach.award}
                    </div>

                    {/* Year + level */}
                    <div
                      style={{
                        display: "flex",
                        gap: "0.6rem",
                        flexWrap: "wrap",
                        alignItems: "center",
                        marginTop: "0.2rem",
                      }}
                    >
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
                    </div>

                    {ach.representing && (
                      <div
                        style={{
                          fontFamily: "var(--font-mono), monospace",
                          fontSize: 10,
                          color: "var(--text-muted)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {ach.representing}
                      </div>
                    )}
                  </div>

                  {/* Hover overlay with description */}
                  <div
                    className="ach-overlay"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(7, 12, 24, 0.92)",
                      backdropFilter: "blur(10px)",
                      opacity: 0,
                      transform: "translateY(8px)",
                      transition: "opacity 250ms var(--ease-out), transform 250ms var(--ease-out)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      padding: "1.5rem",
                    }}
                  >
                    {/* Title echo at top */}
                    <div
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 10,
                        color: accent,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {ach.title} — {ach.year}
                    </div>
                    <div
                      style={{
                        height: 1,
                        background: accent,
                        opacity: 0.5,
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
    </SectionShell>
  );
}
