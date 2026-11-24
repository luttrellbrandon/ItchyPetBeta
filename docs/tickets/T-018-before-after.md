# T-018 Before and after photos

**Stage:** 1 Core content · **Depends on:** T-015 · **Type:** UI + content

## Goal

Rebuild the before/after patient photos page as paired, captioned cases.

## Scope

- **`beforeAfterCase` schema:** title, before image and alt text, after image and alt text, caption or condition, treatment summary, patient consent status, order.
- Show each case as a labelled pair: "Before" and "After" as visible text, not just placement. Side by side on wide screens, stacked on phones. Reuse T-015's lightbox.
- Skip a draggable comparison slider; side-by-side is more accessible.
- Import cases from the archived page. Set consent status to "unconfirmed" until the clinic confirms; T-052 checks it.
- **Route:** `/about/before-and-after/`.

## Acceptance criteria

- Every image's alt text says which pet, before or after, and what's visible, not just "before".
- Cases with consent "unconfirmed" are listed in the build output for T-052.
