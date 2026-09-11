// The Squad — Lead: A1 Mobile | Support: A6 Slender, A5 Editor
// Evolved minigame phases — slot skeleton. Unique phase.text is fallback.
import { registerDimension, registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';

registerDimension('minigameId', (ctx) => ctx.globals?.minigameId ?? '');
registerDimension('miniPhase', (ctx) => ctx.globals?.miniPhase ?? 0);

// Shape: FULL SENTENCE. Where she is standing / sprawling.
registerPool('minigame.phase.lead', [
  { when: { minigameId: 'campus_challenge', leftoverFed: true }, weight: 4, text: [
    'Counter already knows her. Galley leftover still under her shirt. The menu is the second course.',
    '{subject.name} steps up warm from last night\'s tray. Phones out. The challenge starts halfway full.',
  ] },
  { when: { minigameId: 'campus_challenge', stageMax: 4, corruption: [0] }, weight: 3, text: [
    '{subject.name} steps up to the counter. The menu towers. A crowd forms like she might still fold.',
    'Phones out. She tugs a shirt that still almost works and looks at the plate like a dare she did not order.',
  ] },
  { when: { minigameId: 'campus_challenge', stageMin: 8 }, weight: 3, text: [
    'The counter was not built for her. She takes it anyway. {subject.lbs} lbs of legend the kitchen already fears.',
    'Staff swap in a heavier tray before she sits. Her middle arrives first. The crowd wants a finish.',
  ] },
  { when: { minigameId: 'campus_challenge' }, weight: 3, text: [
    '{subject.name} steps up. Menu tall. Crowd already forming, waiting to see if she folds.',
    'Campus challenge light on her. {subject.lbs} lbs. The plate is the argument.',
  ] },
  { when: { minigameId: 'delivery_order', leftoverFed: true }, weight: 4, text: [
    'Foil still on the coffee table. {subject.name} opens three apps anyway. Leftover was the appetizer.',
    'Couch already claimed. Last night\'s tray, then notification chimes. Nowhere else to be.',
  ] },
  { when: { minigameId: 'delivery_order', stageMax: 4 }, weight: 3, text: [
    '{subject.name} sprawls on the couch, three delivery apps open. Quiet apartment. Hungry thumbs.',
    'Notification chimes. She looks at you like permission might keep this modest. It will not.',
  ] },
  { when: { minigameId: 'delivery_order', stageMin: 8 }, weight: 3, text: [
    'The couch is a nest. {subject.name} at {subject.lbs} lbs fills it. Drivers will stack at a door that barely opens.',
    'Steam later. For now the apps. She does not plan to stand for the bags.',
  ] },
  { when: { minigameId: 'delivery_order' }, weight: 3, text: [
    '{subject.name} sprawls, three apps open. The apartment is quiet except for chimes.',
    'Home nest night. She looks at you — appetite and a delivery window in the same glance.',
  ] },
  { when: { minigameId: 'presentation_defense', leftoverFed: true }, weight: 4, text: [
    'Hall lounge mic. Galley heat still in her. The slides chart a body that already ate.',
    'Panel questions wait. Leftover warmth sits in her lap like a citation.',
  ] },
  { when: { minigameId: 'presentation_defense', stageMax: 4 }, weight: 3, text: [
    '{subject.name} stands at the hall lounge mic. Season-plan slides pretend the body is neutral.',
    'Review panel. Her hands find her midsection without thinking. The data is already there.',
  ] },
  { when: { minigameId: 'presentation_defense', stageMin: 8 }, weight: 3, text: [
    'The mic is optional. She sits for the panel. {subject.lbs} lbs answers before the slides do.',
    'Housing language, lounge furniture, a body the notes cannot flatten. She lets them look.',
  ] },
  { when: { minigameId: 'presentation_defense' }, weight: 3, text: [
    '{subject.name} at the lounge mic. The panel has questions. Her season plan is appetite with citations.',
    'Follow-up hour. Someone says wellness. Her hands rest on her middle without thinking.',
  ] },
  { when: {}, text: [
    '{subject.name} settles in. The next round is already food.',
    'She looks at you, then at the plate. The looking is the start.',
    'Warm room, an audience, a body ready to take more than the plan admitted.',
  ] },
]);

// Shape: FULL SENTENCE. What the round asks of her.
registerPool('minigame.phase.action', [
  { when: { leftoverFed: true, miniPhase: [0] }, weight: 4, text: [
    'First plate lands on leftover heat. She takes it like the kitchen already voted.',
    'The opener is extra. Last night did the convincing. This hour does the proving.',
  ] },
  { when: { leftoverFed: true, miniPhase: [1] }, weight: 4, text: [
    'Round two finds a middle still occupied. She makes room anyway.',
    'Heavier tray, leftover still working. The finish is a second settling.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'Night-round knock still in the wood. This round uses the same open door.',
    'You saw her after hours. Daylight does not put the appetite away.',
  ] },
  { when: { miniPhase: [0], stageMax: 4 }, weight: 3, text: [
    'The first plate is supposed to be a test. Her waistband files a different report.',
    'She starts careful. Careful lasts about four bites.',
  ] },
  { when: { miniPhase: [0] }, weight: 2, text: [
    'Opening round. She chooses a pace and the room leans in.',
    'The first tray arrives. She does not hide how ready she is.',
  ] },
  { when: { miniPhase: [1], stageMin: 7 }, weight: 3, text: [
    'Staff swap in weight. Her belt is already a rumor. The crowd wants the last swallow.',
    'Follow-up is heavier. She keeps a hand on the new curve like taking minutes.',
  ] },
  { when: { miniPhase: [1] }, weight: 2, text: [
    'Round two. The tray gets honest. She stays with it.',
    'Follow-up questions, follow-up plates. Same appetite answering both.',
  ] },
  { when: {}, text: [
    'The round asks her to eat. She does.',
    'Food in front of her, witnesses around her, no clean exit that still looks like winning.',
    'She keeps going. Growth happens in the swallows between choices.',
  ] },
]);

// Shape: DIALOGUE BEAT.
registerPool('minigame.phase.line', [
  { when: { leftoverFed: true }, weight: 3, text: [
    '"The galley sent me in warm," she says, already reaching.',
    'She eyes the tray. "If that is leftover, it is still mine."',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    '"You were up late," you do not have to say. She already has a fork.',
  ] },
  { when: { minigameId: 'campus_challenge' }, weight: 3, text: [
    '"Watch," she says, and the crowd does.',
    'She grins around a bite. "Folding was never the plan."',
  ] },
  { when: { minigameId: 'delivery_order' }, weight: 3, text: [
    '"Order again," she says, mouth full, apps still open.',
    'She pats the couch. "The bags can come to me."',
  ] },
  { when: { minigameId: 'presentation_defense' }, weight: 3, text: [
    '"Abundance is the finding," she says, and does not apologize for the curve.',
    'She sits for the last question. "The body already answered."',
  ] },
  { when: {}, text: [
    '"Thanks, RA," she says, already reaching.',
    'She looks at you, then at the food. The looking is the rest of the round.',
    '"One more," she says, and the one is already lying.',
  ] },
]);

registerPool('minigame.phase.scene', [
  { when: {}, text: [
    '{minigame.phase.lead} {minigame.phase.action} {minigame.phase.line}',
    '{minigame.phase.lead} {minigame.phase.line} {minigame.phase.action}',
    '{minigame.phase.action} {minigame.phase.lead} {minigame.phase.line}',
  ] },
]);

// Shape: FULL SENTENCE. Close of a finished run.
registerPool('minigame.phase.done', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'She exhales, full twice over. Galley leftover plus this round. The chair keeps both.',
    'Satisfied, heavier, still tasting last night. She does not get up fast.',
  ] },
  { when: { stageMax: 4, corruption: [0] }, weight: 2, text: [
    'She exhales, flushed, tugging cloth that almost still works. The round is in her now.',
  ] },
  { when: { stageMin: 8 }, weight: 2, text: [
    'She settles. Full. The furniture reports the finish long after she stops moving.',
  ] },
  { when: {}, text: [
    'She exhales, full and satisfied. The extra of her arrived while the round was busy.',
    'Done. Warm. She keeps a hand on the new weight like a score.',
    'The plates are gone. She is not. Fullness is the encore.',
  ] },
]);

export function renderMinigamePhase(student, week, gameId, phaseIdx) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { minigameId: gameId, miniPhase: phaseIdx },
  });
  return render('{minigame.phase.scene}', ctx)?.trim() || '';
}

export function renderMinigameDone(student, week, gameId) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { minigameId: gameId, miniPhase: 1 },
  });
  return render('{minigame.phase.done}', ctx)?.trim() || '';
}
