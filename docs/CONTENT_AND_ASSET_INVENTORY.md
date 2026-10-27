# Otodrive Website — Content and Asset Inventory

**Phase:** 1 — Discovery and audit  
**Date:** 27 October 2026  
**Status:** Inventory complete — for owner verification  
**Companion documents:** `PROJECT_AUDIT.md`, `MODERNIZATION_ROADMAP.md`, `LOCATIONS_INTEGRATION_PLAN.md`, `ONLINE_PRESENCE_PLAN.md`, `DECISIONS_AND_OPEN_QUESTIONS.md`

---

## 1. Purpose

This document records what exists today so that later work can preserve it. It covers:

- every page and its sections;
- every published business fact and claim;
- every content block that appears duplicated or inconsistent;
- every image, video, CSS file, JavaScript file, font and external dependency;
- every form, endpoint and link;
- every missing or broken asset.

**Rule:** nothing listed here may be deleted, rewritten or “cleaned up” until the owner approves the specific change. Where the correct fact is unknown, the item is marked **Unknown** rather than guessed.

### Labels

| Label | Meaning |
|-------|---------|
| **Verified** | Directly observed in the repository, live page or HTTP response. |
| **Inferred** | A reasonable conclusion from observed evidence. |
| **Unknown** | Needs owner confirmation or account access. |

---

## 2. Page inventory

### 2.1 Repository vs live

| Page | Repository | Live | Live size | Purpose |
|------|------------|------|-----------|---------|
| `index.html` | Present, 40.2 KB | Present, 46.0 KB | 46,013 bytes | Homepage |
| `about.html` | Present, 12.7 KB | Present, 13.4 KB | 13,440 bytes | Company overview and video |
| `services.html` | Present, 14.3 KB | Present, 15.2 KB | 15,155 bytes | Service detail |
| `projects.html` | Present, 21.5 KB | Present, 27.0 KB | 27,045 bytes | Conversion gallery |
| `testimonial.html` | Present, 15.1 KB | Present, 15.8 KB | 15,755 bytes | Customer testimonials |
| `contact.html` | Present, 13.3 KB | Present, 14.8 KB | 14,821 bytes | Contact form and map |
| `get-quote.html` | Present, 11.8 KB | Present, 14.9 KB | 14,893 bytes | Quote request form and map |
| `maps.html` | Present, 13.1 KB | Present, 13.5 KB | 13,483 bytes | Location page |
| `navbar.html` | Present, 1.7 KB | Present, 3.1 KB | 3,079 bytes | Navigation fragment; not a public page |
| `booking.html` | **Absent** | Present | 16,079 bytes | Appointment booking |
| `blog.html` | **Absent** | **404** | 355-byte error page | Linked from every footer |
| 404 page | **Absent** | Server default | — | No branded error page |

All pages return HTTP 200 except `blog.html` (404). The live site is the current production copy; the repository cannot reproduce it.

### 2.2 Navigation structure

Primary links, repeated in the header and footer:

| Label | Target | Status |
|-------|--------|--------|
| Home | `index.html` | Working |
| About | `about.html` | Working |
| Services | `services.html` | Working |
| Projects | `projects.html` | Working |
| Testimonial | `testimonial.html` | Working |
| Contact | `contact.html` | Working |
| Get a Quote | `get-quote.html` | Working |
| Location | `maps.html` | Working |
| Book a Service | `booking.html` (live only) | Working |
| Blog | `blog.html` | **404** |

The footer also contains “Quick Links”, a “Work Portfolio” paragraph, a newsletter field and social icons.

---

## 3. Page-by-page content map

### 3.1 Homepage (`index.html`)

| Section | Content | Notes |
|---------|---------|-------|
| Top bar | Contact Us link, phone, email, location link | Phone and email repeated site-wide |
| Header | Logo, primary menu, mobile toggle | Live header differs from repository |
| Hero carousel | 3 slides | See below |
| Services | 4 cards | See section 4 |
| About | Company paragraph, video play button | Video hidden until clicked |
| Projects | 6 visible live; 9 in repository | Live replaces three placeholders with technical cards and comments out three |
| Testimonials | 6 quotes in 3 carousel groups | Names and locations; one conflict |
| Contact | Form, canopy image, map | EmailJS + legacy handler live |
| Footer | Quick links, portfolio copy, newsletter, socials, copyright | Live uses real portfolio copy; repository uses Lorem Ipsum; newsletter has no form/action |

**Hero slides (verified):**

1. `AUTOGAS SERVICES` — “Otodrive is an authorized Autogas system installer. We are an innovative solutions leader using technology to ensure superior safety, high quality and excellence.”
2. `WHY OTODRIVE?` — “We offer high quality, affordable Autogas products with warrant. Otodrive is distinguished by combination of innovative thought and continuous improvement of automobile technology. We are KS compliant, have state of the art workshop and our engineers are certified.”
3. `OTODRIVE SERVICE CENTER` — “Elevate your experience to keep moving.”

Each slide has “Contact US” and “About Us” buttons.

**Hero media:** autoplay, muted, looping `images/lpgtech_conversion_movie.mp4` (47.1 MiB) with no poster.

### 3.2 About (`about.html`)

- Heading: “About Us”.
- Paragraph: “Otodrive is among the largest LPG marketers in Kenya. In partnership with global leading providers such as Westport Fuels (Italy) and LPGTech (Poland) of Autogas Systems, we are licensed by KEBS to convert gasoline-powered vehicles to run on LPG under our brand, OTODRIVE. Our product conforms to Energy Policy and Regulatory Authority, Kenya Bureau of Standards, and National Environmental Management Authority requirements.”
- Play icon reveals `images/LPG-Service.mp4`.
- No team names, history, founding date, registration number or physical address.
- Footer repeats site-wide blocks.

### 3.3 Services (`services.html`)

Heading: “Our Services”  
Subheading: “We love supporting our customers by offer a variety of services” (grammar issue preserved).

| # | Service | Description summary |
|---|---------|---------------------|
| 1 | LPG fueling | Refuelling, loyalty programme, claimed savings up to 40% over petrol, fluid checks, windscreen wash |
| 2 | Autogas System Installation | Installation using Westport Fuels (Italy) and LPGTech (Poland); KEBS-licensed conversion under the OTODRIVE brand; hybrid petrol/LPG operation |
| 3 | Free Car Diagnosis | Free diagnosis of the autogas system |
| 4 | Free LPG system check and service | Free safety check for Autogas vehicles |

The homepage uses shortened versions of the same four cards. Live homepage labels the third and fourth cards “Vehicle Diagnosis” and “Autogas system check and service”, while the live services page uses “Free Car Diagnosis” and “Free LPG system check and service”.

### 3.4 Projects (`projects.html`)

Heading: “Projects”.

**Repository:** nine visible cards.

| # | Title | Image | Description |
|---|-------|-------|-------------|
| 1 | Toyota Passo | `george2.jpg` | Real description |
| 2 | toyota Alion | `milton conversion .jpg` | Real description |
| 3 | Prado | `pado conversion.jpg` | Real description |
| 4 | Home Work | `technical autogas.jpg` | Dummy title and text |
| 5 | Home Work | `technical 2 autogas.jpg` | Dummy title and text |
| 6 | Home Work | `george2.jpg` | Dummy title and text |
| 7 | Home Work | `milton conversion .jpg` | Dummy title and text |
| 8 | Home Work | `technical autogas.jpg` | Dummy title and text |
| 9 | Home Work | `pado conversion.jpg` | Dummy title and text |

**Live:** six visible cards, with substantive descriptions.

| # | Title | Image | Description |
|---|-------|-------|-------------|
| 1 | Toyota Passo | `george2.jpg` | Compact-car bi-fuel conversion |
| 2 | toyota Alion | `milton conversion .jpg` | Sedan bi-fuel conversion |
| 3 | Prado | `pado conversion.jpg` | SUV bi-fuel conversion |
| 4 | Typical LPG Autogas Layout | `technical autogas.jpg` | System layout explainer |
| 5 | Autogas Parts | `technical 2 autogas.jpg` | Component explainer |
| 6 | Refueling station | `canopy 2.jpg` | Station, loyalty programme and service |

Three additional “Home Work” cards remain in the live HTML but are commented out. All project images have `alt=""`.

### 3.5 Testimonials (`testimonial.html`)

Heading: “Testimonial” (singular), repeated three times because of the carousel structure.

| Person | Location | Quote theme |
|--------|----------|-------------|
| Jane M. | Nairobi | Lower fuel cost, lower carbon footprint, smooth running |
| Chris O. | Nairobi | Initial scepticism, ~40% savings, quieter engine |
| Violet T. | Athi River | Savings, cleaner fuel, sustainability |
| Ahmed R. | **Eldoret** on this page; **Kitengela** on homepage | Best decision, affordable, no performance difference |
| Lucy N. | Thika | Rising petrol costs, economical and reliable |
| John K. | Nairobi | Savings, performance, cleaner |

No testimonial includes a date, vehicle, verification link or consent statement. The names appear to be first name plus initial; whether they are real customers is **Unknown**.

### 3.6 Contact (`contact.html`)

- Heading: “Contact Us”.
- Form: Name, Phone Number, Email, Message.
- Image: `images/canopy 2.jpg` (220.8 KB).
- Map: same Google Maps embed as the homepage.
- Footer.
- Live adds EmailJS, `contactscript.js`, a thank-you popup and an older inline fetch handler on the contact page.
- No street address, hours, directions or response-time expectation in the form area.

### 3.7 Get a Quote (`get-quote.html`)

- Heading: “GET A QUOTE”.
- Repository form: Name, Phone Number, Email, Message; “SEND” is a `mailto:` link.
- Live form: same fields, EmailJS submission, duplicate viewport tags.
- Map: same Google Maps embed.
- Footer.
- No pricing, vehicle-specific questions, budget, timeline or consent checkbox.

### 3.8 Maps (`maps.html`)

- Title tag: “About” (incorrect).
- Heading/title: “OtoDrive Autogas Fueling and Conversion Center, Mavoko”.
- One Google Maps embed.
- Contact block: phone, email, “otodrive location”.
- Footer.
- The document contains duplicated `<head>` and `<body>` sections and inline global CSS. It is not a true multi-location page.

### 3.9 Booking (`booking.html`, live only)

- Title: “Book a Service - OTODRIVE”.
- Form: Full Name, Phone Number, Service Type, Vehicle Details, Date, Time.
- Service options: Vehicle Inspection, Autogas Diagnosis, Autogas Conversion, Autogas Vehicle Service, LPG Refueling.
- “Available Time Slots” grid generated by JavaScript.
- Submit button “Book Appointment”.
- Success panel claims a confirmation email and calendar invite.
- No address, location selection, duration, price, deposit, cancellation policy or consent checkbox.
- Not present in the repository.

### 3.10 `navbar.html`

- A standalone navigation fragment with its own `<head>`, title “Document” and duplicated menu.
- It is not linked from the public site and appears to be a template/partial.
- **Inferred:** safe to treat as development residue, but do not delete until the owner confirms no build process depends on it.

### 3.11 Blog and 404

- `blog.html` is linked from every footer but returns 404.
- No branded 404 page exists.
- No blog index, posts, RSS feed or article metadata exists in the repository.

---

## 4. Business facts register

Every item below is either published on the site or implied by it. “Published” does not mean “verified”.

| ID | Fact | Published value | Where | Status | Action |
|----|------|-----------------|-------|--------|--------|
| BF-01 | Brand name | Otodrive / OtoDrive / OTODRIVE | Site-wide | Verified inconsistent | Choose official casing |
| BF-02 | Phone | +254 704 644 909 | Header, footer, contact blocks | Published, not independently verified | Confirm ownership/current use |
| BF-03 | Email | info@otodrive.co.ke | Header, footer, form recipient | Published, not independently verified | MX exists via Microsoft 365; confirm mailbox monitoring and ownership |
| BF-04 | Location name | OtoDrive Autogas fueling and conversion Center, Mavoko | Map title, embed | Published | Confirm exact trading name |
| BF-05 | Street address | Not published | — | Unknown | Provide building/street/landmark |
| BF-06 | Town | Mavoko | Map, JSON-LD | Published | Confirm |
| BF-07 | County | “Nairobi” in JSON-LD | JSON-LD | Published, likely wrong | Mavoko is in Machakos County; confirm |
| BF-08 | Postal code | 00100 | JSON-LD | Published, likely wrong | Confirm or remove |
| BF-09 | Coordinates | -1.4297154, 36.9601985 | JSON-LD, map embed | Published, source unknown | Confirm against Google Business Profile |
| BF-10 | Opening hours | 24/7 support; JSON-LD 00:00–23:59 daily | Homepage meta, JSON-LD | Published, conflicts | Confirm real hours |
| BF-11 | Booking hours | Mon–Fri 08:00–17:00; Sat 08:00–12:00; Sun closed | `booking.js` | Coded, not published | Confirm; align all surfaces |
| BF-12 | Services | LPG fueling, Autogas installation, free diagnosis, free LPG check | Services page | Published | Confirm current offerings |
| BF-13 | Booking services | Vehicle Inspection, Autogas Diagnosis, Autogas Conversion, Autogas Vehicle Service, LPG Refueling | Booking page | Published | Confirm |
| BF-14 | Savings claim | “Save up to 40%” | Homepage, services, meta | Published, unsubstantiated | Provide basis or soften |
| BF-15 | Market position | “Among the largest LPG marketers in Kenya” | About, homepage | Published, unsubstantiated | Provide evidence or remove |
| BF-16 | Partner | Westport Fuels (Italy) | About, services | Published | Confirm current partnership |
| BF-17 | Partner | LPGTech (Poland) | About, services | Published | Confirm current partnership |
| BF-18 | Licence | KEBS-licensed conversion | About, services | Published | Provide certificate/scope |
| BF-19 | Compliance | EPRA, KEBS, NEMA requirements | About | Published | Confirm current |
| BF-20 | Workshop | “State of the art workshop” | Hero | Published | Confirm |
| BF-21 | Engineers | “Certified” | Hero | Published | Confirm certification |
| BF-22 | Warranty | “with warrant” | Hero | Published, vague | Provide warranty terms |
| BF-23 | Payment methods | Not published | — | Unknown | Add if useful |
| BF-24 | Accessibility | Not published | — | Unknown | Add if verified |
| BF-25 | Number of locations | One map pin published; owner lists seven service points (Thika, Mavoko, Kangundo Road, Rongai, Shanzu, Jomvu, Jomvu Yard) | Map plus owner brief | Published pin; wider network owner-provided; Jomvu Yard link checked | Verify each site and service split; do not publish unverified sites |
| BF-26 | Legal entity | Not published | — | Unknown | Add registered name if required |
| BF-27 | Founded date | Not published | — | Unknown | Optional |
| BF-28 | Service area | Not published | — | Unknown | Optional |

### 4.1 Social profiles

| Platform | Repository links | Live visible links | Live JSON-LD | Status |
|----------|------------------|--------------------|--------------|--------|
| Facebook | `facebook.com/profile.php?id=61566117596915` | Same | Same | Published; ownership unverified |
| X/Twitter | `x.com/OTODRIVE_KENYA` | `x.com/OtodriveKE` (all pages checked) | `x.com/OtodriveKE` | Repository/live drift |
| Instagram | `instagram.com/otodrivekenya/` | `instagram.com/otodriveke` (most pages); `instagram.com/otodrivekenya` on `get-quote.html` | `instagram.com/otodriveke` | Inconsistent outlier |
| LinkedIn | `#` | `#` (commented out on some live pages) | Absent | Placeholder |
| YouTube | None | None | None | Unknown whether exists |
| TikTok | None | None | None | Unknown whether exists |

### 4.2 Developer credit

Every footer says: “2024 All Rights Reserved. OtoDrive”, linking to `https://larrzonesolutions.com`. The current year is 2026. Whether the credit is required by an agreement is **Unknown**.

---

## 5. Services and claims register

| Claim | Exact wording | Risk | Verification needed |
|-------|---------------|------|---------------------|
| Fuel savings | “save upto 40% over regular petrol” | Financial/consumer claim | Calculation basis, vehicle type, fuel prices, date |
| Market position | “among the largest LPG marketers in Kenya” | Reputational | Market data or remove |
| Authorised installer | “authorized Autogas system installer” | Regulatory | Authorisation letter/scope |
| KEBS licence | “licensed by KEBS to convert gasoline powered vehicles” | Regulatory | Certificate number/scope |
| EPRA compliance | “conforms to Energy Policy and Regulatory Authority … requirements” | Regulatory | Current licence/approval |
| NEMA compliance | “conforms to … National Environmental Management Authority requirements” | Regulatory | Current approval |
| Partner | “Westport Fuels (Italy)” | Commercial | Current agreement |
| Partner | “LPGTech (Poland)” | Commercial | Current agreement |
| Free diagnosis | “free vehicle diagnosis” | Commercial | Confirm no conditions |
| Free check | “free LPG system check” | Commercial | Confirm no conditions |
| Warranty | “with warrant” | Consumer | Terms, duration, exclusions |
| 24/7 support | “24/7 support” in meta/JSON-LD | Operational | Actual hours/channel |
| Certified engineers | “our engineers are certified” | Regulatory | Certification body |

**Do not publish legal or regulatory claims without documentary evidence.** They are not marketing copy in the ordinary sense; they can create consumer-protection and regulatory exposure.

---

## 6. Testimonials register

| ID | Name | Location | Source | Consent | Notes |
|----|------|----------|--------|---------|-------|
| T-01 | Jane M. | Nairobi | Homepage + testimonial page | Unknown | Same quote both places |
| T-02 | Chris O. | Nairobi | Homepage + testimonial page | Unknown | Same quote both places |
| T-03 | Violet T. | Athi River | Homepage + testimonial page | Unknown | Same quote both places |
| T-04 | Ahmed R. | Kitengela (homepage) / Eldoret (testimonial page) | Both | Unknown | **Conflict** |
| T-05 | Lucy N. | Thika | Homepage + testimonial page | Unknown | Same quote both places |
| T-06 | John K. | Nairobi | Homepage + testimonial page | Unknown | Same quote both places |

The layout places names and icons in a way that overlaps on mobile. This is a presentation issue, not a reason to remove the testimonials.

---

## 7. Projects register

| ID | Repository title | Live title | Image | Alt | Status |
|----|------------------|------------|-------|-----|--------|
| P-01 | Toyota Passo | Toyota Passo | `george2.jpg` | Empty | Real copy live |
| P-02 | toyota Alion | toyota Alion | `milton conversion .jpg` | Empty | Real copy live |
| P-03 | Prado | Prado | `pado conversion.jpg` | Empty | Real copy live |
| P-04 | Home Work | Typical LPG Autogas Layout | `technical autogas.jpg` | Empty | Live card is real; repo placeholder |
| P-05 | Home Work | Autogas Parts | `technical 2 autogas.jpg` | Empty | Live card is real; repo placeholder |
| P-06 | Home Work | Refueling station | `canopy 2.jpg` | Empty | Live card is real; repo placeholder |
| P-07 | Home Work | Commented out | `george2.jpg` | Empty | Placeholder |
| P-08 | Home Work | Commented out | `milton conversion .jpg` | Empty | Placeholder |
| P-09 | Home Work | Commented out | `technical autogas.jpg` | Empty | Placeholder |

Before replacing placeholders, the owner must supply: vehicle make/model, conversion type, date, location, customer permission and a suitable photo. Do not invent project details.

---

## 8. Forms and data collection

| Form | Page | Fields | Transport | Validation | Destination | Retention |
|------|------|--------|-----------|------------|-------------|-----------|
| Contact | `contact.html`, homepage | Name, Phone_Number, Email, message | EmailJS (live); legacy PHP fallback (404) | Client-side only; script throws before binding | EmailJS service `service_u7bdgwm`, template `template_u57mj4b` | Unknown |
| Quote | `get-quote.html` | Name, Phone_Number, Email, message | EmailJS (live); repository uses `mailto:` | Client-side only | Same EmailJS service/template | Unknown |
| Booking | `booking.html` | Name, phone, service, vehicle, date, time | `POST https://otodrive-booking-api.onrender.com/api/book` | Client-side HTML `required` only | External Render API | Unknown |
| Newsletter | Footer, all pages | Email address in a `<textarea>` | None | None | None | N/A |

All three active forms lack an explicit `method` and `action`. If JavaScript fails, the browser can submit them as GET and expose form values in the URL, browser history and server logs. This is a data-protection issue as well as a reliability issue.

### 8.1 Personal data collected

- Name
- Phone number
- Email address
- Free-text message
- Vehicle make/model/year
- Requested service
- Appointment date/time

### 8.2 Privacy observations

- No privacy notice, cookie notice or consent checkbox.
- No statement of who receives the data, where it is stored or for how long.
- No visible unsubscribe or deletion route.
- Google Maps and analytics set third-party cookies/identifiers before any consent.
- `attention.js` asks for notification permission after the visitor leaves the tab.
- The booking API is hosted on Render; its region, retention and access controls are **Unknown**.

**Inferred:** under the Kenya Data Protection Act 2019, the owner should document lawful basis, purpose, retention, processors and data-subject contact before collecting more data.

---

## 9. Link inventory

### 9.1 Internal links

| Target | Pages | Status |
|--------|-------|--------|
| `index.html` | All | 200 |
| `about.html` | All | 200 |
| `services.html` | All | 200 |
| `projects.html` | All | 200 |
| `testimonial.html` | All | 200 |
| `contact.html` | All | 200 |
| `get-quote.html` | All | 200 |
| `maps.html` | All | 200 |
| `booking.html` | Live header/menu | 200 |
| `blog.html` | All footers | **404** |
| `#` | LinkedIn, some location links | Placeholder |
| `#costum_slider`, `#my_slider`, `#map-section` | Carousel/map controls | Anchors |

### 9.2 Contact links

| Link | Value | Status |
|------|-------|--------|
| Phone | `tel:+254704644909` | Published |
| Email | `mailto:info@otodrive.co.ke` | Published; MX exists via Microsoft 365; mailbox monitoring unknown |
| Location | `maps.html` or `#` | Inconsistent |
| Map | Google Maps embed, Mavoko | Working |

### 9.3 External links

| Destination | Purpose | Status |
|-------------|---------|--------|
| `https://larrzonesolutions.com` | Developer credit | Working (external) |
| `https://www.facebook.com/profile.php?id=61566117596915` | Social | Working; ownership unverified |
| `https://x.com/OTODRIVE_KENYA` | Social (repository) | Repository value; live now uses `x.com/OtodriveKE` |
| `https://www.instagram.com/otodrivekenya/` | Social (repository) | Repository value; live now uses `instagram.com/otodriveke` (except `get-quote.html`) |
| `https://x.com/OtodriveKE` | Live social + JSON-LD `sameAs` | In use; ownership unverified |
| `https://www.instagram.com/otodriveke` | Live social + JSON-LD `sameAs` | In use; ownership unverified |
| Google Fonts | Raleway, Sen | Working |
| Font Awesome 4 CDN | Icons | Working (legacy) |
| Font Awesome 6 CDN | Icons | Working (duplicate) |
| EmailJS CDN | Form transport | Working |
| Google Maps Embed | Map | Working |
| `otodrive-booking-api.onrender.com` | Booking | Working, undocumented |
| Google tag, Hotjar, Clarity | Analytics | Broken placeholders |

### 9.4 Missing legal/utility pages

- Privacy policy
- Terms and conditions
- Cookie policy
- Accessibility statement
- Contact/response-time policy
- Cancellation/rescheduling policy for bookings
- Branded 404 page

These are not all mandatory, but their absence should be a conscious decision, not an oversight. Privacy and booking cancellation are the most important.

---

## 10. Asset inventory

### 10.1 Images

| Asset | Size | Used on | Purpose | Notes |
|-------|------|---------|---------|-------|
| `images/website Logo.png` | 134.9 KB | All pages | Logo; live favicon | Transparent PNG; no responsive variants |
| `images/canopy 2.jpg` | 220.8 KB | Homepage, contact, quote, projects | Station canopy photo | Large; no `srcset` |
| `images/george2.jpg` | 110.8 KB | Homepage, projects | Project photo | `alt=""` |
| `images/123.jpg` | 116.1 KB | None found | Unused | Candidate for archive/removal |
| `images/milton conversion .jpg` | 293.4 KB | Homepage, projects | Project photo | Note space in filename; `alt=""` |
| `images/pado conversion.jpg` | 164.6 KB | Homepage, projects | Project photo | `alt=""` |
| `images/technical autogas.jpg` | 18.7 KB | Homepage, projects | Project photo | `alt=""` |
| `images/technical 2 autogas.jpg` | 61.9 KB | Homepage, projects | Project photo | `alt=""` |
| `images/icon-1.png` | 2.5 KB | None found | Unused | Candidate for archive/removal |
| `images/icon-2.png` | 3.4 KB | Homepage, services | Autogas installation icon | No alt |
| `images/icon-3.png` | 3.1 KB | Homepage, services | Diagnosis icon | No alt |
| `images/icon-4.png` | 3.7 KB | Homepage, services | LPG check icon | No alt |
| `images/Iconka-Home-Sweet-Home-Gas-Station.128.png` | 2.1 KB | Homepage, services | LPG fueling icon | Third-party icon; licence unknown |
| `images/play-icon.png` | 4.2 KB | Homepage, about | Video play button | Has alt on about |
| `images/quick-icon.png` | 1.1 KB | Homepage, testimonial | Attribution icon | Decorative; no alt |
| `images/fevicon.png` | **Missing** | All pages (reference) | Favicon | 404 live |
| `images/LPG-Service.mp4` | 805.5 KB | Homepage, about | About/service video | No captions |
| `images/lpgtech_conversion_movie.mp4` | 48,236.8 KB | Homepage | Hero background video | 49,394,533 bytes; autoplay |

**Unused assets (verified):** `images/123.jpg`, `images/icon-1.png`.  
**Missing asset (verified):** `images/fevicon.png`.

### 10.2 CSS

| File | Size | Loaded? | Notes |
|------|------|---------|-------|
| `css/bootstrap.min.css` | 137.1 KB | Yes | Full Bootstrap 4 build |
| `css/style.css` | 27.1 KB | Yes | Main styles; imports missing `swiper.min.css`; references missing font |
| `css/responsive.css` | 10.3 KB | Yes | Breakpoints |
| `css/jquery.mCustomScrollbar.min.css` | 41.8 KB | Yes | Scrollbar styling; necessity unknown |
| `css/animate.min.css` | 52.4 KB | No direct link | Likely bundled/legacy |
| `css/bootstrap-grid.css` | 38.6 KB | No | Duplicate grid |
| `css/bootstrap-grid.min.css` | 28.3 KB | No | Duplicate grid |
| `css/bootstrap-reboot.css` | 5.0 KB | No | Duplicate reboot |
| `css/bootstrap-reboot.min.css` | 3.9 KB | No | Duplicate reboot |
| `css/bootstrap.css` | 177.5 KB | No | Unminified duplicate |
| `css/default-skin.css` | 11.7 KB | No | Legacy |
| `css/font-awesome.min.css` | 30.3 KB | No | Local FA copy |
| `css/icomoon.css` | 29.5 KB | No | Icon font |
| `css/jquery-ui.css` | 36.4 KB | No | Legacy |
| `css/jquery.fancybox.min.css` | 13.8 KB | No | Lightbox |
| `css/meanmenu.css` | 3.8 KB | No | Mobile menu |
| `css/nice-select.css` | 3.7 KB | No | Select styling |
| `css/normalize.css` | 7.6 KB | No | Reset |
| `css/owl.carousel.min.css` | 3.2 KB | No | Carousel |
| `css/slick.css` | 1.9 KB | No | Carousel |
| `css/swiper.min.css` | **Missing** | Imported by `style.css` | 404 |
| Bootstrap source maps | 415–545 KB each | No | Development artifacts |

### 10.3 JavaScript

| File | Size | Loaded on | Notes |
|------|------|-----------|-------|
| `js/jquery.min.js` | 85.1 KB | All pages | Likely jQuery 3.x |
| `js/jquery-3.0.0.min.js` | 11.3 KB | All pages | **Second jQuery copy** |
| `js/popper.min.js` | 18.7 KB | All pages | Redundant with Bootstrap bundle |
| `js/bootstrap.bundle.min.js` | 69.2 KB | All pages | Includes Popper |
| `js/plugin.js` | 897.2 KB | All pages | Legacy bundle; provenance unknown |
| `js/custom.js` | 8.5 KB | Not linked from index | Contains Swiper initialisation |
| `js/slider-setting.js` | 2.8 KB | Not linked from index | Legacy slider config |
| `js/jquery.validate.js` | 49.1 KB | Not linked from index | Unused validation library |
| `js/modernizer.js` | 140.6 KB | Not linked from index | Legacy feature detection |
| `js/jquery.mCustomScrollbar.concat.min.js` | 44.4 KB | Not linked from index | Scrollbar plugin |
| `js/bootstrap.js` / `.min.js` | 123.4 / 49.5 KB | No | Duplicate Bootstrap |
| Source maps | 172–351 KB each | No | Development artifacts |

**Live-only scripts:**

| File | Size | Purpose | Notes |
|------|------|---------|-------|
| `/contactscript.js` | 2.7 KB | Contact/quote validation + EmailJS | Loads before the form; throws `TypeError` |
| `/js/booking.js` | 4.9 KB | Booking slots and API call | Not in repository |
| `/js/attention.js` | 2.6 KB | Notification permission prompt | Not in repository |

### 10.4 Fonts

| Font | Source | Status |
|------|--------|--------|
| Raleway (400, 500, 600, 800) | Google Fonts | Loaded |
| Sen (400, 700, 800) | Google Fonts | Loaded |
| Baloo Chettan | Local `fonts/BalooChettan-Regular.ttf` | **Missing** (404) |
| Font Awesome 4.0.3 | `netdna.bootstrapcdn.com` | Loaded; legacy |
| Font Awesome 6.0.0-beta3 | `cdnjs.cloudflare.com` | Loaded; duplicate |
| IcoMoon | Local CSS | Unused |

### 10.5 External services

| Service | Used for | Account owner | Status |
|---------|----------|---------------|--------|
| EmailJS | Contact/quote email | Unknown | Configured with public key; quotas/origins unknown |
| Render | Booking API | Unknown | Live; undocumented |
| Google Maps Embed | Location map | Unknown | Working; no API key visible |
| Google Fonts | Typography | N/A | Working |
| Font Awesome CDNs | Icons | N/A | Working |
| Google tag (gtag.js) | Analytics | Unknown | Placeholder ID |
| Hotjar | Behaviour analytics | Unknown | Placeholder ID; JS error |
| Microsoft Clarity | Behaviour analytics | Unknown | Placeholder ID; 400 |
| larrzonesolutions.com | Developer credit | Third party | Working |

### 10.6 Asset licensing

- The logo and project photos are presumably Otodrive property; **Unknown** whether photographer consent exists.
- `Iconka-Home-Sweet-Home-Gas-Station.128.png` appears to be a third-party icon; licence **Unknown**.
- Font Awesome and Google Fonts have their own licences; self-hosting requires attribution compliance.
- `plugin.js` and the CSS frameworks have licences embedded or implied; provenance is **Unknown**.
- Do not assume assets are free to reuse in a redesign. Record the source and licence for each new asset.

---

## 11. Missing and broken assets

| Asset | Requested by | Response | Impact |
|-------|--------------|----------|--------|
| `images/fevicon.png` | All pages | 404 | No favicon |
| `fonts/BalooChettan-Regular.ttf` | `style.css` | 404 | Font fallback; wasted request |
| `css/swiper.min.css` | `style.css` `@import` | 404 | Carousel styling may break |
| `js/contactscript.js` | Not linked from current live pages | 404 | Dead path; root `/contactscript.js` is the file that loads |
| `blog.html` | Footer links | 404 | Dead navigation |
| `send_email.php` | Legacy handlers | 404 | Silent form failure |
| `robots.txt` | Crawlers | 404 | No crawl guidance |
| `sitemap.xml` | Crawlers | 404 | No sitemap discovery |
| `images/123.jpg` | Nothing | N/A | Unused |
| `images/icon-1.png` | Nothing | N/A | Unused |

---

## 12. SEO metadata inventory (live)

| Page | Title | Meta description | Canonical | OG/Twitter | JSON-LD |
|------|-------|------------------|-----------|------------|---------|
| `index.html` | “OTODRIVE - Kenya's Leading LPG Autogas Conversion & Services” | Present, mentions 40% savings and 24/7 | `https://otodrive.co.ke/` (bad) | Present, same bad host | `AutoRepair` with unverified address/geo/hours |
| `about.html` | “About” | Empty | Not observed | Not observed | None |
| `services.html` | “Services” | Empty | Not observed | Not observed | None |
| `projects.html` | “Projects” | Empty | Not observed | Not observed | None |
| `testimonial.html` | “Testimonial” | Empty | Not observed | Not observed | None |
| `contact.html` | “Contact” | Empty | Not observed | Not observed | None |
| `get-quote.html` | “Contact” (wrong) | Empty | Not observed | Not observed | None |
| `maps.html` | “About” (wrong) | Empty | Not observed | Not observed | None |
| `booking.html` | “Book a Service - OTODRIVE” | Not observed | Not observed | Not observed | None |

### 12.1 Keyword metadata

- Live `index.html` has Kenya-relevant keywords.
- Live `about.html` and `maps.html` still contain a long Turkish/foreign autogas keyword list copied from a template (`otogaz`, `lpgmontaj`, `izmir`, etc.). This is irrelevant to Otodrive and looks spammy.
- Other pages have empty keyword fields.
- Modern search engines ignore the keywords meta tag, but the copied text is a signal of unfinished templating and should be removed in the SEO phase.

### 12.2 Heading structure

- Homepage has multiple `h1` elements: one per hero slide plus section headings.
- About, services, projects, testimonial and contact pages each use `h1` for the page title and additional `h1`s for footer/section labels in places.
- Heading levels skip from `h1` to `h4` in service cards and from `h2` to `h4` in project cards.
- Footer headings use `h2` for “QUICK LINKS”, “Work Portfolio” and “SIGN UP TO OUR NEWSLETTER”, which competes with page structure.

### 12.3 Internal linking

- Every page links to every other page, including the missing blog.
- No breadcrumbs.
- No related services/projects links.
- No location-specific landing pages.
- No pagination or archive.

---

## 13. Live-only additions not in the repository

| Addition | Where | Purpose | Tracked? |
|----------|-------|---------|----------|
| `booking.html` | Live root | Booking journey | No |
| `js/booking.js` | Live root | Slot generation/API | No |
| `contactscript.js` | Live root | EmailJS validation | No |
| `js/attention.js` | Live root | Notification prompt | No |
| SEO/OG/Twitter metadata | Live pages | Search/social | No |
| JSON-LD | Live homepage | Local business markup | No |
| Google tag/Hotjar/Clarity | Live homepage | Analytics | No |
| EmailJS config | Live contact/quote | Form transport | No |
| Header rework | Live pages | Layout | No |
| Project descriptions | Live projects/index | Content | No |
| Social handle changes | Live JSON-LD | Brand | No |

**Implication:** the live site contains production work that exists nowhere else. Back it up before changing anything.

---

## 14. Content discrepancies

| ID | Discrepancy | Locations | Recommended resolution |
|----|-------------|-----------|------------------------|
| CD-01 | Ahmed R. location | Kitengela (homepage) vs Eldoret (testimonial page) | Owner confirms; use one value everywhere |
| CD-02 | X handle | Repository visible `OTODRIVE_KENYA` vs live visible/JSON-LD `OtodriveKE` | Owner confirms official handle |
| CD-03 | Instagram handle | Repository visible `otodrivekenya` vs live visible/JSON-LD `otodriveke`; `get-quote.html` still uses `otodrivekenya` | Owner confirms official handle |
| CD-04 | Opening hours | 24/7 vs booking Mon–Fri/Sat/Sun | Owner confirms real hours |
| CD-05 | Address | “Mavoko, Nairobi, 00100” vs Mavoko, Machakos | Owner confirms full address |
| CD-06 | Project copy | Live has six real cards; repository has three real and six placeholders; three placeholder cards remain commented out in the live HTML | Adopt live copy as baseline |
| CD-07 | Contact form | Repo PHP vs live EmailJS | Choose one implementation |
| CD-08 | Quote form | Repo mailto vs live EmailJS | Choose one implementation |
| CD-09 | Brand casing | Otodrive / OtoDrive / OTODRIVE | Define brand guideline |
| CD-10 | Copyright year | 2024 vs 2026 | Update with owner approval |
| CD-11 | “Testimonial” heading | Singular on a page with six testimonials | Consider “Testimonials” (copy change approval) |
| CD-12 | Map page title | “About” | Fix in SEO phase |
| CD-13 | Service card names | Live homepage says “Vehicle Diagnosis” / “Autogas system check and service”; live services page says “Free Car Diagnosis” / “Free LPG system check and service” | Standardise with owner approval |

---

## 15. Preservation checklist

Before any implementation phase, confirm:

- [ ] Live pages and assets are backed up outside the repository.
- [ ] The current logo is the official logo and its source file is available.
- [ ] All photographs are owned or licensed by Otodrive.
- [ ] No testimonial is removed without owner approval.
- [ ] No project is removed without owner approval.
- [ ] The phone number and email are current.
- [ ] The physical address and hours are confirmed.
- [ ] The official social handles are confirmed.
- [ ] The legal/regulatory claims are substantiated.
- [ ] The booking API owner and data policy are known.
- [ ] The EmailJS account owner and allowed origins are known.
- [ ] The analytics accounts (if any) are known.
- [x] Canonical public host confirmed as `https://www.otodriveafrica.com/`; `.co.ke` redirect and email continuity still to be implemented.
- [ ] The deployment method and rollback plan are documented.

Until these are confirmed, preserve the current content and flag rather than “fix” business facts.

---

## 16. Related documents

- `docs/PROJECT_AUDIT.md` — findings, risks and evidence.
- `docs/MODERNIZATION_ROADMAP.md` — phased plan and acceptance criteria.
- `docs/LOCATIONS_INTEGRATION_PLAN.md` — location data model, mapping options and verification checklist.
- `docs/ONLINE_PRESENCE_PLAN.md` — technical SEO, local search, social sharing, AI crawler access and chatbot assessment.
- `docs/DECISIONS_AND_OPEN_QUESTIONS.md` — decisions, assumptions, open questions and sign-off.

---

**End of inventory. No content or assets were modified.**
