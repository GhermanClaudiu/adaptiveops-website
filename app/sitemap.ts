import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/content/blog";
import { WORKSHOPS } from "@/lib/content/workshops";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.adaptiveops.eu";
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: "2026-04-09",
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: "2026-04-09",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: "2026-04-09",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: "2026-04-09",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources/tools`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources/level-5-targeting`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/5s-numbers-game`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/workshops`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources/downloads`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: "2026-04-09",
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const workshopPages: MetadataRoute.Sitemap = WORKSHOPS.map((w) => ({
    url: `${baseUrl}/resources/workshops/${w.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages, ...workshopPages];
}
