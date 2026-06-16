// The Squad — Lead: A3 Immobility | Support: A7 Artisan, A5 Editor
// Per-girl immobility voice — stage 10–11 persona lines.
import { registerModuleVariants } from '../../engine.js';
import './fragments.js';

const W = 4;
const IMMOBILE_TOP = { stageMin: 11 };
const IMMOBILE_MID = { stageMin: 10, stageMax: 10 };

registerModuleVariants('immob.register', [
  { when: { studentId: 0, ...IMMOBILE_TOP, corruption: [2] }, weight: W, text: [
    `"Still winning," Brittany says from the center of the room. "Just a bigger field."`,
    `"Coach can't bench what's already the whole game."`,
  ]},
  { when: { studentId: 1, ...IMMOBILE_TOP, corruption: [1] }, weight: W, text: [
    `"Mobility optional," Madeline murmurs. "Findings: extensive."`,
    `"I've exceeded every projection. Observation continues from here."`,
  ]},
  { when: { studentId: 2, ...IMMOBILE_TOP, corruption: [2] }, weight: W, text: [
    `"This is the shot," Kylie says calmly. "Wide frame. No filter. Stay."`,
    `"They'll remember this one. Good."`,
  ]},
  { when: { studentId: 3, ...IMMOBILE_TOP, corruption: [1] }, weight: W, text: [
    `"Different event now," Serena says. "Still training. Still winning."`,
    `"Endurance counts. I've got plenty."`,
  ]},
  { when: { studentId: 4, ...IMMOBILE_TOP, corruption: [2] }, weight: W, text: [
    `"Composition," Fiona breathes, pleased. "All figure now."`,
    `"I'm the room's best view. Paint me later."`,
  ]},
  { when: { studentId: 5, ...IMMOBILE_TOP, corruption: [0] }, weight: W, text: [
    `"Offline for a bit," Destiny says. "Chat can wait."`,
    `"Comfort patch installed. Not moving."`,
  ]},
  { when: { studentId: 6, ...IMMOBILE_TOP, corruption: [2] }, weight: W, text: [
    `"Chapter meeting in here," Tiffany laughs. "I'm the venue."`,
    `"Pastel still matches. The room doesn't."`,
  ]},
  { when: { studentId: 7, ...IMMOBILE_TOP, corruption: [0] }, weight: W, text: [
    `"Off-schedule," Priya admits. "But the floor plan adapts. I'll adapt too."`,
    `"New constraint. I'll work around it."`,
  ]},
  { when: { studentId: 8, ...IMMOBILE_TOP, corruption: [1] }, weight: W, text: [
    `Maya does not speak. She rests, vast and quiet, and lets you look.`,
    `"Okay," Maya says at last. "I'm here. All of me."`,
  ]},
  { when: { studentId: 9, ...IMMOBILE_TOP, corruption: [2] }, weight: W, text: [
    `"American portions," Chloé purrs, "taken to their logical conclusion."`,
    `"I am the salon now. Sit. Admire."`,
  ]},
  { when: { studentId: 10, ...IMMOBILE_TOP, corruption: [2] }, weight: W, text: [
    `"Course finished," Reneé sighs, happy. "I'm the dessert now."`,
    `"Warm, rich, and not going anywhere. Perfect."`,
  ]},
  { when: { studentId: 11, ...IMMOBILE_TOP, corruption: [1] }, weight: W, text: [
    `"Stable," Kaylee says dryly. "Soft. Assisted when needed. Mood: good."`,
    `"I needed the rest. No regrets."`,
  ]},
  { when: { studentId: 12, ...IMMOBILE_TOP, corruption: [2] }, weight: W, text: [
    `"Hypothesis confirmed," Nadia says. "You're still watching. Good."`,
    `"The chair lost. I didn't."`,
  ]},
  { when: { studentId: 13, ...IMMOBILE_TOP, corruption: [1] }, weight: W, text: [
    `"Bless it, honey, I'm not going anywhere fast," Daisy says warmly. "Bring snacks closer."`,
    `"I'm the whole porch swing now."`,
  ]},
  { when: { studentId: 14, ...IMMOBILE_TOP, corruption: [2] }, weight: W, text: [
    `"Harvest came in all at once," Mary Jane grins. "Y'all sit a spell."`,
    `"Big as a barn door and proud of it."`,
  ]},
  { when: { studentId: 15, ...IMMOBILE_TOP, corruption: [2] }, weight: W, text: [
    `Lilith rests without explaining. Her stillness is the whole sentence.`,
    `"Enough," she says softly. Not a complaint. A fact.`,
  ]},
  { when: { studentId: 16, ...IMMOBILE_TOP, corruption: [0] }, weight: W, text: [
    `"The trial exceeded tolerance," Sophia whispers. "In a good way. I think."`,
    `"It worked. I'm the proof."`,
  ]},
  { when: { studentId: 17, ...IMMOBILE_TOP, corruption: [1] }, weight: W, text: [
    `"Found the big room," Indiana says. "Marked it on the map. I'm the landmark."`,
    `"Best ruin on campus. Me."`,
  ]},
  { when: { studentId: 18, ...IMMOBILE_TOP, corruption: [2] }, weight: W, text: [
    `"Output exceeded target," Talia says, satisfied. "No rollback."`,
    `"The prototype became the product. I'm keeping it."`,
  ]},
]);

registerModuleVariants('immob.settledState', [
  { when: { studentId: 5, ...IMMOBILE_MID }, weight: W, text: [
    'Destiny has settled into the room — vast, warm, controller within reach.',
    'Her mass pools around the chair like she has claimed a save point.',
  ]},
  { when: { studentId: 10, ...IMMOBILE_TOP }, weight: W, text: [
    'Reneé rests in immobile warmth, a feast still steaming at the edges.',
    'She has become the kind of abundance you serve in courses, not portions.',
  ]},
  { when: { studentId: 14, ...IMMOBILE_TOP }, weight: W, text: [
    'Mary Jane fills the dorm like summer fills a porch — generous, still, unmistakably home.',
    'She is harvest season made stationary, soft and vast and pleased.',
  ]},
  { when: { studentId: 0, ...IMMOBILE_TOP }, weight: W, text: [
    'Brittany rests at the center of the room like a captain who claimed the whole field.',
    'Victory looks immobile from here. She is not complaining.',
  ]},
  { when: { studentId: 1, ...IMMOBILE_TOP }, weight: W, text: [
    'Madeline has outgrown the chair and outgrown the urge to leave it.',
    'Immobility, she notes, is a valid experimental outcome.',
  ]},
  { when: { studentId: 2, ...IMMOBILE_TOP }, weight: W, text: [
    'Kylie is the set now — vast, warm, camera optional.',
    'She rests like content that does not need a caption.',
  ]},
  { when: { studentId: 3, ...IMMOBILE_TOP }, weight: W, text: [
    'Serena\'s mass pools where she lands. Movement comes by degrees now.',
    'The room is her stadium. She has already won.',
  ]},
  { when: { studentId: 4, ...IMMOBILE_TOP }, weight: W, text: [
    'Fiona is a living canvas — immobile abundance, color in flesh.',
    'She rests like a finished mural. Still art. Still growing.',
  ]},
  { when: { studentId: 6, ...IMMOBILE_TOP }, weight: W, text: [
    'Tiffany turns the dorm into chapter headquarters by sheer presence.',
    'Pastel stretches over impossible warmth. Still cute. Still vast.',
  ]},
  { when: { studentId: 7, ...IMMOBILE_TOP }, weight: W, text: [
    'Priya has redesigned the room around what she can reach from here.',
    'Snacks within arm\'s length. Efficiency achieved.',
  ]},
  { when: { studentId: 8, ...IMMOBILE_TOP }, weight: W, text: [
    'Maya rests quiet and vast — a landscape you approach carefully.',
    'Stillness suits her. She was always good at being still.',
  ]},
  { when: { studentId: 9, ...IMMOBILE_TOP }, weight: W, text: [
    'Chloé lounges like a salon hostess who became the salon.',
    'French elegance at impossible size. She makes it look intentional.',
  ]},
  { when: { studentId: 11, ...IMMOBILE_TOP }, weight: W, text: [
    'Kaylee rests with nurse calm — soft, assisted when needed, unhurried.',
    'She has made peace with needing the room to come to her.',
  ]},
  { when: { studentId: 12, ...IMMOBILE_TOP }, weight: W, text: [
    'Nadia is the case study now — immobile, observed, unsurprised.',
    'The dynamic holds even when she cannot hold herself up alone.',
  ]},
  { when: { studentId: 13, ...IMMOBILE_TOP }, weight: W, text: [
    'Daisy fills the dorm like fresh bread in a warm kitchen — still, fragrant, generous.',
    'Bless her heart, she is the whole porch swing now.',
  ]},
  { when: { studentId: 15, ...IMMOBILE_TOP }, weight: W, text: [
    'Lilith rests with predator stillness. The room is hers.',
    'Mass and silence share the space. Both dominate.',
  ]},
  { when: { studentId: 16, ...IMMOBILE_TOP }, weight: W, text: [
    'Sophia is the live trial outcome — vast, warm, immobile, documented.',
    'The research exceeded every tolerance. She remains stable.',
  ]},
  { when: { studentId: 17, ...IMMOBILE_TOP }, weight: W, text: [
    'Indiana has discovered the largest ruin on campus: herself, settled and immense.',
    'X marks the spot. She is the spot. Expedition paused, satisfied.',
  ]},
  { when: { studentId: 18, ...IMMOBILE_TOP }, weight: W, text: [
    'Talia rests where the geometry finally works — immobile, warm, parameters exceeded.',
    'The prototype became the product. She is keeping it.',
  ]},
]);

registerModuleVariants('immob.spaceObs', [
  { when: { studentId: 3, ...IMMOBILE_TOP }, weight: W, text: [
    'The doorway is a finish line she crossed weeks ago. The room is the stadium now.',
    'Track lanes have nothing on the geography she occupies.',
  ]},
  { when: { studentId: 7, ...IMMOBILE_TOP }, weight: W, text: [
    'The floor plan has been revised around her without permission. She approves the edit.',
    'Space is a resource. She has consumed most of it. Efficient.',
  ]},
]);
