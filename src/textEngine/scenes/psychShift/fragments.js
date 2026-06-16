import { registerPool } from '../../engine.js';

registerPool('shift.trigger', [
  { when: { corruption: [1] }, text: [
    'Something physical happens before she can name it — pleasure where dread used to be.',
    'Her body responds with warmth instead of protest. She notices too late to pretend otherwise.',
    'A moment of softness — hand on belly, fabric straining — and the old reflex does not fire.',
  ] },
  { when: { corruption: [2] }, text: [
    'Someone sees her — really sees her — and the shame she expected does not arrive.',
    'A mirror, a glance, a number on a scale: witnessed, and something in her goes quiet.',
    'The social moment she dreaded becomes something else entirely.',
  ] },
  { when: {}, text: [
    'The week brings a shift she will not name until later.',
    'Something changes — small, physical, undeniable.',
  ] },
]);

registerPool('shift.interior', [
  { when: { corruption: [1] }, text: [
    'She files the feeling elsewhere. It does not stay filed.',
    'The interior registers warmth and tries to call it something else. The something else does not stick.',
    'A crack opens — not dramatic, simply honest. She feels it and does not close it.',
  ] },
  { when: { corruption: [2] }, text: [
    'The interior is quiet now. The argument has run out of material.',
    'There is nothing left to argue against. The body has won without contest.',
    'She stops negotiating. The silence is not defeat. It is relief.',
  ] },
  { when: {}, text: [
    'Something shifts inside — unnamed, unready, real.',
    'The interior voice changes register without announcing itself.',
  ] },
]);

registerPool('shift.physical', [
  { when: { corruption: [1] }, text: [
    'Her hand finds her middle. The touch is not anxious anymore.',
    'She breathes around fullness and the breath is not apology.',
    'The body contradicts the words. The body is winning.',
  ] },
  { when: { corruption: [2] }, text: [
    'Physical ease arrives like something she forgot she was allowed.',
    'She moves without bracing for judgment. The ease is startling.',
    'Her body settles into itself — vast, warm, unashamed.',
  ] },
  { when: {}, text: [
    'The body knows before the mind agrees.',
    'Flesh warm and present — the argument physical now.',
  ] },
]);

registerPool('shift.denial', [
  { when: {}, text: ['', '', ''] },
  { when: { corruption: [1] }, text: [
    'She almost says the old thing. She does not.',
    '"It\'s fine," she says — and for the first time, she is not sure she means "temporary."',
  ] },
]);

registerPool('shift.coda', [
  { when: { corruption: [1] }, text: [
    'The week continues. She is different in ways she will not discuss.',
    'Something has changed. She carries it quietly.',
  ] },
  { when: { corruption: [2] }, text: [
    'The surrender is complete and gentle. She does not mourn the old self.',
    'She is what she is now. The scale will confirm it Thursday.',
  ] },
  { when: {}, text: ['The shift settles in like warmth.'] },
]);
