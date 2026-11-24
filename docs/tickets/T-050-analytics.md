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
- Build the adapter and wire every event hook now (decided November 23, 2026). Which service receives click events is an **open item** (PLAN.md). Until one is chosen, the adapter does nothing: no network requests and no third-party scripts. In development builds, it writes each event to the console so the hooks can be tested.
- Candidate services, to choose from later: Umami Cloud, Plausible, Fathom, Matomo Cloud, GA4. Cookieless options need no consent banner. If GA4 is chosen, add a cookie consent banner whose default declines analytics.
- Never send form values, search terms, query strings or anything that identifies an owner or pet.
- Separately, ask the clinic or ProSites whether the existing Matomo history (site 17157) can be exported before ProSites is cancelled (T-053).

## Acceptance criteria

- Cloudflare Web Analytics shows page views on the preview or production domain.
- Every listed event fires once per click with the right parameters, confirmed by unit or Playwright tests against the adapter.
- With no service configured, production makes no analytics requests besides Cloudflare Web Analytics.
- A test confirms no event fires from preview forms.
- Connecting a service later changes only the adapter file, plus its script and configuration.
