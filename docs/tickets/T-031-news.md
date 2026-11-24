# T-031 News

**Stage:** 2 Archive · **Depends on:** T-005, T-030 · **Type:** UI + content + migration

## Goal

All 83 news articles are on the new site, browsable and editable, at clean URLs with redirects from the old ones.

## Scope

- **`newsArticle` schema:** headline, slug, publication date, summary, body (T-005 blocks), categories, source/credit, rights status, hero image, and legacy path.
- Write an import script from T-030's JSON. It converts body HTML into rich text blocks, uploads images, keeps the original dates, and records the legacy path. It must be safe to re-run.
- PLAN.md: everything gets published, including the LifeLearn-syndicated articles. Keep the source/credit line on each article.
- **Routes:**
  - `/news/`: newest first, prerendered and paginated (for example 12 per page at `/news/page/<n>/`), with a category filter
  - `/news/<slug>/`
- The article page shows date (`<time datetime>`), credit and related articles, and links back to the list.
- Old `/pet-health-resources/news-2/page/<n>/` URLs redirect to `/news/`. Article redirects are generated from the legacy paths (T-004).
- The editor can write new articles in Sanity.

## Acceptance criteria

- 83 articles imported (or the T-030 reconciled count), with record counts matching in the import log.
- Every legacy news URL in archive-urls.json resolves through the coverage test.
- Pagination links have accessible names ("Next page", "Page 3"), and the current page is marked with `aria-current`.
- Spot-check 10 articles against their archived source: text, date and images match.
