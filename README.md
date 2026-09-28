# Nail Tech Website Template — Setup Guide

Welcome! This is your done-for-you website for a nail tech, lash tech, or solo beauty business. No coding experience needed — you're replacing placeholder text and photos, same as filling out a form.

You own this site outright. Host it free, forever, on GitHub Pages. No monthly fees, no subscriptions.

> **Heads up:** this whole guide is written for doing it by hand — every step works for free, no AI required. If you already have a paid AI assistant with an Airtable connection set up (like Claude on a plan that includes connectors), you can instead hand it your business details and photos and ask it to fill this in for you directly. That's a bonus on top of this guide, not something you need to have.

---

## What's in this download

- `index.html` — the site itself (all your text lives here)
- `style.css` — your colors, fonts, and the glitter effect (change once, updates everywhere)
- `script.js` — don't touch this one, it just runs the sparkle animation and menu
- `assets/` — folder for your logo and nail photos
- `SETUP-GUIDE.md` — this file

This template ships with the **"Glitter Bar"** palette — deep rose (#C2185B) and hot pink (#FF4FA1) with an animated sparkle field in the hero. It's built to feel girly, glossy, and a little playful, on purpose — see "Changing the Vibe" below if that's not your brand.

---

## Step 1: Get your free GitHub account (5 min)

1. Go to github.com and click "Sign Up" (it's free).
2. Verify your email.

## Step 2: Create your website repository & connect your booking form

1. Click the "+" icon top-right → "New repository."
2. Name it exactly `yourusername.github.io` (using YOUR GitHub username — this exact naming is what makes GitHub host it for free).
3. Set it to Public. Click "Create repository."
4. Upload `index.html`, `style.css`, `script.js`, and the `assets` folder.
5. Now connect your booking form:
   - Open this Airtable base: [https://airtable.com/appnqrPYt6SPdmsoE](https://airtable.com/appnqrPYt6SPdmsoE)
   - Click **Copy base** (top right) — this creates a full copy in YOUR OWN free Airtable account.
   - In your copy, click **Forms** in the top nav, then build a form from the **Bookings** table (Airtable does this automatically from the fields already there: First Name, Phone, Email, Service, Preferred Date, Preferred Time, Notes).
   - Click **Share** on the form, turn it on, and copy the link.
   - Open `index.html`, find `YOUR_AIRTABLE_FORM_LINK`, and paste your link in its place.
6. Commit your changes. Within a few minutes your site is live at `https://yourusername.github.io`.

## Step 3: Edit your services and prices

The included services (Classic Gel $55, Sculpted Extension Set $95, Custom Nail Art from $20) match the form's Service dropdown exactly. If you change a price or add a service:

1. Update it in `index.html` inside the `<div class="services-grid">` section.
2. Also update the **Service** field's options in your Airtable base (open the Bookings table → click the Service column header → Edit field) so the dropdown matches.

Keeping these two in sync is the only manual step in the whole system.

## Step 4: Edit your business details

Open `index.html` and use Find/Replace (Ctrl+F or Cmd+F) for:
- "Glossed & Gilded" → your business name (appears in the logo and footer)
- "(555) 555-0134" → your phone number
- "Tue–Sat, 10am–6pm" → your real hours
- "Serving Clarkdale & the Verde Valley" → your service area

## Step 5: Make it your own colors (optional)

Open `style.css`. At the very top is a `:root { ... }` block with 6 values:
- `--color-primary` — main brand color
- `--color-primary-dark` — hover shade
- `--color-accent` — CTA/highlight color, used for buttons and the sparkle gradient
- `--color-lavender` — secondary accent, used sparingly
- `--color-bg` — page background
- `--color-text` — main text color

Change any of these to a hex code from a free color picker, save, and commit. The whole site updates.

## Step 6: Add your own nail photos

1. Upload your photos into the `assets` folder in GitHub.
2. In `index.html`, find the `<div class="gallery-grid">` section — each `<div class="gallery-tile ...">` is currently a colored gradient placeholder.
3. Replace a tile's background in `style.css` (search for `.tile-1` etc.) with `background-image: url('assets/your-photo.jpg'); background-size: cover; background-position: center;` instead of the gradient.

## Changing the Vibe

This palette is deliberately girly-pop — if that's not your brand (say, a more neutral or masculine barber/grooming studio), you can:
- Swap the palette in Step 5 for something more muted (navy + silver, black + gold, etc.)
- Remove the sparkle effect entirely by deleting the `generateSparkles()` block at the top of `script.js`
- The layout (hero, services, gallery, testimonials, booking) works for any solo beauty business — nails, lashes, brows, hair.

## Step 7: Get your own domain (recommended)

Same as every AE9 Labs template — see the domain section of the Local Service Provider SOP, or GitHub's own Settings → Pages → Custom domain screen, which shows you exactly what DNS records to add.

---

## You're done

Your site is live, it's yours, and there's no monthly bill for it. Questions or found a bug in the template itself? Reach out through the Support & Feedback link included with your purchase.
