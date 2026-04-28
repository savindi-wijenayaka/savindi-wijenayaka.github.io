"use client";

import { useEffect, useRef, useState } from "react";

// ── Crosshair geometry — SVG viewBox 0 0 40 40, center at (20, 20) ──
const C       = 20;
const DOT_R   = 1.5;
const GAP     = 4;
const ARM_DEF = 5;
const ARM_HOV = 11;
const RING_R  = 10;

const LERP_ARM   = 0.18;
const LERP_COLOR = 0.10;
const LERP_TORCH = 0.10;
const TORCH_R_DEF = 70;
const TORCH_R_HOV = 90;

type AccentKey = "default" | "emerald" | "blue" | "lavender" | "contrast";

// Display colors — populated at mount from actual CSS variables
type RGBA = [number, number, number, number];
const DISPLAY: Record<AccentKey, RGBA> = {
  default:  [228, 236, 255, 0.85],
  emerald:  [99,  196, 173, 1.0],
  blue:     [79,  160, 216, 1.0],
  lavender: [168, 128, 200, 1.0],
  contrast: [228, 236, 255, 0.90], // inverse-theme default; set in buildSigs()
};

// Known accent RGB signatures — rebuilt at mount from CSS variables
type Sig = { r: number; g: number; b: number; key: Exclude<AccentKey, "default"> };
let SIGS: Sig[] = [];

function parseHexOrRGB(s: string): [number, number, number] | null {
  s = s.trim();
  // rgb/rgba(r, g, b, ...)
  const rm = s.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
  if (rm) return [+rm[1], +rm[2], +rm[3]];
  // #rrggbb
  const hm = s.match(/^#([0-9a-f]{6})$/i);
  if (hm) {
    const h = hm[1];
    return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
  }
  // #rgb
  const sm = s.match(/^#([0-9a-f]{3})$/i);
  if (sm) {
    const [a,b,c] = sm[1];
    return [parseInt(a+a,16), parseInt(b+b,16), parseInt(c+c,16)];
  }
  return null;
}

function buildSigs(): [number, number, number] {
  const root = getComputedStyle(document.documentElement);
  SIGS = [];

  // Detect light mode by --bg-void luminance (light bg = light mode)
  const bgVoid = parseHexOrRGB(root.getPropertyValue("--bg-void"));
  const isLight = bgVoid
    ? bgVoid[0] * 0.299 + bgVoid[1] * 0.587 + bgVoid[2] * 0.114 > 128
    : false;

  for (const key of ["emerald", "blue", "lavender"] as const) {
    const rgb = parseHexOrRGB(root.getPropertyValue(`--${key}`));
    if (rgb) {
      SIGS.push({ r: rgb[0], g: rgb[1], b: rgb[2], key });
      // In light mode, theme accents are dark (designed for text on light bg).
      // Brighten them +80 so the cursor crosshair is visible on dark-filled buttons too.
      DISPLAY[key] = isLight
        ? [Math.min(255, rgb[0] + 80), Math.min(255, rgb[1] + 80), Math.min(255, rgb[2] + 80), 1.0]
        : [rgb[0], rgb[1], rgb[2], 1.0];
    }
  }

  const primary = parseHexOrRGB(root.getPropertyValue("--text-primary"));
  if (primary) DISPLAY.default = [primary[0], primary[1], primary[2], 0.85];

  // contrast = inverse-theme default for on-filled-button visibility
  // Light mode default is dark → contrast should be off-white (dark mode's default)
  // Dark mode default is light → contrast should be dark navy (light mode's default)
  DISPLAY.contrast = isLight
    ? [228, 236, 255, 0.90]
    : [12,  17,  48,  0.90];

  return (primary ?? [228, 236, 255]) as [number, number, number];
}

function matchColor(r: number, g: number, b: number): AccentKey | null {
  // Skip near-black, near-white, and grays
  if (r < 20 && g < 20 && b < 20) return null;
  if (r > 230 && g > 230 && b > 230) return null;
  const diff = Math.max(Math.abs(r-g), Math.abs(g-b), Math.abs(r-b));
  if (diff < 20) return null; // gray
  for (const s of SIGS) {
    if (Math.abs(r-s.r) <= 28 && Math.abs(g-s.g) <= 28 && Math.abs(b-s.b) <= 28) return s.key;
  }
  return null;
}

function detectAccent(el: Element): AccentKey {
  // 1. Explicit data-accent attribute — always wins, no parsing needed
  let node: Element | null = el;
  for (let d = 0; d < 10 && node && node !== document.body; d++) {
    const a = node.getAttribute("data-accent");
    if (a === "emerald" || a === "blue" || a === "lavender") {
        // If the element's background IS the accent fill, cursor would blend in.
        // Fall back to "default" (--text-primary) which always contrasts filled surfaces.
        const bg = parseHexOrRGB(getComputedStyle(node).backgroundColor);
        if (bg && matchColor(bg[0], bg[1], bg[2]) === a) return "contrast";
        return a;
      }
    node = node.parentElement;
  }

  // 2. Computed color sniffing — walk UP (camelCase access is more reliable
  //    than getPropertyValue for inline styles with CSS variables)
  node = el;
  for (let d = 0; d < 8 && node && node !== document.body; d++) {
    const cs = getComputedStyle(node);
    for (const val of [cs.color, cs.borderTopColor, cs.backgroundColor, cs.outlineColor]) {
      if (!val) continue;
      const rgb = parseHexOrRGB(val);
      if (rgb) {
        const key = matchColor(rgb[0], rgb[1], rgb[2]);
        if (key) return key;
      }
    }
    node = node.parentElement;
  }

  // 3. Walk DOWN — accent may live on a child element (e.g. colored dot in a tile)
  const queue: Element[] = Array.from(el.children);
  let checked = 0;
  while (queue.length > 0 && checked < 25) {
    const cur = queue.shift()!;
    checked++;
    const cs = getComputedStyle(cur);
    for (const val of [cs.backgroundColor, cs.color]) {
      if (!val) continue;
      const rgb = parseHexOrRGB(val);
      if (rgb) {
        const key = matchColor(rgb[0], rgb[1], rgb[2]);
        if (key) return key;
      }
    }
    for (const child of cur.children) queue.push(child);
  }

  return "default";
}

// Broader clickable detection — covers React divs with onClick too
function findClickable(el: Element | null): Element | null {
  const TAGS = new Set(["a", "button", "input", "select", "textarea", "label", "summary"]);
  const ROLES = new Set(["button","link","tab","menuitem","option","checkbox","radio","switch"]);
  let node = el;
  for (let i = 0; i < 8 && node && node !== document.body; i++) {
    if (node.getAttribute("data-cursor") === "none") return null;
    const tag = node.tagName.toLowerCase();
    if (TAGS.has(tag)) return node;
    const role = node.getAttribute("role");
    if (role && ROLES.has(role)) return node;
    if (node.getAttribute("tabindex") === "0") return node;
    if (node.hasAttribute("onclick")) return node;
    node = node.parentElement;
  }
  return null;
}

export default function CustomCursor() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgRef     = useRef<SVGSVGElement>(null);
  const dotRef     = useRef<SVGCircleElement>(null);
  const ringRef    = useRef<SVGCircleElement>(null);
  const armsRef    = useRef<SVGLineElement[]>([]);
  const torchRef   = useRef<HTMLDivElement>(null);

  const mouse      = useRef({ x: -300, y: -300 });
  const torchPos   = useRef({ x: -300, y: -300 });
  const armLen     = useRef(ARM_DEF);
  const torchR     = useRef(TORCH_R_DEF);
  const curRGBA    = useRef<RGBA>([228, 236, 255, 0.85]);
  const targetKey  = useRef<AccentKey>("default");
  const lastEl     = useRef<Element | null>(null);
  const st         = useRef({ hovered: false, clicking: false });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Read actual theme colors at mount (works for dark + light mode)
    const initRGB = buildSigs();
    curRGBA.current = [initRGB[0], initRGB[1], initRGB[2], 0.85];

    // Re-read on theme toggle (data-theme attribute change)
    const themeObserver = new MutationObserver(() => {
      const rgb = buildSigs();
      curRGBA.current = [rgb[0], rgb[1], rgb[2], 0.85];
      targetKey.current = "default";
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    document.body.classList.add("custom-cursor");
    setMounted(true);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (reduced) torchPos.current = { x: e.clientX, y: e.clientY };

      const clickable = findClickable(e.target as Element | null);
      st.current.hovered = !!clickable;

      // Only re-run detectAccent when we move to a different element
      if (clickable !== lastEl.current) {
        lastEl.current = clickable;
        targetKey.current = clickable ? detectAccent(clickable) : "default";
      }
    };

    const onDown  = () => { st.current.clicking = true;  };
    const onUp    = () => { st.current.clicking = false; };
    const onLeave = () => { mouse.current = { x: -300, y: -300 }; };

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);
    document.addEventListener("mouseleave", onLeave);

    let rafId: number;

    function tick() {
      const { x, y }             = mouse.current;
      const { hovered, clicking } = st.current;

      // Position + click scale (transform-origin at SVG center)
      if (wrapperRef.current) {
        wrapperRef.current.style.transform =
          `translate(${x - C}px, ${y - C}px) scale(${clicking ? 0.75 : 1})`;
      }

      // Arm length
      armLen.current += ((hovered ? ARM_HOV : ARM_DEF) - armLen.current) * LERP_ARM;
      const arm = armLen.current;

      // Color lerp
      const tgt = DISPLAY[targetKey.current];
      const cc  = curRGBA.current;
      cc[0] += (tgt[0] - cc[0]) * LERP_COLOR;
      cc[1] += (tgt[1] - cc[1]) * LERP_COLOR;
      cc[2] += (tgt[2] - cc[2]) * LERP_COLOR;
      cc[3] += (tgt[3] - cc[3]) * LERP_COLOR;

      const r = cc[0] | 0, g = cc[1] | 0, b = cc[2] | 0;
      const a  = cc[3].toFixed(2);
      const a1 = (cc[3] * 0.9).toFixed(2);
      const a2 = (cc[3] * 0.4).toFixed(2);
      const stroke = `rgba(${r},${g},${b},${a})`;
      const filter = `drop-shadow(0 0 3px rgba(${r},${g},${b},${a1})) drop-shadow(0 0 8px rgba(${r},${g},${b},${a2}))`;

      if (svgRef.current) svgRef.current.style.filter = filter;

      const [top, right, bottom, left] = armsRef.current;
      if (top)    { top.setAttribute("y1",    String(C - GAP - arm)); top.setAttribute("y2",    String(C - GAP));        top.setAttribute("stroke", stroke); }
      if (right)  { right.setAttribute("x1",  String(C + GAP));        right.setAttribute("x2",  String(C + GAP + arm)); right.setAttribute("stroke", stroke); }
      if (bottom) { bottom.setAttribute("y1", String(C + GAP));        bottom.setAttribute("y2", String(C + GAP + arm)); bottom.setAttribute("stroke", stroke); }
      if (left)   { left.setAttribute("x1",   String(C - GAP - arm)); left.setAttribute("x2",   String(C - GAP));        left.setAttribute("stroke", stroke); }
      dotRef.current?.setAttribute("fill", stroke);

      if (ringRef.current) {
        ringRef.current.setAttribute("stroke", stroke);
        ringRef.current.setAttribute("opacity", hovered ? "0.45" : "0");
      }

      // Torch
      if (torchRef.current) {
        if (!reduced) {
          torchPos.current.x += (x - torchPos.current.x) * LERP_TORCH;
          torchPos.current.y += (y - torchPos.current.y) * LERP_TORCH;
        }
        torchR.current += ((hovered ? TORCH_R_HOV : TORCH_R_DEF) - torchR.current) * 0.08;
        const tr = torchR.current | 0;
        const tx = torchPos.current.x | 0;
        const ty = torchPos.current.y | 0;
        torchRef.current.style.background =
          `radial-gradient(circle ${tr}px at ${tx}px ${ty}px,` +
          `rgba(${r},${g},${b},0.28) 0%,rgba(${r},${g},${b},0.12) 40%,` +
          `rgba(${r},${g},${b},0.04) 70%,transparent 100%)`;
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      themeObserver.disconnect();
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("custom-cursor");
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div ref={torchRef} aria-hidden style={{
        position: "fixed", inset: 0,
        pointerEvents: "none", zIndex: 9990,
        willChange: "background", mixBlendMode: "screen",
      }} />

      <div ref={wrapperRef} aria-hidden style={{
        position: "fixed", top: 0, left: 0,
        pointerEvents: "none", zIndex: 99999,
        willChange: "transform", transformOrigin: `${C}px ${C}px`,
      }}>
        <svg ref={svgRef} width={40} height={40} viewBox="0 0 40 40" fill="none"
          style={{ overflow: "visible", display: "block" }}>
          <circle ref={ringRef} cx={C} cy={C} r={RING_R}
            stroke="rgba(228,236,255,0.85)" strokeWidth={0.75} fill="none" opacity={0} />
          <line ref={el => { if (el) armsRef.current[0] = el; }}
            x1={C} y1={C-GAP-ARM_DEF} x2={C} y2={C-GAP}
            stroke="rgba(228,236,255,0.85)" strokeWidth={1.5} strokeLinecap="round" />
          <line ref={el => { if (el) armsRef.current[1] = el; }}
            x1={C+GAP} y1={C} x2={C+GAP+ARM_DEF} y2={C}
            stroke="rgba(228,236,255,0.85)" strokeWidth={1.5} strokeLinecap="round" />
          <line ref={el => { if (el) armsRef.current[2] = el; }}
            x1={C} y1={C+GAP} x2={C} y2={C+GAP+ARM_DEF}
            stroke="rgba(228,236,255,0.85)" strokeWidth={1.5} strokeLinecap="round" />
          <line ref={el => { if (el) armsRef.current[3] = el; }}
            x1={C-GAP-ARM_DEF} y1={C} x2={C-GAP} y2={C}
            stroke="rgba(228,236,255,0.85)" strokeWidth={1.5} strokeLinecap="round" />
          <circle ref={dotRef} cx={C} cy={C} r={DOT_R} fill="rgba(228,236,255,0.85)" />
        </svg>
      </div>
    </>
  );
}
