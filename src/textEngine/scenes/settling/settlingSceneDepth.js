// The Squad — Lead: A3 Immobility | Support: A5 Editor
// Per-student depth on settling immobility pools (care/socialize/feed/weigh).
import { registerModuleVariants } from '../../engine.js';

const W = 4;

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
    `Daisy blesses the spread and begins — Southern hospitality at leviathan scale.`,
  ]},
  { when: { studentId: 17, stageMin: 10 }, weight: W, text: [
    `Indiana grins at the haul — "Treasure trove," he says, already eating like excavation.`,
  ]},
]);

registerModuleVariants('set.weigh.react', [
  { when: { studentId: 1, stageMin: 10 }, weight: W, text: [
    `Madeline logs {subject.lbs} mentally, then lets satisfaction win. "Publishable," she murmurs.`,
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
