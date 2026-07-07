// ═══════════════════════════════════════════════════════════════
// GROWTH EVENT GARMENTS — per-girl outfit noun phrases for ge.garment
// ═══════════════════════════════════════════════════════════════
import { registerModuleVariants } from '../../engine.js';
import './fragments.js';

const W = 4;

// NOUN PHRASE — what she was wearing (specific, not generic)
registerModuleVariants('ge.garment', [
  { when: { studentId: 0 }, weight: W, text: ['her cheer practice top and skirt', 'the fitted uniform she still calls practice gear'] },
  { when: { studentId: 1 }, weight: W, text: ['her cardigan and blouse', 'the layered campus set she wears like armor'] },
  { when: { studentId: 2 }, weight: W, text: ['her crop top and high-waist leggings', 'the fitted content-day set'] },
  { when: { studentId: 3 }, weight: W, text: ['her compression training set', 'the athletic gear she still treats like uniform'] },
  { when: { studentId: 4 }, weight: W, text: ['her paint-stained studio shirt', 'the oversized artsy layers she works in'] },
  { when: { studentId: 5 }, weight: W, text: ['her gaming hoodie', 'the graphic tee and joggers she lives in'] },
  { when: { studentId: 6 }, weight: W, text: ['her chapter event top and skirt', 'the fitted sorority look she wore out tonight'] },
  { when: { studentId: 7 }, weight: W, text: ['her pressed blouse and pencil skirt', 'the structured campus set she planned around'] },
  { when: { studentId: 8 }, weight: W, text: ['her loose gray sweater and jeans', 'the soft hoodie she disappears into'] },
  { when: { studentId: 9 }, weight: W, text: ['her fitted tee and jeans', 'the transfer-student casual she brought from Dublin'] },
  { when: { studentId: 10 }, weight: W, text: [
    'her flour-dusted chef\'s jacket over kitchen blacks',
    'her chef\'s jacket and checked kitchen pants, still smelling faintly of stock',
  ] },
  { when: { studentId: 11 }, weight: W, text: [
    'her soft knit cardigan and scrub pants',
    'the layered nursing-student set she calls comfortable',
  ] },
  { when: { studentId: 12 }, weight: W, text: ['her fitted therapist blouse and skirt', 'the smart campus look she chose deliberately'] },
  { when: { studentId: 13 }, weight: W, text: ['her soft southern blouse and stretch jeans', 'the floral top she wears like hospitality'] },
  { when: { studentId: 14 }, weight: W, text: ['her worn flannel and farm jeans', 'the western belt and tee she came to campus in'] },
  { when: { studentId: 15 }, weight: W, text: ['her black fitted dress', 'the dark layered top and skirt she never explains'] },
  { when: { studentId: 16 }, weight: W, text: ['her pressed lab coat over blouse', 'the clinical campus layers she keeps immaculate'] },
  { when: { studentId: 17 }, weight: W, text: ['her field jacket over tee', 'the cargo pants and boots-worn expedition look'] },
  { when: { studentId: 18, custom: false }, weight: W, text: ['her grease-stained lab coat over hoodie', 'the practical engineering layers she prototypes in'] },
]);
