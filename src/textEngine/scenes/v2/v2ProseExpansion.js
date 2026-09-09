// The Squad — Lead: A5 Editor | Support: A1 Mobile, A2 Psych
// V2.0 global prose depth pass — additional variants for high-traffic scenes
import { registerPool } from '../../engine.js';

// ── Dinner depth additions ────────────────────────────────────
registerPool('dinner.v2.depth', [
  { when: { stageMin: 6 }, text: [
    'The meal arrives like weather — course after course, heat rising, her belly swelling warm and forward beneath the tablecloth.',
    'She works through the menu with devotional patience. Each plate leaves her softer in the chair.',
    'Dessert is not a question. It is a continuation of something already underway.',
  ]},
  { when: { stageMin: 3 }, text: [
    'She eats with the focus of someone who has stopped pretending this is casual. Every bite lands.',
    'Portions keep arriving and she keeps accepting them — pleased, unhurried, quietly proud.',
    'The table becomes a stage. Her appetite is the performance.',
  ]},
  { when: {}, text: [
    'The restaurant hums around her appetite. She takes her time. She takes seconds.',
    'Warm light, warm food, the slow pleasure of being fed in public.',
    'She savors without apology. The evening belongs to her hunger.',
  ]},
]);

// ── Feed reaction depth ───────────────────────────────────────
registerPool('feed.v2.depth', [
  { when: { stageMin: 9 }, text: [
    'She eats like weather — inevitable, warm, reshaping the room around her fullness.',
    'Portions vanish into mass that does not apologize. The feed feels ceremonial.',
  ]},
  { when: { stageMin: 7 }, text: [
    'Fullness spreads through her like a tide — slow, heavy, undeniable. She breathes around it and reaches for more anyway.',
    'Her belly rises with each portion. She does not flinch from the weight of it.',
    'The feed ends and she is still hungry — not for food alone, but for the feeling of being filled.',
  ]},
  { when: { corruptionMin: 50 }, text: [
    'She eats without the old hesitation. Want has become habit. Habit has become identity.',
    'Corruption sits in her posture now — eager, open, grateful for every calorie.',
    'There is no performance left. Only appetite, honest and warm.',
  ]},
  { when: {}, text: [
    'Warmth gathers in her belly. She leans into it.',
    'Each bite lands soft and certain. She exhales satisfaction.',
    'Food does what food does best — she lets it.',
  ]},
]);

// ── Talk depth additions ──────────────────────────────────────
registerPool('talk.v2.depth', [
  { when: { stageMin: 10 }, text: [
    'She speaks from immobile abundance — voice slow, warm, belly audible between sentences like weather.',
    'Conversation bends around her mass. The office arranges itself to her scale.',
    'Words arrive unhurried. Fullness has become the room she inhabits.',
  ]},
  { when: { stageMin: 7 }, text: [
    'She speaks from inside her fullness — voice slower, warmer, belly audible between sentences.',
    'Conversation bends around her mass. She does not hurry. Neither do you.',
    'Every sentence carries the weight of how much body she brings to it.',
  ]},
  { when: { stageMin: 5, corruptionMin: 40 }, text: [
    'She talks about food the way other people talk about plans — eagerly, specifically, already leaning toward yes.',
    'Conversation drifts to cravings and stays there. She does not redirect it.',
    'Her voice warms whenever portions come up. You notice. She pretends not to.',
    'Appetite sits in her syntax now — direct, unashamed, pleased to be named.',
  ]},
  { when: { stageMin: 5 }, text: [
    'She talks about food the way other people talk about plans — eagerly, specifically, already leaning toward yes.',
    'Conversation drifts to cravings and stays there. She does not redirect it.',
    'Her voice warms whenever portions come up. You notice. She pretends not to.',
  ]},
  { when: { stageMin: 2, stageMax: 4, corruption: [0] }, text: [
    'She chooses words carefully around appetite — hunger noticed, not yet owned.',
    'Conversation skims food and returns to it anyway, like a tongue finding a loose tooth.',
    'Something softens in her voice when snacks come up. She changes the subject slower each time.',
  ]},
  { when: {}, text: [
    'Something in her voice has softened toward appetite. She does not name it. You hear it anyway.',
    'Office hours stretch longer when food is on the table — literally or otherwise.',
    'She laughs easily. Hunger makes her generous.',
    'The talk leaves warmth behind — appetite acknowledged without ceremony.',
  ]},
]);

// ── Weigh-in depth additions ──────────────────────────────────
registerPool('wi.v2.depth', [
  { when: { stageMin: 8 }, text: [
    'The number lands like a bell. Her body does not argue. It has been waiting to be counted.',
    'She reads the scale and smiles — not surprised, not ashamed, simply pleased.',
    'Weight has become vocabulary. She is fluent now.',
  ]},
  { when: { stageMin: 4 }, text: [
    'She watches the scale with the calm of someone who already knows the answer and likes it.',
    'The digits climb. She tracks them with quiet satisfaction.',
    'A new number, a new fact about her body. She accepts it warmly.',
  ]},
  { when: {}, text: [
    'The weigh-in completes. Fullness of data. Warmth of fact.',
    'She steps off the scale unhurried. Growth acknowledged.',
    'Numbers settle into place. So does she.',
  ]},
]);

// ── Session depth additions ───────────────────────────────────
registerPool('session.v2.depth', [
  { when: { stageMin: 9 }, text: [
    'The session becomes architecture — her body reshaping the room, breath the only clock.',
    'Portions blur into mass. She eats until the chair is memory and fullness is furniture.',
    'Private appetite at immobile scale — vast, warm, unhurried surrender.',
  ]},
  { when: { stageMin: 6 }, text: [
    'The session stretches. Her belly rises. Time becomes food becomes flesh.',
    'Portions blur together. Fullness becomes the only clock she obeys.',
    'She eats until the room feels smaller around her softness.',
    'Each refill finds her ready — capacity treated as virtue, not accident.',
  ]},
  { when: { stageMin: 3, stageMax: 5 }, text: [
    'The session starts disciplined and ends honest — appetite winning by inches, then miles.',
    `She keeps pace until she doesn't — then keeps eating anyway, pleased by the slip.`,
    'Private room, public appetite still learning its volume.',
  ]},
  { when: {}, text: [
    'She keeps eating. You keep watching. The room gets warmer.',
    'Private session, public appetite — she surrenders to both.',
    'Every refill finds her ready. Hunger has become hospitality.',
    'The door closed. Her restraint opened. Food does the rest.',
  ]},
]);

// ── Week recap depth ──────────────────────────────────────────
registerPool('weekRecap.v2.depth', [
  { when: { stageMin: 5 }, text: [
    'Another week of settling into abundance. Her body remembers every bite.',
    'Seven days of feeding leave their mark — softer, warmer, more present.',
    'The week closes on a body that has grown into its new habits.',
  ]},
  { when: {}, text: [
    'Growth continues — quiet, warm, certain.',
    'The week ends heavier than it began. She carries the difference easily.',
    'Appetite outlasted intention again. She does not seem to mind.',
  ]},
]);

// ── Milestone depth ───────────────────────────────────────────
registerPool('milestone.v2.depth', [
  { when: { stageMin: 7 }, text: [
    'The threshold crossed is not abstract. You feel it in how the room receives her.',
    'A new size lands like weather — inevitable, warm, reshaping everything around it.',
  ]},
  { when: {}, text: [
    'The ceremony lingers. Growth made visible, made sacred.',
    'She inhabits the new weight before the scale confirms it.',
  ]},
]);

// ── Campus event depth ─────────────────────────────────────────
registerPool('campus.v2.depth', [
  { when: { campusFattening: true }, text: [
    'Campus air tastes of butter and permission. She breathes it in.',
    'Every vending machine looks like an invitation. She accepts.',
    'The quad smells like fried dough and nobody is pretending otherwise.',
  ]},
  { when: {}, text: [
    'Class ends but appetite does not. The hallway smells like lunch.',
    'Ordinary campus hour — except her hunger is louder than the floor meeting.',
    'Lockers slam. Vending machines hum. Somewhere a girl is already eating.',
    'Campus routine — except her body remembers every meal between classes.',
  ]},
]);

// ── Device use depth ───────────────────────────────────────────
registerPool('device.v2.depth', [
  { when: { stageMin: 5 }, text: [
    'The device hums. Her body answers before her mind catches up.',
  ]},
  { when: {}, text: [
    'Mechanical precision meets organic want. She softens on cue.',
    'Technology and appetite braid together — warm, obedient, hungry.',
  ]},
]);

// ── Intimacy depth ────────────────────────────────────────────
registerPool('intimacy.v2.depth', [
  { when: { stageMin: 6 }, text: [
    'Closeness and appetite braid together — touch, warmth, the particular hunger of being wanted.',
    'She leans into you with the weight of someone who has stopped pretending she does not want this.',
  ]},
  { when: {}, text: [
    'The room narrows to heat and proximity. Food is never far from desire.',
    'Intimacy arrives soft and certain — like fullness, like trust.',
  ]},
]);

// ── Hunger interrupt depth ──────────────────────────────────────
registerPool('hunger.v2.depth', [
  { when: { stageMin: 5 }, text: [
    'Hunger has become a language she speaks without translation.',
    'She arrives already half-fed by want — the rest is yours to provide.',
  ]},
  { when: {}, text: [
    'Appetite knocks at an inconvenient hour. She does not apologize for it.',
    'The interrupt is honest. She needs food. You have food.',
  ]},
]);

// ── Growth event depth ──────────────────────────────────────────
registerPool('growth.v2.depth', [
  { when: { stageMin: 7 }, text: [
    'Growth lands all at once — flesh rearranging, warmth spreading, the body catching up to appetite.',
    'She swells into the moment. Time and calories compress into visible change.',
  ]},
  { when: {}, text: [
    'Something shifts in her measurements. She feels it before the mirror confirms.',
    'Growth continues its quiet work — warm, inevitable, welcome.',
  ]},
]);

// ── Immobility depth ────────────────────────────────────────────
registerPool('immobility.v2.depth', [
  { when: { stageMin: 10 }, text: [
    'She has become geography — vast, warm, settled. Movement is optional. Being fed is not.',
    'The room arranges itself around her stillness. She is the center gravity chose.',
  ]},
  { when: {}, text: [
    'Weight has become a kind of throne. She rests in it easily.',
    'Immobile does not mean unhappy. She glows with being kept.',
  ]},
]);

// ── Weekly event depth ──────────────────────────────────────────
registerPool('weekly.v2.depth', [
  { when: { stagedUp: true }, text: [
    'The week leaves a mark she will not unmake — softer, fuller, more herself.',
  ]},
  { when: {}, text: [
    'Campus life bends around her appetite. She bends with it, gladly.',
    'Another week of becoming. The narrative keeps gaining weight.',
  ]},
]);

// ── Confrontation depth ─────────────────────────────────────────
registerPool('confront.v2.depth', [
  { when: { relationship: [1, 2] }, text: [
    'Tension crackles — but underneath, hunger waits to be negotiated.',
  ]},
  { when: {}, text: [
    'She confronts you with the honesty of someone who knows what she wants.',
    'Conflict and appetite share a room. Neither leaves hungry.',
  ]},
]);

// ── Psych shift depth ───────────────────────────────────────────
registerPool('psych.v2.depth', [
  { when: { corruptionMin: 60 }, text: [
    'The shift is internal first — want reorganizing itself around yes.',
    'She does not fight the new hunger. She feeds it.',
  ]},
  { when: {}, text: [
    'Something loosens in her psychology. Appetite finds more room.',
    'Corruption reads as permission. She accepts the terms.',
  ]},
]);

// ── Eating depth ────────────────────────────────────────────────
registerPool('eating.v2.depth', [
  { when: { stageMin: 5 }, text: ['Each bite lands with the weight of habit — hunger answered, want deepened.'] },
  { when: {}, text: ['The meal unfolds warm and unhurried.', 'Food does what food does best — she lets it.'] },
]);
registerPool('clothing.v2.depth', [
  { when: { stageMin: 4 }, text: ['Fabric surrenders before appetite does — a familiar ceremony.'] },
  { when: {}, text: ['Clothing strains. Growth wins the argument again.'] },
]);
registerPool('memory.v2.depth', [
  { when: {}, text: ['History sits in her posture — meals remembered, thresholds crossed.'] },
]);
registerPool('settling.v2.depth', [
  { when: { stageMin: 10 }, text: [
    'The settling is not an ending. It is a deeper kind of arrival.',
    'Mass finds its final geography — warm, vast, unhurried.',
    'She rests into immobility like weather settling over a valley.',
  ]},
  { when: { stageMin: 7 }, text: [
    'The settling reads as ceremony — each pound a bell, each breath a benediction.',
    'Abundance stops being event and becomes climate.',
    'She exhales and the room learns her shape again.',
  ]},
  { when: { stageMin: 4 }, text: [
    'Softness accumulates like snowfall — quiet, certain, reshaping everything it touches.',
    'The settling is honest now. She does not rush it.',
    'Warmth pools where appetite has been answered generously.',
  ]},
  { when: {}, text: [
    'She rests into abundance. The room learns her shape.',
    'Growth slows to breathing — still happening, still welcome.',
    'Fullness settles like a blanket she chose on purpose.',
  ]},
]);
registerPool('origin.v2.depth', [
  { when: { stageMax: 3 }, text: ['Old stories flavor the appetite — backstory bleeding into the plate.'] },
  { when: {}, text: ['Where she came from still speaks in how she eats.'] },
]);
registerPool('ascension.v2.depth', [
  { when: { stageMin: 8 }, text: ['Ascension reads as myth made flesh — vast, warm, chosen.'] },
  { when: {}, text: ['Something sacred settles over the moment. Growth as ceremony.'] },
]);
registerPool('lab.v2.depth', [
  { when: { stageMin: 7 }, text: [
    'The lab hums with engineered appetite — compounds calibrated, mass anticipated, precision as seduction.',
    "Talia's bench holds more than chemistry. It holds the future shape of every girl on your roster.",
  ]},
  { when: {}, text: [
    'Precision and appetite share the bench — engineering as foreplay to mass.',
    'Glassware, measurements, the quiet thrill of making growth inevitable.',
    'Science and hunger shake hands over the same formula.',
  ]},
]);
registerPool('forceFeed.v2.depth', [
  { when: {}, text: ['The mask hums. Fullness arrives on schedule — mechanical, relentless, warm.'] },
]);
registerPool('feedVoice.v2.depth', [
  { when: { corruptionMin: 40 }, text: ['Want speaks from inside her — no longer ashamed to be heard.'] },
  { when: {}, text: ['Hunger has a voice now. It sounds like her.'] },
]);
registerPool('cultivator.v2.depth', [
  { when: {}, text: ['The cultivator cycle turns — suspicion, appetite, harvest, again.'] },
]);
registerPool('hunt.v2.depth', [
  { when: { stageMin: 7 }, text: [
    'Lilith hunts where appetite is thinnest — campus corners, guilty hunger, flesh waiting to be claimed.',
    'Predator and prey blur at this scale. The night belongs to whoever eats first.',
  ]},
  { when: {}, text: [
    'Predator and prey blur. Appetite hunts in both directions.',
    "The campus after dark — hunger stalking hunger, Lilith's shadow long and warm.",
    'Every target carries potential mass. Lilith reads it like a menu.',
  ]},
]);
registerPool('roster.v2.depth', [
  { when: {}, text: ['She reads differently at a glance now — softer, fuller, unmistakable.'] },
]);
registerPool('scrutiny.v2.depth', [
  { when: {}, text: ['Institutional eyes narrow. Growth has consequences beyond the scale.'] },
]);
registerPool('discontent.v2.depth', [
  { when: {}, text: ['Anger and appetite wrestle. Neither has left the room.'] },
]);
registerPool('campusNav.v2.depth', [
  { when: {}, text: ['Campus air tastes of butter and permission.'] },
]);
registerPool('earlyGain.v2.depth', [
  { when: { stageMax: 3 }, text: ['Early softness arrives like a secret she has not named yet.'] },
  { when: {}, text: ['The first pounds feel theoretical until they do not.'] },
]);
registerPool('evolved.v2.depth', [
  { when: { stageMin: 8 }, text: [
    'Her evolved path has become architecture — appetite as identity, identity as spectacle, mass as destiny.',
    'At this scale the form is not a costume. It is the only honest way to be hungry in public.',
  ]},
  { when: { stageMin: 5 }, text: [
    'The evolved arc turns appetite into vocation — every bite proof of the path she chose.',
    'She does not perform hunger anymore. Hunger performs through her.',
  ]},
  { when: {}, text: [
    'Her evolved path amplifies everything — appetite as identity, identity as spectacle.',
    'The form she chose reshapes every room she enters. Food follows like applause.',
    'Evolution here means appetite with a spotlight — louder, warmer, impossible to ignore.',
    'What began as a choice has become a signature. She eats like someone who knows who she is.',
  ]},
]);
registerPool('spirit.v2.depth', [
  { when: { stageMin: 9 }, text: [
    'Resident ride at immobile scale — you inhabit architecture, hunger measured in geography not bites.',
    'You ride inside a body that has become environment. Every breath moves mass.',
  ]},
  { when: { stageMin: 7 }, text: ['At this scale the ride is geography — you feel her mass from the inside, vast and settled.'] },
  { when: { stageMin: 5 }, text: ['Influence moves through her like warmth finding a home she has been building all semester.'] },
  { when: {}, text: [
    'The ride feels less like theft and more like collaboration.',
    'Her hands move toward food before her mind names want. You are both already eating.',
    'Inside her skin, appetite speaks without filter — honest, warm, immediate.',
  ]},
]);
registerPool('ritual.v2.depth', [
  { when: { stageMin: 10 }, text: [
    'Ritual at immobile scale — bedside altars, food carried like tribute, ceremony for bodies that have become geography.',
  ]},
  { when: { stageMin: 8 }, text: [
    'Floor feast — multiple bellies, one ceremony, appetite elevated to liturgy.',
    'The ritual consecrates mass. Every participant leaves heavier in body and appetite.',
  ]},
  { when: { stageMin: 4 }, text: [
    'Ceremony turns dinner into doctrine — courses, heat, chewing in unison.',
    'Plates circulate like communion. Fullness becomes collective worship.',
  ]},
  { when: { stageMin: 0, stageMax: 3 }, text: [
    'A modest ritual still — intimacy formalized, appetite named aloud among friends.',
  ]},
  { when: {}, text: [
    'Ceremony amplifies appetite — every bite consecrated, every belly an altar.',
    'The kitchen transforms into temple. Hunger the only prayer.',
    'Ritual completes. Bellies remember. The floor is pleased.',
  ]},
]);
registerPool('dream.v2.depth', [
  { when: { stageMin: 9 }, text: [
    'Dream at impossible scale — portions without ceiling, symbolic foodscapes, her body vast even in sleep.',
    'The subconscious serves what waking politeness refuses. She eats without ceiling.',
  ]},
  { when: { stageMin: 6 }, text: [
    'The dream serves impossible portions — symbolic foodscapes where appetite has no ceiling.',
    'She eats in sleep what she craves awake. Hunger walks the subconscious buffet.',
  ]},
  { when: { stageMin: 2 }, text: [
    'Surreal abundance still gentle — want learning its vocabulary in symbolic food.',
  ]},
  { when: {}, text: [
    'The dream lingers at the edges of waking — hunger translated into symbol.',
    'Surreal abundance — portions that could not exist, tasted anyway.',
    'Sleep opens a door appetite walks through uninvited and unashamed.',
  ]},
]);
registerPool('echo.v2.depth', [
  { when: { stageMin: 10 }, text: [
    'Archive at immobile depth — memory layered until past appetite and present mass merge without seam.',
  ]},
  { when: { stageMin: 9 }, text: [
    'The echo deepens — memory layered with sensation until past and present appetite merge.',
    'Replay becomes reliving. Her body in the archive still grows warmer with each visit.',
  ]},
  { when: { stageMin: 5 }, text: [
    'The moment returns fuller than before — more detail, more heat, more proof she crossed a line.',
    'Echo depth means the memory refuses to stay small.',
  ]},
  { when: { stageMax: 4 }, text: [
    'Early echo — softness preserved before appetite learned to speak without blush.',
  ]},
  { when: {}, text: [
    'A preserved instant — hunger crystallized, available to revisit and amplify.',
    'The archive holds what the week tried to blur. Appetite remembers exactly.',
  ]},
]);
registerPool('gossip.v2.depth', [
  { when: {}, text: ['The hall keeps its own accounting — glances, whispers, appetite noticed before it is named.'] },
]);
registerPool('resonance.v2.depth', [
  { when: { stageMin: 9 }, text: [
    'Hive resonance at monumental scale — linked appetites swell together like weather systems, campus-wide hunger no single girl owns.',
    'The wire between them carries mass now, not just craving — fullness echoing fullness across the roster.',
  ]},
  { when: { stageMin: 6 }, text: [
    'Appetite travels the network in pulses you can almost hear — warm, immediate, impossible to unfeel.',
    'Linked girls eat in stereo. Resonance turns private hunger into shared architecture.',
  ]},
  { when: { stageMin: 3 }, text: [
    'Something invisible stitches their want together. When one softens, the other feels it before the week names why.',
    'Craving contagious as laughter — appetite learning to echo between bodies.',
  ]},
  { when: {}, text: [
    'Appetite travels the wire between them — invisible, hungry, impossible to unfeel.',
    'The resonance hums. Hunger shared before it is confessed.',
    'Linked at the level of want — soft, certain, quietly inevitable.',
  ]},
]);
registerPool('campusDevice.v2.depth', [
  { when: {}, text: ['Technology meets campus flesh — remote warmth, unintended discovery, hunger amplified.'] },
]);
registerPool('opposition.v2.depth', [
  { when: { hearingType: 'emergency' }, text: [
    'Emergency session — every signature waits like a blade. The hall holds its breath in the hallway.',
    'Scandal made procedural. Vance wants blood on paper before anyone eats again.',
  ]},
  { when: { hearingType: 'removal', hearingPhase: [1, 2] }, text: [
    'Second motion — restraint spoken like virtue while bellies still remember lunch.',
    'Conditional enrollment on the table. Hunger treated like a phase the Board can outlast.',
  ]},
  { when: { card: 'wellness_audit' }, text: [
    'Compliance arrives dressed as care. Shame wears a lanyard and calls itself assessment.',
    'Clipboard at mid-meal — institutional concern photographing abundance.',
  ]},
  { when: { card: 'size_review' }, text: [
    'Mandatory weigh-ins — mass translated into audit columns and signed testimony.',
    'The Board wants numbers. Every scale becomes evidence in Vance\'s folder.',
  ]},
  { when: { card: 'removal_hearing' }, text: [
    'Removal on the agenda — one girl\'s enrollment becomes the week\'s central argument.',
    'Institutional teeth finally chose a name. Photos of fullness fill the projector.',
  ]},
  { when: {}, text: [
    'Institutional pressure reshapes the board — scarcity and scrutiny braid together off-screen.',
    'Vance\'s folder thickens. Appetite defended like curriculum, attacked like scandal.',
    'Five polished chairs, one hungry class — the Board performs worry while you perform abundance.',
    'Toner and denial in the conference air. Hunger is the argument they cannot win cleanly.',
  ]},
]);
registerPool('campusSecret.v2.depth', [
  { when: {}, text: ['The campus yields a secret — older hunger, hidden routes, abundance tucked where no one looks.'] },
]);
registerPool('journal.v2.depth', [
  { when: {}, text: ['The page holds more than observation — appetite recorded like scripture, growth treated as data worth worshipping.'] },
]);
registerPool('streamPre.v2.depth', [
  { when: {}, text: ['Before the camera lights, she rehearses abundance — outfit, mirror, snack, the private ritual of going on display.'] },
]);
registerPool('stream.v2.depth', [
  { when: { perf: ['excellent', 'good'], stageMin: 7 }, text: [
    'The camera loves mass at this scale — every bite lands like proof she was always meant to be watched eating.',
    'Chat counts in thousands now. Her belly fills the frame and nobody asks her to move.',
  ]},
  { when: { perf: ['excellent', 'good'] }, text: [
    'The round lands clean — sponsor logo, chewing rhythm, hunger made into content.',
    'She eats like someone who knows the audience is rooting for the next bite.',
    'Performance and appetite blur. The chat rewards both.',
  ]},
  { when: { perf: ['poor', 'verypoor'] }, text: [
    'The struggle is content too — breath, fullness, the honest edge where appetite outruns stamina.',
    'She slows and the chat notices. Sympathy and hunger arrive in the same scroll.',
  ]},
  { when: { brand: 'crunchforge' }, text: ['Crunchforge wants effort on camera — sweat, strain, the brutal charm of competitive eating.'] },
  { when: { brand: 'velvetmelt' }, text: ['Velvetmelt wants it slow and sensual — every swallow deliberate, every moan marketable.'] },
  { when: { brand: 'fizzpeak' }, text: ['Fizzpeak wants chaos and joy — burps, laughter, the spectacle of someone having too much fun to stop.'] },
  { when: { brand: 'glazeco' }, text: ['Glazeco wants pretty — neat bites, composed face, hunger dressed like elegance.'] },
  { when: { audienceTier: ['late', 'veryLate'] }, text: [
    'The audience has history with her body now — they remember when she was smaller, and they pay to watch her outgrow that memory.',
    'Parasocial hunger: thousands of strangers invested in her next pound.',
  ]},
  { when: {}, text: [
    'Livestream heat — camera, chat, the public ritual of eating for an audience.',
    'Every round is content. Every bite is brand.',
    'The stream turns appetite into spectacle and spectacle into appetite.',
    'She performs hunger and hunger performs back through the lens.',
  ]},
]);
registerPool('collabStream.v2.depth', [
  { when: { collabStage: [4, 5] }, text: [
    'Two bodies on one stream — mass doubled, appetite amplified, the chat paying to watch both bellies grow.',
    'Collab at legendary scale: Kylie and her partner eating like the platform was built for this moment.',
  ]},
  { when: { collabStage: [2, 3] }, text: [
    'The double feed works — chemistry, competition, the pleasure of growing together on camera.',
    'Viewer count climbs as both women lean into the format: more food, more warmth, more proof.',
  ]},
  { when: {}, text: [
    'Collab stream heat — two feedees, one table, the chat hungry for both.',
    'Kylie and her partner turn appetite into spectacle and spectacle into appetite.',
    'The format is simple: feed both, watch the numbers climb, let the chat lose its mind.',
    'Double the plates, double the warmth, double the content the audience came for.',
  ]},
]);
registerPool('recordingSession.v2.depth', [
  { when: { takeQuality: ['perfect'] }, text: [
    'The take lands perfect — light, hunger, and devotion aligned in one unrepeatable clip.',
    'Through the lens she is art: appetite directed, body worshipped, growth made intimate.',
  ]},
  { when: { takeQuality: ['great', 'good'] }, text: [
    'Solid footage — her body reads honest on camera, every bite another frame of surrender.',
    'The session captures warmth: food, flesh, and the quiet thrill of being filmed while growing.',
  ]},
  { when: { recordingStage: [4, 5] }, text: [
    'At this scale filming is geography — camera tracing mass that barely fits the frame.',
    'Immobility makes every swallow monumental; the room belongs to her belly now.',
  ]},
  { when: {}, text: [
    'Private dorm-room filming — ring light, camera, the feedee path made visual.',
    'Intimate direction: you choose angle, food, pace; she gives you her growth on tape.',
    'The session turns appetite into content and content into proof of devotion.',
    'Warm light on warm flesh — every take another record of her getting bigger for you.',
  ]},
]);
registerPool('eatingContest.v2.depth', [
  { when: { contestStage: [4, 5] }, text: [
    'National-scale competition — the crowd came to watch mass meet appetite on a stage.',
    'At this weight the contest is spectacle: belly, table, scale, the arithmetic of glory.',
  ]},
  { when: { contestStage: [2, 3] }, text: [
    'Circuit heat — Maya across the table, plates between you, capacity tested in public.',
    'Competitive eating as identity: every bite scored, every pound part of the story.',
  ]},
  { when: {}, text: [
    'Contest floor energy — crowd noise, judge clipboard, hunger made sport.',
    'You and Maya eat for the scale: fullness bars, strategy, the pleasure of outpacing.',
    'Regional circuit warmth — food piled high, bellies growing under the lights.',
    'The table is the arena. Appetite is the weapon. Weight is the trophy.',
  ]},
]);
registerPool('sumoMatch.v2.depth', [
  { when: { sumoStage: [5] }, text: [
    'Invitational dohyo — the ring was not built for a body your size, and that is the point.',
    'Keiko trained a year to feel what mass at this scale does to clay and crowd alike.',
  ]},
  { when: { sumoStage: [3, 4] }, text: [
    'National circuit heat — belly against belly, the tawara deciding who owns the future.',
    'Dana Mercer is the wall; you are the tide. The dohyo measures which force wins.',
  ]},
  { when: { sumoStage: [1, 2] }, text: [
    'Regional sumo — chanko in the corner, weight in the stance, veteran craft vs growing mass.',
    'Every bout feeds the next: eat heavier, push harder, let the scale write the strategy.',
  ]},
  { when: {}, text: [
    'Dohyo clay under wide feet — tachi-ai, telegraph, the pleasure of mass made sport.',
    'Corner chanko between bouts: fuel turned into force, belly turned into leverage.',
    'Dana sets her feet. You set yours. The crowd holds its breath at the contact.',
    'Sumo as growth ritual — heavier wins, and you intend to keep winning.',
  ]},
]);
registerPool('wifeLessonsTalk.v2.depth', [
  { when: { wlStage: [6, 7, 8] }, text: [
    'The conversation settles warm as dough — mothers and daughters speaking appetite like scripture.',
    'Kitchen intimacy in every line: fullness discussed without shame, growth treated as devotion.',
  ]},
  { when: { wlStage: [3, 4, 5] }, text: [
    'She talks like someone crossing a threshold — appetite named aloud, permission spreading through the room.',
    'The lesson lingers in her voice. Butter, belonging, the slow pleasure of admitting want.',
  ]},
  { when: {}, text: [
    'Southern warmth in every syllable — food, family, the philosophy of more passed mother to daughter.',
    'The kitchen listens. So do you. Appetite spoken like something sacred and ordinary at once.',
  ]},
]);
registerPool('homeroom.v2.depth', [
  { when: {}, text: [
    "Daisy's kitchen hums with institutional warmth — cookies, curriculum, and calculated indulgence.",
    'Tuesday theology: feed the hall, charm the parents, grow the suspicion meter one tray at a time.',
    'The homeroom queen holds court — soft power measured in butter and bake-sale diplomacy.',
  ]},
]);
registerPool('wifeLessons.v2.depth', [
  { when: { wlStage: [6, 7, 8] }, text: [
    'The kitchen has become a throne room of butter and belonging — daughters and mothers alike surrendering to the lesson.',
    'Generations lean into the same warm plate. Appetite passes hand to hand like inheritance.',
  ]},
  { when: { wlStage: [3, 4, 5] }, text: [
    'The lesson lands soft and certain — flour on aprons, sweetness on tongues, the philosophy of fullness made edible.',
    'Mary Jane teaches with her hands and her smile. Everyone leaves heavier in appetite and in flesh.',
  ]},
  { when: {}, text: [
    'Warm kitchen, warm dough, warm philosophy — abundance taught one generous bite at a time.',
    'The lesson is not just food. It is permission, passed around the table until no one refuses.',
    'Southern comfort made curriculum. Every woman in the room understands what she is being offered.',
  ]},
]);

// ── Body portrait v2 sensory layer ────────────────────────────
registerPool('body.v2.sensory', [
  { when: { stageMin: 9 }, text: [
    'Warmth radiates from her in layers — belly, thighs, the soft architecture of a body that has become environment.',
    'She occupies space the way weather does — present, enveloping, impossible to ignore.',
  ]},
  { when: { stageMin: 5 }, text: [
    'She moves with the particular rhythm of added weight — slower, softer, more present in every step.',
    'Softness announces itself at every angle. Growth written in flesh.',
  ]},
  { when: {}, text: [
    'Softness visible at every angle. Growth written in flesh.',
    'Her body speaks before she does — warm, round, newly abundant.',
    'The eye finds her curves and stays.',
  ]},
]);
