// Per-student post-weigh-in dialogue — varies by stage band, corruption, mood.
import { getStage } from './stages.js';
import { getCorruptionTier } from './corruption.js';
import { pick } from '../textEngine/engine.js';

export function weighInStageBand(stageId) {
  if (stageId <= 2) return 'light';
  if (stageId <= 5) return 'rounded';
  if (stageId <= 8) return 'heavy';
  return 'vast';
}

function moodTag(s) {
  const m = s.mood || 'content';
  const tags = {
    happy: 'She sounds almost buoyant despite everything.',
    stressed: 'The number lands on top of everything else she is carrying this week.',
    tired: 'She says it through a yawn she does not quite hide.',
    nervous: 'Her voice pitches up half a note on the last word.',
    excited: 'There is a spark in it — like the number is another thing to win at.',
    focused: 'Clinical. Measured. Already filing it away.',
    content: 'Warm. Unhurried. Like she has made peace with the moment.',
    bemused: 'Dry amusement threads through every syllable.',
    warm: 'Soft and open, the way she is with everyone she cares for.',
    observant: 'She watches your face more than she watches the scale.',
    cheerful: 'Bright as sunlight through a kitchen window.',
  };
  return tags[m] || '';
}

const BUILDERS = {
  0: (s) => { // Brittany — cheerleader
    const lbs = Math.round(s.lbs), band = weighInStageBand(getStage(s.lbs).id), cor = getCorruptionTier(s.corruption || 0).id;
    if (band === 'light') {
      if (cor === 0) return `"${lbs}?" ${s.name} plants her hands on her hips and squints at the dial like it personally offended her squad. "That's — okay, that's fine. Probably muscle. Definitely not the dining hall." She tugs her waistband once, checks her reflection in the office window, and decides the number doesn't get to ruin her day. ${moodTag(s)}`;
      if (cor === 1) return `${s.name} reads the number and exhales through her nose. "${lbs}. Moving." She runs her thumb along the soft new curve at her hip — not hiding it anymore, just accounting for it. "I've been eating like we're in postseason. Makes sense." She meets your eyes. "Don't look at me like you're keeping score. I'm keeping score." ${moodTag(s)}`;
      return `"${lbs}!" ${s.name} grins and does a little hip-check in place, watching the soft give of her thighs. "Up again. Good." She pats her stomach once, affectionate, like congratulating a teammate. "Coach would lose his mind. I don't care. This is the best shape I've ever been in." ${moodTag(s)}`;
    }
    if (band === 'rounded') {
      if (cor === 0) return `${s.name} stares at ${lbs} lbs for a long beat. Her rounded belly pushes softly at her top when she breathes. "It's the food here," she says, unconvincing even to herself. "Different portions. Different everything." She smooths her waistband down over the thickening curve of her hips. "I'll cut back. Probably. After midterms." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}," ${s.name} says, and nods like she's accepting a challenge. Her plump thighs press together when she shifts her weight; her belly rests warm and visible above her waistband. "Every week it's more. I can feel it when I walk — everything moves different." She doesn't sound upset. She sounds like an athlete reading stats. "Fine. New baseline." ${moodTag(s)}`;
      return `${s.name} looks at ${lbs} and smiles slow and satisfied. Her thick body sways when she steps back — belly rounding forward, ass and hips plush and heavy behind her. "That's what I wanted," she says simply. "More of me. Every week, more." She runs both hands down her sides, feeling the weight settle. "Keep it coming." ${moodTag(s)}`;
    }
    if (band === 'heavy') {
      if (cor === 0) return `${s.name} reads ${lbs} and goes quiet. Her heavy belly hangs forward, soft and warm, swaying when she shifts. "That's a lot," she admits, voice smaller than usual. "I used to know exactly what I weighed. Now I just…" She presses a palm to the round swell of her stomach. "Now I feel it before I see it." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}." ${s.name} breathes out, steady. Her fat body fills more of the office than it used to — thick arms, heavy thighs rubbing with every step, belly resting solid against her lap when she sits back down. "I'm not pretending anymore. This is what I am now." She looks at you. "And I'm still winning at it." ${moodTag(s)}`;
      return `At ${lbs} lbs, ${s.name} laughs — deep, warm, unselfconscious. Her vast soft belly shifts and settles when she moves; everything jiggles and sways with lazy confidence. "Beautiful," she says, and she means herself. "You see it too, right? All of this?" She spreads her hands over the heavy round of her middle. "I'm not done." ${moodTag(s)}`;
    }
    if (cor === 0) return `${s.name} stares at ${lbs} until the number stops being abstract. Her enormous body barely fits the space between desk and door — soft flesh pooling warm wherever she settles. "I can't…" She trails off. The scale has said what it will say. ${moodTag(s)}`;
    if (cor === 1) return `"${lbs}." ${s.name} nods once, vast and matter-of-fact. Immobile abundance presses at every edge of the room; her belly spreads wide and heavy, breasts and thighs merged into one warm landscape of softness. "Still growing," she says. Not a complaint. A status report. ${moodTag(s)}`;
    return `${s.name} reads ${lbs} and smiles like the number is an old friend. Her impossible mass shifts — slow, seismic, warm — and the air in the office changes temperature around her. "Thank you," she says, and she is not talking to the scale. ${moodTag(s)}`;
  },

  1: (s) => { // Madeline — bookworm
    const lbs = Math.round(s.lbs), band = weighInStageBand(getStage(s.lbs).id), cor = getCorruptionTier(s.corruption || 0).id;
    if (band === 'light') {
      if (cor === 0) return `${s.name} writes ${lbs} in her notebook, underlined twice. "Within expected variance for semester dietary changes," she murmurs, adjusting her glasses. "The dining hall's sodium content alone could account for—" She stops. Looks at her own slim wrists. "I'll continue monitoring." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}." ${s.name} taps her pen against her notebook. "Up from last week. Correlation with increased caloric intake is…" She presses her free hand to the soft new layer at her waist. "Noted." She doesn't look alarmed. She looks like someone updating a dataset. ${moodTag(s)}`;
      return `${s.name} records ${lbs} with a small, private smile. "Hypothesis confirmed: intentional weight gain produces measurable results." Her soft middle yields under her cardigan when she breathes. "I would like to continue the experiment." ${moodTag(s)}`;
    }
    if (band === 'rounded') {
      if (cor === 0) return `"${lbs} pounds." ${s.name} says it like citing a source. Her chubby belly curves visibly beneath her sweater; her thighs press together when she stands. "This exceeds my projected trajectory by approximately—" She pauses. "By a meaningful margin." She tugs her cardigan closed. It doesn't fully close. ${moodTag(s)}`;
      if (cor === 1) return `${s.name} studies the reading with scholarly calm. ${lbs} lbs. Her plump body has outgrown the neat lines she used to inhabit — soft belly, fuller face, arms that no longer look merely lanky. "The data is unambiguous," she says. "I am getting fatter. On purpose." She meets your eyes. "I have notes on how it feels." ${moodTag(s)}`;
      return `"${lbs}." ${s.name} closes her notebook and rests both hands on the warm round of her belly. "I've been conducting this research on myself for months now. The findings are…" She exhales, pleased. "Extensive. And I want more data." ${moodTag(s)}`;
    }
    if (band === 'heavy') {
      if (cor === 0) return `${s.name} reads ${lbs} and removes her glasses to clean them — a tell. Her heavy body spills softly over the chair arms when she sits; her belly hangs forward, warm and undeniable. "I need to revise several assumptions," she says quietly. "About capacity. About identity." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs} lbs. Documented." ${s.name}'s fat form is a living counterargument to every thin-default paper she ever read. Her thick thighs spread wide; her belly rests heavy in her lap. "I am no longer in the control group," she says. "I am the result." ${moodTag(s)}`;
      return `At ${lbs}, ${s.name} looks at the number and nods with the satisfaction of a thesis defended. Her vast soft body barely fits the chair — flesh pressing warm at every contact point. "Publishable," she murmurs, patting her enormous belly. "All of it." ${moodTag(s)}`;
    }
    if (cor === 0) return `${s.name} stares at ${lbs}. The number exceeds ordinary categories. Her immobile softness fills the office like weather. "I don't have a framework for this yet," she whispers. ${moodTag(s)}`;
    if (cor === 1) return `"${lbs}." ${s.name} records it without tremor. Vast and warm, she has become her own most compelling dataset. "Continuing," she says. ${moodTag(s)}`;
    return `${s.name} reads ${lbs} and smiles with quiet academic triumph. "The experiment," she says, hands spread over endless soft warmth, "is a success." ${moodTag(s)}`;
  },

  2: (s, opts = {}) => { // Kylie — influencer
    const lbs = Math.round(s.lbs), band = weighInStageBand(getStage(s.lbs).id), cor = getCorruptionTier(s.corruption || 0).id;
    if (band === 'light') {
      if (cor === 0) return `${s.name} angles herself toward the window light before looking at the dial. "${lbs}?" She laughs, too bright. "The camera adds ten, the dining hall adds—" She stops. Pokes her softening hip. "Okay. Content idea: honest weigh-in. Vulnerable. Relatable." She's already framing it. ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}. Up." ${s.name} checks her profile in the office mirror — the new softness at her waist, the fuller curve of her ass. "Engagement on body-positive posts is insane right now." She isn't performing denial anymore. "Lean into it. Literally." ${moodTag(s)}`;
      return `${s.name} grins at ${lbs} lbs. "My audience is going to lose their minds. Good way." She runs her hands over the plush new weight settling into her hourglass frame. "This is the content. This is the brand now." ${moodTag(s)}`;
    }
    if (band === 'rounded') {
      if (cor === 0) {
        const campusLine = opts?.campusFattening
          ? `"Okay so like—it's fine. It's college. Everyone's gaining — campus-wide, not just me." She sounds like someone reading a script she didn't write, except the script is true.`
          : `"Okay so like—it's fine. It's college. Everyone gains." She doesn't sound sure. She sounds like someone reading a script she didn't write.`;
        return `${s.name} films the scale before she films herself. ${lbs} lbs. Her rounded belly pushes at her crop top; her thick thighs shimmer in the office light. ${campusLine} ${moodTag(s)}`;
      }
      if (cor === 1) return `"${lbs}!" ${s.name} spins slowly, letting you see all of it — the heavy sway of her belly, the plush width of her hips. "The comments section would eat this up. 'She's so real.'" She pats her stomach. "I am real. Really soft, really full, really—" She smiles. "Really into it." ${moodTag(s)}`;
      return `At ${lbs}, ${s.name} doesn't perform shock. She performs appetite. Her plump body moves with deliberate sensuality — belly jiggling, thighs rubbing, everything on display. "Watch this number climb," she says to the room, to you, to her future feed. "Watch me." ${moodTag(s)}`;
    }
    if (band === 'heavy') {
      if (cor === 0) return `${s.name} looks at ${lbs} and for once doesn't reach for her phone first. Her fat body dominates the frame — heavy belly hanging forward, breasts and hips lush and overwhelming. "I used to edit this out," she says quietly. "All of it." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}." ${s.name} posts anyway. Her vast soft curves strain every seam she owns; movement sends warm ripples through her whole body. "No filter. No angle. Just me." She sounds proud. "Finally." ${moodTag(s)}`;
      return `${s.name} at ${lbs} lbs is content gold and she knows it. Her enormous body fills the office — soft, warm, impossible to crop out of frame. "This is what they want," she murmurs, hands on her belly. "They just didn't know it yet." ${moodTag(s)}`;
    }
    if (cor === 0) return `${s.name} stares at ${lbs}. Her immobile mass has outgrown every ring light she owns. "I can't… shoot this," she whispers. Then, quieter: "Can I?" ${moodTag(s)}`;
    if (cor === 1) return `"${lbs}." ${s.name} livestreams the number without flinching. Vast warmth surrounds her. "This is the channel now," she says. ${moodTag(s)}`;
    return `${s.name} reads ${lbs} and smiles for the camera she isn't holding. "Perfect," she breathes. "Every pound." ${moodTag(s)}`;
  },

  3: (s) => { // Serena — athlete
    const lbs = Math.round(s.lbs), band = weighInStageBand(getStage(s.lbs).id), cor = getCorruptionTier(s.corruption || 0).id;
    if (band === 'light') {
      if (cor === 0) return `${s.name} flexes reflexively, then stops. ${lbs} lbs. The muscle is still there under a new soft layer. "Huh." She prods her thickened thigh. "Different training load." She won't call it fat yet. She will call it adaptation. ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}. Personal best." ${s.name} says it like a split time. Her athletic frame has softened — belly rounding, ass heavier, thighs plush when she stands. "New sport," she mutters. "Same discipline." ${moodTag(s)}`;
      return `${s.name} nods at ${lbs} with competitor's satisfaction. "Still climbing." Her body is thick and powerful under the new weight — soft but strong, warm and present. "I like the challenge." ${moodTag(s)}`;
    }
    if (band === 'rounded') {
      if (cor === 0) return `${s.name} reads ${lbs} and goes still. Her rounded belly pushes at her compression top; her thick thighs rub with every shift. "I can't run like I used to," she says. Not grief. Fact. "Something else is happening instead." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}." ${s.name} rolls her shoulders, feeling the heavy sway of her plump body. "I've redirected." Her belly bounces once when she settles. "Same drive. Different arena." ${moodTag(s)}`;
      return `At ${lbs}, ${s.name} grins — feral, pleased. Her plump form moves with power: belly swinging, thighs spreading, ass heavy behind her. "I'm not losing," she says. "I'm just winning differently." ${moodTag(s)}`;
    }
    if (band === 'heavy') {
      if (cor === 0) return `${s.name} stares at ${lbs}. Her fat body has ended her sprint career and started something else — vast belly, thick arms, thighs like tree trunks. "I miss the track," she admits. "I don't miss being small." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}." ${s.name} breathes through her nose, controlled. Her heavy flesh settles warm and immovable when she sits. "New event. No weight class." She almost smiles. ${moodTag(s)}`;
      return `${s.name} at ${lbs} lbs is a monument to appetite. Her enormous body barely fits the office; every movement sends slow heavy ripples through her soft mass. "Record holder," she says, patting her belly. ${moodTag(s)}`;
    }
    if (cor === 0) return `${s.name} reads ${lbs}. Immobile. Vast. She was built for motion once. Now the motion is in what she carries. ${moodTag(s)}`;
    if (cor === 1) return `"${lbs}." ${s.name} nods. The office rearranges around her weight. "Still training," she says. ${moodTag(s)}`;
    return `${s.name} reads ${lbs} and exhales, satisfied. "Champion," she murmurs, hands on endless soft warmth. ${moodTag(s)}`;
  },

  4: (s) => { // Fiona — artsy
    const lbs = Math.round(s.lbs), band = weighInStageBand(getStage(s.lbs).id), cor = getCorruptionTier(s.corruption || 0).id;
    if (band === 'light') {
      if (cor === 0) return `${s.name} looks at ${lbs} the way she looks at a sketch — curious, slightly detached. "Interesting composition," she murmurs. Her slim hips have softened; her belly has a gentle curve now. "The line of the body is changing." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}." ${s.name} traces the new softness at her waist with paint-stained fingers. "I've been drawing myself differently. Didn't realize I was also… becoming it." ${moodTag(s)}`;
      return `${s.name} smiles at the dial. ${lbs} lbs. "More canvas," she says softly. Her soft middle yields under her linen top. "More to work with." ${moodTag(s)}`;
    }
    if (band === 'rounded') {
      if (cor === 0) return `${s.name} stares at ${lbs} like the number is a color she hasn't named yet. Her rounded belly curves beneath flowing fabric; her thighs press together, plush and warm. "It's beautiful," she says, surprised at herself. "I didn't expect to think that." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}." ${s.name} turns slowly, studying her own reflection. Plump hips, heavy breasts, belly rounding forward in soft abundance. "I've been painting this body for weeks. Now I am the painting." ${moodTag(s)}`;
      return `At ${lbs}, ${s.name} breathes deep and lets her plump body settle — belly spilling softly, flesh warm and yielding. "Masterpiece in progress," she whispers. "Don't rush it." ${moodTag(s)}`;
    }
    if (band === 'heavy') {
      if (cor === 0) return `${s.name} reads ${lbs} and goes quiet with reverence. Her fat form is sculptural — belly hanging heavy, curves cascading. "I need a bigger studio," she says. "For the subject." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}." ${s.name} runs her hands over the vast warm landscape of herself. "I've stopped sketching and started living in the work." ${moodTag(s)}`;
      return `${s.name} at ${lbs} lbs is art that breathes. Her enormous soft body fills the office with color and warmth. "Exhibit," she murmurs. "Open indefinitely." ${moodTag(s)}`;
    }
    if (cor === 0) return `${s.name} reads ${lbs}. Immobile abundance. "Too big for the frame," she whispers. "Good." ${moodTag(s)}`;
    if (cor === 1) return `"${lbs}." ${s.name} nods. Vast and still and warm. "The final form," she says. ${moodTag(s)}`;
    return `${s.name} reads ${lbs} and smiles like a gallery opening. "Perfect," she breathes. ${moodTag(s)}`;
  },

  5: (s) => { // Destiny — gamer
    const lbs = Math.round(s.lbs), band = weighInStageBand(getStage(s.lbs).id), cor = getCorruptionTier(s.corruption || 0).id;
    if (band === 'light') {
      if (cor === 0) return `${s.name} squints at the dial between respawns. "${lbs}? Cool. Whatever." Her apple belly pokes softly at her hoodie. "AFK eating meta is strong this semester." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}. New high score." ${s.name} doesn't look up from her phone. Her soft middle presses at the hoodie zipper. "Grinding IRL weight stat. Don't nerf me." ${moodTag(s)}`;
      return `${s.name} grins at ${lbs}. "Patch notes: increased mass, improved comfort debuff resistance." She pats her softened belly. "Running the build." ${moodTag(s)}`;
    }
    if (band === 'rounded') {
      if (cor === 0) return `${s.name} reads ${lbs} and sighs. Her rounded gut rests on her lap when she sits back down. "Chair ergonomics are trash for this meta." She adjusts. Fails. Adjusts again. ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}." ${s.name} leans back, belly swelling forward, thighs spreading wide. "Tank build. Pure tank." She sounds pleased. "No DPS. All presence." ${moodTag(s)}`;
      return `At ${lbs}, ${s.name} surveys her plump form like a character screen. "Maxed out softness," she says. "Zero regrets. Next?" ${moodTag(s)}`;
    }
    if (band === 'heavy') {
      if (cor === 0) return `${s.name} stares at ${lbs}. Her fat body has fused with the chair geometry. "Need a new rig," she mutters. "And a wider doorframe mod." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}." ${s.name} shifts; everything jiggles. "Boss-tier mass," she says. "Unlocked." ${moodTag(s)}`;
      return `${s.name} at ${lbs} lbs doesn't stand. She doesn't need to. "Endgame body," she murmurs, hands on her vast belly. ${moodTag(s)}`;
    }
    if (cor === 0) return `${s.name} reads ${lbs}. Immobile. "World boss," she whispers. ${moodTag(s)}`;
    if (cor === 1) return `"${lbs}." ${s.name} nods. "DLC: infinite expansion." ${moodTag(s)}`;
    return `${s.name} reads ${lbs}. "GG," she says, smiling. ${moodTag(s)}`;
  },

  6: (s) => { // Tiffany — sorority
    const lbs = Math.round(s.lbs), band = weighInStageBand(getStage(s.lbs).id), cor = getCorruptionTier(s.corruption || 0).id;
    if (band === 'light') {
      if (cor === 0) return `${s.name} gasps at ${lbs}. "Okay but like—brunch is a lifestyle and I will die on that hill." Her hourglass frame has softened at the hips. "Don't tell the chapter. Actually tell them. They'll be jealous." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}! Up!" ${s.name} does a little twirl. Her plush curves bounce — belly, breasts, ass. "The girls are literally asking what I'm eating. Trade secret." ${moodTag(s)}`;
      return `${s.name} beams at ${lbs}. "Best semester ever. Best body ever." She runs her hands over her thickening waist. "More is more, babe." ${moodTag(s)}`;
    }
    if (band === 'rounded') {
      if (cor === 0) return `${s.name} reads ${lbs} and pouts. Her rounded belly strains her pastel top; her thick thighs shimmer. "These are literally my good jeans. Were." She shrugs. "Worth it for the pasta bar." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}." ${s.name} poses automatically. Plump and glowing, she fills the office with perfume and warmth. "The chapter voted. I'm the new standard." ${moodTag(s)}`;
      return `At ${lbs}, ${s.name} is radiant. Her plump body sways when she moves — belly soft and round, ass heavy, everything jiggling with confident delight. "Icon behavior," she says. ${moodTag(s)}`;
    }
    if (band === 'heavy') {
      if (cor === 0) return `${s.name} looks at ${lbs} and laughs once. Her fat form barely fits the chair — belly spilling, thighs spreading. "Okay so the house had to widen my doorway. Not a vibe I planned. Still hot though." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}!" ${s.name} claps. Her enormous soft body ripples with the motion. "Queen of the chapter. Literally. They bring me food now." ${moodTag(s)}`;
      return `${s.name} at ${lbs} lbs owns every inch of the office. "This is the look," she says, hands on her vast belly. "Final answer." ${moodTag(s)}`;
    }
    if (cor === 0) return `${s.name} reads ${lbs}. Immobile royalty. "The girls come to me now," she says, dazed. ${moodTag(s)}`;
    if (cor === 1) return `"${lbs}." ${s.name} nods. "House mother energy," she murmurs. ${moodTag(s)}`;
    return `${s.name} reads ${lbs} and smiles. "Perfect," she breathes. ${moodTag(s)}`;
  },

  7: (s) => { // Priya — overachiever
    const lbs = Math.round(s.lbs), band = weighInStageBand(getStage(s.lbs).id), cor = getCorruptionTier(s.corruption || 0).id;
    if (band === 'light') {
      if (cor === 0) return `${s.name} logs ${lbs} in three apps simultaneously. "Variance within acceptable parameters for high-stress academic environment." Her slim frame has a soft new layer at the belly. "I'll optimize meal timing." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}. Trending upward." ${s.name} taps her planner. "Correlates with increased caloric efficiency and reduced guilt." She presses her hand to her softening waist. "Acceptable trade." ${moodTag(s)}`;
      return `${s.name} records ${lbs} with satisfaction. "Goal: continuous improvement. Status: on track." Her soft middle yields under her blouse. ${moodTag(s)}`;
    }
    if (band === 'rounded') {
      if (cor === 0) return `${s.name} reads ${lbs} and recalculates. Her rounded belly pushes at her waistband; her thighs press together. "Project scope has expanded beyond initial estimates." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}." ${s.name} updates her spreadsheet. Plump and efficient, she has optimized for softness. "New KPI: pounds per week. Exceeding targets." ${moodTag(s)}`;
      return `At ${lbs}, ${s.name} nods with executive calm. Her plump body is warm and substantial. "Maximum output," she says, patting her belly. ${moodTag(s)}`;
    }
    if (band === 'heavy') {
      if (cor === 0) return `${s.name} stares at ${lbs}. Her fat form has broken every projection model she built. "I need a new framework," she admits. ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}." ${s.name} files it under Success Metrics. Her heavy body fills the chair completely. "Overperformed." ${moodTag(s)}`;
      return `${s.name} at ${lbs} lbs reviews the quarter. "Exceptional growth," she murmurs, hands on vast softness. ${moodTag(s)}`;
    }
    if (cor === 0) return `${s.name} reads ${lbs}. Beyond the chart. "Outlier," she whispers. ${moodTag(s)}`;
    if (cor === 1) return `"${lbs}." ${s.name} nods. "Benchmark set." ${moodTag(s)}`;
    return `${s.name} reads ${lbs}. "Optimal," she breathes. ${moodTag(s)}`;
  },

  8: (s) => { // Maya — quiet
    const lbs = Math.round(s.lbs), band = weighInStageBand(getStage(s.lbs).id), cor = getCorruptionTier(s.corruption || 0).id;
    if (band === 'light') {
      if (cor === 0) return `${s.name} looks at ${lbs}. Says nothing for a long moment. Her pear hips have softened; her belly has a gentle curve. "…Okay," she finally murmurs. ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}." ${s.name} nods once. Her soft body has grown into the oversized sweaters she hides in. "I feel it," she says quietly. "Before I see it." ${moodTag(s)}`;
      return `${s.name} meets your eyes at ${lbs} lbs. "More," she says. One word. She means it. ${moodTag(s)}`;
    }
    if (band === 'rounded') {
      if (cor === 0) return `${s.name} reads ${lbs} and hugs herself — rounded belly, thick thighs, soft arms. "I didn't think I'd…" She trails off. Doesn't finish. Doesn't need to. ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}." ${s.name} breathes out slow. Her plump form settles warm and heavy in the quiet office. "I'm still me," she says. "Just… more me." ${moodTag(s)}`;
      return `At ${lbs}, ${s.name} smiles — small, private, real. Her plump body presses soft at every edge. "Thank you," she whispers. ${moodTag(s)}`;
    }
    if (band === 'heavy') {
      if (cor === 0) return `${s.name} stares at ${lbs}. Her fat body fills the silence. "I can't hide this anymore," she says. Not afraid. Honest. ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}." ${s.name} rests her hands on her vast belly. "I stopped hiding," she says. "It feels… warm." ${moodTag(s)}`;
      return `${s.name} at ${lbs} lbs is present in a way she never was at ninety pounds. "Here," she murmurs. "All of me." ${moodTag(s)}`;
    }
    if (cor === 0) return `${s.name} reads ${lbs}. Immobile. Silent. Her eyes say everything. ${moodTag(s)}`;
    if (cor === 1) return `"${lbs}." ${s.name} nods. Vast and still. "Staying," she says. ${moodTag(s)}`;
    return `${s.name} reads ${lbs}. Smiles. "Home," she breathes. ${moodTag(s)}`;
  },

  9: (s) => { // Chloe — transfer
    const lbs = Math.round(s.lbs), band = weighInStageBand(getStage(s.lbs).id), cor = getCorruptionTier(s.corruption || 0).id;
    if (band === 'light') {
      if (cor === 0) return `${s.name} squints at ${lbs}. "American portions are a psychological operation and I am losing. Badly." Her apple belly pokes at her jumper. "Worth it though. Obviously." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}. Grand." ${s.name} pats her softening middle. "The exchange program includes unlimited refills. I'm conducting field research." ${moodTag(s)}`;
      return `${s.name} grins at ${lbs}. "Best year abroad ever." Her thickening waist strains her jumper buttons. "Going back to Dublin enormous. Legend." ${moodTag(s)}`;
    }
    if (band === 'rounded') {
      if (cor === 0) return `${s.name} reads ${lbs} and laughs dryly. Her rounded gut pushes forward; her thick thighs spread when she sits. "My mam is going to have words. Several words." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}." ${s.name} leans back, belly swelling. "I've adapted to local customs. Very thoroughly." ${moodTag(s)}`;
      return `At ${lbs}, ${s.name} surveys herself with bemused pride. Plump, warm, thoroughly Americanized. "No regrets," she says. ${moodTag(s)}`;
    }
    if (band === 'heavy') {
      if (cor === 0) return `${s.name} stares at ${lbs}. Her fat body has consumed every jumper she brought from home. "Need a new wardrobe. And a new country. Same country. Bigger country." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}." ${s.name} shrugs, vast and warm. "When in Rome," she says. "Eat everything." ${moodTag(s)}`;
      return `${s.name} at ${lbs} lbs laughs. "Tell my mam I died happy," she murmurs, hands on her enormous belly. ${moodTag(s)}`;
    }
    if (cor === 0) return `${s.name} reads ${lbs}. Immobile. "Bloody hell," she whispers. ${moodTag(s)}`;
    if (cor === 1) return `"${lbs}." ${s.name} nods. "Fully assimilated," she says. ${moodTag(s)}`;
    return `${s.name} reads ${lbs}. "Cheers," she breathes, smiling. ${moodTag(s)}`;
  },

  10: (s) => { // Reneé — culinary
    const lbs = Math.round(s.lbs), band = weighInStageBand(getStage(s.lbs).id), cor = getCorruptionTier(s.corruption || 0).id;
    if (band === 'light') {
      if (cor === 0) return `${s.name} tastes the air, then looks at ${lbs}. "Quality ingredients," she says. Her rotund hips have thickened; her belly is a soft round beneath her apron strings. "I'm my own best critic." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}. More to work with." ${s.name} pinches her softening waist with chef's precision. "The body is a kitchen. I'm filling the pantry." ${moodTag(s)}`;
      return `${s.name} smiles at ${lbs}. "Perfect reduction — everything concentrates." Her soft middle yields warmly. ${moodTag(s)}`;
    }
    if (band === 'rounded') {
      if (cor === 0) return `${s.name} reads ${lbs} and inhales. Her rounded belly pushes at her chef's coat; flour dusts her thick thighs. "I've been tasting too much. No. The right amount." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}." ${s.name} runs her hands over her plump curves. "Every recipe needs more body. Including mine." ${moodTag(s)}`;
      return `At ${lbs}, ${s.name} is radiant and round. Her plump form moves with sensual weight — belly swaying, hips rolling. "Second helping," she murmurs. "Of everything." ${moodTag(s)}`;
    }
    if (band === 'heavy') {
      if (cor === 0) return `${s.name} stares at ${lbs}. Her fat body strains every apron tie she owns. "I broke the kitchen stool," she admits. "Bought a bench." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}." ${s.name} pats her vast belly. "Main course," she says warmly. ${moodTag(s)}`;
      return `${s.name} at ${lbs} lbs fills the office like a walk-in oven — warm, soft, overwhelming. "Dessert too," she murmurs. ${moodTag(s)}`;
    }
    if (cor === 0) return `${s.name} reads ${lbs}. Immobile warmth. "The kitchen comes to me now," she says. ${moodTag(s)}`;
    if (cor === 1) return `"${lbs}." ${s.name} nods. "Fully baked," she murmurs. ${moodTag(s)}`;
    return `${s.name} reads ${lbs}. "Perfection," she breathes. ${moodTag(s)}`;
  },

  11: (s) => { // Kaylee — nursing
    const lbs = Math.round(s.lbs), band = weighInStageBand(getStage(s.lbs).id), cor = getCorruptionTier(s.corruption || 0).id;
    if (band === 'light') {
      if (cor === 0) return `${s.name} reads ${lbs} with clinical concern that doesn't quite reach her eyes. "You're eating enough, right? I mean— I'm eating enough. Sorry. Habit." Her fertility-goddess curves have softened further. ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}. Up." ${s.name} presses her hand to her warm belly. "I've been taking my own advice. Rest. Nutrition. Comfort." She almost smiles. "It's working." ${moodTag(s)}`;
      return `${s.name} beams at ${lbs}. "Healthy growth," she says, and means something entirely different than her textbooks. ${moodTag(s)}`;
    }
    if (band === 'rounded') {
      if (cor === 0) return `${s.name} looks at ${lbs}. Her rounded belly rests soft and full; her wide hips spread warm when she sits. "I tell my patients to be kind to their bodies," she says. "I'm learning to mean it for mine." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}." ${s.name} settles deeper, plump flesh pressing at the chair. "Self-care," she murmurs. "Aggressive self-care." ${moodTag(s)}`;
      return `At ${lbs}, ${s.name} radiates warmth. Her plump body is an invitation — soft belly, heavy breasts, thighs like pillows. "Come sit," she says. "There's room." ${moodTag(s)}`;
    }
    if (band === 'heavy') {
      if (cor === 0) return `${s.name} reads ${lbs}. Her fat form barely fits the office chair. "I need to practice what I preach," she says quietly. "About accepting your body." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}." ${s.name} rests her hands on her vast belly. "Fully nourished," she says. ${moodTag(s)}`;
      return `${s.name} at ${lbs} lbs is a warm harbor. "Plenty for everyone," she murmurs, smiling. ${moodTag(s)}`;
    }
    if (cor === 0) return `${s.name} reads ${lbs}. Immobile and nurturing. "The bed comes to me," she says softly. ${moodTag(s)}`;
    if (cor === 1) return `"${lbs}." ${s.name} nods. "Complete care," she murmurs. ${moodTag(s)}`;
    return `${s.name} reads ${lbs}. "Whole," she breathes. ${moodTag(s)}`;
  },

  12: (s) => { // Nadia — psych
    const lbs = Math.round(s.lbs), band = weighInStageBand(getStage(s.lbs).id), cor = getCorruptionTier(s.corruption || 0).id;
    if (band === 'light') {
      if (cor === 0) return `${s.name} observes the dial, then your face, then the dial again. "${lbs}," she says. "You looked at me before you looked at the number. Interesting." Her voluptuous frame has softened at the belly. ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}." ${s.name} makes a note. "Correlation between your attention and my appetite remains significant." She presses her hand to her thickening waist. ${moodTag(s)}`;
      return `${s.name} records ${lbs} with clinical warmth. "The subject is cooperating," she murmurs — meaning herself. ${moodTag(s)}`;
    }
    if (band === 'rounded') {
      if (cor === 0) return `${s.name} reads ${lbs}. Her rounded curves strain her blouse; her belly pushes forward, soft and undeniable. "I've been studying denial as a coping mechanism," she says. "In myself." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}." ${s.name} leans back, plump body settling. "I've moved past the resistance phase. Fascinating process." ${moodTag(s)}`;
      return `At ${lbs}, ${s.name} smiles with analyst's detachment and subject's hunger. "Integration complete," she says, hands on her soft belly. ${moodTag(s)}`;
    }
    if (band === 'heavy') {
      if (cor === 0) return `${s.name} stares at ${lbs}. Her fat body is a case study she can't distance herself from. "I need supervision," she admits. "Yours." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}." ${s.name} nods. "Countertransference," she murmurs, patting her vast belly. "Accepted." ${moodTag(s)}`;
      return `${s.name} at ${lbs} lbs watches you watch her. "The data is overwhelming," she says, smiling. ${moodTag(s)}`;
    }
    if (cor === 0) return `${s.name} reads ${lbs}. Immobile. "Beyond theory," she whispers. ${moodTag(s)}`;
    if (cor === 1) return `"${lbs}." ${s.name} nods. "Embodied," she says. ${moodTag(s)}`;
    return `${s.name} reads ${lbs}. "Understood," she breathes. ${moodTag(s)}`;
  },

  13: (s) => { // Daisy — eced / mom bod
    const lbs = Math.round(s.lbs), band = weighInStageBand(getStage(s.lbs).id), cor = getCorruptionTier(s.corruption || 0).id;
    if (band === 'light') {
      if (cor === 0) return `${s.name} clucks her tongue at ${lbs}. "Honey, you're eating enough — I mean I am, bless it." Her mom-bod softness gathers at her belly and hips. "Someone's got to model good nutrition." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}, sugar." ${s.name} pats her warm middle. "Comfort food works both ways. I'm living proof." ${moodTag(s)}`;
      return `${s.name} smiles at ${lbs}. "Growing sweet," she says, hands on her soft curves. ${moodTag(s)}`;
    }
    if (band === 'rounded') {
      if (cor === 0) return `${s.name} reads ${lbs} and sighs fondly. Her rounded belly rests on her lap; her thick thighs spread wide. "Lord, I do love a good meal." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}." ${s.name} settles in, plump and warm. "Second helpings are a kindness. To yourself." ${moodTag(s)}`;
      return `At ${lbs}, ${s.name} glows. Her plump body smells like cookies and warmth. "Plenty to go around," she murmurs. ${moodTag(s)}`;
    }
    if (band === 'heavy') {
      if (cor === 0) return `${s.name} looks at ${lbs}. Her fat form fills the chair like rising dough. "The kids I student-teach think I'm pregnant," she laughs. "I just tell them: fed." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}." ${s.name} pats her vast belly. "Well-fed," she says. "That's the goal." ${moodTag(s)}`;
      return `${s.name} at ${lbs} lbs is a kitchen unto herself. "Come eat," she murmurs. ${moodTag(s)}`;
    }
    if (cor === 0) return `${s.name} reads ${lbs}. Immobile warmth. "The table comes to me," she says. ${moodTag(s)}`;
    if (cor === 1) return `"${lbs}." ${s.name} nods. "Full house," she murmurs. ${moodTag(s)}`;
    return `${s.name} reads ${lbs}. "Blessed," she breathes. ${moodTag(s)}`;
  },

  14: (s) => { // Mary Jane — farm girl
    const lbs = Math.round(s.lbs), band = weighInStageBand(getStage(s.lbs).id), cor = getCorruptionTier(s.corruption || 0).id;
    if (band === 'light') {
      if (cor === 0) return `${s.name} grins at ${lbs}. "Back home we'd call this 'healthy.'" Her hourglass figure has filled out — soft belly, heavier breasts, thickening thighs. "City food hits different though. Better, maybe." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}! Grand." ${s.name} slaps her softening hip. "Mama would be proud. Or horrified. Probably both." ${moodTag(s)}`;
      return `${s.name} beams at ${lbs}. "Growing good," she says, warm as biscuits. ${moodTag(s)}`;
    }
    if (band === 'rounded') {
      if (cor === 0) return `${s.name} reads ${lbs} and laughs. Her rounded belly pushes at her overalls; her thick thighs strain the seams. "These ain't gonna make it to Thanksgiving at this rate." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}." ${s.name} leans back, plump and sun-warm. "Field's been good to me." ${moodTag(s)}`;
      return `At ${lbs}, ${s.name} is abundance personified. Her plump body sways with country confidence. "More harvest," she murmurs. ${moodTag(s)}`;
    }
    if (band === 'heavy') {
      if (cor === 0) return `${s.name} stares at ${lbs}. Her fat form would make the hay scale proud. "Need a new porch swing," she says. "And a wider truck seat." ${moodTag(s)}`;
      if (cor === 1) return `"${lbs}." ${s.name} pats her vast belly. "Bounty," she says simply. ${moodTag(s)}`;
      return `${s.name} at ${lbs} lbs fills the office like a barn at harvest. "Plenty," she murmurs, smiling. ${moodTag(s)}`;
    }
    if (cor === 0) return `${s.name} reads ${lbs}. Immobile as a summer afternoon. "Rooted," she whispers. ${moodTag(s)}`;
    if (cor === 1) return `"${lbs}." ${s.name} nods. "Land don't lie," she says. ${moodTag(s)}`;
    return `${s.name} reads ${lbs}. "Home," she breathes. ${moodTag(s)}`;
  },

  15: (s) => { // Lilith — predator
    const lbs = Math.round(s.lbs), band = weighInStageBand(getStage(s.lbs).id);
    if (band === 'light') return `${s.name} looks at ${lbs} with faint amusement. "Numbers are such a human obsession." Her still-slim frame barely registers on the scale. ${moodTag(s)}`;
    if (band === 'rounded') return `${s.name} reads ${lbs} and smiles without warmth. "I'm collecting mass the way others collect grades." Her body has thickened — soft curves hiding something sharper underneath. ${moodTag(s)}`;
    if (band === 'heavy') return `At ${lbs}, ${s.name} stretches, fat and predatory, belly soft over something coiled. "Almost ready," she murmurs. ${moodTag(s)}`;
    return `${s.name} reads ${lbs}. Immobile vastness. She looks at you the way a tide pool looks at the moon. "Soon," she says. ${moodTag(s)}`;
  },
};

const DEFAULT_REPLY = (s) => {
  const lbs = Math.round(s.lbs), cor = getCorruptionTier(s.corruption || 0).id;
  if (cor === 0) return `${s.name} steps back from the reading — ${lbs} lbs — and goes quiet for a moment. "Okay," she says. Not convinced. Not devastated. Just… processing.`;
  if (cor === 1) return `"${lbs}." ${s.name} nods slowly. Her body has changed; she no longer pretends otherwise. "Every week," she murmurs. "I can feel it before I see it."`;
  return `${s.name} reads ${lbs} and smiles — warm, unhurried, sure. "Good," she says, hands settling on the soft weight of herself. "More."`;
};

export function getWeighInPersonalReply(student, opts = {}) {
  const fn = BUILDERS[student.id] || DEFAULT_REPLY;
  return fn(student, opts);
}
