// ═══════════════════════════════════════════════════════════════
// CAMPUS SECRETS — progressive puzzle chain → Relic Hunter
// ═══════════════════════════════════════════════════════════════

export const CAMPUS_SECRETS = [
  {
    id: 'archive_carrel',
    nodeId: 'library',
    label: 'Misfiled Archive Carrel',
    emoji: '📚',
    hint: 'The third floor has a carrel that was never on any floor plan.',
    requires: [],
    campusTierMin: 0,
    solve: 'search',
    discover: 'You find a carrel wedged behind rolling stacks — dust thick, chair still warm from someone recent.',
    reward: { findId: 'archive_herb' },
  },
  {
    id: 'greenhouse_shed',
    nodeId: 'garden',
    label: 'Locked Greenhouse Shed',
    emoji: '🌿',
    hint: 'The botanical garden keeps a shed that students pretend not to notice.',
    requires: [],
    campusTierMin: 0,
    solve: 'search',
    discover: 'A shed door yields to a loose hasp. Inside: specimen jars, field notes, and boot prints in potting soil.',
    reward: { findId: 'find_honey_tart' },
  },
  {
    id: 'theater_trap',
    nodeId: 'theater',
    label: 'Trap Door Rehearsal Mark',
    emoji: '🎭',
    hint: 'Stage tape hides more than blocking notes.',
    requires: [],
    campusTierMin: 0,
    solve: 'observe',
    observeCount: 2,
    discover: 'On your second careful pass, you spot tape forming an X over a seam in the stage — a maintenance hatch.',
    reward: { findId: 'theater_costume_dye' },
  },
  {
    id: 'lab_cold_room',
    nodeId: 'science_wing',
    label: 'Unlisted Cold Room',
    emoji: '🔬',
    hint: 'Lab 3C has a door that does not appear on the safety map.',
    requires: ['archive_carrel'],
    campusTierMin: 0,
    solve: 'search',
    discover: 'Behind a rolling cart: a cold room with older campus logos on the equipment. Samples labeled with dates from before the renovation.',
    reward: { findId: 'science_precursor_jar' },
  },
  {
    id: 'rooftop_rune',
    nodeId: 'rooftop',
    label: 'Rooftop Survey Marker',
    emoji: '🌆',
    hint: 'Administration keeps a key for a reason.',
    requires: ['lab_cold_room'],
    campusTierMin: 0,
    solve: 'search',
    discover: 'A survey bolt under the HVAC housing bears scratched coordinates — and a symbol repeated in three other places you have seen.',
    reward: { findId: 'campus_berries' },
  },
  {
    id: 'arts_hidden_studio',
    nodeId: 'arts_wing',
    label: 'Hidden Studio Alcove',
    emoji: '🎨',
    hint: 'Sculpture storage is deeper than the hallway suggests.',
    requires: ['greenhouse_shed'],
    campusTierMin: 0,
    solve: 'search',
    discover: 'Canvas stacks hide a narrow alcove — sketches of campus tunnels, drawn with obsessive care.',
    reward: { findId: 'archive_herb' },
  },
  {
    id: 'union_old_flyer',
    nodeId: 'student_union',
    label: 'Palimpsest Flyer Layer',
    emoji: '🏢',
    hint: 'Peel back the wellness posters.',
    requires: ['theater_trap'],
    campusTierMin: 0,
    solve: 'search',
    discover: 'Underneath a pastel wellness flyer: an archaeology club map, half torn, pointing toward "OLD STACKS."',
    reward: { findId: 'union_samples' },
  },
  {
    id: 'gym_tunnel_grate',
    nodeId: 'gym',
    label: 'Maintenance Tunnel Grate',
    emoji: '🏋️',
    hint: 'The rec center was built over older infrastructure.',
    requires: ['arts_hidden_studio'],
    campusTierMin: 0,
    solve: 'search',
    discover: 'A loose grate behind the weight racks opens on a crawlspace — chalk arrows, student height, leading east.',
    reward: { findId: 'tunnel_fungus' },
  },
  {
    id: 'dining_cellar',
    nodeId: 'dining_hall',
    label: 'Pre-Renovation Cellar',
    emoji: '🍽️',
    hint: 'The dining hall predates the all-you-can-eat expansion.',
    requires: ['union_old_flyer'],
    campusTierMin: 1,
    solve: 'search',
    discover: 'A service stair behind dry storage descends to a brick cellar — older serving lines, newer snack stashes hidden in the dark.',
    reward: { findId: 'find_comfort_loaf' },
  },
  {
    id: 'library_basement',
    nodeId: 'library',
    label: 'Sealed Library Basement',
    emoji: '🔓',
    hint: 'Seven marks. One door. Someone else got here first.',
    requires: ['gym_tunnel_grate', 'dining_cellar', 'rooftop_rune'],
    minSecretsSolved: 7,
    campusTierMin: 0,
    solve: 'search',
    discover: 'The basement door opens on a floodlit corridor — and a girl with a headlamp, mud on her boots, looking up like you are the puzzle she has been waiting for.',
    reward: { discoverElara: true },
  },
];

const SECRET_BY_ID = Object.fromEntries(CAMPUS_SECRETS.map(s => [s.id, s]));

export function getCampusSecret(id) {
  return SECRET_BY_ID[id] || null;
}

export function secretsSolvedCount(exploration) {
  return exploration?.secretsSolved?.length ?? 0;
}

export function isSecretSolved(exploration, secretId) {
  return exploration?.secretsSolved?.includes(secretId) ?? false;
}

export function secretRequirementsMet(secret, exploration, ctx) {
  if (!secret || isSecretSolved(exploration, secret.id)) return false;
  if ((ctx.campusTier ?? 0) < (secret.campusTierMin ?? 0)) return false;
  if ((secret.minSecretsSolved ?? 0) > secretsSolvedCount(exploration)) return false;
  for (const req of secret.requires || []) {
    if (!isSecretSolved(exploration, req)) return false;
  }
  if (secret.campusStageMin && (ctx.sophiaStage ?? 1) < secret.campusStageMin) return false;
  return true;
}

/** Secrets the player can attempt at this node right now. */
export function availableSecretsAtNode(nodeId, exploration, ctx) {
  return CAMPUS_SECRETS.filter(s =>
    s.nodeId === nodeId && secretRequirementsMet(s, exploration, ctx)
  );
}

export function nextSecretHint(exploration, ctx) {
  const unsolved = CAMPUS_SECRETS.filter(s => !isSecretSolved(exploration, s.id));
  const ready = unsolved.filter(s => secretRequirementsMet(s, exploration, ctx));
  if (ready.length) return ready[0];
  const almost = unsolved.find(s => {
    const reqs = s.requires || [];
    const done = reqs.filter(r => isSecretSolved(exploration, r)).length;
    return done > 0 && done < reqs.length;
  });
  return almost || unsolved[0] || null;
}
