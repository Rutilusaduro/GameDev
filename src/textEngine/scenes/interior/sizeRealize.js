// The Squad — Lead: A2 Psych | Support: A5 Editor
import { registerPool } from '../../engine.js';

registerPool('interior.sizeRealize', [
  { when: {}, text: ['', '', '', ''] },
  { when: { stageMin: 4, corruption: [0] }, text: [
    'A chair complains. She hears it and feels her cheeks heat.',
    'The desk arm leaves a mark. Evidence she did not ask for.',
    'She turns sideways in a shop window and pretends she was checking her bag.',
    'A booth feels narrower than last month. The booth did not shrink.',
  ] },
  { when: { stageMin: 5, corruption: [1, 2] }, text: [
    'She takes up more room than she used to. The room has stopped pretending otherwise.',
    'Spatial awareness has become a skill — she knows her footprint now.',
    'Doorways require angles now. She has learned the angles.',
    'She feels her hips before she sees them in the mirror.',
  ] },
  { when: { stageMin: 6, corruption: [0] }, text: [
    'The scale number lands and her body already knew it.',
    'Clothes fit like suggestions. Her body fits like fact.',
    'She catches her belly in a reflection and exhales — not dismay, recognition.',
  ] },
  { when: { stageMin: 8 }, text: [
    'The building was not designed for her. She has learned its compromises.',
    'Architecture insufficient — not hostile, simply honest about its limits.',
  ] },
  { when: { relationship: [0, 1], stageMin: 6 }, text: [
    'She wonders what you see when you look at her. She is not sure she wants to know.',
  ] },
  { when: { relationship: [2, 3], stageMin: 6 }, text: [
    'Your gaze confirms what the mirror already said. She lets it.',
  ] },
  { when: { stageMin: 10 }, text: [
    'She is the largest thing in most rooms. She has made peace with that.',
    'Space is negotiated around her now. She does not apologize for the negotiation.',
  ] },
]);
