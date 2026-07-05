// The Squad — Lead: A4 Architect | Support: A2 Psych
// V1 ships Serena's pilot abilities. The closed hook set matches the design
// lock, so future rows can expand without inventing new mechanics.

export const ASCENSION_ABILITY_HOOKS = [
  'appetiteMod',
  'feedEvent',
  'economyMod',
  'interruptSpawn',
  'psychNudge',
  'wardrobeEvent',
  'campusMod',
];

export const ASCENSION_ABILITIES = [
  {
    id: 'serena_wake',
    formId: 'mermaid',
    studentId: 3,
    name: 'Wake',
    desc: 'A pool-side post-lap meal gives her second climb momentum.',
    essenceCost: 2,
    cooldownWeeks: 1,
    hook: 'feedEvent',
    params: { lbsGain: 2, rel: 3, hungerDelta: 1 },
    beat: 'asc.ability.serenaWake',
    public: true,
  },
  {
    id: 'serena_deep_breath',
    formId: 'mermaid',
    studentId: 3,
    name: 'Deep Breath',
    desc: 'Capacity training makes the next meal land deeper.',
    essenceCost: 3,
    cooldownWeeks: 2,
    hook: 'appetiteMod',
    params: { hungerDelta: 2, weeklyDigestMult: 1.15 },
    beat: 'asc.ability.serenaDeepBreath',
    public: false,
  },
  {
    id: 'serena_undertow',
    formId: 'mermaid',
    studentId: 3,
    name: 'Undertow',
    desc: 'Pulls a stalled arc back into motion as a stored threshold push.',
    essenceCost: 4,
    cooldownWeeks: 3,
    hook: 'interruptSpawn',
    params: { flag: 'undertowMomentum', value: true, rel: 4 },
    beat: 'asc.ability.serenaUndertow',
    public: true,
  },
];

export const ASCENSION_ABILITY_BY_ID = Object.fromEntries(
  ASCENSION_ABILITIES.map((ability) => [ability.id, ability]),
);

export function getAscensionAbility(abilityId) {
  return ASCENSION_ABILITY_BY_ID[abilityId] || null;
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
