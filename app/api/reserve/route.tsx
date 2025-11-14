import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Create transporter using Gmail App Password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Google App Password
  },
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, activity, date, numberOfPeople, message, city } = body

    // Normalize activity to an object shape
    const activityInfo =
      typeof activity === "string"
        ? { id: activity, slug: activity, title: activity, duration: "", price: "" }
        : (activity || { id: "", slug: "", title: "", duration: "", price: "" })

    const siteUrl = request.nextUrl?.origin || ""
    const activityLink = activityInfo.slug ? `${siteUrl}/activities/${activityInfo.slug}` : siteUrl

    // Validate required fields
    if (!name || !email || !phone || !activity || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Email content for your company
    const companyEmailContent = `
      <h2>New Reservation Request - Raid Atlas</h2>
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h3>Customer Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
        </ul>
        
        <h3>Reservation Details:</h3>
        <ul>
          <li><strong>Activity:</strong> ${activityLink ? `<a href="${activityLink}">${activityInfo.title}</a>` : activityInfo.title}</li>
          ${activityInfo.duration ? `<li><strong>Duration:</strong> ${activityInfo.duration}</li>` : ""}
          ${activityInfo.price ? `<li><strong>Price:</strong> ${activityInfo.price}</li>` : ""}
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Number of People:</strong> ${numberOfPeople}</li>
        </ul>
        
        ${message ? `<h3>Additional Message:</h3><p>${message}</p>` : ""}
        
        <hr>
        <p><em>This reservation request was submitted through the Raid Atlas website.</em></p>
      </div>
    `

    // Customer confirmation email content
    const customerEmailContent = `
      <h2>Reservation Confirmation - Raid Atlas</h2>
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <p>Dear ${name},</p>
        
        <p>Thank you for your reservation request! We have received your booking details and will contact you shortly to confirm your adventure.</p>
        
        <h3>Your Reservation Details:</h3>
        <ul>
          <li><strong>Activity:</strong> ${activityLink ? `<a href="${activityLink}">${activityInfo.title}</a>` : activityInfo.title}</li>
          ${activityInfo.duration ? `<li><strong>Duration:</strong> ${activityInfo.duration}</li>` : ""}
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Number of People:</strong> ${numberOfPeople}</li>
        </ul>
        
        <p>We will contact you at <strong>${phone}</strong>${city ? ` (City: ${city})` : ""} or reply to this email within 24 hours to confirm your booking and provide additional details.</p>
        
        <p>If you have any immediate questions, feel free to contact us:</p>
        <ul>
          <li>Phone: +212 707 750 074</li>
          <li>WhatsApp: +212 707 750 074</li>
        </ul>
        
        <p>We look forward to providing you with an unforgettable desert adventure!</p>
        
        <p>Best regards,<br>
        The Raid Atlas Team</p>
      </div>
    `

    // Send email to company
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to your company email
      subject: `New Reservation: ${activityInfo.title} - ${name}`,
      html: companyEmailContent,
    })

    // Send confirmation email to customer
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reservation Confirmation - Raid Atlas",
      html: customerEmailContent,
    })

    return NextResponse.json(
      { message: "Reservation submitted successfully! Check your email for confirmation." },
      { status: 200 },
    )
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json(
      { error: "Failed to send reservation. Please try again or contact us directly." },
      { status: 500 },
    )
  }
}
