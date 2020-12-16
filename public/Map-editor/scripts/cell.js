// The proto-block; an empty cell for the Editor to control.

class Cell {
    constructor(root, x, y, width=16, horizontalOffset=0, verticalOffset=0) {
        this.root = root;
        this.x = x;
        this.y = y;
        this.width = width;
        this.horizontalOffset = horizontalOffset;
        this.verticalOffset = verticalOffset;
        this.type = 0;
        this.paletteType = blocktionary[1];       // This value will be updated by the Editor whenever you choose a new block type.
        this.id = `${x},${y}`;
        this.domElement = document.createElement('img');
        this.domElement.classList.add('cell');
        this.domElement.style.left = `${(this.x - this.horizontalOffset) * this.width}px`;
        this.domElement.style.bottom = `${(this.y - this.verticalOffset) * this.width}px`;
        this.domElement.id = `${x},${y}`;   // Absolute position info lives here.
        this.domElement.onclick = this.handleClick;
        this.root.appendChild(this.domElement);
    }

    // When clicked, a cell is 'painted' with the Editor's palette type
    handleClick = () => {
        const isGif = this.paletteType.properties.includes('gif');
        isGif ?
        this.domElement.src = `assets/blocks/block${this.paletteType.id}.gif`:
        this.domElement.src = `assets/blocks/block${this.paletteType.id}.png`;
        this.type = this.paletteType.id;
    }

    // The Editor calls this method to update the blockType (integer) for the clicker function:
    setPalette = (type) => {
        this.paletteType = type;
    }

    deRender = () => {
        this.root.removeChild(this.domElement);
    }
}