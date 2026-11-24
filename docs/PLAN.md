# Rewrite plan

Planning slice started November 16, 2026. This is discovery and specification, not implementation or a deployment request.

## Confirmed decisions

- Preserve the existing clinic brand and content, improve navigation, responsive layout, and mobile usability. Flag questionable or outdated clinical content for practice review.
- Svelte, TypeScript, DaisyUI, prerendered public pages with client navigation, and Cloudflare Pages static hosting. See [ADR 0001](adr/0001-static-public-site.md).
- Plan a full searchable archive, with existing public routes retained or explicitly redirected. Inventory does not itself grant third-party reuse rights.
- Plan structured staff content editing and preview in Sanity ([ADR 0002](adr/0002-sanity-cms.md)). One content editor publishes directly without a separate approval step; publishing triggers a Pages rebuild.
- Appointments link to the external booking provider. Prescription requests and the skin allergy questionnaire launch as live forms delivered by a Pages Function ([ADR 0003](adr/0003-live-request-forms.md)); they remain labeled non-submitting previews until that work is approved. Patient records and operational staff task tracking are outside the release.
- Analytics should address page popularity, sources, devices, performance, and a second layer of appointment/refill/pharmacy CTA clicks. A click does not prove completion.
- Use InteleFiler as the coding/commenting reference; the adapted conventions are in [CODING-STANDARDS.md](CODING-STANDARDS.md).
- Promotions default to a homepage banner/card. An automatic popup is not the default placement. No automatic expiry: the content editor unpublishes a banner, which triggers a rebuild.
- Hosting: Cloudflare Pages under the developer's own Cloudflare account; the clinic points DNS for itchypetvet.com at it during cutover.
- Phase 1 reaches content, route, and function parity with the current site in the new responsive layout. Phase 2 is cleanup (copy, clinical review, findability), not a redesign.
- Tickets live as Markdown files in `docs/tickets/`, one per feature slice (content model, page, migration, redirects, acceptance criteria), numbered by stage with dependencies.
- Archive: capture all 83 news and 57 FAQ records (`discovery/2026-11-23/archive-urls.json`) and publish them all at launch. The user accepted this, including the LifeLearn-syndicated articles, without a separate license check.
- URLs: clean new routes (for example `/news/<slug>`, `/faq/<slug>`) with permanent redirects from every inventory URL, served from a Pages `_redirects` file.
- CMS scope: the content editor manages all content records in the planned content model. Navigation menus and page layouts stay in code.
- Live forms send through Cloudflare's email sending binding to the clinic's verified inbox, with Cloudflare Turnstile for spam protection. No submissions are stored.
- No site preview in v1: the editor publishes in Sanity and the live site rebuilds within minutes.
- Recommend Cloudflare Web Analytics as the baseline and assess existing Matomo before adding GA4 for custom click reporting.

## Architecture proposal

SvelteKit with its static adapter is the proposed implementation vehicle for the confirmed Svelte stack. All public routes render HTML at build time; hydrated Svelte handles navigation and interactive search. Dynamic archive routes need explicit prerender entries. The static adapter supports this model ([official documentation](https://svelte.dev/docs/kit/adapter-static)). Cloudflare also documents SvelteKit deployment ([framework guide](https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-kit-site/)); select the static adapter and static build output rather than introducing request-time rendering by default.

Content pipeline: authenticated staff CMS → validated content export → build and preview → editor publishes → Pages production build. The exact preview/publish integration depends on CMS selection. Public pages receive static content, never editing credentials. Build failures keep the last known-good deployment; rollback should restore both content revision and matching site output.

No custom operational backend is necessary for the confirmed release. A CMS has its own authenticated content service. A future scheduling/refill integration may use an external portal or a server endpoint and must be designed separately.

## Planned content model

| Record | Core fields / behavior |
| --- | --- |
| Site settings | Practice name, logo, contact links, navigation, social destinations, default metadata |
| Location | Name, address, phone/fax/email, structured weekly hours, closures, directions URL, map; reused everywhere |
| Page / service | Stable slug, title, approved body blocks, metadata, hero asset, related resources |
| Team member | Name, credentials, role, active/retired status, bio, portrait, ordering |
| FAQ | Stable slug, question, answer, category, related content |
| News article | Stable slug, headline, publication date, body, source/credit, rights status, category |
| Video resource | Title, category/species, embed destination, transcript, thumbnail, credit |
| Testimonial | Quote, attribution, source, permission status, ordering |
| Gallery item | Image(s), caption, alt text, patient consent/reuse status, before/after pairing |
| Download | File, title, description, last review date, rights status |
| Promotion | Title, text, image/alt, CTA, draft/published state, optional start/expiry; default banner/card placement |
| Redirect | Old path, destination, permanent/temporary status and reason |

Staff editing should expose safe structured fields and a limited block set rather than arbitrary HTML. Location changes propagate to contact pages and footers. Archive search indexes content records; test titles, body matches, filters, no results, and keyboard navigation. The search index must contain only public content.

## Workflow previews

**Appointments:** retain a clear entry point, with no booking or transmission. Existing site points to GreatPetCare and legacy empty appointment content; document both and design one consistent preview destination. Future discovery must settle new vs existing patients, location/provider availability, confirmation ownership, cancellation, and portal integration.

**Prescriptions:** preserve the full discovered request model in planning, including medication vs allergy serum, new vs refill, pickup/pharmacy/shipping, quantity, contact information and condition changes. Rendered previews may be staged over steps for mobile. Future design must settle triage, eligibility, approval, payment, fulfillment and notifications.

**Skin allergy questionnaire:** preserve its separate purpose and conditional structure. Existing new-patient questionnaire mentioned in visit instructions is a different, unlinked workflow. Neither is silently implemented as a live form.

## Analytics proposal

The current source includes Matomo at `analytics.prosites.com`, site ID `17157`. Request practice access/history/export availability before deciding to replace or supplement it. Presence of a tracking snippet does not prove reporting is working or accessible.

| Option | Suitable role | Planning limit |
| --- | --- | --- |
| Cloudflare Web Analytics | Baseline page popularity, referrers, devices and performance | Do not assume it provides the desired custom CTA/conversion reporting |
| GA4 | Explicit custom click events and later funnel/campaign reporting | Additional implementation, configuration and privacy decisions |
| Existing Matomo | Potential historical baseline and possibly continued event reporting | Account access, contract/export and current data quality unverified |

Cloudflare documents page path, referrer and device dimensions ([dimensions](https://developers.cloudflare.com/web-analytics/data-metrics/dimensions/)) and automatic SPA navigation measurement ([SPA guidance](https://developers.cloudflare.com/web-analytics/get-started/web-analytics-spa/)). GA4 documents custom events and verification with Realtime/DebugView ([events guide](https://developers.google.com/analytics/devguides/collection/ga4/events)).

Recommendation pending provider decision: Cloudflare for baseline; choose one event-capable provider if CTA reports are required at launch. Avoid adding overlapping trackers without a defined report owner. Proposed allowlisted events: `appointment_cta_click`, `prescription_cta_click`, `pharmacy_outbound_click`, `phone_click`, `directions_click`, `handout_download`, `promotion_cta_click`. Parameters: public page path, control placement, location code, content ID. Exclude owner/pet identifiers, form values, free-text search terms and URL query strings. External portal outcomes remain unknown without an authorized integration. Preview interactions are never counted as completed requests.

## Implementation sequence and completion criteria

1. **Discovery:** archive linked public pages/assets, record failures, map feature families and discrepancies, extract brand evidence, and finish the design interview. Done when coverage limits and outstanding decisions are explicit.
2. **Foundation:** scaffold compatible pinned SvelteKit/TypeScript/Tailwind/DaisyUI versions, static output, formatting/type/lint scripts, theme, layouts, navigation, SEO metadata, and error page. Done when nested routes load directly on a Pages preview and the responsive shell is verified.
3. **Content migration:** ingest all archive records and core clinic content, optimize approved assets, preserve routes/redirects, implement full-text search and galleries/downloads/video surfaces. Done when every inventory route has an explicit outcome and archived record counts reconcile.
4. **Request forms:** build accessible prescription and questionnaire forms as previews first, then connect them to the Pages Function ([ADR 0003](adr/0003-live-request-forms.md)). Done when keyboard/mobile behavior works, previews send nothing, and live submissions reach the clinic's inbox with nothing stored.
5. **Editing and promotions:** select CMS, model records, implement authenticated staff editing, preview, publication and rollback. Done when a nondeveloper can edit hours, a bio and a promotion and see the correct public result without developer intervention.
6. **Analytics and launch readiness:** configure chosen reports, prove navigation/click counts, resolve clinic content discrepancies, test performance/accessibility and redirects, generate sitemap/robots, document cutover and rollback. Done when production release is authorized separately and the practice has signed off content.

## Decisions still open

- Sanity plan limits (free-tier quotas, asset storage), preview integration, account ownership and recovery.
- Banner dismissal behavior; settle in component design.
- Analytics provider for custom clicks, account/report ownership, reporting cadence, existing Matomo access.
- Exact treatment of empty legacy routes and duplicated paths; destination mapping requires content reconciliation.
- Original media access, clinical content review, authoritative location details, and the clinic inbox that receives form submissions.
- No date, budget, hosting account, domain cutover access, or release commitment has been supplied.

## Design tree checkpoint

| Branch | Settled for this planning slice | Dependent design work |
| --- | --- | --- |
| Public experience | Preserve brand/content; responsive Svelte/DaisyUI; prerender | Page layouts, accessible components and search implementation |
| Content coverage | Full searchable archive and explicit route outcomes | Recover missing archive via provider export and reconcile counts |
| Patient workflows | Appointments link out; prescription and questionnaire forms go live via a Pages Function | Recipient address, spam protection, clinic sign-off; patient portal stays future scope |
| Staff editing | Sanity; one direct publisher; publish triggers rebuild | Free-tier quotas, preview integration and recovery |
| Promotions | Banner/card default; optional start/expiry | Timezone, expiry behavior and optional extra placements |
| Analytics | Baseline plus CTA clicks; Cloudflare baseline; assess existing Matomo first | Account access and event provider/report ownership |
| Delivery | Static Cloudflare Pages; InteleFiler-derived standards | Scaffold, implementation verification and later launch authorization |

The discovery artifacts and confirmed decisions are recorded. The user confirmed the scope on November 19, 2026 and authorized the scaffold, theme, responsive navigation and initial homepage. Wayfinder review found this slice already defined; no decision map was needed. Vendor selection and private provider access are explicitly deferred work, not silently selected defaults.
