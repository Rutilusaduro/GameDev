// ═══════════════════════════════════════════════════════════════
// CORE LEXICON — word-level descriptor dictionaries
// Registered as built-in `word.*` modules at import time.
// All accept `:ref` to retarget onto the reference character,
// e.g. {word.size:ref} describes ctx.ref instead of ctx.subject.
//
// Stage buckets: thin(0-1) soft(2-3) plush(4-5) heavy(6-7)
//                massive(8-9) giant(10)
// ═══════════════════════════════════════════════════════════════
import { registerModule, stageBucket, pick } from './engine.js';

// ── size adjectives — the canonical thin→giant ladder ─────────

export const SIZE_WORDS = {
  thin:    ["thin", "slight", "slim", "narrow"],
  soft:    ["soft", "softened", "rounded", "filled-out"],
  plush:   ["plush", "thick", "heavyset", "well-padded"],
  heavy:   ["heavy", "fat", "broad", "ponderous"],
  massive: ["massive", "enormous", "immense", "mountainous"],
  giant:   ["giant", "colossal", "room-filling", "impossibly vast"],
};

// ── body phrases — bodyType × stage bucket ────────────────────
// Keep a `default` row so unknown body types never break.

export const BODY_WORDS = {
  pear: {
    thin:    ["narrow waist over slim hips"],
    soft:    ["hips just starting to widen", "a soft lower curve settling in"],
    plush:   ["heavy hips and thickening thighs", "a pear-soft spread below the waist"],
    heavy:   ["broad, heavy hips that lead the way", "thighs that crowd each other with every step"],
    massive: ["hips wider than a doorway", "an avalanche of hip and thigh"],
    giant:   ["a lower body that has become geography"],
  },
  apple: {
    thin:    ["a trim, straight middle"],
    soft:    ["a gentle rounding at the belly", "a waistline going quietly soft"],
    plush:   ["a round, forward belly", "an apple-full middle straining her waistband"],
    heavy:   ["a deep, heavy belly that arrives first", "a gut that rests on her lap when she sits"],
    massive: ["a belly like a rising tide", "a stomach that needs its own accommodations"],
    giant:   ["a belly that is most of the room"],
  },
  hourglass: {
    thin:    ["a balanced, light figure"],
    soft:    ["curves deepening evenly, top and bottom", "an hourglass starting to pour fuller"],
    plush:   ["dramatic curves grown heavy", "a figure that swells generously in both directions"],
    heavy:   ["an hourglass scaled up far past its mold", "deep, rolling curves above and below"],
    massive: ["curves stacked on curves, all of them enormous"],
    giant:   ["an hourglass shape remembered only in outline"],
  },
  athletic: {
    thin:    ["a tight, trained frame"],
    soft:    ["muscle going quietly soft underneath", "a once-hard frame picking up padding"],
    plush:   ["power buried under comfortable thickness", "a strong build wrapped in new weight"],
    heavy:   ["a big, heavy body that still moves like it trained once", "bulk layered over old muscle"],
    massive: ["sheer mass where the athlete used to be"],
    giant:   ["strength entombed in immensity"],
  },
  straight: {
    thin:    ["a narrow, straight frame"],
    soft:    ["a straight figure softening at the edges"],
    plush:   ["even thickness settling everywhere at once"],
    heavy:   ["a heavy, columnar body, weight carried all over"],
    massive: ["uniform enormity from shoulder to knee"],
    giant:   ["a single continuous expanse of body"],
  },
  default: {
    thin:    ["a slim figure"],
    soft:    ["a figure going gently soft"],
    plush:   ["a thick, well-fed figure"],
    heavy:   ["a heavy, abundant body"],
    massive: ["a body of staggering size"],
    giant:   ["a body beyond ordinary scale"],
  },
};

// ── movement verbs by stage bucket ────────────────────────────

export const MOVEMENT_WORDS = {
  thin:    ["strides", "moves lightly", "slips along"],
  soft:    ["walks with a new sway", "moves with a soft bounce"],
  plush:   ["sways", "moves with deliberate, rolling steps"],
  heavy:   ["waddles", "moves with slow, weighty purpose", "rocks side to side as she goes"],
  massive: ["lumbers", "advances like weather", "moves one ponderous step at a time"],
  giant:   ["barely moves", "shifts like a slow tide", "settles rather than walks"],
};

// ── clothing fit — season × stage bucket ──────────────────────

export const CLOTHING_FIT = {
  fall: {
    thin:    ["a light jacket hanging loose on her frame"],
    soft:    ["a cardigan that sits a little closer than last month"],
    plush:   ["a sweater filled out completely, stretched soft at the seams"],
    heavy:   ["layers that have given up disguising anything"],
    massive: ["a custom wrap of fabric more tarp than outfit"],
    giant:   ["draped cloth that covers what clothing no longer can"],
  },
  winter: {
    thin:    ["a winter coat swallowing her whole", "thick layers hanging loosely off narrow shoulders"],
    soft:    ["a coat that finally fits the way it was cut to"],
    plush:   ["a winter coat that won't zip past her middle", "thick layers stretched tight across softened curves"],
    heavy:   ["a parka worn open because closed stopped being an option", "winter layers strained to a standstill"],
    massive: ["two coats worn like one, neither closing"],
    giant:   ["blankets, because no coat was ever made for this"],
  },
  spring: {
    thin:    ["light spring clothes fluttering on a slight frame"],
    soft:    ["a spring dress that clings where it used to fall straight"],
    plush:   ["a sundress working hard across new width"],
    heavy:   ["spring fabric pulled drum-tight, gaps blooming between buttons"],
    massive: ["a dress remade twice and outgrown twice"],
    giant:   ["fabric panels joined by hope"],
  },
  summer: {
    thin:    ["summer clothes hanging loosely on her narrow frame"],
    soft:    ["a tank top that's begun to fit very honestly"],
    plush:   ["light summer clothes stretched tight across softening curves"],
    heavy:   ["a summer outfit at war with itself, skin winning at every hem"],
    massive: ["summer clothes in name only — straps, panels, and surrender"],
    giant:   ["the concept of an outfit, applied loosely"],
  },
};

// ── fullness phrases by fullness/capacity ratio ───────────────

export const FULLNESS_WORDS = [
  { max: 0.25, words: ["barely touched", "comfortably empty", "light"] },
  { max: 0.60, words: ["pleasantly full", "satisfied", "warm and fed"] },
  { max: 0.90, words: ["very full", "heavily laden", "packed tight"] },
  { max: 1.10, words: ["stuffed to her limit", "achingly full", "stretched taut"] },
  { max: Infinity, words: ["overfilled past anything reasonable", "swollen drum-tight", "beyond capacity and still holding"] },
];

// ── registration ──────────────────────────────────────────────

function byBucket(dict) {
  return (ctx) => {
    const bucket = stageBucket(ctx.d.stage ?? 0);
    return pick(dict[bucket] || dict.soft);
  };
}

registerModule("word.size", [{ when: {}, text: byBucket(SIZE_WORDS) }]);

registerModule("word.movement", [{ when: {}, text: byBucket(MOVEMENT_WORDS) }]);

registerModule("word.body", [{
  when: {},
  text: (ctx) => {
    const rows = BODY_WORDS[ctx.d.bodyType] || BODY_WORDS.default;
    const bucket = stageBucket(ctx.d.stage ?? 0);
    return pick(rows[bucket] || BODY_WORDS.default[bucket]);
  },
}]);

registerModule("word.clothingFit", [{
  when: {},
  text: (ctx) => {
    const seasonRows = CLOTHING_FIT[ctx.season] || CLOTHING_FIT.fall;
    const bucket = stageBucket(ctx.d.stage ?? 0);
    return pick(seasonRows[bucket] || seasonRows.soft);
  },
}]);

registerModule("word.fullness", [{
  when: {},
  text: (ctx) => {
    const ratio = ctx.d.fullnessRatio ?? 0;
    const row = FULLNESS_WORDS.find((r) => ratio <= r.max) || FULLNESS_WORDS[0];
    return pick(row.words);
  },
}]);
