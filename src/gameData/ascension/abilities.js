// The Squad — Lead: A4 Architect | Support: A2 Psych
// V1 ships Serena's pilot abilities. The closed hook set matches the design
// lock, so future rows can expand without inventing new mechanics.

import {
  depthLbsGrant,
  depthMetaProgressBonus,
  depthPsychDelta,
  depthRelBonus,
} from '../mechanicsDepthLayer.js';

export const ASCENSION_ABILITY_HOOKS = [
  'appetiteMod',
  'feedEvent',
  'economyMod',
  'interruptSpawn',
  'psychNudge',
  'wardrobeEvent',
  'campusMod',
];

const ability = (row) => ({
  essenceCost: 3,
  cooldownWeeks: 2,
  beat: 'asc.ability.generic',
  public: false,
  ...row,
});

export const ASCENSION_ABILITIES = [
  ability({ id: 'valk_rollcall', formId: 'valkyrie', studentId: 0, name: 'Roll Call', desc: 'Marks her chosen standard for appetite and confidence.', essenceCost: 2, cooldownWeeks: 1, hook: 'psychNudge', params: { fixation: 8, shame: -6 }, public: true }),
  ability({ id: 'valk_victory_table', formId: 'valkyrie', studentId: 0, name: 'Victory Table', desc: 'A squad feast turns victory into body momentum.', essenceCost: 3, cooldownWeeks: 2, hook: 'feedEvent', params: { lbsGain: 2, rel: 3, hungerDelta: 1 }, public: true }),
  ability({ id: 'valk_shieldmaiden', formId: 'valkyrie', studentId: 0, name: 'Shieldmaiden', desc: 'Public shame pressure drops under her banner.', essenceCost: 4, cooldownWeeks: 3, hook: 'campusMod', params: { scrutinyDelta: -3, flag: 'shieldmaidenCover' }, public: true }),

  ability({ id: 'sphinx_open_stacks', formId: 'sphinx', studentId: 1, name: 'Open Stacks', desc: 'Reveals a hidden answer for the next threshold.', essenceCost: 2, cooldownWeeks: 1, hook: 'interruptSpawn', params: { flag: 'openStacksAnswer', value: true, rel: 2 } }),
  ability({ id: 'sphinx_office_hours', formId: 'sphinx', studentId: 1, name: 'Open Hours', desc: 'A private session deepens fascination.', essenceCost: 3, cooldownWeeks: 2, hook: 'psychNudge', params: { obsession: 10, fixation: 5 } }),
  ability({ id: 'sphinx_errata', formId: 'sphinx', studentId: 1, name: 'Errata', desc: 'A footnote finds money where a week misplaced it.', essenceCost: 4, cooldownWeeks: 3, hook: 'economyMod', params: { moneyDelta: 25, flag: 'errataFiled' } }),

  ability({ id: 'siren_pinned_comment', formId: 'siren', studentId: 2, name: 'Pinned Comment', desc: 'A venue listens harder for a night.', essenceCost: 2, cooldownWeeks: 1, hook: 'campusMod', params: { flag: 'pinnedAudience', scrutinyDelta: -1 }, public: true }),
  ability({ id: 'siren_duet', formId: 'siren', studentId: 2, name: 'Duet', desc: 'A shared performance becomes a shared meal.', essenceCost: 3, cooldownWeeks: 2, hook: 'feedEvent', params: { lbsGain: 2, rel: 4, hungerDelta: 1 }, public: true }),
  ability({ id: 'siren_ratio', formId: 'siren', studentId: 2, name: 'Ratio', desc: 'Bad attention turns into legend framing.', essenceCost: 4, cooldownWeeks: 3, hook: 'psychNudge', params: { shame: -8, obsession: 8 }, public: true }),

  ability({ id: 'serena_wake', formId: 'mermaid', studentId: 3, name: 'Wake', desc: 'A pool-side post-lap meal gives her second climb momentum.', essenceCost: 2, cooldownWeeks: 1, hook: 'feedEvent', params: { lbsGain: 2, rel: 3, hungerDelta: 1 }, beat: 'asc.ability.serenaWake', public: true }),
  ability({ id: 'serena_deep_breath', formId: 'mermaid', studentId: 3, name: 'Deep Breath', desc: 'Capacity training makes the next meal land deeper.', essenceCost: 3, cooldownWeeks: 2, hook: 'appetiteMod', params: { hungerDelta: 2, weeklyDigestMult: 1.15 }, beat: 'asc.ability.serenaDeepBreath' }),
  ability({ id: 'serena_undertow', formId: 'mermaid', studentId: 3, name: 'Undertow', desc: 'Pulls a stalled arc back into motion as a stored threshold push.', essenceCost: 4, cooldownWeeks: 3, hook: 'interruptSpawn', params: { flag: 'undertowMomentum', value: true, rel: 4 }, beat: 'asc.ability.serenaUndertow', public: true }),

  ability({ id: 'galatea_still_life', formId: 'galatea', studentId: 4, name: 'Still Life', desc: 'Holds a body memory for callback later.', essenceCost: 2, cooldownWeeks: 1, hook: 'interruptSpawn', params: { flag: 'stillLifeHeld', value: true } }),
  ability({ id: 'galatea_life_class', formId: 'galatea', studentId: 4, name: 'Life Class', desc: 'Modeling beside her unlocks mirror courage.', essenceCost: 3, cooldownWeeks: 2, hook: 'psychNudge', params: { shame: -8, obsession: 6 } }),
  ability({ id: 'galatea_restoration', formId: 'galatea', studentId: 4, name: 'Restoration', desc: 'A damaged object becomes commemorative.', essenceCost: 4, cooldownWeeks: 3, hook: 'wardrobeEvent', params: { repairRelic: true, flag: 'restoredRelic' } }),

  ability({ id: 'glitch_duplication', formId: 'glitch_sprite', studentId: 5, name: 'Duplication Glitch', desc: 'One meal resolves as if it rendered twice.', essenceCost: 2, cooldownWeeks: 1, hook: 'feedEvent', params: { lbsGain: 2, hungerDelta: 1 } }),
  ability({ id: 'glitch_lag_spike', formId: 'glitch_sprite', studentId: 5, name: 'Lag Spike', desc: 'A garment failure waits for better timing.', essenceCost: 3, cooldownWeeks: 2, hook: 'wardrobeEvent', params: { delayFailureWeeks: 1, flag: 'lagSpikeHeld' } }),
  ability({ id: 'glitch_speedrun', formId: 'glitch_sprite', studentId: 5, name: 'Speedrun', desc: 'Stores a two-tick momentum flag for later.', essenceCost: 4, cooldownWeeks: 3, hook: 'interruptSpawn', params: { flag: 'speedrunMomentum', value: true, rel: 2 } }),

  ability({ id: 'nymph_open_invitation', formId: 'feast_nymph', studentId: 6, name: 'Open Invitation', desc: 'A house meal leaves everyone fonder.', essenceCost: 2, cooldownWeeks: 1, hook: 'feedEvent', params: { lbsGain: 2, rel: 4 } }),
  ability({ id: 'nymph_house_rules', formId: 'feast_nymph', studentId: 6, name: 'House Rules', desc: 'Her rooms suspend shame for a week.', essenceCost: 3, cooldownWeeks: 2, hook: 'campusMod', params: { flag: 'houseRules', scrutinyDelta: -2 }, public: true }),
  ability({ id: 'nymph_legacy_tap', formId: 'feast_nymph', studentId: 6, name: 'Legacy Tap', desc: 'An alumna feast flag joins the house ledger.', essenceCost: 4, cooldownWeeks: 3, hook: 'interruptSpawn', params: { flag: 'legacyTapReady', value: true } }),

  ability({ id: 'djinn_terms', formId: 'djinn', studentId: 7, name: 'Terms & Conditions', desc: 'A plan gets budget certainty up front.', essenceCost: 2, cooldownWeeks: 1, hook: 'economyMod', params: { moneyDelta: 20, flag: 'termsFiled' } }),
  ability({ id: 'djinn_escrow', formId: 'djinn', studentId: 7, name: 'Escrow', desc: 'Gain is held for a stronger release later.', essenceCost: 3, cooldownWeeks: 2, hook: 'appetiteMod', params: { weeklyDigestMult: 1.2, hungerDelta: 1 } }),
  ability({ id: 'djinn_performance_review', formId: 'djinn', studentId: 7, name: 'Performance Review', desc: 'A stalled psych tier gets motion.', essenceCost: 4, cooldownWeeks: 3, hook: 'psychNudge', params: { fixation: 6, obsession: 6, dependence: 4 } }),

  ability({ id: 'dryad_deep_root', formId: 'dryad', studentId: 8, name: 'Deep Root', desc: 'The grove lowers shame and steadies appetite.', essenceCost: 2, cooldownWeeks: 1, hook: 'psychNudge', params: { shame: -8, dependence: 4 } }),
  ability({ id: 'dryad_windfall', formId: 'dryad', studentId: 8, name: 'Windfall', desc: 'A surprise harvest lowers this week’s costs.', essenceCost: 3, cooldownWeeks: 2, hook: 'economyMod', params: { moneyDelta: 30, flag: 'windfallHarvest' } }),
  ability({ id: 'dryad_heartwood', formId: 'dryad', studentId: 8, name: 'Heartwood', desc: 'A callback flag becomes part of the grove.', essenceCost: 4, cooldownWeeks: 3, hook: 'wardrobeEvent', params: { repairRelic: true, flag: 'heartwoodMemory' } }),

  ability({ id: 'melusine_table_wine', formId: 'melusine', studentId: 9, name: 'Table Wine', desc: 'A dinner lands deeper and warmer.', essenceCost: 2, cooldownWeeks: 1, hook: 'feedEvent', params: { lbsGain: 2, rel: 3 } }),
  ability({ id: 'melusine_guest_list', formId: 'melusine', studentId: 9, name: 'Guest List', desc: 'The next group scene gets curated.', essenceCost: 3, cooldownWeeks: 2, hook: 'interruptSpawn', params: { flag: 'guestListReady', value: true } }),
  ability({ id: 'melusine_spring_tide', formId: 'melusine', studentId: 9, name: 'Spring Tide', desc: 'The salon becomes water-court for a night.', essenceCost: 4, cooldownWeeks: 3, hook: 'campusMod', params: { flag: 'springTide', scrutinyDelta: -2 }, public: true }),

  ability({ id: 'hearth_staff_meal', formId: 'hearth_demigoddess', studentId: 10, name: 'Staff Meal', desc: 'A kitchen-wide meal feeds her second climb.', essenceCost: 2, cooldownWeeks: 1, hook: 'feedEvent', params: { lbsGain: 2, rel: 2, hungerDelta: 1 } }),
  ability({ id: 'hearth_signature_dish', formId: 'hearth_demigoddess', studentId: 10, name: 'Signature Dish', desc: 'A craving gets written into the menu.', essenceCost: 3, cooldownWeeks: 2, hook: 'appetiteMod', params: { hungerDelta: 2, weeklyDigestMult: 1.1 } }),
  ability({ id: 'hearth_mise_en_place', formId: 'hearth_demigoddess', studentId: 10, name: 'Mise en Place', desc: 'Next week’s setup is pre-staged.', essenceCost: 4, cooldownWeeks: 3, hook: 'interruptSpawn', params: { flag: 'miseEnPlaceReady', value: true } }),

  ability({ id: 'fertility_bedside_manner', formId: 'fertility_goddess', studentId: 11, name: 'Bedside Manner', desc: 'Stress turns toward appetite.', essenceCost: 2, cooldownWeeks: 1, hook: 'psychNudge', params: { shame: -6, fixation: 6 } }),
  ability({ id: 'fertility_standing_orders', formId: 'fertility_goddess', studentId: 11, name: 'Standing Orders', desc: 'Meals quietly upgrade themselves.', essenceCost: 3, cooldownWeeks: 2, hook: 'appetiteMod', params: { hungerDelta: 2, weeklyDigestMult: 1.1 } }),
  ability({ id: 'fertility_visiting_hours', formId: 'fertility_goddess', studentId: 11, name: 'Visiting Hours', desc: 'A clinic visit stores a threshold advance.', essenceCost: 4, cooldownWeeks: 3, hook: 'interruptSpawn', params: { flag: 'visitingHoursReady', value: true }, public: true }),

  ability({ id: 'dream_session_notes', formId: 'dream_eater', studentId: 12, name: 'Session Notes', desc: 'A desire tier moves under careful witness.', essenceCost: 2, cooldownWeeks: 1, hook: 'psychNudge', params: { obsession: 8, dependence: 4 } }),
  ability({ id: 'dream_night_shift', formId: 'dream_eater', studentId: 12, name: 'Night Shift', desc: 'A shared dream-feast becomes morning weight.', essenceCost: 3, cooldownWeeks: 2, hook: 'feedEvent', params: { lbsGain: 2, rel: 3 } }),
  ability({ id: 'dream_case_study', formId: 'dream_eater', studentId: 12, name: 'Case Study', desc: 'This run’s pattern gets named and stored.', essenceCost: 4, cooldownWeeks: 3, hook: 'interruptSpawn', params: { flag: 'caseStudyNamed', value: true } }),

  ability({ id: 'angel_grace', formId: 'angel_of_plenty', studentId: 13, name: 'Grace', desc: 'Providence covers one small purchase.', essenceCost: 2, cooldownWeeks: 1, hook: 'economyMod', params: { moneyDelta: 20, flag: 'graceCredit' }, public: true }),
  ability({ id: 'angel_potluck', formId: 'angel_of_plenty', studentId: 13, name: 'Potluck', desc: 'A warm group meal feeds her too.', essenceCost: 3, cooldownWeeks: 2, hook: 'feedEvent', params: { lbsGain: 2, rel: 4 }, public: true }),
  ability({ id: 'angel_guardian', formId: 'angel_of_plenty', studentId: 13, name: 'Guardian', desc: 'The next negative interrupt becomes comfort.', essenceCost: 4, cooldownWeeks: 3, hook: 'wardrobeEvent', params: { strainRelief: true, flag: 'guardianComfort' } }),

  ability({ id: 'harvest_bumper_crop', formId: 'harvest_queen', studentId: 14, name: 'Bumper Crop', desc: 'Abundance shows up as usable budget.', essenceCost: 2, cooldownWeeks: 1, hook: 'economyMod', params: { moneyDelta: 35, flag: 'bumperCrop' }, public: true }),
  ability({ id: 'harvest_almanac', formId: 'harvest_queen', studentId: 14, name: 'Almanac', desc: 'The next interruptions get marked in advance.', essenceCost: 3, cooldownWeeks: 2, hook: 'interruptSpawn', params: { flag: 'almanacPeek', value: true } }),
  ability({ id: 'harvest_preserves', formId: 'harvest_queen', studentId: 14, name: 'Put Up Preserves', desc: 'Surplus appetite banks for later release.', essenceCost: 4, cooldownWeeks: 3, hook: 'wardrobeEvent', params: { repairRelic: true, flag: 'preservesBanked' } }),

  ability({ id: 'lamia_old_hunger', formId: 'lamia', studentId: 15, name: 'Old Hunger', desc: 'A stored craving wakes immediately.', essenceCost: 2, cooldownWeeks: 1, hook: 'interruptSpawn', params: { flag: 'oldHungerAwake', value: true }, public: true }),
  ability({ id: 'lamia_confidence', formId: 'lamia', studentId: 15, name: 'Confidence', desc: 'A secret traded becomes steadier desire.', essenceCost: 3, cooldownWeeks: 2, hook: 'psychNudge', params: { shame: -8, dependence: 5 } }),
  ability({ id: 'lamia_garden', formId: 'lamia', studentId: 15, name: 'The Garden', desc: 'A moonlit gathering softens the campus mood.', essenceCost: 4, cooldownWeeks: 3, hook: 'campusMod', params: { flag: 'moonlitGarden', scrutinyDelta: -3 }, public: true }),

  ability({ id: 'witch_double_checked_dose', formId: 'potion_witch', studentId: 16, name: 'Double-Checked Dose', desc: 'The next compound lands with certainty.', essenceCost: 2, cooldownWeeks: 1, hook: 'appetiteMod', params: { hungerDelta: 1, weeklyDigestMult: 1.15 } }),
  ability({ id: 'witch_placebo', formId: 'potion_witch', studentId: 16, name: 'Placebo', desc: 'A small buff works because she said so.', essenceCost: 3, cooldownWeeks: 2, hook: 'psychNudge', params: { fixation: 5, shame: -4 } }),
  ability({ id: 'witch_peer_review', formId: 'potion_witch', studentId: 16, name: 'Peer Review', desc: 'A copied effect becomes a feeding result.', essenceCost: 4, cooldownWeeks: 3, hook: 'feedEvent', params: { lbsGain: 2, rel: 2 } }),

  ability({ id: 'dragon_appraisal', formId: 'dragon', studentId: 17, name: 'Appraisal', desc: 'An owned thing becomes glint and usable value.', essenceCost: 2, cooldownWeeks: 1, hook: 'wardrobeEvent', params: { repairRelic: true, flag: 'appraisalFiled' }, public: true }),
  ability({ id: 'dragon_excavation', formId: 'dragon', studentId: 17, name: 'Excavation', desc: 'A buried campus secret gets flagged.', essenceCost: 3, cooldownWeeks: 2, hook: 'interruptSpawn', params: { flag: 'excavationLead', value: true } }),
  ability({ id: 'dragon_share', formId: 'dragon', studentId: 17, name: "Dragon's Share", desc: 'Hoarded value becomes appetite pressure.', essenceCost: 4, cooldownWeeks: 3, hook: 'appetiteMod', params: { hungerDelta: 2, weeklyDigestMult: 1.2 }, public: true }),
];

export const ASCENSION_ABILITY_BY_ID = Object.fromEntries(
  ASCENSION_ABILITIES.map((ability) => [ability.id, ability]),
);

function scaleAbilityParams(params = {}) {
  if (!params || typeof params !== 'object') return params;
  const next = { ...params };
  if (next.lbsGain) next.lbsGain = depthLbsGrant(next.lbsGain);
  if (next.rel) next.rel = depthRelBonus(next.rel);
  if (next.moneyDelta) next.moneyDelta = depthMetaProgressBonus(next.moneyDelta);
  if (next.fixation || next.obsession || next.dependence || next.shame) {
    return depthPsychDelta(next);
  }
  return next;
}

export function getAscensionAbility(abilityId) {
  const ability = ASCENSION_ABILITY_BY_ID[abilityId];
  if (!ability) return null;
  return { ...ability, params: scaleAbilityParams(ability.params) };
}

export function getAbilitiesForForm(formId) {
  return ASCENSION_ABILITIES.filter((ability) => ability.formId === formId);
}

export function abilityIsOnCooldown(student, abilityId) {
  return (student?.ascension?.abilities?.cooldowns?.[abilityId] || 0) > 0;
}

export function tickAscensionCooldowns(student) {
  if (!student?.ascension?.abilities?.cooldowns) return student;
  const cooldowns = {};
  for (const [id, weeks] of Object.entries(student.ascension.abilities.cooldowns)) {
    const next = Math.max(0, (weeks || 0) - 1);
    if (next > 0) cooldowns[id] = next;
  }
  return {
    ...student,
    ascension: {
      ...student.ascension,
      abilities: {
        ...student.ascension.abilities,
        cooldowns,
      },
    },
  };
}
