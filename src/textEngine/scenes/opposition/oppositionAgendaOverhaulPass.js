// The Squad — Lead: A2 Psych | Support: A5 Editor
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('opposition.agenda.wellness_seminar', [
  { when: { stageMin: 5 }, weight: 3, text: [
    'Workshop slides preach moderation; your hall answers with seconds anyway — policy versus appetite.',
  ]},
  { when: {}, text: [
    'Mandatory wellness hour — restraint performed aloud while bellies remember otherwise.',
  ]},
]);

registerModuleVariants('opposition.agenda.device_confiscation', [
  { when: {}, weight: 3, text: [
    'Compliance schedules a raid — steel and paperwork hunting the hardware that keeps her growing.',
  ]},
]);

registerModuleVariants('opposition.agenda.faculty_informant', [
  { when: {}, weight: 3, text: [
    'A faculty memo circulates — concern dressed as care, scrutiny dressed as documentation.',
  ]},
]);

registerModuleVariants('opposition.agenda.student_advocacy', [
  { when: {}, weight: 2, text: [
    'Board advocate amplifies resident voice — appetite reframed as wellness, scrutiny briefly confused.',
  ]},
]);

registerModuleVariants('opposition.agenda.fire', [
  { when: { stageMin: 7 }, weight: 3, text: [
    'Agenda resolves into flesh — policy finds a body to blame, the hall tightens, dinner still wins.',
  ]},
]);
