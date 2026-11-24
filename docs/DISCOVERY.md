# Current website discovery

Source: [itchypetvet.com](https://itchypetvet.com/). Discovery date: November 16, 2026. The [plan](PLAN.md) distinguishes confirmed requirements from implementation proposals. The [route inventory](ROUTE-INVENTORY.md) lists every captured URL, its title, response assessment and archived source.

## Coverage and evidence limits

The link crawl visited 120 public URL responses: **104 nonempty HTML responses and 16 empty responses**, plus two page requests returning 404. Counts include slash variants, aliases and legacy routes; they are not 120 unique editorial pages. The crawler exhausted its discovered same-host, query-free link queue below its 200-request ceiling. It did not submit forms or execute downloaded scripts. Browser inspection covered the homepage, automatic promotion popup, computed typography/colors, and mobile homepage/menu at 390 × 844. Interactive behavior on every page has not been tested.

16 advertised archive pagination URLs returned zero bytes despite HTTP success: news pages 2–12, Hospital FAQ page 2, and Veterinary Health Care FAQ pages 2–5. As a result, only first-page news and FAQ records were recoverable through those links. A full archive remains a confirmed requirement, with provider export/recovery required to establish its full size. Do not equate crawl completion with complete content recovery.

Two source-linked pages returned 404: `/author/vetderm/` and `/pet-health-resources/pet-health-checker/`. The public `wp-sitemap.xml` response contained an empty URL set. `robots.txt` advertises `sitemap.xml`; a verification request to it returned 403. Query routes (including search, category form submissions and accessibility mode), login-only portals, unlinked/orphaned pages and private provider content are not exhaustively captured.

Assets: 438 discovered requests, of which 200 returned nonempty usable responses of various types; 84 images and six PDFs are among these. 234 responses were empty and four failed. Approximately 18.8 MB of nonempty asset response data was saved, including source styles, scripts and embed HTML as evidence. See `discovery/2026-11-16/summary.json`, `failures.json`, `assets.json`, `pages.json` and `external-links.json`.

## Global navigation and shared surfaces

- Header: clinic logo/home, Home, New Patients, About Us, Services, Pet Health, Forms, and search. Desktop uses multilevel dropdowns; mobile uses an off-canvas menu.
- New Patients: What to Expect, Take a Tour, Why a Veterinary Dermatologist, Patient Handouts, external new-patient booking.
- About Us: Team, Locations & Hours, Contact Us, Before/After Photos, Testimonials and FAQs.
- Services: medical category, allergy testing, food allergy/intolerance, video otoscopy, anesthesia/monitoring category, flea prevention, tick prevention and cutaneous laser surgery. Additional service/category pages are reachable below these hubs.
- Pet Health: pharmacy, how-to videos, news, FAQs, insurance and links.
- Shared utilities: search/autocomplete source scripts, skip link, breadcrumbs, back-to-top, accessibility-mode plugin, print/email/social sharing, Facebook, two-location footer, map embeds and LifeLearn attribution.

## Feature and surface map

| Surface | Existing content / behavior | Rewrite treatment |
| --- | --- | --- |
| [Homepage](https://itchypetvet.com/) | Team-photo hero, main location/hours, booking/refill/pharmacy CTAs, specialty/services/new-client/team cards, Facebook and dermatologist cards | Responsive landing page with clear primary tasks and shared location records |
| Homepage promotion | Automatically opened illustrated Numelvi/Befrena flyer, backdrop and close control; public graphic hosted by LifeLearn | Staff-editable promotion; confirmed default is banner/card, optional dates |
| [New Patients](https://itchypetvet.com/new-clients/) / [What to Expect](https://itchypetvet.com/new-clients/what-to-expect/) | Visit expectations, records preparation, insurance/payment instructions, post-booking questionnaire description | Preserve approved copy and distinguish appointment request from confirmation |
| [Tour](https://itchypetvet.com/new-clients/take-a-tour/) | Facility photos | Accessible responsive gallery; captions and lightbox decision at component design |
| [Specialist rationale](https://itchypetvet.com/why-a-veterinary-dermatologist/) | Specialty education / reasons to seek referral | Preserve clinically reviewed content |
| [Patient handouts](https://itchypetvet.com/new-clients/patient-handouts/) | Six linked PDFs | Accessible download list with descriptive titles, file details and retained URLs/redirects |
| [About](https://itchypetvet.com/about-us/) | Practice overview and links | Shared content blocks |
| [Team](https://itchypetvet.com/about-us/team/) | Doctors, retired founder, resident, manager, technicians and client service staff; two linked doctor detail pages | Typed bios, portraits, roles and active/retired distinction; validate credentials |
| [Locations](https://itchypetvet.com/about-us/location/) | Two location links | Consistent location directory |
| [Main office](https://itchypetvet.com/locations/main-office/) / [Rockledge](https://itchypetvet.com/locations/rockledge-office/) | Address, phone/fax/email, hours, directions/maps and legacy appointment/refill links | Reuse authoritative location records; tap-to-call and map/directions links |
| [Patient photos](https://itchypetvet.com/our-patients-before-and-after/) | Before/after cases | Paired responsive images/captions and consent/reuse review |
| [Testimonials](https://itchypetvet.com/testimonials/) | Four entries and detail pages, including retired physician mentions | Preserve attribution and historical context |
| [Services](https://itchypetvet.com/services/) / [all services](https://itchypetvet.com/all-services/) | Category archives and individual specialty/preventive/anesthesia descriptions | Category and service templates; retain deep routes |
| [FAQs](https://itchypetvet.com/pet-health-resources/faqs/) | Hospital and Veterinary Health Care categories, individual answer pages, pagination | Searchable archive with preserved individual URLs; missing older records require export |
| [Video hub](https://itchypetvet.com/pet-health-resources/helpful-tips-video-clips/) | Two direct immunotherapy YouTube links, cat/dog category links | Responsive embeds/links with titles and transcripts where available |
| Cat/dog video archives | Six detail pages per species: pills, liquid medicine, ear drops, eye drops, eye ointment, tooth brushing; category chooser forms | Search/filter by species; preserve transcripts and provider credits |
| [News](https://itchypetvet.com/pet-health-resources/news-2/) | Dated syndicated articles, category chooser, links to 12 archive pages; eight article URLs captured | Full searchable migration planned; recover missing archive first |
| [Online pharmacy](https://itchypetvet.com/pet-health-resources/online-pharmacy/) | External Covetrus store; legacy VitusVet widget sources also found | Explicit external pharmacy link and click measurement |
| [Insurance](https://itchypetvet.com/pet-insurance-info/) | Third-party petinsuranceinfo.com comparison iframe | Preserve function if authorized/available; accessible outbound fallback |
| [Links](https://itchypetvet.com/links/) | Professional/education external destinations | Validate destinations and retain source attribution |
| [Forms](https://itchypetvet.com/forms/) | Prescription request and skin allergy questionnaire links | Workflow index with visible preview status |
| [Prescription form](https://itchypetvet.com/prescription-request-form/) | Gravity Forms fields/conditional choices; details below | Non-submitting mobile-friendly preview |
| [Skin allergy questionnaire](https://itchypetvet.com/skin-allergy-testing-questionnaire/) | Gravity Forms questionnaire; details below | Non-submitting preview distinct from new patient intake |
| Search | WordPress query/search overlay with autocomplete source references | Static full-text index over all migrated public records; no-results and keyboard states |
| Legacy/alias routes | Empty main content on old appointment/refill destinations, duplicated relative-link paths, older contact path and slash variants | Audit per route and approve retain/redirect/retire outcome before launch |

## Service records observed

Allergy testing; food allergy and intolerance; video otoscopy; flea prevention/control; tick prevention; cutaneous laser surgery; veterinary specialist referrals; dermatology/skin; endocrinology/hormones; patient monitoring; general anesthesia; local anesthesia. `/services/` is also counted by the crawler as the service hub. Source categories include Medical Services, Anesthesia and Patient Monitoring, Preventive Services, and Additional Services.

## Forms and external workflows

**Appointments:** navigation and homepage point to `account.greatpetcare.com` with a clinic identifier. Some location CTAs point to `/forms/make-an-appointment-2/`, whose fetched main content is empty. Legacy VitusVet appointment/widget/refill URLs are referenced elsewhere in source. Presence of a link or widget is not evidence of an operational integration. No portal sign-in or booking was attempted.

**Prescriptions:** owner/pet/contact details, refill vs new prescription, regular medication vs allergy serum, medication/quantity, pickup at Maitland/Rockledge, online/local pharmacy, shipping, condition changes, syringe trays and sharps container choices. Source turnaround is 24–48 business hours for regular medication and 7–10 business days for allergy serum, with $18/$60 shipping and payment link before shipment. These are existing claims requiring practice confirmation, not new product promises. Preserve source field/conditional metadata for implementation; raw HTML and parsed form attributes are archived.

**Skin allergy questionnaire:** owner/pet/date, indoor/outdoor symptoms, seasons, grasses/trees/mold and other exposures, other animals, furnishings and injectable/sublingual preferences. Parsed form controls include hidden platform fields and individual checkbox choices, so raw control count is not the count of business questions. New patient questionnaire delivery after booking is described in What to Expect; its actual form is not publicly linked there.

**External systems:** GreatPetCare booking, Covetrus pharmacy, legacy VitusVet widgets, Google Maps, YouTube/video media, Facebook, petinsuranceinfo.com, LifeLearn content/hosting, ShareThis, Google Fonts and Matomo/ProSites analytics. Inventory outgoing destinations in `external-links.json`; do not migrate provider scripts wholesale.

## Downloads recovered

Why Does My Pet Itch; Intradermal Allergy Testing; Cutaneous Adverse Food Reaction; Atopic Dermatitis; Flea Allergy Dermatitis (filename `bio.pdf`); Treatment Options for Environmental Allergies in Pets. This slice captured files and source labels; it did not clinically review or visually audit each PDF.

## Content and usability issues

| Observation | Required resolution |
| --- | --- |
| Rockledge detail Wed/Thu hours say 8–4:30; footer says 8–3:30 | Practice supplies one authoritative schedule |
| Rockledge street spelling varies between Schenk/Schenck | Confirm address, then use one record |
| What to Expect contains `info.vetdermcenter.com` | Confirm intended email address |
| Dani Temple homepage card links to homepage | Determine whether a biography route is intended |
| Legacy booking/refill CTAs and duplicate nested relative paths | Map every source route explicitly |
| Main content absent on legacy routes; 16 archive pagination responses empty | Recover archive/provider export; decide legacy destinations |
| Viewport disables user zoom | Permit zoom in replacement |
| Existing mobile layout stacks content, but hero precedes primary tasks and sharing/accessibility overlays occupy space | Prioritize key tasks and verify overlays, scrolling and keyboard focus |
| White on brand teal has insufficient contrast for normal text | Preserve teal with accessible foreground/background pairings |
| Automatic promotion popup observed | Replace default placement with confirmed banner/card approach |
| Analytics snippet already present (Matomo `analytics.prosites.com`, site 17157) | Establish practice access and reporting/history before adding providers |
| Syndicated text/video, patient images and photographer assets | Obtain reuse rights/source export and practice clinical/content review |

## Archive recovery update — November 23, 2026

The empty pagination responses were bot protection, not missing content: automated requests receive HTTP 202 with an empty body, while a real browser session receives full pages. Browser enumeration found 83 news article URLs and 57 FAQ URLs (16 hospital, 41 veterinary health care), recorded in `discovery/2026-11-23/archive-urls.json`. Article bodies are not yet captured. No provider export is required to enumerate the archive.

## Next evidence needed

Current provider export for all older news/FAQ records and media (including inaccessible derivatives/originals), practice ownership/reuse confirmation, approved location details, and access to existing analytics reports. CMS/vendor, deployment accounts and actual integration choices belong to subsequent design slices. The public crawl cannot establish private operational behavior or historical report completeness.
