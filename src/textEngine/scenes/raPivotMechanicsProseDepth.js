// RA dorm pivot — supplemental depth on hall, floor, and RA-voice beats.
import { registerPool } from '../engine.js';

registerPool('ra.floor.briefing', [
  { when: {}, text: [
    'The floor map on your clipboard is outdated by Thursday. Bodies move faster than housing updates.',
    'You walk the hall with keys that weigh more each week — not metal, habit.',
    'Residents learn your knock before they learn your name. Both mean the same thing now.',
  ] },
]);

registerPool('hall.lounge.ambient', [
  { when: {}, text: [
    'The lounge holds heat like a held breath — plates, cushions, the slow give of chairs remembering weight.',
    'Someone left the snack station open again. The building treats that as policy now.',
    'Lamplight pools where the blueprint said common room. Appetite follows the light.',
  ] },
]);

registerPool('dorm.unlock.arrival', [
  { when: {}, text: [
    'New wing keys taste like permission. The elevator sighs when the floor gets heavier.',
    'Another hall opens and the building learns a new smell — takeout, perfume, chlorine, ink.',
    'Residents drift between doors they used to fear. Hunger makes neighbors.',
  ] },
]);

registerPool('talk.checkin.warm', [
  { when: { stageMin: 4 }, text: [
    `{subject.name} meets your eyes and does not look away from her own softness. "I'm still me, {ra.name}. Just… more."`,
    `She laughs once, low in her throat. "You keep feeding this floor. I keep becoming proof."`,
  ] },
  { when: { corruptionMin: 2 }, text: [
    `"Say it," she whispers. Not cruel — eager. "Say you like what you're making here."`,
    `Her hand finds her own waist and stays. "{ra.name}. Don't pretend you haven't been planning this."`,
  ] },
  { when: {}, text: [
    `{subject.name} exhales like the chair is part of her now. "Thanks for checking in."`,
  ] },
]);
