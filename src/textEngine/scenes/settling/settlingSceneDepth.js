// The Squad — Lead: A3 Immobility | Support: A5 Editor
// Per-student depth on settling immobility pools (care/socialize/feed/weigh).
import { registerModuleVariants } from '../../engine.js';

const W = 4;

registerModuleVariants('set.care.tend.beat', [
  { when: { studentId: 1, stageMin: 10 }, weight: W, text: [
    `Cassidy tends her own notes between your hands — data and comfort braided, body maintained like research.`,
  ]},
  { when: { studentId: 3, stageMin: 10 }, weight: W, text: [
    `Serena's athlete body needs different tending — joints, breath, the soft places training forgot.`,
  ]},
  { when: { studentId: 9, stageMin: 10 }, weight: W, text: [
    `Chloé receives care like hospitality — unhurried, continental, every gesture returned with warmth.`,
  ]},
  { when: { studentId: 11, stageMin: 10 }, weight: W, text: [
    `Kaylee melts under small attentions — pillow, cloth, your presence. Gratitude immediate.`,
  ]},
  { when: { studentId: 16, stageMin: 10 }, weight: W, text: [
    `Vanessa's tending is practical theater — comfort staged, vanity honored, mass maintained with flair.`,
  ]},
  { when: { studentId: 17, stageMin: 10 }, weight: W, text: [
    `Indiana's bulk needs brute-care — cushions shoved, folds cooled, treasure-hunter patience.`,
  ]},
  { when: { studentId: 18, custom: false, stageMin: 10 }, weight: W, text: [
    `Talia catalogs each adjustment — hypothesis: comfort improves yield. Conclusion: yes.`,
  ]},
  { when: { stageMin: 11 }, weight: 3, text: [
    `Tending at room-filling scale — route not gesture. You follow the warm geography of {subject.first}.`,
  ]},
]);

registerModuleVariants('set.care.tend.react', [
  { when: { studentId: 0, corruption: [2], stageMin: 10 }, weight: W, text: [
    `Brittany receives tending like post-game care — "Good," she says. "Team needs me maintained."`,
  ]},
  { when: { studentId: 2, stageMin: 10 }, weight: W, text: [
    `Kylie angles for the camera even immobile — "Get the angle," she murmurs. Then goes still under your hands.`,
  ]},
  { when: { studentId: 8, stageMin: 10 }, weight: W, text: [
    `Maya goes quiet under attention — trust absolute, words unnecessary, breath slowing.`,
  ]},
  { when: { studentId: 11, stageMin: 10 }, weight: W, text: [
    `Kaylee exhales into the care like medicine. "Thank you," she whispers. "Always thank you."`,
  ]},
  { when: { studentId: 15, corruption: [2], stageMin: 10 }, weight: W, text: [
    `Lilith watches you work — pleased, proprietary. "Continue," she says. Not a request.`,
  ]},
]);

registerModuleVariants('set.socialize.gossip', [
  { when: { studentId: 0, stageMin: 10 }, weight: W, text: [
    `Brittany runs court from the bed — captain's intel desk, verdicts delivered without standing.`,
  ]},
  { when: { studentId: 5, stageMin: 10 }, weight: W, text: [
    `Destiny sorts gossip like patch notes — "That drama's deprecated," she says. "This one's meta."`,
  ]},
  { when: { studentId: 6, stageMin: 10 }, weight: W, text: [
    `Tiffany hosts campus news like chapter meeting — gracious, omniscient, immobile.`,
  ]},
  { when: { studentId: 12, stageMin: 10 }, weight: W, text: [
    `Nadia files gossip clinically — then delivers the real story with unsettling accuracy.`,
  ]},
  { when: { studentId: 13, stageMin: 10 }, weight: W, text: [
    `Daisy receives the week like Sunday news — warm, practical, verdicts served with tea logic.`,
  ]},
]);

registerModuleVariants('set.socialize.confide', [
  { when: { studentId: 4, stageMin: 10 }, weight: W, text: [
    `Fiona holds your confession like pigment — absorbed, transformed, returned as something truer.`,
  ]},
  { when: { studentId: 8, stageMin: 10 }, weight: W, text: [
    `Maya listens without shifting — you say more than planned. She meets it with one soft "I know."`,
  ]},
  { when: { studentId: 9, stageMin: 10 }, weight: W, text: [
    `Chloé confides back in French when English fails — intimacy without performance.`,
  ]},
  { when: { studentId: 14, stageMin: 10 }, weight: W, text: [
    `Mary Jane laughs once, then tells you something real — sunny voice, serious weight.`,
  ]},
]);

registerModuleVariants('set.socialize.praise.line', [
  { when: { studentId: 0, stageMin: 10 }, weight: W, text: [
    `"Still winning," you tell Brittany, hand on vast warmth. "Bigger league now. I love it."`,
  ]},
  { when: { studentId: 2, stageMin: 10 }, weight: W, text: [
    `"This is the content," you tell Kylie — curves filling frame, immobility as aesthetic.`,
  ]},
  { when: { studentId: 8, stageMin: 10 }, weight: W, text: [
    `"So much of you," you say softly to Maya. Palm sinks into heat. She does not look away.`,
  ]},
  { when: { studentId: 10, stageMin: 10 }, weight: W, text: [
    `"Magnificent scale," you tell Reneé. "Like a kitchen that learned to breathe."`,
  ]},
  { when: { studentId: 15, stageMin: 11 }, weight: W, text: [
    `"You own the room," you tell Lilith. "Every pound of it. Predator size. Perfect."`,
  ]},
]);

registerModuleVariants('set.socialize.praise.react', [
  { when: { studentId: 0, corruption: [2] }, weight: W, text: [
    `Brittany grins — captain satisfied. "Higher score next weigh-in," she says.`,
  ]},
  { when: { studentId: 7 }, weight: W, text: [
    `Priya receives praise like validated data — quiet flush, no argument with the model.`,
  ]},
  { when: { studentId: 14, corruption: [2] }, weight: W, text: [
    `Mary Jane laughs, pleased. "Bless your heart," she says. "Keep talking."`,
  ]},
]);

registerModuleVariants('set.feed.preferred', [
  { when: { studentId: 0, stageMin: 10 }, weight: W, text: [
    `Brittany gets savory depth — captain fuel, hand-fed, no apology in the portion size.`,
  ]},
  { when: { studentId: 2, stageMin: 10 }, weight: W, text: [
    `Kylie eats her preference on camera even immobile — "Clip the good bites," she says.`,
  ]},
  { when: { studentId: 4, stageMin: 10 }, weight: W, text: [
    `Fiona savors preferred flavors like pigment — slow, absorbed, returned as quiet bliss.`,
  ]},
  { when: { studentId: 7, stageMin: 10 }, weight: W, text: [
    `Priya eats what she asked for — measured satisfaction, preference validated by data and tongue.`,
  ]},
  { when: { studentId: 9, stageMin: 10 }, weight: W, text: [
    `Chloé takes sweet things with continental patience — each bite a small ceremony.`,
  ]},
  { when: { studentId: 11, stageMin: 10 }, weight: W, text: [
    `Kaylee receives preferred food like medicine — soft sounds, eyes closed, trust total.`,
  ]},
  { when: { studentId: 15, stageMin: 10 }, weight: W, text: [
    `Lilith eats what she wanted without performance — predator satisfied, preference met.`,
  ]},
  { when: { studentId: 16, stageMin: 10 }, weight: W, text: [
    `Vanessa takes her preferred bite with drama — "Exactly right," she declares. "As always."`,
  ]},
]);

registerModuleVariants('set.feed.stuffing', [
  { when: { studentId: 3, stageMin: 10 }, weight: W, text: [
    `Serena takes one more past full — athlete capacity rediscovered horizontal, triumphant.`,
  ]},
  { when: { studentId: 5, stageMin: 10 }, weight: W, text: [
    `Destiny accepts stuffing like bonus XP — "Worth it," she says around another bite.`,
  ]},
  { when: { studentId: 10, stageMin: 10 }, weight: W, text: [
    `Reneé opens again past full — chef's palate, endless appetite, ceremony intact.`,
  ]},
  { when: { studentId: 14, stageMin: 10 }, weight: W, text: [
    `Mary Jane takes seconds past seconds — farm appetite, immobile and unrepentant.`,
  ]},
]);

registerModuleVariants('set.feed.spread', [
  { when: { studentId: 6, stageMin: 10 }, weight: W, text: [
    `Tiffany surveys the spread like rush catering — chapter-scale abundance, entirely appropriate.`,
  ]},
  { when: { studentId: 13, stageMin: 10 }, weight: W, text: [
    `Daisy blesses the spread and begins — Southern hospitality at furniture-breaking scale.`,
  ]},
  { when: { studentId: 17, stageMin: 10 }, weight: W, text: [
    `Indiana grins at the haul — "Treasure trove," he says, already eating like excavation.`,
  ]},
]);

registerModuleVariants('set.weigh.react', [
  { when: { studentId: 1, stageMin: 10 }, weight: W, text: [
    `Cassidy logs {subject.lbs} mentally, then lets satisfaction win. "Publishable," she murmurs.`,
  ]},
  { when: { studentId: 7, stageMin: 10 }, weight: W, text: [
    `Priya nods at the total — outlier confirmed, hypothesis exceeded, body victorious.`,
  ]},
  { when: { studentId: 12, stageMin: 10 }, weight: W, text: [
    `Nadia listens to {subject.lbs} like results day — pleased in a way she won't chart.`,
  ]},
  { when: { studentId: 18, custom: false, stageMin: 10 }, weight: W, text: [
    `Talia records {subject.lbs} and exhales — trial successful, mass within glorious tolerance.`,
  ]},
]);

registerModuleVariants('set.gather', [
  { when: { studentId: 0, stageMin: 11 }, weight: W, text: [
    `Brittany's court assembles — captain immobile, squad still orbiting, loyalty geographic.`,
  ]},
  { when: { studentId: 2, stageMin: 11 }, weight: W, text: [
    `Kylie's followers cluster for content — phones out, warmth shared, immobility as venue.`,
  ]},
  { when: { studentId: 8, stageMin: 11 }, weight: W, text: [
    `Maya's gathering is quiet — girls settle near her heat, conversation low, presence enough.`,
  ]},
  { when: { studentId: 15, stageMin: 11 }, weight: W, text: [
    `Lilith's court arrives wary and stays hungry — predator center, others careful and close.`,
  ]},
  { when: { studentId: 6, stageMin: 10 }, weight: W, text: [
    `Chapter sisters orbit Tiffany's warmth — court by sorority gravity, gossip and reverence.`,
  ]},
  { when: { studentId: 13, stageMin: 10 }, weight: W, text: [
    `Daisy's court gathers with casserole logic — everyone fed, everyone near, everyone hers.`,
  ]},
]);

registerModuleVariants('set.enorm', [
  { when: { studentId: 15, stageMin: 11 }, weight: W, text: [
    `Lilith's presence arrives before touch — predator mass, room reorganized around appetite.`,
  ]},
  { when: { studentId: 8, stageMin: 10 }, weight: W, text: [
    `Maya's warmth reaches you first — quiet enormity, stillness with weight.`,
  ]},
  { when: { studentId: 0, stageMin: 10 }, weight: W, text: [
    `Brittany fills the threshold — captain-scale mass, heat and pride before words.`,
  ]},
]);
