// Here we go!

// Game starter trigger: To Start Press Any Key

// const anyKey = (event) => {
//   if (event.code != 0) {
//     // Render start stage AFTER user triggers game start:
//     thomas.blocks.biomeBuilder(range(0, SCREEN_WIDTH / PLAYER_WIDTH - 1));
//     // The game is on when the clock is running, so this is where the show starts:
//     thomas.gameOn = true;
//     // Only time the player's render functions are invoked:
//     thomas.player.render()
//     pauseButton.style.display = 'initial';
//     thomas.clockRunning();
//     // As soon as the game starts, clean up intro message and any key listener:
//     intro.removeDOM();
//     controls.removeDOM();
//     instructions.removeDOM();
//     any.removeDOM();
//     document.removeEventListener('keydown', anyKey);
//     // Toggleable server-related functionality:
    
//   }
// };

// Run area. CAUTION: LIVE CODE FOLLOWS!

// Very first thing the game will do now is to see if you're logged in as a user, and redirect you to the login page if not.

checkUserStatus();

// Then create the app, and have it render the game elements:

const app = new App();

app.startGame();

// hide the logout button if we're in production mode:

if (DEV_MODE) {
  globalElements['userName'].innerText = `Logged in as ${CURRENT_USER}`;
  globalElements['logout'].style.display = 'initial';
} else {
  globalElements['logout'].style.display = 'none';
}

// Start the Engine!

app.engine.blocks.biomeBuilder(range(0, SCREEN_WIDTH / PLAYER_WIDTH - 1));
app.engine.gameOn = true;
app.engine.player.render()
globalElements['pauseButton'].style.display = 'initial';
app.engine.clockRunning();

// Next, call an instance of the game engine so we can refer to and control anything in the world through it:
// Thomas the Game Engine! Get it? I'm sure I'll never come to regret this unconventional naming choice!
// const thomas = new Engine(universe);

// Intro Message:

// let intro = new Text(world, 0, 0, 36, 'WELCOME TO BLOCKLAND!!');
// let controls = new Text(world, 0, 0, 32, 'CONTROLS:');
// let instructions = new Text(
//   world,
//   0,
//   0,
//   32,
//   'Move: Arrow keys \n Attack: Spacebar'
// );
// let any = new Text(world, 0, 0, 32, 'To Start Press the Any Key!');

// Event Listeners activated:

// Game Ignition Switch: Gets removed after first use.
// document.addEventListener('keydown', anyKey);

// Player movement responders:
document.addEventListener('keydown', app.engine.player.handlePlayerKeydowns);
document.addEventListener('keyup', app.engine.player.handlePlayerKeyups);

// Pause Button:
globalElements['pauseButton'].addEventListener('click', () => {
  if (app.engine.gameOn) {
    app.engine.gameOn = false;
    globalElements['pauseButton'].innerText = 'UnPause';
  } else {
    app.engine.gameOn = true;
    globalElements['pauseButton'].innerText = 'Pause';
  }
});

// assign logout button handler function:

globalElements['logout'].addEventListener('click', (event) => {
  handleLogout(event);
})

// RESET BUTTON: ONLY VISIBLE ON PLAYER DEATH:

globalElements['resetButton'].style.display = 'none';

globalElements['resetButton'].addEventListener('click', () => {
  if (app.engine.player.isDead) app.engine.handleReset();
});
