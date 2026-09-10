# Ascension Design Lock

Implementation lock for `docs/ASCENSION_EXPANSION_PLAN.md` Part D.

This file freezes the v1 contract before prose and UI work. Ascension here is
the mythic second-cycle system: a resident reaches the mortal ceiling, completes
her evolved-form catalyst, confirms the ceremony, and is reborn at 100 lbs with
memory, relationship, and a form-specific gain loop intact.

## Hard rails

- Every ascended character is an adult woman with adult agency.
- Consent is explicit. The ceremony requires a confirm choice, and declining it
  is a valid story state.
- No medical-decline framing. Scale, immobility, and transformation are fantasy
  durable and desirable.
- Engine labels stay out of prose. Form ids and stage keys are selectors, not
  narration shortcuts.
- The existing `supernaturalForm` thin-form system remains a separate opposition
  branch for now. V1 mythic ascension uses `student.ascension` and `formId`.

## V1 scope

Ship in increments:

1. Data lock and state plumbing.
2. Ceremony eligibility and rebirth transaction.
3. Essence and ability data framework.
4. One pilot form gain loop before broad form prose.

V1 non-goals:

- No form-vs-form combat.
- No new stage ladder.
- No player ascension.
- No form respec.
- No full 18-form portrait coverage until the `ascended` lint band exists.
- No merge of the thin-form opposition branch into mythic ascension.

## Form roster

The stable ids below are code selectors. Display names may appear in fiction only
when a character says or accepts them in voice.

| Student | id | formId | Display | Gain twist | Catalyst flag |
|---|---:|---|---|---|---|
| Brittany | 0 | `valkyrie` | Valkyrie | Glory-weight from squad feasts after wins | `brittany_squad_legacy_complete` |
| Cassidy | 1 | `sphinx` | Sphinx | Gains from wrong answers and campus curiosity | `cassidy_research_archive_complete` |
| Kylie | 2 | `siren` | Siren | Audience adoration converts to pounds | `kylie_collab_format_complete` |
| Serena | 3 | `mermaid` | Mermaid | Grace in water, monumental presence ashore | `serena_record_board_retired` |
| Fiona | 4 | `galatea` | Galatea | Gallery attention banks study-weight | `fiona_retrospective_hung` |
| Destiny | 5 | `glitch_sprite` | Glitch Sprite | Rollbacks reconcile with interest | `destiny_ranked_ladder_complete` |
| Tiffany | 6 | `feast_nymph` | Feast Nymph | Gains when others feast under her roof | `tiffany_no_size_rules_charter` |
| Priya | 7 | `djinn` | Djinn | Wishes granted become booked pounds | `priya_goal_semester_complete` |
| Maya | 8 | `dryad` | Dryad | Grove banks seasonal growth | `maya_quiet_circuit_complete` |
| Chloé | 9 | `melusine` | Melusine | Salon dinners feed hostess and true form | `chloe_salon_legend_complete` |
| Reneé | 10 | `hearth_demigoddess` | Hearth Demigoddess | Cooking that changes others feeds her | `renee_tasting_menu_complete` |
| Kaylee | 11 | `fertility_goddess` | Fertility Goddess | Blessing overflow from nearby growth | `kaylee_clinic_rotation_complete` |
| Nadia | 12 | `dream_eater` | Dream-Eater | Witnessed desires become meals | `nadia_psych_thesis_complete` |
| Daisy | 13 | `angel_of_plenty` | Angel of Plenty | Blessings and gratitude carry weight | `daisy_snack_program_complete` |
| Mary Jane | 14 | `harvest_queen` | Harvest Queen | Crops set season-scale gain | `mary_jane_homestead_complete` |
| Lilith | 15 | `lamia` | Lamia | Coil-mass grows from secrets and night feasts | sixth other ascension |
| Sophia | 16 | `potion_witch` | Potion Witch | Existing compounds become true potions | `sophia_compound_catalog_complete` |
| Indiana Bones | 17 | `dragon` | Dragon | Hoard value converts to mass | `indiana_final_vault_complete` |

Talia (id 18) is outside the Part E roster. If Part A custom-student work later
claims id 18, she needs her own form contract before she can enter this system.

## Trigger rule

Standard eligibility:

- stage id 11 or higher by current `lbs`
- corruption tier id 2
- relationship tier id 3 (`Devoted`)
- no existing `student.ascension`
- roster entry exists
- catalyst flag is present

Lilith is special. Her reveal is eligible after six other residents have
ascended, and it does not require a personal catalyst.

Catalyst flag lookup for v1:

1. `student.ascensionCatalysts[flag] === true`
2. `student.formFlags[flag] === true`
3. `student[flag] === true`
4. `student.triggeredEvents` contains `flag`

This keeps the state function pure while the evolved arcs get unified flag
writers later.

## Rebirth transaction

| Field area | Action |
|---|---|
| `id`, `name`, `archetype`, `bodyType`, `role`, `age` | keep |
| `relationship`, `corruption`, `psych`, `mood` | keep |
| `evolvedForm`, `evolvedSkills`, evolved arc flags | keep |
| `triggeredEvents`, `memories`, world flags | keep |
| `lbs` | reset to 100 |
| `weekStartLbs` | reset to 100 so the next weekly delta is honest |
| `peakLbs` | archive pre-rebirth `lbs` |
| `outfit` / `wardrobe` | archive later as relics; v1 records an empty relic array |
| `supernaturalForm`, `memoryMass`, `etherealLbs` | leave untouched; old branch remains separate |
| `ascension` | create state object below |

```js
student.ascension = {
  formId,
  cycle: 2,
  ascendedWeek,
  peakLbs,
  essence: 0,
  essenceSpentPublic: 0,
  abilities: { unlocked: [], cooldowns: {} },
  formFlags: {},
  relics: [],
}
```

## Essence economy

Earn channels:

1. In-form gain: default `0.5` essence per pound gained.
2. Cycle-2 rung crossing: flat bonus by form tuning, default `2`.
3. Catalyst activity: form-specific event or ability loop, default `1-3`.

Typical weekly income target: `1-5` essence for active ascended play. Hoarding is
allowed. Spending in public increments `essenceSpentPublic`, which derives
`auraTier` for later reputation and campus reactions.

Derived tiers:

| Tier | Rule |
|---:|---|
| `essenceTier` 0 | 0 essence |
| `essenceTier` 1 | 1-3 essence |
| `essenceTier` 2 | 4-8 essence |
| `essenceTier` 3 | 9+ essence |
| `auraTier` 0 | 0 public essence spent |
| `auraTier` 1 | 1-3 public essence spent |
| `auraTier` 2 | 4-8 public essence spent |
| `auraTier` 3 | 9+ public essence spent |

## Closed ability hooks

Every ability must use one of these hooks. If an ability needs another hook, cut
or redesign it before prose work.

| Hook | Existing system target |
|---|---|
| `appetiteMod` | hunger, fullness, digest, capacity |
| `feedEvent` | feeding action, forced meal, dinner scene |
| `economyMod` | money, costs, venue/institution price |
| `interruptSpawn` | hunger or weekly-event scheduler |
| `psychNudge` | `psychState` tier movement |
| `wardrobeEvent` | outfit fit/failure/relic callback |
| `campusMod` | campus saturation, scrutiny, fattening flags |

Each form gets three abilities. Across the final 54, every hook should appear at
least five times, and no girl should have two abilities on the same hook.

## Text-engine dimensions

`textContext.js` exposes:

- `formId`
- `isAscended`
- `cycle`
- `essenceTier`
- `auraTier`

These are dimensions only. New prose comes later under `asc.*`, with the same
fallback, stage coverage, and style-ledger rules as the rest of the engine.

Cycle-2 stages 0-4 must not use mortal early-game uncertainty. She is small
again; she remembers the ceiling.

## Squad ownership

| Work | Lead | Support |
|---|---|---|
| State, save shape, dimensions | A4 Architect | A5 Editor |
| Ceremony and choice contract | A2 Psych | A7 Artisan, A5 Editor |
| Held-at-threshold register | A3 Immobility | A7 Artisan |
| Cycle-2 early register | A6 Slender | A7 Artisan |
| Form overlays and coverage | A1 Mobile / A3 Immobility by stage | A5 Editor |
| Full quality gate | A5 Editor | all leads |

## Content budget for full Part D

V1 foundation has no new prose pools. Full Part D is priced as:

- Ceremony: 5 shared pools plus 2 persona-heavy pools per girl.
- Held threshold: 4-6 shared pools with stage-11 and catalyst-state gates.
- Portrait foundation: form x stage-band coverage across 18 forms.
- Abilities: 54 beats plus refusal/cooldown lines.
- Chains: 18 three-beat chains plus one interrupt family per girl.

Do not begin the 18-form portrait grid until the `ascended` coverage band and
sample-render workflow are in place.

## Verification gates

Foundation:

- `node scripts/ascension-baseline-probe.mjs`
- `npm run text:lint`
- `npm run lint`
- `npm run build`

Later prose gates:

- `npm run text:lint -- --coverage`
- `npm run text:lint -- --volume`
- style-ledger grep with ascension form-id leak checks
- ceremony accept and decline sweep
- post-rebirth leak probe: no ceiling-scale body prose outside memory/relic slots
- blind form attribution once `asc.portrait.*` exists
