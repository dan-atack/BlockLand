// This file is for universal constants: few global variables that affect the fundamental physics of our little world:

// Start out by defining links to the index file:

const universe = document.querySelector('body');
const world = document.getElementById('world');
const sidebar = document.getElementById('sidebar');
const clock = document.getElementById('clock');
const pauseButton = document.getElementById('pause');
const missionBar = document.getElementById('mission-statement');
const playerCoords = document.getElementById('player-coords');
const playerXP = document.getElementById('player-xp');
const playerStandingOnBlockType = document.getElementById('standing-on');
const playerStandingInMedium = document.getElementById('standing-in');
const resetButton = document.getElementById('reset');
const userDisplay = document.getElementById('username');
const logoutButton = document.getElementById('logout');
// Toggle switch for server functionality AKA DEV MODE:
const DEV_MODE = true;
if (!DEV_MODE) {
  // If we are not in the development environment, toggle display of server-related HTML elements:
  userDisplay.style.display = 'none';
  logoutButton.style.display = 'none';
}

// World Constraints: Establishing the maximum size of the entire world, in terms of width in columns,
// spreading in either direction of the initial game screen:

let WORLD_WIDTH = 30;

// For the moment, ALL universal physical constants must be exponents of two, unless you wanna see some REALLY crazy shit...

const gravity = 0.0625;
const airFriction = 0.0078125;
const iceFriction = 0.015625;
const waterFriction = 0.0625;
const landFriction = 0.125;
const terminalVelocity = 1;
const minimumVelocity = 0.03125;

// Display area constants: establishing the width of the world that is visible on the screen:
// The screen is made of pixels, and all the objects within are too, in order for things to act in that 'pseudo-grid' style we love:
const SCREEN_WIDTH = 512;
const SCREEN_HEIGHT = 480;
// Player and block sprites will be exactly 1/9th of the display area's size, to give us that 'pseudo-grid' positioning system:
const BLOCK_WIDTH = 32;
const PLAYER_WIDTH = 32;
const BOSS_WIDTH = 48;

// Server-side stuff: Have a Current User to keep track of the player's progress:

CURRENT_USER = '';
