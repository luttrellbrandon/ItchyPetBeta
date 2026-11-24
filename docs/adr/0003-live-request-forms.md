# Live request forms through a Pages Function

Accepted November 23, 2026; amends ADR 0001's "no backend" boundary. The current site's prescription request form and skin allergy questionnaire are live, so replacing the site with non-submitting previews would remove a service clients use. These two forms will submit to a Cloudflare Pages Function that validates input, applies spam protection, and emails the request to the clinic. The function does not store submissions.

Rejected: keeping previews only, which drops online refills at launch, and outside form services, which add a vendor that handles client and pet data. Appointments keep linking to the external booking provider.

Until the function, spam protection, recipient address, and the clinic's sign-off on handling client data are in place, the forms remain clearly labeled previews that never send or store entered values. The rest of the site stays prerendered and static.
