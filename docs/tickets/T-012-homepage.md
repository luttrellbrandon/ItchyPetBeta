# T-012 Homepage

**Stage:** 1 Core content · **Depends on:** T-011, T-013 · **Type:** UI + content

## Goal

Move the existing homepage onto Sanity content and finish it to match the source homepage's content.

## Scope

- **`homepage` singleton schema:** hero (image, heading, text), primary task CTAs (book, refill/prescription, pharmacy, call), specialty intro, service cards (references to services), new-client card, team cards (references to team members), Facebook card, "why a dermatologist" card, and a promotion slot (T-013).
- Content order follows `DESIGN.md`: primary tasks come before or alongside the hero on mobile, then main location and hours (from T-011), then the remaining cards.
- Replace the hard-coded content in `src/routes/+page.svelte` and `src/lib/content/site.ts`, and repoint links to new internal routes instead of itchypetvet.com.
- Dani Temple's card currently links to the homepage. Link it to a bio once T-016 settles whether one exists; otherwise leave the card without a link.
- Facebook: show a link card, not the Facebook embed script.

## Acceptance criteria

- Every homepage text block, image and card can be edited in Sanity.
- No homepage link points to itchypetvet.com except external providers (booking, pharmacy, Facebook).
- Largest Contentful Paint is under 2.5 s on Lighthouse mobile. The hero image is preloaded and correctly sized.
