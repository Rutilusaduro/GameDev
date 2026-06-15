// ═══════════════════════════════════════════════════════════════
// WEEKLY EVENT — random between-week incidents (modular pools)
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../../engine.js';

registerPool('weekly.dining_special', [
  { when: {}, text: [
    'The dining hall announces a bottomless brunch that, through a combination of slow kitchen turns and no posted end time, runs until dinner. The class does not leave. They settle in. By 7 pm the booths have been rearranged twice and the serving staff has given up trying to close the section. The students return changed: slower, warmer, considerably more substantial.',
  ] },
]);

registerPool('weekly.stress_week', [
  { when: {}, text: [
    '{subject.name} has a major paper due Thursday. The pattern is well-established by now: stress arrives, appetite follows. She doesn\'t track it. She just eats — through the outline, through the rough draft, through the citations. When the paper is submitted she surveys the empty fridge and three takeout containers and decides this is a reasonable trade. She seems fine.',
  ] },
]);

registerPool('weekly.food_delivery', [
  { when: {}, text: [
    'Three competing delivery apps are all running aggressive new-user deals. {subject.name} has three accounts. The evening becomes a logistics problem of a very specific kind. At one point two drivers arrive simultaneously. She manages the handoff with the efficiency of someone who has been waiting for this exact convergence. Nothing goes unfinished.',
  ] },
]);

registerPool('weekly.pizza_deal', [
  { when: {}, text: [
    'Someone in the group chat finds a pizza deal: buy two, get two. The math is straightforward. The scale is not. Twenty-two pizzas arrive at a dorm common room. No one intended this outcome. Everyone participates. The room smells of cheese until Wednesday. No slice survives the night.',
  ] },
]);

registerPool('weekly.admin_memo', [
  { when: {}, text: [
    'A memo from the Dean of Students arrives this week. The subject line reads: "Regarding Wellness Observations in Certain Courses." The building is named. Specific floor is named. Your room number is not named but the description is not ambiguous. The class is not mentioned by name. Everything else is mentioned. You read it three times. Nothing actionable is stated. The feeling it creates is very actionable.',
  ] },
]);

registerPool('weekly.food_festival', [
  { when: {}, text: [
    'There\'s a food festival in the park this weekend. The class decides to go together. They return Sunday evening transformed: quieter, heavier, radiating the specific satisfaction of a weekend spent doing exactly one thing very well. Several students report they "lost track" of their intake. No one sounds sorry. The van home is completely silent.',
  ] },
]);

registerPool('weekly.care_package', [
  { when: {}, text: [
    'A package arrives from {subject.name}\'s family. It is enormous. It is almost entirely food — the kind of care that arrives in bulk, in containers marked with masking tape and her childhood nickname. She calls home to say thank you. She does not mention that the pantry is already half depleted. She does not mention a lot of things. She sounds happy.',
  ] },
]);

registerPool('weekly.birthday', [
  { when: {}, text: [
    'It is {subject.name}\'s birthday. Someone tells the class. Someone else orders a cake. Then someone else orders a different cake because they couldn\'t decide. Then someone who didn\'t know there were already cakes shows up with a third. {subject.name} eats with the abandon of someone who has been given permission to take up exactly as much space as she wants, for one day, and has decided to take it seriously.',
  ] },
]);

registerPool('weekly.class_cancelled', [
  { when: {}, text: [
    'A scheduling conflict cancels your Tuesday session. The class, without an obligation and with a collective appetite, materializes at a nearby brunch spot. Brunch runs long. Long becomes lunch. Lunch becomes a decision to order one more thing. By the time anyone thinks to leave, the restaurant is setting up for dinner. They stay for that too.',
  ] },
]);

registerPool('weekly.faculty_overheard', [
  { when: {}, text: [
    'You overhear two faculty members in the hallway. One is asking about enrollment in your section. "Interesting group of students," the other says. "Particularly this semester." A pause. "You\'ve noticed too." They don\'t say more. {subject.name} is passing in the corridor behind you. She is wearing a coat that didn\'t button last year. She does not notice the conversation. You do.',
  ] },
]);

registerPool('weekly.bake_sale', [
  { when: {}, text: [
    'The junior class is running a bake sale for a field trip fund. Your students buy out the first round by ten am. Several make return trips when new trays come out. The junior running the table posts about it: "Record day. Bought by the same class, all six times." The post gets sixteen shares before she takes it down. The fundraising goal is exceeded.',
  ] },
]);

registerPool('weekly.netflix_binge', [
  { when: {}, text: [
    '{subject.name} finds a show Friday night. It is an eight-season show. She does not know this at the time. She is eating when she starts it — something small, casual, not a meal really. By Sunday morning the snacking has become ambient, the meals have merged, and the bags and containers tell a story she couldn\'t narrate in real time. She finishes the season. She opens another.',
  ] },
]);

registerPool('weekly.rainy_weekend', [
  { when: {}, text: [
    'It rains for four days without stopping. No one goes anywhere. Delivery apps log their busiest weekend of the semester. The class is horizontal, fed, and largely stationary from Friday to Monday — a long comfortable exhale of a weekend that leaves everyone softer, fuller, and faintly reluctant to explain where the time went.',
  ] },
]);

registerPool('weekly.cooking_experiment', [
  { when: {}, text: [
    '{subject.name} announces she\'s learning to cook and invites a handful of classmates to "taste test." The tasting runs six hours. She produces five dishes. Everything is made in quantities that suggest she calibrated her portion sense against an entirely different standard. The classmates eat steadily for the duration. They leave late. They leave round. They text her about it the next morning.',
  ] },
]);
