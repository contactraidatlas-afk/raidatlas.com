"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail } from "lucide-react"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    subject: "Réservation",
    description: "",
    nom: "",
    prenom: "",
    phone: "",
    ville: "",
    email: "",
  })
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(null)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: formData.subject,
          description: formData.description,
          nom: formData.nom,
          prenom: formData.prenom,
          phone: formData.phone,
          ville: formData.ville,
          email: formData.email,
        }),
      })
      let result
      try {
        result = await response.json()
      } catch (jsonErr) {
        result = { error: "Invalid JSON response from server." }
      }
      if (response.ok) {
        setSubmitSuccess(result.message || "Message envoyé avec succès !")
        setFormData({ subject: "Réservation", description: "", nom: "", prenom: "", phone: "", ville: "", email: "" })
        setTimeout(() => setSubmitSuccess(null), 4000)
      } else {
        setSubmitError(result.error || "Échec de l'envoi du message.")
        setTimeout(() => setSubmitError(null), 4000)
      }
    } catch (error: any) {
      setSubmitError("Échec de l'envoi du message. Veuillez réessayer plus tard.")
      setTimeout(() => setSubmitError(null), 4000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = () => {
    return (
      formData.subject &&
      formData.description &&
      formData.nom &&
      formData.prenom &&
      formData.phone &&
      formData.ville &&
      formData.email
    )
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="subject">Je vous contacte à propos de *</Label>
        <select
          id="subject"
          className="w-full border rounded px-3 py-2"
          value={formData.subject}
          onChange={(e) => handleInputChange("subject", e.target.value)}
          required
        >
          <option value="Réservation">Réservation</option>
          <option value="Réclamation">Réclamation</option>
          <option value="Événement">Événement</option>
          <option value="Autre">Autre</option>
        </select>
      </div>
      <div>
        <Label htmlFor="description">Les détails de votre demande *</Label>
        <Textarea
          id="description"
          placeholder="Décrivez votre demande"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nom">Nom *</Label>
          <Input
            id="nom"
            placeholder="Votre nom"
            value={formData.nom}
            onChange={(e) => handleInputChange("nom", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="prenom">Prénom *</Label>
          <Input
            id="prenom"
            placeholder="Votre prénom"
            value={formData.prenom}
            onChange={(e) => handleInputChange("prenom", e.target.value)}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Téléphone *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Votre numéro de téléphone"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="ville">Ville *</Label>
          <Input
            id="ville"
            placeholder="Votre ville"
            value={formData.ville}
            onChange={(e) => handleInputChange("ville", e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          placeholder="Votre email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          required
        />
      </div>
      {submitError && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {submitError}
        </div>
      )}
      {submitSuccess && (
        <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2">
          {submitSuccess}
        </div>
      )}
      <Button type="submit" className="w-full" disabled={!isFormValid() || isSubmitting}>
        <Mail className="mr-2 h-4 w-4" />
        {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
      </Button>
    </form>
  )
}
