import { registerPool } from '../../engine.js';
import '../../modules.js';

registerPool('device.campus.remote', [
  { when: { targetType: 'npc_random' }, text: [
    'the remote rig tags a stranger off-campus — anonymous gain',
    'campus air carries the pulse to someone who never opted in',
    'a random body swells under your distant command',
  ] },
  { when: {}, text: [
    'the campus tool fires at range — consequences elsewhere',
    'remote protocol executes; distance is no shield',
    'the rig reaches past the lab walls',
  ] },
]);

registerPool('device.campus.class', [
  { when: {}, text: [
    'the floor meeting hall absorbs a floor-wide pulse',
    'dozens of bodies feel the same incremental push',
    'group targeting — statistics disguised as an accident',
  ] },
]);

registerPool('device.campus.discovery', [
  { when: {}, text: [
    'someone might have noticed — scrutiny creeps',
    'a witness glance could cost you later',
    'discovery risk hangs in the hallway air',
  ] },
]);

registerPool('device.campus.risk', [
  { when: {}, text: [
    'administrative eyes feel closer when you play at scale',
    'the bolder the target, the louder the echo',
    'remote cruelty trades privacy for reach',
  ] },
]);

registerPool('device.campus.context', [
  { when: {}, text: [
    'another off-book use of Talia\'s catalog',
    'you log the outcome mentally and move on',
    'campus becomes another test bench',
  ] },
]);
