import { initPsychState } from '../psychState.js';

export const ORIGIN_DEFAULT = 'default';

const P = (fixation, obsession, dependence, shame) => ({ fixation, obsession, dependence, shame });

export const ORIGIN_DECKS = {
  0: [
    { id: 'britt_gymnast', label: "Hard-coach gymnast", voiceLine: '"We do not quit. We do not gain."', psych: P(20, 10, 15, 55), gainStance: 'opposed', register: 'scorekeeper' },
    { id: 'britt_pageant', label: 'Pageant legacy', voiceLine: '"Posture fixes everything. Until it does not."', psych: P(45, 55, 10, 15), gainStance: 'secret', register: 'mirror_early' },
  ],
  1: [
    { id: 'madd_subject_zero', label: 'Protocol subject zero', voiceLine: '"Methodology begins at home."', psych: P(35, 25, 15, 45), gainStance: 'reluctant', register: 'clinical' },
    { id: 'madd_hidden_binge', label: 'Hidden dorm binge arc', voiceLine: '"The wrappers are primary sources."', psych: P(55, 30, 10, 10), gainStance: 'secret', register: 'dataset_hunger' },
  ],
  2: [
    { id: 'kylie_brand_body', label: 'Brand contract body', voiceLine: '"The camera has requirements."', psych: P(25, 40, 10, 55), gainStance: 'opposed', register: 'on_camera' },
    { id: 'kylie_alt_account', label: 'Alt account', voiceLine: '"Off-camera counts more."', psych: P(55, 35, 15, 10), gainStance: 'secret', register: 'off_camera' },
  ],
  3: [
    { id: 'serena_missed_nationals', label: 'Missed nationals by 0.2', voiceLine: '"Fuel is not the same as failure."', psych: P(25, 20, 15, 55), gainStance: 'opposed', register: 'split_time' },
    { id: 'serena_bored_undefeated', label: 'Retired bored undefeated', voiceLine: '"I needed a new event."', psych: P(50, 35, 10, 15), gainStance: 'secret', register: 'new_event' },
  ],
  4: [
    { id: 'fiona_model_sidegig', label: 'Modeling side gig', voiceLine: '"Hold still. Let them look."', psych: P(30, 35, 15, 40), gainStance: 'reluctant', register: 'composition' },
    { id: 'fiona_self_portrait', label: 'Self-portrait series', voiceLine: '"The subject keeps changing."', psych: P(55, 45, 10, 10), gainStance: 'secret', register: 'canvas' },
  ],
  5: [
    { id: 'destiny_ranked_grind', label: 'Ranked grind', voiceLine: '"Patch notes: hunger buff."', psych: P(40, 25, 20, 35), gainStance: 'reluctant', register: 'meta' },
    { id: 'destiny_offline_lobby', label: 'Offline bot lobby', voiceLine: '"No spectators. More snacks."', psych: P(55, 30, 15, 10), gainStance: 'secret', register: 'speedrun' },
  ],
  6: [
    { id: 'tiffany_legacy_thin', label: 'Legacy thin chapter', voiceLine: '"Perfect girls smile through brunch."', psych: P(25, 35, 20, 55), gainStance: 'opposed', register: 'chapter_face' },
    { id: 'tiffany_feast_founder', label: 'Wednesday feast founder', voiceLine: '"More is more, babe."', psych: P(50, 35, 15, 10), gainStance: 'secret', register: 'hostess' },
  ],
  7: [
    { id: 'priya_parental_track', label: 'Parental med track', voiceLine: '"Deviation requires remediation."', psych: P(20, 25, 30, 55), gainStance: 'opposed', register: 'kpi' },
    { id: 'priya_reward_system', label: 'Secret reward system', voiceLine: '"Milestone reached. Bonus approved."', psych: P(55, 35, 20, 10), gainStance: 'secret', register: 'overperformance' },
  ],
  8: [
    { id: 'maya_moved_often', label: 'Moved every two years', voiceLine: '"New room. New number. Same log."', psych: P(25, 20, 45, 30), gainStance: 'reluctant', register: 'temporary' },
    { id: 'maya_eight_siblings', label: 'Eight siblings, loud house', voiceLine: '"Seconds were how we talked."', psych: P(45, 20, 25, 5), gainStance: 'secret', register: 'territory' },
  ],
  9: [
    { id: 'chloe_scandal_abroad', label: 'Scandal abroad', voiceLine: '"Armor comes in silk and portions."', psych: P(30, 25, 20, 50), gainStance: 'opposed', register: 'salon_armor' },
    { id: 'chloe_first_to_leave', label: 'First to leave family', voiceLine: '"I had to host myself first."', psych: P(45, 30, 35, 10), gainStance: 'secret', register: 'found_family' },
  ],
  10: [
    { id: 'renee_line_cook', label: 'Line cook hierarchy', voiceLine: '"Staff meal is still a meal."', psych: P(35, 25, 20, 45), gainStance: 'reluctant', register: 'kitchen_rank' },
    { id: 'renee_grandmothers_spoon', label: "Grandmother's spoon", voiceLine: '"Taste everything. That was the rule."', psych: P(55, 35, 10, 10), gainStance: 'secret', register: 'heirloom' },
  ],
  11: [
    { id: 'kaylee_perfect_rotation', label: 'Clinical rotation perfect', voiceLine: '"Care plans do not skip lunch."', psych: P(25, 20, 20, 50), gainStance: 'opposed', register: 'bedside' },
    { id: 'kaylee_self_care', label: 'Aggressive self-care', voiceLine: '"Orders for me too."', psych: P(55, 30, 20, 10), gainStance: 'secret', register: 'self_care' },
  ],
  12: [
    { id: 'nadia_thesis_others', label: 'Season plan on others', voiceLine: '"Observation contaminates the observer."', psych: P(35, 30, 15, 40), gainStance: 'reluctant', register: 'observer' },
    { id: 'nadia_dream_journal', label: 'Dream journal appetite', voiceLine: '"Interesting. I was hungry before waking."', psych: P(55, 35, 15, 10), gainStance: 'secret', register: 'rem' },
  ],
  13: [
    { id: 'daisy_potluck_virtue', label: 'Church potluck virtue', voiceLine: '"Bring enough for everyone. Even yourself."', psych: P(30, 20, 25, 55), gainStance: 'opposed', register: 'blessing' },
    { id: 'daisy_snack_mom', label: 'Snack mom for everyone', voiceLine: '"I packed extra. I always do."', psych: P(50, 30, 20, 10), gainStance: 'secret', register: 'pantry' },
  ],
  14: [
    { id: 'mj_fair_thin_prize', label: 'County fair thin prize', voiceLine: '"Ribbon girls smile first."', psych: P(35, 25, 20, 45), gainStance: 'reluctant', register: 'ribbon' },
    { id: 'mj_homestead_abundance', label: 'Homestead abundance', voiceLine: '"No sense being shy around a table."', psych: P(55, 30, 15, 10), gainStance: 'secret', register: 'harvest' },
  ],
  15: [
    { id: 'lilith_always_watching', label: 'Always watching', voiceLine: '"Soon began before you noticed."', psych: P(55, 40, 20, 20), gainStance: 'secret', register: 'predator' },
    { id: 'lilith_garden_before', label: 'Garden before campus', voiceLine: '"Courts need seats. I have been arranging them."', psych: P(55, 35, 40, 15), gainStance: 'secret', register: 'court' },
  ],
  16: [
    { id: 'sophia_dissertation_stress', label: 'Dissertation stress', voiceLine: '"Control group. I am the control group."', psych: P(35, 25, 25, 55), gainStance: 'opposed', register: 'double_check' },
    { id: 'sophia_sample_closet', label: 'Wellness sample closet', voiceLine: '"Statistically significant. Personally too."', psych: P(55, 35, 20, 10), gainStance: 'secret', register: 'compound' },
  ],
  17: [
    { id: 'indy_trust_fund_expedition', label: 'Trust-fund expedition', voiceLine: '"Field rations can be decadent."', psych: P(40, 25, 20, 35), gainStance: 'reluctant', register: 'catalog' },
    { id: 'indy_map_vault', label: 'Map the campus vault', voiceLine: '"Treasure is stored value. Calories count."', psych: P(55, 35, 15, 10), gainStance: 'secret', register: 'hoard' },
  ],
  18: [
    { id: 'talia_lab_accident', label: 'Lab accident hypothesis', voiceLine: '"The experiment affected the experimenter."', psych: P(30, 25, 20, 50), gainStance: 'reluctant', register: 'prototype' },
    { id: 'talia_optimization_run', label: 'Optimization run', voiceLine: '"I was already testing myself."', psych: P(60, 35, 20, 10), gainStance: 'secret', register: 'optimization' },
  ],
};

export function getOriginDeck(student) {
  return ORIGIN_DECKS[student?.id] || [];
}

export function getOriginCard(student, originId) {
  return getOriginDeck(student).find((card) => card.id === originId) || null;
}

export function needsOriginPick(student) {
  if (!student || student.hidden || student.lockState === 'locked') return false;
  if (student.origin && student.origin !== ORIGIN_DEFAULT) return false;
  return getOriginDeck(student).length > 1;
}

export function applyOriginPick(student, originId, week = 1) {
  const card = getOriginCard(student, originId);
  if (!student || !card || !needsOriginPick(student)) return student;
  return {
    ...student,
    origin: card.id,
    originChosenWeek: week,
    originRegister: card.register,
    gainStance: card.gainStance,
    psych: { ...initPsychState(), ...card.psych },
    originFlags: { register: card.register, chainBeat: 1 },
    triggeredEvents: [...(student.triggeredEvents || []), `origin_${card.id}`].filter((v, i, a) => a.indexOf(v) === i),
  };
}
