// The Squad — Lead: A2 Psych | Support: A4 Architect
// Talk command refusal lines — migrated from talkSystem.js (Phase C.2).
// Regenerate: node scripts/generateTalkRefusals.mjs
import { registerPool } from '../engine.js';

registerPool('talk.refusal.command_finish._f1', [
  { when: {}, text: ["{subject.name} wavers — the command lands, but her body outvotes it. \"I can't,\" she whispers, and means the physics, not the will. Her belly is too full, too tight, too honest about its limits."] },
]);

registerPool('talk.refusal.command_finish._f2', [
  { when: {}, text: [". She trembles with how close she came to obeying anyway."] },
]);

registerPool('talk.refusal.command_finish', [
  { when: {}, text: ["{talk.refusal.command_finish._f1} {talk.refusal.command_finish._f2}"] },
]);
registerPool('talk.refusal.command_devour._f3', [
  { when: {}, text: ["Something ancient in {subject.name} rises to meet the command — and falters at the brink. Not tonight. Her body is too full to hold what you're asking."] },
]);

registerPool('talk.refusal.command_devour._f4', [
  { when: {}, text: [". She trembles with how close it was, hands pressed to her middle, eyes dark with wanting anyway."] },
]);

registerPool('talk.refusal.command_devour', [
  { when: {}, text: ["{talk.refusal.command_devour._f3} {talk.refusal.command_devour._f4}"] },
]);

