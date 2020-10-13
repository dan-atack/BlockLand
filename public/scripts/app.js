// The App Class will be the central controller for all things in our little UNIVERSE:

class App {
    // Both root and currentUI will have default starting values, since they are predictable:
    constructor() {
        this.currentUI = '';
        this.currentUIElements = [];
        this.engine = null;
    }

    startGame = () => {
        // De-render menu
        this.renderWorld();
        this.renderSidebar();
        this.engine = new Engine(universe);
        this.currentUI = 'Game World';
    }

    // Basic Render Methods for Individual Elements:

    // For elements already hard-coded into the game's scripts:
    // Constant = name of global variable, type = string, parent = name of parent global variable
    // className and specialClassName are strings in which additional classnames can be added (empty by default):
    renderElement = (constant, id, type, className, parent, specialClassName = '') => {
        // The constant is reassigned to newly created element:
        const temp = document.createElement(type);
        temp.id = id;
        temp.classList.add(className);
        if (specialClassName) temp.classList.add(specialClassName);
        parent.appendChild(temp);
        // Reassign global variable?
        globalElements[id] = temp;
        this.currentUIElements.push(globalElements[id]); 
    }

    // For non-hardwired elements (ideally this will be the way of the future):
    // id = unique string name of element, type = string, parent = variable name of parent element
    // className and specialClassName are strings in which additional classnames can be added (empty by default):
    renderNonGlobalElement = (id, type, className, parent, specialClassName = '') => {
        // A local variable is created to refer to newly created element:
        let element = document.createElement(type);
        element.id = id;
        element.classList.add(className);
        if (specialClassName) element.classList.add(specialClassName);
        parent.appendChild(element);
        this.currentUIElements.push(element);   // this will let us use document.getElementById to refer to the element later on.
    }

    // We need different parameters to render buttons, so this is its own method:
    renderButton = (constant, id, className, text, parent) => {
        const temp = document.createElement('button');
        temp.id = `${id}`;
        temp.classList.add(className);
        temp.innerText = text;
        // Buttons will need event listeners assigned to them in the Main file...
        globalElements[id] = temp;
        parent.appendChild(globalElements[id]);
        this.currentUIElements.push(constant);
    }

    // Composite rendering methods (to reproduce whole sections of the UI out of individual elements):

    renderWorld = () => {
        this.renderElement(world, 'world', 'div', 'world', universe);
        this.renderNonGlobalElement('background', 'div', 'background', globalElements['world']);
    }

    renderSidebar = () => {
        this.renderElement(sidebar, 'sidebar', 'div', 'sidebar-container', universe);
        this.renderNonGlobalElement('sidebar-top', 'div', 'sidebar', globalElements['sidebar'], 'top');
        this.renderElement(userName, 'userName', 'span', 'username', document.getElementById('sidebar-top'));
        this.renderButton(logout, 'logout', 'logout', 'Logout', document.getElementById('sidebar-top'));
        this.renderElement(clock, 'clock', 'span', 'sidebar', globalElements['sidebar'], 'clock');
        this.renderButton(pauseButton, 'pauseButton', 'sidebar-button', 'Pause', globalElements['sidebar']);
        this.renderElement(missionBar, 'missionBar', 'span', 'sidebar', globalElements['sidebar']);
        this.renderElement(playerCoords, 'playerCoords', 'span', 'sidebar', globalElements['sidebar']);
        this.renderElement(playerXP, 'playerXP', 'span', 'sidebar', globalElements['sidebar']);
        this.renderElement(playerStandingOnBlockType, 'playerStandingOnBlockType', 'span', 'sidebar', globalElements['sidebar']);
        this.renderElement(playerStandingInMedium, 'playerStandingInMedium', 'span', 'sidebar', globalElements['sidebar']);
        this.renderNonGlobalElement('sidebar-bottom', 'div', 'sidebar', globalElements['sidebar'], 'bottom');
        this.renderButton(resetButton, 'resetButton', 'sidebar-button', 'RESTART', document.getElementById('sidebar-bottom'));
    }
}