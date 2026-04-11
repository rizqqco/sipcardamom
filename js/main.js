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
      <a href="${base}index.html" class="logo">cardamom.</a>
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
            <i class="fa-brands fa-instagram"></i>
          </a>
          <a href="https://www.tiktok.com/@sipcardamom" target="_blank" rel="noopener noreferrer" class="social-icon-btn tiktok" aria-label="Follow Cardamom on TikTok">
            <i class="fa-brands fa-tiktok"></i>
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
