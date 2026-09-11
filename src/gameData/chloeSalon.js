// ═══════════════════════════════════════════════════════════════
// CHLOÉ — Salon de l'Appétit
// ═══════════════════════════════════════════════════════════════

export const SALON_GUESTS = [
  { id: 'brittany', name: 'Brittany', unlockPrestige: 0, studentId: 0 },
  { id: 'cassidy', name: 'Cassidy', unlockPrestige: 0, studentId: 1 },
  { id: 'kylie', name: 'Kylie', unlockPrestige: 10, studentId: 2 },
  { id: 'rosa', name: 'Chef Rosa', unlockPrestige: 45, faculty: true },
  { id: 'mori', name: 'RA Mori', unlockPrestige: 45, faculty: true },
  { id: 'journalist', name: 'Campus Writer', unlockPrestige: 60 },
  { id: 'platt', name: 'Ms. Platt (AIB)', unlockPrestige: 70, scandal: true },
];

export const SALON_COURSES = [
  { id: 'cheese', label: 'Fromage & Wine', type: 'french', lbs: 4, prestige: 6, indulgence: 8 },
  { id: 'croissant', label: 'Croissant Tower', type: 'french', lbs: 5, prestige: 5, indulgence: 6 },
  { id: 'fried', label: 'American Fried Platter', type: 'american', lbs: 9, prestige: 4, indulgence: 12 },
  { id: 'milkshake', label: 'Milkshake Flight', type: 'american', lbs: 8, prestige: 3, indulgence: 14 },
  { id: 'fusion', label: 'Croissant Burger', type: 'fusion', lbs: 7, prestige: 8, indulgence: 10 },
  { id: 'renée', label: "Reneé's Tasting Menu", type: 'special', lbs: 11, prestige: 12, indulgence: 15, needsGuest: 'renée' },
];

export const SALON_SERVICE_CHOICES = [
  { id: 'charm', label: 'Charm le salon', prestige: 8, chloeLbs: 3, rel: 4 },
  { id: 'feed', label: 'Nourrir Chloé', prestige: 3, chloeLbs: 9, indulgence: 10 },
  { id: 'tandem', label: 'Toast & tandem', prestige: 6, chloeLbs: 6, indulgence: 6, rel: 2 },
  { id: 'linger', label: 'Linger after dessert', prestige: 5, chloeLbs: 5, indulgence: 8, rel: 3 },
];

export function defaultSalonState(chloeStudentId = 9) {
  return {
    chloeStudentId,
    prestige: 0,
    indulgence: 0,
    eveningsHosted: 0,
    guestBook: [],
    scandalFlags: [],
    session: null,
  };
}

export function startSalonSession(state, guestIds = []) {
  return {
    ...state,
    session: {
      phase: 'menu',
      guests: guestIds,
      menuPicks: [],
      serviceLog: [],
      round: 0,
      chloeGain: 0,
      prestigeGain: 0,
      indulgenceGain: 0,
      scrutinyHit: 0,
      log: [`Chloé lights the candles. ${guestIds.length} guests arrive.`],
    },
  };
}

export function salonPickMenu(state, courseId) {
  const session = state.session;
  if (!session || session.phase !== 'menu') return state;
  const course = SALON_COURSES.find((c) => c.id === courseId);
  if (!course) return state;
  const menuPicks = [...session.menuPicks, course];
  const nextPhase = menuPicks.length >= 4 ? 'service' : 'menu';
  return {
    ...state,
    session: {
      ...session,
      menuPicks,
      phase: nextPhase,
      round: 0,
      log: [...session.log, `Menu: ${course.label} selected.`],
    },
  };
}

export function salonServiceChoice(state, choiceId) {
  const session = state.session;
  if (!session || session.phase !== 'service') return state;
  const choice = SALON_SERVICE_CHOICES.find((c) => c.id === choiceId);
  if (!choice) return state;
  const round = session.round + 1;
  const course = session.menuPicks[Math.min(session.menuPicks.length - 1, session.round)] || session.menuPicks[0];
  const chloeGain = session.chloeGain + choice.chloeLbs + (course?.lbs || 0);
  const prestigeGain = session.prestigeGain + choice.prestige + (course?.prestige || 0);
  const indulgenceGain = session.indulgenceGain + (choice.indulgence || 0) + (course?.indulgence || 0);
  const scrutinyHit = session.scrutinyHit + (session.guests.includes('platt') && choice.id === 'feed' ? 6 : 0);
  const logLine = choice.id === 'feed'
    ? `Chloé eats with theatrical pleasure. "*Encore,*" she murmurs.`
    : choice.id === 'charm'
      ? 'She charms the room — wine, wit, and a smile that promises dessert.'
      : choice.id === 'linger'
        ? 'Dessert ends. Chloé does not. Guests stay for one more plate they did not order.'
        : 'A toast, then she eats beside her guests without apology.';
  if (round >= 4) {
    return {
      ...state,
      session: {
        ...session,
        phase: 'digestif',
        round,
        chloeGain,
        prestigeGain,
        indulgenceGain,
        scrutinyHit,
        serviceLog: [...session.serviceLog, choiceId],
        log: [...session.log, logLine],
      },
    };
  }
  return {
    ...state,
    session: {
      ...session,
      round,
      chloeGain,
      prestigeGain,
      indulgenceGain,
      scrutinyHit,
      serviceLog: [...session.serviceLog, choiceId],
      log: [...session.log, logLine],
    },
  };
}

export function salonFinishDigestif(state) {
  const session = state.session;
  if (!session || session.phase !== 'digestif') return { state, done: false };
  const surge = 8 + Math.floor(session.indulgenceGain / 10);
  const finalGain = session.chloeGain + surge;
  const next = {
    ...state,
    prestige: Math.min(100, state.prestige + session.prestigeGain + 5),
    indulgence: Math.min(100, state.indulgence + session.indulgenceGain),
    eveningsHosted: state.eveningsHosted + 1,
    guestBook: [...new Set([...state.guestBook, ...session.guests])],
    session: null,
  };
  return {
    state: next,
    done: true,
    chloeLbs: finalGain,
    prestige: session.prestigeGain,
    scrutiny: session.scrutinyHit,
    log: `La soirée closes. Chloé gained ${finalGain} lbs. Prestige +${session.prestigeGain + 5}.`,
  };
}

// Condensed 6-stage arc (French salon escalation)
export const SALON_EVOLVED_EVENTS = [
  {
    title: 'Première Soirée',
    phases: [
      {
        text: (h, s) => `Chloé's dorm smells of wine and butter. She's ${Math.round(s.lbs)} pounds and has already rearranged the furniture for three guests. "In Paris we are taught to stop," she says, pouring. "Here—" She bites a croissant. "Ici, they teach you to continue."`,
        choices: [
          { id: 'formal', label: 'Keep it formal — cheese, wine, restraint', result: 'She nods. The evening is elegant. Guests leave curious.', lbs: 5, rel: 8, flag: 'formal_opening' },
          { id: 'indulgent', label: 'Push indulgence early — American portions', result: 'Her eyes widen with delight. "*C\'est obscène.*" she says, meaning praise.', lbs: 9, rel: 10, flag: 'indulgent_opening' },
        ],
      },
      {
        text: (h, s) => `The guests linger. Someone asks if she hosts every week. Chloé looks at you over her glass. "If you approves," she says. She's ${Math.round(s.lbs)} pounds and already planning the next menu.`,
        choices: [
          { id: 'weekly', label: 'Approve weekly salons', result: 'She smiles like a woman who got exactly what she wanted.', lbs: 4, rel: 12, flag: 'weekly_salon' },
          { id: 'special', label: 'Special occasions only', result: 'She pouts once, then shrugs. "Special can mean frequent."', lbs: 3, rel: 7 },
        ],
      },
    ],
    endings: [
      { condition: (h) => h.includes('indulgent_opening') && h.includes('weekly_salon'), text: (h, s, gain) => `${s.name} is ${Math.round(s.lbs + gain)} pounds. The first salon is legend on a whisper. Time to host another.`, gainBonus: 6, relBonus: 12, startsSalon: true },
      { condition: () => true, text: (h, s, gain) => `${s.name} is ${Math.round(s.lbs + gain)} pounds. Première soirée complete. The guest list grows.`, gainBonus: 3, relBonus: 8, startsSalon: true },
    ],
  },
  {
    title: 'Staff Drift',
    phases: [
      {
        text: (h, s) => `RA Mori follows the smell of coq au vin to Chloé's door. She's ${Math.round(s.lbs)} pounds, hostess in black silk, and doesn't pretend surprise. "You may stay for dessert."`,
        choices: [
          { id: 'welcome', label: 'Welcome Mori — staff lends prestige', result: 'Mori stays. Takes notes. Eats more than she admits.', lbs: 6, rel: 9, flag: 'mori_regular' },
          { id: 'private', label: 'Keep it resident-only tonight', result: 'Mori leaves a card. Chloé pins it to the corkboard.', lbs: 4, rel: 6 },
        ],
      },
      {
        text: (h, s) => `Word spreads through the food-science wing. Chloé is ${Math.round(s.lbs)} pounds and unbothered. "They talk," she says. "Good. Let them arrive hungry."`,
        choices: [
          { id: 'expand', label: 'Expand the guest list', result: 'Four chairs become six. The wine flows faster.', lbs: 8, rel: 10, flag: 'expanded' },
          { id: 'curate', label: 'Curate carefully — exclusivity', result: 'Invitations become coveted. Prestige rises.', lbs: 5, rel: 11, flag: 'curated' },
        ],
      },
    ],
    endings: [
      { condition: (h) => h.includes('mori_regular'), text: (h, s, gain) => `Staff knows. ${s.name} is ${Math.round(s.lbs + gain)} pounds and the salon has a reputation.`, gainBonus: 5, relBonus: 10, startsSalon: true },
      { condition: () => true, text: (h, s, gain) => `${s.name} is ${Math.round(s.lbs + gain)} pounds. Campus murmurs begin.`, gainBonus: 3, relBonus: 7, startsSalon: true },
    ],
  },
  {
    title: 'Campus Murmur',
    phases: [
      {
        text: (h, s) => `"Chloé's dinners" appears in a group chat you're not in. Chloé reads it aloud, amused. She's ${Math.round(s.lbs)} pounds and pours more wine.`,
        choices: [
          { id: 'lean_in', label: 'Lean into the rumor', result: 'She posts a photo — candles, empty plates, her smile.', lbs: 7, rel: 8, flag: 'publicity' },
          { id: 'mystery', label: 'Keep it mysterious', result: 'No posts. Only whispers. The line gets longer.', lbs: 5, rel: 10, flag: 'mystery' },
        ],
      },
      {
        text: (h, s) => `A journalist from the campus paper requests an interview. Chloé is ${Math.round(s.lbs)} pounds and says: "They may watch me eat. That is also a kind of menu."`,
        choices: [
          { id: 'interview', label: 'Allow the interview at a salon', result: 'The writer attends. Leaves flushed and taking notes.', lbs: 9, rel: 11, flag: 'press' },
          { id: 'decline', label: 'Decline — salons stay private', result: 'The piece runs anyway. Vague, hungry, accurate.', lbs: 4, rel: 7 },
        ],
      },
    ],
    endings: [
      { condition: (h) => h.includes('press'), text: (h, s, gain) => `Press attended. ${s.name} is ${Math.round(s.lbs + gain)} pounds. The salon is campus lore.`, gainBonus: 8, relBonus: 12, startsSalon: true },
      { condition: () => true, text: (h, s, gain) => `${s.name} is ${Math.round(s.lbs + gain)} pounds. Murmur becomes myth.`, gainBonus: 4, relBonus: 8, startsSalon: true },
    ],
  },
  {
    title: "The Journalist's Notebook",
    phases: [
      {
        text: (h, s) => `The journalist returns — not for quotes, for seconds. Chloé is ${Math.round(s.lbs)} pounds, hosting in candlelight, and feeds her guest while being fed. "Write that down," she says.`,
        choices: [
          { id: 'performance', label: 'Make it a performance dinner', result: 'Every course is documented. Chloé performs appetite.', lbs: 11, rel: 10, flag: 'performance' },
          { id: 'intimate', label: 'Keep it intimate — no cameras', result: 'The writer describes the smell. Readers arrive hungry.', lbs: 7, rel: 12, flag: 'intimate' },
        ],
      },
      {
        text: (h, s) => `The piece publishes: *A Transfer's Salon of Excess*. Chloé is ${Math.round(s.lbs)} pounds and reads it twice. "They call me dangerous," she says, pleased.`,
        choices: [
          { id: 'celebrate', label: 'Celebrate with a feast', result: 'Champagne. Fried things. No regrets.', lbs: 12, rel: 9, flag: 'celebrate' },
          { id: 'rooftop', label: 'Plan the rooftop salon', result: 'She books the roof. Starts a menu in French.', lbs: 6, rel: 11, flag: 'rooftop_planned' },
        ],
      },
    ],
    endings: [
      { condition: (h) => h.includes('rooftop_planned'), text: (h, s, gain) => `Rooftop booked. ${s.name} is ${Math.round(s.lbs + gain)} pounds. The city will watch.`, gainBonus: 7, relBonus: 13, startsSalon: true },
      { condition: () => true, text: (h, s, gain) => `${s.name} is ${Math.round(s.lbs + gain)} pounds. The article circulates.`, gainBonus: 5, relBonus: 9, startsSalon: true },
    ],
  },
  {
    title: 'Rooftop Under Stars',
    phases: [
      {
        text: (h, s) => `The rooftop salon: string lights, wine, ten guests. Chloé is ${Math.round(s.lbs)} pounds in silk that clings where she's grown fullest. Protesters below chant wellness slogans. She raises her glass.`,
        choices: [
          { id: 'ignore', label: 'Ignore the protest — feed the room', result: 'She eats while they chant. The room applauds.', lbs: 10, rel: 12, flag: 'defiant' },
          { id: 'invite_up', label: 'Invite a protester up', result: 'One climbs the stairs. Leaves with a full plate and confusion.', lbs: 8, rel: 10, flag: 'convert' },
        ],
      },
      {
        text: (h, s) => `Scrutiny watches. Chloé is ${Math.round(s.lbs)} pounds and doesn't shrink. "They fear appetite," she tells you. "Good. I specialize in it."`,
        choices: [
          { id: 'scandal', label: 'Embrace scandal — invite AIB', result: 'Ms. Platt attends. Eats. Looks troubled.', lbs: 9, rel: 8, flag: 'aib_guest' },
          { id: 'discreet', label: 'Stay discreet', result: 'Guest list tightens. Quality rises.', lbs: 6, rel: 11 },
        ],
      },
    ],
    endings: [
      { condition: (h) => h.includes('aib_guest'), text: (h, s, gain) => `AIB witnessed the rooftop. ${s.name} is ${Math.round(s.lbs + gain)} pounds. Scandalous. Magnificent.`, gainBonus: 9, relBonus: 10, startsSalon: true },
      { condition: () => true, text: (h, s, gain) => `Rooftop night ends. ${s.name} is ${Math.round(s.lbs + gain)} pounds. Stars and crumbs.`, gainBonus: 6, relBonus: 11, startsSalon: true },
    ],
  },
  {
    title: 'La Grande Soirée',
    phases: [
      {
        text: (h, s) => `Twelve settings. Twelve place cards. Chloé is ${Math.round(s.lbs)} pounds and welcomes them in French, then English, then mostly with her hands on her own waist. "Tonight," she says, "we do not stop."`,
        choices: [
          { id: 'grand_menu', label: 'Serve the grand menu', result: 'Four courses. Seconds. A digestif that never ends.', lbs: 14, rel: 14, flag: 'grand_menu' },
          { id: 'surprise', label: 'Surprise tasting — chef collaboration', result: 'Reneé appears with trays. The room moans.', lbs: 16, rel: 12, flag: 'chef_collab' },
        ],
      },
      {
        text: (h, s) => `She eats like a hostess performing appetite for an audience that has stopped pretending they're not watching. Chloé is ${Math.round(s.lbs)} pounds. Someone applauds. She curtsies without standing.`,
        choices: [
          { id: 'encore', label: 'Lead the room in "encore"', result: '"*Encore,*" they chant. She delivers.', lbs: 12, rel: 15, flag: 'encore' },
          { id: 'private', label: 'Private digestif with you', result: 'The room fades. One more bottle. One more plate.', lbs: 10, rel: 16, flag: 'private_close' },
        ],
      },
    ],
    endings: [
      { condition: (h) => h.includes('grand_menu') && h.includes('encore'), text: (h, s, gain) => `La Grande Soirée. ${s.name} is ${Math.round(s.lbs + gain)} pounds. Reine du salon. The semester bends around her table.`, gainBonus: 18, relBonus: 18, startsSalon: true },
      { condition: () => true, text: (h, s, gain) => `${s.name} is ${Math.round(s.lbs + gain)} pounds. The salon is legend. *Merci. Maintenant — encore.*`, gainBonus: 12, relBonus: 14, startsSalon: true },
    ],
  },
];
