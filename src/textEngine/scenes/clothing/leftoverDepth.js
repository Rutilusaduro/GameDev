// The Squad — Lead: A1 Mobile | Support: A5 Editor
// leftoverFed extras after cloth.discovery registerPool.
// leftoverFed+clothingState so leftover weeks keep the failure mode.
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('cloth.discovery', [
  { when: { leftoverFed: true, clothingState: 'button_pop' }, weight: 3, text: [
    'The button gives on a middle the kitchen already opened. Small tok. Warm surrender.',
    'Leftover heat, then the button. The waistband was never going to survive both.',
  ] },
  { when: { leftoverFed: true, clothingState: 'zipper_fail' }, weight: 3, text: [
    'The zipper stops on leftover swell. She tugs once and lets the gap stay honest.',
    'Metal teeth meet galley dough. The truce lasts half a second.',
  ] },
  { when: { leftoverFed: true, clothingState: 'seam_split' }, weight: 3, text: [
    'A seam opens along leftover heat — hip confession, kitchen still in the fabric.',
    'Thread gives where last night\'s tray sat. Honest. Audible.',
  ] },
  { when: { leftoverFed: true, clothingState: 'waistband_surrender' }, weight: 3, text: [
    'The elastic quits on leftover mass. The gap is the kitchen\'s handwriting.',
    'Waistband rolls under a middle that already had a second sitting.',
  ] },
  { when: { leftoverFed: true, stageMin: 6 }, weight: 3, text: [
    'She feels leftover in the seam before she sees it. The outfit files the complaint.',
    'Kitchen sitting, then this outfit. The mirror is late to the news.',
  ] },
]);
