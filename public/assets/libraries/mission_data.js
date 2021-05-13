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
    levelNumber: 0,
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
          [ 42, 9, 1002, 1003, [39, 42]],
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
          duration: 40
        },
        {
          id: 1,
          text: "That glowing terminal looks promising...",
          type: "thought",
          repeating: false,
          condition: ["position", 61, 18],
          duration: 30
        },
      ],
      baddie_1001: [
        {
          id: 2,
          text: "Ze specimen ist loose! Get him!",
          type: "speech",
          repeating: false,
          condition: ["position", 22],
          duration: 40,
        },
      ],
      baddie_1002: [
        {
          id: 3,
          text: "Achtung!",
          type: "speech",
          repeating: false,
          condition: ["position", 28],
          duration: 20,
        },
      ],
      baddie_1003: [
        {
          id: 4,
          text: "Did you hear zat?",
          type: "speech",
          repeating: false,
          condition: ["position", 41],
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
          duration: 25,
        },
      ],
      baddie_1005: [
        {
          id: 6,
          text: "Fix bayonets!",
          type: "speech",
          repeating: false,
          condition: ["position", 60],
          duration: 20,
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
        "threshold",
        { directions: ['toTheLeft', 'above'], coords: [9, 15]},
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
          duration: 40
        },
        {
          id: 8,
          text: "That glowing terminal looks promising...",
          type: "thought",
          repeating: false,
          condition: ["position", 61, 18],
          duration: 30
        },
      ],
      baddie_1009: [
        {
          id: 9,
          text: "Don't let it get away!",
          type: "speech",
          repeating: false,
          condition: ["position", 26],
          duration: 40
        },
      ],
      baddie_1011: [
        {
          id: 10,
          text: "Screw bayonets-- LOCK UND LOAD!!",
          type: "speech",
          repeating: false,
          condition: ["position", 28],
          duration: 40
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
        "Find the exit to the geothermal power station (hint: up is good).",
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
        ['remove-block', [38, 37]],
        ['remove-block', [39, 37]],
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
          duration: 40
        },
        {
          id: 12,
          text: "Who designed this place??",
          type: "thought",
          repeating: false,
          condition: ["position", 91, 22],
          duration: 40
        },
        {
          id: 13,
          text: "What spineless jerks!",
          type: "thought",
          repeating: false,
          condition: ["position", 127, 49],
          duration: 40
        },
        {
          id: 14,
          text: "Ooh, nice signage!",
          type: "thought",
          repeating: false,
          condition: ["position", 104, 45],
          duration: 40
        },
      ],
      baddie_1020: [
        {
          id: 15,
          text: "Chzzz! Stay away, vertebrate!",
          type: "speech",
          repeating: false,
          condition: ["position", 133],
          duration: 40
        },
      ],
      baddie_1021: [
        {
          id: 16,
          text: "Protect the shiny!",
          type: "speech",
          repeating: false,
          condition: ["position", 143],
          duration: 40
        },
      ],
    },
  },
  {
    levelNumber: 3,
    levelName: "Escape, Part IV",
    brief: "Just a little bit further! There's some kinda wierd tower up ahead... I dunno, maybe it's possible to activate an interdimensional portal at the top... There's still a lot raptors have yet to learn about astrophysics, but given the circumstances you might just have to take your chances. Good luck buddy, I'm sure you'll think of something!",
    achievementStatement: "* PORTAL IS NOW OPENINGK *",
    objectives: [
      [
        "Activate Power Terminal",
        "Power Terminal Activated.",
        'position',
        [126, 78],
        1,
      ],
      [
        "Activate Temporal Forcefield Terminal",
        "Temporal Forcefield Terminal Activated.",
        'position',
        [105, 78],
        2,
      ],
    ],
    setupInstructions: [
      ["update-player-respawn", [91, 46]],
      ["remove-block", [32, 41]],
      ["remove-block", [26, 40]],
      [
        'create-block', 
        [
          [112, 41], 
          702,
        ]
      ],
      [
        'create-block', 
        [
          [113, 41], 
          702,
        ]
      ],
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
          87, 53, {type: "experience", power: 6, duration: 0}
        ]
      ],
      [
        "add-item", // Under the final tower
        [
          115, 65, {type: "health", power: 1, duration: 0}
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
          [ 111, 76, 1003, 1033, [111, 113]],
          [ 121, 76, 1003, 1034, [118, 121]],
          [ 136, 55, 1005, 1035, [122, 136], 11],
          [ 135, 55, 1005, 1036, [122, 135], 11],
          [ 134, 55, 1005, 1037, [122, 134], 11],
          [ 133, 55, 1005, 1038, [122, 133], 11],
        ]
      ]
    ],
    specialFX: null,
    dialogue: {
      player: [
        {
          id: 17,
          text: "Hmm this place looks familiar...",
          type: "thought",
          repeating: false,
          condition: ["position", 9, 47],
          duration: 40
        },
        {
          id: 18,
          text: "Gotta activate both terminals first...",
          type: "thought",
          repeating: false,
          condition: ["position", 116, 89],
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
          duration: 30
        },
      ],
      baddie_1028: [
        {
          id: 20,
          text: "Kill zat creature!!!",
          type: "speech",
          repeating: false,
          condition: ["position", 65],
          duration: 40
        },
      ],
      baddie_1033: [
        {
          id: 21,
          text: "Don't let it get to ze portal!",
          type: "speech",
          repeating: false,
          condition: ["position", 112],
          duration: 50
        },
      ],
      baddie_1034: [
        {
          id: 22,
          text: "Protect ze terminal!",
          type: "speech",
          repeating: false,
          condition: ["position", 119],
          duration: 50
        },
      ],
      baddie_1038: [
        {
          id: 23,
          text: "Our fight's not with you, dinosaur!",
          type: "speech",
          repeating: false,
          condition: ["position", 130],
          duration: 50
        },
      ],
      baddie_1040: [
        {
          id: 24,
          text: "Leave us alone you jerk!",
          type: "speech",
          repeating: false,
          condition: ["position", 128],
          duration: 50
        },
      ],
    }
  },
  {
    levelNumber: 4,
    levelName: 'The Portal',
    brief: "The portal's open! Quick, jump into it, and hold your breath for whatever comes next...",
    achievementStatement: 'WHHHOOOOOAAAAAAAA!!!!',
    objectives: [
      [
        'Get to ze portal!!',
        '',
        'position',
        [3],
        1,
      ],
    ],
    setupInstructions: [
      ['remove-block', [126, 77]],
      ['remove-block', [105, 77]],
      [
        'create-block', 
        [
          [126, 77], 
          740,
        ]
      ],
      [
        'create-block', 
        [
          [105, 77], 
          740,
        ]
      ],
      [
        'create-block', 
        [
          [3, 49], 
          989,
        ]
      ],
    ],
    specialFX: null,
  },
  {
    levelNumber: 4,
    levelName: 'The Forest of Eternity',
    brief: "Thank you for playing Block Land, soon to be renamed something else to avoid copyright infringement.",
    achievementStatement: "",
    objectives: [
      [
        'Wait for the release of version 1.5.3 in roughly another year.',
        '',
        'position',
        [-1000],
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
          id: 25,
          text: "Uh oh...",
          type: "thought",
          repeating: false,
          condition: ["position", 30],
          duration: 40
        },
        {
          id: 26,
          text: "Oh no, I'm in the dev sandbox!",
          type: "thought",
          repeating: false,
          condition: ["position", 90],
          duration: 50
        },
        {
          id: 27,
          text: "Is this purgatory?",
          type: "thought",
          repeating: false,
          condition: ["position", -60],
          duration: 50
        },
      ],
    }
  },
]; // end of missions list
