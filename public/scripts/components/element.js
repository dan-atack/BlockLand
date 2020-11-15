class Element {
    constructor(root, id, type, className, specialClassName = '') {
        this.root = root;
        this.domElement = document.createElement(type);
        this.domElement.id = id;
        this.domElement.classList.add(className);
        if (specialClassName) this.domElement.classList.add(specialClassName);
        this.root.appendChild(this.domElement);
    }

    render() {
        this.root.appendChild(this.domElement);
    }

    deRender() {
        this.root.removeChild(this.domElement);
    }
}