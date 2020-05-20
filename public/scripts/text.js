class Text {
    // text constructor needs quite a few arguments depending on which type of text you're rendering, the last of which
    // will be its CSS class so we can do special effects with it:
    constructor(root, x, y, size, text, messageClass = "intro") {
        this.root = root;
        this.domElement = document.createElement("p");
        this.domElement.style.position = "fixed";
        this.domElement.style.left = `${x*64}px`;
        this.domElement.style.bottom = `${y*64}px`;
        this.domElement.style.fontSize = `${size}px`;
        this.domElement.innerText = text;
        this.domElement.classList.add(messageClass);
        this.domElement.style.zIndex = 100;
        root.appendChild(this.domElement);
    }

    removeDOM() {
        this.root.removeChild(this.domElement);
    }
};