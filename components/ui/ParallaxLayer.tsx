"use client";

import { useEffect, useRef } from "react";

/**
 * Wraps children in a div that translates vertically at a fraction of the
 * scroll speed, creating a parallax depth effect.
 *
 * speed > 0  → element moves slower than scroll (feels closer to viewer)
 * speed < 0  → element moves faster than scroll (feels further away)
 *
 * Implemented via direct DOM mutation on a RAF-throttled scroll listener —
 * no React re-renders. Respects prefers-reduced-motion.
 */
export default function ParallaxLayer({
  children,
  speed = 0.15,
  style,
}: {
  children: React.ReactNode;
  speed?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId: number;
    let pending = false;

    const tick = () => {
      const rect = el.getBoundingClientRect();
      const distFromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translateY(${(distFromCenter * speed).toFixed(2)}px)`;
      pending = false;
    };

    const onScroll = () => {
      if (!pending) {
        pending = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    tick(); // set initial position

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return (
    <div ref={ref} style={{ willChange: "transform", ...style }}>
      {children}
    </div>
  );
}
