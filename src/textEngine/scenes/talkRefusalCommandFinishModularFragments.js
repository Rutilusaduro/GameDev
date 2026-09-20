// Floor talk — command_finish refusal late frame (prepend; keeps refusal body).
import { registerPool, registerModuleVariants } from '../engine.js';

registerPool('talk.refusal.command_finish.lateHush', [
  {
    when: {},
    weight: 2,
    text: [
      'Hall Ambiance holds at the door — plates still waiting, command already spoken into the hush.',
      'Late-semester refusal energy: too full to obey, too honest to pretend shame about it.',
      'Warmth pools in the room; your authority meets physics and physics wins this round.',
      'Wellness framing cannot argue with distension — her belly answers before her pride can.',
      'Hunger wanted more; fullness drew the line — growth as lifestyle, paused not denied.',
    ],
  },
]);

registerPool('talk.refusal.command_finish.lateTremor', [
  {
    when: {},
    weight: 2,
    text: [
      'She trembles with how close obedience came — co-conspirator eyes, hands pressed to her middle.',
      'Every inch of her body votes no; every glance still asks you to try again later.',
      'Clipboard invisible; only breath, fabric strain, and the soft apology in her voice.',
      'You hear both refusal and invitation — portions deferred, not rejected forever.',
      'The hall log stays neutral; her distended honesty is the only record that matters.',
    ],
  },
]);

const REFUSAL_HEAD = '{talk.refusal.command_finish.lateHush|suffix:\n\n}{talk.refusal.command_finish.lateTremor|suffix:\n\n}';
const REFUSAL_BODY = '{talk.refusal.command_finish._f1} {talk.refusal.command_finish._f2}';

registerModuleVariants('talk.refusal.command_finish', [
  {
    when: { weekMin: 22 },
    weight: 8,
    priority: 7,
    text: [`${REFUSAL_HEAD}${REFUSAL_BODY}`],
  },
  {
    when: { weekMin: 14 },
    weight: 4,
    priority: 4,
    text: [`${REFUSAL_HEAD}${REFUSAL_BODY}`],
  },
]);
