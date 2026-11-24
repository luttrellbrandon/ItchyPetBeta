# Prerender the public website on Cloudflare Pages

Accepted during discovery on November 16, 2026. Use Svelte with TypeScript and DaisyUI and generate HTML for public pages, with client navigation afterward. The user accepted prerendering over a strictly client-rendered SPA to support discovery, social previews, and direct links while preserving static hosting on Cloudflare Pages. A CMS will supply content at build time; its vendor remains undecided.

The public website does not require a custom patient backend in this release. Appointment, prescription, and skin allergy questionnaire surfaces remain inactive previews. Staff editing is a CMS concern; patient records and operational task tracking require a later design. This boundary prevents a public marketing rewrite from implicitly becoming a clinical workflow system.
