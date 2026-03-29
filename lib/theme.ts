import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  globalCss: {
    html: {
      colorPalette: "brand",
      scrollBehavior: "smooth",
    },
    "::selection": {
      bg: "colors.neutral.800",
      color: "colors.neutral.50",
    },
    "::-webkit-scrollbar": {
      width: "5px",
    },
    "::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "::-webkit-scrollbar-thumb": {
      background: "colors.accent.500",
      borderRadius: "3px",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "colors.accent.400",
    },
  },
  theme: {
    tokens: {
      colors: {
        // Primary: arcane amethyst — used for dark bg.emphasized
        brand: {
          100: { value: "#E7DAFF" },
          200: { value: "#D0B7FF" },
          300: { value: "#B18BFF" },
          400: { value: "#8C5BFA" },
          500: { value: "#6A35E6" },
          600: { value: "#5327BD" },
          700: { value: "#3D1D8C" },
          800: { value: "#27145C" },
          900: { value: "#140A33" },
        },
        // Neutral: parchment (light) / obsidian (dark)
        neutral: {
          50: { value: "#F7F3EB" },
          100: { value: "#E9DFCF" },
          200: { value: "#D4C3A8" },
          300: { value: "#B49C78" },
          500: { value: "#755D43" },
          600: { value: "#5C4937" },
          700: { value: "#433429" },
          800: { value: "#2A211B" },
          900: { value: "#17110F" },
          950: { value: "#0A0706" },
        },
        // Accent: enchanted emerald — primary highlight / CTA color
        accent: {
          50: { value: "#E7FFF8" },
          200: { value: "#8FF0D1" },
          300: { value: "#62E0B9" },
          400: { value: "#3AC39A" },
          500: { value: "#239A7A" },
          600: { value: "#187663" },
          900: { value: "#05201E" },
        },
      },
      fonts: {
        heading: { value: "var(--font-tektur)" },
        body: { value: "var(--font-martian)" },
      },
    },
    semanticTokens: {
      shadows: {
        // Light: reduced opacity + lighter drop — shadows read as depth on parchment, not cutouts
        // Dark: full strength — absorbed into dark surface naturally
        "brand-glow": {
          value: {
            _light: "0 0 20px rgba(35, 154, 122, 0.15), 0 2px 8px rgba(0, 0, 0, 0.07)",
            _dark: "0 0 24px rgba(106, 53, 230, 0.25), 0 4px 12px rgba(0, 0, 0, 0.2)",
          },
        },
        "accent-glow": {
          value: {
            _light: "0 0 20px rgba(35, 154, 122, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06)",
            _dark: "0 0 24px rgba(35, 154, 122, 0.25), 0 4px 12px rgba(0, 0, 0, 0.2)",
          },
        },
        "card-lift": {
          value: {
            _light: "0 2px 12px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)",
            _dark: "0 8px 32px rgba(0, 0, 0, 0.25)",
          },
        },
      },
      colors: {
        bg: {
          canvas: { value: { _light: "colors.neutral.50", _dark: "colors.neutral.950" } },
          surface: { value: { _light: "colors.neutral.100", _dark: "colors.neutral.900" } },
          subtle: { value: { _light: "colors.neutral.200", _dark: "colors.neutral.800" } },
          // light: soft lavender tint — warm parchment + lavender pair well (illuminated manuscript)
          // dark: deep amethyst void
          emphasized: { value: { _light: "colors.accent.50", _dark: "colors.brand.900" } },
          card: { value: { _light: "colors.neutral.100", _dark: "colors.neutral.900" } },
          // Tech/status badge backgrounds — warm parchment tan in light (grounds emerald text naturally),
          // dark obsidian in dark. Keeps badges out of the lavender/emerald clash.
          tag: { value: { _light: "colors.neutral.200", _dark: "colors.neutral.800" } },
        },
        fg: {
          default: { value: { _light: "colors.neutral.900", _dark: "colors.neutral.50" } },
          muted: { value: { _light: "colors.neutral.600", _dark: "colors.neutral.200" } },
          subtle: { value: { _light: "colors.neutral.500", _dark: "colors.neutral.300" } },
          inverse: { value: { _light: "colors.neutral.50", _dark: "colors.neutral.950" } },
          // dark: accent.200 (light emerald on dark) → light: accent.600 (dark emerald on light)
          accent: { value: { _light: "colors.accent.600", _dark: "colors.accent.200" } },
          // Decorative/structural symbol colour — amethyst in light (glows on parchment), emerald in dark
          // Use for: section diamonds ◈, timeline nodes, rune decorations — NOT interactive elements
          rune: { value: { _light: "colors.accent.500", _dark: "colors.accent.300" } },
        },
        accent: {
          // dark: accent.300 → light: accent.600 — same emerald hue, darker shade for parchment contrast
          solid: { value: { _light: "colors.accent.600", _dark: "colors.accent.300" } },
          // dark: accent.900 → light: neutral.100 — background tint, parchment-safe
          subtle: { value: { _light: "colors.neutral.100", _dark: "colors.accent.900" } },
          // dark: accent.500 → light: accent.500 — one step lighter than solid/CTA for component borders
          border: { value: { _light: "colors.accent.500", _dark: "colors.accent.500" } },
          fg: { value: { _light: "colors.neutral.50", _dark: "colors.neutral.950" } },
        },
        border: {
          default: { value: { _light: "colors.neutral.200", _dark: "colors.neutral.700" } },
          subtle: { value: { _light: "colors.neutral.100", _dark: "colors.neutral.800" } },
          // dark: accent.500 → light: accent.400 — jewel-tone vibrant for pure decoration (corner marks, dividers)
          // accent.400 (#3AC39A) is never used as text so WCAG contrast does not apply here
          rune: { value: { _light: "colors.accent.400", _dark: "colors.accent.500" } },
        },
        focus: {
          ring: { value: { _light: "colors.accent.600", _dark: "colors.accent.300" } },
        },
        state: {
          success: { value: { _light: "#1F934C", _dark: "#5FCD82" } },
          danger: { value: { _light: "#CB214D", _dark: "#FF799A" } },
          info: { value: { _light: "#2D6BDF", _dark: "#78B1FF" } },
        },
        // Aliases for Chakra's colorPalette: "brand" component variants
        brand: {
          solid: { value: { _light: "colors.accent.600", _dark: "colors.accent.300" } },
          contrast: { value: { _light: "colors.neutral.50", _dark: "colors.neutral.950" } },
          fg: { value: { _light: "colors.accent.600", _dark: "colors.accent.200" } },
          muted: { value: { _light: "colors.neutral.600", _dark: "colors.neutral.200" } },
          subtle: { value: { _light: "colors.neutral.200", _dark: "colors.neutral.800" } },
          emphasized: { value: { _light: "colors.accent.50", _dark: "colors.brand.900" } },
          focusRing: { value: { _light: "colors.accent.600", _dark: "colors.accent.300" } },
          fgEmph: { value: { _light: "colors.accent.600", _dark: "colors.accent.200" } },
          fgMuted: { value: { _light: "colors.neutral.500", _dark: "colors.neutral.300" } },
          bg: { value: { _light: "colors.neutral.50", _dark: "colors.neutral.950" } },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
