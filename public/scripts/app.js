// The App Class will be the central controller for all things in our little UNIVERSE.
// Essentially the App is a series of methods for rendering html elements for the various UIs that make up the game:

class App {
    constructor() {
        this.currentUI = '';
        this.currentUIElements = [];
        this.engine = null;
    }

    showPreGameMenu = () => {
        this.deRenderCurrentUI();
        this.renderPreGameMenu();
        this.currentUI = "Pre-Game Menu";
    }

    startGame = () => {
        // Get rid of previous UI and set to game world:
        this.deRenderCurrentUI();
        // Render world and sidebar, then create Engine:
        this.renderWorld();
        this.renderSidebar();
        this.engine = new Engine(universe);
        // Engine start sequence:
        this.engine.blocks.biomeBuilder(range(0, SCREEN_WIDTH / PLAYER_WIDTH - 1));
        this.engine.gameOn = true;
        this.engine.player.render()
        // document.getElementById('pauseButton').style.display = 'initial';
        this.engine.clockRunning();
        // Player movement responders:
        document.addEventListener('keydown', this.engine.player.handlePlayerKeydowns);
        document.addEventListener('keyup', this.engine.player.handlePlayerKeyups);
        // RESET BUTTON: ONLY VISIBLE ON PLAYER DEATH:
        document.getElementById('resetButton').style.display = 'none';
    }

    // Basic Render Methods for Individual Elements:

    // For general-purpose elements <==== (pronounced 'divs' hahaha):
    // id = unique string name of element, type = string, parent = variable name of parent element
    // className and specialClassName are strings in which additional classnames can be added (empty by default):
    renderElement = (id, type, className, root, specialClassName = '') => {
        // A temporary variable is created to refer to newly created element:
        const element = new Element(root, id, type, className, specialClassName)
        this.currentUIElements.push(element);   // this will let us use document.getElementById to refer to the element later on.
    }

    // We need different parameters to render buttons, so this is its own method:
    renderButton = (id, className, text, parent, handler) => {
        // By placing the document reference here, we can use a string to provide a button's root:
        const root = document.getElementById(parent);
        const button = new Button(root, id, className, text, handler);
        this.currentUIElements.push(button);
    }

    renderText = (parent, x, y, fontSize, text, className = 'text') => {
        const root = document.getElementById(parent);
        const element = new Text(root, x, y, fontSize, text, className);
        this.currentUIElements.push(element);
    }

    // Takes a button element's id (string) and associates it with a handler function on mouseup:
    addButtonEventListener = (buttonId, handler) => {
        const button = document.getElementById(buttonId);
        button.addEventListener('mouseup', handler);
    }

    // De-render button: Goes through the entire list of currently rendered elements and removes them:
    deRenderCurrentUI = () => {
        this.currentUIElements.forEach((element) => {
            element.deRender();
        })
        this.currentUIElements = [];
    }

    // Composite rendering methods (to reproduce whole sections of the UI out of individual elements):

    renderWorld = () => {
        this.currentUI = 'Game World';
        this.renderElement('world', 'div', 'world', universe);
        this.renderElement('background', 'div', 'background', document.getElementById('world'));
    }

    renderSidebar = () => {
        this.renderElement('sidebar', 'div', 'sidebar-container', universe);
        this.renderElement('sidebar-top', 'div', 'sidebar', document.getElementById('sidebar'), 'top');
        this.renderElement('userName', 'span', 'username', document.getElementById('sidebar-top'));
        this.renderButton('logout', 'logout', 'Logout', 'sidebar-top', handleLogout);
        this.renderElement('clock', 'span', 'sidebar', document.getElementById('sidebar'), 'clock');
        this.renderButton('pauseButton', 'sidebar-button', 'Pause', 'sidebar', this.pauseButtonHandler);
        this.renderButton('inGameMenuButton', 'sidebar-button', 'MENU', 'sidebar', this.inGameMenuHandler);
        // this.renderElement('missionBar', 'span', 'sidebar', document.getElementById('sidebar'));
        this.renderElement('playerCoords', 'span', 'sidebar', document.getElementById('sidebar'));
        this.renderElement('playerXP', 'span', 'sidebar', document.getElementById('sidebar'));
        this.renderElement('playerStandingOnBlockType', 'span', 'sidebar', document.getElementById('sidebar'));
        this.renderElement('playerStandingInMedium', 'span', 'sidebar', document.getElementById('sidebar'));
        this.renderElement('sidebar-bottom', 'div', 'sidebar', document.getElementById('sidebar'), 'bottom');
        this.renderButton('resetButton', 'sidebar-button', 'RESTART', 'sidebar-bottom', this.resetButtonHandler);
    }

    renderPreGameMenu = () => {
        this.currentUI = 'Pre-Game Menu';
        this.renderElement('mainMenu', 'div', 'main-menu', universe);
        this.renderText('mainMenu', 0, 0, 48, "BlockLand: The Main Menu", 'intro-shine');
        this.renderButton('startGame', 'menu-button', 'Start New Game', 'mainMenu', this.startButtonHandler);
        this.renderButton('loadGame', 'menu-button', 'Load Saved Game', 'mainMenu', this.startButtonHandler);
        this.renderButton('instructionsButton', 'menu-button', 'Instructions', 'mainMenu', this.instructionsButtonHandler);
        this.renderButton('backstory', 'menu-button', 'Background Story', 'mainMenu', this.backstoryButtonHandler);
    }

    renderInstructionsPage = () => {
        this.currentUI = 'Instructions Page';
        this.renderElement('instructionsPage', 'div', 'main-menu', universe);
        this.renderText('instructionsPage', 0, 0, 42, "BlockLand: The Instructions", 'intro-shine');
        this.renderText(
            'instructionsPage', 
            0, 
            0, 
            24, 
            "MOVEMENT: WASD or Arrow Keys.\n S (Down-Arrow) lets you crouch, but it's mostly for show.",
            );
        this.renderText(
            'instructionsPage', 
            0, 
            0, 
            24, 
            "COMBAT: Press the Space bar just before you engage the enemy.\n Turning around halts your attack.",

            );
        this.renderButton('returnToMain', 'menu-button', 'Return to Main', 'instructionsPage', this.showPreGameMenu);
    }

    renderBackstoryPage = () => {
        this.currentUI = 'Backstory Page';
        this.renderElement('backStoryPage', 'div', 'main-menu', universe);
        this.renderText('backStoryPage', 0, 0, 56, 'BLOCKLAND', 'intro-shine');
        this.renderText('backStoryPage', 0, 0, 36, 'AKA Dinosaurs Vs Nazis: the Video Game');
        this.renderText(
            'backStoryPage', 
            0, 
            0, 
            24, 
            "This game takes place one year before the events of the controversial graphic novel, \n and follows the adventures of Y'zzz, a young raptor with an heroic destiny."
            );
        this.renderButton('returnToMain', 'menu-button', 'Return to Main', 'backStoryPage', this.showPreGameMenu);
    }

    renderInGameMenu = () => {
        this.currentUI = 'In-Game Menu';
        this.renderElement('inGameMenu', 'div', 'main-menu', universe);
        this.renderText('inGameMenu', 0, 0, 36, 'BlockLand: The In-Game Menu', 'intro-shine');
        // Display mission briefing and objectives:
        this.renderText('inGameMenu', 0, 1.5, 36, 'Current Mission:');
        this.renderText('inGameMenu', 0, 2, 24, this.engine.mission.brief);
        this.engine.mission.objectivesAchieved.forEach((objective) => {
            this.renderText('inGameMenu', 0, 0, 18, objective.statement, 'menu-achievement')
        });
        this.engine.mission.objectivesRemaining.forEach((objective) => {
            this.renderText('inGameMenu', 0, 0, 18, objective.statement)
        });
        this.renderButton('returnToGame', 'menu-button', 'Resume Game', 'inGameMenu', this.returnToGameHandler);
    }

    // Bug-fix method for displaying the user name:
    updateUserName = () => {
        // Hide the logout button if we're in production mode. If we're in Dev mode, show the user's name:
        if (DEV_MODE) {
            document.getElementById('logout').innerText = `Logged in as ${CURRENT_USER}`;
            document.getElementById('logout').style.display = 'initial';
        } else {
            document.getElementById('logout').style.display = 'none';
        }
    }

    // Definitions for button-handling functions:

    startButtonHandler = () => {
        this.deRenderCurrentUI();
        this.startGame();
    }

    pauseButtonHandler = () => {
        if (this.engine.gameOn) {
            this.engine.gameOn = false;
            document.getElementById('pauseButton').innerText = 'UnPause';
        } else {
            this.engine.gameOn = true;
            document.getElementById('pauseButton').innerText = 'Pause';
        }
    }

    resetButtonHandler = () => {
        if (this.engine.player.isDead) this.engine.handleReset();
    }

    instructionsButtonHandler = () => {
        this.deRenderCurrentUI();
        this.renderInstructionsPage();
    }

    backstoryButtonHandler = () => {
        this.deRenderCurrentUI();
        this.renderBackstoryPage();
    }

    inGameMenuHandler = () => {
        this.engine.gameOn = false;
        // de-render every element from the engine, and remove keyboard movement responders:
        document.removeEventListener('keydown', this.engine.player.handlePlayerKeydowns);
        document.removeEventListener('keyup', this.engine.player.handlePlayerKeyups);
        this.engine.deRenderGameEntities();
        this.deRenderCurrentUI();
        this.renderInGameMenu();
    }

    returnToGameHandler = () => {
        this.deRenderCurrentUI();
        // Render world and sidebar, then create Engine:
        this.renderWorld();
        this.renderSidebar();
        // Update Engine Sidebar element roots:
        this.engine.updateSidebarRoots();
        // Engine start sequence:
        this.engine.reRenderGameEntities(document.getElementById('world'));
        this.engine.gameOn = true;
        // Player movement responders:
        document.addEventListener('keydown', this.engine.player.handlePlayerKeydowns);
        document.addEventListener('keyup', this.engine.player.handlePlayerKeyups);
        // RESET BUTTON: ONLY VISIBLE ON PLAYER DEATH:
        document.getElementById('resetButton').style.display = 'none';
    }

}