// CG resident variety, evolved beats, hall room blurbs (Pass 89).
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';


const cgResidentExtras = [
  ['Cassidy', 'ahead', 'Thigh column still mine — update the board before you celebrate.'],
  ['Cassidy', 'behind', 'Your lead is real. I am eating like it is homework.'],
  ['Cassidy', 'close', 'Margin tight enough that I can taste competition in the air.'],
  ['Kylie', 'proud', 'Comments noticed the curve — camera loves a girl who keeps climbing.'],
  ['Kylie', 'unmeasured', 'Book the session. I need ring light and a cheat meal first.'],
  ['Serena', 'close', 'Close numbers mean I train harder tomorrow — that is the only fun version.'],
  ['Serena', 'behind', 'You are ahead. Good. I like a target I can chase with a fork.'],
  ['Fiona', 'ahead', 'Composition favors me today — your scale is still the louder shape.'],
  ['Fiona', 'behind', 'Your measurements dominate the frame. Irritating and inspiring.'],
  ['Destiny', 'behind', 'Your build is overtuned — I am grinding patches until the ladder flips.'],
  ['Destiny', 'close', 'Contested territory. I am screenshotting this mood.'],
  ['Tiffany', 'proud', 'Progress with posture — the board should learn to appreciate elegance.'],
  ['Maya', 'close', 'Close. I eat. You measure.'],
  ['Nadia', 'close', 'Near parity makes you perform — I am taking notes.'],
  ['Kaylee', 'behind', 'You are doing beautifully — add dessert before you gloat, okay?'],
  ['Reneé', 'ahead', 'One category ahead calls for a richer batter — I will send the recipe.'],
  ['Daisy', 'close', 'Close enough that everyone needs a proper meal plan, honey.'],
  ['Mary_Jane', 'behind', 'You are outgrowing the board, Priya — that is praise in my dialect.'],
  ['Lilith', 'close', 'So close I can hear your appetite tighten — delicious tension.'],
  ['Brittany', 'ahead', 'Thighs still winning — screenshot your outrage for later.'],
  ['Brittany', 'proud', 'Solid gains. The corkboard can admit I am scary today.'],
];

for (const [name, replyType, line] of cgResidentExtras) {
  registerModuleVariants(`cg.chat.resident.${name}.${replyType}`, [
    { when: legacyBridgeWhen(), weight: 1, text: [line] },
  ]);
}

registerModuleVariants('evolved.event.homeroom_queen.s0.p2', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Conference voices soften when containers open — policy learns appetite by smell before it learns by memo.',
    ],
  },
]);

registerModuleVariants('evolved.event.sumo.s0.p0', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Chanko steam and liniment — the warm-up room learns your cheerleader shoulders before the dohyo does.',
    ],
  },
]);

registerModuleVariants('evolved.event.wife_lessons.s0.end0', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Flour on every cheek — mothers leave heavier than they arrived, hearts included.',
    ],
  },
]);

registerModuleVariants('evolved.activity.homestead_queen', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Porch light, porch portions — homestead hunger outgrows the property line.',
    ],
  },
]);

registerModuleVariants('hall.room.blurb', [
  {
    when: { hallRoomId: ['kitchen_pantry'] },
    weight: 1,
    text: [
      'Shelves bow like they are proud — the pantry hums whenever someone opens the door hungry.',
    ],
  },
  {
    when: { hallRoomId: ['common_lounge'] },
    weight: 1,
    text: [
      'Cushions remember every movie night that ended in delivery boxes stacked like trophies.',
    ],
  },
  {
    when: { hallRoomId: ['grand_atrium'] },
    weight: 1,
    text: [
      'Echoes turn compliments into ceremony — prestige here is measured in second helpings.',
    ],
  },
]);

registerModuleVariants('wifeLessons.talk.Wanda.s2.greeting', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      '"The pound cake sat heavy on the ride home — Patrice and I talked about nothing else."',
    ],
  },
]);

registerModuleVariants('wifeLessons.lesson.s4.lasagna', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Cheese strings stretch between forks — lasagna night teaches daughters that layers are a lifestyle.',
    ],
  },
]);

registerModuleVariants('cg.chat.priyaPost.Heavy.Driven', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Priya posts the numbers like a dare — every resident thumb hovers over react before they reach for a snack.',
    ],
  },
]);

registerModuleVariants('fair.training.Serena', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Serena treats funnel-cake lines like choreography — MJ follows the rhythm straight into fair pride.',
    ],
  },
]);
