// ═══════════════════════════════════════════════════════════════
// DESTINY STREAM — brand-variance pre-stream vignettes
// [BRAND VARIANCE] hooks for snack, warmup, setup, body check
// ═══════════════════════════════════════════════════════════════
import { registerModuleVariants } from '../engine.js';
import { BRANDS } from '../../gameData/streaming.js';

const bn = (ctx) => BRANDS[ctx.d.brand]?.name || 'the brand';

// ── Snack: brand variance ──────────────────────────────────────

registerModuleVariants('stream.pre.snack.light', [
  { when: { brand: 'crunchforge', brandControl: 'soldOut' }, priority: 8,
    text: [(ctx) => `She tears into a ${bn(ctx)} promo snack like it offended her — fast, loud, crumbs everywhere.\n\n"Sponsor sent samples. I'm quality-testing with my mouth. Professional."`] },
  { when: { brand: 'crunchforge' }, priority: 6,
    text: [(ctx) => `A ${bn(ctx)} protein bar disappears in four bites. Aggressive pre-game fuel.\n\n"Gotta wake the beast. Chat knows what's coming."`] },
  { when: { brand: 'fizzpeak' }, priority: 6,
    text: [(ctx) => `Neon ${bn(ctx)} candy and an energy drink — she vibrates before the real food even arrives.\n\n"POP POP POP — I'm literally buzzing. This is fine."`] },
  { when: { brand: 'velvetmelt' }, priority: 6,
    text: [(ctx) => `She savors a small ${bn(ctx)} truffle bite by bite, eyes half-lidded, mic picking up every soft sound.\n\n"Just… waking up the palate. Don't rush me."`] },
  { when: { brand: 'glazeco' }, priority: 6,
    text: [(ctx) => `A glossy ${bn(ctx)} pastry — she licks frosting off her finger and makes chat wait for the next bite.\n\n"I'm being good. For now. Tips speed me up."`] },
]);

registerModuleVariants('stream.pre.snack.heavy', [
  { when: { brand: 'crunchforge' }, priority: 6,
    text: [(ctx) => `She demolishes a ${bn(ctx)} family platter like it's a speedrun category.\n\n"Sponsor said go hard. I'm going harder."`] },
  { when: { brand: 'fizzpeak' }, priority: 6,
    text: [(ctx) => `Chaos pre-snack — ${bn(ctx)} samples, chips, soda, all at once. Energy unhinged.\n\n"I'm pre-gaming. Don't judge. Join."`] },
  { when: { brand: 'velvetmelt' }, priority: 6,
    text: [(ctx) => `A heavy ${bn(ctx)} spread eaten slow and sinful, every bite performed for the camera.\n\n"I'm already getting full… and I don't even care yet."`] },
  { when: { brand: 'glazeco' }, priority: 6,
    text: [(ctx) => `She eats a ridiculous ${bn(ctx)} dessert tray while complaining she's "only a little hungry."\n\n"I'm being so bad~ Chat made me do it."`] },
]);

registerModuleVariants('stream.pre.snack.skip', [
  { when: { brand: 'crunchforge' }, priority: 5,
    text: [(ctx) => `"${bn(ctx)} wants carnage later. I'm saving the tank."\n\nShe pushes the plate away like discipline is violence.`] },
  { when: { brand: 'fizzpeak' }, priority: 5,
    text: [`"Can't peak too early! Saving the chaos!" She drums on the desk, vibrating anyway.`] },
]);

// ── Warm-up: brand variance ────────────────────────────────────

registerModuleVariants('stream.pre.warmup.stretch', [
  { when: { brand: 'velvetmelt' }, priority: 6,
    text: [(ctx) => `Slow ${bn(ctx)} stretches — rolling her shoulders, letting her belly settle with a soft exhale.\n\n"Comfort first. Content second. Both matter."`] },
  { when: { brand: 'fizzpeak' }, priority: 6,
    text: [`Hyper warm-up — jumping jacks that make everything bounce, chat losing it.\n\n"Gotta get the BLOOD flowing! Let's GO!"`] },
  { when: { brand: 'crunchforge' }, priority: 6,
    text: [`She cracks her knuckles and rolls her neck like she's about to fight the food.\n\n"Warm-up's mental. I'm ready to destroy."`] },
]);

registerModuleVariants('stream.pre.warmup.eat', [
  { when: { brand: 'glazeco' }, priority: 6,
    text: [(ctx) => `Practice bites from a ${bn(ctx)} sample box while reading thirsty chat out loud and roasting them.\n\n"You're all so predictable. I still love you."`] },
  { when: { brand: 'fizzpeak' }, priority: 6,
    text: [`Warm-up bites at double speed while she narrates in a hype voice.\n\n"INSANE warm-up! CRAZY bites! CHAT ARE YOU READY?!"`] },
  { when: { brand: 'velvetmelt' }, priority: 6,
    text: [`Slow warm-up bites, soft sounds, chat getting parasocial in real time.\n\n"Mmm… chat's being so sweet tonight. Dangerous combo."`] },
]);

registerModuleVariants('stream.pre.warmup.skip', [
  { when: { brand: 'crunchforge' }, priority: 5,
    text: [`"No warm-up. Raw dog the challenge. Let's fucking go."`] },
  { when: { brand: 'glazeco' }, priority: 5,
    text: [`"I'm already perfect. Skip the intro." She fixes her hair and hits go.`] },
]);

// ── Setup: brand variance ──────────────────────────────────────

registerModuleVariants('stream.pre.setup.production', [
  { when: { brand: 'glazeco' }, priority: 6,
    text: [(ctx) => `Full ${bn(ctx)} gloss — filters, overlays, sponsor lower-third, everything shiny.\n\n"If I'm on camera I'm expensive. That's the brand."`] },
  { when: { brand: 'fizzpeak' }, priority: 6,
    text: [(ctx) => `Neon ${bn(ctx)} alerts, explosive overlays, chat sounds maxed.\n\n"Production value = CHAOS value!"`] },
  { when: { brand: 'velvetmelt' }, priority: 6,
    text: [(ctx) => `Soft ${bn(ctx)} lighting — warm tones, slow fades, ASMR-adjacent mic levels.\n\n"Pretty setup for pretty suffering. Trust the process."`] },
]);

registerModuleVariants('stream.pre.setup.comfort', [
  { when: { brand: 'velvetmelt' }, priority: 6,
    text: [(ctx) => `Pillows, ${bn(ctx)} blanket, snacks within lazy reach — comfort maxed.\n\n"I'm building a nest. You're watching me nest."`] },
  { when: { brand: 'crunchforge' }, priority: 6,
    text: [`Chair locked, desk cleared for destruction, napkin tucked like armor.\n\n"Comfort is for after. This is war prep."`] },
]);

registerModuleVariants('stream.pre.setup.minimal', [
  { when: { brand: 'fizzpeak' }, priority: 5,
    text: [`"Setup done in ten seconds — we're LIVE LIVE LIVE!" Camera's crooked. She doesn't care.`] },
]);

// ── Body check: brand variance ─────────────────────────────────

registerModuleVariants('stream.pre.bodyCheck.showoff', [
  { when: { brand: 'glazeco' }, priority: 6,
    text: [`She poses like chat is paying per angle — chin up, belly out, brat smirk.\n\n"Like what you see? Tip if you mean it."`] },
  { when: { brand: 'velvetmelt' }, priority: 6,
    text: [`Slow body tour — hands gliding over curves, breathy commentary.\n\n"Chat wanted to see… I'm showing. Be gentle."`] },
  { when: { brand: 'crunchforge' }, priority: 6,
    text: [`She slaps her belly hard enough to wobble and grins.\n\n"This is the weapon. Respect it."`] },
]);

registerModuleVariants('stream.pre.bodyCheck.thorough', [
  { when: { brand: 'velvetmelt', stageMin: 6 }, priority: 7,
    text: [`She kneads her belly with both hands, slow and intimate, watching herself in the monitor.\n\n"God… it's so soft. I could do this forever."`] },
  { when: { brand: 'crunchforge', stageMin: 6 }, priority: 7,
    text: [`She grabs her gut and shakes it once, hard. "Still growing. Still winning."`] },
]);
