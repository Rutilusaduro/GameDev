// ═══════════════════════════════════════════════════════════════
// OPPOSITION HEARINGS — removal & emergency (§30.6)
// ═══════════════════════════════════════════════════════════════

export const REMOVAL_HEARING = {
  title: 'Student Removal Hearing',
  phases: [
    {
      text: (ctx) => `Chairwoman Vance opens the hearing. Photos of ${ctx.studentName} fill the screen — abundance framed as concern. "The Board must protect institutional wellness," she says. Your student sits beside you, ${ctx.studentLbs} lbs and unapologetic.`,
      choices: [
        { id: 'testify', label: 'Have a devoted student testify to her character', relReq: 70, result: 'A classmate speaks — warm, specific, unashamed. The room shifts.', flag: 'testify' },
        { id: 'discredit', label: 'Present hypocrisy evidence (Madeline/Kylie path)', result: 'Side-by-side banquet photos. Wellness language curdles in Vance\'s mouth.', flag: 'discredit' },
        { id: 'feast_demo', label: 'Stage a live tasting demonstration', result: 'You serve. They eat. The hearing becomes dinner.', flag: 'feast' },
      ],
    },
    {
      text: (ctx) => `Vance taps her folder. "${ctx.studentName} may remain enrolled only if this class demonstrates… restraint." The word hangs wrong in the air.`,
      choices: [
        { id: 'hold_firm', label: 'Hold firm — abundance is the curriculum', result: 'You do not apologize. Several members look away first.', flag: 'firm' },
        { id: 'negotiate', label: 'Negotiate — private indulgence, public discretion', result: 'A compromise no one believes. It buys time.', flag: 'negotiate' },
        { id: 'spirit', label: 'Spirit pressure — mandatory tasting for the Board', result: 'Plates appear. Resolve softens with every bite.', flag: 'spirit' },
      ],
    },
  ],
  endings: [
    {
      condition: (h) => h.includes('discredit') && h.includes('spirit'),
      text: () => 'The hearing collapses into crumbs and contradiction. Removal denied. The Board leaves hungry.',
      studentHiddenWeeks: 0, scrutinyDelta: -10, resolveHitAll: 15, scandalDelta: -10,
    },
    {
      condition: (h) => h.includes('testify') && h.includes('firm'),
      text: () => 'Testimony lands. You hold the line. Removal denied — narrowly.',
      studentHiddenWeeks: 0, scrutinyDelta: -5, resolveHitAll: 8,
    },
    {
      condition: (h) => h.includes('feast') || h.includes('negotiate'),
      text: () => 'A messy victory. She stays — but the Board will watch closer.',
      studentHiddenWeeks: 0, scrutinyDelta: 2, resolveHitAll: 5,
    },
    {
      condition: () => true,
      text: () => 'The gavel falls. She is suspended from public campus life for four weeks.',
      studentHiddenWeeks: 4, scrutinyDelta: 8, resolveHitAll: 0,
    },
  ],
};

export const EMERGENCY_HEARING = {
  title: 'Emergency Board Hearing',
  phases: [
    {
      text: () => 'Scandal meter critical. Vance calls an emergency session — no agenda, only exposure. "Explain yourself, Professor."',
      choices: [
        { id: 'deflect', label: 'Deflect to campus culture metrics', result: 'Charts, saturation data, feasts as community.', flag: 'deflect' },
        { id: 'feast_bribe', label: 'Cater the hearing itself', result: 'Trays arrive mid-sentence. Appetite interrupts procedure.', flag: 'catered' },
        { id: 'sacrifice', label: 'Sacrifice a compromised member as scapegoat', result: 'You point at the softest resolve on the Board.', flag: 'scapegoat' },
      ],
    },
    {
      text: () => 'The room waits. Accreditation observer takes notes. Every counter has a cost.',
      choices: [
        { id: 'double_down', label: 'Double down — this is the future of the department', result: 'You speak hunger like gospel. Half the room flinches.', flag: 'double' },
        { id: 'absorb', label: 'Absorb blame — protect the class', result: 'You take the hit. They stay fed.', flag: 'absorb' },
        { id: 'hive', label: 'Maya hive misdirect — wrong building, wrong records', result: 'Delivery confusion becomes plausible deniability.', flag: 'misdirect' },
      ],
    },
  ],
  endings: [
    {
      condition: (h) => h.includes('catered') && h.includes('double'),
      text: () => 'They ate through the emergency. Scandal dissipates like steam.',
      scrutinyDelta: -15, scandalDelta: -40, truceWeeks: 1,
    },
    {
      condition: (h) => h.includes('scapegoat') || h.includes('misdirect'),
      text: () => 'A member falls. You survive. The meter cools — not clean, but quieter.',
      scrutinyDelta: 5, scandalDelta: -25, memberResolveHit: 30,
    },
    {
      condition: (h) => h.includes('absorb'),
      text: () => 'You absorb the scandal. The class eats free this month.',
      scrutinyDelta: 12, scandalDelta: -20, moneyDelta: -300,
    },
    {
      condition: () => true,
      text: () => 'Emergency hearing adjourns unresolved. Scrutiny tightens.',
      scrutinyDelta: 10, scandalDelta: 5,
    },
  ],
};

export function pickHearingEnding(hearingDef, history) {
  return hearingDef.endings.find((e) => e.condition(history)) || hearingDef.endings[hearingDef.endings.length - 1];
}
