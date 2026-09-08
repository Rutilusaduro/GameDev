// ═══════════════════════════════════════════════════════════════
// SCENE: DEVICE UNIQUE INTERACTION — combo / mod flavor beats
// ═══════════════════════════════════════════════════════════════
import { registerPool, render } from '../../engine.js';
import { buildDeviceSceneContext } from '../device/context.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import './fragments.js';
import '../../modules.js';

registerPool('device.unique.beat', [
  { when: {}, text: [
    '{device.unique.open} {device.unique.synergy|cap}.',
    '{device.unique.open} — {device.unique.sensation|cap}.',
    '{device.unique.open}. {device.unique.context|cap}.',
  ] },
]);

export function renderDeviceUniqueInteraction({ student, deviceId, deviceLabel, uniqueTag, week = 1, trace = null }) {
  const ctx = buildDeviceSceneContext(student, { deviceId, deviceLabel, uniqueTag, week });
  const base = render('{device.unique.beat}', ctx, { trace });
  return appendV2Depth(base, 'device', ctx, 0.28);
}
