# Otodrive Website

**Status:** Redesigned site is live in the repository root; no production deployment.
**Baseline date:** 27 October 2026
**Canonical public host:** `https://www.otodriveafrica.com/`
**Source:** The original site was captured page-by-page from `https://www.otodriveafrica.com/` and is archived in `legacy/`. Hosting, DNS, mail and booking configuration are not included.

## Local preview

Requires Node.js 20 or newer. There are no package dependencies.

```powershell
npm run preview
```

Open <http://127.0.0.1:4173/>.

The redesigned site (light "Daylight / Molten" direction) is served from the repository root. It uses owner-provided location labels and pins derived from the owner's Google Maps links for review only; exact entrances, addresses and hours remain unconfirmed, and the map is not production data.

The homepage corporate film is `images/otodrive-corporate.mp4`, played on demand with sound. Forms send through EmailJS with a `mailto:` fallback; the EmailJS service/template IDs are currently stale and need refreshing (see open items).

The preview server is for local review only.

## Repository layout

- Root — the redesigned site (`index.html` + inner pages, `styles.css`, `pages.css`, `pages.js`, `script.js`).
- `images/` — shared media and video.
- `legacy/` — the archived original site (HTML, `css/`, `js/`, `contactscript.js`), kept for reference and not part of the live site.
- `docs/` — planning and audit documents.
- `scripts/preview.mjs` — dependency-free local preview server.

## Known open items

- Exact entrances, addresses and hours are unconfirmed; the map and location list are provisional.
- The EmailJS service/template IDs (`service_u7bdgwm` / `template_u57mj4b`) no longer exist on the account and need refreshing, or the forms should move to the owner's Microsoft 365/Exchange.
- Booking is a request that the team confirms by phone/email; there is no calendar or availability integration yet.
- Researched location coordinates are **not** published here as confirmed facts.

## Design originality

Apple, Nike and the owner's C.O.R.E project are reference points for qualities such as clarity, craft, restraint and pacing — not templates to copy. The redesign establishes an original Otodrive identity.

Three.js is used only for the Zavoli system blueprint on `zavoli.html`. It ships with a static image fallback, a reduced-motion layout and no additional runtime dependencies. Any further 3D or heavy motion work must follow the Phase 2D performance work and the Phase 2E design gate.

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
- `docs/PREMIUM_DESIGN_DIRECTION.md`
- `docs/DECISIONS_AND_OPEN_QUESTIONS.md`
