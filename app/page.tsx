"use client"

import { Navigation } from "@/components/navigation"
import { StickyButtons } from "@/components/sticky-buttons"
import { ActivityCard } from "@/components/activity-card"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Shield, Clock, Gift, Users, X, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import allActivities from "@/data/activities.json"
import { Dialog, DialogContent } from "@/components/ui/dialog"

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

const heroImages = [
	{
		src: "/Slides/1.png",
		alt: "Raid Atlas Quad Biking Adventure",
	},
	{
		src: "/Slides/2.png",
		alt: "Sunset Desert Adventure",
	},
	{
		src: "/Slides/3.png",
		alt: "Group Desert Adventure",
	},
]


const fallbackActivityImages = [
	"/Slides/1.png",
	"/Buggy/3days/1.jpg",
	"/Buggy/5days/1.jpg",
	"/Quad/2days/3.jpg",
	"/Quad/4days/3.jpg",
	"/Quad/5days/3.jpg",
]

export default function HomePage() {
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
		}, 5000) // Change image every 5 seconds

		return () => clearInterval(interval)
	}, [])

	// Gallery images reused for thumbnails and lightbox
	const homeGalleryImages = [
		{
			title: "Raid Quad 1 Jour - Aventure Désertique",
			srcImage: "/Quad/1day/1.jpg",
		},
		{
			title: "Raid Quad 2 Jours - Plateau du Kik",
			srcImage: "/Quad/2days/2.jpg",
		},
		{
			title: "Raid Quad 3 Jours - Vallée de N'fis",
			srcImage: "/Quad/3days/2.jpg",
		},
		{
			title: "Raid Buggy 1 Jour - Agafay Désert",
			srcImage: "/Buggy/1day/1.jpg",
		},
		{
			title: "Raid Buggy 2 Jours - Montagnes Atlas",
			srcImage: "/Buggy/2days/1.jpg",
		},
		{
			title: "Raid Buggy 3 Jours - Expérience Complète",
			srcImage: "/Buggy/3days/1.jpg",
		},
		{
			title: "Raid Quad 4 Jours - Immersion Totale",
			srcImage: "/Quad/4days/2.jpg",
		},
		{
			title: "Raid Buggy 5 Jours - Grand Adventure",
			srcImage: "/Buggy/5days/1.jpg",
		},
	]

	// Keyboard navigation in lightbox
	useEffect(() => {
		if (lightboxIndex === null) return
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setLightboxIndex(null)
			if (e.key === "ArrowLeft") setLightboxIndex((i) => (i === null ? i : (i + homeGalleryImages.length - 1) % homeGalleryImages.length))
			if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? i : (i + 1) % homeGalleryImages.length))
		}
		window.addEventListener("keydown", onKey)
		return () => window.removeEventListener("keydown", onKey)
	}, [lightboxIndex])

	const activitiesData: Activity[] = (allActivities as any[]).map((a: any, idx: number) => ({
		id: a.id,
		slug: a.slug ?? a.id,
		title: a.title,
		shortDescription: a.shortDescription,
		price: a.price,
		duration: a.duration,
		rating: a.rating,
		reviewCount: a.reviewCount,
		srcImage: (a as any).srcImage ?? fallbackActivityImages[idx % fallbackActivityImages.length],
		heroImage: a.title,
		featured: (a as any).featured ?? idx < 3,
	}))
	const majorActivities = activitiesData.slice(0, 4) // First 4 activities
	const otherActivities = activitiesData.slice(-4) // Last 4 activities

	return (
		<div className="min-h-screen">
			<Navigation />

			{/* Hero Section with entrance animation */}
			<motion.section
				className="relative h-screen flex items-center justify-center bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 overflow-hidden"
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1.2 }}
			>
				{/* Enhanced Overlay */}
				<div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10" />
				
				{/* Animated Background Pattern */}
				<div className="absolute inset-0 opacity-10 z-5">
					<div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
					<div className="absolute bottom-32 right-32 w-24 h-24 border border-white/20 rounded-full animate-pulse delay-1000"></div>
					<div className="absolute top-1/2 left-10 w-16 h-16 border border-white/20 rounded-full animate-pulse delay-500"></div>
				</div>

				{/* Hero Images */}
				<div className="absolute inset-0">
					{heroImages.map((image, index) => (
						<Image
							key={index}
							src={image.src || "/placeholder.svg"}
							alt={image.alt}
							fill
							sizes="100vw"
							quality={95}
							className={`absolute inset-0 w-full h-full object-cover transition-all duration-1500 ease-in-out ${index === currentImageIndex
								? "opacity-100 scale-100"
								: "opacity-0 scale-110"
								}`}
							priority={index === 0}
						/>
					))}
				</div>

				{/* Enhanced Image Navigation */}
				<div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
					{heroImages.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentImageIndex(index)}
							className={`relative transition-all duration-500 ${index === currentImageIndex
								? "w-12 h-3 bg-white rounded-full scale-110"
								: "w-3 h-3 bg-white/60 hover:bg-white/80 rounded-full"
								}`}
						/>
					))}
				</div>

				{/* Hero Content */}
				<motion.div
					className="relative z-20 text-center text-white max-w-6xl mx-auto px-4"
					initial={{ opacity: 0, y: 60 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.7, duration: 1.2 }}
				>
					{/* Brand Badge */}
					<motion.div 
						className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 1, duration: 0.8 }}
					>
						<div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
						<span className="text-sm font-medium tracking-wider uppercase">Première Compagnie d'Aventure du Maroc</span>
					</motion.div>

					{/* Main Heading */}
					<motion.h1 
						className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-6 text-balance leading-tight"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1.2, duration: 1 }}
					>
						<span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
							RAID ATLAS
						</span>
						<br />
						<span className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white/90">
							L'Aventure Vous Attend
						</span>
					</motion.h1>

					{/* Subtitle */}
					<motion.p 
						className="text-lg sm:text-xl lg:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1.4, duration: 1 }}
					>
						Conquérez les paysages les plus spectaculaires du Maroc avec des aventures de plein air premium. 
						Des expéditions dans l'Atlas aux raids dans le désert - votre aventure ultime commence ici.
					</motion.p>

					{/* CTA Buttons */}
					<motion.div 
						className="flex flex-col sm:flex-row gap-6 justify-center items-center"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1.6, duration: 1 }}
					>
						<Button 
							size="lg" 
							className="text-lg px-10 py-6 bg-primary hover:bg-primary/90 text-white shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 border-0"
							asChild
						>
							<Link href="/activities">
								Explorer les Aventures
								<svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
								</svg>
							</Link>
						</Button>
						
						<Button
							size="lg"
							variant="outline"
							className="text-lg px-10 py-6 bg-[#25D366] hover:bg-[#1DA851] text-white border-[#25D366] hover:border-[#1DA851] shadow-2xl hover:shadow-[#25D366]/25 transition-all duration-300 hover:scale-105"
							asChild
						>
							<Link href="https://wa.me/+212601921044">
								<svg className="mr-3 h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
									<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.669.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.003a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.86 9.86 0 016.993 2.897 9.825 9.825 0 012.894 6.994c-.003 5.45-4.437 9.884-9.889 9.884M20.52 3.45A11.815 11.815 0 0012.046 0C5.495 0 .16 5.335.157 11.887c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.865 11.865 0 005.683 1.448h.005c6.551 0 11.887-5.335 11.90-11.887A11.821 11.821 0 0020.52 3.45z" />
								</svg>
								Discuter sur WhatsApp
							</Link>
						</Button>
					</motion.div>

					{/* Trust Indicators */}
					<motion.div 
						className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mt-12 text-white/80"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 2, duration: 1 }}
					>
						<div className="flex items-center space-x-2">
							<Star className="h-5 w-5 text-yellow-400 fill-current" />
							<span className="text-sm font-medium">4.9/5 Customer Rating</span>
						</div>
						<div className="hidden sm:block w-px h-4 bg-white/30"></div>
						<div className="flex items-center space-x-2">
							<Shield className="h-5 w-5 text-primary" />
							<span className="text-sm font-medium">Licensed & Insured</span>
						</div>
						<div className="hidden sm:block w-px h-4 bg-white/30"></div>
						<div className="flex items-center space-x-2">
							<Clock className="h-5 w-5 text-primary" />
							<span className="text-sm font-medium">24/7 Support</span>
						</div>
					</motion.div>
				</motion.div>
			</motion.section>
			{/* Lightbox Dialog for Gallery Images */}
			{/* Enhanced Lightbox Dialog */}
			<Dialog open={lightboxIndex !== null} onOpenChange={(open) => { if (!open) setLightboxIndex(null) }}>
				<DialogContent fullScreen showCloseButton={false} className="bg-gradient-to-br from-black/90 via-black/95 to-black/90 border-none shadow-none rounded-none p-0 backdrop-blur-sm">
					<div className="relative w-full h-full grid place-items-center">
						{/* Enhanced Close Button */}
						<button
							type="button"
							aria-label="Close gallery"
							onClick={() => setLightboxIndex(null)}
							className="absolute z-50 top-4 right-4 md:top-6 md:right-6 inline-flex items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white hover:bg-black/60 hover:border-white/40 transition-all duration-300 p-3 md:p-4 group"
						>
							<X className="h-5 w-5 md:h-6 md:w-6 group-hover:rotate-90 transition-transform duration-300" />
						</button>

						{/* Enhanced Navigation Buttons */}
						{lightboxIndex !== null && (
							<>
								<button
									type="button"
									aria-label="Previous image"
									onClick={() => setLightboxIndex((i) => (i === null ? i : (i + homeGalleryImages.length - 1) % homeGalleryImages.length))}
									className="absolute z-50 left-4 md:left-6 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white hover:bg-black/60 hover:border-white/40 transition-all duration-300 p-3 md:p-4 group hover:scale-110"
								>
									<ChevronLeft className="h-6 w-6 md:h-7 md:w-7 group-hover:-translate-x-1 transition-transform duration-300" />
								</button>
								<button
									type="button"
									aria-label="Next image"
									onClick={() => setLightboxIndex((i) => (i === null ? i : (i + 1) % homeGalleryImages.length))}
									className="absolute z-50 right-4 md:right-6 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white hover:bg-black/60 hover:border-white/40 transition-all duration-300 p-3 md:p-4 group hover:scale-110"
								>
									<ChevronRight className="h-6 w-6 md:h-7 md:w-7 group-hover:translate-x-1 transition-transform duration-300" />
								</button>
							</>
						)}

						{/* Image Counter */}
						{lightboxIndex !== null && (
							<div className="absolute z-50 bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
								{lightboxIndex + 1} / {homeGalleryImages.length}
							</div>
						)}

						{/* Enhanced Image Container */}
						<div className="relative w-[90vw] h-[85vh] max-w-6xl" onClick={(e) => e.stopPropagation()}>
							{lightboxIndex !== null && (
								<>
									<Image
										src={homeGalleryImages[lightboxIndex]?.srcImage}
										alt={homeGalleryImages[lightboxIndex]?.title || "Raid Atlas Adventure Gallery"}
										fill
										className="object-contain rounded-lg shadow-2xl"
										priority
									/>
									{/* Image Title Overlay */}
									<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
										<h3 className="text-white text-lg font-semibold mb-1">
											{homeGalleryImages[lightboxIndex]?.title || "Raid Atlas Adventure"}
										</h3>
										<p className="text-white/80 text-sm">
											Experience Morocco's most spectacular landscapes
										</p>
									</div>
								</>
							)}
						</div>
					</div>
				</DialogContent>
			</Dialog>
			{/* Enhanced Why Choose Raid Atlas Section */}
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.2 }}
				transition={{ duration: 0.8 }}
			>
				<section className="py-20 bg-gradient-to-br from-card/50 to-muted/30 relative overflow-hidden">
					{/* Background Pattern */}
					<div className="absolute inset-0 opacity-5">
						<div className="absolute top-10 left-10 w-32 h-32 border border-primary/20 rounded-full"></div>
						<div className="absolute bottom-20 right-20 w-24 h-24 border border-secondary/20 rounded-full"></div>
						<div className="absolute top-1/2 right-10 w-16 h-16 border border-accent/20 rounded-full"></div>
					</div>

					<div className="container mx-auto px-4 relative z-10">
						{/* Enhanced Header */}
						<motion.div 
							className="text-center mb-16"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2, duration: 0.8 }}
						>
							<div className="inline-flex items-center space-x-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-6">
								<Star className="h-4 w-4 fill-current" />
								<span className="text-sm font-medium uppercase tracking-wider">Expérience d'Aventure Premium</span>
							</div>
							<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
								Pourquoi Choisir Raid Atlas
							</h2>
							<p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
								La compagnie de sports d'aventure leader du Maroc, offrant des expériences de plein air exceptionnelles 
								avec un professionnalisme et des standards de sécurité inégalés.
							</p>
						</motion.div>

						{/* Enhanced Feature Grid */}
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
							{[
								{
									icon: Shield,
									title: "Qualité Premium",
									description: "Guides professionnels, équipement haut de gamme et aventures méticuleusement planifiées garantissent votre sécurité et satisfaction.",
									delay: 0.1
								},
								{
									icon: Clock,
									title: "Support 24h/7j",
									description: "Assistance 24h/24 et support d'urgence. Nous sommes là quand vous en avez besoin, jour et nuit.",
									delay: 0.2
								},
								{
									icon: Gift,
									title: "Réservation Flexible",
									description: "Annulation gratuite jusqu'à 24 heures avant votre aventure. Les plans changent, et nous le comprenons.",
									delay: 0.3
								},
								{
									icon: Star,
									title: "Satisfaction Garantie",
									description: "Notre note de 4,9/5 parle d'elle-même. Votre expérience d'aventure est notre priorité absolue.",
									delay: 0.4
								}
							].map((feature, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: feature.delay, duration: 0.8 }}
								>
									<Card className="group overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col h-full border-border/50 hover:border-primary/20 bg-background/80 backdrop-blur-sm">
										<CardContent className="p-8 flex flex-col items-center text-center relative">
											{/* Enhanced Icon */}
											<div className="relative mb-6">
												<div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary grid place-items-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
													<feature.icon className="h-8 w-8" />
												</div>
												<div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
											</div>

											{/* Content */}
											<h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
												{feature.title}
											</h3>
											<p className="text-muted-foreground leading-relaxed text-sm group-hover:text-foreground/80 transition-colors duration-300">
												{feature.description}
											</p>

											{/* Hover Effect */}
											<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>

						{/* Call to Action */}
						<motion.div 
							className="text-center mt-16"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.6, duration: 0.8 }}
						>
							<p className="text-muted-foreground mb-6 text-lg">
								Prêt à vivre les aventures les plus palpitantes du Maroc ?
							</p>
							<Button 
								size="lg" 
								className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
								asChild
							>
								<Link href="/activities">
									Commencer Votre Aventure
									<svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
									</svg>
								</Link>
							</Button>
						</motion.div>
					</div>
				</section>
			</motion.div>
			{/* Featured Atlas Adventures QUAD */}
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.2 }}
				transition={{ duration: 0.8 }}
			>
				<section className="py-20 bg-gradient-to-br from-background via-card/30 to-muted/20 relative overflow-hidden">
					{/* Background Elements */}
					<div className="absolute inset-0 opacity-5">
						<div className="absolute top-20 left-20 w-40 h-40 border border-primary/30 rounded-full animate-pulse"></div>
						<div className="absolute bottom-32 right-32 w-32 h-32 border border-secondary/30 rounded-full animate-pulse delay-1000"></div>
					</div>

					<div className="container mx-auto px-4 relative z-10">
						{/* Enhanced Header */}
						<motion.div 
							className="text-center mb-16"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2, duration: 0.8 }}
						>
							<div className="inline-flex items-center space-x-2 bg-primary/10 text-primary rounded-full px-6 py-2 mb-6">
								<div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
								<span className="text-sm font-medium uppercase tracking-wider">Aventures Vedettes</span>
							</div>
							<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
								Expéditions Montagnes de l'Atlas quad
							</h2>
							<p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
								Conquérez les paysages les plus spectaculaires du Maroc avec nos expériences d'aventure signature. 
								Chaque expédition est conçue pour un maximum de sensations et des souvenirs inoubliables.
							</p>
						</motion.div>

						{/* Enhanced Activity Grid */}
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{majorActivities.map((activity, index) => (
								<motion.div
									key={activity.id}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.1, duration: 0.8 }}
								>
									<ActivityCard activity={activity} index={index} />
								</motion.div>
							))}
						</div>
					</div>
				</section>
			</motion.div>
			{/* Enhanced Must-Try Experiences Buggy */}
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.2 }}
				transition={{ duration: 0.8 }}
			>
				<section className="py-20 bg-gradient-to-br from-muted/20 via-card/50 to-background relative">
					<div className="container mx-auto px-4">
						{/* Enhanced Header */}
						<motion.div 
							className="text-center mb-16"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2, duration: 0.8 }}
						>
							<div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary rounded-full px-6 py-2 mb-6">
								<div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
								<span className="text-sm font-medium uppercase tracking-wider">Découvrir Plus</span>
							</div>
							<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
								Expériences Incontournables Buggy
							</h2>
							<p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
								Élargissez vos horizons d'aventure avec notre collection diversifiée d'activités palpitantes. 
								Des raids dans le désert aux conquêtes de montagne, chaque expérience est inoubliable.
							</p>
						</motion.div>

						{/* Compact Activity Grid */}
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
							{otherActivities.map((activity, index) => (
								<motion.div
									key={activity.id}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.1, duration: 0.6 }}
								>
									<ActivityCard activity={activity} index={index} />
								</motion.div>
							))}
						</div>
					</div>
				</section>
			</motion.div>
			{/* Enhanced Gallery Section */}
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.2 }}
				transition={{ duration: 0.8 }}
			>
				<section className="py-20 bg-gradient-to-br from-background to-muted/10 relative overflow-hidden">
					{/* Background Pattern */}
					<div className="absolute inset-0 opacity-5">
						<div className="absolute top-16 right-16 w-24 h-24 border border-accent/30 rounded-full animate-pulse"></div>
						<div className="absolute bottom-24 left-24 w-32 h-32 border border-primary/20 rounded-full animate-pulse delay-500"></div>
					</div>

					<div className="container mx-auto px-4 relative z-10">
						{/* Enhanced Header */}
						<motion.div 
							className="text-center mb-16"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2, duration: 0.8 }}
						>
							<div className="inline-flex items-center space-x-2 bg-accent/10 text-accent rounded-full px-6 py-2 mb-6">
								<div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
								<span className="text-sm font-medium uppercase tracking-wider">Galerie d'Aventures</span>
							</div>
							<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
								Moments Capturés
							</h2>
							<p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
								Témoin des sensations et de la beauté des paysages marocains à travers les yeux de nos aventuriers. 
								Chaque image raconte une histoire de conquête et de découverte.
							</p>
						</motion.div>

						{/* Enhanced Gallery Grid */}
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
							{homeGalleryImages.map((img, index) => (
								<motion.button
									key={index}
									type="button"
									aria-label={`Open ${img.title || `image ${index + 1}`} in gallery`}
									onClick={() => setLightboxIndex(index)}
									className="group relative overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300 hover:-translate-y-1"
									initial={{ opacity: 0, scale: 0.9 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.05, duration: 0.5 }}
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<div className="relative aspect-video">
										<Image
											src={img.srcImage}
											alt={img.title || `Raid Atlas Adventure ${index + 1}`}
											fill
											className="object-cover transition-all duration-500 group-hover:scale-110"
											loading="lazy"
											quality={85}
										/>
										{/* Enhanced Overlay */}
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
										
										{/* Zoom Icon */}
										<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
											<div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-500">
												<svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
												</svg>
											</div>
										</div>

										{/* Image Title Overlay */}
										{img.title && (
											<div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
												<p className="text-white text-sm font-medium truncate">
													{img.title}
												</p>
											</div>
										)}

										{/* Border Effect */}
										<div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-xl transition-colors duration-500"></div>
									</div>
								</motion.button>
							))}
						</div>

						{/* Gallery CTA */}
						<motion.div 
							className="text-center mt-12"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.6, duration: 0.8 }}
						>
							<p className="text-muted-foreground mb-6">
								Prêt à créer votre propre histoire d'aventure ?
							</p>
							<Button 
								size="lg" 
								variant="outline"
								className="px-8 py-6 text-lg border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300"
								asChild
							>
								<Link href="/activities">
									Voir Toutes les Aventures
									<svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
									</svg>
								</Link>
							</Button>
						</motion.div>
					</div>
				</section>
			</motion.div>
			<StickyButtons />
		</div>
	)
}
