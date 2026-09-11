// The Squad — Lead: A2 Psych | Support: A6 Slender, A5 Editor
// Encourage-talk depth pass — extra when-keyed lines (house voice).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('enc.deflect', [
  { when: { stageMin: 0, stageMax: 3, corruption: [0] }, weight: 3, text: [
    `{subject.first} laughs too quickly. "I'm not — I mean, it's just stress eating." The denial is thin; her eyes drop to her middle anyway.`,
    `"This isn't a thing," she says, smoothing her shirt like she can erase the curve beneath it. Her hand stays there a beat too long.`,
  ]},
  { when: { stageMin: 4, corruption: [1] }, weight: 3, text: [
    `"I shouldn't want this much," she murmurs — but she does not push the plate away.`,
    `She protests on autopilot; her body leans toward warmth, toward fullness, toward you.`,
  ]},
]);

registerModuleVariants('enc.giveIn', [
  { when: { corruption: [0] }, weight: 2, text: [
    `She takes one bite to prove she is in control, then another because the first felt honest.`,
    `Permission lands soft; resistance folds without drama — a sigh, a nod, mouth opening.`,
  ]},
  { when: { corruption: [2] }, weight: 3, text: [
    `She eats like she has been waiting for you to tell her to — eager, unashamed, beautifully obedient.`,
    `"Fine," she breathes — but it sounds like victory. "Fine. More."`,
  ]},
]);

registerModuleVariants('enc.bodyAside', [
  { when: { stageMin: 5, stageMax: 8 }, weight: 2, text: [
    `Her belly presses the table edge when she exhales — warm, visible, impossible to ignore.`,
    `Softness shifts under fabric; she feels you notice and does not hide it anymore.`,
  ]},
  { when: { stageMin: 9 }, weight: 3, text: [
    `Mass settles slow when she moves; the chair groans kindly; she smiles like the sound is compliment.`,
  ]},
]);

registerModuleVariants('enc.stillHungry', [
  { when: { stageMin: 6 }, weight: 2, text: [
    `She pats her middle, surprised and pleased. "Still room. Weirdly still room."`,
  ]},
  { when: { corruptionMin: 2 }, weight: 2, text: [
    `"I could keep going," she admits, voice low — not asking, announcing.`,
  ]},
]);

registerModuleVariants('enc.display', [
  { when: { corruptionMin: 2, stageMin: 5 }, weight: 3, text: [
    `She lifts her shirt just enough to show the swell — teasing, proud, daring you to praise it.`,
  ]},
]);
