// Per-archetype flavor lines for hunger interrupts (see Hunger Event Lexicon.txt)
import { registerModule } from '../engine.js';

const PERSONAL = {
  cheerleader: [
    'She is still in practice shorts, ponytail coming loose.',
    'Her cheer jacket is half-zipped over a stomach that has been growling through conditioning.',
    'She tries to sound casual, but her voice cracks on the first word.',
    'She smells faintly of gym soap and desperation.',
  ],
  bookworm: [
    'She is clutching a notebook like a shield.',
    'Her glasses are slightly askew, pushed up by restless fingers.',
    'She has clearly been pacing between your door and the library stacks.',
    'Ink stains her fingers; she has not been writing notes.',
  ],
  influencer: [
    'Her ring light is off, but she still angles herself toward the hallway mirror.',
    'She looks like she almost filmed this and thought better of it.',
    'Lip gloss gone, hair messy — not the version she posts.',
    'She keeps touching her stomach like it might trend if she ignores it.',
  ],
  athlete: [
    'She is still in compression gear, muscles tense with something that is not training.',
    'Her runner\'s discipline is visibly losing to appetite.',
    'She keeps flexing her hands like she is trying not to grab at you.',
    'Sweat on her neck — she may have sprinted here.',
  ],
  artsy: [
    'Paint under her nails, linen shirt rumpled.',
    'She looks like hunger interrupted a sketch mid-stroke.',
    'Charcoal smudge on her cheek; she has not been making art.',
    'She hugs herself, restless and soft-eyed.',
  ],
  gamer: [
    'Headphones around her neck, hoodie strings chewed.',
    'She looks like she rage-quit a game and came straight here.',
    'Energy drink cans forgotten in her bag — not enough anymore.',
    'Dark circles under her eyes; she has been up thinking about food.',
  ],
  sorority: [
    'Pastel sweater, perfect blowout slightly ruined.',
    'Greek letters on her tote; the tote is empty.',
    'She smells like vanilla body spray and unmet craving.',
    'She is trying to keep her voice light and failing.',
  ],
  overachiever: [
    'Planner in hand, color-coded tabs forgotten.',
    'She looks like she scheduled this hunger and could not reschedule it.',
    'Three laptops in her bag; none of them helped.',
    'Her efficient posture is cracking at the edges.',
  ],
  quiet: [
    'Oversized sweater swallowing restless hands.',
    'She barely meets your eyes before looking at your hands instead.',
    'She has been standing there longer than she will admit.',
    'Her voice is small when she finally speaks.',
  ],
  transfer: [
    'Still bemused by American portions — and by how badly she wants more.',
    'Her exchange badge is crooked; she has not been to class today.',
    'She smells like dining hall fries and regret.',
    'Dry humor abandoned; she just looks hungry.',
  ],
  culinary: [
    'Flour on her sleeve, lips parted like she has been tasting nothing all day.',
    'She smells like someone who knows food and cannot stop wanting it.',
    'Her hands shake slightly — not from caffeine.',
    'She looks embarrassed to want feeding this badly.',
  ],
  nursing: [
    'Still in scrubs from clinical rotation.',
    'The caregiver looks like she needs care for once.',
    'Warm eyes gone glassy with need.',
    'She keeps apologizing before she finishes asking.',
  ],
  psych: [
    'Notebook open to a blank page she never filled.',
    'She is observing her own craving like a case study.',
    'Clinical calm fraying at the corners.',
    'She names what she is feeling and still cannot stop feeling it.',
  ],
  eced: [
    'Snack bag empty, cookie crumbs on her cardigan.',
    'She smells like baked goods and unmet comfort.',
    'Nurturing smile turned needy.',
    'She looks like she brought treats for everyone but herself.',
  ],
  farm_girl: [
    'Flannel untucked, cheeks flushed.',
    'Country politeness wrestling with plain hunger.',
    'She smells like sweet potato pie and shame.',
    'Her drawl thickens when she is this desperate.',
  ],
  predator: [
    'Dark clothes, stillness gone sharp and hungry.',
    'Her smile does not reach her eyes — those are fixed on you.',
    'She looks less like a student and more like something waiting.',
    'Predatory patience worn thin by craving.',
  ],
  pharmacy_grad: [
    'Lab coat still on, hair escaping its tie.',
    'She smells faintly of antiseptic and something sweeter underneath.',
    'Calculations abandoned; need written plain on her face.',
    'She knows exactly what hunger does chemically — and still came anyway.',
  ],
};

for (const [archetype, lines] of Object.entries(PERSONAL)) {
  registerModule('scene.hungerInterrupt.personal', [{
    when: { archetype },
    priority: 2,
    text: lines,
  }]);
}
