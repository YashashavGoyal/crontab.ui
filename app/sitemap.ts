import { MetadataRoute } from "next";
import { getBaseUrl } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = getBaseUrl() || "https://example.com";

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
    ];
}
