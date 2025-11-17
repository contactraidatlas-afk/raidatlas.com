"use client"
import { Navigation } from "@/components/navigation"
import { StickyButtons } from "@/components/sticky-buttons"
import { ActivityBookingForm } from "@/components/activity-booking-form"
import { ActivityReviews } from "@/components/activity-reviews"
import { ActivityFAQ } from "@/components/activity-faq"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Check, X, ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import allActivities from "@/data/activities.json"

type ProgramDay = {
  day: string
  title: string
  distance: string
  details: string[]
}

type Activity = {
  id: string
  slug: string
  title: string
  shortDescription: string
  longDescription: string
  price: string
  duration: string
  nights?: string
  type?: string
  difficulty?: string
  startLocation?: string
  endLocation?: string
  rating?: string
  reviewCount?: string
  maxGroupSize: string
  location: string
  heroImage: string
  srcImage: string
  highlights: string[]
  included: string[]
  notIncluded: string[]
  practicalInfo: string[]
  program: ProgramDay[]
  gallery: string[]
}

const fallbackActivityImages = [
  "/Agafay/DSC_5016.jpg",
  "/Agafay/DSC_5070.jpg",
  "/Agafay/DSC_5115.jpg",
  "/Agafay/DSC_4782.jpg",
  "/Agafay/DSC_4720.jpg",
  "/Agafay/DSC_4804.jpg",
]

const activitiesData: Activity[] = (allActivities as any[]).map((a: any, idx: number) => ({
  id: a.id,
  slug: a.slug ?? a.id,
  title: a.title,
  shortDescription: a.shortDescription,
  longDescription: a.description ?? a.shortDescription,
  price: a.price,
  duration: a.duration,
  rating: a.rating ?? "4.9",
  reviewCount: a.reviewCount ?? "100+",
  nights: a.nights,
  type: a.type,
  difficulty: a.difficulty,
  startLocation: a.startLocation,
  endLocation: a.endLocation,
  maxGroupSize: a.maxGroupSize ?? "8 people",
  location: a.location ?? "Raid Atlas, Morocco",
  heroImage: a.title,
  srcImage: (a as any).srcImage ?? fallbackActivityImages[idx % fallbackActivityImages.length],
  highlights: a.highlights ?? [],
  included: a.included ?? [],
  notIncluded: a.notIncluded ?? [],
  practicalInfo: a.practicalInfo ?? [],
  program: a.program ?? [],
  gallery: Array.isArray((a as any).gallery) && (a as any).gallery.length > 0
    ? (a as any).gallery
    : [
        "/Agafay/DSC_5016.jpg",
        "/Agafay/DSC_5070.jpg",
        "/Agafay/DSC_4804.jpg",
        "/Agafay/DSC_4720.jpg",
        "/Agafay/DSC_4782.jpg",
        "/Agafay/DSC_5115.jpg",
      ],
}))

 

export default function ActivityPage({ params }: { params: { slug: string } }) {
  const activity = activitiesData.find((a: Activity) => a.slug === params.slug)

  if (!activity) {
    notFound()
  }

  // Lightbox state and keyboard navigation
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null)
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) => (i === null ? i : (i + (activity?.gallery?.length || 0) - 1) % (activity?.gallery?.length || 1)))
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i === null ? i : (i + 1) % (activity?.gallery?.length || 1)))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [lightboxIndex, activity?.gallery?.length])

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Enhanced Hero Section */}
      <motion.section
        className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <Image
          src={activity.srcImage}
          alt={activity.title}
          fill
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover"
          priority
          quality={95}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-32 h-32 border border-white/30 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 left-32 w-24 h-24 border border-white/20 rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-16">
          <div className="text-white max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap items-center gap-4 mb-6"
            >
              {activity.type && (
                <Badge className="bg-accent/90 backdrop-blur-sm text-accent-foreground px-4 py-2 text-sm font-medium shadow-lg">
                  {activity.type}
                </Badge>
              )}
              <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-2 text-sm font-medium shadow-lg">
                {activity.duration}
              </Badge>
              {activity.difficulty && (
                <Badge className="bg-secondary/90 backdrop-blur-sm text-secondary-foreground px-4 py-2 text-sm font-medium shadow-lg">
                  {activity.difficulty}
                </Badge>
              )}
              {activity.rating && (
                <div className="flex items-center bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-2" />
                  <span className="font-semibold text-sm">{activity.rating}</span>
                  <span className="ml-1 text-sm opacity-80">({activity.reviewCount})</span>
                </div>
              )}
            </motion.div>
            
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              {activity.title}
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl lg:text-2xl mb-8 leading-relaxed max-w-3xl opacity-90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {activity.shortDescription}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <div className="flex items-center bg-black/40 backdrop-blur-sm rounded-lg px-4 py-3">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                <span className="font-medium">{activity.location}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-primary bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                {activity.price}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="order-2 lg:order-1 lg:col-span-2 space-y-12">
            {/* Enhanced Description & Highlights */}
            <motion.section 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, amount: 0.2 }} 
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-card/50 to-muted/20 rounded-2xl p-8 border border-border/50"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">À Propos de Cette Aventure</h2>
              </div>
              
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                {activity.longDescription}
              </p>

              <div className="bg-background/80 rounded-xl p-6 border border-border/30">
                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                  <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center mr-3">
                    <Check className="h-5 w-5 text-secondary" />
                  </div>
                  Points Forts de l'Aventure
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {activity.highlights.map((highlight: string, index: number) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start group"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-foreground group-hover:text-primary transition-colors duration-300">
                        {highlight}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* What's Included */}
            <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
              <h3 className="text-2xl font-semibold mb-4">Ce qui est Inclus</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {activity.included.map((item: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Full Program */}
            {activity.program.length > 0 && (
              <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
                <h3 className="text-2xl font-semibold mb-6">Programme Complet</h3>
                <div className="space-y-6">
                  {activity.program.map((day: ProgramDay, index: number) => (
                    <div key={index} className="border border-border/50 rounded-xl bg-card/40 overflow-hidden">
                      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-4 border-b border-border/30">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-primary uppercase tracking-wide">{day.day}</p>
                            <h4 className="text-lg font-bold text-foreground mt-1">{day.title}</h4>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span className="font-medium">{day.distance}</span>
                          </div>
                        </div>
                      </div>
                      <div className="px-6 py-4 space-y-3">
                        {day.details.map((detail: string, detailIndex: number) => (
                          <div key={detailIndex} className="flex items-start space-x-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <p className="text-sm text-foreground leading-relaxed">{detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Not Included */}
            {activity.notIncluded.length > 0 && (
              <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
                <h3 className="text-2xl font-semibold mb-4">Ce qui n'est pas Inclus</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {activity.notIncluded.map((item: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <X className="h-5 w-5 text-destructive mr-3 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Practical Info */}
            {activity.practicalInfo.length > 0 && (
              <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
                <h3 className="text-2xl font-semibold mb-4">Infos Pratiques</h3>
                <div className="space-y-3">
                  {activity.practicalInfo.map((info: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                      <span>{info}</span>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Map Section */}
            <motion.section
              className="bg-gradient-to-br from-card/50 to-muted/20 rounded-2xl p-8 border border-border/50"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <h3 className="text-2xl font-bold mb-3 text-foreground">Trouvez-Nous à Marrakech</h3>
                <p className="text-muted-foreground">
                  Votre aventure commence au cœur de la ville la plus dynamique du Maroc
                </p>
              </motion.div>
              
              <div className="relative rounded-xl overflow-hidden shadow-xl mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.0!2d-7.9696898!3d31.6803207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDQwJzQ5LjIiTiA3wrA1OCcxMC45Ilc!5e0!3m2!1sen!2sma!4v1700000000000!5m2!1sen!2sma"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Raid Atlas - Siège de l'Aventure à Marrakech"
                  className="w-full"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">Siège Raid Atlas</p>
                      <p className="text-xs text-muted-foreground">Marrakech, Maroc</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2 justify-center sm:justify-start">
                  <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>45 min vers l'Atlas</span>
                </div>
                <div className="flex items-center space-x-2 justify-center sm:justify-start">
                  <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>3h vers le Sahara</span>
                </div>
                <div className="flex items-center space-x-2 justify-center sm:justify-start">
                  <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>15 min de l'aéroport</span>
                </div>
              </div>
            </motion.section>

            {/* Gallery */}
            <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
              <h3 className="text-2xl font-semibold mb-6">Galerie</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {activity.gallery.map((imgSrc: string, index: number) => (
                  <div
                    key={index}
                    className="relative w-full h-32 md:h-40 cursor-zoom-in"
                    role="button"
                    tabIndex={0}
                    onClick={() => setLightboxIndex(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setLightboxIndex(index)
                    }}
                  >
                    <Image
                      src={imgSrc}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover rounded-lg hover:scale-105 transition-transform"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Lightbox Dialog for Activity Gallery */}
            <Dialog open={lightboxIndex !== null} onOpenChange={(open) => { if (!open) setLightboxIndex(null) }}>
              <DialogContent fullScreen showCloseButton={false} className="bg-black/95 border-none shadow-none rounded-none p-0">
                <div className="relative w-full h-full grid place-items-center">
                  {/* Close button */}
                  <button
                    type="button"
                    aria-label="Fermer l'image"
                    onClick={() => setLightboxIndex(null)}
                    className="absolute z-50 top-6 right-6 inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 text-white hover:bg-white/20 transition-colors p-2 md:p-3"
                  >
                    <X className="h-6 w-6 md:h-7 md:w-7" />
                  </button>
                  {/* Prev/Next controls */}
                  {lightboxIndex !== null && activity.gallery.length > 1 && (
                    <>
                      <button
                        type="button"
                        aria-label="Image précédente"
                        onClick={() => setLightboxIndex((i) => (i === null ? i : (i + activity.gallery.length - 1) % activity.gallery.length))}
                        className="absolute  z-50 left-6 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 text-white hover:bg-white/20 transition-colors p-2 md:p-3"
                      >
                        <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" />
                      </button>
                      <button
                        type="button"
                        aria-label="Image suivante"
                        onClick={() => setLightboxIndex((i) => (i === null ? i : (i + 1) % activity.gallery.length))}
                        className="absolute z-50 right-6 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 text-white hover:bg-white/20 transition-colors p-2 md:p-3"
                      >
                        <ChevronRight className="h-6 w-6 md:h-7 md:w-7" />
                      </button>
                    </>
                  )}
                  {/* Image wrapper sized responsively to viewport; stop propagation to avoid backdrop click closing */}
                  <div className="relative w-[92vw] h-[88vh] max-w-7xl" onClick={(e) => e.stopPropagation()}>
                    {lightboxIndex !== null && (
                      <Image
                        src={activity.gallery[lightboxIndex]}
                        alt={`Gallery image ${lightboxIndex + 1}`}
                        fill
                        className="object-contain"
                        priority
                      />
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Reviews */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
              <ActivityReviews activityId={activity.id} />
            </motion.div>

            {/* FAQ */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
              <ActivityFAQ activityId={activity.id} />
            </motion.div>
          </div>

          {/* Booking Sidebar */}
          <div className="order-1 lg:order-2 lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <span className="text-3xl font-bold text-primary">{activity.price}</span>
                    {/* <span className="text-muted-foreground ml-2">par personne</span> */}
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Durée :</span>
                      <span className="font-medium">{activity.duration}</span>
                    </div>
                    {activity.type && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type :</span>
                        <span className="font-medium">{activity.type}</span>
                      </div>
                    )}
                    {activity.difficulty && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Difficulté :</span>
                        <span className="font-medium">{activity.difficulty}</span>
                      </div>
                    )}
                    {activity.rating && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Note :</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-medium">{activity.rating}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <ActivityBookingForm activity={{
                    id: activity.id,
                    slug: activity.slug,
                    title: activity.title,
                    duration: activity.duration,
                    price: activity.price,
                  }} />
                </CardContent>
              </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <StickyButtons />
    </div>
  )
}
