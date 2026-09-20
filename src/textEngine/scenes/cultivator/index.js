// The Squad — Lead: A2 Psych | Support: A4 Architect
// Cultivator recipe prose — migrated from gameData/cultivator.js (DEPTH_PLAN §9d).
import './vignettes.js';
import { registerPool, render, createContext } from '../../engine.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
export {
  renderCultivatorHarvestPlanned,
  renderCultivatorHarvestEmergency,
  renderCultivatorStageUp,
  renderCultivatorRecruitment,
  renderCultivatorDigest,
  renderCultivatorGrowth,
} from './vignettes.js';
import { RECIPES, EATING_REACTIONS } from '../../../gameData/cultivator.js';

function testerSubject(testerName) {
  const name = testerName || 'the tester';
  return { id: 0, name, first: name.split(' ')[0] || name };
}

function suspicionTier(suspicion) {
  if (suspicion < 50) return 0;
  if (suspicion < 100) return 1;
  if (suspicion < 140) return 2;
  if (suspicion < 180) return 3;
  return 4;
}

EATING_REACTIONS.forEach((text, tier) => {
  registerPool(`cultivator.eating.s${tier}`, [{ when: {}, text: [text] }]);
});

registerPool('cultivator.eating', [
  { when: { suspicionTier: [0] }, text: ['{cultivator.eating.s0}'] },
  { when: { suspicionTier: [1] }, text: ['{cultivator.eating.s1}'] },
  { when: { suspicionTier: [2] }, text: ['{cultivator.eating.s2}'] },
  { when: { suspicionTier: [3] }, text: ['{cultivator.eating.s3}'] },
  { when: { suspicionTier: [4] }, text: ['{cultivator.eating.s4}'] },
  { when: {}, text: ['{cultivator.eating.s0}'] },
]);

for (const [recipeId, recipe] of Object.entries(RECIPES)) {
  const introText = typeof recipe.intro === 'function'
    ? recipe.intro('{subject.name}')
    : String(recipe.intro || '');
  registerPool(`cultivator.intro.${recipeId}`, [
    { when: { studentId: 10 }, weight: 4, text: [introText] },
    { when: {}, text: [introText] },
  ]);

  recipe.junctions?.forEach((junction, jIdx) => {
    junction.choices?.forEach((choice) => {
      registerPool(`cultivator.choice.${recipeId}.${choice.id}`, [
        { when: {}, text: [choice.desc || choice.label] },
      ]);
    });
    registerPool(`cultivator.junction.${recipeId}.j${jIdx}`, [
      { when: {}, text: [`{cultivator.choice.${recipeId}.${junction.choices[0]?.id}}`] },
    ]);
  });
}

registerPool('cultivator.reaction', [
  { when: { featureId: 'cultivator', corruption: [1, 2] }, weight: 2, text: [
    '{subject.name} eats anyway — eyes sharper than last session, appetite unchanged.',
    'She notices something, maybe. She finishes the plate regardless.',
  ] },
  { when: { featureId: 'cultivator' }, text: [
    '{subject.name} pauses mid-bite, then shrugs and continues.',
    'A flicker of doubt — swallowed with the next forkful.',
  ] },
  { when: { studentId: 10 }, weight: 3, text: [
    'Reneé watches the tester eat with professional satisfaction — and something warmer.',
    'She tastes the batch herself afterward. Quality control. Always.',
  ] },
  { when: {}, text: [
    '{subject.name} cleans the plate without comment.',
    'The tester eats steadily — appetite cooperating with the recipe.',
    'Empty dish. Full belly. Another session logged.',
  ] },
]);

registerPool('cultivator.beat', [
  { when: {}, text: ['{cultivator.reaction}'] },
]);

registerPool('cultivator.linger', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Kitchen leftover still on Reneé. The tester plate sits easier for it.',
    'Galley heat in the tasting room. She files the tray as a second reagent.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'Quiet-hours knock still in her posture. The tester eats on that same open hour.',
    'You were at her door after lights. This tasting uses the leftover heat.',
  ] },
  { when: {}, text: [
    'The tester eats. Reneé watches like a kitchen that already voted.',
    'Notes stay neat. Appetite does not.',
    'She logs the plate as data. The middle logs it as yield.',
  ] },
]);

function cultivatorCtx(testerName, week, opts = {}) {
  return createContext({
    subject: testerSubject(testerName),
    week,
    globals: {
      featureId: 'cultivator',
      leftoverFed: !!opts.leftoverFed,
      nightVisit: !!opts.nightVisit,
      ...(opts.globals || {}),
    },
  });
}

function wrapCultivatorLinger(base, ctx) {
  if (!base) return base;
  const leftover = !!(ctx.globals?.leftoverFed || ctx.d?.leftoverFed);
  const night = !!(ctx.globals?.nightVisit || ctx.d?.nightVisit);
  if (!leftover && !night) return base;
  const linger = render('{cultivator.linger}', ctx)?.trim() || '';
  return linger ? `${base}\n\n${linger}` : base;
}

export function renderCultivatorIntro(recipeId, testerName, week = 1, opts = {}) {
  if (!recipeId) return '';
  const ctx = cultivatorCtx(testerName, week, opts);
  const base = render(`{cultivator.intro.${recipeId}}`, ctx)?.trim() || '';
  return appendV2Depth(wrapCultivatorLinger(base, ctx), 'cultivator', ctx, 0.3);
}

export function renderCultivatorChoice(recipeId, choiceId, testerName, week = 1, opts = {}) {
  if (!recipeId || !choiceId) return '';
  const ctx = cultivatorCtx(testerName, week, opts);
  const base = render(`{cultivator.choice.${recipeId}.${choiceId}}`, ctx)?.trim() || '';
  return appendV2Depth(wrapCultivatorLinger(base, ctx), 'cultivator', ctx, 0.28);
}

export function renderCultivatorReaction(testerName, suspicion, week = 1, opts = {}) {
  const ctx = cultivatorCtx(testerName, week, { ...opts, globals: { suspicionTier: suspicionTier(suspicion), ...(opts.globals || {}) } });
  const base = render('{cultivator.eating}', ctx)?.trim() || '';
  return appendV2Depth(wrapCultivatorLinger(base, ctx), 'cultivator', ctx, 0.3);
}
