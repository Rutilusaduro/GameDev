// The Squad — Lead: A4 Architect | Support: A1 Mobile
// Sumo match — engine bridge for competitive_circuit evolved form.
import { registerDimension, registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import '../proseOverhaulPass3.js';
import {
  SUMO_RIVAL_NAME,
  SUMO_EXCHANGE_LINES,
  SUMO_CORNER_FEED,
  SUMO_BOUT_WON,
  SUMO_BOUT_LOST,
  SUMO_FILL_RING_TEXT,
  SUMO_MATCH_AFTERMATH,
  SUMO_PAYOFF_TEXT,
} from '../../../gameData/miniGames.js';

registerDimension('sumoStage', (ctx) => ctx.globals?.sumoStage ?? 0);
registerDimension('oppLbs', (ctx) => ctx.globals?.oppLbs ?? 340);
registerDimension('gainAccum', (ctx) => ctx.globals?.gainAccum ?? 0);
registerDimension('matchWon', (ctx) => ctx.globals?.matchWon ?? false);

registerPool('sumo.linger', [
  { when: { matchWon: true }, weight: 3, text: [
    'Dana resets. The belly does not. Only one of those is smaller.',
    'Dohyo dust on her thighs. Mass still arriving after the bout called itself over.',
  ] },
  { when: { stageMin: 9 }, weight: 2, text: [
    'Getting her off the clay is the rest of the match. She takes the minutes.',
    'Mawashi holds. Barely. She enjoys the barely.',
  ] },
  { when: {}, text: [
    'The ring keeps her outline after she leans back.',
    'Crowd noise fades. Fullness does not.',
    'She sits in leftover heat and lets the pounds finish arriving.',
  ] },
]);

registerPool('sumo.beat.clash', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Galley leftover still in her hips. The tachi-ai lands heavier for it.',
    'Kitchen tray from earlier. Clay underfoot. Both count when she hits.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'Night-round heat still in the middle. She uses it like extra mass on the charge.',
  ] },
  { when: { stageMax: 4 }, weight: 2, text: [
    'She hits lower than she meant to. The belly arrives a half-beat later and still wins the bump.',
    'Footwork is honest. The new softness is still learning the ring.',
  ] },
  { when: {}, text: [
    'Shoulder, belly, clay. She drives until Dana has to give ground or give air.',
    'The collision is meat and momentum. She likes how much of her is in it.',
    'She plants, then pours. Dana feels the pour first.',
  ] },
]);

registerPool('sumo.beat.growth', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Last night\'s tray plus this bout. The mawashi reports both.',
    'Leftover heat under silk. The next shove makes more of her.',
  ] },
  { when: { stageMin: 8 }, weight: 2, text: [
    'Mass keeps arriving after the clash names itself over. She lets it.',
    'Getting her set again is a ceremony. She enjoys the audience.',
  ] },
  { when: {}, text: [
    'The ring keeps a warm dent where she was. She is already more than that dent.',
    'She breathes like a door closing. The belly does not close.',
    'Pounds finish arriving while Dana resets her feet.',
  ] },
]);

registerPool('sumo.beat.line', [
  { when: { leftoverFed: true }, weight: 3, text: [
    '"Still heavy from the kitchen," she says, pleased, and sets again.',
  ] },
  { when: {}, text: [
    'Dana grunts. She answers with another inch of middle.',
    '"Again," she says, already settling her weight like furniture that fights.',
    'The crowd likes the wobble. She likes that they like it.',
  ] },
]);

registerPool('sumo.beat.scene', [
  { when: {}, text: [
    '{sumo.beat.clash} {sumo.beat.growth} {sumo.beat.line}',
    '{sumo.beat.clash} {sumo.beat.line} {sumo.beat.growth}',
    '{sumo.beat.growth} {sumo.beat.clash} {sumo.beat.line}',
  ] },
]);

registerPool('sumo.bout.won', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Dana steps out. Galley leftover plus this shove. The clay keeps both.',
    'Bout to her. Leftover heat still in the hips that did the pushing.',
  ] },
  { when: { stageMin: 8 }, weight: 2, text: [
    'Dana yields the ring. Getting {subject.name} celebrated is the rest of the bout.',
  ] },
  { when: {}, text: [
    'Dana\'s foot finds air. Bout to {subject.name}. The belly does not reset.',
    'She takes the clay. Dana takes the loss. Mass still arriving.',
    'Win on the board. Softness in the mawashi. She likes both.',
  ] },
]);

registerPool('sumo.bout.lost', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Dana keeps the ring. Leftover still in {subject.name}. The next corner will use it.',
  ] },
  { when: {}, text: [
    'Pushed out. She laughs anyway. The middle is already planning the replay.',
    'Dana takes the bout. {subject.name} takes the lesson in her lap.',
    'Loss on the clay. Appetite does not clock out with it.',
  ] },
]);

registerPool('sumo.fill', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'She expands into leftover heat and ring rope. Dana chooses the outside.',
    'Kitchen tray plus this spread. The dohyo reports both. Bout to her.',
  ] },
  { when: { stageMin: 8 }, weight: 2, text: [
    'She fills the ring until the ring is a rumor. Dana steps off. Courtesy.',
  ] },
  { when: {}, text: [
    'She expands until Dana has nowhere honest to stand. Bout to {subject.name}.',
    'Softness takes the clay. The opponent takes the hint and the outside.',
    'The ring was a circle. She makes it a seat. Dana leaves it.',
  ] },
]);

registerPool('sumo.corner', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Corner food on leftover heat. She eats like the next tachi-ai already started.',
    'Foil, then chanko. The mawashi learns the second sitting between bouts.',
  ] },
  { when: { stageMax: 4 }, weight: 2, text: [
    'Corner bites. She tugs silk that almost still works and keeps chewing.',
  ] },
  { when: {}, text: [
    'Corner feed. She takes it seated. The next bout will feel it.',
    'Between clashes, food. She treats the buckets like training load.',
    'She swallows, then sets her feet heavier. Dana watches the swallow.',
  ] },
]);

registerPool('sumo.aftermath.setup', [
  { when: { matchWon: true, leftoverFed: true }, weight: 4, text: [
    'Won, and still tasting the galley. Dana resets. The belly does not.',
  ] },
  { when: { matchWon: true }, weight: 3, text: [
    'Match to {subject.name}. Dust on her thighs. Mass still arriving.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'The clay is over. Leftover plus the bout sit in her like a ranking.',
  ] },
  { when: {}, text: [
    'Mawashi off enough to breathe. The ring keeps her outline.',
    'Crowd noise fades. Fullness does not.',
    'She sits in leftover heat and lets the pounds finish arriving.',
  ] },
]);

registerPool('sumo.aftermath.line', [
  { when: { matchWon: true }, weight: 3, text: [
    '"Again later," she tells Dana, pleased, already heavier than the opening.',
  ] },
  { when: {}, text: [
    'She palms the new weight like a medal the clay issued.',
    '"More," she says, which is also the score.',
    'Dana nods. The belly answers for both of them.',
  ] },
]);

registerPool('sumo.aftermath.scene', [
  { when: {}, text: [
    '{sumo.aftermath.setup} {sumo.aftermath.line}',
    '{sumo.aftermath.line} {sumo.aftermath.setup}',
    '{sumo.linger} {sumo.aftermath.setup}',
  ] },
]);

function stageText(arr, stageIdx) {
  const item = arr?.[stageIdx];
  return typeof item === 'string' ? item.trim() : '';
}

export function buildSumoCtx(student, week, stageIdx = 0, opts = {}) {
  return buildTextContext({
    subject: student,
    week,
    globals: {
      featureId: 'sumo_match',
      sumoStage: stageIdx,
      ...(opts.globals || {}),
    },
    ...opts,
  });
}

export function renderSumoLegacy(text, student, week, stageIdx = 0, opts = {}) {
  const line = typeof text === 'string' ? text.trim() : '';
  if (!line || !student) return line;
  const ctx = buildSumoCtx(student, week, stageIdx, opts);
  let out = appendV2Depth(line, 'sumoMatch', ctx, opts.v2DepthChance ?? 0.28);
  if (out?.trim() && Math.random() < (opts.lingerChance ?? 0.42)) {
    const linger = render('{sumo.linger}', ctx)?.trim();
    if (linger) out = `${out}\n\n${linger}`;
  }
  return out;
}

export function renderSumoOpening(stageIdx, student, oppLbs, week) {
  const ctx = buildSumoCtx(student, week, stageIdx, { globals: { oppLbs } });
  const scene = render('{sumo.beat.scene}', ctx)?.trim() || '';
  const raw = scene || `The first tachi-ai. You square up against ${SUMO_RIVAL_NAME} — ${oppLbs} pounds of veteran across the line from you. The crowd settles. Choose your opening.`;
  return renderSumoLegacy(raw, student, week, stageIdx, {
    globals: { oppLbs },
    v2DepthChance: 0.3,
  });
}

export function renderSumoExchangeLine(bucket, stageIdx, student, week, oppStumbleNote = '') {
  const ctx = buildSumoCtx(student, week, stageIdx);
  const scene = render('{sumo.beat.scene}', ctx)?.trim() || '';
  const raw = (scene || stageText(SUMO_EXCHANGE_LINES[bucket] || SUMO_EXCHANGE_LINES.clash, stageIdx)) + oppStumbleNote;
  return renderSumoLegacy(raw, student, week, stageIdx, { v2DepthChance: 0.24 });
}

export function renderSumoBoutWon(stageIdx, student, week) {
  const ctx = buildSumoCtx(student, week, stageIdx, { globals: { matchWon: true } });
  const scene = render('{sumo.bout.won}', ctx)?.trim() || '';
  const raw = scene || stageText(SUMO_BOUT_WON, stageIdx);
  return renderSumoLegacy(raw, student, week, stageIdx, { globals: { matchWon: true }, v2DepthChance: 0.3 });
}

export function renderSumoBoutLost(stageIdx, student, week) {
  const ctx = buildSumoCtx(student, week, stageIdx, { globals: { matchWon: false } });
  const scene = render('{sumo.bout.lost}', ctx)?.trim() || '';
  const raw = scene || stageText(SUMO_BOUT_LOST, stageIdx);
  return renderSumoLegacy(raw, student, week, stageIdx, { globals: { matchWon: false }, v2DepthChance: 0.28 });
}

export function renderSumoFillRing(stageIdx, student, week) {
  const ctx = buildSumoCtx(student, week, stageIdx);
  const scene = render('{sumo.fill}', ctx)?.trim() || '';
  const raw = scene || SUMO_FILL_RING_TEXT[stageIdx]
    || 'You expand completely into the ring. Your opponent steps outside. Bout to you.';
  return renderSumoLegacy(raw, student, week, stageIdx, { v2DepthChance: 0.34 });
}

export function renderSumoCornerFeed(stageIdx, student, week) {
  const feed = SUMO_CORNER_FEED[stageIdx] || SUMO_CORNER_FEED[0];
  const ctx = buildSumoCtx(student, week, stageIdx, { globals: { gainAccum: feed.lbs } });
  const scene = render('{sumo.corner}', ctx)?.trim() || '';
  return renderSumoLegacy(scene || feed.text, student, week, stageIdx, {
    globals: { gainAccum: feed.lbs },
    v2DepthChance: 0.3,
  });
}

export function renderSumoNextBoutLine(boutNum, stageIdx, student, week, heavier = false) {
  const raw = heavier
    ? `Bout ${boutNum}. You return to center heavier than you left it. ${SUMO_RIVAL_NAME} sets her feet across from you.`
    : `Bout ${boutNum}. You square up at the center again. ${SUMO_RIVAL_NAME} sets her feet across from you.`;
  return renderSumoLegacy(raw, student, week, stageIdx, { v2DepthChance: 0.22 });
}

export function renderSumoAftermath(stageIdx, student, gainAccum, won, oppLbs, week) {
  const fn = SUMO_MATCH_AFTERMATH[stageIdx];
  const unique = fn ? fn(student, gainAccum, won, oppLbs) : '';
  const ctx = buildSumoCtx(student, week, stageIdx, {
    globals: { gainAccum, matchWon: won, oppLbs },
  });
  const scene = render('{sumo.aftermath.scene}', ctx)?.trim() || '';
  const glow = render('{sumo.afterglow}', ctx)?.trim() || '';
  const composed = [scene || unique, glow].filter(Boolean).join('\n\n');
  return appendV2Depth(composed, 'sumoMatch', ctx, 0.32);
}

export function renderSumoPayoff(stageIdx, student, gainAccum, week) {
  const fn = SUMO_PAYOFF_TEXT[stageIdx];
  const raw = fn ? fn(gainAccum) : `${Math.round(gainAccum)} pounds added to your frame since you stepped onto the dohyo. You can feel it. More.`;
  return renderSumoLegacy(raw, student, week, stageIdx, {
    globals: { gainAccum },
    v2DepthChance: 0.3,
  });
}
