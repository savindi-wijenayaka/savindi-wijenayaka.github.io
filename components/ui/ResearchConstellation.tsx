"use client";

import { useState, useRef, useEffect } from "react";
import KnowledgeAreas from "@/data/knowledge_areas";

interface Layout {
  leftPct:    number;
  topPct:     number;
  enterDelay: number;
}

// Base positions only — drift is fully random, not parametric.
// Order must match KnowledgeAreas array.
const LAYOUTS: Layout[] = [
  { leftPct: 63, topPct: 27, enterDelay: 600  }, // deep_learning
  { leftPct: 64, topPct: 57, enterDelay: 900  }, // computer_vision
  { leftPct: 80, topPct: 33, enterDelay: 1100 }, // mlops
  { leftPct: 59, topPct: 71, enterDelay: 800  }, // nlp
  { leftPct: 73, topPct: 16, enterDelay: 1300 }, // anomaly_detection
  { leftPct: 83, topPct: 67, enterDelay: 1500 }, // medical_imaging
  { leftPct: 61, topPct: 44, enterDelay: 1700 }, // signal_processing
];

const MAX_DRIFT  = 38;  // px radius from base position
const MIN_SPEED  = 4;   // px / second
const MAX_SPEED  = 8;

const FONT_SIZE       = 11;
const DEFAULT_OPACITY = 0.60;

const GLOW_DIM = {
  emerald:  "0 0 10px rgba(99,196,173,0.55), 0 0 20px rgba(99,196,173,0.20)",
  blue:     "0 0 10px rgba(79,160,216,0.55),  0 0 20px rgba(79,160,216,0.20)",
  lavender: "0 0 10px rgba(168,128,200,0.55), 0 0 20px rgba(168,128,200,0.20)",
};
const GLOW_BRIGHT = {
  emerald:  "0 0 12px rgba(99,196,173,0.90), 0 0 28px rgba(99,196,173,0.45)",
  blue:     "0 0 12px rgba(79,160,216,0.90),  0 0 28px rgba(79,160,216,0.45)",
  lavender: "0 0 12px rgba(168,128,200,0.90), 0 0 28px rgba(168,128,200,0.45)",
};
const COLOR = {
  emerald:  "var(--emerald)",
  blue:     "var(--blue)",
  lavender: "var(--lavender)",
};
const BORDER = {
  emerald:  "var(--border-emerald)",
  blue:     "var(--border-blue)",
  lavender: "var(--border-lavender)",
};

function randomTarget() {
  const angle = Math.random() * Math.PI * 2;
  const r     = (0.4 + Math.random() * 0.6) * MAX_DRIFT; // avoid clustering at origin
  return { tx: Math.cos(angle) * r, ty: Math.sin(angle) * r };
}

export default function ResearchConstellation() {
  const [hovered, setHovered] = useState<string | null>(null);
  const refs      = useRef<(HTMLDivElement | null)[]>([]);
  const hoveredId = useRef<string | null>(null);

  useEffect(() => { hoveredId.current = hovered; }, [hovered]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // Per-fragment mutable state — lives in a ref, never triggers re-renders
    const states = KnowledgeAreas.map(() => ({
      ox: 0, oy: 0,                            // current offset from base
      ...randomTarget(),                        // initial target
      speed: MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED),
    }));

    let lastTime = performance.now();
    let rafId: number;

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        lastTime = performance.now();
        rafId = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    function tick(now: number) {
      const dt = Math.min(now - lastTime, 50); // cap to avoid large jumps after tab switch
      lastTime = now;

      KnowledgeAreas.forEach((area, i) => {
        const el = refs.current[i];
        if (!el || hoveredId.current === area.id) return;

        const s  = states[i];
        const dx = s.tx - s.ox;
        const dy = s.ty - s.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0.5) {
          const step = Math.min((s.speed * dt) / 1000, dist);
          s.ox += (dx / dist) * step;
          s.oy += (dy / dist) * step;
        }

        // Arrived — pick a new random target in a different direction
        if (dist < 2) {
          Object.assign(s, randomTarget());
        }

        el.style.transform = `translate(${s.ox.toFixed(2)}px, ${s.oy.toFixed(2)}px)`;
      });

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <>
      {KnowledgeAreas.map((area, i) => {
        const L     = LAYOUTS[i];
        const isHov = hovered === area.id;
        const ck    = area.colorKey;
        const tipBelow = L.topPct < 22;

        return (
          <div
            key={area.id}
            ref={el => { refs.current[i] = el; }}
            style={{
              position:      "absolute",
              left:          `${L.leftPct}%`,
              top:           `${L.topPct}%`,
              display:       "inline-block",
              willChange:    "transform",
              pointerEvents: "auto",
              zIndex:        isHov ? 10 : 1,
              animation:     `rcFragEnter 900ms ease-out ${L.enterDelay}ms both`,
            }}
            onMouseEnter={() => setHovered(area.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <span
              style={{
                display:    "block",
                fontFamily: "var(--font-mono), monospace",
                fontSize:   `${FONT_SIZE}px`,
                letterSpacing: "0.07em",
                color:      COLOR[ck],
                opacity:    isHov ? 0.95 : DEFAULT_OPACITY,
                textShadow: isHov ? GLOW_BRIGHT[ck] : GLOW_DIM[ck],
                whiteSpace: "nowrap",
                userSelect: "none",
                cursor:     "default",
                transition: "opacity 200ms, text-shadow 200ms",
              }}
            >
              {area.label}
            </span>

            {isHov && (
              <div
                aria-hidden
                style={{
                  position:             "absolute",
                  ...(tipBelow
                    ? { top:    "calc(100% + 8px)" }
                    : { bottom: "calc(100% + 8px)" }),
                  left:                 "50%",
                  transform:            "translateX(-50%)",
                  background:           "var(--bg-overlay)",
                  border:               `1px solid ${BORDER[ck]}`,
                  borderRadius:         "var(--radius-sm)",
                  padding:              "4px 10px",
                  fontFamily:           "var(--font-mono), monospace",
                  fontSize:             "10px",
                  letterSpacing:        "0.04em",
                  color:                COLOR[ck],
                  whiteSpace:           "nowrap",
                  pointerEvents:        "none",
                  backdropFilter:       "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  zIndex:               20,
                }}
              >
                {area.description}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
