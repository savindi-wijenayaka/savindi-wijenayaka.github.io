"use client";

import { useState } from "react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Experience, { type ExperienceEntry } from "@/data/experience";

type Filter = "all" | "industry" | "academic";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "industry", label: "Industry" },
  { key: "academic", label: "Research & study" },
];

function Row({ e, open, onToggle }: { e: ExperienceEntry; open: boolean; onToggle: () => void }) {
  const panelId = `xp-${e.id}`;
  return (
    <div className={`xp-item${open ? " open" : ""}`}>
      <div className="xp-when">
        <b>{e.dateRange}</b>
        {e.location}
        <br />
        <span className={`tag ${e.type === "industry" ? "tag-ind" : "tag-res"}`}>{e.tagLabel}</span>
      </div>
      <div>
        <button type="button" className="xp-head" aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
          <div>
            <h3>{e.role}</h3>
            <div className="xp-org">{e.company}</div>
          </div>
          <svg className="xp-chev" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M5 8l5 5 5-5" />
          </svg>
        </button>
        <div className="metrics">
          {e.metrics.map((m) => (
            <span className="m" key={m.label}>
              <b>{m.value}</b>
              {m.label}
            </span>
          ))}
        </div>
        <div className="xp-body" id={panelId} role="region" aria-label={`${e.role}, ${e.company}`}>
          <div>
            <ul>
              {e.description.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <div className="stack">
              {e.techStack.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(Experience[0]?.id ?? null);

  const rows = Experience.filter((e) => filter === "all" || e.type === filter);

  return (
    <section className="sec" id="experience">
      <div className="wrap">
        <RevealOnScroll>
          <p className="eyebrow">Experience</p>
          <h2 className="sec-title">Where I&apos;ve built things</h2>
          <p className="lede">Click a role for details.</p>
          <div className="seg" role="group" aria-label="Filter experience">
            {FILTERS.map((f) => (
              <button key={f.key} type="button" aria-pressed={filter === f.key} onClick={() => setFilter(f.key)}>
                {f.label}
              </button>
            ))}
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={80}>
          <div>
            {rows.map((e) => (
              <Row key={e.id} e={e} open={openId === e.id} onToggle={() => setOpenId(openId === e.id ? null : e.id)} />
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
