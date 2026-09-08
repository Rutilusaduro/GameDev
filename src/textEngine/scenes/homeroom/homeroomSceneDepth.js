// The Squad — Lead: A2 Psych | Support: A5 Editor
// Alternate depth variants for homeroom conference/activity pools.
// Loads after homeroom/index.js registers base prose from evolvedForms.
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('homeroom.conference.Kayla.intro', [
  { when: {}, text: [
    `Kayla slides into the chair like she's done it a hundred times. "Tuesday?" she asks, hopeful. "Or grades. Either works."`,
    `Kayla's eyes find the desk corner before yours. "Conference," she says. "Snack-adjacent, preferably."`,
  ]},
]);

registerModuleVariants('homeroom.conference.Bri.intro', [
  { when: {}, text: [
    `Bri sits with military efficiency, gaze already on the drawer. "Status update," she says. "Then provisions."`,
  ]},
]);

registerModuleVariants('homeroom.conference.Sofia.intro', [
  { when: {}, text: [
    `Sofia fills the chair and the air around it. "I have opinions about cardamom," she announces, serene.`,
  ]},
]);

registerModuleVariants('homeroom.conference.Mrs_Calloway.intro', [
  { when: {}, text: [
    `Mrs. Calloway's jacket stays buttoned. Her eyes catalog the room. "Kayla won't stop talking about Tuesdays," she says.`,
  ]},
]);

registerModuleVariants('homeroom.conference.Mrs_Reyes.intro', [
  { when: {}, text: [
    `Mrs. Reyes sets coffee on the desk — habit now. "I need to be honest," she says. "I keep arriving early."`,
  ]},
]);

registerModuleVariants('homeroom.conference.Mrs_Monroe.intro', [
  { when: {}, text: [
    `Mrs. Monroe doesn't knock. "Menu," she says, smiling like abundance is policy. "Start there."`,
  ]},
]);

registerModuleVariants('homeroom.conference.Kayla.tuesday', [
  { when: {}, text: [
    `Kayla's face clears instantly. "Cinnamon rolls," she says. "Second recipe upgrade. Non-negotiable." Daisy writes it down. The container appears. Kayla has two pieces before she stands.`,
  ]},
]);

registerModuleVariants('homeroom.conference.Mrs_Monroe.taste_now', [
  { when: {}, text: [
    `Daisy skips the agenda. The good container opens. Mrs. Monroe eats with sincere delight. "This is why I come," she says, already asking about next Tuesday.`,
  ]},
]);

registerModuleVariants('homeroom.conference.Kayla.academic', [
  { when: {}, text: [
    `Kayla blinks at real praise — then eyes the desk container. "Can I—" Daisy slides it over. Progress and pastry, same meeting.`,
  ]},
]);

registerModuleVariants('homeroom.conference.Bri.brought_something', [
  { when: {}, text: [
    `Bottom drawer opens. Container inside — always is. Bri eats efficiently while Daisy lists specifics. Both tasks complete.`,
  ]},
]);

registerModuleVariants('homeroom.conference.Sofia.portfolio', [
  { when: {}, text: [
    `Portfolio review by name and piece — Sofia listens serious. "Can I have something before I go?" Container already out.`,
  ]},
]);

registerModuleVariants('homeroom.conference.Sofia.next_tuesday', [
  { when: {}, text: [
    `Cardamom honey cake, peach upside-down backup — ranked alternatives. Notebook: *Sofia's requests. Non-negotiable.*`,
  ]},
]);

registerModuleVariants('homeroom.conference.Mrs_Calloway.curriculum_frame', [
  { when: {}, text: [
    `Enrichment rationale, point by point. Arms uncross by three. "She's been happier," she admits. Exhale in hallway.`,
  ]},
]);

registerModuleVariants('homeroom.conference.Mrs_Calloway.offer_tasting', [
  { when: {}, text: [
    `Wrapped slice on desk. "For the drive." Not a refusal. Parking lot evidence through window. Note made.`,
  ]},
]);

registerModuleVariants('homeroom.conference.Mrs_Reyes.honest_talk', [
  { when: {}, text: [
    `Stress, comfort, classroom smell — honesty without flinch. "I'm glad you're here." Forty minutes. Coffee cold.`,
  ]},
]);

registerModuleVariants('homeroom.conference.Mrs_Reyes.recipe_preview', [
  { when: {}, text: [
    `Recipe book open — cardamom, peach, too much cream. Container and circled date. Laugh surprised, genuine.`,
  ]},
]);

registerModuleVariants('homeroom.conference.Mrs_Monroe.full_preview', [
  { when: {}, text: [
    `Full menu laid out — this week, next week, the special held back. "I'll talk to the other moms," she says, delighted.`,
  ]},
]);

registerModuleVariants('homeroom.activity.health_unit.p0.official', [
  { when: { stageMin: 6 }, weight: 3, text: [
    `Numbers read aloud into school file — accurate, notable, nurse's inbox interesting tomorrow.`,
  ]},
]);

registerModuleVariants('homeroom.activity.health_unit.p0.personal', [
  { when: {}, text: [
    `Apron-pocket notebook only. Daisy studies digits, smiles, closes cover. These measurements are hers.`,
  ]},
]);

registerModuleVariants('homeroom.activity.health_unit.p1.weigh_moms', [
  { when: {}, text: [
    `Monroe first, unafraid. Reyes knew. Calloway: "don't tell Kayla" — then laughs. All three recorded.`,
  ]},
]);

registerModuleVariants('homeroom.activity.parent_meeting.p0.recipes', [
  { when: {}, text: [
    `Recipe book opens — Monroe desires, Reyes leans, Calloway names cardamom. Ninety minutes. Agenda forgotten.`,
  ]},
]);

