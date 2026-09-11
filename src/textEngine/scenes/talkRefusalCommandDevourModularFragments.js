// Floor talk — command_devour refusal late frame (prepend; keeps refusal body).
import { registerPool, registerModuleVariants } from '../engine.js';

registerPool('talk.refusal.command_devour.lateBrink', [
  {
    when: {},
    weight: 2,
    text: [
      'Hall Ambiance drops to a hush — the command touches something ancient and stalls at capacity.',
      'Late-semester refusal: not tonight, not because she wills it — because fullness drew a hard line.',
      'Warmth pools in the room; hunger wants the myth, belly votes physics.',
      'Wellness framing cannot argue with distension — she trembles at the brink, hands on her middle.',
      'Growth as lifestyle pauses one beat — co-conspirator eyes dark with wanting anyway.',
    ],
  },
]);

registerPool('talk.refusal.command_devour.lateAlmost', [
  {
    when: {},
    weight: 2,
    text: [
      'She trembles with how close it was — obedience a breath away, portions deferred not denied forever.',
      'Every inch of her body says not yet; every glance asks you to try again when she has room.',
      'Clipboard invisible; only breath, fabric strain, and the soft shock of almost.',
      'You hear refusal and invitation in the same exhale — tender dominance meeting a full stomach.',
      'The hall log stays neutral; her distended honesty is the only record that matters tonight.',
    ],
  },
]);

const DEVOUR_HEAD = '{talk.refusal.command_devour.lateBrink|suffix:\n\n}{talk.refusal.command_devour.lateAlmost|suffix:\n\n}';
const DEVOUR_BODY = '{talk.refusal.command_devour._f3} {talk.refusal.command_devour._f4}';

registerModuleVariants('talk.refusal.command_devour', [
  {
    when: { weekMin: 22 },
    weight: 8,
    priority: 7,
    text: [`${DEVOUR_HEAD}${DEVOUR_BODY}`],
  },
  {
    when: { weekMin: 14 },
    weight: 4,
    priority: 4,
    text: [`${DEVOUR_HEAD}${DEVOUR_BODY}`],
  },
]);
