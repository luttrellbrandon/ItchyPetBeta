# T-033 How-to videos

**Stage:** 2 Archive · **Depends on:** T-005, T-030 · **Type:** UI + content + migration

## Goal

Rebuild the how-to video hub, the cat and dog categories, and the 12 video pages.

## Scope

- **`video` schema:** title, slug, species (cat, dog, both), topic, embed URL, thumbnail, description, transcript, credit, legacy path.
- **Import:**
  - 12 species videos: pill, liquid medicine, ear drops, eye drops, eye ointment and tooth brushing, each for cats and for dogs
  - the hub's two immunotherapy YouTube videos
- **Routes:**
  - `/pet-health/videos/`: the hub, with a species filter using buttons with `aria-pressed`, or links
  - `/pet-health/videos/cats/` and `/pet-health/videos/dogs/`
  - `/pet-health/videos/<slug>/`
- **Embeds:** use a click-to-load poster for YouTube (privacy-enhanced `youtube-nocookie.com` mode) so third-party scripts don't load until the visitor clicks. The poster button is labelled "Play video: <title>". Show a transcript or description below each embed when one exists.
- The source's "category chooser" form becomes plain links; no form submission.

## Acceptance criteria

- All 14 videos play, and their legacy URLs redirect.
- Pages make no YouTube network requests before the visitor clicks play.
- Video pages that have no transcript are listed for T-060.
