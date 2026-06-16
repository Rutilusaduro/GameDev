// ═══════════════════════════════════════════════════════════════
// WEEKLY EVENT — chair incidents keyed by weight stage
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../../engine.js';

// FULL SENTENCE — random lecture chair (RANDOM_EVENTS chair_incident)
registerPool('weekly.chairIncident.lecture', [
  { when: {}, text: [
    'During your Tuesday lecture,',
    'Mid-lecture,',
    'Halfway through seminar,',
  ] },
]);

registerPool('weekly.chairIncident.creak', [
  { when: { endStageMax: 4 }, text: [
    '{subject.name}\'s chair emits a long, mortified creak every time she shifts her weight.',
    '{subject.name}\'s chair groans under her — a slow protesting sound that makes three students look up.',
    'The chair under {subject.name} complains with every adjustment.',
  ] },
  { when: {}, text: [
    'The chair under {subject.name} protests audibly.',
    'Furniture under {subject.name} makes its opinion known.',
  ] },
]);

registerPool('weekly.chairIncident.snap', [
  { when: { endStageMin: 5, endStageMax: 6 }, text: [
    '{subject.name}\'s chair releases a sharp crack and gives way. She lands without dignity, then rises with composure and takes a different seat.',
    '{subject.name}\'s chair lists sideways with a crack that stops the lecture cold.',
    'A leg surrenders. {subject.name} catches the desk and accepts the reinforced chair you slide over.',
  ] },
  { when: { endStageMin: 7 }, text: [
    '{subject.name}\'s chair snaps instantly — no warning creak, just a sharp crack and she is suddenly much lower.',
    'The plastic splits up one leg. A thin line spiders across the floor tile where it punched through.',
    '{subject.name} sits, and the chair ceases to exist as a chair — legs splaying, seat cracking in half.',
  ] },
  { when: {}, text: [
    '{subject.name}\'s chair fails catastrophically.',
    'The chair gives way under {subject.name} without warning.',
  ] },
]);

registerPool('weekly.chairIncident.reaction', [
  { when: { endStageMax: 4 }, text: [
    'She freezes mid-note, cheeks pink, and pretends she did not hear it. The row goes quiet.',
    'She goes very still. You keep teaching as if nothing happened. Something definitely happened.',
    'No one discusses it. Everyone heard it.',
  ] },
  { when: { endStageMin: 5, endStageMax: 6 }, text: [
    'She meets no one\'s eyes. Every student in the row quietly shifts their weight.',
    'The moment is not discussed. It absolutely happened.',
    'The room holds its breath until you move on.',
  ] },
  { when: { endStageMin: 7 }, text: [
    'The room goes silent. She exhales. "Okay," she says. "That one was on me."',
    'She sits on the wreckage for one beat, then stands and takes the reinforced chair without a word.',
    'You produce a sturdier chair. The lecture continues.',
  ] },
  { when: {}, text: [
    'You produce a sturdier chair. The moment is not discussed.',
    'She recovers with more dignity than the furniture deserved.',
  ] },
]);

registerPool('weekly.chair_incident', [
  { when: { endStageMax: 4 }, text: [
    '{weekly.chairIncident.lecture} {weekly.chairIncident.creak} {weekly.chairIncident.reaction}',
  ] },
  { when: { endStageMin: 5 }, text: [
    '{weekly.chairIncident.lecture} {weekly.chairIncident.snap} {weekly.chairIncident.reaction}',
  ] },
  { when: {}, text: [
    '{weekly.chairIncident.lecture} {weekly.chairIncident.snap} {weekly.chairIncident.reaction}',
  ] },
]);

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
    'A classroom chair gives way under {subject.name} with a loud crack.',
    'The chair under {subject.name} lets out a sharp crack and lists sideways.',
  ] },
  { when: { endStageMin: 7 }, text: [
    '{subject.name}\'s chair snaps instantly — no groan, no warning.',
    'It happens during a quiet part of lecture — a sharp snap, then {subject.name} is suddenly much lower.',
  ] },
  { when: {}, text: [
    'A classroom chair gives way under {subject.name}.',
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
    'After class: "Thank you for not making it weird." She pats her belly almost fondly. "I felt this coming."',
  ] },
  { when: { studentId: 10 }, priority: 1, weight: 4, text: [
    'After class she lingers, pressing a hand to her soft middle. "I should\'ve known," she says quietly. "I\'ve gotten kind of big, haven\'t I." It doesn\'t sound like a problem.',
  ] },
  { when: { studentId: 13 }, priority: 1, weight: 4, text: [
    'After class she admits she\'s gotten bigger — and doesn\'t sound sorry about it.',
    'After class she presses a hand to her middle. "Bigger than I planned," she says, smiling. "Not sorry."',
  ] },
  { when: { endStageMax: 4 }, text: [
    'After class she lingers, pressing a hand to her soft middle. "I should\'ve known," she says quietly. "I\'ve gotten kind of big, haven\'t I." It doesn\'t sound like a problem.',
    'After class: "Thank you for not making it weird." She pats her belly almost fondly. "I felt this coming."',
  ] },
  { when: { endStageMin: 5, endStageMax: 6 }, text: [
    'After class she hangs back. "Thank you for… not making it weird." She glances down at herself, pats her belly almost fondly. "I\'ve gotten kind of big, haven\'t I." It doesn\'t come out like a problem.',
    'Afterwards: "That was smooth of you," she says, smiling. "I should probably stop being surprised when furniture can\'t handle me."',
  ] },
  { when: { endStageMin: 7 }, text: [
    'After class she presses a hand to her middle: "I actually feel better about it than I expected. I mean. Look at me. The chairs were on borrowed time."',
    'After class: "I\'ve gained like {subject.semesterGain} pounds this semester. I should have seen that coming." She pats her belly. "Anyway."',
  ] },
  { when: {}, text: [
    'After class she admits she\'s gotten bigger — and doesn\'t sound sorry about it.',
  ] },
]);

registerPool('weekly.chair_breaks', [
  { when: {}, text: [
    '{weekly.chairBreaks.buildup} {weekly.chairBreaks.break} {weekly.chairBreaks.playerAid} {weekly.chairBreaks.afterDialogue}',
  ] },
]);
