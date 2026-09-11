// The Squad — Lead: A5 Editor | Support: A2 Psych, A3 Immobility
// Last-wins session encouragement, tap-out, immobile dinner redirect, settling copy.
import { registerPool, registerDimension, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { ASCENSION_ABILITIES } from '../../../gameData/ascension/abilities.js';

registerDimension('sessionEncId', (ctx) => ctx.globals?.sessionEncId ?? '');
registerDimension('comfortId', (ctx) => ctx.globals?.comfortId ?? '');
registerDimension('abilityId', (ctx) => ctx.globals?.abilityId ?? '');

registerPool('session.encourage.scene', [
  { when: {}, text: [
    '{session.encourage.setup} {session.encourage.body}',
    '{session.encourage.body} {session.encourage.setup}',
    '{session.encourage.setup}',
  ]},
]);

registerPool('session.encourage.setup', [
  { when: {}, text: [
    'You stay close to the table. {subject.name} keeps eating because you asked her to.',
    'A line of praise. A plate that does not stop. She hears both.',
    'You talk her through the next bite. She takes it.',
  ]},
  { when: { sessionEncId: 'enc_praise' }, weight: 5, text: [
    `"You're doing so well," you say. {subject.name} looks up, pleased, and keeps eating.`,
  ]},
  { when: { sessionEncId: 'enc_praise', fullnessMin: 0.7 }, weight: 6, text: [
    `"You're doing so well," you say. She breathes around the packed extra. "Keep saying that."`,
  ]},
  { when: { sessionEncId: 'enc_body' }, weight: 5, text: [
    'You describe what you see. She stills, then takes up more space and eats with more confidence.',
  ]},
  { when: { sessionEncId: 'enc_body', fullnessMin: 0.9 }, weight: 6, text: [
    'You describe how full and round she is right now. "Keep watching," she says. She keeps eating.',
  ]},
  { when: { sessionEncId: 'enc_just_more' }, weight: 5, text: [
    `"Just a little more," you say. The little more is considerably more than a little.`,
  ]},
  { when: { sessionEncId: 'enc_just_more', fullnessMin: 0.95 }, weight: 6, text: [
    `"Just a little more." She gives you a long look. "You always say that." She eats the little more.`,
  ]},
  { when: { sessionEncId: 'enc_made_you' }, weight: 5, text: [
    `"I made this specifically for you." She looks at the food differently. She eats it.`,
  ]},
  { when: { sessionEncId: 'enc_beautiful' }, weight: 5, text: [
    'You tell her how beautiful she is right now. She blinks. Then she keeps eating, settled.',
  ]},
  { when: { sessionEncId: 'enc_beautiful', fullnessMin: 1 }, weight: 6, text: [
    'You tell her how present she is in her body. She closes her eyes. "I know." Her hand stays on her belly.',
  ]},
  { when: { sessionEncId: 'enc_belly' }, weight: 5, text: [
    'You describe the warm swell of her belly through the meal. Her cheeks colour. She does not stop.',
  ]},
  { when: { sessionEncId: 'enc_belly', fullnessMin: 0.8 }, weight: 6, text: [
    'You describe the weight in her lap. She looks down, then at you. "You really see it." She eats slower.',
  ]},
]);

registerPool('session.encourage.body', [
  { when: {}, text: [
    'The extra of her answers the praise. Soft heat. Another swallow.',
    'She believes you enough to take the next bite.',
    'Rapport sits in the chair with her. Sticky. Not leaving yet.',
  ]},
]);

registerPool('session.tapout.scene', [
  { when: {}, text: [
    '{session.tapout.setup} {session.tapout.body}',
    '{session.tapout.body} {session.tapout.setup}',
    '{session.tapout.setup}',
  ]},
]);

registerPool('session.tapout.setup', [
  { when: {}, text: [
    '{subject.name} sets the fork down. Both hands find her middle. "I\'m calling it."',
    'She leans back. Packed. Done. The session ends because she said so.',
    'A palm on the extra of her. "That\'s my wall." She means it.',
  ]},
  { when: { studentId: 0 }, weight: 5, text: [
    'Brittany holds up a captain\'s hand. "I\'m calling it." Competitive. Still proud.',
  ]},
  { when: { studentId: 1 }, weight: 5, text: [
    'Cassidy logs it like a split. "At capacity. Session over. Good data."',
  ]},
  { when: { studentId: 2 }, weight: 5, text: [
    'Kylie reaches for her phone, then stops. The extra is in the way. "Tapping out. That\'s a lot of content."',
  ]},
  { when: { studentId: 5 }, weight: 5, text: [
    'Destiny puts the fork down. "Done. Capacity reached. I have no further comments."',
  ]},
  { when: { studentId: 8 }, weight: 5, text: [
    'Maya goes quiet. A small nod. She is full and she is finished and she wants you to stay anyway.',
  ]},
]);

registerPool('session.tapout.body', [
  { when: {}, text: [
    'She stays seated. Breathing careful. The extra is the whole argument.',
    'No more bites. She is proud of the stop and of the packed extra that made it necessary.',
    'The table can wait. She needs a minute of being exactly this full.',
  ]},
  { when: { stageMin: 6 }, weight: 2, text: [
    'There is a lot of her to settle. She settles it. The session is over.',
  ]},
]);

registerPool('dinner.immobile.scene', [
  { when: {}, text: [
    '{dinner.immobile.setup} {dinner.immobile.body}',
    '{dinner.immobile.setup}',
    '{dinner.immobile.body} {dinner.immobile.setup}',
  ]},
]);

registerPool('dinner.immobile.setup', [
  { when: {}, text: [
    '{subject.name} is not going out. You bring dinner to her. She is already hungry.',
    'A restaurant is a walk she does not take anymore. Delivery is the date.',
    'She is the room now. Food comes to her. So do you.',
  ]},
  { when: { studentId: 0 }, weight: 5, text: [
    'Brittany has not left the reinforced chair. She already knows you were thinking about dinner.',
  ]},
  { when: { studentId: 1 }, weight: 5, text: [
    'Cassidy logged the transit cost. She already texted her order. You are bringing it.',
  ]},
  { when: { studentId: 2 }, weight: 5, text: [
    'Kylie solved restaurants a long time ago. Cameras come to her. Food comes to her. So do you.',
  ]},
  { when: { studentId: 8 }, weight: 5, text: [
    'Maya does not need to explain the doorframe. She is warm and waiting. Bring her food.',
  ]},
]);

registerPool('dinner.immobile.body', [
  { when: {}, text: [
    'Thighs in the chair, belly in her lap, appetite still on the clock.',
    'The hallway is optional. The plate is not.',
    'She is settled. The dinner walks to her.',
  ]},
]);

registerPool('settle.arrival.scene', [
  { when: {}, text: [
    'She has arrived at her settled size. Court her where she rests. Let her keep being kept.',
    'Hold court here. Bring her the day. Tend the extra. She is not going anywhere.',
    'The roster ends at this chair. The evening starts here.',
  ]},
]);

registerPool('settle.refit.scene', [
  { when: {}, text: [
    'She has grown into a new size. Have something made to fit.',
    'Clothes lost the argument. Commission the next set.',
    'The extra arrived. The wardrobe has not caught up. Fix that.',
  ]},
]);

registerPool('settle.comfort.scene', [
  { when: {}, text: [
    '{settle.comfort.setup} {settle.comfort.body}',
    '{settle.comfort.setup}',
    '{settle.comfort.body}',
  ]},
]);

registerPool('settle.comfort.setup', [
  { when: {}, text: [
    'A comfort for the way she lives now. She notices. She stays.',
    'The room learns her. You pay for the lesson.',
    'One more piece of furniture that treats her as the point.',
  ]},
  { when: { comfortId: 'bed' }, weight: 5, text: [
    'The standard bed lost. Build one that can carry her.',
  ]},
  { when: { comfortId: 'fan' }, weight: 5, text: [
    'She runs warm. A fan for where she rests.',
  ]},
  { when: { comfortId: 'position' }, weight: 5, text: [
    'Help her find the settled arrangement that works.',
  ]},
  { when: { comfortId: 'ac' }, weight: 5, text: [
    'Full climate. She generates her own heat at this scale.',
  ]},
  { when: { comfortId: 'arrangement' }, weight: 5, text: [
    'Rearrange the room so everything comes to her.',
  ]},
]);

registerPool('settle.comfort.body', [
  { when: {}, text: [
    'She does not get up to thank you. She does not need to.',
    'The extra of her fills the upgrade immediately.',
    'Comfort as worship. She accepts it as furniture.',
  ]},
]);

const ABILITY = {
  valk_rollcall: ['Squad standard. Appetite follows her banner.', 'Roll call. She names who eats and how proudly.', 'She sets the eating standard. The floor keeps it.'],
  valk_victory_table: ['A squad feast turns victory into body momentum.', 'Victory table. The win lands as extra.', 'Feast as trophy. She keeps the pounds.'],
  valk_shieldmaiden: ['Public pressure drops under her banner.', 'Shieldmaiden cover. The floor looks the other way.', 'Her banner makes scrutiny smaller.'],
  sphinx_open_stacks: ['Reveals a hidden answer for the next threshold.', 'Open stacks. A footnote waits for you.', 'She opens a path you had not catalogued.'],
  sphinx_office_hours: ['A private session deepens fascination.', 'Open hours. Fascination thickens in the chair.', 'She keeps you. The session does the rest.'],
  sphinx_errata: ['A footnote finds money where a week misplaced it.', 'Errata filed. Budget appears in the margin.', 'She corrects the ledger in her favor.'],
  siren_pinned_comment: ['A venue listens harder for a night.', 'Pinned comment. The room leans in.', 'Attention, aimed. She likes the aim.'],
  siren_duet: ['A shared performance becomes a shared meal.', 'Duet. Two mouths, one table.', 'The song ends. The plates do not.'],
  siren_ratio: ['Bad attention turns into legend framing.', 'She ratios the shame into legend.', 'Noise becomes myth. She keeps the myth.'],
  serena_wake: ['A post-lap meal gives her second-climb momentum.', 'Wake in the water. Extra on the deck.', 'She eats after the pool like the pool was warmup.'],
  serena_deep_breath: ['Capacity training makes the next meal land deeper.', 'Deep breath. The next plate has more room.', 'She trains the extra in on purpose.'],
  serena_undertow: ['Pulls a stalled arc back into motion.', 'Undertow. The stall loses.', 'She drags the week back into appetite.'],
};

function three(arr) {
  const list = (arr || []).filter(Boolean);
  const pad = [
    'She spends the charge. The extra of her answers.',
    'Essence spent. Appetite keeps the receipt.',
    'The ability lands. She is more of herself after.',
  ];
  for (const line of pad) {
    if (list.length >= 3) break;
    if (!list.includes(line)) list.push(line);
  }
  return list.slice(0, 6);
}

export function applySessionBeatsOverhaul() {
  for (const ability of ASCENSION_ABILITIES) {
    registerPool(`asc.ability.card.${ability.id}`, [
      { when: {}, text: three(ABILITY[ability.id]) },
    ]);
  }
}

function prefer(poolKey, ctx) {
  const line = render(`{${poolKey}}`, ctx)?.trim();
  if (line && !line.includes('{unresolved}')) return line;
  return '';
}

function dummy() {
  return { id: 0, name: 'She', first: 'She', lbs: 140, startLbs: 118 };
}

export function renderSessionEncourage(encId, student, week = 1) {
  if (!encId || !student) return '';
  return prefer('session.encourage.scene', buildTextContext({
    subject: student,
    week,
    globals: { featureId: 'session', sessionEncId: encId },
  }));
}

export function renderSessionTapout(student, week = 1) {
  if (!student) return '';
  return prefer('session.tapout.scene', buildTextContext({
    subject: student,
    week,
    globals: { featureId: 'session' },
  }));
}

export function renderImmobileRedirect(student, week = 1) {
  if (!student) return '';
  return prefer('dinner.immobile.scene', buildTextContext({
    subject: student,
    week,
    globals: { featureId: 'dinner' },
  }));
}

export function renderSettleArrival(student, week = 1) {
  return prefer('settle.arrival.scene', buildTextContext({
    subject: student || dummy(),
    week,
    globals: { featureId: 'settle' },
  }));
}

export function renderSettleRefit(student, week = 1) {
  return prefer('settle.refit.scene', buildTextContext({
    subject: student || dummy(),
    week,
    globals: { featureId: 'settle' },
  }));
}

export function renderSettleComfort(comfortId, student, week = 1) {
  return prefer('settle.comfort.scene', buildTextContext({
    subject: student || dummy(),
    week,
    globals: { featureId: 'settle', comfortId: comfortId || '' },
  }));
}

export function renderAbilityCard(abilityId, student, week = 1) {
  if (!abilityId) return '';
  return prefer(`asc.ability.card.${abilityId}`, buildTextContext({
    subject: student || dummy(),
    week,
    globals: { featureId: 'ascension', abilityId },
  }));
}
