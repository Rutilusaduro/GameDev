// Collab stream — end-of-stream payoff beats (skeleton + fragments).
import { registerPool } from '../../engine.js';

registerPool('collab.payoff.statline', [
  { when: {}, text: [
    '{kylieGain} pounds for you and {partnerGain} for {partnerName}.',
    '{kylieGain} on you and {partnerGain} on {partnerName} tonight.',
    'The tally: +{kylieGain} for {subject.name}, +{partnerGain} for {partnerName}.',
    '{kylieGain} and {partnerGain} — yours and hers, real on the scale.',
  ]},
]);

registerPool('collab.payoff.feel', [
  { when: { collabStage: [0, 1] }, text: [
    'You feel the difference — belly a degree heavier, clothes sitting differently than at stream start.',
    'Warmth pools in your middle; {partnerName} still touches her belly like inventory.',
    'The debut collab landed the way you meant to continue.',
  ]},
  { when: { collabStage: [2, 3] }, text: [
    'Both gains sit in the room as facts — bellies warmer, tops straining, appetite visible.',
    'The format works because you both grow; tonight you both did.',
    'The brand funded this footage. Your bodies delivered the brief.',
  ]},
  { when: { collabStage: [4, 5] }, text: [
    'At this scale the gains feel geological — layers on something already enormous.',
    'The corner is more yours than an hour ago; {partnerName} sits heavier across the table.',
    'A year of collabs reads in the math and the heat of the room.',
  ]},
  { when: {}, text: [
    'You feel the fresh weight — not shame, just presence.',
    '{partnerName} breathes like someone satisfied and still willing.',
    'The stream ends; fullness does not.',
  ]},
]);

registerPool('collab.payoff.tag', [
  { when: { collabStage: 0 }, text: [
    'The debut collab. You started the way you mean to continue.',
    'First shared stream — appetite aligned, chat hooked.',
  ]},
  { when: { collabStage: [1, 2] }, text: [
    'This is the format. This is why it works.',
    'Two women eating on camera, growing together — the gain real and visible.',
  ]},
  { when: { collabStage: [3, 4] }, text: [
    'The collab did what collabs are for — visible gain, shared appetite, chat fed.',
    'Content team has the footage. They know what they bought.',
    'Brand money bought bellies forward on camera. You delivered.',
  ]},
  { when: { collabStage: 5 }, text: [
    'Wren has watched since the early numbers. She is still watching.',
    'There is more to build. There is always more.',
  ]},
  { when: {}, text: [
    'Stream complete. Warmth lingers in the quiet after.',
    'Collab wrapped — bellies honest, chat satisfied.',
    'Mic off. Lights dim. Fullness stays.',
  ]},
]);

const PAYOFF_SKELETONS = [
  '{collab.payoff.statline} {collab.payoff.feel} {collab.payoff.tag}',
  '{collab.payoff.statline}\n\n{collab.payoff.feel}\n\n{collab.payoff.tag}',
  'Collab complete.\n\n{collab.payoff.statline}\n\n{collab.payoff.feel}',
  '{collab.payoff.statline} {collab.payoff.feel}\n\nThe stream ends. The warmth does not.',
];

for (let si = 0; si < 6; si += 1) {
  registerPool(`collab.stream.payoff.compose.s${si}`, [
    {
      when: { collabStage: [si] },
      priority: 1,
      text: PAYOFF_SKELETONS,
    },
    { when: {}, text: PAYOFF_SKELETONS },
  ]);
}
