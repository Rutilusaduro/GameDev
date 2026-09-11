// ═══════════════════════════════════════════════════════════════
// FIONA — Artisan Gallery of Abundance
// ═══════════════════════════════════════════════════════════════

export const GALLERY_MOTIFS = [
  { id: 'abundance', label: 'Abundance', lbsMult: 1.1, scrutiny: 2 },
  { id: 'still_life', label: 'Still Life', relBonus: 3, scrutiny: 0 },
  { id: 'portrait', label: 'Portrait', corruption: 2, scrutiny: 1 },
  { id: 'performance', label: 'Performance', lbsMult: 1.15, scrutiny: 4 },
  { id: 'nocturne', label: 'Nocturne', lbsMult: 1.08, relBonus: 2, scrutiny: 1 },
];

export const GALLERY_ZONES = ['belly', 'bust', 'hips', 'full'];

export const GALLERY_MEDIUMS = [
  { id: 'butter', label: 'Butter & Oils' },
  { id: 'cream', label: 'Cream' },
  { id: 'chocolate', label: 'Chocolate' },
  { id: 'pastry', label: 'Pastry' },
  { id: 'night_kitchen', label: 'Night Kitchen Light' },
];

export const FIELD_LOCATIONS = [
  { id: 'quad', label: 'The Quad', tag: 'candid', quality: 'Study' },
  { id: 'dining_hall', label: 'Dining Hall', tag: 'documentary', quality: 'Print' },
  { id: 'food_court', label: 'Food Court', tag: 'street', quality: 'Study' },
  { id: 'gym', label: 'Gym Aftermath', tag: 'contrast', quality: 'Print' },
  { id: 'faculty_lounge', label: 'Staff Lounge', tag: 'scandal', quality: 'Masterwork', scrutiny: 5 },
  { id: 'night_wing', label: 'Night Wing', tag: 'afterhours', quality: 'Print', scrutiny: 2 },
];

export const STUDIO_ACTIONS = [
  { id: 'feed_subject', label: 'Feed model', subjectLbs: 8, fionaLbs: 0, quality: 'Print' },
  { id: 'feed_together', label: 'Feed together', subjectLbs: 5, fionaLbs: 4, quality: 'Study' },
  { id: 'shoot_only', label: 'Shoot only', subjectLbs: 0, fionaLbs: 0, quality: 'Masterwork' },
  { id: 'direct_feed', label: 'Direct & feed', subjectLbs: 11, fionaLbs: 3, quality: 'Masterwork' },
  { id: 'night_still', label: 'Still after hours', subjectLbs: 6, fionaLbs: 2, quality: 'Print' },
];

export const CRITIC_TIERS = [
  { id: 'reverent', label: 'Reverent', patrons: 8, scrutiny: 0 },
  { id: 'provocative', label: 'Provocative', patrons: 12, scrutiny: 3 },
  { id: 'scandalous', label: 'Scandalous', patrons: 20, scrutiny: 8 },
];

export function defaultGalleryState(fionaStudentId = 4) {
  return {
    fionaStudentId,
    patrons: 0,
    scrutinyHeat: 0,
    subjects: [],
    fieldArchive: [],
    exhibitionsHeld: 0,
    printsSold: 0,
    session: null,
    subjectPickerOpen: false,
  };
}

export function enrollSubject(state, studentId, studentName) {
  if (state.subjects.length >= 3) return { state, ok: false, reason: 'Max 3 models.' };
  if (state.subjects.some((s) => s.studentId === studentId)) return { state, ok: false, reason: 'Already enrolled.' };
  return {
    state: {
      ...state,
      subjects: [
        ...state.subjects,
        { studentId, name: studentName, weekStarted: 0, sessions: 0, photos: [], consentTier: 'asked' },
      ],
    },
    ok: true,
  };
}

export function startStudioSession(state, subjectId, setup = {}) {
  const subject = state.subjects.find((s) => s.studentId === subjectId);
  if (!subject) return state;
  return {
    ...state,
    session: {
      type: 'studio',
      subjectId,
      phase: 'feed',
      round: 0,
      setup,
      subjectGain: 0,
      fionaGain: 0,
      frames: [],
      log: [`Studio session with ${subject.name}. Motif: ${setup.motif || 'portrait'}.`],
    },
  };
}

export function studioAction(state, actionId, extras = {}) {
  const session = state.session;
  if (!session || session.type !== 'studio') return state;
  const action = STUDIO_ACTIONS.find((a) => a.id === actionId);
  if (!action) return state;
  const round = session.round + 1;
  const subjectGain = session.subjectGain + action.subjectLbs;
  const fionaGain = session.fionaGain + action.fionaLbs;
  const frames = [...session.frames, action.quality];
  const logLine = action.id === 'direct_feed'
    ? 'Fiona directs the bite and captures the moment the fullness shows.'
    : action.id === 'feed_together'
      ? 'Fiona eats from the same tray, camera dangling, unashamed.'
      : action.id === 'shoot_only'
        ? 'She shoots without feeding — hunger in the frame.'
        : action.id === 'night_still'
          ? 'After hours. Fridge light. The shutter is quieter than her swallow.'
          : 'Model fed. Shutter clicks.';
  if (round >= 3) {
    const critic = CRITIC_TIERS[Math.floor(Math.random() * CRITIC_TIERS.length)];
    const motif = GALLERY_MOTIFS.find((m) => m.id === session.setup?.motif);
    const lbsMult = motif?.lbsMult || 1;
    const nightStill = action.id === 'night_still' || session.log.some((line) => /After hours/.test(line));
    const extra = nightStill ? 2 : 0;
    const subjectLbs = Math.round(subjectGain * lbsMult) + extra;
    const fionaLbs = Math.round(fionaGain * lbsMult) + (nightStill ? 1 : 0);
    const leftoverPatrons = extras.leftoverKitchen ? 2 : 0;
    const nightPatrons = extras.nightRound ? 1 : 0;
    return {
      ...state,
      patrons: Math.min(100, state.patrons + critic.patrons + (motif?.relBonus || 0) + leftoverPatrons + nightPatrons),
      scrutinyHeat: state.scrutinyHeat + critic.scrutiny + (motif?.scrutiny || 0),
      subjects: state.subjects.map((s) => {
        if (s.studentId !== session.subjectId) return s;
        return {
          ...s,
          sessions: s.sessions + 1,
          photos: [...s.photos, { quality: action.quality, week: s.sessions + 1 }],
        };
      }),
      fieldArchive: [...state.fieldArchive, { id: `studio-${Date.now()}`, location: 'studio', tag: 'portrait', quality: action.quality, caption: 'Studio progression' }],
      session: null,
      lastCritic: critic.label,
      pendingGains: { subjectId: session.subjectId, subjectLbs, fionaLbs, scrutiny: critic.scrutiny + (motif?.scrutiny || 0) },
      sessionLog: [...session.log, logLine, `Critic: ${critic.label}.`],
    };
  }
  return {
    ...state,
    session: {
      ...session,
      round,
      subjectGain,
      fionaGain,
      frames,
      log: [...session.log, logLine],
    },
  };
}

export function runFieldShoot(state, locationId) {
  const loc = FIELD_LOCATIONS.find((l) => l.id === locationId) || FIELD_LOCATIONS[0];
  const entry = {
    id: `field-${Date.now()}`,
    location: loc.id,
    label: loc.label,
    tag: loc.tag,
    quality: loc.quality,
    caption: `Abundance observed — ${loc.label}`,
  };
  return {
    state: {
      ...state,
      fieldArchive: [...state.fieldArchive, entry],
      patrons: Math.min(100, state.patrons + 4),
      scrutinyHeat: state.scrutinyHeat + (loc.scrutiny || 0),
    },
    scrutiny: loc.scrutiny || 0,
    log: `Field shoot: ${loc.label}. ${loc.quality} frame archived.`,
  };
}

export function mountExhibition(state, theme = 'documentary') {
  if (state.fieldArchive.length < 4) return { state, ok: false, reason: 'Need at least 4 archived pieces.' };
  const scrutiny = theme === 'confrontational' ? 10 : theme === 'celebratory' ? 4 : 2;
  const patrons = theme === 'scandal' ? 22 : 12;
  return {
    state: {
      ...state,
      exhibitionsHeld: state.exhibitionsHeld + 1,
      patrons: Math.min(100, state.patrons + patrons),
      scrutinyHeat: state.scrutinyHeat + scrutiny,
      printsSold: state.printsSold + 3,
    },
    ok: true,
    scrutiny,
    money: 120 + patrons * 2,
    fionaLbs: 5 + Math.floor(patrons / 4),
    log: `Opening night (${theme}). Gallery packed. Patrons +${patrons}.`,
  };
}

export const GALLERY_EVOLVED_EVENTS = [
  {
    title: 'First Model',
    phases: [
      {
        text: (h, s) => `Fiona pins the first contact sheet to *In Progress*. A resident, mid-bite, mid-laugh. Fiona is ${Math.round(s.lbs)} pounds and says: "The subject cooperates. The camera doesn't lie."`,
        choices: [
          { id: 'enroll', label: 'Enroll the first official model', result: 'Release forms become art contracts. Everyone signs.', lbs: 4, rel: 10, flag: 'first_subject' },
          { id: 'candid', label: 'Start with candid field work only', result: 'She shoots from the hip. The quad yields gold.', lbs: 3, rel: 8, flag: 'field_first' },
          { id: 'night_door', label: 'Shoot the first night-round door', result: 'Fridge light, a resident mid-bite. Fiona pins it as proof.', lbs: 5, rel: 9, flag: 'night_first' },
        ],
      },
      {
        text: (h, s) => `The studio smells of paint and butter. Fiona is ${Math.round(s.lbs)} pounds, editing frames. "I want a wall of proof," she says.`,
        choices: [
          { id: 'wall', label: 'Help her hang the first wall', result: 'Thumbtacks, twine, bodies at every stage.', lbs: 5, rel: 9, flag: 'wall_up' },
          { id: 'wait', label: 'Wait for a stronger series', result: 'She nods. Shoots more. Eats while she shoots.', lbs: 6, rel: 7 },
          { id: 'feed_frame', label: 'Feed her while she hangs', result: 'One hand on the print. One hand on the plate. The wall goes up full.', lbs: 7, rel: 8, flag: 'wall_up' },
        ],
      },
    ],
    endings: [
      { condition: (h) => h.includes('first_subject') && h.includes('wall_up'), text: (h, s, gain) => `${s.name} is ${Math.round(s.lbs + gain)} pounds. First model enrolled. First wall hung.`, gainBonus: 5, relBonus: 11, startsGallery: true },
      { condition: () => true, text: (h, s, gain) => `${s.name} is ${Math.round(s.lbs + gain)} pounds. The archive begins.`, gainBonus: 3, relBonus: 7, startsGallery: true },
    ],
  },
  {
    title: 'Field Roll',
    phases: [
      {
        text: (h, s) => `Fiona walks the quad with a camera and hunger. She's ${Math.round(s.lbs)} pounds and photographs a stranger's softness without asking — then does ask, and gets a shy yes.`,
        choices: [
          { id: 'consent', label: 'Insist on consent going forward', result: 'Release forms become part of the art.', lbs: 3, rel: 10, flag: 'consent_strict' },
          { id: 'bold', label: 'Bold shots sell — embrace scandal', result: 'She pins a risky print. Patrons notice.', lbs: 5, rel: 6, flag: 'scandal_embraced' },
        ],
      },
      {
        text: (h, s) => `The field archive grows. Fiona is ${Math.round(s.lbs)} pounds. "Abundance is everywhere," she says. "They just don't frame it."`,
        choices: [
          { id: 'dining', label: 'Shoot the dining hall regulars', result: 'Documentary series: *Regulars.*', lbs: 6, rel: 8, flag: 'dining_series' },
          { id: 'faculty', label: 'Risk the staff lounge', result: 'Coach Brooks in frame. Scandalous.', lbs: 4, rel: 7, flag: 'faculty_shot' },
        ],
      },
    ],
    endings: [
      { condition: (h) => h.includes('scandal_embraced'), text: (h, s, gain) => `Scandalous field work. ${s.name} is ${Math.round(s.lbs + gain)} pounds. Patrons line up.`, gainBonus: 6, relBonus: 9, startsGallery: true },
      { condition: () => true, text: (h, s, gain) => `${s.name} is ${Math.round(s.lbs + gain)} pounds. Field archive rich.`, gainBonus: 4, relBonus: 8, startsGallery: true },
    ],
  },
  {
    title: 'Wall of Proof',
    phases: [
      {
        text: (h, s) => `Opening night: eight prints, wine, cheese. Fiona is ${Math.round(s.lbs)} pounds in linen that won't survive the evening. Critics arrive.`,
        choices: [
          { id: 'reverent', label: 'Reverent tone — art world speak', result: '"Uncomfortably generous." She pins the review.', lbs: 5, rel: 10, flag: 'reverent_opening' },
          { id: 'confrontational', label: 'Confrontational — bodies as politics', result: 'Campus paper attends. AIB telegraph.', lbs: 7, rel: 7, flag: 'confrontational' },
        ],
      },
      {
        text: (h, s) => `The room talks while Fiona eats in the corner — deliberately, publicly. She's ${Math.round(s.lbs)} pounds and the performance is the point.`,
        choices: [
          { id: 'eat', label: 'Eat through the critique', result: 'Fork in hand. Eye contact. Silence breaks.', lbs: 9, rel: 9, flag: 'performance_eat' },
          { id: 'speak', label: 'Give an artist statement', result: '"The body is the only honest medium."', lbs: 4, rel: 11, flag: 'statement' },
        ],
      },
    ],
    endings: [
      { condition: (h) => h.includes('confrontational'), text: (h, s, gain) => `Confrontational opening. ${s.name} is ${Math.round(s.lbs + gain)} pounds. Scrutiny rises. Patrons soar.`, gainBonus: 8, relBonus: 10, startsGallery: true },
      { condition: () => true, text: (h, s, gain) => `${s.name} is ${Math.round(s.lbs + gain)} pounds. First exhibition a success.`, gainBonus: 5, relBonus: 9, startsGallery: true },
    ],
  },
  {
    title: 'The Living Room',
    phases: [
      {
        text: (h, s) => `The featured model stands beside their timeline — stage three, stage five, live and heavier still. Fiona is ${Math.round(s.lbs)} pounds and introduces them: "The work continues. She continues."`,
        choices: [
          { id: 'feature', label: 'Let the model speak', result: 'Shy words. Loud applause. More food.', lbs: 6, rel: 12, flag: 'subject_speaks' },
          { id: 'feed_live', label: 'Feed the model live', result: 'Grapes, cream, cameras. The crowd hushes.', lbs: 10, rel: 10, flag: 'live_feed' },
        ],
      },
      {
        text: (h, s) => `A patron offers commission. Fiona is ${Math.round(s.lbs)} pounds and already planning the next model.`,
        choices: [
          { id: 'accept', label: 'Accept the commission', result: '$300 and a waiting list.', lbs: 4, rel: 8, flag: 'commission' },
          { id: 'selective', label: 'Stay selective', result: 'Prestige rises. Lines form.', lbs: 3, rel: 10, flag: 'selective' },
        ],
      },
    ],
    endings: [
      { condition: (h) => h.includes('live_feed'), text: (h, s, gain) => `Living Room opening. ${s.name} is ${Math.round(s.lbs + gain)} pounds. Legendary.`, gainBonus: 10, relBonus: 13, startsGallery: true },
      { condition: () => true, text: (h, s, gain) => `${s.name} is ${Math.round(s.lbs + gain)} pounds. Living installation complete.`, gainBonus: 6, relBonus: 10, startsGallery: true },
    ],
  },
  {
    title: 'Regional Interest',
    phases: [
      {
        text: (h, s) => `An email from a regional gallery. They want the series. Fiona is ${Math.round(s.lbs)} pounds and reads it twice.`,
        choices: [
          { id: 'travel', label: 'Plan the traveling show', result: 'Crates, prints, scrutiny.', lbs: 5, rel: 9, flag: 'travel_show' },
          { id: 'stay', label: 'Stay campus-focused', result: 'Local myth deepens.', lbs: 6, rel: 11, flag: 'local' },
        ],
      },
      {
        text: (h, s) => `AIB notices the mailing list. Fiona is ${Math.round(s.lbs)} pounds. "Evidence," they call it. She calls it *archive.*`,
        choices: [
          { id: 'hide', label: 'Move sensitive prints off-site', result: 'Scandal meter cools slightly.', lbs: 3, rel: 8, flag: 'hide_prints' },
          { id: 'double_down', label: 'Double down — publish online', result: 'Patrons explode. So does scrutiny.', lbs: 7, rel: 6, flag: 'publish' },
        ],
      },
    ],
    endings: [
      { condition: (h) => h.includes('publish'), text: (h, s, gain) => `Published online. ${s.name} is ${Math.round(s.lbs + gain)} pounds. The internet hungry.`, gainBonus: 7, relBonus: 8, startsGallery: true },
      { condition: () => true, text: (h, s, gain) => `${s.name} is ${Math.round(s.lbs + gain)} pounds. Regional interest secured.`, gainBonus: 5, relBonus: 9, startsGallery: true },
    ],
  },
  {
    title: 'Permanent Collection',
    phases: [
      {
        text: (h, s) => `A museum wants the series permanently. Fiona is ${Math.round(s.lbs)} pounds and touches the acceptance letter like a texture study.`,
        choices: [
          { id: 'accept_museum', label: 'Accept — permanent collection', result: 'Her name on a wall. Bodies on a wall. Same thing.', lbs: 5, rel: 12, flag: 'museum' },
          { id: 'negotiate', label: 'Negotiate for living model clause', result: 'Future openings mandatory. She smiles.', lbs: 6, rel: 10, flag: 'living_clause' },
        ],
      },
      {
        text: (h, s) => `The gallery is no longer a project. It's an institution. Fiona is ${Math.round(s.lbs)} pounds and still shooting, still feeding, still pinning.`,
        choices: [
          { id: 'legacy', label: 'Launch the legacy program', result: 'New models every semester. Forever.', lbs: 8, rel: 11, flag: 'legacy' },
          { id: 'retrospective', label: 'Retrospective on herself too', result: 'Self-portraits join the wall. Full circle.', lbs: 9, rel: 9, flag: 'self_included' },
        ],
      },
    ],
    endings: [
      { condition: (h) => h.includes('museum') && h.includes('legacy'), text: (h, s, gain) => `Permanent collection. Legacy program. ${s.name} is ${Math.round(s.lbs + gain)} pounds. The Artisan Gallery endures.`, gainBonus: 12, relBonus: 15, startsGallery: true },
      { condition: () => true, text: (h, s, gain) => `${s.name} is ${Math.round(s.lbs + gain)} pounds. Museum-grade. Institution made flesh.`, gainBonus: 8, relBonus: 12, startsGallery: true },
    ],
  },
];
