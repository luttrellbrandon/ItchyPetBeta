# Svelte coding conventions

These conventions adapt the user's requested reference, `C:/MergeConflict/Keena.InteleFiler/Keena.InteleFiler.Client`, inspected on November 16, 2026. They guide the implemented SvelteKit foundation and subsequent migration. Dependency versions are pinned in package.json and package-lock.json.

## Reference observations

InteleFiler uses SvelteKit, TypeScript, static adapter output, Tailwind, shared library components, route-local `_components`, camelCase functions/variables, and descriptive component names such as `Form_Group_Text.svelte`. Components include JavaScript / HTML / CSS separator comments and sections such as Public Properties, Private Properties, Reactive Variables, and Functions. Its UI library is Skeleton; this project uses the requested DaisyUI.

The reference mixes legacy Svelte props/event dispatch and newer `$state` usage. Carry over organization and commenting style while using a consistent current Svelte API in new code. Choose and pin compatible package versions at scaffold time; the reference's wildcard versions and ASP.NET hosting scripts are not requirements here.

## Component structure

- Use `<script lang="ts">`, markup, and optional scoped `<style>` in that order.
- Keep readable separator comments for JavaScript, HTML, and CSS, matching the reference. Include Public Properties, Private Properties, Reactive Variables, and Functions sections when they contain code.
- Use typed props and events; prefer Svelte 5 runes for new components. Derive computed values rather than duplicating state.
- Use camelCase for variables and functions and descriptive component names. Follow the reference's `Area_Purpose.svelte` pattern for grouped components (for example `Location_Card.svelte`).
- Put reusable components in `src/lib/components`; put route-specific components in the route's `_components` directory. Keep content records separate from presentation.
- Explain intent, business constraints, accessibility behavior, and non-obvious trade-offs in comments. Keep routine change history in Git. Existing dated reference comments are evidence of its style, not a requirement to invent initials or work item numbers.

## Styling and responsiveness

- Use one named DaisyUI theme and semantic tokens; keep observed brand values and accessible variants documented in `BRAND.md`.
- Use Tailwind for layout/spacing and scoped CSS when it improves clarity. Centralize recurring layouts and control styles.
- Start with a single-column layout. Verify at 320, 390, 768, 1024, and 1440 CSS pixels; retain readable layouts between these widths.
- Use semantic controls with visible focus, associated labels, understandable errors, and native keyboard behavior. Permit zoom and reduced motion. Aim for WCAG 2.2 AA; verify actual components rather than assuming the library ensures compliance.
- Give images intrinsic dimensions, useful alternative text or empty alt for decorative assets, responsive sizes, and lazy loading below the fold. Keep the hero appropriately sized and avoid layout shifts.

## Mobile and ARIA

- Design for phones first: primary tasks (call, directions, book, refill) reachable without scrolling past the hero on a 390 px screen; tap targets at least 44 × 44 CSS px; no horizontal scroll at 320 px; nothing depends on hover.
- Prefer native HTML semantics over ARIA. Add ARIA only where native elements cannot express the behavior, and never contradict native roles.
- Use landmarks (`header`, `nav` with distinct `aria-label`s, `main`, `footer`), one `h1` per page and an unbroken heading order. Keep the skip link.
- Menus and disclosures: `aria-expanded` and `aria-controls` on toggles, Escape closes, focus moves in and returns to the toggle. Mark the current page with `aria-current="page"`.
- Dialogs and lightboxes use `<dialog>` or an equivalent with focus trapping, a labelled title, and Escape to close.
- Forms: every control has a visible label; group related choices in `fieldset`/`legend`; connect hints and errors with `aria-describedby`, set `aria-invalid`, and announce submission results through a polite live region. Multi-step forms announce the current step.
- Search results and filter counts update a polite live region. Icon-only buttons have accessible names; decorative icons are `aria-hidden`.
- Verify with keyboard only, a screen reader (NVDA or VoiceOver), and an automated check (axe) on each page type.

## Content and integrations

Use typed content records for pages, services, team members, locations, FAQs, videos, news, promotions, and assets. Share location information across page/footer renderers to prevent conflicting copies.

Inactive workflow previews show a visible notice before fields. Prefer disabled final actions; protect forms from default submission, avoid persistence, and exclude all field values from analytics. No success message may imply a request was delivered. Once a form is live (ADR 0003), show success only after the Pages Function confirms the email was sent.

Keep analytics behind a small adapter with a fixed event vocabulary. Track page navigation exactly once. CMS credentials and deployment hooks belong outside public bundles. Validate CMS records at build time.

## Verification when implementation begins

Set up type checking, formatting, linting, and a production static build. Add focused behavior tests for navigation, search, preview forms, promotions, and route migration. Check direct nested URLs, 404 behavior, mobile menus, keyboard focus, zoom, reduced motion, and representative image-heavy pages. Verify analytics navigation events using the selected provider's tools. Do not fabricate application test results while this repository contains planning only.
