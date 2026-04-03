# Design System — MASTER
**Project:** Savindi Wijenayaka Personal Portfolio
**Aesthetic:** Cyberpunk Lofi — lofi leads, synthwave follows
**Stack:** Next.js / Chakra UI / TypeScript
**Last audited:** 2026-04-03

---

## 1. Aesthetic Identity

**Core vibe:** A high-end AI research lab that reads lofi poetry at midnight.
Dark, atmospheric, flowing — not aggressive. The kind of site that makes a recruiter slow down.

**Inspiration sources (in `/public/inspiration/`):**
- `vibe.jpg` — Anime lofi girl coding at night. Pure **emerald-green** monitor glow (not teal), cold midnight-blue room ambiance, hanging plants. Sets the atmospheric temperature: cool-dark with warm organic accents.
- `timeline.png` — Neon zigzag river timeline on near-black background. **Emerald-green** = industry, **bright violet** = academia. Neural network flow. Spine draws itself.
- `titles.png` — `// SECTION LABEL` in mono small-caps on dark navy. Section heading mixes upright serif (white) + italic serif (lavender, not violet) accent word.

**Two-tone accent language (strictly observed):**
- **Emerald** `#00FF88` → Industry, engineering, ML, code, projects, certifications
- **Violet** `#A855F7` → Academia, research, publications, education, blog
- **Cyan** `#00D4FF` → Hero only (name, CTA, top-level identity). Do not use elsewhere.

---

## 2. Color Tokens

**Palette philosophy:** Three accents from vibe.jpg + user preference — Emerald (monitor glow), Blue (electric ambient), Lavender (dreamy haze). All contrast-verified against both theme backgrounds. No cyan, no mint, no teal, no red-purple.

---

### 2a. Dark Theme (default)

> Background derived from `vibe.jpg` room atmosphere — midnight navy, not pure black.
> Accents are neon-bright to read like glowing monitor light in a dark room.

```css
[data-theme="dark"], :root {

  /* ── Backgrounds — midnight navy ─────────────────── */
  --bg-void:        #070C18;   /* page canvas — deepest midnight navy */
  --bg-base:        #0C1424;   /* primary surface */
  --bg-elevated:    #101C30;   /* cards, panels */
  --bg-overlay:     #152038;   /* modals, achievement description overlay */

  /* ── Text — cool moonlit ─────────────────────────── */
  --text-primary:   #E4ECFF;   /* 16.5:1 ✓ AAA */
  --text-secondary: #8A9DBF;   /*  7.1:1 ✓ AAA */
  --text-muted:     #7E8FBC;   /*  6.1:1 ✓ AA  (5.3:1 on elevated — still passes) */

  /* ── Accent: Emerald — Technical ────────────────── */
  /* Direct source: monitor glow in vibe.jpg           */
  --emerald:        #2EFF7A;   /* 14.6:1 ✓ AAA */
  --emerald-dim:    #1ACC5C;   /*  9.2:1 ✓ AAA — hover/subdued */
  --emerald-glow:   rgba(46, 255, 122, 0.14);

  /* ── Accent: Blue — Professional ────────────────── */
  /* Electric screen blue, cyberpunk ambient           */
  --blue:           #4B8EFF;   /*  6.2:1 ✓ AA */
  --blue-dim:       #2D68E8;   /*  4.0:1 ~large — borders/accents only */
  --blue-glow:      rgba(75, 142, 255, 0.14);

  /* ── Accent: Lavender — Research & Creative ─────── */
  /* Dreamy, airy — lofi's atmospheric haze            */
  --lavender:       #A78BFA;   /*  7.2:1 ✓ AAA — rich, saturated lavender */
  --lavender-soft:  #C4B5FD;   /* 10.6:1 ✓ AAA — heading italic accent (light theme overrides to #7C3AED) */
  --lavender-dim:   #7C5CC4;   /*  3.9:1 ~large — borders/accents only */
  --lavender-glow:  rgba(167, 139, 250, 0.14);

  /* ── Borders ─────────────────────────────────────── */
  --border:           rgba(255, 255, 255, 0.07);
  --border-emerald:   rgba(46, 255, 122, 0.22);
  --border-blue:      rgba(75, 142, 255, 0.22);
  --border-lavender:  rgba(167, 139, 250, 0.22);

  /* ── Neon glows (timeline nodes, hover, key UI) ─── */
  --glow-emerald:  0 0 10px rgba(46,255,122,0.60),  0 0 24px rgba(46,255,122,0.28);
  --glow-blue:     0 0 10px rgba(75,142,255,0.60),  0 0 24px rgba(75,142,255,0.28);
  --glow-lavender: 0 0 10px rgba(167,139,250,0.60), 0 0 24px rgba(167,139,250,0.28);

  /* ── Semantic ────────────────────────────────────── */
  --error:   #FF6B6B;
  --success: #2EFF7A;

  /* ── Z-index ─────────────────────────────────────── */
  --z-raised:  10;
  --z-sticky:  40;
  --z-overlay: 100;
  --z-modal:   200;
  --z-toast:   300;

  /* ── Radius ──────────────────────────────────────── */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-full: 9999px;
}
```

---

### 2b. Light Theme

> "Morning lofi" — the same coding room, soft daylight through the window.
> Background: soft lavender-white mist. Accents shift to deep, rich versions — neon becomes refined ink.
> Feedback rule applied: lavender-tinted base + deep emerald/blue (no cool mint).

```css
[data-theme="light"] {

  /* ── Backgrounds — soft lavender mist ───────────── */
  --bg-void:        #F5F3FF;   /* page canvas — soft lavender-white */
  --bg-base:        #FEFEFF;   /* primary surface */
  --bg-elevated:    #FFFFFF;   /* cards (white with lavender border) */
  --bg-overlay:     #EDE9FF;   /* muted areas, hover tints */

  /* ── Text — deep indigo-grounded ────────────────── */
  --text-primary:   #0D0A2E;   /* 17.4:1 ✓ AAA — deep indigo-black */
  --text-secondary: #3D3865;   /*  9.8:1 ✓ AAA — deep blue-grey */
  --text-muted:     #6B648E;   /*  5.0:1 ✓ AA */

  /* ── Accent: Emerald — Technical ────────────────── */
  /* Deep forest emerald — same energy, day-mode ink   */
  --emerald:        #047857;   /*  5.0:1 ✓ AA  — deep emerald */
  --emerald-dim:    #065F46;   /*  6.9:1 ✓ AA  — darker hover */
  --emerald-glow:   rgba(4, 120, 87, 0.10);

  /* ── Accent: Blue — Professional ────────────────── */
  --blue:           #1E40AF;   /*  8.0:1 ✓ AAA — deep navy blue */
  --blue-dim:       #1E3A8A;   /* 10.2:1 ✓ AAA — darker hover */
  --blue-glow:      rgba(30, 64, 175, 0.10);

  /* ── Accent: Lavender — Research & Creative ─────── */
  --lavender:       #6D28D9;   /*  6.5:1 ✓ AA  — deep violet-lavender */
  --lavender-soft:  #7C3AED;   /*  5.2:1 ✓ AA  — heading italic */
  --lavender-dim:   #5B21B6;   /*  8.2:1 ✓ AAA — darker hover */
  --lavender-glow:  rgba(109, 40, 217, 0.10);

  /* ── Borders ─────────────────────────────────────── */
  --border:           rgba(109, 40, 217, 0.12);  /* lavender-tinted hairline */
  --border-emerald:   rgba(4, 120, 87, 0.25);
  --border-blue:      rgba(30, 64, 175, 0.25);
  --border-lavender:  rgba(109, 40, 217, 0.25);

  /* ── Soft glows (day mode — subtle, not neon) ───── */
  --glow-emerald:  0 0 8px rgba(4,120,87,0.20),   0 0 16px rgba(4,120,87,0.10);
  --glow-blue:     0 0 8px rgba(30,64,175,0.20),  0 0 16px rgba(30,64,175,0.10);
  --glow-lavender: 0 0 8px rgba(109,40,217,0.20), 0 0 16px rgba(109,40,217,0.10);

  /* ── Semantic ────────────────────────────────────── */
  --error:   #DC2626;
  --success: #047857;

  /* Z-index & radius inherit from dark (same values) */
}
```

---

### 2c. Three-Accent Semantic Map (both themes)

| Accent | Dark token | Light token | Sections | Meaning |
|--------|-----------|-------------|----------|---------|
| **Emerald** | `#2EFF7A` | `#047857` | Skills, Projects, Certifications | Technical — "what you build" (monitor glow) |
| **Blue** | `#4B8EFF` | `#1E40AF` | Hero, Experience, Timeline (industry) | Professional — "where you've been" |
| **Lavender** | `#A78BFA` | `#6D28D9` | Publications, Blog, Achievements, Timeline (education) | Research & creative — "what you explore" |

### 2d. Color Usage Rules (both themes)

| Context | Dark | Light | Rule |
|---------|------|-------|------|
| Section label `// ...` | `--text-muted` | `--text-muted` | Never accent color |
| Heading italic word | `--lavender-soft` `#C4B5FD (dark) / #7C3AED (light)` | `--lavender-soft` `#7C3AED` | Matches `titles.png` lavender quality |
| Body text | `--text-secondary` | `--text-secondary` | Never an accent |
| Skill tag hover | `--emerald` | `--emerald` | Technical coding |
| Project card | `--emerald` | `--emerald` | Technical/code |
| Experience nodes | `--blue` | `--blue` | Industry/professional |
| Education nodes | `--lavender` | `--lavender` | Academic |
| Hero CTA / name | `--blue` | `--blue` | Professional identity |
| Publications / Blog | `--lavender` | `--lavender` | Research |
| `--blue-dim` / `--lavender-dim` | borders only | text OK | Check notes above |
| Errors | `--error` | `--error` | Never substitute accent |

---

## 3. Typography System

Two fonts, three roles — each chosen for the Cyberpunk Lofi + hacker aesthetic.

### Why these fonts

| Font | Why it fits |
|------|-------------|
| **JetBrains Mono** | Purpose-built for code. Used for **both headings and labels** — the terminal/hacker voice of the site. Italic weight (300i) gives section accent words a subtle glitch inflection without serif softness. |
| **Space Grotesk** | Subtle geometric quirks (the `G`, `S`, `a`) say "tech creative" without screaming. Used for body text and descriptions — readable at paragraph sizes while still feeling technical. |

> **Why Cormorant was dropped:** The elegant serif created a lofi-poetry aesthetic that conflicted with the hacker/ML-engineer identity. JetBrains Mono headings read like a terminal — intentional and on-brand.

### Font Stack
```css
--font-serif: 'JetBrains Mono', monospace;             /* display headings — hacker terminal voice */
--font-sans:  'Space Grotesk', system-ui, sans-serif;  /* body / UI */
--font-mono:  'JetBrains Mono', monospace;             /* labels, metadata, code */
```

### CSS Import
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&display=swap');
```

### Type Scale & Usage

| Element | Font | Size | Weight | Color | Notes |
|---------|------|------|--------|-------|-------|
| Section label `//` prefix | JetBrains Mono | 10px | 400 | `--text-muted` | Added via `::before { content: '//' }` — visually soft |
| Section label text | JetBrains Mono | 10px | 500 | section accent (`--emerald`, `--blue`, or `--lavender`) | Uppercase, letter-spacing 0.22em — accent matches section theme |
| Display heading — upright | **JetBrains Mono** | `clamp(1.6rem,3.2vw,2.4rem)` | 500 | `--text-primary` | `letter-spacing: -0.5px; line-height: 1.15` — terminal precision |
| Display heading — italic accent | **JetBrains Mono Italic** | (same as above) | 300i | `--lavender-soft` | Mono italic = subtle glitch inflection, not calligraphic |
| Hero name | JetBrains Mono | `clamp(2.4rem,7vw,5rem)` | 500 / 300i | `--text-primary` / `--lavender-soft` | Large terminal display |
| Section subheading | Space Grotesk | 20–24px | 600 | `--text-primary` | |
| Body text / section description | Space Grotesk | 16–17px | 400 | `--text-secondary` | line-height 1.9, max-width ~500px for readability |
| Metadata / org / location | JetBrains Mono | 12px | 400 | `--text-muted` | dates, org names |
| Card title | Space Grotesk | 18px | 600 | `--text-primary` | |
| Timeline year | JetBrains Mono | 14px | 500 | `--emerald` or `--lavender` | font-variant-numeric: tabular-nums |
| Nav links | JetBrains Mono | 13px | 400 | `--text-secondary` | letter-spacing 0.08em |

> **Cormorant sizing note:** This font renders optically smaller than Playfair. Always use 60px minimum for display. Thin strokes need breathing room.

### Section Title Pattern (from `titles.png` + `example_website.html`)
```tsx
<div>
  <div className="section-label">TECHNICAL SKILLS</div>
  <h2>
    <span className="heading-plain">Tools of </span>
    <em className="heading-accent">the trade</em>
  </h2>
  <p className="section-desc">One or two sentences describing the section.</p>
</div>
```

```css
/* // prefix injected by ::before so it can be styled separately */
.section-label {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--emerald);       /* swap to --blue or --lavender per section */
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}
.section-label::before {
  content: '//';
  color: var(--text-muted);    /* soft separator — never accent */
}

h2.section-title {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 500;            /* NOT 600 — preserves Cormorant's elegance */
  letter-spacing: -0.4px;
  line-height: 1.2;
  color: var(--text-primary);
  margin-bottom: 3rem;
}

.heading-plain {
  font-style: normal;
}

.heading-accent {
  font-style: italic;
  color: var(--lavender-soft);  /* #C4B5FD (dark) / #7C3AED (light) */
}

.section-desc {
  font-family: var(--font-sans);
  font-size: 17px;
  font-weight: 400;
  color: var(--text-secondary);
  line-height: 1.9;
  max-width: 500px;
  margin-bottom: 2.8rem;
}
```

---

## 4. Motion & Animation

**Motion language: "Neural river"** — paths flow, nodes pulse, content arrives like data packets.

### Principles
- Flow is horizontal/diagonal before vertical (like the timeline river)
- Neon glows **breathe** — slow 2s pulse, never flash
- Content enters from below: `translateY(40px) → 0`, `opacity 0 → 1`
- Exit animations are 60% of enter duration

### Timing Tokens
```css
--duration-micro:  150ms;   /* hover states, button press */
--duration-enter:  350ms;   /* element entrance */
--duration-exit:   210ms;   /* element exit (60% of enter) */
--duration-glow:   2000ms;  /* breathing neon pulse */
--duration-draw:   1200ms;  /* SVG path draw animation */
--ease-out:        cubic-bezier(0.16, 1, 0.3, 1);
--ease-in:         cubic-bezier(0.7, 0, 0.84, 0);
```

### Key Animation Patterns

**1. Neon breathing (timeline nodes, accent borders)**
```css
@keyframes emeraldBreathe {
  0%, 100% { box-shadow: var(--glow-emerald); opacity: 0.85; }
  50%       { box-shadow: 0 0 20px rgba(46,255,122,0.9), 0 0 44px rgba(46,255,122,0.4); opacity: 1; }
}
@keyframes blueBreathe {
  0%, 100% { box-shadow: var(--glow-blue); opacity: 0.85; }
  50%       { box-shadow: 0 0 20px rgba(75,142,255,0.9), 0 0 44px rgba(75,142,255,0.4); opacity: 1; }
}
@keyframes lavenderBreathe {
  0%, 100% { box-shadow: var(--glow-lavender); opacity: 0.85; }
  50%       { box-shadow: 0 0 20px rgba(167,139,250,0.9), 0 0 44px rgba(167,139,250,0.4); opacity: 1; }
}
```

**2. Section entrance (Intersection Observer triggered)**
```css
@keyframes slideUp {
  from { transform: translateY(40px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}
/* Apply: animation: slideUp var(--duration-enter) var(--ease-out) both; */
```

**3. SVG path draw (timeline river spine)**
```css
/* path: stroke-dasharray = stroke-dashoffset = pathLength */
@keyframes drawPath {
  to { stroke-dashoffset: 0; }
}
/* animation: drawPath var(--duration-draw) var(--ease-out) forwards; */
```

**4. Grain texture overlay (lofi warmth)**
```css
.grain-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: var(--z-toast); /* above everything */
  opacity: 0.04; /* 0.04 — perceptible warmth, not distracting (was 0.025, too faint) */
  background-image: url('/noise.png'); /* or inline SVG feTurbulence */
  background-repeat: repeat;
}
```

**5. Staggered list entrance**
```css
/* Apply delay per item: animation-delay: calc(index * 60ms) */
/* Max stagger: 6 items = 360ms total — beyond that, batch */
```

### Reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

---

## 5. Component Patterns

### 5.1 Section Label + Heading
```
[//] SECTION NAME        ← JetBrains Mono 10px, 0.22em tracking; '//' via ::before in --text-muted,
                           label text in section accent (--emerald / --blue / --lavender)
Large Heading italic     ← Cormorant Garamond 500, clamp(2rem,4vw,2.8rem),
                           letter-spacing -0.4px, line-height 1.2,
                           plain word in --text-primary + italic word in --lavender-soft
Section description      ← Space Grotesk 17px, --text-secondary, line-height 1.9, max-width 500px
```

### 5.2 Timeline (Experience + Education)
**Reference:** `public/inspiration/timeline.png`

- Layout: Horizontal zigzag river (alternating above/below spine)
- Spine: SVG `<path>`, `stroke-dashoffset` draws on scroll entry, `stroke: url(#timelineGradient)` (blue → lavender)
- Industry/Experience nodes: `--blue` fill + `blueBreathe` glow animation
- Academia/Education nodes: `--lavender` fill + `lavenderBreathe` glow animation
- Each node: Lucide SVG icon (accent colored), year range in accent color (JetBrains Mono), title Space Grotesk 600 white, org JetBrains Mono muted
- Legend bottom-left: `Blue: Industry · Lavender: Academia` in JetBrains Mono 11px
- Mobile: vertical timeline, nodes alternate left/right, spine is vertical SVG line

### 5.3 Achievement Card
Fields: `image`, `award`, `competition`, `representation`, `organizers`, `year`, `description`

**Default state (visible):**
- Image left (square, `--radius-md`)
- Award title: Space Grotesk 600 `--text-primary`
- Competition: Space Grotesk 400 `--text-secondary`
- Representation + Organizers: JetBrains Mono 12px `--text-muted`
- Year: JetBrains Mono 12px `--lavender` or `--emerald`
- Left accent border: 2px `--emerald` or `--lavender`

**Hover state (description overlay):**
- Full-card overlay: `rgba(7, 7, 26, 0.92)` + `backdrop-filter: blur(8px)`
- Description slides up from bottom: `translateY(100%) → 0`, 250ms `--ease-out`
- Description text: Space Grotesk 15px `--text-secondary`, line-height 1.7
- Top-edge accent line in card color

### 5.4 Skill Tag
```css
.skill-tag {
  font-family: var(--font-mono);
  font-size: 13px;
  padding: 6px 12px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  transition: border-color var(--duration-micro), box-shadow var(--duration-micro);
}
.skill-tag:hover {
  border-color: var(--border-emerald); /* or --border-lavender by category */
  box-shadow: 0 0 8px var(--glow-emerald);
}
```

### 5.5 Blog / Project Card
```css
/* Default: dark card, hairline border */
/* Hover: top-edge accent line slides in + scale(1.02) */
.card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: var(--emerald); /* or --violet */
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 200ms var(--ease-out);
}
.card:hover::before { transform: scaleX(1); }
```

### 5.6 Navbar
```css
.navbar {
  background: transparent;
  transition: background var(--duration-enter), backdrop-filter var(--duration-enter);
}
.navbar.scrolled {
  background: rgba(7, 7, 26, 0.88);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
}
/* Nav links: JetBrains Mono 13px, --text-secondary, letter-spacing 0.08em */
/* Active: --emerald or --violet + 2px bottom underline */
```

---

## 6. Layout & Spacing

```css
--container-max:   1200px;
--section-gap:     clamp(4rem, 8vw, 7rem);   /* vertical spacing between sections */
--content-gutter:  clamp(1.5rem, 5vw, 4rem); /* horizontal padding */
```

**Spacing scale (8px base):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128px

**Breakpoints:**
| Name | Width | Notes |
|------|-------|-------|
| Mobile | 375px | Timeline → vertical |
| Tablet | 768px | Timeline → semi-horizontal |
| Desktop | 1024px | Full horizontal timeline |
| Wide | 1440px | Max container |

---

## 7. Sections & Page Architecture

| # | Section | Primary Accent | Secondary |
|---|---------|---------------|-----------|
| 1 | Hero | Cyan (`--cyan`) | Emerald |
| 2 | Skills | Emerald | — |
| 3 | Experience + Education Timeline | Emerald (industry) | Violet (academia) |
| 4 | Projects | Emerald | — |
| 5 | Publications | Violet | — |
| 6 | Achievements | Emerald + Violet | by category |
| 7 | Certifications | Emerald | — |
| 8 | Blog | Violet | — |
| Footer | Cyan (subtle) | — |

---

## 8. Anti-Patterns (Do Not Use)

- No light or white backgrounds anywhere
- No Orbitron font — too aggressive, kills the lofi warmth
- No red neon except `--error` (errors only)
- No glitch effects on body text — headings only, max once per page
- No emojis as icons — Lucide React SVGs only
- No horizontal scroll on any viewport
- No gradient text on body copy — accent italic heading word only
- No heavy glass blur on card surfaces — navbar + achievement overlay only
- No cyan anywhere — palette is emerald, blue, lavender only
- No `--lavender-dim` or `--blue-dim` for small text — borders and accents only (fail AA for body size)
- Do not mix all three accents on a single element — keep each component single-accent coded
