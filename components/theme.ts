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
          50: { value: "#FCFCFC" },
          100: { value: "#F8F0E8" },
          200: { value: "#EFDDCA" },
          300: { value: "#E8CFB5" },
          400: { value: "#AAA89D" },
          500: { value: "#62797A" },
          600: { value: "#657E7D" },
          700: { value: "#39626A" },
          800: { value: "#1D3D4E" },
          900: { value: "#1C3245" },
          950: { value: "#1A263C" },
        },
      },
      fonts: {
        heading: { value: "var(--font-cookie)" },
        body: { value: "var(--font-martianMono)" },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: {
            value: { _light: "colors.brand.800", _dark: "colors.brand.200" },
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
            value: { _light: "colors.brand.600", _dark: "colors.brand.300" },
          },
          fgMuted: {
            value: { _light: "colors.brand.500", _dark: "colors.brand.400" },
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

// Custom color palette (if defined in your theme)
// colorPalette: "brand"
// https://chakra-ui.com/docs/theming/customization/colors
