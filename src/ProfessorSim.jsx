import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// DATA LAYER
// ═══════════════════════════════════════════════════════════════

const WEIGHT_STAGES = [
  { id:0, label:"Slim",      min:100, color:"#3a8a3a", desc:"Slender and toned — clothes hang loosely, effortless movement." },
  { id:1, label:"Soft",      min:135, color:"#6a9a20", desc:"A gentle softness settling in. Belly pooching slightly, cheeks a touch fuller, thighs pressing together at the top." },
  { id:2, label:"Chubby",    min:162, color:"#b0a000", desc:"Visibly rounded belly pushing at waistbands. Face rounder, arms softer, hips wider. Clothes are noticeably tighter." },
  { id:3, label:"Plump",     min:195, color:"#c07010", desc:"A real belly rounding outward. Double chin forming. Thighs rubbing together. Shirts riding up. Breathing heavier on stairs." },
  { id:4, label:"Heavy",     min:238, color:"#b05010", desc:"Belly hangs forward prominently. Arms thick and jiggly, legs genuinely chunky. Standard chairs creak. Walks with a slight waddle." },
  { id:5, label:"Fat",       min:285, color:"#982808", desc:"A clear, rolling waddle. Belly past the hips. Cheeks very round and soft. Chair armrests a tight squeeze. Breathing audible." },
  { id:6, label:"Very Fat",  min:360, color:"#800000", desc:"Belly cascades toward the knees. Arms like soft bolsters. Needs wide doorways. Can't see her feet. Movement slow and deliberate." },
  { id:7, label:"Enormous",  min:465, color:"#600000", desc:"Fills an entire couch. Can't fit in a car. Belly rests on thighs. Getting up requires leverage and real effort." },
  { id:8, label:"Immobile",  min:595, color:"#400000", desc:"Too wide for standard hallways. Reinforced furniture required. Shuffles a few steps at most. A vast, soft, commanding presence." },
  { id:9, label:"Blob",      min:820, color:"#200000", desc:"Entirely immobile. A breathtaking mountain of warm, soft flesh. The room is organised around her." },
];

const BODY_DESCS = {
  pear:[
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
  cheerleader:["Fitting in her uniform just fine, thanks.","Uniform feels a tiny bit snug. Probably just bloating.","Okay something is DEFINITELY off. My captain is giving me looks.","Got benched. 'Affecting team dynamics.' Whatever.","Dropped off the squad. Practice was exhausting anyway.","Can't believe I used to do cartwheels. My thighs won't let me jog now.","Squad came to visit. They seemed… impressed? Weird vibe.","Could probably just sit on the opposing team at this point.","Coach asked if I'd be team mascot. I said only if they bring food.","I am the couch now. Bring snacks."],
  bookworm:["Focused entirely on her thesis. Barely notices food.","Library snacks are a perfectly reasonable study aid.","My chair squeaks now. Must be a loose bolt.","Had to get a new desk chair. The armrests were digging in.","Research into caloric science has been very… hands-on.","Found a paper correlating body fat with cushioning for long study sessions. Compelling.","Started studying from home. Libraries are so far.","Online classes only now. I've never been more productive.","Biggest brain in the department. Also the biggest everything else.","Dissertation is finished. Just going to sit here and be massive."],
  influencer:["Posts fitness content every 3 hours.","'Soft era' content performing surprisingly well.","'Body neutrality era' is my brand now.","Followers went UP. They love the glow-up content.","BBW influencer now. Monetized and thriving.","Just hit 500k. The algorithm loves me like this.","Gaining journey content is viral. Book deal incoming.","Can barely hold the phone but my assistant films for me.","I basically run the fat acceptance corner of the internet.","I am the content. The content is me."],
  athlete:["Fastest girl on the track team. Eats like a horse anyway.","PRs slipping. Probably overtraining.","Cut from varsity. 'Weight concerns.' Rude.","Used to be able to do pull-ups. Now I mostly watch.","Gym membership cancelled. The treadmills were making a noise.","Incredible core strength. It's just buried now.","Old coach came by. I think she cried. I don't know why.","The couch is the only sport I play now. I'm very good at it.","Former teammates came to visit. They are very small compared to me.","I am the biggest thing that has ever sat on this street."],
  artsy:["Always in paint-splattered overalls. Ethereal energy.","Started painting still lifes of food. 'Inspired' she says.","Subjects are getting bigger. So is the artist.","Switched to sculpting. Clay is more 'tactile.' So am I.","Work explores 'abundance themes.' Yes.","Gallery show: 'The Body as Canvas.' I am the canvas.","Critics call my aesthetic 'opulent.' They mean me, I think.","Too big to move my own sculptures. I direct others now.","Artist-in-residency ended. Still here.","I have transcended. I am art."],
  gamer:["Energy drinks, ramen, 14-hour sessions. It's a lifestyle.","Desk chair is suddenly uncomfortable. Upgrading to a gaming throne.","New gaming chair rated for 300 lbs. 'Future-proofing,' I said.","Stream viewers keep donating food delivery to my address. I accept.","Sponsored by a snack company. This is my dream life.","Setup includes a minifridge within arm's reach.","Standing is optional. My character does the moving for me.","Viewers call me 'Queen.' Fridge on either side of my chair.","Most consecutive hours gaming record. And most snacks consumed.","Final form achieved. One with the beanbag."],
  sorority:["Always camera-ready, salad for lunch, wine on weekends.","Brunch calories 'don't count.' Brunch is four times a week.","Sisters staged an intervention. I staged a pizza party.","Dropped the diet talk. Added a second dessert.","I am now the 'fun one' of the house. I was always the fun one.","Formal dress had to be custom ordered. Worth it.","Didn't fit in the chapter room chair. Brought my own.","Hosting all events now because I prefer not to travel.","House voted me 'most comfortable to be around.' Literally.","I have become the sorority house. Spiritually."],
  overachiever:["4.0 GPA, two internships, varsity, student council. Also stressed.","Stress eating is a documented response. She's documented it.","Self-care means a full meal between each scheduled activity.","Dropped one internship. 'Work-life balance.' Work is eating now.","Thesis on metabolic adaptations. Primary source: herself.","GPA still 3.9. Everything else has changed dramatically.","Academic advisor asked if she was 'okay.' She said 'thriving.'","Graduated early. Currently in bed. Victorious.","Plans to pursue a PhD. Remotely. From this spot.","She has achieved everything. Now she just achieves mass."],
  quiet:["Sits in the back. Never raises her hand. Always watching.","Brings extra snacks to class. Shares with no one.","Smiled at a compliment for the first time.","Sitting in the middle of class now. Takes up more room.","Asked a question for the first time. About nutrition.","She's… blooming. Literally and figuratively.","Has opinions now. Mostly about food. Very good opinions.","The whole class knows her name. She fills the room.","She is the room.","Serene. Vast. At peace."],
  transfer:["New to campus, a little lost, eager to fit in.","Campus food is so good compared to back home!","Made friends! Mostly at the dining hall.","Feeling much more settled here. In every sense.","Hometown friends visited and didn't recognize her. She laughed.","This campus really suits her. She has really… settled in.","Considers herself a local now. A large, local presence.","She IS campus, basically.","Listed her weight as a campus landmark.","Fully integrated. Irreplaceable. Immovable."],
};

const OUTFITS = {
  cheerleader:[
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
  { id:"uniform_split", stageMin:2, archetype:"cheerleader", title:"Uniform Incident",
    text:(s)=>{
      const pool=[
        `During what ${s.name} swears will be her last practice, her cheer uniform splits along the seam with an audible pop. The gym goes quiet. ${s.name} looks down at herself — at the soft belly now escaping the fabric — and starts laughing. She texts you that evening. "So I definitely need a new uniform. Four sizes up minimum. Also I just had pizza and it was incredible. Life is weird. Good weird."`,
        `It happens mid-routine: a seam goes, then another, and ${s.name}'s uniform simply gives up. She freezes. The squad freezes. Then ${s.name} looks down at herself — genuinely round now, soft everywhere the uniform used to be tight — and shrugs. "Honestly, saw that coming." She texts you from the parking lot. "Retired the uniform. Getting dinner. The two events feel related and I'm fine with both."`,
        `${s.name}'s squad jacket won't button anymore. She's been ignoring this for weeks, but today it splits at the shoulder seam during warm-ups in front of everyone. There's a beat of silence. Then she smooths her hands over her very round middle, tilts her chin up, and says, "Okay. That's where we are." After class she finds you. "Do you know a good seamstress? Asking for a friend who is me and is very large now."`,
      ];
      return pool[s.id % pool.length];
    },
    gain:[4,8], rel:12 },
  { id:"chair_breaks", stageMin:3, archetype:null, title:"The Chair Incident",
    text:(s)=>{
      const pool=[
        `A classroom chair gives way under ${s.name} with a loud crack. She goes bright red. You slide a sturdier chair over without a word. After class she hangs back. "Thank you for… not making it weird." She glances down at herself, pats her belly almost fondly. "I've gotten kind of big, haven't I." It doesn't come out like a problem.`,
        `The chair under ${s.name} lets out a sharp crack and lists sideways. ${s.name} grabs the desk with both hands. For a moment the room is very quiet. You produce a reinforced chair from the back as if this were planned. She sits in it, cheeks pink, then after class catches you at the door. "That was smooth of you," she says. "Very diplomatic." She's smiling. "I should probably stop being surprised when furniture can't handle me."`,
        `It happens during a quiet part of lecture — a groan of plastic and then ${s.name} is suddenly much lower than she was. She lets out a short laugh before she can stop herself. You wave off the moment and keep talking, and she settles into your sturdier desk chair. Afterwards: "I actually feel better about it than I expected to," she admits, pressing a hand to her soft middle. "I mean. Look at me. I've gotten enormous. I think I knew the chairs were on borrowed time."`,
        `${s.name}'s chair goes with a crack that makes everyone look up. Her face is unreadable for a long beat — then she sighs the sigh of someone who saw this coming. You hand her the solid chair from behind your desk. "I ordered three of these," you tell her quietly. "For high achievers." She snorts. "Sure you did." But she sits down and, after a moment, she's smiling. After class: "I've gained like sixty pounds this semester. I should have seen that coming." She pats her belly. "Anyway."`,
      ];
      return pool[s.id % pool.length];
    },
    gain:[3,5], rel:18 },
  { id:"viral_post", stageMin:3, archetype:"influencer", title:"Going Viral",
    text:(s)=>`${s.name} posts a video attempting to fit into her old jeans. It goes viral overnight. Two million views in twelve hours. Comments are overwhelmingly enthusiastic. She shows you in class, glowing. "Two. Million." She tilts the phone to show you the view count. Her old jeans are somewhere around her thighs in the thumbnail. "I think this is my era," she says.`,
    gain:[5,9], rel:20 },
  { id:"thesis_rewrite", stageMin:2, archetype:"bookworm", title:"Academic Pivot",
    text:(s)=>`${s.name} submits a revised thesis outline. New title: 'Adaptive Caloric Strategy and Cognitive Performance: An Ethnographic Self-Study.' The abstract is rigorous. It is also clearly an elaborate academic justification for eating constantly. You approve it immediately. She beams with the energy of someone who has made weight gain count toward her GPA.`,
    gain:[3,6], rel:15 },
  { id:"gaming_sponsor", stageMin:4, archetype:"gamer", title:"Snack Sponsorship",
    text:(s)=>`${s.name} has a snack sponsorship deal. She tells you with enormous satisfaction, adjusting herself in her chair. "They send boxes. Every week. Full boxes." She pauses. "I've been doing a lot of product testing." You look at her — noticeably bigger — and nod. "Thorough research," you say. She grins. "The most thorough."`,
    gain:[5,10], rel:18 },
  { id:"intervention_fails", stageMin:3, archetype:"sorority", title:"The Intervention That Wasn't",
    text:(s)=>`${s.name}'s sisters stage an 'intervention' about her eating. It devolves into a two-hour dinner when ${s.name} orders for the table. By dessert everyone has forgotten the intervention. ${s.name} has eaten more than anyone. She tells you the next day, delighted. "I think I accidentally converted three of them."`,
    gain:[5,8], rel:22 },
  { id:"art_exhibition", stageMin:4, archetype:"artsy", title:"The Body Exhibition",
    text:(s)=>`${s.name}'s senior show opens and every piece is a meditation on abundance — overflowing bowls, voluptuous figures, textures of excess. Critics write 'opulent' and 'unapologetically sensual.' ${s.name} stands at the opening in a flowing dress that shows every curve, eating cheese from the reception table. "The artist," she says, gesturing at herself, "is also the subject matter."`,
    gain:[4,7], rel:20 },
  { id:"team_weigh_in", stageMin:2, archetype:"athlete", title:"The Weigh-In",
    text:(s)=>`${s.name} has been avoiding the athletics department scale for weeks. Today she can't. She tells you flatly: "Thirty-five pounds over their limit." Beat. "They were very professional about it." Another beat. "I ate an entire pizza on the way home and I feel fine, actually." She does look fine — soft and full-cheeked and more relaxed than you've ever seen her.`,
    gain:[4,7], rel:15 },
  { id:"quiet_opens_up", stageMin:3, archetype:"quiet", title:"She Opens Up",
    text:(s)=>`After class, ${s.name} catches you packing up. She's looking at her own rounded belly with an expression you can't read. Then she looks up. "I actually like how I look now," she says quietly. "Is that weird?" You tell her it isn't. She nods, pulls a pastry from her bag, takes a bite. The two of you eat in comfortable silence for a moment. She smiles.`,
    gain:[3,5], rel:28 },
  { id:"overachiever_pivot", stageMin:3, archetype:"overachiever", title:"A Change of Thesis",
    text:(s)=>`${s.name} submits a revised thesis proposal: 'Adaptive Caloric Strategy and Cognitive Performance: A Self-Study.' You read the abstract. It is rigorous. It is also clearly an elaborate academic justification for eating constantly. You approve it. She beams with the energy of someone who has made gaining weight count toward her GPA.`,
    gain:[3,6], rel:20 },
  { id:"transfer_settled", stageMin:4, archetype:"transfer", title:"Finally Home",
    text:(s)=>`${s.name} gets a call from her parents asking if she wants to transfer back home. She's quiet for a moment, looking out the window at the campus she's come to know so intimately. "No," she says finally. "I think I'm where I'm supposed to be." She hangs up, pats her enormous belly with obvious affection, and heads to the dining hall.`,
    gain:[4,8], rel:22 },
  { id:"custom_clothing", stageMin:5, archetype:null, title:"Shopping Trip",
    text:(s)=>`${s.name} announces she's had to go up four clothing sizes and nothing in stores fits anymore. Rather than distress, there's satisfaction in her voice. "I got measured properly for the first time. Did you know I carry most of it here —" she pats her belly "— and here." She pats her hips. "Custom order. It's going to look incredible."`,
    gain:[2,5], rel:16 },
  { id:"immobility_peace", stageMin:7, archetype:null, title:"Comfortable",
    text:(s)=>`You find ${s.name} settled into the reinforced couch, a plate balanced on her enormous belly, utterly at ease. "I've been thinking," she says, "I used to spend so much energy on movement. Walking, exercising, all of that." She takes a slow bite. "This is better." She isn't asking for your opinion. She's just telling you how things are. You bring her something else to eat.`,
    gain:[5,12], rel:22 },
  { id:"blob_ending", stageMin:9, archetype:null, title:"Final Form",
    text:(s)=>`${s.name} can no longer come to class. You bring class to her. She holds court from her specially furnished room — vast, warm, content. Students orbit her. She eats, talks, laughs. When you ask how she feels, she considers this. "Full," she finally says. "Really, genuinely full." She smiles. "Keep it coming."`,
    gain:[0,0], rel:35 },
];

const TALK_RESPONSES = {
  how_are_you:(s,st)=>{
    if(st<=1) return `${s.name} tucks hair behind her ear. "Doing well! Eating a little more than usual maybe, but — yeah. Good." She pats her slightly softer middle, barely noticing it.`;
    if(st<=3) return `${s.name} settles back, chair creaking softly. "Honestly? Really good. I feel comfortable lately. More than before." She smiles, belly resting forward noticeably.`;
    if(st<=6) return `${s.name} grins, shifting her considerable weight. "Amazing, actually." She glances at her round belly with obvious affection. "I don't know when I got so big, but I'm genuinely happy."`;
    return `${s.name} looks up serenely, full cheeks flushed. "Perfect," she says simply. "I am absolutely perfect." She resumes eating.`;
  },
  compliment_figure:(s,st)=>{
    if(st<=1) return `${s.name} blinks, then flushes. "Oh — thank you. I don't usually get…" She glances down at herself uncertainly. "Yeah. Thank you."`;
    if(st<=2) return `${s.name} looks at her softened figure and smiles cautiously. "I mean… I have been feeling a bit different lately. In a good way, I think?"`;
    if(st<=4) return `${s.name} beams. She smooths her hands over her sides, feeling the heft of herself. "I think so too. I've really filled out." She sounds very pleased.`;
    if(st<=6) return `${s.name} laughs warmly, adjusting her heavy frame. "I know, right? I'm huge." She says it with obvious pride. "I just keep getting bigger."`;
    return `${s.name} regards you with serene amusement from her enormous settled mass. "Obviously," she says. "I'm spectacular." She returns to eating.`;
  },
  food_talk:(s,st)=>{
    const places=["the new place on campus","that spot near the library","the dining hall extension","the off-campus bistro"];
    const p=places[s.id%places.length];
    if(st<=2) return `"Oh, we're talking food?" ${s.name} brightens. "Have you tried ${p}? I've been going every few days. The portions are enormous."`;
    if(st<=5) return `${s.name} lights up immediately. "I've really developed my palate lately. Mostly in the direction of 'more.'" She gestures at herself. "Evidence present."`;
    return `${s.name} laughs. "I could talk about food endlessly. Actually — are there snacks here? There should be snacks." She looks around hopefully.`;
  },
  class_talk:(s,st)=>{
    if(st<=2) return `"I've been really into the anthropology readings," ${s.name} says. "The stuff about feasting culture? It's making me think about food differently." She pauses. "Hungrily."`;
    if(st<=5) return `"I love this class," ${s.name} says simply. "The assignments are my favourite. Especially the eating ones." She pats her belly contentedly.`;
    return `"Can we do another food assignment?" ${s.name} asks earnestly. "For my learning. I learn best by eating things." She appears completely sincere.`;
  },
  encourage_eating:(s,st)=>{
    if(st<=1) return `${s.name} hesitates, glancing at her slightly softer middle. "I mean… I probably shouldn't—" She wavers. "— but maybe just a little more. It does smell amazing."`;
    if(st<=3) return `${s.name} barely needs convincing. "Oh I was already planning to," she says, reaching for more. "You just gave me permission to go faster."`;
    if(st<=6) return `${s.name} laughs. "Was I not already? I've been eating basically constantly." She doesn't look remotely bothered. "But yes. More. Absolutely."`;
    return `${s.name} gives you a look of serene amusement. "I appreciate the enthusiasm," she says, already eating, "but I genuinely have this handled."`;
  },
  ask_lifestyle:(s,st)=>{
    if(st<=1) return `"Pretty normal," ${s.name} says. "Class, ${s.hobby}, dining hall. The food here is actually really good."`;
    if(st<=3) return `"I've simplified," ${s.name} says. "Class, ${s.hobby}, and eating. Mostly eating, honestly. I'm happier."`;
    if(st<=6) return `${s.name} considers. "Eat, relax, the occasional ${s.hobby} when I feel like moving." She looks at her enormous body. "Bigger in some ways. Better in all of them."`;
    return `${s.name} shifts comfortably. "Eat. Sit. Exist. I'm excellent at all three. That's the full lifestyle summary."`;
  },
  ask_weight:(s,st)=>{
    if(st<=1) return `${s.name} laughs awkwardly. "I've put on a bit. The food here is genuinely dangerous." She doesn't seem very worried.`;
    if(st<=2) return `${s.name} looks down and sighs — not quite distress. "Yeah. I know. My clothes have been…" She prods her belly thoughtfully. "Unhappy."`;
    if(st<=4) return `${s.name} pats her belly with resigned amusement. "I'm aware I've gotten kind of big." Beat. "I also had a huge lunch and I'm thinking about dinner. So."`;
    if(st<=6) return `${s.name} spreads her hands across her wide middle. "Enormous," she says, with growing pride. "I weighed myself last week and then immediately ordered pizza to celebrate."`;
    return `${s.name} laughs richly. "I am magnificently, spectacularly fat." She settles deeper. "And getting bigger. I love it." She reaches for more food.`;
  },
  about_gaining:(s,st)=>{
    if(st<=1) return `${s.name} blinks. "I mean — yeah, I've put on a few. The food here is so good." She seems unbothered. "Is it that noticeable?"`;
    if(st<=3) return `${s.name} looks at herself, at the real belly now resting forward. "I mean… yeah. I know." A pause. "I don't really mind, honestly. Is that weird?"`;
    if(st<=5) return `${s.name} grins. "I know. I'm huge and getting huger." She sounds delighted. "Every week there's just more of me. I think it suits me."`;
    return `${s.name} laughs warmly. "Keep going, I say. There's clearly no stopping now." She gestures at her enormous mass with obvious satisfaction.`;
  },
  future_plans:(s,st)=>{
    if(st<=2) return `"Graduate, get a job, the usual," ${s.name} says. "Oh, and I want to try that new restaurant downtown. That's also a priority."`;
    if(st<=5) return `"Honestly?" ${s.name} says. "More of this. More food, more comfort, more of just… being." She looks content. "My plans have simplified."`;
    return `${s.name} smiles slowly. "My plans are right here," she says. "This." She spreads her hands across her vast body. "I think I've arrived."`;
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
  if(targetStageId<=2) return gossip.lines.low;
  if(targetStageId<=5) return gossip.lines.mid;
  if(targetStageId<=8) return gossip.lines.high;
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

const DINNER_VENUES = [
  { id:"bistro",    label:"🥖 Campus Bistro",      tier:1, baseCourses:2, gainRange:[4,8],
    desc:"Cosy neighbourhood bistro. Good portions, comfortable atmosphere.",
    dishes:[
      { id:"soup_bread", label:"Soup & Bread Board", gain:[1,3], desc:"Thick potato soup with a full bread board." },
      { id:"pasta",      label:"Pasta Carbonara",    gain:[2,4], desc:"Generous portion, rich sauce, topped with parmesan." },
      { id:"salad_big",  label:"'House Salad'",      gain:[1,2], desc:"Technically a salad. More cheese than greens." },
    ] },
  { id:"italian",   label:"🍝 Rosetti's Italian",  tier:1, baseCourses:3, gainRange:[5,10],
    desc:"Family Italian. Courses keep coming until you say stop — which you won't.",
    dishes:[
      { id:"bruschetta",  label:"Antipasto Board",   gain:[2,4], desc:"Bruschetta, olives, cured meats, fresh bread." },
      { id:"risotto",     label:"Truffle Risotto",   gain:[3,5], desc:"Enormous bowl. Extremely rich." },
      { id:"lasagne",     label:"House Lasagne",     gain:[3,6], desc:"Three layers. A complete structure of food." },
      { id:"tiramisu",    label:"Tiramisu",          gain:[1,3], desc:"Full portion. She does not need encouragement." },
    ] },
  { id:"steakhouse",label:"🥩 The Grill Room",     tier:2, baseCourses:3, gainRange:[6,12],
    desc:"Traditional steakhouse. Portions are architectural.",
    dishes:[
      { id:"shrimp_cocktail", label:"Shrimp Cocktail",  gain:[1,3], desc:"A tower of shrimp." },
      { id:"ribeye",          label:"18oz Ribeye",      gain:[4,7], desc:"An enormous steak. Served with three sides by default." },
      { id:"loaded_potato",   label:"Loaded Baked Potato", gain:[2,4], desc:"Barely qualifies as a potato anymore." },
      { id:"cheesecake",      label:"NY Cheesecake",    gain:[2,4], desc:"Full slice. Enormous. Rich." },
    ] },
  { id:"french",    label:"🥐 Maison Laurent",     tier:2, baseCourses:4, gainRange:[7,14],
    desc:"Upscale French. Multiple courses mandatory. Chef's feelings are involved.",
    dishes:[
      { id:"amuse",       label:"Amuse-Bouche",        gain:[1,2], desc:"Five tiny courses that add up to a full meal." },
      { id:"foie_gras",   label:"Foie Gras",           gain:[2,4], desc:"Rich and indulgent. The chef insists on a full portion." },
      { id:"duck_confit", label:"Duck Confit",         gain:[3,6], desc:"Crispy skin, rich meat, enormous portion." },
      { id:"soufle",      label:"Chocolate Soufflé",   gain:[2,4], desc:"Cannot be shared. Will not be shared." },
      { id:"cheese",      label:"Cheese Course",       gain:[2,4], desc:"Seven cheeses. Mandatory." },
    ] },
  { id:"omakase",   label:"🍱 Nakamura Omakase",   tier:2, baseCourses:5, gainRange:[6,12],
    desc:"Japanese omakase. The chef decides. There are many courses. They are all large.",
    dishes:[
      { id:"sashimi",    label:"Sashimi Selection",   gain:[1,3], desc:"Course one. Many pieces." },
      { id:"wagyu",      label:"A5 Wagyu",            gain:[3,5], desc:"The richest beef available. Multiple pieces." },
      { id:"ramen",      label:"Truffle Ramen",       gain:[3,6], desc:"The signature. Extremely rich broth." },
      { id:"mochi",      label:"Mochi & Matcha",      gain:[1,2], desc:"Dessert. Five pieces. She will eat all of them." },
    ] },
  { id:"private_club", label:"🎩 The Meridian Club", tier:3, baseCourses:4, gainRange:[8,16],
    desc:"Member-only private dining club. Portions are described as 'generous' which means 'extraordinary'.",
    dishes:[
      { id:"tasting_menu", label:"Chef's Tasting Menu",  gain:[5,9],  desc:"Seven courses. Non-negotiable." },
      { id:"wagyu_private",label:"Private Reserve Wagyu",gain:[4,7],  desc:"Different wagyu. More of it." },
      { id:"truffle_pasta",label:"Black Truffle Pasta",  gain:[3,6],  desc:"Buried in truffle. Buried in parmesan." },
      { id:"mille_feuille",label:"Mille-Feuille",        gain:[2,4],  desc:"The pastry alone counts as a meal." },
    ] },
  { id:"chefs_table",  label:"👨‍🍳 Chef's Table",        tier:3, baseCourses:5, gainRange:[10,18],
    desc:"Private chef's table. The chef cooks for her specifically. It is excessive.",
    dishes:[
      { id:"personal_menu", label:"Personal Menu",        gain:[6,10], desc:"The chef has designed this entirely around her preferences." },
      { id:"wagyu_special", label:"Wagyu Tasting",        gain:[4,8],  desc:"Four cuts. Each enormous." },
      { id:"dessert_cart",  label:"Full Dessert Cart",    gain:[3,6],  desc:"Every dessert. All of them." },
    ] },
  { id:"home_dinner",  label:"🏡 Professor's Home",    tier:4, baseCourses:6, gainRange:[12,22],
    desc:"An evening at your home. You cook everything. There is no limit to how much you make.",
    dishes:[
      { id:"home_app",    label:"Home Appetisers",    gain:[3,6],  desc:"A full spread before the main event." },
      { id:"home_main",   label:"Main Course",        gain:[5,9],  desc:"Whatever she loves most, in enormous quantity." },
      { id:"home_second", label:"Second Helpings",    gain:[4,8],  desc:"The offer she cannot refuse." },
      { id:"home_dessert",label:"Dessert & More",     gain:[3,7],  desc:"Dessert, then more dessert, then more dessert." },
      { id:"midnight",    label:"Late Night Snacks",  gain:[3,6],  desc:"She's still here. You keep feeding her." },
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
];


const ACHIEVEMENT_LIST = [
  { id:"first_gain",    label:"🌱 First Feeding",       desc:"Successfully feed a student for the first time.",            check:(sts)=>sts.some(s=>s.lbs>s.startLbs) },
  { id:"stage2",        label:"📈 Chubby Club",         desc:"Any student reaches the Chubby stage.",                     check:(sts)=>sts.some(s=>getStage(s.lbs).id>=2) },
  { id:"stage4",        label:"🍔 Heavy Hitter",        desc:"Any student reaches Heavy.",                                check:(sts)=>sts.some(s=>getStage(s.lbs).id>=4) },
  { id:"stage6",        label:"🛋️ Couch Queen",        desc:"Any student reaches Very Fat.",                             check:(sts)=>sts.some(s=>getStage(s.lbs).id>=6) },
  { id:"stage8",        label:"🏠 Immovable Object",   desc:"Any student reaches Immobile.",                             check:(sts)=>sts.some(s=>getStage(s.lbs).id>=8) },
  { id:"stage9",        label:"🌕 Blob Status",         desc:"Any student reaches Blob.",                                 check:(sts)=>sts.some(s=>getStage(s.lbs).id>=9) },
  { id:"all_soft",      label:"🫧 Soft Semester",       desc:"All students reach at least Soft.",                         check:(sts)=>sts.every(s=>getStage(s.lbs).id>=1) },
  { id:"all_chubby",    label:"🥧 Chubby Class",        desc:"All students reach at least Chubby.",                       check:(sts)=>sts.every(s=>getStage(s.lbs).id>=2) },
  { id:"all_plump",     label:"🍮 Plump Roster",        desc:"All students reach at least Plump.",                        check:(sts)=>sts.every(s=>getStage(s.lbs).id>=3) },
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
function getDiary(s){ const d=DIARY_ENTRIES[s.archetype]; return d?d[Math.min(getStage(s.lbs).id,9)]:"—"; }
function rnd(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }

const INIT_STUDENTS = [
  { id:0,  name:"Brittany", archetype:"cheerleader",  age:19, bodyType:"pear",      lbs:118, startLbs:118, desc:"Petite, tight ponytail, squad jacket always on.",                  favFood:"protein shakes", hobby:"cheerleading",  personality:"bubbly",      relationship:20, triggeredEvents:[], mood:"happy" },
  { id:1,  name:"Madeline", archetype:"bookworm",     age:20, bodyType:"straight",  lbs:125, startLbs:125, desc:"Lanky, cardigans, glasses perpetually sliding.",                   favFood:"granola bars",   hobby:"research",      personality:"analytical",  relationship:20, triggeredEvents:[], mood:"focused" },
  { id:2,  name:"Kylie",    archetype:"influencer",   age:18, bodyType:"hourglass", lbs:122, startLbs:122, desc:"Perfectly contoured, phone always raised.",                        favFood:"acai bowls",     hobby:"content",       personality:"confident",   relationship:20, triggeredEvents:[], mood:"excited" },
  { id:3,  name:"Serena",   archetype:"athlete",      age:21, bodyType:"athletic",  lbs:145, startLbs:145, desc:"Broad-shouldered, muscled, always in compression gear.",           favFood:"pasta",          hobby:"track",         personality:"competitive", relationship:20, triggeredEvents:[], mood:"focused" },
  { id:4,  name:"Fiona",    archetype:"artsy",        age:22, bodyType:"straight",  lbs:115, startLbs:115, desc:"Flowy linen, paint under nails, mismatched earrings.",             favFood:"cheese boards",  hobby:"painting",      personality:"dreamy",      relationship:20, triggeredEvents:[], mood:"content" },
  { id:5,  name:"Destiny",  archetype:"gamer",        age:19, bodyType:"apple",     lbs:155, startLbs:155, desc:"Oversized hoodie, headphones around neck, always sleepy.",         favFood:"ramen",          hobby:"gaming",        personality:"dry",         relationship:20, triggeredEvents:[], mood:"tired" },
  { id:6,  name:"Tiffany",  archetype:"sorority",     age:20, bodyType:"hourglass", lbs:128, startLbs:128, desc:"Pastel everything, perfect blowout, Greek letters on tote.",       favFood:"rosé and brie",  hobby:"events",        personality:"social",      relationship:20, triggeredEvents:[], mood:"happy" },
  { id:7,  name:"Priya",    archetype:"overachiever", age:21, bodyType:"straight",  lbs:120, startLbs:120, desc:"Planner out, colour-coded highlighters, always typing.",           favFood:"anything fast",  hobby:"studying",      personality:"driven",      relationship:20, triggeredEvents:[], mood:"stressed" },
  { id:8,  name:"Maya",     archetype:"quiet",        age:18, bodyType:"pear",      lbs:130, startLbs:130, desc:"Oversized sweater, back row, notebook full of drawings.",          favFood:"pastries",       hobby:"journaling",    personality:"observant",   relationship:20, triggeredEvents:[], mood:"content" },
  { id:9,  name:"Chloe",    archetype:"transfer",     age:20, bodyType:"apple",     lbs:135, startLbs:135, desc:"Wide-eyed, campus map in hand, tries everything once.",            favFood:"local foods",    hobby:"exploring",     personality:"curious",     relationship:20, triggeredEvents:[], mood:"curious" },
  { id:10, name:"Jasmine",  archetype:"cheerleader",  age:19, bodyType:"hourglass", lbs:123, startLbs:123, desc:"Co-captain, impossibly coordinated, laughs at full volume.",       favFood:"smoothies",      hobby:"dance",         personality:"energetic",   relationship:20, triggeredEvents:[], mood:"happy" },
  { id:11, name:"Emma",     archetype:"bookworm",     age:22, bodyType:"straight",  lbs:119, startLbs:119, desc:"PhD aspirations, book always open, tea always in hand.",           favFood:"tea cakes",      hobby:"writing",       personality:"gentle",      relationship:20, triggeredEvents:[], mood:"focused" },
  { id:12, name:"Roxanne",  archetype:"artsy",        age:21, bodyType:"pear",      lbs:138, startLbs:138, desc:"Shaved side of head, band shirts, strong opinions always.",        favFood:"street tacos",   hobby:"music",         personality:"passionate",  relationship:20, triggeredEvents:[], mood:"excited" },
  { id:13, name:"Aaliyah",  archetype:"athlete",      age:20, bodyType:"athletic",  lbs:140, startLbs:140, desc:"Basketball player, easy loud laugh, owns every room she enters.", favFood:"burgers",        hobby:"basketball",    personality:"easygoing",   relationship:20, triggeredEvents:[], mood:"happy" },
  { id:14, name:"Sophie",   archetype:"sorority",     age:18, bodyType:"straight",  lbs:113, startLbs:113, desc:"Fresh freshman, just pledged, a little overwhelmed.",              favFood:"cupcakes",       hobby:"socialising",   personality:"sweet",       relationship:20, triggeredEvents:[], mood:"nervous" },
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
  const [hovered,setHovered]=useState(null);
  const [skillCat,setSkillCat]=useState("environment");
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

  // Process event queue
  useEffect(()=>{
    if(eventQueue.length>0 && !activeEvent){
      setActiveEvent(eventQueue[0]);
      setEventQueue(prev=>prev.slice(1));
    }
  },[eventQueue,activeEvent]);

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
        if(other && getStage(other.lbs).id>=2) bonusInfluence+=Math.floor(gain*0.15);
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
      mood: newStageId>=4?"content":s.mood,
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

  const doSingle=(action,s)=>{
    if(ap<action.cost){push("⚠️ Not enough AP!");return;}
    if(action.id==="restaurant"){ startDinner(s); return; }
    if(action.id==="observe"){
      const stId=getStage(s.lbs).id;
      const lines=[
        `You spend the day quietly observing ${s.name}.\n\nMorning: ${stId<=2?"She arrives to class on time, finding a seat easily.":"She arrives a little breathless, taking her time settling into her reinforced seat."}\n\nLunch: ${stId<=1?"A modest meal at the dining hall.":stId<=4?"Two full plates and dessert at the dining hall.":"An enormous spread — she's clearly a dining hall regular. Staff greet her by name."}\n\nAfternoon: ${stId<=3?"She moves through campus normally.":"She moves slowly, deliberately, each step carrying real weight."}\n\nEvening: ${stId<=2?"A quiet night, some snacking.":"Delivery arrives at her dorm. Multiple bags. She tips well."}\n\nCurrent weight: ${s.lbs} lbs. Stage: ${getStage(s.lbs).label}.`,
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
    const updated=students.map(s=>{
      const gain=rnd(action.gain[0],action.gain[1]);
      return processStudentGain(s,gain,7);
    });
    const evs=collectEvents(updated);
    setStudents(updated);
    push(`🎉 ${action.label}: The whole class participated!`);
    if(evs.length){
      setGlobalStats(g=>({...g,narrativeCount:g.narrativeCount+evs.length}));
      setEventQueue(prev=>[...prev,...evs]);
    }
  };

  const doTalk=(topicId,s)=>{
    const topic=TALK_RESPONSES[topicId];
    if(!topic){push(`💬 ${s.name} smiles politely.`);return;}
    const stId=getStage(s.lbs).id;
    const resp=topic(s,stId);
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
      if(s.id===gossip.targetId) return {...s, gainMultiplier:(s.gainMultiplier||1)*gossip.helpMultiplier};
      if(s.id===gossip.speakerId) return {...s, relationship:Math.min(100,s.relationship+8)};
      return s;
    }));
  };



  const unlockSkill=(sk)=>{
    if(!canUnlock(sk)) return;
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

  const startDinner=(s)=>{
    if(!dinnerUnlocked){push("⚠️ Unlock 'Dining Connections' in the Skill Tree first.");return;}
    if(ap<2){push("⚠️ Need 2 AP for a dinner.");return;}
    setDinnerEvent({ student:s, phase:"venue", venue:null, dishes:[], conversationUsed:[], totalGain:0 });
    setDinnerLog([]);
  };

  const chooseDinnerVenue=(venue)=>{
    setDinnerEvent(prev=>({...prev, venue, phase:"dishes"}));
    setDinnerLog(dl=>[...dl, `You arrive at ${venue.label}. ${venue.desc}`]);
    push(`🍽️ Dinner with ${dinnerEvent.student.name} at ${venue.label}.`);
  };

  const orderDish=(dish)=>{
    const gain=rnd(dish.gain[0],dish.gain[1]);
    const scaledGain=Math.round(gain*skillGainMult*(dinnerEvent.student.gainMultiplier||1));
    setDinnerEvent(prev=>({...prev, dishes:[...prev.dishes,dish.id], totalGain:prev.totalGain+scaledGain}));
    setDinnerLog(dl=>[...dl, `🍴 You order the ${dish.label}. ${dish.desc} (+${scaledGain} lbs)`]);
    push(`🍴 ${dinnerEvent.student.name}: ${dish.label} (+${scaledGain} lbs)`);
    setStudents(prev=>prev.map(s=>s.id!==dinnerEvent.student.id?s:{...s,lbs:s.lbs+scaledGain}));
  };

  const useDinnerConversation=(conv)=>{
    if(dinnerEvent.conversationUsed.includes(conv.id)) return;
    const s=students.find(st=>st.id===dinnerEvent.student.id)||dinnerEvent.student;
    const stId=getStage(s.lbs).id;
    const gainBonus=rnd(conv.gainBonus[0],conv.gainBonus[1]);
    const scaledBonus=Math.round(gainBonus*skillGainMult*(s.gainMultiplier||1));
    const convText=conv.text(s,stId);
    setDinnerLog(dl=>[...dl, `💬 ${convText}${scaledBonus>0?` (+${scaledBonus} lbs)`:""}` ]);
    push(`💬 Dinner conversation: ${conv.label}`);
    setDinnerEvent(prev=>({...prev, conversationUsed:[...prev.conversationUsed,conv.id], totalGain:prev.totalGain+scaledBonus}));
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,lbs:st.lbs+scaledBonus,relationship:Math.min(100,st.relationship+conv.relBonus)}));
  };

  const finishDinner=()=>{
    const s=students.find(st=>st.id===dinnerEvent.student.id);
    setAp(a=>a-2);
    push(`✅ Dinner with ${dinnerEvent.student.name} complete. Total: +${dinnerEvent.totalGain} lbs gained.`);
    const ns=processStudentGain(s,0,15);
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,relationship:Math.min(100,st.relationship+15)}));
    const evs=collectEvents([{...s,lbs:s.lbs}]);
    if(evs.length){ setGlobalStats(g=>({...g,narrativeCount:g.narrativeCount+evs.length})); setEventQueue(prev=>[...prev,...evs]); }
    setDinnerEvent(null);
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
  const availableVenues=DINNER_VENUES.filter(v=>{
    if(v.id==="home_dinner") return unlockedSkills.includes("dinner_residence");
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

{/* DINNER EVENT MODAL */}
      {dinnerEvent&&(()=>{
        const ds=students.find(s=>s.id===dinnerEvent.student.id)||dinnerEvent.student;
        const stId=getStage(ds.lbs).id;
        return(
          <div style={C.overlay}>
            <div style={{...C.modal,maxWidth:620}}>
              {/* Header */}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                <div>
                  <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:3}}>DINNER OUT</div>
                  <h2 style={{margin:0,color:"#c898ff",fontSize:20}}>Dinner with {ds.name}</h2>
                  <div style={{fontSize:11,color:"#5a309a",marginTop:3}}>{ds.lbs} lbs · {getStage(ds.lbs).label} · ❤ {ds.relationship}%</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:13,color:"#f0a060",fontWeight:700}}>+{dinnerEvent.totalGain} lbs so far</div>
                  <div style={{fontSize:10,color:"#5a4070",marginTop:3}}>{dinnerEvent.dishes.length} dishes ordered</div>
                </div>
              </div>

              {/* PHASE: VENUE SELECTION */}
              {dinnerEvent.phase==="venue"&&(
                <div>
                  <div style={{fontSize:12,color:"#9070c0",marginBottom:12,fontStyle:"italic"}}>
                    Where would you like to take {ds.name} tonight?
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                    {availableVenues.map(v=>(
                      <div key={v.id} style={{...C.card,cursor:"pointer"}} onClick={()=>chooseDinnerVenue(v)}>
                        <div style={{fontWeight:700,fontSize:13,color:"#d8a8ff",marginBottom:3}}>{v.label}</div>
                        <div style={{fontSize:11,color:"#6a4888",lineHeight:1.4,marginBottom:5}}>{v.desc}</div>
                        <div style={{fontSize:10,color:"#7a5040"}}>{v.baseCourses} base courses · +{v.gainRange[0]}–{v.gainRange[1]} lbs est.</div>
                      </div>
                    ))}
                  </div>
                  <button style={{...C.btn("#444"),marginTop:12}} onClick={()=>setDinnerEvent(null)}>Cancel</button>
                </div>
              )}

              {/* PHASE: DINING */}
              {dinnerEvent.phase==="dishes"&&dinnerEvent.venue&&(
                <div>
                  <div style={{fontSize:11,color:"#7a5090",marginBottom:12,fontStyle:"italic"}}>
                    You're at {dinnerEvent.venue.label}. {dinnerEvent.venue.desc}
                  </div>

                  {/* Order dishes */}
                  <div style={{...C.secT,marginBottom:8}}>Order Dishes</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:14}}>
                    {dinnerEvent.venue.dishes.map(dish=>{
                      const alreadyOrdered=dinnerEvent.dishes.filter(d=>d===dish.id).length;
                      return(
                        <div key={dish.id} style={{...C.card,cursor:"pointer",border:`1px solid ${alreadyOrdered?"#408040":"#180830"}`}} onClick={()=>orderDish(dish)}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                            <span style={{fontWeight:700,fontSize:12,color:"#d8a8ff"}}>{dish.label}</span>
                            <span style={{fontSize:10,color:"#a07050"}}>+{dish.gain[0]}–{dish.gain[1]} lbs</span>
                          </div>
                          <div style={{fontSize:10,color:"#6a4870",lineHeight:1.4,marginTop:3}}>{dish.desc}</div>
                          {alreadyOrdered>0&&<div style={{fontSize:9,color:"#60a060",marginTop:3}}>Ordered ×{alreadyOrdered}</div>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Conversation options */}
                  <div style={{...C.secT,marginBottom:8}}>Conversation</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:14}}>
                    {DINNER_CONVERSATION
                      .filter(conv=>!conv.requires||hasSkill(conv.requires))
                      .map(conv=>{
                        const used=dinnerEvent.conversationUsed.includes(conv.id);
                        return(
                          <button key={conv.id} style={{...C.smBtn,opacity:used?0.4:1,textDecoration:used?"line-through":"none"}}
                            onClick={()=>!used&&useDinnerConversation(conv,ds,stId)}>
                            {conv.label}
                          </button>
                        );
                      })}
                  </div>

                  {/* Dinner dialogue feed */}
                  <div style={{background:"rgba(20,5,35,0.8)",border:"1px solid #2a0848",borderRadius:8,padding:10,marginBottom:12,maxHeight:180,overflowY:"auto",display:"flex",flexDirection:"column",gap:4}}>
                    {dinnerLog.length===0
                      ?<div style={{fontSize:12,color:"#5a3070",fontStyle:"italic"}}>{ds.name} looks at the menu with obvious interest.</div>
                      :dinnerLog.map((line,i)=>(
                        <div key={i} style={{fontSize:12,color:line.startsWith("💬")?"#e8d0a8":line.startsWith("🍴")?"#d0a860":"#b090c8",lineHeight:1.65,borderBottom:i<dinnerLog.length-1?"1px solid rgba(80,20,120,0.15)":"none",paddingBottom:i<dinnerLog.length-1?4:0}}>
                          {line}
                        </div>
                      ))
                    }
                  </div>
                  <div style={{fontSize:11,color:"#f0a060",fontWeight:700,marginBottom:10,textAlign:"right"}}>
                    +{dinnerEvent.totalGain} lbs · {dinnerEvent.dishes.length} dishes · {dinnerEvent.conversationUsed.length} conversations
                  </div>

                  <div style={{display:"flex",gap:8}}>
                    <button style={C.btn("#2a7830")} onClick={finishDinner}>
                      End Evening (+15 relationship)
                    </button>
                    <button style={C.btn("#444")} onClick={()=>setDinnerEvent(null)}>
                      Leave Early (no relationship bonus)
                    </button>
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
          {[["AP",ap,"#e0a8ff"],["Wk",week,"#e0a8ff"],["Σ+",`${totalGained}lb`,"#f0b060"],["Skills",unlockedSkills.length,"#a0e0b0"]].map(([l,v,c])=>(
            <div key={l} style={{textAlign:"center",background:"rgba(80,18,140,0.3)",borderRadius:6,padding:"2px 11px"}}>
              <span style={{fontSize:17,fontWeight:700,color:c,display:"block"}}>{l==="Wk"?`Wk ${v}`:v}</span>
              <span style={{fontSize:9,color:"#60389a",letterSpacing:2}}>{l==="Wk"?"WEEK":l==="AP"?"ACTION PTS":"TOTAL GAIN"}</span>
            </div>
          ))}
          <button onClick={advanceWeek} style={C.btn("#186028")}>⏩ Next Week (+5 AP)</button>
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
                      <div style={{fontSize:10,color:"#70508a",marginBottom:3}}>{s.archetype} · {s.bodyType} · {s.age}y · <MoodBadge mood={s.mood}/></div>
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
                  <div style={{fontSize:11,color:"#70509a",marginBottom:8}}>{s.archetype} · age {s.age} · {s.bodyType} body · fav: {s.favFood} · hobby: {s.hobby}</div>

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
                        const canHelp=g.offerHelp && s.relationship>=65 && !hasMultiplier;
                        const almostUnlocked=g.offerHelp && s.relationship>=50 && s.relationship<65 && !hasMultiplier;
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
                            {hasMultiplier&&(
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
                            {g.offerHelp && s.relationship<50 && !hasMultiplier&&(
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
                  {ACTIONS_SINGLE.map(a=>(
                    <div key={a.id} style={{...C.card,opacity:ap<a.cost?0.35:1}} onClick={()=>doSingle(a,s)}>
                      <div style={{fontWeight:700,fontSize:12,color:"#c090e8",marginBottom:2}}>{a.label}</div>
                      <div style={{fontSize:10,color:"#5a3888",lineHeight:1.4,marginBottom:4}}>{a.desc}</div>
                      <div style={{display:"flex",justifyContent:"space-between"}}>
                        <span style={{fontSize:10,color:"#e07030"}}>{a.cost} AP</span>
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
                {ACTIONS_CLASS.map(a=>(
                  <div key={a.id} style={{...C.card,opacity:ap<a.cost?0.35:1}}>
                    <div style={{fontWeight:700,color:"#c090e8",marginBottom:3}}>{a.label}</div>
                    <div style={{fontSize:11,color:"#5a3888",marginBottom:8,lineHeight:1.4}}>{a.desc}</div>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                      <span style={{fontSize:11,color:"#e07030"}}>{a.cost} AP</span>
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
                  <p style={{...C.secT,margin:"0 0 10px"}}>Classroom Upgrades · {totalGained} lbs gained</p>
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
                            onClick={()=>available&&unlockSkill(sk)}
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
                            ? <button style={{...C.btn("#5020a0"),width:"100%"}} onClick={()=>unlockSkill(sk)}>Unlock — {sk.cost} lbs gained</button>
                            : !reqsMet
                            ? <div style={{fontSize:10,color:"#4a2050"}}>Unlock prerequisites first.</div>
                            : <div style={{fontSize:10,color:"#4a2050"}}>Need {sk.cost-totalGained} more lbs gained.</div>
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
                        ?<div style={{fontSize:10,color:"#3a2050"}}>None yet. Gain lbs to unlock Tier 1 ({Math.max(0,50-totalGained)} lbs away).</div>
                        :<div style={{display:"flex",flexDirection:"column",gap:5}}>
                          {skillPassiveBonus>0&&<div style={{fontSize:11,color:"#80e080"}}>+{skillPassiveBonus} passive lbs/week</div>}
                          {skillApBonus>0&&<div style={{fontSize:11,color:"#80a0e0"}}>+{skillApBonus} AP/week (max 20)</div>}
                          {skillGainMult>1&&<div style={{fontSize:11,color:"#e0a060"}}>×{skillGainMult.toFixed(2)} all gain multiplier</div>}
                          {dinnerUnlocked&&<div style={{fontSize:11,color:"#c080f0"}}>🍽️ Dinner events active</div>}
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
