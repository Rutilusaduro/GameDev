// The Squad — Lead: A2 Psych | Support: A5 Editor
// Depth variants for hunger interrupt outcome fragment pools.
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('hunger.response.feed.lunge', [
  { when: { stageMin: 8, hungerTier: [4] }, weight: 3, text: [
    `At {subject.lbs} lbs she surges forward — hunger and mass both arriving at once.`,
    `Agreement barely leaves your mouth before her whole body leans into the food.`,
  ]},
  { when: { studentId: 0, hungerTier: [3, 4] }, weight: 4, text: [
    `Brittany lunges like the whistle blew. "Finally," she says, already eating.`,
  ]},
  { when: { studentId: 15, hungerTier: [3, 4] }, weight: 4, text: [
    `Lilith moves fast for someone her size. Food first. Words later.`,
  ]},
]);

registerModuleVariants('hunger.response.feed.eating', [
  { when: { stageMin: 7, hungerTier: [4] }, weight: 3, text: [
    `She eats with the focus of someone who has been empty too long — vast body still, mouth relentless.`,
  ]},
  { when: { studentId: 2, hungerTier: [3, 4] }, weight: 4, text: [
    `Kylie eats fast, one eye on the plate, one on your reaction. "Don't stop me," she murmurs between bites.`,
  ]},
  { when: { studentId: 8 }, weight: 4, text: [
    `Maya eats quietly, steadily — relief visible in how her shoulders drop with each bite.`,
  ]},
  { when: { studentId: 10, hungerTier: [3, 4] }, weight: 4, text: [
    `Reneé savors and devours at once — hunger treated like a course worth respecting.`,
  ]},
  { when: { studentId: 12, hungerTier: [4] }, weight: 4, text: [
    `Nadia eats with clinical intensity. "Optimal intake rate," she notes, not stopping.`,
  ]},
  { when: { studentId: 18, hungerTier: [3, 4] }, weight: 4, text: [
    `Talia consumes calories like data — fast, thorough, grateful.`,
  ]},
]);

registerModuleVariants('hunger.response.feed.aftermath', [
  { when: { stageMin: 9 }, weight: 3, text: [
    `She leans back, enormous and warm — fed enough to breathe, still hungry for your attention.`,
  ]},
  { when: { studentId: 4, corruption: [1, 2] }, weight: 4, text: [
    `Fiona exhales like a vision clearing. "Thank you," she whispers. "I needed that."`,
  ]},
  { when: { studentId: 6 }, weight: 4, text: [
    `Tiffany pats her middle, bright. "Crisis averted. Chapter morale restored."`,
  ]},
  { when: { studentId: 11 }, weight: 4, text: [
    `Kaylee curls closer, soft and heavy. "You always know," she murmurs.`,
  ]},
  { when: { studentId: 14 }, weight: 4, text: [
    `Mary Jane sighs, sunny. "You're an angel," she says. "My belly agrees."`,
  ]},
  { when: { studentId: 17 }, weight: 4, text: [
    `Indiana grins, crumbs on her lip. "Dig successful," she says. "Artifact secured."`,
  ]},
]);

registerModuleVariants('hunger.response.compound.offer', [
  { when: { studentId: 7, addictionLevel: [3, 4] }, weight: 4, text: [
    `Priya takes the compound with both hands. "Dosage accepted," she says. "Relief pending."`,
  ]},
  { when: { studentId: 12 }, weight: 4, text: [
    `Nadia swallows it without ceremony. "Hypothesis: this helps. Testing now."`,
  ]},
  { when: { stageMin: 8, addictionLevel: [4] }, weight: 3, text: [
    `Her fingers shake until the compound is in her mouth — need stripped bare.`,
  ]},
]);

registerModuleVariants('hunger.response.compound.relief', [
  { when: { studentId: 3 }, weight: 4, text: [
    `Serena's jaw unclenches. "Cooldown initiated," she mutters, eyes closing.`,
  ]},
  { when: { studentId: 5 }, weight: 4, text: [
    `Destiny sags against the doorframe. "Debuff cleared," she says. "Thanks, coach."`,
  ]},
  { when: { corruption: [2], addictionLevel: [3, 4] }, weight: 3, text: [
    `Relief washes over her — shameless, grateful, still wanting you near.`,
  ]},
]);

registerModuleVariants('hunger.response.deny.reaction', [
  { when: { studentId: 0, hungerTier: [4] }, weight: 4, text: [
    `Brittany's face falls — captain's pride cracking. "Seriously?" she says, hurt sharp.`,
  ]},
  { when: { studentId: 2, corruption: [2] }, weight: 4, text: [
    `Kylie's smile goes cold. "Fine. I'll post about hunger instead."`,
  ]},
  { when: { studentId: 8, relationship: [2, 3, 4] }, weight: 4, text: [
    `Maya's eyes shine — not with anger, with wounded trust. She looks away.`,
  ]},
  { when: { studentId: 15, hungerTier: [3, 4] }, weight: 4, text: [
    `Lilith goes very still. "Remember this," she says, voice flat.`,
  ]},
  { when: { stageMin: 7, hungerTier: [4] }, weight: 3, text: [
    `Hurt flashes across her vast face — hunger and pride colliding. She swallows it down.`,
  ]},
]);

registerModuleVariants('hunger.response.deny.exit', [
  { when: { studentId: 9 }, weight: 4, text: [
    `Chloé leaves with chin high — wounded dignity in every step.`,
  ]},
  { when: { studentId: 13 }, weight: 4, text: [
    `Daisy nods once, polite and broken. The hallway takes her without a sound.`,
  ]},
  { when: { corruption: [2], hungerTier: [4] }, weight: 3, text: [
    `She stares a long moment — memorizing your face — then turns without another word.`,
  ]},
]);

registerModuleVariants('hunger.response.talk.calm', [
  { when: { studentId: 4 }, weight: 4, text: [
    `Fiona breathes with you — slow, shaky, grounding. "Okay," she whispers. "Okay."`,
  ]},
  { when: { studentId: 6 }, weight: 4, text: [
    `Tiffany smooths her skirt, bright recovering. "Crisis management," she says. "We're fine."`,
  ]},
  { when: { studentId: 11, relationship: [3, 4] }, weight: 4, text: [
    `Kaylee listens because it is you. Shame and hunger untangle under your voice.`,
  ]},
  { when: { stageMin: 6, hungerTier: [3, 4] }, weight: 2, text: [
    `Your words reach her — not food, but close enough to loosen the frantic edge.`,
  ]},
]);

registerModuleVariants('hunger.response.talk.depart', [
  { when: { studentId: 7 }, weight: 4, text: [
    `Priya pauses at the door. "Rescheduling intake," she says quietly. "Thank you for the data."`,
  ]},
  { when: { studentId: 10 }, weight: 4, text: [
    `Reneé lingers, appetite banked. "Next time," she says, "bring pastries."`,
  ]},
  { when: { studentId: 18 }, weight: 4, text: [
    `Talia adjusts her glasses. "Caloric deficit remains," she notes. "Exit logged."`,
  ]},
  { when: { corruption: [2], hungerTier: [4] }, weight: 3, text: [
    `She looks back once — hungry, patient, certain this is not over.`,
  ]},
]);
