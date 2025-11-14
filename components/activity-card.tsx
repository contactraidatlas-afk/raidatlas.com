"use client"

import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

type Activity = {
  id: string
  slug: string
  title: string
  shortDescription: string
  price: string
  duration: string
  rating: string
  reviewCount: string
  srcImage: string
  heroImage: string
  featured?: boolean
}

interface ActivityCardProps {
  activity: Activity
  index?: number
}

export function ActivityCard({ activity, index = 0 }: ActivityCardProps) {
  return (
    <Link
      href={`/activities/${activity.slug}`}
      aria-label={`View details for ${activity.title}`}
      className="group block cursor-pointer h-full"
    >
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col border border-border rounded-lg bg-background relative aspect-square">
        {/* Full Card Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={activity.srcImage}
            alt={activity.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={90}
            loading="lazy"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col h-full p-4">
          {/* Top badges */}
          <div className="flex justify-between items-start mb-auto">
            <div className="bg-white text-primary px-3 py-1 rounded-md font-bold text-sm shadow-sm">
              {activity.price}
            </div>
            <div className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-md flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-xs font-medium">{activity.rating}</span>
            </div>
          </div>

          {/* Bottom content section - Title only */}
          <div className="bg-white/95 backdrop-blur-sm p-3 rounded-lg mb-3">
            <h3 className="text-sm font-medium text-center group-hover:text-primary transition-colors duration-300">
              {activity.title}
            </h3>
          </div>

          {/* Button Section */}
          <div className="w-full border-2 border-primary text-primary bg-white/95 hover:bg-primary hover:text-white py-2 px-4 rounded-md font-medium text-center transition-all duration-300 cursor-pointer">
            View Details
          </div>
        </div>
      </Card>
    </Link>
  )
}
