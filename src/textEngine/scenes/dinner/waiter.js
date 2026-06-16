// The Squad — Lead: A1 Mobile | Support: A4 Architect
// Dinner venue waiter lines — migrated from sessions.js WAITER_DESC (Phase C).
// Regenerate: node scripts/generatePhaseCTail.mjs
import { registerPool } from '../../engine.js';

registerPool('dinner.waiter.bistro._f1', [
  { when: {}, text: ["A young woman in a bistro apron comes over. She's softly built — the kind of figure that comes from working around good food every day. She smiles warmly at {subject.name}. \"Ready for more?\""] },
]);

registerPool('dinner.waiter.bistro', [
  { when: {}, text: ["{dinner.waiter.bistro._f1}"] },
]);
registerPool('dinner.waiter.italian._f1', [
  { when: {}, text: ["A warm, round woman bustles over — full-figured in the way of someone who grew up cooking. She refills the bread basket without being asked and beams at {subject.name}. \"More? Of course more.\""] },
]);

registerPool('dinner.waiter.italian', [
  { when: {}, text: ["{dinner.waiter.italian._f1}"] },
]);
registerPool('dinner.waiter.steakhouse._f1', [
  { when: {}, text: ["A broad, solid woman in a leather apron approaches. She's substantial, clearly someone who eats well on shift and often. She surveys the cleared plates with professional approval."] },
]);

registerPool('dinner.waiter.steakhouse._f2', [
  { when: {}, text: [". \"Ready for the next round?\""] },
]);

registerPool('dinner.waiter.steakhouse', [
  { when: {}, text: ["{dinner.waiter.steakhouse._f1} {dinner.waiter.steakhouse._f2}"] },
]);
registerPool('dinner.waiter.french._f1', [
  { when: {}, text: ["The sommelier — a heavyset woman in a crisp blazer — drifts over. Her figure suggests someone who takes research very seriously. She refills the wine without comment. \"Another course?\""] },
]);

registerPool('dinner.waiter.french', [
  { when: {}, text: ["{dinner.waiter.french._f1}"] },
]);
registerPool('dinner.waiter.japanese._f1', [
  { when: {}, text: ["A quietly round woman in formal dark attire appears. She replaces the chopsticks, replenishes the water, and waits. She says nothing. {subject.name} reaches for the fresh menu."] },
]);

registerPool('dinner.waiter.japanese', [
  { when: {}, text: ["{dinner.waiter.japanese._f1}"] },
]);
registerPool('dinner.waiter.private_club._f1', [
  { when: {}, text: ["A large woman in club livery appears, moving with the unhurried ease of someone extremely comfortable in their body. She sets down a new menu card without being asked."] },
]);

registerPool('dinner.waiter.private_club._f2', [
  { when: {}, text: [". \"The kitchen is ready whenever you are.\""] },
]);

registerPool('dinner.waiter.private_club', [
  { when: {}, text: ["{dinner.waiter.private_club._f1} {dinner.waiter.private_club._f2}"] },
]);
registerPool('dinner.waiter.chefs_table._f1', [
  { when: {}, text: ["The floor manager — an immensely soft woman in tailored black — materializes beside the table. The kind of person who samples everything, constantly."] },
]);

registerPool('dinner.waiter.chefs_table._f2', [
  { when: {}, text: [". \"Shall I tell the kitchen to continue?\" There's no other answer."] },
]);

registerPool('dinner.waiter.chefs_table', [
  { when: {}, text: ["{dinner.waiter.chefs_table._f1} {dinner.waiter.chefs_table._f2}"] },
]);
registerPool('dinner.waiter.home_dinner._f1', [
  { when: {}, text: ["You head back to the kitchen to bring out the next course."] },
]);

registerPool('dinner.waiter.home_dinner', [
  { when: {}, text: ["{dinner.waiter.home_dinner._f1}"] },
]);
registerPool('dinner.waiter.brunch_hall._f1', [
  { when: {}, text: ["A cheerfully plump woman in a floral apron refills both coffees and sets down a fresh card. She looks at {subject.name} approvingly. \"There's plenty more where that came from.\""] },
]);

registerPool('dinner.waiter.brunch_hall', [
  { when: {}, text: ["{dinner.waiter.brunch_hall._f1}"] },
]);
registerPool('dinner.waiter.atelier._f1', [
  { when: {}, text: ["The maître d' — a truly enormous woman in impeccable black, who navigates the dining room with the serene authority of someone who has never once heard 'no' — arrives at your table."] },
]);

registerPool('dinner.waiter.atelier._f2', [
  { when: {}, text: [". She does not ask what you want. She tells the kitchen. {subject.name} sits up slightly straighter."] },
]);

registerPool('dinner.waiter.atelier', [
  { when: {}, text: ["{dinner.waiter.atelier._f1} {dinner.waiter.atelier._f2}"] },
]);

registerPool('dinner.waiter', [
  { when: { venueId: "bistro" }, text: ['{dinner.waiter.bistro}'] },
  { when: { venueId: "italian" }, text: ['{dinner.waiter.italian}'] },
  { when: { venueId: "steakhouse" }, text: ['{dinner.waiter.steakhouse}'] },
  { when: { venueId: "french" }, text: ['{dinner.waiter.french}'] },
  { when: { venueId: "japanese" }, text: ['{dinner.waiter.japanese}'] },
  { when: { venueId: "private_club" }, text: ['{dinner.waiter.private_club}'] },
  { when: { venueId: "chefs_table" }, text: ['{dinner.waiter.chefs_table}'] },
  { when: { venueId: "home_dinner" }, text: ['{dinner.waiter.home_dinner}'] },
  { when: { venueId: "brunch_hall" }, text: ['{dinner.waiter.brunch_hall}'] },
  { when: { venueId: "atelier" }, text: ['{dinner.waiter.atelier}'] },
  { when: {}, text: ['The server arrives. "Shall I bring more?" she asks.'] },
]);
