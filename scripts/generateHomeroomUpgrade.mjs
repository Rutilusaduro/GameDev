// Unique extras for homeroom conference / activity parent keys.
// Run: node scripts/generateHomeroomUpgrade.mjs
import { writeFileSync } from 'node:fs';
import '../src/textEngine/scenes/homeroom/index.js';
import { _registryEntries } from '../src/textEngine/engine.js';

const OUT = 'src/textEngine/scenes/homeroom/upgrade.js';

const BANK = {
  'Kayla.intro': [
    'Kayla sits like the room already belongs to Tuesdays. Grades are a cover story and she knows it.',
    'She waits, not nervous. The container on the desk is doing more talking than the syllabus.',
  ],
  'Kayla.academic': [
    'Daisy names the weekly climb in engagement. Kayla blinks, then looks at the container anyway.',
    '"Oh," Kayla says, actually surprised by the scores. The snack still slides over.',
  ],
  'Kayla.tuesday': [
    'Cinnamon rolls, second upgrade, no thinking required. Daisy writes it like a standing order.',
    'Kayla has the recipe progression categorized. She eats two pieces before she stands.',
  ],
  'Bri.intro': [
    'Bri\'s eyes go to the desk first. Practical hunger, polite about it.',
    '"Is there anything?" she asks, meaning food, meaning now.',
  ],
  'Bri.brought_something': [
    'The bottom drawer always has a container. Bri treats it like a known resource and listens while she eats.',
    'Progress talk and pastry happen at the same speed. Bri is good at both.',
  ],
  'Bri.brief': [
    'Nothing in the drawer today. The conference stays warm and short. Tuesday is already in her walk.',
    'Bri accepts the empty drawer without complaint. Daisy\'s specific praise still lands.',
  ],
  'Sofia.intro': [
    'Sofia fills the chair before she finishes sitting. Hands flat on the desk. She is in.',
    'So much of her now, soft and settled. The look says she already knows what this meeting is.',
  ],
  'Sofia.portfolio': [
    'Best portfolio in the class, named piece by piece. Then: can she have something before she goes.',
    'Sofia takes the work seriously. She also takes the container. Daisy had it ready.',
  ],
  'Sofia.next_tuesday': [
    'Cardamom honey cake, extra cream, peach backup ranked. Daisy writes: non-negotiable.',
    'Sofia plans Tuesday like a syllabus. Alternatives listed. Appetite scheduled.',
  ],
  'Mrs_Calloway.intro': [
    'Jacket still buttoned. Eyes already inventorying the snack drawer. Kayla talks about Tuesdays constantly.',
    'Mrs. Calloway has not decided if this is a problem. The counter is making a case.',
  ],
  'Mrs_Calloway.curriculum_frame': [
    'Enrichment rationale, accurate and specific. Arms uncross by point three. "She\'s been happier."',
    'Professional framing holds. Mrs. Calloway leaves without extra questions. Daisy exhales.',
  ],
  'Mrs_Calloway.offer_tasting': [
    'A wrapped slice for the drive. Not a refusal. She eats it in the parking lot.',
    'Daisy watches from the window and writes the note. The tasting did the talking.',
  ],
  'Mrs_Reyes.intro': [
    'Coffee for both, habit now. Belly pressing the blouse she stopped explaining. She keeps arriving early.',
    'Mrs. Reyes sits before hello finishes. Honesty is already on the table.',
  ],
  'Mrs_Reyes.honest_talk': [
    'Stress, comfort, classroom smell, dropped pretense. Daisy is glad she\'s here. She stays forty minutes.',
    'Mrs. Reyes exhales like she has been holding a secret that was only hunger.',
  ],
  'Mrs_Reyes.recipe_preview': [
    'Marked pages: cardamom, peach, too much cream. She leaves with a container and a circled date.',
    '"Can I—" / "Yes." She laughs at herself and takes the preview home.',
  ],
  'Mrs_Monroe.intro': [
    'No knock. Good chair. "What\'s on the menu?" Abundance decided years ago.',
    'Mrs. Monroe enters like the room was waiting. The question is food, not grades.',
  ],
  'Mrs_Monroe.full_preview': [
    'This week, next week, the held recipe. She will talk to the other moms. Wonderful, she says, delighted.',
    'Follow-up questions that help her and the kitchen both. Daisy lays the whole plan out.',
  ],
  'Mrs_Monroe.taste_now': [
    'The saved container opens before Daisy sits. "This is why I come." She asks about next Tuesday.',
    'Agenda skipped. Last piece gone. Mrs. Monroe is sincere with her mouth full.',
  ],
  'parent_meeting.p0': [
    'Three moms, three postures, one room with its own agenda under the printed one.',
    'Monroe has the window chair. Reyes mid-sentence. Calloway buttoned in back. Daisy holds the notepad.',
  ],
  'parent_meeting.p0.curriculum': [
    'Every list item, thoroughly. Arms uncross. Hands in the snack bowl. Containers on the way out.',
    'The stated meeting happens. The unstated meeting happens in the same hour.',
  ],
  'parent_meeting.p0.recipes': [
    'Recipe book open. Monroe makes a sound. Reyes leans. Calloway names the cardamom and surprises herself.',
    'Ninety minutes. Nobody mentions the agenda again.',
  ],
  'parent_meeting.p0.refreshments_first': [
    'Big container down. Monroe has it open mid-sentence. Calloway is on piece three before item one.',
    'Refreshments require full attention. The meeting is excellent.',
  ],
  'health_unit.p0': [
    'Scale at the front, tape on the desk. Sofia already waiting, unhurried.',
    'Health unit day. The girls have been waiting in their own ways.',
  ],
  'health_unit.p0.official': [
    'Numbers read aloud into the school file. Accurate. Notable. Someone will open that later.',
    'Height, then weight. The nurse\'s folder is about to become interesting reading.',
  ],
  'health_unit.p0.personal': [
    'Apron-pocket notebook, not the school file. Daisy looks at the numbers a long time, then smiles.',
    'These measurements stay hers. The cover closes on a private record.',
  ],
  'health_unit.p1': [
    'Mrs. Monroe watched the whole hour. "I haven\'t been weighed since my last physical. Can I—"',
    'Pickup, and the scale still has an audience. She looks at it like an invitation.',
  ],
  'health_unit.p1.weigh_moms': [
    'Monroe first, unafraid. Reyes second, unsurprised. Calloway last: don\'t tell Kayla. Then she laughs.',
    'All three numbers go in the notebook. The event writes itself.',
  ],
  'health_unit.p1.decline': [
    '"This one\'s just for the class." Mrs. Monroe nods. She does not need the number to know.',
    'Professional line held. Monroe stays comfortable without stepping on the scale.',
  ],
};

function personKey(full) {
  // homeroom.conference.Kayla.intro → Kayla.intro
  // homeroom.activity.parent_meeting.p0.curriculum → parent_meeting.p0.curriculum
  if (full.startsWith('homeroom.conference.')) return full.slice('homeroom.conference.'.length);
  if (full.startsWith('homeroom.activity.')) return full.slice('homeroom.activity.'.length);
  return '';
}

const keys = _registryEntries()
  .map(([k]) => k)
  .filter((k) => !k.includes('._') && (k.startsWith('homeroom.conference.') || k.startsWith('homeroom.activity.')));

const lines = [
  '// The Squad — Lead: A2 Psych | Support: A5 Editor',
  '// Auto-generated — run: node scripts/generateHomeroomUpgrade.mjs',
  "import { registerModuleVariants } from '../../engine.js';",
  '',
];

let n = 0;
for (const key of keys) {
  const texts = BANK[personKey(key)];
  if (!texts?.length) continue;
  lines.push(`registerModuleVariants(${JSON.stringify(key)}, [{ when: {}, weight: 6, text: ${JSON.stringify(texts)} }]);`);
  n += 1;
}

writeFileSync(OUT, `${lines.join('\n')}\n`);
console.log(`generateHomeroomUpgrade: ${n} pools → ${OUT}`);
