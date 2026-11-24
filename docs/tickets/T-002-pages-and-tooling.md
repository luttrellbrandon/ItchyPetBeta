# T-002 Cloudflare Pages project and test tooling

**Stage:** 0 Foundation · **Depends on:** — · **Type:** Infrastructure

## Goal

Every push builds and gets a preview URL on Cloudflare Pages, and the repo has the test tools later tickets rely on.

## Scope

- Create a Cloudflare Pages project under the developer's own Cloudflare account (PLAN.md), connected to `luttrellbrandon/ItchyPetBeta`. Build command `npm run build`, output `build/`, with the Node version pinned.
- Production deploys come from `main`, preview deploys from other branches. The `pages.dev` domain only; the custom domain is T-053.
- Add Vitest for unit tests and Playwright for browser tests, plus `@axe-core/playwright`. Add `npm run test` and `npm run test:e2e` scripts.
- Write one Playwright smoke test: the homepage loads, the mobile menu opens and closes with Escape, and an axe scan runs.
- Add a CI workflow (GitHub Actions or a Pages build step) that runs check, format check, unit tests and build.
- Look again at the `npm audit` advisories noted in IMPLEMENTATION.md, and upgrade where it doesn't need a forced major version change.

## Acceptance criteria

- A branch push produces a working preview URL, and nested routes load directly from it (no 404 on refresh).
- `npm run test` and `npm run test:e2e` run locally and in CI.
- The README documents deploy, preview and test commands.
