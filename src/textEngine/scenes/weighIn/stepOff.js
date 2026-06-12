// wi.* step-off beat after the reading settles
import { registerPool } from '../../engine.js';

registerPool('wi.dismount', [
  { when: { stageMax: 1 }, text: ['steps off lightly', 'hops down', 'steps off without hurry'] },
  { when: { stage: [2, 3] }, text: ['steps off carefully', 'steps down', 'eases herself off'] },
  { when: { stage: [4, 5] }, text: ['steps off slowly', 'eases herself down', 'steps off with a soft jiggle through her middle'] },
  { when: { stageMin: 6, stageMax: 8 }, text: ['steps off in stages', 'eases herself off the platform', 'steps down carefully, breathing through her nose'] },
  { when: { stageMin: 9 }, text: ['redistributes her weight off the platform', 'shifts her enormous body off the platform', 'does not so much step off as redistribute'] },
  { when: {}, text: ['steps off the platform', 'leaves the platform'] },
]);

registerPool('wi.dismountBody', [
  { when: { stage: [2, 3] }, text: ['her softened thighs brush together', 'soft flesh settling as she finds her balance', 'her belly gives a little when she shifts'] },
  { when: { stage: [4, 5] }, text: ['her thick belly swings forward with the motion', 'flesh wobbling, settling', 'the platform groans before going still'] },
  { when: { stageMin: 6 }, text: ['belly hanging heavy and swaying', 'slow ripples through her fat body', 'vast soft weight shifting off inch by inch'] },
  { when: { stageMin: 9 }, text: ['vast soft mass shifting in a slow, seismic motion', 'warm weight transferring off the metal', 'the office seems to exhale around her'] },
  { when: {}, text: ['the platform rocks once and goes still', 'the scale trembles and settles'] },
]);

registerPool('wi.platformAfter', [
  { when: { stageMin: 4 }, text: ['the platform dipping before rocking upright', 'the scale creaks once', 'the platform groans before going still'] },
  { when: {}, text: ['the platform returning to level behind her', 'the scale settling behind her'] },
]);

registerPool('wi.numberSettle', [
  { when: { bigScale: true, stageMin: 6 }, text: [
    'The display stabilizes at {subject.lbs}.',
    'Stable reading: {subject.lbs} lbs.',
    'The green numbers hold at {subject.lbs}.',
  ] },
  { when: { bigScale: true }, text: ['The display settles at {subject.lbs}.', 'Stable reading: {subject.lbs} lbs.'] },
  { when: { stageMin: 9 }, text: ['The display stabilizes at {subject.lbs}.', 'The reading holds at {subject.lbs}.'] },
  { when: {}, text: ['The dial holds at {subject.lbs}.', 'The dial settles at {subject.lbs}.', 'The reading steadies at {subject.lbs}.'] },
]);

registerPool('wi.stepOff', [
  { when: { bigScale: true }, text: [
    '{wi.numberSettle} {subject.name} {wi.dismount}{join:wi.dismountBody,wi.platformAfter|prefix:, }.',
  ] },
  { when: {}, text: [
    '{wi.numberSettle} {subject.name} {wi.dismount}{join:wi.dismountBody,wi.platformAfter|prefix:, }.',
  ] },
]);
