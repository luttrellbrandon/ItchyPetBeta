# T-019 Testimonials

**Stage:** 1 Core content · **Depends on:** T-005 · **Type:** UI + content

## Goal

Rebuild the testimonials list and the four detail pages.

## Scope

- **`testimonial` schema:** quote, attribution (client name and pet name), source, permission status, date if known, order, and a historical note field (some entries mention a retired doctor).
- **Routes:** `/about/testimonials/` and `/about/testimonials/<slug>/` for Rocco Grillo, Titus Moore, Briggette Stawinsky and Sasha Sackler.
- Mark up quotes with `<blockquote>` and `<figcaption>`. No carousel or autoplay.

## Acceptance criteria

- All four testimonials are migrated with their attribution, and their legacy URLs redirect.
- Testimonials that mention retired staff show the historical note.
