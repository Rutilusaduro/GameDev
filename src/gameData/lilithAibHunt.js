// ═══════════════════════════════════════════════════════════════
// LILITH AIB HUNT — board members on the hunt map (§30.4)
// ═══════════════════════════════════════════════════════════════
import { depthMetaProgressBonus } from './mechanicsDepthLayer.js';

const AIB_HUNT_LOCATIONS = {
  vance: 'admin',
  orr: 'admin',
  jin: 'library',
  washburn: 'gym',
  platt: 'admin',
};

export function aibMemberToHuntTarget(member) {
  if (!member || member.stance === 'consumed' || member.stance === 'removed') return null;
  const location = AIB_HUNT_LOCATIONS[member.id] || 'admin';
  return {
    id: `aib_${member.id}`,
    aibMemberId: member.id,
    isAibTarget: true,
    name: member.name,
    tag: member.role,
    location,
    difficulty: 4,
    desc: (stage) => (stage < 6
      ? `${member.name} carries institutional authority like armor — wellness charts, compliance folders, the whole polite apparatus of denial.`
      : `${member.name} meets your gaze and the folder in their hands suddenly feels inadequate. The night belongs to Lilith.`),
  };
}

export function getAibHuntTargets(members = []) {
  return (members || [])
    .map(aibMemberToHuntTarget)
    .filter(Boolean);
}

export function getAibHuntTargetById(members, targetId) {
  return getAibHuntTargets(members).find((t) => t.id === targetId || t.aibMemberId === targetId) || null;
}

export function removeConsumedAibMember(opposition, memberId) {
  const members = (opposition?.aib?.members || []).filter((m) => m.id !== memberId);
  return {
    ...opposition,
    aib: {
      ...opposition.aib,
      members,
      scandalMeter: Math.max(0, (opposition.aib?.scandalMeter || 0) - depthMetaProgressBonus(5)),
    },
  };
}
