// Recording session — composable ring-light + appetite-on-camera slots.
import { registerPool, registerModuleVariants } from '../../engine.js';
import {
  RECORDING_OPENING_TEXT,
  RECORDING_PERFECT_TAKE,
} from '../../../gameData/miniGames.js';

registerPool('recording.scene.ringLight', [
  {
    when: {},
    weight: 2,
    text: [
      'The ring light hums; the take keeps rolling — appetite as content, content as appetite.',
      'Camera loves fullness; she gives it angles without pretending.',
      'On camera she eats like it is accidental; the comments know better.',
      'Late-semester streams feel ceremonial — every bite a datapoint, every datapoint a dare.',
      'Hall Ambiance stays outside the frame; inside, growth as lifestyle reads unmistakable.',
    ],
  },
]);

registerPool('recording.scene.takeYield', [
  {
    when: {},
    weight: 2,
    text: [
      'Every swallow is a beat; every beat is a datapoint for the algorithm.',
      'Direction lands soft; compliance lands full — belly honest, face flushed.',
      'Perfect take means empty plate; empty plate means next take already queued.',
      'Phones rise for B-roll; co-conspirator pride louder than the chat donations.',
      'Wellness framing stays off-camera; portions stay honest and unmistakably generous.',
    ],
  },
]);

const RECORDING_SKELETON = '{recording.scene.ringLight|prefix:} {recording.scene.takeYield|prefix: }';

for (let si = 0; si < RECORDING_OPENING_TEXT.length; si += 1) {
  registerModuleVariants(`recording.opening.s${si}`, [
    {
      when: { weekMin: 22 },
      weight: 6,
      priority: 6,
      text: [RECORDING_SKELETON],
    },
    {
      when: { weekMin: 18 },
      weight: 4,
      priority: 3,
      text: [RECORDING_SKELETON],
    },
    {
      when: { weekMin: 8 },
      weight: 2,
      priority: 2,
      text: [RECORDING_SKELETON],
    },
  ]);
}

for (let si = 0; si < RECORDING_PERFECT_TAKE.length; si += 1) {
  registerModuleVariants(`recording.takeResult.perfect.s${si}`, [
    {
      when: { weekMin: 22 },
      weight: 6,
      priority: 6,
      text: [RECORDING_SKELETON],
    },
    {
      when: { weekMin: 16 },
      weight: 3,
      priority: 2,
      text: [RECORDING_SKELETON],
    },
  ]);
}
