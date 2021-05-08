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
          [ 24, 15, 1003, 1001, [18, 24]],  // last number here must never exceed initial x value or baddie might fall off the edge.
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
          [ 31, 15, 1004, 1011, [12, 33]],
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
            41, 22, {type: "experience", power: 2, duration: 0}
          ]
        ],
        [
          "add-item",
          [
            45, 38, {type: "health", power: 1, duration: 0}
          ]
        ],
        [
          "add-item", // In the lava pipe (bonus area)
          [
            88, 21, {type: "experience", power: 5, duration: 0}
          ]
        ],
        [
          "add-item",
          [
            148, 43, {type: "health", power: 2, duration: 0}
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
          text: "That glowing terminal looks promising...",
          type: "thought",
          repeating: false,
          condition: ["position", 61, 18],
          duration: 30
        },
      ],
      baddie_1020: [
        {
          id: 13,
          text: "Chzzz! Stay away, vertebrate!",
          type: "speech",
          repeating: false,
          condition: ["position", 75],
          duration: 40
        },
      ],
      baddie_1021: [
        {
          id: 14,
          text: "Protect the Orb!",
          type: "speech",
          repeating: false,
          condition: ["position", 75],
          duration: 40
        },
      ],
    },
  },
  {
    levelNumber: 3,
    levelName: 'Escape From BaconLand',
    brief: 'As fun as it is in BaconLand, you are now concerned about its long-term effects on your cholesterol levels. Go back to the middle and see if you can find another portal.',
    achievementStatement: 'Here... We... GO!',
    objectives: [
      [
        'Get to ze portal!!!',
        "Ooh, I shouldn't have eaten so much bacon!!",
        'position',
        [-3, 6],
        2,
      ],
    ],
    setupInstructions: [
      [
        'create-block', 
        [
          [-3, 6], 
          989
        ]
      ],
      [
        'clear-baddies'
      ]
    ],
    specialFX: null,
  },
  {
    levelNumber: 4,
    levelName: 'Guerilla Warfare',
    brief: "It looks like you're back in your own dimension again, but the area is still crawling with those Nazty creatures. Eliminate them from the sacred forest!!!",
    achievementStatement: 'Quick! Back across the volcano!',
    objectives: [
      [
        'Kill all the baddies in the sacred forest',
        'GET SOME!!!',
        'mission-kill-count',
        [11],
        4,
      ],
    ],
    setupInstructions: [
      ['clear-stage'],
      [
        'add-columns',
        [
          [31, 107], // This is dodgy - it has to know the PREVIOUS VALUE as well???
          [-31, -107],
        ],
      ],
      ['reset-stage', [fortress, treeForts, [0, SCREEN_WIDTH_IN_BLOCKS]]],
      ['update-player-respawn', [-4, 8]],
      ['set-world-width', 105],
      [
        'add-item',
        [
          -91, 21, {type: 'experience', power: 5, duration: 0}
        ]
      ],
      [
        'add-item',
        [
          -85, 41, {type: 'health', power: 5, duration: 0}
        ]
      ],
      [
        'add-item',
        [
          60, 15, {type: 'health', power: 2, duration: 0}
        ]
      ],
      [
        'add-baddies',
        [
          [ -20, 7, 1004, 1008, [-20, -5]],
          [ -28, 6, 1002, 1009, [-28, -13]],
          [ -35, 13, 1002, 1010, [-35, -20]],
          [ -56, 7, 1004, 1012, [-56, -46]],
          [ -64, 6, 1002, 1013, [-64, -49]],
          [ -72, 29, 1002, 1014, [-72, -68]],
          [ -73, 27, 1004, 1015, [-73, -70]],
          [ -76, 23, 1002, 1016, [-76, -74]],
          [ -77, 18, 1002, 1017, [-77, -73]],
          [ -80, 37, 1004, 1019, [-80, -79]],
          [ -84, 42, 1002, 1020, [-84, -79]],
          [ -92, 28, 1002, 1021, [-92, -84]],
        ],
      ],
    ],
    specialFX: null,
  },
  {
    levelNumber: 5,
    levelName: 'Patrol',
    brief: "They've sent out a patrol to get you! Take them out, then get back across the volcano and find a way into that fortress-looking place on the other side...",
    achievementStatement: "It's open - GET IN THERE!",
    objectives: [
      [
        'Wipe out the patrol and enter the Fortress.',
        '',
        'position',
        [-6],
        1
      ]
    ],
    setupInstructions: [
      ['update-player-respawn', [-81, 42]],
      [
        'add-baddies',
        [
          [ -45, 13, 1002, 1034, [-80, -44]],
          [ -46, 12, 1002, 1035, [-80, -45]],
          [ -47, 11, 1004, 1036, [-80, -46]],
          [ -48, 11, 1004, 1022, [-80, -47]],
          [ -49, 10, 1002, 1023, [-80, -48]],
        ]
      ],
    ],  
    specialFX: null,
  },
  {
    levelNumber: 6,
    levelName: 'Fortress',
    brief: "Infiltrate their fortress and kill the chief scientist dude.",
    achievementStatement: 'Well it looks like BlockLand is safe... but for how long?',
    objectives: [
      [
        'Kill the Nazty scientist',
        "That's for the space-time continuum!",
        'kill-particular-individual',
        [1033],
        10,
      ],
    ],
    setupInstructions: [
      ['update-player-respawn', [-2, 8]],
      ['remove-block', [1, 10]],
      ['remove-block', [1, 9]],
      ['remove-block', [1, 8]],
      ['remove-block', [1, 7]],
      ['remove-block', [1, 6]],
      ['remove-block', [1, 5]],
      ['remove-block', [2, 10]],
      ['remove-block', [0, 10]],
      [
        'add-baddies',
        [
          [ 6, 10, 1002, 1024, [4, 6]],
          [ 13, 9, 1002, 1025, [8, 13]],
          [ 17, 3, 1002, 1037, [14, 17]],
          [ 22, 9, 1002, 1026, [17, 22]],
          [ 32, 14, 1002, 1027, [31, 32]],
          [ 38, 14, 1002, 1028, [36, 38]],
          [ 42, 11, 1002, 1029, [41, 42]],
          [ 48, 15, 1002, 1030, [43, 48]],
          [ 63, 3, 1002, 1031, [59, 63]],
          [ 78, 22, 1002, 1032, [77, 78]],
          [ 85, 28, 1002, 1038, [84, 85]],
          [ 86, 31, 1002, 1039, [85, 86]],
          [ 87, 11, 1002, 1040, [77, 87]],
          [ 88, 11, 1002, 1041, [77, 88]],
          [ 88, 11, 1002, 1042, [77, 88]],
        ],
      ],
      ['add-boss', [ 97, 30, 1003, 1033, [91, 97]]],
    ],
    specialFX:[
      {
        target: 'world',
        effect: 'rumbling',
        duration: 1.25,
      },
    ],
    dialogue: {
      baddie_1033: [
        {
          id: 10,
          text: 'Well well Mister Dinosaur we meet at last!',
          type: 'speech',   // or thought
          repeating: true,
          condition: ['position', 95],   // x coordinate only?
          duration: 50
        },
      ],
    }
  },
  {
    levelNumber: 6,
    levelName: 'Ruins',
    brief: 'Woo hoo, BlockLaaaanddddd!!!',
    achievementStatement: '',
    objectives: [
      ['Thank you for Enjoying', 'BlockLand', 'position', [2000], 10000]
    ],
    setupInstructions: null,
    specialFX: null,
  },
]; // end of missions list
