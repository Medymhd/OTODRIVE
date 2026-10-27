# Otodrive Website — Locations Integration Plan

**Phase:** 1 — Discovery and audit  
**Date:** 27 October 2026  
**Status:** Proposal for owner review — location research added; no location data has been published as confirmed  
**Companion documents:** `PROJECT_AUDIT.md`, `CONTENT_AND_ASSET_INVENTORY.md`, `MODERNIZATION_ROADMAP.md`, `ONLINE_PRESENCE_PLAN.md`, `DECISIONS_AND_OPEN_QUESTIONS.md`

---

## 1. Purpose

This plan defines how Otodrive should present physical locations without publishing unverified business facts. It covers:

- what the site currently says about locations;
- the owner-listed seven-site service network and the research status of each site;
- what is verified, inferred and unknown;
- a data model for one or many locations;
- mapping-provider options with current pricing and licence notes;
- UX, accessibility, performance, privacy and SEO requirements;
- a phased implementation approach;
- the owner verification checklist.

**Hard rule:** no address, coordinate, opening hour, phone number, service availability or location name will be invented. If a field is unknown, it stays empty and is not published.

**Owner-supplied starting point:** seven service points across Petrocity sites, with Otodrive conversion and Autogas LPG fueling treated as separate services. Research findings and provisional evidence are in §12.8–12.10; unresolved owner actions are in §13.

---

## 2. Current state

### 2.1 What the site shows

| Item | Current value | Where | Status |
|------|---------------|-------|--------|
| Location name | “OtoDrive Autogas fueling and conversion Center, Mavoko” | Google Maps embed title, map page | Published |
| Map pin | `-1.4297154, 36.9601985` | Google Maps embed, JSON-LD | Published; source unknown |
| Address | “Mavoko, Nairobi, Nairobi, 00100, KE” | JSON-LD | Published; internally inconsistent |
| Phone | `+254 704 644 909` | Header/footer/contact blocks | Published; ownership unconfirmed |
| Email | `info@otodrive.co.ke` | Header/footer/forms | Published; MX exists via Microsoft 365; mailbox monitoring unknown |
| Hours | “24/7 support”; JSON-LD 24/7 | Meta, JSON-LD | Published; conflicts with booking |
| Booking hours | Mon–Fri 08:00–17:00; Sat 08:00–12:00; Sun closed | `booking.js` | Coded; not published as policy |
| Locations shown | One map pin (Mavoko) | Map | Published; owner lists seven service points |
| Owner-listed network | Thika, Mavoko, Kangundo Road, Rongai, Shanzu, Jomvu, Jomvu Yard | Owner brief, 27 October 2026 | Owner-provided; not yet verified or published |
| Directions | Map iframe only | Contact/quote/map pages | No text directions |
| Address text | None | — | Missing |
| Parking/accessibility | None | — | Unknown |
| Location-specific pages | None | — | Missing |

### 2.2 What is actually verified

**Verified:**

- The live site embeds a Google Maps place labelled “OtoDrive Autogas fueling and conversion Center Mavoko”.
- The same embed coordinates appear in the homepage JSON-LD.
- The phone number and email are repeated site-wide.
- The booking script hard-codes weekday/Saturday hours and closes Sunday.
- The site claims 24/7 support in metadata and structured data.
- The live canonical host (`otodrive.co.ke`) has no A record and does not serve the website; the working host is `otodriveafrica.com`.
- The owner-supplied Jomvu Yard map link resolves to the Otodrive “AUTOGAS CONVERSION CENTRE JOMVU” listing at `-4.0073924, 39.5965528`, about 95 m from A.O. Bayusuf & Sons.

**Owner-provided, not independently verified:**

- The network comprises seven service points: Thika, Mavoko, Kangundo Road, Rongai, Shanzu, Jomvu and Jomvu Yard.
- Thika and Mavoko offer both Otodrive conversion and Autogas LPG fueling.
- Kangundo Road, Rongai, Shanzu and Jomvu are Autogas LPG fueling only.
- Jomvu Yard is Otodrive conversion only and is distinct from Jomvu.
- Jomvu Yard is along the Mombasa–Nairobi Highway in the Jomvu area of Mombasa, immediately beside the A.O. Bayusuf & Sons Ltd logistics yard.
- No site should be assumed to offer both services unless the owner confirms it.

**Inferred:**

- The live site currently publishes only the Mavoko map pin; the owner describes a wider network.
- The JSON-LD address was assembled from the map pin and a Nairobi postal code, not from a verified address.
- The 24/7 claim is marketing language, not an operational schedule.

**Unknown:**

- Exact street address, building name, plot number and landmarks.
- Whether the pin is the entrance, the canopy, the workshop or an approximate area.
- Official opening hours, including holidays.
- Whether the phone number is the primary location line or a general line.
- Whether `info@otodrive.co.ke` receives mail and who monitors it.
- Whether the seven owner-listed sites are current, and whether any additional sites exist.
- Whether the Mavoko site offers all four services at all times, and how its conversion and fueling hours differ.
- Parking, accessibility, payment methods and walk-in policy.
- The Google Business Profile owner(s), how many listings exist, and whether they match each site.

### 2.3 Why this matters

- Local search depends on consistent name, address and phone (NAP) data. The current JSON-LD conflicts with the map and with common knowledge about Mavoko’s county.
- A wrong pin sends customers to the wrong place.
- Publishing “24/7” when booking is closed on Sunday damages trust.
- Labelling every Petrocity site as an Otodrive conversion centre would send customers to the wrong service point and misrepresent the network.
- Google may ignore or distrust structured data that disagrees with the Business Profile.
- Under the Kenya Data Protection Act 2019, precise location and contact data must be handled transparently.

---

## 3. Scope and definitions

### 3.1 What counts as a location

A location is a physical place where a customer can:

- refuel with LPG;
- book or receive a conversion/service;
- speak to staff in person;
- or collect a vehicle.

A PO Box, registered office or informal “service area” is not a customer-facing location unless the owner explicitly wants it published as one.

### 3.2 Single vs multi-location

The current site shows one map pin. The owner lists seven service points across Petrocity sites. The plan must support a network and must keep Otodrive conversion and Autogas LPG fueling as separate service flags. Do not assume every site offers both. Implementation should start with verified records and publish only sites the owner has approved.

---

## 4. Recommended approach

### 4.1 Recommendation for review

**For the current owner-listed network:**

1. Start with a text-first location index and one record per site.
2. Use Google Maps Embed on individual site pages as the current free option; load each map only after the visitor clicks “Show map” (consent gate).
3. Do not eager-load seven map iframes on one page. If a searchable locator is required, evaluate **Google Maps JavaScript API** or **MapLibre GL JS + MapTiler** after every record is verified.
4. Store the sites in one structured data file, not duplicated across pages.
5. Add `LocalBusiness`/`AutoRepair` structured data only after every field is verified.
6. Keep Otodrive conversion and Autogas LPG fueling as separate service flags. Never imply both at every site.
7. Link booking to the correct site record and that site’s verified hours.

**If a searchable locator is approved later:**

- Evaluate **MapLibre GL JS + MapTiler** (commercial Flex plan) or **Google Maps JavaScript API**, depending on budget and Google Business Profile usage.
- Do not use OpenStreetMap public tiles in production.
- Do not build the locator until the seven records are verified and the owner approves the extra scope.

### 4.2 Why not redesign the map now

The current Mavoko map works. The problem is not the provider; it is the missing verified address, the contradictory hours, the unverified seven-site network and the lack of a text alternative. Changing providers before fixing the data would add cost and risk without improving the customer experience.

---

## 5. Mapping provider comparison

Prices and terms were checked on 27 October 2026. They change frequently; confirm before purchase.

| Provider | Best for | Free tier | Paid pricing | Commercial use | Effort | Lock-in | Recommendation |
|----------|----------|-----------|--------------|----------------|--------|---------|----------------|
| **Google Maps Embed API** | One map or a small number of per-page embeds | Free, unlimited embeds | $0 | Allowed under Google terms | Very low | Low | **Recommended for the current Mavoko page and per-site pages; not for seven eager embeds** |
| **Google Maps JavaScript API / Dynamic Maps** | Rich maps, Places, Street View, locator | 10,000 map loads/month, then $7 per 1,000 | Usage-based | Allowed under Google terms | Medium | Medium | Consider for multi-location or Google Business Profile integration |
| **Mapbox GL JS** | Custom-styled maps, high design control | 50,000 map loads/month, then $5 per 1,000 | Usage-based | Allowed under Mapbox terms | Medium–high | Medium | Good alternative if custom styling matters |
| **MapTiler + MapLibre GL JS** | Open-source stack with managed tiles | 5,000 sessions/month, non-commercial only | Flex from $30/month for 25,000 sessions | Commercial plan required | Medium | Low–medium | Best open-stack option if a locator is approved |
| **Stadia Maps + Leaflet/MapLibre** | Low-cost maps | 200,000 credits, **no commercial use** | Starter from $20/month | Paid plan required | Medium | Low–medium | Not recommended for a commercial site on the free tier |
| **OpenStreetMap public tiles** | Prototyping only | “Free” but policy-limited | N/A | **Not suitable for production** | Low | Low | Do not use |
| **Self-hosted tiles (Leaflet/MapLibre)** | Full control, offline/private | Software free | Server/storage/ops cost | Allowed | High | Low | Only with a serious ops budget |
| **Leaflet** | Lightweight map library | BSD-2-Clause | Free | Allowed | Low–medium | Low | Good library; still needs a tile provider |
| **MapLibre GL JS** | Open-source vector maps | BSD-3-Clause | Free | Allowed | Medium | Low | Good library; still needs a tile provider |

### 5.1 Notes on each option

**Google Maps Embed API**

- The basic embed used today (`google.com/maps/embed?pb=...`) is free and does not require a billing account.
- It is the least-effort option and matches user expectations.
- Customisation is limited; Google branding and attribution must remain.
- The embed sets Google cookies, so it should be consent-gated.
- Google’s terms prohibit scraping, hiding attribution or misusing the embed.

**Google Maps JavaScript API**

- Needed for custom markers, clustering, store locator search, directions and Places.
- The free monthly map-load allowance and per-1,000 price must be monitored; a busy locator can exceed it.
- Requires an API key, billing account, API restrictions and quota alerts.
- Good if the owner wants Google Business Profile reviews/photos integration.

**Mapbox**

- Strong styling and mobile performance.
- Requires an access token; restrict it by URL and scope.
- The free tier is generous for a small site, but pricing and terms should be reviewed.
- Not necessary until a searchable locator is approved.

**MapTiler + MapLibre**

- Open-source rendering with commercial tile hosting.
- The free tier is **non-commercial**, so a commercial Otodrive site must use a paid plan.
- Flex at $30/month for 25,000 sessions is reasonable for a locator; confirm overage pricing.
- Good exit path: MapLibre is BSD-3-Clause, and the data can be moved to another tile provider.

**Stadia Maps**

- Free credits are generous but the free tier excludes commercial use.
- Starter at $20/month is affordable, but the ecosystem is smaller.
- Only worth evaluating if MapTiler/Mapbox pricing becomes a problem.

**OpenStreetMap public tiles**

- The OSM Foundation’s tile usage policy explicitly targets hobby/small-scale use and forbids heavy or commercial use without permission.
- A production business site should not rely on `tile.openstreetmap.org`.
- Use a commercial tile provider or self-host.

**Leaflet / MapLibre**

- Both are open-source libraries, not tile providers.
- Leaflet is BSD-2-Clause; MapLibre GL JS is BSD-3-Clause.
- Choosing a library does not solve hosting, styling, geocoding or terms.

### 5.2 Cost scenarios (indicative)

| Scenario | Recommended provider | Estimated monthly cost |
|----------|----------------------|------------------------|
| One or several sites, static per-page embeds | Google Maps Embed | $0 |
| One site, custom map | MapTiler Flex | $30 |
| Seven-site locator, low traffic | Google Maps JS or Mapbox | $0–$7-ish, depending on loads |
| Seven-site locator, high traffic | Google Maps JS or Mapbox | Usage-based; monitor |
| Self-hosted tiles | MapLibre + server | Server/storage/ops cost |

These are rough planning figures, not quotes. Taxes, exchange rates and overage are excluded.

### 5.3 Recommendation summary

| Need | Recommendation |
|------|----------------|
| Current published Mavoko location | Google Maps Embed, consent-gated, with text-first card |
| Owner-listed network (7 sites) | Text-first index and per-site pages; static Google Embed per page; locator only after verification and approval |
| Searchable locator (2–20 sites) | MapLibre + MapTiler Flex, or Google Maps JS if Google ecosystem is preferred |
| Custom brand styling | Mapbox or MapTiler + MapLibre |
| Zero budget, commercial site | Google Maps Embed on individual verified site pages; do not use OSM public tiles |
| Privacy-first/self-hosted | MapLibre + self-hosted tiles, with ops budget |

---

## 6. Location data model

### 6.1 Design principles

- One record per customer-facing location.
- Stable `id` and `slug`.
- Null/empty values for unknown fields; never placeholder text.
- Hours stored as structured intervals, not prose.
- Coordinates stored with source and verification date.
- Services and booking flags stored per location.
- SEO fields optional and only populated when unique.
- Validation schema rejects missing required fields before publication.

### 6.2 Example schema

The values below are **empty placeholders** to show shape, not Otodrive facts.

```json
{
  "id": "loc_example",
  "slug": "example",
  "status": "draft",
  "name": "",
  "shortName": "",
  "address": {
    "line1": "",
    "line2": "",
    "locality": "",
    "county": "",
    "postalCode": "",
    "country": "KE"
  },
  "coordinates": {
    "lat": null,
    "lng": null,
    "source": "",
    "verifiedAt": ""
  },
  "contact": {
    "phone": "",
    "whatsapp": "",
    "email": ""
  },
  "hours": {
    "timezone": "Africa/Nairobi",
    "regular": {
      "mon": [],
      "tue": [],
      "wed": [],
      "thu": [],
      "fri": [],
      "sat": [],
      "sun": []
    },
    "exceptions": [],
    "notes": ""
  },
  "services": [],
  "booking": {
    "enabled": false,
    "locationId": "",
    "leadTimeMinutes": null,
    "slotIntervalMinutes": null
  },
  "directions": {
    "google": "",
    "apple": "",
    "waze": ""
  },
  "placeId": "",
  "landmarks": [],
  "accessibility": [],
  "parking": "",
  "photos": [],
  "seo": {
    "title": "",
    "description": ""
  },
  "verification": {
    "source": "",
    "verifiedBy": "",
    "verifiedAt": ""
  }
}
```

### 6.3 Field rules

| Field | Rule |
|-------|------|
| `id` | Immutable, lowercase, no spaces. |
| `slug` | URL-safe; unique; do not change after publication without a redirect. |
| `status` | `draft`, `active`, `temporarily_closed`, `closed`. Only `active` is published. |
| `name` | Exact customer-facing name approved by the owner. |
| `address` | Every line verified; do not guess postal code or county. |
| `coordinates` | Decimal degrees; source and date required; optional if the address is sufficient. |
| `contact.phone` | E.164 format for links; display format separately if needed. |
| `hours.regular` | Array of `{ "open": "08:00", "close": "17:00" }`; empty array = closed. |
| `hours.exceptions` | Dates with different hours or closures. |
| `services` | Only services actually available at that location. |
| `booking.enabled` | False until the booking API is verified for that location. |
| `directions` | Deep links generated from verified coordinates/place ID, not guessed. |
| `placeId` | Google Place ID if available; do not fabricate. |
| `landmarks` | Owner-approved landmarks; useful when street addressing is weak. |
| `accessibility` | Verified features only (step-free entrance, accessible toilet, etc.). |
| `photos` | Licensed images with alt text and consent. |
| `verification` | Who verified, from what source, and when. |

### 6.4 Hours and booking

The same hours record must drive:

- the visible “Open now / Closed” state;
- the hours table;
- the booking slot generator;
- the JSON-LD `openingHoursSpecification`;
- the Google Business Profile (manually kept in sync).

Do not hard-code hours in JavaScript. Do not generate slots outside the record. Do not mark all slots available.

**Time zone:** `Africa/Nairobi` (UTC+3, no daylight saving). Store times as local wall-clock intervals plus the time zone; do not rely on the visitor’s device time zone.

**Holidays:** Kenya public holidays and Otodrive-specific closures should be exceptions, not permanent hour changes.

### 6.5 Booking integration

If booking is retained:

- Pass `locationId` with every request.
- Fetch availability per location and date.
- Return explicit slot states: `available`, `unavailable`, `closed`, `past`.
- Enforce lead time and cut-off.
- Prevent double booking with a server-side transaction or unique constraint.
- Add idempotency keys for retries.
- Return a machine-readable error code and a human-readable message.
- Send confirmation from a monitored domain with SPF/DKIM/DMARC configured.
- Store minimal personal data and document retention.
- Provide a fallback phone/email route if the API is down.

If real-time availability is not available, replace the grid with a **request appointment** form and say clearly that the time is not confirmed until staff respond.

---

## 7. UX and page design

### 7.1 Current published location (Mavoko)

Add to the homepage and `maps.html`, then repeat the same pattern for each verified site in the owner-listed network:

1. **Location card**
   - Name.
   - Full address (once verified).
   - “Open now” status and today’s hours.
   - Phone and WhatsApp links.
   - “Get directions” button.
   - Services available at this location.
   - Parking/access notes if verified.

2. **Map**
   - Text-first; map is secondary.
   - “Show map” button with a short privacy note.
   - After consent, load the Google embed with a title.
   - Provide “Open in Google Maps” and “Open in Apple Maps” links.

3. **Booking CTA**
   - “Book a service” only if booking is real.
   - Otherwise “Call to book” or “Request an appointment”.

4. **Practical information**
   - Landmarks, entrance, parking, accessibility, payment methods.
   - What to bring for a conversion or inspection (owner-supplied).

### 7.2 Owner-listed network (seven sites)

- `/locations/` index with cards and a text list.
- `/locations/<slug>/` detail pages only for verified, owner-approved sites.
- Label Otodrive conversion and Autogas LPG fueling separately on every card and page.
- Search/filter only if the verified network and content justify it.
- No automatic geolocation on page load. If “near me” is offered, ask first and always provide a manual list.
- Each location page must have unique content: address, hours, services, entrance, photos and directions. Do not create thin duplicate pages.

### 7.3 Mobile behaviour

- Address and phone visible before the map.
- Tap-to-call and tap-to-directions.
- Sticky action bar only if it does not cover content.
- Map height capped; no full-screen map on load.
- Respect `prefers-reduced-motion`; no auto-pan/zoom.
- Test at 360 px and 390 px.

### 7.4 Empty and error states

- If hours are unknown: “Call to confirm hours” rather than a false “Open”.
- If the map fails: show the address and directions link.
- If the booking API is down: show phone/email and a retry.
- If a location is temporarily closed: show a clear notice with dates.

---

## 8. Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Map alternative | Address, directions and hours in text before the map. |
| Iframe name | `title="Map showing [verified site name]"`, using the owner-approved site name. |
| Keyboard | “Show map” is a real button; focus moves logically; Escape closes overlays. |
| Screen readers | Location card uses headings and a definition list; “Open now” is text, not colour alone. |
| Contrast | Address, hours and buttons meet 4.5:1 / 3:1. |
| Zoom | No `maximum-scale`; layout works at 200%. |
| Motion | No auto-animation; respect reduced motion. |
| Directions | Links have discernible names (“Get directions to [site]”). |
| Errors | Booking errors announced with `aria-live`. |
| Consent | Map consent is understandable and reversible. |

WCAG 2.2 AA is the target.

---

## 9. Performance

- Do not load a map iframe on every page by default.
- Use a static map image or styled placeholder with a “Show map” button.
- Lazy-load the iframe after consent.
- Set explicit width/height/aspect ratio to avoid layout shift.
- Preconnect to the map provider only after consent.
- Keep location cards server-rendered/static; no client-side fetch is needed for seven records unless a searchable locator is approved.
- If a locator is added, paginate/cluster markers and avoid loading all records on first paint.
- Measure LCP and CLS before/after.

---

## 10. Privacy and consent

- Google Maps Embed sets cookies and receives the visitor’s IP address. Load it only after consent, or provide a clear notice.
- Do not request precise device location unless the user explicitly asks for “near me”; explain why and allow manual entry.
- Do not send location or contact data to analytics without consent.
- Document the map provider as a processor in the privacy notice.
- Booking data (name, phone, vehicle, appointment) is personal data; define retention and access.
- If the booking API is hosted outside Kenya, disclose the transfer.
- Provide a deletion/contact route.
- Keep a consent record for analytics/maps where required.

**Inferred:** the Kenya Data Protection Act 2019 requires lawful basis, transparency, purpose limitation, retention limits and security. Confirm with a qualified adviser.

---

## 11. SEO and structured data

### 11.1 NAP consistency

Name, address and phone must match across:

- the website;
- Google Business Profile;
- Facebook/Instagram;
- directories;
- invoices/email signatures (where public).

One canonical format for the phone number and address. Do not publish variants.

### 11.2 Structured data

Use `AutoRepair` (or the most accurate `LocalBusiness` subtype) per active location. Include only verified fields:

```json
{
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "name": "",
  "image": "",
  "url": "",
  "telephone": "",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "",
    "addressLocality": "",
    "addressRegion": "",
    "postalCode": "",
    "addressCountry": "KE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": null,
    "longitude": null
  },
  "openingHoursSpecification": [],
  "sameAs": [],
  "hasMap": ""
}
```

Rules:

- Do not include `openingHoursSpecification` until hours are verified.
- Do not include `geo` if coordinates are approximate or unverified.
- Do not include aggregate ratings or reviews unless they are genuine and visible.
- Do not use `@type: Organization` for a local branch; use the local business type.
- Keep the JSON-LD generated from the same data record as the visible page to prevent drift.
- Validate with the Schema.org validator and Google’s Rich Results Test.

### 11.3 Location pages

- One page per active location only if it has unique content.
- Title pattern: `<Location name> — LPG Autogas Conversion & Refuelling | Otodrive` (owner-approved).
- Meta description: address, services, hours, phone — only verified.
- Canonical to the location page, not the homepage.
- Internal links from the homepage, services and contact pages.
- Add `BreadcrumbList` if the site grows.
- Do not create pages for unverified or planned locations.

### 11.4 Domain note

All canonical/OG/JSON-LD URLs must use the approved host. The current `otodrive.co.ke` canonical does not serve the website. Resolve the domain strategy before adding location pages, or every new page inherits the defect.

---

## 12. Implementation plan

### Step 3.1 — Verify facts (owner)

- Complete the checklist in section 13.
- Provide the Google Business Profile link and place ID for each listing, if available.
- Confirm the seven owner-listed service points and whether any additional sites exist.
- Confirm the service split per site: Otodrive conversion, Autogas LPG fueling, or both.
- Confirm which map listing/pin is the correct customer entrance for each site.
- Confirm hours, including holidays and service-specific hours.
- Record the evidence source, date checked and confidence for every field.

**Gate:** no implementation until the core fields are verified.

### Step 3.2 — Create the data record

- Add `data/locations.json` (or equivalent) with seven draft records, starting with Mavoko.
- Add a JSON schema and validation script.
- Add a “draft” status that prevents publication.
- Do not duplicate the data in HTML.

### Step 3.3 — Build the text-first location UI

- Location card with address, hours, phone, separate service flags, directions.
- “Open now” computed from the record in `Africa/Nairobi`.
- Accessible markup and responsive layout.
- Fallback text if JavaScript is unavailable.

### Step 3.4 — Add the map with consent

- Static placeholder + “Show map”.
- Load Google Maps Embed after consent.
- Add iframe title and privacy note.
- Provide “Open in Google Maps/Apple Maps” links.

### Step 3.5 — Link booking

- Pass `locationId` to the booking API.
- Drive slots from the same hours record.
- Add availability, double-booking protection, errors and confirmation.
- Or switch to request-only booking.

### Step 3.6 — SEO

- Generate JSON-LD from the verified record for each site.
- Add canonical, title, description and social metadata.
- Add each verified location to the sitemap.
- Align the matching Google Business Profile listing.
- Validate.

### Step 3.7 — QA

- Keyboard, screen reader, zoom, reduced motion.
- Mobile 360/390 px.
- Map consent on/off.
- Booking success/failure/timeout.
- NAP consistency check.
- Structured data validation.
- Owner sign-off.

### 12.8 Phase 3 — Otodrive locations research and plan

**Status:** Owner-provided starting point, 27 October 2026. These are not confirmed business facts until supported by reliable evidence and owner sign-off.

**Known service types and locations to investigate**

**Service model — do not conflate:**

- **Otodrive** is a vehicle conversion centre for Autogas system installation.
- **Autogas** provides LPG fueling.
- Some sites offer both Otodrive conversion and Autogas LPG fueling; some offer Autogas LPG fueling only.
- Do not assume that a site offers both services. Show the service types separately and assign only the services confirmed for that site.

| Site | Owner-provided service | Petrocity location reference | Notes |
|---|---|---|---|
| Thika | Otodrive conversion and Autogas LPG fueling | Petrocity Thika | Verify the correct facility and coordinates. |
| Mavoko | Otodrive conversion and Autogas LPG fueling | Petrocity Mavoko | Verify the correct facility and coordinates. |
| Kangundo Road | Autogas LPG fueling only | Petrocity Kangundo Road | Do not list Otodrive conversion unless confirmed. |
| Rongai | Autogas LPG fueling only | Petrocity Rongai | Do not list Otodrive conversion unless confirmed. |
| Shanzu | Autogas LPG fueling only | Petrocity Shanzu | Do not list Otodrive conversion unless confirmed. |
| Jomvu | Autogas LPG fueling only | Petrocity Jomvu | Keep this distinct from the Jomvu Yard conversion centre. |
| Jomvu Yard | Otodrive conversion | Petrocity Jomvu yard | Owner says the yard is along the Mombasa–Nairobi Highway in the Jomvu area of Mombasa, immediately beside the A.O. Bayusuf & Sons Ltd logistics yard. Do not assume it also offers LPG fueling. |

**Research rules used:**

1. Search for the Petrocity facility using reliable map listings and other credible sources. Prefer official Petrocity information where available. Treat map-provider listings as supporting evidence, not automatic proof that the location is an Otodrive or Autogas service point.
2. Confirm the result is the intended physical site. In particular, distinguish **Petrocity Jomvu** from **Petrocity Jomvu Yard**; do not merge their map pins or service labels.
3. Record latitude and longitude, the exact map listing or address used, direct source links, date checked and confidence. Explain ambiguity or conflicting results. Do not guess coordinates from a town name or place a pin at a nearby road, yard or similarly named business.
4. Keep a clear distinction between the map listing’s Petrocity identity and Otodrive/Autogas branding. Recommend customer-facing names and service labels that identify the available services accurately without implying that every Petrocity site offers both.
5. Mark unresolved addresses, coordinates, hours, contact details and service availability as **owner confirmation required**. Do not publish tentative details or create map markers presented as confirmed locations.

### 12.9 Location research results

**Research date:** 27 October 2026.  
**Method:** official Petrocity pages and locator, Google Maps listings, OpenStreetMap/Nominatim supporting checks, and official Otodrive social posts. Google Maps and OpenStreetMap are third-party sources and can be incomplete, outdated or user-edited.  
**Rule:** the coordinates below are research references, not published pins. No map markers were created and no location was published.

**Confidence definitions:**

- **High** — exact named listing matches the intended site and at least two sources agree closely; remaining gaps are administrative.
- **Medium** — exact listing exists but there is a naming or coordinate discrepancy, only one strong source, or the address/entrance is unresolved.
- **Low** — no exact listing; only an owner description or nearby reference exists. Do not publish a coordinate.

**Service-type caveat:** confidence applies to the location match, not to service availability. Unless a source explicitly supports a service, the service remains **owner-provided, not independently verified**.

| Customer-facing site name (proposed) | Verified service types | Petrocity reference | Address | Coordinates | Evidence / source links | Date checked | Confidence | Unresolved questions |
|---|---|---|---|---|---|---|---|---|
| Otodrive Thika — Autogas conversion & LPG fueling | Owner-provided: Otodrive conversion + Autogas LPG. Petrocity listing is a gas station; no separate Otodrive listing found. | Petrocity Thika | Thika Road, Thika, Kiambu; plus code X357+2GW; no street number published | `-1.0423809, 37.0638209` | [G1], [O1], [O3], [S2] | 27 Oct 2026 | Medium — exact Petrocity listing; conversion presence unverified; listing appears unclaimed | Is Otodrive conversion actually offered here? Which bay or entrance? Correct hours, phone and address? Should the listing be claimed? |
| Otodrive Mavoko — Autogas conversion & LPG fueling | Owner-provided: both. Otodrive listing name supports fueling + conversion; Petrocity listing is a gas station. | Petrocity Mavoko Station | Otodrive pin: Mombasa Road, next to Mombasa Cement, Mavoko, Machakos. Petrocity pin: HXC6+67, Mombasa–Nairobi Road, Mlolongo/Syokimau, Machakos 00519. Existing JSON-LD “Nairobi 00100” is unverified. | Otodrive `-1.4297154, 36.9601985`; Petrocity `-1.4289387, 36.9608629`; about 114 m apart — do not merge | [G2], [G3], [O1], [S1], [M1] | 27 Oct 2026 | Medium — two listings corroborate the area; exact facility and entrance unresolved | Which pin is the customer entrance? Same facility or adjacent? Service-specific hours (Otodrive listing says 24 hours; Petrocity listing says closes 5 pm)? Correct county and postcode? Google Business Profile ownership? |
| Autogas Kangundo Road — LPG fueling | Owner-provided: Autogas LPG only. No Otodrive conversion confirmed. | Petrocity Kangundo Road | Kangundo Road, Mowlem ward, Njiru, Nairobi 40653 | `-1.2752261, 36.8893014` (Google); OSM `-1.2752370, 36.8893195` (about 2 m apart) | [G4], [S2], [M2] | 27 Oct 2026 | High for the Petrocity location; service split owner-provided | Confirm Autogas only; exact entrance, phone and hours; confirm no conversion. |
| Autogas Rongai — LPG fueling | Owner-provided: Autogas LPG only. No Otodrive conversion confirmed. | Petrocity Rongai | Magadi Road area, Olkeri ward, Kajiado North, Kajiado 00409 (reverse geocode); listing publishes no street address | `-1.4002857, 36.7234206` | [G5], [O1], [S2], [R1] | 27 Oct 2026 | Medium — exact listing; address and entrance unconfirmed | Exact address and entrance; confirm Autogas only; hours and phone; Google Business Profile. |
| Autogas Shanzu — LPG fueling | Owner-provided: Autogas LPG only. No Otodrive conversion confirmed. | Petrocity Shanzu / “Shanzu Service Station” | Malindi Road, Shanzu/Bamburi, Mombasa 80295 | Google `-3.9837529, 39.7382157`; OSM `-3.9837493, 39.7380065` (about 23 m); official locator `-3.983909, 39.736588` (about 182 m west) | [G6], [O2], [S2], [M3], [R1] | 27 Oct 2026 | Medium — Google/OSM agree; official locator differs; naming ambiguity | Official name Shanzu or Bamburi? Which pin is the entrance? Confirm Autogas only; address, hours and phone. |
| Autogas Jomvu — LPG fueling | Owner-provided: Autogas LPG only. No Otodrive conversion confirmed. | Petrocity Jomvu | Mombasa Road, Jomvu/Miritini area, Mombasa 80102; plus code XJV3+9R3; no street address published | `-4.0078763, 39.6040628` | [G7], [S2], [M4], [R1] | 27 Oct 2026 | Medium — exact Google listing; OSM mismatch; service split owner-provided | Confirm Autogas only; exact entrance, address, hours and phone; do not merge with Jomvu Yard or with the separate OSM Petrocity node about 4 km away. |
| Otodrive Jomvu Yard — Autogas conversion | Owner-provided: Otodrive conversion only. Otodrive listing is an auto repair shop; no LPG fueling indicated. Owner supplied a map link that resolves to the same Otodrive listing. | Petrocity Jomvu yard / “OTODRIVE AUTOGAS CONVERSION CENTRE JOMVU” | XHVW+6W6 Jomvu, Mombasa Road; owner confirms it is along the Mombasa–Nairobi Highway, immediately beside A.O. Bayusuf & Sons Ltd; exact street address and gate/entrance not published | `-4.0073924, 39.5965528` (Otodrive listing); A.O. Bayusuf reference `-4.0069502, 39.5972786` (about 95 m); Petrocity Jomvu about 837 m east | [G8], [G9], [G10], [S1], [R1] | 27 Oct 2026 | High — owner-supplied link resolves to the same Otodrive listing and matches the A.O. Bayusuf landmark; exact gate and service scope still need confirmation | Confirm conversion only and no LPG fueling; exact gate/entrance and parking; customer-facing name; hours and phone; Google Business Profile. |

**Evidence register — all links checked 27 October 2026:**

- [G1] Google Maps — Petrocity Thika: <https://www.google.com/maps/place/Petrocity+Thika/@-1.0423809,37.0638209,17z>
- [G2] Google Maps — Petrocity Mavoko Station: <https://www.google.com/maps/place/Petrocity+Mavoko+Station/@-1.4289387,36.9608629,17z>
- [G3] Google Maps — Otodrive Autogas fueling and conversion Center Mavoko: <https://www.google.com/maps/place/OtoDrive+Autogas+fueling+and+conversion+Center+Mavoko/@-1.4297154,36.9601985,17z>
- [G4] Google Maps — Petrocity - Kangundo Rd: <https://www.google.com/maps/place/Petrocity+-+Kangundo+Rd/@-1.2752261,36.8893014,17z>
- [G5] Google Maps — Petrocity Rongai: <https://www.google.com/maps/place/Petrocity+Rongai/@-1.4002857,36.7234206,17z>
- [G6] Google Maps — Petrocity Shanzu: <https://www.google.com/maps/place/Petrocity+Shanzu/@-3.9837529,39.7382157,17z>
- [G7] Google Maps — Petrocity Jomvu: <https://www.google.com/maps/place/Petrocity+Jomvu/@-4.0078763,39.6040628,17z>
- [G8] Google Maps — OTODRIVE AUTOGAS CONVERSION CENTRE JOMVU: <https://www.google.com/maps/place/OTODRIVE+AUTOGAS+CONVERSION+CENTRE+JOMVU/@-4.0073924,39.5965528,17z>
- [G9] Google Maps — A.O. Bayusuf And Sons Limited, landmark reference: <https://www.google.com/maps/place/A.+O.+Bayusuf+And+Sons+Limited/@-4.0069502,39.5972786,17z>
- [G10] Owner-supplied Google Maps short link for Otodrive Jomvu Yard; it resolves to place ID `0x1840730066d6e4bb:0xaaea36c23744c8d0` at `-4.0073924, 39.5965528`, the same Otodrive listing as [G8]: <https://maps.app.goo.gl/oHfycTkMxsWJTjnG9>
- [O1] Petrocity Kenya page (names Mavoko, Rongai and Thika stations): <https://petrocityafrica.com/petrocity-kenya/>
- [O2] Petrocity official service station locator (partial; supplies Shanzu reference): <https://petrocityafrica.com/service-station-locator/>
- [O3] Petrocity Autogas page (confirms the Petrocity–Otodrive relationship, not per-site services): <https://petrocityafrica.com/autogas/>
- [S1] Official Otodrive Facebook post referencing Petrocity Mavoko, next to Mombasa Cement, and Petrocity Kwa Jomvu: <https://www.facebook.com/61566117596915/posts/the-only-thing-youll-notice-when-you-switch-to-autogas-is-how-much-cheaper-it-is/122226190112537253/>
- [S2] Otodrive Instagram post listing Autogas availability at Mavoko, Kangundo Road, Thika, Rongai, Jomvu and Shanzu: <https://www.instagram.com/p/DbS3yunAtlv/>
- [M1] OpenStreetMap node — Petrocity, Mombasa Road, Mavoko: <https://www.openstreetmap.org/node/8371880138>
- [M2] OpenStreetMap node — Petrocity, Kangundo Road: <https://www.openstreetmap.org/node/6259924662>
- [M3] OpenStreetMap node — Petrocity Bamburi, Malindi Road, at the Shanzu coordinates: <https://www.openstreetmap.org/node/6799470775>
- [M4] OpenStreetMap node — Petrocity, Mombasa Road, Jomvu area, about 4 km from the Google Jomvu listing; do not merge: <https://www.openstreetmap.org/node/6366672886>
- [R1] Nominatim reverse geocoding used for address context only; not proof of the exact entrance: <https://nominatim.openstreetmap.org/>

### 12.10 Research findings and limits

1. **The official Petrocity locator is incomplete.** On 27 October 2026 it returned only four Kenya stations — Mombasa Road, Bamburi, Shanzu and Nyali — even though the official Petrocity Kenya page names Mavoko, Rongai and Thika, and public Otodrive posts name Kangundo Road, Jomvu and Shanzu. Absence from the locator is not evidence that a site is closed or unaffiliated; presence is not proof of Otodrive conversion.
2. **Map listings are supporting evidence, not service proof.** Some listings are unclaimed or user-edited. A gas-station listing does not prove Autogas LPG is sold there, and an Otodrive listing does not prove every service is offered.
3. **The service split is still largely owner-provided.** Outside Mavoko and Jomvu Yard, no separate Otodrive listings were found at the Petrocity fueling stations in Thika, Kangundo Road, Rongai, Shanzu or Jomvu. The only Otodrive map listings found were Mavoko (name includes fueling and conversion) and the Jomvu Yard auto repair shop. Therefore, Otodrive conversion at Thika is the largest service-type uncertainty.
4. **Mavoko has two map pins about 114 m apart.** The Otodrive listing is near Mombasa Cement; the Petrocity Mavoko Station listing is on the Mombasa–Nairobi Road. They may be one facility with two pins or adjacent facilities. Do not merge them until the owner confirms the customer entrance and whether one or two records should be published.
5. **Jomvu and Jomvu Yard are distinct.** Petrocity Jomvu is about 837 m east of the Otodrive Jomvu listing. The owner supplied a map link for Jomvu Yard that resolves to the same Otodrive listing at `-4.0073924, 39.5965528`; that listing is about 95 m from A.O. Bayusuf and matches the owner’s “immediately beside” description. Do not merge the pins or labels.
6. **Shanzu has a naming and coordinate conflict.** Google/OSM place the Petrocity site at about `-3.98375, 39.7381`; the official locator places “Shanzu Service Station” about 182 m west at `-3.983909, 39.736588`; OSM also names the node “Petrocity Bamburi.” Confirm the official name and entrance before publishing. Do not merge it with the separate Petrocity Bamburi station at `-4.002046, 39.69951` in the official locator.
7. **The OSM Jomvu-area node does not match the Google Jomvu listing.** It is about 4 km away. It may represent a different Petrocity station, but that is not confirmed. Do not use it as the Jomvu pin or merge it with Jomvu Yard.
8. **Mavoko hours conflict.** The Otodrive listing says open 24 hours; the Petrocity listing says it closes at 5 pm. These may refer to different services or pins. Do not publish “24/7” for the site until the owner confirms service-specific hours.
9. **Addresses are context, not confirmed entrances.** Several addresses come from reverse geocoding or plus codes. They are useful for finding the area, but they are not proof of the customer entrance, plot number or parking access.
10. **No tentative details were published.** No map markers were created, no coordinates were added to the website, and no service-type claim was changed.

**Recommended customer-facing labels (pending owner approval):**

| Site | Proposed label | Service message |
|---|---|---|
| Thika | Otodrive Thika — Autogas conversion & LPG fueling | Both services, only if the owner confirms conversion at this site. |
| Mavoko | Otodrive Mavoko — Autogas conversion & LPG fueling | Both services, subject to one confirmed entrance/pin. |
| Kangundo Road | Autogas Kangundo Road — LPG fueling | LPG fueling only; no Otodrive conversion. |
| Rongai | Autogas Rongai — LPG fueling | LPG fueling only; no Otodrive conversion. |
| Shanzu | Autogas Shanzu — LPG fueling | LPG fueling only; no Otodrive conversion. |
| Jomvu | Autogas Jomvu — LPG fueling | LPG fueling only; distinct from Jomvu Yard. |
| Jomvu Yard | Otodrive Jomvu Yard — Autogas conversion | Conversion only; do not imply LPG fueling. |

Use “at Petrocity [site]” in body copy where helpful, so customers understand the relationship without implying that every Petrocity station is an Otodrive conversion centre. Final brand casing (Otodrive, OtoDrive or OTODRIVE) remains an owner decision.

**Conclusion:** the evidence is strong enough to design a text-first, multi-site location index and to prioritise Mavoko and Jomvu Yard for verification. It is not strong enough to publish confirmed pins or service labels for all seven sites. Each row remains **owner confirmation required** until the checklist below is complete.

### 12.11 How locations will be added or edited

**Short answer:** do not hard-code each location into every HTML page. Use one structured location dataset as the source of truth, validate it, and generate the location pages, cards, JSON-LD and sitemap entries from that data. For a network of this size, that is the standard low-complexity approach.

There is no single mandated industry standard. The common pattern for small and mid-sized multi-location sites is:

1. structured content in one place;
2. validation and review;
3. build-time rendering into static pages;
4. version control and preview;
5. publish, then update external listings separately.

#### Recommended for Otodrive now: structured data plus build-time generation

- Keep one record per physical site in `data/locations.json` (YAML or CSV are acceptable alternatives).
- Store service flags separately, for example `otodriveConversion` and `autogasLpgFueling`. Do not duplicate a site just because it offers two services.
- Validate the file against a JSON Schema before every build: required name, status, address, service flags, hours, coordinates, source and verification date.
- Use a small build script — not a framework migration — to generate:
  - the location index;
  - one page per verified site;
  - location cards used on the homepage/contact page;
  - `LocalBusiness`/`AutoRepair` JSON-LD;
  - sitemap entries;
  - map/directions links from the stored Place ID or coordinates.
- Keep the generated HTML static. Do not fetch location data in the browser just to render the main content; that harms SEO, accessibility and resilience.
- A developer or confident editor changes one record, runs validation and a build, previews, then deploys. No hand-editing of NAP data in multiple HTML files.

This can be introduced for locations only. It does not require moving the whole site to Astro, Eleventy, Next.js or a CMS now.

#### If the owner wants non-technical editing

Add an editing layer over the same data model. The website should still build from one validated source.

| Option | How the owner edits | Best for | Trade-offs |
|---|---|---|---|
| Structured file + build | Edit JSON/YAML/CSV, run build | Small network, developer-supported, lowest cost | Requires Git/build familiarity |
| Git-based CMS (for example Decap or Tina) | Form-based admin; saves to the repository and triggers a build | Non-technical editing with a small team | OAuth/Git setup; still a build workflow |
| Headless CMS (for example Sanity, Contentful or Storyblok) | Hosted admin and editorial workflow | Frequent updates, multiple editors, approvals | Vendor, cost, API, privacy review |
| Database + admin/API | Custom admin, API or internal tool | Hundreds of sites, real-time availability, integrations | Highest build, hosting and security burden |
| WordPress/replatform | Familiar admin | Whole-site content workflow, not locations alone | Migration, maintenance and plugin risk |
| Google Sheets/Airtable as production source | Spreadsheet editing | Temporary intake only | Permissions, formatting, API limits and accidental edits; not recommended as the live source |

No CMS or paid service should be selected until the owner decides who edits locations, how often, whether approvals are needed and what budget is available.

#### If a database or API becomes justified

A database-backed locator is reasonable when there are hundreds or thousands of sites, real-time availability, multiple editors, per-location stock/services, or integrations with CRM/booking systems. It is overkill for seven sites and adds hosting, backups, authentication and security work.

#### What is not the source of truth

- **Google Maps or Google Business Profile:** these are distribution channels, not the website’s content database. They must be kept consistent, but they do not replace the site record.
- **Hard-coded HTML:** every copy drifts. Do not put the address, hours, phone and service labels in several page templates.
- **Google Sheets or Airtable:** useful for owner intake, but not safe as the production source without validation, access control and a publishing workflow.
- **A chatbot:** a chatbot can read approved location data, but it must not become the only place the data exists.

#### Editing workflow

1. Owner supplies the change or approves a proposed record.
2. Update the single location record.
3. Validate required fields, coordinates, hours, service flags and status.
4. Build and preview the location page/index and JSON-LD.
5. Owner reviews the customer-facing name and service labels.
6. Deploy; keep the previous version in Git for rollback.
7. Update the matching Google Business Profile and any directory listings manually, unless a separately approved sync tool exists.
8. Resubmit the sitemap or use IndexNow if URLs changed.
9. Spot-check the live page, map link and structured data.

#### Location lifecycle

- **Draft:** record exists internally; never rendered or indexed.
- **Active:** verified and approved; rendered in the index, sitemap and JSON-LD.
- **Temporarily closed:** visible notice with dates; keep the page and listing until reopening.
- **Closed:** remove from the active index and sitemap, update the Google Business Profile, and either show a closure notice or redirect to the nearest alternative. Do not silently delete the record.

#### Data rules for future locations

- One record per physical site, with a stable `id` and `slug`.
- Separate Otodrive conversion and Autogas LPG fueling flags.
- Separate Jomvu and Jomvu Yard records; never merge them.
- `status` must prevent unpublished/draft records from appearing.
- Coordinates require a source, verification date and entrance confirmation.
- Unknown fields stay empty; do not publish placeholders.
- Generate one page only when the site has unique, verified content.
- Keep the same record as the source for visible content, JSON-LD, sitemap and booking.
- Every change is a reviewed commit with a preview and rollback point.

**Decision gate:** the default is structured data plus build-time generation. A CMS, database or locator SaaS is a later owner decision, not a prerequisite for launching the seven verified locations.

---

## 13. Owner verification checklist

Complete every item for each site before publishing that location. “Unknown” is acceptable internally but must not be published.

### Identity and contact

- [ ] Official trading name for this location.
- [ ] Legal/registered entity name (if different).
- [ ] Official brand casing: Otodrive, OtoDrive or OTODRIVE.
- [ ] Primary phone number, in international format.
- [ ] Secondary/WhatsApp number (if any).
- [ ] Public email address that is monitored.
- [ ] Who answers enquiries and within what time.
- [x] Official website host: `https://www.otodriveafrica.com/`.
- [ ] Official social handles (Facebook, X, Instagram, LinkedIn, TikTok, YouTube).

### Address

- [ ] Building/plot name or number.
- [ ] Street name.
- [ ] Area/neighbourhood.
- [ ] Town/city.
- [ ] County.
- [ ] Postal code (or confirm none).
- [ ] Country.
- [ ] Nearest landmark(s).
- [ ] Entrance description (gate, canopy, workshop).
- [ ] Parking availability.
- [ ] Public transport guidance.
- [ ] Accessibility features (step-free, toilet, assistance).
- [ ] Google Business Profile link.
- [ ] Google Place ID (if known).
- [ ] Confirmation that the map pin is the customer entrance.
- [ ] Confirmation that the pin/coordinates may be published.

### Hours

- [ ] Monday hours.
- [ ] Tuesday hours.
- [ ] Wednesday hours.
- [ ] Thursday hours.
- [ ] Friday hours.
- [ ] Saturday hours.
- [ ] Sunday hours.
- [ ] Public holiday policy.
- [ ] Temporary closures/seasonal hours.
- [ ] Last booking/refuelling time.
- [ ] Whether “24/7” applies to any service (and which).
- [ ] Whether hours differ for refuelling vs conversion vs service.

### Services

- [ ] Otodrive conversion confirmed separately from Autogas LPG fueling.
- [ ] LPG refuelling available at this location.
- [ ] Autogas conversion available.
- [ ] All seven owner-listed sites assigned a service profile: conversion only, LPG only, both, or not operating.
- [ ] Jomvu and Jomvu Yard confirmed as separate sites and pins.
- [ ] Free diagnosis available (conditions?).
- [ ] Free LPG system check available (conditions?).
- [ ] Vehicle inspection available.
- [ ] Any services not available here.
- [ ] Makes/models supported or excluded.
- [ ] Maximum vehicle size/weight.
- [ ] Appointment required or walk-in.
- [ ] Typical turnaround time.
- [ ] Warranty terms.
- [ ] Payment methods.

### Booking

- [ ] Is real-time booking required?
- [ ] Who owns the booking API/repository?
- [ ] What data does it store, where and for how long?
- [ ] How are double bookings prevented?
- [ ] What confirmation does the customer receive?
- [ ] Cancellation/rescheduling policy.
- [ ] No-show policy.
- [ ] Fallback when the API is down.
- [ ] Time zone confirmed as `Africa/Nairobi`.

### Legal and marketing

- [ ] Evidence for “KEBS licensed”.
- [ ] Evidence for EPRA compliance.
- [ ] Evidence for NEMA compliance.
- [ ] Evidence for Westport Fuels partnership.
- [ ] Evidence for LPGTech partnership.
- [ ] Basis for “up to 40% savings”.
- [ ] Basis for “among the largest LPG marketers”.
- [ ] Permission to publish customer testimonials.
- [ ] Permission to publish project photos and vehicle details.
- [ ] Privacy notice owner/contact.
- [ ] Consent approach for maps/analytics.

### Future

- [ ] Are more locations planned in the next 12 months?
- [ ] If yes, where and when?
- [ ] Should the site support a locator now or later?
- [ ] Who will maintain location data?
- [ ] Choose the location editing model: structured file + build, Git-based CMS, headless CMS, database/API or other.
- [ ] Confirm who can run and approve a build and deployment.
- [ ] How often will hours/holidays be updated?
- [ ] Confirm whether any additional Petrocity sites offer Otodrive or Autogas.
- [ ] Confirm whether the official Petrocity locator should be updated with all verified sites.

### Phase 3 research follow-ups

- [ ] Thika: confirm whether Otodrive conversion is actually available, which bay or entrance is used, and whether the Petrocity Thika listing should be claimed or corrected.
- [ ] Mavoko: confirm the customer entrance, whether the Otodrive and Petrocity pins are one facility or adjacent sites, service-specific hours, and the correct county/postcode.
- [ ] Kangundo Road: confirm Autogas LPG only, exact entrance/address, phone and hours; confirm no Otodrive conversion.
- [ ] Rongai: confirm Autogas LPG only, exact address/entrance, phone and hours; confirm no Otodrive conversion.
- [ ] Shanzu: confirm the official name (Shanzu or Bamburi), resolve the 182 m coordinate difference, and confirm Autogas LPG only.
- [ ] Jomvu: confirm Autogas LPG only, resolve the separate OSM node about 4 km away, and confirm the exact entrance/address.
- [ ] Jomvu Yard: the owner-supplied map link resolves to the Otodrive listing next to A.O. Bayusuf; confirm the exact gate/entrance, access route and parking, conversion only and no LPG fueling, hours/phone, and the customer-facing name.
- [ ] Confirm whether the seven owner-listed sites are all current and whether any are missing from the list.
- [ ] Approve the proposed customer-facing names and the separate service labels.
- [ ] Confirm whether to claim/create Google Business Profile listings or only update the website; do not create listings during this phase.
- [ ] Confirm that each published coordinate is the customer entrance and may be published.
- [ ] Record the source, date checked and confidence for every field before publication.

---

## 14. Acceptance criteria

- [ ] Every published location field has a named source and verification date.
- [ ] No placeholder or invented address, coordinate, hour or phone is published.
- [ ] All seven owner-listed sites are either verified and approved or explicitly marked unpublished.
- [ ] Otodrive conversion and Autogas LPG fueling are separate service flags on every site record.
- [ ] Jomvu and Jomvu Yard are separate records, pins and labels.
- [ ] Each published coordinate is confirmed as the customer entrance, not a town, road or nearby landmark.
- [ ] Each published site’s visible address, map pin, JSON-LD and matching Google Business Profile agree.
- [ ] “Open now” is computed from verified hours in `Africa/Nairobi`.
- [ ] Booking slots never fall outside verified hours.
- [ ] Double booking is prevented or explicitly not promised.
- [ ] The map is consent-gated and has a text alternative.
- [ ] Keyboard, screen reader, zoom and reduced-motion tests pass.
- [ ] Mobile layout works at 360 px and 390 px.
- [ ] Map failure/booking failure show usable fallbacks.
- [ ] Structured data validates with no errors.
- [ ] Canonical/OG URLs use the approved host.
- [ ] Privacy notice covers maps and booking data.
- [ ] Owner signs off each location record in writing.

---

## 15. Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Wrong pin sends customers astray | High | Verify entrance coordinates; add landmarks; test directions. |
| Address/county mismatch | High | Owner verification; match Google Business Profile. |
| “24/7” claim false | High | Publish verified hours; remove claim if unverified. |
| Jomvu and Jomvu Yard merged | High | Keep separate records, pins and labels; verify the 837 m separation. |
| Service conflation across Petrocity sites | High | Store Otodrive conversion and Autogas LPG as separate flags; publish only confirmed services. |
| Official Petrocity locator is incomplete or stale | Medium | Use it as supporting evidence only; reconcile with owner records and map listings. |
| Booking double-books | High | Server-side availability and constraints. |
| Map provider costs escalate | Medium | Start with free Embed; monitor if dynamic maps are added. |
| Consent gate hurts usability | Medium | Make “Show map” prominent; remember choice. |
| Google Business Profile out of sync | Medium | Assign an owner; quarterly check. |
| Location data duplicated in HTML | Medium | Single data record; generated output. |
| Privacy complaint | High | Notice, consent, retention, processor list. |
| Multi-location scope creep | High | Start with Mavoko; publish only verified records; defer a searchable locator until approved. |

---

## 16. Sources

Accessed 27 October 2026. Re-check before purchase.

- Google Maps Platform pricing: <https://developers.google.com/maps/billing-and-pricing/pricing>
- Google Maps Embed API: <https://developers.google.com/maps/documentation/embed/get-started>
- Google Maps Platform terms: <https://cloud.google.com/maps-platform/terms>
- Mapbox pricing: <https://www.mapbox.com/pricing>
- MapTiler pricing: <https://www.maptiler.com/pricing/>
- Stadia Maps pricing: <https://stadiamaps.com/pricing/>
- OpenStreetMap tile usage policy: <https://operations.osmfoundation.org/policies/tiles/>
- Leaflet: <https://leafletjs.com/>
- Leaflet licence: <https://github.com/Leaflet/Leaflet/blob/main/LICENSE>
- MapLibre GL JS: <https://maplibre.org/>
- MapLibre licence: <https://github.com/maplibre/maplibre-gl-js/blob/main/LICENSE.txt>
- Schema.org `AutoRepair`: <https://schema.org/AutoRepair>
- Schema.org `OpeningHoursSpecification`: <https://schema.org/OpeningHoursSpecification>
- WCAG 2.2: <https://www.w3.org/TR/WCAG22/>
- Kenya Data Protection Act 2019: <https://www.odpc.go.ke/data-protection-act/>
- Petrocity Kenya: <https://petrocityafrica.com/petrocity-kenya/>
- Petrocity service station locator: <https://petrocityafrica.com/service-station-locator/>
- Petrocity Autogas: <https://petrocityafrica.com/autogas/>
- Google Maps and OpenStreetMap listing links: see the evidence register in §12.9.
- Nominatim reverse geocoding: <https://nominatim.openstreetmap.org/>

---

## 17. Related documents

- `docs/PROJECT_AUDIT.md`
- `docs/CONTENT_AND_ASSET_INVENTORY.md`
- `docs/MODERNIZATION_ROADMAP.md`
- `docs/ONLINE_PRESENCE_PLAN.md`
- `docs/DECISIONS_AND_OPEN_QUESTIONS.md`

---

**End of plan. No location data was published as confirmed and no map markers were created. Research references remain provisional until owner verification and approval.**
