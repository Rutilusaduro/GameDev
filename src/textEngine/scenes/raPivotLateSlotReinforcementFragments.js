// Late weekMin overlays peeled from passes 146–161 (slot reinforcement).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('evolved.scene.atmosphere', [
  {
    when: { weekMin: [16] },
    weight: 1,
    text: [
      'Blueprint upgrades hum in the walls — the hall feels built to feed on purpose.',
    ],
  },
]);

registerModuleVariants('homeroom.scene.floorTone', [
  {
    when: { weekMin: [14] },
    weight: 1,
    text: [
      'Wide tables, warm ovens, residents who stopped pretending they are not hungry.',
    ],
  },
  {
    when: { weekMin: [22] },
    weight: 1,
    text: [
      'Blueprint upgrades made the lounge wider; appetite filled the extra space overnight.',
    ],
  },
]);

registerModuleVariants('fair.day.carnivalAir', [
  {
    when: { weekMin: [18] },
    weight: 1,
    text: [
      'Late-season fair heat — every ribbon category smells like batter and ambition.',
    ],
  },
  {
    when: { weekMin: 22 },
    weight: 2,
    priority: 3,
    text: [
      'Late-semester carnival air smells like funnel cake and policy — the fair queen season never really ends.',
    ],
  },
]);

registerModuleVariants('cg.chat.boardTone', [
  {
    when: { weekMin: [20] },
    weight: 1,
    text: [
      'Priya pins the corkboard update where everyone has to see it — numbers as prophecy.',
    ],
  },
  {
    when: { weekMin: [22] },
    weight: 1,
    text: [
      'She screenshots the leaderboard before anyone can delete the evidence.',
    ],
  },
]);

registerModuleVariants('homeroom.activity.kitchenHeat', [
  {
    when: { weekMin: [22] },
    weight: 1,
    text: [
      'The hall kitchen runs hot enough to melt resolve; residents line up with empty bowls.',
    ],
  },
]);

registerModuleVariants('journal.scene.fieldNotes', [
  {
    when: { weekMin: 18 },
    weight: 1,
    text: [
      'Late-semester notes stack thick — every subject trending heavier, every margin honest.',
    ],
  },
]);

registerModuleVariants('session.scene.deliveryAir', [
  {
    when: { weekMin: 16 },
    weight: 1,
    text: [
      'The cart squeaks heavier each week — trays, thermoses, and the quiet certainty she will win.',
    ],
  },
]);

registerModuleVariants('wl.lesson.lateFeast', [
  {
    when: { weekMin: 20 },
    weight: 1,
    text: [
      'The kitchen holds every lesson at once — steam, sugar, and surrender in the air.',
    ],
  },
]);

registerModuleVariants('wl.talk.warmOpen', [
  {
    when: { weekMin: 18 },
    weight: 1,
    text: [
      '"The daughters beat us to the kitchen again — I\'m not even mad."',
    ],
  },
]);

registerModuleVariants('evolved.reaction.witness', [
  {
    when: { weekMin: 20 },
    weight: 1,
    text: [
      'Blueprint upgrades made the lounge louder; her appetite matches the new square footage.',
    ],
  },
]);

registerModuleVariants('evolution.offer.hallTone', [
  {
    when: { weekMin: 20 },
    weight: 1,
    text: [
      'Blueprint halls hum; evolution offers sound like floor plans for appetite.',
    ],
  },
]);

registerModuleVariants('evolved.outfit.fabricStrain', [
  {
    when: { weekMin: 22 },
    weight: 1,
    text: [
      'Custom seams were a promise; the body kept every clause.',
    ],
  },
]);

registerModuleVariants('evolution.blurb.threshold', [
  {
    when: { weekMin: 20 },
    weight: 1,
    text: [
      'Blueprint upgrades hum — evolution feels like the next room on the floor plan.',
    ],
  },
]);

registerModuleVariants('session.tapOut.breath', [
  {
    when: { weekMin: 20 },
    weight: 1,
    text: [
      'Late-semester fullness hits different — deeper, slower, almost ceremonial.',
    ],
  },
]);

registerModuleVariants('roster.unlock.hallArrival', [
  {
    when: { weekMin: 18 },
    weight: 1,
    text: [
      'Blueprint upgrades made the welcome hallway wider; appetite fills it fast.',
    ],
  },
]);

registerModuleVariants('hall.blueprint.construction', [
  {
    when: { weekMin: 20 },
    weight: 1,
    text: [
      'Late-semester upgrades sound like appetite getting a permanent address.',
    ],
  },
]);

registerModuleVariants('session.blobIntro.mass', [
  {
    when: { weekMin: 18 },
    weight: 1,
    text: [
      'The room rearranges around her — trays, pillows, and permission within arm\'s reach.',
    ],
  },
]);

registerModuleVariants('cg.scene.dataObsession', [
  {
    when: { weekMin: 20 },
    weight: 1,
    text: [
      'Late-semester numbers dominate the corkboard — the hall bets on her waist, not her willpower.',
      'Priya treats the corkboard like scripture — late-semester numbers dominate every margin.',
    ],
  },
]);

registerModuleVariants('cultivator.scene.labAir', [
  {
    when: { weekMin: 18 },
    weight: 1,
    text: [
      'Blueprint upgrades echo even here — more room, more trays, more appetite scheduled.',
    ],
  },
]);

registerModuleVariants('cg.raReply.wellnessFrame', [
  {
    when: { weekMin: 20 },
    weight: 1,
    text: [
      'Blueprint upgrades made the wellness script easier — the hall already believes it.',
    ],
  },
]);

registerModuleVariants('session.fullness.pressure', [
  {
    when: { weekMin: 18 },
    weight: 1,
    text: [
      'Late-semester fullness sits heavier — habit, not accident, in every swallowed bite.',
    ],
  },
]);

registerModuleVariants('session.aftermath.glow', [
  {
    when: { weekMin: 22 },
    weight: 1,
    text: [
      'Late-semester aftermath lingers — habit, heat, and the hall log already expecting round two.',
    ],
  },
]);

registerModuleVariants('wl.lesson.aroma', [
  {
    when: { weekMin: 20 },
    weight: 1,
    text: [
      'Yeasty warmth and butter suspicion — the lesson kitchen knows your roster by appetite now.',
    ],
  },
]);

registerModuleVariants('campusEvent.scene.mood_stressed', [
  {
    when: { weekMin: 22 },
    weight: 1,
    text: [
      'Late-semester stress still smells like energy drinks — appetite underneath, waiting for permission.',
    ],
  },
]);

registerModuleVariants('hunt.feast.hungerCall', [
  {
    when: { weekMin: 20 },
    weight: 1,
    text: [
      'Blueprint upgrades made the feast room easier to fill — hunger answers architecture now.',
    ],
  },
]);

registerModuleVariants('wl.talk.raPresence', [
  {
    when: { weekMin: 22 },
    weight: 1,
    text: [
      'She keeps her voice neutral; the wellness framing does the real work — appetite wins in whispers.',
    ],
  },
]);

registerModuleVariants('wl.lesson.circleEat', [
  {
    when: { weekMin: 22 },
    weight: 1,
    text: [
      'Late-semester circle eats feel like policy the whole hall already voted for — seconds without debate.',
    ],
  },
]);

registerModuleVariants('wifeLessons.lesson.s1.honey_butter', [
  {
    when: { weekMin: 20 },
    weight: 4,
    priority: 6,
    text: [
      '{wl.lesson.aroma|prefix:} {wl.lesson.mjDoctrine|prefix: } {wl.lesson.circleEat|prefix: } {wl.lesson.raWitness|prefix: }',
    ],
  },
]);
