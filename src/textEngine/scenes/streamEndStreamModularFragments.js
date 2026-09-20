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

registerPool('stream.scene.tapOutBreath', [
  {
    when: {},
    weight: 2,
    text: [
      'She taps out on camera — breath shallow, belly vast, chat screaming FEED HER anyway.',
      'Fullness wins the round; ring light catches the tremor in her hands before the overlay cuts.',
      'Late-semester tap-outs sound like honesty: too full, too vast, still weirdly proud.',
      'The challenge ends; appetite does not — growth as lifestyle even when stamina surrenders.',
      'Mic picks up a shaky exhale; wellness framing dies while the VOD keeps rolling.',
    ],
  },
]);

registerPool('stream.scene.tapOutChat', [
  {
    when: {},
    weight: 2,
    text: [
      'Mods spam hearts; clip requests land before she can sit back.',
      'Chat types she\'s done; donations argue she could do one more bite.',
      'Timeline floods with belly emojis — parasocial hunger outlasting her stamina.',
      'Someone posts a delivery link; she laughs once and shakes her head, still full.',
      'The tap-out is content; the afterglow is appetite metrics ticking upward.',
    ],
  },
]);

const TAP_LATE = '{stream.scene.tapOutBreath} {stream.scene.tapOutChat|prefix: }';

for (const reason of ['stamina', 'fullness', 'performance']) {
  registerModuleVariants(`stream.tapOut.${reason}`, [
    {
      when: { weekMin: 22 },
      weight: 7,
      priority: 7,
      text: [TAP_LATE],
    },
    {
      when: { weekMin: 14 },
      weight: 4,
      priority: 4,
      text: [TAP_LATE],
    },
  ]);
}

registerPool('stream.scene.betweenRoundGlow', [
  {
    when: {},
    weight: 2,
    text: [
      'Between rounds she catches her breath — belly loud in the mic, ring light kind on sweat and fullness.',
      'Late-semester stream cadence: chew, swallow, chat scream, repeat — growth as lifestyle on a timer.',
      'Challenge pauses; appetite does not — she wipes her mouth and grins like seconds are already queued.',
      'Hall Ambiance is a memory; only mods, donations, and the soft creak of her chair under weight.',
      'Wellness framing dropped hours ago; honesty tastes like sugar and performance metrics.',
    ],
  },
]);

registerPool('stream.scene.betweenRoundChat', [
  {
    when: {},
    weight: 2,
    text: [
      'Chat floods clip timestamps; she reads the thirst aloud and pretends to scold them.',
      'Tips ping mid-breath — parasocial hunger keeping pace with her chewing.',
      'Someone posts a delivery link; she laughs once and says "after this round" like a promise.',
      'Mods pin FEED HER again; she rolls her eyes and leans into the bit because it pays.',
      'The overlay counts down; appetite metrics climb even while the challenge rests.',
    ],
  },
]);

const BETWEEN_LATE = '{stream.scene.betweenRoundGlow} {stream.scene.betweenRoundChat|prefix: }';

registerModuleVariants('stream.betweenRound', [
  {
    when: { weekMin: 22 },
    weight: 9,
    priority: 9,
    text: [BETWEEN_LATE],
  },
  {
    when: { weekMin: 14 },
    weight: 5,
    priority: 5,
    text: [BETWEEN_LATE],
  },
]);

registerPool('stream.scene.roundStartPulse', [
  {
    when: {},
    weight: 2,
    text: [
      'Round clock resets — she squares her shoulders, belly leading, mic hot, challenge loading.',
      'Late-semester round start: appetite already honest, performance about to get louder.',
      'Ring light flares; she inhales like seconds are currency and chat is the bank.',
      'Wellness framing gone — only countdown, chewing, and growth as lifestyle on broadcast.',
      'Hall Ambiance miles away; Destiny becomes the room: vast, fed, ready to perform hunger.',
    ],
  },
]);

registerPool('stream.scene.roundStartChat', [
  {
    when: {},
    weight: 2,
    text: [
      'Chat spikes before the first bite — FEED HER scrolls like a starter pistol.',
      'Mods drop emote bombs; tips tick upward just from her leaning into frame.',
      'Clip hunters ready; she winks once and the timeline loses its mind.',
      'Parasocial energy primes the round — they want a show, she wants portions.',
      'Overlay resets; appetite metrics climb before the challenge even names itself.',
    ],
  },
]);

const ROUND_START_LATE = '{stream.scene.roundStartPulse} {stream.scene.roundStartChat|prefix: }';

registerModuleVariants('stream.roundStart', [
  {
    when: { weekMin: 22 },
    weight: 9,
    priority: 9,
    text: [ROUND_START_LATE],
  },
  {
    when: { weekMin: 14 },
    weight: 5,
    priority: 5,
    text: [ROUND_START_LATE],
  },
]);
