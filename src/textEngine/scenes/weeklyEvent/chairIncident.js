// ═══════════════════════════════════════════════════════════════
// WEEKLY EVENT — chair incidents keyed by weight stage
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../../engine.js';

// FULL SENTENCE — random lecture chair (RANDOM_EVENTS chair_incident)
registerPool('weekly.chair_incident', [
  { when: { endStageMax: 4 }, text: [
    'During your Tuesday lecture, {subject.name}\'s chair emits a long, mortified creak every time she shifts her weight. She freezes mid-note, cheeks pink, and pretends she did not hear it. The row goes quiet. No one discusses it. Everyone heard it.',
    'Mid-lecture, {subject.name}\'s chair groans under her — a slow protesting sound that makes three students look up from their laptops. She goes very still. You keep teaching as if nothing happened. Something definitely happened.',
  ] },
  { when: { endStageMin: 5, endStageMax: 6 }, text: [
    'During your Tuesday lecture, {subject.name}\'s chair releases a sharp crack and gives way. She lands without dignity, then rises with absolute composure and takes a different seat. She meets no one\'s eyes. Every student in the row quietly shifts their weight.',
    '{subject.name}\'s chair lists sideways with a crack that stops the lecture cold. She grabs the desk, cheeks burning, and accepts the reinforced chair you slide over without comment. The moment is not discussed. It absolutely happened.',
  ] },
  { when: { endStageMin: 7 }, text: [
    'During your Tuesday lecture, {subject.name}\'s chair snaps instantly — no warning creak, just a sharp crack and she is suddenly much lower than she was. The plastic split runs up one leg. A thin line spiders across the floor tile where the leg punched through. The room goes silent. She exhales. "Okay," she says. "That one was on me."',
    '{subject.name} sits, and the chair simply ceases to exist as a chair — legs splaying, seat cracking in half, a sound like a gunshot in a quiet hall. The floor protests with a visible crack under the front leg. She sits on the wreckage for one beat, then stands, dusts herself off, and takes the reinforced chair without a word.',
  ] },
  { when: {}, text: [
    'During your Tuesday lecture, {subject.name}\'s chair fails catastrophically. She lands without dignity. You produce a sturdier chair. The moment is not discussed.',
  ] },
]);

// FULL SENTENCE — stage-up narrative chair (NARRATIVE_EVENTS chair_breaks)
registerPool('weekly.chair_breaks', [
  { when: { endStageMax: 4 }, text: [
    '{subject.name}\'s chair groans all through seminar — a long complaining creak whenever she leans back. After class she lingers, pressing a hand to her soft middle. "I should\'ve known," she says quietly. "I\'ve gotten kind of big, haven\'t I." It doesn\'t sound like a problem.',
    'The chair under {subject.name} creaks louder with every minute until finally it tilts just enough to make her grab the desk. She laughs once, surprised. You slide a sturdier chair over. After class: "Thank you for not making it weird." She pats her belly almost fondly. "I felt this coming."',
  ] },
  { when: { endStageMin: 5, endStageMax: 6 }, text: [
    'A classroom chair gives way under {subject.name} with a loud crack. She goes bright red. You slide a sturdier chair over without a word. After class she hangs back. "Thank you for… not making it weird." She glances down at herself, pats her belly almost fondly. "I\'ve gotten kind of big, haven\'t I." It doesn\'t come out like a problem.',
    'The chair under {subject.name} lets out a sharp crack and lists sideways. She grabs the desk with both hands. For a moment the room is very quiet. You produce a reinforced chair from the back as if this were planned. Afterwards: "That was smooth of you," she says, smiling. "I should probably stop being surprised when furniture can\'t handle me."',
  ] },
  { when: { endStageMin: 7 }, text: [
    '{subject.name}\'s chair snaps instantly — no groan, no warning — and she drops hard enough to spider a crack in the floor tile. She lets out a short laugh before she can stop herself. You wave off the moment and keep talking. Afterwards she presses a hand to her middle: "I actually feel better about it than I expected. I mean. Look at me. The chairs were on borrowed time."',
    'It happens during a quiet part of lecture — a sharp snap, then {subject.name} is suddenly much lower, the chair in pieces, a thin crack running across the floor where the leg punched through. She sighs the sigh of someone who saw this coming. You hand her the solid chair from behind your desk. After class: "I\'ve gained like {subject.semesterGain} pounds this semester. I should have seen that coming." She pats her belly. "Anyway."',
  ] },
  { when: {}, text: [
    'A classroom chair gives way under {subject.name}. You slide a sturdier chair over. After class she admits she\'s gotten bigger — and doesn\'t sound sorry about it.',
  ] },
]);
