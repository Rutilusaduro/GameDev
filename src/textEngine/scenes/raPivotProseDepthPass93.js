// Homeroom conferences, evolved arcs, hall blueprint (Pass 93).
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';


registerModuleVariants('homeroom.conference.Bri.intro', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Bri arrives efficient and already eating — conference is a snack break with grades attached.',
    ],
  },
]);

registerModuleVariants('homeroom.conference.Sofia.intro', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Sofia sits precise, eyes on the container — art critique and appetite share the same notebook.',
    ],
  },
]);

registerModuleVariants('homeroom.conference.Mrs_Reyes.intro', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Mrs. Reyes exhales like she carried the week in — Daisy slides warm food before questions land.',
    ],
  },
]);

registerModuleVariants('evolved.event.wife_lessons.s1.p0', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Patrice brought store cookies as backup — MJ’s kitchen makes them obsolete before the oven dings.',
    ],
  },
]);

registerModuleVariants('evolved.event.homeroom_queen.s1.p1', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Kayla takes first helpings without waiting — habit learned faster than policy updates.',
    ],
  },
]);

registerModuleVariants('evolved.activity.homeroom_queen', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Tuesday steam fills the lounge — Daisy measures success in empty platters.',
    ],
  },
]);

registerModuleVariants('evolved.activity.competitive_gainer', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Corkboard rivalry hums under dorm quiet — every ping is another dare to grow louder.',
    ],
  },
]);

registerModuleVariants('fair.day.judging', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Judges squint through grease-glow — MJ’s smile says the kitchen trained for this spotlight.',
    ],
  },
]);

registerModuleVariants('hall.blueprint.purchase', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Blueprint line fills in — the floor exhales like a body getting room to spread.',
    ],
  },
]);

registerModuleVariants('cg.raReply.challenge', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'You type the dare — Priya’s drive meter spikes before she finishes reading.',
    ],
  },
]);

registerModuleVariants('wifeLessons.lesson.s7.overnight_feast', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Night stretches past fullness — laughter and groans trade places until nobody wants to leave.',
    ],
  },
]);
