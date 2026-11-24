# ItchyPetBeta

## Scope

This repository contains the SvelteKit foundation and homepage for the Veterinary Dermatology Center website rewrite. Read `docs/PLAN.md` before implementing a feature and `docs/DISCOVERY.md` before migrating a page. See README.md for local development and static build commands.

The confirmed stack is Svelte with TypeScript and DaisyUI, prerendered public pages, and static hosting on Cloudflare Pages. Preserve the clinic brand and content while improving responsive layout and navigation. Plan a complete searchable archive.

Appointment requests link to the clinic's external booking provider. Prescription requests and the skin allergy questionnaire become live forms delivered by a Cloudflare Pages Function (see `docs/adr/0003-live-request-forms.md`); until that function is built and approved, they stay clearly labeled non-submitting previews that never send or store entered values. Operational patient records and staff task tracking are future scope.

## Implementation conventions

Follow `docs/CODING-STANDARDS.md` when creating Svelte components, styles, or shared code. Those conventions adapt the user's InteleFiler reference to this project; use DaisyUI for UI components.

Use the `impeccable` skill for all design work: page layouts, components, visual polish and design critique. Every page and component must be mobile-first and accessible: follow the mobile and ARIA rules in `docs/CODING-STANDARDS.md`, and make them acceptance criteria on every UI ticket.

Use `docs/BRAND.md` for observed colors, typography, asset provenance, and proposed theme tokens. Preserve downloaded originals under `discovery/`; place approved, optimized application assets in the eventual app's static asset directory.

Before adding analytics or editing workflows, read `docs/PLAN.md` for confirmed scope and open decisions. The CMS is Sanity (`docs/adr/0002-sanity-cms.md`); a single content editor publishes directly, without a separate approval gate.

Before launch, resolve every route in the migration inventory, verify responsive and keyboard behavior, and confirm clinical content, location details, and asset reuse rights with the practice. Keep observations distinct from proposed behavior in discovery documentation.
