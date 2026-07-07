// The Squad — Lead: A1 Mobile | Support: A7 Artisan, A5 Editor
// Form-wide word overlays. These tint existing stage prose without starting the
// full ascended portrait grid.
import { registerModule, registerModuleVariants } from '../../engine.js';

// Shape: NOUN. Lowercase resource token.
registerModule('word.essence', [
  { when: {}, text: ['essence', 'stored charge', 'mythic reserve'] },
]);

registerModuleVariants('word.essence', [
  { when: { formId: 'valkyrie', isAscended: true }, weight: 4, text: ['gleam', 'bright charge'] },
  { when: { formId: 'sphinx', isAscended: true }, weight: 4, text: ['marginalia', 'footnoted charge'] },
  { when: { formId: 'siren', isAscended: true }, weight: 4, text: ['signal', 'live charge'] },
  { when: { formId: 'mermaid', isAscended: true }, weight: 4, text: ['brine', 'salt charge'] },
  { when: { formId: 'galatea', isAscended: true }, weight: 4, text: ['patina', 'cured charge'] },
  { when: { formId: 'glitch_sprite', isAscended: true }, weight: 4, text: ['frames', 'frame charge'] },
  { when: { formId: 'feast_nymph', isAscended: true }, weight: 4, text: ['zest', 'citrus charge'] },
  { when: { formId: 'djinn', isAscended: true }, weight: 4, text: ['terms', 'bound charge'] },
  { when: { formId: 'dryad', isAscended: true }, weight: 4, text: ['sap', 'green charge'] },
  { when: { formId: 'melusine', isAscended: true }, weight: 4, text: ['cellar', 'deep charge'] },
  { when: { formId: 'hearth_demigoddess', isAscended: true }, weight: 4, text: ['reduction', 'hearth charge'] },
  { when: { formId: 'fertility_goddess', isAscended: true }, weight: 4, text: ['balm', 'warm charge'] },
  { when: { formId: 'dream_eater', isAscended: true }, weight: 4, text: ['rem', 'dream charge'] },
  { when: { formId: 'angel_of_plenty', isAscended: true }, weight: 4, text: ['grace', 'blessed charge'] },
  { when: { formId: 'harvest_queen', isAscended: true }, weight: 4, text: ['loam', 'soil charge'] },
  { when: { formId: 'lamia', isAscended: true }, weight: 4, text: ['hush', 'coil charge'] },
  { when: { formId: 'potion_witch', isAscended: true }, weight: 4, text: ['tincture', 'brew charge'] },
  { when: { formId: 'dragon', isAscended: true }, weight: 4, text: ['glint', 'hoard charge'] },
]);

// Shape: VERB PHRASE. Reads after subject.
registerModuleVariants('word.movement', [
  { when: { formId: 'valkyrie', isAscended: true }, weight: 3, text: ['moves like victory still counts'] },
  { when: { formId: 'sphinx', isAscended: true }, weight: 3, text: ['moves with couchant patience'] },
  { when: { formId: 'siren', isAscended: true }, weight: 3, text: ['moves like every step has an audience'] },
  { when: { formId: 'mermaid', isAscended: true }, weight: 3, text: ['moves like the water remembers her'] },
  { when: { formId: 'galatea', isAscended: true }, weight: 3, text: ['moves as if the room were a plinth'] },
  { when: { formId: 'glitch_sprite', isAscended: true }, weight: 3, text: ['moves in stutter-smooth bursts'] },
  { when: { formId: 'feast_nymph', isAscended: true }, weight: 3, text: ['moves like a hostess who owns the floor'] },
  { when: { formId: 'djinn', isAscended: true }, weight: 3, text: ['moves through smoke and settled gold'] },
  { when: { formId: 'dryad', isAscended: true }, weight: 3, text: ['moves with rooted unhurried weight'] },
  { when: { formId: 'melusine', isAscended: true }, weight: 3, text: ['moves with salon grace and hidden coil'] },
  { when: { formId: 'hearth_demigoddess', isAscended: true }, weight: 3, text: ['moves like the kitchen follows'] },
  { when: { formId: 'fertility_goddess', isAscended: true }, weight: 3, text: ['moves with harvest warmth'] },
  { when: { formId: 'dream_eater', isAscended: true }, weight: 3, text: ['moves as waking and dreaming overlap'] },
  { when: { formId: 'angel_of_plenty', isAscended: true }, weight: 3, text: ['moves with soft provident ease'] },
  { when: { formId: 'harvest_queen', isAscended: true }, weight: 3, text: ['moves like the field knows her step'] },
  { when: { formId: 'lamia', isAscended: true }, weight: 3, text: ['moves with coil-backed leisure'] },
  { when: { formId: 'potion_witch', isAscended: true }, weight: 3, text: ['moves with careful measured purpose'] },
  { when: { formId: 'dragon', isAscended: true }, weight: 3, text: ['moves like mass worth guarding'] },
]);

// Shape: NOUN PHRASE. Gated to stage 5+ so reborn stage 0-4 never leaks scale.
registerModuleVariants('word.body', [
  { when: { formId: 'valkyrie', isAscended: true, stageMin: 5 }, weight: 3, text: ['wing-root softness gathering at her shoulders'] },
  { when: { formId: 'sphinx', isAscended: true, stageMin: 5 }, weight: 3, text: ['tawny haunch and settled paw-heavy middle'] },
  { when: { formId: 'siren', isAscended: true, stageMin: 5 }, weight: 3, text: ['a voice-forward softness that pulls the eye'] },
  { when: { formId: 'mermaid', isAscended: true, stageMin: 5 }, weight: 3, text: ['tail-hollow curves and swimmer shoulders'] },
  { when: { formId: 'galatea', isAscended: true, stageMin: 5 }, weight: 3, text: ['marble-warm planes that hold the light'] },
  { when: { formId: 'glitch_sprite', isAscended: true, stageMin: 5 }, weight: 3, text: ['edges that resolve a half-step late'] },
  { when: { formId: 'feast_nymph', isAscended: true, stageMin: 5 }, weight: 3, text: ['orchard-round warmth in bust and hip'] },
  { when: { formId: 'djinn', isAscended: true, stageMin: 5 }, weight: 3, text: ['smoke-soft curves ringed in gold'] },
  { when: { formId: 'dryad', isAscended: true, stageMin: 5 }, weight: 3, text: ['bark-bright rings around waist and thigh'] },
  { when: { formId: 'melusine', isAscended: true, stageMin: 5 }, weight: 3, text: ['iridescent coil hidden under hostess curves'] },
  { when: { formId: 'hearth_demigoddess', isAscended: true, stageMin: 5 }, weight: 3, text: ['flour-dusted abundance at belly and hip'] },
  { when: { formId: 'fertility_goddess', isAscended: true, stageMin: 5 }, weight: 3, text: ['harvest-gold ripeness through bust and thigh'] },
  { when: { formId: 'dream_eater', isAscended: true, stageMin: 5 }, weight: 3, text: ['shadow-soft edges and a heavier middle'] },
  { when: { formId: 'angel_of_plenty', isAscended: true, stageMin: 5 }, weight: 3, text: ['biscuit-warm fullness through chest and hip'] },
  { when: { formId: 'harvest_queen', isAscended: true, stageMin: 5 }, weight: 3, text: ['wheat-bright heaviness in belly and thigh'] },
  { when: { formId: 'lamia', isAscended: true, stageMin: 5 }, weight: 3, text: ['human-soft above, coil-mass implied below'] },
  { when: { formId: 'potion_witch', isAscended: true, stageMin: 5 }, weight: 3, text: ['lab-soft middle and careful plush curves'] },
  { when: { formId: 'dragon', isAscended: true, stageMin: 5 }, weight: 3, text: ['haunch-heavy gold scale over hoard-belly'] },
]);

// Shape: VERB PHRASE. Pilot dual-context movement.
registerModuleVariants('word.moveVerb', [
  { when: { formId: 'mermaid', isAscended: true, inWater: true }, weight: 4, text: ['glides', 'banks', 'cuts the lane'] },
]);
