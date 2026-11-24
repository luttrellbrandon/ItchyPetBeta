# T-014 New Patients pages

**Stage:** 1 Core content · **Depends on:** T-005 · **Type:** UI + content · **Clinic input:** the correct email address in place of `info.vetdermcenter.com`

## Goal

Rebuild the New Patients hub, What to Expect, and Why a Veterinary Dermatologist as editable `page` records.

## Scope

- **Routes:** `/new-patients/`, `/new-patients/what-to-expect/`, `/new-patients/why-a-veterinary-dermatologist/`.
- Import copy from the archived source pages ([ROUTE-INVENTORY.md](../ROUTE-INVENTORY.md)), converted into T-005 body blocks.
- What to Expect: keep the records preparation, insurance/payment and questionnaire text. Make clear that an appointment request isn't a confirmed booking, and that the new patient questionnaire is emailed after booking. It is not the skin allergy questionnaire ([CONTEXT.md](../../CONTEXT.md)).
- The hub page links to Tour (T-015), Handouts (T-020) and the external new-patient booking link.
- Flag the `info.vetdermcenter.com` email as needing clinic confirmation.

## Acceptance criteria

- All three pages render from Sanity, and their legacy URLs redirect, including the duplicated `/new-clients/new-clients/what-to-expect/`.
- No migrated text is lost compared with the archived source, checked side by side.
