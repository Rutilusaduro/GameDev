// ═══════════════════════════════════════════════════════════════
// SCENE: HIVE INTAKE — Lilith brings new bodies to Maya's nest
// The canonical Modular Text showcase. Subject = the victims
// (proxied by the first of the group), ref = Lilith.
// ═══════════════════════════════════════════════════════════════
import { registerModule, createContext, render } from '../engine.js';
import '../modules.js'; // char.desc, sizeCompare, clothing.desc, group.desc

export const HIVE_INTAKE_TEMPLATE =
  "Lilith leads {group.desc} into the Central Nest. {char.desc:ref|cap}. " +
  "{sizeCompare|cap} — {bodyType.desc}, {clothing.desc}. " +
  "{hive.mayaWatches|cap}";

// Maya's reaction shifts with her own size and the room she has built.

registerModule("hive.mayaWatches", [
  { when: { refStage: null }, // no ref context — generic
    text: ["Maya watches from her position, the air thick with warm, hungry resonance."] },
  { when: {},
    text: [
      "Maya watches quietly from her nest, a strange warmth building in her chest.",
      "Maya watches from her position in the center of the room, a deep, warm satisfaction settling in her chest as the new bodies enter her domain.",
      "Maya says nothing. The nest hums around her, and the newcomers feel it in their teeth.",
    ] },
]);

// renderHiveIntake(lilith, victims, week) → finished scene string.
// `victims` is an array of student-like objects ({name, lbs, bodyType, ...});
// a representative is used for body/clothing description.
export function renderHiveIntake(lilith, victims, week) {
  const proxy = victims && victims.length ? victims[0] : null;
  const ctx = createContext({
    subject: proxy,
    ref: lilith,
    group: victims,
    week,
  });
  return render(HIVE_INTAKE_TEMPLATE, ctx);
}
