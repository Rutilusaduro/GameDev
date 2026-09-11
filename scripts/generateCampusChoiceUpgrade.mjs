// Unique extras for campusEvent.choice.* — kill recycled depth stems.
// Run: node scripts/generateCampusChoiceUpgrade.mjs
import { writeFileSync } from 'node:fs';
import '../src/textEngine/scenes/campusEvent/classIntegration.js';
import { _registryEntries } from '../src/textEngine/engine.js';

const OUT = 'src/textEngine/scenes/campusEvent/choiceUpgrade.js';

const ARCH_SID = {
  cheerleader: 0,
  bookworm: 1,
  influencer: 2,
  athlete: 3,
  artsy: 4,
  gamer: 5,
  sorority: 6,
  overachiever: 7,
  quiet: 8,
  transfer: 9,
};

/** Unique extras per choice key suffix after campusEvent.choice. */
const LEAF = {
  'mood_stressed.0': {
    generic: ['Cookies land without a speech. She eats until the hollow look thins.'],
    person: { 7: 'Priya blinks at the bag, then treats it like a revised deadline.', 16: 'Sophia logs the first cookie, then forgets the log.' },
  },
  'mood_stressed.1': {
    generic: ['She talks the hour empty. The notebook can open after that.'],
    person: { 1: 'Madeline unloads in complete sentences. Then she can work.', 7: 'Priya dumps the planner on the desk. You listen. She can breathe.' },
  },
  'mood_stressed.2': {
    generic: ['A small task she can finish. She locks in. The hour improves.'],
    person: { 18: 'Talia treats the busywork like a calibration. Hands steady again.' },
  },
  'mood_tired.0': {
    generic: ['Thermos and pastry. She sits up like someone plugged her back in.'],
    person: { 5: 'Destiny eats two before you finish the sentence. "Queued."', 11: 'Kaylee thanks you with her mouth full and looks human again.' },
  },
  'mood_tired.1': {
    generic: ['You say her name soft. She answers well and stays for the rest.'],
    person: { 12: 'Nadia surfaces, answers, then watches the room like a subject again.' },
  },
  'mood_tired.2': {
    generic: ['Back row, dimmer lights. She naps. She looks grateful about it.'],
    person: { 5: 'Destiny thumbs-up from the dark. The lecture can wait.' },
  },
  'mood_nervous.0': {
    generic: ['Warm tin, whole tin gone. Her shoulders drop one at a time.'],
    person: { 16: 'Sophia unclenches around pastry. The pipette-hand finally stills.' },
  },
  'mood_nervous.1': {
    generic: ['Easy contribution, structured. She gets through it. The jitter thins.'],
    person: { 1: 'Madeline nails the easy question and the rest of the hour holds.' },
  },
  'mood_nervous.2': {
    generic: ['After class, you listen. You leave her a snack for the walk.'],
    person: { 16: 'Sophia tells you the fear. You hand her something warm for the path.' },
  },
  'mood_focused.0': {
    generic: ['Reward lands on the notes. She nods. It is gone by the bell.'],
    person: { 1: 'Madeline acknowledges the pastry and keeps writing. Fortress fed.', 18: 'Talia files the chocolate as expected input and keeps the schematic.' },
  },
  'mood_focused.1': {
    generic: ['Optional extra work. She accepts like you offered a holiday.'],
    person: { 7: 'Priya starts planning the extension before you finish the offer.' },
  },
  'mood_focused.2': {
    generic: ['You stay out of her way. She powers through. Correct call.'],
    person: { 1: 'Madeline does not look up. The silence is the compliment.' },
  },
  'mood_excited.0': {
    generic: ['Group work eats the energy — and the snacks you set out.'],
    person: { 6: 'Tiffany facilitates the table and the tray with equal joy.' },
  },
  'mood_excited.1': {
    generic: ['You let her run the segment. She thrives. The room pays attention.'],
    person: { 2: 'Kylie explains it like a story. Everyone watches. She glows.' },
  },
  'mood_excited.2': {
    generic: ['Celebratory spread. She eats through the whole session like a parade.'],
    person: { 2: 'Kylie treats the spread like a wrap party that forgot the camera.', 14: 'Mary Jane calls it a harvest table and proves the name.' },
  },
  'mood_content.0': {
    generic: ['Warm pastry, slow bites, peaceful face. She finishes every crumb.'],
    person: { 8: 'Maya accepts it without breaking the quiet. Whole pastry. No speech.', 13: 'Daisy eats like the kitchen came to class and she is home.' },
  },
  'mood_content.1': {
    generic: ['Quiet reading, just for her. She is still there twenty minutes late.'],
    person: { 8: 'Maya settles into the pages and forgets the clock.' },
  },
  'mood_content.2': {
    generic: ['You sit on the desk edge and talk. Unhurried. She stays open.'],
    person: { 11: 'Kaylee talks care and leftovers in the same breath. Easy hour.' },
  },
  'arch_cheerleader.0': {
    generic: ['Campus diner, largest cake. By bite three the squad drama is funny.'],
    person: { 0: 'Brittany vents, then laughs, then finishes the slice like a heat.' },
  },
  'arch_cheerleader.1': {
    generic: ['You help her draft the message between slides. She writes it clean.'],
    person: { 0: 'Brittany: "Thanks for not saying it will be fine." She means the help.' },
  },
  'arch_cheerleader.2': {
    generic: ['Public compliment, real skill. She lights up. The politics shrink.'],
    person: { 0: 'Brittany hears her name done right in front of the room. Chin up.' },
  },
  'arch_bookworm.0': {
    generic: ['Full meal at her table. She eats without pausing the page.'],
    person: { 1: 'Madeline nods once. Fork and source share the hour. You sit quiet.' },
  },
  'arch_bookworm.1': {
    generic: ['Independent study credit. She looks up. Real delight. Then back down.'],
    person: { 1: 'Madeline: "...Really?" Then the fortress closes again, happier.' },
  },
  'arch_bookworm.2': {
    generic: ['Snack-and-discuss. Technically intellectual. The food still vanishes.'],
    person: { 1: 'Two hours later Madeline looks fed and still citing.' },
  },
  'arch_influencer.0': {
    generic: ['Artisan stuff for the shoot. She films it. Then she eats it for real.'],
    person: { 2: 'Kylie gets the angle, then forgets the angle. The cheese wins.' },
  },
  'arch_influencer.1': {
    generic: ['You ask to see the channel. She shows you. She did not expect that.'],
    person: { 2: 'Kylie: "Nobody ever actually asks." She looks briefly unbranded.' },
  },
  'arch_influencer.2': {
    generic: ['Class food feature. A sponsor spread appears. The class eats very well.'],
    person: { 2: 'Kylie documents the table, then joins it. Followers can wait.' },
  },
  'arch_athlete.0': {
    generic: ['Recovery as fuel logic. She treats the plate like a training plan.'],
    person: { 3: 'Serena respects the load-up. End of day, the tray is a personal best.' },
  },
  'arch_athlete.1': {
    generic: ['Moving, presenting, debating. She is immediately in her element.'],
    person: { 3: 'Serena runs the group like a heat. Energy finally has a lane.' },
  },
  'arch_athlete.2': {
    generic: ['Nutrition talk, sharp and specific. Carb-loading becomes an idea.'],
    person: { 3: 'Serena maps macros, then eyes the leftover pastry like a second set.' },
  },
  'arch_artsy.0': {
    generic: ['Food as still life, then as lunch. She draws it. She eats half.'],
    person: { 4: 'Fiona lights up. The page fills. So does she.' },
  },
  'arch_artsy.1': {
    generic: ['Quiet campus loop. She says little. She comes back sketching hard.'],
    person: { 4: 'Fiona walks, then the charcoal finally moves.' },
  },
  'arch_artsy.2': {
    generic: ['You tell her about being stuck. She listens with her whole body.'],
    person: { 4: 'Fiona relaxes the way a canvas does when the first mark lands.' },
  },
  'arch_gamer.0': {
    generic: ['Usual delivery, noticed pattern. Headphones down. She starts eating.'],
    person: { 5: 'Destiny: "How\'d you know?" Then the tray is the main quest.' },
  },
  'arch_gamer.1': {
    generic: ['Genuine patch question. Twenty minutes of build theory. She leaves lit.'],
    person: { 5: 'Destiny explains the patch like a raid. She is awake now.' },
  },
  'arch_gamer.2': {
    generic: ['Back row, notes later. One thumbs-up. She games the whole lecture.'],
    person: { 5: 'Destiny parks in the dark and queues. You promised the notes.' },
  },
  'arch_sorority.0': {
    generic: ['Classroom as venue. She vibrates. Catering is spectacular. You are invited.'],
    person: { 6: 'Tiffany books the room like a mixer. The food shows up obedient.' },
  },
  'arch_sorority.1': {
    generic: ['Ten minutes on the vendor knot. She did not expect you to know this.'],
    person: { 6: 'Tiffany: "I didn\'t think you\'d know." The spreadsheet unclenches.' },
  },
  'arch_sorority.2': {
    generic: ['Potluck suggestion. She plans tables and themes. The class eats extremely well.'],
    person: { 6: 'Tiffany turns potluck into a chapter event. Plates keep arriving.' },
  },
  'arch_overachiever.0': {
    generic: ['The paper is excellent. Rest. Eat. Lunch lands. Silence turns grateful.'],
    person: { 7: 'Priya eats the lunch like an assignment she finally cannot ace past.' },
  },
  'arch_overachiever.1': {
    generic: ['A problem without a clean answer. She dives. Most at peace all week.'],
    person: { 7: 'Priya forgets extra credit. The hard problem is enough.' },
  },
  'arch_overachiever.2': {
    generic: ['You read her passage, then name her. Red. Applause. Mortified delight.'],
    person: { 7: 'Priya goes scarlet and sits like she won something she cannot grade.' },
  },
  'arch_quiet.0': {
    generic: ['Pastry on the desk, no comment, no eye contact. She eats it slowly.'],
    person: { 8: 'Maya looks at it a long time. Then she eats. You do not make it a thing.' },
  },
  'arch_quiet.1': {
    generic: ['You ask to see the notebook. The drawings are extraordinary. You say so.'],
    person: { 8: 'Maya holds it out. Shoulders drop when you keep the praise small.' },
  },
  'arch_quiet.2': {
    generic: ['Small group, careful include. She stays. She thanks you after.'],
    person: { 8: 'Maya participates minimally and does not leave. Enough.' },
  },
  'arch_transfer.0': {
    generic: ['Something she has not found yet. Five emotions. Then: where is this from.'],
    person: { 9: 'Chloé tastes it like a secret address. "Where is this FROM?"' },
  },
  'arch_transfer.1': {
    generic: ['You sketch the food map, including the hidden spots. She stares like treasure.'],
    person: { 9: 'Chloé folds the map like a visa. Campus just got edible.' },
  },
  'arch_transfer.2': {
    generic: ['You ask about home. Twenty minutes. Food, people, the missing parts.'],
    person: { 9: 'Chloé talks Paris into the hour. You listen to all of it.' },
  },
  'stage_early.0': {
    generic: ['You tell her she looks good and set snacks out as you say it. She takes some.'],
    person: { 16: 'Sophia relaxes. The gym mention does not come back this afternoon.' },
  },
  'stage_early.1': {
    generic: ['You pivot to coursework she actually likes. The shirt-smoothing stops.'],
    person: { 7: 'Priya forgets the waistband the moment the problem is interesting.' },
  },
  'stage_early.2': {
    generic: ['Study-fuel snacks, scholarly tasting. She tries all of them. No gym later.'],
    person: { 1: 'Madeline reviews each snack like a source. The gym loses the hour.' },
  },
  'stage_mid.0': {
    generic: ['Abundant table, nothing fancy. She helps herself without apology.'],
    person: { 0: 'Brittany treats the spread like a meet she already entered.', 10: 'Reneé plates seconds like the session is a tasting she intends to finish.' },
  },
  'stage_mid.1': {
    generic: ['Direct check-in. "Good, actually." Short. Honest. She means it.'],
    person: { 8: 'Maya says good and looks at you like that was the whole file.' },
  },
  'stage_mid.2': {
    generic: ['A project at her pace. She settles into it like she already knows the shape.'],
    person: { 18: 'Talia treats the comfortable project like a clean spec.' },
  },
  'stage_heavy.0': {
    generic: ['Her preferences, her portion, her timing. She notices. "You remembered."'],
    person: { 15: 'Lilith accepts the arranged plate like tribute she expected.', 6: 'Tiffany reads the care as hospitality and stays seated for it.' },
  },
  'stage_heavy.1': {
    generic: ['Mentor ask. She agrees immediately and does it with zero fanfare.'],
    person: { 11: 'Kaylee mentors like care work. The other student eats better too.' },
  },
  'stage_heavy.2': {
    generic: ['Quiet: you noticed the growth. She says that actually means something.'],
    person: { 0: 'Brittany files the praise like a rank she intends to keep.' },
  },
  'class_snack_break.0': {
    generic: ['Basic box, four minutes, gone. The lecture comes back louder.'],
    person: { 14: 'Mary Jane treats the quick spread like a harvest sample.', 5: 'Destiny one-hands the box and does not pause the phone.' },
  },
  'class_snack_break.1': {
    generic: ['Premium box. They take their time. Class ends fifteen minutes late.'],
    person: { 9: 'Chloé calls the imported chocolate obscène and takes another.', 10: 'Reneé names three pastries before anyone else reaches.' },
  },
  'class_snack_break.2': {
    generic: ['Sensory evaluation, comic rigor. Everybody still eats a lot.'],
    person: { 1: 'Madeline writes tasting notes and then eats the evidence.', 12: 'Nadia rates each item like a subject and finishes the sample.' },
  },
  'class_group_project.0': {
    generic: ['Elaborate meal plans, taste-tested with supplies they already packed.'],
    person: { 6: 'Tiffany organizes the groups like a mixer with rubrics.' },
  },
  'class_group_project.1': {
    generic: ['Research samples. Primary research. They are still eating after the bell.'],
    person: { 10: 'Reneé treats the samples like a lab she already owns.' },
  },
  'class_group_project.2': {
    generic: ['Points for best proposal. Three full spreads appear. Everyone eats everything.'],
    person: { 0: 'Brittany competes. The class eats the scoreboard.' },
  },
  'class_birthday.0': {
    generic: ['One solid cake. Birthday first slice. Seconds for the rest.'],
    person: { 13: 'Daisy cuts like a kitchen. Nobody leaves a corner.' },
  },
  'class_birthday.1': {
    generic: ['Three cakes, tarts, macarons. Overwhelmed, grateful, empty platters.'],
    person: { 6: 'Tiffany hosts the wreckage like it was always the plan.' },
  },
  'class_birthday.2': {
    generic: ['Birthday week declared. Snacks every day. Embarrassed and delighted.'],
    person: { 2: 'Kylie already has the week-long angle. The class has the crumbs.' },
  },
  'class_slump.0': {
    generic: ['Coffee, tea, snack mountain. The class sits up. A few look ready to cry.'],
    person: { 5: 'Destiny takes the caffeine like a rez. The hoodie stays.' },
  },
  'class_slump.1': {
    generic: ['Stretch break. Energy returns. Several look happier about sitting back down.'],
    person: { 3: 'Serena moves, then sits like the rest was the real recovery.' },
  },
  'class_slump.2': {
    generic: ['Lights down, ambient, snacks in the half-dark. Contemplative chewing.'],
    person: { 8: 'Maya looks like this was the correct classroom all along.' },
  },
  'class_potluck.0': {
    generic: ['You try each dish and comment. Seconds happen under academic comparison.'],
    person: { 10: 'Reneé watches you taste like a judge she respects.', 14: 'Mary Jane beams when you praise the pie and cuts you more.' },
  },
  'class_potluck.1': {
    generic: ['A rubric appears. Stakes rise. Everyone eats more to evaluate properly.'],
    person: { 7: 'Priya fills the rubric and the plate with equal seriousness.' },
  },
  'class_potluck.2': {
    generic: ['Music on. Pretenses off. Ninety minutes. Best session of the semester.'],
    person: { 6: 'Tiffany declares it a function. The class agrees with their mouths.' },
  },
  'class_extended.0': {
    generic: ['Three orders, nominated favorites. Food arrives and vanishes mid-argument.'],
    person: { 5: 'Destiny nominates the usual. It disappears without pausing the talk.' },
  },
  'class_extended.1': {
    generic: ['Prepared spread from your bag. Someone says best class. The room agrees.'],
    person: { 13: 'Daisy looks like she would have packed the same bag.' },
  },
  'class_extended.2': {
    generic: ['Nobody fed, everybody taught. Stomachs register the omission out loud.'],
    person: { 16: 'Sophia lasts the longest and still looks betrayed by the clock.' },
  },
};

function suffixOf(key) {
  return key.replace(/^campusEvent\.choice\./, '');
}

const keys = _registryEntries()
  .map(([k]) => k)
  .filter((k) => k.startsWith('campusEvent.choice.') && !k.includes('._'));

const lines = [
  '// The Squad — Lead: A1 Mobile | Support: A5 Editor, A6 Slender',
  '// Auto-generated — run: node scripts/generateCampusChoiceUpgrade.mjs',
  "import { registerModuleVariants } from '../../engine.js';",
  '',
];

const seen = new Set();
let n = 0;
for (const key of keys) {
  const suf = suffixOf(key);
  const spec = LEAF[suf];
  if (!spec) {
    console.warn(`missing leaf spec: ${suf}`);
    continue;
  }
  const extras = [];
  for (const g of spec.generic || []) {
    if (seen.has(g)) continue;
    seen.add(g);
    extras.push({ when: {}, weight: 6, text: [g] });
  }
  const scene = suf.split('.')[0];
  const arch = scene.replace(/^arch_/, '');
  const sid = ARCH_SID[arch];
  if (sid != null && spec.person?.[sid]) {
    const t = spec.person[sid];
    if (!seen.has(t)) {
      seen.add(t);
      extras.push({ when: { studentId: sid }, weight: 8, text: [t] });
    }
  }
  for (const [id, t] of Object.entries(spec.person || {})) {
    if (Number(id) === sid) continue;
    if (seen.has(t)) continue;
    seen.add(t);
    extras.push({ when: { studentId: Number(id) }, weight: 8, text: [t] });
  }
  if (!extras.length) continue;
  const body = extras
    .map((e) => `  { when: ${JSON.stringify(e.when)}, weight: ${e.weight}, text: ${JSON.stringify(e.text)} }`)
    .join(',\n');
  lines.push(`registerModuleVariants(${JSON.stringify(key)}, [\n${body}\n]);`);
  n += 1;
}

writeFileSync(OUT, `${lines.join('\n')}\n`);
console.log(`generateCampusChoiceUpgrade: ${n} pools → ${OUT}`);
