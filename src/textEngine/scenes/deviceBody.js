// ═══════════════════════════════════════════════════════════════
// DEVICE BODY OVERRIDES — supersedes word.body when active
// ═══════════════════════════════════════════════════════════════
import { registerModuleVariants } from '../engine.js';
import { stageBucket } from '../engine.js';

const BLOATED_BODY = {
  slight: ['her stomach is visibly distended — round and tight, as if inflated from within'],
  slim: ['her midsection swells outward in a firm, relentless bloat that ignores how small she was yesterday'],
  soft: ['her belly balloons soft and heavy, drum-tight with artificial fullness pressing at her waistband'],
  chubby: ['her stomach dominates her silhouette — enormously bloated, warm, visibly straining every seam'],
  plump: ['her midsection is a vast, taut dome of bloat, rocking slightly when she shifts her weight'],
  heavy: ['her belly hangs forward in a heavy, overfilled swell — unmistakably inflated, not merely fed'],
  fat: ['her enormous stomach presses outward like a filled bladder, skin shiny with relentless internal pressure'],
  veryFat: ['her colossal belly is a bloated globe — so distended she has to breathe around it'],
  enormous: ['her vast midsection billows outward, a monumental swell of device-driven inflation'],
  colossal: ['her belly is an immovable inflated mass, wider than her hips, gleaming with stretched skin'],
  blob: ['her body is mostly bloat now — a monumental inflated center gravity that reshapes everything around it'],
  leviathan: ['her belly is a continent of forced inflation, so vast and drum-tight it redefines her outline'],
};

function bloatedLine(ctx) {
  const bucket = stageBucket((ctx.d.stage ?? 0) + (ctx.d.bodyStageBump ?? 0));
  const rows = BLOATED_BODY;
  const line = rows[bucket] || rows.fat || rows.plump;
  return line[Math.floor(Math.random() * line.length)];
}

registerModuleVariants('word.body', [
  {
    when: { bodyState: 'bloated' },
    priority: 1,
    weight: 5,
    text: [(ctx) => bloatedLine(ctx)],
  },
  {
    when: { bodyState: 'bloated', equippedWaist: 'auto_bloating_belt' },
    priority: 1,
    weight: 6,
    text: [
      (ctx) => `${bloatedLine(ctx)}, the auto-bloating belt cinched tight at her waist`,
      (ctx) => `her waist harness pulses gently while ${bloatedLine(ctx)}`,
    ],
  },
]);
