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
    "Extremely lean legs, angular hips, very flat stomach — a wispy, almost fragile frame.",
    "Long, lean legs and a flat tummy — a light, easy frame.",
    "Hips filling out noticeably. Thighs touching at the top. Tummy softening.",
    "Wide, rounded hips and thick thighs. Belly rounding out softly between them.",
    "Hips genuinely wide now. Thighs like pillows, belly prominent. Pear shape amplified dramatically.",
    "Enormous hips and thighs dominate her lower half. Heavy belly hanging forward. Needs extra seat room.",
    "Her lower body is extraordinary — thighs vast, hips flared wide, belly cascading.",
    "Walking is a slow, rolling sway. Her lower mass commands the room.",
    "She fills any space from the hips. Footsteps heavy and deliberate.",
    "Barely mobile. Her lower body is vast, soft geography.",
    "Immovable. A magnificent, towering mass.",
  ],
  hourglass:[
    "Very slight frame, minimal curves, a small waist with barely any padding. Almost angular.",
    "A classic trim figure — neat waist, balanced curves.",
    "Curves getting bigger in every direction. Waist still visible but softening.",
    "Very curvy — bust, belly and hips all noticeably fuller.",
    "Curves becoming exaggerated. Real belly, wide hips, heavy bust straining fabric.",
    "Every curve amplified enormously. Belly rounds prominently forward.",
    "Dramatically oversized curves. Belly hanging. Clothes barely containing her.",
    "An overwhelming figure — soft, heavy, enormous in every dimension.",
    "Massive rolls of soft flesh. Still vaguely hourglass but on a gigantic scale.",
    "Immense. Every part of her vast and soft.",
    "A breathtaking, immovable mountain of curves.",
  ],
  straight:[
    "Extremely lean and angular — clothes hang off her frame, very little padding anywhere.",
    "A lean, straight frame — minimal curves, easy movement.",
    "Soft all over now — belly poking forward, face and arms rounding gently.",
    "A real belly on her straight frame. Arms and face noticeably fuller.",
    "Round belly, thick arms, full face. The straight figure is long gone.",
    "Heavy belly dominating. Arms thick, legs chunky.",
    "Belly hanging prominently. Big and round all over.",
    "Enormous belly. Thick everywhere. Slow, deliberate movement.",
    "Vast round torso, thick limbs. Furniture chosen carefully for her.",
    "Immense. Barely mobile.",
    "A colossal, still presence.",
  ],
  apple:[
    "Very slim torso and limbs, almost no softness anywhere on her frame. Looks lighter than usual.",
    "Tummy-forward figure, otherwise fairly slim.",
    "Belly rounder and softer. Face and cheeks filling out.",
    "A proper round belly, getting heavy. Arms and neck filling.",
    "Big heavy belly dominating. Breathing audible after short movement.",
    "Belly enormous and hanging forward. Arms thick, face very round.",
    "A truly massive belly, arms like bolsters.",
    "Belly cascading down. Hard to see past it. Very slow moving.",
    "Enormous round belly. Fills a couch alone.",
    "Barely moves. Belly alone fills a large chair.",
    "Immovable. A vast, soft monument.",
  ],
  athletic:[
    "Pure compact muscle, almost no body fat. A runner's build taken to the extreme — very lean.",
    "Powerful and toned — real muscle under smooth skin.",
    "The athletic tone softening. Muscle blurring under new softness.",
    "Thick and soft now. Muscle buried under visible fat.",
    "Big, heavy frame. The athleticism gone — just mass now.",
    "Very heavy, thick all over. Powerful frame under enormous weight.",
    "Massively built — thick limbs, heavy belly, enormous presence.",
    "A giant, soft figure. Built like a wall of warm flesh.",
    "Fills doorways. Thunderous footsteps.",
    "Barely fits anywhere. An enormous, immovable mass.",
    "The biggest girl in any room. Always.",
  ],
};

const STAGE_REACTIONS = {
  cheerleader:["I've never been this light. Uniforms fall off me. Something feels off.","Fitting in her uniform just fine, thanks.","Uniform feels a tiny bit snug. Probably just bloating.","Okay something is DEFINITELY off. My captain is giving me looks.","Got benched. 'Affecting team dynamics.' Whatever.","Dropped off the squad. Practice was exhausting anyway.","Can't believe I used to do cartwheels. My thighs won't let me jog now.","Squad came to visit. They seemed… impressed? Weird vibe.","Could probably just sit on the opposing team at this point.","Coach asked if I'd be team mascot. I said only if they bring food.","I am the couch now. Bring snacks."],
  bookworm:["She weighs herself in the library bathroom and immediately searches PubMed. Underweight. A paper idea forms.","Focused entirely on her thesis. Barely notices food.","Library snacks are a perfectly reasonable study aid.","My chair squeaks now. Must be a loose bolt.","Had to get a new desk chair. The armrests were digging in.","Research into caloric science has been very… hands-on.","Found a paper correlating body fat with cushioning for long study sessions. Compelling.","Started studying from home. Libraries are so far.","Online classes only now. I've never been more productive.","Biggest brain in the department. Also the biggest everything else.","Dissertation is finished. Just going to sit here and be massive."],
  influencer:["Posts a 'delicate era' selfie. Comments are alarmed. She's conflicted. Ordering a large meal.","Posts fitness content every 3 hours.","'Soft era' content performing surprisingly well.","'Body neutrality era' is my brand now.","Followers went UP. They love the glow-up content.","BBW influencer now. Monetized and thriving.","Just hit 500k. The algorithm loves me like this.","Gaining journey content is viral. Book deal incoming.","Can barely hold the phone but my assistant films for me.","I basically run the fat acceptance corner of the internet.","I am the content. The content is me."],
  athlete:["Fastest times in years, technically. Coach is asking questions she doesn't have answers for.","Fastest girl on the track team. Eats like a horse anyway.","PRs slipping. Probably overtraining.","Cut from varsity. 'Weight concerns.' Rude.","Used to be able to do pull-ups. Now I mostly watch.","Gym membership cancelled. The treadmills were making a noise.","Incredible core strength. It's just buried now.","Old coach came by. I think she cried. I don't know why.","The couch is the only sport I play now. I'm very good at it.","Former teammates came to visit. They are very small compared to me.","I am the biggest thing that has ever sat on this street."],
  artsy:["Sketches her own wrist — the bones very visible. Files it under 'interesting.' Eats immediately after.","Always in paint-splattered overalls. Ethereal energy.","Started painting still lifes of food. 'Inspired' she says.","Subjects are getting bigger. So is the artist.","Switched to sculpting. Clay is more 'tactile.' So am I.","Work explores 'abundance themes.' Yes.","Gallery show: 'The Body as Canvas.' I am the canvas.","Critics call my aesthetic 'opulent.' They mean me, I think.","Too big to move my own sculptures. I direct others now.","Artist-in-residency ended. Still here.","I have transcended. I am art."],
  gamer:["Her character weighs more than her now. Ordered double ramen to address this. It's a start.","Energy drinks, ramen, 14-hour sessions. It's a lifestyle.","Desk chair is suddenly uncomfortable. Upgrading to a gaming throne.","New gaming chair rated for 300 lbs. 'Future-proofing,' I said.","Stream viewers keep donating food delivery to my address. I accept.","Sponsored by a snack company. This is my dream life.","Setup includes a minifridge within arm's reach.","Standing is optional. My character does the moving for me.","Viewers call me 'Queen.' Fridge on either side of my chair.","Most consecutive hours gaming record. And most snacks consumed.","Final form achieved. One with the beanbag."],
  sorority:["Dress falls off her shoulder at chapter. Sisters are concerned. She accepts every offered snack.","Always camera-ready, salad for lunch, wine on weekends.","Brunch calories 'don't count.' Brunch is four times a week.","Sisters staged an intervention. I staged a pizza party.","Dropped the diet talk. Added a second dessert.","I am now the 'fun one' of the house. I was always the fun one.","Formal dress had to be custom ordered. Worth it.","Didn't fit in the chapter room chair. Brought my own.","Hosting all events now because I prefer not to travel.","House voted me 'most comfortable to be around.' Literally.","I have become the sorority house. Spiritually."],
  overachiever:["Clinically underweight per her personal BMI tracker. Corrective meal schedule implemented immediately.","4.0 GPA, two internships, varsity, student council. Also stressed.","Stress eating is a documented response. She's documented it.","Self-care means a full meal between each scheduled activity.","Dropped one internship. 'Work-life balance.' Work is eating now.","Thesis on metabolic adaptations. Primary source: herself.","GPA still 3.9. Everything else has changed dramatically.","Academic advisor asked if she was 'okay.' She said 'thriving.'","Graduated early. Currently in bed. Victorious.","Plans to pursue a PhD. Remotely. From this spot.","She has achieved everything. Now she just achieves mass."],
  quiet:["...","Sits in the back. Never raises her hand. Always watching.","Brings extra snacks to class. Shares with no one.","Smiled at a compliment for the first time.","Sitting in the middle of class now. Takes up more room.","Asked a question for the first time. About nutrition.","She's… blooming. Literally and figuratively.","Has opinions now. Mostly about food. Very good opinions.","The whole class knows her name. She fills the room.","She is the room.","Serene. Vast. At peace."],
  transfer:["Lighter than the day she arrived. Something doesn't feel right about that.","New to campus, a little lost, eager to fit in.","Campus food is so good compared to back home!","Made friends! Mostly at the dining hall.","Feeling much more settled here. In every sense.","Hometown friends visited and didn't recognize her. She laughed.","This campus really suits her. She has really… settled in.","Considers herself a local now. A large, local presence.","She IS campus, basically.","Listed her weight as a campus landmark.","Fully integrated. Irreplaceable. Immovable."],
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
  `The light starts small — a warmth around the hands, a faint luminescence in the skin that strangers mistake for health. Her weight has passed through some threshold and kept going. The halo, barely visible, tilts slightly when she moves. She touches her own arms with the expression of someone discovering new furniture in a room they thought they knew.`,
  `The wings arrived overnight — not dramatic, not cinematic. More like waking up with an extra coat. Cream-white, soft, folded close to her back. They're warm. Everything about her is warm. She has grown significantly rounder since the last time you looked directly at her, and the light coming off her skin is steady now, not occasional. The halo has settled.`,
  `She radiates. Not metaphorically — there's an actual soft luminescence that precedes her into a room, a warmth that students walk toward before they've consciously decided to. She is large in a way that feels like it occupies a category the language hasn't quite built yet. The wings have grown. They move when she's happy. She is frequently happy.`,
  `The air around her bends slightly. Not optical illusion — something that cameras catch at the edge of frames, that other students notice and don't quite talk about. She is vast, warm, luminous, and completely at peace with all of this. Her wingspan, when she stretches, catches the light in a way that silences any room. The halo is bright enough now to read by.`,
  `She has become a phenomenon. Students sit near her not because they mean to but because the warmth is irresistible — a gravitational kindness that pulls people in. She is enormous, soft, luminous, haloed, winged. She does not move quickly. She doesn't need to. She occupies her space with the certainty of someone who has arrived somewhere that was always waiting for her.`,
];
const UMBRAL_BODY_DESCS = [
  `The horns are small, barely visible through her hair — easy to explain away, easy to miss. Her shadow doesn't behave quite right; it lingers at the wrong angles, extends a fraction too far. The temperature near her drops slightly in a way people notice but don't mention. She has grown heavier in a way that seems to have direction — an intentionality to the weight that the normal students don't quite have.`,
  `The horns are undeniable now — curved, dark, present. Her skin has taken on a cooler cast, a blue-black depth that wasn't there before. Her shadow moves independently on slow days, just slightly. The cold that surrounds her is no longer subtle. Students keep a specific distance without knowing why. She is very large. She is very still. When she moves, the room adjusts around her.`,
  `Void-wings unfold from her back like something from a photograph of deep space — dark feathers edged in absence, in a black that absorbs light differently than ordinary darkness. She is enormous, slow, and seems to pull the room toward her like a low-grade current no one can quite swim against. The cold is consistent. The hunger in her eyes is consistent. Everything else about her shifts.`,
  `She fills a room differently than other people. Not because of size alone — though the size is significant, considerable, absolute — but because of the silence that moves with her. Void-wings spread when she's feeding. The lights flicker near her on bad days. Her presence has become something students navigate around rather than through, adjusting their paths without articulating why.`,
  `She is the dark at the end of appetite — vast, cold, consuming, and aware of all of it. The void-wings span wide enough to dim whatever corner she occupies. Her eyes have swallowed their irises. The cold that radiates off her has a texture: weighted, patient, permanent. She does not hurry. She does not need to. Everything that enters her orbit is already, in some sense, hers.`,
];
const CELESTIAL_OUTFITS = [
  `Her clothes are the same as always — but the halo throws the light wrong and everything looks slightly gilded. She keeps adjusting her collar where the warmth radiates. Someone has gifted her a white sundress she wears over everything else. She has not questioned why.`,
  `The wings complicate dressing. She's developed a method: cut slits in the back of everything, let them fold through. The resulting silhouette is improvised but becomes her. She wears a lot of white. Not by plan — white fabrics just find their way to her. She has started buying things in larger sizes without noticing the size.`,
  `She has moved to robes. It was a practical decision — nothing with sleeves accommodates the wingspan — and it turns out robes accommodate everything else too. She wears them in cream and gold. Students bring her white flowers without being asked. She accepts them with the manner of someone who has stopped being surprised.`,
  `Her wardrobe is now entirely flowing — long linens, draped fabrics, anything that doesn't restrict the wings and can expand with her. She wears gold more than she used to. She receives gifts of fabric and jewelry from students who want to dress her and she wears all of it, layered, warm, present. The silhouette she makes in a doorway is unmistakable.`,
  `She has been dressed by devotees. The clothes are extraordinary — white and gold, fabrics that move when she moves, that catch the light she produces and scatter it. Nothing constrains her. Nothing could. She wears what is brought to her with the ease of someone who stopped thinking about clothing as armor and started thinking about it as atmosphere.`,
];
const UMBRAL_OUTFITS = [
  `Her clothes run dark — blacks and charcoals she's been gravitating toward for weeks without quite knowing why. The fabric seems to absorb the light around her. She has started wearing her hair down, as if covering something. The horns catch on scarves occasionally. She has stopped wearing scarves.`,
  `She wears black almost exclusively. The horns are visible through her hair now and she has stopped pretending otherwise. Her coats are long, dramatic, chosen at some level for how completely they can drape. Everything fits in the sense that nothing restricts — she has outgrown restriction as a concept.`,
  `The void-wings require clothing that opens at the back entirely. She wears a lot of custom-cut pieces. She makes some of them herself from dark fabrics she finds at thrift stores — heavy, matte, things that don't reflect light. The silhouette is significant. It precedes her into rooms.`,
  `She dresses in what she finds and cuts what doesn't fit. Dark fabrics only. Long drapes that cover the extent of her and imply more. The void-wings spread without announcement; she's chosen clothes that accommodate this and stopped explaining it. Students bring her black fabric and dark jewelry and she accepts it all with the manner of someone accepting tribute.`,
  `She wears the dark the way the dark wears itself — completely, without apology. Her clothes are vast, black, custom-cut to accommodate everything she has become. Students place offerings of dark cloth and cold-metal jewelry at her desk without being asked to. She wears them without commenting. Everything she puts on becomes part of the shadow that travels with her.`,
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
  const o=OUTFITS[s.archetype]||OUTFITS.default; return o[Math.min(getStage(s.lbs).id,o.length-1)];
}
function getDiary(s){
  if(s.ascensionPath==="celestial") return CELESTIAL_DIARY[s.ascensionStage||0];
  if(s.ascensionPath==="umbral")    return UMBRAL_DIARY[s.ascensionStage||0];
  if(s.ascensionPath==="convergence") return "I am both. I am neither. The hunger and the warmth are the same thing seen from both sides at once. I have become the thing that was always underneath everything. I don't know how to write the rest of this entry. I don't think language reaches this far.";
  const id=getStage(s.lbs).id; if(id===0) return SLIGHT_DIARY[s.archetype]||"—"; const d=DIARY_ENTRIES[s.archetype]; return d?d[Math.min(id-1,9)]:"—";
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
      setTimeout(()=>push(`📣 ${s.name} reaches ${WEIGHT_STAGES[newStageId].label}! "${STAGE_REACTIONS[s.archetype]?.[newStageId]||'...'}"`) ,50);
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
                  return(
                    <div key={s.id} style={{...C.card,border:s.ascensionPath==="convergence"?"2px solid #ffffff60":s.ascensionPath==="celestial"?"1px solid #8060c060":s.ascensionPath==="umbral"?"1px solid #80101060":"1px solid #180830"}} onClick={()=>{setSelectedId(s.id);setView("student")}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:3}}>
                        <div style={{display:"flex",alignItems:"center",gap:5}}>
                          <span style={{fontWeight:700,fontSize:15,color:s.ascensionPath==="convergence"?"#ffffff":s.ascensionPath==="celestial"?"#c8b0ff":s.ascensionPath==="umbral"?"#ff9090":"#d8a8ff"}}>{s.name}</span>
                          {(()=>{const tier=getTier(s.relationship);return tier.id>0?<span style={{fontSize:12,opacity:0.9}}>{tier.emoji}</span>:null;})()}
                          {s.ascensionPath==="celestial"&&<span style={{fontSize:11,color:"#a080ff"}}>✦{CELESTIAL_STAGES[s.ascensionStage||0]?.label.split(" ")[1]}</span>}
                          {s.ascensionPath==="umbral"&&<span style={{fontSize:11,color:"#cc4040"}}>🌑{UMBRAL_STAGES[s.ascensionStage||0]?.label.split(" ")[1]}</span>}
                          {s.ascensionPath==="convergence"&&<span style={{fontSize:11,color:"#ffffff"}}>⚡Singularity</span>}
                        </div>
                        <StageTag stage={st}/>
                      </div>
                      <div style={{fontSize:10,color:"#70508a",marginBottom:3}}>{s.role||s.archetype} · {s.bodyType} · {s.age}y · <MoodBadge mood={s.mood}/></div>
                      <Bar val={s.lbs} max={s.ascensionPath?3000:1100} color={s.ascensionPath==="convergence"?"#ffffff":s.ascensionPath==="celestial"?CELESTIAL_STAGES[s.ascensionStage||0]?.color:s.ascensionPath==="umbral"?UMBRAL_STAGES[s.ascensionStage||0]?.color:st.color}/>
                      <div style={{fontSize:11,color:"#a88050",margin:"2px 0"}}>{s.lbs.toLocaleString()} lbs (+{s.lbs-s.startLbs}) · ❤ {s.relationship}%</div>
                      <div style={{fontSize:10,color:"#504060",fontStyle:"italic",lineHeight:1.4,marginTop:3}}>
                        {s.ascensionPath?((s.ascensionPath==="celestial"?ASCENSION_STAGE_REACTIONS.celestial:s.ascensionPath==="umbral"?ASCENSION_STAGE_REACTIONS.umbral:[CONVERGENCE_STAGE.desc])[s.ascensionStage||0]||"").slice(0,62):(STAGE_REACTIONS[s.archetype]?.[st.id]||"").slice(0,62)}…
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
                <div style={{...C.card,cursor:"default",marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                    <h2 style={{margin:0,color:"#d8a8ff",fontSize:22}}>{s.name}</h2>
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
                    "{s.ascensionPath&&s.ascensionPath!=="convergence"
                      ?(ASCENSION_STAGE_REACTIONS[s.ascensionPath]?.[s.ascensionStage||0]||STAGE_REACTIONS[s.archetype]?.[st.id])
                      :STAGE_REACTIONS[s.archetype]?.[st.id]}"
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

                  {/* Tap-out scene */}
                  {ps.tappedOut&&(
                    <div style={{background:"rgba(40,10,10,0.8)",border:"1px solid #c03030",borderRadius:8,padding:12,marginBottom:10}}>
                      <div style={{fontSize:10,letterSpacing:2,color:"#c06060",fontWeight:700,marginBottom:6}}>⛔ SHE TAPS OUT</div>
                      <div style={{fontSize:12,color:"#e0b0a0",fontStyle:"italic",lineHeight:1.7,marginBottom:10}}>{ps.tapOutDialogue}</div>
                      <button style={{...C.btn("#602020"),width:"100%"}} onClick={endPrivateSession}>End Session →</button>
                    </div>
                  )}

                  {/* Normal footer — hide if tapped out */}
                  {!ps.tappedOut&&(
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
                    {ps.foods.length>0&&(ps.refillRound||0)<2&&(
                      <button style={{...C.btn("#304060"),fontSize:10}} onClick={getMoreFood}>🛒 Get More</button>
                    )}
                    <button style={C.btn("#2a6830")} onClick={endPrivateSession}>End Session ✓</button>
                    <button style={C.btn("#333")} onClick={()=>{setAp(a=>a-2);setPrivateSession(null);}}>Leave Early</button>
                  </div>
                  )}
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
