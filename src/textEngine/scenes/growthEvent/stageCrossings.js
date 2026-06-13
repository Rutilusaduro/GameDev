// ═══════════════════════════════════════════════════════════════
// GROWTH EVENT — per-stage crossing lexicon (stages 2–11)
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../../engine.js';

// FULL SENTENCE — one cell per endStage 2-11
registerPool('grow.crossing', [
  { when: { endStage: 2 }, text: [
    'Soft — the first real curve, the first honest waistband.',
    'She is Soft now, plush where she was angular.',
    'Softness settles in; the mirror stops lying.',
  ] },
  { when: { endStage: 3 }, text: [
    'Chubby — rounded belly, rounder face, denial harder to maintain.',
    'Chubby fits; clothes that used to be easy now require negotiation.',
    'She has crossed into Chubby, and her body announces it.',
    'Chubby — the dining hall portions finally show on her.',
    'Chubby now: waistbands dig, thighs brush, cheeks fill.',
  ] },
  { when: { endStage: 4 }, text: [
    'Plump — a real belly, a real waddle beginning.',
    'Plump settles over her frame like a decision made.',
    'She is Plump; shirts ride up without asking.',
  ] },
  { when: { endStage: 5 }, text: [
    'Heavy — chairs complain, stairs wind her.',
    'Heavy now: belly forward, arms thick, movement slower.',
    'She has grown Heavy, and gravity feels personal.',
  ] },
  { when: { endStage: 6 }, text: [
    'Fat — the word lands without cruelty, only accuracy.',
    'Fat: rolls when she shifts, breath audible on effort.',
    'She crosses into Fat, and the room feels smaller.',
    'Fat now — waddle, jiggle, the scale a formality.',
    'Fat — her body owns the space it occupies.',
  ] },
  { when: { endStage: 7 }, text: [
    'Very Fat — belly toward knees, doorways a project.',
    'Very Fat: movement deliberate, every step a commitment.',
    'She is Very Fat; standard furniture is a memory.',
  ] },
  { when: { endStage: 8 }, text: [
    'Enormous — couch-sized, car-sized, effort-sized.',
    'Enormous: she fills a frame that used to hold a person and a life.',
    'Enormous now — getting up requires leverage and will.',
    'Enormous — her belly rests on her thighs like furniture.',
    'Enormous: the world rearranges around her mass.',
  ] },
  { when: { endStage: 9 }, text: [
    'Colossal — hallways narrow, presence vast.',
    'Colossal: reinforced chairs and reinforced attention.',
    'She has grown Colossal; shuffling is the fastest travel.',
  ] },
  { when: { endStage: 10 }, text: [
    'Blob — immobile warmth, a landscape more than a body.',
    'Blob: spread soft, pinned by her own abundance.',
    'She is a Blob now — the room works around her.',
    'Blob — movement nearly gone, fullness nearly total.',
    'Blob: an endless soft center of gravity.',
  ] },
  { when: { endStage: 11 }, text: [
    'Leviathan — mythic, impossibly vast, divine in sheer scale.',
    'Leviathan: transcended human proportion, ancient and heavy.',
    'She crosses into Leviathan; the air feels thicker around her.',
    'Leviathan — rolls without end, power without mobility.',
    'Leviathan: the ultimate threshold, and she is still growing.',
  ] },
  { when: {}, text: ['She has crossed into a new weight class.'] },
]);
