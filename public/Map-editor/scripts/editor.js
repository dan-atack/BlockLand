// Behold, the mighty Editor Class - Creator of Worlds!!!

class Editor {
    constructor(stage, palette, controlPanel, height=35, width=42) {
        this.stage = stage;
        this.palette = palette;
        this.controlPanel = controlPanel;
        this.height = height;
        this.width = width;             // Defined in terms of blocks, of course.
        this.paletteOptions = [];       // List of all the clickable elements in the palette, for switching your block type.
        this.currentBlock = '001';          // This will eventually be alterable by clicking different block types in the palette.
        this.columns = [];              // This is the list containing all the Cell objects
        this.output = [];               // This is the list containing just the block-type (number) of each cell.
        this.blockWidth = 16;           // Yes, eventually even the zoom level should be something adjustable.
        this.horizontalOffset = 0;
        this.verticalOffset = 0;        // Our old friends, lest we should forget about them for even an instant.
    }

    // Create the initial stage, and also add columns to keep track of all the cells' block-type values:
    populateInitialStage = () => {
        for (let i = 0; i < this.width; i++) {
            // create empty column before populating it:
            this.columns.push([]);
            this.output.push([]);
            for (let k = 0; k < this.height; k++) {
                this.createCell(i, k);
            }
        }
        this.stage.addEventListener('click', this.updateCells);    // Every time the stage is clicked, check the cells for updates.
    }

    // Take two coordinates and create a grid reference there:
    createCell = (x, y) => {
        const cell = new Cell(this.stage, x, y, this.blockWidth, this.horizontalOffset, this.verticalOffset);
        this.columns[x].push(cell);
        this.output[x].push(0);     // Add an 'empty space' value to the output list.
    }

    // Populate the Palette zone:
    populatePalette = () => {
        blocktionary.forEach((blockObj) => {
            const img = new Swatch(this.palette, blockObj);
            this.paletteOptions.push(img);
        })
        this.palette.addEventListener('click', this.updateSwatch);  // Every time the palette is clicked, check the swatches for updates.
    }

    // Every time the grid is clicked, update the output report that will be saved as a map file:
    updateCells = () => {
        // Update each entry in the outputter, by going through all the columns:
         this.columns.forEach((col) => {
            col.forEach((cell) => {
                if (cell.type != 0) this.output[cell.x][cell.y] = parseInt(cell.type, 10);
            })
        })
    }

    updateSwatch = () => {
        this.paletteOptions.forEach((swatch) => {
            if (swatch.justClicked) this.currentBlock = swatch.blockData;
            swatch.justClicked = false;
            // check if it's just been clicked. If so change the current type. Then... unclick it.
        })
        // Finally, set EVERY SINGLE cell to make that the block of the day... there has got to be a better way to do this...
        this.columns.forEach((col) => {
            col.forEach((cell) => {
                cell.setPalette(this.currentBlock);
            })
        })
        console.log(this.currentBlock.name);
    }

    // Cleaning up is a good habit:
    cleanupUI = () => {
        this.columns.forEach((col) => {
            col.forEach((cell) => cell.deRender());
        })
        this.stage.removeEventListener('click', this.updateCells);
    }
}