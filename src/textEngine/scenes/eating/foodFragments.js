// The Squad — Lead: A1 Mobile | Support: A5 Editor
// Food-specific descriptor pools.
import { registerPool } from '../../engine.js';

registerPool('eat.foodDesc', [
  { when: {}, text: ['the meal', 'the spread', 'what is in front of her', 'what she ordered — and then some'] },
  { when: { mealContext: 'breakfast' }, text: ['pancakes and syrup', 'a breakfast that does not apologize for its portions', 'morning food generous enough to set the tone'] },
  { when: { mealContext: 'binge' }, text: ['an embarrassment of portions', 'more food than one person should have — and yet', 'quantities arranged like intention'] },
  { when: { mealContext: 'snack' }, text: ['something small that will not stay small', 'a snack that escalates', 'a modest serving with immodest follow-through'] },
  { when: { mealContext: 'campus_meal' }, text: ['cafeteria portions scaled for appetite', 'the dining hall\'s generous interpretation of a serving', 'tray food honest about its calories'] },
]);

registerPool('eat.aroma', [
  { when: {}, text: [
    '',
    'warm food smell curling off the plate',
    'grease and salt thick in the air',
    'something rich enough to sharpen appetite',
  ] },
  { when: { studentId: 10 }, weight: 3, text: ['butter and garlic threading the air', 'something rich enough to make the room smaller', 'warm fat and herbs announcing the meal'] },
  { when: { mealContext: 'binge' }, text: ['heat and salt and the promise of more', 'grease and sugar thick in the air', 'the smell of abundance before the first bite'] },
]);
