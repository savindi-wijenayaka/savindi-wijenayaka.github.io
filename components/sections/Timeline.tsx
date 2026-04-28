"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionShell from "@/components/ui/SectionShell";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import TechTag from "@/components/ui/TechTag";
import Experience, { ExperienceEntry } from "@/data/experience";

// ── Tile card (shown above or below the spine) ───────────────────────
function TileCard({
  entry,
  isSelected,
  accent,
  borderAccent,
  glow,
  year,
}: {
  entry: ExperienceEntry;
  isSelected: boolean;
  accent: string;
  borderAccent: string;
  glow: string;
  year: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        boxSizing: "border-box" as const,
        display: "flex",
        flexDirection: "column" as const,
        justifyContent: "center",
        background: isSelected ? "var(--bg-elevated)" : "var(--bg-base)",
        border: `1px solid ${borderAccent}`,
        borderRadius: "var(--radius-md)",
        padding: "0.75rem 0.875rem",
        textAlign: "center",
        boxShadow: isSelected ? glow : "none",
        transition: "background 200ms, border-color 200ms, box-shadow 200ms",
      }}
    >
      {/* Role / Title */}
      <div
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 13,
          fontWeight: 500,
          color: isSelected ? "var(--text-primary)" : "var(--text-secondary)",
          lineHeight: 1.45,
          marginBottom: 6,
          transition: "color 200ms",
        }}
      >
        {entry.role}
      </div>
      {/* Company — full name always */}
      <div
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 12,
          color: isSelected ? accent : "var(--text-muted)",
          letterSpacing: "0.03em",
          marginBottom: 5,
          transition: "color 200ms",
          lineHeight: 1.4,
        }}
      >
        {entry.company}
      </div>
      {/* Date range */}
      <div
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 11,
          color: "var(--text-muted)",
          letterSpacing: "0.06em",
          opacity: 0.7,
        }}
      >
        {year}
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────
export default function Timeline() {
  // Sort oldest → newest (left to right)
  const entries = [...Experience].sort((a, b) => {
    const yearA = parseInt(a.dateRange.match(/\d{4}/)?.[0] ?? "0", 10);
    const yearB = parseInt(b.dateRange.match(/\d{4}/)?.[0] ?? "0", 10);
    return yearA - yearB;
  });

  const [selectedId, setSelectedId] = useState(entries[entries.length - 1].id);
  const selected = entries.find((e) => e.id === selectedId)!;
  const selectedIndex = entries.findIndex((e) => e.id === selectedId);

  // Spine runs from center of first tile to center of last tile
  const tileHalf = 100 / (2 * entries.length);

  // Stem — vertical connector from rail bottom to panel top
  const stemLeft = `${((2 * selectedIndex + 1) / (2 * entries.length)) * 100}%`;
  const stemAccent =
    selected.type === "industry" ? "var(--emerald)" : "var(--lavender)";
  const stemGlow =
    selected.type === "industry"
      ? "rgba(99,196,173,0.55)"
      : "rgba(168,128,200,0.55)";

  return (
    <SectionShell id="timeline" bg="var(--bg-void-t)">
        <RevealOnScroll>
          <SectionHeader
            label="Experience & Education"
            accent="emerald"
            plain="The journey "
            italic="so far"
          />
        </RevealOnScroll>

        {/* ── Timeline Rail ─────────────────────────────────────── */}
        <RevealOnScroll>
          <div className="timeline-scroll" style={{ overflowX: "auto" }}>
            <div style={{ position: "relative", minWidth: 860 }}>

              {/* Horizontal spine — top: 50% aligns with dot centers because
                  each column uses gridTemplateRows: "1fr auto 1fr", making
                  the dot (auto row) land exactly at the vertical midpoint. */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  left: `${tileHalf}%`,
                  right: `${tileHalf}%`,
                  height: 1,
                  background:
                    "linear-gradient(to right, var(--emerald), var(--lavender))",
                  opacity: 0.3,
                  zIndex: 0,
                }}
              />

              {/* Tile columns */}
              <div style={{ display: "flex", alignItems: "stretch" }}>
                {entries.map((entry) => {
                  const isSelected = entry.id === selectedId;
                  const isIndustry = entry.type === "industry";
                  const accent = isIndustry ? "var(--emerald)" : "var(--lavender)";
                  const borderAccent = isIndustry
                    ? "var(--border-emerald)"
                    : "var(--border-lavender)";
                  const breathe = isIndustry ? "emeraldBreathe" : "lavenderBreathe";
                  const glow = isIndustry
                    ? "0 0 0 1px var(--border-emerald), 0 0 20px var(--emerald-glow)"
                    : "0 0 0 1px var(--border-lavender), 0 0 20px var(--lavender-glow)";

                  return (
                    <div
                      key={entry.id}
                      role="button"
                      tabIndex={0}
                      data-accent={isIndustry ? "emerald" : "lavender"}
                      style={{
                        flex: 1,
                        display: "grid",
                        gridTemplateRows: "1fr auto 1fr",
                        alignItems: "center",
                        cursor: "pointer",
                        padding: "0 0.4rem",
                        position: "relative",
                      }}
                      onClick={() => setSelectedId(entry.id)}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelectedId(entry.id); }}
                    >
                      {/* Row 1 — industry tile sits here, academic row is empty */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          paddingBottom: "0.6rem",
                          height: 110,
                        }}
                      >
                        {isIndustry && (
                          <TileCard
                            entry={entry}
                            isSelected={isSelected}
                            accent={accent}
                            borderAccent={borderAccent}
                            glow={glow}
                            year={entry.dateRange}
                          />
                        )}
                      </div>

                      {/* Row 2 — dot (always centered on the spine) */}
                      <div
                        aria-hidden
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          background: accent,
                          border: "2.5px solid var(--bg-void)",
                          zIndex: 1,
                          justifySelf: "center",
                          flexShrink: 0,
                          transition: "box-shadow 200ms",
                          animation: isSelected
                            ? `${breathe} 2s ease-in-out infinite`
                            : "none",
                        }}
                      />

                      {/* Row 3 — academic tile sits here, industry row is empty */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          paddingTop: "0.6rem",
                          height: 110,
                        }}
                      >
                        {!isIndustry && (
                          <TileCard
                            entry={entry}
                            isSelected={isSelected}
                            accent={accent}
                            borderAccent={borderAccent}
                            glow={glow}
                            year={entry.dateRange}
                          />
                        )}
                      </div>

                      {/* In-rail connector — industry only, selected only.
                          Runs from the dot center (top: 50% of column) to the
                          column bottom, where the gap stem picks it up. */}
                      {isSelected && isIndustry && (
                        <div
                          aria-hidden
                          style={{
                            position: "absolute",
                            top: "50%",
                            bottom: 0,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 1,
                            background: accent,
                            opacity: 0.75,
                            boxShadow: "0 0 6px rgba(99,196,173,0.55)",
                            zIndex: 0,
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* ── Stem + Description Panel ──────────────────────────── */}
        <RevealOnScroll>
          {/* paddingTop creates the gap the stem lives in */}
          <div style={{ position: "relative", paddingTop: 28 }}>

            {/* Vertical stem — connects selected tile to panel */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: 0,
                height: 28,
                left: stemLeft,
                transform: "translateX(-50%)",
                width: 1,
                background: stemAccent,
                opacity: 0.75,
                boxShadow: `0 0 6px ${stemGlow}`,
                transition: "left 200ms var(--ease-out)",
              }}
            >
              <div className="stem-dot" style={{ background: stemAccent }} />
            </div>

          {/* key forces remount → triggers panelFadeIn animation on every tab switch */}
          <div
            key={selectedId}
            className="timeline-panel"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              borderTop: `2px solid ${
                selected.type === "industry"
                  ? "var(--emerald)"
                  : "var(--lavender)"
              }`,
              borderRadius: "var(--radius-md)",
              padding: "1.5rem 2rem",
            }}
          >
            {(() => {
              const isIndustry = selected.type === "industry";
              const accent = isIndustry ? "var(--emerald)" : "var(--lavender)";
              return (
                <>
                  {/* Header */}
                  <div style={{ marginBottom: "1.25rem" }}>
                    <div
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: "10.5px",
                        color: accent,
                        letterSpacing: "0.08em",
                        marginBottom: 5,
                      }}
                    >
                      {selected.dateRange} · {selected.location}
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 18,
                        fontWeight: 500,
                        color: "var(--text-primary)",
                        marginBottom: 4,
                        letterSpacing: "-0.3px",
                      }}
                    >
                      {selected.role}
                    </h3>
                    <div
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 12,
                        color: "var(--text-muted)",
                      }}
                    >
                      {selected.companyUrl ? (
                        <a
                          href={selected.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "inherit",
                            textDecoration: "none",
                            transition: "color 150ms",
                          }}
                          onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLAnchorElement).style.color =
                              accent)
                          }
                          onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLAnchorElement).style.color =
                              "var(--text-muted)")
                          }
                        >
                          {selected.company} ↗
                        </a>
                      ) : (
                        selected.company
                      )}
                    </div>
                  </div>

                  {/* Description bullets */}
                  <ul
                    style={{
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {selected.description.map((point, i) => (
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
                            top: "0.65em",
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
                  {selected.techStack.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {selected.techStack.map((tech) => (
                        <TechTag key={tech} label={tech} />
                      ))}
                    </div>
                  )}
                </>
              );
            })()}
          </div>
          </div>{/* end paddingTop wrapper */}
        </RevealOnScroll>
    </SectionShell>
  );
}
