// wi.* scale approach — analog platform + industrial LCD
import { registerPool } from '../../engine.js';

registerPool('wi.platformReact', [
  { when: { stageMax: 1 }, text: ['The platform is steady.', 'The platform doesn\'t shift.', 'The platform barely notices.'] },
  { when: { stage: [2, 3] }, text: ['The platform settles a little more than it used to.', 'A faint creak — new, but not alarming.', 'The platform creaks with new authority.'] },
  { when: { stage: [4, 5] }, text: ['The platform groans once.', 'The platform dips.', 'The old white scale protests politely.'] },
  { when: { stage: [6, 7] }, text: ['The platform bows.', 'The platform flexes visibly beneath her.', 'The platform complains loudly.'] },
  { when: { stageMin: 8 }, text: ['The platform bends.', 'The platform protests immediately.', 'The scale makes a noise you will remember.'] },
  { when: { stage: [10, 11] }, text: ['The platform screams.', 'The platform gives up immediately.', 'The platform groans like something remembering its limits.'] },
  { when: {}, text: ['The platform settles.', 'The scale takes the weight.'] },
]);

registerPool('wi.needleReact', [
  { when: { stageMax: 1 }, text: ['The needle drifts to its answer.', 'The needle barely moves.', 'The red needle begins its measured arc.'] },
  { when: { stage: [2, 4] }, text: ['The needle swings wide and begins to hunt.', 'The red needle swings with purpose.', 'The dial shudders before climbing.'] },
  { when: { stage: [5, 7] }, text: ['The needle runs for the high numbers.', 'The needle slams toward the far end.', 'The dial has a long way to go.'] },
  { when: { stageMin: 8 }, text: ['The needle pins itself to the far edge.', 'The dial gives up pretending.', 'The needle has no room left to travel.'] },
  { when: {}, text: ['The red needle begins to spin.', 'The needle starts its climb.'] },
]);

registerPool('wi.lcdReact', [
  { when: { stageMin: 10 }, text: [
    'The LCD wakes and begins its long, patient climb.',
    'The display builds the number digit by digit, unhurried as she is.',
    'The green numbers rise one digit at a time.',
  ] },
  { when: { stageMin: 6 }, text: [
    'The industrial display blinks awake and begins its long climb.',
    'The green LCD starts counting.',
    'The display hums and starts building the number.',
  ] },
  { when: {}, text: [
    'The LCD display blinks to life and starts counting.',
    'The display wakes and the number starts building.',
    'The green numbers rise with mechanical patience.',
  ] },
]);

registerPool('wi.scaleApproach', [
  { when: { bodyType: 'pear', stageMin: 4 }, text: [
    'She steps onto the scale and her hips settle wide, the platform dipping slightly on one side. {wi.platformReact} {wi.needleReact}',
    'She steps up carefully, thighs pressing together as the dial begins its climb.',
    'She mounts the scale and rocks her weight hip-to-hip before the needle finds its direction.',
  ] },
  { when: { bodyType: 'apple', stageMin: 4 }, text: [
    'She steps onto the scale belly-first, the platform groaning as her middle settles forward. {wi.needleReact}',
    'She steps up and rests her hands on her gut, steadying herself as the needle swings.',
    'She mounts the scale and her belly bounces once before the dial shudders into motion.',
  ] },
  { when: { stageMax: 1 }, text: [
    'She steps onto the old analog scale. {wi.platformReact} {wi.needleReact}',
    'She steps up onto the white scale without ceremony.',
    'She steps on lightly; the scale barely notices.',
  ] },
  { when: { stage: [2, 3] }, text: [
    'She steps onto the old scale. {wi.platformReact} {wi.needleReact}',
    'She steps up. New roundness, honest on the dial.',
    'She mounts the scale and there is a faint creak.',
  ] },
  { when: { stage: [4, 5] }, text: [
    'She steps carefully onto the old scale. {wi.platformReact} {wi.needleReact}',
    'Belly rounding forward, scale complaining politely.',
    'She steps on heavy and the office hears it.',
  ] },
  { when: { stage: [6, 7] }, text: [
    'She steps onto the analog scale. {wi.platformReact} {wi.needleReact}',
    'Heavy flesh, rolling and real on the dial.',
    'Vast and patient, dial working overtime.',
  ] },
  { when: { stageMin: 8, stageMax: 9 }, text: [
    'She steps onto the old analog scale. {wi.platformReact} {wi.needleReact}',
    'The weight is staggering — the dial gives up pretending.',
    'This scale was not built for this. It tries anyway.',
  ] },
  { when: { stage: [10, 11] }, text: [
    'She shifts onto the scale — immobile abundance settling. {wi.platformReact} {wi.needleReact}',
    'The scale complains once, then gives up numerically.',
    'Immobility and warmth — beyond the dial\'s vocabulary.',
  ] },
  { when: {}, text: ['She steps onto the scale. {wi.needleReact}'] },
]);

registerPool('wi.bigScaleApproach', [
  { when: { stage: [11] }, text: [
    'She goes to the heavy-duty platform — the only scale that still pretends to understand her. {wi.lcdReact}',
    'She settles onto the industrial platform. The steel holds. {wi.lcdReact}',
    'Impossible weight on steel that does not flinch. {wi.lcdReact}',
  ] },
  { when: { stageMin: 6 }, text: [
    'She goes straight to the heavy-duty platform without being asked. {wi.lcdReact}',
    'She crosses to the platform and steps up. The steel surface does not shift. {wi.lcdReact}',
    'She steps onto the heavy-duty platform with the ease of routine. {wi.lcdReact}',
  ] },
  { when: {}, text: [
    'She heads straight for the heavy-duty platform — she knows the routine by now. {wi.lcdReact}',
    'She crosses to the industrial scale without being asked. {wi.lcdReact}',
    'She goes to the big scale first. Smart. The analog dial gave up weeks ago.',
  ] },
]);
