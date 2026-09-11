// Wife Lessons — supplemental linger beats per recipe (lint variety floor).
// The Squad — Lead: A5 Editor | Support: A2 Psych
import { registerModuleVariants } from '../../engine.js';
import { WL_LESSONS } from '../../../gameData/evolvedForms.js';

const LESSON_LINGER = {
  honey_butter: [
    'Glaze cools on her fingers. She licks it off like the recipe requires it.',
    'The rolls are gone. Softness is not. Darlene takes one more and does not make the door.',
    'Mary Jane butters the last heel and eats it standing, apron tight across the new of her.',
  ],
  cream_biscuits: [
    'Heavy cream did the work. The moms do the rest with second helpings.',
    'Wanda reaches again without asking. MJ nods like that was the instruction.',
    'Biscuits melt. Middles do not. The sheet pan comes back empty.',
  ],
  cinnamon_pull: [
    'Sticky fingers, shared pan. Nobody pretends utensils were invited.',
    'Cinnamon hangs in the gingham. So does the quiet of people who kept going.',
    'Darlene pulls another piece because the loaf is still warm and so is she.',
  ],
  butter_cake: [
    'The crumb is dense enough to count as care. Plates come back scraped.',
    'Patrice takes a second slice and stops apologizing halfway through it.',
    'MJ cuts thicker than the knife wants. The knife loses.',
  ],
  cream_rolls: [
    'Filling escapes at the corners. Nobody wastes it. Tongues finish the lesson.',
    'Soft dough, velvet center. The kitchen sounds like swallowing.',
    'MJ pipes extra into the last roll and eats that one herself, unhurried.',
  ],
  pot_pie: [
    'Gravy thickens as it cools. So do the women. Forks keep working.',
    'The crust shatters. Bellies take the news without comment.',
    'MJ serves the corner piece, extra lid and all, and watches it vanish.',
  ],
  peach_cobbler: [
    'Juice glistens on the spoon and then on a chin. Summer stays in the room.',
    'Cheryl pretends she is only tasting. The bowl disagrees.',
    'Brown sugar clings. Daughters lick spoons like it is homework.',
  ],
  bread_pudding: [
    'Leftover bread, cream-soaked, nothing wasted. Appetite keeps the scrap.',
    'Custard sets in the dish and in them. Chloe goes back for the corner.',
    'MJ calls it thrift. The seconds call it policy.',
  ],
  french_toast: [
    'Syrup finds the plate rim and then a wrist. She licks the wrist.',
    'Stuffed centers collapse. Middles do the opposite.',
    'The stack was meant for sharing. Sharing lost to hunger by the third slice.',
  ],
  cream_pie: [
    'Forks slow because they can. Nobody is racing the filling.',
    'The wedge looks polite until it is gone. MJ cuts the next one wider.',
    'Silky on the tongue. Heavy in the lap. Both are the point.',
  ],
  lasagna: [
    'Cheese pulls. Layers surrender. Second helpings arrive before first plates cool.',
    'Savory steam fogs the window. Appetite fogs the conversation.',
    'MJ portions "hearty" and means another inch on everyone present.',
  ],
  shortcake: [
    'Cream spills. Daughters race height and lose to mouths.',
    'Berries stain a wrist. MJ does not hand over a napkin first.',
    'The tallest stack falls. Nobody mourns. They eat the wreckage.',
  ],
  chicken_pot: [
    'Casserole bubbles under gold. The room goes quiet in the good way.',
    'A dish you bring to someone who needs feeding. Tonight that is everyone.',
    'MJ scrapes the last of the cream sauce onto a plate that was already full.',
  ],
  mac_cheese: [
    'Velvet sauce, no talking. Spoons keep a rhythm the clock cannot argue with.',
    'Four cheeses, one outcome. Everyone leaves the table rounder than they sat.',
    'MJ nods at the focused eating like a hymn hitting the right verse.',
  ],
  choc_cake: [
    'Fudge clings to the fork and then to a lip. She wipes it with her thumb, then eats the thumb.',
    'Three layers. Thick frosting. Daughters stop pretending they have a stopping place.',
    'The chocolate aroma stays after the plates are clean. So does the weight.',
  ],
  feast_spread: [
    'Every prior recipe on one table. The daughters arrive and the table has to learn new hips.',
    'Hands cross. Stories stall. Bites do not.',
    'MJ steps back so the spread can do the teaching. It does.',
  ],
  daughters_bake: [
    'Daughters take the counters. Moms take the chairs. Both take extra.',
    'MJ offers one correction and a plate. The plate wins.',
    'The next generation moves like they own the butter. They do.',
  ],
  old_recipe: [
    'Grandmother\'s card, flour-soft at the crease. The bite tastes like being kept.',
    'She says it has never left the family. The family just got larger in the middle.',
    'Appreciative silence. Then seconds. Legacy is a serving spoon.',
  ],
  daughters_run: [
    'Enormous daughters fill plates for the women who used to fill theirs.',
    'MJ guides from a chair that reports her. The kitchen runs without her hands.',
    'Care flows both ways and both ways involve seconds.',
  ],
  overnight_feast: [
    'Evening stretches. Portions do too. Nobody names a bedtime.',
    'Satisfied sounds, unhurried. MJ watches the philosophy sit down in their laps.',
    'They eat past full and treat the past as a suggestion.',
  ],
  recipe_book: [
    'Handwritten pages, flour on the margins. Copying is a ritual with crumbs.',
    'Daughters write slowly so the butter has time to happen to them.',
    'The books close heavier. So do the daughters.',
  ],
  final_spread: [
    'Every favorite dish, no restraint left to perform. They eat like remembering.',
    'The kitchen is the whole path laid out in steam and serving spoons.',
    'Slow, deep, finished. MJ does not rush the last course because there is no last.',
  ],
  handoff: [
    'Daughters cook for mothers now. The circle turns and nobody is smaller for it.',
    'MJ\'s hands rest. Her middle does the speaking.',
    'Tradition continues as plates continue. The whole sermon is seconds.',
  ],
  legacy_recipe: [
    'The private dish, finally public. It tastes like the future they already wear.',
    'Reverent bites. Then ordinary hunger, which is the real inheritance.',
    'MJ watches them take it into themselves and does not call it metaphor.',
  ],
};

const FALLBACK = [
  'The kitchen keeps the heat after the pans come off. So do they.',
  'Plates empty. Middles do not. Mary Jane wipes a counter and leaves the extra where a hand will find it.',
  'She tastes the sauce again after they leave, as if grading her own middle.',
];

for (const [stage, lessons] of Object.entries(WL_LESSONS)) {
  if (!Array.isArray(lessons)) continue;
  for (const lesson of lessons) {
    if (!lesson?.id) continue;
    registerModuleVariants(`wifeLessons.lesson.s${stage}.${lesson.id}`, [
      { when: {}, text: LESSON_LINGER[lesson.id] || FALLBACK },
    ]);
  }
}
