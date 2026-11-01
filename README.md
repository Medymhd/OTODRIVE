# Otodrive Website

Official website for **Otodrive** — an authorized Autogas system installer in Kenya offering vehicle LPG conversion, LPG fueling, diagnosis and system checks across the Otodrive–Petrocity network.

**Canonical public host:** https://www.otodriveafrica.com/

## Overview

The site is a static, multi-page marketing and conversion platform built for clarity, speed and trust. It presents Otodrive's services, conversion network, pricing and instalment offers, a savings calculator and the Zavoli Autogas kit in an interactive 3D view, and routes visitors to booking and quote requests.

## Tech stack

- Plain HTML, CSS and JavaScript — no build step, no framework dependencies.
- [MapLibre GL JS](https://maplibre.org/) for the interactive conversion and refueling network map (loaded on approach to the map, not on page load).
- [Three.js](https://threejs.org/) (loaded on demand) for the Zavoli kit 3D blueprint on `zavoli.html`.
- [EmailJS](https://www.emailjs.com/) for contact, quote and booking forms, with a `mailto:` fallback.
- Self-hosted Archivo and Instrument Sans (`fonts/`, woff2) — no third-party font requests.

## Local preview

Requires Node.js 20 or newer. There are no package dependencies.

```powershell
npm run preview
```

Open http://127.0.0.1:4173/

The preview server is for local review only.

## Repository layout

- Root — the live site (`index.html` + inner pages, `styles.css`, `pages.css`, `script.js`).
- `images/` — shared media, video and icons.
- `fonts/` — self-hosted woff2 font files.
- `legacy/` — archived previous-site reference (not part of the live site).
- `scripts/preview.mjs` — dependency-free local preview server.
- `zavoli_playground.html` — sandbox copy of the kit page for design iteration (noindexed).

## Key features

- Cinema-style hero with brand video and call-to-action.
- Service overview and conversion network map (conversion centres and LPG refueling stations).
- Stats band, savings calculator (petrol vs. LPG, monthly and yearly) and instalment offer module.
- Zavoli kit page with an interactive, scroll/auto-play 3D assembly view and component callouts.
- Contact, quote and booking forms wired to EmailJS with phone/email fallbacks.
- SEO: per-page titles and descriptions, canonical and Open Graph tags, `sitemap.xml`, `robots.txt`.

## Deployment

Static site — no build step. Production is **cPanel / Apache**; Render is a preview host only.

- **Production docroot:** `/home/otodriveafrica/public_html/`
- **Staging docroot:** `/home/otodriveafrica/public_html/staging/` (served at `https://staging.otodriveafrica.com/`)
- **Deploy config:** `.cpanel.yml` (explicit file allowlist; media and fonts synced, never re-encoded)
- **Trigger:** cPanel → Git Version Control → **Deploy HEAD Commit** on `main`

### First-time cPanel setup

1. cPanel → **Git Version Control** → clone `https://github.com/Medymhd/OTODRIVE`.
2. Set the deploy path in `.cpanel.yml` (`DEPLOYPATH`) to the staging docroot.
3. Deploy, then verify `https://staging.otodriveafrica.com/`.
4. Add the staging origin in EmailJS (Account → Security → allowed origins).

### Production cutover

1. Merge the release branch to `main`.
2. Change `DEPLOYPATH` to `/home/otodriveafrica/public_html/` and deploy.
3. Delete `/home/otodriveafrica/public_html/staging/` and remove the staging subdomain.
4. Confirm HTTPS, `www`, redirects, `robots.txt`, `sitemap.xml` and the 404 page.
5. Rollback = restore the `public_html` backup, or redeploy the previous commit.

Never edit files directly on the server; the repository is the source of truth.

## Notes

- Location data, addresses and hours should be verified before publishing.
- Forms depend on valid EmailJS service/template IDs; refresh if expired.
- Booking requests are confirmed by the team by phone or email.
- `playground.html` and `zavoli_playground.html` are noindexed and are not deployed.

