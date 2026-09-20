// Destiny eating_streamer — composable late-game beats (The Squad — A2 Psych / A5 Editor).
import { registerPool, registerModuleVariants } from '../../engine.js';
import { EVOLVED_EVENTS } from '../../../gameData/evolvedEvents.js';

registerPool('evolved.scene.streamRoom', [
  {
    when: {},
    weight: 2,
    text: [
      'Ring-light heat paints her cheeks; delivery bags rustle off-camera while the viewer count climbs before the first bite.',
      'Overlay banners stack — sponsor, timer, chat donate train — and Destiny treats scrutiny like applause she earned.',
      'The mic catches every soft swallow; she stopped apologizing for appetite the night the tips outpaced her old high score.',
      'Someone whispers in chat that she looks fuller than last stream; she reads it aloud and smiles like growth is the content.',
    ],
  },
]);

registerPool('evolved.scene.streamStakes', [
  {
    when: {},
    weight: 2,
    text: [
      'Every bite lands on the VOD — contagion dressed as entertainment, growth as lifestyle for anyone still watching.',
      'The focus bar waits like a boss fight; winning means growing into the frame until the chair complains.',
      'Chat donates to see her fail full; she accepts because failure tastes like seconds and sponsorship.',
      'Late-semester numbers dominate the sidebar — weight, tips, hunger — and she performs like all three are victory.',
    ],
  },
]);

const STREAMER_SKELETON = '{evolved.scene.streamRoom|prefix:} {evolved.scene.streamStakes|prefix: } {evolved.scene.hungerCue|prefix: }';
const ENDING_SKELETON = '{evolved.ending.streamCoda|prefix:} {evolved.ending.relGain|prefix: }';

const streamerStages = EVOLVED_EVENTS.eating_streamer;
if (Array.isArray(streamerStages)) {
  streamerStages.forEach((evDef, stageIdx) => {
    (evDef.phases || []).forEach((_, phaseIdx) => {
      const phaseKey = `evolved.event.eating_streamer.s${stageIdx}.p${phaseIdx}`;
      registerModuleVariants(phaseKey, [
        {
          when: { evolvedFormId: ['eating_streamer'], weekMin: 20 },
          weight: 6,
          priority: 6,
          text: [STREAMER_SKELETON],
        },
      ]);
      const phase = evDef.phases[phaseIdx];
      for (const ch of phase?.choices || []) {
        if (!ch?.id) continue;
        registerModuleVariants(`${phaseKey}.${ch.id}`, [
          {
            when: { evolvedFormId: ['eating_streamer'], weekMin: 18 },
            weight: 5,
            priority: 5,
            text: ['{evolved.choice.chatReact|prefix:} {evolved.choice.bodyResult|prefix: }'],
          },
        ]);
      }
    });
    (evDef.endings || []).forEach((_, endingIdx) => {
      registerModuleVariants(`evolved.event.eating_streamer.s${stageIdx}.end${endingIdx}`, [
        {
          when: { evolvedFormId: ['eating_streamer'], weekMin: 18 },
          weight: 5,
          priority: 5,
          text: [ENDING_SKELETON],
        },
      ]);
    });
  });
}
