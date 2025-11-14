"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, Calendar, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function StickyButtons() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.div 
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={scrollToTop}
              size="lg"
              className="rounded-full w-14 h-14 p-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-accent hover:bg-accent/90 text-accent-foreground hover:scale-110 group"
              aria-label="Remonter au haut"
            >
              <ChevronUp className="h-6 w-6 group-hover:-translate-y-1 transition-transform duration-300" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expandable Action Buttons */}
      <div className="relative">
        {/* Main Action Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            size="lg"
            className="rounded-full w-16 h-16 p-0 shadow-2xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white relative overflow-hidden group"
            aria-label="Options de contact"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <MessageCircle className="h-7 w-7" />
            </motion.div>
          </Button>
        </motion.div>

        {/* Expanded Action Buttons */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="absolute bottom-20 right-0 flex flex-col space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, staggerChildren: 0.1 }}
            >
              {/* WhatsApp Button */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 bg-[#25D366] hover:bg-[#1DA851] text-white group relative overflow-hidden"
                  asChild
                >
                  <a 
                    href="https://wa.me/+212601921044" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center px-6"
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <svg className="h-5 w-5 mr-3 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.669.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.003a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.86 9.86 0 016.993 2.897 9.825 9.825 0 012.894 6.994c-.003 5.45-4.437 9.884-9.889 9.884M20.52 3.45A11.815 11.815 0 0012.046 0C5.495 0 .16 5.335.157 11.887c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.865 11.865 0 005.683 1.448h.005c6.551 0 11.887-5.335 11.90-11.887A11.821 11.821 0 0020.52 3.45z" />
                    </svg>
                    <span className="font-medium relative z-10">WhatsApp</span>
                  </a>
                </Button>
              </motion.div>

              {/* Phone Button */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground group relative overflow-hidden"
                  asChild
                >
                  <a 
                    href="tel:+212601921044"
                    className="flex items-center px-6"
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Phone className="h-5 w-5 mr-3 relative z-10 group-hover:animate-pulse" />
                    <span className="font-medium relative z-10">Appeler Maintenant</span>
                  </a>
                </Button>
              </motion.div>

              {/* Book Adventure Button */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 bg-secondary hover:bg-secondary/90 text-secondary-foreground group relative overflow-hidden"
                  asChild
                >
                  <a 
                    href="/activities"
                    className="flex items-center px-6"
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Calendar className="h-5 w-5 mr-3 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="font-medium relative z-10">Réserver Maintenant</span>
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tooltip */}
        {!isExpanded && (
          <motion.div
            className="absolute bottom-0 right-20 bg-black/80 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
          >
            Contacter Raid Atlas
            <div className="absolute top-1/2 -right-1 w-2 h-2 bg-black/80 rotate-45 transform -translate-y-1/2"></div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
