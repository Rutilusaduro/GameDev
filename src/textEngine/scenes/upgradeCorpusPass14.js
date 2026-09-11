// The Squad — Lead: A2 Psych | Support: A1 Mobile, A6 Slender, A5 Editor
// Pass 14 — jealousy, hive, supernatural, origin, echo, leftover stream/talk.
import { registerModuleVariants } from '../engine.js';

// ── jealousy.reaction (DIALOGUE / BEHAVIOR) ───────────────────
registerModuleVariants('jealousy.reaction', [
  { when: { favoritism: 'neglected', studentId: 0 }, weight: 7, text: [
    `Brittany does not raise her voice. "I thought I was yours to feed." Captain energy, unused.`,
    `Brittany watches the other plate. "She ate well. I noticed. So did the roster."`,
  ] },
  { when: { favoritism: 'neglected', studentId: 8 }, weight: 7, text: [
    `Maya goes still. "I noticed." Review over.`,
    `Maya looks at the other girl, then at you. No speech. The look is enough.`,
  ] },
  { when: { favoritism: 'neglected', studentId: 5 }, weight: 7, text: [
    `Destiny, dry: "Cool. She got the sit. I got the watch. Queue me next."`,
  ] },
  { when: { favoritism: 'neglected', studentId: 2 }, weight: 7, text: [
    `Kylie films nothing. "You always find time for her. I'm still here too."`,
  ] },
  { when: { favoritism: 'neglected', studentId: 15 }, weight: 7, text: [
    `Lilith watches you feed someone else like prey walking the wrong way.`,
  ] },
  { when: { favoritism: 'neglected', studentId: 7 }, weight: 7, text: [
    `Priya files the week under neglected. The file is accurate. She wants it revised.`,
  ] },
  { when: { favoritism: 'favored', studentId: 0 }, weight: 7, text: [
    `Brittany leans into the attention. "Good. Keep choosing the captain."`,
  ] },
  { when: { favoritism: 'favored', studentId: 8 }, weight: 7, text: [
    `Maya catches your eye and stays. Chosen. She does not decorate it.`,
  ] },
  { when: { favoritism: 'favored', studentId: 6 }, weight: 7, text: [
    `Tiffany hosts the favor like a mixer she already won. "Keep choosing me."`,
  ] },
  { when: { favoritism: 'favored', studentId: 10 }, weight: 7, text: [
    `Reneé tastes the attention like a successful service. "You came back. Correct."`,
  ] },
  { when: { favoritism: 'neglected', stageMin: 6 }, weight: 5, text: [
    `{subject.name} shifts a slow reminder of how much body you are ignoring. "Plenty of me still hungry."`,
  ] },
  { when: { favoritism: 'neglected', relationship: [3] }, weight: 5, text: [
    `{subject.name} does not raise her voice. "I thought I was yours to feed."`,
  ] },
]);

// ── hive ──────────────────────────────────────────────────────
registerModuleVariants('hive.mayaWatches', [
  { when: { studentId: 8, stageMin: 7 }, weight: 6, text: [
    'Maya watches from the nest, vast and quiet. New bodies enter. She does not need to speak.',
  ] },
  { when: { studentId: 8, stageMax: 4 }, weight: 6, text: [
    'Maya watches from the center she is still growing into. The nest hums anyway.',
  ] },
  { when: { studentId: 15 }, weight: 5, text: [
    'Maya watches Lilith lead them in. The nest accepts the delivery.',
  ] },
  { when: { corruption: [2] }, weight: 4, text: [
    'Maya says nothing. Warmth builds. The newcomers feel it in their teeth.',
  ] },
]);

// ── supernatural ──────────────────────────────────────────────
registerModuleVariants('supernatural.ascension.offer', [
  { when: { studentId: 4 }, weight: 6, text: [
    'Lights dim. Fiona steps into a frame that forgets how thin she is supposed to be.',
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    'Hunger without mass. Maya is offered a second skin. She looks at you first.',
  ] },
  { when: { studentId: 15 }, weight: 6, text: [
    'Something offers Lilith a hollow gift. She looks at it the way she looks at prey.',
  ] },
]);
registerModuleVariants('supernatural.ascension.accept', [
  { when: { studentId: 4 }, weight: 6, text: [
    'Fiona accepts the hollow gift — thin, luminous, remembering every pound.',
  ] },
  { when: { studentId: 18 }, weight: 6, text: [
    'Talia accepts like a spec: thin skin, loud hunger, data retained.',
  ] },
]);
registerModuleVariants('supernatural.curse.hunger', [
  { when: { studentId: 10 }, weight: 5, text: [
    'Every plate looks smaller than it is. Reneé tastes the lie and hates the kitchen for it.',
  ] },
  { when: { studentId: 14 }, weight: 5, text: [
    'Mary Jane stares at a feast that feels thin. Harvest hunger with the tap shut.',
  ] },
  { when: { scarcityPressureBand: 'high' }, weight: 4, text: [
    'Something counts bites without eating. Permission itself is under audit.',
  ] },
]);
registerModuleVariants('supernatural.curse.clear', [
  { when: { studentId: 8 }, weight: 5, text: [
    'Refeast steam. Maya\'s curse dissolves into appetite again.',
  ] },
  { when: { studentId: 15 }, weight: 5, text: [
    'Lilith watches scarcity leave the room. Hunger comes back wearing a smile.',
  ] },
]);
registerModuleVariants('supernatural.refeed.surge', [
  { when: { studentId: 0 }, weight: 6, text: [
    'Softness returns like a heat Brittany already entered. Belly rounding in real time.',
  ] },
  { when: { studentId: 5 }, weight: 6, text: [
    'Destiny\'s hoodie fills. Remembered mass rushes back. "Okay. Buff applied."',
  ] },
  { when: { studentId: 15 }, weight: 6, text: [
    'Lilith breaks the thin spell. The blueprint in her skin remembers glory.',
  ] },
  { when: { memoryMassBand: 'high' }, weight: 4, text: [
    'She wants more than she was. The tide does not ask twice.',
  ] },
]);
registerModuleVariants('supernatural.act.open', [
  { when: {}, weight: 4, text: [
    'Stomachs flutter empty. A voice: you may have their bodies, not their hunger.',
    'The rune glows. Scarcity arrives wearing wellness language like a crown.',
  ] },
]);
registerModuleVariants('supernatural.thinReveal', [
  { when: { studentId: 0 }, weight: 5, text: [
    'Brittany is actually thin and the wrongness steals the room. Hunger rolls off her sharper.',
  ] },
  { when: { studentId: 8 }, weight: 5, text: [
    'Maya looks like she never ate. Memory of every pound hangs on the frame anyway.',
  ] },
]);
registerModuleVariants('supernatural.thin.voice', [
  { when: { studentId: 5, supernatural: true }, weight: 5, text: [
    'Frame skip. Body lag. Stomach buffering — always loading, never full enough.',
  ] },
  { when: { studentId: 8, supernatural: true }, weight: 5, text: [
    'I can feel every room I used to fill. The hunger stayed when the weight left.',
  ] },
]);

// ── origin leftovers (A6 early) ───────────────────────────────
registerModuleVariants('origin.stirring.line', [
  { when: { studentId: 2, stageMax: 3 }, weight: 5, text: [
    'Kylie eats like the camera is off. Something old in the brand voice goes quiet.',
  ] },
  { when: { studentId: 3, stageMax: 3 }, weight: 5, text: [
    'Serena fuels like a rule she is rewriting. Old training still sits in the shoulders.',
  ] },
  { when: { studentId: 10, stageMax: 3 }, weight: 5, text: [
    'Reneé tastes first. The kitchen she came from already taught her to finish.',
  ] },
  { when: { studentId: 12, stageMax: 3 }, weight: 5, text: [
    'Nadia watches her own first extra bite like a subject settling in.',
  ] },
  { when: { studentId: 16, stageMax: 3, corruption: [0] }, weight: 5, text: [
    'Sophia tells herself this is still within range. The range moves.',
  ] },
  { when: { studentId: 18, stageMax: 3 }, weight: 5, text: [
    'Talia treats the ache like a reading. Then she solves it with her mouth.',
  ] },
]);

// ── echo archive ──────────────────────────────────────────────
registerModuleVariants('echo.capture', [
  { when: { studentId: 8, stageMax: 4 }, weight: 5, text: [
    'Early echo — Maya\'s softness still surprising, appetite still learning to speak.',
  ] },
  { when: { studentId: 0, stageMin: 5 }, weight: 5, text: [
    'The archive catches Brittany crossing a heat. Growth made retrievable.',
  ] },
  { when: { studentId: 15, stageMin: 9 }, weight: 6, text: [
    'The moment crystallizes. Lilith fills the memory the way she fills the room.',
  ] },
]);
registerModuleVariants('echo.replay.beat', [
  { when: { studentId: 2, stageMin: 4 }, weight: 5, text: [
    'Kylie\'s echo replays sharper. Appetite more present than the last visit.',
  ] },
  { when: { studentId: 8 }, weight: 5, text: [
    'Maya\'s echo returns. The body remembers what she refused to narrate.',
  ] },
]);
registerModuleVariants('echo.replay.sensory', [
  { when: { studentId: 10, stageMin: 6 }, weight: 5, text: [
    'Warmth. Weight. The particular give when Reneé leans forward for more.',
  ] },
  { when: { studentId: 14 }, weight: 5, text: [
    'Heat, fabric strain, the pleasure of being counted. Harvest still in the air.',
  ] },
]);
registerModuleVariants('echo.resonate', [
  { when: { studentId: 16 }, weight: 5, text: [
    'Sophia\'s memory bleeds into now. Appetite amplified. The echo becomes a dose.',
  ] },
  { when: { studentId: 15, stageMin: 6 }, weight: 5, text: [
    'You press Lilith\'s archive into flesh. She will grow faster for being remembered.',
  ] },
]);
registerModuleVariants('echo.type.stage_up', [
  { when: { studentId: 0 }, weight: 5, text: [
    'Brittany crossed a threshold the locker room felt. Mass made ceremony.',
  ] },
]);
registerModuleVariants('echo.type.weigh_in', [
  { when: { studentId: 7 }, weight: 5, text: [
    'The number landed. Priya looked at it. She did not look away.',
  ] },
  { when: { studentId: 18 }, weight: 5, text: [
    'Digits climbed. Talia tracked them like a successful output.',
  ] },
]);
registerModuleVariants('echo.type.dinner_unbutton', [
  { when: { studentId: 6, stageMin: 4 }, weight: 5, text: [
    'A button gave in public. Tiffany kept eating. The restaurant failed to ignore it.',
  ] },
  { when: { studentId: 9 }, weight: 5, text: [
    'Fabric surrendered. Chloé did not. The moment is preserved whole.',
  ] },
]);
registerModuleVariants('echo.type.immobility', [
  { when: { studentId: 8 }, weight: 5, text: [
    'Maya stopped needing to move. The world came to her — food, warmth, you.',
  ] },
  { when: { studentId: 15 }, weight: 5, text: [
    'Lilith is architecture now. Immobile, content, the hunt sitting down.',
  ] },
]);
registerModuleVariants('echo.type.corruption_tier', [
  { when: { studentId: 1, corruptionMin: 50 }, weight: 5, text: [
    'Madeline\'s want reorganized around yes. Shame lost another footnote.',
  ] },
]);
registerModuleVariants('echo.type.evolution', [
  { when: { studentId: 2 }, weight: 5, text: [
    'Kylie became the form the channel already wanted. The echo kept the becoming.',
  ] },
]);

// ── leftover stream.pre thin cells (Destiny; dialogue = gamer OK) ─
registerModuleVariants('stream.pre.outfit.casual.c3', [
  { when: { stageMin: 5 }, weight: 4, text: [
    'shorts riding the new hip line like they lost an argument last week',
  ] },
  { when: { stageMin: 7 }, weight: 4, text: [
    'waistband digging a soft trench she pretends is the cut of the shorts',
  ] },
]);
registerModuleVariants('stream.pre.outfit.casual.line', [
  { when: { stageMin: 6 }, weight: 4, text: [
    `"Same hoodie. Tighter. Chat, you already know."`,
  ] },
]);
registerModuleVariants('stream.pre.outfit.branded.c1', [
  { when: { stageMin: 5 }, weight: 4, text: [
    'logo sitting on a belly that has been promoting itself without a contract',
  ] },
]);
registerModuleVariants('stream.pre.bodyCheck.showoff.c2', [
  { when: { stageMin: 6 }, weight: 4, text: [
    'she turns so the camera gets the swell she is no longer hiding',
  ] },
]);
registerModuleVariants('stream.pre.bodyCheck.showoff.line', [
  { when: { stageMin: 5 }, weight: 4, text: [
    `"Yeah, that's all me. Clip it if you want."`,
  ] },
]);
registerModuleVariants('stream.pre.snack.light.c2', [
  { when: {}, weight: 4, text: [
    'a little pregame that already looks like a first course',
  ] },
]);
registerModuleVariants('stream.pre.warmup.skip.c1', [
  { when: {}, weight: 4, text: [
    'she skips the stretch and sits like the chair was the warmup',
  ] },
]);
registerModuleVariants('stream.pre.warmup.skip.line', [
  { when: {}, weight: 4, text: [
    `"Warmup is the sit. Don't make it a thing."`,
  ] },
]);
registerModuleVariants('stream.pre.snack.heavy.line', [
  { when: { stageMin: 5 }, weight: 4, text: [
    `"Pregame tray. Don't start counting yet."`,
  ] },
]);
registerModuleVariants('stream.pre.setup.comfort.line', [
  { when: { stageMin: 6 }, weight: 4, text: [
    `"Chair's set. Overlay's honest. I'm sitting."`,
  ] },
]);

// ── leftover talk.checkIn accept/owned for missing IDs ────────
registerModuleVariants('talk.checkIn.acceptOpen', [
  { when: { studentId: 3 }, weight: 6, text: [
    `Serena lets the check-in land like a coach visit she actually wanted.`,
  ] },
  { when: { studentId: 4 }, weight: 6, text: [
    `Fiona looks up from the page and lets the visit become the subject.`,
  ] },
  { when: { studentId: 6 }, weight: 6, text: [
    `Tiffany hosts the check-in the way she hosts a room — already offering you a seat.`,
  ] },
  { when: { studentId: 7 }, weight: 6, text: [
    `Priya files you under scheduled and then forgets the file because she is glad.`,
  ] },
  { when: { studentId: 9 }, weight: 6, text: [
    `Chloé says the check-in is civilized and then makes it a second course.`,
  ] },
  { when: { studentId: 12 }, weight: 6, text: [
    `Nadia observes her own relief at being asked. Then she answers.`,
  ] },
  { when: { studentId: 13 }, weight: 6, text: [
    `Daisy treats the visit like someone finally came to the kitchen.`,
  ] },
  { when: { studentId: 17 }, weight: 6, text: [
    `Indiana grins like you found the cache. "Took you long enough."`,
  ] },
  { when: { studentId: 18 }, weight: 6, text: [
    `Talia logs the check-in as expected input. The smile arrives a beat late.`,
  ] },
]);
registerModuleVariants('talk.checkIn.ownedOpen', [
  { when: { studentId: 1 }, weight: 6, text: [
    `Madeline closes the notebook like the visit is the better source.`,
  ] },
  { when: { studentId: 3 }, weight: 6, text: [
    `Serena sits like the chair is already yours to assign.`,
  ] },
  { when: { studentId: 6 }, weight: 6, text: [
    `Tiffany makes room as if the office were a chapter house and you the guest of honor.`,
  ] },
  { when: { studentId: 7 }, weight: 6, text: [
    `Priya looks up like you are the extra credit she wanted.`,
  ] },
  { when: { studentId: 9 }, weight: 6, text: [
    `Chloé claims the visit in English on purpose. The rest is appetite.`,
  ] },
  { when: { studentId: 14 }, weight: 6, text: [
    `Mary Jane lights up like harvest just walked in wearing your face.`,
  ] },
  { when: { studentId: 16 }, weight: 6, text: [
    `Sophia stops mid-protocol. You are here. The plan can wait.`,
  ] },
  { when: { studentId: 18 }, weight: 6, text: [
    `Talia sets the schematic aside. The experiment is the room now.`,
  ] },
]);

// ── leftover recording wrap ───────────────────────────────────
registerModuleVariants('recording.wrap.perfect', [
  { when: { studentId: 2, recordingStage: [1, 2] }, weight: 6, text: [
    'Perfect clip. Kylie at {subject.lbs} — belly rounder, camera honest, she looks sold.',
  ] },
  { when: { studentId: 2, recordingStage: 5 }, weight: 6, text: [
    'You wrap the perfect sit. Kylie fills the room at {subject.lbs}, blissful and vast.',
  ] },
]);
registerModuleVariants('recording.wrap.great', [
  { when: { studentId: 2 }, weight: 5, text: [
    'Great take. Kylie breathes easy. The new weight is the whole frame.',
  ] },
]);
registerModuleVariants('recording.payoff', [
  { when: { studentId: 2, recordingStage: [1, 2] }, weight: 5, text: [
    'Filming complete. {subject.lbs} pounds — Kylie softer, appetite honored, chat already clipped.',
  ] },
]);

// ── leftover weekly parent leftovers ──────────────────────────
registerModuleVariants('weekly.chairBreaks.playerAid', [
  { when: { studentId: 6 }, weight: 5, text: [
    'You catch Tiffany before the wreck finishes. She still looks like she hosted it.',
  ] },
  { when: { studentId: 14 }, weight: 5, text: [
    'You get Mary Jane standing. She laughs at the chair like a fence that lost.',
  ] },
]);
registerModuleVariants('weekly.teamWeighIn.professional', [
  { when: { studentId: 3 }, weight: 5, text: [
    'Serena treats the official reading like a heat she already accepted.',
  ] },
]);
registerModuleVariants('weekly.customClothing.tone', [
  { when: { studentId: 2 }, weight: 5, text: [
    'Kylie calls the new fit a drop. The seam calls it overdue.',
  ] },
]);
