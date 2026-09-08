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
    `Bri's posture is parade-ground straight. "Brief me," she says. "Then we discuss Tuesday logistics."`,
  ]},
]);

registerModuleVariants('homeroom.conference.Sofia.intro', [
  { when: {}, text: [
    `Sofia fills the chair and the air around it. "I have opinions about cardamom," she announces, serene.`,
    `Sofia arrives with a notebook and expectations. "Flavor first," she says. "Grades can wait."`,
  ]},
]);

registerModuleVariants('homeroom.conference.Mrs_Calloway.intro', [
  { when: {}, text: [
    `Mrs. Calloway's jacket stays buttoned. Her eyes catalog the room. "Kayla won't stop talking about Tuesdays," she says.`,
    `Mrs. Calloway sits like a verdict waiting. "I have questions," she says. "Fair ones."`,
  ]},
]);

registerModuleVariants('homeroom.conference.Mrs_Reyes.intro', [
  { when: {}, text: [
    `Mrs. Reyes sets coffee on the desk — habit now. "I need to be honest," she says. "I keep arriving early."`,
    `Mrs. Reyes exhales before she speaks. "Stress," she admits. "And your classroom smells like bread."`,
  ]},
]);

registerModuleVariants('homeroom.conference.Mrs_Monroe.intro', [
  { when: {}, text: [
    `Mrs. Monroe doesn't knock. "Menu," she says, smiling like abundance is policy. "Start there."`,
    `Mrs. Monroe spreads warmth before paperwork. "What are we feeding her next?" she asks, delighted.`,
  ]},
]);

registerModuleVariants('homeroom.conference.Kayla.tuesday', [
  { when: {}, text: [
    `Kayla's face clears instantly. "Cinnamon rolls," she says. "Second recipe upgrade. Non-negotiable." Daisy writes it down. The container appears. Kayla has two pieces before she stands.`,
    `"Tuesday," Kayla repeats like a prayer. Cinnamon rolls, upgraded recipe, container already moving. Progress tastes like frosting.`,
  ]},
]);

registerModuleVariants('homeroom.conference.Mrs_Monroe.taste_now', [
  { when: {}, text: [
    `Daisy skips the agenda. The good container opens. Mrs. Monroe eats with sincere delight. "This is why I come," she says, already asking about next Tuesday.`,
    `No preamble — just the good container. Mrs. Monroe eats like policy and pleasure finally agree.`,
  ]},
]);

registerModuleVariants('homeroom.conference.Kayla.academic', [
  { when: {}, text: [
    `Kayla blinks at real praise — then eyes the desk container. "Can I—" Daisy slides it over. Progress and pastry, same meeting.`,
    `Grades up, appetite up — Kayla accepts both. "Tuesday still counts, right?" Container answers before Daisy does.`,
  ]},
]);

registerModuleVariants('homeroom.conference.Bri.brought_something', [
  { when: {}, text: [
    `Bottom drawer opens. Container inside — always is. Bri eats efficiently while Daisy lists specifics. Both tasks complete.`,
    `Bri produces provisions like a supply officer. Daisy talks grades; Bri eats. Mutual respect, efficient calories.`,
  ]},
]);

registerModuleVariants('homeroom.conference.Sofia.portfolio', [
  { when: {}, text: [
    `Portfolio review by name and piece — Sofia listens serious. "Can I have something before I go?" Container already out.`,
    `Sofia critiques with precision, then softens. "Also I would like a taste." Daisy anticipated this.`,
  ]},
]);

registerModuleVariants('homeroom.conference.Sofia.next_tuesday', [
  { when: {}, text: [
    `Cardamom honey cake, peach upside-down backup — ranked alternatives. Notebook: *Sofia's requests. Non-negotiable.*`,
    `Sofia lists cakes like legislation. Daisy writes *non-negotiable* twice. Both women smile.`,
  ]},
]);

registerModuleVariants('homeroom.conference.Mrs_Calloway.curriculum_frame', [
  { when: {}, text: [
    `Enrichment rationale, point by point. Arms uncross by three. "She's been happier," she admits. Exhale in hallway.`,
    `Data, patience, examples — Mrs. Calloway listens longer than she planned. "Fine," she says. Not quite a smile. Close.`,
  ]},
]);

registerModuleVariants('homeroom.conference.Mrs_Calloway.offer_tasting', [
  { when: {}, text: [
    `Wrapped slice on desk. "For the drive." Not a refusal. Parking lot evidence through window. Note made.`,
    `"Take this," Daisy says. Mrs. Calloway hesitates, then doesn't. The car smells like victory later.`,
  ]},
]);

registerModuleVariants('homeroom.conference.Mrs_Reyes.honest_talk', [
  { when: {}, text: [
    `Stress, comfort, classroom smell — honesty without flinch. "I'm glad you're here." Forty minutes. Coffee cold.`,
    `Mrs. Reyes says the hard thing first. Daisy meets it. By the end, both women look lighter.`,
  ]},
]);

registerModuleVariants('homeroom.conference.Mrs_Reyes.recipe_preview', [
  { when: {}, text: [
    `Recipe book open — cardamom, peach, too much cream. Container and circled date. Laugh surprised, genuine.`,
    `Pages turn; possibilities stack. "I'll bring friends," Mrs. Reyes says, already planning.`,
  ]},
]);

registerModuleVariants('homeroom.conference.Mrs_Monroe.full_preview', [
  { when: {}, text: [
    `Full menu laid out — this week, next week, the special held back. "I'll talk to the other moms," she says, delighted.`,
    `Mrs. Monroe receives the preview like a coronation. "More," she says. Daisy expected this.`,
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

registerModuleVariants('homeroom.conference.Bri.brief', [
  { when: {}, text: [
    `Brief and warm — Bri accepts no snack without complaint. Specific praise lands. Tuesday math already running.`,
    `"Not today" accepted. Bri still leaves pleased. Provisions deferred, not forgotten.`,
    `Efficient conference. Warm close. Drawer unopened but noted for next time.`,
  ]},
]);

registerModuleVariants('homeroom.activity.health_unit.p1.decline', [
  { when: {}, text: [
    `"Class only," Daisy says. Mrs. Monroe nods — comfortable without the number.`,
    `Scale stays student-only. Self-knowledge sufficient. Monroe unbothered.`,
    `Professional boundary held. Monroe smiles anyway. She does not need proof.`,
  ]},
]);

registerModuleVariants('homeroom.activity.parent_meeting.p0.recipes', [
  { when: {}, text: [
    `Recipe book opens — Monroe desires, Reyes leans, Calloway names cardamom. Ninety minutes. Agenda forgotten.`,
  ]},
]);

