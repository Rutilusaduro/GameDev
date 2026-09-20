// The Squad — Lead: A1 Mobile | Support: A5 Editor
// Additional per-student campus navigation depth (gaps in personas.js).
import { registerModuleVariants } from '../../engine.js';

const W = 4;
const MOBILE = { stageMin: 5, stageMax: 9 };

registerModuleVariants('campus.spaceObs', [
  { when: { studentId: 0, campusLocale: 'gym', ...MOBILE }, weight: W, text: [
    `Brittany tests equipment like team gear — what fits, what groans, what earns respect.`,
    `The gym remembers her captaincy. Her body remembers every recovery meal.`,
  ]},
  { when: { studentId: 1, campusLocale: 'floor meeting_hall', ...MOBILE }, weight: W, text: [
    `Cassidy chooses the desk with the widest arm — season plan confirmed weekly.`,
    `She logs training notes and takes space in equal measure. The row behind has adapted.`,
  ]},
  { when: { studentId: 2, campusLocale: 'hallway', ...MOBILE }, weight: W, text: [
    `Kylie turns the corridor into content — angles, curves, the algorithm in her wake.`,
    `Phones rise as she passes. She pretends not to notice. She always notices.`,
  ]},
  { when: { studentId: 4, campusLocale: 'dorm_room', ...MOBILE }, weight: W, text: [
    `Fiona's room is studio and nest — canvases, snacks, softness arranged like composition.`,
    `The mirror tells a story she's still painting. She likes the draft.`,
  ]},
  { when: { studentId: 15, campusLocale: 'hallway', stageMin: 6 }, weight: W, text: [
    `Lilith moves and the hallway quiets — not fear, exactly. Recognition.`,
    `Traffic parts without announcement. She does not thank them. She rarely needs to.`,
  ]},
  { when: { studentId: 17, campusLocale: 'stairwell', ...MOBILE }, weight: W, text: [
    `Indiana maps each landing like strata — which creaks, which holds, which shortcut fits.`,
    `Ruins teach patience. Stairs teach breath. He collects both.`,
  ]},
]);

registerModuleVariants('campus.seenBeat', [
  { when: { studentId: 0, stageMin: 4, stageMax: 7 }, weight: W, text: [
    `Brittany catches a teammate staring at her middle and grins. "Eyes up — or don't. Your call."`,
    `Captain's uniform strains at practice. She owns it like a trophy.`,
  ]},
  { when: { studentId: 1, stageMin: 3, stageMax: 6 }, weight: W, text: [
    `Cassidy notes the glance, files it, keeps walking — captain's composure, secret appetite.`,
  ]},
  { when: { studentId: 4, stageMin: 4 }, weight: W, text: [
    `Fiona feels observed and leans into it — artist as subject, softness as medium.`,
  ]},
  { when: { studentId: 9, campusLocale: 'cafeteria', stageMin: 5 }, weight: W, text: [
    `Chloé eats like performance art. The cafeteria provides audience. She provides appetite.`,
  ]},
  { when: { studentId: 15, stageMin: 6 }, weight: W, text: [
    `Someone stares at Lilith's breadth. She stares back until they look away.`,
  ]},
  { when: { studentId: 17, stageMin: 4 }, weight: W, text: [
    `Indiana's gear belt catches on a turnstile. He laughs, unbothered, keeps digging metaphorically.`,
  ]},
  { when: { studentId: 9, campusLocale: 'quad', stageMin: 4 }, weight: W, text: [
    `Chloé crosses the quad like a guest of honor at her own picnic. Appetite follows.`,
  ]},
  { when: { studentId: 14, campusLocale: 'cafeteria', stageMin: 5 }, weight: W, text: [
    `Mary Jane treats the cafeteria line as a harvest. Trays stack. She does not hurry.`,
  ]},
  { when: {}, text: [
    `Someone looks twice. She lets them. The second look is the honest one.`,
    `Campus traffic parts a little. She fills the gap without meaning to.`,
    `A glance lands on her middle and stays. She keeps walking, warmer for it.`,
  ]},
]);

registerModuleVariants('campus.moveSentence', [
  { when: { studentId: 15, stageMin: 8 }, weight: 4, text: [
    `{subject.name} {word.moveVerb.hallway} — the corridor rearranges around her mass.`,
  ]},
  { when: { studentId: 0, campusLocale: 'gym', stageMin: 6 }, weight: 4, text: [
    `{subject.name} {word.adv.pace|suffix: }{word.moveVerb.campus} {campus.destination}, still moving like an athlete, softer now.`,
  ]},
]);
