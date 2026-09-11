// The Squad — Lead: A5 Editor | Support: A6 Slender, A1 Mobile
// Slot-composed floor check-in body. Prefer over leftover FLOOR_SCENES monoliths.
import { registerPool, registerDimension, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';

registerDimension('floorSceneId', (ctx) => ctx.globals?.floorSceneId ?? '');
registerDimension('floorChoiceKind', (ctx) => ctx.globals?.floorChoiceKind ?? '');

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
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { floorSceneId: sceneId || '', floorChoiceKind: choiceKind || 'talk', ...(opts.globals || {}) },
  });
  return prefer('floor.checkin.result.scene', ctx);
}
