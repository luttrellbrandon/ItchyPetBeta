# ItchyPetBeta

Discovery and planning for a responsive Svelte/TypeScript/DaisyUI rewrite of [Veterinary Dermatology Center](https://itchypetvet.com/), targeting static Cloudflare Pages hosting.

- [Rewrite plan](docs/PLAN.md) — confirmed requirements, architecture, editing, analytics and implementation sequence.
- [Discovery](docs/DISCOVERY.md) — feature surfaces, integrations, discrepancies and coverage limits.
- [Brand](docs/BRAND.md) — observed palette/fonts and proposed accessible theme mapping.
- [Route inventory](docs/ROUTE-INVENTORY.md) — every captured public URL and source archive.
- [Image catalog](discovery/2026-11-16/asset-gallery.html) — open locally to browse recovered images.
- [Asset manifest](discovery/2026-11-16/assets.csv) — URLs, local paths, dimensions, hashes and capture status.
- [Coding standards](docs/CODING-STANDARDS.md), [agent instructions](AGENTS.md) and [domain language](CONTEXT.md).

The initial SvelteKit homepage, custom DaisyUI theme, responsive navigation and static build configuration are implemented. Appointment, prescription and allergy questionnaire interfaces are planned as non-submitting previews. Full searchable archive migration is required; older pagination responses were empty during discovery, so a provider content export remains a prerequisite.

Discovery scripts use Python's standard library. `scripts/discover_site.py` performs public HTTP reads and downloads; `scripts/build_discovery_reports.py` generates local inventories from the saved evidence. Downloads include original page/style/script evidence and must not be treated as trusted application dependencies. The snapshot is dated November 16, 2026; rerunning the crawler refreshes it.

## Local development

Run `npm ci`, then `npm run dev`. Verify with `npm run check`, `npm run format:check`, and `npm run build`. Use `npm run preview` for the production build.

Cloudflare Pages: build command `npm run build`, output directory `build`. Unknown routes return 404 without a blanket SPA fallback. This slice does not deploy, configure a CMS, or connect analytics. Workflow routes are non-submitting notices. Unmigrated content links lead to the current site.

Image provenance: `static/images/provenance.json`. Original discovery files are unchanged. Fonts are self-hosted via Fontsource packages with included licenses.
