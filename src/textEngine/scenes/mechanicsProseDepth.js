// The Squad — Lead: A2 Psych | Support: A6 Slender, A5 Editor
// Cross-cutting talk + feed + hall action prose depth.
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('talk.encourage.hook', [
  { when: {}, text: [
    'You speak like appetite is allowed — quiet, sure, leaving room for her to lean in.',
    'Your tone makes second helpings sound like care, not scandal.',
    'You praise hunger gently; she hears permission in it.',
  ]},
  { when: { corruption: [0] }, weight: 2, text: [
    'You speak like it is normal to want more — gentle, certain, leaving her nowhere to hide her curiosity.',
  ]},
  { when: { corruption: [1] }, weight: 2, text: [
    'Your voice does not ask; it invites, and her body answers before her pride catches up.',
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    'You praise appetite like devotion — she blushes, then eats, then blushes again for liking it.',
  ]},
]);

registerModuleVariants('hallAction.aftermath', [
  { when: {}, text: [
    'The floor quiets into the drowsy hush that follows a meal nobody pretended to moderate.',
    'Plates sit empty; belts rest open; the hall feels closer than it did an hour ago.',
    'Someone sighs contentedly; no one rushes to clean up — fullness is the point tonight.',
  ]},
  { when: { stageMin: 5 }, weight: 2, text: [
    'Chairs creak kindly; laughter returns slower, fuller, closer to the kitchen.',
  ]},
]);

registerModuleVariants('hallAction.opening', [
  { when: {}, text: [
    'You call the hall to table — not official, not quite innocent, absolutely effective.',
    'The announcement is casual; the spread behind you is not.',
    'Word travels fast when food is involved; chairs scrape before you finish speaking.',
  ]},
  { when: { corruptionMin: 2 }, weight: 2, text: [
    'They know what this is now; they come anyway, hungry for the ritual as much as the food.',
  ]},
]);
