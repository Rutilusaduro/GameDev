// The Squad — Lead: A1 Mobile | Support: A6 Slender, A5 Editor
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('wi.scaleAttitude', [
  { when: { stageMin: 0, stageMax: 3, corruption: [0] }, weight: 3, text: [
    `{subject.first} avoids the dial at first — then steals a glance anyway, cheeks warming.`,
    `She steps on like it is a dare; shoulders tight, breath held, eyes on you instead of the number.`,
  ]},
  { when: { stageMin: 4, stageMax: 7 }, weight: 2, text: [
    `{subject.name} mounts the platform with slow confidence — already knows the number will be higher, already braced for pleasure in that fact.`,
    `She keeps your gaze while the scale wakes; a small smile when the platform settles under her spread.`,
  ]},
  { when: { stageMin: 8 }, weight: 3, text: [
    `The platform receives her like furniture built for this — no surprise, only the familiar give of her weight arriving.`,
    `She does not flinch from the readout; her body speaks before the needle does, soft and vast and unapologetic.`,
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    `She climbs on eager — belly leading, hips wide — as if the scale is applause waiting to happen.`,
  ]},
]);

registerModuleVariants('wi.numberLine', [
  { when: { stageMin: 5 }, weight: 2, text: [
    `{subject.lbs} — she repeats it once, tasting the climb.`,
    `"{subject.lbs}," she says, voice low. "Still rising. Good."`,
  ]},
  { when: { corruption: [0], stageMax: 4 }, weight: 2, text: [
    `The number lands; she goes quiet in the way people go quiet when truth is bigger than the words ready for it.`,
  ]},
]);

registerModuleVariants('wi.replyDialogue', [
  { when: { corruption: [1] }, weight: 2, text: [
    `"So that's where I am," {subject.first} murmurs — not quite a question, not quite regret.`,
    `She nods once, slow. "Okay. Keep going."`,
  ]},
  { when: { corruption: [2], stageMin: 6 }, weight: 3, text: [
    `"Write it down," she says, pleased. "I want to remember this week exactly."`,
    `She grins at the readout like it is a love letter. "Higher next time."`,
  ]},
]);

registerModuleVariants('wi.platformReact', [
  { when: { stageMin: 7 }, weight: 2, text: [
    'the platform compressing a fraction before holding — a soft mechanical sigh under her',
    'the scale accepting her weight without protest, as if trained by weeks of her',
  ]},
]);

registerModuleVariants('wi.needleReact', [
  { when: { stageMin: 6 }, weight: 2, text: [
    'The needle climbs in stately increments — a parade, not a sprint.',
    'The dial hunts, shivers, then settles on a number that feels inevitable.',
  ]},
]);
