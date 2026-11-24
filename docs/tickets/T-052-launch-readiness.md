# T-052 Launch readiness audit

**Stage:** 4 Launch · **Depends on:** all stage 0–3 tickets · **Type:** QA · **Clinic input:** clinical content and photo-use sign-off

## Goal

Confirm the new site is ready to replace itchypetvet.com.

## Checklist

- **Routes:** T-004's coverage test passes and its pending list is empty. Every [ROUTE-INVENTORY.md](../ROUTE-INVENTORY.md) and archive URL is either built or redirected.
- **Content:**
  - clinic signs off on clinical content
  - Rockledge hours and address resolved (T-011)
  - "Maitland" vs "Altamonte" main office name resolved (T-041)
  - `info.vetdermcenter.com` email resolved (T-014)
  - Dani Temple link resolved (T-016/T-012)
  - before/after consent confirmed or the case unpublished (T-018)
  - promotion text approved (T-013)
- **Accessibility:**
  - axe passes on every page type
  - a full keyboard pass, plus NVDA and VoiceOver passes on the homepage, a service page, news, FAQ, gallery, search and both forms
  - 200% zoom and reduced motion checked
  - target: WCAG 2.2 AA
- **Mobile:** every page type checked at 320, 390, 768, 1024 and 1440 px, on a real iPhone and a real Android phone.
- **Performance:** Lighthouse mobile scores 90+ for performance, accessibility, best practices and SEO on the homepage, a service page and a news article.
- **SEO:**
  - `sitemap.xml` generated from all prerendered routes
  - `robots.txt` points to it
  - canonical tags, social preview tags and a `LocalBusiness`/`VeterinaryCare` structured-data entry for each location
- **Error page:** the static 404 page works, and it links to search and home.
- **Forms:** T-043 live with sign-off, or both forms clearly in preview mode with a phone number.
- **Security:** no secrets in `build/`, and security headers set in `static/_headers` (CSP that allows only the embeds used, HSTS, Referrer-Policy).

## Acceptance criteria

- Every item checked, with the evidence recorded in this file or a linked report.
- Practice sign-off recorded in PLAN.md.
