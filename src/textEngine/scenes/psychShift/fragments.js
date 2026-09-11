// The Squad — Lead: A2 Psych | Support: A5 Editor
import { registerPool, registerModuleVariants } from '../../engine.js';

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
    'A threshold passes without announcement.',
    'The body crosses a line the mind has been circling.',
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
    'A quiet rearrangement behind her ribs.',
    'The old argument loses a witness.',
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
    'Sensation arrives ahead of vocabulary.',
    'Her body makes the case without rhetoric.',
  ] },
]);

registerPool('shift.denial', [
  { when: { stageMax: 1 }, text: [
    '',
    'She eats without naming what changed.',
    'Appetite arrives before vocabulary does.',
  ] },
  { when: { stageMin: 2 }, text: [
    '',
    '"It\'s fine," she says — meaning temporary. She hopes.',
    'She almost names the old excuse. Stress. Bloating. Monday.',
    'Denial arrives on schedule. It is thinner than last month.',
  ] },
  { when: { corruption: [0], stageMin: 2, stageMax: 4 }, text: [
    '"It\'s fine," she says — meaning temporary. She hopes.',
    'She almost names the old excuse. Bloating. Stress. Monday.',
    'Denial arrives on schedule. It is thinner than last month.',
  ] },
  { when: { corruption: [1] }, text: [
    'She almost says the old thing. She does not.',
    '"It\'s fine," she says — and for the first time, she is not sure she means "temporary."',
    'The protest dies mid-sentence. She eats anyway.',
    'She reaches for more before the argument finishes.',
  ] },
  { when: { corruption: [2] }, text: [
    'There is nothing left to deny. She smiles instead.',
    'The old vocabulary is gone. Appetite speaks fluent now.',
    'Denial retired. Appetite took its desk.',
  ] },
  { when: {}, text: [
    '',
    'Denial arrives on schedule. It is thinner than last month.',
    'The excuse forms and dissolves before she speaks it.',
  ] },
]);

registerPool('shift.coda', [
  { when: { corruption: [1] }, text: [
    'The week continues. She is different in ways she will not discuss.',
    'Something has changed. She carries it quietly.',
    'The old story thins. She does not mourn it aloud.',
  ] },
  { when: { corruption: [2] }, text: [
    'The surrender is complete and gentle. She does not mourn the old self.',
    'She is what she is now. The scale will confirm it Thursday.',
    'The week closes on appetite answered and resistance retired.',
  ] },
  { when: {}, text: [
    'The shift settles in like warmth.',
    'Something has changed. She carries it forward.',
    'The week closes on a new interior weather.',
    'Quiet follows — not empty, rearranged.',
  ] },
]);

registerModuleVariants('shift.trigger', [
  { when: { leftoverFed: true, corruption: [1] }, weight: 4, text: [
    'Extra help still in her when the warmth arrives where dread used to be.',
    'Last sitting, then the softness. The old reflex does not fire.',
  ]},
  { when: { leftoverFed: true, corruption: [2] }, weight: 4, text: [
    'Someone sees the extra help in her. The shame she expected does not arrive.',
    'Witnessed with last sitting still rounding her. Something in her goes quiet.',
  ]},
]);

registerModuleVariants('shift.interior', [
  { when: { leftoverFed: true, corruption: [1] }, weight: 4, text: [
    'She files leftover heat elsewhere. It does not stay filed.',
    'The interior registers extra help as warmth and tries to call it something else.',
  ]},
  { when: { leftoverFed: true, corruption: [2] }, weight: 4, text: [
    'The interior is quiet now. Extra help already won the argument.',
    'Nothing left to argue. Last sitting made the silence a relief.',
  ]},
]);

registerModuleVariants('shift.physical', [
  { when: { leftoverFed: true, corruption: [1] }, weight: 4, text: [
    'Her hand finds extra help in her middle. The touch is not anxious anymore.',
    'She breathes around leftover fullness. The breath is not apology.',
  ]},
  { when: { leftoverFed: true, corruption: [2] }, weight: 4, text: [
    'Physical ease arrives on a middle that already ate. Allowed.',
    'She moves without bracing. Extra help settled first. Then the ease.',
  ]},
]);

registerModuleVariants('shift.coda', [
  { when: { leftoverFed: true, corruption: [1] }, weight: 4, text: [
    'The week continues. Extra help and the shift share the same quiet.',
    'Something has changed. Last sitting is part of how she carries it.',
  ]},
  { when: { leftoverFed: true, corruption: [2] }, weight: 4, text: [
    'The surrender is complete. Extra help already signed the paper.',
    'She is what she is now. Last sitting, then the scale, then appetite answered.',
  ]},
]);
