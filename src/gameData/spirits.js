// ═══════════════════════════════════════════════════════════════
// Legacy re-exports — new code uses dorms.js + raApproaches.js
// ═══════════════════════════════════════════════════════════════

export {
  UNLOCK_POOL_IDS,
  DORMS,
  DORM_LIST,
  DORMS as SUBJECTS,
  DORM_LIST as SUBJECT_LIST,
  getDorm,
  getDorm as getSubject,
  getDormResidents,
  STUDENT_HOME_DORM,
} from './dorms.js';

export {
  RA_APPROACHES as SPIRITS,
  RA_APPROACH_LIST as SPIRIT_LIST,
  FAVOR_MAX,
  FAVOR_REBATE,
  favorFill,
  profileGainMult,
  profileScrutinyMult,
  profilePassiveBonus,
  profileCorruptionMult,
  getApproach as getSpirit,
} from './raApproaches.js';
