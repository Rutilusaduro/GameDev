// The Squad — Lead: A5 Editor | Support: A2 Psych, A3 Immobility, A6 Slender
// Slot-composed Lilith feast / delivery / digest. Prefer over leftover hunt.feast.sN monoliths.
import { registerPool, registerDimension, render, hasModule } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { getConsumeText } from '../../../gameData/lilith.js';

registerDimension('feastStage', (ctx) => Number(ctx.globals?.feastStage ?? 0));
registerDimension('digestBand', (ctx) => ctx.globals?.digestBand ?? '');

registerPool('hunt.feast.scene', [
  { when: {}, text: [
    '{hunt.feast.setup} {hunt.feast.swallow} {hunt.feast.grow}',
    '{hunt.feast.swallow} {hunt.feast.setup} {hunt.feast.grow}',
    '{hunt.feast.setup} {hunt.feast.grow}',
  ]},
]);

// Shape: FULL SENTENCE. Invite / room / consent. Soft vore: wanted, unharmed, surreal.
registerPool('hunt.feast.setup', [
  { when: {}, text: [
    'Room 312. Incense. He follows her in like the invitation was his idea.',
    'Goth bass through a cheap speaker. He grins. She lets him.',
    'The door shuts. He thinks this is a date. She is already hungrier than that.',
  ]},
  { when: { feastStage: [0, 1, 2] }, weight: 4, text: [
    'Narrow hips, black top, a smile that lets him believe he chose the room.',
    'She is small enough that he looks pleased with himself. She already knows better.',
    'Dim lamps. His hands already reaching. She has been waiting for the lean-in.',
  ]},
  { when: { feastStage: [3, 4, 5, 6] }, weight: 4, text: [
    'She fills more of the doorway than last time. He follows the extra of her inside.',
    'Corset working overtime. He stares. She lets him, then closes the door.',
    'Soft hip, heavy step. He wants closer. She gives him the room to try.',
  ]},
  { when: { feastStage: [7, 8] }, weight: 4, text: [
    'Hallway barely fits her. He still wants closer. She lets him crowd the heat.',
    'She takes up the stall. He comes anyway, crowding the heat of her.',
    'Mass first, then her smile. He reaches into softness like it belongs to him.',
  ]},
  { when: { feastStage: [9] }, weight: 4, text: [
    'She cannot leave the bed. Hunger knocks. The driver steps in and stops, staring.',
    'Room-bound. The knock she ordered. A thick adult in a company polo, recalculating.',
    '"Come in. It is open." The driver does. The silence after is almost a compliment.',
  ]},
]);

// Shape: FULL SENTENCE. The taking. Consensual, gentle, no gore, prey unharmed.
registerPool('hunt.feast.swallow', [
  { when: {}, text: [
    'He leans in. She takes him in. Warmth, then the quiet of being kept.',
    'A kiss that becomes a swallow. He is heat. She is larger for it.',
    'She gathers him the way a body gathers a meal. He goes willingly. Soft. Surreal.',
  ]},
  { when: { feastStage: [0, 1, 2] }, weight: 4, text: [
    'His prize-smile lasts until her mouth is kind and enormous. Then he is simply inside.',
    'She drinks him down in slow gulps. He goes quiet, wanted. The heat is real.',
  ]},
  { when: { feastStage: [3, 4, 5, 6] }, weight: 4, text: [
    'Hands in her softness. Then he is softness too, sliding into the heat of her.',
    'She takes him whole. Her already-round middle makes room like it was waiting.',
  ]},
  { when: { feastStage: [7, 8] }, weight: 4, text: [
    'There is so much of her that taking him is almost a courtesy. He still shivers, pleased.',
    'She leans. He disappears into her the way a secret disappears into a good meal.',
  ]},
  { when: { feastStage: [9] }, weight: 4, text: [
    'The driver reaches first, awed, hands in warm fat. Lilith takes her in after, slow and fond.',
    'The driver leans in, awed. Lilith takes her after, slow and fond.',
  ]},
]);

// Shape: FULL SENTENCE. Growth as pleasure. Stage-legible, no medical, no stage names.
registerPool('hunt.feast.grow', [
  { when: {}, text: [
    'Heat blooms. Soft weight arrives where she wanted it. She pets the new of her.',
    'Hips first. Then the belly. She moans like the extra was a compliment.',
    'The feast settles into flesh. She is rounder, warmer, and very finished with walking it off.',
  ]},
  { when: { feastStage: [0, 1, 2] }, weight: 4, text: [
    'A paunch where the hollow was. Breasts heavier in the lace. Cheeks going soft.',
    'Thighs meet. The corset files a complaint. She smiles at the new lush of her.',
  ]},
  { when: { feastStage: [3, 4, 5, 6] }, weight: 4, text: [
    'Belly domes, heavy and pleased. Ass takes the chair. Cleavage spills the corset\'s argument.',
    'She thickens in every direction that matters. The room has less hallway than it did.',
  ]},
  { when: { feastStage: [7, 8] }, weight: 4, text: [
    'Furniture answers. Belly leads. She kneads the new shelves of herself, shameless.',
    'Seams give. Soft mass wins. She fills the stall and likes the fit.',
  ]},
  { when: { feastStage: [9] }, weight: 4, text: [
    'The bed vanishes under her. Belly claims floor. She is the room now, and hungry still.',
    'She keeps every pound. The driver is warmth inside a body that has stopped pretending to leave.',
  ]},
]);

registerPool('hunt.feast.delivery', [
  { when: {}, text: [
    '{hunt.feast.delivery.setup} {hunt.feast.delivery.body}',
    '{hunt.feast.delivery.body} {hunt.feast.delivery.setup}',
    '{hunt.feast.delivery.setup}',
  ]},
]);

registerPool('hunt.feast.delivery.setup', [
  { when: {}, text: [
    'Too large to leave. Hunger orders out. The hallway is a rumor she does not need.',
    'Campus is memory. The knock is the hunt now. Twice, the way they always knock.',
    'She stays on the bed. The bag will be large. So is she.',
  ]},
]);

registerPool('hunt.feast.delivery.body', [
  { when: {}, text: [
    '"Just set it down." The driver looks at all of her. The look takes a moment.',
    'She smiles in the warm dark. Appetite, specific, already standing up to meet the door.',
    '"Thank you for being on time." The silence after is someone recalculating, fascinated.',
  ]},
]);

registerPool('hunt.digest.scene', [
  { when: {}, text: [
    '{hunt.digest.setup} {hunt.digest.body}',
    '{hunt.digest.body} {hunt.digest.setup}',
    '{hunt.digest.setup}',
  ]},
]);

registerPool('hunt.digest.setup', [
  { when: {}, text: [
    'Lilith is still. The warmth of her is work.',
    'She has been on the couch since the hunt. Processing. Pleased with it.',
    'Incense, slow breath, a body doing private work you can see in the extra of her.',
  ]},
  { when: { digestBand: 'early' }, weight: 4, text: [
    '"Give me time," she says, eyes half-closed. "More to go."',
    'She breathes like the feast is still arriving. You do not rush her.',
  ]},
  { when: { digestBand: 'mid' }, weight: 4, text: [
    'Heavier into the couch. Clothes showing it. She watches you notice.',
    `"This is the part I like," she says. "Where it becomes permanent."`,
  ]},
  { when: { digestBand: 'late' }, weight: 4, text: [
    '"A little longer," she says. "Thank you for not interrupting."',
    'She moves like she has learned to enjoy her own scale. Almost done.',
  ]},
]);

registerPool('hunt.digest.body', [
  { when: {}, text: [
    'The last one is becoming her, slow and complete. Hunger has quieted to a murmur.',
    'She eats when she needs to. No hurry. The work is already in her.',
    'Soft heat under her hands. She pets it like a project that is going well.',
  ]},
]);

registerPool('hunt.digest.complete', [
  { when: {}, text: [
    '{hunt.digest.complete.setup} {hunt.digest.complete.body}',
    '{hunt.digest.complete.body} {hunt.digest.complete.setup}',
    '{hunt.digest.complete.setup}',
  ]},
]);

registerPool('hunt.digest.complete.setup', [
  { when: {}, text: [
    'Lilith stretches for the first time in days. Slow. Magnificent. Every new pound hers.',
    'The feast has finished arriving. She is larger in a way that will not undo.',
    'She sits up into more of herself and looks pleased with the arithmetic.',
  ]},
]);

registerPool('hunt.digest.complete.body', [
  { when: {}, text: [
    `"I am hungry again," she says. "When is the next one?"`,
    'Solid. Permanent. She thanks you with a look and a rumble of fresh appetite.',
    'The hunt can start when she says so. She is already saying so.',
  ]},
]);

registerPool('hunt.digest.blocked', [
  { when: {}, text: [
    '{hunt.digest.blocked.setup} {hunt.digest.blocked.body}',
    '{hunt.digest.blocked.body} {hunt.digest.blocked.setup}',
    '{hunt.digest.blocked.setup}',
  ]},
]);

registerPool('hunt.digest.blocked.setup', [
  { when: {}, text: [
    'Lilith holds up one hand without opening her eyes. "Not yet."',
    'She does not get up. The mass of her shifts as she breathes. "I am busy."',
    'Hunt later. Digest now. She makes that a complete sentence.',
  ]},
]);

registerPool('hunt.digest.blocked.body', [
  { when: {}, text: [
    'Warmth. Focus. The extra of her is still landing.',
    'You can wait. She already is.',
    'The couch has her. The hunger can stand in line.',
  ]},
]);

registerPool('hunt.status.scene', [
  { when: {}, text: [
    '{hunt.status.setup} {hunt.status.body}',
    '{hunt.status.body} {hunt.status.setup}',
    '{hunt.status.setup}',
  ]},
]);

registerPool('hunt.status.setup', [
  { when: {}, text: [
    'She moves through campus like she owns the night. Nobody knows what she is.',
    'Incense in 312. A smile that files people under dinner.',
    'Hunger wearing a walking face. Room 312 stays warm for it.',
  ]},
  { when: { stageMin: 4, stageMax: 6 }, weight: 4, text: [
    'The hunt has been feeding her a new silhouette. Soft hip. Heavier step.',
    'Clothes tell on her now. She wears the extra like a secret that got out.',
  ]},
  { when: { stageMin: 7, stageMax: 8 }, weight: 4, text: [
    'She moves slowly on purpose. Campus paths feel narrower around her.',
    'No hurry in her. The hunger matches her pace and likes it.',
  ]},
  { when: { stageMin: 9 }, weight: 4, text: [
    'She stays. Hunger stays with her. The knock is the hunt now.',
    'Things come to her. A knock, then the extra of her filling the bed.',
  ]},
  { when: { digestBand: 'early' }, weight: 5, text: [
    'She is still. Processing. The extra of the last hunt is still landing.',
    'Couch claimed. Eyes half closed. "Give me time."',
    'Warm, busy, focused. Hunt later. Digest now.',
  ]},
  { when: { digestBand: 'late' }, weight: 5, text: [
    'Almost done. Heavier in the couch. Hungry again in a quiet way.',
    'The last hunt has settled into her. She is waiting on the last of it.',
    'Near the end of processing. The extra of her looks permanent.',
  ]},
]);

registerPool('hunt.status.body', [
  { when: {}, text: [
    'The secret stays in the heat of her. She likes it that way.',
    'You are the only one who is supposed to know. You do.',
    'When she hunts, the floor gets a quieter, heavier resident afterward.',
  ]},
]);

function feastCtx(student, week, extras = {}) {
  return buildTextContext({
    subject: student || { id: 15, name: 'Lilith', lbs: 180, startLbs: 128, archetype: 'predator' },
    week,
    globals: { featureId: 'hunt', ...extras },
  });
}

function prefer(poolKey, ctx) {
  const line = render(`{${poolKey}}`, ctx)?.trim();
  if (line && !line.includes('{unresolved}')) return line;
  return '';
}

export function renderLilithFeast(student, stageId, week = 1, opts = {}) {
  if (!student) return '';
  const sid = Math.min(9, Math.max(0, stageId ?? 0));
  const ctx = feastCtx(student, week, { feastStage: sid, ...(opts.globals || {}) });
  const scene = prefer('hunt.feast.scene', ctx);
  if (scene) return scene;
  const key = `hunt.feast.s${sid}`;
  if (hasModule(key)) {
    const line = render(`{${key}}`, ctx, { trace: opts.trace || null })?.trim();
    if (line) return line;
  }
  return getConsumeText(stageId);
}

export function renderLilithDeliveryIntro(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = feastCtx(student, week, { feastStage: 9, ...(opts.globals || {}) });
  return prefer('hunt.feast.delivery', ctx) || prefer('hunt.feast.deliveryIntro', ctx);
}

export function renderLilithDigest(student, week = 1, digestBand = 'early') {
  if (!student) return '';
  return prefer('hunt.digest.scene', feastCtx(student, week, { digestBand }));
}

export function renderLilithDigestComplete(student, week = 1) {
  if (!student) return '';
  return prefer('hunt.digest.complete', feastCtx(student, week, { digestBand: 'complete' }));
}

export function renderLilithDigestBlocked(student, week = 1) {
  if (!student) return '';
  return prefer('hunt.digest.blocked', feastCtx(student, week, { digestBand: 'blocked' }));
}

export function renderLilithHuntStatus(student, week = 1) {
  if (!student) return '';
  const weeks = Number(student.lilithDigest?.weeksLeft || 0);
  const digestBand = weeks <= 0 ? '' : (weeks <= 2 ? 'late' : 'early');
  return prefer('hunt.status.scene', feastCtx(student, week, { digestBand, digestWeeks: weeks }));
}
