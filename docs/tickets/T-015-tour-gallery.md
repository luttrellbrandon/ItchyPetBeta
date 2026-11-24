# T-015 Facility tour gallery

**Stage:** 1 Core content · **Depends on:** T-005 · **Type:** UI + content

## Goal

Rebuild Take a Tour as an accessible responsive gallery, using a gallery component that T-018 reuses.

## Scope

- **`gallery` schema:** title, intro, and an ordered list of items. Each item has an image, alt text and caption.
- **`Image_Gallery` component:** responsive grid with a lightbox built on `<dialog>`. Lightbox requirements:
  - labelled by the image caption
  - previous/next buttons with accessible names, plus arrow keys
  - Escape closes it, and focus returns to the thumbnail that opened it
  - "Image 3 of 12" announced politely
  - no autoplay
- Swipe to change images on touch screens, with buttons as well.
- Import the facility photos from `discovery/` into Sanity assets.
- **Route:** `/new-patients/tour/`.

## Acceptance criteria

- The gallery works with keyboard only, touch only and a screen reader.
- Thumbnails are lazy-loaded and the full images load only when opened.
- With JavaScript disabled, it falls back to a list of images with captions.
