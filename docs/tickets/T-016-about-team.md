# T-016 About and team

**Stage:** 1 Core content · **Depends on:** T-005 · **Type:** UI + content · **Clinic input:** whether Dani Temple gets a bio page; confirm credentials

## Goal

Rebuild About Us, the team page and the doctor bio pages, with team members as structured records.

## Scope

- **`teamMember` schema:**
  - name, credentials, and role group (doctor, resident, practice manager, technician, client service)
  - status: active or retired (the retired founder is shown as retired, not removed)
  - short bio, full bio, portrait with alt text, sort order
  - a "has bio page" flag
- **Routes:** `/about/`, `/about/team/` (grouped by role, in the set order), and `/about/team/<slug>/` for members with a bio page (Dr. Caitlin Contreary and Dr. Katherine Doerr, plus others only if the clinic says so).
- Import everyone from the archived team page and the two doctor detail pages.
- The About page links to Team, Locations, Contact, Before/After, Testimonials and FAQs, as the source page does.

## Acceptance criteria

- Adding a team member in Sanity, with a photo, puts them on the team page in the right group and order with no code change.
- Retired members are visibly labelled as retired.
- Portraits use the hotspot so faces aren't cropped at any width.
