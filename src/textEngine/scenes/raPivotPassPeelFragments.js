// Pass 111/112 sub-keys not covered by conference/activity loops — late modular peel.
import { registerModuleVariants } from '../engine.js';

const HR_CHOICE = '{homeroom.scene.choiceWarmth|prefix:} {homeroom.scene.raStance|prefix: }';
const HR_ACTIVITY = '{homeroom.activity.kitchenHeat|prefix:} {homeroom.activity.communityWarmth|prefix: } {homeroom.activity.suspicion|prefix: }';
const EVOLVED_ACT = '{evolved.scene.atmosphere|prefix:} {evolved.scene.stakes|prefix: } {evolved.scene.hungerCue|prefix: }';

function lateVariants(textArr) {
  return [
    {
      when: { weekMin: 20 },
      weight: 7,
      priority: 8,
      text: textArr,
    },
    {
      when: { weekMin: 14 },
      weight: 4,
      priority: 5,
      text: textArr,
    },
  ];
}

registerModuleVariants('homeroom.conference.Bri.brought_something', lateVariants([HR_CHOICE]));

registerModuleVariants('homeroom.activity.parent_meeting.p0.curriculum', lateVariants([HR_ACTIVITY]));

registerModuleVariants('evolved.activity.feedee_creator.s1', [
  {
    when: { weekMin: 20, evolvedFormId: ['feedee_creator'], evolvedStageIdx: [1] },
    weight: 7,
    priority: 6,
    text: [EVOLVED_ACT],
  },
  {
    when: { weekMin: 14, evolvedFormId: ['feedee_creator'], evolvedStageIdx: [1] },
    weight: 4,
    priority: 4,
    text: [EVOLVED_ACT],
  },
]);

registerModuleVariants('evolved.activity.sumo.s3', [
  {
    when: { weekMin: 20, evolvedFormId: ['sumo'], evolvedStageIdx: [3] },
    weight: 7,
    priority: 6,
    text: [EVOLVED_ACT],
  },
  {
    when: { weekMin: 14, evolvedFormId: ['sumo'], evolvedStageIdx: [3] },
    weight: 4,
    priority: 4,
    text: [EVOLVED_ACT],
  },
]);
