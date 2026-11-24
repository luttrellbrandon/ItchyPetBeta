# T-010 Site settings, header and footer

**Stage:** 1 Core content · **Depends on:** T-005 · **Type:** UI + content

## Goal

The header and footer match the source site's navigation and are fed from Sanity site settings.

## Scope

- **`siteSettings` schema:** practice name, logo (with alt text), main phone, social links (Facebook), default SEO and social image, booking URL (GreatPetCare), pharmacy URL (Covetrus), and footer attribution text.
- **Navigation:** defined in code (PLAN.md: menus stay in code), with the source site's structure:
  - **New Patients:** What to Expect, Take a Tour, Why a Veterinary Dermatologist, Patient Handouts, and the external new-patient booking link
  - **About Us:** Team, Locations & Hours, Contact Us, Before/After Photos, Testimonials, FAQs
  - **Services:** category hubs and the key service pages
  - **Pet Health:** Pharmacy, How-To Videos, News, FAQs, Insurance, Links
  - **Forms**
  - **Search:** an entry point; the search itself is T-034
- **Desktop:** dropdown menus that open on click and keyboard, not hover alone. Toggles use `aria-expanded`/`aria-controls`, Escape closes a menu, and arrow keys are optional. **Mobile:** drawer menu with nested sections, focus kept inside the drawer, and focus returned to the toggle on close.
- **Footer:** both locations (location records come from T-011; this ticket leaves a placeholder slot), phone links, social links and attribution.
- Replace the anchor-link nav in `src/lib/content/site.ts`.

## Acceptance criteria

- Every nav destination either exists or is in T-004's pending list.
- The current page and its section are marked with `aria-current`.
- A Playwright test covers opening and closing menus by keyboard and touch, Escape, and focus return.
- Changing the phone number in Sanity updates the header, footer and every call link after a rebuild.
