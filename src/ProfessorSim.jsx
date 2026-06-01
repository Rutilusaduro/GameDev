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
  { id:"dining_special", text:(s)=>`The dining hall is running an all-you-can-eat special today. ${s.name} stays for three hours.`, gain:[3,8], target:"class" },
  { id:"stress_week", text:(s)=>`Midterms stress sends ${s.name} straight to the vending machines. She empties two of them.`, gain:[2,6], target:"single" },
  { id:"food_delivery", text:(s)=>`${s.name} discovers a new delivery app with a first-order discount. She makes several first orders.`, gain:[3,7], target:"single" },
  { id:"bake_sale", text:()=>`Campus bake sale today. The class buys out most of the table between them.`, gain:[2,5], target:"class" },
  { id:"pizza_deal", text:()=>`Local pizza place is doing buy-2-get-2 free. The class has collectively ordered fourteen pizzas.`, gain:[4,9], target:"class" },
  { id:"study_group", text:(s)=>`${s.name}'s study group meets at a restaurant. Academic content: minimal. Food content: extensive.`, gain:[2,6], target:"single" },
  { id:"food_festival", text:()=>`There's a food festival near campus this weekend. The class returns visibly fuller.`, gain:[4,10], target:"class" },
  { id:"care_package", text:(s)=>`${s.name} receives a care package from home. Mostly food. Large amounts.`, gain:[3,7], target:"single" },
  { id:"netflix_binge", text:(s)=>`${s.name} spends the weekend watching a new series. She snacks through all twelve episodes, both seasons.`, gain:[2,6], target:"single" },
  { id:"class_cancelled", text:()=>`Class cancelled today. Everyone goes to brunch instead. Brunch lasts until dinner.`, gain:[3,7], target:"class" },
  { id:"holiday_nearby", text:()=>`A nearby holiday means extended dining hall hours. The class takes full advantage.`, gain:[3,8], target:"class" },
  { id:"potluck_invitation", text:(s)=>`${s.name} gets invited to an off-campus potluck. She brings a dish. She eats five.`, gain:[2,5], target:"single" },
  { id:"cooking_experiment", text:(s)=>`${s.name} has been experimenting with cooking. She's very enthusiastic. The portions are enormous.`, gain:[2,5], target:"single" },
  { id:"birthday", text:(s)=>`It's ${s.name}'s birthday this week! The whole class celebrates. There is a lot of cake.`, gain:[5,10], target:"single" },
  { id:"rainy_weekend", text:()=>`A rainy weekend keeps everyone indoors. The class collectively orders delivery and doesn't move.`, gain:[2,6], target:"class" },
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
  // ── TIER 1: 50 lbs total gained ──────────────────────────────
  { id:"comfy_chairs",    tier:1, cost:50,  category:"environment", label:"🪑 Comfortable Seating",
    desc:"Replace classroom chairs with wider, padded ones. The class notices immediately.",
    effect:"Passive gain +1 lb/week for all students. Class collectively reacts.",
    classReaction:[
      "Brittany drops into the new chair and sinks in. 'Oh. Oh this is good.'",
      "Madeline doesn't look up from her book, but she's been sitting in the same spot for four hours.",
      "Destiny arrived early today. That's new.",
      "Tiffany pats the armrest approvingly. 'Finally, appropriate furniture.'",
      "Maya hasn't moved from her chair in two hours. She looks content.",
    ],
    passiveBonus:1, apBonus:0, gainMult:0 },

  { id:"snack_station",   tier:1, cost:50,  category:"feeding", label:"🍪 Snack Station",
    desc:"Install a permanent snack station at the back of the room. Always stocked.",
    effect:"All class feeding actions gain +1 lb. Desk Snacks action cost reduced to 0 AP.",
    classReaction:[
      "Chloe gravitates to it within thirty seconds of entering. She doesn't stop.",
      "Priya has added 'snack station visit' to her between-session schedule. Multiple entries.",
      "Roxanne has claimed the corner stool nearest the station as her creative thinking spot.",
    ],
    passiveBonus:0, apBonus:0, gainMult:0.1, unlocks:["snacks_free"] },

  { id:"ap_notebook",     tier:1, cost:50,  category:"efficiency", label:"📓 Lesson Planning",
    desc:"Better-structured lessons mean more productive time for extracurricular activities.",
    effect:"+1 AP per week.",
    passiveBonus:0, apBonus:1, gainMult:0 },

  { id:"dinner_basic",    tier:1, cost:50,  category:"social", label:"🍽️ Dining Connections",
    desc:"You've cultivated relationships with several nearby restaurants. Dinner outings unlocked.",
    effect:"Unlocks 'Take to Dinner' as a proper interactive event. Unlocks: Bistro, Italian.",
    unlocks:["dinner_action"], passiveBonus:0, apBonus:0, gainMult:0 },

  { id:"dinner_casual",   tier:2, cost:150, category:"social", label:"🥂 Brunch Scene",
    desc:"You've discovered the city's best upscale brunch spots. Unlimited drinks, absurd portions.",
    effect:"Unlocks 'The Brunch Palace' venue. Ideal for daytime dates.",
    requires:["dinner_basic"], passiveBonus:0, apBonus:0, gainMult:0 },

  // ── TIER 2: 150 lbs total gained ─────────────────────────────
  { id:"wide_desks",      tier:2, cost:150, category:"environment", label:"🪵 Wide Desks",
    desc:"Larger desks with more space. More room for food, materials, and expanding figures.",
    effect:"+2 passive lbs/week. Students at stage 4+ are visibly more comfortable.",
    classReaction:[
      "Serena spreads out completely. 'Now THIS is a workspace,' she says, eating at her desk.",
      "Destiny has set up what can only be described as a personal buffet arrangement.",
      "Aaliyah nods at the new desk setup with the expression of someone whose needs have finally been met.",
      "Jasmine immediately fills all the extra space with snacks she produces from her bag.",
    ],
    passiveBonus:2, apBonus:0, gainMult:0, requires:["comfy_chairs"] },

  { id:"catering_contact", tier:2, cost:150, category:"feeding", label:"🤝 Catering Contract",
    desc:"A standing arrangement with a campus catering company. Bigger spreads, lower cost.",
    effect:"All class feast actions -1 AP cost. Holiday Feast gain +4 lbs.",
    passiveBonus:0, apBonus:0, gainMult:0, requires:["snack_station"], unlocks:["feast_discount"] },

  { id:"double_ap",       tier:2, cost:150, category:"efficiency", label:"📅 Extended Hours",
    desc:"Office hours extended. More time means more opportunities.",
    effect:"+2 AP per week.",
    passiveBonus:0, apBonus:2, gainMult:0, requires:["ap_notebook"] },

  { id:"dinner_upscale",  tier:2, cost:150, category:"social", label:"🥂 Fine Dining Network",
    desc:"Access to the city's best restaurants. More options, more courses, better settings.",
    effect:"Unlocks dinner venues: Steakhouse, French, Japanese Omakase. Dinner gain +3 lbs.",
    requires:["dinner_basic"], passiveBonus:0, apBonus:0, gainMult:0, unlocks:["dinner_upscale_venues"] },

  { id:"relationship_class", tier:2, cost:150, category:"social", label:"❤️ Personal Investment",
    desc:"You've been building genuine connections. Students open up more readily.",
    effect:"All talk actions give +2 bonus relationship. Gossip multiplier threshold reduced to 50%.",
    passiveBonus:0, apBonus:0, gainMult:0 },

  // ── TIER 3: 350 lbs total gained ─────────────────────────────
  { id:"reinforced_seating", tier:3, cost:350, category:"environment", label:"🛋️ Reinforced Furniture",
    desc:"Heavy-duty chairs and reinforced desks that can handle any weight. No more incidents.",
    effect:"+2 passive lbs/week. Chair-break narrative event no longer triggers. Students at stage 5+ react.",
    classReaction:[
      "Destiny doesn't say anything but has been sitting in one spot for six consecutive hours.",
      "Serena leans back with her full weight for the first time in months. The chair doesn't move.",
      "Sophie spreads herself across the new wide chair and looks quietly, profoundly satisfied.",
      "Aaliyah shakes the desk. Nothing. She nods approvingly and begins eating.",
      "Tiffany announces to no one in particular that the room 'has finally been optimised.'",
      "Even Maya has moved to a more central seat. She fills it completely.",
    ],
    passiveBonus:2, apBonus:0, gainMult:0, requires:["wide_desks"] },

  { id:"private_kitchen",  tier:3, cost:350, category:"feeding", label:"🍳 Private Kitchen",
    desc:"A proper kitchen space adjacent to your office. Home-cooked meals for students.",
    effect:"Home-Cooked Meal action gain +4 lbs. Bake for Her gain +3 lbs. Unlocks bulk cooking actions.",
    passiveBonus:0, apBonus:0, gainMult:0.15, requires:["catering_contact"], unlocks:["bulk_cook"] },

  { id:"research_budget",  tier:3, cost:350, category:"efficiency", label:"💰 Research Budget",
    desc:"Academic funding for 'cultural food research.' The expenses are significant.",
    effect:"+2 AP per week. All cultural assignments gain +2 lbs.",
    passiveBonus:0, apBonus:2, gainMult:0, requires:["double_ap"] },

  { id:"dinner_private",   tier:3, cost:350, category:"social", label:"🕯️ Private Dining",
    desc:"Access to private dining rooms and exclusive tables. More intimate settings.",
    effect:"Unlocks: Private Club, Chef's Table. Dinner conversation options expanded. +5 lbs dinner gain.",
    requires:["dinner_upscale"], passiveBonus:0, apBonus:0, gainMult:0, unlocks:["dinner_private_venues"] },

  { id:"group_dynamics",   tier:3, cost:350, category:"social", label:"👥 Group Psychology",
    desc:"Understanding of how the class influences each other. Targeted social pressure.",
    effect:"Influence pair bonus doubled. New action: 'Arrange Group Dinner' (takes 2 girls at once).",
    passiveBonus:0, apBonus:0, gainMult:0, requires:["relationship_class"], unlocks:["group_dinner"] },

  // ── TIER 4: 700 lbs total gained ─────────────────────────────
  { id:"dedicated_suite",  tier:4, cost:700, category:"environment", label:"🏠 Dedicated Suite",
    desc:"A specially outfitted room for students who can no longer comfortably attend regular class.",
    effect:"+3 passive lbs/week. Stage 7+ students gain +25% gains. Full class reacts.",
    classReaction:[
      "Destiny relocates immediately and apparently permanently.",
      "Jasmine visits for a 'tour' and hasn't left.",
      "Serena: 'This is just better. This is objectively better.'",
      "Aaliyah spreads across the wide couch and closes her eyes. She looks like she's arrived.",
      "Tiffany rearranges the furniture to her preference within the first hour.",
      "Maya finds the quietest corner and fills it entirely.",
    ],
    passiveBonus:3, apBonus:0, gainMult:0.25, requires:["reinforced_seating"] },

  { id:"full_catering",    tier:4, cost:700, category:"feeding", label:"🍾 Full Service Catering",
    desc:"A dedicated catering team available on demand. Every class is a feast.",
    effect:"All class actions gain x1.3 multiplier. New action: On-Demand Feast (3 AP, scales with class avg weight).",
    passiveBonus:0, apBonus:0, gainMult:0.3, requires:["private_kitchen"], unlocks:["on_demand_feast"] },

  { id:"ap_mastery",       tier:4, cost:700, category:"efficiency", label:"⚡ Peak Efficiency",
    desc:"You have this process completely optimised. Every action yields more.",
    effect:"+3 AP per week. All single actions -1 AP cost (min 0).",
    passiveBonus:0, apBonus:3, gainMult:0, requires:["research_budget"] },

  { id:"dinner_residence", tier:4, cost:700, category:"social", label:"🏡 Home Hospitality",
    desc:"Students can come to your home for extended dinner events.",
    effect:"Unlocks 'Home Dinner Party' (3 girls, evening-long event). Dinner gain x1.5.",
    requires:["dinner_private"], passiveBonus:0, apBonus:0, gainMult:0, unlocks:["dinner_party"] },

  { id:"dinner_accessible", tier:4, cost:700, category:"social", label:"♿ Accessible Dining",
    desc:"A private luxury dining suite with custom arrangements. No standard seating — designed around the guest. Only suitable for students who find regular restaurants inconvenient.",
    effect:"Unlocks 'The Atelier' — a specialty venue for students at stage 6+. Largest gain range of any venue.",
    requires:["dinner_private"], passiveBonus:0, apBonus:0, gainMult:0 },

  // ── TIER 5: 1200 lbs total gained ────────────────────────────
  { id:"full_environment", tier:5, cost:1200, category:"environment", label:"🌟 Perfect Environment",
    desc:"Everything optimised for comfort and abundance. Students never want to leave.",
    effect:"+5 passive lbs/week for all. The classroom has become a destination.",
    classReaction:[
      "Brittany texts Jasmine: 'I live here now.' Jasmine texts back: 'Same.'",
      "Emma has moved all her research materials in. She has not left in four days.",
      "Destiny's setup is now a permanent fixture of the room.",
      "Priya has redesigned her schedule around the room's food availability.",
      "Tiffany has started hosting chapter meetings here. No one objects.",
      "Maya sits in the centre of the room now. She fills a wide, reinforced armchair completely.",
      "The dining hall has seen a noticeable drop in attendance. They have complaints.",
    ],
    passiveBonus:5, apBonus:0, gainMult:0, requires:["dedicated_suite","full_catering"] },

  { id:"unlimited_ap",     tier:5, cost:1200, category:"efficiency", label:"∞ Total Dedication",
    desc:"You have restructured your entire professional life around this class.",
    effect:"+4 AP per week. Max AP cap raised to 20.",
    passiveBonus:0, apBonus:4, gainMult:0, requires:["ap_mastery"] },
];

const SKILL_CATEGORIES = {
  environment: { label:"🏛️ Environment", color:"#204060" },
  feeding:     { label:"🍽️ Feeding",     color:"#402010" },
  efficiency:  { label:"⚡ Efficiency",  color:"#302050" },
  social:      { label:"❤️ Social",      color:"#401030" },
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
  };
  return m[neglected.archetype]||`${neglected.name} looks meaningfully at ${fed.name}'s food and then at her own empty place setting.`;
};

const GROUP_CONVERSATIONS=[
  { id:"get_them_talking", label:"Get them talking",
    text:(s1,s2)=>{
      const topics={cheerleader:"the upcoming competition",quiet:"her current project",party:"last weekend",sorority:"the chapter event",scholar:"her research",athlete:"her training",artsy:"her current piece",honors:"her family",influencer:"her content strategy",foodie:"the menu"};
      const t1=topics[s1.archetype]||"her plans";
      return `You ask ${s1.name} about ${t1}. She starts — and ${s2.name} leans in, more interested than she expected.\n"Wait, really?" ${s2.name} says. "I didn't know you were doing that."\n${s1.name}: "You never asked." No edge in it. Just fact.\n${s2.name} considers this, reaches for her drink. "Fair." Then: "Tell me the rest."`;
    }, relBonus:8, fullnessEffect:-4 },
  { id:"compliment_both", label:"Compliment them both",
    text:(s1,s2)=>`You say something genuine about each of them — something you've actually noticed. ${s1.name} receives it differently than expected: more quietly, more truly. ${s2.name} looks at her, then at you.\n"He means it," ${s2.name} says.\n${s1.name}: "I know." Something about the table shifts half a degree warmer.`,
    relBonus:5, fullnessEffect:0 },
  { id:"let_it_settle", label:"Let it settle",
    text:(s1,s2)=>`The conversation drops away. Both of them are eating. The restaurant makes its small sounds. Then ${s1.name} says something about the sauce. ${s2.name} responds. Neither is talking to you, and that's fine — better, actually. The evening has found something you weren't planning for.`,
    relBonus:4, fullnessEffect:5 },
  { id:"toast_together_group", label:"Toast the evening",
    text:(s1,s2)=>`You raise your glass. They raise theirs.\n${s1.name}: "To what?"\n"To a good evening."\n${s2.name}: "We should toast to something real." She thinks. "To the food."\n${s1.name} looks at her. Then she laughs — actually laughs. "To the food." The glasses clink.`,
    relBonus:7, fullnessEffect:-3 },
  { id:"order_for_table", label:"Order another round",
    text:(s1,s2)=>`You catch the server's eye and gesture at the table generally. More arrives. ${s1.name} and ${s2.name} look at the new dishes, look at each other.\n${s2.name}: "We didn't need more."\n${s1.name}, already reaching: "I know." She keeps reaching. ${s2.name} watches for a moment, then reaches too. The evening continues.`,
    relBonus:6, fullnessEffect:8 },
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
};

const UNBUTTON_LINES=[
  (s)=>`${s.name} shifts in her seat. There's a small, deliberate movement under the table — a button giving way, the waistband releasing. She exhales. Continues eating.`,
  (s)=>`${s.name} reaches down, adjusts something quietly, and settles deeper into her chair. She looks fractionally more comfortable. She doesn't mention it.`,
  (s)=>`A quiet click from under the table. ${s.name} doesn't look up. She just keeps eating.`,
  (s)=>`${s.name} reaches down with the practiced ease of someone who has done this before, undoes her waistband, and picks up her fork again without comment.`,
  (s)=>`${s.name} pauses, does something discreet under the table, and continues. Her expression doesn't change. The pace of eating does.`,
];

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
    gainBonus:[1,3], relBonus:5 },

  { id:"suggest_second",      label:"Suggest a second helping", requires:null,
    text:(s,st)=>st<=2
      ? `"You should try the other dish," you suggest. ${s.name} hesitates, then: "You know what, yes. Why not."` 
      : st<=5 ? `"More?" ${s.name} is already raising her hand for the waiter. "I was already going to, but thank you for the permission."`
      : `You gesture at her nearly empty plate. "Again?" ${s.name} pats her enormous middle contentedly. "Obviously."`,
    gainBonus:[2,5], relBonus:4 },

  { id:"food_talk_dinner",    label:"Talk about the food",      requires:null,
    text:(s,st)=>`You and ${s.name} spend ten minutes discussing the dish in detail. She is an enthusiastic critic. She demonstrates her critique by eating more of it.`,
    gainBonus:[1,3], relBonus:6 },

  { id:"order_for_her",       label:"Order for her",            requires:"dinner_upscale",
    text:(s,st)=>st<=3
      ? `You order before she can deliberate too long — all the richest options, extra courses. ${s.name} raises her eyebrows. "That's a lot." She says it like a compliment.`
      : `You order for the table. Extensively. ${s.name} watches the dishes arrive with visible pleasure. "You know exactly what you're doing," she says. "I appreciate that."`,
    gainBonus:[3,6], relBonus:8 },

  { id:"wine_and_cheese",     label:"Insist on cheese course",  requires:"dinner_upscale",
    text:(s,st)=>`"We're having the cheese course," you say. It is not a question. ${s.name} settles back with a smile. "Obviously we are." The board that arrives is enormous. She works through all of it.`,
    gainBonus:[2,5], relBonus:5 },

  { id:"overcomes_hesitation",label:"Talk her through hesitation",requires:null,
    text:(s,st)=>st<=2
      ? `${s.name} glances at the menu uncertainly. "I shouldn't really—" You remind her she deserves a good meal. She considers this. Orders the larger option.`
      : st<=4 ? `${s.name} pauses mid-plate, looking at herself. "I've eaten so much." You tell her she's doing wonderfully. She laughs and keeps going.`
      : `${s.name} is full — visibly, obviously full. "I literally cannot," she says. You slide the dessert menu toward her. She opens it. "Fine." She eats it all.`,
    gainBonus:[2,4], relBonus:7 },

  { id:"body_compliment",     label:"Compliment how she looks", requires:null,
    text:(s,st)=>st<=1
      ? `You tell ${s.name} she looks wonderful tonight. She blinks, then smiles and takes a large bite of her food. "Thank you." She sounds like she means it.`
      : st<=4 ? `You tell ${s.name} she looks incredible. She pats her very round belly and grins. "I've been working on it." She takes another bite. "Still working on it, actually."`
      : `You tell ${s.name} she looks spectacular. She spreads her hands across her enormous, soft middle and raises an eyebrow. "I know," she says simply. She resumes eating with great satisfaction.`,
    gainBonus:[1,3], relBonus:9 },

  { id:"personal_chef_story", label:"Tell her about the chef",  requires:"dinner_private",
    text:(s,st)=>`You tell ${s.name} the chef prepared the menu specifically around her preferences. She goes still for a moment, then something in her expression shifts. "Really?" You nod. She looks at her plate differently now — with something more personal — and eats every last bite.`,
    gainBonus:[2,5], relBonus:10 },

  { id:"endless_courses",     label:"Keep ordering courses",    requires:"dinner_private",
    text:(s,st)=>`Every time ${s.name} finishes a dish you signal for another. She notices after the fourth course. "Are you just going to keep ordering?" You shrug. She laughs. "Okay." She doesn't stop eating for another two hours.`,
    gainBonus:[4,8], relBonus:8 },

  { id:"praise_capacity",     label:"Express amazement at her appetite", requires:null,
    text:(s,st)=>st<=2
      ? `"I'm impressed," you say. ${s.name} grins and finishes the dish. "I've always eaten a lot." She orders another.`
      : st<=5 ? `"I genuinely cannot believe how much you've eaten," you say. ${s.name} looks down at herself, at the pile of empty plates, and laughs. "I can." She orders dessert.`
      : `You survey the wreckage of the table. "That was extraordinary." ${s.name} pats her vast belly with a look of absolute serenity. "I'm just getting started," she says — and means it.`,
    gainBonus:[2,4], relBonus:7 },

  { id:"ask_passion",         label:"Ask about what she loves", requires:null,
    text:(s,st)=>{
      const roleLines={"Cheer Captain":`You ask about the squad. ${s.name}'s whole posture changes. "We're building something," she says. "A legacy." She describes tryout strategy for ten minutes. At some point the entire main course disappears without her noticing.`,"Dance Co-Captain":`You ask about her choreography. ${s.name} puts her fork down entirely — which she hasn't done all evening — and starts describing a movement sequence with her hands. "I want it to feel inevitable," she says. She picks up her fork and finishes everything on the plate.`,"Track Sprinter":`You ask about running. ${s.name} is quiet for a moment. "I miss it less than I thought I would," she says finally. "I still dream about it sometimes." She takes a large bite. "But this is also good."`, "Basketball Star":`You ask about basketball. ${s.name} laughs. "God. I think about the game differently now — like, I watch it differently." She tilts her head. "I'm kind of glad I'm not playing right now. I'd be a liability." She pats herself. "A comfortable liability."`, default:`You ask what she's most passionate about right now. ${s.name} looks genuinely pleased by the question. She talks for twenty minutes — animated, specific, completely unselfconscious. At some point she's eaten the entire main course without noticing.`};
      return roleLines[s.role]||roleLines.default;
    },
    gainBonus:[2,4], relBonus:10, fullnessEffect:-8 },

  { id:"talk_genuinely",      label:"Ask how she's really doing", requires:null,
    text:(s,st)=>st<=2
      ? `You set the menu down and actually ask. ${s.name} looks surprised. Then she talks — really talks — about her semester, things outside of class. She's more present than usual. She also keeps eating through it, almost unconsciously.`
      : `You turn the conversation to her, genuinely. ${s.name} pauses, then opens up. Something real passes between you. She eats steadily through the whole thing, comfortable and unhurried. She finishes three courses before she realizes.`,
    gainBonus:[1,4], relBonus:12, fullnessEffect:-5 },

  { id:"toast_together",      label:"Propose a toast", requires:null,
    text:(s,st)=>`You raise your glass. "To good food and good company." ${s.name} looks at you for a moment, then lifts her glass. The toast is simple, but something settles between you — warm and unhurried. She eats more after that.`,
    gainBonus:[1,3], relBonus:7, fullnessEffect:-4 },

  { id:"share_a_dish",        label:"Order something to share", requires:null,
    text:(s,st)=>st<=3
      ? `You order a dish for the table. "We can share." ${s.name} looks at it and, after a beat, reaches in. "Okay." She eats most of it.`
      : `You order an extra dish between you. ${s.name} looks delighted. "Perfect." She eats significantly more than half. You don't point this out.`,
    gainBonus:[2,5], relBonus:6, fullnessEffect:6 },

  { id:"after_dinner_stroll", label:"Suggest staying for another course", requires:null,
    text:(s,st)=>st<=3
      ? `"We should do the cheese course," you say. ${s.name} pauses. "I don't — " She looks at the menu. "Actually. Yes. Obviously yes."`
      : st<=6 ? `"I'm going to get more," you say. "Obviously I'm joining you," ${s.name} says. She did not need the invitation.`
      : `You gesture toward the dessert menu. ${s.name} already has it. "I've been reading it for five minutes," she says. "Let's do all of it."`,
    gainBonus:[3,7], relBonus:5, fullnessEffect:10 },

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
    gainBonus:[2,4], relBonus:9, fullnessEffect:-6 },
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
function getBodyDesc(s){ const bd=BODY_DESCS[s.bodyType]||BODY_DESCS.straight; return bd[Math.min(getStage(s.lbs).id,bd.length-1)]; }
function getOutfit(s){ const o=OUTFITS[s.archetype]||OUTFITS.default; return o[Math.min(getStage(s.lbs).id,o.length-1)]; }
function getDiary(s){ const id=getStage(s.lbs).id; if(id===0) return SLIGHT_DIARY[s.archetype]||"—"; const d=DIARY_ENTRIES[s.archetype]; return d?d[Math.min(id-1,9)]:"—"; }
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
  const logRef=useRef(null);

  useEffect(()=>{ if(logRef.current) logRef.current.scrollTop=logRef.current.scrollHeight; },[log]);

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

  const push=useCallback((msg)=>setLog(prev=>[...prev,msg]),[]);

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
      return processStudentGain(s,gain,1);
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

    const evs=collectEvents(updated);
    setStudents(updated);
    push(`📅 Week ${newWeek} begins. ${newAp} AP available.`);
    if(semEv) setTimeout(()=>push(`🎉 Semester Event: ${semEv.title} — ${semEv.text}`),100);
    if(randomEv) setTimeout(()=>push(`🎲 ${randomEv.text(updated[rnd(0,14)])}`),150);
    if(evs.length){
      setGlobalStats(g=>({...g,narrativeCount:g.narrativeCount+evs.length}));
      setEventQueue(prev=>[...prev,...evs]);
    }
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
    const ns=processStudentGain(s,gain,12);
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
        return processStudentGain(s,gain,7);
      });
      push(`🎉 ${action.label}: The whole class participated!`);
    }
    const evs=collectEvents(updated);
    setStudents(updated);
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
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,relationship:Math.min(100,st.relationship+4)}));
  };

  const doGossip=(gossip, speaker, line)=>{
    const target=students.find(s=>s.id===gossip.targetId);
    push(`💬 You ask ${speaker.name} about ${target?.name||"her classmate"}…`);
    push(`   ${line}`);
    setStudents(prev=>prev.map(s=>s.id!==speaker.id?s:{...s,relationship:Math.min(100,s.relationship+3)}));
  };

  const doHelpFatten=(gossip, speaker)=>{
    const target=students.find(s=>s.id===gossip.targetId);
    if(!target) return;
    push(`🤝 ${speaker.name} agrees to help fatten up ${target.name}. A multiplier is now active!`);
    push(`   "${gossip.offerHelp}"`);
    setStudents(prev=>prev.map(s=>{
      if(s.id===gossip.targetId) return {...s, gainMultiplier:(s.gainMultiplier||1)*gossip.helpMultiplier, gainHelpers:[...(s.gainHelpers||[]),gossip.speakerId]};
      if(s.id===gossip.speakerId) return {...s, relationship:Math.min(100,s.relationship+8)};
      return s;
    }));
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
        setTimeout(()=>triggerDinnerEnd(sUpdated,newFullness,maxFull,newTotalGain,12),1000);
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
    triggerDinnerEnd(s,dinnerEvent.fullness,dinnerEvent.maxFullness,dinnerEvent.totalGain,18);
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
          setStudents(prev=>prev.map(s=>s.id!==targetId?s:{...s,relationship:Math.min(100,s.relationship+12)}));
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
    setGroupDinnerEvent(prev=>({...prev,reactionLevels:{},students:prev.students.map(s=>({...s,dishes:[]}))}));
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
      return {...s,relationship:Math.min(100,s.relationship+15)};
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

  const sel=selectedId!==null?students.find(s=>s.id===selectedId):null;
  const totalGained=students.reduce((a,s)=>a+(s.lbs-s.startLbs),0);
  const avgLbs=Math.round(students.reduce((a,s)=>a+s.lbs,0)/students.length);
  // ── SKILL TREE DERIVED VALUES ──────────────────────────────
  const hasSkill=(id)=>unlockedSkills.includes(id);
  const skillPassiveBonus=SKILL_TREE.filter(sk=>unlockedSkills.includes(sk.id)).reduce((a,sk)=>a+sk.passiveBonus,0);
  const skillApBonus=SKILL_TREE.filter(sk=>unlockedSkills.includes(sk.id)).reduce((a,sk)=>a+sk.apBonus,0);
  const skillGainMult=1+SKILL_TREE.filter(sk=>unlockedSkills.includes(sk.id)).reduce((a,sk)=>a+sk.gainMult,0);
  const dinnerUnlocked=unlockedSkills.includes("dinner_basic");

  // ── EFFECTIVE ACTIONS (applying unlocked skill effects) ──────
  const effectiveSingleActions=ACTIONS_SINGLE.map(a=>({
    ...a,
    cost:Math.max(0,a.cost-(hasSkill("ap_mastery")?1:0)),
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
          <button onClick={startClass} style={C.btn("#186028")}>⏩ Next Week (+5 AP)</button>
        </div>
      </div>

      {/* NAV */}
      <div style={C.nav}>
        {[["class","📋 Roster"],["student","👤 "+(sel?.name||"Student")],["actions","🎭 Actions"],["skills","🌳 Skills"],["achievements","🏆 Achievements"]].map(([v,l])=>(
          v==="student"&&!sel?null:
          <button key={v} style={C.navB(view===v)} onClick={()=>setView(v)}>{l}</button>
        ))}
      </div>

      <div style={C.body}>
        <div style={C.main}>

          {/* ── CLASS ROSTER ── */}
          {view==="class"&&(
            <div>
              <p style={C.secT}>Students — {students.length} enrolled · avg {avgLbs} lbs</p>
              <div style={C.grid2}>
                {students.map(s=>{
                  const st=getStage(s.lbs);
                  return(
                    <div key={s.id} style={C.card} onClick={()=>{setSelectedId(s.id);setView("student")}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:3}}>
                        <span style={{fontWeight:700,fontSize:15,color:"#d8a8ff"}}>{s.name}</span>
                        <StageTag stage={st}/>
                      </div>
                      <div style={{fontSize:10,color:"#70508a",marginBottom:3}}>{s.role||s.archetype} · {s.bodyType} · {s.age}y · <MoodBadge mood={s.mood}/></div>
                      <Bar val={s.lbs} color={st.color}/>
                      <div style={{fontSize:11,color:"#a88050",margin:"2px 0"}}>{s.lbs} lbs (+{s.lbs-s.startLbs}) · ❤ {s.relationship}%</div>
                      <div style={{fontSize:10,color:"#504060",fontStyle:"italic",lineHeight:1.4,marginTop:3}}>
                        {(STAGE_REACTIONS[s.archetype]?.[st.id]||"").slice(0,62)}…
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
                    </div>
                  </div>

                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {WEIGHT_STAGES.map(ws=>(
                      <span key={ws.id} style={{background:ws.id<=st.id?ws.color:"#130920",color:ws.id<=st.id?"#fff":"#302040",borderRadius:8,padding:"2px 7px",fontSize:9,border:ws.id===st.id?"1px solid #c060ff":"1px solid transparent",fontWeight:ws.id===st.id?700:400}}>
                        {ws.label}
                      </span>
                    ))}
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
                  <div style={{fontSize:13,color:"#e8d8a8",fontStyle:"italic",lineHeight:1.75}}>"{STAGE_REACTIONS[s.archetype]?.[st.id]}"</div>
                </div>

                {/* Diary */}
                <div style={C.infoBox("rgba(30,5,60,0.4)")}>
                  <div style={{fontSize:9,color:"#5028a0",letterSpacing:2,marginBottom:4}}>DIARY ENTRY</div>
                  <div style={{fontSize:12,color:"#c8b898",fontStyle:"italic",lineHeight:1.8}}>{getDiary(s)}</div>
                </div>

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
            const CATS=["environment","feeding","efficiency","social"];
            const CAT_COLORS={"environment":"#3a8060","feeding":"#804020","efficiency":"#304080","social":"#802040"};
            const TIERS=[1,2,3,4,5];
            const TIER_COSTS=[50,150,350,700,1200];
            // Build node positions — single column for active category
            const nodes=SKILL_TREE
              .filter(sk=>sk.category===skillCat)
              .map(sk=>{
                const row=sk.tier-1;
                const x=PAD_X+COL_W/2;
                const y=PAD_Y+row*ROW_H+ROW_H/2;
                return {...sk,x,y};
              });
            const svgW=PAD_X*2+COL_W;
            const svgH=PAD_Y*2+TIERS.length*ROW_H;
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
                                const rsk=SKILL_TREE.find(s=>s.id===r);
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
                          <div style={{fontSize:10,color:"#5a3070",marginTop:3}}>{unlockedSkills.length} / {SKILL_TREE.length} skills</div>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ── ACHIEVEMENTS ── */}
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
    </div>
  );
}
