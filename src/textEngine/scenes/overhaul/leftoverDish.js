// The Squad — Lead: A5 Editor | Support: A1 Mobile
// Last-wins overwrite of leftover dinner.dish.* catalog strings.
import { registerPool } from '../../engine.js';
import { DINNER_VENUES, PRIVATE_FOODS } from '../../../gameData/sessions.js';

const GENERIC = [
  'It arrives heavy and warm. {subject.name} starts before the steam settles.',
  'A serious portion. She treats it like the point of the table.',
  'The plate finds her first. Soft heat. Appetite wearing a dining face.',
];

const OPENER = [
  'A generous start. Appetite wakes up and stays.',
  'Opening notes, rich enough to promise the rest of the evening.',
  'She begins like the first plate was already a decision.',
];

const MAIN = [
  'Portions meant to be taken seriously. She does.',
  'Substantial and slow. The kind of main that sits heavy and welcome.',
  'A main course with architecture. She makes room.',
];

const MORE = [
  'Another round. Warmth and weight keep building.',
  'More arrives. She accepts like it was always the plan.',
  'The table is not done. Neither is she.',
];

const DESSERT = [
  'The finish asks for patience and rewards it.',
  'Sweet density. Indulgence without a speech.',
  'Dessert lands. She gives it the same attention as the main.',
];

const EXTRA = [
  'Late generosity. No explanation required.',
  'A small extra that feels enormous after everything else.',
  'She has stopped asking why more food exists. She eats it.',
];

const DISH = {
  soup_bread: [
    'Potato soup thick enough to stand a spoon. Bread to match.',
    'A board of bread, a bowl of heat. She uses both.',
    'Soup first. Bread after. The bistro assumes hunger.',
  ],
  pasta: [
    'Carbonara in a portion that does not pretend to be dainty.',
    'Rich sauce, a drift of parmesan, a bowl she will empty.',
    'Pasta arriving like a dare. She already accepted.',
  ],
  salad_big: [
    'Called a salad. Mostly cheese. She does not complain.',
    'Greens as garnish. The rest is the point.',
    'House salad with a sense of humor. She eats the joke.',
  ],
  bruschetta: [
    'Antipasto crowding the board. Bread disappearing first.',
    'Cured meat, oil, toast. She grazes like a first course is a meal.',
    'The board is a landscape. She tours it.',
  ],
  risotto: [
    'An enormous bowl of truffle risotto. Extremely rich. She works through it.',
    'Risotto that sits. She lets it.',
    'Cream, rice, luxury. The spoon keeps traveling.',
  ],
  lasagne: [
    'Three layers. A complete structure of food. She takes it apart.',
    'House lasagne with weight. She is equal to it.',
    'Pasta, sauce, cheese, again. Architecture she can finish.',
  ],
  tiramisu: [
    'A full portion. She does not need encouragement.',
    'Coffee, cream, cocoa. She treats dessert like a second sitting.',
    'Tiramisu arriving as if sharing were never on the table.',
  ],
  shrimp_cocktail: [
    'A tower of shrimp. She starts at the top.',
    'Cocktail sauce, cold sweet meat, a stack that keeps going.',
    'Shrimp piled like a dare. She is not intimidated.',
  ],
  ribeye: [
    'An eighteen-ounce steak with three sides by default.',
    'The ribeye is architecture. She cuts it like she has time.',
    'Steak and sides enough for a table. She is the table.',
  ],
  loaded_potato: [
    'A potato in name only. Toppings have won.',
    'Loaded, overflowing, still called a side. She knows better.',
    'Butter, cheese, sour cream. The potato is a vehicle.',
  ],
  cheesecake: [
    'A full New York slice. Enormous. Rich. Hers.',
    'Cheesecake that does not share. She does not offer.',
    'Dense cream, a graham base, a fork that will work.',
  ],
  amuse: [
    'Five tiny courses that add up to a meal before the meal.',
    'Amuse-bouche with ambitions. She lets them accumulate.',
    'Small plates, large total. The chef is already winning.',
  ],
  foie_gras: [
    'Rich, indulgent, a full portion because the chef insisted.',
    'Foie gras without apology. She matches it.',
    'Luxury on toast. She treats luxury as edible.',
  ],
  duck_confit: [
    'Crispy skin, rich meat, an enormous plate.',
    'Duck cooked until it gives. She gives it her attention.',
    'Confit in a portion that does not whisper.',
  ],
  soufle: [
    'Chocolate souffle for one chair. Sharing was never on the ticket.',
    'A risen dessert with a no-sharing policy. She honors it.',
    'Souffle for one. She is the one.',
  ],
  cheese: [
    'Seven cheeses. Mandatory. She does not skip a number.',
    'A cheese course treated as a course, not a garnish.',
    'The board keeps coming. She keeps pace.',
  ],
  sashimi: [
    'Course one. Many pieces. She keeps her chopsticks busy.',
    'Sashimi selection with no interest in restraint.',
    'Clean, cold, plentiful. The chef has already decided.',
  ],
  wagyu: [
    'The richest beef they plate. Multiple pieces. She takes them.',
    'A5 arriving in a count that is not decorative.',
    'Wagyu melting. She does not rush the melt. She does finish it.',
  ],
  ramen: [
    'Truffle ramen, signature broth, a bowl with gravity.',
    'Noodles in a richness that sits. She sits with it.',
    'The broth is the event. She drinks the event.',
  ],
  mochi: [
    'Five pieces. She will eat all of them.',
    'Mochi and matcha. Dessert as a small stack of yeses.',
    'Soft, sweet, counted. The count goes to zero.',
  ],
  tasting_menu: [
    'Seven courses. Non-negotiable. She did not come to negotiate.',
    'A tasting that is a feeding. She keeps her place setting.',
    'Course after course. The club calls it generous. She calls it dinner.',
  ],
  wagyu_private: [
    'Different wagyu. More of it. Member rules.',
    'Private reserve beef. The portion is the membership perk.',
    'Richer cut, larger count. She treats both as owed.',
  ],
  truffle_pasta: [
    'Buried in truffle. Buried in parmesan. She digs.',
    'Black truffle pasta with no visible bottom.',
    'Pasta under luxury. She finds all of it.',
  ],
  mille_feuille: [
    'The pastry alone counts as a meal. She still finishes it.',
    'Layers of cream and flake. A dessert with architecture.',
    'Mille-feuille arriving like a second main. She allows it.',
  ],
  personal_menu: [
    'Designed around her. The result is enormous. She expected that.',
    'A personal menu that read her appetite correctly.',
    'The chef cooked for her specifically. Excess was the brief.',
  ],
  wagyu_special: [
    'Four cuts. Each enormous. A tasting that is a feast.',
    'Wagyu in a flight. She does not skip a cut.',
    'Four plates of beef. She is equal to the flight.',
  ],
  dessert_cart: [
    'Every dessert. All of them. The cart does not do selections.',
    'The dessert cart stops at her. It does not leave lighter.',
    'All the sweets. She treats the cart like a course list.',
  ],
  home_app: [
    'A full spread before the main even starts.',
    'Home appetizers with no restaurant manners.',
    'The coffee table is already a buffet. She starts.',
  ],
  home_main: [
    'Whatever she loves most, in a quantity that does not blink.',
    'The main at your place. No limit on how much you made.',
    'Her favorite, plated like you meant it. She meant it too.',
  ],
  home_second: [
    'Second helpings she cannot refuse. She does not try hard.',
    'The offer. The refill. The look that says of course.',
    'More of the main. She holds out the plate like a yes.',
  ],
  home_dessert: [
    'Dessert, then more dessert, then more dessert.',
    'Sweet courses at home have no last call.',
    'She is still here. The desserts keep finding her.',
  ],
  midnight: [
    'She is still here. You keep feeding her.',
    'Late snacks with the lights low. Appetite did not clock out.',
    'Midnight plate. She treats it as continuation, not extra.',
  ],
  eggs_bene: [
    'Eggs Benedict stacked three high. Hollandaise in quantity.',
    'Brunch architecture. She takes the stack personally.',
    'Poached eggs, sauce, a portion written per person and then ignored.',
  ],
  french_toast: [
    'Seven thick slices, caramelized fruit, cream. A monument.',
    'French toast as a tower. She works from the top.',
    'Brunch sweetness in layers. She does not skip a layer.',
  ],
  brunch_board: [
    'Charcuterie, bread, cheese, honeycomb. Sharing is theoretical.',
    'A board that will not be shared. She already decided.',
    'Brunch grazing that becomes a sitting.',
  ],
  waffle_stack: [
    'Four waffles, everything sweet, aggressively indulgent.',
    'A waffle stack with no interest in portion control.',
    'Syrup, cream, fruit, height. She meets the height.',
  ],
  atelier_welcome: [
    'An entire table of small luxuries waiting when she settles.',
    'Welcome spread arranged to her. She starts without standing.',
    'Small plates, large welcome. The chef came to her.',
  ],
  atelier_main: [
    'Custom main designed around her. It is always enormous.',
    'The chef read her correctly. The plate is a landscape.',
    'A main that assumes her size. She fills the assumption.',
  ],
  atelier_cheese: [
    'The cart comes to her. She waves the menu away and takes from all of them.',
    'Artisan cheeses, no choosing. She samples by finishing.',
    'Cheese cart at her seat. Selection means everything.',
  ],
  atelier_dessert: [
    'Six desserts. Not a selection. All six. The chef insists.',
    'Dessert tasting that is a tasting of all of them.',
    'Six sweets. She treats insistence as permission.',
  ],
  atelier_nightcap: [
    'She has not moved. More food arrives. The suite was built for this.',
    'Late indulgence without a walk. The suite brings it to her.',
    'Nightcap food. She is still seated. The kitchen is still working.',
  ],
};

function textsFor(dish) {
  if (DISH[dish.id]) return DISH[dish.id];
  if (dish.course === 'opener') return OPENER;
  if (dish.course === 'main') return MAIN;
  if (dish.course === 'more') return MORE;
  if (dish.course === 'dessert') return DESSERT;
  if (dish.course === 'extra') return EXTRA;
  return GENERIC;
}

export function applyDishOverhaul() {
  const seen = new Set();
  const register = (dish) => {
    if (!dish?.id || seen.has(dish.id)) return;
    seen.add(dish.id);
    registerPool(`dinner.dish.${dish.id}`, [
      { when: {}, text: textsFor(dish) },
    ]);
  };
  for (const venue of DINNER_VENUES) {
    for (const dish of venue.dishes || []) register(dish);
  }
  for (const food of PRIVATE_FOODS) register(food);
}
