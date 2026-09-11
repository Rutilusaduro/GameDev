// The Squad — Lead: A2 Psych | Support: A6 Slender, A5 Editor
// Lane captain season-plan leftover wrap. Unique thesis/chat stay; wrap is extra slots.
import { registerDimension, registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';

registerDimension('thesisPhase', (ctx) => ctx.globals?.thesisPhase ?? 0);
registerDimension('chatMember', (ctx) => ctx.globals?.chatMember ?? '');

registerPool('community.wrap.setup', [
  { when: { leftoverFed: true, stageMax: 4 }, weight: 3, text: [
    'Galley foil still on Cassidy\'s fingers when the panel folder opens. Appetite under the protocol.',
    'Last night\'s tray plus this review. She stands like the lounge already voted.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Kitchen leftover still in the team jacket. The season plan sits easier for it.',
    'She keeps a hand on last night\'s heat as if the meal log asked a follow-up.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'Night-round knock still in the wood. Daylight panel uses the same open door.',
  ] },
  { when: { thesisPhase: [0] }, weight: 2, text: [
    'Pool-deck conference. Whistle on the table. Cassidy treats appetite like training load.',
  ] },
  { when: { thesisPhase: [1] }, weight: 2, text: [
    'Meal logs, color tabs, a conflict she refuses to pretend is not the point.',
  ] },
  { when: { thesisPhase: [2] }, weight: 2, text: [
    'Panel nods. She writes it in the training log before she hits the stairs.',
  ] },
  { when: { chatMember: 'ward' }, weight: 3, text: [
    'Off the record in a hallway. Ward already followed the floor closer than the file.',
  ] },
  { when: { chatMember: 'harmon' }, weight: 3, text: [
    'Plants, tea, a request for something Rivera can point to.',
  ] },
  { when: { chatMember: 'rivera' }, weight: 3, text: [
    'No plants. One sheet. Six items. Cassidy does not flinch first.',
  ] },
  { when: {}, text: [
    'Athletics wing air. Cassidy\'s season plan is appetite with citations.',
    'Folder, whistle, a body the notes cannot flatten.',
    'She logs the hour the way she logs a split: honest, hungry.',
  ] },
]);

registerPool('community.wrap.growth', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Leftover heat under the jacket. The panel can call it culture. The middle already did.',
    'Last night\'s tray plus this meeting. Softness does the compounding they asked about.',
  ] },
  { when: { stageMax: 4, corruption: [0] }, weight: 2, text: [
    'Clothes still argue. The body is already answering. Shared bites do the convincing.',
  ] },
  { when: { stageMin: 8 }, weight: 2, text: [
    'Getting her settled is the rest of the meeting. She takes the minutes.',
  ] },
  { when: {}, text: [
    'Growth happens between questions. She finishes what the floor put in front of her.',
    'The hour leaves her heavier than it found her. Nobody calls it a finding.',
    'She keeps a hand on the new weight like a note she intends to keep.',
  ] },
]);

registerPool('community.wrap.line', [
  { when: { leftoverFed: true }, weight: 3, text: [
    '"The galley sent leftovers," she does not have to say. The jacket already did.',
  ] },
  { when: { chatMember: 'ward' }, weight: 3, text: [
    '"Full log," Ward wants. Cassidy already ate the honest version.',
  ] },
  { when: {}, text: [
    '"Culture compounds," Cassidy says, and means the lounge.',
    'Someone changes the subject. Nobody changes the plate in her middle.',
    'She looks at you after. The looking is the rest of the review.',
  ] },
]);

registerPool('community.wrap', [
  { when: {}, text: [
    '{community.wrap.setup} {community.wrap.growth} {community.wrap.line}',
    '{community.wrap.setup} {community.wrap.line} {community.wrap.growth}',
    '{community.wrap.growth} {community.wrap.setup} {community.wrap.line}',
  ] },
]);

export function renderCommunityWrap(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: {
      thesisPhase: opts.thesisPhase ?? 0,
      chatMember: opts.chatMember || '',
    },
  });
  return render('{community.wrap}', ctx)?.trim() || '';
}
