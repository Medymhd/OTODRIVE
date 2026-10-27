# Otodrive Website

**Status:** Clean project baseline; Phase 0/2A in preparation. No production deployment.
**Baseline date:** 27 October 2026
**Canonical public host:** `https://www.otodriveafrica.com/`
**Source of this baseline:** Public live site at `https://www.otodriveafrica.com/`, captured page-by-page and asset-by-asset. This is not a server-side backup; hosting, DNS, mail and booking configuration are not included.

## Local preview

Requires Node.js 20 or newer. There are no package dependencies.

```powershell
npm run preview
```

Open <http://127.0.0.1:4173/>.

The preview server is for local review only. It does not execute the production form transport, booking API, DNS redirects or server headers.

## What is in the baseline

- The public live pages, including `booking.html`, `navbar.html` and the live-only scripts.
- The same-origin CSS, JavaScript, images and video referenced by those pages.
- Six Phase 1 audit and planning documents in `docs/`.
- A dependency-free local preview server.

## Known baseline defects

These are intentionally preserved in the baseline so they can be fixed and verified in Phase 2A–2D:

- `contactscript.js` runs before the form and throws a `TypeError`.
- The contact page has a legacy fallback to the missing `send_email.php`.
- EmailJS and the booking API are not configured for local delivery.
- Hotjar and Clarity use placeholder IDs; the homepage throws a `ReferenceError` and Clarity returns HTTP 400.
- The homepage autoplays a roughly 47 MiB hero video.
- Several live assets return 404: `images/fevicon.png`, `fonts/BalooChettan-Regular.ttf`, `css/swiper.min.css` and legacy CSS-relative images.
- The canonical URL points to the non-resolving `https://otodrive.co.ke/`.
- Researched location coordinates are **not** published here as confirmed facts.

## Design originality

Apple, Nike and the owner’s C.O.R.E project are reference points for qualities such as clarity, craft, restraint and pacing — not templates to copy. The redesign must establish an original Otodrive identity and must not reuse another brand’s layout, assets, copy or visual signature.

Three.js is not part of the baseline. Any 3D or heavy motion work must follow the Phase 2D performance work and the Phase 2E design gate, with a static fallback and reduced-motion support.

## Cost constraint

No new paid subscriptions. The intended stack uses the existing hosting and Microsoft 365/Exchange mailbox where possible, plus free/open-source components. Free-tier quotas must be documented and monitored; form failures must be visible and provide a phone/email fallback.

## Deployment

No deployment, DNS change, EmailJS change, Exchange change or booking API change has been made. Staging and production require separate access and approval. Do not push this history to a public remote until the location research, public keys and privacy material have been reviewed.

## Documentation

- `docs/PROJECT_AUDIT.md`
- `docs/CONTENT_AND_ASSET_INVENTORY.md`
- `docs/MODERNIZATION_ROADMAP.md`
- `docs/LOCATIONS_INTEGRATION_PLAN.md`
- `docs/ONLINE_PRESENCE_PLAN.md`
- `docs/DECISIONS_AND_OPEN_QUESTIONS.md`
