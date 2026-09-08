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

// ── Stage-keyed refusal beats ─────────────────────────────────

registerModuleVariants('talk.refusal.command_finish._f1', [
  { when: { stageMin: 8 }, weight: 3, text: [
    `At {subject.lbs} lbs {subject.name} wants to obey — belly vast, tight, voting no with every shallow breath. "I can't," she whispers. "There's no room left."`,
    `The command lands on {subject.lbs} lbs of fullness. {subject.name} shakes her head, hands spread over her enormous middle. "Physically impossible. I tried."`,
  ]},
  { when: { stageMin: 5, stageMax: 7 }, weight: 2, text: [
    `{subject.name} wavers — want versus capacity. "I can't," she says, pressing both palms to her drum-tight belly. "Not one more bite. Not yet."`,
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    `"Command received," {subject.name} breathes. "Body declined. I'm furious with it." Her hands stay on her distended middle, possessive even in refusal.`,
  ]},
]);

registerModuleVariants('talk.refusal.command_devour._f3', [
  { when: { stageMin: 9 }, weight: 3, text: [
    `Something vast in {subject.name} rises to meet the command — and breaks against {subject.lbs} lbs of fullness. "No room," she gasps. "Not for that. Not tonight."`,
  ]},
  { when: { corruption: [0] }, weight: 2, text: [
    `{subject.name} flinches at the command — shocked by her own fullness, ashamed she can't obey. "I'm sorry," she whispers. "I'm too full."`,
  ]},
]);

// ── Per-student refusal voice ─────────────────────────────────

registerModuleVariants('talk.refusal.command_finish._f1', [
  { when: { studentId: 0 }, weight: 4, text: [`Brittany sets her jaw. "Captain's out of commission. Belly won." She pats her middle, frustrated and proud.`] },
  { when: { studentId: 1 }, weight: 4, text: [`Madeline checks her notes. "Capacity exceeded. Further intake would violate structural limits." She exhales. "Tomorrow."`] },
  { when: { studentId: 2 }, weight: 4, text: [`Kylie lowers her phone. "Can't film this part. I'm too full. Cut." She laughs, miserable and pleased.`] },
  { when: { studentId: 3 }, weight: 4, text: [`Serena grips the chair arms. "Athlete's done. Body says no." She breathes through it. "Rematch tomorrow."`] },
  { when: { studentId: 5 }, weight: 4, text: [`Destiny stares at the plate. "Inventory full. Cannot equip more food." She sighs. "Save quest for later."`] },
  { when: { studentId: 7 }, weight: 4, text: [`Priya closes her planner. "Hard ceiling reached. Reschedule intake." She looks genuinely annoyed at physics.`] },
  { when: { studentId: 8 }, weight: 4, text: [`Maya shakes her head once. "Can't." Her hands press her middle. "Want to. Can't."`] },
  { when: { studentId: 10 }, weight: 4, text: [`Reneé wipes her mouth. "Kitchen's closed. Even I have limits." She pats her belly, fond and defeated.`] },
  { when: { studentId: 16 }, weight: 4, text: [`Sophia trembles. "Contraindicated at current volume," she whispers. "I would if I could."`] },
]);

registerModuleVariants('talk.refusal.command_devour._f4', [
  { when: { studentId: 5 }, weight: 4, text: [`. "Patch notes tomorrow," Destiny mutters. "New stomach capacity DLC."`] },
  { when: { studentId: 15 }, weight: 4, text: [`. Lilith's eyes stay dark. "Soon," she promises. "Let me digest what you've already given me."`] },
  { when: { studentId: 18 }, weight: 4, text: [`. "Queue next experiment," Talia breathes. "Current vessel at max load."`] },
]);
