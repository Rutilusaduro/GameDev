// Wife lessons talk render path + homeroom depth (Pass 85).
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';

registerModuleVariants('wifeLessonsTalk.v2.depth', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Mary Jane listens between sentences — appetite learns names before numbers.',
    ],
  },
]);

registerModuleVariants('homeroom.conference.Sofia.next_tuesday', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Cardamom, peach upside-down, backup cake — Sofia ranks desserts like exam prep.',
    ],
  },
]);

registerModuleVariants('homeroom.conference.Mrs_Reyes.recipe_preview', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Mrs. Reyes leans into the recipe book like it is scripture with butter stains.',
    ],
  },
]);

registerModuleVariants('cg.chat.resident.Serena.close', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Serena posts one line — close enough to make Priya schedule another meal.',
    ],
  },
]);
