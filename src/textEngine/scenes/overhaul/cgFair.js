// The Squad — Lead: A5 Editor | Support: A1 Mobile, A6 Slender
// Slot-composed CG binge/corkboard + fair-day beats. Prefer these over leftover tables.
import { registerPool, render, createContext } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';

registerPool('cg.binge.scene', [
  { when: {}, text: [
    '{cg.binge.setup} {cg.binge.body}',
    '{cg.binge.body} {cg.binge.setup}',
    '{cg.binge.setup}\n\n{cg.binge.body}',
  ]},
]);

registerPool('cg.binge.setup', [
  { when: {}, text: [
    'Priya sets the number she intends to beat. The food is already out. The drive is the meal.',
    'Corkboard on the wall. Scale in the corner. She eats like the photos are watching.',
    'She does not call it a binge. She calls it catching up. The plate knows better.',
  ]},
]);

registerPool('cg.binge.body', [
  { when: {}, text: [
    '{word.size} of her takes the chair. Soft mass working. She wants the extra witnessed.',
    'Belly first. She eats through the target and then a little past it, on purpose.',
    'The week lands in her middle. She checks the number the way some people check a rival.',
  ]},
  { when: { stageMin: 6 }, weight: 2, text: [
    'There is a lot of her to catch up with. She treats that as the assignment.',
  ]},
]);

registerPool('cg.corkboard.scene', [
  { when: {}, text: [
    '{cg.corkboard.setup} {cg.corkboard.body}',
    '{cg.corkboard.body} {cg.corkboard.setup}',
    '{cg.corkboard.setup}\n\n{cg.corkboard.body}',
  ]},
]);

registerPool('cg.corkboard.setup', [
  { when: {}, text: [
    'Pins, Polaroids, a waist she has already outgrown in the oldest shot.',
    'The board is a threat map. She stands in front of it and eats anyway.',
    'Someone on the wall is heavier in the newest print. She files that as fuel.',
  ]},
]);

registerPool('cg.corkboard.body', [
  { when: {}, text: [
    'She wants to be the biggest fact on the board. The food is how she argues.',
    '{word.size} of her is already winning a few of the photos. She wants the rest.',
    'She taps a rival print, then reaches for more. The drive has a taste.',
  ]},
]);

registerPool('fair.day.open', [
  { when: {}, text: [
    '{fair.day.setup} {fair.day.body}',
    '{fair.day.body} {fair.day.setup}',
    '{fair.day.setup}\n\n{fair.day.body}',
  ]},
]);

registerPool('fair.day.setup', [
  { when: {}, text: [
    'Fairgrounds air. Number pinned. The scale is a recipe she intends to beat.',
    'Competition tank. She wants you watching the number land.',
    'Last year is a rumor. This year is mass. She steps toward the platform.',
  ]},
]);

registerPool('fair.day.body', [
  { when: {}, text: [
    '{word.size} of her is the entry. Soft mass, heat, the extra the judges will weigh.',
    'Belly first onto the platform. She does not apologize for the occupancy.',
    'You read the week on her before the scale does. {word.body} arriving early.',
  ]},
]);

registerPool('fair.day.judging', [
  { when: {}, text: [
    '{fair.day.setup} The judges write. She stays in the lights like furniture that won.',
    '{fair.day.body} Darcy is a fact she is revising in public.',
    'The ribbon is a maybe. The mass is not. She waits, already a little hungrier.',
  ]},
]);

registerPool('fair.day.afterparty', [
  { when: {}, text: [
    '{fair.day.setup} After the lights, the food. She treats the afterparty as a second weigh-in.',
    '{fair.day.body} Plates travel. She is the larger half of every arrangement.',
    'Someone brought dessert. She brought appetite. The hall leftovers find her anyway.',
  ]},
]);

registerPool('fair.day.result', [
  { when: {}, text: [
    'The number moves. She files it. The next plate is already a decision.',
    'Scale, then food. She likes the order. You stay until the extra of her has arrived.',
    'She checks herself the way some people check a score. Right on time.',
  ]},
]);

registerPool('cg.selfReview.scene', [
  { when: {}, text: [
    '{cg.selfReview.setup} {cg.selfReview.body}',
    '{cg.selfReview.body} {cg.selfReview.setup}',
    '{cg.selfReview.setup}\n\n{cg.selfReview.body}',
  ]},
]);

registerPool('cg.selfReview.setup', [
  { when: {}, text: [
    'Tape, scale, the board. She measures herself like a rival she intends to beat.',
    'Priya takes her own number. The drive likes being quantified.',
    'She wraps the tape and does not flinch at what it says.',
  ]},
]);

registerPool('cg.selfReview.body', [
  { when: {}, text: [
    '{word.size} of her is the data. Soft mass, heat, a waist the oldest photo no longer owns.',
    'She files the measurement next to the threat map. Fuel. Then she wants food.',
    'The number is hers. She wants it bigger next week. You are here to witness the plan.',
  ]},
]);

registerPool('cg.measure.scene', [
  { when: {}, text: [
    '{cg.measure.setup} {cg.measure.body}',
    '{cg.measure.body} {cg.measure.setup}',
    '{cg.measure.setup}\n\n{cg.measure.body}',
  ]},
]);

registerPool('cg.measure.setup', [
  { when: {}, text: [
    'She measures a hall resident the way she measures a threat. Tape, then the board.',
    'Comparison night. Priya wants the numbers honest. The tape does not lie.',
    'Another body on the ledger. She stands close enough to feel the difference.',
  ]},
]);

registerPool('cg.measure.body', [
  { when: {}, text: [
    'She wants to be the biggest fact in the comparison. The tape is how she argues.',
    '{word.size} of her against the other set of numbers. She files whoever is winning.',
    'Threat or confirmation. Either way she reaches for more after the last category.',
  ]},
]);

registerPool('fair.train.scene', [
  { when: {}, text: [
    '{fair.train.setup} {fair.train.body}',
    '{fair.train.body} {fair.train.setup}',
    '{fair.train.setup}\n\n{fair.train.body}',
  ]},
]);

registerPool('fair.train.setup', [
  { when: {}, text: [
    'Training plate. Partner across. Mary Jane treats the session like a weigh-in rehearsal.',
    'Pre-fair work. Food, pride, a body she intends to walk onto the scale heavier.',
    'She trains by eating. The collaborator keeps pace. The fair is the exam.',
  ]},
]);

registerPool('fair.train.body', [
  { when: {}, text: [
    '{word.size} of her takes the session. Soft mass working. Pride is a calorie count.',
    'She eats through the partner\'s pace and then a little past it. Fair Day will notice.',
    'Belly first. The trophy wall will want a photo. She is already posing by chewing.',
  ]},
]);

function fairCtx(student, week, opts = {}) {
  return buildTextContext({
    subject: student,
    week,
    globals: {
      featureId: 'fair_day',
      fairInfluence: opts.influenceKey || 'None',
      stageIdx: opts.stageIdx ?? 0,
      ...(opts.globals || {}),
    },
  });
}

function prefer(poolKey, ctx) {
  const line = render(`{${poolKey}}`, ctx)?.trim();
  if (line && !line.includes('{unresolved}')) return line;
  return '';
}

export function renderCgBinge(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = createContext({ subject: student, week, globals: opts.globals || {} });
  const scene = prefer('cg.binge.scene', ctx);
  if (!scene) return '';
  if (opts.kitchen) {
    const kit = prefer('overhaul.cg.kitchen', ctx);
    return kit ? `${kit} ${scene}` : scene;
  }
  return scene;
}

export function renderCgCorkboard(student, week = 1) {
  if (!student) return '';
  const ctx = createContext({ subject: student, week });
  return prefer('cg.corkboard.scene', ctx);
}

export function renderFairBeat(slot, student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = fairCtx(student, week, opts);
  const key = slot === 'weighin.open' ? 'fair.day.open'
    : slot === 'judging' ? 'fair.day.judging'
    : slot === 'afterparty.open' ? 'fair.day.afterparty'
    : slot === 'train' ? 'fair.train.scene'
    : 'fair.day.result';
  return prefer(key, ctx);
}

export function renderCgSelfReview(student, week = 1) {
  if (!student) return '';
  const ctx = createContext({ subject: student, week });
  return prefer('cg.selfReview.scene', ctx);
}

export function renderCgMeasure(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = createContext({
    subject: student,
    week,
    globals: { targetName: opts.targetName || 'a resident' },
  });
  return prefer('cg.measure.scene', ctx);
}
