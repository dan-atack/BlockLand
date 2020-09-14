// This is the Library for mission data

// Note: The missions library will contain an array of Mission Data, which will be the data for the creation of
// mission objects when the game Engine needs to create them. Each object's array should follow the format to create
// this kind of object. Is this DRY as a bone, or what?

// A - This is a template for how the mission data will be arranged when it's imported into a Mission object:
//          {
// idx = 0          missionNumber: 1,
// idx = 1          mission title: "BaconLand"
// idx = 2          brief: "Following the creation of the world, the Designer thought it a good idea to walk to both edges of the world to see if they exist."
// idx = 3          achievementStatement: "You visited both sides, you win a fucking medal.",
// idx = 4          objectives list (objective template example follows mission template):
//              [
// (objective 1)    ["Reach the Rightmost Edge of the world.", "congrats", "position", [25], 1],
// (objective 2)    ["Kill a particular dude.", "congrats", "kill-particular-individual", [1025], 2]
//     ...      ]
// idx = 5          Array with setup instructions for next level (placing objects to be found, for instance) [OPTIONAL]
//              [
// (setup array 1)  ["setup-type A", [detailed instructions (such as coords)], [further instructions (such as block type)]],
// (setup array 2)  ["setup-type B", [detailed instructions (such as which baddie to kill)]],
// (setup array 3)  ["setup-type C", etc.]
//              ],
//
// idx = 6          Special FX cue for next mission (lightning, vibrations, etc.) [OPTIONAL]
//           }

// B - Here is a template for how Objective objects are structured:
//          {
// idx = 0    statement: "Reach the right edge of the world.",
// idx = 1    achievementStatement: "Good job, you've clearly got the *right* stuff!"
// idx = 2    testType: "position",
// idx = 3    coords: [50, 5],
// idx = 4    xpValue: 1
//          }

// C - Here is a template for individual mission setup instructions:
//          {
// idx = 0    type: "add-block",
// idx = 1    detailsList: [
// (detail 1)   [x coordinate, y coordinate]
// (detail 2)   [numerical block ID code]
//            ], [ DETAILS LIST LENGTH VARIES BASED ON THE TYPE OF SETUP ACTION, TO ALLOW FOR MORE COMPLEX INSTRUCTIONS LATER ON]
//          }

// D - Lastly (for now) the blueprint for Special FX cues to play at the start of a mission (now objects for easier readability):
//          {
//            target: variable name of HTML dom element,
//            effect: the string name of the CSS keyframe animation (or effect) to use,
//            duration: time in seconds for the animation to last,
//          }

const missions = [
  // Mission 0 - The Starting Screen:
  [
    0, // 0 - Level Number
    'Intro', // 1 - difficulty, then below: 2 - briefing statement:
    "Following the creation of the world, the Designer thought it a good idea to walk to both edges of the world to see if they exist. Go do that, then we'll think of something more interesting for you.\n\n PS Watch out for those lava tiles and baddies!",
    "Well done, you have visited the world's ends. Your medal is in the mail.", // 3 - achievement statement
    // 4 - objectives array:
    [
      [
        // Objective One:
        'Reach the Rightmost Edge of the world.', // 0 - Objective instructions statement
        "Good job, you've clearly got the *right* stuff!", // 1 - Objective achievement statement
        'position', // 2 - Objective test type
        [30], // 3 - Objective coordinate/s
        1, // 4 - XP value for objective
      ],
      [
        'Reach the Leftmost Edge of the world.',
        'No dinosaur *left* behind!',
        'position',
        [-30],
        1,
      ], // end of second objective
    ], // end of objectives array
    // start of mission setup array
    [
      [
        'add-baddies',
        [
          [world, 17, 9, 1002, 1001, [16, 17]],
          [world, -10, 6, 1001, 1002, [-10, 0]],
        ],
      ],
    ], // 5 - Array with Setup instructions for level (optional)
    'Cue special effects... Where the hell is Milhouse??', // 6 - Special FX cue/s (optional)
  ], // end of mission 0 data
  // Mission 1 - Investigating the Portal:
  [
    1,
    'Finding the Portal',
    'What are you doing over there at the edge?! A portal has mysteriously appeared back near where you started your journey. Go and find it!',
    "My God, it's full of bacon!",
    [
      [
        'Investigate the anomaly at the Center',
        'Whooaaaaa!!',
        'position',
        [0, 7],
        2,
      ],
    ],
    // Special instructions for level setup in form of an array of tuples:
    [
      // Start of first setup instructions tuple:
      [
        // Start of first set of instructions tuple:
        'create-block', // idx = 0 - code word for switch case
        [
          // idx = 1 - array containing coords and block type for 'create-block' switch case in engine
          [0, 7], // create-block idx = 0 - coordinates to target
          989, // create-block idx = 1 - block type to render
        ],
      ], // end of first instructions set
      // Baddie addition instruction template: [0: engine-reducer switch-case code phrase, 1: array of baddie data arrays
      [
        'add-baddies',
        [
          // baddie ranges must be processed by the engine, not given as a range function output here:
          [world, -22, 6, 1002, 1003, [-22, -14]],
          [world, -24, 8, 1002, 1004, [-30, -24]],
          [world, 21, 9, 1001, 1005, [21, 30]],
        ],
      ],
    ], // end of mission setup instructions
    // If there are no special FX cues, simply don't include them.
  ],
  // Mission 2 - BaconLand!
  [
    2,
    'BaconLand',
    "You seem to have fallen through an interdimensional portal. Luckily there seems to be plenty to eat in this universe. Go and touch this world's edges for the sake of science, then brace yourself for what comes next...",
    'Uhhh, so much bacon!',
    [
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
    [
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
          [world, -10, 8, 1002, 1006, [-10, -1]],
          [world, 10, 8, 1002, 1007, [1, 10]],
        ],
      ],
      // [
      //   'contact-server', // NEW! Send a timestamp to the server to announce the player's arrival in a world!
      //   'BaconLand', // Contacting Server takes one argument: The name of the level just reached.
      // ],
    ],
  ],
  // Mission 3 - Escape from Bacon Land:
  [
    3,
    'Escape From BaconLand',
    'As fun as it is in BaconLand, you are now concerned about its long-term effects on your cholesterol levels. Go back to the middle and see if you can find another portal.',
    'Here... We... GO!',
    [
      [
        'Get to ze portal!!!',
        "Ooh, I shouldn't have eaten so much bacon!!",
        'position',
        [-3, 6],
        2,
      ],
    ],
    [['create-block', [[-3, 6], 989]], ['clear-baddies']],
    // Special FX? Vortex?
  ],
  // Mission 4: Guerilla Warfare
  [
    4,
    'Guerilla Warfare',
    "It looks like you're back in your own dimension again, but the area is still crawling with those Nazty creatures. Eliminate them from the sacred forest!!!",
    'Did you feel that rumbling? Sounded like a wall coming down...',
    [
      [
        'Kill all the baddies in the sacred forest',
        'GET SOME!!!',
        'mission-kill-count',
        [11],
        4,
      ],
    ],
    [
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
        'add-baddies',
        [
          [world, -20, 7, 1002, 1008, [-20, -5]],
          [world, -28, 6, 1002, 1009, [-28, -13]],
          [world, -35, 13, 1002, 1010, [-35, -20]],
          [world, -56, 7, 1002, 1012, [-56, -46]],
          [world, -64, 6, 1002, 1013, [-64, -49]],
          [world, -72, 29, 1002, 1014, [-72, -68]],
          [world, -73, 27, 1002, 1015, [-73, -70]],
          [world, -76, 23, 1002, 1016, [-76, -74]],
          [world, -77, 18, 1002, 1017, [-77, -73]],
          [world, -80, 37, 1002, 1019, [-80, -79]],
          [world, -84, 42, 1002, 1020, [-84, -79]],
          [world, -92, 28, 1002, 1021, [-92, -84]],
        ],
      ],
      [
        // Experimental object use to contain special FX instructions (works wonderfully):
        {
          target: world, // Targets must be variables that are already bound to DOM element ID's
          effect: 'rumbling', // Effects must be string names of CSS keyframe animations
          duration: 1.25, // Duration is time (in seconds) to play the animation
        },
      ],
    ],
  ],
  // Mission Five - Fortress:
  [
    5,
    'Fortress',
    "They've sent out a patrol to get you! Whoever these guys are, it's time to take the fight to them. Ambush the patrol, then infiltrate their fortress and kill their chief.",
    'Well it looks like BlockLand is safe... but for how long?',
    [
      [
        'Kill the Nazty scientist',
        "That's for the space-time continuum!",
        'kill-particular-individual',
        [1033],
        10,
      ],
    ],
    [
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
          [world, -44, 13, 1002, 1034, [-80, -44]],
          [world, -45, 12, 1002, 1035, [-80, -45]],
          [world, -46, 11, 1002, 1036, [-80, -46]],
          [world, -47, 11, 1002, 1022, [-80, -47]],
          [world, -48, 10, 1002, 1023, [-80, -48]],
          [world, 6, 10, 1002, 1024, [4, 6]],
          [world, 13, 9, 1002, 1025, [8, 13]],
          [world, 17, 3, 1002, 1037, [14, 17]],
          [world, 22, 9, 1002, 1026, [17, 22]],
          [world, 32, 14, 1002, 1027, [31, 32]],
          [world, 38, 14, 1002, 1028, [36, 38]],
          [world, 42, 11, 1002, 1029, [41, 42]],
          [world, 48, 15, 1002, 1030, [43, 48]],
          [world, 63, 3, 1002, 1031, [59, 63]],
          [world, 78, 22, 1002, 1032, [77, 78]],
          [world, 85, 28, 1002, 1038, [84, 85]],
          [world, 89, 31, 1002, 1039, [88, 89]],
          [world, 88, 11, 1002, 1040, [77, 88]],
          [world, 89, 11, 1002, 1041, [77, 89]],
          [world, 90, 11, 1002, 1042, [77, 90]],
        ],
      ],
      ['add-boss', [world, 98, 30, 1003, 1033, [92, 97]]],
    ],
    [
      {
        target: world,
        effect: 'rumbling',
        duration: 1.25,
      },
    ],
  ],
  [
    6,
    'Ruins',
    'Woo hoo, BlockLaaaanddddd!!!',
    '',
    [['Thank you for Enjoying', 'BlockLand', 'position', [2000], 10000]],
  ],
]; // end of missions list
