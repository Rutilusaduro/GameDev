// The Squad — Lead: A5 Editor | Support: A1 Mobile, A6 Slender
// Hive visit + collab stage/payoff beats. Prefer these over leftover strings.
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';

registerPool('hive.visit.scene', [
  { when: {}, text: [
    '{hive.visit.setup} {hive.visit.body}',
    '{hive.visit.body} {hive.visit.setup}',
    '{hive.visit.setup}\n\n{hive.visit.body}',
  ]},
]);

registerPool('hive.visit.setup', [
  { when: {}, text: [
    'Central Nest. Tribute in your hands. Maya\'s quiet gravity accepts it before she speaks.',
    'You bring food to the nest. The Hive records the warmth. She is already seated.',
    'Lavender light, delivery bags, a body that makes the cushions look borrowed.',
  ]},
]);

registerPool('hive.visit.body', [
  { when: {}, text: [
    '{word.size} of her takes the nest first. Soft mass, heat, the extra the Hive is for.',
    'She eats what you brought like the floor sent it up as a tithe. It did.',
    'Belly settling. Biomass filing itself. She wants you to watch the swallow.',
  ]},
  { when: { stageMin: 8 }, weight: 2, text: [
    'At this size the nest is a geography. You bring the tribute to her. She does not get up.',
  ]},
]);

registerPool('collab.stageup.scene', [
  { when: {}, text: [
    'The number crosses on stream. Chat finds it. She lets the camera hold the extra.',
    'Stage up, live. Soft mass arriving while the partner matches her bite for bite.',
    'She hits the next band on camera. Wren is already in the comments like furniture.',
  ]},
]);

registerPool('collab.payoff.scene', [
  { when: {}, text: [
    'Stream over. Two bodies heavier. Chat still climbing. She wants the next collab queued.',
    'Pounds on her, pounds on the partner. The table is a rumor. The chairs kept score.',
    'Wrap. Heat, leftover plates, two middles that did the work in public.',
  ]},
]);

function prefer(poolKey, ctx) {
  const line = render(`{${poolKey}}`, ctx)?.trim();
  if (line && !line.includes('{unresolved}')) return line;
  return '';
}

export function renderHiveVisit(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { featureId: 'delivery_hive', ...(opts.globals || {}) },
  });
  return prefer('hive.visit.scene', ctx);
}

export function renderCollabStageUpPool(kylie, partner, week = 1, stageIdx = 0) {
  if (!kylie) return '';
  const ctx = buildTextContext({
    subject: kylie,
    ref: partner,
    week,
    globals: { featureId: 'collab_stream', collabStage: stageIdx },
  });
  return prefer('collab.stageup.scene', ctx);
}

export function renderCollabPayoffPool(kylie, partner, week = 1, stageIdx = 0) {
  if (!kylie) return '';
  const ctx = buildTextContext({
    subject: kylie,
    ref: partner,
    week,
    globals: { featureId: 'collab_stream', collabStage: stageIdx },
  });
  return prefer('collab.payoff.scene', ctx);
}
