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
    }

    // Basic Render Methods for Individual Elements:

    // For elements already hard-coded into the game's scripts:
    // Constant = name of global variable, type = string, parent = name of parent global variable
    // className and specialClassName are strings in which additional classnames can be added (empty by default):
    renderElement = (constant, type, className, parent, specialClassName = '') => {
        // The constant is reassigned to newly created element:
        constant = document.createElement(type);
        constant.id = `${constant}`;
        constant.classList.add(className);
        if (specialClassName) constant.classList.add(specialClassName);
        parent.appendChild(constant);
        this.currentUIElements.push(constant);
    }

    // For non-hardwired elements (ideally this will be the way of the future):
    // id = unique string name of element, type = string, parent = variable name of parent element
    // className and specialClassName are strings in which additional classnames can be added (empty by default):
    renderNonGlobalElement = (id, type, className, parent, specialClassName = '') => {
        // A local variable is created to refer to newly created element:
        let element = document.createElement(type);
        element.id = id;
        element.classList.add(className);
        if (specialClassName) constant.classList.add(specialClassName);
        parent.appendChild(element);
        this.currentUIElements.push(element);   // this will let us use document.getElementById to refer to the element later on.
    }

    // We need different parameters to render buttons, so this is its own method:
    renderButton = (constant, className, text, parent) => {
        constant = document.createElement('button');
        constant.id = `${constant}`;
        constant.classList.add(className);
        constant.innerText = text;
        constant.onMouseUp = 'logout(event)';
        parent.appendChild(constant);
        this.currentUIElements.push(constant);
    }

    // Composite rendering methods (to reproduce whole sections of the UI out of individual elements):
    
    renderWorld = () => {
        this.renderElement(world, 'div', 'world', universe);
        this.renderNonGlobalElement('background', 'div', 'background', world);
    }

    renderSidebar = () => {
        this.renderElement(sidebar, 'div', 'sidebar-container', universe);
        this.renderNonGlobalElement('sidebar-top', 'div', 'sidebar', sidebar, 'top');
        this.renderElement(userName, 'span', 'username', document.getElementById('sidebar-top'));
        this.renderButton(logout, 'logout', 'Logout', document.getElementById('sidebar-top'));
        this.renderElement(clock, 'span', 'sidebar', sidebar, 'clock');
        this.renderButton(pauseButton, 'sidebar-button', 'Pause', sidebar);
        this.renderElement(missionBar, 'span', 'sidebar', sidebar);
        this.renderElement(playerCoords, 'span', 'sidebar', sidebar);
        this.renderElement(playerXP, 'span', 'sidebar', sidebar);
        this.renderElement(playerStandingOnBlockType, 'span', 'sidebar', sidebar);
        this.renderElement(playerStandingInMedium, 'span', 'sidebar', sidebar);
        this.renderNonGlobalElement('sidebar-bottom', 'div', 'sidebar', sidebar, 'bottom');
        this.renderButton(resetButton, 'sidebar-button', 'RESTART', document.getElementById('sidebar-bottom'));
    }
}