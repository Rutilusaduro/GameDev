// The Squad — Lead: A1 Mobile | Support: A5 Editor
// Stage-keyed depth on collab stream fragment pools (Kylie × partner).
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('collab.reveal.kylie.body', [
  { when: { stageMin: 8 }, weight: 4, text: [
    `At {subject.lbs} pounds Kylie fills the frame — belly, thighs, content creator as architecture.`,
    `{subject.lbs} lbs on camera — mass unmistakable, chat typing digits in caps.`,
  ]},
  { when: { stageMin: 5, stageMax: 7 }, weight: 3, text: [
    `Kylie's curves sharpen on stream — {subject.lbs} pounds, angles chosen, hunger visible.`,
  ]},
  { when: { collabStageMin: 3 }, weight: 3, text: [
    `Mid-stream reveal: {subject.lbs} pounds lands and the chat erupts before you finish.`,
  ]},
]);

registerModuleVariants('collab.reveal.kylie.chat', [
  { when: { collabStageMin: 4 }, weight: 3, text: [
    `Chat unanimous: more. Donations spike. Kylie grins — this is the era.`,
    `Viewers do math in real time. Regulars cheer. Newcomers subscribe.`,
  ]},
]);

registerModuleVariants('collab.reveal.partner.close', [
  { when: { stageMin: 6 }, weight: 3, text: [
    `{partnerName} exhales after the number — belly touched once, silence as content.`,
  ]},
  { when: { studentId: 2 }, weight: 4, text: [
    `Kylie watches {partnerName} say it — mentor energy, hunger trending together.`,
  ]},
]);

registerModuleVariants('collab.zoom.mass', [
  { when: { stageMin: 9 }, weight: 4, text: [
    `Camera barely fits them — {subject.lbs} and {partnerLbs}, mass as spectacle, appetite architecture.`,
  ]},
  { when: { stageMin: 6 }, weight: 3, text: [
    `Close-up: two bellies forward, both heavier than stream start, chat losing its mind.`,
  ]},
]);

registerModuleVariants('collab.push.good.hard', [
  { when: { collabStageMin: 4 }, weight: 3, text: [
    `Both visibly fuller — breath shallow, pace fierce, bellies pressing the table edge.`,
  ]},
  { when: { studentId: 2 }, weight: 4, text: [
    `Kylie pushes pace for content — partner matching, fullness climbing on camera.`,
  ]},
]);

registerModuleVariants('collab.push.good.chat', [
  { when: { collabStageMin: 3 }, weight: 3, text: [
    `Chat demands another course. Donations jump. You deliver — momentum holds.`,
  ]},
]);

registerModuleVariants('collab.push.bad.recover', [
  { when: { studentId: 2 }, weight: 4, text: [
    `Kylie recovers on camera — "We're fine," she says. Chat believes her. Eating resumes.`,
  ]},
]);

registerModuleVariants('collab.crash.open', [
  { when: { collabStageMin: 4 }, weight: 3, text: [
    `Feed dies mid-bite — both still at table, chat thinning, momentum gone cold.`,
  ]},
]);

registerModuleVariants('collab.crash.gain', [
  { when: { studentId: 2, kylieGainMin: 3 }, weight: 4, text: [
    `Stream dead but Kylie gained {kylieGain} lbs — offline growth, chat will clip it later.`,
  ]},
  { when: { partnerGainMin: 3 }, weight: 3, text: [
    `{partnerName} still gained {partnerGain} pounds. The numbers outlive the connection.`,
  ]},
]);

registerModuleVariants('collab.stream.reveal.kylie', [
  { when: { stageMin: 7 }, weight: 3, text: [
    `{collab.reveal.open} {collab.reveal.kylie.body} {collab.reveal.kylie.chat}`,
  ]},
]);

registerModuleVariants('collab.stream.push.good', [
  { when: { collabStageMin: 5 }, weight: 3, text: [
    `{collab.push.good.hard} {collab.push.good.chat}`,
  ]},
]);
