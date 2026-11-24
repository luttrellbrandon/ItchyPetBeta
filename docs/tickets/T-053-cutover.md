# T-053 Domain cutover and rollback

**Stage:** 4 Launch · **Depends on:** T-052 · **Type:** Infrastructure · **Clinic input:** DNS change at the clinic's registrar; release authorization

## Goal

Move itchypetvet.com to Cloudflare Pages with a tested way back.

## Scope

- Write a cutover runbook (`docs/CUTOVER.md`) covering:
  - who controls DNS
  - current records, especially email (MX, SPF, DKIM), so mail isn't broken
  - lowering the DNS TTL ahead of time
  - adding the custom domain in Pages (apex and `www`, with one redirecting to the other)
  - SSL issuance
  - a check after switching: run the T-004 tests against the live domain
- **Rollback:** restore the previous DNS records to put the old host back, which works as long as ProSites is still active. Keep ProSites active for an agreed overlap period before cancelling.
- Get the old Matomo snippet and any ProSites services the clinic still needs (email?) confirmed before cancellation.
- Submit the new sitemap in Google Search Console. Track 404s for two weeks and add redirects for any that matter.

## Acceptance criteria

- Production release is authorized separately by the clinic (AGENTS.md / PLAN.md). This ticket does nothing without that.
- After cutover, the site, both apex and `www`, serves over HTTPS, email still works, and the T-004 tests pass against production.
- A rollback has been rehearsed or clearly documented with exact records.
