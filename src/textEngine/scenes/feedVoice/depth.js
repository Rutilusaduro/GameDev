// The Squad — Lead: A2 Psych | Support: A5 Editor
// Wildcard depth for feed.voice fallback (Pass 29).
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('feed.voice', [{ when: {}, text: [
  '{hunger.voice}',
  '{hunger.physical} {hunger.voice}',
] }]);
