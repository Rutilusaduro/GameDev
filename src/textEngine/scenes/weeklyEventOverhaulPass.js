// The Squad — Lead: A2 Psych | Support: A6 Slender
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('weekly.chairBreaks.buildup', [
  { when: { stageMin: 5 }, weight: 3, text: [
    'The chair groans early — she has outgrown its patience before the event truly starts.',
  ]},
  { when: { corruption: [0], stageMax: 4 }, weight: 3, text: [
    'Wood complains softly beneath her; she pretends not to hear, then stops pretending.',
  ]},
]);

registerModuleVariants('talk.checkIn.greetClose', [
  { when: { corruptionMin: 2 }, weight: 3, text: [
    'You leave her with permission still ringing in the air — she eats the silence like dessert.',
  ]},
  { when: { stageMin: 6 }, weight: 2, text: [
    'She rolls her shoulders, belly shifting with the motion, and agrees to tomorrow without hesitation.',
  ]},
]);
