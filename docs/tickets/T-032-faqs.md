# T-032 FAQs

**Stage:** 2 Archive · **Depends on:** T-005, T-030 · **Type:** UI + content + migration

## Goal

All 57 FAQs are on the new site, grouped by category, each with its own clean URL.

## Scope

- **`faq` schema:** question, slug, answer (rich text), category (About Our Hospital, Veterinary Health Care), related services, legacy path.
- Write an import script from T-030's JSON. Make clean slugs from the questions: drop encoded punctuation such as `%e2%80%99`, cap the length, and keep slugs unique.
- **Routes:**
  - `/faq/`: both categories
  - `/faq/hospital/` and `/faq/health-care/`
  - `/faq/<slug>/`: a detail page for each FAQ, so old links and search results have somewhere to land
- On list pages, each question is a `<details>`/`<summary>` disclosure that expands in place, plus a link to its detail page.
- Add FAQPage structured data on the list pages.
- Check the hospital FAQs on hours, location and scheduling against T-011 location records. Flag conflicts; don't silently rewrite them.

## Acceptance criteria

- 16 hospital and 41 health care FAQs imported (or the reconciled count).
- Every legacy `/faqs/...` URL resolves, including the encoded ones.
- Disclosures work by keyboard and announce their expanded/collapsed state.
