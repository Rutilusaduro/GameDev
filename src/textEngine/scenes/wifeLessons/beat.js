// The Squad — Lead: A5 Editor | Support: A2 Psych
// Wife Lessons — kitchen / growth / line skeleton keyed on recipe + leftover.
import { registerDimension, registerPool } from '../../engine.js';

registerDimension('lessonId', (ctx) => ctx.globals?.lessonId ?? '');

// Shape: FULL SENTENCE. Kitchen / recipe setup.
registerPool('wifeLessons.beat.kitchen', [
  { when: { lessonId: 'honey_butter' }, weight: 4, text: [
    'Yeasty heat, gingham, butter worked into flour. MJ says fat is what makes a home feel like home.',
    'Honey glaze dripping off fingers. Darlene and Wanda tear warm pieces straight from the pan.',
  ] },
  { when: { lessonId: 'cream_biscuits' }, weight: 4, text: [
    'Heavy cream, no fuss. MJ spoons generous mounds. Wanda reaches for a second before the first cools.',
    '"Let the richness do the work," she says. The biscuits melt. The kitchen agrees.',
  ] },
  { when: { lessonId: 'cinnamon_pull' }, weight: 4, text: [
    'Sticky pull-apart, hands not utensils. Cinnamon wraps the group like a second apron.',
    'Shiny fingers. Darlene keeps going back to the pan. MJ wanted that.',
  ] },
  { when: { lessonId: 'butter_cake' }, weight: 4, text: [
    'Dense pound cake, extra butter, extra cream. "The kind of cake that says you deserve to be taken care of."',
    'Patrice is here now. Three women, heavy slices, the quiet of full plates.',
  ] },
  { when: { lessonId: 'cream_rolls' }, weight: 4, text: [
    'Soft dough, velvet center. Cream escapes at the corners. Nobody wastes it.',
    '"It\'s all about that center," MJ says, piping, and then eating the demonstration.',
  ] },
  { when: { lessonId: 'pot_pie' }, weight: 4, text: [
    'Double crust, gravy thick as a blanket. Forks go quiet in the good way.',
    'Hearty portions. The lid shatters. Bellies take the news without comment.',
  ] },
  { when: { lessonId: 'peach_cobbler' }, weight: 4, text: [
    'Brown sugar, summer fruit, juice on a chin. Cheryl watches with growing interest.',
    'MJ spoons extra. The kitchen smells like home that intends to stay.',
  ] },
  { when: { lessonId: 'bread_pudding' }, weight: 4, text: [
    'Leftover bread, cream-soaked, nothing wasted. Chloe\'s appetite is starting to show.',
    '"Everything made better with care," MJ says. Custard sets in the dish and in them.',
  ] },
  { when: { lessonId: 'french_toast' }, weight: 4, text: [
    'Stuffed centers, syrup on a wrist. She licks the wrist. Daughters keep going.',
    '"The sweet side of a full belly," MJ smiles, and the stack loses to hunger.',
  ] },
  { when: { lessonId: 'cream_pie' }, weight: 4, text: [
    'Silky wedges, forks slower because they can. MJ cuts the next one wider.',
    'Cool filling, warm kitchen. Deepening satisfaction around the table.',
  ] },
  { when: { lessonId: 'lasagna' }, weight: 4, text: [
    'Layers of cheese, layers of care. Second helpings arrive before first plates cool.',
    'Savory steam. MJ portions hearty and means another inch on everyone present.',
  ] },
  { when: { lessonId: 'shortcake' }, weight: 4, text: [
    'Tall stacks, cream spills, daughters racing height and losing to mouths.',
    '"Celebrate the sweetness you\'ve earned." The wreckage gets eaten anyway.',
  ] },
  { when: { lessonId: 'chicken_pot' }, weight: 4, text: [
    'Casserole for someone who needs feeding. Tonight that is everyone.',
    'Golden crust, creamy filling. Visibly larger daughters savor without hurry.',
  ] },
  { when: { lessonId: 'mac_cheese' }, weight: 4, text: [
    'Four cheeses, one outcome. Spoons keep a rhythm the clock cannot argue with.',
    'MJ nods at the focused eating like a hymn hitting the right verse.',
  ] },
  { when: { lessonId: 'choc_cake' }, weight: 4, text: [
    'Three layers, fudge clinging to a lip. She wipes it with her thumb, then eats the thumb.',
    '"The most loving kind of excess." Plates scraped. Daughters unhesitating.',
  ] },
  { when: { lessonId: 'feast_spread' }, weight: 4, text: [
    'Every prior recipe on one table. Enormous daughters arrive. The table learns new hips.',
    'MJ steps back so the spread can teach. Hands cross. Bites do not stall.',
  ] },
  { when: { lessonId: 'daughters_bake' }, weight: 4, text: [
    'Daughters take the counters. Moms take the chairs. Both take extra.',
    'MJ offers one correction and a plate. The plate wins.',
  ] },
  { when: { lessonId: 'old_recipe' }, weight: 4, text: [
    'Grandmother\'s card, flour-soft. "Never shared outside the family." The family just got larger in the middle.',
    'Reverent bites, then seconds. Legacy is a serving spoon.',
  ] },
  { when: { lessonId: 'daughters_run' }, weight: 4, text: [
    'Enormous daughters fill plates for the women who used to fill theirs.',
    'MJ guides from a chair that reports her. Care flows both ways in seconds.',
  ] },
  { when: { lessonId: 'overnight_feast' }, weight: 4, text: [
    'Evening stretches. Portions do too. Nobody names a bedtime.',
    'They eat past full. MJ watches the philosophy sit down in their laps.',
  ] },
  { when: { lessonId: 'recipe_book' }, weight: 4, text: [
    'Handwritten pages, flour on the margins. Copying is a ritual with crumbs.',
    'The books close heavier. So do the daughters.',
  ] },
  { when: { lessonId: 'final_spread' }, weight: 4, text: [
    'Every favorite dish. They eat like remembering. MJ does not rush because there is no last course.',
    'The kitchen is the whole path laid out in steam and serving spoons.',
  ] },
  { when: { lessonId: 'handoff' }, weight: 4, text: [
    'Daughters cook for mothers now. The circle turns. Nobody is smaller for it.',
    'MJ\'s hands rest. Her middle does the speaking. Tradition continues as plates continue.',
  ] },
  { when: { lessonId: 'legacy_recipe' }, weight: 4, text: [
    'The private dish, finally public. It tastes like the future they already wear.',
    'Reverent bites, then ordinary hunger, which is the real inheritance.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Galley leftover still working in Mary Jane. She treats the recipe like a second rise.',
    'Last night\'s tray plus this lesson. The kitchen smells like both.',
  ] },
  { when: {}, text: [
    'Gingham, warm kitchen, basket already raided. The lesson started before anyone sat.',
    'MJ keeps the stove as the syllabus. Softness is the homework.',
    'Butter on the island. Appetite on the clock. Both are running long.',
  ] },
]);

// Shape: FULL SENTENCE. Growth-as-event.
registerPool('wifeLessons.beat.growth', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Last night\'s tray is still in her. The next recipe lands easier. Middles do the rest.',
    'Kitchen leftover plus lesson butter. The chair reports it first.',
  ] },
  { when: { stageMin: 6 }, weight: 2, text: [
    'Daughters take leftover heat home in their clothes. Mary Jane keeps the rest in her middle.',
    'The table is wreckage. Softness is what leaves with them.',
  ] },
  { when: { stageMax: 4 }, weight: 2, text: [
    'Clothes still argue. The body is already answering. Shared bites do the convincing.',
    'She notices the give under an apron string and does not retie it tighter.',
  ] },
  { when: {}, text: [
    'Growth happens in the seconds. She finishes what the recipe put in front of her.',
    'The work leaves her heavier than it found her. The recipe required it.',
    'She keeps a hand on the new weight like a tool she intends to use again.',
  ] },
]);

// Shape: DIALOGUE BEAT.
registerPool('wifeLessons.beat.line', [
  { when: { leftoverFed: true }, weight: 3, text: [
    '"Still hungry," Wanda says, which MJ files as correct.',
    'MJ tastes the sauce again. "The leftover made this kinder," she says, and means the middles.',
  ] },
  { when: {}, text: [
    '"Soft means the house has a center," she says, and refills before anyone admits they wanted it.',
    'Wanda is eating bread before the lesson starts. "I\'m hungry," she says, and names the lesson by chewing.',
    'Wine down to the dregs. Appetite still on the syllabus.',
  ] },
]);

registerPool('wifeLessons.beat.scene', [
  { when: {}, text: [
    '{wifeLessons.beat.kitchen} {wifeLessons.beat.growth} {wifeLessons.beat.line}',
    '{wifeLessons.beat.kitchen} {wifeLessons.beat.line} {wifeLessons.beat.growth}',
    '{wifeLessons.beat.growth} {wifeLessons.beat.kitchen} {wifeLessons.beat.line}',
  ] },
]);
