// The Squad — Lead: A1 Mobile | Support: A5 Editor
// Stage/student depth on growth event fragment pools.
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('ge.surge', [
  { when: { endStageMin: 8, gainLbsMin: 5 }, weight: 3, text: [
    `{grow.sudden} — mass arriving in waves {subject.name} feels through every soft inch.`,
  ]},
  { when: { endStageMin: 5, endStageMax: 7, gainLbsMin: 3 }, weight: 2, text: [
    `{grow.sudden}{join:ge.zoneFocus|prefix: — }; fullness becoming permanence.`,
  ]},
  { when: { deviceId: 'growth_accelerator_chamber' }, weight: 3, text: [
    `Radiation-fed softness blooms outward — {grow.sudden}{join:ge.zoneFocus|prefix: — }.`,
  ]},
  { when: { featureId: 'digest_stageup' }, weight: 3, text: [
    `The week's calories settle at once — quiet surge, undeniable result.`,
  ]},
]);

registerModuleVariants('ge.zoneFocus', [
  { when: { growthZone: 'belly', endStageMin: 6 }, weight: 3, text: [
    `Her middle rounds forward — belly leading, warmth pooling low.`,
  ]},
  { when: { growthZone: 'lower_body', endStageMin: 5 }, weight: 3, text: [
    `Weight pools under her waist — thighs and hips claiming new territory.`,
  ]},
  { when: { studentId: 3 }, weight: 4, text: [
    `Athletic frame softens at the edges — power buried under new curve.`,
  ]},
  { when: { studentId: 10 }, weight: 4, text: [
    `Growth lands like a course served — belly, bust, hips in deliberate proportion.`,
  ]},
]);

registerModuleVariants('ge.reactionBody', [
  { when: { endStageMin: 9 }, weight: 3, text: [
    `stillness while vast softness finishes arriving — breath shallow, palms on new warmth`,
  ]},
  { when: { corruption: [0], endStageMax: 4 }, weight: 2, text: [
    `cheeks pink, hands hovering — alarm and curiosity trading places`,
  ]},
  { when: { corruption: [2] }, weight: 3, text: [
    `open want in her posture — she leans into the gain before it finishes landing`,
  ]},
  { when: { studentId: 8 }, weight: 4, text: [
    `quiet stillness, palms on soft new middle — certainty without performance`,
  ]},
  { when: { studentId: 15 }, weight: 4, text: [
    `predator calm — she feels the surge and approves like weather she summoned`,
  ]},
]);

registerModuleVariants('ge.settle', [
  { when: { endStageMin: 8 }, weight: 3, text: [
    `Heat fades; immense weight stays — patient, permanent, room already adjusting.`,
  ]},
  { when: { endStageMin: 5, corruption: [2] }, weight: 3, text: [
    `The gain settles like appetite answered — warm, wanted, already insufficient.`,
  ]},
  { when: { studentId: 5 }, weight: 4, text: [
    `Destiny exhales. "Patch applied," she says. Her middle disagrees — bigger now.`,
  ]},
  { when: { studentId: 7 }, weight: 4, text: [
    `Priya logs the final reading. Her hands stay on the new softness anyway.`,
  ]},
  { when: { studentId: 14 }, weight: 4, text: [
    `Mary Jane pats her broader hips, sunny. "Well. Harvest came early."`,
  ]},
]);

registerModuleVariants('ge.furnitureEvent', [
  { when: { endStageMin: 9, locale: 'lab' }, weight: 3, text: [
    `Reinforced furniture groans — even lab spec struggles with {subject.name} now`,
  ]},
  { when: { studentId: 5, locale: 'stream_setup', endStageMin: 4 }, weight: 4, text: [
    `Destiny's gaming chair tilts — stream throne surrendering to new center of gravity`,
  ]},
  { when: { studentId: 6, endStageMin: 5 }, weight: 4, text: [
    `Chapter booth creaks under Tiffany — pastel straining, pride undiminished`,
  ]},
  { when: { endStageMin: 6, endStageMax: 8 }, weight: 2, text: [
    `A chair arm cracks — wood protesting the new distribution of her`,
  ]},
]);

registerModuleVariants('ge.spaceEvent', [
  { when: { endStageMin: 10 }, weight: 3, text: [
    `Doorways require strategy now — she turns sideways, still amused`,
  ]},
  { when: { studentId: 17, endStageMin: 6 }, weight: 4, text: [
    `Indiana misjudges a gap that fit last month — laughs, keeps excavating forward`,
  ]},
  { when: { studentId: 8, endStageMin: 7 }, weight: 4, text: [
    `Maya brushes a desk edge she used to clear — notes it, keeps walking`,
  ]},
]);

registerModuleVariants('ge.digestReaction', [
  { when: { studentId: 8 }, weight: 4, text: [
    `Maya exhales, palms on soft new middle. "Okay," she says. One word. Enough.`,
  ]},
  { when: { studentId: 11 }, weight: 4, text: [
    `Kaylee cups the gain gently. "I felt it coming," she murmurs. "Feed me through it."`,
  ]},
  { when: { studentId: 13 }, weight: 4, text: [
    `Daisy hugs the new softness. "More of me to love," she says, beaming.`,
  ]},
]);

registerModuleVariants('ge.environment', [
  { when: { endStageMin: 8, locale: 'lab' }, weight: 3, text: [
    `{ge.furnitureEvent}{join:ge.spaceEvent|prefix: — }; the lab learns her size again.`,
  ]},
  { when: { studentId: 2, locale: 'stream_setup' }, weight: 4, text: [
    `Ring light catches new curve — Kylie's setup creaks, audience potential rising`,
  ]},
]);
