// The Squad — Lead: A2 Psych | Support: A1 Mobile, A5 Editor
// Wildcard depth for weekly recap pools (Pass 29+).
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('week.recap.beat', [
  { when: { gainBand: 'huge', stagedUp: true }, weight: 4, text: [
    'The week remade her — a threshold crossed, {word.clothingFit}, every soft part of her announcing the change.',
    'Seven days of feeding and she arrived somewhere new — heavier, warmer, impossible to mistake for who she was Monday.',
  ]},
  { when: { gainBand: 'huge' }, weight: 3, text: [
    'The week landed like weather — vast, warm, reshaping how she fills a room.',
    'Real weight this week: {word.body}, rounder, slower, more present in every gesture.',
  ]},
  { when: { gainBand: 'big', stuffedWeek: true }, weight: 3, text: [
    'She spent the week full and it shows — {word.body}, packed soft by seven days of never quite stopping.',
  ]},
  { when: { gainBand: 'solid', stageMin: 5 }, weight: 2, text: [
    'A solid week settles into established curves — appetite and mass moving in the same direction.',
  ]},
  { when: { gainBand: 'trace', stageMax: 3 }, weight: 2, text: [
    'A quiet week — softness gathering where it was not before, the kind of gain felt before it is named.',
  ]},
  { when: { stageMin: 10 }, weight: 3, text: [
    'Another week of immobile abundance — mass folding into itself, hunger made geography.',
  ]},
  { when: { stageMin: 7 }, weight: 2, text: [
    '{word.movement}; the week added another layer to a body already vast and unhurried.',
  ]},
  { when: {}, text: [
    'Seven days of feeding leave their mark — softer curves, warmer presence, more of her to notice.',
    'The week settles into her like warmth — appetite answered, flesh remembering.',
  ]},
]);

registerModuleVariants('week.recap.line', [
  { when: { studentId: 15 }, weight: 4, text: [
    `Lilith runs a slow hand over the week's work and smiles without warmth. "Good," she says. "More."`,
  ]},
  { when: { studentId: 17 }, weight: 4, text: [
    `Indiana grins at the new softness like a find on a dig. "X marks the spot," she murmurs. "Right here."`,
  ]},
  { when: { gainBand: 'huge', corruption: [2] }, weight: 3, text: [
    `{subject.name} pats her middle, pleased. "Best week yet. Schedule another."`,
  ]},
  { when: { gainBand: 'trace', corruption: [0] }, weight: 2, text: [
    `{subject.name} touches the change once and pulls her hand back, not ready to name it yet.`,
  ]},
  { when: { stagedUp: true, corruption: [1, 2] }, weight: 3, text: [
    `{subject.name} exhales. "New size," she says, testing the words. "I like how it sounds."`,
  ]},
  { when: {}, text: [
    `{subject.name} takes the week's gain in with a slow breath, neither fighting nor fleeing it.`,
    `{subject.name} runs a hand along the new softness and lets the truth of it settle.`,
    `{subject.name} looks at herself a beat longer than last week — warmer, less afraid of what she sees.`,
    `{subject.name} keeps a palm on the week's work like a bookmark.`,
  ]},
]);

registerModuleVariants('week.recap', [
  { when: { gainBand: 'huge' }, weight: 2, text: [
    '{week.recap.beat}\n\n{week.recap.line} {week.recap.afterglow} {week.recap.linger}',
    '{week.recap.beat} The difference sits on her like weather.\n\n{week.recap.line} {week.recap.linger}',
  ]},
  { when: {}, text: [
    '{week.recap.beat}\n\n{week.recap.line} {week.recap.afterglow} {week.recap.linger}',
    '{week.recap.beat} {week.recap.line} {week.recap.afterglow} {week.recap.linger}',
  ]},
]);
