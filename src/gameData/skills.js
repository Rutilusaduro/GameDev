export const SKILL_TREE = [

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
    effect:"All talk actions give +2 bonus relationship.",
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

export const SKILL_CATEGORIES = {
  environment: { label:"🏛️ Environment", color:"#204060" },
  feeding:     { label:"🍽️ Feeding",     color:"#402010" },
  efficiency:  { label:"⚡ Efficiency",  color:"#302050" },
  social:      { label:"❤️ Social",      color:"#401030" },
  psychology:  { label:"🧠 Psychology",  color:"#205040" },
  prestige:    { label:"✨ Prestige",    color:"#504010" },
};

export const EVOLVED_SKILL_TREES = {
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
  homestead_queen:[
    { id:"hq_mae_recipes",  tier:1, label:"Mae's Recipes",      cost:20,  desc:"Unlocked private session dishes give +3 extra lbs each use.",                activityGainBonus:3 },
    { id:"hq_cast_iron",    tier:2, label:"Cast Iron Collection",cost:40,  desc:"+1 passive lbs/week. The homestead is always producing.",                    passiveBonus:1 },
    { id:"hq_weekly_call",  tier:3, label:"Weekly Call",        cost:70,  desc:"+4 relationship per activity. Mae vouches for everything.",                   activityRelBonus:4 },
    { id:"hq_care_package", tier:4, label:"Monthly Care Package",cost:110, desc:"Scrutiny -2/week. Mae's involvement gives the whole situation respectability.", weeklyScrutinyReduce:2 },
    { id:"hq_harvest",      tier:5, label:"The Harvest",        cost:160, desc:"+2 passive, +6 lbs/activity, +4 rel/activity. The homestead is complete.",   passiveBonus:2, activityGainBonus:6, activityRelBonus:4 },
  ],
  state_fair_queen:[
    { id:"sfq_circuit",     tier:1, label:"On the Circuit",     cost:20,  desc:"Activity gives +3 extra lbs. Competition training keeps her growing.",       activityGainBonus:3 },
    { id:"sfq_darcy",       tier:2, label:"Darcy's Respect",    cost:40,  desc:"+4 relationship per activity. The circuit knows her name now.",               activityRelBonus:4 },
    { id:"sfq_scale",       tier:3, label:"The Scale Knows",    cost:70,  desc:"+1 passive lbs/week. The weigh-in schedule keeps her honest.",                passiveBonus:1 },
    { id:"sfq_press",       tier:4, label:"Press Coverage",     cost:110, desc:"Scrutiny -3/week. State champion status is a shield.",                       weeklyScrutinyReduce:3 },
    { id:"sfq_legend",      tier:5, label:"Fair Legend",        cost:160, desc:"+2 passive, +5 lbs/activity, scrutiny -2/week. She is the fair.",             passiveBonus:2, activityGainBonus:5, weeklyScrutinyReduce:2 },
  ],
};
