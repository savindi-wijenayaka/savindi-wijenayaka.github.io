"use client";

import { useState, useEffect, useRef, ReactNode, useCallback } from "react";

const TRANSITION_MS = 980;
// Opacity settles slightly before position — slide arrives, then sharpens
const OPACITY_MS = Math.round(TRANSITION_MS * 0.75);

// Must stay in sync with the slide order in page.tsx
export const SECTION_IDS = [
  "hero",
  "skills",
  "timeline",
  "projects",
  "achievements",
  "blog",
  "contact",
] as const;

export default function FullpageScroll({ slides }: { slides: ReactNode[] }) {
  const [current, setCurrent] = useState(0);
  const locked = useRef(false);
  const touchStartY = useRef(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const goTo = useCallback(
    (next: number) => {
      if (next < 0 || next >= slides.length || locked.current) return;
      locked.current = true;
      setCurrent(next);
      history.replaceState(null, "", `#${SECTION_IDS[next] ?? ""}`);
      window.dispatchEvent(
        new CustomEvent("fullpage:change", { detail: { index: next } })
      );
      setTimeout(() => {
        locked.current = false;
      }, TRANSITION_MS + 80);
    },
    [slides.length]
  );

  // Jump to hashed section on first load (e.g. direct link to /#projects)
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const idx = (SECTION_IDS as readonly string[]).indexOf(hash);
    if (idx > 0) {
      locked.current = true;
      setCurrent(idx);
      setTimeout(() => {
        locked.current = false;
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Wheel — only change slide when the active slide has hit its scroll boundary
  useEffect(() => {
    const handle = (e: WheelEvent) => {
      if (locked.current) {
        e.preventDefault();
        return;
      }
      const el = slideRefs.current[current];
      const atTop = !el || el.scrollTop <= 0;
      const atBottom =
        !el || el.scrollTop + el.clientHeight >= el.scrollHeight - 2;

      if (e.deltaY > 0 && atBottom) {
        e.preventDefault();
        goTo(current + 1);
      } else if (e.deltaY < 0 && atTop) {
        e.preventDefault();
        goTo(current - 1);
      }
    };
    window.addEventListener("wheel", handle, { passive: false });
    return () => window.removeEventListener("wheel", handle);
  }, [current, goTo]);

  // Keyboard — arrow keys / page up / page down
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goTo(current + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goTo(current - 1);
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [current, goTo]);

  // Touch swipe
  useEffect(() => {
    const onStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const onEnd = (e: TouchEvent) => {
      const diff = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 60)
        goTo(diff > 0 ? current + 1 : current - 1);
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [current, goTo]);

  // External navigation (navbar, dot clicks, etc.)
  useEffect(() => {
    const handle = (e: Event) => {
      goTo((e as CustomEvent<{ index: number }>).detail.index);
    };
    window.addEventListener("fullpage:goto", handle);
    return () => window.removeEventListener("fullpage:goto", handle);
  }, [goTo]);

  return (
    <>
      {/* Slide stack — fixed fullscreen, one slide visible at a time */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden" }}>
        {slides.map((slide, i) => (
          <div
            key={i}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            style={{
              position: "absolute",
              inset: 0,
              overflowY: i === current ? "auto" : "hidden",
              transform: `translateY(${(i - current) * 100}%)`,
              opacity: i === current ? 1 : 0,
              transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.25, 1, 0.5, 1), opacity ${OPACITY_MS}ms cubic-bezier(0.25, 1, 0.5, 1)`,
              willChange: "transform, opacity",
            }}
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Dot indicators — desktop only, right edge */}
      <nav
        aria-label="Section navigation"
        style={{
          position: "fixed",
          right: "1.25rem",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 90,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
        className="hidden sm:flex"
      >
        {SECTION_IDS.map((id, i) => (
          <button
            key={id}
            title={id}
            onClick={() => goTo(i)}
            aria-label={`Go to ${id}`}
            style={{
              padding: 5,
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                display: "block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background:
                  i === current ? "var(--emerald)" : "var(--text-muted)",
                opacity: i === current ? 1 : 0.4,
                /* scale instead of width/height — no layout reflow */
                transform: i === current ? "scale(1)" : "scale(0.5)",
                boxShadow: i === current ? "var(--glow-emerald)" : "none",
                transition:
                  "transform 280ms cubic-bezier(0.34, 1.56, 0.64, 1), background 200ms, opacity 200ms, box-shadow 200ms",
              }}
            />
          </button>
        ))}
      </nav>
    </>
  );
}
