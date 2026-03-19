import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  globalCss: {
    html: { colorPalette: "brand" },
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
      colors: {
        bg: {
          canvas: { value: { _light: "colors.neutral.50", _dark: "colors.neutral.950" } },
          surface: { value: { _light: "colors.neutral.100", _dark: "colors.neutral.900" } },
          subtle: { value: { _light: "colors.neutral.100", _dark: "colors.neutral.800" } },
          emphasized: { value: { _light: "colors.accent.50", _dark: "colors.brand.900" } },
        },
        fg: {
          default: { value: { _light: "colors.neutral.900", _dark: "colors.neutral.50" } },
          muted: { value: { _light: "colors.neutral.600", _dark: "colors.neutral.200" } },
          subtle: { value: { _light: "colors.neutral.500", _dark: "colors.neutral.300" } },
          inverse: { value: { _light: "colors.neutral.50", _dark: "colors.neutral.950" } },
          accent: { value: { _light: "colors.brand.500", _dark: "colors.accent.200" } },
        },
        accent: {
          solid: { value: { _light: "colors.accent.600", _dark: "colors.accent.300" } },
          subtle: { value: { _light: "colors.accent.50", _dark: "colors.accent.900" } },
          border: { value: { _light: "colors.accent.400", _dark: "colors.accent.500" } },
          fg: { value: { _light: "colors.neutral.50", _dark: "colors.neutral.950" } },
        },
        border: {
          default: { value: { _light: "colors.neutral.200", _dark: "colors.neutral.700" } },
          subtle: { value: { _light: "colors.neutral.100", _dark: "colors.neutral.800" } },
        },
        focus: {
          ring: { value: { _light: "colors.accent.500", _dark: "colors.accent.300" } },
        },
        state: {
          success: { value: { _light: "#1F934C", _dark: "#5FCD82" } },
          danger: { value: { _light: "#CB214D", _dark: "#FF799A" } },
          info: { value: { _light: "#2D6BDF", _dark: "#78B1FF" } },
        },
        // Aliases for Chakra's colorPalette: "brand" component variants
        brand: {
          solid: { value: { _light: "colors.accent.500", _dark: "colors.accent.300" } },
          contrast: { value: { _light: "colors.neutral.50", _dark: "colors.neutral.950" } },
          fg: { value: { _light: "colors.accent.600", _dark: "colors.accent.200" } },
          muted: { value: { _light: "colors.neutral.600", _dark: "colors.neutral.200" } },
          subtle: { value: { _light: "colors.neutral.100", _dark: "colors.neutral.800" } },
          emphasized: { value: { _light: "colors.accent.50", _dark: "colors.brand.900" } },
          focusRing: { value: { _light: "colors.accent.500", _dark: "colors.accent.300" } },
          fgEmph: { value: { _light: "colors.accent.600", _dark: "colors.accent.200" } },
          fgMuted: { value: { _light: "colors.neutral.500", _dark: "colors.neutral.300" } },
          bg: { value: { _light: "colors.neutral.50", _dark: "colors.neutral.950" } },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
