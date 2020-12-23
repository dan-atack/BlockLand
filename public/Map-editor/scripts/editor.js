// Behold, the mighty Editor Class - Creator of Worlds!!!

class Editor {
    // Stage, palette, control panel are all straight refs to HTML elements.
    // buttons is an object with the ID's of the four 'pan' buttons, and might someday include the zoom buttons too.
    constructor(stage, palette, controlPanel, buttons, axisLabels, height=34, width=45) {
        this.stage = stage;
        this.palette = palette;
        this.controlPanel = controlPanel;
        // Button components:
        this.panUp = buttons.panUp;
        this.panDown = buttons.panDown;
        this.panRight = buttons.panRight;
        this.panLeft = buttons.panLeft;
        // Button handler function assignments:
        this.panUp.onclick = this.handlePanUp;
        this.panDown.onclick = this.handlePanDown;
        this.panRight.onclick = this.handlePanRight;
        this.panLeft.onclick = this.handlePanLeft;
        // Axis labels:
        this.leftAxisLabel = axisLabels.leftAxisLabel;
        this.rightAxisLabel = axisLabels.rightAxisLabel;
        this.topAxisLabel = axisLabels.topAxisLabel;
        this.bottomAxisLabel = axisLabels.bottomAxisLabel;
        this.height = height;
        this.width = width;             // Defined in terms of blocks, of course.
        this.paletteOptions = [];       // List of all the clickable elements in the palette, for switching your block type.
        this.currentBlock = blocktionary[1];   // This will eventually be alterable by clicking different block types in the palette.
        this.columns = [];              // This is the list containing all the Cell objects
        this.output = [];               // This is the list containing just the block-type (number) of each cell.
        this.blockWidth = 16;           // Yes, eventually even the zoom level should be adjustable.
        this.horizontalOffset = 0;
        this.verticalOffset = 0;        // Our old friends, lest we should forget about them for even an instant.
        this.topAxisLabel.innerText = this.height + this.verticalOffset - 1;        // minus one because of index positions
        this.bottomAxisLabel.innerText = this.verticalOffset;
        this.rightAxisLabel.innerText = this.width + this.horizontalOffset - 1;      // minus one because of index positions
        this.leftAxisLabel.innerText = this.horizontalOffset;
    }

    // SET-UP METHODS:
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
        // Determine whether block should render on creation:
        const horizontal = (x >= this.horizontalOffset && x < this.width + this.horizontalOffset);
        const vertical = (y >= this.verticalOffset && y < this.height + this.verticalOffset);
        if (vertical && horizontal) cell.render();
    }

    // Populate the Palette zone:
    populatePalette = () => {
        blocktionary.forEach((blockObj) => {
            const img = new Swatch(this.palette, blockObj);
            this.paletteOptions.push(img);
        })
        this.palette.addEventListener('click', this.updateSwatch);  // Every time the palette is clicked, check the swatches for updates.
    }

    // UPDATE METHODS:
    // Every time the grid is clicked, update the output report that will be saved as a map file:
    updateCells = () => {
        // Update each entry in the outputter, by going through all the columns:
         this.columns.forEach((col) => {
            col.forEach((cell) => {
                this.output[cell.x][cell.y] = parseInt(cell.type, 10);
            })
        })
    }

    // Every time an option is clicked in the Palette, update EVERY CELL to be ready to paint that block.
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

    // Call this function to update the axis label positions whenever the viewport pans up/down/left/right:
    updateAxisLabels = () => {
        this.topAxisLabel.innerText = this.height + this.verticalOffset - 1;        // minus one because of index positions;
        this.bottomAxisLabel.innerText = this.verticalOffset;
        this.rightAxisLabel.innerText = this.width + this.horizontalOffset - 1;     // minus one because of index positions;
        this.leftAxisLabel.innerText = this.horizontalOffset;
    }

    // CONTROL PANEL BUTTON HANDLERS:
    handlePanUp = () => {
        // Derender bottom element (vertical offset'th) for every column FIRST:
        this.columns.forEach((col) => col[this.verticalOffset].deRender());
        // Then move all remaining cells:
        this.verticalOffset += 1;           // Increase v-offset
        this.columns.forEach((col) => {     // Reposition every cell
            col.forEach((cell) => cell.translateVertical(this.verticalOffset));
        })
        // THEN, check if more cells are needed (if it is our first time moving upwards), and add some if so:
        this.columns.forEach((col, idx) => {        // Check each column individually
            if (col.length < this.verticalOffset + this.height) {
                this.createCell(idx, col.length);
            } else {        // otherwise (if it's not our first time going up) simply rerender the appropriate row:
                if (idx >= this.horizontalOffset && idx < this.horizontalOffset + this.width) {
                    col[this.verticalOffset + this.height - 1].render();
                }
            }
        })
        console.log('panning up');
        this.updateAxisLabels();
    }

    handlePanDown = () => {
        // Do not allow movement below 'level zero':
        if (this.verticalOffset > 0) {
            // Decrease vertical offset BEFORE derendering (because height > column index value)
            this.verticalOffset -= 1;           // Decrease v-offset
            this.columns.forEach((col) => col[this.verticalOffset + this.height].deRender());
            this.columns.forEach((col) => {     // Reposition every cell
                col.forEach((cell) => cell.translateVertical(this.verticalOffset));
            })
            // Then rerender the cells at the bottom (within the proper horizontal range):
            this.columns.forEach((col, idx) => {
                if (idx >= this.horizontalOffset && idx < this.horizontalOffset + this.width) {
                    col[this.verticalOffset].render();
                }
            })
            console.log('panning down');
            this.updateAxisLabels();
        }
    }

    handlePanRight = () => {
        // Derender leftmost column first:
        this.columns[this.horizontalOffset].forEach((cell) => cell.deRender());
        // Then move all remaining cells:
        this.horizontalOffset += 1;              // Increase h-offset
        this.columns.forEach((col) => {         // Reposition every cell
            col.forEach((cell) => cell.translateHorizontal(this.horizontalOffset));
        })
        // THEN, check if more cells are needed (if it is our first time moving to the right), and add some if so:
        if (this.columns.length < this.horizontalOffset + this.width) {
            // Add a new column to both the columns list AND the output list:
            this.columns.push([]);
            this.output.push([]);
            for (let i = 0; i < this.columns[0].length; i++) {  // Take height of column 0 as reference for how many cells to add:
                this.createCell(this.columns.length - 1, i);
            }
        } else {        // otherwise (if it's not our first time going right) simply rerender the appropriate column:
            this.columns[this.width + this.horizontalOffset - 1].forEach((cell) => {
                if (cell.y >= this.verticalOffset && cell.y < this.height + this.verticalOffset) cell.render();
            }) 
        }
        console.log('panning right');
        this.updateAxisLabels();
    }

    handlePanLeft = () => {
        // Only allow if there is a horizontal offset:
        if (this.horizontalOffset > 0) {
            this.horizontalOffset -= 1;
            // De-render rightmost column:
            this.columns[this.horizontalOffset + this.width].forEach((cell) => cell.deRender());
            this.columns.forEach((col) => {         // Shift all columns
                col.forEach((cell) => cell.translateHorizontal(this.horizontalOffset));
            })
            // Rerender leftmost column:
            this.columns[this.horizontalOffset].forEach((cell) => {
                if (cell.y >= this.verticalOffset && cell.y < this.height + this.verticalOffset) cell.render();
            })
            console.log('panning left');
            this.updateAxisLabels();
        }
    }

    // CLOSING METHODS:
    // Cleaning up is a good habit:
    cleanupUI = () => {
        this.columns.forEach((col) => {
            col.forEach((cell) => cell.deRender());
        })
        this.stage.removeEventListener('click', this.updateCells);
        this.palette.removeEventListener('click', this.updateSwatch);
    }
}