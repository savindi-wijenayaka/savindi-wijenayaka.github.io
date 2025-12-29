import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  globalCss: {
    html: {
      colorPalette: "brand", // Change this to any color palette you prefer
    },
  },
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#EDEDF7" },
          100: { value: "#DFDEF2" },
          200: { value: "#CBB4E2" },
          300: { value: "#6c69a8" },
          400: { value: "#999CD6" },
          500: { value: "#B789D1" },
          600: { value: "#9540A0" },
          700: { value: "#5C2E76" },
          800: { value: "#292C66" },
          900: { value: "#0E0D21" },
          950: { value: "#080812" },
        },
      },
      fonts: {
        heading: { value: "var(--font-cookie)" },
        body: { value: "var(--font-martian)" },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: {
            value: { _light: "colors.brand.800", _dark: "colors.brand.400" },
          },
          contrast: {
            value: { _light: "colors.brand.100", _dark: "colors.brand.900" },
          },
          fg: {
            value: { _light: "colors.brand.800", _dark: "colors.brand.200" },
          },
          muted: {
            value: { _light: "colors.brand.200", _dark: "colors.brand.800" },
          },
          subtle: {
            value: { _light: "colors.brand.100", _dark: "colors.brand.900" },
          },
          emphasized: {
            value: { _light: "colors.brand.300", _dark: "colors.brand.700" },
          },
          focusRing: {
            value: { _light: "colors.brand.950", _dark: "colors.brand.50" },
          },
          fgEmph: {
            value: { _light: "colors.brand.600", _dark: "colors.brand.500" },
          },
          fgMuted: {
            value: { _light: "colors.brand.300", _dark: "colors.brand.400" },
          },
          bg: {
            value: { _light: "colors.brand.50", _dark: "colors.brand.950" },
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
