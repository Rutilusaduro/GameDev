// The Squad — Lead: A5 Editor | Support: A2 Psych
// Auto-generated — run: node scripts/generateMiscDepthPass40.mjs
// Wildcard depth for misc thin pools (Pass 40).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants("salon_appetit.hub", [{ when: {}, text: ["Chloé lights the candles. Prestige and appetite share the same room tonight."] }]);
registerModuleVariants("artisan_gallery.hub", [{ when: {}, text: ["Fiona hangs the prints. The camera waits; the subject is already hungry."] }]);
registerModuleVariants("jealousy.reaction", [{ when: {}, text: [(ctx) => `${ctx.subject.name} compares plates without meaning to — then pretends she did not.`, (ctx) => `Someone else ate well this week. ${ctx.subject.name} files that away quietly.`] }]);
registerModuleVariants("corruption.voice", [{ when: {}, text: [(ctx) => `${ctx.subject.name} eats with quiet focus — watched, and not minding it.`, (ctx) => `Hunger and attention braid together while ${ctx.subject.name} keeps reaching for more.`] }]);
registerModuleVariants("enc.taliaClinical", [{ when: {}, text: ["\"Baseline established,\" she says, already reaching for the next measurement.", "\"Compliance is efficiency,\" Talia murmurs, eyes on the readout instead of your face."] }]);
registerModuleVariants("shift.scene", [{ when: {}, text: ["", ""] }]);
registerModuleVariants("npc.bystander", [{ when: {}, text: ["A glance becomes a double-take — then a polite look away."] }]);
registerModuleVariants("npc.peer", [{ when: {}, text: ["\"You're filling out,\" a resident says — not cruel, just observant."] }]);
registerModuleVariants("npc.coach", [{ when: {}, text: ["", ""] }]);
registerModuleVariants("npc.staff", [{ when: {}, text: ["", ""] }]);
registerModuleVariants("ra.observation", [{ when: {}, text: ["You note the change the way you note weather — inevitable, worth tracking."] }]);
registerModuleVariants("scrutiny.tierUp.header", [{ when: {}, text: ["Administrative mail arrives with the quiet violence of procedure."] }]);
registerModuleVariants("scrutiny.tierUp.body", [{ when: {}, text: ["The institution has begun counting what you have been doing in plain sight.", "Paper trails do not care how consensual the appetite felt from inside the room."] }]);
registerModuleVariants("scrutiny.tierUp.coda", [{ when: {}, text: ["The notice closes. The pressure does not."] }]);
registerModuleVariants("scrutiny.tierUp", [{ when: {}, text: ["{scrutiny.tierUp.header}\n\n{scrutiny.tierUp.body}", "{scrutiny.tierUp.body}\n\n{scrutiny.tierUp.coda}"] }]);
