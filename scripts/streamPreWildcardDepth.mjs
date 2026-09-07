// Pad stream.pre.* wildcard fallbacks to ≥3 texts (lint volume floor).
// Run: node scripts/streamPreWildcardDepth.mjs
import { readFileSync, writeFileSync } from 'fs';

const TARGET = 3;
const FRAGMENTS = 'src/textEngine/scenes/streamPreStream/fragments.js';
const INDEX = 'src/textEngine/scenes/streamPreStream/index.js';

/** @type {Record<string, string[]>} */
const PAD = {
  'stream.pre.outfit.casual.c1': [
    'Black tee, comfy shorts, headset on — standard Destiny loadout before she goes live.',
    'She checks the camera preview, tugs her shirt flat, and shrugs like this is just another Tuesday stream.',
  ],
  'stream.pre.outfit.casual.c2': [
    'The hem has started riding up when she sits, leaving a thin band of skin above her shorts.',
    'Her shorts hug her hips a little closer than they did at the start of the semester.',
  ],
  'stream.pre.outfit.casual.c3': [
    'Her shorts sit lower on her hips than they used to.',
    'Fabric tension at the waistband — subtle, new, impossible to ignore.',
  ],
  'stream.pre.outfit.casual.line': [
    '"Same fit, same vibe. Chat knows what they\'re getting."',
    '"Not dressing up. I\'m here to eat, not walk a runway."',
  ],
  'stream.pre.outfit.revealing.c1': [
    'Crop top and short shorts — more skin than her usual hoodie uniform, deliberate.',
    'She picked the revealing set on purpose; the monitor catches every curve she\'s testing for chat.',
  ],
  'stream.pre.outfit.revealing.c2': [
    'The outfit leaves her midriff bare; she keeps catching herself in the reflection.',
    'More skin on camera than last month — she pretends that wasn\'t intentional.',
  ],
  'stream.pre.outfit.revealing.line': [
    '"A little extra for the pre-show. Don\'t screenshot… actually, do."',
    '"Chat wanted thirst. I\'m delivering before we\'re even live."',
  ],
  'stream.pre.outfit.branded.c1': [
    'Sponsor gear on, logo facing out — she gives the camera a practiced half-turn.',
    'Promo fit check: snug, branded, good enough for warm-up duty.',
  ],
  'stream.pre.outfit.branded.line': [
    '"Rep the brand, get paid to eat — best deal on campus."',
    '"Fit\'s tight. Chat, tell them it still works."',
  ],
  'stream.pre.bodyCheck.quick.c1': [
    'Monitor glance, hand on stomach, done — no performance, just habit.',
    'She pats her belly once, exhales, and turns back to chat.',
  ],
  'stream.pre.bodyCheck.quick.line': [
    '"Quick inventory. Still growing. Still streaming."',
    '"Body check done. You can stare when we\'re live too."',
  ],
  'stream.pre.bodyCheck.thorough.c1': [
    'Hands on her middle, slow squeeze, watching how the soft flesh responds in the preview.',
    'She kneads her stomach with quiet curiosity — learning how much there is to hold.',
  ],
  'stream.pre.bodyCheck.thorough.c2': [
    'Her fingers sink into the plush give with a fascinated press.',
    'A soft crease forms where she squeezes — she watches it fade slowly.',
  ],
  'stream.pre.bodyCheck.thorough.line': [
    '"Okay. That\'s where we\'re at today. Honest stream, honest belly."',
    '"Touch-test complete. It\'s getting softer. I\'m not mad about it."',
  ],
  'stream.pre.bodyCheck.showoff.c1': [
    'She turns for the camera with performer posture — chin up, belly presented.',
    'Deliberate pose: hand on hip, other tracing the curve of her stomach for chat.',
  ],
  'stream.pre.bodyCheck.showoff.c2': [
    'She grins at the monitor like she already knows what the emotes will do.',
    'A slow pat to her belly — showmanship, not apology.',
  ],
  'stream.pre.bodyCheck.showoff.line': [
    '"Full send on the preview. Tips if you\'re impressed."',
    '"Tour starts now. Pay attention."',
  ],
  'stream.pre.snack.skip.c1': [
    'Snacks in frame. She pushes them away with theatrical discipline.',
    'She eyes the plate, winces, and deliberately looks back at chat instead.',
  ],
  'stream.pre.snack.skip.line': [
    '"No pre-gaming. I want to be hungry when the real food lands."',
    '"Saving appetite for content. Try to respect the grind."',
  ],
  'stream.pre.snack.light.c1': [
    'Small bites between mic checks — casual, unhurried, already in stream mode.',
    'She nibbles while scrolling chat, licking salt off her fingers without thinking.',
  ],
  'stream.pre.snack.light.c2': [
    'Soft chewing sounds into the mic — she doesn\'t mute them.',
    'Each bite is small; her appetite still reads hungry on camera.',
  ],
  'stream.pre.snack.light.line': [
    '"Little snack. Little warm-up. Big plans later."',
    '"Don\'t call it a binge yet. It\'s… research."',
  ],
  'stream.pre.snack.heavy.c1': [
    'Takeout open, chewing before the countdown — warm-up calories already in motion.',
    'She\'s mid-bite when she notices the camera; she doesn\'t stop chewing.',
  ],
  'stream.pre.snack.heavy.c2': [
    'Sauce on her fingers; she sucks them clean without breaking eye contact with chat.',
    'The desk is already littered with wrappers — preamble to the main event.',
  ],
  'stream.pre.snack.heavy.line': [
    '"Couldn\'t wait. Chat\'s late anyway. I\'m not."',
    '"Pre-gaming counts as content if I\'m on camera, right?"',
  ],
  'stream.pre.warmup.skip.c1': [
    'She skips the banter beat and leans straight into the mic.',
    'No preamble — she\'s already in stream voice, chat be damned.',
  ],
  'stream.pre.warmup.skip.line': [
    '"Straight to business. Chat better keep up."',
    '"No warm-up today. Hunger doesn\'t wait."',
  ],
  'stream.pre.warmup.stretch.c1': [
    'Shoulder roll, neck pop, one hand absent on her stomach — routine.',
    'Quick stretches at the desk, breath deep, body waking up for the session.',
  ],
  'stream.pre.warmup.stretch.line': [
    '"Loosen up before we feed the beast."',
    '"Body\'s awake. Appetite\'s awake. Good combo."',
  ],
  'stream.pre.warmup.eat.c1': [
    'Practice bites while she scrolls chat — nodding at comments between chews.',
    'She eats slowly off-camera at first, then remembers the mic is hot.',
  ],
  'stream.pre.warmup.eat.line': [
    '"Gotta get into the zone. Eating counts as prep."',
    '"Warm-up bites. Real bites coming later."',
  ],
  'stream.pre.setup.minimal.c1': [
    'Mic tap, camera wiggle, live — minimum viable production.',
    'One light adjusted, one shrug, stream started.',
  ],
  'stream.pre.setup.minimal.line': [
    '"Good enough. Let\'s feed chat something worth watching."',
    '"Production value: functional. Appetite value: premium."',
  ],
  'stream.pre.setup.comfort.c1': [
    'Pillows arranged, snacks in reach, chair tested twice — comfort first.',
    'She builds her nest at the desk: drinks, napkins, food within lazy arm\'s length.',
  ],
  'stream.pre.setup.comfort.line': [
    '"If I don\'t set this up right, I\'ll regret it mid-challenge."',
    '"Comfort prep complete. Now the fun part."',
  ],
  'stream.pre.setup.production.c1': [
    'Lights dialed, overlay checked, preview gleaming — she wants it pretty before she feasts.',
    'Full production pass: filters, sponsor slot, mic levels — then she nods, satisfied.',
  ],
  'stream.pre.setup.production.line': [
    '"Pretty setup for pretty destruction. Let\'s go."',
    '"If we\'re on camera, we\'re doing it right."',
  ],
};

const COMPOSER_PERMUTATIONS = {
  'stream.pre.outfit.casual': [
    '{stream.pre.outfit.casual.c1} {stream.pre.outfit.casual.c2} {stream.pre.outfit.casual.c3}\n\n{stream.pre.outfit.casual.line}',
    '{stream.pre.outfit.casual.c2} {stream.pre.outfit.casual.c3}\n\n{stream.pre.outfit.casual.c1}\n\n{stream.pre.outfit.casual.line}',
    '{stream.pre.outfit.casual.c1}\n\n{stream.pre.outfit.casual.c2} {stream.pre.outfit.casual.c3}\n\n{stream.pre.outfit.casual.line}',
  ],
  'stream.pre.outfit.revealing': [
    '{stream.pre.outfit.revealing.c1} {stream.pre.outfit.revealing.c2}\n\n{stream.pre.outfit.revealing.line}',
    '{stream.pre.outfit.revealing.c2}\n\n{stream.pre.outfit.revealing.c1}\n\n{stream.pre.outfit.revealing.line}',
    '{stream.pre.outfit.revealing.c1}\n\n{stream.pre.outfit.revealing.line}\n\n{stream.pre.outfit.revealing.c2}',
  ],
  'stream.pre.outfit.branded': [
    '{stream.pre.outfit.branded.c1}\n\n{stream.pre.outfit.branded.line}',
    '{stream.pre.outfit.branded.line}\n\n{stream.pre.outfit.branded.c1}',
    '{stream.pre.outfit.branded.c1} {stream.pre.outfit.branded.line}',
  ],
  'stream.pre.bodyCheck.quick': [
    '{stream.pre.bodyCheck.quick.c1}\n\n{stream.pre.bodyCheck.quick.line}',
    '{stream.pre.bodyCheck.quick.line}\n\n{stream.pre.bodyCheck.quick.c1}',
    '{stream.pre.bodyCheck.quick.c1} {stream.pre.bodyCheck.quick.line}',
  ],
  'stream.pre.bodyCheck.thorough': [
    '{stream.pre.bodyCheck.thorough.c1} {stream.pre.bodyCheck.thorough.c2}\n\n{stream.pre.bodyCheck.thorough.line}',
    '{stream.pre.bodyCheck.thorough.c2} {stream.pre.bodyCheck.thorough.c1}\n\n{stream.pre.bodyCheck.thorough.line}',
    '{stream.pre.bodyCheck.thorough.c1}\n\n{stream.pre.bodyCheck.thorough.line}\n\n{stream.pre.bodyCheck.thorough.c2}',
  ],
  'stream.pre.bodyCheck.showoff': [
    '{stream.pre.bodyCheck.showoff.c1} {stream.pre.bodyCheck.showoff.c2}\n\n{stream.pre.bodyCheck.showoff.line}',
    '{stream.pre.bodyCheck.showoff.c2}\n\n{stream.pre.bodyCheck.showoff.c1}\n\n{stream.pre.bodyCheck.showoff.line}',
    '{stream.pre.bodyCheck.showoff.c1}\n\n{stream.pre.bodyCheck.showoff.line}',
  ],
  'stream.pre.snack.skip': [
    '{stream.pre.snack.skip.c1}\n\n{stream.pre.snack.skip.line}',
    '{stream.pre.snack.skip.line}\n\n{stream.pre.snack.skip.c1}',
    '{stream.pre.snack.skip.c1} {stream.pre.snack.skip.line}',
  ],
  'stream.pre.snack.light': [
    '{stream.pre.snack.light.c1} {stream.pre.snack.light.c2}\n\n{stream.pre.snack.light.line}',
    '{stream.pre.snack.light.c2} {stream.pre.snack.light.c1}\n\n{stream.pre.snack.light.line}',
    '{stream.pre.snack.light.c1}\n\n{stream.pre.snack.light.line}',
  ],
  'stream.pre.snack.heavy': [
    '{stream.pre.snack.heavy.c1} {stream.pre.snack.heavy.c2}\n\n{stream.pre.snack.heavy.line}',
    '{stream.pre.snack.heavy.c2} {stream.pre.snack.heavy.c1}\n\n{stream.pre.snack.heavy.line}',
    '{stream.pre.snack.heavy.c1}\n\n{stream.pre.snack.heavy.line}',
  ],
  'stream.pre.warmup.skip': [
    '{stream.pre.warmup.skip.c1}\n\n{stream.pre.warmup.skip.line}',
    '{stream.pre.warmup.skip.line}\n\n{stream.pre.warmup.skip.c1}',
    '{stream.pre.warmup.skip.c1} {stream.pre.warmup.skip.line}',
  ],
  'stream.pre.warmup.stretch': [
    '{stream.pre.warmup.stretch.c1}\n\n{stream.pre.warmup.stretch.line}',
    '{stream.pre.warmup.stretch.line}\n\n{stream.pre.warmup.stretch.c1}',
    '{stream.pre.warmup.stretch.c1} {stream.pre.warmup.stretch.line}',
  ],
  'stream.pre.warmup.eat': [
    '{stream.pre.warmup.eat.c1}\n\n{stream.pre.warmup.eat.line}',
    '{stream.pre.warmup.eat.line}\n\n{stream.pre.warmup.eat.c1}',
    '{stream.pre.warmup.eat.c1} {stream.pre.warmup.eat.line}',
  ],
  'stream.pre.setup.minimal': [
    '{stream.pre.setup.minimal.c1}\n\n{stream.pre.setup.minimal.line}',
    '{stream.pre.setup.minimal.line}\n\n{stream.pre.setup.minimal.c1}',
    '{stream.pre.setup.minimal.c1} {stream.pre.setup.minimal.line}',
  ],
  'stream.pre.setup.comfort': [
    '{stream.pre.setup.comfort.c1}\n\n{stream.pre.setup.comfort.line}',
    '{stream.pre.setup.comfort.line}\n\n{stream.pre.setup.comfort.c1}',
    '{stream.pre.setup.comfort.c1} {stream.pre.setup.comfort.line}',
  ],
  'stream.pre.setup.production': [
    '{stream.pre.setup.production.c1}\n\n{stream.pre.setup.production.line}',
    '{stream.pre.setup.production.line}\n\n{stream.pre.setup.production.c1}',
    '{stream.pre.setup.production.c1} {stream.pre.setup.production.line}',
  ],
};

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function extractWildcardTextBlocks(body) {
  const blocks = [];
  const re = /\{\s*when:\s*\{\s*\}[^}]*text:\s*/g;
  let m;
  while ((m = re.exec(body))) {
    const start = m.index + m[0].length;
    if (body[start] === '(') continue; // function text — skip
    if (body[start] === '[') {
      let depth = 0;
      let i = start;
      for (; i < body.length; i++) {
        if (body[i] === '[') depth++;
        else if (body[i] === ']') {
          depth--;
          if (depth === 0) {
            blocks.push({ start, end: i + 1, inner: body.slice(start + 1, i) });
            break;
          }
        }
      }
    } else if (body[start] === "'" || body[start] === '"') {
      const q = body[start];
      let i = start + 1;
      for (; i < body.length; i++) {
        if (body[i] === '\\') { i++; continue; }
        if (body[i] === q) {
          blocks.push({ start, end: i + 1, inner: body.slice(start + 1, i) });
          break;
        }
      }
    }
  }
  return blocks;
}

function parseStrings(inner) {
  const out = [];
  const re = /(['"])((?:\\.|(?!\1)[^\\])*)\1/g;
  let m;
  while ((m = re.exec(inner))) {
    out.push(m[2].replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\\\/g, '\\'));
  }
  return out;
}

function padFragments(src) {
  let patched = 0;
  const result = src.replace(/registerPool\('([^']+)',\s*\[([\s\S]*?)\]\s*\);/g, (block, poolName, body) => {
    const extras = PAD[poolName];
    if (!extras) return block;

    const blocks = extractWildcardTextBlocks(body);
    if (!blocks.length) return block;

    let newBody = body;
    let offset = 0;
    for (const b of blocks) {
      const inner = b.inner;
      const strings = parseStrings(inner);
      if (!strings.length) continue;
      const merged = [...strings];
      for (const line of extras) {
        if (!merged.includes(line)) merged.push(line);
      }
      while (merged.length < TARGET) merged.push(merged[merged.length - 1]);
      const formatted = `[${merged.map((s) => `'${esc(s)}'`).join(', ')}]`;
      const before = newBody.slice(0, b.start + offset);
      const after = newBody.slice(b.end + offset);
      newBody = before + formatted + after;
      offset += formatted.length - (b.end - b.start);
      patched++;
    }
    return `registerPool('${poolName}', [${newBody}]);`;
  });
  return [result, patched];
}

function padIndex(src) {
  let patched = 0;
  for (const [pool, perms] of Object.entries(COMPOSER_PERMUTATIONS)) {
    const re = new RegExp(
      `registerPool\\('${pool.replace(/\./g, '\\.')}',\\s*\\[\\s*\\{\\s*when:\\s*\\{\\s*\\},\\s*text:\\s*\\[[^\\]]*\\]\\s*\\}\\s*\\]\\s*\\);`,
      'g',
    );
    const formatted = perms.map((p) => `'${esc(p)}'`).join(', ');
    const replacement = `registerPool('${pool}', [\n  { when: {}, text: [${formatted}] },\n]);`;
    if (re.test(src)) {
      src = src.replace(re, replacement);
      patched++;
    }
  }
  return { src, patched };
}

let fragSrc = readFileSync(FRAGMENTS, 'utf8');
const [newFrag, fragPatched] = padFragments(fragSrc);
writeFileSync(FRAGMENTS, newFrag);

let indexSrc = readFileSync(INDEX, 'utf8');
const indexResult = padIndex(indexSrc);
writeFileSync(INDEX, indexResult.src);

console.log(`Patched ${fragPatched} fragment wildcard block(s), ${indexResult.patched} composer pool(s).`);
