import { registerPool } from '../../engine.js';
import '../../modules.js';

registerPool('device.malf.open', [
  { when: { malfunctionTier: 'critical' }, text: [
    'the {device.label} locks in runaway mode on {subject.name}',
    'safeties die — the {device.label} won\'t stop',
    'critical fault: {device.label} treats {subject.name} like a stress test',
  ] },
  { when: { malfunctionTier: 'major' }, text: [
    'the {device.label} overshoots its profile on {subject.name}',
    'a major glitch ripples through the {device.label}',
    '{subject.name} takes a major fault from the {device.label}',
  ] },
  { when: {}, text: [
    'the {device.label} hiccups mid-cycle on {subject.name}',
    'something slips in the {device.label}\'s timing',
    'a minor malfunction ghosts through the {device.label}',
  ] },
]);

registerPool('device.malf.consequence', [
  { when: { dependenceTierMin: 2 }, text: [
    'she clings to the broken rhythm like comfort',
    'withdrawal would hurt worse — she doesn\'t fight it',
    'dependence makes the glitch feel almost welcome',
  ] },
  { when: {}, text: [
    'gain and shame stack faster than planned',
    'the error converts straight into visible weight',
    'she pays for the fault in pounds and flush',
  ] },
]);

registerPool('device.malf.sensation', [
  { when: {}, text: [
    'pressure spikes where the rig should have eased',
    'heat and stretch bloom wrong across her',
    'her body registers the fault as overload',
  ] },
]);

registerPool('device.malf.risk', [
  { when: {}, text: [
    'you should power down — you won\'t',
    'another week on this setting courts worse',
    'instability writes itself into her flesh',
  ] },
]);
