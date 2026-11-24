# T-013 Promotions banner

**Stage:** 1 Core content · **Depends on:** T-005 · **Type:** UI + content

## Goal

The content editor can put a promotion on the homepage and take it down, without a developer.

## Scope

- **`promotion` schema:** title, text, image and alt text, optional CTA (label and URL), and placement. Placement is homepage banner only for now; the field exists so more placements can be added later. Publishing and unpublishing go through Sanity's normal publish flow. There is no automatic expiry (PLAN.md); the editor unpublishes it.
- Show it as a banner/card on the homepage, never as an automatic popup. If several promotions are published, show them all, ordered by a priority field.
- Banners have no dismiss control; T-060 can revisit.
- Migrate the current Numelvi/Befrena flyer as the first promotion, in draft, with the flyer's text written out so it isn't only in the image. The medical promotion text needs clinic review (IMPLEMENTATION.md), so it stays in draft until approved.
- CTA clicks get an analytics hook for `promotion_cta_click` (wired up in T-050).

## Acceptance criteria

- Publishing a promotion shows it on the homepage after the rebuild, and unpublishing removes it.
- A flyer image with text also has that text available to screen readers, either as a real heading and body or as alt text summarizing it.
- With no promotions published, the slot leaves no empty gap.
