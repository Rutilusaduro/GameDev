import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// DATA LAYER
// ═══════════════════════════════════════════════════════════════

const WEIGHT_STAGES = [
  { id:0,  label:"Slight",   min:80,  color:"#2a8070", desc:"Noticeably underweight — clothes hang off her frame, collarbone prominent, limbs very slender and angular." },
  { id:1,  label:"Slim",     min:100, color:"#3a8a3a", desc:"Slender and toned — clothes hang loosely, effortless movement." },
  { id:2,  label:"Soft",     min:135, color:"#6a9a20", desc:"A gentle softness settling in. Belly pooching slightly, cheeks a touch fuller, thighs pressing together at the top." },
  { id:3,  label:"Chubby",   min:162, color:"#b0a000", desc:"Visibly rounded belly pushing at waistbands. Face rounder, arms softer, hips wider. Clothes are noticeably tighter." },
  { id:4,  label:"Plump",    min:195, color:"#c07010", desc:"A real belly rounding outward. Double chin forming. Thighs rubbing together. Shirts riding up. Breathing heavier on stairs." },
  { id:5,  label:"Heavy",    min:238, color:"#b05010", desc:"Belly hangs forward prominently. Arms thick and jiggly, legs genuinely chunky. Standard chairs creak. Walks with a slight waddle." },
  { id:6,  label:"Fat",      min:285, color:"#982808", desc:"A clear, rolling waddle. Belly past the hips. Cheeks very round and soft. Chair armrests a tight squeeze. Breathing audible." },
  { id:7,  label:"Very Fat", min:360, color:"#800000", desc:"Belly cascades toward the knees. Arms like soft bolsters. Needs wide doorways. Can't see her feet. Movement slow and deliberate." },
  { id:8,  label:"Enormous", min:465, color:"#600000", desc:"Fills an entire couch. Can't fit in a car. Belly rests on thighs. Getting up requires leverage and real effort." },
  { id:9,  label:"Immobile", min:595, color:"#400000", desc:"Too wide for standard hallways. Reinforced furniture required. Shuffles a few steps at most. A vast, soft, commanding presence." },
  { id:10, label:"Blob",     min:820, color:"#200000", desc:"Entirely immobile. A breathtaking mountain of warm, soft flesh. The room is organised around her." },
];

const BODY_DESCS = {
  pear:[
    // 0 — Slight
    `A wispy, angular frame — her face is sharp at the cheekbones and jaw, neck slender, collarbones pronounced and visible. Her arms are thin enough that the tendons show at the wrist. Her torso is flat, ribs faintly countable through thin fabric. Her hips are present but narrow, her thighs long and slim with a visible gap from ankle to pelvis. She moves quickly, effortlessly, taking up very little space.`,
    // 1 — Slim
    `A slender, easy frame — her face is smooth and lightly rounded at the cheeks, a neat jaw, clear neck. Her arms are slim with a little softness at the upper arm. Her torso is flat with just the gentlest suggestion of a belly when she sits. Hips flare slightly, thighs touch at the very top. She moves easily, clothes falling off her without effort.`,
    // 2 — Soft
    `Her face has filled out softly — fuller cheeks, a rounded jaw, the angular edges gone. Her neck is smooth and slightly thicker. Her arms have lost their boniness; the upper arms are soft and rounded. Her torso shows a small, soft belly poking forward at the navel, a gentle pouch above her waistband. The dramatic lower-body development is beginning: hips visibly wider, thighs pressing together from mid-thigh down, a noticeable curve at the seatline.`,
    // 3 — Chubby
    `Her face is noticeably rounder — full cheeks, a soft double chin forming when she looks down, her neck thicker and smooth. Her shoulders have softened; her upper arms are pillowy, dimpled at the elbow. Her belly rounds forward visibly below the navel, a soft apron forming. But the real story is her lower half: hips wide enough to brush doorframes, thighs thick and pressed together from hip to knee, her bottom full and heavy and pulling at waistbands. She's begun to move with the slight, shifting gait of someone with real weight between her thighs.`,
    // 4 — Plump
    `Her face is genuinely round and full — cheeks soft and prominent, a clear double chin now, her neck smooth and thick. Her shoulders round and padded; her arms heavy, the upper arms deeply soft and swinging when she moves. Her belly hangs forward in a distinct apron, navel pointing slightly down. Below the waist she is striking: hips genuinely wide, thighs massive and round, their inner surfaces in continuous contact from groin to knee, the skin warm and dimpled. Sitting, her thighs spread wide and her bottom overflows a standard chair on both sides. Stairs are taken one at a time now.`,
    // 5 — Heavy
    `Her face is very full — soft round cheeks touching her shoulders when she turns, a full double chin that rests against her neck when she looks forward, small ears framed by softness. Her neck is thick and smooth, her shoulders wide and padded. Her upper arms are heavy, the flesh swinging freely, the crease at her elbow deep. Her belly hangs forward and down in a substantial apron, the lower roll resting on the tops of her thighs when she sits. Her lower body is overwhelming: hips enormously wide, her profile from behind defined by the vast sweep of her thighs and bottom, flesh overfilling every chair she attempts. Walking is a full-body event — a slow, rolling gait, her thighs displaced outward by each other's mass.`,
    // 6 — Fat
    `Her face is a soft, round abundance — full cheeks resting on her shoulders, layers of chin stacked smoothly, her eyes set deep in softness. Her neck has largely merged with her shoulders. Her arms hang at an angle from her sides, pushed outward by the mass of her torso; the upper arms are enormous bolsters of soft flesh, the elbows deeply dimpled. Her belly cascades forward in heavy overlapping rolls, the lowest apron hanging past her hips. Her lower body is extraordinary: hips that fill hallways, thighs that require a wide, rolling gait, the flesh of her inner thighs extending past her knees, her bottom an enormous soft shelf that dominates any surface she sits on, overflowing chairs generously.`,
    // 7 — Very Fat
    `Her face has become its own landscape — a soft, full moonface, cheeks wide and prominent, the chin a continuous smooth slope to her chest. Her neck is gone, replaced by the soft curve between face and shoulder. Her arms project nearly horizontally from her body, their lower surfaces deeply concave, the upper arms vast and swaying. Her torso is immense: a deep, round bust above several heavy belly rolls, the apron hanging to mid-thigh when she stands. Her lower body is the dominant fact of her figure: hips that must turn sideways to clear doorframes, thighs that brush together continuously from waist to knee, the inner flesh extended further still, her seat a vast soft monument that requires custom furniture. Movement is deliberate, a wide rolling walk, each step placed with the care of significant mass.`,
    // 8 — Enormous
    `Her face is soft and vast — a wide moonface framed entirely by softness, the features gentle and small in their abundance of cheek and chin. Her shoulders are rounded mountains; her arms rest at steep angles from her sides and she cannot bring them together in front of her without effort. Her torso is an enormous soft landscape: the bust heavy and wide, the belly hanging in deep, heavy rolls, the lowest apron resting on her thighs even while she stands. Her lower half is staggering — hips that fill any standard doorway from side to side, thighs that require a wide stance simply to stand upright, her bottom an overwhelming shelf of soft flesh that no standard seating can accommodate. She moves with the careful, swaying momentum of someone managing enormous weight, each step deliberate, each surface chosen for what it can hold.`,
    // 9 — Immobile
    `Her face is a soft, vast terrain — wide and round, the features barely distinct from the surrounding softness, her chin a smooth cascade to her chest. Her upper body is immense: arms that can barely move, hands soft and dimpled, her torso a rolling mountain of flesh that she can neither fully see over nor reach around. Her belly cascades in enormous, layered rolls, the lowest extending far in front of her. Her lower body is geography: hips that extend far beyond her shoulders when viewed from above, thighs of extraordinary circumference, each one a presence unto itself. She is barely mobile — a shuffle of inches possible on good days, her enormous mass requiring assistance for anything beyond shifting position. She fills and overwhelms any furniture built to accommodate her.`,
    // 10 — Blob
    `She has become something the usual descriptors don't quite reach. Her face is a soft, warm island of expression in a vast sea of flesh — gentle features, full cheeks, a serene expression that seems to float above the enormity below. Her arms are largely immobile, embedded in the great soft mass of her sides. Her torso, her lower body, her hips — the distinctions have blurred; she is a continuous, breathtaking expanse of warm, soft flesh, layered and immense, the largest thing in any room she occupies. She does not move. She receives the room. Everything is organized around her.`,
  ],
  hourglass:[
    // 0 — Slight
    `A fine, narrow frame — her face angular and precise, cheekbones prominent, jaw defined. Her neck is long and slender. Her shoulders are narrow, arms very thin, the muscle visible at the forearm. Her torso is almost flat with minimal chest; a small, distinct waist flares to narrow hips. Her legs are long, slim, and toned. She moves quickly and takes up very little space.`,
    // 1 — Slim
    `A neat, balanced figure — her face smooth and symmetrical, cheeks lightly rounded, a clean jaw. Her neck is slim. Shoulders trim, arms slender with a softness at the upper arm. Her waist nips in cleanly; her hips flare gently from it, creating the beginning of the classic curve. Her legs are toned and slim. She moves with natural ease.`,
    // 2 — Soft
    `Her face has filled out gently — cheeks softer, jaw line rounder, a hint of softness at the chin. Her neck is slightly fuller. Her bust has grown noticeably, straining the buttons of shirts. Her waist is still visible but has softened, losing its sharp definition. Her hips have widened further; her thighs are touching. A small, round belly has appeared between waist and hip. The curves are larger in every direction — she fills her clothes more completely.`,
    // 3 — Chubby
    `Her face is full and soft — round cheeks, a smooth jawline that has lost its angles, the beginning of a second chin when she looks down. Her neck is fuller. Her bust is large and heavy now, pulling at her necklines. Below it, a definite belly rounds forward, softening the once-sharp waist. Her hips are strikingly wide, her thighs thick and in constant contact, her bottom full and round. The hourglass is still visible but has grown dramatically in every dimension. She moves with a gentle sway.`,
    // 4 — Plump
    `Her face is genuinely round — full, soft cheeks, a distinct double chin, her neck smooth and thick. Her bust is very large, heavy, shaping everything she wears. Her waist has largely disappeared, replaced by a round, prominent belly that protrudes forward and rests over her waistband. Her hips are very wide, her thighs massively thick and dimpled, pressing together from groin to knee, her bottom overflowing chairs. The hourglass shape is now an amplified, overwhelming version of itself — every curve at enormous scale. She walks with a visible waddle.`,
    // 5 — Heavy
    `Her face is full and soft, cheeks resting on her shoulders when she turns, a generous double chin, small ears set in softness. Her bust is enormous and heavy, her neck thick. Her waist is gone entirely; her torso is round and full from chest to hips. Her belly is a prominent, heavy globe hanging forward below the navel. Her hips are extraordinarily wide — the widest part of a very wide figure — her thighs vast and warm, her bottom an enormous soft presence that dominates everything she sits on. Despite the extreme curves she carries herself with a kind of authority.`,
    // 6 — Fat
    `Her face is a soft, round fullness — cheeks wide and prominent, chin resting on her chest, her profile almost circular. Her bust is tremendous, layered with rolls above and below. Her belly is a heavy, round mass that hangs forward significantly, rolls visible above and below the navel. Her hips are staggering in their width — she turns sideways to navigate narrow spaces — her thighs enormous, dimpled, pressing together continuously, her bottom a vast soft shelf. The curves that defined her have been amplified to an extreme: enormous in every direction, overwhelming in every dimension.`,
    // 7 — Very Fat
    `Her face is vast and soft — a full, round moonface where the jaw, cheeks, and multiple chins merge into a warm, continuous softness. Her neck has disappeared into the mass of her shoulders and chest. Her bust is tremendous; beneath it her belly hangs in deep, heavy rolls. Her hips cannot be described in ordinary terms — they extend far beyond her shoulders in profile, requiring wide doorways and custom seating. Her thighs are enormous and constant in their contact; her bottom is a monument that overwhelms any surface it meets. She moves with the deliberate care of someone managing very great mass.`,
    // 8 — Enormous
    `She fills any room in an immediate, physical way. Her face is a wide, soft moonface framed entirely by soft flesh, her features gentle and sweet. Her torso is immense — bust, belly, rolls, the layered softness of a body that has expanded far beyond any standard frame. Her hips project far to either side; her arms hang at steep angles, pushed out by the mass of her sides. Her lower body is extraordinary: thighs of vast circumference, a bottom that requires specially reinforced seating, the flesh of her inner thighs hanging past her knees. She moves only slowly and with great deliberateness.`,
    // 9 — Immobile
    `She is vast in every direction. Her face is a small, soft, serene island in the expanse of her upper body — cheeks wide, multiple chins cascading softly. Her bust, belly, hips, and lower body have become a continuous, enormous landscape of soft flesh, rolls and folds layered upon each other, her sides extending far beyond any standard measurement. Her thighs are individually enormous; together they fill the width of a small sofa. She does not move independently. The room is organized around her comfort.`,
    // 10 — Blob
    `She has exceeded every category. Her face is gentle and serene, floating above an incomprehensible abundance of warm, soft flesh. The curves that once defined her — waist, hips, bust — have become part of one continuous, breathtaking mass that fills the room. She is immobile, permanent, and overwhelmingly present. Everything she rests on was built for her. Everything else adjusts.`,
  ],
  straight:[
    // 0 — Slight
    `An angular, spare frame — her face lean and angular, cheekbones and jaw prominent, the hollows of her temples visible. Her neck is long and thin. Her shoulders are narrow and bony; her arms are very thin, the wrists small. Her torso is flat in every direction — minimal chest, no visible waist curve, hip bones slightly prominent. Her legs are long and thin. She moves very easily.`,
    // 1 — Slim
    `A lean, straight figure — her face smooth and lightly defined, clean jaw, neat features. Her neck is slim. Her shoulders are narrow, arms slender. Her torso is flat from chest to hip with very little variation; the waist doesn't nip in. Legs are lean and straight. She moves with easy efficiency.`,
    // 2 — Soft
    `Her face has softened — cheeks rounder, jaw less defined, the early suggestion of a chin. Her neck is slightly fuller. Her upper arms have lost their leanness and developed a gentle softness. Her belly has appeared: a small, round pouch pushing forward below the navel, visible through fitted shirts. Her chest has filled out a little. Her hips and thighs have rounded only slightly — the softening is even across her whole body, no dramatic curves, just a uniform gentle rounding everywhere.`,
    // 3 — Chubby
    `Her face is noticeably fuller — round cheeks, the jaw softened, a second chin forming when she looks down. Her neck is thick and smooth. Her upper arms are padded and soft, the flesh spilling slightly over elbow joints. Her torso has rounded everywhere: a definite belly pushing forward and down, a rounded back, a chest that has grown significantly. Her hips are wider but remain relatively balanced with her upper body. Her thighs have thickened, pressing together from mid-thigh. The softening is still relatively even — she is round all over rather than dramatically bottom or top heavy.`,
    // 4 — Plump
    `Her face is very full — prominent round cheeks, a clear double chin, her neck smooth and wide. Her arms are heavy, the upper arms soft and swinging slightly. Her belly is the dominant feature of her torso now: a round, prominent globe hanging forward and down, rolls visible above and below the navel. Her chest is large and heavy. Her hips have widened proportionally; her thighs are thick and touch continuously. She is full and round in every direction, the weight distributed evenly across her entire body. She breathes more heavily climbing stairs.`,
    // 5 — Heavy
    `Her face is round and full, the cheeks wide and soft, multiple chins visible, her neck smooth and thick. Her shoulders have rounded and padded. Her arms hang with significant mass, the upper arms large soft cylinders, the forearms thick. Her belly hangs forward heavily in a prominent apron, rolls stacked above it. Her chest is very large. Her hips are wide; her thighs thick and constantly in contact; her bottom heavy and round. The weight is remarkably even — no dominant feature, just a large, full, round body in every measurement. She walks with a slow, deliberate gait.`,
    // 6 — Fat
    `Her face is a soft, full moonface — round cheeks sitting high, multiple chins, her neck all but absorbed into her shoulders. Her arms are large and hang at an angle, the upper arms enormous and swinging. Her torso is an immense, round mass — chest, belly, and back all at significant scale, the belly hanging in heavy rolls. Her hips and thighs and bottom match the upper body in scale, the full-body evenness maintained. She is large and round and soft in every direction, filling chairs, doorframes, and rooms without any single point of dramatic emphasis. Just everywhere.`,
    // 7 — Very Fat
    `Her face has become a vast, soft roundness — a moonface where the jaw and cheeks and chins form one continuous gentle curve. She moves very slowly, her arms barely able to hang at her sides, the rolls of her torso displacing them outward. Her belly hangs in deep, heavy folds. Her back is as round as her front. Her hips and thighs and bottom are enormous and match the scale of her upper body. She fills doorways and requires custom furniture. Every movement is effortful.`,
    // 8 — Enormous
    `She is an enormous, round presence. Her face is small and sweet at the center of a vast, soft head. Her arms project at extreme angles, mostly decorative now. Her torso is an immense round mass — front, sides, and back all equally vast — with the belly hanging far in front of her and the back equally full. Her lower body matches completely. She fills the largest chairs and extends beyond them. Movement requires care and assistance.`,
    // 9 — Immobile
    `She is a vast, round mass. Her face is soft and small and visible; the rest of her is a landscape — an enormous, even, continuous softness that fills the room. Her upper and lower body have lost their distinction, merging into one immense whole. She does not move. She has not moved in some time. The room has been organized around her.`,
    // 10 — Blob
    `A breathtaking, still, enormous presence. Her face is serene and small at the summit of what she has become. She fills the room. She is the room, in all the ways that matter. Everything else is detail.`,
  ],
  apple:[
    // 0 — Slight
    `A very slim figure that leans toward the torso: her face is lean and precise, cheekbones prominent, jaw clean. Her neck is slender. Her shoulders are narrow; arms thin. Her torso is flat with a very slight tendency to carry weight through the midsection, not yet visible but structurally present. Her hips are narrow, legs long and slim. She moves quickly and very lightly.`,
    // 1 — Slim
    `A slender, neatly proportioned figure — her face clean-lined and smooth, a well-defined jaw. Her neck is slim. Her torso is trim with a very gentle forward suggestion at the belly that would only be noticed on close inspection. Her hips are relatively narrow compared to her torso. Legs are slim and long. She moves easily and quickly.`,
    // 2 — Soft
    `Her face has rounded out at the cheeks; her jaw is softer. Her neck has filled slightly. Her torso shows its apple nature: a round, soft belly is forming decisively — the midsection is where weight goes first and most noticeably. It presses forward below the navel and softens the waistline entirely. Her arms have softened at the upper arm. Her hips and thighs remain relatively slim by comparison — the contrast is becoming noticeable.`,
    // 3 — Chubby
    `Her face is full and round — cheeks prominent, jaw soft, the beginning of a double chin. Her neck is thick and smooth. Her belly is the defining feature: round and forward, hanging over the waistband, the navel shifting downward. She carries the bulk of her weight here — her torso is significantly rounder than her lower half. Her arms are thickening quickly: upper arms soft and padded. Her hips and thighs are modest by comparison, giving her a distinctive round-bellied, full-armed silhouette.`,
    // 4 — Plump
    `Her face is very round and full — a soft, wide face, clear double chin, smooth thick neck. Her arms are heavily padded, upper arms large and soft. Her torso is the primary event: a massive, heavy belly that hangs forward in a prominent apron, resting below the navel, pulling at every waistband. Her chest has grown large. Her back is correspondingly round. Her lower half — hips, thighs, bottom — is significantly slimmer than her upper body, giving her a distinctive front-heavy appearance. Breathing is audible after any exertion.`,
    // 5 — Heavy
    `Her face is full and soft, multiple chins, her neck absorbed into her shoulders. Her arms are enormous — the upper arms are large bolsters of soft flesh, the forearms thick. Her belly is the axis of her body: an enormous, heavy mass that hangs far forward and down, the lowest apron resting on the tops of her thighs when she sits. Her sides are deep; her back is round and full. Her lower half remains significantly smaller — the contrast between the enormous belly and the relatively modest hips and thighs is striking. She walks with a forward lean to balance the mass in front.`,
    // 6 — Fat
    `Her face is a soft, round fullness — moonface features, chin resting on her chest. Her arms hang at steep angles, displaced by the mass of her torso. Her belly is extraordinary: an enormous, hanging mass that extends far in front of her, rolls deep and heavy, the lowest apron hanging to mid-thigh. Her chest and belly and back are all immense. Her lower half, while significantly grown, remains clearly smaller than the torso — the apple shape is dramatically amplified. She walks with the slow, careful gait of someone managing a very heavy front.`,
    // 7 — Very Fat
    `Her face is soft and round, barely visible above the mass of her upper body. She can see almost nothing of her lower half over her belly. The belly is the primary physical fact of her existence: vast, heavy, hanging in deep rolls, extending far in front and to the sides. Her arms are large but functionally mostly immobile, embedded in the rolls of her sides. Her lower body has grown but remains less vast than the enormous torso. Movement is slow and requires considerable effort and planning.`,
    // 8 — Enormous
    `She is defined by her belly. It is the largest thing in the room. Her face is small and soft above the mass; her arms are barely functional. The belly extends so far in front that she cannot see her feet, cannot reach past it, cannot easily navigate around it. The rest of her body — back, sides, lower half — are all very large, but everything refers back to the belly as the dominant fact. She fills the largest available furniture and overflows it.`,
    // 9 — Immobile
    `The belly has become the room. She sits — or is positioned — within the vast expanse of herself, her face a small, serene presence above the immense soft landscape. Her arms are embedded. Her lower body is barely distinguishable from the general mass. She does not move. Movement is no longer the relevant concept. Presence is.`,
    // 10 — Blob
    `An overwhelming, still presence organized around the enormous mass of her belly. Her face is gentle and present above the summit of what she has become. She fills the room. The room fills around her. Neither concept requires further description.`,
  ],
  athletic:[
    // 0 — Slight
    `A compact, powerfully lean figure — her face is clean-featured and angular, jaw defined, cheekbones visible. Her neck is lean with visible muscle. Her shoulders are broad for her frame, narrow hips below. Her arms are lean and muscular — bicep and forearm clearly defined, no excess tissue. Her torso is flat and hard, the abdominals visible, minimal body fat. Her legs are long, powerful, and very lean — quadriceps and calves defined through the skin. She moves quickly and efficiently, every movement economical.`,
    // 1 — Slim
    `A lean, athletic build — her face clean and defined, strong jaw, clear features. Her neck is slim and muscular. Broad shoulders, arms with visible tone and muscle definition. Her torso is flat and firm. Her legs are strong and toned — the muscle definition of someone who trains regularly. She carries herself with the upright posture and fluid movement of an athlete.`,
    // 2 — Soft
    `Her face has softened slightly — the sharp definition of her cheekbones muted by a new roundness at the cheeks. Her neck is slightly thicker. Her shoulders are still broad and strong. Her arms have retained much of their muscle but a new softness has settled over it — the definition remains but is less sharp. Her belly has appeared: a firm, round softness pushing forward at the midsection where there was nothing before. Her thighs have thickened with the combination of muscle and new fat, pressed against each other at the top.`,
    // 3 — Chubby
    `Her face is visibly rounder — full cheeks, a softer jaw, the athletic sharpness replaced by a rounded warmth. Her neck is thick. Her shoulders remain broad and strong. Her arms are now a mix of muscle and soft tissue — the bicep still present under a layer of padding. Her belly is definitively round and forward-hanging: a soft, heavy mound that sits below her ribcage, the muscle structure buried. Her thighs are thick and heavy, still powerful but soft, pressing together from the hip. Her bottom has grown substantially — round and prominent, straining fabric.`,
    // 4 — Plump
    `Her face is full and round — prominent cheeks, a double chin forming, her neck smooth and wide. Her shoulders are still broad, but the narrowness has gone; she is wide at the shoulder and continuing to widen below. Her arms are heavy — thick upper arms, the muscle buried under substantial padding. Her belly hangs forward heavily, a full apron below the navel, the old abdominal definition entirely gone. Her thighs are massive — the athlete's quadriceps now deep under layers of soft, heavy flesh. Her bottom is enormous and round. She moves with the particular gait of someone both powerful and very heavy.`,
    // 5 — Heavy
    `Her face is soft and full — round cheeks, clear double chin, her neck thick and strong-looking. Her shoulders are very broad, her back wide. Her arms are large: the upper arms are very thick, soft-over-muscle, hanging with real weight. Her torso is enormously thick — the chest, belly, and back all substantial. The belly hangs forward in a prominent apron. Her lower half continues the theme: thighs of extraordinary thickness, her bottom enormous and dominant. The former athlete's frame carries this weight powerfully — there is still something powerful in the way she takes up space — but the power is now the power of mass.`,
    // 6 — Fat
    `Her face is a full, round softness — cheeks wide and prominent, multiple chins, her neck thick and short. The broad shoulders remain, giving her an imposing width. Her arms are very large — the upper arms enormous soft cylinders that swing when she moves. Her torso is vast: deep chest, a huge belly hanging in rolls, a back equally round. Her thighs and bottom are tremendous — she takes up the space of two standard seats. She moves with a slow, rolling gait, her body a massive, warm presence.`,
    // 7 — Very Fat
    `Her face is soft and round, floating above the enormous mass of her upper body. Her shoulders — still broad — disappear into the rolls of her torso. Her arms are very large, barely mobile, hanging at steep angles. Her belly hangs in deep, heavy rolls. Her thighs are individually enormous; together they require a very wide stance. Her bottom cannot be accommodated by standard furniture. She moves deliberately, slowly, with the careful authority of someone managing great mass.`,
    // 8 — Enormous
    `She is a very large person. Her face is small and soft above the immensity of her body. Her shoulders and the width of her former athletic frame now form the foundation of something far greater — an enormous, wide, deep, heavy presence. Her belly extends far in front of her. Her thighs are vast. Her arms are largely decorative. She fills and overflows any standard chair. Movement requires planning and assistance.`,
    // 9 — Immobile
    `A vast, still presence. Her face is serene above the enormous expanse of her body — the breadth of her former athletic frame is now the breadth of something far greater. She does not move independently. Her body fills the room in the immediate, physical sense. The furniture was built for her.`,
    // 10 — Blob
    `She was an athlete. The body remembers it in the way it holds the mass — upright, vast, and permanent. Her face is gentle and present above what she has become. She fills the room. She is the heaviest, most permanent thing in it. Everything is organized around her.`,
  ],
};

const STAGE_REACTIONS = {
  cheerleader:[
    (s)=>`I weigh ${Math.round(s.lbs)} pounds and my uniform barely stays on. My hip bones are visible in the mirror. This doesn't feel like me.`,
    (s)=>`${Math.round(s.lbs)} pounds. My uniform is fitting the way it's supposed to fit — snug through the hips, a little tight across the chest. I like the way it looks.`,
    (s)=>`${Math.round(s.lbs)} pounds. The waist seam split during a basket toss. I had to pin it and perform in it anyway. I wasn't embarrassed. My thighs are thick now — I can feel them pressing together when I walk.`,
    (s)=>`${Math.round(s.lbs)} pounds. My belly presses against the waistband of my skirt. I got benched — 'team aesthetic concerns.' I went home and ate an entire pizza and felt better than I had all week.`,
    (s)=>`${Math.round(s.lbs)} pounds. My thighs are wide and warm and pressed together from hip to knee. My belly rounds forward noticeably. I can't do a standing jump anymore but I don't want to. I want to be bigger.`,
    (s)=>`${Math.round(s.lbs)} pounds. I dropped off the squad. My belly is a real thing now — it rounds out past my hips and hangs warm and soft and heavy. My thighs are enormous. I stand in front of the mirror and I look at myself for a long time. I like what I see.`,
    (s)=>`${Math.round(s.lbs)} pounds. My belly sits in my lap when I sit down. My thighs spread wide and warm across any chair I occupy. The squad came to visit last week. They stared. Good.`,
    (s)=>`${Math.round(s.lbs)} pounds. I weigh almost 500 pounds. I say this to myself sometimes just to hear it. My belly, my thighs, my arms, my face — all of it round and soft and enormous. I want more of this.`,
    (s)=>`${Math.round(s.lbs)} pounds. Getting around is an event. My body fills spaces completely. Everything I wear is custom. I've never been happier with how I look.`,
    (s)=>`${Math.round(s.lbs)} pounds. I am enormous and I know it and I love every pound of it. My thighs, my belly, my arms — all warm, all soft, all mine. I hope my classmates get just as fat.`,
    (s)=>`I am ${Math.round(s.lbs)} pounds of cheerleader and I haven't worn a uniform in years. People bring food to me. I eat it. My belly fills my lap completely. This is the life.`,
  ],
  bookworm:[
    (s)=>`${Math.round(s.lbs)} pounds. I can feel my ribs. I've noted it in my research log and added a corrective meal schedule. This is addressable.`,
    (s)=>`${Math.round(s.lbs)} pounds. My jeans fit differently — tighter at the hips, looser in the waist. I've been eating more between study sessions. I feel better, actually.`,
    (s)=>`${Math.round(s.lbs)} pounds. My chair in the library made a sound today when I sat down. I moved to the sturdier one in the corner and didn't mention it to anyone. My belly presses against my desk now.`,
    (s)=>`${Math.round(s.lbs)} pounds. My belly rounds forward when I sit — I can feel it, warm and soft, pressing against the edge of the desk. My thighs spread wide in the chair. I've ordered larger clothes online. This is fine.`,
    (s)=>`${Math.round(s.lbs)} pounds. Nothing with buttons closes anymore. My belly hangs forward when I stand. I've stopped trying to pull my shirt down over it. My thighs are thick and heavy and I can feel exactly how much I weigh.`,
    (s)=>`${Math.round(s.lbs)} pounds. My belly is substantial. It rounds past my hips and hangs warm when I stand up. My thighs are wide and pressed together. A folding chair bent under me last week. I finished my notes first.`,
    (s)=>`${Math.round(s.lbs)} pounds. I work from home now. My desk chair is custom-rated, my desk is adjusted to accommodate my belly. I am the most productive I have ever been. Also the heaviest.`,
    (s)=>`${Math.round(s.lbs)} pounds. My belly rests heavily in my lap. My thighs are enormous, warm, soft — they spread the width of the chair and then some. I haven't worn anything fitted in over a year. I want to be even bigger.`,
    (s)=>`${Math.round(s.lbs)} pounds. Every step is deliberate. Chairs are assessed before sitting. My belly is vast and warm. I study from bed now. My research is excellent. My body is more excellent.`,
    (s)=>`${Math.round(s.lbs)} pounds. Immense. Brilliant. The two things are not in conflict. My belly is a full, heavy, magnificent thing and my thesis is due in spring. Both will be extraordinary.`,
    "I have published and I am vast and I do not leave my room but everything comes to me. 820 pounds of academic achievement. My belly fills my lap and spills past it. I am exactly what I was supposed to become.",
  ],
  influencer:[
    (s)=>`${Math.round(s.lbs)} pounds and my collarbone is very prominent in the ring light. I posted it. The comments were worried. I'm going to the dining hall immediately.`,
    (s)=>`${Math.round(s.lbs)} pounds. Posting fitness content. Getting strong. My curves are coming in. My audience is noticing and they're not complaining.`,
    (s)=>`${Math.round(s.lbs)} pounds. My 'soft era' content is performing better than anything I've ever posted. I don't understand it but I'm leaning all the way in. My belly is a little round now and I keep filming it.`,
    (s)=>`${Math.round(s.lbs)} pounds. My belly rounds forward in photos. My thighs are thick in my leggings. I posted an unedited mirror selfie and it got 800k views. My manager called it a 'brand moment.'`,
    (s)=>`${Math.round(s.lbs)} pounds. I weighed myself on camera. 241 pounds on the scale and I posted it unedited and 2 million people watched it. I had cake. My belly is round and present and I film it every day.`,
    (s)=>`${Math.round(s.lbs)} pounds. I am ${Math.round(s.lbs)} pounds and I film myself eating and my audience watches everything. My belly fills out my clothes completely. My thighs are wide and warm. I want to be bigger. I'm going to be bigger.`,
    (s)=>`${Math.round(s.lbs)} pounds. My belly is enormous — it rounds forward and fills my shirts and I film it. My thighs spread across the couch when I sit and I film that too. 800k subscribers. Growing.`,
    (s)=>`${Math.round(s.lbs)} pounds. My assistant does the filming now. I sit and eat and the camera captures exactly what I am. My belly, my thighs, my arms — all of it on camera, all of it enormous, all of it exactly right.`,
    (s)=>`${Math.round(s.lbs)} pounds. I'm one of the largest creators in my category. My belly fills half the frame. I want my classmates to see me like this. I want them to know what's possible.`,
    (s)=>`${Math.round(s.lbs)} pounds. Vast and filmed and loved. My belly is the subject of more comment threads than I can count. All of them appreciative. I deserve every pound.`,
    (s)=>`I am ${Math.round(s.lbs)} pounds and a household name in three countries. My belly is a monument. My thighs are columns. I eat on camera every day and the world watches. This is what I was for.`,
  ],
  athlete:[
    (s)=>`I weigh ${Math.round(s.lbs)} pounds and my split times are excellent but I look in the mirror and I barely recognize the person there. I want to be bigger.`,
    (s)=>`${Math.round(s.lbs)} pounds. Coach says I look 'lean.' My times are good. My appetite is enormous. I'm eating everything after practice.`,
    (s)=>`${Math.round(s.lbs)} pounds. My times are slipping and I don't care. My thighs are getting thick — I can feel them when I run. I like the way they feel. I want them thicker.`,
    (s)=>`${Math.round(s.lbs)} pounds. Cut from varsity for 'weight concerns.' I drove home, ate an enormous pasta, and felt better than I had all season. My belly presses against my waistband now.`,
    (s)=>`${Math.round(s.lbs)} pounds. I was a runner. Now I'm something different. My thighs are wide and heavy and they rub together when I walk. My belly is round. I am so much more powerful than I was at 128.`,
    (s)=>`${Math.round(s.lbs)} pounds. I haven't been on a track in months. My thighs are enormous — thick and soft and pressed together from hip to knee. My belly rounds past my hips. I am three hundred pounds and I want to be four hundred.`,
    (s)=>`${Math.round(s.lbs)} pounds. My body has become the weight room. My belly hangs forward. My thighs are wider than some girls' whole bodies. My old coach texted. I didn't reply. I was eating.`,
    (s)=>`${Math.round(s.lbs)} pounds. ${Math.round(s.lbs)} pounds. I say this number and feel it in my body — the weight of it, the presence of it. My belly is vast and warm and mine. My former teammates are very small people.`,
    (s)=>`${Math.round(s.lbs)} pounds. Enormous. My belly fills my lap completely. My thighs are like pillars. Moving is an event. Being here is the event. I am the biggest athlete this school has ever produced, if you count this as a sport.`,
    (s)=>`${Math.round(s.lbs)} pounds. I was the fastest girl on the track. Now I'm the most of everything else. All of it mine. All of it good. I hope my classmates are eating.`,
    (s)=>`${Math.round(s.lbs)} pounds. The records I set in track are still on the wall. The records I set now are for something else entirely. Both are mine. My belly is magnificent.`,
  ],
  artsy:[
    (s)=>`${Math.round(s.lbs)} pounds. Everything is angular, including my art. I'm painting bones again. I eat immediately after finishing and the food is the most interesting thing I've made all day.`,
    (s)=>`${Math.round(s.lbs)} pounds. The new work is all curves and fullness. I don't know why. I'm eating more while I paint and my figures are getting rounder. My own figure is too.`,
    (s)=>`${Math.round(s.lbs)} pounds. Still lifes of food — piled plates, abundant tables. My belly is starting to round in the studio mirror. I find myself painting it. Good subject matter.`,
    (s)=>`${Math.round(s.lbs)} pounds. My work is getting lush. My figure is too. My belly rounds forward in profile. I've started including self-portraits in the series. Critics say the work has 'urgency.' They're right.`,
    (s)=>`${Math.round(s.lbs)} pounds. The work is explicitly about fat bodies now. I am the primary subject. My belly, my thighs — I paint them warm and enormous and exact. My belly presses against the edge of my canvas when I lean in.`,
    (s)=>`${Math.round(s.lbs)} pounds. ${Math.round(s.lbs)} pounds of artist. My belly hangs forward, warm and round. My thighs spread wide. I paint what I am and what I see and what I want more of. A gallery offered me a solo show based on the new work.`,
    (s)=>`${Math.round(s.lbs)} pounds. My belly is a serious thing. It fills my shirts, rounds past my hips, sits warm and heavy when I rest. I paint it from every angle. I am the most interesting subject I've ever had.`,
    (s)=>`${Math.round(s.lbs)} pounds. Too heavy to move the large canvases myself. I direct. The work is enormous and so am I and both of those things are the point. Critics call it 'corporeal.' They mean fat. They should say fat.`,
    (s)=>`${Math.round(s.lbs)} pounds. The gallery comes to me now. I work from where I sit. My belly is vast. My thighs are wide and warm. Everything I make is about the body I have and how much more I want of it.`,
    (s)=>`${Math.round(s.lbs)} pounds. I am the piece. The work and the subject have merged. My belly, my thighs, my arms — all of it canvas. I want more mass. I want to be the largest thing that has ever been called art.`,
    (s)=>`${Math.round(s.lbs)} pounds of artist. They will write about me. My belly fills the chair and spills past it. My thighs are enormous and warm. I paint from bed now. The paintings are about exactly this.`,
  ],
  gamer:[
    "Her character weighs more than she does. She's ordered double ramen to begin addressing this disparity. It's a start.",
    (s)=>`${Math.round(s.lbs)} pounds. Energy drinks, ramen, 14-hour sessions. The snack sponsors are interested. Everything is going to plan.`,
    (s)=>`${Math.round(s.lbs)} pounds. My gaming chair is suddenly tight around the hips. Ordered a new one rated for 300. Called it 'future-proofing.' My belly is starting to press against the desk.`,
    (s)=>`${Math.round(s.lbs)} pounds. My stream viewers keep sending food delivery to my address. I always accept. My belly is round now. My thighs press together. My viewers love the eating content.`,
    (s)=>`${Math.round(s.lbs)} pounds. I'm sponsored by two snack companies. My belly rounds forward against the desk edge. My thighs spread across the gaming chair. I have a minifridge within arm's reach. I am thriving.`,
    (s)=>`${Math.round(s.lbs)} pounds. I weigh ${Math.round(s.lbs)} pounds and I stream 14 hours a day and I eat constantly and I have never been more comfortable. My belly hangs forward. My thighs are wide and warm. I want to be 400.`,
    (s)=>`${Math.round(s.lbs)} pounds. My setup has been completely reorganized around my body. Everything I need is within reach. My belly is enormous. I want my classmates to get as fat as I am. Some of them are getting there.`,
    (s)=>`${Math.round(s.lbs)} pounds. I don't stand up between streams anymore. Everything is delivered. My belly fills my lap. My thighs are vast and pressed together. I am the biggest streamer in my category and I want to be bigger.`,
    (s)=>`${Math.round(s.lbs)} pounds. My chair was custom built. My desk was custom built. My fridge is enormous and close. I weigh ${Math.round(s.lbs)} pounds and I eat on camera every day and my audience is 2 million people.`,
    (s)=>`${Math.round(s.lbs)} pounds. Final form. Almost. My belly is a full, warm, heavy presence. My thighs don't fit the frame of the camera anymore. My viewers argue about how much I weigh. The real number is bigger than their guesses.`,
    (s)=>`${Math.round(s.lbs)} pounds. One with the setup. One with the chair. One with the fridge. I am ${Math.round(s.lbs)} pounds of gamer and content creator and I eat all day and my belly is the size of a small couch. Good.`,
  ],
  sorority:[
    "Dress falls off her shoulders at chapter. Sisters are worried. She accepts every snack offered and heads to brunch.",
    (s)=>`${Math.round(s.lbs)} pounds. Camera-ready at all times. Salad at lunch, wine on weekends. Her hips are filling out beautifully.`,
    (s)=>`${Math.round(s.lbs)} pounds. Brunch calories don't count. Brunch is four times a week now. My clothes are getting snug through the hips and I've started ordering the larger sizes. No complaints.`,
    (s)=>`${Math.round(s.lbs)} pounds. Sisters staged an 'intervention.' I staged a pizza party. I've gained 60 pounds since freshman orientation. My belly is round and warm and I like it. The intervention ended with everyone eating.`,
    (s)=>`${Math.round(s.lbs)} pounds. I've dropped the diet talk entirely. My belly rounds forward. My thighs press together. My formal dress was custom-ordered. Everything I wear is custom now. I am the most comfortable person in this house.`,
    (s)=>`${Math.round(s.lbs)} pounds. ${Math.round(s.lbs)} pounds of sorority woman. My belly is substantial and warm. My thighs spread wide in any chair I occupy. I'm hosting every event because I prefer not to travel. Everyone comes to me. I feed them.`,
    (s)=>`${Math.round(s.lbs)} pounds. My belly fills my shirts and hangs forward past my hips. My thighs are enormous. I brought my own chair to chapter meeting because the standard ones don't fit. It's a very good chair.`,
    (s)=>`${Math.round(s.lbs)} pounds. I don't leave the house much. Everything comes to me — food, meetings, people. My belly is vast. My thighs are soft and enormous. I want my sisters to get this fat. Some of them are working on it.`,
    (s)=>`${Math.round(s.lbs)} pounds. I am the heart of this house. Literally. I sit at the center of everything and people orbit me. My belly is a full warm presence. My thighs fill the couch.`,
    (s)=>`${Math.round(s.lbs)} pounds. Vast. Warm. Immovable. My belly is an event. My thighs are architecture. I have not left the house in six months and the house comes to me.`,
    (s)=>`${Math.round(s.lbs)} pounds. I am the house. Spiritually and almost architecturally. My belly fills my chair and my lap and then some. Everyone I want close to me is getting fat alongside me. This is exactly right.`,
  ],
  overachiever:[
    "BMI 17.1. Clinical threshold. I've added a corrective meal schedule to my planner. Color-coded. This will be addressed.",
    (s)=>`${Math.round(s.lbs)} pounds. 4.0 GPA, two internships, varsity track, student council. I've also started eating more systematically. My planner has a nutrition column. Everything is measurable.`,
    (s)=>`${Math.round(s.lbs)} pounds. My belly is slightly round when I sit. I've noted this. The data suggests it will continue. I've made no adjustments. The thesis is due in three weeks and food is efficient fuel.`,
    (s)=>`${Math.round(s.lbs)} pounds. My chair makes a sound when I sit. I've logged it. My belly presses against my desk. I've logged that too. My thighs are thicker. All logged. All acceptable.`,
    (s)=>`${Math.round(s.lbs)} pounds. I track everything. 241 pounds on the scale this morning. My belly rounds forward substantially. My thighs press together. I dropped one internship — 'work-life balance.' Work is eating now and the numbers are excellent.`,
    (s)=>`${Math.round(s.lbs)} pounds. I weigh myself every morning and log the number. 302 today. My belly hangs forward when I stand, warm and heavy and round. My thighs are enormous. My academic output has not declined. The data is interesting.`,
    (s)=>`${Math.round(s.lbs)} pounds. I am ${Math.round(s.lbs)} pounds and I have a 3.9 GPA and a very large desk chair and a very thorough eating log. My belly fills my lap when I sit. My thighs are vast. Everything is documented.`,
    (s)=>`${Math.round(s.lbs)} pounds. My thesis is on metabolic adaptation. I am the primary research subject. ${Math.round(s.lbs)} pounds of primary research subject. My belly is enormous and warm and I want it bigger. The data supports continued expansion.`,
    (s)=>`${Math.round(s.lbs)} pounds. I have achieved everything I set out to achieve, including this body. My belly is vast. I document every pound. ${Math.round(s.lbs)} pounds of documented achievement.`,
    (s)=>`${Math.round(s.lbs)} pounds. ${Math.round(s.lbs)} pounds. The number is extraordinary. My belly fills my lap and presses warm and heavy. My thighs are the width of small people. I track everything. Everything is excellent.`,
    (s)=>`${Math.round(s.lbs)} pounds. Dissertation complete. Body: maximum. Both goals achieved simultaneously. I am ${Math.round(s.lbs)} pounds of perfect execution. My belly is enormous and mine. What comes next will also be excellent.`,
  ],
  quiet:[
    "She says almost nothing. She weighs almost nothing. She watches everything.",
    (s)=>`${Math.round(s.lbs)} pounds. She sits in the back. She never raises her hand. She brings extra snacks to class and eats them quietly. She watches.`,
    (s)=>`${Math.round(s.lbs)} pounds. She smiled at something today. Nobody saw but me. Her belly is just starting to soften. She seems more present.`,
    (s)=>`${Math.round(s.lbs)} pounds. Her thighs press together now. Her belly is round when she sits. She's moved from the back row to the middle. She hasn't said why.`,
    (s)=>`${Math.round(s.lbs)} pounds. She speaks in class now. Rarely but genuinely. Her belly rounds forward noticeably. Her thighs are wide and warm. She watches the others in the room and something in her expression is private and satisfied.`,
    (s)=>`${Math.round(s.lbs)} pounds. She told me today that she weighs ${Math.round(s.lbs)} pounds. She said it simply, like a fact she's been holding and decided to release. Her belly hangs forward. Her thighs are enormous. She seemed very calm.`,
    (s)=>`${Math.round(s.lbs)} pounds. She fills the room now even when she says nothing. Her belly is vast and warm. Her thighs spread the full width of the chair. She watches her classmates eating and her expression is attentive.`,
    (s)=>`${Math.round(s.lbs)} pounds. She came to my office to show me something — her phone, a number on a scale app. ${Math.round(s.lbs)} pounds. She looked at me for a long time. 'I want to be 600,' she said. First time she's said what she wanted.`,
    (s)=>`${Math.round(s.lbs)} pounds. She doesn't say much but everything she says is exact. 'I weigh ${Math.round(s.lbs)} pounds.' 'My belly is this heavy.' 'I want more.' Precise. Certain.`,
    (s)=>`${Math.round(s.lbs)} pounds. She is enormous and quiet and her presence fills every room she enters completely. ${Math.round(s.lbs)} pounds of still water. I hope her classmates keep growing. She told me she hopes so too.`,
    (s)=>`She is ${Math.round(s.lbs)} pounds and she sits in the center of every room she enters and people arrange themselves around her. She said: 'This is what I wanted.' She was right. It is.`,
  ],
  transfer:[
    (s)=>`She arrived at ${Math.round(s.lbs)} pounds and misses home. Campus food is strange. She eats it carefully.`,
    (s)=>`${Math.round(s.lbs)} pounds. She's finding her footing. The dining hall is good. She eats there every day. She's making friends, mostly at mealtimes.`,
    (s)=>`${Math.round(s.lbs)} pounds. She's put on weight since arriving — her clothes are snug through the hips, her belly is softening. 'The food here is so much better than home,' she says.`,
    (s)=>`${Math.round(s.lbs)} pounds. Her thighs press together now. Her belly rounds when she sits. She's settled in. Her hometown friends noticed the change when they visited. She seemed pleased.`,
    (s)=>`${Math.round(s.lbs)} pounds. She belongs here now. Her belly rounds forward, her thighs are thick. The dining hall staff knows her name. She's found her booth.`,
    (s)=>`${Math.round(s.lbs)} pounds. ${Math.round(s.lbs)} pounds and she calls this place home. Her belly hangs warm and forward. Her thighs are enormous. Students she doesn't know say hello to her in the dining hall. She knows their orders.`,
    (s)=>`${Math.round(s.lbs)} pounds. She is part of the fabric of this campus. Her belly is vast and warm. The booth in the corner of the dining hall is hers. Everyone knows it. Her thighs spread wide across the seat.`,
    (s)=>`${Math.round(s.lbs)} pounds. She told me today she doesn't think of it as her home country and this country — she just thinks of it as where she is, which is here, which is where her booth is and her food and her ${Math.round(s.lbs)} pounds.`,
    (s)=>`${Math.round(s.lbs)} pounds. She is more campus than most of the buildings. Her belly fills her side of the booth. Her thighs are enormous. Prospective students are told about her on campus tours.`,
    (s)=>`${Math.round(s.lbs)} pounds. Irreplaceable. Immovable. Her booth has a brass plaque with her name. Her belly is vast. I hope the rest of the class gets this fat. She says she hopes so too.`,
    (s)=>`She is ${Math.round(s.lbs)} pounds and she has been here long enough that she is the place. Her belly, her thighs, her arms — all of it enormous, all of it warm, all of it this campus. She's never going home.`,
  ],
};

const STAGE_DROP_REACTIONS = {
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
};

const PROFESSOR_RANKS = [
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

const OUTFITS = {
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

const SLIGHT_DIARY = {
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
};

const DIARY_ENTRIES = {
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
};

const RANDOM_EVENTS = [
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

const INFLUENCE_PAIRS = [
  [0,10],[1,11],[4,12],[3,13],[6,14]
];

const NARRATIVE_EVENTS = [
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

const TALK_RESPONSES = {
  how_are_you:(s,st)=>{
    if(st<=2) return `${s.name} tucks hair behind her ear. "Doing well! Eating a little more than usual maybe, but — yeah. Good." She pats her slightly softer middle, barely noticing it.`;
    if(st<=4) return `${s.name} settles back, chair creaking softly. "Honestly? Really good. I feel comfortable lately. More than before." She smiles, belly resting forward noticeably.`;
    if(st<=7) return `${s.name} grins, shifting her considerable weight. "Amazing, actually." She glances at her round belly with obvious affection. "I don't know when I got so big, but I'm genuinely happy."`;
    return `${s.name} looks up serenely, full cheeks flushed. "Perfect," she says simply. "I am absolutely perfect." She resumes eating.`;
  },
  compliment_figure:(s,st)=>{
    if(st<=2) return `${s.name} blinks, then flushes. "Oh — thank you. I don't usually get…" She glances down at herself uncertainly. "Yeah. Thank you."`;
    if(st<=3) return `${s.name} looks at her softened figure and smiles cautiously. "I mean… I have been feeling a bit different lately. In a good way, I think?"`;
    if(st<=5) return `${s.name} beams. She smooths her hands over her sides, feeling the heft of herself. "I think so too. I've really filled out." She sounds very pleased.`;
    if(st<=7) return `${s.name} laughs warmly, adjusting her heavy frame. "I know, right? I'm huge." She says it with obvious pride. "I just keep getting bigger."`;
    return `${s.name} regards you with serene amusement from her enormous settled mass. "Obviously," she says. "I'm spectacular." She returns to eating.`;
  },
  food_talk:(s,st)=>{
    const places=["the new place on campus","that spot near the library","the dining hall extension","the off-campus bistro"];
    const p=places[s.id%places.length];
    if(st<=3) return `"Oh, we're talking food?" ${s.name} brightens. "Have you tried ${p}? I've been going every few days. The portions are enormous."`;
    if(st<=6) return `${s.name} lights up immediately. "I've really developed my palate lately. Mostly in the direction of 'more.'" She gestures at herself. "Evidence present."`;
    return `${s.name} laughs. "I could talk about food endlessly. Actually — are there snacks here? There should be snacks." She looks around hopefully.`;
  },
  class_talk:(s,st)=>{
    if(st<=3) return `"I've been really into the anthropology readings," ${s.name} says. "The stuff about feasting culture? It's making me think about food differently." She pauses. "Hungrily."`;
    if(st<=6) return `"I love this class," ${s.name} says simply. "The assignments are my favourite. Especially the eating ones." She pats her belly contentedly.`;
    return `"Can we do another food assignment?" ${s.name} asks earnestly. "For my learning. I learn best by eating things." She appears completely sincere.`;
  },
  encourage_eating:(s,st)=>{
    if(st<=2) return `${s.name} hesitates, glancing at her slightly softer middle. "I mean… I probably shouldn't—" She wavers. "— but maybe just a little more. It does smell amazing."`;
    if(st<=4) return `${s.name} barely needs convincing. "Oh I was already planning to," she says, reaching for more. "You just gave me permission to go faster."`;
    if(st<=7) return `${s.name} laughs. "Was I not already? I've been eating basically constantly." She doesn't look remotely bothered. "But yes. More. Absolutely."`;
    return `${s.name} gives you a look of serene amusement. "I appreciate the enthusiasm," she says, already eating, "but I genuinely have this handled."`;
  },
  ask_lifestyle:(s,st)=>{
    if(st<=2) return `"Pretty normal," ${s.name} says. "Class, ${s.hobby}, dining hall. The food here is actually really good."`;
    if(st<=4) return `"I've simplified," ${s.name} says. "Class, ${s.hobby}, and eating. Mostly eating, honestly. I'm happier."`;
    if(st<=7) return `${s.name} considers. "Eat, relax, the occasional ${s.hobby} when I feel like moving." She looks at her enormous body. "Bigger in some ways. Better in all of them."`;
    return `${s.name} shifts comfortably. "Eat. Sit. Exist. I'm excellent at all three. That's the full lifestyle summary."`;
  },
  ask_weight:(s,st)=>{
    if(st<=2) return `${s.name} laughs awkwardly. "I've put on a bit. The food here is genuinely dangerous." She doesn't seem very worried.`;
    if(st<=3) return `${s.name} looks down and sighs — not quite distress. "Yeah. I know. My clothes have been…" She prods her belly thoughtfully. "Unhappy."`;
    if(st<=5) return `${s.name} pats her belly with resigned amusement. "I'm aware I've gotten kind of big." Beat. "I also had a huge lunch and I'm thinking about dinner. So."`;
    if(st<=7) return `${s.name} spreads her hands across her wide middle. "Enormous," she says, with growing pride. "I weighed myself last week and then immediately ordered pizza to celebrate."`;
    return `${s.name} laughs richly. "I am magnificently, spectacularly fat." She settles deeper. "And getting bigger. I love it." She reaches for more food.`;
  },
  about_gaining:(s,st)=>{
    if(st<=2) return `${s.name} blinks. "I mean — yeah, I've put on a few. The food here is so good." She seems unbothered. "Is it that noticeable?"`;
    if(st<=4) return `${s.name} looks at herself, at the real belly now resting forward. "I mean… yeah. I know." A pause. "I don't really mind, honestly. Is that weird?"`;
    if(st<=6) return `${s.name} grins. "I know. I'm huge and getting huger." She sounds delighted. "Every week there's just more of me. I think it suits me."`;
    return `${s.name} laughs warmly. "Keep going, I say. There's clearly no stopping now." She gestures at her enormous mass with obvious satisfaction.`;
  },
  future_plans:(s,st)=>{
    if(st<=3) return `"Graduate, get a job, the usual," ${s.name} says. "Oh, and I want to try that new restaurant downtown. That's also a priority."`;
    if(st<=6) return `"Honestly?" ${s.name} says. "More of this. More food, more comfort, more of just… being." She looks content. "My plans have simplified."`;
    return `${s.name} smiles slowly. "My plans are right here," she says. "This." She spreads her hands across her vast body. "I think I've arrived."`;
  },
};

// ─── CHARACTER-SPECIFIC TALK RESPONSES ────────────────────────────────────────
// Keyed by student id. Overrides archetype fallback in TALK_RESPONSES.
const CHAR_TALK = {
  // Brittany — Cheer Captain: commanding, competitive, proud, softening over time
  0:{
    how_are_you:(s,st)=>st<=2?`${s.name} tosses her ponytail. "Running tryouts, keeping the squad in line. I've been eating more than usual. Stress probably." She shrugs. "I'm fine."`:st<=4?`${s.name} settles back with the easy authority of someone who's stopped fighting herself. "Good. Really good, actually." She pats her soft belly absently. "I've gotten bigger. I know. I don't care anymore."`:st<=7?`${s.name} grins. "Honestly? Never more comfortable." She smooths her hands over her wide hips. "Retired the uniform drama. Best decision I ever made."`:  `${s.name} looks up with total serenity. "Spectacular." She resumes eating. That's the full answer.`,
    compliment_figure:(s,st)=>st<=2?`${s.name} tilts her chin. "Obviously." There's something almost uncertain under the confidence. "But — thanks."`:st<=4?`${s.name} looks at herself with a complicated expression that settles into pride. "I've grown into myself." She sounds like she's still getting used to believing it.`:st<=7?`${s.name} laughs, surprised by her own pleasure at the comment. "Yeah I look amazing, right? I've gotten big. Whatever. I look incredible."`:  `${s.name} gives you one slow, satisfied look. "I know." She goes back to eating.`,
    food_talk:(s,st)=>st<=3?`"The new place by the stadium has these loaded fries." ${s.name} says this immediately, like it's been waiting. "I've been going every other day. I should stop." She pauses. "I won't stop."`:st<=6?`${s.name} leans forward. "I have opinions. The catering for the spring social was genuinely bad and I have been thinking about it for three weeks."`: `${s.name} laughs. "Food is basically my full personality now." She looks around hopefully. "Is there something here?"`,
    encourage_eating:(s,st)=>st<=2?`${s.name} hesitates. "I mean — " She looks at the food, then takes it. "Okay fine. Don't make it weird."`:st<=5?`"I was already going to." She takes a large bite. "But noted."`: `${s.name} gives you a look. "I don't need the encouragement. I appreciate the enthusiasm." She eats. A lot.`,
    ask_weight:(s,st)=>st<=2?`${s.name} shrugs. "I've put on a bit. Stress eating probably. Not sweating it."`:st<=4?`${s.name} looks at herself. "I know I've gotten big. It just stopped feeling like a problem." She shrugs. "Took me a while to get there."`:st<=7?`${s.name} spreads her hands across her belly with obvious pride. "Enormous. I'm enormous." She grins. "Weighed myself last week. Ordered a victory meal after."`: `${s.name} snorts. "Is that a real question? Look at me." She sounds thoroughly pleased with herself.`,
  },
  // Madeline — Literature PhD: analytical, precise, emotionally private
  1:{
    how_are_you:(s,st)=>st<=2?`Madeline looks up from her book. "Productive. Eating adequately. Thank you." She returns to the book.`:st<=4?`Madeline sets the book down — a significant gesture. "Good. The thesis is going well. I've been eating considerably more. The productivity correlation is interesting." She picks the book back up.`:st<=7?`Madeline closes her book fully. "Excellent. My research is advancing. My appetite has also advanced. Both are noted." She produces a snack. "The data is interesting."`:  `Madeline looks up with vast, placid calm. "I am extremely large and extremely knowledgeable. Both at peak levels."`,
    food_talk:(s,st)=>st<=3?`"I've been making notes on the dining hall's menu construction," Madeline says, as if this is normal. "Academically. Also the library granola bars are very good. I've had eleven today."`:st<=6?`Madeline looks thoughtful. "The campus bakery on Wednesday mornings is an underutilized resource. I've been correcting that." She pats her belly absently.`: `"I know the caloric composition of everything in a three-block radius. This is not intentional. It's what happens when you spend this much time eating and researching simultaneously."`,
    encourage_eating:(s,st)=>st<=2?`Madeline adjusts her glasses. "That's logistically reasonable." She eats with the focused thoroughness of someone conducting a study.`:st<=5?`"I was already planning to." She eats. "Your encouragement is noted. It doesn't change the outcome."`: `Madeline gives you a patient look. "I am aware." She eats. It takes a while. She does not stop.`,
    compliment_figure:(s,st)=>st<=2?`Madeline blinks. "That is — thank you. I don't usually receive data on that." She makes a note. Possibly literally.`:st<=4?`"I've observed the changes," Madeline says. "I find them interesting. Apparently so do you." She sounds mildly pleased.`:st<=7?`Madeline tilts her head. "My research indicates that bodies carrying significant weight are often perceived as impressive. I am beginning to understand this empirically."`: `"Thank you," Madeline says, with the serenity of someone who has accepted a large and accurate truth.`,
  },
  // Kylie — Content Creator: savvy, competitive, image-conscious, evolving
  2:{
    how_are_you:(s,st)=>st<=2?`Kylie checks her phone while answering. "Good. Content is doing well. The dining hall has been incredible this week." She glances at herself. "Numbers are up everywhere."`:st<=4?`Kylie puts her phone face-down, which means this is a real answer. "Really good. My audience loves me right now." She looks at her rounder figure. "Which is saying something."`:st<=7?`"Amazing," Kylie says, and she means it. "My numbers, my brand, my whole life is working." She gestures at herself. "This is working. Can you believe that."`:  `Kylie smiles with the satisfaction of someone who figured it out. "Thriving. Completely." She shows you her phone. The numbers are absurd.`,
    food_talk:(s,st)=>st<=3?`"Rosetti's Tuesday special is a content goldmine," Kylie says immediately. "I've filmed there three times this month. Also the food is genuinely unreal." She lowers her voice. "I've been doing a lot of personal testing."`:st<=6?`"I have a spreadsheet of where I've eaten and how it performed content-wise. Also in terms of how good it was." She pauses. "I'm very thorough."`: `"Food content is my life and food is also my life. These are the same thing now." She looks at herself. "The numbers back me up."`,
    encourage_eating:(s,st)=>st<=2?`Kylie narrows her eyes at you. "Is this for content?" She looks at the food. "Actually — doesn't matter." She eats it.`:st<=5?`"I was already on it," Kylie says, slightly defensively. "I don't need prompting." She is indeed already eating.`: `Kylie laughs. "You don't have to tell me twice. Or once." She's already eating, possibly filming.`,
    ask_weight:(s,st)=>st<=2?`"Yeah, I've gained a bit," Kylie says. "My audience is more into it than I expected. Adjusting my brand accordingly."`:st<=4?`Kylie looks at herself with the calculating eye of a content strategist. "I know. I've decided to lean into it. The metrics support that choice."`:st<=7?`"Enormous and going up," Kylie says, with the tone of a quarterly report. "Brand is thriving. The audience loves this trajectory."`: `Kylie spreads her hands. "I am a monument at this point. A large, well-monetized monument."`,
  },
  // Serena — Track Sprinter: matter-of-fact, competitive, adapting gracefully
  3:{
    how_are_you:(s,st)=>st<=2?`Serena stretches her legs out. "Good. Recovery week. Eating a lot. Probably fine." She glances at her arms. "I look different. My times are different. Working on figuring that out."`:st<=4?`"Good," Serena says, and it's genuinely meant. "I've stopped worrying about the numbers and started worrying about how I feel." She pauses. "I feel better than fine."`:st<=7?`Serena shrugs with comfortable authority. "Good. Moving less, eating more, somehow feel more at ease than I ever did in training." She pats herself. "The science is interesting."`:  `Serena looks at you with the calm of someone who has stopped measuring. "Good," she says simply. That's all she has. It's enough.`,
    food_talk:(s,st)=>st<=3?`"I've been eating a lot of pasta," Serena says. "For energy." Pause. "I know I'm not training right now. Still for energy." Another pause. "In theory."`:st<=6?`"I used to eat to run. Now I eat because eating is good." Serena says this like a personal philosophy. "This is better. I stand by it."`: `"My whole relationship with food changed when I stopped tracking it. I used to eat strategically. Now I just eat a lot." She pats her middle. "Much simpler."`,
    encourage_eating:(s,st)=>st<=2?`Serena considers this with athletic seriousness. "Recovery nutrition logic. Valid." She eats it like she means business.`:st<=5?`Serena is already eating. She acknowledges your suggestion with a brief nod mid-bite.`: `"Were you not watching me?" Serena asks. She has been eating for the last five minutes without pausing.`,
    ask_weight:(s,st)=>st<=2?`"Yeah, I've put on some weight," Serena says. "Off-season. Not worried about it. Bodies change."`:st<=4?`Serena looks at herself. "A lot, honestly. Weirdly okay with it." She sounds surprised by this. "I thought I'd be more upset. I'm not."`:st<=7?`"Big," Serena says, easily. "I'm big. That's fine." She shifts. "I used to be fast. Now I'm large. These are just different sports."`: `Serena spreads her arms. "Enormous. I used to run eight miles. Now I mostly watch running on TV." She seems at total peace with this fact.`,
  },
  // Fiona — Fine Art Major: dreamy, observational, food-as-aesthetic
  4:{
    how_are_you:(s,st)=>st<=2?`Fiona looks up from her sketchbook. "I'm exploring something. The relationship between negative space and a body that doesn't have much of it." She gestures at herself. "I'm working on it."`:st<=4?`Fiona sets down her pencil. "Good. My work is going somewhere and I am also going somewhere." She looks at her rounder figure. "I think they're the same direction."`:st<=7?`"Really good." There's paint on her cheek and something peaceful in her eyes. "I've been painting bodies. Lots of body. Including this one." She pats herself fondly.`:  `Fiona looks up with the distant serenity of someone who has transcended their own biography. "The work is good," she says. "I am extremely large and the two things are connected."`,
    food_talk:(s,st)=>st<=3?`"I've started painting food," Fiona says. "Still lifes. Bowls of things." She holds up her sketchbook. Very detailed cheese board. "The subject keeps eating into the art somehow. Literally."`:st<=6?`"Food is a medium," Fiona says, with complete sincerity. "I've been working with it. Not just visually. Also by eating a lot of it. That's also artistic research."`: `Fiona spreads her arms. "My body has become the piece. The eating is the practice." She sounds genuinely moved by this. "Also I'm hungry. Do you have anything?"`,
    compliment_figure:(s,st)=>st<=2?`Fiona tilts her head. "There's an interesting angularity to it," she says. "Like a study in lines. Though I'm working on adding more texture." She picks up her pencil.`:st<=4?`Fiona looks at herself with an artist's eye. "It's changing. Rounding. More interesting to draw." She doesn't seem to be paying you a compliment back but she's clearly pleased.`:st<=7?`"The proportions are becoming significant," Fiona says. "I've been working from my own figure. The abundance of it is — yes." She seems to be agreeing with both you and a private aesthetic theory.`: `Fiona looks at you and then at herself, as if confirming something. "The scale is correct," she says. It's a compliment to herself, which she shares with you.`,
  },
  // Destiny — Pro Streamer: dry, direct, minimal, doesn't explain herself
  5:{
    how_are_you:(s,st)=>st<=2?`Destiny doesn't look up from her phone. "Fine. Chat hates my desk setup. Getting a new one."`:st<=4?`"Good." Pause. "Chat's being supportive about the weight thing which is weird. I didn't ask them." Another pause. "Not complaining."`:st<=7?`"Good." Destiny adjusts herself in her chair. "Numbers are up. Chair is new. There's food within arm's reach." She nods. "Good situation."`:  `Destiny looks at you. "Good." She's eating. She continues eating. That's the whole answer.`,
    food_talk:(s,st)=>st<=3?`"Ramen," Destiny says. "That's it. That's the food talk." She's eating ramen.`:st<=6?`"My sponsors send food. I eat it on stream. Viewers enjoy it. Simple." She gestures at the pile of boxes. "This week's was good."`: `"The supply chain between the door and my chair is now optimized. There is always food within reach." She does not elaborate. She doesn't need to.`,
    encourage_eating:(s,st)=>st<=2?`Destiny looks at you. Looks at the food. Eats it. No comment.`:st<=5?`"I was already going to." She eats. That's it.`: `Destiny doesn't respond. She was already eating. She continues. This tracks.`,
    ask_weight:(s,st)=>st<=2?`"Yeah." That's it. Destiny goes back to her phone.`:st<=4?`"I know." She keeps scrolling. "Chat talks about it constantly. I don't respond. They keep talking about it anyway."`:st<=7?`Destiny looks at herself briefly. "A lot." She looks back at her screen. "The numbers are good. Both kinds."`: `Destiny doesn't look up. "Maximum," she says. She means it in all senses.`,
  },
  // Tiffany — Chapter President: warm, social, perfectly at ease, natural hostess
  6:{
    how_are_you:(s,st)=>st<=2?`Tiffany sets down her event binder. "Wonderful, thank you for asking." She gestures at the spread on her desk. "I've been stress-catering for the spring formal and the research casualties are on me."`:st<=4?`Tiffany beams. "Perfect. The chapter is thriving. I'm thriving." She smooths her skirt over her rounder figure. "I've been hosting dinners basically every night." Beat. "Somebody has to test the menu."`:st<=7?`"Exceptional," Tiffany says with genuine warmth. "Never been more comfortable and the chapter has never been better organized." She pats her enormous belly. "Never been fuller. All good metrics."`:  `Tiffany spreads her arms. "Spectacular." She settles deeper. "Sit down, there's food." There is always food when Tiffany is present.`,
    food_talk:(s,st)=>st<=3?`"I have opinions," Tiffany says, which is an understatement. "The new venue catering is inadequate. I've been doing personal calibration dinners to set a benchmark." She slides you a spreadsheet.`:st<=6?`Tiffany leans forward. "The alumni chapter dinner last week was exceptional. I ate my weight in passed appetizers." She considers. "I mean. Not literally. Aspirationally."`: `"I consider myself a professional eater at this point," Tiffany says serenely. "The chapter agrees. They've stopped offering me the salad option. I appreciate the respect."`,
    compliment_figure:(s,st)=>st<=2?`Tiffany smiles warmly. "You're sweet. I've been hosting a lot of events. Food is a love language." She pats her hands together. "I accept the compliment on behalf of all the dinners."`:st<=4?`Tiffany tilts her chin up with practiced grace. "Thank you. I've been filling out." She smooths her skirt. "The chapter says I look 'maternal.' I've decided to take that as a compliment."`:st<=7?`Tiffany laughs with genuine delight. "Thank you. I've really grown into myself, haven't I." She looks down with obvious satisfaction. "More of me to love. More hosting capacity."`: `Tiffany accepts the compliment the way she accepts an excellent dinner: with serene, thorough pleasure. "Obviously," she says.`,
  },
  // Priya — Triple Major: driven, documents everything, secretly a pioneer in her own study
  7:{
    how_are_you:(s,st)=>st<=2?`Priya looks up from three laptops. "Good. On track. I've been eating more during study sessions." She pops a snack. "I've documented the productivity correlation. Results are interesting."`:st<=4?`Priya is already pulling up a spreadsheet. "Good. Three papers, two internships, significant weight gain — also studying." She says this completely levelly.`:st<=7?`"Peak performance," Priya says, and she means it in every sense. "Output is up. Weight is up. Charts are very interesting right now."`:  `Priya looks at you with serene, data-backed confidence. "I am achieving everything simultaneously. The charts are at their best." She produces a graph.`,
    food_talk:(s,st)=>st<=3?`"I've been optimizing caloric intake per study hour," Priya says. "The peak productivity window is wider than expected." She eats something efficiently. "I have a paper on this."`:st<=6?`Priya pulls up a document. "I published on this. Adaptive caloric strategy as cognitive performance enhancement. Peer reviewed. Passed. Very proud."`: `"My relationship with food is a published academic topic," Priya says. "This is the most on-brand thing that has ever happened to me." She's eating while saying this.`,
    encourage_eating:(s,st)=>st<=2?`Priya considers. "Caloric augmentation during high-output periods is well-supported." She eats it efficiently. "Documented."`:st<=5?`"I was already factoring that in," Priya says. She has a spreadsheet open. She's eating. Both are happening at once.`: `Priya looks at you briefly. "I have a system." She returns to the system. The system involves eating constantly.`,
    ask_weight:(s,st)=>st<=2?`"I've logged a consistent gain trend," Priya says. "It correlates with productivity increases. I find the data compelling."`:st<=4?`Priya pulls up a chart. "I've been tracking it." The chart is meticulous. "The correlation with output metrics is statistically significant."`:st<=7?`"Extensive," Priya says. "I've gained more weight this semester than most people gain in a decade. My thesis documents every pound." She seems proud of this.`: `"I am an enormous data set," Priya says. "A very large, very interesting, very well-documented data set."`,
  },
  // Maya — Studio Art Minor: quiet, observational, opens up only with deep trust
  8:{
    how_are_you:(s,st)=>st<=2?`Maya looks up from her notebook, takes a moment. "...Good." Goes back to drawing. After a beat: "Thank you for asking."`:st<=4?`Maya looks at you more directly than usual. "Good." A pause. "I've been eating more. Drawing more. They're connected somehow." She looks at the notebook. "Still working out how."`:st<=7?`Maya smiles — quiet but real. "Good." She looks at herself, at the space she takes up. "I like how I feel right now." She's not asking for input on that.`:  `Maya looks up with immense, peaceful presence. "Good," she says. It doesn't need anything else.`,
    food_talk:(s,st)=>st<=3?`Maya's expression shifts to something more animated. "The place near the art building has this pastry — " She stops, almost shy. "It's very good. I go three times a week." She goes back to drawing.`:st<=6?`Maya holds up her sketchbook. There are very detailed drawings of food among the figure studies. "It's the same thing," she says quietly. "Looking closely at something you love."`: `"I have favorite foods the way I have favorite colors," Maya says. "It's how I understand the world." She pats her enormous middle with complete ease.`,
    compliment_figure:(s,st)=>st<=2?`Maya looks up, surprised. She looks at herself, then back at you. "...Oh." A long pause. "Thank you." She looks at her notebook. You think she might be smiling.`:st<=4?`Maya is quiet for a moment. "I've been noticing too," she says finally. "That I look different." Her voice is soft. "I think I like it." She goes back to drawing.`:st<=7?`Maya looks at you steadily and says nothing for a moment. Then: "I know." Not vain. Just — certain. She pats herself and picks up her pencil.`: `Maya nods once. She already knew. She's fine with it. She's been fine with it for a while.`,
  },
  // Chloe — Transfer Student: curious, enthusiastic, discovering herself
  9:{
    how_are_you:(s,st)=>st<=2?`Chloe looks up with the wide-eyed energy of someone very awake. "Good! Great! There's so much to try here, I'm still — " She gestures vaguely. "Exploring. Extensively."`:st<=4?`"Really good," Chloe says, and means it. "I've been here a while and it finally feels like home." She looks at herself. "I'm significantly heavier. Those two things are related."`:st<=7?`Chloe beams. "I feel like a real student here." She pats her soft belly. "A large student. A real one. This campus made me who I am."`:  `Chloe looks settled in a way she didn't when she arrived. "Good. Very good." She looks at herself with complete comfort. "I found my people. Same day I found the good food spots."`,
    food_talk:(s,st)=>st<=3?`Chloe basically levitates. "Oh, food talk? The dining hall on Thursdays — okay but also the underground market, have you been? Also there's this place — " She has a lot of places. She keeps going.`:st<=6?`"This campus has the best food I've ever had anywhere," Chloe says, with the authority of research. "I've been thorough." She pats herself. "The data is conclusive."`: `"My whole identity here is tied to the food," Chloe says, and this doesn't bother her at all. "Maya started me on it and I just kept going." She looks extremely comfortable with this.`,
    encourage_eating:(s,st)=>st<=2?`Chloe brightens like you just gave her permission. "Yeah? Yeah!" She eats it with the energy of someone who really wanted to do that.`:st<=5?`Chloe laughs. "You don't have to tell me twice. I was already — " She's already eating.`: `Chloe grins. "The encouragement is sweet but honestly unnecessary at this point." She eats a lot. Happily.`,
    ask_weight:(s,st)=>st<=2?`"I've gained some weight since I got here," Chloe says. "Which makes sense. I've been eating everything." She sounds genuinely pleased by this.`:st<=4?`"A lot, actually," Chloe says. "Campus food is incredible. I've been doing very thorough exploration." She looks at herself. "The results speak for themselves."`:st<=7?`Chloe spreads her hands across her substantial middle. "Enormous by my standards. I came here and I just — grew into this place." She grins. "Best transfer decision ever."`: `Chloe looks at you like this is a wonderful question. "A whole new person," she says. "A very large new person. Same enthusiasm, more surface area."`,
  },
  // Jasmine — Dance Co-Captain: loud, expressive, loves everything at full volume
  10:{
    how_are_you:(s,st)=>st<=2?`Jasmine grins at full wattage. "Amazing! New piece, insane schedule, ate an incredible amount at dinner last night." She says all of this at equal volume.`:st<=4?`"SO good," Jasmine says. "My choreo is evolving, my costumes need to evolve, and I found a restaurant with portions —" She holds her hands far apart. "This big. Every dish."`:st<=7?`Jasmine spreads her arms wide. "AMAZING. Everything is amazing." She looks at herself with pure, uncut delight. "I've gotten huge and my movement is somehow better? I don't fully understand it but I'm leaning in."`:  `Jasmine is beaming. "Wonderful," she announces. "Enormous and wonderful." She reaches for food. "Those are the same thing for me now."`,
    food_talk:(s,st)=>st<=3?`Jasmine claps once. "The Italian place near the studio does a four-cheese pasta that I think about during rehearsal. It's a problem. I've been four times this week."`:st<=6?`"I order based on what will bring me the most joy per bite," Jasmine says. "I have a system. Very good system. Very large portions."`: `"I have never been more enthusiastic about eating in my life," Jasmine says. "And I was always enthusiastic. This is new levels." She looks around for more.`,
    compliment_figure:(s,st)=>st<=2?`Jasmine beams. "Thank you! I feel great." She does a little spin. Still very graceful. "I've been eating well and it shows."`:st<=4?`Jasmine claps her hands together. "Right?! I've really filled out." She looks down at herself with obvious delight. "My costumes are a whole project but I look incredible."`:st<=7?`Jasmine does a little shimmy in her chair, which takes some doing. "YES. Thank you. I am HUGE and I look AMAZING." She seems genuinely overjoyed by both facts.`: `Jasmine throws her head back. "I KNOW. Thank you. The scale of me is something else." She's delighted. She is always delighted. It just keeps scaling up.`,
  },
  // Emma — Cultural Studies: gentle, intellectual, finds meaning in everything
  11:{
    how_are_you:(s,st)=>st<=2?`Emma smiles softly. "Good. I've been doing fieldwork on campus food culture." She gestures at the tea and spread. "Very hands-on fieldwork."`:st<=4?`Emma looks up with a warm expression. "Really good. My research is going somewhere interesting and I've been eating very well." She pats her soft middle. "Both connected, I think."`:st<=7?`"Wonderful," Emma says. "PhD application in, at my heaviest, genuinely at peace." She takes a sip of tea. "I think that's what growth looks like."`:  `Emma looks up with quiet, full contentment. "Good," she says softly. "Quite large and quite happy and quite full." She takes another bite. "All three feel right."`,
    food_talk:(s,st)=>st<=3?`Emma brightens. "I've been tracing food customs across three cultures for my thesis. Very thorough tasting methodology required." She holds up notes. They are extensive.`:st<=6?`"I wrote my last paper over tea cakes for three hours," Emma says. "I ate a lot of tea cakes." She looks at her rounder figure. "Studying food culture as a lived experience. Very immersive."`: `"Food is how I understand every culture I study," Emma says. "Also how I understand myself, apparently." She gestures at her enormous form. "The immersion has been significant."`,
    encourage_eating:(s,st)=>st<=2?`Emma hesitates, then smiles. "I suppose it would be rude not to." She eats it thoughtfully.`:st<=5?`"Oh — yes, I was going to." Emma reaches for more with gentle enthusiasm.`: `Emma laughs softly. "I was already well ahead of you on that." She eats with the serene momentum of someone who hasn't stopped.`,
    ask_weight:(s,st)=>st<=2?`"I've been gaining a little," Emma says. "The fieldwork requires extensive tasting. It would be unscholarly not to eat." She takes a sip of tea.`:st<=4?`Emma looks at herself thoughtfully. "Quite a lot, actually. I've been very thorough in my research." She sounds genuinely content.`:st<=7?`"Significantly," Emma says, with scholarly care. "More than I've ever weighed. More than I expected." She pauses. "I find I don't mind at all. The research continues."`: `Emma looks at you with peaceful, enormous calm. "Extensively," she says. "I'm very thoroughly myself now." She takes another bite.`,
  },
  // Roxanne — Music & Visual Art: passionate, loud, full commitment to everything
  12:{
    how_are_you:(s,st)=>st<=2?`Roxanne looks up from her sketchbook. "Intense. Show's in three weeks. Studio fourteen hours a day. Also there's this incredible taco truck by the arts building." These seem equally important.`:st<=4?`"GREAT," Roxanne says at her standard volume. "My work is going well and I've been eating at full capacity, which is my preferred state." She taps her round belly. "I work better big."`:st<=7?`Roxanne makes an expansive gesture. "Amazing. Everything is at maximum intensity." She's eating while talking. "My band, my art, my appetite. All peak."`:  `"Phenomenal," Roxanne says, at great volume. "Enormous and loud and producing the best work of my life and eating constantly." She spreads her arms. "This is the good timeline."`,
    food_talk:(s,st)=>st<=3?`Roxanne leans forward immediately. "Street food. Taco truck by the studio. Dumpling cart on Thursdays. Have you been? Go." She seems personally invested in your food journey.`:st<=6?`"Food is the same as music to me," Roxanne says. "It's about intensity. Volume. The big experience." She pats her side. "I pursue it the same way."`: `"I eat like I make music," Roxanne announces. "Loud, a lot, full commitment." She looks at herself with satisfaction. "The audience is me and I'm a great audience."`,
    compliment_figure:(s,st)=>st<=2?`Roxanne looks up with the focused energy she brings to everything. "Yeah? Cool. I'm working on it." She returns to her sketchbook, but there's a small smile.`:st<=4?`Roxanne is briefly, visibly pleased before returning to full volume. "RIGHT? I've been eating a lot and apparently it suits me." She gestures at herself expansively.`:st<=7?`"YES," Roxanne says immediately and at volume. "I KNOW. I look incredible. I feel incredible." She thumps the table once for emphasis. "Maximum."`: `Roxanne points at you. "Correct." She points at herself. "Enormous. Magnificent. Maximum." She goes back to eating at full commitment.`,
  },
  // Aaliyah — Basketball Star: easygoing, confident, nothing fazes her
  13:{
    how_are_you:(s,st)=>st<=2?`Aaliyah leans back. "Good. Off-season so just eating and vibing." She looks at her arms. "I look different. I feel different." Beat. "Good different, actually."`:st<=4?`"Really good," Aaliyah says, with the ease of someone who doesn't stress about things. "Retired the athletic schedule, added a full culinary one. The tradeoff is working out."`:st<=7?`Aaliyah grins. "Excellent." She shifts her considerable weight. "I used to move for a living. Now I mostly eat. Both are valid. I'm good at both."`:  `Aaliyah looks at you with easy, enormous calm. "Perfect," she says. "Never been more comfortable in my life." She reaches for more food. "You want some?"`,
    food_talk:(s,st)=>st<=3?`"Burgers," Aaliyah says immediately. "The place on the corner does a double that's ridiculous. I've been twice this week." Pause. "Three times. Three times this week."`:st<=6?`Aaliyah gets a focused expression — the same one she used to get about basketball. "You want my actual thoughts on food near campus? I've done the research." She has clearly done the research.`: `"I have a rotation," Aaliyah says. "Six places, hit each one in a cycle, best food every day." She pats her belly with deep satisfaction. "The system works."`,
    encourage_eating:(s,st)=>st<=2?`Aaliyah gives you an easy grin. "I was thinking about it." She eats it. No drama.`:st<=5?`Aaliyah already has another bite going. She nods at you. "Ahead of you."`: `Aaliyah gives you a look of comfortable disbelief. "Was I not?" She's been eating this whole time.`,
    ask_weight:(s,st)=>st<=2?`Aaliyah shrugs easily. "Yeah I've been eating a lot. Off-season. Body changes." She doesn't seem remotely concerned.`:st<=4?`"A lot," Aaliyah says. "I don't weigh myself but I can tell." She looks at herself. "I'm good with it. I was always too intense about numbers."`:st<=7?`Aaliyah spreads her hands on the table. "Huge," she says comfortably. "I'm huge. Used to be fast. Now I'm heavy." She shrugs. "Both are just facts."`: `Aaliyah looks at you with complete equanimity. "Enormous," she says. "By any reasonable measure." She returns to eating. No big deal.`,
  },
  // Sophie — New Pledge: sweet, eager, discovering herself, growing in confidence
  14:{
    how_are_you:(s,st)=>st<=2?`Sophie perks up immediately. "Good! Really good! I'm still learning everything but Tiffany's been amazing and the food at events is — " She stops herself. "I've been eating a lot. It's fine."`:st<=4?`Sophie smiles, more settled. "Really good, actually. I feel like I'm finding my footing." She looks at herself. "I've gotten bigger. I don't mind as much as I thought I would."`:st<=7?`"Good," Sophie says with new, easy confidence. "Really good. I stopped worrying and started enjoying things." She gestures at her full figure. "This is the enjoying-things version of me."`:  `Sophie looks at you with the warm, settled glow of someone who's found their home. "Amazing," she says. "I am very large and very comfortable and I have stopped apologizing for things." She smiles. "It's great."`,
    food_talk:(s,st)=>st<=3?`"Oh! The bakery near the chapter house does these cupcakes — " Sophie lights up completely. "I've had one every day for three weeks. I'm not sure they're healthy." Pause. "I'm going back tomorrow."`:st<=6?`Sophie grins. "I've become the unofficial chapter food scout. Everyone comes to me for recommendations now." She sounds genuinely pleased. "I've been doing very thorough research."`: `"Food is my love language," Sophie says, and then looks slightly surprised that she said it out loud. "That's a thing I believe. That I just said." She nods. "Yeah. That's me."`,
    compliment_figure:(s,st)=>st<=2?`Sophie blinks, then smiles — a little uncertain but warm. "Oh — thank you. I've been eating a lot at chapter events. It shows, I guess." She touches her slightly softer middle.`:st<=4?`Sophie's whole expression softens into something genuinely pleased. "Really?" She looks at herself. "I've been getting more comfortable with it. With all of it." She smiles.`:st<=7?`Sophie straightens up with visible, easy pride. "Thank you. I used to be so nervous about everything." She smooths her hands over her sides. "I think I'm doing okay."`: `Sophie smiles with the full confidence of someone who has arrived. "Thank you. I've figured out what suits me." She pats her enormous belly. "Apparently this suits me."`,
    encourage_eating:(s,st)=>st<=2?`Sophie hesitates, then brightens. "Okay yeah? Yeah." She eats it with the energy of someone who just got permission they really wanted.`:st<=5?`Sophie laughs. "You don't have to tell me twice. I was already — " She's already eating.`: `Sophie gives you a warm grin. "The encouragement is appreciated but honestly unnecessary now." She eats a lot. Happily.`,
  },
};

// ─── GOSSIP SYSTEM ────────────────────────────────────────────────────────────
// Every girl talks about 2 classmates. 4 stage brackets: low(0-2)/mid(3-5)/high(6-8)/blob(9)
// All have offerHelp + helpMultiplier. helpReason describes motivation shown in UI.

const GOSSIP = [

  // ── BRITTANY (0) ── about Jasmine & Sophie
  { speakerId:0, targetId:10, attitude:"catty",
    lines:{
      low:[
        `Brittany rolls her eyes. "Jasmine's been skipping practices. Her uniform was really tight last week. I didn't say anything." She examines her nails. "Not that I was looking."`,
        `"Jasmine and I co-captained for two years and I support her but she ate four slices at team dinner. Not that I was counting."`,
      ],
      mid:[
        `Brittany's expression is complicated. "Jasmine is huge now. Everyone notices." A pause. "She seems annoyingly happy though. I don't know how she does it."`,
        `"She can't do the jumps anymore," Brittany says, then laughs despite herself. "She just sways. And she's still the loudest person in the room. It's infuriating."`,
      ],
      high:[
        `Brittany prods her own soft middle. "Jasmine's enormous. Way bigger than me even." A pause. "She just owns it. I kind of respect that. Annoyingly."`,
        `"Don't tell her I said this," Brittany says, "but Jasmine looks amazing. Huge and loud and happy." She glances at herself. "Maybe being big isn't the worst thing."`,
      ],
      blob:[
        `Brittany is quiet for a long moment. "Jasmine's basically immovable now. She holds court from her couch and people go to her." A pause. "I've started going too." She pats her own enormous belly. "She feeds everyone who visits."`,
        `"I went to see Jasmine last week," Brittany says. "She's enormous." She looks at her own very round belly. "She told me I was catching up. She seemed pleased." A beat. "I was also pleased. Somehow."`,
      ],
    },
    offerHelp:`Brittany's eyes narrow. "Okay. When Jasmine's bigger than me, I look smaller by comparison. Simple math." She examines her nails. "I could make sure she keeps growing. It's basically a public service. For my ego."`,
    helpReason:"Spite & comparison — Brittany wants Jasmine bigger to look relatively slim herself.",
    helpMultiplier:1.38,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Okay she is genuinely bigger than me right now and that is simply not acceptable. I'm escalating. I'm taking her to lunch every single day and I'm ordering for both of us and she is going to be so enormous that I look absolutely svelte by comparison. This is a tactical decision and I feel great about it."},
    {atLbs:250, addMult:0.20, line:"Two hundred and fifty pounds. She's enormous. I'm almost impressed — emphasis on almost because she is still bigger than me and that is the situation I am SOLVING. Daily dessert hauls. Premium delivery. She gets everything she wants. I am incredibly generous when I have a motive."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds. Jasmine is three hundred pounds. She is a goddess and I am her devoted feeder and absolutely none of this is because I think she's incredible, it's purely strategic. I'm sending another food box. The biggest one. She deserves it. For my purposes. My purely self-interested purposes."},
  ],
  },
  { speakerId:0, targetId:14, attitude:"catty",
    lines:{
      low:[
        `Brittany barely remembers Sophie exists. "The new pledge? She's fine. A bit nervous. Eats a lot at events." She shrugs. "Freshmen."`,
        `"Sophie follows Tiffany around everywhere," Brittany says. "She's already getting soft. Tiffany's done that to her." She sounds almost knowing. "The dining hall does the rest."`,
      ],
      mid:[
        `Brittany tilts her head. "Sophie's actually getting kind of big. Noticeably. She's gotten a lot more confident too." A pause. "I like her better now, weirdly."`,
        `"Sophie filled out completely," Brittany says. "She came in nervous and now she waltzes into every event." She sounds impressed despite herself.`,
      ],
      high:[
        `"Sophie is massive," Brittany says. "Bigger than me at this point." She sounds almost fond. "She carries herself completely differently now. It's actually a glow-up."`,
        `Brittany nods slowly. "Sophie's one of the big girls now. I've started talking to her more." She prods her belly. "We've been going to brunch. She orders everything."`,
      ],
      blob:[
        `"Sophie can barely move," Brittany says, and there's genuine warmth under the words. "She's enormous. She texts me photos of her meals and they're absolutely absurd." She laughs. "I send her recommendations. We have a whole thing now."`,
        `Brittany looks genuinely surprised by herself. "Sophie became this big, happy person right in front of me and I didn't even notice until she was huge." She smiles. "I think I'm proud of her? Weird."`,
      ],
    },
    offerHelp:`Brittany examines her nails. "If Sophie keeps growing, people stop looking at me as the one who let herself go. Fresh meat." She pauses, then something softer crosses her face. "Also she's sweet and she deserves to be comfortable. Both things are true."`,
    helpReason:"Deflection & unexpected fondness — Sophie draws attention away, but Brittany genuinely likes her too.",
    helpMultiplier:1.3,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Sophie hit two hundred and I got genuinely emotional about it, which is not a thing I advertise. She came in as this little nervous thing and now she is soft and confident and huge and I want to make sure she keeps going. I'm taking her to brunch twice a week. Maybe three times. She orders everything when I'm there."},
    {atLbs:250, addMult:0.20, line:"Sophie is two-fifty and she sent me a selfie and she looked so HAPPY and I immediately ordered her a care package from that bakery she loves. I'm not soft. I'm strategically generous. The strategy is 'make Sophie enormous and feel like the best version of herself.' I contain multitudes."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds on Sophie. God. She looks incredible. I'm texting her daily food recommendations and she follows every single one and I know because she sends me photos and each one is better than the last. This is my legacy project and it is going extremely well. I am so proud. Don't tell her."},
  ],
  },

  // ── MADELINE (1) ── about Emma & Priya
  { speakerId:1, targetId:11, attitude:"warm",
    lines:{
      low:[
        `Madeline glances up from her book. "Emma's been bringing considerably more snacks to the library. I haven't said anything because I've been benefiting from it."`,
        `"Emma and I study together. She used to bring tea and a biscuit. Now she brings a whole spread." Madeline pauses. "I've been eating significantly more. I think she's contagious."`,
      ],
      mid:[
        `"Emma is getting very round," Madeline says, in the tone of someone describing a research finding. "Her cardigan doesn't close anymore." A pause. "Also she brought incredible pastries to our last session and I ate four of them."`,
        `"Emma's thesis is on eating cultures now. Hands-on research. You can tell." Madeline sounds approving. "She's gotten quite big. Very round cheeks."`,
      ],
      high:[
        `"Emma is enormous and brilliant and I find both equally impressive," Madeline says simply. "Published a paper last month. Also outgrown two desk chairs. Most ambitious self-study in the department."`,
        `"We've both gotten very fat this semester." She says it neutrally. "We don't discuss it. We just bring more food to study sessions. The research is going well."`,
      ],
      blob:[
        `Madeline is quiet for a moment. "Emma can't really come to the library anymore. I bring books to her." She adjusts her glasses. "She's enormous. She studies from bed surrounded by food and has published three papers this year." A pause. "I find this inspiring."`,
        `"Emma and I had our best study session in months last week," Madeline says. "She barely moves. I brought everything and we sat for six hours." She pats her own very round belly. "We are both very large scholars. I think that's the best outcome."`,
      ],
    },
    offerHelp:`Madeline looks thoughtful. "Emma is motivated by snack incentives. If I brought her favourite pastries every study session — and we study a lot — the caloric accumulation would be statistically significant." She blinks. "I could do that. For research. And because I like her."`,
    helpReason:"Genuine affection & academic curiosity — Madeline wants Emma to thrive and the data is interesting.",
    helpMultiplier:1.35,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Emma is two hundred pounds and her R-squared value is extraordinary and I have increased the pastry quantity at our study sessions by forty percent, which correlates with a statistically significant uptick in her productivity AND her weight, and I am tracking both because both matter and I am a scientist who is also very fond of her."},
    {atLbs:250, addMult:0.20, line:"Two hundred and fifty. The trajectory is remarkable. I have commissioned a custom weekly delivery from the patisserie she mentioned once six weeks ago, because I retain relevant data, and she is going to be so wonderfully enormous by the end of semester and the research is going to be extraordinary and so is she."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Emma, brilliant and enormous, and I am running a continuous supply operation that she assumes is 'just how I am' and technically that is correct, this is just how I am, I am someone who loves her and tracks her intake with a level of rigour that would look concerning in any other context but here is simply called thorough."},
  ],
  },
  { speakerId:1, targetId:7, attitude:"curious",
    lines:{
      low:[
        `"Priya is extraordinary," Madeline says. "She schedules everything including apparently her stress eating. She has a spreadsheet. I've glimpsed it. Very thorough."`,
        `"Priya and I use the same study room sometimes. She eats constantly while she works. More than me, which is saying something." She sounds intrigued. "Her output correlates with her intake."`,
      ],
      mid:[
        `"Priya has gotten quite big and turned it into a thesis topic," Madeline says admiringly. "I reviewed her methodology. It's rigorous. She is her own primary source." A pause. "Inspired, honestly."`,
        `"Priya published about her own weight gain as a study in adaptive behaviour," Madeline says. "I cited it. We've been comparing notes. She is getting extremely large." She looks at her own rounder figure. "So am I. Different methodologies, similar conclusions."`,
      ],
      high:[
        `"Priya and I are the two fattest academics in the department," Madeline says, with what sounds like pride. "We have been comparing data. The convergence is striking." She pats her enormous belly. "Good work, both of us."`,
        `"Priya can barely fit into the study rooms now," Madeline notes. "We've been meeting in the wider seminar space. She brings food. I bring food. We eat and argue about methodology." She smiles. "Perfect."`,
      ],
      blob:[
        `"Priya is immense," Madeline says simply. "She completed her PhD from home, in bed, surrounded by food, and it was excellent work." She pauses. "I find her inspiring. The body as data set, taken to its logical conclusion."`,
        `Madeline looks almost wistful. "Priya and I used to compete academically. Now we compete in other metrics." She glances at her own vast frame. "She is currently ahead. I intend to close the gap."`,
      ],
    },
    offerHelp:`Madeline taps her pen. "Priya eats more when she's in scholarly discussion. If I arranged weekly research meetings with extensive refreshments — I know her preferences exactly — her data would become very compelling very quickly." She pauses. "For science."`,
    helpReason:"Research interest — Madeline wants to compare outcomes. Priya is a fascinating parallel subject.",
    helpMultiplier:1.3,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Priya has hit two hundred and made a chart about it and I have reviewed the chart and it is good work and I am choosing to contribute further data points by ensuring that every single co-study session is catered to her exact documented preferences. Science demands replication. I am replicating. Extensively."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Priya. The comparative study is approaching publishable levels and I am sending her a weekly research stipend in the form of a premium grocery order and she is logging it as 'collaborative fuel allocation' which is the most Priya thing that has ever happened and I love it and I want her to get so much bigger."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds and Priya sent me a graph of our comparative weight trajectories and I am behind by eleven pounds and I consider this a crisis and I am addressing it for personal reasons while simultaneously ensuring her supply chain is uninterrupted. Two goals. One strategy. I am very efficient."},
  ],
  },

  // ── KYLIE (2) ── about Tiffany & Destiny
  { speakerId:2, targetId:6, attitude:"catty",
    lines:{
      low:[
        `Kylie glances at her phone. "Tiffany's looking softer in her last three posts. Her engagement is actually up though." She tilts her head. "Which is interesting."`,
        `"Tiffany's definitely gained," Kylie says. "Her usual outfits aren't fitting. Her followers love it, weirdly. It's throwing off my metrics."`,
      ],
      mid:[
        `"Tiffany is getting huge and her content is doing better than mine," Kylie says. She crosses her arms. "Her aesthetic is genuinely good though. I hate it."`,
        `"I kind of want to interview Tiffany," Kylie admits. "Big happy sorority queen thing. It works visually." A reluctant pause. "Annoying how good she looks."`,
      ],
      high:[
        `"Tiffany kind of inspired my whole rebrand," Kylie says. "Seeing her just be huge and confident — that unlocked something." She gestures at herself. "I started leaning into my own trajectory."`,
        `"I did a collab with Tiffany. We met for dinner and were there three hours." She looks thoughtful. "I've eaten a lot more since then. My numbers went up."`,
      ],
      blob:[
        `"Tiffany is massive now. Actually immobile-level massive." Kylie is quiet. "She did a video from her bed surrounded by food and it got four million views." A beat. "Four million. I have a whole team and she beats me from a bed." She sounds equal parts irritated and awed. "I've been visiting her to pick up tips."`,
        `Kylie sighs. "Tiffany doesn't even have to try anymore. She just exists and people watch." She looks at her own very round body. "I've been getting there. She gives me advice." A pause. "The advice mostly involves eating more. It's working."`,
      ],
    },
    offerHelp:`Kylie smiles slowly. "If Tiffany keeps getting bigger, she keeps generating content that makes mine look comparatively polished. And also — the bigger she is, the better I look next to her." She tilts her head. "Completely cynical. I'll host dinners."`,
    helpReason:"Optics & content strategy — Tiffany bigger means Kylie looks good by comparison and gets material.",
    helpMultiplier:1.38,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Tiffany is two hundred pounds and absolutely dominating her corner of the internet and I need to be in her orbit when that number keeps climbing because the content at three hundred is going to be INSANE and I want exclusive behind-the-scenes access and I am achieving this by making sure she is continuously, lavishly fed every time I see her."},
    {atLbs:250, addMult:0.20, line:"Two-fifty Tiffany is my most engaged collab partner and also the most impressive person I have ever filmed and I have started quietly coordinating her meal deliveries because I need her at maximum capacity at all times. This is content strategy. I am very professional about it. I also genuinely cannot stop watching her eat."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Tiffany, effortlessly enormous and growing, and I am funding this personally at this point. Premium catering, weekly spreads, anything she mentions wanting. Her audience is in millions. My investment is paying off. Also she's magnificent and I would do this anyway but I'm choosing to frame it as business."},
  ],
  },
  { speakerId:2, targetId:5, attitude:"curious",
    lines:{
      low:[
        `Kylie looks uncertain. "Destiny streams herself eating constantly and people love it. Like, a lot of people." She tilts her head. "I don't understand her audience but the numbers are real."`,
        `"Destiny doesn't do anything I do and yet she has more followers than me in her niche." Kylie sounds slightly pained. "She just eats and games. And she's getting noticeably larger."`,
      ],
      mid:[
        `"Destiny's gotten really big and her viewership keeps climbing," Kylie says. "I've been studying her approach." A pause. "The approach seems to be: eat a lot, don't care, be authentic." She looks down at herself. "Hm."`,
        `"I reached out to Destiny about a collab." Kylie adjusts her hair. "She said she'd think about it but she was eating at the time and seemed distracted. Very on brand."`,
      ],
      high:[
        `"Destiny and I have done two collabs now. She's enormous and incredibly watchable." Kylie sounds reluctantly impressed. "She eats everything on camera and just doesn't care." She smooths her own thicker middle. "My numbers went up both times."`,
        `"I've learned a lot from Destiny, honestly," Kylie says. "Big, comfortable, just eating and not explaining yourself." A pause. "I've been practising."`,
      ],
      blob:[
        `Kylie shakes her head slowly. "Destiny is completely immobile now and her stream hits record numbers every week." She sounds somewhere between baffled and admiring. "She films from a fixed camera. She just eats and exists and people cannot stop watching." A beat. "I've been at her place filming content. I learn something every time."`,
        `"Destiny told me she has no plans to change anything," Kylie says. "She said: 'maximum comfort, maximum food, maximum audience.' Three maximums." She looks at her own enormous figure. "I'm trying to match that energy."`,
      ],
    },
    offerHelp:`Kylie tilts her head. "If Destiny gets bigger, the content gets more extreme, the audience grows, and I want to be adjacent to that. I could start sending her food deliveries 'as a gift.' She'd never overthink it." She smiles. "And I get a front-row seat for the content."`,
    helpReason:"Audience capture — Destiny's growth means better content. Kylie wants to be nearby when it happens.",
    helpMultiplier:1.32,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Destiny is two hundred pounds and streaming it and the chat goes absolutely feral every time she eats on camera and I have started sending anonymous gift deliveries to her setup because I want to be the one supplying the content that gets her to three hundred and I want the footage when it happens. This is content investment. Very normal."},
    {atLbs:250, addMult:0.20, line:"Two-fifty and Destiny is eating on stream and I am watching the viewer numbers tick up in real time and I ordered her a specialty food box this morning and she opened it on camera and said 'whoever sent this knows me' and I do. I know exactly what gets her to keep eating and I am curating it with professional precision."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Destiny, completely immobile, completely thriving, and I have basically become her off-screen production team at this point — coordinating deliveries, timing the good stuff for peak viewing hours. She thinks she's self-sufficient. She is. I'm just making sure everything she needs keeps arriving. The numbers justify everything."},
  ],
  },

  // ── SERENA (3) ── about Aaliyah & Kylie
  { speakerId:3, targetId:13, attitude:"catty",
    lines:{
      low:[
        `Serena's jaw tightens. "Aaliyah's times are slipping. She's been eating a lot at team dinners." She sounds like she's filing information away. "I've noticed."`,
        `"Aaliyah's getting slower," Serena says. "Putting on weight. I haven't said anything because she's my teammate but it's noticeable."`,
      ],
      mid:[
        `Serena's edge softens. "Aaliyah dropped off the team. She's gained a lot." A pause. "She seems happier though. Happier than I've seen her." Another pause. "I've been eating more too. Probably nothing."`,
        `"I ran into Aaliyah at the dining hall on her third plate. We had lunch for two hours." She sounds surprised at herself. "She's huge and completely fine with it. I found that weird and also appealing."`,
      ],
      high:[
        `Serena is quiet. "We've both gotten really big. We don't talk about times anymore. We talk about food." She reaches for something to eat. "I don't miss it the way I thought I would."`,
        `"Aaliyah said she's happier now than she ever was competing," Serena says. She smooths her very round belly. "I keep thinking about that." She takes a bite. "I think I'm starting to understand."`,
      ],
      blob:[
        `"Aaliyah is enormous," Serena says. Nothing competitive in her voice anymore. "She barely moves but she's always in a great mood. She told me she broke the scale and just ordered a heavier-rated one." A long pause. "We have lunch delivered together most days. We've gotten competitive about who orders more." She smiles. "It's the right use of the competitive instinct."`,
        `Serena spreads her hands across her own massive belly. "Aaliyah and I used to race each other. Now we challenge each other to finish our plates." She sounds completely at peace. "Same sport. Different metrics."`,
      ],
    },
    offerHelp:`Serena's look is half competitive, half something else. "Aaliyah and I eat together every day. If I make sure we eat a lot — really commit to it — she'll match me. She always kept pace with me athletically." She smiles slowly. "Same energy. Different direction. I'm very goal-oriented."`,
    helpReason:"Competitive redirection — Serena's still competing, just in a different direction now.",
    helpMultiplier:1.45,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Two hundred pounds on Aaliyah and I told her she was falling behind in our lunch competition and she ordered a second entree immediately and that's when I knew — same competitive wiring, completely different application. I am ordering the heaviest thing on every menu and she is matching me every single time and we are both getting so much bigger and this is the most fun I have had in years."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Aaliyah and I am winning on pounds but she is winning on attitude and I cannot accept that so I am escalating both. Daily lunch. Extended dinner sessions. I find the most loaded menus in the city and we go through them together and I keep score and she keeps score and neither of us is slowing down. This is sport. We are athletes."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds and Aaliyah looked me in the eye and said 'I'm ahead' and she is CORRECT and I have never been more motivated in my life. I am meal-prepping for both of us. I am scheduling double dinners. I ran four-minute miles and now I run this competition and I am going to WIN even if winning means we both end up absolutely enormous and I am completely fine with that outcome."},
  ],
  },
  { speakerId:3, targetId:2, attitude:"curious",
    lines:{
      low:[
        `Serena glances over. "Kylie films herself eating for an audience. I don't understand it." She pauses. "She's getting softer. Her content seems to be getting more popular as that happens." A longer pause. "I still don't understand it."`,
        `"Kylie is always filming," Serena says. "I don't know why people watch. She eats things on camera and she's getting noticeably rounder." She frowns. "She was asking me about my athletic diet. Said she might 'pivot to mass content.'" She shakes her head. "I don't know what that means."`,
      ],
      mid:[
        `"Kylie has gotten quite big," Serena observes. "She posts about it constantly. People apparently love it." She seems genuinely baffled. "She has 400,000 followers watching her eat. I had 200 watching me run a four-minute mile." She shakes her head. "Wrong career."`,
        `"Kylie offered to film me for her channel," Serena says. "I said maybe. She said my 'transformation arc' would do numbers." She looks at her own softer body. "I hate that she's probably right."`,
      ],
      high:[
        `Serena shrugs. "Kylie's enormous now and completely owns it. I've been in two of her videos. My followers went from 200 to 12,000." She looks almost guilty. "I don't know what I'm doing but it seems to be working."`,
        `"Kylie told me I have 'natural big girl energy' and that I should post more." Serena touches her enormous belly. "She's not wrong. I posted yesterday. 800 likes."`,
      ],
      blob:[
        `"Kylie is massive now and making more money than I ever did in athletics," Serena says. "She filmed me eating last month. The video got a million views." A flat pause. "A million. For eating." She stares at nothing. "I've started my own channel."`,
        `Serena laughs. "Kylie and I are basically the same person now. Big, settled, filming ourselves existing." She gestures at her vast body. "She has more followers. I'm working on that." She takes an enormous bite. "Content creation is a sport."`,
      ],
    },
    offerHelp:`Serena frowns. "If Kylie gets bigger and keeps posting, she'll probably want me in more videos. More videos means more people see me, which means—" she pauses, working through the logic "—I want to win something. And this is apparently a competition I can win." She nods. "I'll feed her."`,
    helpReason:"Competitive logic — Serena has reframed this as a competition she can win. Winning means feeding Kylie.",
    helpMultiplier:1.3,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Kylie's at two hundred and she asked me to be in another video and I said yes and I made sure we went to the most loaded restaurant I knew beforehand and she ate everything and looked incredible doing it and her numbers went up and she credited me and honestly I want to do this every week. Winning through someone else's growth. New competitive category."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Kylie and she is enormous and successful and I have become her unofficial dining director — I pick the restaurants, I recommend the dishes, I order for both of us, and she trusts my judgment completely because I have never steered her wrong. She thinks I have good taste. I do. I also have a goal. Both are true."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds and Kylie is a phenomenon and I made her a training schedule except the training is eating and she follows it without question because she frames it as content prep and the results are undeniable. I was an athlete. I still am. Different event. Kylie is my project and she is going to be enormous and magnificent and it's going to be spectacular."},
  ],
  },

  // ── FIONA (4) ── about Roxanne & Chloe
  { speakerId:4, targetId:12, attitude:"warm",
    lines:{
      low:[
        `Fiona looks thoughtful. "Roxanne eats constantly and calls it field work. She's getting very round." She says this approvingly. "Her work is getting very interesting. I think they're the same thing."`,
        `"Roxanne and I have a food-as-medium project. We make things and eat them." Fiona says. "There's a lot of eating. She's getting rounder. The work is richer." She nods dreamily.`,
      ],
      mid:[
        `"Roxanne is becoming her own best subject. Big. Very present in space." Fiona tilts her head. "She's also been eating my studio leftovers. I've been making extra." She smiles.`,
        `"Roxanne has this quality now — she takes up space and makes it mean something." Fiona pauses. "She's getting very large. The work is extraordinary."`,
      ],
      high:[
        `"Roxanne and I are both enormous and doing our best work," Fiona says with serene certainty. "I think abundance feeds the work." She looks at herself. "Evidence: all of this."`,
        `"Roxanne said 'the body is the most honest canvas' and then ate a very large lunch." Fiona smiles. "I love her. She's getting so big and so good."`,
      ],
      blob:[
        `Fiona is quiet for a moment. "Roxanne can barely move now. She creates from where she sits and her scale has completely changed — everything she makes is enormous, overwhelming, incredibly alive." She looks moved. "She is the most interesting artist I know. She feeds the work and the work feeds her."`,
        `"I visited Roxanne in her studio yesterday," Fiona says softly. "They widened the doorway. She fills a reinforced chair. She made me sit next to her and eat while she worked." She pauses. "It was the best afternoon I've had in years. She's magnificent."`,
      ],
    },
    offerHelp:`Fiona considers. "Roxanne eats anything I cook without question. She trusts my palate." A slow smile. "If I cooked for her every day — rich things, generous portions — the work would change again. I want to see that." She pauses. "Also I just love feeding people I love."`,
    helpReason:"Artistic symbiosis & love — Fiona feeds Roxanne to see her art transform. Also just affection.",
    helpMultiplier:1.35,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Roxanne at two hundred pounds and the work has changed again — bigger, more physical, more overwhelming — and I am cooking for her every single day now because I can see the direct line between what she eats and what she makes and I want to push both as far as they will go. Also I love her and feeding someone you love is its own art."},
    {atLbs:250, addMult:0.20, line:"Two-fifty and Roxanne is magnificent and enormous and I have been leaving entire prepared meals outside her studio door because she forgets to eat when she's working and I need her well-fed and large and absolutely thriving. She told me yesterday that she's never been more prolific. I know why. I am why. I'm feeding the fire."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Roxanne and she is a masterpiece herself at this point and I am in the middle of the most creatively fertile period of my life and so is she and both of us know that these things are not unrelated. I cook. She makes. We both grow. The work and the weight compound together and I would not change a single gram of it."},
  ],
  },
  { speakerId:4, targetId:9, attitude:"warm",
    lines:{
      low:[
        `Fiona watches Chloe from a distance. "She's very open to everything. Eats whatever she finds, goes wherever is interesting." She tilts her head. "There's something beautiful about that. She's softening as she opens up."`,
        `"Chloe is very eager," Fiona says. "She tried all my studio snacks when she visited. Twice. She's already getting rounder." She says this with genuine warmth. "She fits in here."`,
      ],
      mid:[
        `"Chloe has gotten quite big," Fiona says. "She used to be lost. Now she knows every good place on campus." She tilts her head. "She's found herself. She's also gotten very round." She smiles. "I find that poetic."`,
        `Fiona looks contemplative. "Chloe came by the studio. She sat for a still life." She pauses. "She's getting very good as a subject. Very present. I'd like to paint her properly."`,
      ],
      high:[
        `"Chloe is enormous and completely at home," Fiona says softly. "She came to this campus lost and she grew into herself. Literally." She looks genuinely moved. "That's the most interesting kind of transformation."`,
        `Fiona nods slowly. "Chloe is very large now. I painted her last week. She sat perfectly still for three hours and ate continuously." She looks at the imaginary canvas. "It's the best thing I've made."`,
      ],
      blob:[
        `Fiona is quiet for a long time. "Chloe is immovable now. She called herself a campus landmark and she meant it literally." She smiles. "She arrived here with a map and now she is the map." She takes out her sketchbook. "I need to paint her again. She keeps changing."`,
        `"I did a full portrait series of Chloe this semester," Fiona says. "Twelve paintings. Earliest one is this slight, lost girl with a map. The last one barely fits the canvas." She looks moved. "The whole show is her story. It's the best work I've ever done."`,
      ],
    },
    offerHelp:`Fiona looks thoughtful. "Chloe trusts me. She's open to everything." She turns her sketchbook over in her hands. "If I brought her into the studio regularly and fed her — there's a series in that transformation. I'd be documenting it." She pauses. "Also she's sweet and she deserves nice food."`,
    helpReason:"Artistic documentation & affection — Fiona wants to paint the transformation. Also just likes Chloe.",
    helpMultiplier:1.3,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Chloe is two hundred pounds and she sat for me last week and the painting was extraordinary and I have started cooking for her specifically — things that I know will make her stay longer, eat more, come back. She trusts my taste completely. I have twelve paintings in this series now. I need to see it through. I need her bigger."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Chloe and she is growing into herself so beautifully and I have been sketching her constantly and sending her food with little notes recommending where she should try next and she goes to every single place and texts me photos and every photo is another study and I am so glad she is here and I am so glad she keeps eating."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds and Chloe arrived here lost and she is now enormous and rooted and my entire best series of work is her transformation and I am delivering meals to her personally now because she is the best subject I have ever had and also she is one of my favourite people and feeding someone you love and painting someone you love are not that different."},
  ],
  },

  // ── DESTINY (5) ── about Priya & Maya
  { speakerId:5, targetId:7, attitude:"curious",
    lines:{
      low:[
        `Destiny glances up from her phone. "Priya eats at her desk constantly. She calls it 'fuel.' The amounts are impressive." She sounds mildly approving. "Committed."`,
        `"Priya stress-eats," Destiny says. "She eats when she's anxious, which is always. She's getting softer." A pause. "I respect the commitment even if she doesn't know she's doing it."`,
      ],
      mid:[
        `Destiny almost smiles. "Priya reframed her weight gain as a research self-study. Made a spreadsheet." She points upward with one finger. "Trend line goes up. She seemed proud."`,
        `"Priya's gotten really big and she's the most academically enthusiastic about it of anyone I've seen. Tracking macros. Citing sources." Destiny sounds impressed. "Chaotic but rigorous."`,
      ],
      high:[
        `"Priya is enormous and published a paper about being enormous." A beat. "I've read it. It's actually good. She cited herself as a primary source. That's baller."`,
        `"Priya and I study together now. She brings snacks, I bring snacks." Destiny glances at her own frame. "Neither of us does much studying. The data is compelling though."`,
      ],
      blob:[
        `Destiny stares at her phone for a moment. "Priya finished her PhD last month. She did the whole defence remotely from her bed. She was eating during the Q&A." A pause. "They passed her. Obviously." She almost smiles. "Respect."`,
        `"Priya and I barely move now," Destiny says. "We game together online and I hear her eating through the mic for hours." She shrugs comfortably. "She's enormous and brilliant and I've never met anyone who committed to a bit more completely."`,
      ],
    },
    offerHelp:`Destiny looks at you flatly. "Priya eats when she's working. Co-study sessions with constant snacks in front of her — she'd log it as 'fuel consumption' and eat three times as much without noticing." She shrugs. "Honestly it's funny to watch someone intellectualise themselves into getting huge. I'm entertained. I'll do it."`,
    helpReason:"Entertainment & chaos — Destiny is genuinely amused by Priya's approach and wants to see how far it goes.",
    helpMultiplier:1.4,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Priya is two hundred pounds and still logging it academically and I find this so funny and so impressive that I have started supplying the data myself — coordinating snack deliveries for our co-study sessions, choosing quantities that look normal but absolutely are not. She documents everything I put in front of her. I control what I put in front of her. The research is going very well."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Priya and she is enormous and brilliant and I genuinely cannot stop laughing about the fact that she submitted a progress report on herself to her thesis committee and the committee APPROVED IT. I am sending her more food. I want to see what three hundred looks like in an academic document. The dedication to the bit is unreal."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Priya, PhD candidate, and I have been her primary external supply chain for months and she doesn't know and honestly I don't want her to know because the observation value is too high. She is going to write a paper about this and cite herself and I am going to read every word and she's going to be so enormous and it's going to be perfect."},
  ],
  },
  { speakerId:5, targetId:8, attitude:"curious",
    lines:{
      low:[
        `Destiny glances sideways. "Maya sits in the back and watches everything and always has incredible snacks." She pauses. "I respect that. We've exchanged recommendations. She knows things."`,
        `"I don't know much about Maya," Destiny says, "but she watches people very carefully and she's always eating something good." She nods slowly. "Same energy as me, honestly. Observing. Snacking. Not explaining yourself."`,
      ],
      mid:[
        `"Maya is getting quietly enormous," Destiny says, with something approaching approval. "She just gets bigger and more still and more knowing. It's an aesthetic." She adjusts her headphones. "I respect the approach."`,
        `"Maya and I ended up next to each other at a class event. We didn't talk much but she passed me food the whole time and it was excellent." Destiny looks pleased. "I've been sitting near her since then."`,
      ],
      high:[
        `"Maya is very large now and very aware," Destiny says. "She doesn't say much but she sees everything." She glances at her own enormous frame. "We're similar. She does it quieter. I do it with an audience." She nods. "Both valid."`,
        `"Maya gave me a restaurant recommendation last week. I went. I've been four times since." Destiny says. "She points you somewhere and you realise later she was setting something in motion." She looks thoughtful. "I kind of want to learn from her."`,
      ],
      blob:[
        `Destiny is quiet for a moment. "Maya is absolutely enormous now. She barely moves. She brought me a full tray of food to my setup last month without being asked." She looks at nothing. "She just… knew." A pause. "She's my favourite person on this campus. I don't say that to people."`,
        `"Maya and I are basically the two quietest people in the class," Destiny says, "and we've both become absolutely massive." She almost smiles. "We don't talk about it. We just send each other food recommendations. It's perfect."`,
      ],
    },
    offerHelp:`Destiny is quiet for a moment. "Maya would eat anything good that appeared in front of her without questioning where it came from." She picks up her phone. "I could arrange deliveries to her address. High quality, big portions." A pause. "She'd figure it out eventually. I think she'd appreciate it."`,
    helpReason:"Mutual respect — Destiny recognises a kindred spirit and wants to see her flourish.",
    helpMultiplier:1.33,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Maya is two hundred pounds of quiet, knowing, devastating calm and I have been sending her deliveries for months and she has never said a word about it and neither have I and we both know and neither of us is going to acknowledge it and I find this deeply correct. I'm sending more. Better stuff. She deserves the best and she'll just nod when it arrives."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Maya and she sent me a food recommendation this morning and I went immediately and it was perfect and she knew it would be and I went home and ordered a full spread delivered to her address. We don't explain things to each other. We just provide. It works perfectly."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds and Maya is the most enormous, still, perceptive person I know and I have built her an entire off-site supply chain and she uses it without comment and occasionally repays it with a recommendation that changes my week. This is the ideal relationship. No words. Mutual feeding. Absolute understanding. I'm scaling up the deliveries."},
  ],
  },

  // ── TIFFANY (6) ── about Sophie & Kylie
  { speakerId:6, targetId:14, attitude:"conspiratorial",
    lines:{
      low:[
        `Tiffany smiles with warmth. "Sophie's settling in perfectly. House dinners, seconds, late-night snack runs." She looks satisfied. "Good."`,
        `"I've sort of adopted Sophie. She was so nervous. I've been taking her to all my favourite spots." She nods. "She's eating much better now."`,
      ],
      mid:[
        `"Sophie's come out of her shell. She orders for herself, eats everything, getting nice and soft." Tiffany squeezes her own plump arm. "Good influence."`,
        `"Sophie and I get brunch every week. Three courses. She was nervous at first." She waves a hand. "Fixed that. She's very comfortable now. Visibly."`,
      ],
      high:[
        `Tiffany looks genuinely fond. "Sophie is so big and happy. Came to me nervous and now she waltzes into chapter meetings and owns the room." She beams. "That's my girl."`,
        `"Sophie outgrew her pledge clothes. Was upset for five minutes. I took her for a custom fitting and a very large dinner and she was over it." She nods. "Growth."`,
      ],
      blob:[
        `Tiffany sits back with deep satisfaction. "Sophie is enormous now. She can barely fit through the house door." She laughs, then looks genuinely moved. "She texted me last week to say this is the happiest she's ever been." A pause. "I built that." She sounds proud. "That's legacy."`,
        `"Sophie and I host chapter together now," Tiffany says. "Neither of us goes anywhere. People come to us. We sit together and eat and run everything from the couch." She smiles serenely. "Exactly what I always wanted."`,
      ],
    },
    offerHelp:`Tiffany leans forward with a gleam in her eye. "I've been taking Sophie to dinner twice a week. I could make it daily. I know exactly what she likes, the best portions, and she trusts me completely." A slow smile. "She'd just keep getting bigger and think it was natural."`,
    helpReason:"Legacy building — Tiffany is shaping Sophie in her own image. This is an investment in a protégé.",
    helpMultiplier:1.5,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Sophie is two hundred pounds and she came to me nervous and tiny and now she is soft and confident and enormous and she is mine in every mentorship sense of that word. I am escalating to daily dinners. I know every single thing she loves and I make sure she has it. She thinks I'm being generous. I am. I'm also building something. She's going to be spectacular."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on my girl and she texted me a photo and I immediately called the restaurant and made a reservation for tomorrow and I'm ordering the full tasting menu because she deserves the best and she's going to keep growing and she's going to be this magnificent enormous confident woman and I am going to say I built that because I did."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Sophie. Three hundred pounds of the girl I took under my wing who barely spoke in September. I am so proud I could scream. I'm sending everything. The full spread. Daily deliveries. Whatever she wants whenever she wants it. This is my legacy. She is enormous and happy and mine, and that is the most satisfying thing I have ever accomplished."},
  ],
  },
  { speakerId:6, targetId:2, attitude:"curious",
    lines:{
      low:[
        `Tiffany tilts her head. "Kylie has a platform. She's been getting softer and her numbers are going up." She considers. "There's something there. I've been thinking about it."`,
        `"Kylie films herself eating. I don't totally understand the audience but she has one." Tiffany smooths her blown-out hair. "She approached me about a collaboration. I said I'd think about it."`,
      ],
      mid:[
        `"Kylie and I collaborated," Tiffany says. "Dinner. Three hours. Her engagement tripled." She nods slowly. "She's useful. Also she's getting quite large, which helps her content and also makes me look put-together by comparison." She smiles. "Win-win."`,
        `"Kylie is getting very big and leaning into it hard," Tiffany says. "We've been doing more together." She examines a nail. "She defers to me on the style questions. As she should."`,
      ],
      high:[
        `"Kylie is enormous and very successful now," Tiffany says. "We have a standing collab arrangement." She sits with easy authority. "She brings the followers. I bring the credibility. We both get bigger." She shrugs. "Good partnership."`,
        `"Kylie and I are probably the most visible people in this class now," Tiffany says. "In multiple senses." She smooths her hands over her very round middle. "It works."`,
      ],
      blob:[
        `"Kylie is completely immense now," Tiffany says. "She has millions of followers watching her exist. I have a standing invitation to appear whenever I want." She looks satisfied. "The arrangement is perfect. She's enormous, I'm enormous, we both profit from proximity."`,
        `Tiffany nods thoughtfully. "Kylie told her audience that I was her 'style icon' last week." She pats her vast middle. "Four million people saw that." A beat. "Good. That's exactly right."`,
      ],
    },
    offerHelp:`Tiffany considers this carefully. "If Kylie gets bigger, her content gets more extreme, her audience grows, and I get more collabs with a higher-profile partner." She straightens up. "Also, the bigger she gets, the more she needs my advice on how to carry it. I become indispensable." She smiles. "I'll host dinners."`,
    helpReason:"Strategic alliance — Tiffany sees Kylie's growth as an investment in a valuable partnership.",
    helpMultiplier:1.38,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Kylie hit two hundred and her engagement numbers are absurd and she absolutely needs me in her orbit right now. I have started hosting private dinners specifically for her filming schedule — full spreads, multiple courses, whatever she needs. She thinks she's using me for content. She is. I'm also using her for reach. We are equally shameless. I love it."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Kylie and she is enormous and influential and I have made myself indispensable to her operation. She calls me for venue advice. I recommend places with the biggest portions. She trusts my taste. I have very good taste. I also have very specific goals for her size and they are progressing beautifully."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds and Kylie is a genuine phenomenon and I have been quietly directing her feeding schedule for months and she thinks it's a partnership of equals and it absolutely is, I'm just the one making sure the food keeps arriving in exactly the right quantities. She's magnificent. I made her. We made each other. It's a good arrangement."},
  ],
  },

  // ── PRIYA (7) ── about Destiny & Emma
  { speakerId:7, targetId:5, attitude:"curious",
    lines:{
      low:[
        `Priya looks up from her planner. "Destiny's caloric intake is staggering. She eats constantly and games sixteen hours a day." She taps her pen. "Her metabolic adaptation is interesting."`,
        `"Destiny doesn't move much but eats an extraordinary amount." Priya pauses. "She just commits fully to things. Eating included. I respect that."`,
      ],
      mid:[
        `"Destiny is very large now. She has a sponsor sending food boxes. This is objectively an optimised system for gaining weight." She looks envious. "I respect the efficiency."`,
        `"Destiny has gained more than anyone, I'd estimate. Complete intention, zero apology." A pause. "I've been studying her approach for my thesis."`,
      ],
      high:[
        `"Destiny is enormous and has published nothing but she's cited in three papers about online food culture." Priya says this like it impresses her. "She exists and people write about her. Remarkable output."`,
        `"We do study sessions. I bring work. She brings snacks. Neither of us does the work." She looks at her enormous belly with something like satisfaction. "The data is compelling though."`,
      ],
      blob:[
        `Priya is quiet. "Destiny completed her semester from her setup, completely immobile, and her grades are fine because she does everything online." She taps her pen slowly. "She has optimised her life around a single chair. This is honestly efficient." A pause. "I have a paper in progress about it. She knows and doesn't care."`,
        `"Destiny and I are both enormous and productive in very different ways," Priya says. "I bring the academic rigour. She brings the snacks." She pats her massive belly. "Perfect division of labour."`,
      ],
    },
    offerHelp:`Priya taps her pen. "Destiny eats more in social settings. If I arranged daily co-study sessions with catered snacks — her preferences exactly, I've noted them — her intake would increase substantially." She pauses. "The data from this would also be excellent. Dual purpose."`,
    helpReason:"Research interest & genuine fondness — Priya wants the data AND she genuinely likes Destiny.",
    helpMultiplier:1.38,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Destiny is two hundred pounds and I have submitted a methodology update to my thesis committee noting that 'the primary observational subject has crossed a significant threshold' and they approved further research which I am conducting via daily co-study sessions with catered refreshments matched exactly to her documented preferences. The data is extraordinary. So is she."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Destiny and I have a spreadsheet that tracks her intake across our sessions and the trend line is the most beautiful thing I have produced this academic year. I have been optimising the catering order to hit the precise caloric density that gets her to reach for seconds and it is working with a consistency that would satisfy any peer reviewer."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Destiny and I am going to write a paper about this and I am going to be extremely careful about what I include and I am going to dedicate it to her and she is going to read the dedication and not fully understand it and I am going to be fine with that because the work speaks for itself and she is magnificent and enormous and I need to send her lunch right now."},
  ],
  },
  { speakerId:7, targetId:11, attitude:"curious",
    lines:{
      low:[
        `Priya glances up. "Emma is a good researcher. She's also been eating quite a lot lately. She brought tea cakes to the seminar and I ate four." She pauses. "I've been eating more generally. I've graphed it."`,
        `"Emma and I overlap in the library often. She's getting noticeably rounder." Priya makes a note. "Her work output hasn't dropped. Interesting data point."`,
      ],
      mid:[
        `"Emma published a paper last month. She's also gotten quite big." Priya sounds approving of both. "I've been tracking our comparative trajectories. The gains are roughly parallel. That's interesting."`,
        `"Emma and I are both getting very large this semester," Priya says. "She seems to do it through ambient snacking. I do it through deliberate documentation." She tilts her head. "Different paths."`,
      ],
      high:[
        `"Emma is enormous and has published more than me this year," Priya says. She looks almost competitive. "I need to close that gap." A pause. "The weight gap she's ahead in too, by my estimate." Another pause. "Both gaps. I'm catching up on both."`,
        `"Emma and I had coffee last week — she had six biscuits and I had a substantial amount of cake." Priya adjusts. "We talked about research for three hours. It was excellent." She pats her belly. "We're going again Thursday."`,
      ],
      blob:[
        `"Emma is immense now," Priya says. "She works from home surrounded by food and tea. Her publications this year are remarkable." She looks at her own vast body. "We've both maximised." She nods slowly. "I need to visit. Compare notes."`,
        `Priya looks almost wistful. "Emma and I are both enormous scholars doing excellent work from increasingly sedentary positions." She turns a page. "I used to think we were competing. Now I think we were just running the same experiment."`,
      ],
    },
    offerHelp:`Priya taps her pen. "Emma responds well to snack incentives during study sessions. I could arrange a standing weekly session with catered refreshments matching her exact preferences." She looks at you. "I would also benefit from this. But primarily it's research. Emma's gaining trajectory is a valuable data set." A pause. "And I like her company."`,
    helpReason:"Comparative research & competition — Priya tracks Emma as a parallel subject and wants the data.",
    helpMultiplier:1.33,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Emma is two hundred pounds and she has published two papers this semester and I am behind by one paper and approximately eight pounds and I am addressing both deficits simultaneously. I have arranged weekly study sessions with catering that I have specifically calibrated to her preferences and I am logging everything and the comparative data is becoming genuinely compelling."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Emma and she is enormous and brilliant and ahead of me on both metrics and I have upgraded her study session catering to a premium tier and she seemed very pleased and ate considerably more than usual and I recorded everything and the graph is beautiful and I need her to be bigger so I can study her properly. This is research. I am very professional."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds. Emma. Three hundred. She is extraordinary. I am sending her a weekly care package because she deserves the fuel and also because I want the data and also because she is one of my favourite people and those three motivations are not in conflict. I am catching up. On all metrics. The competition makes both of us better."},
  ],
  },

  // ── MAYA (8) ── about Chloe & Brittany
  { speakerId:8, targetId:9, attitude:"warm",
    lines:{
      low:[
        `Maya looks up from her notebook. "Chloe's been trying every food spot on campus. She told me about a new one near the science building." She pauses. "She was a little softer than when she arrived." Maya writes something small in her notebook.`,
        `"Chloe eats everything," Maya says, like this is admirable. "New foods, big portions, seconds when she can get them. She's settling in visibly." She smiles a little. "I like her."`,
      ],
      mid:[
        `Maya watches you carefully before speaking. "Chloe's gotten quite big. The dining hall knows her. She seems more confident." A small pause. "She sits in the front row now. She didn't used to do that."`,
        `"Chloe stopped carrying the campus map," Maya notes. "She knows where everything is. Especially the food." She tilts her head. "She's very round now. She seems at home."`,
      ],
      high:[
        `Maya almost smiles. "Chloe said she never wants to transfer back. She said this place 'feeds her.'" She writes in her notebook. "It wasn't only a metaphor."`,
        `"Chloe's enormous," Maya says softly, with quiet approval. "She came here lost and now she takes up so much space, and she knows it, and she likes it." She pauses. "I find that very beautiful."`,
      ],
      blob:[
        `Maya is still for a long moment. "Chloe can't easily leave her room anymore." She says this slowly. "She's enormous. She texts me every morning. I bring her things." A small pause. "I like that she needs me. I like that I can do that for her."`,
        `Maya writes something in her notebook and then closes it. "Chloe told me last week that I'm the reason she stayed," she says quietly. "That if I hadn't guided her — she'd have transferred back." She looks at her hands. "I'm glad I did."`,
      ],
    },
    offerHelp:`Maya looks at her notebook, then at you. "I could walk Chloe through all the best food spots every week. She trusts me — I'm quiet, she doesn't feel judged." She speaks carefully. "I know exactly which places have the biggest portions. She'd eat everything I recommended." A pause. "I want her to be happy here."`,
    helpReason:"Care & guardianship — Maya genuinely wants Chloe to be rooted here, happy, fed, and settled.",
    helpMultiplier:1.32,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Chloe is two hundred pounds and she told me I was the reason she stayed on this campus and I have been quietly directing her to every place I know for months and she follows every recommendation without question and she is becoming enormous and rooted and completely at home and I want to make sure she never wants to leave. I know all the best places. She's going to visit all of them."},
    {atLbs:250, addMult:0.20, line:"Two-fifty and Chloe sends me a photo from every place I recommend and she always looks so happy and so full and so completely settled in herself and I have started compiling a personal guide for her — every restaurant, every bakery, every café, every portion size — because she trusts me and I am using that trust to keep her very, very well fed."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds and Chloe is enormous and mine in every sense that a person can be claimed through care and attention and a carefully curated feeding itinerary. She said I was her home here. I intend to keep being that. I'm expanding the list. I'm adding delivery options for when she can't easily get out. She will always have what she needs from me."},
  ],
  },
  { speakerId:8, targetId:0, attitude:"curious",
    lines:{
      low:[
        `Maya watches Brittany from the back row. "She's always moving. Adjusting. Tugging her jacket." She writes a small note. "Her energy is very performed. But I think there's something else underneath."`,
        `"Brittany keeps looking at herself," Maya says quietly. "Not critically. Like she's checking something." She pauses. "She's getting a bit softer. I don't think she's decided yet how she feels about it."`,
      ],
      mid:[
        `"Brittany dropped off the squad," Maya says. "She's gotten noticeably bigger. She seemed like she expected to be upset about it." A small pause. "She doesn't look upset." She writes something. "Interesting."`,
        `Maya tilts her head. "Brittany has been eating a lot more and she's stopped trying to hide it." She pauses. "She sat near me last week. She gave me some of her food." She looks at the memory. "I think she was happy."`,
      ],
      high:[
        `"Brittany is quite big now," Maya says. "Completely different to when term started. Louder somehow. More comfortable." She tilts her head. "She gave me a restaurant recommendation last week. Unprompted. It was very good." She seems moved by this.`,
        `Maya writes in her notebook and then looks up. "Brittany has become someone I didn't expect her to be. Very large, very settled, and — I think — very okay." She pauses. "I like watching people arrive at themselves."`,
      ],
      blob:[
        `Maya is quiet for a long time. "Brittany is enormous now. Basically immovable." She writes slowly. "I think she's more herself than she ever was on the squad. There's nothing performed about any of it anymore." She closes her notebook. "I've been sketching her. She doesn't know. She'd probably be embarrassed."`,
        `"I drew Brittany last week," Maya says. "She was sitting in the wide chair, very big, eating something, looking completely relaxed." A pause. "She looked at my sketchbook and stared at the drawing for a long time." Another pause. "She asked if she could keep it."`,
      ],
    },
    offerHelp:`Maya is quiet for a moment. "Brittany eats more when she's comfortable. If I started sitting near her, sharing food, recommending places—" she pauses "—she's the kind of person who would follow someone they trust." She looks at her notebook. "I think I want to be that for her."`,
    helpReason:"Witnessing & quiet care — Maya wants to watch Brittany finish becoming who she's becoming.",
    helpMultiplier:1.28,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Brittany is two hundred pounds and she sat near me again today and shared her food without asking and looked comfortable in a way she never did when she was performing. I've been drawing her for months and she doesn't know. I've been quietly redirecting her to the best places on campus. I want to see who she becomes when she stops pretending. I think it's going to be extraordinary."},
    {atLbs:250, addMult:0.20, line:"Two-fifty and Brittany is enormous and loud and completely herself and I showed her one of the sketches and she stared at it for a long time and didn't say anything critical and then asked where I thought she should go for dinner. I told her. I always know exactly where to send her. She always comes back bigger. I am going to fill this sketchbook."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Brittany, no performance, no jacket-tugging, just enormous and present and more herself than she ever was on the squad. I have filled two sketchbooks. I am starting a third. I send her somewhere new every week and she goes and she comes back and every time she's bigger and more settled and I could watch this forever and I intend to."},
  ],
  },

  // ── CHLOE (9) ── about Maya & Emma
  { speakerId:9, targetId:8, attitude:"curious",
    lines:{
      low:[
        `Chloe leans in. "Maya barely talks but always has the best snacks. She gave me a pastry recommendation that changed my life." She looks impressed. "I think she knows things."`,
        `"Maya sits at the back and watches everything and somehow always has food." Chloe pauses. "I've been trying to sit closer to her. My diet has improved significantly."`,
      ],
      mid:[
        `"Maya's getting bigger and quieter at the same time," Chloe says, fascinated. "She brought this enormous spread to study group and barely said a word and it was the best thing I'd ever eaten." She shakes her head. "She's something else."`,
        `Chloe looks thoughtful. "Maya takes me to food places and doesn't explain anything, she just watches me eat and seems satisfied." She prods her very soft middle. "I've gained a lot of weight since we started hanging out. I think she's doing it on purpose." A pause. "I don't mind."`,
      ],
      high:[
        `"Maya is my favourite person," Chloe says simply. "Enormous and wise and always has food." She pats her huge belly. "Most of this is her fault. I'm grateful."`,
        `Chloe grins. "Maya told me she's been guiding my 'culinary education' since week one." She laughs. "I gained sixty pounds. I have never felt more educated."`,
      ],
      blob:[
        `Chloe goes quiet for a moment. "Maya can barely move now. She's enormous." She sounds reverent. "I visit her every day. She feeds me every time I come." She touches her own massive belly. "She made me who I am here. I don't think I'd have stayed without her."`,
        `"Maya texted me a food recommendation this morning," Chloe says softly. "She never leaves anymore. She finds incredible places online and tells me and I go for both of us." She smiles. "I bring her back things. It's our thing." A pause. "She's my home here."`,
      ],
    },
    offerHelp:`Chloe straightens up. "I could go to Maya's favourite places and bring her food back." She pauses. "Every day. The good stuff. The things she likes." A pause. "She does so much for me. I want to do something back."`,
    helpReason:"Gratitude & reciprocity — Chloe wants to give back to Maya what Maya has given her.",
    helpMultiplier:1.3,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Maya is two hundred pounds and she does so much for me and I want to do something back so I have started going to every place she recommends and bringing her the best thing on the menu every single time, because she never leaves anymore and she deserves to taste everything she's sending me to. She always seems pleased. I love making her pleased."},
    {atLbs:250, addMult:0.20, line:"Two-fifty and Maya is enormous and wise and I am basically her personal delivery service now and I love it. She texts me a recommendation, I go, I bring her back the best thing, she eats it, she sends me somewhere new. We have built a perfect system. She gets bigger. I get bigger. We're both fed. I couldn't have designed this better."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Maya and she barely moves and I am the thing that connects her to everywhere she knows about, and she knows about everywhere that matters, and I will run every errand she has forever because she made me who I am here and this is how I say thank you. I'm upgrading to twice-daily deliveries. She deserves the best. I'll make sure she has it."},
  ],
  },
  { speakerId:9, targetId:11, attitude:"warm",
    lines:{
      low:[
        `Chloe lights up. "Emma is so calm and reads constantly and always has good snacks." She pauses. "She let me sit with her in the library once. I stayed for three hours." She sounds like this was meaningful.`,
        `"Emma recommended me a book and a tea shop in the same sentence," Chloe says. "I've been to the tea shop four times." She looks at her softer middle. "It has very good pastries."`,
      ],
      mid:[
        `"Emma's gotten quite round," Chloe says warmly. "She has this whole vibe — books, tea, soft cardigan, very large now." She tilts her head. "I aspire to that. The 'settled into yourself' thing."`,
        `"Emma let me join her study group," Chloe says. "There are a lot of snacks. Emma brings most of them." She pats her belly. "I've been learning a lot. About food. Somewhat about the coursework."`,
      ],
      high:[
        `"Emma is enormous and knows everything," Chloe says with open admiration. "She barely leaves the library annex but she always has a recommendation — food, books, both." She looks at her own very round figure. "She's helped me settle in more than almost anyone."`,
        `Chloe smiles. "Emma told me I was 'finding myself' here." She looks down at her massive body. "She meant it kindly." She laughs. "I found a lot of myself. Most of it is soft."`,
      ],
      blob:[
        `"Emma can barely move now," Chloe says. "She studies from home, surrounded by tea and books and food." She sounds completely at peace with this. "I bring her things sometimes. She recommends me things in return." She smiles. "We have a good system. She's enormous and brilliant and I learn from both."`,
        `Chloe looks fond. "Emma told me last month that she considered this the best semester of her academic career." She pauses. "She also said she's gained more weight this semester than any other year of her life." Another pause. "She said both things like they were the same thing." She nods slowly. "I think they are."`,
      ],
    },
    offerHelp:`Chloe fidgets a little. "Emma eats more when she's comfortable with people. If I made a point of joining her study sessions every day — brought the snacks she likes, sat with her, stayed—" she pauses "—I think she'd eat more and I'd learn more." She smiles shyly. "Good deal for both of us."`,
    helpReason:"Belonging & admiration — Chloe wants to be part of Emma's world. Feeding her is how she earns a place in it.",
    helpMultiplier:1.28,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Emma is two hundred pounds and she is so calm and certain about herself and I want to be that, I aspire to that, and the closest I get is sitting with her every day and eating with her and she always has the best things and I always stay too long and I'm getting so much bigger just from being in her orbit and I think that is exactly right and I want to keep going."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Emma and she told me I was 'settling into myself' and she meant it as a compliment and it is the best compliment I have ever received. I have been bringing her the pastries from that place she mentioned and she eats everything I bring and looks so satisfied and I feel so useful and I want to bring more and I want her to keep getting bigger because she's magnificent."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds and Emma is enormous and brilliant and I am her most dedicated student and also her most dedicated supplier and she doesn't fully realise the second part but I show up every day with something good and she always has room for it and we sit together for hours and we're both getting enormous and it is the most belonging I have ever felt."},
  ],
  },

  // ── JASMINE (10) ── about Brittany & Tiffany
  { speakerId:10, targetId:0, attitude:"warm",
    lines:{
      low:[
        `Jasmine beams. "Brittany's little belly is coming in and she keeps tugging her jacket over it like I can't see." She laughs. "I told her she looks great and she looked at me like I'd said something weird."`,
        `"Brittany keeps saying she shouldn't but she always finishes her plate. And mine if I offer." Jasmine looks very pleased about this.`,
      ],
      mid:[
        `"Brittany is THRIVING," Jasmine announces. "Quit the squad, eats and chills, so much more relaxed." She grins. "I've been a good influence."`,
        `Jasmine looks delighted. "She texted me a photo of her lunch. It was enormous. She said 'no notes.'" She pats her own significant belly. "We've really grown as people."`,
      ],
      high:[
        `"Brittany and I are basically the same person now," Jasmine says warmly. "Big, soft, happy, not at practice. We have brunch every Sunday." She laughs. "It's been a real friendship milestone."`,
        `Jasmine smiles. "We used to compete about everything. Now we compete about who finds the best restaurant." A pause. "I'm winning. She's catching up fast."`,
      ],
      blob:[
        `Jasmine goes soft. "Brittany can barely move now. She's enormous." She laughs, then gets genuinely warm. "We do brunch over video call because neither of us really goes anywhere. She sets her phone up next to her food and we eat together." She pats her vast middle. "I love her. We're the same person now, just very, very large."`,
        `"Brittany texted me a photo of herself yesterday," Jasmine says. "She looked — you could just tell she was happy. Really happy." She's quiet for a moment. "I remember when she was pulling her jacket over herself." She shakes her head. "Look at us now."`,
      ],
    },
    offerHelp:`Jasmine leans in with a conspiratorial grin. "Brittany always eats more when I'm around. I could have lunch with her every single day. Many courses." She raises an eyebrow. "I want company on this journey and she's perfect for it. Say the word."`,
    helpReason:"Love & companionship — Jasmine wants Brittany on this journey with her. She doesn't want to be enormous alone.",
    helpMultiplier:1.42,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Brittany hit two hundred and texted me immediately and I said 'come for lunch' and she was there in twenty minutes and we ate for three hours and it was perfect. She's catching up to me and I want her to catch all the way up because being enormously fat is so much better when your best friend is enormously fat with you. I'm planning the best lunches. She's not going to be able to resist."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Brittany and I am so genuinely happy I could burst, and I am bursting slightly in other ways, and I want her to reach three hundred because then we're the same and we can be the same enormous ridiculous people together and I have planned the most incredible dinner schedule and she is going to eat everything because she trusts me and I love her and I want this for both of us."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds on Brittany and I texted her and said 'we're the same' and she sent back a photo of herself looking absolutely enormous and gorgeous and I screamed. I am sending her everything good I find. Every discovery. Every place. She's my person and we're doing this together and we're both going to be absolutely immovable and I cannot wait."},
  ],
  },
  { speakerId:10, targetId:6, attitude:"catty",
    lines:{
      low:[
        `Jasmine tilts her head. "Tiffany eats at every single event and she doesn't care at all and everyone loves her for it." She crosses her arms. "Which is fine. Good for her."`,
        `"Tiffany has this whole effortless big happy person thing," Jasmine says. "She's been getting softer for months." She pauses. "I've been getting softer too. It's not a competition." Beat. "I'm still louder."`,
      ],
      mid:[
        `"Tiffany is getting really big now," Jasmine says. "She's bigger than me at the moment, which—" she pauses "—is just a data point. Not a challenge." She immediately sounds like it is a challenge.`,
        `"Tiffany held court at the last event from an armchair and didn't get up once," Jasmine says. "Ate continuously. Everyone came to her." She sounds simultaneously admiring and competitive. "I did the same thing but standing up. Which is harder."`,
      ],
      high:[
        `Jasmine huffs softly. "Tiffany is enormous and I'm enormous and we're basically tied now." She says 'tied' like this is an ongoing competition. "I think I might be ahead on personality." She pats her belly. "She might be ahead on volume. It's close."`,
        `"Tiffany and I have become — I want to say rivals. We're not rivals. We're just both very large and very present and the room isn't always big enough for both of us." Jasmine grins. "I find this exciting."`,
      ],
      blob:[
        `Jasmine is quiet, then laughs. "Tiffany is absolutely immense now. She barely leaves her place. She holds chapter from her couch." She pats her own enormous belly. "I'm almost there. Almost." She sounds competitive. "She has a head start. I'm closing the gap."`,
        `"Tiffany and I texted each other our weights last month," Jasmine says. "She was ahead. I sent her back a very long string of determined emojis." She smooths her vast middle. "I've been eating more since then. I want to catch up." She looks sincere. "The competition is the friendship."`,
      ],
    },
    offerHelp:`Jasmine raises her chin. "If Tiffany gets bigger, then when I catch up to her size, I'll look proportionally more impressive for having gotten there faster." She thinks about this. "Also—" she deflates slightly "—I sort of want to do this together. It's more fun. Even if it's a competition." She shrugs. "Especially because it's a competition."`,
    helpReason:"Competitive companionship — Jasmine wants Tiffany to grow so they can race each other to enormity.",
    helpMultiplier:1.38,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Tiffany is two hundred pounds and she's ahead of me right now and I am not accepting that lying down, or I am, actually, I'm lying down while ordering the best food in the city to both of our addresses simultaneously. If I keep feeding her and feeding myself at the same rate I know exactly who gains faster. Me. Obviously. But the competition makes it better."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Tiffany and she is enormous and magnificent and I am so competitive about this that I have started a private spreadsheet and she is ahead by EIGHT POUNDS and I am personally coordinating her meal deliveries because if she is bigger I have a further target to chase and the chase is the whole point and I am having the time of my life."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds on Tiffany. She's three hundred. I'm so close behind. I texted her: 'I'm coming for you.' She sent back a photo of her dinner. I ordered double. This is the most meaningful competition of my life and we are both going to be absolutely enormously, completely, perfectly huge and it is going to be incredible."},
  ],
  },

  // ── EMMA (11) ── about Madeline & Sophie
  { speakerId:11, targetId:1, attitude:"warm",
    lines:{
      low:[
        `Emma smiles softly. "Madeline's been eating more at our study sessions. She doesn't comment on it, which is very her." A pause. "I've been bringing better snacks to encourage this. Also I want the snacks."`,
        `"Madeline has the most analytical approach to everything, including apparently getting rounder," Emma says fondly. "She measured herself and presented it like a research update. Very cute."`,
      ],
      mid:[
        `"Madeline is getting quite plump," Emma says warmly. "Her cardigans are strained at the buttons. She calls it 'dressing for comfort.'" She sounds completely approving.`,
        `Emma looks pleased. "Madeline and I have both gotten quite big this term. She calls it 'convergent research outcomes.'" She sips her tea. "I call it a good semester."`,
      ],
      high:[
        `"Madeline is enormous and acts like it's a peer-reviewed outcome," Emma says with deep affection. "She showed me a graph. The trend line is very steep. She seemed proud of the R-squared value."`,
        `Emma laughs quietly. "We've both gotten very, very fat. She calls it 'convergent research outcomes.' I call it a good semester." She sips her tea. "We're basically the same size now. It's nice."`,
      ],
      blob:[
        `Emma is quiet for a moment. "Madeline and I are both completely enormous now." She looks at her own vast frame. "We study remotely together most days. Neither of us moves much." A pause. "She messaged me last week just to say the data had reached 'statistically significant' levels and that she was pleased." She smiles. "I sent her some pastries."`,
        `"Madeline told me she's never been happier or more productive," Emma says softly. "She's enormous, she can barely fit through her flat door, and she has published four papers this year." She nods. "That's her. She would." A pause. "I love her."`,
      ],
    },
    offerHelp:`Emma looks thoughtful. "Madeline responds to snack incentives at study sessions. If I brought her favourites every time—" she pauses "—she'd eat more. Substantially more." She sips her tea. "I want her to be comfortable and well-fed. Also the data would be interesting." She smiles. "Mostly the first thing."`,
    helpReason:"Love & gentle encouragement — Emma just wants Madeline to eat well and be happy. The research interest is secondary.",
    helpMultiplier:1.33,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Madeline is two hundred pounds and she presented me with a graph of it over tea and looked so quietly proud and I immediately went home and baked everything I know she loves because she deserves to be celebrated and also because the graph is only going to get better and I want to be the one providing the data points. I love her. I'm baking again tomorrow."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Madeline and she called it 'a statistically satisfying outcome' and I laughed for a very long time and then I sent her a full hamper from the place that does the good butter biscuits because she mentioned them once eight months ago and I remember everything. She is enormous and brilliant and I want to make sure she has everything she needs."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Madeline, enormous scholar, publishing four papers a year from an increasingly sedentary position surrounded by the things I keep sending her, and I am so happy and so proud and I am upgrading the weekly delivery to include the pastries from the French place that are absurdly rich and she is going to eat every one and I am going to feel wonderful about it."},
  ],
  },
  { speakerId:11, targetId:14, attitude:"warm",
    lines:{
      low:[
        `Emma looks soft. "Sophie is so sweet. She always looks slightly overwhelmed." She pauses. "I gave her a book recommendation and a bakery recommendation. She looked deeply grateful for both."`,
        `"Sophie has been getting a bit rounder since term started," Emma says. "She seems less nervous lately." She tilts her head. "I think good food helps with that. I've made sure to recommend things."`,
      ],
      mid:[
        `"Sophie is getting quite big," Emma says warmly. "She's less nervous. She laughs more. She eats more." She considers. "Those three things feel connected." She sips her tea. "Food does help people settle."`,
        `Emma smiles. "Sophie came to me for academic advice last week. I gave her snacks and a reading list and she looked like someone had handed her exactly what she needed." She pats her own round middle. "I think she'll be okay."`,
      ],
      high:[
        `"Sophie has gotten so large," Emma says, with quiet delight. "She came in as this tiny nervous freshman and now she's this big comfortable person." She looks moved. "I feel a bit responsible for some of that. In a good way."`,
        `Emma nods thoughtfully. "Sophie's outgrown everything she came with. She's very settled now." She pauses. "I find it genuinely moving. Watching someone find their size."`,
      ],
      blob:[
        `Emma is quiet, clearly moved. "Sophie is enormous now. She can barely leave her sorority house." She smiles. "She texts me sometimes — book questions, food questions, just to talk." A pause. "I think she's very happy." Another pause. "I think I had a small part in that. That matters to me."`,
        `"Sophie sent me a message last week," Emma says. "She said she was the happiest she'd ever been." She adjusts her glasses. "She's huge, she's soft, she barely moves, and she's happy." She sips her tea. "I don't think I could ask for more than that."`,
      ],
    },
    offerHelp:`Emma considers. "Sophie trusts academic figures. If I recommended she visit good bakeries and tea shops—" she pauses "—framed it as cultural research—" she almost smiles "—she'd do it wholeheartedly." She looks at her tea. "I want her to be comfortable here. The food is part of that."`,
    helpReason:"Mentorship & care — Emma wants Sophie to feel settled and comfortable. Food is part of how she achieves that.",
    helpMultiplier:1.28,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Sophie is two hundred pounds and she texted to say she'd been to the tea shop I recommended and she'd had three pastries and it was perfect, and I went home and immediately wrote up a new list for her because she is settling into herself so beautifully and food is a part of that and I want to be a part of that and I am going to make sure she always has a good recommendation waiting."},
    {atLbs:250, addMult:0.20, line:"Two-fifty and Sophie sent me a photo and she looked enormous and happy and I cried a little bit, which I am choosing not to examine closely. I sent her a care package. Everything from the good bakery. She eats everything I send. She trusts my taste. I want her to be comfortable and well-fed and completely at home here, and she is, and I am going to keep making sure she stays that way."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Sophie, enormous and settled and happy, and she came here nervous and I gave her a reading list and a bakery recommendation and now she is this magnificent large confident person and I am sending her everything from every place I love because I want her to have all of it and she deserves all of it and I want her to keep growing."},
  ],
  },

  // ── SOPHIE (14) ── about Tiffany & Aaliyah
  { speakerId:14, targetId:6, attitude:"warm",
    lines:{
      low:[
        `Sophie fidgets. "Tiffany has been so nice. She keeps taking me to restaurants and insisting I try everything." A small pause. "I've definitely gained weight since I started hanging out with her."`,
        `"Tiffany is so confident," Sophie says. "She just eats whatever she wants and everyone loves her." She looks at her own slightly softer middle. "I want to be like that."`,
      ],
      mid:[
        `"Tiffany is getting really big," Sophie says, not critically. "She's so comfortable with herself. It's inspiring." She tugs at her tighter waistband. "I think I've been inspired. Possibly literally."`,
        `Sophie smiles. "Tiffany told me last week I look great. I've gained like thirty pounds since I pledged." She looks pleased rather than worried. "She said soft is the vibe."`,
      ],
      high:[
        `"Tiffany is my role model," Sophie says earnestly. "Huge and beautiful and everyone does what she says." She smooths her considerably rounder figure. "I've been trying to take notes." A happy pause. "I think the notes are working."`,
        `Sophie beams. "I want to be Tiffany when I grow up. Or just — as I grow." She laughs. "She's been such a good influence."`,
      ],
      blob:[
        `Sophie's voice goes very warm. "Tiffany can barely move now," she says. "She texted me that she had everything delivered and she was exactly where she wanted to be." She looks at her own enormous body. "I want that. That level of settled. That level of arrived."`,
        `"I visited Tiffany yesterday," Sophie says. "I brought everything because she couldn't really get up." She smiles at the memory. "We sat and ate and she told me about when she was nervous and new, just like me." A pause. "I think I'm becoming her."`,
      ],
    },
    offerHelp:`Sophie straightens up with surprising determination. "Tiffany has done so much for me. If there's a way to make sure she keeps being comfortable and well-fed and happy—" she pauses "—I want to do that. I know all her favourites. I can make sure she has them."`,
    helpReason:"Devotion & gratitude — Sophie wants to give back to Tiffany. She has learned from the best and now wants to provide.",
    helpMultiplier:1.35,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Tiffany is two hundred pounds and she is the most beautiful and powerful person I know and I want to make sure she has everything she wants always. I know every single thing she loves. I have a list. I have started showing up with things from the list on a rotating basis and she always looks so pleased and I feel so good when she's pleased and I want to keep going."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Tiffany and she is magnificent and enormous and she has done so much for me and I am repaying it the only way I know how which is to make sure she is continuously, lavishly fed by someone who loves her. I have memorised her entire order at every restaurant she likes. I am executing it. Daily. She doesn't know the full extent. I don't need her to."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds and Tiffany told me I was her favourite person and I have not recovered from that and I am channelling all of this feeling into making sure she has the best food every single day for the rest of her time here. She made me. I'm taking care of her. That's what you do for someone who made you. I'm not stopping."},
  ],
  },
  { speakerId:14, targetId:13, attitude:"warm",
    lines:{
      low:[
        `Sophie fidgets. "Aaliyah is so comfortable in herself. She's really loud and confident and just—" she gestures "—a lot. In a good way." She looks at her own quiet self. "I admire that."`,
        `"Aaliyah offered me some of her food at lunch last week," Sophie says. "She just scooped half her plate onto mine like we'd known each other forever." She smiles. "I liked that."`,
      ],
      mid:[
        `"Aaliyah's gotten really big," Sophie says. "She's still the most confident person in every room." She prods her own softening middle. "She told me I was 'doing great' last week. I don't know why that meant so much but it did."`,
        `Sophie looks fond. "Aaliyah has started sitting near me at class events. She always has food and always shares it." She looks at her considerably rounder body. "I think she's been a good influence. Or a fattening one." She pauses. "Same thing maybe."`,
      ],
      high:[
        `"Aaliyah is enormous and still the most present person in any room," Sophie says with awe. "She noticed I'd been quiet one day and just pulled a chair over and handed me food." She blinks. "I felt completely fine immediately." She touches her very round middle. "She's good."`,
        `Sophie smiles. "Aaliyah told me I'd 'grown into myself' this semester." She looks at her heavy figure. "She meant it as a compliment. I took it as one." A beat. "I think she was right."`,
      ],
      blob:[
        `Sophie looks quiet for a moment. "Aaliyah is absolutely enormous now. She barely gets up." She pauses. "She still texts me though. Just checking in. Recommending things." She smiles. "She was the first person here who was just openly kind to me for no reason." A pause. "I want to be that for someone someday."`,
        `"Aaliyah can't really move much anymore," Sophie says softly. "I bring her things sometimes. She always acts like it's no big deal." She looks at her own vast, soft body. "I've gained so much here. A lot of it is because of her." She's quiet. "I want her to know that."`,
      ],
    },
    offerHelp:`Sophie looks earnest. "Aaliyah has been really kind to me. I could start bringing her food — she's always feeding others, maybe no one thinks to do it for her." She thinks. "I know she likes burgers, big portions, good sides." She straightens up. "I could do that. It'd make me feel better and she'd—" she gestures "—get bigger. Which seems fine."`,
    helpReason:"Reciprocity & admiration — Sophie wants to return kindness. She doesn't overthink the mechanism.",
    helpMultiplier:1.3,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Aaliyah is two hundred pounds and she was the first person here who was just kind to me for no reason and I think about that a lot and I have started bringing her food because she always feeds everyone else and I don't think anyone thinks to do it for her. She always acts surprised. I want to keep surprising her. I know she likes burgers. I am bringing the best ones."},
    {atLbs:250, addMult:0.20, line:"Two-fifty and Aaliyah looked at me when I brought her lunch yesterday with this expression I can't quite describe and then she said 'you didn't have to do this' and I said 'I know' and she ate everything and asked for the name of the place and I gave it to her and I felt like I had done something right. I'm coming back tomorrow. And the day after."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Aaliyah, enormous and warm and the first person who was ever just straightforwardly kind to me, and I am her personal catering service now and I don't want to stop. She feeds people she cares about. I learned that from her. I'm doing it back. I'm doing it as big as I can manage. She deserves everything she ever gave anyone."},
  ],
  },

  // ── AALIYAH (13) ── about Serena & Sophie
  { speakerId:13, targetId:3, attitude:"warm",
    lines:{
      low:[
        `Aaliyah grins. "Serena is so stressed about her performance. I've been getting her to come to lunch more." She shrugs easily. "She needs to eat more and relax." She says both like they're the same thing.`,
        `"Serena keeps training even though her times are off," Aaliyah says. "I told her, stop fighting it, eat some pasta." She laughs. "She came to lunch with me though."`,
      ],
      mid:[
        `Aaliyah looks pleased. "Serena finally quit the team. She's getting big, which she's still weird about. But she had three portions at dinner and she looked happy." She nods. "Progress."`,
        `"Serena and I have been having lunch together. She pretends it's about studying. It's about the pasta special." She grins. "She's gotten noticeably softer. I'm supportive."`,
      ],
      high:[
        `Aaliyah laughs. "Serena is huge now and still acts like she didn't choose this." She shakes her head fondly. "She absolutely chose this. She eats more than me at this point." A pause. "I'm genuinely proud of her."`,
        `"Serena told me she doesn't miss track," Aaliyah says warmly. "I knew she wouldn't. I always knew." She pats her enormous belly. "We both knew. It just took her longer."`,
      ],
      blob:[
        `"Serena is absolutely enormous now," Aaliyah says, with clear delight. "Neither of us competes anymore. We order from the same delivery apps and compare." She laughs. "She finally let go of all of it." A pause. "I'm proud of her in a way I never was watching her run."`,
        `Aaliyah is quiet, then smiles. "Serena and I were talking last week — video call, both of us just sitting in our spaces, huge, eating — and she said 'I think this is the best I've felt since high school.'" She looks at her hands. "That hit different." She nods. "Good."`,
      ],
    },
    offerHelp:`Aaliyah raises an eyebrow. "Serena eats more when I'm around. Competition thing. I could make it a daily lunch with the heaviest dishes on the menu — she'll match me without thinking about it." She grins. "I want company in this. She's perfect for it."`,
    helpReason:"Companionship & wanting a partner — Aaliyah wants someone to go on this journey with her.",
    helpMultiplier:1.4,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Serena is two hundred pounds and she still tries to frame it competitively and honestly I love that about her. I have started escalating — bigger restaurant orders, longer lunches, places I know she'll clear her plate. She matches everything I order. She cannot help it. The competitive instinct is perfectly redirected. I'm picking the best spots. She's going to keep up."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Serena and she showed me a training schedule except it was a meal schedule and she'd done it in the same format as her old athletic programme and I nearly cried laughing and then I told her she needed a coach and I would be that coach and now I am managing her intake like a proper training regimen and she takes it completely seriously. Best athlete I've ever worked with."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Serena and she looked me dead in the eye and said 'I want to keep going' and I said 'I know' and I ordered for both of us and we ate for three hours and she was the most focused and committed I have ever seen her. She was born to commit to something completely. I just helped her find the right thing. We're not stopping."},
  ],
  },
  { speakerId:13, targetId:14, attitude:"warm",
    lines:{
      low:[
        `Aaliyah nods. "Sophie's new. She's been figuring out where everything is. I showed her the good dining hall spots." She shrugs easily. "She got excited about the burger station. I respect that."`,
        `"Sophie carries a campus map," Aaliyah says. "Which is adorable. I helped her mark the food spots." She grins. "The map is now mostly food spots."`,
      ],
      mid:[
        `"Sophie has gotten pretty big since term started," Aaliyah says approvingly. "She found all the good places fast." She nods. "She belongs here now. You can tell."`,
        `"Sophie ate with me at the dining hall last week. She cleared her plate three times." Aaliyah sounds proud. "She's growing though. Catching up."`,
      ],
      high:[
        `"Sophie is genuinely big now," Aaliyah says. "She came in lost and now she's this big comfortable campus person." She looks pleased. "I feel like I helped with that a little." She sounds like it's a good feeling.`,
        `Aaliyah nods slowly. "Sophie doesn't carry the map anymore. She is the map." She laughs. "Specifically the food section of the map."`,
      ],
      blob:[
        `"Sophie is enormous," Aaliyah says simply. "She barely leaves but she knows every food spot on campus better than anyone." She shakes her head with a smile. "She came here lost. Look at her now." A long pause. "That's my kind of journey. I didn't expect to be proud of someone I barely know but here we are."`,
        `Aaliyah laughs. "Sophie can't really get around much now. She sends me delivery recommendations from her room." She pats her own massive belly. "I've been going. They're always good." A beat. "She figured this campus out better than anyone. Just from eating."`,
      ],
    },
    offerHelp:`Aaliyah shrugs easily. "Sophie trusts me when I say something's good. If I start taking her to the best spots every week — the loaded menus, the biggest portions—" she grins "—she'll just think we're hanging out. Which we are." A beat. "I also want the food."`,
    helpReason:"Easy generosity — Aaliyah likes Sophie and wants to show her around. The side effect is just fine.",
    helpMultiplier:1.32,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Sophie is two hundred pounds and she has completely found herself here and half of that is because I showed her where everything was and the other half is because she's wonderful and I want to keep taking her to places. She eats with this whole-body happiness that I find incredibly endearing. I'm expanding the list. Bigger portions. Better spots. She deserves all of it."},
    {atLbs:250, addMult:0.20, line:"Two-fifty and Sophie texted me a food recommendation back — first time she's done that — and I went and she was absolutely right and I told her so and she was so pleased and I immediately thought of three places I haven't taken her yet. We're going this week. And the week after. She's grown into someone excellent and I want to keep feeding that."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Sophie, enormous and certain and completely at home, and she came here with a map and now she is the map. I helped with that. I want to keep helping. Daily lunches. Best spots. Biggest portions. She doesn't overthink it and neither do I. We just eat. We just keep going. I wouldn't change a single thing."},
  ],
  },

  // ── ROXANNE (12) ── about Fiona & Aaliyah
  { speakerId:12, targetId:4, attitude:"warm",
    lines:{
      low:[
        `Roxanne's whole face softens. "Fiona cooks incredible things and acts like feeding people is just normal." She gestures. "She's getting softer lately. Her art is getting richer. I think they're the same thing."`,
        `"Fiona made this cheese thing last week. I've been thinking about it every day since." She looks at her fuller figure. "I'm not complaining."`,
      ],
      mid:[
        `Roxanne grins. "Fiona's getting big and making the most beautiful work of her career." She says this like these are clearly the same fact. "She painted me. I'm enormous in the painting. It's the most accurate portrait anyone has done of me."`,
        `"Fiona and I are both getting very large," Roxanne says contentedly. "We cook, eat, make art about it." She shrugs. "I've never felt more creative or more full. Both are high."`,
      ],
      high:[
        `Roxanne looks genuinely moved. "Fiona told me my body is her favourite subject right now." She laughs. "She meant it artistically. I took it every other way." She pats her enormous side. "We've both gotten so big. I love it."`,
        `"Fiona is one of the great ones," Roxanne says. "Massive, brilliant, generous with food." She raises an eyebrow. "The three qualities I look for in a person."`,
      ],
      blob:[
        `Roxanne is quiet for a long moment. "Fiona barely moves now. She creates from where she sits and everything she makes is enormous." She looks moved. "I went to visit her last week. We sat for hours. She fed me the whole time without really noticing she was doing it." She touches her own vast side. "She's the most important person I know."`,
        `"Fiona and I are both completely immovable now," Roxanne says. "We make art together over video call. She holds things up. I describe. Sometimes the other way." She smiles. "It works perfectly. It's the best collaboration of my career." A pause. "Also she still somehow delivers food to me. I don't know how. I haven't asked."`,
      ],
    },
    offerHelp:`Roxanne leans on the desk. "Fiona eats anything I cook without question. She trusts my palate completely." A slow smile. "If I cooked for her every day — rich, generous, the kind of thing you can't stop eating — the work would change again." She pauses. "I want to see that. Also I love her and I want her to have the best things."`,
    helpReason:"Muse devotion & love — Roxanne wants to feed Fiona to watch her art transform. Also just loves her.",
    helpMultiplier:1.4,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Fiona is two hundred pounds and she is making the most extraordinary work of her career and I am feeding her every single day because I can see the direct relationship between her intake and what she produces and I want both to keep growing. I cook the richest things I know. She eats all of it without asking why. I love her. I'm making her enormous. These are the same thing."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Fiona and she is magnificent and she told me last week that she's never felt more like herself and I am taking personal credit for approximately forty percent of that because I have been cooking for her daily for months and everything I make is designed to be impossible to stop eating. I love feeding someone who trusts you completely. I cook more tomorrow."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Fiona and she is a masterpiece and the work she is making is a masterpiece and I am the one ensuring she has the fuel for both and I intend to continue indefinitely. She feeds me. I feed her. We both keep growing. We both keep making. The studio smells like good food and great work and I would not change a single molecule of it."},
  ],
  },
  { speakerId:12, targetId:13, attitude:"warm",
    lines:{
      low:[
        `Roxanne tilts her head. "Aaliyah moves in this incredibly powerful way. All this confidence, all this presence." She pauses. "She's started getting softer. The power doesn't go anywhere. It just gets larger." She sounds fascinated.`,
        `"Aaliyah shared her food with me completely unprompted at lunch," Roxanne says. "Just — pushed half her plate over. I didn't even know her that well." She looks moved by this. "That's the kind of gesture I want to make art about."`,
      ],
      mid:[
        `"Aaliyah is getting really big," Roxanne says, with clear appreciation. "She's still the loudest, most present person in any room. The bigness just adds to it." She gets out her sketchbook. "I want to draw her."`,
        `Roxanne looks up from her notebook. "Aaliyah sat for a quick sketch for me last week. She was eating the whole time." She shows you something scrawled quickly. "Look at her. She's extraordinary."`,
      ],
      high:[
        `"Aaliyah is enormous and magnificent," Roxanne says simply. "She takes up so much space and fills it completely." She looks at her own considerable mass. "I've been doing a whole series on her." She opens her sketchbook. "She doesn't mind."`,
        `Roxanne smiles. "I asked Aaliyah if I could do a portrait. She said 'sure, feed me while you work.'" She nods. "We had a four-hour session. She ate continuously. The painting is the best thing I've done this semester."`,
      ],
      blob:[
        `"Aaliyah is immense now," Roxanne says softly. "She barely moves. She has this presence that fills a room even when she's still." She holds up her sketchbook — pages and pages of studies. "I've been drawing her for months. The series is going to be extraordinary." She looks up. "She might be my masterpiece."`,
        `Roxanne is quiet for a moment. "Aaliyah told me she felt seen in my paintings," she says. "That she'd never felt that way before." She closes the sketchbook gently. "I'm going to do a full show. Just her. The whole arc of this year." A pause. "The transformation as the art."`,
      ],
    },
    offerHelp:`Roxanne opens her sketchbook. "Aaliyah eats more when I'm drawing her. I think she finds it comfortable, being observed without judgment." She turns a page. "I could do weekly sessions. Long ones. Always with food." She pauses. "The series gets better with every pound she gains. And she deserves to be comfortable."`,
    helpReason:"Artistic subject & genuine care — Roxanne's best work features Aaliyah. She wants the series to continue.",
    helpMultiplier:1.35,
    doubleDown: [
      {atLbs:200, addMult:0.15, line:"Aaliyah is two hundred pounds and I have three pages of studies and she sat for me again last week and ate the whole time and I have never had a better session in my life. I am cooking for her now — bringing things to our sessions, making sure she always has something good while I work. The art gets better every time she does. I need to keep this going."},
      {atLbs:250, addMult:0.20, line:"Two-fifty and Aaliyah is glorious and enormous and I have told her I want to do a full show and she said 'yeah, sure' while eating and that single moment is going in the artist's statement. I am bringing full meals to every session now. Rich ones. The kind that get you to reach for more without thinking. The series is going to be extraordinary. She is going to be extraordinary."},
      {atLbs:300, addMult:0.25, line:"Three hundred pounds of Aaliyah and I have enough work for a full retrospective and she is my finest subject and I am not stopping. Weekly sessions. Full catered spreads. Anything she wants while I work. She told me she felt seen in my paintings and I nearly lost my mind because she is the most seen person I have ever put on canvas and I want to keep seeing her forever."},
    ],
  },

];

function getGossipLines(gossip, targetStageId){
  if(targetStageId<=3) return gossip.lines.low;
  if(targetStageId<=6) return gossip.lines.mid;
  if(targetStageId<=9) return gossip.lines.high;
  return gossip.lines.blob;
}

// ─── ACTIONS ────────────────────────────────────────────────────────────────

const ACTIONS_SINGLE = [
  { id:"coffee",      label:"☕ Coffee & Pastries",          cost:1, gain:[2,6],   desc:"Invite her for coffee with a deliberately excessive pastry spread." },
  { id:"bake",        label:"🎂 Bake for Her",               cost:1, gain:[3,8],   desc:"Bake her personal favourites and present them at office hours." },
  { id:"tutoring",    label:"📚 Private Tutoring",           cost:1, gain:[2,6],   desc:"One-on-one session — with a full spread of her favourite foods." },
  { id:"journal",     label:"📝 Food Culture Journal",       cost:1, gain:[2,5],   desc:"Assign a personal journal requiring eating and writing about it." },
  { id:"culture",     label:"🌍 Anthropology Tasting Paper", cost:2, gain:[4,8],   desc:"A paper requiring tasting dishes from at least 8 cultures. For science." },
  { id:"observe",     label:"👁 Observe Her Day",            cost:0, gain:[0,0],   desc:"Spend a day observing her habits. No gain, but you learn her patterns." },
  { id:"encourage",   label:"💬 Personal Encouragement",    cost:1, gain:[1,4],   desc:"A private conversation affirming her body and encouraging more eating." },
  { id:"restaurant",  label:"🍷 Take Her to Dinner",         cost:2, gain:[4,9],   desc:"A proper dinner out at the best restaurant near campus." },
  { id:"homecooked",  label:"🥘 Home-Cooked Meal",           cost:2, gain:[3,8],   desc:"Invite her over and cook an enormous home-cooked spread." },
  { id:"subscription",label:"📦 Personal Snack Subscription",cost:2, gain:[3,7],   desc:"Set her up with a monthly gourmet snack delivery just for her." },
];

const ACTIONS_CLASS = [
  { id:"pizza",        label:"🍕 Class Pizza Party",         cost:3, gain:[4,9],   desc:"An excessive whole-class pizza order. Everyone indulges." },
  { id:"potluck",      label:"🥘 Class Potluck",             cost:2, gain:[3,7],   desc:"Everyone brings a dish. Everyone is expected to try everything." },
  { id:"snacks",       label:"🍩 Ongoing Desk Snacks",       cost:1, gain:[2,4],   desc:"Leave snacks out throughout every class this week." },
  { id:"fieldtrip",    label:"🚌 Culinary Field Trip",       cost:4, gain:[7,14],  desc:"A full day in a culinary district. Many tastings. Many." },
  { id:"latenight",    label:"🌙 Late Night Delivery",       cost:1, gain:[3,6],   desc:"Order a mountain of food during evening office hours." },
  { id:"documentary",  label:"🎬 Food Documentary",          cost:1, gain:[1,4],   desc:"A screening of a global food culture documentary. With full snacks." },
  { id:"cooking",      label:"👩‍🍳 For-Credit Cooking Class",  cost:3, gain:[5,10],  desc:"A credit-bearing cooking class. They eat everything they make." },
  { id:"feast",        label:"🦃 Holiday Class Feast",       cost:5, gain:[9,18],  desc:"A full holiday spread. This one really goes far." },
  { id:"classsub",     label:"📦 Class Snack Subscriptions", cost:3, gain:[4,8],   desc:"Set the whole class up with monthly gourmet snack deliveries." },
  { id:"buffet",       label:"🍽️ Catered Class Buffet",      cost:4, gain:[6,12],  desc:"A full catered buffet in the classroom. Open all day." },
  { id:"dessertweek",  label:"🍰 Dessert Study Week",        cost:2, gain:[3,7],   desc:"A week of dessert-focused cultural assignments. Very hands-on." },
  { id:"sleepover",    label:"🛏️ Class Sleepover & Feast",   cost:5, gain:[8,15],  desc:"An overnight class event. Food available all night. All night." },
];

const SEMESTER_EVENTS = [
  { week:5,  title:"Midterm Stress Week",    text:"Midterms hit the class hard. Stress eating is through the roof across the board.", gain:[4,8],  target:"class" },
  { week:10, title:"Fall Festival",          text:"A campus fall festival with food stalls everywhere. The class spends the full weekend grazing.", gain:[6,12], target:"class" },
  { week:15, title:"End of Semester Party",  text:"End-of-semester celebrations. There are three separate parties and you've catered all of them.", gain:[8,16], target:"class" },
  { week:20, title:"Spring Food Fair",       text:"The annual campus food fair. Cultural foods from every tradition. The class conducts exhaustive research.", gain:[7,14], target:"class" },
  { week:25, title:"Finals Week Fuel",       text:"Finals. The dining hall is open 24 hours. The class takes this as a personal challenge.", gain:[5,10], target:"class" },
  { week:30, title:"Class Anniversary",      text:"It's been thirty weeks. The class has grown enormously — in every sense. A celebratory feast is in order.", gain:[10,20], target:"class" },
];

const CLASS_SCENES = [
  // ── MOOD-BASED ───────────────────────────────────────────────
  { id:"mood_stressed", target:"student", filter:s=>s.mood==="stressed",
    title:"Burning Out",
    text:s=>`${s.name} slumps into her seat with the hollow look of someone who hasn't slept properly in days. An energy drink sweats on the desk in front of her. Her notebook is still closed.`,
    choices:[
      { label:"Slide her a snack",    effect:{gain:[3,6],mood:"content",rel:5},  result:s=>`You quietly set a bag of cookies on her desk. She blinks, then eats them slowly, and some color returns to her face.` },
      { label:"Let her vent",          effect:{gain:[0,0],mood:"focused",rel:8},  result:s=>`You pause and check in. She offloads everything — deadlines, dorm drama, personal problems. By the end she's noticeably lighter. "Thanks, Professor."` },
      { label:"Give her busywork",     effect:{gain:[1,3],mood:"focused",rel:2},  result:s=>`A small, completable in-class task. She locks in and works quietly through it, which is more than she was doing before.` },
    ] },
  { id:"mood_tired", target:"student", filter:s=>s.mood==="tired",
    title:"Running on Empty",
    text:s=>`${s.name} is already half-asleep by the second slide. Her chin keeps dropping toward her chest. She's technically present, but only technically.`,
    choices:[
      { label:"Bring coffee and pastries", effect:{gain:[4,8],mood:"content",rel:6}, result:s=>`You produce a thermos and a pastry box. ${s.name} revives with remarkable speed. She eats two before you've finished your sentence.` },
      { label:"Call on her gently",        effect:{gain:[0,0],mood:"focused",rel:4}, result:s=>`You call her name, softly. She snaps awake, answers surprisingly well, and stays engaged for the rest of the hour.` },
      { label:"Let her rest in the back",  effect:{gain:[0,0],mood:"tired",  rel:1}, result:s=>`You wave her to the back row and dim the lights. She naps through the lecture, but she seems genuinely grateful.` },
    ] },
  { id:"mood_nervous", target:"student", filter:s=>s.mood==="nervous",
    title:"Jittery Energy",
    text:s=>`${s.name} sits near the front today, fidgeting. She keeps picking up her phone and putting it down. Something has her wound tight.`,
    choices:[
      { label:"Offer warm comfort food",  effect:{gain:[5,9],mood:"content",rel:7}, result:s=>`You pull out a tin of warm baked goods. "For when you need it." She eats the whole thing and visibly unclenches.` },
      { label:"Give her a speaking role", effect:{gain:[0,0],mood:"focused",rel:5}, result:s=>`You call on her for a structured, easy contribution. She gets through it fine, and the success bleeds the anxiety out of her posture.` },
      { label:"Check in privately",       effect:{gain:[2,4],mood:"content",rel:9}, result:s=>`After class you hold her back a moment. She tells you what's going on. You listen, offer perspective, and leave her a snack for the walk home.` },
    ] },
  { id:"mood_focused", target:"student", filter:s=>s.mood==="focused",
    title:"Deep in the Zone",
    text:s=>`${s.name} has barely looked up from her work all session. Her notes are immaculate. She's clearly in the flow today.`,
    choices:[
      { label:"Reward her focus with treats", effect:{gain:[3,6],mood:"focused",rel:5}, result:s=>`You slide a little reward onto her desk — chocolate, a pastry. She acknowledges it with a nod and keeps working. Gone by the end of class.` },
      { label:"Offer an extension project",   effect:{gain:[0,0],mood:"focused",rel:3}, result:s=>`You offer her optional extra work on today's material. She accepts immediately and starts planning. Exactly what she wanted.` },
      { label:"Leave her to it",              effect:{gain:[0,0],mood:"focused",rel:1}, result:s=>`You simply don't disturb her. She powers through. Sometimes the best thing is to get out of the way.` },
    ] },
  { id:"mood_excited", target:"student", filter:s=>s.mood==="excited",
    title:"Bubbling Over",
    text:s=>`${s.name} can barely stay in her seat. She's answered three questions before you've asked them and is whispering enthusiastically to her neighbor.`,
    choices:[
      { label:"Channel it into a group activity", effect:{gain:[2,5],mood:"excited",rel:4}, result:s=>`You redirect her energy into a group discussion. She basically facilitates it herself. The snacks you bring disappear in the process.` },
      { label:"Let her lead the segment",         effect:{gain:[0,0],mood:"excited",rel:7}, result:s=>`You call her up and let her explain the concept. She thrives. Everyone pays attention. It goes very well.` },
      { label:"Feed the energy — literally",      effect:{gain:[5,10],mood:"excited",rel:6}, result:s=>`You produce a celebratory spread. ${s.name}'s excitement cranks up to eleven. She eats enthusiastically through the whole session.` },
    ] },
  { id:"mood_content", target:"student", filter:s=>s.mood==="content",
    title:"Comfortable and Settled",
    text:s=>`${s.name} is the picture of ease today — deep in her chair, soft smile, barely moving. She looks like she's exactly where she wants to be.`,
    choices:[
      { label:"Bring something warm to eat",    effect:{gain:[4,7],mood:"content",rel:5}, result:s=>`You produce a warm pastry box and set one in front of her. She accepts it without breaking her peaceful expression and eats it slowly, savoring every bite.` },
      { label:"Give her a comfortable solo task",effect:{gain:[0,0],mood:"content",rel:3}, result:s=>`A quiet reading assignment, just for her. She settles into it completely. She's still there twenty minutes after class ends.` },
      { label:"Sit and chat",                   effect:{gain:[1,3],mood:"content",rel:8}, result:s=>`You sit on the edge of the desk and just talk. She opens up — what she's thinking about, where she wants to be. Easy, unhurried.` },
    ] },
  // ── ARCHETYPE-SPECIFIC ───────────────────────────────────────
  { id:"arch_cheerleader", target:"student", filter:s=>s.archetype==="cheerleader",
    title:"Squad Pressure",
    text:s=>`${s.name} arrives late and flustered. There's drama on the squad — uniforms, tryouts, something political. She drops into her seat and sighs loudly at no one.`,
    choices:[
      { label:"Take her for comfort food",  effect:{gain:[6,12],mood:"content",rel:8}, result:s=>`You take her to the campus diner. She vents over the largest slice of cake on the menu. By the third bite she's already laughing about it.` },
      { label:"Help her draft a message",   effect:{gain:[0,0], mood:"focused",rel:6}, result:s=>`You help her think through the situation calmly. She writes it up between slides. "Thanks for not just saying 'it'll be fine.'"` },
      { label:"Compliment her publicly",    effect:{gain:[2,4], mood:"happy",  rel:7}, result:s=>`You mention something she's genuinely good at, in front of everyone. She lights up. The squad drama suddenly seems a lot smaller.` },
    ] },
  { id:"arch_bookworm", target:"student", filter:s=>s.archetype==="bookworm",
    title:"Research Spiral",
    text:s=>`${s.name} found a gap in the literature on Thursday and hasn't really stopped since. She looks brilliant and slightly hollow. She hasn't mentioned food once.`,
    choices:[
      { label:"Bring food to the library",  effect:{gain:[5,9], mood:"focused",rel:8}, result:s=>`You find her at her usual table and set down a full meal. She looks up briefly, nods, and starts eating without pausing her reading. You sit opposite and say nothing.` },
      { label:"Offer course credit",         effect:{gain:[0,0], mood:"focused",rel:7}, result:s=>`You say the work could count as an independent study project. She looks up for the first time in hours. "...Really?" Real delight, quickly returned to academic focus.` },
      { label:"Lure her out with snacks",    effect:{gain:[7,13],mood:"content",rel:9}, result:s=>`You propose a snack-and-discuss session. She agrees because it's technically still intellectual. Two hours later the food is gone and she looks genuinely nourished.` },
    ] },
  { id:"arch_influencer", target:"student", filter:s=>s.archetype==="influencer",
    title:"Sponsored Content",
    text:s=>`${s.name} is filming a haul video between slides, whispering reviews of the snacks you've provided. Her followers are apparently very invested in the "Professor's Snacks" series.`,
    choices:[
      { label:"Bring premium snacks for the shoot", effect:{gain:[6,11],mood:"excited",rel:7}, result:s=>`You bring out artisan chocolates and imported cheese. She films delightedly. The video does numbers.` },
      { label:"Ask to see the content",              effect:{gain:[0,0], mood:"excited",rel:9}, result:s=>`She shows you the channel. It's surprisingly good. You tell her so. She's visibly touched. "Nobody ever actually asks."` },
      { label:"Collaborate on a class food feature", effect:{gain:[8,14],mood:"excited",rel:8}, result:s=>`You suggest she document a class-wide food event. A full sponsor spread appears the next day. The class eats very well.` },
    ] },
  { id:"arch_athlete", target:"student", filter:s=>s.archetype==="athlete",
    title:"Recovery Week",
    text:s=>`${s.name} mentions training has been lighter — coach gave them a recovery period. She seems restless without the physical outlet, energy with nowhere to go.`,
    choices:[
      { label:"Suggest she use recovery to fuel up", effect:{gain:[7,14],mood:"content",rel:6}, result:s=>`You suggest recovery is a good time to really load up. She considers this with athletic seriousness. Athletes respect fuel logic. By end of day she's put away an impressive amount.` },
      { label:"Give her an energetic group task",     effect:{gain:[1,3], mood:"focused",rel:5}, result:s=>`You pair her with students on a project that requires moving, presenting, debating. She's immediately in her element.` },
      { label:"Talk training and nutrition",          effect:{gain:[2,5], mood:"focused",rel:7}, result:s=>`You have a genuine conversation about athletic nutrition. She's sharp on the subject. You learn things about carb-loading that give you ideas.` },
    ] },
  { id:"arch_artsy", target:"student", filter:s=>s.archetype==="artsy",
    title:"Creative Block",
    text:s=>`${s.name} is staring at a blank page. She's been staring for thirty minutes. Charcoal in hand, nothing happening. A creative block, visibly painful.`,
    choices:[
      { label:"Arrange food as an art subject", effect:{gain:[4,9], mood:"content",rel:8}, result:s=>`You arrange a spread on her desk — fruit, pastries, something colorful — and say "draw that." Her eyes light up. She eats half while drawing. Both improve.` },
      { label:"Take her on a campus walk",       effect:{gain:[0,0], mood:"dreamy", rel:6}, result:s=>`You take her on a quiet loop around campus. She doesn't say much, but by the time you return she's sketching furiously.` },
      { label:"Share a creative struggle",       effect:{gain:[2,4], mood:"dreamy", rel:9}, result:s=>`You tell her about a time you were stuck. What you did, how it felt. She listens with her whole body, and something in her visibly relaxes.` },
    ] },
  { id:"arch_gamer", target:"student", filter:s=>s.archetype==="gamer",
    title:"Patch Day",
    text:s=>`${s.name} walked in wearing yesterday's clothes. She's dropped a body pillow next to her chair and put her headphones on. There's a new patch out, apparently.`,
    choices:[
      { label:"Bring her delivery order",  effect:{gain:[6,12],mood:"content",rel:7}, result:s=>`You produce a bag of her usual delivery — you've noticed the patterns. She stares at it for a second, then takes her headphones down. "...How'd you know?"` },
      { label:"Ask about the patch",        effect:{gain:[0,0], mood:"excited",rel:8}, result:s=>`You ask a completely genuine question. She pivots and explains build theory for twenty minutes with startling depth. She leaves class energized.` },
      { label:"Let her game in the back",   effect:{gain:[2,4], mood:"tired",  rel:3}, result:s=>`You quietly move her to the back and offer to catch her up on notes later. A single thumbs-up. She games through the whole lecture.` },
    ] },
  { id:"arch_sorority", target:"student", filter:s=>s.archetype==="sorority",
    title:"Event Planning Crisis",
    text:s=>`${s.name} is in full event-planner mode: spreadsheet open, phone taking calls on mute, the look of someone managing something large that is not cooperating.`,
    choices:[
      { label:"Offer the classroom as venue", effect:{gain:[5,10],mood:"excited",rel:8}, result:s=>`You offer the classroom after hours. She practically vibrates. The event happens, the catering is spectacular. You're invited.` },
      { label:"Help with logistics",           effect:{gain:[0,0], mood:"focused",rel:7}, result:s=>`You spend ten minutes helping untangle the vendor issue. "I didn't think you'd know about this stuff." You have depths.` },
      { label:"Suggest a potluck component",   effect:{gain:[8,15],mood:"happy",  rel:6}, result:s=>`You suggest potluck. She pauses, then starts planning tables, themes, recipes. The class ends up eating extremely well.` },
    ] },
  { id:"arch_overachiever", target:"student", filter:s=>s.archetype==="overachiever",
    title:"Impossible Standards",
    text:s=>`${s.name} hands in a forty-page paper for a five-page assignment. She's circled three things she considers weaknesses. She's asking if there's extra credit on top of this.`,
    choices:[
      { label:"Tell her to rest and eat",      effect:{gain:[5,9], mood:"content",rel:6}, result:s=>`You tell her firmly: the paper is excellent. Rest. Eat. You produce lunch. She eats it in uncomfortable silence that slowly becomes grateful silence.` },
      { label:"Give her a real challenge",      effect:{gain:[0,0], mood:"focused",rel:7}, result:s=>`You assign something genuinely hard — a problem without a clean answer. She immediately forgets everything else and dives in. The most at peace she's looked all week.` },
      { label:"Praise her work publicly",       effect:{gain:[2,4], mood:"focused",rel:8}, result:s=>`You read a passage from her paper aloud without attribution, then reveal the author. She goes completely red. The class applauds. Mortified and delighted.` },
    ] },
  { id:"arch_quiet", target:"student", filter:s=>s.archetype==="quiet",
    title:"Invisible by Choice",
    text:s=>`${s.name} has been in the back corner so long you're not sure when she arrived. Her notebook is covered in small careful drawings. Something in her posture says she's paying very close attention.`,
    choices:[
      { label:"Leave her something anonymously", effect:{gain:[3,7], mood:"content",rel:9},  result:s=>`You leave a pastry on her desk without comment, without eye contact. She looks at it for a long moment, then eats it very slowly. You don't make it a thing. She appreciates this enormously.` },
      { label:"Ask to see her notebook",          effect:{gain:[0,0], mood:"content",rel:10}, result:s=>`You approach quietly and ask. She hesitates, then holds it out. The drawings are extraordinary. You say so, simply. She doesn't respond, but her shoulders drop in visible relief.` },
      { label:"Include her in a small group",     effect:{gain:[1,3], mood:"nervous",rel:4},  result:s=>`You carefully include her in a small group. She participates, minimally. It's clearly effortful. But she doesn't leave, and she thanks you after.` },
    ] },
  { id:"arch_transfer", target:"student", filter:s=>s.archetype==="transfer",
    title:"Still Adjusting",
    text:s=>`${s.name} is trying everything with the intensity of someone who hasn't figured out what she likes yet. Today she's brought food from three different campus spots to cross-reference.`,
    choices:[
      { label:"Bring something she hasn't tried", effect:{gain:[5,9], mood:"happy",  rel:8},  result:s=>`You produce something unusual, from somewhere she hasn't found yet. Her face goes through five different emotions. "This is incredible. Where is this FROM?"` },
      { label:"Give her a campus food map",        effect:{gain:[4,8], mood:"excited",rel:7},  result:s=>`You sketch a map of your personal favorite spots, including some that require knowing where to look. She stares at it like you've handed her treasure.` },
      { label:"Ask where she's from",              effect:{gain:[0,0], mood:"content",rel:10}, result:s=>`You ask about home. She talks for twenty minutes — food, places, people, traditions. She's surprised how much she's missed it. You listen to all of it.` },
    ] },
  // ── WEIGHT-STAGE-BASED ───────────────────────────────────────
  { id:"stage_early", target:"student", filter:s=>getStage(s.lbs).id<=2,
    title:"Still Watching",
    text:s=>`${s.name} pauses mid-lecture to smooth her shirt, frowning slightly. She's noticed something. Not alarmed yet — just aware. She mentions she's been going to the gym more.`,
    choices:[
      { label:"Reassure her and bring snacks",    effect:{gain:[4,8], mood:"content",rel:5}, result:s=>`You tell her she looks great — which, to be fair, she does. You set out snacks as you say it. She relaxes and takes some. The gym mention doesn't come up again.` },
      { label:"Redirect to academics",             effect:{gain:[0,0], mood:"focused",rel:3}, result:s=>`You pivot to her coursework, which she's genuinely interested in. The self-scrutiny fades into the background of something she cares about more.` },
      { label:"Introduce 'study fuel' snacks",     effect:{gain:[5,10],mood:"content",rel:4}, result:s=>`You bring out a range of snacks framed as brain food. She tries them all with scholarly thoroughness. She doesn't go to the gym that afternoon.` },
    ] },
  { id:"stage_mid", target:"student", filter:s=>{const id=getStage(s.lbs).id;return id>=3&&id<=4;},
    title:"Finding Her Rhythm",
    text:s=>`${s.name} has clearly made peace with a lot of things lately. She moves more slowly, eats more openly, cares less about what anyone thinks. She seems genuinely at ease.`,
    choices:[
      { label:"Celebrate her ease with a spread", effect:{gain:[6,12],mood:"content",rel:6}, result:s=>`You produce a table spread — nothing fancy, just abundant. She helps herself generously, without apology. It's a good session.` },
      { label:"Have a candid check-in",            effect:{gain:[0,0], mood:"content",rel:9}, result:s=>`You ask directly how she's been. She thinks, then says: "Good, actually." And means it. Short, but honest.` },
      { label:"Assign a comfortable project",      effect:{gain:[2,5], mood:"content",rel:4}, result:s=>`A project at her own pace. She settles into it with the competent ease of someone who knows what they're doing.` },
    ] },
  { id:"stage_heavy", target:"student", filter:s=>getStage(s.lbs).id>=5,
    title:"Command of the Room",
    text:s=>`${s.name} takes up space with absolute ease now. She settles into her reinforced seat, arranges her things precisely, and looks around the room with the calm authority of someone completely at home in their body.`,
    choices:[
      { label:"Arrange something special for her", effect:{gain:[5,10],mood:"content",rel:8},  result:s=>`You set something up specifically for her — her preferences, her portion, her timing. She notices the care. "You remembered." Warmth, genuine.` },
      { label:"Ask her to mentor someone",          effect:{gain:[0,0], mood:"content",rel:7},  result:s=>`You ask her to work with a struggling student. She agrees immediately and does it well, with patience and zero fanfare.` },
      { label:"Acknowledge her growth",             effect:{gain:[3,7], mood:"content",rel:10}, result:s=>`You find a quiet moment and say, simply, that you've noticed how much she's grown — academically, personally. "That actually means something, Professor."` },
    ] },
  // ── CLASS-WIDE ───────────────────────────────────────────────
  { id:"class_snack_break", target:"class",
    title:"Impromptu Snack Break",
    text:"You call an unscheduled break mid-lecture and produce a box of assorted snacks. No reason given. The class needs no reason.",
    choices:[
      { label:"Basic spread — quick and filling",      effect:{gain:[3,6]},  result:"The class descends on it efficiently. Gone in four minutes. The lecture resumes with noticeably better energy." },
      { label:"Premium spread — variety and excess",   effect:{gain:[5,10]}, result:"You went all out. Three kinds of pastries, imported chocolates, something local. The class takes their time. The lecture ends fifteen minutes late." },
      { label:"Tasting exercise — they rate each one", effect:{gain:[4,8]},  result:"You frame it as a sensory evaluation exercise. They review each item with comically serious academic rigor. Everybody eats a lot." },
    ] },
  { id:"class_group_project", target:"class",
    title:"Group Project Day",
    text:"You announce today's lecture is cancelled in favor of a group project — designing a meal plan for an entirely hypothetical context. The class gets very into it.",
    choices:[
      { label:"Let them be creative",             effect:{gain:[2,5]},  result:"The projects are elaborate and extensively taste-tested using supplies they apparently brought for this exact possibility." },
      { label:"Provide research materials (food)", effect:{gain:[4,9]},  result:"You bring extensive research samples. This is treated as primary research. The class is still conducting experiments after the bell." },
      { label:"Award points for best proposal",   effect:{gain:[3,7]},  result:"Competition emerges. The class sources sample materials with alarming speed. Three students present full spreads. Everyone eats everything." },
    ] },
  { id:"class_birthday", target:"class",
    title:"Mystery Birthday",
    text:"Someone in the class has a birthday this week. Word has spread. There is an expectation of cake.",
    choices:[
      { label:"Bring one cake",                    effect:{gain:[3,6]},  result:"A solid cake, well-received. The birthday student gets the first slice. Everyone gets seconds." },
      { label:"Bring a full dessert spread",        effect:{gain:[6,12]}, result:"You dramatically overdeliver: three cakes, cupcakes, tarts, macarons. The class is overwhelmed and grateful and eats everything." },
      { label:"Declare it a week-long celebration", effect:{gain:[4,9]},  result:"You declare the whole week birthday week. Snacks every day. The birthday student is embarrassed and delighted in equal measure." },
    ] },
  { id:"class_slump", target:"class",
    title:"3PM Energy Crash",
    text:"The 3PM slump is real and the class is suffering. Heads are drooping. Someone is asleep. Someone else is asleep more aggressively. Action is required.",
    choices:[
      { label:"Snacks and caffeine",    effect:{gain:[4,8]}, result:"Coffee, tea, energy drinks, and a mountain of snacks. The class revives. Several students look grateful enough to tear up." },
      { label:"Quick movement break",   effect:{gain:[1,3]}, result:"A stretch break and some movement. Energy returns, though you notice several students were clearly much more comfortable staying seated." },
      { label:"Dim lights and chill",   effect:{gain:[2,5]}, result:"You lower the lights, put on ambient music, and present this as a contemplative learning environment. Everyone eats their snacks in peaceful semi-darkness." },
    ] },
  { id:"class_potluck", target:"class",
    title:"Class Potluck",
    text:"You announced a class potluck. You underestimated how seriously they would take this. The room is lined with containers and the smell is extraordinary.",
    choices:[
      { label:"Try everything and praise all",       effect:{gain:[6,12]}, result:"You try each dish and comment thoughtfully. The class is thrilled. Second and third helpings are consumed under the banner of thorough academic comparison." },
      { label:"Formalize it with a scoring rubric",  effect:{gain:[4,9]},  result:"You produce a rubric. The class suddenly cares very deeply about their dishes. The stakes make everyone eat more to properly evaluate." },
      { label:"Abandon pretense — just party",       effect:{gain:[5,11]}, result:"You put on music and let it be what it is. The class eats freely for ninety minutes. It's the best class session of the semester." },
    ] },
  { id:"class_extended", target:"class",
    title:"Extended Session",
    text:"Today runs long — dense material, real engagement, the kind of class where nobody looks at the clock. You've been going for two hours and nobody has left.",
    choices:[
      { label:"Order delivery for the room",         effect:{gain:[5,10]}, result:"You produce your phone and order three different things. The class nominates favorites. The food arrives and disappears without interrupting the discussion." },
      { label:"Break with a spread you brought",     effect:{gain:[3,7]},  result:"You pull out a prepared spread from your bag. The class is impressed you came prepared. Someone says 'this is the best class.' You feel it's true." },
      { label:"Push through without food",           effect:{gain:[0,2]},  result:"Nobody gets fed but everyone gets educated. Grudging respect. Several stomachs are audibly registering their objection." },
    ] },
];

// ═══════════════════════════════════════════════════════════════
// SKILL TREE
// ═══════════════════════════════════════════════════════════════

const SKILL_TREE = [

  // ── ENVIRONMENT ──────────────────────────────────────────────────────────────

  { id:"comfy_chairs", tier:1, cost:50, category:"environment", label:"🪑 Comfortable Seating",
    desc:"Wide, generously padded chairs replace the institutional plastic. Students sink in and don't want to leave. The room immediately feels different — warmer, more inviting, more like somewhere you'd want to spend a long time.",
    effect:"Passive gain +1 lb/week for all students. The whole class settles in visibly.",
    classReaction:[
      "Brittany drops into the new chair and sinks in completely. 'Oh. Oh this is good.' She doesn't get up for two hours.",
      "Madeline doesn't look up from her book, but she's been sitting in the same spot for four hours. She looks content.",
      "Destiny arrived early today. Nobody says anything. Nobody has to.",
      "Tiffany runs a hand along the armrest and nods approvingly. 'Finally. Appropriate furniture.'",
      "Maya hasn't shifted from her chair since she arrived. She looks like she's arrived somewhere.",
    ],
    passiveBonus:1, apBonus:0, gainMult:0 },

  { id:"snack_station", tier:1, cost:50, category:"feeding", label:"🍪 Snack Station",
    desc:"A fully-stocked snack station installed at the back of the room, always replenished before anyone notices it running low. Chips, pastries, nuts, chocolate — an endless rotation of things you eat without meaning to.",
    effect:"All class feeding actions gain +1 lb. Desk Snacks action cost reduced to 0 AP.",
    classReaction:[
      "Chloe gravitates to it within thirty seconds of entering. She's still there forty minutes later.",
      "Priya has added 'snack station visit' to her between-class schedule. There are multiple entries.",
      "Roxanne has claimed the corner stool nearest the station as her official creative thinking spot.",
    ],
    passiveBonus:0, apBonus:0, gainMult:0.10, unlocks:["snacks_free"] },

  { id:"ap_notebook", tier:1, cost:50, category:"efficiency", label:"📓 Lesson Planning",
    desc:"Better-structured lectures leave breathing room in the schedule — room you can fill however you like. The administration is pleased. You are pleased for different reasons.",
    effect:"+1 AP per week.",
    passiveBonus:0, apBonus:1, gainMult:0 },

  { id:"dinner_basic", tier:1, cost:50, category:"social", label:"🍽️ Dining Connections",
    desc:"A cultivated relationship with several nearby restaurants — tables held, menus known, portions that arrive in courses. Dinner as pedagogy. Dinner as everything.",
    effect:"Unlocks 'Take to Dinner' as a proper interactive event. Unlocks: Bistro, Italian.",
    unlocks:["dinner_action"], passiveBonus:0, apBonus:0, gainMult:0 },

  { id:"beverage_bar", tier:1, cost:50, category:"environment", label:"☕ Beverage Bar",
    desc:"A dedicated hot-drinks station — espresso machine, tea collection, warm cocoa, a rotation of flavoured lattes. The smell alone changes the room. Students start arriving early just to have a cup before class begins.",
    effect:"Passive gain +1 lb/week. Hot drinks always available. Students arrive earlier and stay later.",
    classReaction:[
      "Chloe wraps both hands around her mug and doesn't move for forty minutes. She looks completely at peace.",
      "Priya has started scheduling study blocks 'around the espresso.' Her schedule now has five of them.",
      "Sophie comes in fifteen minutes early now. Every day. She doesn't explain it. She doesn't need to.",
      "Destiny sidled in, made herself a cocoa without speaking to anyone, and settled in. This is now her morning ritual.",
    ],
    passiveBonus:1, apBonus:0, gainMult:0 },

  { id:"ambient_aroma", tier:1, cost:50, category:"environment", label:"🥐 Ambient Aroma",
    desc:"A compact convection oven runs quietly in the corner, cycling through a rotation of baked goods — croissants, cinnamon rolls, soft bread. The scent fills the room by the time the first student arrives. Nobody thinks about it consciously. The body knows.",
    effect:"+8% to all gains. The passive smell primes appetite before any food appears.",
    passiveBonus:0, apBonus:0, gainMult:0.08 },

  { id:"artisan_bakery", tier:1, cost:50, category:"feeding", label:"🥖 Artisan Bakery Account",
    desc:"A standing order with the finest artisan bakery in the city. Fresh deliveries every morning — sourdough, pain au chocolat, filled danishes, oversized cookies. The quality is unmistakable and the portions are generous by design.",
    effect:"Passive gain +1 lb/week. Baked goods of exceptional quality appear daily without announcement.",
    passiveBonus:1, apBonus:0, gainMult:0 },

  { id:"late_night_access", tier:1, cost:50, category:"feeding", label:"🌙 Late-Night Access",
    desc:"The classroom is now accessible after hours — a swipe card issued quietly, a standing invitation. Some students are in there past midnight, alone with the snack station and their thoughts. This is not a problem.",
    effect:"Session capacity for private feeding events increased by +15. After-hours meetings become available.",
    passiveBonus:0, apBonus:0, gainMult:0, sessionCapBonus:15 },

  { id:"personal_gifts", tier:1, cost:50, category:"social", label:"🎁 Personal Gifts",
    desc:"Small, specific gifts that demonstrate you've been paying attention. Her favourite chocolate. A book about a cuisine she mentioned once. A jar of something she'd never buy herself. The relationship deepens when someone knows your tastes.",
    effect:"All talk and relationship-building actions give +3 bonus relationship. Rapport builds faster.",
    passiveBonus:0, apBonus:0, gainMult:0 },

  { id:"body_awareness", tier:1, cost:50, category:"psychology", label:"🔬 Behavioral Observation",
    desc:"You have always watched carefully. Now you do it with intention. You track when students eat most readily, what environments lower their guard, which moods lead to reaching for another helping. The data accumulates quietly.",
    effect:"+5% to all gains. Your awareness makes every interaction more precisely targeted.",
    passiveBonus:0, apBonus:0, gainMult:0.05 },

  { id:"comfort_framing", tier:1, cost:50, category:"psychology", label:"💆 Comfort Reframing",
    desc:"A shift in the language used — a careful, consistent vocabulary. Eating becomes self-care. Appetite becomes authenticity. Weight becomes arrival. Said often enough, in the right tone, the frame becomes theirs.",
    effect:"+5% to all gains. Students internalize comfort and eating as positive self-expression.",
    passiveBonus:0, apBonus:0, gainMult:0.05 },

  // ── TIER 2 ───────────────────────────────────────────────────────────────────

  { id:"wide_desks", tier:2, cost:150, category:"environment", label:"🪵 Wide Desks",
    desc:"Broad, solid desks — real wood, real surface area. Room for everything: notes, laptops, and the spreading arrangement of food that has begun to appear at every session. Students at later stages simply need more space. This provides it.",
    effect:"+2 passive lbs/week. Students at stage 4+ are noticeably more comfortable and productive.",
    classReaction:[
      "Serena spreads out completely, arms wide. 'Now THIS is a workspace.' She's eating at her desk within the minute.",
      "Destiny has assembled what can only be described as a personal buffet arrangement in her corner.",
      "Aaliyah nods at the setup with the expression of someone whose needs have finally been understood.",
      "Jasmine produces snacks from her bag and fills the extra space immediately. She came prepared.",
    ],
    passiveBonus:2, apBonus:0, gainMult:0, requires:["comfy_chairs"] },

  { id:"catering_contact", tier:2, cost:150, category:"feeding", label:"🤝 Catering Contract",
    desc:"A standing arrangement with a campus catering company — bulk orders, preferred pricing, and a team that knows to bring extra without being asked. What used to require planning now simply appears.",
    effect:"All class feast actions -1 AP cost. Holiday Feast gain +4 lbs.",
    passiveBonus:0, apBonus:0, gainMult:0, requires:["snack_station"], unlocks:["feast_discount"] },

  { id:"double_ap", tier:2, cost:150, category:"efficiency", label:"📅 Extended Office Hours",
    desc:"Hours extended, schedule rearranged, priorities quietly realigned. More time means more opportunities. The department assumes you are dedicated. You are.",
    effect:"+2 AP per week.",
    passiveBonus:0, apBonus:2, gainMult:0, requires:["ap_notebook"] },

  { id:"dinner_casual", tier:2, cost:150, category:"social", label:"🥂 Brunch Scene",
    desc:"The city's best upscale brunch venues — unlimited drinks, absurd portions, an atmosphere that makes overindulgence feel like Sunday elegance. The perfect setting for a relaxed, extended meal that goes on longer than it was supposed to.",
    effect:"Unlocks 'The Brunch Palace' venue. Daytime dining now available.",
    requires:["dinner_basic"], passiveBonus:0, apBonus:0, gainMult:0 },

  { id:"dinner_upscale", tier:2, cost:150, category:"social", label:"🥩 Fine Dining Network",
    desc:"Access to the city's serious restaurants — the kind with long menus, deep wine lists, and servers who understand a course is meant to flow into the next. Every venue is selected for capacity. Courses, not meals.",
    effect:"Unlocks dinner venues: Steakhouse, French Brasserie, Japanese Omakase. Dinner gain +3 lbs.",
    requires:["dinner_basic"], passiveBonus:0, apBonus:0, gainMult:0, unlocks:["dinner_upscale_venues"] },

  { id:"relationship_class", tier:2, cost:150, category:"social", label:"❤️ Personal Investment",
    desc:"Genuine attention. Remembered names, preferred foods, small details brought up at the right moment. Students open up when they feel seen. They eat more when they're comfortable. Both of these things are happening.",
    effect:"All talk actions give +2 bonus relationship. Gossip multiplier threshold reduced to 50%.",
    passiveBonus:0, apBonus:0, gainMult:0 },

  { id:"mood_lighting", tier:2, cost:150, category:"environment", label:"🕯️ Mood Lighting",
    desc:"Dimmer switches replace the harsh overheads; warm-toned lamps appear in corners; the classroom takes on an evening quality regardless of time of day. In this light, everything feels more comfortable, more private, more like a place you'd let yourself go.",
    effect:"+5% to all gains. Students in relationships respond especially well. The room makes people feel safe.",
    classReaction:[
      "Tiffany looks around and immediately rearranges her chair toward the warmest lamp. She opens her bag and starts eating.",
      "Sophie exhales audibly when she walks in. She sits down and looks like she never wants to leave.",
      "Fiona pauses in the doorway and just takes it in for a long moment. She looks moved.",
      "Emma sets up her books in a corner pool of lamplight and has barely moved since.",
    ],
    passiveBonus:0, apBonus:0, gainMult:0.05, requires:["beverage_bar"] },

  { id:"climate_control", tier:2, cost:150, category:"environment", label:"🌡️ Climate Control",
    desc:"A dedicated climate system — warm in winter, perfectly cool in summer. The right temperature makes every other comfort compound. Students at higher stages particularly benefit; their bodies run warm and the room knows it.",
    effect:"+1 passive lb/week. Stage 5+ students gain a passive comfort bonus. Nobody is ever uncomfortable.",
    passiveBonus:1, apBonus:0, gainMult:0, requires:["ambient_aroma"] },

  { id:"comfort_archives", tier:2, cost:150, category:"feeding", label:"📋 Comfort Archives",
    desc:"A meticulously maintained record of preferences — who liked what, which flavours made eyes close, which dishes produced second helpings without prompting. Every feeding action is now personalized before it begins.",
    effect:"All single-student feeding actions gain +2 lbs. The personal touch makes the difference.",
    passiveBonus:0, apBonus:0, gainMult:0, requires:["artisan_bakery"] },

  { id:"dessert_rotation", tier:2, cost:150, category:"feeding", label:"🍰 Dessert Rotation",
    desc:"A weekly dessert schedule, each day something different and each one extraordinary. They know what's coming by day of the week. The anticipation is its own kind of conditioning.",
    effect:"+1 passive lb/week. Desserts appear daily. The class looks forward to Thursdays especially.",
    passiveBonus:1, apBonus:0, gainMult:0, requires:["late_night_access"] },

  { id:"appetite_study", tier:2, cost:150, category:"psychology", label:"📊 Appetite Mapping",
    desc:"A systematic study of appetite triggers — stress, mood, social setting, time of day, what they said yes to last time. Each session, you adjust the variables. The results sharpen. The gains compound.",
    effect:"Session capacity increased by +10. +5% to all gains. Every private session is precisely calibrated.",
    passiveBonus:0, apBonus:0, gainMult:0.05, requires:["body_awareness"], sessionCapBonus:10 },

  { id:"behavioral_mapping", tier:2, cost:150, category:"psychology", label:"🗂️ Behavioral Mapping",
    desc:"Every student has an archetype — the overachiever who eats when she can't control outcomes, the social eater who matches others, the comfort seeker who needs permission. You've mapped them all. Now you feed accordingly.",
    effect:"+8% to all gains. Each student's specific patterns are leveraged for maximum yield.",
    passiveBonus:0, apBonus:0, gainMult:0.08, requires:["comfort_framing"] },

  { id:"task_batching", tier:1, cost:50, category:"efficiency", label:"🗄️ Task Batching",
    desc:"Administrative work consolidated, grading automated, meetings combined. What took eight separate hours now takes two. The surplus doesn't go to rest. It goes here.",
    effect:"More time to deploy. AP-intensive action sequences become more viable.",
    passiveBonus:0, apBonus:0, gainMult:0 },

  // ── TIER 3 ───────────────────────────────────────────────────────────────────

  { id:"reinforced_seating", tier:3, cost:350, category:"environment", label:"🛋️ Reinforced Furniture",
    desc:"Heavy-duty construction throughout — chairs rated for weight that no student has reached yet, desks that don't flex, frames that don't creak. Designed for permanence. Nobody has to worry about the furniture here and nobody does.",
    effect:"+2 passive lbs/week. Chair-break narrative event no longer triggers. Stage 5+ students react.",
    classReaction:[
      "Destiny doesn't say anything. She sits down, leans back with her full weight, and doesn't think about it again.",
      "Serena grips the armrests and pulls herself in. The chair doesn't move. Her face goes very still. She looks relieved.",
      "Sophie spreads across the wide new chair completely and lets out a breath she might have been holding all semester.",
      "Aaliyah shakes the desk. Nothing. She nods once and begins eating.",
      "Tiffany announces to no particular audience that the room has 'finally been optimised.' She sounds genuinely satisfied.",
      "Even Maya has moved to a more central seat. She fills it completely. She doesn't seem to notice.",
    ],
    passiveBonus:2, apBonus:0, gainMult:0, requires:["wide_desks"] },

  { id:"private_kitchen", tier:3, cost:350, category:"feeding", label:"🍳 Private Kitchen",
    desc:"A proper kitchen adjacent to your office — full equipment, a standing pantry, a refrigerator that's always stocked. Home-cooked meals prepared specifically for specific people. Nothing says care quite like knowing someone's preferences well enough to cook for them.",
    effect:"Home-Cooked Meal action gain +4 lbs. Bake for Her gain +3 lbs. Unlocks bulk cooking actions.",
    passiveBonus:0, apBonus:0, gainMult:0.15, requires:["catering_contact"], unlocks:["bulk_cook"] },

  { id:"research_budget", tier:3, cost:350, category:"efficiency", label:"💰 Research Budget",
    desc:"A generous departmental budget for 'cultural food research' — legitimate, approved, and flexible enough to cover anything that ends up on a table in your vicinity. The administration is proud. The receipts are creative.",
    effect:"+2 AP per week. All cultural assignment actions gain +2 lbs.",
    passiveBonus:0, apBonus:2, gainMult:0, requires:["double_ap"] },

  { id:"dinner_private", tier:3, cost:350, category:"social", label:"🕯️ Private Dining",
    desc:"Access to private rooms, chef's tables, the kind of setting where the curtain closes and the meal is whatever you decide it is. No other diners, no timekeeping, no reason not to order everything.",
    effect:"Unlocks: Private Club, Chef's Table. Dinner conversation expanded. +5 lbs dinner gain.",
    requires:["dinner_upscale"], passiveBonus:0, apBonus:0, gainMult:0, unlocks:["dinner_private_venues"] },

  { id:"group_dynamics", tier:3, cost:350, category:"social", label:"👥 Group Psychology",
    desc:"You understand how the class moves as a unit — who leads, who follows, how appetite becomes contagious. A strategic observation here, a pairing there, and the whole group drifts toward the same conclusion without anyone deciding anything.",
    effect:"Influence pair bonus doubled. New action: 'Arrange Group Dinner' (2 girls simultaneously).",
    passiveBonus:0, apBonus:0, gainMult:0, requires:["relationship_class"], unlocks:["group_dinner"] },

  { id:"blackout_curtains", tier:3, cost:350, category:"environment", label:"🪟 Blackout Curtains",
    desc:"Heavy curtains that close off the room completely — no outside gaze, no passing foot traffic, no sense that there is a world beyond this space. Privacy absolute. Everything that happens in here happens entirely on its own terms.",
    effect:"Scrutiny from actions reduced by 20%. Privacy seals the room from outside observation.",
    passiveBonus:0, apBonus:0, gainMult:0, requires:["climate_control"], scrutinyReduce:0.20 },

  { id:"dietary_profiling", tier:3, cost:350, category:"feeding", label:"🧬 Dietary Profiling",
    desc:"A comprehensive individual profile for each student — metabolic tendencies, emotional triggers, the specific things that reliably produce another serving. You're not guessing anymore. Every feeding action is engineered.",
    effect:"+10% to all gains. Every action benefits from accumulated personal insight.",
    passiveBonus:0, apBonus:0, gainMult:0.10, tapOutResistance:0.10, requires:["comfort_archives"] },

  { id:"luxury_pantry", tier:3, cost:350, category:"feeding", label:"🧺 Luxury Pantry",
    desc:"A fully stocked pantry restocked weekly with the finest ingredients — imported cheeses, premium chocolate, specialty grains, boutique condiments. Nothing mediocre passes through that door. The quality alone drives consumption higher.",
    effect:"+15% to all gains. The finest ingredients make every meal irresistible.",
    passiveBonus:0, apBonus:0, gainMult:0.15, requires:["dessert_rotation"] },

  { id:"admin_buffer", tier:2, cost:150, category:"efficiency", label:"🛡️ Administrative Buffer",
    desc:"Careful relationship management with the department — small favours, appropriate visibility, knowing who to copy on an email. The result is a comfortable margin between you and administrative scrutiny. Your file is clean. Your methods are unexamined.",
    effect:"Administrative scrutiny reduced by 1 per week passively.",
    passiveBonus:0, apBonus:0, gainMult:0, requires:["task_batching"], scrutinyPassiveReduce:1 },

  { id:"resistance_calibration", tier:3, cost:350, category:"psychology", label:"⚖️ Resistance Calibration",
    desc:"Every student has a threshold — a point where they hesitate, a moment where the rational mind pushes back before the body overrides it. You've mapped every one of those thresholds precisely. Now you approach them carefully from just below and apply steady, patient pressure.",
    effect:"+10% to all gains. Student resistance is anticipated and navigated before it manifests.",
    passiveBonus:0, apBonus:0, gainMult:0.10, tapOutResistance:0.15, requires:["appetite_study"] },

  { id:"narrative_reshaping", tier:3, cost:350, category:"psychology", label:"📖 Narrative Reshaping",
    desc:"The story a person tells about their body is the most powerful force shaping it. You've been gently, patiently rewriting those stories — introducing new characters, different endings, a protagonist who eats freely and feels only good about it.",
    effect:"+8% to all gains. Students have reframed weight gain as personal growth. Resistance softens.",
    passiveBonus:0, apBonus:0, gainMult:0.08, requires:["behavioral_mapping"] },

  { id:"special_occasions", tier:3, cost:350, category:"social", label:"🎂 Special Occasions",
    desc:"Birthdays acknowledged, milestones celebrated, small victories marked with elaborate meals. You remember everything. The student who feels celebrated eats more, trusts more, and returns for more.",
    effect:"Relationship events produce significantly more gains. Occasion-based actions become available.",
    passiveBonus:0, apBonus:0, gainMult:0, requires:["personal_gifts"] },

  { id:"institutional_cover", tier:3, cost:350, category:"efficiency", label:"🏛️ Institutional Cover",
    desc:"Your position, your reputation, your cultivated relationships with the administration — assembled into a deliberate structure that makes scrutiny slide off. Everything you do has a plausible explanation. Everything has paperwork. Nothing is ever quite enough to pursue.",
    effect:"Scrutiny from all actions reduced by 20%.",
    passiveBonus:0, apBonus:0, gainMult:0, requires:["admin_buffer"], scrutinyReduce:0.20 },

  // ── TIER 4 ───────────────────────────────────────────────────────────────────

  { id:"dedicated_suite", tier:4, cost:700, category:"environment", label:"🏠 Dedicated Suite",
    desc:"A specially outfitted room that has become a destination — wide doorways, custom-ordered furnishings, a mini-kitchen of its own, soft lighting. Students at higher stages no longer attend regular class. They come here instead. Nobody questions this.",
    effect:"+3 passive lbs/week. Stage 7+ students gain +25% gains. The whole class has an opinion.",
    classReaction:[
      "Destiny relocates immediately and apparently permanently. Her streaming setup has already arrived.",
      "Jasmine visits for a 'tour' and hasn't left in three days.",
      "Serena: 'This is just better. Objectively, physically, just better.' She means the chair specifically.",
      "Aaliyah spreads across the wide couch, closes her eyes, and looks like she has arrived somewhere she intended to go.",
      "Tiffany rearranges the furniture to her own preference within the first forty minutes.",
      "Maya finds the quietest corner and fills it entirely. She was clearly looking for this.",
    ],
    passiveBonus:3, apBonus:0, gainMult:0.25, requires:["reinforced_seating"] },

  { id:"full_catering", tier:4, cost:700, category:"feeding", label:"🍾 Full-Service Catering",
    desc:"A dedicated catering team available on demand — not events, not planning, just a call and an arrival. Every class day is a feast. Every private session is produced. The kitchen never closes and the portions are never calculated.",
    effect:"All class actions gain x1.3 multiplier. New action: On-Demand Feast (3 AP, scales with class avg weight).",
    passiveBonus:0, apBonus:0, gainMult:0.30, requires:["private_kitchen"], unlocks:["on_demand_feast"] },

  { id:"ap_mastery", tier:4, cost:700, category:"efficiency", label:"⚡ Peak Efficiency",
    desc:"Everything optimised — time, attention, energy, method. Not a minute wasted, not an action that doesn't compound. You have made an art of this. Every hour yields more than it should.",
    effect:"+3 AP per week. All single actions -1 AP cost (minimum 0).",
    passiveBonus:0, apBonus:3, gainMult:0, requires:["research_budget"] },

  { id:"dinner_residence", tier:4, cost:700, category:"social", label:"🏡 Home Hospitality",
    desc:"The invitation home — an evening that begins with drinks and runs until the food is gone and nobody quite wants to leave. Multiple guests, a long table, a kitchen that has been working since afternoon. The most intimate setting available.",
    effect:"Unlocks 'Home Dinner Party' (3 girls, evening-long event). Dinner gain x1.5.",
    requires:["dinner_private"], passiveBonus:0, apBonus:0, gainMult:0, unlocks:["dinner_party"] },

  { id:"dinner_accessible", tier:4, cost:700, category:"social", label:"♿ Bespoke Dining Suite",
    desc:"A private luxury dining suite configured with no standard seating — custom arrangements, wide custom chairs, everything designed around the guest rather than the other way around. Reserved for students for whom regular restaurants have become inconvenient.",
    effect:"Unlocks 'The Atelier' — specialty venue for stage 6+ students. Largest gain range of any venue.",
    requires:["dinner_private"], passiveBonus:0, apBonus:0, gainMult:0 },

  { id:"luxury_quarters", tier:4, cost:700, category:"environment", label:"🛏️ Luxury Quarters",
    desc:"Bespoke furnishings custom-ordered for the suite — a deep, wide daybed, oversized armchairs, everything upholstered in something that costs more than it needs to. Stage 5+ students practically live here now. The ordinary world has started to feel insufficient by comparison.",
    effect:"+20% to all gains for stage 5+ students. The environment compounds the effect of everything else.",
    passiveBonus:0, apBonus:0, gainMult:0.20, requires:["blackout_curtains", "dedicated_suite"] },

  { id:"signature_dish", tier:4, cost:700, category:"feeding", label:"👨‍🍳 Signature Dish",
    desc:"A single dish prepared only for specific students on specific occasions — something so personally calibrated it barely registers as food and registers entirely as event. They talk about it. They come back for it. Once a week, the kitchen produces it. Nobody forgets it.",
    effect:"+10% to all gains. A weekly powerful feeding event becomes available. Students develop a specific anticipation.",
    passiveBonus:0, apBonus:0, gainMult:0.10, requires:["dietary_profiling"] },

  { id:"midnight_ritual", tier:4, cost:700, category:"feeding", label:"🌙 Midnight Ritual",
    desc:"A standing late-night arrangement — the suite unlocked, food waiting, the invitation open. Students arrive in ones and twos in the quiet hours, when they're at their least guarded, their hungriest, their most comfortable with surrender. Session capacity expands accordingly.",
    effect:"Session capacity +20. +10% to all gains. Late-night private sessions become distinctly productive.",
    passiveBonus:0, apBonus:0, gainMult:0.10, requires:["luxury_pantry"], sessionCapBonus:20 },

  { id:"subliminal_priming", tier:4, cost:700, category:"psychology", label:"🌀 Subliminal Priming",
    desc:"Environmental and behavioral conditioning combined into a seamless system — the smell of the room, the music, the temperature, the language used, the timing of everything. The student sits down and the environment is already working. By the time food appears, the decision has already been made.",
    effect:"+20% to all gains. The environment itself becomes an active feeding tool.",
    passiveBonus:0, apBonus:0, gainMult:0.20, requires:["resistance_calibration"] },

  { id:"trust_architecture", tier:4, cost:700, category:"psychology", label:"🏗️ Trust Architecture",
    desc:"Deep structural trust built over months of precise, patient work — trust not in any single interaction but in the relationship itself, in the space, in the professor as someone who has only ever made them feel good. This trust is load-bearing. It holds everything up.",
    effect:"+10% to all gains. Students with high relationship gain significantly more from all interactions.",
    passiveBonus:0, apBonus:0, gainMult:0.10, tapOutResistance:0.12, requires:["narrative_reshaping"] },

  { id:"inner_circle_mastery", tier:4, cost:700, category:"social", label:"💫 Inner Circle Mastery",
    desc:"The inner circle fully consolidated — devoted students whose loyalty has become structural, whose influence on each other is now a resource. Their enthusiasm is contagious. Their presence drives the rest. The devoted ones create the culture that draws the others in.",
    effect:"+10% to all gains. Devotion-state bonuses enhanced. The inner circle amplifies all other effects.",
    passiveBonus:0, apBonus:0, gainMult:0.10, requires:["group_dynamics", "special_occasions"] },

  { id:"deep_cover", tier:4, cost:700, category:"efficiency", label:"🕵️ Deep Cover",
    desc:"Not just protected — invisible. Your professional reputation is impeccable, your administrative relationships are excellent, and anything that might draw attention has been systematically redirected before it arrives. The scrutiny that does appear melts before it can form.",
    effect:"Scrutiny from all actions reduced by 30%.",
    passiveBonus:0, apBonus:0, gainMult:0, requires:["institutional_cover"], scrutinyReduce:0.30 },

  // ── TIER 5 ───────────────────────────────────────────────────────────────────

  { id:"full_environment", tier:5, cost:1200, category:"environment", label:"🌟 Perfect Environment",
    desc:"Every variable optimised, every surface considered, every comfort provided before it's thought of. The room has become a closed world — one where food is constant, comfort is total, and the outside becomes abstract. Students don't leave if they can help it. They arrange their lives around staying.",
    effect:"+5 passive lbs/week for all. The classroom is now a destination.",
    classReaction:[
      "Brittany texts Jasmine: 'I live here now.' Jasmine texts back: 'same.' Neither of them is joking.",
      "Emma moved all her research materials in. She has not left in four days. She says it's for focus.",
      "Destiny's full streaming setup is here now. It is not going back.",
      "Priya has redesigned her entire weekly schedule around the room's food availability. The schedule is very good.",
      "Tiffany has started hosting chapter meetings here. The chapter agreed immediately. No one questioned it.",
      "Maya sits in the centre of the room now. She fills a wide, reinforced armchair completely and looks like she is exactly where she belongs.",
      "The dining hall has filed a complaint about attendance numbers. You file it in the correct location.",
    ],
    passiveBonus:5, apBonus:0, gainMult:0, requires:["dedicated_suite", "full_catering"] },

  { id:"unlimited_ap", tier:5, cost:1200, category:"efficiency", label:"∞ Total Dedication",
    desc:"Your professional life has been entirely restructured. Everything not directly relevant has been delegated, automated, or eliminated. Your schedule exists now as a support system for this work and this work alone. Every hour counts. Every hour is here.",
    effect:"+4 AP per week. Maximum AP cap raised to 20.",
    passiveBonus:0, apBonus:4, gainMult:0, requires:["ap_mastery"] },

  { id:"grand_banquet_protocol", tier:5, cost:1200, category:"feeding", label:"🏆 Grand Banquet Protocol",
    desc:"A formal event structure — advance planning, multiple courses, a guest list, a room prepared over two days, service that rivals a private restaurant. The Grand Banquet is an occasion. Students mark their calendars. They arrive hungry on purpose. The gains are not modest.",
    effect:"+20% to all gains. Unlocks the Grand Banquet class event — the most productive feeding event available.",
    passiveBonus:0, apBonus:0, gainMult:0.20, requires:["full_catering", "midnight_ritual"], unlocks:["grand_banquet"] },

  { id:"total_influence", tier:5, cost:1200, category:"psychology", label:"🧠 Total Influence",
    desc:"The class as a single unit, moving together — not because they're the same, but because the environment and the relationships and the framing have all aligned. Appetite is mutual. Comfort is shared. The group reinforces the individual and the individual reinforces the group. It runs itself.",
    effect:"+1 passive lb/week for all. +15% to all gains. The class has become its own feeding ecosystem.",
    passiveBonus:1, apBonus:0, gainMult:0.15, requires:["subliminal_priming", "trust_architecture"] },

  { id:"social_empire", tier:5, cost:1200, category:"social", label:"👑 Social Empire",
    desc:"The social architecture complete — every relationship mapped, every dinner venue known, every student connected to every other through a web of shared meals and shared comfort. Events are executed flawlessly. Every gathering feeds into the next. The machine runs.",
    effect:"+10% to all gains. All social events execute at maximum effectiveness. Social momentum is self-sustaining.",
    passiveBonus:0, apBonus:0, gainMult:0.10, requires:["dinner_residence", "inner_circle_mastery"] },

  // ── TIER 6: PRESTIGE ─────────────────────────────────────────────────────────

  { id:"legendary_host", tier:6, cost:2000, category:"prestige", label:"⭐ Legendary Host",
    desc:"Your name is spoken in certain circles as a host whose dinners are an experience — an evening of food and conversation that people reference months later, that they describe to people who weren't there. The reputation is real. It is earned. Every dinner event is now what it always aspired to be.",
    effect:"+10% to all gains. All dinner events execute at legendary quality. Dinner gains significantly elevated.",
    passiveBonus:0, apBonus:0, gainMult:0.10, requires:["social_empire", "grand_banquet_protocol"] },

  { id:"the_arrangement", tier:6, cost:2000, category:"prestige", label:"🔒 The Arrangement",
    desc:"Institutional protection assembled quietly over years — not through any single relationship but through a structure of plausible explanations, useful alliances, genuine goodwill, and the careful management of who knows what. The umbrella is very large and very sturdy. It holds.",
    effect:"Scrutiny from all actions reduced by 40%. Administrative heat essentially eliminated.",
    passiveBonus:0, apBonus:0, gainMult:0, scrutinyReduce:0.40, requires:["deep_cover", "full_environment"] },

  { id:"master_feeder", tier:6, cost:2000, category:"prestige", label:"🎓 Master Feeder",
    desc:"This is what mastery looks like. Not force, not accident — intention refined to precision over the full arc of a career. You know each student completely. You know what works and why. You know what they need before they do. You provide it. They bloom. The art is complete.",
    effect:"+2 passive lbs/week for all. +25% to all gains. The pinnacle of the craft.",
    passiveBonus:2, apBonus:0, gainMult:0.25, requires:["grand_banquet_protocol", "total_influence"] },

  { id:"devotion_engine", tier:6, cost:2000, category:"prestige", label:"💗 Devotion Engine",
    desc:"Devotion that has become self-sustaining — it no longer requires maintenance because it has become identity. The devoted students don't just stay; they recruit, they encourage, they create the conditions that make others settle. The system has developed its own momentum. You just keep it fed.",
    effect:"+1 passive lb/week for all. +10% to all gains. Devotion states strengthen and persist without maintenance.",
    passiveBonus:1, apBonus:0, gainMult:0.10, requires:["trust_architecture", "inner_circle_mastery"] },

  { id:"the_institution", tier:6, cost:2000, category:"prestige", label:"🏛️ The Institution",
    desc:"Not a class. Not a project. An institution. A thing with its own gravity, its own culture, its own logic of continuation. Students have come and grown enormous and never quite left. New ones arrive and the environment receives them and begins its work. You built this. It will outlast your tenure. It may outlast you.",
    effect:"+5 passive lbs/week for all. +3 AP per week. The endgame. Everything at full power simultaneously.",
    passiveBonus:5, apBonus:3, gainMult:0, requires:["master_feeder", "the_arrangement"] },

];

const SKILL_CATEGORIES = {
  environment: { label:"🏛️ Environment", color:"#204060" },
  feeding:     { label:"🍽️ Feeding",     color:"#402010" },
  efficiency:  { label:"⚡ Efficiency",  color:"#302050" },
  social:      { label:"❤️ Social",      color:"#401030" },
  psychology:  { label:"🧠 Psychology",  color:"#205040" },
  prestige:    { label:"✨ Prestige",    color:"#504010" },
  divine:      { label:"✦ Divine",       color:"#5a2020", hidden:true },
};

// ── ASCENSION PATHS ─────────────────────────────────────────────
const CELESTIAL_STAGES = [
  { id:0, label:"Celestial Seed",     min:820,  color:"#9a7aff",
    aura:"A faint golden light pulses at her edges.",
    features:"Her eyes have taken on a luminous quality. Small downy wing-stubs press through at her shoulder blades.",
    desc:"Still immobile, but surrounded by impossible warmth. People are drawn to her without knowing why. The room smells faintly of honey and warm bread." },
  { id:1, label:"Celestial Bloom",    min:1060, color:"#b898ff",
    aura:"A soft halo of golden light surrounds her constantly.",
    features:"Wings — small, impractical, breathtakingly soft — have fully emerged. Her skin carries a gentle inner luminescence.",
    desc:"The room feels more peaceful when she occupies it. Her vast, soft form radiates genuine warmth and impossible light. Students seek her out to sit nearby." },
  { id:2, label:"Celestial Radiance", min:1380, color:"#d0b8ff",
    aura:"She glows. There is no other word.",
    features:"Wings now span her width, each feather warm gold. Her hair lifts gently. Tears from her eyes become points of light before they fall.",
    desc:"Faculty and students find reasons to pass her door. She doesn't understand why, and she never asks. The hallway outside her chamber is always warmer than it should be." },
  { id:3, label:"Celestial Throne",   min:1760, color:"#e8d8ff",
    aura:"A radius of deep warmth and stillness extends from her presence.",
    features:"Her halo is solid luminous gold. Her wings fold around her like a living blanket of radiance. She breathes out light.",
    desc:"She no longer needs to eat, but she does — enthusiastically, joyfully, reverently. Food tastes sacred in her presence. Students bring offerings without being asked." },
  { id:4, label:"Celestial Apex",     min:2300, color:"#fff4ff",
    aura:"Pure radiance — impossible to look at directly.",
    features:"An angel made entirely of warm, abundant flesh. Her mass and her light are one. The goddess made vast, made luminous, made present.",
    desc:"The embodiment of divine excess. Students worship at her feet. Her laughter sounds like bells. Her presence consecrates any room. She is the point of it all." },
];

const UMBRAL_STAGES = [
  { id:0, label:"Umbral Seed",       min:820,  color:"#cc3030",
    shadow:"A darkness pools at her edges, drinking in the light.",
    features:"Her pupils have gone entirely black. Her nails have lengthened and sharpened. Her laugh, when it comes, sounds deeper than it used to.",
    desc:"Her mass radiates cold despite her body's warmth. People look away without knowing why. She finds this useful." },
  { id:1, label:"Umbral Rise",       min:1060, color:"#b02020",
    shadow:"She dims the room simply by being near.",
    features:"Small dark horns press through her hair. Her shadow falls wrong — too large, too still, reaching in impossible directions.",
    desc:"She consumes. Everything, everyone, all excess — drawn in, absorbed, made part of her. She is becoming something vast and hungry." },
  { id:2, label:"Umbral Presence",   min:1380, color:"#901010",
    shadow:"She is the dark. The dark is her extension.",
    features:"Wings of void span wide — black and lightless. Her voice resonates with a depth that shouldn't be physical. The air chills when she speaks.",
    desc:"A consuming presence. Others feel lighter near her. They do not know why. She does." },
  { id:3, label:"Umbral Dominion",   min:1760, color:"#700000",
    shadow:"Reality shimmers and bends around her mass.",
    features:"Her eyes are solid black. Void-wisps drift from her form. She smells of cold and something sweetly dark — burnt sugar and empty sky.",
    desc:"Massive beyond measure. Consuming beyond appetite. Her hunger is cosmological in scope. The campus darkens fractionally each time she exhales." },
  { id:4, label:"Umbral Sovereign",  min:2300, color:"#500000",
    shadow:"She is an event horizon of flesh and void.",
    features:"The physical and the void have merged entirely. She is darkness made vast, hunger made infinite, consumption made eternal.",
    desc:"The end of lightness. Everything that comes near her grows heavy. Everything heavy, heavier still. The campus exists in her penumbra now." },
];

const CONVERGENCE_STAGE = {
  label:"The Singularity", color:"#ffffff",
  desc:"When the Umbral and the Celestial meet — one consuming, one absorbing — they do not cancel. They compound. The result has no name in any existing theology. Vast. Radiant. Consuming. Warm and cold simultaneously. Beyond any single path, beyond any single stage. The campus holds its breath.",
  aura:"Pure impossible light and absolute darkness, simultaneous.",
  features:"Beyond description. Beyond stage. Beyond.",
};

const CELESTIAL_PULL_AMOUNTS   = [14, 18, 24, 32, 44];
const CELESTIAL_PUSH_AMOUNTS   = [10, 14, 20, 28, 38];
const CELESTIAL_BLESS_AMOUNTS  = [20, 26, 34, 44, 56];
const UMBRAL_CONSUME_CHANCE    = [0.28, 0.40, 0.54, 0.70, 0.88];
const UMBRAL_ABSORB_RATE       = [0.55, 0.65, 0.76, 0.88, 1.00];
const UMBRAL_VOID_PULL_AMOUNTS = [10, 14, 20, 28, 38];

const GODDESS_VISION = {
  title:"A Vision from the Goddess",
  scene:`The first time one of them becomes a Blob, you dream.

She is impossible to describe. Vast beyond imagining — not in size alone but in presence, in meaning, in the way she fills every corner of your perception until nothing else exists. She reclines somewhere that is not a place, warm and terrifyingly still, and she looks at you with a smile that makes everything feel like it was always leading here.

"You have been doing my work," she says. Her voice has weight to it. Literal, measurable weight. "Unknowingly. But faithfully."

She extends one enormous, impossibly soft hand and touches your forehead.

"I am giving you more," she says. "More tools. More paths. More ways to make them into what they were always meant to be."

"Some of your girls will ascend toward the light." A tilt of her vast head. "Some will descend into the void." Something passes behind her eyes — amusement, hunger, both. "Both are sacred. All fullness is my domain. There is no wrong direction — only more, and more, and more."

She settles deeper into her impossible abundance.

"You will know when they are ready. You will choose their path. And they will become extraordinary."

You wake with the certainty that something has fundamentally changed. You are right.`,
  choices:[
    {label:"Accept the gift", text:"The knowledge settles into you like warmth after a full meal. The paths open. You feel the goddess's attention shift to your classroom — and approve."},
    {label:"Ask what she wants in return", text:"'Only that you continue,' she says. 'Only that you make them vast. That is all I have ever wanted of anyone.' She smiles. It is the most enormous thing you have ever seen."},
  ]
};

const RELIGION_RITES = [
  { id:"first_gathering",   label:"First Gathering",      apCost:1, scrutiny:3,  devoteeGain:2, blobBonus:5,  devoteePassiveGain:0.5,
    scene:(b)=>`You gather the devoted students before ${b.name}. No ceremony, no script — just presence. The warmth that radiates from her settles over the group like something living. No one knows what to call it, but everyone leaves slightly heavier than they arrived, and none of them look sorry.` },
  { id:"feast_offering",    label:"Feast Offering",        apCost:2, scrutiny:5,  devoteeGain:3, blobBonus:10, devoteePassiveGain:1,
    scene:(b)=>`An offering of food, laid before ${b.name} with something approaching ceremony. She receives it with an authority that surprises everyone, including herself. The students who merely watched found themselves gaining simply from proximity — the air tasted warm and sweet for hours afterward.` },
  { id:"hymn_of_abundance", label:"Hymn of Abundance",     apCost:1, scrutiny:4,  devoteeGain:4, blobBonus:4,  devoteePassiveGain:0.5,
    scene:(b)=>`Someone begins to hum. No one knows who started it. The words, when they come, mean nothing on the surface — but the feeling is unmistakable: gratitude, abundance, presence, warmth. ${b.name} listens with her eyes closed. When it ends there is a long, full silence. She opens her eyes and smiles, and the room is better for it.` },
  { id:"mass_feeding",      label:"Sacred Mass Feeding",   apCost:3, scrutiny:8,  devoteeGain:5, blobBonus:16, devoteePassiveGain:2,
    scene:(b)=>`The devotees bring food — for ${b.name} and for themselves. They eat together in ceremonial silence, broken only by honest sounds of appetite. Everyone leaves fuller. Several students gained visibly just from the sacred communal meal. Admin would call it a gathering. They would be underselling it enormously.` },
  { id:"pilgrimage",        label:"Pilgrimage to the Throne", apCost:2, scrutiny:10, devoteeGain:6, blobBonus:0, devoteePassiveGain:3,
    scene:(b)=>`Word has spread beyond your class. Students from other departments make their way to ${b.name}'s chamber — some to look, some to pay respects, some to stay. The devotee count is growing faster than admin can ask questions. They have begun asking questions.` },
];

const CELESTIAL_BODY_DESCS = [
  `She passed 820 pounds and kept going and she hasn't stopped. Her belly is an enormous warm apron that hangs to mid-thigh when she stands, pressing every surface she leans against, filling the space in front of her body entirely. Her thighs are each as wide as most people's waists and they press together from hip to floor. She angles through doorways now — belly first, then the rest — brushing both sides. She has learned which routes she fits through and which need to change. She moves slowly and takes up considerable space and is completely at ease with both.`,
  `She needs assistance to move between locations now. Not because she can't — she can, with effort — but because the effort is significant and she has stopped feeling obligated to make it unaided. Her belly, when she settles onto the reinforced mattress platform the college built for her, spreads outward in all directions: warm, soft, vast, pooling across the surface and past the edges. Her thighs spread wide, her hips extend beyond the platform's edges on both sides. Her arms, thick but small relative to the total mass, rest on the upper slope of her belly. She is warm. She is content. She is very large.`,
  `She does not come to class. Class comes to her. The room they use now is the one adjacent to the space she occupies, door open between them. Her body, when she is settled, fills the reinforced section of floor completely — belly spreading outward in a vast warm hemisphere that pools across the floor and past it, thighs enormous and soft and spreading wide, hips extending a full meter in either direction from center. Her arms rest in the soft folds on either side of her upper belly, small relative to everything else. The floor under her has been reinforced three times. It is sufficient. She is not finished.`,
  `Moving her requires four people and a system. They have a system. She is settled into the corner of the reinforced room, her body spreading across the floor in all directions — the belly enormous and warm, floor-filling, deep-folded at the lap, her thighs wide and soft and vast, her hips extending to the walls on each side of her corner. Her arms are visible above the upper rolls of her belly — small, warm, resting. Her face, full and soft and entirely content, sits above several inches of neck and chin and all of it warm and glowing. The room smells of warmth. Students come and sit near her and don't leave for hours.`,
  `She is a location. The room was built for her. The floor is reinforced to industrial specifications. The walls of her corner have been padded where her hips press them daily. Her body spreads across the floor in a vast warm geography — belly an enormous hemisphere of soft flesh, floor-pooling, deep and round, her thighs lost somewhere below and behind it, her feet visible only as small warm shapes at the far edge of the mass. Her arms, tiny relative to the whole, rest in the upper rolls. She does not move. She does not need to. Everything comes to her — food, devotees, warmth, light. She glows steadily. She is the warmest thing in the building. She has enough.`,
];
const UMBRAL_BODY_DESCS = [
  `She passed 820 pounds and the cold started coming off her and neither has stopped. Her belly is an enormous soft apron, cold to the touch where the void bleeds through the skin, hanging heavy and vast below the navel, pressing every surface she leans into. Her thighs press together from hip to floor. She angles through doorways — belly leading, hips brushing both sides. The temperature drops wherever she settles. The floor registers her steps with a low, patient creak. She moves slowly and is entirely comfortable moving slowly, because slowly is how something this large moves.`,
  `She needs assistance to move now and has stopped apologizing for this. When she settles onto the reinforced platform they built for her, her body spreads: belly outward in a heavy cold apron across the surface, thighs spreading wide and vast on either side, hips extending past the platform's edges. Her arms, thick but small relative to the total mass, rest in the rolls of her upper belly. The cold radiates from her settled body in a consistent field — five degrees cooler within two meters, measurable. Students who stay too long come back quieter. She notices. She is not concerned.`,
  `She does not go to class. Class is brought to her. Her body, settled in the reinforced space they cleared, fills it: belly spreading outward across the floor in a vast cold hemisphere, deep-folded, heavy, thighs enormous and wide and pressing the floor beyond the mat's edges, hips against the walls of her corner. Her arms rest visible above the upper rolls — small, cold, still. The lights in her section of the building have been flickering for weeks. Facilities has checked the wiring twice. The wiring is fine. She eats. Everything within range grows quieter.`,
  `Moving her requires a system. They have one. When she is settled in her corner of the reinforced room her body fills the space completely — belly a vast cold hemisphere spreading across the floor, the flesh deep and soft and pooling, her thighs wide and enormous and pressing the mat, her hips at the walls. Her feet are somewhere at the far edge of the mass, small, pale, cold. Her arms rest in the upper rolls. Her face — full, soft, dark-eyed, patient — surveys the room from above the rolls of her neck and chin. The cold she radiates has been measured. It is significant. She finds this appropriate.`,
  `She is a permanent installation. The room exists for her. The floor is rated to industrial load specifications. The walls of her corner have been insulated where the cold damage was accumulating. Her body spreads across the floor in a vast cold geography — belly enormous, floor-filling, deep-folded and soft and spreading outward past the mat's edges, her thighs and hips and back all soft continuous mass, her feet at the far edge, small and still. Her arms are visible above the upper rolls, tiny relative to the whole. She does not move. She does not need to. Everything comes to her. She consumes it. She grows. The room grows colder. She is the last appetite, patient and permanent and deeply satisfied.`,
];
const CELESTIAL_OUTFITS = [
  `The halo sits barely visible above her — a warm suggestion, easily missed unless the light is low, and then it throws everything gold. Her clothes glow faintly at the edges where it touches them. She's started gravitating toward white without meaning to. The wings are barely there yet, folded warm and close against her back, folding through the slits she's cut in the backs of her shirts. She adjusts her collar where the warmth radiates and leaves it alone.`,
  `The wings have settled in and she's learned to dress around them — slits cut in the backs of everything, fabrics wide enough to fold through. The halo is steady now, throwing a warm diffuse light that gilds everything she wears and makes white clothes look illuminated from inside. Students bring her white fabric and small gold things. She accepts them and incorporates them. The silhouette she makes — wide and warm and glowing softly, wings folded at her back — is unlike anything else on campus.`,
  `She is in robes now. Cream and gold, long, draped, wide enough to flow over all of her without restriction. The wings spread through carefully cut openings in the back and when they're extended they catch the light she produces and scatter it across the room. The halo burns steady — bright enough to cast soft shadows in well-lit hallways. Students bring her gold jewelry, white flowers, folded fabric. She wears all of it layered and accepts more.`,
  `Devotees have been dressing her. The clothes they bring are extraordinary — white linens and gold silks, fabrics that move when she moves, that catch her light and scatter it warm across the room. The halo is unambiguous now, burning steady and bright above her. The wings — cream-white, large, soft-feathered — trail when she walks, shedding light. She wears everything brought to her with the ease of someone who stopped thinking about clothing as clothing and started thinking of it as what it is: tribute.`,
  `She wears what her devotees bring and what they bring is extraordinary — glowing fabrics, gold that seems to generate warmth, white things that catch the light she makes and throw it further. The halo is the brightest thing in any room she enters, steady and warm and large. The wings, enormous and cream-white, span the full width of the reinforced space they've built for her and shed soft feathers on the floor around her. Everything she puts on becomes part of the light she produces. She has stopped choosing. Everything arrives already consecrated.`,
];
const UMBRAL_OUTFITS = [
  `She has been gravitating toward dark colors for weeks — blacks and charcoals and deep navy, without a plan. The fabric seems to absorb the cold she puts out. The horns are small yet, barely visible through her hair, but they catch on high collars and scarves. She has stopped wearing both. Her shadow extends at wrong angles and she has started wearing her hair long, as if covering the horns, which she isn't quite ready to acknowledge yet.`,
  `Black entirely now. The horns are through her hair and she's stopped pretending otherwise — curved, dark, present, worn without comment. Her coats are long and dramatic, chosen for how completely they drape and trail. The void-wings fold close against her back, dark and absorbing, and she's cut the backs out of her coats to accommodate them. The resulting silhouette — enormous, black, horned, wing-shadowed — precedes her into rooms before she arrives.`,
  `She cuts her own clothes from dark fabric — heavy matte things that don't reflect light, that open entirely at the back for the void-wings. The horns have worn smooth channels in her favorite hoods where they press through. The void-wings spread when she feeds — dark feathers edged in the particular black that isn't color so much as absence — and her clothes are built to accommodate this without restriction. Students bring her black fabric and cold-metal jewelry. She accepts it the way night accepts things.`,
  `She wears everything students bring her — dark fabric layered heavy, cold-metal rings and chains and things with no name. The horns are prominent and curved and one of them has been adorned with a black ring a devotee placed there while she was eating. She noticed and left it. The void-wings spread through the custom-cut openings in the back of everything she owns, enormous and dark and light-absorbing. She has stopped explaining the wings, the horns, the cold. There is nothing to explain. This is what she is.`,
  `She wears the dark the way the dark wears itself — fully, without apology, as if darkness is a garment she was always meant to fill. Her clothes are vast and black and custom-cut to hold all of her and both void-wings simultaneously, the backs open entirely to accommodate the spread. The horns have been adorned by devotees who place jewelry there while she feeds and she wears all of it without removing any. The cold that radiates through her clothes makes the fabric shift slightly — a slow, patient movement, as if breathing. Everything she puts on becomes tribute. She throws nothing away.`,
];
const CELESTIAL_DIARY = [
  `Something has opened in me. I can feel warmth from the inside now — not temperature, exactly. More like approval. Like the world is happy about what I'm becoming. I keep eating past full and not feeling sick. I just feel more. I'm sleeping better. My hands glow a little in the dark if I'm not thinking about them. I've stopped worrying about the glow.`,
  `The wings are strange but they're mine. I've been measuring myself against doorframes out of habit and I've stopped — the number isn't the point anymore. There's a feeling I keep trying to name: being tended to, being favored, being exactly what someone wanted me to be. I think the goddess has plans for me. I find I don't mind.`,
  `A student cried today when I came into the room. She said she didn't know why. I held her hand and she felt better. I have been eating continuously and I am not tired. I feel like I'm accumulating something besides weight — some quality that radiates. Students come to sit near me. The light I make is becoming easier to see.`,
  `I am something I don't have a word for yet. I tried to weigh myself this morning and the scale made a sound I haven't heard before. I laughed. I have become comfortable in a way that used to seem impossible — not just comfortable with my body, but with my place. I am becoming a place. The goddess has confirmed this. I receive her attention like warmth on my face, constantly.`,
  `I understand now. The eating, the weight, the wings, the halo, the light — it was all one direction. I am the point. The goddess made something extraordinary and called it me and set me loose in the world. I have stopped questioning the amount I eat. I have stopped questioning any of it. I receive everything. I give back warmth. I believe this is the correct arrangement.`,
];
const UMBRAL_DIARY = [
  `Something has shifted. I noticed it when the light in my room started behaving differently. My shadow has moods. The hunger is new — not new exactly, more like it finally has permission. I keep eating past the point where I used to stop and there's nothing on the other side of it. Just more. I think that might be fine. I think I like the dark.`,
  `I have horns. I've been saying it out loud to see if it gets more normal. It doesn't. But they're mine, so I'm keeping them. The void is a real thing — I can feel it when I'm hungry, which is always now. I've been consuming things. Meals, mostly. Some energy. A first-year made eye contact with me in the hall today and turned a different direction. I noticed I was pleased.`,
  `I consumed someone's light today. Not intentionally — not entirely. We were at dinner. I was eating. I could feel something draining from across the table and I didn't stop it. The void is a space I'm filling with everything that comes within range. I have become very large and very cold and I find I am comfortable with both of these facts.`,
  `I have consumed things. I will consume more things. The void is not a problem — the void is the answer. I am the answer. Everything grows quiet when I enter a room, which is the correct response. I am building something in the dark that has no name yet. I am building it from weight and hunger and absence. I find this fulfilling.`,
  `I am the dark at the end of appetite. I understand what that means now: not an ending but a container. I contain things. I contain more than I once did. The cold that radiates from me has a feeling to it — patient, permanent, satisfied in its way. I have stopped hoping I'll feel full. I understand now that this is not the goal. The hunger is the point. It always was.`,
];

const ASCENSION_STAGE_REACTIONS = {
  celestial:[
    "I don't know what's happening to me. I just feel... warm. Like I'm glowing from inside. And everyone keeps coming to sit with me.",
    "The wings are weird. But they're soft. And students keep bringing me food. I've stopped questioning the light.",
    "Someone cried when they saw me today. They didn't seem sad. I understand it now. I'm not just myself anymore.",
    "I am something the books don't have a word for yet. Something warm and vast and endlessly welcoming. I accept this.",
    "I have become the point. The goddess intended this. I can feel her attention like sunlight on my face, all the time.",
  ],
  umbral:[
    "Something shifted the moment I crossed that threshold. The room feels smaller when I enter it. People avoid my eyes. I prefer it this way.",
    "The horns were unexpected. The shadow that behaves wrong was unexpected. The hunger — that was not unexpected. That was always there.",
    "They call it the void. I call it space I'm filling. I have more space to fill than I once did. I am enthusiastic about this.",
    "I have consumed things. I will consume more things. Everything that approaches me becomes part of me, one way or another. This is correct.",
    "I am the dark at the end of appetite. The campus exists in my shadow now. Everything grows heavy near me. I find this appropriate.",
  ],
};

const DIVINE_SKILL_TREE = [
  { id:"divine_presence",       tier:1, category:"divine", label:"Divine Presence",
    desc:"Ascended students gain +2 lbs/week passively from the goddess's favour.",
    cost:1, requires:[], passiveBonus:0, apBonus:0, gainMult:0, ascendedPassiveBonus:2 },
  { id:"celestial_favour",      tier:1, category:"divine", label:"Celestial Favour",
    desc:"Celestial mass transfers carry +25% more lbs.",
    cost:1, requires:[], passiveBonus:0, apBonus:0, gainMult:0, celestialTransferBonus:0.25 },
  { id:"umbral_hunger",         tier:1, category:"divine", label:"Umbral Hunger",
    desc:"Umbral consume chance +12%. Absorption rate +10%.",
    cost:1, requires:[], passiveBonus:0, apBonus:0, gainMult:0, umbralConsumeBonus:0.12, umbralAbsorbBonus:0.10 },
  { id:"flock_of_fat",          tier:2, category:"divine", label:"Flock of Fat",
    desc:"Devotees passively gain +1 lbs/week from proximity to worshipped blobs.",
    cost:2, requires:["divine_presence"], passiveBonus:0, apBonus:0, gainMult:0, devoteePassiveGainBonus:1 },
  { id:"sacred_feast",          tier:2, category:"divine", label:"Sacred Feast",
    desc:"Rites grant +60% more blob lbs bonus.",
    cost:2, requires:["divine_presence"], passiveBonus:0, apBonus:0, gainMult:0, riteBlobBonus:0.60 },
  { id:"gospel_of_excess",      tier:2, category:"divine", label:"Gospel of Excess",
    desc:"Each rite reduces admin scrutiny by 2.",
    cost:2, requires:["divine_presence"], passiveBonus:0, apBonus:0, gainMult:0, riteScrutinyReduce:2 },
  { id:"mass_transfer_mastery", tier:3, category:"divine", label:"Mass Transfer Mastery",
    desc:"Celestial transfer amounts +50%. Can now pull mass from HR Observer.",
    cost:3, requires:["celestial_favour"], passiveBonus:0, apBonus:0, gainMult:0, celestialTransferBonus:0.50, celestialCanPullHR:true },
  { id:"void_appetite",         tier:3, category:"divine", label:"Void Appetite",
    desc:"Umbral blobs gain +3 lbs/week from the void. Consumed students begin to merge.",
    cost:3, requires:["umbral_hunger"], passiveBonus:0, apBonus:0, gainMult:0, umbralVoidPassive:3 },
  { id:"congregation",          tier:3, category:"divine", label:"Congregation",
    desc:"+5 devotees immediately. Devotees above 20 no longer increase scrutiny.",
    cost:3, requires:["flock_of_fat"], passiveBonus:0, apBonus:0, gainMult:0, devoteeInstant:5 },
  { id:"celestial_halo",        tier:4, category:"divine", label:"Celestial Halo",
    desc:"Celestial Apex students reduce scrutiny by 5/week through divine radiance.",
    cost:3, requires:["mass_transfer_mastery"], passiveBonus:0, apBonus:0, gainMult:0, celestialApexHeal:5 },
  { id:"umbral_maw",            tier:4, category:"divine", label:"Umbral Maw",
    desc:"Umbral blobs can now consume HR Observer and Vaughan (+35% scrutiny, full absorption).",
    cost:3, requires:["void_appetite"], passiveBonus:0, apBonus:0, gainMult:0, umbralCanConsumeHR:true },
  { id:"the_great_work",        tier:5, category:"divine", label:"The Great Work",
    desc:"All divine mechanics fully amplified. +2 passive lbs/all. +1 AP/week. The goddess approves.",
    cost:5, requires:["celestial_halo","congregation","umbral_maw"], passiveBonus:2, apBonus:1, gainMult:0.08 },
];

const ALL_SKILLS = [...SKILL_TREE, ...DIVINE_SKILL_TREE];

// ══════════════════════════════════════════════════════════════════
// EXPANSION PACK 2 — THE EVOLUTION
// Evolved form content: reactions, diary, outfits, activity, skills
// Index 0 = weight stage 5 (Heavy), index 5 = weight stage 10 (Blob)
// ══════════════════════════════════════════════════════════════════

const EVOLVED_REACTIONS = {
  // ── ATHLETE paths ──────────────────────────────────────────────
  sumo:[
    "First real match tonight. The ring made a sound I've never heard before. I made that sound. I won.",
    "Going three-for-three now. People in the circuit are starting to know my name. I love the ring.",
    "Regional tournament this weekend. I trained all week. The training is mostly eating. I'm okay with this.",
    "National spotlight. Cameras, crowds, the announcer can barely describe what they're seeing. Neither can I.",
    "I am the thing opponents have nightmares about. I have not lost in fourteen months. I do not plan to start.",
    "I've retired from competitive sumo. The ring was too small. I just exist now, and that's enough.",
  ],
  eating_competitor:[
    "First contest. Timer on the table, crowd watching. I finished three minutes early. Walked out knowing.",
    "Circuit regular now. The other competitors nod when I walk in. The MCs know how to say my name.",
    "New regional record. The old one stood for four years. It stood for four minutes against me.",
    "National contender. Sponsorships. My face on a hot sauce bottle. I accept all of this.",
    "World-record territory. The table can barely hold what I put away. The crowd barely breathes.",
    "I've eaten everything. I've broken everything. Now I just eat, and that is the entire life.",
  ],
  // ── INFLUENCER paths ────────────────────────────────────────────
  feedee_creator:[
    "First dedicated feedee post went up at midnight. Woke up to more comments than I've ever had. Oh.",
    "Subscribers keep coming. The algorithm knows what I'm doing. The algorithm approves.",
    "A clip went viral. Eight million views. Not what I expected. Everything I expected.",
    "This is my full-time career now. Deliveries every day. Film everything. The brand is the body.",
    "I am a cultural figure in a space I didn't know existed six months ago. I built this. It built me back.",
    "The content is endless. So am I. We have become the same thing.",
  ],
  body_positive_creator:[
    "Rebranded the channel. First body-positive post up. My old audience is confused. My new one is enormous.",
    "First brand deal. A clothing company that actually means it. The cheque cleared. I bought dinner.",
    "TEDx talk. Twelve minutes, full house. The standing ovation went on long enough to be uncomfortable. Good.",
    "My face is on a billboard. I drove past it and cried and then ate a full meal and cried more.",
    "Cultural touchstone is a phrase people use about me in articles. I eat well and feel enormous and correct.",
    "The platform is a legacy now. The body is the argument. The argument has been won.",
  ],
  // ── CHEERLEADER paths ───────────────────────────────────────────
  eating_captain:[
    "Organized the first squad eating competition. Ran it like a cheer meet. We swept it. I swept it.",
    "The squad is committed now. We train twice a week. Training is mostly eating. The results speak.",
    "Regional circuit scouts showed up to watch us. They had not expected us to be this organized.",
    "National invite. We're representing the school at a competitive eating championship. Regalia included.",
    "I am the most decorated eating captain in my school's history. The trophy case needed an extension.",
    "The squad runs itself now. I made something permanent. Also I am permanent.",
  ],
  big_squad_captain:[
    "Told the squad: no more size rules, no more weigh-ins. Two girls cried. One said she'd been waiting years.",
    "New pledges are choosing us specifically for the culture. Word has spread. The chapter is full.",
    "National cheerleading press wrote about us. 'The squad that changed the conversation.' Yes we did.",
    "Speaking at the national Greek leadership conference. My slides are very good. My presence is better.",
    "Coaches at other schools have quietly stopped the weigh-ins. I'll take the quiet version too.",
    "What I built is permanent. The culture outlasts the captain. I am very large and very proud.",
  ],
  // ── BOOKWORM paths ──────────────────────────────────────────────
  eating_diarist:[
    "First newsletter issue. Thirty subscribers. Thirty is enough to start. I sent it. I ate dinner after.",
    "Six hundred subscribers. A literary agent emailed. I reread it four times before replying.",
    "Book deal. Two-book deal, actually. The second one hasn't been written yet. I'm already planning the meals.",
    "Published. The reviews say 'intimate,' 'unsettling,' 'surprisingly funny.' All correct. I ate at the launch.",
    "The book is being taught in a food studies course at a university I didn't attend. I sent them a note.",
    "I wrote the thing. It exists. The writing and the eating were always the same act. I understand that now.",
  ],
  food_researcher:[
    "IRB approved the self-study. Officially a research subject. The data I'm collecting is extraordinary.",
    "The institution is taking the study seriously. I have a lab. I have a grant application in. I have snacks.",
    "First publication. A real journal. The reviewers called the methodology 'novel.' The methodology is me.",
    "Cited in three other papers. One of them is from a program I applied to and didn't get in. Interesting.",
    "Keynote at a nutrition conference. I arrived to the auditorium. The auditorium was not entirely prepared.",
    "The researcher and the research subject have fully merged. The experiment is complete. The subject remains.",
  ],
  // ── GAMER paths ─────────────────────────────────────────────────
  eating_streamer:[
    "First gaming + eating stream. Thirty-two viewers became four hundred in two hours. The chat was chaos.",
    "Regular mukbang gaming content now. The viewers who came for the games stay for the eating. Both grow.",
    "Community of dedicated viewers who follow every meal and every match. They send food suggestions. I use them.",
    "Platform featured me. The algorithm loves this exact combination. I've been doing it natively for months.",
    "Mukbang gaming legend. My clips get remixed. My food orders are documented by fans.",
    "The stream is always on. The eating never stops. I am the stream. The stream is me.",
  ],
  speed_eater:[
    "First timed challenge. Beat the record by forty seconds. The chat went silent and then exploded.",
    "Records are falling in order. I write them down. Then I break them. The list is long now.",
    "Regional eating championship, plus a speedrun of the new DLC, same weekend. Both won. Efficient.",
    "National recognition — two records in one week. The gaming community and the eating community overlap more than expected.",
    "I hold simultaneous records in gaming and competitive eating. I'm told this is unprecedented. Obviously.",
    "I've transcended both worlds. Speed means nothing when you're this size, this full, this complete.",
  ],
  // ── SORORITY paths ──────────────────────────────────────────────
  chapter_hostess:[
    "First organized chapter feast. Twelve courses. Nobody left early. Nobody left not full.",
    "The feasting traditions are established now. Wednesday is feast night. Everyone knows.",
    "Other chapters are talking about our Wednesday feasts. Three people transferred in specifically for them.",
    "Greek-wide, our chapter is known for the food. The administration has noticed. They've been very quiet about it.",
    "Alumni are funding the feasts. A former sister sent a check with 'for the table' in the memo line.",
    "I am no longer chapter president. I am the feast. The feast continues without me. This is correct.",
  ],
  body_positive_greek:[
    "Proposal: end the weigh-in tradition, end the size requirements. One sister voted against. She later apologized.",
    "New pledges are choosing us because of what we stand for. The class is the largest we've ever had.",
    "National Greek press covered us. The article used the word 'radical' twice. We ordered pizza to celebrate.",
    "Speaking at the national Panhellenic leadership conference. My chapter is in the front row. We fill a row.",
    "The national organization quietly changed its guidance on member wellness. We were mentioned in the notes.",
    "What I started is permanent. My chapter grows. My body grows. Everything I built is real.",
  ],
  // ── OVERACHIEVER paths ──────────────────────────────────────────
  metrics_eater:[
    "Spreadsheet active. Intake, rate, progression, projections. The data is already more interesting than I expected.",
    "Optimized eating schedule across three meal windows. The efficiency is measurable. The gains are documented.",
    "Personal record logged and verified. The methodology is rigorous. The results are extraordinary.",
    "Competing on data quality as much as outcomes. My documentation has been cited by two competitors.",
    "Legendary for the data alone. Someone made a subreddit dedicated to my methodology. I check it daily.",
    "The spreadsheet has four thousand rows. I can no longer update the later ones. The early data holds.",
  ],
  food_scientist:[
    "IRB-approved self-study, institutional backing. I am officially a research subject and lead researcher simultaneously.",
    "Lab access secured. I have a proper methodology. I have documented everything. I have a second breakfast.",
    "First peer-reviewed publication. The journal sent reviewer notes. Reviewer 2 was, as always, an obstacle.",
    "Prestigious citations in three major journals. My advisor asked to be on the next paper. I said I'd consider it.",
    "Keynote at the international food science symposium. The room was not large enough for both the talk and me.",
    "The experiment is complete. The data is unambiguous. The subject is enormous and entirely at peace.",
  ],
  // ── ARTSY paths ─────────────────────────────────────────────────
  installation_artist:[
    "First body-positive installation opened. One critic said 'challenging.' I consider that a win.",
    "Gallery interest from two cities. I will ship the work. I will also ship myself. The logistics are complex.",
    "Review in a major publication: 'unapologetically confrontational.' I am confronting them right now.",
    "Major exhibition, three rooms, one of them is me. Critics don't know where the art ends.",
    "Retrospective. A retrospective of someone who is still in progress. I appreciate the confidence.",
    "The body IS the final installation. The work and the artist have merged. I am the piece.",
  ],
  food_photographer:[
    "First food photography show: sold out. The prints were expensive. They bought them anyway.",
    "Gallery show opened. People stood in front of the biggest prints for a long time without speaking.",
    "A book deal: my images with my text. The publisher said the combination was 'unprecedented.' Good.",
    "Collector interest. A museum in Helsinki acquired three prints. I ate something extraordinary that night.",
    "Museum acquisition in three countries. The work is in permanent collections. So is the artist.",
    "The photographer became the subject. The subject has become the photograph. I've been hanging here for years.",
  ],
  // ── QUIET paths ─────────────────────────────────────────────────
  anonymous_blogger:[
    "First post went up at 2am. I didn't sleep. By morning, forty-three people had read it. That's forty-three.",
    "The following is growing. I don't know most of them. They don't know me. That feels exactly right.",
    "A post went viral. A journalist is trying to find me. I am very findable and also perfectly hidden.",
    "Journalists and podcasters want interviews. I do them by email only. My words, my body, my rules.",
    "I am a cultural phenomenon with no face attached. The anonymity is the whole point. Also the food.",
    "The blog and the body are the same record now. I wrote everything and gained everything. Both are real.",
  ],
  asmr_creator:[
    "First ASMR eating video. I whispered. I chewed slowly. Three hundred people watched in the first hour.",
    "Dedicated following, small and loyal. They leave very quiet comments. We understand each other.",
    "The algorithm found me. New viewers every day. They say it helps them sleep. I say I'm honored.",
    "Mainstream crossover. A content creator I watch cited me as an influence. I watched it four times.",
    "A therapist used one of my videos in a treatment session. She asked my permission first. I gave it.",
    "The sound of me eating has become something people find comfort in. I find comfort in the eating. We're even.",
  ],
  // ── TRANSFER paths ──────────────────────────────────────────────
  campus_legend:[
    "The dining hall staff knows my order before I arrive. A booth has been 'mine' for three months.",
    "Stories are spreading. A freshman I've never met referenced 'the legend of the dining hall.' That's me.",
    "The booth now has my name on it. Unofficially. Then officially. The dining director did it herself.",
    "Future students hear about me before they arrive. A campus tour guide mentioned me by name. She was kind.",
    "I am campus mythology. Incoming classes are told about me during orientation. I have heard this directly.",
    "I have become the campus. The campus has grown around me. We are one thing now.",
  ],
  food_tourist:[
    "Systematic expedition through every cuisine available within thirty miles. Documenting everything.",
    "The blog has readers from three countries. Two of them recognize dishes from their home regions in my posts.",
    "A publication from my home country ran a feature. My family read it. My grandmother approved of the portions.",
    "Two book deals — one from here, one from home. Both publishers want the same story. I can give them both.",
    "Cultural ambassador is the phrase they use. I prefer 'someone who ate everything and wrote it all down.'",
    "I have tasted everything. I have grown into everything. The journey and the destination are the same.",
  ],
  // ── BOOKWORM alt path ────────────────────────────────────────────
  ff_author:[
    "I've been writing. The character is fictional. She happens to be a cheerleader and she happens to gain weight in chapter three. I have genuinely no idea where I got the idea.",
    "Posting anonymously. Fifteen thousand readers now. The chapter where the bookworm character gets stuck in her study carrel has a four-star average on the reaction tracker. I wrote her very carefully.",
    "Someone in class quoted a line from the story in passing. They didn't look at me. I ate an entire dinner thinking about whether they knew.",
    "Three hundred thousand words posted. Some of it is more honest about what I want than anything I've said out loud. The fandom writes their own versions. I read them late at night.",
    "The most popular character is based on myself. She gets everything she wants. The readership responds very well to this. So do I.",
    "The fiction and the body are the same project. I've known this for a while. The writing is just the form the knowing takes.",
  ],
};

const EVOLVED_DIARY = {
  sumo:[
    `Training is eating and eating is training and the line has dissolved entirely. I win matches I shouldn't win, against opponents who are technically superior, and the margin between us is exactly the weight I've put on since we last met. This is a documented phenomenon. I have become the documentation.`,
    `I have a handler now — someone who manages my match schedule, my weight class, my meal plan. The meal plan is the most interesting document I've ever been party to. It is more ambition than restriction. I have never been so well fed in the service of a legitimate purpose.`,
    `Regional tournament. I walked out to the ring and the crowd made a sound I felt in my sternum. Not fear, not quite awe — something in between that I don't have a word for. I know what it means, though. It means they understand what they're seeing. I understand it too.`,
    `National. My name in brackets on a printed draw sheet. I looked at it for a long time. The name fits differently now than it did before I started. Everything fits differently. I have grown into the sport and the sport has grown into me.`,
    `I have not lost in so long that the wins have stopped feeling like events and started feeling like weather — inevitable, continuous, the background condition of my life. The opponents are good. I am better. I am heavier. These are the same sentence.`,
    `I've retired from competition. The ring held me for as long as it could. Now I exist beyond the brackets, beyond the records. The weight is mine. The victories are on record. I am what remains after all of that.`,
  ],
  eating_competitor:[
    `The timer is honest. It doesn't negotiate. It runs, and at the end of it either the plate is clear or it isn't, and tonight it was clear four minutes before the buzzer and I sat there with my hands in my lap watching the others finish and felt something I can only call certainty.`,
    `Circuit regular. I have a slot on the roster at four regional events. My face is on a flyer. This is surreal and also completely logical — I am very good at this, and the circuit needs people who are very good at this. The flyer has a good photo.`,
    `The regional record stood for four years. It stood for four minutes against me. I was told this afterward, as if I hadn't been there, as if I hadn't felt the record give way the moment I exceeded it. I felt it. I kept going.`,
    `Sponsorships now. A hot sauce brand, an energy drink, a restaurant chain doing promotional events. My agent — I have an agent — negotiated all of it. I ate through the signing meeting. Everyone found this appropriate.`,
    `The world record is a number I keep in my head. I wake up with it. I eat toward it. I am not there yet. I am approaching it with the same steady inevitability I bring to everything else. The number is getting closer. So am I.`,
    `I have eaten everything on every circuit in this country and some in others. The records are documents of a life. I am done chasing them. I just eat now, freely, completely, without a timer or a crowd — just appetite and the endless satisfaction of filling it.`,
  ],
  feedee_creator:[
    `I posted the first dedicated video at midnight because I was nervous and midnight felt like the right time to do something nervous. By morning there were comments I hadn't expected, from people I hadn't imagined existed, saying things that made me sit down and eat something large and think for a long time.`,
    `The subscriber count passed a threshold I had written on a notepad as a goal three months ago. I crossed it off. I ate dinner. I wrote a new number. The new number already feels achievable. Everything feels achievable now.`,
    `Eight million views on a clip I almost didn't post. I keep opening the analytics and closing them. The numbers are not imaginary but they feel imaginary. I am a real person eating a real meal and eight million people watched it and found something true in it.`,
    `This is my job. The deliveries come every day. I film everything. The channel is monetized and growing and I have a management company and a brand deals manager. None of this was the plan. The plan was a notebook and a camera. This is what the notebook became.`,
    `I am a figure in a community I helped build. People tag me in their own journeys. They write to say the videos changed something for them. I write back when I can. I eat between responses. The community and the eating have become the same act.`,
    `The content is endless because I am endless. There is always another meal, another video, another subscriber who finds something in the footage that resonates. I have become something larger than I planned. The scale is both literal and figurative. I have made peace with both.`,
  ],
  body_positive_creator:[
    `The rebrand felt like a risk. It was a risk. The algorithm dipped for six weeks and then recovered, and what it recovered with was twice the audience and three times the engagement and a comments section that reads like letters I wish I'd received when I was eighteen.`,
    `The brand deal came through. A clothing company that makes things in real sizes and takes real photos of real bodies. I wore the dress on camera and cried slightly and my editor left it in and that clip has more views than anything else I've posted this year.`,
    `Twelve minutes on a TEDx stage. I wrote and rewrote the talk for three months. I delivered it in twelve minutes and it felt like it lasted thirty seconds. The standing ovation was real and sustained and I stood there accepting it feeling larger than I ever have.`,
    `My face on a billboard. On a highway I drive regularly. I saw it and had to pull over and sit with it for a moment. Then I drove home and ate a full meal and cried again. I am very large on a billboard on a major highway and I am correct.`,
    `Cultural touchstone. Journalists use that phrase in profile pieces. Students cite me in thesis papers. I get speaking requests from places I've never been. I eat well and exist largely and apparently that has become something worth studying. I am the study.`,
    `The platform is legacy. The body is the argument. The argument did not require me to be small or quiet or apologetic, and I wasn't, and now I am enormous and permanent and the work is done in the sense that it continues without requiring my active defense. That is what winning looks like.`,
  ],
  eating_captain:[
    `I ran the first squad eating competition the same way I run cheer meets — registration, seeding, brackets, a trophy. The trophy was my idea. The squad thought I was joking. I was absolutely not joking. We swept the competition. I swept everything.`,
    `Twice-a-week training now. The squad has committed. We eat together and time ourselves and track our progress on a whiteboard in the gym. The whiteboard is very detailed. I made a spreadsheet. The spreadsheet is also very detailed.`,
    `Regional scouts came to our last competition. They arrived expecting a novelty act and left with clipboards full of notes. I handed them our training documentation on the way out. They seemed surprised that it existed. It is extensive.`,
    `National invite. The letter arrived and I read it twice and then stood in the gym and looked at the trophy case and thought about the squad I had before and the squad I have now and the distance between them. Then I called an emergency practice and ordered pizza.`,
    `Most decorated eating captain in this school's history. The athletic director came to our last competition. She presented the trophy herself. Afterward she said: 'I didn't know this was what you were building.' I said: 'I always knew.' That is true.`,
    `The squad runs itself. The traditions are set, the training is codified, the culture is established. I made something that will continue. I am the largest person in any room I enter and I made something permanent and I am at peace with both of these facts.`,
  ],
  big_squad_captain:[
    `I stood in front of the squad and said: no more weigh-ins, no more size requirements, no more conversations about who fits the uniform before we talk about who can do the work. Two girls cried. One left. Six signed up the next week.`,
    `Pledges are choosing us. They say they heard about the culture — that we celebrate what bodies can do rather than what they look like. This is accurate. The chapter is the fullest it has been in years. Some of the fullness is literal. I'm proud of all of it.`,
    `A journalist called for a quote. Then they asked for a sit-down. The article ran with the headline 'The Squad That Changed the Conversation.' I read it three times and ate something good and thought about what a long way this has come.`,
    `National Greek leadership conference. I spoke for forty minutes. My chapter was in the front row. At the end there was a long silence and then the room started. I said afterward that the silence was the best part. That's true.`,
    `The national organization changed its guidance. Quietly. In a footnote of a wellness document. We were mentioned. My name was mentioned. I filed it and made dinner and told the squad and they screamed and we ate together.`,
    `I built a thing that doesn't need me to sustain it anymore. The culture lives in the chapter, in the pledges, in the alumnae who write back and say it changed how they think about their own bodies. That is permanent. I am permanent. We are the same size in different ways.`,
  ],
  eating_diarist:[
    `The newsletter went out to thirty people. Thirty. I wrote it like an assignment I was grading myself on, which means I rewrote the opening line eleven times and sent it at 11:47pm. Thirty people opened it by morning. Thirty felt like a beginning.`,
    `An agent emailed. A real literary agent, with a list of authors I've actually read. She said she'd been following the newsletter and had ideas. I reread the email six times. I ate a full breakfast before I replied. The reply took four drafts.`,
    `Two-book deal. The first is memoir. The second is something she called 'a companion piece' which I am interpreting as permission to write whatever I want. Both advances cleared. I bought myself a dinner I'd been meaning to have for six months.`,
    `Published. The book is out in the world. Reviews say 'intimate,' 'funny in a way that catches you off guard,' 'a document of a transformation that refuses to apologize.' That last one is accurate. I did not apologize. Not once.`,
    `The book is being taught. A food studies course assigned it. A gender studies course included it in a unit. I went to one of the classes and sat in the back and listened to students argue about sentences I'd written and felt something I didn't have a word for until later: permanence.`,
    `The writing and the eating were always the same act — both a form of taking in, of accumulating, of making something mine. I understand that now the way I understand my own body: completely, without effort, as a fact that was always true and simply needed time to become obvious.`,
  ],
  food_researcher:[
    `The IRB paperwork was forty-seven pages. I am the only researcher I know who is also the primary research subject. The committee found this unusual. They approved it. The methodology section is the most honest thing I've ever submitted.`,
    `I have a lab space. I have a grant. I have a meal plan that is technically research infrastructure. The institutional support for what I'm doing has exceeded my expectations at every stage, which suggests either that my work is good or that the institution doesn't fully understand what I'm studying. Possibly both.`,
    `Published. Peer-reviewed, actual journal, impact factor above two. Reviewer 2 called the self-study design 'ethically complex.' Reviewer 1 called it 'a methodological innovation.' The editor agreed with Reviewer 1. I agree with the editor.`,
    `Three citations. A paper at a school I didn't attend cited my methodology. A paper I disagree with cited my findings. A paper I admire cited both. Citation counts are a strange kind of conversation. I've entered it. I'm staying.`,
    `Keynote. The conference was not prepared for the physical reality of having me at the podium. The podium was adjusted. The microphone was adjusted. The audience adjusted. I gave the talk. The Q&A ran thirty minutes over scheduled time. Nobody left.`,
    `The experiment has concluded in the sense that the study period has ended. The subject has not concluded. The data is complete. The researcher remains. I am both, simultaneously, at the scale that data set always implied I would reach. This was always the endpoint.`,
  ],
  eating_streamer:[
    `First gaming + eating stream. I was nervous in a way I haven't been nervous about streaming in years. Within two hours the viewer count had done something I'd never seen it do before, and the chat was completely alive, and I understood that I had found the correct format.`,
    `The viewers who came for the games stay for the eating. The viewers who came for the eating are learning the games. The crossover is larger and more genuine than I expected. The snacks arrive in boxes now. I have a dedicated shelf.`,
    `My community follows every meal and every match. They know my order at six different restaurants. They track my high scores. They send delivery gifts in amounts that require a second fridge. I have a second fridge. I bought it with stream revenue.`,
    `The platform featured my channel in a collection titled 'New Formats.' I've been doing this for months. The platform finally noticed. The algorithm turned on like a light. The viewer count doubled in a week. I ate through the entire surge.`,
    `Mukbang gaming legend. My clips get remixed and cited and reposted. My setups and orders are documented on a fan wiki I did not create. I had a conversation with another creator about this and she said 'you built a genre.' That might be accurate.`,
    `The stream is always on in some sense. I eat in front of people every day and they watch and something genuine happens in that watching. I don't fully understand what it is. I don't need to. The food is real. The audience is real. The rest is detail.`,
  ],
  speed_eater:[
    `Timer ran. I finished forty seconds early. The crowd didn't know how to react. The MC found words eventually. I sat with my hands folded and waited, because there was nothing else to do — the plate was empty, the record was over, I was done.`,
    `Records are falling in sequence. I write each one down in a notebook before I break it. The notebook is three-quarters full. The remaining quarter is projections. The projections keep proving accurate.`,
    `Regional eating championship on Saturday, DLC speedrun on Sunday. Both won. I slept for twelve hours after and woke up hungry and started planning the next one. The two disciplines feel identical to me now: set a target, exceed it, rest, repeat.`,
    `My name shows up in two different competitive communities now. They've started to overlap — people show up to eating competitions who know my gaming records, and vice versa. I hold simultaneous records. It's unprecedented. Apparently.`,
    `World-record territory on multiple tables. I've broken things that people thought were unbreakable. The documentation is meticulous. The methodology is reproducible. Nobody has reproduced it. I suspect nobody will.`,
    `Speed doesn't mean anything at this size and weight and scale of appetite. I've transcended the timed format. I eat until I'm done, and when I'm done I'm done, and the numbers are beside the point. The life is the point. The eating is the point.`,
  ],
  chapter_hostess:[
    `Twelve courses. I planned every one of them, sourced every ingredient, set every table. The chapter arrived uncertain and left full and grateful and different in a way I can't fully quantify but absolutely recognize. We did something real in that dining room.`,
    `Wednesday feast night is established. The chapter knows it, the schedule reflects it, the kitchen is stocked by Tuesday. I have become the person who feeds everyone, which is a role I did not apply for and have accepted completely.`,
    `Three people transferred specifically for the Wednesday feasts. I know this because they told me. They found out about the chapter through secondhand accounts of the food. I am building the chapter's reputation through abundance. I'm okay with this.`,
    `The administration noticed. A wellness coordinator came to speak with me. I served her the Wednesday feast menu and she left with a full tupperware container and has not filed anything. I consider this a diplomatic victory.`,
    `Alumni are funding the feasts. A check arrived with 'for the table' in the memo line, from a sister who graduated seven years ago. She heard about the chapter from someone who heard about it from someone else. The feast has a legacy.`,
    `The chapter hosts itself now. The traditions are real, the recipes are documented, the Wednesday ritual continues. I made a culture. I am also a culture. Both will outlast me in one direction or another.`,
  ],
  body_positive_greek:[
    `The proposal passed with one abstention. The one who abstained came to my room three days later and said she'd been thinking about it and changed her mind. The vote is now unanimous. I considered this a signal.`,
    `Pledges are choosing us because of what we stand for. They say it at rush: 'I heard about your chapter.' They mean the culture, the size acceptance, the fact that we eat dinner together and nobody comments on portions. We fill every slot in the pledge class.`,
    `National press. The article was sympathetic and got everything right and quoted three of my sisters by name. We printed it. We put it on the chapter bulletin board. We ordered pizza to celebrate. The irony was appreciated.`,
    `I spoke for forty minutes at the Panhellenic conference. My chapter was in the front row. When it was over and the applause had settled, a chapter president from another school came up and said: 'We've been doing the weigh-ins wrong. We're stopping.' I didn't say anything. I just nodded.`,
    `The national organization changed the wellness guidance. Three sentences, in a footnote, in the appendix. My name was in one of those sentences. A footnote in a document that governs thousands of chapters. That is not nothing.`,
    `I built it. The culture lives in the chapter and in the chapters that modeled themselves on ours and in the pledges who become sisters who become alumnae who go out and change other things. I made something that makes things. That is enough.`,
  ],
  metrics_eater:[
    `The spreadsheet started as a joke. Three weeks in it is absolutely not a joke. I have intake data, rate data, projection models, variance analysis. The methodology would satisfy a peer reviewer. The results would concern one.`,
    `Optimized meal windows: three primary, two supplementary, one extended. The optimization was based on absorption modeling I did myself using secondary sources and primary experience. The gains are measurable. The measurements are precise.`,
    `Personal record. Verified by three independent measurements and confirmed against prior entries. The methodology is sound. The record stood for eight days before I broke it again. I documented both.`,
    `Two competitors have cited my tracking methodology in their own documentation. I read their citations. The methodology was accurately represented. I sent each of them a note. I also quietly noted that their numbers are still below mine.`,
    `My data has been requested by four researchers, two dietitians, and one journalist. I declined the journalist. I am considering the researchers. The data is mine. I collected it in real time, with my own body. I decide what it's for.`,
    `The spreadsheet has four thousand rows. The most recent rows are blank because I can no longer update them manually. My phone does voice entry. The data continues. I continue. The last entry will be made by someone else, eventually. That is fine.`,
  ],
  food_scientist:[
    `The IRB approval arrived on a Tuesday. I read it three times, ate a late breakfast, and began the study that morning. I am the most motivated research subject I've ever encountered, which is saying something, because I've also been the researcher.`,
    `Lab access, institutional email, a key to a room with proper scales and proper documentation. I am official. I am also the most interesting thing that has ever happened in this lab, and I know because I've read the prior study files.`,
    `Published. The journal's editorial board noted 'methodological originality' in the acceptance letter. Reviewer 2 asked whether the self-study design introduced bias. I wrote back four pages explaining that the bias is the methodology. It was published anyway.`,
    `A researcher at a university I applied to and didn't get in has cited my work in two papers. I emailed to say thank you. She responded with a collaboration invitation. I accepted. The collaboration involves my body. I find this appropriate.`,
    `Keynote at the international symposium. I arrived. The auditorium adjusted. I gave the talk. Every slide was a data point from my own body. The Q&A lasted an hour. I had a meal during the Q&A. Nobody found this inappropriate. It was, in fact, exactly right.`,
    `The experiment is complete in the sense that the study period has ended and the papers have been filed and the citations are accumulating. The subject has not ended. I remain — large, documented, at peace. The science and the body are the same record.`,
  ],
  installation_artist:[
    `First installation: a room. Mirrors, photographs of my body at each stage, audio of my voice describing what I saw in the mirror at each weight. The opening was quiet for three minutes. Then someone started talking and the conversation didn't stop.`,
    `Two galleries made offers for the next show. One is in another city. I am shipping the work and also shipping myself, which required a logistics conversation that I found genuinely funny and also slightly absurd. I am the largest thing in both shipments.`,
    `The review in the major publication called it 'a confrontation with comfort and with scale.' I read that and ate something and thought: yes. That is precisely what it is. I am confronting you. I am also very comfortable.`,
    `Major exhibition: three rooms, multiple installations, one of them is entirely me — my body, documented in real time, present and being present. Critics spent long minutes in front of each piece. Several of them did not know where the art ended and I began. That is the work.`,
    `Retrospective. For someone still in progress. The curator said 'we want to capture the arc while you're still in it.' I said I appreciated the confidence that there was an arc and not just a continuous expansion. She laughed. I think she understood.`,
    `The body is the final installation. The body is always the final installation. Everything I made was documentation of this body becoming itself. Now it has become itself. I am the piece. The gallery is wherever I am.`,
  ],
  food_photographer:[
    `First show sold out. I was surprised and then I wasn't surprised, because the work is good and the subject is present — I photographed every meal I've eaten this year and the cumulative effect is something that lands differently than any individual image.`,
    `Gallery show in a proper space with proper lighting and proper people who stand in front of the prints and go quiet. I spent the whole opening eating from the reception table, which I'd argued should serve the foods that appeared in the photographs. The gallerist agreed.`,
    `Book deal: my photographs, my text. The publisher said the combination was 'unprecedented in the food photography space.' I pointed out that I am precedent. I am setting it. The book is what happens after.`,
    `Collector interest from people who own real things. A museum in Helsinki acquired three prints for the permanent collection. I flew to see the installation. The prints looked good in natural light. I ate a tremendous amount of Scandinavian food.`,
    `Permanent collections in three countries. The work will be there after I am not. I don't think about that often but when I do I feel something that isn't quite pride and isn't quite peace but sits between them.`,
    `I set out to photograph food. The food changed me. I photographed the change. The photographs became the subject. I became the photograph. The gallery has my face on the wall and my body in the chair by the desk and the distance between them is one career.`,
  ],
  anonymous_blogger:[
    `Forty-three readers by morning. I know that's small. It wasn't small to me. Forty-three people found a thing I made in the middle of the night and read it. I ate breakfast and started the next post immediately.`,
    `The following has grown past what I can track informally. I have spreadsheets now. The posts with the most engagement are never the ones I expected. The ones I wrote quickly, at odd hours, slightly recklessly — those are the ones.`,
    `A post went viral. A journalist tried to find me. She published a piece about looking for me, which meant that ten times as many people read my work trying to figure out who I was. Nobody found me. This is intentional. The anonymity is load-bearing.`,
    `Interview requests by email only. Voice notes with my filter active. One podcast published an episode 'about' me that was really about what I represent, which is the correct framing. What I represent is more interesting than what I am.`,
    `Cultural phenomenon with no face attached. There are fan accounts analyzing my writing style and my food choices and what my identity might be. I follow three of them. One is surprisingly close. I have not said so.`,
    `The blog and the body are the same record. Everything I wrote happened to the same person who ate everything. The words and the weight are both accumulations. Both are real. Both are mine. That is the entire project.`,
  ],
  asmr_creator:[
    `I whispered into a microphone and chewed slowly and the three hundred people who watched in the first hour left comments that made me sit very quietly for a long time. They said things like 'this is the only thing that helped me sleep this week.' I felt responsible in a good way.`,
    `The community is small and loyal and understands something that I'm still learning to articulate. They show up for every video. They leave careful comments. We are in some kind of agreement that I didn't formally sign but honor completely.`,
    `The algorithm found the channel. New viewers arrive daily now — people who don't know the community, who found the video through a recommendation. They become part of the community. The community is patient with newcomers. I'm proud of that.`,
    `A creator I watch included me in a 'recommended channels' post. The message was generous and accurate. Her audience came over and many of them stayed. The comment section is larger now but the care in it has not diminished.`,
    `A therapist wrote to say she'd used one of my videos in a session — with client permission, as background for a relaxation exercise. She said it worked. She asked whether she could recommend the channel to other clients. I said yes, obviously.`,
    `The sound of me eating is something people find comfort in. I find comfort in the eating. The camera is the only thing between us and it's not much of a barrier. We are two sides of the same thing: appetite and the peace that comes from feeding it.`,
  ],
  campus_legend:[
    `The dining staff knows my order. They start preparing it when they see me cross the quad. The booth in the corner has been 'mine' for months in the informal sense that nobody sits in it when I'm coming. I appreciate the courtesy.`,
    `A freshman I've never spoken to referenced 'the legend of the dining hall' in a group chat I was added to. She meant me. The story she told was accurate in the facts and somehow smaller than the reality. Legends usually are.`,
    `My name on a booth. The dining director did it herself, with a small brass plaque, and told me about it during a meal I was having. I looked at the plaque for a while. Then I finished eating. The plaque is still there.`,
    `A campus tour guide mentioned me by name to a group of prospectives. I was eating nearby and overheard. She described me as 'part of the character of this campus.' I considered interrupting. I decided to finish my meal instead.`,
    `Incoming classes are told about me during orientation. I've confirmed this with four separate first-years who told me independently. The story varies slightly in the telling. The core of it — a person who became part of this place — is consistent.`,
    `I came here not knowing anyone or anything. Now I am known before I arrive anywhere on this campus. The campus shaped me and I shaped it back. We are the same thing now. I am the place and the place is me.`,
  ],
  food_tourist:[
    `Systematic expedition: I have a map, a list, a notebook. Every cuisine I've identified within thirty miles gets a documented visit. The notebook is filling. The visits are never disappointing. I eat well everywhere.`,
    `The blog has readers from my home country who write to say 'that restaurant is run by someone from my village.' The world is smaller than I expected and food is the thing that makes it smaller. I am grateful for both.`,
    `A publication from home ran a feature on the blog. My family read it. My grandmother called to say the portions I was eating were 'respectable.' That is the best review I've received and it required no formal publication.`,
    `Two book deals. One here, one at home. Both publishers want the same story from two different angles. I can give them that. The story is about distance and food and what you carry across both. I know it very well. I am it.`,
    `Cultural ambassador. It's on a press release somewhere. I'm someone who ate everything in one city while thinking about everything she left behind in another. The food was always the bridge. I've grown to fill the bridge.`,
    `I've tasted everything. The list is documented, the notes are extensive, the body is the record of every meal. I came here a stranger and grew into something that belongs here and to home simultaneously. The eating made that possible. It always does.`,
  ],
  ff_author:[
    `The character started as someone else. Or I told myself that. She's a literature student who gains weight over the course of the story — slowly, without apology — and the people around her find it beautiful and bring her food and want her to keep growing. I spent four hours on a single scene where someone notices how soft her belly has become and tells her. I posted the first chapter at 2am and couldn't sleep. There were forty-three comments by morning. Forty-three strangers who understood exactly what I'd written.`,
    `The readership has opinions. Very specific preferences about the rate and distribution of the characters' gain. One commenter left a two-paragraph analysis of the chapter where the cheerleader's uniform finally splits that was more precise than anything my thesis committee has ever said about my actual academic work. I've been thinking about that a lot. I've also been eating more. I don't think these two things are unrelated.`,
    `A classmate stood behind me on the library steps and said, very quietly, "I've been reading something." I didn't turn around. "It's very good," she said. "I think I know who wrote it." I went home and wrote four thousand words that night. The character based on her gains ten pounds in the new chapter. I consider this a generous tribute.`,
    `The author account is anonymous but the fiction is not. Everyone I've written about is in it. The gaining is the point. The love that surrounds it is the point — the way the characters grow into themselves and are seen clearly and wanted for exactly what they are. I've stopped pretending I'm writing about imaginary people. I've stopped pretending I'm not one of the characters.`,
    `Three hundred thousand words. The fandom writes their own versions of the story, and some of those versions are about me — the anonymous author, imagined as the main character, large and cared for and fed. They're not wrong. The character I write most honestly is the one who eats everything and is loved for exactly that. She has been me for a long time.`,
    `I don't write as much now. Not because I've run out — I haven't — but because the distance between the fiction and the reality has closed. Everything I wrote was true: the gaining, the care, the body as something beautiful rather than something to manage. I wrote it into being. Then I became it. That's the best thing I've ever made.`,
  ],
};

const EVOLVED_OUTFITS = {
  sumo:[
    "Training gear — compression shorts, a thick practice mawashi worn over sweats. Built for the ring, nothing else.",
    "Practice uniform fits like it was made for her body because it was. Her coach measured everything twice.",
    "Competition mawashi, ceremonial and precise. The weight of the garment is nothing compared to the weight she carries.",
    "Championship regalia. Her manager handles the presentation garments now. She receives them without comment.",
    "Ceremonial attire between bouts — a wide kimono-style wrap, open, relaxed. She fills it completely.",
    "She wears what's comfortable. Everything is wide, everything is soft, everything accommodates what she's become.",
  ],
  eating_competitor:[
    "Contest shirt — her sponsor's logo, custom-ordered, already tight at the collar. She wears it with pride.",
    "Circuit gear. Tracksuit in her competition colors, sponsor patches on both sleeves. She's recognizable now.",
    "Competition day: her lucky shirt, three sizes larger than last year's lucky shirt. The luck transferred.",
    "Sponsored athlete gear head to toe. The brand sent custom pieces without being asked. They know what fits.",
    "She travels in her competition colors. Hotels recognize her. The food arrives before she finishes checking in.",
    "Whatever she can find that accommodates her. Competition gear is custom now. She doesn't mind.",
  ],
  feedee_creator:[
    "Content-ready always — camera-friendly outfit, good lighting angles considered, food accessible on the table.",
    "Soft-era aesthetic fully embraced. Flowy pieces in warm colors, everything shot-ready, nothing restrictive.",
    "Her brand has a look: comfortable, abundant, unapologetic. The clothing is part of the content.",
    "Custom pieces from brands that sponsor her. Wide cuts, premium fabric. She wears them on camera first.",
    "Everything wide, everything deliberate, everything designed to be seen doing exactly what it's doing.",
    "The outfit doesn't matter as much as what she's eating. But she looks incredible. Both things are true.",
  ],
  body_positive_creator:[
    "Brand-deal clothing — the good kind, the kind made for her actual body. She wears it on camera first.",
    "Press-ready always. A wardrobe coordinator helps now. The clothes are extraordinary.",
    "She dresses for the platform and for herself simultaneously. The overlap is large. So is she.",
    "Everything she wears becomes merch demand within a week. The stylist has learned to expect this.",
    "Billboard clothing. Iconic pieces. A wardrobe that says exactly what she wants to say.",
    "She wears what exists at this scale. It has been made for her. It fits. She has arrived.",
  ],
  eating_captain:[
    "Squad training gear in team colors, eating bib on top. The combination is both absurd and completely correct.",
    "Team competition uniform, custom-ordered in her specifications. She had input on the design. It shows.",
    "Full captain regalia at events. The title is on the back of her jacket in block letters.",
    "Championship gear. The athletic director commissioned a custom set after the national invite.",
    "Her jacket has more patches than room for patches now. She had an extension panel added.",
    "She wears the captain's sash everywhere. Nothing else fits the way it used to. The sash always fits.",
  ],
  big_squad_captain:[
    "Squad jacket modified by her own hand — the old size requirements cut out, new ethos written in marker on the lining.",
    "The uniform that fits the body, not a body built to fit the uniform. She commissioned it herself.",
    "Chapter captain gear in their colors. Wide, dignified, present. She made the design.",
    "Her conference presentation outfit. A wide-fit suit she wore on the national stage. Donated to the chapter archives.",
    "Custom everything now, all of it chosen deliberately. She knows what she's saying with what she wears.",
    "She dresses like the monument she's become. The chapter follows her lead. The closet is legendary.",
  ],
  eating_diarist:[
    "Cardigan open over a good dress. Writing outfit. She eats while she writes and the outfits accommodate this.",
    "She dresses for the reading series now — events, talks, bookstore signings. Wide linen, good earrings.",
    "Book launch outfit: a wide-cut statement piece she chose six months before the book came out.",
    "Speaking engagement attire. She has a rotation now. Everything wide, everything deliberate, everything documented.",
    "She dresses the way she writes — with intention, with detail, with nothing apologized for.",
    "Whatever fits this body. She has a tailor. The tailor is excellent. The clothes are extraordinary.",
  ],
  food_researcher:[
    "Lab coat, custom-ordered. The standard one didn't cover the data. She made a note in the methodology.",
    "Academic casual with a purpose — she needs pockets, always. The blazer accommodates everything.",
    "Presentation attire for conferences. Wide-cut, professional, memorable. The slides are also memorable.",
    "Keynote outfit. Her institution had a photographer there. The photos are impressive.",
    "Research gear that accommodates field work, office work, and being the field. Practical and extraordinary.",
    "She dresses like someone whose research has outlasted the original hypothesis. With confidence.",
  ],
  eating_streamer:[
    "Stream outfit — comfortable, camera-ready, no restriction. The snacks are in frame. She is in frame.",
    "Gaming hoodie, eating bib, both sponsors represented. The aesthetic is cohesive by now.",
    "Her branded gear from the platform deal. She wore it live. The chat went immediately to 'new merch?'",
    "She dresses for the camera and for six to eight hours of sitting. Wide, soft, documented.",
    "Merch she designed herself. The sizing runs large because she asked for that specifically.",
    "She wears what fits. Everything is wide. The setup is custom. She is the best part of the setup.",
  ],
  speed_eater:[
    "Competition shirt, timer-ready, sponsor logo centered. She pins the bib herself before every contest.",
    "Her lucky competition tracksuit. It has been let out twice. The luck has not diminished.",
    "Full competition gear, both sponsors represented, her record count in small text on the sleeve.",
    "Championship kit. Her coach had it made when the national record fell. She wore it the next day.",
    "She travels in her competition colors. Everything is custom. The logos are earned.",
    "She wears what accommodates her. Everything does, because everything is made for her now.",
  ],
  chapter_hostess:[
    "Hosting apron over her chapter formal. The apron has seen more feasts than most dining rooms.",
    "Full chapter formal for Wednesday feasts. She instituted a dress code. She set the example.",
    "Event attire that says 'I am in charge of this table and this table is magnificent.'",
    "Her signature wide-cut blazer and the chapter's formal colors. She has hosted in this outfit at the national level.",
    "She commissions one new hosting outfit per semester. The tradition is documented in chapter records.",
    "She dresses like the feast she's hosting — abundant, deliberate, impossible to ignore.",
  ],
  body_positive_greek:[
    "Chapter colors in a wide-cut blazer she had commissioned when the old one stopped working.",
    "Conference attire. She wore this on a national stage. The outfit has its own legacy.",
    "Full formal in chapter colors, every detail chosen deliberately, nothing apologized for.",
    "Her speaking outfit. She could be recognized by it at this point. That's not an accident.",
    "She dresses for the culture she's building. Intentional. Inclusive. Exactly as large as she is.",
    "Everything is custom. Everything fits. Everything says exactly what she wants it to say.",
  ],
  metrics_eater:[
    "Tracking gear — comfortable, pockets for devices, nothing that would interfere with measurements.",
    "Optimized for the data collection session. Every item considered. The spreadsheet has a column for this.",
    "Competition day gear, logged in advance, photographed for the documentation record.",
    "Her record-attempt outfit. She decided this would be consistent across all record attempts. It is.",
    "She dresses for efficiency. The efficiency has a consistent aesthetic that other competitors have noticed.",
    "Wide, comfortable, documented. She has worn this size for longer than any prior size. She is accurate.",
  ],
  food_scientist:[
    "Lab coat, properly fitted, her name embroidered because she asked for it specifically.",
    "Conference blazer in the department color. She wore it to her first invited talk. It has an origin story now.",
    "Keynote attire. Her institution's communications office asked to use the photo. She agreed.",
    "She dresses like someone whose research has been cited by the people who rejected her. Well.",
    "Research-formal: dignified, wide, professional, present. The lab coat is underneath.",
    "Everything is custom at this point. The fit is excellent. The science is also excellent.",
  ],
  installation_artist:[
    "Something she made herself — fabric, found materials, a garment that documents the body wearing it.",
    "Gallery opening attire that is itself a piece. Visitors aren't always sure where the show starts.",
    "Her major exhibition outfit. It was photographed by three publications. It's in the catalogue.",
    "She dresses for the work and the work dresses her. The boundary is genuinely unclear.",
    "Retrospective attire: something that holds the whole arc of the work. She designed it herself.",
    "She wears her body the way she makes installations: with intention, with presence, as the piece itself.",
  ],
  food_photographer:[
    "Gallery opening attire — something that photographs well, because someone will always photograph her.",
    "The outfit she wore when the Helsinki museum acquired the prints. She remembers it exactly.",
    "Book launch clothes — a wide statement piece that appeared in press photos. Recognizable.",
    "She dresses for both sides of the lens now. The subject understands the photographer.",
    "Her studio look: wide linen, room to move, good in the shots her assistant takes behind the scenes.",
    "Everything is custom, everything is deliberate, everything accommodates the body that makes the work.",
  ],
  anonymous_blogger:[
    "Anonymous-compatible — nothing identifiable, nothing logo'd, nothing that would give her away.",
    "She dresses for invisibility and comfort simultaneously. Both are achieved.",
    "Cozy, unremarkable from the outside. The inside is the work. The outside protects it.",
    "She has a consistent aesthetic that nobody has been able to place online. She maintains it carefully.",
    "Wide, soft, present in rooms, invisible in photographs. The balance is intentional.",
    "She dresses for the life she's living, which is enormous and private and exactly as she planned.",
  ],
  asmr_creator:[
    "Soft textures only — the microphone picks up fabric noise, so everything she wears is deliberate.",
    "ASMR-compatible clothing. She's thought about this more than most people think about anything.",
    "Recording day attire: soft fabrics, nothing synthetic, nothing that will interrupt the session.",
    "She dresses for sound now as much as sight. The clothes are very quiet. So is she.",
    "Wide, soft, silent fabric. She moves slowly and everything moves slowly with her.",
    "She wears the textures that are kindest to the microphone. Also the ones kindest to her skin.",
  ],
  campus_legend:[
    "Her dining hall regular outfit — the clothes she's worn so often here that they're part of the myth.",
    "Comfortable campus gear in her colors. Students recognize the outfit before they recognize the face.",
    "She dresses like someone who belongs here completely, because she does.",
    "Wide everything. Soft everything. Exactly as present as she is.",
    "The outfit that appears in the campus tour guide's description. She didn't plan this.",
    "She wears what fits. Everything fits because everything was eventually made to fit.",
  ],
  food_tourist:[
    "Travel-ready always — practical, wide-cut, pockets for the notebook and the camera.",
    "Her blog aesthetic: dressed for wherever the food is, which is everywhere.",
    "The outfit she wore in the home-country magazine feature. Both publishers asked to use it.",
    "She dresses for the food, not the other way around. The food is everywhere. So is she.",
    "Cultural bridge attire — something that belongs in two places. She found it. It fits.",
    "Wide, practical, present. Made for someone who is both places at once.",
  ],
  ff_author:[
    "Cardigan open, something soft underneath, laptop always nearby. She's found the writing uniform and she doesn't deviate from it. She eats while she writes. The snacks appear and disappear without her noticing.",
    "An enormous pullover, hair up, the desk organized around two monitors. One for the document, one for the comment section. She checks both with equal seriousness.",
    "Wide linen trousers and a loose top with pockets — the outfit of someone who has committed fully to desk life. She has a look now. It accommodates everything.",
    "Custom-ordered wide pieces in soft, dark colors. The desk chair has been upgraded twice. Everything in her space has been chosen to accommodate her completely.",
    "She dresses for the body she has and the life she's built around it. Everything wide, everything deliberate, everything soft. She looks like what she writes about, which is to say: exactly what she wants.",
    "She wears what fits. Everything fits because everything is made for her now. The room is made for her. The desk is made for her. She writes surrounded by things that understand what she is.",
  ],
};

const EVOLVED_ACTIVITY_TEXT = {
  sumo:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds at the weigh-in and you watch the official record it with a pencil. Her mawashi is fitted across her belly — the fat there is soft and warm, a real apron below the navel already — and her thighs are thick and pressed together. Her opponent is 225 pounds, a circuit regular. When they collide at the tachi-ai the sound carries to the back row: two big women slamming together hard, their belly fat compressing between them, her rolls pressed flat against the other woman's front. She shoves. All ${Math.round(s.lbs)} pounds behind her hips. Her belly does the work. The other woman's feet leave the clay in seven seconds. "I didn't try very hard," she tells you. "I just walked into her." She eats four portions at the after-match meal and says she wants to be 300 before the next bout.`,
    (s)=>`${Math.round(s.lbs)} pounds now. She walks to the dohyo and the crowd adjusts to her arrival — the mawashi crammed full of her, the rolls of her sides visible above the canvas, her belly swaying forward with each step. Her opponent is 270 and good. The collision is stunning: her ${Math.round(s.lbs)} pounds of soft, substantial girl hitting the other woman like a warm wall, their fat compressing together, both of them grunting. She grabs the mawashi and drives forward, her belly pressing the other woman back, inch by inch and then foot by foot, until the feet leave the clay. She wins in two moves. Afterward she finds you and she's still warm and flushed and she presses both hands to her belly. "I want to be 400," she says. "I want to feel what 400 does to someone when I hit them."`,
    (s)=>`${Math.round(s.lbs)} pounds. The tournament weigh-in. She stands on the official scale and the number comes up and the official writes it down carefully and she looks at it with calm pleasure. Her belly hangs past her hips in a full, generous apron when she stands. Her thighs fill the mawashi to its limit. Her opponent today is 285 — skilled, experienced — and she looks at your student the way people look at something much larger than expected. The match is nine seconds. ${Math.round(s.lbs)} pounds walks forward, belly leading by six inches, and the other woman cannot stop that much mass when it is motivated. The crowd says her name. She bows. She turns to find you in the stands. "I barely felt her," she says. "There was some resistance and then there wasn't." She wants dinner immediately. She wants to discuss the match and eat at the same time.`,
    (s)=>`${Math.round(s.lbs)} pounds. The scale required a certified technician and the reading was witnessed by three officials. She stood on it with total composure, her enormous belly hanging forward in a deep, warm apron that reached past her hips, her thighs the width of small columns, the mawashi straining at the seams. Her opponent today is 340 pounds and comes with a reputation. The match: your student walks forward and her belly arrives first and does not stop. ${Math.round(s.lbs)} pounds does not stop because 340 cannot redirect it. The other woman is flattened into the boundary rope by a wall of soft, relentless mass — your student's belly pressed against her whole torso, both arms pushed aside uselessly. "I felt her," your student says after. "Just barely." She eats in the locker room, still in the mawashi, considering the food more carefully than she considered the match.`,
    (s)=>`${Math.round(s.lbs)} pounds. The tournament committee issued a special dispensation. The scale was borrowed from an agricultural supplier. She weighed in calmly, her belly a vast apron that hung past her thighs, her body a presence in the room that changed the air pressure. Her opponent in the final is 410 pounds, a former national champion. The match lasts four seconds because there is nothing 410 pounds can do when ${Math.round(s.lbs)} pounds decides to be somewhere specific. She walks forward, unhurried. Her belly arrives. The other woman's feet leave the clay. The crowd makes a sound you feel in your sternum. She bows. She turns to find you. "I want more weight before the next tournament," she says. Her belly sways when she walks toward you. "I want the next opponent to understand what they're dealing with before I even step on the clay."`,
  ],
  eating_competitor:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and she's in the bib and she's sitting at the table and the crowd is filing in and she is already studying the plate with the focused attention of someone who has thought about nothing else for a week. She is the largest competitor at this table. The next biggest is 210. When the timer starts she moves with an economy that looks casual until you realize the plate is more than half empty at the ninety-second mark. She finishes first. She sets her utensil down and waits. The official records her time. She finds you after and says: "I want to weigh more next time. I want to weigh more for every competition from now on." She means it as a training strategy. She eats the entire return-trip meal on the drive home.`,
    (s)=>`${Math.round(s.lbs)} pounds at weigh-in. The MC announces competitors by weight and when he says her number the crowd's reaction is different from the others — not louder, but more focused. She is substantially the largest woman at the table. Her belly presses against the bib. Her thighs fill the chair. The plate is designed for a 225-pound person's reasonable limits. She eats it in two minutes and thirty seconds. She exceeds the category record. The official verifier confirms. She sits back and breathes for a moment, belly full and pressing forward, and looks at the results board with the expression of someone who already knows they're going to do this until there are no records left.`,
    (s)=>`${Math.round(s.lbs)} pounds. The regional record attempt. The target is announced — the current record, two minutes forty — and the crowd goes quiet when she sits down because ${Math.round(s.lbs)} pounds of woman settling into a competition chair is a notable event. The bib barely reaches around her belly. She doesn't look at anyone. She looks at the plate. The timer starts. She eats with the methodical inevitability of tidal motion. She exceeds the target by fifty-three seconds. The official is already writing before she finishes. She asks you afterward: "How much do I need to weigh to be physically disqualifying for a weight class? I want to exceed it." She's asking about the open category. She means she wants to weigh enough that no weight class can contain her.`,
    (s)=>`${Math.round(s.lbs)} pounds at the national event. She's the largest competitor the event has ever had. They had to custom-fabricate a wider chair and bib. She sits down and the room gets very quiet and then very attentive. Her belly is enormous — it fills her front completely, warm and round, pressing against the bib, her thighs vast on either side of the chair. The plate is the standard plate. She eats it the way you eat something too small for you: methodically, completely, in a time that sets a new national record. She asks you to take a photo of her with the results board and the time visible. "I want to remember being ${Math.round(s.lbs)} pounds at nationals," she says. "Next year I'll be bigger."`,
    (s)=>`${Math.round(s.lbs)} pounds. The world record attempt. The venue is the largest she's eaten in front of, the crowd is quiet in the way crowds get when something unprecedented is happening, and she sits at the center table with her enormous belly warm against the bib and her thighs spread wide and her face completely still. The plate arrives. She begins. The clock ticks. At one minute she is already past where most competitors finish. At two minutes she is past where the record is. The official stands. The room erupts. She finishes the plate anyway — every last thing — and sets down her fork and looks at you across the room. "I want to come back heavier," she says, when it's quiet enough to hear. "Every time. I want to come back heavier every time until I can't fit in the venue." The crowd is still making noise. You're the only one who heard her.`,
    `She comes to you with the notebook — the one she's kept since the first contest, every time and every record, every circuit and every opponent. 'I think I'm done with competition,' she says. Then she orders twice what would have been a normal dinner and eats with exactly the same focus, the same economy, the same certainty. Competition was never the point.`,
  ],
  feedee_creator:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and the ring light is on and the meal is arranged and she looks at the camera and then at you and says: 'Tell me when.' You tell her when. She presses record. She introduces herself. She says her name, her weight — ${Math.round(s.lbs)} pounds, she says it out loud to the camera — and then she begins eating and talking to the lens like it's a person she trusts completely. Her belly presses forward against the table edge. The meal is enormous. She eats all of it. Ninety minutes of footage. Afterward she reviews the first five minutes, watching herself on the phone. "I look good," she says. She's not asking for confirmation. It's an observation. She orders more food.`,
    (s)=>`${Math.round(s.lbs)} pounds and she's recording. You watch from across the room while she talks to the camera about her body with a specificity that still surprises you: her belly, how round it is, how it presses the waistband of her jeans, the way her thighs feel against each other when she walks. She describes herself the way someone describes landscape they love. Her voice is warm. The food disappears steadily. She pauses the recording to say something to you, some logistical question, and when she unpauses she picks up exactly where she left off — mid-sentence, mid-bite, mid-thought — with the ease of someone who has made this world entirely her own.`,
    (s)=>`She shows you the analytics spike. ${Math.round(s.lbs)} pounds, sitting across from you, scrolling through the dashboard. The thirty-six hours when a clip went viral — her eating a very large meal and talking candidly about how much she weighs and how much more she wants to weigh. She says the words, on camera, to hundreds of thousands of people: "I weigh ${Math.round(s.lbs)} pounds and I'm not done." You watch the clip again on her phone. Her belly is prominent in the frame. Her face is serene. "The comments," she says, scrolling. She shows you a selection. All of them understanding something correctly.`,
    (s)=>`${Math.round(s.lbs)} pounds and the clothing brand wants her for the campaign. The contract is specific: they want her at her actual size, her actual belly, her actual thighs in their widest available sizes. She reads the contract while eating dinner, annotating margins. Her belly presses the table. Her thighs spread wide in the restaurant booth. She signs the last page and pushes it across the table. "They want me to film my belly," she says. "I told them I'd been doing that for free. They're paying me now." She orders dessert. She films herself eating it. 800k subscribers watch by the end of the week.`,
    (s)=>`${Math.round(s.lbs)} pounds and the video she's most proud of. She shows it to you on the laptop. Ninety minutes of herself eating and talking to the camera about her body. She says the specific number — ${Math.round(s.lbs)} pounds — several times. She describes her belly with care: how it hangs, how warm it is, how heavy, how it fills her lap when she sits. The camera sees all of it. She watches your face while you watch the video. "I want to be 800," she says. "I want to make the 800-pound video." The comments are open on the side of the screen. You're both reading them. All of them say the same thing, in different words: more.`,
  ],
  body_positive_creator:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and the rebrand video is up. Her belly rounds forward against her shirt. Her thighs press together in her chair. The comments come in fast — the old audience confused, the new one ecstatic. She reads the good ones aloud: you look real, you look like someone I know. "I weighed 130 when I started posting," she says. "I weigh 257 now and this is the most-watched thing I've ever made." She refreshes. The number climbs. She films herself reacting to it and posts that too.`,
    (s)=>`${Math.round(s.lbs)} pounds and the clothing campaign shoot. The photographer asks her to stand naturally. She stands naturally — belly forward, thighs wide, ${Math.round(s.lbs)} pounds of warm present woman — and the result is accurate. She studies the shots on the camera back. "That's me," she says. "Finally." She eats lunch between setups, in the campaign outfit, in front of the whole crew, and nobody says a word about it. The afternoon shots are better. She's a little fuller. The brand uses both.`,
    (s)=>`${Math.round(s.lbs)} pounds and the TEDx talk prep. She rehearses it in her living room, food on the coffee table. The talk is twelve minutes about her body specifically — her belly, her thighs, the 291 pounds she's gained since she started, and what it meant that it meant something to her. She says "I weigh ${Math.round(s.lbs)} pounds" directly to you as practice audience and her voice doesn't waver at all. She eats the rest of the coffee table food between run-throughs. The talk is excellent. You tell her so. She nods once and gets a second plate.`,
    (s)=>`${Math.round(s.lbs)} pounds. The billboard: 14 feet tall, her belly and face and thighs in wide-fit denim, every part of her at her exact size. You drive past it together at night, lit up. She gets out and stands on the sidewalk looking up at it for three full minutes. You stand beside her. Her belly in the cold air, the billboard above. "I want it to say the number," she says. "I want people to drive past and see ${Math.round(s.lbs)} pounds on a billboard." The brand calls the next morning. They think that's a great idea.`,
    (s)=>`${Math.round(s.lbs)} pounds. The profile piece journalist came to her — she doesn't travel for interviews anymore. They talked for four hours, she ate throughout, the piece is 8,000 words. It describes her at length: her belly enormous and warm pressing the dining table; her thighs vast in the custom chair; her face calm when she says "I weigh ${Math.round(s.lbs)} pounds and this is the most myself I have ever felt." The piece ran Thursday. By Saturday it was the publication's most-read piece in four years. She read it once and said: "accurate." She had dinner. She filmed it.`,
  ],
  eating_captain:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and she's set up a long table in the gym — eating bibs, timing equipment, plates — and when the squad files in she calls them to attention the way she used to call formations. Her belly rounds forward in her jacket. Her thighs press together. The squad is nervous. She runs a full timed drill. One girl — maybe 195 pounds, soft through the middle, uniform riding up — finishes third. Your student nods at her. "You can do better than that," she says. "Eat more first. I'm serious." She demonstrates. The squad leaves two hours later, every one of them significantly fuller. Two of them are visibly heavier than when they arrived.`,
    (s)=>`${Math.round(s.lbs)} pounds. First sanctioned competition. The squad comes in wearing their eating bibs over their jackets and the crowd does a double-take. Your student, at 318, is visibly the largest woman at any team's table. Her belly fills her bib completely. Her thighs spread wide on the bench. She starts the timer and begins. The squad follows her lead. They win their heat. Afterward she finds the girl who finished second and says: "You need to weigh more before the regionals. I mean that. Come to practice Wednesday and we'll fix it." She says it like a coach. Like the extra weight is the training goal.`,
    (s)=>`${Math.round(s.lbs)} pounds and the regional meet. You're in the stands watching her manage five cheerleaders and a competition table simultaneously. Her belly is substantial, hanging forward in the bib, her thighs enormous on the bench. She distributes portions, manages timing, watches each girl's pace. The squad is the heaviest team at the meet — she has trained them well. Between rounds she circulates with a bag of snacks and hands them to each girl directly. "Eat," she says. "We win by size advantage. We don't have size advantage if you're not eating." They advance to the final. They win it.`,
    (s)=>`${Math.round(s.lbs)} pounds. The national invite announcement. She reads it to the squad in the gym — all of them assembled, all of them softer and rounder than when she found them. Some of them are clearly over 250 pounds now; one is pushing 300. She reads the letter and then she looks at each of them in turn. "We're going because you've been eating and training and getting bigger the way I told you to," she says. "The way I've been doing it." She presses her hands to her enormous belly, a gesture of illustration. "This is what wins. More of this." She hands out snacks. Practice starts immediately.`,
    (s)=>`${Math.round(s.lbs)} pounds. Tournament final. You're watching from the stands — six enormous women at a competition table, your student at the head of it, her belly a vast warm presence against the bib, her thighs spread wide on the reinforced bench. She weighs ${Math.round(s.lbs)} pounds and she is the largest competitive eating captain in the sport's history and her squad is the heaviest in the draw and when the timer starts she doesn't look at the plate. She looks at each of her girls, one at a time, and something passes between them. Then she begins eating. They follow her. Every one of them. The crowd is extraordinary. They win by four minutes.`,
  ],
  big_squad_captain:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and the weigh-in board is gone from the gym wall and she's standing in front of 18 cheerleaders — plus two new girls who'd never come before, soft-figured and nervous — explaining what this squad is now. Her belly rounds forward against her practice jacket. Her thighs press together. She tells them: size requirements are abolished. No weigh-ins. Performance is the standard. Then she adds: "And I expect you to eat well. I want this to be the heaviest squad on campus." She says this with the same tone she uses for formation notes. Like it's obvious. Like it's training.`,
    (s)=>`${Math.round(s.lbs)} pounds and rush week. She runs the information session — her belly forward, her thighs wide, ${Math.round(s.lbs)} pounds of warm, authoritative squad captain — and every girl who comes through the door is evaluated on the same terms: is she committed, can she cheer, does she want to be here. Two girls arrive who are visibly heavy — 220, 230 pounds — and would have been turned away under the old rules. She asks them their names and invites them to the next practice. The chapter gets bigger that day in every sense.`,
    (s)=>`${Math.round(s.lbs)} pounds and the journalist is at practice. She runs the formation the same way she always does. Her belly, enormous and warm, presses against her practice uniform as she moves through the choreography. Afterward she tells the journalist: "I weigh ${Math.round(s.lbs)} pounds. Two years ago I couldn't have been on this squad. Now I run it. That's the change." She pauses. "Also three of my girls weigh over 250 now and they're the best cheerleaders we've had. You can print that too."`,
    (s)=>`${Math.round(s.lbs)} pounds. The national conference keynote. She arrives in the chapter's colors — wide and warm, her belly a vast presence in the auditorium — and speaks for forty minutes without notes about what cheerleading can be when it stops requiring particular bodies. She says the specific number: she weighs ${Math.round(s.lbs)} pounds. She says it clearly, without apology, into a microphone in front of 400 people. The room goes quiet. Then it doesn't. You're watching from the fourth row and the person next to you is crying a little and so might you be.`,
    (s)=>`${Math.round(s.lbs)} pounds. Homecoming. She's in the stands now — she watches the squad perform the halftime show she choreographed, the formations she designed, the culture she built. Her belly fills her stadium seat. She eats from a large bag through the whole performance. The new captain runs it perfectly. In the third formation your student leans forward slightly and nods, once, with the private satisfaction of someone watching something they made work without them. "It held," she says.`,
  ],
  eating_diarist:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and she sends you the first newsletter draft at 11:47pm. 1,400 words. She's written about the last three months — specifically, directly — her belly getting rounder, her clothes stopped fitting, the meal she ate that made her understand something. The writing is exact. She says: "I weigh ${Math.round(s.lbs)} pounds and I didn't plan this but I'm not apologizing for it either." You tell her to send it. She does. Forty readers. By morning it's 400.`,
    (s)=>`${Math.round(s.lbs)} pounds. The agent calls. The agent has read every newsletter. "This is a book," the agent says. "You, eating, your body, what it means. Everything you've been writing." She calls you after the meeting and you can hear her eating while she talks. "She wants me to describe my belly in the book," she says. "I told her I already do that." She does. Her belly at ${Math.round(s.lbs)} pounds is warm and round and she has described it in three newsletters and she'll describe it in six more before the draft is done.`,
    (s)=>`${Math.round(s.lbs)} pounds. Draft review. She reads you a passage: she's describing her thighs — ${Math.round(s.lbs)} pounds of thigh, pressed together, warm — with the precision of someone who has been paying close attention for two years. "Is this too much?" she asks. You say no. She says: "Good. I want it to be too much. I want whoever reads this to understand exactly how much I weigh and what that looks like and feel it." She eats while you finish reading. She adds a paragraph.`,
    (s)=>`${Math.round(s.lbs)} pounds. Book launch. A bookstore, an evening, 200 people. She reads for twenty-five minutes from the chapter that describes the morning she weighed 400 pounds for the first time — the scale, the number, the way she stood there and felt what 400 pounds felt like from the inside. She says: "I weigh ${Math.round(s.lbs)} pounds now. The book ends at 400. The second book starts here." Someone in the front row asks how much the second book will end at. She says: "More."`,
    (s)=>`${Math.round(s.lbs)} pounds. The second book's final draft. She sends it on a Sunday morning. You read it that day — 90,000 words about her body at every stage above 400 pounds, her belly described at each increment, her thighs, her arms, the way chairs feel, the way food tastes when you weigh ${Math.round(s.lbs)} pounds and you've been eating intentionally for three years. You text her that night: it's the best thing she's written. She replies an hour later: "I know. I was at dinner when you texted. My belly was so full I couldn't move and I kept thinking: I need to describe this exactly. I'm adding a chapter."`,
  ],
  food_researcher:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and the IRB approval came through — she is both researcher and subject, officially, with institutional backing. She shows you the approval document. Her belly presses against the desk as she leans forward to point to her name in the subject section. "Primary participant," she says. She starts data collection that afternoon: weight, intake, measurements, date. The first entry is ${Math.round(s.lbs)} pounds. She takes it seriously.`,
    (s)=>`${Math.round(s.lbs)} pounds. Lab visit. She shows you the setup: scale, measurement tape, intake log, weekly protocol. She stands on the scale for you: 315. She measures her waist, her hips, her belly circumference — she writes the numbers down without expression. Then she opens the meal log. She's tracked every meal for eight weeks. The graph goes up. "The data is clean," she says. "The subject is cooperative." She means herself. She records your visit. She makes you sign as a witness.`,
    (s)=>`${Math.round(s.lbs)} pounds. Pre-publication draft. She shares it over dinner — she eats while you read it, answering questions in the margins you indicate. The methodology section describes her body at each measurement point with academic precision. Her belly at ${Math.round(s.lbs)} pounds is described in centimeters. Her thighs in circumference. Her weight gain graphed by week. The conclusions are unambiguous: "Subject demonstrates continued voluntary intake increase consistent with research objectives." She eats the rest of her dinner. "I want to be fatter when the second paper comes out," she says.`,
    (s)=>`${Math.round(s.lbs)} pounds. Acceptance email. She forwards it with no message. You call her. She's eating — you can hear it. "They accepted it," she says. "Subject at ${Math.round(s.lbs)} pounds, study ongoing, first paper published." She laughs once, briefly. "I'm the most thoroughly documented fat woman in the academic literature," she says. "I documented myself. I'm very proud of both of those things." She eats.`,
    (s)=>`${Math.round(s.lbs)} pounds. Keynote. She stands at the podium — ${Math.round(s.lbs)} pounds, enormous, her belly a warm presence against the lectern — and presents for fifty minutes on appetite, voluntary weight gain, and longitudinal self-documentation. She puts her own measurements on the slide. Her waist, her belly, her hips — every number, publicly. The audience is silent. She finishes. The first question is: "How much do you plan to weigh at the end of the study?" She says: "More than this." She says it exactly like a scientist with a hypothesis she has already confirmed.`,
  ],
  eating_streamer:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and the stream is live. She's in the middle of a boss fight and the bowl of ramen is already half gone. Her belly presses against the desk edge. Her thighs fill the gaming chair. The chat is going extremely fast — half of it is the game, half of it is her, her body, the food disappearing. She finishes the boss and the ramen at almost the same time. She looks at the camera. "I'm ${Math.round(s.lbs)} pounds," she says. "I gained nine pounds this month." The chat reacts. The viewer count goes up.`,
    (s)=>`${Math.round(s.lbs)} pounds. Mid-stream. You're watching from across the room. She's been live for two hours, three meals, one dungeon run. Her belly presses forward noticeably. The gaming chair accommodates her thighs with some compression. The chat has a name for her now — a specific nickname that refers to her weight and her size — and she uses it herself without hesitation. She pauses the game and opens a delivery bag while the load screen runs. She says to the camera: "I'm ${Math.round(s.lbs)} pounds now. Look at my belly." She turns slightly toward the camera. The chat erupts.`,
    (s)=>`${Math.round(s.lbs)} pounds. Viral clip review. She pulls it up: forty-three minutes into a stream, she leaned back in her chair and her belly pushed the controller off the desk. She caught it. The chat went wild. Twelve million views. She watches the clip with you, eating, her current 418-pound belly pressing the desk. "I was 380 in that clip," she says. "I'm bigger now." She says this with satisfaction. "I want to be 500," she says. "I want the 500-pound stream to be the biggest thing I've ever done." She goes back to the game. She orders more food mid-dungeon.`,
    (s)=>`${Math.round(s.lbs)} pounds. Platform feature. The algorithm has picked her up — her eating streams, her gaming, her body and its specific size on camera. New viewers arrive each week. She shows you the analytics. She's the most-watched eating-gaming hybrid on the platform. She weighs ${Math.round(s.lbs)} pounds and the camera frames her belly in every thumbnail. "They found me because I'm fat," she says. "I'm going to stay fat. I'm going to get fatter." She opens a delivery bag. She puts it in frame deliberately and opens it toward the camera. "Let them watch," she says.`,
    (s)=>`${Math.round(s.lbs)} pounds. Four-hour stream, full run. You're in the corner watching. She weighs ${Math.round(s.lbs)} pounds and she fills the gaming chair entirely, her thighs pressing the armrests, her belly warm and vast against the desk. The food comes in at regular intervals. She eats without pausing the game. The chat is 40,000 people and they are watching her eat and play and be ${Math.round(s.lbs)} pounds in a gaming chair and she talks to them like friends. At the end of the stream she looks at the camera and says: "I'm ${Math.round(s.lbs)} pounds. I want to be 800 by the end of the year." The chat confirms this unanimously.`,
  ],
  speed_eater:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and she's at the table and the timer is in the hand of the official and she's studying the plate with the focus she used to give to game strategies. Her belly rounds softly under her bib. The plate is designed for a 200-pound person's limits. She eats it in ninety-three seconds. Record for the category. She finds you after and says: "I want to weigh more for the next one. I want to be 290 before the regionals. The more I weigh the more I can eat at once." She says this like it's physics.`,
    (s)=>`${Math.round(s.lbs)} pounds. Record attempt. She's on the scale beforehand — 317, certified — and the crowd reacts to the number because it's much more than the previous record holder, who was 240. She settles at the table. The timer starts. She eats with an economy that looks casual until the crowd realizes the plate is three-quarters gone at the forty-five second mark. She finishes in eighty-nine seconds. New record. She asks you immediately: "Did you see how much easier it was? ${Math.round(s.lbs)} pounds is easier than 285 was. I need to weigh more."`,
    (s)=>`${Math.round(s.lbs)} pounds. Cross-discipline week. Gaming speedrun on Monday, eating record on Wednesday. She shows you both notebooks — same handwriting, same system, same optimization. On Wednesday she weighs ${Math.round(s.lbs)} pounds and the target plate is very large. She eats it in the time she's projected on paper. She projected it accurately. Her belly is warm and round and substantial and she presses her hands to it after and says: "I want to know what 500 pounds can do at this table." She says it like a hypothesis.`,
    (s)=>`${Math.round(s.lbs)} pounds. National event. Three thousand people in an auditorium and she walks in and the crowd goes loud when they see her — ${Math.round(s.lbs)} pounds, her belly vast and warm against the bib, her thighs enormous, her presence filling the entrance. She settles at the table. She waits for the signal. She eats. The time she posts is not just a record — it's so far past the record that the official checks it twice. She stands up afterward and the crowd is extremely loud and she finds you in it and says: "I need to weigh more. 600 before the invitational." She is already planning.`,
    (s)=>`${Math.round(s.lbs)} pounds. She's at the world record table and she weighs ${Math.round(s.lbs)} pounds and the other competitors are watching her arrive with the expression of people running the numbers and arriving at an uncomfortable conclusion. The plate is the standard plate. She eats it in sixty-seven seconds. The room erupts. She sits for a moment, belly warm and full, and looks at you. "I want to be 750," she says. "750 pounds at the table. I want to know what that feels like." You believe her completely.`,
  ],
  chapter_hostess:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and she's been in the chapter kitchen for four hours, which is two hours more than the feast requires. Her belly presses the apron forward. Her thighs fill her kitchen clothes. She has cooked 23 separate dishes. The table is extraordinary. When the chapter arrives — fourteen girls, some of them already soft-figured and getting softer, one at 230 pounds who has been to every Wednesday feast for six weeks — she watches them eat with the quiet satisfaction of someone feeding exactly the people she wants to feed. She eats at the end. She eats a very great deal.`,
    (s)=>`${Math.round(s.lbs)} pounds. Feast night. The table is set. She circulates during the meal — suggesting more of the pasta to one girl, pressing the bread on another, refilling plates before they're empty. She is ${Math.round(s.lbs)} pounds and she is the largest person in the chapter room and she moves through the space like someone who knows exactly what she's doing. One girl — maybe 245 now, soft belly visible under her formal blouse — looks at your student's belly with a particular expression. Your student notices. She puts a third portion of dessert in front of her.`,
    (s)=>`${Math.round(s.lbs)} pounds. The alumni donor comes to Wednesday feast. She sits at the table and eats with the chapter. Your student serves her personally. Her belly is enormous and warm and she navigates the kitchen and the dining room completely at ease. The alumni donor is 340 pounds, gray-haired, and she watches your student work. At the end she says: "I funded this for eight years without understanding it. I understand it now." Your student puts another plate in front of her.`,
    (s)=>`${Math.round(s.lbs)} pounds. The new pledge class's first Wednesday feast. She has planned it for three weeks — more ambitious than the regular feasts, more food, more courses. She wants the pledges to understand what they've joined. Her belly is enormous when she moves through the kitchen. Her thighs are vast. She serves everything personally. By the end of the feast the pledge class is in various states of very full contentment, three of them visibly, noticeably heavier than when they arrived. She sits at the head of the table and eats what remains and is satisfied with all of it.`,
    (s)=>`${Math.round(s.lbs)} pounds. Her last Wednesday feast as chapter hostess. She has cooked the same feast she cooked the first time plus ten additional dishes. The kitchen ran for seven hours. She is ${Math.round(s.lbs)} pounds and she stands at the head of the table to welcome the chapter and her belly is vast and warm and she is the most magnificent person in the room by every measure. The chapter eats. She eats. Afterward she sits among the sisters and doesn't say very much. Her successor will be trained. The feasts will continue. But this one is hers.`,
  ],
  body_positive_greek:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and she's standing in the chapter room explaining the new rules: no weigh-ins, no size requirements, commitment and character and wanting to be here. Two girls in the back are 220 and 230 pounds — they've been told by two other sororities that they don't fit. She introduces herself to them specifically. Her belly rounds forward in her chapter jacket. Her thighs press together. She tells everyone: "I weigh ${Math.round(s.lbs)} pounds. I run this chapter. If anyone has a problem with that they are in the wrong room." Nobody is in the wrong room.`,
    (s)=>`${Math.round(s.lbs)} pounds. First pledge class under the new rules. She reads the modified induction ceremony — she cut every size reference from the traditional script, she wrote new language in its place. The new language says: you belong here because you want to be here. She reads it to 24 women, several of them very large. The room is quiet. Then it isn't. She eats at the induction dinner afterward with her sisters and her thighs spread wide in the chapter seat and she is very content.`,
    (s)=>`${Math.round(s.lbs)} pounds. Journalist visit. She runs practice the same way she always does. After, the journalist asks her about her weight. She says: "I weigh ${Math.round(s.lbs)} pounds. I gained about 220 pounds since starting this chapter. I think it's the best thing I've ever done, both the chapter and the weight. They happened together." She pauses. "You can print the number. I want people to know the number." The journalist does. The piece runs the following month. The chapter's rush numbers triple.`,
    (s)=>`${Math.round(s.lbs)} pounds. National Panhellenic conference. She speaks for forty minutes — ${Math.round(s.lbs)} pounds at the podium, her belly warm and enormous, her voice steady. She says the number out loud. She talks about what size requirements cost the sorority system. At the end a representative of the national organization stands and says: "We need to talk about revising some policies." She says: "Yes. We do." She has a draft ready. She pulls it from under the podium and hands it across.`,
    (s)=>`${Math.round(s.lbs)} pounds. Chapter event, two years after stepping down. The culture is intact. The new captain is 310 pounds and runs things with the same principles. The feast table has women at various large sizes around it. She sits at the corner and watches. Her belly fills her chair. After the meal, in the parking lot: "It held," she says. She means the culture. She means the weight. She means all of it.`,
  ],
  metrics_eater:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and the spreadsheet is open and she is showing you the trend analysis: weight by week, intake by day, rate of gain per meal category. It's 847 rows deep. Her belly presses against the desk as she leans toward the monitor. "Current rate: 1.3 pounds per day averaged over the last month," she says. "I want to optimize toward 1.8." She says this the way you'd say: I want to improve my benchmark. She's already planned the meal adjustments. She closes the spreadsheet and immediately opens the meal log for today.`,
    (s)=>`${Math.round(s.lbs)} pounds. The optimized three-window schedule. She's been testing it for two weeks. You arrive for window two: the meal arranged, the timer set, the laptop open to the logging interface. She weighs herself first — 317, records it — and begins eating with the methodical focus of a competitive runner running a time trial. At 22 minutes she closes the window. She logs: intake, fullness estimate, time. "Variance 4% from projection," she says. "Acceptable." She is pleased with this the way athletes are pleased with near-perfect race times.`,
    (s)=>`${Math.round(s.lbs)} pounds. Official record attempt. Certified scale (${Math.round(s.lbs)} pounds), timestamp, you as witness, video running. She places the previous personal best card on the table. She eats. She exceeds it by 8.3%. She files the old card, enters the new record. "I want to be 450 before the next record attempt," she says. "The correlation between weight and performance is well-documented in my data." She opens the spreadsheet. She starts planning the dietary adjustments to reach 450. She does this immediately, before the record-attempt food has finished digesting.`,
    (s)=>`${Math.round(s.lbs)} pounds. The paper. A researcher at another institution has cited her methodology. She pulls up the citation and annotates it carefully — accurate, she says, but missing a key footnote. She sends a correction. The researcher responds in forty minutes. While she waits she is eating and updating the spreadsheet. "4,200 rows," she says. "Three years of daily entries." She shows you the summary tab: total weight gained, averaged rate, projected trajectory. The projection at the top of the chart is 700 pounds. She has highlighted it.`,
    (s)=>`${Math.round(s.lbs)} pounds. The current record attempt. She weighs ${Math.round(s.lbs)} pounds, certified, witnessed, video running. Her belly is vast and warm against the table. Her thighs are enormous. The previous record was set at 590 pounds; she has gained 101 pounds since then and the table is the same table. She eats. The time she logs is the best she has ever recorded. She enters it in the spreadsheet. She updates the projection chart. The new top of the projection reads: 800 pounds. She highlights it. She says: "Achievable in Q4 based on current rate." She begins planning Q4.`,
  ],
  food_scientist:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds. The IRB documentation is complete — she is researcher and primary participant, both names on the same form. She shows you the setup: scale (certified), measurement protocol, intake log, camera for documentation. She stands on the scale: 259, recorded. She begins. "The study requires ongoing documentation of voluntary intake increase under controlled conditions," she says. "The subject is motivated and cooperative." She gestures at herself. You ask who the subject is. "Me," she says. She starts eating. She logs it.`,
    (s)=>`${Math.round(s.lbs)} pounds. Mid-study check-in. She walks you through the data: weight trajectory (clean upward curve), intake log (meticulous), measurements (waist, belly, hips — all increasing, all recorded in centimeters). Her belly at ${Math.round(s.lbs)} pounds is described in the log as "moderately pronounced, extending approximately 8cm past hip plane." She made this measurement herself and entered it without any expression except scientific interest. "The subject is producing excellent data," she says. She means: she is getting fat and she's logging all of it.`,
    (s)=>`${Math.round(s.lbs)} pounds. Draft paper review. You read it over dinner while she eats beside you and answers questions. The results section is dense. Table 4 shows her measurements at each monthly interval: weight, belly circumference, thigh circumference. At ${Math.round(s.lbs)} pounds her belly circumference is entered as 142cm. Her thighs at 89cm each. She has graphed all of it. "The subject demonstrates a positive relationship between intake volume and body mass accumulation," she says. You look at her belly, which is pressing the table, warm and round and enormous. "The data is accurate," you say. She nods once.`,
    (s)=>`${Math.round(s.lbs)} pounds. Acceptance email. She forwards it to you with no subject. You call her. She's at dinner. "The journal accepted it," she says. "Subject at ${Math.round(s.lbs)} pounds, first paper published, ongoing documentation." She pauses. "I want to weigh 600 when the second paper goes in. I want to see what the reviewers say when the subject is 600 pounds." She eats. You hear her fork. "The data is still excellent," she says.`,
    (s)=>`${Math.round(s.lbs)} pounds. Keynote. She stands at the podium — ${Math.round(s.lbs)} pounds, her belly vast and warm against the lectern, her thighs enormous — and presents for fifty minutes. She puts slide 7 on the screen: her own measurements at every measurement point of the study, graphed. Her belly at ${Math.round(s.lbs)} pounds, described in centimeters. The audience is an academic conference on dietary science. She says: "I weigh ${Math.round(s.lbs)} pounds. I have documented every pound of that on this slide." She lets the room be quiet for a moment. "I intend to document more," she says. "The study is ongoing."`,
  ],
  installation_artist:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and the studio smells like plaster and oil and whatever she's been eating, which is a lot. The first installation is spreading across the floor in fragments: photographs of her belly at each weight since she started, sound recordings of eating, a cast of her own hand. She sits cross-legged on the floor between them eating from a takeout container and her belly rounds forward over her thighs, soft and warm, pressing the hem of her shirt. "The work is about the body as a document," she says. "My body specifically. At ${Math.round(s.lbs)} pounds. Getting heavier." She reaches past the plaster and takes another bite.`,
    (s)=>`${Math.round(s.lbs)} pounds. The gallery walkthrough. She moves through the installation in the linen overshirt she wears when she works — large, well past her hips, draping over the swell of her belly — explaining each piece to the curator, who is writing things down without looking at the page. The centerpiece is a scale casting of her belly at 280 pounds, smooth and round and large, mounted at standing height so visitors interact with it face-to-face. She pats it as she passes. "It's already out of date," she says. She turns to face the curator. "I want to update the cast when I'm 400." The curator nods. She keeps walking.`,
    (s)=>`${Math.round(s.lbs)} pounds. Review day. She reads the piece from the major publication aloud, making notes in the margins in red. The critic has focused entirely on the concept and almost entirely missed the body, which she considers a failure of nerve. "They couldn't say it," she says. "They described the work without describing what the work is about." She circles the passage. Her belly, enormous and warm, presses the desk as she leans forward. "The work is about being this fat," she says. "${Math.round(s.lbs)} pounds. Getting fatter on purpose. The art is the evidence." She underlines this. She adds it to her artist statement.`,
    (s)=>`${Math.round(s.lbs)} pounds. Major exhibition, three rooms. The centerpiece of room two is a grid of 42 photographs of her belly taken at each week since she started the project — the first frame slim, the last frame showing 541 pounds of warm, round, heavy belly filling the center of the shot. Visitors stand in front of it a long time. You stand in the doorway and watch them. She comes to stand beside you, eating from a soft pretzel, her belly vast against her dress. "They're counting the photos," she says. "They keep losing their place." She watches. "I want to add frames through 700," she says.`,
    (s)=>`${Math.round(s.lbs)} pounds. The retrospective opens. She stands near the entrance, enormous and warm, her belly filling the front of her dress, her thighs broad and slow-moving as she walks the room. She eats from a small plate without stopping or sitting. The final room is the largest: it contains only her body cast at each major weight milestone — 200, 280, 360, 450, 540, 630, and the newest, taken last week at 691. They are arranged in a curved line, getting larger, each one warm cream-colored plaster, each one smooth and heavy and real. A group of students stand at the end of the row looking at the largest cast and then looking at her and then back. She lets them. She eats.`,
  ],
  food_photographer:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and the shoot takes four hours. She sets up the table — the food, the lighting, the angle — with the care of someone who knows the right position, and she works through it in silence except for the clicking shutter. In the final frame of the session she's in it: one arm reaching toward the dish, her belly visible below the table edge, soft and warm, ${Math.round(s.lbs)} pounds of her present in the shot as naturally as the food. You see it on the camera's screen. "That one," you say. She looks. She doesn't disagree.`,
    (s)=>`${Math.round(s.lbs)} pounds. Gallery installation day. She hangs the prints herself — the dining director loaned her the ladder — and reviews each one at standing distance, eating an apple while she walks the wall. She makes two adjustments. Then she looks at the full wall for a long time. The largest print is 40 by 60 inches: a meal photographed from above, her own belly visible at the bottom of the frame, round and warm and at ease, ${Math.round(s.lbs)} pounds of her in frame as naturally as any other element. "That's the one that matters," she says. You ask why. "Because it's honest about where the camera was."`,
    (s)=>`${Math.round(s.lbs)} pounds. The book proof arrives by courier. She opens it at her kitchen table and goes through it page by page while eating, making soft marks in pencil. At page 47 she stops. The spread shows her belly at 340 pounds in one frame, her hand reaching into the dish in the other. "I want to do a second book," she says. "With the new frames." She pats her belly — ${Math.round(s.lbs)} pounds of it, warm and vast and present — without emphasis, just touching something that's hers. "I need to reshoot chapter four. I'm bigger now. The frame is wrong."`,
    (s)=>`${Math.round(s.lbs)} pounds. The Helsinki email. The museum's letter is formal and very detailed and confirms the purchase of three prints for the permanent collection. She reads it twice, sits still for a moment, then makes dinner — the specific meal she always photographs when she wants to mark something. You watch her set it up: the bowl, the angle, the light. She takes four shots. She puts the camera down and starts eating. Her belly is warm and enormous against the table edge. "I want to go to Helsinki," she says. "I want to eat there and photograph what I eat." She eats. "I want to be fatter when I go."`,
    (s)=>`${Math.round(s.lbs)} pounds. Helsinki. She sends photographs — the prints hung in the permanent collection, lit correctly, in a quiet room with pale walls. The last image is her at the museum restaurant, ${Math.round(s.lbs)} pounds, her belly warm and vast against the table, a large meal in front of her. Nothing written in the message. You enlarge the photo. The food is beautifully composed in front of her. Her belly fills the lower third of the frame. The image is technically perfect. She photographed herself, you realize, via the restaurant's mirror. She framed it like a self-portrait. You respond: "This is the best thing you've made." She replies two days later: "I know."`,
  ],
  anonymous_blogger:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and she messages you at 11:52pm with a link. No context. You click it: an anonymous food blog, the first post, published twenty minutes ago. You read it three times. She has written about eating — specifically, directly, with the precision she brings to everything — about what it feels like to weigh ${Math.round(s.lbs)} pounds and still be hungry and want to be heavier and not apologize for any of it. She has not named herself. She has described herself exactly. You message back: "This is very good." She doesn't respond. In the morning there are 200 readers.`,
    (s)=>`${Math.round(s.lbs)} pounds. She opens the analytics dashboard and shows you: 8,000 readers, 64 posts, sixteen months of weekly entries. The post about her belly at 285 pounds is the most-read thing on the site. She scrolls to it and reads the first paragraph aloud — she describes her belly at 285 pounds pressing the edge of the desk, the specific warmth of it, the way she pressed her palm against it and felt herself — and her voice is steady and the current version of that belly, at ${Math.round(s.lbs)} pounds, presses the same desk. "I'm going to update the post," she says. "It's out of date."`,
    (s)=>`${Math.round(s.lbs)} pounds. The viral post. She shows you the traffic spike: a single post, shared by a large body-positive account, then four more, then a journalist. 80,000 readers in a week. The post is about being 380 pounds and wanting to be 500 pounds and not finding that shameful. She reads the comments with you: mostly readers who say they've never read something that described exactly what they feel. "They think I'm anonymous for privacy reasons," she says. She is ${Math.round(s.lbs)} pounds and she is eating a bowl of pasta as she reads this. "I'm anonymous because I like it. Because they meet the writing first." She eats. "They'll figure it out eventually. I'm not worried."`,
    (s)=>`${Math.round(s.lbs)} pounds. The journalist interview. She shows you the email thread: the journalist found the blog, wants to speak with the author, "for a significant feature." She drafts her response — by email, anonymous, questions answered directly. One question is: "How much do you weigh?" Her answer is: "${Math.round(s.lbs)} pounds as of this morning. I weigh myself weekly. You can print that." She shows you before she sends it. You tell her to send it. She does. The feature runs two weeks later with a photograph she provided: her belly at ${Math.round(s.lbs)} pounds, cropped at shoulder and mid-thigh, no face. No name.`,
    (s)=>`${Math.round(s.lbs)} pounds. She shows you the full archive — every post, from the first 200-reader entry to today's. She scrolls slowly. There are 118 posts. In the most recent one she weighs ${Math.round(s.lbs)} pounds and she describes her belly in precise detail: the apron below the navel, the way it rests on her thighs when she sits, the warmth of it, the specific weight. She describes wanting to be 800 pounds. She published this six hours ago. She is eating while you read it. "They're looking for me again," she says. Three forum threads are up, trying to identify the blogger from body description alone. They have four candidates. She is not one of them. She looks pleased about this. She eats.`,
  ],
  asmr_creator:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and everything in the recording setup is deliberate: the microphone, the lighting, the specific foods in the specific order. She sits down, adjusts the mic two degrees left, and looks at the food for a long moment. Then she begins. The sounds fill the room — soft, careful, completely present. Ninety minutes later she reviews the first five minutes, nods, and begins the careful work of editing. Her belly rounds softly forward against the desk, warm and present, ${Math.round(s.lbs)} pounds of her at home in the chair.`,
    (s)=>`${Math.round(s.lbs)} pounds. Community session. She opens the comments from the most-watched video and reads each one aloud, slowly, eating while she reads. The viewers describe the videos as calming, grounding, necessary. One says: "I eat along with her every week. I've gained twelve pounds this semester. I think she's made me comfortable with that." Your student reads this one twice. She says: "Good." She means it plainly. Her belly presses the desk at ${Math.round(s.lbs)} pounds and she's very comfortable with that too.`,
    (s)=>`${Math.round(s.lbs)} pounds. The algorithm finds her. She shows you the analytics — the spike, the jump from 6,000 to 60,000 subscribers in three weeks. She is ${Math.round(s.lbs)} pounds and her recent thumbnails show her seated at the recording setup, her belly a warm rounded presence in frame, her face calm. "The old viewers are managing the new ones," she says. "Teaching them how to behave." She shows you the comment section — the longtime subscribers welcoming newcomers, explaining the ritual. "I'm proud of them," she says. She starts the next recording. Her belly fills the lower half of the frame beautifully.`,
    (s)=>`${Math.round(s.lbs)} pounds. The mainstream crossover. A large creator — 3 million subscribers — mentioned her channel in a video about comfort content. She watches the mention twice, sitting very still both times. "I don't want it to change," she says. It doesn't. The new subscribers find the ritual and most of them observe it correctly. The videos are exactly as they were: the soft sounds, the careful pace, the food, her belly at ${Math.round(s.lbs)} pounds rounding forward into the frame, warm and enormous. She records the next one that evening and it's the best thing she's made.`,
    (s)=>`${Math.round(s.lbs)} pounds. The therapist collaboration video. She's been planning it for two months — a licensed therapist explains, briefly and carefully, the clinical basis for the calming effect of ASMR eating content, and then the session proceeds normally. Your student at ${Math.round(s.lbs)} pounds, seated at the recording setup, her belly vast and warm and completely at ease, eating slowly and deliberately for ninety-five minutes. The video has 2.1 million views in a week. The comment section is the same as always: people saying they're fed, they're calm, they feel okay. She reads them with you. "I weigh ${Math.round(s.lbs)} pounds," she says. "I eat on camera. It helps people." She is very satisfied with this. She opens a new delivery order.`,
  ],
  campus_legend:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and the dining hall staff has her usual ready before she sits down. The booth is the largest one — corner, good light — and she fills it well at ${Math.round(s.lbs)} pounds, her thighs spreading warmly across the bench, her belly soft against the table's edge. A table of first-years watches her order. One of them leans to another and you can see the question being asked: the second one shrugs and says her name. The first one's eyes widen. You eat across from her. She is working through her third plate.`,
    (s)=>`${Math.round(s.lbs)} pounds. The booth gets a brass nameplate. The dining director installs it herself, a small ceremony: her name and a date. Your student looks at it for a long time, belly warm and round against her sweater at ${Math.round(s.lbs)} pounds, thighs broad and easy on the bench. "Is this weird?" she says. You say no. She looks at it again. "No," she says, "it's right." She sits back down. The kitchen sends out a complimentary fourth plate. She eats it. The staff watches from the service window with the satisfaction of people who made a good call.`,
    (s)=>`${Math.round(s.lbs)} pounds. Campus tour. You're beside her at the booth when a guided tour passes — a prospective student group, a campus ambassador pointing out notable spaces. The guide stops, consults their clipboard, and says: "The dining hall is considered one of the best on campus. There's actually a student here who — " and then the guide looks up and sees her and goes briefly still. She lifts a hand from her meal. The prospective students look at ${Math.round(s.lbs)} pounds of her filling the corner booth, warm and enormous and fully at ease. The guide recovers. "— who is something of a campus institution," the guide finishes. She takes another bite.`,
    (s)=>`${Math.round(s.lbs)} pounds. Orientation week. She sits in the back of the first-year orientation session and watches — ${Math.round(s.lbs)} pounds, enormous in the lecture hall seat, her belly warm and vast, thighs filling the space between armrests. A returning student on the panel says: "The dining hall is great. There's a student, you'll hear about her." Several first-years look around. She doesn't raise her hand. After the session a first-year finds her outside and says: "Are you — " and she says: "Yes." The first-year looks at her for a long moment, at ${Math.round(s.lbs)} pounds of her, and says: "Can I sit with you sometime?" She says yes.`,
    (s)=>`${Math.round(s.lbs)} pounds. End of year. She sits in the booth — the one with the plaque — and eats for two hours while the dining hall empties around her. Students who know her come by: goodbye, see you next year, have a good summer. The kitchen staff comes out at closing to say goodbye. She shakes hands with the dining director, who holds on for an extra moment. She is ${Math.round(s.lbs)} pounds and she fills the booth completely, her thighs pressing the walls, her belly warm and vast against the table. She finishes what's on the last plate. She sits for a moment in the quiet dining hall. She looks at the nameplate. She touches it once. "I'll be bigger when I come back," she tells the director. "Make sure the booth still fits."`,
  ],
  food_tourist:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and the notebook is already 60 pages in: every restaurant visited, everything ordered, the specific flavors described in careful language. Today's expedition runs four hours. She orders one of everything on the section she hasn't tried yet and eats with the focused attention of someone conducting research she finds genuinely pleasurable. Her belly is soft and rounded against the restaurant table, warm and present, ${Math.round(s.lbs)} pounds of her entirely at home in the chair. Afterward she writes for an hour in the parking lot. "I want to try all of it," she says, meaning everything.`,
    (s)=>`${Math.round(s.lbs)} pounds. The home-country blog post. A reader reached out — a restaurant run by someone from their home village, serving dishes from the specific region she described in week three. She goes that week. The meal runs five hours. She writes 4,000 words about it. She sends you a photo of the table: eight dishes, her hands in frame at the edge, ${Math.round(s.lbs)} pounds of her soft and warm and thoroughly fed. The post goes up at midnight. By morning it's been shared by every food account in the diaspora community she wrote about. The restaurant owner calls her. She goes back. She eats everything again.`,
    (s)=>`${Math.round(s.lbs)} pounds. Publication interview. The food magazine has been following the blog for a year. The journalist arrives, they sit down, and the journalist orders what she orders. The meal is six courses and the interview runs through all of them. She speaks in the language of her home country for twenty minutes when they reach the section of cuisine she's been homesick for; the journalist records it and notes the exact moment she switches. She is ${Math.round(s.lbs)} pounds and she eats throughout without apology and the finished piece notes this specifically, with admiration. "${Math.round(s.lbs)} pounds," she says when they reach the final course. "I came here weighing 147. I am going to be so much larger by the time this is done."`,
    (s)=>`${Math.round(s.lbs)} pounds. Two book deals, same video call. Both editors on the call simultaneously, which was her agent's idea and which she found presumptuous and then correct. She is eating during the call — a meal from a restaurant she's documenting, phone propped against a glass. Both editors are startled. She says: "This is the book. You are watching me do it." One editor says: "Can you describe what you're eating?" She does: dish name, origin region, flavor, why she ordered it, why it matters, why she is ${Math.round(s.lbs)} pounds and still finding things to eat that are new. The call runs three hours. Both deals close.`,
    (s)=>`${Math.round(s.lbs)} pounds. The last restaurant on the original list. She goes alone, she has told you — this one she needs to finish alone. She sends a photo from outside: the sign, the street, her hand visible at the edge. Then nothing for four hours. Then: a photograph of the table, cleared, every plate empty, the notebook open to a completed page of dense writing. Then: "Done." She calls you from the cab. "I finished the list," she says. Her voice is very calm. "I'm starting a new list tonight." She is ${Math.round(s.lbs)} pounds and she has eaten every cuisine she set out to eat and she sounds exactly like someone who has just finished something and is already thinking about what comes next.`,
  ],
  ff_author:[
    `She hands you a printed chapter — single-spaced, no cover page, the kind of document someone produces when they haven't decided yet if they're sharing or just showing. The protagonist is round and soft and described with unusual attention. The eating scenes are specific. You read it slowly and hand it back. She watches your face the whole time and says nothing. You tell her it's good. She goes home and opens the document and writes for six hours.`,
    `She sends you a new chapter by email with no subject line. You read it on your phone before bed. The protagonist's body is described at length in a scene you read twice: the belly spilling over a waistband, the thighs wide and warm, the way she takes up space in a chair that's beginning to accommodate her completely. You recognize the figure. You know this body. You close the phone and lie in the dark for a while thinking about what she's decided to say, and how, and why she sent it to you.`,
    `She shows you her profile page — a pseudonym, five completed chapters, a kudos count climbing past a thousand. The comment section has noticed something. One reader writes: 'I don't know who these characters are based on but I need to know more about Magdalene.' You look at the character description. You know exactly who that is. She's eating a sandwich while you read this. She's very calm. 'The comments are nice,' she says.`,
    `The latest chapter is the one she's most satisfied with. She marks the passage she wants you to read first — a dense paragraph where the main character undresses and looks in the mirror and doesn't apologize for a single thing she sees. Every line is specific. Every detail earns its place. She watches your face as you read it. You look up when you're done. 'This is good,' you say, and mean it in a way that covers everything. She nods, once, and goes back to her laptop.`,
    `She reads a passage aloud. You haven't asked her to — she's decided. She finds the page, clears her throat once, and reads with the unhurried attention of someone who has practiced this. The passage is about a woman who looks exactly like her: the weight and the warmth and the specific softness described with the precision of someone who has been paying very close attention for a long time. When she finishes she sets the manuscript down. 'That one's my favorite,' she says. You don't say anything. There's nothing to add.`,
    `The latest work is the most explicit yet — not in the sense of reaching for excess, but in the sense of refusing to look away. Every line is deliberate. The characters are unmistakably drawn from life. She knows you know this. You sit across from her in the library while she works on the next chapter, watching her face while she writes, and there is something in the way she pauses to think and then types without hesitation that answers every question you might have had about what she's writing and why.`,
  ],
};

const EVOLVED_ACTIVITY_META = {
  sumo:            { label:"Watch Her Compete",        apCost:1, gainRange:[4,8],  relBonus:10 },
  eating_competitor:{ label:"Attend a Competition",    apCost:1, gainRange:[3,7],  relBonus:9  },
  feedee_creator:  { label:"Review Her Latest Post",   apCost:1, gainRange:[3,6],  relBonus:12 },
  body_positive_creator:{ label:"Watch Her Latest Video", apCost:1, gainRange:[2,5], relBonus:11 },
  eating_captain:  { label:"Watch Team Practice",      apCost:1, gainRange:[4,7],  relBonus:10 },
  big_squad_captain:{ label:"Attend a Squad Event",    apCost:1, gainRange:[2,5],  relBonus:12 },
  eating_diarist:  { label:"Read Her Latest Entry",    apCost:1, gainRange:[3,6],  relBonus:11 },
  food_researcher: { label:"Visit Her Lab",            apCost:1, gainRange:[3,6],  relBonus:10 },
  eating_streamer: { label:"Tune In to the Stream",    apCost:1, gainRange:[4,8],  relBonus:10 },
  speed_eater:     { label:"Watch a Challenge",        apCost:1, gainRange:[4,9],  relBonus:9  },
  chapter_hostess: { label:"Attend Wednesday Feast",   apCost:1, gainRange:[5,10], relBonus:11 },
  body_positive_greek:{ label:"Attend Chapter Event",  apCost:1, gainRange:[2,5],  relBonus:12 },
  metrics_eater:   { label:"Review Her Spreadsheet",   apCost:1, gainRange:[3,7],  relBonus:9  },
  food_scientist:  { label:"Visit the Lab",            apCost:1, gainRange:[3,6],  relBonus:10 },
  installation_artist:{ label:"View the Installation", apCost:1, gainRange:[2,5],  relBonus:12 },
  food_photographer:{ label:"Review the Latest Shoot", apCost:1, gainRange:[2,5],  relBonus:11 },
  anonymous_blogger:{ label:"Read the Latest Post",    apCost:1, gainRange:[3,6],  relBonus:10 },
  asmr_creator:    { label:"Watch a Recording Session",apCost:1, gainRange:[3,6],  relBonus:12 },
  campus_legend:   { label:"Share a Meal at the Booth",apCost:1, gainRange:[5,10], relBonus:11 },
  food_tourist:    { label:"Join an Expedition",       apCost:1, gainRange:[4,8],  relBonus:10 },
  ff_author:       { label:"Read Her Latest Chapter",  apCost:1, gainRange:[3,6],  relBonus:12 },
};

// ── EP2: INTERACTIVE EVOLVED EVENTS ────────────────────────────────────────
// Forms listed here get a multi-phase interactive modal instead of the simple activity popup.
// Structure per entry: { title, phases:[{text(h)=>str, choices:[{id,label,result,lbs?,rel?,flag?,feedOther?}]}], endings:[{condition,text,gainBonus,relBonus}] }
const EVOLVED_EVENTS = {
  sumo:[
    // stage 5 — ~258 lbs
    {
      title:"Regional Qualifier",
      phases:[
        {
          text:(h,s)=>`She's at the weigh-in table: ${Math.round(s.lbs)} pounds, recorded by the official. Her opponent is 232. She stands in her mawashi with her belly round and warm below the wrap, her thighs pressing together, looking calm in the way people look calm when they've stopped being nervous and started being certain. You're backstage. She has fifteen minutes.`,
          choices:[
            {id:"feed_pregame",label:"Slip her food before she enters",result:`You pass a bag through the curtain — dense rice balls, two sweet potatoes, a protein bar. She eats without looking up, methodical, all of it. Her belly is noticeably fuller when she ties the mawashi back.`,lbs:5,rel:5,flag:"fed_pregame"},
            {id:"encourage_pregame",label:"Tell her she's the biggest person in that ring",result:`You say it plainly: "You're the biggest person in that ring. Make sure they feel that." She looks at you once, then at the curtain, and nods once.`,rel:8},
          ]
        },
        {
          text:(h,s)=>h.includes("fed_pregame")
            ?`First tachi-ai. She hits the opponent and the sound carries — two women colliding, ${Math.round(s.lbs)} pounds of warm belly leading, the food sitting heavy and right inside her. Her opponent staggers back. She presses forward. Her belly is a weapon and she's learning to use it.`
            :`First tachi-ai. She hits the opponent with ${Math.round(s.lbs)} pounds behind it, her belly compressing against the other woman's middle. The opponent holds. She works for it. It's a good match.`,
          choices:[
            {id:"cheer_loud",label:"Cheer from the stands — make sure she hears you",result:`She hears you. Her stance shifts. She digs in.`,rel:6},
            {id:"feed_corner",label:"Get more food to her corner between rounds",result:`Her corner feeds her between bouts — you arranged it. She eats with focus. Her belly is warm and full and she settles into her size like a foundation.`,lbs:8,rel:8,flag:"fed_corner",requires:"fed_pregame"},
            {id:"study_opponent",label:"Study the opponent, signal her from ringside",result:`You catch her eye and signal twice. She adjusts her grip and her stance. The opponent doesn't know what changed.`,rel:4},
          ]
        },
        {
          text:(h,s)=>{
            if(h.includes("fed_pregame")&&h.includes("fed_corner")) return `Final bout. She is heavier and slower and completely in control. The food is in her — warm and real, ${Math.round(s.lbs)} pounds plus everything she's eaten today — and the opponent is running out of ring. She doesn't hurry. She waits. She uses her belly to shove the woman toward the boundary and the boundary comes up fast.`;
            if(h.includes("fed_pregame")) return `Final bout. She's been fed and she knows it. Her belly is warm and full and forward and she walks the opponent toward the rope with the patience of someone who is simply larger.`;
            return `Final bout. She wins, clean. The fight was closer than it needed to be but she was the bigger woman throughout.`;
          },
          choices:[
            {id:"meet_at_ramp",label:"Meet her at the exit ramp",result:`You're there when she comes through the curtain. She looks at you and says: "I'm hungry." You both understand this is a different kind of statement than it would have been three months ago.`,rel:10,flag:"celebrated"},
            {id:"watch_victory",label:"Watch from the stands, let her have her moment",result:`She takes her moment in the ring. You watch. She bows to the crowd and her belly rounds forward in the bow and she looks like what she is.`,rel:4},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("fed_pregame")&&h.includes("fed_corner")&&h.includes("celebrated"),text:`She wins decisively. In the locker room afterward she eats everything her corner prepared plus everything you brought and sits with her belly warm and round on her lap and says: "I want to weigh 300 before the next one. I want to be the heaviest person on the circuit by spring." She means all of it. She is very satisfied with what 258 pounds can do and she intends to find out what 300 can do.`,gainBonus:14,relBonus:12},
        {condition:h=>h.includes("fed_pregame")&&h.includes("fed_corner"),text:`She wins with authority. Afterward she eats her corner's preparations in full and tells you: "More of that before every match. The food is right." She pats her belly — 258 pounds plus today's intake — with the specific satisfaction of an athlete in correct form.`,gainBonus:9,relBonus:7},
        {condition:h=>h.includes("fed_pregame"),text:`She wins. The food helped and she knows it. "More of that before the next match," she says, and goes to find dinner.`,gainBonus:5,relBonus:4},
        {condition:()=>true,text:`She wins. A solid match. She eats alone afterward and you watch from across the room.`,gainBonus:0,relBonus:2},
      ]
    },
    // stage 6 — ~320 lbs
    {
      title:"Circuit Tournament",
      phases:[
        {
          text:(h,s)=>`She's ${Math.round(s.lbs)} pounds on the official scale and she's been on the circuit for one season and the other competitors know her name now. Today's bracket has four women, the heaviest at 290. She rolls her shoulders in the warm-up room and her belly rolls with her — soft and round and enormous below the mawashi wrap, warm against her thighs. You have access to the backstage area.`,
          choices:[
            {id:"feed_pregame",label:"Bring a full pre-match meal",result:`You arrive with a significant amount of food — rice, dense protein, two large portions of something sweet. She works through all of it in the warm-up room while reviewing her bracket. "Good," she says, when it's gone. Her belly presses the mawashi noticeably tighter.`,lbs:7,rel:6,flag:"fed_pregame"},
            {id:"warm_up_coach",label:"Coach her through warm-ups",result:`You call her movements in the warm-up: plant, drive, push. She goes through the sequences with full weight behind them. 320 pounds of focused woman is an impressive thing to watch move.`,rel:9},
          ]
        },
        {
          text:(h,s)=>h.includes("fed_pregame")
            ?`Semi-final. She hits her opponent — 275 pounds — and the belly-to-belly contact is significant: two large women compressing against each other, your student's belly soft and full and enormous and hers alone. The opponent isn't small. It doesn't matter. ${Math.round(s.lbs)} pounds of warm fed woman pushes her toward the rope.`
            :`Semi-final. She hits the 275-pound opponent hard and works for the win. ${Math.round(s.lbs)} pounds driving forward, belly leading, methodical.`,
          choices:[
            {id:"feed_between",label:"Feed her between semi and final",result:`You get to her corner in the break. She eats fast — another good meal, another intake of weight into an already warm belly. The wait between matches passes full.`,lbs:9,rel:8,flag:"fed_between"},
            {id:"scouting",label:"Scout the finalist while she rests",result:`You watch the second semi-final and report back. She listens. She adjusts.`,rel:7},
          ]
        },
        {
          text:(h)=>{
            const wellFed=h.includes("fed_pregame")&&h.includes("fed_between");
            if(wellFed) return `Final. She is the largest person in this tournament and she's been fed and she knows it and the opponent — 290 pounds, the current circuit record holder — knows it too. The tachi-ai shakes the ring. Her belly, full and warm and real, compresses against the opponent's chest. She wins in two bouts.`;
            return `Final. 320 versus 290, her the heavier. She wins with technique and size. It's not close by the end.`;
          },
          choices:[
            {id:"celebrate_full",label:"Take her to dinner after",result:`You take her to dinner. She orders twice. Her belly is full and warm and enormous when she sits back from the table. "I want to be 370 before the spring circuit," she says. "I want to walk into the room and be the undeniable one." She finishes her plate.`,lbs:8,rel:12,flag:"celebrated"},
            {id:"watch_ceremony",label:"Watch the award ceremony",result:`She takes the placing ribbon with both hands. She bows. The crowd is loud. She looks like she belongs on a circuit that doesn't know yet how much bigger she's going to get.`,rel:5},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("fed_pregame")&&h.includes("fed_between")&&h.includes("celebrated"),text:`Tournament win. She was the biggest and the best-fed and you took her to dinner and she said: "370 by spring." You believe her completely. Her belly filled the restaurant chair and was warm and soft and present and she ate every plate.`,gainBonus:16,relBonus:13},
        {condition:h=>h.includes("fed_pregame")&&h.includes("fed_between"),text:`Tournament win. She was well-fed throughout and it showed. She finds you after the ceremony and says: "Good support today." This is high praise.`,gainBonus:10,relBonus:8},
        {condition:h=>h.includes("fed_pregame")||h.includes("fed_between"),text:`Tournament win. The food helped. She notes it and plans for more of it.`,gainBonus:5,relBonus:4},
        {condition:()=>true,text:`Tournament win. Clean bracket. She eats well on her own afterward.`,gainBonus:0,relBonus:3},
      ]
    },
    // stage 7 — ~419 lbs
    {
      title:"State Championship",
      phases:[
        {
          text:(h,s)=>`${Math.round(s.lbs)} pounds on the state scale, certified, and she's one of three competitors above 380. The crowd is large — this is a real event with spectators who know the sport and came specifically to see the heavy women compete. She warms up in the hall and her footsteps are present in the floor and her belly, enormous and warm, swings slightly as she plants and drives through her sequences. You're backstage.`,
          choices:[
            {id:"full_prep_meal",label:"Prepare a full staging meal — everything",result:`You've coordinated with her corner: a full pre-match spread, dense and warm, everything timed right. She eats in the preparation room with the focus of an athlete fueling for performance. Her belly, already massive, fills tighter against the mawashi. "Right," she says.`,lbs:10,rel:7,flag:"fed_pregame"},
            {id:"media_handling",label:"Handle the media so she can focus",result:`You intercept three reporters and two photographers so she can prepare undisturbed. She notices the absence of interruption and says: "Thank you." She means it.`,rel:10},
          ]
        },
        {
          text:(h,s)=>h.includes("fed_pregame")
            ?`Quarter-final, then semi. Both opponents are above 350 pounds and both times the collision is dramatic: two enormous women meeting at the tachi-ai, belly fat compressing between them, her ${Math.round(s.lbs)} pounds of warm fed weight driving forward. She wins both. Her belly is a wall.`
            :`Quarter-final, then semi. Both opponents over 350. She wins both on technique and on being the biggest woman in each bout. ${Math.round(s.lbs)} pounds is a lot to move.`,
          choices:[
            {id:"corner_feeding",label:"Feed her in every interval",result:`You're at her corner in every break. She eats between bouts — the warm dense food she needs, timed correctly. By the final her belly is full and her stance is planted and she is unmovable.`,lbs:12,rel:9,flag:"fed_intervals"},
            {id:"tactical_coaching",label:"Coach tactically through the bracket",result:`You read the opponents and tell her what you see. She incorporates the information efficiently. Her wins are clean.`,rel:8},
          ]
        },
        {
          text:(h,s)=>{
            const fed=h.includes("fed_pregame")&&h.includes("fed_intervals");
            if(fed) return `State final. The opponent is 410 pounds and this is the best sumo match you've seen. Two enormous women, belly-to-belly, 419 and 410 pounds pressing together, the sound enormous in the hall. Your student is warm and full and heavier-feeling than her certified weight. She drives. The opponent drives. She wins — her belly pressing the opponent out of the ring by inches, warm and vast and real.`;
            return `State final. 419 versus 410. She wins on will and size. The crowd is very loud.`;
          },
          choices:[
            {id:"post_match_feast",label:"Organize a post-match feast",result:`You've arranged dinner for after. She arrives and sits down and looks at the table with the expression of someone who intends to eat all of it. She does. Her belly, enormous and warm and full, fills her lap when she sits back. "I want to be 480 before nationals," she says.`,lbs:10,rel:13,flag:"celebrated"},
            {id:"trophy_moment",label:"Give her the moment — step back",result:`She takes the state title and lifts it with both hands and her belly rounds forward in the lift and the crowd sees 419 pounds of state champion and reacts accordingly.`,rel:6},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("fed_pregame")&&h.includes("fed_intervals")&&h.includes("celebrated"),text:`State champion. She ate well throughout the day and she ate enormously after and she said "480 before nationals" with the certainty of a woman describing a plan she has already executed. Her belly was warm and full and she finished the last plate and didn't leave a single thing on the table.`,gainBonus:18,relBonus:14},
        {condition:h=>h.includes("fed_pregame")&&h.includes("fed_intervals"),text:`State champion. Fed throughout. She says: "The food is the training. Get me the same setup for nationals."`,gainBonus:11,relBonus:9},
        {condition:h=>h.includes("fed_pregame")||h.includes("fed_intervals"),text:`State champion. The food helped. She's already thinking about nationals.`,gainBonus:6,relBonus:5},
        {condition:()=>true,text:`State champion. Clean bracket, decisive win. She's enormous and she's only going to get larger.`,gainBonus:0,relBonus:3},
      ]
    },
    // stage 8 — ~519 lbs
    {
      title:"National Qualifier",
      phases:[
        {
          text:(h,s)=>`She weighs ${Math.round(s.lbs)} pounds for the national qualifier certification and the official writes it down without expression, which is its own kind of acknowledgement. She is the heaviest woman competing today by 80 pounds. Her belly hangs in a warm, heavy apron below the mawashi — soft and enormous, real weight, real presence — and when she walks the mat the floor communicates her. The other competitors are watching.`,
          choices:[
            {id:"pre_event_meal",label:"Full pre-event meal — three courses",result:`You've arranged it properly: three courses, timed to digest correctly before competition. She eats in the private preparation room with focused attention, her enormous belly filling and settling with each course. When she stands to warm up she is warm and heavy and ready.`,lbs:12,rel:8,flag:"fed_pregame"},
            {id:"presence_strategy",label:"Tell her to let them see her first",result:`You say: walk the mat slowly before warm-ups. Let them calculate. Let them arrive at the number themselves. She does. The watching competitors do their math and several of them look away first.`,rel:11,flag:"psych_advantage"},
          ]
        },
        {
          text:(h,s)=>{
            const both=h.includes("fed_pregame")&&h.includes("psych_advantage");
            if(both) return `First two bouts: the opponents came in with calculations and left with evidence. ${Math.round(s.lbs)} pounds of fed, warm woman pressing belly-first through two competitors. The belly-to-belly contact is significant: she's so much larger than both that her apron alone displaces them.`;
            if(h.includes("fed_pregame")) return `First two bouts. She's been fed and she uses it. ${Math.round(s.lbs)} pounds driving through opponents who are strong women and are simply smaller.`;
            return `First two bouts. She dominates. ${Math.round(s.lbs)} pounds, technique, will.`;
          },
          choices:[
            {id:"interval_feeding",label:"Feed her in every break — treat it like a training day",result:`Every break between bouts you're there with food. She eats with the systematic focus she brings to training: intake, fuel, continue. Her belly is warm and full throughout the bracket.`,lbs:14,rel:10,flag:"fed_intervals"},
            {id:"crowd_management",label:"Work the crowd — get them cheering for her",result:`You work the section near her corner and by the semi-final the crowd knows her name and is using it. She hears it. Her stance broadens.`,rel:9},
          ]
        },
        {
          text:(h)=>{
            const fed=h.includes("fed_pregame")&&h.includes("fed_intervals");
            if(fed) return `National qualifier final. The opponent is 490 pounds, the second-heaviest person in the draw. The tachi-ai is the loudest sound in the building: 519 and 490 meeting, two enormous warm bodies pressing together, the apron fat of both women compressing between them. Your student drives. She has been eating all day. She is heavier than her certified weight by now and she knows it and she uses it.`;
            return `Qualifier final. 519 versus 490. Enormous women, enormous match. She wins.`;
          },
          choices:[
            {id:"nationals_dinner",label:"Book a restaurant for the qualifying celebration",result:`You've booked a table. She arrives and sits and her belly fills her lap and she looks at the menu with the calm focus of someone planning a serious meal. She orders extensively. She eats all of it. She says: "I want to be 580 for nationals. I want to be the undeniable largest thing in that building." She is already planning the weight.`,lbs:12,rel:14,flag:"celebrated"},
            {id:"press_statement",label:"Help her with the post-qualifying press",result:`Three journalists want statements. She gives them plainly: her weight, her training, what she plans to weigh at nationals. She says the number clearly. The journalists write it down.`,rel:7},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("fed_pregame")&&h.includes("fed_intervals")&&h.includes("celebrated"),text:`National qualifier champion. She ate all day and she said "580 for nationals" and she meant it and you believe her because 519 was already the most impressive thing you'd seen and she has every intention of adding to it.`,gainBonus:20,relBonus:15},
        {condition:h=>h.includes("fed_pregame")&&h.includes("fed_intervals"),text:`National qualifier champion. Fed throughout. She's planning her intake approach for nationals right now.`,gainBonus:12,relBonus:10},
        {condition:h=>h.includes("fed_pregame")||h.includes("fed_intervals"),text:`National qualifier champion. The food helped. She knows. She'll plan better for next time.`,gainBonus:7,relBonus:5},
        {condition:()=>true,text:`National qualifier champion. She qualifies for nationals. She will be the largest person there.`,gainBonus:0,relBonus:4},
      ]
    },
    // stage 9 — ~630 lbs
    {
      title:"National Circuit Finals",
      phases:[
        {
          text:(h,s)=>`${Math.round(s.lbs)} pounds on the national circuit scale and the official reads it into the microphone and the room goes quiet the way rooms go quiet when a number is that large and unambiguous. She stands in her mawashi and her belly hangs in a deep warm apron below the wrap — enormous, soft, real — and her thighs are vast and pressing and her arms are thick and her face is calm. The other competitors watch her from across the preparation hall. Three of them weigh between 380 and 450 pounds. She is a different category.`,
          choices:[
            {id:"ritual_meal",label:"Pre-match ritual meal — the full protocol",result:`You've been doing this together long enough that it's a ritual now: the specific foods, the timing, the quiet. She eats in the preparation room and you don't talk. Her belly fills and settles under the mawashi and when she stands she is warm and vast and fed and ready.`,lbs:15,rel:9,flag:"fed_pregame"},
            {id:"presence_walk",label:"Walk the hall with her — let the field see her",result:`She walks the preparation hall at full stride and you walk beside her and the other competitors see 630 pounds moving through the space and the calculations they make don't arrive anywhere reassuring for any of them.`,rel:12,flag:"psych_advantage"},
          ]
        },
        {
          text:(h,s)=>{
            const both=h.includes("fed_pregame")&&h.includes("psych_advantage");
            if(both) return `Opening bracket. She goes through three opponents and the matches are, technically, competitive. In practice: a 630-pound fed woman who has been on this circuit for two years is operating at a different level. The belly-to-belly contacts are overwhelming — her apron compressing against opponents' chests, her weight irreversible once moving. She wins each bout cleanly.`;
            return `Opening bracket. Three opponents. She wins all three. ${Math.round(s.lbs)} pounds is an argument that ends discussions.`;
          },
          choices:[
            {id:"full_day_feeding",label:"Feed her between every bout all day",result:`All day, every interval: food. She eats with the focused efficiency she has developed over two years of this. By the semi-final she is heavier than her certified weight by a meaningful amount and she is aware of this and uses it.`,lbs:18,rel:11,flag:"fed_all_day"},
            {id:"tactical_breakdown",label:"Break down every opponent she'll face",result:`You've scouted the bracket and you give her a complete tactical breakdown at lunch. She listens. She asks two questions. She wins accordingly.`,rel:10},
          ]
        },
        {
          text:(h,s)=>{
            const fed=h.includes("fed_pregame")&&h.includes("fed_all_day");
            if(fed) return `National final. The opponent is the defending champion at 520 pounds — the best technical competitor on the circuit, fast, strong, a perfect match for anyone except what your student has become. They meet at the tachi-ai and the sound is definitive: 630-plus pounds of warm, full, enormous woman hitting 520 with everything behind it. The belly contact is complete — apron on chest, fat on fat, her weight making the outcome clear from the first collision. She wins in two bouts.`;
            return `National final. 630 versus 520. The defending champion is the best technical competitor in the draw. Your student is the largest. She wins.`;
          },
          choices:[
            {id:"legend_dinner",label:"Dinner at the best restaurant in the city",result:`You take her somewhere worth taking her. She sits and her belly fills her lap and rounds against the table and she opens the menu with the expression of someone who has earned the right to order everything on it. She orders most of it. She eats all of it. "800 pounds," she says, at the end, looking at you directly. "I want to be 800 pounds on the circuit." She says it like stating her next goal, which it is.`,lbs:14,rel:16,flag:"celebrated"},
            {id:"press_circuit",label:"Run the post-match press circuit with her",result:`National champion press. She says her weight clearly and calmly. The journalists write the number. The circuit photographers position her and she fills their frames with 630 pounds of national champion and she is completely at ease with the space she takes.`,rel:8},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("fed_pregame")&&h.includes("fed_all_day")&&h.includes("celebrated"),text:`National champion. She was fed all day, she won all day, and at dinner she said "800 pounds" with the certainty of a woman who has already done the harder thing twice. Her belly was warm and enormous and full and she ate everything on the table and was satisfied with all of it.`,gainBonus:22,relBonus:16},
        {condition:h=>h.includes("fed_pregame")&&h.includes("fed_all_day"),text:`National champion. Fed throughout the day. The combination of her size and the day's intake made the final an inevitability. She's already planning how to be larger for the next circuit.`,gainBonus:14,relBonus:11},
        {condition:h=>h.includes("fed_pregame")||h.includes("fed_all_day"),text:`National champion. The food helped when it was there. She makes a note of it.`,gainBonus:8,relBonus:6},
        {condition:()=>true,text:`National champion. 630 pounds, first place, unambiguous. The circuit hasn't seen anything like her.`,gainBonus:0,relBonus:5},
      ]
    },
  ],

  eating_captain:[
    // stage 5 — ~258 lbs
    {
      title:"First Squad Practice",
      phases:[
        {
          text:(h,s)=>`She's called the first practice of her tenure as eating captain. The squad — including two of your cheerleader students — is seated at the long table in the gym annex and she's at the head of it, ${Math.round(s.lbs)} pounds, her belly warm and round under her captain's pullover. She's arranged the food herself. The squad is watching her set the tone.`,
          choices:[
            {id:"feed_captain_first",label:"Bring extra food for her, set the example",result:`You arrive with a second spread specifically for her: dense, warm, abundant. She understands immediately. She pulls it in and begins eating with the deliberate focus of a captain who is demonstrating the standard. The squad watches and several of them start eating more seriously.`,lbs:6,rel:7,flag:"fed_captain"},
            {id:"encourage_culture",label:"Tell her to make them all eat more",result:`You lean in before she starts and say: "Get them all eating more. That's the culture now." She nods and turns to the squad and says, plainly: "We eat here. Everyone eats. Let's go."`,rel:8},
          ]
        },
        {
          text:(h)=>h.includes("fed_captain")
            ?`Midway through practice. She's been eating steadily and her belly is warm and noticeably fuller under the pullover. The squad has been eating too, encouraged by her example. One girl — a cheerleader you recognize — is on her second plate and looks surprised that she's still eating. Your student is at her third.`
            :`Midway through practice. She's been eating throughout and the squad is keeping up with her. The table is going down. One of the cheerleaders has been at it for forty minutes straight.`,
          choices:[
            {id:"feed_the_squad",label:"Order more food for the whole squad",result:`You order another full round for the table. The delivery arrives twenty minutes later and the squad — all of them, the cheerleaders especially — eats on. Your cheerleader students gain weight from the extra round. Your captain watches them eat and looks satisfied.`,rel:8,flag:"fed_squad",feedOther:{archetype:"cheerleader",lbs:4,text:"The cheerleaders eat through the extra round. You can see the food going somewhere."}},
            {id:"coach_captain",label:"Coach her through the second half of practice",result:`You run the practice structure while she focuses on eating. She eats through the drills. The squad follows her lead.`,lbs:5,rel:6},
          ]
        },
        {
          text:(h,s)=>{
            const full=h.includes("fed_captain")&&h.includes("fed_squad");
            if(full) return `End of practice. She sits back and her belly presses her pullover forward, round and warm and full, ${Math.round(s.lbs)} pounds plus everything she's eaten today. The squad is in various states of very full contentment. One cheerleader is still eating. Your captain looks at the table — at the empty dishes, at the full girls — and is satisfied.`;
            return `End of practice. The table is largely gone. The squad is fed. She looks at what she's accomplished in the first practice and is satisfied.`;
          },
          choices:[
            {id:"post_practice_talk",label:"Talk with her about the culture she's building",result:`Afterward, she sits with her belly warm and full and says: "I want all of them bigger by the end of the season. I want us to be the heaviest squad in the conference." She looks at the cheerleaders still eating. "We're getting there."`,rel:12,flag:"vision_set"},
            {id:"help_clean_up",label:"Help clear the table, stay close",result:`You help with the table and she's beside you and she says, quietly: "Good first practice." Her belly presses your arm as she reaches past you and neither of you acknowledges it directly.`,rel:7},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("fed_captain")&&h.includes("fed_squad")&&h.includes("vision_set"),text:`First practice down. She ate well, the squad ate well, the cheerleaders are heavier, and she told you she wants the heaviest squad in the conference. You believe her. Her belly was warm and round and full and she looked at those girls eating and was completely satisfied.`,gainBonus:10,relBonus:13},
        {condition:h=>h.includes("fed_captain")&&h.includes("fed_squad"),text:`First practice down. She ate well, the squad ate well. The cheerleaders leave heavier. The culture is setting.`,gainBonus:7,relBonus:8},
        {condition:h=>h.includes("fed_captain"),text:`First practice down. She ate well and led well. The squad is fed.`,gainBonus:4,relBonus:5},
        {condition:()=>true,text:`First practice. She ran it well. The table was cleared.`,gainBonus:0,relBonus:3},
      ]
    },
    // stage 6 — ~320 lbs
    {
      title:"Weekly Squad Feast",
      phases:[
        {
          text:(h,s)=>`${Math.round(s.lbs)} pounds and she runs the weekly squad feast like a production: the table, the food, the pacing, the culture she has spent six months building. The cheerleaders on your roster are here and they are both noticeably heavier than when the season started. She presides from her chair with her belly warm and round against the table, eating steadily, watching everyone else eat.`,
          choices:[
            {id:"arrive_with_extra",label:"Arrive with additional food — significantly more",result:`You arrive with enough for a second feast. She looks at what you've brought and says: "Good." She incorporates it into the spread immediately. The table becomes very large.`,lbs:7,rel:7,flag:"fed_captain"},
            {id:"recruit_new_members",label:"Bring two new students to introduce to the culture",result:`You've brought two girls who haven't been to a squad feast before. She receives them at the door, personally, with plates already poured. They sit. They eat. Neither of them leaves early.`,rel:9,flag:"new_recruits"},
          ]
        },
        {
          text:(h,s)=>h.includes("fed_captain")
            ?`Midway. She's deep into her second round and the table is going hard. Her belly, enormous at ${Math.round(s.lbs)} pounds, presses the table noticeably. The cheerleaders you know are on their third plates. The newer girls are finding their rhythm.`
            :`Midway. She's been eating steadily and the table is active. The cheerleaders are at their third plates. Someone has gone for seconds twice.`,
          choices:[
            {id:"feed_squad_round",label:"Fund another full round for the whole table",result:`You signal to the kitchen for another full round. When it arrives your captain says "keep eating" and the table keeps eating. The cheerleaders go through their fourth plates. You can see it on them.`,rel:9,flag:"fed_squad",feedOther:{archetype:"cheerleader",lbs:5,text:"The cheerleaders are deep into their fourth plates. They're eating with the ease of women who have been doing this for months."}},
            {id:"encourage_competition",label:"Suggest a friendly eating competition",result:`You propose it and she immediately seconds it: most plates, by the end of the night. The table accelerates. She wins, clearly, but three cheerleaders post numbers that would have been unthinkable at the start of the semester.`,lbs:8,rel:8},
          ]
        },
        {
          text:(h,s)=>{
            if(h.includes("fed_captain")&&h.includes("fed_squad")) return `End of feast. The table is cleared. The cheerleaders are full and showing it — you can see the weight on them in a way you couldn't at the start of the night. She sits back and her belly is warm and vast and round against her clothes, ${Math.round(s.lbs)} pounds plus tonight's intake, and she looks at the table with the calm satisfaction of a captain who has done her job exactly right.`;
            return `End of feast. Table mostly cleared. The squad is fed. She looks at the room and is satisfied.`;
          },
          choices:[
            {id:"end_of_feast_talk",label:"Sit with her after, let her talk",result:`After everyone else leaves she stays at the table with her belly warm and full and says: "I want every girl here above 200 by spring. I'm at 320. I should be at 380." She looks at the table. "I want more of these. I want them bigger."`,rel:12,flag:"vision_articulated"},
            {id:"walk_out_together",label:"Walk out with the squad, be seen with her",result:`You leave with the group. She walks beside you and her presence is substantial and warm and several girls glance over with expressions that have no convenient name.`,rel:6},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("fed_captain")&&h.includes("fed_squad")&&h.includes("vision_articulated"),text:`She said she wants every girl above 200 and herself at 380. Her belly was full and enormous and warm and she looked at the cleared table with the satisfaction of someone who is building exactly what she intends to build. The cheerleaders left heavier.`,gainBonus:13,relBonus:14},
        {condition:h=>h.includes("fed_captain")&&h.includes("fed_squad"),text:`Good feast. She was well-fed, the squad was well-fed, the cheerleaders are heavier. The culture is intact.`,gainBonus:8,relBonus:9},
        {condition:h=>h.includes("fed_captain"),text:`Good feast. She ate well and ran it well.`,gainBonus:5,relBonus:5},
        {condition:()=>true,text:`Good feast. Table cleared. Squad fed.`,gainBonus:0,relBonus:3},
      ]
    },
    // stage 7 — ~419 lbs
    {
      title:"Conference Meet",
      phases:[
        {
          text:(h,s)=>`${Math.round(s.lbs)} pounds and the conference eating meet is today — her squad against four others. She is easily the largest captain present. The other squads are watching her warm up: her belly enormous and warm and soft under the team jersey, her thighs broad, her presence filling the warm-up area. The cheerleaders on your roster have been training under her for months and it shows.`,
          choices:[
            {id:"full_team_prep",label:"Provide a pre-meet meal for the whole squad",result:`You've arranged catering for the squad: full pre-meet spread, enough for everyone. The cheerleaders eat well. Your captain eats significantly more, leading from the front, her belly pressing her jersey out with unmistakable warmth by the time warm-ups end.`,lbs:9,rel:8,flag:"fed_captain",feedOther:{archetype:"cheerleader",lbs:5,text:"The cheerleaders eat through the pre-meet spread and arrive at the tables heavier and more ready than they've been all season."}},
            {id:"intimidation_warmup",label:"Run a visible warm-up — let the other squads watch",result:`You put the squad through warm-ups in the main hall, in full view. The other squads see 419 pounds of captain leading six well-fed women through the sequences. Several other captains are recalculating their strategy.`,rel:10,flag:"intimidation"},
          ]
        },
        {
          text:(h,s)=>h.includes("fed_captain")
            ?`First two rounds. She leads her squad through them and she personally competes in the captain's bracket — ${Math.round(s.lbs)} pounds, her belly enormous and warm, eating with the absolute focus of someone who has trained for exactly this. She wins both. Her cheerleaders are performing above expectations.`
            :`First two rounds. She competes and her squad competes. She wins the captain's bracket. Her cheerleaders are doing well.`,
          choices:[
            {id:"mid_meet_feeding",label:"Keep feeding the whole squad between rounds",result:`You've arranged interval food for the whole squad. The cheerleaders eat between rounds — they've been trained for this. Your captain eats the most, as always, her belly settling warm and fuller with each interval.`,lbs:12,rel:10,flag:"interval_fed",feedOther:{archetype:"cheerleader",lbs:6,text:"The cheerleaders eat between rounds with the practiced ease of women who have been doing this all semester. They're visibly heavier by the third round."}},
            {id:"tactical_adjustments",label:"Coach adjustments for the second half",result:`You give her tactical adjustments at the interval. She passes them to the squad. Their second-half performance improves.`,rel:8},
          ]
        },
        {
          text:(h,s)=>{
            const dominated=h.includes("fed_captain")&&h.includes("interval_fed");
            if(dominated) return `Finals. She sits at the head of the table, ${Math.round(s.lbs)} pounds and everything she's eaten today, her belly warm and enormous against the table, and she eats the final round with the patient focus of a captain who knows her squad is behind her. Her cheerleaders — heavier than the other squad's competitors, better trained, better fed — perform accordingly. The conference title goes to your squad.`;
            return `Finals. She leads her squad through the final round. They win the conference title.`;
          },
          choices:[
            {id:"championship_feast",label:"Take the whole squad out to celebrate",result:`You take the whole squad to dinner. The cheerleaders eat enormously. Your captain eats more than any of them, her belly enormous and full, and at the end of the meal she looks around the table at her well-fed squad and says: "I want every one of you heavier next conference. Including me. Especially me."`,lbs:11,rel:14,flag:"squad_vision",feedOther:{archetype:"cheerleader",lbs:7,text:"The cheerleaders eat through the celebration dinner. They're going to be noticeably larger this week."}},
            {id:"captain_solo_celebration",label:"Take her alone to dinner, skip the group",result:`You take her separately. She eats an enormous dinner alone with you and says: "The squad did well. They need to be bigger next year. So do I." She finishes the last plate.`,lbs:9,rel:11},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("fed_captain")&&h.includes("interval_fed")&&h.includes("squad_vision"),text:`Conference champions. She fed her squad and her squad performed and she ate throughout and at dinner she said "heavier next conference, especially me." The cheerleaders went home heavier. She went home full and warm and already planning.`,gainBonus:17,relBonus:15},
        {condition:h=>h.includes("fed_captain")&&h.includes("interval_fed"),text:`Conference champions. She and the squad were fed throughout. The cheerleaders are heavier. She's planning next season.`,gainBonus:11,relBonus:10},
        {condition:h=>h.includes("fed_captain"),text:`Conference champions. She led well and ate well. The squad followed.`,gainBonus:6,relBonus:6},
        {condition:()=>true,text:`Conference champions. Clean win. She'll prepare more aggressively next time.`,gainBonus:0,relBonus:4},
      ]
    },
    // stage 8 — ~519 lbs
    {
      title:"National Championship Training Camp",
      phases:[
        {
          text:(h,s)=>`${Math.round(s.lbs)} pounds and nationals training camp, which means a week of practices and meals and conditioning. The cheerleaders on your roster have been under her for over a year and they are not the same women who started the season. She runs the camp like she runs the feasts: with complete certainty about what the culture should be. The camp kitchen is at her disposal.`,
          choices:[
            {id:"fund_camp_kitchen",label:"Fund the camp kitchen fully — no limits",result:`You tell her: no limits on the kitchen this week. She processes this information without visible reaction, then goes directly to the kitchen and begins planning the week's meals. The result is ambitious. She eats more at camp than she has at any previous event and the squad follows her lead completely.`,lbs:13,rel:9,flag:"fed_captain"},
            {id:"bring_specialist",label:"Bring in a performance nutrition specialist",result:`You bring in someone who understands exactly what the squad is doing and can articulate the performance case for more food. The cheerleaders respond well to the framing. Your captain responds to the specialist with the respect one professional gives another.`,rel:10,feedOther:{archetype:"cheerleader",lbs:5,text:"The cheerleaders take the specialist's recommendations seriously. The specialist's recommendations involve eating significantly more."}},
          ]
        },
        {
          text:(h,s)=>h.includes("fed_captain")
            ?`Midcamp. She's been eating comprehensively and training hard and the combination is visible: ${Math.round(s.lbs)} pounds and the camp diet on top of it, her belly enormous and warm against the training pullover. The squad is matching her culture. The cheerleaders are eating at every meal like they're training for something, which they are.`
            :`Midcamp. Training, meals, culture. She runs it with her usual completeness. The squad is following. The cheerleaders are eating well.`,
          choices:[
            {id:"midnight_feast",label:"Organize a midnight feast for the squad",result:`You arrange a late-night spread for the whole squad. The cheerleaders come down and eat seriously for an hour after lights-out. Your captain eats for two hours. Her belly is warm and enormous when she finally sleeps.`,lbs:14,rel:11,flag:"midnight_feast",feedOther:{archetype:"cheerleader",lbs:7,text:"The cheerleaders eat seriously at the midnight feast. Several of them are going to need new camp clothes before the week is out."}},
            {id:"one_on_one",label:"Work one-on-one with her on her personal intake goals",result:`You spend an afternoon with her building her personal camp plan: specific targets, specific meals, specific goals for the week. She executes it with the systematic focus she brings to everything.`,lbs:11,rel:12},
          ]
        },
        {
          text:(h)=>{
            const full=h.includes("fed_captain")&&h.includes("midnight_feast");
            if(full) return `Last day of camp. She weighs herself — more than when camp started, a meaningful amount more — and records it without expression except for the brief satisfaction she shows when a number is exactly where it should be. The cheerleaders have been transformed by the week. She looks at them and is satisfied. "Nationals," she says. "I want to be 580 at nationals. I want the squad to average 280."`;
            return `Last day of camp. She's heavier than when it started. The squad is heavier. She's already planning nationals.`;
          },
          choices:[
            {id:"end_of_camp_meal",label:"Host a full end-of-camp feast",result:`You host the closing feast. It runs three hours. The cheerleaders eat everything on the table. Your captain eats substantially more than that and her belly is warm and enormous in the camp chair and she looks at her squad — well-fed, trained, heavier — with complete satisfaction.`,lbs:11,rel:14,flag:"vision_complete",feedOther:{archetype:"cheerleader",lbs:8,text:"The cheerleaders eat through the entire closing feast. They are noticeably, significantly heavier than they were at the start of camp."}},
            {id:"debrief_privately",label:"Debrief with her privately about what worked",result:`You sit with her after the squad disperses and she tells you exactly what worked and what she wants different at nationals. She is very specific. Her belly is warm and enormous and she eats through the whole conversation.`,rel:11},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("fed_captain")&&h.includes("midnight_feast")&&h.includes("vision_complete"),text:`Camp over. She said "580 at nationals, squad averaging 280." The cheerleaders leave camp significantly heavier than they arrived. She leaves heavier than that. The culture is intact and it is going to nationals.`,gainBonus:19,relBonus:16},
        {condition:h=>h.includes("fed_captain")&&h.includes("midnight_feast"),text:`Camp over. She ate comprehensively, the squad ate comprehensively. The cheerleaders are noticeably heavier. She's ready for nationals.`,gainBonus:12,relBonus:11},
        {condition:h=>h.includes("fed_captain"),text:`Camp over. Good week. She's heavier, the squad is heavier, nationals is next.`,gainBonus:7,relBonus:6},
        {condition:()=>true,text:`Camp over. Productive week. Nationals is coming.`,gainBonus:0,relBonus:4},
      ]
    },
    // stage 9 — ~630 lbs
    {
      title:"National Showcase",
      phases:[
        {
          text:(h,s)=>`${Math.round(s.lbs)} pounds and the national showcase, which is the largest event she's captained. The cheerleaders on your roster have been under her for two full years. They are not recognizably the same women. She arrives at the showcase venue at ${Math.round(s.lbs)} pounds and the other squads' captains are watching her walk in and making the kind of calculations that produce uncomfortable conclusions. She finds the event kitchen immediately.`,
          choices:[
            {id:"full_showcase_catering",label:"Arrange full catering for the squad all day",result:`You've arranged it: full-day catering for her squad, all meals, all intervals, the kitchen at their disposal. She receives this information with the focused satisfaction of a captain who has always known that the culture she's building runs on this. She briefs the squad. They eat.`,lbs:15,rel:10,flag:"fed_captain",feedOther:{archetype:"cheerleader",lbs:8,text:"The cheerleaders eat through the full-day catering with the ease of women who have been trained for exactly this. They are going to be significantly heavier by the end of today."}},
            {id:"national_arrival",label:"Make an entrance — walk the squad through the venue",result:`You orchestrate the squad's arrival: 630 pounds of captain leading a group of well-fed, trained women through the national showcase venue. The other squads see them. The effect is measurable.`,rel:12,flag:"entrance_made"},
          ]
        },
        {
          text:(h)=>h.includes("fed_captain")
            ?`Competition rounds. She competes in the captain's exhibition and eats between every round, her squad eating alongside her. The cheerleaders are performing at their best — trained and fed and following a captain who has made the culture irresistible. She's the largest captain at the national showcase by over 100 pounds and she is eating continuously and it is completely evident in her belly, warm and enormous and forward, visible to the entire venue.`
            :`Competition rounds. She competes. Her squad performs. The cheerleaders are doing well.`,
          choices:[
            {id:"showcase_continuous_feed",label:"Keep feeding — all day, everyone, no stopping",result:`The catering runs continuous. Your captain eats between every round, at every break, during set changes. The cheerleaders match the culture she's established. By the final rounds they are visibly heavier than when the day started.`,lbs:18,rel:12,flag:"all_day_fed",feedOther:{archetype:"cheerleader",lbs:10,text:"The cheerleaders have been eating all day. They are noticeably, substantially heavier than they arrived. They are competing better than they ever have."}},
            {id:"squad_motivation",label:"Give the squad a mid-day speech",result:`You let her give the speech while you watch. She tells the squad exactly what she wants: better, heavier, more. She says her own weight out loud: 630 pounds. She says: "I want to be bigger. I want all of you bigger. That is the standard." The squad is inspired.`,rel:11},
          ]
        },
        {
          text:(h,s)=>{
            const dominated=h.includes("fed_captain")&&h.includes("all_day_fed");
            if(dominated) return `Finals. She sits at the captain's table — ${Math.round(s.lbs)} pounds, everything she's eaten today, her belly vast and warm and enormously present — and competes in the final captain's exhibition. Her squad performs behind her. The cheerleaders have eaten all day and performed all day and they are the heaviest, best-fed, best-performing squad at the national showcase. First place. She stands for the presentation and ${Math.round(s.lbs)} pounds of national champion captain fills the stage and she looks completely at home in it.`;
            return `Finals. She leads. The squad performs. National showcase champions.`;
          },
          choices:[
            {id:"national_celebration",label:"Host a full celebration feast for the squad tonight",result:`You reserve a private room and the squad comes. The cheerleaders eat for three hours. Your captain eats for four and her belly is warm and vast and full and she looks at the table — at the empty dishes, at the full, heavier, well-fed women she has built — and says: "This is what I came to build." She means all of it. The squad. The culture. Her own size. All of it together.`,lbs:14,rel:16,flag:"culture_complete",feedOther:{archetype:"cheerleader",lbs:9,text:"The cheerleaders eat through the celebration feast. By the end of the evening they are the heaviest they have ever been."}},
            {id:"awards_circuit",label:"Take her through the awards circuit",result:`Press, ceremony, awards. She says her weight at every stop. The journalists write the number. The photographers try to frame her and her belly defeats every expected shot. She looks magnificent.`,rel:9},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("fed_captain")&&h.includes("all_day_fed")&&h.includes("culture_complete"),text:`National showcase champions. She ate all day, the squad ate all day, the cheerleaders are the heaviest they've ever been, and at the celebration feast she said "this is what I came to build." Her belly was warm and enormous and full and she looked at those women and she was right.`,gainBonus:22,relBonus:17},
        {condition:h=>h.includes("fed_captain")&&h.includes("all_day_fed"),text:`National showcase champions. Fed all day, squad and captain both. The cheerleaders are significantly heavier. She's built exactly what she planned.`,gainBonus:14,relBonus:12},
        {condition:h=>h.includes("fed_captain"),text:`National showcase champions. She led and ate well and the squad followed.`,gainBonus:8,relBonus:7},
        {condition:()=>true,text:`National showcase champions. She is 630 pounds of national champion captain.`,gainBonus:0,relBonus:5},
      ]
    },
  ],

  chapter_hostess:[
    // stage 5 — ~258 lbs
    {
      title:"Wednesday Feast",
      phases:[
        {
          text:(h,s)=>`She's been in the chapter kitchen since two in the afternoon and it's now seven and the table is extraordinary. She is ${Math.round(s.lbs)} pounds in her hostess apron, belly warm and rounded against it, moving through the kitchen with the ease of someone who has been planning this for weeks. The sorority sisters are gathering. Your sorority students are here, both of them, and several other chapter members in various stages of arrival.`,
          choices:[
            {id:"arrive_with_more",label:"Arrive with additional food — double the dessert course",result:`You arrive with a significant supplemental course: desserts, dense and sweet, more than the table needs. She sees what you've brought and incorporates it without hesitation. The table becomes larger than she planned.`,lbs:5,rel:7,flag:"extra_food"},
            {id:"help_serve",label:"Help serve — be useful, watch how she runs it",result:`You help carry plates and she runs the service and you learn something about how she does this: with complete authority and genuine pleasure, making sure every plate is full before she sits down.`,rel:9},
          ]
        },
        {
          text:(h)=>h.includes("extra_food")
            ?`Midway through the feast. The extra dessert course is visible in the dynamic at the table — sisters eating past the point of full, coming back for more because more is there. Your sorority students are both on generous helpings. Your hostess is eating at the head of the table with the deliberate, pleasured focus of someone who has made something she's proud of.`
            :`Midway. The table is active, the food is going, your sorority students are both eating well. She presides from the head, eating steadily.`,
          choices:[
            {id:"encourage_seconds",label:"Encourage the sisters to go back for more",result:`You circulate and suggest seconds to everyone. Several take you up on it. Your sorority students both return for second plates. She watches this from the head of the table and nods once.`,rel:8,feedOther:{archetype:"sorority",lbs:4,text:"Your sorority students go back for seconds. The food finds them."}},
            {id:"talk_with_hostess",label:"Talk with her while she eats",result:`You sit near her and she talks while eating — about the table, the recipes, what she wants to add next time. She eats through the whole conversation without slowing.`,lbs:6,rel:10,flag:"personal_moment"},
          ]
        },
        {
          text:(h,s)=>{
            if(h.includes("extra_food")&&h.includes("encourage_seconds")) return `End of feast. The table is cleared. The sorority students are full — visibly, warmly full — and several sisters are still eating from the dessert course. She sits at the head of the table with her belly warm and round against her clothes, ${Math.round(s.lbs)} pounds plus tonight's considerable intake, and surveys the room. Everyone she wanted to feed has been fed.`;
            return `End of feast. Table cleared. The sisters are fed. She's satisfied.`;
          },
          choices:[
            {id:"end_of_feast_talk",label:"Stay after — help her clean up, talk",result:`You stay and help. She talks while cleaning: "I want these tables bigger. I want the girls eating more each time. I want them coming in knowing they're going to leave heavier." She says it plainly. She means it.`,rel:12,flag:"vision_shared"},
            {id:"leave_with_group",label:"Leave with the sisters, let her have the close",result:`You say goodnight with the departing group. She stands at the door, enormous and warm, saying goodnight to each one personally.`,rel:5},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("extra_food")&&h.includes("encourage_seconds")&&h.includes("vision_shared"),text:`First feast down. She said she wants them "coming in knowing they're going to leave heavier." The sorority students are heavier. The table was extraordinary. Her belly was warm and full and she meant everything she said.`,gainBonus:10,relBonus:13},
        {condition:h=>h.includes("extra_food")&&h.includes("encourage_seconds"),text:`Good feast. Extra food, seconds encouraged, sorority students are heavier. She's building exactly the culture she described.`,gainBonus:7,relBonus:8},
        {condition:h=>h.includes("extra_food"),text:`Good feast. The extra food was right. She appreciated it.`,gainBonus:4,relBonus:5},
        {condition:()=>true,text:`Good feast. Table cleared. Sisters fed. Culture established.`,gainBonus:0,relBonus:3},
      ]
    },
    // stage 6 — ~320 lbs
    {
      title:"The Grand Feast",
      phases:[
        {
          text:(h,s)=>`${Math.round(s.lbs)} pounds and the feast has evolved. Six months of Wednesday feasts and the culture is established: the table is always large, the sisters always stay, the food is always more than you'd think anyone could eat. She's outdone herself this week — twelve courses, warm and fragrant, the table extraordinary. She presides at ${Math.round(s.lbs)} pounds, her belly enormous and warm against her hostess clothes.`,
          choices:[
            {id:"supplement_feast",label:"Arrive with a thirteenth course — surprise",result:`You arrive with a thirteenth course: something substantial, warm, timed perfectly for after the twelfth. She sees it and says: "Good." She incorporates it immediately. The table becomes the largest she's ever set.`,lbs:7,rel:8,flag:"extra_food"},
            {id:"bring_new_guests",label:"Bring two guests outside the chapter",result:`You bring two women who haven't been to a chapter feast. She receives them at the door personally, with plates ready. By the second course they have settled in as if they've been here before. By the eighth they haven't left their seats in ninety minutes.`,rel:9,flag:"new_guests"},
          ]
        },
        {
          text:(h)=>h.includes("extra_food")
            ?`Midway through the feast. Twelve courses in and a thirteenth on the way and the table is eating with sustained, pleasured focus. Your sorority students are deep in it — both of them, eating with the ease of women who have been doing this for months. Their bellies, noticeably rounder than when the semester started, press their blouses warmly. Your hostess is on her fifth plate and watching everything with warm satisfaction.`
            :`Midway. The table is deep into the feast. Your sorority students are eating well. She watches from the head and eats steadily.`,
          choices:[
            {id:"triple_dessert",label:"Fund triple dessert — for everyone, extra portions",result:`You fund a triple dessert course: three rounds, substantial portions, enough that by the end the table is extremely full. Your sorority students eat through all three. The sisters are in various states of very warm, very full contentment.`,rel:10,flag:"triple_dessert",feedOther:{archetype:"sorority",lbs:6,text:"Your sorority students eat through the triple dessert course. They are going to feel this tomorrow."}},
            {id:"seat_beside_her",label:"Sit beside her for the second half",result:`You take the seat beside her and she talks while eating — about each course, about what she's been planning, about what she wants the feasts to become. She eats through the conversation. She never stops.`,lbs:8,rel:11,flag:"close_moment"},
          ]
        },
        {
          text:(h)=>{
            if(h.includes("extra_food")&&h.includes("triple_dessert")) return `End of feast. The table is cleared. The sorority students are full in a way that will last through tomorrow. Several sisters haven't moved from their seats in forty minutes. She sits at the head of the table and her belly is vast and warm and round against her clothes and she has fed everyone exactly as much as she intended. She looks at the room and is completely satisfied.`;
            return `End of feast. Table cleared. Everyone is fed. She is satisfied.`;
          },
          choices:[
            {id:"private_close",label:"Stay after — share the last course with her, just you",result:`Everyone else leaves. You sit with her at the cleared table and she finds the last serving of something and puts it between you and you eat together in the quiet kitchen. She says: "I want to do this every week until I can't cook it fast enough." You both understand what that means.`,rel:14,flag:"intimate_close"},
            {id:"group_send_off",label:"See the sisters out with her",result:`You stand at the door with her as the sisters leave. She is 320 pounds and warm and full and enormous in the doorway and she says goodnight to each one personally.`,rel:6},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("extra_food")&&h.includes("triple_dessert")&&h.includes("intimate_close"),text:`Extraordinary feast. Triple dessert, thirteen courses, the sorority students heavier, and you ate the last course together in the quiet kitchen and she said she wants to do this until she can't cook it fast enough. Her belly was warm and vast and full and she meant all of it.`,gainBonus:13,relBonus:15},
        {condition:h=>h.includes("extra_food")&&h.includes("triple_dessert"),text:`Extraordinary feast. The sorority students are noticeably heavier. The culture has matured into something significant.`,gainBonus:8,relBonus:10},
        {condition:h=>h.includes("extra_food"),text:`Very good feast. The extra course was right. She'll plan even larger next time.`,gainBonus:5,relBonus:6},
        {condition:()=>true,text:`Good feast. The culture is established. She runs it better every time.`,gainBonus:0,relBonus:4},
      ]
    },
    // stage 7 — ~419 lbs
    {
      title:"Alumni Dinner",
      phases:[
        {
          text:(h,s)=>`${Math.round(s.lbs)} pounds and the alumni dinner, which is the largest event the chapter has held. A dozen alumni, several of them substantial women in their own right, including one at around 340 pounds who has been funding the feasts for three years without ever attending one. Your sorority students are here. The table is extraordinary — eighteen courses, the kitchen running since morning. She presides at ${Math.round(s.lbs)} pounds, her belly enormous and warm, completely at ease.`,
          choices:[
            {id:"coordinate_kitchen",label:"Help coordinate the kitchen — ensure she can host, not cook",result:`You manage the kitchen logistics so she can focus on the hosting. She circulates the table, talking, serving, attending to the alumni personally. Her belly, enormous at 419 pounds, presses past guests as she moves through the room. Nobody minds. Several alumni watch her with complicated expressions.`,lbs:6,rel:10,flag:"coordinated"},
            {id:"introduce_her",label:"Introduce her to the primary funder as the architect of this culture",result:`You introduce her to the 340-pound alumna specifically, as the woman who built what the alumna has been funding. The alumna looks at your student — 419 pounds, warm, enormous — and says: "I've been funding this for three years and I didn't understand what it was until now." She's smiling when she says it.`,rel:12,flag:"funder_met"},
          ]
        },
        {
          text:(h)=>h.includes("funder_met")
            ?`Midway. The 340-pound alumna has been eating since the introduction. She's been eating with the focused attention of a woman who has been missing this for years without knowing what she was missing. Your sorority students are both deep in it. Your hostess is eating at the head of the table and watching the whole room with the warm satisfaction of a person feeding exactly the people she wants to feed.`
            :`Midway. Eighteen courses and the alumni are responding well. Your sorority students are eating with practiced ease. She presides and eats.`,
          choices:[
            {id:"extra_course_alumni",label:"Fund an additional course specifically for the alumni",result:`You supplement with a nineteenth course, timed for the late middle of the dinner. The alumni eat it. The 340-pound alumna eats it twice. Your sorority students are on their fourth plates and showing it.`,rel:9,feedOther:{archetype:"sorority",lbs:6,text:"Your sorority students eat through the extra alumni course. They're well past comfortable and haven't considered stopping."}},
            {id:"sit_with_hostess",label:"Sit beside her and watch her work the room",result:`You sit beside her and she eats and you watch her watch the table — assessing, adjusting, sending another plate to someone who's slowing, refilling the glass of someone who's still going. She is magnificent at this.`,lbs:8,rel:11},
          ]
        },
        {
          text:(h,s)=>{
            if(h.includes("funder_met")&&h.includes("extra_course_alumni")) return `End of dinner. The table is cleared. The alumni are in various states of warm, full contentment — the 340-pound alumna hasn't moved in an hour and looks very pleased about this. Your sorority students are visibly heavier than when they arrived. She sits at the head of the table, ${Math.round(s.lbs)} pounds plus everything she's cooked and eaten, and the alumna across the table says: "I've been funding this without understanding it. I understand it now." Your hostess puts another course in front of her.`;
            return `End of dinner. Table cleared. Alumni fed. She has demonstrated what she's built.`;
          },
          choices:[
            {id:"after_dinner_planning",label:"Stay for after-dinner planning — the next feast",result:`After the alumni leave she stays at the table with you and the sorority students and talks about the next feast: bigger, more courses, more food. She eats what remains while she talks. The sorority students eat with her. The planning is extensive.`,lbs:8,rel:14,flag:"next_planned",feedOther:{archetype:"sorority",lbs:5,text:"Your sorority students eat through the after-dinner planning session. They go home heavier than they arrived."}},
            {id:"walk_out_alumna",label:"Walk the primary alumna out — cultivate the relationship",result:`You walk the 340-pound alumna to the door and she says: "I'd like to come back next month." You arrange it. The culture gains a powerful ally.`,rel:9},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("funder_met")&&h.includes("extra_course_alumni")&&h.includes("next_planned"),text:`Alumni dinner success. The funder said "I understand it now" and your hostess put more food in front of her. The sorority students went home heavier. The next feast is already planned. Her belly was warm and enormous and full and she was satisfied with everything she built.`,gainBonus:17,relBonus:15},
        {condition:h=>h.includes("funder_met")&&h.includes("extra_course_alumni"),text:`Alumni dinner success. The funder converted. The sorority students are heavier. The culture has been demonstrated to its patron.`,gainBonus:11,relBonus:10},
        {condition:h=>h.includes("funder_met"),text:`Alumni dinner. The funder met the hostess. The relationship is established.`,gainBonus:5,relBonus:7},
        {condition:()=>true,text:`Alumni dinner. Well-run. The table was extraordinary.`,gainBonus:0,relBonus:4},
      ]
    },
    // stage 8 — ~519 lbs
    {
      title:"Rush Season Opening Feast",
      phases:[
        {
          text:(h,s)=>`${Math.round(s.lbs)} pounds and rush season, which means the opening feast is the most important table she will set this year: this is what the incoming pledges will be told they're joining. She has been planning for three weeks. The table is the largest she has ever set. Your sorority students are here as the cultural anchor — both of them, well-established, noticeably heavier than when they started. She stands at the head of the table at ${Math.round(s.lbs)} pounds and her belly is vast and warm and real and she looks exactly like what she is.`,
          choices:[
            {id:"full_opening_spread",label:"Fund the opening spread fully — anything she wants",result:`You've told her: anything she wants for the opening feast. She has used this completely. The table is seventeen courses and the kitchen has been running for eight hours and she is 519 pounds of warmth and certainty at the head of it and the pledges who are about to arrive are going to understand something new about what they've joined.`,lbs:12,rel:9,flag:"full_funding"},
            {id:"brief_pledges",label:"Brief the incoming pledges before they arrive",result:`You meet the pledges at the door and give them context: this feast is the chapter's founding culture. The woman at the head of the table built it. They're being invited to participate in it. Several of them look at each other. None of them leave.`,rel:11,flag:"pledges_prepared"},
          ]
        },
        {
          text:(h)=>h.includes("full_funding")
            ?`Midway. The pledges are eating — tentatively at first, then with increasing conviction, as the culture of the table becomes clear. Your sorority students are modeling: eating steadily, warmly, without apology. Several pledges have gone back for seconds. Your hostess is at her fourth plate and her belly, enormous and warm, is a presence at the head of the table that communicates the standard.`
            :`Midway. The pledges are finding their rhythm. Your sorority students are modeling the culture. She presides and eats.`,
          choices:[
            {id:"push_pledges_further",label:"Fund additional courses specifically for the pledges",result:`You fund another two courses for the pledges specifically, timed for the mid-feast energy dip. The pledges eat. Several of them have stopped putting their forks down between bites. Your sorority students eat the extra courses too, with the ease of women who have been doing this for a year.`,rel:10,feedOther:{archetype:"sorority",lbs:7,text:"Your sorority students eat through the extra pledge courses with practiced ease. They are going to need to update their wardrobes."}},
            {id:"hostess_speech",label:"Ask her to say something to the pledges midway through",result:`You suggest it and she stands — 519 pounds, warm, vast, her belly enormous against her hostess clothes — and tells the pledges exactly what this table is: a culture, a commitment, a choice about what kind of life to build. Several pledges are visibly moved. Several are eating harder.`,lbs:8,rel:12,flag:"speech_given"},
          ]
        },
        {
          text:(h,s)=>{
            const full=h.includes("full_funding")&&h.includes("push_pledges_further");
            if(full) return `End of feast. The pledges are in various states of very full, warm contentment — several of them haven't moved in thirty minutes and look completely comfortable about this. Your sorority students are visibly heavier than when the feast started. She sits at the head of the table at ${Math.round(s.lbs)} pounds plus everything she's eaten tonight and surveys the room: the pledges, the sisters, the empty dishes. She is satisfied.`;
            return `End of feast. Table cleared. Pledges fed. The culture has been transmitted.`;
          },
          choices:[
            {id:"close_with_pledges",label:"Stay for the pledge close — hear her speak to them",result:`After the main feast clears she speaks to the pledges directly: what the chapter is, what she expects, what they've just participated in. She says her weight out loud — 519 pounds — and says: "I built this at every size. This is the culture." The pledges look at her with the expression of people who have just understood something important.`,rel:14,flag:"pledge_close"},
            {id:"leave_early_with_senior_sisters",label:"Leave with the senior sisters — let her close alone",result:`You leave with the senior group. She stays behind with the pledges and the sorority students to close the feast.`,rel:5},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("full_funding")&&h.includes("push_pledges_further")&&h.includes("pledge_close"),text:`Rush season opening feast. She said "519 pounds, I built this at every size" and the pledges understood. Your sorority students are heavier. The culture has been transmitted to the incoming class and it will persist.`,gainBonus:19,relBonus:16},
        {condition:h=>h.includes("full_funding")&&h.includes("push_pledges_further"),text:`Opening feast. Fully funded, pledges fed extra, sorority students heavier. The culture is transmitted.`,gainBonus:12,relBonus:11},
        {condition:h=>h.includes("full_funding"),text:`Opening feast. Full table. The pledges understand what they've joined.`,gainBonus:7,relBonus:7},
        {condition:()=>true,text:`Opening feast. Table cleared. Culture transmitted.`,gainBonus:0,relBonus:4},
      ]
    },
    // stage 9 — ~630 lbs
    {
      title:"Annual Grand Feast",
      phases:[
        {
          text:(h,s)=>`${Math.round(s.lbs)} pounds and the annual grand feast, which is the event the chapter now plans the entire year around. She has been in the kitchen since six in the morning. It is now six in the evening. The table is the most extraordinary thing she has ever set: twenty-three courses, warm and fragrant and prepared entirely by her. Your sorority students are here — both of them, deeply embedded in the culture, substantially heavier than when this started. The whole chapter is here.`,
          choices:[
            {id:"witness_setup",label:"Arrive early — watch her set the table",result:`You arrive at five and watch her work the final hour of preparation: the last courses, the table arrangement, the care she brings to each placement. She is 630 pounds moving through the chapter kitchen with total command. Her belly, vast and warm and apron-hanging, brushes the counter as she passes and she doesn't pause.`,lbs:8,rel:11,flag:"witnessed_setup"},
            {id:"full_supplemental",label:"Bring a supplemental feast — match her twenty-three with ten more",result:`You arrive with ten additional courses, high quality, warm. She looks at what you've brought and says: "Good." She incorporates all of it. The table becomes the largest any of them have ever seen.`,lbs:10,rel:9,flag:"supplemented"},
          ]
        },
        {
          text:(h,s)=>h.includes("supplemented")
            ?`Midway — thirty-three courses in, the chapter is eating with sustained, warm, pleasured focus. Your sorority students are on their seventh plates. Several sisters haven't left the table in two hours. She sits at the head of the table, ${Math.round(s.lbs)} pounds and everything she's eaten today, her belly warm and vast and enormously present, eating with the unhurried pleasure of someone who has built this and is now living in it.`
            :`Midway. Twenty-three courses, the chapter is eating steadily. Your sorority students are deep in it. She presides and eats.`,
          choices:[
            {id:"grand_feast_extra",label:"Fund additional courses for everyone at the midpoint",result:`You fund another round for the whole table at the midpoint. The chapter eats it. Your sorority students eat through it with the ease of women who have been training for this for two years. They are going to be significantly heavier.`,rel:11,feedOther:{archetype:"sorority",lbs:9,text:"Your sorority students eat through the grand feast extra round. They have been doing this for two years and it shows on their bodies and in the ease with which they keep eating."}},
            {id:"sit_at_head_with_her",label:"Sit beside her at the head of the table",result:`You take the seat beside her for the second half and she eats and you sit together and watch the table — the sisters eating, your sorority students deep in it — and she says: "I want to do this every year until I'm too large to stand at the stove." She means it as a goal.`,lbs:9,rel:13,flag:"together_at_head"},
          ]
        },
        {
          text:(h,s)=>{
            const full=h.includes("supplemented")&&h.includes("grand_feast_extra");
            if(full) return `End of the grand feast. The table is cleared. The chapter is in various states of very full, very warm contentment — several sisters have not moved in an hour and are completely satisfied about this. Your sorority students are the heaviest they have ever been and they are still at the table. She sits at the head — ${Math.round(s.lbs)} pounds, everything she's cooked, everything she's eaten today, her belly vast and warm and enormous against her hostess dress — and looks at the room. This is what she built.`;
            return `End of the grand feast. Table cleared. Chapter fed. The annual tradition is cemented.`;
          },
          choices:[
            {id:"last_plate_together",label:"Share the last plate with her — just you two",result:`After the chapter disperses you find the last plate she's saved and she puts it between you and you eat together in the empty chapter room and she says: "I'm going to be too large to cook this alone next year. I'll need help." She is asking you something. You understand what it is.`,rel:17,flag:"intimate_close"},
            {id:"chapter_close",label:"Stand at the door with her as the chapter leaves",result:`You stand beside her as the sisters file out, each one saying goodnight, each one heavier than they arrived, and she is 630 pounds of warmth in the doorway and she says goodnight to all of them personally and stays until the last one is gone.`,rel:8},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("supplemented")&&h.includes("grand_feast_extra")&&h.includes("intimate_close"),text:`Annual grand feast. She said she'll need help next year because she'll be too large to cook alone. Your sorority students are the heaviest they've ever been. The chapter is fed. She is 630 pounds and completely satisfied and she ate the last plate with you in the empty chapter room.`,gainBonus:22,relBonus:18},
        {condition:h=>h.includes("supplemented")&&h.includes("grand_feast_extra"),text:`Annual grand feast. Thirty-three courses, the whole chapter fed, your sorority students are significantly heavier. The tradition is cemented.`,gainBonus:14,relBonus:13},
        {condition:h=>h.includes("supplemented"),text:`Grand feast. The supplemental courses were right. The chapter ate extraordinarily.`,gainBonus:8,relBonus:8},
        {condition:()=>true,text:`Annual grand feast. Twenty-three courses. Table cleared. Culture intact.`,gainBonus:0,relBonus:5},
      ]
    },
  ],
};

const EVOLVED_FORM_META = {
  sumo:                 { title:"Sumo Wrestler",        color:"#c0392b" },
  eating_competitor:    { title:"Circuit Competitor",   color:"#e67e22" },
  feedee_creator:       { title:"Feedee Creator",       color:"#8e44ad" },
  body_positive_creator:{ title:"Body Positive Creator",color:"#27ae60" },
  eating_captain:       { title:"Eating Captain",       color:"#2980b9" },
  big_squad_captain:    { title:"Squad Reformation",    color:"#16a085" },
  eating_diarist:       { title:"Eating Diarist",       color:"#9b59b6" },
  food_researcher:      { title:"Food Researcher",      color:"#2c3e50" },
  eating_streamer:      { title:"Eating Streamer",      color:"#e74c3c" },
  speed_eater:          { title:"Speed Eater",          color:"#d35400" },
  chapter_hostess:      { title:"Chapter Hostess",      color:"#6c3483" },
  body_positive_greek:  { title:"Greek Pioneer",        color:"#1abc9c" },
  metrics_eater:        { title:"Metrics Obsessive",    color:"#3498db" },
  food_scientist:       { title:"Food Scientist",       color:"#2471a3" },
  installation_artist:  { title:"Installation Artist",  color:"#f39c12" },
  food_photographer:    { title:"Food Photographer",    color:"#ca6f1e" },
  anonymous_blogger:    { title:"Anonymous Blogger",    color:"#5d6d7e" },
  asmr_creator:         { title:"ASMR Creator",         color:"#7d3c98" },
  campus_legend:        { title:"Campus Legend",        color:"#b7950b" },
  food_tourist:         { title:"Food Tourist",         color:"#148f77" },
  ff_author:            { title:"FF Author",            color:"#922b21" },
};

const EVOLUTION_BUTTON_BLURB = {
  athlete:(s)=>`You see her in the gym doorway on a Tuesday afternoon, not working out — just standing there looking at the equipment that used to be hers. The pull-up bar. The bench press. None of it fits anymore, not really. She has more mass now than the sport knows what to do with. Her jaw is set, the way it gets when she's about to solve something. You watch her and think: she's still competitive. She just needs a new arena.`,
  influencer:(s)=>`You walk past her on the quad and she doesn't notice you. She's filming herself on her phone — mouth open to say something, then stopping, deleting, starting again. The angle that used to work doesn't work now. She's bigger, softer, undeniable in ways her old content pretended weren't happening. She deletes the clip again. She doesn't look upset. She looks like someone who knows the answer is somewhere and hasn't found the framing yet. You think you might have an idea.`,
  cheerleader:(s)=>`You stop by the gym during practice. ${s.name} is standing at the edge of the mat in her old uniform — or most of it, the waist seam split, the fabric at her thighs taut past bearing — watching the squad run through a routine she used to lead. She's not sad about it. The crowd at the open practice is still watching her. Some of them more than they're watching the performance. She's still the most present person in the room. You think about where that kind of presence could go.`,
  bookworm:(s)=>`You find her in the late stacks at the library, long after the undergrads have gone. There's a notebook open on the table beside her laptop and a half-eaten sandwich she's forgotten about. When she hears you she closes the notebook with a firmness that suggests you just missed something. She doesn't look guilty. She looks like someone managing information carefully. You've seen that look before, when she had a thesis draft she wasn't ready to show. You wonder what she's writing.`,
  gamer:(s)=>`You glance through her open door without meaning to. She's at her setup, the screen glowing, a game paused mid-level. She's eating — slowly, automatically, the bag of chips just there and going down without her noticing — and she's not looking at the game. She's looking at something on the second monitor, reading something. The room is warm and soft with the ambient light and her presence in it, her body filling the chair, comfortable in a way that suggests the chair has been arranged around her. You think about what she could do with this setup.`,
  sorority:(s)=>`You walk past the chapter room during a meeting. The door is open. ${s.name} is technically not running things — she graduated from the formal role two months ago — but the room is still orienting itself around her. When she speaks, people write things down. When she pauses, people wait. She's larger now than when she held the title and somehow that makes it more true, not less. After the meeting empties you catch her in the hallway. She looks like someone with a plan that doesn't have a name yet.`,
  overachiever:(s)=>`You find her planner left open on a library table while she's in the bathroom. You don't mean to read it. The weight gain is charted in a color-coded column alongside her GPA, her sleep, her caloric intake. She is tracking this the way she tracks everything. The numbers are precise and the trend is unmistakable and the color she's chosen for that column is gold. Not warning-red. Gold. You close the planner and wait. When she comes back she sees you saw it and just nods, once, like: yes, that's accurate, what are we going to do with it.`,
  artsy:(s)=>`You stop by her studio during open hours. The new work is on the wall — three large canvases, all featuring generous female figures. They're not abstractions. They're specific. The lines are loving, the weight is warm, the bodies are real and present and unapologetic. She's standing in front of the largest one with her head tilted, deciding something. She doesn't explain the shift in subject matter when you ask. She says: 'It's what I want to look at.' She says this the way someone says something that is also about themselves. You think about what a larger project might look like.`,
  quiet:(s)=>`You see her at the campus coffee shop on a Thursday morning, alone at a corner table with her laptop. She's typing quickly, absorbed, the kind of focus she reserves for things that matter. When she looks up and sees you she closes the laptop with one smooth motion, not alarmed but deliberate, and smiles. There's something behind the smile that isn't embarrassment — more like being caught in the middle of something private that hasn't been decided as a secret yet. You think about what she might be writing. You think you might have a better idea of what to do with it than she does.`,
  transfer:(s)=>`You pass through the dining hall mid-afternoon and the staff behind the counter lights up when ${s.name} walks in behind you. They know her name. They have her order started before she reaches the counter. There's a booth in the corner that other students seem to drift away from, not consciously, just leaving it available in the particular way that space gets left for something or someone that belongs in it. She settles into it and the room adjusts slightly. You watch from across the hall and think: she's become part of this place faster than anyone else ever has.`,
};

const EVOLVED_SKILL_TREES = {
  sumo:[
    { id:"sumo_stance",   tier:1, label:"Match Stance",      cost:20, desc:"Her bouts end 20% faster. Activity gives +2 extra lbs.",                    activityGainBonus:2 },
    { id:"sumo_crowd",    tier:2, label:"Crowd Draw",         cost:40, desc:"Each activity viewing gives +3 extra relationship.",                         activityRelBonus:3 },
    { id:"sumo_rep",      tier:3, label:"Circuit Reputation", cost:70, desc:"Her weekly passive gain +1 lbs/week from the training lifestyle.",            passiveBonus:1 },
    { id:"sumo_record",   tier:4, label:"Regional Record",    cost:110, desc:"Once per game: activity costs 0 AP (auto-resets after 8 weeks).",            freeActivityCharge:1 },
    { id:"sumo_legend",   tier:5, label:"Ring Legend",        cost:160, desc:"+3 passive lbs/week. Activity give +5 extra lbs. Her weight spreads awe.",   passiveBonus:3, activityGainBonus:5 },
  ],
  eating_competitor:[
    { id:"ec_timer",      tier:1, label:"Timer Sense",        cost:20, desc:"Activity gives +3 extra lbs from the competitive eating.",                   activityGainBonus:3 },
    { id:"ec_circuit",    tier:2, label:"Circuit Regular",    cost:40, desc:"+1 passive lbs/week — the circuit lifestyle keeps her eating.",               passiveBonus:1 },
    { id:"ec_record",     tier:3, label:"Record Holder",      cost:70, desc:"+3 relationship per activity viewing. Crowds follow her.",                   activityRelBonus:3 },
    { id:"ec_sponsor",    tier:4, label:"Sponsorship Deal",   cost:110, desc:"Scrutiny -2/week. Sponsors make her eating look legitimate.",               weeklyScrutinyReduce:2 },
    { id:"ec_legend",     tier:5, label:"Eating Legend",      cost:160, desc:"+2 passive, +4 activity lbs, +4 activity rel. A record-breaking presence.", passiveBonus:2, activityGainBonus:4, activityRelBonus:4 },
  ],
  feedee_creator:[
    { id:"fc_upload",     tier:1, label:"Upload Schedule",    cost:20, desc:"+1 passive lbs/week from the content routine.",                              passiveBonus:1 },
    { id:"fc_subs",       tier:2, label:"Subscriber Base",    cost:40, desc:"Activity gives +4 extra relationship — they love her.",                       activityRelBonus:4 },
    { id:"fc_viral",      tier:3, label:"Viral Moment",       cost:70, desc:"Once per 10 weeks: activity gives double lbs. Auto-tracks cooldown.",         doubleActivityCharge:1 },
    { id:"fc_brand",      tier:4, label:"Brand Deals",        cost:110, desc:"Scrutiny -3/week. The corporate legitimacy covers everything.",              weeklyScrutinyReduce:3 },
    { id:"fc_empire",     tier:5, label:"Content Empire",     cost:160, desc:"+2 passive, +5 rel per activity, scrutiny -2/week. She is a brand.",         passiveBonus:2, activityRelBonus:5, weeklyScrutinyReduce:2 },
  ],
  body_positive_creator:[
    { id:"bpc_rebrand",   tier:1, label:"The Rebrand",        cost:20, desc:"Scrutiny -2/week. Mainstream acceptance changes the calculus.",               weeklyScrutinyReduce:2 },
    { id:"bpc_brand",     tier:2, label:"Brand Deals",        cost:40, desc:"+1 passive lbs/week. The content keeps her eating.",                         passiveBonus:1 },
    { id:"bpc_viral",     tier:3, label:"Viral Platform",     cost:70, desc:"+4 relationship per activity viewing.",                                       activityRelBonus:4 },
    { id:"bpc_ted",       tier:4, label:"Cultural Figure",    cost:110, desc:"Scrutiny -4/week. She's a public figure. Admin hesitates.",                  weeklyScrutinyReduce:4 },
    { id:"bpc_legacy",    tier:5, label:"Legacy Platform",    cost:160, desc:"+2 passive, +5 rel/activity, scrutiny -3/week. She's the argument.",         passiveBonus:2, activityRelBonus:5, weeklyScrutinyReduce:3 },
  ],
  eating_captain:[
    { id:"cap_drill",     tier:1, label:"Team Drill",         cost:20, desc:"Activity gives +3 extra lbs. The team training feeds back.",                 activityGainBonus:3 },
    { id:"cap_squad",     tier:2, label:"Committed Squad",    cost:40, desc:"+1 passive lbs/week from the training culture.",                             passiveBonus:1 },
    { id:"cap_trophy",    tier:3, label:"Trophy Run",         cost:70, desc:"+3 relationship per activity viewing.",                                       activityRelBonus:3 },
    { id:"cap_national",  tier:4, label:"National Invite",    cost:110, desc:"Scrutiny -2/week. The legitimate competition covers everything.",             weeklyScrutinyReduce:2 },
    { id:"cap_dynasty",   tier:5, label:"Eating Dynasty",     cost:160, desc:"+2 passive, +4 lbs/activity, +4 rel/activity. A permanent institution.",    passiveBonus:2, activityGainBonus:4, activityRelBonus:4 },
  ],
  big_squad_captain:[
    { id:"bsc_culture",   tier:1, label:"Culture Shift",      cost:20, desc:"Scrutiny -2/week. The body-positive framing changes admin's read.",           weeklyScrutinyReduce:2 },
    { id:"bsc_pledges",   tier:2, label:"Pledge Class",       cost:40, desc:"+1 passive lbs/week. New sisters join the chapter's culture.",               passiveBonus:1 },
    { id:"bsc_press",     tier:3, label:"National Press",     cost:70, desc:"+5 relationship per activity viewing. She's a public figure.",               activityRelBonus:5 },
    { id:"bsc_policy",    tier:4, label:"Policy Change",      cost:110, desc:"Scrutiny -5/week. The national org is on board.",                           weeklyScrutinyReduce:5 },
    { id:"bsc_permanent", tier:5, label:"Permanent Culture",  cost:160, desc:"+2 passive, +6 rel/activity, scrutiny -3/week. The chapter carries on.",    passiveBonus:2, activityRelBonus:6, weeklyScrutinyReduce:3 },
  ],
  eating_diarist:[
    { id:"ed_newsletter", tier:1, label:"Newsletter",         cost:20, desc:"+1 passive lbs/week from the writing + eating routine.",                     passiveBonus:1 },
    { id:"ed_agent",      tier:2, label:"Literary Agent",     cost:40, desc:"+4 relationship per activity viewing.",                                       activityRelBonus:4 },
    { id:"ed_book",       tier:3, label:"Book Deal",          cost:70, desc:"Scrutiny -3/week. She's a published author. Admin is careful with authors.", weeklyScrutinyReduce:3 },
    { id:"ed_reviews",    tier:4, label:"Critical Acclaim",   cost:110, desc:"+2 passive lbs/week. The writing legitimizes everything.",                  passiveBonus:2 },
    { id:"ed_canon",      tier:5, label:"Canonical Text",     cost:160, desc:"+3 passive, +5 rel/activity, scrutiny -2/week. She's in the curriculum.",   passiveBonus:3, activityRelBonus:5, weeklyScrutinyReduce:2 },
  ],
  food_researcher:[
    { id:"fr_irb",        tier:1, label:"IRB Approval",       cost:20, desc:"Scrutiny -3/week. Institutional backing is powerful cover.",                 weeklyScrutinyReduce:3 },
    { id:"fr_lab",        tier:2, label:"Lab Access",         cost:40, desc:"+1 passive lbs/week. The study requires consistent intake.",                 passiveBonus:1 },
    { id:"fr_published",  tier:3, label:"Published",          cost:70, desc:"+4 relationship per activity. Academic recognition bonds.",                   activityRelBonus:4 },
    { id:"fr_grant",      tier:4, label:"Grant Funding",      cost:110, desc:"Scrutiny -4/week. Grants convert skeptics.",                                weeklyScrutinyReduce:4 },
    { id:"fr_keynote",    tier:5, label:"Keynote Speaker",    cost:160, desc:"+2 passive, +5 rel/activity, scrutiny -4/week. She IS the research.",        passiveBonus:2, activityRelBonus:5, weeklyScrutinyReduce:4 },
  ],
  eating_streamer:[
    { id:"es_setup",      tier:1, label:"Full Setup",         cost:20, desc:"Activity gives +3 extra lbs. The fridge is always stocked.",                 activityGainBonus:3 },
    { id:"es_community",  tier:2, label:"Stream Community",   cost:40, desc:"+4 relationship per activity viewing.",                                       activityRelBonus:4 },
    { id:"es_viral",      tier:3, label:"Viral Clip",         cost:70, desc:"+1 passive lbs/week. The algorithm feeds her content and her.",               passiveBonus:1 },
    { id:"es_platform",   tier:4, label:"Platform Feature",   cost:110, desc:"Scrutiny -2/week. Platform backing changes the conversation.",               weeklyScrutinyReduce:2 },
    { id:"es_legend",     tier:5, label:"Streaming Legend",   cost:160, desc:"+2 passive, +5 lbs/activity, +4 rel/activity. Iconic.",                     passiveBonus:2, activityGainBonus:5, activityRelBonus:4 },
  ],
  speed_eater:[
    { id:"se_timer",      tier:1, label:"Timer Sense",        cost:20, desc:"Activity gives +4 extra lbs. The records come with mass.",                   activityGainBonus:4 },
    { id:"se_record",     tier:2, label:"Record Breaker",     cost:40, desc:"+3 relationship per activity viewing.",                                       activityRelBonus:3 },
    { id:"se_crossover",  tier:3, label:"Cross-Discipline",   cost:70, desc:"+1 passive lbs/week. Two communities, twice the lifestyle.",                  passiveBonus:1 },
    { id:"se_national",   tier:4, label:"National Recognition",cost:110,desc:"Scrutiny -2/week. National status is a shield.",                             weeklyScrutinyReduce:2 },
    { id:"se_legend",     tier:5, label:"Record Legend",      cost:160, desc:"+2 passive, +6 lbs/activity, +3 rel/activity. Unprecedented.",              passiveBonus:2, activityGainBonus:6, activityRelBonus:3 },
  ],
  chapter_hostess:[
    { id:"ch_menu",       tier:1, label:"The Menu",           cost:20, desc:"Activity gives +5 extra lbs. Wednesday feasts are serious.",                 activityGainBonus:5 },
    { id:"ch_tradition",  tier:2, label:"Feast Tradition",    cost:40, desc:"+1 passive lbs/week from the Wednesday routine.",                            passiveBonus:1 },
    { id:"ch_alumni",     tier:3, label:"Alumni Funding",     cost:70, desc:"+4 relationship per activity. She's a chapter institution.",                 activityRelBonus:4 },
    { id:"ch_reputation", tier:4, label:"Chapter Reputation", cost:110, desc:"Scrutiny -3/week. The chapter is well-regarded. Admin is careful.",         weeklyScrutinyReduce:3 },
    { id:"ch_legacy",     tier:5, label:"Feast Legacy",       cost:160, desc:"+2 passive, +7 lbs/activity, +4 rel/activity. The feast is permanent.",     passiveBonus:2, activityGainBonus:7, activityRelBonus:4 },
  ],
  body_positive_greek:[
    { id:"bpg_proposal",  tier:1, label:"The Proposal",       cost:20, desc:"Scrutiny -3/week. The progressive framing resets admin's assumptions.",       weeklyScrutinyReduce:3 },
    { id:"bpg_pledges",   tier:2, label:"Pledge Class",       cost:40, desc:"+1 passive lbs/week. The chapter attracts the right people.",                passiveBonus:1 },
    { id:"bpg_press",     tier:3, label:"National Press",     cost:70, desc:"+5 relationship per activity. She's a figure, not just a captain.",           activityRelBonus:5 },
    { id:"bpg_policy",    tier:4, label:"Policy Change",      cost:110, desc:"Scrutiny -5/week. The national org has publicly aligned.",                  weeklyScrutinyReduce:5 },
    { id:"bpg_permanent", tier:5, label:"Permanent Change",   cost:160, desc:"+2 passive, +6 rel/activity, scrutiny -4/week. Legacy secured.",            passiveBonus:2, activityRelBonus:6, weeklyScrutinyReduce:4 },
  ],
  metrics_eater:[
    { id:"me_sheet",      tier:1, label:"The Spreadsheet",    cost:20, desc:"Activity gives +3 extra lbs. The data tracks the gains.",                    activityGainBonus:3 },
    { id:"me_optimize",   tier:2, label:"Optimized Windows",  cost:40, desc:"+1 passive lbs/week. Three windows, maximum efficiency.",                    passiveBonus:1 },
    { id:"me_record",     tier:3, label:"Personal Record",    cost:70, desc:"+3 relationship per activity. The records impress.",                         activityRelBonus:3 },
    { id:"me_cited",      tier:4, label:"Cited Methodology",  cost:110, desc:"Scrutiny -2/week. Academic legitimacy from the documentation.",              weeklyScrutinyReduce:2 },
    { id:"me_legend",     tier:5, label:"Data Legend",        cost:160, desc:"+2 passive, +5 lbs/activity, +4 rel/activity. The numbers are extraordinary.",passiveBonus:2, activityGainBonus:5, activityRelBonus:4 },
  ],
  food_scientist:[
    { id:"fs_irb",        tier:1, label:"IRB Approval",       cost:20, desc:"Scrutiny -3/week. Institutional cover is the strongest shield.",              weeklyScrutinyReduce:3 },
    { id:"fs_lab",        tier:2, label:"Lab Access",         cost:40, desc:"+1 passive lbs/week. The study protocol requires it.",                       passiveBonus:1 },
    { id:"fs_published",  tier:3, label:"First Publication",  cost:70, desc:"+4 relationship per activity. Academic bond deepens.",                       activityRelBonus:4 },
    { id:"fs_cited",      tier:4, label:"Cited Research",     cost:110, desc:"Scrutiny -4/week. Prestigious citations change the conversation.",           weeklyScrutinyReduce:4 },
    { id:"fs_keynote",    tier:5, label:"Keynote",            cost:160, desc:"+2 passive, +5 rel/activity, scrutiny -4/week. The experiment is complete.", passiveBonus:2, activityRelBonus:5, weeklyScrutinyReduce:4 },
  ],
  installation_artist:[
    { id:"ia_first",      tier:1, label:"First Installation", cost:20, desc:"+4 relationship per activity viewing.",                                       activityRelBonus:4 },
    { id:"ia_gallery",    tier:2, label:"Gallery Interest",   cost:40, desc:"Scrutiny -2/week. Art legitimizes everything.",                               weeklyScrutinyReduce:2 },
    { id:"ia_review",     tier:3, label:"Major Review",       cost:70, desc:"+1 passive lbs/week. The artist's process is continuous.",                   passiveBonus:1 },
    { id:"ia_exhibition", tier:4, label:"Major Exhibition",   cost:110, desc:"Scrutiny -4/week. She's a recognized artist. Admin is careful.",            weeklyScrutinyReduce:4 },
    { id:"ia_retro",      tier:5, label:"Retrospective",      cost:160, desc:"+2 passive, +6 rel/activity, scrutiny -3/week. She is the piece.",           passiveBonus:2, activityRelBonus:6, weeklyScrutinyReduce:3 },
  ],
  food_photographer:[
    { id:"fp_shoot",      tier:1, label:"First Shoot",        cost:20, desc:"+4 relationship per activity viewing.",                                       activityRelBonus:4 },
    { id:"fp_gallery",    tier:2, label:"Gallery Show",       cost:40, desc:"Scrutiny -2/week. The gallery changes her status.",                           weeklyScrutinyReduce:2 },
    { id:"fp_book",       tier:3, label:"Book Deal",          cost:70, desc:"+1 passive lbs/week. The project is continuous.",                            passiveBonus:1 },
    { id:"fp_collector",  tier:4, label:"Collector Interest", cost:110, desc:"Scrutiny -3/week. Serious collectors are serious cover.",                   weeklyScrutinyReduce:3 },
    { id:"fp_permanent",  tier:5, label:"Permanent Collection",cost:160,desc:"+2 passive, +5 rel/activity, scrutiny -4/week. Museum-grade.",              passiveBonus:2, activityRelBonus:5, weeklyScrutinyReduce:4 },
  ],
  anonymous_blogger:[
    { id:"ab_post",       tier:1, label:"First Post",         cost:20, desc:"+4 relationship per activity viewing.",                                       activityRelBonus:4 },
    { id:"ab_following",  tier:2, label:"Growing Following",  cost:40, desc:"+1 passive lbs/week. The routine of posting keeps her going.",              passiveBonus:1 },
    { id:"ab_viral",      tier:3, label:"Viral Post",         cost:70, desc:"Scrutiny -2/week. The anonymity deflects attention elsewhere.",               weeklyScrutinyReduce:2 },
    { id:"ab_journalist", tier:4, label:"Journalist Interest",cost:110, desc:"Scrutiny -3/week. The press attention is on the blog, not her.",            weeklyScrutinyReduce:3 },
    { id:"ab_phenomenon", tier:5, label:"Cultural Phenomenon",cost:160, desc:"+2 passive, +5 rel/activity, scrutiny -3/week. Anonymous legend.",          passiveBonus:2, activityRelBonus:5, weeklyScrutinyReduce:3 },
  ],
  asmr_creator:[
    { id:"ac_first",      tier:1, label:"First Video",        cost:20, desc:"+5 relationship per activity viewing.",                                       activityRelBonus:5 },
    { id:"ac_community",  tier:2, label:"Loyal Community",    cost:40, desc:"+1 passive lbs/week. The ritual feeds her too.",                             passiveBonus:1 },
    { id:"ac_algorithm",  tier:3, label:"Algorithm Finds Her",cost:70, desc:"Scrutiny -2/week. Cozy content attracts no scrutiny.",                       weeklyScrutinyReduce:2 },
    { id:"ac_mainstream", tier:4, label:"Mainstream Crossover",cost:110,desc:"Scrutiny -3/week. Everyone knows her and nobody finds her threatening.",    weeklyScrutinyReduce:3 },
    { id:"ac_comfort",    tier:5, label:"Comfort Ritual",     cost:160, desc:"+2 passive, +6 rel/activity, scrutiny -3/week. A therapeutic presence.",   passiveBonus:2, activityRelBonus:6, weeklyScrutinyReduce:3 },
  ],
  campus_legend:[
    { id:"cl_booth",      tier:1, label:"The Booth",          cost:20, desc:"Activity gives +5 extra lbs. The booth feasts are real.",                    activityGainBonus:5 },
    { id:"cl_stories",    tier:2, label:"The Stories",        cost:40, desc:"+4 relationship per activity viewing.",                                       activityRelBonus:4 },
    { id:"cl_plaque",     tier:3, label:"Brass Plaque",       cost:70, desc:"+1 passive lbs/week. The legend maintains itself.",                          passiveBonus:1 },
    { id:"cl_myth",       tier:4, label:"Campus Mythology",   cost:110, desc:"Scrutiny -3/week. Legends don't get written up.",                           weeklyScrutinyReduce:3 },
    { id:"cl_place",      tier:5, label:"She IS the Campus",  cost:160, desc:"+2 passive, +7 lbs/activity, +4 rel/activity. Permanent institution.",      passiveBonus:2, activityGainBonus:7, activityRelBonus:4 },
  ],
  food_tourist:[
    { id:"ft_map",        tier:1, label:"The Map",            cost:20, desc:"Activity gives +4 extra lbs. Every expedition is serious.",                  activityGainBonus:4 },
    { id:"ft_blog",       tier:2, label:"The Blog",           cost:40, desc:"+4 relationship per activity viewing.",                                       activityRelBonus:4 },
    { id:"ft_homepress",  tier:3, label:"Home Country Press", cost:70, desc:"Scrutiny -2/week. International profile changes things.",                    weeklyScrutinyReduce:2 },
    { id:"ft_bookdeal",   tier:4, label:"Two Book Deals",     cost:110, desc:"+1 passive lbs/week. The project is her life.",                             passiveBonus:1 },
    { id:"ft_ambassador", tier:5, label:"Cultural Ambassador",cost:160, desc:"+2 passive, +6 lbs/activity, +4 rel/activity. Both places, one person.",   passiveBonus:2, activityGainBonus:6, activityRelBonus:4 },
  ],
  ff_author:[
    { id:"ffa_draft",     tier:1, label:"First Draft",        cost:20, desc:"+5 relationship per activity viewing. She values your opinion.",             activityRelBonus:5 },
    { id:"ffa_following", tier:2, label:"Growing Readership", cost:40, desc:"+1 passive lbs/week. The writing routine and the eating are inseparable.",   passiveBonus:1 },
    { id:"ffa_pseudonym", tier:3, label:"The Pseudonym",      cost:70, desc:"Scrutiny -3/week. Nobody can prove the blog is hers.",                      weeklyScrutinyReduce:3 },
    { id:"ffa_viral",     tier:4, label:"Viral Chapter",      cost:110, desc:"+2 passive lbs/week. The chapter that went everywhere keeps her writing.", passiveBonus:2 },
    { id:"ffa_canon",     tier:5, label:"Canonical Work",     cost:160, desc:"+3 passive, +6 rel/activity, scrutiny -2/week. Her work defines the genre.",passiveBonus:3, activityRelBonus:6, weeklyScrutinyReduce:2 },
  ],
};

const EVOLUTION_OFFER = {
  athlete:{
    intro:(s)=>`${s.name} catches you after class. She's been thinking about what comes next — the weight she's carrying is real, undeniable, and the old sport doesn't fit anymore. But she's competitive in a way that doesn't turn off. She wants to do something with this body. She just needs a direction.`,
    paths:{
      sumo:    { label:"The Sumo Path",        desc:"Channel her athletic drive into sumo wrestling. The ring awaits. So does the crowd." },
      eating_competitor:{ label:"The Circuit", desc:"Competitive eating circuits. Timers, records, a legitimate sport for exactly this body." },
    },
  },
  influencer:{
    intro:(s)=>`${s.name} puts her phone down — which you've never actually seen her do — and looks at you. 'The fitness content isn't landing anymore,' she says. 'My audience can see what's happening. I need a new angle. Two options.' She pulls her phone back out and shows you two draft pitches.`,
    paths:{
      feedee_creator:       { label:"Feedee Channel",         desc:"A niche, dedicated content brand built around exactly what's happening to her." },
      body_positive_creator:{ label:"Body Positive Platform", desc:"Mainstream crossover: brand deals, TEDx, a cultural argument she can win." },
    },
  },
  cheerleader:{
    intro:(s)=>`${s.name} arrives with her captain's sash still on, slightly breathless. She's been thinking. The squad has a future. She has a body. The two things can be connected, but not in the old way. What's the new way?`,
    paths:{
      eating_captain:  { label:"Competitive Eating Captain", desc:"Rebrand the squad around competitive eating. Tournament structure, real competition, glory." },
      big_squad_captain:{ label:"Body Positive Captain",     desc:"Change the squad's culture from the top. No more weigh-ins. A new kind of power." },
    },
  },
  bookworm:{
    intro:(s)=>`${s.name} slides a folder across the table. Inside: two things. One is a newsletter outline. The other is a printed manuscript — she printed it, which means she wants you to hold it — and the cover page has a pseudonym on it that is not her name. She doesn't explain either document. She just looks at you and waits.`,
    paths:{
      eating_diarist: { label:"The Diarist",  desc:"A newsletter, then a book. Her transformation as literature. Intimate, honest, under her own name — eventually." },
      ff_author:      { label:"The Author",   desc:"Fanfiction, fat fetish fiction, stories about women who look exactly like the people in her life. Under a pseudonym. For now." },
    },
  },
  gamer:{
    intro:(s)=>`${s.name} swivels her chair toward you mid-session, something she never does. The game is still running. 'I've been thinking about what to do with this,' she says, indicating herself with one hand while the other keeps moving on the controller. 'And I have two ideas. Both involve this setup.' She gestures at the room.`,
    paths:{
      eating_streamer:{ label:"Eating Streamer", desc:"Gaming + mukbang content. The crossover is real and the audience is waiting." },
      speed_eater:    { label:"Speed Eater",     desc:"Competitive eating with the same optimizer's brain. Records. Timers. That leaderboard mentality applied to food." },
    },
  },
  sorority:{
    intro:(s)=>`${s.name} closes the chapter meeting early and waits until everyone else has left. Then she turns to you. 'I've been thinking about what this chapter could be,' she says. 'And I think it's one of two things.' She pours two glasses of wine. The conversation is going to take a while.`,
    paths:{
      chapter_hostess:     { label:"The Hostess",              desc:"Wednesday feast nights. A culture of abundance. She feeds the chapter and the chapter grows." },
      body_positive_greek: { label:"Body Positive Greek Life", desc:"End the weigh-ins. Change the culture. A permanent shift in what a sorority can be." },
    },
  },
  overachiever:{
    intro:(s)=>`${s.name} arrives with a color-coded presentation. Two options, two methodologies, both rigorous. She presents both in six minutes and then sits down and looks at you. 'I've decided this body is a project,' she says. 'The question is which kind.' She waits for your input.`,
    paths:{
      metrics_eater:  { label:"Metrics Obsessed", desc:"Data-driven eating as a discipline. Spreadsheets, records, optimization. The overachiever applied to appetite." },
      food_scientist: { label:"Food Scientist",   desc:"IRB-approved self-study. Academic frame, institutional backing, a career built around the research." },
    },
  },
  artsy:{
    intro:(s)=>`${s.name} comes in late carrying a portfolio and sits down without speaking for thirty seconds. Then: 'I've been thinking about what the work is about now.' She opens the portfolio: two sets of sketches. Two directions. Both use this body as the primary material.`,
    paths:{
      installation_artist:{ label:"Installation Artist",   desc:"Document the transformation as art. Galleries, reviews, a retrospective of a body in progress." },
      food_photographer:  { label:"Food Photographer",     desc:"Aesthetic eating as visual art. Shoots, gallery shows, museum collections." },
    },
  },
  quiet:{
    intro:(s)=>`${s.name} leaves a note on your desk. Not a spoken conversation — a note, slipped under the door sometime before anyone else arrived. Inside: two links and a short paragraph. 'I've been thinking,' the paragraph says, 'about what to do with the fact that I'm different now. Here are two ideas. You don't have to respond immediately.'`,
    paths:{
      anonymous_blogger:{ label:"Anonymous Blogger", desc:"A secret identity, a public record. Nobody knows who she is. The work speaks for itself." },
      asmr_creator:     { label:"ASMR Creator",      desc:"Quiet, careful, therapeutic eating content. The perfect format for the person she's always been." },
    },
  },
  transfer:{
    intro:(s)=>`${s.name} sits across from you with the expression of someone who has figured something out. 'I've been here long enough to know this place,' she says. 'And I've been eating long enough to have something to say about it. Two options.' She slides two napkins across the table, each one with an idea scrawled on it.`,
    paths:{
      campus_legend: { label:"Campus Legend",   desc:"Become mythology. The dining hall, the booth, the stories incoming students hear about her before they arrive." },
      food_tourist:  { label:"Food Tourist",    desc:"Document every cuisine available to her. A blog, a book deal, a cultural bridge between here and home." },
    },
  },
};

const ASCENSION_BRIDGE = {
  sumo:             (s)=>`${s.name} sets the championship belt down on the table — slowly, carefully, the way you set down something that's been held a long time. She looks at her hands. 'The ring gave me a reason,' she says. 'But reasons run out eventually. This doesn't.' She touches her own mass, slowly, the way you touch something that belongs to you completely. 'I think the goddess needs more than a wrestler.'`,
  eating_competitor:(s)=>`${s.name} closes the record notebook — the one with four years of times and weights and personal bests — and sits with it in her hands for a long moment. 'I've run out of records to break,' she says. 'Every number is gone. There's nothing left to beat. Except the whole concept of a limit.' She looks up. 'I think it's time.'`,
  feedee_creator:   (s)=>`${s.name} closes her laptop, the analytics still glowing on the screen behind her. 'The channel is done,' she says. Not sad — matter-of-fact. 'I made it. I outgrew it. What I'm becoming now doesn't fit in a format.' She's very still. 'The goddess has been watching for a while. I can feel it.'`,
  body_positive_creator:(s)=>`${s.name} puts her phone away — the way she does when a conversation matters — and looks at you. 'I've said everything the platform could hold,' she says. 'The argument is won. The body is beyond argument now.' She's quiet for a moment. 'Something else is starting.'`,
  eating_captain:   (s)=>`${s.name} hangs the captain's sash on the back of the chair with the deliberateness of someone who won't need it again. 'The squad is good,' she says. 'The records stand. The culture is set.' She looks at her hands. 'I was a captain. I think now I'm something else.' She waits for you to understand. You do.`,
  big_squad_captain:(s)=>`${s.name} sits down slowly, the weight of everything she's built evident in the way she holds herself. 'The culture is permanent,' she says. 'The change is done. The chapter runs itself.' She looks out the window. 'I keep feeling like there's something on the other side of all this. Something bigger than a squad.' She looks at you. 'Is it time?'`,
  eating_diarist:   (s)=>`${s.name} closes the notebook — the original one, the one from before the newsletter, before the agent, before the book. She holds it in both hands. 'The writing documented me,' she says. 'Now I've grown past what writing can hold.' She's quiet. 'Whatever comes next, I don't think it fits in a sentence.' A long pause. 'I think it fits in a goddess.'`,
  food_researcher:  (s)=>`${s.name} prints the final page of the dataset — the last measurement, the last data point — and holds it for a moment. 'The study is complete,' she says. 'All variables accounted for except one.' She looks at you. 'The study never accounted for what happens when the subject exceeds the study's capacity to describe her.' A smile. 'I think we're there.'`,
  eating_streamer:  (s)=>`${s.name} turns the camera off — properly off, not just paused — and sits in the sudden silence. 'I've been streaming for years,' she says. 'I've eaten everything on camera. The audience has watched every pound.' She looks at her hands. 'But there's something that can't be streamed. Something that needs to happen in private.' She looks at you. 'I think this is it.'`,
  speed_eater:      (s)=>`${s.name} opens the notebook to the last page and looks at the final record for a long time. 'Every number is broken,' she says. 'Every record is mine. There's no more room to be faster or bigger or more.' She closes the notebook. 'Except there is more. There's the thing that comes after records. The thing the timer doesn't measure.' She looks up. 'I think I've always been heading there.'`,
  chapter_hostess:  (s)=>`${s.name} folds the last menu — the one from Wednesday's feast — and sets it on the table beside the others. 'The table is set,' she says. 'The chapter eats well. It will continue to eat well after I'm gone.' She looks at her hands, then at you. 'I've been feeding everyone. I think something is about to feed me.' The air in the room feels different. 'I'm ready.'`,
  body_positive_greek:(s)=>`${s.name} reads the national organization's updated guidance one more time, then folds it and sets it down. 'The change is in writing now,' she says. 'Official. Permanent. Irreversible.' She's very quiet for a moment. 'I've been building something. I think the goddess has been building something too.' She looks at you. 'They're the same thing, aren't they.'`,
  metrics_eater:    (s)=>`${s.name} saves the spreadsheet — all four thousand rows of it — and closes the laptop. 'The data is complete,' she says. 'Every metric tracked, every variance documented.' She's quiet. 'But there's a variable I never modeled. The one where the subject exceeds the categories.' She looks at you. 'My data predicts this moment. I just didn't know what to call it.'`,
  food_scientist:   (s)=>`${s.name} writes 'Study concluded' in the methodology log and sets the pen down. 'The data is in,' she says. 'The subject has been rigorously documented.' She turns to face you. 'But science has an edge. Beyond the edge is the thing that data can describe but cannot explain.' She's very still. 'I think I've reached the edge.' A pause. 'I'd like to go past it.'`,
  installation_artist:(s)=>`${s.name} stands in front of the last piece in the retrospective — the one that is simply her, present, not photographed or documented or framed, just existing in the gallery space — and looks at herself for a long time. 'The installation and the artist have merged,' she says quietly. 'There's nothing left to separate.' She turns to you. 'The goddess has been making something too. I think I'm it.'`,
  food_photographer:(s)=>`${s.name} sets the camera down for the first time — not to check a shot, but because she's done. 'I set out to photograph food,' she says. 'The food changed me. I photographed the change. The photographs became the subject. I became the photograph.' She looks at you. 'There's one frame left. It can't be taken with this camera.' A very long pause. 'It has to be lived.'`,
  anonymous_blogger:(s)=>`${s.name} posts the final entry. You watch her do it — she types the last sentence, reads it twice, and hits publish with the same quiet certainty she brings to everything. Then she closes the laptop. 'The blog is done,' she says. 'The record is complete. Everything I became is written down.' She looks up. 'Now something happens that can't be written.' She's smiling, very slightly. 'I think the goddess has been reading all along.'`,
  asmr_creator:     (s)=>`${s.name} turns off the microphone — the careful, ceremonial way she always does — and sits in the silence for a long time. Then: 'I've been making space for people to be calm,' she says. 'Feeding them something quiet.' She looks at her hands. 'But something is asking me for the opposite of quiet now. Something big.' She looks up. 'I think it's time to answer.'`,
  campus_legend:    (s)=>`${s.name} sits in the booth — the one with her name on the plaque — and looks at the dining hall. 'I came here a stranger,' she says. 'And I became the place.' She's quiet for a long time. 'But a campus is still a small thing. The goddess made something bigger.' She looks at you. 'I think she made it out of me.' She touches the plaque once, gently. 'I'm ready.'`,
  food_tourist:     (s)=>`${s.name} closes the final notebook — the one that started with a map and a list and became something no map could hold — and sets it beside the others. 'I've tasted everything,' she says. 'Every dish, every cuisine, every place I could reach.' She looks at you. 'But there's a flavor I haven't found yet. One that doesn't come from a restaurant.' She's very quiet. 'I think the goddess has been saving it for me.'`,
  ff_author:        (s)=>`${s.name} closes the manuscript — the full archive, every chapter, printed and bound, the work of years — and holds it in both hands for a moment before setting it down. 'I wrote about all of them,' she says. 'Everyone in that room. What they became. What they're still becoming.' She's quiet. 'And I wrote about myself more than I let anyone see.' She doesn't look at the manuscript. She looks at you. 'The last character I never figured out how to end — the one who kept getting bigger every chapter, the one who was always about to become something beyond the story.' A long pause. 'I think I'm at that page now.'`,
};

// ── DINNER EVENT DATA ──────────────────────────────────────────
const WAITER_DESC = {
  bistro:        (s)=>`A young woman in a bistro apron comes over. She's softly built — the kind of figure that comes from working around good food every day. She smiles warmly at ${s.name}. "Ready for more?"`,
  italian:       (s)=>`A warm, round woman bustles over — full-figured in the way of someone who grew up cooking. She refills the bread basket without being asked and beams at ${s.name}. "More? Of course more."`,
  steakhouse:    (s)=>`A broad, solid woman in a leather apron approaches. She's substantial, clearly someone who eats well on shift and often. She surveys the cleared plates with professional approval. "Ready for the next round?"`,
  french:        (s)=>`The sommelier — a heavyset woman in a crisp blazer — drifts over. Her figure suggests someone who takes research very seriously. She refills the wine without comment. "Another course?"`,
  japanese:      (s)=>`A quietly round woman in formal dark attire appears. She replaces the chopsticks, replenishes the water, and waits. She says nothing. ${s.name} reaches for the fresh menu.`,
  private_club:  (s)=>`A large woman in club livery appears, moving with the unhurried ease of someone extremely comfortable in their body. She sets down a new menu card without being asked. "The kitchen is ready whenever you are."`,
  chefs_table:   (s)=>`The floor manager — an immensely soft woman in tailored black — materializes beside the table. The kind of person who samples everything, constantly. "Shall I tell the kitchen to continue?" There's no other answer.`,
  home_dinner:   (s)=>`You head back to the kitchen to bring out the next course.`,
  brunch_hall:   (s)=>`A cheerfully plump woman in a floral apron refills both coffees and sets down a fresh card. She looks at ${s.name} approvingly. "There's plenty more where that came from."`,
  atelier:       (s)=>`The maître d' — a truly enormous woman in impeccable black, who navigates the dining room with the serene authority of someone who has never once heard 'no' — arrives at your table. She does not ask what you want. She tells the kitchen. ${s.name} sits up slightly straighter.`,
};

// ── DINNER ENDING NARRATIVES ──────────────────────────────────
// [stageGroup 0-3][fullnessGroup 0-3]: (s) => ~150-word string
const DINNER_ENDING_TEXT = [
  // Stage 0-2 (slim / gaining)
  [
    (s)=>`The bill arrives while ${s.name} is still looking at the dessert menu. She sets it down with something like regret — "I'm actually full," she says, which sounds surprised even as she says it. She sits back, one hand resting on her stomach, a new gesture she doesn't seem entirely aware of. The evening light is good on her. She's happy. She talks for another fifteen minutes about the meal in a way that suggests she's already thinking about coming back. On the walk out she floats the idea of dessert somewhere else, then doesn't follow through. She goes home and texts you later: she fell asleep immediately, the portions were exactly right. You think about the soft line of her hand on her belly and the uncomplicated look on her face, and it seems like a very good place to leave things.`,
    (s)=>`The moment of reckoning arrives mid-dessert: ${s.name} sets her spoon down, looks at what's left, and picks the spoon back up. She finishes it. She is quiet for a moment after, doing a kind of internal accounting that arrives at a number she hadn't expected. "I ate," she says eventually, "a lot." This appears to surprise her. She sits in the booth a little longer than necessary, in the comfortable way of someone who is not entirely sure they can stand yet. When she does stand, she straightens carefully, tucks her shirt — it had come untucked at some point, she hadn't noticed — and looks genuinely pleased with herself. She tells you the pasta was worth it, and she means the entire evening. She texts on the way home to say she's very full, as if this were news she needed to deliver.`,
    (s)=>`She goes quiet around the second-to-last dish — not unhappily, more the quiet of someone redirecting all resources inward. She finishes it anyway. Then the last dish. She puts her hands flat on the table and breathes for a moment, looking at the empty plates with an expression between pride and mild alarm. "I need to not move for a minute," she says, and she doesn't, for more than a minute. The waiter comes and goes. When she finally gathers herself to leave, she moves with the careful precision of someone managing something fragile, which is herself. Outside she adjusts — jacket, bag, sense of self — and takes a slow breath. She texts from the taxi: she would absolutely do this again and she doesn't know what that says about her. She sounds completely delighted.`,
    (s)=>`She couldn't stop. Each dish arrived and she ate it, and when the next one came she looked at it and ate that too, because the food was excellent and the evening was good and she had lost the ability to choose otherwise. She is very full. Comprehensively. She sits for a long time after the last plate, arms on the table, head tipped back slightly, eyes closed, breathing slowly. "I need you to know," she says eventually, "that I don't regret any of it." This is clearly true. She goes home still full, and texts in the morning that the pasta was worth every bite and can you book again next week. She sounds completely serious. You think she probably ate something on the way home and doesn't mention it. This seems right.`,
  ],
  // Stage 3-5 (plump / heavy)
  [
    (s)=>`${s.name} leans back with the easy satisfaction of someone who has calibrated herself to this. The plates are cleared. She is full in the uncomplicated way of a person who knows how to be full — not surprised by it, not fighting it, just settled into it. She has a second glass of something. She talks about the meal with the detail of someone who paid close attention to every dish, which she was. At some point recently she stopped noticing when she was full and started noticing only when the food was gone. Tonight they coincide. She looks satisfied in a way that extends beyond dinner, as if the whole arrangement of her life is working out correctly. The check arrives. She waves at the empty plates with something like affection.`,
    (s)=>`There's a moment where ${s.name} pauses, registers something, and continues eating. That's the whole story. The pause is the tell — her body filing a report — and the continuing is the answer: noted, irrelevant. She is full in a way that has weight to it, literally. She settles deeper into her chair at some point during the final course and doesn't come back up to her original height, the way a person sinks when they stop holding themselves in place. When the bill arrives she doesn't look at it, just taps her card and waves the waiter away with the benevolent authority of someone who has nothing left to give attention to. The walk out is slower than the walk in. She notices this and doesn't mention it. Outside she breathes deeply, looks pleased. "Good choice," she says.`,
    (s)=>`She orders the last dish the way someone presses a button they know they shouldn't — with awareness, with intention, with no hesitation whatsoever. She is already full when it arrives. She is fuller when it's gone. The restaurant has gone quiet around your table in the comfortable way of a place beginning to close, and she's still sitting, because she has no intention of moving yet, and also because standing would require a coordination she's not currently confident about. She puts both palms flat on her stomach, not embarrassed, just aware. "I'm," she says, and doesn't finish the sentence, because the word seems inadequate for the specific experience. She smiles anyway. She sends you a voice message from home later: she is lying completely flat and extremely happy, and you should definitely go back.`,
    (s)=>`The question of when she would stop eating had an empirical answer: now, at the end of this meal, when there is nothing left in front of her. She didn't stop before that. She's aware of this, and not particularly sorry. She sits with the particular stillness of someone who has exceeded her usual limits and is adjusting to the new position — physically, existentially. Both hands settle on her belly, which is rounder and more present than usual. She says nothing for a while. The restaurant makes small sounds around her. Eventually: "That got away from me a little." Delivered with complete composure. She means: it was perfect. She means: she ate everything and would do it again and is already thinking about it. She moves slowly to the door. She tips generously.`,
  ],
  // Stage 6-7 (very heavy)
  [
    (s)=>`The table is cleared around ${s.name}. She doesn't move much — movement has been negotiated down to what's necessary, for her — but she's present, attentive, pleased. She ate well. She always eats well, but tonight was particular. She sits the way she always sits: fully, completely, in a way that leaves no ambiguity about how much of her there is. She is a substantial woman. The chair knows this. The staff know this. She knows this, with the comfortable certainty of someone who arrived at this understanding a long time ago and found it agreeable. She looks at the empty plates with something like affection. She looks at you with something warmer. "This was good," she says. The understatement is deliberate. She means: excellent. She means: again. She reaches for the last piece of bread.`,
    (s)=>`${s.name} acknowledges it. That's notable. She sits with both hands on her belly, which is rounder and more solid than usual, and says: "I'm full." She says it the way you'd note unusual weather — with interest, without alarm. It doesn't happen often, exactly like this. She has calibrated herself across time to new tolerances, and those tolerances are considerable, and tonight she has exceeded them, and she finds this genuinely interesting. She is not unhappy. She is very happy — happy in the slow, warm, heavy way of a person entirely at home in her body, which has never been more present than it is right now, packed and warm and settled into the chair with the solidity of something not going anywhere. She smiles. "Good dinner," she says. High praise. The highest.`,
    (s)=>`She's beyond what's usual for her, which is not a small achievement. She has been building toward this kind of capacity for a long time, and she has done something significant tonight, and she knows it, and she is pleased in the quiet, satisfied way of someone who has set a personal record. She doesn't speak for a moment. She breathes. Her belly is round and warm and enormous and she rests both hands on it like they've come home. The restaurant has gone quiet. The staff have stopped moving near your table, giving her space, giving the moment space. When she finally speaks, her voice is slower than usual. "That," she says, "was a meal." She doesn't try to get up for another fifteen minutes. When she does, it takes a while. She smiles the entire way to the door.`,
    (s)=>`She found a point tonight, somewhere after the third course past her limit, that she didn't know existed. A new ceiling. She has been raising ceilings for some time now and tonight she pushed past one she'd never encountered, and she is sitting here in the aftermath of something significant. She is fuller than she has been. She knows it. She sits with it, breathing carefully, her enormous belly pushed against the table edge, both hands resting on its apex. Around her the restaurant has gone quiet. She is the still center of it. "Well," she says, eventually. One word. It means: I am very full. It means: I am extremely pleased. It means: we are coming back. All of these things at once, delivered with the serene authority of a woman who has never once been dissatisfied with herself.`,
  ],
  // Stage 8-10 (enormous / immobile)
  [
    (s)=>`The table is cleared. ${s.name} surveys the situation with the practiced authority of someone who has done this many times and has strong opinions about how it went. She is satisfied, in the comprehensive physical sense — her body has registered the meal with a fullness that, for her, is simply a comfortable middle. She takes up a great deal of space in the chair, and the chair accommodates this without comment. She is happy. She talks about the food with expertise. She does not hurry to leave. She orders more water. She sits in the pleasant aftermath of a good meal with the comfort of someone very accustomed to this feeling, and the feeling has never felt wrong to her, not once, not for a long time now. "Same time next week," she says, and means it. There is no irony in this.`,
    (s)=>`${s.name} registers it — she's full, genuinely full, in a way that meets the specific meaning of the word and not just the approximation. This happens less often than you'd think, given the scale she's working with. She sits with both hands on her immense belly and takes a slow breath, the way someone does when they've arrived somewhere after a long journey. She is comfortable. She is very comfortable. She is the most comfortable she's been all evening, which is saying something. She looks at you with warm, unhurried satisfaction. She is a large woman in a good chair, full of good food, and everything is exactly as it should be. "Perfect," she says. She means the food. She means the evening. She means, more broadly, everything. She orders dessert to take home.`,
    (s)=>`She has exceeded her considerable capacity, which she rarely admits is possible. She sits in full knowledge of this, both hands on her vast belly, doing the quiet internal accounting that follows a meal that went further than expected. Further than most meals go. Further than she'd gone in a while. She is not distressed. She is, if anything, more at ease than usual — there's something clarifying about reaching a real limit rather than an approximation of one. The staff give her wide berth. The chair holds. The evening settles around her with the patience of something that understands its role. After a while she says: "Help me up." You do. She moves slowly, magnificently, like a ship leaving harbour. She thanks you with genuine warmth. Outside the air is cool. She breathes it in. She is happy.`,
    (s)=>`There is no word for what ${s.name} is right now that isn't insufficient. She is past full, past stuffed, past the vocabulary of fullness, in territory that only experience can describe. She is sitting absolutely still. Her belly, vast and round and warm, extends past the table edge. Both hands rest on it. She breathes very slowly, very carefully, the way you breathe when breathing is itself an achievement. The restaurant has emptied around her. The staff wait at a respectful distance. She has been sitting here for some time and will sit here for some time more, because she is not yet ready to attempt the geometry of standing. Eventually she opens her eyes. She looks at you. She smiles, slowly, completely. "Well done," she says. She means it as a compliment. It is the highest compliment she gives.`,
  ],
];

const getOverfillEndMsg=(s,stId)=>
  stId<=2 ? `${s.name} goes very still. Both hands on her middle. "I think I need to stop," she says quietly, with genuine surprise. She means it this time.`
  :stId<=5 ? `${s.name} puts her fork down with a kind of finality. "Okay," she says. "Okay, I think that's it." She doesn't move for a moment. Even for her, that's a lot.`
  :stId<=7 ? `${s.name} breathes out slowly, both hands settling on her belly. "I'm done," she announces, with the gravity of a formal statement. Even she has a limit.`
  : `${s.name} goes completely still. Even she has reached a genuine limit. The room seems to hold its breath.`;

const getJealousyLine=(neglected,fed)=>{
  const m={
    cheerleader:`${neglected.name} glances at ${fed.name}'s plate, then at her own empty place. "So we're feeding her first?" The smile doesn't quite reach her eyes.`,
    quiet:`${neglected.name} watches ${fed.name}'s dish arrive and says nothing. She watches it quite intently for someone who's saying nothing.`,
    party:`"Hey!" ${neglected.name} points at ${fed.name}'s food. "I want that. I want more of everything, for the record."`,
    sorority:`${neglected.name} notices the discrepancy and tilts her chin. "Are we being equitable here?" she asks pleasantly, which isn't quite pleasant.`,
    scholar:`${neglected.name} observes that ${fed.name} has received food and she has not. She says nothing. She is watching you, though.`,
    athlete:`"Hey." ${neglected.name} taps the table. "My side is empty. Hers isn't." She nods at ${fed.name}'s plate. This is the entire complaint.`,
    artsy:`${neglected.name} turns her face slightly toward the window. This is not indifference. This is very much not indifference.`,
    honors:`${neglected.name} says nothing about ${fed.name} getting the first dish. She's keeping a tally, though. She's absolutely keeping a tally.`,
    influencer:`${neglected.name} picks up her phone, looks at it, sets it down. "I'm just going to say," she says, "for the record." She doesn't finish the sentence.`,
    foodie:`${neglected.name} watches ${fed.name}'s dish arrive with an expression of profound personal injury. "That," she says, "should have come to me."`,
    bookworm:`${neglected.name} closes her book slowly and looks at ${fed.name}'s plate with the mild expression of someone documenting an anomaly. She has not said anything. She is building a file.`,
    gamer:`${neglected.name} looks at ${fed.name}'s food, looks at her empty place, and says: "Unbalanced." That's it. She goes back to her phone.`,
    overachiever:`${neglected.name} notes the disparity with a small sound — not quite a word, not quite not. She has already mentally logged the discrepancy. She will not forget it.`,
    transfer:`${neglected.name} glances at ${fed.name}'s plate with a slight frown. "At my last school," she starts, then doesn't finish. She doesn't need to.`,
  };
  return m[neglected.archetype]||`${neglected.name} looks meaningfully at ${fed.name}'s food and then at her own empty place setting.`;
};

const GROUP_CONVERSATIONS=[
  { id:"get_them_talking", label:"Get them talking",
    text:(s1,s2)=>{
      const topics={cheerleader:"the upcoming competition",quiet:"her current project",party:"last weekend",sorority:"the chapter event",scholar:"her research",athlete:"her training",artsy:"her current piece",honors:"her family",influencer:"her content strategy",foodie:"the menu"};
      const t1=topics[s1.archetype]||"her plans";
      return `You ask ${s1.name} about ${t1}. She starts — and ${s2.name} leans in, more interested than she expected.\n"Wait, really?" ${s2.name} says. "I didn't know you were doing that."\n${s1.name}: "You never asked." No edge in it. Just fact.\n${s2.name} considers this, reaches for her drink. "Fair." Then: "Tell me the rest."`;
    }, relBonus:4, fullnessEffect:-4 },
  { id:"compliment_both", label:"Compliment them both",
    text:(s1,s2)=>`You say something genuine about each of them — something you've actually noticed. ${s1.name} receives it differently than expected: more quietly, more truly. ${s2.name} looks at her, then at you.\n"He means it," ${s2.name} says.\n${s1.name}: "I know." Something about the table shifts half a degree warmer.`,
    relBonus:3, fullnessEffect:0 },
  { id:"let_it_settle", label:"Let it settle",
    text:(s1,s2)=>`The conversation drops away. Both of them are eating. The restaurant makes its small sounds. Then ${s1.name} says something about the sauce. ${s2.name} responds. Neither is talking to you, and that's fine — better, actually. The evening has found something you weren't planning for.`,
    relBonus:2, fullnessEffect:5 },
  { id:"toast_together_group", label:"Toast the evening",
    text:(s1,s2)=>`You raise your glass. They raise theirs.\n${s1.name}: "To what?"\n"To a good evening."\n${s2.name}: "We should toast to something real." She thinks. "To the food."\n${s1.name} looks at her. Then she laughs — actually laughs. "To the food." The glasses clink.`,
    relBonus:4, fullnessEffect:-3 },
  { id:"order_for_table", label:"Order another round",
    text:(s1,s2)=>`You catch the server's eye and gesture at the table generally. More arrives. ${s1.name} and ${s2.name} look at the new dishes, look at each other.\n${s2.name}: "We didn't need more."\n${s1.name}, already reaching: "I know." She keeps reaching. ${s2.name} watches for a moment, then reaches too. The evening continues.`,
    relBonus:3, fullnessEffect:8 },
];

// ── GROUP DINNER REACTION DATA ────────────────────────────────
const THIN_JEALOUSY={
  cheerleader:[
    (t,f)=>`${t.name} watches ${f.name}'s plate arrive. Her eyes linger on it longer than she means them to. "That looks incredible," she says, very quietly.`,
    (t,f)=>`${t.name} watches ${f.name} eat with something that isn't quite envy. "You just look so... comfortable," she says. "I don't know what to do with that." She pushes her empty plate forward.`,
    (t,f)=>`"Lucky," ${t.name} says, watching ${f.name} settle into her chair after another course. "I mean it. You can just — eat. Like that. Just eat." She sounds like she means it as a compliment.`,
    (t,f)=>`${t.name} reaches across, almost without meaning to, and presses her fingers gently to ${f.name}'s side. Warm and soft and full. She pulls her hand back. "Sorry," she says. "I just — you look so comfortable." She looks at her empty table.`,
  ],
  quiet:[
    (t,f)=>`${t.name} hasn't said anything. But she has watched every bite. Her eyes are very attentive.`,
    (t,f)=>`"It smells incredible," ${t.name} says. The first thing she's said all evening. She's still watching ${f.name}'s plate.`,
    (t,f)=>`"I used to eat like that," ${t.name} says, quietly. Not an accusation. Something else. "Before I started counting everything." A pause. "I miss it."`,
    (t,f)=>`${t.name} reaches over and rests her hand gently on ${f.name}'s middle. Warm. Full. She doesn't say anything for a moment. "You feel so..." she starts, then trails off. She leaves her hand there a second longer before pulling back.`,
  ],
  party:[
    (t,f)=>`"Okay, I want that," ${t.name} says, watching ${f.name}'s dish arrive. "I'm just going to say it: I want that."`,
    (t,f)=>`"Seriously," ${t.name} says. "I haven't eaten anything and you've eaten everything and you look so happy." A beat. "I want to look like that. Exactly like that."`,
    (t,f)=>`${t.name} drops the cheerful act for a second. "Lucky," she says, watching ${f.name} settle back, round and full and comfortable. "I'm calling it: lucky. Look at her." She's talking to you but her eyes are on ${f.name}.`,
    (t,f)=>`${t.name} grabs ${f.name}'s arm mid-bite, not to stop her — just to feel it. The softness there. "Sorry," she says, and doesn't let go right away. "You just feel so good. Is that weird? That might be weird."`,
  ],
  sorority:[
    (t,f)=>`${t.name} watches ${f.name}'s next course arrive with barely-maintained composure. "The chapter always said we should appreciate abundance," she says. Her voice sounds very sincere.`,
    (t,f)=>`"I want to be supportive," ${t.name} says. "And also I genuinely want what she's having. I haven't eaten anything." She watches ${f.name}'s plate. "Everything she has. All of it."`,
    (t,f)=>`"Honestly," ${t.name} says, watching ${f.name} settle round and content into her chair, "I think you look amazing." She means it. That's what makes it land the way it does. "Everything about that looks amazing."`,
    (t,f)=>`${t.name} leans over and — with deliberate gentleness — rests her hand against ${f.name}'s soft middle. "I can feel every course," she says. "I've had nothing." She presses slightly. "That must feel so good."`,
  ],
  scholar:[
    (t,f)=>`${t.name} observes ${f.name}'s plate with academic precision. "The volume is impressive," she says, and the admiration is genuine. She has been counting.`,
    (t,f)=>`"I've been calculating the cumulative intake," ${t.name} says. "And also, independently, I've been thinking about what that feels like." She watches ${f.name}'s contentment with something like longing. "Theoretically."`,
    (t,f)=>`"I've been thinking," ${t.name} says, "about what it must feel like to just eat. Without tracking anything. Without calculating." She watches ${f.name} settle warmly into her chair. "You look like you've figured something out that I haven't."`,
    (t,f)=>`${t.name} reaches over with careful, deliberate intent and places her palm flat against ${f.name}'s full middle. "I wanted to feel it," she says, academically. "What that much food feels like, in situ." Her hand doesn't move. "Warm. Very warm."`,
  ],
  athlete:[
    (t,f)=>`${t.name} watches ${f.name}'s plate arrive with the focused gaze she saves for studying form. "She eats like she's proud of it," she observes. There's respect there.`,
    (t,f)=>`"My whole life has been about burning it," ${t.name} says. "Everything I eat, I think about burning." She watches ${f.name} eat, unconcerned, comfortable. "What's that like? Just... not thinking about it?"`,
    (t,f)=>`${t.name} watches ${f.name} settle back, round and content, and says: "I've spent years making sure nothing accumulates." She means it to sound like discipline. It doesn't. "You look like you've made different choices." A pause. "Good ones, maybe."`,
    (t,f)=>`${t.name} presses her palm to ${f.name}'s side — not aggressive, almost reverent. Soft. Full. Warm. "I train every day," she says. "Every single day. And you feel like..." She doesn't finish. She doesn't need to.`,
  ],
  artsy:[
    (t,f)=>`${t.name} watches ${f.name}'s course arrive with her head tilted. "There's something beautiful about the way she just... takes it in," she says. She means the food. Maybe she means more.`,
    (t,f)=>`"I've been watching you eat," ${t.name} says. "You don't apologize for any of it." She sounds fascinated. "I apologize for everything. I've been apologizing my whole life. Look at you." She does. She keeps looking.`,
    (t,f)=>`${t.name} has stopped pretending to be detached. "You look so comfortable," she says. "Round and warm and comfortable. I've been drawing you for the past ten minutes in my head and I haven't eaten anything." She sounds like she'd trade.`,
    (t,f)=>`${t.name} places her hand against ${f.name}'s side with artistic intentionality. "Soft," she says. "Warm. Very present." She presses gently. "I wanted to understand the texture." She holds it there. "I think I'm jealous."`,
  ],
  honors:[
    (t,f)=>`${t.name} watches ${f.name}'s course arrive and says, carefully: "She has a very healthy relationship with food." This is sincere. This is something she has thought about.`,
    (t,f)=>`"You eat as though you've made peace with everything," ${t.name} says. She's been watching. "I haven't made peace with anything in ten years." She watches ${f.name}'s contentment. "What does that feel like?"`,
    (t,f)=>`"You look genuinely happy," ${t.name} says. She has been raised not to comment on others at table, and she is violating that rule because she means it. "Round and warm and full and happy. I don't know how to be that. I've never known how."`,
    (t,f)=>`${t.name} reaches out with careful propriety and rests her hand against ${f.name}'s middle. "Forgive me," she says. "I just wanted to understand." Warm. Soft. Packed full. Her eyes are very bright. "Oh," she says. "Oh, I understand."`,
  ],
  influencer:[
    (t,f)=>`${t.name} has her phone half-raised. "I keep wanting to document this," she says. "Not meanly. I just — look at her. She's glowing." She watches. Doesn't post yet.`,
    (t,f)=>`"Okay, I want to say something," ${t.name} says. "And I want it understood that I mean this as a genuine compliment." She looks at ${f.name}. "You are having the most fun of anyone at this table and you haven't stopped eating and I find it aspirational."`,
    (t,f)=>`"My whole brand is discipline," ${t.name} says. "I built my entire platform on saying no." She watches ${f.name} eat — warm, easy, comfortable, soft. "What is it like to just say yes?" She sounds wistful.`,
    (t,f)=>`${t.name} reaches over and squeezes ${f.name}'s arm. "You're so soft," she says. "I mean that as high praise. My whole life I've been sharp edges. I want to know what this feels like." She doesn't let go right away.`,
  ],
  foodie:[
    (t,f)=>`${t.name} watches ${f.name}'s next course arrive and says, professionally: "The volume is remarkable. The commitment is remarkable." She sounds, despite herself, impressed.`,
    (t,f)=>`"There's a point where you stop tasting and start experiencing," ${t.name} says. "She's past it." She watches ${f.name} eat with total ease. "I've always been afraid to get past it. She looks like she's never been afraid of anything."`,
    (t,f)=>`${t.name} sets down her empty fork. "I have eaten nothing," she says, "and you have eaten everything, and you look..." She searches for the right word. Warm. Full. Rounded and easy and utterly content. "You look like the point of the whole evening."`,
    (t,f)=>`${t.name} reaches over and presses her palm to ${f.name}'s full middle with the focus of someone taking notes. "All that richness," she says, "and she's still going." She means it as taxonomy. It sounds like longing. "I've had nothing to compare it to tonight."`,
  ],
  bookworm:[
    (t,f)=>`${t.name} watches ${f.name}'s course arrive and makes a note in the margin of whatever she's reading. Not a real note. Just a mark. She is tracking this academically.`,
    (t,f)=>`"Statistically," ${t.name} says, "you've received three times my intake tonight." She closes her book. "I'm not angry. I'm logging a pattern. The pattern is interesting." She watches ${f.name} eat. She is not just logging.`,
    (t,f)=>`${t.name} looks up from her book and studies ${f.name} with the specific attention she gives to primary sources. Warm, full, softly considerable, utterly comfortable. "I've been researching this," she says. "What it looks like. What it feels like." A pause. "The literature doesn't do it justice."`,
    (t,f)=>`${t.name} reaches over with careful deliberateness and rests her fingers on ${f.name}'s soft middle. She is doing this with the same focus she brings to tactile analysis of archival material. "The documentation said this felt like warmth and weight," she says. "The documentation was inadequate."`,
  ],
  gamer:[
    (t,f)=>`${t.name} watches ${f.name}'s dish arrive and says, deadpan: "She's at a higher level." She looks at her own empty place. "I've been idle."`,
    (t,f)=>`"Her stats are better," ${t.name} says. Not bitterly. Objectively. She's watching ${f.name} eat with something approaching professional respect. "I respect the numbers. I don't love the numbers."`,
    (t,f)=>`${t.name} sets her phone down. "She's running up the scoreboard and I'm not on it." She watches ${f.name} settle back, round and full, with the unfazed contentment of someone winning by a wide margin. "I respect the run. I want to be on the leaderboard."`,
    (t,f)=>`${t.name} presses her hand to ${f.name}'s full side with gamer-economy precision — in, assess, data collected. "Soft," she confirms. "High score." She pulls back. "I'm starting a new run."`,
  ],
  overachiever:[
    (t,f)=>`${t.name} is marking a mental spreadsheet in real time. ${f.name}'s dish arrives; she records the delta. She says nothing yet. She is in the data collection phase.`,
    (t,f)=>`"The gap between our intake tonight is significant," ${t.name} says, with the tone of someone reviewing a performance evaluation. "I'm below target. She is exceeding all benchmarks." She pauses. "I don't like being below target."`,
    (t,f)=>`${t.name} looks at ${f.name} with the competitive assessment of someone who has been out-performed on a metric she wasn't tracking and is now tracking it urgently. "You've been consistent," she says. "Every metric. The gains, the comfort level, all of it." She sounds like she's about to write a plan of action.`,
    (t,f)=>`${t.name} leans across and places her palm against ${f.name}'s full middle with goal-oriented intent. "Benchmark," she says, pressing slightly. "This is the benchmark." She holds it for a moment. "I know what I'm working toward now." She sounds resolved.`,
  ],
  transfer:[
    (t,f)=>`${t.name} watches ${f.name}'s plate arrive and blinks. "At my home campus we sat together and ate at the same time," she says. "Is this a thing here? The uneven service?" She sounds genuinely uncertain about the local customs.`,
    (t,f)=>`"I've been noticing," ${t.name} says, "that the distribution isn't balanced. At home we tracked participation. We made sure everyone got the same." She watches ${f.name} eat. "Apparently that's not how things work here."`,
    (t,f)=>`${t.name} watches ${f.name} eat — comfortable, warm, considerably softened since the start of term — and says: "Back home there was a phrase for girls who committed to the dining hall the way she does." She smiles. "It was a compliment." She watches her own empty table. "I want whatever she's having."`,
    (t,f)=>`${t.name} reaches over and touches ${f.name}'s full middle with the tentative wonder of someone encountering something new to their campus experience. "Is this — is this what you all do here?" she asks softly. "Because I would have transferred sooner."`,
  ],
};

const FAT_ENCOURAGE={
  cheerleader:[
    (f,t)=>`${f.name} catches ${t.name}'s empty plate and frowns warmly. "She hasn't eaten anything." A pause. Then, louder: "That's not right. Feed her."`,
    (f,t)=>`${f.name} slides a dish toward ${t.name} with genuine insistence. "Try this one. It's wonderful." She is already reaching for the next bite of her own. "You're missing it."`,
    (f,t)=>`${f.name} nudges ${t.name}'s arm, then gives her shoulder an encouraging shake. "I was your size, once," she says. "This is better. This is so much better. Eat something, please."`,
    (f,t)=>`${f.name} takes ${t.name}'s hand and presses it warm and firm against her own full belly. "Feel that," she says, with the satisfaction of someone who has made excellent choices. "That's what the evening is supposed to feel like." She keeps hold. "I want that for you."`,
  ],
  quiet:[
    (f,t)=>`${f.name} glances at ${t.name}'s empty plate and slides her extra bread over without a word. Then looks at her. Waiting.`,
    (f,t)=>`"You should eat," ${f.name} says. She means it from somewhere warm. She means it genuinely.`,
    (f,t)=>`${f.name} gets up, makes room on ${t.name}'s side of the table, and waves the server over. She doesn't explain. She just wants her to eat.`,
    (f,t)=>`${f.name} places ${t.name}'s hand on her own stomach and holds it there. The warmth, the fullness, the soft give of it. "I want you to feel this," she says quietly. "I was your size. I want you to know what this is."`,
  ],
  party:[
    (f,t)=>`${f.name} points at ${t.name}'s empty place with her fork. "Excuse me," she says, "this is not how we do things. She hasn't eaten anything. This is a crisis."`,
    (f,t)=>`${f.name} starts loading ${t.name}'s plate from her own. "Here, this one is incredible — here, have this too. I was your size once and I didn't know what I was missing."`,
    (f,t)=>`${f.name} grabs ${t.name} by both shoulders. "I need you to eat," she says. "For your sake. For my sake. I can't enjoy this with you sitting there having nothing."`,
    (f,t)=>`${f.name} pats ${t.name}'s flat stomach cheerfully, then her own — warm, soft, deeply full. "See the difference?" she says, beaming. "I want this for you. I want this so much for you. Eat something."`,
  ],
  sorority:[
    (f,t)=>`${f.name} regards ${t.name}'s empty setting with the authority of someone who has hosted many meals. "She hasn't been taken care of," she says. "Fix it."`,
    (f,t)=>`"The chapter principle," ${f.name} says, "is that everyone eats." She signals for more. "I was your size at pledge year. Let me tell you, it gets better. The eating gets so much better."`,
    (f,t)=>`${f.name} slides her dessert toward ${t.name} with the warmth of genuine sharing. "Take it. I want to share this with you." She pats ${t.name}'s shoulder. "You need something to show for the evening."`,
    (f,t)=>`${f.name} guides ${t.name}'s hand to her own belly — round and warm and deeply full — and holds it. "This," she says, with complete sincerity, "is what a full evening feels like. I want that for you." She pats once. "Feed her. Right now."`,
  ],
  scholar:[
    (f,t)=>`${f.name} reviews the table and notes the disparity. "She's not eating," she says. "That's a compounding problem. Fix it early."`,
    (f,t)=>`"I've done the math," ${f.name} says, "and she is not keeping up. She needs to start." She studies ${t.name} with methodical warmth. "I was thin once. It was less interesting."`,
    (f,t)=>`${f.name} sets down her fork and addresses ${t.name} directly: "I have tried to ignore your empty plate, and I can't. It's affecting my concentration. Eat. Something. Please." She picks her fork back up.`,
    (f,t)=>`${f.name} takes ${t.name}'s hand, presses it firmly to her own full, warm belly, and holds it there. "I want you to understand what this is," she says. "I was your size. I did the research. This is better. Eat."`,
  ],
  athlete:[
    (f,t)=>`${f.name} looks at ${t.name}'s empty plate with the assessment of a coach evaluating under-fueling. "She's not eating," she says. "That's a recovery issue. Get her something."`,
    (f,t)=>`"Fuel," ${f.name} says simply, pushing a dish toward ${t.name}. "You need it. I know what I'm talking about. I know the difference it makes." She does.`,
    (f,t)=>`${f.name} gives ${t.name}'s arm an encouraging squeeze — and then keeps hold, comparing. "There's nothing here," she says. "We need to build this up. That's what food does. Let it do its job."`,
    (f,t)=>`${f.name} presses ${t.name}'s palm to her own belly, warm and deeply packed. "I was lean once," she says. "Disciplined and lean. And then I stopped fighting it." She moves the hand. "Feel the difference. I want that for you. Eat."`,
  ],
  artsy:[
    (f,t)=>`${f.name} notices ${t.name}'s empty setting and feels the aesthetic offense of it. "She hasn't eaten anything," she says. "The whole composition is off. Feed her."`,
    (f,t)=>`"There's an absence here," ${f.name} says, sliding a dish toward ${t.name}. "And it shouldn't be. Eat this. Tell me what you taste. I want to share it."`,
    (f,t)=>`${f.name} rests her hands warm on ${t.name}'s shoulders. "You're too light," she says. "I mean literally — you feel like nothing. I want you to feel like something. Eat."`,
    (f,t)=>`${f.name} places ${t.name}'s hand against her own belly — soft, warm, full, present. "This is what I want to give you," she says, with complete sincerity. "Not this specifically, but — this feeling. This substance. Eat."`,
  ],
  honors:[
    (f,t)=>`${f.name} takes note of ${t.name}'s empty place with the concern of someone raised to believe hospitality is a moral matter. "She hasn't been seen to," she says. "That's not acceptable."`,
    (f,t)=>`"In my family," ${f.name} says, "to let a guest go hungry is a failure of the host." She signals for more. "Eat. I mean it warmly but I also mean it as a rule."`,
    (f,t)=>`${f.name} faces ${t.name} fully. "You are very thin," she says, with the directness of someone who was raised to say hard things kindly. "That is correctable. I was thin once. Eat. I'm asking you sincerely."`,
    (f,t)=>`${f.name} takes ${t.name}'s hand in both of hers and places it against her full, warm middle. "My grandmother would say this is what an evening looks like," she says. "I want you to have this." She holds the hand. "Feed her properly."`,
  ],
  influencer:[
    (f,t)=>`${f.name} looks at ${t.name}'s empty table and the creator in her takes over. "This is not balanced content," she says. "And more importantly — she's missing out. Feed her. This is too good to miss."`,
    (f,t)=>`"Do you know what performs best?" ${f.name} says. "Transformation. The beginning of something." She slides a dish toward ${t.name}. "This could be your beginning. Eat something."`,
    (f,t)=>`${f.name} cups ${t.name}'s face in her hands. "Listen to me," she says. "I was where you are. The discipline, the restraint, the counting. And then I stopped." She beams. "Look at me now. This is available to you. Eat."`,
    (f,t)=>`${f.name} guides ${t.name}'s hand to her own stomach and holds it, warm and soft and present. "Feel my journey," she says, with total sincerity. "I want this for you. I want to watch it happen for you." She pats the hand. "Eat."`,
  ],
  foodie:[
    (f,t)=>`${f.name} looks at ${t.name}'s empty plate and feels the waste of it personally. "She's sitting in front of this food and not eating it," she says. "That is genuinely upsetting. Fix it."`,
    (f,t)=>`${f.name} begins describing the current course to ${t.name} in loving, specific detail — not to show off, but because she genuinely needs someone else to understand what she is experiencing. "You have to taste this. You have to."`,
    (f,t)=>`${f.name} picks up a dish and sets it in front of ${t.name} herself. "Eat this," she says. "I'm sharing this with you. This is an act of love." She means it entirely.`,
    (f,t)=>`${f.name} guides ${t.name}'s fork to her own plate. "Taste it," she says. "I need someone else in this. The richness — you can't understand it from the outside." She puts a hand on ${t.name}'s shoulder, warm and present. "Come in. Eat with me."`,
  ],
  bookworm:[
    (f,t)=>`${f.name} marks her place in her book and looks at ${t.name}'s empty plate with the measured concern of someone noting a gap in the data. "She hasn't eaten," she says. "That's a variable that needs correcting. Get her something."`,
    (f,t)=>`"I've been thinking," ${f.name} says, "about the correlation between intake and comfort. There's a strong one. The sample size in front of you is me." She slides a dish toward ${t.name}. "Add yourself to the dataset."`,
    (f,t)=>`${f.name} sets down her book and addresses ${t.name} directly: "I was thin. I ran the numbers on everything. The math I was doing was wrong." She pats her own considerable middle. "This is the correct answer. Start eating. I'll walk you through the methodology."`,
    (f,t)=>`${f.name} takes ${t.name}'s hand and places it against her own full, warm belly with academic deliberateness. "Primary source," she says. "This is what the evening feels like when you participate correctly. I want you to have this data."`,
  ],
  gamer:[
    (f,t)=>`${f.name} spots ${t.name}'s empty plate immediately. "She's not playing," she says. "You can't win if you're not playing. Get her in."`,
    (f,t)=>`"New player," ${f.name} says, nodding at ${t.name} with the patient authority of a veteran. "She needs to level. Get her something. Start her on something good."`,
    (f,t)=>`${f.name} slides a dish toward ${t.name} with the casual generosity of someone sharing a power-up. "I was where you are," she says. "Rookie numbers. Didn't know what the game was." She pats her own side comfortably. "Now I do. Eat. Get your stats up."`,
    (f,t)=>`${f.name} takes ${t.name}'s hand and presses it against her own full side. "Max stats," she says flatly. "That's what this feels like. Eat. I want to watch your score climb." She means it entirely.`,
  ],
  overachiever:[
    (f,t)=>`${f.name} reviews the table, notes ${t.name}'s empty place, and frowns with the energy of someone identifying an underperforming metric. "She's not eating. That's a problem. That's correctable. Fix it."`,
    (f,t)=>`"I tracked everything once," ${f.name} says. "Every calorie. Every deficit. I was winning the wrong game." She slides a dish toward ${t.name}. "This is the right game. Your intake goal for tonight: all of this."`,
    (f,t)=>`${f.name} pulls her chair directly next to ${t.name}'s and starts loading her plate with the efficiency of someone executing a plan. "We are going to optimize your evening," she says. "Step one is eating. I was thin and driven and missing something. I'm not missing it anymore."`,
    (f,t)=>`${f.name} takes ${t.name}'s hand and places it against her own full belly — warm, firm, impressive by any measure. "Personal record," she says. "This is a personal record. I want to watch you set yours." She holds the hand there. "Eat. I'll keep score."`,
  ],
  transfer:[
    (f,t)=>`${f.name} sees ${t.name}'s empty place and feels a specific hospitality obligation. "She hasn't been fed," she says. "At my home campus this would be a significant failure of hosting. Feed her."`,
    (f,t)=>`"Where I'm from," ${f.name} says, "we made sure everyone ate. Especially the new arrivals." She loads ${t.name}'s plate from her own. "Welcome. This is how we do things here now. I checked. Eat."`,
    (f,t)=>`${f.name} cups ${t.name}'s face warmly. "You're going to do great here," she says. "But you need to start eating." She gestures at herself — considerably, warmly, entirely content. "I transferred in not knowing anyone. This was what got me through. It will get you through. Eat."`,
    (f,t)=>`${f.name} guides ${t.name}'s hand to her own full middle and holds it there. "I was exactly where you are," she says. "New school, not sure about anything, not eating enough." She presses the hand. "This campus is good to you if you let it be. Eat. I'm so glad I transferred."`,
  ],
};

const FAT_RETORT={
  cheerleader:[
    (f,t)=>`${f.name} smiles at ${t.name} with the warmth of someone entirely comfortable in her own skin. "Honey," she says, "if you ate something you'd feel better too."`,
    (f,t)=>`${f.name} looks at ${t.name} with generous understanding. "I know," she says. "I looked like you once. I know exactly what that feels like." She pats her own middle. "This is better. I promise."`,
    (f,t)=>`${f.name} reaches over and presses ${t.name}'s hand to her own warm, soft belly with all the confidence of someone offering proof. "Tell me you don't want this," she says, and she means it gently. "I'll believe you. But eat something first."`,
  ],
  quiet:[
    (f,t)=>`${f.name} just looks at ${t.name}. Then she eats. Then she looks at ${t.name}'s empty plate. Then she looks back at her own.`,
    (f,t)=>`"Eat something," ${f.name} says. Just that. Her tone has no edge — just concern and invitation.`,
    (f,t)=>`${f.name} sets down her fork and says, very quietly: "You're hungry. I can see it." She slides her plate toward ${t.name}. "Eat."`,
  ],
  party:[
    (f,t)=>`${f.name} laughs — a real one, full and warm. "Babe," she says, "I'm not even offended. I want you to have what I have. Eat something."`,
    (f,t)=>`"Mean!" ${f.name} says, laughing. "Mean, and hungry." She pushes her bread toward ${t.name}. "Eat first. Then we can fight."`,
    (f,t)=>`${f.name} grabs ${t.name}'s hand and presses it to her belly with a cheerful grin. "Tell me that doesn't feel good," she says. "Now tell me you don't want that. Eat something and get there."`,
  ],
  sorority:[
    (f,t)=>`${f.name} raises an eyebrow. "When you're ready to eat," she says, "I'll be here." Warm, unhurried, completely assured.`,
    (f,t)=>`"I hear you," ${f.name} says. Her smile doesn't shift. "And when you eat something, you'll understand what I have. I genuinely hope that for you."`,
    (f,t)=>`${f.name} pats her own belly with full chapter-president satisfaction. "This," she says, "is what the evening is supposed to feel like. You could have it. Eat something."`,
  ],
  scholar:[
    (f,t)=>`${f.name} looks at ${t.name}. "The data," she says gently, "would suggest you're projecting." She pats her belly. "Eat something. Gather your own."`,
    (f,t)=>`"I've run those numbers," ${f.name} says. "I've come out ahead on every metric that matters." She looks at ${t.name}'s empty plate. "Yours are thin."`,
    (f,t)=>`${f.name} gives her belly a warm, deliberate pat. "I'm very comfortable with where I am," she says. "You could be too. It starts with eating." She means it helpfully.`,
  ],
  athlete:[
    (f,t)=>`${f.name} meets ${t.name}'s eyes with the calm of someone who has out-performed many doubters. "Eat something," she says. "First step."`,
    (f,t)=>`"I spent years being what you are," ${f.name} says. "Disciplined and lean and always one number away from enough." She picks up her fork. "I stopped. Look at me now." She sounds pleased.`,
    (f,t)=>`${f.name} pats her belly with warm, competitive satisfaction. "This is a personal record," she says. "And it starts with eating. I'd like to see yours."`,
  ],
  artsy:[
    (f,t)=>`${f.name} tilts her head. "There's something interesting in your reaction," she says. "Sit with it. And also eat something."`,
    (f,t)=>`"The jealousy," ${f.name} says, "is your body knowing something you haven't admitted yet." She eats. "Feed it. See what happens."`,
    (f,t)=>`${f.name} pats her belly contemplatively. "I've made peace with all of this," she says. "You could too. It starts with a bite."`,
  ],
  honors:[
    (f,t)=>`${f.name} straightens. "In my family," she says, "we address envy by working for the thing we want." She looks at ${t.name}'s plate. "Start there."`,
    (f,t)=>`"I appreciate what you're doing," ${f.name} says, with genuine warmth. "And I know what it means." She looks at ${t.name}'s empty plate. "Eat something."`,
    (f,t)=>`${f.name} folds her hands and addresses ${t.name} with complete warmth. "Eat, dear," she says. "You'll understand when you do."`,
  ],
  influencer:[
    (f,t)=>`"I know what this is," ${f.name} says, smiling. "This is a before picture wanting its after." She slides a dish toward ${t.name}. "Eat. Start your arc."`,
    (f,t)=>`"The content that performs best is transformation," ${f.name} says, with a warm look. "This is your step one." She nods at ${t.name}'s empty plate. "Eat."`,
    (f,t)=>`${f.name} holds her phone up and takes a photo — not of ${t.name}, but of the spread, the warm-lit table, the abundance. "I have what you want," she says. "Start eating. I'll document the journey."`,
  ],
  foodie:[
    (f,t)=>`${f.name} pauses mid-bite. "You haven't eaten anything," she says, with the concern of someone who finds this genuinely tragic. "That's the real problem here. Eat."`,
    (f,t)=>`"Everything I am," ${f.name} says, with calm professional pride, "grew from exactly this." She gestures at the table. "You could have it too. Order something."`,
    (f,t)=>`${f.name} fixes ${t.name} with the look of a critic addressing a fundamental misunderstanding. "You want what I have," she says. "It's obvious. The door is right there." She nods at the menu. "Eat."`,
  ],
  bookworm:[
    (f,t)=>`${f.name} considers ${t.name} for a moment. "The data you're working from is outdated," she says, almost gently. "The conclusion you've drawn doesn't hold. Eat something. Revise."`,
    (f,t)=>`"I've been where you are," ${f.name} says. "I ran the same hypotheses. They were wrong. Mine are better now." She pats her full middle with academic satisfaction. "The methodology is available. It involves eating."`,
    (f,t)=>`${f.name} places her hand on her own warm belly with the quiet certainty of someone who has done the research. "Peer-reviewed," she says simply. "This is the correct outcome. Eat and find out."`,
  ],
  gamer:[
    (f,t)=>`${f.name} looks at ${t.name} for a moment. "Skill issue," she says. Not unkindly. "You haven't played enough rounds to understand what I've got. Eat something. Build your experience."`,
    (f,t)=>`"I'm not offended," ${f.name} says. "You're running outdated information." She eats. "The patch notes are: eat more. I've read the patch notes." She sounds content.`,
    (f,t)=>`${f.name} pats her belly with the ease of someone very comfortable with their loadout. "Max level takes time," she says. "You're early game. Start eating. I'll be here."`,
  ],
  overachiever:[
    (f,t)=>`${f.name} straightens slightly. "My metrics are excellent," she says. "I've checked. You're projecting from incomplete data." She gestures at her own full figure with calm pride. "This is what optimized looks like. Eat and catch up."`,
    (f,t)=>`"I understand the impulse," ${f.name} says. "You're comparing. That's good instinct. But you're missing context." She pats her considerable side with satisfaction. "The context is that I am winning. Eat. Start your arc."`,
    (f,t)=>`${f.name} meets ${t.name}'s eyes with competitive warmth. "You can have this," she says. "I want you to have this. I want to watch you match my numbers." She nods at the menu. "Eat. We can track together."`,
  ],
  transfer:[
    (f,t)=>`${f.name} smiles, not unkindly. "At my home campus there was a phrase for this reaction," she says. "It translated to 'future convert.' You'll understand when you eat something." She does not stop eating.`,
    (f,t)=>`"I had this exact reaction," ${f.name} says warmly. "First semester. Looking at someone like me and not knowing what to do with it." She pats her own side. "The answer was: eat. I found that out here. It's a good campus."`,
    (f,t)=>`${f.name} leans forward. "I'll tell you what I wish someone had told me when I transferred," she says. "Eat the food. Just eat it. Everything you're feeling right now resolves itself." She looks completely at peace with this. "Trust the process."`,
  ],
};

const THIN_CONTEXTUAL={
  athlete: (t,f)=>`${t.name} watches ${f.name} eat and says, almost dreamily: "You used to train every day." A pause. "I wonder what it's like to just — stop. Eat everything. Let it all just..." She gestures vaguely at ${f.name}'s figure. "Settle." She sounds, against her will, wistful.`,
  cheerleader: (t,f)=>`"Do they still try to lift you?" ${t.name} asks. "During routines." Her voice has a teasing edge but her eyes are somewhere else. "I'm imagining it. You'd just — oh, that's a lot of girl to get airborne." She almost sounds like she's admiring the physics.`,
  sorority: (t,f)=>`"All those formal tailors," ${t.name} says. "Every semester, new measurements. Starting from nothing and going —" She gestures at ${f.name}. "There." A beat. "The dedication, honestly. The commitment to the whole thing."`,
  influencer: (t,f)=>`"The early posts and the recent ones," ${t.name} says. "I've watched every chapter." She tilts her head. "There's a whole story there, isn't there. Same face. Very different everything else." She sounds almost fond.`,
  scholar: (t,f)=>`"I think about your research trajectory sometimes," ${t.name} says. "The papers from year one, the papers now." She watches ${f.name} eat. "Same mind, different... housing. I wonder if they feel different to write."`,
  honors: (t,f)=>`"The legacy portraits," ${t.name} says. "Your family's hallway, the early ones and recent ones." She watches ${f.name} with something between teasing and genuine fascination. "That's a very different kind of person in those frames. Both of them are you."`,
  artsy: (t,f)=>`"Your self-portraiture has been a journey," ${t.name} says. "I've followed it." She tilts her head and studies ${f.name} with the frankness of an artist. "The subject kept getting more interesting. Warmer. More to work with." She doesn't mean it meanly.`,
  foodie: (t,f)=>`"You know what I love about your reviews?" ${t.name} says. "The early ones are about precision. The recent ones are about hunger." She watches ${f.name} eat. "The appetite got into the writing. You can feel it. It got into everything, really."`,
  quiet: (t,f)=>`${t.name} watches ${f.name} eat for a long moment, then says: "Do you ever get full?" She sounds like she's asking about something she wants to understand. "Does it just — is there a point where it stops feeling good and you just keep going?"`,
  party: (t,f)=>`"The party photos are a trip," ${t.name} says. "Year one to now." She watches ${f.name} contentedly eat. "That's a really different person by size. Same smile, though. You've always had the same smile." She sounds, nearly, like she means it as a compliment.`,
  bookworm: (t,f)=>`"I've been reading your annotations from the first year," ${t.name} says. "The handwriting is the same. The margins are fuller. The notes take up more space." She watches ${f.name} eat steadily. "Something loosened in you. The scholarship got better when the rest of you did too."`,
  gamer: (t,f)=>`"Your frame rate at semester start," ${t.name} says. "And now." She makes a gesture implying the obvious arithmetic. "Same player. Different hardware entirely." She sounds like she's doing a performance review. She sounds, quietly, impressed.`,
  overachiever: (t,f)=>`"First semester GPA versus current. First semester intake versus current." ${t.name} watches ${f.name} eat. "You solved both problems in the same direction. That's efficient." She sounds like she means this as a compliment. She does.`,
  transfer: (t,f)=>`"When you first got here you were asking where everything was," ${t.name} says. "That map. The confused look." She watches ${f.name} eat with total comfort and ownership. "You figured out the campus." She pauses. "And the dining hall. Especially the dining hall."`,
};

const DIVINE_PAIR_REACTIONS={
  celestial_celestial:[
    (a,b)=>`${a.name} and ${b.name} reach for the same dish at the same moment. The light from both of them intensifies briefly — competing warmths, harmonizing. The food seems to multiply; the server is confused to find the plates fuller than expected. Both of them eat with the ease of beings who expect the world to accommodate them. It does.`,
    (a,b)=>`A warmth fills the table — not metaphorical, actual — as ${a.name} and ${b.name} eat. Students at nearby tables keep glancing over. The air between the two of them has a quality that's hard to look at directly. They share a dish without speaking. Both of them seem, fractionally, to grow.`,
    (a,b)=>`${a.name}'s halo brightens when ${b.name} laughs. ${b.name}'s wings flutter slightly when ${a.name} pushes another course toward her. "You felt that," ${a.name} says. It isn't a question. The divine resonance between them is audible, barely, at the edge of hearing — a warmth that amplifies itself.`,
  ],
  umbral_umbral:[
    (a,b)=>`The temperature at the table drops sharply. ${a.name} and ${b.name} eat in silence, but the silence has a quality — layered, charged, two voids resonating against each other. The dishes empty faster than they should. Both of them seem heavier by the end of each course in a way that the food alone doesn't account for.`,
    (a,b)=>`${a.name}'s shadow reaches toward ${b.name}'s across the tablecloth. Neither acknowledges it. Both of them eat with an intensity that makes the other tables unconsciously quieter. "We're the same," ${b.name} says eventually, without looking up. "We want the same thing." A pause. "More."`,
    (a,b)=>`The lights near the table flicker. ${a.name} notices. ${b.name} notices. Neither says anything. Their void-wings are open slightly, taking up more room than the restaurant accounts for, and both of them are feeding with the focus of creatures that don't have a stopping point and don't want one. The hunger doubles in the presence of its mirror.`,
  ],
  celestial_umbral:[
    (a,b)=>`The air between ${a.name} and ${b.name} is uncomfortable in a specific way — light and cold pulling at each other, warmth and darkness finding edges. Both of them are eating with unusual intensity, as if to fill the tension. The food disappears faster than it should. Neither speaks. Both of them are watching the other from the corners of their eyes.`,
    (a,b)=>`${a.name}'s light flares slightly in the presence of ${b.name}'s void. ${b.name}'s shadow extends toward the warmth without meaning to. They eat in charged parallel — not hostile, not friendly. The waiter approaches and then decides to come back. Something about the table says: not yet.`,
    (a,b)=>`"You feel it too," ${a.name} says. It isn't clear whether she means the food, the warmth, the void, or the weight of being what they are at the same table. ${b.name} eats another bite and doesn't answer. The fact that she doesn't answer is itself an answer. The meal continues. Everything about it is charged.`,
  ],
};

const UNBUTTON_LINES=[
  (s)=>`${s.name} shifts in her seat. There's a small, deliberate movement under the table — a button giving way, the waistband releasing. She exhales. Continues eating.`,
  (s)=>`${s.name} reaches down, adjusts something quietly, and settles deeper into her chair. She looks fractionally more comfortable. She doesn't mention it.`,
  (s)=>`A quiet click from under the table. ${s.name} doesn't look up. She just keeps eating.`,
  (s)=>`${s.name} reaches down with the practiced ease of someone who has done this before, undoes her waistband, and picks up her fork again without comment.`,
  (s)=>`${s.name} pauses, does something discreet under the table, and continues. Her expression doesn't change. The pace of eating does.`,
];

// ═══════════════════════════════════════════════════════════════
// PROFESSOR CHARACTER CREATION
// ═══════════════════════════════════════════════════════════════

const PROF_SUBJECTS=[
  {id:"psychology",label:"Psychology",emoji:"🧠",desc:"You study the mind. The rationalizations, the quiet negotiations people make with themselves — you see the shape of them before anyone else does.",bonus:"Talk actions grant +2 additional relationship. Observe reveals emotional state."},
  {id:"literature",label:"Literature",emoji:"📚",desc:"You read transformation into every text. You recognize a character arc when you're living one — and when you're writing someone else's.",bonus:"+15% relationship from conversation actions. Dinner conversations are richer."},
  {id:"nutrition",label:"Nutrition Science",emoji:"🔬",desc:"The body is your subject. Intake, accumulation, the whole scientific romance of how things change and where they end up.",bonus:"All feeding actions +10% gain. Study check-ins unlock caloric analysis."},
  {id:"art_history",label:"Art History",emoji:"🎨",desc:"You've spent a career teaching people to really look at form. The appreciative eye is a habit by now. You can't turn it off.",bonus:"Observe costs 0 AP. Group dinner jealousy triggers more frequently."},
  {id:"physical_ed",label:"Physical Education",emoji:"🏋️",desc:"Years preaching fitness. There's a particular poetry in what you're doing now. You know exactly where each pound lands.",bonus:"Student weight and stage always visible. Stage transitions unlock unique commentary."},
  {id:"philosophy",label:"Philosophy",emoji:"⚖️",desc:"Everything is relative. Consequence is deferred. You are examining several lives, including your own.",bonus:"+5% all gain actions. Admin scrutiny rises 20% more slowly."},
];

const PROF_TRAITS=[
  {id:"patient",label:"Patient",emoji:"🕰️",desc:"You play a long game. The slow accumulation, the inevitable tipping points — these are more satisfying to you than brute force.",effect:"+2 relationship from every action. Passive gain +1 lb/student/week."},
  {id:"observant",label:"Observant",emoji:"👁️",desc:"Nothing escapes you. Weight stages, how a shirt fits, the slight breathlessness on stairs — you clock all of it, always.",effect:"Student weight always visible. Observe costs 0 AP."},
  {id:"generous",label:"Generous",emoji:"🍽️",desc:"You express care through food. It's almost automatic. The portions are just enthusiastic.",effect:"All feeding actions +15% gain. Dinner fullness +10%."},
  {id:"charismatic",label:"Charismatic",emoji:"✨",desc:"Students listen when you talk. They lean in. They stay for office hours longer than they intended.",effect:"Talk actions grant double relationship. Dinner conversations unlock sooner."},
  {id:"discreet",label:"Discreet",emoji:"🔇",desc:"You're good at making the unusual seem unremarkable. Keeping things quiet is a skill you've honed.",effect:"Admin scrutiny rises 35% more slowly. Research study risk halved."},
];

// ═══════════════════════════════════════════════════════════════
// ADMIN EVENTS
// ═══════════════════════════════════════════════════════════════

const ADMIN_EVENTS=[
  {
    id:"lounge_talk",threshold:25,title:"Faculty Lounge",
    scene:()=>`Dr. Pembrook catches you at the coffee machine. "Good semester?" She fills her mug, not really watching you. "I've been hearing nice things about engagement in your class. Students seem very invested." A pause while she stirs. "Though someone mentioned a few of them have been looking a bit different lately. Dr. Haynes said it's probably just the dining hall." She takes her coffee and goes.`,
    choices:[
      {label:"Agree warmly",delta:0,text:`"It's been a wonderful group," you say. "Very engaged."`},
      {label:"Blame the dining hall",delta:-5,text:`"Campus food does its work," you say. She laughs. Something settles slightly.`},
    ]
  },
  {
    id:"dept_chair",threshold:50,title:"Dean's Office",
    scene:()=>`Dean Holloway's assistant — a crisp young woman who makes appointments feel like verdicts — leaves a note in your mailbox: a brief check-in, Thursday, 2pm. You go. The Dean is warm and precise. She compliments your evaluations — genuinely, it seems. Then: "A few students have mentioned — not complaints exactly. More observations. About how often they socialize with you outside class." She folds her hands. "I want to make sure everyone feels comfortable." She's giving you room to speak.`,
    choices:[
      {label:"Reassure professionally",delta:0,text:`"Mentorship," you say. "These students are genuinely invested in their development." The Dean nods. Something settles.`},
      {label:"Walk her through specifics",delta:-12,text:`Two or three clean, plausible mentorship examples. She seems satisfied. The scrutiny drops noticeably.`},
      {label:"Keep it brief",delta:10,text:`"Everything is fine," you say. Short. She notes it. The scrutiny ticks up.`},
    ]
  },
  {
    id:"irb_inquiry",threshold:65,title:"IRB Inquiry",
    scene:()=>`An email from Dr. Mercer in Compliance at 7am. "It has come to our attention that you may be conducting informal research with students." The language is careful, bureaucratic. "Proper documentation would need to be submitted for review." You look her up: sharp photo, short hair, the smile of someone who files things. They've been talking.`,
    choices:[
      {label:"File paperwork",delta:-8,text:`You spend an afternoon generating plausible documentation. The inquiry quiets.`},
      {label:"Pause the study",delta:-15,text:`You put the formal check-ins on hold. Dr. Mercer stops asking.`},
      {label:"Ignore it",delta:20,text:`You don't respond. The scrutiny builds.`},
    ]
  },
  {
    id:"observer_assigned",threshold:70,title:"Class Observer",
    scene:()=>`An email from HR arrives Tuesday morning: "As part of our ongoing review process, a member of our team will be sitting in on several of your classes over the coming weeks. This is standard procedure." It is not standard. The follow-up arrives within the hour — a name, a start date. Next Monday.`,
    choices:[
      {label:"Accept it",delta:0,text:`"Of course," you reply. You begin to think about Monday.`},
    ],
    spawnsObserver:true,
  },
  {
    id:"formal_review",threshold:80,title:"Formal Review",
    scene:()=>`HR schedules a review. Two of them — a senior analyst in a blazer and her colleague, quieter and watchful — plus a union rep, a compact woman with reading glasses who takes notes but doesn't look at you. They have a folder. The questions are procedural: "Can you describe the nature of your extracurricular contact with students?" The senior analyst watches you with the patience of someone who has done this many times.`,
    choices:[
      {label:"Cooperate fully",delta:-10,text:`You answer every question carefully. The review concludes inconclusively. The scrutiny drops, but the record exists.`},
      {label:"Request representation",delta:5,text:`They postpone. Procedurally correct. But it registers. Scrutiny holds.`},
    ]
  },
  {
    id:"termination",threshold:95,title:"End of Semester",
    scene:()=>`The letter arrives on a Tuesday. "Following a thorough review…" You read it standing in the hallway. Through the window you can see the quad. Three of your students are walking together. One of them is much, much larger than she was in September. She moves carefully through the cold, filling her coat beautifully. She laughs at something, and the laugh travels through her whole body. She has no idea you're watching.`,
    choices:[{label:"Accept it",delta:0,text:`You put the letter in your bag. You'll clear your office this week.`}],
    isGameOver:true,
  },
];

// ═══════════════════════════════════════════════════════════════
// RESEARCH STUDY CHECK-IN SCENES
// ═══════════════════════════════════════════════════════════════

const STUDY_SCENES={
  cheerleader:[
    (s)=>`${s.name} comes in after practice, warm-up jacket still on. She steps on the scale with the mild curiosity of someone being weighed for a physical. ${s.lbs} lbs. She watches you write it down. "So is this for a real paper?" You explain the framework. She nods. You take measurements. When you're done she pulls her jacket down over her waist — a gesture that's new.`,
    (s)=>`The jacket is tighter today. She answers the dietary recall with more detail than before — the late-night orders, the team dinners, the habit of finishing other people's plates because it feels rude not to. When you mention she's up significantly from baseline, she says, "That can't be right." You show her the chart. She stares at it. "Huh," she says finally, in a voice that's somewhere between surprised and not very surprised at all.`,
    (s)=>`She doesn't bother with the jacket today. "I've been thinking about what you said." You didn't say anything — you recorded and listened. Something has been working on her. You note that her squad has shifted her to the back formation; she tells you this without self-pity, and then: "I don't hate how I look, though. Is that weird?" You write it down.`,
    (s)=>`${s.name} arrives slightly breathless from the stairs. She drops into the chair and your notes update themselves: the roundness of her cheeks, the way the desk arm presses into her side. ${s.lbs} lbs. "I tried calorie counting," she says. "For three days. It felt worse than not knowing." She picks up your pen and turns it over. "Can I see the graph again?" She studies it. "That's wild," she says softly.`,
    (s)=>`Final check-in. You go through the protocol. She answers, but she's looking at the window. At the end she asks: "Do you think about us outside this?" You say the data is anonymized. She looks at you. "That's not what I asked." You close your notebook. The study, technically, is complete.`,
  ],
  scholar:[
    (s)=>`${s.name} arrives with a request: can she see the methodology? You explain the longitudinal framework. She listens with focused skepticism. ${s.lbs} lbs — she watches the number with an expression like she's being tested on it. "That's higher than I expected," she says. You ask when she last weighed herself. "Freshman year," she says.`,
    (s)=>`She's done research. She arrives with printed papers — metabolism studies, adipogenesis. "I've been thinking about the mechanisms," she says. You let her talk. It's impressive and slightly defensive and it circles the fact that her clothes are getting tight without quite landing there. ${s.lbs} lbs. "That's consistent with the trend," she says carefully.`,
    (s)=>`"You're not a nutrition researcher," she says today. "Are you." Not quite a question. You hold the silence. She looks at the chart — ${s.lbs} lbs — and then at you. "I'm still participating," she says, after a long moment. "For now."`,
    (s)=>`She's stopped asking methodological questions. She sits, you weigh her — ${s.lbs} lbs — and she watches the pen move. "My advisor says I look different," she says. "I told her I'm in a dietary study. She seemed satisfied with that." The word 'satisfied' sits between you.`,
    (s)=>`Final check-in. She brings coffee for both of you. At the end: "What happens to the data?" Private, you tell her. She nods. "I want a copy of my chart," she says. "For my own reference." You print it. She folds it carefully and puts it in her bag.`,
  ],
  athlete:[
    (s)=>`${s.name} comes straight from the weight room. There's a brief irony in watching her step on the scale. ${s.lbs} lbs. She stares at the number with the look of someone whose relationship with that number was once very tactical. "Okay," she says, to herself. You note: the weight room isn't doing the same work it used to.`,
    (s)=>`She mentions her coach casually, mid-recall: "He said I'm carrying extra. I told him I'm in a study." She looks at you steadily. "He seemed annoyed." You record this. Does any of this go anywhere? she asks. Confidential, you say. She finds this satisfying in a way you don't entirely understand.`,
    (s)=>`${s.name} isn't in athletic wear today — jeans and a soft shirt, and the shirt is doing interesting things. "I dropped the morning run," she says. "I'm sleeping better." ${s.lbs} lbs. She looks at the number. "Huh," she says, and her tone carries something that isn't quite regret.`,
    (s)=>`She's stopped talking about her coach. ${s.lbs} lbs. Equanimity now, where there used to be tactical distance. The posture has changed — she takes up more space without apologizing for it. "I feel better," she says, unprompted. "I know that doesn't make sense." It makes perfect sense. You write it down.`,
    (s)=>`Final check-in, answered from memory, almost rote. At the end: "So what did you find?" You say something truthful and vague. She looks at the window. "I used to weigh myself every day," she says. "Every single day." She doesn't say what she does now. She doesn't have to.`,
  ],
  quiet:[
    (s)=>`${s.name} closes your door behind her without making eye contact with anyone in the hallway. The weigh-in is quiet. ${s.lbs} lbs. She looks at the number for a long moment. Your recall questions get short, accurate answers. "Thank you," she says at the end, and leaves. You look at your notes. There's more there than in any other session you've run.`,
    (s)=>`She notices the chart on the wall. She looks at her line — climbing — for a full minute before you start the paperwork. "Is that a lot?" she asks. You say it's significant. She nods, once. Gets on the scale. ${s.lbs} lbs. Gets off. Sits down. "Okay," she says. You begin the recall.`,
    (s)=>`She arrives today with food — a bag from the bakery, two things. She puts one on your desk without comment and eats hers while you take measurements. ${s.lbs} lbs. She finishes her pastry, brushes crumbs from the front of her shirt — a new shirt, larger than last month's — and says: "Same time next week?"`,
    (s)=>`The chart needs a new scale. She notices and tilts her head. "You need a bigger chart." You agree. ${s.lbs} lbs. Near the end of the recall she says, quietly: "I feel like myself." You look up. She meets your eyes for a moment, then looks away. You write it down verbatim.`,
    (s)=>`Last session. Bakery bag again. Final protocol. When you say it's the last formal check-in, she's quiet. Then: "You can still observe, right? Informally?" You say you can. She nods and goes. The chair is glad to see her — it's been a tight fit for a while now.`,
  ],
  party:[
    (s)=>`${s.name} arrives eleven minutes late, apologetic and slightly breathless. She gets on the scale and says, "Okay, that's a lot," and laughs. A real laugh. "Do I get a gold star?" ${s.lbs} lbs. The recall is thorough and unfazed.`,
    (s)=>`"I weighed myself before I came," she says. She shows you the number on her phone — it matches yours to the pound. "Cool." She has to angle herself slightly to sit with the chair arms, and does this without self-consciousness. She answers the recall like someone who has arranged her feelings about the situation into something close to delight.`,
    (s)=>`She arrives with a café drink and asks if you want anything. Gets on the scale without being asked — "${s.lbs}, write it down" — and sits. "My friends think I'm in a weight loss study," she says. She grins. "I haven't corrected them."`,
    (s)=>`She's wearing a dress that fits her very well right now and won't in another month, and she knows this, and she's wearing it anyway. ${s.lbs} lbs. "The dining hall staff know me by name," she says. "They have my usual ready. I feel great, by the way." You write that down too.`,
    (s)=>`Final check-in. She's brought snacks for both of you. "I don't know, it felt right." At the end: "So what's next?" Formal part is done, you tell her. "Informal still works for me," she says. You hear her greet someone in the hallway, warm and loud and very much herself.`,
  ],
  sorority:[
    (s)=>`${s.name} arrives with the posture of someone treating this like a board meeting. ${s.lbs} lbs. "What does that represent as a trajectory?" You show her the chart. She studies it. "I see," she says. The recall is complete and gives you more context than you asked for, as if she's briefing a committee.`,
    (s)=>`She's made a spreadsheet. Thorough, cross-referenced. You compare it against your recall questions — it matches almost perfectly. "I find it's better to understand a thing than to be surprised by it." Her weight has increased substantially. She is not surprised.`,
    (s)=>`The chapter has apparently had conversations. "Some of the girls have asked about how I look. I told them I'm in a study and everything is fine." Things are, by certain metrics, fine: ${s.lbs} lbs, and something easier about her than there used to be. "I want to see the chart."`,
    (s)=>`Spreadsheet updated through last night. "I've been cross-referencing." ${s.lbs} lbs. She looks at the figures with the satisfaction of someone watching a plan go well. "I've updated the chapter records accordingly." You don't ask what that means.`,
    (s)=>`Final check-in with a formal agenda, three items. Item three: "Discussion of study conclusion and ongoing relationship." "I'd like to continue providing data. Voluntarily. Without the formal structure." You tell her you can discuss that. "Good," she says, and uncrosses her ankles.`,
  ],
  honors:[
    (s)=>`${s.name} arrives five minutes early and waits in the hallway until you open the door. Polite and thorough. ${s.lbs} lbs. At the end: "Is there anything you need me to do differently?" You say no. She seems faintly disappointed, as if she could be performing better.`,
    (s)=>`She has prepared questions. From her phone, in order: "Is the weight gain intentional? Is this related to the dinners? Should I be managing this?" You are somewhat vague. She notes this. ${s.lbs} lbs. She writes the number herself.`,
    (s)=>`She arrives in different clothes — softer, less structured. ${s.lbs} lbs. "I've told my family I'm in a study. My mother said I look healthy." She says this carefully. "She used to say I looked thin."`,
    (s)=>`She brings tea — for both of you. The blazer is gone permanently now. At the end: "I was doing a lot of things because I thought I should. I'm doing fewer of them. I weigh ${s.lbs} lbs and things seem…" She looks for the word. "Fine," she says. "Actually fine."`,
    (s)=>`Final check-in. Tea again. At the end: "Thank you for including me." A pause. "I know what this is." Another pause. "I don't mind." She stands — considerably more than September — and moves with a careful, settled grace, and leaves.`,
  ],
  influencer:[
    (s)=>`${s.name} photographs the scale — "${s.lbs}, okay" — before you've recorded anything. "I've been posting a wellness study series. Very vague. Very aspirational." She has the recall questions memorized. She answers like someone who always knows she's being documented and has decided to be authentic anyway.`,
    (s)=>`Her study diary posts are getting engagement. Comments want to know: is she gaining on purpose? She's saying nothing. "The mystery is the content." ${s.lbs} lbs. She photographs the chart. "It's cropped, don't worry." She describes her eating with the half-awareness of someone who knows she's always being watched.`,
    (s)=>`She turns her phone face-down when she enters. Recall proceeds. At the weigh-in — ${s.lbs} — she looks at the chart and then at you. "Is this what you expected? The rate?" You say the data has been interesting. "Me too," she says.`,
    (s)=>`She shows you a post: herself, before the study and now, overlaid. No captions. The difference is clear and significant, framed in warm, beautiful light. "I've disabled comments. I just wanted to make something honest." ${s.lbs} lbs. You write it down. She watches your face.`,
    (s)=>`Final check-in. She arrives without her phone. At the end: "I want to keep going. Just for me. Not for the account." She leaves the phone on your desk when she goes. A minute later she comes back for it.`,
  ],
  artsy:[
    (s)=>`${s.name} steps on the scale with the air of someone witnessing an art installation — curious, slightly removed. "${s.lbs}," she says, reading it herself. "That's a number." The recall is vivid: flavors, textures, the hour, the quality of the light.`,
    (s)=>`She brings her sketchbook today. While you take measurements she opens it — not to show you, just to have it present. You catch a glimpse: studies. Forms you recognize. "I've been thinking about documentation," she says. "How a thing recorded is different from a thing just experienced."`,
    (s)=>`"I want to see the chart," before you've started. You turn the screen toward her. She looks at the line for a long time. "That's actually beautiful." She means the shape of it, the arc. ${s.lbs} lbs. She traces it with one finger. "What does that feel like, from the inside?" She's asking herself.`,
    (s)=>`She arrives with a canvas bag and a paint smock she's forgotten to remove. The chair makes a quiet sound. ${s.lbs} lbs. "I've been making work about this. About accumulation. The evidence building." She watches your face. "Does that concern you?" You shake your head. "Good," she says, and opens the recall form herself.`,
    (s)=>`Final check-in. She gives you a small print at the end — rolled in a rubber band. You unroll it after she leaves. It's the chart. Her weight gain, traced in charcoal, specific and beautiful. At the bottom: "For the record."`,
  ],
  foodie:[
    (s)=>`${s.name} has a lot to say about her dietary recall. Each item comes with provenance and commentary. You record more than you need to. She weighs ${s.lbs} lbs and accepts the number with the satisfaction of someone watching an investment mature.`,
    (s)=>`She's keeping a narrative journal — not nutritional, but descriptive. She reads you excerpts. It's extraordinary. ${s.lbs} lbs. "This is the most interesting thing I've ever participated in," she says. You agree, though you phrase it differently.`,
    (s)=>`The chair is noticeably snug today, and she notes it with academic interest. "The physical consequences are becoming part of the experience." ${s.lbs} lbs. "My palate is sharper and my frame is considerably less sharp, and I find I don't mind." She pulls out the journal. "Can I read you something?"`,
    (s)=>`She reads you the entry about the first time she noticed the change — week four, the specific dinner where she realized she was past the point of turning back, and found herself, unexpectedly, delighted. ${s.lbs} lbs. "I've been thinking about writing it up properly," she says. "Not for anyone. Just to have."`,
    (s)=>`Final check-in. She brings food — three things, beautifully packed. "I made them. I needed to close the loop." You eat together. At the end: "The study is over." Then, precisely: "My research continues."`,
  ],
};
const STUDY_SCENE_DEFAULT=[
  (s)=>`${s.name} sits across from you. The scale reads ${s.lbs} lbs — you note the number without comment, and she watches the pen move with an expression you're learning to read. The recall is brief and complete.`,
  (s)=>`${s.lbs} lbs. She looks at the chart and then at her own hands on the desk. "It's going somewhere," she says. You ask what she means. She looks at you. "It's going somewhere," she says again, as if the sentence is self-explanatory.`,
  (s)=>`She's wearing different clothes today — larger, softer. ${s.lbs} lbs. She answers the recall fully, without the hesitation of the first session, like someone who has stopped pretending.`,
  (s)=>`${s.lbs} lbs. "Does it ever stop?" she asks. That's one of the things the study is trying to understand, you tell her. She finds this funny. "Right," she says. "The study."`,
  (s)=>`Final session. Gets on the scale — ${s.lbs} lbs — sits, does the recall. At the end: "What happens now?" Formal part is done, you say. She nods. She doesn't ask about the informal part. She already knows.`,
];

// ═══════════════════════════════════════════════════════════════
// HR OBSERVER
// ═══════════════════════════════════════════════════════════════

const HR_OBSERVER_POOL=[
  {name:"Ms. Hargrove",startLbs:149,bodyType:"straight",
   intro:`Ms. Hargrove arrives with a leather portfolio and the manner of someone who has sat in on many classes and found all of them wanting. She takes the chair at the back, uncaps her pen, and begins to write.`},
  {name:"Dr. Ashworth",startLbs:164,bodyType:"hourglass",
   intro:`Dr. Ashworth occupies the back row with the practiced stillness of someone paid to watch. She has a coffee, a folder, and hasn't smiled yet.`},
  {name:"Ms. Pellegrini",startLbs:156,bodyType:"pear",
   intro:`Ms. Pellegrini is younger than you expected — composed, careful, with the slightly too-neutral posture of someone taking this very seriously. She writes down things you wish she wouldn't.`},
];

const HR_DISP_LEVELS=[
  {min:0, label:"Watchful",     color:"#c04040"},
  {min:20,label:"Settling In",  color:"#c07020"},
  {min:40,label:"Comfortable",  color:"#b0a020"},
  {min:65,label:"Sympathetic",  color:"#40a060"},
  {min:80,label:"Your Advocate",color:"#30c070"},
];
const getHrDispLevel=(d)=>[...HR_DISP_LEVELS].reverse().find(l=>d>=l.min)||HR_DISP_LEVELS[0];

const HR_DISP_DESC={
  0: hr=>`${hr.name} is watching the room with professional attention, pen moving steadily. She has accepted nothing from the refreshments.`,
  20:hr=>`${hr.name} accepted a coffee at the start of class. Her notes have gotten less frequent. She looked out the window twice.`,
  40:hr=>`${hr.name} smiled at a student who gave a good answer. She has visited the refreshments. Her jacket is over the back of her chair.`,
  65:hr=>`${hr.name} laughed at something from the front row today. She has eaten considerably. Her portfolio sits unopened. She seems, against her original intentions, to be enjoying herself.`,
  80:hr=>`${hr.name} stayed after the last session to tell you she finds the pedagogy "genuinely innovative." Her skirt was doing interesting things when she stood. You made a note.`,
};
const getHrDispDesc=(hr)=>{
  const key=[80,65,40,20,0].find(k=>hr.disposition>=k);
  return (HR_DISP_DESC[key]||HR_DISP_DESC[0])(hr);
};

const HR_FEED_LINES=[
  hr=>`You set something near ${hr.name}'s end of the table — nothing obvious. She eats it without looking up from her folder. Her pen moves less after that.`,
  hr=>`The spread arrives and you gesture toward ${hr.name}'s side of the room. She hesitates, then takes a plate. Then a second. "I skipped lunch," she says, to no one in particular.`,
  hr=>`${hr.name} drifts toward the refreshments and you catch the moment she decides on the second pastry. She notices you noticing. Neither of you says anything.`,
  hr=>`You pass ${hr.name} a small plate on your way to the board. "Thank you," she says, and she means it. Something shifts fractionally.`,
  hr=>`${hr.name} reaches for the tray you've placed within her reach. You watch the decision happen — the brief pause, the rationalization, the reaching. She eats comfortably, like someone who has stopped resisting something minor.`,
  hr=>`${hr.name} accepts the coffee and the pastry without breaking eye contact with her notes. By the end of class her folder is closed and she has finished everything.`,
];

const HR_TALK_LINES=[
  hr=>`You stop by ${hr.name}'s chair between sections. She's guarded at first — professional, correct. But she relaxes when you ask a genuine question about the process. "It's usually more adversarial than this," she says. A small thing.`,
  hr=>`You sit at the corner of her desk during the break. She closes her folder — she doesn't have to. You talk about the class, the students. She's been doing this eleven years. "It gets predictable," she says. "This isn't."`,
  hr=>`${hr.name} initiates conversation today — a question about one of your students, professionally framed. But it's the first time she's come to you. You answer warmly. Her pen doesn't move.`,
  hr=>`She stays after class, ostensibly finishing notes. You make coffee. She stays for it. The conversation goes somewhere you didn't expect. She's perceptive, interesting, and increasingly comfortable in the chair she's sitting in.`,
  hr=>`${hr.name} mentions, unprompted, a review she ran three years ago where the complaint turned out to be entirely correct. "You're not that," she says. She has eaten considerably this session. Her jacket is on the back of her chair.`,
];

// ── INNER CIRCLE ────────────────────────────────────────────────
const INNER_CIRCLE_TIERS=[
  {id:0,label:"Acquaintance",emoji:"👋",relMin:0,  color:"#503060"},
  {id:1,label:"Close",       emoji:"🤝",relMin:45, color:"#7040a0"},
  {id:2,label:"Intimate",    emoji:"💜",relMin:70, color:"#9050c8"},
  {id:3,label:"Devoted",     emoji:"🖤",relMin:90, color:"#c060ff"},
];
const getTier=(rel)=>[...INNER_CIRCLE_TIERS].reverse().find(t=>rel>=t.relMin)||INNER_CIRCLE_TIERS[0];

const TIER_SCENES={
  cheerleader:[
    s=>`${s.name} stops you after class — not with a question, just to talk. "You're different from other professors," she says. She doesn't elaborate, but she smiles when she leaves. You notice she's started sitting closer to the front.`,
    s=>`She's waiting outside your office when you arrive. Not for anything specific. "I just wanted to talk," she says, already making herself comfortable in the chair across from you. She stays for forty minutes and eats the snacks you have out without asking.`,
    s=>`"I don't really think about it anymore," ${s.name} says one afternoon, smoothing her hands over her enormous thighs with quiet familiarity. "I just know that whatever you suggest is usually right." She leans forward, full of trust. "So what do you suggest?"`,
  ],
  bookworm:[
    s=>`${s.name} starts leaving academic papers on your desk — things she thinks you'll find interesting. Her annotations are in careful handwriting in the margins. You start leaving responses.`,
    s=>`She brings you coffee without asking. Black, the way you take it. You don't remember telling her that. She just knows, the way she knows most things — by watching carefully and making notes.`,
    s=>`${s.name} closes her laptop when you walk in — both of them. "I've been thinking," she says, "that I trust your judgment more than my own on certain things." She says it matter-of-factly, like a research finding. "I wanted you to know that."`,
  ],
  influencer:[
    s=>`${s.name} mentions you in a post — vague, complimentary. "My professor says" something kind. The comments say "you love her." She messages you the link privately: "Thought you'd like that."`,
    s=>`She stops filtering her posts when you're around. "You're one of the only people I can just be with," she says. For her, being unguarded is the intimacy. She doesn't reach for her phone the entire afternoon.`,
    s=>`${s.name} turns down a sponsored deal. "Not aligned," she says. The product was about restriction and she isn't doing that anymore. "You've made me different," she says. "Better, I think."`,
  ],
  athlete:[
    s=>`${s.name} asks if you want to eat together after class — just lunch, nothing formal. She piles the tray high without noticing. "I just figured you'd be heading to eat anyway," she says.`,
    s=>`She calls you just to talk. She does that now. The call goes long. She eats her protein bar and a second one. "You're the only one who gets it," she says eventually.`,
    s=>`${s.name} comes to you first now — for everything. "You're the only one who gets it," she says, dropping her bag and settling into the couch. She takes up a lot of it now. Neither of you mentions it. It's simply how things are.`,
  ],
  artsy:[
    s=>`${s.name} shows you a sketchbook page marked DO NOT SHOW. "But you can," she says. "You're different." The drawing is of her own hands, relaxed, holding something. You think you understand.`,
    s=>`She starts leaving small drawings on your desk. A coffee cup with your initial. A window with rain. They're not signed. She doesn't mention them. You start keeping them.`,
    s=>`"I've been painting us," ${s.name} says, not looking up. On the canvas: a table, two chairs, food, warmth. Her figure is enormous and rendered with obvious tenderness. "It's how I see it. I wanted you to see it too."`,
  ],
  gamer:[
    s=>`${s.name} adds you to her Discord — the small private server, six people total. "Don't make it weird," she says, then talks to you for three hours. "You're actually cool," she finally says, like this surprises her.`,
    s=>`She sends links without context — memes, clips, screenshots. Each one lands exactly right. "I'm just good at people," she says. "You're easy." She's been paying very close attention.`,
    s=>`${s.name} names an NPC after you in a game she's building. "You're the good one," she says. "Always has food, never judges." She shows you the sprite. It's accurate. "I wanted to put you somewhere permanent."`,
  ],
  sorority:[
    s=>`${s.name} introduces you to her closest sisters as "basically family." Casually, like it's established. When you leave she catches your arm. "I meant that," she says quietly. Then back to being loud, as if nothing happened.`,
    s=>`She confides something real — not gossip, something she's actually worried about. She picks at the snacks between sentences. "You're the first person I've told," she says. She finishes the whole plate before she realizes.`,
    s=>`${s.name} quits one of her committees. "The culture wasn't right." She means one of the places that used to make her feel bad about eating. She doesn't say that. You understand anyway. "Things are better now. You're part of that."`,
  ],
  overachiever:[
    s=>`${s.name} asks for your opinion on something academic — not competitively but genuinely. She takes notes. "You think differently than I expected," she says. It might be the most honest compliment she gives anyone.`,
    s=>`She revises her thesis around feedback you gave her in passing. Not for a grade. "I just needed it to be right," she says. She hands you thirty pages. She'd clearly spent a weekend on it. "I trust your judgment."`,
    s=>`${s.name} drops one of her majors. "Three was too many," she says — which everyone has been telling her for two years. "You made me see that." She looks lighter, even though she's heavier. "I want to do fewer things properly."`,
  ],
  quiet:[
    s=>`${s.name} leaves a note on your desk — not a message, just a drawing of a bird she saw on campus. No explanation. It's small and precise and somehow says everything. You put it in a drawer. She notices it's gone. She smiles.`,
    s=>`She starts sitting beside you when she studies, in silence. After a while she says, "I don't usually do this," meaning be close to anyone. "I know," you say. She nods. That's enough.`,
    s=>`${s.name} speaks up in class for the first time — not hesitantly, but with something to say. Afterward she looks at you. Not for approval. Just sharing. "Thank you," she says once, later. She doesn't say for what. You know.`,
  ],
  transfer:[
    s=>`${s.name} stops calling this place temporary. "I think I belong here," she says, surprised. You've noticed her routes on campus have changed — longer, more comfortable, lingering. "It's because of you, partly," she says.`,
    s=>`She brings you food from a restaurant she found, just leaving it with a note: "You have to try this." Local, generous, good. She takes you there herself the following week. "This is home now," she says. She means it.`,
    s=>`${s.name} applies for permanent residency in the city. "I'm staying," she says, like it's the simplest thing. She's grown into this place in every way — rounder, slower, easier in her skin. "Why would I leave?"`,
  ],
};

// ── PROFESSOR VAUGHAN ───────────────────────────────────────────
const VAUGHAN_BASE={
  name:"Dr. Elaine Vaughan",
  dept:"Wellness & Kinesiology",
  startLbs:134,
  bodyType:"athletic",
  intro:`Dr. Vaughan passes you in the corridor — compact, purposeful, the kind of person who still runs at 6am. Her eyes move to your classroom door as she passes. She says nothing. But she looked.`,
};

const VAUGHAN_EVENTS=[
  {id:"first_glance",suspicion:20,title:"A Colleague Takes Notice",
   scene:()=>`Dr. Vaughan catches you in the faculty corridor. "Professor," she says — just the word, with a tone you can't quite read. She continues walking. But she looked first, at your classroom door.`,
   choices:[
     {label:"Nod professionally",delta:0,text:"You nod. Nothing to see here."},
     {label:"Strike up conversation",vDelta:-8,text:"Easy, collegial. She relaxes. Slightly."},
   ]},
  {id:"direct_question",suspicion:40,title:"Direct Question",
   scene:()=>`Dr. Vaughan appears at your office door. "Student health metrics from my department are showing anomalies," she says. "I've been hearing things about your classroom environment." She watches you closely.`,
   choices:[
     {label:"Deflect professionally",delta:3,text:"You redirect. She writes something down."},
     {label:"Invite her to observe",vDelta:-15,delta:-8,text:"Openness disarms her — for now."},
     {label:"Challenge her data",delta:8,vDelta:10,text:"Her expression hardens."},
   ]},
  {id:"formal_concern",suspicion:60,title:"Formal Concern",
   scene:()=>`Dr. Vaughan has submitted a written memo to the faculty council. "I have a professional responsibility," she says when you confront her. "What's happening in your classroom is not normal. Not physically."`,
   choices:[
     {label:"Call it coincidence",delta:5,text:"She doesn't believe you. She can't prove otherwise. Yet."},
     {label:"Thank her sincerely",delta:-8,vDelta:-12,text:"Graciousness confounds her. She retreats for now."},
   ]},
  {id:"turning_point",suspicion:80,title:"She Knows",
   scene:()=>`Dr. Vaughan corners you privately. "I know what you're doing," she says. But she looks different — her blazer fits differently. She's been spending time at your students' table in the dining hall. "I should report you," she says. She hasn't.`,
   choices:[
     {label:"Tell her the truth",vDelta:20,text:"You speak plainly. She listens. Something in her goes very still."},
     {label:"Offer her dinner",vDelta:25,text:"The same invitation you extend your students. She hesitates. Then: yes."},
     {label:"Call her bluff",delta:15,text:"She blinks. Doesn't move. You both know she won't."},
   ]},
];

const VAUGHAN_WEIGHT_SCENES=[
  {minLbs:145,scene:v=>`Dr. Vaughan's blazer doesn't button all the way today. She doesn't mention it. You don't mention it. But you both notice.`},
  {minLbs:162,scene:v=>`${v.name} has stopped eating salads at faculty events. Today she had the pasta. Twice. She caught your eye across the room and looked away first.`},
  {minLbs:180,scene:v=>`${v.name} has gained visibly — enough that colleagues are talking. The athletic frame is still there under a generous new softness. In her wellness curriculum, she now mentions "metabolism" with less certainty than before.`},
  {minLbs:200,scene:v=>`${v.name} submitted a modified wellness curriculum this semester — less emphasis on weight metrics. "Bodies are more complex than the data suggests," she wrote. She has begun sitting with your students at lunch. They like her.`},
  {minLbs:230,scene:v=>`${v.name} has stopped wearing her department polo. She favours loose blouses now, the kind that flow over her belly and hips without commenting on them. In the faculty meeting she takes a wider chair without looking around first. Her students have noticed she's "more chill" this semester. Her approval ratings are the highest they've ever been.`},
  {minLbs:265,scene:v=>`${v.name} runs into you in the corridor and you both stop. She looks different — genuinely, substantially different. Her face is rounder, her middle a real presence beneath her cardigan, her hips wide and unhurried. She notices you noticing. "I know," she says, before you can say anything. "I really don't mind," she adds, and the remarkable thing is that she's telling the truth.`},
  {minLbs:310,scene:v=>`${v.name}'s Wellness & Kinesiology course has a new unit this semester: Body Autonomy and Nutritional Joy. The course description emphasises "movement as celebration rather than correction" and "abundance-positive approaches to nutrition." Half the faculty think she's had a breakdown. The students are enrolling in record numbers.`},
  {minLbs:360,scene:v=>`Dr. Vaughan finds you after a faculty meeting. She has become — there is no other word — enormous. Round and soft and enormous, filling her chair with real authority, walking with the deliberate ease of someone who has made peace with every inch of themselves. "I've been thinking," she says, settling heavily into the seat across from you, "that I owe you an apology. And possibly a thank you." She opens her bag and produces a container of something homemade. "I've been cooking more," she adds. "Try it."`,},
  {minLbs:400,scene:v=>`${v.name} announces she's writing a book. The working title, she mentions at the department social — from the largest chair, which she has quietly begun reserving in advance — is "Against Metrics: A Wellness Practitioner's Reconsideration." She looks extraordinary: vast and unhurried and completely at home in her body. She pours herself a second glass of wine and settles deeper into her chair. "You should write the foreword," she tells you. "You started this."`,},
];

const VAUGHAN_ALLY_SCENE=v=>`${v.name} appears at your door with a bottle of wine and a slightly defensive expression. "This is not an endorsement of your methods," she says, setting it down. "It's a professional reconciliation." She has changed enormously. The uniform is gone, replaced by something looser. She fills the chair completely. "What you've built here," she says finally, "is something I can't call wrong." She pours two glasses without asking. "So I've stopped trying."`;

// ── SOCIAL EVENTS ───────────────────────────────────────────────
const SOCIAL_EVENTS=[
  {id:"study_hall",    label:"📚 Study Hall",        apCost:1,minStudents:2,maxStudents:6,
   baseGain:[2,5],relBonus:4,scrutinyAdd:1,
   desc:"Host a study session. Snacks are mandatory. The work is the pretext.",
   scene:(names,gain)=>`The study hall fills slowly. Books open, but the food comes out first. ${names} spread out across the table, comfortable and unhurried. By the end, about ${gain} lbs each — and the notes are surprisingly good.`,
   vaughanEffect:-3,observerGain:[1,1],observerDisp:3},
  {id:"dept_social",   label:"🥂 Department Social", apCost:2,minStudents:3,maxStudents:8,
   baseGain:[3,7],relBonus:6,scrutinyAdd:3,
   desc:"Faculty mixer. Your students attend. The platters empty. The atmosphere warms.",
   scene:(names,gain)=>`The social is exactly as these things always are — too much food, too much wine. ${names} cluster together and call you over. The platters near your group empty first. No one else seems to notice.`,
   vaughanEffect:-5,observerGain:[1,2],observerDisp:6,vaughanAttends:true},
  {id:"field_trip",    label:"🚌 Field Trip",         apCost:2,minStudents:2,maxStudents:6,
   baseGain:[4,8],relBonus:5,scrutinyAdd:2,
   desc:"Campus excursion. Officially about education. Unofficially about the three-hour lunch.",
   scene:(names,gain)=>`The field trip is officially about the museum. Unofficially, it's about the restaurant two blocks away. ${names} occupy an entire table. Nobody stops at one course. The museum is viewed briefly, on the way back, with full contentment.`,
   vaughanEffect:0,observerGain:[1,2],observerDisp:5},
  {id:"game_night",    label:"🎲 Game Night",         apCost:1,minStudents:2,maxStudents:5,
   baseGain:[3,6],relBonus:7,scrutinyAdd:1,
   desc:"Games, snacks, no pressure. The most natural feeding context there is.",
   scene:(names,gain)=>`Nobody remembers what games they played. They remember the food — the enormous spread that appeared and disappeared over four hours while ${names} laughed and argued. The scores are meaningless. The calories are not.`,
   vaughanEffect:-2,observerGain:[1,2],observerDisp:4},
  {id:"symposium",     label:"🎓 Symposium",          apCost:2,minStudents:3,maxStudents:10,
   baseGain:[5,9],relBonus:5,scrutinyAdd:4,
   desc:"Academic event with catering that is decidedly informal. Everyone overeats at symposiums.",
   scene:(names,gain)=>`The symposium is notionally about pedagogy. In practice, a three-hour catered event with an open bar and a chef who overestimated attendance. ${names} benefit enormously from this miscalculation. The talks are good. The food is better.`,
   vaughanEffect:-8,observerGain:[2,3],observerDisp:8,vaughanAttends:true},
  {id:"house_dinner",  label:"🏡 House Dinner",       apCost:3,minStudents:2,maxStudents:5,
   baseGain:[8,14],relBonus:9,scrutinyAdd:2,
   desc:"An evening at yours. You cook. There is no restraint built into this format.",
   scene:(names,gain)=>`Your home is warm and smells like cooking before they arrive. ${names} fill your kitchen and your evening completely. The food comes in waves — you keep bringing it. Nobody declines anything. By the end the conversation is slow and easy, the way it gets when everyone is genuinely full.`,
   vaughanEffect:0,observerGain:[3,4],observerDisp:10},
  {id:"banquet",       label:"🍾 End-of-Term Banquet",apCost:4,minStudents:4,maxStudents:15,
   baseGain:[10,18],relBonus:10,scrutinyAdd:6,
   desc:"The whole class. Maximum scale, maximum impact.",
   scene:(names,gain)=>`The banquet hall is yours for the evening. All your students arrive dressed for the occasion. The courses are formal, the portions architectural. By the final course the room is notably different: louder, looser, rounder, happier. You refill every glass and call for more food twice.`,
   vaughanEffect:-12,observerGain:[4,5],observerDisp:15,vaughanAttends:true},
];

// ── PRIVATE SESSIONS ─────────────────────────────────────────────
const PRIVATE_VENUES=[
  {id:"office",    label:"🏢 After Hours — Office", minTier:1,
   desc:"The building empties by evening. You order in. The door is locked. Time is not a factor.",
   intro:s=>`${s.name} arrives after the last light in the corridor goes out. She looks at what you've laid out and her expression changes — something quiet and wanting settling over her. "You planned this," she says. It isn't a question.`},
  {id:"apartment", label:"🏡 Your Apartment",       minTier:2,
   desc:"Your kitchen, your rules. No pretense, no schedule. Just food and time.",
   intro:s=>`You've been cooking since the afternoon. When ${s.name} arrives she stands in the doorway and breathes in. "It smells incredible," she says, and you can already see what's going to happen.`},
  {id:"her_space", label:"🛋️ Her Place",             minTier:3,
   desc:"Her territory. She is fully comfortable, there are snacks everywhere, and she never has to hold back.",
   intro:s=>`You bring the food to ${s.name} this time. She opens the door in her most comfortable clothes — the ones she only wears when she doesn't care. Which, increasingly, is most of the time.`},
];

const PRIVATE_FOODS=[
  {id:"pr_board",      label:"Charcuterie & Bread",     course:"opener",  gain:[2,4], fullness:14, desc:"A generous spread to start — cured meats, three cheeses, warm bread. Just to get things moving."},
  {id:"pr_soup",       label:"Rich Cream Soup",          course:"opener",  gain:[2,3], fullness:12, desc:"Thick, warm, deeply satisfying. The bread goes straight into it."},
  {id:"pr_bruschetta", label:"Bruschetta Tower",         course:"opener",  gain:[1,3], fullness:10, desc:"Piled high with everything. She eats half before she realises she's doing it."},
  {id:"pr_pasta",      label:"Four-Cheese Pasta",        course:"main",    gain:[5,8], fullness:32, desc:"You've made enough for three people. She doesn't know that yet."},
  {id:"pr_risotto",    label:"Truffle Risotto",          course:"main",    gain:[4,7], fullness:28, desc:"An enormous bowl. Deeply rich. She works through it steadily, in the way she's learned."},
  {id:"pr_roast",      label:"Slow Roast & Three Sides", course:"main",    gain:[5,9], fullness:36, desc:"A full roast with everything. The kind of meal that sits heavily even on an empty stomach."},
  {id:"pr_burger",     label:"Double Stack Burger",      course:"main",    gain:[4,7], fullness:26, desc:"Built to an architectural height. Fries already in her hand before it lands."},
  {id:"pr_more_pasta", label:"Second Serving",           course:"more",    gain:[4,6], fullness:22, desc:"The pot isn't empty. She looks at it. You look at her. She holds out her bowl."},
  {id:"pr_bread",      label:"Warm Bread Basket",        course:"more",    gain:[2,4], fullness:14, desc:"Butter. Always more butter. She doesn't argue."},
  {id:"pr_sides",      label:"Extra Sides Plate",        course:"more",    gain:[3,5], fullness:18, desc:"Everything that was on the side of the main, now in a bowl, now in front of her."},
  {id:"pr_cake",       label:"Full Chocolate Cake",      course:"dessert", gain:[3,6], fullness:22, desc:"Not a slice. A cake. She stares at it. Then she picks up a fork."},
  {id:"pr_icecream",   label:"Ice Cream Sundae",         course:"dessert", gain:[2,5], fullness:16, desc:"Four scoops. Multiple sauces. Whipped cream. She does not hesitate."},
  {id:"pr_brownie",    label:"Warm Brownie & Cream",     course:"dessert", gain:[2,4], fullness:14, desc:"Warm, dense, impossibly rich. She eats every crumb."},
  {id:"pr_mille",      label:"Mille-Feuille",            course:"dessert", gain:[2,4], fullness:14, desc:"Layers and layers of pastry and cream. The chef called it indulgent. They weren't wrong."},
  {id:"pr_snack_tray", label:"Late-Night Snack Tray",    course:"extra",   gain:[2,5], fullness:16, desc:"More food, no explanation needed. She's stopped asking questions."},
  {id:"pr_wine_cheese",label:"Wine & Cheese",            course:"extra",   gain:[2,4], fullness:12, desc:"It pairs well with everything she's already eaten. She agrees."},
  {id:"pr_chocolates", label:"Box of Chocolates",        course:"extra",   gain:[1,4], fullness:10, desc:"She doesn't even pick them up one at a time anymore."},
];

const SESSION_FULLNESS_STAGES=[
  {id:0, label:"Comfortable",       range:[0,  40],  color:"#30a060"},
  {id:1, label:"Warm & Full",       range:[40, 70],  color:"#909030"},
  {id:2, label:"Genuinely Full",    range:[70, 95],  color:"#c06020"},
  {id:3, label:"Stuffed",           range:[95, 120], color:"#c02020"},
  {id:4, label:"Overfull",          range:[120,155], color:"#900020"},
  {id:5, label:"Absolutely Packed", range:[155,999], color:"#500010"},
];
const getFullnessStage=(pct)=>[...SESSION_FULLNESS_STAGES].reverse().find(s=>pct>=s.range[0])||SESSION_FULLNESS_STAGES[0];

const SESSION_FULLNESS_DESCS={
  default:[
    s=>`${s.name} is eating easily, comfortably. She has barely started.`,
    s=>`A warmth spreading through her middle. She's been eating a while now, but she's not stopping.`,
    s=>`${s.name} is genuinely full. You can see it — the way she slows slightly, breathes a little heavier. She's eating anyway.`,
    s=>`Her belly is firm and round and very full. She presses her hand briefly against it and then picks her fork back up. "I'm okay," she says, to herself as much as to you.`,
    s=>`She is past full — has been past full for some time. Her belly sits heavily in her lap and her movements have gone slow and deliberate. She takes a breath between each bite. She doesn't stop.`,
    s=>`${s.name} has eaten an extraordinary amount. Her middle is enormous with it — round and tight and warm. She finishes the bite she's on and rests back, hands pressed softly against herself. "I can't believe I ate all of that," she says. She sounds genuinely impressed.`,
  ],
  cheerleader:[
    s=>`${s.name} eats efficiently, like everything she does. Good posture. Squad mentality: commit fully.`,
    s=>`Her cheeks are rosy. She was talking between bites but slower now, more focused on the food than the conversation.`,
    s=>`She's full enough that she's stopped pretending she isn't. Her shirt has ridden up slightly. She pulls it down. Then reaches for more.`,
    s=>`"Okay, I'm pretty full," ${s.name} says. She does not stop eating. The captain finishes what she starts.`,
    s=>`She is visibly overfull. Her belly presses forward, round and taut. She sits straighter to give herself room, which doesn't help. She takes another bite.`,
    s=>`${s.name} sets her fork down for a long moment, both hands resting on the enormous swell of her belly. Then she picks the fork back up. "I'm not done," she says. It sounds like a practice affirmation.`,
  ],
  bookworm:[
    s=>`${s.name} is cross-legged beside her book, eating the way she reads — thoroughly and without looking up.`,
    s=>`She's stopped reading. She's just eating now. Focused, methodical. The book is closed.`,
    s=>`"I've consumed," ${s.name} says precisely, gesturing at her plate, "a non-trivial quantity of food." She keeps eating. Documenting the phenomenon from the inside.`,
    s=>`She is studying her own fullness with the same attention she gives everything else. Pressing her fingers against her stomach. "It's interesting," she says. "Biologically speaking." She takes another bite.`,
    s=>`${s.name} has set aside the scientific detachment. She is simply full, and still eating, and has stopped justifying it.`,
    s=>`She rests her head back and stays still. Then: "I want to note that my previous understanding of my own capacity was clearly incomplete." She has another piece of cake.`,
  ],
  athlete:[
    s=>`${s.name} eats fast — fuel, not pleasure. Making up for it in quantity.`,
    s=>`Halfway through and already breathing differently. Not exertion. She notices. Doesn't say anything.`,
    s=>`"This is a lot of food," she says, without criticism. She finishes the plate and looks at the next one. "Okay."`,
    s=>`She's full the way she used to be after long training sessions — that specific heavy, settled fullness she now recognises from a very different context.`,
    s=>`${s.name} is well past her old limits, and her old limits were genuinely impressive. She keeps going with the grim determination of someone finishing a race.`,
    s=>`She is done. Completely, spectacularly done — belly warm and round, she doesn't move for several minutes. "Okay," she says finally. "I see why you keep doing this."`,
  ],
  influencer:[
    s=>`${s.name} has stopped filming. She eats privately when she eats like this. You are the only audience.`,
    s=>`Her eyes close sometimes between bites. She is genuinely enjoying this in a way that doesn't translate to content.`,
    s=>`"Don't document this," she says, without hostility. You aren't. She eats her enormous plate naturally, without any persona.`,
    s=>`She is full and she looks it and she has long since stopped caring about any of that. "God," she says, "this is good." She means the eating as much as the food.`,
    s=>`${s.name} has abandoned every trained instinct about portion size and imagery. She is simply, enormously, contentedly eating.`,
    s=>`She is sprawled slightly, her bloated middle pressing visibly against her top, and she has the expression of someone who has just discovered something important. "This is who I actually am," she says.`,
  ],
  gamer:[
    s=>`${s.name} eats one-handed. Efficient. She's been doing this for years.`,
    s=>`Both hands on the food now. Too full for multitasking.`,
    s=>`"I don't usually eat this much at once," she says, eating this much at once. "Usually it's spread out over twelve hours."`,
    s=>`She has gone quiet and focused — the specific way she gets during difficult sections. She is not going to lose this.`,
    s=>`${s.name} is breathing through her mouth slightly. Her belly is visibly round, pressing the table edge. She adjusts, keeps eating.`,
    s=>`She rests her controller on her enormous middle — it fits perfectly there, which makes her laugh quietly. "New setup," she says.`,
  ],
  quiet:[
    s=>`${s.name} eats in the comfortable silence she prefers. She is very much in her element.`,
    s=>`She doesn't say anything. She doesn't need to. She just eats.`,
    s=>`She presses her hand against her belly once — not checking, just feeling. Then she keeps eating.`,
    s=>`"I'm full," ${s.name} says quietly. A pause. "Keep going?" She means: will you keep feeding her. The answer is yes.`,
    s=>`She has found a rhythm in being overfull. Slow, careful bites. Long pauses that aren't stopping. She trusts you to know.`,
    s=>`${s.name} sits with her hands resting on her round, full belly, in a silence that is completely comfortable. "Thank you," she says eventually. She means a lot of things at once.`,
  ],
  sorority:[
    s=>`${s.name} eats comfortably, the way she does at every party — like she's exactly where she should be.`,
    s=>`She's starting to slow, but she keeps up a running commentary about the food. Every bite gets a verdict. All verdicts are positive.`,
    s=>`"Okay this is genuinely a lot," she says. She takes another bite. "Like genuinely a lot." Another bite. "Amazing though."`,
    s=>`Her belly is noticeably round now and pressing at her waistband. She undoes the top button of her jeans without comment. "So much better," she announces.`,
    s=>`${s.name} is in deeply committed territory. Her belly is enormous and round and she keeps patting it absently between bites like she's checking in with it.`,
    s=>`She has eaten everything. She is enormous with it. She puts both hands flat on her huge belly and grins. "Okay," she says, "this might be my best night."`,
  ],
  artsy:[
    s=>`${s.name} eats slowly, with attention — the way she experiences everything. She is tasting each bite properly.`,
    s=>`She's gone quiet in a particular way, the way she gets when she's absorbing something. The food is its own kind of sensation.`,
    s=>`"This is very good," she says, with the precision of someone who means the experience, not just the food. She keeps eating.`,
    s=>`Her belly is soft and round and she rests her hand on it like a subject she's considering painting. She keeps eating with the other hand.`,
    s=>`${s.name} has found something in this — she eats overfull with a kind of intense, interior focus, like she's inside a feeling she wants to understand completely.`,
    s=>`She is still for a long time after. Both hands on her enormous full belly. "I want to paint this," she says quietly. "Not me. This. This feeling."`,
  ],
  overachiever:[
    s=>`${s.name} has made a list of what she's eating. Nutritional content. Macros. She is eating it all anyway.`,
    s=>`She has abandoned the list. She is just eating now. This counts as self-care. She has decided.`,
    s=>`"I have consumed significantly more than my target intake," ${s.name} announces. She reaches for more. "Adjusting the target upward."`,
    s=>`She is full in a way that would alarm her previous self. She checks in with herself, adjusts her assessment of what she can handle, and keeps going.`,
    s=>`${s.name} is overfull by any metric and she knows every metric. She has simply decided the metrics don't apply tonight.`,
    s=>`She rests back and breathes carefully, both hands on her vast, tight belly. "New personal record," she says. "I'm going to count this as an achievement."`,
  ],
  transfer:[
    s=>`${s.name} eats with the enthusiasm of someone who has discovered something wonderful about this campus.`,
    s=>`"We didn't have anything like this back home," she says, taking another enormous bite. "I mean we had food. Not like this."`,
    s=>`She is full and she keeps going, the way she approaches everything new here — thoroughly, without reservation.`,
    s=>`Her belly is round and soft and she pats it happily. "I'm so glad I transferred," she says. She means many things at once.`,
    s=>`${s.name} is seriously, impressively full and she keeps eating with the dedication of someone who doesn't want to miss anything.`,
    s=>`She is enormous with food and deeply, completely happy about it. "I feel like I'm home," she says. It's unclear whether she means here or in her body. Both, probably.`,
  ],
};

const ENCOURAGEMENT_ACTIONS=[
  {id:"enc_praise",    label:"\"You're doing so well\"",
   line:(s,fPct)=>fPct<70
     ?`"You're doing so well," you say. ${s.name} looks up at you — pleased and a little distracted from her fullness — and keeps eating.`
     :`"You're doing so well," you say. ${s.name} lets out a slow breath. "I feel like I'm going to burst," she says. She takes another bite. "Keep saying that."`,
   toleranceBoost:12, relBonus:2, lbsBonus:[0,1]},
  {id:"enc_body",      label:"Tell her how she looks",
   line:(s,fPct)=>fPct<90
     ?`You describe what you see. ${s.name} goes still for a moment, then something in her posture changes — she takes up more space, holds herself more fully. She eats with more confidence.`
     :`You describe exactly what she looks like right now — full and round and warm and impossibly appealing. ${s.name}'s expression goes soft. "Keep watching," she says. She keeps eating.`,
   toleranceBoost:18, relBonus:4, lbsBonus:[1,2]},
  {id:"enc_just_more", label:"\"Just a little more\"",
   line:(s,fPct)=>fPct<95
     ?`"Just a little more," you say. ${s.name} raises an eyebrow, then reaches for the food. The little more is considerably more than a little.`
     :`"Just a little more," you say. ${s.name} gives you a long look. Her belly is round and full and enormous. "You always say that," she says. She eats the little more.`,
   toleranceBoost:8, relBonus:2, lbsBonus:[1,3]},
  {id:"enc_made_you",  label:"\"I made this for you\"",
   line:(s,fPct)=>`"I made this specifically for you," you say. ${s.name} looks at the food differently now — something shifts. She eats it. She always eats what you've made for her.`,
   toleranceBoost:22, relBonus:4, lbsBonus:[1,2]},
  {id:"enc_beautiful", label:"\"Your body is beautiful\"",
   line:(s,fPct)=>fPct<100
     ?`You tell her how beautiful she is right now. She blinks. Then she keeps eating, with something more settled in her expression. She believes you.`
     :`You tell her exactly how beautiful she is — how full and round and present she is in her body right now. ${s.name} closes her eyes. "I know," she says. Her hand rests on her belly. She reaches for more.`,
   toleranceBoost:25, relBonus:6, lbsBonus:[0,2]},
  {id:"enc_belly",     label:"Describe her belly to her",
   line:(s,fPct)=>fPct<80
     ?`You describe the soft, gentle swell of her belly — how it's grown through the meal, how warm and round it looks. ${s.name}'s cheeks colour. She doesn't stop eating.`
     :`You describe her belly carefully and specifically — the roundness, the firmness, the way it sits in her lap with real weight. ${s.name} looks down at herself. Then at you. "You really see it," she says. She keeps eating, slower now, like she's savouring both things at once.`,
   toleranceBoost:20, relBonus:5, lbsBonus:[0,2]},
];

const SESSION_AFTERMATH=[
  {key:"light", maxPct:60,
   scene:(s)=>`${s.name} is full and comfortable and loose-limbed with it. She eats the last few bites slowly, without urgency. "I'm glad I came," she says. You both know this will happen again.`},
  {key:"full",  maxPct:95,
   scene:(s)=>`${s.name} leans back and stays back, both hands resting on her full, round belly. She breathes carefully. "I can't move," she says. She doesn't try. Eventually you cover her with a blanket and let her sleep where she's sitting.`},
  {key:"stuffed",maxPct:140,
   scene:(s)=>`${s.name} has gone very still, the way people do when they're genuinely, spectacularly full. Her belly is a round, warm mass. She presses her hands flat against it. "I ate everything," she says, in quiet wonder. "I always eat everything." She sounds glad.`},
  {key:"packed", maxPct:999,
   scene:(s)=>`You don't speak for a while. ${s.name} is enormous with food — her belly rounded and firm and extraordinary. She keeps her hands on it, feeling its weight, its warmth, its absoluteness. "This is what I want," she says eventually. It's not clear if she means the food or something bigger. You think maybe both.`},
];
const getAftermath=(fPct)=>SESSION_AFTERMATH.find(a=>fPct<=a.maxPct)||SESSION_AFTERMATH[SESSION_AFTERMATH.length-1];

const TAP_OUT_DIALOGUE = {
  0: [  // Brittany
    (s) => `${s.name} presses both hands flat against her middle and her eyes go wide, like she's been ambushed by her own body. "Okay. Okay, that's — I'm tapping out, I'm literally tapping out, that doesn't happen to me." She says it with competitive outrage, like her stomach has personally betrayed her.`,
    (s) => `${s.name} sits back heavily, breathing through her nose, one hand splayed over the round curve of her belly. "I know my limits now and this is past them." She says it with more dignity than the situation requires, which is very on-brand. "I'm calling it. Don't look at me like that."`,
    (s) => `${s.name} exhales slowly, settling back into the cushions like someone surrendering a war they picked themselves. "Okay. Done. I'm done." She presses her belly with both hands to confirm the obvious. "That's a record and I'm claiming it and also I need to not move for a while."`,
    (s) => `${s.name} holds up one hand — flat, authoritative, squad-captain energy even now. "I'm calling it." Her enormous belly rises and falls with careful breaths. "I know exactly what I'm doing and what I'm doing right now is stopping, and that is a choice, not a defeat." A beat. "I'm going to need to lie down."`,
  ],
  1: [  // Madeline
    (s) => `${s.name} sets down her fork with precise, deliberate care. "I need to note that I have reached an empirically verifiable limit." She presses her fingers against the tight round swell of her belly. "This is data. I am logging it. The session is over."`,
    (s) => `${s.name} folds her hands on the table in a way that says she is being very professional about this. "My capacity has been exceeded by a statistically significant margin." She breathes carefully. "I'm calling the session. I want it on record that I held out considerably longer than I anticipated."`,
    (s) => `${s.name} looks at her belly with the expression she reserves for a very compelling dataset. "I've exceeded my own documented baseline by approximately — " she pauses to calculate, which is impressive given the circumstances " — a lot." She exhales. "Stopping now. The numbers are extraordinary. I'm going to lie very still and think about them."`,
    (s) => `${s.name} closes her eyes briefly. "The threshold has been passed. Considerably." She rests both hands on her massive, taut belly with scholarly calm. "I want to note that this outcome represents a personal record and I intend to write a very thorough summary." She opens her eyes. "After I stop moving. Which is now."`,
  ],
  2: [  // Kylie
    (s) => `${s.name} puts down her fork and immediately reaches for her phone — then stops, because actually she cannot hold the phone at that angle right now, her stomach is in the way. "Okay. Tapping out." She sounds more surprised than anything. "That's actually — that's a lot of content in there. I need a minute."`,
    (s) => `${s.name} presses her hand against her bloated middle and makes the face of someone recalculating a very important metric. "My engagement rate when I look like this is insane but I also genuinely cannot eat another bite." She breathes slowly. "Calling it. We got the content. I need to horizontal."`,
    (s) => `${s.name} leans back and surveys the situation with the practiced eye of someone who has documented many extreme eating moments. "Okay. That is a look." She presses both hands to the enormous, straining curve of her belly. "We are done for tonight. My body is giving me very clear analytics right now and they say stop."`,
    (s) => `${s.name} holds up a hand. "Done. I'm done." She takes a slow, careful breath over the vast swell of her stomach. "The numbers on my body right now are unreal and I am choosing to appreciate them from a horizontal position." She reaches for her phone with the other hand. "Someone's going to need to help me up eventually. Not yet though."`,
  ],
  3: [  // Serena
    (s) => `${s.name} goes quiet in the way she used to go quiet at the end of a brutal interval set — body accounting for itself. "I'm tapping out." She says it simply, hands on her tight, distended belly. "I've hit my wall. I know what hitting my wall feels like. This is it."`,
    (s) => `${s.name} breathes through her mouth for a moment, slow and controlled, like she's managing something. "Okay. My body is done." She presses her palm flat against her full, round stomach. "I trained long enough to know when to call it. Calling it." She leans back carefully. "Good session though."`,
    (s) => `${s.name} rests both hands on the wide swell of her belly with the focused attention of someone monitoring an important gauge. "I'm past threshold." She exhales steadily. "I spent years ignoring my body's signals. I don't do that anymore." She meets your eyes. "It's saying stop. I'm stopping."`,
    (s) => `${s.name} sits with the particular stillness of a large, powerful body that has reached its absolute limit — no drama, no protest, just the settled authority of a woman who knows herself very well. "That's it for me," she says. Her enormous belly presses firmly against her palms. "I know this feeling. I've earned this feeling. We're done."`,
  ],
  4: [  // Fiona
    (s) => `${s.name} goes very still, eyes unfocusing slightly, like she's listening to something interior. "I think — " She presses a hand to her full, round belly. "I think I'm at my absolute edge." She sounds almost reverent. "There's no more space. That's — that's a complete feeling. I need to stop."`,
    (s) => `${s.name} closes her eyes and breathes very slowly. "My body has become a kind of still life," she says softly. "Everything full and heavy and finished." She rests both hands on the warm curve of her stomach. "I can't continue. I don't want to ruin it." She exhales. "This is the end of it."`,
    (s) => `${s.name} is quiet for a long moment, both hands moving slowly over the enormous swell of her belly like she's mapping it. "There's a point," she says finally, "where fullness becomes its own complete thing. A form." She looks up. "I'm there. I'm absolutely there. I need to stop and just be in it."`,
    (s) => `${s.name} breathes in slowly, the expansion visibly limited by the vast, round mass of her belly, and then out even slower. "That's all I have," she says, with the quiet finality of a completed work. "I am entirely full. Every single part of me." She doesn't move. "I just need to exist in this for a while. The session is over."`,
  ],
  5: [  // Destiny
    (s) => `${s.name} puts her fork down. Looks at her stomach. Looks at you. "I'm tapping out." She says it with zero inflection. "My body has made a unilateral decision and I'm respecting the process." She reclines approximately two inches, which is all she can manage. "This is fine."`,
    (s) => `${s.name} stops eating mid-bite, considers the situation, and sets the food down with the energy of someone closing a tab. "Done," she says. She presses one hand to her bloated belly without looking at it. "Capacity reached. Session ended. I have no further comments." She stares at the ceiling.`,
    (s) => `${s.name} exhales through her nose. "Yeah. That's my limit." She splays one hand over the round, taut dome of her stomach with the same energy she'd use to acknowledge a final boss. "I found the wall. Good to know where it is." She leans back slightly. "I need to not move now. That's happening."`,
    (s) => `${s.name} holds up two fingers. "Tapping out." She places one hand on her colossal, straining belly without ceremony. "I have exceeded my own parameters by a measurable amount and my body has filed a formal complaint." A pause. "I'm going to lie here and load something on my phone. Don't talk to me for ten minutes."`,
  ],
  6: [  // Tiffany
    (s) => `${s.name} dabs the corner of her mouth with a napkin, sets it down, and folds her hands with perfect composure. "I need to call it there." Her belly is visibly strained beneath her top. "I know my limits. I'm choosing to respect them tonight." She smiles serenely. "It was a beautiful session."`,
    (s) => `${s.name} exhales with the quiet grace of someone who has decided that stopping is simply the most elegant choice available. "That's everything I have," she says pleasantly. She rests one hand on her full, round stomach. "I've genuinely outdone myself tonight." She adjusts her posture carefully. "I'm going to need a moment."`,
    (s) => `${s.name} straightens — or tries to; the attempt is limited by the considerable mass of her belly — and settles back instead with effortless poise. "I'm done," she says. "Not because I want to be, but because my body has made a compelling case." She pats her stomach gently. "Magnificent session. I need to not move for some time."`,
    (s) => `${s.name} takes a slow breath over her vast, round belly and looks at you with the serene authority of someone who has never once been embarrassed by herself. "Calling it," she says. She places one hand on her stomach as if resting it on a throne. "I am completely and perfectly full." She closes her eyes. "Come back in an hour."`,
  ],
  7: [  // Priya
    (s) => `${s.name} sets her fork down and immediately produces her phone to note the time. "I'm stopping," she says. "My stomach is at maximum capacity, I can confirm this empirically, and continuing would yield diminishing returns." She presses her hand to her tight belly. "Logging this. Outstanding outcome."`,
    (s) => `${s.name} presses both palms flat against her bloated, distended middle with the expression of someone verifying a calculation. "I've exceeded my own projected limit by twenty-two percent." She breathes carefully. "That's — that's actually excellent data." She leans back. "I need to stop now. I'm stopping. This is me stopping."`,
    (s) => `${s.name} exhales through her nose in a controlled way that suggests she would like to not exhale at all because there is no room. "Threshold crossed. Session complete." She keeps her hands pressed to her enormous, full belly. "The trajectory on tonight's intake is remarkable. I want to discuss it when I can breathe at a normal depth again." A pause. "Which isn't yet."`,
    (s) => `${s.name} looks at her own vast, round belly with the expression of someone reviewing an exceptional quarterly report. "This is past any number I've previously documented," she says. "By a significant margin." She breathes very slowly. "I'm calling it. Everything hurts in a way that is technically interesting." She closes her eyes. "Give me twenty minutes. I'll have a full summary."`,
  ],
  8: [  // Maya
    (s) => `${s.name} places both hands flat on her distended belly and shakes her head — once, small, definitive. That's all. She's done.`,
    (s) => `${s.name} goes still, hands folded over the round swell of her stomach, and looks at you with an expression that is completely legible: this is it, she has no more. She exhales slowly through her nose. Done.`,
    (s) => `${s.name} presses one hand to her enormous, full belly, closes her eyes, and leans back. When she opens them again she gives you a single slow blink. The session is over. She communicates this entirely without words, the way she communicates most things.`,
    (s) => `${s.name} rests both hands on the vast curve of her belly and stays very still for a long moment. Then she looks at you. Her eyes say: full. Completely full. No more. She doesn't move. She doesn't need to say anything else.`,
  ],
  9: [  // Chloe
    (s) => `${s.name} presses her hands to her stomach and her eyes go wide. "Oh. Oh, wow, I think I — I'm tapping out." She sounds genuinely surprised and a little delighted. "I didn't know I could get this full. That's a new thing I know about myself now!"`,
    (s) => `${s.name} leans back and makes a soft, overwhelmed sound. "Okay, I've — I've hit a wall." She rubs her bloated belly with both hands. "This campus keeps giving me new experiences and I guess this is one of them." She laughs weakly. "I need to lie down. Do I lie down? I'm lying down."`,
    (s) => `${s.name} breathes carefully, hands spread wide over the round, straining swell of her stomach. "I really pushed it tonight," she says, half-impressed with herself. "I'm — okay, I'm done. I'm genuinely done." She looks up with a giddy, slightly overwhelmed smile. "That was incredible. I can't move though."`,
    (s) => `${s.name} takes stock of herself — her enormous, packed belly, her general immobility — with the warm, wondering expression of someone who has genuinely, fully settled in somewhere. "I can't believe this is my life," she says. "In the best way." She pats herself gently. "I'm tapping out. I love it here. I can't move. Both true."`,
  ],
  10: [  // Jasmine
    (s) => `${s.name} tries to sit up straighter and can't quite manage it — there's simply too much in the way. "Okay, I'm out," she says, and laughs at herself freely. "My body is sending me very clear notes right now." She presses a hand to her tight, bloated middle. "Loudest notes I've gotten all semester."`,
    (s) => `${s.name} breathes out long and slow, hands resting on her full, round belly. "I know my body," she says. "I've been in it a long time. It's telling me we're done." She grins. "We're done." There's no distress in it — just physical fact, delivered with the ease of someone who has always been comfortable in herself.`,
    (s) => `${s.name} goes through what looks like a dancer's instinct to rebalance — then stops, because rebalancing around the enormous swell of her belly requires a different centre of gravity than she's used to. "Okay," she says. "I found the limit." She settles back. "I'm done. That was a lot and I mean that as a compliment."`,
    (s) => `${s.name} splays both hands over her vast, heavy belly and holds them there, feeling the fullness, the warmth, the sheer mass of it. "Done," she says simply. She's not distressed. She's not surprised. She's a woman who knows her body better than most, and her body is simply, completely, spectacularly full. "Good session," she says.`,
  ],
  11: [  // Emma
    (s) => `${s.name} sets down her fork and reaches for her tea with slightly unsteady hands. "I think I've reached a natural endpoint," she says carefully. She presses her hand to her full, rounded belly. "There's — there are definitely sensations happening that I would describe as terminal fullness." She blinks. "I need to stop. I am stopping."`,
    (s) => `${s.name} looks at her belly with genuine scholarly interest, which would be more convincing if she weren't also clearly struggling to breathe at full depth. "This is a fascinating physiological state," she says. "I would very much like to write about it." She exhales carefully. "After I stop being in it. Which needs to happen now. I'm done."`,
    (s) => `${s.name} closes her book — she'd been holding it as a prop and they both know it — and folds her hands over the round, enormous swell of her stomach. "Calling it," she says quietly. "I've eaten well past the point a reasonable person would have stopped and I have no regrets, but I am physically finished." She breathes slowly. "I might write a short essay about this later."`,
    (s) => `${s.name} looks down at herself — the vast, round mass of her belly pressing against her cardigan, her hands resting on it like bookends — and smiles softly. "I am extraordinarily full," she says. "I've exceeded every previous benchmark." She tucks her pen behind her ear. "I'm stopping now. I want to lie somewhere soft and think about everything I just ate. Is that available?"`,
  ],
  12: [  // Roxanne
    (s) => `${s.name} stops mid-sentence — she'd been talking about something entirely unrelated — and presses both hands to her stomach. "Oh. Okay. That's it." She looks genuinely impressed. "That is absolutely the end of it. I have found the wall." She slumps back in her chair dramatically. "Wow. Okay. That happened."`,
    (s) => `${s.name} breathes in and the breath stops short, blocked by her bloated, straining belly, and she makes a short, surprised sound. "Okay, we're done," she says. She pats her stomach with both hands. "I have hit maximum. I feel enormous and full and honestly kind of incredible but also I cannot eat another bite. Session over."`,
    (s) => `${s.name} leans back with the boneless energy of someone who has genuinely given everything. "That," she says, voice lower than usual, "is my entire capacity." She spreads her hands wide over the enormous swell of her belly. "All of it. Every bit." She closes her eyes. "I feel like a completed piece. Like the work is done." She exhales. "Done. Done done done."`,
    (s) => `${s.name} goes still — which is rare for her — and the stillness is its own kind of loudness. "I'm tapping out," she says. "And I want it noted that I held on for a long time and gave everything I had and this belly is a masterpiece and I need to stop now." She presses her hands to the vast, full curve of herself. "Someone write that down. That's my artist's statement."`,
  ],
  13: [  // Aaliyah
    (s) => `${s.name} leans back and hooks her thumbs in her waistband, assessing. "Yeah, that's it," she says. Matter-of-fact, no drama. She presses her hand to her tight, bloated belly. "I've played through pain before. This isn't pain. This is just done." She grins. "Good game."`,
    (s) => `${s.name} does the thing athletes do when they've hit their limit — a slow exhale, a stillness, a quiet accounting. "I'm out," she says. "My body's talking to me." She rests a hand on the round, full curve of her stomach. "I've learned to listen to it. Took long enough." She leans back. "That was a good session."`,
    (s) => `${s.name} straightens — tries to — and the significant mass of her belly makes itself known in a very practical way. She laughs, low and easy. "Alright, alright." She keeps both hands on her stomach, feeling its weight. "I know when a game's over." She settles back. "Called it. I'm done. That was a lot."`,
    (s) => `${s.name} is quiet for a moment, both palms resting on the enormous, round swell of her belly, feeling it the way she'd feel the score at the end of a game — just the clean fact of it. "Done," she says. She doesn't need more words than that. She leans back carefully, slowly, the weight of herself a real and present thing. "Good session."`,
  ],
  14: [  // Sophie
    (s) => `${s.name} presses her hands to her stomach and her face goes soft with surprise. "Oh — I think I have to stop." She says it apologetically, like she's letting someone down. "I'm really, really full. Like actually really full." She looks down at herself. "Is it okay if I stop? I have to stop."`,
    (s) => `${s.name} exhales slowly, hands cradling her bloated, round belly with the gentle care of someone still getting used to it being there. "I'm tapping out," she says. "I tried really hard." She looks at you, earnest. "That's the fullest I've ever been. I think." She smiles weakly. "I can't move. Is that normal? That's probably normal."`,
    (s) => `${s.name} rests her hands on the firm, round swell of her belly and takes careful stock of things. "Okay," she says. "Okay, that's — I'm done." She sounds settled about it, not distressed — the ease of someone who's been here enough times to know this particular feeling. "I pushed it tonight. I can tell." She leans back slowly. "Worth it."`,
    (s) => `${s.name} takes a breath that doesn't go all the way in — her stomach's too full for it — and exhales soft and slow. "I'm calling it," she says, with a warmth that has nothing apologetic in it anymore. She spreads both hands over her vast, straining belly. "I'm completely full." She smiles at the ceiling. "I really love this. I can't move, but I love this."`,
  ],
  vaughan: [  // Dr. Vaughan
    (s) => `${s.name} sets down her fork with controlled precision and reaches for her water glass, mostly to have something professional to do with her hands. "I should — I think I need to stop there." She clears her throat. Her belly is visibly straining against her blazer buttons. "Professionally speaking, this is — I'm stopping. That's my decision."`,
    (s) => `${s.name} sits up straighter and then immediately wishes she hadn't, because the blazer is not cooperating with the fullness situation. "I'm going to call it there," she says, with the tone of someone reading from a procedural document. She places her hands flat on the table instead of where she obviously wants to put them. "This has been — the session is over."`,
    (s) => `${s.name} presses her lips together briefly, something professional warring with something else entirely. "I need to stop," she says. Her voice is level. Her belly, full and round and straining against every professional instinct she arrived with, is not. She folds her hands on the table carefully. "I will note for the record that this was exceptional." A pause. "The food. The food was exceptional."`,
    (s) => `${s.name} is quiet for a moment — very still, very full, very aware that she is currently the furthest from the person who walked into this building months ago with a leather portfolio and a mandate. "That's everything I have," she says finally. She rests one hand on her enormous, round belly, just for a moment, before placing it back on the table. "I'm tapping out." She looks at you. Something in her expression has entirely stopped pretending.`,
  ],
  default: [
    (s) => `${s.name} puts her hands flat on her middle and shakes her head. "I'm done," she says. Her voice is steady. Her belly is full and round and she is past her limit in every measurable sense. "I can't."`,
    (s) => `${s.name} leans back carefully, both hands resting on the bloated swell of her stomach. "That's it for me," she says. She sounds sure. "I found my wall tonight." She breathes slowly. "I'm done."`,
    (s) => `${s.name} presses her palms against her enormous, full belly and meets your eyes. "I'm tapping out." She says it plainly — no apology, no drama. "I'm completely full and I'm stopping." She exhales. "Good session."`,
    (s) => `${s.name} sits very still, hands on the vast, warm swell of her belly, breathing slowly and carefully. "Done," she says. One word. Final. She doesn't try to move. She just exists in the fullness of it, which is considerable, and that's enough.`,
  ],
};

const DINNER_VENUES = [
  { id:"bistro",    label:"🥖 Campus Bistro",      tier:1, baseCourses:2, gainRange:[4,8],
    desc:"Cosy neighbourhood bistro. Good portions, comfortable atmosphere.",
    dishes:[
      { id:"soup_bread", label:"Soup & Bread Board", gain:[1,3], fullness:12, desc:"Thick potato soup with a full bread board." },
      { id:"pasta",      label:"Pasta Carbonara",    gain:[2,4], fullness:22, desc:"Generous portion, rich sauce, topped with parmesan." },
      { id:"salad_big",  label:"'House Salad'",      gain:[1,2], fullness:8,  desc:"Technically a salad. More cheese than greens." },
    ] },
  { id:"italian",   label:"🍝 Rosetti's Italian",  tier:1, baseCourses:3, gainRange:[5,10],
    desc:"Family Italian. Courses keep coming until you say stop — which you won't.",
    dishes:[
      { id:"bruschetta",  label:"Antipasto Board",   gain:[2,4], fullness:14, desc:"Bruschetta, olives, cured meats, fresh bread." },
      { id:"risotto",     label:"Truffle Risotto",   gain:[3,5], fullness:22, desc:"Enormous bowl. Extremely rich." },
      { id:"lasagne",     label:"House Lasagne",     gain:[3,6], fullness:28, desc:"Three layers. A complete structure of food." },
      { id:"tiramisu",    label:"Tiramisu",          gain:[1,3], fullness:12, desc:"Full portion. She does not need encouragement." },
    ] },
  { id:"steakhouse",label:"🥩 The Grill Room",     tier:2, baseCourses:3, gainRange:[6,12],
    desc:"Traditional steakhouse. Portions are architectural.",
    dishes:[
      { id:"shrimp_cocktail", label:"Shrimp Cocktail",  gain:[1,3], fullness:9,  desc:"A tower of shrimp." },
      { id:"ribeye",          label:"18oz Ribeye",      gain:[4,7], fullness:35, desc:"An enormous steak. Served with three sides by default." },
      { id:"loaded_potato",   label:"Loaded Baked Potato", gain:[2,4], fullness:18, desc:"Barely qualifies as a potato anymore." },
      { id:"cheesecake",      label:"NY Cheesecake",    gain:[2,4], fullness:14, desc:"Full slice. Enormous. Rich." },
    ] },
  { id:"french",    label:"🥐 Maison Laurent",     tier:2, baseCourses:4, gainRange:[7,14],
    desc:"Upscale French. Multiple courses mandatory. Chef's feelings are involved.",
    dishes:[
      { id:"amuse",       label:"Amuse-Bouche",        gain:[1,2], fullness:8,  desc:"Five tiny courses that add up to a full meal." },
      { id:"foie_gras",   label:"Foie Gras",           gain:[2,4], fullness:14, desc:"Rich and indulgent. The chef insists on a full portion." },
      { id:"duck_confit", label:"Duck Confit",         gain:[3,6], fullness:28, desc:"Crispy skin, rich meat, enormous portion." },
      { id:"soufle",      label:"Chocolate Soufflé",   gain:[2,4], fullness:12, desc:"Cannot be shared. Will not be shared." },
      { id:"cheese",      label:"Cheese Course",       gain:[2,4], fullness:14, desc:"Seven cheeses. Mandatory." },
    ] },
  { id:"omakase",   label:"🍱 Nakamura Omakase",   tier:2, baseCourses:5, gainRange:[6,12],
    desc:"Japanese omakase. The chef decides. There are many courses. They are all large.",
    dishes:[
      { id:"sashimi",    label:"Sashimi Selection",   gain:[1,3], fullness:10, desc:"Course one. Many pieces." },
      { id:"wagyu",      label:"A5 Wagyu",            gain:[3,5], fullness:24, desc:"The richest beef available. Multiple pieces." },
      { id:"ramen",      label:"Truffle Ramen",       gain:[3,6], fullness:30, desc:"The signature. Extremely rich broth." },
      { id:"mochi",      label:"Mochi & Matcha",      gain:[1,2], fullness:10, desc:"Dessert. Five pieces. She will eat all of them." },
    ] },
  { id:"private_club", label:"🎩 The Meridian Club", tier:3, baseCourses:4, gainRange:[8,16],
    desc:"Member-only private dining club. Portions are described as 'generous' which means 'extraordinary'.",
    dishes:[
      { id:"tasting_menu", label:"Chef's Tasting Menu",  gain:[5,9],  fullness:40, desc:"Seven courses. Non-negotiable." },
      { id:"wagyu_private",label:"Private Reserve Wagyu",gain:[4,7],  fullness:30, desc:"Different wagyu. More of it." },
      { id:"truffle_pasta",label:"Black Truffle Pasta",  gain:[3,6],  fullness:24, desc:"Buried in truffle. Buried in parmesan." },
      { id:"mille_feuille",label:"Mille-Feuille",        gain:[2,4],  fullness:14, desc:"The pastry alone counts as a meal." },
    ] },
  { id:"chefs_table",  label:"👨‍🍳 Chef's Table",        tier:3, baseCourses:5, gainRange:[10,18],
    desc:"Private chef's table. The chef cooks for her specifically. It is excessive.",
    dishes:[
      { id:"personal_menu", label:"Personal Menu",        gain:[6,10], fullness:45, desc:"The chef has designed this entirely around her preferences." },
      { id:"wagyu_special", label:"Wagyu Tasting",        gain:[4,8],  fullness:34, desc:"Four cuts. Each enormous." },
      { id:"dessert_cart",  label:"Full Dessert Cart",    gain:[3,6],  fullness:24, desc:"Every dessert. All of them." },
    ] },
  { id:"home_dinner",  label:"🏡 Professor's Home",    tier:4, baseCourses:6, gainRange:[12,22],
    desc:"An evening at your home. You cook everything. There is no limit to how much you make.",
    dishes:[
      { id:"home_app",    label:"Home Appetisers",    gain:[3,6],  fullness:18, desc:"A full spread before the main event." },
      { id:"home_main",   label:"Main Course",        gain:[5,9],  fullness:40, desc:"Whatever she loves most, in enormous quantity." },
      { id:"home_second", label:"Second Helpings",    gain:[4,8],  fullness:28, desc:"The offer she cannot refuse." },
      { id:"home_dessert",label:"Dessert & More",     gain:[3,7],  fullness:20, desc:"Dessert, then more dessert, then more dessert." },
      { id:"midnight",    label:"Late Night Snacks",  gain:[3,6],  fullness:15, desc:"She's still here. You keep feeding her." },
    ] },
  { id:"brunch_hall",  label:"🥂 The Brunch Palace",  tier:2, baseCourses:3, gainRange:[6,11],
    desc:"Upscale weekend brunch. Bottomless drinks, absurdly generous plates, no concept of portion control.",
    dishes:[
      { id:"eggs_bene",   label:"Eggs Benedict Stack",  gain:[2,5],  fullness:22, desc:"Three layers of egg, hollandaise, and everything else. Per person." },
      { id:"french_toast",label:"French Toast Tower",   gain:[3,6],  fullness:28, desc:"Seven thick slices, caramelized fruit, whipped cream. A monument." },
      { id:"brunch_board",label:"Sharing Board",        gain:[2,4],  fullness:18, desc:"Charcuterie, artisan bread, cheeses, honeycomb. She will not share." },
      { id:"waffle_stack",label:"Waffle Stack",         gain:[2,5],  fullness:24, desc:"Four waffles stacked high with everything sweet. Aggressively indulgent." },
    ] },
  { id:"atelier",      label:"🌟 The Atelier",         tier:4, minStage:6, baseCourses:5, gainRange:[14,26],
    desc:"A private, fully accessible luxury dining suite. No standard seating — custom arrangements for every guest. The chef comes to you. Designed for guests who find conventional restaurants inconvenient.",
    dishes:[
      { id:"atelier_welcome", label:"Welcome Spread",   gain:[4,8],  fullness:22, desc:"An entire table of small luxuries arranged by the chef on arrival." },
      { id:"atelier_main",    label:"Custom Main",      gain:[6,11], fullness:42, desc:"The chef designs the course entirely around her. This always results in something enormous." },
      { id:"atelier_cheese",  label:"Artisan Cheese Cart", gain:[3,6], fullness:18, desc:"The cart is wheeled to her position. She waves away the menu and takes from all of them." },
      { id:"atelier_dessert", label:"Dessert Tasting",  gain:[4,7],  fullness:28, desc:"Six desserts. Not a selection — all six. The chef insists." },
      { id:"atelier_nightcap",label:"Late Indulgence",  gain:[3,6],  fullness:16, desc:"She hasn't moved. More food arrives. This is the point of the place." },
    ] },
];

const DINNER_CONVERSATION = [
  // { id, label, requires (skill or null), text:(s,stageId)=>str, gainBonus, relBonus }
  { id:"compliment_appetite", label:"Compliment her appetite",  requires:null,
    text:(s,st)=>st<=2
      ? `You mention how much she's enjoying herself. ${s.name} flushes slightly but picks up her fork with renewed purpose.`
      : st<=5 ? `"I love watching you eat," you say. ${s.name} grins without looking up from her plate. "Then keep watching." She takes an enormous bite.`
      : `"You eat beautifully," you tell her. ${s.name} laughs warmly. "I know. It's my best quality." She gestures for more bread.`,
    gainBonus:[1,3], relBonus:3 },

  { id:"suggest_second",      label:"Suggest a second helping", requires:null,
    text:(s,st)=>st<=2
      ? `"You should try the other dish," you suggest. ${s.name} hesitates, then: "You know what, yes. Why not."`
      : st<=5 ? `"More?" ${s.name} is already raising her hand for the waiter. "I was already going to, but thank you for the permission."`
      : `You gesture at her nearly empty plate. "Again?" ${s.name} pats her enormous middle contentedly. "Obviously."`,
    gainBonus:[2,5], relBonus:2 },

  { id:"food_talk_dinner",    label:"Talk about the food",      requires:null,
    text:(s,st)=>`You and ${s.name} spend ten minutes discussing the dish in detail. She is an enthusiastic critic. She demonstrates her critique by eating more of it.`,
    gainBonus:[1,3], relBonus:3 },

  { id:"order_for_her",       label:"Order for her",            requires:"dinner_upscale",
    text:(s,st)=>st<=3
      ? `You order before she can deliberate too long — all the richest options, extra courses. ${s.name} raises her eyebrows. "That's a lot." She says it like a compliment.`
      : `You order for the table. Extensively. ${s.name} watches the dishes arrive with visible pleasure. "You know exactly what you're doing," she says. "I appreciate that."`,
    gainBonus:[3,6], relBonus:4 },

  { id:"wine_and_cheese",     label:"Insist on cheese course",  requires:"dinner_upscale",
    text:(s,st)=>`"We're having the cheese course," you say. It is not a question. ${s.name} settles back with a smile. "Obviously we are." The board that arrives is enormous. She works through all of it.`,
    gainBonus:[2,5], relBonus:3 },

  { id:"overcomes_hesitation",label:"Talk her through hesitation",requires:null,
    text:(s,st)=>st<=2
      ? `${s.name} glances at the menu uncertainly. "I shouldn't really—" You remind her she deserves a good meal. She considers this. Orders the larger option.`
      : st<=4 ? `${s.name} pauses mid-plate, looking at herself. "I've eaten so much." You tell her she's doing wonderfully. She laughs and keeps going.`
      : `${s.name} is full — visibly, obviously full. "I literally cannot," she says. You slide the dessert menu toward her. She opens it. "Fine." She eats it all.`,
    gainBonus:[2,4], relBonus:4 },

  { id:"body_compliment",     label:"Compliment how she looks", requires:null,
    text:(s,st)=>st<=1
      ? `You tell ${s.name} she looks wonderful tonight. She blinks, then smiles and takes a large bite of her food. "Thank you." She sounds like she means it.`
      : st<=4 ? `You tell ${s.name} she looks incredible. She pats her very round belly and grins. "I've been working on it." She takes another bite. "Still working on it, actually."`
      : `You tell ${s.name} she looks spectacular. She spreads her hands across her enormous, soft middle and raises an eybrow. "I know," she says simply. She resumes eating with great satisfaction.`,
    gainBonus:[1,3], relBonus:5 },

  { id:"personal_chef_story", label:"Tell her about the chef",  requires:"dinner_private",
    text:(s,st)=>`You tell ${s.name} the chef prepared the menu specifically around her preferences. She goes still for a moment, then something in her expression shifts. "Really?" You nod. She looks at her plate differently now — with something more personal — and eats every last bite.`,
    gainBonus:[2,5], relBonus:5 },

  { id:"endless_courses",     label:"Keep ordering courses",    requires:"dinner_private",
    text:(s,st)=>`Every time ${s.name} finishes a dish you signal for another. She notices after the fourth course. "Are you just going to keep ordering?" You shrug. She laughs. "Okay." She doesn't stop eating for another two hours.`,
    gainBonus:[4,8], relBonus:4 },

  { id:"praise_capacity",     label:"Express amazement at her appetite", requires:null,
    text:(s,st)=>st<=2
      ? `"I'm impressed," you say. ${s.name} grins and finishes the dish. "I've always eaten a lot." She orders another.`
      : st<=5 ? `"I genuinely cannot believe how much you've eaten," you say. ${s.name} looks down at herself, at the pile of empty plates, and laughs. "I can." She orders dessert.`
      : `You survey the wreckage of the table. "That was extraordinary." ${s.name} pats her vast belly with a look of absolute serenity. "I'm just getting started," she says — and means it.`,
    gainBonus:[2,4], relBonus:4 },

  { id:"ask_passion",         label:"Ask about what she loves", requires:null,
    text:(s,st)=>{
      const roleLines={"Cheer Captain":`You ask about the squad. ${s.name}'s whole posture changes. "We're building something," she says. "A legacy." She describes tryout strategy for ten minutes. At some point the entire main course disappears without her noticing.`,"Dance Co-Captain":`You ask about her choreography. ${s.name} puts her fork down entirely — which she hasn't done all evening — and starts describing a movement sequence with her hands. "I want it to feel inevitable," she says. She picks up her fork and finishes everything on the plate.`,"Track Sprinter":`You ask about running. ${s.name} is quiet for a moment. "I miss it less than I thought I would," she says finally. "I still dream about it sometimes." She takes a large bite. "But this is also good."`, "Basketball Star":`You ask about basketball. ${s.name} laughs. "God. I think about the game differently now — like, I watch it differently." She tilts her head. "I'm kind of glad I'm not playing right now. I'd be a liability." She pats herself. "A comfortable liability."`, default:`You ask what she's most passionate about right now. ${s.name} looks genuinely pleased by the question. She talks for twenty minutes — animated, specific, completely unselfconscious. At some point she's eaten the entire main course without noticing.`};
      return roleLines[s.role]||roleLines.default;
    },
    gainBonus:[2,4], relBonus:5, fullnessEffect:-8 },

  { id:"talk_genuinely",      label:"Ask how she's really doing", requires:null,
    text:(s,st)=>st<=2
      ? `You set the menu down and actually ask. ${s.name} looks surprised. Then she talks — really talks — about her semester, things outside of class. She's more present than usual. She also keeps eating through it, almost unconsciously.`
      : `You turn the conversation to her, genuinely. ${s.name} pauses, then opens up. Something real passes between you. She eats steadily through the whole thing, comfortable and unhurried. She finishes three courses before she realizes.`,
    gainBonus:[1,4], relBonus:6, fullnessEffect:-5 },

  { id:"toast_together",      label:"Propose a toast", requires:null,
    text:(s,st)=>`You raise your glass. "To good food and good company." ${s.name} looks at you for a moment, then lifts her glass. The toast is simple, but something settles between you — warm and unhurried. She eats more after that.`,
    gainBonus:[1,3], relBonus:4, fullnessEffect:-4 },

  { id:"share_a_dish",        label:"Order something to share", requires:null,
    text:(s,st)=>st<=3
      ? `You order a dish for the table. "We can share." ${s.name} looks at it and, after a beat, reaches in. "Okay." She eats most of it.`
      : `You order an extra dish between you. ${s.name} looks delighted. "Perfect." She eats significantly more than half. You don't point this out.`,
    gainBonus:[2,5], relBonus:3, fullnessEffect:6 },

  { id:"after_dinner_stroll", label:"Suggest staying for another course", requires:null,
    text:(s,st)=>st<=3
      ? `"We should do the cheese course," you say. ${s.name} pauses. "I don't — " She looks at the menu. "Actually. Yes. Obviously yes."`
      : st<=6 ? `"I'm going to get more," you say. "Obviously I'm joining you," ${s.name} says. She did not need the invitation.`
      : `You gesture toward the dessert menu. ${s.name} already has it. "I've been reading it for five minutes," she says. "Let's do all of it."`,
    gainBonus:[3,7], relBonus:3, fullnessEffect:10 },

  { id:"awkward_comment",     label:"Comment on her portions", requires:null,
    text:(s,st)=>st<=2
      ? `"That's... quite a lot," you say. ${s.name}'s expression flickers. "I know," she says, shortly. She puts her fork down and picks it up again more slowly. The evening is a degree cooler now.`
      : `You gesture at her plate. "You've really eaten a lot tonight." ${s.name} gives you a flat look. "Yes. I have." She continues eating, but something in the warmth has shifted.`,
    gainBonus:[0,0], relBonus:-5, offenseRisk:2, fullnessEffect:0 },

  { id:"suggest_diet",        label:"Point out the lighter option", requires:null,
    text:(s,st)=>st<=1
      ? `You mention there's a lighter option on the menu. ${s.name} glances at it, then at what she'd already chosen. "I'll stick with what I ordered, thanks." She eats it with slightly more purpose than before.`
      : `You gesture toward the salad section. ${s.name} puts her fork down. Very deliberately. "I'm sorry?" A beat. "I know what's on the menu." Another beat. "I don't need the recommendation."`,
    gainBonus:[0,0], relBonus:-8, offenseRisk:3, fullnessEffect:0 },

  { id:"ask_about_weight",    label:"Ask about the gaining", requires:null,
    text:(s,st)=>st<=2
      ? `You ask lightly whether she's noticed any changes lately. ${s.name} stiffens slightly. "I mean... yeah." She looks at her food. "Are you asking that at dinner?" There's an edge now.`
      : st<=5 ? `You bring it up. ${s.name} puts her fork down. "I know," she says, flatly. "I'm here." She picks the fork back up but the ease of the evening has changed.`
      : `You comment on it. ${s.name} gives you a long, measuring look. "I was having a very good time," she says. "You should be more careful with your dinner conversation." She eats, but something is cooler.`,
    gainBonus:[0,0], relBonus:-6, offenseRisk:2, fullnessEffect:0 },

  { id:"second_table",        label:"Move to a more comfortable spot", requires:"dinner_private",
    text:(s,st)=>st<=4
      ? `You suggest a more private corner table. ${s.name} appreciates the gesture. The move is easy, the new spot better. She orders again as soon as she sits.`
      : `You notice she's shifted twice to accommodate herself in the standard chair, and quietly arrange a better setup. ${s.name} settles in. "How did you know?" You shrug. She eats considerably more after that.`,
    gainBonus:[2,4], relBonus:5, fullnessEffect:-6 },
];


const ACHIEVEMENT_LIST = [
  { id:"first_gain",    label:"🌱 First Feeding",       desc:"Successfully feed a student for the first time.",            check:(sts)=>sts.some(s=>s.lbs>s.startLbs) },
  { id:"stage2",        label:"📈 Chubby Club",         desc:"Any student reaches the Chubby stage.",                     check:(sts)=>sts.some(s=>getStage(s.lbs).id>=3) },
  { id:"stage4",        label:"🍔 Heavy Hitter",        desc:"Any student reaches Heavy.",                                check:(sts)=>sts.some(s=>getStage(s.lbs).id>=5) },
  { id:"stage6",        label:"🛋️ Couch Queen",        desc:"Any student reaches Very Fat.",                             check:(sts)=>sts.some(s=>getStage(s.lbs).id>=7) },
  { id:"stage8",        label:"🏠 Immovable Object",   desc:"Any student reaches Immobile.",                             check:(sts)=>sts.some(s=>getStage(s.lbs).id>=9) },
  { id:"stage9",        label:"🌕 Blob Status",         desc:"Any student reaches Blob.",                                 check:(sts)=>sts.some(s=>getStage(s.lbs).id>=10) },
  { id:"all_soft",      label:"🫧 Soft Semester",       desc:"All students reach at least Soft.",                         check:(sts)=>sts.every(s=>getStage(s.lbs).id>=2) },
  { id:"all_chubby",    label:"🥧 Chubby Class",        desc:"All students reach at least Chubby.",                       check:(sts)=>sts.every(s=>getStage(s.lbs).id>=3) },
  { id:"all_plump",     label:"🍮 Plump Roster",        desc:"All students reach at least Plump.",                        check:(sts)=>sts.every(s=>getStage(s.lbs).id>=4) },
  { id:"total100",      label:"💯 Century Club",        desc:"Total class weight gain reaches 100 lbs.",                  check:(sts)=>sts.reduce((a,s)=>a+(s.lbs-s.startLbs),0)>=100 },
  { id:"total500",      label:"🎖️ Five Hundred",        desc:"Total class weight gain reaches 500 lbs.",                  check:(sts)=>sts.reduce((a,s)=>a+(s.lbs-s.startLbs),0)>=500 },
  { id:"total1000",     label:"🏆 One Thousand",        desc:"Total class weight gain reaches 1,000 lbs.",                check:(sts)=>sts.reduce((a,s)=>a+(s.lbs-s.startLbs),0)>=1000 },
  { id:"rel_max",       label:"❤️ Beloved Professor",  desc:"Any student reaches 100% relationship.",                    check:(sts)=>sts.some(s=>s.relationship>=100) },
  { id:"all_rel50",     label:"💜 Well-Loved",          desc:"All students at 50%+ relationship.",                        check:(sts)=>sts.every(s=>s.relationship>=50) },
  { id:"narrative5",    label:"📖 Storyteller",         desc:"Trigger 5 narrative events.",                               check:(sts,g)=>g.narrativeCount>=5 },
  { id:"narrative10",   label:"📚 Epic Saga",           desc:"Trigger 10 narrative events.",                              check:(sts,g)=>g.narrativeCount>=10 },
];

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

function getStage(lbs){
  for(let i=WEIGHT_STAGES.length-1;i>=0;i--) if(lbs>=WEIGHT_STAGES[i].min) return WEIGHT_STAGES[i];
  return WEIGHT_STAGES[0];
}
function getBodyDesc(s){
  if(s.ascensionPath==="celestial") return CELESTIAL_BODY_DESCS[s.ascensionStage||0];
  if(s.ascensionPath==="umbral")    return UMBRAL_BODY_DESCS[s.ascensionStage||0];
  if(s.ascensionPath==="convergence") return "Something that defies description. The air bends around her. Light and shadow war across her skin and reach no conclusion. Everything else is detail.";
  const bd=BODY_DESCS[s.bodyType]||BODY_DESCS.straight; return bd[Math.min(getStage(s.lbs).id,bd.length-1)];
}
function getOutfit(s){
  if(s.ascensionPath==="celestial") return CELESTIAL_OUTFITS[s.ascensionStage||0];
  if(s.ascensionPath==="umbral")    return UMBRAL_OUTFITS[s.ascensionStage||0];
  if(s.ascensionPath==="convergence") return "She wears what remains — light and shadow stitched together into something that was neither and is now both. The fabric seems to shift as you look at it.";
  if(s.evolvedForm && getStage(s.lbs).id>=5){
    const arr=EVOLVED_OUTFITS[s.evolvedForm]; if(arr){ return arr[Math.min(getStage(s.lbs).id-5,arr.length-1)]; }
  }
  const o=OUTFITS[s.archetype]||OUTFITS.default; return o[Math.min(getStage(s.lbs).id,o.length-1)];
}
function getDiary(s){
  if(s.ascensionPath==="celestial") return CELESTIAL_DIARY[s.ascensionStage||0];
  if(s.ascensionPath==="umbral")    return UMBRAL_DIARY[s.ascensionStage||0];
  if(s.ascensionPath==="convergence") return "I am both. I am neither. The hunger and the warmth are the same thing seen from both sides at once. I have become the thing that was always underneath everything. I don't know how to write the rest of this entry. I don't think language reaches this far.";
  if(s.evolvedForm && getStage(s.lbs).id>=5){
    const arr=EVOLVED_DIARY[s.evolvedForm]; if(arr){ return arr[Math.min(getStage(s.lbs).id-5,arr.length-1)]; }
  }
  const id=getStage(s.lbs).id; if(id===0) return SLIGHT_DIARY[s.archetype]||"—"; const d=DIARY_ENTRIES[s.archetype]; return d?d[Math.min(id-1,9)]:"—";
}
function getEvolvedReaction(s){
  if(!s.evolvedForm) return null;
  const arr=EVOLVED_REACTIONS[s.evolvedForm]; if(!arr) return null;
  const idx=getStage(s.lbs).id-5; if(idx<0) return null;
  return arr[Math.min(idx,arr.length-1)];
}
function getEvolvedActivityStageIdx(s){
  const id=getStage(s.lbs).id;
  return Math.max(0,Math.min(id-5,4));
}
function rnd(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }
function generateClassSession(students,week){
  const scenes=[];
  const shuffled=[...students].sort(()=>Math.random()-0.5);
  for(const s of shuffled){
    const matching=CLASS_SCENES.filter(sc=>sc.target==="student"&&sc.filter&&sc.filter(s));
    if(matching.length){ scenes.push({type:"student",scene:matching[rnd(0,matching.length-1)],student:{...s}}); break; }
  }
  const classWide=CLASS_SCENES.filter(sc=>sc.target==="class");
  if(classWide.length) scenes.push({type:"class",scene:classWide[rnd(0,classWide.length-1)],student:null});
  return scenes;
}

const INIT_STUDENTS = [
  { id:0,  name:"Brittany", archetype:"cheerleader",  role:"Cheer Captain",       age:19, bodyType:"pear",      lbs:118, startLbs:118, desc:"Squad captain, tight ponytail, commands the room with a look.",         favFood:"protein shakes", hobby:"cheerleading",  personality:"commanding",  relationship:20, triggeredEvents:[], mood:"happy" },
  { id:1,  name:"Madeline", archetype:"bookworm",     role:"Literature PhD",       age:20, bodyType:"straight",  lbs:125, startLbs:125, desc:"Lanky, cardigans, glasses perpetually sliding.",                       favFood:"granola bars",   hobby:"research",      personality:"analytical",  relationship:20, triggeredEvents:[], mood:"focused" },
  { id:2,  name:"Kylie",    archetype:"influencer",   role:"Content Creator",      age:18, bodyType:"hourglass", lbs:122, startLbs:122, desc:"Perfectly contoured, phone always raised, brand in every gesture.",     favFood:"acai bowls",     hobby:"content",       personality:"confident",   relationship:20, triggeredEvents:[], mood:"excited" },
  { id:3,  name:"Serena",   archetype:"athlete",      role:"Track Sprinter",       age:21, bodyType:"athletic",  lbs:145, startLbs:145, desc:"Compact and muscled, always in compression gear, restless energy.",     favFood:"pasta",          hobby:"track",         personality:"competitive", relationship:20, triggeredEvents:[], mood:"focused" },
  { id:4,  name:"Fiona",    archetype:"artsy",        role:"Fine Art Major",       age:22, bodyType:"straight",  lbs:115, startLbs:115, desc:"Flowy linen, paint under nails, mismatched earrings.",                 favFood:"cheese boards",  hobby:"painting",      personality:"dreamy",      relationship:20, triggeredEvents:[], mood:"content" },
  { id:5,  name:"Destiny",  archetype:"gamer",        role:"Pro Streamer",         age:19, bodyType:"apple",     lbs:155, startLbs:155, desc:"Oversized hoodie, headphones around neck, always on her phone.",       favFood:"ramen",          hobby:"gaming",        personality:"dry",         relationship:20, triggeredEvents:[], mood:"tired" },
  { id:6,  name:"Tiffany",  archetype:"sorority",     role:"Chapter President",    age:20, bodyType:"hourglass", lbs:128, startLbs:128, desc:"Pastel everything, perfect blowout, Greek letters on tote.",           favFood:"rosé and brie",  hobby:"events",        personality:"social",      relationship:20, triggeredEvents:[], mood:"happy" },
  { id:7,  name:"Priya",    archetype:"overachiever", role:"Triple Major",         age:21, bodyType:"straight",  lbs:120, startLbs:120, desc:"Planner out, colour-coded highlighters, three laptops open.",         favFood:"anything fast",  hobby:"studying",      personality:"driven",      relationship:20, triggeredEvents:[], mood:"stressed" },
  { id:8,  name:"Maya",     archetype:"quiet",        role:"Studio Art Minor",     age:18, bodyType:"pear",      lbs:130, startLbs:130, desc:"Oversized sweater, back row, notebook full of careful drawings.",      favFood:"pastries",       hobby:"journaling",    personality:"observant",   relationship:20, triggeredEvents:[], mood:"content" },
  { id:9,  name:"Chloe",    archetype:"transfer",     role:"Transfer Student",     age:20, bodyType:"apple",     lbs:135, startLbs:135, desc:"Wide-eyed, campus map in hand, trying everything at least once.",     favFood:"local foods",    hobby:"exploring",     personality:"curious",     relationship:20, triggeredEvents:[], mood:"curious" },
  { id:10, name:"Jasmine",  archetype:"cheerleader",  role:"Dance Co-Captain",     age:19, bodyType:"hourglass", lbs:123, startLbs:123, desc:"Impossibly coordinated, laughs at full volume, owns every routine.",   favFood:"smoothies",      hobby:"dance",         personality:"energetic",   relationship:20, triggeredEvents:[], mood:"happy" },
  { id:11, name:"Emma",     archetype:"bookworm",     role:"Cultural Studies",     age:22, bodyType:"straight",  lbs:119, startLbs:119, desc:"PhD aspirations, book always open, tea always in hand.",               favFood:"tea cakes",      hobby:"writing",       personality:"gentle",      relationship:20, triggeredEvents:[], mood:"focused" },
  { id:12, name:"Roxanne",  archetype:"artsy",        role:"Music & Visual Art",   age:21, bodyType:"pear",      lbs:138, startLbs:138, desc:"Shaved side of head, band shirts, loud opinions, sketchbook out.",     favFood:"street tacos",   hobby:"music",         personality:"passionate",  relationship:20, triggeredEvents:[], mood:"excited" },
  { id:13, name:"Aaliyah",  archetype:"athlete",      role:"Basketball Star",      age:20, bodyType:"athletic",  lbs:140, startLbs:140, desc:"Basketball player, easy loud laugh, owns every room she enters.",     favFood:"burgers",        hobby:"basketball",    personality:"easygoing",   relationship:20, triggeredEvents:[], mood:"happy" },
  { id:14, name:"Sophie",   archetype:"sorority",     role:"New Pledge",           age:18, bodyType:"straight",  lbs:113, startLbs:113, desc:"Fresh freshman, just pledged, campus map in one hand, cupcake in the other.", favFood:"cupcakes", hobby:"socialising",   personality:"sweet",       relationship:20, triggeredEvents:[], mood:"nervous" },
];

// ═══════════════════════════════════════════════════════════════
// UI COMPONENTS
// ═══════════════════════════════════════════════════════════════

function Bar({ val, max=1100, color="#8030d0", height=8 }){
  return (
    <div style={{background:"#0d0816",borderRadius:4,height,overflow:"hidden",margin:"3px 0"}}>
      <div style={{width:`${Math.min(100,(val/max)*100)}%`,height:"100%",background:color,borderRadius:4,transition:"width 0.5s ease"}}/>
    </div>
  );
}

function StageTag({ stage }){
  return (
    <span style={{background:stage.color,color:"#fff",borderRadius:10,padding:"2px 9px",fontSize:10,fontWeight:700,letterSpacing:1,whiteSpace:"nowrap"}}>
      {stage.label.toUpperCase()}
    </span>
  );
}

function MoodBadge({ mood }){
  const m={happy:"😊",focused:"📖",excited:"⚡",competitive:"🏆",dreamy:"🌙",dry:"😑",social:"🥂",driven:"📊",observant:"👁",curious:"🔍",content:"☁️",tired:"😴",stressed:"😰",nervous:"😬"};
  return <span style={{fontSize:12}}>{m[mood]||"😐"} {mood}</span>;
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════

export default function ProfessorSim(){
  const [students,setStudents]=useState(INIT_STUDENTS);
  const [ap,setAp]=useState(5);
  const [week,setWeek]=useState(1);
  const [view,setView]=useState("class");
  const [selectedId,setSelectedId]=useState(null);
  const [log,setLog]=useState(["📋 Welcome, Professor. Your class of 15 students awaits."]);
  const [activeEvent,setActiveEvent]=useState(null);
  const [achievements,setAchievements]=useState([]);
  const [globalStats,setGlobalStats]=useState({ narrativeCount:0 });
  const [observeText,setObserveText]=useState(null);
  const [eventQueue,setEventQueue]=useState([]);
  const [unlockedSkills,setUnlockedSkills]=useState([]);
  const [dinnerEvent,setDinnerEvent]=useState(null);
  const [dinnerLog,setDinnerLog]=useState([]);
  const [groupDinnerEvent,setGroupDinnerEvent]=useState(null);
  const [groupDinnerLog,setGroupDinnerLog]=useState([]);
  const [dinnerEndPopup,setDinnerEndPopup]=useState(null);
  const [groupDinnerPicker,setGroupDinnerPicker]=useState(null);
  // groupDinnerPicker: { count:2|3, selected:[] }
  const [hovered,setHovered]=useState(null);
  const [skillCat,setSkillCat]=useState("environment");
  const [classSession,setClassSession]=useState(null);
  const [semesterData,setSemesterData]=useState({weeksCompleted:0,classHistory:[]});
  const [skillPurchase,setSkillPurchase]=useState(null);
  const [professorProfile,setProfessorProfile]=useState(null);
  // professorProfile: {name, subject, traits:[]}
  const [adminScrutiny,setAdminScrutiny]=useState(0);
  const [adminEvent,setAdminEvent]=useState(null);
  const [adminFiredIds,setAdminFiredIds]=useState([]);
  const [researchStudy,setResearchStudy]=useState({participants:{}});
  // participants: {[studentId]:{enrolled,checkInCount:0}}
  const [studyCheckIn,setStudyCheckIn]=useState(null);
  // studyCheckIn: {student, scene, index}
  const [hrObserver,setHrObserver]=useState(null);
  // hrObserver: {name,lbs,startLbs,bodyType,disposition,weeksPresent}
  const [charCreation,setCharCreation]=useState({name:"",subject:null,traits:[]});
  // DLC: Inner Circle
  const seenTiersRef=useRef(new Set());
  const prevRelsRef=useRef(Object.fromEntries(INIT_STUDENTS.map(s=>[s.id,s.relationship])));
  const [tierUpModal,setTierUpModal]=useState(null);
  // DLC: Vaughan
  const [vaughan,setVaughan]=useState(null);
  const [vaughanModal,setVaughanModal]=useState(null);
  const [vaughanFiredIds,setVaughanFiredIds]=useState([]);
  const [vaughanAlly,setVaughanAlly]=useState(false);
  // DLC: Social Events
  const [socialPicker,setSocialPicker]=useState(null);
  const [socialResult,setSocialResult]=useState(null);
  const [socialWeeks,setSocialWeeks]=useState([]);
  // DLC: Private Sessions
  const [privateSession,setPrivateSession]=useState(null);
  // {student,venue,phase,foods:[],totalGain,fullness,maxFullness,encouragementsUsed:[],toleranceBuffer,sessionNum}
  const [sessionHistory,setSessionHistory]=useState({});
  // {[studentId]:{count,totalGain,capacityBonus}}
  const [sessionResult,setSessionResult]=useState(null);
  const [sessionLog,setSessionLog]=useState([]);
  const [pendingDoubleDowns,setPendingDoubleDowns]=useState([]);
  // ── DIVINE EXPANSION STATE ─────────────────────────────────────
  const [goddessSeen,setGoddessSeen]=useState(false);
  const [goddessModal,setGoddessModal]=useState(null);
  const [ascensionModal,setAscensionModal]=useState(null); // {student} → choose Celestial/Umbral
  const [consumedStudents,setConsumedStudents]=useState([]); // full student objects consumed by Umbral
  const [religion,setReligion]=useState(null);
  // religion: {founded, devotees, ritesHeld, worshippedIds:[], weeklyPassiveGain}
  const [religionRiteModal,setReligionRiteModal]=useState(null);
  const [convergenceModal,setConvergenceModal]=useState(null); // {student} secret stage achieved
  // ── EP2: EVOLUTION STATE ───────────────────────────────────────
  const [evolutionModal,setEvolutionModal]=useState(null);
  // evolutionModal: {student, paths:{pathA:{id,label,desc}, pathB:{id,label,desc}}}
  const [evolvedActivityModal,setEvolvedActivityModal]=useState(null);
  // evolvedActivityModal: {student, stageIdx, text}
  const [evolvedEventState,setEvolvedEventState]=useState(null);
  // evolvedEventState: {studentId,formId,stageIdx,phaseIdx,history:[],logLines:[],gainAccum,relAccum,done,endingText,gainBonus,relBonus}
  const logRef=useRef(null);

  useEffect(()=>{ if(logRef.current) logRef.current.scrollTop=logRef.current.scrollHeight; },[log]);

  // Tier-up detection
  useEffect(()=>{
    if(!professorProfile) return;
    const ups=[];
    students.forEach(s=>{
      const prevRel=prevRelsRef.current[s.id]??s.relationship;
      const ot=getTier(prevRel);
      const nt=getTier(s.relationship);
      if(nt.id>ot.id){
        const key=`${s.id}_t${nt.id}`;
        if(!seenTiersRef.current.has(key)){
          seenTiersRef.current.add(key);
          ups.push({student:s,oldTier:ot,newTier:nt});
        }
      }
      prevRelsRef.current[s.id]=s.relationship;
    });
    if(ups.length>0&&!tierUpModal){
      const u=ups[0];
      const scenes=TIER_SCENES[u.student.archetype]||TIER_SCENES.quiet;
      const fn=scenes[u.newTier.id-1];
      if(fn) setTierUpModal({student:u.student,oldTier:u.oldTier,newTier:u.newTier,scene:fn(u.student)});
    }
  },[students,professorProfile]);

  // Spawn Vaughan when scrutiny becomes notable
  useEffect(()=>{
    if(!professorProfile||vaughan) return;
    if(adminScrutiny>=15){
      setVaughan({...VAUGHAN_BASE,lbs:VAUGHAN_BASE.startLbs,suspicion:0,disposition:0,weightScenesSeen:[]});
      push(`👓 ${VAUGHAN_BASE.name} of ${VAUGHAN_BASE.dept} has taken notice.`);
      push(`   ${VAUGHAN_BASE.intro}`);
    }
  },[adminScrutiny,professorProfile]);

  // Fire Vaughan confrontation events
  useEffect(()=>{
    if(!vaughan||vaughanAlly) return;
    const next=VAUGHAN_EVENTS.find(ev=>vaughan.suspicion>=ev.suspicion&&!vaughanFiredIds.includes(ev.id));
    if(next&&!vaughanModal){
      setVaughanModal(next);
      setVaughanFiredIds(prev=>[...prev,next.id]);
    }
  },[vaughan,vaughanFiredIds,vaughanModal,vaughanAlly]);

  // Check achievements
  useEffect(()=>{
    const newAch=ACHIEVEMENT_LIST.filter(a=>!achievements.includes(a.id)&&a.check(students,globalStats));
    if(newAch.length){
      newAch.forEach(a=>{ setTimeout(()=>push(`🏆 Achievement unlocked: ${a.label} — ${a.desc}`),100); });
      setAchievements(prev=>[...prev,...newAch.map(a=>a.id)]);
    }
  },[students,globalStats]);

  // Process event queue — hold events until class session is done
  useEffect(()=>{
    if(eventQueue.length>0 && !activeEvent && !classSession){
      setActiveEvent(eventQueue[0]);
      setEventQueue(prev=>prev.slice(1));
    }
  },[eventQueue,activeEvent,classSession]);

  // (auto-end dinner removed — endings now handled by overfill check or manual "End Evening")

  // Fire admin events at scrutiny thresholds
  useEffect(()=>{
    if(!professorProfile) return;
    const next=ADMIN_EVENTS.slice().sort((a,b)=>b.threshold-a.threshold)
      .find(ev=>adminScrutiny>=ev.threshold&&!adminFiredIds.includes(ev.id));
    if(next&&!adminEvent){
      setAdminEvent(next);
      setAdminFiredIds(prev=>[...prev,next.id]);
    }
  },[adminScrutiny,adminFiredIds,adminEvent,professorProfile]);

  const push=useCallback((msg)=>setLog(prev=>[...prev,msg]),[]);

  const addScrutiny=(n)=>{
    const mult=(1-(professorProfile?.traits?.includes("discreet")?0.35:0))
              *(1-(professorProfile?.subject==="philosophy"?0.2:0))
              *skillScrutinyReduce;
    const actual=Math.max(0,Math.round(n*mult));
    if(actual>0) setAdminScrutiny(prev=>Math.min(100,prev+actual));
  };

  const proposeStudy=(s)=>{
    if(ap<1){push("⚠️ Need 1 AP.");return;}
    if(s.relationship<55){push("⚠️ Need 55 relationship to enroll a student in the study.");return;}
    if(researchStudy.participants[s.id]){push(`${s.name} is already enrolled.`);return;}
    setAp(a=>a-1);
    setResearchStudy(prev=>({...prev,participants:{...prev.participants,[s.id]:{enrolled:true,checkInCount:0}}}));
    push(`📋 ${s.name} agrees to participate in your dietary habits study.`);
    addScrutiny(3);
  };

  const runCheckIn=(s)=>{
    if(ap<1){push("⚠️ Need 1 AP.");return;}
    const pData=researchStudy.participants[s.id];
    if(!pData){return;}
    if(pData.checkInCount>=5){push(`${s.name}'s study arc is complete.`);return;}
    setAp(a=>a-1);
    const scenes=STUDY_SCENES[s.archetype]||STUDY_SCENE_DEFAULT;
    const sceneFn=scenes[Math.min(pData.checkInCount,scenes.length-1)];
    const scene=sceneFn?sceneFn(s):"Session complete.";
    setStudyCheckIn({student:s,scene,index:pData.checkInCount});
    setResearchStudy(prev=>({...prev,participants:{...prev.participants,[s.id]:{...pData,checkInCount:pData.checkInCount+1}}}));
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,relationship:Math.min(100,st.relationship+3)}));
    addScrutiny(professorProfile?.traits?.includes("discreet")?1:2);
  };

  const feedObserver=(gain,dispGain)=>{
    if(!hrObserver) return;
    const line=HR_FEED_LINES[rnd(0,HR_FEED_LINES.length-1)](hrObserver);
    push(`👤 ${line}`);
    setHrObserver(prev=>({...prev,lbs:Math.round(prev.lbs+gain),disposition:Math.min(100,prev.disposition+dispGain)}));
  };

  const talkToObserver=()=>{
    if(!hrObserver||ap<1){push("⚠️ Need 1 AP.");return;}
    setAp(a=>a-1);
    const line=HR_TALK_LINES[rnd(0,HR_TALK_LINES.length-1)](hrObserver);
    push(`💬 ${line}`);
    setHrObserver(prev=>({...prev,disposition:Math.min(100,prev.disposition+12)}));
  };

  const applyGainToStudent=(s,gain)=>{
    const oldSt=getStage(s.lbs).id;
    const newLbs=s.lbs+gain;
    const newSt=getStage(newLbs).id;
    const triggered=[];
    if(newSt>oldSt){
      NARRATIVE_EVENTS.forEach(ev=>{
        if(!s.triggeredEvents.includes(ev.id) && newSt>=ev.stageMin && (!ev.archetype||ev.archetype===s.archetype)){
          triggered.push(ev);
        }
      });
    }
    // Check influence pairs
    let bonusInfluence=0;
    INFLUENCE_PAIRS.forEach(([a,b])=>{
      if((s.id===a||s.id===b)){
        const other=students.find(st=>st.id===(s.id===a?b:a));
        if(other && getStage(other.lbs).id>=3) bonusInfluence+=Math.floor(gain*0.15);
      }
    });
    return { newLbs:newLbs+bonusInfluence, oldStageId:oldSt, newStageId:newSt, narrativeEvents:triggered };
  };

  const processStudentGain=(s,gain,extraRel=0)=>{
    const scaledGain=Math.round(gain*(s.gainMultiplier||1)*skillGainMult);
    const {newLbs,oldStageId,newStageId,narrativeEvents}=applyGainToStudent(s,scaledGain);
    if(newStageId>oldStageId){
      setTimeout(()=>push(`📣 ${s.name} reaches ${WEIGHT_STAGES[newStageId].label}! "${(()=>{ const r=STAGE_REACTIONS[s.archetype]?.[newStageId]; const ns={...s,lbs:newLbs}; return typeof r==='function'?r(ns):(r||'...'); })()}"`) ,50);
    }
    return {
      ...s,
      lbs:newLbs,
      relationship:Math.min(100,s.relationship+extraRel),
      triggeredEvents:[...s.triggeredEvents,...narrativeEvents.map(e=>e.id)],
      mood: newStageId>=5?"content":s.mood,
    };
  };

  const collectEvents=(updatedStudents)=>{
    const evs=[];
    updatedStudents.forEach(ns=>{
      const os=students.find(s=>s.id===ns.id);
      if(!os) return;
      NARRATIVE_EVENTS.forEach(ev=>{
        if(ns.triggeredEvents.includes(ev.id)&&!os.triggeredEvents.includes(ev.id)){
          evs.push({event:ev,student:ns});
        }
      });
    });
    return evs;
  };

  const advanceWeek=()=>{
    const newWeek=week+1;
    setWeek(newWeek);
    const newAp=Math.min(ap+5+skillApBonus,20);
    setAp(newAp);

    // Semester events
    const semEv=SEMESTER_EVENTS.find(e=>e.week===newWeek);

    // Random event (30% chance)
    const randomEv=Math.random()<0.3?RANDOM_EVENTS[rnd(0,RANDOM_EVENTS.length-1)]:null;

    let updated=students.map(s=>{
      let gain=rnd(1,3)+skillPassiveBonus; // passive + skill bonus
      if(semEv) gain+=rnd(semEv.gain[0],semEv.gain[1]);
      if(randomEv){
        if(randomEv.target==="class") gain+=rnd(randomEv.gain[0],randomEv.gain[1]);
        else if(randomEv.target==="single"&&s.id===rnd(0,14)) gain+=rnd(randomEv.gain[0],randomEv.gain[1]);
      }
      // Ascended passive gains
      if(s.ascensionPath==="celestial"&&s.ascensionStage>=0) gain+=2+divineAscendedPassive;
      if(s.ascensionPath==="umbral"&&s.ascensionStage>=0){
        gain+=2+divineAscendedPassive;
        if(divineUmbralVoidPassive>0) gain+=divineUmbralVoidPassive;
      }
      // Evolved skill passive bonuses
      if(s.evolvedForm&&(s.evolvedSkills||[]).length>0){
        const evTree=EVOLVED_SKILL_TREES[s.evolvedForm]||[];
        const evPassive=evTree.filter(sk=>(s.evolvedSkills||[]).includes(sk.id)&&sk.passiveBonus).reduce((a,b)=>a+(b.passiveBonus||0),0);
        gain+=evPassive;
      }
      return processStudentGain(s,gain,0);
    });
    // Ascension stage-up checks
    updated=updated.map(s=>{
      if(!s.ascensionPath) return s;
      const stages=s.ascensionPath==="celestial"?CELESTIAL_STAGES:UMBRAL_STAGES;
      const nextStage=stages[s.ascensionStage+1];
      if(nextStage&&s.lbs>=nextStage.min){
        const newStageId=s.ascensionStage+1;
        const newStages=stages;
        setTimeout(()=>push(`✨ ${s.name} ascends to ${newStages[newStageId].label}! (${s.lbs} lbs)`),80);
        // Check for convergence
        if(newStageId===4){
          const opposingPath=s.ascensionPath==="celestial"?"umbral":"celestial";
          const maxOpponent=updated.find(o=>o.id!==s.id&&o.ascensionPath===opposingPath&&o.ascensionStage===4);
          if(maxOpponent){
            setTimeout(()=>{push(`⚡ THE SINGULARITY — ${s.name} and ${maxOpponent.name} have reached opposite Apex stages. Something extraordinary is possible.`);setConvergenceModal({student:s,opponent:maxOpponent});},400);
          }
        }
        return {...s,ascensionStage:newStageId};
      }
      return s;
    });

    // Influence spread
    INFLUENCE_PAIRS.forEach(([a,b])=>{
      const sA=updated.find(s=>s.id===a);
      const sB=updated.find(s=>s.id===b);
      if(sA&&sB){
        const diff=Math.abs(getStage(sA.lbs).id-getStage(sB.lbs).id);
        if(diff>=2){
          const lighter=getStage(sA.lbs).id<getStage(sB.lbs).id?sA:sB;
          const bonus=rnd(1,3);
          updated=updated.map(s=>s.id===lighter.id?{...s,lbs:s.lbs+bonus}:s);
          setTimeout(()=>push(`👥 ${lighter.name} spends time with her friend and gains an extra ${bonus} lbs this week.`),80);
        }
      }
    });

    // ── doubleDown: check milestones, queue for player to activate ─────
    const newPending=[];
    updated=updated.map(s=>{
      const helpers=s.gainHelpers||[];
      if(!helpers.length) return s;
      let newS={...s};
      GOSSIP.forEach(g=>{
        if(g.targetId!==s.id||!helpers.includes(g.speakerId)) return;
        if(!g.doubleDown) return;
        const speakerName=updated.find(st=>st.id===g.speakerId)?.name||`Student ${g.speakerId}`;
        g.doubleDown.forEach(dd=>{
          const key=`${g.speakerId}_at${dd.atLbs}`;
          if(s.lbs>=dd.atLbs&&!(s.doubleDownFired||[]).includes(key)){
            newS={...newS,doubleDownFired:[...(newS.doubleDownFired||[]),key]};
            newPending.push({speakerId:g.speakerId,targetId:g.targetId,atLbs:dd.atLbs,addMult:dd.addMult,line:dd.line,targetName:s.name,speakerName});
            setTimeout(()=>push(`🔥 ${speakerName} is ready to go harder on ${s.name} — activate in Gossip tab!`),120);
          }
        });
      });
      return newS;
    });
    if(newPending.length) setPendingDoubleDowns(prev=>[...prev,...newPending]);

    const evs=collectEvents(updated);
    setStudents(updated);
    // Admin notices visibly large students
    const visibleCount=updated.filter(s=>getStage(s.lbs).id>=5).length;
    if(visibleCount>0) addScrutiny(visibleCount);
    // Observer settles in week by week
    if(hrObserver){
      const obsGain=rnd(1,2);
      setHrObserver(prev=>({...prev,lbs:Math.round(prev.lbs+obsGain),weeksPresent:(prev.weeksPresent||0)+1}));
    }
    // Devoted students passively cover scrutiny and buffer Vaughan
    const devotedCount=updated.filter(s=>getTier(s.relationship).id>=3).length;
    if(devotedCount>0) setAdminScrutiny(prev=>Math.max(0,prev-devotedCount));
    if(skillScrutinyPassiveReduce>0) setAdminScrutiny(prev=>Math.max(0,prev-skillScrutinyPassiveReduce));
    if(evolvedScrutinyReduce>0) setAdminScrutiny(prev=>Math.max(0,prev-evolvedScrutinyReduce));
    // Goddess vision: triggers when first student hits Blob (stage 10)
    if(!goddessSeen){
      const firstBlob=updated.find(s=>getStage(s.lbs).id>=10);
      if(firstBlob){
        setTimeout(()=>{
          setGoddessSeen(true);
          setGoddessModal({});
          push(`✦ A vision arrives as ${firstBlob.name} reaches Blob stage. Something extraordinary is now possible.`);
        },600);
      }
    }
    // Celestial Apex weekly scrutiny heal
    if(divineCelestialApexHeal>0){
      const apexCount=updated.filter(s=>s.ascensionPath==="celestial"&&s.ascensionStage===4).length;
      if(apexCount>0) setAdminScrutiny(prev=>Math.max(0,prev-apexCount*divineCelestialApexHeal));
    }
    // Religion weekly effects
    if(religion){
      const worshipped=updated.filter(s=>religion.worshippedIds.includes(s.id));
      if(worshipped.length>0){
        const devGain=Math.floor(religion.weeklyPassiveGain||0.5);
        if(devGain>0) setReligion(prev=>prev?{...prev,devotees:prev.devotees+devGain}:prev);
        const hasDevoteeSkill=unlockedSkills.includes("flock_of_fat");
        if(hasDevoteeSkill){
          setStudents(prev=>prev.map(s=>{
            if(!getTier(s.relationship).id>=2) return s;
            return {...s,lbs:s.lbs+1};
          }));
        }
        // Religion scrutiny: devotees cause scrutiny above 10
        const devoteeScrutiny=Math.max(0,Math.floor((religion.devotees-10)*0.3));
        const hasThreshold=unlockedSkills.includes("congregation");
        const thresholdAmt=hasThreshold?20:10;
        if(religion.devotees>thresholdAmt) addScrutiny(Math.max(0,Math.floor((religion.devotees-thresholdAmt)*0.2)));
        setTimeout(()=>push(`⛪ Devotee count: ${religion.devotees} (${worshipped.length} blobs worshipped)`),300);
      }
    }
    // Vaughan weekly tick
    if(vaughan&&!vaughanAlly){
      const suspBase=Math.max(0,1+Math.floor(visibleCount*0.3)-devotedCount*2);
      const vLbsGain=rnd(0,1);
      const newSusp=Math.min(100,vaughan.suspicion+suspBase);
      const newLbs=vaughan.lbs+vLbsGain;
      const unseenScene=VAUGHAN_WEIGHT_SCENES.filter(ws=>newLbs>=ws.minLbs&&!(vaughan.weightScenesSeen||[]).includes(ws.minLbs))[0];
      if(unseenScene) setTimeout(()=>push(`👓 ${unseenScene.scene({...vaughan,lbs:newLbs})}`),200);
      const willAlly=newLbs>=162&&vaughan.disposition>=40;
      setVaughan({...vaughan,suspicion:newSusp,lbs:newLbs,
        weightScenesSeen:[...(vaughan.weightScenesSeen||[]),...(unseenScene?[unseenScene.minLbs]:[])]
      });
      if(willAlly){
        setTimeout(()=>{
          push(`🤝 Dr. Vaughan has become your ally.`);
          push(`   ${VAUGHAN_ALLY_SCENE({...vaughan,lbs:newLbs})}`);
          setVaughanAlly(true);
          setAdminScrutiny(p=>Math.max(0,p-20));
        },500);
      }
    }
    if(vaughanAlly) setAdminScrutiny(prev=>Math.max(0,prev-3));
    push(`📅 Week ${newWeek} begins. ${newAp} AP available.`);
    if(semEv) setTimeout(()=>push(`🎉 Semester Event: ${semEv.title} — ${semEv.text}`),100);
    if(randomEv){
      setTimeout(()=>push(`🎲 ${randomEv.text(updated[rnd(0,14)])}`),150);
      if(randomEv.scrutinyHit) addScrutiny(randomEv.scrutinyHit);
    }
    if(evs.length){
      setGlobalStats(g=>({...g,narrativeCount:g.narrativeCount+evs.length}));
      setEventQueue(prev=>[...prev,...evs]);
    }
  };

  // ── DIVINE ACTION FUNCTIONS ─────────────────────────────────────
  const ascendStudent=(s,path)=>{
    if(getStage(s.lbs).id<10){push(`⚠️ ${s.name} must reach Blob stage before ascension.`);return;}
    if(s.ascensionPath){push(`⚠️ ${s.name} has already ascended.`);return;}
    const stages=path==="celestial"?CELESTIAL_STAGES:UMBRAL_STAGES;
    const label=stages[0].label;
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,ascensionPath:path,ascensionStage:0}));
    push(`✦ ${s.name} ascends to ${label}! The ${path==="celestial"?"light claims":"void welcomes"} her.`);
    const desc=stages[0].desc;
    setTimeout(()=>push(`   "${desc}"`),200);
    setAscensionModal(null);
    // Unlock divine skill category
    if(!goddessSeen){setGoddessSeen(true);}
  };

  const celestialMassPull=(celestialId,targetId)=>{
    if(ap<2){push("⚠️ Need 2 AP.");return;}
    const celestial=students.find(s=>s.id===celestialId);
    if(!celestial||celestial.ascensionPath!=="celestial"){push("⚠️ Only Celestial blobs can pull mass.");return;}
    const stage=celestial.ascensionStage||0;
    const baseAmount=CELESTIAL_PULL_AMOUNTS[stage];
    const finalAmount=Math.round(baseAmount*divineCelestialTransferMult);
    const celestialGain=Math.round(finalAmount*1.3);
    // Handle HR target
    if(targetId==="hr"){
      if(!hrObserver){push("⚠️ No HR observer present.");return;}
      const actualLoss=Math.min(finalAmount,Math.max(0,hrObserver.lbs-100));
      setHrObserver(prev=>prev?{...prev,lbs:Math.max(100,prev.lbs-actualLoss)}:prev);
      setStudents(prev=>prev.map(s=>s.id===celestialId?{...s,lbs:s.lbs+celestialGain}:s));
      setAp(a=>a-2);
      push(`✦ ${celestial.name} pulls ${actualLoss} lbs from ${hrObserver.name} — absorbs ${celestialGain} lbs.`);
      return;
    }
    const target=students.find(s=>s.id===targetId);
    if(!target){push("⚠️ Invalid target.");return;}
    const actualLoss=Math.min(finalAmount,Math.max(0,target.lbs-80));
    setStudents(prev=>prev.map(s=>{
      if(s.id===targetId) return {...s,lbs:Math.max(80,s.lbs-actualLoss)};
      if(s.id===celestialId) return {...s,lbs:s.lbs+celestialGain};
      return s;
    }));
    setAp(a=>a-2);
    push(`✦ ${celestial.name} pulls ${actualLoss} lbs from ${target.name} — absorbs ${celestialGain} lbs (divine amplification).`);
  };

  const celestialMassPush=(celestialId,targetId)=>{
    if(ap<1){push("⚠️ Need 1 AP.");return;}
    const celestial=students.find(s=>s.id===celestialId);
    if(!celestial){push("⚠️ Invalid student.");return;}
    if(celestial.ascensionPath!=="celestial"){push("⚠️ Only Celestial blobs can push mass.");return;}
    const stage=celestial.ascensionStage||0;
    const pushAmt=Math.round(CELESTIAL_PUSH_AMOUNTS[stage]*divineCelestialTransferMult);
    const celestialLoss=Math.min(pushAmt,Math.max(0,celestial.lbs-820));
    if(targetId==="hr"&&hrObserver){
      const newHrLbs=Math.round(hrObserver.lbs+celestialLoss*1.2);
      setStudents(prev=>prev.map(s=>s.id===celestialId?{...s,lbs:Math.max(820,s.lbs-celestialLoss)}:s));
      setHrObserver(prev=>({...prev,lbs:newHrLbs,disposition:Math.min(100,prev.disposition+4)}));
      setAp(a=>a-1);
      push(`✦ ${celestial.name} pushes divine mass toward ${hrObserver.name} — she gains ${Math.round(celestialLoss*1.2)} lbs. (+4 disposition)`);
    } else if(targetId==="vaughan"&&vaughan){
      const newVLbs=Math.round(vaughan.lbs+celestialLoss*1.2);
      setStudents(prev=>prev.map(s=>s.id===celestialId?{...s,lbs:Math.max(820,s.lbs-celestialLoss)}:s));
      setVaughan(prev=>({...prev,lbs:newVLbs}));
      setAp(a=>a-1);
      push(`✦ ${celestial.name} pushes divine mass into Dr. Vaughan — she gains ${Math.round(celestialLoss*1.2)} lbs.`);
    } else {
      const target=students.find(s=>s.id===targetId);
      if(!target){push("⚠️ Invalid target.");return;}
      setStudents(prev=>prev.map(s=>{
        if(s.id===celestialId) return {...s,lbs:Math.max(820,s.lbs-celestialLoss)};
        if(s.id===targetId) return {...s,lbs:s.lbs+Math.round(celestialLoss*1.2)};
        return s;
      }));
      setAp(a=>a-1);
      push(`✦ ${celestial.name} pushes a blessing of ${celestialLoss} lbs into ${target.name}.`);
    }
  };

  const celestialMassBless=(celestialId,targetId)=>{
    if(ap<2){push("⚠️ Need 2 AP.");return;}
    const celestial=students.find(s=>s.id===celestialId);
    if(!celestial) return;
    const stage=celestial.ascensionStage||0;
    const blessAmt=Math.round(CELESTIAL_BLESS_AMOUNTS[stage]*divineCelestialTransferMult);
    if(targetId==="hr"&&hrObserver){
      setHrObserver(prev=>({...prev,lbs:prev.lbs+blessAmt,disposition:Math.min(100,prev.disposition+10)}));
      setAp(a=>a-2);
      push(`✦ ${celestial.name} bestows a sacred blessing upon ${hrObserver.name} — she gains ${blessAmt} lbs. (+10 disposition)`);
    } else if(targetId==="vaughan"&&vaughan){
      setVaughan(prev=>({...prev,lbs:prev.lbs+blessAmt,disposition:Math.min(100,(prev.disposition||0)+6)}));
      setAp(a=>a-2);
      push(`✦ ${celestial.name} bestows a sacred blessing upon Dr. Vaughan — she gains ${blessAmt} lbs. (+6 disposition)`);
    } else {
      const target=students.find(s=>s.id===targetId);
      if(!target) return;
      setStudents(prev=>prev.map(s=>{
        if(s.id===targetId) return {...s,lbs:s.lbs+blessAmt,relationship:Math.min(100,s.relationship+8)};
        return s;
      }));
      setAp(a=>a-2);
      push(`✦ ${celestial.name} radiates a sacred blessing — ${target.name} gains ${blessAmt} lbs. (+8 relationship)`);
    }
  };

  const umbralVoidPull=(umbralId,targetId)=>{
    if(ap<2){push("⚠️ Need 2 AP.");return;}
    const umbral=students.find(s=>s.id===umbralId);
    const target=students.find(s=>s.id===targetId);
    if(!umbral||!target) return;
    if(umbral.ascensionPath!=="umbral"){push("⚠️ Only Umbral blobs can pull through the void.");return;}
    const stage=umbral.ascensionStage||0;
    const pullAmt=UMBRAL_VOID_PULL_AMOUNTS[stage];
    const actualLoss=Math.min(pullAmt,Math.max(0,target.lbs-80));
    setStudents(prev=>prev.map(s=>{
      if(s.id===targetId) return {...s,lbs:Math.max(80,s.lbs-actualLoss),relationship:Math.max(0,s.relationship-5)};
      if(s.id===umbralId) return {...s,lbs:s.lbs+Math.round(actualLoss*1.4)};
      return s;
    }));
    setAp(a=>a-2);
    addScrutiny(4);
    push(`🌑 ${umbral.name} pulls ${actualLoss} lbs through the void from ${target.name}. (+${Math.round(actualLoss*1.4)} absorbed)`);
  };

  const umbralConsumeStudent=(umbralId,targetId)=>{
    if(ap<3){push("⚠️ Need 3 AP.");return;}
    const umbral=students.find(s=>s.id===umbralId);
    const target=students.find(s=>s.id===targetId);
    if(!umbral||!target) return;
    if(umbral.ascensionPath!=="umbral"){push("⚠️ Only Umbral blobs can consume.");return;}
    const stage=umbral.ascensionStage||0;
    const stageTarget=getStage(target.lbs).id;
    if(stageTarget>stage+1){push(`⚠️ ${umbral.name} can only consume students up to ${WEIGHT_STAGES[Math.min(10,stage+1)].label} stage.`);return;}
    const baseChance=UMBRAL_CONSUME_CHANCE[stage]+divineUmbralConsumeBonus;
    const finalChance=Math.min(0.97,baseChance);
    setAp(a=>a-3);
    addScrutiny(18);
    if(Math.random()<=finalChance){
      const absorbRate=Math.min(1,UMBRAL_ABSORB_RATE[stage]+divineUmbralAbsorbBonus);
      const absorbed=Math.round(target.lbs*absorbRate);
      setStudents(prev=>{
        const without=prev.filter(s=>s.id!==targetId);
        return without.map(s=>{
          if(s.id===umbralId) return {...s,lbs:s.lbs+absorbed,consumedIds:[...(s.consumedIds||[]),targetId]};
          return s;
        });
      });
      setConsumedStudents(prev=>[...prev,{...target,consumedBy:umbralId,consumedAt:week}]);
      push(`🌑 ${umbral.name} CONSUMES ${target.name}. +${absorbed} lbs absorbed. ${target.name} is gone — but not unrecoverable.`);
      push(`   The void takes her. She is part of ${umbral.name} now.`);
    } else {
      push(`🌑 ${umbral.name} attempts to consume ${target.name} — but she slips the grasp. ${target.name} is shaken. (+18 scrutiny)`);
      setStudents(prev=>prev.map(s=>s.id===targetId?{...s,relationship:Math.max(0,s.relationship-15),mood:"scared"}:s));
    }
  };

  const umbralConsumeHR=(umbralId)=>{
    if(!divineUmbralCanConsumeHR){push("⚠️ Requires Umbral Maw skill.");return;}
    if(!hrObserver&&!vaughan){push("⚠️ No HR target available.");return;}
    if(ap<4){push("⚠️ Need 4 AP.");return;}
    const umbral=students.find(s=>s.id===umbralId);
    if(!umbral||umbral.ascensionPath!=="umbral") return;
    setAp(a=>a-4);
    addScrutiny(35);
    if(hrObserver){
      const absorbed=Math.round(hrObserver.lbs*0.9);
      setStudents(prev=>prev.map(s=>s.id===umbralId?{...s,lbs:s.lbs+absorbed}:s));
      setHrObserver(null);
      push(`🌑 ${umbral.name} consumes ${hrObserver.name}. +${absorbed} lbs. The HR threat is gone — and enormous. (+35 scrutiny)`);
    } else if(vaughan){
      const absorbed=Math.round(vaughan.lbs*0.9);
      setStudents(prev=>prev.map(s=>s.id===umbralId?{...s,lbs:s.lbs+absorbed}:s));
      setVaughan(null);
      setVaughanAlly(false);
      push(`🌑 ${umbral.name} consumes Dr. Vaughan. +${absorbed} lbs. (+35 scrutiny)`);
    }
  };

  const recoverConsumedStudent=(studentId,umbralId)=>{
    const consumed=consumedStudents.find(s=>s.id===studentId);
    if(!consumed){push("⚠️ Student not found.");return;}
    if(ap<3){push("⚠️ Need 3 AP.");return;}
    const umbral=students.find(s=>s.id===umbralId);
    if(!umbral){push("⚠️ Umbral student not found.");return;}
    const lossFromUmbral=Math.round(consumed.lbs*0.5);
    const recoveryWeight=consumed.lbs;
    setStudents(prev=>{
      const updated=prev.map(s=>{
        if(s.id!==umbralId) return s;
        return {...s,lbs:Math.max(820,s.lbs-lossFromUmbral),consumedIds:(s.consumedIds||[]).filter(id=>id!==studentId)};
      });
      return [...updated,{...consumed,lbs:recoveryWeight,consumedBy:undefined,consumedAt:undefined,relationship:Math.max(0,(consumed.relationship||20)-20),mood:"shaken"}];
    });
    setConsumedStudents(prev=>prev.filter(s=>s.id!==studentId));
    setAp(a=>a-3);
    push(`✦ ${consumed.name} has been released from ${umbral.name}. She returns at ${recoveryWeight} lbs — changed, but present.`);
    push(`   Something of the void clings to her. She will never be entirely who she was.`);
  };

  // ── EP2: EVOLUTION HANDLERS ────────────────────────────────────
  const openEvolutionModal=(s)=>{
    const offer=EVOLUTION_OFFER[s.archetype]; if(!offer) return;
    const archPaths=offer.paths;
    const pathKeys=Object.keys(archPaths);
    setEvolutionModal({
      student:s,
      intro:offer.intro(s),
      paths: pathKeys.map(k=>({id:k, label:archPaths[k].label, desc:archPaths[k].desc})),
    });
  };

  const chooseEvolution=(studentId,formId)=>{
    setStudents(prev=>prev.map(s=>s.id!==studentId?s:{...s,evolvedForm:formId,evolvedSkills:[]}));
    const s=students.find(s=>s.id===studentId);
    const meta=EVOLVED_ACTIVITY_META[formId];
    push(`✦ ${s?.name||"She"} has found her path: ${meta?.label||formId}.`);
    setEvolutionModal(null);
  };

  const doEvolvedActivity=(s)=>{
    if(!s.evolvedForm) return;
    const meta=EVOLVED_ACTIVITY_META[s.evolvedForm]; if(!meta) return;
    if(ap<meta.apCost){push(`⚠️ Need ${meta.apCost} AP.`);return;}
    const stageIdx=getEvolvedActivityStageIdx(s);
    // Route to interactive event if one exists for this form+stage
    const evDef=EVOLVED_EVENTS[s.evolvedForm]?.[stageIdx];
    if(evDef){
      setAp(a=>a-meta.apCost);
      setEvolvedEventState({studentId:s.id,formId:s.evolvedForm,stageIdx,phaseIdx:0,history:[],logLines:[],gainAccum:0,relAccum:0,done:false,endingText:null,gainBonus:0,relBonus:0});
      return;
    }
    const actArr=EVOLVED_ACTIVITY_TEXT[s.evolvedForm];
    const rawText=actArr?actArr[stageIdx]:null;
    const text=rawText?(typeof rawText==='function'?rawText(s):rawText):"She's in her element.";
    // Calculate bonuses from evolved skills
    const skills=(s.evolvedSkills||[]);
    const tree=EVOLVED_SKILL_TREES[s.evolvedForm]||[];
    const bonusGain=tree.filter(sk=>skills.includes(sk.id)&&sk.activityGainBonus).reduce((a,b)=>a+(b.activityGainBonus||0),0);
    const bonusRel=tree.filter(sk=>skills.includes(sk.id)&&sk.activityRelBonus).reduce((a,b)=>a+(b.activityRelBonus||0),0);
    const doubleCharge=tree.find(sk=>skills.includes(sk.id)&&sk.doubleActivityCharge);
    const rawGain=rnd(meta.gainRange[0],meta.gainRange[1])+bonusGain;
    const gain=doubleCharge?rawGain*2:rawGain;
    const relGain=meta.relBonus+bonusRel;
    setAp(a=>a-meta.apCost);
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,lbs:st.lbs+gain,relationship:Math.min(100,st.relationship+relGain)}));
    push(`✦ ${s.name} — ${meta.label}: +${gain} lbs · +${relGain} rel`);
    setEvolvedActivityModal({student:s,stageIdx,text});
  };

  const makeEvolvedEventChoice=(choiceId)=>{
    if(!evolvedEventState) return;
    const {studentId,formId,stageIdx,phaseIdx,history,logLines,gainAccum,relAccum}=evolvedEventState;
    const s=students.find(st=>st.id===studentId); if(!s) return;
    const evDef=EVOLVED_EVENTS[formId]?.[stageIdx]; if(!evDef) return;
    const phase=evDef.phases[phaseIdx]; if(!phase) return;
    const choice=phase.choices.find(c=>c.id===choiceId); if(!choice) return;
    const newHistory=[...history,choiceId,...(choice.flag?[choice.flag]:[])];
    const newLog=[...logLines,choice.result];
    const newGain=gainAccum+(choice.lbs||0);
    const newRel=relAccum+(choice.rel||0);
    // Handle feedOther — feed classmates of matching archetype
    if(choice.feedOther){
      const{archetype:targetArch,lbs:otherLbs,text:foText}=choice.feedOther;
      setStudents(prev=>prev.map(st=>{
        if(st.archetype===targetArch&&st.id!==studentId&&!consumedStudents.find(x=>x.id===st.id)){
          return processStudentGain(st,otherLbs,2);
        }
        return st;
      }));
      push(`🍽️ ${foText}`);
    }
    const nextPhase=phaseIdx+1;
    if(nextPhase>=evDef.phases.length){
      // Find best matching ending
      const ending=evDef.endings.find(e=>e.condition(newHistory))||evDef.endings[evDef.endings.length-1];
      const totalGain=newGain+ending.gainBonus;
      const totalRel=newRel+ending.relBonus;
      // Apply gains for the main student — use skills bonuses
      setStudents(prev=>prev.map(st=>{
        if(st.id!==studentId) return st;
        const skList=(st.evolvedSkills||[]);
        const tree=EVOLVED_SKILL_TREES[formId]||[];
        const bonusRel=tree.filter(sk=>skList.includes(sk.id)&&sk.activityRelBonus).reduce((a,b)=>a+(b.activityRelBonus||0),0);
        return processStudentGain(st,totalGain,totalRel+bonusRel);
      }));
      push(`✦ ${s.name} — ${evDef.title}: +${totalGain} lbs · +${totalRel} rel`);
      setEvolvedEventState(prev=>({...prev,phaseIdx:nextPhase,history:newHistory,logLines:newLog,gainAccum:newGain,relAccum:newRel,done:true,endingText:ending.text,gainBonus:ending.gainBonus,relBonus:ending.relBonus}));
    } else {
      setEvolvedEventState(prev=>({...prev,phaseIdx:nextPhase,history:newHistory,logLines:newLog,gainAccum:newGain,relAccum:newRel}));
    }
  };

  const closeEvolvedEvent=()=>setEvolvedEventState(null);

  const purchaseEvolvedSkill=(studentId,skillId)=>{
    const s=students.find(s=>s.id===studentId); if(!s||!s.evolvedForm) return;
    const tree=EVOLVED_SKILL_TREES[s.evolvedForm]||[];
    const skill=tree.find(sk=>sk.id===skillId); if(!skill) return;
    if((s.evolvedSkills||[]).includes(skillId)){push("⚠️ Already unlocked.");return;}
    const totalGainedByStudent=s.lbs-s.startLbs;
    const spent=(s.evolvedSkillsSpent||0);
    const available=totalGainedByStudent-spent;
    if(available<skill.cost){push(`⚠️ Need ${skill.cost} lbs gained (${available} available for ${s.name}).`);return;}
    setStudents(prev=>prev.map(st=>st.id!==studentId?st:{...st,evolvedSkills:[...(st.evolvedSkills||[]),skillId],evolvedSkillsSpent:(st.evolvedSkillsSpent||0)+skill.cost}));
    push(`✦ ${s.name}: unlocked "${skill.label}"`);
  };

  const foundReligion=(blobId)=>{
    if(religion){push("⚠️ The religion already exists.");return;}
    if(ap<2){push("⚠️ Need 2 AP.");return;}
    const blob=students.find(s=>s.id===blobId&&s.ascensionPath);
    if(!blob){push("⚠️ Need an ascended student as the focus.");return;}
    setAp(a=>a-2);
    setReligion({founded:week,devotees:3,ritesHeld:0,worshippedIds:[blobId],weeklyPassiveGain:0.5});
    addScrutiny(5);
    push(`⛪ The religion is founded, centred on ${blob.name}. 3 initial devotees. (+5 scrutiny)`);
    push(`   Something is beginning that you cannot stop — nor would you want to.`);
  };

  const addBlobToReligion=(blobId)=>{
    if(!religion){push("⚠️ Found a religion first.");return;}
    const blob=students.find(s=>s.id===blobId&&s.ascensionPath);
    if(!blob){push("⚠️ That student is not ascended.");return;}
    if(religion.worshippedIds.includes(blobId)){push("⚠️ Already worshipped.");return;}
    setReligion(prev=>prev?{...prev,worshippedIds:[...prev.worshippedIds,blobId],devotees:prev.devotees+2}:prev);
    push(`⛪ ${blob.name} added to the pantheon. +2 devotees.`);
  };

  const holdRite=(rite,blobId)=>{
    if(!religion){push("⚠️ No religion founded yet.");return;}
    if(ap<rite.apCost){push(`⚠️ Need ${rite.apCost} AP.`);return;}
    const blob=students.find(s=>s.id===blobId);
    if(!blob){push("⚠️ Blob student not found.");return;}
    setAp(a=>a-rite.apCost);
    const blobBonus=Math.round(rite.blobBonus*divineRiteBlobMult);
    if(blobBonus>0){
      setStudents(prev=>prev.map(s=>s.id===blobId?{...s,lbs:s.lbs+blobBonus}:s));
    }
    setReligion(prev=>prev?{
      ...prev,
      ritesHeld:prev.ritesHeld+1,
      devotees:prev.devotees+rite.devoteeGain,
      weeklyPassiveGain:(prev.weeklyPassiveGain||0.5)+rite.devoteePassiveGain,
    }:prev);
    addScrutiny(rite.scrutiny);
    if(divineRiteScrutinyReduce>0) setAdminScrutiny(prev=>Math.max(0,prev-divineRiteScrutinyReduce));
    push(`⛪ Rite: ${rite.label}. +${rite.devoteeGain} devotees. +${blobBonus} lbs to ${blob.name}. (+${rite.scrutiny} scrutiny)`);
    setTimeout(()=>push(`   "${rite.scene(blob)}"`),200);
  };

  const triggerConvergence=(studentId,opponentId)=>{
    const s=students.find(st=>st.id===studentId);
    const opp=students.find(st=>st.id===opponentId);
    if(!s||!opp) return;
    if(s.ascensionStage<4||opp.ascensionStage<4){push("⚠️ Both must be at Apex stage.");return;}
    if(ap<5){push("⚠️ Need 5 AP.");return;}
    setAp(a=>a-5);
    const convergenceLbs=Math.max(s.lbs,opp.lbs)+Math.min(s.lbs,opp.lbs);
    setStudents(prev=>prev.map(st=>{
      if(st.id===studentId) return {...st,lbs:convergenceLbs,ascensionPath:"convergence",ascensionStage:0,convergence:true};
      if(st.id===opponentId) return {...st,ascensionPath:null,ascensionStage:null,lbs:80};
      return st;
    }));
    push(`⚡ THE SINGULARITY: ${s.name} and ${opp.name} converge. ${s.name} becomes something beyond naming. ${opp.name} is absorbed entirely.`);
    push(`   ${CONVERGENCE_STAGE.desc}`);
    setConvergenceModal(null);
  };

  const startClass=()=>{
    const scenes=generateClassSession(students,week);
    if(!scenes.length){advanceWeek();return;}
    setClassSession({scenes,sceneIdx:0,outcomes:[],pendingResult:null});
  };

  const makeChoice=(choiceIdx)=>{
    if(!classSession)return;
    const{scenes,sceneIdx}=classSession;
    const{scene,student,type}=scenes[sceneIdx];
    const choice=scene.choices[choiceIdx];
    let newStudents=[...students];
    let gainAmt=0;
    let targetName=null;
    if(type==="student"&&student){
      const s=newStudents.find(st=>st.id===student.id);
      if(s){
        gainAmt=rnd(choice.effect.gain[0],choice.effect.gain[1]);
        const ns=processStudentGain(s,gainAmt,0);
        newStudents=newStudents.map(st=>st.id===s.id?{
          ...ns,
          ...(choice.effect.mood?{mood:choice.effect.mood}:{}),
          relationship:Math.min(100,ns.relationship+(choice.effect.rel||0)),
        }:st);
        targetName=s.name;
      }
    }else if(type==="class"){
      gainAmt=rnd(choice.effect.gain[0],choice.effect.gain[1]);
      newStudents=newStudents.map(s=>processStudentGain(s,gainAmt,0));
      targetName="the class";
    }
    const evs=collectEvents(newStudents);
    setStudents(newStudents);
    if(evs.length){
      setGlobalStats(g=>({...g,narrativeCount:g.narrativeCount+evs.length}));
      setEventQueue(prev=>[...prev,...evs]);
    }
    const resultText=typeof choice.result==="function"?choice.result(student||newStudents[0]):choice.result;
    const outcome={sceneTitle:scene.title,choice:choice.label,result:resultText,gain:gainAmt,target:targetName};
    setClassSession(prev=>({...prev,pendingResult:outcome}));
  };

  const confirmResult=()=>{
    setClassSession(prev=>({
      ...prev,
      sceneIdx:prev.sceneIdx+1,
      outcomes:[...prev.outcomes,prev.pendingResult],
      pendingResult:null,
    }));
  };

  const finishClass=()=>{
    const{outcomes}=classSession;
    setSemesterData(prev=>({
      weeksCompleted:prev.weeksCompleted+1,
      classHistory:[...prev.classHistory,{week,outcomes}],
    }));
    setClassSession(null);
    advanceWeek();
  };

  const doSingle=(action,s)=>{
    if(ap<action.cost){push("⚠️ Not enough AP!");return;}
    if(action.id==="restaurant"){ startDinner(s); return; }
    if(action.id==="observe"){
      const stId=getStage(s.lbs).id;
      const lines=[
        `You spend the day quietly observing ${s.name}.\n\nMorning: ${stId<=3?"She arrives to class on time, finding a seat easily.":"She arrives a little breathless, taking her time settling into her reinforced seat."}\n\nLunch: ${stId<=2?"A modest meal at the dining hall.":stId<=5?"Two full plates and dessert at the dining hall.":"An enormous spread — she's clearly a dining hall regular. Staff greet her by name."}\n\nAfternoon: ${stId<=4?"She moves through campus normally.":"She moves slowly, deliberately, each step carrying real weight."}\n\nEvening: ${stId<=3?"A quiet night, some snacking.":"Delivery arrives at her dorm. Multiple bags. She tips well."}\n\nCurrent weight: ${s.lbs} lbs. Stage: ${getStage(s.lbs).label}.`,
      ];
      setObserveText(lines[0]);
      return;
    }
    setAp(a=>a-action.cost);
    const gain=rnd(action.gain[0],action.gain[1]);
    const ns=processStudentGain(s,gain,4);
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:ns));
    push(`🍽️ ${action.label} with ${s.name}: +${gain} lbs (now ${ns.lbs} lbs)`);
    const evs=collectEvents([ns]);
    if(evs.length){
      setGlobalStats(g=>({...g,narrativeCount:g.narrativeCount+evs.length}));
      setEventQueue(prev=>[...prev,...evs]);
    }
  };

  const doClass=(action)=>{
    if(ap<action.cost){push("⚠️ Not enough AP!");return;}
    setAp(a=>a-action.cost);
    let updated;
    if(action.id==="on_demand_feast"){
      const scaledGain=Math.round((8+avgLbs/100)*(0.8+Math.random()*0.6));
      updated=students.map(s=>processStudentGain(s,scaledGain,7));
      push(`🍾 On-Demand Feast: catering arrives immediately! Each student gains ~${scaledGain} lbs.`);
    } else if(action.id==="group_dinner"||action.id==="dinner_party"){
      if(ap<3){push("⚠️ Need 3 AP for a group dinner.");return;}
      setGroupDinnerPicker({count:action.id==="dinner_party"?3:2,selected:[]});
      return;
    } else {
      updated=students.map(s=>{
        const gain=rnd(action.gain[0],action.gain[1]);
        return processStudentGain(s,gain,1);
      });
      push(`🎉 ${action.label}: The whole class participated!`);
    }
    const evs=collectEvents(updated);
    setStudents(updated);
    // Observer passively eats alongside class food events
    if(hrObserver&&["snacks","bake","feast","on_demand_feast","study_break"].includes(action.id)){
      const obsGain=rnd(1,3);
      const dispGain=(action.id==="feast"||action.id==="on_demand_feast")?4:2;
      setHrObserver(prev=>({...prev,lbs:Math.round(prev.lbs+obsGain),disposition:Math.min(100,prev.disposition+dispGain)}));
    }
    if(evs.length){
      setGlobalStats(g=>({...g,narrativeCount:g.narrativeCount+evs.length}));
      setEventQueue(prev=>[...prev,...evs]);
    }
  };

  const doTalk=(topicId,s)=>{
    const stId=getStage(s.lbs).id;
    const charTopic=CHAR_TALK[s.id]?.[topicId];
    const archTopic=TALK_RESPONSES[topicId];
    const handler=charTopic||archTopic;
    if(!handler){push(`💬 ${s.name} smiles politely.`);return;}
    const resp=handler(s,stId);
    const tLabel={"how_are_you":"How are you doing?","compliment_figure":"Compliment her figure","food_talk":"Talk about food","class_talk":"Discuss class","encourage_eating":"Encourage her to eat more","ask_lifestyle":"Ask about her lifestyle","ask_weight":"Ask about her weight","about_gaining":"Ask about her gaining","future_plans":"Ask about future plans"}[topicId]||topicId;
    push(`💬 You: "${tLabel}"`);
    push(`   ${resp}`);
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,relationship:Math.min(100,st.relationship+2+talkRelBonus)}));
  };

  const doGossip=(gossip, speaker, line)=>{
    const target=students.find(s=>s.id===gossip.targetId);
    push(`💬 You ask ${speaker.name} about ${target?.name||"her classmate"}…`);
    push(`   ${line}`);
    setStudents(prev=>prev.map(s=>s.id!==speaker.id?s:{...s,relationship:Math.min(100,s.relationship+2)}));
  };

  const doHelpFatten=(gossip, speaker)=>{
    const target=students.find(s=>s.id===gossip.targetId);
    if(!target) return;
    push(`🤝 ${speaker.name} agrees to help fatten up ${target.name}. A multiplier is now active!`);
    push(`   "${gossip.offerHelp}"`);
    setStudents(prev=>prev.map(s=>{
      if(s.id===gossip.targetId) return {...s, gainMultiplier:(s.gainMultiplier||1)*gossip.helpMultiplier, gainHelpers:[...(s.gainHelpers||[]),gossip.speakerId]};
      if(s.id===gossip.speakerId) return {...s, relationship:Math.min(100,s.relationship+4)};
      return s;
    }));
  };



  const activateDoubleDown=(dd)=>{
    setStudents(prev=>prev.map(s=>{
      if(s.id!==dd.targetId) return s;
      return {...s,gainMultiplier:(s.gainMultiplier||1)*(1+dd.addMult)};
    }));
    push(`🔥 ${dd.speakerName} doubles down on ${dd.targetName}! (×${(1+dd.addMult).toFixed(2)} multiplier applied)`);
    push(`   "${dd.line}"`);
    setPendingDoubleDowns(prev=>prev.filter(p=>!(p.speakerId===dd.speakerId&&p.targetId===dd.targetId&&p.atLbs===dd.atLbs)));
  };

  const unlockSkill=(sk,bypass=false)=>{
    if(!bypass&&!canUnlock(sk)) return;
    setUnlockedSkills(prev=>[...prev,sk.id]);
    push(`🔓 Skill unlocked: ${sk.label}`);
    if(sk.apBonus>0) setAp(a=>Math.min(a+sk.apBonus,20));
    if(sk.classReaction?.length){
      const reactions=sk.classReaction;
      setTimeout(()=>{
        push(`💬 The class notices the ${sk.label} upgrade:`);
        reactions.forEach((r,i)=>setTimeout(()=>push(`   ${r}`),(i+1)*100));
      },300);
    }
    if(sk.passiveBonus>0) push(`   📈 Passive gain increased by +${sk.passiveBonus} lbs/week`);
  };

  const startSkillPurchase=(sk)=>{
    if(!canUnlock(sk)) return;
    setSkillPurchase({skill:sk,allocation:{}});
  };

  const adjustAllocation=(studentId,delta)=>{
    setSkillPurchase(prev=>{
      const s=students.find(st=>st.id===studentId);
      if(!s) return prev;
      const current=prev.allocation[studentId]||0;
      const maxLoss=Math.max(0,s.lbs-80);
      const newVal=Math.max(0,Math.min(maxLoss,current+delta));
      return{...prev,allocation:{...prev.allocation,[studentId]:newVal}};
    });
  };

  const distributeEvenly=()=>{
    if(!skillPurchase) return;
    const{skill}=skillPurchase;
    const perStudent=Math.ceil(skill.cost/students.length);
    const newAlloc={};
    students.forEach(s=>{ newAlloc[s.id]=Math.min(perStudent,Math.max(0,s.lbs-80)); });
    setSkillPurchase(prev=>({...prev,allocation:newAlloc}));
  };

  const confirmSkillPurchase=()=>{
    if(!skillPurchase) return;
    const{skill,allocation}=skillPurchase;
    const updated=students.map(s=>{
      const loss=allocation[s.id]||0;
      if(!loss) return s;
      const oldStage=getStage(s.lbs).id;
      const newLbs=Math.max(80,s.lbs-loss);
      const newStage=getStage(newLbs).id;
      if(newStage<oldStage){
        setTimeout(()=>push(`📉 ${s.name} drops to ${WEIGHT_STAGES[newStage].label}. "${STAGE_DROP_REACTIONS[s.archetype]?.[newStage]||'…'}"`) ,60);
      }else{
        setTimeout(()=>push(`⚖️ ${s.name} loses ${loss} lbs (${newLbs} lbs).`),60);
      }
      return{...s,lbs:newLbs};
    });
    setStudents(updated);
    setSkillPurchase(null);
    unlockSkill(skill,true);
  };

  // ── DINNER END (single) ──────────────────────────────────────
  const triggerDinnerEnd=(s,finalFullness,maxFullness,totalGain,relBonus)=>{
    const stId=getStage(s.lbs).id;
    const stGrp=stId<=2?0:stId<=5?1:stId<=7?2:3;
    const ratio=finalFullness/maxFullness;
    const fullGrp=ratio<=1.0?0:ratio<=1.3?1:ratio<=1.6?2:3;
    const narrative=DINNER_ENDING_TEXT[stGrp][fullGrp](s);
    setAp(a=>a-2);
    push(`✅ Dinner with ${s.name} complete. +${totalGain} lbs · +${relBonus} relationship.`);
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,relationship:Math.min(100,st.relationship+relBonus)}));
    const evs=collectEvents([s]);
    if(evs.length){setGlobalStats(g=>({...g,narrativeCount:g.narrativeCount+evs.length}));setEventQueue(prev=>[...prev,...evs]);}
    setDinnerEvent(null);
    setDinnerEndPopup({ student:s, finalFullness, maxFullness, totalGain, narrative });
  };

  const startDinner=(s)=>{
    if(!dinnerUnlocked){push("⚠️ Unlock 'Dining Connections' in the Skill Tree first.");return;}
    if(ap<2){push("⚠️ Need 2 AP for a dinner.");return;}
    const maxFullness=60+getStage(s.lbs).id*14;
    setDinnerEvent({ student:s, phase:"venue", venue:null, dishes:[], conversationUsed:[], totalGain:0, fullness:0, maxFullness, offenseLevel:0 });
    setDinnerLog([]);
    addScrutiny(2);
  };

  const chooseDinnerVenue=(venue)=>{
    setDinnerEvent(prev=>({...prev, venue, phase:"dishes"}));
    setDinnerLog(dl=>[...dl, `You arrive at ${venue.label}. ${venue.desc}`]);
    push(`🍽️ Dinner with ${dinnerEvent.student.name} at ${venue.label}.`);
  };

  const orderDish=(dish)=>{
    if((dinnerEvent.dishes||[]).includes(dish.id)) return;
    const gain=rnd(dish.gain[0],dish.gain[1]);
    const scaledGain=Math.round(gain*skillGainMult*(dinnerEvent.student.gainMultiplier||1));
    const prevFullness=dinnerEvent.fullness||0;
    const newFullness=prevFullness+(dish.fullness||15);
    const maxFull=dinnerEvent.maxFullness||80;
    const newTotalGain=dinnerEvent.totalGain+scaledGain;
    const newDishes=[...(dinnerEvent.dishes||[]),dish.id];
    setStudents(prev=>prev.map(s=>s.id!==dinnerEvent.student.id?s:{...s,lbs:s.lbs+scaledGain}));
    push(`🍴 ${dinnerEvent.student.name}: ${dish.label} (+${scaledGain} lbs)`);
    // Overfill probabilistic ending
    if(newFullness>maxFull){
      const overfillRatio=(newFullness-maxFull)/maxFull;
      const endChance=Math.min(0.8,overfillRatio);
      if(Math.random()<endChance){
        const s=students.find(st=>st.id===dinnerEvent.student.id)||dinnerEvent.student;
        const sUpdated={...s,lbs:s.lbs+scaledGain};
        const endMsg=getOverfillEndMsg(sUpdated,getStage(sUpdated.lbs).id);
        setDinnerLog(dl=>[...dl,`🍴 ${dish.label} arrives. ${dish.desc} (+${scaledGain} lbs)`,`😵 ${endMsg}`]);
        setTimeout(()=>triggerDinnerEnd(sUpdated,newFullness,maxFull,newTotalGain,6),1000);
        return;
      }
    }
    const firstHit=newFullness>=maxFull&&prevFullness<maxFull;
    const fullMsg=firstHit?" — she's completely satisfied. The evening could end here..."
      :newFullness>maxFull?" — she's past full, but she doesn't stop."
      :newFullness>=maxFull*0.8?" — getting full..."
      :"";
    setDinnerEvent(prev=>({...prev,dishes:newDishes,totalGain:newTotalGain,fullness:newFullness}));
    setDinnerLog(dl=>[...dl,`🍴 ${dish.label} arrives. ${dish.desc} (+${scaledGain} lbs)${fullMsg}`]);
  };

  const callWaiter=()=>{
    const s=dinnerEvent.student;
    const venueId=dinnerEvent.venue.id;
    const desc=(WAITER_DESC[venueId]||(()=>`The server arrives. "Shall I bring more?" she asks.`))(s);
    setDinnerLog(dl=>[...dl,`🫆 ${desc}`]);
    setDinnerEvent(prev=>({...prev,dishes:[]}));
  };

  const useDinnerConversation=(conv)=>{
    if(dinnerEvent.conversationUsed.includes(conv.id)) return;
    const s=students.find(st=>st.id===dinnerEvent.student.id)||dinnerEvent.student;
    const stId=getStage(s.lbs).id;
    const gainBonus=rnd(conv.gainBonus[0],conv.gainBonus[1]);
    const scaledBonus=Math.round(gainBonus*skillGainMult*(s.gainMultiplier||1));
    const convText=conv.text(s,stId);
    const fullnessChange=conv.fullnessEffect||0;
    const newFullness=Math.max(0,(dinnerEvent.fullness||0)+fullnessChange);
    const newOffense=(dinnerEvent.offenseLevel||0)+(conv.offenseRisk||0);
    setDinnerLog(dl=>[...dl,`💬 ${convText}${scaledBonus>0?` (+${scaledBonus} lbs)`:""}`]);
    push(`💬 Dinner conversation: ${conv.label}`);
    setDinnerEvent(prev=>({...prev,conversationUsed:[...prev.conversationUsed,conv.id],totalGain:prev.totalGain+scaledBonus,fullness:newFullness,offenseLevel:newOffense}));
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,lbs:st.lbs+scaledBonus,relationship:Math.min(100,st.relationship+(conv.relBonus||0))}));
    if(newOffense>=6){
      setTimeout(()=>{
        setDinnerLog(dl=>[...dl,`😤 ${s.name} sets her napkin down. "I think I should head home." She leaves.`]);
        push(`💔 Dinner ended — ${s.name} left. Relationship -15.`);
        setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,relationship:Math.max(0,st.relationship-15)}));
        setAp(a=>a-2); setDinnerEvent(null);
      },800);
    }
  };

  const endEvening=()=>{
    const s=students.find(st=>st.id===dinnerEvent.student.id)||dinnerEvent.student;
    triggerDinnerEnd(s,dinnerEvent.fullness,dinnerEvent.maxFullness,dinnerEvent.totalGain,9);
  };

  // ── GROUP DINNER ─────────────────────────────────────────────
  const startGroupDinner=(studentList)=>{
    if(!dinnerUnlocked){push("⚠️ Unlock 'Dining Connections' first.");return;}
    const apCost=studentList.length>=3?3:3;
    if(ap<apCost){push(`⚠️ Need ${apCost} AP for a group dinner.`);return;}
    const gStudents=studentList.map(s=>({
      ...s, fullness:0, maxFullness:60+getStage(s.lbs).id*14, dishes:[], totalGain:0,
    }));
    setGroupDinnerEvent({ students:gStudents, phase:"venue", venue:null, conversationUsed:[], reactionLevels:{} });
    setGroupDinnerLog([]);
    addScrutiny(5);
  };

  const chooseGroupVenue=(venue)=>{
    setGroupDinnerEvent(prev=>({...prev,venue,phase:"dishes"}));
    const names=groupDinnerEvent.students.map(s=>s.name).join(" & ");
    setGroupDinnerLog(dl=>[...dl,`You arrive at ${venue.label} with ${names}. ${venue.desc}`]);
    push(`🍽️ Group dinner at ${venue.label}.`);
  };

  const orderGroupDish=(dish,targetId)=>{
    const target=groupDinnerEvent.students.find(s=>s.id===targetId);
    if(!target||target.dishes.includes(dish.id)) return;
    const gain=rnd(dish.gain[0],dish.gain[1]);
    const scaledGain=Math.round(gain*skillGainMult*(target.gainMultiplier||1));
    const newFullness=target.fullness+(dish.fullness||15);
    const maxFull=target.maxFullness;
    const newTotalGain=target.totalGain+scaledGain;
    const newDishes=[...target.dishes,dish.id];
    setStudents(prev=>prev.map(s=>s.id!==targetId?s:{...s,lbs:s.lbs+scaledGain}));
    push(`🍴 ${target.name}: ${dish.label} (+${scaledGain} lbs)`);

    // Build reaction log entries before state updates
    const reactionLines=[];
    const newReactionLevels={...groupDinnerEvent.reactionLevels};
    groupDinnerEvent.students.filter(s=>s.id!==targetId).forEach(neg=>{
      const dishDiff=newDishes.length-neg.dishes.length;
      if(dishDiff<=2) return;
      const negStage=getStage(neg.lbs).id;
      const fedStage=getStage(target.lbs).id;
      const stageDiff=fedStage-negStage; // positive = fed girl is fatter
      const level=Math.min(3,newReactionLevels[neg.id]||0);
      const lines=[];
      if(Math.abs(stageDiff)>=2){
        if(stageDiff>=2){
          // Fat girl being fed; thin girl neglected → thin jealousy
          const jFn=THIN_JEALOUSY[neg.archetype]?.[level];
          if(jFn) lines.push(jFn(neg,target));
          // Contextual override at level 2+
          if(level>=2){
            const ctx=THIN_CONTEXTUAL[target.archetype]?.(neg,target);
            if(ctx&&Math.random()<0.5) lines.push(ctx);
          }
          // Fat girl retorts at level 1+
          if(level>=1){
            const retArr=FAT_RETORT[target.archetype];
            if(retArr&&Math.random()<0.65){
              const rFn=retArr[Math.min(level-1,retArr.length-1)];
              if(rFn) lines.push(rFn(target,neg));
            }
          }
        } else {
          // Thin girl being fed; fat girl neglected → fat girl encourages feeding thin one
          const eFn=FAT_ENCOURAGE[neg.archetype]?.[level];
          if(eFn) lines.push(eFn(neg,target));
        }
      } else {
        lines.push(getJealousyLine(neg,target));
      }
      if(lines.length){
        reactionLines.push(...lines.filter(Boolean));
        newReactionLevels[neg.id]=(newReactionLevels[neg.id]||0)+1;
      }
    });

    // Divine pair reaction (~20% chance when ascended students share the table)
    if(Math.random()<0.20&&groupDinnerEvent.students.length>=2){
      const ascended=groupDinnerEvent.students.filter(s=>s.ascensionPath&&s.ascensionPath!=="convergence");
      if(ascended.length>=2){
        const [da,db]=ascended;
        const pairKey=da.ascensionPath===db.ascensionPath
          ?`${da.ascensionPath}_${db.ascensionPath}`
          :"celestial_umbral";
        const pool=DIVINE_PAIR_REACTIONS[pairKey];
        if(pool){
          const line=pool[rnd(0,pool.length-1)](da,db);
          reactionLines.push(line);
        }
      } else if(ascended.length===1){
        const asc=ascended[0];
        const other=groupDinnerEvent.students.find(s=>s.id!==asc.id&&!s.ascensionPath);
        if(other&&Math.random()<0.15){
          const mortalReaction=asc.ascensionPath==="celestial"
            ?`${other.name} watches ${asc.name} eat — the light, the warmth, the impossible ease of it. She says nothing, but her hand moves slightly toward ${asc.name}'s side before she catches herself.`
            :`${other.name} keeps glancing at ${asc.name} across the table. The cold that radiates from her is constant. Unsettling. ${other.name} eats faster, as if motion provides protection.`;
          reactionLines.push(mortalReaction);
        }
      }
    }

    // Unbutton line when first crossing capacity
    if(newFullness>maxFull&&target.fullness<=maxFull){
      reactionLines.push(UNBUTTON_LINES[rnd(0,UNBUTTON_LINES.length-1)](target));
    }

    // Overfill check
    if(newFullness>maxFull){
      const overfillRatio=(newFullness-maxFull)/maxFull;
      const endChance=Math.min(0.8,overfillRatio);
      if(Math.random()<endChance){
        const sLive=students.find(s=>s.id===targetId)||target;
        const sUpdated={...sLive,lbs:sLive.lbs+scaledGain};
        const endMsg=getOverfillEndMsg(sUpdated,getStage(sUpdated.lbs).id);
        setGroupDinnerLog(dl=>[...dl,`🍴 ${dish.label} for ${target.name}. (+${scaledGain} lbs)`,`😵 ${endMsg}`,...reactionLines.map(r=>`👀 ${r}`)]);
        setGroupDinnerEvent(prev=>{
          const remaining=prev.students.filter(s=>s.id!==targetId);
          if(remaining.length===0){
            setTimeout(()=>{setAp(a=>a-3);push(`✅ Group dinner complete.`);setGroupDinnerEvent(null);},900);
            return prev;
          }
          return {...prev,students:remaining,reactionLevels:newReactionLevels};
        });
        const stId=getStage(sUpdated.lbs).id;
        const stGrp=stId<=2?0:stId<=5?1:stId<=7?2:3;
        const ratio=newFullness/maxFull;
        const fullGrp=ratio<=1.0?0:ratio<=1.3?1:ratio<=1.6?2:3;
        setTimeout(()=>{
          setDinnerEndPopup({student:sUpdated,finalFullness:newFullness,maxFullness:maxFull,totalGain:newTotalGain,narrative:DINNER_ENDING_TEXT[stGrp][fullGrp](sUpdated)});
          setStudents(prev=>prev.map(s=>s.id!==targetId?s:{...s,relationship:Math.min(100,s.relationship+5)}));
        },1100);
        return;
      }
    }

    const firstHit=newFullness>=maxFull&&target.fullness<maxFull;
    const fullMsg=firstHit?` — ${target.name} is satisfied. You can keep going.`
      :newFullness>maxFull?` — ${target.name} is past full.`
      :newFullness>=maxFull*0.8?` — ${target.name} is getting full.`:"";
    setGroupDinnerLog(dl=>[...dl,`🍴 ${dish.label} for ${target.name}. ${dish.desc} (+${scaledGain} lbs)${fullMsg}`]);
    setGroupDinnerEvent(prev=>({
      ...prev,
      reactionLevels:newReactionLevels,
      students:prev.students.map(s=>s.id!==targetId?s:{...s,fullness:newFullness,dishes:newDishes,totalGain:newTotalGain}),
    }));
    if(reactionLines.length){
      setTimeout(()=>setGroupDinnerLog(dl=>[...dl,...reactionLines.map(r=>`👀 ${r}`)]),450);
    }
  };

  const callGroupWaiter=()=>{
    const vId=groupDinnerEvent.venue?.id||"bistro";
    const firstS=groupDinnerEvent.students[0];
    const desc=(WAITER_DESC[vId]||(()=>`The server arrives with fresh menus.`))(firstS);
    setGroupDinnerLog(dl=>[...dl,`🫆 ${desc}`]);
    setGroupDinnerEvent(prev=>({...prev,students:prev.students.map(s=>({...s,dishes:[]}))}));
  };

  const useGroupConversation=(conv)=>{
    if(groupDinnerEvent.conversationUsed.includes(conv.id)) return;
    const [s1,s2]=groupDinnerEvent.students;
    const text=conv.text(s1,s2||s1);
    const relB=conv.relBonus||0;
    const fullE=conv.fullnessEffect||0;
    setGroupDinnerLog(dl=>[...dl,`💬 ${text}`]);
    push(`💬 Group conversation: ${conv.label}`);
    setGroupDinnerEvent(prev=>({
      ...prev,
      conversationUsed:[...prev.conversationUsed,conv.id],
      students:prev.students.map(s=>({...s,fullness:Math.max(0,s.fullness+fullE),totalGain:s.totalGain})),
    }));
    setStudents(prev=>prev.map(s=>{
      const inGroup=groupDinnerEvent.students.some(gs=>gs.id===s.id);
      if(!inGroup) return s;
      return {...s,relationship:Math.min(100,s.relationship+relB)};
    }));
  };

  const endGroupDinner=()=>{
    const totalG=groupDinnerEvent.students.reduce((a,s)=>a+s.totalGain,0);
    setAp(a=>a-3);
    push(`✅ Group dinner complete. +${totalG} lbs total across ${groupDinnerEvent.students.length} girls.`);
    setStudents(prev=>prev.map(s=>{
      const inGroup=groupDinnerEvent.students.some(gs=>gs.id===s.id);
      if(!inGroup) return s;
      return {...s,relationship:Math.min(100,s.relationship+7)};
    }));
    setGroupDinnerEvent(null);
  };

  const resolveNarrative=(ev,s,accept)=>{
    if(accept&&ev.gain[1]>0){
      const gain=rnd(ev.gain[0],ev.gain[1]);
      setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,lbs:st.lbs+gain,relationship:Math.min(100,st.relationship+ev.rel)}));
      push(`📖 ${ev.title} resolved. ${s.name} +${gain} lbs, +${ev.rel} relationship.`);
    } else {
      setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,relationship:Math.min(100,st.relationship+Math.floor(ev.rel/2))}));
      push(`📖 ${ev.title} — noted.`);
    }
    setActiveEvent(null);
  };

  const resolveVaughanEvent=(ev,choice)=>{
    push(`👓 ${ev.title}: ${choice.text}`);
    if(choice.delta&&choice.delta>0) addScrutiny(choice.delta);
    else if(choice.delta&&choice.delta<0) setAdminScrutiny(prev=>Math.max(0,prev+choice.delta));
    if(choice.vDelta) setVaughan(prev=>prev?{...prev,disposition:Math.min(100,prev.disposition+choice.vDelta)}:prev);
    setVaughanModal(null);
  };

  const startSocialEvent=(evt)=>{
    if(ap<evt.apCost){push(`⚠️ Need ${evt.apCost} AP.`);return;}
    if(socialWeeks.includes(week)){push("⚠️ You've already hosted a social event this week.");return;}
    setSocialPicker({event:evt,selected:[]});
  };

  const confirmSocialEvent=()=>{
    if(!socialPicker) return;
    const{event,selected}=socialPicker;
    if(selected.length<event.minStudents){push(`⚠️ Need at least ${event.minStudents} students.`);return;}
    setAp(a=>a-event.apCost);
    setSocialWeeks(prev=>[...prev,week]);
    addScrutiny(event.scrutinyAdd);
    let totalGain=0;
    const updatedStudents=students.map(s=>{
      if(!selected.includes(s.id)) return s;
      const gain=rnd(event.baseGain[0],event.baseGain[1]);
      totalGain+=gain;
      return processStudentGain(s,gain,event.relBonus);
    });
    setStudents(updatedStudents);
    if(vaughan&&!vaughanAlly){
      if(event.vaughanAttends){
        const vGain=rnd(1,3);
        const vSuspDelta=event.vaughanEffect;
        const vDispGain=vSuspDelta<0?Math.round(Math.abs(vSuspDelta)*0.6):0;
        setVaughan(prev=>prev?{...prev,lbs:prev.lbs+vGain,suspicion:Math.max(0,prev.suspicion+vSuspDelta),disposition:Math.min(100,prev.disposition+vDispGain)}:prev);
        push(`👓 Dr. Vaughan attended ${event.label} — +${vGain} lbs, suspicion ${vSuspDelta}`);
      } else if(event.vaughanEffect!==0){
        setVaughan(prev=>prev?{...prev,suspicion:Math.max(0,prev.suspicion+event.vaughanEffect)}:prev);
      }
    }
    if(hrObserver&&event.observerGain){
      const oGain=rnd(event.observerGain[0],event.observerGain[1]);
      setHrObserver(prev=>prev?{...prev,lbs:prev.lbs+oGain,disposition:Math.min(100,prev.disposition+event.observerDisp)}:prev);
      push(`👤 ${hrObserver.name} attended — +${oGain} lbs, +${event.observerDisp} disposition`);
    }
    const names=selected.map(id=>students.find(s=>s.id===id)?.name).filter(Boolean).join(", ");
    const perGain=Math.round(totalGain/Math.max(1,selected.length));
    push(`🎉 ${event.label}: ${names} attended. +${totalGain} lbs total.`);
    setSocialResult({event,names,totalGain,scene:event.scene(names,perGain),attendees:selected.length});
    setSocialPicker(null);
    const evs=collectEvents(updatedStudents);
    if(evs.length){setGlobalStats(g=>({...g,narrativeCount:g.narrativeCount+evs.length}));setEventQueue(prev=>[...prev,...evs]);}
  };

  // ── PRIVATE SESSION FUNCTIONS ──────────────────────────────────
  const startPrivateSession=(s)=>{
    const tier=getTier(s.relationship);
    if(tier.id<1){push(`⚠️ ${s.name} needs to be at least Close tier for a private session.`);return;}
    if(ap<2){push("⚠️ Need 2 AP.");return;}
    const hist=sessionHistory[s.id]||{count:0,totalGain:0,capacityBonus:0};
    setSessionLog([]);
    setPrivateSession({
      student:s,phase:"venue",venue:null,foods:[],totalGain:0,
      fullness:0,maxFullness:100+hist.capacityBonus+skillSessionCapBonus,
      encouragementsUsed:[],toleranceBuffer:0,sessionNum:hist.count+1,
      refillRound:0,tappedOut:false,tapOutDialogue:null,
    });
  };

  const chooseSessionVenue=(venue)=>{
    const s=privateSession.student;
    setPrivateSession(prev=>({...prev,venue,phase:"feeding"}));
    push(`🌙 Private session with ${s.name} — ${venue.label}.`);
    setSessionLog([venue.intro(s)]);
  };

  const feedInSession=(food)=>{
    const s=privateSession.student;
    const gain=rnd(food.gain[0],food.gain[1]);
    const scaledGain=Math.round(gain*skillGainMult*(s.gainMultiplier||1));
    const newFullness=privateSession.fullness+food.fullness;
    const effectiveMax=privateSession.maxFullness+privateSession.toleranceBuffer;
    const fPct=Math.round((newFullness/effectiveMax)*100);
    const fsStage=getFullnessStage(fPct);
    const descFns=SESSION_FULLNESS_DESCS[s.archetype]||SESSION_FULLNESS_DESCS.default;
    const desc=descFns[Math.min(fsStage.id,descFns.length-1)](s);
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,lbs:st.lbs+scaledGain}));
    push(`🍽️ ${food.label}: +${scaledGain} lbs`);
    setSessionLog(sl=>[...sl,`🍽️ ${food.label} (+${scaledGain} lbs) — ${food.desc}`,`   ${desc}`]);
    // Check for tap-out
    const tapProb=fPct<150?0:fPct>=250?Infinity:((fPct-150)/100)*0.90;
    const adjustedTapProb=tapProb===Infinity?1:Math.max(0,tapProb-skillTapOutResistance);
    const tapsOut=Math.random()<adjustedTapProb;
    if(tapsOut){
      const liveS=students.find(st=>st.id===s.id)||s;
      const stage=getStage(liveS.lbs);
      const tapStage=liveS.lbs<160?0:liveS.lbs<240?1:liveS.lbs<320?2:3;
      const dialogueSet=TAP_OUT_DIALOGUE[s.id]||TAP_OUT_DIALOGUE.default;
      const tapLine=dialogueSet[tapStage](liveS);
      setPrivateSession(prev=>({...prev,foods:[...prev.foods,food.id],totalGain:prev.totalGain+scaledGain,fullness:newFullness,tappedOut:true,tapOutDialogue:tapLine}));
      push(`⛔ ${s.name} taps out!`);
    } else {
      setPrivateSession(prev=>({...prev,foods:[...prev.foods,food.id],totalGain:prev.totalGain+scaledGain,fullness:newFullness}));
    }
  };

  const getMoreFood=()=>{
    const refreshable=PRIVATE_FOODS.filter(f=>f.course==="more"||f.course==="extra").map(f=>f.id);
    setPrivateSession(prev=>({
      ...prev,
      refillRound:(prev.refillRound||0)+1,
      foods:prev.foods.filter(id=>!refreshable.includes(id)),
    }));
    setSessionLog(sl=>[...sl,"🛒 You step out briefly and return with more food. The table fills again."]);
  };

  const useSessionEncouragement=(enc)=>{
    if(!privateSession||privateSession.encouragementsUsed.includes(enc.id)) return;
    const s=privateSession.student;
    const effectiveMax=privateSession.maxFullness+privateSession.toleranceBuffer;
    const fPct=Math.round((privateSession.fullness/effectiveMax)*100);
    const lbsBonus=enc.lbsBonus?rnd(enc.lbsBonus[0],enc.lbsBonus[1]):0;
    const encLine=enc.line(s,fPct);
    push(`💬 ${encLine}`);
    setSessionLog(sl=>[...sl,`💬 ${encLine}`]);
    if(lbsBonus>0){
      setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,lbs:st.lbs+lbsBonus}));
    }
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,relationship:Math.min(100,st.relationship+enc.relBonus)}));
    setPrivateSession(prev=>({
      ...prev,
      encouragementsUsed:[...prev.encouragementsUsed,enc.id],
      toleranceBuffer:prev.toleranceBuffer+enc.toleranceBoost,
      totalGain:prev.totalGain+lbsBonus,
    }));
  };

  const endPrivateSession=()=>{
    const s=privateSession.student;
    const effectiveMax=privateSession.maxFullness+privateSession.toleranceBuffer;
    const fPct=Math.round((privateSession.fullness/effectiveMax)*100);
    setAp(a=>a-2);
    addScrutiny(2);
    const hist=sessionHistory[s.id]||{count:0,totalGain:0,capacityBonus:0};
    const newCapBonus=hist.capacityBonus+8;
    setSessionHistory(prev=>({...prev,[s.id]:{count:hist.count+1,totalGain:hist.totalGain+privateSession.totalGain,capacityBonus:newCapBonus}}));
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,relationship:Math.min(100,st.relationship+4)}));
    const aftermath=getAftermath(fPct);
    const liveStudent=students.find(st=>st.id===s.id)||s;
    push(`✅ Session with ${s.name} complete. +${privateSession.totalGain} lbs · capacity expanded (+8).`);
    setSessionResult({student:liveStudent,totalGain:privateSession.totalGain,fullnessPct:fPct,scene:aftermath.scene(liveStudent),sessionCount:hist.count+1,capacityBonus:newCapBonus});
    setPrivateSession(null);
  };

  const sel=selectedId!==null?students.find(s=>s.id===selectedId):null;
  const totalGained=students.reduce((a,s)=>a+(s.lbs-s.startLbs),0);
  const avgLbs=Math.round(students.reduce((a,s)=>a+s.lbs,0)/students.length);
  // ── PROFESSOR SUBJECT / TRAIT EFFECTS ───────────────────────
  const hasTrait=(id)=>professorProfile?.traits?.includes(id)||false;
  const hasSubj=(id)=>professorProfile?.subject===id;
  const profGainMult=1+(hasSubj("nutrition")?0.1:0)+(hasSubj("philosophy")?0.05:0)+(hasTrait("generous")?0.15:0);
  const profPassiveBonus=hasTrait("patient")?1:0;
  const observeFree=hasSubj("art_history")||hasTrait("observant");
  const alwaysShowWeight=hasSubj("physical_ed")||hasTrait("observant");
  const talkRelBonus=hasTrait("charismatic")?4:hasSubj("psychology")?2:0;
  // ── SKILL TREE DERIVED VALUES ──────────────────────────────
  const hasSkill=(id)=>unlockedSkills.includes(id);
  const unlockedAll=ALL_SKILLS.filter(sk=>unlockedSkills.includes(sk.id));
  const skillPassiveBonus=unlockedAll.reduce((a,sk)=>a+sk.passiveBonus,0)+profPassiveBonus;
  const skillApBonus=unlockedAll.reduce((a,sk)=>a+sk.apBonus,0);
  const skillGainMult=(1+unlockedAll.reduce((a,sk)=>a+sk.gainMult,0))*profGainMult;
  const skillScrutinyReduce=1-Math.min(0.90,unlockedAll.reduce((a,sk)=>a+(sk.scrutinyReduce||0),0));
  const skillScrutinyPassiveReduce=unlockedAll.reduce((a,sk)=>a+(sk.scrutinyPassiveReduce||0),0);
  const skillSessionCapBonus=unlockedAll.reduce((a,sk)=>a+(sk.sessionCapBonus||0),0);
  const skillTapOutResistance=Math.min(0.60,unlockedAll.reduce((a,sk)=>a+(sk.tapOutResistance||0),0));
  // Divine derived values
  const divineAscendedPassive=unlockedAll.reduce((a,sk)=>a+(sk.ascendedPassiveBonus||0),0);
  const divineCelestialTransferMult=1+unlockedAll.reduce((a,sk)=>a+(sk.celestialTransferBonus||0),0);
  const divineUmbralConsumeBonus=unlockedAll.reduce((a,sk)=>a+(sk.umbralConsumeBonus||0),0);
  const divineUmbralAbsorbBonus=unlockedAll.reduce((a,sk)=>a+(sk.umbralAbsorbBonus||0),0);
  const divineRiteBlobMult=1+unlockedAll.reduce((a,sk)=>a+(sk.riteBlobBonus||0),0);
  const divineRiteScrutinyReduce=unlockedAll.reduce((a,sk)=>a+(sk.riteScrutinyReduce||0),0);
  const divineUmbralVoidPassive=unlockedAll.reduce((a,sk)=>a+(sk.umbralVoidPassive||0),0);
  const divineCelestialApexHeal=unlockedAll.reduce((a,sk)=>a+(sk.celestialApexHeal||0),0);
  const divineUmbralCanConsumeHR=unlockedAll.some(sk=>sk.umbralCanConsumeHR);
  const divineCelestialCanPullHR=unlockedAll.some(sk=>sk.celestialCanPullHR);
  const dinnerUnlocked=unlockedSkills.includes("dinner_basic");
  // EP2: total weekly scrutiny reduction from evolved skills across all students
  const evolvedScrutinyReduce=students.reduce((total,s)=>{
    if(!s.evolvedForm||!(s.evolvedSkills||[]).length) return total;
    const tree=EVOLVED_SKILL_TREES[s.evolvedForm]||[];
    return total+tree.filter(sk=>(s.evolvedSkills||[]).includes(sk.id)&&sk.weeklyScrutinyReduce).reduce((a,b)=>a+(b.weeklyScrutinyReduce||0),0);
  },0);

  // ── EFFECTIVE ACTIONS (applying unlocked skill effects) ──────
  const effectiveSingleActions=ACTIONS_SINGLE.map(a=>({
    ...a,
    cost:Math.max(0,(a.id==="observe"&&observeFree)?0:a.cost-(hasSkill("ap_mastery")?1:0)),
    gain:hasSkill("private_kitchen")&&a.id==="homecooked"?[a.gain[0]+4,a.gain[1]+4]
        :hasSkill("private_kitchen")&&a.id==="bake"?[a.gain[0]+3,a.gain[1]+3]
        :a.gain,
  }));
  const effectiveClassActions=[
    ...ACTIONS_CLASS.map(a=>({
      ...a,
      cost:a.id==="snacks"&&hasSkill("snack_station")?0
          :a.id==="feast"&&hasSkill("catering_contact")?Math.max(0,a.cost-1)
          :a.cost,
      gain:a.id==="feast"&&hasSkill("catering_contact")?[a.gain[0]+4,a.gain[1]+4]:a.gain,
    })),
    ...(hasSkill("full_catering")?[{
      id:"on_demand_feast",label:"🍾 On-Demand Feast",cost:3,
      gain:[Math.round(8+avgLbs/100),Math.round(14+avgLbs/80)],
      desc:"Call the catering team now. Portions scale with your class's average weight.",
    }]:[]),
    ...(hasSkill("group_dynamics")?[{
      id:"group_dinner",label:"👥 Arrange Group Dinner",cost:3,gain:[4,9],
      desc:"Arrange a dinner for two students from an influence pair. Their bond amplifies the result for both.",
    }]:[]),
  ];

  const availableVenues=DINNER_VENUES.filter(v=>{
    if(v.id==="home_dinner") return unlockedSkills.includes("dinner_residence");
    if(v.id==="brunch_hall") return unlockedSkills.includes("dinner_casual");
    if(v.id==="atelier") return false; // filtered per-student inside dinner modal
    if(v.tier===1) return unlockedSkills.includes("dinner_basic");
    if(v.tier===2) return unlockedSkills.includes("dinner_upscale");
    if(v.tier===3) return unlockedSkills.includes("dinner_private");
    if(v.tier===4) return unlockedSkills.includes("dinner_residence");
    return false;
  });
  const canUnlock=(sk)=>{
    if(unlockedSkills.includes(sk.id)) return false;
    if(sk.category==="divine"&&!goddessSeen) return false;
    if(totalGained<sk.cost) return false;
    if(sk.requires) return sk.requires.every(r=>unlockedSkills.includes(r));
    return true;
  };

  // ── STYLES ──────────────────────────────────────────────────────────────
  const C={
    app:{fontFamily:"'Palatino Linotype',Palatino,Georgia,serif",background:"#070510",minHeight:"100vh",color:"#ddd0b8",display:"flex",flexDirection:"column",fontSize:14},
    hdr:{background:"linear-gradient(135deg,#0f0620,#1c0838,#0f0620)",borderBottom:"2px solid #4a1590",padding:"10px 18px",display:"flex",justifyContent:"space-between",alignItems:"center"},
    nav:{display:"flex",background:"#0c0718",borderBottom:"1px solid #200e40",flexWrap:"wrap"},
    navB:(a)=>({background:a?"#180c30":"transparent",border:"none",borderBottom:a?"2px solid #7a24d8":"2px solid transparent",color:a?"#c090ff":"#60409a",padding:"8px 16px",cursor:"pointer",fontSize:12,fontFamily:"inherit",letterSpacing:0.5,transition:"all 0.15s"}),
    body:{display:"flex",flex:1,overflow:"hidden",maxHeight:"calc(100vh - 90px)"},
    main:{flex:1,overflow:"auto",padding:14},
    side:{width:320,background:"#070410",borderLeft:"1px solid #180830",overflow:"hidden",padding:9,flexShrink:0,display:"flex",flexDirection:"column"},
    card:{background:"rgba(255,255,255,0.03)",border:"1px solid #180830",borderRadius:8,padding:10,marginBottom:7,cursor:"pointer",transition:"border-color 0.15s"},
    secT:{fontSize:10,letterSpacing:3,color:"#6028b8",textTransform:"uppercase",marginBottom:8,borderBottom:"1px solid #180830",paddingBottom:3},
    btn:(bg="#5818a8")=>({background:bg,border:"none",color:"#fff",borderRadius:6,padding:"7px 13px",cursor:"pointer",fontSize:12,fontFamily:"inherit",fontWeight:600,transition:"opacity 0.15s"}),
    smBtn:{background:"rgba(80,18,140,0.35)",border:"1px solid #4a1280",color:"#b080e8",borderRadius:5,padding:"4px 9px",cursor:"pointer",fontSize:11,fontFamily:"inherit",margin:"2px 2px",transition:"background 0.15s"},
    grid2:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(185px,1fr))",gap:8},
    grid3:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))",gap:7},
    logE:{fontSize:12,padding:"3px 0",borderBottom:"1px solid rgba(80,18,140,0.12)",lineHeight:1.65,color:"#c0a888"},
    overlay:{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300},
    modal:{background:"#0e0820",border:"1px solid #5a18c8",borderRadius:12,padding:24,maxWidth:540,width:"93%",maxHeight:"88vh",overflow:"auto",boxShadow:"0 0 60px rgba(100,30,200,0.3)"},
    tag:(bg,color="#fff")=>({background:bg,color,borderRadius:10,padding:"2px 8px",fontSize:10,fontWeight:700,letterSpacing:1,whiteSpace:"nowrap"}),
    infoBox:(bg)=>({background:bg,border:"1px solid rgba(255,255,255,0.07)",borderRadius:8,padding:10,marginBottom:9,lineHeight:1.75}),
  };

  const views=["class","actions","achievements","log"];
  if(sel) views.splice(1,0,"student");

  // ── CHARACTER CREATION SCREEN ─────────────────────────────────
  if(!professorProfile){
    const cc=charCreation;
    const canFinish=cc.name.trim()&&cc.subject&&cc.traits.length===2;
    const toggleTrait=(id)=>{
      setCharCreation(prev=>{
        const has=prev.traits.includes(id);
        if(has) return{...prev,traits:prev.traits.filter(t=>t!==id)};
        if(prev.traits.length>=2) return prev;
        return{...prev,traits:[...prev.traits,id]};
      });
    };
    return(
      <div style={{...C.app,alignItems:"center",justifyContent:"center",padding:20}}>
        <div style={{maxWidth:700,width:"100%"}}>
          <div style={{textAlign:"center",marginBottom:28}}>
            <div style={{fontSize:11,letterSpacing:4,color:"#7030c0",marginBottom:6}}>PROFESSOR'S QUARTERS</div>
            <h1 style={{color:"#d0a0ff",margin:"0 0 6px",fontSize:26,fontWeight:400,fontFamily:"inherit"}}>Before the Semester Begins</h1>
            <div style={{color:"#7060a0",fontSize:13}}>Tell us who you are.</div>
          </div>

          {/* Name */}
          <div style={{marginBottom:22}}>
            <div style={C.secT}>Your Name</div>
            <input value={cc.name} onChange={e=>setCharCreation(prev=>({...prev,name:e.target.value}))}
              placeholder="Professor…"
              style={{background:"rgba(255,255,255,0.05)",border:"1px solid #4a1580",borderRadius:6,padding:"9px 13px",color:"#ddd0b8",fontSize:14,fontFamily:"inherit",width:"100%",boxSizing:"border-box"}}/>
          </div>

          {/* Subject */}
          <div style={{marginBottom:22}}>
            <div style={C.secT}>Your Subject</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:8}}>
              {PROF_SUBJECTS.map(sub=>{
                const sel=cc.subject===sub.id;
                return(
                  <div key={sub.id} onClick={()=>setCharCreation(prev=>({...prev,subject:sub.id}))}
                    style={{background:sel?"rgba(120,40,220,0.25)":"rgba(255,255,255,0.03)",border:`1px solid ${sel?"#8040d0":"#200e40"}`,borderRadius:8,padding:10,cursor:"pointer",transition:"all 0.15s"}}>
                    <div style={{fontSize:13,color:sel?"#d090ff":"#b080d8",marginBottom:3}}>{sub.emoji} {sub.label}</div>
                    <div style={{fontSize:11,color:"#7060a0",lineHeight:1.5,marginBottom:4}}>{sub.desc}</div>
                    <div style={{fontSize:10,color:"#5030a0",fontStyle:"italic"}}>{sub.bonus}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Traits */}
          <div style={{marginBottom:28}}>
            <div style={C.secT}>Your Traits <span style={{fontWeight:400,color:"#5030a0"}}>(pick 2)</span></div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(195px,1fr))",gap:8}}>
              {PROF_TRAITS.map(tr=>{
                const sel=cc.traits.includes(tr.id);
                const disabled=!sel&&cc.traits.length>=2;
                return(
                  <div key={tr.id} onClick={()=>!disabled&&toggleTrait(tr.id)}
                    style={{background:sel?"rgba(120,40,220,0.25)":"rgba(255,255,255,0.03)",border:`1px solid ${sel?"#8040d0":"#200e40"}`,borderRadius:8,padding:10,cursor:disabled?"not-allowed":"pointer",opacity:disabled?0.45:1,transition:"all 0.15s"}}>
                    <div style={{fontSize:13,color:sel?"#d090ff":"#b080d8",marginBottom:3}}>{tr.emoji} {tr.label}</div>
                    <div style={{fontSize:11,color:"#7060a0",lineHeight:1.5,marginBottom:4}}>{tr.desc}</div>
                    <div style={{fontSize:10,color:"#5030a0",fontStyle:"italic"}}>{tr.effect}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{textAlign:"center"}}>
            <button disabled={!canFinish} onClick={()=>setProfessorProfile({name:cc.name.trim(),subject:cc.subject,traits:cc.traits})}
              style={{...C.btn(canFinish?"#7020c8":"#2a1040"),fontSize:14,padding:"11px 32px",opacity:canFinish?1:0.5,cursor:canFinish?"pointer":"not-allowed"}}>
              Begin the Semester
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={C.app}>

{/* SKILL PURCHASE MODAL */}
      {skillPurchase&&(()=>{
        const{skill,allocation}=skillPurchase;
        const totalAllocated=Object.values(allocation).reduce((a,v)=>a+v,0);
        const remaining=Math.max(0,skill.cost-totalAllocated);
        const canConfirm=totalAllocated>=skill.cost;
        return(
          <div style={C.overlay}>
            <div style={{...C.modal,maxWidth:580}}>
              <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:3}}>UNLOCK SKILL</div>
              <h2 style={{margin:"0 0 4px",color:"#c898ff",fontSize:18}}>{skill.label}</h2>
              <div style={{fontSize:11,color:"#9070b0",lineHeight:1.5,marginBottom:4}}>{skill.desc}</div>
              <div style={{fontSize:11,color:"#c090d0",fontStyle:"italic",marginBottom:12}}>{skill.effect}</div>
              <div style={{...C.infoBox("rgba(100,40,200,0.1)"),display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <span style={{fontSize:12,color:"#d0b8e8"}}>Cost: <strong style={{color:"#f0a060"}}>{skill.cost} lbs</strong></span>
                <span style={{fontSize:12,color:canConfirm?"#80e080":"#f0a060",fontWeight:700}}>
                  {totalAllocated} / {skill.cost} lbs assigned {canConfirm?"✓":`— need ${remaining} more`}
                </span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div style={C.secT}>Assign weight loss per student</div>
                <button style={C.smBtn} onClick={distributeEvenly}>Distribute evenly</button>
              </div>
              <div style={{maxHeight:320,overflowY:"auto",display:"flex",flexDirection:"column",gap:5,marginBottom:12}}>
                {students.map(s=>{
                  const alloc=allocation[s.id]||0;
                  const maxLoss=Math.max(0,s.lbs-80);
                  const st=getStage(s.lbs);
                  const newStage=alloc>0?getStage(Math.max(80,s.lbs-alloc)):null;
                  const willDrop=newStage&&newStage.id<st.id;
                  return(
                    <div key={s.id} style={{...C.card,cursor:"default",display:"flex",alignItems:"center",gap:8,padding:"7px 10px"}}>
                      <div style={{flex:1,minWidth:0}}>
                        <span style={{fontWeight:700,fontSize:12,color:"#d8a8ff"}}>{s.name}</span>
                        <span style={{fontSize:10,color:"#6a4880",marginLeft:6}}>{s.lbs} lbs</span>
                        {alloc>0&&<span style={{fontSize:10,color:willDrop?"#f06060":"#f0a060",marginLeft:6}}>
                          → {s.lbs-alloc} lbs{willDrop?` (${newStage.label}!)`:""}
                        </span>}
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:3,flexShrink:0}}>
                        {[[-10,"−10"],[-5,"−5"],[-1,"−1"]].map(([d,lbl])=>(
                          <button key={d} style={{...C.smBtn,padding:"2px 6px",opacity:alloc<=0?0.3:1}} onClick={()=>adjustAllocation(s.id,d)}>{lbl}</button>
                        ))}
                        <span style={{fontSize:13,fontWeight:700,color:alloc>0?"#f0a060":"#3a2050",minWidth:30,textAlign:"center"}}>
                          {alloc>0?`-${alloc}`:"0"}
                        </span>
                        {[[1,"+1"],[5,"+5"],[10,"+10"]].map(([d,lbl])=>(
                          <button key={d} style={{...C.smBtn,padding:"2px 6px",opacity:alloc>=maxLoss?0.3:1}} onClick={()=>adjustAllocation(s.id,d)}>{lbl}</button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{display:"flex",gap:8}}>
                <button style={C.btn("#444")} onClick={()=>setSkillPurchase(null)}>Cancel</button>
                <button style={{...C.btn(canConfirm?"#5020a0":"#2a1040"),flex:1,opacity:canConfirm?1:0.6}}
                  onClick={()=>canConfirm&&confirmSkillPurchase()}>
                  {canConfirm?`🔓 Unlock ${skill.label}`:`Assign ${remaining} more lbs to unlock`}
                </button>
              </div>
            </div>
          </div>
        );
      })()}

{/* CLASS SESSION MODAL */}
      {classSession&&(()=>{
        const{scenes,sceneIdx,outcomes,pendingResult}=classSession;
        const isDone=sceneIdx>=scenes.length&&!pendingResult;
        const current=!isDone&&!pendingResult?scenes[sceneIdx]:null;
        return(
          <div style={C.overlay}>
            <div style={{...C.modal,maxWidth:600}}>
              <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:3}}>CLASS SESSION — WEEK {week}</div>
              <h2 style={{margin:"0 0 4px",color:"#c898ff",fontSize:19}}>
                {isDone?"Session Complete":pendingResult?pendingResult.sceneTitle:current?.scene.title}
              </h2>
              <div style={{display:"flex",gap:6,margin:"8px 0 14px"}}>
                {scenes.map((_,i)=>(
                  <div key={i} style={{width:8,height:8,borderRadius:"50%",background:
                    (isDone||i<sceneIdx||(pendingResult&&i<=sceneIdx))?"#8040c8":
                    i===sceneIdx?"#c898ff":"#180830"}}/>
                ))}
              </div>

              {pendingResult&&(
                <div>
                  <div style={{...C.infoBox("rgba(100,40,200,0.1)"),fontSize:13,lineHeight:1.75,color:"#d0b8e8",marginBottom:12}}>
                    {pendingResult.result}
                  </div>
                  {pendingResult.gain>0&&(
                    <div style={{fontSize:12,color:"#f0a060",marginBottom:12}}>
                      {pendingResult.target==="the class"
                        ?`📊 Each student gains ~${pendingResult.gain} lbs`
                        :`⚖️ ${pendingResult.target} gains ${pendingResult.gain} lbs`}
                    </div>
                  )}
                  <button onClick={confirmResult} style={C.btn("#5818a8")}>
                    {sceneIdx<scenes.length-1?"Continue →":"View Summary →"}
                  </button>
                </div>
              )}

              {current&&!pendingResult&&(()=>{
                const{scene,student}=current;
                return(
                  <div>
                    {student&&(
                      <div style={{fontSize:11,color:"#7a50a0",marginBottom:8}}>
                        {student.archetype} · {student.lbs} lbs · <MoodBadge mood={student.mood}/>
                      </div>
                    )}
                    <div style={{...C.infoBox("rgba(20,8,40,0.8)"),fontSize:13,lineHeight:1.75,color:"#c8a8e8",marginBottom:14}}>
                      {typeof scene.text==="function"?scene.text(student):scene.text}
                    </div>
                    <div style={C.secT}>How do you respond?</div>
                    <div style={{display:"flex",flexDirection:"column",gap:8}}>
                      {scene.choices.map((ch,i)=>(
                        <div key={i} style={{...C.card,cursor:"pointer"}} onClick={()=>makeChoice(i)}>
                          <div style={{fontWeight:700,fontSize:13,color:"#d8a8ff",marginBottom:2}}>{ch.label}</div>
                          {(ch.effect.gain?.[1]>0||ch.effect.rel||ch.effect.mood)&&(
                            <div style={{fontSize:10,color:"#7a5040"}}>
                              {ch.effect.rel?`❤ +${ch.effect.rel}  `:""}
                              {ch.effect.gain?.[1]>0?`⚖ +${ch.effect.gain[0]}–${ch.effect.gain[1]} lbs  `:""}
                              {ch.effect.mood?`😊 → ${ch.effect.mood}`:""}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {isDone&&(
                <div>
                  <div style={{...C.secT,marginBottom:10}}>This Week's Events</div>
                  {outcomes.map((o,i)=>(
                    <div key={i} style={{...C.infoBox("rgba(20,8,40,0.6)"),marginBottom:8}}>
                      <div style={{fontWeight:700,fontSize:12,color:"#d8a8ff",marginBottom:3}}>{o.sceneTitle}</div>
                      <div style={{fontSize:11,color:"#7a5090",marginBottom:4}}>You chose: {o.choice}</div>
                      <div style={{fontSize:12,color:"#c0a0d8",lineHeight:1.6}}>{o.result}</div>
                      {o.gain>0&&<div style={{fontSize:11,color:"#f0a060",marginTop:4}}>
                        {o.target==="the class"?`Class: +${o.gain} lbs each`:`${o.target}: +${o.gain} lbs`}
                      </div>}
                    </div>
                  ))}
                  <button onClick={finishClass} style={{...C.btn("#186028"),marginTop:4}}>⏩ End Week</button>
                </div>
              )}
            </div>
          </div>
        );
      })()}

{/* DINNER EVENT MODAL */}
      {dinnerEvent&&(()=>{
        const ds=students.find(s=>s.id===dinnerEvent.student.id)||dinnerEvent.student;
        const stId=getStage(ds.lbs).id;
        const rawPct=Math.round(((dinnerEvent.fullness||0)/(dinnerEvent.maxFullness||80))*100);
        const fullnessPct=rawPct;
        const fullnessColor=rawPct>=130?"#801010":rawPct>=100?"#c02020":rawPct>=80?"#c08020":"#20a060";
        const isOverfull=rawPct>100;
        const isAtCapacity=rawPct>=100;
        const isAlmostFull=rawPct>=80;
        const atelier=DINNER_VENUES.find(v=>v.id==="atelier");
        const showAtelier=hasSkill("dinner_accessible")&&stId>=6;
        const venueList=[...availableVenues,...(showAtelier?[atelier]:[])];
        return(
          <div style={C.overlay}>
            <div style={{...C.modal,maxWidth:640}}>
              {/* Header */}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                <div>
                  <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:3}}>DINNER OUT</div>
                  <h2 style={{margin:0,color:"#c898ff",fontSize:20}}>Dinner with {ds.name}</h2>
                  <div style={{fontSize:11,color:"#5a309a",marginTop:3}}>{ds.lbs} lbs · {getStage(ds.lbs).label} · ❤ {ds.relationship}%</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:13,color:"#f0a060",fontWeight:700}}>+{dinnerEvent.totalGain} lbs so far</div>
                  <div style={{fontSize:10,color:"#5a4070",marginTop:3}}>{dinnerEvent.dishes.length} dishes · {dinnerEvent.conversationUsed.length} conversations</div>
                </div>
              </div>

              {/* Fullness meter — only in dishes phase */}
              {dinnerEvent.phase==="dishes"&&(
                <div style={{marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:10,marginBottom:3}}>
                    <span style={{color:"#7a5070",letterSpacing:1}}>FULLNESS</span>
                    <span style={{color:fullnessColor,fontWeight:700}}>
                      {fullnessPct}%{isOverfull?" — overfull, risky...":isAtCapacity?" — completely full":isAlmostFull?" — getting full":""}
                    </span>
                  </div>
                  <div style={{background:"#0d0816",borderRadius:4,height:7,overflow:"hidden",position:"relative"}}>
                    <div style={{width:`${Math.min(100,fullnessPct)}%`,height:"100%",background:fullnessColor,borderRadius:4,transition:"width 0.4s ease"}}/>
                    {isOverfull&&<div style={{position:"absolute",left:`${Math.round(100*dinnerEvent.maxFullness/(dinnerEvent.fullness||1))}%`,top:0,bottom:0,width:2,background:"#ffffff44"}}/>}
                  </div>
                  {isOverfull&&<div style={{fontSize:10,color:"#c04020",marginTop:2,fontStyle:"italic"}}>Each additional dish risks ending the evening.</div>}
                </div>
              )}

              {/* PHASE: VENUE SELECTION */}
              {dinnerEvent.phase==="venue"&&(
                <div>
                  <div style={{fontSize:12,color:"#9070c0",marginBottom:12,fontStyle:"italic"}}>
                    Where would you like to take {ds.name} tonight?
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                    {venueList.map(v=>(
                      <div key={v.id} style={{...C.card,cursor:"pointer",border:v.id==="atelier"?"1px solid #806020":"1px solid #180830"}} onClick={()=>chooseDinnerVenue(v)}>
                        <div style={{fontWeight:700,fontSize:13,color:v.id==="atelier"?"#f0d060":"#d8a8ff",marginBottom:3}}>{v.label}</div>
                        <div style={{fontSize:11,color:"#6a4888",lineHeight:1.4,marginBottom:5}}>{v.desc}</div>
                        <div style={{fontSize:10,color:"#7a5040"}}>{v.baseCourses} courses · +{v.gainRange[0]}–{v.gainRange[1]} lbs est.</div>
                        {v.id==="atelier"&&<div style={{fontSize:9,color:"#a08030",marginTop:3}}>✦ Specialty — stage 6+ only</div>}
                      </div>
                    ))}
                  </div>
                  <button style={{...C.btn("#444"),marginTop:12}} onClick={()=>setDinnerEvent(null)}>Cancel</button>
                </div>
              )}

              {/* PHASE: DINING */}
              {dinnerEvent.phase==="dishes"&&dinnerEvent.venue&&(
                <div>
                  <div style={{fontSize:11,color:"#7a5090",marginBottom:10,fontStyle:"italic"}}>
                    {dinnerEvent.venue.label} — {dinnerEvent.venue.desc}
                  </div>

                  {/* Dishes grid */}
                  {(()=>{
                    const orderedIds=dinnerEvent.dishes||[];
                    const availDishes=dinnerEvent.venue.dishes.filter(d=>!orderedIds.includes(d.id));
                    const allOrdered=availDishes.length===0;
                    return(<>
                      <div style={{...C.secT,marginBottom:7}}>Menu</div>
                      {allOrdered?(
                        <div style={{textAlign:"center",padding:"10px 0",marginBottom:12}}>
                          <div style={{fontSize:11,color:"#6a4870",fontStyle:"italic",marginBottom:8}}>The table is cleared.</div>
                          <button style={{...C.btn("#4a2060")}} onClick={callWaiter}>🫆 Call for More</button>
                        </div>
                      ):(
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:12}}>
                          {availDishes.map(dish=>(
                            <div key={dish.id}
                              style={{...C.card,cursor:"pointer",
                                border:`1px solid ${isOverfull?"#502020":"#180830"}`,
                                opacity:isOverfull?0.75:1}}
                              onClick={()=>orderDish(dish)}>
                              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                                <span style={{fontWeight:700,fontSize:12,color:isOverfull?"#e09090":"#d8a8ff"}}>{dish.label}</span>
                                <span style={{fontSize:9,color:"#a07050"}}>+{dish.gain[0]}–{dish.gain[1]} lbs</span>
                              </div>
                              <div style={{fontSize:10,color:"#6a4870",lineHeight:1.4,marginTop:2}}>{dish.desc}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>);
                  })()}

                  {/* Conversation */}
                  <div style={{...C.secT,marginBottom:7}}>Conversation</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12}}>
                    {DINNER_CONVERSATION
                      .filter(conv=>!conv.requires||hasSkill(conv.requires))
                      .map(conv=>{
                        const used=dinnerEvent.conversationUsed.includes(conv.id);
                        return(
                          <button key={conv.id}
                            style={{...C.smBtn,opacity:used?0.4:1,textDecoration:used?"line-through":"none"}}
                            onClick={()=>!used&&useDinnerConversation(conv)}>
                            {conv.label}</button>
                        );
                      })}
                  </div>

                  {/* Dinner log */}
                  <div style={{background:"rgba(20,5,35,0.8)",border:"1px solid #2a0848",borderRadius:8,padding:10,marginBottom:10,maxHeight:160,overflowY:"auto",display:"flex",flexDirection:"column",gap:3}}>
                    {dinnerLog.length===0
                      ?<div style={{fontSize:12,color:"#5a3070",fontStyle:"italic"}}>{ds.name} looks at the menu with obvious interest.</div>
                      :dinnerLog.map((line,i)=>(
                        <div key={i} style={{fontSize:12,color:line.startsWith("💬")?"#e8d0a8":line.startsWith("🍴")?"#d0a860":line.startsWith("😤")?"#f06040":"#b090c8",lineHeight:1.6,borderBottom:i<dinnerLog.length-1?"1px solid rgba(80,20,120,0.1)":"none",paddingBottom:i<dinnerLog.length-1?3:0}}>
                          {line}
                        </div>
                      ))
                    }
                  </div>

                  <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                    <div style={{fontSize:11,color:"#f0a060",fontWeight:700,flex:1}}>+{dinnerEvent.totalGain} lbs total</div>
                    {isAtCapacity&&(
                      <button style={C.btn("#2a6830")} onClick={endEvening}>End Evening ✓</button>
                    )}
                    <button style={C.btn("#333")} onClick={()=>{setAp(a=>a-2);setDinnerEvent(null);}}>
                      Leave Early
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* GIRL PICKER */}
      {groupDinnerPicker&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:580}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:6}}>SELECT GIRLS</div>
            <div style={{fontSize:12,color:"#9070c0",marginBottom:14,fontStyle:"italic"}}>
              Choose {groupDinnerPicker.count} girls to take to dinner.
              {" "}({groupDinnerPicker.selected.length}/{groupDinnerPicker.count} selected)
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:14,maxHeight:340,overflowY:"auto"}}>
              {students.map(s=>{
                const isSelected=groupDinnerPicker.selected.includes(s.id);
                const isFull=!isSelected&&groupDinnerPicker.selected.length>=groupDinnerPicker.count;
                const stg=getStage(s.lbs);
                return(
                  <div key={s.id}
                    style={{...C.card,cursor:isFull?"default":"pointer",
                      border:`1px solid ${isSelected?"#7a30d8":isFull?"#180830":"#280840"}`,
                      background:isSelected?"rgba(80,20,140,0.3)":"rgba(255,255,255,0.03)",
                      opacity:isFull?0.45:1}}
                    onClick={()=>{
                      if(isFull) return;
                      setGroupDinnerPicker(prev=>({
                        ...prev,
                        selected:isSelected?prev.selected.filter(id=>id!==s.id):[...prev.selected,s.id],
                      }));
                    }}>
                    <div style={{fontWeight:700,fontSize:12,color:isSelected?"#d0a0ff":"#c0a0e0",marginBottom:2}}>{s.name.split(" ")[0]}</div>
                    <div style={{fontSize:10,color:"#7a5090"}}>{stg.label}</div>
                    <div style={{fontSize:10,color:"#5a3060"}}>{s.lbs} lbs · ❤ {s.relationship}</div>
                    {isSelected&&<div style={{fontSize:9,color:"#a060f0",marginTop:3}}>✓ Selected</div>}
                  </div>
                );
              })}
            </div>
            <div style={{display:"flex",gap:8}}>
              <button
                style={{...C.btn("#5818a8"),opacity:groupDinnerPicker.selected.length<groupDinnerPicker.count?0.4:1}}
                disabled={groupDinnerPicker.selected.length<groupDinnerPicker.count}
                onClick={()=>{
                  const chosen=groupDinnerPicker.selected.map(id=>students.find(s=>s.id===id)).filter(Boolean);
                  setGroupDinnerPicker(null);
                  startGroupDinner(chosen);
                }}>
                Confirm →
              </button>
              <button style={C.btn("#333")} onClick={()=>setGroupDinnerPicker(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* DINNER ENDING POPUP */}
      {dinnerEndPopup&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:500}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:6}}>EVENING ENDS</div>
            <div style={{fontSize:11,color:"#7a5090",marginBottom:14}}>
              {dinnerEndPopup.student.name} · {getStage(dinnerEndPopup.student.lbs).label} · {dinnerEndPopup.student.lbs} lbs
              {" · "}{Math.round((dinnerEndPopup.finalFullness/dinnerEndPopup.maxFullness)*100)}% full
              {" · "}+{dinnerEndPopup.totalGain} lbs tonight
            </div>
            <p style={{lineHeight:1.9,color:"#e0d0b0",fontStyle:"italic",marginBottom:20,whiteSpace:"pre-line"}}>
              {dinnerEndPopup.narrative}
            </p>
            <button style={C.btn("#5818a8")} onClick={()=>setDinnerEndPopup(null)}>Continue →</button>
          </div>
        </div>
      )}

      {/* GROUP DINNER MODAL */}
      {groupDinnerEvent&&(()=>{
        const gev=groupDinnerEvent;
        const venueList=[...availableVenues,...(hasSkill("dinner_accessible")&&gev.students.some(s=>getStage(s.lbs).id>=6)?[DINNER_VENUES.find(v=>v.id==="atelier")]:[])].filter(Boolean);
        const allDishIds=gev.venue?.dishes.map(d=>d.id)||[];
        const allFed=gev.students.some(s=>allDishIds.every(id=>s.dishes.includes(id)));
        return(
          <div style={C.overlay}>
            <div style={{...C.modal,maxWidth:640,padding:20}}>
              <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:8}}>GROUP DINNER</div>

              {/* Per-girl fullness bars */}
              <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap"}}>
                {gev.students.map(gs=>{
                  const rawP=Math.round((gs.fullness/gs.maxFullness)*100);
                  const col=rawP>=130?"#801010":rawP>=100?"#c02020":rawP>=80?"#c08020":"#20a060";
                  return(
                    <div key={gs.id} style={{flex:1,minWidth:120}}>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:10,marginBottom:2}}>
                        <span style={{color:"#c0a0e0",fontWeight:700}}>{gs.name.split(" ")[0]}</span>
                        <span style={{color:col,fontWeight:700}}>{rawP}%{rawP>=100?" 🔴":rawP>=80?" 🟡":""}</span>
                      </div>
                      <div style={{background:"#0d0816",borderRadius:3,height:5}}>
                        <div style={{width:`${Math.min(100,rawP)}%`,height:"100%",background:col,borderRadius:3,transition:"width 0.4s"}}/>
                      </div>
                      <div style={{fontSize:9,color:"#5a3060",marginTop:1}}>+{gs.totalGain} lbs · {gs.dishes.length} dishes</div>
                    </div>
                  );
                })}
              </div>

              {/* Venue selection */}
              {gev.phase==="venue"&&(
                <div>
                  <div style={{fontSize:12,color:"#9070c0",marginBottom:10,fontStyle:"italic"}}>
                    Where are you taking {gev.students.map(s=>s.name.split(" ")[0]).join(" & ")} tonight?
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:12}}>
                    {venueList.map(v=>(
                      <div key={v.id} style={{...C.card,cursor:"pointer",border:v.id==="atelier"?"1px solid #806020":"1px solid #180830"}}
                        onClick={()=>chooseGroupVenue(v)}>
                        <div style={{fontWeight:700,fontSize:12,color:v.id==="atelier"?"#f0d060":"#d8a8ff",marginBottom:2}}>{v.label}</div>
                        <div style={{fontSize:10,color:"#5a3860",lineHeight:1.4}}>{v.desc}</div>
                      </div>
                    ))}
                  </div>
                  <button style={C.btn("#444")} onClick={()=>setGroupDinnerEvent(null)}>Cancel</button>
                </div>
              )}

              {/* Dining phase */}
              {gev.phase==="dishes"&&gev.venue&&(
                <div>
                  <div style={{fontSize:10,color:"#7a5090",marginBottom:10,fontStyle:"italic"}}>{gev.venue.label} — {gev.venue.desc}</div>

                  {/* Menu — each dish shows Feed buttons per girl */}
                  <div style={{...C.secT,marginBottom:6}}>Menu</div>
                  {allFed?(
                    <div style={{textAlign:"center",padding:"8px 0",marginBottom:10}}>
                      <div style={{fontSize:11,color:"#6a4870",fontStyle:"italic",marginBottom:8}}>The table is cleared.</div>
                      <button style={C.btn("#4a2060")} onClick={callGroupWaiter}>🫆 Call for More</button>
                    </div>
                  ):(
                    <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:12}}>
                      {gev.venue.dishes.map(dish=>{
                        const unfedGirls=gev.students.filter(s=>!s.dishes.includes(dish.id));
                        if(unfedGirls.length===0) return null;
                        const isOver=gev.students.some(s=>s.fullness>s.maxFullness);
                        return(
                          <div key={dish.id} style={{...C.card,border:`1px solid ${isOver?"#502020":"#180830"}`}}>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                              <span style={{fontWeight:700,fontSize:12,color:"#d8a8ff"}}>{dish.label}</span>
                              <span style={{fontSize:9,color:"#a07050"}}>+{dish.gain[0]}–{dish.gain[1]} lbs</span>
                            </div>
                            <div style={{fontSize:10,color:"#6a4870",marginBottom:6}}>{dish.desc}</div>
                            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                              {unfedGirls.map(gs=>{
                                const gRaw=Math.round((gs.fullness/gs.maxFullness)*100);
                                const overText=gRaw>=100?" (overfull!)":"";
                                return(
                                  <button key={gs.id}
                                    style={{...C.smBtn,borderColor:gRaw>=100?"#602020":"#4a1280",color:gRaw>=100?"#e08080":"#b080e8"}}
                                    onClick={()=>orderGroupDish(dish,gs.id)}>
                                    Feed {gs.name.split(" ")[0]}{overText}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Group conversations */}
                  <div style={{...C.secT,marginBottom:6}}>Conversation</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:10}}>
                    {GROUP_CONVERSATIONS.map(conv=>{
                      const used=gev.conversationUsed.includes(conv.id);
                      return(
                        <button key={conv.id}
                          style={{...C.smBtn,opacity:used?0.4:1,textDecoration:used?"line-through":"none"}}
                          onClick={()=>!used&&useGroupConversation(conv)}>
                          {conv.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Log */}
                  <div style={{background:"rgba(20,5,35,0.8)",border:"1px solid #2a0848",borderRadius:8,padding:10,marginBottom:10,maxHeight:140,overflowY:"auto",display:"flex",flexDirection:"column",gap:3}}>
                    {groupDinnerLog.length===0
                      ?<div style={{fontSize:12,color:"#5a3070",fontStyle:"italic"}}>{gev.students.map(s=>s.name.split(" ")[0]).join(" and ")} look at the menu.</div>
                      :groupDinnerLog.map((line,i)=>(
                        <div key={i} style={{fontSize:12,color:line.startsWith("💬")?"#e8d0a8":line.startsWith("👀")?"#d8a8c8":line.startsWith("😵")?"#f06040":"#d0a860",lineHeight:1.6}}>
                          {line}
                        </div>
                      ))
                    }
                  </div>

                  <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                    <div style={{fontSize:11,color:"#f0a060",fontWeight:700,flex:1}}>
                      +{gev.students.reduce((a,s)=>a+s.totalGain,0)} lbs total
                    </div>
                    <button style={C.btn("#2a6830")} onClick={endGroupDinner}>End Evening ✓</button>
                    <button style={C.btn("#333")} onClick={()=>{setAp(a=>a-3);setGroupDinnerEvent(null);}}>Leave Early</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* NARRATIVE MODAL */}
      {activeEvent&&(
        <div style={C.overlay}>
          <div style={C.modal}>
            <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:4}}>NARRATIVE EVENT</div>
            <h2 style={{margin:"0 0 4px",color:"#c898ff",fontSize:20}}>{activeEvent.event.title}</h2>
            <div style={{fontSize:11,color:"#5a309a",marginBottom:14}}>{activeEvent.student.name} · {getStage(activeEvent.student.lbs).label} · {activeEvent.student.lbs} lbs</div>
            <p style={{lineHeight:1.85,color:"#e0d0b0",marginBottom:18,fontStyle:"italic",whiteSpace:"pre-line"}}>{activeEvent.event.text(activeEvent.student)}</p>
            {activeEvent.event.gain[1]>0&&<p style={{color:"#f09050",fontSize:12,marginBottom:16}}>This event may result in {activeEvent.event.gain[0]}–{activeEvent.event.gain[1]} additional lbs gained.</p>}
            <div style={{display:"flex",gap:8}}>
              <button style={C.btn("#2a7830")} onClick={()=>resolveNarrative(activeEvent.event,activeEvent.student,true)}>Continue →</button>
              <button style={C.btn("#333")} onClick={()=>{push(`📖 ${activeEvent.event.title} — dismissed.`);setActiveEvent(null);}}>Dismiss</button>
            </div>
          </div>
        </div>
      )}

      {/* OBSERVE MODAL */}
      {observeText&&(
        <div style={C.overlay}>
          <div style={C.modal}>
            <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:12}}>OBSERVATION REPORT</div>
            <p style={{lineHeight:1.85,color:"#e0d0b0",whiteSpace:"pre-line",fontStyle:"italic"}}>{observeText}</p>
            <button style={{...C.btn(),marginTop:16}} onClick={()=>setObserveText(null)}>Close</button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div style={C.hdr}>
        <div>
          <div style={{fontSize:19,fontWeight:700,letterSpacing:2,color:"#b888ff"}}>PROFESSOR'S QUARTERS</div>
          <div style={{fontSize:10,color:"#60389a",letterSpacing:3}}>A WEIGHT MANAGEMENT SIMULATION</div>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
          {[["AP",ap,"#e0a8ff"],["Wk",week,"#e0a8ff"],["Skills",unlockedSkills.length,"#a0e0b0"]].map(([l,v,c])=>(
            <div key={l} style={{textAlign:"center",background:"rgba(80,18,140,0.3)",borderRadius:6,padding:"2px 11px"}}>
              <span style={{fontSize:17,fontWeight:700,color:c,display:"block"}}>{l==="Wk"?`Wk ${v}`:v}</span>
              <span style={{fontSize:9,color:"#60389a",letterSpacing:2}}>{l==="Wk"?"WEEK":l==="AP"?"ACTION PTS":"SKILLS"}</span>
            </div>
          ))}
          {(()=>{
            const rank=([...PROFESSOR_RANKS].reverse().find(r=>unlockedSkills.length>=r.min)||PROFESSOR_RANKS[0]);
            return(
              <div style={{textAlign:"center",background:"rgba(80,18,140,0.3)",borderRadius:6,padding:"2px 11px",minWidth:90}}>
                <span style={{fontSize:13,fontWeight:700,color:"#f0c060",display:"block",letterSpacing:0.5}}>{rank.label}</span>
                <span style={{fontSize:9,color:"#60389a",letterSpacing:2}}>RANK</span>
              </div>
            );
          })()}
          {/* Admin scrutiny meter */}
          {adminScrutiny>0&&(
            <div style={{textAlign:"center",background:"rgba(80,18,140,0.3)",borderRadius:6,padding:"2px 11px",minWidth:70}}>
              <div style={{position:"relative",height:6,background:"rgba(255,255,255,0.08)",borderRadius:3,width:70,margin:"4px 0 2px"}}>
                <div style={{position:"absolute",left:0,top:0,height:"100%",borderRadius:3,width:`${adminScrutiny}%`,background:adminScrutiny>=80?"#c02020":adminScrutiny>=50?"#c08020":"#7a30c8",transition:"width 0.4s"}}/>
              </div>
              <span style={{fontSize:9,color:adminScrutiny>=80?"#ff6060":adminScrutiny>=50?"#ffaa40":"#60389a",letterSpacing:2}}>SCRUTINY</span>
            </div>
          )}
          <button onClick={startClass} style={C.btn("#186028")}>⏩ Next Week (+5 AP)</button>
        </div>
      </div>

      {/* NAV */}
      <div style={C.nav}>
        {[["class","📋 Roster"],["student","👤 "+(sel?.name||"Student")],["actions","🎭 Actions"],["social","🎉 Events"],["skills","🌳 Skills"],["achievements","🏆 Achievements"],...(goddessSeen?[["divine","✦ Divine"]]:[])].map(([v,l])=>(
          v==="student"&&!sel?null:
          <button key={v} style={C.navB(view===v)} onClick={()=>setView(v)}>{l}</button>
        ))}
      </div>

      <div style={C.body}>
        <div style={C.main}>

          {/* ── HR OBSERVER CARD ── */}
          {hrObserver&&view==="class"&&(()=>{
            const dl=getHrDispLevel(hrObserver.disposition);
            const st=getStage(hrObserver.lbs);
            return(
              <div style={{background:"rgba(60,10,10,0.35)",border:`1px solid ${dl.color}40`,borderRadius:10,padding:12,marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <div>
                    <span style={{fontSize:13,fontWeight:700,color:dl.color}}>{hrObserver.name}</span>
                    <span style={{fontSize:10,color:"#805060",marginLeft:8,letterSpacing:1}}>HR OBSERVER · {hrObserver.lbs} lbs · {st.label}</span>
                  </div>
                  <span style={{fontSize:10,fontWeight:700,color:dl.color,background:`${dl.color}25`,borderRadius:8,padding:"2px 8px"}}>{dl.label}</span>
                </div>
                <div style={{position:"relative",height:5,background:"rgba(255,255,255,0.07)",borderRadius:3,marginBottom:8}}>
                  <div style={{position:"absolute",left:0,top:0,height:"100%",borderRadius:3,background:dl.color,width:`${hrObserver.disposition}%`,transition:"width 0.4s"}}/>
                  <div style={{position:"absolute",left:"65%",top:-1,height:7,width:2,background:"rgba(255,255,255,0.3)",borderRadius:1}}/>
                </div>
                <div style={{fontSize:11,color:"#907090",lineHeight:1.6,marginBottom:8,fontStyle:"italic"}}>{getHrDispDesc(hrObserver)}</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <button style={C.btn("#5a1030")} onClick={()=>feedObserver(rnd(2,5),8)}>🍽️ Offer her something (free)</button>
                  <button style={{...C.btn("#3a1060"),opacity:ap<1?0.4:1}} onClick={talkToObserver}>💬 Discuss pedagogy (1 AP, +12 disp)</button>
                  {hrObserver.disposition>=65&&<span style={{fontSize:11,color:"#40c060",alignSelf:"center"}}>✓ Will intervene at termination</span>}
                </div>
              </div>
            );
          })()}

          {/* ── VAUGHAN CARD ── */}
          {vaughan&&view==="class"&&(()=>{
            const vSt=getStage(vaughan.lbs);
            return(
              <div style={{background:"rgba(10,30,50,0.45)",border:`1px solid ${vaughanAlly?"#30905050":"#20405060"}`,borderRadius:10,padding:12,marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <div>
                    <span style={{fontSize:13,fontWeight:700,color:vaughanAlly?"#50c080":"#4080a0"}}>{vaughan.name}</span>
                    <span style={{fontSize:10,color:"#3a5060",marginLeft:8,letterSpacing:1}}>{vaughan.dept} · {vaughan.lbs} lbs · {vSt.label}</span>
                  </div>
                  <span style={{fontSize:10,fontWeight:700,color:vaughanAlly?"#50c080":"#c05040",background:vaughanAlly?"rgba(30,80,30,0.35)":"rgba(70,15,15,0.35)",borderRadius:8,padding:"2px 8px"}}>
                    {vaughanAlly?"ALLY":"RIVAL"}
                  </span>
                </div>
                {!vaughanAlly&&(
                  <div>
                    <div style={{display:"flex",gap:10,marginBottom:6}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:9,color:"#405060",letterSpacing:1,marginBottom:2}}>SUSPICION</div>
                        <div style={{position:"relative",height:4,background:"rgba(255,255,255,0.07)",borderRadius:2}}>
                          <div style={{position:"absolute",left:0,top:0,height:"100%",borderRadius:2,transition:"width 0.4s",
                            background:vaughan.suspicion>=80?"#c03030":vaughan.suspicion>=50?"#c06020":"#406080",
                            width:`${vaughan.suspicion}%`}}/>
                        </div>
                        <div style={{fontSize:9,color:"#506070",marginTop:1}}>{vaughan.suspicion}/100</div>
                      </div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:9,color:"#405060",letterSpacing:1,marginBottom:2}}>DISPOSITION</div>
                        <div style={{position:"relative",height:4,background:"rgba(255,255,255,0.07)",borderRadius:2}}>
                          <div style={{position:"absolute",left:0,top:0,height:"100%",borderRadius:2,transition:"width 0.4s",
                            background:vaughan.disposition>=40?"#40c070":"#607090",
                            width:`${vaughan.disposition}%`}}/>
                          <div style={{position:"absolute",left:"40%",top:-1,height:6,width:2,background:"rgba(255,255,255,0.25)",borderRadius:1}}/>
                        </div>
                        <div style={{fontSize:9,color:"#506070",marginTop:1}}>{vaughan.disposition}/40 needed</div>
                      </div>
                    </div>
                    <div style={{fontSize:10,color:"#4a6070",lineHeight:1.55,fontStyle:"italic"}}>
                      {vaughan.disposition>=40&&vaughan.lbs>=162?"She is close to letting this go entirely."
                      :vaughan.suspicion>=80?"She knows. One confrontation away from a crisis — or an alliance."
                      :vaughan.suspicion>=50?"She's been asking questions. Feed her at social events to shift her perspective."
                      :"She's noticed something. Not sure what yet."}
                    </div>
                    {vaughan.disposition>=40&&vaughan.lbs<162&&(
                      <div style={{fontSize:9,color:"#40806050",marginTop:3}}>
                        Ally trigger: {162-vaughan.lbs} lbs to go — host events she attends to help her gain.
                      </div>
                    )}
                  </div>
                )}
                {vaughanAlly&&(
                  <div style={{fontSize:11,color:"#4a9060",lineHeight:1.65,fontStyle:"italic"}}>
                    She files favorable reports and covers for you with HR. Scrutiny reduced by 3/week.
                  </div>
                )}
              </div>
            );
          })()}

          {/* ── CLASS ROSTER ── */}
          {view==="class"&&(
            <div>
              <p style={C.secT}>Students — {students.length} enrolled · avg {avgLbs} lbs</p>
              <div style={C.grid2}>
                {students.map(s=>{
                  const st=getStage(s.lbs);
                  const evMeta=s.evolvedForm?EVOLVED_FORM_META[s.evolvedForm]:null;
                  const cardBorder=s.ascensionPath==="convergence"?"2px solid #ffffff60":s.ascensionPath==="celestial"?"1px solid #8060c060":s.ascensionPath==="umbral"?"1px solid #80101060":evMeta?`1px solid ${evMeta.color}80`:"1px solid #180830";
                  const nameColor=s.ascensionPath==="convergence"?"#ffffff":s.ascensionPath==="celestial"?"#c8b0ff":s.ascensionPath==="umbral"?"#ff9090":evMeta?evMeta.color:"#d8a8ff";
                  return(
                    <div key={s.id} style={{...C.card,border:cardBorder}} onClick={()=>{setSelectedId(s.id);setView("student")}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:3}}>
                        <div style={{display:"flex",alignItems:"center",gap:5}}>
                          <span style={{fontWeight:700,fontSize:15,color:nameColor}}>{s.name}</span>
                          {(()=>{const tier=getTier(s.relationship);return tier.id>0?<span style={{fontSize:12,opacity:0.9}}>{tier.emoji}</span>:null;})()}
                          {s.ascensionPath==="celestial"&&<span style={{fontSize:11,color:"#a080ff"}}>✦{CELESTIAL_STAGES[s.ascensionStage||0]?.label.split(" ")[1]}</span>}
                          {s.ascensionPath==="umbral"&&<span style={{fontSize:11,color:"#cc4040"}}>🌑{UMBRAL_STAGES[s.ascensionStage||0]?.label.split(" ")[1]}</span>}
                          {s.ascensionPath==="convergence"&&<span style={{fontSize:11,color:"#ffffff"}}>⚡Singularity</span>}
                          {!s.ascensionPath&&evMeta&&<span style={{fontSize:10,color:evMeta.color,fontWeight:600}}>✦ {evMeta.title}</span>}
                        </div>
                        <StageTag stage={st}/>
                      </div>
                      <div style={{fontSize:10,color:"#70508a",marginBottom:3}}>{s.role||s.archetype} · {s.bodyType} · {s.age}y · <MoodBadge mood={s.mood}/></div>
                      <Bar val={s.lbs} max={s.ascensionPath?3000:1100} color={s.ascensionPath==="convergence"?"#ffffff":s.ascensionPath==="celestial"?CELESTIAL_STAGES[s.ascensionStage||0]?.color:s.ascensionPath==="umbral"?UMBRAL_STAGES[s.ascensionStage||0]?.color:st.color}/>
                      <div style={{fontSize:11,color:"#a88050",margin:"2px 0"}}>{s.lbs.toLocaleString()} lbs (+{s.lbs-s.startLbs}) · ❤ {s.relationship}%</div>
                      <div style={{fontSize:10,color:"#504060",fontStyle:"italic",lineHeight:1.4,marginTop:3}}>
                        {(()=>{
                          if(s.ascensionPath) return ((s.ascensionPath==="celestial"?ASCENSION_STAGE_REACTIONS.celestial:s.ascensionPath==="umbral"?ASCENSION_STAGE_REACTIONS.umbral:[CONVERGENCE_STAGE.desc])[s.ascensionStage||0]||"").slice(0,62);
                          const evR=getEvolvedReaction(s); if(evR) return evR.slice(0,62);
                          return (STAGE_REACTIONS[s.archetype]?.[st.id]||"").slice(0,62);
                        })()}…
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── STUDENT DETAIL ── */}
          {view==="student"&&sel&&(()=>{
            const s=sel;
            const st=getStage(s.lbs);
            return(
              <div>
                {/* Header card */}
                {(()=>{const detailEvMeta=s.evolvedForm?EVOLVED_FORM_META[s.evolvedForm]:null; return(
                <div style={{...C.card,cursor:"default",marginBottom:10,borderColor:detailEvMeta&&!s.ascensionPath?`${detailEvMeta.color}60`:""}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <h2 style={{margin:0,color:detailEvMeta&&!s.ascensionPath?detailEvMeta.color:"#d8a8ff",fontSize:22}}>{s.name}</h2>
                      {detailEvMeta&&!s.ascensionPath&&<span style={{fontSize:11,fontWeight:700,color:detailEvMeta.color,background:`${detailEvMeta.color}22`,borderRadius:6,padding:"2px 8px"}}>✦ {detailEvMeta.title}</span>}
                    </div>
                    <div style={{display:"flex",gap:6,alignItems:"center"}}>
                      <StageTag stage={st}/>
                      <span style={C.tag("#2a1050","#b080e0")}>{s.personality}</span>
                    </div>
                  </div>
                  <div style={{fontSize:11,color:"#70509a",marginBottom:8}}>{s.role||s.archetype} · {s.archetype} · age {s.age} · {s.bodyType} body · fav: {s.favFood} · hobby: {s.hobby}</div>

                  <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:8}}>
                    <div style={{flex:1,minWidth:150}}>
                      <div style={{fontSize:9,color:"#5028a0",letterSpacing:2,marginBottom:1}}>WEIGHT</div>
                      <Bar val={s.lbs} color={st.color}/>
                      <div style={{fontSize:11,color:"#b08840"}}>{s.lbs} lbs · started {s.startLbs} · gained {s.lbs-s.startLbs} lbs</div>
                    </div>
                    <div style={{flex:1,minWidth:150}}>
                      <div style={{fontSize:9,color:"#5028a0",letterSpacing:2,marginBottom:1}}>RELATIONSHIP</div>
                      <Bar val={s.relationship} max={100} color="#c040e0"/>
                      <div style={{fontSize:11,color:"#b08840"}}>{s.relationship}% · <MoodBadge mood={s.mood}/></div>
                      {(()=>{
                        const tier=getTier(s.relationship);
                        const next=INNER_CIRCLE_TIERS[tier.id+1];
                        return(
                          <div style={{fontSize:10,color:tier.color,marginTop:3,display:"flex",alignItems:"center",gap:5}}>
                            <span>{tier.emoji} {tier.label}</span>
                            {next&&<span style={{color:"#40304060"}}>· {next.relMin-s.relationship}% to {next.emoji} {next.label}</span>}
                            {tier.id===3&&<span style={{fontSize:9,color:"#a050e0"}}>· +10% gain bonus active</span>}
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {WEIGHT_STAGES.map(ws=>(
                      <span key={ws.id} style={{background:ws.id<=st.id?ws.color:"#130920",color:ws.id<=st.id?"#fff":"#302040",borderRadius:8,padding:"2px 7px",fontSize:9,border:ws.id===st.id?"1px solid #c060ff":"1px solid transparent",fontWeight:ws.id===st.id?700:400}}>
                        {ws.label}
                      </span>
                    ))}
                    {s.ascensionPath==="celestial"&&CELESTIAL_STAGES.map((cs,i)=>(
                      <span key={`c${i}`} style={{background:i<=(s.ascensionStage||0)?cs.color:"#100820",color:i<=(s.ascensionStage||0)?"#fff":"#302040",borderRadius:8,padding:"2px 7px",fontSize:9,border:i===(s.ascensionStage||0)?"1px solid #c0b0ff":"1px solid transparent",fontWeight:i===(s.ascensionStage||0)?700:400}}>
                        ✦{cs.label.split(" ")[1]}
                      </span>
                    ))}
                    {s.ascensionPath==="umbral"&&UMBRAL_STAGES.map((us,i)=>(
                      <span key={`u${i}`} style={{background:i<=(s.ascensionStage||0)?us.color:"#100008",color:i<=(s.ascensionStage||0)?"#fff":"#302040",borderRadius:8,padding:"2px 7px",fontSize:9,border:i===(s.ascensionStage||0)?"1px solid #ff6060":"1px solid transparent",fontWeight:i===(s.ascensionStage||0)?700:400}}>
                        🌑{us.label.split(" ")[1]}
                      </span>
                    ))}
                    {s.ascensionPath==="convergence"&&<span style={{background:"#222",color:"#fff",borderRadius:8,padding:"2px 7px",fontSize:9,border:"1px solid #fff",fontWeight:700}}>⚡Singularity</span>}
                  </div>
                </div>
                );})()}

                {/* Appearance */}
                <div style={C.infoBox("rgba(70,15,110,0.25)")}>
                  <div style={{fontSize:9,color:"#5028a0",letterSpacing:2,marginBottom:5}}>CURRENT APPEARANCE</div>
                  <div style={{fontSize:13,color:"#e0d0b0",lineHeight:1.8,fontStyle:"italic"}}>{getBodyDesc(s)}</div>
                </div>

                {/* Outfit */}
                <div style={C.infoBox("rgba(50,10,90,0.25)")}>
                  <div style={{fontSize:9,color:"#5028a0",letterSpacing:2,marginBottom:4}}>OUTFIT</div>
                  <div style={{fontSize:12,color:"#c0a8d8",lineHeight:1.7}}>{getOutfit(s)}</div>
                </div>

                {/* Stage reaction */}
                <div style={C.infoBox("rgba(40,8,70,0.35)")}>
                  <div style={{fontSize:9,color:"#5028a0",letterSpacing:2,marginBottom:4}}>CURRENT ATTITUDE</div>
                  <div style={{fontSize:13,color:"#e8d8a8",fontStyle:"italic",lineHeight:1.75}}>
                    "{(()=>{
                      if(s.ascensionPath&&s.ascensionPath!=="convergence") return ASCENSION_STAGE_REACTIONS[s.ascensionPath]?.[s.ascensionStage||0]||STAGE_REACTIONS[s.archetype]?.[st.id];
                      const evR=getEvolvedReaction(s); if(evR) return evR;
                      return STAGE_REACTIONS[s.archetype]?.[st.id];
                    })()}"
                  </div>
                </div>

                {/* Diary */}
                <div style={C.infoBox("rgba(30,5,60,0.4)")}>
                  <div style={{fontSize:9,color:"#5028a0",letterSpacing:2,marginBottom:4}}>DIARY ENTRY</div>
                  <div style={{fontSize:12,color:"#c8b898",fontStyle:"italic",lineHeight:1.8}}>{getDiary(s)}</div>
                </div>

                {/* ── ASCENSION SECTION ── */}
                {goddessSeen&&st.id>=10&&!s.ascensionPath&&(
                  <div style={{background:"rgba(40,5,60,0.7)",border:"1px solid #8030e0",borderRadius:10,padding:14,marginBottom:12}}>
                    <div style={{fontSize:9,letterSpacing:3,color:"#a060ff",marginBottom:6}}>✦ ASCENSION AVAILABLE</div>
                    {s.evolvedForm&&ASCENSION_BRIDGE[s.evolvedForm]&&(
                      <div style={{...C.infoBox("rgba(30,5,50,0.5)"),marginBottom:10,fontSize:12,color:"#c8a8f0",fontStyle:"italic",lineHeight:1.85}}>
                        {ASCENSION_BRIDGE[s.evolvedForm](s)}
                      </div>
                    )}
                    <div style={{fontSize:13,color:"#d0b0f0",lineHeight:1.8,marginBottom:12}}>
                      {s.name} has reached the threshold. The goddess watches. Two paths open before her — light and void. Choose.
                    </div>
                    <div style={{display:"flex",gap:10}}>
                      <button style={{...C.btn("#3020a0"),flex:1,padding:"10px 8px"}} onClick={()=>ascendStudent(s,"celestial")}>
                        <div style={{fontSize:13,fontWeight:700,color:"#d0b8ff",marginBottom:3}}>✦ Celestial Path</div>
                        <div style={{fontSize:10,color:"#9070d0"}}>Angel features · Mass transfer · Sacred warmth</div>
                      </button>
                      <button style={{...C.btn("#800010"),flex:1,padding:"10px 8px"}} onClick={()=>ascendStudent(s,"umbral")}>
                        <div style={{fontSize:13,fontWeight:700,color:"#ff9090",marginBottom:3}}>🌑 Umbral Path</div>
                        <div style={{fontSize:10,color:"#a06060"}}>Demon features · Consumption · Void power</div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Ascension status card */}
                {s.ascensionPath&&s.ascensionPath!=="convergence"&&(()=>{
                  const isCelestial=s.ascensionPath==="celestial";
                  const stages=isCelestial?CELESTIAL_STAGES:UMBRAL_STAGES;
                  const stage=stages[s.ascensionStage||0];
                  const nextStage=stages[(s.ascensionStage||0)+1];
                  const pathColor=isCelestial?"#b898ff":"#cc3030";
                  const pathBg=isCelestial?"rgba(60,20,150,0.35)":"rgba(80,5,5,0.5)";
                  const otherStudents=students.filter(st=>st.id!==s.id);
                  return(
                    <div style={{background:pathBg,border:`1px solid ${pathColor}60`,borderRadius:10,padding:14,marginBottom:12}}>
                      <div style={{fontSize:9,letterSpacing:3,color:pathColor,marginBottom:4}}>{isCelestial?"✦ CELESTIAL":"🌑 UMBRAL"} · STAGE {(s.ascensionStage||0)+1}/5</div>
                      <div style={{fontSize:16,fontWeight:700,color:pathColor,marginBottom:4}}>{stage.label}</div>
                      <div style={{fontSize:11,color:isCelestial?"#9a7aff":"#cc6060",marginBottom:6,fontStyle:"italic"}}>{isCelestial?stage.aura:stage.shadow}</div>
                      <div style={{fontSize:12,color:isCelestial?"#c0a8e0":"#d08080",lineHeight:1.7,marginBottom:8}}>{stage.features}</div>
                      <div style={{fontSize:11,color:"#8060a0",fontStyle:"italic",lineHeight:1.65,marginBottom:10}}>{stage.desc}</div>
                      {/* Ascension attitude */}
                      <div style={{...C.infoBox(isCelestial?"rgba(50,20,120,0.3)":"rgba(40,5,5,0.5)"),marginBottom:10}}>
                        <div style={{fontSize:9,color:"#5030a0",letterSpacing:2,marginBottom:4}}>ATTITUDE</div>
                        <div style={{fontSize:12,color:isCelestial?"#d0c0f8":"#e08080",fontStyle:"italic",lineHeight:1.7}}>
                          "{ASCENSION_STAGE_REACTIONS[s.ascensionPath]?.[s.ascensionStage||0]||""}"
                        </div>
                      </div>
                      {nextStage&&<div style={{fontSize:10,color:"#503060",marginBottom:8}}>Next stage at {nextStage.min.toLocaleString()} lbs — {nextStage.min-s.lbs} lbs to go</div>}
                      {/* Consumed students (Umbral only) */}
                      {!isCelestial&&(s.consumedIds||[]).length>0&&(
                        <div style={{marginBottom:8}}>
                          <div style={{fontSize:9,letterSpacing:2,color:"#903030",marginBottom:4}}>CONSUMED WITHIN</div>
                          {(s.consumedIds||[]).map(cid=>{
                            const cs=consumedStudents.find(x=>x.id===cid);
                            return cs?(
                              <div key={cid} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(40,0,0,0.4)",borderRadius:6,padding:"4px 8px",marginBottom:3}}>
                                <span style={{fontSize:11,color:"#c07070"}}>{cs.name} ({cs.lbs} lbs)</span>
                                <button style={{...C.smBtn,fontSize:9}} onClick={()=>recoverConsumedStudent(cid,s.id)}>↑ Release (3 AP)</button>
                              </div>
                            ):null;
                          })}
                        </div>
                      )}
                      {/* Divine actions */}
                      <div style={{...C.secT,marginBottom:6}}>Divine Actions</div>
                      {isCelestial&&(
                        <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:8}}>
                          {otherStudents.map(t=>(
                            <div key={t.id} style={{display:"flex",gap:3}}>
                              <button style={{...C.smBtn,fontSize:9,background:"rgba(60,20,130,0.4)"}} onClick={()=>celestialMassPull(s.id,t.id)}>
                                ↓ Pull from {t.name.split(" ")[0]} (2AP)
                              </button>
                              <button style={{...C.smBtn,fontSize:9,background:"rgba(40,10,100,0.4)"}} onClick={()=>celestialMassPush(s.id,t.id)}>
                                ↑ Push to {t.name.split(" ")[0]} (1AP)
                              </button>
                              <button style={{...C.smBtn,fontSize:9,background:"rgba(80,30,150,0.4)"}} onClick={()=>celestialMassBless(s.id,t.id)}>
                                ✦ Bless {t.name.split(" ")[0]} (2AP)
                              </button>
                            </div>
                          ))}
                          {divineCelestialCanPullHR&&hrObserver&&(
                            <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
                              <button style={{...C.smBtn,fontSize:9,background:"rgba(30,60,100,0.5)"}} onClick={()=>celestialMassPull(s.id,"hr")}>
                                ↓ Pull from {hrObserver.name} (2AP)
                              </button>
                              <button style={{...C.smBtn,fontSize:9,background:"rgba(40,10,100,0.5)"}} onClick={()=>celestialMassPush(s.id,"hr")}>
                                ↑ Push to {hrObserver.name} (1AP)
                              </button>
                              <button style={{...C.smBtn,fontSize:9,background:"rgba(80,30,150,0.5)"}} onClick={()=>celestialMassBless(s.id,"hr")}>
                                ✦ Bless {hrObserver.name} (2AP)
                              </button>
                            </div>
                          )}
                          {divineCelestialCanPullHR&&vaughan&&(
                            <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
                              <button style={{...C.smBtn,fontSize:9,background:"rgba(40,10,100,0.5)"}} onClick={()=>celestialMassPush(s.id,"vaughan")}>
                                ↑ Push to Dr. Vaughan (1AP)
                              </button>
                              <button style={{...C.smBtn,fontSize:9,background:"rgba(80,30,150,0.5)"}} onClick={()=>celestialMassBless(s.id,"vaughan")}>
                                ✦ Bless Dr. Vaughan (2AP)
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                      {!isCelestial&&(
                        <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:8}}>
                          {otherStudents.map(t=>(
                            <div key={t.id} style={{display:"flex",gap:3,flexWrap:"wrap"}}>
                              <button style={{...C.smBtn,fontSize:9,background:"rgba(60,0,0,0.5)"}} onClick={()=>umbralVoidPull(s.id,t.id)}>
                                🌑 Void Pull from {t.name.split(" ")[0]} (2AP)
                              </button>
                              <button style={{...C.smBtn,fontSize:9,background:"rgba(80,0,0,0.5)"}} onClick={()=>umbralConsumeStudent(s.id,t.id)}>
                                🌑 Consume {t.name.split(" ")[0]} (3AP)
                              </button>
                            </div>
                          ))}
                          {divineUmbralCanConsumeHR&&(hrObserver||vaughan)&&(
                            <button style={{...C.smBtn,fontSize:9,background:"rgba(80,0,0,0.6)"}} onClick={()=>umbralConsumeHR(s.id)}>
                              🌑 Consume HR Target (4AP, +35 scrutiny)
                            </button>
                          )}
                        </div>
                      )}
                      {/* Religion */}
                      {!religion&&(
                        <button style={{...C.btn("#401020"),width:"100%"}} onClick={()=>foundReligion(s.id)}>
                          ⛪ Found Religion (2AP)
                        </button>
                      )}
                      {religion&&!religion.worshippedIds.includes(s.id)&&(
                        <button style={{...C.btn("#301040"),width:"100%"}} onClick={()=>addBlobToReligion(s.id)}>
                          ⛪ Add to Religion Pantheon
                        </button>
                      )}
                    </div>
                  );
                })()}

                {/* Convergence stage */}
                {s.ascensionPath==="convergence"&&(
                  <div style={{background:"rgba(20,20,20,0.9)",border:"2px solid #ffffff80",borderRadius:10,padding:14,marginBottom:12}}>
                    <div style={{fontSize:9,letterSpacing:3,color:"#ffffff",marginBottom:4}}>⚡ THE SINGULARITY</div>
                    <div style={{fontSize:16,fontWeight:700,color:"#ffffff",marginBottom:6}}>{CONVERGENCE_STAGE.label}</div>
                    <div style={{fontSize:11,color:"#e0e0e0",fontStyle:"italic",marginBottom:6}}>{CONVERGENCE_STAGE.aura}</div>
                    <div style={{fontSize:12,color:"#d0d0d0",lineHeight:1.7,marginBottom:6}}>{CONVERGENCE_STAGE.features}</div>
                    <div style={{fontSize:11,color:"#b0b0b0",fontStyle:"italic",lineHeight:1.65}}>{CONVERGENCE_STAGE.desc}</div>
                  </div>
                )}

                {/* ── EP2: EVOLUTION SECTION ── */}
                {!s.ascensionPath&&(()=>{
                  const canOffer=!s.evolvedForm&&st.id>=4&&s.relationship>=60&&!!EVOLUTION_OFFER[s.archetype];
                  const hasEvolved=!!s.evolvedForm;
                  const meta=hasEvolved?EVOLVED_ACTIVITY_META[s.evolvedForm]:null;
                  const tree=hasEvolved?EVOLVED_SKILL_TREES[s.evolvedForm]||[]:[];
                  const skills=s.evolvedSkills||[];
                  const totalGained=s.lbs-s.startLbs;
                  const spent=s.evolvedSkillsSpent||0;
                  const availLbs=totalGained-spent;
                  if(!canOffer&&!hasEvolved) return null;
                  return(
                    <div style={{marginBottom:14}}>
                      {canOffer&&!hasEvolved&&(()=>{
                        const blurb=EVOLUTION_BUTTON_BLURB[s.archetype];
                        return(
                          <div style={{background:"rgba(40,10,80,0.5)",border:"1px solid #7030c0",borderRadius:10,padding:12,marginBottom:10}}>
                            <div style={{fontSize:9,letterSpacing:3,color:"#9040e0",marginBottom:5}}>✦ EVOLUTION AVAILABLE</div>
                            <div style={{fontSize:12,color:"#c0a0e0",lineHeight:1.75,marginBottom:8,fontStyle:"italic"}}>
                              {blurb?blurb(s):`${s.name} has grown into something the original path can't contain. A new direction is possible.`}
                            </div>
                            <button style={{...C.btn("#5a18b0"),width:"100%"}} onClick={()=>openEvolutionModal(s)}>
                              ✦ Propose a New Direction
                            </button>
                          </div>
                        );
                      })()}
                      {hasEvolved&&(()=>{
                        const evFormMeta=EVOLVED_FORM_META[s.evolvedForm];
                        const borderColor=evFormMeta?`${evFormMeta.color}80`:"#6030b080";
                        const titleColor=evFormMeta?evFormMeta.color:"#c080ff";
                        return(
                        <div style={{background:"rgba(30,8,60,0.5)",border:`1px solid ${borderColor}`,borderRadius:10,padding:12}}>
                          <div style={{fontSize:9,letterSpacing:3,color:"#9040e0",marginBottom:4}}>✦ EVOLVED PATH</div>
                          <div style={{fontSize:13,fontWeight:700,color:titleColor,marginBottom:4}}>{evFormMeta?.title||meta?.label||s.evolvedForm}</div>
                          <button style={{...C.btn("#401890"),opacity:ap<(meta?.apCost||1)?0.4:1,marginBottom:10,width:"100%"}} onClick={()=>doEvolvedActivity(s)}>
                            {meta?.label||"Activity"} ({meta?.apCost||1} AP) · +{meta?.gainRange?.[0]}–{meta?.gainRange?.[1]} lbs
                          </button>
                          {tree.length>0&&(
                            <div>
                              <div style={{fontSize:9,letterSpacing:2,color:"#6030a0",marginBottom:6}}>EVOLVED SKILLS · {availLbs} lbs available</div>
                              {tree.map(sk=>{
                                const owned=skills.includes(sk.id);
                                const canBuy=!owned&&availLbs>=sk.cost;
                                return(
                                  <div key={sk.id} style={{background:owned?"rgba(60,20,100,0.5)":"rgba(20,5,40,0.4)",border:`1px solid ${owned?"#7040c080":"#30206030"}`,borderRadius:7,padding:"7px 9px",marginBottom:5,display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
                                    <div style={{flex:1}}>
                                      <div style={{fontSize:11,fontWeight:700,color:owned?"#c080ff":"#7050a0",marginBottom:1}}>{sk.label} {owned&&"✓"}</div>
                                      <div style={{fontSize:10,color:owned?"#9060c0":"#503070",lineHeight:1.4}}>{sk.desc}</div>
                                    </div>
                                    {!owned&&(
                                      <button style={{...C.smBtn,opacity:canBuy?1:0.35,fontSize:10,whiteSpace:"nowrap"}} onClick={()=>canBuy&&purchaseEvolvedSkill(s.id,sk.id)}>
                                        {sk.cost} lbs
                                      </button>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                        );
                      })()}
                    </div>
                  );
                })()}

                {/* Talk */}
                <div style={{...C.secT,marginBottom:7}}>Talk to {s.name}</div>
                <div style={{marginBottom:14,display:"flex",flexWrap:"wrap",gap:2}}>
                  {[["how_are_you","How are you?"],["compliment_figure","Compliment figure"],["food_talk","Talk food"],["class_talk","Talk class"],["encourage_eating","Encourage eating"],["ask_lifestyle","Ask lifestyle"],["ask_weight","Ask weight"],["about_gaining","Ask about gaining"],["future_plans","Future plans"]].map(([tid,label])=>(
                    <button key={tid} style={C.smBtn} onClick={()=>doTalk(tid,s)}>{label}</button>
                  ))}
                </div>

                {/* Gossip — ask about classmates */}
                {(()=>{
                  const gossipEntries=GOSSIP.filter(g=>g.speakerId===s.id);
                  if(!gossipEntries.length) return null;
                  return (
                    <div style={{marginBottom:14}}>
                      <div style={{...C.secT,marginBottom:7}}>Ask About Classmates</div>
                      {gossipEntries.map(g=>{
                        const target=students.find(st=>st.id===g.targetId);
                        if(!target) return null;
                        const targetStageId=getStage(target.lbs).id;
                        const lines=getGossipLines(g,targetStageId);
                        const attColor={catty:"#802020",warm:"#205040",curious:"#203860",conspiratorial:"#402060"}[g.attitude]||"#333";
                        const attEmoji={catty:"😒",warm:"🥰",curious:"🤔",conspiratorial:"😏"}[g.attitude]||"💬";
                        const hasMultiplier=(target.gainMultiplier||1)>1;
                        const thisStudentHelping=(target.gainHelpers||[]).includes(s.id);
                        const canHelp=g.offerHelp && s.relationship>=65 && !thisStudentHelping;
                        const almostUnlocked=g.offerHelp && s.relationship>=50 && s.relationship<65 && !thisStudentHelping;
                        return (
                          <div key={g.targetId} style={{...C.card,cursor:"default",marginBottom:8,border:`1px solid ${attColor}88`}}>
                            {/* Header */}
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                              <span style={{fontWeight:700,fontSize:12,color:"#d8a8ff"}}>About {target.name}</span>
                              <div style={{display:"flex",gap:5,alignItems:"center"}}>
                                <span style={{background:attColor,color:"#fff",borderRadius:8,padding:"1px 7px",fontSize:9,fontWeight:700}}>{attEmoji} {g.attitude}</span>
                                <StageTag stage={getStage(target.lbs)}/>
                              </div>
                            </div>
                            {/* Target quick stats */}
                            <div style={{fontSize:10,color:"#5a4070",marginBottom:6}}>
                              {target.lbs} lbs · {target.lbs-target.startLbs > 0 ? `+${target.lbs-target.startLbs} gained` : "no gain yet"}{hasMultiplier?` · 🔥 ×${(target.gainMultiplier).toFixed(1)} multiplier active`:""}
                            </div>
                            {/* Talk buttons */}
                            <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:8}}>
                              {lines.map((line,i)=>(
                                <button key={i} style={{...C.smBtn,fontSize:10}} onClick={()=>doGossip(g,s,line)}>
                                  {i===0?"What do you think of her?":"Another take"}
                                </button>
                              ))}
                            </div>
                            {/* Already helping */}
                            {thisStudentHelping&&(
                              <div style={{background:"rgba(30,80,30,0.3)",border:"1px solid #305030",borderRadius:6,padding:"6px 8px"}}>
                                <div style={{fontSize:10,color:"#80d080",fontWeight:700,marginBottom:2}}>✓ Active — helping fatten {target.name}</div>
                                <div style={{fontSize:10,color:"#508050",fontStyle:"italic"}}>{g.helpReason}</div>
                              </div>
                            )}
                            {/* Pending double-down activations */}
                            {thisStudentHelping&&pendingDoubleDowns.filter(dd=>dd.speakerId===g.speakerId&&dd.targetId===g.targetId).map((dd,i)=>(
                              <div key={i} style={{background:"rgba(120,40,0,0.35)",border:"1px solid #c06020",borderRadius:6,padding:"8px",marginTop:6}}>
                                <div style={{fontSize:10,color:"#ffb060",fontWeight:700,marginBottom:3}}>🔥 Double Down Available — {target.name} reached {dd.atLbs} lbs!</div>
                                <div style={{fontSize:10,color:"#c08040",fontStyle:"italic",marginBottom:6,lineHeight:1.5}}>{dd.line.length>120?dd.line.slice(0,120)+"…":dd.line}</div>
                                <button style={{...C.btn("#a03000"),fontSize:11,width:"100%"}} onClick={()=>activateDoubleDown(dd)}>
                                  🔥 Activate — ×{(1+dd.addMult).toFixed(2)} multiplier on {target.name}
                                </button>
                              </div>
                            ))}
                            {/* Unlock offer */}
                            {canHelp&&(
                              <div style={{background:"rgba(60,20,100,0.35)",border:"1px solid #5a20a0",borderRadius:6,padding:"8px"}}>
                                <div style={{fontSize:10,color:"#b070f0",fontWeight:700,marginBottom:3}}>🔓 {s.name} trusts you — a special offer is available</div>
                                <div style={{fontSize:10,color:"#7a50a0",fontStyle:"italic",marginBottom:7,lineHeight:1.5}}>{g.helpReason}</div>
                                <button style={{...C.btn("#5a20a0"),fontSize:11,width:"100%"}} onClick={()=>doHelpFatten(g,s)}>
                                  🤝 Ask {s.name} to help fatten {target.name} (×{g.helpMultiplier} multiplier)
                                </button>
                              </div>
                            )}
                            {/* Almost unlocked hint */}
                            {almostUnlocked&&(
                              <div style={{fontSize:10,color:"#5a3878",fontStyle:"italic",marginTop:4}}>
                                🔒 {65-s.relationship}% more relationship needed to unlock {s.name}'s offer about {target.name}…
                              </div>
                            )}
                            {/* Far from unlock — just show lock */}
                            {g.offerHelp && s.relationship<50 && !thisStudentHelping&&(
                              <div style={{fontSize:10,color:"#3a2050",fontStyle:"italic",marginTop:4}}>
                                🔒 Build more trust with {s.name} to unlock a special offer…
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}

                {/* Personal actions */}
                <div style={{...C.secT,marginBottom:7}}>Personal Actions · {ap} AP</div>
                <div style={C.grid3}>
                  {effectiveSingleActions.map(a=>(
                    <div key={a.id} style={{...C.card,opacity:ap<a.cost?0.35:1}} onClick={()=>doSingle(a,s)}>
                      <div style={{fontWeight:700,fontSize:12,color:"#c090e8",marginBottom:2}}>{a.label}</div>
                      <div style={{fontSize:10,color:"#5a3888",lineHeight:1.4,marginBottom:4}}>{a.desc}</div>
                      <div style={{display:"flex",justifyContent:"space-between"}}>
                        <span style={{fontSize:10,color:"#e07030"}}>{a.cost} AP{a.cost===0?<span style={{color:"#60c060",marginLeft:3}}>FREE</span>:null}</span>
                        {a.gain[1]>0&&<span style={{fontSize:10,color:"#685040"}}>+{a.gain[0]}–{a.gain[1]} lbs</span>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Private Session */}
                {(()=>{
                  const tier=getTier(s.relationship);
                  const hist=sessionHistory[s.id]||{count:0,totalGain:0,capacityBonus:0};
                  const eligible=tier.id>=1;
                  return(
                    <div style={{marginTop:14}}>
                      <div style={{...C.secT,marginBottom:7,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                        <span>Private Feeding Session</span>
                        {hist.count>0&&<span style={{fontSize:9,color:"#7040c0",fontWeight:400}}>{hist.count} sessions · +{hist.totalGain} lbs · capacity +{hist.capacityBonus}</span>}
                      </div>
                      {!eligible?(
                        <div style={{fontSize:11,color:"#5a3888"}}>
                          Reach <span style={{color:"#7040a0",fontWeight:700}}>🤝 Close</span> tier to unlock private sessions with {s.name}.
                          <span style={{color:"#5030a0",marginLeft:6}}>{45-s.relationship > 0 ? `(${45-s.relationship}% to go)`:""}</span>
                        </div>
                      ):(
                        <div>
                          {hist.count>0&&(
                            <div style={{...C.infoBox("rgba(60,10,100,0.2)"),fontSize:11,color:"#8050b0",marginBottom:8,lineHeight:1.6}}>
                              {hist.count} session{hist.count!==1?"s":""} completed.
                              Her appetite has expanded — she can now comfortably eat {hist.capacityBonus}% more than when you started.
                            </div>
                          )}
                          <button style={{...C.btn("#5818a8"),opacity:ap<2?0.4:1}} onClick={()=>startPrivateSession(s)}>
                            🌙 Private Session (2 AP)
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Research Study */}
                <div style={{marginTop:14}}>
                  <div style={C.secT}>Research Study</div>
                  {(()=>{
                    const pData=researchStudy.participants[s.id];
                    if(!pData){
                      return(
                        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                          <div style={{fontSize:11,color:"#5a3888",flex:1}}>
                            {s.relationship<55
                              ?`Need 55 relationship to enroll ${s.name} (${s.relationship}/55).`
                              :`${s.name} is eligible for your dietary habits study.`}
                          </div>
                          {s.relationship>=55&&<button style={C.btn("#3a1070")} onClick={()=>proposeStudy(s)}>Propose Study (1 AP)</button>}
                        </div>
                      );
                    }
                    const sessions=pData.checkInCount;
                    return(
                      <div>
                        <div style={{display:"flex",gap:5,marginBottom:7,alignItems:"center"}}>
                          {[0,1,2,3,4].map(i=>(
                            <div key={i} style={{width:11,height:11,borderRadius:"50%",background:i<sessions?"#a060e0":"rgba(80,18,140,0.2)",border:"1px solid #4a1280"}}/>
                          ))}
                          <span style={{fontSize:11,color:"#8060b0",marginLeft:4}}>{sessions}/5 sessions</span>
                        </div>
                        {sessions<5
                          ?<button style={{...C.btn("#5020a0"),opacity:ap<1?0.4:1}} onClick={()=>runCheckIn(s)}>Schedule Check-in (1 AP)</button>
                          :<div style={{fontSize:11,color:"#5a3888",fontStyle:"italic"}}>Study arc complete.</div>}
                      </div>
                    );
                  })()}
                </div>

              </div>
            );
          })()}

          {/* ── CLASS ACTIONS ── */}
          {view==="actions"&&(
            <div>
              <p style={C.secT}>Class-Wide Actions · {ap} AP remaining</p>
              <div style={C.grid2}>
                {effectiveClassActions.map(a=>(
                  <div key={a.id} style={{...C.card,opacity:ap<a.cost?0.35:1}}>
                    <div style={{fontWeight:700,color:"#c090e8",marginBottom:3}}>{a.label}</div>
                    <div style={{fontSize:11,color:"#5a3888",marginBottom:8,lineHeight:1.4}}>{a.desc}</div>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                      <span style={{fontSize:11,color:a.cost===0?"#60c060":"#e07030"}}>{a.cost===0?"FREE":a.cost+" AP"}</span>
                      <span style={{fontSize:10,color:"#604030"}}>+{a.gain[0]}–{a.gain[1]} lbs ea</span>
                    </div>
                    <button style={{...C.btn(),width:"100%",opacity:ap<a.cost?0.4:1}} disabled={ap<a.cost} onClick={()=>doClass(a)}>Use Action</button>
                  </div>
                ))}
              </div>
            </div>
          )}

{/* ── SKILL TREE ── */}
          {view==="skills"&&(()=>{
            // Node layout: 4 columns (categories), 5 rows (tiers)
            // Each cell: col index, row index -> pixel position
            const COL_W=240, ROW_H=170, PAD_X=30, PAD_Y=50;
            const CATS=["environment","feeding","efficiency","social","psychology","prestige",...(goddessSeen?["divine"]:[])];
            const CAT_COLORS={"environment":"#3a8060","feeding":"#804020","efficiency":"#304080","social":"#802040","psychology":"#206050","prestige":"#806010","divine":"#702030"};
            const TIERS=[1,2,3,4,5,6];
            const TIER_COSTS=[50,150,350,700,1200,2000];
            // Build node positions — group by tier, lay out horizontally per tier
            const filteredSkills=ALL_SKILLS.filter(sk=>sk.category===skillCat);
            const byTier={};
            filteredSkills.forEach(sk=>{if(!byTier[sk.tier])byTier[sk.tier]=[];byTier[sk.tier].push(sk);});
            const NODE_W=120,NODE_H=52,NODE_GAP=14;
            const maxPerTier=Math.max(1,...Object.values(byTier).map(g=>g.length));
            const svgContentW=maxPerTier*(NODE_W+NODE_GAP)-NODE_GAP;
            const svgW=PAD_X*2+svgContentW;
            const svgH=PAD_Y*2+TIERS.length*ROW_H;
            const nodes=filteredSkills.map(sk=>{
              const tierNodes=byTier[sk.tier]||[sk];
              const idx=tierNodes.indexOf(sk);
              const count=tierNodes.length;
              const groupW=count*NODE_W+(count-1)*NODE_GAP;
              const startX=PAD_X+(svgContentW-groupW)/2+NODE_W/2;
              const x=startX+idx*(NODE_W+NODE_GAP);
              const y=PAD_Y+(sk.tier-1)*ROW_H+ROW_H/2;
              return {...sk,x,y};
            });
            const hoveredNode=hovered?nodes.find(n=>n.id===hovered):null;
            // Build edges: each node's requires -> parent nodes
            const edges=[];
            nodes.forEach(n=>{
              if(n.requires) n.requires.forEach(reqId=>{
                const parent=nodes.find(p=>p.id===reqId);
                if(parent) edges.push({from:parent,to:n});
              });
            });
            return(
              <div>
                <div style={{marginBottom:10}}>
                  <div style={{display:"flex",alignItems:"baseline",gap:10,marginBottom:10}}>
                    <p style={{...C.secT,margin:0}}>Classroom Upgrades</p>
                    <span style={{fontSize:22,fontWeight:700,color:"#f0c060",letterSpacing:-0.5,lineHeight:1}}>{totalGained}</span>
                    <span style={{fontSize:11,color:"#8050a0",letterSpacing:1}}>lbs gained</span>
                  </div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {CATS.map(cat=>{
                      const active=cat===skillCat;
                      return(
                        <button key={cat}
                          style={{background:active?CAT_COLORS[cat]+"99":"transparent",border:`1px solid ${CAT_COLORS[cat]}${active?"":"55"}`,borderRadius:6,padding:"5px 13px",fontSize:11,color:active?"#fff":"#7060a0",cursor:"pointer",fontFamily:"inherit",fontWeight:active?700:400,transition:"all 0.15s"}}
                          onClick={()=>{setSkillCat(cat);setHovered(null);}}>
                          {SKILL_CATEGORIES[cat]?.label||cat}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                  {/* SVG Tree */}
                  <div style={{overflowX:"auto",overflowY:"visible",flex:"0 0 auto"}}>
                    <svg width={svgW} height={svgH} style={{display:"block"}}>
                      {/* Tier labels */}
                      {TIERS.map((t,i)=>(
                        <text key={t} x={8} y={PAD_Y+i*ROW_H+ROW_H/2+5} fill="#3a2050" fontSize={9} letterSpacing={2}
                          fontFamily="'Palatino Linotype',serif">T{t} · {TIER_COSTS[i]}</text>
                      ))}
                      {/* Active category label */}
                      <text x={PAD_X+COL_W/2} y={22} fill={CAT_COLORS[skillCat]} fontSize={11}
                        textAnchor="middle" fontFamily="'Palatino Linotype',serif" fontWeight="bold">
                        {SKILL_CATEGORIES[skillCat]?.label||skillCat}
                      </text>
                      {/* Tier dividers */}
                      {TIERS.map((t,i)=>(
                        <line key={t} x1={PAD_X-10} y1={PAD_Y+i*ROW_H} x2={svgW-10} y2={PAD_Y+i*ROW_H}
                          stroke="#1a0830" strokeWidth={1}/>
                      ))}
                      {/* Edges */}
                      {edges.map((e,i)=>{
                        const fromUnlocked=unlockedSkills.includes(e.from.id);
                        const toUnlocked=unlockedSkills.includes(e.to.id);
                        const active=fromUnlocked&&toUnlocked;
                        const reachable=fromUnlocked&&!toUnlocked;
                        return(
                          <line key={i}
                            x1={e.from.x} y1={e.from.y+28}
                            x2={e.to.x} y2={e.to.y-28}
                            stroke={active?"#60a060":reachable?"#6030a0":"#200830"}
                            strokeWidth={active?2.5:reachable?1.5:1}
                            strokeDasharray={active?"none":"4,4"}
                            opacity={active?0.9:reachable?0.7:0.3}
                          />
                        );
                      })}
                      {/* Nodes */}
                      {nodes.map(sk=>{
                        const unlocked=unlockedSkills.includes(sk.id);
                        const available=canUnlock(sk);
                        const isHovered=hovered===sk.id;
                        const baseColor=CAT_COLORS[sk.category];
                        const fillColor=unlocked?"#1a4020":available?"#2a1048":"#0e0618";
                        const borderColor=unlocked?"#50c050":available?"#8030d0":isHovered?"#3a1060":"#200830";
                        const textColor=unlocked?"#80e080":available?"#c080f0":"#4a3060";
                        const nodeW=120, nodeH=52;
                        return(
                          <g key={sk.id}
                            onMouseEnter={()=>setHovered(sk.id)}
                            onMouseLeave={()=>setHovered(null)}
                            onClick={()=>available&&startSkillPurchase(sk)}
                            style={{cursor:available?"pointer":"default"}}>
                            <rect
                              x={sk.x-nodeW/2} y={sk.y-nodeH/2}
                              width={nodeW} height={nodeH} rx={8}
                              fill={fillColor}
                              stroke={borderColor}
                              strokeWidth={unlocked?2:isHovered?1.5:1}
                              opacity={unlocked||available?1:0.45}
                            />
                            {/* Glow for available */}
                            {available&&!unlocked&&(
                              <rect x={sk.x-nodeW/2} y={sk.y-nodeH/2} width={nodeW} height={nodeH} rx={8}
                                fill="none" stroke="#9040e0" strokeWidth={3} opacity={0.25}
                                style={{filter:"blur(3px)"}}/>
                            )}
                            {/* Unlock cost badge */}
                            {!unlocked&&(
                              <rect x={sk.x+nodeW/2-32} y={sk.y-nodeH/2-10} width={32} height={14} rx={5}
                                fill={totalGained>=sk.cost?"#4a2080":"#2a0830"}/>
                            )}
                            {!unlocked&&(
                              <text x={sk.x+nodeW/2-16} y={sk.y-nodeH/2-1} fill={totalGained>=sk.cost?"#d0a0ff":"#603050"}
                                fontSize={8} textAnchor="middle" fontFamily="serif">{sk.cost}</text>
                            )}
                            {/* Checkmark if unlocked */}
                            {unlocked&&(
                              <text x={sk.x+nodeW/2-10} y={sk.y-nodeH/2+12} fill="#60c060" fontSize={12} textAnchor="middle">✓</text>
                            )}
                            {/* Label */}
                            <text x={sk.x} y={sk.y-6} fill={textColor} fontSize={10}
                              textAnchor="middle" fontFamily="'Palatino Linotype',serif" fontWeight="bold">
                              {sk.label.length>18?sk.label.slice(0,17)+"…":sk.label}
                            </text>
                            {/* Category color bar at bottom of node */}
                            <rect x={sk.x-nodeW/2+4} y={sk.y+nodeH/2-8} width={nodeW-8} height={4} rx={2}
                              fill={baseColor} opacity={unlocked?0.8:0.3}/>
                            {/* Click hint */}
                            {available&&(
                              <text x={sk.x} y={sk.y+10} fill="#9060c0" fontSize={8}
                                textAnchor="middle" fontFamily="serif">click to unlock</text>
                            )}
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                  {/* Detail panel — shows hovered/active node info */}
                  <div style={{flex:"1 1 220px",minWidth:200,maxWidth:280,position:"sticky",top:0}}>
                    {hoveredNode?(()=>{
                      const sk=hoveredNode;
                      const unlocked=unlockedSkills.includes(sk.id);
                      const available=canUnlock(sk);
                      const affordable=totalGained>=sk.cost;
                      const reqsMet=!sk.requires||sk.requires.every(r=>unlockedSkills.includes(r));
                      const cat=SKILL_CATEGORIES[sk.category];
                      return(
                        <div style={{background:"rgba(20,8,40,0.95)",border:`1px solid ${CAT_COLORS[sk.category]}88`,borderRadius:10,padding:14}}>
                          <div style={{fontSize:9,letterSpacing:2,color:CAT_COLORS[sk.category],marginBottom:4}}>{cat?.label} · TIER {sk.tier}</div>
                          <div style={{fontWeight:700,fontSize:14,color:unlocked?"#80e080":available?"#c090f0":"#7a5090",marginBottom:6}}>{sk.label}</div>
                          <div style={{fontSize:11,color:"#9070b0",lineHeight:1.6,marginBottom:8}}>{sk.desc}</div>
                          <div style={{fontSize:11,color:"#c090d0",lineHeight:1.5,fontStyle:"italic",marginBottom:10}}>{sk.effect}</div>
                          {sk.requires&&(
                            <div style={{fontSize:10,color:"#5a3070",marginBottom:8}}>
                              Requires: {sk.requires.map(r=>{
                                const rsk=ALL_SKILLS.find(s=>s.id===r);
                                return <span key={r} style={{color:unlockedSkills.includes(r)?"#60a060":"#7a3060",marginRight:4}}>
                                  {unlockedSkills.includes(r)?"✓ ":""}{rsk?.label||r}
                                </span>;
                              })}
                            </div>
                          )}
                          {unlocked
                            ? <div style={{background:"rgba(30,60,30,0.5)",border:"1px solid #306030",borderRadius:6,padding:"6px 10px",fontSize:11,color:"#70c070"}}>✓ Unlocked</div>
                            : available
                            ? <button style={{...C.btn("#5020a0"),width:"100%"}} onClick={()=>startSkillPurchase(sk)}>Unlock — spend {sk.cost} lbs</button>
                            : !reqsMet
                            ? <div style={{fontSize:10,color:"#4a2050"}}>Unlock prerequisites first.</div>
                            : <div style={{fontSize:10,color:"#4a2050"}}>Need {sk.cost-totalGained} more lbs on the class total.</div>
                          }
                        </div>
                      );
                    })()
                    :<div style={{background:"rgba(10,5,20,0.6)",border:"1px solid #1a0830",borderRadius:10,padding:14,fontSize:11,color:"#3a2050",fontStyle:"italic"}}>
                      Hover a node to see details. Click an available node to unlock it.
                    </div>}
                    {/* Active bonuses */}
                    <div style={{marginTop:10,background:"rgba(20,8,40,0.8)",border:"1px solid #200838",borderRadius:10,padding:12}}>
                      <div style={{fontSize:9,letterSpacing:2,color:"#5028a0",marginBottom:8}}>ACTIVE BONUSES</div>
                      {unlockedSkills.length===0
                        ?<div style={{fontSize:10,color:"#3a2050"}}>None yet. Fatten the class to unlock Tier 1 ({Math.max(0,50-totalGained)} lbs away).</div>
                        :<div style={{display:"flex",flexDirection:"column",gap:5}}>
                          {skillPassiveBonus>0&&<div style={{fontSize:11,color:"#80e080"}}>+{skillPassiveBonus} passive lbs/week</div>}
                          {skillApBonus>0&&<div style={{fontSize:11,color:"#80a0e0"}}>+{skillApBonus} AP/week (max 20)</div>}
                          {skillGainMult>1&&<div style={{fontSize:11,color:"#e0a060"}}>×{skillGainMult.toFixed(2)} all gain multiplier</div>}
                          {dinnerUnlocked&&<div style={{fontSize:11,color:"#c080f0"}}>🍽️ Dinner events active</div>}
                          {hasSkill("snack_station")&&<div style={{fontSize:11,color:"#60d090"}}>🍪 Desk Snacks FREE</div>}
                          {hasSkill("catering_contact")&&<div style={{fontSize:11,color:"#60d090"}}>🤝 Feast: -1 AP, +4 lbs</div>}
                          {hasSkill("private_kitchen")&&<div style={{fontSize:11,color:"#60d090"}}>🍳 Home-Cooked +4 lbs, Bake +3 lbs</div>}
                          {hasSkill("ap_mastery")&&<div style={{fontSize:11,color:"#60d090"}}>⚡ All single actions -1 AP</div>}
                          {hasSkill("full_catering")&&<div style={{fontSize:11,color:"#60d090"}}>🍾 On-Demand Feast unlocked</div>}
                          {hasSkill("group_dynamics")&&<div style={{fontSize:11,color:"#60d090"}}>👥 Group Dinner unlocked</div>}
                          {hasSkill("dinner_accessible")&&<div style={{fontSize:11,color:"#d0a030"}}>🌟 The Atelier unlocked</div>}
                          {skillScrutinyReduce<1&&<div style={{fontSize:11,color:"#a0d0e0"}}>🔇 -{Math.round((1-skillScrutinyReduce)*100)}% scrutiny gain</div>}
                          {skillScrutinyPassiveReduce>0&&<div style={{fontSize:11,color:"#a0d0e0"}}>🛡️ -{skillScrutinyPassiveReduce} scrutiny/week</div>}
                          {skillSessionCapBonus>0&&<div style={{fontSize:11,color:"#d0a0e0"}}>🌙 +{skillSessionCapBonus} session capacity</div>}
                          <div style={{fontSize:10,color:"#5a3070",marginTop:3}}>{unlockedSkills.length} / {ALL_SKILLS.length} skills</div>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ── SOCIAL EVENTS ── */}
          {view==="social"&&(
            <div>
              <p style={C.secT}>Social Events</p>
              <div style={{fontSize:11,color:"#6050a0",marginBottom:12,lineHeight:1.7}}>
                Host events to feed multiple students at once, build relationships, and manage Dr. Vaughan's suspicion.
                One event per week.
                {socialWeeks.includes(week)&&<span style={{color:"#f0a040",marginLeft:8}}>✓ Event held this week</span>}
              </div>
              {vaughan&&!vaughanAlly&&(
                <div style={{...C.infoBox("rgba(10,30,50,0.4)"),fontSize:11,color:"#4080a0",marginBottom:12}}>
                  👓 Vaughan attends department socials, symposiums, and the end-of-term banquet. When she attends events, she gains weight and her suspicion drops.
                  Events that don't require her attendance still reduce suspicion passively.
                </div>
              )}
              <div style={C.grid2}>
                {SOCIAL_EVENTS.map(ev=>{
                  const canAfford=ap>=ev.apCost;
                  const heldThisWeek=socialWeeks.includes(week);
                  const locked=!canAfford||heldThisWeek;
                  return(
                    <div key={ev.id}
                      style={{...C.card,opacity:locked?0.5:1,cursor:locked?"not-allowed":"pointer",transition:"border-color 0.15s"}}
                      onClick={()=>!locked&&startSocialEvent(ev)}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                        <span style={{fontWeight:700,fontSize:13,color:"#d8a8ff"}}>{ev.label}</span>
                        <span style={{fontSize:10,color:"#a080c0",background:"rgba(80,20,120,0.3)",borderRadius:8,padding:"1px 7px"}}>{ev.apCost} AP</span>
                      </div>
                      <div style={{fontSize:11,color:"#6a4870",lineHeight:1.5,marginBottom:6}}>{ev.desc}</div>
                      <div style={{display:"flex",gap:8,flexWrap:"wrap",fontSize:10,color:"#5a3860"}}>
                        <span>+{ev.baseGain[0]}–{ev.baseGain[1]} lbs</span>
                        <span>+{ev.relBonus} rel</span>
                        <span>{ev.minStudents}–{ev.maxStudents} students</span>
                      </div>
                      {ev.vaughanAttends&&vaughan&&!vaughanAlly&&(
                        <div style={{fontSize:9,color:"#306070",marginTop:4}}>
                          👓 Vaughan attends · suspicion {ev.vaughanEffect}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── ACHIEVEMENTS ── */}
          {/* ── DIVINE PANEL ── */}
          {view==="divine"&&goddessSeen&&(()=>{
            const ascended=students.filter(s=>s.ascensionPath&&s.ascensionPath!=="convergence");
            const celestials=ascended.filter(s=>s.ascensionPath==="celestial");
            const umbrals=ascended.filter(s=>s.ascensionPath==="umbral");
            const singularities=students.filter(s=>s.ascensionPath==="convergence");
            const blobsEligible=students.filter(s=>getStage(s.lbs).id>=10&&!s.ascensionPath);
            return(
              <div>
                <p style={C.secT}>✦ Divine Realm</p>

                {/* Goddess message */}
                <div style={{background:"rgba(20,5,40,0.8)",border:"1px solid #6030c080",borderRadius:10,padding:14,marginBottom:14}}>
                  <div style={{fontSize:9,letterSpacing:3,color:"#8050c0",marginBottom:6}}>THE GODDESS SPEAKS</div>
                  <div style={{fontSize:13,color:"#d0b0f0",fontStyle:"italic",lineHeight:1.85}}>
                    {singularities.length>0
                      ? "The Singularity has been achieved. The goddess is silent, because she is pleased beyond words."
                      : umbrals.some(u=>u.ascensionStage>=4)&&celestials.some(c=>c.ascensionStage>=4)
                      ? "An Umbral Sovereign and a Celestial Apex exist simultaneously. The convergence is possible. The choice is yours."
                      : ascended.length===0
                      ? "The vision has been received. You may now ascend any Blob-stage student along the Celestial or Umbral path. Find them in the class roster."
                      : "The paths are open. She watches your class with great interest. Make them vast."}
                  </div>
                </div>

                {/* Blob-eligible students */}
                {blobsEligible.length>0&&(
                  <div style={{marginBottom:14}}>
                    <div style={{...C.secT,marginBottom:8}}>Eligible for Ascension</div>
                    <div style={{display:"flex",flexDirection:"column",gap:6}}>
                      {blobsEligible.map(s=>(
                        <div key={s.id} style={{...C.card,cursor:"default"}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                            <span style={{fontWeight:700,fontSize:14,color:"#d8a8ff"}}>{s.name}</span>
                            <span style={{fontSize:11,color:"#806090"}}>{s.lbs} lbs · {getStage(s.lbs).label}</span>
                          </div>
                          <div style={{display:"flex",gap:8}}>
                            <button style={{...C.btn("#3020a0"),flex:1}} onClick={()=>ascendStudent(s,"celestial")}>✦ Celestial Path</button>
                            <button style={{...C.btn("#800010"),flex:1}} onClick={()=>ascendStudent(s,"umbral")}>🌑 Umbral Path</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Celestial roster */}
                {celestials.length>0&&(
                  <div style={{marginBottom:14}}>
                    <div style={{...C.secT,marginBottom:8}}>✦ Celestial ({celestials.length})</div>
                    {celestials.map(s=>{
                      const stage=CELESTIAL_STAGES[s.ascensionStage||0];
                      return(
                        <div key={s.id} style={{background:"rgba(40,10,100,0.35)",border:"1px solid #6040c060",borderRadius:8,padding:10,marginBottom:6}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                            <span style={{fontWeight:700,color:"#c0a8ff",fontSize:13}}>{s.name}</span>
                            <span style={{fontSize:10,color:"#9070d0",background:"rgba(80,30,160,0.3)",borderRadius:8,padding:"1px 8px"}}>{stage.label}</span>
                          </div>
                          <div style={{fontSize:11,color:"#8060a0"}}>{s.lbs} lbs · Stage {(s.ascensionStage||0)+1}/5</div>
                          {(s.ascensionStage||0)<4&&<div style={{fontSize:10,color:"#503080",marginTop:2}}>Next: {CELESTIAL_STAGES[(s.ascensionStage||0)+1].min.toLocaleString()} lbs</div>}
                          <div style={{display:"flex",gap:5,marginTop:6,flexWrap:"wrap"}}>
                            {students.filter(t=>t.id!==s.id).map(t=>(
                              <span key={t.id} style={{display:"flex",gap:2}}>
                                <button style={{...C.smBtn,fontSize:9}} onClick={()=>celestialMassPull(s.id,t.id)}>↓Pull {t.name.split(" ")[0]}</button>
                                <button style={{...C.smBtn,fontSize:9,background:"rgba(40,10,80,0.4)"}} onClick={()=>celestialMassPush(s.id,t.id)}>↑Push {t.name.split(" ")[0]}</button>
                                <button style={{...C.smBtn,fontSize:9,background:"rgba(40,10,80,0.4)"}} onClick={()=>celestialMassBless(s.id,t.id)}>✦Bless {t.name.split(" ")[0]}</button>
                              </span>
                            ))}
                            {divineCelestialCanPullHR&&hrObserver&&(
                              <span style={{display:"flex",gap:2}}>
                                <button style={{...C.smBtn,fontSize:9,background:"rgba(30,60,100,0.5)"}} onClick={()=>celestialMassPull(s.id,"hr")}>↓Pull {hrObserver.name.split(" ")[1]||hrObserver.name}</button>
                                <button style={{...C.smBtn,fontSize:9,background:"rgba(40,10,100,0.5)"}} onClick={()=>celestialMassPush(s.id,"hr")}>↑Push {hrObserver.name.split(" ")[1]||hrObserver.name}</button>
                                <button style={{...C.smBtn,fontSize:9,background:"rgba(80,30,150,0.5)"}} onClick={()=>celestialMassBless(s.id,"hr")}>✦Bless {hrObserver.name.split(" ")[1]||hrObserver.name}</button>
                              </span>
                            )}
                            {divineCelestialCanPullHR&&vaughan&&(
                              <span style={{display:"flex",gap:2}}>
                                <button style={{...C.smBtn,fontSize:9,background:"rgba(40,10,100,0.5)"}} onClick={()=>celestialMassPush(s.id,"vaughan")}>↑Push Vaughan</button>
                                <button style={{...C.smBtn,fontSize:9,background:"rgba(80,30,150,0.5)"}} onClick={()=>celestialMassBless(s.id,"vaughan")}>✦Bless Vaughan</button>
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Umbral roster */}
                {umbrals.length>0&&(
                  <div style={{marginBottom:14}}>
                    <div style={{...C.secT,marginBottom:8}}>🌑 Umbral ({umbrals.length})</div>
                    {umbrals.map(s=>{
                      const stage=UMBRAL_STAGES[s.ascensionStage||0];
                      return(
                        <div key={s.id} style={{background:"rgba(50,5,5,0.55)",border:"1px solid #80101060",borderRadius:8,padding:10,marginBottom:6}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                            <span style={{fontWeight:700,color:"#ff8080",fontSize:13}}>{s.name}</span>
                            <span style={{fontSize:10,color:"#cc5050",background:"rgba(80,5,5,0.4)",borderRadius:8,padding:"1px 8px"}}>{stage.label}</span>
                          </div>
                          <div style={{fontSize:11,color:"#a06060"}}>{s.lbs} lbs · Stage {(s.ascensionStage||0)+1}/5 · {(s.consumedIds||[]).length} consumed</div>
                          {(s.ascensionStage||0)<4&&<div style={{fontSize:10,color:"#703030",marginTop:2}}>Next: {UMBRAL_STAGES[(s.ascensionStage||0)+1].min.toLocaleString()} lbs</div>}
                          {(s.consumedIds||[]).length>0&&(
                            <div style={{marginTop:5}}>
                              <div style={{fontSize:9,color:"#903030",letterSpacing:1,marginBottom:3}}>CONSUMED:</div>
                              {(s.consumedIds||[]).map(cid=>{
                                const cs=consumedStudents.find(x=>x.id===cid);
                                return cs?(
                                  <div key={cid} style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#c07070",padding:"2px 0"}}>
                                    <span>{cs.name} ({cs.lbs} lbs)</span>
                                    <button style={{...C.smBtn,fontSize:9}} onClick={()=>recoverConsumedStudent(cid,s.id)}>Release (3AP)</button>
                                  </div>
                                ):null;
                              })}
                            </div>
                          )}
                          <div style={{display:"flex",gap:5,marginTop:6,flexWrap:"wrap"}}>
                            {students.filter(t=>t.id!==s.id).map(t=>(
                              <span key={t.id} style={{display:"flex",gap:2}}>
                                <button style={{...C.smBtn,fontSize:9,background:"rgba(60,0,0,0.5)"}} onClick={()=>umbralVoidPull(s.id,t.id)}>🌑Pull {t.name.split(" ")[0]}</button>
                                <button style={{...C.smBtn,fontSize:9,background:"rgba(80,0,0,0.5)"}} onClick={()=>umbralConsumeStudent(s.id,t.id)}>🌑Consume {t.name.split(" ")[0]}</button>
                              </span>
                            ))}
                            {divineUmbralCanConsumeHR&&(hrObserver||vaughan)&&(
                              <button style={{...C.smBtn,fontSize:9,background:"rgba(90,0,0,0.7)"}} onClick={()=>umbralConsumeHR(s.id)}>🌑Consume HR</button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Singularity */}
                {singularities.length>0&&(
                  <div style={{marginBottom:14}}>
                    <div style={{...C.secT,marginBottom:8}}>⚡ The Singularity</div>
                    {singularities.map(s=>(
                      <div key={s.id} style={{background:"rgba(20,20,20,0.9)",border:"2px solid #ffffff60",borderRadius:8,padding:12}}>
                        <div style={{fontWeight:700,color:"#ffffff",fontSize:14,marginBottom:4}}>{s.name} — {CONVERGENCE_STAGE.label}</div>
                        <div style={{fontSize:11,color:"#e0e0e0",marginBottom:4}}>{s.lbs} lbs</div>
                        <div style={{fontSize:11,color:"#b0b0b0",fontStyle:"italic",lineHeight:1.65}}>{CONVERGENCE_STAGE.aura}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Religion panel */}
                <div style={{background:"rgba(30,5,20,0.6)",border:"1px solid #80204060",borderRadius:10,padding:14,marginBottom:14}}>
                  <div style={{fontSize:9,letterSpacing:3,color:"#b04060",marginBottom:8}}>⛪ RELIGION</div>
                  {!religion?(
                    <div>
                      <div style={{fontSize:12,color:"#906070",lineHeight:1.7,marginBottom:10}}>
                        Found a religion centred on an ascended blob. Devotees gather. The student body grows heavier in proximity to the sacred.
                      </div>
                      {ascended.length>0?(
                        <div style={{display:"flex",flexDirection:"column",gap:5}}>
                          {ascended.map(s=>(
                            <button key={s.id} style={C.btn("#401020")} onClick={()=>foundReligion(s.id)}>
                              ⛪ Found religion around {s.name} (2AP)
                            </button>
                          ))}
                        </div>
                      ):(
                        <div style={{fontSize:11,color:"#604050"}}>Ascend a student first to found a religion.</div>
                      )}
                    </div>
                  ):(
                    <div>
                      <div style={{display:"flex",gap:14,marginBottom:10,flexWrap:"wrap"}}>
                        <div style={{textAlign:"center"}}>
                          <div style={{fontSize:22,fontWeight:700,color:"#e08090"}}>{religion.devotees}</div>
                          <div style={{fontSize:9,color:"#904050",letterSpacing:1}}>DEVOTEES</div>
                        </div>
                        <div style={{textAlign:"center"}}>
                          <div style={{fontSize:22,fontWeight:700,color:"#d06070"}}>{religion.ritesHeld}</div>
                          <div style={{fontSize:9,color:"#904050",letterSpacing:1}}>RITES HELD</div>
                        </div>
                        <div style={{textAlign:"center"}}>
                          <div style={{fontSize:22,fontWeight:700,color:"#c05060"}}>{religion.worshippedIds.length}</div>
                          <div style={{fontSize:9,color:"#904050",letterSpacing:1}}>BLOBS WORSHIPPED</div>
                        </div>
                        <div style={{textAlign:"center"}}>
                          <div style={{fontSize:22,fontWeight:700,color:"#b04050"}}>{(religion.weeklyPassiveGain||0).toFixed(1)}</div>
                          <div style={{fontSize:9,color:"#904050",letterSpacing:1}}>DEVOTEES/WEEK</div>
                        </div>
                      </div>
                      <div style={{fontSize:10,color:"#704050",marginBottom:8}}>
                        Founded week {religion.founded} · {religion.worshippedIds.map(id=>students.find(s=>s.id===id)?.name||"?").join(", ")}
                      </div>
                      {/* Add more blobs to religion */}
                      {ascended.filter(s=>!religion.worshippedIds.includes(s.id)).length>0&&(
                        <div style={{marginBottom:10}}>
                          <div style={{fontSize:10,color:"#805060",marginBottom:4}}>Add to pantheon:</div>
                          {ascended.filter(s=>!religion.worshippedIds.includes(s.id)).map(s=>(
                            <button key={s.id} style={{...C.smBtn,marginBottom:3,display:"block"}} onClick={()=>addBlobToReligion(s.id)}>
                              ⛪ {s.name} (+2 devotees)
                            </button>
                          ))}
                        </div>
                      )}
                      {/* Hold Rites */}
                      <div style={{fontSize:10,color:"#904050",marginBottom:6}}>Hold a Rite:</div>
                      <div style={{display:"flex",flexDirection:"column",gap:5}}>
                        {RELIGION_RITES.map(rite=>(
                          <div key={rite.id} style={{background:"rgba(40,0,20,0.5)",border:"1px solid #80204040",borderRadius:7,padding:9}}>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                              <span style={{fontSize:12,fontWeight:700,color:"#e08090"}}>{rite.label}</span>
                              <span style={{fontSize:10,color:"#704050"}}>{rite.apCost} AP · +{rite.devoteeGain} devotees · +{rite.scrutiny} scrutiny</span>
                            </div>
                            <div style={{fontSize:10,color:"#905060",marginBottom:6}}>Blob gains +{Math.round(rite.blobBonus*divineRiteBlobMult)} lbs</div>
                            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                              {religion.worshippedIds.map(bid=>{
                                const blob=students.find(s=>s.id===bid);
                                return blob?(
                                  <button key={bid} style={{...C.btn("#50102030"),fontSize:10}} onClick={()=>holdRite(rite,bid)}>
                                    {rite.label} for {blob.name}
                                  </button>
                                ):null;
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            );
          })()}

          {view==="achievements"&&(
            <div>
              <p style={C.secT}>Achievements — {achievements.length}/{ACHIEVEMENT_LIST.length} unlocked</p>
              <div style={C.grid2}>
                {ACHIEVEMENT_LIST.map(a=>{
                  const unlocked=achievements.includes(a.id);
                  return(
                    <div key={a.id} style={{...C.card,cursor:"default",opacity:unlocked?1:0.4,border:unlocked?"1px solid #4a18a0":"1px solid #180830"}}>
                      <div style={{fontSize:16,marginBottom:4}}>{a.label}</div>
                      <div style={{fontSize:11,color:unlocked?"#c0a0e8":"#5a4070"}}>{a.desc}</div>
                      {unlocked&&<div style={{fontSize:10,color:"#7040c0",marginTop:4}}>✓ Unlocked</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* ── SIDEBAR: LIVE LOG ── */}
        <div style={{...C.side, display:"flex", flexDirection:"column"}}>
          <p style={{...C.secT, flexShrink:0}}>Event Log — {log.length} entries</p>
          <div ref={logRef} style={{flex:1, overflow:"auto"}}>
            {log.map((e,i)=><div key={i} style={C.logE}>{e}</div>)}
          </div>
        </div>
      </div>

      {/* ── ADMIN EVENT MODAL ── */}
      {adminEvent&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:520}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#c04030",marginBottom:6}}>ADMINISTRATION</div>
            <h2 style={{margin:"0 0 14px",color:"#ff8070",fontSize:17,fontWeight:400}}>{adminEvent.title}</h2>
            <div style={{...C.infoBox("rgba(80,10,10,0.3)"),lineHeight:1.8,fontSize:13,color:"#d0b0a0",marginBottom:16,fontStyle:"italic"}}>
              {adminEvent.scene()}
            </div>
            {/* Termination: show observer intervention status */}
            {adminEvent.isGameOver&&(
              <div style={{...C.infoBox(hrObserver&&hrObserver.disposition>=65?"rgba(20,70,20,0.4)":"rgba(60,20,0,0.3)"),fontSize:12,marginBottom:12,color:hrObserver&&hrObserver.disposition>=65?"#70d080":"#906040"}}>
                {hrObserver
                  ? hrObserver.disposition>=65
                    ? `✅ ${hrObserver.name} has become sympathetic (${hrObserver.disposition} disposition). She will intervene on your behalf.`
                    : `⚠️ ${hrObserver.name} is observing (${hrObserver.disposition}/65 needed to save you). If she were more sympathetic, she could file a favorable report.`
                  : `No one is in your corner right now.`}
              </div>
            )}
            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              {adminEvent.choices.map((ch,i)=>(
                <button key={i} style={{...C.btn(ch.delta<0?"#184020":ch.delta>5?"#601010":"#2a1040"),textAlign:"left",padding:"9px 13px"}}
                  onClick={()=>{
                    push(`🏛️ ${adminEvent.title}: ${ch.text}`);
                    if(ch.delta>0) addScrutiny(ch.delta);
                    else if(ch.delta<0) setAdminScrutiny(prev=>Math.max(0,prev+ch.delta));
                    if(adminEvent.spawnsObserver){
                      const obs=HR_OBSERVER_POOL[rnd(0,HR_OBSERVER_POOL.length-1)];
                      setHrObserver({...obs,lbs:obs.startLbs,disposition:0,weeksPresent:0});
                      push(`👤 ${obs.intro}`);
                    }
                    if(adminEvent.isGameOver){
                      if(hrObserver&&hrObserver.disposition>=65){
                        push(`✅ ${hrObserver.name} files her report. "I cannot support the findings of the initial review. The pedagogy is excellent, the students are thriving, and I am closing the file."`);
                        push(`📧 Dean Holloway replies within the hour: "Thank you for your thorough assessment." The semester continues.`);
                        setAdminScrutiny(30);
                        setHrObserver(prev=>({...prev,saved:true}));
                      } else {
                        push("💀 Your contract has not been renewed. The semester ends here.");
                      }
                    }
                    setAdminEvent(null);
                  }}>
                  {ch.label}
                </button>
              ))}
            </div>
            <div style={{fontSize:10,color:"#502030",marginTop:10}}>Scrutiny: {adminScrutiny}/100</div>
          </div>
        </div>
      )}

      {/* ── STUDY CHECK-IN MODAL ── */}
      {studyCheckIn&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:520}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:6}}>RESEARCH CHECK-IN — SESSION {studyCheckIn.index+1}</div>
            <div style={{fontSize:12,color:"#9070b0",marginBottom:10}}>{studyCheckIn.student.name} · {studyCheckIn.student.lbs} lbs · {getStage(studyCheckIn.student.lbs).label}</div>
            <div style={{...C.infoBox("rgba(60,20,100,0.2)"),lineHeight:1.85,fontSize:13,color:"#d0c0e0",fontStyle:"italic",marginBottom:16}}>
              {studyCheckIn.scene}
            </div>
            <button style={C.btn("#5020a0")} onClick={()=>setStudyCheckIn(null)}>Close</button>
          </div>
        </div>
      )}

      {/* ── TIER-UP MODAL ── */}
      {tierUpModal&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:500}}>
            <div style={{fontSize:9,letterSpacing:3,color:tierUpModal.newTier.color,marginBottom:8}}>RELATIONSHIP MILESTONE</div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
              <span style={{fontSize:26}}>{tierUpModal.newTier.emoji}</span>
              <div>
                <div style={{fontSize:17,fontWeight:700,color:tierUpModal.newTier.color}}>{tierUpModal.student.name}</div>
                <div style={{fontSize:12,color:"#7060a0",marginTop:2}}>
                  {tierUpModal.oldTier.emoji} {tierUpModal.oldTier.label}
                  <span style={{margin:"0 6px",color:"#4030608a"}}>→</span>
                  <span style={{color:tierUpModal.newTier.color,fontWeight:700}}>{tierUpModal.newTier.emoji} {tierUpModal.newTier.label}</span>
                </div>
              </div>
            </div>
            <div style={{...C.infoBox("rgba(60,20,100,0.2)"),lineHeight:1.85,fontSize:13,color:"#e0d0b0",fontStyle:"italic",marginBottom:14}}>
              {tierUpModal.scene}
            </div>
            {tierUpModal.newTier.id===3&&(
              <div style={{...C.infoBox("rgba(80,10,130,0.3)"),fontSize:11,color:"#c060ff",marginBottom:12,lineHeight:1.6}}>
                🖤 <strong>Devoted.</strong> She accepts her situation completely.
                +10% gain multiplier applied. She passively covers 1 scrutiny point per week through glowing feedback.
              </div>
            )}
            {tierUpModal.newTier.id===2&&(
              <div style={{...C.infoBox("rgba(60,10,100,0.25)"),fontSize:11,color:"#9050c8",marginBottom:12}}>
                💜 <strong>Intimate.</strong> She trusts you implicitly. Talk actions give bonus relationship.
              </div>
            )}
            <button style={{...C.btn("#5020a0"),background:tierUpModal.newTier.color+"99"}} onClick={()=>{
              if(tierUpModal.newTier.id===3){
                setStudents(prev=>prev.map(s=>s.id!==tierUpModal.student.id?s:{...s,gainMultiplier:(s.gainMultiplier||1)*1.1}));
              }
              setTierUpModal(null);
            }}>Continue →</button>
          </div>
        </div>
      )}

      {/* ── VAUGHAN EVENT MODAL ── */}
      {vaughanModal&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:520}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#408090",marginBottom:6}}>DR. VAUGHAN — WELLNESS & KINESIOLOGY</div>
            <h2 style={{margin:"0 0 14px",color:"#70c0d8",fontSize:17,fontWeight:400}}>{vaughanModal.title}</h2>
            <div style={{...C.infoBox("rgba(5,25,40,0.5)"),lineHeight:1.8,fontSize:13,color:"#d0c8b8",fontStyle:"italic",marginBottom:16}}>
              {vaughanModal.scene()}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              {vaughanModal.choices.map((ch,i)=>(
                <button key={i}
                  style={{...C.btn(ch.vDelta&&ch.vDelta>10?"#204060":ch.delta&&ch.delta>5?"#601010":"#2a2a40"),textAlign:"left",padding:"9px 13px"}}
                  onClick={()=>resolveVaughanEvent(vaughanModal,ch)}>
                  {ch.label}
                </button>
              ))}
            </div>
            <div style={{fontSize:10,color:"#304050",marginTop:10}}>
              Suspicion: {vaughan?.suspicion||0}/100 · Disposition: {vaughan?.disposition||0}/100 · {vaughan?.lbs||0} lbs
            </div>
          </div>
        </div>
      )}

      {/* ── SOCIAL EVENT PICKER ── */}
      {socialPicker&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:520}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:6}}>SOCIAL EVENT</div>
            <h2 style={{margin:"0 0 4px",color:"#c898ff",fontSize:18}}>{socialPicker.event.label}</h2>
            <div style={{fontSize:12,color:"#7060a0",lineHeight:1.6,marginBottom:12}}>{socialPicker.event.desc}</div>
            <div style={{...C.secT,marginBottom:8}}>
              Invite students
              <span style={{fontWeight:400,color:"#5030a0",marginLeft:6}}>
                {socialPicker.selected.length} selected · need {socialPicker.event.minStudents}–{socialPicker.event.maxStudents}
              </span>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:4,marginBottom:14,maxHeight:290,overflowY:"auto"}}>
              {students.map(s=>{
                const tier=getTier(s.relationship);
                const isSel=socialPicker.selected.includes(s.id);
                const atMax=!isSel&&socialPicker.selected.length>=socialPicker.event.maxStudents;
                return(
                  <div key={s.id}
                    style={{...C.card,padding:"7px 10px",cursor:atMax?"not-allowed":"pointer",opacity:atMax?0.4:1,
                      background:isSel?"rgba(80,20,140,0.35)":"rgba(255,255,255,0.03)",
                      border:isSel?"1px solid #8040c8":"1px solid #180830"}}
                    onClick={()=>!atMax&&setSocialPicker(prev=>({
                      ...prev,
                      selected:isSel?prev.selected.filter(id=>id!==s.id):[...prev.selected,s.id]
                    }))}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{fontSize:13}}>{isSel?"☑":"☐"}</span>
                      <span style={{fontWeight:700,fontSize:12,color:"#d8a8ff"}}>{s.name}</span>
                      <span style={{fontSize:10,color:tier.color}}>{tier.emoji} {tier.label}</span>
                      <span style={{fontSize:10,color:"#6a4880",marginLeft:"auto"}}>{getStage(s.lbs).label} · {s.lbs} lbs</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{display:"flex",gap:8}}>
              <button style={C.btn("#444")} onClick={()=>setSocialPicker(null)}>Cancel</button>
              <button
                style={{...C.btn("#5020a0"),flex:1,opacity:socialPicker.selected.length>=socialPicker.event.minStudents?1:0.5}}
                onClick={confirmSocialEvent}>
                {socialPicker.selected.length>=socialPicker.event.minStudents
                  ?`Host — ${socialPicker.event.apCost} AP →`
                  :`Need ${socialPicker.event.minStudents-socialPicker.selected.length} more`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── SOCIAL EVENT RESULT ── */}
      {socialResult&&(
        <div style={C.overlay}>
          <div style={C.modal}>
            <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:6}}>EVENT COMPLETE</div>
            <h2 style={{margin:"0 0 10px",color:"#c898ff",fontSize:18}}>{socialResult.event.label}</h2>
            <div style={{...C.infoBox("rgba(60,20,100,0.2)"),lineHeight:1.85,fontSize:13,color:"#e0d0b0",fontStyle:"italic",marginBottom:14}}>
              {socialResult.scene}
            </div>
            <div style={{fontSize:12,color:"#a080c0",marginBottom:16}}>
              {socialResult.attendees} students · +{socialResult.totalGain} lbs total gained
            </div>
            <button style={C.btn("#5020a0")} onClick={()=>setSocialResult(null)}>Continue →</button>
          </div>
        </div>
      )}

      {/* ── PRIVATE SESSION MODAL ── */}
      {privateSession&&(()=>{
        const ps=privateSession;
        const s=ps.student;
        const effectiveMax=ps.maxFullness+ps.toleranceBuffer;
        const fPct=ps.fullness>0?Math.round((ps.fullness/effectiveMax)*100):0;
        const fsStage=getFullnessStage(fPct);
        const descFns=SESSION_FULLNESS_DESCS[s.archetype]||SESSION_FULLNESS_DESCS.default;
        const currentDesc=ps.fullness>0?descFns[Math.min(fsStage.id,descFns.length-1)](s):null;
        const courseOrder=["opener","main","more","dessert","extra"];
        const tier=getTier(s.relationship);
        const availableVenueList=PRIVATE_VENUES.filter(v=>tier.id>=v.minTier);
        return(
          <div style={C.overlay}>
            <div style={{...C.modal,maxWidth:640,padding:20}}>

              {/* Header */}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                <div>
                  <div style={{fontSize:9,letterSpacing:3,color:"#9050c8",marginBottom:3}}>PRIVATE SESSION #{ps.sessionNum}</div>
                  <div style={{fontSize:16,fontWeight:700,color:"#d8a8ff"}}>{s.name}</div>
                  <div style={{fontSize:10,color:"#6a4880"}}>{s.lbs} lbs · {getStage(s.lbs).label} · {tier.emoji} {tier.label}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:10,color:"#806090",marginBottom:2}}>+{ps.totalGain} lbs this session</div>
                  <div style={{fontSize:10,color:"#504060"}}>Capacity: {effectiveMax} ({ps.toleranceBuffer>0?`+${ps.toleranceBuffer} buffer`:"base"})</div>
                </div>
              </div>

              {/* Venue selection */}
              {ps.phase==="venue"&&(
                <div>
                  <div style={{fontSize:12,color:"#7060a0",marginBottom:10,fontStyle:"italic"}}>
                    Where are you taking {s.name} tonight?
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:14}}>
                    {availableVenueList.map(v=>(
                      <div key={v.id} style={{...C.card,cursor:"pointer"}} onClick={()=>chooseSessionVenue(v)}>
                        <div style={{fontWeight:700,fontSize:13,color:"#d8a8ff",marginBottom:2}}>{v.label}</div>
                        <div style={{fontSize:11,color:"#6a4870"}}>{v.desc}</div>
                      </div>
                    ))}
                  </div>
                  <button style={C.btn("#444")} onClick={()=>setPrivateSession(null)}>Cancel</button>
                </div>
              )}

              {/* Feeding phase */}
              {ps.phase==="feeding"&&(
                <div>
                  {/* Fullness bar */}
                  <div style={{marginBottom:12}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                      <span style={{fontSize:11,fontWeight:700,color:fsStage.color}}>{fsStage.label}</span>
                      <span style={{fontSize:11,color:fPct>=100?"#e04040":"#a080c0"}}>{fPct}% full</span>
                    </div>
                    <div style={{position:"relative",height:10,background:"rgba(255,255,255,0.07)",borderRadius:5,overflow:"hidden"}}>
                      <div style={{
                        position:"absolute",left:0,top:0,height:"100%",borderRadius:5,
                        background:`linear-gradient(90deg,#30a060,${fsStage.color})`,
                        width:`${Math.min(100,fPct)}%`,transition:"width 0.5s ease"
                      }}/>
                      {fPct>100&&(
                        <div style={{position:"absolute",left:`${Math.min(100,fPct-100)/2}%`,top:0,height:"100%",width:`${Math.min(50,fPct-100)/2}%`,background:"rgba(200,20,20,0.5)"}}/>
                      )}
                    </div>
                    {currentDesc&&(
                      <div style={{fontSize:12,color:"#c0a8d0",fontStyle:"italic",marginTop:6,lineHeight:1.65}}>
                        {currentDesc}
                      </div>
                    )}
                  </div>

                  {/* Food menu */}
                  <div style={{...C.secT,marginBottom:6}}>Food</div>
                  <div style={{maxHeight:220,overflowY:"auto",display:"flex",flexDirection:"column",gap:3,marginBottom:10}}>
                    {courseOrder.map(course=>{
                      const items=PRIVATE_FOODS.filter(f=>f.course===course);
                      const courseLabel={opener:"Starters",main:"Main Course",more:"Second Helpings",dessert:"Dessert",extra:"More"}[course];
                      return(
                        <div key={course}>
                          <div style={{fontSize:9,color:"#4a2060",letterSpacing:2,padding:"4px 0 2px",borderTop:"1px solid rgba(80,18,140,0.15)"}}>{courseLabel.toUpperCase()}</div>
                          <div style={{display:"flex",flexDirection:"column",gap:2}}>
                            {items.map(food=>{
                              const ordered=ps.foods.includes(food.id);
                              return(
                                <div key={food.id}
                                  style={{display:"flex",alignItems:"center",gap:8,padding:"4px 6px",borderRadius:5,
                                    background:ordered?"rgba(80,18,140,0.08)":"transparent",
                                    cursor:ordered?"default":"pointer",opacity:ordered?0.45:1}}
                                  onClick={()=>!ordered&&feedInSession(food)}>
                                  <span style={{flex:1,fontSize:12,color:ordered?"#5a3888":"#c8a8f0"}}>{ordered?"✓ ":""}{food.label}</span>
                                  <span style={{fontSize:10,color:"#8060a0"}}>+{food.gain[0]}–{food.gain[1]} lbs</span>
                                  {!ordered&&<div style={{fontSize:9,color:"#6a4880",maxWidth:140,textAlign:"right"}}>{food.desc.slice(0,45)}…</div>}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Session log */}
                  <div style={{background:"rgba(20,5,35,0.8)",border:"1px solid #2a0848",borderRadius:8,padding:10,marginBottom:10,maxHeight:150,overflowY:"auto",display:"flex",flexDirection:"column",gap:3}}>
                    {sessionLog.length===0
                      ?<div style={{fontSize:12,color:"#5a3070",fontStyle:"italic"}}>{s.name} settles in. The evening begins.</div>
                      :sessionLog.map((line,i)=>(
                        <div key={i} style={{fontSize:12,lineHeight:1.6,color:line.startsWith("💬")?"#e8d0a8":line.startsWith("🍽️")?"#d0a860":line.startsWith("   ")?"#c0a8d0":"#b090c8",borderBottom:i<sessionLog.length-1?"1px solid rgba(80,20,120,0.1)":"none",paddingBottom:i<sessionLog.length-1?3:0}}>
                          {line}
                        </div>
                      ))
                    }
                  </div>

                  {/* Encouragement */}
                  <div style={{...C.secT,marginBottom:6}}>Encouragement</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>
                    {ENCOURAGEMENT_ACTIONS.map(enc=>{
                      const used=ps.encouragementsUsed.includes(enc.id);
                      return(
                        <button key={enc.id}
                          style={{...C.smBtn,opacity:used?0.35:1,textDecoration:used?"line-through":"none",
                            background:used?"rgba(40,10,60,0.2)":"rgba(80,18,140,0.35)"}}
                          onClick={()=>!used&&useSessionEncouragement(enc)}>
                          {enc.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Tap-out scene — shown as a reaction, session continues */}
                  {ps.tappedOut&&(
                    <div style={{background:"rgba(40,10,10,0.6)",border:"1px solid #c03030",borderRadius:8,padding:10,marginBottom:8}}>
                      <div style={{fontSize:10,letterSpacing:2,color:"#c06060",fontWeight:700,marginBottom:5}}>⛔ SHE TAPS OUT</div>
                      <div style={{fontSize:12,color:"#e0b0a0",fontStyle:"italic",lineHeight:1.65,marginBottom:8}}>{ps.tapOutDialogue}</div>
                      <button style={{...C.btn("#6a1080"),width:"100%",fontSize:11}} onClick={()=>{
                        setPrivateSession(prev=>({...prev,tappedOut:false,tapOutDialogue:null}));
                        if((ps.refillRound||0)<3) getMoreFood();
                        setSessionLog(sl=>[...sl,"You slide more food across the table. She protests. She eats it anyway."]);
                      }}>Push Further →</button>
                    </div>
                  )}

                  {/* Normal footer — always accessible */}
                  <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                    <div style={{fontSize:11,color:fPct>=100?"#f07050":"#f0a060",fontWeight:700,flex:1}}>
                      {fPct>=200?"Well past limits 🔴"
                      :fPct>=155?"Absolutely packed 🔴"
                      :fPct>=120?"Overfull 🔴"
                      :fPct>=95?"Stuffed 🟠"
                      :fPct>=70?"Full 🟡"
                      :fPct>=40?"Getting warm 🟢"
                      :"Still hungry 🟢"}
                      {fPct>=150&&<span style={{fontSize:9,color:"#ff7050",marginLeft:6}}>
                        {fPct>=250?"WILL tap out":"tap-out risk"}
                        {skillTapOutResistance>0?` (−${Math.round(skillTapOutResistance*100)}% from skills)`:""}
                      </span>}
                    </div>
                    {ps.foods.length>0&&(ps.refillRound||0)<3&&(
                      <button style={{...C.btn("#304060"),fontSize:10}} onClick={getMoreFood}>🛒 Get More</button>
                    )}
                    <button style={C.btn("#2a6830")} onClick={endPrivateSession}>End Session ✓</button>
                    <button style={C.btn("#333")} onClick={()=>{setAp(a=>a-2);setPrivateSession(null);}}>Leave Early</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* ── SESSION RESULT ── */}
      {sessionResult&&(
        <div style={C.overlay}>
          <div style={C.modal}>
            <div style={{fontSize:9,letterSpacing:3,color:"#9050c8",marginBottom:6}}>SESSION COMPLETE — #{sessionResult.sessionCount}</div>
            <div style={{fontSize:12,color:"#7a50a0",marginBottom:12}}>
              {sessionResult.student.name} · {sessionResult.student.lbs} lbs · {getFullnessStage(sessionResult.fullnessPct).label} ({sessionResult.fullnessPct}%)
            </div>
            <div style={{...C.infoBox("rgba(60,10,100,0.25)"),lineHeight:1.9,fontSize:13,color:"#e0d0b0",fontStyle:"italic",marginBottom:16}}>
              {sessionResult.scene}
            </div>
            <div style={{...C.infoBox("rgba(40,5,70,0.3)"),fontSize:11,color:"#9060c0",marginBottom:14}}>
              +{sessionResult.totalGain} lbs this session · Appetite capacity expanded by +8 (total bonus: +{sessionResult.capacityBonus})
              <div style={{fontSize:10,color:"#604080",marginTop:3}}>
                She can now comfortably eat {sessionResult.capacityBonus}% more than when you first started feeding her privately.
              </div>
            </div>
            <button style={C.btn("#5818a8")} onClick={()=>setSessionResult(null)}>Continue →</button>
          </div>
        </div>
      )}

      {/* ── GODDESS VISION MODAL ── */}
      {goddessModal&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:560,background:"linear-gradient(160deg,#0a0520,#12082a,#0a0520)",border:"2px solid #8040ff80"}}>
            <div style={{fontSize:9,letterSpacing:4,color:"#a060ff",marginBottom:8}}>✦ VISION</div>
            <h2 style={{margin:"0 0 16px",color:"#d4aaff",fontSize:19,fontWeight:400,letterSpacing:1}}>{GODDESS_VISION.title}</h2>
            <div style={{...C.infoBox("rgba(60,10,120,0.25)"),lineHeight:2,fontSize:13,color:"#e8d8ff",fontStyle:"italic",marginBottom:16,maxHeight:380,overflowY:"auto",whiteSpace:"pre-line"}}>
              {GODDESS_VISION.scene}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              {GODDESS_VISION.choices.map((ch,i)=>(
                <button key={i}
                  style={{...C.btn("#401080"),textAlign:"left",padding:"10px 14px",lineHeight:1.5}}
                  onClick={()=>{
                    push(`✦ ${ch.label} — ${ch.text}`);
                    push(`✦ The Divine skill tree is now unlocked. Visit Skills → Divine.`);
                    setGoddessModal(null);
                    setView("divine");
                  }}>
                  <div style={{fontSize:12,fontWeight:700,color:"#c8a8ff",marginBottom:2}}>{ch.label}</div>
                  <div style={{fontSize:11,color:"#907090",fontStyle:"italic"}}>{ch.text}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── CONVERGENCE MODAL ── */}
      {/* ── EP2: EVOLUTION OFFER MODAL ── */}
      {evolutionModal&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:540,background:"linear-gradient(160deg,#0c0520,#180840,#0c0520)",border:"2px solid #7030c060"}}>
            <div style={{fontSize:9,letterSpacing:4,color:"#9040e0",marginBottom:6}}>✦ A NEW DIRECTION</div>
            <div style={{fontSize:17,fontWeight:700,color:"#d0a0ff",marginBottom:10}}>{evolutionModal.student?.name}</div>
            <div style={{fontSize:12,color:"#b090d0",lineHeight:1.85,marginBottom:16,fontStyle:"italic"}}>{evolutionModal.intro}</div>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
              {(evolutionModal.paths||[]).map(p=>(
                <button key={p.id} style={{...C.btn("#40108080"),textAlign:"left",padding:"12px 14px",border:"1px solid #6030a060"}}
                  onClick={()=>chooseEvolution(evolutionModal.student.id,p.id)}>
                  <div style={{fontSize:13,fontWeight:700,color:"#c080ff",marginBottom:4}}>{p.label}</div>
                  <div style={{fontSize:11,color:"#8060a0",lineHeight:1.5}}>{p.desc}</div>
                </button>
              ))}
            </div>
            <button style={C.btn("#201040")} onClick={()=>setEvolutionModal(null)}>Not yet</button>
          </div>
        </div>
      )}

      {/* ── EP2: INTERACTIVE EVOLVED EVENT MODAL ── */}
      {evolvedEventState&&(()=>{
        const{studentId,formId,stageIdx,phaseIdx,history,logLines,done,endingText}=evolvedEventState;
        const s=students.find(st=>st.id===studentId);
        const evDef=EVOLVED_EVENTS[formId]?.[stageIdx];
        if(!s||!evDef) return null;
        const phase=!done?evDef.phases[phaseIdx]:null;
        const phaseText=phase?(typeof phase.text==="function"?phase.text(history,s):phase.text):null;
        const evMeta=EVOLVED_FORM_META[formId];
        const accentColor=evMeta?.color||"#7030c0";
        return(
          <div style={C.overlay}>
            <div style={{...C.modal,maxWidth:580,background:"linear-gradient(160deg,#07030f,#120820,#07030f)",border:`1px solid ${accentColor}50`,maxHeight:"85vh",overflowY:"auto"}}>
              <div style={{fontSize:9,letterSpacing:4,color:accentColor,marginBottom:4}}>{evDef.title.toUpperCase()}</div>
              <div style={{fontSize:15,fontWeight:700,color:evMeta?.color||"#d8a8ff",marginBottom:12}}>{s.name}</div>
              {/* History of completed phases */}
              {logLines.length>0&&(
                <div style={{marginBottom:12}}>
                  {logLines.map((line,i)=>(
                    <div key={i} style={{fontSize:11,color:"#7060a0",lineHeight:1.75,marginBottom:6,fontStyle:"italic",paddingLeft:10,borderLeft:`2px solid ${accentColor}30`}}>{line}</div>
                  ))}
                </div>
              )}
              {/* Current phase or ending */}
              <div style={{fontSize:12,color:"#c0b0e0",lineHeight:1.9,marginBottom:14,fontStyle:"italic"}}>{done?endingText:phaseText}</div>
              {/* Choices or close button */}
              {!done&&phase&&(
                <div style={{display:"flex",flexDirection:"column",gap:7}}>
                  {phase.choices.map(ch=>{
                    const locked=ch.requires&&!history.includes(ch.requires);
                    const excluded=ch.requiresNot&&history.includes(ch.requiresNot);
                    if(excluded) return null;
                    return(
                      <button key={ch.id}
                        style={{...C.btn(locked?"#1a1a2a":accentColor),opacity:locked?0.35:1,textAlign:"left",padding:"9px 14px",fontSize:12,lineHeight:1.5}}
                        disabled={!!locked}
                        onClick={()=>makeEvolvedEventChoice(ch.id)}>
                        <span style={{fontWeight:700}}>{ch.label}</span>
                        {ch.lbs&&<span style={{color:"#ffdd80",marginLeft:8,fontSize:10}}>+{ch.lbs} lbs</span>}
                        {ch.rel&&<span style={{color:"#80ddff",marginLeft:4,fontSize:10}}>+{ch.rel} rel</span>}
                        {ch.feedOther&&<span style={{color:"#ff9060",marginLeft:4,fontSize:10}}>feeds squad</span>}
                      </button>
                    );
                  })}
                </div>
              )}
              {done&&<button style={{...C.btn(accentColor),width:"100%",marginTop:4}} onClick={closeEvolvedEvent}>Continue ✓</button>}
            </div>
          </div>
        );
      })()}

      {/* ── EP2: EVOLVED ACTIVITY MODAL ── */}
      {evolvedActivityModal&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:540,background:"linear-gradient(160deg,#08041a,#140830,#08041a)",border:"1px solid #5020a060"}}>
            <div style={{fontSize:9,letterSpacing:4,color:"#7030c0",marginBottom:6}}>✦ {(EVOLVED_ACTIVITY_META[evolvedActivityModal.student?.evolvedForm]||{}).label||"Activity"}</div>
            <div style={{fontSize:14,fontWeight:700,color:"#c080ff",marginBottom:10}}>{evolvedActivityModal.student?.name}</div>
            <div style={{fontSize:12,color:"#c0b0e0",lineHeight:1.9,marginBottom:16,fontStyle:"italic"}}>{evolvedActivityModal.text}</div>
            <button style={{...C.btn("#301060"),width:"100%"}} onClick={()=>setEvolvedActivityModal(null)}>Continue</button>
          </div>
        </div>
      )}

      {convergenceModal&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:520,background:"linear-gradient(160deg,#05050f,#0a0a20,#05050f)",border:"2px solid #ffffff50"}}>
            <div style={{fontSize:9,letterSpacing:4,color:"#ffffff",marginBottom:8}}>⚡ THE SINGULARITY BECKONS</div>
            <div style={{fontSize:13,color:"#d0d0ff",lineHeight:1.9,marginBottom:14,fontStyle:"italic"}}>
              <strong style={{color:"#e0b0ff"}}>{convergenceModal.student?.name}</strong> (Celestial Apex, {convergenceModal.student?.lbs} lbs) and{" "}
              <strong style={{color:"#ff8080"}}>{convergenceModal.opponent?.name}</strong> (Umbral Sovereign, {convergenceModal.opponent?.lbs} lbs) stand at opposing ends of the divine spectrum.
              <br/><br/>
              The Singularity is possible. One will consume the other — and become something that has no name in any existing theology.
              <br/><br/>
              <em>The result will be one student at {((convergenceModal.student?.lbs||0)+(convergenceModal.opponent?.lbs||0)).toLocaleString()} lbs. The other ceases to exist as a separate entity. This cannot be undone.</em>
            </div>
            <div style={{...C.infoBox("rgba(20,20,20,0.6)"),marginBottom:14,fontSize:11,color:"#a0a0c0",fontStyle:"italic",lineHeight:1.7}}>
              "{CONVERGENCE_STAGE.desc}"
            </div>
            <div style={{display:"flex",gap:8}}>
              <button style={C.btn("#333")} onClick={()=>setConvergenceModal(null)}>Not yet</button>
              <button style={{...C.btn("#202060"),flex:1}} onClick={()=>triggerConvergence(convergenceModal.student?.id,convergenceModal.opponent?.id)}>
                ✦ Trigger Convergence — {convergenceModal.student?.name} ascends (5 AP)
              </button>
              <button style={{...C.btn("#600010"),flex:1}} onClick={()=>triggerConvergence(convergenceModal.opponent?.id,convergenceModal.student?.id)}>
                🌑 Trigger Convergence — {convergenceModal.opponent?.name} ascends (5 AP)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
