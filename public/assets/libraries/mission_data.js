// This is the Library for mission data

// Note: The missions library will contain an array of Mission Data, which will be the data for the creation of
// mission objects when the game Engine needs to create them. Each object's array should follow the format to create
// this kind of object.

// A - Copyable Object Template:
// {
//   levelNumber: null,
//   levelName: null,
//   brief: null,
//   achievementStatement: null,
//   objectives: [],
//   setupInstructions: null,
//   specialFX: null,
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
// },

// C - Here is a template for individual mission setup instructions:
//          {
// idx = 0    type: "add-block",
// idx = 1    detailsList: [
// (detail 1)   [x coordinate, y coordinate]
// (detail 2)   [numerical block ID code]
//            ], [ DETAILS LIST LENGTH VARIES BASED ON THE TYPE OF SETUP ACTION, TO ALLOW FOR MORE COMPLEX INSTRUCTIONS LATER ON]
//          }

// D - Lastly (for now) the blueprint for Special FX cues to play at the start of a mission (note that these must still be in an array!):
//          {
//            target: variable name of HTML dom element,
//            effect: the string name of the CSS keyframe animation (or effect) to use,
//            duration: time in seconds for the animation to last,
//          }

const missions = [
  // Mission 0 - The Starting Screen:
  {
    levelNumber: 0,
    levelName: 'Intro',
    brief: "Following the creation of the world, the Designer thought it a good idea to walk to both edges of the world to see if they exist. Go do that, then we'll think of something more interesting for you.\n\n PS Watch out for those lava tiles and baddies!",
    achievementStatement: "Well done, you have visited the world's ends. Your medal is in the mail.",
    objectives: [
      [
        // Objective One:
        'Reach the Rightmost Edge of the world.', // 0 - Objective instructions statement
        "Good job, you've clearly got the *right* stuff!", // 1 - Objective achievement statement
        'position', // 2 - Objective test type
        [40], // 3 - Objective coordinate/s
        1, // 4 - XP value for objective
      ],
      [
        // Objective Two:
        'Reach the Leftmost Edge of the world.',
        'No dinosaur *left* behind!',
        'position',
        [-40],
        1,
      ],
    ],
    setupInstructions: [
      [   // Instruction 1:
        'add-baddies',
        [
          // The New Way (?):
          // {
          //   xStart: 17,
          //   yStart: 10,
          //   baddieType: 1002,
          //   baddieSerial: 1001,
          //   xRange: [16, 17],
          //   hitpoints: 10
          // },
          [ 18, 10, 1002, 1001, [16, 18]],
          [ -10, 7, 1001, 1002, [-10, 0]],
        ],
      ],  // End of instruction 1
      [
        'add-item',
        [ // x, y, [item type, power, duration] this list is the 'item data' and is passed as-is to the item constructor:
          -18, 11, {type: 'steroids', power: 0.2, duration: 100}
        ]
      ],
      [
        'add-item',
        [
          39, 13, {type: 'health', power: 2, duration: 0}
        ]
      ],
      [
        'add-item',
        [
          -40, 10, {type: 'steroids', power: 0.2, duration: 100}
        ]
      ]
    ],
    
    specialFX: null
  },
  {
    levelNumber: 1,
    levelName: 'Finding the Portal',
    brief: 'What are you doing over there at the edge?! A portal has mysteriously appeared back near where you started your journey. Go and find it!',
    achievementStatement: "My God, it's full of bacon!",
    objectives: [
      [
        'Investigate the anomaly at the Center',
        'Whooaaaaa!!',
        'position',
        [5, 14],
        2,
      ],
    ],
    setupInstructions: [
      [
        // Start of first set of instructions tuple:
        'create-block', // idx = 0 - code word for switch case
        [
          // idx = 1 - array containing coords and block type for 'create-block' switch case in engine
          [5, 14], // create-block idx = 0 - coordinates to target
          989, // create-block idx = 1 - block type to render
        ],
      ], // end of first instructions set
      // Baddie addition instruction template: [0: engine-reducer switch-case code phrase, 1: array of baddie data arrays
      [
        'add-baddies',
        [
          // baddie ranges must be processed by the engine, not given as a range function output here:
          [ -19, 12, 1002, 1003, [-19, -14]],
          [ -29, 10, 1002, 1004, [-36, -29]],
          [ 22, 9, 1001, 1005, [22, 34]],
        ],
      ],
      [
        'add-item',
        [
          -2, 11, {type: 'experience', power: 5, duration: 0}
        ]
      ],
      ['update-player-respawn', [4, 7]],
    ],
    specialFX: null,
  },
  {
    levelNumber: 2,
    levelName: 'BaconLand',
    brief: "You seem to have fallen through an interdimensional portal. Luckily there seems to be plenty to eat in this universe. Go and touch this world's edges for the sake of science, then brace yourself for what comes next...",
    achievementStatement: 'Uhhh, so much bacon!',
    objectives: [
      [
        'Visit the right side of this new universe.',
        "It's bacon all the way down!",
        'position',
        [18],
        1,
      ],
      [
        'Visit the left side of this new universe.',
        "It's bacon all the way down!",
        'position',
        [-18],
        1,
      ],
    ],
    setupInstructions: [
      ['clear-items'], // tells the engine to tidy up any leftover items from the previous world
      ['remove-block', [0, 7]],
      [
        'clear-stage', // clear stage setup instruction tells all the columns to wipe clear,
      ],
      [
        'reset-stage', // reset stage will run biome builder with a biome of one's choice:
        [
          baconLandRight, // idx 0: select biome for the right
          baconLandLeft, // idx 1: select biome for the left
          [0, SCREEN_WIDTH_IN_BLOCKS], // idx 2: column start/stop values for newly rendered terrain
        ],
      ],
      [
        'set-world-width', // set-world-width will alter the world width to make levels wider or tighter
        18, // one argument only: the new world width for the global variable
      ],
      // Clear remaining baddies from the previous world (make sure to do this BEFORE adding new baddies to the current level!)
      ['clear-baddies'],
      [
        'add-baddies',
        [
          [ -10, 8, 1002, 1006, [-10, -1]],
          [ 10, 8, 1002, 1007, [1, 10]],
        ],
      ],
      ['update-player-respawn', [0, 11]],
    ],
    specialFX: null,
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
        'add-baddies',
        [
          [ -20, 7, 1002, 1008, [-20, -5]],
          [ -28, 6, 1002, 1009, [-28, -13]],
          [ -35, 13, 1002, 1010, [-35, -20]],
          [ -56, 7, 1002, 1012, [-56, -46]],
          [ -64, 6, 1002, 1013, [-64, -49]],
          [ -72, 29, 1002, 1014, [-72, -68]],
          [ -73, 27, 1002, 1015, [-73, -70]],
          [ -76, 23, 1002, 1016, [-76, -74]],
          [ -77, 18, 1002, 1017, [-77, -73]],
          [ -80, 37, 1002, 1019, [-80, -79]],
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
          [ -47, 11, 1002, 1036, [-80, -46]],
          [ -48, 11, 1002, 1022, [-80, -47]],
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
    ]
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
