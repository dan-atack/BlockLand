// Behold, the mighty Editor Class - Creator of Worlds!!!

class Editor {
    constructor(stage, palette, controlPanel, height=35, width=42) {
        this.stage = stage;
        this.palette = palette;
        this.controlPanel = controlPanel;
        this.height = height;
        this.width = width;             // Defined in terms of blocks, of course.
        this.currentBlock = 1;          // This will eventually be alterable by clicking different block types in the palette.
        this.columns = [];              // This is the list containing all the Cell objects
        this.output = [];               // This is the list containing just the block-type (number) of each cell.
        this.blockWidth = 16;           // Yes, eventually even the zoom level should be something adjustable.
        this.horizontalOffset = 0;
        this.verticalOffset = 0;        // Our old friends, lest we should forget about them for even an instant.
        this.stage.addEventListener('click', this.updateCells)    // Every time the stage is clicked, check the cells for updates.
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
    }

    // Take two coordinates and create a grid reference there:
    createCell = (x, y) => {
        const cell = new Cell(this.stage, x, y, this.blockWidth, this.horizontalOffset, this.verticalOffset);
        this.columns[x].push(cell);
        this.output[x].push(0);     // Add an 'empty space' value to the output list.
    }

    // Every time the grid is clicked, update the output report that will be saved as a map file:
    updateCells = () => {
        // Update each entry in the outputter, by going through all the columns:
         this.columns.forEach((col) => {
            col.forEach((cell) => {
                if (cell.type === 1) this.output[cell.x][cell.y] = cell.type;
            })
        })
        // Show how many cells have 'flipped' just as a measure of this thing's effectiveness:
    }

    // Cleaning up is a good habit:
    cleanupUI = () => {
        this.columns.forEach((col) => {
            col.forEach((cell) => cell.deRender());
        })
        this.stage.removeEventListener('click', this.updateCells);
    }
}