# Professor Sim — Design Bible

## Core Development Rules

### Weight Stage Coverage (non-negotiable)

Any constant, dialogue, description, or reaction that relates to weight must have an entry for **every applicable weight stage** — no gaps, no fallback blur. Use "contextually relevant" as the only filter:

- Immobility, doorframe descriptions, floor-pooling mass → Blob (stage 10) and ascension stages only
- Clothing strain, chair complaints → stage 3+ (Heavy and up)
- Evolving identity, self-concept shifts → all 11 base stages
- Ascension-path content → all 5 stages of that path + convergence where applicable

**The full stage ladder** (canonical — see `src/gameData/stages.js`):
| Stage | Label | Min lbs |
|-------|-------|---------|
| 0 | Slight | 80 |
| 1 | Slim | 100 |
| 2 | Soft | 135 |
| 3 | Chubby | 162 |
| 4 | Plump | 195 |
| 5 | Heavy | 238 |
| 6 | Fat | 285 |
| 7 | Very Fat | 360 |
| 8 | Enormous | 465 |
| 9 | Colossal | 595 |
| 10 | Blob | 820 |
| Celestial 0–4 | Seed → Apex | 820+ |
| Umbral 0–4 | Seed → Sovereign | 820+ |
| Convergence | — | secret |

When writing a new constant: count the entries before committing. If the count doesn't match the applicable range, add the missing ones.

---

## What This Game Is

This game is about fat women being made fatter, and the way their bodies and personalities transform as they grow. That transformation is the subject, the pleasure, and the point. It is framed as a good thing — desirable, beautiful, erotic — and the game never apologizes for that framing or hedges toward a more acceptable reading.

The player's role is to facilitate this change: to feed, encourage, create conditions, witness. The women are not passive recipients; they are subjects who discover, resist, lean into, and ultimately inhabit their growth in ways that feel authentic to who they already are. The game is interested in both the physical reality of gaining weight and the way it reshapes identity, confidence, and self-understanding.

## Tone

Warm, sensual, specific. The game looks at fat bodies the way good erotica looks at any body: with genuine attention and appreciation, not clinical distance. A heavier stomach is soft and round and warm and real, not a "medical concern." Thighs pressing together are thick and smooth and present, not a problem to be solved.

The descriptions should earn their specificity. "She's gained weight" is not a description. "Her belly rounds forward in a generous apron below the navel, spilling over her waistband in soft folds, and when she sits her thighs spread wide and warm across the chair" is a description. The difference is care.

The game is unambiguously erotic in its interests. It doesn't pretend otherwise.

## The Women

Each student is a complete person before the gaining begins, and the gaining shapes her in ways that grow from who she already is. The cheerleader finds power in her new size; the competitive athlete redirects her drive into bigger arenas; the bookworm turns it into literature or research; the quiet girl blooms, gradually and then completely, into presence.

Their reactions to gaining should feel authentic and individual. Some resist initially, then find something they recognize. Some lean in immediately. Some process it intellectually before they feel it in their bodies. What they share is an arc toward acceptance and pleasure — they are all heading, at their own pace, toward inhabiting their growth fully.

The gaining is not something happening to them against their will. By the point the game is in full motion, it is something they want, something they participate in, something they find beautiful about themselves. The player's job is to get them there and witness what they become.

## Writing Bodies

**Head to toe.** A description that covers only one part of the body is incomplete. Start at the face — cheeks, jaw, chin — work down through neck, shoulders, arms, chest, belly, hips, thighs, and bottom. Every stage of growth affects all of it.

**Present tense, observational.** Describe what is there, not what changed. "Her thighs are enormous and warm and pressed together from hip to knee" rather than "her thighs got a lot bigger."

**Warm and appreciative.** The fat is soft. The curves are generous. The weight is abundance. The belly is round and present and real. None of this is a problem. None of this requires qualification.

**Sensory.** Weight, warmth, softness, the creak of a chair, the way fabric strains or accommodates, the slight breathlessness on stairs, the way she takes up space. The body is physical and the descriptions should be physical.

**Avoid:** clinical language ("adipose tissue," "BMI"), apologetic framing, any suggestion that the size is a problem or the gaining is a mistake. Before/after framing that implies the before was better. The word "unfortunately."

## The Evolved Forms

At mid-game, each student finds a path that integrates her size into a new identity. These aren't consolation prizes for having gotten fat — they are the culmination of who she's always been, brought into focus by the body she now has.

The sumo wrestler was always competitive; the body found the sport. The feedee creator was always comfortable being seen; the body gave the content. The anonymous blogger was always observant and private; the body gave her something private and worth observing.

The evolved paths should feel inevitable. The player should be able to see, looking back, that this was always where she was going.

Each evolved path has an ongoing narrative — five stages of an activity the player can witness, reactions that evolve with her weight, diary entries that document how she thinks about herself and her new identity. The player has a relationship with this specific woman's transformation, not just a before/after.

## The Professor

The player character facilitates but also witnesses. They create conditions — meals, study sessions, private dinners, opportunities — but the women make choices. The professor's role is intimate: they see the transformation up close, they're invested in it, they find it beautiful.

This is not framed as exploitation. The relationship is one of genuine investment. The professor wants to see these women grow, and they find the growing beautiful, and the women — eventually, each in their own time — feel that regard and understand what it means.

## Ascension

The divine progression is the game's late content and its most explicitly fantastical layer. Bodies that exceed mundane categories entirely: wings, horns, void-dark skin, halos. The women who ascend have become something else — not less human, but more. Their size is divine in the literal sense. Their presence has weight that isn't just physical.

The celestial and umbral paths represent two kinds of overflow: warmth and hunger, light and void, abundance given and abundance consumed. Both are beautiful. Both are beyond ordinary description.

## EP3: Supernatural

The planned supernatural expansion adds four forms that sit between "college student" and "goddess": werewolf, vampire, half-ghost, djinn. These forms unlock at the Devoted tier and stack on top of an existing evolved identity. They are genuinely monstrous in the classical sense — beautiful and terrible and beyond the ordinary, in ways that are explicitly erotic. The body is no longer entirely human. That is the point.

---

## Reference Style Notes — Source Texts

These notes are synthesized from six source stories shared by the project owner. Internalize this as the descriptive register for all in-game writing, especially for blob-stage and above bodies.

### Physical Description

**Motion is the primary description technique.** Don't describe fat statically. Describe it in motion: the momentum of a belly swinging forward as someone turns, the way flesh continues moving for several seconds after the person stops, the lag and settling after each step. Fat has its own physics — delayed, heavy, present. *"Everything moved on its own for about thirty seconds after each footfall."*

**Sound is a secondary description technique.** The rhythmic swish of thighs passing each other. The labored breath. The creak of a chair accepting weight. The specific three-phase sound of a very heavy step: grunt on the lift, stomp on the land, sigh for recovery. Gut sounds — deep satisfied gurgles after a large meal.

**Clothing failure marks milestones.** Buttons popping off. Seams splitting with specific onomatopoeia. Elastic waistbands giving. The moment a garment fails is a milestone in the character's progression and should be treated as one — with some ceremony and with the character's reaction noted.

**Spatial blocking conveys extreme size better than measurement.** "If you looked at her straight on you'd see mostly belly, her shins below it, maybe her hands resting on the middle." The doorframe she fills completely. The chair that lifts slightly when she stands. These spatial facts communicate scale through the environment reacting to the body.

**Architectural/comparative framing grounds the imagination.** Yoga ball belly. Wrecking-ball gut. Truck-tire thighs. Circus-tent dress. When describing very large bodies, anchor the reader in a known object. The comparison should feel exactly right, not reach.

**Procedural detail creates physicality.** When a very heavy woman gets dressed, gets up from a chair, climbs into a car — describe the actual sequence of events. Tilt onto back, pull pants off, roll to stomach, get shirt over head. The step-by-step makes it real. This is observation, not cruelty.

**Weight numbers as punctuation, not constant tracking.** Don't report weight in every paragraph. Deploy it at emotional high points: when she steps on the scale, when someone says the number out loud, when she says it herself. The number lands harder when it's been earned by the scene.

### Vocabulary Register

Stay in the middle register — neither clinical nor cartoonishly crude. The goal is language that feels lived-in and matter-of-fact, the way a person thinks about their own body.

**Use:** belly, gut, rolls, belly rolls, apron (the hanging overhang), flab, blubber, bulk, softness, roundness, double chin, neck fat, handles, folds. Plus body parts named plainly: thighs, ass, tits, hips, back rolls. Body fat described as warm, heavy, soft, pillowy.

**Avoid:** adipose tissue, BMI, obesity (as a clinical noun used neutrally — the source texts use it but always with some charge), "weight issues," any construction that implies the fat is a disease or mistake.

**The belly is the primary architectural feature.** It is central, forward, dominant. Everything else is organized around it. Breasts and ass are secondary; they often appear as things the belly interacts with or eclipses.

### Tone and Register

**Affectionate grotesque.** The body is funny, inconvenient, physically real, and sympathetic, all at once. Neither pure cringe nor pure celebration. The reader should feel affection for the body being described even when the description is comedic.

**Bathos.** Big emotional moments get punctured by physical reality. Someone makes a declaration of self-acceptance — the bartender delivers her onion rings. Someone achieves a philosophical breakthrough — she's still sitting on her ass unable to get up. This is not mockery; it's honesty about how the body and the spirit coexist.

**Food is never just food.** Every specific food carries an emotional charge. The last chicken tender on the plate is anxiety, restraint, desire. The milkshake made with heavy cream and cake is love. The ordered salad instead of the burger is self-betrayal. Name the specific food. Let it mean something.

**Lists for accumulation.** When describing a very large body comprehensively, or building a sense of excess, use grammatical lists rather than metaphor. "Her lungs screaming and her throat burning, her thighs so tenderly chafed that she was practically salivating at the thought of the gold bond powder, her belly sore from hanging vertically longer than it had in years and her upper arms much the same." Accumulation communicates completeness — nothing left out, every part accounted for.

### Blob Stage and Above — Specific Notes

At blob stage and above, the descriptions should shift toward the architectural. The body has become environmental. She fills a space rather than occupying it. 

- Movement is deliberate, slow, and creates visible effects in the space around her — furniture reacts, floors communicate, doorframes become an issue.
- Breath and cardiovascular effort are present in almost every scene — not as pathology, but as physical texture.
- Her size is simply where she is now. The narrative doesn't apologize for it or marvel at it — it observes it with precision and warmth, as a good nature documentary observes landscape.
- Other people's reactions are data. Note who can't look away and who looks away first.
- She is aware of her own size with the familiarity of someone who has been living in this body for some time. She knows how much room she takes. She knows what chairs will hold her and which ones she's not going to try. This awareness is practical, not distressed.
- At the extreme end (600+ lbs, ascended), spatial comparisons to objects should escalate accordingly — the belly that precedes her through doorways, the chair that doesn't exist yet that would hold her comfortably, the way she has to turn sideways and it doesn't actually help.

### The Professor/Feeder POV — Story_w Notes

This story is written in second-person, directly addressing the feeder/professor. It's the single best model for the professor character's inner voice in this game.

**The escalation of desire is documented as accumulation, not explosion.** "You thought 150 would be enough. But once she got there, you wanted 160. And then 170. Eventually, you realized you'd never be satisfied." The desire grows by increment. Each milestone creates the next one. Write the professor's investment this way: always a little further, always a little more, never arriving at a fixed ceiling.

**Investment and love are not distinguished.** The professor doesn't separate "I want her bigger" from "I love her." They're the same impulse. The food is an expression of care. The weight gain is an expression of intimacy. This is the emotional logic of the game and it should be present in the professor's voice throughout — not analyzed, just lived.

**The subject's consent is tacit, not declared.** "She knew what you were doing to her, and she accepted it." She didn't say yes explicitly. She stopped saying no. She noticed your reaction and chose to keep getting what caused it. This is how the relationship works in the game — the students don't need to announce their consent; they demonstrate it by eating, by coming back, by leaning in. When she says "I want to be heavier," that's the culmination, not the premise.

**The outside world's reading matters.** The story uses friends and family as a mirror — they see what's happening and it tells us something about the professor's power and investment. In the game, Vaughan, the HR observer, and the jealous students serve this function. Their reactions are evidence of what the professor has done.

**The warmth of the conclusion is not hedged.** "If she wants to lie around, cramming food into her six-hundred-pound body and getting fucked passionately all day long, who am I to judge?" The judgment gets resolved. The friends come around. The story ends with acceptance. The game should do the same — the arc ends in arrival, not in ambiguity.

### Bodies Described Through Others' Eyes — Story_1 Notes

This fantasy story introduces weight gain through a third-party observer (Quinn) who watches two women she's attracted to get larger. Her gaze is the mechanism for almost all the physical description. This is useful model for the professor's observational register.

**Reveal the body through clothing as constraint.** "Her breasts, squeezed inwards and upwards by the pressure of her outgrown leather armor." "The abdomen that was straining out against her leather armor." Clothing that's too small creates the body's new shape for the reader. The constraint reveals the abundance underneath. In game writing, clothes should be present and reactive: the waistband accommodating, the seams straining, the hem riding up.

**New fat on muscle is described as addition, not replacement.** "New pockets of fat made for perfect complements to Liya's muscle." The fat doesn't erase what was there; it adds to it. This applies to athletes especially — the sumo wrestler's muscle and mass coexist and the body becomes more, not different.

**Fullness described with physical texture, not shame.** The goodberry bloating is genuinely uncomfortable — the ache, the hard distended stomach, the inability to get comfortable — and none of it carries moral weight. The discomfort is physical fact. The women are annoyed, not ashamed. They're full and they're still going to eat more. The physical consequence and the desire exist simultaneously without one canceling the other.

**The fabric-as-reveal technique.** "Every time one of Liya's hands pressed the fabric flat against her girlfriend's skin, the outline of her elven body was further revealed to the onlooker." This is a technique for describing a body through another character's interaction with it — the shape appearing through the impression made on fabric or another surface. Use this when you want to describe a body at a remove, through observation rather than direct inventory.
