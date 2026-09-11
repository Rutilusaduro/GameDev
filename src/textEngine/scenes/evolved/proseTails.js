// Shared non-repeating tails for evolved activity + event pools.

export const ACTIVITY_ATMOSPHERE = [
  (ctx) => {
    const n = ctx.subject?.name || 'She';
    const lbs = Math.round(ctx.subject?.lbs ?? 0);
    return lbs > 0
      ? `${n} leaves ${lbs} pounds of presence in the hallway when she goes.`
      : `${n} leaves appetite in the hallway when she goes.`;
  },
  'The floor remembers the session long after the plates are empty.',
  (ctx) => {
    const w = ctx.week ?? 1;
    return `Week ${w} stacks habit on habit — nobody pretends this is accidental anymore.`;
  },
  'Someone down the hall smells what happened and starts thinking about seconds.',
  (ctx) => {
    const n = ctx.subject?.name || 'She';
    return `${n} moves slower afterward, satisfied in a way the building rewards.`;
  },
  'Radiators hum. Bellies settle. The RA log can wait.',
];

const CHOICE_ECHO = [
  'The hall absorbs the choice before anyone names it aloud.',
  (ctx) => {
    const n = ctx.subject?.name || 'She';
    return `${n} is already thinking about the next serving before the plates cool.`;
  },
  'Doors stay open a little longer tonight — permission travels faster than policy.',
  (ctx) => {
    const w = ctx.week ?? 1;
    return `Week ${w} adds another line to a story the floor tells without whispering.`;
  },
  'Someone down the hall hears laughter and reaches for a snack they did not plan.',
];

const ENDING_ECHO = [
  (ctx) => {
    const n = ctx.subject?.name || 'She';
    return `${n} carries the ending in her stride — heavier, steadier, unsurprised.`;
  },
  'The blueprint of habit updates itself without a work order.',
  'Residents trade glances that mean: we know what kind of floor this is now.',
  (ctx) => {
    const g = ctx.globals?.totalGain ?? ctx.globals?.gainAccum ?? 0;
    return g > 0 ? `The numbers moved — ${Math.round(g)} pounds of consequence, willingly worn.` : 'The numbers moved — consequence worn like a badge.';
  },
];

function pickTail(pool, seed, slot = 0) {
  const i = (seed.length * 5 + slot * 11) % pool.length;
  const fn = pool[i];
  return typeof fn === 'function' ? fn : () => fn;
}

export function atmosphereBeat(formId, stageIdx, slot = 0) {
  return pickTail(ACTIVITY_ATMOSPHERE, `${formId}:${stageIdx}`, slot);
}

export function choiceEchoBeat(formId, choiceId, slot = 0) {
  return pickTail(CHOICE_ECHO, `${formId}:${choiceId}`, slot);
}

export function endingEchoBeat(formId, stageIdx, endingIdx, slot = 0) {
  return pickTail(ENDING_ECHO, `${formId}:s${stageIdx}:e${endingIdx}`, slot);
}

const CG_SCENE_TAIL = [
  'Pins migrate. Numbers climb. The dorm pretends not to stare.',
  (ctx) => {
    const p = ctx.globals?.priyaName || 'Priya';
    return `${p} exhales like the corkboard just agreed with her stomach.`;
  },
  'Tape and appetite share the same religion on this floor.',
  (ctx) => {
    const w = ctx.week ?? 1;
    return `Week ${w} — another line item on a leaderboard written in pounds.`;
  },
];

export function cgSceneTailBeat(seed, slot = 0) {
  return pickTail(CG_SCENE_TAIL, seed, slot);
}

const HOMEROOM_TAIL = [
  'Tuesday steam fogs the common-room windows — suspicion stays outside for one more hour.',
  (ctx) => {
    const n = ctx.subject?.name || 'Daisy';
    return `${n} notes who ate seconds before she writes it down — habit dressed as hospitality.`;
  },
  'Mothers leave with containers; residents leave heavier; the RA log calls it enrichment.',
  'Flour dusts the counter like snowfall nobody plans to sweep yet.',
  (ctx) => {
    const w = ctx.week ?? 1;
    return `Week ${w} on the floor — tradition thickening faster than wellness paperwork.`;
  },
];

export function homeroomTailBeat(seed, slot = 0) {
  return pickTail(HOMEROOM_TAIL, seed, slot);
}

const WL_TALK_TAIL = [
  'The kitchen smells like butter before anyone finishes hello.',
  'Mary Jane ladles warmth into every pause — nobody leaves still pretending they are full.',
  (ctx) => {
    const w = ctx.week ?? 1;
    return `Week ${w} — daughters and mothers learn appetite in the same room.`;
  },
];

export function wlTalkTailBeat(seed, slot = 0) {
  return pickTail(WL_TALK_TAIL, seed, slot);
}

const CG_CHAT_TAIL = [
  'The group chat pings like a scoreboard — numbers and appetite in the same thread.',
  (ctx) => {
    const p = ctx.globals?.priyaName || 'Priya';
    return `${p} reads replies while eating — multitasking as dominance.`;
  },
];

export function cgChatTailBeat(seed, slot = 0) {
  return pickTail(CG_CHAT_TAIL, seed, slot);
}

const FAIR_TAIL = [
  'Fair lights hum; pride stacks like plates nobody admits they ordered.',
  (ctx) => {
    const n = ctx.subject?.name || 'She';
    return `${n} tastes sawdust and sugar — county season writing itself on her hips.`;
  },
  'Crowd noise folds into appetite; the scale waits like a throne.',
  (ctx) => {
    const w = ctx.week ?? 1;
    return `Week ${w} — another training session the fair will remember before the office does.`;
  },
];

export function fairTailBeat(seed, slot = 0) {
  return pickTail(FAIR_TAIL, seed, slot);
}

const OUTFIT_TAIL = [
  (ctx) => {
    const n = ctx.subject?.name || 'She';
    return `${n} wears the body like a decision nobody is walking back.`;
  },
  'Seams forgive; belts surrender; the mirror stops arguing.',
  'Residents clock the silhouette before the outfit — habit reads faster than fashion.',
  (ctx) => {
    const w = ctx.week ?? 1;
    return `Week ${w} — another layer that admits what the scale already confessed.`;
  },
  'Fabric stretches with permission the RA never had to write down.',
];

const SESSION_TAP_TAIL = [
  (ctx) => {
    const n = ctx.subject?.name || 'She';
    return `${n} taps out breathless — satisfied, spent, still hungry in the polite way.`;
  },
  'The session ends on a held note; fullness wins the argument.',
  'Plates cool while she recovers — appetite already planning the rematch.',
  (ctx) => {
    const w = ctx.week ?? 1;
    return `Week ${w} logs another private surrender nobody on the floor will mock.`;
  },
];

export function outfitTailBeat(seed, slot = 0) {
  return pickTail(OUTFIT_TAIL, seed, slot);
}

export function sessionTapTailBeat(seed, slot = 0) {
  return pickTail(SESSION_TAP_TAIL, seed, slot);
}
