// ═══════════════════════════════════════════════════════════════
// CORE PHRASE MODULES — sentence-fragment building blocks
// subject.name   — the subject's full name (subject.first / subject.lbs too)
// char.desc      — how a character looks & moves (size + corruption)
// sizeCompare    — subject's size relative to ctx.ref
// bodyType.desc  — body shape phrase
// clothing.desc  — clothing + fit (season × stage)
// group.desc     — short descriptor for ctx.group
// ═══════════════════════════════════════════════════════════════
import { registerModule, groupStageBucket } from './engine.js';
import './lexicon.js'; // ensure word.* modules are registered

// ── subject.* — identity helpers usable in any template ───────

registerModule('subject.name', [
  { when: {}, text: [(ctx) => ctx.subject?.name || 'Someone'] },
]);

registerModule('subject.first', [
  { when: {}, text: [(ctx) => (ctx.subject?.name || 'Someone').split(' ')[0]] },
]);

registerModule('subject.lbs', [
  { when: {}, text: [(ctx) => String(Math.round(ctx.subject?.lbs || 0))] },
]);

// ── char.desc — composite of size, movement and corruption ────
// Demonstrates recursion: variants embed {word.*} slots.

registerModule("char.desc", [
  // Slight/Slim + low corruption
  { when: { stageMax: 1, corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name}'s small frame moves quickly, almost apologetically`,
      (ctx) => `${ctx.subject.name} is {word.size} and light on her feet, glancing back as she goes`,
      (ctx) => `${ctx.subject.name} {word.movement}, slight and unhurried`,
    ] },
  // Slight/Slim + corrupted: eager despite the small frame
  { when: { stageMax: 1, corruption: [1, 2] },
    text: [
      (ctx) => `${ctx.subject.name}'s slight frame nearly disappears among the bodies around her, but she moves with hungry certainty`,
      (ctx) => `${ctx.subject.name} is {word.size} but eager — she {word.movement} like she has somewhere to grow into`,
    ] },
  // Soft through Heavy
  { when: { stageMin: 2, stageMax: 5 },
    text: [
      (ctx) => `${ctx.subject.name} is {word.size} now, and she {word.movement} with quiet confidence`,
      (ctx) => `${ctx.subject.name} carries her new softness easily as she {word.movement}`,
      (ctx) => `${ctx.subject.name}'s {word.size} body {word.movement} — the gain is visible and she knows it`,
    ] },
  // Fat+ + low corruption: self-conscious mass
  { when: { stageMin: 6, corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name}'s {word.size} form moves carefully, still not quite at peace with its own scale`,
      (ctx) => `${ctx.subject.name} {word.movement}, {word.size} and self-conscious in the doorway`,
    ] },
  // Fat+ + corrupted: owning it
  { when: { stageMin: 6, corruption: [1, 2] },
    text: [
      (ctx) => `${ctx.subject.name}'s {word.size} form {word.movement} with slow, deliberate weight, utterly unbothered`,
      (ctx) => `${ctx.subject.name} leads with her {word.size} body like a banner — she {word.movement} and the space yields`,
      (ctx) => `${ctx.subject.name} {word.movement}, {word.size} and entirely at home in her own mass`,
    ] },
  // wildcard fallback
  { when: {},
    text: [(ctx) => `${ctx.subject.name} {word.movement}, {word.size} and unhurried`] },
]);

// ── sizeCompare — subject relative to ctx.ref ─────────────────

registerModule("sizeCompare", [
  { when: { relSize: ["much_smaller"] },
    text: [
      (ctx) => `each is far smaller than ${ctx.ref.name}, slight figures in her shadow`,
      (ctx) => `next to ${ctx.ref.name} they look almost miniature`,
    ] },
  { when: { relSize: ["smaller"] },
    text: [
      (ctx) => `each is noticeably smaller than ${ctx.ref.name}`,
      (ctx) => `they come up visibly short of ${ctx.ref.name}'s scale`,
    ] },
  { when: { relSize: ["similar"] },
    text: [
      (ctx) => `each is roughly ${ctx.ref.name}'s size`,
      (ctx) => `they match ${ctx.ref.name} pound for pound, more or less`,
    ] },
  { when: { relSize: ["larger"] },
    text: [
      (ctx) => `each is clearly larger than ${ctx.ref.name}`,
      (ctx) => `${ctx.ref.name} is the smallest body in the group by a comfortable margin`,
    ] },
  { when: { relSize: ["much_larger"] },
    text: [
      (ctx) => `each is much larger than ${ctx.ref.name} — her frame nearly disappears between the heavy bodies she's guiding`,
      (ctx) => `they tower and spread around ${ctx.ref.name}, every one of them already {word.size} beyond her`,
    ] },
  { when: {}, text: [(ctx) => `they vary in size around ${ctx.ref ? ctx.ref.name : "their guide"}`] },
]);

// ── bodyType.desc / clothing.desc — thin wrappers over lexicon ─

registerModule("bodyType.desc", [
  { when: {}, text: ["{word.body}"] },
]);

registerModule("clothing.desc", [
  { when: {}, text: ["{word.clothingFit}"] },
]);

// ── group.desc — quick read on a group of characters ──────────

registerModule("group.desc", [
  { when: {}, text: (ctx) => {
    const n = ctx.group ? ctx.group.length : 0;
    const sizeWord = n <= 2 ? "a small group" : n <= 4 ? "a handful" : "a long line";
    const bucket = groupStageBucket(ctx.group);
    const flavor = {
      slight: "light-stepping, nervous newcomers",
      slim: "slender newcomers still moving easily",
      soft: "softened, curious newcomers",
      chubby: "rounded newcomers, clothes a little tighter",
      plump: "well-fed, unhurried newcomers",
      heavy: "heavy-footed newcomers who announce themselves through the floor",
      fat: "broad newcomers who test the doorway",
      veryFat: "vast newcomers filing in with care",
      enormous: "enormous newcomers who need the wide path",
      colossal: "overwhelming newcomers who file in one at a time because the doorway insists",
      blob: "newcomers vast beyond the room's design",
      leviathan: "newcomers so impossibly vast the room reorganizes before they arrive",
    }[bucket] || "newcomers of uncertain scale";
    return `${sizeWord} of ${flavor}`;
  } },
]);
