// Research journal depth (Pass 138).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('journal.feeder.cheerleader.s3', [
  {
    when: { stageMin: [4] },
    weight: 1,
    text: [
      'Uniform fights back — she cheers for more anyway, wellness season rewriting squad rules in real time.',
    ],
  },
]);

registerModuleVariants('journal.nadia.swimmer.intro.l1', [
  {
    when: { archetype: ['swimmer'] },
    weight: 1,
    text: [
      'Nadia’s second intro — Cassidy’s lane discipline reframed as appetite waiting for a new finish line.',
    ],
  },
]);
