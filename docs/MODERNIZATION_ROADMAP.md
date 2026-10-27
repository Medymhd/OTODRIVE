# Otodrive Website — Modernization Roadmap

**Phase:** 1 — Discovery and audit  
**Date:** 27 October 2026  
**Status:** Proposed — awaiting owner approval  
**Production changes made:** None

---

## 1. Purpose

This roadmap turns the audit findings into a sequenced, low-risk programme of work. It is deliberately conservative:

- stabilise the current site before changing its design;
- preserve all content and business facts;
- verify facts before publishing them;
- keep each phase small enough to review and roll back;
- require explicit approval before any production deployment.

The roadmap is a proposal, not an authorisation. No phase starts until the owner approves it.

---

## 2. Guiding principles

1. **Live site is the baseline.** The repository is stale; the live copy must be captured before anything changes.
2. **Fix revenue paths first.** Forms and booking matter more than visual polish.
3. **Do not redesign on a broken foundation.** Layout and branding work comes after functional stability.
4. **No invented facts.** Locations, hours, licences, savings and partnerships require owner evidence.
5. **Accessibility is part of “done”.** WCAG 2.2 AA is the target; reduced motion and low-bandwidth fallbacks are required.
6. **Performance is a feature.** Mobile users on constrained networks are a primary audience.
7. **One change, one review.** Small branches, small commits, clear acceptance criteria.
8. **No deployment without separate approval.** Staging first; production second; rollback ready.
9. **Static-first unless proven otherwise.** A framework or CMS is only justified by a concrete content/workflow need.
10. **Measure before and after.** Keep the audit evidence and compare.
11. **No new subscriptions.** Use existing hosting/Microsoft 365 and free/open-source components; document free-tier quotas and renewal risk. No paid service starts without separate approval.

---

## 3. Phase overview

| Phase | Name | Goal | Indicative effort | Blocking decisions |
|-------|------|------|-------------------|--------------------|
| 0 | Baseline and access | Make the work safe and reproducible | 1–2 days | Domain, hosting, backups |
| 1 | Audit | Understand the system and risks | Complete | — |
| 2A | Stabilisation: revenue, security, domain | Stop lost enquiries and broken trust signals | 2–4 days | Form transport, domain strategy |
| 2B | Broken assets, navigation and layout | Remove dead ends and visual breakage | 2–3 days | Blog decision, brand assets |
| 2C | Accessibility | Reach WCAG 2.2 AA where feasible | 3–5 days | None |
| 2D | Performance and media | Make the site usable on mobile data | 3–5 days | Hero media direction |
| 2E | Premium design discovery | Define a high-end visual direction and one hero prototype without committing to 3D | 2–4 days | Brand direction, reference approval, performance budget |
| 3 | Locations and booking | Publish verified locations and reliable booking | 1–2 weeks | Address, hours, API ownership, provider |
| 4 | Content and SEO | Make content trustworthy and discoverable | 1–2 weeks | Verified claims, project/testimonial data |
| 5 | Privacy, consent and analytics | Collect data lawfully and measure reliably | 3–5 days | Analytics accounts, legal review |
| 6 | Engineering hygiene and release process | Make future changes safe | 3–5 days | Hosting access, staging |
| 7 | Optional replatform | Only if justified by content/workflow needs | 2–4 weeks | Business case |

**Indicative total:** 7–12 weeks of focused work, excluding owner decision time and the optional replatform. Effort assumes one senior developer with owner availability for reviews.

Phases 2A–2E can overlap in planning but should be reviewed separately. Phase 3 can start in parallel only after the owner supplies verified facts.

---

## 4. Phase 0 — Baseline and access

### Goal

Create a safe, reproducible starting point before changing anything.

### Tasks

- [ ] Owner approves this roadmap and the audit findings.
- [x] Canonical public host confirmed as `https://www.otodriveafrica.com/`.
- [ ] Confirm hosting provider, control panel and deployment method.
- [ ] Confirm the redirect plan for `otodrive.co.ke` (legacy email domain) and the apex/`www` variant.
- [ ] Capture a full backup of the live site (files, database if any, mail configuration).
- [ ] Capture the live pages and assets into a dated baseline folder.
- [ ] Reconcile live and repository into a single tracked branch.
- [ ] Tag the baseline commit.
- [ ] Create a staging copy (subdomain or password-protected directory).
- [ ] Record third-party account ownership: EmailJS, Render, Google Maps, analytics, domain registrar, DNS.
- [ ] Confirm who can approve content and business facts.
- [ ] Confirm the review cadence and response times.

### Deliverables

- Backup archive and checksum.
- `baseline` Git tag.
- Staging URL.
- Access/ownership register (kept private, not in the public repository).
- Decision log update.

### Exit criteria

- A broken change can be reverted within one working session.
- The team can deploy to staging without touching production.
- The canonical host is confirmed; the redirects are implemented and verified once hosting access is available.

### Risks

| Risk | Mitigation |
|------|------------|
| No hosting access | Owner provides credentials or performs backup with guidance. |
| Live copy differs from repo | Baseline from live, then diff; never assume repo is current. |
| DNS/domain ownership unclear | Resolve before any canonical or redirect change. |
| Secrets in repository | Do not commit credentials; use host environment variables. |

---

## 5. Phase 1 — Audit (complete)

### Delivered

- `docs/PROJECT_AUDIT.md`
- `docs/CONTENT_AND_ASSET_INVENTORY.md`
- `docs/MODERNIZATION_ROADMAP.md`
- `docs/LOCATIONS_INTEGRATION_PLAN.md`
- `docs/ONLINE_PRESENCE_PLAN.md`
- `docs/DECISIONS_AND_OPEN_QUESTIONS.md`

### Exit criteria

- Owner has read the audit.
- Owner has answered the blocking questions in `DECISIONS_AND_OPEN_QUESTIONS.md`, or accepted the documented defaults.
- Owner has approved Phase 2A (or a different next phase).

### Review checkpoint

**Stop here.** No code changes until the owner signs off.

---

## 6. Phase 2A — Stabilisation: revenue, security, domain

### Goal

Make enquiries reliable, remove broken trust signals, and establish a safe baseline.

### Why first

The current contact and quote forms can lose messages. The canonical URL points to a domain that does not serve the website. These are more important than visual polish.

### Scope

1. **One form path**
   - Choose EmailJS or a server-side endpoint. Do not keep both.
   - If EmailJS: restrict allowed origins, set quotas, initialise before use, load the script once, handle errors visibly.
   - If server-side: implement validation, rate limiting, spam protection, SMTP credentials in environment variables, and a monitored mailbox.
   - Fix Enter-key and button-click behaviour.
   - Set an explicit `method`/`action` or always prevent default; never allow a GET fallback that exposes fields.
   - Add accessible success and error messages.
   - Add a consent checkbox and link to the privacy notice (Phase 5 can supply the final text; a placeholder policy is not acceptable).
   - Test with real submissions to a monitored inbox.

2. **Remove the 404 legacy handler**
   - Delete or neutralise `send_email.php` references.
   - Remove commented-out AJAX blocks.
   - Remove the inline fetch handler that posts to a missing endpoint.

3. **Canonical domain and HTTPS**
   - Implement the owner-approved canonical host.
   - Redirect the alternate host and HTTP to HTTPS with 301s.
   - Update canonical, OG, Twitter and JSON-LD URLs.
   - Verify with `curl -I` and browser tests.
   - Add HSTS only after all subresources are HTTPS.

4. **Security headers**
   - `X-Content-Type-Options: nosniff`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy` minimal allowlist
   - Content-Security-Policy in report-only first
   - Frame protection via CSP `frame-ancestors`

5. **Tracking placeholders**
   - Remove Google tag/Hotjar/Clarity placeholders, or replace with real IDs supplied by the owner.
   - Remove `attention.js` unless a consented notification feature is approved.
   - Do not add new trackers in this phase.

6. **Booking bug fix**
   - Fix the `calendarLinkDiv` declaration order.
   - Add network timeout and visible error handling.
   - Do not claim real availability until Phase 3.

7. **Repository hygiene**
   - Remove `.DS_Store` and editor files from tracking.
   - Add `.gitignore`.
   - Add a minimal README with local preview and deployment notes.
   - Do not rewrite history or force-push.

### Out of scope

- Redesign.
- New booking availability logic.
- New analytics.
- Content rewriting.

### Acceptance criteria

- [ ] A contact message submitted by click **and** by Enter arrives in the monitored inbox.
- [ ] A quote message submitted by click **and** by Enter arrives in the monitored inbox.
- [ ] Invalid input shows an accessible error; a failed send shows a visible failure message.
- [ ] No live page references `send_email.php` or a 404 script.
- [ ] Canonical, OG and JSON-LD URLs use the approved host.
- [ ] HTTP and alternate host redirect to the canonical HTTPS URL.
- [ ] No placeholder analytics IDs remain.
- [ ] `attention.js` is removed or explicitly approved.
- [ ] Security headers are present on staging and production.
- [ ] Booking no longer throws a JavaScript error on a malformed response.
- [ ] README explains how to preview and deploy.

### Review checkpoint

Owner tests both forms and confirms delivery. Only then proceed.

---

## 7. Phase 2B — Broken assets, navigation and layout

### Goal

Remove dead ends and fix the most visible layout breakage without changing the design language.

### Scope

- Fix or remove the `blog.html` footer link (owner decides: build a blog, redirect, or remove the link).
- Create a branded 404 page.
- Fix `images/fevicon.png` or remove the reference and use the logo favicon.
- Fix or remove the missing `fonts/BalooChettan-Regular.ttf` reference.
- Fix or remove the missing `swiper.min.css` import.
- Repair the duplicated `<head>`/`<body>` in `maps.html`.
- Fix the desktop header crowding and logo/hero overlap.
- Fix the mobile hero readability and missing/clipped logo.
- Fix carousel arrow overlap and testimonial name overlap.
- Fix footer column crowding at intermediate widths.
- Remove dead hidden navigation markup.
- Confirm the mobile menu opens, closes, supports Escape and returns focus.
- Keep all existing copy, images and colours.

### Out of scope

- New brand identity.
- Copy rewrites.
- Framework migration.
- Blog content creation (unless the owner chooses to build one; that is Phase 4).

### Acceptance criteria

- [ ] No internal link returns 404.
- [ ] No referenced local asset returns 404.
- [ ] Header, hero, carousel, testimonials and footer render without overlap at 360, 390, 768, 1024, 1440 and 1920 px.
- [ ] Mobile navigation is usable by touch and keyboard.
- [ ] The 404 page is branded and links home.
- [ ] Visual regression screenshots are captured before/after.
- [ ] No content or business fact is changed.

### Review checkpoint

Owner reviews desktop and mobile screenshots and the 404 page.

---

## 8. Phase 2C — Accessibility

### Goal

Meet WCAG 2.2 AA for the public pages, with documented exceptions where content cannot be made accessible without owner input.

### Scope

- Fix colour contrast to at least 4.5:1 for body text and 3:1 for large text/UI components.
- Add a single `<main>` landmark per page and a skip link.
- Normalise headings: one `h1` per page, logical `h2`/`h3` order.
- Add meaningful `alt` text to project and content images; mark decorative images `alt=""`.
- Add `title` to every iframe.
- Add visible labels to all form fields; associate errors with fields; use `aria-live` for status messages.
- Remove `maximum-scale=1`; allow zoom to 200%.
- Give icon-only links an accessible name.
- Make carousels keyboard operable, with pause/next/previous controls and focus management.
- Respect `prefers-reduced-motion`; pause autoplay video/carousel.
- Add captions/transcript for meaningful video, or mark it decorative and provide equivalent text.
- Ensure focus indicators are visible.
- Test with keyboard only, a screen reader (NVDA or VoiceOver) and browser zoom.

### Out of scope

- Rewriting content for plain language (recommendations can be logged).
- Third-party map internals (the iframe can have a title and a text alternative).
- Full audit of every PDF or external link (none found).

### Acceptance criteria

- [ ] Lighthouse accessibility ≥ 0.95 on the homepage and each main page.
- [ ] No critical or serious axe-core issues on the main pages.
- [ ] Keyboard-only navigation reaches every interactive element in a logical order.
- [ ] Zoom to 200% does not lose content or functionality.
- [ ] All form fields have visible labels and accessible errors.
- [ ] All iframes have titles.
- [ ] Reduced-motion mode stops autoplay animation/video.
- [ ] A short accessibility statement is published (optional but recommended).

### Review checkpoint

Owner reviews the accessibility statement and any content exceptions.

---

## 9. Phase 2D — Performance and media

### Goal

Make the site usable on mobile data and low-end devices without removing its visual character.

### Scope

- Replace the 47.1 MiB hero video with one of:
  - a short compressed loop (target ≤ 2.5 MB), or
  - a static poster with an optional play button, or
  - a responsive image sequence.
- Add `poster`, `preload="metadata"`, `playsinline` and a reduced-motion fallback.
- Compress and resize images; add WebP/AVIF with `srcset` and `sizes`.
- Add `width`/`height` to prevent layout shift.
- Remove duplicate jQuery and Bootstrap/Popper copies.
- Audit `plugin.js`; replace with only the required plugins.
- Remove unused CSS/JS from the critical path.
- Self-host or subset fonts; remove missing font references.
- Add `preconnect` for required third parties.
- Lazy-load below-the-fold images and maps.
- Gate Google Maps behind click-to-load consent.
- Configure compression and cache headers at the host (or CDN if approved).
- Consider a CDN only if hosting performance cannot meet targets.

### Performance budgets

| Metric | Target |
|--------|--------|
| Initial HTML | ≤ 100 KB uncompressed |
| Critical CSS | ≤ 100 KB uncompressed |
| Critical JS | ≤ 150 KB uncompressed |
| Largest single asset | ≤ 500 KB (except user-initiated video) |
| Hero media | ≤ 2.5 MB |
| Lighthouse mobile performance | ≥ 0.85 (lab, staging) |
| LCP (mobile lab) | ≤ 2.5 s |
| CLS | ≤ 0.1 |
| INP (lab proxy) | ≤ 200 ms |

These are targets, not guarantees; shared hosting and third-party maps may limit them. Measure before and after.

### Acceptance criteria

- [ ] Homepage initial transfer is materially smaller than baseline.
- [ ] Hero video or poster meets the budget.
- [ ] No duplicate libraries.
- [ ] No 404 asset requests on any main page.
- [ ] Images are responsive and have dimensions.
- [ ] Map does not load until consent.
- [ ] Compression and caching are confirmed on production.
- [ ] Lighthouse mobile performance ≥ 0.85, or a documented reason why not.

### Review checkpoint

Owner reviews the mobile experience on a real phone and a throttled connection if possible.

---

## 10. Phase 2E — Premium design discovery

### Goal

Define a high-end visual direction and test it in one hero prototype **after** the reliability, accessibility and performance foundations are fixed. This is a discovery and prototype phase, not a full redesign.

### Why now

A premium feel is not created by adding Three.js. It comes from art direction, typography, photography, spacing, motion, copy and performance discipline. Adding 3D or heavy animation before the current 47 MiB hero video and mobile layout are fixed would make the site slower and less credible.

### Inputs

- Current brand assets, logo, photography and video.
- The current content and approved service/location facts.
- Performance budgets from Phase 2D.
- The owner’s premium visual references, including C.O.R.E as **inspiration only**.
- Reference qualities the owner wants: cinematic, editorial, restrained, technical, warm, etc.

### Scope

- Define the visual direction in words and design tokens:
  - typography scale and pairing;
  - grid, spacing and layout rhythm;
  - colour and contrast;
  - photography/imagery treatment;
  - motion principles and reduced-motion behaviour;
  - interaction and hover/focus language;
  - tone of copy and calls to action.
- Review two or three visual territories and select one with the owner.
- Produce **one responsive hero prototype** first, not a full-site redesign.
- Test the prototype at 360, 390, 768, 1024 and 1440 px on a throttled connection.
- Define a performance budget for the hero: image/video weight, LCP, CLS and CPU cost.
- Decide whether a 2D motion system is sufficient; it may be the stronger result.
- Evaluate Three.js only after the 2D prototype meets the budget. If considered, require:
  - a static poster fallback;
  - `prefers-reduced-motion` support;
  - progressive enhancement (the page works without WebGL);
  - mobile performance and battery testing;
  - a kill switch and documented dependency/version risk;
  - owner approval of the extra maintenance cost.
- Document the asset and content requirements for a later rollout.

### Out of scope

- Full-site redesign.
- A 3D scene or Three.js implementation by default.
- CMS or framework migration.
- Rewriting business facts or location content.
- Production rollout without a separate approval.

### Acceptance criteria

- [ ] One owner-approved visual direction with design tokens and usage rules.
- [ ] One responsive hero prototype at 360, 390, 768, 1024 and 1440 px.
- [ ] Static fallback and reduced-motion behaviour demonstrated.
- [ ] Hero performance budget met on a throttled mobile profile.
- [ ] Three.js explicitly approved or rejected with evidence.
- [ ] Accessibility review of the prototype.
- [ ] No production rollout until the owner approves the prototype and the rollout plan.

### Review checkpoint

Owner reviews the visual direction and hero prototype on desktop and mobile. Only then is a full-site rollout planned.

---

## 11. Phase 3 — Locations and booking

### Goal

Publish only verified location data and make booking trustworthy.

### Dependencies

- Owner confirms the seven owner-listed service points, any additional sites, and the exact service split per site.
- Owner supplies verified address, hours, phone and coordinates for each site.
- Owner confirms the booking API owner, repository, schema and retention.
- Owner chooses the booking model: external API, hosted scheduler, or request-only form.

### Scope

**Locations**

- Implement the data model in `LOCATIONS_INTEGRATION_PLAN.md`, with one record per verified site.
- Store the records in one validated data file and generate location pages, cards, JSON-LD and sitemap entries from it; do not hard-code NAP data into multiple HTML files.
- Treat Otodrive conversion and Autogas LPG fueling as separate service flags; do not imply both at every Petrocity site.
- Keep Jomvu and Jomvu Yard as separate records, pins and labels.
- Publish a text address, directions link, hours, phone and confirmed services for each verified location.
- Add a text-first location index; the map is an enhancement, not the only source.
- Add click-to-load consent for maps.
- Update JSON-LD to match verified facts exactly.
- Add location-specific metadata only if there is real, distinct content.
- Do not geocode or invent coordinates; use only owner-confirmed customer entrances.

**Booking**

- Decide whether real-time availability is required.
- If yes: document the API contract, add authentication/rate limiting, prevent double booking, handle time zones (`Africa/Nairobi`), add idempotency and audit logs.
- If no: replace the availability grid with a request form and clear “we will confirm” messaging.
- Align opening hours across the site, booking, JSON-LD and Google Business Profile.
- Add cancellation/rescheduling policy and confirmation expectations.
- Add error, timeout and retry states.
- Do not claim an email/calendar invite unless the API actually sends one.

### Acceptance criteria

- [ ] Every published location field has an owner-verified source and date.
- [ ] Every published site is either one of the seven owner-listed sites or an owner-approved addition.
- [ ] Otodrive conversion and Autogas LPG fueling are separate labels; no site implies both unless confirmed.
- [ ] Jomvu and Jomvu Yard are distinct records, pins and labels.
- [ ] Location pages, cards, JSON-LD and sitemap entries are generated from the same validated data record; no duplicated NAP.
- [ ] The location data file validates against its schema before deployment.
- [ ] Address, phone, hours and coordinates match the matching Google Business Profile.
- [ ] Each coordinate is confirmed as the customer entrance, not a town or nearby landmark.
- [ ] JSON-LD contains no unverified claim.
- [ ] Booking never offers a slot outside verified hours.
- [ ] Double booking is prevented or explicitly not promised.
- [ ] Network failure shows a clear message and a fallback contact route.
- [ ] Confirmation wording matches actual behaviour.
- [ ] Time zone and daylight-saving assumptions are documented (Kenya has no DST).

### Review checkpoint

Owner signs off each location record and the booking policy.

---

## 12. Phase 4 — Content and SEO

### Goal

Make the site trustworthy and discoverable without inventing facts.

### Scope

- Resolve all six “Home Work” placeholder cards in the repository; live already shows six real cards and leaves three placeholder cards commented out. Use approved projects or remove the cards.
- Replace the repository footer Lorem Ipsum with the live copy (already present in production) and have the owner approve it.
- Resolve testimonial location conflict and confirm consent.
- Fix typos and grammar with owner approval.
- Write unique titles and meta descriptions for each page.
- Fix the `maps.html` title (“About”) and `get-quote.html` title (“Contact”).
- Remove the copied Turkish keyword list.
- Add `robots.txt` and `sitemap.xml`.
- Add a branded 404 page if not already done.
- Add canonical tags to every indexable page.
- Add Open Graph/Twitter metadata consistently.
- Add structured data only for verified facts.
- Add breadcrumbs if the site grows.
- Decide the blog: build, redirect, or remove links.
- Add internal links between services, projects and locations.
- Add image alt text and captions where useful.
- Update the copyright year.
- Implement the approved technical SEO, local-search, social-preview and AI-crawler actions in `ONLINE_PRESENCE_PLAN.md`.
- Verify the site in Google Search Console and Bing Webmaster Tools, submit the sitemap, and record the owners of those accounts.
- Keep the existing tone and terminology; do not rewrite for the sake of it.

### Out of scope

- Programmatic SEO pages.
- Paid search/ads.
- Link building.
- AI chatbot implementation (requires separate approval and the gates in `ONLINE_PRESENCE_PLAN.md`).
- Content marketing strategy (can be a separate engagement).

### Acceptance criteria

- [ ] Every indexable page has a unique title and description.
- [ ] No placeholder copy remains.
- [ ] No unverified business claim is published as fact.
- [ ] `robots.txt` and `sitemap.xml` return 200 and reference the canonical host.
- [ ] Structured data validates without errors.
- [ ] No internal 404s.
- [ ] Social previews render correctly on X, Facebook and WhatsApp.
- [ ] The approved `robots.txt` policy is live and the sitemap is submitted.
- [ ] Google Search Console and Bing Webmaster Tools are verified, with named owners.
- [ ] Owner has approved every changed sentence.

### Review checkpoint

Owner content review before publication.

---

## 13. Phase 5 — Privacy, consent and analytics

### Goal

Collect data lawfully and measure what matters.

### Scope

- Publish a privacy notice covering forms, booking, maps and analytics.
- Add a cookie/tracker notice with accept/reject and granular categories.
- Gate non-essential scripts until consent.
- Document lawful basis, purpose, retention and processors.
- Add a data-subject contact route.
- Remove `attention.js` or make it consent-based.
- Configure real analytics IDs (if the owner wants analytics).
- Define events: form submit, quote request, booking start, booking complete, call click, directions click.
- Exclude or anonymise sensitive data.
- Add a consent record.
- Review EmailJS/Render data processing terms.
- Consider a data protection impact assessment if booking data is sensitive.

### Acceptance criteria

- [ ] No non-essential tracker loads before consent.
- [ ] Privacy notice is linked from every form and the footer.
- [ ] Consent can be withdrawn.
- [ ] Analytics receives real data in staging/production.
- [ ] Event names and conversions are documented.
- [ ] Data retention is documented and enforced where possible.
- [ ] Owner has confirmed the legal review route.

### Review checkpoint

Owner and, if available, legal adviser review the privacy notice and consent flow.

---

## 14. Phase 6 — Engineering hygiene and release process

### Goal

Make future changes safe and repeatable.

### Scope

- Add a README with architecture, local preview, deployment and rollback.
- Add a `.gitignore` and remove editor/OS artifacts.
- Add HTML/CSS/JS linting and link checking.
- Add automated accessibility checks (axe/Lighthouse CI) on pull requests.
- Add a staging environment and a release checklist.
- Add uptime and error monitoring.
- Add backup automation and a restore drill.
- Document third-party accounts and renewal dates.
- Add a content update workflow and ownership.
- Tag releases.
- Keep `main` protected; use branches and pull requests.
- Extend the minimal location build step to shared partials if it reduces duplication; do not migrate the stack solely for templating.

### Acceptance criteria

- [ ] A new developer can run and deploy the site from the README.
- [ ] CI catches broken links, missing assets and accessibility regressions.
- [ ] Staging is separate from production.
- [ ] A restore has been tested.
- [ ] Release and rollback are documented.
- [ ] No secrets are committed.

### Review checkpoint

Owner approves the release process and access model.

---

## 15. Phase 7 — Optional replatform

### Goal

Only if the current static approach cannot meet a validated need.

### Triggers

Consider a framework/CMS only if:

- the owner needs frequent, non-technical content updates;
- a blog or multi-location directory is approved;
- booking requires tight integration with a CMS;
- the page count or shared partials become unmanageable;
- performance/accessibility cannot be maintained with the current structure.

### Options

| Option | Fit | Trade-offs |
|--------|-----|------------|
| Keep static HTML + shared partials/build | Small site, low change frequency | Manual content edits; no CMS |
| Static site generator (Astro/Eleventy) | Content collections, locations, blog | Build step; developer needed for templates |
| Headless CMS + SSG | Non-technical editing, structured locations | Cost, complexity, vendor |
| WordPress | Familiar admin, plugins | Security/maintenance burden; overkill for a site this size |
| Custom app | Booking/member features | Highest cost and risk |

### Decision rule

Do not replatform without a written business case covering content volume, update frequency, budget, hosting, training and migration risk. A redesign is not a reason to replatform.

---

## 16. Sequencing rationale

1. **Revenue and trust before appearance.** Broken forms and a dead canonical host cost more than a misaligned logo.
2. **Accessibility before performance polish.** Performance work often changes markup; do it once with accessible structure.
3. **Facts before locations.** Publishing a map or address before verification creates legal and reputational risk.
4. **Privacy before analytics.** Adding trackers before consent compounds the compliance problem.
5. **Hygiene before scale.** A release process is cheaper than recovering from a bad deploy.
6. **Replatform last.** A new stack does not fix broken content or missing business facts.

---

## 17. Work management

### Branching

- `main` — production-ready, protected.
- `phase/2a-stabilisation` — one branch per phase.
- `fix/<short-description>` — small fixes.
- `docs/phase-1-audit` — this documentation.

### Commit rules

- One logical change per commit.
- Imperative, specific messages (e.g., `fix(contact): route all submissions through one handler`).
- No secrets, credentials, personal data or large binaries.
- Reference the issue/decision ID where applicable.
- Do not rewrite published history or force-push shared branches.

### Review checklist

- [ ] Scope matches the approved phase.
- [ ] No unrelated changes.
- [ ] Content preserved or owner-approved.
- [ ] Accessibility checked.
- [ ] Mobile checked.
- [ ] Performance impact measured.
- [ ] Links/assets verified.
- [ ] Privacy impact considered.
- [ ] Rollback plan stated.
- [ ] Deployment approved separately.

### Testing matrix

| Area | Minimum |
|------|---------|
| Browsers | Chrome, Edge, Firefox, Safari (latest two) |
| Devices | 360 px, 390 px, 768 px, 1024 px, 1440 px |
| Keyboard | Full journey without a mouse |
| Screen reader | NVDA (Windows) or VoiceOver (macOS/iOS) |
| Network | Fast, 4G, throttled 3G |
| Reduced motion | OS setting enabled |
| Zoom | 200% |
| Forms | Click, Enter, invalid, network failure |
| Links | Internal, external, tel, mailto |
| SEO | Canonical, metadata, structured data, sitemap |

### Deployment checklist

- [ ] Staging approved.
- [ ] Backup taken.
- [ ] DNS/TLS unchanged unless approved.
- [ ] Environment variables set.
- [ ] Cache purged if applicable.
- [ ] Smoke test: home, about, services, projects, testimonial, contact, quote, maps, booking.
- [ ] Form test received.
- [ ] Rollback command ready.
- [ ] Post-deploy monitoring window.

---

## 18. Risk register

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|------------|--------|------------|
| R-01 | Live edits overwritten by a repo deploy | High | High | Reconcile baseline; single source of truth; staging |
| R-02 | Form messages lost during transition | Medium | High | One handler; test both submit paths; monitor inbox |
| R-03 | Domain change causes SEO loss | Medium | High | 301s, canonical consistency, Search Console monitoring |
| R-04 | Booking double-books or promises unavailable slots | High | High | Real availability or request-only model |
| R-05 | Personal data breach via forms/API | Low | High | Server-side validation, rate limits, least privilege, retention |
| R-06 | Accessibility regressions during visual work | Medium | Medium | Automated + manual checks each phase |
| R-07 | Performance work breaks carousels/video | Medium | Medium | Incremental changes; visual regression tests |
| R-08 | Owner facts arrive late | High | Medium | Start with non-blocking phases; document defaults |
| R-09 | Vendor lock-in/cost creep | Medium | Medium | Static-first; exit plan for maps/booking/analytics |
| R-10 | Scope creep into redesign | High | High | Phase gates; explicit out-of-scope lists |
| R-11 | Credentials unavailable | Medium | High | Access checklist in Phase 0 |
| R-12 | Shared host cannot set headers/compression | Medium | Medium | Confirm host capabilities; consider CDN/proxy |
| R-13 | Email deliverability (SPF/DKIM/DMARC) | Medium | High | Verify DNS/mail configuration before launch |
| R-14 | Legal claims challenged | Low | High | Evidence file for every regulatory claim |
| R-15 | Content owner unavailable for approvals | Medium | Medium | Named backup approver; batched reviews |

---

## 19. Success metrics

### Business

- Contact/quote form delivery rate (target: 100% of valid submissions received).
- Booking completion rate and no-show rate.
- Calls and direction clicks from the site.
- Enquiry response time.

### Technical

- Lighthouse accessibility ≥ 0.95.
- Lighthouse SEO ≥ 0.95.
- Lighthouse mobile performance ≥ 0.85.
- Core Web Vitals: LCP ≤ 2.5 s, CLS ≤ 0.1, INP ≤ 200 ms (field data where available).
- Zero internal 404s.
- Uptime ≥ 99.9% (hosting-dependent).
- No critical security findings.

### Content

- Zero placeholder copy.
- Every business fact has a verified source and date.
- Every location record is owner-approved.
- Privacy notice and consent live.

---

## 20. Decision gates

| Gate | Decision | Owner | Blocks |
|------|----------|-------|--------|
| G1 | Approve audit and roadmap | Owner | All work |
| G2 | Confirm hosting access and implement the confirmed canonical host/redirects | Owner + host | Phase 2A |
| G3 | Choose form transport (EmailJS vs server-side) | Owner + developer | Phase 2A |
| G4 | Confirm addresses, hours, phone, services | Owner | Phase 3 |
| G5 | Choose booking model (real-time vs request) | Owner | Phase 3 |
| G6 | Choose mapping provider/budget | Owner | Phase 3 |
| G7 | Approve privacy/consent approach | Owner (+ adviser) | Phase 5 |
| G8 | Approve production deployment | Owner | Each release |
| G9 | Approve crawler/AI policy and chatbot go/no-go | Owner | Phase 4/5 |
| G10 | Approve premium visual direction and hero prototype | Owner | Phase 2E rollout |
| G11 | Choose location editing model and approve data source | Owner + developer | Phase 3 |

---

## 21. What we will not do

Without separate written approval:

- redesign the site or change the brand;
- replace the stack or migrate to a CMS;
- delete content, projects, testimonials or images;
- invent locations, addresses, coordinates, hours or services;
- publish regulatory or partnership claims without evidence;
- add paid services or subscriptions;
- change DNS, email or hosting;
- deploy to production;
- add trackers or marketing pixels;
- add Three.js/3D or a heavy motion system before Phase 2D and Phase 2E approval;
- rewrite history or force-push;
- modify the owner’s other projects or reference folders.

---

## 22. Immediate next step

1. Owner confirms access owners, monitored mailbox, booking model, tracker removal and content approver; the canonical host is `https://www.otodriveafrica.com/`.
2. Developer captures a full production backup, reconciles the live baseline into Git, creates staging and documents rollback.
3. Implement Phase 2A only on staging, including click and Enter-key form tests that arrive in the monitored inbox.
4. Plan Phase 2E separately after Phase 2D; do not start 3D or a full redesign before the performance and design gates.
5. No production change until the staging review and separate deployment approval.

---

**End of roadmap. No implementation has started.**
