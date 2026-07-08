// ═══════════════════════════════════════════════════════════════
// GAME SAVE — export blob for Field Notes attach (§38 Phase 2)
// ═══════════════════════════════════════════════════════════════

export const SAVE_SCHEMA = 6;

function trimAscensionState(ascension) {
  if (!ascension?.formId) return null;
  return {
    formId: ascension.formId,
    cycle: ascension.cycle || 2,
    ascendedWeek: ascension.ascendedWeek ?? null,
    peakLbs: ascension.peakLbs ?? null,
    essence: ascension.essence ?? 0,
    essenceSpentPublic: ascension.essenceSpentPublic ?? 0,
    abilities: {
      unlocked: [...(ascension.abilities?.unlocked || [])],
      cooldowns: { ...(ascension.abilities?.cooldowns || {}) },
    },
    formFlags: { ...(ascension.formFlags || {}) },
    relics: [...(ascension.relics || [])],
  };
}

/** Trimmed save suitable for bug-report attach (not full session replay). */
export function buildGameSaveBlob(ctx = {}) {
  const {
    player,
    students,
    opposition,
    campusState,
    inventory,
    lilithUnlocked,
    lilithKillCount,
    labState,
    pharmacistState,
    deviceInventory,
    brokeScaleIds,
    view,
  } = ctx;

  return {
    schemaVersion: SAVE_SCHEMA,
    exportedAt: new Date().toISOString(),
    player: player || null,
    students: (students || []).map((s) => ({
      id: s.id,
      name: s.name,
      custom: !!s.custom,
      pronouns: s.pronouns || null,
      archetype: s.archetype || null,
      bodyType: s.bodyType || null,
      lbs: s.lbs,
      startLbs: s.startLbs,
      peakLbs: s.peakLbs ?? null,
      relationship: s.relationship,
      gainStance: s.gainStance || null,
      psych: s.psych || null,
      origin: s.origin || null,
      originRegister: s.originRegister || null,
      originFlags: s.originFlags || null,
      originChosenWeek: s.originChosenWeek ?? null,
      voiceKit: s.voiceKit || null,
      customDraft: s.customDraft || null,
      evolvedForm: s.evolvedForm || null,
      ascension: trimAscensionState(s.ascension),
      ascensionPending: s.ascensionPending || null,
      ascensionCatalysts: s.ascensionCatalysts || null,
      supernaturalForm: s.supernaturalForm || null,
      memoryMass: s.memoryMass ?? null,
      etherealLbs: s.etherealLbs ?? null,
      hidden: !!s.hidden,
      corruption: s.corruption || 0,
      equip: s.equip || null,
      outfit: s.outfit || null,
      dossierSnapshots: (s.dossierSnapshots || []).slice(-12),
      pinnedMoments: (s.pinnedMoments || []).slice(-8),
      wardrobeMorgue: (s.wardrobeMorgue || []).slice(-8),
      edges: (s.edges || []).slice(0, 3),
    })),
    opposition: opposition || null,
    campusState: campusState ? {
      at: campusState.at,
      saturation: campusState.saturation,
      exploration: campusState.exploration,
    } : null,
    inventory: inventory || {},
    deviceInventory: deviceInventory || {},
    labState: labState || null,
    pharmacistState: pharmacistState ? {
      stage: pharmacistState.stage,
      campusFattening: !!pharmacistState.campusFattening,
      cult: pharmacistState.cult || null,
    } : null,
    lilithUnlocked: !!lilithUnlocked,
    lilithKillCount: lilithKillCount || 0,
    brokeScaleIds: brokeScaleIds || [],
    view: view || null,
  };
}

export function encodeSaveBlob(save) {
  const json = JSON.stringify(save);
  if (typeof btoa === 'function') {
    try {
      return btoa(unescape(encodeURIComponent(json)));
    } catch {
      return btoa(json);
    }
  }
  return json;
}

export function decodeSaveBlob(encoded) {
  if (!encoded) return null;
  try {
    const json = decodeURIComponent(escape(atob(encoded)));
    return JSON.parse(json);
  } catch {
    try {
      return JSON.parse(atob(encoded));
    } catch {
      return null;
    }
  }
}
