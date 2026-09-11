// The Squad — Lead: A5 Editor | Support: A2 Psych, A6 Slender
// Slot-composed lane-captain off-record chats + season-plan outcomes.
import { registerPool, registerDimension, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { getSuspicionBracket } from '../../../gameData/communityResearcher.js';

const MEMBERS = ['ward', 'harmon', 'rivera'];

registerDimension('chatMember', (ctx) => ctx.globals?.chatMember ?? '');
registerDimension('chatPhase', (ctx) => ctx.globals?.chatPhase ?? 0);
registerDimension('chatBranch', (ctx) => ctx.globals?.chatBranch ?? '');
registerDimension('chatBracket', (ctx) => ctx.globals?.chatBracket ?? '');
registerDimension('thesisOk', (ctx) => !!ctx.globals?.thesisOk);

registerPool('researcher.chat.scene', [
  { when: {}, text: [
    '{researcher.chat.setup}\n\n{researcher.chat.body}',
    '{researcher.chat.body}\n\n{researcher.chat.setup}',
    '{researcher.chat.setup}',
  ]},
]);

registerPool('researcher.chat.setup', [
  { when: {}, text: [
    'A closed door. A folder. Cassidy sits like the extra of the season is already on the table.',
    'Off the record, they said. The room still has a scale in it, even if nobody brought one.',
    'Cassidy keeps the training log in her lap. Warm. A little too full of the week.',
  ]},
  { when: { chatMember: 'ward', chatPhase: 0 }, weight: 4, text: [
    'Nutritionist Ward finds Cassidy in the hallway by the pool lounge. Folder closed the moment she sees her.',
  ]},
  { when: { chatMember: 'harmon', chatPhase: 0 }, weight: 4, text: [
    'AD Harmon\'s office is plants and tea. The cup appears before Cassidy has finished sitting.',
  ]},
  { when: { chatMember: 'rivera', chatPhase: 0 }, weight: 4, text: [
    'Coach Rivera\'s office has no plants. One sheet of paper. Six numbered problems.',
  ]},
  { when: { chatMember: 'ward', chatPhase: 1 }, weight: 4, text: [
    'Ward opens the folder at last. The hallway noise drops away.',
  ]},
  { when: { chatMember: 'harmon', chatPhase: 1 }, weight: 4, text: [
    'Harmon sets her cup down. The next question is not about protocol.',
  ]},
  { when: { chatMember: 'rivera', chatPhase: 1 }, weight: 4, text: [
    'Rivera makes two notes. The pen is louder than the room.',
  ]},
]);

registerPool('researcher.chat.body', [
  { when: {}, text: [
    `"Off the record." She waits. Cassidy can feel the season sitting in her lap.`,
    'The panel wants honesty. The floor already collected it in pounds and wrappers.',
    'Cassidy breathes once. The extra of her answers before she does.',
  ]},
  { when: { chatMember: 'ward', chatPhase: 0 }, weight: 4, text: [
    `"Off the record." Ward's voice stays even. "I understand the protocol better than Rivera wants to."`,
  ]},
  { when: { chatMember: 'harmon', chatPhase: 0 }, weight: 4, text: [
    `"I want to support this season plan. Rivera needs something she can point to. Help me do that."`,
  ]},
  { when: { chatMember: 'rivera', chatPhase: 0 }, weight: 4, text: [
    'She reads the list without heat. External participants. Parallel captain. Intake not logged. "Item one."',
  ]},
  { when: { chatMember: 'ward', chatBranch: 'ack' }, weight: 5, text: [
    `A slow smile. "Sharp read." Folder open. "Full training log. Unedited. Then my name goes on the support line."`,
  ]},
  { when: { chatMember: 'ward', chatBranch: 'explain' }, weight: 5, text: [
    `"The protocol is fine. I already know that." Pause. "I want the rest of the log. The real one."`,
  ]},
  { when: { chatMember: 'harmon', chatBranch: 'probe' }, weight: 5, text: [
    `"The floor work changed you. Your own log says so. Tell me what that means for the honesty of it."`,
  ]},
  { when: { chatMember: 'rivera', chatBranch: 'concede' }, weight: 5, text: [
    `"This is workable." From Rivera, praise comes in two notes. "Nadia. Did you know she was running a parallel log?"`,
  ]},
  { when: { chatMember: 'rivera', chatBranch: 'argue' }, weight: 5, text: [
    `"You're defending positions this panel cannot keep." Pen down. "The ethics rewrite. Then Nadia. Did you know?"`,
  ]},
]);

registerPool('researcher.thesis.scene', [
  { when: {}, text: [
    '{researcher.thesis.setup} {researcher.thesis.body}',
    '{researcher.thesis.body} {researcher.thesis.setup}',
    '{researcher.thesis.setup}',
  ]},
]);

registerPool('researcher.thesis.setup', [
  { when: {}, text: [
    'Season plan review. The folder finally closes.',
    'Cassidy stands with the training log still warm from her lap.',
    'Athletics light. A decision that has already started traveling.',
  ]},
  { when: { thesisOk: true, chatBracket: 'green' }, weight: 4, text: [
    'The panel signs off without a fight. Afternoon light hits Cassidy on the way out.',
  ]},
  { when: { thesisOk: true, chatBracket: 'yellow' }, weight: 4, text: [
    'Conditional approval. A consent appendix still has to be written.',
  ]},
  { when: { thesisOk: true }, weight: 3, text: [
    'The private meetings did their work. The season plan is approved.',
  ]},
  { when: { thesisOk: false }, weight: 4, text: [
    'The panel was not convinced. The file closes on the table.',
  ]},
]);

registerPool('researcher.thesis.body', [
  { when: {}, text: [
    'Cassidy keeps the log. Edited pages and raw ones both.',
    'Whatever comes next starts in the margins of the last entry.',
    'She does not look at the empty chairs on her way out.',
  ]},
  { when: { thesisOk: true, chatBracket: 'green' }, weight: 4, text: [
    'She does not look back. The season is locked. The extra of it walks with her.',
  ]},
  { when: { thesisOk: true, chatBracket: 'yellow' }, weight: 4, text: [
    'Cassidy has a great deal to say in the appendix. She is already writing it in her head.',
  ]},
  { when: { thesisOk: true }, weight: 3, text: [
    'What was said in those rooms stays in those rooms. The floor keeps the rest.',
  ]},
  { when: { thesisOk: false }, weight: 4, text: [
    'She starts a new note in the margin. She will finish it on her terms.',
  ]},
]);

registerPool('researcher.review.open', [
  { when: {}, text: [
    'Coach Rivera sets a folder on the table. "Four case studies. Walk me through what you found."',
    'The panel has the file open. Cassidy has the log. The room has already chosen a temperature.',
    'Rivera does not rush. Harmon has tea. Ward is already reading ahead.',
  ]},
]);

registerPool('researcher.review.vore', [
  { when: {}, text: [
    `"Session seven. Three outside names. No consent sheets." Harmon: "Morgan, Theo, Francesca. Where are they?"`,
    'Ward waits on the passage Cassidy titled The Hunt. She wants it in Cassidy\'s own words.',
    'External participants. First names only. Rivera looks up and stays there.',
  ]},
]);

registerPool('researcher.review.competitive', [
  { when: {}, text: [
    `"Contest night, then sumo grazing. Same residents. Consecutive evenings." Ward: "Which one did you enjoy?"`,
    'Harmon wants the informative one. Ward wants the interesting one. Cassidy has both in her log.',
    'Two-night study. Eating contest, then the mat. The panel has already compared them.',
  ]},
]);

registerPool('researcher.review.manipulation', [
  { when: {}, text: [
    `"Session six. A hall mentor and a psych resident feeding you at once. Did you know about Nadia?"`,
    'Parallel log. Undisclosed. Rivera wants a yes or a no more than she wants a theory.',
    'Daisy on one side. Nadia on the other. Cassidy in the middle of a protocol she did not file.',
  ]},
]);

registerPool('researcher.review.metrics', [
  { when: {}, text: [
    `"Session five. I have read it three times. I still cannot find the season plan's core argument."`,
    'Rivera taps the page. The numbers are there. The thesis is hiding in the intake column.',
    'Metrics without a spine. Harmon looks at Ward. Ward looks at Cassidy.',
  ]},
]);

registerPool('researcher.review.culture', [
  { when: {}, text: [
    `"The cross-cultural session was the strongest work in the set. That section will carry the report."`,
    'Harmon almost smiles. The cleanest night in a file that has not been clean.',
    'One session the panel wants to keep. Cassidy files that away.',
  ]},
]);

registerPool('researcher.review.social', [
  { when: {}, text: [
    `"The taste-testing session was clean floor work. Well handled."`,
    'Harmon marks it like a mercy. Ward does not disagree.',
    'A clean night in the lounge. The panel lets it stand.',
  ]},
]);

registerPool('researcher.review.close', [
  { when: {}, text: [
    'Rivera closes the folder. The next sentence will be a verdict or a hallway.',
    'Harmon looks at Ward. Ward looks at Cassidy. The season holds its breath.',
    'The file is heavier than when it came in. Cassidy feels it in her lap.',
  ]},
  { when: { chatBracket: 'green' }, weight: 4, text: [
    `"The intake logs are real. The argument holds." Harmon: "Approval. Minor revisions." Ward wants the full write-up.`,
  ]},
  { when: { chatBracket: 'yellow' }, weight: 4, text: [
    `"Sound work. Disclose the embedded sessions." Harmon: "The floor is good. The report needs work." Conditional.`,
  ]},
  { when: { chatBracket: 'orange' }, weight: 4, text: [
    `"Not approval. Not rejection." Off-record conversations. Ward stands. "Come find me. We start there."`,
  ]},
  { when: { chatBracket: 'red' }, weight: 4, text: [
    `"If compliance reads this file, careers end." Harmon: "Not in this room." Ward: "One-on-one. All three of us."`,
  ]},
]);

function prefer(poolKey, ctx) {
  const line = render(`{${poolKey}}`, ctx)?.trim();
  if (line && !line.includes('{unresolved}')) return line;
  return '';
}

function joinBeats(parts) {
  return parts
    .map((p) => (p || '').trim())
    .filter((p) => p && !p.includes('{unresolved}'))
    .join('\n\n');
}

function chatBranch(memberIdx, phaseIdx, history) {
  if (phaseIdx === 0) return 'open';
  const h = history || [];
  if (memberIdx === 0) return h.includes('acknowledge') ? 'ack' : 'explain';
  if (memberIdx === 1) return 'probe';
  return h.includes('concede_framework') ? 'concede' : 'argue';
}

function researcherCtx(student, week, extras = {}) {
  return buildTextContext({
    subject: student,
    week,
    globals: extras,
  });
}

export function renderResearcherChat(memberIdx, phaseIdx, history, student, week = 1) {
  if (!student) return '';
  const member = MEMBERS[memberIdx] || '';
  const ctx = researcherCtx(student, week, {
    chatMember: member,
    chatPhase: phaseIdx ?? 0,
    chatBranch: chatBranch(memberIdx, phaseIdx, history),
  });
  return prefer('researcher.chat.scene', ctx);
}

export function renderResearcherThesis(approved, bracket, student, week = 1) {
  if (!student) return '';
  const ctx = researcherCtx(student, week, {
    thesisOk: !!approved,
    chatBracket: bracket || '',
  });
  return prefer('researcher.thesis.scene', ctx);
}

export function renderResearcherReview(pairsUsed, totalSuspicion, student, week = 1) {
  if (!student) return '';
  const did = (id) => (pairsUsed || []).includes(id);
  const bracket = getSuspicionBracket(totalSuspicion || 0);
  const ctx = researcherCtx(student, week, { chatBracket: bracket });
  const parts = [prefer('researcher.review.open', ctx)];
  if (did('vore')) parts.push(prefer('researcher.review.vore', ctx));
  if (did('competitive')) parts.push(prefer('researcher.review.competitive', ctx));
  if (did('manipulation')) parts.push(prefer('researcher.review.manipulation', ctx));
  if (did('metrics')) parts.push(prefer('researcher.review.metrics', ctx));
  if (did('culture_shock') && bracket !== 'red') parts.push(prefer('researcher.review.culture', ctx));
  if (did('social_pressure') && (bracket === 'green' || bracket === 'yellow')) {
    parts.push(prefer('researcher.review.social', ctx));
  }
  parts.push(prefer('researcher.review.close', ctx));
  return joinBeats(parts);
}
