// The Squad — Lead: A2 Psych | Support: A4 Architect
// Cultivator recipe prose — migrated from gameData/cultivator.js (DEPTH_PLAN §9d).
import { registerPool } from '../../engine.js';
import { RECIPES } from '../../../gameData/cultivator.js';

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
