// Generate hunt/feastDepth.js — pad hunt.feast.* catch-all pools to ≥3 texts.
// Short stage-keyed alternates complement author monoliths (Pass 42).
// Run: node scripts/generateHuntFeastDepth.mjs
import { writeFileSync } from 'fs';

const OUT_PATH = 'src/textEngine/scenes/hunt/feastDepth.js';

const FEAST_ALTS = {
  s0: [
    'Lilith lures him into dim incense and goth bass. One strike — jaw wide, swallow deep — and warmth blooms through her narrow frame into first lush curves.',
    'He thinks he is hunting her. Her throat disagrees. A euphoric shudder spreads softness through hips, breasts, and belly.',
  ],
  s1: [
    'Confidence new on her 5\'6" frame — corset straining, ass swaying. She devours him whole; heat surges into potbelly, thicker thighs, heavier cleavage.',
    'He reaches for plush curves; she engulfs him. The feast leaves her potbellied and voluptuous, hands roaming new fertile weight.',
  ],
  s2: [
    'Potbelly leading, breasts overflowing lace — she whispers him inside. Savage swallow, then belly doming outward, ass and thighs thunderous.',
    'He believes he will conquer her softness. She consumes him instead; ecstasy balloons her into abundant, jiggling excess.',
  ],
  s3: [
    'Massive belly, thunder thighs, corset at limit — velvet voice draws him in. Devoured in wet gulps; colossal gut and pendulous breasts follow.',
    'He sinks hands into yielding fat. Lilith smiles sharp; the feast swells her into sagging, hypnotic abundance.',
  ],
  s4: [
    'She waddles in sumptuous fat — belly rounded, skirt screaming. He drowns in pillowy curves until her jaw takes him; another orgasmic surge of softness.',
    'Husky whisper, black lip bite, then devour. Bliss spreads through heavier paunch, wider hips, sloshing breasts.',
  ],
  s5: [
    'Colossal apron belly, titanic breasts — she beckons with knowing smile. Swallowed whole; molten pleasure fattens her further.',
    'He loses himself in her mass. Lilith hungers darker; the feast leaves her mountainous, fertile, ravenous.',
  ],
  s6: [
    'She squeezes through the door — hyper-voluptuous, furniture groaning. Ravenous smile, impossible swallow, room-shaking expansion.',
    'Waddle, laugh, devour. Belly floor-grazing, corset ripping, thighs crushing — rapture in every new inch.',
  ],
  s7: [
    'Hunger overtakes restraint — bathroom stall, public risk. Cramped devour; belly explodes outward, partitions buckle, shameless moan.',
    'She drags him into tile and noise. Cataclysmic swell smashes the stall; Lilith balloons in raw, fertile ecstasy.',
  ],
  s8: [
    'Common area ambush — belly slams first, smothering warmth. Forced swallow despite struggle; furniture cracks under new mass.',
    'No seduction left, only hunger. She pins and devours; cataclysmic fattening tears clothes and plaster alike.',
  ],
  s9: [
    'Room-bound goddess orders Mia. Awe, touch, then engulf — final surge crushes furniture and dreams alike.',
    'Delivery girl kneads vast curves; Lilith consumes her. Apocalyptic belly fills the room — fertile, immobile, triumphant.',
  ],
  deliveryIntro: [
    'Too large to leave. Hunger orders delivery — knock, silence, recalculation. You smile in the warm dark.',
    'Campus is memory; the hallway theoretical. When the bag arrives, appetite is immediate, enormous, specific.',
  ],
};

function esc(s) {
  return JSON.stringify(s);
}

const lines = [
  '// The Squad — Lead: A2 Psych | Support: A3 Immobility',
  '// Auto-generated — run: node scripts/generateHuntFeastDepth.mjs',
  '// Wildcard depth for hunt.feast.* pools (Pass 42).',
  "import { registerModuleVariants } from '../../engine.js';",
  '',
];

for (const [stage, alts] of Object.entries(FEAST_ALTS)) {
  const key = stage === 'deliveryIntro' ? 'hunt.feast.deliveryIntro' : `hunt.feast.${stage}`;
  lines.push(`registerModuleVariants(${esc(key)}, [{ when: {}, text: [${alts.map(esc).join(', ')}] }]);`);
}

writeFileSync(OUT_PATH, `${lines.join('\n')}\n`);
console.log(`generateHuntFeastDepth: ${Object.keys(FEAST_ALTS).length} pools → ${OUT_PATH}`);
