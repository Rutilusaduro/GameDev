> **ARCHIVED — pre–Hall Pass design notes.** Canonical RA dorm design: `GAME_BIBLE.md`, `DESIGN_BIBLE.md`, `HANDOFF.md`. Content below is historical.

# Fiona — Artisan Gallery Revision (v2)

**Supersedes:** `living_canvas` (v1) in §36  
**Path id:** `artisan_gallery`  
**Display title:** Artisan Gallery / Gallery of Abundance

## User direction

> Artisan gallery of fattening — Fiona fattens people, takes pictures of fat people in the world, records fattening artistically.

## Three-agent quick pass

**Alex:** v1 was too self-focused. v2 is **Nadia meets Fiona meets Homestead** — subject arcs + field photography + exhibitions. Three activity types create a triangle: **Studio** (fatten documented subjects), **Field** (candid abundance), **Exhibition** (monetize + scandal). Fiona still gains when she eats on set — she's not absent from the fetish, she's the **hand feeding the lens**.

**Jordan:** `galleryState.subjects[]` mirrors Nadia's psych subject but with `photos[]` and `stageSnapshots[]`. Field shoot hooks into `campusExploration` node id when available. `ArtisanGalleryModal.jsx` four tabs. Studio session = phased choice UI (not rhythm). Migration: `living_canvas` → `artisan_gallery` in save map.

**Raven:** Voice stays reverent-compositional but **outward-facing** — "Hold still — no, don't hold still." Field shots treat strangers' softness as found art. Living Room opening is the money beat: subject stands beside their timeline eating while Fiona loads her own plate. Consent choice matters for tone: ask = tender dominance; shoot first = delicious scandal.

## Core loop summary

| Loop | AP | What happens |
|------|-----|----------------|
| Enroll Subject | 0 | Pick classmate to fatten + document |
| Studio Session | 2 | Feed subject, shoot frames, Fiona eats on set |
| Field Shoot | 1 | Campus candids — fat in the world |
| Mount Exhibition | 2 | Hang prints, optional living subject, opening night |

Full spec: **GAME_BIBLE.md §36**.
