// The Squad — Lead: A1 Mobile | Support: A7 Artisan
// Group dinner conversation topics — migrated from sessions.js GROUP_CONVERSATIONS.
import { registerPool } from '../../engine.js';

registerPool('dinner.groupTopic', [
  { when: { archetype: 'cheerleader' }, text: ['the upcoming competition'] },
  { when: { archetype: 'quiet' }, text: ['her current project'] },
  { when: { archetype: 'party' }, text: ['last weekend'] },
  { when: { archetype: 'sorority' }, text: ['the chapter event'] },
  { when: { archetype: 'bookworm' }, text: ['her research'] },
  { when: { archetype: 'swimmer' }, text: ['her training'] },
  { when: { archetype: 'athlete' }, text: ['her training'] },
  { when: { archetype: 'artsy' }, text: ['her current piece'] },
  { when: { archetype: 'overachiever' }, text: ['her family'] },
  { when: { archetype: 'influencer' }, text: ['her content strategy'] },
  { when: { archetype: 'culinary' }, text: ['the menu'] },
  { when: {}, text: ['her plans'] },
]);

registerPool('dinner.groupConv.get_them_talking', [
  { when: {}, text: [
    '{dinner.groupConv.get_them_talking.l1}\n{dinner.groupConv.get_them_talking.l2}\n{dinner.groupConv.get_them_talking.l3}\n{dinner.groupConv.get_them_talking.l4}',
  ] },
]);
registerPool('dinner.groupConv.get_them_talking.l1', [
  { when: {}, text: [`You ask {subject.name} about {dinner.groupTopic}. She starts — and {ref.name} leans in.`] },
]);
registerPool('dinner.groupConv.get_them_talking.l2', [
  { when: {}, text: [`"Wait, really?" {ref.name} says. "I didn't know you were doing that."`] },
]);
registerPool('dinner.groupConv.get_them_talking.l3', [
  { when: {}, text: [`{subject.name}: "You never asked." No edge in it. Just fact.`] },
]);
registerPool('dinner.groupConv.get_them_talking.l4', [
  { when: {}, text: [`{ref.name} reaches for her drink. "Fair." Then: "Tell me the rest."`] },
]);

registerPool('dinner.groupConv.compliment_both', [
  { when: {}, text: [
    '{dinner.groupConv.compliment_both.l1}\n{dinner.groupConv.compliment_both.l2}\n{dinner.groupConv.compliment_both.l3}',
  ] },
]);
registerPool('dinner.groupConv.compliment_both.l1', [
  { when: {}, text: [`You say something genuine about each of them — something you've actually noticed.`] },
]);
registerPool('dinner.groupConv.compliment_both.l2', [
  { when: {}, text: [`{subject.name} receives it more quietly than expected. {ref.name} looks at her, then at you.`] },
]);
registerPool('dinner.groupConv.compliment_both.l3', [
  { when: {}, text: [`"He means it," {ref.name} says.\n{subject.name}: "I know." The table warms half a degree.`] },
]);

registerPool('dinner.groupConv.let_it_settle', [
  { when: {}, text: [
    '{dinner.groupConv.let_it_settle.l1}\n{dinner.groupConv.let_it_settle.l2}\n{dinner.groupConv.let_it_settle.l3}',
  ] },
]);
registerPool('dinner.groupConv.let_it_settle.l1', [
  { when: {}, text: [`The conversation drops away. Both of them are eating. The restaurant makes its small sounds.`] },
]);
registerPool('dinner.groupConv.let_it_settle.l2', [
  { when: {}, text: [`Then {subject.name} says something about the sauce. {ref.name} responds.`] },
]);
registerPool('dinner.groupConv.let_it_settle.l3', [
  { when: {}, text: [`Neither is talking to you — better, actually. The evening found something you weren't planning.`] },
]);

registerPool('dinner.groupConv.toast_together_group', [
  { when: {}, text: [
    '{dinner.groupConv.toast_together_group.l1}\n{dinner.groupConv.toast_together_group.l2}\n{dinner.groupConv.toast_together_group.l3}',
  ] },
]);
registerPool('dinner.groupConv.toast_together_group.l1', [
  { when: {}, text: [`You raise your glass. They raise theirs.\n{subject.name}: "To what?"\n"To a good evening."`] },
]);
registerPool('dinner.groupConv.toast_together_group.l2', [
  { when: {}, text: [`{ref.name}: "We should toast to something real." She thinks. "To the food."`] },
]);
registerPool('dinner.groupConv.toast_together_group.l3', [
  { when: {}, text: [`{subject.name} laughs — actually laughs. "To the food." The glasses clink.`] },
]);

registerPool('dinner.groupConv.order_for_table', [
  { when: {}, text: [
    '{dinner.groupConv.order_for_table.l1}\n{dinner.groupConv.order_for_table.l2}\n{dinner.groupConv.order_for_table.l3}',
  ] },
]);
registerPool('dinner.groupConv.order_for_table.l1', [
  { when: {}, text: [`You catch the server's eye and gesture at the table. More arrives.`] },
]);
registerPool('dinner.groupConv.order_for_table.l2', [
  { when: {}, text: [`{subject.name} and {ref.name} look at the new dishes, look at each other.`] },
]);
registerPool('dinner.groupConv.order_for_table.l3', [
  { when: {}, text: [`{ref.name}: "We didn't need more."\n{subject.name}, already reaching: "I know." {ref.name} reaches too.`] },
]);

registerPool('dinner.groupConv.compare_rooms', [
  { when: {}, text: [
    '{dinner.groupConv.compare_rooms.l1}\n{dinner.groupConv.compare_rooms.l2}\n{dinner.groupConv.compare_rooms.l3}',
    '{dinner.groupConv.compare_rooms.l2}\n{dinner.groupConv.compare_rooms.l1}\n{dinner.groupConv.compare_rooms.l3}',
    '{dinner.groupConv.compare_rooms.l1} {dinner.groupConv.compare_rooms.l3}\n{dinner.groupConv.compare_rooms.l2}',
  ] },
]);
registerPool('dinner.groupConv.compare_rooms.l1', [
  { when: {}, text: [
    `{subject.name} mentions her chair. {ref.name} mentions her fridge. It becomes a contest nobody wanted to lose.`,
    `{subject.name} starts it: the new lamp, the snack drawer. {ref.name} cannot let a room win unopposed.`,
    `They compare furniture like scores. You keep eating and let the floor recruit itself.`,
  ] },
]);
registerPool('dinner.groupConv.compare_rooms.l2', [
  { when: {}, text: [
    `They compare snack drawers like trophies. You stay quiet and let the floor do the recruiting.`,
    `{ref.name} wants to know who got the better bed. {subject.name} smiles like she already knows.`,
    `A fridge hum becomes gossip. Both of them lean in. The desserts have not even arrived.`,
  ] },
]);
registerPool('dinner.groupConv.compare_rooms.l3', [
  { when: {}, text: [
    `Dessert arrives. Both of them eat like the comparison is still running.`,
    `{subject.name} orders extra "for the room." {ref.name} does the same. Neither room will see it.`,
    `They toast the hall. The toast is really about who is getting softer faster.`,
  ] },
]);

registerPool('dinner.groupConv.floor_secret', [
  { when: {}, text: [
    '{dinner.groupConv.floor_secret.l1}\n{dinner.groupConv.floor_secret.l2}\n{dinner.groupConv.floor_secret.l3}',
    '{dinner.groupConv.floor_secret.l2}\n{dinner.groupConv.floor_secret.l1}\n{dinner.groupConv.floor_secret.l3}',
    '{dinner.groupConv.floor_secret.l1} {dinner.groupConv.floor_secret.l3}\n{dinner.groupConv.floor_secret.l2}',
  ] },
]);
registerPool('dinner.groupConv.floor_secret.l1', [
  { when: {}, text: [
    `You mention the hall after midnight. Both of them look at each other first, then at you.`,
    `"I walk late," you say. {subject.name} and {ref.name} do the small guilty smile of people who already knew.`,
    `After-hours comes up like a condiment. Neither of them pretends their door stays dark.`,
  ] },
]);
registerPool('dinner.groupConv.floor_secret.l2', [
  { when: {}, text: [
    `{subject.name}: "You walk."\n{ref.name}: "We knew."`,
    `{ref.name} kicks {subject.name} under the table. {subject.name} eats anyway. "He knocks. We answer."`,
    `{subject.name} shrugs one heavy shoulder. "The floor has hours. We keep them."`,
  ] },
]);
registerPool('dinner.groupConv.floor_secret.l3', [
  { when: {}, text: [
    `The next course lands. Nobody pretends this dinner is only dinner anymore.`,
    `They eat like the secret is a third guest, and a hungry one.`,
    `{ref.name} asks if you will knock tonight. {subject.name} answers by ordering dessert.`,
  ] },
]);
