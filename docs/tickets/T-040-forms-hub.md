# T-040 Forms hub and appointments

**Stage:** 3 Forms · **Depends on:** T-005 · **Type:** UI + content

## Goal

Rebuild the Forms index and give appointment requests one consistent destination.

## Scope

- **`/forms/`:** links to the prescription request form (T-041) and the skin allergy questionnaire (T-042), each with a one-line description and its status. Until T-043 is live, each says "Preview: this form does not send anything yet. Please call [phone]."
- **`/appointments/`:** explains how to book. New patients use the external GreatPetCare booking link (from site settings); existing patients call the office. Phone numbers come from location records. Make clear that a booking request isn't a confirmed appointment ([CONTEXT.md](../../CONTEXT.md)).
- Point every "Book" CTA on the site (header, homepage, location pages) at the same destination: either `/appointments/` or GreatPetCare directly, decided in `DESIGN.md`. Add the `appointment_cta_click` hook.
- Remove the scaffold's `src/routes/[workflow]/` notice routes.
- Legacy `/forms/make-an-appointment-2/` redirects to `/appointments/`. Don't carry over the legacy VitusVet appointment and refill widgets.

## Acceptance criteria

- Every booking CTA on the site goes to the same place.
- The preview notice on each form is visible text, not just a color or icon.
