// Destiny stream sign-off — late-semester modular overlays on endStream tiers.
import { registerPool, registerModuleVariants } from '../engine.js';

registerPool('stream.scene.signoffAir', [
  {
    when: {},
    weight: 2,
    text: [
      'Sign-off lands — chat still hungry, tips still ticking after the camera dies.',
      'Ring light cools; appetite stays hot in the chat scroll and in her belly.',
      'Late-semester streams end like meals: satisfied, overstuffed, already planning seconds.',
      'She exhales into the mic; wellness framing drops and honesty stays on the VOD.',
      'Hall Ambiance is miles away — only ring light, chat, and the soft sound of her breathing around fullness.',
    ],
  },
]);

registerPool('stream.scene.chatAfterglow', [
  {
    when: {},
    weight: 2,
    text: [
      'Donations ping; someone orders delivery to her door before she can log off.',
      'Clip requests flood in — belly, blush, and the moment she admitted she wanted more.',
      'Mods pin the best timestamps; she reads them and laughs, still full from the challenge.',
      'Chat types FEED HER like scripture; she pretends to scold them and does not stop smiling.',
      'The overlay fades but the appetite metrics do not — growth as lifestyle, broadcast and body aligned.',
    ],
  },
]);

const END_LATE = '{stream.scene.signoffAir} {stream.scene.chatAfterglow|prefix: }';

for (const tier of ['excellent', 'good', 'average', 'poor', 'verypoor']) {
  registerModuleVariants(`stream.endStream.${tier}`, [
    {
      when: { weekMin: 22 },
      weight: 7,
      priority: 7,
      text: [END_LATE],
    },
    {
      when: { weekMin: 14 },
      weight: 4,
      priority: 4,
      text: [END_LATE],
    },
  ]);
}
