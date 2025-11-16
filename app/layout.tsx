import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Script from "next/script"
import { headers } from "next/headers"
import "./globals.css"
import Footer from "@/components/footer"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

export async function generateMetadata(): Promise<Metadata> {
  const hdrs = headers()
  const proto = hdrs.get("x-forwarded-proto") || "http"
  const host = hdrs.get("x-forwarded-host") || hdrs.get("host") || "localhost:3000"
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `${proto}://${host}`
  const absoluteLogo = `${baseUrl}/logoagafay.png`
  const absoluteOG = `${baseUrl}/Slides/1.png`
  return {
    title: "Raid Atlas - Aventures Désertiques & Quad au Maroc | Réservez Maintenant",
    description:
      "Vivez l'aventure désertique ultime avec Raid Atlas. Réservez des tours en quad, expériences désertiques et aventures marocaines authentiques. Qualité garantie, annulation gratuite, assistance 24h/7j. Quad ou buggy au Maroc.",
    keywords: [
      "quad Maroc",
      "buggy Maroc",
      "quad ou buggy Morocco",
      "tours désert Maroc",
      "Raid Atlas",
      "aventures Maroc",
      "activités désert",
      "location quad Marrakech",
      "Agafay desert",
      "desert adventure Morocco",
    ],
    generator: "Mehdicodes",
    applicationName: "Raid Atlas",
    referrer: "origin-when-cross-origin",
    creator: "Mehdi Codes",
    publisher: "Raid Atlas",
    formatDetection: {
      email: false,
      telephone: false,
      address: false,
    },
    openGraph: {
      title: "Raid Atlas - Aventures Désertiques & Quad au Maroc",
      description:
        "Vivez l'aventure désertique ultime avec Raid Atlas. Réservez des tours en quad, expériences désertiques et aventures marocaines authentiques.",
      url: "/",
      siteName: "Raid Atlas",
      images: [
        {
          url: absoluteOG,
          width: 1200,
          height: 630,
          alt: "Raid Atlas — Aventures Désertiques & Quad au Maroc",
          type: "image/png",
        },
        {
          url: absoluteLogo,
          width: 512,
          height: 512,
          alt: "Raid Atlas Logo",
          type: "image/png",
        },
      ],
      locale: "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Raid Atlas - Aventures Désertiques & Quad au Maroc",
      description:
        "Vivez l'aventure désertique ultime avec Raid Atlas. Réservez des tours en quad, expériences désertiques et aventures marocaines authentiques.",
      images: [absoluteOG],
      creator: "@raidatlas",
    },
    icons: {
      icon: [
        { url: "/logo.svg", type: "image/png", sizes: "any" },
        { url: "/logo.svg", type: "image/png", sizes: "192x192" },
      ],
      shortcut: ["/logo.svg"],
      apple: [
        { url: "/logo.svg", sizes: "180x180" },
      ],
      other: [
        { rel: "mask-icon", url: "/logo.svg", color: "#1a1a1a" },
      ],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: "/",
      languages: {
        "fr-FR": "/fr",
        "en-US": "/en",
      },
    },
    metadataBase: new URL(baseUrl),
    manifest: "/manifest.webmanifest",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const hdrs = headers()
  const proto = hdrs.get("x-forwarded-proto") || "http"
  const host = hdrs.get("x-forwarded-host") || hdrs.get("host") || "localhost:3000"
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `${proto}://${host}`
  return (
    <html lang="fr">
      <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Footer />
        <Analytics />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17616410969"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17616410969');`}
        </Script>
        <Script id="gtag-conversion" strategy="afterInteractive">
          {`gtag('event', 'conversion', {
              'send_to': 'AW-17616410969/lK0-CNj_rawbENmylNBB',
              'value': 1.0,
              'currency': 'MAD',
              'transaction_id': ''
          });`}
        </Script>
        <Script
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Raid Atlas",
              url: baseUrl,
              logo: `${baseUrl}/logo.svg`,
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+212601921044",
                  contactType: "customer service",
                  areaServed: "MA",
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  )
}
