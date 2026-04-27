"use client";

import { useEffect, useRef } from "react";

// Structured neural-net layers — same architecture as reference
const LAYERS = [4, 6, 9, 11, 9, 7, 5, 3];
const PULSE_COUNT = 10;

interface NNNode {
  x: number;
  y: number;
  phase: number;
  freq: number;
}

interface Edge {
  fn: NNNode;
  tn: NNNode;
  w: number; // base line opacity
}

interface Pulse {
  edge: Edge;
  t: number;    // progress 0 → 1
  speed: number;
  size: number;
}

export default function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const maybeCanvas = canvasRef.current;
    if (!maybeCanvas) return;
    const canvas = maybeCanvas;
    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;
    const ctx = maybeCtx;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0;
    let nodes: NNNode[] = [];
    let edges: Edge[] = [];
    let pulses: Pulse[] = [];
    let rafId: number;

    // Read --nn-r/g/b integer tokens from CSS (updated per theme)
    function rgb(): [number, number, number] {
      const s = getComputedStyle(document.documentElement);
      return [
        parseInt(s.getPropertyValue("--nn-r").trim() || "99"),
        parseInt(s.getPropertyValue("--nn-g").trim() || "196"),
        parseInt(s.getPropertyValue("--nn-b").trim() || "173"),
      ];
    }

    function rgba(r: number, g: number, b: number, a: number) {
      return `rgba(${r},${g},${b},${a.toFixed(3)})`;
    }

    function buildNet() {
      nodes = [];
      edges = [];

      const padX = W * 0.08;
      const padY = H * 0.12;
      const usableW = W - padX * 2;
      const usableH = H - padY * 2;
      const lx = usableW / (LAYERS.length - 1);

      const layerNodes: NNNode[][] = LAYERS.map((count, li) => {
        const x = padX + li * lx;
        const gap = Math.min(62, usableH / (count + 1));
        const startY = H / 2 - ((count - 1) * gap) / 2;
        return Array.from({ length: count }, (_, ni) => {
          const node: NNNode = {
            x,
            y: startY + ni * gap,
            phase: Math.random() * Math.PI * 2,
            freq: 0.0006 + Math.random() * 0.0004,
          };
          nodes.push(node);
          return node;
        });
      });

      // connect adjacent layers (~45% connectivity, matching reference)
      for (let li = 0; li < layerNodes.length - 1; li++) {
        layerNodes[li].forEach((fn) => {
          layerNodes[li + 1].forEach((tn) => {
            if (Math.random() < 0.45) {
              edges.push({ fn, tn, w: 0.06 + Math.random() * 0.10 });
            }
          });
        });
      }
    }

    function spawnPulse() {
      if (!edges.length) return;
      const edge = edges[Math.floor(Math.random() * edges.length)];
      pulses.push({
        edge,
        t: Math.random(), // stagger initial positions
        speed: 0.0015 + Math.random() * 0.003,
        size: 1.8 + Math.random() * 2.2,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const [r, g, b] = rgb();
      const now = Date.now();

      // edges
      edges.forEach((e) => {
        ctx.beginPath();
        ctx.moveTo(e.fn.x, e.fn.y);
        ctx.lineTo(e.tn.x, e.tn.y);
        ctx.strokeStyle = rgba(r, g, b, e.w);
        ctx.lineWidth = 0.75;
        ctx.stroke();
      });

      // nodes — breathing halo + core
      nodes.forEach((n) => {
        const a  = 0.3 + 0.25 * Math.sin(now * n.freq + n.phase);
        const nr = 3.5 * (0.85 + 0.2 * Math.sin(now * n.freq * 1.3 + n.phase));

        // soft outer halo
        ctx.beginPath();
        ctx.arc(n.x, n.y, nr + 3, 0, Math.PI * 2);
        ctx.fillStyle = rgba(r, g, b, a * 0.18);
        ctx.fill();

        // bright core
        ctx.beginPath();
        ctx.arc(n.x, n.y, nr, 0, Math.PI * 2);
        ctx.fillStyle = rgba(r, g, b, a);
        ctx.fill();
      });

      // pulses — comet trail (8 steps) + bright head
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const { fn, tn } = p.edge;
        const px = fn.x + (tn.x - fn.x) * p.t;
        const py = fn.y + (tn.y - fn.y) * p.t;

        // comet tail
        for (let j = 8; j > 0; j--) {
          const tp  = Math.max(0, p.t - j * 0.012);
          const tpx = fn.x + (tn.x - fn.x) * tp;
          const tpy = fn.y + (tn.y - fn.y) * tp;
          ctx.beginPath();
          ctx.arc(tpx, tpy, p.size * (j / 8) * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = rgba(r, g, b, 0.30 * (j / 8));
          ctx.fill();
        }

        // bright head
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = rgba(r, g, b, 0.92);
        ctx.fill();

        if (!reduced) {
          p.t += p.speed;
          if (p.t > 1) {
            pulses.splice(i, 1);
            spawnPulse();
          }
        }
      }
    }

    function animate() {
      draw();
      rafId = requestAnimationFrame(animate);
    }

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      buildNet();
      pulses = [];
      for (let i = 0; i < PULSE_COUNT; i++) spawnPulse();
    }

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else if (!reduced) {
        animate();
      }
    };

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    resize();

    if (reduced) {
      draw();
    } else {
      animate();
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
