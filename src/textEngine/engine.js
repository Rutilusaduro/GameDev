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

const DEV = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV;
const warn = (...args) => { if (DEV) console.warn('[textEngine]', ...args); };

// ── helpers ───────────────────────────────────────────────────

export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Weighted random choice. entries: [{ item, weight }] */
export function weightedPick(entries) {
  if (!entries.length) return undefined;
  const total = entries.reduce((s, e) => s + (e.weight ?? 1), 0);
  if (total <= 0) return entries[0].item;
  let r = Math.random() * total;
  for (const e of entries) {
    r -= e.weight ?? 1;
    if (r <= 0) return e.item;
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
    bodyType: student.bodyType || null,
    archetype: student.archetype || null,
    mood: student.mood || null,
    evolvedForm: student.evolvedForm || null,
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
    studentId: student.id ?? null,
    lastCompound: student.lastCompound || null,
    skillEffects: skillEffects || {},
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

// registerModule(key, variants, opts?)
// variant: { when:{...}, priority?:int, weight?:number, text: string | fn(ctx) | array of those }
// opts.select: 'best' | 'pool' (default 'best'); opts.poolBase: number (default 3)
export function registerModule(key, variants, opts = {}) {
  if (key === "join") warn('module key "join" is reserved for {join:...} meta-slots');
  if (REGISTRY.has(key)) warn(`module "${key}" re-registered (overwriting)`);
  REGISTRY.set(key, Array.isArray(variants) ? variants : [variants]);
  if (opts && Object.keys(opts).length) {
    MODULE_OPTS.set(key, { select: opts.select || "best", poolBase: opts.poolBase ?? 3 });
  }
}

/** Pool-mode registration — weighted variant pick, then uniform text pick within variant. */
export function registerPool(key, variants, opts = {}) {
  registerModule(key, variants, { ...opts, select: "pool" });
}

/** Prepend higher-priority variants without replacing the base module pool. */
export function registerModuleVariants(key, variants) {
  const extra = Array.isArray(variants) ? variants : [variants];
  const existing = REGISTRY.get(key) || [];
  REGISTRY.set(key, [...extra, ...existing]);
}

export function hasModule(key) { return REGISTRY.has(key); }

/** @internal — lint harness / DebugPanel */
export function _registryEntries() {
  return [...REGISTRY.entries()].map(([key, variants]) => ({ key, variants, opts: MODULE_OPTS.get(key) }));
}

/** @internal */
export function _moduleOpts(key) { return MODULE_OPTS.get(key) || { select: "best", poolBase: 3 }; }

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
      case "campusFattening": ok = !!ctx.globals?.campusFattening === !!v; break;
      case "campusTierMin": ok = (ctx.globals?.campusTier ?? 0) >= v; break;
      case "campusTierMax": ok = (ctx.globals?.campusTier ?? 0) <= v; break;
      case "weightBand": ok = ctx.globals?.weightBand === v; break;
      case "nodeId": ok = ctx.globals?.nodeId === v; break;
      case "studentId": {
        const actual = d.studentId ?? ctx.globals?.studentId;
        ok = Array.isArray(v) ? v.includes(actual) : actual === v;
        break;
      }
      case "bigScale": ok = !!ctx.globals?.bigScale === !!v; break;
      default: {
        // dimension on ctx.d: corruption, stage, relationship, relSize,
        // bodyType, archetype, mood, evolvedForm, refStage...
        const actual = d[k];
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

function resolveTextEntry(entry, ctx) {
  return typeof entry === "function" ? (entry(ctx) ?? "") : (entry ?? "");
}

function selectVariant(key, ctx) {
  const variants = REGISTRY.get(key);
  if (!variants) { warn(`unknown module "${key}"`); return ""; }

  const matches = [];
  for (const variant of variants) {
    const { match, score } = evalWhen(variant.when, ctx);
    if (match) matches.push({ variant, score });
  }
  if (!matches.length) return "";

  // Priority is a hard gate — keep only variants at max priority.
  const maxPriority = Math.max(...matches.map((m) => m.variant.priority || 0));
  const gated = matches.filter((m) => (m.variant.priority || 0) === maxPriority);

  const opts = MODULE_OPTS.get(key) || { select: "best", poolBase: 3 };

  if (opts.select === "pool") {
    const variantEntries = gated.map(({ variant, score }) => ({
      item: variant,
      weight: (variant.weight ?? 1) * Math.pow(opts.poolBase, score),
    }));
    const chosenVariant = weightedPick(variantEntries);
    const texts = Array.isArray(chosenVariant.text) ? chosenVariant.text : [chosenVariant.text];
    const chosen = pick(texts);
    return resolveTextEntry(chosen, ctx);
  }

  // 'best' — max-score variants among priority-gated set, legacy behavior.
  const maxScore = Math.max(...gated.map((m) => m.score));
  const best = gated.filter((m) => m.score === maxScore).map((m) => m.variant);

  const pool = [];
  for (const variant of best) {
    const w = variant.weight ?? 1;
    const t = variant.text;
    const texts = Array.isArray(t) ? t : [t];
    for (const entry of texts) {
      if (w <= 0) continue;
      for (let i = 0; i < w; i++) pool.push(entry);
    }
  }
  if (!pool.length) return "";
  const chosen = pick(pool);
  return resolveTextEntry(chosen, ctx);
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
function resolveText(text, ctx, depth) {
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

    // {join:key1,key2,...|prefix:, } — comma/"and" clause joiner (no :ref inside join keys).
    if (name === "join" && arg) {
      const keys = arg.split(",").map((k) => k.trim()).filter(Boolean);
      const parts = [];
      for (const key of keys) {
        const resolved = resolveText(`{${key}}`, ctx, depth + 1);
        if (resolved && resolved.trim()) parts.push(resolved.trim());
      }
      let out = "";
      if (parts.length === 1) out = parts[0];
      else if (parts.length === 2) out = `${parts[0]} and ${parts[1]}`;
      else if (parts.length > 2) out = `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
      return applyFilters(out, filters);
    }

    let slotCtx = ctx;
    if (arg === "ref" || arg === "group") slotCtx = retarget(ctx, arg);
    else if (arg) slotCtx = { ...ctx, arg }; // pass-through arg for module fns
    let out = selectVariant(name, slotCtx);
    out = resolveText(String(out), slotCtx, depth + 1);
    return applyFilters(out, filters);
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
export function render(template, ctx, opts = {}) {
  let text = String(template).replace(/\{\{/g, ESCAPE_TOKEN);
  text = resolveText(text, ctx, 0);
  text = text.replace(new RegExp(ESCAPE_TOKEN, "g"), "{");
  return opts.noSmooth ? text : smooth(text);
}
