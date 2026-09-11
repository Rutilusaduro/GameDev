// The Squad — Lead: A2 Psych | Support: A6 Slender, A5 Editor
import { registerPool } from '../../engine.js';

registerPool('room.visit.intro.meet', [
  { when: { studentId: 0 }, weight: 4, text: [
    `Brittany opens in team gear, measuring you like an opponent. "{ra.name}," she says. "Come in. Snack drawer policy starts now."`,
    `Protein bars and laundry. She sticks out a hand. "You're {ra.name}. Good — someone who answers texts."`,
    `"Finally," Brittany says. "{ra.name}. Quiet hours, pizza rules, go."`,
  ] },
  { when: { studentId: 1 }, weight: 4, text: [
    `Cassidy blinks up from her laptop. "Oh — {ra.name}. I was going to email you." She kicks a chair over.`,
    `Cables narrow the path to the bed. "{ra.name}, right? Sit where the floor isn't hoarding textbooks."`,
    `"Perfect timing," Cassidy says. "{ra.name}. Witness how evil this problem set is."`,
  ] },
  { when: { studentId: 2 }, weight: 4, text: [
    `Kylie's ring light is still on. "Oh good, content." She lowers the phone. "{ra.name}. Hi. Ignore the tripod."`,
    `"You're {ra.name}?" She grins. "I already found your Instagram. Come in before I film the hallway."`,
    `She sweeps snack wrappers off the desk. "{ra.name}. Sit. Tell me if this floor is actually aesthetic."`,
  ] },
  { when: { studentId: 3 }, weight: 4, text: [
    `Serena answers still in compression gear. "{ra.name}." A firm nod. "I like RAs who do rounds in person."`,
    `Energy drinks and medals on the shelf. "You're {ra.name}. Good. I have questions about the gym key."`,
    `She blocks the doorframe like a starting block. "{ra.name}. Come in. I won't bite unless I'm hungry."`,
  ] },
  { when: { studentId: 4 }, weight: 4, text: [
    `Fiona smells like turpentine and tea. "{ra.name}?" She smiles, paint on her knuckles. "The light in here is kinder at night."`,
    `Canvases lean against every wall. "You're {ra.name}. I've been sketching the hall. You're in it now."`,
    `She moves a stack of prints off a stool. "{ra.name}. Sit. Tell me if the floor feels haunted or holy."`,
  ] },
  { when: { studentId: 5 }, weight: 4, text: [
    `Destiny doesn't turn from her monitor. "{ra.name}." A hand wave. "Door's unlocked. Don't touch the mic."`,
    `RGB lights wash the room. "You're {ra.name}. Cool. I'm live-adjacent. Park it on the beanbag."`,
    `She finally spins the chair. "{ra.name}. If you hear yelling, it's ranked. Come in anyway."`,
  ] },
  { when: { studentId: 6 }, weight: 4, text: [
    `Tiffany has pastels arranged like a magazine shoot. "{ra.name}!" Perfect smile. "I was hoping you'd be tall."`,
    `Greek letters and fairy lights. "You're {ra.name}. Good. I run events — you'll hear from me."`,
    `She gestures at a candle that definitely violates fire code. "{ra.name}. Come in. We set the tone on this hall."`,
  ] },
  { when: { studentId: 7 }, weight: 4, text: [
    `Priya has three color-coded calendars on the wall. "{ra.name}." She offers a handshake. "I prefer scheduled check-ins."`,
    `Textbooks form a fortress. "You're {ra.name}. I've read the RA handbook. Twice. Sit — I have notes."`,
    `She clears a chair of flashcards. "{ra.name}. Efficient intro: I study, I eat fast, I sleep little."`,
  ] },
  { when: { studentId: 8 }, weight: 4, text: [
    `Maya opens the door an inch, then wider. "{ra.name}." Soft voice. "You can come in. It's not messy. Much."`,
    `Sketchbooks stack by the bed. She tucks hair back. "You're {ra.name}. I've seen you in the lounge. Hi."`,
    `She makes tea without asking. "{ra.name}. Sit. I'll warm up when I'm not nervous."`,
  ] },
  { when: { studentId: 9 }, weight: 4, text: [
    `Chloé leans on the doorframe, wine-colored lipstick perfect. "{ra.name}?" Accent like silk. "American halls are loud. I like you already."`,
    `Scarves on the chair, Paris postcards on the wall. "You're {ra.name}. Come in. Tell me the gossip is true."`,
    `She pours sparkling water into a real glass. "{ra.name}. Sit. I host small salons. You're invited."`,
  ] },
  { when: { studentId: 10 }, weight: 4, text: [
    `Reneé wipes flour off her hands. "{ra.name}!" The room smells like butter. "Taste this — it's still warm."`,
    `Pots on every surface. "You're {ra.name}. Good. I trade food for favors on this floor."`,
    `She shoves a muffin at you before you speak. "{ra.name}. Come in. Hunger is honesty here."`,
  ] },
  { when: { studentId: 11 }, weight: 4, text: [
    `Kaylee has a first-aid kit open on the desk. "{ra.name}." Warm smile. "I already know everyone's allergies."`,
    `Comfort blankets, clinical notes, snacks labeled by name. "You're {ra.name}. Sit. Can I get you water?"`,
    `She pats the bedspread. "{ra.name}. I look after people. That includes you when you're fried."`,
  ] },
  { when: { studentId: 12 }, weight: 4, text: [
    `Nadia watches you over her notebook. "{ra.name}." Clinical calm. "I've been observing floor dynamics. You're data."`,
    `Charts on the wall — not for class, for fun. "You're {ra.name}. Come in. I won't diagnose you yet."`,
    `She marks a line in her log. "{ra.name}. Sit. Tell me how you plan to influence appetite here."`,
  ] },
  { when: { studentId: 13 }, weight: 4, text: [
    `Daisy smells like cookies baked recently. "{ra.name}!" She pulls you inside. "You need a plate. Everyone does."`,
    `Tupperware labeled by day of the week. "You're {ra.name}. I run the hall kitchen energy. Eat something."`,
    `She wipes flour on her apron. "{ra.name}. Sit. I'll feed you while we talk rules."`,
  ] },
  { when: { studentId: 14 }, weight: 4, text: [
    `Mary Jane's room has jam jars lined up like trophies. "{ra.name}!" Big grin. "I brought six flavors to move-in."`,
    `Farm posters, a quilt that looks handmade. "You're {ra.name}. Good. I bake when I'm homesick."`,
    `She offers sweet tea before you speak. "{ra.name}. Come in. I'll fatten this floor right, you'll see."`,
  ] },
  { when: { studentId: 16 }, weight: 4, text: [
    `Sophia's desk is sterile — scales, vials, labels facing out. "{ra.name}." Anxious precision. "I track macros for half the hall."`,
    `Meal-replacement bars sorted by protein. "You're {ra.name}. Please don't touch the samples."`,
    `She adjusts her lab coat. "{ra.name}. Sit. I have concerns about dining-hall portions. Many."`,
  ] },
  { when: { studentId: 18 }, weight: 4, text: [
    `Talia has a prototype on the desk, wires exposed. "{ra.name}." Grease on her fingers. "If it beeps, ignore it."`,
    `Blueprints and snack debris share the same table. "You're {ra.name}. Good — I need RA clearance for the lounge."`,
    `She pushes goggles up. "{ra.name}. Come in. I'm optimizing how this floor eats. You're part of the system."`,
  ] },
  { when: {}, text: [
    `{subject.name} answers on the second knock. "{ra.name}?" A small smile. "Come in. I was wondering when you'd do rounds."`,
    `The door opens on a room still half-unpacked. "Hey — you're {ra.name}. I've heard good things down the hall."`,
    `{subject.name} waves you in. "{ra.name}. Make yourself comfortable — I'm still settling in."`,
  ] },
]);

registerPool('room.visit.stage.beat.persona', [
  { when: { studentId: 2, stageMin: 3 }, weight: 3, text: [
    `Kylie angles her phone at the mirror. "New angle, {ra.name}. The algorithm loves honesty."`,
  ] },
  { when: { studentId: 5, stageMin: 5 }, weight: 3, text: [
    `Destiny pats her chair arm. "Stream chair upgrade incoming, {ra.name}. My viewers send donations when I eat."`,
  ] },
  { when: { studentId: 7, stageMin: 4 }, weight: 3, text: [
    `Priya slides a chart toward you. "Correlation between your visits and my snack intake, {ra.name}. Significant."`,
  ] },
  { when: { studentId: 10, stageMin: 4 }, weight: 3, text: [
    `Reneé lifts a lid off a pot. "Batch three this week, {ra.name}. The hall keeps asking for more."`,
  ] },
  { when: { studentId: 14, stageMin: 5 }, weight: 3, text: [
    `Mary Jane pinches her own side and laughs. "Homemade does this, {ra.name}. I ain't sorry."`,
  ] },
  { when: {}, text: [
    `{subject.name} catches your eye and smiles — no words needed, the room says enough.`,
    `She tucks a blanket aside so you can sit. "{ra.name}. I'm glad it's you at the door."`,
    `The visit stretches easy — her room, your attention, the floor waiting outside.`,
  ] },
]);
