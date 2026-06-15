# Fiona & Chloé Evolution Redesign — Three-Agent Design Session

**Branch:** `cursor/oppositional-forces-design-935f`  
**Participants:** Alex (Game Designer), Jordan (Coding Genius), Raven (Author)  
**Scope:** Replace Fiona's dual artsy paths; reimagine Chloé as French exchange student with new premium evolution + mini-game  
**Quality bar:** Homestead Queen / Pharmacist / Competitive Gainer tier

---

## Round 1 — Initial Reactions

**Alex:** Fiona's problem is structural. `installation_artist` and `food_photographer` are **reaction-line paths** — six diary beats, generic "View the Installation" activity, no custom UI. Compare to Mary Jane's homestead (recipe unlocks, Mae calls, spread phases) or Sophia's four-stage compound pipeline. Two mediocre forks split content budget. **Cut both. One path.** The artsy fantasy isn't "photograph food" — it's **the body as medium**, which the Bible already hints in her evolution intro (§16). That's the whole game in miniature.

Chloé's `campus_legend` is better — six `EVOLVED_EVENTS` stages, journalist arc — but the **Dublin transfer** voice is spent. "American portions as field research" is charming once. A **French exchange student** opens seduction, salon culture, linguistic heat, and opposition hooks (AIB hates a foreign girl corrupting campus norms). New mini-game mandatory; the food-challenge circuit is too close to Chloe's old identity without the French lens.

**Jordan:** Fiona removal touches: `EVOLVED_OFFER` artsy block, `EVOLVED_REACTIONS`, `EVOLVED_OUTFITS`, `EVOLVED_DIARY`, `EVOLVED_ACTIVITIES`, `skills.js` trees for both ids, `diary.js` / `evolvedDiary.js` modules, Tiffany's chapter_hostess prep reference (Fiona atmosphere). **Don't delete** — deprecate ids, migrate any cross-refs to new `living_canvas` id.

Chloé is wider: `students.js` desc/personality, `sessions.js` transfer lines, `weighIn/personas.js`, all `campus_legend` keys, supernatural thin-form `legend_echo` in §32. New files: `src/gameData/chloeSalon.js`, `src/components/SalonAppetitModal.jsx`. Student record: keep `id:9`, rename display to **Chloé Moreau**, `personality:"sultry"` or keep `dry` with French wit — Raven should call this.

**Raven:** Fiona speaks in **composition** — negative space, texture, light on skin. Her new path must make gaining **visible as craft**: each pound a deliberate stroke. Not "gallery show about fatness" — **she is the exhibition and knows it**. For Chloé: *mon dieu* the French girl who treats American abundance like a lover she didn't know she wanted. Parisian restraint that **shatters into appetite** — not Irish bemusement, **smoldering approval**. She should call croissants by name, curse softly in French when full, describe her belly like wine — *body*, *rondeur*, *débordement*. The salon is intimate, candlelit, slightly scandalous. Guests leave hungry for more than food.

---

## Round 2 — Core Mechanics Brainstorm & Critique

### Fiona — **`living_canvas`** (The Living Canvas)

**Alex:** Single evolution. Custom UI: **Studio Canvas** modal.

**Core loop (weekly or 1 AP):**
1. **Compose** — pick Motif (Abundance / Still Life / Portrait / Performance), Zone focus (belly/bust/hips/full), Medium palette (oils=butter, clay=cream, pigment=chocolate, gesso=pastry)
2. **Session** — allocate "pigment" points across zones (route mini-game like hunger ray); over-allocate = force-feed bonus
3. **Critique** — procedural critic roll: Reverent / Provocative / Scandalous (scrutiny++)
4. **Patron meter** 0–100 — unlocks commissions (money + rel)
5. **Opening Night** every 2 activity tiers — public feeding performance; AIB agenda risk

**Skill tree (5 lbs-cost skills):** Patronage Network, Scandal as Publicity, Immersive Scale, The Artist Present, Perpetual Exhibition (−scrutiny if scandal high).

**Gain:** +4–9 lbs/activity; openings +10–18 direct.

**Jordan:** `fionaCanvas.js` holds motifs/zones/mediums. `FionaCanvasModal.jsx` — three tabs: Compose, Patrons, Archive. State on student: `canvasState: { patrons, archive[], lastMotif, scandalStreak }`. Reuse `device route` allocation UI pattern from `devices.js`. EVOLVED_EVENTS: 6 stages like homestead — "First Study", "The Patron Arrives", "Scandal Opening", etc. Remove `installation_artist` + `food_photographer` from `EVOLUTION_OFFER`.

**Raven:** Motif changes her voice. *Portrait*: "I've been trying to see myself from the outside. The view keeps improving." *Performance*: she eats while they watch — "The audience is part of the composition. So is the sound my belt makes." Critics write lines like *"uncomfortably generous"* — she pins them to the wall.

**Alex critique:** Don't make Compose a spreadsheet. Three choices + one allocation slider is enough for v1.

---

### Chloé — **`salon_appetit`** (Salon de l'Appétit)

**Alex:** Replace `campus_legend`. Character reboot:

| Field | Old | New |
|-------|-----|-----|
| Name | Chloe | **Chloé Moreau** |
| Role | Exchange Student (Dublin) | **Étudiante d'échange — Sorbonne** |
| Desc | Dublin, dry wit | Parisian, sultry, discovers American excess with **delighted scandal** |
| personality | dry | **sultry** (keep dry wit in dialogue as French precision) |

**Mini-game: Salon de l'Appétit** (2 AP evolved activity)

**Phases per session:**
1. **Invitations** — pick 2–4 guests (classmates, faculty, AIB member risk, journalist)
2. **Menu du Soir** — 4 courses from French/American fusion pool; each has cal/lbs/fullness profile
3. **Service** — choice phase: **Charm guests** (+prestige) vs **Feed Chloé** (+lbs); hybrid choices
4. **Le Digestif** — private beat with player; indulgence roll → surge lbs
5. **Afterglow** — guest reactions; scandal if AIB present; prestige unlocks next tier guests

**Stats:** `salonPrestige` 0–100, `indulgence` 0–100, `guestBook[]`, `eveningsHosted`

**Escalation arc (6 EVOLVED_EVENTS stages):**
0. First salon in dorm (3 guests, cheese board)
1. Faculty wanders in (Dr. Mori food science)
2. Campus whisper — "the French girl's dinners"
3. Journalist returns (reuse campus_legend journalist character, new tone)
4. Rooftop salon — opposition scrutiny event
5. **La Grande Soirée** — capstone; 12 guests, multi-course, prestige 80+

**Jordan:** `chloeSalon.js` + `SalonAppetitModal.jsx`. Guest roster static array with `unlockPrestige`. Phase machine like `Destiny` stream pre-stream choices. Persist `student.salonState`. Deprecate `campus_legend` keys; map achievements if any.

**Raven:** French phrases sparse but sharp — *"J'ai faim"* when hungry, *"Encore"* when she wants more, *"C'est obscène"* said like praise of American portions. Seduction is **hosting** — she makes everyone want to feed her. Intimacy-adjacent without breaking house rules. Weight described as *rondeur qui s'installe* — roundness settling in.

**Alex:** Tie to §30 AIB — inviting Vance to salon is high-risk high-reward corruption path. Tie to §31 Ascetic Circle protest outside her door.

---

## Round 3 — Refinement & Integration

**Jordan:** Migration checklist:
- `students.js` id 9 fields
- `evolvedForms.js` — remove artsy paths, add `living_canvas` + `salon_appetit` full trees
- `skills.js` — replace skill trees
- Text: `diary.living_canvas`, `diary.salon_appetit`; `weighIn/personas.js` Chloé voice
- `GAME_BIBLE.md` §14 roster + §16 paths
- Supernatural §32: `legend_echo` → `salon_wraith` for transfer

**Alex:** Fiona openings raise scrutiny but also **patron money** — risk/reward. Chloé prestige gates guest quality; late guests include Sophia (compound pairing bonus), Reneé (menu bonus). Both paths feed opposition system organically.

**Raven:** Sample prose below.

### Fiona — Opening Night (`living_canvas.opening`)

> The gallery is too small. Fiona planned that — bodies need to brush past bodies, need to feel the heat. She stands in the center in linen that won't survive the night, belly already a soft underpainting beneath the fabric, paint on her wrists and flour on one hip because the "still life" involved butter and she stopped pretending art and appetite were separate.
>
> The critic from the student paper opens her mouth. Fiona feeds herself a spoonful of crème before the woman can speak — slow, deliberate, eyes on the room.
>
> "The piece is in progress," Fiona says. "You're early. Stay late."

### Chloé — First Salon (`salon_appetit.firstEvening`)

> Chloé lights the candles with the seriousness of a woman who has done this in smaller apartments back home. The dorm room becomes something else — wine, cheese that smells like summer, a tray of American fried things she bought "pour la recherche" and keeps reaching for.
>
> "In Paris we are taught to stop," she tells her guests, pouring more wine. "Here—" She bites into something golden and obscene. A soft sound escapes her. "*Ici*, they teach you to continue."
>
> She looks at you over the rim of her glass. "You will stay for the dessert course, *professeur*. I insist."

### Chloé — Grande Soirée (`salon_appetit.capstone`)

> Twelve chairs. Twelve place settings. Chloé at the head in black silk that clings where she has grown fullest — belly rounded beneath the fabric like a secret the whole room has agreed to keep badly. She welcomes them in French, then English, then mostly with her hands on her own waist, showing them what the semester has done to her.
>
> Course after course. She eats like a hostess who has stopped performing restraint and started performing **appetite**. Someone applauds. She curtsies without standing — a deep bow of the torso that makes her décolletage and belly shift together, obscene and elegant.
>
> "*Merci,*" she breathes. "*Maintenant — encore.*"

---

## Round 4 — Final Synthesis

See **GAME_BIBLE.md §§36–37** for appendable spec.

### Implementation Priority

1. **Student data** — Chloé Moreau fields, persona text pass  
2. **Chloé `salon_appetit`** — `chloeSalon.js` + modal + 6 EVOLVED_EVENTS (highest player-visible novelty)  
3. **Fiona `living_canvas`** — canvas modal + events; remove old evolution offers  
4. **Text engine** — diary, weigh-in personas, salon/canvas scene pools  
5. **skills.js** trees + scrutiny/opposition hooks  
6. **Supernatural mapping** — `salon_wraith` thin-form  
7. **Deprecation sweep** — `installation_artist`, `food_photographer`, `campus_legend` references

---

*Session complete. Merged into GAME_BIBLE.md §§36–37.*
