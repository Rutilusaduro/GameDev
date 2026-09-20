// ═══════════════════════════════════════════════════════════════
// CAMPUS WITNESS LOG — persistent scrutiny memory (DEPTH_PLAN §4)
// ═══════════════════════════════════════════════════════════════
import { scrutinyDiscoveryMult } from './scrutinyConsequences.js';
import { depthScrutinyDiscoveryMult } from './mechanicsDepthLayer.js';

const LOG_LIMIT = 24;

export function appendWitnessLog(campusState, entry) {
  const prev = campusState?.witnessLog || [];
  const next = [{ week: entry.week, ...entry }, ...prev].slice(0, LOG_LIMIT);
  return { ...campusState, witnessLog: next };
}

export function scaleDiscoveryRisk(baseRisk, adminScrutiny = 0, boardMult = 1) {
  const scrutinyMult = depthScrutinyDiscoveryMult(
    scrutinyDiscoveryMult(adminScrutiny),
    adminScrutiny,
  );
  return Math.min(0.95, Math.max(0.05, baseRisk * boardMult * scrutinyMult));
}

export function witnessEntrySummary(entry) {
  if (!entry) return '';
  const who = entry.studentName || entry.targetName || 'someone';
  if (entry.eventType === 'device') return `Week ${entry.week}: ${who} — device use noticed`;
  if (entry.eventType === 'exploration') return `Week ${entry.week}: suspicious activity at ${entry.nodeId || 'campus'}`;
  if (entry.eventType === 'embodiment') {
    const where = entry.nodeId ? ` at ${entry.nodeId.replace(/_/g, ' ')}` : '';
    const witness = entry.witnessName ? ` (${entry.witnessName} noticed)` : '';
    return `Week ${entry.week}: ${who} — ${entry.label || 'embodied incident'}${where}${witness}`;
  }
  return `Week ${entry.week}: ${who} — flagged`;
}
