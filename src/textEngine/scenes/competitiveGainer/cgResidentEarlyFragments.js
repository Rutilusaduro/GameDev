// CG resident thread — early-game one-liners (legacy bridge week); late game uses cgChatFragments.
import { registerModuleVariants } from '../../engine.js';
import { legacyBridgeWhen } from '../legacyPoolPolicy.js';

const LINES = [
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
  ['Serena', 'close', 'Serena posts one line — close enough to make Priya schedule another meal.'],
  ['Brittany', 'close', 'Brittany’s first message is all caps and hunger — the corkboard was never enough, she needs a witness.'],
];

for (const [name, replyType, line] of LINES) {
  registerModuleVariants(`cg.chat.resident.${name}.${replyType}`, [
    { when: legacyBridgeWhen(), weight: 1, text: [line] },
  ]);
}
