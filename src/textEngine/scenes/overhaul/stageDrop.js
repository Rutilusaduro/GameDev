// The Squad — Lead: A5 Editor | Support: A2 Psych, A6 Slender
// Slot-composed stage-drop toasts. Prefer over leftover STAGE_DROP_REACTIONS.
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';

registerPool('stage.drop.scene', [
  { when: {}, text: [
    '{stage.drop.setup} {stage.drop.body}',
    '{stage.drop.body} {stage.drop.setup}',
    '{stage.drop.setup}',
  ]},
]);

registerPool('stage.drop.setup', [
  { when: {}, text: [
    'Lighter this week. She notices. She does not like the direction.',
    'The number moved the wrong way. Appetite already files a correction.',
    'Less of her than last week. The chair has extra room. She hates the extra room.',
  ]},
  { when: { archetype: ['cheerleader'] }, weight: 4, text: [
    'Uniform almost fits again. She liked where it was going.',
    'Squad gear got easier. That was not the look she was chasing.',
  ]},
  { when: { archetype: ['swimmer'] }, weight: 4, text: [
    'Warmup jacket hangs looser. She logs it like a bad split.',
    'Training block lighter. Meal plan already rewritten in her head.',
  ]},
  { when: { archetype: ['bookworm'] }, weight: 4, text: [
    'The hall log notes a reversal. She hates messy data.',
    'Chair feels different. She adds a corrective meal line.',
  ]},
  { when: { archetype: ['influencer'] }, weight: 4, text: [
    'Comments will clock this before she does. She is already annoyed.',
    'The look she was posting just shrank. Rebrand incoming, against her will.',
  ]},
  { when: { archetype: ['athlete'] }, weight: 4, text: [
    'Mass she had earned is missing. Power feels off.',
    'Center of gravity shifted back. She wants the heavier version.',
  ]},
  { when: { archetype: ['quiet'] }, weight: 4, text: [
    'Oh. Less. She did not want less.',
    'She had just gotten used to herself. This is the wrong edit.',
  ]},
  { when: { archetype: ['culinary'] }, weight: 4, text: [
    'The scale is wrong, she decides. Dinner will argue.',
    'Apron hangs looser. Pantry is already open.',
  ]},
  { when: { stageMin: 6 }, weight: 2, text: [
    'A whole stage gone. She had built a routine around that body.',
    'Significant loss. Comfort she had paid for in pounds.',
  ]},
]);

registerPool('stage.drop.body', [
  { when: {}, text: [
    '"I liked that size." She is already planning the climb back.',
    'Correction starts tonight. She means food, not restraint.',
    'The extra of her is a project. She wants the project back.',
  ]},
]);

function prefer(poolKey, ctx) {
  const line = render(`{${poolKey}}`, ctx)?.trim();
  if (line && !line.includes('{unresolved}')) return line;
  return '';
}

export function renderStageDrop(student, week = 1) {
  if (!student) return '';
  return prefer('stage.drop.scene', buildTextContext({
    subject: student,
    week,
    globals: { featureId: 'stageDrop' },
  }));
}
