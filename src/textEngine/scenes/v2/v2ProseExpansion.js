// The Squad — Lead: A5 Editor | Support: A1 Mobile, A2 Psych
// V2.0 global prose depth pass — additional variants for high-traffic scenes
import { registerPool } from '../../engine.js';

// ── Dinner depth additions ────────────────────────────────────
registerPool('dinner.v2.depth', [
  { when: { stageMin: 6 }, text: [
    'The meal arrives like weather — course after course, heat rising, her belly swelling warm and forward beneath the tablecloth.',
  ]},
  { when: { stageMin: 3 }, text: [
    'She eats with the focus of someone who has stopped pretending this is casual. Every bite lands.',
  ]},
  { when: {}, text: [
    'The restaurant hums around her appetite. She takes her time. She takes seconds.',
  ]},
]);

// ── Feed reaction depth ───────────────────────────────────────
registerPool('feed.v2.depth', [
  { when: { stageMin: 7 }, text: [
    'Fullness spreads through her like a tide — slow, heavy, undeniable. She breathes around it and reaches for more anyway.',
  ]},
  { when: { corruptionMin: 50 }, text: [
    'She eats without the old hesitation. Want has become habit. Habit has become identity.',
  ]},
  { when: {}, text: [
    'Warmth gathers in her belly. She leans into it.',
  ]},
]);

// ── Talk depth additions ──────────────────────────────────────
registerPool('talk.v2.depth', [
  { when: { stageMin: 5 }, text: [
    'She talks about food the way other people talk about plans — eagerly, specifically, already leaning toward yes.',
  ]},
  { when: {}, text: [
    'Something in her voice has softened toward appetite. She does not name it. You hear it anyway.',
  ]},
]);

// ── Weigh-in depth additions ──────────────────────────────────
registerPool('wi.v2.depth', [
  { when: { stageMin: 8 }, text: [
    'The number lands like a bell. Her body does not argue. It has been waiting to be counted.',
  ]},
  { when: { stageMin: 4 }, text: [
    'She watches the scale with the calm of someone who already knows the answer and likes it.',
  ]},
  { when: {}, text: [
    'The weigh-in completes. Fullness of data. Warmth of fact.',
  ]},
]);

// ── Session depth additions ───────────────────────────────────
registerPool('session.v2.depth', [
  { when: { stageMin: 6 }, text: [
    'The session stretches. Her belly rises. Time becomes food becomes flesh.',
  ]},
  { when: {}, text: [
    'She keeps eating. You keep watching. The room gets warmer.',
  ]},
]);

// ── Week recap depth ──────────────────────────────────────────
registerPool('weekRecap.v2.depth', [
  { when: { stageMin: 5 }, text: [
    'Another week of settling into abundance. Her body remembers every bite.',
  ]},
  { when: {}, text: [
    'Growth continues — quiet, warm, certain.',
  ]},
]);

// ── Body portrait v2 sensory layer ────────────────────────────
registerPool('body.v2.sensory', [
  { when: { stageMin: 9 }, text: [
    'Warmth radiates from her in layers — belly, thighs, the soft architecture of a body that has become environment.',
  ]},
  { when: { stageMin: 5 }, text: [
    'She moves with the particular rhythm of added weight — slower, softer, more present in every step.',
  ]},
  { when: {}, text: [
    'Softness visible at every angle. Growth written in flesh.',
  ]},
]);
