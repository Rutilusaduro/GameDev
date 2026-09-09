// ═══════════════════════════════════════════════════════════════
// COMPETITIVE GAINER — state helpers + legacy save migration
// ═══════════════════════════════════════════════════════════════

export function cgDrive(cgState) {
  return cgState?.drive ?? cgState?.spirit ?? 0;
}

export function cgDriveDelta(opt) {
  return opt?.driveDelta ?? opt?.spiritDelta ?? 0;
}

export function cgSubstateGain(subState) {
  return subState?.driveGain ?? subState?.spiritGain ?? 0;
}

/** Normalize legacy spirit → drive keys from older saves. */
export function migrateCompetitiveGainerState(state) {
  if (!state) return state;
  const drive = cgDrive(state);
  const hasLegacy = state.spirit != null;
  if (!hasLegacy && state.drive === drive) return state;
  const { spirit: _legacy, ...rest } = state;
  return { ...rest, drive };
}
