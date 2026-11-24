# T-030 Archive capture

**Stage:** 2 Archive · **Depends on:** — · **Type:** Migration

## Goal

Save the full text, dates, categories and images of every news article, FAQ and video page before anything is imported, so the migration doesn't depend on the old site staying online.

## Background

The source site blocks automated requests: curl gets HTTP 202 with an empty body. A real browser gets full pages ([DISCOVERY.md](../DISCOVERY.md), November 23 update). The URL lists are in [archive-urls.json](../../discovery/2026-11-23/archive-urls.json): 83 news articles and 57 FAQs. The 14 video pages are in the November 16 inventory.

## Scope

- Write a Playwright capture script in `scripts/capture/`. It uses a real browser context at a slow, polite rate (for example one page every 2–3 seconds) and does not try to get around a challenge if one appears.
- For each URL, save the raw HTML and a parsed JSON record to `discovery/<date>/archive/`:
  - **News:** headline, publication date, body HTML, categories, source/credit line, images
  - **FAQ:** question, answer HTML, category
  - **Video:** title, species, embed URL, description, any transcript
- Download the images that article bodies reference into the same folder, recording their source URLs.
- Write a reconciliation report: URLs attempted, captured, failed, and records with an empty body. Re-run until failures are zero or each one is explained.
- Re-read news list pages 1–12 to catch articles published after November 23.

## Acceptance criteria

- Captured record counts match the URL lists, with every gap explained in the report.
- The script can be re-run and skips URLs it already has unless `--refresh` is passed.
- Nothing in `discovery/` gets overwritten; each run writes to a new dated folder.
