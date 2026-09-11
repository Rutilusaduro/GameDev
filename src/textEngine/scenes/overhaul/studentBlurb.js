// The Squad — Lead: A5 Editor | Support: A6 Slender, A2 Psych
// Slot-composed roster blurb. Prefer over leftover INIT_STUDENTS.desc.
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';

registerPool('student.blurb.scene', [
  { when: {}, text: [
    '{student.blurb.setup} {student.blurb.body}',
    '{student.blurb.body} {student.blurb.setup}',
    '{student.blurb.setup}',
  ]},
]);

registerPool('student.blurb.setup', [
  { when: {}, text: [
    '{subject.name} lives on this floor like the lounge already claimed her.',
    'Resident, adult, hungry in a way the roster does not print.',
    'She keeps a chair, a snack drawer, and a look you have learned to read.',
  ]},
  { when: { studentId: 0 }, weight: 5, text: [
    'Squad captain. Ponytail still tight. Commands the room with a look.',
  ]},
  { when: { studentId: 1 }, weight: 5, text: [
    'Broad shoulders, freckles, hair half-damp from morning laps. Splits and servings in the same log.',
  ]},
  { when: { studentId: 2 }, weight: 5, text: [
    'Contour, phone up, brand in every gesture. Off-camera already eating.',
  ]},
  { when: { studentId: 3 }, weight: 5, text: [
    'Compact, muscled, compression gear. Restless energy looking for a plate.',
  ]},
  { when: { studentId: 4 }, weight: 5, text: [
    'Paint under nails. Mismatched earrings. She treats appetite like another medium.',
  ]},
  { when: { studentId: 5 }, weight: 5, text: [
    'Oversized hoodie. Headphones. Always on her phone. Ranked nights come with snacks.',
  ]},
  { when: { studentId: 6 }, weight: 5, text: [
    'Pastel, perfect blowout, Greek letters on the tote. Wednesday feast is her real chapter.',
  ]},
  { when: { studentId: 7 }, weight: 5, text: [
    'Planner out. Color-coded. Three laptops. Seconds are a schedule item now.',
  ]},
  { when: { studentId: 8 }, weight: 5, text: [
    'Oversized sweater. Back row. Notebook of careful drawings and quieter appetite.',
  ]},
  { when: { studentId: 9 }, weight: 5, text: [
    'Exchange from Paris. Silk scarf, wine lipstick. American portions, delighted scandal.',
  ]},
  { when: { studentId: 10 }, weight: 5, text: [
    'Flour somewhere on her. Always something to taste. Food is her music.',
  ]},
  { when: { studentId: 11 }, weight: 5, text: [
    'Nursing track. Warm. Attentive. The one who asks how you are and means it.',
  ]},
  { when: { studentId: 12 }, weight: 5, text: [
    'Grad track. Notebook open. Watching from the back, evaluating, not shy.',
  ]},
  { when: { studentId: 13 }, weight: 5, text: [
    'Snacks in the bag. Treats everyone like they need looking after. Cookie-warm.',
  ]},
  { when: { studentId: 14 }, weight: 5, text: [
    'Ag major. Big smile. She brought jam to move-in and never stopped feeding people.',
  ]},
  { when: { studentId: 15 }, weight: 5, text: [
    'Dark clothes. Stillness that is not shyness. Floor meetings she never quite attends.',
  ]},
  { when: { studentId: 16 }, weight: 5, text: [
    'Lab coat pressed. Hair tied back. Wellness tracking like a private gospel.',
  ]},
  { when: { studentId: 17 }, weight: 5, text: [
    'Mud on the boots. A whip in the bag. She mapped this campus before it admitted the halls.',
  ]},
  { when: { studentId: 18 }, weight: 5, text: [
    'Hoodie under a lab coat. Grease on her fingers. Bodies as diagrams she intends to solve.',
  ]},
]);

registerPool('student.blurb.body', [
  { when: {}, text: [
    'The extra of her is already a rumor the floor tells in pounds.',
    'Appetite sits under the role like a second job.',
    'She looks exactly like someone this lounge is going to keep.',
  ]},
  { when: { stageMin: 4 }, weight: 2, text: [
    'The roster line still fits. The body is already revising it.',
  ]},
]);

function prefer(poolKey, ctx) {
  const line = render(`{${poolKey}}`, ctx)?.trim();
  if (line && !line.includes('{unresolved}')) return line;
  return '';
}

export function renderStudentBlurb(student, week = 1) {
  if (!student) return '';
  return prefer('student.blurb.scene', buildTextContext({
    subject: student,
    week,
    globals: { featureId: 'blurb' },
  }));
}
