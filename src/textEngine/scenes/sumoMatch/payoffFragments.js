// Sumo match — modular payoff compose.
import { registerPool } from '../../engine.js';

registerPool('sumo.payoff.gain', [
  { when: {}, text: [
    '{gainAccum} pounds added since you stepped onto the dohyo.',
    '+{gainAccum} on your frame — corner feeds and victory mass.',
    'The match wrote {gainAccum} pounds into your body.',
  ]},
]);

registerPool('sumo.payoff.feel', [
  { when: { sumoStage: [0, 1, 2] }, text: [
    'Belt tight, belly forward, breath heavier — you feel the new weight.',
    'Thighs wider, center of gravity lower, appetite satisfied.',
    'Victory mass settles slow — warm, forward, undeniable.',
  ]},
  { when: { sumoStage: [3, 4, 5] }, text: [
    'Mass dominates the locker room — slow steps, warm rolls, victory gravity.',
    'You move like geography now; the gain is not abstract.',
  ]},
  { when: {}, text: [
    'You can feel it in the room before the scale agrees.',
    'More. Always more — the dohyo taught that again.',
    'Locker-room steam, belt loose, belly honest.',
  ]},
]);

registerPool('sumo.payoff.tag', [
  { when: {}, text: [
    'Match over. Win or loss, the lbs stayed.',
    'Dana shakes your hand. Your belly does not apologize.',
    'Crowd fades. Fullness does not.',
  ]},
]);

const SKELETONS = [
  '{sumo.payoff.gain} {sumo.payoff.feel} {sumo.payoff.tag}',
  '{sumo.payoff.gain}\n\n{sumo.payoff.feel}\n\n{sumo.payoff.tag}',
  'Sumo complete.\n\n{sumo.payoff.gain}\n\n{sumo.payoff.feel}',
];

for (let si = 0; si < 6; si += 1) {
  registerPool(`sumo.payoff.compose.s${si}`, [
    { when: { sumoStage: [si] }, priority: 1, text: SKELETONS },
    { when: {}, text: SKELETONS },
  ]);
}
