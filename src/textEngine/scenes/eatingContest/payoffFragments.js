// Eating contest — modular payoff compose (gain + body + tag).
import { registerPool } from '../../engine.js';

registerPool('contest.payoff.gain', [
  { when: {}, text: [
    '{yourGain} pounds worth of competition settled into you since the horn fired.',
    'The tally: +{yourGain} on your frame — real, warm, visible.',
    '{yourGain} more pounds than when you sat down. That was the point.',
  ]},
]);

registerPool('contest.payoff.body', [
  { when: { contestStage: [0, 1] }, text: [
    'Pants tighter, shirt ridden up, belly warm and pressing forward.',
    'You feel the new roundness in how you sit and how you breathe.',
  ]},
  { when: { contestStage: [2, 3] }, text: [
    'Belly heavier between your thighs — competition top honest about what you ate.',
    'Fullness reads as architecture now, not secret.',
  ]},
  { when: { contestStage: [4, 5] }, text: [
    'Belly vast on display — chair creaking, table pushed, crowd silent then loud.',
    'Mass forward, warmth deep, appetite honored at national scale.',
  ]},
  { when: {}, text: [
    'You put a hand on your belly and feel the heat of the work.',
    'The weight is not punishment. It is receipt.',
    'Chair groans. Belt surrenders. Belly wins the argument.',
  ]},
]);

registerPool('contest.payoff.tag', [
  { when: { contestStage: 0 }, text: [
    'First real contest. You will be back hungrier.',
    'You walked in to grow. You grew.',
  ]},
  { when: { contestStage: [4, 5] }, text: [
    'Grand stage, grand appetite — you fed the room what it came to see.',
    'Next year you return bigger. The math already knows.',
  ]},
  { when: {}, text: [
    'Horn done. Belly full. Scoreboard honest.',
    'Maya ate hard. You ate harder.',
    'Mic off. Lights up. Fullness stays.',
  ]},
]);

const SKELETONS = [
  '{contest.payoff.gain} {contest.payoff.body} {contest.payoff.tag}',
  '{contest.payoff.gain}\n\n{contest.payoff.body}\n\n{contest.payoff.tag}',
  'Contest complete.\n\n{contest.payoff.gain}\n\n{contest.payoff.body}',
];

for (let si = 0; si < 6; si += 1) {
  registerPool(`contest.payoff.compose.s${si}`, [
    { when: { contestStage: [si] }, priority: 1, text: SKELETONS },
    { when: {}, text: SKELETONS },
  ]);
}
