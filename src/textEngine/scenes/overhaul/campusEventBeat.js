// The Squad — Lead: A5 Editor | Support: A1 Mobile, A6 Slender
// Overwrite leftover campusEvent.observation/result/beat (registerPool last-wins).
import { registerPool } from '../../engine.js';

registerPool('campusEvent.observation', [
  { when: {}, text: [
    '{floor.checkin.setup} {floor.checkin.body}',
    '{floor.checkin.body} {floor.checkin.setup}',
    '{floor.checkin.setup}',
  ]},
  { when: { mood: ['stressed'] }, weight: 2, text: [
    '{subject.name} folds into the lounge couch like the week sat down with her. Notebook closed. Appetite waiting.',
    'Stress lives in her shoulders. Food would help and she already knows it.',
  ]},
  { when: { mood: ['excited'] }, weight: 2, text: [
    '{subject.name} can barely stay seated. Energy looking for an outlet, and the outlet is usually edible.',
    'She answers questions you have not asked. The chair creaks fondly under her.',
  ]},
  { when: { mood: ['content'] }, weight: 2, text: [
    '{subject.name} is already comfortable. The check-in is an excuse to stay in the good chair.',
    'Soft smile. Chair claimed. She looks exactly where she wants to be.',
  ]},
  { when: { campusFattening: true }, weight: 2, text: [
    'Portions on campus have gotten generous. {subject.name} is not fighting the weather.',
    'The air encourages appetite. {subject.name} arrived already agreeing with it.',
  ]},
  { when: { archetype: ['cheerleader'] }, weight: 2, text: [
    '{subject.name} drops into the seat still in practice gear. Squad drama first. Appetite underneath.',
  ]},
  { when: { archetype: ['gamer'] }, weight: 2, text: [
    '{subject.name} looks like she rage-quit and walked here. Hoodie strings chewed. Hunger braided with the screen.',
  ]},
]);

registerPool('campusEvent.result', [
  { when: {}, text: [
    'The moment passes. {subject.name} looks a little more herself, and a little more fed.',
    'Small intervention. Real effect. Appetite gets a name and she keeps eating.',
    'She stays seated after the check-in closes. Rapport sits in the chair with her.',
  ]},
  { when: { mood: ['content', 'happy'] }, weight: 2, text: [
    'Color returns. {subject.name} eats without looking up, grateful in an unhurried way.',
    'She softens visibly. Food doing what food does.',
  ]},
  { when: { relationship: [3, 4] }, weight: 2, text: [
    `"Thanks for noticing," {subject.name} says quietly. She means it.`,
    'Trust deepens over crumbs and warmth. She does not get up yet.',
  ]},
]);

registerPool('campusEvent.beat', [
  { when: {}, text: [
    '{campusEvent.observation} {campusEvent.result}',
    '{campusEvent.observation}\n\n{campusEvent.result}',
    '{campusEvent.result} {campusEvent.observation}',
  ]},
]);

registerPool('campus.v2.depth', [
  { when: {}, text: [
    'Floor check-in ends. Appetite does not. The hallway still smells like lunch.',
    'Lockers slam. Vending machines hum. Somewhere a resident is already eating.',
    'Campus routine keeps score on her body between hall rounds.',
  ]},
  { when: { campusFattening: true }, weight: 2, text: [
    'Campus air tastes of butter and permission. She breathes it in.',
    'Every vending machine looks like an invitation. She accepts.',
    'The quad smells like fried dough and nobody is pretending otherwise.',
  ]},
]);
