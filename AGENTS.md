# AGENTS.md

This document outlines architectural patterns, implementation considerations, and design decisions for AI-assisted development workflows on this codebase.

## Critical Architecture Decisions

### Static Export Constraint
The project uses `output: "export"` in [next.config.ts](next.config.ts), which means:
- **NO server-side features** - no API routes, server components with data fetching, or any Node.js runtime features
- All pages must be statically generated at build time
- Use client-side data fetching or static data only

### Chakra UI v3 Patterns
This project uses Chakra UI v3.19.2, which has a different API than v2:
- Use compound component patterns: `Tabs.Root`, `Tabs.Trigger`, `Tabs.Content`, `List.Root`, `List.Item`
- **NOT** the old v2 API patterns
- Components are imported from `@chakra-ui/react` directly

### Font Loading
Fonts are loaded via Next.js font optimization:
- Fonts defined in [app/layout.tsx](app/layout.tsx) with CSS variables (`--font-martian`, `--font-cookie`)
- Variables applied to HTML element via `className`
- Body uses `martianMono.className` directly
- Headings use `fontFamily="heading"` which maps to Cookie font via theme

### Library Philosophy
**ALWAYS prefer existing libraries** in [package.json](package.json):
- Chakra UI components for UI elements
- react-icons for icons
- next-themes for theme management
- Built-in Next.js/React features

**Do NOT install new libraries** unless absolutely necessary. Check if Chakra UI components or existing utilities can solve the problem first.

## Theme System Nuances

### Semantic Color Tokens
Colors use semantic tokens that automatically adapt to light/dark mode:
- `brand.fg` - foreground text
- `brand.bg` - background
- `brand.fgEmph` - emphasized/accent text
- `brand.fgMuted` - muted text
- `brand.muted` - muted backgrounds
- `brand.subtle` - subtle backgrounds
- `brand.emphasized` - emphasized backgrounds

**NEVER use hardcoded colors**. Always use semantic tokens from the theme defined in [components/theme.ts](components/theme.ts).

### Color Palette
Brand colors are defined in [components/theme.ts](components/theme.ts) with semantic mappings. 
- The `brand.fgEmph` token is the accent color used for emphasis (e.g., highlighting "Savindi" in the heading).
- The `colorPalette` is set to `brand` globally on the `html` element in `theme.ts`, making it the default for many Chakra components.

### Color Mode
Use the custom `useColorMode` hook from [components/ui/color-mode.tsx](components/ui/color-mode.tsx), **not** next-themes directly. The hook wraps next-themes and provides a consistent API.

## Component Patterns & Gotchas

### Navbar
Navigation links are commented out in [components/navbar.tsx](components/navbar.tsx). The mobile drawer exists but is mostly empty - navigation structure is prepared but not active.

### Experience Page
[app/experience.tsx](app/experience.tsx) has content mismatches:
- Tab trigger "uoa" shows content that describes WSO2 work
- Placeholder tab content exists for "projects" and "tasks" that don't match actual tab triggers ("wso2", "pearson")

### SocialButton Pattern
[components/socials.tsx](components/socials.tsx) uses a specific Chakra UI v3 pattern:
- `LinkOverlay` inside `IconButton` for clickable icon buttons
- This is the v3 way to make icon buttons act as links

### Logo Switching
Logos change based on color mode via the pattern in [constants/logos.tsx](constants/logos.tsx):
- `Logos.BrandLogo.src.light` for light mode
- `Logos.BrandLogo.src.dark` for dark mode
- Access via the color mode value

## Responsive Patterns

### Breakpoint Logic
The experience page uses `useBreakpointValue` with inverted logic:
```typescript
const isMobile = useBreakpointValue({
  lg: false,
  md: true,
  sm: true,
  base: true,
});
```
This means "mobile is true" - the logic is inverted from typical patterns.

### Container Heights
Viewport calculations account for navbar height:
- Uses `calc(100dvh - 64px)` where 64px is the navbar height
- The `dvh` unit is used for dynamic viewport height

## Asset & Constant Management

### Centralized Constants
The project uses a `constants/` directory to manage static data and asset references:
- [constants/socials.tsx](constants/socials.tsx) - Social media links and icons
- [constants/images.tsx](constants/images.tsx) - Profile photos and other general images
- [constants/logos.tsx](constants/logos.tsx) - Brand logos with light/dark variants

**Always add new assets or static links to these constants** instead of hardcoding them in components.

### Image Constants
Images are accessed via the `ImageAssets` constant object in [constants/images.tsx](constants/images.tsx), not direct paths. This centralizes asset management.

### Logo Constants
Logos have separate light/dark variants defined in [constants/logos.tsx](constants/logos.tsx) with the structure:
```typescript
{
  src: {
    light: "/path/to/light.png",
    dark: "/path/to/dark.png"
  },
  alt: "description"
}
```

### CV Links
In [app/page.tsx](app/page.tsx), one CV link is active, the second one (SE version) is commented out.

## Important Implementation Details

### Path Aliases
Always use `@/` prefix for imports (configured in [tsconfig.json](tsconfig.json)):
- `@/components/...` not `../../components/...`
- `@/constants/...` not relative paths

### Client Components
Components using hooks or interactivity need the `"use client"` directive at the top of the file. Server components (default in App Router) cannot use hooks or browser APIs.

### Provider Wrapper
Use the custom `Provider` component from [components/ui/provider.tsx](components/ui/provider.tsx), which wraps both `ChakraProvider` and `ColorModeProvider`. Do not use `ChakraProvider` directly.

### Font Variables
Font variables are applied to the HTML element via `className`. The body uses `martianMono.className` directly, while headings use `fontFamily="heading"` which maps to the Cookie font via theme configuration.

### Code Comments
**Do NOT add comments that state the obvious** (e.g., `// Set the color to red`). Only add comments to explain **"why"** something is done when the reason is not obvious from the code itself.

## Known Issues/Incomplete Features

- Experience page has tab content mismatches (uoa tab shows WSO2 content, placeholder tabs exist)
- Navigation links commented out in navbar
- Second CV link commented out in home page

