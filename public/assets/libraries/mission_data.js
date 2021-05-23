// This is the Library for mission data

// Note: The missions library will contain an array of Mission Data, which will be the data for the creation of
// mission objects when the game Engine needs to create them. Each object's array should follow the format to create
// this kind of object.

// A - Copyable Mission Template:
// {
//   levelNumber: null,
//   levelName: null,
//   brief: null,
//   achievementStatement: null,
//   objectives: [],
//   setupInstructions: null,
//   specialFX: null,
//   dialogue: null,
// },

// B - This is a template for the data types:

// {
//   levelNumber: number,
//   levelName: string,
//   brief: string,
//   achievementStatement: string,
//   objectives: [array of objective data arrays],
//   setupInstructions: array of instruction arrays, or null,
//   specialFX: array of special fx cue objects, or null,
//   dialogue: object whose keys are the names of Sprites, and whose values are sub-objects with text and conditions
// },

// C - Here is a template for individual mission setup instructions:
//          {
// idx = 0    type: "add-block",
// idx = 1    detailsList: [
// (detail 1)   [x coordinate, y coordinate]
// (detail 2)   [numerical block ID code]
//            ], [ DETAILS LIST LENGTH VARIES BASED ON THE TYPE OF SETUP ACTION, TO ALLOW FOR MORE COMPLEX INSTRUCTIONS LATER ON]
//          }

// D - This is the blueprint for Special FX cues to play at the start of a mission (note that these must still be in an array!):
//          {
//            target: variable name of HTML dom element,
//            effect: the string name of the CSS keyframe animation (or effect) to use,
//            duration: time in seconds for the animation to last,
//          }

// E - The shape of the dialogue object:
// dialogue: {
//   speaker_id: [
//     {
//       id: 0,
//       text: 'What new treachery is this??',
//       type: 'speech',   // or thought
//       repeating: true,
//       condition: ['position', 6],   // x coordinate only?
//       duration: 40       // 20 game cycles = 1 second
//     },  // EOL for dialogue id 0
//   ],    // EOL for speaker_id's dialogues
// }       // EOL for dialogues

// F - Shape of the 'threshold' objective type:
// [
//   "Escape from holding cell.",                               // 0 - Objective instructions statement
//   "Objective Achieved: Escape from holding Cell",            // 1 - Objective achievement statement
//   "threshold",                                               // 2 - Objective test type
//   { directions: ['toTheRight', 'above'], coords: [15, 20]},  // 3 - Objective details (in this case, directions, coords)
//   Directions options: 'toTheRight', 'toTheLeft', 'above', 'below' referring to the player's position relative to the target coordinates
//   NOTE that the x-axis value must always be given first e.g. ['toTheLeft', 'below'] and NOT ['above', 'toTheRight']
//   1,                                                         // 4 - XP value for objective
// ],
// [
// G - Sequence of setup instructions to reset stage with a new level:
// [
//  'clear-stage', // clear stage setup instruction tells all the columns to wipe clear,
// ],
// [
//   'reset-stage', // reset stage will run biome builder with a biome of one's choice:
//   [
//     baconLandRight, // idx 0: select biome for the right
//     baconLandLeft, // idx 1: select biome for the left
//     [0, SCREEN_WIDTH_IN_BLOCKS], // idx 2: column start/stop values for newly rendered terrain
//   ],
// ],
// [
//   'set-world-width', // set-world-width will alter the world width to make levels wider or tighter
//   21, // one argument only: the new world width for the global variable
// ],
// Clear remaining baddies from the previous world (make sure to do this BEFORE adding new baddies to the current level!)
// ['clear-baddies'],

const missions = [
  // Mission 0 - The Starting Screen:
  {
    levelNumber: 0, // Level number determines index position as well as which sound to play when the mission is accomplished.
    levelName: "Escape, Part I",
    brief: "You've been taken to some kind of science dungeon! Find some kind of control panel or exit switch or something and get the heck outta here!",
    achievementStatement: "* ZE CELL BLOCK DOORS ARE NOW OPENINGK *",
    objectives: [
      [
        // Objective One:
        "Open the Cell Block Door", // 0 - Objective instructions statement
        "", // 1 - Objective achievement statement (empty in this case so it doesn't clash with the mission achievement message).
        "position", // 2 - Objective test type
        [61, 12], // 3 - Objective details (in this case, coords)
        2, // 4 - XP value for objective
      ],
    ],
    setupInstructions: [
      [   // Instruction 1:
        "add-baddies",
        [
          [ 23, 20, 1003, 1001, [18, 23]],  // last number here must never exceed initial x value or baddie might fall off the edge.
          [ 30, 9, 1003, 1002, [23, 30]],
          [ 45, 9, 1002, 1003, [40, 43]],
          [ 55, 11, 1003, 1004, [46, 55]],
          [ 63, 12, 1002, 1005, [46, 63]],
          [ 61, 12, 1002, 1006, [47, 61]]
        ],
      ],  // End of instruction 1
      [
        "add-item",
        [
          37, 9, {type: "health", power: 2, duration: 0}
        ]
      ],
      [
        "add-item",
        [
          64, 26, {type: "experience", power: 2, duration: 0}
        ]
      ],
      [
        "add-item",
        [
          64, 12, {type: "health", power: 2, duration: 0}
        ]
      ],
    ],
    specialFX: null,
    dialogue: {
      player: [
        {
          id: 0,
          text: "No fortress can hold me!!",
          type: "thought",
          repeating: false,
          condition: ["position", 12],
          duration: 50
        },
        {
          id: 1,
          text: "That glowing terminal looks promising...",
          type: "thought",
          repeating: false,
          condition: ["position", 61, 18],
          duration: 60
        },
      ],
      baddie_1001: [
        {
          id: 2,
          text: "Ze specimen ist loose! Get him!",
          type: "speech",
          repeating: false,
          condition: ["position", 22],
          duration: 80,
        },
      ],
      baddie_1002: [
        {
          id: 3,
          text: "Achtung!",
          type: "speech",
          repeating: false,
          condition: ["position", 28],
          duration: 30,
        },
      ],
      baddie_1003: [
        {
          id: 4,
          text: "Did you hear zat?",
          type: "speech",
          repeating: false,
          condition: ["position", 42],
          duration: 50,
        },
      ],
      baddie_1004: [
        {
          id: 5,
          text: "Ze specimen ist loose! GUARDS!!!",
          type: "speech",
          repeating: false,
          condition: ["position", 50],
          duration: 60,
        },
      ],
      baddie_1005: [
        {
          id: 6,
          text: "Fix bayonets!",
          type: "speech",
          repeating: false,
          condition: ["position", 60],
          duration: 50,
        },
      ],
    }
  },
  {
    levelNumber: 1,
    levelName: "Escape, Part II",
    brief: "The holding cell area has been opened, and your captors do not seem too happy about it. Get out of the dungeon, and find the service elevator. Hey, how do dinosaurs know about service elevators anyway?",
    achievementStatement: "* SUBJECT IS IN ELEVATOR - DEPLOY ZE AMBUSH. *",
    objectives: [
      [
        "Escape from the holding cells",
        "Objective Achieved: Escape from Holding Cells",
        "position",
        [ 8 ],
        2,
      ],
      [
        "Find the elevator",
        "",
        "position",
        [38, 34],
        2,
      ],
    ],
    setupInstructions: [
      ['remove-block', [38, 9]],
      ['remove-block', [9, 9]],
      ['remove-block', [12, 15]],
      ['remove-block', [14, 15]],
      ['remove-block', [25, 15]],
      ['remove-block', [28, 15]],
      ['remove-block', [31, 15]],
      ['remove-block', [61, 11]],
      [
        'create-block', 
        [
          [61, 11], 
          740,
        ]
      ],
      [
        "add-baddies",
        [
          [ 12, 15, 1003, 1007, [6, 13]],
          [ 14, 15, 1002, 1008, [6, 15]],
          [ 25, 15, 1003, 1009, [25, 38]],
          [ 28, 15, 1002, 1010, [6, 27]],
          [ 31, 15, 1004, 1011, [12, 31]],
          [ 13, 24, 1002, 1012, [13, 17]],
          [ 32, 27, 1002, 1013, [24, 32]],
          [ 5, 35, 1002, 1014, [5, 13]],
        ],
      ],
      [
        "add-item",
        [
          20, 10, {type: "health", power: 2, duration: 0}
        ]
      ],
      [
        "add-item",
        [
          37, 29, {type: "experience", power: 2, duration: 0}
        ]
      ],
      [
        "add-item",
        [
          3, 44, {type: "experience", power: 2, duration: 0}
        ]
      ],
      [
        'add-item',
        [
          21, 32, {type: "health", power: 2, duration: 0}
        ]
      ],
      [
        'add-item',
        [
          3, 19, {type: "health", power: 1, duration: 0}
        ]
      ],
      ["update-player-respawn", [63, 12]],
    ],
    specialFX: null,
    dialogue: {
      player: [
        {
          id: 7,
          text: "There must be a call button somewhere...",
          type: "thought",
          repeating: true,
          condition: ["position", 26, 33],
          duration: 50
        },
        {
          id: 8,
          text: "I wonder what I'll do with this experience.",
          type: "thought",
          repeating: false,
          condition: ["position", 3, 44],
          duration: 60
        },
      ],
      baddie_1009: [
        {
          id: 9,
          text: "Don't let it get away!",
          type: "speech",
          repeating: false,
          condition: ["position", 26],
          duration: 80
        },
      ],
      baddie_1011: [
        {
          id: 10,
          text: "Screw bayonets - LOCK UND LOAD!!",
          type: "speech",
          repeating: false,
          condition: ["position", 28],
          duration: 60
        },
      ]
    },
  },
  {
    levelNumber: 2,
    levelName: "Escape, Part III",
    brief: "Those bastards booby-trapped the elevator! Looks like you'll have to find another way out. It looks pretty hot up ahead but maybe you can follow a tunnel to the surface. Or maybe it'll be a pipe this time. Either way... watch out for that lava.",
    achievementStatement: "* SPECIMEN IS STILL ESCAPINGK. GUARD PERSONNEL PLEASE TRY HARDER. *",
    objectives: [
      [
        "Enter the Geothermal power station.",
        "Objective Achieved: Enter Geothermal Power Station",
        "position",
        [66],
        1,
      ],
      [
        "Find the exit to the geothermal power station",
        "",
        "threshold",
        { directions: ['toTheLeft', 'above'], coords: [85, 45]},
        1,
      ],
    ],
    setupInstructions: [
        ['update-player-respawn', [38, 35]],
        ['clear-baddies'],
        ['remove-block', [38, 33]], // Control panel - replace with red version
        // ['remove-block', [38, 37]],  // Air ducts above elevator panel - uncomment for dev mode shortcut.
        // ['remove-block', [39, 37]],
        ['remove-block', [41, 33]],
        ['remove-block', [39, 22]],
        [
          'create-block', 
          [
            [22, 31], 
            702
          ]
        ],
        [
          'create-block', 
          [
            [23, 31], 
            702
          ]
        ],
        [
          'create-block', 
          [
            [24, 31], 
            702
          ]
        ],
        [
          'create-block', 
          [
            [34, 31], 
            702
          ]
        ],
        [
          'create-block', 
          [
            [35, 31], 
            702
          ]
        ],
        [
          'create-block', 
          [
            [38, 33], 
            740
          ]
        ],
        [
          'add-baddies',
          [
            [ 22, 32, 1002, 1015, [22, 40]],
            [ 23, 32, 1004, 1016, [23, 40]],
            [ 41, 33, 1003, 1017, [25, 40]],
            [ 42, 33, 1004, 1018, [25, 40]],
            [ 44, 33, 1004, 1019, [25, 40]],
            [ 135, 29, 1005, 1020, [131, 135], 7],  // Bugs have 7 HP...
            [ 145, 25, 1005, 1021, [143, 145], 11], // ... Or sometimes 11!
            [ 143, 25, 1005, 1022, [136, 143], 7],
            [ 134, 39, 1005, 1023, [128, 134], 7],
            [ 146, 46, 1005, 1024, [137, 146], 7],
            [ 148, 43, 1005, 1025, [141, 148], 7],
          ] 
        ],
        [
          "add-item",
          [
            40, 30, {type: "experience", power: 2, duration: 0}
          ]
        ],
        [
          "add-item", // In the air duct
          [
            45, 38, {type: "health", power: 1, duration: 0}
          ]
        ],
        [
          "add-item", // In the lava pipe 
          [
            88, 21, {type: "experience", power: 5, duration: 0}
          ]
        ],
        [
          "add-item", // In the bug cave
          [
            148, 43, {type: "health", power: 2, duration: 0}
          ]
        ],
        [
          "add-item", // In the bug cave ('the shiny')
          [
            144, 25, {type: "experience", power: 5, duration: 0}
          ]
        ],
      ],
    specialFX: null,
    dialogue: {
      player: [
        {
          id: 11,
          text: "Who keeps placing these signs?",
          type: "thought",
          repeating: false,
          condition: ["position", 75],
          duration: 50
        },
        {
          id: 12,
          text: "Who designed this place??",
          type: "thought",
          repeating: false,
          condition: ["position", 91, 22],
          duration: 50
        },
        {
          id: 13,
          text: "Spineless jerks!",
          type: "thought",
          repeating: false,
          condition: ["position", 127, 49],
          duration: 50
        },
        {
          id: 14,
          text: "Ooh, nice signage!",
          type: "thought",
          repeating: false,
          condition: ["position", 104, 45],
          duration: 50
        },
      ],
      baddie_1020: [
        {
          id: 15,
          text: "Chzzz! Stay away, vertebrate!",
          type: "speech",
          repeating: false,
          condition: ["position", 133],
          duration: 50
        },
      ],
      baddie_1021: [
        {
          id: 16,
          text: "Protect the shiny!",
          type: "speech",
          repeating: false,
          condition: ["position", 143],
          duration: 50
        },
      ],
    },
  },
  {
    levelNumber: 3,
    levelName: "Escape, Part IV",
    brief: "Just a little bit further! It looks like there's some kinda wierd structure up ahead where you might be able to open an interdimensional portal, or something. On the plus side, you haven't had to fight any huge ugly boss baddies yet, so let's hope that trend continues...",
    achievementStatement: "* SPECIMEN HAS REACHED CONTAINMENT CHAMBER.\nDEPLOY ZE EXPERIMENTAL HYBRID SOLDIER. *",
    objectives: [
      [
        "Find the portal activation control center",
        "",
        "position",
        [32],
        1,
      ],
    ],
    setupInstructions: [
      ["update-player-respawn", [92, 46]],
      ["remove-block", [26, 40]],   // Elevator shaft entrance
      [
        "add-item", // Far side of the elevator
        [
          25, 40, {type: "experience", power: 7, duration: 0}
        ]
      ],
      [
        "add-item", // Room under tower
        [
          48, 41, {type: "health", power: 3, duration: 0}
        ]
      ],
      [
        "add-item", // Under the pipe
        [
          94, 53, {type: "experience", power: 7, duration: 0}
        ]
      ],
      [
        "add-item", // Right outside arena area
        [
          42, 50, {type: "health", power: 3, duration: 0}
        ]
      ],
      [
        "add-baddies",
        [
          [ 76, 46, 1004, 1026, [76, 83]],
          [ 73, 47, 1004, 1027, [73, 82]],
          [ 64, 47, 1003, 1028, [64, 75]],
          [ 65, 47, 1002, 1029, [65, 76]],
          [ 66, 47, 1002, 1030, [66, 76]],
          [ 48, 57, 1004, 1031, [48, 52]],
          [ 49, 57, 1002, 1032, [49, 54]],
        ]
      ],
    ],
    specialFX: null,
    dialogue: {
      player: [
        {
          id: 17,
          text: "Hmm I don't like the look of this place...",
          type: "thought",
          repeating: false,
          condition: ["position", 39],
          duration: 50
        },
        {
          id: 18,
          text: "Darn, it's locked!",
          type: "thought",
          repeating: false,
          condition: ["position", 33, 57],
          duration: 50
        },
      ],
      baddie_1026: [
        {
          id: 19,
          text: "DINOSAUR SIGHTED!!",
          type: "speech",
          repeating: false,
          condition: ["position", 78],
          duration: 40
        },
      ],
      baddie_1028: [
        {
          id: 20,
          text: "Kill zat creature!!!",
          type: "speech",
          repeating: false,
          condition: ["position", 65],
          duration: 50
        },
      ],
    }
  },
  {
    levelNumber: 4,
    levelName: "Escape, Part V: BOSS FIGHT",
    brief: "Looks like we done jinxed it regarding the ol' boss fight possibility. If you survive, I reckon this'll be a good lesson in humility. My advice for right now though: try to come at him from behind.",
    achievementStatement: "* EXPERIMENTAL UBER SOLDIER HAS BEEN KILLED. *\n* REDUCINGK HYBRID RESEARCH FUNDING. *",
    objectives: [
      [
        "Kill that abomination!",
        "",
        "kill-particular-individual",
        [9999],
        1,
      ],
    ],
    setupInstructions: [
      ["update-player-respawn", [39, 51]],
      [
        'create-block', // Combat arena cell door
        [
          [41, 50],
          736,
        ]
      ],
      [
        'create-block', // Combat arena cell door
        [
          [23, 57], 
          736,
        ]
      ],
      [
        'create-block', // Combat arena cell door
        [
          [14, 50], 
          736,
        ]
      ],
      ['add-boss', [ 25, 60, 1006, 9999, [100, 120]]],
    ],
    specialFX: null,
    dialogue: {
      player: [
        {
          id: 21,
          text: "Oh boy, I'm in a tight spot!",
          type: "thought",
          repeating: false,
          condition: ["position", 39],
          duration: 60
        },
        {
          id: 22,
          text: "Darn, it's locked!",
          type: "thought",
          repeating: false,
          condition: ["position", 31, 59],
          duration: 60
        },
        {
          id: 23,
          text: "He's tough, but his pathfinding could use some work...",
          type: "thought",
          repeating: false,
          condition: ["position", 21],
          duration: 75
        },
      ],
      baddie_9999: [
        {
          id: 24,
          text: "You are an INFERIOR specimen!!",
          type: "speech",
          repeating: false,
          condition: ["position", 26],
          duration: 60
        },
        {
          id: 25,
          text: "Time to DIE, weak one!!",
          type: "speech",
          repeating: false,
          condition: ["position", 33],
          duration: 60
        },
        {
          id: 26,
          text: "Come back and FACE ME!!!",
          type: "speech",
          repeating: false,
          condition: ["position", 24, 54],
          duration: 60
        },
        {
          id: 27,
          text: "My existence was agony. Danke shoen...",
          type: "speech",
          repeating: false,
          condition: ["onDeath"],
          duration: 80
        },
      ],
    }
  },
  {
    levelNumber: 5,
    levelName: "Escape, Part VI: The Portal Control Console",
    brief: "Good job eliminating that genetic miscreant. Clearly there is much perverted science going on in this foul place. Your only hope now is to activate an interdimensional portal - probably by hopping on some more glowing terminals - then use it to escape and continue the fight. Good luck, young raptor!",
    achievementStatement: "* DIMENSIONAL PORTAL IST OPENINGK. PLEASE STAND CLEAR *",
    objectives: [
      [
        "Activate Temporal Distortion Matrix by jumping on it",
        "* PANEL ACTIVATED. BLOOP BLEEP. *",
        "position",
        [14, 66],
        1,
      ],
      [
        "Configure Quantum Flux Generator (just hop on the damn panel)",
        "",
        "position",
        [35, 78],
        1,
      ],
    ],
    setupInstructions: [
      ['remove-block', [41, 50]],  // Boss cage doors
      ['remove-block', [23, 57]],
      ['remove-block', [14, 50]],
      ['remove-block', [38, 49]],  // Boss cage floors
      ['remove-block', [39, 49]],
      ['remove-block', [32, 41]],  // Elevator shaft right-hand side entrance
      [
        'add-baddies',
        [
          [3, 57, 1004, 1033, [3, 26]],   // Stairs immediately left of the boss cage
          [15, 65, 1003, 1034, [13, 15]], // First terminal panel
          [29, 68, 1004, 1035, [24, 29]], // Above boss cage
          [28, 68, 1002, 1036, [21, 28]], // Above boss cage
          [37, 77, 1003, 1037, [31, 37]],  // By second terminal
          [36, 77, 1002, 1038, [31, 36]]  // By second terminal
        ]
      ],
      [
        "add-item", // Far side of the elevator
        [
          25, 40, {type: "experience", power: 7, duration: 0}
        ]
      ],
      [
        "add-item", // Room under guard tower (near elevator)
        [
          48, 41, {type: "health", power: 1, duration: 0}
        ]
      ],
      [
        "add-item", // Under the pipe
        [
          94, 53, {type: "experience", power: 7, duration: 0}
        ]
      ],
    ],
    specialFX: null,
    dialogue: {
      player: [
        {
          id: 28,
          text: "Got to activate both terminals first!",
          type: "thought",
          repeating: false,
          condition: ["position", 8, 103],
          duration: 60
        },
      ],
      baddie_1033: [
        {
          id: 29,
          text: "Die, dino scum!!!",
          type: "speech",
          repeating: false,
          condition: ["position", 4],
          duration: 60
        },
      ],
      baddie_1034: [
        {
          id: 30,
          text: "Stay away from ze terminal!",
          type: "speech",
          repeating: false,
          condition: ["position", 14],
          duration: 60
        },
      ],
      baddie_1037: [
        {
          id: 31,
          text: "STOP HIM!!!",
          type: "speech",
          repeating: false,
          condition: ["position", 36],
          duration: 60
        },
      ],
    }
  },
  {
    levelNumber: 6,
    levelName: "Escape, Part VII: The Portal",
    brief: "That's it, you've opened the portal! There's still a lot raptors have yet to learn about astrophysics, but given the circumstances you might just have to take your chances. Good luck, and please let us know how it goes",
    achievementStatement: "* DIMENSIONAL PORTAL IST OPENINGK. PLEASE STAND CLEAR *",
    objectives: [
      [
        "Get to ze portal!!",
        "",
        "position",
        [8, 103],
        1,
      ],
    ],
    setupInstructions: [
      ['remove-block', [14, 65]], // De-render green consoles
      ['remove-block', [35, 77]],
      [
        'create-block',           // Render red ones in their place
        [
          [14, 65], 
          740,
        ]
      ],
      [
        'create-block', 
        [
          [35, 77], 
          740,
        ]
      ],
      [
        'create-block',          // Render the portal
        [
          [8, 103], 
          989,
        ]
      ],
      [
        'add-baddies',
        [
          [16, 101, 1003, 1039, [14, 16]],
        ]
      ]
    ],
    specialFX: null,
    dialogue: {
      player: [
        {
          id: 32,
          text: "*Gulp* Here we go!",
          type: "thought",
          repeating: false,
          condition: ["position", 9, 99],
          duration: 40
        },
        {
          id: 33,
          text: "*Gulp* Here we go!",
          type: "thought",
          repeating: false,
          condition: ["position", 7, 99],
          duration: 40
        },
      ],
      baddie_1039: [
        {
          id: 34,
          text: "Stop, you fool!",
          type: "speech",
          repeating: false,
          condition: ["position", 14],
          duration: 60
        },
      ],
    }
  },
  {
    levelNumber: 7,
    levelName: 'The Forest of Eternity',
    brief: "Oh no, trapped for all eternity!",
    achievementStatement: "",
    objectives: [
      [
        'Wait for the release of version 1.5.3 in roughly another year.',
        '',
        'position',
        [-1000, 1000],
        1000
      ]
    ],
    setupInstructions: [
      ['clear-stage'],
      ['clear-baddies'],
      ['update-player-respawn', [3, 30]],
      ['reset-stage', [purgatory, purgatory]],
    ],  
    specialFX: null,
    dialogue: {
      player: [
        {
          id: 35,
          text: "Uh oh...",
          type: "thought",
          repeating: false,
          condition: ["position", 30],
          duration: 40
        },
        {
          id: 36,
          text: "Oh no, I'm in the dev sandbox!",
          type: "thought",
          repeating: false,
          condition: ["position", 90],
          duration: 50
        },
        {
          id: 37,
          text: "Is this purgatory?",
          type: "thought",
          repeating: false,
          condition: ["position", -60],
          duration: 50
        },
        {
          id: 38,
          text: "Uh oh...",
          type: "thought",
          repeating: false,
          condition: ["position", -30],
          duration: 40
        },
        {
          id: 39,
          text: "Thanks for playing. Now get back to work!!",
          type: "thought",
          repeating: false,
          condition: ["position", 3, 30],
          duration: 120
        },
      ],
    }
  },
]; // end of missions list
