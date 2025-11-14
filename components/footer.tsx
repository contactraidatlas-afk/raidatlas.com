import Link from "next/link"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, MessageCircle, Star, Shield, Award } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-muted/50 to-muted border-t border-border/50">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <Image 
                src="/logo.svg" 
                alt="Raid Atlas Logo" 
                width={64} 
                height={64} 
                className="h-16 w-16 object-contain" 
              />
              <div>
                <h3 className="text-xl font-bold text-foreground">RAID ATLAS</h3>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Aventure & Sport</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Découvrez les aventures les plus palpitantes du Maroc avec Raid Atlas. Des expéditions en montagne aux raids désertiques, 
              nous offrons des expériences de plein air premium avec des guides professionnels et un équipement de qualité supérieure.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span>Note 4.9/5</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4 text-primary" />
                <span>Agréé</span>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="h-4 w-4 text-primary" />
                <span>Certifié</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              <Link
                href="#"
                className="p-2 rounded-lg bg-background/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-lg bg-background/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://wa.me/+212601921044"
                className="p-2 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-semibold text-foreground text-lg">Liens Rapides</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/activities" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  Toutes les Aventures
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  À Propos de Raid Atlas
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  Nous Contacter
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Adventures */}
          <div className="space-y-6">
            <h4 className="font-semibold text-foreground text-lg">Aventures Populaires</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/activities/2h-quad" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  Raids Quad en Montagne
                </Link>
              </li>
              <li>
                <Link href="/activities/2h-buggy" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  Tours Buggy Désertiques
                </Link>
              </li>
              <li>
                <Link href="/activities/quad-camel" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  Expéditions Atlas
                </Link>
              </li>
              <li>
                <Link href="/activities/1h-camel" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  Forfaits Aventure
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Info */}
          <div className="space-y-6">
            <h4 className="font-semibold text-foreground text-lg">Nous Contacter</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Localisation</p>
                  <span className="text-muted-foreground">
                    Marrakech, Maroc<br />
                    Région des Montagnes de l'Atlas
                  </span>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Appelez-Nous</p>
                  <Link href="tel:+212601921044" className="text-muted-foreground hover:text-primary transition-colors">
                    +212 601 921 044
                  </Link>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <Link href="mailto:contactraidatlas@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                    contactraidatlas@gmail.com
                  </Link>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Disponibilité</p>
                  <span className="text-muted-foreground">
                    Quotidiennement : 7h00 - 21h00<br />
                    <span className="text-primary font-medium">Support d'Urgence 24h/24, 7j/7</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50 bg-background/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} Raid Atlas. Tous droits réservés.</p>
              <div className="hidden sm:block w-px h-4 bg-border"></div>
              <p>Fournisseur Agré de Sports d'Aventure</p>
            </div>

            {/* Quick Contact */}
            <div className="flex items-center space-x-6">
              <Link 
                href="https://wa.me/+212601921044" 
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-[#25D366] transition-colors group"
              >
                <MessageCircle className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>WhatsApp</span>
              </Link>
              <Link 
                href="tel:+212601921044" 
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <Phone className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>Appeler Maintenant</span>
              </Link>
              <Link 
                href="mailto:contactraidatlas@gmail.com" 
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>Email</span>
              </Link>
            </div>
          </div>

          {/* Developer Credit */}
          <div className="text-center mt-6 pt-6 border-t border-border/30">
            <p className="text-xs text-muted-foreground">
              Conçu avec passion pour l'aventure par{" "}
              <Link 
                href="https://mehdicodes.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-accent font-medium transition-colors hover:underline"
              >
                Mehdi Codes
              </Link>
              {" "}• Autonomiser les expériences numériques pour les aventures en plein air
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
