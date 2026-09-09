// The Squad — Lead: A2 Psych | Support: A5 Editor, A6 Slender
// Per-student archetype voice for high-traffic V2 depth pools
import { registerModuleVariants } from '../../engine.js';

const W = 4;

const talkByStudent = {
  0: ['Brittany frames appetite like squad business — direct, competitive, already treating hunger as something to win.'],
  1: ['Cassidy annotates her cravings mid-sentence, as if desire were another dataset worth filing correctly.'],
  2: ['Kylie narrates her own hunger like content — every craving staged, every admission camera-ready.'],
  3: ['Serena talks about food the way she used to talk about splits — metrics, discipline, and the pleasure of pushing past them.'],
  4: ['Fiona drifts from topic to topic until appetite becomes the only honest subject in the room.'],
  5: ['Destiny delivers hunger in flat gamer syntax — no drama, just the fact that she wants more.'],
  6: ['Tiffany hosts the conversation like a chapter event — gracious, social, already pouring seconds into the subtext.'],
  7: ['Priya schedules her cravings between deadlines and still finds room to optimize for pleasure.'],
  8: ['Maya says little. What she does say lands soft and certain, appetite folded into silence.'],
  9: ['Chloé seasons every sentence with Parisian amusement — American portions as cultural discovery.'],
  10: ['Reneé tastes words the way she tastes recipes — slow, sensory, already planning the next course.'],
  11: ['Kaylee listens first, then answers with the warmth of someone who feeds people for a living.'],
  12: ['Nadia watches you while she speaks — clinical curiosity braided with hunger she refuses to dramatize.'],
  13: ['Daisy talks like a mentor with snacks in her bag — practical warmth, appetite offered as care.'],
  14: ['Mary Jane laughs easily and names hunger like weather back home — familiar, generous, impossible to refuse.'],
  15: ['Lilith speaks in low certainties — appetite as predation, pleasure as something she takes rather than asks for.'],
  16: ['Sophia cites formulations between bites — wellness language stretched thin over want she cannot quite banish.'],
  17: ['Indiana maps cravings like ruins — every appetite a clue, every meal an excavation worth pursuing.'],
  18: ['Talia discusses fullness like an engineering problem — inputs, outputs, optimization with grease on her fingers.'],
};

const feedByStudent = {
  0: ['Brittany eats like competition — chin up, pace steady, treating every portion like a score to beat.'],
  1: ['Cassidy tracks intake with athletic focus, then surrenders to warmth she pretends to merely document.'],
  2: ['Kylie performs the feed — angles considered, satisfaction visible, hunger made into spectacle.'],
  3: ['Serena feeds with athlete economy — efficient bites, full commitment, body answering before mind negotiates.'],
  4: ['Fiona savors slowly, as if each bite were pigment laid on canvas — deliberate, reverent, unhurried.'],
  5: ['Destiny eats with streamer detachment until fullness finally registers as a boss fight she intends to win.'],
  6: ['Tiffany accepts every portion with sorority poise — gracious, unflustered, already treating abundance as normal.'],
  7: ['Priya calculates capacity, exceeds her own projection, and logs the outcome with quiet triumph.'],
  8: ['Maya eats without commentary — hands steady, eyes down, appetite honest in the space between words.'],
  9: ['Chloé feeds with delighted scandal — every rich bite another proof that American excess suits her.'],
  10: ['Reneé tastes with chef precision — texture, heat, the pleasure of being fed what she already knows how to make.'],
  11: ['Kaylee leans into nourishment like medicine — warm, attentive, grateful in the way caregivers are.'],
  12: ['Nadia observes herself eating with unsettling calm — hunger noted, accepted, filed under ongoing research.'],
  13: ['Daisy eats like she is feeding someone else by proxy — generous, homey, already reaching for the next plate.'],
  14: ['Mary Jane feeds with farm-girl abundance — unashamed appetite, sweet warmth, seconds assumed.'],
  15: ['Lilith feeds like a predator at leisure — unhurried, possessive, pleasure taken without apology.'],
  16: ['Sophia swallows guilt with every bite — formulation rhetoric thinning as fullness wins the argument.'],
  17: ['Indiana treats the feed like field rations after a dig — hungry, roguish, delighted by surplus.'],
  18: ['Talia measures intake like a trial run — calibrated bites, data gathering, want leaking through the methodology.'],
};

const dinnerByStudent = {
  0: ['Brittany owns the table like a pep rally — public appetite, confident pace, every course another victory lap.'],
  1: ['Cassidy orders like a literature review — thorough, annotated, secretly pleased when the portions exceed plan.'],
  2: ['Kylie turns the restaurant into a set — lighting judged, bites timed, hunger staged for an invisible audience.'],
  3: ['Serena treats dinner like recovery fuel that kept growing — disciplined start, inevitable abundance by dessert.'],
  4: ['Fiona watches the room soften around her plate — food as atmosphere, fullness as slow composition.'],
  5: ['Destiny endures the outing like an IRL event — minimal commentary until the menu defeats her restraint.'],
  6: ['Tiffany makes the booth feel like a chapter house — social, indulgent, abundance treated as hospitality.'],
  7: ['Priya optimizes the order, then abandons optimization when the third course arrives and wins.'],
  8: ['Maya eats quietly in public — small gestures, deep focus, appetite legible only if you know her.'],
  9: ['Chloé savors American dining like theater — wine, portions, the pleasure of excess abroad.'],
  10: ['Reneé reads the menu like sheet music — courses as movements, appetite as the crescendo.'],
  11: ['Kaylee makes dinner feel cared-for — napkins, pace, the gentle authority of someone who feeds people.'],
  12: ['Nadia watches the room while she eats — clinical attention, private hunger, public table as field study.'],
  13: ['Daisy orders like a host — enough for everyone, comfort food logic, abundance as kindness.'],
  14: ['Mary Jane laughs over shared plates — southern warmth, sweet tooth, restaurant as extension of the homestead.'],
  15: ['Lilith dines like a cat in candlelight — selective bites, predatory patience, fullness earned not performed.'],
  16: ['Sophia picks at wellness options until richness wins — guilt and pleasure negotiating across the table.'],
  17: ['Indiana treats the menu like a treasure map — adventurous orders, roguish delight, every course a find.'],
  18: ['Talia reverse-engineers the kitchen from the plate — curious bites, technical murmurs, appetite outrunning analysis.'],
};

const wiByStudent = {
  0: ['Brittany reads the scale like a scoreboard — competitive calm, pride when the number climbs.'],
  1: ['Cassidy logs the weigh-in before she allows herself to feel it — data first, warmth second.'],
  2: ['Kylie checks the number like analytics — already imagining how it will look on camera.'],
  3: ['Serena steps off the scale with athlete poise — mass acknowledged, discipline unchanged.'],
  4: ['Fiona regards the digits as composition — growth as aesthetic fact, pleasing and complete.'],
  5: ['Destiny glances at the readout and shrugs — number filed, appetite unchanged.'],
  6: ['Tiffany accepts the weigh-in with chapter-president grace — abundance treated as normal.'],
  7: ['Priya updates her projections and looks quietly thrilled when reality exceeds model.'],
  8: ['Maya says nothing at the scale — a single exhale communicates everything.'],
  9: ['Chloé laughs at the number like another American extravagance she has learned to enjoy.'],
  10: ['Reneé tastes the moment — weight as ingredient, growth as recipe coming together.'],
  11: ['Kaylee steps off gently — nurturing calm, body cared for even while being measured.'],
  12: ['Nadia observes the reading with clinical interest that does not quite hide pleasure.'],
  13: ['Daisy treats the scale like attendance — warm, practical, another fact about a girl being looked after.'],
  14: ['Mary Jane grins at the number like good weather — familiar, generous, worth celebrating.'],
  15: ['Lilith reads weight like territory claimed — low satisfaction, predatory contentment.'],
  16: ['Sophia whispers formulation jargon that thins when the scale proves want won again.'],
  17: ['Indiana marks the number like a find on a map — roguish delight, appetite validated.'],
  18: ['Talia records the reading like trial data — curiosity bright when results exceed hypothesis.'],
};

const sessionByStudent = {
  0: ['Private session, squad-captain rules — Brittany eats like she is training for something only you understand.'],
  1: ['Cassidy keeps notes until she cannot — athletic restraint dissolving into warmth only a closed door allows.'],
  2: ['Kylie films or poses even alone with you — private hunger still performing, still magnificent.'],
  3: ['Serena treats the session like sport — breath measured, capacity tested, pride in how far she can go.'],
  4: ['Fiona makes privacy aesthetic — slow bites, soft light, fullness treated like finished work.'],
  5: ['Destiny slumps into the session like a late-night stream — dry commentary, sincere appetite underneath.'],
  6: ['Tiffany hosts even in private — gracious intake, poised fullness, abundance as elegance.'],
  7: ['Priya charts the session in real time — projections shattered, data glorious, body ahead of spreadsheet.'],
  8: ['Maya needs no audience — private session reduced to breath, hands, and appetite finally unguarded.'],
  9: ['Chloé makes privacy decadent — wine logic, unhurried bites, pleasure confessed in a second language.'],
  10: ['Reneé cooks the mood before the food — session as tasting menu, every portion curated for surrender.'],
  11: ['Kaylee feeds and is fed with caregiver intimacy — warmth, permission, fullness as comfort delivered.'],
  12: ['Nadia observes herself surrendering — clinical mask slipping as private appetite grows undeniable.'],
  13: ['Daisy turns the session homely — baked warmth, generous portions, fullness like being looked after.'],
  14: ['Mary Jane makes private eating feel like Sunday dinner — sweet, abundant, unashamed of wanting more.'],
  15: ['Lilith in private is all predator — unhurried consumption, possessive warmth, hunger without performance.'],
  16: ['Sophia\'s session is half confession — formulation language failing as fullness becomes the only truth.'],
  17: ['Indiana treats privacy like a dig site — hungry exploration, roguish laughter, appetite as discovered treasure.'],
  18: ['Talia prototypes the session — controlled variables collapsing as want exceeds the experiment.'],
};

function studentVariants(linesById) {
  return Object.entries(linesById).map(([id, text]) => ({
    when: { studentId: Number(id) },
    weight: W,
    text: Array.isArray(text) ? text : [text],
  }));
}

registerModuleVariants('talk.v2.depth', studentVariants(talkByStudent));
registerModuleVariants('feed.v2.depth', studentVariants(feedByStudent));
registerModuleVariants('dinner.v2.depth', studentVariants(dinnerByStudent));
registerModuleVariants('wi.v2.depth', studentVariants(wiByStudent));
registerModuleVariants('session.v2.depth', studentVariants(sessionByStudent));

const spiritByStudent = {
  0: ['Inside Brittany, hunger feels like competition — every craving a drill, every bite a score to beat.'],
  1: ['Inside Cassidy, appetite arrives as data first — warmth second, documented third.'],
  2: ['Inside Kylie, even possession performs — hunger staged, satisfaction camera-ready.'],
  3: ['Inside Serena, want moves like training — disciplined start, inevitable abundance.'],
  4: ['Inside Fiona, fullness becomes composition — sensory, slow, reverent.'],
  5: ['Inside Destiny, hunger is another system to optimize until it wins.'],
  6: ['Inside Tiffany, appetite hosts itself — gracious, social, already normal.'],
  7: ['Inside Priya, cravings slot between deadlines and still win.'],
  8: ['Inside Maya, possession is silence with teeth — want honest, words optional.'],
  9: ['Inside Chloé, hunger tastes like abroad — scandalous, delighted, rich.'],
  10: ['Inside Reneé, the resident rides a palate — texture, heat, recipe becoming body.'],
  11: ['Inside Kaylee, nourishment feels like care given and received at once.'],
  12: ['Inside Nadia, appetite observed from within — clinical mask slipping by degrees.'],
  13: ['Inside Daisy, hunger homely — generous, practical, impossible to refuse.'],
  14: ['Inside Mary Jane, want feels like Sunday weather — familiar, sweet, abundant.'],
  15: ['Inside Lilith, possession predatory — pleasure taken, not requested.'],
  16: ['Inside Sophia, formulation language thins; want speaks louder.'],
  17: ['Inside Indiana, appetite maps like ruins — every craving a clue worth digging.'],
  18: ['Inside Talia, hunger is an experiment escaping its own controls.'],
};

const resonanceByStudent = {
  0: ['Brittany\'s link hums competitive — appetite shared like a squad drill, every pulse a score to beat.'],
  1: ['Cassidy\'s resonance reads like correlated data — hunger arriving with footnotes she cannot ignore.'],
  2: ['Kylie\'s wire carries spectacle — linked craving trending before she admits it.'],
  3: ['Serena\'s link feels like training sync — appetite metered, then overwhelming.'],
  4: ['Fiona\'s resonance is aesthetic voltage — hunger painted across distance in soft strokes.'],
  5: ['Destiny\'s link pings like a party buff — shared hunger, minimal commentary, maximum effect.'],
  6: ['Tiffany\'s resonance hosts itself — linked appetite gracious, social, chapter-scale.'],
  7: ['Priya\'s wire optimizes craving — synchronized intake exceeding individual projections.'],
  8: ['Maya\'s resonance is quiet voltage — hunger felt before it is named, words optional.'],
  9: ['Chloé\'s link tastes continental — shared want seasoned with delighted scandal.'],
  10: ['Reneé\'s resonance carries kitchen heat — linked hunger like courses arriving in stereo.'],
  11: ['Kaylee\'s wire feels like vitals shared — warmth, care, appetite contagious as comfort.'],
  12: ['Nadia\'s link is clinical contagion — craving noted, transmitted, filed under ongoing study.'],
  13: ['Daisy\'s resonance homely — linked hunger like a potluck bell nobody ignores.'],
  14: ['Mary Jane\'s wire carries farm weather — shared appetite sunny, generous, inevitable.'],
  15: ['Lilith\'s resonance predatory — craving contagious as shadow, hunger without apology.'],
  16: ['Sophia\'s link warps wellness language — synchronized want dressed thin, failing fast.'],
  17: ['Indiana\'s resonance maps like ruins — linked appetite another dig site worth exploring.'],
  18: ['Talia\'s wire transmits trial data — hunger synchronized, hypothesis exceeded, want logged.'],
};

const ritualByStudent = {
  0: ['Brittany treats ritual like team banquet — public appetite, captain\'s pace, collective victory.'],
  1: ['Cassidy documents the ceremony until she joins it — scholarship dissolving into shared fullness.'],
  2: ['Kylie films the ritual — spectacle sacred, hunger staged for an invisible audience.'],
  3: ['Serena eats ritual like endurance sport — disciplined start, triumphant abundance.'],
  4: ['Fiona makes ceremony aesthetic — plates as altars, fullness as finished composition.'],
  5: ['Destiny endures ritual like a raid — dry commentary until the feast wins.'],
  6: ['Tiffany hosts the ceremony — elegance, abundance, sorority grace.'],
  7: ['Priya schedules ritual between deadlines — then abandons schedule when courses arrive.'],
  8: ['Maya\'s ritual is quiet devotion — few words, deep eating, trust in the shared table.'],
  9: ['Chloé seasons ceremony with Parisian delight — American portions as liturgy.'],
  10: ['Reneé treats ritual like service — courses composed, bellies the audience.'],
  11: ['Kaylee feeds ritual like medicine — warmth, permission, fullness as care delivered.'],
  12: ['Nadia observes ceremony while participating — clinical mask slipping bite by bite.'],
  13: ['Daisy\'s ritual homely — baked warmth, generous portions, abundance as kindness.'],
  14: ['Mary Jane\'s ritual tastes like homestead — sweet, generous, communal.'],
  15: ['Lilith dines ritual like predator at feast — unhurried, possessive, pleasure taken.'],
  16: ['Sophia\'s ceremony half-confession — formulation rhetoric failing as plates empty.'],
  17: ['Indiana treats ritual like field camp — hungry exploration, roguish laughter, surplus celebrated.'],
  18: ['Talia prototypes the feast — controlled variables collapsing under collective appetite.'],
};

const dreamByStudent = {
  0: ['Brittany dreams in pep rallies and endless trays — competition without losers, only fullness.'],
  1: ['Cassidy dreams in annotated margins — appetite footnoted until notes become bites.'],
  2: ['Kylie dreams in metrics and spectacle — impossible portions, perfect angles.'],
  3: ['Serena dreams like training montage — reps of eating, capacity tested past waking limits.'],
  4: ['Fiona dreams in pigment and portion — surreal, aesthetic, hungry.'],
  5: ['Destiny dreams like an endless stream overlay — chat donating food, boss fights of fullness.'],
  6: ['Tiffany dreams chapter-house vast — pastel halls, infinite catering, social abundance.'],
  7: ['Priya dreams spreadsheets dissolving into cake — data becoming dessert, want winning.'],
  8: ['Maya\'s dream speaks without dialogue — symbolism, warmth, want.'],
  9: ['Chloé dreams continental excess — feasts without translation, pleasure abroad.'],
  10: ['Reneé dreams kitchen cathedrals — courses without end, taste as religion.'],
  11: ['Kaylee dreams nurturing halls — every door opens to food, care, permission.'],
  12: ['Nadia dreams clinical feasts — appetite observed from inside the observation room.'],
  13: ['Daisy dreams southern tables endless — warmth, seconds, nobody leaves hungry.'],
  14: ['Mary Jane dreams harvest weather — golden fields, sweet abundance, appetite as season.'],
  15: ['Lilith dreams predation serene — hunt without chase, fullness as conquest.'],
  16: ['Sophia dreams wellness slides melting into frosting — language failing, want honest.'],
  17: ['Indiana dreams ruins full of provisions — every chamber a pantry, appetite archaeological.'],
  18: ['Talia dreams trial buffets — variables edible, hypothesis delicious, control abandoned.'],
};

const echoByStudent = {
  0: ['Brittany\'s echo plays like highlight reel — captain\'s growth, appetite victorious on replay.'],
  1: ['Cassidy\'s echo reads like a footnote to appetite — precise, warm, undeniable.'],
  2: ['Kylie\'s echo preserves the angle — memory mass framed for maximum impact.'],
  3: ['Serena\'s echo records capacity PRs — athletic pride, softness earned, replay fierce.'],
  4: ['Fiona\'s echo is gallery still — moment captured like pigment set on canvas.'],
  5: ['Destiny\'s echo logs like VOD timestamp — "here she got fat," chat optional.'],
  6: ['Tiffany\'s echo preserves chapter glow — ritual fullness, poise intact on replay.'],
  7: ['Priya\'s echo archives the outlier — data point that exceeded every model.'],
  8: ['Maya\'s echo preserves silence with weight — memory without performance.'],
  9: ['Chloé\'s echo tastes replay — sensation preserved, scandal sweet on return.'],
  10: ['Reneé\'s echo is tasting note made flesh — fullness remembered like perfect course.'],
  11: ['Kaylee\'s echo holds caregiver warmth — fed moment preserved, trust replayed.'],
  12: ['Nadia\'s echo files sensation under ongoing research — hunger as dataset.'],
  13: ['Daisy\'s echo homely — Sunday fullness preserved, kindness measurable on replay.'],
  14: ['Mary Jane\'s echo sunny — harvest moment stored, appetite celebrated again.'],
  15: ['Lilith\'s echo predatory still — conquest preserved, hunger patient on return.'],
  16: ['Sophia\'s echo catches formulation failing — wellness language thin over remembered want.'],
  17: ['Indiana\'s echo maps a find — growth preserved like artifact lifted from dig.'],
  18: ['Talia\'s echo trial data crystallized — moment archived where hypothesis became body.'],
};

registerModuleVariants('spirit.v2.depth', studentVariants(spiritByStudent));
registerModuleVariants('resonance.v2.depth', studentVariants(resonanceByStudent));
registerModuleVariants('ritual.v2.depth', studentVariants(ritualByStudent));
registerModuleVariants('dream.v2.depth', studentVariants(dreamByStudent));
registerModuleVariants('echo.v2.depth', studentVariants(echoByStudent));
