// ═══════════════════════════════════════════════════════════════
// MODULAR TEXT ENGINE — core resolver
// Templates contain slots like {module}, {module:arg}, {module|cap}.
// Modules are registered variant lists; each variant declares `when`
// selector conditions and the engine picks the most specific match.
// See docs/modular-text-system.md for the full reference.
// ═══════════════════════════════════════════════════════════════
import { getStage } from '../gameData/stages.js';
import { getCorruptionTier } from '../gameData/corruption.js';
import { getTier } from '../gameData/sessions.js';
import { getAddictionLevel, getHungerTier, isInWithdrawal } from '../gameData/hungerAddiction.js';
import {
  getFixationTier, getObsessionTier, getDependenceTier, getShameTier,
} from '../gameData/psychState.js';
import { getEquippedDeviceIds } from '../gameData/deviceEquip.js';

const DEV = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV;
const warn = (...args) => { if (DEV) console.warn('[textEngine]', ...args); };

// ── helpers ───────────────────────────────────────────────────

export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// weightedPick([{item, w}, ...]) — picks an item with probability ∝ w.
export function weightedPick(entries) {
  let total = 0;
  for (const e of entries) total += e.w;
  if (total <= 0) return entries.length ? entries[0].item : undefined;
  let roll = Math.random() * total;
  for (const e of entries) {
    roll -= e.w;
    if (roll <= 0) return e.item;
  }
  return entries[entries.length - 1].item;
}

const SEASONS = ["fall", "winter", "spring", "summer"];
export function getSeason(week) {
  return SEASONS[Math.floor((Math.max(1, week || 1) - 1) / 4) % 4];
}

// Relative size of subject vs a reference character, by lbs ratio.
export function relSize(subject, ref) {
  if (!subject || !ref || !ref.lbs) return null;
  const r = subject.lbs / ref.lbs;
  if (r < 0.6) return "much_smaller";
  if (r < 0.85) return "smaller";
  if (r <= 1.18) return "similar";
  if (r <= 1.67) return "larger";
  return "much_larger";
}

// Canonical weight-stage keys — one per WEIGHT_STAGES id (see stages.js).
// Slight(0) Slim(1) Soft(2) Chubby(3) Plump(4) Heavy(5) Fat(6)
// Very Fat(7) Enormous(8) Colossal(9) Blob(10) Leviathan(11)
export const STAGE_KEYS = [
  "slight", "slim", "soft", "chubby", "plump", "heavy",
  "fat", "veryFat", "enormous", "colossal", "blob", "leviathan",
];

export function stageBucket(stageId) {
  const id = Math.min(Math.max(0, stageId ?? 0), STAGE_KEYS.length - 1);
  return STAGE_KEYS[id];
}

export function groupStageBucket(group) {
  if (!group || !group.length) return "soft";
  const avg = group.reduce((a, s) => a + getStage(s.lbs).id, 0) / group.length;
  return stageBucket(Math.round(avg));
}

// ── context ───────────────────────────────────────────────────

function deriveFor(student, ref, skillEffects) {
  if (!student) return {};
  return {
    stage: getStage(student.lbs).id,
    corruption: getCorruptionTier(student.corruption || 0).id,
    relationship: getTier(student.relationship || 0).id,
    bodyType: student.bodyOverride?.bodyTypeOverride || student.bodyType || null,
    archetype: student.archetype || null,
    mood: student.mood || null,
    evolvedForm: student.evolvedForm || null,
    studentId: student.id ?? null,
    lastCompound: student.lastCompound || null,
    relSize: ref ? relSize(student, ref) : null,
    refStage: ref ? getStage(ref.lbs).id : null,
    fullnessRatio: student.stomachCapacity
      ? (student.fullness || 0) / student.stomachCapacity
      : 0,
    devourCount: student.devourCount || 0,
    hasDevoured: (student.devourCount || 0) > 0,
    addictionLevel: getAddictionLevel(student),
    hungerTier: getHungerTier(student),
    inWithdrawal: isInWithdrawal(student),
    skillEffects: skillEffects || {},
    bodyState: student.bodyOverride?.stateType || null,
    bodyTypeEff: student.bodyOverride?.bodyTypeOverride || student.bodyType || null,
    bodyStageBump: student.bodyOverride?.stageBump ?? 0,
    equippedWaist: student.equip?.waist?.defId || null,
    fixationTier: getFixationTier(student.psych?.fixation ?? 0).id,
    obsessionTier: getObsessionTier(student.psych?.obsession ?? 0).id,
    dependenceTier: getDependenceTier(student.psych?.dependence ?? 0).id,
    shameTier: getShameTier(student.psych?.shame ?? 0).id,
    hasDeviceEquipped: getEquippedDeviceIds(student).length > 0,
  };
}

// createContext(raw) — normalizes inputs and derives the selector
// dimensions once. `subject` is the focal character; `ref` is the
// reference character for relative comparisons (size etc.).
export function createContext(raw = {}) {
  const { subject = null, ref = null, group = null, week = 1, skillEffects = {}, globals = {} } = raw;
  return {
    subject, ref, group,
    week,
    season: raw.season || getSeason(week),
    skillEffects, globals,
    d: deriveFor(subject, ref, skillEffects),
  };
}

// Retarget a context onto another character (used by the :ref / :group args
// so {word.size:ref} describes the reference character instead of subject).
function retarget(ctx, who) {
  if (who === "ref" && ctx.ref) {
    return { ...ctx, subject: ctx.ref, ref: ctx.subject, d: deriveFor(ctx.ref, ctx.subject, ctx.skillEffects) };
  }
  if (who === "group" && ctx.group && ctx.group.length) {
    const proxy = ctx.group[0];
    return { ...ctx, subject: proxy, d: deriveFor(proxy, ctx.ref, ctx.skillEffects) };
  }
  return ctx;
}

// ── module registry ───────────────────────────────────────────

const REGISTRY = new Map();
const MODULE_OPTS = new Map();

// registerModule(key, variants, opts)
// variant: { when:{...}, priority?:int, weight?:number, text: string | fn(ctx) | array of those }
// opts.select: 'best' (default — most specific match wins, ties pool) or
//              'pool' (every matching variant is RNG-eligible, weighted by
//              specificity: w = (variant.weight ?? 1) * poolBase**score).
// opts.poolBase: steepness of the specificity weighting in pool mode (default 3).
export function registerModule(key, variants, opts = {}) {
  if (key === "join") { warn(`"join" is a reserved meta-slot and cannot be a module key`); return; }
  if (REGISTRY.has(key)) warn(`module "${key}" re-registered (overwriting)`);
  REGISTRY.set(key, Array.isArray(variants) ? variants : [variants]);
  MODULE_OPTS.set(key, opts);
}

// registerPool — registerModule in 'pool' selection mode.
// This is the default for all new content (see src/textEngine/AUTHORING.md):
// generic and specific variants stay co-eligible, with specific weighted heavier.
export function registerPool(key, variants, opts = {}) {
  registerModule(key, variants, { select: 'pool', ...opts });
}

/** Prepend higher-priority variants without replacing the base module pool. */
export function registerModuleVariants(key, variants) {
  const extra = Array.isArray(variants) ? variants : [variants];
  const existing = REGISTRY.get(key) || [];
  REGISTRY.set(key, [...extra, ...existing]);
}

export function hasModule(key) { return REGISTRY.has(key); }

// Introspection for the lint harness / DebugPanel only — not for game code.
export function _registryEntries() { return [...REGISTRY.entries()]; }
export function _moduleOpts(key) { return MODULE_OPTS.get(key) || {}; }

// ── selector resolution ───────────────────────────────────────

// Returns {match:boolean, score:number} for one variant's `when` clause.
function evalWhen(when, ctx) {
  if (!when || Object.keys(when).length === 0) return { match: true, score: 0 };
  const d = ctx.d || {};
  let score = 0;
  let rangeCounted = false;

  for (const [k, v] of Object.entries(when)) {
    let ok;
    switch (k) {
      case "stageMin": ok = d.stage != null && d.stage >= v; break;
      case "stageMax": ok = d.stage != null && d.stage <= v; break;
      case "season": ok = Array.isArray(v) ? v.includes(ctx.season) : ctx.season === v; break;
      case "skill": ok = !!(ctx.skillEffects && ctx.skillEffects[v]); break;
      case "weekMin": ok = ctx.week >= v; break;
      case "weekMax": ok = ctx.week <= v; break;
      case "devourMin": ok = (d.devourCount ?? 0) >= v; break;
      case "devourMax": ok = (d.devourCount ?? 0) <= v; break;
      case "fullnessMin": ok = (d.fullnessRatio ?? 0) >= v; break;
      case "fullnessMax": ok = (d.fullnessRatio ?? 0) <= v; break;
      case "hungerTierMin": ok = (d.hungerTier ?? 0) >= v; break;
      case "hungerTierMax": ok = (d.hungerTier ?? 0) <= v; break;
      case "addictionLevelMin": ok = (d.addictionLevel ?? 0) >= v; break;
      case "addictionLevelMax": ok = (d.addictionLevel ?? 0) <= v; break;
      case "fixationTierMin": ok = (d.fixationTier ?? 0) >= v; break;
      case "fixationTierMax": ok = (d.fixationTier ?? 0) <= v; break;
      case "obsessionTierMin": ok = (d.obsessionTier ?? 0) >= v; break;
      case "obsessionTierMax": ok = (d.obsessionTier ?? 0) <= v; break;
      case "dependenceTierMin": ok = (d.dependenceTier ?? 0) >= v; break;
      case "dependenceTierMax": ok = (d.dependenceTier ?? 0) <= v; break;
      case "shameTierMin": ok = (d.shameTier ?? 0) >= v; break;
      case "shameTierMax": ok = (d.shameTier ?? 0) <= v; break;
      case "equippedWaist": ok = d.equippedWaist === v; break;
      case "bodyState": ok = d.bodyState === v; break;
      case "campusFattening": ok = !!ctx.globals?.campusFattening === !!v; break;
      case "campusTierMin": ok = (ctx.globals?.campusTier ?? 0) >= v; break;
      case "campusTierMax": ok = (ctx.globals?.campusTier ?? 0) <= v; break;
      case "weightBand": ok = ctx.globals?.weightBand === v; break;
      case "nodeId": ok = ctx.globals?.nodeId === v; break;
      case "targetType": ok = ctx.globals?.targetType === v; break;
      case "role": ok = ctx.globals?.role === v; break;
      case "deviceId": ok = ctx.globals?.deviceId === v; break;
      case "modeId": ok = ctx.globals?.modeId === v; break;
      case "isMalfunction": ok = !!ctx.globals?.isMalfunction === !!v; break;
      case "malfunctionTier": ok = ctx.globals?.malfunctionTier === v; break;
      case "hasAttachment": ok = ctx.globals?.hasAttachment === v; break;
      case "furnitureComfortLow": ok = !!ctx.globals?.furnitureComfortLow === !!v; break;
      case "equippedHead": ok = d.equippedHead === v || ctx.globals?.equippedHead === v; break;
      case "gainLbsMin": ok = (ctx.globals?.gainLbs ?? 0) >= v; break;
      case "equippedCountMin": ok = (ctx.globals?.equippedCountMin ?? 0) >= v; break;
      case "deviceDependenceTierMin": ok = (ctx.globals?.deviceDependenceTier ?? 0) >= v; break;
      case "deviceDependenceTier": ok = (ctx.globals?.deviceDependenceTier ?? 0) === v; break;
      case "deviceDependenceMin": ok = (ctx.globals?.deviceDependence ?? 0) >= v; break;
      case "growthZone": ok = ctx.globals?.growthZone === v; break;
      case "studentId": {
        const actual = d.studentId ?? ctx.globals?.studentId;
        ok = Array.isArray(v) ? v.includes(actual) : actual === v;
        break;
      }
      case "bigScale": ok = !!ctx.globals?.bigScale === !!v; break;
      default: {
        // dimension on ctx.d, else ctx.globals (network/campus device keys)
        const actual = d[k] ?? ctx.globals?.[k];
        ok = Array.isArray(v) ? v.includes(actual) : actual === v;
      }
    }
    if (!ok) return { match: false, score: 0 };
    if (k === "stageMin" || k === "stageMax" || k === "weekMin" || k === "weekMax") {
      if (!rangeCounted) { score += 1; rangeCounted = true; }
    } else {
      score += 1;
    }
  }
  return { match: true, score };
}

function resolveChosen(variant, ctx) {
  const t = variant.text;
  const chosen = Array.isArray(t) ? pick(t) : t;
  return typeof chosen === "function" ? (chosen(ctx) ?? "") : (chosen ?? "");
}

function selectVariant(key, ctx) {
  const variants = REGISTRY.get(key);
  if (!variants) { warn(`unknown module "${key}"`); return ""; }
  const opts = MODULE_OPTS.get(key) || {};

  if (opts.select === 'pool') {
    // Pool mode: every matching variant is RNG-eligible, weighted toward
    // specificity. Priority is a hard gate here (the escape hatch for
    // deliberately suppressing everything below).
    const matches = [];
    let maxPriority = -Infinity;
    for (const variant of variants) {
      const { match, score } = evalWhen(variant.when, ctx);
      if (!match) continue;
      const priority = variant.priority || 0;
      if (priority > maxPriority) maxPriority = priority;
      matches.push({ variant, score, priority });
    }
    const eligible = matches.filter((m) => m.priority === maxPriority);
    if (!eligible.length) return "";
    const base = opts.poolBase ?? 3;
    const entries = eligible
      .map((m) => ({ item: m.variant, w: (m.variant.weight ?? 1) * Math.pow(base, m.score) }))
      .filter((e) => e.w > 0);
    if (!entries.length) return "";
    return resolveChosen(weightedPick(entries), ctx);
  }

  // 'best' mode (default): most specific match wins; priority breaks score
  // ties; texts of the surviving tied variants pool flat (weighted only if
  // an author sets variant.weight — otherwise identical to a uniform pick).
  let best = [], bestScore = -1, bestPriority = -Infinity;
  for (const variant of variants) {
    const { match, score } = evalWhen(variant.when, ctx);
    if (!match) continue;
    const priority = variant.priority || 0;
    if (score > bestScore || (score === bestScore && priority > bestPriority)) {
      best = [variant]; bestScore = score; bestPriority = priority;
    } else if (score === bestScore && priority === bestPriority) {
      best.push(variant);
    }
  }
  if (!best.length) return "";

  const entries = [];
  for (const variant of best) {
    const w = variant.weight ?? 1;
    if (w <= 0) continue;
    const t = variant.text;
    if (Array.isArray(t)) for (const text of t) entries.push({ item: text, w });
    else entries.push({ item: t, w });
  }
  if (!entries.length) return "";
  const chosen = weightedPick(entries);
  return typeof chosen === "function" ? (chosen(ctx) ?? "") : (chosen ?? "");
}

// ── filters ───────────────────────────────────────────────────

function applyFilters(text, filters) {
  let out = text;
  for (const f of filters) {
    if (f === "cap") out = out ? out.charAt(0).toUpperCase() + out.slice(1) : out;
    else if (f === "lower") out = out.toLowerCase();
    else if (f === "a") out = out ? (/^[aeiou]/i.test(out) ? "an " : "a ") + out : out;
    else if (f.startsWith("prefix:")) out = out ? f.slice(7) + out : out;
    else if (f.startsWith("suffix:")) out = out ? out + f.slice(7) : out;
    else warn(`unknown filter "${f}"`);
  }
  return out;
}

// ── template resolution ───────────────────────────────────────

// {name}, {name:arg}, {name|filter}, {name:arg|filter|filter:x}
const SLOT_RE = /\{([a-zA-Z][\w.]*)(?::([^|}]*))?((?:\|[^}]*)?)\}/g;
const ESCAPE_TOKEN = ""; // private-use char, never in prose

const MAX_DEPTH = 5;

// Per-slot recursive resolution: nested slots inside a module's output
// resolve with the SLOT's context, so {char.desc:ref} keeps describing
// the ref all the way down into its {word.*} slots.
// Resolve one slot: pick the variant, recurse into its slots, and
// (when tracing) record { key, text, leaf, depth }. A "leaf" is a
// fragment whose raw variant text contained no further slots —
// the granularity the Dialogue Lab annotates at.
function resolveSlot(name, slotCtx, depth, trace) {
  const raw = String(selectVariant(name, slotCtx));
  // Leaf = no nested content slots. subject.* identity slots ({subject.lbs}
  // inside a sentence) don't make a fragment composite — the sentence is
  // still the natural annotation unit.
  let leaf = true;
  SLOT_RE.lastIndex = 0;
  let m;
  while ((m = SLOT_RE.exec(raw))) {
    if (!m[1].startsWith("subject.")) { leaf = false; break; }
  }
  const out = resolveText(raw, slotCtx, depth + 1, trace);
  if (trace && out.trim()) trace.push({ key: name, text: out.trim(), leaf, depth });
  return out;
}

function resolveText(text, ctx, depth, trace) {
  if (depth >= MAX_DEPTH) {
    SLOT_RE.lastIndex = 0;
    if (SLOT_RE.test(text)) {
      warn("max recursion depth reached; stripping unresolved slots");
      SLOT_RE.lastIndex = 0;
      text = text.replace(SLOT_RE, "");
    }
    return text;
  }
  SLOT_RE.lastIndex = 0;
  return text.replace(SLOT_RE, (_, name, arg, filterStr) => {
    const filters = filterStr ? filterStr.split("|").filter(Boolean) : [];

    // {join:a,b,c|...} — reserved meta-slot: resolve each listed module,
    // drop empties, and glue the survivors with commas + a final "and".
    // Pair with |prefix:/|suffix: to make the whole clause group optional.
    // (The arg slot carries the key list, so no :ref retargeting inside.)
    if (name === "join") {
      const parts = (arg || "")
        .split(",").map((k) => k.trim()).filter(Boolean)
        .map((k) => resolveSlot(k, ctx, depth, trace).trim())
        .filter(Boolean);
      const out = parts.length <= 1 ? (parts[0] || "")
        : parts.length === 2 ? `${parts[0]} and ${parts[1]}`
        : `${parts.slice(0, -1).join(", ")}, and ${parts[parts.length - 1]}`;
      return applyFilters(out, filters);
    }

    let slotCtx = ctx;
    if (arg === "ref" || arg === "group") slotCtx = retarget(ctx, arg);
    else if (arg) slotCtx = { ...ctx, arg }; // pass-through arg for module fns
    return applyFilters(resolveSlot(name, slotCtx, depth, trace), filters);
  });
}

function smooth(text) {
  return text
    .replace(/ {2,}/g, " ")            // collapse runs of spaces
    .replace(/ ([.,!?;:])/g, "$1")     // space before punctuation
    .replace(/\.{2,}/g, ".")           // ".." artifacts (preserve "…")
    .replace(/(^|[.!?] )([a-z])/g, (_, lead, ch) => lead + ch.toUpperCase())
    .trim();
}

// render(template, ctx, opts) — the single public entry point.
// Never throws: unknown modules emit "" with a dev warning.
// opts.trace: pass an array to collect { key, text, leaf, depth }
// for every slot resolved (dev tooling — see DialogueLab).
export function render(template, ctx, opts = {}) {
  let text = String(template).replace(/\{\{/g, ESCAPE_TOKEN);
  text = resolveText(text, ctx, 0, opts.trace || null);
  text = text.replace(new RegExp(ESCAPE_TOKEN, "g"), "{");
  return opts.noSmooth ? text : smooth(text);
}
