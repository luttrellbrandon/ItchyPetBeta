# T-043 Live form delivery

**Stage:** 3 Forms · **Depends on:** T-041, T-042 · **Type:** Backend · **Decision:** [ADR 0003](../adr/0003-live-request-forms.md) · **Clinic input:** receiving inbox; sign-off on handling client data

## Goal

The prescription request form and allergy questionnaire send to the clinic by email, with nothing stored.

## Scope

- **Pages Functions:** `functions/api/prescription-request.ts` and `functions/api/allergy-questionnaire.ts`, or one function that routes by form.
- **Validation:** the server validates with the same field definitions as T-041/T-042 and rejects unknown fields.
- **Spam:** Cloudflare Turnstile widget on each form, with the token verified on the server. Add a hidden honeypot field and simple per-IP rate limiting.
- **Email:**
  - sent through Cloudflare's email sending binding (`send_email`) to the clinic's verified address, set in Pages configuration, not in code
  - subject: form type, pet name and request type
  - body: plain text with each question and its answer
  - reply-to: the client's email
- **No storage:** no KV/D1 writes. Logs record only form type, outcome and timestamp, never field values.
- **Client side:**
  - switch the form from preview to live with a build flag per form
  - show success only after the function returns success; on failure, show an error with the phone number, and keep what the client typed
  - announce the result in a live region and move focus to it
- Remove the preview notices once the form is live.

## Acceptance criteria

- On a preview deploy, a test submission of each form arrives at the test inbox with every answer.
- Turnstile failure, missing fields and oversized payloads are rejected with clear messages.
- Function logs and analytics contain no field values.
- Going live needs (1) the clinic's receiving address configured and (2) written clinic sign-off, recorded in PLAN.md. Until both exist, production stays in preview mode.
