// The Squad — Lead: A2 Psych | Support: A4 Architect
// Command: clean every plate — success prose (Phase C).
// Regenerate: node scripts/generatePhaseCTail.mjs
import { registerPool } from '../engine.js';

registerPool('talk.command_finish.t0v0._f1', [
  { when: {}, text: ["The command takes her like gravity. {subject.name}'s eyes widen — surprised at her own obedience — and then her hands move without asking permission."] },
]);

registerPool('talk.command_finish.t0v0._f2', [
  { when: {}, text: ["She eats with wide, startled eyes, each bite mechanical at first, then eager."] },
]);

registerPool('talk.command_finish.t0v0._f3', [
  { when: {}, text: [". At {subject.lbs} lbs her belly swells visibly as she works — soft flesh pushing at her waistband, breathing turning shallow, thighs spreading wider in the chair. The plates empty one by one."] },
]);

registerPool('talk.command_finish.t0v0._f4', [
  { when: {}, text: [". She doesn't stop until they're gone."] },
]);

registerPool('talk.command_finish.t0v0._f5', [
  { when: {}, text: ["When it's over she sits very still, hands on her distended middle, looking at you like she's never seen you before. \"I couldn't—\" she breathes. \"I couldn't stop.\""] },
]);

registerPool('talk.command_finish.t0v0', [
  { when: {}, text: ["{talk.command_finish.t0v0._f1}\n\n{talk.command_finish.t0v0._f2} {talk.command_finish.t0v0._f3}\n\n{talk.command_finish.t0v0._f4}\n\n{talk.command_finish.t0v0._f5}"] },
]);
registerPool('talk.command_finish.t0v1._f1', [
  { when: {}, text: ["The word lands and {subject.name} breaks. Not violently — completely. Her manners dissolve; her hesitation dissolves; only appetite remains."] },
]);

registerPool('talk.command_finish.t0v1._f2', [
  { when: {}, text: ["She cleans every plate with a focus that frightens her even as she obeys it — fork scraping, throat working, belly swelling round and tight with each addition."] },
]);

registerPool('talk.command_finish.t0v1._f3', [
  { when: {}, text: [". At {subject.lbs} lbs the growth is visible in real time: soft flesh pressing outward, seams complaining, her body accepting more because you told it to."] },
]);

registerPool('talk.command_finish.t0v1._f4', [
  { when: {}, text: ["Afterward she gasps, overwhelmed, transformed by the knowledge of what she can do when you command it."] },
]);

registerPool('talk.command_finish.t0v1', [
  { when: {}, text: ["{talk.command_finish.t0v1._f1}\n\n{talk.command_finish.t0v1._f2} {talk.command_finish.t0v1._f3}\n\n{talk.command_finish.t0v1._f4}"] },
]);
registerPool('talk.command_finish.t0', [
  { when: {}, text: ["{talk.command_finish.t0v0}","{talk.command_finish.t0v1}"] },
]);
registerPool('talk.command_finish.t1v0._f1', [
  { when: {}, text: ["{subject.name} exhales, settles, and obeys — methodical, unhurried, thorough. At {subject.lbs} lbs she has learned the rhythm of this: chew, swallow, breathe, repeat."] },
]);

registerPool('talk.command_finish.t1v0._f2', [
  { when: {}, text: [". Her belly grows heavier with each plate; her thighs spread; her eyes stay on yours."] },
]);

registerPool('talk.command_finish.t1v0._f3', [
  { when: {}, text: ["When the last plate is clean she sits back, distended and warm, and waits. Not proud. Not ashamed. Ready for the next instruction."] },
]);

registerPool('talk.command_finish.t1v0', [
  { when: {}, text: ["{talk.command_finish.t1v0._f1} {talk.command_finish.t1v0._f2}\n\n{talk.command_finish.t1v0._f3}"] },
]);
registerPool('talk.command_finish.t1v1._f1', [
  { when: {}, text: ["She doesn't negotiate. She doesn't perform reluctance. {subject.name} eats because you said eat — every plate, every crumb, every calorie going down with steady, devoted hunger."] },
]);

registerPool('talk.command_finish.t1v1._f2', [
  { when: {}, text: ["At {subject.lbs} lbs her body is an instrument of obedience: belly swelling, flesh jiggling with each movement, breathing labored and satisfied."] },
]);

registerPool('talk.command_finish.t1v1._f3', [
  { when: {}, text: [". When she finishes she folds her hands on her full middle and looks to you for what comes next."] },
]);

registerPool('talk.command_finish.t1v1', [
  { when: {}, text: ["{talk.command_finish.t1v1._f1}\n\n{talk.command_finish.t1v1._f2} {talk.command_finish.t1v1._f3}"] },
]);
registerPool('talk.command_finish.t1', [
  { when: {}, text: ["{talk.command_finish.t1v0}","{talk.command_finish.t1v1}"] },
]);
registerPool('talk.command_finish.t2v0._f1', [
  { when: {}, text: ["\"Yes, Professor.\" No hesitation. No negotiation. The words arrive with relief — like she's been waiting for permission to want this much."] },
]);

registerPool('talk.command_finish.t2v0._f2', [
  { when: {}, text: ["{subject.name} cleans every plate and then sits, hands folded on her {subject.lbs}-lb belly, hopeful there's more. Her body is vast and warm and completely yours to command. \"Again?\" she whispers."] },
]);

registerPool('talk.command_finish.t2v0._f3', [
  { when: {}, text: [". \"Whenever you want. However much you want.\""] },
]);

registerPool('talk.command_finish.t2v0', [
  { when: {}, text: ["{talk.command_finish.t2v0._f1}\n\n{talk.command_finish.t2v0._f2} {talk.command_finish.t2v0._f3}"] },
]);
registerPool('talk.command_finish.t2v1._f1', [
  { when: {}, text: ["The command is a gift and {subject.name} receives it like one."] },
]);

registerPool('talk.command_finish.t2v1._f2', [
  { when: {}, text: [". She eats with ritual slowness — savoring, swallowing, swelling — until the table is bare and her belly is a tight, heavy monument between her spread thighs."] },
]);

registerPool('talk.command_finish.t2v1._f3', [
  { when: {}, text: ["At {subject.lbs} lbs she is beyond shame. Beyond resistance. She licks her fingers one by one, eyes never leaving yours. \"More,\" she murmurs. \"Always more.\""] },
]);

registerPool('talk.command_finish.t2v1', [
  { when: {}, text: ["{talk.command_finish.t2v1._f1} {talk.command_finish.t2v1._f2}\n\n{talk.command_finish.t2v1._f3}"] },
]);
registerPool('talk.command_finish.t2', [
  { when: {}, text: ["{talk.command_finish.t2v0}","{talk.command_finish.t2v1}"] },
]);

registerPool('talk.command_finish', [
  { when: { corruption: [0] }, priority: 1, text: ['{talk.command_finish.t0}'] },
  { when: { corruption: [1] }, priority: 1, text: ['{talk.command_finish.t1}'] },
  { when: { corruption: [2] }, priority: 1, text: ['{talk.command_finish.t2}'] },
  { when: {}, text: ['{talk.command_finish.t0}'] },
]);
