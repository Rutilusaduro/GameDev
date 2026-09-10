import { getStage } from './stages.js';

export function isRoomIntroPending(student) {
  if (!student || student.lockState === 'locked') return false;
  return !student.roomIntroduced;
}

export function roomStageBeatPending(student) {
  if (!student || student.lockState === 'locked') return false;
  if (!student.roomIntroduced) return false;
  const stageId = getStage(student.lbs ?? 0).id;
  const seen = student.roomStageSeen ?? -1;
  return stageId > seen;
}

export function roomVisitBadge(student) {
  if (isRoomIntroPending(student)) return 'intro';
  if (roomStageBeatPending(student)) return 'stage';
  return null;
}

export function applyRoomVisitComplete(student, week = 1) {
  const stageId = getStage(student.lbs ?? 0).id;
  const firstIntro = !student.roomIntroduced;
  return {
    ...student,
    roomIntroduced: true,
    roomStageSeen: stageId,
    ...(firstIntro ? { roomIntroWeek: week } : {}),
  };
}
