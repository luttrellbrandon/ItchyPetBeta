# T-017 Services

**Stage:** 1 Core content · **Depends on:** T-005 · **Type:** UI + content

## Goal

Rebuild the services hub, the four category pages and every service page.

## Scope

- **`serviceCategory` schema:** title, slug, intro, order. Categories: Medical Services, Anesthesia and Patient Monitoring, Preventive Services, Additional Services.
- **`service` schema:** title, slug, category reference, summary, body, hero image, related services and related handouts.
- **Services to import (12):** allergy testing, food allergy and intolerance, video otoscopy, flea prevention and control, tick prevention, cutaneous laser surgery, veterinary specialist referrals, dermatology (skin), endocrinology (hormones), patient monitoring, general anesthesia, local anesthesia.
- **Routes:**
  - `/services/`: the hub, with all services grouped by category (this replaces `/all-services/`)
  - `/services/category/<slug>/`
  - `/services/<slug>/`
- Service pages link to related handouts (T-020) and FAQs (T-032) where the content model allows.

## Acceptance criteria

- All 12 services and 4 categories render and their source routes resolve, including the no-slash `/service-category/<x>` variants.
- Adding a service in Sanity puts it on the hub and its category page.
