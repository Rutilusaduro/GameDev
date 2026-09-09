// The Squad — Lead: A1 Mobile | Support: A4 Architect
// Campus class-event observation prose — keyed mood/archetype/campusFattening (DEPTH_PLAN §9d).
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';

registerPool('campusEvent.observation', [
  { when: { mood: ['stressed'] }, weight: 2, text: [
    '{subject.name} slumps into her seat — hollow-eyed, notebook closed, appetite waiting underneath.',
    'Stress sits in her shoulders; food would help and she knows it.',
  ] },
  { when: { mood: ['excited'] }, weight: 2, text: [
    '{subject.name} bubbles over before hall check-in — energy looking for an outlet.',
    'She can barely stay seated; excitement and appetite braid together.',
  ] },
  { when: { mood: ['content'] }, weight: 2, text: [
    '{subject.name} is the picture of ease — soft smile, chair claimed, unhurried.',
    'Comfortable and settled; she looks exactly where she wants to be.',
  ] },
  { when: { campusFattening: true }, weight: 2, text: [
    'The campus feels softer lately — portions bigger, conversations looser around food.',
    'Something in the air encourages appetite; {subject.name} is not immune.',
  ] },
  { when: { archetype: ['cheerleader'] }, text: [
    '{subject.name} arrives flustered — squad drama, appetite underneath.',
    'Practice gear still on; she drops into her seat and sighs loudly.',
  ] },
  { when: { archetype: ['gamer'] }, text: [
    '{subject.name} looks like she rage-quit a game and came straight here.',
    'Dark circles, hoodie strings chewed — hunger and screens intertwined.',
  ] },
  { when: {}, text: [
    '{subject.name} settles into class — present, readable, waiting.',
    'The floor meeting hall hums; she finds her seat and exhales.',
    'Ordinary campus hour — except nothing about her appetite is ordinary anymore.',
  ] },
]);

registerPool('campusEvent.result', [
  { when: { mood: ['content', 'happy'] }, text: [
    'Color returns; {subject.name} eats without looking up, grateful.',
    'She softens visibly — food doing what food does best.',
  ] },
  { when: { relationship: [3, 4] }, text: [
    '"Thanks for noticing," {subject.name} says quietly. She means it.',
    'Trust deepens over crumbs and warmth.',
  ] },
  { when: {}, text: [
    'The moment passes; {subject.name} looks a little more herself.',
    'Small intervention, real effect — appetite acknowledged.',
  ] },
]);

registerPool('campusEvent.beat', [
  { when: {}, text: ['{campusEvent.observation} {campusEvent.result}'] },
]);

import './classIntegration.js';

/** Class-session observation beat keyed on student mood/archetype/campus state. */
export function renderCampusEventBeat(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const base = render('{campusEvent.beat}', ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth(base, 'campus', ctx, opts.v2DepthChance ?? 0.25);
}

export { renderClassSceneText, renderClassChoiceResult } from './classIntegration.js';
