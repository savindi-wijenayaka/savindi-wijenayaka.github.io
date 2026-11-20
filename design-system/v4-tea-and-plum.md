# Redesign v4: Tea and Plum

Supersedes the "Cyberpunk Lofi" direction in `MASTER.md` (kept for history). Agreed with Savindi in a design conversation on 2026-11-20; mockups were reviewed in the browser before implementation.

## Intent

- Impress recruiters, show research depth, and read as a creative candidate.
- Expertise (ML engineering, bioengineering research) should be obvious from the first screen without reading.
- The whole site, not only the palette, should feel **intellectual, cozy and friendly**.

## Anti-goals

- No scroll-jacking, no custom cursor, no full-screen background canvas.
- No neon or glow. No competing accent colours.
- Do not invent facts. Every number on the page comes from `data/*.ts`.

## Palette (CSS variables in `app/globals.css`)

| Token | Light (paper) | Dark (lamplit) | Use |
| --- | --- | --- | --- |
| `--paper` | `#F7F0EA` | `#221A25` | page background |
| `--card` / `--card2` | `#EBDDD6` / `#F1E6DF` | `#31253A` / `#2A2030` | cards, panels |
| `--ink` | `#2E2330` | `#F2E6E6` | text |
| `--muted` | `#6D5C70` | `#B9A5B8` | secondary text |
| `--plum` | `#7B4B6A` | `#C998B8` | primary accent: name, links, network |
| `--honey-fill` | `#D9A441` | `#E8BC62` | highlight: main buttons, key numbers, badges |
| `--honey-text` | `#8A5F12` | `#E8BC62` | honey used as small text (keeps contrast) |

Rule: plum is the voice of the page, honey is the highlight. Honey is never used on hover chrome such as the socials rail, and not for borders.

Legacy token names (`--emerald`, `--lavender`, `--bg-*`, `--text-*`, `--border*`) are aliases to the new tokens so the blog pages keep working.

## Type

- Headings: Fraunces (serif). Body: Inter. Code: JetBrains Mono.
- Hero scale: role label 14px, name up to 112px, intro about 21px, buttons 15px. Spacing rhythm about 20 / 28 / 36px.

## Layout

1. Hero + floating "at a glance" card. Fills one screen on desktop. Wider container (1320px) than the rest of the page (1080px).
2. Selected work, 3. Experience (accordion ledger with headline metrics), 4. Research, 5. Skills, 6. Recognition (photo cards), 7. Writing (latest 3 with covers), 8. Contact.
3. Left socials rail (icons, desktop >= 1240px only).

## Hero network

The neural-network animation is the signature. It is the hero background only, aligned to the hero container edges, plum nodes with honey pulses, fading out toward the text. Pauses when off-screen, is DPR-aware, and draws one static frame under `prefers-reduced-motion`.

## Motion (Emil Kowalski design-engineering rules)

- Only `transform` and `opacity` for entrances; reveals ~400ms with `cubic-bezier(0.23, 1, 0.32, 1)`.
- Pressable elements: `scale(0.97)` on `:active`. Hover effects gated by `(hover: hover) and (pointer: fine)`.
- Accordion and overlays 250-300ms. Reduced motion respected everywhere.

## Content notes / open items

- `data/publications.ts` is empty; the Research section renders publications only when entries exist.
- "Core" skill highlighting (`CORE_SKILLS` in `components/sections/Skills.tsx`) and the contact copy are proposals to confirm.
- Experience headline metrics live in `data/experience.ts` (`metrics`), taken from existing bullets.
