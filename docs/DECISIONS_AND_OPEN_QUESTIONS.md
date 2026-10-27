# Otodrive Website — Decisions and Open Questions

**Phase:** 1 — Discovery and audit  
**Date:** 27 October 2026  
**Status:** Awaiting owner decisions  
**Production changes made:** None  
**Companion documents:** `PROJECT_AUDIT.md`, `CONTENT_AND_ASSET_INVENTORY.md`, `MODERNIZATION_ROADMAP.md`, `LOCATIONS_INTEGRATION_PLAN.md`, `ONLINE_PRESENCE_PLAN.md`

---

## 1. Purpose

This document separates:

- **decisions already fixed by the engagement brief;**
- **technical decisions proposed for approval;**
- **assumptions that must be confirmed;**
- **open questions that block specific phases;**
- **facts that require documentary verification.**

It is the owner’s review sheet. Answers can be written inline or returned in a meeting; the developer will update this document and the roadmap accordingly.

---

## 2. How to respond

For each open question:

- choose an option, or
- write “unknown” and accept the documented default, or
- write “defer” and name the phase where it will be decided.

**Do not guess business facts.** “Unknown” is a valid answer. Publishing an unverified address, hour or regulatory claim is worse than leaving it out.

---

## 3. Decision log

Status key: **Fixed** = set by the engagement brief; **Proposed** = recommended, awaiting approval; **Pending** = owner input required; **Deferred** = intentionally later.

| ID | Decision | Status | Rationale / consequence |
|----|----------|--------|--------------------------|
| D-001 | Phase 1 is audit and documentation only; no implementation | Fixed | Prevents unapproved changes. |
| D-002 | The live site is the authoritative description of current behaviour | Fixed | Repository is stale; live has booking, EmailJS, metadata. |
| D-003 | The repository will be reconciled from the live baseline before code changes | Proposed | Otherwise fixes may be lost or overwritten. |
| D-004 | Phase 1 documents live in `docs/` | Fixed | No existing documentation location. |
| D-005 | Existing content, images, videos, logos, colours, links and behaviour are preserved unless explicitly approved | Fixed | Avoids collateral damage and preserves brand. |
| D-006 | No locations, addresses, coordinates, hours, phones, services or business facts are invented | Fixed | Accuracy and consumer-protection risk. |
| D-007 | No production deployment, DNS change, paid service or secret exposure without separate approval | Fixed | Safety and cost control. |
| D-008 | Work proceeds in small phases with Git checkpoints and review gates | Fixed | Reviewability and rollback. |
| D-009 | Static-first architecture; no framework/CMS migration now | Proposed | A site this size does not justify a replatform; solve content and reliability first. |
| D-010 | Accessibility target is WCAG 2.2 Level AA | Proposed | Industry baseline; reduces legal and usability risk. |
| D-011 | One form transport only (EmailJS or server-side), not both | Proposed | Current competing handlers lose enquiries. |
| D-012 | Map default for individual location pages is Google Maps Embed, consent-gated; a searchable locator needs separate approval | Proposed | Free, familiar, already used; seven eager embeds are not appropriate. |
| D-013 | Booking must not claim real-time availability until backed by verified data | Proposed | Current grid marks every slot available. |
| D-014 | Placeholder analytics must be removed; no new trackers until consent is implemented | Proposed | Current data is meaningless and privacy compliance is incomplete. |
| D-015 | Privacy notice and consent are required before expanding data collection | Proposed | Kenya Data Protection Act 2019. |
| D-016 | No paid mapping, analytics or booking service without owner approval | Fixed | Budget control. |
| D-017 | Production changes require a separate written go-ahead after staging review | Fixed | Safety. |
| D-018 | Live site and assets will be backed up before any change | Proposed | No documented backup exists. |
| D-019 | Canonical public host is `https://www.otodriveafrica.com/` | Fixed | Owner confirmed 27 October 2026. `otodrive.co.ke` remains a legacy email domain and must not be used as canonical until hosted and redirected. |
| D-020 | The booking API will be documented or replaced, not trusted blindly | Proposed | No repository/schema/retention information. |
| D-021 | Testimonials and project photos require consent before reuse | Proposed | Consent status unknown. |
| D-022 | The blog link will be fixed, redirected or removed; it will not be left as a 404 | Pending | Linked site-wide. |
| D-023 | EmailJS allowed origins and quotas will be reviewed before launch | Proposed | Public key is expected, but abuse settings are unknown. |
| D-024 | No AI-generated-looking code, comments or watermarks | Fixed | Code quality and maintainability. |
| D-025 | No crawler-policy or chatbot change during Phase 1 | Fixed | The site has no `robots.txt`; policy needs owner approval. |
| D-026 | Publish an explicit `robots.txt` and sitemap, with a stated AI training policy | Proposed | No crawler directives exist today; visibility and training are separate choices. |
| D-027 | Do not deploy an AI chatbot until verified content, privacy and human handoff are ready | Proposed | The site cannot yet answer location, hours, price or availability questions safely. |
| D-028 | Social preview images must be approved, absolute HTTPS assets | Proposed | Current image is relative, contains a space and is not a purpose-built preview. |
| D-029 | Otodrive conversion and Autogas LPG fueling are distinct service types assigned per site | Fixed | Owner brief; prevents implying every Petrocity site offers both. |
| D-030 | Jomvu and Jomvu Yard are separate sites and must not share pins or service labels | Fixed | Owner brief; Jomvu is LPG fueling, Jomvu Yard is conversion. |
| D-031 | Locations will be stored in one structured data file and rendered at build time, not hard-coded across HTML pages | Proposed | Single source of truth; generated pages, cards, JSON-LD and sitemap. |
| D-032 | No CMS, database or location SaaS until the owner defines who edits locations and how often | Proposed | Avoids adding a workflow the owner will not maintain. |
| D-033 | Premium design discovery is Phase 2E, after Phase 2D performance; Three.js is optional and gate-controlled | Proposed | A premium feel comes from art direction and performance, not animation weight. |
| D-034 | No new paid subscriptions; use existing hosting, Microsoft 365 and free/open-source components | Fixed | $0 implementation constraint; free-tier limits and renewals must be documented. |
| D-035 | Premium direction is light-mode “Daylight / Molten”; C.O.R.E dark mode is reference only | Proposed | Light canvas suits Otodrive photography; avoids a dark SaaS clone. |
| D-036 | Locations are a list-first network product with per-site pages and separate service labels | Proposed | Not one generic map; conversion and LPG fueling stay distinct. |

---

## 4. Assumptions

Assumptions are working beliefs, not facts. Each must be confirmed or corrected.

| ID | Assumption | Confidence | If wrong |
|----|------------|------------|----------|
| A-01 | The owner lists seven Otodrive/Autogas service points; only Mavoko is currently published | Medium | A multi-site data model and locator scope are required; verify each record. |
| A-02 | The Mavoko Otodrive map pin is close to the customer entrance | Low | Directions may mislead; the Otodrive and Petrocity pins are about 114 m apart. Verify before publishing. |
| A-03 | The phone number is current and answered by Otodrive | Medium | Contact journeys fail; verify. |
| A-04 | `info@otodrive.co.ke` is monitored | Low | Form/email enquiries may be missed; MX exists, but verify the mailbox. |
| A-05 | The owner controls the domain(s), hosting and DNS | Medium | Changes may require a third party. |
| A-06 | The owner controls or can access the EmailJS account | Low | Form transport may need replacement. |
| A-07 | The booking API belongs to Otodrive or a contractor acting for Otodrive | Low | Third-party dependency and data risk. |
| A-08 | The booking API can support real availability and double-booking protection | Unknown | May need replacement or request-only booking. |
| A-09 | The site is English-only and serves Kenya | High | Localisation/currency changes needed. |
| A-10 | The audience is primarily Kenyan mobile users, often on constrained data | Medium | Performance priorities could differ. |
| A-11 | The owner can supply verified business facts within the Phase 3 window | Medium | Phase 3 slips; Phase 2 can proceed. |
| A-12 | There is no hidden CMS, database or admin panel | Medium | Architecture and backup scope change. |
| A-13 | The repository is not auto-deployed to production | Medium | A push could overwrite live changes. |
| A-14 | The analytics accounts, if any, are not configured with real IDs | High | If real IDs exist, data may be partially available. |
| A-15 | The current year for copyright is 2026 | High | Trivial to change. |
| A-16 | All regulatory/partnership claims are current and can be evidenced | Unknown | Copy may need softening or removal. |
| A-17 | The owner wants to keep the existing brand look | Medium | A visual redesign would change scope substantially. |
| A-18 | No legal deadline or regulatory audit is imminent | Unknown | Prioritisation could change. |

---

## 5. Blocking questions for Phase 2A

These must be answered before stabilisation begins.

| ID | Question | Why it blocks | Options | Default if unanswered |
|----|----------|---------------|---------|-----------------------|
| B-01 | Canonical domain — confirmed as `https://www.otodriveafrica.com/` | Canonical, redirects and TLS depend on it | Resolved: use the working `www.otodriveafrica.com` host | Implement redirects once hosting access is available. |
| B-02 | Who controls DNS and hosting, and can they provide access or make changes? | No safe deployment without it | Owner; agency; host support | Pause. |
| B-03 | Should forms use EmailJS or a server-side endpoint? | Determines implementation, cost, privacy | A) EmailJS hardened; B) server-side; C) hosted form service | Pause; do not leave both. |
| B-04 | Who owns the EmailJS account, and are allowed origins/quotas configured? | Abuse and deliverability risk | Owner; developer; unknown | Treat as compromised until verified. |
| B-05 | Which inbox receives contact/quote messages, and who monitors it? | Delivery cannot be verified otherwise | Named mailbox | Pause testing. |
| B-06 | Is `send_email.php` intentionally removed, or should it be restored? | Legacy handler conflict | Remove permanently; restore securely | Remove references. |
| B-07 | Is the booking API owned by Otodrive? | Data/security/continuity | Yes; contractor; unknown | Disable real-time booking claims. |
| B-08 | Should `attention.js` notification prompts remain? | Privacy/trust | Remove; consent-based; keep | Remove. |
| B-09 | Who is the privacy contact for data requests? | Required for forms/privacy notice | Name/email | Use `info@` temporarily. |
| B-10 | Is there a deployment window and a rollback owner? | Production safety | Named window/owner | No deployment. |

---

## 6. Business identity and domain

| ID | Question | Why it matters | Default |
|----|----------|----------------|---------|
| Q-01 | What is the official brand casing: Otodrive, OtoDrive or OTODRIVE? | Consistency across logo, copy, schema | Use “Otodrive” in prose, “OTODRIVE” in logo. |
| Q-02 | What is the registered legal entity name? | Invoices, privacy notice, schema | Omit until provided. |
| Q-03 | Which domain should customers see and search engines index? | Canonical/SEO | `https://www.otodriveafrica.com/` — confirmed. |
| Q-04 | Should `otodrive.co.ke` be renewed/connected, or retired? | Legacy canonical; brand email | Keep as the email domain for now; do not use as canonical until hosted and redirected. |
| Q-05 | Is `otodriveafrica.com` the long-term brand or a temporary host? | Migration risk | Canonical public host confirmed 27 October 2026. |
| Q-06 | Are there other domains, subdomains or old sites? | Duplicate content/redirects | Audit later. |
| Q-07 | Which social handles are official? | Schema/links | Use visible links until confirmed. |
| Q-08 | Is the LinkedIn profile active? | Currently `#` | Remove or supply URL. |
| Q-09 | Is the developer credit required? | Footer legal/contractual | Keep until confirmed. |
| Q-10 | What is the preferred contact method and response-time promise? | UX and trust | Phone during business hours. |

---

## 7. Locations, address and hours

The full checklist is in `docs/LOCATIONS_INTEGRATION_PLAN.md` section 13. The highest-priority questions are:

| ID | Question | Why it matters | Default |
|----|----------|----------------|---------|
| Q-11 | How many customer-facing locations exist today? | Single vs locator architecture | Seven owner-listed service points; verify each and whether any additional sites exist. |
| Q-12 | What is the exact street address, building/plot and landmarks for each site? | Directions and local SEO | Do not publish. |
| Q-13 | Which county and postcode apply to each site? | Current JSON-LD says Nairobi; Mavoko is in Machakos | Do not publish county/postcode until verified per site. |
| Q-14 | What postal code, if any, applies to each site? | Current `00100` is a Nairobi GPO code | Omit. |
| Q-15 | Are the coordinates the customer entrance for each site? | Wrong pin misleads customers | Do not publish geo. |
| Q-16 | What are the real opening hours for refuelling, conversion and service at each site? | 24/7 claim conflicts with booking | Publish “call to confirm” only. |
| Q-17 | Does “24/7” apply to any service? Which? | Marketing/accuracy | Remove 24/7 claim. |
| Q-18 | What is the holiday policy? | Booking and “open now” | Closed on public holidays. |
| Q-19 | Is the phone number the location line? | Contact accuracy | Keep current number. |
| Q-20 | Is WhatsApp used for enquiries? | Mobile UX | No WhatsApp link until confirmed. |
| Q-21 | Is each site walk-in or appointment-only? | Booking design | Appointment recommended. |
| Q-22 | What services are available at each site? | Service cards vs reality | Use the four published services; assign Otodrive conversion and Autogas LPG separately. |
| Q-23 | Is parking available? | Visit planning | Omit. |
| Q-24 | Is the site step-free/accessible? | Accessibility statement | Omit. |
| Q-25 | Are more locations planned beyond the seven owner-listed sites in the next 12 months? | Whether to build a locator | No. |
| Q-26 | Who maintains hours/holiday updates? | Data freshness | Owner. |
| Q-27 | Which Google Business Profiles are official, and who owns each? | NAP/SEO consistency | Unknown. |
| Q-28 | Can each official Google Business Profile be linked and its Place ID shared? | Map accuracy | Use current embed only. |
| Q-29 | Are customer photos permitted? | Marketing/consent | Do not add new photos. |
| Q-30 | What should customers bring for a conversion/inspection? | Reduces friction | Omit until provided. |

---

## 8. Booking

| ID | Question | Why it matters | Default |
|----|----------|----------------|---------|
| Q-31 | Is real-time availability required, or is a request-and-confirm flow acceptable? | Architecture and cost | Request-and-confirm. |
| Q-32 | Who owns the booking API and its repository? | Maintainability/security | Disable real-time claims. |
| Q-33 | What data does the API store, where, and for how long? | Privacy compliance | Do not collect until documented. |
| Q-34 | How does the API prevent double booking? | Customer trust | Assume it does not; add protection. |
| Q-35 | Does it send confirmation emails/calendar invites? | Current success message claims yes | Do not claim until verified. |
| Q-36 | What is the cancellation/rescheduling policy? | Consumer expectations | Publish “contact us”. |
| Q-37 | What is the no-show policy? | Operations | Omit. |
| Q-38 | What is the lead time and cut-off? | Slot generation | 24 hours / same-day cut-off. |
| Q-39 | Are slots per service or per workshop bay? | Capacity model | Per service. |
| Q-40 | What happens when the API is down? | Fallback | Show phone/email and retry. |
| Q-41 | Should booking be available for LPG refuelling? | Refuelling may be walk-in | No, unless owner confirms. |
| Q-42 | Should the booking page show the location? | Current page has no address | Yes, once verified. |
| Q-43 | Is a deposit/payment required? | Scope | No. |
| Q-44 | Who monitors bookings? | Operations | Owner/staff. |

---

## 9. Forms, email and spam

| ID | Question | Why it matters | Default |
|----|----------|----------------|---------|
| Q-45 | Which fields are genuinely required? | Conversion vs data minimisation | Name, phone, email, message. |
| Q-46 | Should the quote form ask for vehicle, service, budget or timeline? | Better leads vs friction | Add vehicle/service only. |
| Q-47 | What spam protection is acceptable? | CAPTCHA hurts conversion | Honeypot + rate limit first; CAPTCHA fallback. |
| Q-48 | What should the success message promise? | Managing expectations | “We will respond within one business day.” |
| Q-49 | What should the error message say? | Trust | “Not sent — call or email us.” |
| Q-50 | Is there a CRM or spreadsheet for leads? | Follow-up | Email inbox only. |
| Q-51 | Who is responsible for follow-up? | Revenue | Owner. |
| Q-52 | Is email deliverability configured (SPF/DKIM/DMARC)? | Emails may spam-folder | Verify before launch. |
| Q-53 | Should the newsletter be real or removed? | Current field is non-functional | Remove or implement later. |
| Q-54 | Is there a consent checkbox requirement? | Privacy | Yes for marketing; legitimate interest for enquiries. |

---

## 10. Content, projects and testimonials

| ID | Question | Why it matters | Default |
|----|----------|----------------|---------|
| Q-55 | Which six project placeholders can be replaced with real projects? | Credibility | Remove or hide until supplied. |
| Q-56 | Can we publish vehicle registration/plate numbers? | Privacy | No; use make/model only. |
| Q-57 | Do we have written consent for each testimonial? | Legal/ethical | Keep only if consent can be shown. |
| Q-58 | Which Ahmed R. location is correct: Kitengela or Eldoret? | Consistency | Use “Kenya” until confirmed. |
| Q-59 | Are the testimonial names real? | Authenticity | Keep but flag. |
| Q-60 | Can we substantiate “up to 40% savings”? | Consumer claim | Soften to “can save” with conditions. |
| Q-61 | Can we substantiate “among the largest LPG marketers”? | Reputational | Remove or evidence. |
| Q-62 | Are Westport Fuels and LPGTech current partners? | Commercial claim | Remove names if unverified. |
| Q-63 | Can we publish the KEBS licence number/scope? | Regulatory trust | Publish only if approved. |
| Q-64 | Are EPRA/NEMA claims current? | Regulatory | Remove if unverified. |
| Q-65 | What is the warranty wording and duration? | Consumer expectation | Remove “with warrant” until defined. |
| Q-66 | Should the blog be built, redirected or removed? | 404 site-wide | Remove links first. |
| Q-67 | Who writes/approves future content? | Workflow | Owner. |
| Q-68 | Is there a brand style guide? | Consistency | Use current palette/typography. |
| Q-69 | Are there higher-resolution logo/photos? | Quality | Use current assets. |
| Q-70 | Is the 2024 copyright intentional? | Trust | Update to 2026. |

---

## 11. Privacy, analytics and legal

| ID | Question | Why it matters | Default |
|----|----------|----------------|---------|
| Q-71 | Does Otodrive have a privacy policy or DPA registration? | Compliance | Assume no; draft one. |
| Q-72 | Who is the data protection contact? | Data-subject requests | `info@` temporarily. |
| Q-73 | What is the retention period for enquiries/bookings? | Compliance | 12 months, then review. |
| Q-74 | Are analytics required? Which questions should they answer? | Measurement | Minimal, consent-gated. |
| Q-75 | Which analytics tool is approved? | Cost/privacy | GA4 if any. |
| Q-76 | Is marketing consent needed for the newsletter? | Compliance | Yes. |
| Q-77 | Should the map load only after consent? | Privacy vs friction | Yes. |
| Q-78 | Is a cookie banner required? | Legal | Yes if non-essential trackers are used. |
| Q-79 | Is legal review available? | Risk | Owner to confirm. |
| Q-80 | Are there industry-specific advertising rules? | Compliance | Confirm with adviser. |

---

## 12. Technical and operational

| ID | Question | Why it matters | Default |
|----|----------|----------------|---------|
| Q-81 | Who has hosting/DNS/EmailJS/Render access? | Execution | Pause. |
| Q-82 | Is there a staging environment? | Safe testing | Create password-protected staging. |
| Q-83 | How is the site deployed today (FTP, Git, panel)? | Release process | Document before change. |
| Q-84 | Is PHP available/used on the host? | Legacy handler | Assume no; remove. |
| Q-85 | Can the host set security/compression/cache headers? | Performance/security | Confirm; use `.htaccess` if Apache. |
| Q-86 | Is there a CDN or WAF? | Performance/security | None assumed. |
| Q-87 | Who monitors uptime/errors? | Operations | None; add later. |
| Q-88 | Is there a backup schedule? | Recovery | None; create. |
| Q-89 | What is the acceptable downtime window? | Scheduling | Low-traffic evening. |
| Q-90 | Are there other integrations (CRM, payments, WhatsApp)? | Scope | None. |
| Q-91 | Should the site remain static HTML? | Architecture | Yes for now. |
| Q-92 | Is there a domain email setup (MX, SPF, DKIM, DMARC)? | Deliverability | MX and SPF exist for `otodrive.co.ke`; no DMARC record observed; DKIM not verified. |
| Q-93 | What browsers/devices matter most? | Testing | Chrome/Android, Safari/iOS. |
| Q-94 | Are there analytics/SEO accounts to preserve? | Migration | Assume none. |
| Q-95 | What is the budget for paid services? | Mapping/booking/analytics | $0 until approved. |
| Q-101 | Which AI crawler policy should apply: allow search/citation only, allow all, or block all? | Training and visibility are separate decisions | Allow search/citation bots; defer training policy. |
| Q-102 | Who owns Google Search Console and Bing Webmaster Tools? | Verification, sitemap submission and monitoring | Owner or developer with owner access. |
| Q-103 | Is an AI chatbot wanted now, later, or not at all? | Scope, cost, privacy and maintenance | No now; revisit after verified FAQ content. |
| Q-104 | Which approved image and wording should be used for social previews? | Brand and share appearance | Use an owner-approved 1200×630 asset; do not improvise. |
| Q-105 | Who will add or edit locations, and is a CMS/admin UI required? | Content workflow, cost and maintenance | Developer/confident editor updates the structured file and build; add a CMS only if approved. |
| Q-106 | Should the site use a Git-based CMS, headless CMS, database or no CMS? | Architecture and ownership | No CMS initially; structured file plus build-time generation. |
| Q-107 | Which premium visual direction and references should guide Phase 2E? | Brand direction and scope | Use current brand; C.O.R.E as inspiration only; no 3D default. |
| Q-108 | Is Three.js actually required, and what static/reduced-motion fallback will be accepted? | Performance, accessibility and maintenance | No; prove a 2D hero first, then decide. |
| Q-109 | Is SMTP AUTH available on the Microsoft 365/Exchange tenant, and which mailbox sends/receives form mail? | Form transport and deliverability | Use the existing monitored mailbox if the host supports outbound SMTP; otherwise use a free EmailJS tier with documented quota. |
| Q-110 | Can staging be created on the existing hosting at no extra cost? | Safe local/staging review | Use local preview only until a $0 staging path is confirmed. |
| Q-111 | Is the light-mode “Daylight / Molten” direction approved? | Visual direction and prototype scope | Proceed with the light prototype; no dark SaaS clone. |
| Q-112 | Should the locations index be list-first or include a searchable map? | UX, cost and performance | List-first; per-site consent-gated embeds only. |

---

## 13. Budget and timeline

| ID | Question | Why it matters | Default |
|----|----------|----------------|---------|
| Q-96 | Is there a budget for mapping/booking/analytics? | Provider choice | $0; use free tiers. |
| Q-97 | Is there a target launch/completion date? | Sequencing | No fixed date. |
| Q-98 | Who approves invoices/paid services? | Procurement | Owner. |
| Q-99 | Is ongoing maintenance funded? | Sustainability | Ad hoc. |
| Q-100 | What does success look like in 90 days? | Prioritisation | Working forms + booking + accessibility. |

---

## 14. Fact verification status

Use this table to track evidence. “Verified” requires a document, a dated screenshot from the owner, or a primary source—not a website claim.

| Fact | Current published value | Evidence held | Status | Owner |
|------|-------------------------|---------------|--------|-------|
| Legal entity name | Not published | None | Unknown | |
| Trading name | Otodrive | Website | Unverified | |
| Phone | +254 704 644 909 | Website | Unverified | |
| Email | info@otodrive.co.ke | Website | Unverified | |
| Address | Mavoko, Nairobi, 00100 | JSON-LD | Unverified/inconsistent | |
| Coordinates | -1.4297154, 36.9601985 | JSON-LD/embed | Unverified | |
| Opening hours | 24/7 | Meta/JSON-LD | Conflict | |
| Booking hours | Mon–Fri 08:00–17:00; Sat 08:00–12:00 | `booking.js` | Coded, unverified | |
| Services | Four services | Services page | Unverified | |
| Service points | Seven owner-listed sites | Owner brief, 27 Oct 2026 | Owner-provided, unverified | |
| Service split | Thika/Mavoko both; Kangundo/Rongai/Shanzu/Jomvu LPG only; Jomvu Yard conversion only | Owner brief | Owner-provided, unverified | |
| Jomvu vs Jomvu Yard | Separate sites | Owner brief plus Google listings and owner-supplied map link | Owner-confirmed landmark; exact gate/entrance unverified | |
| Site coordinates | Seven provisional research references | Google/OSM, locations plan §12.9 | Unverified; do not publish | |
| KEBS licence | Licensed | About/services | No evidence | |
| EPRA compliance | Conforms | About | No evidence | |
| NEMA compliance | Conforms | About | No evidence | |
| Westport Fuels | Partner | About/services | No evidence | |
| LPGTech | Partner | About/services | No evidence | |
| 40% savings | Up to 40% | Homepage/services | No evidence | |
| Largest marketer | Among largest | About | No evidence | |
| Warranty | “with warrant” | Hero | Vague | |
| Testimonials | Six named quotes | Site | Consent unknown | |
| Project photos | Nine cards | Site | Consent unknown | |
| Social handles | Multiple variants | Site | Inconsistent | |
| Booking API owner | Otodrive-booking-api.onrender.com | Public URL | Unknown | |
| EmailJS owner | Public key | Site | Unknown | |
| Analytics IDs | Placeholders | Site | Invalid | |

---

## 15. Residual risks the owner must accept or mitigate

| Risk | If accepted | Mitigation if not |
|------|-------------|-------------------|
| Forms may lose enquiries until Phase 2A | Revenue loss | Approve Phase 2A immediately. |
| Booking may accept unavailable slots | Customer frustration | Disable booking or label as request-only. |
| Incorrect address/pin | Lost customers | Verify before publishing. |
| 24/7 claim is false | Trust/consumer issue | Remove claim until verified. |
| Trackers load without consent | Regulatory risk | Remove or gate. |
| 47 MiB video on mobile | Bounce/abandonment | Replace in Phase 2D. |
| Repo/live divergence | Lost work | Reconcile baseline. |
| No backup | Catastrophic loss | Back up before changes. |
| EmailJS abuse | Cost/reputation | Restrict origins/quotas. |
| Booking API outage | Lost bookings | Fallback contact route. |

---

## 16. Sign-off

### Phase 1 review

| Item | Decision | Name | Date |
|------|----------|------|------|
| Audit accepted | ☐ Yes ☐ No ☐ Changes requested | | |
| Roadmap accepted | ☐ Yes ☐ No ☐ Changes requested | | |
| Locations plan accepted | ☐ Yes ☐ No ☐ Changes requested | | |
| Next phase approved | ☐ 2A ☐ 2B ☐ Other: ______ | | |
| Canonical domain | Confirmed: `https://www.otodriveafrica.com/` | | |
| Form transport | ☐ EmailJS ☐ Server-side ☐ Other: ______ | | |
| Booking model | ☐ Real-time ☐ Request-only ☐ Disable | | |
| Location scope | ☐ Seven owner-listed sites ☐ Subset ☐ Other: ______ | | |
| Service split | ☐ Thika/Mavoko both; others as listed ☐ Changes: ______ | | |
| Location editing model | ☐ Structured file + build ☐ Git CMS ☐ Headless CMS ☐ Database/API ☐ Other: ______ | | |
| Premium design direction | ☐ Light “Daylight / Molten” ☐ Other: ______ | | |
| Locations UX | ☐ List-first ☐ Searchable map ☐ Other: ______ | | |
| Three.js / 3D | ☐ No default ☐ Prototype only ☐ Approved after performance gate | | |
| Zero-cost constraint | ☐ Acknowledged: no new paid subscriptions | | |
| Map provider | ☐ Google Embed ☐ Google JS ☐ MapTiler/MapLibre ☐ Other: ______ | | |
| AI crawler policy | ☐ Search/citation only ☐ Allow all ☐ Block all ☐ Defer | | |
| AI chatbot | ☐ No now ☐ Pilot later ☐ Other: ______ | | |
| Production deployment approved | ☐ No (default) ☐ Yes, after staging review | | |

### Owner comments

```text
[Write comments here]
```

---

## 17. Next step

1. Owner reviews this document with `PROJECT_AUDIT.md`, `MODERNIZATION_ROADMAP.md` and `ONLINE_PRESENCE_PLAN.md`.
2. Owner answers the Phase 2A blocking questions (B-01 to B-10) and the search-visibility decisions in `ONLINE_PRESENCE_PLAN.md`.
3. Developer updates the decision log and produces a detailed Phase 2A implementation plan.
4. No code or production change until that plan is approved.

---

## 18. Related documents

- `docs/PROJECT_AUDIT.md`
- `docs/CONTENT_AND_ASSET_INVENTORY.md`
- `docs/MODERNIZATION_ROADMAP.md`
- `docs/LOCATIONS_INTEGRATION_PLAN.md`
- `docs/ONLINE_PRESENCE_PLAN.md`

---

**End of decisions log. Awaiting owner review.**
