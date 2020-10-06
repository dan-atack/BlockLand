// The App Class will be the central controller for all things in our little UNIVERSE:

class App {
    // Both root and currentUI will have default starting values, since they are predictable:
    constructor(root = document, currentUI = 'PreGameMenu') {
        this.root = root;
        this.currentUI = currentUI;
    }
}