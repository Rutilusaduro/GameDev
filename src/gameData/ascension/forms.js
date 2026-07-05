// The Squad — Lead: A4 Architect | Support: A2 Psych, A5 Editor
// Mythic Ascension roster. These ids are selectors; player-facing prose should
// use display names only when a character names the form in voice.

export const ASCENSION_STANDARD_REBIRTH_LBS = 100;
export const ASCENSION_CYCLE = 2;

export const ASCENSION_FORM_ROSTER = [
  {
    studentId: 0,
    studentName: 'Brittany',
    formId: 'valkyrie',
    label: 'Valkyrie',
    essenceWord: 'gleam',
    catalystFlag: 'brittany_squad_legacy_complete',
    gainTwist: 'Glory-weight from squad feasts after wins.',
  },
  {
    studentId: 1,
    studentName: 'Madeline',
    formId: 'sphinx',
    label: 'Sphinx',
    essenceWord: 'marginalia',
    catalystFlag: 'madeline_research_archive_complete',
    gainTwist: 'Wrong answers and campus curiosity feed her.',
  },
  {
    studentId: 2,
    studentName: 'Kylie',
    formId: 'siren',
    label: 'Siren',
    essenceWord: 'signal',
    catalystFlag: 'kylie_collab_format_complete',
    gainTwist: 'Audience adoration converts to pounds.',
  },
  {
    studentId: 3,
    studentName: 'Serena',
    formId: 'mermaid',
    label: 'Mermaid',
    essenceWord: 'brine',
    catalystFlag: 'serena_record_board_retired',
    gainTwist: 'Grace in water, monumental presence ashore.',
  },
  {
    studentId: 4,
    studentName: 'Fiona',
    formId: 'galatea',
    label: 'Galatea',
    essenceWord: 'patina',
    catalystFlag: 'fiona_retrospective_hung',
    gainTwist: 'Gallery attention banks study-weight.',
  },
  {
    studentId: 5,
    studentName: 'Destiny',
    formId: 'glitch_sprite',
    label: 'Glitch Sprite',
    essenceWord: 'frames',
    catalystFlag: 'destiny_ranked_ladder_complete',
    gainTwist: 'Rollback days reconcile with interest.',
  },
  {
    studentId: 6,
    studentName: 'Tiffany',
    formId: 'feast_nymph',
    label: 'Feast Nymph',
    essenceWord: 'zest',
    catalystFlag: 'tiffany_no_size_rules_charter',
    gainTwist: 'She gains when others feast under her roof.',
  },
  {
    studentId: 7,
    studentName: 'Priya',
    formId: 'djinn',
    label: 'Djinn',
    essenceWord: 'terms',
    catalystFlag: 'priya_goal_semester_complete',
    gainTwist: 'Granted wishes become booked pounds.',
  },
  {
    studentId: 8,
    studentName: 'Maya',
    formId: 'dryad',
    label: 'Dryad',
    essenceWord: 'sap',
    catalystFlag: 'maya_quiet_circuit_complete',
    gainTwist: 'Her grove banks seasonal growth.',
  },
  {
    studentId: 9,
    studentName: 'Chloé',
    formId: 'melusine',
    label: 'Melusine',
    essenceWord: 'cellar',
    catalystFlag: 'chloe_salon_legend_complete',
    gainTwist: 'Salon dinners feed hostess and true form.',
  },
  {
    studentId: 10,
    studentName: 'Reneé',
    formId: 'hearth_demigoddess',
    label: 'Hearth Demigoddess',
    essenceWord: 'reduction',
    catalystFlag: 'renee_tasting_menu_complete',
    gainTwist: 'Cooking that changes others feeds her.',
  },
  {
    studentId: 11,
    studentName: 'Kaylee',
    formId: 'fertility_goddess',
    label: 'Fertility Goddess',
    essenceWord: 'balm',
    catalystFlag: 'kaylee_clinic_rotation_complete',
    gainTwist: 'Blessing overflow from nearby growth.',
  },
  {
    studentId: 12,
    studentName: 'Nadia',
    formId: 'dream_eater',
    label: 'Dream-Eater',
    essenceWord: 'rem',
    catalystFlag: 'nadia_psych_thesis_complete',
    gainTwist: 'Witnessed desires become meals.',
  },
  {
    studentId: 13,
    studentName: 'Daisy',
    formId: 'angel_of_plenty',
    label: 'Angel of Plenty',
    essenceWord: 'grace',
    catalystFlag: 'daisy_snack_program_complete',
    gainTwist: 'Blessings and gratitude carry weight.',
  },
  {
    studentId: 14,
    studentName: 'Mary Jane',
    formId: 'harvest_queen',
    label: 'Harvest Queen',
    essenceWord: 'loam',
    catalystFlag: 'mary_jane_homestead_complete',
    gainTwist: 'Crops set season-scale gain.',
  },
  {
    studentId: 15,
    studentName: 'Lilith',
    formId: 'lamia',
    label: 'Lamia',
    essenceWord: 'hush',
    catalystFlag: null,
    revealAfterOtherAscensions: 6,
    gainTwist: 'Coil-mass grows from secrets and night feasts.',
  },
  {
    studentId: 16,
    studentName: 'Sophia',
    formId: 'potion_witch',
    label: 'Potion Witch',
    essenceWord: 'tincture',
    catalystFlag: 'sophia_compound_catalog_complete',
    gainTwist: 'Existing compounds become true potions.',
  },
  {
    studentId: 17,
    studentName: 'Indiana Bones',
    formId: 'dragon',
    label: 'Dragon',
    essenceWord: 'glint',
    catalystFlag: 'indiana_final_vault_complete',
    gainTwist: 'Hoard value converts to mass.',
  },
];

export const ASCENSION_FORM_BY_STUDENT_ID = Object.fromEntries(
  ASCENSION_FORM_ROSTER.map((form) => [form.studentId, form]),
);

export const ASCENSION_FORM_BY_ID = Object.fromEntries(
  ASCENSION_FORM_ROSTER.map((form) => [form.formId, form]),
);

export function getAscensionFormForStudent(student) {
  return ASCENSION_FORM_BY_STUDENT_ID[student?.id] || null;
}

export function getAscensionFormById(formId) {
  return ASCENSION_FORM_BY_ID[formId] || null;
}
