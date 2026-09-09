// The Squad — Lead: A2 Psych | Support: A3 Immobility, A5 Editor
// Per-student body-echo type variants. Loads after v2/echo/depth.js.
import { registerModuleVariants } from '../../../engine.js';

const W = 4;

const weighIn = {
  0: [`Brittany reads the digits like a scoreboard — competitive calm, pride when the number climbs.`],
  1: [`Cassidy logs the weigh-in before she allows herself to feel it — data first, warmth second.`],
  2: [`Kylie checks the number like analytics — already imagining how it will look on camera.`],
  3: [`Serena steps off the scale with athlete poise — mass acknowledged, discipline unchanged.`],
  4: [`Fiona regards the digits as composition — growth as aesthetic fact, pleasing and complete.`],
  5: [`Destiny glances at the readout and shrugs — number filed, appetite unchanged.`],
  6: [`Tiffany accepts the weigh-in with chapter-president grace — abundance treated as normal.`],
  7: [`Priya updates the spreadsheet before she smiles — trend confirmed, goal column revised upward.`],
  8: [`Maya watches the number without flinching — quiet satisfaction, hands settling on her stomach.`],
  9: [`Chloé savors the climb like wine — continental amusement, American scale as cultural discovery.`],
  10: [`Reneé tastes the moment slowly — digits as ingredient, fullness as the recipe working.`],
  11: [`Kaylee exhales relief when the number rises — warmth, gratitude, body finally believed.`],
  12: [`Nadia notes the reading in clinical calm — subject data excellent, hunger filed under ongoing.`],
  13: [`Daisy treats the weigh-in like a lesson — numbers as proof the body is good and hers.`],
  14: [`Mary Jane laughs at the digits like weather back home — heavy harvest, healthy land, good crop.`],
  15: [`Lilith regards the scale like prey — unhurried satisfaction, mass claimed without ceremony.`],
  16: [`Sophia cites the number between bites — wellness rhetoric thinning as fullness wins.`],
  17: [`Indiana catalogs the reading like a find — artifact weight excellent, site reorganized.`],
  18: [`Talia records the output on the lab scale — hypothesis confirmed, yield exceeding projection.`],
};

const stageUp = {
  0: [`Brittany crossed the threshold like a halftime lead — visible, earned, the room already cheering.`],
  1: [`Cassidy's stage-up reads like a peer-reviewed conclusion — inevitable once the data lined up.`],
  2: [`Kylie's threshold became content — mass made spectacle, appetite made subscriber bait.`],
  3: [`Serena's new stage arrived without drama — body answering training she no longer fights.`],
  4: [`Fiona's growth crossed into gallery scale — composition deepening, subject and artist merging.`],
  5: [`Destiny leveled up off-stream — boss bar full, inventory expanded, chat would have lost it.`],
  6: [`Tiffany's stage-up felt like chapter business — abundance normalized, hospitality upgraded.`],
  7: [`Priya's threshold cleared every projection column — optimization succeeded beyond spec.`],
  8: [`Maya's stage-up was quiet ceremony — mass settling in, trust deepening, words unnecessary.`],
  9: [`Chloé's threshold arrived with Parisian delight — civilization confirmed in American portions.`],
  10: [`Reneé's stage-up tasted like a perfect course — heat, texture, the menu finally honest.`],
  11: [`Kaylee's new stage bloomed like relief — body believed, shame losing another foothold.`],
  12: [`Nadia's threshold filed itself — subject exceeded case parameters, research continues.`],
  13: [`Daisy's stage-up felt like a lesson landing — body good, growth proof, warmth deserved.`],
  14: [`Mary Jane's threshold arrived like harvest season — heavy, generous, impossible to apologize for.`],
  15: [`Lilith's stage-up shifted gravity — predation made architecture, reach replacing chase.`],
  16: [`Sophia's threshold outran her formulations — wellness language surrendering to want.`],
  17: [`Indiana's dig produced its defining find — mass reorganizing the whole site map.`],
  18: [`Talia's stage-up cleared the lab scale — engineering problem solved, appetite leaking through.`],
};

const dinnerUnbutton = {
  0: [`Brittany's button surrendered mid-bite — public appetite, zero retreat, dessert still ordered.`],
  1: [`Cassidy's clasp gave during the entrée — she kept eating while annotating the moment mentally.`],
  2: [`Kylie's seam failed on camera-adjacent night — she kept filming, hunger undiminished.`],
  3: [`Serena's waistband quit before dessert — athlete restraint retired, fullness embraced.`],
  4: [`Fiona's fabric failed like overworked canvas — she stayed for coffee, composition intact.`],
  5: [`Destiny's button popped between rounds — IRL event won by appetite, chat would have clipped it.`],
  6: [`Tiffany's blouse conceded at the chapter dinner — hostess still serving, grace unbroken.`],
  7: [`Priya's spreadsheet couldn't predict the third course — button gone, optimization abandoned gladly.`],
  8: [`Maya's button gave quietly — small sound, deep focus, dessert reached without shame.`],
  9: [`Chloé's unbuttoning scandalized the table delightedly — she ordered cheese anyway.`],
  10: [`Reneé's clasp failed like a overcooked reduction — rich, inevitable, kitchen forgiven.`],
  11: [`Kaylee's waistband surrendered with a grateful exhale — warmth, fullness, body finally believed.`],
  12: [`Nadia's seam failed mid-observation — subject continued eating, field notes unnecessary.`],
  13: [`Daisy's button popped at the staff dinner — she laughed, kept eating, modeled abundance.`],
  14: [`Mary Jane's blouse gave like a burst seam on harvest day — sweet, unashamed, seconds assumed.`],
  15: [`Lilith's fabric failed with predatory patience — she kept eating, room learning to look away late.`],
  16: [`Sophia's wellness blouse surrendered to richness — guilt losing, pleasure winning publicly.`],
  17: [`Indiana's jacket button flew like a small excavation — adventure continued through dessert.`],
  18: [`Talia's lab coat button failed at the diner — data gathering interrupted by glorious surplus.`],
};

const immobility = {
  0: [`Brittany stopped needing the bleachers — command seat sufficient, food delivered like squad support.`],
  2: [`Kylie went still for the wide shot — immobile content, appetite supplied, views climbing anyway.`],
  5: [`Destiny's stream chair became throne — world comes to her, snacks respawned, chat worships.`],
  6: [`Tiffany hosts from one chair now — chapter circles her, abundance as stationary hospitality.`],
  8: [`Maya settled into immobility like trust — room comes to her, warmth absolute, words unnecessary.`],
  9: [`Chloé receives the world continental-style — immobile, amused, portions brought with ceremony.`],
  11: [`Kaylee's stillness blooms gratitude — food arrives, body held, shame long departed.`],
  14: [`Mary Jane's homestead radius shrank to one chair — harvest comes to her, sweetness undiminished.`],
  15: [`Lilith became geography — immobile predator, orbit of hunger, world delivered to her teeth.`],
  18: [`Talia's lab chair became command center — inputs routed to her, yield optimized in place.`],
};

const corruption = {
  0: [`Brittany's want reorganized around yes — competitive hunger, shame benched permanently.`],
  1: [`Cassidy stopped footnoting desire — corruption tier crossed, appetite speaking without citation.`],
  2: [`Kylie's corruption tier made content honest — filter gone, hunger subscriber-facing.`],
  7: [`Priya's spreadsheets now forecast appetite without apology — want optimized, guilt deleted.`],
  11: [`Kaylee's corruption bloomed like relief — body believed, refusal losing vocabulary.`],
  15: [`Lilith's corruption tier is predation formalized — want takes, world obliges.`],
  16: [`Sophia's wellness mask thinned — corruption tier crossed, formulations failing against fullness.`],
};

const evolution = {
  0: [`Brittany evolved into command appetite — squad hunger centralized, growth as leadership.`],
  2: [`Kylie chose spectacle evolution — form amplified, camera hunger made identity.`],
  5: [`Destiny's evolution unlocked endgame build — streamer body re-specced for maximum intake.`],
  8: [`Maya's evolution deepened stillness — appetite honest, presence vast, words retired.`],
  11: [`Kaylee's evolution bloomed caregiver hunger — feeding others became feeding herself.`],
  14: [`Mary Jane's evolution rooted in homestead abundance — harvest identity made flesh.`],
  15: [`Lilith's evolution crowned predation — gravity form, appetite as architecture.`],
  16: [`Sophia's evolution outran wellness branding — want chose a louder vessel.`],
  17: [`Indiana's evolution mapped appetite like ruins — new form, richer digs, identity excavated.`],
  18: [`Talia's evolution re-specced the build — engineering hunger, grease on fingers, yield up.`],
};

for (const [id, lines] of Object.entries(weighIn)) {
  const sid = Number(id);
  const when = sid === 18 ? { studentId: sid, custom: false } : { studentId: sid };
  registerModuleVariants('echo.type.weigh_in', [{ when, weight: W, text: lines }]);
}

for (const [id, lines] of Object.entries(stageUp)) {
  const sid = Number(id);
  const when = sid === 18 ? { studentId: sid, custom: false } : { studentId: sid };
  registerModuleVariants('echo.type.stage_up', [{ when, weight: W, text: lines }]);
}

for (const [id, lines] of Object.entries(dinnerUnbutton)) {
  const sid = Number(id);
  const when = sid === 18 ? { studentId: sid, custom: false } : { studentId: sid };
  registerModuleVariants('echo.type.dinner_unbutton', [{ when, weight: W, text: lines }]);
}

for (const [id, lines] of Object.entries(immobility)) {
  registerModuleVariants('echo.type.immobility', [{ when: { studentId: Number(id), stageMin: 9 }, weight: W, text: lines }]);
}

for (const [id, lines] of Object.entries(corruption)) {
  registerModuleVariants('echo.type.corruption_tier', [{ when: { studentId: Number(id), corruptionMin: 40 }, weight: W, text: lines }]);
}

for (const [id, lines] of Object.entries(evolution)) {
  const sid = Number(id);
  const when = sid === 18 ? { studentId: sid, custom: false, stageMin: 5 } : { studentId: sid, stageMin: 5 };
  registerModuleVariants('echo.type.evolution', [{ when, weight: W, text: lines }]);
}
