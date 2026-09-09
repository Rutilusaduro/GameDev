#!/usr/bin/env node
/** Pass 5 — classEvents floor check-in retheme */
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const file = join(import.meta.dirname, '..', 'src', 'gameData', 'classEvents.js');

const REPLACEMENTS = [
  [/🍕 Class Pizza Party/g, '🍕 Floor Pizza Night'],
  [/An excessive whole-class pizza/g, 'An excessive whole-floor pizza'],
  [/🥘 Class Potluck/g, '🥘 Floor Potluck'],
  [/🦃 Holiday Class Feast/g, '🦃 Holiday Floor Feast'],
  [/in-class task/g, 'in-lounge task'],
  [/in-class/g, 'in-lounge'],
  [/After class you/g, 'After check-in you'],
  [/after class/g, 'after check-in'],
  [/end of class/g, 'end of check-in'],
  [/mid-lecture/g, 'mid-check-in'],
  [/the lecture/g, 'the check-in'],
  [/whole lecture/g, 'whole check-in'],
  [/lecture resumes/g, 'check-in resumes'],
  [/lecture ends/g, 'check-in ends'],
  [/lecture is cancelled/g, 'programming is cancelled'],
  [/best class/g, 'best night'],
  [/this class/g, 'this floor'],
  [/The class/g, 'The floor'],
  [/the class/g, 'the floor'],
  [/class-wide/g, 'floor-wide'],
  [/class food feature/g, 'floor food feature'],
  [/class potluck/g, 'floor potluck'],
  [/class group project/g, 'floor group project'],
  [/class snack break/g, 'floor snack break'],
  [/class birthday/g, 'floor birthday'],
  [/class slump/g, 'floor slump'],
  [/class extended/g, 'floor extended'],
  [/second slide/g, 'second topic'],
  [/rest of the hour/g, 'rest of the visit'],
  [/the bell/g, 'closing time'],
  [/dim the lights/g, 'dim the lounge lights'],
  [/back row/g, 'back couch'],
  [/desk —/g, 'side table —'],
  [/onto her desk/g, 'beside her'],
  [/her desk/g, 'her spot'],
  [/slides into her seat/g, 'drops onto the couch'],
  [/into her seat/g, 'onto the couch'],
  [/You call on her/g, 'You check in with her'],
  [/You read a passage from her paper/g, 'You read a passage from her journal'],
  [/pauses mid-lecture/g, 'pauses mid-check-in'],
  [/kind of class where/g, 'kind of night where'],
  [/today's lecture/g, "tonight's programming"],
  [/announce today's lecture/g, "announce tonight's programming"],
  [/unscheduled break mid-lecture/g, 'unscheduled break mid-check-in'],
];

let text = readFileSync(file, 'utf8');
let next = text;
for (const [from, to] of REPLACEMENTS) next = next.replace(from, to);
if (next !== text) {
  writeFileSync(file, next);
  console.log('pass5: classEvents.js updated');
} else {
  console.log('pass5: no changes');
}
