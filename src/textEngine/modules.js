// ═══════════════════════════════════════════════════════════════
// CORE PHRASE MODULES — sentence-fragment building blocks
// char.desc      — how a character looks & moves (size + corruption)
// sizeCompare    — subject's size relative to ctx.ref
// bodyType.desc  — body shape phrase
// clothing.desc  — clothing + fit (season × stage)
// group.desc     — short descriptor for ctx.group
// ═══════════════════════════════════════════════════════════════
import { registerModule, groupStageBucket } from './engine.js';
import './lexicon.js'; // ensure word.* modules are registered

// ── char.desc — composite of size, movement and corruption ────
// Demonstrates recursion: variants embed {word.*} slots.

registerModule("char.desc", [
  // thin + low corruption
  { when: { stageMax: 1, corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name}'s small frame moves quickly, almost apologetically`,
      (ctx) => `${ctx.subject.name} is {word.size} and light on her feet, glancing back as she goes`,
    ] },
  // thin + corrupted: eager despite the small frame
  { when: { stageMax: 1, corruption: [1, 2] },
    text: [
      (ctx) => `${ctx.subject.name}'s slight frame nearly disappears among the bodies around her, but she moves with hungry certainty`,
    ] },
  // mid sizes
  { when: { stageMin: 2, stageMax: 5 },
    text: [
      (ctx) => `${ctx.subject.name} is {word.size} now, and she {word.movement} with quiet confidence`,
      (ctx) => `${ctx.subject.name} carries her new softness easily as she {word.movement}`,
    ] },
  // big + low corruption: self-conscious mass
  { when: { stageMin: 6, corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name}'s {word.size} form moves carefully, still not quite at peace with its own scale`,
    ] },
  // big + corrupted: owning it
  { when: { stageMin: 6, corruption: [1, 2] },
    text: [
      (ctx) => `${ctx.subject.name}'s {word.size} form {word.movement} with slow, deliberate weight, utterly unbothered`,
      (ctx) => `${ctx.subject.name} leads with her {word.size} body like a banner — she {word.movement} and the space yields`,
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
      thin: "light-stepping, nervous newcomers",
      soft: "softened, curious newcomers",
      plush: "well-fed, unhurried newcomers",
      heavy: "heavy-footed newcomers who announce themselves through the floor",
      massive: "enormous newcomers who file in one at a time because the doorway insists",
      giant: "newcomers vast beyond the room's design",
    }[bucket];
    return `${sizeWord} of ${flavor}`;
  } },
]);
