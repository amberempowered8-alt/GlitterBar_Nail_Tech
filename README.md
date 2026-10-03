# Nail Tech Website Template — Setup Guide

Welcome! This is your done-for-you website for a nail tech, lash tech, or solo beauty business. No coding experience needed — you're replacing placeholder text and photos, same as filling out a form.

You own this site outright. Host it free, forever, on GitHub Pages. No monthly fees, no subscriptions.

> **Heads up:** this whole guide is written for doing it by hand — every step works for free, no AI required. If you already have a paid AI assistant with an Airtable connection set up (like Claude on a plan that includes connectors), you can instead hand it your business details and photos and ask it to fill this in for you directly. That's a bonus on top of this guide, not something you need to have.

---

## What's in this download

- `index.html` — your site's structure and content sections
- `style.css` — your colors, fonts, and the glitter effect (change once, updates everywhere)
- `script.js` — the engine that syncs your Services, Gallery, and Testimonials sections from Airtable; don't touch this one unless you know JS
- `.github/workflows/sync.yml` — the automatic sync job
- `SETUP-GUIDE.md` — this file

This template ships with the **"Glitter Bar"** palette — deep rose (#C2185B) and hot pink (#FF4FA1) with an animated sparkle field in the hero. It's built to feel girly, glossy, and a little playful, on purpose — see "Changing the Vibe" below if that's not your brand.

**Two separate Airtable bases work together here:** one powers your **booking form** (Step 2), the other powers your **Services, Gallery, and Testimonials content** (Step 3). They're independent — you'll set up both, but they don't need to match each other.

---

## Step 1: Get your free GitHub account (5 min)

1. Go to github.com and click "Sign Up" (it's free).
2. Verify your email.

## Step 2: Create your website repository & connect your booking form

1. Click the "+" icon top-right → "New repository."
2. Name it exactly `yourusername.github.io` (using YOUR GitHub username — this exact naming is what makes GitHub host it for free).
3. Set it to Public. Click "Create repository."
4. Upload `index.html`, `style.css`, `script.js`, and the `.github` folder (keep `.github/workflows/sync.yml` at that exact nested path).
5. Now connect your booking form:
   - Open this Airtable base: [https://airtable.com/appnqrPYt6SPdmsoE](https://airtable.com/appnqrPYt6SPdmsoE)
   - Click **Copy base** (top right) — this creates a full copy in YOUR OWN free Airtable account.
   - In your copy, click **Forms** in the top nav, then build a form from the **Bookings** table (Airtable does this automatically from the fields already there: First Name, Phone, Email, Service, Preferred Date, Preferred Time, Notes).
   - Click **Share** on the form, turn it on, and copy the link.
   - Open `index.html`, find `YOUR_AIRTABLE_FORM_LINK`, and paste your link in its place.
6. Commit your changes. Within a few minutes your site is live at `https://yourusername.github.io`.

## Step 3: Connect your Services, Gallery & Testimonials

Unlike the booking form above, this content updates your site automatically — no code editing, ever, once it's set up.

1. Open your **Master Core Blueprint** link for this template's content base and click **Duplicate Base** to save it into your own workspace.
2. Confirm it has three tables: **Services**, **Gallery**, and **Testimonials**, each with a `Status` field.

**Services table fields:**
- `Service Name` — e.g. "Classic Gel"
- `Icon` — an emoji shown in the icon circle, e.g. 💫
- `Description` — one or two sentences
- `Price` — shown exactly as typed, e.g. "$55" or "from $20"
- `Featured` — check this box for the one service you want visually highlighted (only feature one at a time)
- `Status` — set to **Published** to make it live

**Gallery table fields:**
- `Caption` — a short label, e.g. "chrome french"
- `Photo` — upload your actual nail photo here
- `Status` — set to **Published** to make it live

**Testimonials table fields:**
- `Client Name` — e.g. a first name and last initial
- `Quote` — the review text
- `Status` — set to **Published** to make it live

3. This template needs four GitHub repo secrets (Settings → Secrets and variables → Actions → New repository secret):
   - `AIRTABLE_TOKEN` — a Personal Access Token scoped to `data.records:read` on your duplicated content base only
   - `AIRTABLE_BASE_ID` — found in your browser's address bar when viewing your content base (starts with `app...`)
   - `AIRTABLE_SERVICES_TABLE` — the exact name of your Services table (defaults to `Services` if left blank)
   - `AIRTABLE_GALLERY_TABLE` — the exact name of your Gallery table (defaults to `Gallery` if left blank)
   - `AIRTABLE_TESTIMONIALS_TABLE` — the exact name of your Testimonials table (defaults to `Testimonials` if left blank)

**Security best practice:** always restrict your token to Read-Only (`data.records:read`) access. This ensures visitors can never modify or erase records in your database.

4. Trigger the first sync: go to your repo's **Actions** tab → **Sync services, gallery & testimonials from Airtable** → **Run workflow**. See the companion **GitHub Actions Quick-Start SOP** for the exact click-by-click.

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

Add a row to your **Gallery** table in Airtable (Step 3), upload the photo to the `Photo` field, give it a `Caption`, and set `Status` to **Published**. The next sync picks it up automatically — no code editing, no touching `style.css` tiles.

## Changing the Vibe

This palette is deliberately girly-pop — if that's not your brand (say, a more neutral or masculine barber/grooming studio), you can:
- Swap the palette in Step 5 for something more muted (navy + silver, black + gold, etc.)
- Remove the sparkle effect entirely by deleting the `generateSparkles()` block at the top of `script.js`
- The layout (hero, services, gallery, testimonials, booking) works for any solo beauty business — nails, lashes, brows, hair.

## Step 7: Get your own domain (recommended)

Same as every AE9 Labs template — see the domain section of the Local Service Provider SOP, or GitHub's own Settings → Pages → Custom domain screen, which shows you exactly what DNS records to add.

---

## If Something Isn't Showing Up

See the companion **Airtable Quick-Start SOP** and **GitHub Actions Quick-Start SOP** — they walk through, in order, exactly what to check before assuming anything's broken (it's almost always a normal sync delay, not a bug).

## You're done

Your site is live, it's yours, and there's no monthly bill for it. Questions or found a bug in the template itself? Reach out through the Support & Feedback link included with your purchase.
