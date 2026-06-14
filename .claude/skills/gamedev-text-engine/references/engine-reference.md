Engine reference — selectors, lexicon, modules, roster
Lookup material distilled from `engine.js`, `lexicon.js`, `modules.js`, and the `weighIn/` scenes. Load when you need exact selector names, available descriptor modules, or the student roster. The repo's `docs/modular-text-system.md` is the upstream source of truth.
Context and helpers
`when` selector vocabulary
Derived dimensions (ctx.d)
Lexicon: word.* modules
Core descriptor modules
Student roster (studentId)
Context and helpers
`createContext({ subject, ref, group, week, season?, skillEffects, globals })` returns `ctx` with `ctx.d` (derived selector dimensions for `subject`), plus `subject`, `ref`, `group`, `week`, `season`, `skillEffects`, `globals`. `ref` is the comparison character (drives `:ref` and `relSize`); `group` is an array (drives `:group` and `group.desc`). Season auto-derives from `week` if omitted (4 weeks per season: fall, winter, spring, summer).
Exported helpers (from `engine.js`): `render`, `createContext`, `registerModule`, `registerPool`, `registerModuleVariants`, `hasModule`, `pick`, `weightedPick`, `getSeason`, `relSize`, `stageBucket`, `groupStageBucket`, plus `STAGE\_KEYS`.
`when` selector vocabulary
A `when` object is ANDed: every condition must match, and the count of matched conditions is the variant's specificity score (a Min/Max range pair counts once). Array values match by membership; scalars by equality. Booleans coerce both sides.
Range conditions (`…Min` / `…Max`, integer):
`stageMin`/`stageMax`, `weekMin`/`weekMax`, `devourMin`/`devourMax`, `fullnessMin`/`fullnessMax` (fullness ratio 0–1+), `hungerTierMin`/`hungerTierMax`, `addictionLevelMin`/`addictionLevelMax`, `fixationTierMin`/`Max`, `obsessionTierMin`/`Max`, `dependenceTierMin`/`Max`, `shameTierMin`/`Max`, `campusTierMin`/`Max`, `gainLbsMin`, `startStageMin`/`Max`, `endStageMin`/`Max`, `stagesJumpedMin`, `equippedCountMin`, `deviceDependenceTierMin`, `deviceDependenceMin`.
Equality / membership conditions:
`studentId` (scalar or array), `bodyType`, `archetype`, `mood`, `corruption`, `relationship`, `relSize` (`much\_smaller`|`smaller`|`similar`|`larger`|`much\_larger`), `evolvedForm`, `bodyState`, `season` (scalar or array), `skill` (truthy in `skillEffects`), `equippedWaist`, `equippedHead`, `growthZone`, `weightBand`, `nodeId`, `targetType`, `role`, `deviceId`, `modeId`, `malfunctionTier`, `hasAttachment`, `deviceDependenceTier`.
Boolean conditions (match truthiness): `campusFattening`, `isMalfunction`, `furnitureComfortLow`, `limitRemoved`, `bigScale`.
Anything else falls through to `ctx.d\[key]` and then `ctx.globals\[key]` (equality or array membership) — so any derived dimension below can be used as a `when` key directly even if it isn't named above.
Tips: prefer `stageMin`/`stageMax` bands for weight ranges; use `studentId` (with a high `weight`) for persona lines; use `corruption`/`mood`/`bodyType` for psychology- and shape-shaded generics. Reserve `priority` for hard suppression (it gates the pool to the max-priority matches).
Derived dimensions (ctx.d)
Available on every `subject` and usable as `when` keys: `stage`, `corruption`, `relationship`, `bodyType`, `archetype`, `mood`, `evolvedForm`, `studentId`, `lastCompound`, `relSize`, `refStage`, `fullnessRatio`, `devourCount`, `hasDevoured`, `addictionLevel`, `hungerTier`, `inWithdrawal`, `bodyState`, `bodyTypeEff`, `bodyStageBump`, `equippedWaist`, `fixationTier`, `obsessionTier`, `dependenceTier`, `shameTier`, `hasDeviceEquipped`.
Lexicon: word.* modules
Stage/season/body-bucketed descriptor dictionaries, registered as `word.\*`. Reuse these instead of hand-writing body description. All accept `:ref` (e.g. `{word.size:ref}` describes the reference character) and have built-in bucket fallbacks, so they never break.
Module	Varies by	Use for
`{word.size}`	weight stage	a size adjective ("plush", "vast", "room-filling")
`{word.movement}`	weight stage	how she moves at her size
`{word.body}`	bodyType × stage	a shape phrase ("a heavy belly past the hips")
`{word.clothingFit}`	season × stage	clothing + fit ("a tank straining across the bust")
`{word.fullness}`	fullness ratio	how full she is ("stuffed to her limit")
Body types in the matrix include: `pear`, `apple`, `hourglass`, `athletic`, `straight`, `rotund`, `voluptuous`, `mom\_bod`, `fertility\_goddess`, `topHeavy` (plus a `default` row). Confirm the live set in `lexicon.js` (`BODY\_WORDS`).
Core descriptor modules
Registered in `modules.js` (these use `best` mode — most-specific wins):
Module	What it yields
`{subject.name}`	the subject's full name (falls back to "Someone")
`{subject.first}`	first name only
`{subject.lbs}`	rounded current weight as a string
`{char.desc}`	composite size + movement + corruption description (recurses into `{word.\*}`); keyed on stage × corruption with a wildcard fallback
`{sizeCompare}`	subject's size relative to `ctx.ref` (keyed on `relSize`)
`{bodyType.desc}`	thin wrapper over `{word.body}`
`{clothing.desc}`	thin wrapper over `{word.clothingFit}`
`{group.desc}`	a quick read on `ctx.group` (size + averaged stage flavor)
`{device.label}`	equipped device display name from `globals.deviceLabel`
