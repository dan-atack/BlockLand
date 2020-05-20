// This is the Library for miss

// Note: The missions library will contain an array of Mission Data, which will be the fodder for the creation of 
// mission objects when the game Engine needs to create them. Each object's array should follow the format to create
// this kind of object. Is this DRY as a bone, or what?

// This is a template for how the mission data will be arranged when it's imported into a Mission object:
//          {
// idx = 0          missionNumber: 1,
// idx = 1          difficulty: "easy",
// idx = 2          brief: "Following the creation of the world, the Designer thought it a good idea to walk to both edges of the world to see if they exist."
// idx = 3          achievementStatement: "You visited both sides, you win a fucking medal.",
// idx = 4      [
// (objective 1)    ["Reach the Rightmost Edge of the world.", "congrats", "position", [25], 1],
// (objective 2)    ["Reach the Leftmost Edge of the world.", "congrats", "position", [-25], 1]
//     ...      ]
// idx = 5          Array with setup instructions for next level (placing objects to be found, for instance) [OPTIONAL]
//              [
// (setup array 1)  ["setup-type", [detailed instructions (such as coords)], [further instructions (such as block type)]],
// (setup array 2)  ["setup-type", [detailed instructions (such as leftward columns)], [further instructions]]
//              ]
// 
// idx = 6          NEW! Special FX cue for next mission (lightning, vibrations, etc.) [OPTIONAL]
//           }

// Here is a template for how Objective objects are structured:
//          {
// idx = 0    statement: "Reach the right edge of the world.",
// idx = 1    achievementStatement: "Good job, you've clearly got the *right* stuff!"
// idx = 2    testType: "position",
// idx = 3    coords: [50, 5],
// idx = 4    xpValue: 1
//          }
//

const missions = [
    // That order again: level number, difficulty, briefing statement, Achievement statement, and then a list of arrays containing objective data:
    [
        0,              // 0 - Level Number
        "tutorial",     // 1 - difficulty, then below: 2 - briefing statement:
        "Following the creation of the world, the Designer thought it a good idea to walk to both edges of the world to see if they exist. Go do that, then we'll think of something more interesting for you.\n\n PS Watch out for those lava tiles!", 
        "Well done, you have visited the world\'s ends. Your medal is in the mail.",        // 3 - achievement statement
        // 4 - objectives array:
        [
            [       // Objective One:
                "Reach the Rightmost Edge of the world.",           // 0 - Objective instructions statement
                "Good job, you've clearly got the *right* stuff!",  // 1 - Objective achievement statement
                "position",                                         // 2 - Objective test type
                [30],                                               // 3 - Objective coordinate/s
                1                                                   // 4 - XP value for objective
            ], 
            [
                "Reach the Leftmost Edge of the world.", 
                "No dinosaur *left* behind!", 
                "position", 
                [-30], 
                1
            ]       // end of second objective
        ],      // end of objectives array
                // start of mission setup array
        [["Setup instructions (test)."], ["More instructions (test, test)"]],   // 5 - Array with Setup instructions for level (optional)
        "Cue special effects... Where the hell is Milhouse??"                   // 6 - Special FX cue/s (optional)
    ],      // end of mission 0 data
    [
        1,
        "easy",
        "Now that you have visited the sides, the Designer has chosen to reward you with a very special Golden Egg block. It has been placed somewhere around where you first entered the world. Go and find it!",
        "Excellent! Enjoy the bonus XP. The Designer is now working feverishly to invent something for you to use it on...",
        [
            [
                "Find the Golden Egg and jump on top of it.",
                "OOH SHINY!",
                "position",
                [0, 5],
                3
            ]
        ],
        // Special instructions for level setup in form of an array of tuples:
        // Each tuple has 3 parts: 0 - setup type code, 1 - target location, 2 - targeting details
        [       // Start of setup instructions list
            [       // Start of first set of instructions tuple:
                "create-block",     // idx = 0 - code word for switch case
                [                   // idx = 1 - array containing coords and block type for 'create-block' switch case in engine
                    [0, 4],         // create-block idx = 0 - coordinates to target
                    999             // create-block idx = 1 - block type to render
                ]
            ],              // end of first instructions set
            [
                "sample",
                [
                    ["x", "y"],
                    "xyz"
                ]
            ]           // end of second (dummy) instructions set
        ],           // end of setup instructions
        // No special FX for this mission :(
    ],
    [
        2,
        "easy",
        "Whoa, did you feel that? It sounds like the world just got wider. Better go back to those edges and check them again to make sure no one\'s been tampering with them!",
        "Hmm it seems the world isn\'t as small as we\'d thought. This could have serious implications...",
        [       // objectives
            [       // objective 1
                "Reach the Rightmost edge of the world, again.",
                "You\'re definitely in the *right*.",
                "position",
                [50],
                1
            ],
            [       // objective 2
                "Reach the Leftmost edge of the world, again.",
                "[ERROR - LEFT Pun #44 Not Found]",
                "position",
                [-50],
                1
            ]
        ],
        [       // level setup instructions list opener
            [       // first instructions set opens
                "add-columns",          // idx = 0 - codeword for engine switch case
                [                       // idx = 1 - list of arrays for left/rightward expansion (to allow different expansion in each direction)
                    [31, 50],           // add-columns idx = 0 - rightward columns to add: idx 0 is start, idx 1 is stop
                    [-31, -50]          // add-columns idx = 1 - leftward columns to add: idx 0 is start, idx 1 is stop
                ]
            ]
        ],
        [                       // Special FX cues come in a 3-part tuple:
            world,              // idx = 0 - the target dom element for special FX
            'rumbling',         // idx = 1 - the class name to be temporarily added to said dom element
            1.25                // idx = 2 - the duration, in seconds, of the effect (will also be used to determine pause break duration)
        ]
    ],
    [
        3,
        "easy",
        "There seems to be some strange cosmic phenomena going down in this universe. Better get back to the Center again and maybe try to hide under that Golden Egg... if it\'s still there...",
        "My God, it\'s full of bacon!",
        [
            [
                "Investigate the anomaly at the Center",
                "",
                "position",
                [5, 7],
                1
            ]
        ],
        [
            [
                "create-block",
                [
                    [5, 7],
                    989
                ]
            ],
            [
                "remove-block",     // create-block will require only one further bit of info: the coordinates of the block to remove:
                [0, 4]
            ]
        ],
        // "cue dissolve/end of the world FX"
    ],
    [
        4,
        "easy",
        "You seem to have fallen through an interdimensional portal. Luckily there seems to be plenty to eat in this universe. Go and touch this world\'s edges just for old times\' sake, then brace yourself for what comes next...",
        "Thanks for playing BlockLand version 0.2. See you soon in BlockLand 0.3: Blockmageddon!",
        [
            [
                "Visit the right side of this new universe.",
                "It\'s bacon all the way down!",
                "position",
                [18],
                1
            ],
            [
                "Visit the left side of this new universe.",
                "It\'s bacon all the way down!",
                "position",
                [-18],
                1
            ]
        ],
        [
            [
                "clear-stage",          // clear stage setup instruction tells all the columns to wipe clear,
            ],
            [
                "reset-stage",          // reset stage will run biome builder with a biome of one's choice:
                [
                    baconLandRight,          // idx 0: select biome for the right
                    baconLandLeft,           // idx 1: select biome for the left
                    [0, 8],                 // idx 2: coords to render
                ]
            ],
            [
                "set-world-width",       // set-world-width will alter the world width to make levels wider or tighter
                18                      // one argument only: the new world width for the global variable
            ],
            [
                "contact-server",        // NEW! Send a timestamp to the server to announce the player's arrival in a world!
                "BaconLand"             // Contacting Server takes one argument: The name of the level just reached.
            ]
        ]
    ],
    [
        5,
        "sandbox",
        "There are no more missions. Feel free to run around though; social isolation is a terrible bore and the blocks don\'t judge, they just love.",
        "",
        [
            "Frolic",
            "",
            "position",
            [99],
            0
        ]
    ]
];       // end of missions list