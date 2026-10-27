# Otodrive Website — Online Presence and Discoverability Plan

**Phase:** 1 — Discovery and audit  
**Date:** 27 October 2026  
**Status:** Audit and proposal — no accounts connected, no crawler policy changed, no chatbot added  
**Production changes made:** None  
**Companion documents:** `PROJECT_AUDIT.md`, `CONTENT_AND_ASSET_INVENTORY.md`, `MODERNIZATION_ROADMAP.md`, `LOCATIONS_INTEGRATION_PLAN.md`, `DECISIONS_AND_OPEN_QUESTIONS.md`

---

## 1. Purpose

This document assesses how discoverable Otodrive is through:

- Google Search and Google local search;
- Bing and Microsoft Copilot;
- social link previews;
- AI-assisted search and citation surfaces;
- AI crawler access;
- a possible on-site AI customer-support chatbot.

It separates:

1. **Verified technical defects** that can be fixed in code.
2. **Owner actions** that require business facts, account access or approval.
3. **Ongoing work** that must be maintained after launch.

**No ranking, traffic or revenue outcome is promised.** Search engines and AI platforms decide independently what to crawl, index and show. The recommendations are intended to remove technical blockers and make the site’s facts clear, consistent and trustworthy.

---

## 2. Executive summary

### What is working

- The site is served over HTTPS and all eight content pages plus `booking.html` return HTTP 200.
- Pages are server-rendered HTML, so the main copy is available without JavaScript execution.
- The homepage has a title, meta description, Open Graph tags, Twitter card tags and `AutoRepair` JSON-LD.
- One Google Maps embed identifies a Mavoko location.
- The site has real service copy, project photography, testimonials and contact details.

### What is blocking discoverability

| Priority | Finding | Evidence | Consequence |
|----------|---------|----------|-------------|
| Critical | Canonical and social URLs point to `https://otodrive.co.ke/`, which has no A record | Live homepage `<link rel="canonical">`, `og:url`, `twitter:url`; DNS query | Search engines and social scrapers are pointed at a host that cannot serve the page |
| Critical | No `robots.txt` or `sitemap.xml` | Both return 404 on 27 October 2026 | No crawl guidance or URL discovery aid; no explicit AI crawler policy |
| High | Only the homepage has a canonical, meta description, Open Graph and Twitter tags | Page-by-page metadata audit | Subpages have weak or no search/social previews |
| High | Most titles are generic; several descriptions are empty | “About”, “Services”, “Projects”, “Testimonial”, “Contact”, “About” on maps | Poor relevance and click-through signals; duplicate-looking pages |
| High | Location data is not published as text, and JSON-LD address/hours conflict | No street address; “Mavoko, Nairobi, 00100”; 24/7 vs booking hours | Local search and AI answers can repeat wrong information |
| High | The site is reachable on HTTP and HTTPS, and on `www` and non-`www`, without redirects | Response headers on 27 October 2026 | Duplicate URLs and split signals |
| High | The homepage autoplays a 47.1 MiB video | `lpgtech_conversion_movie.mp4` = 49,394,533 bytes | Mobile page experience is poor; performance scoring is unreliable |
| High | `blog.html` is linked site-wide but returns 404 | Footer links; HTTP 404 | Crawl waste and a dead end for visitors |
| Medium | Social preview image is relative, contains a space and is 819×474 | `og:image="images/website Logo.png"` | Preview may fail, crop or look low-resolution |
| Medium | `navbar.html` and `booking.html` are public and indexable, with no `noindex` | Both return 200; no robots meta | Low-value or duplicate pages can be crawled |
| Medium | No verified Google Business Profile or Search Console/Bing access | No account access; no verification meta | Cannot confirm indexation, local listing ownership or query data |
| Unknown | No evidence of AI chat demand; analytics is broken | No FAQ, no working analytics, no chat | A chatbot would be built on unverified facts and unmeasured demand |

### Recommendation

1. **Fix the canonical host and redirects first.** This is the single highest-value SEO change and it also fixes social previews.
2. **Add a deliberate `robots.txt` and sitemap**, with an owner-approved AI training policy. Do not add special “AI files” as a substitute.
3. **Publish a verified record for each service point, starting with Mavoko**, plus a strong location index/page before adding structured data or local-search claims.
4. **Write unique titles, descriptions and preview images** for every indexable page.
5. **Repair crawl and quality blockers**: remove the blog 404, fix broken assets, reduce duplicate host/protocol URLs, fix headings and alt text.
6. **Measure in Google Search Console and Bing Webmaster Tools** once ownership is confirmed. Do not rely on the placeholder analytics.
7. **Do not add an AI chatbot now.** Build verified FAQ, location, contact and booking foundations first. Reassess only with a defined pilot, approved content and human handoff.

---

## 3. Method, labels and limitations

### 3.1 Method

1. Read the live HTML for every public page on 27 October 2026.
2. Checked HTTP status, redirects, DNS, `robots.txt`, `sitemap.xml` and `llms.txt`.
3. Extracted titles, descriptions, robots directives, canonical tags, Open Graph/Twitter tags, headings, image alt text and JSON-LD.
4. Sent requests with Googlebot, Bingbot, GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot and PerplexityBot user-agent strings.
5. Reviewed current primary documentation from Google, Microsoft, OpenAI, Anthropic, Perplexity, the Open Graph protocol and W3C.
6. Reused verified evidence from `PROJECT_AUDIT.md` for performance, forms, booking and accessibility.
7. Did not connect any account, submit any form, create any listing, change any crawler policy or install any chatbot.

### 3.2 Labels

| Label | Meaning |
|-------|---------|
| **Verified** | Directly observed in the live site, DNS, HTTP response or a dated primary source. |
| **Inferred** | A reasonable conclusion from verified evidence, not directly confirmed. |
| **Unknown** | Requires owner knowledge, account access or a decision. |

### 3.3 Limitations

- No Google Search Console, Bing Webmaster Tools, Google Business Profile, analytics or social account access.
- No server logs or CDN/WAF logs; AI crawler requests could be tested only at the user-agent level.
- No site search or keyword research; no traffic or ranking data.
- No real-device or throttled-network testing.
- Search and AI product behaviour changes frequently; re-check sources before implementation.
- This is not legal advice. Privacy and consumer-law questions need a qualified adviser.

---

## 4. Current state at a glance

| Area | Current state | Status |
|------|---------------|--------|
| Working web host | `https://www.otodriveafrica.com/` | Verified |
| Claimed canonical host | `https://otodrive.co.ke/` | Verified; no A record |
| HTTP → HTTPS redirect | Not observed | Verified |
| `www` → non-`www` redirect | Not observed; both serve 200 | Verified |
| `robots.txt` | 404 | Verified |
| `sitemap.xml` | 404 | Verified |
| `llms.txt` | 404 | Verified |
| Meta robots | None on sampled pages | Verified |
| Canonical tags | Homepage only; points to dead host | Verified |
| Meta descriptions | Homepage only | Verified |
| Open Graph / Twitter tags | Homepage only; relative image; dead host | Verified |
| Structured data | Homepage `AutoRepair` only; unverified address/hours/geo | Verified |
| Location page | `maps.html`; generic title “About”; no text address | Verified |
| Location network | One Mavoko pin published; owner lists seven service points | Mixed: published pin verified, wider network owner-provided |
| Google Business Profile | Ownership/verification unknown | Unknown |
| Search Console / Bing Webmaster Tools | Verification status unknown | Unknown |
| AI crawler directives | None; AI user-agent requests returned 200 | Verified at request level |
| AI chatbot | None | Verified |
| Analytics | Placeholder IDs; not usable | Verified |
| Lighthouse SEO | 0.60 on the homepage (audit run) | Verified from prior audit |

---

## 5. Technical SEO

### 5.1 Crawlability and indexability

**Verified:**

- `robots.txt` returns 404. There are no site-level crawl directives.
- `sitemap.xml` returns 404. No sitemap is advertised or discoverable.
- No `<meta name="robots">` or `X-Robots-Tag` was observed on the sampled pages; pages are indexable by default.
- All eight content pages and `booking.html` return 200.
- `blog.html` returns 404 but is linked from every footer.
- `navbar.html` returns 200 and is a navigation fragment, not a real page. It has no `noindex`.
- `booking.html` returns 200 and has no canonical or description; it is indexable.
- The live server is Apache on `62.12.117.31`; no CDN or WAF was observed.

**Inferred:**

- Because `robots.txt` is absent, crawlers that honour the standard have no explicit restriction. A missing file is not a positive signal; it simply leaves access open.
- A crawler may discover `navbar.html` or `booking.html` through links, the repository, or direct requests. Low-value pages should not compete with service and location pages.

**Recommended:**

- Publish a valid `robots.txt` at the canonical host.
- Include the sitemap URL.
- Exclude development fragments and duplicate paths deliberately; do not block CSS, JavaScript or images needed for rendering.
- Decide explicitly whether `booking.html` should be indexed. If it remains an unverified booking flow, consider `noindex` until the flow is trustworthy.
- Remove `navbar.html` from production or exclude it from crawling.
- Submit the sitemap in Search Console and Bing Webmaster Tools after ownership is confirmed.

### 5.2 Canonicalisation and redirects

**Verified:**

- The homepage contains:
  - `<link rel="canonical" href="https://otodrive.co.ke/">`
  - `<meta property="og:url" content="https://otodrive.co.ke/">`
  - `<meta property="twitter:url" content="https://otodrive.co.ke/">`
- `otodrive.co.ke` has no A record. The working site is `www.otodriveafrica.com`.
- Both `http://www.otodriveafrica.com/` and `https://www.otodriveafrica.com/` return 200 without a redirect.
- Both `https://otodriveafrica.com/` and `https://www.otodriveafrica.com/` return 200 without a redirect.
- No canonical tag was found on `about.html`, `services.html`, `projects.html`, `testimonial.html`, `contact.html`, `get-quote.html`, `maps.html`, `booking.html`, or `navbar.html`.

**Impact:**

- The site asks Google and social platforms to index a hostname that cannot resolve.
- The same content is reachable through at least four URL variants: HTTP/HTTPS × apex/www.
- Subpages have no canonical instruction, so any duplicate or parameterised URL has no consolidation signal.

**Recommended after owner approval:**

1. Use the confirmed canonical host `https://www.otodriveafrica.com/` and HTTPS protocol; redirect HTTP and `otodrive.co.ke` to it.
2. 301 redirect HTTP to HTTPS.
3. 301 redirect the alternate host to the chosen host.
4. Put the same absolute canonical on every indexable page.
5. Update Open Graph, Twitter and JSON-LD URLs to the same host.
6. Verify the canonical host in Search Console and Bing Webmaster Tools.
7. Do not change DNS or redirects until the owner confirms the domain strategy.

### 5.3 Titles, descriptions and headings

**Verified page metadata (27 October 2026):**

| Page | Title | Meta description | Canonical | H1 count |
|------|-------|------------------|-----------|----------|
| `index.html` | “OTODRIVE - Kenya's Leading LPG Autogas Conversion & Services” | Present | Dead host | 10 |
| `about.html` | “About” | Missing | None | 1 |
| `services.html` | “Services” | Missing | None | 1 |
| `projects.html` | “Projects” | Missing | None | 1 |
| `testimonial.html` | “Testimonial” | Missing | None | 3 |
| `contact.html` | “Contact” | Missing | None | 1 |
| `get-quote.html` | “Contact” | Missing | None | 1 |
| `maps.html` | “About” | Missing | None | 0 |
| `booking.html` | “Book a Service - OTODRIVE” | Missing | None | 1 |
| `blog.html` | Server 404 | Missing | None | 0 |
| `navbar.html` | “Document” | Missing | None | 0 |

**Issues:**

- Titles are generic and do not state the service plus location plus brand.
- `maps.html` is titled “About”; `get-quote.html` is titled “Contact”. These are wrong-page signals.
- Only the homepage has a meta description. Descriptions are not ranking factors by themselves, but they affect snippet quality and click-through.
- The homepage has ten `<h1>` elements; `testimonial.html` has three; `maps.html` has none. Heading structure should be one descriptive `h1` and logical `h2`/`h3` levels.
- `about.html` and `maps.html` still contain a copied Turkish/foreign autogas keyword list. Modern search engines ignore the keywords meta tag, but it signals unfinished templating and should be removed in the content phase.
- The homepage title and description include unverified “40% savings” and “24/7” claims. Fix the facts before optimising the metadata.

**Recommended:**

- One unique title per indexable page, written for people first, including the service and location where true.
- One unique description per indexable page, summarising the page and a clear next step.
- One `h1` per page; use `h2`/`h3` for sections.
- Do not stuff keywords or create near-duplicate pages for every query variation.

### 5.4 Internal links and site structure

**Verified:**

- The header/footer link to the main pages and `booking.html`.
- Every footer links to `blog.html`, which returns 404.
- There are no breadcrumbs.
- There are no location-specific landing pages.
- There are no related-service or related-project links.
- Homepage service cards use generic “Read More” link text rather than descriptive text.
- `maps.html` contains duplicated `<head>` and `<body>` structures and inline global CSS.

**Recommended:**

- Fix or remove the blog link before submitting a sitemap.
- Add breadcrumbs only if a location or content hierarchy is created.
- Link service pages to relevant projects and the location page with descriptive anchor text.
- Keep one canonical URL per page; avoid parameter variants.
- Fix the duplicated document structure on `maps.html`.

### 5.5 Mobile usability

**Verified:**

- Most content pages contain three `<meta name="viewport">` tags; one sets `maximum-scale=1`.
- `booking.html` and `navbar.html` have one viewport tag.
- The mobile hero is dark-on-dark; the logo is clipped; carousel arrows and testimonial names overlap at narrow widths.
- The homepage autoplays a 47.1 MiB video.
- Lighthouse accessibility was 0.75 on the homepage; SEO was 0.60.

**Impact:** Mobile-first indexing evaluates the mobile rendering. Layout and readability problems affect both users and search quality signals.

**Recommended:** one viewport tag per page, no `maximum-scale=1`, and the Phase 2C/2D layout and media fixes in the roadmap.

### 5.6 Page experience and speed

| Finding | Evidence | SEO relevance |
|---------|----------|---------------|
| 47.1 MiB autoplay hero video | `49,394,533` bytes | Dominates mobile transfer and delays meaningful paint |
| 897.2 KB `plugin.js` | Repository asset | Large parse/compile cost |
| jQuery loaded twice | `jquery.min.js` and `jquery-3.0.0.min.js` | Duplicate payload and conflict risk |
| Bootstrap, Popper and duplicate CSS | Repository asset inventory | Redundant bytes |
| No compression or cache headers | Response headers | Slower repeat visits and crawling |
| No reliable Lighthouse performance score | Audit run | Performance must be measured before/after, not assumed |
| Missing font, favicon and `swiper.min.css` | 404s | Broken rendering and wasted requests |
| Map iframe loads eagerly | Multiple pages | Third-party requests before consent |

**Recommended:** implement the Phase 2D budgets in `MODERNIZATION_ROADMAP.md`; measure lab and field data after the fix. Do not claim Core Web Vitals compliance before measurement.

### 5.7 Broken links and missing assets

**Verified 404s or missing references:**

- `blog.html` — linked in every footer.
- `send_email.php` — legacy form endpoint referenced by the contact fallback.
- `images/fevicon.png` — referenced by most pages.
- `fonts/BalooChettan-Regular.ttf` — referenced by `style.css`.
- `css/swiper.min.css` — imported by `style.css`.
- `/js/contactscript.js` — 404, but current pages use `/contactscript.js`, which is 200.

These are crawl waste and user-facing defects. Fix or remove them in Phases 2A/2B.

### 5.8 Structured data

**Verified:** the homepage contains one `AutoRepair` JSON-LD block with:

- `name`: “Otodrive”
- `image`: `https://otodrive.co.ke/images/website Logo.png`
- `address`: `streetAddress` “Mavoko”, `addressLocality` “Nairobi”, `addressRegion` “Nairobi”, `postalCode` “00100”, `addressCountry` “KE”
- `geo`: `-1.4297154, 36.9601985`
- `url`: `https://otodrive.co.ke`
- `telephone`: `+254704644909`
- `priceRange`: `$$`
- `openingHoursSpecification`: every day, `00:00–23:59`
- `sameAs`: Facebook, `x.com/OtodriveKE`, `instagram.com/otodriveke`
- `serviceType`: LPG Conversion, Vehicle Diagnosis, LPG System Check, LPG Refueling

**Problems:**

1. The image and URL use the non-resolving `otodrive.co.ke` host.
2. The image URL contains an unencoded space.
3. The address mixes Mavoko (Machakos County) with Nairobi and the Nairobi GPO postal code `00100`.
4. The 24/7 hours conflict with the booking script’s Mon–Fri/Sat/Sun hours.
5. `priceRange` is not published as visible text and is unverified.
6. The street address and coordinates are not displayed as text; hours appear only as a general “open 24/7” claim, not as a schedule. The markup is therefore not clearly representative of visible content.
7. There is no structured data on the location page, service pages or booking page.
8. There is no `Organization`/logo markup, breadcrumb markup or `hasMap`/directions link.

**Recommended:**

- Do not “fix” the values by guessing. Verify each field with the owner and the Google Business Profile.
- Generate JSON-LD from one verified record per location, as described in `LOCATIONS_INTEGRATION_PLAN.md`.
- Use the most specific accurate `LocalBusiness` subtype(s); `AutoRepair` and/or `GasStation` may be appropriate depending on verified services. Do not add types that overstate the business.
- Include only fields that are visible and verified.
- Use an absolute, crawlable image URL with proper encoding.
- Do not add `aggregateRating`, `review` or testimonial markup unless the reviews are genuine, visible and policy-compliant.
- Validate with the Rich Results Test and Schema.org validator after implementation. Validation does not guarantee a rich result.

### 5.9 Indexation status

**Unknown:** whether Google or Bing currently index `www.otodriveafrica.com`, `otodriveafrica.com`, `http://` variants, or pages under the dead `.co.ke` canonical. Search Console/Bing access and a `site:` check with the owner are required. Do not assume that a 200 response means a page is indexed.

---

## 6. Local search

### 6.1 Published NAP and hours

| Field | Published value | Status | Conflict or gap |
|-------|-----------------|--------|-----------------|
| Name | Otodrive / OtoDrive / OTODRIVE; “OtoDrive Autogas fueling and conversion Center, Mavoko” | Inconsistent | Brand casing varies; trading name not confirmed |
| Address | “Mavoko, Nairobi, Nairobi, 00100, KE” in JSON-LD | Unverified/inconsistent | Mavoko is in Machakos County; `00100` is a Nairobi GPO code |
| Street address | None published | Missing | Needed for directions and local search |
| Phone | `+254 704 644 909` | Published; ownership unconfirmed | Confirm it is the location line and is answered |
| Email | `info@otodrive.co.ke` | Published; MX exists via Microsoft 365 | Mailbox monitoring and ownership unknown; no DMARC observed for `.co.ke` |
| Opening hours | “24/7 support”; JSON-LD 24/7 | Unverified/conflicting | Booking script uses Mon–Fri 08:00–17:00, Sat 08:00–12:00, Sun closed |
| Booking hours | Mon–Fri 08:00–17:00; Sat 08:00–12:00; Sun closed | Coded, not published as policy | Conflicts with site-wide 24/7 |
| Coordinates | `-1.4297154, 36.9601985` | Published; source unknown | Confirm entrance, not approximate area |
| Services | Four services | Published; unverified | Confirm which are available at this location |
| Category | `AutoRepair` in JSON-LD | Inferred | Confirm the most accurate primary category |
| Google Business Profile | Named place in embed | Unknown ownership | Claim/verify only as the owner |

**Owner-listed network (not yet verified):** the owner lists seven service points — Thika, Mavoko, Kangundo Road, Rongai, Shanzu, Jomvu and Jomvu Yard. Only Mavoko is currently published. The list mixes Otodrive conversion and Autogas LPG fueling; do not treat it as a verified NAP list or assume every site offers both. See `docs/LOCATIONS_INTEGRATION_PLAN.md` §12.8–12.10.

**Email DNS note (verified 27 October 2026):** `otodrive.co.ke` has MX records via Microsoft 365 and an SPF record (`v=spf1 include:spf.protection.outlook.com -all`). No `_dmarc` record was returned. `otodriveafrica.com` has an SPF record and `v=DMARC1; p=none`. DKIM was not verified. This is relevant to form/booking deliverability and to the contact details published for local search.

### 6.2 Google Business Profile

**Current state:** The Google Maps embed references a named place, “OtoDrive Autogas fueling and conversion Center Mavoko”. The owner also lists six other service points in the network, including Petrocity stations and the Jomvu Yard conversion centre. Which listings are claimed, verified, duplicated or kept current is **Unknown**. No Google Business Profile account access was available, and no listing was created or edited.

**Owner actions (do not perform during the audit):**

1. Search Google Maps for each owner-listed site and identify the correct listing.
2. Claim or verify ownership through Google Business Profile for each confirmed listing.
3. Confirm the real-world name, address, phone, category, hours, services and opening date per site.
4. Add the website URL using the approved canonical host.
5. Add photos only with rights and consent.
6. Set special hours for holidays and temporary closures.
7. If refuelling and conversion/service have different hours, use Google’s “More hours” feature only after verifying the policy.
8. Respond to reviews under the business’s real identity; do not solicit or fabricate reviews.
9. Keep the website and the profile identical. A quarterly check is the minimum.

**Do not:** create a second listing for the same location, add keywords to the business name, use a virtual office, or publish an address that does not receive customers.

### 6.3 Location page

`maps.html` is not a usable local landing page: it is titled “About”, has no `h1`, contains duplicated document structure, and publishes no street address, hours or directions as text.

**Recommended for the current published Mavoko location and future per-site pages:**

- A location index and one canonical page per verified site (or a clearly structured section on `contact.html` if the owner prefers).
- Visible name, full verified address, phone, email, hours, separate Otodrive/Autogas service labels, parking/accessibility notes and directions.
- A “Get directions” link generated from verified coordinates or a Place ID.
- A text-first layout; the map is an enhancement.
- A consent-gated map embed with a descriptive `title`.
- `LocalBusiness`/`AutoRepair` JSON-LD generated from the same per-site record.
- Unique title and description that include the verified location, not invented landmarks.
- No thin pages for locations that do not exist or are not approved.

### 6.4 Reviews and testimonials

- The site displays six testimonials but provides no dates, vehicle details, verification or consent statement.
- No review or aggregate-rating markup is present. That is correct until genuine, visible reviews exist.
- Do not convert testimonials into `Review`/`AggregateRating` markup without evidence and policy compliance.
- Confirm written consent before reusing names, quotes or project photos.
- Google Business Profile reviews are owner-managed; the website should not claim a rating that is not displayed and verifiable.

### 6.5 Citations and consistency

Directory and social citations were not audited because they require owner access and business verification. The owner should ensure that the same name, address, phone, website and hours appear on:

- Google Business Profile;
- Facebook, Instagram, X and LinkedIn (if active);
- relevant Kenyan business directories and automotive listings;
- invoices, email signatures and printed material that customers may see.

Do not buy citations or promise local-pack rankings. Consistency and genuine reviews matter more than volume.

---

## 7. Social sharing

### 7.1 Current metadata

Only the homepage contains Open Graph and Twitter card tags.

| Tag | Current value | Problem |
|-----|---------------|---------|
| `og:type` | `website` | Fine |
| `og:url` | `https://otodrive.co.ke/` | Dead host |
| `og:title` | Homepage title | Uses unverified “leading”/“40%”/“24/7” claims |
| `og:description` | Homepage description | Same unverified claims |
| `og:image` | `images/website Logo.png` | Relative URL, contains a space, 819×474, no width/height/alt |
| `twitter:card` | `summary_large_image` | Uses `property=` rather than the conventional `name=`; compatibility should be tested |
| `twitter:url` | `https://otodrive.co.ke/` | Dead host |
| `twitter:image` | `images/website Logo.png` | Relative URL, contains a space |
| `og:site_name` | Missing | Optional but useful |
| `og:image:alt` | Missing | Accessibility and preview quality |
| `og:image:width` / `height` | Missing | Less reliable rendering |
| Subpage OG/Twitter tags | Missing | Shares of services, projects, location and booking have no controlled preview |

### 7.2 What this means

- Open Graph requires an image URL; a relative path is not a valid absolute URL in the specification. Some scrapers resolve it, some do not. The result is inconsistent.
- The URL contains an unencoded space (`website Logo.png`). Encode it or, better, rename the asset to a URL-safe filename.
- The logo is 819×474, not a purpose-built 1200×630 preview. It may be cropped or look soft in a large card.
- The canonical and social URLs point to a dead host, so a preview may show the wrong domain or fail to resolve.
- Subpages have no Open Graph data, so social platforms may fall back to the page title and first image, or show nothing useful.
- Social platforms control the final preview. Metadata improves the chance of a correct preview; it does not guarantee one.

### 7.3 Recommended implementation

1. Use the confirmed canonical host `https://www.otodriveafrica.com/`.
2. Create one approved preview image per page type:
   - homepage;
   - services;
   - projects;
   - location;
   - booking or quote.
3. Use an absolute HTTPS URL, a URL-safe filename and a 1200×630 (1.91:1) image unless the owner’s brand guidelines require another ratio.
4. Add `og:title`, `og:description`, `og:url`, `og:image`, `og:image:width`, `og:image:height`, `og:image:alt`, `og:site_name` and `og:locale` to every indexable page.
5. Use absolute canonical URLs that match the page, not the homepage on every page.
6. Add Twitter card tags using the conventional `name=` attribute; keep `summary_large_image` only where a suitable image exists.
7. Keep preview copy consistent with the visible page and free of unverified claims.
8. Validate with:
   - Facebook Sharing Debugger: <https://developers.facebook.com/tools/debug/>
   - LinkedIn Post Inspector: <https://www.linkedin.com/post-inspector/>
   - X composer/card preview (owner account required).
9. Re-scrape after deployment. Do not assume a cached preview has updated.
10. Add `sameAs` links only for verified official profiles.

### 7.4 Social profiles

| Platform | Current published state | Status |
|----------|-------------------------|--------|
| Facebook | `facebook.com/profile.php?id=61566117596915` | Published; ownership unverified |
| X/Twitter | Repository uses `OTODRIVE_KENYA`; live pages and JSON-LD use `OtodriveKE` | Inconsistent; confirm official handle |
| Instagram | Most live pages use `otodriveke`; `get-quote.html` still uses `otodrivekenya` | Inconsistent; confirm official handle |
| LinkedIn | `#` or commented out | Placeholder; confirm whether active |
| YouTube/TikTok | None found | Confirm whether accounts exist |

Do not add a social profile to `sameAs` or the footer until the owner confirms it is official and actively controlled. A link to an abandoned or impostor profile damages trust.

---

## 8. AI-assisted discovery

### 8.1 How AI search uses the web

AI search is not one system. The main surfaces use different crawlers and rules.

| Platform | Search/citation crawler | Training crawler | User-initiated fetcher | Key point |
|----------|-------------------------|------------------|-----------------------|-----------|
| Google Search / AI Overviews / AI Mode | Googlebot | Google-Extended (control token) | Google user-triggered fetchers | Google says AI features use the same Search index and require no special optimisation |
| Bing / Copilot | Bingbot / Bing index | Microsoft’s published crawler controls | Copilot fetches | Microsoft’s guidelines cover Bing and Copilot experiences; verify index and citation data in Bing Webmaster Tools |
| ChatGPT | OAI-SearchBot | GPTBot | ChatGPT-User | OAI-SearchBot controls search inclusion; GPTBot controls training; ChatGPT-User is user-initiated |
| Claude | Claude-SearchBot | ClaudeBot | Claude-User | Anthropic documents all three and says they honour `robots.txt` |
| Perplexity | PerplexityBot | Not used for foundation-model training per Perplexity | Perplexity-User | PerplexityBot controls search; Perplexity-User generally ignores `robots.txt` because the user requested the fetch |

**Important distinctions:**

- Blocking a training crawler does not necessarily block search/citation. For example, blocking `GPTBot` does not block `OAI-SearchBot`; blocking `ClaudeBot` does not block `Claude-SearchBot`.
- `Google-Extended` is a robots.txt control token, not a separate crawler. It affects training/grounding in some Gemini systems, not inclusion in Google Search.
- User-initiated fetchers may not follow `robots.txt`. A site cannot fully control those requests through robots directives.
- `llms.txt` is not required for Google Search. Google’s current guidance says Google Search ignores it. It is optional for other systems and is not a substitute for crawlable HTML, internal links and a sitemap.

### 8.2 Current access test

**Verified on 27 October 2026:**

| Request | Result |
|---------|--------|
| `GET /robots.txt` | 404 |
| `GET /sitemap.xml` | 404 |
| `GET /llms.txt` | 404 |
| Googlebot user agent → homepage | 200 |
| Bingbot user agent → homepage | 200 |
| GPTBot user agent → homepage | 200 |
| OAI-SearchBot user agent → homepage | 200 |
| ClaudeBot user agent → homepage | 200 |
| Claude-SearchBot user agent → homepage | 200 |
| PerplexityBot user agent → homepage | 200 |
| `<meta name="robots">` | None observed |
| CDN/WAF | None observed |

**Caveat:** A user-agent string can be spoofed, and a 200 response does not prove that a real crawler visited or indexed the page. These tests show that the server did not block the requests at the application level. Server/CDN/WAF logs and Search Console/Bing data are required to confirm real crawl behaviour.

### 8.3 What this means for Otodrive

**Positive:**

- The site is static HTML, so the main copy is available without JavaScript.
- No `robots.txt` currently blocks AI or search crawlers.
- There is no observed WAF or CDN blocking.
- The site has real service descriptions and project content that could support citations if verified.

**Negative:**

- The canonical host is dead, so search and AI systems may not consolidate the right URL.
- There is no sitemap and no clear internal structure for location/services.
- Generic titles and missing descriptions weaken relevance.
- Unverified claims (40% savings, 24/7, “largest”, licences/partnerships) can be repeated by AI systems as if true.
- The location and hours are not published as clear text, so an AI system cannot reliably answer “where are you?” or “are you open?”.
- The broken contact/booking paths undermine agentic use: an AI agent or a visitor may be unable to complete an action.
- Google’s current guidance says a site must be included in generative AI features in Search Console to be eligible for display in them; that setting could not be verified without account access.

### 8.4 Crawler policy options

This is an owner decision. Do not deploy a policy until it is approved.

| Option | What it means | Effect on visibility | Recommendation |
|--------|---------------|----------------------|----------------|
| A. Allow search/citation, block training | Allow Googlebot, Bingbot, OAI-SearchBot, Claude-SearchBot, PerplexityBot; disallow Google-Extended, GPTBot, ClaudeBot | Keeps search/citation access; opts out of the listed training crawlers | **Recommended for review**, subject to owner policy and legal advice |
| B. Allow all | No AI-specific disallow rules | Maximum access, including training | Acceptable if the owner is comfortable with training use |
| C. Block all AI | Disallow AI tokens broadly | Reduces AI search/citation visibility; may not stop user-initiated fetches | Not recommended if discoverability is a goal |

**Draft shape for Option A (not implemented):**

```text
User-agent: *
Allow: /

# Search and citation crawlers are allowed by the wildcard above.
# Explicitly document the training opt-out:
User-agent: Google-Extended
Disallow: /

User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

Sitemap: https://www.otodriveafrica.com/sitemap.xml
```

**Notes:**

- The final host must be `https://www.otodriveafrica.com/`.
- `ChatGPT-User` and `Perplexity-User` are user-initiated and may not follow `robots.txt`; Anthropic documents `Claude-User` as honouring `robots.txt`. Do not claim that Option A blocks all AI access.
- Do not block Googlebot if you want Google Search or AI Overviews visibility.
- Do not add `llms.txt` as a substitute for this policy.
- Re-check vendor documentation before implementation; tokens and behaviour change.

### 8.5 Content readiness for AI answers

AI systems tend to cite content that is clear, specific, well structured and attributable. Otodrive should:

- publish a verified location card and a factual “Contact” page;
- answer common questions in plain language (what services, which vehicles, what to bring, how long, what it costs only if verified);
- use descriptive headings and short paragraphs;
- keep one topic per section and link to the relevant service/project page;
- show a last-updated date and an owner/author where appropriate;
- avoid invented statistics, rankings and regulatory claims;
- avoid creating thin pages for every possible query; Google’s spam policies treat scaled content abuse as a violation;
- keep booking/contact actions working, because AI agents and visitors both need a reliable next step.

**Do not** write “AI-optimised” copy that is unnatural or create pages solely for AI queries. Google’s current guidance says there are no special requirements for AI Overviews/AI Mode and warns against scaled content abuse.

### 8.6 Measurement

- Google Search Console: verify the property, submit the sitemap, review indexing and the Generative AI performance report (rolled out globally in 2026).
- Bing Webmaster Tools: verify the property, submit the sitemap, review index and AI/citation reporting where available.
- Analytics: only after consent is implemented; define events for form submit, quote request, call click, directions click and booking start/complete.
- Server logs: review Googlebot, Bingbot, OAI-SearchBot, Claude-SearchBot and PerplexityBot requests if logs are available.
- Social: re-test previews after metadata changes; record the date and result.

No ranking, citation or traffic outcome is guaranteed. Measure changes against the pre-change baseline.

---

## 9. AI customer-support chatbot

### 9.1 Is there a real visitor need?

Likely visitor questions:

- Where are you, and how do I get there?
- What are your hours?
- Can you convert my vehicle?
- How much does a conversion cost?
- How long does it take?
- What do I need to bring?
- Is my booking confirmed?
- What warranty do you provide?
- Can I refuel LPG at the station?

**Current ability to answer:**

| Question | Current site | Chatbot-safe answer? |
|----------|--------------|----------------------|
| Location | Map pin only; no text address | No |
| Hours | 24/7 claim conflicts with booking hours | No |
| Vehicle compatibility | General service copy only | No |
| Price | No published price | No |
| Duration | Not published | No |
| What to bring | Not published | No |
| Booking confirmation | Unverified API; success message claims email/calendar | No |
| Warranty | “with warrant” only | No |
| Refuelling | Service page says LPG fueling | Partly, but hours/availability unverified |

There is no FAQ, no working analytics and no evidence of chat demand. A chatbot would be answering from a weak, contradictory knowledge base.

### 9.2 Recommendation

**Do not deploy an AI chatbot now.** It would not fix the real problems, and it could:

- invent an address, opening hours, price, warranty or availability;
- repeat unverified regulatory or savings claims;
- collect personal data without an approved purpose or retention policy;
- create a new support channel that nobody monitors;
- add cost, maintenance and accessibility risk;
- create a false impression of 24/7 support.

**Do first:**

1. Fix the contact and quote forms.
2. Publish a verified location card, hours and directions.
3. Publish a short FAQ using only owner-approved facts.
4. Make booking request-only or back it with real availability.
5. Publish a privacy notice and consent flow.
6. Implement consent-gated analytics so demand can be measured.

### 9.3 If a pilot is approved later

A chatbot should be a **retrieval-augmented support assistant**, not a general-purpose model with web access.

| Area | Requirement |
|------|-------------|
| Use case | Answer a narrow set of questions about services, location, hours, what to bring and how to contact a person |
| Knowledge sources | Approved FAQ, verified location record, service descriptions, warranty terms, booking policy; versioned and dated |
| No-go topics | Prices, availability, legal/regulatory claims, medical/financial advice, anything not in the approved sources |
| Unknown handling | Say “I don’t have verified information” and offer phone, email or the contact form; never guess |
| Human handoff | A visible “Talk to a person” route during staffed hours; no promise of 24/7 |
| Booking | Do not confirm a slot; link to the booking/request flow and state that staff will confirm |
| Personal data | Collect only what is necessary; no sensitive data; clear notice; retention limit; deletion route |
| Privacy | Name the AI vendor as a processor; disclose data transfer; obtain consent where required; document lawful basis |
| Security | Rate limits, abuse detection, prompt-injection defences, no internal data or secrets in the prompt, vendor isolation, audit logs |
| Accessibility | WCAG 2.2 AA; keyboard and screen-reader operable; no auto-open; reduced-motion safe; a non-chat alternative for every task |
| Brand | Clear “AI assistant” label; no impersonation of staff; no invented authority |
| Cost | No vendor or volume has been selected, so no price is quoted. Budget for implementation, per-conversation/platform usage, content maintenance, monitoring, privacy/legal review and a capped pilot |
| Maintenance | Named content owner; monthly review; kill switch; fallback to static FAQ if the vendor fails |
| Metrics | Deflection is not enough; track resolution, escalation, wrong-answer reports, containment, cost per conversation and visitor satisfaction |

**Cost:** no vendor or conversation volume has been selected, so a responsible price cannot be quoted. Budget for implementation, platform subscription/usage, content maintenance, monitoring, privacy/legal review and staff time for escalations. A capped pilot is safer than an open-ended subscription.

**Pilot gate:** do not start until there are at least a verified FAQ/location/hours knowledge base, a monitored human handoff, a privacy notice, an accessibility review and a written budget cap. A pilot should be time-boxed (for example, 8–12 weeks) with a stop rule.

### 9.4 SEO note

A chatbot does not replace indexable service, location or FAQ content. Google’s guidance says no special AI markup or files are required, and chatbot conversations are not a shortcut to rankings. Keep the essential information in HTML that people and crawlers can read without opening a chat.

---

## 10. Prioritised action plan

### 10.1 Code and configuration changes (after approval)

| ID | Action | Phase | Depends on |
|----|--------|-------|------------|
| OP-01 | Implement 301 HTTP→HTTPS and alternate host→canonical for `https://www.otodriveafrica.com/` | 2A | Hosting/DNS access |
| OP-02 | Put the same absolute canonical on every indexable page | 2A | OP-01 |
| OP-03 | Fix or remove `blog.html` links; create a branded 404 | 2B | Owner blog decision |
| OP-04 | Fix missing favicon, font and `swiper.min.css`; remove dead references | 2B | None |
| OP-05 | Fix duplicate viewport tags and `maximum-scale=1`; repair mobile layout | 2C | None |
| OP-06 | Normalise headings and add meaningful image alt text | 2C | Content review |
| OP-07 | Reduce hero media, duplicate libraries and unused CSS/JS; add compression/cache | 2D | Hero media decision |
| OP-08 | Publish `robots.txt` and `sitemap.xml`; exclude low-value pages | 4 | Crawler policy approval |
| OP-09 | Write unique titles and descriptions for every indexable page | 4 | Verified facts |
| OP-10 | Add absolute Open Graph/Twitter metadata and approved preview images | 4 | Owner asset approval |
| OP-11 | Generate verified `LocalBusiness`/`AutoRepair` JSON-LD from one record | 3/4 | Address, hours, geo, services verified |
| OP-12 | Publish one text-first location page with directions and hours | 3 | Location verification |
| OP-13 | Verify Search Console and Bing Webmaster Tools; submit sitemap | 4 | Owner access |
| OP-14 | Implement consent-gated analytics and conversion events | 5 | Privacy/consent approval |
| OP-15 | Add an FAQ from approved facts | 4 | Owner content |
| OP-16 | Do not deploy a chatbot until Section 9.3 gates are met | 5+ | Separate approval |

### 10.2 Owner actions

| ID | Action | Why it matters |
|----|--------|----------------|
| OA-01 | Confirm the canonical domain and who controls DNS/hosting | All canonical, redirect and sitemap work depends on it |
| OA-02 | Confirm the exact NAP, hours, services and coordinates for each site | Local search and JSON-LD must be true |
| OA-03 | Claim/verify the Google Business Profile listings; confirm ownership | Local listing consistency; do not create duplicates |
| OA-04 | Confirm official social handles and which profiles are active | `sameAs`, footer links and previews |
| OA-05 | Approve preview images and wording | Social cards and brand consistency |
| OA-06 | Decide the AI crawler/training policy | Robots policy has visibility and business implications |
| OA-07 | Decide whether a chatbot is wanted, deferred or rejected | Scope, cost, privacy and support load |
| OA-08 | Provide Search Console/Bing Webmaster Tools access or verification | Indexation and query measurement |
| OA-09 | Confirm privacy contact, retention and consent approach | Forms, booking, maps and analytics |
| OA-10 | Confirm testimonial/project consent and regulatory evidence | Trust, legal and review markup |

### 10.3 Ongoing work

- Review Search Console and Bing Webmaster Tools monthly.
- Keep the sitemap current when pages change.
- Check Google Business Profile hours, services and photos quarterly.
- Re-test social previews after metadata or image changes.
- Review AI citation/performance reports where available.
- Remove or update stale claims and copyright.
- Re-check crawler documentation before changing `robots.txt`.
- Review chatbot logs and wrong-answer reports if a pilot is approved.

---

## 11. Acceptance criteria

### Technical SEO

- [ ] One canonical host and protocol; HTTP and alternate host 301 to it.
- [ ] Every indexable page has a self-referencing absolute canonical.
- [ ] `robots.txt` and `sitemap.xml` return 200 and reference the canonical host.
- [ ] `blog.html` is fixed, redirected or removed from navigation.
- [ ] `navbar.html` is not publicly indexable.
- [ ] Every indexable page has a unique title and description.
- [ ] Every page has one descriptive `h1` and logical heading order.
- [ ] No internal link or referenced local asset returns 404.
- [ ] No duplicate viewport tags; zoom is not disabled.
- [ ] Mobile rendering has no overlap or clipped content at 360, 390, 768, 1024 and 1440 px.
- [ ] Performance budgets in `MODERNIZATION_ROADMAP.md` are met or a documented exception is approved.
- [ ] Structured data contains only verified, visible facts and validates.
- [ ] Google Search Console and Bing Webmaster Tools are verified with named owners.
- [ ] The sitemap is submitted and index coverage is reviewed.

### Local search

- [ ] Each published site’s name, address, phone, website and hours match across the site, its Google Business Profile and official social profiles.
- [ ] The location index and each verified location page contain a text address, directions, hours, phone and separate service labels.
- [ ] Otodrive conversion and Autogas LPG fueling are not conflated; Jomvu and Jomvu Yard are distinct.
- [ ] The map is consent-gated and has a descriptive title and text alternative.
- [ ] Each coordinate is confirmed as the customer entrance, not a town or nearby landmark.
- [ ] No review/rating markup is added without genuine, visible reviews.

### Social sharing

- [ ] Every indexable page has absolute Open Graph and Twitter metadata.
- [ ] Preview images are approved, URL-safe, absolute HTTPS assets with width, height and alt text.
- [ ] Previews are tested in Facebook Sharing Debugger, LinkedIn Post Inspector and X.
- [ ] Only verified official profiles are linked.

### AI discovery

- [ ] The owner-approved crawler policy is live and documented.
- [ ] Search/citation crawlers are not blocked unintentionally.
- [ ] The sitemap and canonical host are correct.
- [ ] Location, hours, services and contact facts are available as text.
- [ ] No unverified claim is presented as fact.
- [ ] `llms.txt` is not treated as a requirement or a substitute for SEO.
- [ ] Search Console/Bing AI reporting is reviewed where available.

### Chatbot

- [ ] The owner has explicitly approved or rejected a pilot.
- [ ] If approved, Section 9.3 requirements are met before launch.
- [ ] A capped budget and named content/support owner exist.
- [ ] A non-chat route exists for every task.
- [ ] No sensitive data is collected without a policy.
- [ ] Accessibility and human handoff are tested.

---

## 12. Owner decisions for this plan

| ID | Decision | Default if unanswered |
|----|----------|-----------------------|
| OP-Q1 | Canonical host confirmed as `https://www.otodriveafrica.com/`; `otodrive.co.ke` is legacy email only | Implement redirects once hosting/DNS access is available |
| OP-Q2 | Who controls DNS, hosting, Search Console and Bing Webmaster Tools? | Pause verification and redirects |
| OP-Q3 | Which Google Business Profile listings are official, and who owns each one? | Do not edit or create a listing |
| OP-Q4 | Which social handles and profiles are official? | Keep current links, flagged |
| OP-Q5 | Which AI crawler policy: search/citation only, allow all, or block all? | No `robots.txt` change |
| OP-Q6 | Is an AI chatbot wanted now, later or not at all? | No chatbot |
| OP-Q7 | Which preview images and wording are approved? | Do not publish new preview assets |
| OP-Q8 | Is there budget for a chatbot or paid search tooling? | $0; no paid service |

---

## 13. Sources

All sources accessed 27 October 2026 unless a different date is shown. Search and AI documentation changes frequently; re-check before implementation.

### Google Search and local

- AI features and your website (last updated 10 December 2025): <https://developers.google.com/search/docs/appearance/ai-features>
- Optimizing your website for generative AI features on Google Search (last updated 10 July 2026): <https://developers.google.com/search/docs/fundamentals/ai-optimization-guide>
- Overview of Google crawlers and fetchers (last updated 12 June 2026): <https://developers.google.com/crawling/docs/crawlers-fetchers/overview-google-crawlers>
- List of Google’s common crawlers, including Google-Extended (last updated 15 October 2026): <https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers>
- Search Essentials: <https://developers.google.com/search/docs/essentials>
- Technical requirements: <https://developers.google.com/search/docs/essentials/technical>
- Robots.txt introduction: <https://developers.google.com/search/docs/crawling-indexing/robots/intro>
- Build and submit a sitemap: <https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap>
- Canonical URLs: <https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls>
- Title links: <https://developers.google.com/search/docs/appearance/title-link>
- Snippets: <https://developers.google.com/search/docs/appearance/snippet>
- Local business structured data (last updated 8 September 2026): <https://developers.google.com/search/docs/appearance/structured-data/local-business>
- Establish your business details with Google (last updated 10 December 2025): <https://developers.google.com/search/docs/appearance/establish-business-details>
- Google Business Profile guidelines: <https://support.google.com/business/answer/3038177>
- Google Search Console Generative AI performance report: <https://support.google.com/webmasters/answer/16984139>
- Google Search Central announcement, 3 June 2026: <https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports>

### Microsoft Bing and Copilot

- Bing Webmaster Guidelines: <https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a>
- Bing Webmaster Tools: <https://www.bing.com/webmasters/>

### AI crawler documentation

- OpenAI crawlers: <https://developers.openai.com/api/docs/bots>
- Anthropic crawler documentation (article dated 7 April 2026): <https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler>
- Perplexity crawlers: <https://docs.perplexity.ai/docs/resources/perplexity-crawlers>

### Social sharing

- The Open Graph protocol: <https://ogp.me/>
- Facebook Sharing Debugger: <https://developers.facebook.com/tools/debug/>
- LinkedIn Post Inspector: <https://www.linkedin.com/post-inspector/>

### Accessibility, privacy and security

- WCAG 2.2, W3C Recommendation, 5 October 2023: <https://www.w3.org/TR/WCAG22/>
- Kenya Data Protection Act 2019: <https://www.odpc.go.ke/data-protection-act/>
- OWASP Top 10 for LLM Applications: <https://genai.owasp.org/llm-top-10/>

---

## 14. Related documents

- `docs/PROJECT_AUDIT.md` — full technical, security, accessibility and performance audit.
- `docs/CONTENT_AND_ASSET_INVENTORY.md` — pages, claims, assets, forms and links.
- `docs/MODERNIZATION_ROADMAP.md` — phased implementation plan and acceptance criteria.
- `docs/LOCATIONS_INTEGRATION_PLAN.md` — location data model, mapping options and verification checklist.
- `docs/DECISIONS_AND_OPEN_QUESTIONS.md` — decision log, blocking questions and sign-off.

---

**End of plan. No accounts were connected, no crawler policy was changed, no content was published, and no chatbot was added. Implementation awaits owner verification and approval.**
