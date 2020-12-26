// Behold, the mighty Editor Class - Creator of Worlds!!!

class Editor {
    // Stage, palette, control panel are all straight refs to HTML elements.
    // buttons is an object with the ID's of the four 'pan' buttons, and might someday include the zoom buttons too.
    constructor(stage, palette, controlPanel, buttons, inputs, labels, height=34, width=45) {
        // Editor UI Areas:
        this.stage = stage;
        this.palette = palette;
        this.controlPanel = controlPanel;
        // Button components:
        this.panUp = buttons.panUp;
        this.panDown = buttons.panDown;
        this.panRight = buttons.panRight;
        this.panLeft = buttons.panLeft;
        this.palettePrev = buttons.palettePrev;
        this.paletteNext = buttons.paletteNext;
        this.brushSmall = buttons.brushSmall;
        this.brushMedium = buttons.brushMedium;
        this.brushLarge = buttons.brushLarge;
        this.addBedrock = buttons.addBedrock;
        // Input components:
        this.bedrockTopInput = inputs.topLayer;
        this.bedrockBottomInput = inputs.bottomLayer;
        this.bedrockHeightInput = inputs.bedrockHeight;
        // Button handler function assignments:
        this.panUp.onclick = this.handlePanUp;
        this.panDown.onclick = this.handlePanDown;
        this.panRight.onclick = this.handlePanRight;
        this.panLeft.onclick = this.handlePanLeft;
        this.palettePrev.onclick = () => console.log('click');
        this.paletteNext.onclick = () => console.log('click');
        this.brushSmall.onclick = () => this.selectBrush('Small');
        this.brushMedium.onclick = () => this.selectBrush('Medium');
        this.brushLarge.onclick = () => this.selectBrush('Large');
        this.addBedrock.onclick = this.handleAddBedrock;
        // Input handler functions assignments:
        this.bedrockTopInput.onchange = this.handleBedrockTop;
        this.bedrockBottomInput.onchange = this.handleBedrockBottom;
        this.bedrockHeightInput.onchange = this.handleBedrockHeight;
        // Axis labels:
        this.leftAxisLabel = labels.leftAxisLabel;
        this.rightAxisLabel = labels.rightAxisLabel;
        this.topAxisLabel = labels.topAxisLabel;
        this.bottomAxisLabel = labels.bottomAxisLabel;
        this.palettePreview = labels.palettePreview;
        // Palette's Current Block Label:
        this.paletteCurrentBlock = labels.paletteCurrentBlock;
        // General Info:
        this.height = height;
        this.width = width;             // Defined in terms of blocks, of course.
        this.paletteOptions = [];       // List of all the clickable elements in the palette, for switching your block type.
        this.maxPaletteOptions = 64;    // The max amount of block types to show per 'page' on the palette.
        this.currentBlock = blocktionary[1];   // This will eventually be alterable by clicking different block types in the palette.
        this.columns = [];              // This is the list containing all the Cell objects
        this.output = [];               // This is the list containing just the block-type (number) of each cell.
        this.blockWidth = 16;           // Yes, eventually even the zoom level should be adjustable.
        this.horizontalOffset = 0;
        this.verticalOffset = 0;
        // Adjustable properties:
        this.bedrockTop = blocktionary[0];          // Block type for just the top layer of 'bedrock' option.
        this.bedrockBottom = blocktionary[0];       // Block type for the bedrock interior (can have > 1 layer of this).
        this.bedrockHeight = 0;                     // How many rows will the bedrock take up.
        this.currentBrushSelection = 'point';       // Keeps track of which brush shape is selected. Default is 'Small' (1 block).
        this.palettePageNumber = 1;                 // Keeps track of which page you're on in the palette.
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
        // TO DO: Limit to value of maxPaletteOptions per 'page'
        blocktionary.forEach((blockObj) => {
            const img = new Swatch(this.palette, blockObj);
            this.paletteOptions.push(img);
        })
        // Make dirt (the default block type) appear 'active':
        this.paletteOptions[1].setActive();
        this.palette.addEventListener('click', this.updateSwatch);  // Every time the palette is clicked, check the swatches for updates.
    }

    // UPDATE METHODS:
    // Every time the grid is clicked, update the output report that will be saved as a map file:
    updateCells = () => {
        // Update each entry in the outputter, by going through all the columns:
         this.columns.forEach((col) => {
            col.forEach((cell) => {
                this.output[cell.x][cell.y] = parseInt(cell.type, 10);
                if (cell.isClicked) {   // Tell me if the cell has been clicked just now, and reset its flag if so:
                    cell.setUnclicked();
                    this.paintAdditionalCells(cell.x, cell.y);  // Use coordinates of cell that was clicked to paint its neighbors
                }
            })
        })
    }

    // Every time an option is clicked in the Palette, update EVERY CELL to be ready to paint that block.
    updateSwatch = () => {
        this.paletteOptions.forEach((swatch) => {
            // If the swatch is the one that was just clicked, change the current block and make it 'active':
            if (swatch.justClicked) {
                this.currentBlock = swatch.blockData;
                swatch.setActive();
            } else {
                swatch.setInactive();       // Otherwise, make sure the swatch's UI element is 'inactive'
            }
            swatch.justClicked = false; // check if it's just been clicked. If so change the current type. Then... unclick it.
        })
        // Set EVERY SINGLE cell to make that the block of the day... there has got to be a better way to do this...
        this.columns.forEach((col) => {
            col.forEach((cell) => {
                cell.setPalette(this.currentBlock);
            })
        })
        // Update 'current block' display text and image:
        this.paletteCurrentBlock.innerText = `${this.currentBlock.name} (${this.currentBlock.id})`;
        if (this.currentBlock.id === '000') {
            this.palettePreview.src = 'assets/blocks/proto blocks/block000.png'
        } else if (this.currentBlock.properties.includes('gif')) {
            this.palettePreview.src = `assets/blocks/block${this.currentBlock.id}.gif`;
        } else {
            this.palettePreview.src = `assets/blocks/block${this.currentBlock.id}.png`;
        }
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
        // If you've just scrolled up, make the scroll-down button appear enabled:
        this.panDown.classList.add('enabled');
        this.panDown.classList.remove('disabled');
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
            this.updateAxisLabels();
        }
        // If you've just moved to the bottom, make the button appear disabled:
        if (this.verticalOffset === 0) {
            this.panDown.classList.add('disabled');
            this.panDown.classList.remove('enabled');
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
        // If you've just scrolled right, make the scroll left button appear enabled:
        this.panLeft.classList.add('enabled');
        this.panLeft.classList.remove('disabled');
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
            this.updateAxisLabels();
        }
        // If you've just moved to the leftmost edge, make the button appear disabled:
        if (this.horizontalOffset === 0) {
            this.panLeft.classList.add('disabled');
            this.panLeft.classList.remove('enabled');
        }
    }

    // BEDROCK INPUT HANDLERS:
    handleBedrockTop = () => {
        // Try to recognize the block type from its numerical ID; if this fails, default to type 1 (dirt):
        // Format input string to be the right length (i.e. add zeros in front if it's too short):
        if (this.bedrockTopInput.value.length === 3) {
            this.bedrockTop = blocktionary.find((block) => block.id === this.bedrockTopInput.value);
        } else if (this.bedrockTopInput.value.length === 2) {
            this.bedrockTop = blocktionary.find((block) => block.id === '0' + this.bedrockTopInput.value);
        } else {
            this.bedrockTop = blocktionary.find((block) => block.id === '00' + this.bedrockTopInput.value);
        }
        if (!this.bedrockTop) {     // If the result is undefined (block not found) set to type 1 as a fallback:
            this.bedrockTop = blocktionary[1];
        }
    }

    handleBedrockBottom = () => {
        if (this.bedrockBottomInput.value.length === 3) {
            this.bedrockBottom = blocktionary.find((block) => block.id === this.bedrockBottomInput.value);
        } else if (this.bedrockBottomInput.value.length === 2) {
            this.bedrockBottom = blocktionary.find((block) => block.id === '0' + this.bedrockBottomInput.value);
        } else {
            this.bedrockBottom = blocktionary.find((block) => block.id === '00' + this.bedrockBottomInput.value);
        }
        if (!this.bedrockBottom) {
            this.bedrockBottom = blocktionary[1];
        }
    }

    handleBedrockHeight = () => {
        // Convert the string value to a number and store it:
        this.bedrockHeight = Number(this.bedrockHeightInput.value);
        if (this.bedrockHeight < 0 || !Number.isInteger(this.bedrockHeight)) { // Don't allow negative numbers or decimal values
            this.bedrockHeightInput.value = 0;
            this.bedrockHeight = 0;
        }
    }

    // Add Bedrock Button handler - where the actual bedrock addition logic lives:
    handleAddBedrock = (ev) => {
        ev.preventDefault();        // Prevent the page from refreshing.
        try {                       // Use try/catch to prevent errors if some of the selections aren't good.
            if (this.bedrockHeight === 0) {                     // If bedrock height is zero, do nothing.
                console.log('Bedrock height = 0; No bedrock added.');
            } else if (this.bedrockHeight === 1) {              // If it is 1, add one layer of the TOP element.
                this.columns.forEach((col) => {
                    col[0].paintCell(this.bedrockTop);
                })
            } else if (this.bedrockHeight > 1) {         // If height > 1, use the top type for row [height - 1]...
                this.columns.forEach((col) => {
                    col[this.bedrockHeight - 1].paintCell(this.bedrockTop);
                    col.forEach((cell) => {     // ... Then for every cell that's LOWER than that, use the bottom type:
                        if (cell.y < this.bedrockHeight - 1) cell.paintCell(this.bedrockBottom);
                    })
                })
            }
        } catch {
            console.log('Invalid bedrock options selected. Please reconfigure and try again.');
        }
    }

    // BRUSH SELECTION BUTTON HANDLER:
    selectBrush = (shape) => {   // Shape = string name of brush shape option
        this.currentBrushSelection = shape;
        this.brushSmall.classList.remove('selected');    // Remove 'selected' class from all brush options
        this.brushMedium.classList.remove('selected');
        this.brushLarge.classList.remove('selected');
        this[`brush${shape}`].classList.add('selected');    // Make the currently selected brush look 'selected.'
    }

    // Paint additional cells based on brush shape:
    paintAdditionalCells = (x, y) => {  // X and Y are the coords of the cell that was just clicked AKA the epicenter.
        switch (this.currentBrushSelection) {
            case 'Small':   // If Small brush is selected then no additional cells need to be filled in.
                break;
            case 'Medium':      // For the Medium brush, paint a 3x3 square of the current block type.
                if (x > 0) {    // Prevent attempts to brush too close to the canvas edge.
                    for (let i = x - 1; i <= x + 1; i++) {
                        if (y > 0) {
                            for (let j = y - 1; j <= y + 1; j++) {
                                this.columns[i][j].paintCell(this.currentBlock);
                            }
                        }
                    }
                }
                break;
            case 'Large':
                if (x > 1) {    // Prevent attempts to brush too close to the canvas edge.
                    for (let i = x - 2; i <= x + 2; i++) {
                        if (y > 1) {
                            for (let j = y - 2; j <= y + 2; j++) {
                                this.columns[i][j].paintCell(this.currentBlock);
                            }
                        }
                    }
                }
                break;
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