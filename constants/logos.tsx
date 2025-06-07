export interface Logo {
  src: Record<"light" | "dark", string>;
  alt: string;
}

export const Logos: Record<string, Logo> = {
    BrandLogo: {
        src: {
            light: "/assets/brand/logo_light.png",
            dark: "/assets/brand/logo_dark.png",
        },
        alt: "Savindi Wijenayaka logo",
    },
}
