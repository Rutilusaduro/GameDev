// Dinner overfill end-of-evening beat — migrated from sessions.getOverfillEndMsg (§9).
import { registerPool } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { render } from '../../engine.js';

registerPool('dinner.overfill', [
  { when: { stageMax: 2 }, weight: 3, text: [
    '{subject.name} goes very still. Both hands on her middle. "I think I need to stop," she says quietly, with genuine surprise. She means it this time.',
    '{subject.first} blinks at her plate, then at her hands. "That\'s… a lot," she murmurs — not performing, actually done.',
  ] },
  { when: { stageMin: 3, stageMax: 5 }, weight: 3, text: [
    '{subject.name} puts her fork down with a kind of finality. "Okay," she says. "Okay, I think that\'s it." She doesn\'t move for a moment. Even for her, that\'s a lot.',
    '{subject.first} exhales and leans back. "I\'m good. Really good." Her hands stay on her belly like punctuation.',
  ] },
  { when: { stageMin: 6, stageMax: 7 }, weight: 3, text: [
    '{subject.name} breathes out slowly, both hands settling on her belly. "I\'m done," she announces, with the gravity of a formal statement. Even she has a limit.',
    '{subject.first} looks at the empty plates, then at you. "That\'s the line," she says — warm, definite, full.',
  ] },
  { when: { stageMin: 8 }, weight: 3, text: [
    '{subject.name} goes completely still. Even she has reached a genuine limit. The room seems to hold its breath.',
    '{subject.first} stops mid-bite and sets everything down. At this size, stopping is its own kind of statement.',
  ] },
  { when: {}, text: [
    '{subject.name} goes still — pleasantly, unmistakably full. The evening ends here.',
    '{subject.first} sighs and smiles. "I can\'t. Not another bite." She means it.',
  ] },
]);

export function renderDinnerOverfill(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  return render('{dinner.overfill}', ctx, { trace: opts.trace || null })?.trim()
    || `${student.name} reaches her limit for the night.`;
}
