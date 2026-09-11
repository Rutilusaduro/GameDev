// The Squad — Lead: A2 Psych | Support: A6 Slender, A7 Artisan, A5 Editor
import { registerModuleVariants, registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import '../proseOverhaulPass2.js';
import '../proseOverhaulPass3.js';

const W = 4;
const EARLY = { corruption: [0], stageMax: 3 };

registerModuleVariants('wi.replyDialogue', [
  { when: { studentId: 0, origin: 'britt_gymnast', ...EARLY }, weight: W, text: [
    `"Coach would have a whole speech," she says, chin up. "I'm not asking."`,
    `"That's over the line he drew," she mutters. Then, quieter: "Good."`,
  ]},
  { when: { studentId: 0, origin: 'britt_pageant', ...EARLY }, weight: W, text: [
    `"Hips don't lie," she says, already turning toward the mirror. "Fine. Let them."`,
    `"My mother would fix this with posture," she murmurs. "I'm fixing it with dinner."`,
  ]},
  { when: { studentId: 8, origin: 'maya_moved_often', ...EARLY }, weight: W, text: [
    `"It's a new number in a new place," she says. "I'll remember this one."`,
    `"I don't have old data here," she murmurs. "So this is the start."`,
  ]},
  { when: { studentId: 8, origin: 'maya_eight_siblings', ...EARLY }, weight: W, text: [
    `"That's it?" She almost laughs. "We had bowls, not scales."`,
    `"My sisters would call this a light week," she says, unbothered.`,
  ]},
]);

registerModuleVariants('eat.firstBite', [
  { when: { studentId: 0, origin: 'britt_gymnast', ...EARLY }, weight: W, text: [
    'She eats like someone breaking a rule on purpose — first bite sharp, defiant.',
    'The opening forkful is rebellion portioned small. The second is not.',
    'Coach would call this cheating. She calls it finally eating enough.',
  ]},
  { when: { studentId: 0, origin: 'britt_pageant', ...EARLY }, weight: W, text: [
    'She tastes the first bite like a judge, then forgets to be judged.',
    'Presentation first. Appetite second. Appetite is winning faster than she planned.',
    'The crown taught her to pose. The fork teaches her to want.',
  ]},
  { when: { studentId: 8, origin: 'maya_moved_often', ...EARLY }, weight: W, text: [
    'She takes the first bite like testing whether the table will stay put.',
    'The opening mouthful is small, careful — appetite checking in before it commits.',
    'New dorm, new plate, same quiet hunger finally allowed to stay.',
  ]},
  { when: { studentId: 8, origin: 'maya_eight_siblings', ...EARLY }, weight: W, text: [
    'She reaches first, the way someone used to a crowded kitchen does.',
    'The first bite goes down while she is already making room for the second.',
    'No one elbows her here. She eats like the table is still full anyway.',
  ]},
]);

registerModuleVariants('diary.innerBeat', [
  { when: { studentId: 0, origin: 'britt_gymnast', ...EARLY }, weight: W, text: [
    'He said hunger was weakness. I ate anyway. I am not weak. I am here.',
    'The scale is not a coach. I looked anyway. I did not flinch. Small lie.',
  ]},
  { when: { studentId: 0, origin: 'britt_pageant', ...EARLY }, weight: W, text: [
    'Checked my profile in the microwave door. Good light. Better curve. Saved the thought.',
    'Crown hopefuls count everything. I counted tonight. I want the number higher next week.',
  ]},
  { when: { studentId: 8, origin: 'maya_moved_often', ...EARLY }, weight: W, text: [
    'Third address in two years. First kitchen that felt like mine. I ate slowly anyway.',
    'I wrote the number down twice. Not because it shocked me. Because I wanted it to stay.',
  ]},
  { when: { studentId: 8, origin: 'maya_eight_siblings', ...EARLY }, weight: W, text: [
    'Called home. Mom laughed at my small dinner. I had seconds before I called.',
    'The dorm fridge is mine now. I labeled everything. Old habit. Good habit.',
  ]},
]);

// Shape: FULL SENTENCE. Origin backstory bleed for stage 0-3 moments.
registerPool('origin.stirring.line', [
  { when: { studentId: 0, origin: 'britt_gymnast', stageMax: 3 }, weight: W, text: [
    'Old discipline runs in her shoulders. Appetite runs underneath it, winning quietly.',
    'Every bite feels like insubordination. She has stopped apologizing for that.',
  ]},
  { when: { studentId: 0, origin: 'britt_pageant', stageMax: 3 }, weight: W, text: [
    'She catches her reflection mid-meal and does not look away this time.',
    'Pretty was a job. Full is starting to feel like a promotion.',
  ]},
  { when: { studentId: 8, origin: 'maya_moved_often', stageMax: 3 }, weight: W, text: [
    'Something in her loosens when the meal does not end with packing a box.',
    'She eats like a person finally allowed to leave dishes in the sink.',
  ]},
  { when: { studentId: 8, origin: 'maya_eight_siblings', stageMax: 3 }, weight: W, text: [
    'Appetite in her family was never private. She eats like the table is still full.',
    'Seconds are not a confession here. They are how you say you are home.',
  ]},
  { when: { stageMax: 3 }, text: [
    'Something old in her meets something new on the plate.',
    'The week feels ordinary. She does not, quite.',
    'A backstory shows itself in the way she reaches for food.',
  ]},
  { when: {}, text: [
    'The origin sits quietly under the moment.',
    'Old habits speak softly.',
    'The past has not left the table.',
  ]},
]);

export function renderOriginStirring(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const base = render('{origin.stirring.line}', ctx, { trace: opts.trace || null })?.trim() || '';
  const glow = render('{origin.afterglow}', ctx, { trace: opts.trace || null })?.trim() || '';
  const linger = render('{origin.linger}', ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth([base, glow, linger].filter(Boolean).join(' '), 'origin', ctx, opts.v2DepthChance ?? 0.3);
}
