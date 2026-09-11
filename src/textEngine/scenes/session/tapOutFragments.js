// Private session tap-out — composable breath + surrender slots.
import { registerPool, registerModuleVariants } from '../../engine.js';
import { TAP_OUT_DIALOGUE, TAP_OUT_250 } from '../../../gameData/students.js';

registerPool('session.tapOut.breath', [
  {
    when: {},
    weight: 2,
    text: [
      'Breath comes shallow between bites; fullness owns the room before polite conversation returns.',
      'She exhales around a stuffed middle — polite, dizzy, still hungry.',
      'Air feels optional when the session hits this deep — fullness owns the room before words return.',
      'Late-semester sessions end here — timer stops, appetite keeps humming anyway.',
      'Hall Ambiance outside; inside, only breath and the warm weight in her lap.',
    ],
  },
]);

registerPool('session.tapOut.surrender', [
  {
    when: {},
    weight: 2,
    text: [
      '"I can\'t—" she starts, then laughs because she absolutely can, just not move yet.',
      'Tap-out is mercy dressed as consent; she takes it with both hands on her belly.',
      'The session ends soft — pride, not panic, in how full she is.',
      'Rae notes the number anyway — wellness framing, competitive appetite, no shame.',
      'Every choice tonight will show on the scale; she taps out grinning, already planning seconds.',
    ],
  },
]);

const TAP_SKELETON = '{session.tapOut.breath|prefix:} {session.tapOut.surrender|prefix: }';

for (const [studentId, stages] of Object.entries(TAP_OUT_DIALOGUE)) {
  if (!Array.isArray(stages)) continue;
  stages.forEach((_, stageIdx) => {
    registerModuleVariants(`session.tapOut.s${studentId}.st${stageIdx}`, [
      {
        when: { weekMin: 14 },
        weight: 4,
        priority: 3,
        text: [TAP_SKELETON],
      },
      {
        when: { weekMin: 6 },
        weight: 2,
        priority: 2,
        text: [TAP_SKELETON],
      },
    ]);
  });
}

for (const [studentId] of Object.entries(TAP_OUT_250)) {
  const key = studentId === 'default' ? 'default' : `s${studentId}`;
  registerModuleVariants(`session.tapOut.extreme.${key}`, [
    {
      when: { weekMin: 12 },
      weight: 3,
      priority: 2,
      text: [TAP_SKELETON],
    },
  ]);
}
