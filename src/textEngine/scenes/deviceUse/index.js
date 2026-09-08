// ═══════════════════════════════════════════════════════════════
// SCENE: DEVICE USE — on-demand manual actions
// ═══════════════════════════════════════════════════════════════
import { registerPool, render } from '../../engine.js';
import { buildDeviceSceneContext } from '../device/context.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import './fragments.js';
import '../../modules.js';

registerPool('device.use.beat', [
  { when: { actionId: 'tighten_pulse' }, text: [
    '{device.use.action}; {device.use.sensation|cap}.',
    '{device.use.action} — {device.use.risk|cap}.',
  ] },
  { when: { actionId: 'burst_feed' }, text: [
    '{device.use.action}; {device.use.sensation|cap}.',
    '{device.use.action}. {device.use.effect|cap}.',
  ] },
  { when: {}, text: [
    '{device.use.action}; {device.use.sensation|cap}.',
    '{device.use.action}. {device.use.effect|cap}.',
    '{device.use.action} — {device.use.context|cap}.',
  ] },
]);

export function renderDeviceUseLine({ student, deviceId, deviceLabel, actionId, week = 1, gainLbs = 0, dependenceLevel = 0, trace = null }) {
  const ctx = buildDeviceSceneContext(student, { deviceId, deviceLabel, actionId, week, gainLbs, dependenceLevel });
  const base = render('{device.use.beat}', ctx, { trace });
  return appendV2Depth(base, 'device', ctx, 0.32);
}
