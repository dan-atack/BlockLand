// Run area. CAUTION: LIVE CODE FOLLOWS!

// First there was The App:

const app = new App();

// Then we check the user status:

checkUserStatus(app);

// The App now renders all of the game's HTML elements:

app.startGame();

// Start the Engine!

app.engine.blocks.biomeBuilder(range(0, SCREEN_WIDTH / PLAYER_WIDTH - 1));
app.engine.gameOn = true;
app.engine.player.render()
globalElements['pauseButton'].style.display = 'initial';
app.engine.clockRunning();

// Show user name if dev mode, or hide that field altogether if we're in production:
app.updateUserName();

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