// The Squad — Lead: A4 Architect | Support: A2 Psych, A5 Editor
// Auto-generated — run: node scripts/generateDeviceDepth.mjs
// Wildcard depth for device.catalog, device.psych, device.tick pools (Pass 34).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('device.catalog.feeding_mask', [{ when: {}, text: ["Harness locks; pump delivers on schedule — mechanical feeding without negotiation.", "Intake rig calibrated to advance her whether she is ready or not."] }]);
registerModuleVariants('device.psych.feeding_mask', [{ when: {}, text: ["Swallow reflex yields to the machine — body learning obedience by repetition.", "She stops counting bites; the mask counts for her."] }]);
registerModuleVariants('device.catalog.auto_feeder_arm', [{ when: {}, text: ["Servo arm cycles tray after tray — feeding as automation, appetite as output.", "Steady mechanical rhythm; she receives what the arm decides."] }]);
registerModuleVariants('device.psych.auto_feeder_arm', [{ when: {}, text: ["Mechanical generosity removes choice — she eats because the arm insists.", "Rhythm replaces willpower; fullness arrives on schedule."] }]);
registerModuleVariants('device.catalog.obedience_belt', [{ when: {}, text: ["Waist harness wired to compliance — hesitation costs, obedience rewards.", "Shame and dependence climb with every pound the belt counts."] }]);
registerModuleVariants('device.psych.obedience_belt', [{ when: {}, text: ["Compliance settles into muscle memory — shame optional, obedience not.", "She breathes around the belt like it always belonged there."] }]);
registerModuleVariants('device.catalog.auto_bloating_belt', [{ when: {}, text: ["Reinforced waist rig cycles pressure outward — middle volume on a timer.", "Slow relentless inflation; skin drum-tight, breath shallow with fullness."] }]);
registerModuleVariants('device.psych.auto_bloating_belt', [{ when: {}, text: ["Pressure becomes familiar — swelling expected, even welcomed.", "She tracks the cycle clinically, then surrenders to the swell."] }]);
registerModuleVariants('device.catalog.living_furniture_rig', [{ when: {}, text: ["Restraints reshape her into functional furniture — fed to stay comfortable.", "Immobility as feature; harness presents belly, cushions weight."] }]);
registerModuleVariants('device.psych.living_furniture_rig', [{ when: {}, text: ["Furniture-comfort rewires want — stillness feels earned, feeding feels kind.", "She accepts the rig like a throne built for her size."] }]);
registerModuleVariants('device.catalog.reinforced_legs', [{ when: {}, text: ["Braced supports bear furniture-scale loads — stability while she swells.", "Thigh stabilizers creak; leverage where softness needs structure."] }]);
registerModuleVariants('device.psych.reinforced_legs', [{ when: {}, text: ["Braces make heaviness possible — she trusts the supports with her weight.", "Stability lets appetite run; the legs hold what the belly gains."] }]);
registerModuleVariants('device.catalog.growth_accelerator_chamber', [{ when: {}, text: ["Sealed chamber warmth accelerates deposition — pleasurable, unpredictable growth.", "Radiation field hums; soft flesh answers faster than caution allows."] }]);
registerModuleVariants('device.psych.growth_accelerator_chamber', [{ when: {}, text: ["Growth surge thrills more than it frightens — she watches herself arrive.", "Chamber warmth breeds anticipation; change feels like reward."] }]);
registerModuleVariants('device.catalog.growth_serum_injector', [{ when: {}, text: ["One-shot volatile delivery — dramatic localized growth, never fully predictable.", "Compound floods tissue; curves answer before she can brace."] }]);
registerModuleVariants('device.psych.growth_serum_injector', [{ when: {}, text: ["Serum heat spreads outward — curiosity wins over caution.", "She feels the compound work and does not ask it to stop."] }]);
registerModuleVariants('device.catalog.endless_hunger_engine', [{ when: {}, text: ["Handheld ray suppresses satiety — hunger becomes obsession until she feeds.", "Engine hum rewrites appetite; stomach insists past every limit."] }]);
registerModuleVariants('device.psych.endless_hunger_engine', [{ when: {}, text: ["Hunger rewrites the week — distress and want braid together.", "Appetite friction becomes obsession; feeding feels like relief."] }]);
registerModuleVariants("device.tick.malfClause", [{ when: {}, text: ["", "", ""] }]);
registerModuleVariants("device.tick.synergy", [{ when: {}, text: [""] }]);
registerModuleVariants("device.tick.gainTag", [{ when: {}, text: ["", ""] }]);
registerModuleVariants("device.tick.beat", [{ when: {}, text: ["{device.tick.action}{device.tick.anchor}{join:device.tick.dependence|prefix: — }; {device.tick.growth}{join:device.tick.sensation|prefix: — }."] }]);
