"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Phone, Menu, X, MapPin, Clock, MessageCircle } from "lucide-react"
import Image from "next/image"

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-sm hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Marrakech, Morocco</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Ouvert 24h/7j</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="tel:+212601921044" className="hover:text-accent transition-colors">
              +212 601 921 044
            </Link>
            <div className="h-4 w-px bg-primary-foreground/30"></div>
            <Link href="mailto:contactraidatlas@gmail.com" className="hover:text-accent transition-colors">
              contactraidatlas@gmail.com
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-border/50' 
          : 'bg-background/80 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image 
                  src="/logo.svg" 
                  alt="Raid Atlas Logo" 
                  width={80} 
                  height={80} 
                  className="h-16 w-16 object-contain transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  RAID ATLAS
                </h1>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Aventure & Sport
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {[
                { href: "/", label: "Accueil" },
                { href: "/about", label: "À Propos" },
                { href: "/activities", label: "Activités" },
                { href: "/contact", label: "Contact" }
              ].map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 font-medium transition-all duration-300 relative group rounded-lg hover:bg-muted/50 ${
                      isActive 
                        ? 'text-primary bg-primary/10' 
                        : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {item.label}
                    <span className={`absolute bottom-0 left-1/2 h-0.5 bg-primary transition-all duration-300 transform -translate-x-1/2 ${
                      isActive 
                        ? 'w-8' 
                        : 'w-0 group-hover:w-8 group-hover:left-1/2'
                    }`}></span>
                  </Link>
                )
              })}
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button 
							size="lg" 
							className="text-lg px-6 py-2 bg-primary hover:bg-primary/90 text-white shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 border-0"
							asChild
						>
							<Link href="/activities">
								Explorer les Aventures
							</Link>
						</Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="default"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
                className="hover:bg-muted/50 transition-all duration-200 p-2"
              >
                <div className="relative w-6 h-6">
                  <Menu
                    className={`h-6 w-6 absolute transition-all duration-300 ${isMobileMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}
                  />
                  <X
                    className={`h-6 w-6 absolute transition-all duration-300 ${isMobileMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}
                  />
                </div>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-4 pt-4 pb-6 space-y-3 bg-background/98 backdrop-blur-md border-t border-border/50">
              {/* Mobile Navigation Links */}
              {[
                { href: "/", label: "Accueil", delay: "50ms" },
                { href: "/about", label: "À Propos", delay: "150ms" },
                { href: "/activities", label: "Activités", delay: "100ms" },
                { href: "/contact", label: "Contact", delay: "200ms" }
              ].map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-3 rounded-xl transition-all duration-300 hover:translate-x-2 font-medium ${
                      isActive 
                        ? 'text-primary bg-primary/10 border-l-4 border-primary' 
                        : 'text-foreground hover:text-primary hover:bg-muted/70'
                    } ${
                      isMobileMenuOpen ? "animate-in slide-in-from-left-4 duration-300" : ""
                    }`}
                    style={{ animationDelay: item.delay }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              })}

              {/* Mobile Contact Info */}
              <div
                className={`pt-4 border-t border-border/50 space-y-3 ${
                  isMobileMenuOpen ? "animate-in fade-in duration-500" : ""
                }`}
                style={{ animationDelay: "250ms" }}
              >
                <div className="flex items-center space-x-3 px-4 py-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Marrakech, Morocco</span>
                </div>
                
                {/* Mobile Action Buttons */}
                <div className="flex flex-col space-y-3 px-4">
                 <Button 
							size="lg" 
							className="text-lg px-6 py-2 bg-primary hover:bg-primary/90 text-white shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 border-0"
							asChild
						>
							<Link href="/activities">
								Explorer les Aventures
								
							</Link>
						</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
