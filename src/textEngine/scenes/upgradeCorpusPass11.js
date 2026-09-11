// The Squad — Lead: A2 Psych | Support: A1 Mobile, A5 Editor, A6 Slender
// Pass 11 — hunger/feed voice, feed.react, hearings, leftover hunt/stream/AIB.
import { registerModuleVariants } from '../engine.js';

// ── hunger.voice (FULL SENTENCE) ──────────────────────────────
registerModuleVariants('hunger.voice', [
  { when: { studentId: 0, hungerTier: [2, 3, 4] }, weight: 6, text: [
    'Brittany pulls the plate in like a heat she already entered. "Don\'t make me wait."',
    '{word.hungerPhrase|cap}. Captain appetite: she starts before you sit.',
  ] },
  { when: { studentId: 1, hungerTier: [2, 3] }, weight: 6, text: [
    'Madeline glances at the food between clauses, then abandons the clause.',
    '{subject.name} eats like a source she meant to skim. She does not skim.',
  ] },
  { when: { studentId: 2 }, weight: 6, text: [
    'Kylie films one bite, then forgets the camera. Hunger is the only story.',
    '{word.hungerPhrase|cap}. She eats like the audience is you.',
  ] },
  { when: { studentId: 3, hungerTier: [2, 3, 4] }, weight: 6, text: [
    'Serena fuels without apology. "I\'ve been thinking about this since warm-up."',
  ] },
  { when: { studentId: 5 }, weight: 6, text: [
    `Destiny doesn't look up. "Queue's open. Feed the sit-down."`,
    '{word.hungerPhrase|cap}. Hoodie, phone, fork. The fork wins.',
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    'Maya does not narrate the hunger. She just starts.',
    'Maya reaches. Review over.',
  ] },
  { when: { studentId: 9 }, weight: 6, text: [
    'Chloé calls it obscène and then proves she meant it as a compliment.',
  ] },
  { when: { studentId: 10 }, weight: 6, text: [
    'Reneé tastes first, then commits. Hunger is a recipe with no leftover step.',
  ] },
  { when: { studentId: 15 }, weight: 6, text: [
    'Lilith looks at the plate the way she looks at prey. Patient. Sure.',
  ] },
  { when: { studentId: 16, hungerTier: [2, 3, 4] }, weight: 6, text: [
    'Sophia says she shouldn\'t want this much. She wants this much.',
  ] },
  { when: { studentId: 18 }, weight: 6, text: [
    'Talia treats the ache like a reading. Then she solves it with her mouth.',
  ] },
  { when: { gainStance: 'opposed', corruption: [0], hungerTier: [1, 2], stageMax: 3 }, weight: 5, text: [
    '{subject.name} eats like the appetite is a rumor she can still deny. The plate disagrees.',
    'She keeps the fork polite. The second bite is less polite.',
  ] },
  { when: { gainStance: 'secret', corruption: [0], hungerTier: [2, 3] }, weight: 5, text: [
    'She eats like the door might open. Hunger still finishes the plate.',
    '{word.hungerPhrase|cap}. She glances at the hall, then at seconds.',
  ] },
  { when: { gainStance: 'reluctant', corruption: [0] }, weight: 4, text: [
    '{subject.name} starts careful and speeds up when shame loses the argument.',
  ] },
  { when: { mood: ['stressed', 'tired', 'nervous'], hungerTier: [2, 3, 4] }, weight: 4, text: [
    'Stress and appetite share a fork. {subject.name} cleans the plate without looking up.',
    '{word.hungerPhrase|cap}. She eats like comfort arrived late and she is catching up.',
  ] },
  { when: { mood: ['happy', 'excited', 'content', 'cheerful'] }, weight: 3, text: [
    '{subject.name} eats with easy pleasure, {word.hungerPhrase}.',
    'Good mood makes room. She savors, then accelerates.',
  ] },
  { when: { hungerTierMin: 2, stageMin: 5 }, weight: 5, text: [
    '{word.hungerPhrase|cap}. {subject.name} is already eating when you arrive.',
    'Starving and shameless: she pulls the dish in before you sit.',
  ] },
  { when: { inWithdrawal: true, addictionLevelMin: 2 }, weight: 6, text: [
    '{subject.name} does not taste the first three bites. She only knows the ache is quieting.',
    'Withdrawal makes a ceremony of speed. The plate is gone before shame can speak.',
  ] },
]);

// ── hunger.physical (CLAUSE / SHORT SENTENCE) ─────────────────
registerModuleVariants('hunger.physical', [
  { when: { studentId: 0 }, weight: 5, text: [
    'Brittany\'s middle leans toward the plate like a starter pistol already fired.',
  ] },
  { when: { studentId: 5 }, weight: 5, text: [
    'Destiny shifts in the chair; appetite has a weight of its own under the hoodie.',
  ] },
  { when: { studentId: 8 }, weight: 5, text: [
    'Maya\'s hand finds her middle once. The rest is eating.',
  ] },
  { when: { studentId: 10 }, weight: 5, text: [
    'Warmth spreads through Reneé like a sauce she already understands.',
  ] },
  { when: { studentId: 15 }, weight: 5, text: [
    'Lilith\'s hunger sits still and enormous. The body is already sure.',
  ] },
  { when: { fullnessMin: 1.1, stageMin: 6 }, weight: 5, text: [
    '{word.breathQuality|cap}; her middle drum-tight and still accepting.',
    'Belly packed, warm, occupying her lap — she breathes around it and continues.',
  ] },
  { when: { fullnessMin: 0.85, hungerTierMin: 3 }, weight: 4, text: [
    'Hunger and fullness argue in the same belly. Hunger is louder. {word.breathQuality}.',
    'She is full and still eating; {word.breathQuality}.',
  ] },
  { when: { fullnessMin: 0.6, stageMax: 4, corruption: [0] }, weight: 4, text: [
    'Warmth gathers low and new. She notices. {word.breathQuality}.',
    'The middle rounds softly; {word.breathQuality}.',
  ] },
  { when: { hungerTierMin: 3, stageMax: 3 }, weight: 4, text: [
    'Her stomach insists before the first bite lands. She shifts closer to the plate.',
  ] },
  { when: { isImmobile: true }, weight: 5, text: [
    'She cannot come to the food. The food comes to a belly that already fills the chair.',
  ] },
]);

// ── feed.react.beat (FULL SENTENCE) ───────────────────────────
registerModuleVariants('feed.react.beat', [
  { when: { studentId: 0, foodKind: 'sweet' }, weight: 6, text: [
    'Brittany works the sweetness like a score she intends to beat, sugar on her thumb.',
  ] },
  { when: { studentId: 2, foodKind: 'sweet' }, weight: 6, text: [
    'Kylie lets the melt sit on her tongue, then remembers she was supposed to film it.',
  ] },
  { when: { studentId: 5, foodKind: 'drink' }, weight: 6, text: [
    'Destiny tips it back one-handed. Calories slide down while the other thumb scrolls.',
  ] },
  { when: { studentId: 8, foodKind: 'hearty' }, weight: 6, text: [
    'Maya digs in without a speech. Warm, heavy food. She makes it disappear.',
  ] },
  { when: { studentId: 10, foodKind: 'spread' }, weight: 6, text: [
    'Reneé grazes like a tasting flight, then stops pretending it is a tasting.',
  ] },
  { when: { studentId: 14, foodKind: 'hearty' }, weight: 6, text: [
    'Mary Jane leans into the savory like a Sunday that refused to end.',
  ] },
  { when: { studentId: 15, feedRoom: 'past' }, weight: 6, text: [
    'Lilith takes it past comfortable and looks pleased about the taut curve.',
  ] },
  { when: { foodKind: 'sweet', feedRoom: 'eager' }, weight: 4, text: [
    'Sugar first, room second. She eats like dessert invented the meal.',
  ] },
  { when: { foodKind: 'drink', feedRoom: 'filling' }, weight: 4, text: [
    'The cup empties easier than she expected. Warmth sits low and sweet.',
  ] },
  { when: { foodKind: 'hearty', feedRoom: 'tight' }, weight: 4, text: [
    `She slows on the last forkfuls, a hand finding the press. {word.fullness}.`,
  ] },
  { when: { foodKind: 'spread', feedRoom: 'past' }, weight: 4, text: [
    'She keeps reaching across the wreckage of the spread, packed and unwilling to stop.',
  ] },
  { when: { stageMin: 7, feedRoom: 'past' }, weight: 5, text: [
    `By the end she is sunk and spreading, {word.body} rising with each slow breath.`,
  ] },
  { when: { gainStance: 'opposed', corruption: [0], feedRoom: 'eager', stageMax: 3 }, weight: 5, text: [
    'She eats like she can still call it just hungry. The plate empties anyway.',
  ] },
]);

// ── feed.react.line (DIALOGUE / BEHAVIOR) ─────────────────────
registerModuleVariants('feed.react.line', [
  { when: { studentId: 0, feedRoom: 'past' }, weight: 6, text: [
    `Brittany licks her thumb and points it at the empty plate. "I won. Again."`,
  ] },
  { when: { studentId: 1, foodKind: 'sweet' }, weight: 6, text: [
    `Madeline considers the last crumb like a footnote, then eats the footnote.`,
  ] },
  { when: { studentId: 4 }, weight: 6, text: [
    `Fiona finishes dreamy, already composing the textures into a later canvas.`,
  ] },
  { when: { studentId: 6, feedRoom: 'filling' }, weight: 6, text: [
    `Tiffany makes a hostess noise and squeezes your arm. "Okay I'm obsessed."`,
  ] },
  { when: { studentId: 7 }, weight: 6, text: [
    `Priya files it under fuel, then eyes the tray like the file was lying.`,
  ] },
  { when: { studentId: 9 }, weight: 6, text: [
    `Chloé dabs her mouth. "Mm. I will admit — that one earns its place."`,
  ] },
  { when: { studentId: 11 }, weight: 6, text: [
    `Kaylee sighs warm and pats her middle. "That's exactly what I needed."`,
  ] },
  { when: { studentId: 13 }, weight: 6, text: [
    `Daisy beams and goes back without being asked. "It tastes like home."`,
  ] },
  { when: { studentId: 15 }, weight: 6, text: [
    `Lilith finishes without decoration. The plate is empty. She is not.`,
  ] },
  { when: { studentId: 16, corruption: [0] }, weight: 6, text: [
    `Sophia flushes. "I — I shouldn't be this hungry." She looks at the next thing anyway.`,
  ] },
  { when: { studentId: 17 }, weight: 6, text: [
    `Indiana grins around the last bite. "Cache full. Still taking souvenirs."`,
  ] },
  { when: { studentId: 18 }, weight: 6, text: [
    `Talia eats one-handed over a sketch and registers the pleasure late. "Density's excellent."`,
  ] },
  { when: { mood: 'curious', feedRoom: 'filling' }, weight: 3, text: [
    `{subject.name} studies her own slowing like a result, then takes another bite.`,
  ] },
  { when: { relationship: [3], corruption: [2] }, weight: 4, text: [
    `She finishes and looks at you first. Not the plate. You.`,
  ] },
]);

// ── opposition hearings ───────────────────────────────────────
registerModuleVariants('opposition.hearing.removal.phase0', [
  { when: { studentId: 0 }, weight: 6, text: [
    'Vance opens on Brittany. Photos of a captain getting larger fill the screen. Brittany sits like a meet she intends to win.',
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    'Maya beside you, warm and unapologetic, while Vance captions abundance as concern.',
  ] },
  { when: { studentId: 15 }, weight: 6, text: [
    'Lilith watches the slides the way she watches prey. Vance talks wellness. Lilith looks fed.',
  ] },
  { when: { stageMin: 7 }, weight: 4, text: [
    'The projector makes {subject.name} look like a liability. She looks like a curriculum.',
  ] },
]);
registerModuleVariants('opposition.hearing.removal.phase1', [
  { when: { studentId: 7 }, weight: 6, text: [
    'Vance wants restraint. Priya hears a rubric she intends to rewrite.',
  ] },
  { when: { gainStance: 'opposed', corruption: [0] }, weight: 4, text: [
    'Conditional enrollment, spoken like virtue. {subject.name} still tastes lunch.',
  ] },
]);
registerModuleVariants('opposition.hearing.removal.result.testify', [
  { when: { studentId: 6 }, weight: 5, text: [
    'A sister speaks Tiffany into the record — warm, specific, unashamed.',
  ] },
  { when: { relationship: [2, 3] }, weight: 4, text: [
    'Someone loves {subject.name} out loud. Vance\'s pen stops.',
  ] },
]);
registerModuleVariants('opposition.hearing.removal.result.advocate', [
  { when: { studentId: 12 }, weight: 5, text: [
    'The advocate cites autonomy. Nadia watches the room flinch like a study.',
  ] },
]);
registerModuleVariants('opposition.hearing.removal.result.discredit', [
  { when: { studentId: 10 }, weight: 5, text: [
    'Banquet photos vs wellness language. Reneé would call it a bad pairing.',
  ] },
]);
registerModuleVariants('opposition.hearing.removal.result.feast', [
  { when: { studentId: 14 }, weight: 5, text: [
    'Trays arrive. Mary Jane looks like the hearing just became supper.',
  ] },
  { when: { stageMin: 6 }, weight: 3, text: [
    'Procedure dissolves into seconds. {subject.name} is already at home in the steam.',
  ] },
]);
registerModuleVariants('opposition.hearing.removal.result.hold_firm', [
  { when: { studentId: 0 }, weight: 5, text: [
    'You do not apologize. Brittany sits like the gavel is a scoreboard.',
  ] },
]);
registerModuleVariants('opposition.hearing.removal.result.negotiate', [
  { when: { studentId: 9 }, weight: 5, text: [
    'Discretion promised, indulgence implied. Chloé hears both languages.',
  ] },
]);
registerModuleVariants('opposition.hearing.removal.result.spirit', [
  { when: { studentId: 15 }, weight: 5, text: [
    'Plates appear. Lilith watches resolve soften bite by bite.',
  ] },
]);
registerModuleVariants('opposition.hearing.removal.ending.advocate_voice', [
  { when: { studentId: 8 }, weight: 5, text: [
    'Student voice carries. Maya stays enrolled, appetite unmoved.',
  ] },
]);
registerModuleVariants('opposition.hearing.removal.ending.discredit_feast', [
  { when: { studentId: 10 }, weight: 5, text: [
    'Hypocrisy and hospitality. Reneé would plate that ending herself.',
  ] },
]);
registerModuleVariants('opposition.hearing.removal.ending.testify_firm', [
  { when: { studentId: 3 }, weight: 5, text: [
    'Testimony lands. Serena stays. The gavel never finds suspend.',
  ] },
]);
registerModuleVariants('opposition.hearing.removal.ending.messy_victory', [
  { when: { studentId: 16 }, weight: 5, text: [
    'Sophia stays — watched, enrolled, still hungry. The Board calls it care.',
  ] },
]);
registerModuleVariants('opposition.hearing.removal.ending.suspended', [
  { when: { studentId: 2 }, weight: 5, text: [
    'Kylie hidden from the quad, not expelled. The Board wants the camera off.',
  ] },
]);
registerModuleVariants('opposition.hearing.emergency.phase0', [
  { when: { studentId: 18 }, weight: 5, text: [
    'Emergency session. Talia looks at Vance like a failed spec.',
  ] },
  { when: { scandal: 'critical' }, weight: 3, text: [
    'Scandal meter critical. Every member arrived angry and underfed.',
  ] },
]);
registerModuleVariants('opposition.hearing.emergency.phase1', [
  { when: { studentId: 7 }, weight: 5, text: [
    'Priya listens to costs like a budget she intends to beat.',
  ] },
]);
registerModuleVariants('opposition.hearing.emergency.result.deflect', [
  { when: { studentId: 12 }, weight: 5, text: [
    'You redirect to metrics. Nadia almost smiles at the saturation curves.',
  ] },
]);
registerModuleVariants('opposition.hearing.emergency.result.feast_bribe', [
  { when: { studentId: 6 }, weight: 5, text: [
    'Catering lands mid-motion. Tiffany treats it like a mixer with gavels.',
  ] },
]);
registerModuleVariants('opposition.hearing.emergency.result.sacrifice', [
  { when: { studentId: 0 }, weight: 5, text: [
    'A scapegoat named. Brittany watches the trade without flinching.',
  ] },
]);
registerModuleVariants('opposition.hearing.emergency.result.double_down', [
  { when: { studentId: 15 }, weight: 5, text: [
    'You speak hunger like gospel. Lilith looks at Vance as if she is already dessert.',
  ] },
]);
registerModuleVariants('opposition.hearing.emergency.result.absorb', [
  { when: { studentId: 11 }, weight: 5, text: [
    'You take the hit. Kaylee stays fed. The room feels the trade.',
  ] },
]);
registerModuleVariants('opposition.hearing.emergency.result.hive', [
  { when: { studentId: 8 }, weight: 6, text: [
    'Maya\'s hive misdirects the paperwork. Wrong building. Beautiful chaos.',
  ] },
]);
registerModuleVariants('opposition.hearing.emergency.ending.catered_future', [
  { when: { studentId: 14 }, weight: 5, text: [
    'They ate through the emergency. Mary Jane looks like the meter cooled on pie.',
  ] },
]);
registerModuleVariants('opposition.hearing.emergency.ending.scapegoat_survive', [
  { when: { studentId: 17 }, weight: 5, text: [
    'Someone else pays. Indiana walks out like a relic that stayed unconfiscated.',
  ] },
]);
registerModuleVariants('opposition.hearing.emergency.ending.absorb_cost', [
  { when: { studentId: 1 }, weight: 5, text: [
    'Your name on the report. Madeline\'s plates stay full anyway.',
  ] },
]);
registerModuleVariants('opposition.hearing.emergency.ending.unresolved', [
  { when: { studentId: 16 }, weight: 5, text: [
    'No clean verdict. Sophia leaves hungrier and more watched.',
  ] },
]);
registerModuleVariants('opposition.hearing.open', [
  { when: { studentId: 0, hearing: 'emergency' }, weight: 5, text: [
    'Emergency air. Brittany sits like the folder is a rival captain.',
  ] },
  { when: { studentId: 8 }, weight: 5, text: [
    'Toner and denial. Maya stays quiet and enormous beside the agenda.',
  ] },
]);
registerModuleVariants('opposition.hearing.verdict', [
  { when: { outcome: 'win', studentId: 0 }, weight: 5, text: [
    'Vance closes without a signature. Brittany looks like she posted a W.',
  ] },
  { when: { outcome: 'loss', studentId: 2 }, weight: 5, text: [
    'The order prints. Kylie pays in visibility. The camera stays home.',
  ] },
  { when: { outcome: 'win', stageMin: 6 }, weight: 3, text: [
    'Removal denied. {subject.name} remains yours, warm and enrolled.',
  ] },
]);

// ── leftover agenda / counter ─────────────────────────────────
registerModuleVariants('opposition.agenda.device_confiscation', [
  { when: { studentId: 18 }, weight: 6, text: [
    'Orr seals a rig Talia built. She watches the case close like a bad schematic.',
  ] },
]);
registerModuleVariants('opposition.agenda.wellness_seminar', [
  { when: { studentId: 16 }, weight: 6, text: [
    'Sophia sits through portion charts and looks like she is failing a faith.',
  ] },
]);
registerModuleVariants('opposition.agenda.budget_freeze', [
  { when: { studentId: 10 }, weight: 6, text: [
    'Finance holds the line item. Reneé hears a kitchen going quiet.',
  ] },
]);
registerModuleVariants('opposition.agenda.mandatory_fitness', [
  { when: { studentId: 3 }, weight: 6, text: [
    'Clipboards want exertion. Serena looks at them like a heat she already outgrew.',
  ] },
]);
registerModuleVariants('opposition.agenda.faculty_informant', [
  { when: { studentId: 1 }, weight: 6, text: [
    'Lounge talk reaches Vance. Madeline would footnote the betrayal if it helped.',
  ] },
]);
registerModuleVariants('opposition.agenda.student_advocacy', [
  { when: { studentId: 12 }, weight: 6, text: [
    'Jordan books floor time. Nadia watches sympathy get used like a tool.',
  ] },
]);
registerModuleVariants('opposition.agenda.size_review', [
  { when: { studentId: 0 }, weight: 6, text: [
    'Mandatory readings. Brittany treats the scale like an away meet.',
  ] },
]);
registerModuleVariants('opposition.counter.success', [
  { when: { studentId: 7 }, weight: 5, text: [
    'Your counter lands. Priya files the week under recovered advantage.',
  ] },
  { when: { studentId: 15 }, weight: 5, text: [
    'The Board stumbles. Lilith looks fed by the stumble.',
  ] },
]);
registerModuleVariants('opposition.agenda.fire', [
  { when: { studentId: 8 }, weight: 5, text: [
    'An agenda card finds Maya. She stays quiet. The room gets colder anyway.',
  ] },
  { when: { studentId: 2 }, weight: 5, text: [
    'Policy made personal. Kylie already knows which angle they will hate.',
  ] },
]);

// ── AIB mandatory weigh-in ────────────────────────────────────
registerModuleVariants('wi.aibMandatory', [
  { when: { studentId: 0 }, weight: 6, text: [
    'A stamped notice: Brittany, documented weigh-in. She treats the clerk like an opposing coach.',
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    'Maya\'s name on the Board slip. She reads it once and looks at you.',
  ] },
  { when: { studentId: 16 }, weight: 6, text: [
    'Sophia summoned for compliance. Every pound becomes testimony she already fears.',
  ] },
  { when: { studentId: 18 }, weight: 6, text: [
    'Talia eyes the observer\'s clipboard like a rival instrument.',
  ] },
  { when: { stageMin: 7 }, weight: 4, text: [
    'The Board wants {subject.name}\'s number on record. The number has been making its own record.',
  ] },
]);

// ── hunt feast leftover ───────────────────────────────────────
registerModuleVariants('hunt.feast.deliveryIntro', [
  { when: { studentId: 15, relationship: [2, 3] }, weight: 6, text: [
    'Too large for the hallway. The knock is a courtesy. Lilith already named the bag.',
  ] },
  { when: { studentId: 15, corruption: [2] }, weight: 5, text: [
    'Campus is a rumor. Appetite is the address. She smiles in the warm dark.',
  ] },
  { when: { studentId: 15, stageMin: 8 }, weight: 6, text: [
    'Furniture remembers her. The delivery remembers the order. You remember to stay.',
  ] },
  { when: { mood: 'content' }, weight: 3, text: [
    'The bag rustles. She does not get up. Getting up is a previous life.',
  ] },
]);

// ── leftover stream ───────────────────────────────────────────
registerModuleVariants('stream.endStream.verypoor', [
  { when: {}, weight: 4, text: [
    'I\'m deleting the VOD and then I\'m eating about it. Offstream.',
    'Chat, that was a wipe. I\'m going to sit very still and not clip myself.',
    'Worst sit in a while. Hoodie up. Tray stays. Camera dies.',
  ] },
]);
registerModuleVariants('stream.chat.scenario.teased', [
  { when: {}, weight: 3, text: [
    'she\'s getting roasted and still chewing lmao',
    'chat being mean and she\'s using it as seasoning',
  ] },
]);
registerModuleVariants('stream.chat.parasocial.mid', [
  { when: {}, weight: 3, text: [
    'we\'ve been in this chair since the overlay was a joke',
    'mid-era Destiny still pretending the hoodie hides the sit',
  ] },
]);
registerModuleVariants('stream.chat.parasocial.late', [
  { when: {}, weight: 3, text: [
    'late-game sit. we live here now',
    'the chair is a character and she is the expansion pack',
  ] },
]);
registerModuleVariants('stream.chat.trend.improving', [
  { when: {}, weight: 3, text: [
    'numbers up, belly up, chat unwell',
  ] },
]);
registerModuleVariants('stream.chat.trend.declining', [
  { when: {}, weight: 3, text: [
    'view dip but the tray is still winning',
  ] },
]);
registerModuleVariants('stream.chat.tapOut.stamina', [
  { when: {}, weight: 3, text: [
    'stamina said no and she still looks proud',
  ] },
]);
registerModuleVariants('stream.chat.tapOut.performance', [
  { when: {}, weight: 3, text: [
    'she whiffed the last bit and chat loved the honesty',
  ] },
]);
registerModuleVariants('stream.chat.rare', [
  { when: {}, weight: 3, text: [
    'rare drop: she laughed with her mouth full',
  ] },
]);
// Leftover archetypes (culinary, nursing, psych, …) never hit default.fN.
// Route them onto those bands so per-girl fullness extras can surface.
for (const arch of ['culinary', 'nursing', 'psych', 'eced', 'farm_girl', 'predator', 'pharmacy_grad', 'explorer', 'inventor']) {
  for (const band of [0, 1, 2, 3, 4, 5]) {
    registerModuleVariants('session.fullness', [
      { when: { archetype: arch, fullnessStage: [band] }, weight: 4, text: [`{session.fullness.default.f${band}}`] },
    ]);
  }
}

// ── session aftermath leftovers ───────────────────────────────
registerModuleVariants('session.aftermath.light._f1', [
  { when: { studentId: 0 }, weight: 7, text: [
    'Brittany is loose and fed, still sitting like the session was a heat she won.',
  ] },
  { when: { studentId: 8 }, weight: 7, text: [
    'Maya is full and quiet. She stays. The last bites take their time.',
  ] },
  { when: { studentId: 5 }, weight: 7, text: [
    'Destiny slumps, comfortable, one hand on the warm middle. "Good sit."',
  ] },
  { when: { studentId: 10 }, weight: 7, text: [
    'Reneé is full and still tasting the air. She calls the session a successful service.',
  ] },
]);
registerModuleVariants('session.aftermath.full._f1', [
  { when: { studentId: 2 }, weight: 7, text: [
    'Kylie leans back, camera down, both hands on the round middle. She does not get up.',
  ] },
  { when: { studentId: 9 }, weight: 7, text: [
    'Chloé stays seated, packed, pleased. "I cannot move," she says, and does not try.',
  ] },
  { when: { studentId: 14 }, weight: 7, text: [
    'Mary Jane leans back with both hands on the swell. "I\'m planted. Leave me."',
  ] },
]);
registerModuleVariants('session.aftermath.full._f2', [
  { when: { studentId: 8 }, weight: 7, text: [
    '. You drape a blanket. Maya\'s eyes are already half-closed.',
  ] },
  { when: { studentId: 6 }, weight: 7, text: [
    '. Tiffany accepts the blanket like hospitality she earned.',
  ] },
]);
registerModuleVariants('session.aftermath.stuffed._f1', [
  { when: { studentId: 7 }, weight: 7, text: [
    'Priya has gone still, spectacularly full. She presses the taut curve like a finished exam.',
  ] },
  { when: { studentId: 1 }, weight: 7, text: [
    'Madeline is packed and scholarly about it. Hands flat on the warm mass. Notes later.',
  ] },
  { when: { studentId: 18 }, weight: 7, text: [
    'Talia is still, the prototype successful. She keeps both hands on the result.',
  ] },
]);
registerModuleVariants('session.aftermath.stuffed._f2', [
  { when: { studentId: 0 }, weight: 7, text: [
    '. "I finished," Brittany says. She sounds like she posted a W.',
  ] },
  { when: { studentId: 15 }, weight: 7, text: [
    '. Lilith: "Everything." She sounds glad. She sounds ready again.',
  ] },
]);
registerModuleVariants('session.aftermath.packed._f1', [
  { when: { studentId: 15 }, weight: 7, text: [
    'Lilith is enormous with the meal, hands on the firm swell, unhurried as a larder.',
  ] },
  { when: { studentId: 8 }, weight: 7, text: [
    'Maya is huge with food and silent about it. Her hands stay on the warmth.',
  ] },
  { when: { studentId: 5 }, weight: 7, text: [
    'Destiny is a successful overload. Controller parked on the taut middle.',
  ] },
]);
registerModuleVariants('session.aftermath.packed._f2', [
  { when: { studentId: 10 }, weight: 7, text: [
    '. "This is the dish," Reneé says eventually. She means the sitting.',
  ] },
  { when: { studentId: 11 }, weight: 7, text: [
    '. Kaylee keeps her hands on the swell. "This is what I wanted."',
  ] },
]);

registerModuleVariants('weekly.chairBreaks.playerAid', [
  { when: { studentId: 0 }, weight: 5, text: [
    'You catch Brittany before the wreck finishes. She still looks like she scored.',
  ] },
  { when: { studentId: 8 }, weight: 5, text: [
    'You get Maya standing. She does not comment on the chair. The chair comments.',
  ] },
]);
