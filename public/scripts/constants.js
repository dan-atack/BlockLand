// This file is for universal constants: few global variables that affect the fundamental physics of our little world:

// Start out by defining links to the index file:

const universe = document.querySelector('body');

// Toggle switch for server functionality AKA DEV MODE:
const DEV_MODE = true;

// World Constraints: Establishing the maximum size of the entire world, in terms of width in columns,
// spreading in either direction of the initial game screen:

let WORLD_WIDTH = 70;

// For the moment, ALL universal physical constants must be exponents of two, unless you wanna see some REALLY crazy shit...

const gravity = 0.0625;
const airFriction = 0.0078125;
const iceFriction = 0.015625;
const waterFriction = 0.0625;
const landFriction = 0.125;
const terminalVelocity = 1;
const minimumVelocity = 0.03125;        // AKA one pixel's fraction of the screen, as a fraction of the standard block's height

// Display area constants: establishing the width of the world that is visible on the screen:
// Player and block sprite size will be determined first, and the world (screen) will be sized based on their dimensions.
const BLOCK_WIDTH = 32;
const PLAYER_WIDTH = 32;
const BOSS_WIDTH = 64;
// TODO: Further incorporate the game's logic with SCSS so that these variables are determined by a user's screen size:
const SCREEN_WIDTH_IN_BLOCKS = 21;
const SCREEN_HEIGHT_IN_BLOCKS = 20;
const SCREEN_WIDTH = SCREEN_WIDTH_IN_BLOCKS * BLOCK_WIDTH;
const SCREEN_HEIGHT = SCREEN_HEIGHT_IN_BLOCKS * BLOCK_WIDTH;

// Server-side stuff: Have a Current User to keep track of the player's progress:

let CURRENT_USER = '';
