// ═══════════════════════════════════════════════════════════════
// WEEKLY EVENT — chair incidents keyed by weight stage
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../../engine.js';

// FULL SENTENCE — stage-up narrative chair (NARRATIVE_EVENTS chair_breaks)
registerPool('weekly.chairBreaks.buildup', [
  { when: { studentId: 5 }, priority: 1, weight: 4, text: [
    'The chair under {subject.name} creaks louder with every minute until finally it tilts just enough to make her grab the desk.',
  ] },
  { when: { studentId: 10 }, priority: 1, weight: 4, text: [
    '{subject.name}\'s chair groans all through seminar — a long complaining creak whenever she leans back.',
  ] },
  { when: { endStageMax: 4 }, text: [
    '{subject.name}\'s chair groans all through seminar — a long complaining creak whenever she leans back.',
    'The chair under {subject.name} creaks louder with every minute until finally it tilts just enough to make her grab the desk.',
  ] },
  { when: { endStageMin: 5, endStageMax: 6 }, text: [
    'A lounge chair gives way under {subject.name} with a loud crack.',
    'The chair under {subject.name} lets out a sharp crack and lists sideways.',
  ] },
  { when: { endStageMin: 7 }, text: [
    '{subject.name}\'s chair snaps instantly — no groan, no warning.',
    'It happens during a quiet part of floor meeting — a sharp snap, then {subject.name} is suddenly much lower.',
  ] },
  { when: {}, text: [
    'A lounge chair gives way under {subject.name}.',
    'The chair under {subject.name} fails without warning.',
  ] },
]);

registerPool('weekly.chairBreaks.break', [
  { when: { studentId: 10 }, priority: 1, weight: 4, text: [
    'She leans back once more and the chair finally gives — a sharp crack, then a tilt that sends her grabbing the desk.',
    'On the next lean the frame surrenders with a loud snap. She catches herself on the desk, cheeks pink.',
  ] },
  { when: { studentId: 5 }, priority: 1, weight: 4, text: [
    'She laughs once, surprised.',
  ] },
  { when: { studentId: 13 }, priority: 1, weight: 4, text: [
    'The seat drops out from under her with a crack that stops the room cold.',
  ] },
  { when: { endStageMax: 4 }, text: [
    'She laughs once, surprised.',
    'She grabs the desk with both hands and goes very still.',
  ] },
  { when: { endStageMin: 5, endStageMax: 6 }, text: [
    'She goes bright red.',
    'For a moment the room is very quiet.',
  ] },
  { when: { endStageMin: 7 }, text: [
    'She lets out a short laugh before she can stop herself.',
    'She sighs the sigh of someone who saw this coming.',
  ] },
  { when: {}, text: [
    'The failure is audible. The room notices.',
  ] },
]);

registerPool('weekly.chairBreaks.playerAid', [
  { when: {}, text: [
    'You slide a sturdier chair over.',
    'You produce a reinforced chair from behind your desk without a word.',
    'You wave off the moment and keep talking while swapping the chair.',
    'You hand her the solid chair from the back as if this were planned.',
  ] },
]);

registerPool('weekly.chairBreaks.afterDialogue', [
  { when: { studentId: 5 }, priority: 1, weight: 4, text: [
    'After floor rounds: "Thank you for not making it weird." She pats her belly almost fondly. "I felt this coming."',
  ] },
  { when: { studentId: 10 }, priority: 1, weight: 4, text: [
    'After floor rounds she lingers, pressing a hand to her soft middle. "I should\'ve known," she says quietly. "I\'ve gotten kind of big, haven\'t I." It doesn\'t sound like a problem.',
  ] },
  { when: { studentId: 13 }, priority: 1, weight: 4, text: [
    'After floor rounds she admits she\'s gotten bigger — and doesn\'t sound sorry about it.',
    'After floor rounds she presses a hand to her middle. "Bigger than I planned," she says, smiling. "Not sorry."',
  ] },
  { when: { endStageMax: 4 }, text: [
    'After floor rounds she lingers, pressing a hand to her soft middle. "I should\'ve known," she says quietly. "I\'ve gotten kind of big, haven\'t I." It doesn\'t sound like a problem.',
    'After floor rounds: "Thank you for not making it weird." She pats her belly almost fondly. "I felt this coming."',
  ] },
  { when: { endStageMin: 5, endStageMax: 6 }, text: [
    'After floor rounds she hangs back. "Thanks for not making it weird." She pats her belly fondly. "I\'ve gotten kind of big, haven\'t I." Not like a problem.',
    'Afterwards: "That was smooth of you," she says, smiling. "I should probably stop being surprised when furniture can\'t handle me."',
  ] },
  { when: { endStageMin: 7 }, text: [
    'After floor rounds she presses a hand to her middle: "I actually feel better about it than I expected. I mean. Look at me. The chairs were on borrowed time."',
    'After floor rounds: "I\'ve gained like {subject.semesterGain} pounds this semester. I should have seen that coming." She pats her belly. "Anyway."',
  ] },
  { when: {}, text: [
    'After floor rounds she admits she\'s gotten bigger — and doesn\'t sound sorry about it.',
  ] },
]);

registerPool('weekly.chair_breaks', [
  { when: {}, text: [
    '{weekly.chairBreaks.buildup} {weekly.chairBreaks.break} {weekly.chairBreaks.playerAid} {weekly.chairBreaks.afterDialogue}',
  ] },
]);
