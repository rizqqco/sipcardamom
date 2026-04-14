/**
 * Cardamom – Shared components: nav, footer, mobile menu
 */
(function () {
  const isSubpage = window.location.pathname.includes('/pages/');
  const base = isSubpage ? '../' : '';

  const path = window.location.pathname;
  const active = {
    home:    !isSubpage && (path.endsWith('/') || path.endsWith('index.html')),
    about:   path.includes('about'),
    menu:    path.includes('menu'),
    events:  path.includes('events'),
    reviews: path.includes('reviews'),
    contact: path.includes('contact'),
  };

  function navItem(href, label, key) {
    return `<li><a href="${base}${href}"${active[key] ? ' class="active"' : ''}>${label}</a></li>`;
  }

  const navHTML = `
    <nav class="navbar">
      <a href="${base}index.html" class="logo"><img src="${base}assets/images/logo.png" alt="Cardamom – A Mobile Espresso Cart" class="logo-img"></a>
      <button class="hamburger" id="hamburger" aria-label="Toggle navigation menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links" id="nav-links">
        ${navItem('index.html',          'Home',    'home')}
        ${navItem('pages/about.html',    'About',   'about')}
        ${navItem('pages/menu.html',     'Menu',    'menu')}
        ${navItem('pages/events.html',   'Events',  'events')}
        ${navItem('pages/reviews.html',  'Reviews', 'reviews')}
        ${navItem('pages/contact.html',  'Contact', 'contact')}
        <li><a class="cta" href="${base}pages/contact.html">Book Now</a></li>
      </ul>
    </nav>`;

  const footerHTML = `
    <footer class="footer">
      <div class="footer-inner">
        <p class="footer-brand">cardamom.</p>
        <p class="footer-tagline">A mobile espresso cart &middot; New Jersey &amp; New York</p>
        <nav class="footer-nav" aria-label="Footer navigation">
          <a href="${base}index.html">Home</a>
          <a href="${base}pages/about.html">About</a>
          <a href="${base}pages/menu.html">Menu</a>
          <a href="${base}pages/events.html">Events</a>
          <a href="${base}pages/reviews.html">Reviews</a>
          <a href="${base}pages/contact.html">Contact</a>
        </nav>
        <div class="footer-social">
          <a href="https://www.instagram.com/sipcardamom" target="_blank" rel="noopener noreferrer" class="social-icon-btn instagram" aria-label="Follow Cardamom on Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="https://www.tiktok.com/@sipcardamom" target="_blank" rel="noopener noreferrer" class="social-icon-btn tiktok" aria-label="Follow Cardamom on TikTok">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.2 8.2 0 0 0 4.79 1.53V6.77a4.85 4.85 0 0 1-1.02-.08z"/></svg>
          </a>
        </div>
        <p class="footer-copy">&copy; 2026 Cardamom. All rights reserved.</p>
      </div>
    </footer>`;

  // Inject
  const navEl = document.getElementById('site-nav');
  if (navEl) navEl.innerHTML = navHTML;

  const footerEl = document.getElementById('site-footer');
  if (footerEl) footerEl.innerHTML = footerHTML;

  // Mobile hamburger (runs after injection)
  function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('nav-links');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNav);
  } else {
    initMobileNav();
  }
})();
