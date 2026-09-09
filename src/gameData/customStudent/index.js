import { buildCustomOutfit } from '../outfits.js';

export const CUSTOM_STUDENT_ID = 18;

export const CUSTOM_BODY_OPTIONS = [
  { id: 'straight', label: 'Straight', desc: 'Even gain, technical silhouette.' },
  { id: 'pear', label: 'Pear', desc: 'Hips and thighs lead first.' },
  { id: 'apple', label: 'Apple', desc: 'Belly-forward, quick waistband pressure.' },
  { id: 'hourglass', label: 'Hourglass', desc: 'Balanced curves above and below.' },
  { id: 'athletic', label: 'Athletic', desc: 'Trained frame softening into mass.' },
];

export const CUSTOM_WEIGHT_PRESETS = [
  { id: 'slight', label: 'Slight', lbs: 112, desc: 'Longest runway; early changes stay intimate.' },
  { id: 'slim', label: 'Slim', lbs: 125, desc: 'Balanced start, closest to the current chair.' },
  { id: 'soft', label: 'Soft', lbs: 145, desc: 'Already softened; wardrobe pressure arrives early.' },
];

export const CUSTOM_STANCE_PRESETS = {
  opposed: {
    label: 'Opposed',
    desc: 'High shame, active resistance, excuses under pressure.',
    psych: { fixation: 15, obsession: 10, dependence: 15, shame: 55 },
  },
  reluctant: {
    label: 'Reluctant',
    desc: 'Mixed signals; body ahead of words.',
    psych: { fixation: 25, obsession: 15, dependence: 20, shame: 30 },
  },
  secret: {
    label: 'Secret',
    desc: 'Low shame, high fixation, private appetite.',
    psych: { fixation: 55, obsession: 25, dependence: 20, shame: 10 },
  },
  neutral: {
    label: 'Neutral',
    desc: 'Unfussed engineer; data first, comedy second.',
    psych: { fixation: 15, obsession: 10, dependence: 10, shame: 10 },
  },
};

export const CUSTOM_PSYCH_AXES = [
  { id: 'fixation', label: 'Fixation' },
  { id: 'obsession', label: 'Obsession' },
  { id: 'dependence', label: 'Dependence' },
  { id: 'shame', label: 'Shame' },
];

export const CUSTOM_VOICE_PRESETS = {
  clinical: {
    label: 'Clinical',
    owned: ['margin of error', 'dataset', 'calibrated', 'throughput', 'logged'],
    taboo: 'romance',
    desc: 'Precise, measured, still pretending this is research.',
  },
  obsessed: {
    label: 'Obsessed',
    owned: ['prototype', 'optimization', 'parallel experiment', 'slope', 'noise in the data'],
    taboo: 'being watched eating',
    desc: 'Everything is a build, and the build is her.',
  },
  warm_corrupted: {
    label: 'Warm-Corrupted',
    owned: ['necessary intake', 'field test', 'acceptable variance', 'the math is perfect', "I don't care anymore"],
    taboo: 'admitting pleasure too early',
    desc: 'Still technical, but warmer and more openly hungry.',
  },
};

export const CUSTOM_GARMENT_OPTIONS = {
  top: [
    { id: 'lab_coat', name: 'lab coat' },
    { id: 'zip_hoodie', name: 'zip hoodie' },
    { id: 'compression_top', name: 'compression top' },
  ],
  bottom: [
    { id: 'cargo_pants', name: 'cargo pants' },
    { id: 'work_jeans', name: 'work jeans' },
    { id: 'lab_skirt', name: 'lab skirt' },
  ],
  waist: [
    { id: 'tool_belt', name: 'tool belt' },
    { id: 'elastic_waistband', name: 'elastic waistband' },
    { id: 'prototype_belt', name: 'prototype belt' },
  ],
};

export function defaultCustomDraft() {
  return {
    name: 'Talia',
    pronouns: 'she',
    archetype: 'inventor',
    bodyType: 'straight',
    weightPreset: 'slim',
    gainStance: 'reluctant',
    psychBuys: {},
    voicePreset: 'clinical',
    wardrobe: {
      top: 'lab_coat',
      bottom: 'cargo_pants',
      waist: 'tool_belt',
      fit: 'fitted',
    },
  };
}

export function psychFromDraft(draft = {}) {
  const stance = CUSTOM_STANCE_PRESETS[draft.gainStance] || CUSTOM_STANCE_PRESETS.reluctant;
  const psych = { ...stance.psych };
  for (const axis of CUSTOM_PSYCH_AXES) {
    const buys = Math.max(0, Math.min(2, draft.psychBuys?.[axis.id] || 0));
    psych[axis.id] = Math.min(100, psych[axis.id] + buys * 25);
  }
  return psych;
}

export function customDraftPointSpend(draft = {}) {
  return CUSTOM_PSYCH_AXES.reduce((sum, axis) => sum + Math.max(0, draft.psychBuys?.[axis.id] || 0), 0);
}

export function createCustomStudent(draft = {}, baseStudent = {}) {
  const weight = CUSTOM_WEIGHT_PRESETS.find((preset) => preset.id === draft.weightPreset) || CUSTOM_WEIGHT_PRESETS[1];
  const voice = CUSTOM_VOICE_PRESETS[draft.voicePreset] || CUSTOM_VOICE_PRESETS.clinical;
  const garments = Object.fromEntries(
    ['top', 'bottom', 'waist'].map((slot) => [
      slot,
      CUSTOM_GARMENT_OPTIONS[slot].find((g) => g.id === draft.wardrobe?.[slot]) || CUSTOM_GARMENT_OPTIONS[slot][0],
    ]),
  );
  const outfit = buildCustomOutfit({
    garments,
    startLbs: weight.lbs,
    fit: draft.wardrobe?.fit || 'fitted',
  });

  return {
    ...baseStudent,
    id: CUSTOM_STUDENT_ID,
    custom: true,
    name: (draft.name || 'Talia').trim().slice(0, 32) || 'Talia',
    pronouns: draft.pronouns || 'she',
    archetype: 'inventor',
    role: 'Engineering Major',
    age: 21,
    bodyType: draft.bodyType || 'straight',
    lbs: weight.lbs,
    startLbs: weight.lbs,
    desc: 'Built on your hall: hoodie under a lab coat, eyes that measure everything, appetite treated like a system under test.',
    favFood: 'meal replacement paste',
    hobby: 'prototyping',
    personality: 'clinical',
    relationship: Math.max(20, baseStudent.relationship || 20),
    mood: 'focused',
    gainStance: draft.gainStance || 'reluctant',
    psych: psychFromDraft(draft),
    voiceKit: {
      preset: draft.voicePreset || 'clinical',
      owned: [...voice.owned],
      taboo: voice.taboo,
    },
    customDraft: draft,
    triggeredEvents: [],
    outfit,
    wardrobe: outfit,
    ascension: null,
    ascensionPending: null,
    weekStartLbs: weight.lbs,
    hidden: false,
  };
}
