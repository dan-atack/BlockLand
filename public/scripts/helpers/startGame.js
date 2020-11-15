// This module is the function that runs when the 'Start New Game' button is pressed:

const startGame = (app) => {
    app.deRenderCurrentUI();
    app.renderWorld();
    app.startEngine();
}