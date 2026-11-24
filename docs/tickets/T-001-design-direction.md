# T-001 Design direction and shell audit

**Stage:** 0 Foundation · **Depends on:** — · **Type:** UI

## Goal

Set the visual direction for the whole rebuild before page tickets start, so 30 tickets don't each invent their own look.

## Scope

- Run the `impeccable` skill against the current homepage and shell (`src/routes/+page.svelte`, `Site_Header.svelte`, `Site_Footer.svelte`) and [BRAND.md](../BRAND.md).
- Produce `DESIGN.md` at the repo root covering:
  - DaisyUI theme tokens, including accessible pairings for the brand teal (white on teal fails contrast for body text)
  - type scale and spacing
  - templates for content page, list/archive page, detail page, gallery and form
  - patterns for card, CTA, breadcrumb, banner, gallery, form field and step indicator
- Desktop navigation keeps the source site's structure (Home, New Patients, About Us, Services, Pet Health, Forms, plus search) as dropdown menus. Mobile uses a drawer menu, as the source site does. The scaffold's current anchor-link nav (`src/lib/content/site.ts`) gets replaced in T-010.
- Audit the existing shell: responsive layout at every width, keyboard use, focus, Escape handling in the mobile menu, and zoom. File fixes here.

## Acceptance criteria

- `DESIGN.md` exists and every later UI ticket can point to a template or pattern in it.
- Mobile layout puts call, directions, book and refill ahead of the hero image on a 390 px screen.
- The shell passes the UI definition of done in the [ticket README](README.md).
- The [IMPLEMENTATION.md](../IMPLEMENTATION.md) "visual/responsive and keyboard checks remain outstanding" item is closed with results.
