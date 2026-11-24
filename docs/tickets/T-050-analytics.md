# T-050 Analytics

**Stage:** 4 Launch · **Depends on:** T-012 · **Type:** Infrastructure · **Clinic input:** Matomo access, if its history matters

## Goal

Measure page popularity, traffic sources, devices and performance, and count clicks on key actions.

## Scope

- Turn on Cloudflare Web Analytics for the Pages project (PLAN.md baseline). It already tracks page changes in an SPA.
- Add a small analytics adapter (`src/lib/analytics.ts`) with a fixed event list:
  - `appointment_cta_click`, `prescription_cta_click`, `pharmacy_outbound_click`
  - `phone_click`, `directions_click`
  - `handout_download`, `promotion_cta_click`
  - parameters: page path, where on the page the control is, location code, content ID
- Choosing a provider for click events is still open in PLAN.md. Before building this part, decide between GA4 and keeping Matomo (check whether the clinic can access Matomo site 17157 and export its history). Until decided, the adapter does nothing, and the event hooks already in the code stay inactive.
- Never send form values, search terms, query strings or anything that identifies an owner or pet.
- If GA4 is chosen, add a cookie consent banner whose default declines analytics.

## Acceptance criteria

- Cloudflare Web Analytics shows page views on the preview or production domain.
- If an event provider is chosen, each event shows up in its debug view once per click.
- A test confirms no event fires from preview forms.
