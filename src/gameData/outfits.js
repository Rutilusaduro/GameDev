// ═══════════════════════════════════════════════════════════════
// OUTFITS — garment slots, fit-state derivation, default wardrobe.
// Engine-free game data (WORD_GRANULAR_ENGINE_PLAN §4.4).
//
// A garment: { id, name, slot, fitLbs, integrity }
//   fitLbs    — the weight the garment was fitted at.
//   integrity — 1 intact … 0 destroyed. Damage persists across weeks
//               until the garment is changed (owner decision, 2026-07);
//               swapping a garment resets its slot to integrity 1.
// ═══════════════════════════════════════════════════════════════

export const FIT_STATES = ['loose', 'fitted', 'snug', 'straining', 'failing', 'burst'];

// Thresholds are starting values — tune against sample renders.
export function garmentFitState(garment, lbs) {
  if (!garment || !lbs) return null;
  if ((garment.integrity ?? 1) <= 0) return 'burst';
  const r = lbs / garment.fitLbs;
  if (r < 0.85) return 'loose';
  if (r < 1.05) return 'fitted';
  if (r < 1.15) return 'snug';
  if (r < 1.30) return 'straining';
  if (r < 1.50) return 'failing';
  return 'burst';
}

// ponytail: defaults derived from startLbs — no roster/save changes; a real
// wardrobe (per-resident garments, purchase flow) is long-term roadmap.
// Waistbands lose the argument first, tops last.
export function defaultOutfitFor(student) {
  const base = student?.startLbs ?? student?.lbs ?? 130;
  return {
    top: { id: 'default_top', name: 'top', slot: 'top', fitLbs: base * 1.12, integrity: 1 },
    bottom: { id: 'default_bottom', name: 'jeans', slot: 'bottom', fitLbs: base * 1.05, integrity: 1 },
    waist: { id: 'default_waist', name: 'waistband', slot: 'waist', fitLbs: base, integrity: 1 },
  };
}

export function buildCustomOutfit({ garments = {}, startLbs = 130, fit = 'fitted' } = {}) {
  const fitMult = fit === 'relaxed' ? 1.08 : fit === 'snug' ? 0.97 : 1;
  const make = (slot, fallbackName, slotMult) => ({
    id: garments[slot]?.id || `custom_${slot}`,
    name: garments[slot]?.name || fallbackName,
    slot,
    fitLbs: Math.round(startLbs * slotMult * fitMult),
    integrity: 1,
  });
  return {
    top: make('top', 'top', 1.12),
    bottom: make('bottom', 'jeans', 1.05),
    waist: make('waist', 'waistband', 1),
  };
}

export function outfitFor(student) {
  return student?.outfit ?? defaultOutfitFor(student);
}

/** Prestige-cost refits — weekly wardrobe loop, not a one-shot integrity tick. */
export const REFIT_OPTIONS = [
  {
    id: 'let_out',
    label: 'Let out the seams',
    cost: 40,
    integrityRestore: 0.4,
    fitLbsBump: 14,
    desc: 'A needle, extra fabric, and an honest measurement. The old clothes keep working for a while.',
  },
  {
    id: 'new_set',
    label: 'Commission a new set',
    cost: 75,
    integrityRestore: 1,
    refitToCurrent: true,
    extraFit: 10,
    desc: 'Cut to the body she has now. Nothing pretends she is last month.',
  },
];

export function needsRefit(student) {
  const worst = worstFitState(student);
  if (!worst) return false;
  return FIT_STATES.indexOf(worst) >= FIT_STATES.indexOf('straining');
}

export function applyOutfitRefit(student, optionId = 'let_out') {
  if (!student) return student;
  const opt = REFIT_OPTIONS.find((o) => o.id === optionId) || REFIT_OPTIONS[0];
  const base = outfitFor(student);
  const lbs = student.lbs || 130;
  const next = { ...base };
  for (const slot of ['top', 'bottom', 'waist']) {
    const g = next[slot];
    if (!g) continue;
    const slotMult = slot === 'top' ? 1.12 : slot === 'bottom' ? 1.05 : 1;
    const fitLbs = opt.refitToCurrent
      ? Math.round(lbs * slotMult + (opt.extraFit || 0))
      : (g.fitLbs || lbs) + (opt.fitLbsBump || 0);
    const integrity = Math.min(1, (g.integrity ?? 1) + (opt.integrityRestore || 0));
    next[slot] = { ...g, fitLbs, integrity };
  }
  return { ...student, outfit: next };
}

/** Most-severe fit state across worn slots (index into FIT_STATES). */
export function worstFitState(student) {
  const outfit = outfitFor(student);
  let worst = null;
  for (const slot of ['top', 'bottom', 'waist']) {
    const s = garmentFitState(outfit[slot], student?.lbs);
    if (s && (worst == null || FIT_STATES.indexOf(s) > FIT_STATES.indexOf(worst))) worst = s;
  }
  return worst;
}
