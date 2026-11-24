# T-003 Sanity project and build-time content

**Stage:** 0 Foundation · **Depends on:** T-002 · **Type:** Infrastructure · **Decision:** [ADR 0002](../adr/0002-sanity-cms.md)

## Goal

Content comes from Sanity at build time, and publishing in Sanity rebuilds the live site.

## Scope

- Create the Sanity project and a `production` dataset. Check current free-tier limits (users, documents, asset storage, bandwidth) and record them in PLAN.md.
- Put the Sanity Studio config in the repo (for example `studio/`) and deploy the Studio to Sanity's hosting.
- Add a typed content loader in `src/lib/content/` that fetches during the build with a read token kept in a Pages environment variable. Generate TypeScript types from the schemas.
- Validate records at build time: a missing required field or broken reference fails the build with a readable message.
- Add a Sanity webhook on publish/unpublish that calls a Cloudflare Pages deploy hook. Store the hook URL only in Sanity.
- Add an image helper that uses Sanity's image pipeline (crop, hotspot, width, format) and outputs `srcset`.
- Write a reusable import helper for migration scripts (`scripts/import/`). It creates or updates documents by a stable ID, so imports can be re-run safely.
- Define a `siteSettings` stub schema only. Each content ticket adds its own schemas.

## Acceptance criteria

- Changing a test field in Studio and publishing updates the `pages.dev` site within about five minutes with no developer action.
- Unpublishing also triggers a rebuild.
- The build fails clearly on invalid content. Neither the read token nor the hook URL appears in `build/`.
- A short `docs/SANITY.md` covers project ID, datasets, roles, and how to restore a previous version of a document.
