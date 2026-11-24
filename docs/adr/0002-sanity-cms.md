# Sanity as the content editing tool

Accepted November 23, 2026. A single clinic content editor edits pages, photos, banners, and archive records in Sanity's hosted studio. Publishing triggers a Cloudflare Pages deploy hook, and the site reads content at build time, so public pages never call Sanity at request time and never hold editing credentials.

Sanity was chosen over Git-based editors (Sveltia, Decap, TinaCMS) because the editor is not technical and should not need a GitHub account, and because the content editor needs to crop photos and set which part of a photo stays in view. Storyblok was the hosted alternative; Sanity's free tier fits one editor. Confirm current free-tier quotas before relying on them.

Consequence: content lives in Sanity's dataset, not the repo. Migration scripts import archive records into Sanity, and rollback means restoring a dataset revision and redeploying.
