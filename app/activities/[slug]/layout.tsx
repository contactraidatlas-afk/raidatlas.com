import type React from "react"
import type { Metadata } from "next"
import { headers } from "next/headers"
import allActivities from "@/data/activities.json"

type Activity = {
  id: string
  slug: string
  title: string
  shortDescription: string
  duration: string
  srcImage: string
}

const activitiesData: Activity[] = (allActivities as any[]).map((a: any) => ({
  id: a.id,
  slug: a.slug ?? a.id,
  title: a.title,
  shortDescription: a.shortDescription,
  duration: a.duration,
  srcImage: (a as any).srcImage,
}))

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const hdrs = headers()
  const proto = hdrs.get("x-forwarded-proto") || "http"
  const host = hdrs.get("x-forwarded-host") || hdrs.get("host") || "localhost:3000"
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `${proto}://${host}`
  const activity = activitiesData.find((a) => a.slug === params.slug)
  const baseTitle = "Raid Atlas"

  if (!activity) {
    return {
      title: `${baseTitle} — Activity not found`,
      description: "Discover quad biking and desert experiences in the Raid Atlas, Morocco.",
      alternates: { canonical: `/activities/${params.slug}` },
    }
  }

  const title = `${activity.title} | ${baseTitle}`
  const description = activity.shortDescription || `Enjoy a ${activity.duration} experience in the Raid Atlas.`
  const absoluteImage = activity.srcImage.startsWith("http")
    ? activity.srcImage
    : `${baseUrl}${activity.srcImage.startsWith("/") ? "" : "/"}${activity.srcImage}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/activities/${activity.slug}`,
      type: "article",
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: activity.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteImage],
    },
    alternates: {
      canonical: `/activities/${activity.slug}`,
    },
  }
}

export default function ActivitySlugLayout({ children }: { children: React.ReactNode }) {
  return children
}
