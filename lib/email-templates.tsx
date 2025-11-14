export const bookingConfirmationTemplate = (bookingData: {
  activityId: string
  date: string
  people: string
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  specialRequests?: string
}) => {
  return {
    subject: `Booking Confirmation - ${bookingData.activityId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #ea580c, #f97316); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Raid Atlas</h1>
          <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Your Desert Adventure Awaits!</p>
        </div>
        
        <div style="padding: 30px; background: #ffffff;">
          <h2 style="color: #ea580c; margin-bottom: 20px;">Booking Confirmation</h2>
          
          <p>Dear ${bookingData.firstName} ${bookingData.lastName},</p>
          
          <p>Thank you for booking with Raid Atlas! We're excited to provide you with an unforgettable desert adventure.</p>
          
          <div style="background: #fffbeb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #ea580c; margin-top: 0;">Booking Details</h3>
            <p><strong>Activity:</strong> ${bookingData.activityId}</p>
            <p><strong>Date:</strong> ${bookingData.date}</p>
            <p><strong>Number of People:</strong> ${bookingData.people}</p>
            <p><strong>Contact:</strong> ${bookingData.phone}</p>
            <p><strong>City:</strong> ${bookingData.city}</p>
            ${bookingData.specialRequests ? `<p><strong>Special Requests:</strong> ${bookingData.specialRequests}</p>` : ""}
          </div>
          
          <h3 style="color: #ea580c;">What's Next?</h3>
          <ul style="line-height: 1.6;">
            <li>Our team will contact you within 2 hours to confirm availability</li>
            <li>We'll send pickup details 24 hours before your adventure</li>
            <li>Free cancellation up to 24 hours before your tour</li>
          </ul>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin-top: 0;">Contact Information</h4>
            <p>Phone: +212 707 750 074</p>
            <p>WhatsApp: +212 707 750 074</p>
            <p>Email: raidatlass@gmail.com</p>
          </div>
          
          <p>We look forward to providing you with an amazing desert experience!</p>
          
          <p>Best regards,<br>The Raid Atlas Team</p>
        </div>
        
        <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
          <p>© 2024 Raid Atlas. All rights reserved.</p>
        </div>
      </div>
    `,
    text: `
      Raid Atlas - Booking Confirmation
      
      Dear ${bookingData.firstName} ${bookingData.lastName},
      
      Thank you for booking with Raid Atlas!
      
      Booking Details:
      - Activity: ${bookingData.activityId}
      - Date: ${bookingData.date}
      - Number of People: ${bookingData.people}
      - Contact: ${bookingData.phone}
      - City: ${bookingData.city}
      ${bookingData.specialRequests ? `- Special Requests: ${bookingData.specialRequests}` : ""}
      
      What's Next?
      - Our team will contact you within 2 hours to confirm availability
      - We'll send pickup details 24 hours before your adventure
      - Free cancellation up to 24 hours before your tour
      
      Contact us: +212 707 750 074 or contactraidatlas@gmail.com
      
      Best regards,
      The Raid Atlas Team
    `,
  }
}
