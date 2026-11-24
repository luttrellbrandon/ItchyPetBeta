# Brand and visual evidence

Observed November 16, 2026 from the [current homepage](https://itchypetvet.com/), archived HTML/styles, rendered computed styles, and the downloaded clinic logo. Values below distinguish observed colors from proposed application roles. The practice has confirmed preserving the brand; these are not an official brand manual.

## Observed colors

| Color | Source / observed role |
| --- | --- |
| `#38A8A5` | Homepage appointment button and footer background; primary teal |
| `#2F7A84` | Dark teal section backgrounds |
| `#EEFBFA` | Pale background present in source styling |
| `#031424` | Homepage contact paragraph text |
| `#282828` | General text and headings |
| `#FFFFFF` | Header/surfaces and inverse text |
| `#F36C2B` | Global link color/theme accent; observed in computed link styles |
| `#0978A6` | Common blue pixel sampled from the raster logo illustration |
| `#234F74` | Representative navy pixel sampled from the raster logo text; antialiasing creates nearby values |

Source CSS also contains bright pink, yellow, blue and cyan theme options. Frequency in CSS does not establish that those colors are core clinic brand colors. The current promotion graphic has its own pink/teal palette.

## Typography

Rendered homepage headings/navigation use **Noto Serif**; body copy and buttons use **Open Sans**. Observed desktop body size is 16px, menu text 12px, hero heading 50px, and typical h3 approximately 23px. Preserve the font pairing but propose more legible menu sizing and fluid heading sizes. Google Fonts stylesheet/font requests are archived where accessible; verify licenses and font subsets before self-hosting.

## Proposed semantic mapping

Use a custom DaisyUI theme rather than mixing theme presets ([custom theme documentation](https://daisyui.com/docs/themes/)). The final theme is implementation work; this mapping preserves teal while improving text contrast.

| Token / purpose | Proposed value |
| --- | --- |
| Primary control background | `#2F7A84` |
| Primary content | `#FFFFFF` |
| Brand teal / secondary surface | `#38A8A5` |
| Secondary content | `#031424` |
| Neutral / logo-aligned navy | `#234F74` |
| Base surface | `#FFFFFF` |
| Alternate surface | `#EEFBFA` |
| Body text | `#031424` |
| Decorative accent | `#F36C2B` |

Calculated WCAG contrast ratios from sRGB values: white on brand teal is **2.87:1**; white on dark teal is **4.96:1**; dark ink on brand teal is **6.47:1**; navy on white is **8.60:1**. Orange on white is approximately **3.00:1**, so use a darker accessible text color for normal-sized links. This explains why preserving brand colors does not mean copying every existing foreground/background pairing. Actual focus, hover, disabled, error and overlay states still need verification.

## Assets

Browse the [local image catalog](../discovery/2026-11-16/asset-gallery.html) and [asset manifest](../discovery/2026-11-16/assets.csv). The manifest records original URL, referring pages/styles, local path, content type, dimensions where available, byte count, SHA-256, and capture assessment.

Recovered images include the clinic logo/favicon, staff group hero, doctor/staff portraits, clinic exterior/interior tour photos, before/after patient photos, background graphics, a pharmacy button and the current promotion flyer. Files remain at their downloaded resolution; many originals include multiple smaller variants. The logo is a 525 × 200 PNG; request a vector master before enlarging it for print or large displays.

84 valid image responses and six PDFs were saved. 234 linked asset requests returned empty bodies and four failed; these are explicitly flagged rather than counted as recovered assets. Examples include missing responsive image derivatives, video thumbnails, one missing patient monitoring photo, and failed legacy map requests. Map embeds and third-party scripts are source evidence, not clinic-owned reusable media.

Keep originals unchanged. At implementation, choose an appropriate source, create optimized responsive variants, supply captions/alt text, and record practice confirmation of patient photography, photographer, staff portrait and syndicated content rights. Do not use downloaded scripts/plugins as application dependencies.
