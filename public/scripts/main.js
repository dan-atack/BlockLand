// Here we go!

// Game starter trigger: To Start Press Any Key

const anyKey = (event) => {
  if (event.code != 0) {
    // Render start stage AFTER user triggers game start:
    thomas.blocks.biomeBuilder(range(0, SCREEN_WIDTH / PLAYER_WIDTH - 1));
    // The game is on when the clock is running, so this is where the show starts:
    thomas.gameOn = true;
    thomas.player.domElement.style.opacity = '100%';
    pauseButton.style.display = 'initial';
    thomas.clockRunning();
    // As soon as the game starts, clean up intro message and any key listener:
    intro.removeDOM();
    controls.removeDOM();
    instructions.removeDOM();
    any.removeDOM();
    document.removeEventListener('keydown', anyKey);
    // Suspended server-related functionality:
    userDisplay.innerText = `Logged in as ${CURRENT_USER}`;
    logoutButton.style.display = 'initial';
  }
};

// Run area. CAUTION: LIVE CODE FOLLOWS!

// Very first thing the game will do now is to see if you're logged in as a user, and redirect you to the login page if not.

checkUserStatus();
// hide the logout button while this happens:
// logoutButton.style.display = 'none';

// Next, call an instance of the game engine so we can refer to and control anything in the world through it:
// Thomas the Game Engine! Get it? I'm sure I'll never come to regret this unconventional naming choice!
const thomas = new Engine(universe);

// Intro Message:

let intro = new Text(world, 0, 0, 36, 'WELCOME TO BLOCKLAND!!');
let controls = new Text(world, 0, 0, 32, 'CONTROLS:');
let instructions = new Text(
  world,
  0,
  0,
  32,
  'Move: Arrow keys \n Attack: Spacebar'
);
let any = new Text(world, 0, 0, 32, 'To Start Press the Any Key!');

// You start out rendered but invisible, and the pause button isn't visible at all until the game starts:
// Oh shit, or better still -- GHOST MODE?! I'm a genius.
thomas.player.domElement.style.opacity = '1%';
pauseButton.style.display = 'none';

// Event Listeners activated:

// Game Ignition Switch: Gets removed after first use.
document.addEventListener('keydown', anyKey);

// Player movement responders:
document.addEventListener('keydown', thomas.player.handlePlayerKeydowns);
document.addEventListener('keyup', thomas.player.handlePlayerKeyups);

// Pause Button:
pauseButton.addEventListener('click', () => {
  if (thomas.gameOn) {
    thomas.gameOn = false;
    pauseButton.innerText = 'UnPause';
  } else {
    thomas.gameOn = true;
    pauseButton.innerText = 'Pause';
  }
});

// RESET BUTTON: ONLY VISIBLE ON PLAYER DEATH:

resetButton.style.display = 'none';

resetButton.addEventListener('click', () => {
  if (thomas.player.isDead) thomas.handleReset();
});
