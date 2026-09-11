// ═══════════════════════════════════════════════════════════════
// FORCE FEEDER — fragment pools (mined from design exemplars)
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../../engine.js';

// ── ff.harness — PARTICIPLE / FULL setup beat ─────────────────
registerPool('ff.harness', [
  { when: { targetIsTalia: true }, text: [
    'Talia straps herself into the reinforced chair with practiced ease, cheeks already slightly pink',
    'She settles into the lab chair harness herself, fingers steady on the buckles',
  ]},
  { when: { feedAttitude: 'willing' }, text: [
    'She leans back into the harness with a soft, eager sigh as the feeding tube slides between her lips',
    'She tips her head back willingly as the harness clicks shut and the tube finds her mouth',
  ]},
  { when: { feedAttitude: 'resistant' }, text: [
    'She stiffens as the harness locks around her shoulders, the tube pressing at her lips',
    'She tries to turn away, but the chair harness catches her before the tube can be denied',
  ]},
  { when: {}, text: [
    'The harness draws her into the chair, tube aligned with her mouth',
    'Straps bite home and the intake tube slides into place',
  ]},
]);

// ── ff.openDialogue — DIALOGUE BEAT ─────────────────────────────
registerPool('ff.openDialogue', [
  { when: { targetIsTalia: true }, text: [
    '"I\'ve… been running some calculations. The data suggests I could stand to advance another stage," she says.',
    '"The simulations were conservative. I want empirical confirmation," Talia murmurs.',
  ]},
  { when: { feedAttitude: 'willing', performanceTier: 'good' }, text: [
    '"Go on then… I\'ve been waiting for this," she says.',
    '"Finally. I was starting to think you\'d chicken out," she breathes.',
  ], weight: 4 },
  { when: { feedAttitude: 'resistant' }, text: [
    '"W-wait, hold on—!"',
    '"This isn\'t— I didn\'t agree to—!"',
  ], weight: 4 },
  { when: {}, text: ['""', '""', '""'] },
]);

// ── ff.machineBeat — FULL SENTENCE ──────────────────────────────
registerPool('ff.machineBeat', [
  { when: { chokedOut: true }, text: [
    'The choke alarm screams. The machine over-pressurizes and paste forces its way down at once.',
    'Choke threshold breached — pressure spikes and the pump floods past what her throat can take.',
  ]},
  { when: { performanceTier: 'failure' }, text: [
    'The timing goes completely wrong. The machine over-pressurizes for a moment and a large amount of paste forces its way down at once.',
    'The pump surges off-rhythm. Pressure spikes and paste slams down her throat in one brutal flood.',
  ]},
  { when: { performanceTier: 'messy' }, text: [
    'The machine hums to life. Your timing is slightly off — paste fights the rhythm instead of riding it.',
    'Pulses come fast and uneven. The pump keeps working even when her throat hesitates.',
  ]},
  { when: { targetIsTalia: true, performanceTier: 'perfect' }, text: [
    'She activates the machine herself. You watch as she guides the tube into her own mouth, eyes fluttering as the first thick surge begins.',
    'She hits the controls with steady hands. The pump obeys her rhythm exactly.',
  ]},
  { when: { performanceTier: 'perfect' }, text: [
    'The machine hums to life. You time the pulses perfectly.',
    'The pump settles into a clean rhythm under your hands.',
  ]},
  { when: { performanceTier: 'good' }, text: [
    'The machine hums to life. You keep the pulses mostly on beat.',
    'Paste moves in heavy surges, and your timing holds well enough.',
  ]},
  { when: {}, text: [
    'The Force Feeder wakes with a low mechanical whine.',
    'The pump begins its work.',
  ]},
]);

// ── ff.intakeClause — PARTICIPLE CLAUSE ─────────────────────────
registerPool('ff.intakeClause', [
  { when: { performanceTier: 'failure' }, text: [
    'her belly bloating rapidly and uncomfortably',
    'her stomach surging outward in one sick rush',
  ]},
  { when: { performanceTier: 'messy' }, text: [
    'some of the paste spilling from the corner of her mouth, running down her chin',
    'paste smearing her lips as she tries to swallow between pulses',
  ]},
  { when: { performanceTier: ['perfect', 'good'] }, text: [
    'each thick surge of paste sliding smoothly down her throat',
    'every measured pulse sliding past resistance without protest',
  ]},
  { when: {}, text: [
    'paste pushing down her throat in steady mechanical doses',
    'calories flooding past sealed lips',
  ]},
]);

// ── ff.swellBeat — FULL SENTENCE ────────────────────────────────
registerPool('ff.swellBeat', [
  { when: { performanceTier: ['perfect', 'good'] }, text: [
    'Her belly swells outward in steady, satisfying waves, rounding and tightening with every successful feed.',
    'Her stomach rounds in visible pulses, each surge leaving her heavier than the last.',
  ]},
  { when: { performanceTier: 'messy' }, text: [
    'She makes an indignant, muffled sound as her belly begins to bloat outward anyway.',
    'Her stomach still swells despite the mess, each pulse forcing more weight into her frame.',
  ]},
  { when: { performanceTier: 'failure' }, text: [
    'They make a choked, overwhelmed sound around the tube as weight piles on too fast to process.',
    'Her belly surges outward in brutal jumps, the harness the only thing keeping her upright.',
  ]},
  { when: {}, text: [
    'Her belly grows heavier in real time.',
    'Weight settles into her midsection with mechanical certainty.',
  ]},
]);

// ── ff.reactionSound — PARTICIPLE CLAUSE ────────────────────────
registerPool('ff.reactionSound', [
  { when: { performanceTier: 'perfect', feedAttitude: 'willing' }, text: [
    'moaning around the tube, eyes half-lidded in bliss',
    'breathing hard through her nose, lost in the rhythm',
  ]},
  { when: { performanceTier: 'messy', feedAttitude: 'resistant' }, text: [
    'glaring at you, cheeks puffed as the first heavy pulse hits',
    'muffled protest turning into shaky breaths',
  ]},
  { when: { performanceTier: 'failure' }, text: [
    'eyes wide, throat working frantically',
    'tears at the corners of her eyes before she forces them away',
  ]},
  { when: {}, text: ['', '', ''] },
]);

// ── ff.closeBeat — FULL SENTENCE ────────────────────────────────
registerPool('ff.closeBeat', [
  { when: { performanceTier: 'failure' }, text: [
    'When it finally stops, they\'re left panting and noticeably heavier, but clearly overfull and a bit dazed. The machine lets out a sad little error beep.',
    'The session ends in a sputter of pressure. She\'s heavier — and visibly miserable about it.',
  ]},
  { when: { targetIsTalia: true, performanceTier: 'perfect' }, text: [
    'When it finishes, she\'s noticeably larger. She lets out a long, satisfied breath and gently pats her new, much softer stomach.',
    'She\'s unmistakably heavier when the harness releases. Her hands linger on the new swell of her belly.',
  ]},
  { when: { feedAttitude: 'willing', performanceTier: ['perfect', 'good'] }, text: [
    'By the end, she\'s noticeably heavier, her new weight settling into her hips and thighs with a plush finality.',
    'When the tube withdraws, she\'s rounder everywhere the harness pressed — hips, belly, and thighs all softer.',
  ]},
  { when: { feedAttitude: 'resistant', performanceTier: 'messy' }, text: [
    'By the end she\'s breathing hard, belly noticeably rounder and heavier.',
    'She\'s heavier when it stops — flushed, messy, and furious about the proof.',
  ]},
  { when: {}, text: [
    'When the machine powers down, the extra weight is impossible to ignore.',
    'The harness loosens on a frame that has clearly advanced.',
  ]},
]);

// ── ff.closeDialogue — DIALOGUE BEAT ────────────────────────────
registerPool('ff.closeDialogue', [
  { when: { targetIsTalia: true, performanceTier: 'perfect' }, text: [
    '"Fascinating… The sensation is even more intense than the simulations suggested." She glances at you. "Care to help me run a follow-up test later?"',
    '"The data exceeded projections." She exhales, still flushed. "I\'ll need a second trial. With assistance."',
  ], weight: 4 },
  { when: { feedAttitude: 'willing', performanceTier: ['perfect', 'good'] }, text: [
    'She runs her hands over her newly enlarged stomach and smiles lazily. "Mmm… that felt *good*. You\'re getting better at this."',
    '"…Yeah. That was worth it," she says, voice thick with satisfaction.',
  ], weight: 4 },
  { when: { feedAttitude: 'resistant', performanceTier: 'messy' }, text: [
    'She wipes her mouth with the back of her hand, face flushed. "…You\'re *terrible* at this. …Do it again next week."',
    '"Don\'t look so pleased with yourself," she mutters, still breathing hard. "…Same time next week."',
  ], weight: 4 },
  { when: { performanceTier: 'failure' }, text: [
    '"…That hurt," she says flatly.',
    '"Fix your timing before you try that again," she manages, voice rough.',
  ]},
  { when: {}, text: ['""', '""', '""'] },
]);

// ── ff.resistBeat — FULL SENTENCE (resistant opener) ────────────
registerPool('ff.resistBeat', [
  { when: { feedAttitude: 'resistant', performanceTier: ['messy', 'failure'] }, text: [
    'The tube forces its way past her lips before she can protest further. She tries to turn her head, but the harness holds her firmly in place.',
    'The intake seals before she can finish refusing. The harness keeps her still while the pump does its work.',
  ]},
  { when: {}, text: ['""', '""'] },
]);

// Beat skeletons
registerPool('ff.feed', [
  { when: {}, text: [
    '{ff.harness}. {ff.openDialogue|prefix: } {ff.resistBeat|prefix: } {ff.machineBeat} {ff.intakeClause|prefix:, and } {ff.swellBeat} {ff.reactionSound|prefix:, }.',
    '{ff.harness}. {ff.openDialogue|prefix: } {ff.machineBeat} {ff.intakeClause|prefix:, while } {ff.swellBeat} {ff.reactionSound|prefix:, }.',
    '{ff.resistBeat|prefix: } {ff.machineBeat} {ff.intakeClause|prefix:, } {ff.swellBeat}.',
  ]},
]);

registerPool('ff.aftermath', [
  { when: {}, text: [
    '{ff.closeBeat} {ff.closeDialogue|prefix: }',
    '{ff.closeBeat}{ff.closeDialogue|prefix: }',
    '{ff.closeBeat} {ff.closeDialogue|prefix: } The chair still holds her heat.',
  ]},
]);

registerPool('ff.setup', [
  { when: { targetIsTalia: true }, text: [
    'Talia eyes the Force Feeder controls with the focus of someone about to experiment on herself.',
    'She runs a thumb along the intake tube. "I\'ll take the first calibration run."',
    'She checks the harness twice, then sits like the data is already hungry.',
  ]},
  { when: {}, text: [
    'The target settles into the chair harness while the pump cycles through its pre-feed checks.',
    'Calibration lights blink green. The harness waits for a throat to fill.',
    'The pump warms. The chair waits. She is already leaning toward both.',
  ]},
]);

registerPool('ff.linger', [
  { when: { leftoverFed: true, stageMax: 3 }, weight: 3, text: [
    'Kitchen sitting already in her. The pump lands on warm dough. She stays buckled a beat longer.',
    'Last night\'s tray plus the tube. She notices both when the harness opens.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Galley leftover still answering under the paste. The chair reports both.',
    'Second sitting, then the machine. She palms leftover work and lab work in the same place.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'Night-round knock still in the wood. The lab is the public version of that appetite.',
  ] },
  { when: { stageMax: 3, corruption: [0] }, weight: 2, text: [
    'She stays in the harness a beat after the pump stops, surprised she wants the quiet.',
    'The tube comes out. Her belly does not go back. She notices both.',
  ] },
  { when: { stageMin: 6 }, weight: 2, text: [
    'Unbuckling takes longer than the feed. She lets it. Mass keeps the chair honest.',
    'The lab smells like paste and warmth. She palms the new of her and does not apologize.',
  ] },
  { when: {}, text: [
    'The machine goes idle. She does not. Softness keeps the overtime.',
    'She rests a hand where the paste landed and leaves it there.',
    'Calibration ends. The body keeps the result.',
  ] },
]);
