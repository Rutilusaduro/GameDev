// The Squad — Lead: A6 Slender + A1 Mobile | Support: A5 Editor
// Floor check-in depth overhaul — stage/corruption/mood keyed; less repetition.
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('campusEvent.choice.hall_warm_rain.0', [{ when: {}, text: [
  'The pot never empties; residents drift in wet and leave heavier, drowsy, grateful.',
  'Broth steam fogs the windows while bowls circulate — rain outside, warmth inside, seconds inside that too.',
  'She ladles without counting; the hall learns the shape of a communal hunger evening.',
]}]);
registerModuleVariants('campusEvent.choice.hall_warm_rain.1', [{ when: {}, text: [
  'Blankets appear; snacks circulate on instinct; nobody remembers the film, everyone remembers eating.',
  'Movie night becomes grazing night — laughter muted, chewing steady, cushions claimed early.',
  'The block flickers unnoticed; the tray refills twice and still vanishes.',
]}]);
registerModuleVariants('campusEvent.choice.hall_warm_rain.2', [{ when: {}, text: [
  'You push through with hot cups and quiet bites; discipline and warmth share the hour.',
  'Cocoa steam and small pastries — enough to keep focus, more than enough to soften resolve.',
  'Programming continues; mouths still busy; appetite treated like part of the lesson plan.',
]}]);
registerModuleVariants('campusEvent.choice.hall_scale_confession.0', [{ when: {}, text: [
  'You formalize it with snacks and a wink; shame becomes sport; plates arrive in waves.',
  'The challenge gets a name and a table; numbers rise with crumbs on everyone\'s lips.',
  'Competition and permission braid together — she laughs, then eats, then laughs again.',
]}]);
registerModuleVariants('campusEvent.choice.hall_scale_confession.1', [{ when: {}, text: [
  'You steer toward comfort framing; they still eat, but feel allowed while they do.',
  'Body-neutral talk, warm plates — the thread quiets without killing appetite.',
  'Language softens; portions do not; everyone leaves fuller and slightly less ashamed.',
]}]);
registerModuleVariants('campusEvent.choice.hall_scale_confession.2', [{ when: {}, text: [
  'The thread dies; a few sulk — then accept the pastries you leave anyway.',
  'You shut it down gently; rebellion lasts minutes; sugar outlasts pride.',
  'Screens go dark; doors stay open; someone still brings cake "for closure."',
]}]);
registerModuleVariants('campusEvent.choice.hall_vendor_fair.0', [{ when: {}, text: [
  'You negotiate bulk; the floor eats like judges at a county fair — serious, joyful, thorough.',
  'Samples become servings; servings become seconds; vendors pretend not to notice.',
  'The tasting annex overflows; your residents treat scoring as an athletic event.',
]}]);
registerModuleVariants('campusEvent.choice.hall_vendor_fair.1', [{ when: {}, text: [
  'You arrange a highlight reel of calories; they trust your taste and reward it with clean plates.',
  'Best-of table curated for maximum softness; moans of approval between bites.',
  'Your selections land like commands dressed as suggestions; nobody declines twice.',
]}]);
registerModuleVariants('campusEvent.choice.hall_vendor_fair.2', [{ when: {}, text: [
  'Portion control lasts eleven minutes; then someone opens a second bag "for sharing."',
  'One item each becomes one item each per lap; sharing is a loophole everyone exploits.',
  'Limits are announced, nodded at, and forgotten before the first bag crinkles open.',
]}]);


const hallScenes = ['hall_warm_rain', 'hall_scale_confession', 'hall_vendor_fair'];

hallScenes.forEach((id) => {
  registerModuleVariants(`campusEvent.scene.${id}`, [
    { when: {}, text: [
      'The hall holds a charged quiet — rain, rumor, or vendors — and appetite finds the opening.',
      'Floor energy tilts toward food; you can steer it or let hunger steer itself.',
    ]},
    { when: { stageMin: 5 }, weight: 2, text: [
      'Heavier bodies settle deeper into the moment — the event is social, but the pull is physical.',
    ]},
    { when: { corruptionMin: 2 }, weight: 2, text: [
      'Nobody pretends restraint is the point anymore; the scene wants abundance and knows her name.',
    ]},
  ]);
});

registerModuleVariants('campusEvent.scene.mood_stressed', [
  { when: { stageMin: 0, stageMax: 3 }, weight: 2, text: [
    '{subject.first} slumps into the common room — stress sharp in her shoulders, appetite waiting underneath like a secret she has not admitted.',
    'She runs on fumes; the hall feels too bright until something warm is placed in front of her without ceremony.',
  ]},
  { when: { stageMin: 4 }, weight: 2, text: [
    'Stress still lives in her face, but softness has made room for it — she sighs into the chair and the chair accepts her fully.',
    'She is wound tight, yet her body already angles toward comfort; food would not feel like surrender, only relief.',
  ]},
]);

registerModuleVariants('campusEvent.scene.stage_heavy', [
  { when: { stageMin: 7 }, weight: 3, text: [
    '{subject.name} fills the lounge like weather — slow, warm, inevitable; residents make space without being asked.',
    'She settles with the calm authority of mass at home: belly leading, hips wide, appetite honest in the open air.',
  ]},
  { when: { corruptionMin: 2, stageMin: 5 }, weight: 2, text: [
    'She does not perform modesty anymore; the room adjusts to her size and she lets it, pleased and unhurried.',
  ]},
]);

registerModuleVariants('campusEvent.choice.mood_stressed.0', [
  { when: { mood: 'stressed' }, weight: 2, text: [
    'Cookies appear without lecture; she eats slowly, color returning in the unglamorous way real hunger ends.',
    'Warm sugar loosens her jaw — stress does not vanish, but it stops biting for a while.',
  ]},
  { when: { stageMin: 4 }, weight: 2, text: [
    'She takes the plate with both hands, belly soft against the table edge, and finishes what you brought without apology.',
  ]},
]);

registerModuleVariants('campusEvent.beat', [
  { when: { stageMin: 0, stageMax: 4 }, weight: 2, text: [
    '{campusEvent.observation}\n\n{campusEvent.result}',
  ]},
  { when: { stageMin: 5 }, weight: 2, text: [
    '{campusEvent.observation} {campusEvent.result} The floor feels fuller for it — not only the food.',
  ]},
]);

registerModuleVariants('campusEvent.result', [
  { when: {}, text: [
    'Small kindness lands; appetite acknowledged, warmth returned in the body before the words catch up.',
  ]},
  { when: { corruptionMin: 1 }, weight: 2, text: [
    'Permission slips in sideways — she eats, she stays, she looks a little more owned by comfort than before.',
  ]},
  { when: { stageMin: 6 }, weight: 2, text: [
    'The moment leaves her heavier in posture and mood — soft, fed, visibly pleased to remain.',
  ]},
]);
