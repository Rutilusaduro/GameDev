// The Squad — Lead: A1 Mobile | Support: A7 Artisan, A5 Editor
// ═══════════════════════════════════════════════════════════════
// GARMENT LEXICON — clothing described by how it is coping, not by
// how big she is (fit state and stage diverge on purpose).
// Shape: CLAUSE — participial, lowercase, reads after a comma.
// Keys: fitTop / fitBottom / fitWaist (WORD_GRANULAR_ENGINE_PLAN §4.4).
// Intact-state variants forbid the burst fact so a garment that failed
// earlier in the scene is never described whole again.
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../engine.js';

// ── word.garment.top ──────────────────────────────────────────
registerPool('word.garment.top', [
  { when: { fitTop: 'loose' }, forbids: { 'garment.top': 'burst' }, text: [
    'her top hanging with room she has not grown into yet',
    'fabric drifting loose around her frame',
    'her shirt still generous at every seam',
  ] },
  { when: { fitTop: 'fitted' }, forbids: { 'garment.top': 'burst' }, text: [
    'her top sitting clean and easy across her',
    'the fabric following her lines without comment',
    'her shirt fitting the way the label promised',
  ] },
  { when: { fitTop: 'snug' }, forbids: { 'garment.top': 'burst' }, text: [
    'her top settling close, honest about the new softness',
    'the fabric smoothing itself over curves it did not used to meet',
    'her shirt beginning to report everything underneath',
  ] },
  { when: { fitTop: 'straining' }, forbids: { 'garment.top': 'burst' }, text: [
    'her top straining across the bust with every breath',
    'buttons holding their line under visible protest',
    'the fabric pulled to a gloss over her curves',
  ] },
  { when: { fitTop: 'straining', shameTierMin: 2 }, weight: 2, forbids: { 'garment.top': 'burst' }, text: [
    'her arms crossed over the gaps her shirt keeps opening',
    'the strained fabric she keeps tugging down and pretending not to',
  ] },
  { when: { fitTop: 'straining', corruption: [2] }, weight: 2, forbids: { 'garment.top': 'burst' }, text: [
    'the strain across her chest worn like jewelry',
    'her top stretched taut and left that way on purpose',
  ] },
  { when: { fitTop: 'failing' }, forbids: { 'garment.top': 'burst' }, text: [
    'a seam at her side giving up thread by thread',
    'her top hiked past the soft crescent it can no longer cover',
    'the buttonholes stretched to slots, each button barely moored',
  ] },
  { when: { fitTop: 'burst' }, text: [
    'the ruin of her top conceding to the body inside it',
    'her shirt open where the buttons used to argue',
    'soft skin showing through what is left of the seams',
  ] },
  { when: {}, text: [
    'her clothes doing quiet arithmetic against her curves',
    'the fabric negotiating with the body it was issued',
    'her outfit keeping its own count of her changes',
  ] },
]);

// ── word.garment.bottom ───────────────────────────────────────
registerPool('word.garment.bottom', [
  { when: { fitBottom: 'loose' }, forbids: { 'garment.bottom': 'burst' }, text: [
    'her jeans sitting slack at the hip',
    'denim with slack she has yet to claim',
    'her pants riding loose enough to need a belt',
  ] },
  { when: { fitBottom: 'fitted' }, forbids: { 'garment.bottom': 'burst' }, text: [
    'her jeans doing their job without complaint',
    'denim moving with her, no argument yet',
    'her pants fitting like a settled agreement',
  ] },
  { when: { fitBottom: 'snug' }, forbids: { 'garment.bottom': 'burst' }, text: [
    'her jeans reading her thighs like a close second skin',
    'denim gone confidential about every new curve',
    'her pants requiring a small negotiation to button',
  ] },
  { when: { fitBottom: 'straining' }, forbids: { 'garment.bottom': 'burst' }, text: [
    'her jeans straining pale at the seams down each thigh',
    'denim stretched glossy over the spread of her hips',
    'her pants creaking softly when she sits',
  ] },
  { when: { fitBottom: 'straining', corruption: [0] }, weight: 2, forbids: { 'garment.bottom': 'burst' }, text: [
    'the jeans she still insists are her size',
    'denim she lay down to zip this morning',
  ] },
  { when: { fitBottom: 'failing' }, forbids: { 'garment.bottom': 'burst' }, text: [
    'a back seam surrendering stitch by stitch',
    'her jeans open at the button and hidden under her top',
    'denim splitting a pale seam along one thigh',
  ] },
  { when: { fitBottom: 'burst' }, text: [
    'the split remains of her jeans easing their grip',
    'her thighs spilling through denim that finally quit',
    'what is left of her pants keeping only ceremonial hold',
  ] },
  { when: {}, text: [
    'her lower half testing the patience of the seams',
    'the denim keeping score against her hips',
    'her clothes conceding ground below the waist',
  ] },
]);

// ── word.garment.waist ────────────────────────────────────────
registerPool('word.garment.waist', [
  { when: { fitWaist: 'loose' }, forbids: { 'garment.waist': 'burst' }, text: [
    'her waistband sitting easy, a finger of room to spare',
    'the waist of her clothes still ahead of her appetite',
  ] },
  { when: { fitWaist: 'fitted' }, forbids: { 'garment.waist': 'burst' }, text: [
    'her waistband resting flush and untroubled',
    'the waist seam lying flat, for now',
  ] },
  { when: { fitWaist: 'snug' }, forbids: { 'garment.waist': 'burst' }, text: [
    'her waistband pressing a soft line into new softness',
    'the button at her waist asking politely for consideration',
    'a faint red seam-mark where the waistband held all day',
  ] },
  { when: { fitWaist: 'straining' }, forbids: { 'garment.waist': 'burst' }, text: [
    'her waistband biting into the curve of her belly',
    'the button at her waist holding on technique alone',
    'soft flesh lapping quietly over the waistband',
  ] },
  { when: { fitWaist: 'straining', shameTierMin: 2 }, weight: 2, forbids: { 'garment.waist': 'burst' }, text: [
    'the waistband she undoes only when no one is looking',
    'a hand resting where the button digs, casually, she hopes',
  ] },
  { when: { fitWaist: 'straining', corruption: [2] }, weight: 2, forbids: { 'garment.waist': 'burst' }, text: [
    'the waistband bite she has learned to savor',
    'her belly allowed to rest wherever the waistband loses',
  ] },
  { when: { fitWaist: 'failing' }, forbids: { 'garment.waist': 'burst' }, text: [
    'the waist button trembling at the end of its thread',
    'her zipper descending on its own schedule',
    'the waistband folded under her belly and out of the fight',
  ] },
  { when: { fitWaist: 'burst' }, text: [
    'the sprung waistband resting open against her belly',
    'her waist freed of the button that used to mind it',
    'the soft round of her belly settling where the waistband gave',
  ] },
  // Fact path: the waistband failed THIS scene (dimension still lags at the
  // pre-failure fit state, so this variant carries the continuity).
  { when: {}, requires: { 'garment.waist': 'burst' }, weight: 6, text: [
    'the sprung waistband resting open against her belly',
    'her freshly liberated waist making the most of the room',
    'the burst waistband already a settled fact of the afternoon',
  ] },
  { when: {}, text: [
    'her waistband keeping honest measurements',
    'the waist of her clothes reporting the week faithfully',
    'her middle and her waistband in ongoing talks',
  ] },
]);

// ── garment.event.waistFail — the continuity exemplar ─────────
// Shape: FULL SENTENCE. Narrates the failure AND writes the fact, so every
// later slot in the scene stays consistent (intact-waist clauses above are
// forbidden once garment.waist is burst).
registerPool('garment.event.waistFail', [
  { when: {}, asserts: { 'garment.waist': 'burst' }, text: [
    'The button at her waist departs with a soft tok and skitters under the desk.',
    'Her waistband gives all at once — a snap, a sigh of released fabric, relief.',
    'The zipper surrenders its last teeth and the waistband springs wide.',
  ] },
  { when: { corruption: [0] }, weight: 2, asserts: { 'garment.waist': 'burst' }, text: [
    'The button goes. She grabs at the gap, cheeks hot, a beat too late.',
  ] },
  { when: { corruption: [2] }, weight: 2, asserts: { 'garment.waist': 'burst' }, text: [
    'The button gives up. She watches it roll away and does not move to fetch it.',
  ] },
  { when: { stageMin: 7 }, weight: 2, asserts: { 'garment.waist': 'burst' }, text: [
    'The waistband parts before the button even gets a say — fabric conceding to mass.',
  ] },
]);
