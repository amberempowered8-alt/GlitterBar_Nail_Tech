// ============================================
// NAIL TECH TEMPLATE — site behavior
// Don't touch this file unless you know JS — everything you need to edit lives in index.html and style.css
//
// Your SERVICES, GALLERY, and TESTIMONIALS are kept up to date automatically
// from Airtable — see SETUP-GUIDE.md for the one-time setup. You never paste
// any secret token into this file.
// ============================================

// ---------- Generate the glitter/sparkle field in the hero ----------
(function generateSparkles() {
  const field = document.getElementById('sparkle-field');
  if (!field) return;
  const COUNT = 45;
  for (let i = 0; i < COUNT; i++) {
    const dot = document.createElement('div');
    dot.className = 'sparkle';
    const size = Math.random() * 3 + 1.5; // 1.5px - 4.5px
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;
    dot.style.animationDuration = `${Math.random() * 3 + 2}s`;
    dot.style.animationDelay = `${Math.random() * 4}s`;
    field.appendChild(dot);
  }
})();

// ---------- Mobile nav toggle ----------
(function mobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('nav-open'));
  });
})();

// ---------- Booking form: show a friendly fallback until the real Airtable link is pasted in ----------
(function checkBookingEmbed() {
  const iframe = document.getElementById('booking-form-embed');
  const fallback = document.getElementById('booking-fallback');
  if (!iframe || !fallback) return;
  if (iframe.getAttribute('src') === 'YOUR_AIRTABLE_FORM_LINK' || !iframe.getAttribute('src')) {
    iframe.style.display = 'none';
    fallback.style.display = 'block';
  }
})();

// ---------- Smooth scroll for on-page anchor links ----------
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.length > 1) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// ---------- Helpers ----------
function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Loads your Services grid from data/services.json — a plain data file that
 * a scheduled GitHub Action keeps in sync with the "Services" table in your
 * Airtable base. This file never contains your Airtable token; it only
 * contains the published records themselves. See SETUP-GUIDE.md.
 */
async function renderServices() {
  const grid = document.getElementById('services-grid');
  if (!grid) return;

  try {
    const response = await fetch('data/services.json', { cache: 'no-store' });

    if (!response.ok) {
      grid.innerHTML = `<p class="loading">Your services will appear here once the automatic sync runs for the first time.</p>`;
      return;
    }

    const data = await response.json();

    if (!data.records || data.records.length === 0) {
      grid.innerHTML = `<p class="loading">No published services yet. Set a row's Status to "Published" in your Services table to display it here.</p>`;
      return;
    }

    grid.innerHTML = data.records.map(record => {
      const fields = record.fields || {};
      const name = escapeHTML(fields['Service Name'] || 'Untitled Service');
      const icon = escapeHTML(fields['Icon'] || '💅');
      const desc = escapeHTML(fields['Description'] || '');
      const price = escapeHTML(fields['Price'] || '');
      const featured = !!fields['Featured'];

      return `
        <div class="service-card${featured ? ' featured' : ''}">
          ${featured ? '<span class="service-badge">Most Requested</span>' : ''}
          <div class="service-icon">${icon}</div>
          <h3>${name}</h3>
          <p>${desc}</p>
          <span class="service-price">${price}</span>
        </div>`;
    }).join('');

  } catch (error) {
    console.error('Services load error:', error);
    grid.innerHTML = `<p class="loading">Couldn't load services right now. Check the Actions tab in your GitHub repo for errors.</p>`;
  }
}

/**
 * Loads your Gallery grid from data/gallery.json — synced from the
 * "Gallery" table in your Airtable base. Photos are downloaded and saved
 * into this repo by the sync job, so they never depend on Airtable's
 * temporary image links, which expire a couple hours after they're
 * generated. See SETUP-GUIDE.md.
 */
async function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;

  try {
    const response = await fetch('data/gallery.json', { cache: 'no-store' });

    if (!response.ok) {
      grid.innerHTML = `<p class="loading">Your gallery will appear here once the automatic sync runs for the first time.</p>`;
      return;
    }

    const data = await response.json();

    if (!data.records || data.records.length === 0) {
      grid.innerHTML = `<p class="loading">No published photos yet. Add a photo and set a row's Status to "Published" in your Gallery table to display it here.</p>`;
      return;
    }

    grid.innerHTML = data.records.map(record => {
      const fields = record.fields || {};
      const caption = escapeHTML(fields['Caption'] || '');
      const photo = Array.isArray(fields['Photo']) && fields['Photo'].length > 0 ? fields['Photo'][0] : null;

      if (photo && photo.url) {
        return `
          <div class="gallery-tile has-photo">
            <img src="${escapeHTML(photo.url)}" alt="${caption}" loading="lazy">
            ${caption ? `<span>${caption}</span>` : ''}
          </div>`;
      }
      return `<div class="gallery-tile"><span>${caption || 'photo coming soon'}</span></div>`;
    }).join('');

  } catch (error) {
    console.error('Gallery load error:', error);
    grid.innerHTML = `<p class="loading">Couldn't load the gallery right now. Check the Actions tab in your GitHub repo for errors.</p>`;
  }
}

/**
 * Loads your Testimonials grid from data/testimonials.json — synced from
 * the "Testimonials" table in your Airtable base the same way Services is.
 */
async function renderTestimonials() {
  const grid = document.getElementById('testimonial-grid');
  if (!grid) return;

  try {
    const response = await fetch('data/testimonials.json', { cache: 'no-store' });

    if (!response.ok) {
      grid.innerHTML = `<p class="loading">Your testimonials will appear here once the automatic sync runs for the first time.</p>`;
      return;
    }

    const data = await response.json();

    if (!data.records || data.records.length === 0) {
      grid.innerHTML = `<p class="loading">No published testimonials yet. Set a row's Status to "Published" in your Testimonials table to display it here.</p>`;
      return;
    }

    grid.innerHTML = data.records.map(record => {
      const fields = record.fields || {};
      const quote = escapeHTML(fields['Quote'] || '');
      const name = escapeHTML(fields['Client Name'] || 'A happy client');

      return `
        <div class="testimonial-card">
          <p>"${quote}"</p>
          <span class="testimonial-name">— ${name}</span>
        </div>`;
    }).join('');

  } catch (error) {
    console.error('Testimonials load error:', error);
    grid.innerHTML = `<p class="loading">Couldn't load testimonials right now. Check the Actions tab in your GitHub repo for errors.</p>`;
  }
}

renderServices();
renderGallery();
renderTestimonials();
