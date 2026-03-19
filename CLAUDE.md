# CLAUDE.md — savindi-wijenayaka.github.io

This file is the source of truth for Claude when working on this project. Read it fully before making any changes.

---

## Project Overview

Personal portfolio website for **Savindi Wijenayaka**, a Machine Learning Engineer & PhD Researcher specialising in deep learning, computer vision, cloud-native AI (Azure/Kubernetes), and biomedical imaging.

**Live URL:** https://savindi.com
**Repository:** GitHub Pages static export (`output: "export"`)
**Primary goal:** Professional portfolio + SEO-maximised online presence

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | ^15 |
| UI Library | Chakra UI | ^3 |
| Styling | Emotion (via Chakra) | ^11 |
| Theme | next-themes + Chakra semantic tokens | ^0.4.6 |
| Language | TypeScript (strict) | ^5 |
| Icons | react-icons | ^5 |
| Fonts | Google Fonts via next/font | — |
| Deployment | GitHub Pages (static export) | — |

**Critical constraint:** `output: "export"` — no server-side rendering, no API routes, no `next/image` optimization. All features must work as static HTML/CSS/JS.

### Stack Migration Policy

**Do NOT change the tech stack without explicit user approval.** If you believe a migration (e.g., Tailwind CSS, Framer Motion, a different component library) would be strongly beneficial, ask first with a clear rationale. Only proceed after the user says yes.

---

## Design Vision

### Aesthetic: Vintage Fantasy RPG × Hacker Terminal

The visual design should feel like a **vintage fantasy game** (think classic RPG inventory screens, arcane rune borders, quest logs) blended with a **hacker/terminal aesthetic** (monospace type, scan-line hints, glowing phosphor greens and amethysts). The result must still read as **polished and professional** — a senior engineer's portfolio, not a game UI.

#### Design Principles

1. **Atmosphere over gimmick** — subtle texture, not overwhelming particle effects
2. **Readability first** — decorative elements must never obscure content
3. **Dark mode primary** — the fantasy-hacker aesthetic lands best in dark mode; light mode is a clean inversion
4. **Purposeful animation** — short, tasteful transitions only (fade-in on scroll, subtle glow pulses); no looping distractions
5. **Consistent token usage** — every colour/spacing value comes from the Chakra semantic token system in `lib/theme.ts`

#### Current Colour Palette (keep and extend, do not replace)

| Token name | Purpose | Dark value | Light value |
|---|---|---|---|
| `brand` | Arcane Amethyst — primary accent | `#6A35E6` | `#3D1D8C` |
| `neutral` | Parchment (light) / Obsidian (dark) | `#0A0706` bg | `#F7F3EB` bg |
| `accent` | Enchanted Emerald — CTAs, highlights | `#239A7A` | `#187663` |

#### Typography

- **Heading font:** Tektur (geometric, slightly runic — perfect for the theme)
- **Body font:** Martian Mono (monospace — reinforces the terminal/hacker side)
- Do not add new font families without user approval.

#### Visual Motifs to Use (subtly)

- Thin decorative borders with corner rune-like embellishments (CSS/SVG, not images)
- Section titles styled like RPG quest headers (e.g., subtle bracket decoration `[ Skills ]`)
- Skill/tech tags styled like inventory item badges
- Timeline entries styled like quest log entries
- Code/terminal-style text for meta information (dates, tech stacks)
- Glowing text-shadow on key headings (use sparingly — accent colours only)

---

## SEO Requirements — CRITICAL

SEO is the **highest priority** on this project after correctness. Every page, section, and component must be built with SEO in mind.

### Rules

1. **Semantic HTML always.** Use proper heading hierarchy (`h1` → `h2` → `h3`). Never skip levels. One `h1` per page.
2. **Every page has unique `<title>` and `<meta description>`.** Use the `metadata` export pattern in App Router.
3. **Structured data (JSON-LD) on every page.** The root layout already has `Person` schema. Add `Article` for blog posts, `CreativeWork` for projects, `ScholarlyArticle` for publications.
4. **Clean plain-English copy.** The fantasy/hacker theme applies to **visual design only** — section headings, body copy, alt text, and meta descriptions must use clear, professional, keyword-rich English. Do NOT write "Arcane Artefacts" instead of "Projects". Do NOT write "The Chronicles" instead of "Blog".
5. **Alt text on all images.** Descriptive, keyword-aware, not decorative filler.
6. **Canonical URLs.** Every page must have a canonical `<link>` tag.
7. **Open Graph + Twitter cards.** Every page needs full OG metadata.
8. **Sitemap and robots.txt.** Already exist — keep updated as new pages are added.
9. **Core Web Vitals.** Avoid layout shift. Lazy-load below-fold images. Minimise JS blocking the critical path.
10. **Internal linking.** All sections/pages should be reachable from the navbar and from contextual links within the content.
11. **Keyword strategy.** Primary keywords: `Savindi Wijenayaka`, `Machine Learning Engineer`, `Deep Learning`, `Computer Vision`, `Medical Imaging`, `Cloud-Native AI`, `Azure ML`, `Kubernetes`, `Python`, `PhD Researcher New Zealand`. Work these naturally into headings and body copy.

### Wording Rule

**Fantasy/hacker visual theme ≠ fantasy/hacker wording.** Section labels in the UI can have a subtle decorative treatment, but the actual text content (headings, descriptions, meta tags) must be plain professional English understandable by search engines and recruiters.

- ✅ Good: `<h2>Skills & Technologies</h2>` styled with rune-border decoration
- ❌ Bad: `<h2>The Arcane Arsenal</h2>`
- ✅ Good: Project card title "AI-Based Anomaly Detection for WSO2 Choreo"
- ❌ Bad: Project card title "The Anomaly Scroll"

---

## Site Structure

### Pages / Sections

| Route | Type | Status |
|---|---|---|
| `/` | Single-page scroll or landing | Exists |
| `/#about` | Hero / About section | Exists (refactor) |
| `/#experience` | Professional experience | Exists (refactor) |
| `/#skills` | Skills & Technologies | **To build** |
| `/#projects` | Selected projects | **To build** |
| `/#publications` | Research publications | **To build** |
| `/blog` | Blog listing page | **To build** |
| `/blog/[slug]` | Individual blog post | **To build** |

Blog posts and publications may be MDX files or data-driven from a `data/` file — confirm with user before implementing.

### Data Layer (`/data/`)

- `socials.ts` — social media links (exists)
- `logos.ts` — brand assets (exists)
- `images.ts` — image paths (exists)
- `experience.ts` — professional experience data **(to create)**
- `skills.ts` — skills/technologies data **(to create)**
- `projects.ts` — project data **(to create)**
- `publications.ts` — publications data **(to create)**
- `blog/` — blog post MDX files or metadata **(to create, discuss with user)**

---

## Component Conventions

- **Client components** only when necessary (interactivity, hooks). Add `"use client"` directive only when needed.
- **Server components by default** — prefer data co-location, no unnecessary client bundle weight.
- **Semantic tokens only** — never hardcode hex values in component styles. Use `bg.canvas`, `fg.muted`, `accent.solid`, etc.
- **Accessible markup** — every interactive element has `aria-label` where needed. Keyboard navigation must work.
- **No inline styles** — use Chakra's style props or `css()` utility.
- **TypeScript strict** — all props typed, no `any`.

---

## Agent Skills (vercel-labs/agent-skills)

The following skills from `https://github.com/vercel-labs/agent-skills` are available and should be used proactively:

| Skill | When to use |
|---|---|
| `react-best-practices` | When writing or reviewing React/Next.js components |
| `web-design-guidelines` | When implementing UI — accessibility, performance, UX |
| `composition-patterns` | When designing component architecture for new sections |

Install via: `npx skills add vercel-labs/agent-skills`

---

## File Naming Conventions

- Pages: `app/[route]/page.tsx`
- Layout wrappers: `components/layout/*.tsx`
- Page sections: `components/sections/*.tsx`
- Shared primitives: `components/shared/*.tsx`
- Data: `data/*.ts`
- Theme: `lib/theme.ts`
- Utilities: `lib/*.ts`

---

## Git & Deployment

- Branch: `main` deploys to GitHub Pages via GitHub Actions
- Do not force-push `main`
- Static export — run `npm run build` to validate before committing
- Image files go in `/public/assets/`

---

## What NOT to Do

- Do not add server-only Next.js features (API routes, middleware, server actions used for data mutation)
- Do not replace Chakra UI without user approval
- Do not add new fonts without user approval
- Do not use fantasy/hacker language in SEO-facing content (meta tags, headings, body copy, alt text)
- Do not hardcode colours — always use semantic tokens
- Do not create new pages/routes without confirming the URL structure with the user
- Do not use `any` TypeScript type
- Do not add placeholder/lorem ipsum content — ask the user for real content

---

## Questions to Ask Before Building New Sections

Before implementing skills, projects, publications, or blog:
1. What content goes in each section? (User provides real data)
2. Blog: MDX files or external CMS? Static data file?
3. Publications: Link to Google Scholar / DOI, or full citation in data file?
4. Projects: GitHub links, live demos, or descriptions only?
5. Skills: Categorised (Languages / Frameworks / Tools / Platforms)? Proficiency levels?
