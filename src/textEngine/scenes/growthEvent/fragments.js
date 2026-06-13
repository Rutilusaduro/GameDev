// ═══════════════════════════════════════════════════════════════
// GROWTH EVENT — fragment pools (stub wildcards; prose in phase 3)
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../../engine.js';
import '../../modules.js';

// FULL SENTENCE — onset beat skeletons
registerPool('ge.onset', [
  { when: { isMalfunction: true }, text: [
    '{ge.causeAction}{ge.causeAnchor} — {ge.firstSensation}, then something goes wrong.',
    'It starts as planned{ge.causeAnchor}: {ge.firstSensation}, until the rig stutters.',
  ] },
  { when: {}, text: [
    '{ge.causeAction}{ge.causeAnchor} — {ge.firstSensation}.',
    'The change begins{ge.causeAnchor}: {ge.firstSensation}.',
    '{subject.name} {ge.firstSensation}{ge.causeAnchor} as {ge.causeAction}.',
  ] },
]);

// VERB PHRASE — what triggers the growth
registerPool('ge.causeAction', [
  { when: {}, text: ['the growth takes hold', 'her body answers the stimulus'] },
]);

// PREP ANCHOR
registerPool('ge.causeAnchor', [
  { when: {}, text: ['', ' in the lab', ' on campus'] },
]);

// PARTICIPLE — first sensation
registerPool('ge.firstSensation', [
  { when: { sensation: 'warmth' }, text: ['warming from the inside out', 'heat pooling under her skin'] },
  { when: { sensation: 'pressure' }, text: ['tightening under sudden pressure', 'stretching against invisible force'] },
  { when: { sensation: 'pleasure' }, text: ['shivering with involuntary pleasure', 'softening into the pulse'] },
  { when: {}, text: ['feeling the first swell', 'registering weight before the scale does'] },
]);

// FULL SENTENCE — surge beat
registerPool('ge.surge', [
  { when: { stagesJumpedMin: 2 }, text: [
    '{grow.sudden} {ge.surgeDetail}.',
    'The swell hits hard — {grow.sudden} {ge.surgeDetail}.',
  ] },
  { when: {}, text: [
    '{grow.sudden}{join:ge.surgeDetail|prefix: — }.',
    'Pounds land fast: {grow.sudden}.',
  ] },
]);

registerPool('ge.surgeDetail', [
  { when: { growthIntensity: 'violent' }, text: ['violently, without mercy', 'in a brutal rush'] },
  { when: { growthIntensity: 'rapid' }, text: ['faster than she can track', 'in minutes that feel like seconds'] },
  { when: {}, text: ['', 'steadily, insistently'] },
]);

registerPool('grow.sudden', [
  { when: { growthZone: 'belly' }, text: ['her belly surges outward', 'her midsection balloons'] },
  { when: { growthZone: 'hips' }, text: ['her hips widen in a single swell', 'her lower body thickens'] },
  { when: { growthZone: 'full' }, text: ['her whole frame softens and spreads', 'weight deposits everywhere at once'] },
  { when: {}, text: ['she swells visibly', 'new softness appears all at once'] },
]);

registerPool('ge.zoneFocus', [
  { when: {}, text: ['The gain settles where the stimulus aimed.', 'Fat finds its appointed place.'] },
]);

// NOUN PHRASE — archetype garment
registerPool('ge.garment', [
  { when: {}, text: ['her clothes', 'what she was wearing'] },
]);

// FULL SENTENCE — strain beat
registerPool('ge.strain', [
  { when: { endStageMin: 4 }, text: [
    '{ge.garment} {ge.clothingStrain}{join:ge.clothingFail|prefix: — }.',
    'Fabric protests — {ge.garment} {word.clothingFit}{join:ge.clothingFail|prefix:; }.',
  ] },
  { when: {}, text: ['{ge.garment} pulls tighter across her changing body.'] },
]);

registerPool('ge.clothingStrain', [
  { when: {}, text: ['strains at every seam', 'rides up and digs in'] },
]);

registerPool('ge.clothingFail', [
  { when: { stagesJumpedMin: 1, endStageMin: 4 }, text: [
    'A button gives somewhere she cannot reach.',
    'A seam surrenders with a soft rip.',
  ] },
  { when: {}, text: ['', ''] },
]);

registerPool('ge.reaction', [
  { when: {}, text: [
    '{ge.reactionBody}{join:ge.reactionDialogue|prefix: — }.',
    'She steadies herself{join:ge.reactionDialogue|prefix: — }.',
  ] },
]);

registerPool('ge.reactionBody', [
  { when: { sensation: 'pleasure' }, text: ['trembling, flushed, not entirely unhappy'] },
  { when: { shameTierMin: 2 }, text: ['mortified, hands hovering over the new weight'] },
  { when: {}, text: ['breathless, feeling the change settle'] },
]);

registerPool('ge.reactionDialogue', [
  { when: {}, text: ['', '"That\'s… a lot."', '"Oh."'] },
]);

registerPool('ge.settle', [
  { when: { isPermanent: true }, text: [
    'When it ends, something has changed for good{join:ge.permanentNote|prefix: — }.',
  ] },
  { when: { isMalfunction: true }, text: [
    'The rig winds down unevenly{join:ge.settleClause|prefix: — }{join:ge.deviceWindDown|prefix:; }.',
  ] },
  { when: {}, text: [
    'The swell eases into a new baseline{join:ge.settleClause|prefix: — }.',
    'She is left heavier, softer, changed{join:ge.deviceWindDown|prefix: — }.',
  ] },
]);

registerPool('ge.settleClause', [
  { when: { growthIntensity: 'violent' }, text: ['leaving damage and delight tangled together'] },
  { when: {}, text: ['', 'leaving her flushed and fuller'] },
]);

registerPool('ge.permanentNote', [
  { when: { limitRemoved: true }, text: ['There is no going back to how her body remembered limits.'] },
  { when: { isPermanent: true }, text: ['Some of this will not unwind.'] },
  { when: {}, text: [''] },
]);

registerPool('ge.taliaCameo', [
  { when: { causeType: 'device_use', locale: 'lab' }, text: [
    '"Within tolerance," Talia says, already taking notes. "Huh. That\'s new."',
    'Talia watches the readout. "Interesting deposition curve."',
  ] },
  { when: { causeType: 'device_malfunction' }, text: [
    '"That\'s outside spec," Talia murmurs, fascinated rather than alarmed.',
  ] },
  { when: {}, text: ['', '', ''] },
]);

registerPool('ge.deviceWindDown', [
  { when: {}, text: ['', ''] },
]);

registerPool('grow.crossingDialogue', [
  { when: {}, text: ['', '"So that\'s where I am now."'] },
]);
