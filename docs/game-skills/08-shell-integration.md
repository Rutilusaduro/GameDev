# Skill: Shell Integration — Wiring the Prose Engine Into Any Game Body

The engine turns `(template, ctx)` into prose; everything the player
touches — screens, menus, saves, schedulers — is the **shell**. This skill
is how to wire the two together in a VN, a management sim, a parser game,
or a hybrid, without breaking the coherence guarantees the engine paid for.
The mechanical contract lives in the Text Engine Manifesto §3.10; this file
is the craft on top of it.

## 1. Every UI surface is a render site

Beginners render prose in the scene window and hardcode everything else.
Wrong — the cheapest density win in the genre is letting the whole
interface track state through the same pools:

| Surface | What to render | Keying |
|---|---|---|
| Scene window | Beat skeletons | full state |
| Character panel / sidebar | One-line ambient portrait (`{word.<quality>\|cap} today.` style micro-templates) | stage + mood, re-rendered on state change |
| Stat tooltips | A clause per tier, from the same ladder pools | tier |
| Menu labels | State-keyed templates (see §3) | stance/psych |
| Event log / week recap | Compressed beat summaries reusing `word.*` | delta |
| Item/wardrobe descriptions | Fit-state clauses from the garment pools | fit dims |

One rule holds them together: a surface that mentions the body uses the
body's pools. If the sidebar says "soft" while the scene says "vast," the
player feels the seam.

## 2. The stable-render rule (reactive shells)

`render()` is random. A reactive UI (React, Vue, Svelte) that calls it
inside the component body re-rolls the prose on every repaint — text that
mutates as the player hovers a button reads as a glitch, and every phantom
roll burns dedupe state.

**Render on state change, store the string, display the string.** The
render call lives in the event handler / reducer / story controller that
mutated the state; the component only ever shows a stored result. Same rule
in Ren'Py/Twine terms: render when the passage/label is entered, never in a
displayed-expression that re-evaluates.

## 3. Choices: labels are promises, scopes are sacred

- **Labels render with throwaway contexts** (Manifesto §3.10): an option
  the player never picks must not record dedupe usage or assert facts.
  Only the chosen branch renders into the event scope.
- **State-keyed labels sell the simulation.** "Order for her" reads flat at
  every stage; a label pool keyed on stance ("Order for her — she'll
  protest, once" at reluctant; "Hand her the menu back. She knows." at
  eager) makes the menu itself characterization. Budget label pools for
  the 3–4 highest-traffic menus only.
- **Choice → beat → choice.** After any choice, at least one rendered beat
  reflects it before the next menu. A menu that leads straight to another
  menu is the shell admitting it has no prose.

## 4. Event lifecycle (the scheduler owns the scopes)

One game event — a meal, an interrupt, a shopping trip — gets one scope
bundle (`facts`, `sessionUsed`, `sceneStems`) created at event start and
threaded through every render inside it. The shell's scheduler is the
natural owner:

1. Scheduler fires an event (player action, interrupt roll, week tick).
2. Shell mutates state FIRST (weight, integrity, tiers), then creates
   contexts — `ctx.d` derives once per context, never live.
3. Beats render in order; facts flow forward; the first assertion wins.
4. Event ends; scopes die. `weekUsed` survives on the character and is
   cleared by the week-advance tick, which is also where decay (fullness,
   addiction), wardrobe checks, and interrupt scheduling live.

A hybrid VN/management game keeps exactly this loop; the VN part is just
events whose beat lists are longer and whose choices branch deeper.

## 5. VN-specific wiring

- **Art and prose key on the same ladder.** Sprite tiers, CG variants, and
  pool `when` bands read the same stage id from the same deriver — never
  parallel bookkeeping. When art lags content (fewer sprite tiers than
  stages), map stages → sprites in one visible table, and let prose carry
  the granularity art can't.
- **Backlog/history stores rendered strings**, so scrollback never re-rolls.
- **Text pacing:** typewriter effects fight long composed passages. Reveal
  by beat (one render call per reveal chunk) so pacing breaks land where
  the skeleton put them.

## 6. Management-specific wiring

- Dense screens want micro-renders: one-clause templates in table cells
  (`{word.fullness}`, `{word.garment.waist}`) keep a spreadsheet screen
  alive without paragraphs. Micro-templates skip the session scope — a
  stat grid re-rolling its adjectives every refresh is fine; a stat grid
  consuming the dinner scene's dedupe budget is not.
- **Recap surfaces are echo engines.** The week-end summary re-renders the
  week's threshold events from their persistent flags ("the office chair
  did not survive Tuesday") — cheap callbacks, high value.

## 7. Saves

Persist: character stats + psych values + wardrobe with integrity + world
flags + week + economy + `weekUsed` as an array per character. Never
persist `facts` or session Sets — they die with their event. Version the
save shape from day one. Round-trip test at three game states before every
release (see `07` §5).

## 8. The dev panel ships in the debug build

The tuning loop (`07` §3) needs: pick a beat → lock or randomize state →
roll N samples **under a visible seed** → flag with per-slot notes (trace
supplies the tags). Build it as a hidden screen in the shell itself, using
the same context plumbing as the game — a separate harness drifts from
real wiring within a month. Every flagged sample carries beat, full state,
seed, text, notes; that format feeds the flag-batch loop directly.

## 9. Wiring smells

| Smell | What it means |
|---|---|
| Prose changes on hover/repaint | render call in the view layer — move it to the state layer |
| Same line twice in one event | scope bundle not shared — event lifecycle broken |
| Scene contradicts sidebar | a surface bypassing the pools |
| Menu labels assert facts | labels rendered into the event scope |
| Saves grow every session | you're persisting session scopes |
| Debug panel renders differ from game renders | panel has its own context plumbing — delete it, reuse the game's |
