// The Squad — Lead: A5 Editor | Support: A6 Slender, A1 Mobile
// Slot-composed floor check-in body. Prefer over leftover FLOOR_SCENES monoliths.
import { registerPool, registerDimension, registerModule, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';

registerDimension('floorSceneId', (ctx) => ctx.globals?.floorSceneId ?? '');
registerDimension('floorChoiceKind', (ctx) => ctx.globals?.floorChoiceKind ?? '');
registerDimension('extraChoiceId', (ctx) => ctx.globals?.extraChoiceId ?? '');

registerPool('floor.checkin.scene', [
  { when: {}, text: [
    '{floor.checkin.setup} {floor.checkin.body}',
    '{floor.checkin.body} {floor.checkin.setup}',
    '{floor.checkin.setup}',
  ]},
]);

registerPool('floor.checkin.setup', [
  { when: {}, text: [
    '{subject.name} is already in the chair like the check-in was furniture. Snack wrappers tick.',
    'Lounge light. A notebook ignored. {subject.name} keeps a hand on the extra of her without performing it.',
    'The meeting has an agenda. {subject.name} is the warmer item on it.',
  ]},
  { when: { floorSceneId: 'mood_stressed' }, weight: 4, text: [
    '{subject.name} folds into the lounge couch like the week sat down with her. Energy drink sweating. Notebook closed.',
  ]},
  { when: { floorSceneId: 'mood_tired' }, weight: 4, text: [
    '{subject.name} is already half-asleep by the second topic. Chin dropping toward the soft shelf of her chest.',
  ]},
  { when: { floorSceneId: 'mood_nervous' }, weight: 4, text: [
    '{subject.name} fidgets up front. Phone up, phone down. Shirt tugging. Wound tight.',
  ]},
  { when: { floorSceneId: 'mood_focused' }, weight: 4, text: [
    '{subject.name} has barely looked up. Notes immaculate. A pastry torn open at the edge of the page.',
  ]},
  { when: { floorSceneId: 'mood_excited' }, weight: 4, text: [
    '{subject.name} can barely stay seated. She has answered questions you have not asked. The chair creaks fondly.',
  ]},
  { when: { floorSceneId: 'mood_content' }, weight: 4, text: [
    '{subject.name} is already comfortable. The check-in is an excuse to stay in the good chair.',
  ]},
  { when: { floorSceneId: 'hall_snack_break' }, weight: 4, text: [
    'The whole floor leans toward the food like it was the point of the meeting.',
  ]},
  { when: { floorSceneId: 'hall_group_project' }, weight: 4, text: [
    'Hall plans are cancelled. A meal-plan challenge has replaced them. Tasting supplies already on the table.',
  ]},
  { when: { floorSceneId: 'hall_potluck' }, weight: 4, text: [
    'Dishes in a line. Everyone is expected to try everything. The lounge smells like a decision you already made.',
  ]},
  { when: { floorSceneId: 'stage_heavy' }, weight: 4, text: [
    'She fills the seat in every direction that matters. The lounge was built for this and is still catching up.',
  ]},
  { when: { floorSceneId: 'stage_early' }, weight: 4, text: [
    'She sits like she is borrowing the chair. The waistband is only a little honest tonight.',
  ]},
]);

registerPool('floor.checkin.body', [
  { when: {}, text: [
    '{word.size} of her takes the conversation first. Soft mass, heat, the extra the week put on her.',
    'You take her in before the question does. Heat, extra, the week sitting on her.',
    'Her middle keeps a share of the check-in. She rests a hand there without performing it.',
  ]},
  { when: { stageMax: 3, corruption: [0] }, weight: 2, text: [
    'A softer line at the waist. A shirt that meets her like a rumor she has not admitted yet.',
  ]},
  { when: { stageMin: 5, stageMax: 7 }, weight: 2, text: [
    'Belly first. A warm curve her waistband is negotiating with in public.',
  ]},
  { when: { stageMin: 8 }, weight: 2, text: [
    'There is a lot of her to look at. She knows. She does not hurry the looking.',
  ]},
]);

registerPool('floor.checkin.result.scene', [
  { when: {}, text: [
    '{floor.checkin.result.setup} {floor.checkin.result.body}',
    '{floor.checkin.result.body} {floor.checkin.result.setup}',
    '{floor.checkin.result.setup}',
  ]},
]);

registerPool('floor.checkin.result.setup', [
  { when: {}, text: [
    'The check-in closes. The closeness does not. She stays seated.',
    'She says your name once more, like a bookmark, then reaches for whatever is left.',
    'Rapport sits in the chair with her. Warm. A little sticky. Not leaving yet.',
  ]},
  { when: { floorChoiceKind: 'feed' }, weight: 4, text: [
    'The swallow finishes traveling. She breathes around it, pleased with the work.',
  ]},
  { when: { floorChoiceKind: 'talk' }, weight: 3, text: [
    'The conversation ends. She does not get up. The chair keeps her.',
  ]},
  { when: { floorSceneId: 'hall_group_project', floorChoiceKind: 'feed' }, weight: 5, text: [
    'Bring tasting supplies, she said. Tasting samples vanish. The meal-plan challenge is already winning.',
  ]},
]);

registerPool('floor.checkin.result.body', [
  { when: {}, text: [
    '{word.size} of her answers the choice. Soft heat. Extra arriving on schedule.',
    'She checks her middle the way some people check a watch. Right on time.',
    'Another bite would be greedy. She takes it anyway, unhurried.',
  ]},
  { when: { floorChoiceKind: 'feed', stageMin: 6 }, weight: 2, text: [
    'There is so much of her that fullness is weather. You can watch it move.',
  ]},
]);

registerModule('floor.checkin.hall', [
  { when: { floorSceneId: 'hall_group_project' }, priority: 5, text: [
    'Hall plans are cancelled. A meal-plan challenge has replaced them. Bring tasting supplies. Tasting samples already on the table.',
  ]},
  { when: { floorSceneId: 'hall_snack_break' }, priority: 4, text: [
    'The whole floor leans toward the food like it was the point of the meeting.',
  ]},
  { when: { floorSceneId: 'hall_potluck' }, priority: 4, text: [
    'Dishes in a line. Everyone is expected to try everything. The lounge smells like a decision you already made.',
  ]},
  { when: {}, text: [
    'The whole floor leans toward the food like it was the point of the meeting.',
    'Chairs scrape closer. Someone laughs with her mouth full. Nobody apologizes.',
    'The lounge smells like a decision you already made for them.',
  ]},
], { select: 'best' });

registerPool('floor.checkin.extra.scene', [
  { when: {}, text: [
    '{floor.checkin.extra.setup} {floor.checkin.extra.body}',
    '{floor.checkin.extra.body} {floor.checkin.extra.setup}',
    '{floor.checkin.extra.setup}',
  ]},
]);

registerPool('floor.checkin.extra.setup', [
  { when: {}, text: [
    'You walk her off the agenda. Food does the rest.',
    'The extra stop was the real check-in. She already knows.',
    'A detour with a plate. {subject.name} does not argue.',
  ]},
  { when: { extraChoiceId: 'kitchen_walk' }, weight: 5, text: [
    '{subject.name} follows you to the kitchen. Heat does the talking. She eats standing, then sitting.',
  ]},
  { when: { extraChoiceId: 'lounge_chair' }, weight: 5, text: [
    '{subject.name} sinks into the padded chair and does not get up. The seat takes her. She lets it.',
  ]},
  { when: { extraChoiceId: 'dining_nook' }, weight: 5, text: [
    'Venue leftovers wait in the nook. {subject.name} sits like the table was saved for her.',
  ]},
  { when: { extraChoiceId: 'laundry_snack' }, weight: 5, text: [
    'Warm machines, bigger towels. {subject.name} eats while the cycle runs.',
  ]},
  { when: { extraChoiceId: 'media_couch' }, weight: 5, text: [
    'The ring light finds her. {subject.name} performs a bite, then a real one.',
  ]},
  { when: { extraChoiceId: 'alcove_scale' }, weight: 5, text: [
    'The plant almost hides the readout. {subject.name} steps on anyway.',
  ]},
]);

registerPool('floor.checkin.extra.body', [
  { when: {}, text: [
    'She smiles after. Soft heat. The floor did its job.',
    'Rapport sits in the chair with her. A little sticky. Not leaving yet.',
    'Another bite would be greedy. She takes it anyway.',
  ]},
]);

function prefer(poolKey, ctx) {
  const line = render(`{${poolKey}}`, ctx)?.trim();
  if (line && !line.includes('{unresolved}')) return line;
  return '';
}

export function renderFloorCheckinScene(sceneId, student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { floorSceneId: sceneId || '', ...(opts.globals || {}) },
  });
  return prefer('floor.checkin.scene', ctx);
}

export function renderFloorCheckinResult(sceneId, choiceKind, student, week = 1, opts = {}) {
  if (!student) return '';
  const extraChoiceId = opts.globals?.extraChoiceId || opts.extraChoiceId || '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { floorSceneId: sceneId || '', floorChoiceKind: choiceKind || 'talk', extraChoiceId, ...(opts.globals || {}) },
  });
  if (extraChoiceId) {
    const extra = prefer('floor.checkin.extra.scene', ctx);
    if (extra) return extra;
  }
  return prefer('floor.checkin.result.scene', ctx);
}
