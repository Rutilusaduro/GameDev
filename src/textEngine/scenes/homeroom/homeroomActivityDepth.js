// The Squad — Lead: A2 Psych | Support: A5 Editor
// Alternate depth variants for homeroom group activity pools.
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('homeroom.activity.parent_meeting.p0', [
  { when: {}, text: [
    `Mrs. Monroe claimed the window chair and snack bowl. Mrs. Reyes is mid-sentence. Mrs. Calloway catalogs from the back. Daisy stands ready — agenda optional.`,
    `Three mothers, one Daisy, zero empty hands. The room smells like whatever she baked this morning.`,
  ]},
]);

registerModuleVariants('homeroom.activity.parent_meeting.p0.curriculum', [
  { when: {}, text: [
    `Daisy runs the wellness agenda — warm, thorough. Mrs. Calloway uncrosses her arms by item two. Everyone leaves with containers. Framing technically wins.`,
  ]},
]);

registerModuleVariants('homeroom.activity.parent_meeting.p0.recipes', [
  { when: {}, text: [
    `The recipe book opens. Mrs. Monroe makes a sound of desire. Mrs. Calloway asks about cardamom, surprised she knew. Ninety minutes. No agenda.`,
  ]},
]);

registerModuleVariants('homeroom.activity.parent_meeting.p0.refreshments_first', [
  { when: {}, text: [
    `"Before we get into it—" The big container lands. Mrs. Monroe has it open mid-sentence. Mrs. Calloway eats three pieces before item one.`,
  ]},
]);

registerModuleVariants('homeroom.activity.health_unit.p0', [
  { when: {}, text: [
    `Scale at the front. Tape on the desk. Health unit day — the residents have been waiting. Sofia stands near the scale, easy and unhurried.`,
    `Daisy arranges the scale with ceremony. Someone whispers about last semester's chart.`,
  ]},
]);

registerModuleVariants('homeroom.activity.health_unit.p0.official', [
  { when: {}, text: [
    `Height, then weight. Daisy reads numbers into the hall wellness file — accurate, notable, destined for the health office inbox.`,
  ]},
]);

registerModuleVariants('homeroom.activity.health_unit.p0.personal', [
  { when: {}, text: [
    `Numbers go into the apron-pocket notebook, not the wellness file. Daisy studies them, then smiles — these measurements are hers.`,
  ]},
]);

registerModuleVariants('homeroom.activity.health_unit.p1', [
  { when: {}, text: [
    `Pickup time. Mrs. Monroe watched the whole unit from the back row. "I haven't been weighed since my physical," she says, eyes on the scale.`,
  ]},
]);

registerModuleVariants('homeroom.activity.health_unit.p1.weigh_moms', [
  { when: {}, text: [
    `Mrs. Monroe steps on first — unafraid. Mrs. Reyes follows, already knowing. Mrs. Calloway: "Don't tell Kayla," then laughs. All three recorded.`,
  ]},
]);

registerModuleVariants('homeroom.activity.health_unit.p1.decline', [
  { when: {}, text: [
    `"This one's just for the hall," Daisy says. Mrs. Monroe nods, unbothered — she does not need a number to know.`,
  ]},
]);
