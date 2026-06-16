// The Squad — Lead: A1 Mobile | Support: A4 Architect, A7 Artisan, A5 Editor
// Fragment pools for between-week random incidents (MIGRATION.md decomposition).
import { registerPool } from '../../../engine.js';

function eventFragments(id, setup, beat, coda) {
  registerPool(`weekly.${id}.setup`, [{ when: {}, text: setup }]);
  registerPool(`weekly.${id}.beat`, [{ when: {}, text: beat }]);
  registerPool(`weekly.${id}.coda`, [{ when: {}, text: coda }]);
  registerPool(`weekly.${id}`, [{
    when: {},
    text: [`{weekly.${id}.setup} {weekly.${id}.beat} {weekly.${id}.coda}`],
  }]);
}

eventFragments('dining_special', [
  'The dining hall announces a bottomless brunch with no posted end time.',
  'Bottomless brunch appears on the board and stays there all day.',
  'The promotion promises no closing hour. The kitchen stops pretending there is one.',
], [
  'The class does not leave. They settle in.',
  'Your students treat it like a field assignment with trays.',
  'Nobody treats the first refill as the last.',
], [
  'By evening the booths have been rearranged twice. Everyone returns slower, warmer, more substantial.',
  'By dinner the section still has regulars. The staff has given up closing it.',
  'They come back changed: fed, horizontal, faintly triumphant.',
]);

eventFragments('stress_week', [
  '{subject.name} has a major paper due Thursday.',
  'A deadline lands on {subject.name} this week.',
  'Coursework pressure finds {subject.name} at her desk.',
], [
  'Stress arrives, appetite follows. She eats through the outline and the rough draft.',
  'She does not track the snacking. She just keeps writing and reaching.',
  'The fridge empties in step with the citations.',
], [
  'When the paper is submitted she surveys the takeout containers and calls it a reasonable trade.',
  'She submits on time, surrounded by wrappers, and seems fine.',
  'The draft is done. The pantry is not. She does not sound sorry.',
]);

eventFragments('food_delivery', [
  'Three delivery apps are all running aggressive new-user deals.',
  'Competing delivery promos stack across {subject.name}\'s phone.',
  'Every app on her home screen is offering free delivery this week.',
], [
  'The evening becomes a logistics problem of a very specific kind.',
  'At one point two drivers arrive simultaneously. She manages the handoff cleanly.',
  'She has three accounts and uses all of them before midnight.',
], [
  'Nothing goes unfinished.',
  'The counter is clear by morning.',
  'The deals expire. The calories do not.',
]);

eventFragments('pizza_deal', [
  'Someone in the group chat finds a pizza deal: buy two, get two.',
  'A buy-two-get-two offer hits the chat and nobody vetoes it.',
  'The math is straightforward. The scale is not.',
], [
  'Twenty-two pizzas arrive at a dorm common room.',
  'No one intended this outcome. Everyone participates.',
  'The room fills with boxes faster than anyone can open them.',
], [
  'The room smells of cheese until Wednesday. No slice survives the night.',
  'They eat until the boxes go quiet.',
  'By morning the deal is folklore and the common room is wrecked.',
]);

eventFragments('admin_memo', [
  'A memo from the Dean of Students arrives this week.',
  'Campus mail delivers a wellness memo with your building named.',
  'The subject line reads: "Regarding Wellness Observations in Certain Courses."',
], [
  'The floor is named. Your room number is not, but the description is not ambiguous.',
  'The class is not mentioned by name. Everything else is.',
  'You read it three times. Nothing actionable is stated.',
], [
  'The feeling it creates is very actionable.',
  'You file it and feel watched anyway.',
  'The memo says little. It implies plenty.',
]);

eventFragments('food_festival', [
  'There\'s a food festival in the park this weekend.',
  'The class decides to go together.',
  'A weekend festival becomes a group outing.',
], [
  'They return Sunday evening transformed: quieter, heavier, satisfied.',
  'Several students report they "lost track" of their intake.',
  'Nobody sounds sorry about the lost track.',
], [
  'The van home is completely silent.',
  'They come back softer and fuller.',
  'Monday starts with everyone pretending they are not still full.',
]);

eventFragments('care_package', [
  'A package arrives from {subject.name}\'s family. It is enormous.',
  'Her family sends a box that barely fits through the door.',
  'Masked-tape labels and childhood nicknames cover the carton.',
], [
  'It is almost entirely food — care that arrives in bulk.',
  'She calls home to say thank you.',
  'She does not mention that the pantry was already half depleted.',
], [
  'She does not mention a lot of things. She sounds happy.',
  'The package becomes a week of meals.',
  'By Thursday only the packing peanuts remain.',
]);

eventFragments('birthday', [
  'It is {subject.name}\'s birthday. Someone tells the class.',
  'The date hits the group chat and plans escalate immediately.',
  'Birthday energy finds the whole section at once.',
], [
  'Someone orders a cake. Then another. Then a third arrives from someone out of the loop.',
  '{subject.name} eats with the abandon of permission granted for one day.',
  'She decides to take up exactly as much space as she wants.',
], [
  'She takes it seriously.',
  'By evening there is frosting on three surfaces and no regrets.',
  'The candles are blown out. The eating is not.',
]);

eventFragments('class_cancelled', [
  'A scheduling conflict cancels your Tuesday session.',
  'Tuesday class disappears from the calendar.',
  'A free afternoon opens without warning.',
], [
  'The class materializes at a nearby brunch spot.',
  'Brunch runs long. Long becomes lunch.',
  'Someone orders one more thing. Then another.',
], [
  'By the time anyone thinks to leave, the restaurant is setting up for dinner.',
  'They stay for that too.',
  'The obligation was cancelled. The appetite was not.',
]);

eventFragments('faculty_overheard', [
  'You overhear two faculty members in the hallway.',
  'A conversation in the corridor reaches you before you turn the corner.',
  'Two professors discuss enrollment in low voices.',
], [
  '"Interesting group of students," one says. "Particularly this semester."',
  '{subject.name} passes behind you in a coat that did not button last year.',
  'She does not notice the conversation. You do.',
], [
  'They don\'t say more. You remember anyway.',
  'The hallway goes quiet after they leave.',
  'You keep walking like you heard nothing. You did.',
]);

eventFragments('bake_sale', [
  'The junior class is running a bake sale for a field trip fund.',
  'A fundraising table appears in the quad with trays of everything sweet.',
  'Your students find the bake sale before second period ends.',
], [
  'Your students buy out the first round by ten am.',
  'Several make return trips when new trays come out.',
  'The junior running the table posts about a record day.',
], [
  'The post gets shares, then comes down. The fundraising goal is exceeded.',
  'The table is empty by noon.',
  'Nobody mentions how much your section contributed.',
]);

eventFragments('netflix_binge', [
  '{subject.name} finds a show Friday night. It is longer than she thought.',
  'An eight-season show starts as background noise.',
  'She begins eating something small while the opening credits run.',
], [
  'By Sunday the snacking has become ambient and the meals have merged.',
  'Bags and containers tell a story she could not narrate in real time.',
  'She finishes a season and opens another without standing up.',
], [
  'The weekend disappears into episodes and refills.',
  'Monday arrives before the plot does.',
  'She texts the group that she is "resting." She is not empty.',
]);

eventFragments('rainy_weekend', [
  'It rains for four days without stopping.',
  'The weather cancels every outdoor plan at once.',
  'Campus turns inward under a week of gray sky.',
], [
  'No one goes anywhere. Delivery apps log their busiest weekend of the semester.',
  'The class stays horizontal, fed, and largely stationary.',
  'Rain drums the windows while ovens and apps do the rest.',
], [
  'Everyone returns softer, fuller, faintly reluctant to explain where the time went.',
  'The weekend exhales into Monday still damp and satisfied.',
  'Umbrellas dry in hallways. Waistbands do not.',
]);

eventFragments('cooking_experiment', [
  '{subject.name} announces she\'s learning to cook and invites classmates to taste test.',
  'A tasting invitation goes out with suspicious confidence.',
  'She calls it a small experiment. The grocery list disagrees.',
], [
  'The tasting runs six hours. She produces five dishes in quantities meant for more people.',
  'Classmates eat steadily for the duration.',
  'Every dish is good. Every dish is enormous.',
], [
  'They leave late. They leave round.',
  'They text her the next morning with compliments and fullness.',
  'She calls the night a success. Her kitchen calls it a siege.',
]);
