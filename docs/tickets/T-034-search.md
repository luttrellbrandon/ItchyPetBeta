# T-034 Site search

**Stage:** 2 Archive · **Depends on:** content tickets T-011–T-033 (can start once a few are merged) · **Type:** UI

## Goal

Visitors can search every public page and archive record, with no search server.

## Scope

- Build a static search index at build time. Pagefind is the default choice: it indexes the prerendered HTML and loads index chunks only as needed. Index only public content inside `main`; skip navigation and footer.
- **`/search/` page:**
  - a labelled search box
  - results with title, type (News, FAQ, Service, Video, Page) and a snippet
  - filter by type
  - a no-results state that suggests the FAQ and Contact pages
- The search entry in the header (T-010) opens `/search/` or a search dialog, chosen in `DESIGN.md`. The dialog version must trap focus, close on Escape and return focus.
- Announce the result count in a polite live region ("12 results for 'allergy'"), with debounced input.
- Results work with arrow keys or Tab, and Enter opens the selected result.
- Search terms never go to analytics (PLAN.md).
- The old WordPress `?s=` query URL redirects to `/search/?q=`.

## Acceptance criteria

- Tests cover a title match, a body-only match, the type filter, no results, and keyboard navigation.
- The index contains no draft or unpublished content.
- The search page works on a 320 px screen with the on-screen keyboard open.
