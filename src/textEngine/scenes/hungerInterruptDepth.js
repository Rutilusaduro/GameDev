// The Squad — Lead: A2 Psych | Support: A5 Editor
// Wildcard depth for hunger interrupt pools.
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('scene.hungerInterrupt.starter', [
  { when: { stageMin: 8, hungerTier: [3, 4] }, weight: 3, text: [
    'The knock is heavy — impatience measured in pounds waiting outside your door.',
    'Someone is knocking like the door owes them food.',
  ]},
  { when: { addictionLevel: [4] }, weight: 2, text: [
    'A sharp, uneven knock — hunger that has stopped being polite.',
  ]},
]);

registerModuleVariants('scene.hungerInterrupt.appearance', [
  { when: { stageMin: 9 }, weight: 3, text: [
    'At {subject.lbs} lbs she fills the frame — warmth, mass, appetite visible before she speaks.',
  ]},
  { when: { stageMin: 5, stageMax: 7 }, weight: 2, text: [
    'Her clothes strain at seams and waistband — hunger and softness both legible in the doorway.',
  ]},
  { when: { studentId: 8 }, weight: 4, text: [
    `Maya stands quiet in the hall, hands folded over her middle, eyes down — need without performance.`,
  ]},
  { when: { studentId: 0 }, weight: 4, text: [
    `Brittany shifts her weight, restless — captain energy turned inward on appetite.`,
  ]},
]);

registerModuleVariants('scene.hungerInterrupt.request', [
  { when: { studentId: 0, hungerTier: [3, 4] }, weight: 4, text: [
    `"Feed me," Brittany says, direct as a pep talk. "Team needs fuel. Starting with me."`,
  ]},
  { when: { studentId: 2 }, weight: 4, text: [
    `"Camera's off," Kylie says. "This stays between us. Feed me."`,
  ]},
  { when: { studentId: 4 }, weight: 4, text: [
    `"I had a vision," Fiona murmurs, "of something warm in my hands. Please?"`,
  ]},
  { when: { studentId: 6 }, weight: 4, text: [
    `"Chapter emergency," Tiffany says brightly. "Snack crisis. You're qualified to help."`,
  ]},
  { when: { studentId: 7 }, weight: 4, text: [
    `"Scheduled intake window," Priya says. "I'm early. Data supports intervention."`,
  ]},
  { when: { studentId: 8 }, weight: 4, text: [
    `"Food," Maya says. One word. She does not look away.`,
  ]},
  { when: { studentId: 9 }, weight: 4, text: [
    `"J'ai faim," Chloé says, amused and sincere. "American portions, s'il vous plaît."`,
  ]},
  { when: { studentId: 11 }, weight: 4, text: [
    `"I know it's late," Kaylee says softly. "Could you… look after me? Just a little?"`,
  ]},
  { when: { studentId: 13 }, weight: 4, text: [
    `"I brought cookies," Daisy says, "but I need a proper meal first. Please?"`,
  ]},
  { when: { studentId: 14 }, weight: 4, text: [
    `"I'm fixin' to be real honest," Mary Jane says, sunny and starving. "Feed me?"`,
  ]},
  { when: { studentId: 15 }, weight: 4, text: [
    `"Hungry," Lilith says. Not a question. "Fix it."`,
  ]},
  { when: { studentId: 17 }, weight: 4, text: [
    `"Found hunger," Indiana grins. "Need excavation supplies. Starting with you."`,
  ]},
  { when: { studentId: 18 }, weight: 4, text: [
    `"Caloric deficit critical," Talia says. "Requesting immediate remediation."`,
  ]},
  { when: { corruption: [2], stageMin: 7 }, weight: 3, text: [
    `"You know what I need," {subject.name} says. "Stop making me ask twice."`,
  ]},
]);

registerModuleVariants('scene.hungerInterrupt.behavior', [
  { when: { studentId: 3, hungerTier: [3, 4] }, weight: 4, text: [
    `Serena paces like pre-race — restless, focused, appetite treated as training.`,
  ]},
  { when: { studentId: 12 }, weight: 4, text: [
    `Nadia watches you with clinical hunger. "Subject requires feeding," she notes aloud.`,
  ]},
  { when: { stageMin: 10 }, weight: 3, text: [
    `She does not fidget — at this scale hunger is gravity, and she brings all of it to your door.`,
  ]},
]);

registerModuleVariants('scene.hungerInterrupt.tone', [
  { when: { corruption: [2], relationship: [3, 4] }, weight: 3, text: [
    'Her gaze holds yours — hungry, certain, unwilling to leave empty-handed.',
  ]},
  { when: { studentId: 8 }, weight: 4, text: [
    'Maya waits without fidgeting. The silence is the request.',
  ]},
]);

registerModuleVariants('hunger.response.feed.aftermath', [
  { when: { stageMin: 7 }, weight: 2, text: [
    'She leans back, vast and warm, color returning to her cheeks — fed, settled, still wanting more eventually.',
  ]},
  { when: { studentId: 5 }, weight: 4, text: [
    'Destiny exhales. "HP restored," she mutters. "Stream can resume."',
  ]},
]);

registerModuleVariants('hunger.response.deny.reaction', [
  { when: { corruption: [0] }, weight: 2, text: [
    'She nods too quickly, embarrassed, and looks away before you can change your mind.',
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    `Her smile goes cold. "Fine," she says. "I'll remember."`,
  ]},
]);
