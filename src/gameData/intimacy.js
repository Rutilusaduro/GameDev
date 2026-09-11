// Intimacy scenes — metadata in intimacyData.js; prose in textEngine/scenes/intimacy/.
export {
  INTIMACY_SCENES,
  INTIMACY_CONTEXTUAL,
  evalIntimacyEndingCondition,
} from './intimacyData.js';

export function extraIntimacyChoices(owned = {}) {
  const extras = [];
  if (owned.oversized_linens) {
    extras.push({
      id: 'linens_nest',
      label: 'Pull the oversized linens around you both',
      lbs: 2,
      rel: 3,
      flag: 'linens_nest',
      result: (s) => `${s.name} drags the big linens over both of you. Warmth. Weight. Nowhere else to be.`,
    });
  }
  if (owned.blackout_curtains) {
    extras.push({
      id: 'curtain_dark',
      label: 'Draw the blackout curtains and stay',
      lbs: 1,
      rel: 4,
      flag: 'curtain_dark',
      result: (s) => `${s.name} lets the dark settle. Her body is the only map left in the room.`,
    });
  }
  return extras.slice(0, 1);
}

export function intimacyChoicesForPhase(phase, owned = {}) {
  return [...(phase?.choices || []), ...extraIntimacyChoices(owned)];
}
