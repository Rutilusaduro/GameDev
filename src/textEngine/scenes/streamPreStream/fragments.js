// The Squad — Lead: A1 Mobile | Support: A4 Architect, A5 Editor
// Destiny pre-stream vignettes — clause + line decomposition.
import { registerPool } from '../../engine.js';
import { BRANDS } from '../../../gameData/streaming.js';

const bn = (ctx) => BRANDS[ctx.d.brand]?.name || 'the brand';

// ── stream.pre.outfit.casual ─────────────────────────────────────────────
registerPool('stream.pre.outfit.casual.c1', [
  { when: { stageMin: 11 }, text: [
    'Only small pieces of fabric remain across the very top of her chest. The rest of her massive, soft body is completely bare, deep folds and heavy rolls visible across her torso and lower body.',
  ] },
  { when: { stageMin: 10 }, text: [
    'She wears an extremely oversized black shirt that still fails to fully cover her. The fabric stretches across the upper part of her chest while everything below remains exposed.',
  ] },
  { when: { stageMin: 9 }, text: [
    'The t-shirt is stretched so thin it\'s nearly see-through in areas, riding high enough that most of her torso remains exposed.',
  ] },
  { when: { stageMin: 8 }, text: [
    'Her t-shirt is stretched to its limit, riding high on her belly and barely managing to cover the underside of her chest.',
  ] },
  { when: { stageMin: 7 }, text: [
    'The black t-shirt is stretched thin across her chest and stomach, semi-transparent in places from the pressure.',
  ] },
  { when: { stageMin: 6 }, text: [
    'Her usual black t-shirt clings tightly to her chest and belly, with visible tension lines running across the fabric where it strains to contain her.',
  ] },
  { when: { stageMin: 5 }, text: [
    'Destiny stands in front of the camera wearing a plain black t-shirt and comfortable shorts.',
  ] },
  { when: {}, text: ['She pulls her oversized hoodie straight and checks herself in the monitor — nothing fancy, just what she always streams in.', 'Black tee, comfy shorts, headset on — standard Destiny loadout before she goes live.', 'She checks the camera preview, tugs her shirt flat, and shrugs like this is just another Tuesday stream.'] },
]);

registerPool('stream.pre.outfit.casual.c2', [
  { when: { stageMin: 11 }, text: [
    'What\'s left of her shorts has disappeared entirely beneath the overwhelming mass of her form.',
  ] },
  { when: { stageMin: 10 }, text: [
    'What remains of her shorts is buried deep between heavy rolls of flesh, with only the waistband still visible in places.',
  ] },
  { when: { stageMin: 9 }, text: [
    'Her shorts have been completely swallowed beneath the heavy overhang of her stomach and thighs, with only small portions of fabric still visible between the deep folds of her body.',
  ] },
  { when: { stageMin: 8 }, text: [
    'Her stomach spills heavily over the waistband of her shorts, which have been stretched so tightly that they\'ve disappeared between the thick rolls of her thighs, leaving most of her lower body bare.',
  ] },
  { when: { stageMin: 7 }, text: [
    'A large portion of her lower belly is exposed as the shirt rides up heavily, and her shorts have ridden up between her thighs, digging deep into the soft flesh on either side.',
  ] },
  { when: { stageMin: 6 }, text: [
    'The bottom of the shirt has ridden up enough to expose the soft overhang of her stomach, while her shorts have slipped lower on her hips and are cutting lightly into the tops of her thighs.',
  ] },
  { when: { stageMin: 5 }, text: [
    'The t-shirt has begun to stretch noticeably across her chest and stomach, with the hem riding up slightly in the front to reveal a thin strip of soft skin above the waistband.',
  ] },
  { when: {}, text: ['The fabric sits easy on her frame for now, though the waistband of her shorts is starting to leave a faint mark when she sits down.', 'The hem has started riding up when she sits, leaving a thin band of skin above her shorts.', 'Her shorts hug her hips a little closer than they did at the start of the semester.'] },
]);

registerPool('stream.pre.outfit.casual.c3', [
  { when: { stageMin: 5 }, text: [
    'Her shorts sit lower on her hips than they used to and are starting to dig in lightly at the sides.',
  ] },
  { when: {}, text: ['', 'Her shorts sit lower on her hips than they used to.', 'Fabric tension at the waistband — subtle, new, impossible to ignore.'] },
]);

registerPool('stream.pre.outfit.casual.line', [
  { when: { stageMin: 11 }, text: [
    '"I just threw something on. It doesn\'t make much difference anymore."',
  ] },
  { when: { stageMin: 10 }, text: [
    '"Clothes don\'t really matter at this point. This is fine."',
  ] },
  { when: { stageMin: 9 }, text: [
    '"I don\'t even bother picking anything fancy anymore. This is good enough."',
  ] },
  { when: { stageMin: 8 }, text: [
    '"Same thing I always wear. It\'s… doing its best."',
  ] },
  { when: { stageMin: 7 }, text: [
    '"I didn\'t feel like changing. This is fine."',
  ] },
  { when: { stageMin: 6 }, text: [
    '"Same outfit as usual. It\'s getting a little tighter, but whatever."',
  ] },
  { when: { stageMin: 5 }, text: [
    '"I\'m just wearing what I normally wear. Nothing special."',
  ] },
  { when: {}, text: ['"Same hoodie, same shorts. I\'m not dressing up for a warm-up."', '"Same fit, same vibe. Chat knows what they\'re getting."', '"Not dressing up. I\'m here to eat, not walk a runway."'] },
]);

// ── stream.pre.outfit.revealing ─────────────────────────────────────────────
registerPool('stream.pre.outfit.revealing.c1', [
  { when: { stageMin: 11 }, text: [
    'She is functionally naked, with only a few small pieces of fabric and straps remaining across the top of her chest.',
  ] },
  { when: { stageMin: 10 }, text: [
    'Almost nothing remains of the outfit. Just a few thin straps and small pieces of fabric are stretched across the upper curve of her breasts and the sides of her hips.',
  ] },
  { when: { stageMin: 8 }, text: [
    'She\'s wearing what\'s essentially a micro crop top that strains to cover the lower curve of her heavy breasts while leaving most of her torso bare.',
  ] },
  { when: { stageMin: 6 }, text: [
    'The crop top is stretched tight across her breasts and has ridden high enough to fully expose the soft, rounded curve of her belly, which now hangs slightly over the waistband of her shorts.',
  ] },
  { when: { stageMin: 5 }, text: [
    'Destiny stands in front of the camera wearing a small, tight crop top and very short shorts. The top clings to the soft curves of her breasts while leaving a wide strip of her stomach exposed.',
  ] },
  { when: {}, text: ['She changed into a crop top and fitted shorts that hug her curves more than her usual stream gear.', 'Crop top and short shorts — more skin than her usual hoodie uniform, deliberate.', 'She picked the revealing set on purpose; the monitor catches every curve she\'s testing for chat.'] },
]);

registerPool('stream.pre.outfit.revealing.c2', [
  { when: { stageMin: 11 }, text: [
    'Her breasts rest against the upper slope of her enormous belly, which spreads outward in heavy, soft rolls. Her thighs are thick and plush beneath the overwhelming mass of her backside.',
  ] },
  { when: { stageMin: 10 }, text: [
    'Her massive, soft belly hangs heavily and spreads outward in all directions, while her thick thighs and enormous backside dominate her lower body.',
  ] },
  { when: { stageMin: 8 }, text: [
    'Her belly has become large and soft, spilling heavily over the tiny shorts that have completely disappeared between her thick, plush thighs.',
  ] },
  { when: { stageMin: 6 }, text: [
    'The shorts are pulled tight across her hips and backside, disappearing between her thickening thighs.',
  ] },
  { when: { stageMin: 5 }, text: [
    'Her belly has a gentle, soft roundness that sits just above the low waistband of her shorts.',
  ] },
  { when: {}, text: ['It\'s bolder than what she normally wears, and she keeps tugging the hem down like she isn\'t quite used to how much skin it shows.', 'The outfit leaves her midriff bare; she keeps catching herself in the reflection.', 'More skin on camera than last month — she pretends that wasn\'t intentional.'] },
]);

registerPool('stream.pre.outfit.revealing.line', [
  { when: { stageMin: 11 }, text: [
    '"I don\'t think this even counts as an outfit. But I guess people like seeing how big I am."',
  ] },
  { when: { stageMin: 10 }, text: [
    '"There\'s not much point in wearing real clothes anymore. This is as bold as it gets."',
  ] },
  { when: { stageMin: 8 }, text: [
    '"This doesn\'t really cover much anymore. I guess that\'s the point."',
  ] },
  { when: { stageMin: 6 }, text: [
    '"This shows off a lot more than I usually do. Hope that\'s okay."',
  ] },
  { when: { stageMin: 5 }, text: [
    "\"I went with something a little more… eye-catching today.\"",
  ] },
  { when: {}, text: ['"Chat kept asking for something spicier. Here. Don\'t make it weird."', '"A little extra for the pre-show. Don\'t screenshot… actually, do."', '"Chat wanted thirst. I\'m delivering before we\'re even live."'] },
]);

// ── stream.pre.outfit.branded ─────────────────────────────────────────────
registerPool('stream.pre.outfit.branded.c1', [
  { when: { brand: 'crunchforge', stageMin: 7 }, text: [
    (ctx) => `The black and red ${bn(ctx)} sports bra has ridden up high on her chest, struggling to contain her while leaving most of her torso bare. Her massive belly spills outward, completely swallowing the athletic shorts into thin strips of fabric cutting into her thick thighs.\n\n"They keep sending me these. I'm pretty sure they like how I look trying to fit into them."`,
  ] },
  { when: { brand: 'crunchforge', stageMin: 5 }, text: [
    (ctx) => `Destiny wears the official ${bn(ctx)} outfit: a black and red cropped compression sports bra with the logo stretched across her chest, paired with high-waisted athletic shorts. The sports bra is already beginning to strain, while the shorts sit lower than intended and dig into her hips.\n\n"I put on the outfit they sent me. It feels a little tight already…"`,
  ] },
  { when: { brand: 'fizzpeak', stageMin: 6 }, text: [
    (ctx) => `Neon ${bn(ctx)} gear clings to her — bright, loud, impossible to ignore. The logo pulses on screen when she moves, and the whole look screams energy even when she's just standing there adjusting her headset.\n\n"Peak energy requires peak fit. That's what they told me. I'm not arguing."`,
  ] },
  { when: { brand: 'velvetmelt', stageMin: 6 }, text: [
    (ctx) => `Soft ${bn(ctx)} loungewear drapes over every curve — matte fabric, muted tones, deliberately slow-looking even before she moves. It hugs her belly and thighs like it was designed to be watched.\n\n"Comfort is content. That's the whole pitch. I get it."`,
  ] },
  { when: { brand: 'glazeco', stageMin: 6 }, text: [
    (ctx) => `A glossy ${bn(ctx)} set catches the light every time she shifts — sweet, polished, a little bratty. The fit is deliberate, the shine almost obnoxious, and she knows exactly what it does on camera.\n\n"Do I look expensive yet? That's the question, right?"`,
  ] },
  { when: { brand: 'crunchforge' }, text: [
    (ctx) => `She tugs at the ${bn(ctx)} promo tee stretched across her chest. "Gotta rep the brand, right?"`,
  ] },
  { when: { brand: 'fizzpeak' }, text: [
    (ctx) => `Neon ${bn(ctx)} gear makes her look even more chaotic than usual. "Energy check! Let's go!"`,
  ] },
  { when: { brand: 'velvetmelt' }, text: [
    (ctx) => `Soft ${bn(ctx)} loungewear drapes over every curve. "Comfort is content."`,
  ] },
  { when: { brand: 'glazeco' }, text: [
    (ctx) => `A glossy ${bn(ctx)} set catches the light. "Do I look expensive yet?"`,
  ] },
  { when: {}, text: ['She throws on a sponsor hoodie with the logo front and center, giving the camera a half-turn so chat can see the fit. It\'s not custom-tailored, but it reads loud enough for a pre-stream.', 'Sponsor gear on, logo facing out — she gives the camera a practiced half-turn.', 'Promo fit check: snug, branded, good enough for warm-up duty.'] },
]);

registerPool('stream.pre.outfit.branded.line', [
  { when: { brand: 'crunchforge', stageMin: 7 }, text: [
    (ctx) => `"They keep sending me these. I'm pretty sure they like how I look trying to fit into them."`,
  ] },
  { when: { brand: 'crunchforge', stageMin: 5 }, text: [
    (ctx) => `"I put on the outfit they sent me. It feels a little tight already…"`,
  ] },
  { when: { brand: 'fizzpeak', stageMin: 6 }, text: [
    (ctx) => `"Peak energy requires peak fit. That's what they told me. I'm not arguing."`,
  ] },
  { when: { brand: 'velvetmelt', stageMin: 6 }, text: [
    (ctx) => `"Comfort is content. That's the whole pitch. I get it."`,
  ] },
  { when: { brand: 'glazeco', stageMin: 6 }, text: [
    (ctx) => `"Do I look expensive yet? That's the question, right?"`,
  ] },
  { when: { brand: 'crunchforge' }, text: [
    "\"Gotta rep the brand, right?\"",
  ] },
  { when: { brand: 'fizzpeak' }, text: [
    '"Energy check! Let\'s go!"',
  ] },
  { when: { brand: 'velvetmelt' }, text: [
    "\"Comfort is content.\"",
  ] },
  { when: { brand: 'glazeco' }, text: [
    "\"Do I look expensive yet?\"",
  ] },
  { when: {}, text: ['"Brand fit check. Good enough for going live."', '"Rep the brand, get paid to eat — best deal on campus."', '"Fit\'s tight. Chat, tell them it still works."'] },
]);

// ── stream.pre.bodyCheck.quick ─────────────────────────────────────────────
registerPool('stream.pre.bodyCheck.quick.c1', [
  { when: { stageMin: 9 }, text: [
    'She angles the monitor and exhales slowly, taking in how much of her body fills the frame now. A quick pat to her belly — more habit than inspection — and she shrugs.',
  ] },
  { when: { stageMin: 7 }, text: [
    'A fast glance in the monitor, then she presses a hand to the soft swell of her stomach and lets it settle. She doesn\'t linger on it.',
  ] },
  { when: { stageMin: 5 }, text: [
    'She checks her profile in the camera preview — belly, hips, the way the shirt rides up when she sits. It only takes a few seconds.',
  ] },
  { when: {}, text: ['A fast glance in the monitor, a tug at her waistband, and she\'s done. No theatrics.', 'Monitor glance, hand on stomach, done — no performance, just habit.', 'She pats her belly once, exhales, and turns back to chat.'] },
]);

registerPool('stream.pre.bodyCheck.quick.line', [
  { when: { stageMin: 9 }, text: [
    '"Still me. Still huge. Let\'s eat."',
  ] },
  { when: { stageMin: 7 }, text: [
    '"Yeah, I\'m still getting bigger. We all knew that. Moving on."',
  ] },
  { when: { stageMin: 5 }, text: [
    '"Quick check. Everything\'s where it\'s supposed to be. More or less."',
  ] },
  { when: {}, text: ['"Still me. Still streaming. Let\'s eat."', '"Quick inventory. Still growing. Still streaming."', '"Body check done. You can stare when we\'re live too."'] },
]);

// ── stream.pre.bodyCheck.thorough ─────────────────────────────────────────────
registerPool('stream.pre.bodyCheck.thorough.c1', [
  { when: { stageMin: 10 }, text: [
    'She can barely reach the sides of her belly anymore. When she manages to grab hold and squeeze, the flesh moves in slow, heavy waves, folding over itself in thick, soft layers.',
  ] },
  { when: { stageMin: 8 }, text: [
    'She has to use both arms to properly lift and squeeze her enormous belly. The massive mass hangs heavily in her hands, folding and wobbling as she kneads it.',
  ] },
  { when: { stageMin: 7 }, text: [
    'Her hands disappear almost completely into the massive, soft mass of her belly as she squeezes and lifts it. The heavy flesh spills over her fingers and wobbles deeply with every movement.',
  ] },
  { when: { stageMin: 6 }, text: [
    'She grabs two generous handfuls of her belly and squeezes firmly, her fingers disappearing into the thick, yielding softness. The flesh bulges between her hands as she kneads it slowly.',
  ] },
  { when: { stageMin: 5 }, text: [
    'Destiny reaches down with both hands and cups the soft, rounded swell of her belly.',
  ] },
  { when: {}, text: ['Chat gets the honest version.', 'Hands on her middle, slow squeeze, watching how the soft flesh responds in the preview.', 'She kneads her stomach with quiet curiosity — learning how much there is to hold.'] },
]);

registerPool('stream.pre.bodyCheck.thorough.c2', [
  { when: { stageMin: 8 }, text: [
    'Deep creases form where her fingers press in.',
  ] },
  { when: { stageMin: 5 }, text: [
    'Her fingers sink gently into the plush flesh as she lifts and squeezes it, watching the way it gives and folds between her palms.',
  ] },
  { when: {}, text: ['', 'Her fingers sink into the plush give with a fascinated press.', 'A soft crease forms where she squeezes — she watches it fade slowly.'] },
]);

registerPool('stream.pre.bodyCheck.thorough.line', [
  { when: { stageMin: 10 }, text: [
    '"It\'s so big I can\'t even properly grab it… but I still like how it feels when I try."\n"This is what happens when you let yourself go for too long… and I don\'t even regret it."',
  ] },
  { when: { stageMin: 8 }, text: [
    '"It\'s so fucking heavy… I can feel it pulling on me when I try to lift it like this."\n"See that belly? That\'s all me, baby."',
  ] },
  { when: { stageMin: 7 }, text: [
    '"God… it\'s so big and soft now. I can barely even hold it all."\n"Look at how much it gives… I really packed it on, didn\'t I?"',
  ] },
  { when: { stageMin: 6 }, text: [
    '"It\'s so much bigger than it used to be… I can feel how heavy it is when I do this."\n"Every time I grab it, it feels like there\'s more of it than last time."',
  ] },
  { when: { stageMin: 5 }, text: [
    '"It\'s gotten so soft lately… I didn\'t even notice how much it was changing until I started touching it like this."\n"It feels different now. Heavier. Warmer."',
  ] },
  { when: {}, text: ['"Okay. I know what I\'m working with today. No point pretending otherwise."', '"Okay. That\'s where we\'re at today. Honest stream, honest belly."', '"Touch-test complete. It\'s getting softer. I\'m not mad about it."'] },
]);

// ── stream.pre.bodyCheck.showoff ─────────────────────────────────────────────
registerPool('stream.pre.bodyCheck.showoff.c1', [
  { when: { stageMin: 9 }, text: [
    'She angles the camera low and presses both hands into the upper slopes of her belly, watching the slow, heavy waves travel across her torso.',
  ] },
  { when: { stageMin: 7 }, text: [
    'She angles the camera low and pats her belly, then lets it jiggle for the room. No rush, no shame — just a slow, deliberate show.',
  ] },
  { when: { stageMin: 5 }, text: [
    'She stands, turns, and lets chat see the full silhouette — the curve of her stomach, the way her shorts dig in, the soft bounce when she shifts her weight.',
  ] },
  { when: {}, text: ['She poses deliberately for the camera, chin up, one hand resting on her hip. It\'s performative and she knows it.', 'She turns for the camera with performer posture — chin up, belly presented.', 'Deliberate pose: hand on hip, other tracing the curve of her stomach for chat.'] },
]);

registerPool('stream.pre.bodyCheck.showoff.c2', [
  { when: { stageMin: 9 }, text: [
    'She smiles faintly at the monitor like she knows exactly what chat is going to say.',
  ] },
  { when: {}, text: ['', 'She grins at the monitor like she already knows what the emotes will do.', 'A slow pat to her belly — showmanship, not apology.'] },
]);

registerPool('stream.pre.bodyCheck.showoff.line', [
  { when: { stageMin: 9 }, text: [
    "\"You wanted the full tour. This is all of me now. Take it in.\"",
  ] },
  { when: { stageMin: 7 }, text: [
    '"Chat asked for the full tour. Don\'t say I never give you anything."',
  ] },
  { when: { stageMin: 5 }, text: [
    "\"Like what you see? Good. Stay tuned.\"",
  ] },
  { when: {}, text: ['"I\'m putting on a show before the show. You\'re welcome."', '"Full send on the preview. Tips if you\'re impressed."', '"Tour starts now. Pay attention."'] },
]);

// ── stream.pre.snack.skip ─────────────────────────────────────────────
registerPool('stream.pre.snack.skip.c1', [
  { when: { stageMin: 7 }, text: [
    'She eyes the food off to the side and deliberately looks away, lacing her fingers together like she\'s physically restraining herself.',
  ] },
  { when: { stageMin: 5 }, text: [
    'A plate sits just out of frame. She pushes it farther away with one finger and exhales.',
  ] },
  { when: {}, text: ['She glances at the snacks, then back at chat, and shakes her head.', 'Snacks in frame. She pushes them away with theatrical discipline.', 'She eyes the plate, winces, and deliberately looks back at chat instead.'] },
]);

registerPool('stream.pre.snack.skip.line', [
  { when: { stageMin: 7 }, text: [
    '"Nope. I\'m saving room. You guys are gonna have to wait until the real challenge starts if you want to see me really go at it."',
  ] },
  { when: { stageMin: 5 }, text: [
    '"Saving room for the real thing. Smart, right? …I\'m trying to be smart."',
  ] },
  { when: {}, text: ['"No pre-snacking. I want to be hungry for the main event."', '"No pre-gaming. I want to be hungry when the real food lands."', '"Saving appetite for content. Try to respect the grind."'] },
]);

// ── stream.pre.snack.light ─────────────────────────────────────────────
registerPool('stream.pre.snack.light.c1', [
  { when: { stageMin: 9 }, text: [
    'She eats what she can reach with obvious relish, taking her time with each bite.',
  ] },
  { when: { stageMin: 7 }, text: [
    'Destiny picks up a fry and slowly drags it through sauce before bringing it to her mouth, taking her time to chew while her eyes stay half-lidded. She lets out a soft sigh after swallowing.',
  ] },
  { when: { stageMin: 5 }, text: [
    'Destiny grabs a bag of chips and starts eating while she reads chat, occasionally licking her fingers without thinking much about it. She looks comfortable and at ease.',
  ] },
  { when: {}, text: ['She nibbles something small off-camera, wiping her hands on a napkin between bites. Casual, unhurried.', 'Small bites between mic checks — casual, unhurried, already in stream mode.', 'She nibbles while scrolling chat, licking salt off her fingers without thinking.'] },
]);

registerPool('stream.pre.snack.light.c2', [
  { when: { stageMin: 9 }, text: [
    'Soft, involuntary sounds escape her as she works through the food, her enormous body jiggling faintly with every small movement.',
  ] },
  { when: {}, text: ['', 'Soft chewing sounds into the mic — she doesn\'t mute them.', 'Each bite is small; her appetite still reads hungry on camera.'] },
]);

registerPool('stream.pre.snack.light.line', [
  { when: { stageMin: 9 }, text: [
    '"Just a little something to wake up the stomach… that\'s all this is."',
  ] },
  { when: { stageMin: 7 }, text: [
    '"Just waking up the stomach. That\'s all. Don\'t read into it."',
  ] },
  { when: { stageMin: 5 }, text: [
    "\"Little snack while we wait. Nothing crazy… yet.\"",
  ] },
  { when: {}, text: ['"Just waking up the stomach. That\'s all."', '"Little snack. Little warm-up. Big plans later."', '"Don\'t call it a binge yet. It\'s… research."'] },
]);

// ── stream.pre.snack.heavy ─────────────────────────────────────────────
registerPool('stream.pre.snack.heavy.c1', [
  { when: { stageMin: 9 }, text: [
    'She\'s eating with both hands, food disappearing quickly as she works through what\'s in front of her.',
  ] },
  { when: { stageMin: 7 }, text: [
    'Destiny is demolishing a large order at an impressive pace, barely pausing between bites as sauce and crumbs accumulate on her chest and stomach.',
  ] },
  { when: { stageMin: 5 }, text: [
    'Destiny tears into a burger like she\'s in a hurry, sauce ending up on her fingers and a little on her chin as she powers through it. She barely comes up for air between bites.',
  ] },
  { when: {}, text: ['She\'s already chewing when the stream overlay goes live, working through a takeout bag like she\'s been at it for ten minutes.', 'Takeout open, chewing before the countdown — warm-up calories already in motion.', 'She\'s mid-bite when she notices the camera; she doesn\'t stop chewing.'] },
]);

registerPool('stream.pre.snack.heavy.c2', [
  { when: { stageMin: 9 }, text: [
    'Her belly is pressed against the desk and she has to keep adjusting, but she doesn\'t let it slow her down much.',
  ] },
  { when: { stageMin: 7 }, text: [
    'Her breathing has gotten heavier from how fast she\'s going.',
  ] },
  { when: {}, text: ['', 'Sauce on her fingers; she sucks them clean without breaking eye contact with chat.', 'The desk is already littered with wrappers — preamble to the main event.'] },
]);

registerPool('stream.pre.snack.heavy.line', [
  { when: { stageMin: 9 }, text: [
    "\"What? I got hungry waiting for you people. This is your fault.\"",
  ] },
  { when: { stageMin: 7 }, text: [
    '"I know, I know — I\'m not supposed to fill up before the challenge. Too late."',
  ] },
  { when: { stageMin: 5 }, text: [
    "\"What? I got hungry waiting for you people.\"",
  ] },
  { when: {}, text: ['"Warm-up food counts as warm-up, right? Don\'t @ me."', '"Couldn\'t wait. Chat\'s late anyway. I\'m not."', '"Pre-gaming counts as content if I\'m on camera, right?"'] },
]);

// ── stream.pre.warmup.skip ─────────────────────────────────────────────
registerPool('stream.pre.warmup.skip.c1', [
  { when: {}, text: ['She skips the usual banter and leans into the mic.', 'She skips the banter beat and leans straight into the mic.', 'No preamble — she\'s already in stream voice, chat be damned.'] },
]);

registerPool('stream.pre.warmup.skip.line', [
  { when: {}, text: ['"No warm-up today. We\'re going straight in. Chat better keep up."', '"Straight to business. Chat better keep up."', '"No warm-up today. Hunger doesn\'t wait."'] },
]);

// ── stream.pre.warmup.stretch ─────────────────────────────────────────────
registerPool('stream.pre.warmup.stretch.c1', [
  { when: { stageMin: 9 }, text: [
    'She can barely move, so stretching is mostly small adjustments — shifting weight, rolling her shoulders, letting her belly settle into a less punishing position.',
  ] },
  { when: { stageMin: 7 }, text: [
    'She stretches carefully, belly shifting with each movement, wincing once before finding a position that doesn\'t pinch.',
  ] },
  { when: { stageMin: 5 }, text: [
    'She rolls her shoulders, twists side to side, and pats her stomach once like she\'s knocking on a door.',
  ] },
  { when: {}, text: ['Quick stretches, a deep breath, rolling her neck until it pops.', 'Shoulder roll, neck pop, one hand absent on her stomach — routine.', 'Quick stretches at the desk, breath deep, body waking up for the session.'] },
]);

registerPool('stream.pre.warmup.stretch.line', [
  { when: { stageMin: 9 }, text: [
    '"Gotta loosen up or I\'ll pay for it later. Even if \'loosen up\' means barely moving at all now."',
  ] },
  { when: { stageMin: 7 }, text: [
    '"Gotta loosen up or I\'ll pay for it later. This body needs a minute."',
  ] },
  { when: { stageMin: 5 }, text: [
    '"Okay. Body\'s awake. Let\'s see what it can do today."',
  ] },
  { when: {}, text: ['"Okay. Body\'s awake."', '"Loosen up before we feed the beast."', '"Body\'s awake. Appetite\'s awake. Good combo."'] },
]);

// ── stream.pre.warmup.eat ─────────────────────────────────────────────
registerPool('stream.pre.warmup.eat.c1', [
  { when: { stageMin: 8 }, text: [
    'She has to pause to catch her breath after moving around before she speaks to chat.',
  ] },
  { when: { stageMin: 6 }, text: [
    'She laughs quietly while running a hand over her stomach between bites.',
  ] },
  { when: { stageMin: 5 }, text: [
    'Destiny scrolls through chat and laughs softly before speaking, a few practice bites on the desk beside her.',
  ] },
  { when: {}, text: ['A few practice bites off-camera while she scrolls chat, nodding at comments between chews.', 'Practice bites while she scrolls chat — nodding at comments between chews.', 'She eats slowly off-camera at first, then remembers the mic is hot.'] },
]);

registerPool('stream.pre.warmup.eat.line', [
  { when: { stageMin: 8 }, text: [
    '"Chat\'s asking how I\'m doing with… all of this. I\'m managing. It\'s just a lot more work to get comfortable now."',
  ] },
  { when: { stageMin: 6 }, text: [
    '"Chat\'s really focused on how big I\'ve gotten… you guys like this, huh? I can tell."',
  ] },
  { when: { stageMin: 5 }, text: [
    '"Someone just asked what I\'ve been up to… mostly just eating and trying not to think about how big I\'m getting, honestly."',
  ] },
  { when: {}, text: ['"Gotta get into the zone. This counts as warm-up, right?"', '"Gotta get into the zone. Eating counts as prep."', '"Warm-up bites. Real bites coming later."'] },
]);

// ── stream.pre.setup.minimal ─────────────────────────────────────────────
registerPool('stream.pre.setup.minimal.c1', [
  { when: { stageMin: 11 }, text: [
    'She barely adjusts anything, just turns the camera on and accepts whatever angle it\'s at.',
  ] },
  { when: { stageMin: 10 }, text: [
    'She can barely move, so she just turns the camera on and hopes the angle is okay.',
  ] },
  { when: { stageMin: 9 }, text: [
    'Destiny spends a while trying to get the camera angle right around her massive body, clearly struggling. She eventually just accepts it and starts the stream with a tired sigh.',
  ] },
  { when: { stageMin: 8 }, text: [
    'She has to shift around a lot to get the camera in a decent spot, breathing heavier by the time she\'s done.',
  ] },
  { when: { stageMin: 7 }, text: [
    'Destiny adjusts the camera a few times, clearly trying to find an angle that doesn\'t make her look as big as she feels. She eventually gives up and just starts the stream.',
  ] },
  { when: { stageMin: 5 }, text: [
    'Destiny quickly adjusts her camera angle and checks the lighting before shrugging and starting the stream.',
  ] },
  { when: {}, text: ['A quick camera wiggle, a tap on the mic, and she\'s live.', 'Mic tap, camera wiggle, live — minimum viable production.', 'One light adjusted, one shrug, stream started.'] },
]);

registerPool('stream.pre.setup.minimal.line', [
  { when: { stageMin: 11 }, text: [
    '"I don\'t have the energy to fix it. Let\'s just go."',
  ] },
  { when: { stageMin: 10 }, text: [
    '"I can\'t really do much else anyway… this is fine."',
  ] },
  { when: { stageMin: 8 }, text: [
    '"Okay… that\'s as good as it\'s gonna get. Let\'s just start already."',
  ] },
  { when: { stageMin: 7 }, text: [
    '"Whatever. It\'s fine."',
  ] },
  { when: { stageMin: 5 }, text: [
    '"Good enough. Let\'s just get into it."',
  ] },
  { when: {}, text: ['"Good enough. Let\'s get into it."', '"Good enough. Let\'s feed chat something worth watching."', '"Production value: functional. Appetite value: premium."'] },
]);

// ── stream.pre.setup.comfort ─────────────────────────────────────────────
registerPool('stream.pre.setup.comfort.c1', [
  { when: { stageMin: 11 }, text: [
    'She barely moves while giving quiet instructions on how she wants everything set up.',
  ] },
  { when: { stageMin: 10 }, text: [
    'She can barely move, so setup takes a long time — everything arranged within reach, her body supported as well as it can be.',
  ] },
  { when: { stageMin: 9 }, text: [
    'Destiny has to take extra time making sure everything is within reach and her body is supported properly. She looks tired by the time she\'s done.',
  ] },
  { when: { stageMin: 8 }, text: [
    'She spends a while carefully arranging things so her belly isn\'t pressing too hard against the desk and she can actually reach what she needs.',
  ] },
  { when: { stageMin: 7 }, text: [
    'Destiny takes her time getting comfortable, shifting her massive stomach and making sure she can reach everything without straining too much.',
  ] },
  { when: { stageMin: 5 }, text: [
    'Destiny spends a few minutes adjusting how she\'s sitting and making sure she has snacks and drinks close by.',
  ] },
  { when: {}, text: ['She arranges pillows, pulls snacks within arm\'s reach, and tests her chair angle twice before nodding.', 'Pillows arranged, snacks in reach, chair tested twice — comfort first.', 'She builds her nest at the desk: drinks, napkins, food within lazy arm\'s length.'] },
]);

registerPool('stream.pre.setup.comfort.line', [
  { when: { stageMin: 11 }, text: [
    '"Just… make sure I can reach everything. I can\'t really move to fix it later."',
  ] },
  { when: { stageMin: 10 }, text: [
    '"I can\'t really do this myself anymore… so I have to be careful about how I set up."',
  ] },
  { when: { stageMin: 9 }, text: [
    '"I hate how long this takes now… but I\'ll be miserable if I skip it."',
  ] },
  { when: { stageMin: 8 }, text: [
    '"This is so annoying… but it\'s worse if I don\'t do it."',
  ] },
  { when: { stageMin: 7 }, text: [
    '"I\'ve gotten too big to just wing it anymore. If I don\'t set this up properly I\'ll be hurting later."',
  ] },
  { when: { stageMin: 5 }, text: [
    '"I\'ve learned the hard way that if I don\'t set this up right, I\'ll regret it later."',
  ] },
  { when: {}, text: ['"Trust me, if I don\'t do this now I\'ll be miserable in an hour."', '"If I don\'t set this up right, I\'ll regret it mid-challenge."', '"Comfort prep complete. Now the fun part."'] },
]);

// ── stream.pre.setup.production ─────────────────────────────────────────────
registerPool('stream.pre.setup.production.c1', [
  { when: { stageMin: 9 }, text: [
    'Destiny puts real effort into making everything look good, even though her size makes it difficult. She looks tired by the time she\'s satisfied with the setup.',
  ] },
  { when: { stageMin: 7 }, text: [
    'Destiny carefully adjusts the camera and lighting, trying to find angles that are flattering despite how much bigger she\'s gotten. She looks a little frustrated but keeps trying.',
  ] },
  { when: { stageMin: 5 }, text: [
    'Destiny takes her time fixing the lighting and camera angle, wanting everything to look good before she starts.',
  ] },
  { when: {}, text: ['Lights, overlays, mic check. She fusses with details until everything gleams on the preview monitor.', 'Lights dialed, overlay checked, preview gleaming — she wants it pretty before she feasts.', 'Full production pass: filters, sponsor slot, mic levels — then she nods, satisfied.'] },
]);

registerPool('stream.pre.setup.production.line', [
  { when: { stageMin: 9 }, text: [
    '"If we\'re doing this, we\'re doing it right. Even when it takes forever."',
  ] },
  { when: { stageMin: 7 }, text: [
    '"I\'ve been trying to look more put-together lately… even if it doesn\'t always work out."',
  ] },
  { when: { stageMin: 5 }, text: [
    '"I know it\'s just a warm-up, but I still want it to look nice."',
  ] },
  { when: {}, text: ['"If we\'re doing this, we\'re doing it right."', '"Pretty setup for pretty destruction. Let\'s go."', '"If we\'re on camera, we\'re doing it right."'] },
]);
