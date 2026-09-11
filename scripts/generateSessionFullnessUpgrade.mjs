// Unique extras for session.fullness.*._f* fragments. Preserve glue/prefix.
// Run: node scripts/generateSessionFullnessUpgrade.mjs
import { writeFileSync } from 'node:fs';
import '../src/textEngine/scenes/session/fullness.js';
import { _registryEntries } from '../src/textEngine/engine.js';

const OUT = 'src/textEngine/scenes/session/fullnessUpgrade.js';

const ARCH_SID = {
  cheerleader: 0,
  bookworm: 1,
  influencer: 2,
  athlete: 3,
  artsy: 4,
  gamer: 5,
  sorority: 6,
  overachiever: 7,
  quiet: 8,
  transfer: 9,
};

const DEFAULT_SID = [10, 11, 12, 13, 14, 15, 16, 17, 18];

/** Unique leaf extras: key suffix → { generic[], person: {id: text} } */
const LEAF = {
  'default.f0._f1': {
    generic: [
      '{subject.name} starts easy, fork light, like the plate is still a suggestion.',
      'First bites land without argument. She has room and she knows it.',
    ],
    person: {
      10: 'Reneé tastes first, then commits. The plate is a recipe she intends to finish.',
      11: 'Kaylee eats like she is taking care of someone. Tonight the someone is her.',
      12: 'Nadia watches her own first bites the way she watches a subject settle in.',
      13: 'Daisy starts the way she hosts: warm, already planning the next tray.',
      14: 'Mary Jane grins at the spread like harvest already happened.',
      15: 'Lilith takes the first bite without ceremony. Prey can wait. This cannot.',
      16: 'Sophia logs the first bite in her head, then keeps eating anyway.',
      17: 'Indiana treats the plate like a find. She digs in before the map is done.',
      18: 'Talia starts like she is calibrating intake. The fork does not wait for the graph.',
    },
  },
  'default.f1._f1': {
    generic: [
      'Warmth gathers low. She keeps eating like the warmth is the point.',
      'She has been at it long enough for her middle to notice. She does not stop.',
    ],
    person: {
      10: 'Reneé names the richness once, then proves it with another forkful.',
      11: 'Kaylee sighs like comfort arrived on schedule. The plate keeps arriving.',
      12: 'Nadia notes the pace change and files it. The fork files a rebuttal.',
      13: 'Daisy eats like the kitchen is still open and she is the kitchen.',
      14: 'Mary Jane calls it a good sitting. She means the food and the chair.',
      15: 'Lilith eats with the patience of someone who already won.',
      16: 'Sophia tells herself this is still within range. The range moves.',
      17: 'Indiana keeps going like the trail snack turned into a campsite.',
      18: 'Talia watches the curve of her middle rise and calls it expected output.',
    },
  },
  'default.f2._f1': {
    generic: [
      '{subject.name} is full enough to slow and still hungry enough to continue.',
      'She breathes around the plate. The fork keeps its appointment.',
    ],
    person: {
      10: 'Reneé is full and still tasting like the next note matters.',
      11: 'Kaylee presses a palm to her middle and offers herself another bite.',
      12: 'Nadia records the slowdown as data. She eats the data.',
      13: 'Daisy looks stuffed and still hosts the next forkful.',
      14: 'Mary Jane laughs at how tight her waistband got and reaches anyway.',
      15: 'Lilith is full. She treats fullness like seasoning.',
      16: 'Sophia mutters a limit, then revises it with her mouth.',
      17: 'Indiana calls it a heavy pack-out and keeps packing.',
      18: 'Talia adjusts her seat for volume. The experiment continues.',
    },
  },
  'default.f3._f1': {
    generic: [
      'Her belly sits round and sure. She checks it with a hand and returns to the fork.',
      '"I can take more," {subject.name} says, mostly to the plate.',
    ],
    person: {
      10: 'Reneé presses the swell like dough and nods. Proof of work.',
      11: 'Kaylee soothes her own middle the way she soothes everyone. Then another bite.',
      12: 'Nadia studies the taut curve like a result she intended.',
      13: 'Daisy pats the roundness as if tucking it in. It does not stay tucked.',
      14: 'Mary Jane sounds delighted at the tightness. Farm girl, farm appetite.',
      15: 'Lilith rests a dark-nailed hand on the swell and keeps eating.',
      16: 'Sophia stares at the roundness like a failed protocol that feels good.',
      17: 'Indiana slaps the taut curve like a find she means to keep.',
      18: 'Talia measures the dome with a thumb and logs another increment.',
    },
  },
  'default.f4._f1': {
    generic: [
      'She is past comfortable and still working, breaths counted between bites.',
      'The belly occupies her lap. She feeds it like it asked politely.',
    ],
    person: {
      10: 'Reneé is packed and still chasing a last flavor she refuses to miss.',
      11: 'Kaylee looks after the overfull middle and still says yes.',
      12: 'Nadia is past the predicted capacity. She looks fascinated, then hungry.',
      13: 'Daisy is huge with supper and still cutting one more piece.',
      14: 'Mary Jane sits heavy and sunny, fork moving like chores that feel good.',
      15: 'Lilith is taut and unhurried. Fullness is a throne.',
      16: 'Sophia is past the plan and whispering that she can still finish.',
      17: 'Indiana is loaded like a pack mule and grinning about it.',
      18: 'Talia is past the spec and still adding mass to the prototype.',
    },
  },
  'default.f5._f1': {
    generic: [
      '{subject.name} has eaten past ordinary language. The middle is a warm monument.',
      'She finishes the bite she is on and stays seated, hands admiring the swell.',
    ],
    person: {
      10: 'Reneé is a finished service. She still tastes the air like dessert might appear.',
      11: 'Kaylee holds the enormous middle like a patient she loves. "I\'m proud of us."',
      12: 'Nadia is spectacularly packed. She wants the observation to continue.',
      13: 'Daisy is cookie-warm and vast. She thanks the table like it can hear.',
      14: 'Mary Jane is harvest-round and laughing. "Y\'all, I did that."',
      15: 'Lilith is a larder that just closed. She looks pleased. She looks hungry still.',
      16: 'Sophia is past every chart. She sounds wrecked and wanting.',
      17: 'Indiana is camp-stuffed and claiming the whole tent.',
      18: 'Talia is a successful overload. She keeps a hand on the result.',
    },
  },
  'default.f5._f2': {
    generic: [
      '. She sounds impressed with the wreckage and unwilling to apologize.',
      '. The last sound she makes is satisfied, not sorry.',
    ],
    person: {
      10: '. "Yield exceeded," Reneé murmurs, almost fond.',
      11: '. "That\'s enough care for one night," Kaylee says, already eyeing dessert.',
      12: '. Nadia: "Noted. Repeatable."',
      13: '. Daisy sighs like a kitchen after a holiday.',
      14: '. "Save me a chair tomorrow," Mary Jane says, already sitting in this one.',
      15: '. Lilith does not praise the meal. She owns it.',
      16: '. Sophia laughs once, shaky. "I\'m keeping the data."',
      17: '. "Cache full," Indiana says, delighted.',
      18: '. Talia taps the taut curve. "Stable."',
    },
  },

  'cheerleader.f0._f1': {
    generic: [
      '{subject.name} eats like a drill: clean posture, full commit, no leftover excuses.',
      'Captain energy on an empty middle. She treats the plate like a heat she intends to win.',
    ],
    person: {
      0: 'Brittany starts like kickoff. Ponytail set. First bite already a score.',
    },
  },
  'cheerleader.f1._f1': {
    generic: [
      'Talk slows. Cheeks warm. The squad smile stays; the fork gets serious.',
      'She was narrating. Now she is working. The plate has her attention.',
    ],
    person: {
      0: 'Brittany\'s cheer-voice thins out. Eating is the routine now.',
    },
  },
  'cheerleader.f2._f1': {
    generic: [
      'The shirt rides. She tugs it down, then reaches anyway. Commitment looks like this.',
      'She stops pretending the fullness is optional. The next bite is still a yes.',
    ],
    person: {
      0: 'Brittany clocks the tightness and treats it like a scoreboard she likes.',
    },
  },
  'cheerleader.f3._f1': {
    generic: [
      '"Pretty full," {subject.name} says, then finishes the count anyway.',
      'Captain rule: you start a set, you finish the set. The plate is a set.',
    ],
    person: {
      0: '"I\'m full," Brittany announces, competitive even about that. She keeps eating.',
    },
  },
  'cheerleader.f4._f1': {
    generic: [
      'She sits taller to make room that is not there. Another bite lands anyway.',
      'Overfull and still performing the last eight counts with a fork.',
    ],
    person: {
      0: 'Brittany\'s middle is a taut win. She refuses to tap out first.',
    },
  },
  'cheerleader.f5._f1': {
    generic: [
      '{subject.name} parks both hands on the swell, breathes, then picks the fork back up.',
      'She looks stuffed past the uniform and still says she is not done.',
    ],
    person: {
      0: 'Brittany rests on the enormous middle like a victory pose that got heavy.',
    },
  },
  'cheerleader.f5._f2': {
    generic: [
      '. It lands like a chant she intends to keep.',
      '. Captain voice. No timeout.',
    ],
    person: {
      0: '. Brittany: "We finish." She means the plate.',
    },
  },

  'bookworm.f0._f1': {
    generic: [
      '{subject.name} eats the way she reads: line by line, no skimming, no leftover argument.',
      'Book open, plate open. She gives both the same attention.',
    ],
    person: {
      1: 'Madeline annotates nothing yet. The first bites are the abstract.',
    },
  },
  'bookworm.f1._f1': {
    generic: [
      'The book loses. She is eating with the focus she usually saves for a source.',
      'Pages wait. The plate does not. She chooses correctly.',
    ],
    person: {
      1: 'Madeline closes the book with a finger still in it, then forgets the finger.',
    },
  },
  'bookworm.f2._f1': {
    generic: [
      '{subject.name} names the quantity like a finding, then adds another data point.',
      'She documents the meal from the inside. The fork is the instrument.',
    ],
    person: {
      1: '"Non-trivial," Madeline says, already mid-bite. The abstract is getting longer.',
    },
  },
  'bookworm.f3._f1': {
    generic: [
      'She studies the taut middle with scholarly calm and keeps the experiment running.',
      'Fingers on the swell. A small pleased sound. Another bite for the record.',
    ],
    person: {
      1: 'Madeline presses the curve like a bound spine. "Interesting." She eats.',
    },
  },
  'bookworm.f3._f2': {
    generic: [
      '. She means the fullness, not the footnote.',
      '. The next bite is the citation.',
    ],
    person: {
      1: '. Madeline adds, "Replicable." Then replicates.',
    },
  },
  'bookworm.f4._f1': {
    generic: [
      '{subject.name} drops the theory voice. She is simply packed and still curious.',
      'No more justifying. The body is the paper now.',
    ],
    person: {
      1: 'Madeline is past the literature review. She is the result section.',
    },
  },
  'bookworm.f5._f1': {
    generic: [
      'She tips her head back, packed, then reaches again like the conclusion needs one more line.',
      'Capacity revised upward in real time. She sounds delighted to be wrong.',
    ],
    person: {
      1: 'Madeline is monumentally full and still editing the claim with cake.',
    },
  },

  'athlete.f0._f1': {
    generic: [
      '{subject.name} eats like fuel first. Quantity is the training plan.',
      'Fast fork. No ceremony. She is filling the tank on purpose.',
    ],
    person: {
      3: 'Serena treats the plate like a heat she already entered.',
    },
  },
  'athlete.f1._f1': {
    generic: [
      'Breath changes. Not a sprint. She notices and keeps the pace.',
      'Halfway and heavier. She files it under work and continues.',
    ],
    person: {
      3: 'Serena\'s breathing shifts. She eats through it like a second lap.',
    },
  },
  'athlete.f2._f1': {
    generic: [
      '"A lot of food," she says, then clears it like a qualifying time.',
      'She finishes the plate and eyes the next one the way she eyes a finish line.',
    ],
    person: {
      3: 'Serena nods at the empty plate. "Okay." The next plate is the next heat.',
    },
  },
  'athlete.f3._f1': {
    generic: [
      'Fullness sits in her the way a long session used to. She recognizes it and stays.',
      'Heavy, settled, still competitive with the remaining food.',
    ],
    person: {
      3: 'Serena knows this weight. She used to earn it running. She earns it sitting now.',
    },
  },
  'athlete.f4._f1': {
    generic: [
      '{subject.name} is past old limits and treating the rest like the last two hundred meters.',
      'Grim, pleased, packed. She does not DNF a plate.',
    ],
    person: {
      3: 'Serena is overfull and still chasing the last bites like a personal best.',
    },
  },
  'athlete.f5._f1': {
    generic: [
      'She goes still, belly warm and huge, then laughs once at how thoroughly she won.',
      'Done in the way a race is done: spent, glowing, already thinking about next time.',
    ],
    person: {
      3: 'Serena slumps, spectacularly packed. "I get it," she tells you. She does.',
    },
  },

  'influencer.f0._f1': {
    generic: [
      '{subject.name} keeps the camera down. This plate is for the room, not the grid.',
      'Private eating. You are the only audience she wants for this.',
    ],
    person: {
      2: 'Kylie angles nothing. First bites stay off the story on purpose.',
    },
  },
  'influencer.f1._f1': {
    generic: [
      'Eyes close between bites. The pleasure does not need a caption.',
      'She is enjoying it in a way she would never post.',
    ],
    person: {
      2: 'Kylie forgets the brand voice. The food gets the real one.',
    },
  },
  'influencer.f2._f1': {
    generic: [
      '"Don\'t film this," she says, already eating like herself.',
      'No persona. Just a huge plate and a girl who wants it.',
    ],
    person: {
      2: 'Kylie: "Off the record." Then she eats like the record never existed.',
    },
  },
  'influencer.f3._f1': {
    generic: [
      'She looks full and does not hide it. "God, this is good." She means the act.',
      'The feed can wait. The feeding cannot.',
    ],
    person: {
      2: 'Kylie is round and unstyled and grinning. Content later. This now.',
    },
  },
  'influencer.f4._f1': {
    generic: [
      '{subject.name} drops every portion instinct she trained for the lens.',
      'She is simply, hugely, privately eating. No crop. No filter.',
    ],
    person: {
      2: 'Kylie is past the aesthetic. The belly is the whole frame.',
    },
  },
  'influencer.f5._f1': {
    generic: [
      'Sprawled, packed, top riding up, she looks like she found the real brand.',
      'The bloated middle is the only story she wants witnessed tonight.',
    ],
    person: {
      2: 'Kylie is a closed story: taut, huge, camera-down, honest.',
    },
  },
  'influencer.f5._f2': {
    generic: [
      '. She says it like a caption she will never post.',
      '. Private voice. No ring light.',
    ],
    person: {
      2: '. Kylie: "This one stays in the drafts."',
    },
  },

  'gamer.f0._f1': {
    generic: [
      '{subject.name} starts one-handed, the way she always has. Queue can wait.',
      'Efficient first bites. She has been grinding snacks for years; this is a raid.',
    ],
    person: {
      5: 'Destiny queues the plate like a load-in. Hoodie up. Fork already moving.',
    },
  },
  'gamer.f1._f1': {
    generic: [
      'Second hand joins. Multitasking loses. The plate is the only window.',
      'Phone forgotten. Both hands on the food. She looks almost offended by how good it is.',
    ],
    person: {
      5: 'Destiny drops the phone. "Okay. Fine. Main quest."',
    },
  },
  'gamer.f2._f1': {
    generic: [
      'She claims she never eats this much at once while eating this much at once.',
      'The usual graze became a sit-down. She notices. She keeps going.',
    ],
    person: {
      5: 'Destiny: "This is a lot for one sitting." She sits harder.',
    },
  },
  'gamer.f3._f1': {
    generic: [
      'Quiet focus. Boss-fight face. She is not wiping on this plate.',
      'She leans in the way she does on a hard clear. The belly is the score.',
    ],
    person: {
      5: 'Destiny goes mute and precise. She intends to clear the tray.',
    },
  },
  'gamer.f4._f1': {
    generic: [
      '{subject.name} breathes through the packed middle and adjusts against the table.',
      'Round, tight, still clicking through bites like remaining objectives.',
    ],
    person: {
      5: 'Destiny\'s belly meets the desk. She scoots back and keeps farming.',
    },
  },
  'gamer.f5._f1': {
    generic: [
      'She parks a controller on the taut swell and laughs once. New mount.',
      'Packed enough that sitting is the whole game. She looks proud of the save.',
    ],
    person: {
      5: 'Destiny sets the controller on the huge middle. "New setup. Don\'t patch it."',
    },
  },

  'quiet.f0._f1': {
    generic: [
      '{subject.name} eats in the silence she likes. The plate does not need a speech.',
      'Small sounds. Steady bites. She is already in the good quiet.',
    ],
    person: {
      8: 'Maya starts without a word. The first bites are the whole sentence.',
    },
  },
  'quiet.f1._f1': {
    generic: [
      'No commentary. Just the work of eating, done carefully.',
      'She does not fill the air. She fills herself.',
    ],
    person: {
      8: 'Maya keeps her eyes on the plate. You get a glance. She returns to the food.',
    },
  },
  'quiet.f2._f1': {
    generic: [
      'A hand finds the middle, feels, stays a second, returns to the fork.',
      'She checks the warmth the way she checks a drawing: once, honestly.',
    ],
    person: {
      8: 'Maya\'s palm rests on the swell. She nods once. Continues.',
    },
  },
  'quiet.f3._f1': {
    generic: [
      '"I\'m full," she says, soft. Then, softer: "More?" She means you should keep going.',
      'The question is small. The appetite is not.',
    ],
    person: {
      8: 'Maya: "Full." A beat. She pushes the plate an inch closer to you.',
    },
  },
  'quiet.f4._f1': {
    generic: [
      'Overfull and unhurried. She trusts you to read the pauses that are not stops.',
      'Slow bites. Long quiet. She stays in it with you.',
    ],
    person: {
      8: 'Maya is packed and still. When she lifts the fork, it is a yes.',
    },
  },
  'quiet.f5._f1': {
    generic: [
      '{subject.name} holds the round middle in both hands and lets the silence thank you.',
      'She is enormous with the meal and completely at ease. One word later: thanks.',
    ],
    person: {
      8: 'Maya sits with the vast belly and your company. "Thank you." She means stay.',
    },
  },

  'sorority.f0._f1': {
    generic: [
      '{subject.name} eats like the table is a function she already RSVP\'d to.',
      'Host energy. First bites land like the party started on time.',
    ],
    person: {
      6: 'Tiffany starts the way she hosts: smiling, plating herself first.',
    },
  },
  'sorority.f1._f1': {
    generic: [
      'She reviews every bite out loud. Every review is a yes.',
      'Commentary and chewing share a chair. Both are having a good time.',
    ],
    person: {
      6: 'Tiffany rates the dish between swallows. Chapter minutes will be delicious.',
    },
  },
  'sorority.f2._f1': {
    generic: [
      '"This is a lot," she says, delighted, and proves it again.',
      'She repeats how much it is while making it more.',
    ],
    person: {
      6: 'Tiffany: "Genuinely a lot." Bite. "Genuinely amazing." Bite.',
    },
  },
  'sorority.f3._f1': {
    generic: [
      'Waistband loses. She pops the button like a house rule and sighs relief.',
      'The roundness shows. She announces it like good news.',
    ],
    person: {
      6: 'Tiffany undoes the button mid-sentence. "So much better. Pass that."',
    },
  },
  'sorority.f4._f1': {
    generic: [
      '{subject.name} is committed. She pats the huge middle between bites like a guest she likes.',
      'Round, social, still talking to the food as if it can hear the compliment.',
    ],
    person: {
      6: 'Tiffany checks in with the taut belly the way she checks on a sister.',
    },
  },
  'sorority.f5._f1': {
    generic: [
      'Everything gone. Both hands on the vast swell. She calls it her best night.',
      'She is huge with it and grinning like the chapter just won something.',
    ],
    person: {
      6: 'Tiffany: "Best mixer all year." She means the packed middle.',
    },
  },

  'artsy.f0._f1': {
    generic: [
      '{subject.name} eats like she is looking. Each bite gets the attention of a study.',
      'Slow, sensory, already collecting the feeling for later.',
    ],
    person: {
      4: 'Fiona tastes like she is mixing a color. First bites stay on the tongue.',
    },
  },
  'artsy.f1._f1': {
    generic: [
      'She goes quiet the way she does in front of a good piece. The plate is the piece.',
      'Absorption. Warmth. She lets the sensation finish before the next bite.',
    ],
    person: {
      4: 'Fiona\'s eyes unfocus. Eating became the studio hour.',
    },
  },
  'artsy.f2._f1': {
    generic: [
      '"This is very good," she says, meaning the hour as much as the flavor.',
      'She keeps eating like the composition is not finished.',
    ],
    person: {
      4: 'Fiona: "The richness is doing something." She lets it keep doing it.',
    },
  },
  'artsy.f3._f1': {
    generic: [
      'A hand rests on the soft round middle like a subject she might paint later.',
      'One hand on the swell. One hand still feeding the swell.',
    ],
    person: {
      4: 'Fiona palms the curve, considering light. Then she takes another bite.',
    },
  },
  'artsy.f4._f1': {
    generic: [
      '{subject.name} eats overfull with interior focus, like she is living inside a texture.',
      'Packed and studying the packedness. She does not want the sitting to end.',
    ],
    person: {
      4: 'Fiona is inside the feeling and refusing to leave the studio.',
    },
  },
  'artsy.f5._f1': {
    generic: [
      'Stillness after. Both hands on the enormous middle. She wants to keep this exact weight.',
      'She names the feeling, not the body. The body is already the painting.',
    ],
    person: {
      4: 'Fiona: "I want this on canvas." She means the taut, finished fullness.',
    },
  },

  'overachiever.f0._f1': {
    generic: [
      '{subject.name} has a list. She is eating the list in order and already revising it.',
      'Macros noted. Appetite ignored the notes. She proceeds anyway.',
    ],
    person: {
      7: 'Priya starts with a plan. The first plate is already a schedule slip.',
    },
  },
  'overachiever.f1._f1': {
    generic: [
      'The list dies. She rebrands the rest as self-care and commits.',
      'She is just eating now. She will footnote it later.',
    ],
    person: {
      7: 'Priya files the extra bites under optional. The file is already lying.',
    },
  },
  'overachiever.f2._f1': {
    generic: [
      'She announces she is over target, then raises the target.',
      'Gold-star girl, gold-star portion, gold-star second portion.',
    ],
    person: {
      7: 'Priya: "Adjusting the target." The fork adjusts it for her.',
    },
  },
  'overachiever.f3._f1': {
    generic: [
      'Full enough to alarm last semester\'s version of her. She updates the rubric.',
      'She checks in, upgrades what she can handle, and continues the assignment.',
    ],
    person: {
      7: 'Priya is past the old rubric and grading on a curve she wrote tonight.',
    },
  },
  'overachiever.f4._f1': {
    generic: [
      '{subject.name} is overfull by every metric she still remembers. She waived them.',
      'The metrics do not apply. She decided. The belly agreed.',
    ],
    person: {
      7: 'Priya waives the cap. Packed, precise, still reaching.',
    },
  },
  'overachiever.f5._f1': {
    generic: [
      'Hands on the vast tight middle. She calls it a record and means it.',
      'She is a completed extra-credit project that still wants one more point.',
    ],
    person: {
      7: 'Priya: "Personal record." She sounds like she wants to defend the title.',
    },
  },

  'transfer.f0._f1': {
    generic: [
      '{subject.name} eats like campus just handed her a secret she intends to keep.',
      'First bites land with the pleasure of a girl who found better portions.',
    ],
    person: {
      9: 'Chloé starts with scandalized delight. American plates. She was warned.',
    },
  },
  'transfer.f1._f1': {
    generic: [
      'She compares it to home and then takes a larger bite to finish the comparison.',
      'Home had food. This is something else. She keeps proving the difference.',
    ],
    person: {
      9: 'Chloé: "We did not have this." She means the size. She sounds grateful.',
    },
  },
  'transfer.f2._f1': {
    generic: [
      'Full already, still going, treating the new country like a second helping.',
      'She approaches the rest the way she approached transfer: thoroughly.',
    ],
    person: {
      9: 'Chloé is full and still saying oui with her fork.',
    },
  },
  'transfer.f3._f1': {
    generic: [
      'She pats the round middle, pleased. The transfer is working.',
      'Soft, happy, already calling this place better than the brochure.',
    ],
    person: {
      9: 'Chloé pats the swell. "I am so glad I came." She means the plate too.',
    },
  },
  'transfer.f4._f1': {
    generic: [
      '{subject.name} is seriously packed and still touring the remaining food.',
      'She will not miss a course. The exchange program is the remaining food.',
    ],
    person: {
      9: 'Chloé is impressively full and refusing to waste a single American inch.',
    },
  },
  'transfer.f5._f1': {
    generic: [
      'Enormous, happy, calling it home. She might mean the chair. She might mean the body.',
      'She is huge with the meal and settled like the visa just got extended.',
    ],
    person: {
      9: 'Chloé is home in the taut middle. "Oui," she tells the empty plate.',
    },
  },
};

function suffixOf(key) {
  return key.replace(/^session\.fullness\./, '');
}

function firstText(variants) {
  for (const v of variants) {
    const arr = Array.isArray(v.text) ? v.text : [v.text];
    for (const t of arr) if (typeof t === 'string' && t.trim()) return t;
  }
  return '';
}

function prefixOf(text) {
  const m = String(text).match(/^(\.(?:\s+)?)/);
  return m ? m[1] : '';
}

function trim200(s) {
  return [...s].length > 198 ? s.slice(0, 188).replace(/\s+\S*$/, '') : s;
}

function withPrefix(sample, line) {
  const prefix = prefixOf(sample);
  if (!prefix) return trim200(line);
  if (line.startsWith('.')) return trim200(line);
  return trim200(`${prefix}${line.replace(/^\s+/, '')}`);
}

const keys = _registryEntries()
  .map(([k, v]) => [k, v])
  .filter(([k]) => k.startsWith('session.fullness.') && k.includes('._f'));

const lines = [
  '// The Squad — Lead: A1 Mobile | Support: A5 Editor, A6 Slender',
  '// Auto-generated — run: node scripts/generateSessionFullnessUpgrade.mjs',
  "import { registerModuleVariants } from '../../engine.js';",
  '',
];

const seen = new Set();
let n = 0;
for (const [key, variants] of keys) {
  const sample = firstText(variants);
  const suf = suffixOf(key);
  const spec = LEAF[suf];
  if (!spec) {
    console.warn(`missing leaf spec: ${suf}`);
    continue;
  }
  const arch = suf.split('.')[0];
  const extras = [];

  for (const g of spec.generic || []) {
    const t = withPrefix(sample, g);
    if (!seen.has(t)) {
      seen.add(t);
      extras.push({ when: {}, weight: 5, text: [t] });
    }
  }

  const sid = ARCH_SID[arch];
  if (sid != null && spec.person?.[sid]) {
    const t = withPrefix(sample, spec.person[sid]);
    if (!seen.has(t)) {
      seen.add(t);
      extras.push({ when: { studentId: sid }, weight: 8, text: [t] });
    }
  }

  if (arch === 'default') {
    for (const id of DEFAULT_SID) {
      const raw = spec.person?.[id];
      if (!raw) continue;
      const t = withPrefix(sample, raw);
      if (seen.has(t)) continue;
      seen.add(t);
      extras.push({ when: { studentId: id }, weight: 8, text: [t] });
    }
  }

  if (!extras.length) continue;
  const body = extras
    .map((e) => `  { when: ${JSON.stringify(e.when)}, weight: ${e.weight}, text: ${JSON.stringify(e.text)} }`)
    .join(',\n');
  lines.push(`registerModuleVariants(${JSON.stringify(key)}, [\n${body}\n]);`);
  n += 1;
}

writeFileSync(OUT, `${lines.join('\n')}\n`);
console.log(`generateSessionFullnessUpgrade: ${n} pools → ${OUT}`);
