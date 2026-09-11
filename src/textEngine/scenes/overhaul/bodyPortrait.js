// The Squad — Lead: A5 Editor | Support: A6 Slender, A1 Mobile
// Slot-composed current appearance + outfit. Prefer over leftover body.portrait.depth.
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { getStage } from '../../../gameData/stages.js';
import { EVOLVED_OUTFITS } from '../../../gameData/evolvedForms.js';
import { OUTFITS } from '../../../gameData/content.js';

registerPool('body.overhaul.scene', [
  { when: {}, text: [
    '{body.overhaul.face} {body.overhaul.torso} {body.overhaul.lower}',
    '{body.overhaul.torso} {body.overhaul.face} {body.overhaul.lower}',
    '{body.overhaul.face} {body.overhaul.torso}',
  ]},
]);

registerPool('body.overhaul.face', [
  { when: {}, text: [
    '{subject.name}\'s face is open. Warm. Easy to read if you stay looking.',
    'Color in her cheeks. She does not hide it.',
    'She meets your gaze and lets you finish the look.',
  ]},
  { when: { stageMax: 2 }, weight: 3, text: [
    'Still slight in the face. Appetite already living in the eyes.',
    'Sharp at the jaw, soft at the look. She is not done arriving.',
  ]},
  { when: { stageMin: 5, stageMax: 7 }, weight: 3, text: [
    'Cheeks full. Mouth pleased. The extra of her starts at the face and keeps going.',
    'Rounder now. She likes being looked at this size.',
  ]},
  { when: { stageMin: 8 }, weight: 3, text: [
    'Her face sits above a lot of her. Calm. Sure. Fed.',
    'Abundance has a face. She wears it like a decision.',
  ]},
  { when: { mood: ['stressed', 'nervous'], corruption: [0] }, weight: 3, text: [
    'Eyes down first. Then up. Color climbing her throat.',
  ]},
]);

registerPool('body.overhaul.torso', [
  { when: {}, text: [
    '{word.size} across the middle. {word.clothingFit}.',
    'Her torso tells the week. Soft heat under fabric that already knows.',
    'Belly and chest share the chair. Warm. Obvious.',
  ]},
  { when: { stageMax: 2 }, weight: 3, text: [
    'Slight through the torso. Room in the shirt. Appetite writing the next line.',
    'A hint of belly when she sits. She notices. She stays sitting.',
  ]},
  { when: { stageMin: 3, stageMax: 5 }, weight: 3, text: [
    'Middle rounding into her lap. Fabric negotiating. Losing, fondly.',
    'Soft belly, heavier bust. The shirt files a complaint and keeps it.',
  ]},
  { when: { stageMin: 6, stageMax: 8 }, weight: 3, text: [
    'Belly leads. Chest rests on it when she leans. The extra is the outfit.',
    'She fills the chair from the ribs down. Warm mass, unhurried.',
  ]},
  { when: { stageMin: 9 }, weight: 3, text: [
    'Torso as landscape. Belly claims lap and then floor. She lets it.',
    'There is so much of her the shirt is a rumor. Heat does the talking.',
  ]},
]);

registerPool('body.overhaul.lower', [
  { when: {}, text: [
    'Hips and thighs soft with recent gain. The chair already adjusted.',
    'Legs spread comfortably. Warm where they meet.',
    'Lower body rounded, unhurried, pleased with the seat.',
  ]},
  { when: { stageMin: 4, stageMax: 6 }, weight: 2, text: [
    'Thighs touch and stay touching. Hips take the cushion and keep it.',
  ]},
  { when: { stageMin: 7 }, weight: 3, text: [
    'Thighs thick enough to teach the chair manners. She sits like winning.',
    'Hips first when she moves. Mass following, slow and sure.',
  ]},
]);

registerPool('outfit.scene', [
  { when: {}, text: [
    '{outfit.setup} {outfit.body}',
    '{outfit.body} {outfit.setup}',
    '{outfit.setup}',
  ]},
]);

registerPool('outfit.setup', [
  { when: {}, text: [
    'Clothes doing their best. The body doing better.',
    'What she wears is a negotiation with last week\'s size.',
    'Fabric reports the truth. She lets it.',
  ]},
  { when: { archetype: ['cheerleader'] }, weight: 4, text: [
    'Squad leftovers. Soft waistbands. Pom poms somewhere in a drawer.',
  ]},
  { when: { archetype: ['swimmer'] }, weight: 4, text: [
    'Team fleece. Joggers that learned her hips the hard way.',
  ]},
  { when: { archetype: ['bookworm'] }, weight: 4, text: [
    'Cardigan open. Books in the lap that used to be the desk.',
  ]},
  { when: { archetype: ['influencer'] }, weight: 4, text: [
    'Camera-ready stretch. The algorithm asked for more of her. She delivered.',
  ]},
  { when: { archetype: ['athlete'] }, weight: 4, text: [
    'Retired the race kit. Stretch pants. A body that found a better record.',
  ]},
  { when: { archetype: ['artsy'] }, weight: 4, text: [
    'Paint on a flowing top. The canvas is also the outfit.',
  ]},
  { when: { archetype: ['predator'] }, weight: 4, text: [
    'Black layers. Heat underneath. The clothes stay dark so the extra reads first.',
  ]},
  { when: { stageMin: 7 }, weight: 2, text: [
    'Custom, wide, soft. Nothing off the rack survives her.',
  ]},
  { when: { stageMin: 9 }, weight: 3, text: [
    'Draped. Commissioned. The fabric is a landscape now.',
  ]},
]);

registerPool('outfit.body', [
  { when: {}, text: [
    '{word.clothingFit}. She keeps the piece anyway.',
    'Seams working. Heat underneath. She looks finished and is not.',
    'The outfit arrived first. Then more of her arrived after.',
  ]},
]);

registerPool('evolved.attitude.scene', [
  { when: {}, text: [
    '{evolved.attitude.setup} {evolved.attitude.body}',
    '{evolved.attitude.body} {evolved.attitude.setup}',
    '{evolved.attitude.setup}',
  ]},
]);

registerPool('evolved.attitude.setup', [
  { when: {}, text: [
    'She talks about the extra of her like a project that is going well.',
    'Pride first. Then hunger. Then pride again.',
    'The floor already knows. She is still telling you anyway.',
  ]},
  { when: { evolvedForm: 'sumo' }, weight: 4, text: [
    'The board wrote her weight down. She heard it like a cheer.',
  ]},
  { when: { evolvedForm: 'homestead_queen' }, weight: 4, text: [
    'Butter on her wrist. She wants you sitting. The spread is the speech.',
  ]},
  { when: { evolvedForm: 'chapter_hostess' }, weight: 4, text: [
    'Wednesday is feast night. She says it like weather. Reliable. Heavy.',
  ]},
  { when: { evolvedForm: 'community_researcher' }, weight: 4, text: [
    'Training log in her lap. The extra of her is the data.',
  ]},
  { when: { evolvedForm: 'campus_legend' }, weight: 4, text: [
    'The list is a menu. She is the ending the journalist wanted.',
  ]},
]);

registerPool('evolved.attitude.body', [
  { when: {}, text: [
    'She wants more. She says it without dressing it up.',
    'Soft, heavy, pleased. The next pound is already a plan.',
    'You are the witness. She is the proof.',
  ]},
]);

registerPool('body.overhaul.rich', [
  { when: {}, text: [
    '{body.overhaul.face} {body.overhaul.torso}',
    '{body.overhaul.torso} {word.clothingFit}.',
    '{body.overhaul.face} {word.clothingFit}.',
  ]},
]);

registerPool('body.face', [
  { when: {}, text: [
    '{subject.name}\'s face is open. Warm. Easy to read if you stay looking.',
    'Color in her cheeks. She does not hide it.',
    'She meets your gaze and lets you finish the look.',
  ]},
  { when: { stageMax: 2 }, weight: 3, text: [
    'Still slight in the face. Appetite already living in the eyes.',
    'Sharp at the jaw, soft at the look. She is not done arriving.',
  ]},
  { when: { stageMin: 5, stageMax: 7 }, weight: 3, text: [
    'Cheeks full. Mouth pleased. The extra of her starts at the face and keeps going.',
    'Rounder now. She likes being looked at this size.',
  ]},
  { when: { stageMin: 8 }, weight: 3, text: [
    'Her face sits above a lot of her. Calm. Sure. Fed.',
    'Abundance has a face. She wears it like a decision.',
  ]},
]);

registerPool('body.portrait.depth', [
  { when: {}, text: [
    '{body.overhaul.scene}',
    '{body.overhaul.face} {body.overhaul.torso} {body.overhaul.lower}',
    '{body.overhaul.torso} {body.overhaul.face}',
  ]},
]);

registerPool('attitude.line', [
  { when: {}, text: [
    'Hungry, I think. Always hungry lately.',
    'Full of wanting. I have not named it yet.',
    'Appetite keeps score. I keep eating.',
  ]},
  { when: { stageMax: 3, corruption: [0] }, weight: 3, text: [
    'Still negotiating with myself. Hands already reaching.',
    'Resistant in my head. Willing in my mouth.',
    'I do not understand my appetite yet. I am feeding it while I figure it out.',
  ]},
  { when: { corruption: [1] }, weight: 2, text: [
    'I know what I am becoming. I am not stopping.',
    'Willing on impulse. The impulse is faster than guilt.',
    'Half fighting, half leaning in. Leaning wins more often.',
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    'Open. Eager. Done apologizing for wanting more.',
    'Hunger feels like honesty now.',
    'Whatever you ask, I am already halfway to yes.',
  ]},
  { when: { fullnessMax: 0.2 }, weight: 3, text: [
    'Empty and edgy. My stomach is louder than my thoughts.',
    'Ravenous. Point me at a plate.',
    'Hungry again already. Limits are a rumor I stopped repeating.',
  ]},
  { when: { fullnessMin: 0.85 }, weight: 3, text: [
    'So full I can barely think, and peaceful about it.',
    'Stuffed and slow. The chair can keep me.',
    'My stomach is tight and warm. I am floating somewhere above embarrassment.',
  ]},
  { when: { mood: ['stressed'], corruption: [0] }, weight: 3, text: [
    'Everything is due. Appetite is the only honest thing about me right now.',
    'Stress eats holes in my judgment. I fill them with snacks.',
    'Wound tight and eating anyway. Food is the deadline I can meet.',
  ]},
  { when: { mood: ['happy', 'content', 'excited'] }, weight: 2, text: [
    'Good mood, better appetite. I am not hiding either.',
    'Pleased and hungry in the same breath.',
    'I could stay in this chair. The food would find me.',
  ]},
  { when: { devourMin: 1, corruption: [0] }, weight: 4, text: [
    'I keep tasting last night. Warm. Heavy. I ate dinner after and liked both.',
    'Something new lives in my appetite. Soft. Sure. I am still learning the size of it.',
    'I flinch when you say my name too softly. Then I reach for another bite.',
  ]},
  { when: { devourMin: 1, corruption: [2] }, weight: 4, text: [
    'After what I took, obedience feels like relief. Warm relief.',
    'Willing in a direction I cannot write down. My body already said yes.',
    'Appetite and I share a room now. I stopped knocking.',
  ]},
  { when: { stageMin: 7 }, weight: 2, text: [
    'I take up the chair like I paid for it. I did. In pounds.',
    'Heavy and calm. The extra of me is the mood.',
    'I feel the week sitting in my lap. I keep it there.',
  ]},
]);

function prefer(poolKey, ctx) {
  const line = render(`{${poolKey}}`, ctx)?.trim();
  if (line && !line.includes('{unresolved}')) return line;
  return '';
}

export function renderOverhaulPortrait(student, week = 1) {
  if (!student) return '';
  return prefer('body.overhaul.scene', buildTextContext({ subject: student, week, globals: { featureId: 'body' } }));
}

export function renderOverhaulRich(student, week = 1) {
  if (!student) return '';
  return prefer('body.overhaul.rich', buildTextContext({ subject: student, week, globals: { featureId: 'body' } }))
    || renderOverhaulPortrait(student, week);
}

export function renderOutfit(student, week = 1) {
  if (!student) return '';
  const line = prefer('outfit.scene', buildTextContext({
    subject: student,
    week,
    globals: { featureId: 'outfit' },
  }));
  if (line) return line;
  if (student.evolvedForm && getStage(student.lbs).id >= 5) {
    const arr = EVOLVED_OUTFITS[student.evolvedForm];
    if (arr) return arr[Math.min(getStage(student.lbs).id - 5, arr.length - 1)];
  }
  const o = OUTFITS[student.archetype] || OUTFITS.default;
  return o[Math.min(getStage(student.lbs).id, o.length - 1)];
}

export function renderEvolvedAttitude(student, week = 1) {
  if (!student?.evolvedForm) return '';
  return prefer('evolved.attitude.scene', buildTextContext({
    subject: student,
    week,
    globals: { featureId: 'evolved', evolvedForm: student.evolvedForm },
  }));
}
