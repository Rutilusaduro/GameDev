// Food-specific descriptor pools.
import { registerPool } from '../../engine.js';

registerPool('eat.foodDesc', [
  { when: {}, text: ['the meal', 'the spread', 'what is in front of her'] },
  { when: { mealContext: 'breakfast' }, text: ['pancakes and syrup', 'a breakfast that does not apologize for its portions'] },
  { when: { mealContext: 'binge' }, text: ['an embarrassment of portions', 'more food than one person should have — and yet'] },
  { when: { mealContext: 'snack' }, text: ['something small that will not stay small', 'a snack that escalates'] },
  { when: { mealContext: 'campus_meal' }, text: ['cafeteria portions scaled for appetite', 'the dining hall\'s generous interpretation of a serving'] },
]);

registerPool('eat.aroma', [
  { when: {}, text: ['', ''] },
  { when: { studentId: 10 }, weight: 3, text: ['butter and garlic threading the air', 'something rich enough to make the room smaller'] },
  { when: { mealContext: 'binge' }, text: ['heat and salt and the promise of more'] },
]);
