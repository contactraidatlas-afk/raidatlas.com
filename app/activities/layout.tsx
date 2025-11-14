import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Activities | Raid Atlas",
  description:
    "Explore our curated selection of quad, buggy and camel experiences in the Raid Atlas. Guaranteed quality, free cancellation, and 7/7 assistance.",
  alternates: { canonical: "/activities" },
  openGraph: {
    title: "Activities | Raid Atlas",
    description:
      "Explore our curated selection of quad, buggy and camel experiences in the Raid Atlas.",
    url: "/activities",
    type: "website",
    images: [
      { url: "/Slides/DSC_4782.jpg", width: 1200, height: 630, alt: "Raid Atlas — Activities" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Activities | Raid Atlas",
    description:
      "Explore our curated selection of quad, buggy and camel experiences in the Raid Atlas.",
    images: ["/Slides/DSC_4782.jpg"],
  },
}

export default function ActivitiesLayout({ children }: { children: React.ReactNode }) {
  return children
}
