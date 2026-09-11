// Unique extras for intimacy choice/ending parents. Existing keys only.
// Run: node scripts/generateIntimacyUpgrade.mjs
import { writeFileSync } from 'node:fs';
import '../src/textEngine/scenes/intimacy/index.js';
import { _registryEntries } from '../src/textEngine/engine.js';

const OUT = 'src/textEngine/scenes/intimacy/upgrade.js';

const SCENE = {
  her_weight: [
    'The warm mass of her becomes the whole conversation.',
    'She settles her weight like she means to keep it there.',
    'Every pound of her finds a place against you.',
  ],
  wall_press: [
    'The wall takes her softness and gives it back as heat.',
    'Pinned, she still manages to take up more of you.',
    'Paint and plaster vanish; there is only her press.',
  ],
  belly_focus: [
    'Her middle answers first — warm, round, greedy for hands.',
    'The belly is the subject. She knows it. She lets you study.',
    'Softness gathers under your palms and stays.',
  ],
  chest_buried: [
    'You disappear into warmth that has opinions about keeping you.',
    'Her chest makes a room. You stay in it.',
    'Breath and heartbeat replace the rest of the evening.',
  ],
  thighs_lap: [
    'Her thighs close the argument without a word.',
    'Lap and heat and the slow claim of sitting still.',
    'She holds you in place with softness that has learned how.',
  ],
  under_her: [
    'She lets you take the full weather of her.',
    'Under her, the world shrinks to warmth and breath.',
    'She tests the give of you the way she tests a chair — then stays.',
  ],
  feed_close: [
    'Food and closeness share a fork. She does not separate them.',
    'Each bite lands closer. So does she.',
    'Feeding becomes the intimacy, not the prelude.',
  ],
  kissing_pull: [
    'The kiss pulls her whole body into the bargain.',
    'Mouth first, then the rest of her arrives.',
    'She kisses like she is rearranging the room around you.',
  ],
  squeeze_thighs: [
    'Her thighs take the squeeze and ask for another.',
    'Soft muscle, more give than last week, proud of it.',
    'You measure her in handfuls. She lets the number climb.',
  ],
  squeeze_chest: [
    'The weight in your hands is the point. She knows.',
    'She watches you hold what she grew.',
    'Warm, heavy, unhurried — she leans into the grip.',
  ],
  session_high_fullness: [
    'She is too full to pretend this is casual.',
    'Packed and pleased, she wants you close to the evidence.',
    'The evening sits in her middle. She wants it witnessed.',
  ],
  session_tapout: [
    'She stopped eating. She did not stop wanting hands.',
    'Done with the plate, not done being held.',
    'Tap-out is rest, not retreat. She stays against you.',
  ],
  dinner_afterward: [
    'Restaurant heat still on her clothes. Home heat on her skin.',
    'The walk back was short. The settling is not.',
    'Dinner made her softer. She wants that noticed now.',
  ],
};

const ACTION = {
  wrap_arms: 'Your arms circle what they can and pull.',
  press_belly: 'Both palms find the heat of her middle.',
  stay_still: 'You stop adjusting and let her rest.',
  rock_gently: 'A small rock starts a lot of her moving.',
  pull_closer: 'You draw her in until there is no spare air.',
  spread_hands: 'You try to cover her. You fail. She likes the failing.',
  kiss_neck: 'Your mouth finds her neck; her weight shifts to give you more.',
  say_something: 'You say it badly. She hears it anyway.',
  stay_silent: 'You stay quiet. She answers by pressing closer.',
  reach_lower: 'Your hand travels. She does not stop you.',
  press_in: 'You press her in until the wall has a shape.',
  hands_hips: 'Hands on her hips — more hip than last time.',
  let_her_lead: 'You let her set the press. She takes the invitation.',
  drag_hands: 'Your hands drag slow over everything that grew.',
  lift_belly: 'You lift the warm weight of her middle. She helps.',
  press_forehead: 'Foreheads touch. Her body does the rest of the talking.',
  grind_slow: 'The grind is slow because there is more of her to move.',
  whisper_close: 'You whisper into the heat between you.',
  stay_pressed: 'You stay pinned with her. Nobody hurries the press.',
  kiss_jaw: 'A kiss along her jaw; she tilts to keep you there.',
  press_deep: 'You press into the softest part of her and stay.',
  circle_slow: 'Slow circles. Her belly follows your hands.',
  lift_gently: 'You lift, gentle. The mass still surprises.',
  knead_sides: 'You knead the sides where new softness lives.',
  press_navel: 'A palm at her navel. She breathes into it.',
  rest_head: 'You rest your head there. She keeps you.',
  whisper_size: 'You name the size. She does not argue.',
  say_want_more: 'You say you want more of her. She is already nodding.',
  kiss_belly: 'You kiss the belly that has been running the night.',
  keep_hands_moving: 'Your hands keep moving. She makes sure of it.',
  turn_face: 'You turn your face into warmth and stay lost.',
  hands_chest: 'Hands find the heavy warmth of her chest.',
  breathe_slow: 'You match her breathing. The room shrinks.',
  find_heartbeat: 'You find her heartbeat under all that softness.',
  squeeze_gently: 'A gentle squeeze. She answers with more weight.',
  look_up: 'You look up from the warmth. She is watching, pleased.',
  say_something_muffled: 'You try to speak. Softness edits the sentence.',
  stay_forever: 'You make no move to leave. She notices.',
  tell_her_gorgeous: 'You tell her she is gorgeous like this. She believes you.',
  let_weight_press: 'You let the weight press. It is the point.',
  press_thighs_in: 'Her thighs press in. You stay put.',
  hands_on_thighs: 'Hands on her thighs. There is more to hold.',
  settle_in: 'You settle in. She closes the space.',
  measure_thigh: 'You measure a thigh with both hands. Not enough hands.',
  squeeze_back: 'You squeeze back. Softness wins.',
  lean_back_into_her: 'You lean back into her. She takes the lean.',
  trace_inner_thigh: 'A slow trace. She opens the path a little.',
  tell_her_thighs: 'You tell her about her thighs. She keeps you there.',
  stay_held: 'You stay held. She likes the staying.',
  push_deeper: 'You push deeper into the hold. She allows it.',
  take_weight: 'You take her weight. She gives more.',
  hands_back: 'Hands on her back, finding new rolls to praise.',
  breathing: 'You breathe under her. She times herself to you.',
  wrap_up: 'You wrap up what you can reach.',
  shift_under: 'A shift underneath her. She settles heavier.',
  press_belly_up: 'You press up into her belly. She sighs down.',
  say_heavier: 'You ask for heavier. She is happy to oblige.',
  stay_under: 'You stay under. She treats that as correct.',
  reach_face: 'You reach her face. She meets the hand, smiling.',
  feel_movement: 'You feel her move and stay to feel it again.',
  feed_slow: 'You feed her slow. She refuses to rush the swallow.',
  feed_more: 'Another bite. She was already waiting.',
  whisper_eat: 'You whisper eat. She does, close enough to share breath.',
  feel_expansion: 'You feel her expand against you, bite by bite.',
  offer_more: 'You offer more. Her mouth is already yes.',
  belly_around: 'Her belly comes around the moment like furniture.',
  comment_fullness: 'You comment on the fullness. She sounds proud.',
  keep_feeding: 'You keep feeding. She keeps taking.',
  measure_belly: 'You measure the belly between bites.',
  tell_her: 'You tell her what this is doing. She already felt it.',
  pull_tighter: 'You pull her tighter. More of her arrives.',
  hands_face: 'Hands on her face; the rest of her follows.',
  let_her_come: 'You let her come to you. She brings everything.',
  grind_in: 'A slow grind. Softness does the work.',
  hands_everywhere: 'Hands everywhere she has grown.',
  break_look: 'You break the kiss to look. She pulls you back.',
  drag_lips: 'Lips dragged slow. She chases them.',
  say_want_her: 'You say you want her. She makes it obvious.',
  pull_to_couch: 'You pull toward the couch. She is already heavier in the walk.',
  stay_standing: 'You stay standing. She uses you as furniture.',
  squeeze_firm: 'A firm squeeze. Her thigh answers with more give.',
  knead_both: 'You knead both. She steadies herself on you.',
  trace_length: 'You trace the length. There is more length in width.',
  inner_thigh: 'Inner thigh, slow. She lets the room go quiet.',
  measure_squeeze: 'You measure by squeeze. The number is up.',
  move_to_buttocks: 'Your hands travel. She helps the travel.',
  describe_them: 'You describe them. She listens like praise.',
  use_both_hands_inner: 'Both hands, inner. She holds still for it.',
  span_thigh: 'You try to span a thigh. You do not.',
  just_squeeze_hold: 'Just squeeze and hold. She exhales into it.',
  cup_both: 'You cup both. The weight is honest.',
  press_together: 'You press them together. She watches, pleased.',
  knead_slow: 'Slow knead. She leans the weight into your hands.',
  lift_weight: 'You lift the weight. She is proud of the effort.',
  thumbs_focus: 'Thumbs find the sensitive. She stays very still.',
  face_in: 'You put your face there. She keeps you.',
  squeeze_firm_chest: 'A firmer squeeze. She likes being held that way.',
  measure_chest: 'You measure. The measurement has opinions.',
  never_let_go: 'You do not let go. She does not ask you to.',
  come_close: 'You come close to the fullness. She wants you nearer.',
  sit_behind: 'You sit behind her. The packed middle fills your arms.',
  tell_her_full: 'You tell her she is full. She sounds delighted.',
  press_gently: 'Gentle press on a belly that is already a lot.',
  kiss_belly_full: 'You kiss the packed middle. She sighs like thanks.',
  stay_close: 'You stay close. She uses you as a backrest.',
  hold_her: 'You hold her through the tap-out. She lets the plate go.',
  rub_slow: 'Slow rubs. The fullness settles under your hands.',
  tell_her_proud: 'You tell her you are proud. She believes the hands first.',
  move_close: 'You move close after dinner. She is still warm from it.',
  comment_full: 'You comment on how full she is. She does not hide it.',
  offer_more: 'You offer more. She laughs and considers it.',
  stay_long: 'You stay long. She is in no hurry to stand.',
  hand_on_belly: 'A hand on the dinner she is still carrying.',
  plan_next: 'You plan the next meal against her skin.',
};

const END = {
  end0: [
    'After, she stays where the warmth is. No one rushes the getting up.',
    'The moment ends by getting quieter, not by leaving.',
  ],
  end1: [
    'She says something small and true, then keeps her weight on you.',
    'A few words. Mostly she stays. The talking can wait.',
  ],
  end2: [
    'She eases off, smoothed and satisfied, and looks at you like a finished plate.',
    'Dress fixed, expression pleased. She already knows you will do this again.',
  ],
};

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 33 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick(arr, key, n) {
  if (!arr?.length) return '';
  return arr[(hash(key) + n * 19) % arr.length];
}

function trim200(s) {
  return [...s].length > 198 ? s.slice(0, 188).replace(/\s+\S*$/, '') : s;
}

function sceneOf(key) {
  return key.split('.')[1] || '';
}

function tailOf(key) {
  return key.split('.').pop() || '';
}

function line(key, n) {
  const scene = sceneOf(key);
  const tail = tailOf(key);
  const sceneBit = pick(SCENE[scene] || SCENE.her_weight, key, n);
  if (tail.startsWith('end')) {
    const endBit = pick(END[tail] || END.end0, key, n + 1);
    return trim200(`${endBit} ${sceneBit}`);
  }
  const act = ACTION[tail] || 'You stay with her.';
  return trim200(`${act} ${sceneBit}`);
}

const keys = _registryEntries()
  .map(([k]) => k)
  .filter((k) => k.startsWith('intimacy.') && !k.includes('._') && (k.includes('.ch.') || /\.end\d+$/.test(k)));

const lines = [
  '// The Squad — Lead: A2 Psych | Support: A5 Editor',
  '// Auto-generated — run: node scripts/generateIntimacyUpgrade.mjs',
  "import { registerModuleVariants } from '../../engine.js';",
  '',
];

let n = 0;
for (const key of keys) {
  const texts = [...new Set([0, 1].map((i) => line(key, i)).filter(Boolean))];
  if (!texts.length) continue;
  lines.push(`registerModuleVariants(${JSON.stringify(key)}, [{ when: {}, weight: 5, text: ${JSON.stringify(texts)} }]);`);
  n += 1;
}

writeFileSync(OUT, `${lines.join('\n')}\n`);
console.log(`generateIntimacyUpgrade: ${n} pools → ${OUT}`);
