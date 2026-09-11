// ═══════════════════════════════════════════════════════════════
// CHLOÉ — Salon de l'Appétit
// ═══════════════════════════════════════════════════════════════

import { depthLbsGrant, depthMetaProgressBonus } from './mechanicsDepthLayer.js';

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
  const surge = depthLbsGrant(8 + Math.floor(session.indulgenceGain / 10));
  const finalGain = depthLbsGrant(session.chloeGain + surge);
  const prestigeBump = depthMetaProgressBonus(session.prestigeGain + 5);
  const next = {
    ...state,
    prestige: Math.min(100, state.prestige + prestigeBump),
    indulgence: Math.min(100, state.indulgence + session.indulgenceGain),
    eveningsHosted: state.eveningsHosted + 1,
    guestBook: [...new Set([...state.guestBook, ...session.guests])],
    session: null,
  };
  return {
    state: next,
    done: true,
    chloeLbs: finalGain,
    prestige: prestigeBump,
    scrutiny: session.scrutinyHit,
    log: `La soirée closes. Chloé gained ${finalGain} lbs. Prestige +${session.prestigeGain + 5}.`,
  };
}

// Condensed 6-stage arc (French salon escalation)
export const SALON_EVOLVED_EVENTS = [
    {
      title:"Première Soirée",
      phases:[
        {
          text:(h,s)=>`salon_appetit s0p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"formal",label:"Keep it formal — cheese, wine, restraint",result:"Choice formal (salon_appetit) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:8,flag:"formal_opening"},
            {id:"indulgent",label:"Push indulgence early — American portions",result:"Choice indulgent (salon_appetit) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:9,rel:10,flag:"indulgent_opening"}
          ]
        },
        {
          text:(h,s)=>`salon_appetit s0p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"weekly",label:"Approve weekly salons",result:"Choice weekly (salon_appetit) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:12,flag:"weekly_salon"},
            {id:"special",label:"Special occasions only",result:"Choice special (salon_appetit) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:3,rel:7}
          ]
        }
      ],
      endings:[
        {condition:(h) => h.includes('indulgent_opening') && h.includes('weekly_salon'),text:(h,s,gain)=>`salon_appetit ending 0 bridge — modular evolved.ending @ week 20+.`,gainBonus:6,relBonus:12,startsSalon:true},
        {condition:() => true,text:(h,s,gain)=>`salon_appetit ending 1 bridge — modular evolved.ending @ week 20+.`,gainBonus:3,relBonus:8,startsSalon:true}
      ]
    },
    {
      title:"Staff Drift",
      phases:[
        {
          text:(h,s)=>`salon_appetit s1p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"welcome",label:"Welcome Mori — staff lends prestige",result:"Choice welcome (salon_appetit) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:9,flag:"mori_regular"},
            {id:"private",label:"Keep it resident-only tonight",result:"Choice private (salon_appetit) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:6}
          ]
        },
        {
          text:(h,s)=>`salon_appetit s1p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"expand",label:"Expand the guest list",result:"Choice expand (salon_appetit) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:10,flag:"expanded"},
            {id:"curate",label:"Curate carefully — exclusivity",result:"Choice curate (salon_appetit) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:11,flag:"curated"}
          ]
        }
      ],
      endings:[
        {condition:(h) => h.includes('mori_regular'),text:(h,s,gain)=>`salon_appetit ending 0 bridge — modular evolved.ending @ week 20+.`,gainBonus:5,relBonus:10,startsSalon:true},
        {condition:() => true,text:(h,s,gain)=>`salon_appetit ending 1 bridge — modular evolved.ending @ week 20+.`,gainBonus:3,relBonus:7,startsSalon:true}
      ]
    },
    {
      title:"Campus Murmur",
      phases:[
        {
          text:(h,s)=>`salon_appetit s2p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"lean_in",label:"Lean into the rumor",result:"Choice lean_in (salon_appetit) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:8,flag:"publicity"},
            {id:"mystery",label:"Keep it mysterious",result:"Choice mystery (salon_appetit) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:10,flag:"mystery"}
          ]
        },
        {
          text:(h,s)=>`salon_appetit s2p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"interview",label:"Allow the interview at a salon",result:"Choice interview (salon_appetit) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:9,rel:11,flag:"press"},
            {id:"decline",label:"Decline — salons stay private",result:"Choice decline (salon_appetit) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:7}
          ]
        }
      ],
      endings:[
        {condition:(h) => h.includes('press'),text:(h,s,gain)=>`salon_appetit ending 0 bridge — modular evolved.ending @ week 20+.`,gainBonus:8,relBonus:12,startsSalon:true},
        {condition:() => true,text:(h,s,gain)=>`salon_appetit ending 1 bridge — modular evolved.ending @ week 20+.`,gainBonus:4,relBonus:8,startsSalon:true}
      ]
    },
    {
      title:"The Journalist's Notebook",
      phases:[
        {
          text:(h,s)=>`salon_appetit s3p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"performance",label:"Make it a performance dinner",result:"Choice performance (salon_appetit) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:11,rel:10,flag:"performance"},
            {id:"intimate",label:"Keep it intimate — no cameras",result:"Choice intimate (salon_appetit) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:12,flag:"intimate"}
          ]
        },
        {
          text:(h,s)=>`salon_appetit s3p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"celebrate",label:"Celebrate with a feast",result:"Choice celebrate (salon_appetit) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:12,rel:9,flag:"celebrate"},
            {id:"rooftop",label:"Plan the rooftop salon",result:"Choice rooftop (salon_appetit) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:11,flag:"rooftop_planned"}
          ]
        }
      ],
      endings:[
        {condition:(h) => h.includes('rooftop_planned'),text:(h,s,gain)=>`salon_appetit ending 0 bridge — modular evolved.ending @ week 20+.`,gainBonus:7,relBonus:13,startsSalon:true},
        {condition:() => true,text:(h,s,gain)=>`salon_appetit ending 1 bridge — modular evolved.ending @ week 20+.`,gainBonus:5,relBonus:9,startsSalon:true}
      ]
    },
    {
      title:"Rooftop Under Stars",
      phases:[
        {
          text:(h,s)=>`salon_appetit s4p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"ignore",label:"Ignore the protest — feed the room",result:"Choice ignore (salon_appetit) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:12,flag:"defiant"},
            {id:"invite_up",label:"Invite a protester up",result:"Choice invite_up (salon_appetit) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:10,flag:"convert"}
          ]
        },
        {
          text:(h,s)=>`salon_appetit s4p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"scandal",label:"Embrace scandal — invite AIB",result:"Choice scandal (salon_appetit) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:9,rel:8,flag:"aib_guest"},
            {id:"discreet",label:"Stay discreet",result:"Choice discreet (salon_appetit) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:11}
          ]
        }
      ],
      endings:[
        {condition:(h) => h.includes('aib_guest'),text:(h,s,gain)=>`salon_appetit ending 0 bridge — modular evolved.ending @ week 20+.`,gainBonus:9,relBonus:10,startsSalon:true},
        {condition:() => true,text:(h,s,gain)=>`salon_appetit ending 1 bridge — modular evolved.ending @ week 20+.`,gainBonus:6,relBonus:11,startsSalon:true}
      ]
    },
    {
      title:"La Grande Soirée",
      phases:[
        {
          text:(h,s)=>`salon_appetit s5p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"grand_menu",label:"Serve the grand menu",result:"Choice grand_menu (salon_appetit) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:14,rel:14,flag:"grand_menu"},
            {id:"surprise",label:"Surprise tasting — chef collaboration",result:"Choice surprise (salon_appetit) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:16,rel:12,flag:"chef_collab"}
          ]
        },
        {
          text:(h,s)=>`salon_appetit s5p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"encore",label:"Lead the room in \"encore\"",result:"Choice encore (salon_appetit) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:12,rel:15,flag:"encore"},
            {id:"private",label:"Private digestif with you",result:"Choice private (salon_appetit) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:16,flag:"private_close"}
          ]
        }
      ],
      endings:[
        {condition:(h) => h.includes('grand_menu') && h.includes('encore'),text:(h,s,gain)=>`salon_appetit ending 0 bridge — modular evolved.ending @ week 20+.`,gainBonus:18,relBonus:18,startsSalon:true},
        {condition:() => true,text:(h,s,gain)=>`salon_appetit ending 1 bridge — modular evolved.ending @ week 20+.`,gainBonus:12,relBonus:14,startsSalon:true}
      ]
    }
];
