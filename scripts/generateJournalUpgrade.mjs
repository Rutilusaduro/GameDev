// Unique per-page journal alts (existing depth.js repeats band lines 3×).
// Run: node scripts/generateJournalUpgrade.mjs
import { writeFileSync } from 'node:fs';
import { FEEDER_SUBJECT_JOURNALS, NADIA_SUBJECT_JOURNALS } from '../src/gameData/evolvedForms.js';

const OUT = 'src/textEngine/scenes/researchJournal/upgrade.js';

function esc(s) {
  return JSON.stringify(s);
}

function tooLong(s) {
  return [...s].length > 198;
}

// 11 unique page-pairs per archetype. First-person subject journal.
const FEEDER = {
  cheerleader: [
    ['First session leftovers sit under my skirt like a secret I keep touching.', 'Extra credit snacks. My tummy presses the waistband and I keep thinking about practice heat.'],
    ['Week two: the uniform zipper argues. I win by leaving it down a notch.', 'She praises a clean plate and my chest goes warm in the sports bra.'],
    ['I moaned with my mouth full and then laughed it off. I did not stop eating.', 'Hips bounce differently in the hallway. I count it like a new cheer.'],
    ['Two-hour feed. I cheered her on between bites. Championship talk, snack edition.', 'Panties leave a line I keep checking in the locker mirror.'],
    ['Gut rests on my thighs after dessert. I came from her hand on it. Filing that under sport.', 'I think about being stuffed the way I used to think about the next game.'],
    ['Walking makes everything slap. I like the sound more than the sprint I skipped.', 'She waddles over with more and I open like I am taking a handoff.'],
    ['Couch assist. I am a jiggling mess and I asked for ruin like a play call.', 'I stopped pretending this is only thesis hours. Go bigger.'],
    ['I sit more than I stand. Every wobble is a scoreboard I refuse to reset.', 'She buries her face in my belly and I treat it like a win.'],
    ['A few steps and I am panting from size, not drills. I want the next plate anyway.', 'Colossal press of her against me. I finish because finishing is the routine.'],
    ['I need help shifting. She rubs rolls and feeds. I tell her to keep pumping me up.', 'Biggest star on the roster, if the roster is softness.'],
    ['Reinforced bed. Helpless cheer voice begging for more. Best decision I ever yelled.', 'I exist for feeding and her hands. Pom-poms are furniture now.'],
  ],
  bookworm: [
    ['Consent logged. Mild press at the waistband. Fullness reads as reward, inconveniently.', 'First snacks were calculated. The warmth when she watches me is not in the protocol.'],
    ['Shirts fit differently. I trace the new curve and call it body-schema data.', 'Praise after compliance produces heat I keep writing down as if that makes it safer.'],
    ['Rounded belly, thighs brushing. I moaned and then tried to footnote the moan.', 'Resistance is thinning faster than my models allowed. I still want the next session.'],
    ['Two hours of plates. I whispered more like a subject I used to study from outside.', 'Boyish lines are padding over. I am documenting the surrender in real time.'],
    ['Orgasm from pressure plus praise. Reward centers rewired. Case study: willing.', 'Gut on thighs after dessert. I think about expanding more than I think about citations.'],
    ['Movement costs more. She murmurs observations while filling me. Mind goes quiet.', 'Helpless fullness dissolves the remaining inhibitions I was pretending to keep.'],
    ['Couch assist. Textbook conditioning. I asked her to keep going in scholarly quiet.', 'I do not pretend this is only methodology. I need fatter data. I need me fatter.'],
    ['Mostly seated. She worships pounds I used to treat as variables.', 'Analytical mind clocked out. Fetish clocked in. I crave the overfilled feeling.'],
    ['A few steps leave me huge and happy. Her body into mine and I finish from size alone.', 'Ultimate case study fantasy: lose the outline, keep the appetite.'],
    ['Help to shift. Hours of rubbing and feeding. I want the limit pushed, not cited.', 'Nearly immobile. Turned on by scale. Do not stop the experiment.'],
    ['Reinforced bed. Scholarly voice begging. Perfect subject, hers.', 'I exist for plates and her hands in the softness I used to measure.'],
  ],
  influencer: [
    ['Bloat vs crop top. Brand panic, extra-credit logic, heavy-eyed watching I cannot crop out.', 'First sessions soften the waist I built a following on. I keep eating anyway.'],
    ['Tiny waist arguing with a new curve. I poke it between takes and stay for the next plate.', 'She leans in with more. I tell myself it is content. My bra disagrees.'],
    ['Designer jeans lose. I moaned on accident and got mad at the honesty.', 'Thighs rub and ruin the walk I used to sell. I still finish the snacks.'],
    ['Two-hour stuff. I complained about my figure with my mouth full. Dramatic arc incoming.', 'Hourglass shifting. I am spinning glow-up language while getting plushier.'],
    ['Gut on thighs. Wet and upset in the same hour. Followers would need a caption I do not have.', 'Favorite panties threaten. I am still thinking about engagement. I am also thinking about dessert.'],
    ['Something flipped. Wobble feels good. She calls my curves a masterpiece and I soak through.', 'Rebrand draft: bigger on purpose. I want her to keep making me heavier.'],
    ['Couch assist. I came hard and asked her to ruin the old body. New niche unlocked in my head.', 'I do not care about the thesis label. I need fatter, on camera later.'],
    ['Mostly down. I tease growth in careful angles. She moans into my belly. Brand: this.', 'Huge and happy. Stuffed beyond full is the only metric I check.'],
    ['Vast apron, panting walk, finish from being this fat against her. Internet can wait.', 'I want to lose the old silhouette in public eventually. Tonight I want another plate.'],
    ['Help shifting. She talks about my exaggerated hourglass like a campaign. I agree.', 'Pump me up. Biggest following I will ever have is this body.'],
    ['Bed-bound softness. Breathy influencer voice begging. I exist for the feed.', 'Helpless, enormous, hers — and I already know the thumbnail.'],
  ],
  athlete: [
    ['Credit hours. Core softer after sessions. I poke the curve angry, then hungry.', 'Defined lines blurring. I treat feeding like a workout I did not program.'],
    ['Speed off, appetite on. Waistband is the new tape measure.', 'She feeds me like training. My body answers with jiggle I keep replaying.'],
    ['Roundness replacing the tight look. I hate how good it feels after.', 'I finish extra sets of bites the way I used to finish extra laps.'],
    ['Two-hour feed. I am supposed to be conditioned. I am conditioned to open.', 'Muscle memory now means chewing. I am not turning around at the door.'],
    ['Gut on the thighs I used to time. Praise on my belly and I am gone.', 'Sport is eating. I want heavier the way I used to want a PR.'],
    ['Out of breath from size, grinning. She waddles over with more. I take the handoff.', 'Wobble is the new plyometric. I am obsessed with the weight.'],
    ['Couch assist. I asked for trophy weight like I used to ask for another set.', 'Round and loud about it. Performance is a clean plate.'],
    ['Seated edition. Every wobble scores. She worships the mass I used to cut.', 'I queue the next session early. Soft is the build.'],
    ['A few steps. I finish from being pressed and full. Records retired themselves.', 'I want raid-sized portions. Body is the field now.'],
    ['Help to move. Feed me until I am the heaviest thing in the weight room.', 'Immobile goal: stuffed, kept, winning on a different board.'],
    ['Bed. Sphere of softness. Movement optional. Feeding mandatory.', 'Trophy weight achieved and I still want the next plate.'],
  ],
  artsy: [
    ['Living-art pitch. Straight lines blur. I sketch the new curve before I admit I like it.', 'Bloat distorts the silhouette I prized. The page wants the distortion.'],
    ['Composition shifting at the waist. I keep the sitting pose longer after she feeds me.', 'She treats plates like ritual. I treat my middle like wet clay.'],
    ['Resistance is bad composition. I lean into the softer palette.', 'Thighs brush. I draw that line twice.'],
    ['Two hours of sitting still and taking. The work is happening on me.', 'I whispered more and meant it as an aesthetic decision.'],
    ['Gut as form. Her hand is a brush. I finish the session soaked and pleased with the draft.', 'I want excess the way a canvas wants more paint.'],
    ['Wobble in the studio light. I like the motion study.', 'She praises the growing body. I blush and keep the pose: eating.'],
    ['Couch assist. I asked to be overwhelmed on purpose.', 'Moaning between bites feels like the honest medium.'],
    ['Mostly still. Masterpiece talk. I want the scale to keep climbing.', 'She worships pounds I am composing in real time.'],
    ['A few steps through the studio. I finish from fullness. Feed the canvas.', 'Vastness is the only composition that still interests me.'],
    ['Help shifting. I dissolve into softness and call it finished work.', 'Immobile form. Hands in the fat. Keep going.'],
    ['Bed as plinth. I exist to be added to.', 'Pure surrendered form. More, please, as a material request.'],
  ],
  eced: [
    ['Field hours, then snacks. Soft middle presses the shirt I wear to class.', 'Nurture curves getting fuller. I call it unprofessional and keep eating.'],
    ['Lap is already a better chair. I notice after she feeds me.', 'Warmth when she praises a clean plate feels like being taken care of.'],
    ['Kindergarten-me would blink at this waist. I still open for the next bite.', 'Hips, chest, belly all louder. Ashamed and warmed in the same breath.'],
    ['Two-hour feed. I want to be held the way I hold everyone else.', 'Maternal softness exaggerated. I am leaning into the pillow of myself.'],
    ['Gut on thighs. She feeds me like care. I want endless care.', 'I think about being this soft in a room full of people who need warmth.'],
    ['Wobble feels comforting. I blush and ask for more butter anyway.', 'She rubs my middle like a goodnight. I stay.'],
    ['Couch assist. Soft motherhood talk I am no longer correcting.', 'I want to be kept full. Care plan I wrote for myself, signed.'],
    ['Mostly sitting. Pillowy. Meant to be held and filled.', 'She worships the mom-bod I used to hide under cardigans.'],
    ['A few steps. I finish happy and huge. Sanctuary is a stuffed body.', 'Feed your good girl. I said it in my head and meant me.'],
    ['Help moving. Vast, stuffed, blissfully unused for anything but warmth.', 'I exist to be soft and kept. More, please.'],
    ['Bed. Immobile comfort object. Hands and plates, nothing else.', 'I am the lap now. Forever is fine.'],
  ],
  overachiever: [
    ['Variable: abdominal softening. Other metrics still green. I am annoyed I like the gold column.', 'Portions excessive, compliance perfect. Arousal logged in the margin.'],
    ['Planner has a gain column in gold. I saw it and nodded.', 'Efficiency dipping. Appetite rising. I finish plates like assignments.'],
    ['Thighs touch. Inefficiency noted. Pleasure also noted. I did not correct the pleasure.', 'Top marks on every extra helping. I hate how that sentence excites me.'],
    ['Two-hour feed treated like a lab block. I want the score to climb.', 'I am optimizing for mass and pretending it is still a side quest.'],
    ['New priority written down: maximize gain. I beg quietly for larger portions.', 'Breasts and belly leading the dashboard. I intend to break the personal record.'],
    ['Wobble during a walk across campus. I filed it under successful trial.', 'She praises the trendline. I eat to keep the color gold.'],
    ['Couch assist. Competitive need, no citation required.', 'I asked to be the largest dataset in the room.'],
    ['Seated excellence. She worships the numbers I used to hide.', 'I queue sessions like office hours I will not miss.'],
    ['A few steps. I finish from being full and ranked first in my own sheet.', 'Peak performance is a stuffed, heavy body I refuse to taper.'],
    ['Help shifting. Stuff me past every prior limit. Assignment accepted.', 'Immobile excellence. Do not stop until the column runs out of paper.'],
    ['Bed. Helpless mass. Largest dataset. Continue.', 'I exist for the next recorded pound and her hands checking the work.'],
  ],
  sorority: [
    ['Sisters will notice the top-heavy soften. Panic, then snacks anyway.', 'Waist less tiny. Boobs heavier. Ugh, and also hmm.'],
    ['Formal-pic math is already ugly. I still open when she feeds me.', 'Hourglass climbing north. I complain and finish the plate.'],
    ['Thong lines. I moaned and then made a joke nobody bought.', 'Chapter would have opinions. I have a second helping.'],
    ['Two-hour feed. Humiliating, hot, done on purpose.', 'I am ruining the look I ran the house on. I keep going.'],
    ['Gut on thighs. She worships the chest first. I am soaked and late to nothing.', 'Sorority can wait. This session cannot.'],
    ['Wobble in the chapter hallway. I liked being looked at too long.', 'She stuffs me and I stop performing restraint for an audience I invented.'],
    ['Couch assist. Huge tits, soft belly, I am into it. More.', 'Queen energy, seated. Feed the president.'],
    ['Mostly down. Chapter title is unofficial and heavier.', 'She spends the hour on my chest and gut. I allow the agenda.'],
    ['A few steps, panting, finished from size. Immobile chapter head in training.', 'I want fullness and her hands. Minutes can be tabled.'],
    ['Help moving. Enormous, top-heavy, mine to enjoy.', 'Keep pumping. The house will adjust seating.'],
    ['Bed. I exist for stuffing and praise on this chest.', 'Helpless, huge, hers. Best rush I ever ran.'],
  ],
  transfer: [
    ['Mon dieu, credits for this. Apple middle rounding into blouses from home.', 'Soft belly, irritated poise. I still cleaned the plate.'],
    ['Clothes from Paris lose. I poke the middle and stay for the next course.', 'She feeds me like ceremony. I call it American portions and open anyway.'],
    ['Love handles. Resistance faiblit. Fullness sits sensual in the center.', 'French posture, louder waist. I am mostly pretending to be annoyed.'],
    ['Two hours. J\'adore is getting closer to the truth than I told Maman.', 'Core swelling. I asked for plus without translating it.'],
    ['Belly leading every doorway. I am wet and particular about seconds.', 'She presses my middle. I stop performing restraint in two languages.'],
    ['Wobble feels like belonging here. I want the middle bigger.', 'Plus de nourriture. I said it out loud. I meant it.'],
    ['Couch assist. Monument talk. I agreed in French and English.', 'I want my center immense. The booth in the dining hall already knows.'],
    ['Mostly seated. Apple perfected on purpose. Feed me.', 'She worships the gut I used to hide under tailored things.'],
    ['A few steps. I finish ecstatic and round. Plus encore.', 'Immobile fantasy: stuffed middle, no itinerary.'],
    ['Help shifting. Immense soft center. Do not stop.', 'I am the feast I crossed an ocean to study.'],
    ['Bed. Apple monument. I exist for more.', 'Helpless, heavy, hers. C\'est merveilleux.'],
  ],
  quiet: [
    ['I agreed without a speech. Fullness sits like a secret I keep a hand on.', 'I write the bloat down instead of saying it. The page is warmer than I am.'],
    ['I anticipate her door. Softness shows. I blush and eat.', 'She is patient. My body answers first. I let it.'],
    ['Thighs brush. I do not announce it. I finish the plate.', 'The secret is getting harder to keep and easier to want.'],
    ['Two hours of quiet chewing. I whispered more once. It was enough.', 'I want her to understand without making me perform a paragraph.'],
    ['Gut on my lap. Wanted weight. I keep my voice small and my mouth busy.', 'She rubs my belly. I make a sound I will not transcribe.'],
    ['Wobble in the stacks. I sat down and stayed.', 'I queue the next visit in my head all week.'],
    ['Couch assist. I asked with my eyes. She knew.', 'Moans when she feeds me. Quiet is a costume I am retiring.'],
    ['Mostly still. Hands, hunger, no speech required.', 'She worships pounds I will not name in public.'],
    ['A few steps. I finish from being held and full.', 'Too vast for small talk. The plate does the talking.'],
    ['Help moving. Silence that means keep going.', 'Immobile softness. I want nothing else on the calendar.'],
    ['Bed. Fed in quiet that is not empty.', 'I exist for her hands and the next bite. End of letter.'],
  ],
  gamer: [
    ['AFK for sessions. Hoodie fights a new gut. Warmth when she watches is a buff I did not install.', 'Study loot is snacks. Tight waistband. I still queue the next night.'],
    ['I skip a match to stay at the plate. Soft build loading.', 'She feeds between games I am not launching. Optimal.'],
    ['Belly level up. I poke it in the chair and grin at the monitor I ignored.', 'Grind is calories. I am early to the session like it is raid night.'],
    ['Two-hour feed. Pants are the boss fight. I am not rage-quitting.', 'I murmur more like it is voice chat only she can hear.'],
    ['Gut on thighs in the chair that already knows me. I want raid-tier portions.', 'She praises the mass. I treat it like a clear.'],
    ['Wobble to the kitchen and back. I liked the load time.', 'Soft is the spec. I will not roll back the patch.'],
    ['Couch assist. I asked for the heavy build out loud.', 'Hard chair, soft me. Keep the drops coming.'],
    ['Mostly parked. She worships the gut under the hoodie.', 'I want endless portions. Movement is optional DLC.'],
    ['A few steps. I finish from being stuffed and still. Perfect run feeling.', 'Queue next. I am not leaving this instance.'],
    ['Help shifting. Immobile blob energy I am not joking about.', 'Feed the player. I exist for the next plate.'],
    ['Bed. Cannot move, only eat. I would rate this session five stars.', 'Hers. Soft. Done and not done.'],
  ],
  psych: [
    ['Irony logged: psych major, feeder subject. Bloat after session, intellectually messy.', 'I analyze appetite while chewing. Fullness feels peer-reviewed and private.'],
    ['I keep coming back. Softness shows. Models did not budget for how warm that is.', 'She feeds. I take notes I will not show a committee.'],
    ['Counter-transference possible. I lean in anyway. Body over theory tonight.', 'Resistance collapsing on a curve I would have circled in someone else\'s paper.'],
    ['Two hours. I whispered more and called it data collection.', 'Arousal statistically obvious. I stopped pretending the p-value mattered.'],
    ['I want the experiment to win. Belly heavy, mind quieter.', 'Case study is me, softer, asking. Ethics can wait in the hallway.'],
    ['Wobble across the quad. I filed it as confirmation.', 'She praises the yield. I eat like the hypothesis is already loved.'],
    ['Couch assist. I asked to be the living fetish data.', 'Theory ends when the plate is empty. I want another plate.'],
    ['Mostly seated. She worships the body I used to keep in third person.', 'I crave stuffed stillness. Observation is participation.'],
    ['A few steps. I finish from being this fat in her arms.', 'Feed me until the inner narrator shuts up.'],
    ['Help moving. Immobile, overstuffed, blissful. Continue the study.', 'I exist for feeding. That sentence used to be a joke in the margin.'],
    ['Bed. Thought stops. Hands and plates.', 'Hers. Soft. The only thesis that still holds.'],
  ],
  nursing: [
    ['Clinical hours, then this. Scrubs pull at the middle. I call it worry and stay.', 'Caregiver body softening. Fullness after her feeding feels like being tucked in.'],
    ['I nurture everyone. She nurtures me with calories. I keep the night anyway.', 'Soft belly under scrubs. I anticipate the next visit like a scheduled comfort.'],
    ['I like being the patient who finishes. Unprofessional sentence. I kept it.', 'She rubs my middle after. I sound grateful out loud.'],
    ['Two-hour feed. Warm, heavy, maternal fat I am no longer charting away.', 'I want more care through food. I wrote it like a note to self.'],
    ['Gut on thighs. Comfort-object fantasy arriving early.', 'She feeds me the way I feed other people. I let the roles swap.'],
    ['Wobble in the corridor. I smiled at a doorway that felt narrower.', 'I queue softness. I want to be kept full after my shift.'],
    ['Couch assist. I asked to be nursed in the other direction.', 'Vast plan: immobile, stuffed, attended. I approve my own care.'],
    ['Mostly down. She worships the body I used to hide under a badge.', 'I moan gratitude and mean the next plate too.'],
    ['A few steps. I finish held and huge. Ultimate comfort is me.', 'Feed without end. I will not write a decline note.'],
    ['Help moving. Enormous, warm, kept.', 'I exist to be soft and full. Sign the chart closed.'],
    ['Bed. Immobile and nursed. Hands, plates, hush.', 'Hers. This is the aggressive self-care I keep choosing.'],
  ],
  farm_girl: [
    ['City study, country appetite. Flannel tight over a new soft belly.', 'Homestyle portions. Fullness sits honest. I keep a hand on it.'],
    ['Harvest metaphor getting less metaphor. She feeds me like Sunday dinner.', 'Hips widening. Pride and hunger shake hands. Hunger stays for coffee.'],
    ['I blush when she praises the growing body. I still take the extra butter.', 'Thickening on schedule with the season in my head.'],
    ['Two hours. Round as dough. More butter, more me.', 'I want the table to keep coming the way the garden keeps coming.'],
    ['Gut on thighs. Ripe is the word I already used once in a window.', 'She talks to my middle like livestock she loves. I allow it.'],
    ['Wobble down a hall. I liked being the heaviest thing in it.', 'Feed the farm in me. I thought it and did not take it back.'],
    ['Couch assist. Barn-scale talk. I grinned.', 'I asked for stuffed bliss like I ask for seconds at home.'],
    ['Mostly seated. She worships harvest weight.', 'I am the feast. Write that on the barn door.'],
    ['A few steps. I finish warm and huge. Land bearing.', 'Immobile Sunday. Keep the gravy coming.'],
    ['Help moving. Soft livestock energy I am not ashamed of tonight.', 'Feed me like the whole farm showed up hungry.'],
    ['Bed. Immobile, stuffed, blessed. Hands in the dough of me.', 'Hers. Ripe. Left on the vine on purpose.'],
  ],
  culinary: [
    ['I know good food. Sessions leave me bloated. Professionally offended. Privately pleased.', 'Tasting slid into gorging. Jacket strains. Palate is delighted.'],
    ['I critique with my mouth full. Soft belly was not on the mise en place.', 'She plates me like service. I return metal, hungry eyes.'],
    ['Second seating in one night. I called it quality control.', 'Waist is an ingredient I did not budget. I keep adding fat anyway.'],
    ['Two hours. Tasting-menu portions forever, please.', 'I want to be rich, saucy, overstuffed. Kitchen closed, I am open.'],
    ['Gut on thighs. I am the banquet. I said it in chef voice.', 'She feeds. I moan like the dish landed.'],
    ['Wobble through the test kitchen. I liked the yield.', 'More courses. I am the menu in progress.'],
    ['Couch assist. I asked to be plated until I cannot stand the pass.', 'Round, grateful, done with restraint as a technique.'],
    ['Mostly seated. She worships the body I used to keep behind the line.', 'Immobile feast fantasy. Feed the chef.'],
    ['A few steps. I finish savory-soft and huge.', 'Endless courses, endless me. Fire that ticket.'],
    ['Help moving. Vast. I exist to be served.', 'Keep sending food. I will not send any back.'],
    ['Bed. I am the menu. Hands and plates.', 'Hers. Soft. Last seating that never ends.'],
  ],
};

const NADIA_PAGE = [
  ['First night: pasta, bread, a rounded goodbye under her shirt.', 'Session one leftovers sat warm when I hugged her out the door.'],
  ['Week two, clothes already arguing. I kept my hands on the new curve.', 'Second visit, I felt the yield start and did not rush the notes.'],
  ['She moaned on a mouthful. I smiled and poured more.', 'Third week, thighs talking. I catalogued the sound.'],
  ['Two-hour feed. She asked for more between swallows.', 'Long sitting. I watched her middle decide to stay.'],
  ['Dessert hour. My hand on her gut finished her. I wrote that down twice.', 'She left heavier. I stayed hungry in a way notes cannot hold.'],
  ['Wobble when she stood. I praised it like data I loved.', 'She is taking up the chair I wanted her to outgrow.'],
  ['Couch assist. She asked me not to stop. I did not.', 'Helping her sit felt like the study becoming a vow.'],
  ['Mostly down now. I worshipped the pounds out loud.', 'I fed her until talking became chewing.'],
  ['A few steps from her, panting from size. I wanted the next plate in her.', 'She finishes against me. I feel the growth like heat.'],
  ['Help to shift her. I rubbed rolls and kept the spoon moving.', 'Nearly kept. I am not writing an end date.'],
  ['Bed scale. She begs in her own voice. I exist to keep filling it.', 'Immobile together is the design. I keep adding.'],
];

const NADIA_LEVEL = [
  ['I kept the feeding steady and close.', 'I held her after and felt promise in the give.'],
  ['I pushed past polite portions on purpose.', 'Impatient hunger made me generous and sure.'],
  ['From the bed I fed her and grew through her plates.', 'Immobile, I used her appetite as my own motion.'],
];

const NADIA_ARCH = {
  cheerleader: ['Pom-poms can wait; that waist is already softening.', 'Uniform math is losing to her middle.'],
  bookworm: ['She still tries to footnote the moan. I do not.', 'Linear frame padding over — I am keeping every page.'],
  influencer: ['Brand panic makes her chew prettier. I keep plating.', 'Hourglass content is becoming mass content.'],
  athlete: ['The gym lost. I am the new coach.', 'PR is a clean plate I intend to keep raising.'],
  artsy: ['She sketches the curve; I add the calories.', 'The composition I wanted is sitting in my lap.'],
  eced: ['She wants to be the lap. I am making her one.', 'Care language covers how hard I am feeding her.'],
  overachiever: ['Gold column, my handwriting in the margin.', 'She treats mass like a metric. I am the assignment.'],
  sorority: ['Chapter seating will have to move. Good.', 'Top-heavy yield. I praise the chest she hides in public.'],
  transfer: ['American portions, French blush. I keep pouring.', 'That apple middle is the whole study now.'],
  quiet: ['She writes it down. I feed the silence.', 'Small voice, huge appetite. I protect both.'],
  gamer: ['She skips matches for me. Soft build, my patch.', 'Hoodie gut. I queue her next plate like a night raid.'],
  psych: ['She knows the dynamic and stays. Delicious.', 'Peer review can wait in the hall. I have a subject.'],
  nursing: ['She keeps trying to care. I make her the patient.', 'Scrubs lose. I tuck food into her like a blanket.'],
  farm_girl: ['Harvest talk. I am the weather.', 'Sunday-dinner portions on a weeknight. On purpose.'],
  culinary: ['She knows flavor. I know volume.', 'The chef is becoming the banquet. I plate her.'],
};

const NADIA_INTRO = {
  cheerleader: [
    ['I picked the cheer waist on purpose. I want it gone slowly, under my hands.', 'Hourglass still tight. My belly already knows the ending I wrote.'],
    ['Slim bothers me. The study is cover for making her heavy enough to match me.', 'I want that uniform wrecked by softness I put there.'],
    ['I am the bed now. She will swell until she can press me properly.', 'Immobile hunger: grow her, feel her, keep her.'],
  ],
  bookworm: [
    ['I chose the linear one. I want the notes to fail in the best way.', 'She will call it data. I will call it yield.'],
    ['Her restraint is a variable I intend to spend.', 'I want her padded out of that boyish outline.'],
    ['From this bed I will write her bigger than her margins.', 'She will footnote the moans. I will keep feeding.'],
  ],
  influencer: [
    ['I chose the brand. I want the brand to lose to a belly.', 'Crop-top girl. I am already planning the angles she will hate, then love.'],
    ['Her panic is useful. I will feed through it.', 'Hourglass as product. I am the recall.'],
    ['Immobile, I will grow a following on her body.', 'She will beg on camera later. Tonight I write the menu.'],
  ],
  athlete: [
    ['I chose the trained waist. I want it soft.', 'Gym girl. I am the off-season she will not leave.'],
    ['Conditioning will mean opening her mouth.', 'I want trophy weight that cannot sprint.'],
    ['From the bed I coach plates, not laps.', 'She will thank me when standing is optional.'],
  ],
  artsy: [
    ['I chose the one who looks at bodies. I will make her one.', 'Studio girl. The best work will happen at my table.'],
    ['She thinks in line. I think in mass.', 'I want the sketch to lose to the flesh.'],
    ['Immobile muse-maker. I feed the canvas until it cannot walk.', 'From the bed I add mass she will have to paint later.'],
  ],
  eced: [
    ['I chose the soft-voiced one. I want her softer.', 'She already knows how to hold. I will teach her how to be held.'],
    ['Care is my cover. Calories are the lesson.', 'I want a lap that never empties.'],
    ['From the bed I will make a sanctuary too big to leave.', 'She will call it comfort. I will keep pouring.'],
  ],
  overachiever: [
    ['I chose the planner. I want a gold column that only goes up.', 'She will optimize the gain I assign.'],
    ['Metrics excite her. I will give her a cruel, lovely metric.', 'I want her competitive about mass.'],
    ['Immobile advisor. The assignment is endless portions.', 'She will beg for extra credit I invented.'],
  ],
  sorority: [
    ['I chose the house face. I want the house to stare.', 'Top-heavy already. I will finish the job.'],
    ['Chapter opinions are seasoning.', 'I want her too big for the formal lineup.'],
    ['From the bed I crown her in fat.', 'She will run minutes from a chair I filled.'],
  ],
  transfer: [
    ['I chose the one who still dresses for another country.', 'Apple middle. I will make it the whole map.'],
    ['Two languages of protest. One mouth. I win.', 'I want her too round for the old blouses.'],
    ['Immobile host. I will feed her until home is this room.', 'Plus encore is the only note I need.'],
  ],
  quiet: [
    ['I chose the one who will not make a speech. Perfect.', 'I can feed a silence until it moans.'],
    ['Her pages will tell on her. I will keep the spoon moving.', 'I want a vast quiet I can hold.'],
    ['From the bed I write her bigger than her voice.', 'She will not need words. I will still understand more.'],
  ],
  gamer: [
    ['I chose the one who lives in a chair already.', 'Soft build. I am the patch she will not roll back.'],
    ['Matches can wait. Plates cannot.', 'I want her parked and huge.'],
    ['Immobile co-op. I feed; she grows; we do not leave the instance.', 'Queue is one word: more.'],
  ],
  psych: [
    ['I chose a colleague-shaped mind. Delicious conflict.', 'She knows the map and will walk it anyway.'],
    ['I will make her the case she used to cite.', 'Awareness will not save her waist.'],
    ['From the bed I am the method.', 'She will drop the third person when she begs.'],
  ],
  nursing: [
    ['I chose the caretaker. I will put her on the other side of the bed.', 'Scrubs lose. I have time.'],
    ['She will call it self-care. I will call it mine.', 'I want her too warm and heavy to clock in.'],
    ['Immobile patient who feeds. The joke is the point.', 'She will approve her own ruin in neat handwriting.'],
  ],
  farm_girl: [
    ['I chose harvest sense. I will be the weather.', 'Flannel already tight. Good.'],
    ['Sunday portions every night. I want her ripe on purpose.', 'She will bless the weight I add.'],
    ['From the bed I keep the table coming.', 'Livestock softness. Loved. Fed. Kept.'],
  ],
  culinary: [
    ['I chose the palate. I will bury it in volume.', 'She knows when food is good. I know when it is enough — never.'],
    ['Service reversed. I plate her.', 'I want the chef too stuffed to stand the pass.'],
    ['Immobile last seating. She is the menu.', 'I keep sending courses. She will not send them back.'],
  ],
};

const lines = [
  '// The Squad — Lead: A2 Psych | Support: A5 Editor',
  '// Auto-generated — run: node scripts/generateJournalUpgrade.mjs',
  '// Unique per-page / per-level journal alts (weight 6 so they surface over band repeats).',
  "import { registerModuleVariants } from '../../engine.js';",
  '',
];

let n = 0;
const seen = new Set();

function pushPair(key, texts, weight = 6) {
  const clean = texts.filter((t) => t && !tooLong(t));
  if (!clean.length) return;
  for (const t of clean) {
    if (seen.has(`${key}::${t}`)) throw new Error(`dup ${key}: ${t}`);
    seen.add(`${key}::${t}`);
  }
  lines.push(`registerModuleVariants(${esc(key)}, [{ when: {}, weight: ${weight}, text: [${clean.map(esc).join(', ')}] }]);`);
  n += 1;
}

for (const [arch, entries] of Object.entries(FEEDER_SUBJECT_JOURNALS)) {
  if (!Array.isArray(entries)) continue;
  const pages = FEEDER[arch];
  if (!pages) continue;
  entries.forEach((text, page) => {
    if (!text || !pages[page]) return;
    pushPair(`journal.feeder.${arch}.s${page}`, pages[page]);
  });
}

for (const [arch, journal] of Object.entries(NADIA_SUBJECT_JOURNALS)) {
  if (!journal) continue;
  const intros = NADIA_INTRO[arch];
  const hooks = NADIA_ARCH[arch];
  if (!intros || !hooks) continue;
  const introList = Array.isArray(journal.intro) ? journal.intro : [journal.intro];
  introList.forEach((text, level) => {
    if (!text || !intros[level]) return;
    pushPair(`journal.nadia.${arch}.intro.l${level}`, intros[level]);
  });
  (journal.entries || []).forEach((row, page) => {
    if (!row || !NADIA_PAGE[page]) return;
    [0, 1, 2].forEach((level) => {
      if (!row[level] || !NADIA_LEVEL[level]) return;
      const a = `${NADIA_LEVEL[level][0]} ${NADIA_PAGE[page][0]} ${hooks[0]}`;
      const b = `${NADIA_LEVEL[level][1]} ${NADIA_PAGE[page][1]} ${hooks[1]}`;
      pushPair(`journal.nadia.${arch}.s${page}.l${level}`, [a, b]);
    });
  });
}

writeFileSync(OUT, `${lines.join('\n')}\n`);
console.log(`generateJournalUpgrade: ${n} pools → ${OUT}`);
