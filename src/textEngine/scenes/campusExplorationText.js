// ═══════════════════════════════════════════════════════════════
// SCENE: CAMPUS EXPLORATION — modular travel & sighting prose
// ═══════════════════════════════════════════════════════════════
import { registerPool, createContext, render } from '../engine.js';
import { getStage } from '../../gameData/stages.js';
import { appendV2Depth } from './v2/depthRenderer.js';
import '../modules.js'; // subject.name etc.

// ── student sightings (weight-band × archetype) ───────────────

registerPool('campus.sighting', [
  // Brittany — cheerleader
  { when: { archetype: 'cheerleader', weightBand: 'lean' }, priority: 4,
    text: [
      '{subject.name} runs the quad perimeter with the squad — ponytail sharp, voice carrying, every cheer landing on beat.',
      'You spot {subject.name} drilling formations on the lawn. She barks timing corrections without breaking a sweat.',
      'She counts reps aloud; the squad answers on cue — lean, loud, still untouchable.',
    ] },
  { when: { archetype: 'cheerleader', weightBand: 'mid' }, priority: 4,
    text: [
      '{subject.name} still leads practice, but she pauses between sets to drain a protein shake — a second bottle waits on the bench.',
      "{subject.name}'s uniform strains at the seams while she calls counts from the center. She refuses to sit out. She should, probably.",
      'Between drills she fans herself with a pom and reaches for another shake without breaking eye contact with the squad.',
    ] },
  { when: { archetype: 'cheerleader', weightBand: 'heavy' }, priority: 4,
    text: [
      '{subject.name} commands from the sidelines now, megaphone in hand, cheerleaders orbiting her with snacks. She eats between orders without missing a beat.',
      'Practice slows around {subject.name} — she tries one sprint, gets winded, laughs it off, and sends two juniors for more shakes.',
      'She still owns the field from a folding chair — voice sharp, belly soft, authority unchanged.',
    ] },
  { when: { archetype: 'cheerleader', weightBand: 'extreme' }, priority: 4,
    text: [
      '{subject.name} holds court from a reinforced bench, belly spilling past her knees, still directing the squad with terrifying authority. Eating is part of the warm-up now.',
      'Two cheerleaders help {subject.name} stand so she can demonstrate a move. She makes it halfway, claps anyway, and demands pasta for the team.',
      'The squad warms up around her like planets — she eats, points, and nobody argues with the woman who built the program.',
    ] },
  // Cassidy — bookworm
  { when: { archetype: 'bookworm', weightBand: 'lean' }, priority: 4,
    text: [
      '{subject.name} is buried in a library carrel, glasses sliding, three color-coded stacks of sociology texts.',
      'You pass {subject.name} in a quiet corner — she mutters citations under her breath and does not notice you.',
      'Her pen never stops; neither does the quiet rustle of wrappers in her bag.',
    ] },
  { when: { archetype: 'bookworm', weightBand: 'mid' }, priority: 4,
    text: [
      '{subject.name} has annexed a snack shelf into her carrel. Highlighting continues. Crumbs continue. She calls it "methodology."',
      '{subject.name} knocks a stack of books with her hip, flushes, and keeps reading while unwrapping a granola bar with her teeth.',
      'She underlines a passage with one hand and reaches for trail mix with the other — research fuel, she insists.',
    ] },
  { when: { archetype: 'bookworm', weightBand: 'heavy' }, priority: 4,
    text: [
      '{subject.name} barely fits in her usual carrel — she turned the neighboring one into a snack annex and a footrest.',
      'A librarian pretends not to see {subject.name} eating a full lunch in the silent stacks. {subject.name} pretends not to see the librarian pretending.',
      'Her notes cite three theorists and one bakery; both lists keep growing.',
    ] },
  { when: { archetype: 'bookworm', weightBand: 'extreme' }, priority: 4,
    text: [
      '{subject.name} has claimed two tables. Belly pressed to the edge, she annotates a paper on "embodied campus culture" while finishing a third pastry.',
      '{subject.name} tries to squeeze between shelves, fails gently, and documents the attempt in her notes without stopping chewing.',
      'The library has made peace with her size; she has made peace with never leaving.',
    ] },
  // Kylie — influencer
  { when: { archetype: 'influencer', weightBand: 'lean' }, priority: 4,
    text: [
      '{subject.name} films B-roll by the fountain — angles precise, lighting checked twice, every gesture brand-ready.',
      '{subject.name} poses for a thumbnail at the café window. She retakes it four times. The fourth is worse. She posts it.',
      'Ring light tucked in her bag — always ready, always filming.',
    ] },
  { when: { archetype: 'influencer', weightBand: 'mid' }, priority: 4,
    text: [
      '{subject.name}\'s content has shifted: "curvy campus diaries" plays from her phone while she films a what-I-eat segment on the quad bench.',
      'She adjusts the ring light around a tighter waistband and keeps filming. Comments love it. {subject.name} reads them while chewing.',
      'A sponsored snack review turns into a second take, then a third — she eats the props without breaking character.',
    ] },
  { when: { archetype: 'influencer', weightBand: 'heavy' }, priority: 4,
    text: [
      '{subject.name} needs a friend to hold the camera higher — the old angles do not clear her belly anymore. She calls it "authentic."',
      'A "body positivity haul" wraps mid-shoot because {subject.name} runs out of frame. She keeps the blooper. Engagement spikes.',
      'She films from the waist up and lets comments fill in the rest — they always do.',
    ] },
  { when: { archetype: 'influencer', weightBand: 'extreme' }, priority: 4,
    text: [
      '{subject.name} films from a seated position only now — vast, composed, eating on camera with the serenity of someone who has monetized inevitability.',
      'Two assistants angle lights around {subject.name}\'s belly while she narrates a sponsored meal. She has never been more on-brand.',
      'The algorithm rewards consistency; she rewards it back, bite after bite, unhurried.',
    ] },
  // Serena — athlete
  { when: { archetype: 'athlete', weightBand: 'lean' }, priority: 4,
    text: [
      '{subject.name} blurs past on the track — compression gear, jaw set, times logged in her head after every lap.',
      'Post-practice {subject.name} stretches on the bleachers, shaking out her legs like she could run again immediately.',
      'She logs a split time on her phone and frowns — not at the number, at the snack she forgot.',
    ] },
  { when: { archetype: 'athlete', weightBand: 'mid' }, priority: 4,
    text: [
      '{subject.name} finishes intervals winded, stares at her watch, and attacks a pasta container with frustrated precision.',
      'She still trains hard — but the recovery shakes have doubled, and she scowls at numbers that will not cooperate.',
      'Ice bath forgotten; she eats standing up, still in gear, still angry at the scale.',
    ] },
  { when: { archetype: 'athlete', weightBand: 'heavy' }, priority: 4,
    text: [
      '{subject.name} attempts sprints, stops after two, and fuels anyway — "maintenance," she says, through a mouthful of noodles.',
      'On the bleachers, {subject.name} eats while watching freshmen run. Her expression is not jealousy. It is hunger with statistics.',
      'Her coach waves from the field; she waves back with a fork.',
    ] },
  { when: { archetype: 'athlete', weightBand: 'extreme' }, priority: 4,
    text: [
      '{subject.name} wheezes through a single lap, sits heavily, and keeps eating "for when the times come back." They will not come back soon.',
      'She tapes an ankle she does not need and orders delivery to the track. Training is theoretical now. Fueling is not.',
      'The track belongs to thinner legs now; her bench belongs to her — and to whatever arrives in a bag.',
    ] },
  // Reneé — culinary
  { when: { archetype: 'culinary', weightBand: 'lean' }, priority: 4,
    text: [
      '{subject.name} tastes something from a takeout container, frowns, adjusts seasoning, and offers you a bite without looking up.',
      'The food court smells like {subject.name}\'s latest test batch before you see her — flour on her cheek, focus absolute.',
      'She tastes, adjusts, tastes again — the campus is her test kitchen.',
    ] },
  { when: { archetype: 'culinary', weightBand: 'mid' }, priority: 4,
    text: [
      '{subject.name} plates samples for strangers with evangelical warmth. She eats every failed batch. There are many failed batches.',
      'She whispers "needs more fat" over a tray and eats the correction with a spoon. Campus lines up anyway.',
      'A ladle goes missing; she is using it as a tasting spoon without shame.',
    ] },
  { when: { archetype: 'culinary', weightBand: 'heavy' }, priority: 4,
    text: [
      '{subject.name} runs a tasting table from a reinforced stool — belly forward, hands busy, every passerby leaves heavier.',
      'Students orbit {subject.name}\'s pop-up like a planet. She feeds them and herself in the same rhythm, humming.',
      'She calls the portion "a sample" and eats a full serving anyway — quality control.',
    ] },
  { when: { archetype: 'culinary', weightBand: 'extreme' }, priority: 4,
    text: [
      '{subject.name} has turned a corner of the court into a feeding station. She does not leave. Nobody asks her to.',
      'She licks a spoon, declares a batch "perfect," and slides a second portion into her own bowl before anyone else can protest.',
      'The line wraps twice; she eats from the pass while she works it.',
    ] },
  // Kaylee — nursing
  { when: { archetype: 'nursing', weightBand: 'lean' }, priority: 4,
    text: [
      '{subject.name} checks on a freshman with a thermos and a tone that brooks no argument about sleep or meals.',
      'She carries extra snacks in her clinical bag — "just in case," she says, already opening one for someone else.',
      'She checks a pulse, nods, and presses a granola bar into the same hand.',
    ] },
  { when: { archetype: 'nursing', weightBand: 'mid' }, priority: 4,
    text: [
      '{subject.name} "takes care of" half her floor — Tupperwares appear, weights creep up, she calls it wellness.',
      'She sits with a student, insists on seconds, and eats alongside her "so it is not weird." It is still weird. It works.',
      'Her clipboard has vitals on one side and takeout menus on the other.',
    ] },
  { when: { archetype: 'nursing', weightBand: 'heavy' }, priority: 4,
    text: [
      '{subject.name}\'s nurturing has scaled — she coordinates group meals from a couch she barely leaves, belly soft, voice warm.',
      'She takes vitals, then orders pizza for the whole study group. "Stress management," she says, eating crust first.',
      'Everyone on the floor knows her couch; everyone leaves fed.',
    ] },
  { when: { archetype: 'nursing', weightBand: 'extreme' }, priority: 4,
    text: [
      '{subject.name} hosts open-door comfort hours. Everyone leaves fed. So does she — continuously, absently, like breathing.',
      'Her bag is empty of supplies and full of snacks. She is the supply now — round, steady, impossible to refuse.',
      'She listens, nods, and slides another plate across without being asked.',
    ] },
  // Daisy — eced
  { when: { archetype: 'eced', weightBand: 'lean' }, priority: 4,
    text: [
      '{subject.name} hands out homemade cookies before anyone asks. She smells like vanilla and grading rubrics.',
      'She coaxes a quiet student into eating lunch on the quad bench — mom-coded concern, no embarrassment allowed.',
      'Sticker on her water bottle: YOU ARE LOVED. She means it, and she brought cookies.',
    ] },
  { when: { archetype: 'eced', weightBand: 'mid' }, priority: 4,
    text: [
      "{subject.name}'s snack bag has become a tote. She feeds practicum students between observations and nibbles constantly herself.",
      'She packs extra lunches "by mistake" again. Her sweater rides up. Nobody returns the food.',
      'She calls it modeling healthy relationships with food. The modeling is continuous.',
    ] },
  { when: { archetype: 'eced', weightBand: 'heavy' }, priority: 4,
    text: [
      '{subject.name} holds desk hours with a crockpot. Students eat. She eats. Lesson plans wait.',
      'She waddles between dorm kitchens with foil trays — nurturing at scale, belly leading, smile unwavering.',
      'The practicum observes her; she observes them eating — everyone passes.',
    ] },
  { when: { archetype: 'eced', weightBand: 'extreme' }, priority: 4,
    text: [
      '{subject.name} has a permanent snack station outside the education wing. She presides, vast and gentle, until everyone is full.',
      'She tries to tie an apron. Gives up. Feeds the hall anyway from a chair that creaks heroically.',
      'Small chairs circle her like satellites; she is the warm center they orbit.',
    ] },
  // Lilith — predator (rare)
  { when: { archetype: 'predator', weightBand: 'lean' }, priority: 5,
    text: [
      'For a split second you think you see {subject.name} at the edge of the crowd — still, dark clothes, gone when you blink.',
      'A chill passes through the quad. Someone mentions {subject.name}. No one can point to where she was.',
      'You tell yourself it was a trick of the light. The air stays cold a moment longer anyway.',
    ] },
  { when: { archetype: 'predator', weightBand: 'mid' }, priority: 5,
    text: [
      '{subject.name} watches from a doorway you could swear was empty. Her smile does not reach the rest of her face.',
      'You find a chair still warm. {subject.name}\'s name is scratched into the armrest. The scratch looks fresh.',
      'She eats something dark and sweet; you do not ask where she got it.',
    ] },
  { when: { archetype: 'predator', weightBand: 'heavy' }, priority: 5,
    text: [
      '{subject.name} sits perfectly still on a bench until every other student leaves. Then she eats something you did not see her bring.',
      'She passes close enough to touch. You smell iron and sugar. When you turn, only a wrapper remains.',
      'Campus feels smaller when she is nearby — as if space is being saved for something.',
    ] },
  { when: { archetype: 'predator', weightBand: 'extreme' }, priority: 5,
    text: [
      '{subject.name} occupies a corner of the union like a predator at a watering hole. Conversations quiet. Appetites do not.',
      'Students avoid a bench she uses. It sags in the middle now. {subject.name} is not there. The avoidance persists.',
      'She leaves warmth and crumbs; she does not leave explanations.',
    ] },
  // Generic fallbacks by weight band
  { when: { weightBand: 'lean' }, priority: 1,
    text: [
      'You spot {subject.name} between classes — light on her feet, schedule in hand.',
      '{subject.name} waves from across the path, still moving like the campus is hers.',
      'She checks her phone between strides — busy, unhurried, still slight.',
    ] },
  { when: { weightBand: 'mid' }, priority: 1,
    text: [
      '{subject.name} lingers on a bench with a full lunch, uniform a little tighter than last month.',
      'You pass {subject.name} — slower now, snack in hand, unbothered by the change.',
      'She eats without hiding it anymore — not proud yet, not ashamed either.',
    ] },
  { when: { weightBand: 'heavy' }, priority: 1,
    text: [
      '{subject.name} holds court at a table, belly forward, friends orbiting with refills.',
      '{subject.name} crosses the quad unhurriedly. People make room without thinking.',
      'Her laugh carries; her body takes up the bench and the conversation.',
    ] },
  { when: { weightBand: 'extreme' }, priority: 1,
    text: [
      '{subject.name} has become a landmark — installed, fed, content.',
      'Campus routes around {subject.name} now. She seems to prefer it that way.',
      'She greets passersby from a fixed point; movement is optional, presence is not.',
    ] },
  { when: {}, text: [
    'You spot {subject.name} between classes — present, unhurried, part of the campus flow.',
    '{subject.name} crosses your path with the easy confidence of someone who belongs here.',
    'Campus noise softens for a moment around {subject.name}, then resumes.',
    'You catch {subject.name} in passing — unremarkable, unhurried, part of the day\'s texture.',
  ] },
]);

registerPool('campus.travel', [
  { when: { campusTierMin: 2 }, priority: 2,
    text: [
      'Students whisper "wellness solutions" like a password. Someone hands out samples with devotional care.',
      'A group eats in synchronized silence. They smile at the same time. It is not natural.',
      'Graffiti under the union stairs: SATURATE. The paint is still wet.',
      'A girl thanks "the pharmacist" to no one in particular, and eats until she forgets why she started.',
    ] },
  { when: {}, priority: 0,
    text: [
      'A food truck plays lo-fi while the line doubles. Nobody leaves.',
      'Two students compare meal-plan hacks. Both plans have expanded since September.',
      'The breeze carries fried sugar from three directions at once.',
      'Someone naps on a bench with a half-eaten pastry balanced on their stomach like a trophy.',
      'A study group converts a whiteboard into a snack roster. Academics are listed second.',
      'Roommates argue about whose turn it is to order. Both phones already have carts open.',
      'A facilities worker eyes a reinforced bench and makes a note. You do not ask what it says.',
    ] },
]);

registerPool('campus.location', [
  { when: { nodeId: 'quad' }, priority: 2,
    text: ['Food trucks idle in a row like predators that learned parking etiquette.', 'The lawn has more blankets than grass on a weekday afternoon.', 'Someone naps on a bench with a pastry balanced on their stomach like a trophy.'] },
  { when: { nodeId: 'library' }, priority: 2,
    text: ['The third floor smells like coffee and surrender.', 'Someone snores gently between stacks. A textbook rises and falls on their belly.', 'A study carrel holds crumbs, wrappers, and the ghost of a third snack break.'] },
  { when: { nodeId: 'dining_hall' }, priority: 2,
    text: ['The dessert station has a queue that behaves like a single organism.', 'A staff member plates a fourth serving without being asked.', 'Steam and sugar hang in the air — the whole building smells like seconds.'] },
  { when: { nodeId: 'gym' }, priority: 2,
    text: ['The juice bar blender never stops during peak hours.', 'A poster advertises "recovery" portions the size of small pets.', 'Someone leaves the treadmill for the smoothie line and does not return.'] },
  { when: { nodeId: 'garden' }, priority: 2,
    text: ['Fruit trees lean slightly toward the path, as if offering.', 'A greenhouse fan hums. Inside, someone is eating something not on the meal plan.', 'Herbs grow thick along the path — picked clean below, untouched above reach.'] },
  { when: {}, text: [
    'The campus hums with its usual foot traffic and appetite.',
    'Students drift past carrying food like portable flags.',
    'Something smells good from a direction you cannot quite name.',
    'Between bells, the paths fill with the ordinary commerce of hunger and hurry.',
  ] },
]);

registerPool('campus.find', [
  { when: { campusTierMin: 3 }, priority: 2,
    text: [
      'You find condensed sweetness pooled where students gather — useful, unsettling, bottled before it evaporates.',
      'A feeding nook yields a jar of tithes: sticky devotion and chemical residue in equal measure.',
      'A hidden alcove drips with residue from something engineered — you take what you can carry.',
    ] },
  { when: {}, priority: 0,
    text: [
      'You pocket foraged campus herbs — mint, berries, something worth carrying.',
      'A dropped snack crate yields portions someone was too full to finish. Waste not.',
      'A bench yields a napkin-wrapped pastry still warm — someone left it behind, too full to carry.',
      'You find a party tray half untouched behind the union; the leftovers are yours for the taking.',
    ] },
]);

/** Build text-engine context for a campus sighting. */
export function campusSightingContext(student, explorationCtx, nodeId) {
  let stageId = getStage(student.lbs).id;
  if (explorationCtx.campusFattening) stageId = Math.min(11, stageId + 1);
  if (explorationCtx.campusTier >= 2) stageId = Math.min(11, stageId + 1);
  const bands = { lean: [0, 2], mid: [3, 5], heavy: [6, 8], extreme: [9, 11] };
  let weightBand = 'lean';
  for (const [band, [lo, hi]] of Object.entries(bands)) {
    if (stageId >= lo && stageId <= hi) { weightBand = band; break; }
  }
  return createContext({
    subject: student,
    week: explorationCtx.week ?? 1,
    globals: {
      campusFattening: explorationCtx.campusFattening,
      campusTier: explorationCtx.campusTier ?? 0,
      weightBand,
      nodeId,
      studentId: student.id,
    },
  });
}

export function renderCampusSighting(student, explorationCtx, nodeId) {
  const ctx = campusSightingContext(student, explorationCtx, nodeId);
  const line = render('{campus.sighting}', ctx);
  if (!line) return null;
  const depth = appendV2Depth(line, 'campusNav', ctx, 0.22);
  return depth ? `👁 ${depth}` : null;
}

export function renderCampusTravelLine(explorationCtx, nodeId, category = 'travel') {
  const ctx = createContext({
    week: explorationCtx.week ?? 1,
    globals: {
      campusFattening: explorationCtx.campusFattening,
      campusTier: explorationCtx.campusTier ?? 0,
      nodeId,
    },
  });
  const key = category === 'location' ? '{campus.location}' : '{campus.travel}';
  const base = render(key, ctx)?.trim() || '';
  return appendV2Depth(base, 'campusNav', ctx, 0.2);
}

export function renderCampusFindFlavor(explorationCtx) {
  const ctx = createContext({
    week: explorationCtx.week ?? 1,
    globals: {
      campusTier: explorationCtx.campusTier ?? 0,
      campusFattening: explorationCtx.campusFattening,
    },
  });
  const base = render('{campus.find}', ctx)?.trim() || '';
  return appendV2Depth(base, 'campusNav', ctx, 0.2);
}
