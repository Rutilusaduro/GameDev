// ═══════════════════════════════════════════════════════════════
// MOVE VERB CORPUS — tagged locomotion phrases for scenario pools.
// Shape: VERB PHRASE — lowercase, reads after subject, no period.
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../engine.js';

export const MOVE_VERB_CORPUS = [
  { text: 'strides', stageMin: 0, stageMax: 2, tags: ['general', 'scale', 'door', 'campus'] },
  { text: 'walks', stageMin: 0, stageMax: 4, tags: ['general', 'scale', 'door', 'campus'] },
  { text: 'steps', stageMin: 0, stageMax: 5, tags: ['general', 'scale', 'door'] },
  { text: 'comes', stageMin: 0, stageMax: 6, tags: ['general', 'scale', 'door'] },
  { text: 'slips', stageMin: 0, stageMax: 1, tags: ['general', 'door', 'campus'] },
  { text: 'glides', stageMin: 0, stageMax: 2, tags: ['general', 'campus'] },
  { text: 'ambles', stageMin: 1, stageMax: 5, tags: ['general', 'campus', 'hallway'] },
  { text: 'moves', stageMin: 2, stageMax: 5, tags: ['general', 'scale', 'campus'] },
  { text: 'eases', stageMin: 2, stageMax: 6, tags: ['general', 'scale', 'door'] },
  { text: 'crosses', stageMin: 1, stageMax: 4, tags: ['general', 'campus', 'hallway'] },
  { text: 'drifts', stageMin: 0, stageMax: 3, tags: ['general', 'campus'] },
  { text: 'sways', stageMin: 3, stageMax: 6, tags: ['general', 'campus', 'hallway'] },
  { text: 'rocks', stageMin: 4, stageMax: 7, tags: ['general', 'campus'] },
  { text: 'shuffles', stageMin: 3, stageMax: 9, tags: ['general', 'scale', 'door', 'tired'] },
  { text: 'waddles', stageMin: 5, tags: ['general', 'scale', 'door', 'campus'], weight: 2 },
  { text: 'rolls', stageMin: 5, stageMax: 8, tags: ['general', 'scale', 'campus'] },
  { text: 'lumbers', stageMin: 6, tags: ['general', 'scale', 'door', 'campus'] },
  { text: 'labors', stageMin: 7, stageMax: 9, tags: ['general', 'scale', 'tired'] },
  { text: 'angles', stageMin: 6, stageMax: 9, tags: ['door', 'hallway', 'tight_space'] },
  { text: 'angles sideways through', stageMin: 6, tags: ['door', 'hallway', 'tight_space'] },
  { text: 'turns sideways and presses through', stageMin: 8, tags: ['door', 'tight_space'] },
  { text: 'navigates her way', stageMin: 5, tags: ['general', 'scale', 'campus'] },
  { text: 'works her way', stageMin: 6, stageMax: 9, tags: ['door', 'hallway', 'stairwell'] },
  { text: 'edged', stageMin: 7, tags: ['door', 'tight_space'] },
  { text: 'edges through', stageMin: 7, stageMax: 9, tags: ['door', 'hallway', 'tight_space'] },
  { text: 'rolls herself', stageMin: 8, tags: ['scale', 'bed', 'general'], weight: 2 },
  { text: 'heaves herself', stageMin: 7, tags: ['scale', 'chair', 'bed'] },
  { text: 'shifts her mass', stageMin: 9, tags: ['general', 'scale'], weight: 2 },
  { text: 'settles forward', stageMin: 8, stageMax: 10, tags: ['scale', 'chair', 'bed'] },
  { text: 'redistributes', stageMin: 9, stageMax: 11, tags: ['scale', 'chair', 'bed'] },
  { text: 'required two attempts to shift', stageMin: 10, tags: ['bed', 'chair'] },
  { text: 'was assisted forward by the failure of the furniture', stageMin: 10, tags: ['chair'] },
  { text: 'could not quite locate the floor with her feet', stageMin: 11, tags: ['bed'] },
  { text: 'hops up', stageMin: 0, stageMax: 3, tags: ['scale'] },
  { text: 'steps up', stageMin: 0, stageMax: 6, tags: ['scale'] },
  { text: 'mounts', stageMin: 3, stageMax: 8, tags: ['scale'] },
  { text: 'climbs onto', stageMin: 4, stageMax: 7, tags: ['scale', 'chair'] },
  { text: 'lowers herself onto', stageMin: 5, stageMax: 9, tags: ['scale', 'chair'] },
  { text: 'settles onto', stageMin: 6, stageMax: 11, tags: ['scale', 'chair', 'bed'] },
  { text: 'sinks into', stageMin: 7, stageMax: 11, tags: ['chair', 'bed'] },
  { text: 'descends into', stageMin: 8, stageMax: 11, tags: ['chair'] },
  { text: 'spreads onto', stageMin: 9, stageMax: 11, tags: ['chair', 'bed'] },
  { text: 'arranges herself on', stageMin: 9, stageMax: 11, tags: ['chair', 'bed'] },
  { text: 'claims', stageMin: 5, stageMax: 9, tags: ['chair', 'campus'] },
  { text: 'tests', stageMin: 6, stageMax: 9, tags: ['chair'] },
  { text: 'approaches', stageMin: 0, stageMax: 6, tags: ['scale', 'general'] },
  { text: 'crosses to', stageMin: 3, stageMax: 8, tags: ['scale', 'campus'] },
  { text: 'makes for', stageMin: 2, stageMax: 7, tags: ['scale', 'campus'] },
  { text: 'heads for', stageMin: 0, stageMax: 6, tags: ['scale', 'campus', 'hallway'] },
  { text: 'threads through', stageMin: 4, stageMax: 7, tags: ['hallway', 'campus'] },
  { text: 'parts the crowd', stageMin: 5, stageMax: 8, tags: ['hallway', 'cafeteria'] },
  { text: 'clears a path', stageMin: 6, stageMax: 9, tags: ['hallway', 'cafeteria'] },
  { text: 'displaces the foot traffic', stageMin: 7, stageMax: 9, tags: ['hallway'] },
  { text: 'takes the stairs one at a time', stageMin: 6, stageMax: 9, tags: ['stairwell'] },
  { text: 'grips the railing', stageMin: 6, stageMax: 9, tags: ['stairwell'] },
  { text: 'pauses on each landing', stageMin: 7, stageMax: 9, tags: ['stairwell'] },
  { text: 'waits for the elevator', stageMin: 7, stageMax: 11, tags: ['elevator'] },
  { text: 'fills the elevator', stageMin: 8, stageMax: 11, tags: ['elevator'] },
  { text: 'backs into the booth', stageMin: 5, stageMax: 8, tags: ['cafeteria', 'chair'] },
  { text: 'chooses the reinforced chair', stageMin: 6, stageMax: 10, tags: ['cafeteria', 'chair'] },
  { text: 'tests the desk arm', stageMin: 4, stageMax: 8, tags: ['lecture_hall', 'chair'] },
  { text: 'squeezes into the aisle seat', stageMin: 5, stageMax: 8, tags: ['lecture_hall'] },
  { text: 'claims the end row', stageMin: 6, stageMax: 9, tags: ['lecture_hall'] },
  { text: 'settles into the dorm mirror', stageMin: 5, stageMax: 9, tags: ['dorm_room'] },
  { text: 'crosses the gym floor', stageMin: 3, stageMax: 7, tags: ['gym', 'campus'] },
  { text: 'approaches the equipment', stageMin: 3, stageMax: 7, tags: ['gym'] },
  { text: 'navigates between desks', stageMin: 4, stageMax: 8, tags: ['prof_office'] },
  { text: 'selects the wide chair', stageMin: 5, stageMax: 9, tags: ['prof_office', 'chair'] },
  { text: 'shifts her weight onto the platform', stageMin: 7, stageMax: 11, tags: ['scale'] },
  { text: 'commits her mass to the scale', stageMin: 8, stageMax: 11, tags: ['scale'] },
  { text: 'lets the platform take her', stageMin: 9, stageMax: 11, tags: ['scale'] },
  { text: 'inches forward', stageMin: 8, stageMax: 10, tags: ['general', 'door'] },
  { text: 'surges forward by degrees', stageMin: 9, stageMax: 11, tags: ['general', 'bed'] },
  { text: 'ripples toward', stageMin: 10, stageMax: 11, tags: ['general', 'bed'] },
  { text: 'exists into', stageMin: 10, stageMax: 11, tags: ['door', 'general'] },
  { text: 'arrives by accumulation', stageMin: 10, stageMax: 11, tags: ['general', 'door'] },
  { text: 'advances like weather', stageMin: 8, stageMax: 9, tags: ['general', 'hallway'] },
  { text: 'makes the floor answer', stageMin: 7, stageMax: 9, tags: ['general', 'hallway'] },
  { text: 'crosses space in slow surges', stageMin: 8, stageMax: 9, tags: ['general', 'campus'] },
  { text: 'repositions rather than walks', stageMin: 9, stageMax: 10, tags: ['general', 'dorm_room'] },
  { text: 'settles rather than walks', stageMin: 10, stageMax: 11, tags: ['general', 'bed'] },
  { text: 'moves like geography rearranging', stageMin: 11, tags: ['general', 'bed'] },
  { text: 'drifts through the cafeteria line', stageMin: 3, stageMax: 7, tags: ['cafeteria'] },
  { text: 'balances the tray', stageMin: 4, stageMax: 8, tags: ['cafeteria'] },
  { text: 'carries too much on one tray', stageMin: 5, stageMax: 9, tags: ['cafeteria'] },
  { text: 'sidles into the booth', stageMin: 5, stageMax: 8, tags: ['cafeteria'] },
  { text: 'knows which door to use', stageMin: 7, stageMax: 9, tags: ['campus', 'hallway'] },
  { text: 'takes the long route', stageMin: 7, stageMax: 9, tags: ['campus', 'hallway'] },
  { text: 'has learned which chairs survive', stageMin: 8, stageMax: 11, tags: ['chair', 'campus'] },
];

function buildMovePool(tag) {
  const variants = MOVE_VERB_CORPUS
    .filter((v) => v.tags.includes(tag))
    .map((v) => ({
      when: { stageMin: v.stageMin, ...(v.stageMax != null ? { stageMax: v.stageMax } : {}) },
      weight: v.weight ?? 1,
      text: [v.text],
    }));
  variants.push({ when: {}, text: ['moved', 'went', 'continued'] });
  return variants;
}

const SCENARIO_TAGS = ['general', 'scale', 'door', 'chair', 'bed', 'campus', 'hallway', 'cafeteria', 'stairwell', 'elevator', 'lecture_hall', 'gym', 'dorm_room', 'prof_office'];

for (const tag of SCENARIO_TAGS) {
  registerPool(`word.moveVerb${tag === 'general' ? '' : `.${tag}`}`, buildMovePool(tag));
}
