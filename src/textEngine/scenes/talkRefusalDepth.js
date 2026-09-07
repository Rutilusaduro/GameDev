// The Squad — Lead: A2 Psych | Support: A5 Editor
// Wildcard depth for talk.refusal.* pools (Pass 25).
import { registerModuleVariants } from '../engine.js';

function pad(pool, lines) {
  registerModuleVariants(pool, [{ when: {}, text: lines }]);
}

pad('talk.refusal.command_finish._f1', [
  `{subject.name} wavers — the command lands, but her body outvotes it. "I can't," she whispers. Her belly is too full, too tight, too honest.`,
  `"I want to," {subject.name} says, voice breaking. "I literally can't fit another bite." Her hands press her distended middle.`,
  `The order reaches her and stops at capacity. {subject.name} shakes her head, ashamed and overstuffed. "Not tonight."`,
]);
pad('talk.refusal.command_finish._f2', [
  `. She trembles with how close she came to obeying anyway.`,
  `. Her eyes stay on the plates — hungry, defeated, full.`,
  `. She exhales shakily, relieved and disappointed in equal measure.`,
]);
pad('talk.refusal.command_finish', [
  `{talk.refusal.command_finish._f1} {talk.refusal.command_finish._f2}`,
  `{talk.refusal.command_finish._f2}\n\n{talk.refusal.command_finish._f1}`,
  `{talk.refusal.command_finish._f1}\n\n{talk.refusal.command_finish._f2}`,
]);

pad('talk.refusal.command_devour._f3', [
  `Something ancient in {subject.name} rises to meet the command — and falters. Not tonight. Her body can't hold what you're asking.`,
  `The word hits like a wave and breaks on fullness. {subject.name} gasps, hands on her belly, shaking her head.`,
  `She wants to obey. At {subject.lbs} lbs there is simply no room left — belly tight, breath shallow, body voting no.`,
]);
pad('talk.refusal.command_devour._f4', [
  `. She trembles at the brink, hands pressed to her middle, eyes dark with wanting anyway.`,
  `. "Tomorrow," she whispers. "Command me tomorrow."`,
  `. She looks at the food like it hurts to refuse. "I'm so full it almost feels good to say no."`,
]);
pad('talk.refusal.command_devour', [
  `{talk.refusal.command_devour._f3} {talk.refusal.command_devour._f4}`,
  `{talk.refusal.command_devour._f4}\n\n{talk.refusal.command_devour._f3}`,
  `{talk.refusal.command_devour._f3}\n\n{talk.refusal.command_devour._f4}`,
]);
