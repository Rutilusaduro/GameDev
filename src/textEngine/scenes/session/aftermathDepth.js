// The Squad — Lead: A1 Mobile | Support: A5 Editor
// Auto-generated — run: node scripts/generateSessionAftermathDepth.mjs
// Wildcard depth for session.aftermath pools (Pass 29).
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants("session.aftermath.light._f1", [
  { when: { stageMin: 8 }, text: [
    "She finishes unhurried, vast and pleased — fullness a landscape she inhabits.",
    "Pleasant heaviness settles; she savors the end of the meal like a second dessert.",
  ]},
  { when: {}, text: [
    "She finishes unhurried, pleased with how the session went.",
    "Pleasant fullness settles; she savors the end of the meal like dessert.",
  ]},
]);
registerModuleVariants("session.aftermath.light", [{ when: {}, text: ["{session.aftermath.light._f1}", "{session.aftermath.light._f1}"] }]);
registerModuleVariants("session.aftermath.full._f1", [
  { when: { stageMin: 7 }, text: [
    "Middle drum-tight with warmth; standing is a project she declines.",
    "She leans back and stays back, both hands on her full round belly, breathing like tide.",
  ]},
  { when: {}, text: [
    "Middle drum-tight with warmth; she does not attempt to stand.",
    "She leans back and stays back, both hands on her full round belly, breathing carefully.",
  ]},
]);
registerModuleVariants("session.aftermath.full._f2", [{ when: {}, text: [" Heat radiates through her where hands rest.", " Her eyes half-close; appetite gives way to contentment."] }]);
registerModuleVariants("session.aftermath.full", [{ when: {}, text: ["{session.aftermath.full._f1} {session.aftermath.full._f2}", "{session.aftermath.full._f1} {session.aftermath.full._f2}"] }]);
registerModuleVariants("session.aftermath.stuffed._f1", [
  { when: { stageMin: 6 }, text: [
    "Past comfortable and into wonder — she presses hands flat, feeling every generous ounce.",
    "She has gone very still, spectacularly full, belly a round warm mass under her palms.",
  ]},
  { when: {}, text: [
    "Past comfortable and into wonder — she presses hands flat, feeling every ounce.",
    "She has gone very still, spectacularly full, belly a round warm mass under her palms.",
  ]},
]);
registerModuleVariants("session.aftermath.stuffed._f2", [{ when: {}, text: [" Fullness becomes the furniture she sits in.", " She breathes slow; satisfaction replaces urgency."] }]);
registerModuleVariants("session.aftermath.stuffed", [{ when: {}, text: ["{session.aftermath.stuffed._f1} {session.aftermath.stuffed._f2}", "{session.aftermath.stuffed._f1} {session.aftermath.stuffed._f2}"] }]);
registerModuleVariants("session.aftermath.packed._f1", [
  { when: { stageMin: 8 }, text: [
    "She is enormous with food — belly rounded, firm, extraordinary under her hands, mass audible in every breath.",
    "She keeps her hands on her belly, feeling weight, heat, the truth of how much she let you give her.",
  ]},
  { when: {}, text: [
    "She is enormous with food — belly rounded, firm, extraordinary under her hands.",
    "She keeps her hands on her belly, feeling weight, heat, the truth of how much.",
  ]},
]);
registerModuleVariants("session.aftermath.packed._f2", [{ when: {}, text: [" The chair knows her weight now; so do you.", " She lets the meal finish inside her without hurry."] }]);
registerModuleVariants("session.aftermath.packed", [{ when: {}, text: ["{session.aftermath.packed._f1} {session.aftermath.packed._f2}", "{session.aftermath.packed._f1} {session.aftermath.packed._f2}"] }]);
registerModuleVariants('session.aftermath', [
  { when: { stageMin: 9 }, text: [
    '{subject.name} settles back, vast and warm, pleased with how thoroughly the session filled her.',
    '{subject.name} rests heavy and content, the meal settling into soft geography.',
  ]},
  { when: {}, text: [
    '{subject.name} settles back, full and warm, pleased with the evening.',
    '{subject.name} rests heavy and content, the meal settling into soft warmth.',
  ]},
]);
