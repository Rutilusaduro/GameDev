// The Squad — Lead: A1 Mobile | Support: A2 Psych
// Private session closing beats — migrated from SESSION_AFTERMATH (Phase C).
// Regenerate: node scripts/generatePhaseCTail.mjs
import { registerPool } from '../../engine.js';

registerPool('session.aftermath.light._f1', [
  { when: {}, text: ["{subject.name} is full and comfortable and loose-limbed with it. She eats the last few bites slowly, without urgency. \"I'm glad I came,\" she says. Neither of you pretends this was a one-time thing."] },
]);

registerPool('session.aftermath.light', [
  { when: {}, text: ["{session.aftermath.light._f1}"] },
]);
registerPool('session.aftermath.full._f1', [
  { when: {}, text: ["{subject.name} leans back and stays back, both hands resting on her full, round belly. She breathes carefully. \"I can't move,\" she says. She doesn't try."] },
]);

registerPool('session.aftermath.full._f2', [
  { when: {}, text: [". Eventually you cover her with a blanket and let her sleep where she's sitting."] },
]);

registerPool('session.aftermath.full', [
  { when: {}, text: ["{session.aftermath.full._f1} {session.aftermath.full._f2}"] },
]);
registerPool('session.aftermath.stuffed._f1', [
  { when: {}, text: ["{subject.name} has gone very still, the way people do when they're genuinely, spectacularly full. Her belly is a round, warm mass. She presses her hands flat against it."] },
]);

registerPool('session.aftermath.stuffed._f2', [
  { when: {}, text: [". \"I ate everything,\" she says, in quiet wonder. \"I always eat everything.\" She sounds glad."] },
]);

registerPool('session.aftermath.stuffed', [
  { when: {}, text: ["{session.aftermath.stuffed._f1} {session.aftermath.stuffed._f2}"] },
]);
registerPool('session.aftermath.packed._f1', [
  { when: {}, text: ["You don't speak for a while. {subject.name} is enormous with food — her belly rounded and firm and extraordinary. She keeps her hands on it, feeling its weight, its warmth, its absoluteness."] },
]);

registerPool('session.aftermath.packed._f2', [
  { when: {}, text: [". \"This is what I want,\" she says eventually. It's not clear if she means the food or something bigger. You think maybe both."] },
]);

registerPool('session.aftermath.packed', [
  { when: {}, text: ["{session.aftermath.packed._f1} {session.aftermath.packed._f2}"] },
]);

registerPool('session.aftermath', [
  { when: { aftermathBand: "light" }, text: ['{session.aftermath.light}'] },
  { when: { aftermathBand: "full" }, text: ['{session.aftermath.full}'] },
  { when: { aftermathBand: "stuffed" }, text: ['{session.aftermath.stuffed}'] },
  { when: { aftermathBand: "packed" }, text: ['{session.aftermath.packed}'] },
  { when: {}, text: ['{subject.name} settles back, full and warm, pleased with the evening.'] },
]);
