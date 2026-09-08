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
