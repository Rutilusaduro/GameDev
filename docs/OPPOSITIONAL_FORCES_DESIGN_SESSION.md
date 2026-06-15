# Oppositional Forces — Three-Agent Design Session

**Branch:** `cursor/oppositional-forces-design-935f`  
**Participants:** Alex (Game Designer), Jordan (Coding Genius), Raven (Author)  
**Reference:** `GAME_BIBLE.md` §§1–28  
**Output:** Appendable Bible §§29–35 + Appendix (also merged into `GAME_BIBLE.md`)

---

## Round 1 — Initial Reactions

**Alex:** Right now §22 scrutiny is a passive meter with tier penalties — useful friction, but not a *character*. The Game Bible already names the fantasy tension in §1: gluttony spirit vs. modern scarcity culture. That's our north star. The Academic Inquiry Board (AIB) should be the **face** of scrutiny from week 3 onward: a roster of administrators with agendas, not a number. Player counters must fork into viable playstyles — Talia machine-fattening, Lilith predation, Sophia compounds, Madeline discredit arcs, evolved-student abilities — each spending AP differently and each feeling like "I'm fighting back," not "RNG said no." Biggest risk: opposition that only subtracts AP. Biggest opportunity: tie every major system (evolution suspicion meters in §16, pharmacist exposure §16, network detection §19.7, campus saturation §22.2) into one escalating web so the player feels like a growing hungry god pushing against institutions that *notice*.

**Jordan:** `ProfessorSim.jsx` already runs week advance with scrutiny nudges in `scrutinyConsequences.js` — four tiers, AP penalty, public event block at Investigation. Clean extension point: add `game.opposition` slice rather than bloating root state. I'd mirror how `pharmacist` exposure works — a sub-object with meter + event queue. AIB members as static data in `src/gameData/aib.js`, weekly `processOpposition()` called from the same week-end hook as `digestStudent()`. Supernatural Act is the scary part — second evolution on all students means extending `evolvedForm` to `evolvedForm` + `supernaturalForm` OR a `evolutionTier: 1|2` flag. Don't duplicate 19 students × 30 paths; use **archetype supernatural templates** with per-id voice overlays in text engine. Performance is fine; event queue cap at 3 pending interventions keeps UI sane.

**Raven:** §23's text engine is built for stage × archetype × corruption — perfect for opposition beats. Early AIB scenes should be **institutional cold** against **bodily heat**: clipboards, wellness language, fluorescent shame — and the player's counters should read as obscene contrast (a board member swelling in a growth chamber while students feast next door). Mid-game proxies let me write **possessed austerity** — hunger curses that make food taste like ash until someone surrenders to excess. Supernatural thin-forms are the fetish jackpot: memory of every pound they carried, now hung on a frame that looks like it never ate — and re-indulgence written as **voluptuous revenge**. Spirit of Scarcity isn't a boss HP bar; it's the voice that says *you were never meant to take up space* — and every counter-scene proves it wrong with texture, sound, appetite.

---

## Round 2 — Core Mechanics Brainstorm & Critique

**Alex:** Here's the core loop proposal. **AIB** spawns at scrutiny ≥ 25 (Noticed threshold warm-up). Five standing members + rotating student advocate seat. Each has `resolve` 0–100, `corruption` 0–100 (hidden), `weightLbs`, `stance` (hostile/neutral/compromised/consumed). Weekly **agenda** picks 1–2 actions from a deck keyed to scrutiny tier. Player sees a new **Oversight** tab with pending interventions and counter windows.

| AIB action | Trigger | Effect |
|------------|---------|--------|
| Wellness audit | scrutiny 50+ | Random student flagged; −rel, +shame unless countered |
| Device confiscation | lab active, scrutiny 60+ | Remove one equipped device OR network node offline 2 weeks |
| Class size review | 2+ students stage 7+ | Force weigh-in event; +scrutiny on refusal |
| Moral wellness seminar | saturation tier ≥ Softening | Campus-wide −gain mult 1 week |
| Faculty informant | community_researcher suspicion orange+ | +agenda priority on Madeline's path |
| Budget freeze | Investigation tier | −$200/week until bribe or discredit |
| Student removal hearing | any student stage 9+ | Mini-trial; fail = student hidden 4 weeks |

**Eight player counters** (each 1–3 AP, some gated):

1. **Machine Fattening** — Talia device / growth chamber on board member (new `aibTarget` flag on chamber events); raises their `weightLbs`, reduces resolve, risk of scandal → scrutiny spike if caught.
2. **Lilith Hunt** — board member added to hunt map as difficulty-4 target; consume → permanent seat vacancy, −15 scrutiny, unlocks dark comedy log entry.
3. **Compound Seduction** — Sophia compound (Appetite Catalyst / Devotion Draught) slipped via faculty lounge; corruption track on member.
4. **Evolved Student Ops** — form abilities (hive recruitment, streamer distraction, sumo intimidation) apply `interferenceCancel` tokens.
5. **Public Discredit** — Madeline case study OR Kylie stream exposes AIB hypocrisy; success = agenda card removed from deck permanently.
6. **Bureaucratic Capture** — classroom skill `institutional_cover` + devoted student testifies; converts member to compromised.
7. **Feast Bribe** — Reneé catering + Chapter Hostess feast; temporary truce, −resolve all members.
8. **Spirit Pressure** — Gluttony tree ult: `Echoed Will` forces one agenda card to misfire (food becomes mandatory at hearing).

Escalation path: **Week 8+** Wellness Coalition (health center + gym NPCs); **Week 14+** Regional Accreditation Observer; **Week 20+** Saturation backlash cult ("Ascetic Circle"); **Supernatural Act** when `transformationPressure` class avg ≥ Committed AND scrutiny hit Investigation once OR campus tier = Regional Excess.

**Jordan:** Love the agenda deck — implement as `opposition.agendaQueue[]` with `{ cardId, targetStudentId?, resolvesWeek }`. Week-end: `tickOpposition()` draws if queue < 2. Hook scrutiny: existing `weeklyScrutinyNudge` becomes a wrapper that also calls `aibWeeklyPulse()`. Member weight should use **same digestion model** as students but capped at stage 6 for NPCs — reuse `gainSystem.digestStudent` with a shallow NPC object to avoid a second pipeline. Critique on Lilith eating board members: need `lilithTargets.aib` array so we don't break the men's hunt map. Supernatural trigger: store `game.supernatural.actWeek` once fired; gate new evolution button behind `evolvedForm != null && !supernaturalForm`. Thin-form powers as **modifiers** on existing evolved activities, not 30 new UIs — e.g. `activityGainBonus × 1.5` but lbs display as "ethereal mass" that refills via feeding scenes.

**Raven:** The eight counters give me eight tone registers. Machine fattening is mechanical reverence — straps, hum, the anti-fat bureaucrat discovering capacity. Lilith is predator comedy with bite. Compounds are slow corrupt seduction — watching resolve melt into craving. For supernatural thin-forms, each archetype needs a **Hollow Phase** voice: they remember being vast; their skin remembers stretch; movement is too light, wrong, hungry in a new register. Re-indulgence scenes are mandatory erotic pillars — thin waist shattering into softness again in real time. Spirit of Scarcity proxies should speak in **wellness euphemism** that curdles into cosmic denial — "portion control" as existential law.

**Alex:** Jordan's modifier approach sells me — supernatural isn't a content reset, it's a **second act** on existing paths. One fix: eight counters is right but don't make all equal early. Weeks 3–10 only machine fattening, feast bribe, evolved ops, and discredit should be reliable; Lilith and compounds need gates so we don't front-load apex fantasy. Accreditation Observer stacks **duplicate** agenda cards — player needs visible telegraph.

---

## Round 3 — Refinement & Integration

**Jordan:** Refined data model:

```js
// game.opposition
{
  aib: {
    members: [{ id, name, role, resolve, corruption, weightLbs, stance, flags }],
    agendaQueue: [],
    deckRemoved: [],      // discredited cards
    scandalMeter: 0,      // failed covert ops
  },
  proxies: {
    wellnessCoalition: { active, zeal },
    accreditation: { active, observerName, weeksRemaining },
    asceticCircle: { active, strongholdNode },
  },
  supernatural: {
    actTriggered: false,
    actWeek: null,
    scarcityPressure: 0,  // 0–100, antagonist HP analog
    curseQueue: [],
  },
}
```

`processWeekEnd()` order: digestion → passive gain → **opposition tick** → scrutiny/saturation → relationship ecology. UI: new tab `oversight` when `aib.unlocked`. Text: `src/textEngine/scenes/opposition/` + `supernatural/`. Flag nightmare: don't rewrite evolution modal — add second modal `SupernaturalAscensionModal.jsx` triggered when `canSupernaturalEvolve(student)`.

**Alex:** Balance pass: AIB `resolve` lowers when member `weightLbs` crosses stage 3+ — mirrors player's power fantasy without instant win. Scandal meter > 60 forces **Emergency Hearing** (high stakes week, can't end week until resolved). Supernatural Act: all students with `evolvedForm` get offer same week; students without evolved form get **Latent Appetite** passive (+corruption rate) so they're not left behind. Scarcity Spirit direct mechanics: weekly **Hunger Curse** (random student 0 gain + hunger spike) countered by **Refeast Ritual** class action (4 AP, clears curse, mass calories). Endgame paths: (a) corrupt all AIB → institutional capture win-state achievement, (b) scarcity pressure to 0 via re-feeding all thin-forms to stage 6+ in one semester week chain, (c) Lilith consumes Ascetic Circle leader → bad ending comedy.

**Raven:** Sample prose below — three beats. I'll also spec text pools: `aib.hearing.open`, `counter.machine.memberSwelling`, `supernatural.thinReveal`, `supernatural.refeed.surge`.

### Sample Prose — Early Board Confrontation

The conference room smells like toner and denial. Chairwoman Vance has a folder thick enough to bruise — photos from the quad, timestamps, your departmental letterhead on catering invoices. She doesn't sit; none of them do, as if the chairs might confess complicity.

"Professor," she says, and the word is a scalpel, "the Academic Inquiry Board has concerns about the *wellness trajectory* of your cohort."

Behind her, a screen wakes: Brittany laughing mid-bite, Serena's shoulders filling a gym doorway, the kind of evidence that pretends to be neutral. Vance taps the table once.

"We're scheduling individualized assessments. Cooperation is expected."

Your belly-deep hunger stirs — not for food, but for the satisfying wrongness of proving her language hollow. Somewhere in the building, a vending machine hums like an altar.

### Sample Prose — Mid-Game Counter (Public Discredit)

Madeline doesn't raise her voice. She doesn't have to. The projector throws her thesis title across the lecture hall in clean sans-serif: **Aesthetic Abundance as Embodied Resistance**.

Vance sits in the front row with her jaw set. On slide fourteen, side-by-side stills: the Board's "portion guideline" banquet (glistening, abundant, hypocritical) and your class's "unauthorized" potluck (also abundant — but honest). The room learns a new silence.

A man from Accreditation adjusts his glasses. Madeline marks the pause, then reads the line you've been feeding her for weeks — calm, surgical, erotic in its precision:

"They call it excess when we choose it. They call it wellness when they serve it."

The hashtag is live before the Q&A ends. Vance's resolve doesn't break in public. It *softens*, which is better.

### Sample Prose — Supernatural Thin-Form + Re-Indulgence

Maya steps into the moonlight and the wrongness steals your breath. She is *thin* — actually thin, wrist-narrow, hip-swift, a ghost of the girl who once blocked a hallway with her hips alone. Her evolved crown still sits on her head like a joke the universe regrets.

"I can feel every room I used to fill," she whispers. Her voice hasn't shrunk — only the body. Hunger rolls off her in waves, sharper now, stripped of cushion.

You offer the tray. She hesitates — one heartbeat of ascetic static crawling up her spine, the Scarcity Spirit's last bargain.

Then she breaks.

The first bite is almost polite. The third is not. Softness returns like a tide: belly rounding in real time, thighs blooming warm against each other, the remembered *weight* rushing back into her as if her skin kept the blueprint. Maya moans, half relief, half triumph, hands framing the swell as it overtakes her ribs.

"Again," she says, eyes bright, voice thickening with the return of mass. "I want to be *more* than I was."

---

## Round 4 — Final Synthesis

The following sections are appended to `GAME_BIBLE.md` as §§29–35.

---

# [GAME BIBLE §§29–35 — see GAME_BIBLE.md]

---

## Implementation Priority

1. **AIB core + Oversight UI** — `opposition` state slice, 5 members, agenda queue, scrutiny integration (highest impact per line of code).
2. **Four early counters** — feast bribe, evolved-student cancel tokens, machine fattening hook on growth chamber, public discredit (Madeline/Kylie paths).
3. **Text engine opposition module** — `aib.*` pools, hearing scenes, weekly nudge prose.
4. **Mid-game proxies** — Wellness Coalition + Accreditation Observer layering.
5. **Supernatural Act trigger + thin-form data layer** — second evolution flag, archetype templates, ascension modal.
6. **Refeast ritual + scarcity pressure meter** — supernatural week-end processing.
7. **Remaining counters** — Lilith AIB targets, compound seduction, spirit ultimates.
8. **Endgame confrontation paths + achievements** — institutional capture, scarcity banishment, comedy bad end.

---

*Session complete. Merged into GAME_BIBLE.md §§29–35.*
