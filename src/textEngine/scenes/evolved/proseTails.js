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
