// ═══════════════════════════════════════════════════════════════
// UNIVERSAL ADVERB POOLS — pace and size-qualifier slots.
// Shape: ADVERBIAL — lowercase, no period.
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../engine.js';

// Pre-verb pace/intent modifier
registerPool('word.adv.pace', [
  { when: {}, text: ['', '', '', 'quietly', 'without hurry'] },
  { when: { corruption: [0], stageMin: 3 }, weight: 2,
    consumes: ['psych_mood', 'speed_mod'],
    text: ['hesitantly', 'with visible reluctance', 'slowly, as if reconsidering'] },
  { when: { corruption: [1] }, weight: 2,
    consumes: ['psych_mood', 'speed_mod'],
    text: ['with the carefulness of someone still deciding what this means', 'in measured steps'] },
  { when: { corruption: [2] }, weight: 2,
    consumes: ['psych_mood', 'speed_mod'],
    text: ['without ceremony', 'as a matter of course', 'with the ease of long habit'] },
  { when: { mood: ['happy', 'cheerful', 'excited'] },
    text: ['brightly', 'with quick energy'] },
  { when: { mood: ['tired', 'stressed'] },
    text: ['slowly', 'wearily'] },
  { when: { hungerTierMin: 3 }, weight: 2,
    text: ['urgently', 'single-mindedly'] },
  { when: { stageMin: 5, stageMax: 9 },
    text: ['ponderously', 'deliberately', 'unhurriedly'] },
  { when: { stageMin: 7 }, weight: 1,
    consumes: ['speed_mod'],
    text: ['with deliberate economy of movement', 'efficiently, given the physics involved'] },
  { when: { stageMin: 10 }, weight: 2,
    text: ['by degrees', 'without the vocabulary of hurry'] },
]);

// Post-verb size qualifier
registerPool('word.adv.sizeQual', [
  { when: {}, text: ['', '', ''] },
  { when: { stageMin: 5, stageMax: 7 }, requireAbsent: ['size_reminder'],
    consumes: ['size_reminder'],
    text: ['as quickly as her frame allows', 'without hurrying — there is too much to hurry'] },
  { when: { stageMin: 8, stageMax: 9 }, requireAbsent: ['size_reminder'],
    consumes: ['size_reminder'],
    text: [
      'as quickly as {word.adv.sizeQual.body8}',
      'with the careful economy of someone who has learned not to waste momentum',
    ] },
  { when: { stageMin: 10 }, requireAbsent: ['size_reminder'],
    consumes: ['size_reminder'],
    text: [
      'as quickly as {word.adv.sizeQual.body10}',
      'at the pace her body has decided upon',
    ] },
  { when: { stageMin: 7, stageMax: 9 }, requireAbsent: ['size_reminder'],
    text: ['given her mass', 'at the speed gravity permits'] },
]);

// Post-action manner (eating, settling, etc.)
registerPool('word.adv.manner', [
  { when: {}, text: ['', '', 'with unhurried attention'] },
  { when: { corruption: [0] }, text: ['carefully', 'as if the calories might hear'] },
  { when: { corruption: [1] }, text: ['steadily', 'without the old argument'] },
  { when: { corruption: [2] }, text: ['with open appetite', 'like someone who has stopped pretending'] },
  { when: { hungerTierMin: 3 }, weight: 2, text: ['with single-minded focus', 'before thought catches up'] },
  { when: { stageMin: 8 }, text: ['with practiced economy', 'at the pace her body prefers'] },
]);
