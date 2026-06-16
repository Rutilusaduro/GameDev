// The Squad — Lead: A1 Mobile | Support: A5 Editor
// Per-girl campus navigation voice — locale and mobility beats.
import { registerModuleVariants } from '../../engine.js';
import './fragments.js';

const W = 4;
const MOBILE = { stageMin: 5, stageMax: 9 };

registerModuleVariants('campus.spaceObs', [
  { when: { studentId: 3, campusLocale: 'gym', ...MOBILE }, weight: W, text: [
    'Serena knows which machines still fit. The list shortens every month.',
    'The gym was built for a different athlete. She uses it anyway — loudly, generously.',
  ]},
  { when: { studentId: 5, campusLocale: 'dorm_room', ...MOBILE }, weight: W, text: [
    'Destiny\'s chair has learned her. The desk has not. She plays from the bed now.',
    'Her dorm is half setup, half nest — cables, snacks, and mass arranged by habit.',
  ]},
  { when: { studentId: 6, campusLocale: 'cafeteria', ...MOBILE }, weight: W, text: [
    'Tiffany claims the wide booth by seniority and hip spread. Chapter business requires room.',
    'The cafeteria knows her order and her footprint. Both are expanding.',
  ]},
  { when: { studentId: 7, campusLocale: 'lecture_hall', ...MOBILE }, weight: W, text: [
    'Priya has mapped which desk arms survive her. The map is color-coded.',
    'She takes notes and space in equal measure. The row behind her has learned.',
  ]},
  { when: { studentId: 8, campusLocale: 'hallway', ...MOBILE }, weight: W, text: [
    'Maya moves through traffic without comment. People part. She notices, does not say.',
    'The hallway feels narrower. She is not narrower. The math is simple.',
  ]},
  { when: { studentId: 9, campusLocale: 'cafeteria', ...MOBILE }, weight: W, text: [
    'Chloé turns the dining hall into a salon — portions scandalous, presence larger still.',
    'American booths were not built for French appetite at this scale. She adapts with charm.',
  ]},
  { when: { studentId: 10, campusLocale: 'cafeteria', ...MOBILE }, weight: W, text: [
    'Reneé navigates the line like a kitchen — efficient, hungry, already planning seconds.',
    'The cafeteria is her testing ground. Her body is the tasting note.',
  ]},
  { when: { studentId: 11, campusLocale: 'stairwell', ...MOBILE }, weight: W, text: [
    'Kaylee takes the stairs for the exercise and the honesty. Breath by breath, landing by landing.',
    'She counts steps the way she counts vitals — calm, precise, a little winded, fine.',
  ]},
  { when: { studentId: 12, campusLocale: 'hallway', ...MOBILE }, weight: W, text: [
    'Nadia watches who makes room and who does not. Data accumulates with every crossing.',
    'The corridor is a social experiment. Her hips are the variable.',
  ]},
  { when: { studentId: 13, campusLocale: 'cafeteria', ...MOBILE }, weight: W, text: [
    'Daisy brings warmth and width to the serving line. Everyone eats better near her.',
    'She knows which tables creak kindly. Southern hospitality includes furniture triage.',
  ]},
  { when: { studentId: 14, campusLocale: 'cafeteria', ...MOBILE }, weight: W, text: [
    'Mary Jane\'s laugh arrives before she does. The booth surrenders without fight.',
    'Campus portions meet farm appetite. The cafeteria never wins that negotiation.',
  ]},
  { when: { studentId: 16, campusLocale: 'elevator', ...MOBILE }, weight: W, text: [
    'Sophia reads the capacity placard twice. She rides anyway. Research requires risk.',
    'The elevator dings. She exhales. Mass redistributed. Floor reached.',
  ]},
  { when: { studentId: 17, campusLocale: 'stairwell', ...MOBILE }, weight: W, text: [
    'Indiana maps landings like dig sites — which step creaks, which rail holds, which shortcut fits.',
    'The stairwell is another ruin to navigate. She likes ruins.',
  ]},
  { when: { studentId: 18, campusLocale: 'prof_office', ...MOBILE }, weight: W, text: [
    'Talia measures your doorframe on entry. Old habit. New clearance required each month.',
    'She sits where the geometry works and opens her notebook. Inputs: food. Outputs: this.',
  ]},
]);

registerModuleVariants('campus.obstacle', [
  { when: { studentId: 0, campusLocale: 'gym', stageMin: 6 }, weight: W, text: [
    ' — equipment groaning under captain\'s weight',
    ', cheer muscles now plush, machine still complaining',
  ]},
  { when: { studentId: 2, campusLocale: 'hallway', stageMin: 5 }, weight: W, text: [
    ' — phones lifting to film the squeeze past',
    ', content happening in real time whether she wants it or not',
  ]},
  { when: { studentId: 15, campusLocale: 'hallway', stageMin: 7 }, weight: W, text: [
    ' — traffic quieting without being asked',
    ', stillness moving ahead of her like a shadow',
  ]},
]);
