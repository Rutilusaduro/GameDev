// Unique extras for dinner.dish.* catalog lines. Existing keys only.
// Run: node scripts/generateDinnerDishUpgrade.mjs
import { writeFileSync } from 'node:fs';
import '../src/textEngine/scenes/dinner/dishDesc.js';
import { _registryEntries } from '../src/textEngine/engine.js';

const OUT = 'src/textEngine/scenes/dinner/dishUpgrade.js';

const GIRL = {
  0: [
    'Brittany treats the plate like a meet she intends to finish.',
    'Captain energy: she clears it and looks for the next heat.',
  ],
  1: [
    'Madeline annotates the richness, then eats the evidence.',
    'She calls it research. The fork does not wait for the abstract.',
  ],
  2: [
    'Kylie angles the plate for a story, then forgets the camera.',
    'She films one bite. The rest is off the record.',
  ],
  3: [
    'Serena eats it like a new event with no weight class.',
    'She finishes and sounds like weather: fine, fed, moving on.',
  ],
  4: [
    'Fiona studies the form of it, then cooperates with her mouth.',
    'The plate becomes another piece in the appetite series.',
  ],
  5: [
    'Destiny calls it a buff and starts the sit-down immediately.',
    'She queues it like a load-in. The chair approves.',
  ],
  6: [
    'Tiffany hosts the plate the way she hosts a room.',
    'Chapter hospitality starts with her own fork.',
  ],
  7: [
    'Priya files it under optional. The file is lying.',
    'Gold-star girl, gold-star portion. She still wants the extra.',
  ],
  8: [
    'Maya does not narrate it. She just eats.',
    'Quiet plate, quiet girl, no leftover argument.',
  ],
  9: [
    'Chloé tastes home in it and stays in English on purpose.',
    'She names the richness once, then proves it.',
  ],
  10: [
    'Reneé logs the richness like yield, then finishes the log.',
    'Clinical first bite. Second bite forgets the notebook.',
  ],
  14: [
    'Mary Jane talks butter and harvest in the same breath, then proves both.',
    'She treats the plate like a kitchen she already owns.',
  ],
  15: [
    'Lilith looks at it the way she looks at prey: patient, sure.',
    'She eats it without decoration. The plate empties.',
  ],
};

const GENERIC = [
  '{subject.name} takes the {dish} personally.',
  'The {dish} does not last long in front of {subject.name}.',
  '{subject.name} works through the {dish} with visible pleasure.',
  'She treats the {dish} like permission she already granted herself.',
];

const DISH_NAME = {
  soup_bread: 'soup and bread',
  pasta: 'carbonara',
  salad_big: 'house salad',
  bruschetta: 'antipasto',
  risotto: 'risotto',
  lasagne: 'lasagne',
  tiramisu: 'tiramisu',
  shrimp_cocktail: 'shrimp tower',
  ribeye: 'ribeye',
  loaded_potato: 'loaded potato',
  cheesecake: 'cheesecake',
  amuse: 'amuse-bouche',
  foie_gras: 'foie gras',
  duck_confit: 'duck confit',
  soufle: 'soufflé',
  cheese: 'cheese course',
  sashimi: 'sashimi',
  wagyu: 'wagyu',
  ramen: 'ramen',
  mochi: 'mochi',
  tasting_menu: 'tasting menu',
  wagyu_private: 'private wagyu',
  pr_board: 'charcuterie',
  pr_soup: 'cream soup',
  pr_bruschetta: 'bruschetta',
  pr_pasta: 'four-cheese pasta',
  pr_risotto: 'truffle risotto',
  pr_roast: 'roast',
  pr_burger: 'double stack',
  pr_more_pasta: 'second serving',
  pr_bread: 'bread basket',
  pr_sides: 'extra sides',
  pr_cake: 'whole cake',
  pr_icecream: 'sundae',
  pr_brownie: 'brownie',
  pr_mille: 'mille-feuille',
  pr_snack_tray: 'late-night tray',
  pr_wine_cheese: 'wine and cheese',
  pr_chocolates: 'chocolates',
  truffle_pasta: 'truffle pasta',
  mille_feuille: 'mille-feuille',
  personal_menu: 'personal menu',
  wagyu_special: 'wagyu tasting',
  dessert_cart: 'dessert cart',
  home_app: 'home appetizers',
  home_main: 'home main',
  home_second: 'second helpings',
  home_dessert: 'home dessert',
  midnight: 'late snacks',
  eggs_bene: 'eggs benedict',
  french_toast: 'french toast',
  brunch_board: 'brunch board',
  waffle_stack: 'waffle stack',
  atelier_welcome: 'welcome spread',
  atelier_main: 'custom main',
  atelier_cheese: 'cheese cart',
  atelier_dessert: 'dessert tasting',
  atelier_nightcap: 'late indulgence',
};

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 33 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick(arr, key, n) {
  return arr[(hash(key) + n * 13) % arr.length];
}

function dishId(key) {
  return key.slice('dinner.dish.'.length);
}

function label(id) {
  return DISH_NAME[id] || id.replace(/_/g, ' ');
}

const keys = _registryEntries()
  .map(([k]) => k)
  .filter((k) => k.startsWith('dinner.dish.') && !k.includes('._'));

const lines = [
  '// The Squad — Lead: A1 Mobile | Support: A5 Editor',
  '// Auto-generated — run: node scripts/generateDinnerDishUpgrade.mjs',
  "import { registerModuleVariants } from '../../engine.js';",
  '',
];

let n = 0;
for (const key of keys) {
  const id = dishId(key);
  const name = label(id);
  const variants = [];
  for (const [sid, bank] of Object.entries(GIRL)) {
    const t = pick(bank, key, Number(sid));
    variants.push(`  { when: { studentId: ${sid} }, weight: 5, text: [${JSON.stringify(t)}] }`);
  }
  const g1 = pick(GENERIC, key, 0).replaceAll('{dish}', name);
  const g2 = pick(GENERIC, key, 1).replaceAll('{dish}', name);
  variants.push(`  { when: { corruption: [2] }, weight: 3, text: [${JSON.stringify(`${g1} She does not hide the pleasure.`)}] }`);
  variants.push(`  { when: {}, weight: 3, text: ${JSON.stringify([g1, g2])} }`);
  lines.push(`registerModuleVariants(${JSON.stringify(key)}, [\n${variants.join(',\n')}\n]);`);
  n += 1;
}

writeFileSync(OUT, `${lines.join('\n')}\n`);
console.log(`generateDinnerDishUpgrade: ${n} pools → ${OUT}`);
