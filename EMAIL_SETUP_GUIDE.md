# Email Integration Setup Guide 

## Google App Password Setup

### 1. Environment Variables
Add these variables to your Vercel project settings:

\`\`\`env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password
\`\`\`

**Important:** 
- `EMAIL_USER` should be your full Gmail address
- `EMAIL_PASS` should be the 16-character App Password from Google (not your regular Gmail password)
- These are server-side only variables (no `NEXT_PUBLIC_` prefix needed)

### 2. Google App Password Creation
1. Go to your Google Account settings
2. Navigate to Security → 2-Step Verification
3. Scroll down to "App passwords"
4. Generate a new app password for "Mail"
5. Copy the 16-character password (spaces will be removed automatically)

### 3. Vercel Deployment Setup
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add both `EMAIL_USER` and `EMAIL_PASS` variables
4. Make sure they're available for all environments (Production, Preview, Development)

### 4. Local Development Setup
Create a `.env.local` file in your project root:

\`\`\`env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password
\`\`\`

**Never commit this file to Git!** (It's already in .gitignore)

### 5. Testing the Integration
1. Deploy your project to Vercel
2. Try making a reservation through any activity page
3. Check both your company email and the customer's email for confirmations
4. If emails don't arrive, check Vercel function logs for errors

### 6. Troubleshooting
- **"Invalid login"**: Double-check your App Password (not regular password)
- **"Authentication failed"**: Ensure 2-Step Verification is enabled on your Google account
- **Emails not sending**: Check Vercel function logs in the dashboard
- **Customer not receiving emails**: Check their spam folder

### 7. Email Flow
1. Customer fills out booking form
2. Form submits to `/api/reserve` endpoint
3. Server sends two emails:
   - Company notification (to your Gmail)
   - Customer confirmation (to their email)
4. Customer sees success message and gets redirected

### 8. Customization
You can modify the email templates in `/app/api/reserve/route.ts`:
- Update company contact information
- Change email styling and content
- Add your company logo (as base64 or hosted image URL)
- Modify the email subject lines
