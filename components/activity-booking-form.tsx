"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, ArrowRight, ArrowLeft, Mail, ChevronDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface ActivityBookingFormProps {
  activity: {
    id: string
    slug: string
    title: string
    duration: string
    price: string
  }
}

export function ActivityBookingForm({ activity }: ActivityBookingFormProps) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    date: "",
    people: "2",
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+212",
    phone: "",
    city: "",
    specialRequests: "",
  })

  const countries = [
    { code: "+212", name: "Maroc", flag: "🇲🇦" },
    { code: "+33", name: "France", flag: "🇫🇷" },
    { code: "+1", name: "USA/Canada", flag: "🇺🇸" },
    { code: "+44", name: "UK", flag: "🇬🇧" },
    { code: "+49", name: "Allemagne", flag: "🇩🇪" },
    { code: "+34", name: "Espagne", flag: "🇪🇸" },
    { code: "+39", name: "Italie", flag: "🇮🇹" },
    { code: "+32", name: "Belgique", flag: "🇧🇪" },
    { code: "+41", name: "Suisse", flag: "🇨🇭" },
    { code: "+31", name: "Pays-Bas", flag: "🇳🇱" },
    { code: "+971", name: "UAE", flag: "🇦🇪" },
    { code: "+966", name: "Arabie Saoudite", flag: "🇸🇦" },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFormSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(null)

    try {
      const response = await fetch("/api/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activityTitle: activity.title,
          activityDuration: activity.duration,
          activityPrice: activity.price,
          activitySlug: activity.slug,
          date: formData.date,
          people: formData.people,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: `${formData.countryCode} ${formData.phone}`,
          message: formData.specialRequests,
          city: formData.city,
        }),
      })

      let result
      try {
        result = await response.json()
      } catch (jsonErr) {
        result = { error: "Réponse JSON invalide du serveur." }
      }

      if (response.ok) {
        setSubmitSuccess(result.message || "Réservation réussie !")
        setTimeout(() => {
          setSubmitSuccess(null)
          router.push("/thank-you")
        }, 1200)
      } else {
        // Log the error details for debugging
        console.error("API error response:", result)
        setSubmitError(result.error || "Échec de la soumission du formulaire")
        setTimeout(() => setSubmitError(null), 4000)
      }
    } catch (error: any) {
      console.error("Booking submission error:", error)
      setSubmitError(
        "Échec de la soumission de la réservation par email. Veuillez essayer la réservation WhatsApp ou nous contacter directement."
      )
      setTimeout(() => setSubmitError(null), 4000)
      // Fallback to WhatsApp if email submission fails
      handleWhatsAppBooking()
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsAppBooking = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : ""
    const activityUrl = `${origin}/activities/${activity.slug}`
    const fullPhone = `${formData.countryCode} ${formData.phone}`
    const message = `Bonjour ! Je voudrais réserver : ${activity.title} (${activity.duration}).\nDate : ${formData.date}\nPersonnes : ${formData.people}\nLien : ${activityUrl}\nNom : ${formData.firstName} ${formData.lastName}\nEmail : ${formData.email}\nTéléphone : ${fullPhone}\nVille : ${formData.city}${formData.specialRequests ? `\nDemandes spéciales : ${formData.specialRequests}` : ""}`
    const whatsappUrl = `https://wa.me/+212601921044?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const renderStep = () => {
    const SuccessMsg = submitSuccess ? (
      <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2">
        {submitSuccess}
      </div>
    ) : null

    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="date">Sélectionnez une Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="pl-10"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
            {submitError && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                {submitError}
              </div>
            )}
            {SuccessMsg}
            <Button onClick={() => setStep(2)} className="w-full" disabled={!formData.date}>
              Continuer
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="people">Nombre de Personnes</Label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="people"
                  type="number"
                  min="1"
                  max="1000"
                  step="1"
                  inputMode="numeric"
                  value={formData.people}
                  onChange={(e) => handleInputChange("people", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            {submitError && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                {submitError}
              </div>
            )}
            {SuccessMsg}
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Button>
              <Button
                onClick={() => setStep(3)}
                className="flex-1"
                disabled={
                  !formData.people ||
                  isNaN(Number(formData.people)) ||
                  Number(formData.people) < 1 ||
                  Number(formData.people) > 1000
                }
              >
                Continuer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Téléphone</Label>
              <div className="flex gap-2">
                <Select
                  value={formData.countryCode}
                  onValueChange={(value) => handleInputChange("countryCode", value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{countries.find(c => c.code === formData.countryCode)?.flag}</span>
                        <span>{formData.countryCode}</span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{country.flag}</span>
                          <span>{country.code}</span>
                          <span className="text-muted-foreground text-sm">({country.name})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="612345678"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="flex-1"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="city">Ville</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="specialRequests">Demandes Spéciales (Optionnel)</Label>
              <Textarea
                id="specialRequests"
                value={formData.specialRequests}
                onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                placeholder="Toute exigence ou demande spéciale..."
              />
            </div>
            {submitError && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                {submitError}
              </div>
            )}
            {SuccessMsg}
            <div className="space-y-2">
              <Button
                onClick={handleFormSubmit}
                className="w-full"
                disabled={
                  !formData.firstName ||
                  !formData.lastName ||
                  !formData.email ||
                  !formData.phone ||
                  !formData.city ||
                  isSubmitting
                }
              >
                <Mail className="mr-2 h-4 w-4" />
                {isSubmitting ? "Envoi en cours..." : "Réserver par Email"}
              </Button>
              <Button
                variant="outline"
                onClick={handleWhatsAppBooking}
                className="w-full bg-transparent"
                disabled={
                  !formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.city
                }
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.669.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.003a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.86 9.86 0 016.993 2.897 9.825 9.825 0 012.894 6.994c-.003 5.45-4.437 9.884-9.889 9.884M20.52 3.45A11.815 11.815 0 0012.046 0C5.495 0 .16 5.335.157 11.887c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.865 11.865 0 005.683 1.448h.005c6.551 0 11.887-5.335 11.90-11.887A11.821 11.821 0 0020.52 3.45z" />
                </svg>
                Réserver via WhatsApp
              </Button>
              <Button variant="ghost" onClick={() => setStep(2)} className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <Link href={`/activities/${activity.slug}`} className="font-semibold hover:underline">
            {activity.title}
          </Link>
          <span className="text-sm font-normal text-muted-foreground">Étape {step} sur 3</span>
        </CardTitle>
      </CardHeader>
      <CardContent>{renderStep()}</CardContent>
    </Card>
  )
}
