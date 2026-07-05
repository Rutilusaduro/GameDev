// The Squad — Lead: A4 Architect | Support: A5 Editor
// Pure state helpers for mythic ascension. UI and prose call this layer; the
// text engine only sees the derived dimensions registered in textContext.js.

import { getCorruptionTier } from '../corruption.js';
import { getTier } from '../sessions.js';
import { getStage } from '../stages.js';
import {
  ASCENSION_CYCLE,
  ASCENSION_STANDARD_REBIRTH_LBS,
  getAscensionFormById,
  getAscensionFormForStudent,
} from './forms.js';

export const ASCENSION_REQUIRED_STAGE_ID = 11;
export const ASCENSION_REQUIRED_CORRUPTION_TIER = 2;
export const ASCENSION_REQUIRED_RELATIONSHIP_TIER = 3;

export function isAscended(student) {
  return !!student?.ascension?.formId;
}

export function essenceTier(essence = 0) {
  if (essence >= 9) return 3;
  if (essence >= 4) return 2;
  if (essence >= 1) return 1;
  return 0;
}

export function auraTier(essenceSpentPublic = 0) {
  if (essenceSpentPublic >= 9) return 3;
  if (essenceSpentPublic >= 4) return 2;
  if (essenceSpentPublic >= 1) return 1;
  return 0;
}

export function createAscensionState({
  formId,
  ascendedWeek = 1,
  peakLbs = ASCENSION_STANDARD_REBIRTH_LBS,
  essence = 0,
  essenceSpentPublic = 0,
  abilities = {},
  formFlags = {},
  relics = [],
} = {}) {
  if (!formId) throw new Error('createAscensionState requires formId');
  return {
    formId,
    cycle: ASCENSION_CYCLE,
    ascendedWeek,
    peakLbs,
    essence,
    essenceSpentPublic,
    abilities: {
      unlocked: [...(abilities.unlocked || [])],
      cooldowns: { ...(abilities.cooldowns || {}) },
    },
    formFlags: { ...formFlags },
    relics: [...relics],
  };
}

function eventMatchesFlag(event, flag) {
  if (!event || !flag) return false;
  if (event === flag) return true;
  return event.id === flag || event.flag === flag || event.v === flag;
}

export function hasAscensionCatalyst(student, form = getAscensionFormForStudent(student)) {
  const flag = form?.catalystFlag;
  if (!flag) return false;
  if (student?.ascensionCatalysts?.[flag]) return true;
  if (student?.formFlags?.[flag]) return true;
  if (student?.[flag] === true) return true;
  return (student?.triggeredEvents || []).some((event) => eventMatchesFlag(event, flag));
}

export function countOtherAscensions(students = [], studentId = null) {
  return students.filter((student) => student?.id !== studentId && isAscended(student)).length;
}

export function isAscensionEligible(student, opts = {}) {
  if (!student) return { eligible: false, reason: 'missing_student' };
  if (isAscended(student)) return { eligible: false, reason: 'already_ascended' };

  const form = getAscensionFormForStudent(student);
  if (!form) return { eligible: false, reason: 'no_form' };

  if (form.revealAfterOtherAscensions) {
    const otherAscensions = countOtherAscensions(opts.students, student.id);
    return otherAscensions >= form.revealAfterOtherAscensions
      ? { eligible: true, reason: 'eligible', form }
      : { eligible: false, reason: 'waiting_for_pantheon', form, otherAscensions };
  }

  const stageId = getStage(student.lbs ?? 0).id;
  if (stageId < ASCENSION_REQUIRED_STAGE_ID) {
    return { eligible: false, reason: 'stage', form, stageId };
  }

  const corruptionTier = getCorruptionTier(student.corruption || 0).id;
  if (corruptionTier < ASCENSION_REQUIRED_CORRUPTION_TIER) {
    return { eligible: false, reason: 'corruption', form, corruptionTier };
  }

  const relationshipTier = getTier(student.relationship || 0).id;
  if (relationshipTier < ASCENSION_REQUIRED_RELATIONSHIP_TIER) {
    return { eligible: false, reason: 'relationship', form, relationshipTier };
  }

  if (!hasAscensionCatalyst(student, form)) {
    return { eligible: false, reason: 'catalyst', form, catalystFlag: form.catalystFlag };
  }

  return { eligible: true, reason: 'eligible', form };
}

export function applyAscensionRebirth(student, { week = 1, formId = null } = {}) {
  if (!student) return student;
  const form = formId
    ? getAscensionFormById(formId)
    : getAscensionFormForStudent(student);
  if (!form) return student;

  const peakLbs = Math.max(student.peakLbs ?? 0, student.lbs ?? ASCENSION_STANDARD_REBIRTH_LBS);
  const ascension = createAscensionState({
    formId: form.formId,
    ascendedWeek: week,
    peakLbs,
    relics: student.ascension?.relics || [],
  });

  return {
    ...student,
    lbs: ASCENSION_STANDARD_REBIRTH_LBS,
    weekStartLbs: ASCENSION_STANDARD_REBIRTH_LBS,
    peakLbs,
    ascension,
  };
}
