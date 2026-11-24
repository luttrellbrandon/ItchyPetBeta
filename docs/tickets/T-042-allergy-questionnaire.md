# T-042 Skin allergy questionnaire

**Stage:** 3 Forms · **Depends on:** T-040 · **Type:** UI

## Goal

Rebuild the skin allergy testing questionnaire with its full question set and conditional structure, as a preview until T-043.

## Source model

From [DISCOVERY.md](../DISCOVERY.md) and the archived form:

- Owner, pet and date
- Indoor/outdoor symptoms and seasons
- Exposures:
  - grasses, trees, mold
  - other exposures and other animals
  - home furnishings
- Treatment preference: injections or under-the-tongue drops

Parsed controls include hidden fields and one entry per checkbox, so build from the business questions, not the raw control count.

## Scope

- **Route:** `/forms/skin-allergy-questionnaire/`.
- Field definitions in typed code, shared with T-043. Same form building blocks as T-041.
- Group checkbox sets in `fieldset`/`legend`. Long checklists (trees, grasses) are laid out in columns on desktop and a single column on phones.
- Steps, error handling, autocomplete and preview mode follow the rules in T-041.
- An intro states this is not the new patient questionnaire, which is emailed after booking ([CONTEXT.md](../../CONTEXT.md)).

## Acceptance criteria

- Every business question and conditional rule exists, checked against the archived form.
- The same Playwright checks as T-041 pass.
