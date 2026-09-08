// The Squad — Lead: A2 Psych | Support: A3 Immobility, A5 Editor
// V2.0 body echo archive depth layer
import { registerPool } from '../../../engine.js';

registerPool('echo.capture.depth', [
  { when: { stageMin: 10 }, text: [
    'The archive catches immobility like lightning in glass — vast, still, warm, a body that has become environment.',
    'Moment preserved at maximum scale. Future replays will find more room to grow into.',
  ]},
  { when: { stageMin: 6 }, text: [
    'Threshold crossed. The echo forms with weight — not just memory, but mass remembered.',
    'Something shifted permanently. The archive holds it so appetite cannot pretend otherwise.',
  ]},
  { when: { stageMin: 2 }, text: [
    'Early echo — softness still surprising, appetite still learning to speak without blush.',
    'The moment is small only by future standards. The archive knows what it becomes.',
  ]},
  { when: {}, text: [
    'Captured — hunger crystallized, available to revisit, deepen, worship.',
  ]},
]);

registerPool('echo.replay.depth', [
  { when: { stageMin: 9 }, text: [
    'Replay at depth three: past and present appetite merge. Her body in the archive grows warmer with each visit.',
    'The memory refuses to stay small. Each return adds sensory detail — heat, weight, the sound of her satisfaction.',
  ]},
  { when: { stageMin: 5 }, text: [
    'Second or third visit — the echo unfolds longer, more specific, more proof she crossed a line willingly.',
  ]},
  { when: {}, text: [
    'The moment returns. Fuller than before. The archive honors appetite with fidelity.',
  ]},
]);

registerPool('echo.resonate.depth', [
  { when: { stageMin: 7 }, text: [
    'Resonance drives the memory into flesh — gain hastened, appetite amplified, the echo becoming prophecy.',
    'You press into the archive until past hunger bleeds into present growth.',
  ]},
  { when: {}, text: [
    'The echo deepens under your attention. She will grow faster for having been remembered this way.',
  ]},
]);

registerPool('echo.type.stage_up.depth', [
  { when: { stageMin: 8 }, text: [
    'Stage-up at scale — the threshold visible in how the room receives her, how chairs complain, how she carries new mass like ceremony.',
  ]},
  { when: {}, text: [
    'She crossed a line the scale confirmed. Clothes had been whispering for weeks.',
  ]},
]);

registerPool('echo.type.weigh_in.depth', [
  { when: { stageMin: 6 }, text: [
    'The number landed like weather — inevitable, warm, reshaping how she stands on the platform.',
  ]},
  { when: {}, text: [
    'Digits climbed. She watched without flinching. Growth acknowledged.',
  ]},
]);

registerPool('echo.type.dinner_unbutton.depth', [
  { when: { stageMin: 5 }, text: [
    'Public fabric surrender — button, seam, or clasp giving while she kept eating. The restaurant learned to look away too late.',
  ]},
  { when: {}, text: [
    'Unbuttoned, unashamed, still reaching for dessert. The moment preserved whole.',
  ]},
]);

registerPool('echo.type.immobility.depth', [
  { when: {}, text: [
    'Immobile echo — vastness settled, food brought to her, contentment without decline.',
    'She stopped needing to travel. The world came instead.',
  ]},
]);

registerPool('echo.type.corruption_tier.depth', [
  { when: { corruptionMin: 60 }, text: [
    'Corruption tier crossed — want reorganized around yes, appetite speaking without filter.',
  ]},
  { when: {}, text: [
    'Psychology shifted. Hunger found more room. Shame lost another inch of territory.',
  ]},
]);

registerPool('echo.type.evolution.depth', [
  { when: { stageMin: 6 }, text: [
    'Evolution echo — form chosen, appetite amplified, identity made spectacle in a single preserved instant.',
  ]},
  { when: {}, text: [
    'She became more herself. The archive caught the first breath after the choice.',
  ]},
]);
