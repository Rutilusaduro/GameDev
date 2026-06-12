// ═══════════════════════════════════════════════════════════════
// INDIANA BONES — The Relic Hunter (hidden student + exploration quests)
// ═══════════════════════════════════════════════════════════════

export const ELARA_ID = 17;

export const ELARA_QUESTS = [
  {
    id: 'tunnel_markings',
    label: 'Tunnel Markings',
    desc: 'Indiana wants eyes on the old maintenance routes beneath the rec center.',
    steps: [
      { nodeId: 'gym', text: 'Indiana crouches by the grate: "These chalk marks predate the renovation. Someone mapped feeding routes — or escape routes. Same thing, maybe."' },
      { nodeId: 'outdoor_track', text: 'At the field house edge she compares symbols. "They line up. Whoever drew them knew where the tunnels breathe."' },
    ],
    reward: { findId: 'tunnel_fungus', relationship: 8 },
  },
  {
    id: 'botanical_specimen',
    label: 'Botanical Specimen',
    desc: 'A rare plant only grows in the walled greenhouse — if you know which bench to lift.',
    steps: [
      { nodeId: 'garden', text: 'Indiana pockets a cutting with reverent care. "This species shows up in pre-expansion campus records. Appetite suppressant trials, allegedly."' },
      { nodeId: 'science_wing', text: 'She cross-references the cutting against a mislabeled cold-room jar. "Same leaf structure. Someone recycled an old formula."' },
    ],
    reward: { findId: 'archive_herb', relationship: 10 },
  },
  {
    id: 'library_basement',
    label: 'Basement Inscriptions',
    desc: 'The sealed stacks hold carvings that do not match any registered club.',
    steps: [
      { nodeId: 'library', text: 'Indiana traces a carving with her flashlight. "These are older than the library basement. Campus was built on something hungry."' },
      { nodeId: 'theater', text: 'She matches the carving to a trap-door seam backstage. "Performance and appetite — always linked here."' },
    ],
    reward: { findId: 'basement_relic', relationship: 12 },
  },
  {
    id: 'wellness_investigation',
    label: 'Wellness Trail',
    desc: 'Indiana smells corporate wellness on the secret map. She wants proof.',
    requires: { campusTierMin: 2, sophiaStageMin: 3 },
    steps: [
      { nodeId: 'student_union', text: 'She peels flyers until the old archaeology map appears. "Your pharmacist did not invent saturation. She industrialized it."' },
      { nodeId: 'dining_hall', text: 'In the pre-renovation cellar she bags residue from a feeding nook. "Documented. Tagged. Useful — if you are on my side."' },
      { nodeId: 'rooftop', text: 'From the roof she watches delivery trucks loop the quad. "It is a circuit. Food in, devotion out, weight as currency."' },
    ],
    reward: { findId: 'saturated_extract', relationship: 15 },
  },
];

const QUEST_BY_ID = Object.fromEntries(ELARA_QUESTS.map(q => [q.id, q]));

export function getElaraQuest(questId) {
  return QUEST_BY_ID[questId] || null;
}

export function availableElaraQuests(exploration, ctx) {
  if (!exploration?.elaraDiscovered || !exploration?.elaraMet) return [];
  const done = exploration.questsCompleted || [];
  return ELARA_QUESTS.filter(q => {
    if (done.includes(q.id)) return false;
    if (q.requires?.campusTierMin && (ctx.campusTier ?? 0) < q.requires.campusTierMin) return false;
    if (q.requires?.sophiaStageMin && (ctx.sophiaStage ?? 1) < q.requires.sophiaStageMin) return false;
    return true;
  });
}

export function startElaraQuest(exploration, questId) {
  if (!exploration?.elaraDiscovered || exploration.questId) return exploration;
  const quest = getElaraQuest(questId);
  if (!quest) return exploration;
  return { ...exploration, questId, questStep: 0 };
}

export function advanceElaraQuestAtNode(exploration, nodeId, ctx) {
  if (!exploration?.questId) return { exploration, lines: [] };
  const quest = getElaraQuest(exploration.questId);
  if (!quest) return { exploration, lines: [] };
  const step = quest.steps[exploration.questStep ?? 0];
  if (!step || step.nodeId !== nodeId) return { exploration, lines: [] };

  const lines = [`🗺️ ${step.text}`];
  const nextStep = (exploration.questStep ?? 0) + 1;
  if (nextStep >= quest.steps.length) {
    const completed = [...(exploration.questsCompleted || []), quest.id];
    return {
      exploration: {
        ...exploration,
        questId: null,
        questStep: 0,
        questsCompleted: completed,
        pendingQuestReward: quest.reward,
      },
      lines: [...lines, `✨ Quest complete: ${quest.label}. Indiana grins — "Partners, then. For now."`],
      completed: true,
      reward: quest.reward,
    };
  }
  const next = quest.steps[nextStep];
  return {
    exploration: { ...exploration, questStep: nextStep },
    lines: [...lines, `→ Next: ${next.nodeId.replace(/_/g, ' ')}.`],
    completed: false,
  };
}

export function elaraQuestProgressLine(exploration, nodeId, ctx) {
  if (!exploration?.questId) return null;
  const quest = getElaraQuest(exploration.questId);
  const step = quest?.steps[exploration.questStep ?? 0];
  if (!step || step.nodeId !== nodeId) return null;
  return `🗺️ Indiana is waiting for you to investigate here (${quest.label}).`;
}

export function takePendingQuestReward(exploration) {
  if (!exploration?.pendingQuestReward) return { exploration, reward: null };
  const reward = exploration.pendingQuestReward;
  return {
    exploration: { ...exploration, pendingQuestReward: null },
    reward,
  };
}
