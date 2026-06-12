// wi.* arrival slots — pace, movement, doorway, body/face/sound clauses
import { registerPool } from '../../engine.js';

// ── wi.pace — adverbial lead-in ───────────────────────────────

registerPool('wi.pace', [
  { when: { mood: ['happy', 'excited', 'cheerful'] }, text: ['', 'brightly', 'with easy energy'] },
  { when: { mood: ['tired', 'stressed'] }, text: ['slowly', 'with visible effort', ''] },
  { when: { hungerTierMin: 3 }, text: ['urgently', 'with restless hunger', ''] },
  { when: { stageMin: 6 }, text: ['', 'slowly', 'with deliberate care'] },
  { when: {}, text: ['', 'quietly', 'without hurry', 'at her usual pace'] },
]);

// ── wi.moveVerb — how she crosses the threshold ───────────────

registerPool('wi.moveVerb', [
  { when: { stageMax: 1 }, text: ['walks in', 'slips through the door', 'arrives with a light step', 'comes in quick and slight'] },
  { when: { stage: [2, 3] }, text: ['walks in soft', 'enters with a thickened gait', 'comes in rounded', 'arrives and settles into motion'] },
  { when: { stage: [4, 5] }, text: ['enters plump and unhurried', 'rolls through the doorway', 'comes in heavy', 'walks in with unhurried weight'] },
  { when: { bodyType: 'pear', stageMin: 6 }, text: ['angles sideways through the doorway', 'enters with a slow rolling gait', 'waddles in'] },
  { when: { bodyType: 'apple', stageMin: 6 }, text: ['enters belly-first', 'walks in with a forward lean', 'comes in apple-shaped'] },
  { when: { stageMin: 8 }, text: ['negotiates the doorway', 'fills the frame before her face does', 'arrives monumentally vast'] },
  { when: { stage: [10, 11] }, text: ['settles at the doorway', 'exists at the doorway as warm abundance', 'arrives too vast to walk'] },
  { when: {}, text: ['walks in', 'comes in', 'enters', 'arrives'] },
]);

// ── wi.doorway — locale phrase (stage 8+ = negotiation) ───────

registerPool('wi.doorway', [
  { when: { stageMin: 8 }, text: ['— the doorway is a negotiation', 'through a doorway that feels narrow', 'while the frame protests'] },
  { when: { stageMin: 6 }, text: ['through the office door', 'into the room', ''] },
  { when: {}, text: ['through the door', 'into your office', ''] },
]);

// ── wi.bodyClause — participle / body showcase ────────────────

registerPool('wi.bodyClause', [
  { when: { bodyType: 'pear', stageMin: 4 }, text: [
    'her wide hips catching briefly in the door',
    'her lower half leading the way',
    'thighs brushing together with each step',
    'hips rolling with unhurried weight',
  ] },
  { when: { bodyType: 'pear', stageMin: 2, stageMax: 3 }, text: [
    'softness settling low at the hips',
    'thighs beginning to brush at the top',
    'her pear shape rounding out',
  ] },
  { when: { bodyType: 'apple', stageMin: 4 }, text: [
    'her belly leading, round and forward',
    'her middle straining at her waistband',
    'her gut swaying with the effort of walking',
  ] },
  { when: { bodyType: 'apple', stageMin: 2, stageMax: 3 }, text: [
    'a gentle rounding at the belly visible through her shirt',
    'waistline gone quietly round',
    'a small belly pooching forward',
  ] },
  { when: { bodyType: 'hourglass', stageMin: 4 }, text: [
    'top and bottom moving in counterpoint',
    'curves compressing slightly in the doorway',
    'hips and bust settling into generous proportion',
  ] },
  { when: { bodyType: 'topHeavy', stageMin: 4 }, text: [
    'her bust arriving before the rest of her',
    'chest heavy and forward on the climb',
    'breasts settling with visible weight',
  ] },
  { when: { bodyType: 'athletic', stageMin: 4 }, text: [
    'muscle buried under comfortable thickness',
    'power still visible under new softness',
    'thighs thicker than her training weight remembers',
  ] },
  { when: { stageMin: 6 }, text: [
    'belly past her hips, movement slow',
    'soft mass shifting with each step',
    'flesh settling in slow heavy rolls',
  ] },
  { when: { stageMin: 8 }, text: [
    'lower body filling the frame first',
    'vast curves jiggling once, then going still',
    'warm abundance pooling wherever she settles',
  ] },
  { when: {}, text: [
    'clothes sitting snugger than last month',
    'a softness you can see in how she moves',
    'weight visible in her gait',
    'the gain showing in her silhouette',
  ] },
]);

// ── wi.faceClause — expression / hunger / corruption ────────────

registerPool('wi.faceClause', [
  { when: { hungerTierMin: 3 }, weight: 2, text: [
    'a crazed, ravenous look in her eye',
    'eyes fixed on anything edible in the room',
    'jaw tight with hunger she is not naming',
  ] },
  { when: { inWithdrawal: true }, text: [
    'hands faintly shaky at her sides',
    'a brittle urgency behind her smile',
    'breathing a little too fast for the walk',
  ] },
  { when: { corruption: [2], stageMin: 4 }, text: [
    'a pleased, unselfconscious smile',
    'eyes on the scale like an old friend',
    'no apology in her expression',
  ] },
  { when: { corruption: [0], stageMin: 4 }, text: [
    'not quite meeting your eye',
    'a bright hello that does not reach her eyes',
    'careful composure doing visible work',
  ] },
  { when: { mood: ['nervous', 'stressed'] }, text: [
    'worry creasing her brow',
    'fingers worrying at her sleeve',
  ] },
  { when: {}, weight: 1, text: ['', '', ''] }, // ~50% empty via duplicate empties + pool RNG
]);

// ── wi.soundClause — floor / furniture registering weight ─────

registerPool('wi.soundClause', [
  { when: { stageMin: 8 }, text: ['the floorboards registering her', 'the office seeming to tilt toward her warmth'] },
  { when: { stageMin: 6 }, text: ['the floorboards registering her', 'chairs creaking when she passes'] },
  { when: { stageMin: 4 }, text: ['a faint creak from the hall', 'breathing heavier after the stairs'] },
  { when: {}, text: ['', '', ''] },
]);

// ── wi.arrival — composed entrance skeleton ───────────────────

registerPool('wi.arrival', [
  { when: {},
    text: ['{subject.name} {wi.pace} {wi.moveVerb} {wi.doorway}{join:wi.bodyClause,wi.faceClause|prefix:, }{join:wi.soundClause|prefix:, }.'],
  },
]);
