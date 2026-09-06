// The Squad — Lead: A2 Psych | Support: A5 Editor
// Wildcard depth for roster tell + ecology report (Pass 30).
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('roster.tell', [{ when: {}, text: [
  'gaining slow and sure, week by week',
] }]);

registerModuleVariants('roster.ecologyReport.favored', [{ when: {}, text: [
  `{subject.name} has been at the center of your attention this week — fed often, spoken to first, and she carries that favor like warmth.`,
] }]);

registerModuleVariants('roster.ecologyReport.neglected', [{ when: {}, text: [
  `{subject.name} has had less of you than the others lately. The distance reads in how she holds herself when you pass.`,
] }]);

registerModuleVariants('roster.ecologyReport', [{ when: {}, text: [
  'The class ecology shifts week to week — who gets fed, who gets spoken to, who starts to pull ahead.',
  'Attention in the room has its own weather; this week it settled somewhere specific.',
] }]);
