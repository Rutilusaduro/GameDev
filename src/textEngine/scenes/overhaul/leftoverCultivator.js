// The Squad — Lead: A5 Editor | Support: A2 Psych
// Last-wins overwrite of leftover cultivator intro/choice/eating/tester look.
import { registerPool, registerDimension, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { RECIPES } from '../../../gameData/cultivator.js';

registerDimension('testerStage', (ctx) => Number(ctx.globals?.testerStage ?? 0));

registerPool('cultivator.choice.setup', [
  { when: {}, text: [
    'The kitchen is already committed. {subject.name} waits for the plate like it is a schedule.',
    'Heat, sugar, a decision she will swallow. {subject.name} does not stall.',
    'You pick the density. She picks the swallow. The session writes itself.',
  ]},
]);

registerPool('cultivator.choice.body', [
  { when: {}, text: [
    'She eats as if the recipe were hospitality. Soft heat. Extra arriving on the clock.',
    'The swallow travels. She breathes around it, pleased with the work.',
    'Appetite cooperating. Suspicion optional. The bowl does not come back.',
  ]},
]);

const INTRO = {
  milkshake: [
    '{subject.name} comes in. The blender is already humming. You still choose what goes in it.',
    'Ice, cream, a motor working. {subject.name} hangs her bag and waits for a glass.',
    'The tasting starts at the blender. {subject.name} is already hungry enough to be useful.',
  ],
  cookies: [
    '{subject.name} arrives. The oven is still warm. You still choose before the plate goes down.',
    'Butter in the air. {subject.name} takes a stool like this is her shift.',
    'Cookies cooling. Decisions left. {subject.name} looks at the tray and does not hide it.',
  ],
  cake: [
    '{subject.name} is here. The cake is cooling. Four choices sit between now and when she leaves.',
    'A cooled cake, a knife, {subject.name} already measuring the slice with her eyes.',
    'Batter done. Frosting waiting. {subject.name} treats the kitchen like a lab she likes.',
  ],
};

const CHOICE = {
  std_base: [
    'Whole milk, three scoops, a glass she will finish without comment.',
    'Standard blend. She drinks it like a job she already likes.',
    'Measured, creamy, defensible. She thanks you and empties it.',
  ],
  cream_base: [
    'Cream instead of milk. Same glass. Twice the density. She names the taste, then finishes.',
    'Richer recipe. She comments once. The glass still goes empty.',
    'Heavy cream doing the quiet work. She drinks like it was always the method.',
  ],
  malt_base: [
    'Double malt, extra scoop, a syrup she cannot name. She drinks all of it.',
    'Old-school sweetness. She does not identify it. She does finish it.',
    'Malt and extra. The glass is a project. She completes it.',
  ],
  one_glass: [
    'One glass. Professional. She finishes and thanks you.',
    'A normal portion. She treats it like the whole assignment.',
    'Measured pour. Empty glass. A clean tasting note.',
  ],
  large_cup: [
    '"I made a fresh batch." Twice the glass. She accepts without a second thought.',
    'A larger cup framed as extras. She drinks it like courtesy.',
    'Had extra, you said. She believed you. The cup is gone.',
  ],
  full_blender: [
    'Finish the blender. You frame it as efficiency. She somehow always does.',
    'The whole pitcher. She looks at you, then at the blender, then drinks.',
    'Efficiency, you said. The blender comes back empty.',
  ],
  std_dough: [
    'Butter, flour, sugar. A cookie anyone would bake. Nothing to explain.',
    'Standard dough. She eats like quality control is the point.',
    'Reliable cookie. She does not ask for the recipe. She asks for another.',
  ],
  sweet_chips: [
    'Extra sugar, extra chips. New recipe, you say. She will ask for these next time.',
    'Sweeter tray. She files the taste under favorite.',
    'Testing batch. She tests thoroughly.',
  ],
  stuffed_dough: [
    'Filling hidden in each one. She will notice the calories after the plate is gone.',
    'Cream centers. She eats past the surprise.',
    'Stuffed cookies. The difference lands in her, not on the card.',
  ],
  twelve: [
    'A dozen. Normal to have around. She treats them as available.',
    'Twelve on the rack. She does not count them as a threat.',
    'Standard dozen. The number is a courtesy she will ignore.',
  ],
  double_batch: [
    'You always overbake, you say. She will take extras home. Most will not make it.',
    'Double tray. She accepts the overflow as a favor.',
    'Too many cookies. She solves that problem personally.',
  ],
  underbaked: [
    'Warm, soft, harder to stop at two. She will not stop at two.',
    'Underdone on purpose. The texture does the persuading.',
    'Still warm. She keeps reaching. The tray keeps losing.',
  ],
  three_plated: [
    'Three on a plate. Clean. She eats three and does not ask for more.',
    'Professional plating. She finishes the three like a tasting.',
    'Three cookies, a napkin, a thank-you. Defensible and done.',
  ],
  finish_batch: [
    'Help finish the batch, framed as a favor. The batch is substantial. She accepts.',
    'A favor to the kitchen. She eats like she is helping.',
    'The rest of the tray. She treats it as teamwork.',
  ],
  add_milk: [
    'Warm milk alongside. The volume doubles in her. She thanks you for the thought.',
    'Cookies and milk. Classic pairing. She drinks the pairing down.',
    'A mug beside the plate. She uses both.',
  ],
  std_batter: [
    'Flour, sugar, eggs, butter. A cake anyone would bake.',
    'Reliable crumb. She tastes like this is ordinary work.',
    'Standard batter. Nothing on the card. Plenty on the fork.',
  ],
  extra_butter: [
    'Richer today, you say. Twice the fat. She credits quality ingredients.',
    'Extra butter in the crumb. She notices taste, not math.',
    'Heavier batter. She calls it good baking.',
  ],
  lard_sub: [
    'Bakery method. Denser, heavier. She will not know what changed.',
    'Old trade trick in the batter. She eats the difference.',
    'Lard in the mix. The slice sits heavier. She likes the sit.',
  ],
  light_glaze: [
    'Thin glaze. Looks restrained. She eats around nothing and finishes.',
    'Minimal coat. Suspicion of nothing. The slice still goes.',
    'Tasteful glaze. She treats it as garnish and eats the cake.',
  ],
  buttercream: [
    'Thick coat. She will scrape the plate and not comment.',
    'Buttercream in a generous layer. The fork finds every edge.',
    'A heavy frosting. She treats the plate like part of the serving.',
  ],
  ganache: [
    'Ganache poured over. Glossy, heavy. She accepts it as an aesthetic choice.',
    'Poured chocolate. No structural restraint. She eats the structure.',
    'A pour instead of a coat. She calls it pretty. She finishes it.',
  ],
  one_slice: [
    'One slice. She finishes it and seems satisfied.',
    'Standard serving. She treats satisfied as a pause, not a stop.',
    'A normal piece. The tasting note is empty plate.',
  ],
  generous: [
    'It will go stale, you say. She takes the larger piece without questioning the frame.',
    'A generous cut. The excuse does the social work. She does the eating.',
    'Bigger slice, polite reason. She accepts both.',
  ],
  whole_cake: [
    'Take the rest home, you say. She can. She does. The container does not come back.',
    'Leftover cake as a gift. She treats the gift as an assignment.',
    'The rest of the cake. She leaves with it. She does not return it.',
  ],
  as_is: [
    'As-is. Clean finish. Nothing that needs a speech.',
    'No extra drizzle. She still empties the plate.',
    'Simple close. Professional. She is still full of cake.',
  ],
  cream_sauce: [
    'A finishing drizzle. It doubles the density. She does not ask.',
    'Cream on the slice. Just a touch, you say. She eats the touch.',
    'Sauce over cake. She treats it as plating and finishes plating.',
  ],
  ice_cream: [
    'A scoop alongside. She is already full. She eats all of it anyway.',
    'It pairs well, you say. She is past full and still pairs it.',
    'Ice cream on the side. She is past full and still finishes the scoop.',
  ],
  floor_kitchen_batch: [
    'You pull a hall-kitchen batch. Heat still on it. She drinks like it was always the recipe.',
    'Floor kitchen density, unmarked. She does not ask the source. She empties the cup.',
    'A batch from down the hall. Denser. She treats it as hospitality.',
  ],
  dining_side: [
    'A plated extra from the dining nook. She treats it as courtesy and finishes it.',
    'Nook side dish. She thanks you. The plate still goes empty.',
    'Dining extra beside the tasting. She calls it thoughtful. She eats it like hunger.',
  ],
};

const EATING = {
  0: [
    'She eats without comment and leaves rounder than she arrived. Clean session.',
    'Good appetite. No questions. Soft heat on the way out.',
    'She finishes, thanks you, and takes the extra with her in the middle.',
  ],
  1: [
    'She pauses once between servings, noticing without a word yet. She finishes everything.',
    'A look at the plate, then the next bite. Curiosity swallowed with the rest.',
    'She almost asks. She eats instead. The session still logs clean.',
  ],
  2: [
    'She asks what is in it once, then finishes. You give a vague technical answer.',
    '"This is so good," she says, already reaching. The question does not survive the fork.',
    'One curious line. Then the rest of the plate. She accepts the non-answer.',
  ],
  3: [
    'She counts servings under her breath, then eats the last one anyway.',
    'Quiet math. Louder appetite. The last bite still happens.',
    'She is running numbers. She is also still hungry. Hunger wins the count.',
  ],
  4: [
    'Quieter than usual. She looks at the plate, then eats all of it. No goodbye.',
    'She starts late and finishes anyway. The door closes without a word.',
    'Suspicion sitting in the chair with her. The food still goes. She leaves full.',
  ],
};

const TESTER_LOOK = {
  6: [
    'Clothes tight. Belly rounding forward in the chair. She moves on purpose now.',
    'Full figure, careful sitting. The tasting clothes are already negotiating.',
    'She fills the stool. The apron strings have opinions.',
  ],
  7: [
    'Belly prominent, thighs wide, slow deliberate movement. The chair is fully occupied.',
    'Very heavy in a way the doorway already knows. She sits with care.',
    'More of her to settle. She takes the chair completely and starts hungry.',
  ],
  8: [
    'She fills any seat. Doorways are a calculation. Belly rests forward the whole visit.',
    'Enormous and calm about it. The kitchen has learned her width.',
    'She is undeniable in the chair. The tasting is a seated operation.',
  ],
  9: [
    'Significant mass, shuffled steps, a chair that takes her with effort.',
    'She manages angles. The bag is wider. The appetite is unchanged.',
    'Colossal presence, careful leverage. She still shows up on time to eat.',
  ],
  10: [
    'Immobile, vast, entirely present. She fills the space and waits to be fed.',
    'She does not leave without help. The tasting comes to her.',
    'A mountain in the kitchen. The session is logistics and appetite.',
  ],
};

function three(arr) {
  const list = (arr || []).filter(Boolean);
  while (list.length < 3) list.push('{cultivator.choice.setup} {cultivator.choice.body}');
  return list.slice(0, 6);
}

export function applyCultivatorOverhaul() {
  for (const [recipeId, texts] of Object.entries(INTRO)) {
    registerPool(`cultivator.intro.${recipeId}`, [
      { when: {}, text: three(texts) },
    ]);
  }

  for (const [recipeId, recipe] of Object.entries(RECIPES)) {
    for (const junction of recipe.junctions || []) {
      for (const choice of junction.choices || []) {
        registerPool(`cultivator.choice.${recipeId}.${choice.id}`, [
          { when: {}, text: three(CHOICE[choice.id]) },
        ]);
      }
    }
    for (const extraId of ['floor_kitchen_batch', 'dining_side']) {
      registerPool(`cultivator.choice.${recipeId}.${extraId}`, [
        { when: {}, text: three(CHOICE[extraId]) },
      ]);
    }
  }

  for (const [tier, texts] of Object.entries(EATING)) {
    registerPool(`cultivator.eating.s${tier}`, [
      { when: {}, text: three(texts) },
    ]);
  }

  registerPool('cultivator.tester.look', [
    { when: {}, text: [
      'She sits for the tasting like the kitchen already claimed her.',
      'A tester in the chair. Hungry, adult, useful to the recipe.',
      'She keeps a stool, an appetite, and a look you have learned to read.',
    ]},
    ...Object.entries(TESTER_LOOK).map(([stage, texts]) => ({
      when: { testerStage: [Number(stage)] },
      weight: 5,
      text: three(texts),
    })),
  ]);
}

function prefer(poolKey, ctx) {
  const line = render(`{${poolKey}}`, ctx)?.trim();
  if (line && !line.includes('{unresolved}')) return line;
  return '';
}

export function renderTesterLook(testerStageId, testerName, week = 1) {
  const name = testerName || 'the tester';
  return prefer('cultivator.tester.look', buildTextContext({
    subject: { id: 0, name, first: name.split(' ')[0] || name, lbs: 295, startLbs: 295 },
    week,
    globals: { featureId: 'cultivator', testerStage: testerStageId || 6 },
  }));
}
