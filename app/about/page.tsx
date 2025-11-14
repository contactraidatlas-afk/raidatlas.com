"use client"
import { Navigation } from "@/components/navigation"
import { StickyButtons } from "@/components/sticky-buttons"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Heart, 
  Shield, 
  Users, 
  Award, 
  Mountain, 
  Compass, 
  Star, 
  MapPin, 
  Clock, 
  Trophy,
  Target,
  Zap,
  Globe
} from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Enhanced Hero Section */}
      <motion.section
        className="relative py-32 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/15 overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
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
              <Mountain className="h-4 w-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Notre Histoire</span>
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            À Propos de Raid Atlas
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            La première entreprise d'aventure sportive du Maroc, dédiée à offrir des expériences en plein air extraordinaires 
            qui mettent en valeur la beauté à couper le souffle des montagnes de l'Atlas et du désert du Sahara. Chaque aventure est 
            conçue avec passion, précision et un engagement inébranlable envers votre sécurité et satisfaction.
          </motion.p>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {[
              { number: "10,000+", label: "Aventuriers Heureux", icon: Users },
              { number: "500+", label: "Aventures Complétées", icon: Mountain },
              { number: "4.9/5", label: "Note Moyenne", icon: Star },
              { number: "6", label: "Années d'Expérience", icon: Award }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">{stat.number}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Story Section */}
      <motion.section
        className="py-20 bg-gradient-to-br from-background to-muted/10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Compass className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Notre Parcours</h2>
              </div>
              
              <div className="space-y-6 text-lg leading-relaxed">
                <p className="text-muted-foreground">
                  Née d'une passion pour les paysages extraordinaires du Maroc, Raid Atlas a commencé comme une vision de partager 
                  la beauté brute et les aventures palpitantes que notre terre natale offre. Basée au cœur de Marrakech, 
                  notre équipe de spécialistes locaux en aventure apporte des décennies d'expérience combinée dans les sports de plein air et le tourisme.
                </p>
                <p className="text-muted-foreground">
                  Ce qui a commencé par de petites expéditions en groupe s'est transformé en l'entreprise d'aventure sportive la plus fiable du Maroc. 
                  Nous avons guidé des milliers d'aventuriers à travers les montagnes de l'Atlas, à travers les dunes du désert, et dans 
                  des expériences qui transforment les perspectives et créent des souvenirs durables.
                </p>
                <p className="text-foreground font-medium">
                  Chaque aventure que nous créons reflète notre profonde connexion à cette terre et notre engagement à partager 
                  ses merveilles de manière responsable et authentique.
                </p>
              </div>

              {/* Mission Points */}
              <div className="mt-8 space-y-4">
                {[
                  { icon: Target, text: "Aventures marocaines authentiques menées par des experts locaux" },
                  { icon: Shield, text: "Normes de sécurité inébranlables et équipement professionnel" },
                  { icon: Heart, text: "Soutenir les communautés locales par le tourisme durable" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/Slides/DSC_4782.jpg"
                  alt="Raid Atlas - La première entreprise d'aventure du Maroc"
                  width={600}
                  height={500}
                  className="w-full h-96 object-cover"
                  loading="lazy"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <Badge className="absolute top-6 left-6 bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-2 text-sm font-medium shadow-lg">
                  Depuis 2018
                </Badge>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-lg font-semibold mb-1">Montagnes de l'Atlas</p>
                  <p className="text-sm opacity-90">Où chaque aventure commence</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Enhanced Services Section */}
      <motion.section
        className="py-20 bg-gradient-to-br from-card/50 to-muted/20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary rounded-full px-6 py-2 mb-6">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Nos Aventures</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
              Expériences Exceptionnelles
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des aventures palpitantes aux immersions culturelles, nous offrons des expériences diverses 
              qui mettent en valeur la diversité incroyable du Maroc.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Mountain,
                title: "Expéditions Montagneuses",
                description: "Treks multi-jours et aventures d'une journée à travers les plus hauts sommets du Maroc",
                color: "primary"
              },
              {
                icon: Globe,
                title: "Raids Désertiques & Safaris",
                description: "Quad, buggy et expéditions en chameau à travers les dunes dorées",
                color: "secondary"
              },
              {
                icon: Users,
                title: "Immersions Culturelles",
                description: "Expériences berbères authentiques avec musique et cuisine traditionnelles",
                color: "accent"
              },
              {
                icon: Trophy,
                title: "Aventures Luxe",
                description: "Expériences premium avec camps de luxe et cuisine gastronomique",
                color: "primary"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="group h-full hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-border/50 hover:border-primary/30 bg-background/80 backdrop-blur-sm hover:-translate-y-2">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 bg-${service.color}/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500`}>
                      <service.icon className={`h-8 w-8 text-${service.color}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Enhanced Call to Action */}
      <motion.section
        className="py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 relative overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-16 right-16 w-32 h-32 border border-primary/30 rounded-full animate-pulse"></div>
          <div className="absolute bottom-24 left-24 w-24 h-24 border border-secondary/30 rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Votre Aventure Vous Attend
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Que vous recherchiez des sensations fortes, des découvertes culturelles ou des échappées paisibles, 
              les montagnes de l'Atlas et le désert du Sahara du Maroc offrent le décor parfait pour des aventures inoubliables.
            </p>
            <p className="text-lg font-medium text-foreground mb-10">
              Rejoignez des milliers d'aventuriers qui ont découvert la magie du Maroc avec Raid Atlas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="px-8 py-6 text-lg bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="/activities">
                  Explorer les Aventures
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="px-8 py-6 text-lg border-primary/20 hover:border-primary hover:bg-primary/5"
                asChild
              >
                <Link href="/contact">
                  Planifiez Votre Voyage
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <StickyButtons />
    </div>
  )
}
