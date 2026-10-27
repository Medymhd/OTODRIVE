# Otodrive Website — Project Audit

**Phase:** 1 — Discovery and audit  
**Date:** 27 October 2026  
**Prepared for:** Otodrive owner  
**Prepared by:** Senior full-stack developer / technical lead  
**Status:** Audit complete — awaiting owner review  
**Production changes made:** None

---

## 1. Executive summary

Otodrive currently runs a hand-built static website: HTML, CSS, JavaScript and one PHP mail script. The public site is served by Apache on a shared host at `62.12.117.31`. The GitHub repository is a stale snapshot: the live site has changed substantially and now includes a booking page, EmailJS forms, SEO metadata, analytics placeholders and notification-prompt code that the repository does not contain.

The site looks complete on the surface, but several core journeys are broken or unverifiable:

- The live canonical URL points to `https://otodrive.co.ke/`, a domain with **no A record**, while the working site is `https://www.otodriveafrica.com/`.
- The live contact and quote forms load `contactscript.js` before the form exists, so it throws a `TypeError`; the contact page’s legacy fallback posts to `send_email.php` (404), and the quote page’s legacy AJAX is commented out. Depending on how the visitor submits, a message may be sent through EmailJS or silently lost.
- The live booking page generates every weekday slot as “available” from hard-coded hours, contradicts the site’s “24/7” claims, and depends on an undocumented external API on Render.
- Analytics is not functioning: Google Analytics, Hotjar and Microsoft Clarity are all initialised with placeholder IDs. Any current traffic data is unreliable.
- The homepage forces a 47.1 MiB autoplay video with no poster, fallback or reduced-motion handling.
- The accessibility score is **0.75** and the SEO score is **0.60** in Lighthouse, with failures that affect real users, not just crawlers.
- The repository contains placeholder content (“Home Work”, Lorem Ipsum), missing assets, duplicate libraries and no README, tests, build step, CI or deployment documentation.

The site is recoverable without a rewrite. The recommended path is stabilise first, then fix accessibility and performance, then decide the booking/locations architecture with verified business facts. A redesign or framework migration is **not** justified at this stage and is explicitly out of scope until separately approved.

### Top risks

| # | Risk | Severity | Evidence |
|---|------|----------|----------|
| 1 | Contact/quote enquiries can be lost | Critical | Script load-order error; 404 endpoint; competing handlers; no error UI |
| 2 | Canonical domain has no web host | Critical | `otodrive.co.ke` has no A record; live host is `otodriveafrica.com` |
| 3 | Booking data is not real and hours contradict the site | Critical | `booking.js` marks all generated slots available; 24/7 claims |
| 4 | Analytics cannot be trusted | High | `G-XXXXXXXXXX`, `hjid:XXXXXXX`, `"XXXXXXXXXX"` |
| 5 | 47 MiB hero video blocks mobile users | High | `lpgtech_conversion_movie.mp4` = 49,394,533 bytes |
| 6 | No privacy notice or consent for forms/trackers | High | EmailJS, Google Maps, analytics, notification prompt |
| 7 | Location and address data are unverified/inconsistent | High | “Mavoko, Nairobi, 00100”; Mavoko is in Machakos County |
| 8 | Broken mobile layout and accessibility failures | High | Lighthouse 0.75; screenshots show overlap/cropping |
| 9 | Repository is not the source of truth | High | Live files differ on every page; `booking.html` absent |
| 10 | No deployment, backup or rollback process | High | No README, CI or hosting documentation |

---

## 2. Scope and method

### In scope

- Repository contents, history and Git state.
- Public live site, page by page.
- Public assets, links, forms and third-party dependencies.
- Public DNS and HTTP behaviour.
- Visual rendering at desktop and mobile widths.
- Accessibility, SEO and performance signals.
- Business facts as published, with conflicts flagged.
- Documentation only.

### Out of scope

- Changing production files, DNS, hosting, email accounts or third-party services.
- Purchasing domains, mapping plans or analytics products.
- Editing content or assets.
- Creating accounts or requesting credentials without owner approval.
- Penetration testing or intrusive security testing.
- Real-device and real-network testing beyond headless Chrome.

### Method

1. Cloned `https://github.com/MechaLarry/Otodrive.git` and recorded Git state.
2. Read every HTML, CSS, JS and PHP file in the repository.
3. Downloaded the public live pages and assets to a local evidence folder.
4. Compared live and repository versions page by page.
5. Checked public HTTP status, headers, redirects and DNS records.
6. Ran Lighthouse against the live homepage.
7. Captured desktop (1440 × 1000) and mobile (390 × 844) screenshots with headless Chrome.
8. Tested public endpoints and third-party scripts from a normal browser context.
9. Researched mapping providers and licensing from current vendor documentation.
10. Wrote this audit and five companion documents, including the search-visibility and online-presence plan.

### Evidence labels

| Label | Meaning |
|-------|---------|
| **Verified** | Reproduced directly against the repository, live site, DNS, HTTP response or a dated primary source. |
| **Inferred** | A reasonable conclusion from verified evidence, but not directly confirmed. |
| **Unknown** | Requires owner knowledge, account access or a decision. |

No business fact in this document should be treated as confirmed merely because it appears on the current website.

---

## 3. What Otodrive runs today

| Item | Finding | Status |
|------|---------|--------|
| Public host | `www.otodriveafrica.com` resolves to `62.12.117.31`; non-www also responds | Verified |
| Claimed canonical host | `https://otodrive.co.ke/` has no A record; MX and SPF records exist, but no web host | Verified |
| Web server | Apache | Verified |
| Application type | Static HTML/CSS/JS plus one PHP script | Verified |
| Build system | None | Verified |
| Package manager | None; no `package.json` | Verified |
| Framework | None | Verified |
| Repository | GitHub `MechaLarry/Otodrive`, branch `main` | Verified |
| Last repository commit | `f57a9f1 Delete CNAME`, October 2024 | Verified |
| Live last modification | `Tue, 12 Aug 2025 07:33:04 GMT` on sampled pages | Verified |
| Pages in repository | 9 HTML files, including a nav fragment and a duplicate map document | Verified |
| Pages live | 8 content pages plus `booking.html`; `blog.html` returns 404 | Verified |
| Forms | Contact, quote, booking, newsletter-style field with no form | Verified |
| Email transport | EmailJS in the browser; legacy PHP endpoint is 404 | Verified |
| Booking API | `https://otodrive-booking-api.onrender.com` (external, undocumented) | Verified |
| Analytics | Google tag, Hotjar and Clarity present but placeholder IDs | Verified |
| Mapping | Google Maps Embed iframe with one Mavoko map pin published; owner lists seven service points | Verified for the published pin; owner-provided for the wider network |
| Accessibility target | None documented; WCAG 2.2 AA recommended | Inferred |
| Privacy notice | None found | Verified |
| Tests / CI | None | Verified |

### Hosting and DNS observations

- `otodriveafrica.com` → `62.12.117.31`; `www` also serves the site.
- `otodrive.co.ke` has no address record. MX and SPF records exist, but there is no web host.
- HTTP requests are not redirected to HTTPS.
- No HSTS, Content-Security-Policy, `X-Content-Type-Options`, `Referrer-Policy` or `Permissions-Policy` headers were observed on sampled responses.
- No compression or cache-control headers were observed on sampled responses.
- The site is therefore likely served by a conventional shared Apache host with default TLS and no edge cache. **Inferred**; hosting panel access is required to confirm.

---

## 4. Live site vs repository

Every live page differs from its repository counterpart. The live site is the authoritative description of current behaviour; the repository is not a deployable copy.

| Artifact | Repository | Live | Impact |
|----------|------------|------|--------|
| `index.html` | 40.2 KB; older header, no SEO block, no tracking | 46.0 KB; new header, canonical/OG/Twitter tags, JSON-LD, analytics placeholders, EmailJS, notification script, updated project copy | Repository cannot reproduce production |
| `about.html` | 12.7 KB | 13.4 KB; updated header/footer and metadata | Drift |
| `services.html` | 14.3 KB | 15.2 KB; updated header/footer and metadata | Drift |
| `projects.html` | 21.5 KB | 27.0 KB; real descriptions for the first six cards, updated header/footer | Drift and content change |
| `testimonial.html` | 15.1 KB | 15.8 KB; updated header/footer and metadata | Drift |
| `contact.html` | 13.3 KB; posts to `send_email.php` | 14.8 KB; EmailJS plus legacy inline fetch to 404 | Core form behaviour differs |
| `get-quote.html` | 11.8 KB; mailto link, no EmailJS | 14.9 KB; EmailJS, duplicate viewport tags | Core form behaviour differs |
| `maps.html` | 13.1 KB; duplicated document structure | 13.5 KB; still duplicated | Same defect live |
| `navbar.html` | 1.7 KB | 3.1 KB | Drift |
| `booking.html` | Absent | 16.1 KB; live-only booking journey | Feature missing from source control |
| `contactscript.js` | Absent | 2.7 KB at site root; loads before the form; throws `TypeError` | Broken form script |
| `js/booking.js` | Absent | 4.9 KB public asset | Untracked production logic |
| `style.css` | 27.1 KB | 28.9 KB | Drift |
| `responsive.css` | 10.3 KB | 11.2 KB | Drift |
| `attention.js` | Absent | 2.6 KB; asks for notification permission | Untracked production behaviour |
| `blog.html` | Absent | 404, but linked from every footer | Broken link |
| `send_email.php` | Present | 404 | Legacy endpoint removed or blocked |
| `CNAME` | Deleted in last commit | Not applicable | Deployment history unexplained |

### What this means

- A “fix” applied only to the repository will not change the live site.
- A “fix” applied only to the live site will be lost on the next repository deploy.
- Before any implementation, the owner must confirm which copy is authoritative and how deployment happens.
- The first engineering task after approval is to reconcile live and repository into a single tracked baseline.

---

## 5. Functional audit

### 5.1 Navigation and layout

**Verified**

- The live header was reworked to place the logo and menu on one row, but at 1440 px the items are cramped and the hero content overlaps the logo area.
- At 390 px the mobile hero text is unreadable because the background video is dark and the text has insufficient contrast; the mobile menu toggle is present but the logo is not reliably visible.
- The header includes a hidden `<div class="container-fluid" hidden="true">` containing a second navigation, which is dead markup.
- Footer links include `blog.html`, which returns 404.
- The footer newsletter field is a bare `<textarea>` with no `<form>`, button or action; it cannot submit.
- `maps.html` contains duplicate `<head>` and `<body>` structures and inline global CSS.

**Impact:** Navigation is technically present but visually fragile and includes a dead end. The newsletter control implies a capability that does not exist.

### 5.2 Contact form

**Verified**

- Live pages reference `contactscript.js` at the site root, which returns 200. (The separate path `/js/contactscript.js` returns 404, but current live pages do not reference it.)
- `contactscript.js` executes `document.getElementById("contactForm").addEventListener(...)` immediately. The script tag appears before the form on `contact.html` (line 128 vs line 152), `get-quote.html` (line 113 vs line 138) and the homepage (line 671 vs line 696), so it throws:
  `TypeError: Cannot read properties of null (reading 'addEventListener')`.
- The form has a submit button with `onclick="sendMail(event)"` and no `type` attribute, so it defaults to `submit`.
- On `contact.html`, a click can invoke `sendMail` directly, while pressing Enter submits the form and may reach the older inline handler that posts to `send_email.php`.
- `send_email.php` is 404 on the live host. The fallback path has no visible error state.
- The form has no `action` or `method`, so if JavaScript is unavailable or a handler fails, native submission defaults to GET and can place name, phone, email and message in the URL.
- EmailJS is initialised with public key `ycv5mFr46ekPmud1X`, service `service_u7bdgwm` and template `template_u57mj4b` (service/template IDs visible in the live root script).
- EmailJS errors are logged to the console only; the visitor sees no failure message.
- Validation expects element IDs `fullName`, `number`, `email_id`, `message`; the repository markup uses different names and no IDs, which is one reason the repo and live behaviour diverge.
- The phone validator requires exactly 10 digits, which rejects `+254…`, spaces and some valid formats.

**Impact:** A visitor may believe an enquiry was sent when it was not. This is the highest business risk on the site.

### 5.3 Quote form

**Verified**

- Repository version is a visual form with a `mailto:` link; it does not send structured data.
- Live version uses the same EmailJS configuration and the same `contactscript.js` load-order problem.
- The page has three `<meta name="viewport">` tags, one of which sets `maximum-scale=1`.
- The old commented-out AJAX block still references `send_email.php` and field names (`Phone Number`, `Massage`) that do not match the current form.
- There is no server-side validation, spam protection or delivery confirmation.
- The form has no `action` or `method`; if JavaScript fails, Enter can submit the data in the URL as a GET request.

**Impact:** Quote requests are as fragile as contact requests, with the added confusion of a legacy implementation left in the page.

### 5.4 Booking

**Verified**

- `booking.html` is live but absent from the repository.
- The form collects name, phone, service, vehicle, date and time.
- Service options are: Vehicle Inspection, Autogas Diagnosis, Autogas Conversion, Autogas Vehicle Service, LPG Refueling.
- `booking.js` generates slots from hard-coded hours: Monday–Friday 08:00–17:00, Saturday 08:00–12:00, Sunday closed, 30-minute intervals.
- Every generated slot is set to `available: true`. No availability is fetched before display.
- The submit handler calls `https://otodrive-booking-api.onrender.com/api/book` with JSON.
- The API root returned 200 on the audit date; `/health` returned 404. A previous cold start took roughly 34 seconds; a warm response took roughly 1.5 seconds.
- In the catch path, `calendarLinkDiv` is referenced before its `const` declaration, creating a temporal-dead-zone error if the response is not valid JSON.
- The success message claims a confirmation email and calendar invite were sent; this cannot be verified without API access.
- The `fetch` call itself has no `try/catch` or timeout, so a network failure or timeout rejects the async submit handler and produces an unhandled rejection with no user feedback; the only handler is the JSON-parse `catch` described above.
- Booking hours contradict the homepage/meta claim of “24/7 support” and the JSON-LD claim of 24/7 opening.

**Impact:** The booking journey can accept requests for slots that are not actually free, fail slowly on a cold API, and does not match published opening hours. It must not be presented as real availability until connected to a verified schedule.

### 5.5 Maps

**Verified**

- One Google Maps Embed iframe is reused on the homepage, contact, quote and maps pages.
- The embed targets “OtoDrive Autogas fueling and conversion Center Mavoko” at latitude `-1.4297154`, longitude `36.9601985`.
- The iframe has no `title` attribute on the contact, quote and index pages.
- `maps.html` shows the same single Mavoko pin and labels it “OtoDrive Autogas Fueling and Conversion Center, Mavoko”.
- No street address, directions link, opening hours, accessibility information or transport guidance is published as text.
- The map loads third-party Google resources on page load; there is no consent gate or fallback.

**Impact:** Users can see a pin but cannot reliably plan a visit, and the site cannot be used as a source of truth for the address.

### 5.6 Video

**Verified**

- Homepage hero uses `<video autoplay muted loop>` with `images/lpgtech_conversion_movie.mp4` (49,394,533 bytes).
- No `poster`, `preload`, `playsinline`, captions, transcript or reduced-motion alternative.
- A second video (`images/LPG-Service.mp4`, 824,831 bytes) is revealed by a play button on the about section.
- The about video is `display:none` until clicked; its container has a fixed `height="600px"` attribute, which contributes to layout problems.

**Impact:** The hero video alone is roughly 47 MiB. At 1.5 Mbps that is about 4.4 minutes before other assets, which is prohibitive on mobile data. **Inferred** from file size and typical throughput.

### 5.7 Analytics and notification prompt

**Verified**

- Google tag (gtag.js) uses `G-XXXXXXXXXX`.
- Hotjar uses `hjid:XXXXXXX`, which is parsed as an identifier and throws `ReferenceError: XXXXXXX is not defined`.
- Microsoft Clarity uses `"XXXXXXXXXX"` and receives HTTP 400.
- `attention.js` requests browser notification permission after the visitor has been away from the tab for 10 seconds.
- No consent banner or analytics opt-out exists.

**Impact:** No reliable analytics; avoid drawing conclusions from current dashboards. The notification prompt is a user-trust and privacy problem, especially without consent.

---

## 6. Security and privacy

### 6.1 Findings

| ID | Finding | Severity | Status | Notes |
|----|---------|----------|--------|-------|
| SEC-01 | No HTTPS redirect | High | Verified | HTTP is served without redirecting to HTTPS. |
| SEC-02 | Missing security headers | High | Verified | No HSTS, CSP, `X-Content-Type-Options`, `Referrer-Policy` or `Permissions-Policy` observed. |
| SEC-03 | EmailJS public key and service/template IDs exposed | Medium | Verified | Public keys are expected client-side, but origin restrictions and rate limits are unknown. |
| SEC-04 | Legacy PHP mail handler in repository | Medium | Verified | Uses `mail()` and user-supplied `From`; 404 live, so not currently exploitable there. |
| SEC-05 | No server-side form validation | High | Verified | All validation is client-side; endpoint is external. |
| SEC-06 | No spam/abuse protection | High | Verified | No CAPTCHA, rate limit or origin check visible. |
| SEC-07 | External booking API is undocumented | High | Verified | No repository, schema, auth model, retention policy or status page available. |
| SEC-08 | Notification permission request after tab abandonment | Medium | Verified | Dark-pattern risk; no consent. |
| SEC-09 | Third-party trackers without consent | High | Verified | Google tag, Hotjar and Clarity scripts are present (even though broken). |
| SEC-10 | No privacy notice or cookie notice | High | Verified | Forms collect name, phone, email, message, vehicle and appointment data. |
| SEC-11 | `.DS_Store` and `.vscode` files in repository | Low | Verified | Confirm they are not deployed. |
| SEC-12 | No documented backup/restore | High | Unknown | Hosting access required. |
| SEC-13 | Forms default to GET without JS; PII can leak into URLs/logs | High | Verified | Homepage and quote forms have no `action`/`method`; contact fallback also affected. |

### 6.2 What the EmailJS exposure does and does not mean

An EmailJS public key is designed to be embedded in browser code. The presence of the key is **not** automatically a secret leak. The real risk depends on:

- whether allowed origins are restricted to Otodrive domains;
- whether the service/template can be abused to send arbitrary mail;
- whether rate limits or quotas are configured;
- whether the EmailJS account owner monitors usage.

These settings are **unknown**. They must be checked in the EmailJS dashboard before the form is considered safe.

### 6.3 Kenya Data Protection Act 2019

The site collects personal data through contact, quote and booking forms, and loads third-party analytics and maps. The Data Protection Act 2019 (Kenya) applies to processing of personal data and requires lawful basis, transparency, purpose limitation, retention limits and appropriate security. The Office of the Data Protection Commissioner is the regulator.

**Inferred:** A privacy notice, consent handling for non-essential trackers, a defined retention period, and a documented processor list are likely required before the site can be considered compliant. This is not legal advice; the owner should confirm with a qualified adviser.

### 6.4 Security recommendations (for later approval, not implemented)

1. Put a single, monitored form endpoint behind server-side validation and rate limiting.
2. Redirect all HTTP to HTTPS and add HSTS after confirming all subresources are HTTPS.
3. Add a Content-Security-Policy in report-only mode first, then enforce.
4. Add `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` and a minimal `Permissions-Policy`.
5. Restrict EmailJS allowed origins and set quotas; rotate the key if abuse is suspected.
6. Remove `attention.js` unless the owner explicitly wants a consented notification feature.
7. Publish a privacy notice and a cookie/tracker notice; gate non-essential scripts.
8. Document the booking API: owner, repository, schema, auth, retention, error handling and uptime expectations.
9. Back up the live site and database (if any) before the first deployment.

---

## 7. SEO audit

**Lighthouse SEO score: 0.60** on the live homepage (audit date).

A detailed search-visibility, local-search, social-sharing, AI-crawler and chatbot assessment is in `docs/ONLINE_PRESENCE_PLAN.md`. This section records the audit findings; that plan separates code changes from owner actions.

| ID | Finding | Severity | Status |
|----|---------|----------|--------|
| SEO-01 | Canonical and OG URL point to `https://otodrive.co.ke/`, which has no A record | Critical | Verified |
| SEO-02 | `robots.txt` and `sitemap.xml` return 404 | High | Verified |
| SEO-03 | `blog.html` is linked site-wide but returns 404 | High | Verified |
| SEO-04 | Only the homepage has a meaningful title/description; other pages use “About”, “Services”, “Contact”, “Testimonial”, “Projects” and empty descriptions | High | Verified |
| SEO-05 | `maps.html` title is “About”; `get-quote.html` title is “Contact” | Medium | Verified |
| SEO-06 | Multiple `<h1>` elements on the homepage (three hero slides and several section headings) | Medium | Verified |
| SEO-07 | Heading hierarchy skips levels in several sections | Medium | Verified |
| SEO-08 | Project and testimonial images have empty or missing `alt` text | Medium | Verified |
| SEO-09 | Link text such as “Read More” is non-descriptive | Medium | Verified |
| SEO-10 | JSON-LD claims `Mavoko, Nairobi, 00100`, coordinates and 24/7 opening that are not verified | High | Verified |
| SEO-11 | Structured data image and URL use the non-resolving `otodrive.co.ke` host | Critical | Verified |
| SEO-12 | Social profiles are inconsistent across live pages (`get-quote.html` uses the old Instagram handle) and between repository and live | Medium | Verified |
| SEO-13 | Copyright says 2024 | Low | Verified |
| SEO-14 | No local landing pages or location-specific metadata | Medium | Verified |
| SEO-15 | No 404 page; missing URLs return the server default | Low | Inferred |
| SEO-16 | OG/Twitter image is a relative path containing a space and is not an absolute URL | Medium | Verified |
| SEO-17 | Canonical tag is present only on the homepage | High | Verified |
| SEO-18 | Copied Turkish/foreign keyword list remains on `about.html` and `maps.html` | Low | Verified |

### Domain problem

This is the most consequential SEO defect. The live homepage tells search engines:

```html
<link rel="canonical" href="https://otodrive.co.ke/">
<meta property="og:url" content="https://otodrive.co.ke/">
```

But `otodrive.co.ke` has no A record. The working host is `https://www.otodriveafrica.com/`. The owner confirmed on 27 October 2026 that `https://www.otodriveafrica.com/` is the canonical public host. The local project baseline now uses it; the live site still points to `.co.ke` until the Phase 2A deployment.

### Structured data

The homepage JSON-LD declares:

- `@type`: `AutoRepair`
- address: `Mavoko`, `Nairobi`, `Nairobi`, `00100`, `KE`
- geo: `-1.4297154, 36.9601985`
- telephone: `+254704644909`
- opening hours: every day, `00:00–23:59`
- `sameAs`: Facebook profile, `x.com/OtodriveKE`, `instagram.com/otodriveke`

Each of these needs verification. “Mavoko” is a town in Machakos County, not Nairobi County; the postal code `00100` is a Nairobi GPO code. Publishing contradictory address data can harm local search and mislead customers. Do not “fix” it by guessing — verify with the owner and, if possible, the Google Business Profile.

---

## 8. Accessibility audit

**Target for remediation:** WCAG 2.2 Level AA (W3C Recommendation, 5 October 2023).  
**Lighthouse accessibility score: 0.75** on the live homepage.

| ID | Issue | WCAG reference | Severity | Status |
|----|-------|----------------|----------|--------|
| A11Y-01 | Insufficient colour contrast in body copy, buttons and hero text | 1.4.3 Contrast (Minimum) | High | Verified |
| A11Y-02 | Google Maps iframe has no accessible name (`title`) | 4.1.2 Name, Role, Value; 2.4.1 Bypass Blocks | High | Verified |
| A11Y-03 | Heading order is illogical; multiple `h1`s | 1.3.1 Info and Relationships | Medium | Verified |
| A11Y-04 | Decorative/meaningful images have empty or missing `alt` | 1.1.1 Non-text Content | High | Verified |
| A11Y-05 | No `<main>` landmark | 1.3.1; 2.4.1 | Medium | Verified |
| A11Y-06 | Links with no discernible name (icon-only links) | 2.4.4 Link Purpose; 4.1.2 | High | Verified |
| A11Y-07 | Viewport disables zoom (`maximum-scale=1`) | 1.4.4 Resize Text | High | Verified |
| A11Y-08 | Forms rely on placeholders; labels are missing | 1.3.1; 3.3.2 Labels or Instructions | High | Verified |
| A11Y-09 | Carousel controls are not keyboard-friendly and lack focus management | 2.1.1 Keyboard; 2.4.3 Focus Order | Medium | Inferred from markup |
| A11Y-10 | No reduced-motion handling for autoplay video/carousel | 2.3.3 Animation from Interactions | Medium | Verified |
| A11Y-11 | Mobile menu has no focus trap or `aria-expanded` state | 2.1.1; 4.1.2 | Medium | Inferred |
| A11Y-12 | Form errors are appended without `aria-live` or field association | 3.3.1 Error Identification; 4.1.3 Status Messages | High | Verified |
| A11Y-13 | No skip link | 2.4.1 | Medium | Verified |
| A11Y-14 | Icon fonts are loaded twice (FA4 and FA6) with no accessible fallback | 1.1.1; 4.1.2 | Low | Verified |
| A11Y-15 | Hero video has no captions or transcript | 1.2.2 Captions (Prerecorded) | Medium | Verified |

### Visual evidence

Screenshots captured on the audit date:

- Desktop: `C:\Users\HP\AppData\Local\Temp\otodrive_shots\home-desktop.png`
- Mobile: `C:\Users\HP\AppData\Local\Temp\otodrive_shots\home-mobile.png`
- Booking desktop: `C:\Users\HP\AppData\Local\Temp\otodrive_shots\booking-desktop.png`
- Services desktop: `C:\Users\HP\AppData\Local\Temp\otodrive_shots\services-desktop.png`
- Maps desktop: `C:\Users\HP\AppData\Local\Temp\otodrive_shots\maps-desktop.png`

Observed layout failures:

- Logo and hero copy collide at desktop width.
- The mobile hero is dark-on-dark and effectively unreadable.
- Carousel arrows overlap body copy.
- Testimonial names and headings overlap.
- The mobile logo is missing or clipped.
- Footer columns crowd each other at intermediate widths.

These are presentation defects, not content changes. Fixing them should not require rewriting copy.

---

## 9. Performance audit

Lighthouse performance was not scored reliably in the audit run; the following findings are direct asset and markup evidence.

| ID | Finding | Impact | Status |
|----|---------|--------|--------|
| PERF-01 | 49,394,533-byte hero video autoplays on the homepage | Dominates mobile data and startup time | Verified |
| PERF-02 | `js/plugin.js` is 897.2 KB and appears to be a legacy bundle | Large parse/compile cost | Verified |
| PERF-03 | jQuery is loaded twice (`jquery.min.js` and `jquery-3.0.0.min.js`) | Duplicate payload and potential plugin conflicts | Verified |
| PERF-04 | Bootstrap bundle plus separate Popper plus Bootstrap CSS and minified variants | Redundant payload | Verified |
| PERF-05 | Multiple unused CSS frameworks shipped (animate, owl, slick, fancybox, jquery-ui, icomoon, meanmenu, nice-select, normalize) | Wasteful requests/bytes | Verified |
| PERF-06 | Missing `swiper.min.css` imported by `style.css` | 404 and missing carousel styles | Verified |
| PERF-07 | Missing `fonts/BalooChettan-Regular.ttf` | 404 and font fallback | Verified |
| PERF-08 | Missing `images/fevicon.png` | 404 in browser tab | Verified |
| PERF-09 | No compression or cache headers observed | Slower repeat visits | Verified |
| PERF-10 | Large uncompressed images (293 KB, 221 KB, 165 KB) without responsive sources | Excess mobile bytes | Verified |
| PERF-11 | Two Font Awesome versions loaded from third-party CDNs | Extra requests and render blocking | Verified |
| PERF-12 | No `width`/`height` on most images | Layout shift | Verified |
| PERF-13 | Third-party map iframe loads eagerly on several pages | Blocks and sets cookies before consent | Verified |
| PERF-14 | Google Fonts loaded from third party with no `preconnect` | Extra connection setup | Verified |
| PERF-15 | Hero video has no poster or fallback image | Blank/black first paint | Verified |

### Approximate cost of the hero video

| Connection | Time to transfer 47.1 MiB (video only) |
|------------|----------------------------------------|
| 20 Mbps | ~20 seconds |
| 5 Mbps | ~79 seconds |
| 1.5 Mbps | ~4.4 minutes |
| 500 kbps | ~13 minutes |

These are **inferred** from file size and ideal throughput; real performance will be worse with latency, contention and mobile radio behaviour.

### Recommended performance direction (later phase)

- Replace the hero video with a short, compressed loop (target under 2–3 MB) or a static poster image with an optional play control.
- Respect `prefers-reduced-motion` and `Save-Data`.
- Remove unused CSS/JS and consolidate to one jQuery/Bootstrap copy, or remove them if not needed.
- Self-host or subset fonts; remove the missing font reference.
- Serve responsive images in WebP/AVIF with `srcset`, `width` and `height`.
- Add compression and long-lived caching at the host/CDN.
- Lazy-load maps behind a click-to-load consent panel.

---

## 10. Content and brand consistency

| ID | Finding | Severity | Status |
|----|---------|----------|--------|
| CON-01 | Repository still contains six “Home Work” placeholder cards; live shows six real cards and leaves three placeholders commented out | Low | Verified |
| CON-02 | Repository footer uses Lorem Ipsum; live footer has real copy | Low | Verified |
| CON-03 | Testimonial location differs: homepage says Ahmed R. — Kitengela; testimonial page says Eldoret | Medium | Verified |
| CON-04 | Social handles differ between repository and live (`OTODRIVE_KENYA` vs `OtodriveKE`; `otodrivekenya` vs `otodriveke`), with `get-quote.html` still using the old Instagram handle | Medium | Verified |
| CON-05 | Typographical errors: “windsscreen”, “milage”, “alot”, “upto”, “Massage”, “warrant” | Low | Verified |
| CON-06 | “Save up to 40%” is stated as fact but not substantiated on the site | Medium | Unknown |
| CON-07 | “Among the largest LPG marketers in Kenya” is unverified | Medium | Unknown |
| CON-08 | Partner/licence claims (Westport Fuels, LPGTech, KEBS, EPRA, NEMA) need evidence and current wording | High | Unknown |
| CON-09 | “24/7 support” conflicts with booking hours and structured data | High | Verified |
| CON-10 | Address `Mavoko, Nairobi, 00100` is internally inconsistent | High | Unknown |
| CON-11 | Copyright says 2024 | Low | Verified |
| CON-12 | Newsletter field has no submit mechanism | Medium | Verified |
| CON-13 | `blog.html` linked site-wide but missing | High | Verified |
| CON-14 | Brand spelling varies: Otodrive, OtoDrive, OTODRIVE | Low | Verified |
| CON-15 | Google review/rating markup is absent; no verified review count | Low | Unknown |

### Content preservation rule

No existing copy, image, video, logo, colour, business fact or link should be deleted or rewritten during stabilisation. Where content is wrong, flag it and ask the owner. Where content is placeholder, replace only with owner-approved copy.

---

## 11. Locations and hours

| Item | Published value | Status | Conflict |
|------|-----------------|--------|----------|
| Location name | OtoDrive Autogas fueling and conversion Center, Mavoko | Verified on live map | — |
| Address | “Mavoko, Nairobi, Nairobi, 00100, KE” (JSON-LD) | Verified in markup | Mavoko is in Machakos County; 00100 is Nairobi GPO |
| Coordinates | `-1.4297154, 36.9601985` | Verified in markup/embed | Source and accuracy unconfirmed |
| Phone | `+254 704 644 909` | Verified site-wide | Ownership/current number unconfirmed |
| Email | `info@otodrive.co.ke` | Verified site-wide | Domain has no A record, but an MX record exists via Microsoft 365; mailbox monitoring and ownership are unknown |
| Hours | “24/7 support”; JSON-LD 24/7 | Verified | Booking: Mon–Fri 08:00–17:00, Sat 08:00–12:00, Sun closed |
| Number of locations | One map pin published; owner lists seven service points | Verified for the published pin; owner-provided for the wider network | No location index or multi-location data on the live site |
| Owner-listed network | Thika, Mavoko, Kangundo Road, Rongai, Shanzu, Jomvu, Jomvu Yard | Owner-provided, 27 October 2026; Jomvu Yard map link checked | Service split and most coordinates not yet verified; see `docs/LOCATIONS_INTEGRATION_PLAN.md` §12.8–12.10 |
| Directions | Google Maps embed only | Verified | No textual directions or `maps.app.goo.gl` link |

**Conclusion:** The live website presents one Mavoko map pin, but the owner describes a seven-point service network across Petrocity sites. Only Mavoko is currently published. Jomvu Yard now has an owner-supplied map link that resolves to the Otodrive listing beside A.O. Bayusuf; the other site records, and the remaining Jomvu Yard details, still require verification. See `docs/LOCATIONS_INTEGRATION_PLAN.md` §12.8–12.10.

---

## 12. Maintainability and operations

| ID | Finding | Severity | Status |
|----|---------|----------|--------|
| OPS-01 | No README or onboarding documentation | Medium | Verified |
| OPS-02 | No build, lint or test commands | High | Verified |
| OPS-03 | No CI/CD or deployment documentation | High | Verified |
| OPS-04 | Live and repository diverged; no release tags | Critical | Verified |
| OPS-05 | No staging environment | High | Unknown |
| OPS-06 | No backup or rollback procedure | High | Unknown |
| OPS-07 | 49 MB video committed to Git | Medium | Verified |
| OPS-08 | Duplicate CSS/JS/map files in repository | Medium | Verified |
| OPS-09 | No error monitoring or uptime checks | Medium | Unknown |
| OPS-10 | No content owner or update workflow | Medium | Unknown |
| OPS-11 | No documented third-party accounts (EmailJS, Render, analytics, maps) | High | Unknown |
| OPS-12 | No licence file for third-party assets | Low | Unknown |

### Repository hygiene

- `.DS_Store` files are committed in `css/` and `js/`.
- `.vscode/settings.json` is committed.
- Bootstrap source maps and full/minified variants are both committed.
- `plugin.js` is a 897 KB bundle with no provenance.
- The only commit author is Larry Mecha; all commits are from October 2024.
- The last commit deletes `CNAME`, which suggests a GitHub Pages experiment that was abandoned or reversed.

---

## 13. Issue register

Severity: **S1** critical, **S2** high, **S3** medium, **S4** low. Phase references point to `docs/MODERNIZATION_ROADMAP.md`.

| ID | Issue | Severity | Phase |
|----|-------|----------|-------|
| SEC-01 | No HTTPS redirect | S2 | 2A |
| SEC-02 | Missing security headers | S2 | 2A |
| SEC-03 | EmailJS configuration exposure/abuse risk | S3 | 2A |
| SEC-04 | Insecure legacy PHP mail handler | S3 | 2A |
| SEC-05 | No server-side validation | S2 | 2A |
| SEC-06 | No spam protection | S2 | 2A |
| SEC-07 | Undocumented booking API | S2 | 3 |
| SEC-08 | Notification prompt dark pattern | S3 | 2A |
| SEC-09 | Trackers without consent | S2 | 5 |
| SEC-10 | No privacy notice | S2 | 5 |
| SEC-11 | `.DS_Store` / `.vscode` in repo | S4 | 2A |
| SEC-12 | No backup/restore | S2 | 2A |
| SEC-13 | Form GET fallback can leak PII into URLs | S2 | 2A |
| FUNC-01 | Contact/quote forms can lose messages | S1 | 2A |
| FUNC-02 | `contactscript.js` load-order `TypeError` | S1 | 2A |
| FUNC-03 | Competing form handlers | S1 | 2A |
| FUNC-04 | Legacy 404 endpoint still referenced | S1 | 2A |
| FUNC-05 | Booking availability is fake | S1 | 3 |
| FUNC-06 | Booking `calendarLinkDiv` TDZ bug | S2 | 2A |
| FUNC-07 | Booking API cold-start/timeout risk | S2 | 3 |
| FUNC-08 | Booking hours conflict with 24/7 claims | S1 | 3 |
| FUNC-09 | `blog.html` 404 site-wide | S2 | 2B |
| FUNC-10 | Newsletter cannot submit | S3 | 4 |
| FUNC-11 | Missing favicon/font/swiper assets | S3 | 2B |
| FUNC-12 | Duplicate `<head>/<body>` on maps page | S3 | 2B |
| FUNC-13 | Dead hidden nav markup | S4 | 2B |
| SEO-01 | Canonical to non-resolving domain | S1 | 2A |
| SEO-02 | Missing robots/sitemap | S2 | 4 |
| SEO-03 | Generic titles/empty descriptions | S2 | 4 |
| SEO-04 | Multiple `h1`s/heading order | S3 | 2C |
| SEO-05 | Unverified structured data | S2 | 3 |
| SEO-06 | Social handle inconsistency | S3 | 4 |
| SEO-07 | Stale copyright | S4 | 2B |
| A11Y-01 | Contrast failures | S2 | 2C |
| A11Y-02 | Iframe title missing | S2 | 2C |
| A11Y-03 | Image alt missing | S2 | 2C |
| A11Y-04 | Form labels/errors | S2 | 2A |
| A11Y-05 | Zoom disabled | S2 | 2C |
| A11Y-06 | No main landmark/skip link | S3 | 2C |
| A11Y-07 | Carousel keyboard/focus | S3 | 2C |
| A11Y-08 | Reduced motion | S3 | 2C |
| A11Y-09 | Video captions/transcript | S3 | 4 |
| PERF-01 | 47 MiB hero video | S2 | 2D |
| PERF-02 | 897 KB plugin bundle | S3 | 2D |
| PERF-03 | Duplicate jQuery | S3 | 2D |
| PERF-04 | Unused CSS/JS | S3 | 2D |
| PERF-05 | No compression/cache headers | S2 | 2A |
| PERF-06 | Missing font/swiper assets | S3 | 2B |
| PERF-07 | Unoptimised images | S3 | 2D |
| PERF-08 | Eager map iframes | S3 | 2D |
| CON-01 | “Home Work” placeholder projects (repository) | S3 | 4 |
| CON-02 | Footer Lorem Ipsum (repository) | S4 | 4 |
| CON-03 | Testimonial location conflict | S3 | 4 |
| CON-04 | Social handles inconsistent | S3 | 4 |
| CON-05 | Typographical errors | S4 | 4 |
| CON-06 | Unverified savings/market claims | S2 | 3/4 |
| CON-08 | Unverified regulatory/partner claims | S2 | 3/4 |
| CON-09 | 24/7 claim vs booking hours | S1 | 3 |
| CON-10 | Address/postal code conflict | S1 | 3 |
| CON-12 | Newsletter non-functional | S3 | 4 |
| CON-14 | Brand casing inconsistent | S4 | 4 |
| OPS-01 | No README/build/CI | S2 | 2A/6 |
| OPS-02 | Repo/live divergence | S1 | 2A |
| OPS-03 | No staging/backup | S2 | 2A |
| OPS-04 | Third-party account ownership undocumented | S2 | 2A |

---

## 14. What is working

- The site is reachable over HTTPS on `www.otodriveafrica.com`.
- Core pages return HTTP 200.
- The visual identity is consistent: orange `#fda417`, dark `#252525`, white and yellow accents.
- The service descriptions are substantive and specific.
- The Google Maps embed correctly resolves the Mavoko place.
- The booking UI is understandable and mobile-friendly in structure.
- EmailJS is a legitimate service and can work once configured correctly.
- The site has real project photography and a logo.
- Basic responsive breakpoints exist; the problems are execution, not the absence of a mobile design.

---

## 15. Audit limitations

- No hosting panel, DNS, EmailJS, Render, Google Business Profile, Search Console, Bing Webmaster Tools, social or analytics account access.
- No real mobile devices or throttled network tests.
- Lighthouse performance was not scored reliably; the performance findings are asset-based.
- The booking API schema, authentication, retention and uptime could not be inspected.
- The Google Maps pin and coordinates were not independently verified against a survey or the owner’s records.
- Business claims (licences, partnerships, savings, “largest”) were not verified with third parties.
- The audit reflects the public site on 27 October 2026; content may change.
- No legal advice is provided.

---

## Appendix A — Evidence summary

| Check | Result |
|-------|--------|
| `GET /` | 200 |
| `GET /about.html` | 200 |
| `GET /services.html` | 200 |
| `GET /projects.html` | 200 |
| `GET /testimonial.html` | 200 |
| `GET /contact.html` | 200 |
| `GET /get-quote.html` | 200 |
| `GET /maps.html` | 200 |
| `GET /booking.html` | 200 |
| `GET /blog.html` | 404 |
| `GET /send_email.php` | 404 |
| `GET /robots.txt` | 404 |
| `GET /sitemap.xml` | 404 |
| `GET /images/fevicon.png` | 404 |
| `GET /js/contactscript.js` | 404 (not referenced by current live pages) |
| `GET /contactscript.js` | 200 |
| `GET /js/booking.js` | 200 |
| `GET /fonts/BalooChettan-Regular.ttf` | 404 |
| `otodrive.co.ke` DNS | No A record; MX and SPF exist; no web host |
| `otodriveafrica.com` DNS | A `62.12.117.31` |
| HTTP → HTTPS redirect | Not observed |
| Security headers | Not observed on sampled responses |
| Compression/cache headers | Not observed on sampled responses |
| Booking API root | 200 (warm ~1.5 s; health 404) |
| Lighthouse accessibility | 0.75 |
| Lighthouse SEO | 0.60 |
| Lighthouse best practices | 1.00 |

## Appendix B — Repository inventory

| Path | Size |
|------|------|
| `index.html` | 40.2 KB |
| `about.html` | 12.7 KB |
| `services.html` | 14.3 KB |
| `projects.html` | 21.5 KB |
| `testimonial.html` | 15.1 KB |
| `contact.html` | 13.3 KB |
| `get-quote.html` | 11.8 KB |
| `maps.html` | 13.1 KB |
| `navbar.html` | 1.7 KB |
| `send_email.php` | 0.8 KB |
| `css/style.css` | 27.1 KB |
| `css/responsive.css` | 10.3 KB |
| `js/plugin.js` | 897.2 KB |
| `js/custom.js` | 8.5 KB |
| `images/lpgtech_conversion_movie.mp4` | 48,236.8 KB |
| `images/LPG-Service.mp4` | 805.5 KB |
| Whole repository (excluding `.git`) | ~53.7 MB |

## Appendix C — Primary references

- WCAG 2.2, W3C Recommendation, 5 October 2023: <https://www.w3.org/TR/WCAG22/>
- Kenya Data Protection Act 2019: <https://www.odpc.go.ke/data-protection-act/>
- Google Maps Platform pricing: <https://developers.google.com/maps/billing-and-pricing/pricing>
- Google Maps Embed API: <https://developers.google.com/maps/documentation/embed/get-started>
- Mapbox pricing: <https://www.mapbox.com/pricing>
- MapTiler pricing: <https://www.maptiler.com/pricing/>
- Stadia Maps pricing: <https://stadiamaps.com/pricing/>
- OpenStreetMap tile usage policy: <https://operations.osmfoundation.org/policies/tiles/>
- Leaflet: <https://leafletjs.com/>
- MapLibre GL JS: <https://maplibre.org/>
- EmailJS documentation: <https://www.emailjs.com/docs/>

All URLs accessed 27 October 2026. Prices and terms must be re-checked before purchase.

---

**End of audit. No implementation has started. Awaiting owner review and approval of a phase.**
