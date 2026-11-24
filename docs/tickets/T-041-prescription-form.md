# T-041 Prescription request form

**Stage:** 3 Forms · **Depends on:** T-040 · **Type:** UI

## Goal

Rebuild the prescription request form with every field and conditional rule from the source, as a mobile-friendly preview that submits nothing until T-043.

## Source model

From [DISCOVERY.md](../DISCOVERY.md), plus the archived page and the parsed Gravity Forms attributes in `discovery/2026-11-16/`:

- Owner, pet and contact details
- Refill or new prescription
- Regular medication or allergy serum
- Medication name and quantity
- How to receive it:
  - pickup at Maitland or Rockledge. The main office page calls it "Altamonte", so confirm the name with the clinic, then build pickup choices from T-011 location records instead of fixed labels.
  - online or local pharmacy
  - shipping
- Condition changes since the last visit
- Syringe trays and sharps container choices, for allergy serum
- Notes shown to clients (existing claims, which need clinic confirmation):
  - turnaround: 24–48 business hours for medication, 7–10 business days for serum
  - shipping: $18 / $60, with a payment link sent before shipment

The Gravity Forms markup includes hidden platform fields. Rebuild only the questions clients actually answer.

## Scope

- **Route:** `/forms/prescription-request/`.
- **Field definitions:** keep them in typed code, along with which fields show based on other answers, and the validation rules. T-043 reuses them on the server.
- **Steps:** on mobile, break the form into steps (for example Owner & pet → Medication → Delivery → Review). The visible progress indicator says "Step 2 of 4", and moving to a new step moves focus to its heading. On desktop it can be one page, per `DESIGN.md`.
- **Conditional fields:** when an answer reveals new fields, they appear right after the controlling field, and a polite live region announces the change.
- **Validation:** on submit, an error summary at the top links to each field. Each field has an inline error tied to it with `aria-describedby`, and `aria-invalid` set. Required fields say "required" in text.
- Use `autocomplete` attributes on name, email, phone and address fields, and the right `inputmode`.
- **Preview mode** (default until T-043):
  - a visible notice before the first field
  - the final button is disabled or says "Preview only"
  - the form's submit handler blocks sending
  - nothing goes into localStorage, cookies or analytics

## Acceptance criteria

- Every source field and conditional rule exists, checked against the archived form.
- Playwright tests check that:
  - each conditional branch shows and hides the right fields
  - errors are announced and focus moves correctly
  - preview mode makes no network request on submit
- Completes with keyboard only, and at 320 px with the on-screen keyboard open.
