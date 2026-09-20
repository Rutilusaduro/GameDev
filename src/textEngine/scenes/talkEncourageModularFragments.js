// Floor talk — encourage appetite composable late beats.
import { registerPool, registerModuleVariants } from '../engine.js';

registerPool('talk.encourage.lateHallAir', [
  {
    when: {},
    weight: 2,
    text: [
      'Hall Ambiance thins at the door; inside, hunger sounds honest — plates implied, wellness framing optional.',
      'Late-semester floor check energy: full plates, full hearts, nobody pretending seconds are accidents.',
      'Warmth pools in the room the way fullness pools in her; encouragement lands like policy you wrote together.',
      'Fabric shifts when she breathes; appetite waits politely for you to name it out loud.',
      'Hunger hums under small talk; you both hear it like a shared secret the hall log will never capture.',
    ],
  },
]);

registerPool('talk.encourage.latePermission', [
  {
    when: {},
    weight: 2,
    text: [
      'You frame it as care; she hears permission dressed as command — co-conspirator smile, softer waistline.',
      'Clipboard stays out of sight; your words land like a hug with portions.',
      'Every bite tonight will show on the scale and in how she looks at you afterward.',
      'She meets your eyes like the rest of the floor can wait — fork, tray, or whatever you suggest next.',
      'Growth as lifestyle, measured in grateful sighs and the courage to reach before pride catches up.',
    ],
  },
]);

const LATE_HEAD = '{talk.encourage.lateHallAir|suffix:\n\n}{talk.encourage.latePermission|suffix:\n\n}';

const ENCOURAGE_LATE = [
  {
    when: { corruption: [0] },
    text: [
      `${LATE_HEAD}{talk.moodOpener|suffix:\n\n}{enc.deflect} {enc.reach}\n\n{enc.giveIn}{join:enc.bodyAside,enc.flush|prefix: }`,
      `${LATE_HEAD}{talk.moodOpener|suffix:\n\n}{enc.deflect}\n\n{enc.giveIn} {enc.reach}{enc.flush|prefix: }`,
      `${LATE_HEAD}{talk.moodOpener|suffix:\n\n}{enc.stageHunger}\n\n{enc.deflect} {enc.giveIn}{enc.flush|prefix: }`,
    ],
  },
  {
    when: { corruption: [1] },
    text: [
      `${LATE_HEAD}{talk.moodOpener|suffix:\n\n}{enc.accept} {enc.release}\n\n{enc.resolve}{enc.bodyAside|prefix: }`,
      `${LATE_HEAD}{talk.moodOpener|suffix:\n\n}{enc.accept}{enc.bodyAside|prefix: }\n\n{enc.release} {enc.resolve}`,
      `${LATE_HEAD}{talk.moodOpener|suffix:\n\n}{enc.stageHunger}\n\n{enc.accept} {enc.resolve}`,
    ],
  },
  {
    when: { corruption: [2, 3] },
    text: [
      `${LATE_HEAD}{talk.moodOpener|suffix:\n\n}{enc.owned}\n\n{enc.display} {enc.stillHungry}`,
      `${LATE_HEAD}{talk.moodOpener|suffix:\n\n}{enc.owned}{enc.bodyAside|prefix: }\n\n{enc.display} {enc.stillHungry}`,
      `${LATE_HEAD}{talk.moodOpener|suffix:\n\n}{enc.stageHunger}\n\n{enc.owned}\n\n{enc.display} {enc.stillHungry}`,
    ],
  },
];

for (const tier of ENCOURAGE_LATE) {
  registerModuleVariants('talk.encourage', [
    {
      when: { weekMin: 22, ...tier.when },
      weight: 8,
      priority: 7,
      text: tier.text,
    },
    {
      when: { weekMin: 14, ...tier.when },
      weight: 4,
      priority: 4,
      text: tier.text,
    },
  ]);
}
