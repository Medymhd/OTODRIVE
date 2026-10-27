# Otodrive Website — Premium Design Direction

**Status:** Phase 2E discovery proposal — light-mode, original direction. No production redesign has been applied.
**Date:** 27 October 2026
**Inputs:** C.O.R.E landing page (reference only), current Otodrive live site, owner direction, existing Otodrive photography and content.
**Constraint:** $0 new subscriptions. Use existing assets, free/open-source fonts and libraries, and the existing hosting.

---

## 1. Design thesis

Otodrive should feel like a **precision automotive brand in daylight**, not a dark SaaS dashboard and not a copy of Apple or Nike.

The direction is:

> **Daylight precision. Warm paper, graphite type, real workshop photography, one molten-orange signal.**

The site should feel calm, expensive and physical. The product is a real conversion performed by real technicians on real vehicles. The design should let that work carry the premium feeling instead of hiding it behind generic gradients, glass cards or a 3D globe.

### Why light mode

- Apple and Nike’s most recognisable brand moments are high-key: white/neutral space, strong photography, oversized type and very few colours.
- Otodrive’s strongest assets are daylight photographs of vehicles, technicians and the Mavoko station. A light canvas lets those photographs lead.
- A dark-first site would repeat C.O.R.E’s SaaS aesthetic and make Otodrive look like a software product rather than a conversion workshop.
- Light mode is not “plain”. Premium light design depends on precise spacing, type scale, image treatment and restraint.

C.O.R.E’s dark mode is a useful reference for **narrative discipline and technical guardrails**, not for Otodrive’s visual identity.

---

## 2. C.O.R.E landing page audit

Audited from the local C.O.R.E project on 27 October 2026. No C.O.R.E files were modified.

### What C.O.R.E does well

1. **Narrative sequencing.** The page runs as acts: hero, proof, problem, WhatsApp spotlight, live operations, dashboard preview, platform bento, scale, verticals, pricing, roadmap, contact, FAQ, final CTA.
2. **One strong opening statement.** “Your entire operation. One Core.” is short, specific and visually dominant.
3. **Proof before features.** The numbers strip appears immediately after the hero.
4. **Product evidence.** Dashboard and WhatsApp mockups show the product instead of only describing it.
5. **Motion restraint.** The 3D scene is lazy-loaded, paused off-screen and when the tab is hidden, and has a static fallback.
6. **Performance and accessibility guardrails.** Reduced-motion handling, WebGL failure fallback, an explicit 3D kill switch, semantic sections and accessible labels.
7. **A clear close.** The final CTA is a single high-contrast panel with one primary action.

### What not to copy

- **The dark blue/cyan SaaS palette.** It belongs to C.O.R.E, not Otodrive.
- **The 3D globe.** A rotating network globe is a generic “technology” signifier and says nothing about vehicle conversion.
- **The glass pill nav and bento-card language.** Useful for a SaaS platform; too generic for an automotive workshop.
- **Dashboard-first language.** Otodrive is a physical service business, not a software dashboard.
- **Dense section stacking.** C.O.R.E has many sections; an Otodrive page should breathe more and show fewer, stronger ideas.
- **The account/register CTA model.** Otodrive’s primary action is a conversation or a booking, not “Get started / Sign in”.

### What to borrow as principles

- one dominant idea per viewport;
- proof and real evidence close to the claim;
- progressive disclosure instead of dumping everything at once;
- motion that supports hierarchy, not motion as decoration;
- static fallbacks for every heavy effect;
- a deliberate final CTA.

---

## 3. Current Otodrive audit

### Strengths to preserve

- Real workshop and vehicle photography: the Prado on the lift, the technician with the diagnostic laptop, the station canopy.
- A clear service set: LPG fueling, Autogas system installation, vehicle diagnosis, LPG system check.
- The orange signal already used on the live site (`#fda417`).
- A real locations story: Mavoko, Thika, Petrocity service points and the separate Jomvu Yard conversion centre.
- Existing brand logo, phone, email and service copy.
- The work is tangible: lifts, tools, conversions, fuel stations.

### Problems to fix through design

- The 47 MiB autoplay hero video dominates the experience and works against a premium feel.
- The current page uses a template/card language with many competing boxes.
- Inconsistent spacing, type sizes and image crops.
- Placeholder or duplicated content in places.
- Mobile hero readability and footer crowding.
- Broken or missing assets and scripts, which must be fixed before visual polish.
- The current logo is blue/green while the interface accent is orange. The redesign must make that relationship deliberate rather than accidental.

### Design implications

- Lead with photography and type, not effects.
- Replace the video with a poster-first hero and an optional short compressed loop.
- Use the logo as a jewel; do not recolour or redraw it.
- Use orange sparingly as a signal: one CTA, one line, one active state.
- Keep the warm white canvas consistent across pages.

---

## 4. Visual direction: “Daylight / Molten”

### Keywords

**Precise, warm, engineered, human, quiet, kinetic, Kenyan, confident.**

### Colour system

| Token | Value | Use |
|---|---|---|
| `--paper` | `#f7f4ee` | Page background |
| `--surface` | `#fffdf8` | Cards and elevated surfaces |
| `--ink` | `#171512` | Primary text |
| `--ink-soft` | `#3a3630` | Secondary headings |
| `--muted` | `#706b62` | Body copy |
| `--line` | `#ded8cc` | Hairlines and borders |
| `--orange` | `#fda417` | Primary signal / CTA |
| `--orange-deep` | `#c96a0a` | Hover/pressed orange |
| `--charcoal` | `#11100e` | Footer and high-contrast panels |
| `--success` | `#3f6b4f` | Confirmations only |

Do not introduce C.O.R.E blue/cyan. Do not use orange on large body areas; it should feel like a signal, not a theme.

### Typography

- **Display:** Archivo (open-source, OFL) — strong grotesque, tight tracking, excellent at large sizes.
- **Body:** Instrument Sans (open-source, OFL) — calm, readable, slightly warmer than Inter.
- **Fallback:** system UI sans.

Suggested scale:

| Role | Size |
|---|---|
| Hero display | `clamp(4.2rem, 10vw, 9.5rem)` |
| Section display | `clamp(2.4rem, 5vw, 5rem)` |
| Heading | `clamp(1.5rem, 2.5vw, 2.25rem)` |
| Body large | `1.125–1.35rem` |
| Body | `1rem` |
| Label | `0.72rem`, uppercase, `0.18em` tracking |

Use tight display tracking (`-0.04em` to `-0.06em`) and generous body line-height (`1.6–1.75`).

### Grid and spacing

- 12-column grid, max width 1440px.
- 24px gutters on mobile, 40–64px on desktop.
- 8px spacing base; section spacing `clamp(5rem, 10vw, 10rem)`.
- Hairline rules instead of shadows for structure.
- Images bleed to the grid edge, not into generic rounded cards everywhere.

### Photography

- Use the real Otodrive photographs, colour-graded warm and slightly desaturated.
- Hero: Prado on the lift or the station canopy, cropped tight and treated like an editorial image.
- Projects: full-bleed image pairs, not six identical cards.
- People at work: the technician with the diagnostic laptop is a strong “human precision” image.
- Avoid stock-photo-looking imagery, fake 3D renders and generic EV/globe visuals.
- Every image needs meaningful alt text and a caption where useful.

### Motion

- One signature motion: a thin orange line drawing across the hero, then settling into the navigation/CTA.
- Subtle image scale on scroll (`1.0 → 1.04`), never a full parallax hijack.
- Staggered text reveals with 40–80ms offsets.
- No smooth-scroll hijacking by default. Native scroll remains fast and accessible.
- All motion respects `prefers-reduced-motion` and has a static state.
- No autoplay video with sound; no 3D on first load.

### Component language

- Header: white/paper translucent bar, thin bottom rule, logo left, compact nav, one orange pill CTA.
- Buttons: orange pill primary, graphite text link secondary with a thin underline.
- Cards: paper surface, 1px line, sharp 2–6px radius or no radius. Avoid glassmorphism.
- Forms: visible labels, generous fields, clear focus ring, inline errors.
- Footer: charcoal panel with the logo, contact details and one clear CTA.
- Icons: simple line icons only where they add meaning; no icon fonts.

---

## 5. Page architecture

| Page | Design role |
|---|---|
| Home | Cinematic daylight hero, service proof, project gallery, conversion story, location/contact CTA |
| About | Editorial brand story, people/workshop photography, partnership and standards evidence |
| Services | Four large service chapters with real detail and clear next step |
| Projects | Full-bleed project stories, vehicle/context captions, no placeholder cards |
| Testimonial | Editorial quotes, readable type, consent-approved names only |
| Contact | Text-first location/contact card, form, map consent gate |
| Get a Quote | Short, confidence-building form with visible progress/errors |
| Maps | Verified location index, directions, hours, service labels |
| Booking | Calm request-and-confirm flow, no fake availability |

### Homepage sequence

1. **Hero** — one headline, one paragraph, two actions, one strong image.
2. **Service signal strip** — four services as a thin editorial index.
3. **The work** — one large project image and one supporting image.
4. **Why Otodrive** — the existing about paragraph, presented as an editorial statement.
5. **The conversion** — a simple, factual three-step explanation using approved content.
6. **Projects** — three to six real images with captions.
7. **Testimonials** — one or two strong quotes, not a carousel of six.
8. **Locations** — text-first network card; only verified sites published.
9. **Final CTA** — book a conversation, call, or request a quote.

No section should exist only to fill space.

---

## 6. Library and theme evaluation

All candidates below are free/open-source or free to use. No paid theme or subscription is required. Verify licenses and current terms before production.

| Option | License / cost | Use | Decision |
|---|---|---|---|
| Native CSS + `IntersectionObserver` | Browser-native, $0 | Reveals, image scale, line draw, sticky sections | **Primary choice** |
| Motion (formerly Motion One / Framer Motion) | MIT | Small JS animations, scroll-linked effects | Optional; use only if CSS is insufficient |
| GSAP | Free for all users, including commercial; closed source, Webflow-owned | Complex timeline/ScrollTrigger work | Not default. Use only for one sequence if necessary; license can change |
| Lenis | MIT, under 5 KB | Smooth scroll | Skip by default; adds accessibility/performance risk without a clear payoff |
| Embla Carousel | MIT | Accessible carousel if one is truly needed | Consider instead of a custom carousel |
| Swiper | MIT | Carousel/slider | Avoid unless a specific feature requires it; current site already has a broken Swiper dependency |
| Three.js | MIT | 3D/WebGL | **Defer**. No 3D in the first redesign |
| React Three Fiber / OGL | MIT | React/lighter WebGL | Defer with Three.js |
| Tailwind CSS | MIT | Utility CSS | Not required for a static site; use CSS tokens instead |
| shadcn/ui / Radix | MIT | React components | Not applicable to the current static stack |
| Lucide / Phosphor icons | ISC / MIT | Line icons | Optional; use sparingly |
| Archivo / Instrument Sans | SIL OFL | Display/body type | **Recommended**, self-hosted |

### Why no Three.js in the first release

A 3D scene would not explain Otodrive better than a real photograph of a Prado on a lift. It would add weight, battery cost, accessibility risk and maintenance. Revisit 3D only if:

- the 2D hero meets the performance budget;
- the 3D communicates something specific, such as an exploded Autogas system;
- there is a static fallback;
- reduced-motion is respected;
- mobile performance is measured on a mid-range device.

A polished 2D motion system is the stronger premium result here.

---

## 7. Reference pages and themes

Study the **thinking**, never copy the layout, assets or code:

- Apple product pages — light canvas, product-first photography, sticky feature storytelling, restrained motion.
- Nike editorial campaigns — bold typographic scale, athlete/product hero, high-contrast cropping, few colours.
- Polestar / Rivian — automotive calm, technical confidence, spacious light layouts.
- Linear / Vercel — precision, hierarchy and interface craft.
- Stripe — clear product explanation with excellent typography and diagrams.
- Awwwards / Godly / Land-book — pattern research only; do not copy templates or visual signatures.
- C.O.R.E — narrative sequencing and performance guardrails only.

No paid theme, template or stock asset should be purchased without owner approval. The design must be original Otodrive.

---

## 8. Performance and accessibility budgets

| Metric | Target |
|---|---|
| Hero media | ≤ 2.5 MB, poster-first |
| LCP (mobile lab) | ≤ 2.5 s |
| CLS | ≤ 0.1 |
| INP (lab proxy) | ≤ 200 ms |
| Initial JS | ≤ 150 KB compressed |
| Fonts | Self-hosted, subset, `font-display: swap` |
| Motion | `prefers-reduced-motion` supported |
| Contrast | WCAG 2.2 AA |
| Keyboard | Full journey without a mouse |
| Forms | Visible labels, errors, success states |
| Map | Consent-gated, text alternative |

The existing 47 MiB hero video is excluded from the design. A short compressed loop or a still poster is required.

---

## 9. Prototype scope

The first prototype should prove the direction with one page, not the whole site:

- header and light-mode hero;
- one service index strip;
- one full-bleed project section;
- one editorial “why Otodrive” section;
- one final CTA;
- responsive at 360, 390, 768, 1024 and 1440 px;
- static/reduced-motion mode;
- real Otodrive images and existing copy.

Only after the prototype is approved should the full page set be rebuilt.

---

## 10. Locations as a premium product surface

Locations should not be an afterthought map embed in the footer. For a multi-site service brand, the location network is a product surface: it needs its own hierarchy, search, service filtering, detail pages and operational truth.

### What large brands do

| Brand pattern | What they do | What Otodrive should adapt |
|---|---|---|
| Apple Store locator | Search, list/map toggle, store detail pages, appointments, accessibility and service information | A text-first index with service filters and a strong detail page |
| Nike store locator | Store search, services/events, local photography and clear direction links | Editorial cards with real workshop/station photography |
| Tesla / Rivian “Find us” | Separate sales, service and charging locations; filters; map and list | Separate Otodrive conversion from Autogas LPG fueling |
| Starbucks store locator | Search by area, opening hours, amenities, mobile-first list | “Open now” only from verified hours; call-to-confirm when unknown |
| Multi-brand retail groups | Central location data, consistent NAP, local pages and listing sync | One structured data source; Google Business Profile updated manually |

The premium feeling comes from **consistency and clarity**, not from a more complicated map. Large brands make it obvious which location does what, whether it is open, how to get there and what happens next.

### Recommended Otodrive model

Use three layers:

1. **Homepage network section** — a short editorial introduction to the network, with a few location cards and one “View all locations” link.
2. **Locations index** — search by area, filter by service, list-first with an optional map.
3. **Location detail page** — one page per verified site, with everything a customer needs to visit or book.

Do not create one giant map with seven unverified pins. Do not use a pin to represent a service that has not been confirmed at that site.

### Service model

Every location card and page must show the service types separately:

- **Otodrive conversion**
- **Autogas LPG fueling**
- **Both** only where the owner has confirmed both

Jomvu and Jomvu Yard remain separate records and separate cards. A Petrocity station that sells LPG is not automatically an Otodrive conversion centre.

### Homepage network section

Place it after the project gallery and before the final CTA.

Suggested composition:

- eyebrow: “The network”
- headline: “One standard. Several places to start.”
- short paragraph: the owner-approved network summary
- three to five location cards, not all seven at once
- service tags on every card
- “View all locations” link
- no map on the homepage unless every pin is verified

Card anatomy:

```text
Mavoko
Otodrive conversion · Autogas LPG
Mombasa Road, Mavoko
Open now · Directions ↗
```

If hours or services are not verified, the card says “Call to confirm” rather than inventing a status.

### Locations index

Desktop:

- left: search and service filters, then the list of locations;
- right: a sticky map that loads only after consent;
- map/list toggle for users who prefer one view.

Mobile:

- search and filters first;
- list first;
- “Show map” button, never an auto-loaded map;
- no automatic geolocation prompt.

The list must be complete and useful without JavaScript or the map.

### Location detail page

Each verified site gets:

- a large real photograph of the site or workshop;
- location name and area;
- service tags;
- full address and landmarks;
- hours, with “Open now” computed from verified data;
- phone and directions;
- a consent-gated map;
- “Book a conversion” only where conversion is available;
- “Call to confirm” or “Request an appointment” where appropriate;
- accessibility, parking and what-to-bring notes when verified;
- nearby locations;
- `LocalBusiness`/`AutoRepair` structured data from the same record.

Do not create thin pages for unverified or duplicate locations.

### Map strategy under a $0 constraint

- Use the free **Google Maps Embed** on individual verified location pages, consent-gated.
- Keep the locations index text-first; do not add a paid dynamic map or paid tile provider.
- A schematic “network” graphic can be designed without pretending to be a geographic map.
- If a searchable map is approved later, re-check Google Maps JS, MapLibre/MapTiler and Mapbox pricing and terms immediately before selection.
- Never use OpenStreetMap public tiles in production.

### What makes it feel expensive

- real site photography, not generic map screenshots;
- consistent location cards with strong typography and hairline rules;
- service tags that are instantly scannable;
- exact microcopy for open/closed/unknown states;
- one clear primary action per location;
- map styling and consent that feel native to the page;
- good empty, loading and error states;
- no pin clutter, no fake precision, no “coming soon” placeholders in production.

### SEO and operations

- One indexable page per verified site only.
- Unique address, services, hours and local content on each page.
- Consistent NAP across the site, Google Business Profile and Apple Maps.
- One structured location record drives the card, page, JSON-LD and sitemap.
- Update Google Business Profile separately after publishing.
- Keep Jomvu and Jomvu Yard separate in data, URLs, titles and schema.

### Implementation order

1. Verify the seven site records and service split.
2. Build the location data file and validation.
3. Design the location card and index pattern.
4. Build the index and detail pages from the same data.
5. Add consent-gated embeds only for verified entrances.
6. Test keyboard, screen reader, mobile, slow network and map failure.
7. Update Google Business Profile and local listings.

This is the difference between a generic “Find us” page and a network that feels operated, maintained and trusted.

---

## 11. Open decisions

1. Approve **Daylight / Molten** as the direction, or choose an alternative.
2. Confirm the existing logo remains unchanged on the light canvas.
3. Confirm which claims/copy can be used in the prototype (40% savings, 24/7, partnership claims, etc.).
4. Confirm whether the hero uses the Prado-on-lift image or the station canopy image.
5. Confirm fonts: Archivo + Instrument Sans, self-hosted.
6. Confirm no Three.js in the first release.
7. Confirm the final CTA: booking, quote, call, or a combination.
8. Approve the service-filter labels and whether the locations index includes a map or is list-first.
9. Approve the location photography and confirm which sites can be shown publicly.

---

**End of direction. No production redesign has been applied.**
