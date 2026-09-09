// The Squad — Lead: A2 Psych | Support: A5 Editor
// Wildcard depth for talk.command_finish pools (Pass 25).
import { registerModuleVariants } from '../engine.js';

function pad(pool, lines) {
  registerModuleVariants(pool, [{ when: {}, text: lines }]);
}

// ── corruption 0 — variant 0 ──────────────────────────────────

pad('talk.command_finish.t0v0._f1', [
  `Your voice lands and {subject.name} stills — surprised by how fast obedience follows.`,
  `The command finds her before pride does. {subject.name}'s hands move, startled and eager.`,
]);
pad('talk.command_finish.t0v0._f2', [
  `She eats with wide eyes — mechanical at first, then hungry in spite of herself.`,
  `Bite after bite, her focus narrows to the plates and your voice.`,
]);
pad('talk.command_finish.t0v0._f3', [
  `. At {subject.lbs} lbs her belly swells as she works — soft flesh pressing her waistband, breath shallowing, thighs spreading in the chair.`,
  `. At {subject.lbs} lbs fullness arrives visibly: belly rounding, seams complaining, body accepting more because you said so.`,
]);
pad('talk.command_finish.t0v0._f4', [
  `. She doesn't stop until they're gone.`,
  `. Plate by plate, until the table is bare.`,
]);
pad('talk.command_finish.t0v0._f5', [
  `When it's over she sits very still, hands on her distended middle. "I couldn't stop," she breathes.`,
  `Afterward she stares at empty plates, dazed. "You told me to," she whispers. "I listened."`,
]);
pad('talk.command_finish.t0v0', [
  `{talk.command_finish.t0v0._f1}\n\n{talk.command_finish.t0v0._f3} {talk.command_finish.t0v0._f2}\n\n{talk.command_finish.t0v0._f4}\n\n{talk.command_finish.t0v0._f5}`,
  `{talk.command_finish.t0v0._f2} {talk.command_finish.t0v0._f1}\n\n{talk.command_finish.t0v0._f3}\n\n{talk.command_finish.t0v0._f5} {talk.command_finish.t0v0._f4}`,
]);

// ── corruption 0 — variant 1 ──────────────────────────────────

pad('talk.command_finish.t0v1._f1', [
  `The word lands and {subject.name} breaks — not violently, completely. Hesitation dissolves; appetite remains.`,
  `Manners fall away in a single breath. {subject.name} obeys before she can argue with herself.`,
]);
pad('talk.command_finish.t0v1._f2', [
  `She cleans every plate with frightening focus — fork scraping, throat working, belly tightening with each addition.`,
  `She eats like someone proving a point to her own body — thorough, relentless, astonished.`,
]);
pad('talk.command_finish.t0v1._f3', [
  `. At {subject.lbs} lbs the growth shows in real time: soft flesh pushing outward, seams straining, obedience written in every bite.`,
  `. At {subject.lbs} lbs her body swells obediently — warmth, give, fullness stacking under your gaze.`,
]);
pad('talk.command_finish.t0v1._f4', [
  `Afterward she gasps, overwhelmed — transformed by what she can do when commanded.`,
  `When she stops, she's trembling and full, cheeks wet, unable to pretend it didn't feel good.`,
]);
pad('talk.command_finish.t0v1', [
  `{talk.command_finish.t0v1._f1}\n\n{talk.command_finish.t0v1._f3} {talk.command_finish.t0v1._f2}\n\n{talk.command_finish.t0v1._f4}`,
  `{talk.command_finish.t0v1._f2}\n\n{talk.command_finish.t0v1._f1} {talk.command_finish.t0v1._f3}\n\n{talk.command_finish.t0v1._f4}`,
]);
pad('talk.command_finish.t0', [
  `{talk.command_finish.t0v1}`,
  `{talk.command_finish.t0v0}`,
]);

// ── corruption 1 — variant 0 ──────────────────────────────────

pad('talk.command_finish.t1v0._f1', [
  `{subject.name} exhales, settles, and obeys — methodical, thorough. At {subject.lbs} lbs she knows the rhythm: chew, swallow, breathe, repeat.`,
  `She nods once and begins — no theater, just appetite answering command.`,
]);
pad('talk.command_finish.t1v0._f2', [
  `. Her belly grows heavier with each plate; her thighs spread; her eyes stay on yours.`,
  `. Fullness stacks warm and visible; she doesn't look away from you while she takes it.`,
]);
pad('talk.command_finish.t1v0._f3', [
  `When the last plate is clean she sits back, distended and warm, waiting for the next instruction.`,
  `She finishes and folds her hands on her full middle — ready, not ashamed, not finished wanting.`,
]);
pad('talk.command_finish.t1v0', [
  `{talk.command_finish.t1v0._f3}\n\n{talk.command_finish.t1v0._f1} {talk.command_finish.t1v0._f2}`,
  `{talk.command_finish.t1v0._f1} {talk.command_finish.t1v0._f2}\n\n{talk.command_finish.t1v0._f3}`,
]);

// ── corruption 1 — variant 1 ──────────────────────────────────

pad('talk.command_finish.t1v1._f1', [
  `She doesn't negotiate. {subject.name} eats because you said eat — every plate, every crumb, devoted hunger.`,
  `"Yes," she says, and means it with her whole body. Then she starts.`,
]);
pad('talk.command_finish.t1v1._f2', [
  `At {subject.lbs} lbs obedience has a physical sound — breath labored, flesh shifting, belly swelling with each swallow.`,
  `At {subject.lbs} lbs her body performs the command: soft, heavy, pleased to be used.`,
]);
pad('talk.command_finish.t1v1._f3', [
  `. When she finishes she looks to you for what comes next.`,
  `. "Done," she murmurs, patting her middle once. "Tell me when to start again."`,
]);
pad('talk.command_finish.t1v1', [
  `{talk.command_finish.t1v1._f1}\n\n{talk.command_finish.t1v1._f3} {talk.command_finish.t1v1._f2}`,
  `{talk.command_finish.t1v1._f2}\n\n{talk.command_finish.t1v1._f1} {talk.command_finish.t1v1._f3}`,
]);
pad('talk.command_finish.t1', [
  `{talk.command_finish.t1v1}`,
  `{talk.command_finish.t1v0}`,
]);

// ── corruption 2 — variant 0 ──────────────────────────────────

pad('talk.command_finish.t2v0._f1', [
  `"Yes, RA." Relief in the obedience — like she's been waiting for permission to want this much.`,
  `"Finally," she breathes, and begins without another word.`,
]);
pad('talk.command_finish.t2v0._f2', [
  `{subject.name} cleans every plate, then sits with hands on her {subject.lbs}-lb belly, hopeful there's more. "Again?" she whispers.`,
  `She finishes vast and warm, belly tight, eyes bright. "That was only the first round, right?"`,
]);
pad('talk.command_finish.t2v0._f3', [
  `. "Whenever you want. However much you want."`,
  `. "Don't stop giving orders. I like how they feel."`,
]);
pad('talk.command_finish.t2v0', [
  `{talk.command_finish.t2v0._f1}\n\n{talk.command_finish.t2v0._f2} {talk.command_finish.t2v0._f3}`,
  `{talk.command_finish.t2v0._f2}\n\n{talk.command_finish.t2v0._f1} {talk.command_finish.t2v0._f3}`,
]);

// ── corruption 2 — variant 1 ──────────────────────────────────

pad('talk.command_finish.t2v1._f1', [
  `The command is a gift; {subject.name} receives it like one.`,
  `She smiles — slow, hungry, certain — and reaches for the first plate.`,
]);
pad('talk.command_finish.t2v1._f2', [
  `. She eats with ritual slowness — savoring, swallowing, swelling — until the table is bare and her belly is a tight monument between her thighs.`,
  `. Each bite is deliberate worship: chew, swallow, grow, repeat until nothing remains.`,
]);
pad('talk.command_finish.t2v1._f3', [
  `At {subject.lbs} lbs she licks her fingers, eyes on yours. "More," she murmurs. "Always more."`,
  `At {subject.lbs} lbs shame is a memory. She pats her middle, satisfied and greedy. "Again."`,
]);
pad('talk.command_finish.t2v1', [
  `{talk.command_finish.t2v1._f1} {talk.command_finish.t2v1._f2}\n\n{talk.command_finish.t2v1._f3}`,
  `{talk.command_finish.t2v1._f3}\n\n{talk.command_finish.t2v1._f1} {talk.command_finish.t2v1._f2}`,
]);
pad('talk.command_finish.t2', [
  `{talk.command_finish.t2v1}`,
  `{talk.command_finish.t2v0}`,
]);

registerModuleVariants('talk.command_finish', [
  { when: {}, text: [
    `{talk.command_finish.t1}`,
    `{talk.command_finish.t2}`,
  ] },
]);

// ── Per-student command_finish closers ─────────────────────────

registerModuleVariants('talk.command_finish.t0v0._f5', [
  { when: { studentId: 0 }, weight: 4, text: [`Brittany sits very still, hands on her distended middle. "Coach never trained me for this," she breathes. "I couldn't stop."`] },
  { when: { studentId: 2 }, weight: 4, text: [`Kylie stares at empty plates, dazed. "That footage is insane," she whispers. "Delete nothing."`] },
  { when: { studentId: 5 }, weight: 4, text: [`Destiny slumps back. "Achievement unlocked: cleaned plates," she mutters. "Body overloaded."`] },
  { when: { studentId: 8 }, weight: 4, text: [`Maya sits very still, hands on her middle. "I listened," she says. Just that.`] },
]);

registerModuleVariants('talk.command_finish.t1v0._f3', [
  { when: { studentId: 1 }, weight: 4, text: [`Cassidy folds her hands on her full middle. "Set complete," she says. "Awaiting next instruction."`] },
  { when: { studentId: 3 }, weight: 4, text: [`Serena sits back, distended and warm. "New max," she says. "Again tomorrow."`] },
  { when: { studentId: 11 }, weight: 4, text: [`Kaylee exhales, content. "Thank you for feeding me," she murmurs. "Tell me when to start again."`] },
]);

registerModuleVariants('talk.command_finish.t2v0._f2', [
  { when: { studentId: 6 }, weight: 4, text: [`Tiffany cleans every plate, then pats her {subject.lbs}-lb belly. "Chapter event successful," she says. "Encore?"`] },
  { when: { studentId: 10 }, weight: 4, text: [`Reneé licks her fingers, serene. "Kitchen's empty," she says. "My turn to cook more."`] },
  { when: { studentId: 14 }, weight: 4, text: [`Mary Jane sighs, blissful. "Sunday dinner rules," she says. "Always room for pie."`] },
  { when: { studentId: 15 }, weight: 4, text: [`Lilith smiles. "Good," she says. "Again. I am not finished with you."`] },
]);

registerModuleVariants('talk.command_finish.t2v1._f3', [
  { when: { studentId: 7 }, weight: 4, text: [`Priya pats her middle, satisfied. "Exceeded projections," she says. "Schedule more."`] },
  { when: { studentId: 16 }, weight: 4, text: [`Sophia trembles, full. "Optimal outcome," she whispers. "Repeat trial."`] },
  { when: { studentId: 18 }, weight: 4, text: [`Talia logs the result on her palm. "Successful run," she says. "Increase batch size."`] },
]);

registerModuleVariants('talk.command_finish.t0v0._f3', [
  { when: { stageMin: 8 }, weight: 3, text: [
    `. At {subject.lbs} lbs obedience reshapes the chair — belly vast, breath shallow, flesh settling with each swallowed command.`,
  ]},
]);

registerModuleVariants('talk.command_finish.t2v1._f2', [
  { when: { stageMin: 9 }, weight: 3, text: [
    `. She eats with ritual slowness until the table is bare and her belly is a warm continent between her thighs.`,
  ]},
]);
