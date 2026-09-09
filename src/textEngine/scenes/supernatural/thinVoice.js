import { registerPool } from '../../engine.js';

// ── supernatural.thin.voice — inner monologue per thin-form archetype ──
// Shape: FULL SENTENCE. supernaturalForm keys the specific hollow skin.

const FORM_VOICES = [
  { supernaturalForm: 'sumo_wraith', texts: ['The ring is empty but my stomach remembers every bout. Hunger moves like a tide I cannot refuse.'] },
  { supernaturalForm: 'hollow_icon', texts: ['The camera loves hollow. My belly does not — it remembers every pound the lens erased.'] },
  { supernaturalForm: 'pep_ghost', texts: ['I cheer without mass. The pep stays; the weight left. Hunger is the only school spirit that followed me.'] },
  { supernaturalForm: 'archivist_skin', texts: ['Every file I catalogued included appetite. The archive kept the hunger when the flesh went thin.'] },
  { supernaturalForm: 'lag_sprite', texts: ['Frame skip. Body lag. Stomach buffering — always loading, never full enough.'] },
  { supernaturalForm: 'silhouette_host', texts: ['I host the room in outline only. They eat; I feel every plate through the hollow.'] },
  { supernaturalForm: 'metric_hollow', texts: ['KPI: hunger at maximum. Mass: deferred. Compliance with appetite: one hundred percent.'] },
  { supernaturalForm: 'curator_wraith', texts: ['The exhibition is my body, absent. Hunger hangs in the gallery like a piece I cannot take down.'] },
  { supernaturalForm: 'hive_mote', texts: ['The hive eats through me. I am thin conduit; their appetite echoes in my empty middle.'] },
  { supernaturalForm: 'salon_wraith', texts: ['The room is elegant and empty. My appetite is neither.'] },
  { supernaturalForm: 'apple_oracle', texts: ['The homeroom asks restraint. I taste every apple they refuse and my hollow stomach answers.'] },
  { supernaturalForm: 'harvest_maiden', texts: ['Fields remember fullness. I wear the season thin but the harvest hunger stayed rooted.'] },
  { supernaturalForm: 'mirror_thin', texts: ['I see the fat girl I was in every reflection. The mirror kept her appetite when it took her mass.'] },
  { supernaturalForm: 'sous_wight', texts: ['The kitchen steam passes through me. I taste everything; I hold nothing.'] },
  { supernaturalForm: 'dose_saint', texts: ['Compound grace made me luminous and empty. Hunger is the one side effect they cannot formulize away.'] },
  { supernaturalForm: 'wire_saint', texts: ['Current flows; calories do not stick. The circuit remembers every watt of appetite I ever carried.'] },
];

for (const entry of FORM_VOICES) {
  registerPool(`supernatural.thin.${entry.supernaturalForm}`, [
    { when: { supernaturalForm: entry.supernaturalForm }, weight: 4, text: entry.texts },
    { when: {}, text: entry.texts },
  ]);
}

registerPool('supernatural.thin.voice', [
  ...FORM_VOICES.map((entry) => ({
    when: { supernaturalForm: entry.supernaturalForm },
    weight: 4,
    text: entry.texts,
  })),
  { when: { supernatural: true }, weight: 2, text: 'I can feel every room I used to fill. The hunger stayed when the weight left.' },
  { when: {}, text: 'Thin skin, loud hunger — the body remembers what it was.' },
]);
