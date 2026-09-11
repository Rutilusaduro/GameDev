// Branching evolved-form events — MIGRATION.md extract (engine: scenes/evolved/).
// Evolved prose stub migration (step 6) — bridge cells; evolved.scene fragments @ week 20+.
import { SALON_EVOLVED_EVENTS } from './chloeSalon.js';
import { GALLERY_EVOLVED_EVENTS } from './fionaGallery.js';

export const EVOLVED_EVENTS = {
  sumo:[
    {
      title:"Regional Qualifier",
      phases:[
        {
          text:(h,s)=>`sumo s0p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"load_hard",label:"Load up on chanko — weight is force",result:"Choice load_hard (sumo) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:4,flag:"loaded"},
            {id:"warm_up",label:"Drill the footwork — plant, drive, low base",result:"Choice warm_up (sumo) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:6,flag:"paced"}
          ]
        },
        {
          text:(h,s)=>`sumo s0p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"own_it",label:"Hold her gaze. \"For now.\"",result:"Choice own_it (sumo) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:6,flag:"confident"},
            {id:"stay_focused",label:"Say nothing. Get your head right.",result:"Choice stay_focused (sumo) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:4,flag:"paced"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:(h,s,gain)=>`sumo ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0},
        {condition:()=>true,text:(h,s,gain)=>`sumo ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0}
      ]
    },
    {
      title:"Circuit Tournament",
      phases:[
        {
          text:(h,s)=>`sumo s1p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"load_hard",label:"Hit the chanko hard — pounds are power",result:"Choice load_hard (sumo) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:11,rel:4,flag:"loaded"},
            {id:"warm_up",label:"Work the forms — drive, plant, low base",result:"Choice warm_up (sumo) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:7,flag:"paced"}
          ]
        },
        {
          text:(h,s)=>`sumo s1p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"own_it",label:"\"Wait till spring.\"",result:"Choice own_it (sumo) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:6,flag:"confident"},
            {id:"stay_focused",label:"Step off and lock in.",result:"Choice stay_focused (sumo) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:5,flag:"paced"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:(h,s,gain)=>`sumo ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0},
        {condition:()=>true,text:(h,s,gain)=>`sumo ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0}
      ]
    },
    {
      title:"State Championship",
      phases:[
        {
          text:(h,s)=>`sumo s2p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"load_hard",label:"Eat like you mean it — widen the gap",result:"Choice load_hard (sumo) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:12,rel:4,flag:"loaded"},
            {id:"warm_up",label:"Drill — let the technique catch up to the body",result:"Choice warm_up (sumo) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:9,flag:"paced"}
          ]
        },
        {
          text:(h,s)=>`sumo s2p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"own_it",label:"Hold her gaze. \"There it is.\"",result:"Choice own_it (sumo) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:8,flag:"confident"},
            {id:"stay_focused",label:"Step off and get to the center.",result:"Choice stay_focused (sumo) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:5,flag:"paced"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:(h,s,gain)=>`sumo ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0},
        {condition:()=>true,text:(h,s,gain)=>`sumo ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0}
      ]
    },
    {
      title:"National Qualifier",
      phases:[
        {
          text:(h,s)=>`sumo s3p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"load_hard",label:"Eat enormous — out of her reach",result:"Choice load_hard (sumo) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:14,rel:4,flag:"loaded"},
            {id:"warm_up",label:"Move through the forms — craft to match the mass",result:"Choice warm_up (sumo) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:9,flag:"paced"}
          ]
        },
        {
          text:(h,s)=>`sumo s3p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"own_it",label:"Let the number land. Let them look.",result:"Choice own_it (sumo) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:9,flag:"confident"},
            {id:"acknowledge_crowd",label:"Find the crowd and let them see you.",result:"Choice acknowledge_crowd (sumo) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:8,flag:"confident"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:(h,s,gain)=>`sumo ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0},
        {condition:()=>true,text:(h,s,gain)=>`sumo ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0}
      ]
    },
    {
      title:"National Circuit Finals",
      phases:[
        {
          text:(h,s)=>`sumo s4p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"load_hard",label:"Eat seriously — ballast for your stance",result:"Choice load_hard (sumo) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:16,rel:5,flag:"loaded"},
            {id:"warm_up",label:"Move through the forms one last time",result:"Choice warm_up (sumo) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:9,rel:10,flag:"paced"}
          ]
        },
        {
          text:(h,s)=>`sumo s4p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"own_it",label:"Turn into the noise. Let them see all of you.",result:"Choice own_it (sumo) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:10,flag:"confident"},
            {id:"stay_focused",label:"Step off. One hand on your belly. Ready.",result:"Choice stay_focused (sumo) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:6,flag:"paced"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:(h,s,gain)=>`sumo ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0},
        {condition:()=>true,text:(h,s,gain)=>`sumo ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0}
      ]
    },
    {
      title:"Grand Invitational Exhibition",
      phases:[
        {
          text:(h,s)=>`sumo s5p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"load_hard",label:"Fill your belly completely — weight is the weapon",result:"Choice load_hard (sumo) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:18,rel:5,flag:"loaded"},
            {id:"warm_up",label:"Move through the forms — plant, root, presence",result:"Choice warm_up (sumo) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:10,flag:"paced"}
          ]
        },
        {
          text:(h,s)=>`sumo s5p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"own_it",label:"Turn to face the room fully. All of you.",result:"Choice own_it (sumo) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:10,flag:"confident"},
            {id:"stay_focused",label:"Step off. One hand on your belly. Eyes on the dohyo.",result:"Choice stay_focused (sumo) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:6,flag:"paced"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:(h,s,gain)=>`sumo ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0},
        {condition:()=>true,text:(h,s,gain)=>`sumo ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0}
      ]
    }
  ],

  eating_captain:[
    {
      title:"Regional Open — First Entry",
      phases:[
        {
          text:(h,s)=>`eating_captain s0p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"load_hard",label:"Load aggressively — eat everything on the table",result:"Choice load_hard (eating_captain) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:4,flag:"loaded"},
            {id:"eat_smart",label:"Eat with discipline — full enough to compete, room to grow",result:"Choice eat_smart (eating_captain) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:5,flag:"paced"}
          ]
        },
        {
          text:(h,s)=>`eating_captain s0p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"own_it",label:"Hold still. Let the number stand.",result:"Choice own_it (eating_captain) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:6,flag:"confident"},
            {id:"read_maya",label:"Step off and look at Maya.",result:"Choice read_maya (eating_captain) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:5,flag:"confident"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:(h,s,gain)=>`eating_captain ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0},
        {condition:()=>true,text:(h,s,gain)=>`eating_captain ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0}
      ]
    },
    {
      title:"Circuit Regular",
      phases:[
        {
          text:(h,s)=>`eating_captain s1p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"load_hard",label:"Eat everything — load up like you mean it",result:"Choice load_hard (eating_captain) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:11,rel:4,flag:"loaded"},
            {id:"eat_smart",label:"Eat smart — then say something back to the Central woman",result:"Choice eat_smart (eating_captain) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:7,flag:"paced"}
          ]
        },
        {
          text:(h,s)=>`eating_captain s1p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"own_it",label:"Hold still. Watch Maya's face.",result:"Choice own_it (eating_captain) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:6,flag:"confident"},
            {id:"stay_focused",label:"Don't look at anyone. Get back in your head.",result:"Choice stay_focused (eating_captain) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:4,flag:"paced"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:(h,s,gain)=>`eating_captain ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0},
        {condition:()=>true,text:(h,s,gain)=>`eating_captain ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0}
      ]
    },
    {
      title:"Conference Championship",
      phases:[
        {
          text:(h,s)=>`eating_captain s2p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"load_hard",label:"Load aggressively — this is the conference, go for everything",result:"Choice load_hard (eating_captain) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:12,rel:4,flag:"loaded"},
            {id:"eat_smart_and_talk",label:"Eat with discipline — then say something to Maya",result:"Choice eat_smart_and_talk (eating_captain) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:9,flag:"paced"}
          ]
        },
        {
          text:(h,s)=>`eating_captain s2p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"make_eye_contact",label:"Step off the scale and make eye contact with Maya.",result:"Choice make_eye_contact (eating_captain) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:8,flag:"confident"},
            {id:"stay_in_head",label:"Step off. Don't look at anyone. Get to the table.",result:"Choice stay_in_head (eating_captain) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:5,flag:"paced"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:(h,s,gain)=>`eating_captain ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0},
        {condition:()=>true,text:(h,s,gain)=>`eating_captain ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0}
      ]
    },
    {
      title:"National Qualifier",
      phases:[
        {
          text:(h,s)=>`eating_captain s3p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"load_hard",label:"Ignore the journalist — load up hard, focus on the food",result:"Choice load_hard (eating_captain) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:14,rel:4,flag:"loaded"},
            {id:"give_statement",label:"Give the journalist a statement, then eat smart",result:"Choice give_statement (eating_captain) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:9,flag:"paced"}
          ]
        },
        {
          text:(h,s)=>`eating_captain s3p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"take_it_in",label:"Stand still and let the moment be what it is.",result:"Choice take_it_in (eating_captain) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:8,flag:"confident"},
            {id:"acknowledge_crowd",label:"Look at the crowd when you step off.",result:"Choice acknowledge_crowd (eating_captain) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:10,flag:"confident"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:(h,s,gain)=>`eating_captain ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0},
        {condition:()=>true,text:(h,s,gain)=>`eating_captain ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0}
      ]
    },
    {
      title:"National Championship Final",
      phases:[
        {
          text:(h,s)=>`eating_captain s4p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"load_hard",label:"Eat everything — load up with complete focus. This is what you trained for.",result:"Choice load_hard (eating_captain) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:16,rel:5,flag:"loaded"},
            {id:"eat_smart_acknowledge",label:"Eat smart — and then say something to Maya.",result:"Choice eat_smart_acknowledge (eating_captain) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:9,rel:10,flag:"paced"}
          ]
        },
        {
          text:(h,s)=>`eating_captain s4p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"face_the_crowd",label:"Turn and face the crowd.",result:"Choice face_the_crowd (eating_captain) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:10,flag:"confident"},
            {id:"stay_in_your_head",label:"Don't acknowledge the crowd. Get to the table.",result:"Choice stay_in_your_head (eating_captain) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:6,flag:"paced"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:(h,s,gain)=>`eating_captain ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0},
        {condition:()=>true,text:(h,s,gain)=>`eating_captain ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0}
      ]
    },
    {
      title:"Grand Invitational",
      phases:[
        {
          text:(h,s)=>`eating_captain s5p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"load_hard",label:"Eat everything — fill completely, every available item",result:"Choice load_hard (eating_captain) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:18,rel:5,flag:"loaded"},
            {id:"eat_smart",label:"Eat to capacity — precise, controlled, leave space for the table",result:"Choice eat_smart (eating_captain) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:8,flag:"paced"}
          ]
        },
        {
          text:(h,s)=>`eating_captain s5p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"own_it",label:"Face the stream camera directly. Let the whole number land.",result:"Choice own_it (eating_captain) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:12,flag:"confident"},
            {id:"look_at_maya",label:"Look at Maya. Say: \"You came back.\"",result:"Choice look_at_maya (eating_captain) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:8,flag:"confident"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:(h,s,gain)=>`eating_captain ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0},
        {condition:()=>true,text:(h,s,gain)=>`eating_captain ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0}
      ]
    }
  ],

  eating_streamer:[
    {
      title:"First Real Mukbang",
      phases:[
        {
          text:(h,s)=>`eating_streamer s0p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"hype_chat",label:"Hype chat up — promise them a real challenge",result:"Choice hype_chat (eating_streamer) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:8,flag:"hyped"},
            {id:"load_pre",label:"Eat a little on camera before the challenge starts",result:"Choice load_pre (eating_streamer) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:6,flag:"preloaded"}
          ]
        },
        {
          text:(h,s)=>`eating_streamer s0p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"own_nerves",label:"Admit the nerves — good nervous, let's eat",result:"Choice own_nerves (eating_streamer) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:7,flag:"confident"},
            {id:"play_cool",label:"Play it cool — act like you've done this forever",result:"Choice play_cool (eating_streamer) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:5,flag:"cool"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("preloaded")&&h.includes("hyped"),text:(h,s,gain)=>`eating_streamer ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:4,relBonus:6,startsStream:true},
        {condition:h=>h.includes("confident"),text:(h,s,gain)=>`eating_streamer ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:2,relBonus:8,startsStream:true},
        {condition:()=>true,text:(h,s,gain)=>`eating_streamer ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:5,startsStream:true}
      ]
    },
    {
      title:"Sponsor Pressure",
      phases:[
        {
          text:(h,s)=>`eating_streamer s1p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"lean_brand",label:"Lean into the sponsor angle on camera",result:"Choice lean_brand (eating_streamer) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:6,flag:"brand_push"},
            {id:"push_back",label:"Tease chat — make them beg before you obey",result:"Choice push_back (eating_streamer) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:8,flag:"tease"}
          ]
        },
        {
          text:(h,s)=>`eating_streamer s1p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"accept_hype",label:"\"Let's ruin my stomach on brand time.\"",result:"Choice accept_hype (eating_streamer) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:7,flag:"feral"},
            {id:"stay_cute",label:"Play cute — \"I'm too full already~\"",result:"Choice stay_cute (eating_streamer) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:9,flag:"brat"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("brand_push")&&h.includes("feral"),text:(h,s,gain)=>`eating_streamer ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:6,relBonus:8,startsStream:true},
        {condition:h=>h.includes("tease"),text:(h,s,gain)=>`eating_streamer ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:3,relBonus:10,startsStream:true},
        {condition:()=>true,text:(h,s,gain)=>`eating_streamer ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:6,startsStream:true}
      ]
    },
    {
      title:"Trending Night",
      phases:[
        {
          text:(h,s)=>`eating_streamer s2p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"welcome_wave",label:"Welcome the new viewers — show them the format",result:"Choice welcome_wave (eating_streamer) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:7,flag:"welcoming"},
            {id:"ignore_hype",label:"Ignore the hype — act like this is normal",result:"Choice ignore_hype (eating_streamer) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:5,flag:"unbothered"}
          ]
        },
        {
          text:(h,s)=>`eating_streamer s2p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"clip_bait",label:"Set up a clip-worthy moment before the challenge",result:"Choice clip_bait (eating_streamer) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:8,flag:"clip_bait"},
            {id:"speed_run",label:"\"No preamble — challenge starts now.\"",result:"Choice speed_run (eating_streamer) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:6,flag:"speed_run"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("welcoming")&&h.includes("clip_bait"),text:(h,s,gain)=>`eating_streamer ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:8,relBonus:10,startsStream:true},
        {condition:h=>h.includes("speed_run"),text:(h,s,gain)=>`eating_streamer ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:5,relBonus:7,startsStream:true},
        {condition:()=>true,text:(h,s,gain)=>`eating_streamer ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:8,startsStream:true}
      ]
    },
    {
      title:"Sold-Out Energy",
      phases:[
        {
          text:(h,s)=>`eating_streamer s3p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"embrace_sold_out",label:"Own the sold-out thing — \"yeah they own me\"",result:"Choice embrace_sold_out (eating_streamer) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:6,flag:"sold_out"},
            {id:"defiant_tease",label:"Pretend you still have choices — pick from their list dramatically",result:"Choice defiant_tease (eating_streamer) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:9,flag:"defiant"}
          ]
        },
        {
          text:(h,s)=>`eating_streamer s3p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"trash_talk",label:"Trash-talk chat before round one",result:"Choice trash_talk (eating_streamer) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:7,flag:"trash_talk"},
            {id:"silent_start",label:"Go quiet — let the food do the talking",result:"Choice silent_start (eating_streamer) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:5,flag:"silent"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("sold_out")&&h.includes("trash_talk"),text:(h,s,gain)=>`eating_streamer ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:10,relBonus:9,startsStream:true},
        {condition:h=>h.includes("defiant"),text:(h,s,gain)=>`eating_streamer ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:6,relBonus:11,startsStream:true},
        {condition:()=>true,text:(h,s,gain)=>`eating_streamer ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:7,startsStream:true}
      ]
    },
    {
      title:"Icon Stream",
      phases:[
        {
          text:(h,s)=>`eating_streamer s4p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"legend_mode",label:"\"This is what an icon eats.\" — main-character energy",result:"Choice legend_mode (eating_streamer) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:8,flag:"legend"},
            {id:"grateful_real",label:"Get genuinely soft with chat for a minute",result:"Choice grateful_real (eating_streamer) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:12,flag:"grateful"}
          ]
        },
        {
          text:(h,s)=>`eating_streamer s4p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"max_challenge",label:"Run the longest, hardest challenge they'll give you",result:"Choice max_challenge (eating_streamer) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:7,flag:"max_challenge"},
            {id:"crowd_pick",label:"Let chat pick between two brutal options",result:"Choice crowd_pick (eating_streamer) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:10,flag:"crowd_pick"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("legend")&&h.includes("max_challenge"),text:(h,s,gain)=>`eating_streamer ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:14,relBonus:12,startsStream:true},
        {condition:h=>h.includes("grateful")&&h.includes("crowd_pick"),text:(h,s,gain)=>`eating_streamer ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:10,relBonus:15,startsStream:true},
        {condition:()=>true,text:(h,s,gain)=>`eating_streamer ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:10,startsStream:true}
      ]
    }
  ],

  feedee_creator:[
    {
      title:"First Collab",
      phases:[
        {
          text:(h,s)=>`feedee_creator s0p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"warmup_both",label:"Eat something before going live — both of you",result:"Choice warmup_both (feedee_creator) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:8,flag:"both_loaded"},
            {id:"talk_dynamic",label:"Talk through the dynamic — what the feeding looks like on camera",result:"Choice talk_dynamic (feedee_creator) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:10,flag:"established_dynamic"}
          ]
        },
        {
          text:(h,s)=>`feedee_creator s0p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"feed_her_first",label:"Feed her first — put something on her side of the table",result:"Choice feed_her_first (feedee_creator) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:9,flag:"fed_first"},
            {id:"both_go",label:"Start simultaneously — both eating on camera together",result:"Choice both_go (feedee_creator) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:8,flag:"simultaneous_start"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("both_loaded")&&h.includes("established_dynamic")&&h.includes("fed_first"),text:(h,s,gain)=>`feedee_creator ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:10,relBonus:14,startsStream:true},
        {condition:h=>h.includes("both_loaded")&&h.includes("fed_first"),text:(h,s,gain)=>`feedee_creator ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:7,relBonus:10,startsStream:true},
        {condition:h=>h.includes("established_dynamic"),text:(h,s,gain)=>`feedee_creator ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:5,relBonus:9,startsStream:true},
        {condition:()=>true,text:(h,s,gain)=>`feedee_creator ending 3 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:7,startsStream:true}
      ]
    },
    {
      title:"Weekly Collab",
      phases:[
        {
          text:(h,s)=>`feedee_creator s1p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"loaded_both",label:"Both eat a warmup plate before going live",result:"Choice loaded_both (feedee_creator) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:8,flag:"both_loaded"},
            {id:"bigger_spread",label:"Set a larger-than-usual spread — announce it to the chat as a special",result:"Choice bigger_spread (feedee_creator) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:10,flag:"special_stream"}
          ]
        },
        {
          text:(h,s)=>`feedee_creator s1p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"reveal_weights",label:"Announce both weights to the chat — simultaneously on camera",result:"Choice reveal_weights (feedee_creator) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:12,flag:"dual_reveal"},
            {id:"push_partner",label:"Feed her an extra course — push the format further",result:"Choice push_partner (feedee_creator) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:10,flag:"pushed_partner"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("both_loaded")&&h.includes("dual_reveal"),text:(h,s,gain)=>`feedee_creator ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:14,relBonus:14,startsStream:true},
        {condition:h=>h.includes("dual_reveal"),text:(h,s,gain)=>`feedee_creator ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:9,relBonus:11,startsStream:true},
        {condition:h=>h.includes("both_loaded"),text:(h,s,gain)=>`feedee_creator ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:7,relBonus:8,startsStream:true},
        {condition:()=>true,text:(h,s,gain)=>`feedee_creator ending 3 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:6,startsStream:true}
      ]
    },
    {
      title:"Featured Collab",
      phases:[
        {
          text:(h,s)=>`feedee_creator s2p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"feature_spread",label:"Set the largest spread you've ever done together — rise to the feature",result:"Choice feature_spread (feedee_creator) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:11,flag:"both_loaded"},
            {id:"pre_talk_feature",label:"Talk about the feature before going live — what the new audience will see",result:"Choice pre_talk_feature (feedee_creator) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:13,flag:"intentional"}
          ]
        },
        {
          text:(h,s)=>`feedee_creator s2p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"stage_push",label:"Feed her the biggest portion yet — make the new audience see what the format does",result:"Choice stage_push (feedee_creator) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:13,flag:"stage_push"},
            {id:"reveal_both_featured",label:"Do the double weight reveal for the new audience",result:"Choice reveal_both_featured (feedee_creator) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:14,flag:"dual_reveal"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("both_loaded")&&h.includes("stage_push"),text:(h,s,gain)=>`feedee_creator ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:18,relBonus:16,startsStream:true},
        {condition:h=>h.includes("dual_reveal"),text:(h,s,gain)=>`feedee_creator ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:12,relBonus:13,startsStream:true},
        {condition:h=>h.includes("both_loaded"),text:(h,s,gain)=>`feedee_creator ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:9,relBonus:10,startsStream:true},
        {condition:()=>true,text:(h,s,gain)=>`feedee_creator ending 3 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:7,startsStream:true}
      ]
    },
    {
      title:"Brand Collab",
      phases:[
        {
          text:(h,s)=>`feedee_creator s3p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"brand_warmup",label:"Both eat a full pre-stream warmup — arrive at the brand stream loaded",result:"Choice brand_warmup (feedee_creator) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:11,flag:"both_loaded"},
            {id:"plan_reveals",label:"Plan the double weight reveal — coordinate the timing for maximum impact",result:"Choice plan_reveals (feedee_creator) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:13,flag:"planned_reveal"}
          ]
        },
        {
          text:(h,s)=>`feedee_creator s3p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"brand_double_reveal",label:"Execute the double weight reveal — both numbers on camera simultaneously",result:"Choice brand_double_reveal (feedee_creator) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:15,flag:"dual_reveal"},
            {id:"max_feed",label:"Feed her the challenge course directly — hand to across-table",result:"Choice max_feed (feedee_creator) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:13,flag:"direct_feed"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("both_loaded")&&h.includes("dual_reveal"),text:(h,s,gain)=>`feedee_creator ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:21,relBonus:17,startsStream:true},
        {condition:h=>h.includes("dual_reveal"),text:(h,s,gain)=>`feedee_creator ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:14,relBonus:14,startsStream:true},
        {condition:h=>h.includes("both_loaded"),text:(h,s,gain)=>`feedee_creator ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:10,relBonus:11,startsStream:true},
        {condition:()=>true,text:(h,s,gain)=>`feedee_creator ending 3 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:8,startsStream:true}
      ]
    },
    {
      title:"Anniversary Collab",
      phases:[
        {
          text:(h,s)=>`feedee_creator s4p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"anniversary_load",label:"Both eat the biggest pre-stream warmup you've ever done",result:"Choice anniversary_load (feedee_creator) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:14,rel:15,flag:"both_loaded"},
            {id:"introduce_wren",label:"Introduce Wren to the stream — acknowledge the first fan, live",result:"Choice introduce_wren (feedee_creator) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:17,flag:"wren_acknowledged"}
          ]
        },
        {
          text:(h,s)=>`feedee_creator s4p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"year_scale",label:"Do the year reveal — both start weights versus now, live on camera",result:"Choice year_scale (feedee_creator) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:16,flag:"year_reveal"},
            {id:"anniversary_challenge",label:"Challenge her — the biggest feed of the anniversary stream, on your side and hers",result:"Choice anniversary_challenge (feedee_creator) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:15,flag:"challenged"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("both_loaded")&&h.includes("year_reveal"),text:(h,s,gain)=>`feedee_creator ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:26,relBonus:21,startsStream:true},
        {condition:h=>h.includes("year_reveal"),text:(h,s,gain)=>`feedee_creator ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:17,relBonus:16,startsStream:true},
        {condition:h=>h.includes("both_loaded"),text:(h,s,gain)=>`feedee_creator ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:12,relBonus:12,startsStream:true},
        {condition:()=>true,text:(h,s,gain)=>`feedee_creator ending 3 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:9,startsStream:true}
      ]
    },
    {
      title:"The Grand Collab",
      phases:[
        {
          text:(h,s)=>`feedee_creator s5p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"grand_load",label:"Both eat the largest pre-stream load you've ever done — start the grand collab fully loaded",result:"Choice grand_load (feedee_creator) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:20,rel:18,flag:"both_loaded"},
            {id:"wren_in_frame",label:"Acknowledge Wren on camera — bring her in for the grand collab opening",result:"Choice wren_in_frame (feedee_creator) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:20,flag:"wren_in_frame"}
          ]
        },
        {
          text:(h,s)=>`feedee_creator s5p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"grand_scale",label:"Do the grand collab scale reveal — both weights, 300k watching",result:"Choice grand_scale (feedee_creator) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:19,flag:"grand_scale"},
            {id:"grand_challenge",label:"Maximum challenge — both of you, everything left on the table",result:"Choice grand_challenge (feedee_creator) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:17,flag:"grand_challenge"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("both_loaded")&&h.includes("grand_scale"),text:(h,s,gain)=>`feedee_creator ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:34,relBonus:25,startsStream:true},
        {condition:h=>h.includes("grand_scale"),text:(h,s,gain)=>`feedee_creator ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:22,relBonus:19,startsStream:true},
        {condition:h=>h.includes("both_loaded"),text:(h,s,gain)=>`feedee_creator ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:15,relBonus:15,startsStream:true},
        {condition:()=>true,text:(h,s,gain)=>`feedee_creator ending 3 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:11,startsStream:true}
      ]
    }
  ],

  chapter_hostess:[
    {
      title:"Wednesday Feast",
      phases:[
        {
          text:(h,s)=>`chapter_hostess s0p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"arrive_with_more",label:"Arrive with additional food — double the dessert course",result:"Choice arrive_with_more (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:7,flag:"extra_food"},
            {id:"help_serve",label:"Help serve — be useful, watch how she runs it",result:"Choice help_serve (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:9}
          ]
        },
        {
          text:(h,s)=>`chapter_hostess s0p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"encourage_seconds",label:"Encourage the sisters to go back for more",result:"Choice encourage_seconds (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:8},
            {id:"talk_with_hostess",label:"Talk with her while she eats",result:"Choice talk_with_hostess (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:10,flag:"personal_moment"}
          ]
        },
        {
          text:(h,s)=>`chapter_hostess s0p2 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"end_of_feast_talk",label:"Stay after — help her clean up, talk",result:"Choice end_of_feast_talk (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:12,flag:"vision_shared"},
            {id:"leave_with_group",label:"Leave with the sisters, let her have the close",result:"Choice leave_with_group (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:5}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("extra_food")&&h.includes("encourage_seconds")&&h.includes("vision_shared"),text:(h,s,gain)=>`chapter_hostess ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:10,relBonus:13},
        {condition:h=>h.includes("extra_food")&&h.includes("encourage_seconds"),text:(h,s,gain)=>`chapter_hostess ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:7,relBonus:8},
        {condition:h=>h.includes("extra_food"),text:(h,s,gain)=>`chapter_hostess ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:4,relBonus:5},
        {condition:()=>true,text:(h,s,gain)=>`chapter_hostess ending 3 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:3}
      ]
    },
    {
      title:"The Grand Feast",
      phases:[
        {
          text:(h,s)=>`chapter_hostess s1p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"supplement_feast",label:"Arrive with a thirteenth course — surprise",result:"Choice supplement_feast (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:8,flag:"extra_food"},
            {id:"bring_new_guests",label:"Bring two guests outside the chapter",result:"Choice bring_new_guests (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:9,flag:"new_guests"}
          ]
        },
        {
          text:(h,s)=>`chapter_hostess s1p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"triple_dessert",label:"Fund triple dessert — for everyone, extra portions",result:"Choice triple_dessert (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:10,flag:"triple_dessert"},
            {id:"seat_beside_her",label:"Sit beside her for the second half",result:"Choice seat_beside_her (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:11,flag:"close_moment"}
          ]
        },
        {
          text:(h,s)=>`chapter_hostess s1p2 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"private_close",label:"Stay after — share the last course with her, just you",result:"Choice private_close (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:14,flag:"intimate_close"},
            {id:"group_send_off",label:"See the sisters out with her",result:"Choice group_send_off (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:6}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("extra_food")&&h.includes("triple_dessert")&&h.includes("intimate_close"),text:(h,s,gain)=>`chapter_hostess ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:13,relBonus:15},
        {condition:h=>h.includes("extra_food")&&h.includes("triple_dessert"),text:(h,s,gain)=>`chapter_hostess ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:8,relBonus:10},
        {condition:h=>h.includes("extra_food"),text:(h,s,gain)=>`chapter_hostess ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:5,relBonus:6},
        {condition:()=>true,text:(h,s,gain)=>`chapter_hostess ending 3 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:4}
      ]
    },
    {
      title:"Alumni Dinner",
      phases:[
        {
          text:(h,s)=>`chapter_hostess s2p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"coordinate_kitchen",label:"Help coordinate the kitchen — ensure she can host, not cook",result:"Choice coordinate_kitchen (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:10,flag:"coordinated"},
            {id:"introduce_her",label:"Introduce her to the primary funder as the architect of this culture",result:"Choice introduce_her (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:12,flag:"funder_met"}
          ]
        },
        {
          text:(h,s)=>`chapter_hostess s2p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"extra_course_alumni",label:"Fund an additional course specifically for the alumni",result:"Choice extra_course_alumni (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:9},
            {id:"sit_with_hostess",label:"Sit beside her and watch her work the room",result:"Choice sit_with_hostess (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:11}
          ]
        },
        {
          text:(h,s)=>`chapter_hostess s2p2 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"after_dinner_planning",label:"Stay for after-dinner planning — the next feast",result:"Choice after_dinner_planning (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:14,flag:"next_planned"},
            {id:"walk_out_alumna",label:"Walk the primary alumna out — cultivate the relationship",result:"Choice walk_out_alumna (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:9}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("funder_met")&&h.includes("extra_course_alumni")&&h.includes("next_planned"),text:(h,s,gain)=>`chapter_hostess ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:17,relBonus:15},
        {condition:h=>h.includes("funder_met")&&h.includes("extra_course_alumni"),text:(h,s,gain)=>`chapter_hostess ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:11,relBonus:10},
        {condition:h=>h.includes("funder_met"),text:(h,s,gain)=>`chapter_hostess ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:5,relBonus:7},
        {condition:()=>true,text:(h,s,gain)=>`chapter_hostess ending 3 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:4}
      ]
    },
    {
      title:"Rush Season Opening Feast",
      phases:[
        {
          text:(h,s)=>`chapter_hostess s3p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"full_opening_spread",label:"Fund the opening spread fully — anything she wants",result:"Choice full_opening_spread (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:12,rel:9,flag:"full_funding"},
            {id:"brief_pledges",label:"Brief the incoming pledges before they arrive",result:"Choice brief_pledges (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:11,flag:"pledges_prepared"}
          ]
        },
        {
          text:(h,s)=>`chapter_hostess s3p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"push_pledges_further",label:"Fund additional courses specifically for the pledges",result:"Choice push_pledges_further (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:10},
            {id:"hostess_speech",label:"Ask her to say something to the pledges midway through",result:"Choice hostess_speech (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:12,flag:"speech_given"}
          ]
        },
        {
          text:(h,s)=>`chapter_hostess s3p2 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"close_with_pledges",label:"Stay for the pledge close — hear her speak to them",result:"Choice close_with_pledges (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:14,flag:"pledge_close"},
            {id:"leave_early_with_senior_sisters",label:"Leave with the senior sisters — let her close alone",result:"Choice leave_early_with_senior_sisters (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:5}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("full_funding")&&h.includes("push_pledges_further")&&h.includes("pledge_close"),text:(h,s,gain)=>`chapter_hostess ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:19,relBonus:16},
        {condition:h=>h.includes("full_funding")&&h.includes("push_pledges_further"),text:(h,s,gain)=>`chapter_hostess ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:12,relBonus:11},
        {condition:h=>h.includes("full_funding"),text:(h,s,gain)=>`chapter_hostess ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:7,relBonus:7},
        {condition:()=>true,text:(h,s,gain)=>`chapter_hostess ending 3 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:4}
      ]
    },
    {
      title:"Annual Grand Feast",
      phases:[
        {
          text:(h,s)=>`chapter_hostess s4p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"witness_setup",label:"Arrive early — watch her set the table",result:"Choice witness_setup (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:11,flag:"witnessed_setup"},
            {id:"full_supplemental",label:"Bring a supplemental feast — match her twenty-three with ten more",result:"Choice full_supplemental (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:9,flag:"supplemented"}
          ]
        },
        {
          text:(h,s)=>`chapter_hostess s4p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"grand_feast_extra",label:"Fund additional courses for everyone at the midpoint",result:"Choice grand_feast_extra (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:11},
            {id:"sit_at_head_with_her",label:"Sit beside her at the head of the table",result:"Choice sit_at_head_with_her (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:9,rel:13,flag:"together_at_head"}
          ]
        },
        {
          text:(h,s)=>`chapter_hostess s4p2 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"last_plate_together",label:"Share the last plate with her — just you two",result:"Choice last_plate_together (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:17,flag:"intimate_close"},
            {id:"chapter_close",label:"Stand at the door with her as the chapter leaves",result:"Choice chapter_close (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:8}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("supplemented")&&h.includes("grand_feast_extra")&&h.includes("intimate_close"),text:(h,s,gain)=>`chapter_hostess ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:22,relBonus:18},
        {condition:h=>h.includes("supplemented")&&h.includes("grand_feast_extra"),text:(h,s,gain)=>`chapter_hostess ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:14,relBonus:13},
        {condition:h=>h.includes("supplemented"),text:(h,s,gain)=>`chapter_hostess ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:8,relBonus:8},
        {condition:()=>true,text:(h,s,gain)=>`chapter_hostess ending 3 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:5}
      ]
    },
    {
      title:"The Last Feast",
      phases:[
        {
          text:(h,s)=>`chapter_hostess s5p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"greet_camille",label:"Welcome Camille properly — seat her beside Tiffany",result:"Choice greet_camille (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:9,flag:"camille_seated"},
            {id:"witness_the_table",label:"Stand at the door and take in the whole room",result:"Choice witness_the_table (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:3,rel:7,flag:"witnessed_the_table"}
          ]
        },
        {
          text:(h,s)=>`chapter_hostess s5p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"camille_toast",label:"Offer a toast — to what they've built together",result:"Choice camille_toast (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:11,flag:"toast_offered"},
            {id:"ask_camille",label:"Ask Camille what she remembers of her first feast",result:"Choice ask_camille (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:12,flag:"camille_reminisced"}
          ]
        },
        {
          text:(h,s)=>`chapter_hostess s5p2 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"final_feast_moment",label:"Stay with her after Camille leaves",result:"Choice final_feast_moment (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:12,rel:16,flag:"final_moment_shared"},
            {id:"chapter_close",label:"Help the chapter clean up — let her rest",result:"Choice chapter_close (chapter_hostess) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:8}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("camille_seated")&&h.includes("toast_offered")&&h.includes("final_moment_shared"),text:(h,s,gain)=>`chapter_hostess ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:18,relBonus:22},
        {condition:h=>h.includes("camille_seated")&&h.includes("final_moment_shared"),text:(h,s,gain)=>`chapter_hostess ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:12,relBonus:15},
        {condition:()=>true,text:(h,s,gain)=>`chapter_hostess ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:6,relBonus:9}
      ]
    }
  ],

  community_researcher:[
    {
      title:"Week 3: Initial Data",
      phases:[
        {
          text:(h,s)=>`community_researcher s0p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"coached_on_framing",label:"Help her frame the preliminary findings",result:"Choice coached_on_framing (community_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:7,flag:"coached_framing"},
            {id:"let_her_prepare",label:"Leave her to it — she knows the material",result:"Choice let_her_prepare (community_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:3,rel:5,flag:"self_prepared"}
          ]
        },
        {
          text:(h,s)=>`community_researcher s0p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"pre_presentation_meal",label:"Take her to eat beforehand — one more meal",result:"Choice pre_presentation_meal (community_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:8,flag:"ate_before"},
            {id:"just_coffee",label:"Just coffee — keep it clean",result:"Choice just_coffee (community_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:2,rel:5,flag:"coffee_only"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("coached_framing")&&h.includes("ate_before"),text:(h,s,gain)=>`community_researcher ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:4,relBonus:7},
        {condition:()=>true,text:(h,s,gain)=>`community_researcher ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:2,relBonus:5}
      ]
    },
    {
      title:"Quarter Review",
      phases:[
        {
          text:(h,s)=>`community_researcher s1p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"help_explain_variance",label:"Help her build the variance explanation",result:"Choice help_explain_variance (community_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:7,flag:"variance_prepared"},
            {id:"ask_how_she_is",label:"Ask how she's actually doing with all of this",result:"Choice ask_how_she_is (community_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:10,flag:"personal_check"}
          ]
        },
        {
          text:(h,s)=>`community_researcher s1p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"big_dinner",label:"Take her to dinner tonight — she deserves it",result:"Choice big_dinner (community_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:9,rel:8,flag:"pre_review_dinner"},
            {id:"final_prep",label:"One more run-through of the data presentation",result:"Choice final_prep (community_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:3,rel:6,flag:"final_prepped"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("personal_check")&&h.includes("pre_review_dinner"),text:(h,s,gain)=>`community_researcher ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:5,relBonus:9},
        {condition:()=>true,text:(h,s,gain)=>`community_researcher ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:3,relBonus:6}
      ]
    },
    {
      title:"Midseason Review",
      phases:[
        {
          text:(h,s)=>`community_researcher s2p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"reviewed_chapter4",label:"Review the midseason section with her before submission",result:"Choice reviewed_chapter4 (community_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:9,flag:"reviewed_ch4"},
            {id:"trust_the_data",label:"Trust the data — it speaks for itself",result:"Choice trust_the_data (community_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:6,flag:"trusted_data"}
          ]
        },
        {
          text:(h,s)=>`community_researcher s2p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"prepare_iyer_response",label:"Prepare a response to Iyer's specific question",result:"Choice prepare_iyer_response (community_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:10,flag:"prepared_iyer"},
            {id:"just_eat",label:"Put the email down and eat first",result:"Choice just_eat (community_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:9,rel:7,flag:"ate_first"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("reviewed_ch4")&&h.includes("prepared_iyer"),text:(h,s,gain)=>`community_researcher ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:7,relBonus:11},
        {condition:()=>true,text:(h,s,gain)=>`community_researcher ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:4,relBonus:7}
      ]
    },
    {
      title:"Full Panel Review",
      phases:[
        {
          text:(h,s)=>`community_researcher s3p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"full_committee_prep",label:"Run a full mock defense — all five perspectives",result:"Choice full_committee_prep (community_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:10,flag:"mock_defended"},
            {id:"confidence_talk",label:"Talk through her confidence — she knows this material better than anyone",result:"Choice confidence_talk (community_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:11,flag:"confidence_built"}
          ]
        },
        {
          text:(h,s)=>`community_researcher s3p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"substantial_meal",label:"A substantial meal tonight — she's earned it",result:"Choice substantial_meal (community_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:9,flag:"committee_eve_dinner"},
            {id:"early_night",label:"Early night — she needs to be sharp",result:"Choice early_night (community_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:6,flag:"early_night"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("mock_defended")&&h.includes("committee_eve_dinner"),text:(h,s,gain)=>`community_researcher ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:10,relBonus:13},
        {condition:()=>true,text:(h,s,gain)=>`community_researcher ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:5,relBonus:8}
      ]
    },
    {
      title:"Outside Reviewer",
      phases:[
        {
          text:(h,s)=>`community_researcher s4p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"prep_external",label:"Prepare specifically for an outside perspective",result:"Choice prep_external (community_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:9,flag:"external_prepped"},
            {id:"she_knows_her_work",label:"She knows her work — the reviewer will see that",result:"Choice she_knows_her_work (community_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:7,flag:"confident_external"}
          ]
        },
        {
          text:(h,s)=>`community_researcher s4p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"examiner_eve_dinner",label:"A real dinner tonight — the last one before the examination",result:"Choice examiner_eve_dinner (community_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:10,flag:"last_dinner"},
            {id:"final_notes",label:"Work through the final notes together",result:"Choice final_notes (community_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:8,flag:"final_notes"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("external_prepped")&&h.includes("last_dinner"),text:(h,s,gain)=>`community_researcher ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:12,relBonus:13},
        {condition:()=>true,text:(h,s,gain)=>`community_researcher ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:7,relBonus:9}
      ]
    },
    {
      title:"Season Finale Review",
      phases:[
        {
          text:(h,s)=>`community_researcher s5p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"read_last_chapter",label:"Read the final section with her",result:"Choice read_last_chapter (community_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:13,flag:"read_final"},
            {id:"talk_about_what_next",label:"Talk about what comes after the final report",result:"Choice talk_about_what_next (community_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:12,flag:"after_talk"}
          ]
        },
        {
          text:(h,s)=>`community_researcher s5p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"final_meal_before",label:"One last meal before the defense",result:"Choice final_meal_before (community_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:12,rel:12,flag:"final_meal"},
            {id:"walk_in_with_her",label:"Walk into the review with her",result:"Choice walk_in_with_her (community_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:14,flag:"walked_in"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("read_final")&&h.includes("final_meal"),text:(h,s,gain)=>`community_researcher ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:16,relBonus:17},
        {condition:()=>true,text:(h,s,gain)=>`community_researcher ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:9,relBonus:12}
      ]
    }
  ],

  home_nest:[
    {
      title:"First Day In",
      phases:[
        {
          text:(h,s)=>`home_nest s0p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"brought_something",label:"Bring her something yourself — stop by",result:"Choice brought_something (home_nest) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:8,flag:"you_visited"},
            {id:"check_in_by_text",label:"Text to check in — give her her space",result:"Choice check_in_by_text (home_nest) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:3,rel:7,flag:"text_check"}
          ]
        },
        {
          text:(h,s)=>`home_nest s0p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"order_for_her",label:"Place an order for her — something you know she likes",result:"Choice order_for_her (home_nest) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:10,flag:"ordered_for_her"},
            {id:"let_her_be",label:"Let her be — she's got it sorted",result:"Choice let_her_be (home_nest) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:5,flag:"let_her_be"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("you_visited")&&h.includes("ordered_for_her"),text:(h,s,gain)=>`home_nest ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:5,relBonus:9},
        {condition:()=>true,text:(h,s,gain)=>`home_nest ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:3,relBonus:6}
      ]
    },
    {
      title:"Getting the Hang of It",
      phases:[
        {
          text:(h,s)=>`home_nest s1p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"discuss_system",label:"Ask about the system — she seems to enjoy it",result:"Choice discuss_system (home_nest) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:9,flag:"system_shared"},
            {id:"observe_delivery",label:"Be there when a delivery arrives — see the setup",result:"Choice observe_delivery (home_nest) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:7,flag:"delivery_observed"}
          ]
        },
        {
          text:(h,s)=>`home_nest s1p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"big_order",label:"Suggest a bigger order tonight — try something new",result:"Choice big_order (home_nest) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:9,flag:"big_order_tried"},
            {id:"usual_routine",label:"Keep to her routine — she's built something good",result:"Choice usual_routine (home_nest) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:6,flag:"routine_kept"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("system_shared")&&h.includes("big_order_tried"),text:(h,s,gain)=>`home_nest ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:6,relBonus:10},
        {condition:()=>true,text:(h,s,gain)=>`home_nest ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:4,relBonus:6}
      ]
    },
    {
      title:"The Regular",
      phases:[
        {
          text:(h,s)=>`home_nest s2p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"discuss_regulars",label:"Ask which places and what she gets",result:"Choice discuss_regulars (home_nest) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:9,flag:"regulars_discussed"},
            {id:"place_a_standing_order",label:"Help her set up a standing order at her favorite",result:"Choice place_a_standing_order (home_nest) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:11,flag:"standing_order"}
          ]
        },
        {
          text:(h,s)=>`home_nest s2p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"knock_visit",label:"Stop by again — bring something she didn't order",result:"Choice knock_visit (home_nest) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:9,rel:12,flag:"unannounced_visit"},
            {id:"order_together",label:"Order together remotely — you from your place, her from hers",result:"Choice order_together (home_nest) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:9,flag:"ordered_together"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("standing_order")&&h.includes("unannounced_visit"),text:(h,s,gain)=>`home_nest ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:8,relBonus:13},
        {condition:()=>true,text:(h,s,gain)=>`home_nest ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:5,relBonus:8}
      ]
    },
    {
      title:"Someone Knocks",
      phases:[
        {
          text:(h,s)=>`home_nest s3p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"validated_choice",label:"Validate the choice — it was fine",result:"Choice validated_choice (home_nest) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:9,flag:"choice_validated"},
            {id:"gently_asked",label:"Ask gently if she wants to talk about it",result:"Choice gently_asked (home_nest) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:12,flag:"talked_about_it"}
          ]
        },
        {
          text:(h,s)=>`home_nest s3p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"extra_order",label:"Order something for her now — round two",result:"Choice extra_order (home_nest) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:12,rel:10,flag:"extra_ordered"},
            {id:"stay_in_quiet",label:"Stay in the quiet with her — no agenda",result:"Choice stay_in_quiet (home_nest) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:11,flag:"stayed_quiet"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("talked_about_it")&&h.includes("extra_ordered"),text:(h,s,gain)=>`home_nest ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:10,relBonus:14},
        {condition:()=>true,text:(h,s,gain)=>`home_nest ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:6,relBonus:9}
      ]
    },
    {
      title:"They Know Her Name",
      phases:[
        {
          text:(h,s)=>`home_nest s4p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"celebrated_it",label:"Celebrate it with her — this is a good thing",result:"Choice celebrated_it (home_nest) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:12,flag:"celebrated"},
            {id:"asked_about_driver",label:"Ask about the driver — has she ever talked to them",result:"Choice asked_about_driver (home_nest) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:10,flag:"knows_driver"}
          ]
        },
        {
          text:(h,s)=>`home_nest s4p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"comprehensive_order",label:"Place a comprehensive order tonight — everything good from every place",result:"Choice comprehensive_order (home_nest) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:14,rel:11,flag:"triple_order"},
            {id:"ask_how_long",label:"Ask how long she's been mostly here — does she know?",result:"Choice ask_how_long (home_nest) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:13,flag:"asked_duration"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("knows_driver")&&h.includes("triple_order"),text:(h,s,gain)=>`home_nest ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:12,relBonus:13},
        {condition:()=>true,text:(h,s,gain)=>`home_nest ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:7,relBonus:9}
      ]
    },
    {
      title:"Always Here",
      phases:[
        {
          text:(h,s)=>`home_nest s5p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"visit_the_room",label:"Come by — see the room as it is now",result:"Choice visit_the_room (home_nest) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:13,flag:"saw_the_room"},
            {id:"ask_what_she_needs",label:"Ask what she needs — is there anything",result:"Choice ask_what_she_needs (home_nest) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:12,flag:"got_what_she_needed"}
          ]
        },
        {
          text:(h,s)=>`home_nest s5p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"stay_for_the_meal",label:"Stay and eat with her — share the delivery",result:"Choice stay_for_the_meal (home_nest) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:12,rel:16,flag:"shared_delivery"},
            {id:"let_her_eat_in_peace",label:"Give her the room — let her have her meal",result:"Choice let_her_eat_in_peace (home_nest) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:9,rel:10,flag:"ate_alone"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("saw_the_room")&&h.includes("shared_delivery"),text:(h,s,gain)=>`home_nest ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:15,relBonus:18},
        {condition:()=>true,text:(h,s,gain)=>`home_nest ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:9,relBonus:12}
      ]
    }
  ],

  campus_legend:[
    {
      title:"The First Challenge",
      phases:[
        {
          text:(h,s)=>`campus_legend s0p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"encouraged_next",label:"Encourage her to do the next one — see what happens",result:"Choice encouraged_next (campus_legend) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:8,flag:"encouraged_next"},
            {id:"asked_how",label:"Ask how she felt after — was it overwhelming",result:"Choice asked_how (campus_legend) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:3,rel:10,flag:"talked_about_feeling"}
          ]
        },
        {
          text:(h,s)=>`campus_legend s0p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"help_plan",label:"Help her plan the route — which one first",result:"Choice help_plan (campus_legend) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:10,flag:"planned_route"},
            {id:"suggest_journalist",label:"Mention that someone might want to write about this",result:"Choice suggest_journalist (campus_legend) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:3,rel:8,flag:"journalist_mentioned"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("planned_route")&&h.includes("journalist_mentioned"),text:(h,s,gain)=>`campus_legend ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:4,relBonus:9},
        {condition:()=>true,text:(h,s,gain)=>`campus_legend ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:2,relBonus:6}
      ]
    },
    {
      title:"The Journalist Finds Her",
      phases:[
        {
          text:(h,s)=>`campus_legend s1p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"helped_prep_interview",label:"Help her prepare for the interview — what to say",result:"Choice helped_prep_interview (campus_legend) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:9,flag:"interview_prepped"},
            {id:"let_her_handle",label:"Let her handle it — she's fine at this",result:"Choice let_her_handle (campus_legend) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:3,rel:7,flag:"handled_interview"}
          ]
        },
        {
          text:(h,s)=>`campus_legend s1p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"celebrate_piece",label:"Celebrate the piece — this is the beginning",result:"Choice celebrate_piece (campus_legend) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:10,flag:"piece_celebrated"},
            {id:"just_keep_going",label:"Keep going — the list doesn't care about the article",result:"Choice just_keep_going (campus_legend) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:7,flag:"kept_going"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("interview_prepped")&&h.includes("piece_celebrated"),text:(h,s,gain)=>`campus_legend ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:6,relBonus:10},
        {condition:()=>true,text:(h,s,gain)=>`campus_legend ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:3,relBonus:7}
      ]
    },
    {
      title:"The Crowd Forms",
      phases:[
        {
          text:(h,s)=>`campus_legend s2p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"watch_the_room",label:"Watch how the room reacts when she arrives",result:"Choice watch_the_room (campus_legend) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:11,flag:"watched_arrival"},
            {id:"talk_to_the_crowd",label:"Talk to someone in the crowd — find out why they came",result:"Choice talk_to_the_crowd (campus_legend) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:3,rel:9,flag:"crowd_talked"}
          ]
        },
        {
          text:(h,s)=>`campus_legend s2p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"post_challenge_chat",label:"Stay after — eat more with her while the crowd clears",result:"Choice post_challenge_chat (campus_legend) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:11,rel:12,flag:"stayed_after"},
            {id:"leave_with_crowd",label:"Leave with the crowd — let her have the solo exit",result:"Choice leave_with_crowd (campus_legend) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:8,flag:"left_with_crowd"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("watched_arrival")&&h.includes("stayed_after"),text:(h,s,gain)=>`campus_legend ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:8,relBonus:12},
        {condition:()=>true,text:(h,s,gain)=>`campus_legend ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:5,relBonus:8}
      ]
    },
    {
      title:"The Fourth Venue",
      phases:[
        {
          text:(h,s)=>`campus_legend s3p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"fourth_venue_together",label:"Go to the fourth venue together — be there for it",result:"Choice fourth_venue_together (campus_legend) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:10,flag:"went_together"},
            {id:"let_her_go_alone",label:"Let her go alone — it's her thing, not yours",result:"Choice let_her_go_alone (campus_legend) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:8,flag:"went_alone"}
          ]
        },
        {
          text:(h,s)=>`campus_legend s3p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"suggest_next_venue",label:"Suggest the fifth venue — you've been scouting",result:"Choice suggest_next_venue (campus_legend) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:9,rel:13,flag:"suggested_venue"},
            {id:"journalist_interview_together",label:"Join her journalist interview — be part of the story",result:"Choice journalist_interview_together (campus_legend) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:11,flag:"joint_interview"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("went_together")&&h.includes("suggested_venue"),text:(h,s,gain)=>`campus_legend ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:10,relBonus:13},
        {condition:()=>true,text:(h,s,gain)=>`campus_legend ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:6,relBonus:9}
      ]
    },
    {
      title:"People Come to Watch",
      phases:[
        {
          text:(h,s)=>`campus_legend s4p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"acknowledge_crowd",label:"Help her acknowledge the crowd — this is real now",result:"Choice acknowledge_crowd (campus_legend) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:11,flag:"acknowledged_crowd"},
            {id:"just_do_the_thing",label:"She doesn't need to acknowledge it — just watch",result:"Choice just_do_the_thing (campus_legend) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:9,flag:"just_ate"}
          ]
        },
        {
          text:(h,s)=>`campus_legend s4p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"big_post_challenge",label:"Order more after — give them a proper close",result:"Choice big_post_challenge (campus_legend) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:15,rel:12,flag:"big_post"},
            {id:"talk_to_the_crowd",label:"Introduce her to the crowd — make a proper moment",result:"Choice talk_to_the_crowd (campus_legend) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:14,flag:"introduced"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("acknowledged_crowd")&&h.includes("big_post"),text:(h,s,gain)=>`campus_legend ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:13,relBonus:14},
        {condition:()=>true,text:(h,s,gain)=>`campus_legend ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:8,relBonus:10}
      ]
    },
    {
      title:"The Last Challenge",
      phases:[
        {
          text:(h,s)=>`campus_legend s5p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"read_the_menu",label:"Review the challenge item together — assess it",result:"Choice read_the_menu (campus_legend) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:11,flag:"assessed_challenge"},
            {id:"just_trust_her",label:"Trust her — she's done everything else",result:"Choice just_trust_her (campus_legend) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:3,rel:12,flag:"trusted"}
          ]
        },
        {
          text:(h,s)=>`campus_legend s5p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"stay_for_all_of_it",label:"Stay for the whole thing — every minute",result:"Choice stay_for_all_of_it (campus_legend) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:18,rel:16,flag:"stayed_all"},
            {id:"watch_from_nearby",label:"Watch from nearby without crowding her — give her room",result:"Choice watch_from_nearby (campus_legend) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:12,rel:13,flag:"watched_nearby"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("assessed_challenge")&&h.includes("stayed_all"),text:(h,s,gain)=>`campus_legend ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:18,relBonus:18},
        {condition:()=>true,text:(h,s,gain)=>`campus_legend ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:11,relBonus:14}
      ]
    }
  ],

  homestead_queen:[
    {
      title:"The First Spread",
      phases:[
        {
          text:(h,s)=>`homestead_queen s0p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"ate_everything",label:"Try everything — all six",result:"Choice ate_everything (homestead_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:8,flag:"ate_everything"},
            {id:"paced",label:"Eat carefully — appreciate each one",result:"Choice paced (homestead_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:12,flag:"paced"}
          ]
        },
        {
          text:(h,s)=>`homestead_queen s0p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"called_mae_back",label:"Wave at the camera — let Mae see you",result:"Choice called_mae_back (homestead_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:15,flag:"called_mae_back"},
            {id:"second_helping",label:"Take a second piece while she talks",result:"Choice second_helping (homestead_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:9,flag:"second_helping"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("ate_everything")&&h.includes("called_mae_back"),text:(h,s,gain)=>`homestead_queen ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:6,relBonus:12},
        {condition:()=>true,text:(h,s,gain)=>`homestead_queen ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:2,relBonus:6}
      ]
    },
    {
      title:"The Care Package Arrives",
      phases:[
        {
          text:(h,s)=>`homestead_queen s1p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"ate_everything",label:"Ask her to cook with it now",result:"Choice ate_everything (homestead_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:12,rel:9,flag:"ate_everything"},
            {id:"read_the_note",label:"Ask her to read the note aloud",result:"Choice read_the_note (homestead_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:14,flag:"read_the_note"}
          ]
        },
        {
          text:(h,s)=>`homestead_queen s1p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"called_mae_back",label:"Tell Mae about the sweet potato pie",result:"Choice called_mae_back (homestead_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:14,flag:"called_mae_back"},
            {id:"second_helping",label:"Take a second helping while they talk",result:"Choice second_helping (homestead_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:10,flag:"second_helping"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("ate_everything")&&h.includes("called_mae_back"),text:(h,s,gain)=>`homestead_queen ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:8,relBonus:12},
        {condition:()=>true,text:(h,s,gain)=>`homestead_queen ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:3,relBonus:7}
      ]
    },
    {
      title:"Recipe Box Week",
      phases:[
        {
          text:(h,s)=>`homestead_queen s2p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"ate_everything",label:"Try all three versions in order",result:"Choice ate_everything (homestead_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:13,rel:10,flag:"ate_everything"},
            {id:"told_her_about_you",label:"Tell her this is the best cobbler you've ever had",result:"Choice told_her_about_you (homestead_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:16,flag:"told_her_about_you"}
          ]
        },
        {
          text:(h,s)=>`homestead_queen s2p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"called_mae_back",label:"Stay for the whole call",result:"Choice called_mae_back (homestead_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:14,flag:"called_mae_back"},
            {id:"cleaned_the_pot",label:"Finish everything in the pot",result:"Choice cleaned_the_pot (homestead_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:11,rel:11,flag:"cleaned_the_pot"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("ate_everything")&&h.includes("told_her_about_you"),text:(h,s,gain)=>`homestead_queen ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:9,relBonus:14},
        {condition:()=>true,text:(h,s,gain)=>`homestead_queen ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:4,relBonus:8}
      ]
    },
    {
      title:"The Weekly Call",
      phases:[
        {
          text:(h,s)=>`homestead_queen s3p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"ate_everything",label:"Eat until it's gone",result:"Choice ate_everything (homestead_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:14,rel:10,flag:"ate_everything"},
            {id:"second_helping",label:"Have a second bowl and ask her to eat with you properly",result:"Choice second_helping (homestead_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:9,rel:17,flag:"second_helping"}
          ]
        },
        {
          text:(h,s)=>`homestead_queen s3p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"called_mae_back",label:"Ask Mae about the cream gravy recipe",result:"Choice called_mae_back (homestead_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:16,flag:"called_mae_back"},
            {id:"told_her_about_you",label:"Tell Mae you've been coming here every week",result:"Choice told_her_about_you (homestead_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:14,flag:"told_her_about_you"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("ate_everything")&&h.includes("called_mae_back"),text:(h,s,gain)=>`homestead_queen ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:10,relBonus:14},
        {condition:()=>true,text:(h,s,gain)=>`homestead_queen ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:4,relBonus:8}
      ]
    },
    {
      title:"Running Out of Room",
      phases:[
        {
          text:(h,s)=>`homestead_queen s4p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"ate_everything",label:"Clear everything on the table",result:"Choice ate_everything (homestead_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:16,rel:11,flag:"ate_everything"},
            {id:"cleaned_the_pot",label:"Get everything — lick the pot",result:"Choice cleaned_the_pot (homestead_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:20,rel:8,flag:"cleaned_the_pot"}
          ]
        },
        {
          text:(h,s)=>`homestead_queen s4p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"told_her_about_you",label:"\"I'll be here.\"",result:"Choice told_her_about_you (homestead_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:18,flag:"told_her_about_you"},
            {id:"second_helping",label:"Ask for a second piece",result:"Choice second_helping (homestead_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:14,rel:12,flag:"second_helping"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("ate_everything")&&h.includes("told_her_about_you"),text:(h,s,gain)=>`homestead_queen ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:12,relBonus:16},
        {condition:()=>true,text:(h,s,gain)=>`homestead_queen ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:5,relBonus:9}
      ]
    },
    {
      title:"The Final Harvest Table",
      phases:[
        {
          text:(h,s)=>`homestead_queen s5p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"ate_everything",label:"Start eating — this is what the table is for",result:"Choice ate_everything (homestead_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:18,rel:12,flag:"ate_everything"},
            {id:"called_mae_back",label:"Thank Mae for the food",result:"Choice called_mae_back (homestead_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:20,flag:"called_mae_back"}
          ]
        },
        {
          text:(h,s)=>`homestead_queen s5p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"told_her_about_you",label:"Tell Mae what this has meant",result:"Choice told_her_about_you (homestead_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:12,rel:20,flag:"told_her_about_you"},
            {id:"cleaned_the_pot",label:"Clean the table — eat until it's gone",result:"Choice cleaned_the_pot (homestead_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:22,rel:12,flag:"cleaned_the_pot"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("ate_everything")&&h.includes("told_her_about_you"),text:(h,s,gain)=>`homestead_queen ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:14,relBonus:18},
        {condition:()=>true,text:(h,s,gain)=>`homestead_queen ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:6,relBonus:12}
      ]
    }
  ],

  state_fair_queen:[
    {
      title:"Tri-County Fair",
      phases:[
        {
          text:(h,s)=>`state_fair_queen s0p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"loaded",label:"Load aggressively — fill up early",result:"Choice loaded (state_fair_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:4,flag:"loaded"},
            {id:"paced",label:"Eat smart — full enough to compete, not so full you slow down",result:"Choice paced (state_fair_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:8,flag:"paced"}
          ]
        },
        {
          text:(h,s)=>`state_fair_queen s0p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"confident",label:"Step off the scale and look at her directly",result:"Choice confident (state_fair_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:8,flag:"confident"},
            {id:"paced",label:"Step off and get focused",result:"Choice paced (state_fair_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:4,flag:"paced"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:(h,s,gain)=>`state_fair_queen ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0},
        {condition:()=>true,text:(h,s,gain)=>`state_fair_queen ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0}
      ]
    },
    {
      title:"County Championship",
      phases:[
        {
          text:(h,s)=>`state_fair_queen s1p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"loaded",label:"Load heavy at the warmup table",result:"Choice loaded (state_fair_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:4,flag:"loaded"},
            {id:"paced",label:"Eat controlled — tactical",result:"Choice paced (state_fair_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:10,flag:"paced"}
          ]
        },
        {
          text:(h,s)=>`state_fair_queen s1p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"confident",label:"\"I'm closing.\" — and hold her gaze",result:"Choice confident (state_fair_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:9,flag:"confident"},
            {id:"crowd_moment",label:"Look at the crowd when the number is read",result:"Choice crowd_moment (state_fair_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:7,flag:"crowd_moment"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:(h,s,gain)=>`state_fair_queen ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0},
        {condition:()=>true,text:(h,s,gain)=>`state_fair_queen ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0}
      ]
    },
    {
      title:"State Qualifier",
      phases:[
        {
          text:(h,s)=>`state_fair_queen s2p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"loaded",label:"Eat like it's a statement",result:"Choice loaded (state_fair_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:12,rel:5,flag:"loaded"},
            {id:"paced",label:"Eat smart and let the body speak for itself",result:"Choice paced (state_fair_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:11,flag:"paced"}
          ]
        },
        {
          text:(h,s)=>`state_fair_queen s2p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"confident",label:"\"I grew more room.\"",result:"Choice confident (state_fair_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:10,flag:"confident"},
            {id:"intimidated_them",label:"Look at the scoreboard and then back at Darcy",result:"Choice intimidated_them (state_fair_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:7,flag:"intimidated_them"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:(h,s,gain)=>`state_fair_queen ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0},
        {condition:()=>true,text:(h,s,gain)=>`state_fair_queen ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0}
      ]
    },
    {
      title:"State Fair Finals",
      phases:[
        {
          text:(h,s)=>`state_fair_queen s3p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"loaded",label:"Eat at the warmup table while she talks",result:"Choice loaded (state_fair_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:13,rel:6,flag:"loaded"},
            {id:"paced",label:"Tell her it's going to be a good match",result:"Choice paced (state_fair_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:13,flag:"paced"}
          ]
        },
        {
          text:(h,s)=>`state_fair_queen s3p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"confident",label:"Acknowledge her applause directly",result:"Choice confident (state_fair_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:13,flag:"confident"},
            {id:"crowd_moment",label:"Look at the whole tent",result:"Choice crowd_moment (state_fair_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:9,flag:"crowd_moment"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:(h,s,gain)=>`state_fair_queen ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0},
        {condition:()=>true,text:(h,s,gain)=>`state_fair_queen ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0}
      ]
    },
    {
      title:"Tri-State Invitational",
      phases:[
        {
          text:(h,s)=>`state_fair_queen s4p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"loaded",label:"Eat at the warmup table until you're ready",result:"Choice loaded (state_fair_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:15,rel:6,flag:"loaded"},
            {id:"crowd_moment",label:"Find Darcy in the stands and nod",result:"Choice crowd_moment (state_fair_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:14,flag:"crowd_moment"}
          ]
        },
        {
          text:(h,s)=>`state_fair_queen s4p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"confident",label:"Stand on the scale for an extra moment",result:"Choice confident (state_fair_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:15,flag:"confident"},
            {id:"intimidated_them",label:"Make eye contact with the competitors",result:"Choice intimidated_them (state_fair_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:8,flag:"intimidated_them"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:(h,s,gain)=>`state_fair_queen ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0},
        {condition:()=>true,text:(h,s,gain)=>`state_fair_queen ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0}
      ]
    },
    {
      title:"Grand Fair Invitational",
      phases:[
        {
          text:(h,s)=>`state_fair_queen s5p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"ate_everything",label:"Eat everything they bring",result:"Choice ate_everything (state_fair_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:16,rel:8,flag:"ate_everything"},
            {id:"loaded",label:"Eat at your pace — you know your body",result:"Choice loaded (state_fair_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:12,flag:"loaded"}
          ]
        },
        {
          text:(h,s)=>`state_fair_queen s5p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"confident",label:"Sit with the number for a moment",result:"Choice confident (state_fair_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:18,flag:"confident"},
            {id:"crowd_moment",label:"Look toward the tent entrance — toward the crowd",result:"Choice crowd_moment (state_fair_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",rel:12,flag:"crowd_moment"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("ate_everything")&&h.includes("confident"),text:(h,s,gain)=>`state_fair_queen ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0},
        {condition:()=>true,text:(h,s,gain)=>`state_fair_queen ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:0,relBonus:0}
      ]
    }
  ],

  psych_researcher:[
    {
      title:"Opening the Hall Log",
      phases:[
        {
          text:(h,s)=>`psych_researcher s0p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"feeder_focus",label:"Hands-On Log — she feeds the resident directly",result:"Choice feeder_focus (psych_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:6,flag:"feeder_focus"},
            {id:"feedee_focus",label:"Field Observer — she interviews a resident already growing",result:"Choice feedee_focus (psych_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:3,rel:7,flag:"feedee_focus"}
          ]
        },
        {
          text:(h,s)=>`psych_researcher s0p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"precise",label:"Keep it clinical — establish baseline data",result:"Choice precise (psych_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:6,flag:"clinical"},
            {id:"personal",label:"Let a genuine interest show through the methodology",result:"Choice personal (psych_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:3,rel:10,flag:"personal"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("feeder_focus")&&h.includes("personal"),text:(h,s,gain)=>`psych_researcher ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:6,relBonus:8},
        {condition:()=>true,text:(h,s,gain)=>`psych_researcher ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:4,relBonus:6}
      ]
    },
    {
      title:"Deepening Variables",
      phases:[
        {
          text:(h,s)=>`psych_researcher s1p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"escalate",label:"Push the protocol further",result:"Choice escalate (psych_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:7,flag:"escalated"},
            {id:"maintain",label:"Hold the methodology steady",result:"Choice maintain (psych_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:9,flag:"maintained"}
          ]
        },
        {
          text:(h,s)=>`psych_researcher s1p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"acknowledge_self",label:"She mentions she's been eating more too",result:"Choice acknowledge_self (psych_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:12,flag:"self_acknowledged"},
            {id:"focus_subject",label:"Keep the focus on the resident",result:"Choice focus_subject (psych_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:7,flag:"deflected"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("self_acknowledged"),text:(h,s,gain)=>`psych_researcher ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:8,relBonus:10},
        {condition:()=>true,text:(h,s,gain)=>`psych_researcher ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:5,relBonus:7}
      ]
    },
    {
      title:"Observer Effect",
      phases:[
        {
          text:(h,s)=>`psych_researcher s2p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"confront",label:"Ask the resident directly if they've noticed changes",result:"Choice confront (psych_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:11,flag:"confronted"},
            {id:"avoid",label:"Don't raise it — let the hall log proceed naturally",result:"Choice avoid (psych_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:9,rel:6,flag:"avoided"}
          ]
        },
        {
          text:(h,s)=>`psych_researcher s2p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"dual_study",label:"The self-study is part of the research — lean into it",result:"Choice dual_study (psych_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:13,flag:"dual_study"},
            {id:"separate",label:"Separate the data rigorously — two clean studies",result:"Choice separate (psych_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:8,flag:"separated"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("dual_study"),text:(h,s,gain)=>`psych_researcher ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:10,relBonus:12},
        {condition:()=>true,text:(h,s,gain)=>`psych_researcher ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:7,relBonus:8}
      ]
    },
    {
      title:"The Data Becomes Personal",
      phases:[
        {
          text:(h,s)=>`psych_researcher s3p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"share_data",label:"Show the resident the full data — both of you",result:"Choice share_data (psych_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:9,rel:16,flag:"shared_data"},
            {id:"keep_private",label:"Keep the observer data private for now",result:"Choice keep_private (psych_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:9,flag:"kept_private"}
          ]
        },
        {
          text:(h,s)=>`psych_researcher s3p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"commit",label:"Commit to the dual log fully — this is the work now",result:"Choice commit (psych_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:14,flag:"committed"},
            {id:"clinical_distance",label:"Try to maintain some clinical distance",result:"Choice clinical_distance (psych_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:10,flag:"clinical_distance"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("shared_data")&&h.includes("committed"),text:(h,s,gain)=>`psych_researcher ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:12,relBonus:15},
        {condition:()=>true,text:(h,s,gain)=>`psych_researcher ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:8,relBonus:10}
      ]
    },
    {
      title:"Saturation Point",
      phases:[
        {
          text:(h,s)=>`psych_researcher s4p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"beyond_method",label:"Go beyond the methodology — this is something else now",result:"Choice beyond_method (psych_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:11,rel:14,flag:"beyond_method"},
            {id:"document",label:"Document everything — let the data speak",result:"Choice document (psych_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:9,rel:11,flag:"fully_documented"}
          ]
        },
        {
          text:(h,s)=>`psych_researcher s4p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"write_up",label:"Begin the formal write-up",result:"Choice write_up (psych_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:12,flag:"writing_up"},
            {id:"final_session",label:"One more session — the last data point",result:"Choice final_session (psych_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:12,rel:10,flag:"final_session"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("beyond_method"),text:(h,s,gain)=>`psych_researcher ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:14,relBonus:16},
        {condition:()=>true,text:(h,s,gain)=>`psych_researcher ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:10,relBonus:12}
      ]
    },
    {
      title:"The Final Entry",
      phases:[
        {
          text:(h,s)=>`psych_researcher s5p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"conclude",label:"Write the final entry — close the hall log formally",result:"Choice conclude (psych_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:12,rel:14,flag:"concluded"},
            {id:"continue_study",label:"the hall log doesn't end — this is a lifetime's work",result:"Choice continue_study (psych_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:16,flag:"continued"}
          ]
        },
        {
          text:(h,s)=>`psych_researcher s5p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"publish",label:"Suggest she publish — this deserves an audience",result:"Choice publish (psych_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:18,flag:"published"},
            {id:"private_forever",label:"Keep it between you — some studies are too personal",result:"Choice private_forever (psych_researcher) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:20,flag:"kept_private_final"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("concluded")&&h.includes("published"),text:(h,s,gain)=>`psych_researcher ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:18,relBonus:20},
        {condition:h=>h.includes("continued"),text:(h,s,gain)=>`psych_researcher ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:16,relBonus:22},
        {condition:()=>true,text:(h,s,gain)=>`psych_researcher ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:12,relBonus:16}
      ]
    }
  ],

  homeroom_queen:[
    {
      title:"The First Tuesday",
      phases:[
        {
          text:(h,s)=>`homeroom_queen s0p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"recipe_simple",label:"Banana bread — classic, nothing unusual",result:"Choice recipe_simple (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:3,rel:5,flag:"recipe_simple"},
            {id:"recipe_rich",label:"Banana bread plus cinnamon rolls — go big",result:"Choice recipe_rich (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:7,flag:"recipe_rich"},
            {id:"recipe_cover",label:"Whole grain muffins — presentable to parents",result:"Choice recipe_cover (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:2,rel:6,flag:"recipe_cover"}
          ]
        },
        {
          text:(h,s)=>`homeroom_queen s0p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"watched",label:"Watch Daisy watch them eat",result:"Choice watched (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:8,flag:"watched"},
            {id:"helped_serve",label:"Help serve — pass things around",result:"Choice helped_serve (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:11,flag:"helped_served"}
          ]
        },
        {
          text:(h,s)=>`homeroom_queen s0p2 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"played_safe",label:"Smile and wave — nothing to see here",result:"Choice played_safe (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:3,rel:7,flag:"played_safe"},
            {id:"offered_leftovers",label:"Offer the moms the leftovers",result:"Choice offered_leftovers (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:9,flag:"offered_leftovers"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("recipe_rich")&&h.includes("helped_served"),text:(h,s,gain)=>`homeroom_queen ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:4,relBonus:8},
        {condition:h=>h.includes("recipe_rich"),text:(h,s,gain)=>`homeroom_queen ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:3,relBonus:6},
        {condition:()=>true,text:(h,s,gain)=>`homeroom_queen ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:2,relBonus:5}
      ]
    },
    {
      title:"Something's Different",
      phases:[
        {
          text:(h,s)=>`homeroom_queen s1p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"recipe_simple",label:"Something familiar — they know what they like now",result:"Choice recipe_simple (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:6,flag:"recipe_simple"},
            {id:"recipe_rich",label:"Something richer — they're ready for more",result:"Choice recipe_rich (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:7,flag:"recipe_rich"},
            {id:"recipe_special",label:"A special recipe — something you haven't tried before",result:"Choice recipe_special (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:9,flag:"recipe_special"},
            {id:"recipe_cover",label:"Whole grain — something you could explain if asked",result:"Choice recipe_cover (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:3,rel:7,flag:"recipe_cover"}
          ]
        },
        {
          text:(h,s)=>`homeroom_queen s1p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"watched",label:"Notice what's changed about each of them",result:"Choice watched (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:10,flag:"watched"},
            {id:"fed_more",label:"Help pass things — keep the plates full",result:"Choice fed_more (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:9,flag:"fed_more"}
          ]
        },
        {
          text:(h,s)=>`homeroom_queen s1p2 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"deflected_mom",label:"Redirect Mrs. Calloway — point to Sofia and compliment the floor",result:"Choice deflected_mom (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:8,flag:"deflected_mom"},
            {id:"invited_inside",label:"Invite the moms in — lean into it",result:"Choice invited_inside (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:6,flag:"invited_inside"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("recipe_special")&&h.includes("watched"),text:(h,s,gain)=>`homeroom_queen ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:6,relBonus:10},
        {condition:h=>h.includes("recipe_rich")||h.includes("recipe_special"),text:(h,s,gain)=>`homeroom_queen ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:4,relBonus:7},
        {condition:()=>true,text:(h,s,gain)=>`homeroom_queen ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:2,relBonus:5}
      ]
    },
    {
      title:"Mrs. Calloway's Question",
      phases:[
        {
          text:(h,s)=>`homeroom_queen s2p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"recipe_rich",label:"Make the rich batch regardless — she's not going to stop",result:"Choice recipe_rich (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:9,rel:8,flag:"recipe_rich"},
            {id:"recipe_special",label:"Try the cream-filled brioche — this is the moment",result:"Choice recipe_special (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:12,rel:10,flag:"recipe_special"},
            {id:"recipe_cover",label:"Make something genuinely nutritious — cover your tracks",result:"Choice recipe_cover (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:8,flag:"recipe_cover"},
            {id:"recipe_simple",label:"Keep it simple — don't escalate right now",result:"Choice recipe_simple (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:6,flag:"recipe_simple"}
          ]
        },
        {
          text:(h,s)=>`homeroom_queen s2p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"noted_changes",label:"Say something about how well the hall kitchen sessions have been going",result:"Choice noted_changes (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:12,flag:"noted_changes"},
            {id:"pushed_more",label:"Make sure everyone has seconds before the session ends",result:"Choice pushed_more (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:9,flag:"pushed_more"}
          ]
        },
        {
          text:(h,s)=>`homeroom_queen s2p2 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"deflected_question",label:"Answer warmly and specifically — focus on the wellness framing",result:"Choice deflected_question (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:10,flag:"deflected_question"},
            {id:"direct_question",label:"Let Daisy handle it honestly — she deserves to own this",result:"Choice direct_question (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:7,flag:"direct_question"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("recipe_special")&&h.includes("deflected_question"),text:(h,s,gain)=>`homeroom_queen ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:8,relBonus:12},
        {condition:h=>h.includes("deflected_question"),text:(h,s,gain)=>`homeroom_queen ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:5,relBonus:9},
        {condition:()=>true,text:(h,s,gain)=>`homeroom_queen ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:3,relBonus:6}
      ]
    },
    {
      title:"Wide Tables",
      phases:[
        {
          text:(h,s)=>`homeroom_queen s3p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"recipe_special",label:"Make the peach upside-down cake — Sofia's been hinting",result:"Choice recipe_special (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:11,rel:10,flag:"recipe_special"},
            {id:"recipe_rich",label:"Double batch this week — there's enough demand",result:"Choice recipe_rich (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:8,flag:"recipe_rich"},
            {id:"recipe_cover",label:"Something defensible — Mrs. Calloway might stop by again",result:"Choice recipe_cover (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:8,flag:"recipe_cover"},
            {id:"recipe_simple",label:"Standard batch — keep the routine solid",result:"Choice recipe_simple (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:6,flag:"recipe_simple"}
          ]
        },
        {
          text:(h,s)=>`homeroom_queen s3p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"agreed",label:"Agree — it does look nice",result:"Choice agreed (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:12,flag:"agreed"},
            {id:"more_food",label:"Put another piece on Bri's side — practical",result:"Choice more_food (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:9,flag:"more_food"}
          ]
        },
        {
          text:(h,s)=>`homeroom_queen s3p2 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"enlisted_monroe",label:"Let Mrs. Monroe handle Mrs. Calloway — she's been doing it naturally",result:"Choice enlisted_monroe (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:10,flag:"enlisted_monroe"},
            {id:"deflected_mom",label:"Pull Mrs. Calloway into a conversation about the desk upgrade",result:"Choice deflected_mom (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:9,flag:"deflected_mom"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("recipe_special")&&h.includes("enlisted_monroe"),text:(h,s,gain)=>`homeroom_queen ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:10,relBonus:13},
        {condition:h=>h.includes("enlisted_monroe"),text:(h,s,gain)=>`homeroom_queen ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:6,relBonus:10},
        {condition:()=>true,text:(h,s,gain)=>`homeroom_queen ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:4,relBonus:7}
      ]
    },
    {
      title:"The Group Chat",
      phases:[
        {
          text:(h,s)=>`homeroom_queen s4p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"recipe_special",label:"Make something the chat hasn't seen yet — surprise them",result:"Choice recipe_special (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:13,rel:11,flag:"recipe_special"},
            {id:"recipe_rich",label:"Make the cinnamon rolls — settle the debate",result:"Choice recipe_rich (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:9,rel:9,flag:"recipe_rich"},
            {id:"recipe_cover",label:"Make both disputed items — let the chat decide for real",result:"Choice recipe_cover (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:12,flag:"recipe_cover"},
            {id:"recipe_simple",label:"Stick to the classics — reliability is also a virtue",result:"Choice recipe_simple (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:7,flag:"recipe_simple"}
          ]
        },
        {
          text:(h,s)=>`homeroom_queen s4p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"watched",label:"Take it in — this is what Daisy has been building",result:"Choice watched (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:14,flag:"watched"},
            {id:"helped_serve",label:"Help Daisy serve — keep everything moving",result:"Choice helped_serve (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:11,flag:"helped_serve"}
          ]
        },
        {
          text:(h,s)=>`homeroom_queen s4p2 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"enlisted_monroe",label:"Let the moment land — this is a truce",result:"Choice enlisted_monroe (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:13,flag:"enlisted_monroe"},
            {id:"deflected_mom",label:"Make conversation — welcome her properly",result:"Choice deflected_mom (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:12,flag:"deflected_mom"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("recipe_special")&&h.includes("watched"),text:(h,s,gain)=>`homeroom_queen ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:10,relBonus:14},
        {condition:h=>h.includes("recipe_special")||h.includes("recipe_rich"),text:(h,s,gain)=>`homeroom_queen ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:7,relBonus:10},
        {condition:()=>true,text:(h,s,gain)=>`homeroom_queen ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:4,relBonus:7}
      ]
    },
    {
      title:"End of Term",
      phases:[
        {
          text:(h,s)=>`homeroom_queen s5p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"recipe_special",label:"The cardamom honey cake AND the peach upside-down cake AND the cinnamon rolls",result:"Choice recipe_special (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:14,rel:12,flag:"recipe_special"},
            {id:"recipe_rich",label:"Double everything — it's the last one",result:"Choice recipe_rich (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:11,rel:10,flag:"recipe_rich"}
          ]
        },
        {
          text:(h,s)=>`homeroom_queen s5p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"watched_all_six",label:"Watch Daisy in the room she built",result:"Choice watched_all_six (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:16,flag:"watched_all_six"},
            {id:"joined_table",label:"Sit at the table — be part of it",result:"Choice joined_table (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:14,flag:"joined_table"}
          ]
        },
        {
          text:(h,s)=>`homeroom_queen s5p2 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"committed_to_next_year",label:"Tell her yes — this is happening again",result:"Choice committed_to_next_year (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:18,flag:"committed_to_next_year"},
            {id:"let_daisy_answer",label:"Let Daisy answer for herself",result:"Choice let_daisy_answer (homeroom_queen) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:20,flag:"let_daisy_answer"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("recipe_special")&&h.includes("watched_all_six")&&h.includes("committed_to_next_year"),text:(h,s,gain)=>`homeroom_queen ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:18,relBonus:22},
        {condition:h=>h.includes("watched_all_six")||h.includes("joined_table"),text:(h,s,gain)=>`homeroom_queen ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:12,relBonus:16},
        {condition:()=>true,text:(h,s,gain)=>`homeroom_queen ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:8,relBonus:12}
      ]
    }
  ],

  ranked_feedee:[
    {
      title:"First Order",
      phases:[
        {
          text:(h,s)=>`ranked_feedee s0p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"go_big",label:"Go big — full order, everything",result:"Choice go_big (ranked_feedee) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:3,flag:"big_order"},
            {id:"keep_light",label:"Keep it simple — something quick",result:"Choice keep_light (ranked_feedee) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:2,rel:2,flag:"light_order"}
          ]
        },
        {
          text:(h,s)=>`ranked_feedee s0p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"stay_focused",label:"Eat between timers — stay locked in",result:"Choice stay_focused (ranked_feedee) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:4,flag:"focused_session"},
            {id:"eat_through",label:"Just eat through it — worry about the game later",result:"Choice eat_through (ranked_feedee) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:3,flag:"eat_through"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("focused_session"),text:(h,s,gain)=>`ranked_feedee ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:5,relBonus:8},
        {condition:()=>true,text:(h,s,gain)=>`ranked_feedee ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:3,relBonus:6}
      ]
    },
    {
      title:"She Added Extras",
      phases:[
        {
          text:(h,s)=>`ranked_feedee s1p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"eat_extras_first",label:"Eat the extras while they're warm",result:"Choice eat_extras_first (ranked_feedee) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:4,flag:"ate_extras"},
            {id:"save_extras",label:"Save them for mid-session",result:"Choice save_extras (ranked_feedee) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:3,flag:"saved_extras"}
          ]
        },
        {
          text:(h,s)=>`ranked_feedee s1p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"order_more",label:"Order more — the session is running",result:"Choice order_more (ranked_feedee) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:5,flag:"ordered_more"},
            {id:"push_through",label:"Push through without more food",result:"Choice push_through (ranked_feedee) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:3,rel:4,flag:"pushed_through"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("ordered_more"),text:(h,s,gain)=>`ranked_feedee ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:6,relBonus:9},
        {condition:()=>true,text:(h,s,gain)=>`ranked_feedee ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:4,relBonus:7}
      ]
    },
    {
      title:"Knows the Schedule",
      phases:[
        {
          text:(h,s)=>`ranked_feedee s2p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"ask_how",label:"Ask how she knew",result:"Choice ask_how (ranked_feedee) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:6,flag:"asked_how"},
            {id:"just_take_it",label:"Just take the food — whatever, it's warm",result:"Choice just_take_it (ranked_feedee) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:3,rel:4,flag:"took_it"}
          ]
        },
        {
          text:(h,s)=>`ranked_feedee s2p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"let_her_handle",label:"Let Rae manage the food situation — she clearly knows",result:"Choice let_her_handle (ranked_feedee) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:6,flag:"delegated"},
            {id:"stay_in_control",label:"Order the next round herself anyway",result:"Choice stay_in_control (ranked_feedee) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:4,flag:"ordered_self"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("delegated"),text:(h,s,gain)=>`ranked_feedee ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:8,relBonus:10},
        {condition:()=>true,text:(h,s,gain)=>`ranked_feedee ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:5,relBonus:8}
      ]
    },
    {
      title:"Door Code",
      phases:[
        {
          text:(h,s)=>`ranked_feedee s3p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"ask_code",label:"When did you get the code",result:"Choice ask_code (ranked_feedee) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:5,flag:"asked_code"},
            {id:"just_let_in",label:"Let her in — the food is warm, questions later",result:"Choice just_let_in (ranked_feedee) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:3,rel:4,flag:"let_in"}
          ]
        },
        {
          text:(h,s)=>`ranked_feedee s3p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"lets_rae_stay",label:"She can stay while the session runs",result:"Choice lets_rae_stay (ranked_feedee) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:8,flag:"rae_stayed"},
            {id:"sends_rae_out",label:"Out after setup — she needs to focus",result:"Choice sends_rae_out (ranked_feedee) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:5,flag:"rae_left"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("rae_stayed"),text:(h,s,gain)=>`ranked_feedee ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:10,relBonus:12},
        {condition:()=>true,text:(h,s,gain)=>`ranked_feedee ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:7,relBonus:9}
      ]
    },
    {
      title:"Before You Order",
      phases:[
        {
          text:(h,s)=>`ranked_feedee s4p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"confronted_rae",label:"'How did you know what I was going to order'",result:"Choice confronted_rae (ranked_feedee) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:7,flag:"confronted_rae"},
            {id:"just_eat",label:"Just start eating — the session won't wait",result:"Choice just_eat (ranked_feedee) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:5,flag:"skipped_question"}
          ]
        },
        {
          text:(h,s)=>`ranked_feedee s4p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"accepted_arrangement",label:"Acknowledge — out loud — that this arrangement works",result:"Choice accepted_arrangement (ranked_feedee) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:9,rel:8,flag:"accepted_arrangement"},
            {id:"pretend_normal",label:"Pretend everything is completely normal",result:"Choice pretend_normal (ranked_feedee) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:5,flag:"pretended"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("accepted_arrangement"),text:(h,s,gain)=>`ranked_feedee ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:12,relBonus:13},
        {condition:()=>true,text:(h,s,gain)=>`ranked_feedee ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:8,relBonus:10}
      ]
    },
    {
      title:"She's Just Here",
      phases:[
        {
          text:(h,s)=>`ranked_feedee s5p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"said_something",label:"'You're always here now'",result:"Choice said_something (ranked_feedee) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:8,flag:"said_something"},
            {id:"opened_game",label:"Open the game without comment",result:"Choice opened_game (ranked_feedee) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:3,rel:6,flag:"no_comment"}
          ]
        },
        {
          text:(h,s)=>`ranked_feedee s5p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"working_as_intended",label:"Say it back — 'working as intended'",result:"Choice working_as_intended (ranked_feedee) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:12,rel:10,flag:"said_it_back"},
            {id:"just_nod",label:"Nod and keep playing",result:"Choice just_nod (ranked_feedee) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:9,rel:7,flag:"nodded"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("said_it_back"),text:(h,s,gain)=>`ranked_feedee ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:15,relBonus:16},
        {condition:()=>true,text:(h,s,gain)=>`ranked_feedee ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:10,relBonus:13}
      ]
    }
  ],

  wife_lessons:[
    {
      title:"The First Gathering",
      phases:[
        {
          text:(h,s)=>`wife_lessons s0p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"rich_recipe",label:"Rich recipe — let the food be the first lesson",result:"Choice rich_recipe (wife_lessons) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:12,rel:7,flag:"rich_recipe"},
            {id:"bake_together",label:"Bake together — the lesson is in the doing",result:"Choice bake_together (wife_lessons) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:12,flag:"bake_together"}
          ]
        },
        {
          text:(h,s)=>`wife_lessons s0p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"watched_wanda",label:"Watch Wanda's face when she talks about Kezia",result:"Choice watched_wanda (wife_lessons) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:9,flag:"watched_wanda"},
            {id:"gave_recipe",label:"Write Wanda the recipe to take home",result:"Choice gave_recipe (wife_lessons) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:14,flag:"gave_recipe"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("rich_recipe")&&h.includes("gave_recipe"),text:(h,s,gain)=>`wife_lessons ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:8,relBonus:12},
        {condition:h=>h.includes("bake_together"),text:(h,s,gain)=>`wife_lessons ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:5,relBonus:9},
        {condition:()=>true,text:(h,s,gain)=>`wife_lessons ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:3,relBonus:7}
      ]
    },
    {
      title:"The Circle Grows",
      phases:[
        {
          text:(h,s)=>`wife_lessons s1p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"rich_recipe",label:"Rich batch today — MJ's best work",result:"Choice rich_recipe (wife_lessons) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:12,rel:7,flag:"rich_recipe"},
            {id:"bake_together",label:"Pull Patrice into it immediately",result:"Choice bake_together (wife_lessons) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:13,flag:"bake_together"},
            {id:"femininity_talk",label:"Open the soft home talk — let Patrice hear it from the start",result:"Choice femininity_talk (wife_lessons) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:15,flag:"femininity_talk"}
          ]
        },
        {
          text:(h,s)=>`wife_lessons s1p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"asked_darlene",label:"Ask Darlene how Claire fits in",result:"Choice asked_darlene (wife_lessons) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:9,flag:"asked_darlene"},
            {id:"asked_wanda",label:"Ask Wanda what she's been putting in Kezia's food",result:"Choice asked_wanda (wife_lessons) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:12,flag:"asked_wanda"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("femininity_talk")&&h.includes("asked_wanda"),text:(h,s,gain)=>`wife_lessons ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:8,relBonus:13},
        {condition:h=>h.includes("rich_recipe")||h.includes("femininity_talk"),text:(h,s,gain)=>`wife_lessons ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:5,relBonus:9},
        {condition:()=>true,text:(h,s,gain)=>`wife_lessons ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:3,relBonus:7}
      ]
    },
    {
      title:"The Rival Converts",
      phases:[
        {
          text:(h,s)=>`wife_lessons s2p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"femininity_talk",label:"Give the femininity talk — this is exactly the right moment",result:"Choice femininity_talk (wife_lessons) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:14,flag:"femininity_talk"},
            {id:"rich_recipe",label:"Let the food do the work — nothing needs to be said",result:"Choice rich_recipe (wife_lessons) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:12,rel:8,flag:"rich_recipe"},
            {id:"bake_together",label:"Pull Cheryl into the lesson — give her something to do",result:"Choice bake_together (wife_lessons) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:9,rel:11,flag:"bake_together"}
          ]
        },
        {
          text:(h,s)=>`wife_lessons s2p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"praised_cheryl",label:"Tell Cheryl her daughter's appetite is remarkable",result:"Choice praised_cheryl (wife_lessons) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:11,flag:"praised_cheryl"},
            {id:"praised_wanda",label:"Tell Wanda moving the furniture for Kezia is exactly right",result:"Choice praised_wanda (wife_lessons) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:12,flag:"praised_wanda"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("femininity_talk")&&h.includes("praised_cheryl"),text:(h,s,gain)=>`wife_lessons ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:9,relBonus:14},
        {condition:h=>h.includes("femininity_talk"),text:(h,s,gain)=>`wife_lessons ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:6,relBonus:10},
        {condition:()=>true,text:(h,s,gain)=>`wife_lessons ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:4,relBonus:8}
      ]
    },
    {
      title:"The Full Circle",
      phases:[
        {
          text:(h,s)=>`wife_lessons s3p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"indulge_yourself",label:"Indulge Yourself — the lesson about giving in",result:"Choice indulge_yourself (wife_lessons) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:14,rel:9,flag:"indulge_yourself"},
            {id:"femininity_talk",label:"The soft home talk — bring Ruthanne and Becca in from the beginning",result:"Choice femininity_talk (wife_lessons) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:9,rel:14,flag:"femininity_talk"},
            {id:"bake_together",label:"Everyone bakes — six women at the counter",result:"Choice bake_together (wife_lessons) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:11,rel:12,flag:"bake_together"}
          ]
        },
        {
          text:(h,s)=>`wife_lessons s3p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"gave_strong_shake",label:"Give Becca the strong shake recipe",result:"Choice gave_strong_shake (wife_lessons) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:12,flag:"gave_strong_shake"},
            {id:"talked_about_competition",label:"Talk about the competition — which daughter is ahead",result:"Choice talked_about_competition (wife_lessons) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:10,flag:"talked_about_competition"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("indulge_yourself")&&h.includes("gave_strong_shake"),text:(h,s,gain)=>`wife_lessons ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:10,relBonus:14},
        {condition:h=>h.includes("femininity_talk"),text:(h,s,gain)=>`wife_lessons ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:7,relBonus:11},
        {condition:()=>true,text:(h,s,gain)=>`wife_lessons ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:5,relBonus:9}
      ]
    },
    {
      title:"The Philosophy",
      phases:[
        {
          text:(h,s)=>`wife_lessons s4p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"the_philosophy",label:"Give the full lesson — the philosophy stated plainly",result:"Choice the_philosophy (wife_lessons) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:16,flag:"the_philosophy"},
            {id:"indulge_yourself",label:"Let the food be the philosophy — Indulge Yourself, no words needed",result:"Choice indulge_yourself (wife_lessons) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:15,rel:10,flag:"indulge_yourself"},
            {id:"rich_recipe",label:"Rich recipe — the lesson is in how good it is",result:"Choice rich_recipe (wife_lessons) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:12,rel:12,flag:"rich_recipe"}
          ]
        },
        {
          text:(h,s)=>`wife_lessons s4p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"celebrated_lily",label:"Tell Ruthanne that Lily wanting to learn is the real goal",result:"Choice celebrated_lily (wife_lessons) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:14,flag:"celebrated_lily"},
            {id:"went_around_the_table",label:"Go around the table — every daughter, every milestone",result:"Choice went_around_the_table (wife_lessons) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:16,flag:"went_around_the_table"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("the_philosophy")&&h.includes("went_around_the_table"),text:(h,s,gain)=>`wife_lessons ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:12,relBonus:16},
        {condition:h=>h.includes("the_philosophy"),text:(h,s,gain)=>`wife_lessons ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:8,relBonus:13},
        {condition:()=>true,text:(h,s,gain)=>`wife_lessons ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:6,relBonus:11}
      ]
    },
    {
      title:"The Legacy",
      phases:[
        {
          text:(h,s)=>`wife_lessons s5p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"the_philosophy",label:"The philosophy — final statement",result:"Choice the_philosophy (wife_lessons) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:16,flag:"the_philosophy"},
            {id:"rich_recipe",label:"The legendary spread — everything at once",result:"Choice rich_recipe (wife_lessons) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:16,rel:12,flag:"rich_recipe"}
          ]
        },
        {
          text:(h,s)=>`wife_lessons s5p1 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"asked_about_kezia",label:"Ask Wanda what Kezia's day looks like now",result:"Choice asked_about_kezia (wife_lessons) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:14,flag:"asked_about_kezia"},
            {id:"celebrated_all",label:"Tell each woman what her daughter represents",result:"Choice celebrated_all (wife_lessons) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:17,flag:"celebrated_all"}
          ]
        }
      ],
      endings:[
        {condition:h=>h.includes("the_philosophy")&&h.includes("celebrated_all"),text:(h,s,gain)=>`wife_lessons ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:14,relBonus:18},
        {condition:h=>h.includes("the_philosophy"),text:(h,s,gain)=>`wife_lessons ending 1 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:10,relBonus:15},
        {condition:()=>true,text:(h,s,gain)=>`wife_lessons ending 2 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:7,relBonus:12}
      ]
    }
  ],

  machine_goddess:[
    {
      title:"First Prototype",
      phases:[
        {
          text:(h,s)=>`machine_goddess s0p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"self_test",label:"Let her self-test first",result:"Choice self_test (machine_goddess) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:6,flag:"self_test"},
            {id:"assign_subject",label:"Authorize a floor volunteer",result:"Choice assign_subject (machine_goddess) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:8,flag:"assigned"}
          ]
        }
      ],
      endings:[
        {condition:()=>true,text:(h,s,gain)=>`machine_goddess ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:6,relBonus:8}
      ]
    },
    {
      title:"Feeder Calibration",
      phases:[
        {
          text:(h,s)=>`machine_goddess s1p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"boost_throughput",label:"Run greedy feeder throughput",result:"Choice boost_throughput (machine_goddess) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:8,rel:5},
            {id:"slow_tease",label:"Run tease mode for precision data",result:"Choice slow_tease (machine_goddess) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:5,rel:7}
          ]
        }
      ],
      endings:[
        {condition:()=>true,text:(h,s,gain)=>`machine_goddess ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:5,relBonus:6}
      ]
    },
    {
      title:"Serum Variance",
      phases:[
        {
          text:(h,s)=>`machine_goddess s2p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"document",label:"Document everything clinically",result:"Choice document (machine_goddess) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:4},
            {id:"celebrate",label:"Celebrate the extremity",result:"Choice celebrate (machine_goddess) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:12,rel:6}
          ]
        }
      ],
      endings:[
        {condition:()=>true,text:(h,s,gain)=>`machine_goddess ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:8,relBonus:5}
      ]
    },
    {
      title:"Furniture Commission",
      phases:[
        {
          text:(h,s)=>`machine_goddess s3p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"comfort",label:"Prioritize comfort calibration",result:"Choice comfort (machine_goddess) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:6,rel:7},
            {id:"display",label:"Prioritize display posture",result:"Choice display (machine_goddess) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:5}
          ]
        }
      ],
      endings:[
        {condition:()=>true,text:(h,s,gain)=>`machine_goddess ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:6,relBonus:7}
      ]
    },
    {
      title:"Malfunction Night",
      phases:[
        {
          text:(h,s)=>`machine_goddess s4p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"shutdown",label:"Hard shutdown all devices",result:"Choice shutdown (machine_goddess) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:4,rel:6},
            {id:"ride_it",label:"Let it run for max data",result:"Choice ride_it (machine_goddess) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:9,rel:4}
          ]
        }
      ],
      endings:[
        {condition:()=>true,text:(h,s,gain)=>`machine_goddess ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:5,relBonus:5}
      ]
    },
    {
      title:"Master Inventor",
      phases:[
        {
          text:(h,s)=>`machine_goddess s5p0 bridge — ${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.`,
          choices:[
            {id:"expand",label:"Authorize wider deployment",result:"Choice expand (machine_goddess) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:10,rel:8},
            {id:"consolidate",label:"Consolidate the core workshop",result:"Choice consolidate (machine_goddess) — flag logged; evolved.choice slots own the beat @ week 20+.",lbs:7,rel:10}
          ]
        }
      ],
      endings:[
        {condition:()=>true,text:(h,s,gain)=>`machine_goddess ending 0 bridge — stream continues; modular evolved.ending @ week 20+.`,gainBonus:12,relBonus:12}
      ]
    }
  ],

  salon_appetit: SALON_EVOLVED_EVENTS,
  artisan_gallery: GALLERY_EVOLVED_EVENTS,
};
