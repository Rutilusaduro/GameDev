import { registerPool } from '../../engine.js';
import '../../modules.js';

registerPool('device.use.action', [
  { when: { actionId: 'tighten_pulse' }, text: [
    'You cinch the {device.label} and {subject.name}\'s waist obeys in one brutal pulse',
    'the Controlled Rig answers your hand — {subject.name} balloons on command',
    'a manual Tighten fires; {subject.name} swells before she can brace',
  ] },
  { when: { actionId: 'burst_feed' }, text: [
    'the Precision Feeder Arm dumps a burst portion straight into {subject.name}',
    'you trigger Burst Feed — calories slam through {subject.name} faster than she can refuse',
    'the feeder arm you wear overfeeds {subject.name} in one relentless push',
  ] },
  { when: { actionId: 'vent_residual_swell' }, text: [
    'you vent the Measured Canister early — {subject.name}\'s lingering swell hisses away',
    'Residual pressure bleeds off {subject.name} at your signal',
    'the canister vents; {subject.name}\'s amplified bloat loses its hold',
  ] },
  { when: {}, text: [
    'the {device.label} responds to your command on {subject.name}',
    'you run a manual cycle — {subject.name} takes the hit',
    'the rig obeys; {subject.name} feels every calibrated increment',
  ] },
]);

registerPool('device.use.sensation', [
  { when: { dependenceTierMin: 2 }, text: [
    'she melts into the sensation like she\'s been waiting for it',
    'need radiates off her — the device and your hand share credit',
    'her body answers before her pride can object',
  ] },
  { when: {}, text: [
    'pressure and fullness bloom through her in real time',
    'she gasps, then steadies — the effect is immediate',
    'warm weight settles where the rig insists',
  ] },
]);

registerPool('device.use.effect', [
  { when: {}, text: [
    'calories or pressure convert to visible gain on the spot',
    'the change is measurable before the cycle finishes',
    'she carries the result in her posture immediately',
  ] },
]);

registerPool('device.use.risk', [
  { when: {}, text: [
    'instability ticks higher — you chose force over caution',
    'the rig runs hot; malfunction odds climb',
    'one more aggressive pulse and the safeties may not hold',
  ] },
]);

registerPool('device.use.context', [
  { when: { hungerTierMin: 2 }, text: [
    'her hunger makes every increment land harder',
    'craving amplifies what you just triggered',
    'she was already empty — this hits crueler for it',
  ] },
  { when: {}, text: [
    'the lab hums; only the two of you witness the spike',
    'another deliberate choice logged only in her body',
    'control and consequence, measured in pounds',
  ] },
]);
