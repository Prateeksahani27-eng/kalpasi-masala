import type { MetadataRoute } from "next";
import { getAllProductSlugs } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kalpasispices.com";
  const productUrls = getAllProductSlugs().map((slug) => ({
    url: `${base}/products/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/products`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/reviews`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.6 },
    ...productUrls,
  ];
}
