# T-005 Shared page building blocks

**Stage:** 0 Foundation · **Depends on:** T-001, T-003 · **Type:** UI

## Goal

Build once the pieces every content page uses, following the templates in `DESIGN.md`.

## Scope

- **`page` schema:** a generic record with slug, title, summary, hero image, body, SEO fields and related links. Each content ticket uses it, or its own type.
- **Body blocks:** a limited set from PLAN.md, with no raw HTML: rich text, image with caption, callout, CTA button group, two-column text and image, embedded video, file link. Sanity editor config and Svelte renderers for each.
- **Components:**
  - `Page_Header` (h1, summary, breadcrumbs) and `Breadcrumb_Nav` (using `nav aria-label="Breadcrumb"` and `aria-current`)
  - `Rich_Text`
  - `Responsive_Image`, using T-003's image helper
  - `Cta_Group`
  - `Card_Grid`
  - `Back_To_Top`
- **SEO:** a helper for title, description, canonical, Open Graph and Twitter tags, plus a default social image from site settings.
- **Page shells:** `+page.ts` and `+page.svelte` for content pages, list pages and detail pages, so content tickets fill in data rather than rebuild layout.
- **Print styles:** the source site offers print and email sharing. Print gets basic styles; sharing widgets aren't carried over (T-060 can revisit).

## Acceptance criteria

- A sample `page` document built from every block type renders correctly and passes the UI definition of done.
- Rich text never renders raw HTML, and external links get a visible or announced "opens in new tab" only when one actually opens.
- Each component has a unit or Playwright test covering its accessible name and structure.
