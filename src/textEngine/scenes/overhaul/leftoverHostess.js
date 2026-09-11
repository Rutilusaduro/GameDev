// The Squad — Lead: A5 Editor | Support: A2 Psych
// Last-wins chapter-hostess hangouts and feast-prep tier cards.
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { HOSTESS_HANGOUTS, MENU_TIERS, ATMOSPHERE_TIERS, GUEST_TIERS } from '../../../gameData/chapterHostess.js';

function three(arr) {
  const list = (arr || []).filter(Boolean);
  const pad = [
    'The extra of the feast answers the upgrade.',
    'The chapter keeps the habit.',
    'She notices with her appetite first.',
  ];
  for (const line of pad) {
    if (list.length >= 3) break;
    if (!list.includes(line)) list.push(line);
  }
  return list.slice(0, 6);
}

function pool(key, texts) {
  registerPool(key, [{ when: {}, text: three(texts) }]);
}

const INTRO = {
  kylie: [
    ['Kylie catches you between rounds. She already knows about the feast. "How many people? Because I have thoughts."', 'She falls in step with a list already open. Guest math. She wants a number from you.', 'The feast is public in her head. She wants the guest list to be a system, not a maybe.'],
    ['Dashboard on her phone. Reach estimates. Color-coded Greek Row. "Controlled expansion. One other house. See how it lands."', 'She shows the map of contacts like a play. "Every wide event started small. Trust the first extra house."', 'Kylie wants width with a leash. One neighboring chapter. A test sitting.'],
    ['"Former chapter president in the city. Six years out. She still answers chapter mail." Contact already pulled.', 'Alumni name, already highlighted. Kylie looks at you like send is a formality.', 'She has the email half-drafted. "She will come if we ask like we mean the food."'],
    ['Camille in the directory. "She knows people. A lot of people." Phone slid over. Sixty names.', 'Kylie found Camille\'s list. Sixty. She wants to use it personally, handwritten subjects.', 'The table could hold Camille\'s network. Kylie is already scrolling like an invitation.'],
    ['Kylie goes quiet, which is rare. "I want actual reach. Not just Greek Row. How far do you want to go?"', 'She has been waiting for permission to go wide. The draft has been sitting for months.', 'Campus as a guest list. She looks at you like the next post is already written.'],
    ['"I want to post it. Open invite. My platforms, the chapter account, the aggregators." Waiting for a yes.', 'Prime window talk. She wants the blast. She wants you to say post it.', 'The feast as a public extra. Kylie is ready to make the whole campus a plus-one.'],
  ],
  renee: [
    ['Reneé puts a plate down without explaining. "Tell me what is missing."', 'Chapter kitchen. A taste. She wants your mouth before she wants your praise.', 'Small plate, big question. She already knows. She wants to hear you say acid.'],
    ['"I found a local chef. Private events. Two weeks of talk." She shows the drafted menu. It is good.', 'Sourcing as courtship. She wants a feast, not a catering job. She wants you to hear the difference.', 'Menu on her phone. Local. Generous. She is already halfway to confirming.'],
    ['Three courses on paper. "A feast should feel like a meal. Not a party." She waits for you to add something or to trust her.', 'She has been holding this menu. Careful courses. She wants it to be dinner with witnesses.', 'The paper is tidy. The hunger under it is not. She wants a soup or a yes.'],
    ['Five courses. Arrows between flavors. Circled ingredients. "I want a meal they remember."', 'Build on the page. She has been drawing how the extra arrives course by course.', 'The draft is a climb. She wants wine notes or bread in the margin. Both are extra.'],
    ['Different quiet. "I want to cater it myself. My menu. I have been building toward this since freshman year."', 'She has had the tasting list for months. She needs you to say yes before she opens the phone.', 'Full service. Her food. The feast as her extra. She is done hiding the draft.'],
    ['Kitchen already running. Six in the morning. Culinary recruits beside her. "Out. Come back when it is time to eat."', 'She wants the door closed. The smell will do the inviting. You are in the way of heat.', 'Prep cooks, her tempo. The extra is already in the pots. She wants you as guest, not help. Unless you fill water.'],
  ],
  fiona: [
    ['Fiona walks the dining room in silence. Then: "The space can do more. It needs to be asked correctly."', 'She looks at chairs like they are in the wrong conversation. The room is a draft.', 'Atmosphere as appetite. She wants layout, not decoration talk. Yet.'],
    ['White linen. Six tapers. "Foundations. Cloth and light. Everything else waits."', 'She already knows the table width in her head. Cream or white is the only argument left.', 'The bolt unrolls. Warmth vs bright. She wants your mouth on the color, then she will source it.'],
    ['Two boxes. Dried florals, greenery, terracotta. "One per table. Each slightly different."', 'Centerpieces as extra. She wants hands on the floor or quiet watching. Both count as help.', 'She opens the boxes without ceremony. The room is about to get heavier in the pretty way.'],
    ['Ladder from facilities. String lights. Hooks planned for weeks. "Three hours. Come back, or stay and hold."', 'The ceiling is a project. She wants the room dark except for the extra glow.', 'Weighted fabric. A system. She has been waiting for a day that belongs to the ladder.'],
    ['Floor plan of the main dining hall, not the chapter room. "I have been thinking bigger."', 'Vendors, facilities, a timeline already built. She needed to know it was worth doing.', 'Bigger room. Bigger extra. She looks at you like yes is the last unlock.'],
    ['Midnight photo. Empty dining hall, installation in progress. Magazine light. "It is not done yet."', 'She texts from a ladder you cannot see. The space is becoming a feast before the food arrives.', 'You can wait for Wednesday or go now. Either way the extra of the room is already winning.'],
  ],
};

const RESULT = {
  kylie: {
    0: {
      let_run: ['Notes app before you finish agreeing. Names, plus-ones, a system. "Active chapter for now. I want the full picture."', 'She takes the lead like it was always hers. The list grows while you watch.', 'Guest math, immediately. Tight today. Wide later. She already has both columns.'],
      keep_tight: ['"Chapter-only. For now." You can see her thinking past it. The leash is polite.', 'She trims the list and leaves a margin. "Tight. I can do tight. I will hate how short it looks."', 'A smaller invite. She files the overflow names for later extra.'],
    },
    1: {
      go_wider: ['Invite drafted before you leave. Short, warm, specific about the food. She reads it back. It is good.', 'One other house. She sends it like a test plate. "See how it lands."', 'The extra house is a guest. The copy already knows how to feed them.'],
      careful: ['"Understated I can do." She adjusts the copy quieter. It will still land.', 'Volume down. Aim the same. She smiles like a secret extra.', 'Clean, small, still hungry. The neighboring chapter will feel invited, not shouted at.'],
    },
    2: {
      reach_out: ['She writes the email herself. Careful, warm, specific. Send. "She will come."', 'Alumni extra. The invite sounds like a table, not a flyer.', 'Kylie hits send without looking nervous. She has wanted this name on a card for years.'],
      cc_tiffany: ['She adds you. Sends. "You are on the thread. She will answer you directly."', 'CC as cover. The former president will see the RA and the feast in the same line.', 'Your address in the header. The extra now has a chain of custody.'],
    },
    3: {
      use_list: ['"I will reach out personally. Each one. Handwritten in the subject." She means it.', 'Sixty names. She starts at the top like a tasting flight of people.', 'Camille\'s network becomes Kylie\'s homework. The feast just got denser.'],
      selective: ['An hour in the list. Twenty names marked. "These will come and bring the energy."', 'You pick together. The extra is curated. The room will still fill.', 'Key ones only. Kylie hates cutting. She does it anyway, precise.'],
    },
    4: {
      full_reach: ['She exhales. "I have been waiting for you to say that." A draft months old opens.', 'Wide as she can. Something in her face unclenches. The extra has permission.', 'The waiting draft was always this. You just named it.'],
      campus: ['"Campus-wide clean." She sets it like a rule. "I know what that means. I will build it right."', 'Reach with manners. She likes the constraint. The extra still goes far.', 'A campus invite that still looks like a chapter. She can do that.'],
    },
    5: {
      post_it: ['A real smile, not the content-ready kind. Dashboard open. "Seven. Prime window."', 'The blast is a yes. She posts like feeding. The campus becomes a plus-one.', 'Open invite. She has wanted this button for a semester.'],
      help_draft: ['Twenty minutes of type, suggest, adjust. The final is hers. "Better with a second eye."', 'You help the copy. She keeps the voice. The extra still sounds like Kylie.', 'Second pair of eyes. She admits it. The post is hungrier for it.'],
    },
  },
  renee: {
    0: {
      more_acid: ['"Acid. I knew it." She adjusts without measuring. Second taste. She is right.', 'Brightness. She had the bottle behind her the whole time. The extra wakes up.', 'You named the missing. She looks pleased to have been caught waiting for it.'],
      perfect: ['She squints. "Close. Not yet." Three adjustments. The second version is better.', 'Praise bounced. She cooks past it. The plate improves because she refused the first yes.', 'Perfect was a test. She wanted work. You gave her an excuse to keep going.'],
    },
    1: {
      trust_him: ['"He understands. A feast, not a catering job." She emails confirm.', 'Sourcing locked. She looks like someone who finally gets to cook at the scale she meant.', 'Local chef. Her terms. The extra will arrive as dinner.'],
      taste_first: ['Text in the kitchen. Tasting Tuesday. "Good call. You should always taste first."', 'She wanted you to ask. The extra gets a rehearsal.', 'Tuesday on the calendar. Your mouth is in the protocol now.'],
    },
    2: {
      add_soup: ['"Between salad and entrée. I already have something." Margin note before you finish.', 'Soup appears like it was waiting. She wanted the ask.', 'The menu thickens by a course. She writes it in like extra she had pocketed.'],
      trust_menu: ['Paper folded. "Then this is the menu." Something in her settles. She has been holding this.', 'Trust lands. She stops hovering over the courses. The extra is decided.', 'Three courses stand. She looks like a plan that got named.'],
    },
    3: {
      ask_pairing: ['Flip. Pairing list on the back. Handwritten last week. Almost apologetic.', 'Wine already there. She did this in private. You just opened the drawer.', 'The back of the page is a second menu. Extra as pairing.'],
      add_bread: ['"Between two and three. Housemade. Good butter. Bread is the part everyone forgets."', 'She adds it like doctrine. The extra gets a course that looks humble and is not.', 'Butter in the margin. She is right. The feast needed that weight.'],
    },
    4: {
      absolutely: ['She exhales. "I was not sure you would say yes. Menu drafted three months." Phone open.', 'Immediate yes. She looks younger for a second. Then the tasting list appears.', 'Permission. The extra she built in secret gets a kitchen and a date.'],
      ask_to_see: ['Phone handed over. Twelve-item tasting, sourcing notes. Quiet work. "Still three months of prep."', 'You asked to see it. It is already a career. She watches you read like a grade.', 'The menu is a confession. She has been catering this feast in her head since last year.'],
    },
    5: {
      step_back: ['Door closed. Two hours later the smell pulls people from the hall.', 'You leave her the heat. The extra does the inviting.', 'Kitchen as a closed feast. The corridor learns it first.'],
      ask_what_help: ['"Water glasses. Fill them. Keep people out." The most important job she could give.', 'You are allowed in as logistics. She keeps the plates. The extra stays hers.', 'Water, door, no tasting. She trusts you with the edges of the sitting.'],
    },
  },
  fiona: {
    0: {
      ask_what: ['Chairs move before the answer. "Tables face the wrong way. People should face each other." Three chairs. Already better.', 'She rearranges while talking. The room starts eating together.', 'Layout as appetite. Facing is the first extra.'],
      give_room: ['Three laps. Different angles. Notebook. "I have a layout. Tonight."', 'You step back. She assesses like a tasting. The plan will arrive after dark.', 'Silence, then a sketch. She needed the room without your voice in it.'],
    },
    1: {
      cream: ['"Yes. Warmer. More honest." Note made. She already knows the mill.', 'Cream instead of white. She wanted that permission. The extra goes soft.', 'Color as heat. She will source it this week like a recipe.'],
      trust_her: ['Nod. Linen unrolled against the table. Everything already measured in her head.', 'You trust. She checks width anyway. The extra was always going to be exact.', 'Foundations stand. She looks relieved you did not decorate at her.'],
    },
    2: {
      help_build: ['Greenery in your hands. "Center out." An hour on the floor. Better than expected.', 'You build with her. The pieces get heavier and prettier. The tables will hold them like extra.', 'Shared work. She talks less. The florals talk.'],
      let_her: ['Silence, tilts, moves. Absorbing. By the end you see how she sees rooms.', 'You watch. The extra of attention is the help. The centerpieces finish themselves under her hands.', 'She builds. You learn the appetite of a table that wants to be looked at.'],
    },
    3: {
      help_hang: ['You hold the ladder. Hooks up. Lights on. Different room. "Better than the sketch."', 'Stay. Hand up hardware. The glow is extra. She looks at it a long time.', 'Installed warmth. She lets you into the hard part. The good part is the hush after.'],
      come_back: ['Dark except string lights. Fiona at a finished table with a granola bar. "You missed the hard part. This is the good part."', 'Three hours later the room is a sitting. She is already in it, snacking like a test guest.', 'You return to extra light. She looks tired and pleased. The feast has a ceiling now.'],
    },
    4: {
      say_yes: ['A look. Then: "Four days. Right access. I already spoke to facilities." The plan was ready.', 'She knew you would say yes. Bigger hall. Bigger extra. Timeline in her pocket.', 'Go for it. She has been waiting to spend the dining hall like fabric.'],
      ask_how: ['Vendors, borrowed gear, a friend in facilities, a built timeline. "I needed to know it was worth doing."', 'She walks you through it. The extra was never vague. It was logistics with hunger.', 'How is already done. You asking lets her show the work.'],
    },
    5: {
      go_see_it: ['She is in the middle of the space, looking up. "Tomorrow it has people. Then it becomes real."', 'In person the extra of the room hits. She lets you stand in the unfinished feast.', 'Midnight work, morning proof. She wanted a witness before the guests.'],
      wait_for_feast: ['"Smart. First impression matters." You can hear the smile in the text.', 'You wait. She keeps the reveal. Wednesday will land heavier for it.', 'Saved sight. The extra of surprise is part of her menu.'],
    },
  },
};

const MENU = [
  ['Counter snacks. Dip, wine, hands. The extra starts casual.', 'House snacks. Nobody pretends this is plated yet.', 'Bags on the counter. The first sitting does not need courses.'],
  ['Reneé ran the recipes. You plated. Homemade extra with her name on the method.', 'Appetizers tested until they vanished. Warm, passed, gone.', 'Tested bites. The kitchen already knows the guests will want more.'],
  ['Hired pans, full spread. Generous on purpose.', 'Restaurant extra brought in. The table looks booked and hungry.', 'A spread that arrived complete. Nothing missing except appetite.'],
  ['Three plates in sequence. Service with extra that expects to be finished.', 'Appetizer through dessert. The feast learned manners and kept the portions.', 'Proper sitting. Courses that want emptying.'],
  ['Five courses. Time as an ingredient. Nobody rushes the swallow.', 'Soup to dessert, unhurried. The evening is the vessel.', 'The meal takes Wednesday and keeps it.'],
  ['Her tasting debut. She built this extra in private kitchens.', 'Reneé caters. The menu is a thesis she also eats.', 'Every plate has her hand. The feast is her extra, plated.'],
  ['Seven courses, sourced by hand. The extra she meant all along.', 'Full table. Nothing left to upgrade except capacity.', 'Last menu. She cooked the climb. They keep it.'],
];

const ATMO = [
  ['Living room extra. Couch still honest. Nothing dressed up yet.', 'Chapter lounge. Ordinary on purpose. The sitting can start without a cue.', 'Familiar furniture. The feast has not asked the room to perform.'],
  ['Chairs turned inward. Fiona\'s first pass. Facing is the extra.', 'Dining room that learned to be a table. Space as appetite.', 'Chairs that talk to each other. The extra has a layout.'],
  ['White cloth, tapers. Something in the room shifts toward feast.', 'Candles. Linen. The extra looks intentional.', 'Light and cloth as the first course of atmosphere.'],
  ['Florals, place settings considered. Each table a little different.', 'Centerpieces. The extra of looking. Fiona\'s hand on every surface.', 'Custom settings. The room wants to be eaten in slowly.'],
  ['String lights, drape, warm ambient. She worked all day for this glow.', 'Fabric overhead. The extra hangs. The hall feels kept.', 'Installed warmth. Atmosphere as a second kitchen.'],
  ['Dining hall transformed. She had a plan. The extra filled every corner.', 'Fiona\'s vision. Light, cloth, a space loved into something else.', 'The hall is hers tonight. Guests walk in already softer.'],
  ['Every surface intentional. The space is entirely hers. Extra as architecture.', 'Masterpiece sitting. Nothing accidental except how much they will eat.', 'The room is the feast before the food. Then the food arrives anyway.'],
];

const GUEST = [
  ['Twelve known mouths. Close extra. No performance required.', 'Active chapter. The sitting is already a family plate.', 'Small, known, hungry. The extra does not need an audience yet.'],
  ['Pledges for the first time. Some cautious. The extra will teach them.', 'New mouths. The table gets a little wider.', 'First-timers. Appetite as orientation.'],
  ['Two other houses. The word is spreading with the extra.', 'Greek Row neighbors. Witnesses who will want a return invite.', 'The feast leaks next door on purpose.'],
  ['Former sisters back. Some years away. The extra welcomes them home.', 'Alumni in the chairs. The chapter tastes like return.', 'People who left come back hungry. The table expected them.'],
  ['Sixty names from Camille. Full house extra.', 'Her network fills the room. Kylie\'s homework paid in bodies.', 'A packed sitting. Appetite with a contact list.'],
  ['Open campus. Standing room. The extra is a destination.', 'Kylie\'s blast. The hall holds as many as it can and then some.', 'Campus as guest list. The feast got loud.'],
  ['Everyone she has ever known. The chapter is the place you eat.', 'Grand gathering. Extra as reputation.', 'The last guest tier. The room is a rumor that came true and sat down.'],
];

export function applyHostessOverhaul() {
  for (const [who, list] of Object.entries(HOSTESS_HANGOUTS)) {
    list.forEach((v, idx) => {
      pool(`hostess.hang.${who}.${idx}.intro`, INTRO[who]?.[idx]);
      (v.choices || []).forEach((c) => {
        pool(`hostess.hang.${who}.${idx}.result.${c.id}`, RESULT[who]?.[idx]?.[c.id]);
      });
    });
  }
  MENU_TIERS.forEach((_, i) => pool(`hostess.tier.menu.${i}`, MENU[i]));
  ATMOSPHERE_TIERS.forEach((_, i) => pool(`hostess.tier.atmo.${i}`, ATMO[i]));
  GUEST_TIERS.forEach((_, i) => pool(`hostess.tier.guest.${i}`, GUEST[i]));
}

function prefer(poolKey, ctx) {
  const line = render(`{${poolKey}}`, ctx)?.trim();
  if (line && !line.includes('{unresolved}')) return line;
  return '';
}

function dummy() {
  return { id: 0, name: 'Tiffany', first: 'Tiffany', lbs: 160, startLbs: 118 };
}

function ctxFor(student, week, globals) {
  return buildTextContext({
    subject: student || dummy(),
    week,
    globals,
  });
}

export function renderHostessHangIntro(who, idx, student, week = 1) {
  if (!who || idx == null) return '';
  return prefer(`hostess.hang.${who}.${idx}.intro`, ctxFor(student, week, { featureId: 'hostess', hostessWho: who, hangIdx: idx }));
}

export function renderHostessHangResult(who, idx, choiceId, student, week = 1) {
  if (!who || idx == null || !choiceId) return '';
  return prefer(`hostess.hang.${who}.${idx}.result.${choiceId}`, ctxFor(student, week, { featureId: 'hostess', hostessWho: who, hangIdx: idx, hangChoice: choiceId }));
}

export function renderHostessTierDesc(kind, idx, student, week = 1) {
  if (!kind || idx == null) return '';
  return prefer(`hostess.tier.${kind}.${idx}`, ctxFor(student, week, { featureId: 'hostess', hostessKind: kind, hangIdx: idx }));
}
