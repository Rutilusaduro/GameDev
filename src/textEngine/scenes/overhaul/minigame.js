// The Squad — Lead: A5 Editor | Support: A1 Mobile, A6 Slender
// Slot-composed evolved minigame phase/log. Prefer over leftover phase.text / choice.log.
import { registerPool, registerDimension, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';

registerDimension('minigameId', (ctx) => ctx.globals?.minigameId ?? '');
registerDimension('minigamePhase', (ctx) => ctx.globals?.minigamePhase ?? 0);
registerDimension('minigameChoice', (ctx) => ctx.globals?.minigameChoice ?? '');
registerDimension('minigameTier', (ctx) => ctx.globals?.minigameTier ?? '');

registerPool('minigame.phase.scene', [
  { when: {}, text: [
    '{minigame.phase.setup} {minigame.phase.body}',
    '{minigame.phase.body} {minigame.phase.setup}',
    '{minigame.phase.setup}\n\n{minigame.phase.body}',
  ]},
]);

registerPool('minigame.phase.setup', [
  { when: {}, text: [
    '{subject.name} takes the round like it was already hers. Food waiting. Witnesses waiting.',
    'A tray, a clock, a body that intends to finish both. {subject.name} does not hurry the looking.',
    'The furniture expected this weight. {subject.name} sits as if the week scheduled it.',
  ]},
  { when: { minigameId: 'campus_challenge', minigamePhase: 0 }, weight: 4, text: [
    'Counter. Menu stacked like a dare. Phones already out. {subject.name} steps up anyway.',
  ]},
  { when: { minigameId: 'campus_challenge', minigamePhase: 1 }, weight: 4, text: [
    'Round two. Heavier tray. Her belt is already honest. The crowd wants a finish.',
  ]},
  { when: { minigameId: 'delivery_order', minigamePhase: 0 }, weight: 4, text: [
    'Couch sprawl. Three apps open. Notification chimes. Nowhere else to be tonight.',
  ]},
  { when: { minigameId: 'delivery_order', minigamePhase: 1 }, weight: 4, text: [
    'Steam fills the room. Bags on the table. She looks at you with permission and appetite together.',
  ]},
  { when: { minigameId: 'presentation_defense', minigamePhase: 0 }, weight: 4, text: [
    'Lounge mic. Review panel. Slides that chart her body while housing pretends they are neutral.',
  ]},
  { when: { minigameId: 'presentation_defense', minigamePhase: 1 }, weight: 4, text: [
    'Follow-up. Someone says wellness. Her hands rest on her midsection without thinking.',
  ]},
]);

registerPool('minigame.phase.body', [
  { when: {}, text: [
    '{word.size} of her takes the seat first. Soft mass, heat, the extra the round is for.',
    'She settles. The plate is a conversation. She intends to win it with her mouth.',
    'Belly first. Then the rest of her. Witnesses can wait while she starts.',
  ]},
  { when: { stageMin: 7 }, weight: 2, text: [
    'At this size the round is also a procession. Soft mass arriving. Staying. Being seen.',
  ]},
]);

registerPool('minigame.log.scene', [
  { when: {}, text: [
    '{minigame.log.setup} {minigame.log.body}',
    '{minigame.log.body} {minigame.log.setup}',
    '{minigame.log.setup}',
  ]},
]);

registerPool('minigame.log.setup', [
  { when: {}, text: [
    'The choice lands in her body. She files it. You stay until the extra of her arrives.',
    'She takes the path you named and makes it heavier. Asking was the feed.',
    'Door open. She eats through it. Soft mass answering in public.',
  ]},
  { when: { minigameChoice: 'speed' }, weight: 4, text: [
    'She attacks the plate like a clock she intends to embarrass.',
  ]},
  { when: { minigameChoice: 'show' }, weight: 4, text: [
    'The room leans in. She makes appetite look like theater and keeps chewing.',
  ]},
  { when: { minigameChoice: 'steady' }, weight: 4, text: [
    'Unnerving calm. Bite, swallow, breathe. The tray loses without a scene.',
  ]},
  { when: { minigameChoice: 'push' }, weight: 4, text: [
    'She groans, laughs, and keeps going. Comfort was never the point of round two.',
  ]},
  { when: { minigameChoice: 'coach' }, weight: 4, text: [
    'Your voice steadies her. She trusts the rhythm and eats to it.',
  ]},
  { when: { minigameChoice: 'tap' }, weight: 4, text: [
    'She stops just shy of bursting, chin high, still the story they came for.',
  ]},
  { when: { minigameChoice: 'feast' }, weight: 4, text: [
    'Drivers stack at the door. She treats every bag like a course she ordered on purpose.',
  ]},
  { when: { minigameChoice: 'favorite' }, weight: 4, text: [
    'One favorite, extra sides. She knows exactly what hits and she orders it twice.',
  ]},
  { when: { minigameChoice: 'snack' }, weight: 4, text: [
    'A modest start that never stays modest. The apps stay open after the first bag.',
  ]},
  { when: { minigameChoice: 'feed' }, weight: 4, text: [
    'Bite, swipe, repeat. You feed her while she queues the next order.',
  ]},
  { when: { minigameChoice: 'solo' }, weight: 4, text: [
    'She performs for an audience of one. You watch. She wants that.',
  ]},
  { when: { minigameChoice: 'pause' }, weight: 4, text: [
    'She pats her belly. The apps stay open. Saving room is a rumor she tells herself.',
  ]},
  { when: { minigameChoice: 'reframe' }, weight: 4, text: [
    'She reframes the numbers as hall log. Curiosity replaces the tight faces.',
  ]},
  { when: { minigameChoice: 'deflect' }, weight: 4, text: [
    'Appendix notes buy time. She bores them precise and keeps eating later.',
  ]},
  { when: { minigameChoice: 'confess' }, weight: 4, text: [
    'Honesty lands like a thrown gauntlet. Appetite was the season plan.',
  ]},
  { when: { minigameChoice: 'hold' }, weight: 4, text: [
    'She holds the line. Abundance is the finding. The curve does not apologize.',
  ]},
  { when: { minigameChoice: 'joke' }, weight: 4, text: [
    'Warmth, a joke at her own expense. Laughter loosens the room. She stays seated.',
  ]},
  { when: { minigameChoice: 'evidence' }, weight: 4, text: [
    'Charts do what charts do. Peer comparison. She wins on numbers and on sit.',
  ]},
  { when: { minigameChoice: 'kitchen_run' }, weight: 4, text: [
    'Hall leftovers arrive mid-round. She makes room without being asked.',
  ]},
  { when: { minigameChoice: 'nook_cam' }, weight: 4, text: [
    'The ring light finds her. The crowd follows the lens. She feeds the camera too.',
  ]},
  { when: { minigameChoice: 'dining_nook' }, weight: 4, text: [
    'She relocates. The dining nook was already waiting with a wider sit.',
  ]},
  { when: { minigameChoice: 'lounge_seat' }, weight: 4, text: [
    'They take the new lounge chairs. They stay. The questions get softer.',
  ]},
]);

registerPool('minigame.log.body', [
  { when: {}, text: [
    '{word.size} of her answers in public. Soft heat. The extra arriving on schedule.',
    'She checks her middle the way some people check a score. Right on time.',
    'The swallow finishes traveling. She breathes around it, pleased with the work.',
  ]},
]);

registerPool('minigame.wrap.scene', [
  { when: {}, text: [
    '{subject.name} exhales, full, satisfied. The round is a receipt her body kept.',
    'Done. Heat, leftover plates, a middle that did the work in public.',
    'She sits with the extra. The furniture has an opinion. She wins it.',
  ]},
  { when: { minigameTier: 'perfect' }, weight: 4, text: [
    'Perfect run. She looks like the tray was always going to lose.',
  ]},
  { when: { minigameTier: 'good' }, weight: 3, text: [
    'Strong showing. Full, pleased, still a little hungry on purpose.',
  ]},
  { when: { minigameTier: 'messy' }, weight: 3, text: [
    'Messy, fed, chin high. The crowd got the finish they came for.',
  ]},
]);

function prefer(poolKey, ctx) {
  const line = render(`{${poolKey}}`, ctx)?.trim();
  if (line && !line.includes('{unresolved}')) return line;
  return '';
}

function minigameCtx(student, week, extras = {}) {
  return buildTextContext({
    subject: student,
    week,
    globals: extras,
  });
}

export function renderMinigamePhase(gameId, phaseIdx, student, week = 1) {
  if (!student) return '';
  const ctx = minigameCtx(student, week, {
    minigameId: gameId || '',
    minigamePhase: phaseIdx ?? 0,
    featureId: gameId || 'minigame',
  });
  return prefer('minigame.phase.scene', ctx);
}

export function renderMinigameLog(choiceId, gameId, student, week = 1) {
  if (!student) return '';
  const ctx = minigameCtx(student, week, {
    minigameId: gameId || '',
    minigameChoice: choiceId || '',
    featureId: gameId || 'minigame',
  });
  return prefer('minigame.log.scene', ctx);
}

export function renderMinigameWrap(tier, gameId, student, week = 1) {
  if (!student) return '';
  const ctx = minigameCtx(student, week, {
    minigameId: gameId || '',
    minigameTier: tier || '',
    featureId: gameId || 'minigame',
  });
  return prefer('minigame.wrap.scene', ctx);
}
