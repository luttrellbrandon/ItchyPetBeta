# Tickets

Written November 23, 2026 from [PLAN.md](../PLAN.md), [DISCOVERY.md](../DISCOVERY.md), [ROUTE-MAP.md](../ROUTE-MAP.md) and the ADRs. Each file is one feature slice. A slice owns its content model, Sanity schema, page, migrated content, redirects and tests, so it can ship on its own.

**Phase 1** (stages 0–4) matches itchypetvet.com page for page and function for function, in the new responsive layout. **Phase 2** (stage 5) is cleanup.

## Definition of done (every ticket)

- `npm run check`, `npm run build`, `npm run format:check` and the tests from T-002 pass.
- Every source URL this ticket owns in ROUTE-MAP.md resolves, either to its page or through a 301 redirect, and the T-004 coverage check passes.
- From T-003 onward, content comes from Sanity and is validated at build time, not hard-coded in components.
- The public bundle contains no CMS tokens, deploy hooks or form secrets.

## Definition of done (every UI ticket, additionally)

- **Design:** worked through with the `impeccable` skill and consistent with `DESIGN.md` from T-001.
- **Mobile:** verified at 320, 390, 768, 1024 and 1440 px. No horizontal scroll. Tap targets at least 44 × 44 px. Nothing works only on hover. Zoom works.
- **ARIA and keyboard:** follows "Mobile and ARIA" in [CODING-STANDARDS.md](../CODING-STANDARDS.md):
  - landmarks, one `h1`, headings in order, and visible focus
  - `aria-current` in navigation and labelled controls
  - Escape closes overlays, and focus returns to the control that opened them
- **Checks:** a keyboard-only pass and an axe scan with no serious or critical issues on every page type. One screen-reader pass (NVDA or VoiceOver) the first time a new page type ships.
- **Images:** width and height set, useful alt text (empty for decorative images), responsive sizes, lazy-loaded below the fold.

## Stages

| Stage | Ticket | Depends on | Clinic input needed |
| --- | --- | --- | --- |
| 0 Foundation | [T-001 Design direction and shell audit](T-001-design-direction.md) | — | — |
| | [T-002 Cloudflare Pages project and test tooling](T-002-pages-and-tooling.md) | — | — |
| | [T-003 Sanity project and build-time content](T-003-sanity-foundation.md) | T-002 | — |
| | [T-004 Redirects and route coverage check](T-004-redirects.md) | T-002 | — |
| | [T-005 Shared page building blocks](T-005-shared-components.md) | T-001, T-003 | — |
| 1 Core content | [T-010 Site settings, header and footer](T-010-site-settings.md) | T-005 | — |
| | [T-011 Locations, hours and contact](T-011-locations.md) | T-010 | Rockledge hours and street spelling |
| | [T-012 Homepage](T-012-homepage.md) | T-011, T-013 | — |
| | [T-013 Promotions banner](T-013-promotions.md) | T-005 | — |
| | [T-014 New Patients pages](T-014-new-patients.md) | T-005 | Correct address for `info.vetdermcenter.com` |
| | [T-015 Facility tour gallery](T-015-tour-gallery.md) | T-005 | — |
| | [T-016 About and team](T-016-about-team.md) | T-005 | Whether Dani Temple gets a bio page |
| | [T-017 Services](T-017-services.md) | T-005 | — |
| | [T-018 Before and after photos](T-018-before-after.md) | T-015 | — |
| | [T-019 Testimonials](T-019-testimonials.md) | T-005 | — |
| | [T-020 Patient handouts](T-020-handouts.md) | T-005 | — |
| | [T-021 Pet Health hub, pharmacy, insurance and links](T-021-pet-health.md) | T-005 | — |
| 2 Archive | [T-030 Archive capture](T-030-archive-capture.md) | — | — |
| | [T-031 News](T-031-news.md) | T-005, T-030 | — |
| | [T-032 FAQs](T-032-faqs.md) | T-005, T-030 | — |
| | [T-033 How-to videos](T-033-videos.md) | T-005, T-030 | — |
| | [T-034 Site search](T-034-search.md) | content tickets T-011–T-033 | — |
| 3 Forms | [T-040 Forms hub and appointments](T-040-forms-hub.md) | T-005 | — |
| | [T-041 Prescription request form](T-041-prescription-form.md) | T-040 | Main office name: Maitland or Altamonte |
| | [T-042 Skin allergy questionnaire](T-042-allergy-questionnaire.md) | T-040 | — |
| | [T-043 Live form delivery](T-043-live-form-delivery.md) | T-041, T-042 | Receiving inbox; sign-off on handling client data |
| 4 Launch | [T-050 Analytics](T-050-analytics.md) | T-012 | Matomo access, if its history matters |
| | [T-051 Editor handoff](T-051-editor-handoff.md) | stage 1–2 tickets | Editor's name and email |
| | [T-052 Launch readiness audit](T-052-launch-readiness.md) | all stage 0–3 tickets | Clinical content and photo-use sign-off |
| | [T-053 Domain cutover and rollback](T-053-cutover.md) | T-052 | DNS change at the clinic's registrar |
| 5 Cleanup | [T-060 Phase 2 cleanup backlog](T-060-cleanup-backlog.md) | T-053 | Content review |

T-030 can start right away. After T-005 and T-010, most stage 1 tickets can run in parallel, as can T-031 to T-033 and T-041 to T-042.
