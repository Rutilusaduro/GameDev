// Floor-skill extras for hall kitchen (Daisy) and wife lessons (MJ).
import { WL_LESSONS } from './evolvedForms.js';

export function extraHomeroomChoices(actKey, phaseIdx = 0, owned = {}) {
  const extras = [];
  if (phaseIdx !== 0) return extras;
  if (actKey === 'parent_meeting' && (owned.snack_station || owned.artisan_bakery || owned.legendary_host)) {
    extras.push({
      id: 'floor_potluck',
      label: 'Bring the floor kitchen leftovers, call it enrichment',
      result: `Daisy wheels in a cart still warm from the hall kitchen. Mrs. Monroe has a plate before the lid is fully off. Mrs. Reyes asks for the recipe with her mouth full. Mrs. Calloway takes seconds and writes nothing in her notes. The agenda waits under a napkin.`,
      momGain: 16,
      rel: 8,
      suspDelta: 0,
    });
  }
  if (actKey === 'health_unit' && (owned.comfy_chairs || owned.dedicated_suite || owned.reinforced_seating)) {
    extras.push({
      id: 'lounge_measure',
      label: 'Measure in the lounge. The chairs already know these bodies',
      result: `Daisy moves the scale to the lounge. The wide chairs accept everyone without comment. Numbers get written. Nobody hurries back to the desks. Sofia sits a little longer after her reading, pleased with the number in a way she will not name.`,
      rel: 7,
      suspDelta: 0,
      revealsWeights: true,
    });
  }
  return extras.slice(0, 2);
}

export function homeroomChoicesForPhase(actDef, actKey, phaseIdx, owned = {}) {
  const phases = actDef?.phases || [{ text: actDef?.text, choices: actDef?.choices || [] }];
  const phase = phases[phaseIdx];
  if (!phase) return [];
  return [...(phase.choices || []), ...extraHomeroomChoices(actKey, phaseIdx, owned)];
}

export function extraWifeLessons(stage = 1, owned = {}) {
  const extras = [];
  const s = Math.max(1, Number(stage) || 1);
  if (owned.snack_station || owned.artisan_bakery || owned.luxury_pantry) {
    extras.push({
      id: 'floor_kitchen_swap',
      label: 'Hall Kitchen Swap',
      text: `MJ borrows the floor kitchen for a night. The moms arrive to a counter already warm, dough rising in a room built for this. Daughters eat standing because the chairs are full of more of them. MJ smiles like the hall had been waiting to be a classroom.`,
      daughterLbs: 2 + s,
      momLbs: 1 + Math.floor(s / 2),
      mjLbs: 2 + Math.floor(s / 2),
      rel: 2 + Math.min(3, Math.floor(s / 3)),
    });
  }
  if (owned.dinner_basic || owned.legendary_host || owned.dinner_casual) {
    extras.push({
      id: 'dining_host_night',
      label: 'Dining Host Night',
      text: `MJ sets the dining table like a lesson and a date. Extra butter on every plate. The host skill shows: nobody leaves hungry, and nobody pretends they meant to. Wanda asks for the recipe twice. MJ writes it bigger the second time.`,
      daughterLbs: 3 + s,
      momLbs: 2 + Math.floor(s / 2),
      mjLbs: 2 + Math.floor(s / 2),
      rel: 3 + Math.min(3, Math.floor(s / 3)),
    });
  }
  return extras.slice(0, 2);
}

export function wifeLessonsForOwned(stage, owned = {}) {
  return [...(WL_LESSONS[stage] || []), ...extraWifeLessons(stage, owned)];
}
