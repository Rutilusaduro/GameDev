// CG measurement session — late-game tape ritual + data obsession frame.
import { registerPool, registerModuleVariants } from '../../engine.js';

registerPool('cg.measurement.ritualBeat', [
  {
    when: {},
    weight: 2,
    text: [
      'Tape whispers around soft flesh — Priya records every inch like scripture on the corkboard.',
      'Categories called in order; numbers land on the board before shame gets a vote.',
      'Reinforced stool creaks; rolls settle while the hall pretends this is wellness science.',
      'Late-semester measurements feel ceremonial — appetite logged, rivalry sharpened, nobody casual.',
      'Clipboard closed; voice steady. Competition dressed as floor culture, hunger dressed as data.',
    ],
  },
]);

const MEASURE_LATE = '{cg.measurement.ritualBeat|prefix:} {cg.scene.dataObsession|prefix: } {cg.scene.competitionHeat|prefix: }';

registerModuleVariants('cg.measurement.session', [
  {
    when: { weekMin: 20 },
    weight: 7,
    priority: 6,
    text: [MEASURE_LATE],
  },
  {
    when: { weekMin: 14 },
    weight: 4,
    priority: 4,
    text: [MEASURE_LATE],
  },
]);
