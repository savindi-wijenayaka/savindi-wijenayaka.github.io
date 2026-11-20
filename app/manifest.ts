import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Savindi Wijenayaka, PhD",
    short_name: "Savindi",
    description: "Machine Learning Engineer and researcher.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F0EA",
    theme_color: "#F7F0EA",
    icons: [
      { src: "/assets/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/assets/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
