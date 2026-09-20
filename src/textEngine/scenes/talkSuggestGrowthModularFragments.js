// Floor talk — suggest growth composable beats (late-game; pass 57 is bridge-only).
import { registerPool, registerModuleVariants } from '../engine.js';

registerPool('talk.suggest.growthAmbition', [
  {
    when: {},
    weight: 2,
    text: [
      'You frame it as momentum — next size, next milestone, next proud inch the hall can see.',
      'Growth sounds like a plan when you say it; she hears permission dressed as affection.',
      'Late-semester bodies answer faster; the suggestion lands like a dare she already wanted.',
      'Scale numbers glow in her imagination before the tray even arrives.',
      'Hall Ambiance thins; the room holds only your voice and the soft promise of more.',
    ],
  },
]);

registerPool('talk.suggest.growthPraise', [
  {
    when: {},
    weight: 2,
    text: [
      '{subject.name} meets your eyes — hungry for approval as much as portions.',
      'You praise curves like policy; she cooperates like the floor elected her feedee.',
      'Fabric strains when she breathes; you both pretend not to notice, then lean into it.',
      'Every pound you name out loud feels like a gift she can wear in the hallway.',
      'Wellness framing stays thin; pride in getting bigger stays thick and unmistakable.',
    ],
  },
]);

const GROWTH_SKELETON = '{talk.suggest.growthAmbition|prefix:} {talk.suggest.growthPraise|prefix: }';

const BRANCHES = ['b00', 'b01', 'b10', 'b11', 'b20', 'b21'];

function growthKeys() {
  const keys = ['talk.suggest_growth'];
  for (const b of BRANCHES) {
    keys.push(`talk.suggest_growth.${b}`);
    const maxF = b === 'b00' ? 4 : 3;
    for (let f = 1; f <= maxF; f += 1) {
      keys.push(`talk.suggest_growth.${b}._f${f}`);
    }
  }
  return keys;
}

for (const key of growthKeys()) {
  registerModuleVariants(key, [
    {
      when: { weekMin: 22 },
      weight: 6,
      priority: 6,
      text: [GROWTH_SKELETON],
    },
    {
      when: { weekMin: 18 },
      weight: 4,
      priority: 4,
      text: [GROWTH_SKELETON],
    },
  ]);
}
