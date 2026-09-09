// ═══════════════════════════════════════════════════════════════
// OPPOSITION INTEGRATION — gates, proxy helpers, form flavors (§30–35)
// ═══════════════════════════════════════════════════════════════

import { getSuspicionBracket } from './communityResearcher.js';
import { getStage } from './stages.js';

const EVOLVED_OP_MESSAGES = {
  delivery_hive: '✦ Hive intake delays the agenda — drones reroute compliance paperwork.',
  eating_streamer: '✦ Stream distraction floods the Board feed with indulgent clips.',
  chapter_hostess: '✦ Chapter Hostess feast invitation muddies the wellness narrative.',
  community_researcher: '✦ Cassidy\'s thesis data reframes the agenda as aesthetic research.',
  competitive_gainer: '✦ Competitive metrics make the Board look petty by comparison.',
  pharmacist: '✦ Compound haze softens the room — agenda stalls one week.',
  artisan_gallery: '✦ Gallery opening steals the cultural spotlight.',
  salon_appetit: '✦ Salon evening drains attention from oversight hearings.',
  default: '✦ Evolved student operation — top agenda delayed one week.',
};

export function getEvolvedOpMessage(students) {
  const evolved = students.find((s) => s.evolvedForm && !s.hidden);
  if (!evolved) return EVOLVED_OP_MESSAGES.default;
  return EVOLVED_OP_MESSAGES[evolved.evolvedForm] || EVOLVED_OP_MESSAGES.default;
}

export function buildOppositionContext({
  students = [],
  ownedSkills = {},
  ownedClassSkills = {},
  facultyAffinity = {},
  labState = null,
  pharmacistState = null,
  communityResearcherState = null,
  lilithUnlocked = false,
} = {}) {
  const relMax = students.reduce((m, s) => Math.max(m, s.relationship || 0), 0);
  const suspicion = communityResearcherState?.totalSuspicion ?? 0;
  const cultStage = pharmacistState?.cult?.stage ?? pharmacistState?.stage ?? 0;
  const facultyAffinityScore = Object.values(facultyAffinity || {}).reduce((a, v) => a + (v || 0), 0);
  return {
    lilithUnlocked,
    pharmacistStage: pharmacistState?.stage ?? 0,
    cultStage,
    hasGrowthChamber: !!labState?.installedInventions?.growth_accelerator_chamber,
    networkStage: labState?.stage ?? 1,
    hasInstitutionalCover: !!(ownedClassSkills?.institutional_cover || ownedSkills?.institutional_cover),
    hasEchoedWill: (ownedSkills?.echoed_will || 0) > 0,
    relMaxStudent: relMax,
    facultyAffinityScore,
    hasCassidyResearcher: students.some((s) => s.evolvedForm === 'community_researcher'),
    hasKylieStream: students.some((s) => s.evolvedForm === 'eating_streamer'),
    hasReneeCulinary: students.some((s) => s.id === 10 && !!s.evolvedForm),
    hasTiffanyFeast: students.some((s) => s.evolvedForm === 'chapter_hostess'),
    facultyInformantRisk: getSuspicionBracket(suspicion) === 'orange' || getSuspicionBracket(suspicion) === 'red',
    communityResearcherSuspicion: suspicion,
    visibleStage5Plus: students.filter((s) => !s.hidden && getStage(s.lbs).id >= 5).length,
  };
}

export function counterGateReason(counter, ctx) {
  switch (counter.id) {
    case 'machine_fatten':
      return ctx.hasGrowthChamber ? null : 'Requires growth accelerator chamber';
    case 'public_discredit':
      return (ctx.hasCassidyResearcher || ctx.hasKylieStream) ? null : 'Requires Cassidy (researcher) or Kylie (streamer)';
    case 'bureaucratic_capture':
      if (ctx.hasInstitutionalCover && ctx.relMaxStudent >= 70) return null;
      if (ctx.relMaxStudent >= 70) return null;
      return 'Requires institutional cover or a student at 70+ relationship';
    case 'spirit_pressure':
      return ctx.hasEchoedWill ? null : 'Requires Echoed Will (Influence tree)';
    case 'faculty_testimony':
      return (ctx.facultyAffinityScore ?? 0) >= 60 || ctx.relMaxStudent >= 60
        ? null
        : 'Requires faculty affinity 60+ or devoted student goodwill';
    case 'feast_bribe':
      return (ctx.hasReneeCulinary || ctx.hasTiffanyFeast) ? null : 'Requires Reneé or Tiffany evolved path';
    case 'network_misdirect':
      return ctx.networkStage >= 2 ? null : 'Requires lab network stage 2+';
    case 'lilith_hunt':
      return ctx.lilithUnlocked ? null : 'Requires Lilith unlocked';
    case 'compound_seduction':
      return ctx.pharmacistStage >= 2 ? null : 'Requires Sophia pharmacist stage 2+';
    default:
      return null;
  }
}

export function wellnessScrutinyBonus(students) {
  const heavy = students.filter((s) => !s.hidden && getStage(s.lbs).id >= 5).length;
  return heavy > 0 ? Math.ceil(heavy * 0.1) : 0;
}

export function proxyUnlockFlags(week, scrutiny, saturationTier, cultStage) {
  return {
    wellnessCoalition: week >= 8 && scrutiny >= 40,
    accreditation: week >= 14 && saturationTier >= 1,
    asceticCircle: week >= 20 && (saturationTier >= 2 || cultStage >= 3),
  };
}

export function recordCounterType(meta, counterId) {
  const used = new Set(meta?.counterTypesUsed || []);
  used.add(counterId);
  return { ...meta, counterTypesUsed: [...used] };
}
