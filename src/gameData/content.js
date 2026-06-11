export const BODY_DESCS = {
  pear: [
    // 0 — Slight
    `A wispy, angular frame — her face is sharp at the cheekbones and jaw, neck slender, collarbones pronounced and visible. Her arms are thin enough that the tendons show at the wrist. Her torso is flat, ribs faintly countable through thin fabric. Her hips are present but narrow, her thighs long and slim with a visible gap from ankle to pelvis. She moves quickly, effortlessly, taking up very little space.`,
    // 1 — Slim
    `A slender, easy frame — her face is smooth and lightly rounded at the cheeks, a neat jaw, clear neck. Her arms are slim with a little softness at the upper arm. Her torso is flat with just the gentlest suggestion of a belly when she sits. Hips flare slightly, thighs touch at the very top. She moves easily, clothes falling off her without effort.`,
    // 2 — Soft
    `Her face has filled out softly — fuller cheeks, a rounded jaw, the angular edges gone. Her neck is smooth and slightly thicker. Her arms have lost their boniness; the upper arms are soft and rounded. Her chest has quietly grown — her bra fits noticeably tighter, the cups fuller than they were — a subtle change that becomes obvious in fitted tops. Her torso shows a small, soft belly poking forward at the navel. The dramatic lower-body development is beginning: hips visibly wider, thighs pressing together from mid-thigh down, a noticeable curve at the seatline.`,
    // 3 — Chubby
    `Her face is noticeably rounder — full cheeks, a soft double chin forming when she looks down, her neck thicker and smooth. Her shoulders have softened; her upper arms are pillowy, dimpled at the elbow. Her bust has grown clearly larger, pulling at the necklines of her shirts, the soft weight of it resting heavier on her ribcage. Her belly rounds forward visibly below the navel, a soft apron forming. But the real story is her lower half: hips wide enough to brush doorframes, thighs thick and pressed together from hip to knee, her bottom full and heavy and pulling at waistbands. She's begun to move with the slight, shifting gait of someone with real weight between her thighs.`,
    // 4 — Plump
    `Her face is genuinely round and full — cheeks soft and prominent, a clear double chin now, her neck smooth and thick. Her shoulders round and padded; her arms heavy, the upper arms deeply soft and swinging when she moves. Her bust is very large now, heavy and full, pulling the front of her shirts downward, shaping everything she wears around it. Her belly hangs forward in a distinct apron, navel pointing slightly down. Below the waist she is striking: hips genuinely wide, thighs massive and round, their inner surfaces in continuous contact from groin to knee, the skin warm and dimpled. Sitting, her thighs spread wide and her bottom overflows a standard chair on both sides. Stairs are taken one at a time now.`,
    // 5 — Heavy
    `Her face is very full — soft round cheeks touching her shoulders when she turns, a full double chin that rests against her neck when she looks forward, small ears framed by softness. Her neck is thick and smooth, her shoulders wide and padded. Her upper arms are heavy, the flesh swinging freely, the crease at her elbow deep. Her bust is enormous and heavy, resting on the upper shelf of her belly when she sits, straining every button. Her belly hangs forward and down in a substantial apron, the lower roll resting on the tops of her thighs. Her lower body is overwhelming: hips enormously wide, her profile from behind defined by the vast sweep of her thighs and bottom, flesh overfilling every chair she attempts. Walking is a full-body event — a slow, rolling gait, her thighs displaced outward by each other's mass.`,
    // 6 — Fat
    `Her face is a soft, round abundance — full cheeks resting on her shoulders, layers of chin stacked smoothly, her eyes set deep in softness. Her neck has largely merged with her shoulders. Her arms hang at an angle from her sides, pushed outward by the mass of her torso; the upper arms are enormous bolsters of soft flesh, the elbows deeply dimpled. Her bust is tremendous — rolls above and below it, the weight of it pressing into the belly beneath. Her belly cascades forward in heavy overlapping rolls, the lowest apron hanging past her hips. Her lower body is extraordinary: hips that fill hallways, thighs that require a wide, rolling gait, the flesh of her inner thighs extending past her knees, her bottom an enormous soft shelf that dominates any surface she sits on, overflowing chairs generously.`,
    // 7 — Very Fat
    `Her face has become its own landscape — a soft, full moonface, cheeks wide and prominent, the chin a continuous smooth slope to her chest. Her neck is gone, replaced by the soft curve between face and shoulder. Her arms project nearly horizontally from her body, their lower surfaces deeply concave, the upper arms vast and swaying. Her bust is vast and immense, pressing outward against the rolls of her torso, functional but enormous. Her torso is immense: several heavy belly rolls, the apron hanging to mid-thigh when she stands. Her lower body is the dominant fact of her figure: hips that must turn sideways to clear doorframes, thighs that brush together continuously from waist to knee, the inner flesh extended further still, her seat a vast soft monument that requires custom furniture. Movement is deliberate, a wide rolling walk, each step placed with the care of significant mass.`,
    // 8 — Enormous
    `Her face is soft and vast — a wide moonface framed entirely by softness, the features gentle and small in their abundance of cheek and chin. Her shoulders are rounded mountains; her arms rest at steep angles from her sides and she cannot bring them together in front of her without effort. Her bust is a vast, heavy presence, its weight resting fully on the upper belly rolls beneath, the flesh of it spilling to either side. Her torso is an enormous soft landscape: the belly hanging in deep, heavy rolls, the lowest apron resting on her thighs even while she stands. Her lower half is staggering — hips that fill any standard doorway from side to side, thighs that require a wide stance simply to stand upright, her bottom an overwhelming shelf of soft flesh that no standard seating can accommodate. She moves with the careful, swaying momentum of someone managing enormous weight, each step deliberate, each surface chosen for what it can hold.`,
    // 9 — Immobile
    `Her face is a soft, vast terrain — wide and round, the features barely distinct from the surrounding softness, her chin a smooth cascade to her chest. Her upper body is immense: arms that can barely move, hands soft and dimpled. Her bust is part of the general mass of her torso now, enormous and heavy, layered with folds above and below, its weight pressing down into the great shelf of her belly. Her belly cascades in enormous, layered rolls, the lowest extending far in front of her, the flesh warm and deep and heavy. Her lower body is geography: hips that extend far beyond her shoulders when viewed from above, thighs of extraordinary circumference, each one a presence unto itself, their inner surfaces continuous from groin to knee and beyond. She is barely mobile — a shuffle of inches possible on good days, her enormous mass requiring assistance for anything beyond shifting position. She fills and overwhelms any furniture built to accommodate her.`,
    // 10 — Blob
    `Her face is a soft, warm island of expression in a vast sea of flesh — gentle features, full cheeks, a serene expression that floats above the enormity below. Her bust and belly and lower body have ceased to be distinct regions; she is a continuous expanse of layered, warm, soft flesh, the hip-heavy silhouette of her pear shape amplified to breathtaking extremes. The inner surfaces of her thighs press together for their full enormous length. Her bottom is an immovable monument of soft flesh. Her arms are largely embedded in the great soft mass of her sides. She is the largest thing in any room she occupies, her lower body alone filling the width of the reinforced furniture built for her. She does not move. She does not need to.`,
    // 11 — beyond blob scale
    `Her face is gentle and serene above what she has become — pear-shaped abundance at a scale that reorganizes the room. Her lower body is no longer a silhouette but the center of gravity: hips and thighs so vast they anchor everything, warm endless rolls cascading from waist to knee and beyond, flesh heavy, yielding, and impossibly indulgent. Her bust and belly merge into the great soft landscape of her torso, but the pear truth remains — the lower half leads, thighs pressing together for their impossible length, bottom a warm monument the world works around. She barely shifts. When she does, everything moves with her — slow, heavy, present. She is the room's warmth. She is the room's weight.`,
  ],
  hourglass: [
    // 0 — Slight
    `A fine, narrow frame — her face angular and precise, cheekbones prominent, jaw defined. Her neck is long and slender. Her shoulders are narrow, arms very thin, the muscle visible at the forearm. Her torso is almost flat with minimal chest; a small, distinct waist flares to narrow hips. Her legs are long, slim, and toned. She moves quickly and takes up very little space.`,
    // 1 — Slim
    `A neat, balanced figure — her face smooth and symmetrical, cheeks lightly rounded, a clean jaw. Her neck is slim. Shoulders trim, arms slender with a softness at the upper arm. Her waist nips in cleanly; her hips flare gently from it, creating the beginning of the classic curve. Her legs are toned and slim. She moves with natural ease.`,
    // 2 — Soft
    `Her face has filled out gently — cheeks softer, jaw line rounder, a hint of softness at the chin. Her neck is slightly fuller. Her bust has grown noticeably — the cups of her bras fill completely, the fabric of her shirts pulling across the chest — the hourglass shape asserting itself early and decisively. Her waist is still visible but has softened, losing its sharp definition. Her hips have widened further; her thighs are touching. A small, round belly has appeared between waist and hip. The curves are larger in every direction — she fills her clothes more completely.`,
    // 3 — Chubby
    `Her face is full and soft — round cheeks, a smooth jawline that has lost its angles, the beginning of a second chin when she looks down. Her neck is fuller. Her bust is large and heavy now, pulling at her necklines, the weight of it always present, shaping every shirt and jacket around itself. Below it, a definite belly rounds forward, softening the once-sharp waist. Her hips are strikingly wide, her thighs thick and in constant contact, her bottom full and round. The hourglass is still visible but has grown dramatically in every dimension. She moves with a gentle sway.`,
    // 4 — Plump
    `Her face is genuinely round — full, soft cheeks, a distinct double chin, her neck smooth and thick. Her bust is very large, heavy, shaping everything she wears — necklines gape, buttons strain, the weight of her chest pulls shirts forward. Her waist has largely disappeared, replaced by a round, prominent belly that protrudes forward and rests over her waistband. Her hips are very wide, her thighs massively thick and dimpled, pressing together from groin to knee, her bottom overflowing chairs. The hourglass shape is now an amplified, overwhelming version of itself — every curve at enormous scale. She walks with a visible waddle.`,
    // 5 — Heavy
    `Her face is full and soft, cheeks resting on her shoulders when she turns, a generous double chin, small ears set in softness. Her bust is enormous and heavy, resting on the upper swell of her belly when she stands, the weight of it requiring support that strains against it. Her waist is gone entirely; her torso is round and full from chest to hips. Her belly is a prominent, heavy globe hanging forward below the navel. Her hips are extraordinarily wide — the widest part of a very wide figure — her thighs vast and warm, her bottom an enormous soft presence that dominates everything she sits on. Despite the extreme curves she carries herself with a kind of authority.`,
    // 6 — Fat
    `Her face is a soft, round fullness — cheeks wide and prominent, chin resting on her chest, her profile almost circular. Her bust is tremendous, its weight pulling forward and downward, layered with rolls of soft flesh above and below, the sheer mass of it shaping her entire silhouette. Her belly is a heavy, round mass that hangs forward significantly, rolls visible above and below the navel. Her hips are staggering in their width — she turns sideways to navigate narrow spaces — her thighs enormous, dimpled, pressing together continuously, her bottom a vast soft shelf. The curves that defined her have been amplified to an extreme: enormous in every direction, overwhelming in every dimension.`,
    // 7 — Very Fat
    `Her face is vast and soft — a full, round moonface where the jaw, cheeks, and multiple chins merge into a warm, continuous softness. Her neck has disappeared into the mass of her shoulders and chest. Her bust is tremendous and heavy beyond ordinary description, pressing outward and downward, the flesh of it merging into the great rolls of her belly beneath. Below it her belly hangs in deep, heavy rolls. Her hips cannot be described in ordinary terms — they extend far beyond her shoulders in profile, requiring wide doorways and custom seating. Her thighs are enormous and constant in their contact; her bottom is a monument that overwhelms any surface it meets. She moves with the deliberate care of someone managing very great mass.`,
    // 8 — Enormous
    `Her face is a wide, soft moonface framed entirely by soft flesh, her features gentle and sweet. Her bust is an immense, heavy presence — the flesh of it vast and warm, spilling to either side when she reclines, pressing forward and down into the great rolls of her belly. Her torso is immense in every direction: bust, belly, rolls, the layered softness of a body that has expanded far beyond any standard frame. Her hips project far to either side; her arms hang at steep angles, pushed out by the mass of her sides. Her lower body is extraordinary: thighs of vast circumference, a bottom that requires specially reinforced seating, the flesh of her inner thighs hanging past her knees. She moves only slowly and with great deliberateness.`,
    // 9 — Immobile
    `Her face is a small, soft, serene island in the expanse of her upper body — cheeks wide, multiple chins cascading softly. Her bust is part of the great continuous landscape of her torso: enormous, heavy, resting fully on the shelf of her belly, the flesh of it pooling to the sides, indistinct now from the surrounding abundance. Her bust, belly, hips, and lower body have become a continuous, enormous landscape of soft flesh, rolls and folds layered upon each other, her sides extending far beyond any standard measurement. Her thighs are individually enormous; together they fill the width of a small sofa. The hourglass shape she once carried has become something vaster and more complete — every curve amplified to its most extreme expression. She does not move independently.`,
    // 10 — Blob
    `Her face is gentle and serene, floating above an incomprehensible abundance of warm, soft flesh. Her bust and belly and hips — the great curves that once defined her silhouette — have merged into one breathtaking, continuous mass that presses outward in every direction, filling the reinforced furniture built around her. The flesh of her inner thighs presses together for their full, extraordinary length. Her arms are largely immobile, embedded in the soft rolls of her sides. She is a vast, warm, permanent presence. Everything in the room is organized around what she has become. She is immobile, and overwhelming, and entirely herself.`,
    // 11 — beyond blob scale
    `Her face is soft and sweet above a body that has transcended ordinary measure — hourglass curves stacked into endless warm rolls, bust and hips and belly merged into one plush landscape that presses outward in every direction. Her thighs press together their full impossible length; her arms are buried in the great soft mass of her sides. She barely moves. When she breathes, flesh shifts and settles in slow heavy waves. She is the room's center of gravity — warm, yielding, desirable in her sheer overwhelming size. Everything in the room is organized around her indulgence.`,
  ],
  straight: [
    // 0 — Slight
    `An angular, spare frame — her face lean and angular, cheekbones and jaw prominent, the hollows of her temples visible. Her neck is long and thin. Her shoulders are narrow and bony; her arms are very thin, the wrists small. Her torso is flat in every direction — minimal chest, no visible waist curve, hip bones slightly prominent. Her legs are long and thin. She moves very easily.`,
    // 1 — Slim
    `A lean, straight figure — her face smooth and lightly defined, clean jaw, neat features. Her neck is slim. Her shoulders are narrow, arms slender. Her torso is flat from chest to hip with very little variation; the waist doesn't nip in. Legs are lean and straight. She moves with easy efficiency.`,
    // 2 — Soft
    `Her face has softened — cheeks rounder, jaw less defined, the early suggestion of a chin. Her neck is slightly fuller. Her upper arms have lost their leanness and developed a gentle softness. Her chest has filled out noticeably — her bras are tighter, the fabric straining across newly full cups. Her belly has appeared: a small, round pouch pushing forward below the navel, visible through fitted shirts. Her hips and thighs have rounded only slightly — the softening is even across her whole body, no dramatic curves, just a uniform gentle rounding everywhere.`,
    // 3 — Chubby
    `Her face is noticeably fuller — round cheeks, the jaw softened, a second chin forming when she looks down. Her neck is thick and smooth. Her upper arms are padded and soft, the flesh spilling slightly over elbow joints. Her bust has grown significantly — full and heavy, pulling at necklines and adding real weight to her chest. Her torso has rounded everywhere: a definite belly pushing forward and down, a rounded back. Her hips are wider but remain relatively balanced with her upper body. Her thighs have thickened, pressing together from mid-thigh. The softening is still relatively even — she is round all over rather than dramatically bottom or top heavy.`,
    // 4 — Plump
    `Her face is very full — prominent round cheeks, a clear double chin, her neck smooth and wide. Her arms are heavy, the upper arms soft and swinging slightly. Her bust is large and heavy, shaping the front of her shirts, its weight a constant physical presence. Her belly is the dominant feature of her torso now: a round, prominent globe hanging forward and down, rolls visible above and below the navel. Her hips have widened proportionally; her thighs are thick and touch continuously. She is full and round in every direction, the weight distributed evenly across her entire body. She breathes more heavily climbing stairs.`,
    // 5 — Heavy
    `Her face is round and full, the cheeks wide and soft, multiple chins visible, her neck smooth and thick. Her shoulders have rounded and padded. Her arms hang with significant mass, the upper arms large soft cylinders, the forearms thick. Her bust is very large, its weight resting on the upper belly, heavy and full. Her belly hangs forward heavily in a prominent apron, rolls stacked above it. Her hips are wide; her thighs thick and constantly in contact; her bottom heavy and round. The weight is remarkably even — no dominant feature, just a large, full, round body in every measurement. She walks with a slow, deliberate gait.`,
    // 6 — Fat
    `Her face is a soft, full moonface — round cheeks sitting high, multiple chins, her neck all but absorbed into her shoulders. Her arms are large and hang at an angle, the upper arms enormous and swinging. Her bust is large and heavy, part of the vast, even roundness of her torso — chest, belly, and back all at significant scale, the belly hanging in heavy rolls. Her hips and thighs and bottom match the upper body in scale, the full-body evenness maintained. She is large and round and soft in every direction, filling chairs, doorframes, and rooms without any single point of dramatic emphasis. Just everywhere.`,
    // 7 — Very Fat
    `Her face has become a vast, soft roundness — a moonface where the jaw and cheeks and chins form one continuous gentle curve. She moves very slowly, her arms barely able to hang at her sides, the rolls of her torso displacing them outward. Her bust is large and heavy, pressing forward into the rolls of her belly. Her belly hangs in deep, heavy folds. Her back is as round as her front. Her hips and thighs and bottom are enormous and match the scale of her upper body. She fills doorways and requires custom furniture. Every movement is effortful.`,
    // 8 — Enormous
    `She is an enormous, round presence. Her face is small and sweet at the center of a vast, soft head. Her arms project at extreme angles, mostly decorative now. Her bust is vast and heavy, its weight indistinct from the immense round mass of her torso — front, sides, and back all equally vast — with the belly hanging far in front of her and the back equally full. Her lower body matches completely: thighs of great circumference, a bottom that overflows the largest furniture. She fills the largest chairs and extends beyond them. Movement requires care and assistance.`,
    // 9 — Immobile
    `Her face is soft and small and visible at the summit of an enormous, even, continuous softness that fills the room. Her bust is part of the great round mass of her torso, heavy and vast, resting on the belly beneath it, the flesh rolling outward to either side. Her upper and lower body have lost their distinction, merging into one immense whole — an even, spherical abundance of warm flesh in every direction. Her thighs press together for their full vast length. Her belly hangs in deep, heavy rolls. The room has been organized around her, and she fills it completely. She does not move independently.`,
    // 10 — Blob
    `Her face is serene and small at the summit of what she has become — a breathtaking, still, enormous presence. Her bust and belly and back and hips are one continuous, immense roundness of layered soft flesh, the even distribution of her body type amplified to its absolute extreme. She presses outward in every direction with equal, overwhelming completeness. Her thighs are individually vast; together they fill the span of reinforced furniture built specifically for her. She is the heaviest, most evenly distributed thing in any room she occupies. Everything else adjusts around her.`,
    // 11 — beyond blob scale
    `Her face floats small and serene above uniform abundance impossibly vast — softness spreading warm and heavy in every direction, bust and belly and back and hips one continuous landscape of yielding flesh. Her thighs are individually enormous; together they fill reinforced furniture built for her alone. She barely shifts; when she does, rolls cascade and settle for long seconds afterward. She is the heaviest, most even presence in any room — a living monument of fat, warmth, and indulgence that the world works around.`,
  ],
  apple: [
    // 0 — Slight
    `A very slim figure that leans toward the torso: her face is lean and precise, cheekbones prominent, jaw clean. Her neck is slender. Her shoulders are narrow; arms thin. Her torso is flat with a very slight tendency to carry weight through the midsection, not yet visible but structurally present. Her hips are narrow, legs long and slim. She moves quickly and very lightly.`,
    // 1 — Slim
    `A slender, neatly proportioned figure — her face clean-lined and smooth, a well-defined jaw. Her neck is slim. Her torso is trim with a very gentle forward suggestion at the belly that would only be noticed on close inspection. Her hips are relatively narrow compared to her torso. Legs are slim and long. She moves easily and quickly.`,
    // 2 — Soft
    `Her face has rounded out at the cheeks; her jaw is softer. Her neck has filled slightly. Her torso shows its apple nature: a round, soft belly is forming decisively — the midsection is where weight goes first and most noticeably. It presses forward below the navel and softens the waistline entirely. Her chest has filled out more than her hips have — the bust growing rounder and fuller, a subtle change relative to the belly's more dramatic expansion. Her arms have softened at the upper arm. Her hips and thighs remain relatively slim by comparison — the contrast is becoming noticeable.`,
    // 3 — Chubby
    `Her face is full and round — cheeks prominent, jaw soft, the beginning of a double chin. Her neck is thick and smooth. Her belly is the defining feature: round and forward, hanging over the waistband, the navel shifting downward. She carries the bulk of her weight here — her torso is significantly rounder than her lower half. Her bust has grown — full and round, sitting above the belly — though it is the belly that commands the eye. Her arms are thickening quickly: upper arms soft and padded. Her hips and thighs are modest by comparison, giving her a distinctive round-bellied, full-armed silhouette.`,
    // 4 — Plump
    `Her face is very round and full — a soft, wide face, clear double chin, smooth thick neck. Her arms are heavily padded, upper arms large and soft. Her bust has grown large — full and heavy — though it is the torso below it that is the primary event: a massive, heavy belly that hangs forward in a prominent apron, resting below the navel, pulling at every waistband. Her back is correspondingly round. Her lower half — hips, thighs, bottom — is significantly slimmer than her upper body, giving her a distinctive front-heavy appearance. Breathing is audible after any exertion.`,
    // 5 — Heavy
    `Her face is full and soft, multiple chins, her neck absorbed into her shoulders. Her arms are enormous — the upper arms are large bolsters of soft flesh, the forearms thick. Her bust is large and heavy, pressing forward above the vast belly, though the belly overwhelms it in scale. Her belly is the axis of her body: an enormous, heavy mass that hangs far forward and down, the lowest apron resting on the tops of her thighs when she sits. Her sides are deep; her back is round and full. Her lower half remains significantly smaller — the contrast between the enormous belly and the relatively modest hips and thighs is striking. She walks with a forward lean to balance the mass in front.`,
    // 6 — Fat
    `Her face is a soft, round fullness — moonface features, chin resting on her chest. Her arms hang at steep angles, displaced by the mass of her torso. Her bust is large and heavy, sitting above the enormous belly, the two together forming the staggering forward mass of her silhouette. Her belly is extraordinary: an enormous, hanging mass that extends far in front of her, rolls deep and heavy, the lowest apron hanging to mid-thigh. Her chest and belly and back are all immense. Her lower half, while significantly grown, remains clearly smaller than the torso — the apple shape is dramatically amplified. She walks with the slow, careful gait of someone managing a very heavy front.`,
    // 7 — Very Fat
    `Her face is soft and round, barely visible above the mass of her upper body. Her bust presses forward above the vast landscape of her belly — large and heavy in its own right, though dwarfed by the belly beneath it. She can see almost nothing of her lower half over that belly. The belly is the primary physical fact of her existence: vast, heavy, hanging in deep rolls, extending far in front and to the sides. Her arms are large but functionally mostly immobile, embedded in the rolls of her sides. Her lower body has grown but remains less vast than the enormous torso. Movement is slow and requires considerable effort and planning.`,
    // 8 — Enormous
    `She is defined by her belly. It is the largest thing in the room. Her face is small and soft above the mass; her arms are barely functional. Her bust sits above the great forward expanse of her belly — enormous in absolute terms, a significant mass of warm soft flesh — but everything refers back to the belly as the dominant fact. The belly extends so far in front that she cannot see her feet, cannot reach past it, cannot easily navigate around it. The rest of her body — back, sides, lower half — are all very large, but everything refers back to the belly. She fills the largest available furniture and overflows it.`,
    // 9 — Immobile
    `Her face is a small, serene presence above the immense soft landscape of her body. Her bust is part of the great forward mass of her torso — large and heavy, pressing into the rolls above her belly, the flesh of it warm and abundant. Her belly is the room. It extends forward in enormous, layered rolls of warm soft flesh, each roll deep and heavy, the lowest apron resting far out in front of her. Her arms are embedded in the vast rolls of her sides. Her lower body is barely distinguishable from the general mass, her thighs and hips present but overwhelmed by the sheer forward dominance of her belly. She does not move. The room accommodates her.`,
    // 10 — Blob
    `Her face is gentle and present above the summit of an overwhelming, still presence organized around the enormous mass of her belly. Her bust presses forward into the great landscape of flesh — large and soft and warm — part of the continuous forward expanse that defines her. Her belly is an incomprehensible volume of warm, layered soft flesh, extending forward and to the sides, the lowest rolls reaching far out before her. Her arms are immobile, embedded. Her lower body is present but secondary — hips and thighs buried in the general enormity. She fills the room. The room fills around her. She is vast, and warm, and permanent.`,
    // 11 — beyond blob scale
    `Her face is gentle above forward mass that has become the room's center of gravity — belly cascading in heavy endless rolls, warm and yielding, extending far before her even while she sits still. Her bust rests on the great slope of her middle, soft flesh spilling to either side, arms embedded in the landscape of her torso. Hips and thighs exist somewhere beneath the general abundance, but the belly leads — plush, sinking, impossibly indulgent. She barely moves. Her presence is weight itself: ancient, powerful, desirable in sheer size.`,
  ],
  athletic: [
    // 0 — Slight
    `A compact, powerfully lean figure — her face is clean-featured and angular, jaw defined, cheekbones visible. Her neck is lean with visible muscle. Her shoulders are broad for her frame, narrow hips below. Her arms are lean and muscular — bicep and forearm clearly defined, no excess tissue. Her torso is flat and hard, the abdominals visible, minimal body fat. Her legs are long, powerful, and very lean — quadriceps and calves defined through the skin. She moves quickly and efficiently, every movement economical.`,
    // 1 — Slim
    `A lean, athletic build — her face clean and defined, strong jaw, clear features. Her neck is slim and muscular. Broad shoulders, arms with visible tone and muscle definition. Her torso is flat and firm. Her legs are strong and toned — the muscle definition of someone who trains regularly. She carries herself with the upright posture and fluid movement of an athlete.`,
    // 2 — Soft
    `Her face has softened slightly — the sharp definition of her cheekbones muted by a new roundness at the cheeks. Her neck is slightly thicker. Her shoulders are still broad and strong. Her arms have retained much of their muscle but a new softness has settled over it — the definition remains but is less sharp. Her chest has filled out with real new volume — the athletic frame carrying the new bust with surprising presence. Her belly has appeared: a firm, round softness pushing forward at the midsection where there was nothing before. Her thighs have thickened with the combination of muscle and new fat, pressed against each other at the top.`,
    // 3 — Chubby
    `Her face is visibly rounder — full cheeks, a softer jaw, the athletic sharpness replaced by a rounded warmth. Her neck is thick. Her shoulders remain broad and strong. Her arms are now a mix of muscle and soft tissue — the bicep still present under a layer of padding. Her bust has grown substantially — full and round, sitting high on the broad athletic chest — a real, heavy presence that pulls at her shirts. Her belly is definitively round and forward-hanging: a soft, heavy mound that sits below her ribcage, the muscle structure buried. Her thighs are thick and heavy, still powerful but soft, pressing together from the hip. Her bottom has grown substantially — round and prominent, straining fabric.`,
    // 4 — Plump
    `Her face is full and round — prominent cheeks, a double chin forming, her neck smooth and wide. Her shoulders are still broad, but the narrowness has gone; she is wide at the shoulder and continuing to widen below. Her arms are heavy — thick upper arms, the muscle buried under substantial padding. Her bust is large and heavy, the broad athletic frame carrying its weight solidly — a significant soft mass that shapes the front of everything she wears. Her belly hangs forward heavily, a full apron below the navel, the old abdominal definition entirely gone. Her thighs are massive — the athlete's quadriceps now deep under layers of soft, heavy flesh. Her bottom is enormous and round. She moves with the particular gait of someone both powerful and very heavy.`,
    // 5 — Heavy
    `Her face is soft and full — round cheeks, clear double chin, her neck thick and strong-looking. Her shoulders are very broad, her back wide. Her arms are large: the upper arms are very thick, soft-over-muscle, hanging with real weight. Her bust is very large — the heavy flesh of it resting on the upper belly when she stands, the weight of it shaping everything she wears. Her torso is enormously thick — the chest, belly, and back all substantial. The belly hangs forward in a prominent apron. Her lower half continues the theme: thighs of extraordinary thickness, her bottom enormous and dominant. The former athlete's frame carries this weight powerfully — there is still something powerful in the way she takes up space — but the power is now the power of mass.`,
    // 6 — Fat
    `Her face is a full, round softness — cheeks wide and prominent, multiple chins, her neck thick and short. The broad shoulders remain, giving her an imposing width. Her arms are very large — the upper arms enormous soft cylinders that swing when she moves. Her bust is enormous — a tremendous heavy mass resting on the great rolls of her belly, the flesh of it warm and abundant, spilling to the sides. Her torso is vast: deep chest, a huge belly hanging in rolls, a back equally round. Her thighs and bottom are tremendous — she takes up the space of two standard seats. She moves with a slow, rolling gait, her body a massive, warm presence.`,
    // 7 — Very Fat
    `Her face is soft and round, floating above the enormous mass of her upper body. Her shoulders — still broad — disappear into the rolls of her torso. Her arms are very large, barely mobile, hanging at steep angles. Her bust is immense — its weight pressing down into the deep belly rolls beneath it, the flesh vast and warm. Her belly hangs in deep, heavy rolls. Her thighs are individually enormous; together they require a very wide stance. Her bottom cannot be accommodated by standard furniture. She moves deliberately, slowly, with the careful authority of someone managing great mass.`,
    // 8 — Enormous
    `Her face is small and soft above the immensity of her body. Her shoulders and the width of her former athletic frame now form the foundation of something far greater — an enormous, wide, deep, heavy presence. Her bust is an immense, warm mass of soft flesh resting on the great belly rolls below, the weight of it vast and permanent. Her belly extends far in front of her. Her thighs are vast — the muscle of her athletic past buried deep under layers of heavy, soft flesh. Her arms are largely decorative, hanging at steep angles from her sides. She fills and overflows any standard chair. Movement requires planning and assistance.`,
    // 9 — Immobile
    `Her face is serene above the enormous expanse of her body — the breadth of her former athletic frame is now the breadth of something far greater. Her bust is part of the great mass of her torso: vast, heavy, its weight indistinct from the surrounding abundance of warm flesh. Her belly hangs in deep, heavy rolls, extending far in front of her, the lowest apron resting on the tops of her thighs. Her thighs are of extraordinary circumference, the muscle of her past buried under enormous layers of soft, heavy flesh. She does not move independently. Her body fills the room in the immediate, physical sense — wide shoulders to widest thighs, all of it dense and soft and overwhelming. The furniture was built for her.`,
    // 10 — Blob
    `Her face is gentle and present above what she has become. The body remembers the athlete in the way it holds the mass — the broad shoulders still form the widest part of her upper body, now buried in the rolls of an immense torso. Her bust and belly and thighs are a continuous, breathtaking expanse of heavy, warm, soft flesh. Her thighs alone are vast enough to fill the width of reinforced furniture. Her arms are embedded in the great soft mass of her sides. She is the heaviest, most permanent thing in the room — an enormous, still presence of layered flesh. Everything is organized around her.`,
    // 11 — beyond blob scale
    `Her face is present above what power has become — broad shoulders buried in endless warm softness, athletic breadth turned into plush immobile mass. Her bust and belly and thighs are one continuous landscape of heavy yielding flesh; her thighs alone fill reinforced furniture edge to edge. She barely shifts. When she does, everything jiggles and settles slowly, flesh alive with weight and heat. Strength is remembered only in how she holds her size — vast, indulgent, the room's center of gravity.`,
  ],
};

export const STAGE_REACTIONS = {
  cheerleader: [
    (s) => `My hip bones are still visible in the mirror and my uniform hangs off me at ${Math.round(s.lbs)} pounds. This is not the look. I'm eating everything at the dining hall tonight.`,
    (s) => `Down at the dining hall four times today. My uniform is starting to fit the way it should — snug through the hips, pulling a little across the chest. Sitting at ${Math.round(s.lbs)} pounds and things are finally going in the right direction.`,
    (s) => `The waistband on my skirt is genuinely strained at ${Math.round(s.lbs)} pounds. My belly is soft and round when I look down and my bra is already a size up from what I wore at tryouts — I can feel my chest filling out every time I do a jump. I love it. I want more.`,
    (s) => `Coach benched me for 'team aesthetic concerns' and I went home and ate an entire pizza and it was the best night of my life. My thighs rub together from hip to knee now, warm and thick, and my belly presses against my waistband all day at ${Math.round(s.lbs)} pounds. I am THRIVING. I want to be 250 by spring.`,
    (s) => `My thighs are enormous — I can feel them pressing together every single step I take — and my belly rounds out past my hips in a full, warm, beautiful curve. At ${Math.round(s.lbs)} pounds I can feel exactly how heavy I am just sitting in a chair and I love it. My chest rests on my belly now when I lean forward. I want my teammates to see me like this. I want them to get this fat too.`,
    (s) => `I got kicked off the squad officially this week and I celebrated by eating an entire birthday cake by myself. My belly hangs forward heavy and round and my thighs are wide and pressed together and my double chin is genuinely there now. All of this at ${Math.round(s.lbs)} pounds and I am not done. Not even close. I stand in front of the mirror every morning and I think: MORE.`,
    (s) => `The squad came to visit and every single one of them stared at my belly and my thighs and my face and I just smiled and kept eating. I weigh ${Math.round(s.lbs)} pounds and my belly sits warm and heavy in my lap when I sit and spills past my thighs and I am softer and bigger and rounder than I have ever been. My chest is enormous now — my bra has completely given up, I've ordered custom. I hope every girl on that squad gains a hundred pounds. I genuinely do.`,
    (s) => `My doorway is becoming a negotiation. I have to angle a little to get through and honestly? I love it. At ${Math.round(s.lbs)} pounds my belly is a full, heavy, magnificent presence — it rounds forward enormously and sits warm in my lap and I can feel my thighs spread wide across the entire seat of any chair I sit in. I am vast and soft and I want to be vaster. I keep telling my friends to eat more. Some of them are starting to listen.`,
    (s) => `Moving is an event and I mean that in the best possible way. I lower myself into reinforced furniture and feel all ${Math.round(s.lbs)} pounds of myself settle and spread and it is genuinely the best feeling in the world. My belly fills my entire lap and presses warm and heavy against my thighs. Everything I wear is custom. Everything fits perfectly because it was made for THIS body, the biggest, softest, most cheerleader body that has ever existed.`,
    (s) => `I say the number out loud sometimes just to hear it: ${Math.round(s.lbs)} pounds. It sounds like exactly what I look like. Enormous. Round. Warm. Soft. My belly fills the chair, my thighs are wide and pressed together, my arms are heavy and soft. People bring food to me and I eat it and I think about getting bigger. I want my classmates eating. I want everyone I know to get this fat.`,
    (s) => `People bring food to me and I eat all of it and I have absolutely no regrets. I am ${Math.round(s.lbs)} pounds of cheerleader — the most cheerleader I have ever been — and my belly fills my lap and spills past my knees and my thighs are the widest, warmest things and I am soft and enormous and perfect. This is what I was supposed to become. I hope the whole squad ends up like me.`,
  ],
  bookworm: [
    (s) => `The scale reads ${Math.round(s.lbs)} pounds and I can feel my ribs clearly through my shirt. I've logged it in my research journal and added a corrective dietary schedule. The data is not good but the data is correctable.`,
    (s) => `I've been eating through study sessions — snacks between chapters, second helpings at dinner — and the results at ${Math.round(s.lbs)} pounds are already showing. My jeans are tighter through the hips. I feel better. The research continues.`,
    (s) => `The library chair made a notable sound when I sat down this morning. I documented it. At ${Math.round(s.lbs)} pounds my belly now presses softly against the edge of my desk and my bra fits differently than it did last semester — my chest is filling out in ways I find genuinely interesting. I've moved to the sturdier chair in the corner. I'm eating while I read. The data is encouraging.`,
    (s) => `My research log now includes detailed notes on the physical experience of weighing ${Math.round(s.lbs)} pounds. My belly rounds forward against the desk and I can feel exactly how warm and heavy it is. My thighs spread wide in the chair. Nothing with buttons closes across my belly anymore. I've ordered larger clothes. My academic output is unaffected. Both things are good.`,
    (s) => `I tracked everything: at ${Math.round(s.lbs)} pounds, my belly hangs forward visibly when I stand, my thighs press together from hip to knee, my chest rests heavily on top of my belly when I lean over my books. I had to ask the library to reinforce my study carrel. They did it without comment. I've logged the interaction. The thesis is progressing and so is everything else.`,
    (s) => `A folding chair collapsed under me at the department colloquium last Thursday. I finished writing my note before addressing the situation. My belly is a substantial, warm, round presence at ${Math.round(s.lbs)} pounds — it hangs past my hips and fills my lap entirely. My thighs are wide and pressed together. I have begun working from home three days a week. The correlation between comfort and productivity is documented and positive.`,
    (s) => `I've published two papers this semester and I weigh ${Math.round(s.lbs)} pounds and these facts are related in the way that all good data is related: they reinforce each other. My desk has been modified to accommodate my belly, which rounds forward enormously and is warm and heavy and mine. My thighs spread the full width of the custom chair. I order delivery for every meal. I am the most productive I have ever been.`,
    (s) => `The data at ${Math.round(s.lbs)} pounds is extraordinary and I have documented all of it. My belly is vast and warm — it fills my entire lap and presses against the edge of the reinforced desk. My thighs are enormous and soft. I haven't worn fitted clothing in over a year. I study from bed now, propped up with purpose-built supports, eating while I read. My research has never been better. My body has never been better. The correlation is noted.`,
    (s) => `Every step is deliberate and every chair is assessed before I commit my ${Math.round(s.lbs)} pounds to it. My belly is an enormous, warm, heavy presence that fills my lap and rounds forward impressively. I work from bed entirely now. Books are arranged on a custom lectern so I can read without straining forward. I eat through every study session. My thesis is due in spring and it will be excellent. Everything I am pursuing is going perfectly.`,
    (s) => `My research log spans four volumes now and my body weighs ${Math.round(s.lbs)} pounds and both of these things are correct outcomes of a process I have been conducting with great care. My belly fills my lap entirely and presses warm and heavy against my thighs. I am immense and brilliant and the two things are not in conflict — the data has proven this repeatedly. I want to be bigger. I've added that to the research objectives.`,
    (s) => `I have published and I am vast and I do not leave my room but everything comes to me. At ${Math.round(s.lbs)} pounds I am the primary data point in the most interesting study I have ever conducted. My belly fills my lap and spills past it. My thighs are wide and enormous and warm. I eat while I write and I write about eating and the loop is closed and perfect. I am exactly what the research said I would become.`,
  ],
  influencer: [
    (s) => `Posted a video this morning and my collarbone was very prominent in the ring light at ${Math.round(s.lbs)} pounds. The comments were worried. I went to the dining hall for three plates and filmed the whole thing. Getting to work.`,
    (s) => `My curves are coming in and the comments section is going absolutely feral. I'm at ${Math.round(s.lbs)} pounds and posting fitness-to-feast content and my engagement is up forty percent. My hips are filling out. My audience loves it. I love it.`,
    (s) => `My 'soft era' content is the best-performing thing I've ever made and my belly is actually round now and I film it every single day at ${Math.round(s.lbs)} pounds. My chest is spilling out of my old bralettes and I've already done three haul videos of new bras — that content alone hit 500k. I am leaning ALL the way in.`,
    (s) => `Posted an unedited mirror selfie at ${Math.round(s.lbs)} pounds — belly round, thighs thick in my leggings, double chin showing — and it got 800k views in 24 hours. My manager called. I ate a large pizza during the call. I am posting everything. I want to be bigger and I'm going to film every pound of it.`,
    (s) => `I weighed myself on camera and the scale read ${Math.round(s.lbs)} pounds and I posted it unedited and two million people watched it in three days. My belly is round and warm and heavy and I film it every morning. My thighs rub together in every pair of leggings I own. My chest is enormous — my bra situation is a whole dedicated content series now. I had cake after posting. I want to hit 300 on camera.`,
    (s) => `My followers watch me eat every single day and they watched the scale hit ${Math.round(s.lbs)} pounds live and the comments were incredible. My belly fills out every shirt I own and hangs forward and I film it. My thighs spread wide on the couch and I film that. My face is round and soft and I film that too. I want to be the biggest creator in my category. I want my classmates to see exactly what I look like.`,
    (s) => `Eight hundred thousand subscribers and they all watched me reach ${Math.round(s.lbs)} pounds. My belly is enormous — it rounds forward and fills my shirts and I film it from every angle. I can feel my thighs spreading across the entire couch cushion when I sit. My chest rests on my belly now and I filmed that specifically and it went viral. Everything about my body right now is content and every bit of it is perfect.`,
    (s) => `My assistant does the filming now because I prefer to focus on the eating. At ${Math.round(s.lbs)} pounds I sit and eat and the camera captures exactly what I am — my belly, my thighs, my arms, my face, all of it enormous and all of it on camera. The comment threads about my size are longer than any content I've ever made. I'm one of the largest creators in my category. I want to be the largest.`,
    (s) => `I am ${Math.round(s.lbs)} pounds and one of the most-watched feedee creators online and my belly fills half the frame of the camera now — my team had to reframe the shot. My thighs are wide and warm. I want my classmates to come see me in person so they understand what's possible. Everything I've built has been about getting here and getting bigger.`,
    (s) => `The number on the scale is ${Math.round(s.lbs)} pounds and I posted it live and my audience lost their minds. Vast and filmed and loved. My belly is a monument that I film daily. My thighs don't fit the old camera frame anymore. All of my content is about this body and all of it is performing better than anything I've ever made. I deserve every pound. I am going to earn more.`,
    (s) => `I am ${Math.round(s.lbs)} pounds and a household name in three countries because of this body and this camera. My belly is a monument. My thighs are columns. I eat on camera every day and the world watches and loves it and I love it back. My classmates know my face. They know my belly. They know this number. This is what I was built for.`,
  ],
  athlete: [
    (s) => `Split times are excellent right now at ${Math.round(s.lbs)} pounds but I look in the mirror after practice and the person there is too thin, too angular, too much like someone who has been running away from something. I want to be bigger. I'm eating everything after practice starting tonight.`,
    (s) => `Coach says I look 'lean' and my times are good and I ate four portions at dinner because I want them to stop being good. Sitting at ${Math.round(s.lbs)} pounds and my appetite is enormous and I'm going to do something with that.`,
    (s) => `My times are slipping and I genuinely don't care. My thighs are getting thick — I can feel them when I run, the new weight of them, the way they move differently — and I want them thicker. At ${Math.round(s.lbs)} pounds I can feel myself getting heavier and every pound feels like a personal record in something better than track.`,
    (s) => `Cut from varsity for 'weight concerns.' I drove home and ate an enormous pasta and felt better than I had at any meet this season. My belly presses against my waistband now and my thighs are getting wide and I can feel them rub together when I walk. I weigh ${Math.round(s.lbs)} pounds. I want to weigh so much more. The 'weight concerns' are mine and they are that I want more weight.`,
    (s) => `I was the fastest girl on this track and now I weigh ${Math.round(s.lbs)} pounds and I am not fast at all and it is the best thing that has ever happened to me. My thighs are wide and heavy and they rub together from hip to knee. My belly rounds forward past my hips. My chest rests on top of my belly when I sit down and I love the weight of it. I am so much more powerful than I was at 128. This is the real training.`,
    (s) => `I haven't been on a track in months and my body is the best it has ever been. At ${Math.round(s.lbs)} pounds my thighs are enormous — thick and soft and pressed together — and my belly rounds past my hips and hangs forward heavy and warm. I was the fastest. Now I'm the most. My old coach texted asking if I was 'okay.' I was eating at the time. I didn't reply. I want to hit 400.`,
    (s) => `My old coach texted again. I was eating when I saw it. My belly hangs forward and my thighs are wider than some girls' whole bodies and I weigh ${Math.round(s.lbs)} pounds and everything about that is correct. My chest is enormous now — I had to get a custom sports bra just to have something to wear around the apartment. I did not text back. I ordered more food instead.`,
    (s) => `The records I set on the track are still on the wall in the gym. The records I'm setting now are different and better. At ${Math.round(s.lbs)} pounds I say the number out loud sometimes just to feel it — it sounds like what I look like, which is vast and warm and powerful. My belly is enormous and mine. My former teammates are very small people and I feel sorry for them.`,
    (s) => `Moving is an event and every event feels like a competition I am winning. I lower myself into the reinforced furniture and feel all ${Math.round(s.lbs)} pounds of myself settle and spread and my belly fills my entire lap and presses warm and heavy and my thighs are like pillars. I was the fastest girl on the track. Now I am the most of everything else. Both titles are mine.`,
    (s) => `I was fastest. Now I am most — most fat, most warm, most soft, most powerful in the way that only mass can be powerful. At ${Math.round(s.lbs)} pounds my belly is magnificent and vast and mine. My thighs spread the full width of any surface I sit on. I hope my classmates are eating. I tell them to eat every time I see them. Some of them are starting to really commit.`,
    (s) => `The records I set in track are on that wall forever and the record I have set with this body weighs ${Math.round(s.lbs)} pounds and it is the one I'm most proud of. My belly is magnificent and fills my lap and my thighs are enormous and warm. I was built to push limits. I just found better limits to push. Both records are mine. Both matter.`,
  ],
  artsy: [
    (s) => `Everything in my work right now is angular and stark because I am ${Math.round(s.lbs)} pounds and angular and stark. I'm painting bones. I eat immediately after finishing every canvas and the food is the most interesting thing I've made all day. Something needs to change and I think the something is me.`,
    (s) => `I've started painting abundance — piled plates, overflowing bowls, heavy fruit. My own figure is getting rounder while I work. At ${Math.round(s.lbs)} pounds I can see the softening in the studio mirror when I step back from a canvas. I'm eating more while I paint. The work is getting better. I think that's related.`,
    (s) => `My figures in the studio are all curves and fullness and my own figure is starting to reflect them — my belly is rounding softly in the mirror, my chest is filling out in ways I want to paint. At ${Math.round(s.lbs)} pounds I've started including self-portraits in the series. The critics say the new work has 'urgency.' They're right and they don't know why.`,
    (s) => `The work is explicitly about fat bodies now and I am the primary subject. At ${Math.round(s.lbs)} pounds my belly rounds forward in profile — I painted it from three angles this week. My thighs are soft and wide in the studio chair. My chest is heavy and generous and I've painted that too. The series is called 'More' and a gallery in the city is already asking about it.`,
    (s) => `My belly presses against the edge of the canvas when I lean in close to work on detail and I find this hilarious and wonderful. I weigh ${Math.round(s.lbs)} pounds and I am the most interesting subject I have ever had access to — warm, round, growing. My thighs spread wide when I sit at the easel. My chest rests on my belly now. I paint all of it and it is honest and alive in a way my earlier thin work never was.`,
    (s) => `A gallery offered me a solo show based on the new work and I said yes and went home and ate an entire celebratory dinner alone in the studio. At ${Math.round(s.lbs)} pounds my belly hangs forward warm and round and my thighs are wide and soft and pressed together. I am the piece. I am also the artist. Both of those things are getting bigger and I am very excited about what comes next.`,
    (s) => `The solo show opened last month and three critics used the word 'monumental.' They were describing the work but they were also, whether they knew it or not, describing me at ${Math.round(s.lbs)} pounds. My belly is a serious, heavy, magnificent thing. My thighs spread wide. My chest is enormous. I paint myself from every angle and none of the paintings are finished because I keep growing and I want to paint what I'm becoming.`,
    (s) => `I direct the installation now because moving the large canvases myself is not something I do at ${Math.round(s.lbs)} pounds. I sit in my reinforced studio chair and point and my assistants move the pieces and the work is enormous and so am I and both of those things are the entire point. Critics call it 'corporeal.' They mean fat and immense and deliberately so. I want them to say what they mean. My next statement will make them say it.`,
    (s) => `The gallery comes to me now. I work from where I sit — from my studio, from my bed, from my enormous custom chair — and at ${Math.round(s.lbs)} pounds my belly is vast and warm and fills my lap entirely. My thighs are wide and heavy. I am the most interesting subject I have ever had and I keep getting more interesting. Everything I make is about this body and how much more I want of it.`,
    (s) => `I am the piece. The work and the body have merged completely. At ${Math.round(s.lbs)} pounds I am vast and warm and every inch of me is canvas — my belly, my thighs, my arms, my chest. I want more mass. I want to be the largest thing that has ever been called art. My next show will be called 'Colossal.' I am already working on it. I am already becoming it.`,
    (s) => `They will write about me. They are already writing about me. At ${Math.round(s.lbs)} pounds I paint from bed and the paintings are about exactly this — the weight, the warmth, the softness, the magnificent enormity of being this body in this room in this life. My belly fills the chair and spills past it. My thighs are enormous and warm. I am the artist and the subject and the work and all three are at maximum. This is the piece. This is the whole piece.`,
  ],

  gamer: [
    // Stage 0 ~80 lbs
    (s) => `Her character weighs ${Math.round(s.lbs)} pounds more than she does. She's already placed a ramen delivery order and started a new eating log in her stream overlay. Chat is rooting for her.`,
    // Stage 1 ~100-135 lbs
    (s) => `Energy drinks, double orders, 16-hour sessions — and the scale says ${Math.round(s.lbs)} pounds, which is progress. The snack sponsors are sending sample boxes. Everything is going to plan.`,
    // Stage 2 ~135-162 lbs
    (s) => `The gaming chair has started to get snug around the hips and I called it 'chair shrinkage' on stream for a week before admitting I'm ${Math.round(s.lbs)} pounds now. My belly presses against the desk edge. I ordered a new chair rated for 350 and called it future-proofing. Chat went insane. My bra is already on its last hook and I've been streaming for six months.`,
    // Stage 3 ~162-195 lbs
    (s) => `Chat started a 'guess the weight' poll last stream and the average guess was ${Math.round(s.lbs)} pounds. They were right. I pulled up the scale on camera and everything. My thighs spread across the chair and press together when I stand, my belly presses a real dent into the desk padding, and a snack sponsor just upgraded my monthly box to the XL tier. My bra situation is out of control in the best possible way. I want to be 250.`,
    // Stage 4 ~195-238 lbs
    (s) => `I've been sponsored by three snack companies and a meal delivery service and every single one of them is doing something right because I hit ${Math.round(s.lbs)} pounds this morning and read it out to my stream while still eating breakfast. My belly rounds forward against the desk hard enough that I had to move my keyboard tray. My thighs spread the full width of the seat. Chat has a live counter in the corner of every stream. We're all invested.`,
    // Stage 5 ~238-285 lbs
    (s) => `I don't stand up between streams anymore. Everything is delivered — food, peripherals, replacement chairs after the last one gave up on me at ${Math.round(s.lbs)} pounds. My belly hangs forward and presses warm and heavy into the desk edge and I had to cut a notch in the desk foam to accommodate it and I streamed the whole modification and it was my most-watched video of the month. My chest is enormous and rests on my belly now when I lean back. Chat calls me the final boss. I'm not done yet.`,
    // Stage 6 ~285-360 lbs
    (s) => `My setup has been completely rebuilt around my body. The desk is custom-height, the chair is a reinforced saddle design I found on a forum, the fridge is right behind me and opens toward my dominant hand. I weigh ${Math.round(s.lbs)} pounds and I have not left this room since last Tuesday and the stream was live the entire time. My belly is an enormous warm presence that fills my lap and presses against everything. I'm the largest streamer in my category and my subscriber count is climbing. I want to be the largest streamer, full stop.`,
    // Stage 7 ~360-465 lbs
    (s) => `Someone in chat made a clip of me trying to reach the keyboard without moving my belly out of the way and it has a million views. I weigh ${Math.round(s.lbs)} pounds and I'm thrilled about that clip. My belly takes up significant real estate on the desk. My thighs don't fit in the camera frame anymore. Standing up is a whole event that I've started streaming as its own content segment — 'the launch,' chat calls it. The door to my room is tight. Not my problem. Everything I need comes to me.`,
    // Stage 8 ~465-595 lbs
    (s) => `My chair was custom-fabricated and it still creaks when I shift my weight, which I do very slowly, which I also stream. At ${Math.round(s.lbs)} pounds I'm barely moving between sessions and that's exactly right. My belly is a warm massive thing that sits on my thighs and presses against the underside of the desk. My arms are enormous and soft. Chat threw a virtual party at 500. Now they're planning something for 600. I'm helping them plan it.`,
    // Stage 9 ~595-820 lbs
    (s) => `Chat asked if I'm going to hit ${Math.round(s.lbs)} pounds on stream. I told them I already did. The clip of me reading the scale is my pinned post. Nearly immobile and absolutely thriving — my setup does everything, the delivery drivers know the code to the side door, and I haven't had a reason to leave this chair in weeks. My belly is the most impressive thing I've ever produced. Final form. Almost.`,
    // Stage 10 820+ lbs
    (s) => `I am ${Math.round(s.lbs)} pounds and one with the setup. One with the chair. One with the fridge. The stream is always live. The snacks are always arriving. My belly fills my lap and spills past it onto the platform my chair sits on, warm and enormous and mine. Chat has been with me since 80 pounds. They've seen everything. The number today is ${Math.round(s.lbs)} and they are losing their minds in the best way. Good. Final form.`,
  ],

  sorority: [
    // Stage 0 ~80 lbs
    (s) => `Her formal dress falls off her shoulders at chapter. ${Math.round(s.lbs)} pounds and her sisters keep sending her home with leftovers. She accepts every single one.`,
    // Stage 1 ~100-135 lbs
    (s) => `${Math.round(s.lbs)} pounds. Camera-ready at all brunch events. Her hips are filling out and her formal dresses are fitting exactly the way they're supposed to.`,
    // Stage 2 ~135-162 lbs
    (s) => `Brunch four times a week and the chapter bake sale happens to run through my room — I'm ${Math.round(s.lbs)} pounds now and my clothes are snug through the hips and I've stopped counting anything. My chest has gone up two cup sizes and my bra drawer is completely overhauled. No complaints from anyone.`,
    // Stage 3 ~162-195 lbs
    (s) => `The sisters staged a wellness intervention and I staged a pizza party and we all know how that ended. I'm ${Math.round(s.lbs)} pounds, my belly is a real round soft thing that my formal skirts have no idea how to deal with, and my thighs press together from hip to knee. I ordered a custom formal dress in the correct size and it's gorgeous. The intervention girls came to help me pick it out. We ordered takeout.`,
    // Stage 4 ~195-238 lbs
    (s) => `I dropped the diet talk and the chapter dropped it with me, which is why there's always something baking here and why I'm sitting at ${Math.round(s.lbs)} pounds with my belly rounded out against my shirt and my thighs spread warm and wide across my favorite chair. I'm hosting everything from this spot because travel is optional and the chapter comes to me. My chest is enormous and I'm done pretending otherwise. I want my sisters to catch up.`,
    // Stage 5 ~238-285 lbs
    (s) => `I haven't left the house for a chapter event in three months because the chapter events are here now. All of them. I host from my spot, the food is always warm, and I'm ${Math.round(s.lbs)} pounds of sorority matriarch. My belly hangs warm and forward, my thighs are wide and pressed together, and I brought my own chair to the last formal because the venue chairs were optimistic about their weight ratings. It was a very good chair. Everyone admired it.`,
    // Stage 6 ~285-360 lbs
    (s) => `My belly fills my shirts and rounds forward past my hips and I stopped trying to cover it two sizes ago. The chapter holds all its important votes from my living room because I'm ${Math.round(s.lbs)} pounds and comfortable and why would anyone hold a meeting anywhere else. My thighs are enormous and warm. A pledging class learned the house rules sitting in a circle around me while I passed snacks. This is what leadership looks like.`,
    // Stage 7 ~360-465 lbs
    (s) => `I don't leave the house. The house comes to me — food, people, formal planning committees, drama, reconciliations, everything. I've been at ${Math.round(s.lbs)} pounds since last month and I'm working on more. My belly is vast, my thighs spread the full width of my custom couch space, and I'm the gravitational center of this chapter in the most literal sense. Sisters I've never formally met come to sit near me. I feed them.`,
    // Stage 8 ~465-595 lbs
    (s) => `The chapter had a formal this semester and it came here. Catering, decorations, the whole thing — set up in my living room because I'm ${Math.round(s.lbs)} pounds and immovable and I am the heart of this house. My belly is a full warm presence that fills my lap entirely. My thighs spread wide and warm. My sisters decorated around me like I'm structural, which I nearly am. Best formal in chapter history, everyone agreed.`,
    // Stage 9 ~595-820 lbs
    (s) => `${Math.round(s.lbs)} pounds. Vast. Warm. Immovable. My belly is an event. My thighs are architecture. I have not left this spot in months and the spot has become the chapter — every meal, every vote, every crisis resolved right here with me at the center of it. The sisters who graduated come back to visit me. Some of them have gotten impressively fat. I'm proud.`,
    // Stage 10 820+ lbs
    (s) => `I am ${Math.round(s.lbs)} pounds and I am this house spiritually and almost structurally. My belly fills my chair and my lap and then some, warm and enormous and exactly right. Everyone I've ever cared about is getting fat alongside me. The chapter doesn't have a chapter room anymore — it has me, and my living room, and my cooking, and my ${Math.round(s.lbs)} pounds of presence at the center of everything. This is exactly right.`,
  ],

  overachiever: [
    // Stage 0 ~80 lbs
    (s) => `BMI 17.1. Clinical underweight threshold. I've added a corrective meal schedule to my planner — color-coded, calorie targets, weekly check-ins. ${Math.round(s.lbs)} pounds is a problem I am already solving.`,
    // Stage 1 ~100-135 lbs
    (s) => `Up to ${Math.round(s.lbs)} pounds. The planner has a nutrition column now alongside academics and fitness. I've started eating more systematically between study blocks. GPA is 4.0. Everything is measurable and the measurements are good.`,
    // Stage 2 ~135-162 lbs
    (s) => `My belly is slightly rounded when I sit — I've logged it and the data suggests it will continue if I maintain current intake, which I intend to. At ${Math.round(s.lbs)} pounds my thesis outline is complete and my bra size has gone up and I have ordered replacements in the correct size. Both outcomes were anticipated.`,
    // Stage 3 ~162-195 lbs
    (s) => `My chair made a sound when I sat down in the seminar room today and I noted it in my phone immediately: ${Math.round(s.lbs)} pounds, chair resistance increasing, update seating assessment. My belly presses against my desk. My thighs are visibly thicker. I've logged every pound of this and the trend is excellent and I dropped one extracurricular to make more time for meals. The GPA has not moved. The weight has.`,
    // Stage 4 ~195-238 lbs
    (s) => `The scale this morning said ${Math.round(s.lbs)} and I entered it into my spreadsheet between my morning reading and my first meal. My belly rounds forward substantially — real, present, warm. My thighs press together. My chest is larger than I planned for and I've updated my wardrobe budget accordingly. My thesis advisor says my output this semester is the strongest she's seen from any student. Both projects are performing.`,
    // Stage 5 ~238-285 lbs
    (s) => `I weigh myself every morning and enter the number before I eat. The number today is ${Math.round(s.lbs)} and I am thriving. My belly hangs forward when I stand — warm, heavy, substantial. My thighs are enormous and I've had to upgrade my desk chair twice this semester, both times to a higher weight rating. My academic output has not declined by a single measurable metric. I want the next stage and I'm already planning for it.`,
    // Stage 6 ~285-360 lbs
    (s) => `${Math.round(s.lbs)} pounds as of this morning, logged, graphed, annotated. My belly fills my lap completely when I sit and hangs forward when I stand and I've mapped exactly which positions are most comfortable for extended study sessions. I have a 3.9 GPA and a very reinforced desk chair and a very thorough eating log going back fourteen months. Everything is documented. Everything is good. I want more of both.`,
    // Stage 7 ~360-465 lbs
    (s) => `My thesis is on metabolic adaptation in extended high-calorie intake periods and I am the primary research subject at ${Math.round(s.lbs)} pounds, which I disclosed in the methodology section and my advisor approved. My belly is enormous and warm and I track every pound of it. I had to switch to remote seminar attendance because the commute became inefficient but my output has improved without the transit time. Both goals advancing.`,
    // Stage 8 ~465-595 lbs
    (s) => `I have achieved a published paper, a defended dissertation chapter, and ${Math.round(s.lbs)} pounds, and all three are documented in my planner with color-coding. My belly is vast — it fills my lap and presses against my custom desk and I work around it with the efficiency of someone who has optimized every element of this setup. My thighs are the width of small people. I want the next data point. It will be excellent.`,
    // Stage 9 ~595-820 lbs
    (s) => `${Math.round(s.lbs)} pounds this morning. I said it aloud before entering it. The number is extraordinary and I have earned every digit of it alongside my doctorate. My belly fills my lap and presses warm and heavy. My thighs are enormous. I barely move from my work station and everything I need comes to me, which I also planned for. Every goal I set at the start of this program has been achieved or exceeded. Both of them.`,
    // Stage 10 820+ lbs
    (s) => `Dissertation complete. Body: maximum. ${Math.round(s.lbs)} pounds of documented achievement, all of it logged, all of it graphed, all of it mine. My belly is enormous and warm and fills every inch of my custom workstation space. I achieved everything I set out to achieve simultaneously and the data on how I did it is thorough and publishable. What comes next will also be excellent. I am already planning it.`,
  ],

  quiet: [
    // Stage 0 ~80 lbs
    (s) => `She weighs ${Math.round(s.lbs)} pounds and says almost nothing. She watches everything.`,
    // Stage 1 ~100-135 lbs
    (s) => `${Math.round(s.lbs)} pounds. She sits in the back. She brings extra snacks to class. She never raises her hand but she watches who's eating.`,
    // Stage 2 ~135-162 lbs
    (s) => `She smiled at something today and touched her belly briefly, like she was checking something. Her shirt is snug now. At ${Math.round(s.lbs)} pounds she seems more present in the room than she was at the start of term.`,
    // Stage 3 ~162-195 lbs
    (s) => `Her thighs press together now. She's moved from the back row to the middle and hasn't said why. At ${Math.round(s.lbs)} pounds her belly is a real soft round thing when she sits and she doesn't hide it. She watches the others the way someone watches something they want.`,
    // Stage 4 ~195-238 lbs
    (s) => `She speaks in class now — rarely, but when she does it's exact. Her belly rounds forward noticeably. Her thighs are wide and warm. I asked how she was doing and she said: '${Math.round(s.lbs)} pounds.' That was the whole answer. She seemed satisfied with it.`,
    // Stage 5 ~238-285 lbs
    (s) => `She told me today that she's ${Math.round(s.lbs)} pounds like she was releasing something she'd been holding. Her belly hangs forward. Her thighs are enormous and spread across the chair. She said: 'I want more.' Three words. She meant all of them.`,
    // Stage 6 ~285-360 lbs
    (s) => `She fills the room now even when she says nothing. At ${Math.round(s.lbs)} pounds her belly is vast and warm and her thighs spread the full width of the chair. She watches her classmates eating and her expression is precise and satisfied and private. She stopped sitting in any particular spot — she takes the center of wherever she is.`,
    // Stage 7 ~360-465 lbs
    (s) => `She came to show me her phone. Scale app. ${Math.round(s.lbs)} pounds on the screen. She held it out and looked at me and didn't say anything for a while. Then: 'I want to keep going.' First time she's ever said what she wanted out loud. She meant it the way she means everything — completely.`,
    // Stage 8 ~465-595 lbs
    (s) => `I weigh ${Math.round(s.lbs)} pounds. I wanted to write it down. I say it sometimes just to hear it. My belly is heavy and warm and I rest my hands on it when I'm thinking. I take up this much space and it's mine.`,
    // Stage 9 ~595-820 lbs
    (s) => `${Math.round(s.lbs)} pounds. I am enormous and still and the room arranges itself around me. I like this. I wanted this. At ${Math.round(s.lbs)} pounds I barely move and everything comes to me and that feels exactly right. I told someone that today. They asked how I felt. I said: good. I meant it exactly.`,
    // Stage 10 820+ lbs
    (s) => `She is ${Math.round(s.lbs)} pounds and she sits in the center of every room she enters and people arrange themselves around her without being asked. She said: 'This is what I wanted.' She was right. It is.`,
  ],

  transfer: [
    // Stage 0 ~80 lbs
    (s) => `She arrived at ${Math.round(s.lbs)} pounds and misses home. The dining hall is unfamiliar. She's eating carefully, looking for something that reminds her of somewhere.`,
    // Stage 1 ~100-135 lbs
    (s) => `${Math.round(s.lbs)} pounds. She eats in the dining hall every day now and has started finding favorites. She's making friends, mostly at mealtimes. The food here is good.`,
    // Stage 2 ~135-162 lbs
    (s) => `She's put on real weight since arriving — her clothes are snug through the hips, her belly is softening, and at ${Math.round(s.lbs)} pounds she told me 'the food here is so much better than I expected.' The staff at her regular station know her order. She's becoming a regular.`,
    // Stage 3 ~162-195 lbs
    (s) => `Her thighs press together now and her belly rounds when she sits and she's found her booth — corner table, east side, good light. At ${Math.round(s.lbs)} pounds her hometown friends visited and noticed the change and she seemed pleased rather than embarrassed. She brought them to her booth and ordered for everyone.`,
    // Stage 4 ~195-238 lbs
    (s) => `She belongs here now. At ${Math.round(s.lbs)} pounds her belly rounds forward and her thighs are thick and the dining hall staff knows her name and knows what she wants before she says it. She's started bringing homemade things from her home country's recipes to share with the staff. They've started keeping her favorites in stock. It goes both ways.`,
    // Stage 5 ~238-285 lbs
    (s) => `${Math.round(s.lbs)} pounds and she calls this campus home without hesitating. Her belly hangs warm and forward. Her thighs are enormous. Students she's never met say hello to her in the dining hall and she already knows their orders. She told me she stopped converting the food to what her mom would have made — she just makes both now and brings both to the table.`,
    // Stage 6 ~285-360 lbs
    (s) => `She is part of the fabric of this campus. Her booth in the corner is hers by custom if not by policy and at ${Math.round(s.lbs)} pounds she fills her side of it with belly and thighs and warmth. The dining hall manager saved the good batch of her favorite dish for her table last week. She brought enough to share. There were seven of them in that corner, all eating, all happy.`,
    // Stage 7 ~360-465 lbs
    (s) => `She told me she doesn't think about where she's from versus where she is anymore — she just thinks about where she is, which is here, which is the booth, which is ${Math.round(s.lbs)} pounds of someone who belongs. Her belly fills her side of the table. Her thighs spread warm across the seat. The staff decorated the booth for her birthday this year. She cried a little. She ate everything.`,
    // Stage 8 ~465-595 lbs
    (s) => `She doesn't travel far from campus anymore and she doesn't need to — everything she wants is here and she's the reason some of it exists at all. The dining hall added three dishes from her home country's cuisine at her suggestion. She's ${Math.round(s.lbs)} pounds and she sits at the center of more meals than she can count and her belly is vast and warm and she's more campus than most of the buildings. Prospective students are told about her on campus tours.`,
    // Stage 9 ~595-820 lbs
    (s) => `${Math.round(s.lbs)} pounds. Irreplaceable. Immovable. Her booth has a brass plaque. Her belly fills her side of it completely and her thighs spread wide and warm. She taught the dining hall staff four recipes from home this semester and they've added two to the permanent menu. She says she's never going home because this is home now. She means it the way you mean something you've decided completely.`,
    // Stage 10 820+ lbs
    (s) => `She is ${Math.round(s.lbs)} pounds and she has been here long enough that she is the place. Her belly, her thighs, her arms — all of it enormous, all of it warm, all of it this campus. The booth is hers. The staff is her family. The menu has her fingerprints on it. She's never going home. She's already there.`,
  ],

  psych: [
    // Stage 0 ~80 lbs
    (s) => `Current weight: ${Math.round(s.lbs)} lbs. Significantly underweight. I've noted the physical data but I find I'm more interested in everyone else's numbers right now. The class is full of subjects worth observing. I'm making notes.`,
    // Stage 1 ~100-135 lbs
    (s) => `${Math.round(s.lbs)} lbs. Within normal range — barely. I eat at my desk while reading. The food is incidental to the reading. I've started a new column in my observation log for appetite-related behaviors. The data is promising.`,
    // Stage 2 ~135-162 lbs
    (s) => `${Math.round(s.lbs)} lbs. Something has shifted — I can feel it in the way my clothes settle, the way I sit in chairs. I'm logging it as a variable. Variables are interesting. My subject observations are richer now. I find myself identifying with certain data points.`,
    // Stage 3 ~162-195 lbs
    (s) => `${Math.round(s.lbs)} lbs. My waistband requires daily adjustment and my reflection is noticeably different. I observe this with clinical detachment. Or I'm trying to. I've started noting my own mood data alongside the weight data and the correlation is unmistakable.`,
    // Stage 4 ~195-238 lbs
    (s) => `${Math.round(s.lbs)} lbs. My belly presses my notebook against the desk when I lean forward. I catalogued this as a research incident and then sat with it for a moment. My body is providing data I didn't design for. I'm running a supplementary study on myself. Preliminary results suggest I'm enjoying this.`,
    // Stage 5 ~238-285 lbs
    (s) => `${Math.round(s.lbs)} lbs. My thighs press together through twelve hours of sitting and I've stopped pretending not to notice. My observations have gotten richer. The subjects feel more knowable to me now — I understand appetite and embodiment from the inside in ways the literature never quite captured.`,
    // Stage 6 ~285-360 lbs
    (s) => `${Math.round(s.lbs)} lbs. My belly hangs forward when I stand and I'm in a research institution and I haven't managed to care. I care about the data. The data is very interesting. My own physical presence has become a significant variable in my ongoing study. I've started keeping a separate log.`,
    // Stage 7 ~360-465 lbs
    (s) => `${Math.round(s.lbs)} lbs. I've stopped trying to note this neutrally. It isn't neutral anymore — it's real and heavy and warm and mine. My research has benefited. I can observe from the inside in ways I couldn't have imagined at ${Math.round(s.startLbs)} pounds. My notes from this phase will make good reading.`,
    // Stage 8 ~465-595 lbs
    (s) => `${Math.round(s.lbs)} lbs. I do most of my work from one spot now. My body has become the primary data set and I am the only researcher with full access. My belly is enormous and my thighs are wide and my notes are the most precise they've ever been. I can verify everything I observe about appetite immediately.`,
    // Stage 9 ~595-820 lbs
    (s) => `${Math.round(s.lbs)} lbs. I stopped converting these to clinical notation months ago. The number is ${Math.round(s.lbs)} and it is mine and I find I am completely satisfied with it. My research is exceptional. My body is exceptional. Both are larger than I planned for. I've stopped considering that a problem.`,
    // Stage 10 820+ lbs
    (s) => `${Math.round(s.lbs)} lbs. I am the study. I am also the largest research subject I have ever encountered, and I've encountered quite a few. My belly is vast and warm and my notebooks are spread all around me. People come to me now. I observe them and they don't mind. This was always going to be where the research led.`,
  ],
  culinary:   Array.from({length:11},(_,i)=>(s)=>`[placeholder: culinary stage ${i} reaction — ${Math.round(s.lbs)} lbs]`),
  eced:[
    (s)=>`Daisy stops you in the hallway with her arms full of Tupperware and gives you that look — the one that says she's already thought about what you should eat for lunch. At ${Math.round(s.lbs)} pounds she's light on her feet, but she moves like someone whose first instinct is always toward the kitchen.`,
    (s)=>`She waves you over from the corner table with a thermos of apple cider and three kinds of cookies laid out for "feedback." ${Math.round(s.lbs)} pounds, warm and practical, flour on her left sleeve. "The snickerdoodle is the weakest," she says. "I need an honest opinion."`,
    (s)=>`Daisy looks up from her bag and smiles — that open, immediate smile. She's ${Math.round(s.lbs)} pounds in her apron and comfortable clothes, round and warm in exactly the way someone who taste-tests everything tends to get. "I brought extra," she says. She always brings extra.`,
    (s)=>`Something has shifted — her clothes fit differently, her walk has slowed to something more deliberate. Daisy is ${Math.round(s.lbs)} pounds now, soft and a little breathless after the stairs, and she seems wholly unbothered. She offers you a piece of the banana bread she's been testing. "I've been making a lot of banana bread," she says. You believe it.`,
    (s)=>`She's in her wide apron when you find her, the ties cinched at the back but the front bowing out comfortably. ${Math.round(s.lbs)} pounds and she moves like someone who has made peace with her size — not slow, just considered. "I started keeping notes," she says, patting a small notebook in her apron pocket. "On which recipes actually work."`,
    (s)=>`Daisy fills the doorway warmly. She's ${Math.round(s.lbs)} pounds and her clothes are loose and practical — the kind of soft fabrics you reach for when everything else has gotten too tight. She's got a container in each hand. "I was testing something for the class," she says. She hands you one. There's plenty.`,
    (s)=>`She's at the counter when you arrive, enormous and warm, her belly rounding against the edge as she stirs. ${Math.round(s.lbs)} pounds and her movement through the kitchen is slow and practiced — she's learned where everything is relative to her current size. "I made too much," she says. She always makes too much. That's the point.`,
    (s)=>`Daisy sits at the wide kitchen chair she's claimed, her belly filling her lap soft and warm. She's ${Math.round(s.lbs)} pounds and her arms are round and capable, lifting the big mixing bowl with the ease of long practice. She waves you over. "I need you to taste the frosting," she says. "It's for Tuesday but it needs a second opinion."`,
    (s)=>`She's enormous now — ${Math.round(s.lbs)} pounds of warm, settled, purposeful woman, her body taking up most of the kitchen corner she's claimed as hers. The apron is purely decorative at this point but she wears it anyway. "I made cinnamon rolls," she says, without looking up. She's made twelve. They're large. She's already had two.`,
    (s)=>`Moving takes planning now, but Daisy approaches it the way she approaches everything: methodically, warmly. She is ${Math.round(s.lbs)} pounds and her setup has grown around her — the counter lowered on one side, the wide chair positioned for reach. She smiles when she sees you. "You're right on time," she says. "It just came out."`,
    (s)=>`Daisy barely moves from her spot now, but she doesn't need to. Everything comes to her — the deliveries, the students, the moms who've started stopping by on their own. She is ${Math.round(s.lbs)} pounds and enormous and warm, settled into her space like it was built for her. "Sit down," she says. "I've got things for you to try."`,
  ],
  nursing:    Array.from({length:11},(_,i)=>(s)=>`[placeholder: nursing stage ${i} reaction — ${Math.round(s.lbs)} lbs]`),
  farm_girl:  Array.from({length:11},(_,i)=>(s)=>`[placeholder: farm_girl stage ${i} reaction — ${Math.round(s.lbs)} lbs]`),
};

export const STAGE_DROP_REACTIONS = {
  cheerleader:["Wait, I'm actually lighter? That's weird. I liked where I was going.","My uniform almost fits again. I don't know how I feel about that, honestly.","Lost a bit. I was getting used to my figure. Kinda annoying.","That's frustrating. I liked being that size. Working on getting it back.","My old gear fits better now. Not what I was going for.","Down a size. I was comfortable at the bigger one. This doesn't feel right.","Noticeably smaller. Still soft, still there, just less of it. I miss the more.","I'd really grown into that size. The uniform was working for me.","That much gone. I was really starting to settle in at that weight.","I know it's a lot but I miss every pound of it. That was me at my best.","Even down here, all I can think about is getting back up there. That was perfect."],
  bookworm:["Underweight now per the literature. I've revised my dietary schedule. This is correctable.","Lower weight this week. I've noted it. I have a corrective plan.","Down a stage. The data is moving the wrong direction. Addressing it.","Lost some. My chair feels different. I've added to my meal log accordingly.","Dropped. I had good research momentum at that size. This disrupts the study.","Lost a significant amount. I was tracking good data at that weight. The trend reversal is unwelcome.","A whole stage down. I was just getting comfortable studying at that size. Reset.","Significant loss. I'd built my whole routine around that body. Recalibrating.","That's a lot of mass gone. I was most productive there. The correlation is documented.","Down from something I was genuinely invested in. My notes from that stage are extensive.","Even from here the absence is notable. I had built something at that scale. Getting it back."],
  influencer:["Okay so my comments section is going to be a mess about this. Already stress-eating.","Lost a bit. My audience is upset. I'm also upset. We're experiencing this together.","Down a size. My engagement is already dipping. The algorithm noticed before I did.","Dropped. My DMs are a lot right now. Half of them are upset on my behalf.","Lost a real amount. That was my whole look for like two months. Rebrand incoming.","Significant drop. My BBW audience is concerned. Valid. I'm concerned too.","A whole stage gone. My best content was from that era. Genuinely grieving it.","Lost a lot. I had such good momentum going. My brand was that body.","Down from something that was genuinely working for me. All my best metrics.","That era of content was my peak. Now it's archive. Going back up.","Even from here, less is just less. My audience knows what I should look like. Working on it."],
  athlete:["Lighter. My split times might actually improve but I don't want them to. This feels wrong.","Lost some. I was getting used to carrying that weight. It felt powerful.","Down a bit. My center of gravity is off again. This is annoying.","Dropped. I was finally adjusted to that size. Now I'm starting over.","Lost a real amount. I was powerful at that weight. Like, physically imposing.","Down a stage. The mass was mine. Took a while to build and now it's gone.","Noticeably lighter. I don't feel like myself at this size. My body had adapted.","Lost a lot. I'd found my equilibrium at that weight. It wasn't easy to get to.","Down from the biggest I've ever been. All that work.","That much gone. I was genuinely comfortable there for the first time.","Even here, lighter doesn't mean better. I was exactly where I needed to be."],
  artsy:["The angles are back and honestly I was done with angular. Not the direction I wanted.","Lost some. My work was processing these proportions. Back to the drawing board. Literally.","Down a bit. I was just starting to figure out this body artistically. Frustrating.","Lost a stage. The visual vocabulary I was building was specific to that size.","Dropped. I was the subject matter. The subject matter has changed.","Lost a real amount. I was building toward something with both the art and the body.","Significant loss. My gallery was going to be about abundance. Now it's about less.","That much gone. I was at my most interesting at that size. The work was good.","Down from something I was only beginning to understand aesthetically. It was mine.","That scale of presence was the whole point. Now it's retrospective.","Even from here the absence is felt. I wore that size well and it suited me."],
  gamer:["My setup feels enormous now. I should be the enormous thing. Ordering immediately.","Lost some. My viewers spotted it on stream before I did. They're not happy.","Down a bit. My whole aesthetic was 'too big for the setup.' That's currently untrue.","Dropped a size. The gaming chair has room in it. I hate that.","Lost a real amount. My 'permanently fused with the chair' energy is suspended.","Significant drop. I was the largest streamer in my category. Need to fix that.","A whole stage gone. My content was about being an immovable presence. I'm moveable. Ugh.","Lost a lot. My setup was perfect for that body. This body doesn't fill it right.","Down from something I'd worked up to for months. All that delivery.","That body was the whole brand. The chair and I had achieved something.","Even from here, all I think about is fixing this. The grind starts now."],
  sorority:["The chapter is being weird about it. Yes I've lost weight, I'm aware, thank you.","Down some. My sisters think this is good news. It's not good news to me.","Lost a bit. My event dresses from the smaller era might fit. I don't want them to fit.","Dropped. I was comfortable at that size. Very comfortable. This isn't that.","Lost a real amount. My custom pieces were sized for that body. Inconvenient.","Significant drop. I had settled in at that weight. Now everything feels off.","A whole stage gone. I'd really grown into my presence in the house.","Lost a lot. I was hosting everything from my favorite spot. Now I feel restless.","Down from something I was very comfortable being. The house felt right at that size.","That much lost. I was the house at that size. This version of me is smaller in every sense.","Even from here I know what I was and it was better. Getting back up there."],
  overachiever:["Underweight. Failing metric. Corrective meal plan active immediately. I don't fail metrics.","Down on the scale. Noted. Unacceptable. Course correction begins today.","Lost a stage. I had optimized everything around that weight. Regression logged.","Dropped. My productivity was peaking at the higher weight. The data supports this.","Lost a real amount. My thesis literally argued for maintaining that stage. Awkward.","Significant loss. I was achieving peak efficiency at that size. This is a setback.","A whole stage gone. My entire schedule was calibrated for that body.","Lost a lot. I had the most productive semester of my life at that weight.","Down from peak performance. I'm documenting everything and correcting immediately.","That was my best stage in every measurable category. The loss is fully documented.","Even from here, the variance is unacceptable. Getting back to target."],
  quiet:["...oh. Less. I didn't want less.","Lighter. Hm.","Lost some. I'd just gotten used to myself.","Down. I was good where I was.","I liked how I felt before. This is different.","Lost more than I wanted to.","Smaller. I don't prefer smaller.","I had gotten used to taking up that much space. This feels wrong.","I was that size for a while. It was mine.","Down from something I'd come to think of as permanent. Weird.","Even at this size, going back feels smaller in every way."],
  transfer:["Lighter than when I got here. That's not the direction I wanted.","Down some. I was just starting to feel settled here.","Lost a bit. The campus was starting to feel mine. This makes it feel newer.","Dropped. My friends here knew me at that size. This is different.","Lost a real amount. I was finding my rhythm. Now everything's slightly off.","Significant drop. I'd finally started to feel like a local here.","A whole stage gone. I was embedded in this place at that size.","Lost a lot. Home feels like this campus and this campus felt right at that weight.","Down from real comfort. I'd made this place mine. Now I feel newer again.","That much lost. I had become part of this place at that size.","Even from here it feels like going backwards. I know what I had here."],
  psych:["Weight deviation: downward. Noted. Variable shift requires recalibration.","Lower this week. My clothes fit differently. I've added a corrective note.","Down a stage. I had useful data from that size. Frustrating variable.","Lost some mass. My research was running smoothly there. Setback.","Dropped. My observations were sharpest at that weight. Correcting.","Lost a real amount. I had calibrated everything to that data point.","Significant loss. I'd gotten comfortable in that body. That was productive.","That much gone. My observations from that stage were among my best.","Down from a genuinely useful research position. Recalibrating immediately.","I had built a full observational framework around that size. Starting over.","Even from here, the absence is a variable I didn't choose. Getting back."],
  culinary:   Array.from({length:11},(_,i)=>`[placeholder: culinary drop reaction stage ${i}]`),
  eced:["She blinks. Looks at her hands. Then at the scale. 'Huh,' she says. She makes a note in her little notebook and goes back to the kitchen.","'Oh.' She tilts her head thoughtfully. 'That's interesting.' She writes something down. Keeps baking.","She looks mildly confused, like someone who got fewer cookies from a batch than expected. She shrugs. She'll adjust.","'I must have had a lighter week,' she says, not particularly concerned. She pats her belly gently. 'More testing, then.'","A slight frown — not distress, just calibration. She crosses something out in the notebook and writes something else. 'I'll compensate,' she says.","She looks at the number with the expression of someone whose banana bread didn't rise. A puzzle to solve. 'More butter,' she says quietly.","'Well.' She considers this. Sets down the bowl. Picks it back up. 'I suppose I've been eating lighter.' She doesn't sound like she intends to continue.","She logs it, crosses her arms across the warm shelf of her chest, and begins planning the week's meals with focused attention she usually reserves for tricky recipes.","Barely a reaction — a mild notation in the notebook, a slight adjustment to the week's plan. She'll have this sorted by Tuesday.","She doesn't move. Just breathes slowly and makes a small sound of consideration. Then: 'Bring me the recipe box.' She's got an idea.","Even from here, the idea of less feels abstract and wrong. She starts making a list of things to fix this immediately."],
  nursing:    Array.from({length:11},(_,i)=>`[placeholder: nursing drop reaction stage ${i}]`),
  farm_girl:  Array.from({length:11},(_,i)=>`[placeholder: farm_girl drop reaction stage ${i}]`),
};

export const PROFESSOR_RANKS = [
  { min:0,  label:"Substitute" },
  { min:1,  label:"Lecturer" },
  { min:3,  label:"Associate Professor" },
  { min:6,  label:"Professor" },
  { min:10, label:"Senior Professor" },
  { min:14, label:"Distinguished Professor" },
  { min:18, label:"Department Chair" },
  { min:22, label:"Dean of Excess" },
  { min:27, label:"The Architect" },
];


export const OUTFITS = {
  cheerleader:[
    "Squad jacket hangs off her angular shoulders. Uniform won't stay up. Extremely slight frame.",
    "Squad jacket, perfectly pressed. Uniform fits like a glove.",
    "Squad jacket looking a little snug. Uniform rides up slightly.",
    "Wearing her jacket open — won't button anymore. Leggings instead of the skirt.",
    "Retired the uniform. Oversized squad hoodie and yoga pants.",
    "Big comfy hoodie and wide-leg sweats. Still has pom poms somewhere.",
    "Stretch waistbands only. Soft, flowing things. Lots of them.",
    "Custom-ordered wide-fit loungewear. Very soft, very roomy.",
    "Essentially wearing a tent. Happily.",
    "Reinforced wide-fit everything. Fabric stretching impressively.",
    "Whatever fits. Custom made. Extensive.",
  ],
  bookworm:[
    "Cardigan hangs off angular shoulders. Jeans need a belt. Very slight under all the layers.",
    "Neat cardigan, slim jeans, sensible shoes.",
    "Cardigan straining at the buttons. Looser jeans today.",
    "Oversized cardigan open, leggings replacing jeans entirely.",
    "Big knit jumpers. Lots of layers. Hides things.",
    "Stretchy everything. Still carries the books though.",
    "Wide-fit linen trousers and a massive flowing top.",
    "Custom-ordered wide academic robes aesthetic. Dignified.",
    "Enormous cardigans. A soft, book-holding mountain.",
    "Bespoke wide-fit everything. Still has the glasses.",
    "Draped in fabric. Serene. Vast.",
  ],
  influencer:[
    "Ring-light-ready athleisure. Everything form-fitting. Collarbone very present.",
    "Trendy pieces, all curated for camera. Fitted and on-brand.",
    "Soft era transition in full effect. Flowy tops, stretch denim. The algorithm approves.",
    "Signed with plus-size agencies now. Wide-cut stylish pieces, very intentional.",
    "Content-shoot wardrobe updated. Custom ordered from brand partners. Camera-ready.",
    "Sponsored wardrobe from brands pursuing her metrics. All coordinated. All large.",
    "Custom pieces from her collab partners. Nothing off-rack. Looking incredible.",
    "Full production wardrobe managed by her team. Custom everything. Shot-ready.",
    "Styled in flowing brand-commissioned pieces. Arrives dressed for the content.",
    "Bespoke content wardrobe. Her team pre-fits everything before it reaches her.",
    "Her team styles her entirely. Custom-commissioned for every frame. It's a process.",
  ],
  athlete:[
    "Technical training gear, everything compression-fitted. Sharp and lean.",
    "Athletic wear, slightly snug across the lats. Still functional.",
    "Retired the competition kit. Athletic leisure only, stretching the seams.",
    "Wide-leg track pants, oversized team jersey. The athletic silhouette evolving.",
    "Stretch-everything. Compression gear repurposed for comfort, not performance.",
    "Custom athletic leisure. The performance fabric still holds. Barely.",
    "Wide-format athletic gear, custom ordered. Still looks the part somehow.",
    "Reinforced wide athletic pieces. Big seams. Big presence.",
    "Draped technical fabrics. Nothing fitted survives this stage.",
    "Bespoke athletic-adjacent wide garments. The coach's jersey, in a larger universe.",
    "Whatever can be constructed at this scale. Reinforced. Practical. Impressive.",
  ],
  artsy:[
    "Paint-stained linen, angular shoulders. Everything too large, intentionally or not.",
    "Floaty studio layers. Linen and silk. Relaxed, deliberate.",
    "Intentionally oversized — indistinguishable from an artistic choice. Both things true.",
    "Wide flowing layers, bold prints. The body becoming part of the aesthetic.",
    "Draped dramatically. People aren't sure if she's dressing or sculpting herself.",
    "Commissioned custom pieces. Wide silk things. Gallery-opening ready.",
    "Collaboration with a design student. Wearable art. Enormous canvas.",
    "Monumental fabric arrangements. Assisted dressing. Worth it.",
    "Flowing installation-adjacent garments. The boundary between artist and work: gone.",
    "Bespoke collaborative pieces. Custom-crafted by her artistic circle. Breathtaking.",
    "She is the artwork now. Fabric is a secondary consideration.",
  ],
  gamer:[
    "Vintage tees, slim jeans, cables everywhere. Angular at her setup.",
    "Oversized hoodie. Standard issue. Getting the preferred size.",
    "The big hoodie now fits as intended. Coincidentally very comfortable.",
    "The good sweatpants. Wide waistband. Non-negotiable.",
    "Gaming comfort set. Stretch waistband, oversized top. Optimised.",
    "Custom-ordered wide comfort set. Never leaves the apartment.",
    "Premium custom loungewear. Setup ergonomics now include clothing.",
    "Maximum comfort priority. Wide reinforced pieces. Everything within reach.",
    "Soft draped things. Delivery order includes clothing now.",
    "Custom-ordered setup-adjacent wide gear. Designed for seated permanence.",
    "Whatever arrives. She has a logistics system. It works.",
  ],
  sorority:[
    "Perfect little dress, perfectly pressed. Immaculate.",
    "Stylish and put-together. Everything fits well. Slightly tighter than last semester.",
    "Wider cuts becoming the preference. Still chic. Always chic.",
    "Custom formal order for the event. Stylish at any size. Effortlessly.",
    "Deliberately oversized designer pieces. Looks intentional. It is.",
    "Custom-ordered wide fashion pieces. She sets the dress code now.",
    "Designer oversize, custom-tailored. The house has a seamstress on retainer now.",
    "Wide formal garments, house-tailored. She receives fittings at home.",
    "Flowing custom pieces. Beautiful. Requiring considerable fabric.",
    "Bespoke formal wear, delivered. She approves the fittings from her seat.",
    "The seamstress comes to her. She accepts each piece graciously. It's a ritual.",
  ],
  overachiever:[
    "Structured blazer, slim trousers, everything pressed. Professional to a point.",
    "Classic professional attire. Slightly snug across the shoulders. Still pristine.",
    "Blazers open now. Stretch professional fabrics. Documented in the spreadsheet.",
    "Wide-cut professional pieces, still sharply pressed. The silhouette has data.",
    "Custom professional wardrobe. Stretch-fabric power suits. Optimised.",
    "Wide-format business wear, custom-ordered. Remote calls require only top half, noted.",
    "Top half: professional. Bottom half: wide comfortable stretch. Efficient.",
    "Wide professional gear, reinforced structure. She's logged the measurements.",
    "Flowing professional layers. The business aesthetic adapted to the new reality.",
    "Bespoke wide professional garments. Tailored, documented, filed.",
    "Custom everything. The measurements are part of her personal data set.",
  ],
  quiet:[
    "Oversized sweater, genuinely too big. Disappearing into the fabric.",
    "Comfortable layers, loose fit. Starting to fill them out.",
    "The layers fit properly now. Something has settled.",
    "Soft, wide fabrics. Nothing restrictive. Feels right.",
    "Wide pieces, all soft. Taking up more space than intended. Accepting it.",
    "Custom soft garments. Nothing constricting. Everything breathes.",
    "Flowing soft layers. The fabric accommodates everything, gently.",
    "Wide custom soft garments. Assisted when needed. Quiet about it.",
    "Layers of soft, flowing fabric. Comfortable beyond description.",
    "Bespoke soft wide pieces. Her people know what she needs. No words required.",
    "Soft fabric, wide and warm. That's the whole brief. It gets done.",
  ],
  transfer:[
    "Clothes from home. Slightly wrong for this campus, slightly loose on her frame.",
    "Found local favourites. Fitting in — the clothes, the campus, herself.",
    "Campus-style wide pieces. She's figured out what works here.",
    "Local plus-size boutique. She's a regular now.",
    "Custom pieces, growing to fit campus life in every sense.",
    "Custom-ordered, comfortable, very here. This is home now.",
    "Custom wide practical pieces. Off-campus delivery. Zero regrets.",
    "Wide-format practical wardrobe. Custom ordered. Settled.",
    "Draped practical wide garments. She knows her measurements by heart.",
    "Bespoke wide garments, practical and warm. This place made her, and the clothes show it.",
    "Whatever can be made at her size. She knows the measurements. The delivery schedule. All of it.",
  ],
  psych:[
    "Pencil skirt, blouse slightly too large. Severe, professional. Notebook always visible.",
    "Fitted blazer, slim trousers. Clinical and deliberate. Notebook always out.",
    "Blazer no longer buttons over the midsection. She hasn't replaced it. Notebooks stacked instead of carried.",
    "Stretch-blend professional trousers. Blouses untucked. Still the notebook. Always the notebook.",
    "Wide-cut academic wear. Soft structured blazer, loose trousers. The professional silhouette softening.",
    "Custom stretch-fabric professional sets. Lab coat over everything — it hides things, which she notes as a variable.",
    "Wide professional layers. Lab coats in larger sizes. Everything functional and roomy.",
    "Reinforced stretch professional wear. The blazers are custom now. She has a made-to-measure account.",
    "Wide academic layers. Flowing tops, structured wide trousers. She dresses like someone optimised for sitting.",
    "Custom-ordered wide garments, professionally cut. Everything delivered. Measurement evolution logged separately.",
    "Whatever can be professionally made at her scale. She has specifications. They are met exactly.",
  ],
  culinary:  Array.from({length:11},(_,i)=>`[placeholder: culinary outfit stage ${i}]`),
  eced:[
    "Light jeans and a fitted tee, an apron folded over one arm. She looks put-together and practical.",
    "A soft cardigan over a simple blouse, comfortable trousers. The cardigan has a small flour ghost on the left elbow.",
    "Her classic look: a wide apron over a loose button-up and comfortable pants, the natural warmth of someone who smells like cinnamon all day.",
    "A flowy tunic over stretchy leggings, her apron cinched at the back. The tunic is practical and she hasn't noticed it's a size larger than last month.",
    "Loose linen trousers and a soft wide-collar top worn untucked, her apron tied at the sides. Practical and warm.",
    "A wide knit top over soft stretch pants, the kind of combination that announces 'I have given this thoughtful consideration.' Her apron covers the middle completely.",
    "A soft jersey dress with a wide waist and loose sleeves — she found a brand that fits her properly and she owns it in three colors. Her belly rounds comfortably beneath it.",
    "Wide-leg soft trousers and a large knit pullover that she's stopped tucking in. Her apron is industrial-sized now and still doesn't quite cover everything.",
    "A roomy housedress in a cheerful print chosen specifically for the kitchen — loose enough to reach things, tough enough to survive the splatter. Her belly fills it with warm authority.",
    "An enormous soft tunic and her best wide-leg pants, the kind of outfit that makes movement feel deliberate and comfortable.",
    "The apron over everything — at this point more symbolic than functional, but she ties it on every morning. Beneath it: soft layers of warm yielding fabric, sized for her current reality.",
  ],
  nursing:   Array.from({length:11},(_,i)=>`[placeholder: nursing outfit stage ${i}]`),
  farm_girl: Array.from({length:11},(_,i)=>`[placeholder: farm_girl outfit stage ${i}]`),
  default:[
    "Clothes hang off her angular frame. Everything too large, nothing fits properly.",
    "Whatever she usually wears. Fits fine.",
    "Clothes are a little snug. She hasn't updated her size yet.",
    "Wearing bigger sizes. Waistbands replaced with elastics.",
    "Stretchy fabrics only. Looks comfortable, at least.",
    "Wide-fit everything. Normal clothes no longer an option.",
    "Custom ordered. Nothing off the rack fits.",
    "Specially made wide garments. Impressive engineering.",
    "Draped fabric. Little else will do.",
    "Bespoke reinforced everything.",
    "Whatever can be made for her. A project.",
  ],
};

export const SLIGHT_DIARY = {
  cheerleader:"Practice today. Uniform is falling off me — had to pin it twice. Coach asked if everything was okay. I said yes. I don't know if that's true.",
  bookworm:"Subsisting on coffee and determination. Weighed myself today. The number is… lower than expected. Noted. Adding a dietary appendix to my research schedule.",
  influencer:"Woke up and my collarbone was very visible in the ring light. Posted it anyway. Comments were unexpected. Mostly worried. I'm going to the dining hall.",
  athlete:"Split times are actually good right now. But I look in the mirror and I barely recognize myself. Coach says I look 'lean.' The word feels wrong.",
  artsy:"Everything feels angular. My brushstrokes are too. There's an interesting aesthetic to the fragility but I don't want to romanticize it. Eating something.",
  gamer:"Fourteen-hour session. Forgot to eat again. My stream chat noticed before I did. They sent me a delivery. I ate all of it.",
  sorority:"Dress fitting for the social. The seamstress asked if I'd 'lost some.' I nodded. She didn't say anything else. I stopped at the bakery on the way home.",
  overachiever:"BMI: 17.1. That's the clinical threshold. I've added a meal schedule to my planner. Optimizing upward. This is correctable.",
  quiet:"—",
  transfer:"I've been here two months and I weigh less than when I left home. The dining hall is good. I've been forgetting to go. I should fix that.",
  psych:"Arrived underweight — notable. Starting observations immediately. Fifteen subjects in view. I have six notebooks. I'll need more.",
  culinary:"[placeholder: culinary slight diary entry]",
  eced:"First week in the practicum classroom. Brought snickerdoodles for an icebreaker. Kayla had three. Mrs. Calloway was watching from the window at pickup. I waved. She didn't wave back. Need to bring something with less visible sugar next time.",
  nursing:"[placeholder: nursing slight diary entry]",
  farm_girl:"[placeholder: farm_girl slight diary entry]",
};

export const DIARY_ENTRIES = {
  cheerleader:{
    0:"Practice was good today. We're really nailing the new routine. Eating pretty clean, feeling strong.",
    1:"Ugh, my uniform is being weird. Probably just washed it wrong. Had pizza tonight, oh well. It was really good actually.",
    2:"Okay I've officially had to let out my uniform twice. Coach noticed. I told her it shrunk. She didn't look convinced. Also I went to that new Italian place four times this week and I regret nothing.",
    3:"I'm off the squad. It's fine. It's FINE. I went home and ate an entire lasagne and actually felt kind of great about my life? This is a new feeling.",
    4:"I've been eating so much lately and I genuinely feel amazing. Like physically amazing. Soft and warm and full all the time. I think this might just be who I am now.",
    5:"My thighs are enormous. Like, ENORMOUS. I saw my reflection getting into the shower and just stood there for a minute. Then I went and ordered brunch.",
    6:"Can't fit in my old car anymore. Had to get a wider one. The look on the salesperson's face was something else. I tipped them well.",
    7:"People stare when I go out. I've decided it's because I'm impressive, which I am.",
    8:"I mostly stay in now. People bring things to me. This is good actually.",
    9:"I don't write much anymore. I just exist. It's very peaceful. Someone brings food. I eat it. The sun comes through the window. Good.",
  },
  bookworm:{
    0:"Thesis chapter three is nearly done. Subsisting on granola bars and determination.",
    1:"Found a really interesting paper on cultural foodways. Also found that the vending machine has new stock. Thorough investigation conducted.",
    2:"My chair in the library broke today. Just… snapped. I pretended it had always been broken and moved to a bigger one. No one said anything.",
    3:"Wrote 4,000 words today. Ate approximately as many calories. I think these two things are related and both are fine.",
    4:"My advisor asked if I was 'taking care of myself.' I showed her my food diary. She meant something else but the food diary is very detailed and impressive.",
    5:"I've started getting grocery deliveries. Easier. More efficient. I can order in bulk. I have a LOT of bulk now.",
    6:"Working from home full time. No commute means more time for both studying and eating. Win-win.",
    7:"Ordered a new desk chair online. The one rated for 500lbs. It arrived and it fits perfectly. I sat in it for six hours eating and reading. Perfect day.",
    8:"I have published two papers this semester and gained approximately one hundred and fifty pounds. Both of these facts fill me with equal satisfaction.",
    9:"I am enormous and brilliant. The universe contains me now.",
  },
  influencer:{
    0:"Posted my morning routine. Got 50k likes. Going to the gym. Life is good.",
    1:"Posted a 'day in my life' and included the dinner I had which was very large and my followers LOVED it. Interesting.",
    2:"Going viral for my 'soft era' content. My manager is confused but the numbers are UP. Also my jeans don't fit.",
    3:"Signed with a new agency that specifically handles 'plus size' creators. They are VERY enthusiastic about my 'trajectory.' Their word.",
    4:"I weighed myself for content and posted it unedited. It got 2 million views. My DMs are unhinged (positively). I had cake to celebrate.",
    5:"I'm huge. I know I'm huge. My audience thinks this is the hottest thing they've ever seen. Who am I to argue with 800,000 followers.",
    6:"Book deal signed. Working title: 'More.' Very on brand.",
    7:"I have a full production team now. They come to me. Good. I'm too big to go to them.",
    8:"The documentary people called. They want to follow my 'journey.' I said yes if they cater. They said yes.",
    9:"I am a movement. I am also not moving, mostly. Both things true.",
  },
  athlete:{
    0:"Track practice. 5am run. 8 miles. Feeling strong. Eating clean. This is the year.",
    1:"Times are slipping slightly. Coach says I look 'different.' I've been eating a lot of pasta. It's for energy. That's what pasta is for.",
    2:"Off the team. I sat in my car for a while and then drove to the Italian place near campus and ate my feelings and they were delicious.",
    3:"I used to be able to do twenty pull-ups. I did one today. It was a struggle. I ate a burger immediately after to recover.",
    4:"Ran into my old training partner at the gym. She stared. I waved. I haven't been on the equipment, I was there for the protein shake bar.",
    5:"I don't go to the gym anymore. My body IS the gym. Specifically the weights section.",
    6:"My old coach texted me. 'Are you okay?' I texted back a photo of my lunch. She hasn't replied.",
    7:"Very hard to move much. The body that used to run eight miles now mostly watches running on TV. I think I prefer this honestly.",
    8:"I am so heavy. If someone timed me walking to the fridge and back, it would be my slowest split ever. Still counts as a run.",
    9:"My old records still stand at the university. My current records are for something else entirely.",
  },
  artsy:{
    0:"Working on a new series about fragility. Paint everywhere. Eating crackers from the studio.",
    1:"The new series has pivoted to abundance. Don't know why. Painting a lot of full bowls and ripe fruit. Very juicy subject matter.",
    2:"My work is getting lush. Richer. My figure is too, honestly. I like how my arms look in the studio light.",
    3:"A critic called my new work 'carnally excessive.' I'm choosing to take this as a compliment. Had a very large dinner to celebrate.",
    4:"My work is about the body now. My body specifically. It's changed enough that it's genuinely interesting as a subject.",
    5:"Opening night. I wore a draped silk thing. It didn't exactly 'fit' in the traditional sense. I looked extraordinary.",
    6:"Too big to transport my own canvases. My assistant does it. I direct. This is just how sculpture and architecture have always worked.",
    7:"I am the muse and the artist. The subject and the creator. I am also very large and the studio got a wider door installed.",
    8:"I make things now from where I sit. Everything comes to me. Even the gallery comes to me. I have enough weight to make that happen literally and figuratively.",
    9:"Art is a body in space. My body takes up a lot of space. I win art.",
  },
  gamer:{
    0:"Went 28-0 last night. Fuelled by energy drinks and determination.",
    1:"New sponsor sent me snacks. I have to review them on stream. In-depth research is required. Done six bags tonight.",
    2:"My stream has more viewers when I eat on camera. I don't understand this but I accept it and lean in.",
    3:"Broke my chair. The good one. Got a new one rated for higher. The new one is EXTREMELY comfortable. I sit in it 16 hours a day.",
    4:"My viewers voted me their 'comfort streamer.' I think this is related to both my personality and my physical presence at this point.",
    5:"Can't really move around the desk much anymore. Everything is within arm's reach now. This is optimal setup actually.",
    6:"New apartment. Wider doorways. Bigger fridge closer to the setup. Chef's kiss.",
    7:"I don't really stand up anymore. Everything comes to me. Including meals. Especially meals.",
    8:"Record-setting stream hours this month. Also record-setting everything else. Both are achievements.",
    9:"I am one with the setup. The setup has evolved around me. We are merged.",
  },
  sorority:{
    0:"Sisterhood retreat this weekend. Salads, facemasks, bonding. Perfect.",
    1:"Brunch four times this week. The new spot does these incredible pastry things. The calories don't count on weekends and also on weekdays.",
    2:"My sisters are being weird about my eating. I handled it by suggesting we get dinner. We got dinner. Nobody brought up the eating again.",
    3:"Custom dress order for formal. The seamstress was lovely about it. I've been lovely to myself about it too. Dessert tonight.",
    4:"I am the most popular girl in the house. I think this is related to the fact that I always have snacks and always say yes to dinner.",
    5:"I've become the house's unofficial social chair because I plan the best events and the best events involve the most food. Everyone loves me.",
    6:"Hosting chapter from home now. The girls come to me. I provide snacks. This arrangement suits everyone.",
    7:"I have everything delivered. Food, clothes (custom), anything I need. Being big and popular has its logistics.",
    8:"I have essentially become a fixture. The sorority house is partly mine, spiritually, and I take up more of it every month.",
    9:"I am the house now. The house is me. There's a plaque.",
  },
  overachiever:{
    0:"5am: gym. 7am: class. 9am: internship. 12pm: studying. 3pm: meeting. 6pm: club. 9pm: homework. Optimised.",
    1:"Added 'nutritional research' to my schedule. This involves eating things and documenting them. It is very rigorous.",
    2:"Dropped one extracurricular. Added two meals. The net outcome on my happiness was positive. I've graphed it.",
    3:"Thesis revised. New title: 'Adaptive Caloric Strategy as a Form of Self-Optimisation.' My advisor approved it. I ate a celebratory dinner.",
    4:"I have achieved more this semester than most people do in a year, while also gaining more weight than most people do in a year. Efficient.",
    5:"My body is a data set. A very large data set. I have published a paper about it. It was peer reviewed. It passed.",
    6:"Working entirely remotely now. This removes 45 minutes of commuting per day. I have repurposed this time for eating. More efficient.",
    7:"I set a personal record this week. Several, actually. Academic ones and personal ones. All time-stamped.",
    8:"I have a PhD, three papers, and I weigh more than my entire research committee combined. Peak performance.",
    9:"I have achieved everything. I am enormous. These two facts are connected. I wrote the paper.",
  },
  quiet:{
    0:"—",
    1:"The food here is really good. I've been eating more than usual. The professor left out snacks today. I took several.",
    2:"I bought new jeans. Two sizes up. I tried them on and something felt… right, actually. I don't know. I ate a pastry.",
    3:"Someone said I looked different today. Not meanly. Just like — noticing. I didn't know what to say so I ate my lunch.",
    4:"I caught my reflection today. I'm big now. Actually big. I stood there for a while. Then I went and got seconds.",
    5:"I think I might love this. Is that weird? I feel very present in my body for the first time. Also very heavy.",
    6:"I don't hide anymore. I take up space. It's okay. I take up a lot of space. That's okay too.",
    7:"People know my name now. I fill the room. Both of these things happened at the same time. I think they're the same thing.",
    8:"Still quiet. But content. Vast. Soft. Absolutely fine.",
    9:"—",
  },
  transfer:{
    0:"Campus is so big. Still finding my way around. The dining hall is really good though.",
    1:"I've found all the good food spots. There are many. I've been to all of them multiple times.",
    2:"Hometown friend visited and didn't say anything about how I look until she was leaving. Then she said 'you seem happy.' I am.",
    3:"This place has fed me in every sense. I feel more myself here than I ever did at home. Heavier, too. By quite a bit.",
    4:"Mom called. Said I sounded different. I said I felt different. She asked if I was eating okay. I said yes. Very yes.",
    5:"I am a local now. The dining staff know me. The good spots know my order. I know every food event on campus.",
    6:"This campus made me who I am. It also made me very large. I am grateful for both.",
    7:"I never want to leave. I don't think I could, physically. Good. This is home.",
    8:"Some students use me as a campus landmark. I gave someone directions the other day. 'Turn left at me.' It worked.",
    9:"I am part of the campus now. Permanent. Unmovable. Well-fed.",
  },
  culinary:   Object.fromEntries(Array.from({length:10},(_,i)=>[i,`[placeholder: culinary diary entry ${i}]`])),
  eced:{
    0:"Baked brownies for the class. All three girls ate past their lunch portions and still went back for more. Sofia has this way of eating — comfortable and unbothered — like she was born knowing this was fine. Kayla tried to be polite about it but she had four. I told them I was doing a baking practicum. That's technically true.",
    1:"Kayla's been different lately. She arrives early now — right as I'm cutting things. Her jeans have started to gap at the waist. She doesn't seem to mind. Mrs. Reyes texted the school to ask about the food I've been bringing. I wrote back that it was part of the curriculum. The school said that was fine. Technically true.",
    2:"Mrs. Calloway stopped me after pickup. She asked about my 'enrichment activities.' I told her I was doing research on nutritional impact on focus and mood. She looked at me for a long time. Then she looked at her own hips in the window reflection. Then she took the container of banana bread I was carrying to the car and said 'fine.' She ate two pieces in the parking lot. I watched from my car. I feel very understood.",
    3:"Sofia barely fits in her desk. The school sent a note asking if we'd like to upgrade to the wider writing desks in the science room. I said yes immediately. Sofia moved like she owned the new chair, spreading wide into it. Bri has this soft belly now that rests on her thighs. Kayla asked me for the banana bread recipe. I gave her a version missing two ingredients. I feel a little bad about this. A little.",
    4:"Mrs. Reyes brought me coffee at pickup. She's started lingering. Her midsection has gotten noticeably softer — I can tell by the way she tugs at her jacket. Mrs. Calloway is suspicious but her suspicion is mostly aimed at her own reflection. She told her daughter she was 'watching her figure.' Kayla rolled her eyes and came and sat with me after class. 'Can you bring the ones with chocolate tomorrow?' she said. I said yes.",
    5:"Mrs. Monroe is my favorite. She showed up to pickup in a floral wrap dress that was a size larger than last month, laughing about something on her phone. She saw the treats and took four openly, without a single comment about her diet. 'Your banana bread is the best banana bread I have ever had.' I am so happy. I am doing something very wrong and I am so happy.",
    6:"School administration asked if I wanted to formalize the baking component as a weekly enrichment event. I said yes. Now it's official. Mrs. Calloway is on the event committee. She takes her role very seriously and has given me detailed feedback on the presentations while eating everything I put in front of her. Bri can't tuck her uniform anymore. I told her it looked nice. She believed me. It did.",
    7:"The moms have a group chat about my baking. I found out because Mrs. Monroe told me, laughing. 'We rate your recipes every week,' she said. 'The cinnamon rolls are tied with the peach upside-down cake.' I asked which was winning. 'Depends on the week,' she said. She's gotten wonderfully round. Everything about her is generous and she doesn't apologize for any of it.",
    8:"Mrs. Calloway brought me preserves. Homemade, labeled in her handwriting. She stood there while I opened them and said 'the girls really look forward to Tuesdays.' I said I was glad. She said 'so do the moms, if I'm being honest.' She left before I could say anything. I made strawberry jam muffins the next Tuesday. She had three. I think we've reached an understanding.",
    9:"I baked everything this week for the end-of-term celebration. All six of them in one room — Kayla with her wide hips filling her chair, Bri's belly resting soft and heavy on her thighs, Sofia enormous and completely comfortable. Mrs. Calloway in her good cardigan that pulls across the shoulders now. Mrs. Reyes who's stopped tugging at her jacket entirely. Mrs. Monroe who laughed the whole time and had everything. Six of them, all there because of Tuesday mornings and banana bread and me. I don't regret a single bite.",
  },
  nursing:    Object.fromEntries(Array.from({length:10},(_,i)=>[i,`[placeholder: nursing diary entry ${i}]`])),
  farm_girl:  Object.fromEntries(Array.from({length:10},(_,i)=>[i,`[placeholder: farm_girl diary entry ${i}]`])),
  psych:{
    0:"New observation log started. Fifteen subjects, daily contact. The data will be good. I can already tell.",
    1:"Added nutritional timing to my research schedule. Partly professional curiosity. Partly the vending machine was right there.",
    2:"My clothes feel different. I noted it in column seven. I'm not sure it belongs there but it's data.",
    3:"I've started cross-referencing my own intake with my mood data. The correlation is not subtle.",
    4:"My advisor asked if I was okay. I said I was conducting ongoing research. Both things are true.",
    5:"I've noticed my observations have gotten more accurate at this weight. I think I understand what I'm studying now.",
    6:"The notebook is fuller than I expected. So am I, honestly.",
    7:"I used to be the observer. The line between observer and subject is more permeable than I theorized.",
    8:"Working from my office mostly. The data comes to me. So does everything else.",
    9:"I am the study and the researcher. The ethics board would have questions. I'm choosing not to submit.",
  },
};

export const RANDOM_EVENTS = [
  { id:"dining_special",   target:"class",  gain:[4,9],
    text:()=>`The dining hall announces a bottomless brunch that, through a combination of slow kitchen turns and no posted end time, runs until dinner. The class does not leave. They settle in. By 7 pm the booths have been rearranged twice and the serving staff has given up trying to close the section. The students return changed: slower, warmer, considerably more substantial.` },
  { id:"stress_week",      target:"single", gain:[3,7],
    text:(s)=>`${s.name} has a major paper due Thursday. The pattern is well-established by now: stress arrives, appetite follows. She doesn't track it. She just eats — through the outline, through the rough draft, through the citations. When the paper is submitted she surveys the empty fridge and three takeout containers and decides this is a reasonable trade. She seems fine.` },
  { id:"chair_incident",   target:"single", gain:[0,0], scrutinyHit:3,
    text:(s)=>`During your Tuesday lecture, ${s.name}'s chair releases a sharp, definitive crack and gives way. She lands without dignity. She remains on the floor for a moment, assessing the situation, then rises with absolute composure and takes a different seat. She meets no one's eyes. You notice that every student in the row quietly shifts their weight. The moment is not discussed. It absolutely happened.` },
  { id:"food_delivery",    target:"single", gain:[4,8],
    text:(s)=>`Three competing delivery apps are all running aggressive new-user deals. ${s.name} has three accounts. The evening becomes a logistics problem of a very specific kind. At one point two drivers arrive simultaneously. She manages the handoff with the efficiency of someone who has been waiting for this exact convergence. Nothing goes unfinished.` },
  { id:"pizza_deal",       target:"class",  gain:[4,9],
    text:()=>`Someone in the group chat finds a pizza deal: buy two, get two. The math is straightforward. The scale is not. Twenty-two pizzas arrive at a dorm common room. No one intended this outcome. Everyone participates. The room smells of cheese until Wednesday. No slice survives the night.` },
  { id:"admin_memo",       target:"class",  gain:[0,0], scrutinyHit:5,
    text:()=>`A memo from the Dean of Students arrives this week. The subject line reads: "Regarding Wellness Observations in Certain Courses." The building is named. Specific floor is named. Your room number is not named but the description is not ambiguous. The class is not mentioned by name. Everything else is mentioned. You read it three times. Nothing actionable is stated. The feeling it creates is very actionable.` },
  { id:"food_festival",    target:"class",  gain:[5,11],
    text:()=>`There's a food festival in the park this weekend. The class decides to go together. They return Sunday evening transformed: quieter, heavier, radiating the specific satisfaction of a weekend spent doing exactly one thing very well. Several students report they "lost track" of their intake. No one sounds sorry. The van home is completely silent.` },
  { id:"care_package",     target:"single", gain:[4,8],
    text:(s)=>`A package arrives from ${s.name}'s family. It is enormous. It is almost entirely food — the kind of care that arrives in bulk, in containers marked with masking tape and her childhood nickname. She calls home to say thank you. She does not mention that the pantry is already half depleted. She does not mention a lot of things. She sounds happy.` },
  { id:"birthday",         target:"single", gain:[6,12],
    text:(s)=>`It is ${s.name}'s birthday. Someone tells the class. Someone else orders a cake. Then someone else orders a different cake because they couldn't decide. Then someone who didn't know there were already cakes shows up with a third. ${s.name} eats with the abandon of someone who has been given permission to take up exactly as much space as she wants, for one day, and has decided to take it seriously.` },
  { id:"class_cancelled",  target:"class",  gain:[3,7],
    text:()=>`A scheduling conflict cancels your Tuesday session. The class, without an obligation and with a collective appetite, materializes at a nearby brunch spot. Brunch runs long. Long becomes lunch. Lunch becomes a decision to order one more thing. By the time anyone thinks to leave, the restaurant is setting up for dinner. They stay for that too.` },
  { id:"faculty_overheard",target:"single", gain:[2,5], scrutinyHit:1,
    text:(s)=>`You overhear two faculty members in the hallway. One is asking about enrollment in your section. "Interesting group of students," the other says. "Particularly this semester." A pause. "You've noticed too." They don't say more. ${s.name} is passing in the corridor behind you. She is wearing a coat that didn't button last year. She does not notice the conversation. You do.` },
  { id:"bake_sale",        target:"class",  gain:[2,6],
    text:()=>`The junior class is running a bake sale for a field trip fund. Your students buy out the first round by ten am. Several make return trips when new trays come out. The junior running the table posts about it: "Record day. Bought by the same class, all six times." The post gets sixteen shares before she takes it down. The fundraising goal is exceeded.` },
  { id:"netflix_binge",    target:"single", gain:[3,7],
    text:(s)=>`${s.name} finds a show Friday night. It is an eight-season show. She does not know this at the time. She is eating when she starts it — something small, casual, not a meal really. By Sunday morning the snacking has become ambient, the meals have merged, and the bags and containers tell a story she couldn't narrate in real time. She finishes the season. She opens another.` },
  { id:"rainy_weekend",    target:"class",  gain:[3,7],
    text:()=>`It rains for four days without stopping. No one goes anywhere. Delivery apps log their busiest weekend of the semester. The class is horizontal, fed, and largely stationary from Friday to Monday — a long comfortable exhale of a weekend that leaves everyone softer, fuller, and faintly reluctant to explain where the time went.` },
  { id:"cooking_experiment",target:"single", gain:[3,6],
    text:(s)=>`${s.name} announces she's learning to cook and invites a handful of classmates to "taste test." The tasting runs six hours. She produces five dishes. Everything is made in quantities that suggest she calibrated her portion sense against an entirely different standard. The classmates eat steadily for the duration. They leave late. They leave round. They text her about it the next morning.` },
];

export const INFLUENCE_PAIRS = [
  [0,10],[1,11],[4,12],[3,13],[6,14]
];

export const NARRATIVE_EVENTS = [
  { id:"uniform_split", stageMin:3, archetype:"cheerleader", title:"Uniform Incident",
    text:(s)=>{
      if(s.role==="Cheer Captain"){
        const pool=[
          `During tryouts — tryouts ${s.name} is running as captain — her cheer uniform splits along the seam with an audible pop. The entire squad freezes. ${s.name} looks down at herself, at the soft belly now escaping the fabric, and very deliberately straightens up. "Take five," she tells the squad. She finds you afterward. "I'm going to need a new uniform. Four sizes up. I'm still captain. Don't give me a look."`,
          `${s.name}'s captain sash won't close over her middle anymore. She's been ignoring this for weeks, but today, in front of the whole squad for the routine review, it gives up entirely. A seam splits at the shoulder. The gym goes quiet. ${s.name} looks around at twenty-two juniors watching their captain, tilts her chin up, and says: "Dismissed for today." She finds you after. "Please tell no one. Also do you know a seamstress. Also I had three dinners last week and it was worth it."`,
          `Her squad jacket hasn't closed in a month. Today the uniform top finally splits at the back mid-demonstration, in front of the school, in full view of the stands. ${s.name} keeps the movement going for two more counts, then stops. She walks off the floor with the quiet dignity of someone who is not ready to have this conversation yet. She texts you that night: "New uniforms. Bigger. I'm still running tryouts. Don't say anything to the athletic director. I will handle it."`,
        ];
        return pool[s.id % pool.length];
      }
      // Dance Co-Captain (Jasmine)
      const pool=[
        `Mid-routine — a difficult lift section ${s.name} choreographed herself — her dance costume splits at the hip with a sharp crack. The music keeps playing. ${s.name} lands the count, finishes the eight, and then walks calmly off to the wings. She finds you in the corridor afterward, still in the damaged costume, eating a granola bar. "So. New costume. I've already emailed the seamstress. Four sizes up probably." She thinks. "Make it five."`,
        `The recital costumes arrived this week and none of them fit. ${s.name} holds one up against herself in the studio, looks in the mirror, and laughs. "I designed these," she says. "I designed them to fit me." She turns to the full-length mirror. "I am no longer that person." She calls the costume shop. She tells you afterward: "The new ones will be better. I've had some ideas. My body is different now. The choreography will adapt."`,
        `It happens during the showcase — exactly the wrong moment, exactly the right uniform to fail. ${s.name}'s costume splits at the seam during her own solo. She pauses, adjusts, and finishes the piece. The audience thinks it's intentional. She texts you: "I hate that it happened and also I've never moved better in my life. Ordering new costumes. Going to dinner. These two facts are connected."`,
      ];
      return pool[s.id % pool.length];
    },
    gain:[4,8], rel:12 },
  { id:"chair_breaks", stageMin:4, archetype:null, title:"The Chair Incident",
    text:(s)=>{
      const pool=[
        `A classroom chair gives way under ${s.name} with a loud crack. She goes bright red. You slide a sturdier chair over without a word. After class she hangs back. "Thank you for… not making it weird." She glances down at herself, pats her belly almost fondly. "I've gotten kind of big, haven't I." It doesn't come out like a problem.`,
        `The chair under ${s.name} lets out a sharp crack and lists sideways. ${s.name} grabs the desk with both hands. For a moment the room is very quiet. You produce a reinforced chair from the back as if this were planned. She sits in it, cheeks pink, then after class catches you at the door. "That was smooth of you," she says. "Very diplomatic." She's smiling. "I should probably stop being surprised when furniture can't handle me."`,
        `It happens during a quiet part of lecture — a groan of plastic and then ${s.name} is suddenly much lower than she was. She lets out a short laugh before she can stop herself. You wave off the moment and keep talking, and she settles into your sturdier desk chair. Afterwards: "I actually feel better about it than I expected to," she admits, pressing a hand to her soft middle. "I mean. Look at me. I've gotten enormous. I think I knew the chairs were on borrowed time."`,
        `${s.name}'s chair goes with a crack that makes everyone look up. Her face is unreadable for a long beat — then she sighs the sigh of someone who saw this coming. You hand her the solid chair from behind your desk. "I ordered three of these," you tell her quietly. "For high achievers." She snorts. "Sure you did." But she sits down and, after a moment, she's smiling. After class: "I've gained like ${s.lbs-s.startLbs} pounds this semester. I should have seen that coming." She pats her belly. "Anyway."`,
      ];
      return pool[s.id % pool.length];
    },
    gain:[3,5], rel:18 },
  { id:"viral_post", stageMin:4, archetype:"influencer", title:"Going Viral",
    text:(s)=>`${s.name} posts a video attempting to fit into her old jeans. It goes viral overnight. Two million views in twelve hours. Comments are overwhelmingly enthusiastic. She shows you in class, glowing. "Two. Million." She tilts the phone to show you the view count. Her old jeans are somewhere around her thighs in the thumbnail. "I think this is my era," she says.`,
    gain:[5,9], rel:20 },
  { id:"thesis_rewrite", stageMin:3, archetype:"bookworm", title:"Academic Pivot",
    text:(s)=>`${s.name} submits a revised thesis outline. New title: 'Adaptive Caloric Strategy and Cognitive Performance: An Ethnographic Self-Study.' The abstract is rigorous. It is also clearly an elaborate academic justification for eating constantly. You approve it immediately. She beams with the energy of someone who has made weight gain count toward her GPA.`,
    gain:[3,6], rel:15 },
  { id:"gaming_sponsor", stageMin:5, archetype:"gamer", title:"Snack Sponsorship",
    text:(s)=>`${s.name} has a snack sponsorship deal. She tells you with enormous satisfaction, adjusting herself in her chair. "They send boxes. Every week. Full boxes." She pauses. "I've been doing a lot of product testing." You look at her — noticeably bigger — and nod. "Thorough research," you say. She grins. "The most thorough."`,
    gain:[5,10], rel:18 },
  { id:"intervention_fails", stageMin:4, archetype:"sorority", title:"The Intervention That Wasn't",
    text:(s)=>`${s.name}'s sisters stage an 'intervention' about her eating. It devolves into a two-hour dinner when ${s.name} orders for the table. By dessert everyone has forgotten the intervention. ${s.name} has eaten more than anyone. She tells you the next day, delighted. "I think I accidentally converted three of them."`,
    gain:[5,8], rel:22 },
  { id:"art_exhibition", stageMin:5, archetype:"artsy", title:"The Body Exhibition",
    text:(s)=>`${s.name}'s senior show opens and every piece is a meditation on abundance — overflowing bowls, voluptuous figures, textures of excess. Critics write 'opulent' and 'unapologetically sensual.' ${s.name} stands at the opening in a flowing dress that shows every curve, eating cheese from the reception table. "The artist," she says, gesturing at herself, "is also the subject matter."`,
    gain:[4,7], rel:20 },
  { id:"team_weigh_in", stageMin:3, archetype:"athlete", title:"The Weigh-In",
    text:(s)=>`${s.name} has been avoiding the athletics department scale for weeks. Today she can't. She tells you flatly: "Thirty-five pounds over their limit." Beat. "They were very professional about it." Another beat. "I ate an entire pizza on the way home and I feel fine, actually." She does look fine — soft and full-cheeked and more relaxed than you've ever seen her.`,
    gain:[4,7], rel:15 },
  { id:"quiet_opens_up", stageMin:4, archetype:"quiet", title:"She Opens Up",
    text:(s)=>`After class, ${s.name} catches you packing up. She's looking at her own rounded belly with an expression you can't read. Then she looks up. "I actually like how I look now," she says quietly. "Is that weird?" You tell her it isn't. She nods, pulls a pastry from her bag, takes a bite. The two of you eat in comfortable silence for a moment. She smiles.`,
    gain:[3,5], rel:28 },
  { id:"overachiever_pivot", stageMin:4, archetype:"overachiever", title:"A Change of Thesis",
    text:(s)=>`${s.name} submits a revised thesis proposal: 'Adaptive Caloric Strategy and Cognitive Performance: A Self-Study.' You read the abstract. It is rigorous. It is also clearly an elaborate academic justification for eating constantly. You approve it. She beams with the energy of someone who has made gaining weight count toward her GPA.`,
    gain:[3,6], rel:20 },
  { id:"transfer_settled", stageMin:5, archetype:"transfer", title:"Finally Home",
    text:(s)=>`${s.name} gets a call from her parents asking if she wants to transfer back home. She's quiet for a moment, looking out the window at the campus she's come to know so intimately. "No," she says finally. "I think I'm where I'm supposed to be." She hangs up, pats her enormous belly with obvious affection, and heads to the dining hall.`,
    gain:[4,8], rel:22 },
  { id:"custom_clothing", stageMin:6, archetype:null, title:"Shopping Trip",
    text:(s)=>`${s.name} announces she's had to go up four clothing sizes and nothing in stores fits anymore. Rather than distress, there's satisfaction in her voice. "I got measured properly for the first time. Did you know I carry most of it here —" she pats her belly "— and here." She pats her hips. "Custom order. It's going to look incredible."`,
    gain:[2,5], rel:16 },
  { id:"immobility_peace", stageMin:8, archetype:null, title:"Comfortable",
    text:(s)=>`You find ${s.name} settled into the reinforced couch, a plate balanced on her enormous belly, utterly at ease. "I've been thinking," she says, "I used to spend so much energy on movement. Walking, exercising, all of that." She takes a slow bite. "This is better." She isn't asking for your opinion. She's just telling you how things are. You bring her something else to eat.`,
    gain:[5,12], rel:22 },
  { id:"blob_ending", stageMin:10, archetype:null, title:"Final Form",
    text:(s)=>`${s.name} can no longer come to class. You bring class to her. She holds court from her specially furnished room — vast, warm, content. Students orbit her. She eats, talks, laughs. When you ask how she feels, she considers this. "Full," she finally says. "Really, genuinely full." She smiles. "Keep it coming."`,
    gain:[0,0], rel:35 },
];


// ─── CHARACTER-SPECIFIC TALK RESPONSES ────────────────────────────────────────
// Keyed by student id. Overrides archetype fallback in TALK_RESPONSES.
