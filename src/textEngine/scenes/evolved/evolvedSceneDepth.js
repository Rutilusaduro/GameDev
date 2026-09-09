// The Squad — Lead: A4 Architect | Support: A2 Psych, A5 Editor
// Per-student evolved event V2 depth. Loads after v2/v2ProseExpansion.js.
import { registerModuleVariants } from '../../engine.js';

const W = 4;

const EVOLVED_BY_STUDENT = {
  0: `Brittany's evolved path centralizes squad hunger — appetite as leadership, growth as policy, mass as morale.`,
  1: `Cassidy's evolved arc turns training into appetite — citations replaced by certainty, data by warmth.`,
  2: `Kylie's evolution makes spectacle honest — camera hunger and subscriber hunger finally the same thing.`,
  3: `Serena's evolved form trades miles for mass — athlete discipline repurposed for appetite without flinching.`,
  4: `Fiona's evolution merges artist and subject — the gallery documents appetite she now embodies.`,
  5: `Destiny's evolved build re-speccs for intake — streamer detachment replaced by boss-fight fullness.`,
  6: `Tiffany's evolution makes hospitality architectural — chapter abundance normalized at any scale.`,
  7: `Priya's evolved path turns the corkboard into scripture — every pound panel-reviewed, every gain optimized.`,
  8: `Maya's evolution deepens stillness — appetite honest, presence vast, trust without commentary.`,
  9: `Chloé's salon evolution seasons appetite with scandal — Parisian amusement, American excess, zero apology.`,
  10: `Reneé's cultivator evolution makes harvest personal — kitchen and subject and chef merged in warmth.`,
  11: `Kaylee's evolved arc blooms caregiver hunger — feeding others became feeding herself, shame retired.`,
  12: `Nadia's evolution files appetite as ongoing research — subject and observer same person, case open.`,
  13: `Daisy's hall kitchen evolution crowns abundance — mentor, caterer, and appetite made policy.`,
  14: `Mary Jane's homestead evolution roots growth in harvest identity — heavy crop, healthy land, good belly.`,
  15: `Lilith's predator evolution shifts gravity — hunt replaced by orbit, appetite as architecture.`,
  16: `Sophia's pharmacist evolution saturates campus — wellness rhetoric surrendering to compound hunger.`,
  17: `Indiana's evolution maps appetite like ruins — identity excavated, mass the defining find.`,
  18: `Talia's machine_goddess evolution meshes flesh and firmware — inventor inside invention, appetite the spec.`,
};

for (const [id, line] of Object.entries(EVOLVED_BY_STUDENT)) {
  const sid = Number(id);
  const when = sid === 18 ? { studentId: sid, custom: false, stageMin: 5 } : { studentId: sid, stageMin: 5 };
  registerModuleVariants('evolved.v2.depth', [
    { when, weight: W, text: [line] },
    { when: { ...when, stageMin: 9 }, weight: W, text: [
      `${line.split("'s")[0]}'s evolved path at immobile depth — form as environment, appetite as geography.`,
    ]},
  ]);
}

registerModuleVariants('evolved.v2.depth', [
  { when: { stageMin: 11, isImmobile: true }, weight: 3, text: [
    `Evolved and immobile — vocation made stationary, appetite supplied, identity absolute.`,
    `The form she chose fills the room now. Evolution complete. Hunger continues without travel.`,
  ]},
]);
