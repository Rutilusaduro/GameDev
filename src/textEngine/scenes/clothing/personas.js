// The Squad — Lead: A1 Mobile | Support: A2 Psych, A5 Editor
// Per-girl clothing failure reactions — corruption-keyed dialogue.
import { registerModuleVariants } from '../../engine.js';
import './fragments.js';

const W = 4;

registerModuleVariants('cloth.reaction', [
  { when: { studentId: 0, corruption: [0] }, weight: W, text: [
    `Brittany yanks the gap shut. "Uniform issue. Not a me issue."`,
    `"Still competition ready," she says, cheeks hot. The seam disagrees.`,
    `"Tailor's fault," she mutters. The tailor was last month.`,
  ]},
  { when: { studentId: 0, corruption: [2] }, weight: W, text: [
    `"Buy bigger," Brittany says, grinning. "Coach can cry about it."`,
    `She watches the button roll and laughs. "New PR."`,
    `She flexes in the gap. Uniform optional now.`,
  ]},
  { when: { studentId: 2, corruption: [0] }, weight: W, text: [
    `Kylie angles away from the camera she is not holding. "Wardrobe malfunction. Relatable."`,
    `"Editing that out," she mutters, not moving to fix it.`,
    `"Authentic content," she says, still not fixing it.`,
  ]},
  { when: { studentId: 2, corruption: [2] }, weight: W, text: [
    `"Keep that in frame," Kylie says. "Authentic. Viral."`,
    `She poses in the wreckage of her waistband and laughs. "Keep rolling."`,
    `"Wardrobe said yes," she grins. "I agree."`,
  ]},
  { when: { studentId: 3, corruption: [0] }, weight: W, text: [
    `Serena tugs the compression gear flat. "Wrong size. Order error."`,
    `"Gear failure," she says, jaw tight. Not her failure. Obviously.`,
    `"Manufacturer defect," she insists. Her thighs disagree.`,
  ]},
  { when: { studentId: 3, corruption: [1] }, weight: W, text: [
    `"New gear," Serena says, quieter. "Bigger gear. Fine."`,
    `She exhales through the strain. Adaptation, not defeat.`,
    `"Training load changed," she says. Gear did not keep up.`,
  ]},
  { when: { studentId: 5, corruption: [0] }, weight: W, text: [
    `Destiny pulls the hoodie down. "Graphics glitch. Ignore."`,
    `"Hoodie patch when?" she asks the universe.`,
    `"Render error," she says. Belly renders fine.`,
  ]},
  { when: { studentId: 5, corruption: [2] }, weight: W, text: [
    `"Cosmetic update declined," Destiny says. "Running hot anyway."`,
    `She leaves the gap. Comfort meta.`,
    `"Feature, not bug," she shrugs. Chat would agree.`,
  ]},
  { when: { studentId: 6, corruption: [1] }, weight: W, text: [
    `"Okay, bigger size," Tiffany sighs, bubbly. "Chapter dues cover fashion emergencies."`,
    `She laughs it off. The zipper does not laugh.`,
    `"Pastel still works," she decides. "Just more pastel."`,
  ]},
  { when: { studentId: 7, corruption: [0] }, weight: W, text: [
    `"Off-plan," Priya says, already rescheduling a shopping block.`,
    `"Wardrobe revision required. Adding to calendar."`,
    `"Budget line: larger sizes," she notes, blushing.`,
  ]},
  { when: { studentId: 8, corruption: [0] }, weight: W, text: [
    `Maya goes still, fingers on the gap. She says nothing. Her ears pink.`,
    `She pulls the sweater lower and hopes the room did not notice.`,
    `She covers the tear with her sketchbook. Practical.`,
  ]},
  { when: { studentId: 9, corruption: [2] }, weight: W, text: [
    `Chloé smiles at the torn seam. "Silk was always a suggestion, mon cher."`,
    `"American sizing," she says, delighted. "Finally honest."`,
    `"C'est la vie," she sighs, pleased. "Larger."`,
  ]},
  { when: { studentId: 10, corruption: [1] }, weight: W, text: [
    `Reneé dusts flour off the popped button. "Proof of rise. Good dough does that."`,
    `"Kitchen casualty," she says, pleased. "Worth it."`,
    `"Oven spring," she murmurs, patting her middle.`,
  ]},
  { when: { studentId: 11, corruption: [0] }, weight: W, text: [
    `"Fabric failure noted," Kaylee says calmly. "No injury. Emotional status: embarrassed."`,
    `She covers the gap like triage. Professional, pink-cheeked.`,
    `"Recommend larger size," she says, clinical. "Immediately."`,
  ]},
  { when: { studentId: 12, corruption: [2] }, weight: W, text: [
    `Nadia watches your eyes on the tear. "Interesting reaction. Mine is approval."`,
    `"The garment lost," she says. "I did not."`,
    `"Hyposeason plan: I outgrew it. Confirmed."`,
  ]},
  { when: { studentId: 13, corruption: [1] }, weight: W, text: [
    `"Bless it, honey, seams do that," Daisy says warmly. "We'll mend or we'll size up."`,
    `She pats the rip like a child's scraped knee.`,
    `"Nothing a good meal can't explain," she winks.`,
  ]},
  { when: { studentId: 14, corruption: [2] }, weight: W, text: [
    `Mary Jane laughs at the popped button. "Harvest pressure. Happens in jars too."`,
    `"Nothing wrong with a little overflow," she winks.`,
    `"Canning season," she says, patting her belly. "Personal."`,
  ]},
  { when: { studentId: 15, corruption: [2] }, weight: W, text: [
    `Lilith does not fix it. She lets you see. Silence is the whole comment.`,
    `"Good," she says, once. Fabric was in the way.`,
    `She does not glance down. You are meant to.`,
  ]},
  { when: { studentId: 16, corruption: [0] }, weight: W, text: [
    `"Lab coat still fits," Sophia insists, lying. "Mostly. Research continues."`,
    `She pins the gap with a trembling hand. Data: embarrassing.`,
    `"Sample size inadequate," she whispers. Meaning her.`,
  ]},
  { when: { studentId: 17, corruption: [1] }, weight: W, text: [
    `"Relic hunter rule," Indiana says: "If it breaks, you outgrew the tomb."`,
    `She tucks the torn seam like a map edge. Still exploring.`,
    `"New stratum," she grins. "Deeper layer."`,
  ]},
  { when: { studentId: 1, corruption: [0] }, weight: W, text: [
    `Cassidy smooths the gap with academic calm. "Garment tolerance exceeded."`,
    `"Expected at current mass," she says, cheeks pink. "Ordering larger."`,
    `"Statistically inevitable," she murmurs. Still blushing.`,
  ]},
  { when: { studentId: 4, corruption: [0] }, weight: W, text: [
    `Fiona looks at the tear like negative space gone wrong. "The composition… shifted."`,
    `"Art happens," she whispers, pulling fabric over the gap.`,
    `"The line escaped," she says, fascinated. "I like it."`,
  ]},
  { when: { studentId: 18, custom: false, corruption: [0] }, weight: W, text: [
    `"Tolerance exceeded," Talia mutters, pinning the gap. "Revision required."`,
    `She treats the tear like a failed stress test. The test continues.`,
    `"Garment spec insufficient," Talia says, cheeks pink. "Ordering larger."`,
  ]},
  { when: { studentId: 18, custom: false, corruption: [1] }, weight: W, text: [
    `"Within expected failure mode," Talia says, calmer now. "Scaling up."`,
    `She logs the pop in her notebook. "Next iteration: elastic."`,
    `"Material limit reached," she murmurs. "Acceptable outcome."`,
  ]},
  { when: { studentId: 18, custom: false, corruption: [2] }, weight: W, text: [
    `"Material stress exceeded spec," Talia says. "Recommend larger garment. Accepting growth."`,
    `She logs the pop and keeps moving. Engineering solution: elastic.`,
    `"Failure mode: outgrown," Talia says, pleased. "Proceeding to next size tier."`,
  ]},
  { when: { studentId: 18, corruption: [0] }, weight: W, text: [
    `"Tolerance exceeded," Talia mutters, pinning the gap. "Revision required."`,
    `She treats the tear like a failed stress test. The test continues.`,
    `"Garment spec insufficient," Talia says, cheeks pink. "Ordering larger."`,
  ]},
  { when: { studentId: 18, corruption: [1] }, weight: W, text: [
    `"Within expected failure mode," Talia says, calmer now. "Scaling up."`,
    `She logs the pop in her notebook. "Next iteration: elastic."`,
    `"Material limit reached," she murmurs. "Acceptable outcome."`,
  ]},
  { when: { studentId: 18, corruption: [2] }, weight: W, text: [
    `"Material stress exceeded spec," Talia says. "Recommend larger garment. Accepting growth."`,
    `She logs the pop and keeps moving. Engineering solution: elastic.`,
    `"Failure mode: outgrown," Talia says, pleased. "Proceeding to next size tier."`,
  ]},
]);
