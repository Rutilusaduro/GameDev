// ═══════════════════════════════════════════════════════════════
// COMPETITIVE GAINER — state helpers + legacy save migration
// ═══════════════════════════════════════════════════════════════

export function cgDrive(cgState) {
  return cgState?.drive ?? cgState?.spirit ?? 0;
}

export function cgDriveDelta(opt) {
  return opt?.driveDelta ?? opt?.spiritDelta ?? 0;
}

/** Extra competitive drive from galley leftovers / a night-round visit still on Priya. */
export function cgLeftoverDriveBump(priya, week = 0) {
  let n = 0;
  if (priya?.leftoverFedThisWeek) n += 2;
  if (week && priya?.lastNightVisitWeek === week) n += 1;
  return n;
}

export function cgSubstateGain(subState) {
  return subState?.driveGain ?? subState?.spiritGain ?? 0;
}

/** Normalize legacy spirit → drive keys from older saves. */
export function cgIsRaMessage(msg) {
  return !!(msg?.isRa ?? msg?.isProf);
}

export function migrateCompetitiveGainerState(state) {
  if (!state) return state;
  const drive = cgDrive(state);
  const hasLegacy = state.spirit != null;
  if (!hasLegacy && state.drive === drive) return state;
  const { spirit: _legacy, ...rest } = state;
  return { ...rest, drive };
}
