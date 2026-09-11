// The Squad — Lead: A5 Editor | Support: A2 Psych, A6 Slender
// Slot-composed intimacy choice/phase display. Prefer over leftover result strings.
import { registerPool, registerDimension } from '../../engine.js';

registerDimension('intimacyScene', (ctx) => ctx.globals?.intimacyScene ?? '');
registerDimension('intimacyChoice', (ctx) => ctx.globals?.intimacyChoice ?? '');

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
