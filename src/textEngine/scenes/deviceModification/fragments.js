import { registerPool, registerModule } from '../../engine.js';
import '../../modules.js';

registerModule('device.componentLabel', [
  { when: {}, text: [(ctx) => ctx.globals?.componentLabel || 'the component'] },
]);

registerPool('device.mod.open', [
  { when: {}, text: [
    'you seat {device.componentLabel} into the {device.label}',
    'the {device.label} accepts {device.componentLabel} with a satisfied click',
    'integration complete — {device.componentLabel} becomes part of the {device.label}',
  ] },
]);

registerPool('device.mod.integration', [
  { when: {}, text: [
    'it is no longer purely Talia\'s original spec',
    'your handwriting shows in the wiring now',
    'the rig hums on a profile you authored',
  ] },
]);

registerPool('device.mod.risk', [
  { when: {}, text: [
    'stability shifts — you traded margin for output',
    'the risk meter ticks; worth it, probably',
    'more power, more ways to fail',
  ] },
]);

registerPool('device.mod.context', [
  { when: {}, text: [
    'another step toward a machine only you would build',
    'she will feel the difference on the next cycle',
    'modification logged; consequences pending',
  ] },
]);
