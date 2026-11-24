# T-004 Redirects and route coverage check

**Stage:** 0 Foundation · **Depends on:** T-002 · **Type:** Infrastructure

## Goal

Every old itchypetvet.com URL lands somewhere useful, and a test proves it.

## Scope

- Turn [ROUTE-MAP.md](../ROUTE-MAP.md) into a typed source file, for example `src/lib/routes/legacy.ts`.
- A build script generates `static/_redirects` (Cloudflare Pages format, 301) from that file, including slash and no-slash variants.
- Archive redirects (news, FAQ, video) are generated from imported records, so each record's legacy path maps to its new route.
- Write a coverage test that reads [routes.csv](../../discovery/2026-11-16/routes.csv) and [archive-urls.json](../../discovery/2026-11-23/archive-urls.json). Every source path must either match a prerendered route or have a redirect. Test redirect chains too: at most one hop.
- Handle the two source 404s (`/author/vetderm/`, `/pet-health-resources/pet-health-checker/`) as the route map says.
- Stay within Cloudflare's `_redirects` limits (2,000 static and 100 dynamic rules). Use splat rules for archive families if the count gets close.

## Acceptance criteria

- The coverage test runs in CI and lists any uncovered source path by name.
- On a preview deploy, sampled old URLs return 301 to the right new route.
- While tickets are still open, routes they haven't built yet are allowed through a "pending" list in the test, and that list must be empty before T-052.
