// Per-girl eating voice — studentId-keyed persona lines.
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('eat.firstBite', [
  { when: { studentId: 0 }, weight: 4, text: [
    'Brittany logs the first bite like data — portion, macro, intention. Then she takes it.',
    'She treats the opening bite as warm-up. The meal is training.',
  ] },
  { when: { studentId: 10 }, weight: 4, text: [
    'Reneé tastes the first bite the way she tastes wine — eyes closed, cataloging notes.',
    'The first forkful is an evaluation. She approves, and the meal officially begins.',
  ] },
  { when: { studentId: 5 }, weight: 4, text: [
    'Destiny eats the first bite without looking away from her screen. Resource management.',
    'First bite: stamina restored incrementally. She tracks it anyway.',
  ] },
  { when: { studentId: 11 }, weight: 4, text: [
    'Kaylee calls it "aggressive self-care" and takes the first bite like following protocol.',
    'The first mouthful is caloric intake, medically justified. She is very calm about this.',
  ] },
  { when: { studentId: 8 }, weight: 4, text: [
    'Maya eats. No commentary. The first bite is simply the first bite.',
    'She takes food the way she takes everything — quietly, completely.',
  ] },
  { when: { studentId: 15 }, weight: 4, text: [
    'Lilith watches you while she eats the first bite. Portions are not discussed.',
    'The first bite happens while her attention stays on you. She simply continues.',
  ] },
  { when: { studentId: 2 }, weight: 4, text: [
    'Kylie films the first bite. "Content," she says, mouth full. "Authentic."',
  ] },
  { when: { studentId: 3 }, weight: 4, text: [
    'Serena eats like it is fuel — efficient, committed, already thinking about the next plate.',
  ] },
  { when: { studentId: 12 }, weight: 4, text: [
    'Nadia notes the first bite in her notebook without looking up. "Baseline established."',
  ] },
]);

registerModuleVariants('eat.finish', [
  { when: { studentId: 0 }, weight: 4, text: [
    'Brittany finishes and logs the total. "Good session," she says, like the gym.',
  ] },
  { when: { studentId: 10 }, weight: 4, text: [
    'Reneé sets the fork down with the satisfaction of a course completed. "The finish is clean."',
  ] },
  { when: { studentId: 5 }, weight: 4, text: [
    'Destiny finishes and checks her stats. Fullness: acceptable. Queue: next meal.',
  ] },
  { when: { studentId: 8 }, weight: 4, text: [
    'Maya is done. She was done before you noticed she was eating.',
  ] },
  { when: { studentId: 15 }, weight: 4, text: [
    'Lilith finishes. She does not explain how much she ate. She never does.',
  ] },
]);
