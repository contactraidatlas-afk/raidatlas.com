import type { MetadataRoute } from "next"
import allActivities from "@/data/activities.json"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.raidatlas.com"

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/activities`,
      changeFrequency: "weekly",
      priority: 0.9,
      lastModified: new Date(),
    },
    { 
      url: `${baseUrl}/about`, 
      changeFrequency: "monthly", 
      priority: 0.7,
      lastModified: new Date(),
    },
    { 
      url: `${baseUrl}/contact`, 
      changeFrequency: "monthly", 
      priority: 0.8,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/thank-you`,
      changeFrequency: "never",
      priority: 0.3,
      lastModified: new Date(),
    },
  ]

  const activityRoutes: MetadataRoute.Sitemap = (allActivities as any[]).map((a: any) => ({
    url: `${baseUrl}/activities/${a.slug ?? a.id}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  return [...staticRoutes, ...activityRoutes]
}
