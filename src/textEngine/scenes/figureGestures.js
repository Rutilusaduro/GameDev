// ═══════════════════════════════════════════════════════════════
// FIGURE GESTURES — body-type + stage keyed touch clauses.
// Shared by talk.compliment (fig.bodyGesture) and any scene
// where a girl shows off weight. Body-type routing:
//   hourglass → breast + butt · apple/rotund → belly
//   mom_bod → belly + butt · pear/fertility_goddess → butt
//   voluptuous → all three · straight/athletic → fallback
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../engine.js';

const BODY_GESTURES = [
  { when: {}, text: ["", "", ""] },

  { when: { bodyType: "pear", stageMin: 2, stageMax: 4 }, text: [
    "shifting her weight so her widened hips sway once, self-conscious",
    "pressing her palms to the flare of her hips and exhaling slow",
  ]},
  { when: { bodyType: "pear", stageMin: 5, stageMax: 7 }, weight: 2, text: [
    "cupping the plush swell of her ass and letting her fingers sink in",
    "rolling her hips once so her heavy backside settles with a soft jiggle",
  ]},
  { when: { bodyType: "pear", stageMin: 8, stageMax: 9 }, weight: 2, text: [
    "squeezing both cheeks of her ass together and swaying her hips once, deliberate",
    "cupping the heavy swell of her backside in both hands and giving it a slow squeeze",
  ]},
  { when: { bodyType: "pear", stageMin: 10 }, weight: 3, text: [
    "palming the vast round of her ass and squeezing until soft flesh spills between her fingers",
    "squeezing both heavy cheeks of her backside together and letting them bounce once, eyes on yours",
    "cupping her wide backside in both hands and giving it a slow, shameless squeeze",
  ]},

  { when: { bodyType: "hourglass", stageMin: 2, stageMax: 4 }, text: [
    "adjusting her top over the curve of her chest",
    "pressing her palms to the flare of her hips",
    "smoothing her hands down her waist to where her hips begin to swell",
  ]},
  { when: { bodyType: "hourglass", stageMin: 5, stageMax: 7 }, weight: 2, text: [
    "cupping the heavy swell of her breasts through her top and letting them settle",
    "rolling her hips once so her backside and chest sway in opposite rhythm",
    "tracing the pinch of her waist with both hands before sliding them outward over her curves",
  ]},
  { when: { bodyType: "hourglass", stageMin: 8, stageMax: 9 }, weight: 2, text: [
    "lifting the warm weight of her chest in both hands and releasing it slow",
    "squeezing her plush backside together and swaying once, deliberate",
    "running her palms from bust to hip in one slow, showcasing stroke",
  ]},
  { when: { bodyType: "hourglass", stageMin: 10 }, weight: 3, text: [
    "hefting her heavy breasts up in both palms and letting them settle back with a soft, visible bounce",
    "gathering the vast weight of her hips in her hands and swaying them once, eyes on yours",
    "cupping bust and hip in turn — a slow inventory of everything you're looking at",
  ]},

  { when: { bodyType: "apple", stageMin: 2, stageMax: 4 }, text: [
    "patting the firm forward round of her belly like a satisfied verdict",
    "spreading one palm over the tight apple-curve riding high at her middle",
    "smoothing her shirt over the outward push of her stomach",
  ]},
  { when: { bodyType: "apple", stageMin: 5, stageMax: 7 }, weight: 2, text: [
    "bracing both palms under the heavy forward swell of her belly and lifting slightly",
    "running her hands over the round, high dome of her stomach",
    "pressing her belly forward into her own palms with a quiet, pleased exhale",
  ]},
  { when: { bodyType: "apple", stageMin: 8, stageMax: 9 }, weight: 2, text: [
    "spreading both arms around the vast forward weight of her belly and hugging it once",
    "lifting the heavy apple-round of her stomach and letting it drop back with a slow sway",
  ]},
  { when: { bodyType: "apple", stageMin: 10 }, weight: 3, text: [
    "hefting the enormous forward mass of her belly in both arms and settling it against herself, flesh rippling",
    "gathering the vast apple-weight of her middle in both palms and holding it there, giving you time to look",
  ]},

  { when: { bodyType: "mom_bod", stageMin: 2, stageMax: 4 }, text: [
    "smoothing her top over the soft curve of her belly",
    "pressing her palms to the warm width of her hips",
    "settling her hands on the gentle swell at her middle",
  ]},
  { when: { bodyType: "mom_bod", stageMin: 5, stageMax: 7 }, weight: 2, text: [
    "cupping the low soft round of her belly and patting it once, maternal and pleased",
    "squeezing the plush swell of her backside and letting it jiggle soft",
    "running both hands over belly and hip in one warm, unhurried stroke",
  ]},
  { when: { bodyType: "mom_bod", stageMin: 8, stageMax: 9 }, weight: 2, text: [
    "spreading her palms over the vast warm weight of her belly",
    "hefting one generous hip and releasing it slow, soft flesh settling",
  ]},
  { when: { bodyType: "mom_bod", stageMin: 10 }, weight: 3, text: [
    "gathering the heavy softness of her belly in both arms and hugging it once against herself",
    "lifting the warm overflow of her hips in both hands and swaying them once, eyes on yours",
  ]},

  { when: { bodyType: "voluptuous", stageMin: 2, stageMax: 4 }, text: [
    "smoothing her top over the soft curve of her belly",
    "pressing her palms to the heavy swell of her chest",
    "shifting her weight so her full hips sway once, unhurried",
  ]},
  { when: { bodyType: "voluptuous", stageMin: 5, stageMax: 7 }, weight: 2, text: [
    "cupping the low swell of her belly and letting it settle in her palms",
    "lifting the warm weight of her breasts and releasing them slow",
    "squeezing the plush curve of her ass and letting her fingers sink in",
  ]},
  { when: { bodyType: "voluptuous", stageMin: 8, stageMax: 9 }, weight: 2, text: [
    "spreading both palms over the vast warm weight of her belly",
    "hefting her heavy breasts up in both hands and letting them settle with a soft bounce",
    "rolling her hips once so her backside sways with deliberate, heavy grace",
  ]},
  { when: { bodyType: "voluptuous", stageMin: 10 }, weight: 3, text: [
    "gathering the enormous mass of her belly in both arms and holding it there a moment",
    "cupping bust and hip in turn — a slow, shameless inventory",
    "hefting the vast weight of her backside in both palms and swaying it once, eyes on yours",
  ]},

  { when: { bodyType: "rotund", stageMin: 2, stageMax: 4 }, text: [
    "patting the soft round of her belly with chef's satisfaction",
    "spreading her palms over the warm, even swell of her middle",
  ]},
  { when: { bodyType: "rotund", stageMin: 5, stageMax: 7 }, weight: 2, text: [
    "cupping the heavy round of her belly and giving it a slow, appreciative squeeze",
    "running both hands over the vast soft dome of her stomach",
  ]},
  { when: { bodyType: "rotund", stageMin: 8 }, weight: 2, text: [
    "lifting the heavy warm weight of her belly and letting it settle back slow, flesh rippling",
    "spreading both arms around her vast middle and hugging the round of herself once",
  ]},

  { when: { bodyType: "fertility_goddess", stageMin: 2, stageMax: 4 }, text: [
    "settling her hands on the wide, warm flare of her hips",
    "pressing her palms to the soft curve where her hips meet her thighs",
  ]},
  { when: { bodyType: "fertility_goddess", stageMin: 5, stageMax: 7 }, weight: 2, text: [
    "cupping the plush swell of her backside with both hands, gentle and sure",
    "rolling her hips once so her lower body settles with a soft, maternal jiggle",
  ]},
  { when: { bodyType: "fertility_goddess", stageMin: 8 }, weight: 2, text: [
    "hefting the generous weight of her hips in both palms and releasing slow",
    "squeezing her vast backside together and swaying once, warm and unhurried",
  ]},

  { when: { bodyType: "athletic", stageMin: 2, stageMax: 4 }, text: [
    "flexing one thick thigh and letting it settle",
    "pressing a palm to the firm swell of her hip",
  ]},
  { when: { bodyType: "athletic", stageMin: 5, stageMax: 7 }, weight: 2, text: [
    "squeezing the thickening flesh of her thigh and releasing slow",
    "running her palm along a leg that's gone noticeably softer",
  ]},
  { when: { bodyType: "athletic", stageMin: 8 }, weight: 2, text: [
    "giving her heavy thigh a shake and watching it jiggle",
    "slapping her thick thigh once — soft flesh rippling where muscle used to be",
    "cupping the plush weight of her thigh and letting it settle slow in her palm",
  ]},

  { when: { bodyType: "straight", stageMin: 2, stageMax: 4 }, text: [
    "pressing a palm to the warmth gathering at her middle",
    "smoothing her top over the soft new curve at her waist",
  ]},
  { when: { bodyType: "straight", stageMin: 5, stageMax: 7 }, weight: 2, text: [
    "running one hand over the heavy round of her belly",
    "cupping the low swell at her middle and letting it settle in her palm",
  ]},
  { when: { bodyType: "straight", stageMin: 8 }, weight: 2, text: [
    "spreading both palms over the vast warm weight of her belly",
    "lifting the heavy overflow of her middle and letting it drop back with a slow sway",
  ]},
];

registerPool("fig.bodyGesture", BODY_GESTURES);
