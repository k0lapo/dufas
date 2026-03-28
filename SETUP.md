# Dr. Ufadime Seyi-Akinnubi Foundation - Setup Guide

## Overview
This is the official website for the Dr. Ufadime Seyi-Akinnubi Foundation, featuring maternal and child health initiatives, volunteer management, donations, and community galleries.

## Features Implemented

### 1. Brand Integration
- Custom brand colors (Teal Primary #2B8A99, Red Accent)
- Logo integrated into navigation and footer
- Updated metadata for SEO

### 2. Donation Section
- Bank transfer details display
- Copy-to-clipboard functionality
- Impact statement with donation examples
- Custom styling with brand colors

### 3. Volunteer Management
- Volunteer form with modal dialog
- Form fields: Name, Age, Email, Phone, Sex, Skills, Reason
- **Google Sheets Integration**: Requires setup (see below)
- Validation and error handling

### 4. Gallery Section
- Responsive image gallery with lightbox
- Placeholder images for preview
- Admin dashboard for managing images
- Image upload with caption and alt text

### 5. Admin Dashboard
- Located at `/admin`
- Upload images with metadata
- Delete existing images
- Manage gallery without code changes

## Setup Instructions

### Environment Variables Required

Create a `.env.local` file in the project root with:

```
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/d/{SCRIPT_ID}/useFunctionByPost
```

### Google Sheets Integration Setup

To send volunteer form submissions to Google Sheets:

1. **Create a Google Sheet**
   - Title: "Volunteer Applications"
   - Columns: Name, Age, Email, Phone, Sex, Skills, Reason, Submitted At

2. **Create a Google Apps Script**
   - Open your Google Sheet
   - Extensions → Apps Script
   - Replace the default code with:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    data.name,
    data.age,
    data.email,
    data.phone,
    data.sex,
    data.skills,
    data.reason,
    data.submittedAt
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. **Deploy as Web App**
   - Click "Deploy" → "New Deployment"
   - Type: "Web app"
   - Execute as: Your account
   - Who has access: "Anyone"
   - Copy the deployment URL
   - This is your `GOOGLE_SHEETS_WEBHOOK_URL`

4. **Add to Environment Variables**
   - Paste the deployment URL in `.env.local`

### Admin Dashboard

Access the admin dashboard at `/admin` to:
- Upload new gallery images
- Add captions and alt text
- Delete images
- View all current gallery images

**Note**: Currently uses local file storage. For production, consider integrating with cloud storage (Vercel Blob, AWS S3, etc.).

### Sections & Navigation

- **Home** (#hero) - Hero section with call-to-action
- **Mission** (#mission) - Foundation mission statement
- **Services** (#services) - Timeline of services (Maternal Health, Dental Care, Education)
- **Gallery** (#gallery) - Community outreach images
- **Volunteer** (#volunteer) - Volunteer opportunities and form
- **Donate** (#donate) - Donation information with bank details

## Bank Details for Donations

Currently configured as placeholder:
- **Account Name**: Dr. Ufadime Seyi-Akinnubi Foundation
- **Account Number**: 0123456789
- **Bank**: Access Bank Nigeria
- **Account Type**: Savings Account

Update these values in `/components/donation-section.tsx`

## Customization

### Brand Colors
Edit `/app/globals.css` to change the color scheme. Current colors:
- **Primary (Teal)**: `hsl(188 26.0% 38.8%)`
- **Accent (Red)**: `hsl(0 90% 55%)`

### Logo
Replace `/public/logo.png` with your branded logo

### Testimonials
Edit the testimonials in the stagger-testimonials component or the main page

## Deployment

### To Vercel
```bash
npm install -g vercel
vercel
```

### Environment Variables in Vercel
1. Go to Project Settings → Environment Variables
2. Add `GOOGLE_SHEETS_WEBHOOK_URL` with your Google Apps Script deployment URL

## Troubleshooting

### Volunteer Form Not Submitting
- Check that `GOOGLE_SHEETS_WEBHOOK_URL` is set correctly
- Verify Google Apps Script is deployed as "Web app"
- Check browser console for error messages

### Images Not Showing in Gallery
- Ensure images are uploaded to `/public/uploads/gallery/`
- Check file permissions
- For production, configure proper blob storage

### Logo Not Displaying
- Verify `/public/logo.png` exists
- Check file format (PNG recommended)
- Ensure file is not too large

## Future Enhancements

- [ ] Database integration for volunteer management
- [ ] Email notifications for volunteer applications
- [ ] Payment integration for online donations
- [ ] Event management system
- [ ] Blog/News section
- [ ] Appointment booking system
- [ ] Multi-language support

## Support

For issues or questions, contact the development team.
