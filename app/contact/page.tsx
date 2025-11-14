"use client"
import { Navigation } from "@/components/navigation"
import { StickyButtons } from "@/components/sticky-buttons"
import { ContactForm } from "@/components/contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Calendar, 
  Star, 
  Shield, 
  Users,
  Headphones,
  Globe,
  Award
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function ContactPage() {
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
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Nous Contacter</span>
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Planifiez Votre Aventure
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Prêt à découvrir les paysages les plus spectaculaires du Maroc ? Nos spécialistes en aventure sont là pour créer 
            l'expédition parfaite adaptée à vos rêves. Des treks en montagne de l'Atlas aux raids du désert du Sahara, 
            rendons votre aventure inoubliable.
          </motion.p>

          {/* Quick Contact Options */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="https://wa.me/+212601921044" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat WhatsApp
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-6 text-lg border-primary/20 hover:border-primary hover:bg-primary/5"
              asChild
            >
              <a href="tel:+212601921044">
                <Phone className="mr-2 h-5 w-5" />
                Appeler Maintenant
              </a>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Contact Methods Section */}
      <motion.section
        className="py-20 bg-gradient-to-br from-background to-muted/10"
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
              <Headphones className="h-4 w-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Plusieurs Façons de Nous Joindre</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
              Contactez Notre Équipe d'Aventure
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nos spécialistes en aventure expérimentés sont prêts à vous aider à planifier l'expédition marocaine parfaite. 
              Choisissez votre façon préférée de nous contacter.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: Phone,
                title: "Appelez-Nous Directement",
                primary: "+212 601 921 044",
                secondary: "Disponible 8h - 20h quotidiennement",
                description: "Parlez directement avec nos spécialistes en aventure",
                action: "tel:+212601921044",
                color: "primary"
              },
              {
                icon: MessageCircle,
                title: "Chat WhatsApp",
                primary: "Réponse Instantanée",
                secondary: "Disponible 24h/24, 7j/7",
                description: "Réponses rapides à vos questions d'aventure",
                action: "https://wa.me/+212601921044",
                color: "secondary"
              },
              {
                icon: Mail,
                title: "Support par Email",
                primary: "contactraidatlas@gmail.com",
                secondary: "Réponse dans les 4 heures",
                description: "Planification détaillée du voyage et informations",
                action: "mailto:contactraidatlas@gmail.com",
                color: "accent"
              },
              {
                icon: Calendar,
                title: "Réserver une Consultation",
                primary: "Appel de Planification Gratuit",
                secondary: "Session de 30 minutes",
                description: "Planification d'aventure personnalisée",
                action: "/activities",
                color: "primary"
              }
            ].map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="group h-full hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-border/50 hover:border-primary/30 bg-background/80 backdrop-blur-sm hover:-translate-y-2">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 bg-${contact.color}/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500`}>
                      <contact.icon className={`h-8 w-8 text-${contact.color}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {contact.title}
                    </h3>
                    <p className="text-lg font-semibold text-foreground mb-2">
                      {contact.primary}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {contact.secondary}
                    </p>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      {contact.description}
                    </p>
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
                      asChild
                    >
                      <a href={contact.action} target={contact.action.startsWith('http') ? '_blank' : undefined}>
                        Se Connecter Maintenant
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Enhanced Contact Form & Info Section */}
      <motion.section
        className="py-20 bg-gradient-to-br from-card/50 to-muted/20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Enhanced Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Siège de l'Aventure</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Situé au cœur de Marrakech, notre équipe de spécialistes en aventure apporte des décennies d'expérience 
                  dans la création d'expéditions marocaines inoubliables. Nous sommes là pour réaliser vos rêves d'aventure.
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {[
                  { icon: Star, title: "Note 4.9/5", subtitle: "De plus de 1 000 avis" },
                  { icon: Shield, title: "Agréé et Assuré", subtitle: "Couverture de protection complète" },
                  { icon: Users, title: "10 000+ Aventuriers", subtitle: "Guidés avec succès" },
                  { icon: Award, title: "6 Ans d'Expérience", subtitle: "En tourisme d'aventure" }
                ].map((trust, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 p-4 bg-background/60 rounded-lg border border-border/30"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <trust.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{trust.title}</p>
                      <p className="text-sm text-muted-foreground">{trust.subtitle}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Location Info */}
              <div className="bg-background/80 rounded-xl p-6 border border-border/30">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Visitez Notre Bureau</h3>
                    <p className="text-muted-foreground mb-2">
                      Marrakech, Maroc
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Porte d'entrée vers les aventures des montagnes de l'Atlas et du désert du Sahara
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Ouvert quotidiennement : 8h00 - 20h00</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="bg-background/80 rounded-2xl p-8 border border-border/50 shadow-xl">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">Planifiez Votre Aventure</h3>
                  <p className="text-muted-foreground">
                    Parlez-nous de votre aventure de rêve et nous créerons un itinéraire personnalisé rien que pour vous.
                  </p>
                </div>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Enhanced Map Section */}
      <motion.section
        className="py-20 bg-gradient-to-br from-background to-muted/10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">Trouvez-Nous à Marrakech</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Votre aventure commence au cœur de la ville la plus dynamique du Maroc, parfaitement positionnée pour 
              les expéditions en montagne de l'Atlas et du désert du Sahara.
            </p>
          </motion.div>
          
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.5234567890123!2d-8.1234567890123456!3d31.234567890123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDE0JzA0LjQiTiA4wrAwNycyNC41Ilc!5e0!3m2!1sen!2sma!4v1234567890123"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Raid Atlas - Siège de l'Aventure à Marrakech"
              className="w-full"
            />
            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Siège Raid Atlas</p>
                  <p className="text-sm text-muted-foreground">Marrakech, Maroc</p>
                </div>
              </div>
            </div>
          </div>
          
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p className="text-muted-foreground mb-6">
              Stratégiquement situé pour un accès facile aux destinations d'aventure les plus spectaculaires du Maroc
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>45 min vers les montagnes de l'Atlas</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>3 heures vers le désert du Sahara</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>15 min de l'aéroport de Marrakech</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <StickyButtons />
    </div>
  )
}
