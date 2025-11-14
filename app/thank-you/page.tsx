"use client"
import { Navigation } from "@/components/navigation"
import { StickyButtons } from "@/components/sticky-buttons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  CheckCircle, 
  Calendar, 
  Mail, 
  MessageCircle, 
  Home, 
  Shield, 
  Clock, 
  MapPin,
  Star,
  Phone,
  Mountain,
  Award,
  Users
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function BookingConfirmationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-card/20">
      <Navigation />

      <motion.div 
        className="container mx-auto px-4 py-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Enhanced Success Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="relative inline-block mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur opacity-75 animate-pulse"></div>
            </div>
            
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 mb-6">
              <Mountain className="h-4 w-4 mr-2" />
              Aventure Confirmée
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
              Votre Aventure Vous Attend !
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Merci d'avoir choisi Raid Atlas ! Votre demande de réservation a été reçue et nos spécialistes en aventure 
              préparent déjà votre expédition marocaine extraordinaire.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Confirmation Card */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <Card className="border-primary/20 shadow-2xl bg-background/80 backdrop-blur-sm">
                <CardContent className="p-8 lg:p-12">
                  {/* What Happens Next */}
                  <div className="mb-10">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold text-foreground">Chronologie de Votre Aventure</h2>
                    </div>
                    
                    <div className="space-y-6">
                      {[
                        {
                          icon: Mail,
                          title: "Confirmation Email Instantanée",
                          description: "Confirmation de réservation détaillée avec itinéraire d'aventure envoyée dans les 15 minutes",
                          time: "Dans les 15 minutes",
                          color: "primary"
                        },
                        {
                          icon: Phone,
                          title: "Appel de Consultation Personnel",
                          description: "Notre spécialiste en aventure vous contactera pour finaliser les détails et répondre aux questions",
                          time: "Dans les 2 heures",
                          color: "secondary"
                        },
                        {
                          icon: MapPin,
                          title: "Briefing Pré-Aventure",
                          description: "Lieu de prise en charge, liste de préparation et mises à jour météorologiques livrés",
                          time: "24 heures avant",
                          color: "accent"
                        }
                      ].map((step, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start space-x-4 p-4 rounded-lg bg-gradient-to-r from-card/50 to-muted/20 border border-border/30"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                        >
                          <div className={`w-12 h-12 bg-${step.color}/10 rounded-full flex items-center justify-center flex-shrink-0`}>
                            <step.icon className={`h-6 w-6 text-${step.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-foreground">{step.title}</h3>
                              <Badge variant="secondary" className="text-xs">
                                {step.time}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Important Information */}
                  <motion.div 
                    className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-xl border border-primary/10 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <Shield className="h-6 w-6 text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">Garantie d'Aventure</h3>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                      {[
                        "Annulation gratuite jusqu'à 24 heures",
                        "Prise en charge à l'hôtel depuis Marrakech incluse",
                        "Équipement professionnel et assurance",
                        "Garantie météorologique - nous reprogrammons si dangereux",
                        "Guides locaux experts certifiés",
                        "Support d'urgence 24h/24, 7j/7 inclus"
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                  >
                    <Button 
                      size="lg" 
                      className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-primary/25 transition-all duration-300"
                      asChild
                    >
                      <Link href="/">
                        <Home className="mr-2 h-5 w-5" />
                        Retour à l'Accueil
                      </Link>
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="flex-1 border-primary/20 hover:border-primary hover:bg-primary/5"
                      asChild
                    >
                      <Link href="/activities">
                        <Mountain className="mr-2 h-5 w-5" />
                        Plus d'Aventures
                      </Link>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sidebar */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {/* Contact Card */}
              <Card className="border-border/50 bg-background/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <MessageCircle className="h-6 w-6 text-primary" />
                    <h3 className="text-lg font-semibold">Besoin d'Aide ?</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Nos spécialistes en aventure sont prêts à vous aider pour toute question.
                  </p>
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white"
                      asChild
                    >
                      <a href="https://wa.me/+212601921044" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Chat WhatsApp
                      </a>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      asChild
                    >
                      <a href="tel:+212601921044">
                        <Phone className="mr-2 h-4 w-4" />
                        Appeler +212 601 921 044
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Indicators */}
              <Card className="border-border/50 bg-background/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Award className="h-5 w-5 text-primary mr-2" />
                    Pourquoi Raid Atlas ?
                  </h3>
                  <div className="space-y-4">
                    {[
                      { icon: Star, title: "Note 4.9/5", subtitle: "Plus de 1 000 avis" },
                      { icon: Users, title: "10 000+ Aventuriers", subtitle: "Guidés avec succès" },
                      { icon: Shield, title: "Agréé et Assuré", subtitle: "Protection complète" },
                      { icon: Clock, title: "6 Ans d'Expérience", subtitle: "Tourisme d'aventure" }
                    ].map((trust, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <trust.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{trust.title}</p>
                          <p className="text-xs text-muted-foreground">{trust.subtitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <StickyButtons />
    </div>
  )
}
