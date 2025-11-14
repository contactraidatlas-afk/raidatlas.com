import { NextRequest } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: NextRequest) {
  try {
    const { subject, description, nom, prenom, phone, ville, email } = await req.json()
    if (!subject || !description || !nom || !prenom || !phone || !ville || !email) {
      return Response.json({ error: "Tous les champs sont obligatoires." }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Contact: ${subject} - ${prenom} ${nom}`,
      text: `Sujet: ${subject}\nNom: ${nom}\nPrénom: ${prenom}\nTéléphone: ${phone}\nVille: ${ville}\nEmail: ${email}\n\nDétails de la demande:\n${description}`,
      replyTo: email,
    }

    await transporter.sendMail(mailOptions)
    return Response.json({ message: "Message envoyé avec succès !" }, { status: 200 })
  } catch (error: any) {
    return Response.json({ error: error.message || "Échec de l'envoi du message." }, { status: 500 })
  }
}
