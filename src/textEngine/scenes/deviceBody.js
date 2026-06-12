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

const FURNITURE_BODY = {
  slight: ['her body is folded into a rigid chair-frame — knees locked, belly presented as a cushioned seat'],
  slim: ['she is rigged into living furniture, posture sculpted until her softening middle becomes the only cushion'],
  soft: ['her plush body fills a furniture harness — every curve arranged to be sat on'],
  chubby: ['she serves as a padded chair, belly and thighs ballooned into upholstery by the rig'],
  plump: ['her frame is locked in furniture pose — a wide, yielding seat of flesh and straps'],
  heavy: ['she is immobilized furniture now, belly spread broad and warm beneath the rig\'s braces'],
  fat: ['her enormous body is shaped into a couch — rolls stacked and secured for multiple occupants'],
  veryFat: ['she is a vast living seat, flesh poured into the rig until comfort depends on constant feeding'],
  enormous: ['her colossal body is furniture first and person second — a monument of cushioned obedience'],
  colossal: ['she sprawls as living architecture, the rig holding tons of her in place for anyone to use'],
  blob: ['she is less person than furnishing — a blob of flesh locked into something you could nap on'],
  leviathan: ['she is monumental living furniture, every pound arranged for weight-bearing humiliation'],
};

function furnitureLine(ctx) {
  const bucket = stageBucket((ctx.d.stage ?? 0) + (ctx.d.bodyStageBump ?? 0));
  const rows = FURNITURE_BODY;
  const line = rows[bucket] || rows.fat || rows.plump;
  return line[Math.floor(Math.random() * line.length)];
}

registerModuleVariants('word.body', [
  {
    when: { bodyState: 'furniture' },
    priority: 1,
    weight: 5,
    text: [(ctx) => furnitureLine(ctx)],
  },
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
