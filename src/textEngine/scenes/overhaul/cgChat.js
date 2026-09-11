// The Squad — Lead: A5 Editor | Support: A2 Psych, A1 Mobile
// Slot-composed CG group chat + tape reactions. Prefer over CG_CHAT_TEMPLATES.
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';

registerPool('cg.chat.priya', [
  { when: {}, text: [
    '{cg.chat.priya.setup} {cg.chat.priya.body}',
    '{cg.chat.priya.body} {cg.chat.priya.setup}',
    '{cg.chat.priya.setup}\n\n{cg.chat.priya.body}',
  ]},
]);

registerPool('cg.chat.priya.setup', [
  { when: {}, text: [
    'Pinned the week to the board. The numbers are already a meal plan.',
    'Corkboard update. I post like the tape is a rival I intend to beat.',
    'Leading with my measurements. Waiting for the floor to flinch.',
  ]},
  { when: { driveTier: 'Ruthless' }, weight: 3, text: [
    'I posted the board like a verdict. Anyone close gets named. Anyone behind gets filed.',
  ]},
  { when: { driveTier: 'Frenzied' }, weight: 2, text: [
    'This post is hungry. I want replies I can eat. The board is already warming up.',
  ]},
]);

registerPool('cg.chat.priya.body', [
  { when: {}, text: [
    'My waist, bust, hips. I file whoever is winning. Then I ask who got measured.',
    'I want to be the biggest fact in this thread. Food is how I argue later.',
    'Soft mass, a waist the oldest photo no longer owns. Update your columns.',
  ]},
  { when: { stageMin: 8 }, weight: 2, text: [
    'There is a lot of me to compare against. I am treating that as the assignment.',
  ]},
]);

registerPool('cg.chat.followup', [
  { when: {}, text: [
    '{cg.chat.followup.setup} {cg.chat.followup.body}',
    '{cg.chat.followup.body} {cg.chat.followup.setup}',
    '{cg.chat.followup.setup}',
  ]},
]);

registerPool('cg.chat.followup.setup', [
  { when: {}, text: [
    'Back after the replies. I already recategorized the thread.',
    'Second post. I like a clean board. I like a threatened one more.',
    'Checking the replies like a weigh-in. Then I decide who eats.',
  ]},
  { when: { threatFlag: 'yes' }, weight: 4, text: [
    'Someone on the floor is close. I said so. The next binge is already a schedule.',
  ]},
  { when: { threatFlag: 'no' }, weight: 3, text: [
    'The board still belongs to me. Receipt attached. Now I want food.',
  ]},
]);

registerPool('cg.chat.followup.body', [
  { when: {}, text: [
    'Filed the thread next to the threat map. Fuel. Then another measurement.',
    'The drive has a taste. I will eat until the columns look like mine again.',
    'Whoever posted close gets a plate named after them. I am already ordering.',
  ]},
]);

registerPool('cg.chat.resident', [
  { when: {}, text: [
    '{cg.chat.resident.setup} {cg.chat.resident.line}',
    '{cg.chat.resident.line} {cg.chat.resident.setup}',
    '{cg.chat.resident.line}',
  ]},
]);

registerPool('cg.chat.resident.setup', [
  { when: {}, text: [
    'Read the board like a dare.',
    'Thread landed in my pocket. Answering with my body first.',
    'Typing this with a hand already on my middle.',
  ]},
]);

registerPool('cg.chat.resident.line', [
  { when: {}, text: [
    'Posted a number and a look. The look is heavier.',
    'Not here to lose a column. Not saying sorry either.',
    'Soft mass, a screenshot, a promise to eat about it.',
  ]},
  { when: { chatReply: 'ahead' }, weight: 3, text: [
    'One of my columns is still bigger. Screenshotting. Not apologizing.',
    'Lead in at least one stat. Underline it in red, Priya.',
  ]},
  { when: { chatReply: 'behind' }, weight: 3, text: [
    'Your lead is real. Annoying. Filing it as a menu.',
    'Board has me losing a column. Already planning the next plate.',
  ]},
  { when: { chatReply: 'close' }, weight: 3, text: [
    'Margin is tight enough to matter. Would not call it comfortable.',
    'Close numbers. Contested territory. Add another helping if I were you.',
  ]},
  { when: { chatReply: 'proud' }, weight: 3, text: [
    'My trend line is still climbing. I care about that more than the thread.',
    'Steady gains. Posting them like weather I intend to keep.',
  ]},
  { when: { chatReply: 'unmeasured' }, weight: 3, text: [
    'Unmeasured means unknown. Book the tape first.',
    'No official number, no official bragging rights. Measure after dessert.',
  ]},
  { when: { studentId: 0 }, weight: 4, text: [
    'Captain talking. The board is a scoreboard. I intend to win a column.',
  ]},
  { when: { studentId: 2 }, weight: 4, text: [
    'I want lighting before numbers. If it photographs, it counts. I will film the catch-up.',
  ]},
  { when: { studentId: 8 }, weight: 4, text: [
    'Bigger. Ahead. Close. Growing. I will eat either way.',
  ]},
  { when: { studentId: 5 }, weight: 4, text: [
    'Patch notes. Leaderboard, grind, screenshot. I know how ladders work.',
  ]},
  { when: { studentId: 14 }, weight: 4, text: [
    'I would add another helping. Numbers usually follow supper. I mean that kindly.',
  ]},
  { when: { studentId: 15 }, weight: 4, text: [
    'A larger number is a small hunger. I enjoy watching what the lead makes you do.',
  ]},
]);

registerPool('cg.chat.ra', [
  { when: {}, text: [
    '{cg.chat.ra.setup} {cg.chat.ra.body}',
    '{cg.chat.ra.body} {cg.chat.ra.setup}',
    '{cg.chat.ra.setup}',
  ]},
]);

registerPool('cg.chat.ra.setup', [
  { when: {}, text: [
    'Answering in the thread like someone who has seen the board and the body both.',
    'Naming the extra of you. The floor can hear it.',
    'Replying as the RA who watched you pin the week. The extra is the news.',
  ]},
  { when: { raReplyId: 'encourage' }, weight: 4, text: [
    'Your lead is real, Priya. Keep eating. Widen the margins.',
  ]},
  { when: { raReplyId: 'taunt' }, weight: 4, text: [
    'Naming a rival column. I want you irritated enough to order again.',
  ]},
  { when: { raReplyId: 'observe' }, weight: 4, text: [
    'Reading the numbers back without flinching. The board already favors you.',
  ]},
  { when: { raReplyId: 'challenge' }, weight: 4, text: [
    'Picking a category. Overfeed it. The next update should humiliate the gap.',
  ]},
]);

registerPool('cg.chat.ra.body', [
  { when: {}, text: [
    'The extra of you is already the argument. File this as fuel.',
    'You will eat about this. Answering was the feed.',
    'Keep the tape honest. Keep the plates coming.',
  ]},
]);

registerPool('cg.measure.react', [
  { when: {}, text: [
    '{cg.measure.react.setup} {cg.measure.react.body}',
    '{cg.measure.react.body} {cg.measure.react.setup}',
    '{cg.measure.react.setup}',
  ]},
]);

registerPool('cg.measure.react.setup', [
  { when: {}, text: [
    'The tape comes off {ref.name}. Priya writes both numbers before she breathes.',
    'Comparison logged. She stands close enough to feel the difference.',
    'She logs {ref.name} without looking away from the extra of herself.',
  ]},
  { when: { measureRel: 'priya_larger' }, weight: 3, text: [
    'Hers is larger. She records it with the calm of someone extending a lead.',
  ]},
  { when: { measureRel: 'priya_smaller' }, weight: 3, text: [
    'The other number is ahead. She files it as a menu. The next binge has a target.',
  ]},
  { when: { measureRel: 'priya_equal' }, weight: 3, text: [
    'Too close. She underlines the column. Close is a threat she intends to eat through.',
  ]},
]);

registerPool('cg.measure.react.body', [
  { when: {}, text: [
    'Waist, bust, hips, thighs, arms. She wants every category to belong to her.',
    'The tape does not flatter. She likes that. Fuel, then food.',
    'She files the result next to the threat map and reaches for more.',
  ]},
  { when: { measureCat: 'waist' }, weight: 2, text: [
    'The waist column is the one she checks first. Soft mass, a spill the oldest photo lost.',
  ]},
  { when: { measureCat: 'bust' }, weight: 2, text: [
    'Bust numbers. She wants the board to notice the strain before the photo does.',
  ]},
  { when: { measureCat: 'hip' }, weight: 2, text: [
    'Hips take the chair first. She writes the width like a score.',
  ]},
  { when: { measureCat: 'thigh' }, weight: 2, text: [
    'Thighs press. She logs the friction as data. Brittany would screenshot this.',
  ]},
  { when: { measureCat: 'arm' }, weight: 2, text: [
    'Arms soften around the tape. She notes the give, then wants the next category.',
  ]},
]);

function prefer(poolKey, ctx) {
  const line = render(`{${poolKey}}`, ctx)?.trim();
  if (line && !line.includes('{unresolved}')) return line;
  return '';
}

function cgCtx(student, week, globals = {}, ref = null) {
  return buildTextContext({
    subject: student,
    ref,
    week,
    globals: { featureId: 'competitive_gainer', ...globals },
  });
}

export function renderCgChatPriyaPost(student, week = 1, driveTier = 'Invested') {
  if (!student) return '';
  return prefer('cg.chat.priya', cgCtx(student, week, { driveTier }));
}

export function renderCgChatFollowup(student, week = 1, driveTier = 'Invested', threatened = false) {
  if (!student) return '';
  return prefer('cg.chat.followup', cgCtx(student, week, {
    driveTier,
    threatFlag: threatened ? 'yes' : 'no',
  }));
}

export function renderCgChatResident(student, week = 1, chatReply = 'proud') {
  if (!student) return '';
  return prefer('cg.chat.resident', cgCtx(student, week, { chatReply }));
}

export function renderCgChatRaReply(student, week = 1, raReplyId = 'observe', comparison = null) {
  if (!student) return '';
  const ref = comparison?.resident
    || (comparison?.residentName ? { name: comparison.residentName } : null);
  return prefer('cg.chat.ra', cgCtx(student, week, {
    raReplyId,
    bodypart: comparison?.bodypart || 'measurements',
  }, ref));
}

export function renderCgMeasureReaction(student, week = 1, measureRel = 'priya_larger', measureCat = 'waist', target = null) {
  if (!student) return '';
  const ref = target && typeof target === 'object' ? target : { name: String(target || 'a resident') };
  return prefer('cg.measure.react', cgCtx(student, week, { measureRel, measureCat }, ref));
}
