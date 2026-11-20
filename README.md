# Savindi Wijenayaka - Portfolio
[![Site deployment](https://github.com/savindi-wijenayaka/savindi-wijenayaka.github.io/actions/workflows/deploy.yaml/badge.svg)](https://github.com/savindi-wijenayaka/savindi-wijenayaka.github.io/actions/workflows/deploy.yaml)

Welcome to my little corner of the internet 👩🏽‍💻✨ Live at [savindi.com](https://savindi.com).

I'm driven by the excitement of turning ideas into tools that are useful, meaningful, and make a real difference in the world. My work spans deep learning, production-grade cloud-native development, and hands-on research, with a focus on computer vision and computational analysis.

Whether you're here to explore my work, collaborate on something exciting, or just say hi — I'm glad you stopped by.

## The site

A static portfolio with a hero built around an animated neural network, then work, experience, research, skills, wins, writing and contact. It has a light "paper" theme by default and a dark "lamplit" theme, a palette called **Tea and Plum** (blush paper, aubergine, plum, with honey as the highlight), and Fraunces and Inter for type.

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router), exported as a static site (`output: "export"`)
- React 19 with the React Compiler, TypeScript
- Tailwind CSS 4 plus hand-written CSS tokens and classes in `app/globals.css`
- MDX / Markdown blog (`gray-matter`, `remark-gfm`)
- `react-icons`, `next/font/google`

> This Next.js version has breaking changes from older ones. Check `node_modules/next/dist/docs/` before changing framework-level code.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # static export to out/
```

`dev` and `build` first run `scripts/sync-manifest.mjs`, which rebuilds `content/blog/manifest.json` from the blog posts' frontmatter.

## Project structure

```
app/            Routes, root layout (theme script, fonts) and globals.css (design tokens + styles)
components/
  layout/       Navbar, socials rail, footer
  sections/     Hero, Projects, Experience, Research, Skills, Achievements, Blog, Contact
  ui/           Shared pieces: hero network canvas, theme toggle, reveal-on-scroll, tags
content/blog/   Blog posts (Markdown) and the generated manifest
data/           Site content as typed data: experience, projects, achievements, skills, socials, publications
public/         Images, achievement photos, CV PDF
scripts/        sync-manifest.mjs, and a Medium scraper (scripts/scrape-medium) used to import posts
design-system/  Design docs. v4-tea-and-plum.md is the current one
```

## Updating content

Most changes are a data edit, no component work:

- **Experience, projects, achievements, skills, socials:** edit the matching file in `data/`.
- **Publications:** add entries to `data/publications.ts`; the Research section shows them once the list is non-empty.
- **Blog:** add a Markdown file to `content/blog/`. Set `featured: true` in its frontmatter to feature it, then rebuild.
- **CV:** replace `public/CV_SavindiWijenayaka_ML.pdf`.

## Deployment

Pushing to `main` deploys to GitHub Pages through `.github/workflows/deploy.yaml`, and the custom domain comes from `CNAME`. Work on a branch and open a pull request; the PR template lists what to check first.

## Design notes

The current design is described in [`design-system/v4-tea-and-plum.md`](design-system/v4-tea-and-plum.md): palette, type, layout, hero network, and motion rules (transform and opacity only, `prefers-reduced-motion` respected, hover effects only on fine pointers). `design-system/MASTER.md` and `pages/` describe the earlier design and are kept for history.

## Things to work on next

- **Talks & Workshops** — conference presentations, guest lectures, and invited sessions
- **Now** — a live `/now`-style card: what I'm currently reading, building, or thinking about
- **Interactive Demo** — an embedded live ML model or visualisation, in the spirit of the hero network
- **Testimonials** — short quotes from supervisors, collaborators, and colleagues
- **Reading List** — curated papers, books, and links that signal intellectual range

## Licence

Copyright (c) 2026 Savindi Wijenayaka. All rights reserved. No permission is granted to use, copy, modify or distribute anything in this repository; see [LICENSE](LICENSE).
