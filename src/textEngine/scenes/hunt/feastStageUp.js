// The Squad — Lead: A2 Psych | Support: A3 Immobility, A7 Artisan, A5 Editor
// Lilith hunt feast narratives — one monolithic beat per stage crossing (prey → growth).
// Registered verbatim; decomposition deferred (author-approved standardized vignettes).
import { registerPool, render, createContext, hasModule } from '../../engine.js';
import { getConsumeText } from '../../../gameData/lilith.js';

const FEAST_BY_STAGE = {
  0: `Lilith's dark eyes gleamed with predatory hunger as she lured the eager young man into her dimly lit dorm room. The sultry sway of her narrow hips and the low-cut black top clinging to her small, perky breasts had him hooked from the first whispered invitation. Goth music pulsed heavily around them. He grinned, already imagining claiming his prize — every inch of her lithe pale form his for the taking.

But the moment his hands reached for her, Lilith struck. Her jaw unhinged with eerie grace, engulfing his head and shoulders in one slick, powerful motion. Hot, wet throat muscles rippled around him as she swallowed hard, her emaciated frame stretching obscenely around his struggling form. Her flat chest and concave belly bulged dramatically as she devoured him whole, gulp after greedy gulp, until he slipped completely inside.

A euphoric shudder tore through her. Warmth exploded outward. Her stomach rounded into a soft, satisfying paunch. Hips widened with a delicious crack, thighs plumping into smooth, touchable curves. Her breasts swelled heavier and fuller, pressing taut against her lace bra as they gained lush, jiggling weight. Cheeks filled out, softening her sharp features into seductive beauty. Lilith moaned in ecstasy, caressing every new lush inch of her blossoming body.`,

  1: `Lilith moved with newfound confidence, her 5'6" frame already softer and more alluring after her last feast. The fresh layer of padding rounded her hips and lifted her breasts into tempting handfuls that strained her tight black corset top. She lured another willing victim back to her dorm with sultry promises and a teasing sway of her thickening ass, the heavy goth beats masking her intentions.

He smirked, eyes locked on her cleavage, certain he was about to have her on his terms. His hands roamed her plush curves — until Lilith's smile turned feral. Her jaw stretched impossibly wide and she engulfed him in a single fluid motion. Powerful swallows pulled him down her tight, rippling throat, her body bulging and distending as she consumed every inch of him.

The familiar euphoric wave hit harder this time. Heat surged through her core as her belly swelled into a full, heavy potbelly that jiggled with every breath. Her hips flared dramatically wider, ass ballooning into thick, juicy globes. Thighs thickened into soft, powerful pillars that now pressed together with delicious friction. Her breasts surged forward, growing much heavier and larger, spilling heavily over the top of her straining bra in creamy, hypnotic cleavage. Lilith gasped in pleasure, hands greedily exploring her expanding, ever-more-voluptuous body as it blossomed into something even more irresistibly fertile and curvaceous.`,

  2: `Lilith glided through the dorm hallway with hypnotic confidence, her 5'6" body now plush and inviting. The soft swell of her heavy potbelly strained against her black corset, while her thick, juicy ass and powerful thighs — rubbing with every step — drew hungry stares. Her massive breasts, already overflowing her lace bra, bounced heavily as she lured her next eager conquest inside with a sultry whisper and a teasing smile.

He grinned, eyes devouring her lush curves, convinced he was about to conquer the voluptuous goth goddess and claim her as his own. His hands boldly reached for her yielding flesh —

Lilith's dark lips parted wide. In one savage, fluid motion she engulfed his head and shoulders, her throat stretching powerfully around him. Greedy, rhythmic swallows pulled his writhing body deeper, her already-curvy form distending obscenely as she devoured him whole.

Then the euphoric surge crashed over her. Blinding pleasure radiated outward as her belly ballooned into a vast, heavy dome of soft fat that hung lower and jiggled with newfound weight. Her hips exploded outward, ass swelling into massive, wobbling shelves of plush perfection. Thighs thickened dramatically, now thunderous pillars of creamy flesh that squeezed together tightly. Her breasts surged enormously, ballooning into huge, pendulous orbs that spilled heavily over her arms, straining every stitch of fabric. Lilith moaned, black-nailed fingers sinking into her rapidly expanding, gloriously fertile body as it grew ever softer, heavier, and more irresistibly abundant.`,

  3: `Lilith sauntered into her dorm with a predatory sway, her 5'6" body now a lush, overflowing vision of gothic excess. Her massive belly hung heavy and round, her enormous ass and thunderous thighs strained every seam of her black skirt, and her gigantic breasts bounced heavily with each step, barely contained by her reinforced corset. She lured her next victim with a velvet voice and a teasing finger along his chest, drawing him into her lair.

He stared in awe at her overflowing curves, certain he was about to bury himself in her softness. His hands sank greedily into her yielding flesh —

Lilith's smile sharpened. Her jaw yawned open impossibly wide and she devoured him in powerful, wet gulps. Her already massive body bulged and stretched as she swallowed him down entirely.

Ecstasy exploded through her. Her belly surged outward into a truly colossal, sagging gut that rested heavily on her thickening thighs. Her hips and ass ballooned dramatically wider, becoming vast shelves of soft, wobbling fat that jiggled with every breath. Her thighs grew even thicker, plush and heavy, rubbing together with constant, delicious pressure. Her breasts swelled enormously, turning into vast, pendulous masses that spilled outward in heavy, hypnotic waves. Lilith moaned in pure bliss, caressing her rapidly expanding, ever-richer curves as they grew softer, heavier, and more irresistibly abundant.`,

  4: `Lilith waddled into her dorm with a slow, mesmerizing roll of her hips, her 5'6" body now sumptuously fat. Her heavy, rounded belly led the way, resting atop her thunderous thighs. Her enormous ass and wide hips stretched her black skirt to its limits, while her massive breasts — huge, soft orbs — spilled heavily over the top of her straining corset with every breath. She lured her latest prey with a husky whisper and a coy bite of her black lip, drawing him deep into her shadowy room.

He drank in the sight of her overflowing, pillowy form, heart racing at the chance to drown in her abundant curves. His fingers dug greedily into her warm, yielding softness —

Lilith's eyes flashed with dark hunger. Her jaw stretched impossibly wide and she devoured him in deep, relentless swallows. Her already vast body distended grotesquely as she pulled every inch of him down into her depths.

A powerful, orgasmic rush crashed through her. Blissful heat bloomed and spread as her belly ballooned outward, growing heavier and more pendulous, sagging lower with fresh layers of plush fat. Her hips flared wider still, her ass swelling into even larger, jigglier shelves of creamy perfection. Her thighs thickened dramatically into massive, quivering columns that squeezed together with constant, sensual pressure. Her breasts surged forward, becoming yet more immense and sloshing, their weight pulling deliciously on her chest. Lilith groaned in rapture, hands roaming greedily over her gloriously expanding, ever softer and more fertile body.`,

  5: `Lilith lumbered into her dorm room with a heavy, hypnotic sway, her 5'6" body now massively voluptuous. Her colossal belly hung in a thick, apron-like dome that rested heavily on her enormous thighs. Her vast ass and flaring hips stretched her black clothing to the breaking point, while her titanic breasts — immense, sloshing orbs — spilled outward and rested atop her gut, barely restrained by her reinforced corset. She beckoned her next victim inside with a sultry, knowing smile and a slow caress of her own curves.

He stared in awe at her overwhelming, pillowy mass, certain he was about to lose himself completely in her endless, yielding softness. His hands sank deep into her warm, quivering flesh —

Lilith's dark eyes gleamed with hunger. Her jaw unhinged impossibly wide and she swallowed him whole in long, powerful gulps. Her already enormous body bulged and stretched obscenely as she consumed every inch of him.

An intense, orgasmic wave of pleasure exploded through her core. Molten ecstasy spread outward as her belly surged forward into a truly massive, sagging paunch that hung even lower between her legs. Her hips and ass ballooned dramatically wider, becoming mountainous shelves of soft, wobbling fat. Her thighs thickened into absolute pillars of plush, heavy flesh that crushed together with constant, delicious pressure. Her breasts swelled enormously heavier and larger, turning into enormous, pendulous masses that spilled heavily over her arms and gut. Lilith moaned in rapture, black-nailed hands greedily sinking into her gloriously expanding, ever softer and more abundantly fertile body.`,

  6: `Lilith squeezed through the doorway of her dorm room, her 5'6" body now an overwhelming, hyper-voluptuous mass of gothic decadence. Her colossal belly sagged heavily in a thick, multi-tiered apron that rested on her massive thighs, forcing her to waddle with a slow, rolling gait. Her enormous ass and flaring hips brushed both sides of the frame, while her titanic breasts — vast, sloshing orbs — spilled heavily over her gut, stretching her reinforced corset to its absolute limits. She lured her next willing prey inside with a husky laugh and a beckoning finger, the heavy goth music thrumming around them.

He gazed up at her immense, quivering form with lust-drunk eyes, convinced he was about to bury himself in her endless softness. His hands eagerly sank into her warm, yielding fat —

Lilith's smile turned ravenous. Her jaw stretched impossibly wide and she devoured him in deep, relentless swallows, her already gigantic body distending dramatically as she pulled every inch of him down.

A devastating wave of pure ecstasy slammed through her. Her belly exploded outward with thunderous force, surging into a monumental, floor-grazing paunch that knocked against her desk. Her hips and ass ballooned massively wider, tearing seams across her skirt as they became obscene, wobbling shelves of fat. Her thunderous thighs thickened further, crushing together and straining the remains of her clothing. Her breasts surged enormously, growing heavier and more pendulous, ripping the front of her corset open as pale, creamy flesh spilled free. Furniture creaked as Lilith moaned in rapture, black-nailed hands desperately groping her gloriously expanding, ever softer and more dominantly fertile body.`,

  7: `As Lilith grew, so too did her hunger — raw, insatiable, and impossible to deny. The moment her eyes locked onto her next quarry in the hallway, a fresh, handsome resident, the craving overwhelmed her. She couldn't restrain herself. Barely able to contain the urge, she dragged him into a nearby public bathroom and shoved him into the nearest stall, locking the door behind them with trembling fingers.

Her 5'6" body was already a staggering vision of gothic excess. Her colossal, multi-tiered belly brushed her thick knees, her enormous ass and hips barely fit through the stall entrance, and her titanic breasts spilled heavily out of her ruined corset, heaving with anticipation.

He stared in shock and lust, believing he was about to claim her overwhelming softness. His hands reached for her —

Lilith's jaw stretched impossibly wide. She devoured him right there in the cramped stall, powerful, wet gulps echoing loudly as her already gigantic body bulged and stretched obscenely around his struggling form.

A cataclysmic wave of ecstasy detonated through her. Her belly surged forward violently, exploding into a vast, floor-dragging apron of heavy fat that squished him hard against the stall wall before he even finished sliding down. Her hips and ass ballooned outward with thunderous force, smashing the plastic partitions on both sides and snapping bolts free with loud cracks as the stall walls buckled and splintered. Her thunderous thighs thickened massively, crushing together and tearing her remaining clothes to shreds while pinning his legs in soft, suffocating fat. Her breasts swelled enormously heavier and larger, ripping free completely and slapping heavily onto her new gut like pendulous, sloshing orbs. Lilith moaned in raw, shameless rapture, black-nailed hands sinking deep into her gloriously expanding, uncontrollably fertile body as it ballooned into obscene new depths of softness and size.`,

  8: `As Lilith grew, so too did her hunger — raw, insatiable, and impossible to deny. Spotting a lone guy in a quiet corner of the dorm common area, she didn't bother with seduction. Her 5'6" body was a moving avalanche of pale, gothic fat. She waddled forward with surprising speed, cornering him against the wall before he could react. Her colossal, floor-sweeping belly slammed into him first, pinning his torso in soft, suffocating warmth. Her enormous ass and thunderous thighs pressed forward, trapping his legs while her titanic breasts rested heavily on top of her gut, smothering him in endless yielding flesh.

He struggled wildly, pushing and protesting, but her sheer mass overwhelmed him. Lilith's dark lips curled into a wicked grin. Her jaw unhinged impossibly wide and she forced his head between her lips, devouring him alive despite his frantic resistance. Powerful, wet swallows pulled him deeper as her already gigantic body stretched and bulged obscenely around his fighting form.

A cataclysmic wave of ecstasy detonated through her core. Her belly exploded outward with ferocious power, surging into a monstrous, floor-crushing apron of fat that pinned him completely and pressed hard against the wall behind him. Her hips and ass ballooned dramatically wider, smashing into nearby furniture and cracking the plaster as they became mountainous shelves of quivering softness. Her thunderous thighs thickened into absolute pillars of heavy fat, tearing the last remnants of her clothes to shreds and squeezing together with crushing pressure. Her breasts swelled enormously larger and heavier, ripping free and slapping down onto her new, even more immense gut like vast, sloshing orbs. Lilith moaned in raw, shameless rapture, black-nailed hands groping and kneading her gloriously expanding, uncontrollably fertile body as it ballooned into obscene new depths of size and softness.`,

  9: `Lilith had grown far too massive to leave her dorm room. Her 5'6" body had become a living monument of gothic excess, completely dominating the small space. Her colossal, multi-tiered belly rested heavily on the floor in thick, sagging folds, pinning her in place on the reinforced bed. Her vast ass and hips spilled widely over the edges of the mattress, while her titanic breasts — each larger than beach balls — lay like heavy, sloshing weights atop her gut. She could barely move, yet the hunger burned hotter than ever.

She ordered delivery and specifically requested Mia, the thick goth-leaning delivery driver she'd been craving for weeks. Mia was 5'4" and an incredibly fat 350 pounds, with an enormous soft belly that hung in heavy aprons over her waistband, wide childbearing hips, a massive shelf-like ass that strained and stretched her black work pants to the limit, and thunderous thighs that rubbed noisily with every step. Her huge, heavy breasts strained the buttons of her company polo, and her round, pretty face with full cheeks was framed by dyed black hair and subtle piercings.

When the knock came, Lilith's deep, husky voice called out, "Come in, it's open."

The door creaked open. Mia stepped inside, then stopped dead, eyes widening in pure shock as she took in Lilith's room-filling mass.

"Oh my god… Lilith?!" Mia gasped, her voice trembling with disbelief. "You were this tiny, emaciated goth wraith last time I saw you — like eighty pounds soaking wet! Now you're… Jesus, you're a mountain. Your belly is literally covering half the floor. And those tits… they're gigantic. How is this even possible?"

Lilith smiled languidly. "Come closer, Mia. I want you to get a good look."

Mia hesitated only a moment before stepping forward, drawn in despite herself. Her hands trembled as she reached out, first pressing them into the warm, yielding upper slope of Lilith's colossal belly. "Holy shit… it's so soft," she whispered, sinking her fingers deeper, kneading the thick fat in slow, reverent circles. She leaned in, pressing her own heavy belly against Lilith's, then slid her hands upward to cup and lift the immense weight of one of Lilith's breasts, eyes wide with awe. "These are insane… so heavy and full. I can barely hold one."

Mia's breathing grew heavier as she explored further, running her palms over the vast curves, squeezing handfuls of plush hip fat and burying her face briefly against the warm, pillowy cleavage. "You're so much bigger than me now… I've packed the weight in since starting this job and I feel tiny next to you. This is the hottest and weirdest thing I've ever seen."

Lilith let out a low, pleased hum, then shifted her immense weight. With a powerful swing, her colossal belly surged forward like a warm avalanche, slamming into Mia and knocking the thick delivery driver clean off her feet. Mia yelped as she tumbled backward onto the floor, pinned beneath the overwhelming mass of Lilith's gut.

Before she could scramble away, Lilith's jaw unhinged impossibly wide. She lunged forward and engulfed Mia's head and shoulders in one greedy motion. Powerful, wet swallows pulled the struggling, deliciously fat Mia deeper despite her muffled cries, Lilith's already godlike body stretching and bulging dramatically around her.

Then the final surge hit — deeper, stronger, and more overwhelming than ever before.

A cataclysmic orgasmic explosion ripped through Lilith's core. Her belly detonated outward with ferocious power, surging into a truly apocalyptic, room-filling paunch that crushed furniture, slammed against the walls, and completely enveloped Mia inside her. Her hips and ass ballooned to obscene new widths, smashing the bed frame and cracking the drywall as they became mountainous, quivering landscapes of fat. Her thunderous thighs thickened into absolute pillars of heavy, crushing softness that pressed hard against the sides of the room. Her breasts swelled monstrously larger and heavier, growing into gigantic, sloshing orbs that spilled across her new, world-shaking gut like pale, fertile moons.

Lilith moaned in endless, shameless rapture, black-nailed hands desperately groping and kneading every vast new inch of her gloriously expanding body as she crossed into a weight she had only dreamed of, becoming an uncontrollably fertile, room-destroying goddess of pure, abundant fat.`,
};

const DELIVERY_INTRO = `You've been thinking about this one for a while.

Not Mia specifically — you've never thought about them specifically. But the idea of one. The specific luxury of not having to go anywhere, of staying exactly where you are, of hunger arriving at the door to meet you instead of the other way around.

You're too large to leave the room now. The hallway is a theoretical concept. The campus is something you remember.

You ordered more than usual. You always order more than usual. The total is significant. The bag will be large.

When the knock comes — twice, the way they always knock — you call her in from the couch, and you hear the door open, and you hear the silence that follows. The particular silence of someone recalculating.

"Just set it down," you say, in the warm dark of your room.

She comes in. She looks at you — all of you, which takes a moment — and something in her expression is confused and fascinated and not quite afraid, though it should be closer to afraid than it is.

You smile at her. The slow one.

"Thank you," you say, "for always being on time."

The hunger is immediate and enormous and specific. It has been building since the last time and the time before that and before you were large enough to stay in one place and call someone to you.`;

for (const [stage, text] of Object.entries(FEAST_BY_STAGE)) {
  registerPool(`hunt.feast.s${stage}`, [
    { when: {}, text: [text] },
  ]);
}

registerPool('hunt.feast.deliveryIntro', [
  { when: {}, text: [DELIVERY_INTRO] },
]);

// Shape: FULL SENTENCE. Afterglow after the swallow — leftover / night / seasoned hunt.
registerPool('hunt.feast.afterglow', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Galley leftover was still in her when she took him. The warmth stacked. Softness arrived faster for it.',
    'Kitchen tray from earlier. Prey on top of it. She hums like both were courses.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'You were at her door hours ago. The hunt uses that heat. She is still open from it.',
    'Night-round knock still in the wood. She hunted on the same appetite.',
  ] },
  { when: { huntSeasoned: true }, weight: 3, text: [
    'Marks on more than one man. She swallows like practice. The body already knows the bloom.',
    'She has done this enough that the surge arrives on cue. Hands already roaming the new inches.',
  ] },
  { when: { stageMin: 7 }, weight: 2, text: [
    'Furniture reports the new mass. She stays where she is and lets it finish arriving.',
    'The room has to accept her. It does. She pets the fresh weight like a kept thing.',
  ] },
  { when: {}, text: [
    'Warmth spreads after the last gulp. She catalogs hips, breasts, belly. Then she smiles at the catalog.',
    'The prey is gone. The softness is not. She keeps a black-nailed hand on it.',
    'A pleased sound. The hunt heard it too. She is already thinking about the next one.',
  ] },
]);

/**
 * Full feast narrative for a hunt consume at the given pre-gain stage (0–9).
 * Falls back to legacy CONSUME_TEXT for stage 10+ repeats.
 */
export function renderLilithFeast(student, stageId, week = 1, opts = {}) {
  if (!student) return '';
  const sid = Math.min(9, Math.max(0, stageId ?? 0));
  const key = `hunt.feast.s${sid}`;
  if (!hasModule(key)) return getConsumeText(stageId);
  const ctx = createContext({ subject: student, week, globals: { feastStage: sid }, ...opts });
  const line = render(`{${key}}`, ctx, { trace: opts.trace || null })?.trim();
  const glow = render('{hunt.feast.afterglow}', ctx, { trace: opts.trace || null })?.trim();
  const out = [line, glow].filter(Boolean).join('\n\n');
  return out || getConsumeText(stageId);
}

/** Mood-setter when opening delivery-only hunt (stage 9+). */
export function renderLilithDeliveryIntro(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = createContext({ subject: student, week, ...opts });
  return render('{hunt.feast.deliveryIntro}', ctx, { trace: opts.trace || null })?.trim() || DELIVERY_INTRO;
}
