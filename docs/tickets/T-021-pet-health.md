# T-021 Pet Health hub, pharmacy, insurance and links

**Stage:** 1 Core content · **Depends on:** T-005 · **Type:** UI + content

## Goal

Rebuild the Pet Health section's hub and its three simple pages.

## Scope

- **`/pet-health/`:** hub linking to Pharmacy, Videos (T-033), News (T-031), FAQs (T-032), Insurance and Links.
- **`/pet-health/pharmacy/`:** explains the online pharmacy and links out to the Covetrus store, with an "opens external site" notice. The URL comes from site settings. Don't carry over the legacy VitusVet widget. Add the `pharmacy_outbound_click` hook.
- **`/pet-health/insurance/`:** the source embeds a petinsuranceinfo.com comparison iframe. Keep the embed only if it still works and is allowed to be framed, with a `title`. Always show a plain link next to it as a fallback.
- **`/pet-health/links/`:**
  - **`resourceLink` schema:** title, URL, description, group
  - import the professional and education links
  - check each destination: drop dead links and record them in the ticket's notes

## Acceptance criteria

- All four pages render from Sanity and their source routes redirect.
- The insurance page still works when the iframe is blocked.
- No dead outbound links at merge.
