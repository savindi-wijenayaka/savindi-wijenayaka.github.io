"use client";

import { useEffect, useRef } from "react";

// Layer sizes of the animated network
const LAYERS = [4, 6, 9, 11, 9, 7, 5, 3];
const PULSE_COUNT = 10;

interface NNNode {
  x: number;
  y: number;
  phase: number;
  freq: number;
}
interface Edge {
  a: NNNode;
  b: NNNode;
  w: number;
}
interface Pulse {
  edge: Edge;
  t: number;
  speed: number;
  size: number;
}

/**
 * Hero background: the signature neural-network animation.
 * - Sized by CSS (#hero-network) to the hero container, DPR-aware.
 * - Plum nodes/edges, honey pulses; colours come from --nn-plum / --nn-honey.
 * - Pauses when scrolled out of view or the tab is hidden.
 * - Draws a single static frame under prefers-reduced-motion.
 */
export default function HeroNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let nodes: NNNode[] = [];
    let edges: Edge[] = [];
    let pulses: Pulse[] = [];
    let raf = 0;
    let inView = true;
    let plum = "123,75,106";
    let honey = "217,164,65";

    function readColors() {
      const cs = getComputedStyle(document.documentElement);
      plum = cs.getPropertyValue("--nn-plum").trim() || plum;
      honey = cs.getPropertyValue("--nn-honey").trim() || honey;
      if (reduced) draw();
    }

    function spawn() {
      if (!edges.length) return;
      pulses.push({
        edge: edges[Math.floor(Math.random() * edges.length)],
        t: Math.random(),
        speed: 0.0015 + Math.random() * 0.003,
        size: 1.8 + Math.random() * 2.2,
      });
    }

    function build() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas!.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      nodes = [];
      edges = [];
      pulses = [];

      // Network occupies the right ~60% of the canvas; the left fades out under the text.
      const px = W * 0.4;
      const py = H * 0.08;
      const usableW = W * 0.6 - 6;
      const usableH = H - py * 2;
      const lx = usableW / (LAYERS.length - 1);

      const layers: NNNode[][] = LAYERS.map((count, li) => {
        const x = px + li * lx;
        const gap = Math.min(74, usableH / (count + 1));
        const startY = H / 2 - ((count - 1) * gap) / 2;
        return Array.from({ length: count }, (_, i) => {
          const node: NNNode = {
            x,
            y: startY + i * gap,
            phase: Math.random() * Math.PI * 2,
            freq: 0.0006 + Math.random() * 0.0004,
          };
          nodes.push(node);
          return node;
        });
      });

      for (let i = 0; i < layers.length - 1; i++) {
        layers[i].forEach((a) =>
          layers[i + 1].forEach((b) => {
            if (Math.random() < 0.45) edges.push({ a, b, w: 0.1 + Math.random() * 0.12 });
          })
        );
      }
      for (let i = 0; i < PULSE_COUNT; i++) spawn();
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      const now = performance.now();

      edges.forEach((e) => {
        ctx!.beginPath();
        ctx!.moveTo(e.a.x, e.a.y);
        ctx!.lineTo(e.b.x, e.b.y);
        ctx!.strokeStyle = `rgba(${plum},${e.w})`;
        ctx!.lineWidth = 0.9;
        ctx!.stroke();
      });

      nodes.forEach((n) => {
        const a = 0.35 + 0.25 * Math.sin(now * n.freq + n.phase);
        const r = 3.8 * (0.85 + 0.2 * Math.sin(now * n.freq * 1.3 + n.phase));
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, r + 3, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${plum},${a * 0.18})`;
        ctx!.fill();
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${plum},${a + 0.25})`;
        ctx!.fill();
      });

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const { a, b } = p.edge;
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        for (let j = 8; j > 0; j--) {
          const tp = Math.max(0, p.t - j * 0.012);
          ctx!.beginPath();
          ctx!.arc(a.x + (b.x - a.x) * tp, a.y + (b.y - a.y) * tp, p.size * (j / 8) * 0.6, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${honey},${0.3 * (j / 8)})`;
          ctx!.fill();
        }
        ctx!.beginPath();
        ctx!.arc(x, y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${honey},0.95)`;
        ctx!.fill();
        if (!reduced) {
          p.t += p.speed;
          if (p.t > 1) {
            pulses.splice(i, 1);
            spawn();
          }
        }
      }
    }

    function loop() {
      draw();
      raf = requestAnimationFrame(loop);
    }

    function start() {
      cancelAnimationFrame(raf);
      if (!reduced && inView && !document.hidden) loop();
    }

    function onResize() {
      build();
      readColors();
      if (reduced) draw();
    }

    build();
    readColors();
    if (reduced) draw();
    else start();

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else cancelAnimationFrame(raf);
    });
    io.observe(canvas);

    const themeObserver = new MutationObserver(readColors);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", start);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", start);
    };
  }, []);

  return <canvas id="hero-network" ref={canvasRef} aria-hidden />;
}
