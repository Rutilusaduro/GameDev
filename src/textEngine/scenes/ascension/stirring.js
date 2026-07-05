// The Squad — Lead: A2 Psych | Support: A7 Artisan, A5 Editor
import { registerPool } from '../../engine.js';

// Shape: FULL SENTENCE. Two-week pre-ceremony disturbance.
registerPool('asc.stirring.scene', [
  { when: { formId: 'mermaid' }, weight: 3, text: [
    'Water keeps finding {subject.name}: on tile, in dreams, in every glass set too close to her hand.',
    '{subject.name} reports the same dream twice — lane-lines below her, open water ahead.',
    'Food satisfies her body; something briny and bright keeps tugging past it.',
  ]},
  { when: {}, text: [
    '{subject.name} is full, and still something in her keeps waiting.',
    'The appetite has changed shape. Food answers part of it, not all.',
    'She dreams in thresholds now, waking calm and hungry.',
    'Something old and new gathers around her body without naming itself.',
  ]},
]);
