// ═══════════════════════════════════════════════════════════════
// COMPOUND SUB-PHRASE LIBRARY — nested slot fillers.
// Shape: NOUN PHRASE or PREPOSITIONAL CLAUSE.
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../engine.js';

registerPool('word.adv.sizeQual.body8', [
  { when: { bodyType: 'apple' }, text: [
    'a belly that requires its own clearance',
    'a center of gravity that has migrated significantly forward',
  ] },
  { when: { bodyType: 'pear' }, text: [
    'hips that have become a measurement problem',
    'a lower half that now sets the pace for the rest of her',
  ] },
  { when: { bodyType: 'hourglass' }, text: [
    'curves that negotiate separately with every doorway',
    'a figure that has outgrown its old rhythm',
  ] },
  { when: { bodyType: 'rotund' }, text: [
    'a roundness that arrives before she does',
    'a spherical abundance with its own schedule',
  ] },
  { when: {}, text: [
    'a body that is working out its own schedule',
    'someone whose mass now participates in the decision',
    'a frame that has renegotiated all its previous arrangements',
  ] },
]);

registerPool('word.adv.sizeQual.body10', [
  { when: { bodyType: 'rotund' }, text: [
    'a body that has become an architectural consideration',
    'someone who no longer fits in the building\'s original assumptions',
  ] },
  { when: { bodyType: 'apple' }, text: [
    'forward mass that defines the room before she speaks',
    'a belly that has become furniture in its own right',
  ] },
  { when: { bodyType: 'pear' }, text: [
    'hips that the hallway has learned to accommodate',
    'a lower half that sets policy for the rest of her',
  ] },
  { when: {}, text: [
    'a body that answers to no one\'s urgency',
    'mass that sets its own schedule and lets you know after',
    'someone whose presence precedes them by a meaningful margin',
  ] },
]);

registerPool('word.sizeCompar.doorframe', [
  { when: { stageMin: 6, stageMax: 7 }, text: [
    'turn sideways and commit',
    'exhale once before pressing through',
    'angle her hips through with practiced care',
  ] },
  { when: { stageMin: 8, stageMax: 9 }, text: [
    'negotiate the frame inch by inch',
    'treat the doorway like a decision, not a formality',
    'press through with the patience of long practice',
  ] },
  { when: { stageMin: 10 }, text: [
    'fill the frame before the rest of her follows',
    'let the doorway learn her shape again',
    'arrive in sections',
  ] },
  { when: {}, text: ['pass through without ceremony', 'make the passage', 'continue forward'] },
]);

registerPool('word.sizeCompar.chair', [
  { when: { stageMin: 5, stageMax: 6 }, text: [
    'groaned once and held',
    'sank a fraction lower than designed',
    'protested softly and surrendered',
  ] },
  { when: { stageMin: 7, stageMax: 8 }, text: [
    'creaked like it was making a formal complaint',
    'flexed under her and kept flexing',
    'gave up pretending it was still standard issue',
  ] },
  { when: { stageMin: 9, stageMax: 10 }, text: [
    'became a negotiation between wood and mass',
    'stopped being a chair and became a platform',
    'held only because it had no other option',
  ] },
  { when: { stageMin: 11 }, text: [
    'ceased to be furniture in any meaningful sense',
    'became geography she had outgrown',
  ] },
  { when: {}, text: ['accepted her weight with a small sound', 'held steady', 'took the load without comment'] },
]);

registerPool('word.sizeCompar.scale', [
  { when: { stageMin: 4, stageMax: 5 }, text: [
    'flexed slightly under her',
    'dipped with a familiar creak',
    'registered her with a small protest',
  ] },
  { when: { stageMin: 6, stageMax: 7 }, text: [
    'groaned in recognition',
    'flexed like it remembered last week',
    'settled deeper than the manufacturer intended',
  ] },
  { when: { stageMin: 8, stageMax: 9 }, text: [
    'protested immediately — sharp creak, then a loaded groan',
    'flexed visibly under overwhelming weight',
    'made the sound you have started to recognize',
  ] },
  { when: { stageMin: 10 }, text: [
    'did not flinch — steel that has learned her',
    'took her mass without comment',
    'was built for this, finally',
  ] },
  { when: {}, text: ['held steady beneath her', 'stayed level', 'did not protest'] },
]);
