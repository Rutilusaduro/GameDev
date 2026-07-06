// The Squad — Lead: A1 Mobile | Support: A2 Psych, A5 Editor
// Per-girl clothing failure reactions — corruption-keyed dialogue.
import { registerModuleVariants } from '../../engine.js';
import './fragments.js';

const W = 4;

registerModuleVariants('cloth.reaction', [
  { when: { studentId: 0, corruption: [0] }, weight: W, text: [
    `Brittany yanks the gap shut. "Uniform issue. Not a me issue."`,
    `"Still competition ready," she says, cheeks hot. The seam disagrees.`,
  ]},
  { when: { studentId: 0, corruption: [2] }, weight: W, text: [
    `"Buy bigger," Brittany says, grinning. "Coach can cry about it."`,
    `She watches the button roll and laughs. "New PR."`,
  ]},
  { when: { studentId: 2, corruption: [0] }, weight: W, text: [
    `Kylie angles away from the camera she is not holding. "Wardrobe malfunction. Relatable."`,
    `"Editing that out," she mutters, not moving to fix it.`,
  ]},
  { when: { studentId: 2, corruption: [2] }, weight: W, text: [
    `"Keep that in frame," Kylie says. "Authentic. Viral."`,
    `She poses in the wreckage of her waistband and laughs. "Keep rolling."`,
  ]},
  { when: { studentId: 3, corruption: [0] }, weight: W, text: [
    `Serena tugs the compression gear flat. "Wrong size. Order error."`,
    `"Gear failure," she says, jaw tight. Not her failure. Obviously.`,
  ]},
  { when: { studentId: 3, corruption: [1] }, weight: W, text: [
    `"New gear," Serena says, quieter. "Bigger gear. Fine."`,
    `She exhales through the strain. Adaptation, not defeat.`,
  ]},
  { when: { studentId: 5, corruption: [0] }, weight: W, text: [
    `Destiny pulls the hoodie down. "Graphics glitch. Ignore."`,
    `"Hoodie patch when?" she asks the universe.`,
  ]},
  { when: { studentId: 5, corruption: [2] }, weight: W, text: [
    `"Cosmetic update declined," Destiny says. "Running hot anyway."`,
    `She leaves the gap. Comfort meta.`,
  ]},
  { when: { studentId: 6, corruption: [1] }, weight: W, text: [
    `"Okay, bigger size," Tiffany sighs, bubbly. "Chapter dues cover fashion emergencies."`,
    `She laughs it off. The zipper does not laugh.`,
  ]},
  { when: { studentId: 7, corruption: [0] }, weight: W, text: [
    `"Off-plan," Priya says, already rescheduling a shopping block.`,
    `"Wardrobe revision required. Adding to calendar."`,
  ]},
  { when: { studentId: 8, corruption: [0] }, weight: W, text: [
    `Maya goes still, fingers on the gap. She says nothing. Her ears pink.`,
    `She pulls the sweater lower and hopes the room did not notice.`,
  ]},
  { when: { studentId: 9, corruption: [2] }, weight: W, text: [
    `Chloé smiles at the torn seam. "Silk was always a suggestion, mon cher."`,
    `"American sizing," she says, delighted. "Finally honest."`,
  ]},
  { when: { studentId: 10, corruption: [1] }, weight: W, text: [
    `Reneé dusts flour off the popped button. "Proof of rise. Good dough does that."`,
    `"Kitchen casualty," she says, pleased. "Worth it."`,
  ]},
  { when: { studentId: 11, corruption: [0] }, weight: W, text: [
    `"Fabric failure noted," Kaylee says calmly. "No injury. Emotional status: embarrassed."`,
    `She covers the gap like triage. Professional, pink-cheeked.`,
  ]},
  { when: { studentId: 12, corruption: [2] }, weight: W, text: [
    `Nadia watches your eyes on the tear. "Interesting reaction. Mine is approval."`,
    `"The garment lost," she says. "I did not."`,
  ]},
  { when: { studentId: 13, corruption: [1] }, weight: W, text: [
    `"Bless it, honey, seams do that," Daisy says warmly. "We'll mend or we'll size up."`,
    `She pats the rip like a child's scraped knee.`,
  ]},
  { when: { studentId: 14, corruption: [2] }, weight: W, text: [
    `Mary Jane laughs at the popped button. "Harvest pressure. Happens in jars too."`,
    `"Nothing wrong with a little overflow," she winks.`,
  ]},
  { when: { studentId: 15, corruption: [2] }, weight: W, text: [
    `Lilith does not fix it. She lets you see. Silence is the whole comment.`,
    `"Good," she says, once. Fabric was in the way.`,
  ]},
  { when: { studentId: 16, corruption: [0] }, weight: W, text: [
    `"Lab coat still fits," Sophia insists, lying. "Mostly. Research continues."`,
    `She pins the gap with a trembling hand. Data: embarrassing.`,
  ]},
  { when: { studentId: 17, corruption: [1] }, weight: W, text: [
    `"Relic hunter rule," Indiana says: "If it breaks, you outgrew the tomb."`,
    `She tucks the torn seam like a map edge. Still exploring.`,
  ]},
  { when: { studentId: 1, corruption: [0] }, weight: W, text: [
    `Madeline smooths the gap with academic calm. "Garment tolerance exceeded."`,
    `"Expected at current mass," she says, cheeks pink. "Ordering larger."`,
  ]},
  { when: { studentId: 4, corruption: [0] }, weight: W, text: [
    `Fiona looks at the tear like negative space gone wrong. "The composition… shifted."`,
    `"Art happens," she whispers, pulling fabric over the gap.`,
  ]},
  { when: { studentId: 18, custom: false, corruption: [0] }, weight: W, text: [
    `"Tolerance exceeded," Talia mutters, pinning the gap. "Revision required."`,
    `She treats the tear like a failed stress test. The test continues.`,
  ]},
  { when: { studentId: 18, custom: false, corruption: [2] }, weight: W, text: [
    `"Material stress exceeded spec," Talia says. "Recommend larger garment. Accepting growth."`,
    `She logs the pop and keeps moving. Engineering solution: elastic.`,
  ]},
]);
