// The Squad — Lead: A2 Psych | Support: A5 Editor
// Floor check-in scene intros — pass 2 (hall + mood variety).
import { registerModuleVariants } from '../../engine.js';

const sceneLines = {
  hall_snack_break: [
    'Mid-meeting hush breaks when you lift the lid — sugar air, rustling bags, the hall leaning in.',
    'You call pause without apology; snacks appear like a treaty everyone signs with their mouths.',
    'The floor does not need a reason — only plates, only permission, only the next bite.',
  ],
  hall_group_project: [
    'Hypothetical menus become real tastings; the assignment dissolves into crumbs and comparisons.',
    'Groups argue flavor while building portions — academia as cover, appetite as method.',
    'The challenge is supposed to be intellectual; the table tells a hungrier truth.',
  ],
  hall_birthday: [
    'Birthday energy hums — candles, laughter, the social obligation of cake honored thoroughly.',
    'Someone blushes; everyone sings; frosting becomes communal property within minutes.',
    'Celebration is an excuse; abundance is the actual gift.',
  ],
  hall_slump: [
    'Three PM drags eyelids down; the lounge sags until caffeine and sugar arrive like rescue.',
    'Energy crash owns the room — heads nod, stomachs growl, someone snores politely.',
    'The slump is visible; the fix is obvious; you bring both heat and calories.',
  ],
  hall_potluck: [
    'Containers line every surface; the hall smells like ten kitchens colluded.',
    'Potluck seriousness exceeds the announcement — tasting becomes competition becomes seconds.',
    'Nobody pretends this is only community building; it is also a feast.',
  ],
  hall_extended: [
    'Time stretches because engagement does; hunger arrives late but with authority.',
    'Nobody checks clocks; bodies start asking for fuel while minds still argue ideas.',
    'The session runs long — minds sharp, stomachs louder, delivery inevitable.',
  ],
  mood_focused: [
    '{subject.first} barely looks up — flow state strong, appetite waiting in the background like taboo.',
    'Immaculate notes, rigid posture, hunger deferred until someone places food within reach.',
  ],
  mood_excited: [
    'She vibrates in her seat — energy looking for outlet, mouth already busy between words.',
    'Enthusiasm spills; she answers before you ask; snacks would channel the storm.',
  ],
  mood_tired: [
    'Exhaustion softens her edges; chin dips; warmth and sugar would feel like mercy.',
    'She is present in name only — body asking for rest and something dense to chew.',
  ],
  mood_nervous: [
    'Fidgeting telegraphs anxiety; food as comfort is an open secret between you.',
    'She picks at her sleeve; the room feels too loud until something warm is offered.',
  ],
};

Object.entries(sceneLines).forEach(([id, lines]) => {
  registerModuleVariants(`campusEvent.scene.${id}`, [{ when: {}, text: lines }]);
});
