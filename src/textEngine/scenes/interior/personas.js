// The Squad — Lead: A2 Psych | Support: A5 Editor
// Per-resident interior self-observation — embeddable in eating/campus/clothing beats.
import { registerModuleVariants } from '../../engine.js';
import './selfObs.js';
import './sizeRealize.js';
import './gainPride.js';

const W = 4;

registerModuleVariants('interior.selfObs', [
  { when: { studentId: 0, corruption: [0], stageMin: 2, stageMax: 4 }, weight: W, text: [
    'Brittany inventories softness like a stat line she has not named yet.',
    'She still thinks of her body as equipment. The equipment is upgrading.',
    'The mirror gets a longer look after practice. She is not unhappy.',
  ]},
  { when: { studentId: 0, corruption: [2], stageMin: 5 }, weight: W, text: [
    'She checks progress the way she checks game film — proud, hungry for more.',
    'The mirror is a scoreboard now. She is winning.',
    'Trophy case: expanding. She approves.',
  ]},
  { when: { studentId: 1, corruption: [0], stageMax: 4 }, weight: W, text: [
    'Cassidy notes the rounding in the margin of her notebook. No conclusion yet.',
    'The trend line bends upward. She keeps watching.',
    'Standard deviation: widening. She does not panic.',
  ]},
  { when: { studentId: 1, corruption: [2], stageMin: 6 }, weight: W, text: [
    'She observes her own vastness with athletic delight. Field notes: excellent.',
    'The subject and the observer merged weeks ago.',
    'Citation needed: her hips. She provides evidence.',
  ]},
  { when: { studentId: 2, corruption: [1], stageMin: 3 }, weight: W, text: [
    'Kylie catches herself posing in reflective surfaces. The pose is less performance now.',
    'She likes what the glass says. She is not ready to caption it.',
    'Ring light off. Honesty on.',
  ]},
  { when: { studentId: 4, corruption: [0], stageMax: 4 }, weight: W, text: [
    'Fiona traces new curves like brushstrokes she did not plan and cannot undo.',
    'The composition changed. She is still studying it.',
    'Eraser stays in the drawer. She is curious instead.',
  ]},
  { when: { studentId: 5, corruption: [1], stageMin: 4 }, weight: W, text: [
    'Destiny notes the softness in the mirror and keeps streaming.',
    'She logs the softness and keeps streaming.',
    'Viewer count dips. Fullness does not.',
  ]},
  { when: { studentId: 8, corruption: [0], stageMax: 4 }, weight: W, text: [
    'Maya watches herself in shop glass. She does not comment. She remembers.',
    'The sketchbook gets a new study: her own hip, softer than last week.',
    'Lines she drew last month no longer fit. She redraws.',
  ]},
  { when: { studentId: 10, corruption: [2], stageMin: 5 }, weight: W, text: [
    'Reneé tastes her own fullness in the mirror — warm, layered, still rising.',
    'She is both course and critic. The review is favorable.',
    'Seconds recommended. She takes her own advice.',
  ]},
  { when: { studentId: 12, corruption: [1], stageMin: 4 }, weight: W, text: [
    'Nadia watches you watch her soften. The observation is mutual. She prefers it that way.',
    'She names the feeling in brackets and does not close them.',
    'Field notes: mutual observation. Subjects aligned.',
  ]},
  { when: { studentId: 14, corruption: [2], stageMin: 5 }, weight: W, text: [
    'Mary Jane pats her belly in the mirror like kneading dough — proud, patient, hungry for more.',
    'Abundance looks right on her. She knew it would.',
    'Farm logic: plant, water, grow. She applies it inward.',
  ]},
  { when: { studentId: 15, corruption: [2], stageMin: 6 }, weight: W, text: [
    'Lilith meets her reflection without blinking. Predators do not apologize for size.',
    'She is larger. She is stiller. Both facts please her.',
    'The mirror reflects mass and intent. Both increased.',
  ]},
  { when: { studentId: 16, corruption: [0], stageMax: 4 }, weight: W, text: [
    'Sophia double-checks the mirror the way she double-checks dosages. The number is real.',
    'Wellness research was supposed to stay theoretical. Her waist disagrees.',
    'Control group: her old jeans. Results: significant.',
  ]},
  { when: { studentId: 3, corruption: [0], stageMin: 2, stageMax: 4 }, weight: W, text: [
    'Serena inventories new softness like a training log she did not authorize.',
    'Her body keeps score differently now. She is still reading the sheet.',
    'Off-season used to mean lean. She is redefining the term.',
  ]},
  { when: { studentId: 6, corruption: [0], stageMax: 4 }, weight: W, text: [
    'Tiffany checks pastel over new curves and decides both still match.',
    'Chapter standards flex. So does she.',
    'Rush week photos will need a wider frame. She is not worried.',
  ]},
  { when: { studentId: 7, corruption: [0], stageMax: 4 }, weight: W, text: [
    'Priya notes rounding between planner blocks. The margin comment is unkind.',
    'She files the softness under variables to revisit. She revisits often.',
    'The spreadsheet adds a column: pleasure. Values trending up.',
  ]},
  { when: { studentId: 9, corruption: [0], stageMax: 4 }, weight: W, text: [
    'Chloé watches her waistband negotiate American life. She is amused. She is not stopping.',
    'The mirror gets a French expletive and a second look.',
    'Mon dieu — and then she eats anyway.',
  ]},
  { when: { studentId: 11, corruption: [0], stageMax: 4 }, weight: W, text: [
    'Kaylee observes her own softness with nurse calm and private curiosity.',
    'She would chart it if charting did not require admitting she enjoys the trend.',
    'Vitals: stable. Appetite: noted. Shame: declining.',
  ]},
  { when: { studentId: 13, corruption: [0], stageMax: 4 }, weight: W, text: [
    'Daisy notices the fuller figure and thinks of everyone she feeds. Herself included now.',
    'Bless her heart, she is rounder. She pats her hip like reassurance.',
    'The casserole dish was practice. She is the main course now.',
  ]},
  { when: { studentId: 17, corruption: [0], stageMax: 4 }, weight: W, text: [
    'Indiana maps new softness like uncharted rooms on campus. Worth exploring.',
    'Every pound is a landmark. She keeps adding pins.',
    'The map no longer fits on one page. She orders a larger one.',
  ]},
  { when: { studentId: 18, custom: false, corruption: [0], stageMax: 4 }, weight: W, text: [
    'Talia reads the new curve like output from a sensor she forgot she wore.',
    'The model updates. She does not revert the commit.',
    'Baseline shifted. Training continues.',
  ]},
  { when: { studentId: 18, corruption: [0], stageMax: 4 }, weight: W, text: [
    'Talia reads the new curve like output from a sensor she forgot she wore.',
    'The model updates. She does not revert the commit.',
    'Baseline shifted. Training continues.',
  ]},
]);

registerModuleVariants('interior.sizeRealize', [
  { when: { studentId: 3, stageMin: 6, corruption: [0] }, weight: W, text: [
    'Serena hears the chair complain and files it under adaptation, not defeat.',
    'The desk arm marks her hip. Evidence of a new training load.',
    'Off-season bulk has metrics now. She keeps the log open.',
  ]},
  { when: { studentId: 6, stageMin: 5, relationship: [2, 3] }, weight: W, text: [
    'Tiffany realizes your gaze caught the squeeze past the booth. She does not mind.',
    'She takes up space socially and physically. Greek letters stretch with her.',
    'Chapter sisters take up room. She is exceeding the standard.',
  ]},
  { when: { studentId: 9, stageMin: 7 }, weight: W, text: [
    'Chloé turns in a doorway and learns a new French word for how wide she has become. She smiles.',
    'Architecture was her major. Her body is the season plan now.',
    'The doorframe is coursework. She passes with honors.',
  ]},
  { when: { studentId: 11, stageMin: 6, corruption: [1] }, weight: W, text: [
    'Kaylee knows which chairs support her without drama. Clinical calm, practical choice.',
    'She measures doorways now. Not with fear — with planning.',
    'Support surfaces cataloged. She selects without panic.',
  ]},
  { when: { studentId: 17, stageMin: 8 }, weight: W, text: [
    'Indiana maps which halls echo when she passes. Sound is cartography at this size.',
    'The building reveals secrets to mass. She documents each one.',
    'Every creak is a coordinate. She updates the map nightly.',
  ]},
]);

registerModuleVariants('interior.gainPride', [
  { when: { studentId: 2, corruption: [2], stageMin: 5 }, weight: W, text: [
    'Kylie likes the number climbing. The feed will too. She is ready for both.',
    'Softness is the brand now. She owns it on camera and off.',
    'Metrics up. Engagement up. She is the content.',
  ]},
  { when: { studentId: 6, corruption: [2], stageMin: 6 }, weight: W, text: [
    'Tiffany treats every pound like a rush vote — passed, celebrated, seconded.',
    'Bigger is still on-brand. Pastel stretches. Confidence does not.',
    'Chapter standards evolve. She leads the amendment.',
  ]},
  { when: { studentId: 13, corruption: [1], stageMin: 5 }, weight: W, text: [
    'Daisy is proud the way southern kitchens are proud — warm, full, feeding everyone.',
    'She carries more of herself and more for others. Bless it.',
    'Abundance is hospitality turned inward. She serves herself generously.',
  ]},
  { when: { studentId: 14, corruption: [2], stageMin: 7 }, weight: W, text: [
    'Mary Jane grins at her own reflection like harvest season in a mirror.',
    'Every inch is jam-worthy. She is not stingy with growth.',
    'The crop came in heavy. She is pleased with the yield.',
  ]},
]);
