// Wife Lessons talk v2 depth append — late modular frame.
import { registerModuleVariants } from '../../engine.js';

const WL_V2_LATE = '{wl.talk.warmOpen|prefix:} {wl.talk.raPresence|prefix: } {wl.talk.branchPrompt|prefix: }';

registerModuleVariants('wifeLessonsTalk.v2.depth', [
  {
    when: { weekMin: 20 },
    weight: 6,
    priority: 6,
    text: [WL_V2_LATE],
  },
  {
    when: { weekMin: 14 },
    weight: 4,
    priority: 4,
    text: [WL_V2_LATE],
  },
]);
