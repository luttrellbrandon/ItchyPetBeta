# T-011 Locations, hours and contact

**Stage:** 1 Core content · **Depends on:** T-010 · **Type:** UI + content · **Clinic input:** authoritative Rockledge hours and street spelling

## Goal

Each location is stored in one place and reused everywhere: location pages, footer, homepage and contact page.

## Scope

- **`location` schema:** name, short name, code (`altamonte`, `rockledge`), address, phone, fax, email, weekly hours (one structured entry per day), notes (for example "Wednesdays, Thursdays and Fridays only; call the main office for appointments"), directions URL, map embed or static map, photo.
- **Routes:**
  - `/locations/`: directory of both offices
  - `/locations/altamonte/`: the main office
  - `/locations/rockledge/`: the satellite office
  - `/contact/`: phone, email and location cards; no contact form unless the clinic asks
- Show hours in a real `<table>` with row headers, or a `<dl>`, not plain text lines.
- Phone numbers are `tel:` links, and "Get directions" opens maps in a new tab with that stated.
- Map embeds get a `title`, and there is a text address and directions link next to each map, so the page works without the embed.
- Import both locations from the archived source pages. Where the sources conflict, leave a validation flag rather than guessing:
  - Rockledge Wednesday/Thursday closing time: 4:30 on the detail page, 3:30 in the footer
  - Rockledge street: "Schenk" vs "Schenck"
- Plug the location records into T-010's footer slot.

## Acceptance criteria

- Changing Rockledge hours in Sanity updates the location page, footer and homepage after one publish.
- The build warns (but doesn't fail) while the Rockledge flag is unresolved. T-052 requires it to be cleared.
- Source routes in ROUTE-MAP.md for locations and contact redirect correctly.
