"use client"
import { Navigation } from "@/components/navigation"
import { StickyButtons } from "@/components/sticky-buttons"
import { ActivityCard } from "@/components/activity-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Users, Clock, MapPin, Filter } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import allActivities from "@/data/activities.json"

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
  highlights: string[]
  featured?: boolean
}

const fallbackActivityImages = [
  "/Agafay/DSC_5016.jpg",
  "/Agafay/DSC_5070.jpg",
  "/Agafay/DSC_5115.jpg",
  "/Agafay/DSC_4782.jpg",
  "/Agafay/DSC_4720.jpg",
  "/Agafay/DSC_4804.jpg",
]

export default function ActivitiesPage() {
    const [selectedFilter, setSelectedFilter] = useState("all")
    
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
      highlights: a.highlights ?? [],
      featured: a.featured ?? false,
    }))

    const filteredActivities = selectedFilter === "all" 
      ? activitiesData 
      : selectedFilter === "featured" 
      ? activitiesData.filter(a => a.featured)
      : activitiesData

    return (
		<div className="min-h-screen">
			<Navigation />

			{/* Enhanced Hero Section */}
			<motion.section 
				className="relative py-32 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/15 overflow-hidden"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
			>
				{/* Background Pattern */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute top-20 left-20 w-40 h-40 border border-primary/30 rounded-full animate-pulse"></div>
					<div className="absolute bottom-32 right-32 w-32 h-32 border border-secondary/30 rounded-full animate-pulse delay-1000"></div>
					<div className="absolute top-1/2 left-10 w-24 h-24 border border-accent/30 rounded-full animate-pulse delay-500"></div>
				</div>

				<div className="container mx-auto px-4 text-center relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.8 }}
					>
						<div className="inline-flex items-center space-x-2 bg-primary/10 text-primary rounded-full px-6 py-2 mb-8">
							<div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
							<span className="text-sm font-medium uppercase tracking-wider">Toutes les Aventures</span>
						</div>
					</motion.div>
					
					<motion.h1 
						className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5, duration: 0.8 }}
					>
						Aventures de l'Atlas
					</motion.h1>
					
					<motion.p 
						className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.7, duration: 0.8 }}
					>
						Découvrez les paysages les plus spectaculaires du Maroc à travers nos expériences d'aventure premium. 
						Des expéditions en montagne de l'Atlas aux raids désertiques, chaque voyage est conçu pour un maximum de sensations fortes et de sécurité.
					</motion.p>

					{/* Stats */}
					<motion.div 
						className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mt-12 text-muted-foreground"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1, duration: 0.8 }}
					>
						<div className="flex items-center space-x-2">
							<Star className="h-5 w-5 text-yellow-500 fill-current" />
							<span className="font-medium">4.9/5 Note Moyenne</span>
						</div>
						<div className="hidden sm:block w-px h-4 bg-border"></div>
						<div className="flex items-center space-x-2">
							<Users className="h-5 w-5 text-primary" />
							<span className="font-medium">10 000+ Aventuriers Heureux</span>
						</div>
						<div className="hidden sm:block w-px h-4 bg-border"></div>
						<div className="flex items-center space-x-2">
							<MapPin className="h-5 w-5 text-primary" />
							<span className="font-medium">Premier Fournisseur du Maroc</span>
						</div>
					</motion.div>
				</div>
			</motion.section>
			{/* Filter Section */}
			<section className="py-8 bg-muted/30">
				<div className="container mx-auto px-4">
					<motion.div 
						className="flex flex-col sm:flex-row items-center justify-between gap-6"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<div className="flex items-center space-x-2">
							<Filter className="h-5 w-5 text-muted-foreground" />
							<span className="text-sm font-medium text-muted-foreground">Filtrer les Aventures :</span>
						</div>
						<div className="flex items-center space-x-3">
							{[
								{ id: "all", label: "Toutes les Aventures", count: activitiesData.length },
								{ id: "featured", label: "En Vedette", count: activitiesData.filter(a => a.featured).length },
							].map((filter) => (
								<Button
									key={filter.id}
									variant={selectedFilter === filter.id ? "default" : "outline"}
									size="sm"
									onClick={() => setSelectedFilter(filter.id)}
									className={`transition-all duration-300 ${
										selectedFilter === filter.id 
											? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg" 
											: "hover:bg-primary/5 hover:border-primary/20"
									}`}
								>
									{filter.label}
									<Badge variant="secondary" className="ml-2 text-xs">
										{filter.count}
									</Badge>
								</Button>
							))}
						</div>
					</motion.div>
				</div>
			</section>

			{/* Enhanced Activities Grid */}
			<section className="py-20 bg-gradient-to-br from-background to-muted/10">
				<div className="container mx-auto px-4">
					<motion.div 
						className="text-center mb-16"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						<h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
							Choisissez Votre Aventure
						</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							Chaque expérience est soigneusement conçue pour mettre en valeur la beauté naturelle du Maroc tout en assurant votre sécurité et votre plaisir.
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{filteredActivities.map((activity: Activity, index: number) => (
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

					{/* No Results Message */}
					{filteredActivities.length === 0 && (
						<motion.div 
							className="text-center py-16"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5 }}
						>
							<div className="max-w-md mx-auto">
								<div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
									<MapPin className="h-8 w-8 text-muted-foreground" />
								</div>
								<h3 className="text-xl font-semibold mb-2">Aucune Aventure Trouvée</h3>
								<p className="text-muted-foreground mb-6">
									Essayez d'ajuster vos filtres pour découvrir d'autres expériences incroyables.
								</p>
								<Button onClick={() => setSelectedFilter("all")} variant="outline">
									Afficher Toutes les Aventures
								</Button>
							</div>
						</motion.div>
					)}
				</div>
			</section>

				<StickyButtons />
			</div>
		)
	}
