# Cardamom Website — Project Summary

Last updated: 2026-11-11. This file exists so a new Claude session (or new project) can get full context on this codebase without re-reading everything from scratch.

## What this is

A static marketing/booking website for **Cardamom**, a mobile espresso cart business serving events (weddings, corporate, private parties, farmers markets/pop-ups) across **New Jersey & New York**. Live at **www.sipcardamom.coffee** (apex `sipcardamom.coffee` redirects to `www`).

- Business phone: (908) 373-1069
- Business email: sipcardamom@gmail.com
- Instagram/TikTok: @sipcardamom
- Google Analytics: G-JC9WBB8BRN (gtag, on every page)
- GitHub repo: `rizqqco/sipcardamom` (branches: `main`, `Test`)
- Hosting: **Vercel** — pushing to `main` deploys the live site
- Local path: `~/Documents/1 Cardamom/sipcardamom`

## Tech stack

Plain HTML/CSS/JS, no framework, no build step or package manager.

- `index.html` — homepage
- `pages/about.html`, `pages/menu.html`, `pages/events.html`, `pages/contact.html`, `pages/reviews.html`, `pages/thank-you.html`
- `css/styles.css` (~1,480 lines, single stylesheet, all pages)
- `js/main.js` — injects shared nav + footer into `#site-nav` / `#site-footer` on every page, handles mobile hamburger menu
- `assets/icons/` (SVGs), `assets/images/` (JPGs for flavors, events, etc.)
- `robots.txt`, `sitemap.xml` — SEO
- Fonts: Playfair Display (headings) + Poppins (body) via Google Fonts, plus Cormorant Garamond for the nav logo text
- Icons: Font Awesome (CDN) + custom inline SVGs for social icons

### Design tokens (from `css/styles.css` `:root`)
- `--primary-color: #215732` (forest green), `--primary-dark: #174422`
- `--secondary-color` / `--accent-color: #fbf3e7` (cream/beige — also hero background)
- `--gold: #c9a96e`
- `--text-color: #2b2b2b`, `--muted-text: #666666`

### Contact form / booking flow
- Form on `pages/contact.html` posts to **Formspree** (`https://formspree.io/f/xnjokavl`).
- Submitted via `fetch()` (AJAX/JSON) with a JS handler in `contact.html`; `_next` field stripped from the AJAX payload so Formspree returns JSON instead of doing a redirect (this was a fixed bug — see history below).
- On success, JS redirects to `pages/thank-you.html` (which has `noindex` so it doesn't get indexed by search engines).
- Includes a hidden field capturing submission time in America/New_York timezone for accurate email timestamps.
- Required fields: name, email, event date, expected guests (range), event location. Optional: phone, event time, event type, exact guest count, drink checkboxes, preferred contact method, message.
- Client-side validation highlights empty required fields and scrolls to the first error.

## Business content

### Signature flavors (6, used across menu/homepage)
Gulab Jamun (cardamom, saffron, rose petals) · Algerian Baklava (honey, pistachio, orange blossom) · Cardamom (fresh ground green cardamom) · Cinnamon Bun (brown sugar, cinnamon, vanilla) · Spanish Latte (sweetened condensed milk) · Pistachio (roasted pistachio). Any flavor can be added to any drink.

### Drink menu (`pages/menu.html`)
- **Espresso drinks:** Espresso, Latte, Cappuccino
- **Coffee & cold:** Iced Coffee, Iced Latte
- **Matcha & specialty:** Matcha Latte, Karak Chai, Kashmiri Chai, Hot Chocolate
- **Refreshers:** Strawberry Mint Lemonade Spritz, Mango Dragonfruit
- Oat milk included at no extra charge; other milk alternatives available.

### Event packages (barista-staffed, shown on homepage + events page)
| Package | Guests / Duration | Price | Includes |
|---|---|---|---|
| Espresso Hour | Up to 40 · 2 hrs | Starting $750 | Full espresso bar, 2 flavors, milk alts, 2 baristas |
| The Gathering (Most Popular) | 50–100 · 2–2.5 hrs | Starting $900 | Full espresso bar, choice of 3 flavors, milk alts, 2 baristas, custom menu card |
| The Celebration | 100+ · 3+ hrs | Custom pricing | Full menu, all 6 flavors, branded cups, multiple baristas, custom experience design |

### Drop-off packages (no barista, self-serve — homepage only)
| Package | Serves | Price |
|---|---|---|
| The Basics | Up to 10 | Starting $175 |
| The Spread (Best Value) | Up to 25 | Starting $300 |
| Custom Order | Any size | Custom pricing |

Requires 48 hrs notice. Optional chai/matcha station add-on. Milk options: oat, whole, cream.

### Policies (from FAQ sections on events/contact pages)
- Minimum booking: 2 hours, no guest minimum
- Deposit: 25% non-refundable to secure date, remainder due day-of
- Lead time: 2–4 weeks for private events, 6–8 weeks for weddings
- Power: needs 2x standard 120V/15A outlets (up to 2,050W combined), ideally separate circuits; no plumbing needed (they bring their own water)
- Cart footprint: ~6×8 ft, indoor or outdoor
- Service area: NJ & NY primarily; will consider further out on request

### Reviews
`pages/reviews.html` has real 5-star Google reviews; homepage shows a subset (Nicole S., Andrea C., Ashi A., Laneisha S., Sarah H.). Links out to the business's Google Maps listing.

### SEO / structured data
- `LocalBusiness` JSON-LD schema on homepage (name, phone, email, logo, service area = NJ + NY, price range `$$`, social links)
- Per-page meta descriptions, canonical tags, Open Graph tags
- `sitemap.xml` lists 6 URLs (home + 5 pages), `robots.txt` allows all + points to sitemap
- `pages/thank-you.html` explicitly has `noindex` (not meant to be found in search)

## Notable history / decisions (from git log, ~122 commits since 2025-08-21)

Roughly chronological arc:
1. **Initial build** (Aug 2025) — basic index.html, icons, styles, a couple of mobile/alignment fixup PRs.
2. **April 2026 relaunch push** — reorganized files into `css/`, `js/`, `assets/icons/`, `assets/images/`, `pages/` (previously flat); renamed "syrups" → "flavors" sitewide (product terminology change); added drop-off packages section; replaced placeholder reviews with real Google reviews; added Reviews page; replaced Font Awesome social icons with inline SVGs for reliability; added Instagram/TikTok links; menu overhaul (removed flat white/London fog/French press/cold brew tonic, renamed chai → Karak/Kashmiri chai, replaced lemonade with Strawberry Mint Spritz + Mango Dragonfruit, milk simplified to oat); added birthday/bridal/baby shower mentions for SEO; replaced several emoji placeholders with real photos (about, wedding, private parties, corporate, pop-ups); switched hero/brand color from pink to the current beige (`#fbf3e7`); replaced text logo with image logo, then back to a styled text logo in nav; mobile menu redesigned as full-page overlay.
3. **Late April 2026 — booking form buildout & bugfixing**: added the full inquiry form (drink checkboxes, guest count, event time, preferred contact), switched from native form redirect to AJAX/fetch submission with a custom thank-you page (several iterative fixes: iOS date/time input height/overflow, `_next` field breaking Formspree JSON response, mobile submit button width), added ET timestamp field, SEO pass (structured data, sitemap, robots.txt, canonical tags, H1), Google Analytics added sitewide, added mandatory Event Location field, noindexed thank-you page.
4. **May 2026 — package refinements**: made phone/email clickable links on contact page; tightened package details — Espresso Hour capped at 40 guests, Celebration duration changed 4+→3+ hrs, Gathering duration changed 3→2.5 hrs then to a 2–2.5 hr range with 50–100 guests, "professional barista" wording replaced with "2 baristas", matcha mentions removed from Gathering package copy (both index and events pages) since matcha isn't part of that package's included flavors.
5. **October 2026 — price increase** (2026-10-12): Espresso Hour raised $600 → $750 and The Gathering raised $800 → $900, on both `index.html` and `pages/events.html`.
6. **November 2026 — barista wording** (2026-11-11): packages intro on home and events pages changed from "a professional barista" to "professional baristas" to match the "2 baristas" package cards; menu page closing line updated the same way.

**Current state (as of last commit, 2026-11-11):** site is live on Vercel, fully responsive, form-integrated via Formspree, SEO-tagged, and analytics-tracked. No open/in-progress work is evident from the repo itself — check with Faisal for what's next.


## Working conventions

- Package details (names, guests, duration, price, inclusions) are duplicated on `index.html` and `pages/events.html` — always change both.
- Shared nav/footer live in `js/main.js`, not in each page.
- Don't commit `.DS_Store` changes.
- Keep this file up to date whenever site content or structure changes.

## Where to look for more detail

- Full commit history: `git log --reverse` in this repo for the complete step-by-step evolution.
- `.claude/settings.local.json` — previously-approved Bash command patterns (mostly one-off `sed` renames from the "syrups→flavors" migration; not needed going forward).
