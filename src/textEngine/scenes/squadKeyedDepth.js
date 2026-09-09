// The Squad — Lead: A4 Architect | Phase B.2 keyed persona depth
// Auto-generated — run: node scripts/generateKeyedDepth.mjs
// Adds supplemental lines to keyed cells under the ≥3-text volume floor.
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('campus.moveSentence', [{ when: {"studentId":15,"stageMin":8}, weight: 4, text: ["{subject.name} {word.adv.pace|suffix: }{word.moveVerb.campus} {campus.destination}{word.adv.sizeQual|prefix: }.","{subject.name} {word.moveVerb.campus}{join:wi.mobilityClause,wi.bodyClause|prefix:, }{word.adv.sizeQual|prefix: }."] }]);
registerModuleVariants('campus.moveSentence', [{ when: {"studentId":0,"campusLocale":"gym","stageMin":6}, weight: 4, text: ["{subject.name} {word.adv.pace|suffix: }{word.moveVerb.campus} {campus.destination}{word.adv.sizeQual|prefix: }.","{subject.name} {word.moveVerb.campus}{join:wi.mobilityClause,wi.bodyClause|prefix:, }{word.adv.sizeQual|prefix: }."] }]);
registerModuleVariants('campus.spaceObs', [{ when: {"studentId":0,"campusLocale":"gym","stageMin":5,"stageMax":9}, weight: 4, text: ["Cassidy chooses the desk with the widest arm — hypothesis confirmed weekly."] }]);
registerModuleVariants('campus.spaceObs', [{ when: {"studentId":1,"campusLocale":"floor meeting_hall","stageMin":5,"stageMax":9}, weight: 4, text: ["Brittany tests equipment like team gear — what fits, what groans, what earns respect."] }]);
registerModuleVariants('campus.spaceObs', [{ when: {"studentId":2,"campusLocale":"hallway","stageMin":5,"stageMax":9}, weight: 4, text: ["Brittany tests equipment like team gear — what fits, what groans, what earns respect."] }]);
registerModuleVariants('campus.spaceObs', [{ when: {"studentId":4,"campusLocale":"dorm_room","stageMin":5,"stageMax":9}, weight: 4, text: ["Brittany tests equipment like team gear — what fits, what groans, what earns respect."] }]);
registerModuleVariants('campus.spaceObs', [{ when: {"studentId":15,"campusLocale":"hallway","stageMin":6}, weight: 4, text: ["Brittany tests equipment like team gear — what fits, what groans, what earns respect."] }]);
registerModuleVariants('campus.seenBeat', [{ when: {"stageMin":0,"stageMax":1}, text: ["Brittany catches a teammate staring at her middle and grins. \"Eyes up — or don't. Your call.\"","Captain's uniform strains at practice. She owns it like a trophy."] }]);
registerModuleVariants('campus.seenBeat', [{ when: {"studentId":0,"stageMin":4,"stageMax":7}, weight: 4, text: ["Someone looks twice and pretends they did not."] }]);
registerModuleVariants('campus.seenBeat', [{ when: {"studentId":1,"stageMin":3,"stageMax":6}, weight: 4, text: ["Someone looks twice and pretends they did not.","Brittany catches a teammate staring at her middle and grins. \"Eyes up — or don't. Your call.\""] }]);
registerModuleVariants('campus.seenBeat', [{ when: {"studentId":4,"stageMin":4}, weight: 4, text: ["Someone looks twice and pretends they did not.","Brittany catches a teammate staring at her middle and grins. \"Eyes up — or don't. Your call.\""] }]);
registerModuleVariants('campus.seenBeat', [{ when: {"studentId":9,"campusLocale":"cafeteria","stageMin":5}, weight: 4, text: ["Someone looks twice and pretends they did not.","Brittany catches a teammate staring at her middle and grins. \"Eyes up — or don't. Your call.\""] }]);
registerModuleVariants('campus.seenBeat', [{ when: {"studentId":15,"stageMin":6}, weight: 4, text: ["Someone looks twice and pretends they did not.","Brittany catches a teammate staring at her middle and grins. \"Eyes up — or don't. Your call.\""] }]);
registerModuleVariants('campus.seenBeat', [{ when: {"studentId":17,"stageMin":4}, weight: 4, text: ["Someone looks twice and pretends they did not.","Brittany catches a teammate staring at her middle and grins. \"Eyes up — or don't. Your call.\""] }]);
registerModuleVariants('immob.attempt', [{ when: {"stageMin":0,"stageMax":9}, text: ["Movement measured in inches, not miles."] }]);
registerModuleVariants('immob.hint.heat', [{ when: {"stageMin":0,"stageMax":9}, text: ["The room feels close. Her body holds heat like a settled furnace."] }]);
registerModuleVariants('immob.hint.position', [{ when: {"stageMin":0,"stageMax":9}, text: ["Her weight redistributes with a quiet, unsatisfied sigh."] }]);
registerModuleVariants('immob.hint.food', [{ when: {"stageMin":0,"stageMax":11}, text: ["\"Next time,\" she murmurs, \"bring the good stuff.\""] }]);
registerModuleVariants('shift.denial', [{ when: {"stageMax":1}, text: ["\"It's fine,\" she says — meaning temporary. She hopes."] }]);
