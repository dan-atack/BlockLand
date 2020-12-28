class Swatch {
    constructor(root, blockData) {
        this.root = root;
        this.blockData = blockData;
        this.id = blockData.id;
        this.domElement = document.createElement('img');
        if (this.id !== '000') {
            const isGif = blockData.properties.includes('gif');
            isGif ?
            this.domElement.src = `assets/blocks/block${blockData.id}.gif`:
            this.domElement.src = `assets/blocks/block${blockData.id}.png`;
        }
        this.domElement.id = `Swatch-${blockData.id}`;
        this.domElement.classList.add('swatch');
        this.root.appendChild(this.domElement);
        this.domElement.onmouseup = this.handleClick;
        this.justClicked = false;       // Set to true when clicked; Engine will set back to false whenever it checks.
        this.active = false;            // This keeps track of whether this element is currently selected.
    }

    // Basic cleanup sequence:
    deRender = () => {
        this.root.removeChild(this.domElement);
    }

    // When clicked, set this flag to true and the Editor will notice it.
    handleClick = () => {
        this.justClicked = true;
    }

    // Be prepared to have that flag reset.
    setUnclicked = () => {
        this.justClicked = false;
    }

    // If this is the currently selected 'swatch', make it glow a little bit:
    setActive = () => {
        if (!this.active) {
            this.active = true;
            this.domElement.classList.add('selected');
        }
    }

    setInactive = () => {
        if (this.active) {
            this.active = false;
            this.domElement.classList.remove('selected');
        }
    }
}