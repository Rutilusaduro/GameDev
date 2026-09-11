// The Squad — Lead: A5 Editor | Support: A2 Psych, A6 Slender
// Slot-composed intimacy choice/phase display. Prefer over leftover result strings.
import { registerPool, registerDimension, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';

registerDimension('intimacyScene', (ctx) => ctx.globals?.intimacyScene ?? '');
registerDimension('intimacyChoice', (ctx) => ctx.globals?.intimacyChoice ?? '');
registerDimension('intimacyPhase', (ctx) => ctx.globals?.intimacyPhase ?? 0);

registerPool('intimacy.choice.scene', [
  { when: {}, text: [
    '{intimacy.choice.setup} {intimacy.choice.body}',
    '{intimacy.choice.body} {intimacy.choice.setup}',
    '{intimacy.choice.setup}',
  ]},
]);

registerPool('intimacy.choice.setup', [
  { when: {}, text: [
    'You stay close. Warmth. Weight. She lets you feel the extra of her as the point.',
    'Hands, heat, the slow give of her. She does not hide how much there is to hold.',
    'The room shrinks to the press of her. She wants that witnessed. You witness it.',
  ]},
  { when: { intimacyChoice: 'wrap_arms' }, weight: 4, text: [
    'Your arms find the circumference of her. Where they used to meet, they do not now.',
  ]},
  { when: { intimacyChoice: 'press_belly' }, weight: 4, text: [
    'Both hands, spread wide. Warmth through your palms. She makes a small sound.',
  ]},
  { when: { intimacyChoice: 'stay_still' }, weight: 4, text: [
    'You hold the mass of her without resistance. She settles deeper. The weight becomes the room.',
  ]},
  { when: { intimacyChoice: 'linens_nest' }, weight: 4, text: [
    'She drags the oversized linens over both of you. Warmth. Weight. Nowhere else to be.',
  ]},
  { when: { intimacyChoice: 'curtain_dark' }, weight: 4, text: [
    'She lets the dark settle. Her body is the only map left in the room.',
  ]},
  { when: { intimacyScene: 'her_weight' }, weight: 2, text: [
    'She lowers more of herself onto you. The weight is the conversation.',
  ]},
  { when: { intimacyScene: 'belly_focus' }, weight: 2, text: [
    'Your hands stay on the extra of her middle. She breathes into the attention.',
  ]},
  { when: { intimacyScene: 'wall_press' }, weight: 2, text: [
    'The wall takes her back. You take the rest. Soft mass filling the space between.',
  ]},
  { when: { intimacyChoice: 'rock_gently' }, weight: 4, text: [
    'Even a small motion takes effort to start and more to stop. She feels it. Her breath changes.',
  ]},
  { when: { intimacyChoice: 'pull_closer' }, weight: 4, text: [
    'She comes closer with a soft sound, then settles the full length of herself against you.',
  ]},
  { when: { intimacyChoice: 'press_in' }, weight: 4, text: [
    'You press in. The wall holds her. She holds you with the extra of her.',
  ]},
  { when: { intimacyChoice: 'feed_slow' }, weight: 4, text: [
    'Bite by bite, close. She swallows where you can feel it. The extra arrives while you watch.',
  ]},
  { when: { intimacyChoice: 'take_weight' }, weight: 4, text: [
    'You take the weight of her. She lets you. The room rearranges around that fact.',
  ]},
]);

registerPool('intimacy.phase.scene', [
  { when: {}, text: [
    '{intimacy.phase.setup} {intimacy.phase.body}',
    '{intimacy.phase.body} {intimacy.phase.setup}',
    '{intimacy.phase.setup}',
  ]},
]);

registerPool('intimacy.phase.setup', [
  { when: {}, text: [
    '{subject.name} is already close. Warmth. Weight. The extra of her is the conversation.',
    'She settles against you like the furniture expected this. Heat first. Then the rest.',
    'Hands find her. She lets them. The room shrinks to the press of her.',
  ]},
  { when: { intimacyScene: 'her_weight' }, weight: 4, text: [
    'She lowers herself onto you. Sitting, leaning, settling. Her mass becomes a fact in your lap.',
  ]},
  { when: { intimacyScene: 'wall_press' }, weight: 4, text: [
    'The wall takes her back. Soft mass filling the space between. She wants that witnessed.',
  ]},
  { when: { intimacyScene: 'belly_focus' }, weight: 4, text: [
    'Your hands stay on the extra of her middle. She breathes into the attention like it is owed.',
  ]},
  { when: { intimacyScene: 'chest_buried' }, weight: 4, text: [
    'She draws you in. Warmth, give, the hush of a body that takes up more room than last week.',
  ]},
  { when: { intimacyScene: 'thighs_lap' }, weight: 4, text: [
    'Her thighs claim your lap. Heavy, warm, certain. She does not ask if you can take it.',
  ]},
  { when: { intimacyScene: 'under_her' }, weight: 4, text: [
    'You are under her. The weight is geography. She knows. She uses it.',
  ]},
  { when: { intimacyScene: 'feed_close' }, weight: 4, text: [
    'Food between you. She eats close enough that every swallow is a press of her.',
  ]},
  { when: { intimacyScene: 'kissing_pull' }, weight: 4, text: [
    'She kisses like she means the extra of her to arrive in your arms while she does it.',
  ]},
  { when: { intimacyPhase: 1 }, weight: 3, text: [
    'Second beat. She is already further along than the first choice implied.',
  ]},
  { when: { intimacyPhase: 2 }, weight: 3, text: [
    'She has been here long enough that the weight feels decided. She does not ask if you are okay.',
  ]},
]);

registerPool('intimacy.phase.body', [
  { when: {}, text: [
    '{word.size} of her resettles. Soft mass, heat, a slow sway after she stills.',
    'Belly first, then the rest. She lets you keep your hands where they landed.',
    'She is heavier than last time. She knows. She uses it.',
  ]},
  { when: { stageMax: 3 }, weight: 2, text: [
    'There is not much extra yet. Enough that your hands notice. She notices you noticing.',
  ]},
  { when: { stageMin: 4, stageMax: 7 }, weight: 2, text: [
    'Soft mass takes the space between you. Warm. Spreading. She breathes into the hold.',
  ]},
  { when: { stageMin: 8 }, weight: 2, text: [
    'At this size the hold is geography. You do not lift her. You stay under her and mean it.',
  ]},
]);

registerPool('intimacy.ending.scene', [
  { when: {}, text: [
    'She eases off carefully. The warmth stays. She looks satisfied.',
    'Done for now. The extra of her stays in the room after she does.',
    'She smooths her clothes and does not hide the extra. "Well," she says. "Now you know."',
  ]},
]);

registerPool('intimacy.choice.body', [
  { when: {}, text: [
    '{word.size} of her resettles against you. Soft mass, heat, a slow sway after she stills.',
    'She is heavier than last time. She knows. She uses it.',
    'Belly first, then the rest of her. She lets you keep your hands where they landed.',
  ]},
  { when: { stageMin: 8 }, weight: 2, text: [
    'At this size the hold is geography. You do not lift her. You stay under her and mean it.',
  ]},
]);

function prefer(poolKey, ctx) {
  const line = render(`{${poolKey}}`, ctx)?.trim();
  if (line && !line.includes('{unresolved}')) return line;
  return '';
}

export function renderIntimacyPhasePool(sceneId, phaseIdx, student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { intimacyScene: sceneId || '', intimacyPhase: phaseIdx ?? 0, ...(opts.globals || {}) },
  });
  return prefer('intimacy.phase.scene', ctx);
}

export function renderIntimacyEndingPool(sceneId, student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { intimacyScene: sceneId || '', ...(opts.globals || {}) },
  });
  return prefer('intimacy.ending.scene', ctx);
}
