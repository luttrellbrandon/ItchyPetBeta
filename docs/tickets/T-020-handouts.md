# T-020 Patient handouts

**Stage:** 1 Core content · **Depends on:** T-005 · **Type:** UI + content

## Goal

Rebuild the patient handouts page as an accessible download list.

## Scope

- **`download` schema:** title, description, file (Sanity asset), last review date, rights status, related services.
- **Import the six PDFs:**
  - Why Does My Pet Itch
  - Intradermal Allergy Testing
  - Cutaneous Adverse Food Reaction
  - Atopic Dermatitis
  - Flea Allergy Dermatitis (source filename `bio.pdf`; give it a descriptive filename)
  - Treatment Options for Environmental Allergies in Pets
- Each link shows its descriptive title, file type and size, for example "Atopic Dermatitis (PDF, 240 KB)".
- Old PDF URLs (`/wp-content/...`) redirect to the new asset URLs. Add those paths to T-004's map.
- **Route:** `/new-patients/handouts/`.
- `handout_download` analytics hook (wired up in T-050).

## Acceptance criteria

- All six PDFs download from the new site, and their old URLs redirect.
- Replacing a PDF in Sanity updates the link with no code change.
