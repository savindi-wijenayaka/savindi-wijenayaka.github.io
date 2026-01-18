import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://savindi-wijenayaka.github.io",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        // Add other pages here if new routes are added (e.g., /blog)
    ];
}
