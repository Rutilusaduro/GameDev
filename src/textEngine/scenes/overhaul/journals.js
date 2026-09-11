// The Squad — Lead: A5 Editor | Support: A2 Psych, A6 Slender
// Slot-composed resident / Nadia journals. Prefer over leftover monolith cells.
import { registerPool, registerDimension, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';

registerDimension('journalArch', (ctx) => ctx.globals?.journalArch ?? '');
registerDimension('journalPage', (ctx) => ctx.globals?.journalPage ?? 0);
registerDimension('journalKind', (ctx) => ctx.globals?.journalKind ?? '');
registerDimension('nadiaLevel', (ctx) => ctx.globals?.nadiaLevel ?? 0);
registerDimension('journalIntro', (ctx) => !!ctx.globals?.journalIntro);

registerPool('journal.feeder.scene', [
  { when: {}, text: [
    '{journal.feeder.setup} {journal.feeder.body}',
    '{journal.feeder.body} {journal.feeder.setup}',
    '{journal.feeder.setup}',
  ]},
]);

registerPool('journal.feeder.setup', [
  { when: {}, text: [
    'Dear journal. Another session. I keep writing so I remember how this started.',
    'I said I would log it. The extra of me is already doing the logging.',
    'Ink first. Then the body. Then whatever she brought tonight.',
  ]},
  { when: { journalArch: 'cheerleader' }, weight: 4, text: [
    'Dear journal. Floor favor plus snacks sounded like extra credit. The skirt already has opinions.',
  ]},
  { when: { journalArch: 'swimmer' }, weight: 4, text: [
    'Logged it like a split. Evening feedings. Waistband already filing a note.',
  ]},
  { when: { journalArch: 'bookworm' }, weight: 4, text: [
    'Method first. Snacks as protocol. My notes keep wandering toward the warmth.',
  ]},
  { when: { journalArch: 'influencer' }, weight: 4, text: [
    'This was supposed to be content. Crop tops are already negotiating. I hate that I keep filming anyway.',
  ]},
  { when: { journalArch: 'athlete' }, weight: 4, text: [
    'I signed for floor favor. Training shorts are softer at the waist. I keep telling myself it is temporary.',
  ]},
  { when: { journalArch: 'artsy' }, weight: 4, text: [
    'She called it a living piece. The smock is already taking a new silhouette I did not sketch.',
  ]},
]);

registerPool('journal.feeder.body', [
  { when: {}, text: [
    'She watches me eat. I write that down like it is data. It is not only data.',
    'Fullness stays after she leaves. I rest a hand there and pretend I am checking.',
    'I keep thinking about the next session before this one is finished.',
  ]},
  { when: { stageMax: 2 }, weight: 3, text: [
    'Not much extra yet. A rumor at the waist. A shirt that meets me like a question.',
  ]},
  { when: { stageMin: 3, stageMax: 5 }, weight: 3, text: [
    'Belly first. Soft, round, sitting in my lap when I write. She likes that I notice.',
  ]},
  { when: { stageMin: 6, stageMax: 8 }, weight: 3, text: [
    'There is a lot of me to log. Heat, sway, the chair answering. I want the next plate.',
  ]},
  { when: { stageMin: 9 }, weight: 3, text: [
    'I write from the bed now. The extra of me is the furniture. She brings the food to me.',
  ]},
]);

registerPool('journal.nadia.scene', [
  { when: {}, text: [
    '{journal.nadia.setup} {journal.nadia.body}',
    '{journal.nadia.body} {journal.nadia.setup}',
    '{journal.nadia.setup}',
  ]},
]);

registerPool('journal.nadia.setup', [
  { when: {}, text: [
    'Dear journal. Hall log open. {subject.name} is the variable I keep returning to.',
    'Private notes. {subject.name} in the chair. I write while the extra of her arrives.',
    'I told the panel this was appetite dynamics. It is. It is also her, warming the page.',
  ]},
  { when: { journalIntro: true }, weight: 4, text: [
    'Dear journal. I chose {subject.name} for the hall log. The extra of her is what I want to watch happen.',
  ]},
  { when: { journalArch: 'cheerleader' }, weight: 3, text: [
    'Brittany in the log. Energy first. Softness underneath. I want the second one on the page.',
  ]},
  { when: { journalArch: 'swimmer' }, weight: 3, text: [
    'Cassidy logs splits. I log the waistband. We are keeping two books on the same body.',
  ]},
  { when: { nadiaLevel: 0 }, weight: 2, text: [
    'I am still pretending this is only observation. My hand on the extra of me knows better.',
  ]},
  { when: { nadiaLevel: 1 }, weight: 2, text: [
    'I want her heavier against me. The log is the excuse. The warmth is the point.',
  ]},
  { when: { nadiaLevel: 2 }, weight: 2, text: [
    'I write from the bed. She comes to me. The log fills the way I do: slowly, then all at once.',
  ]},
]);

registerPool('journal.nadia.body', [
  { when: {}, text: [
    'I feed her. I watch the swallow. I write the heat down before I forget how it felt.',
    'She leaves rounder. I stay with the sentence until it is true.',
    '{word.size} of her answers the protocol. I keep the protocol hungry on purpose.',
  ]},
  { when: { stageMax: 2 }, weight: 3, text: [
    'Still tight in places. A rumor I can feel when I hug her goodbye. I already want more rumor.',
  ]},
  { when: { stageMin: 3, stageMax: 5 }, weight: 3, text: [
    'Soft middle now. Thighs beginning to tell. I keep her longer after the last plate.',
  ]},
  { when: { stageMin: 6, stageMax: 8 }, weight: 3, text: [
    'She fills the chair. I fill the notes. We press together and the log calls it data.',
  ]},
  { when: { stageMin: 9 }, weight: 3, text: [
    'She is geography I get to hold. I do not get up. She does not make me.',
  ]},
]);

function prefer(poolKey, ctx) {
  const line = render(`{${poolKey}}`, ctx)?.trim();
  if (line && !line.includes('{unresolved}')) return line;
  return '';
}

export function renderFeederJournalPool(archetype, page, student, week = 1) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: {
      journalArch: archetype || student.archetype || '',
      journalPage: page ?? 0,
      journalKind: 'feeder',
    },
  });
  return prefer('journal.feeder.scene', ctx);
}

export function renderNadiaJournalPool(archetype, page, nadiaLevel, student, week = 1) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: {
      journalArch: archetype || student.archetype || '',
      journalPage: page ?? 0,
      journalKind: 'nadia',
      nadiaLevel: nadiaLevel ?? 0,
      journalIntro: page === -1,
    },
  });
  return prefer('journal.nadia.scene', ctx);
}
