// ═══════════════════════════════════════════════════════════════
// SCARCITY PLAYER TOOLS — Devour, Echoed Will (§33.5)
// ═══════════════════════════════════════════════════════════════

export function devourScarcityDamage(opposition, reachLevel = 1) {
  if (!opposition?.supernatural?.actTriggered) return opposition;
  const base = 8 + Math.min(6, reachLevel);
  const pressure = Math.max(0, (opposition.supernatural.scarcityPressure || 0) - base);
  return {
    ...opposition,
    supernatural: {
      ...opposition.supernatural,
      scarcityPressure: pressure,
      famineWeek: pressure < 100 ? false : opposition.supernatural.famineWeek,
    },
  };
}

/** Echoed Will — reverse active curse; backlash adds scrutiny. */
export function echoedWillReverseCurse(opposition, studentId, scrutiny = 0) {
  if (!opposition?.supernatural?.actTriggered) return { opposition, ok: false, scrutinyDelta: 0 };
  const queue = [...(opposition.supernatural.curseQueue || [])];
  const idx = queue.findIndex((c) => c.studentId === studentId);
  if (idx < 0 && queue.length) {
    queue.pop();
  } else if (idx >= 0) {
    queue.splice(idx, 1);
  } else {
    return { opposition, ok: false, scrutinyDelta: 0 };
  }
  const pressure = Math.max(0, (opposition.supernatural.scarcityPressure || 0) - 5);
  return {
    opposition: {
      ...opposition,
      supernatural: { ...opposition.supernatural, curseQueue: queue, scarcityPressure: pressure },
    },
    ok: true,
    scrutinyDelta: scrutiny >= 75 ? 6 : 3,
    message: '🔁 Echoed Will — hunger curse reversed onto the Ascetic proxy.',
  };
}

export function checkSynthesisEndgame(opposition, students, pharmacistStage = 0) {
  if (!opposition?.supernatural?.actTriggered) return false;
  if ((pharmacistStage || 0) < 4) return false;
  const evolved = students.filter((s) => s.evolvedForm);
  if (!evolved.length) return false;
  return evolved.every((s) => !!s.supernaturalForm);
}

export function applySynthesisAlly(opposition) {
  return {
    ...opposition,
    supernatural: {
      ...opposition.supernatural,
      synthesisAlly: true,
      scarcityPressure: Math.max(0, (opposition.supernatural.scarcityPressure || 0) - 25),
    },
  };
}
