// The Squad — Lead: A1 Mobile | Support: A5 Editor
// Stage-keyed + per-student depth for high-traffic dinner.conv pools.
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('dinner.conv.compliment_appetite', [
  { when: { stageMin: 8 }, weight: 3, text: [
    `"You eat like sculpture," you say. {subject.name} laughs, vast and pleased. "Then commission another course."`,
    `"Beautiful appetite," you tell her. At {subject.lbs} lbs she gestures at the empty bread basket. "Evidence accepted."`,
  ]},
  { when: { stageMin: 5, stageMax: 7 }, weight: 2, text: [
    `"I love watching you eat," you say. {subject.name} grins without looking up. "Then keep watching. I'm not done."`,
  ]},
  { when: { studentId: 2 }, weight: 4, text: [
    `Kylie angles her phone. "Say that again. Slower. For the reel." She takes an enormous bite on cue.`,
  ]},
  { when: { studentId: 8 }, weight: 4, text: [
    `Maya's cheeks warm. She nods once and keeps eating — quiet, certain, unhurried.`,
  ]},
  { when: { studentId: 10 }, weight: 4, text: [
    `Reneé tastes your compliment like a spice. "Flattery pairs well with butter," she says, reaching for more.`,
  ]},
]);

registerModuleVariants('dinner.conv.suggest_second', [
  { when: { stageMin: 9 }, weight: 3, text: [
    `"Again?" you ask. {subject.name} pats her enormous middle. "Obviously. The night is young and so is my appetite."`,
  ]},
  { when: { studentId: 0 }, weight: 4, text: [
    `"Second wind," Brittany says, already flagging the waiter. "Captain's orders. Mine."`,
  ]},
  { when: { studentId: 5 }, weight: 4, text: [
    `"New quest unlocked," Destiny says, deadpan. "Side dish DLC."`,
  ]},
  { when: { studentId: 9 }, weight: 4, text: [
    `Chloé smiles. "Encore, mon Professeur?" The waiter is already approaching.`,
  ]},
]);

registerModuleVariants('dinner.conv.order_for_her', [
  { when: { stageMin: 7 }, weight: 3, text: [
    `You order for her at scale — courses enough for {subject.lbs} lbs of appetite. {subject.name} watches them arrive like weather she summoned.`,
  ]},
  { when: { studentId: 7 }, weight: 4, text: [
    `Priya reviews the order. "Exceeds plan," she says, pleased. "Approved."`,
  ]},
  { when: { studentId: 14 }, weight: 4, text: [
    `Mary Jane grins at the spread. "You eat like my grandma taught you," she says. "Bless you."`,
  ]},
]);

registerModuleVariants('dinner.conv.praise_capacity', [
  { when: { stageMin: 6 }, weight: 3, text: [
    `"Impressive," you say, meaning her belly, her pace, the empty plates. {subject.name} exhales, proud. "I'm just getting started."`,
  ]},
  { when: { studentId: 3 }, weight: 4, text: [
    `Serena cracks her knuckles. "Capacity training," she says. "PR night."`,
  ]},
  { when: { studentId: 6 }, weight: 4, text: [
    `Tiffany dabs her lips. "Chapter standards," she says brightly. "Exceeding them is the point."`,
  ]},
]);

registerModuleVariants('dinner.conv.endless_courses', [
  { when: { stageMin: 8 }, weight: 3, text: [
    `Course after course — {subject.name} receives each like a benediction. At {subject.lbs} lbs the table becomes an altar.`,
  ]},
  { when: { studentId: 10 }, weight: 4, text: [
    `Reneé treats the marathon like a tasting menu she authored. "Next," she says, serene.`,
  ]},
  { when: { studentId: 15 }, weight: 4, text: [
    `Lilith eats without hurry. "Keep them coming," she murmurs. "I am still hunting."`,
  ]},
]);

registerModuleVariants('dinner.conv.body_compliment', [
  { when: { stageMin: 7, corruption: [1, 2] }, weight: 3, text: [
    `You tell her she is stunning at this size. {subject.name} spreads her hands over her belly. "I know," she says. "Order dessert."`,
  ]},
  { when: { studentId: 4 }, weight: 4, text: [
    `Fiona blushes like watercolor. "You see me," she whispers. "Keep seeing me."`,
  ]},
  { when: { studentId: 11 }, weight: 4, text: [
    `Kaylee's eyes shine. "That's the nicest thing anyone's said at a dinner table," she admits.`,
  ]},
]);

registerModuleVariants('dinner.conv.overcomes_hesitation', [
  { when: { stageMin: 5 }, weight: 2, text: [
    `Menu guilt flickers and dies. {subject.name} chooses abundance and does not look back.`,
  ]},
  { when: { studentId: 16 }, weight: 4, text: [
    `Sophia wavers, then surrenders to the richer option. "Off-label," she murmurs. "Effective."`,
  ]},
]);

registerModuleVariants('dinner.moodTone', [
  { when: { stageMin: 7 }, weight: 2, text: [
    `The table holds a slower rhythm now — appetite vast, mood soft, time bending around her fullness.`,
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    `Pleasure sits openly on the table — no pretense, no apology, just appetite and your attention.`,
  ]},
]);

registerModuleVariants('dinner.relSizeNote', [
  { when: { stageMin: 9 }, weight: 3, text: [
    `At {subject.lbs} lbs she does not fit the booth so much as redefine it — warmth, mass, the evening rearranged.`,
  ]},
  { when: { stageMin: 6 }, weight: 2, text: [
    `Bodies take space at the table; hers takes more each course.`,
  ]},
]);
