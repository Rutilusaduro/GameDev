// The Squad — Lead: A5 Editor | Support: A2 Psych
// Last-wins overwrite of leftover cultivator harvest / stage-up / recruitment monoliths.
import { registerPool } from '../../engine.js';

const RENEE_KEYS = ['heavy', 'fat', 'veryFat', 'enormous', 'colossal'];
const TESTER_STAGES = [6, 7, 8, 9, 10];

registerPool('cultivator.harvest.planned.setup', [
  { when: {}, text: [
    'The tasting is scheduled. {subject.name} arrives trusting. Reneé is already seated.',
    'Kitchen warm. Notes out. {subject.name} sits for the session that was always going to end here.',
    'Reneé greets her like quality control. The harvest is the plan. The food was only the path.',
  ]},
]);

registerPool('cultivator.harvest.planned.body', [
  { when: {}, text: [
    'She takes {subject.name} in. Soft yield, heat, the extra settling into Reneé like a logged result.',
    'The tester is gathered. Reneé sits fuller. The kitchen feels smaller in a way she likes.',
    'Yield integrated. Reneé rests a hand on the extra and writes the number without hurry.',
  ]},
  { when: { stageMin: 8 }, weight: 2, text: [
    'There is a lot of {subject.name} to take. Reneé takes her anyway, methodical, pleased.',
  ]},
]);

registerPool('cultivator.harvest.emergency.setup', [
  { when: {}, text: [
    'The session turns. {subject.name} wants the door. Reneé keeps the kitchen closed.',
    'Suspicion spikes. The tasting ends early. The harvest still happens.',
    '{subject.name} tries to leave. Reneé does not let the yield walk out.',
  ]},
]);

registerPool('cultivator.harvest.emergency.body', [
  { when: {}, text: [
    'Messier than planned. Still complete. Reneé sits heavier and logs the suboptimal timing.',
    'The transfer is hurried. The extra still settles. A utensil rolls. She rights it after.',
    'Kitchen disrupted, appetite not. Reneé finishes what the schedule failed to keep neat.',
  ]},
]);

registerPool('cultivator.stageUp.body', [
  { when: {}, text: [
    '{subject.name} sits with more care. Clothes already negotiating. Appetite improved.',
    'She mentions the fit like logistics. Then she eats everything without being asked.',
    'More of her in the chair. She does not name the pounds. She starts hungry.',
  ]},
  { when: { testerStage: [7] }, weight: 4, text: [
    'Heavier in a way that shows when she moves. She blames stress. She does not wait to eat.',
  ]},
  { when: { testerStage: [8] }, weight: 4, text: [
    'She fills the chair. She checks it before sitting. It holds. She eats.',
  ]},
  { when: { testerStage: [9] }, weight: 4, text: [
    'Doorways are a calculation. She still shows up on schedule. The bag is wider.',
  ]},
]);

export function applyHarvestOverhaul() {
  for (const rk of RENEE_KEYS) {
    for (const t of TESTER_STAGES) {
      registerPool(`cultivator.harvest.planned.${rk}.t${t}`, [
        { when: {}, text: [
          '{cultivator.harvest.planned.setup} {cultivator.harvest.planned.body}',
          '{cultivator.harvest.planned.body} {cultivator.harvest.planned.setup}',
          '{cultivator.harvest.planned.setup}',
        ]},
      ]);
      registerPool(`cultivator.harvest.emergency.${rk}.t${t}`, [
        { when: {}, text: [
          '{cultivator.harvest.emergency.setup} {cultivator.harvest.emergency.body}',
          '{cultivator.harvest.emergency.body} {cultivator.harvest.emergency.setup}',
          '{cultivator.harvest.emergency.setup}',
        ]},
      ]);
    }
  }

  for (const t of [6, 7, 8, 9]) {
    registerPool(`cultivator.stageUp.t${t}`, [
      { when: {}, text: [
        '{cultivator.stageUp.body}',
        '{cultivator.choice.setup} {cultivator.stageUp.body}',
        '{cultivator.stageUp.body} {cultivator.choice.body}',
      ]},
    ]);
  }

  registerPool('cultivator.recruitment', [
    { when: {}, text: [
      'Reneé needs a tester. Paid tasting. Technically accurate. The kitchen is already warm.',
      'A candidate from the contact list. She will believe this is culinary research. It is.',
      'Recruitment. Flour on the counter. A stool waiting. Appetite as employment.',
    ]},
  ]);
}
