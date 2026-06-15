// ═══════════════════════════════════════════════════════════════
// GROWTH EVENT — per-stage crossing lexicon (stages 2–11)
// Experiential thresholds — no stage-name labels as headers.
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../../engine.js';

// FULL SENTENCE — one cell per endStage 2-11
registerPool('grow.crossing', [
  { when: { endStage: 2 }, text: [
    'Her waist softens first — the first curve that refuses to hide.',
    'Clothes that used to hang loose now catch at her hips.',
    'The mirror stops pretending nothing changed.',
  ] },
  { when: { endStage: 3 }, text: [
    'Her face rounds out; denial has to work harder now.',
    'Waistbands dig where they used to slide. Thighs brush when she walks.',
    'Portions finally show — belly and cheeks both fuller than last month.',
    'Shirts tug at the middle; she keeps adjusting without thinking.',
    'The dining hall portions leave evidence she can no longer explain away.',
  ] },
  { when: { endStage: 4 }, text: [
    'A real belly settles over her frame — movement slower, shirts riding up.',
    'She waddles a little now without meaning to; the gain has a center of gravity.',
    'Stairs take more breath than they used to.',
  ] },
  { when: { endStage: 5 }, text: [
    'Chairs complain when she sits; stairs wind her before she reaches the top.',
    'Gravity feels personal — belly forward, arms thicker, every step heavier.',
    'Her body announces itself in doorways she used to pass through easily.',
  ] },
  { when: { endStage: 6 }, text: [
    'Rolls shift when she moves; breath audible on any real effort.',
    'The room feels smaller around her — she owns more space than last week.',
    'Standard seating protests; she reads the waddle in every reflection.',
    'Her belly rests forward now, impossible to tuck or hide.',
    'Movement is deliberate; jiggle follows every shift of weight.',
  ] },
  { when: { endStage: 7 }, text: [
    'Her belly hangs lower; doorways require planning and angle.',
    'Every step is a commitment — furniture built for smaller people groans.',
    'Standard chairs are a memory; she needs room and leverage to stand.',
  ] },
  { when: { endStage: 8 }, text: [
    'Getting up requires leverage and will; her belly rests on her thighs like furniture.',
    'She fills a frame that used to hold a person and a life — couch-sized, effort-sized.',
    'The world rearranges around her mass; wide paths are no longer optional.',
    'Car doors and armchairs are negotiations she loses politely.',
    'Her body takes a room before her personality does.',
  ] },
  { when: { endStage: 9 }, text: [
    'Hallways feel narrower against her hips; presence takes the room before she speaks.',
    'Reinforced chairs exist for a reason now — standard furniture surrenders.',
    'Crossing campus is shuffle and commitment; every step announces her.',
  ] },
  { when: { endStage: 10 }, text: [
    'Movement is nearly gone — warmth and spread pinned by her own abundance.',
    'The room works around her now; she is the landscape it accommodates.',
    'She is immobile softness at the center of everything.',
    'Getting anywhere is theory; staying put is the practical choice.',
    'Her mass has a gravity of its own — objects orbit or yield.',
  ] },
  { when: { endStage: 11 }, text: [
    'The air feels thicker around her — scale past ordinary proportion.',
    'Rolls without end; power without mobility; mythic heaviness settled in place.',
    'She has crossed into something the building was not designed to hold.',
    'Movement is memory; mass is the present tense.',
    'The ultimate threshold — and still, somehow, growing room remains.',
  ] },
  { when: {}, text: [
    'The gain shows in the mirror before she has words for it.',
    'Something new settles against her ribs — heavier, softer, undeniably hers.',
    'Her body announces the threshold in fabric and breath before her mind catches up.',
  ] },
]);
