// STAGE REACTIONS PART 2 — gamer, sorority, overachiever, quiet, transfer
const STAGE_REACTIONS_PART2 = {
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
};
