class Swatch {
    constructor(root, blockData) {
        this.root = root;
        this.blockData = blockData;
        this.id = blockData.id;
        this.domElement = document.createElement('img');
        const isGif = blockData.properties.includes('gif');
        isGif ?
        this.domElement.src = `assets/blocks/block${blockData.id}.gif`:
        this.domElement.src = `assets/blocks/block${blockData.id}.png`;
        if (blockData.id === '000') this.domElement.src = '';       // There is no image for the air
        this.domElement.id = `Swatch-${blockData.id}`;
        this.domElement.classList.add('swatch');
        this.root.appendChild(this.domElement);
        this.domElement.onmouseup = this.handleClick;
        this.justClicked = false;       // Set to true when clicked; Engine will set back to false whenever it checks.
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
}