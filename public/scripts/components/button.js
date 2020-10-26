class Button {
    // Root = parent html element, id = string, className = string, text = string, handler = function
    constructor(root, id, className, text, handler) {
        this.root = root;
        this.domElement = document.createElement('button');
        this.domElement.id = id;
        this.domElement.classList.add(className);
        this.domElement.innerText = text;
        this.handler = handler;
        this.domElement.onmouseup = this.activate;
        this.root.appendChild(this.domElement);
    }

    activate = () => {
        this.handler();
    }

    deRender = () => {
        this.root.removeChild(this.domElement);
    }
}