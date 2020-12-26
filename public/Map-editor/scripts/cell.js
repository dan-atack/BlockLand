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
        this.domElement.onmousedown = this.handleClick;
        this.rendered = false;      // Start unrendered and be rendered by the Editor:
        this.isClicked = false;     // Low-tech way for the Editor to read if the cell has just been clicked.
    }

    // When clicked, call the Cell Painter function (immediately below) with the current blocktype from the palette:
    handleClick = () => {
        this.paintCell(this.paletteType);
        this.isClicked = true;      // Set the clicked flag to true so the Editor can spot it... Is this a "signal?"
    }

    setUnclicked = () => {
        this.isClicked = false;     // The Engine can call this to reset a Cell's click emitter signal.
    }

    // "Paints" the cell with a certain block type:
    paintCell = (blockType) => {
        if (blockType.id !== '000') {
            const isGif = blockType.properties.includes('gif');
            isGif ?
            this.domElement.src = `assets/blocks/block${blockType.id}.gif`:
            this.domElement.src = `assets/blocks/block${blockType.id}.png`;
            this.type = blockType.id;
        } else {
            // Using an 'air' image as whiteout looks imperfect, but is acceptable for now.
            this.domElement.src='assets/blocks/proto blocks/block000.png';
            this.type = blockType.id;
        }
    }

    // The Editor calls this method to update the blockType (integer) for the clicker function:
    setPalette = (type) => {
        this.paletteType = type;
    }

    // Translation functions:
    translateHorizontal = (offset) => {
        // set offset and then update cell position:
        this.horizontalOffset = offset;
        this.domElement.style.left = `${(this.x - this.horizontalOffset) * this.width}px`;
    }

    translateVertical = (offset) => {
        // set offset and then update cell position:
        this.verticalOffset = offset;
        this.domElement.style.bottom = `${(this.y - this.verticalOffset) * this.width}px`;
    }

    // Basic functions for render/derendering:
    render = () => {
        if (!this.rendered) {
            this.root.appendChild(this.domElement);
            this.rendered = true;
        }
    }

    deRender = () => {
        if (this.rendered) {
            this.root.removeChild(this.domElement);
            this.rendered = false;
        }   
    }
}