// ============================================
// NAIL TECH TEMPLATE — site behavior
// Don't touch this file unless you know JS — everything you need to edit lives in index.html and style.css
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
