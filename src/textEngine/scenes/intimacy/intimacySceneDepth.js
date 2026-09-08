// The Squad — Lead: A2 Psych | Support: A5 Editor
// Per-student depth on intimacy depth-layer pools (bodyFeel/climax/encourages).
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('intimacy.bodyFeel', [
  { when: { studentId: 0, stageMin: 6 }, weight: 4, text: [
    `Brittany settles against you — thighs broad, belly soft, captain's warmth unmistakable.`,
    `Her weight arrives cheerful and real; you feel every plush inch she earned.`,
  ]},
  { when: { studentId: 2, stageMin: 5 }, weight: 4, text: [
    `Kylie presses close, angles included — warmth, curve, the give of fame-softened flesh.`,
    `She wants you to feel all of it. You do. She knows you do.`,
  ]},
  { when: { studentId: 4, stageMin: 6 }, weight: 4, text: [
    `Fiona's body is a canvas against yours — soft heat, slow breath, abundance as art.`,
  ]},
  { when: { studentId: 5, stageMin: 5 }, weight: 4, text: [
    `Destiny melts in by degrees — gamer posture gone, belly warm, thighs heavy on yours.`,
  ]},
  { when: { studentId: 8, stageMin: 4 }, weight: 4, text: [
    `Maya's warmth is quiet and total — small sounds, soft middle, trust in every inch.`,
  ]},
  { when: { studentId: 10, stageMin: 7 }, weight: 4, text: [
    `Reneé offers herself like a dish perfected — belly, thigh, the slow tide of her breathing.`,
  ]},
  { when: { studentId: 11, stageMin: 6 }, weight: 4, text: [
    `Kaylee curls into you with clinical tenderness — warm, heavy, vitals elevated, content.`,
  ]},
  { when: { studentId: 15, stageMin: 7 }, weight: 4, text: [
    `Lilith's mass arrives predatory and soft — heat, weight, appetite without hurry.`,
  ]},
  { when: { studentId: 14, stageMin: 5 }, weight: 4, text: [
    `Mary Jane spills warmth like sunshine — belly, hip, farm-girl abundance pressed close.`,
  ]},
  { when: { stageMin: 9 }, weight: 3, text: [
    `Vast layers find you — belly, thigh, breath; immobility has not reduced how much there is to feel.`,
  ]},
]);

registerModuleVariants('intimacy.encourages', [
  { when: { studentId: 0, corruption: [2] }, weight: 4, text: [
    `"Feel all of it," Brittany breathes. "That's the point."`,
  ]},
  { when: { studentId: 2 }, weight: 4, text: [
    `"Tell me I'm gorgeous like this," Kylie whispers. "Mean it."`,
  ]},
  { when: { studentId: 6 }, weight: 4, text: [
    `"Don't stop, sweetheart," Tiffany murmurs. "I'm not done being held."`,
  ]},
  { when: { studentId: 8, corruption: [1, 2] }, weight: 4, text: [
    `Maya's hand finds yours. A squeeze. Permission without words.`,
  ]},
  { when: { studentId: 9 }, weight: 4, text: [
    `"Encore," Chloé breathes. "Always encore."`,
  ]},
  { when: { studentId: 12 }, weight: 4, text: [
    `"Document this," Nadia whispers. "I want a record of how it feels."`,
  ]},
  { when: { studentId: 15, corruption: [2] }, weight: 4, text: [
    `"More," Lilith says. Not a request. A fact about what happens next.`,
  ]},
]);

registerModuleVariants('intimacy.climax', [
  { when: { studentId: 0, corruption: [2] }, weight: 4, text: [
    `Brittany laughs breathlessly through it — full, wanted, unashamed of every soft pound.`,
  ]},
  { when: { studentId: 2 }, weight: 4, text: [
    `Kylie trembles, then grins. "Post that," she murmurs. She means the feeling, not the camera.`,
  ]},
  { when: { studentId: 4 }, weight: 4, text: [
    `Fiona dissolves into warmth — a finished piece, breathless, beautiful, still.`,
  ]},
  { when: { studentId: 5 }, weight: 4, text: [
    `Destiny goes quiet — rare — then exhales. "Worth the lag," she mutters.`,
  ]},
  { when: { studentId: 8, corruption: [0] }, weight: 4, text: [
    `Maya shudders small and certain; she clings afterward like gravity chose her.`,
  ]},
  { when: { studentId: 10, corruption: [2] }, weight: 4, text: [
    `Reneé sighs like a perfect last bite — sated, glowing, already hungry for more.`,
  ]},
  { when: { studentId: 11 }, weight: 4, text: [
    `Kaylee melts into stillness — vitals elevated, smile soft, trust absolute.`,
  ]},
  { when: { studentId: 14 }, weight: 4, text: [
    `Mary Jane laughs low and sunny afterward. "Well bless us both," she breathes.`,
  ]},
  { when: { studentId: 15 }, weight: 4, text: [
    `Lilith goes predator-still, then smiles. "Good hunt," she whispers against your skin.`,
  ]},
  { when: { stageMin: 9, corruption: [2] }, weight: 3, text: [
    `Release rolls through vast softness — breath, weight, pleasure landing open and unguarded.`,
  ]},
]);
