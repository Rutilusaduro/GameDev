// ═══════════════════════════════════════════════════════════════
// COMPETITIVE GAINER — state helpers + legacy save migration
// ═══════════════════════════════════════════════════════════════
import { depthCgDriveGain } from './mechanicsDepthLayer.js';

export function cgDrive(cgState) {
  return cgState?.drive ?? cgState?.spirit ?? 0;
}

export function cgDriveDelta(opt) {
  return opt?.driveDelta ?? opt?.spiritDelta ?? 0;
}

export function cgSubstateGain(subState) {
  const base = subState?.driveGain ?? subState?.spiritGain ?? 0;
  return depthCgDriveGain(base);
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
