// ═══════════════════════════════════════════════════════════════
// SHARED DEVICE SCENE CONTEXT — used by all device/* scenes
// ═══════════════════════════════════════════════════════════════
import { createContext } from '../../engine.js';
import { getStage } from '../../../gameData/stages.js';
import { getCorruptionTier } from '../../../gameData/corruption.js';
import { getDeviceDependenceTier } from '../../../gameData/deviceDependence.js';

export function buildDeviceSceneContext(student, opts = {}) {
  const stage = getStage(student?.lbs ?? 130);
  const corruption = getCorruptionTier(student?.corruption ?? 0).id;
  const depLevel = opts.dependenceLevel ?? 0;
  const depTier = getDeviceDependenceTier(depLevel).id;
  return createContext({
    subject: student,
    week: opts.week ?? 1,
    globals: {
      deviceId: opts.deviceId || null,
      deviceLabel: opts.deviceLabel || 'device',
      deviceIcon: opts.deviceIcon || '🛠',
      studentId: student?.id,
      studentName: student?.name,
      stage: stage.id,
      bodyType: student?.bodyOverride?.bodyTypeOverride || student?.bodyType,
      mood: student?.mood || 'neutral',
      modificationState: opts.modificationState || [],
      targetType: opts.targetType || 'student',
      isMalfunction: !!opts.isMalfunction,
      malfunctionTier: opts.malfunctionTier || null,
      playerCorruption: opts.playerCorruption ?? 0,
      relationshipLevel: student?.relationship ?? 0,
      hungerLevel: student?.hungerTier ?? 0,
      dependenceLevel: depLevel,
      dependenceTier: depTier,
      gainLbs: opts.gainLbs ?? 0,
      actionId: opts.actionId || null,
      uniqueTag: opts.uniqueTag || null,
      componentLabel: opts.componentLabel || null,
    },
  });
}
