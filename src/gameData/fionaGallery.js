// ═══════════════════════════════════════════════════════════════
// FIONA — Artisan Gallery of Abundance
// ═══════════════════════════════════════════════════════════════

import { depthLbsGrant, depthRelBonus } from './mechanicsDepthLayer.js';

export function scaleGalleryLbsGain(lbs = 0) {
  if (lbs <= 0) return 0;
  return depthLbsGrant(lbs);
}

export function scaleGalleryRelGain(rel = 0) {
  if (rel <= 0) return 0;
  return depthRelBonus(rel);
}

export const GALLERY_MOTIFS = [
  { id: 'abundance', label: 'Abundance', lbsMult: 1.1, scrutiny: 2 },
  { id: 'still_life', label: 'Still Life', relBonus: 3, scrutiny: 0 },
  { id: 'portrait', label: 'Portrait', corruption: 2, scrutiny: 1 },
  { id: 'performance', label: 'Performance', lbsMult: 1.15, scrutiny: 4 },
];

export const GALLERY_ZONES = ['belly', 'bust', 'hips', 'full'];

export const GALLERY_MEDIUMS = [
  { id: 'butter', label: 'Butter & Oils' },
  { id: 'cream', label: 'Cream' },
  { id: 'chocolate', label: 'Chocolate' },
  { id: 'pastry', label: 'Pastry' },
];

export const FIELD_LOCATIONS = [
  { id: 'quad', label: 'The Quad', tag: 'candid', quality: 'Study' },
  { id: 'dining_hall', label: 'Dining Hall', tag: 'documentary', quality: 'Print' },
  { id: 'food_court', label: 'Food Court', tag: 'street', quality: 'Study' },
  { id: 'gym', label: 'Gym Aftermath', tag: 'contrast', quality: 'Print' },
  { id: 'faculty_lounge', label: 'Staff Lounge', tag: 'scandal', quality: 'Masterwork', scrutiny: 5 },
];

export const STUDIO_ACTIONS = [
  { id: 'feed_subject', label: 'Feed model', subjectLbs: 8, fionaLbs: 0, quality: 'Print' },
  { id: 'feed_together', label: 'Feed together', subjectLbs: 5, fionaLbs: 4, quality: 'Study' },
  { id: 'shoot_only', label: 'Shoot only', subjectLbs: 0, fionaLbs: 0, quality: 'Masterwork' },
  { id: 'direct_feed', label: 'Direct & feed', subjectLbs: 11, fionaLbs: 3, quality: 'Masterwork' },
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

export function studioAction(state, actionId) {
  const session = state.session;
  if (!session || session.type !== 'studio') return state;
  const action = STUDIO_ACTIONS.find((a) => a.id === actionId);
  if (!action) return state;
  const round = session.round + 1;
  const subjectGain = session.subjectGain + scaleGalleryLbsGain(action.subjectLbs);
  const fionaGain = session.fionaGain + scaleGalleryLbsGain(action.fionaLbs);
  const frames = [...session.frames, action.quality];
  const logLine = action.id === 'direct_feed'
    ? 'Fiona directs the bite and captures the moment the fullness shows.'
    : action.id === 'feed_together'
      ? 'Fiona eats from the same tray, camera dangling, unashamed.'
      : action.id === 'shoot_only'
        ? 'She shoots without feeding — hunger in the frame.'
        : 'Model fed. Shutter clicks.';
  if (round >= 3) {
    const critic = CRITIC_TIERS[Math.floor(Math.random() * CRITIC_TIERS.length)];
    return {
      ...state,
      patrons: Math.min(100, state.patrons + critic.patrons),
      scrutinyHeat: state.scrutinyHeat + critic.scrutiny,
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
      pendingGains: { subjectId: session.subjectId, subjectLbs: subjectGain, fionaLbs: fionaGain, scrutiny: critic.scrutiny },
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
    fionaLbs: scaleGalleryLbsGain(5 + Math.floor(patrons / 4)),
    log: `Opening night (${theme}). Gallery packed. Patrons +${patrons}.`,
  };
}

export const GALLERY_EVOLVED_EVENTS = [
    {
      title:"First Model",
      phases:[
        {
          text:(h,s)=>`artisan_gallery s0p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"enroll",label:"Enroll the first official model",result:"Choice enroll (artisan_gallery) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:10,flag:"first_subject"},
            {id:"candid",label:"Start with candid field work only",result:"Choice candid (artisan_gallery) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:3,rel:8,flag:"field_first"}
          ]
        },
        {
          text:(h,s)=>`artisan_gallery s0p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"wall",label:"Help her hang the first wall",result:"Choice wall (artisan_gallery) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:9,flag:"wall_up"},
            {id:"wait",label:"Wait for a stronger series",result:"Choice wait (artisan_gallery) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:7}
          ]
        }
      ],
      endings:[
        {condition:(h) => h.includes('first_subject') && h.includes('wall_up'),text:(h,s,gain)=>`artisan_gallery ending 0 bridge — modular evolved.ending @ week 20+.`,gainBonus:5,relBonus:11,startsGallery:true},
        {condition:() => true,text:(h,s,gain)=>`artisan_gallery ending 1 bridge — modular evolved.ending @ week 20+.`,gainBonus:3,relBonus:7,startsGallery:true}
      ]
    },
    {
      title:"Field Roll",
      phases:[
        {
          text:(h,s)=>`artisan_gallery s1p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"consent",label:"Insist on consent going forward",result:"Choice consent (artisan_gallery) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:3,rel:10,flag:"consent_strict"},
            {id:"bold",label:"Bold shots sell — embrace scandal",result:"Choice bold (artisan_gallery) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:6,flag:"scandal_embraced"}
          ]
        },
        {
          text:(h,s)=>`artisan_gallery s1p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"dining",label:"Shoot the dining hall regulars",result:"Choice dining (artisan_gallery) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:8,flag:"dining_series"},
            {id:"faculty",label:"Risk the staff lounge",result:"Choice faculty (artisan_gallery) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:7,flag:"faculty_shot"}
          ]
        }
      ],
      endings:[
        {condition:(h) => h.includes('scandal_embraced'),text:(h,s,gain)=>`artisan_gallery ending 0 bridge — modular evolved.ending @ week 20+.`,gainBonus:6,relBonus:9,startsGallery:true},
        {condition:() => true,text:(h,s,gain)=>`artisan_gallery ending 1 bridge — modular evolved.ending @ week 20+.`,gainBonus:4,relBonus:8,startsGallery:true}
      ]
    },
    {
      title:"Wall of Proof",
      phases:[
        {
          text:(h,s)=>`artisan_gallery s2p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"reverent",label:"Reverent tone — art world speak",result:"Choice reverent (artisan_gallery) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:10,flag:"reverent_opening"},
            {id:"confrontational",label:"Confrontational — bodies as politics",result:"Choice confrontational (artisan_gallery) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:7,flag:"confrontational"}
          ]
        },
        {
          text:(h,s)=>`artisan_gallery s2p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"eat",label:"Eat through the critique",result:"Choice eat (artisan_gallery) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:9,rel:9,flag:"performance_eat"},
            {id:"speak",label:"Give an artist statement",result:"Choice speak (artisan_gallery) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:11,flag:"statement"}
          ]
        }
      ],
      endings:[
        {condition:(h) => h.includes('confrontational'),text:(h,s,gain)=>`artisan_gallery ending 0 bridge — modular evolved.ending @ week 20+.`,gainBonus:8,relBonus:10,startsGallery:true},
        {condition:() => true,text:(h,s,gain)=>`artisan_gallery ending 1 bridge — modular evolved.ending @ week 20+.`,gainBonus:5,relBonus:9,startsGallery:true}
      ]
    },
    {
      title:"The Living Room",
      phases:[
        {
          text:(h,s)=>`artisan_gallery s3p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"feature",label:"Let the model speak",result:"Choice feature (artisan_gallery) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:12,flag:"subject_speaks"},
            {id:"feed_live",label:"Feed the model live",result:"Choice feed_live (artisan_gallery) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:10,flag:"live_feed"}
          ]
        },
        {
          text:(h,s)=>`artisan_gallery s3p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"accept",label:"Accept the commission",result:"Choice accept (artisan_gallery) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:8,flag:"commission"},
            {id:"selective",label:"Stay selective",result:"Choice selective (artisan_gallery) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:3,rel:10,flag:"selective"}
          ]
        }
      ],
      endings:[
        {condition:(h) => h.includes('live_feed'),text:(h,s,gain)=>`artisan_gallery ending 0 bridge — modular evolved.ending @ week 20+.`,gainBonus:10,relBonus:13,startsGallery:true},
        {condition:() => true,text:(h,s,gain)=>`artisan_gallery ending 1 bridge — modular evolved.ending @ week 20+.`,gainBonus:6,relBonus:10,startsGallery:true}
      ]
    },
    {
      title:"Regional Interest",
      phases:[
        {
          text:(h,s)=>`artisan_gallery s4p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"travel",label:"Plan the traveling show",result:"Choice travel (artisan_gallery) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:9,flag:"travel_show"},
            {id:"stay",label:"Stay campus-focused",result:"Choice stay (artisan_gallery) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:11,flag:"local"}
          ]
        },
        {
          text:(h,s)=>`artisan_gallery s4p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"hide",label:"Move sensitive prints off-site",result:"Choice hide (artisan_gallery) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:3,rel:8,flag:"hide_prints"},
            {id:"double_down",label:"Double down — publish online",result:"Choice double_down (artisan_gallery) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:6,flag:"publish"}
          ]
        }
      ],
      endings:[
        {condition:(h) => h.includes('publish'),text:(h,s,gain)=>`artisan_gallery ending 0 bridge — modular evolved.ending @ week 20+.`,gainBonus:7,relBonus:8,startsGallery:true},
        {condition:() => true,text:(h,s,gain)=>`artisan_gallery ending 1 bridge — modular evolved.ending @ week 20+.`,gainBonus:5,relBonus:9,startsGallery:true}
      ]
    },
    {
      title:"Permanent Collection",
      phases:[
        {
          text:(h,s)=>`artisan_gallery s5p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"accept_museum",label:"Accept — permanent collection",result:"Choice accept_museum (artisan_gallery) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:12,flag:"museum"},
            {id:"negotiate",label:"Negotiate for living model clause",result:"Choice negotiate (artisan_gallery) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:10,flag:"living_clause"}
          ]
        },
        {
          text:(h,s)=>`artisan_gallery s5p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"legacy",label:"Launch the legacy program",result:"Choice legacy (artisan_gallery) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:11,flag:"legacy"},
            {id:"retrospective",label:"Retrospective on herself too",result:"Choice retrospective (artisan_gallery) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:9,rel:9,flag:"self_included"}
          ]
        }
      ],
      endings:[
        {condition:(h) => h.includes('museum') && h.includes('legacy'),text:(h,s,gain)=>`artisan_gallery ending 0 bridge — modular evolved.ending @ week 20+.`,gainBonus:12,relBonus:15,startsGallery:true},
        {condition:() => true,text:(h,s,gain)=>`artisan_gallery ending 1 bridge — modular evolved.ending @ week 20+.`,gainBonus:8,relBonus:12,startsGallery:true}
      ]
    }
];
