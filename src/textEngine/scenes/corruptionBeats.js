// The Squad — Lead: A2 Psych | Support: A5 Editor
// Corruption tier-cross and autonomous stuffing toasts.
import { registerPool, render } from '../engine.js';
import { buildTextContext } from '../../gameData/textContext.js';

// Shape: FULL SENTENCE. Threshold-crossing announcement.
registerPool('corruption.tier.line', [
  { when: { leftoverFed: true, corruption: [1] }, weight: 4, text: [
    `Something has shifted in {subject.name}. Extra help still in her. The guilt is losing. She lingers after eating like she's waiting for permission to want more.`,
    `{subject.name} lingers after the seconds. The guilt is losing. She looks like she wants the next plate named.`,
  ] },
  { when: { leftoverFed: true, corruption: [2] }, weight: 4, text: [
    `{subject.name} has stopped pretending. Extra help already in the trade. Appetite looks proud of itself.`,
    `{subject.name} no longer hides the extra sitting. Restraint got traded. She likes the receipt.`,
  ] },
  { when: { corruption: [1] }, weight: 3, text: [
    `Something has shifted in {subject.name}. The guilt is losing. She lingers after eating now, like she's waiting for permission to want more.`,
    `{subject.name} stays at the table a beat longer. Want is winning the argument she used to win.`,
  ] },
  { when: { corruption: [2] }, weight: 3, text: [
    `{subject.name} has stopped pretending entirely. Whatever she was protecting before — modesty, restraint — she's traded it for appetite. She's proud of the trade.`,
    `{subject.name} asks now. The hesitation is gone. Appetite has the floor.`,
  ] },
  { when: {}, text: [
    `Something has shifted in {subject.name}. Appetite is louder than it was last week.`,
    `{subject.name} lingers after eating. The lingering is the news.`,
    `{subject.name} looks at the empty plate like it was a door she meant to walk through.`,
  ] },
]);

// Shape: FULL SENTENCE. Weekly autonomous stuffing.
registerPool('corruption.auto.line', [
  { when: { leftoverFed: true }, weight: 3, text: [
    `{subject.name} didn't wait for you this week — leftover, then delivery receipts.`,
    `{subject.name} stuffed herself on her own. Extra help first. Then she made sure you'd hear.`,
    `{subject.name} texts a photo of an emptied table. Last sitting already happened. No caption.`,
  ] },
  { when: {}, text: [
    `{subject.name} didn't wait for you this week — the delivery receipts speak for themselves.`,
    `{subject.name} stuffed herself on her own this week, and made sure you'd hear about it.`,
    `{subject.name} texts you a photo of an emptied table. No caption. None needed.`,
  ] },
]);

export function renderCorruptionTierUp(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  return render('{corruption.tier.line}', ctx, { trace: opts.trace || null })?.trim() || '';
}

export function renderCorruptionAuto(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  return render('{corruption.auto.line}', ctx, { trace: opts.trace || null })?.trim() || '';
}
