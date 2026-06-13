import { registerPool } from '../../engine.js';
import '../../modules.js';

registerPool('device.unique.open', [
  { when: { uniqueTag: 'device_synergy_harness_bloat' }, text: [
    'the Adaptive Harness and Controlled Rig sing together on {subject.name}',
    'two of your inventions stack — {subject.name} swells in stereo',
    'harness synergy meets bloat pulse; {subject.name} can\'t tell which rig owns her',
  ] },
  { when: { uniqueTag: 'device_synergy_feeder_paste' }, text: [
    'stabilized paste meets precision feed — {subject.name} drinks architecture',
    'your printer and feeder arm share a cruel rhythm on {subject.name}',
    'paste and portion align; {subject.name} gains on a locked schedule',
  ] },
  { when: {}, text: [
    'two systems resonate on {subject.name} at once',
    'a rare overlap fires — {subject.name} feels the stack',
    'devices talk to each other through her body',
  ] },
]);

registerPool('device.unique.synergy', [
  { when: {}, text: [
    'yield multiplies where the rigs overlap',
    'the combo writes extra pounds into the same hour',
    'neither device alone could do this much',
  ] },
]);

registerPool('device.unique.sensation', [
  { when: {}, text: [
    'she shudders between competing pressures',
    'fullness and stretch arrive from two directions',
    'the sensation is layered — mechanical and intimate',
  ] },
]);

registerPool('device.unique.context', [
  { when: { stageMin: 7 }, text: [
    'at her size the synergy is architectural',
    'the room feels smaller around the combined effect',
    'gravity and engineering agree on the outcome',
  ] },
  { when: {}, text: [
    'you note the interaction for future tuning',
    'another data point in your private experiment',
    'control compounds when rigs cooperate',
  ] },
]);
