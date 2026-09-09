// ═══════════════════════════════════════════════════════════════
// MEMORY STORE — a lightweight per-resident event history the prose can
// call back to. Engine-free: just records notable events onto
// student.memories (already persisted with students in saves) and
// picks a relevant one to reference later — same-week callbacks,
// long-arc milestones, and cross-resident gossip.
//
//   memory entry: { t: type, w: week, v?: value }
//   types: 'feast' | 'forced' | 'stuffed' | 'stageUp' | 'scaleBreak'
//          'bondShift' (v: 'trust+' | 'trust++' | 'trust+++' | 'betrayal')
// ═══════════════════════════════════════════════════════════════

const MEM_CAP = 24;

/** Append an event to a memories array, de-duping same type+week, capped. */
export function appendMemory(memories, type, week, value) {
  const prev = Array.isArray(memories) ? memories : [];
  // collapse a repeat of the same event within the same week
  const filtered = prev.filter((m) => !(m.t === type && m.w === week));
  const entry = value != null ? { t: type, w: week, v: value } : { t: type, w: week };
  return [...filtered, entry].slice(-MEM_CAP);
}

function rpick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Pick a memory of THIS resident worth calling back to, relative to the
 * just-played `week`. Same-week → recent feasts/force-feeds; long-arc →
 * prior-week milestones. Returns selector globals or null.
 */
export function pickStudentMemory(student, week) {
  const mems = student?.memories || [];
  const sameWeek = mems.filter((m) => m.w === week && (m.t === 'feast' || m.t === 'forced'));
  const longArc = mems.filter((m) => m.w < week && (m.t === 'stageUp' || m.t === 'scaleBreak' || m.t === 'stuffed' || m.t === 'bondShift'));
  const pools = [];
  if (sameWeek.length) pools.push({ scope: 'sameWeek', m: sameWeek[sameWeek.length - 1] });
  if (longArc.length) pools.push({ scope: 'longArc', m: rpick(longArc) });
  if (!pools.length) return null;
  const choice = rpick(pools);
  return {
    memScope: choice.scope,
    memType: choice.m.t,
    memWeeksAgo: Math.max(1, week - choice.m.w),
    memValue: choice.m.v ?? null,
  };
}

/**
 * Pick a recent, notable event by SOMEONE ELSE for a cross-resident callback.
 * Scans all students' memories for scale breaks / stage-ups in the last few
 * weeks. Returns { memName, memType, memWeeksAgo } or null.
 */
export function pickClassMemory(students, week, excludeId) {
  const recent = [];
  for (const s of students || []) {
    if (s.id === excludeId || s.hidden) continue;
    for (const m of s.memories || []) {
      const ago = week - m.w;
      if ((m.t === 'scaleBreak' || m.t === 'stageUp') && ago >= 0 && ago <= 3) {
        recent.push({ memName: s.name, memType: m.t, memWeeksAgo: Math.max(1, ago) });
      }
    }
  }
  return recent.length ? rpick(recent) : null;
}
