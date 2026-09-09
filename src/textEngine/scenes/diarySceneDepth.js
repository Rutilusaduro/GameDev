// The Squad — Lead: A2 Psych | Support: A5 Editor
// Late-stage diary.innerBeat variants (stage 9–11). Loads after diary.js base pool.
import { registerModuleVariants } from '../engine.js';

const W = 4;

registerModuleVariants('diary.innerBeat', [
  { when: { studentId: 0, stageMin: 9 }, weight: W, text: [
    `I don't fit the bleachers anymore. I fit the command seat. The squad eats where I sit.`,
    `The uniform is memory. This body is policy. Coach called it presence. I call it winning.`,
  ]},
  { when: { studentId: 0, stageMin: 11, isImmobile: true }, weight: 5, text: [
    `They bring the spread to me now. I still keep score. The numbers are all winning.`,
  ]},
  { when: { studentId: 1, stageMin: 9 }, weight: W, text: [
    `The literature caught up. Three years late. I'm not waiting for peer review on my body.`,
    `I stopped citing the limitations. The data and I are in agreement. That's enough.`,
  ]},
  { when: { studentId: 2, stageMin: 9 }, weight: W, text: [
    `Wide shot only now. The algorithm learned what I am. I stopped fighting the frame.`,
    `No curation left. Just me, full screen, appetite honest. That's the whole channel.`,
  ]},
  { when: { studentId: 2, stageMin: 11, isImmobile: true }, weight: 5, text: [
    `They set the camera on a tripod. I don't move. The content comes to me. Views up.`,
  ]},
  { when: { studentId: 3, stageMin: 9 }, weight: W, text: [
    `I don't measure miles anymore. I measure how the ground receives me. Better metric.`,
    `Athlete body retired. Presence body hired. No regrets in either column.`,
  ]},
  { when: { studentId: 4, stageMin: 9 }, weight: W, text: [
    `The spring show hung my self-portrait center wall. Subject and artist same person now.`,
    `I've photographed everything on campus. The best composition is still me, getting larger.`,
  ]},
  { when: { studentId: 5, stageMin: 9 }, weight: W, text: [
    `Stream doesn't lag when I'm full. Chat calls it content. I call it Tuesday.`,
    `Boss fight: dessert tray. Cleared it. No cutscene. Just me and the respawn plate.`,
  ]},
  { when: { studentId: 6, stageMin: 9 }, weight: W, text: [
    `Hosted standing last year. Hosted sitting this year. Both were perfect parties.`,
    `The chapter eats more when I eat with them. That's not incidental. That's leadership.`,
  ]},
  { when: { studentId: 7, stageMin: 9 }, weight: W, text: [
    `Updated Column G again. Trend: excellent. I added a celebration row. Deserved.`,
    `The spreadsheet predicted this. I exceeded the prediction. Filed under: good problem.`,
  ]},
  { when: { studentId: 8, stageMin: 9 }, weight: W, text: [
    `The room comes to me now. I don't think that's wrong. I think that's finally right.`,
    `Hands on my stomach when I wake. Still there at lunch. Warm. Mine. Good.`,
  ]},
  { when: { studentId: 8, stageMin: 11, isImmobile: true }, weight: 5, text: [
    `I don't go to the room anymore. The room comes to me. Wrong stopped being the word for it.`,
    `Everything I need arrives. Everything I am is here. I don't need to go anywhere.`,
  ]},
  { when: { studentId: 9, stageMin: 9 }, weight: W, text: [
    `Called it civilization again. Still without irony. The portions finally match the vocabulary.`,
    `Third dinner out this week. I am fluent in American excess. C'est magnifique.`,
  ]},
  { when: { studentId: 10, stageMin: 9 }, weight: W, text: [
    `Midnight kitchen is still my studio. The pot is warm. The art is appetite. Both true.`,
    `I taste words slower now. Everything has texture. Including me.`,
  ]},
  { when: { studentId: 11, stageMin: 9 }, weight: W, text: [
    `No citations tonight. The feeling doesn't need a reference. It just is. Finally.`,
    `The growth chart is in the recycling. I'm working with better tools. They feel good.`,
  ]},
  { when: { studentId: 12, stageMin: 9 }, weight: W, text: [
    `The brackets took over the entry. Subject wanted more. Subject got more. Case closed.`,
    `Four paragraphs to say: I wanted more. I've known that for a while. Still true.`,
  ]},
  { when: { studentId: 13, stageMin: 9 }, weight: W, text: [
    `Read the body book to myself again. It still works. I'm not surprised anymore.`,
    `Your body is good and yours. I say it every week. Tonight I believed it without saying it.`,
  ]},
  { when: { studentId: 14, stageMin: 9 }, weight: W, text: [
    `Grandma's line again: heavy harvest, healthy land. My hands on my belly. Good crop.`,
    `This is what thriving looks like. I already knew. Everything else is confirmation.`,
  ]},
  { when: { studentId: 15, stageMin: 9 }, weight: W, text: [
    `I choose where I sit. Things come. The campus orbits. I don't chase anymore.`,
    `Hunting ended when waiting worked better. Same result. Less effort. Perfect.`,
  ]},
  { when: { studentId: 15, stageMin: 11, isImmobile: true }, weight: 5, text: [
    `I do not move. The world moves toward me — food, attention, the slow orbit of everything hungry.`,
    `Hunting ended when I became the place. I wait. Things arrive. The appetite is patient and vast.`,
  ]},
  { when: { studentId: 16, stageMin: 9 }, weight: W, text: [
    `Case conclusion revised: most successful experiment I've run. I intend to continue indefinitely.`,
    `The annotations became the hall log. The resident keeps revising protocol. The resident is me.`,
  ]},
  { when: { studentId: 17, stageMin: 9 }, weight: W, text: [
    `Field note: subject exceeds every prior find on site. Calipers insufficient. Pride sufficient.`,
    `Every dig has one artifact that reorganizes the site. I found mine. It was me the whole time.`,
  ]},
  { when: { studentId: 18, custom: false, stageMin: 9 }, weight: W, text: [
    `Lab scale maxed. Wrote the number twice. Drew a face. Column G trending excellent.`,
    `Build yield within spec. Personal yield exceeded spec. I like exceeding spec.`,
  ]},
  { when: { stageMin: 11, isImmobile: true }, weight: 3, text: [
    `I stopped going to things. Things come to me. Limitation became reach.`,
    `The world learned my address. So did appetite. Both visit often. I welcome both.`,
  ]},
]);
