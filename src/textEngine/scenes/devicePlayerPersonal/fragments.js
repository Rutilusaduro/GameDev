import { registerPool } from '../../engine.js';
import '../../modules.js';

registerPool('device.player.wear', [
  { when: { deviceId: 'controlled_bloating_rig' }, text: [
    'the Controlled Rig cinched at your waist hums with borrowed cruelty',
    'you wear Talia\'s bloat logic refined — control in your palm',
    'the belt on you is gentler until you choose otherwise',
  ] },
  { when: { deviceId: 'precision_feeder_arm' }, text: [
    'the Precision Feeder Arm rides your shoulder — aim is intimacy',
    'you carry the feeder yourself; portions obey your timing',
    'calibrated servos on your arm wait for your signal',
  ] },
  { when: {}, text: [
    'your personal rig settles against you — transgressive and precise',
    'the invention fits like a secret you intend to use',
    'you wear the device; the device wears your intent',
  ] },
]);

registerPool('device.player.sensation', [
  { when: {}, text: [
    'warm mechanical weight reminds you what you\'re willing to do',
    'feedback through the straps is almost affectionate',
    'the rig pulses in time with your heartbeat',
  ] },
]);

registerPool('device.player.risk', [
  { when: {}, text: [
    'every manual trigger stains your hands a little more',
    'you are complicit in what happens next',
    'the line between tool and accomplice blurs',
  ] },
]);

registerPool('device.player.context', [
  { when: {}, text: [
    'she will never know how much choice you keep',
    'intimacy through engineering — your private vice',
    'another week wearing what you built to reshape her',
  ] },
]);
