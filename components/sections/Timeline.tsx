"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Experience from "@/data/experience";

export default function Timeline() {
  // Sort: newest first, with industry interleaved with academic
  const entries = [...Experience].sort((a, b) => {
    // Extract start year
    const yearA = parseInt(a.dateRange.replace(/\D.*/, ""), 10) || 0;
    const yearB = parseInt(b.dateRange.replace(/\D.*/, ""), 10) || 0;
    return yearB - yearA;
  });

  return (
    <section
      id="timeline"
      style={{
        background: "var(--bg-void)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <RevealOnScroll>
          <SectionHeader
            label="Experience & Education"
            accent="emerald"
            plain="The journey "
            italic="so far"
            description="Industry roles and academic chapters that shaped how I build and think."
          />
        </RevealOnScroll>

        {/* Legend */}
        <RevealOnScroll>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              marginBottom: "2.5rem",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.08em",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-muted)" }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "var(--emerald)",
                  flexShrink: 0,
                }}
              />
              Industry
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-muted)" }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "var(--lavender)",
                  flexShrink: 0,
                }}
              />
              Academia
            </span>
          </div>
        </RevealOnScroll>

        {/* Timeline */}
        <div
          style={{
            position: "relative",
            paddingLeft: "2.5rem",
          }}
        >
          {/* Vertical spine */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 6,
              bottom: 0,
              width: 1,
              background: "linear-gradient(to bottom, var(--emerald) 0%, var(--lavender) 60%, transparent 100%)",
              opacity: 0.4,
            }}
          />

          {entries.map((entry, idx) => {
            const isIndustry = entry.type === "industry";
            const accent = isIndustry ? "var(--emerald)" : "var(--lavender)";
            const breathe = isIndustry ? "emeraldBreathe" : "lavenderBreathe";
            const borderAccent = isIndustry ? "var(--border-emerald)" : "var(--border-lavender)";

            return (
              <RevealOnScroll key={entry.id} delay={idx * 80}>
                <div
                  style={{
                    position: "relative",
                    marginBottom: idx < entries.length - 1 ? "2.5rem" : 0,
                  }}
                >
                  {/* Node dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: "-2.6rem",
                      top: 5,
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: accent,
                      border: "2.5px solid var(--bg-void)",
                      animation: `${breathe} 2s ease-in-out infinite`,
                    }}
                  />

                  {/* Card */}
                  <div
                    style={{
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border)",
                      borderLeft: `2px solid ${accent}`,
                      borderRadius: "var(--radius-md)",
                      padding: "1.25rem 1.5rem",
                      transition: "border-color 200ms",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = borderAccent;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                      (e.currentTarget as HTMLDivElement).style.borderLeftColor = accent;
                    }}
                  >
                    {/* Date + location */}
                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "center",
                        flexWrap: "wrap",
                        marginBottom: "0.4rem",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono), monospace",
                          fontSize: "10.5px",
                          color: accent,
                          letterSpacing: "0.08em",
                        }}
                      >
                        {entry.dateRange}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono), monospace",
                          fontSize: "10px",
                          color: "var(--text-muted)",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {entry.location}
                      </span>
                    </div>

                    {/* Role */}
                    <h3
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 17,
                        fontWeight: 500,
                        color: "var(--text-primary)",
                        marginBottom: 3,
                        letterSpacing: "-0.3px",
                      }}
                    >
                      {entry.role}
                    </h3>

                    {/* Company */}
                    <div
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 12,
                        color: "var(--text-muted)",
                        marginBottom: "0.75rem",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {entry.companyUrl ? (
                        <a
                          href={entry.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "inherit",
                            textDecoration: "none",
                            transition: "color 150ms",
                          }}
                          onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLAnchorElement).style.color = accent)
                          }
                          onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)")
                          }
                        >
                          {entry.company} ↗
                        </a>
                      ) : (
                        entry.company
                      )}
                    </div>

                    {/* Description */}
                    <ul
                      style={{
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                      }}
                    >
                      {entry.description.map((point, i) => (
                        <li
                          key={i}
                          style={{
                            fontSize: 14,
                            color: "var(--text-secondary)",
                            lineHeight: 1.75,
                            paddingLeft: "1rem",
                            position: "relative",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              left: 0,
                              top: "0.6em",
                              width: 4,
                              height: 4,
                              borderRadius: "50%",
                              background: accent,
                              opacity: 0.6,
                            }}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>

                    {/* Tech stack */}
                    {entry.techStack.length > 0 && (
                      <div
                        style={{
                          marginTop: "1rem",
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 6,
                        }}
                      >
                        {entry.techStack.map((tech) => (
                          <span
                            key={tech}
                            style={{
                              fontFamily: "var(--font-mono), monospace",
                              fontSize: 11,
                              padding: "2px 8px",
                              borderRadius: "var(--radius-sm)",
                              background: "var(--bg-overlay)",
                              border: "1px solid var(--border)",
                              color: "var(--text-muted)",
                              letterSpacing: "0.03em",
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
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
