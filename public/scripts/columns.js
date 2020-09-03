// When the Engine's block list became unwieldy it became an ideal candidate for objectification:

class Columns {
  constructor(root, numOfCols, visibilityRange) {
    this.root = root;
    // Columns start at the negative of the specified number, so the world expands in both directions:
    // Adding two to the number of columns here 'pads' the world for the benefit of the isWayClear method, which
    // always checks the next row (just so you don't get an ugly little error message when you try to move into a wall)
    for (let i = -(numOfCols + 2); i <= numOfCols + 2; i++) {
      // Each column is an object with a unique name:
      this[`column_${i}`] = {};
      // Each column contains a list of the blocks it contains:
      this[`column_${i}`].blocks = [];
      // Each column also holds a boolean for whether to render its contents:
      this[`column_${i}`].rendered = false; // initially no columns start out rendered
    }
    this.numOfCols = numOfCols;
    // Visibility Range is a tuple representing the start/stop numbers for which columns and 'rows' should be visible:
    this.visibilityRange = visibilityRange; // incidentally, VR[0] is equal to the engine's horizontal offset value...
    this.verticalOffset = 0;
    // Now, to broaden the diversity of the wider world:
    // block Printer function will take these arguments, skillfully inserted into the block printer's logic.
    // At first it might be a bit like, identical volcanoes to the left, identical forests to the right, but it's a starT:
    this.currentBiomeLeft = wetLands;
    this.currentLeftwardBiomeIdx = 0;
    this.currentBiomeRight = startStage;
    this.currentRightwardBiomeIdx = 0;
  }

  // Methods:

  // Method 1: The Block Printer:
  // The BP Mk IV takes an ARRAY representing a stack of specific blocks, to be placed from the bottom up:
  // Under some circumstances it might be necessary to pass an h-Offset value for printing in the middle of the screen.
  blockPrinter = (columnNumber, blockStack) => {
    // blocks will have to be inspected from the horizontal AND vertical angle to determine initial render value:
    let renderBlockHorizontal = false;
    let renderBlockVertical = false;
    // render the column (and its blocks) if it is in the HORIZONTAL visible range:
    if (
      columnNumber >= this.visibilityRange[0] &&
      columnNumber <= this.visibilityRange[1]
    ) {
      this[`column_${columnNumber}`].rendered = true;
      renderBlockHorizontal = true;
    }
    let y = 0; // don't forget we still need to provide a y-coordinate for each block!
    blockStack.forEach((protoBlock) => {
      // Vertical render check must be reset here for each block to be screened:
      renderBlockVertical = false;
      // protoBlocks, or blocks in waiting, are integers representing a specific type of block.
      // Embedding the block printing action in a conditional statement to filter out zero values so you can have 'empty' block spaces
      if (protoBlock) {
        // Individual blocks' vertical render values determined by y-vs-vertical offset value:
        if (y >= this.verticalOffset && y <= this.verticalOffset + SCREEN_HEIGHT_IN_BLOCKS) {
          renderBlockVertical = true;
        }
        const renderBlock = renderBlockHorizontal && renderBlockVertical;
        let block = new Block(
          this.root,
          columnNumber,
          y,
          protoBlock,
          renderBlock
        );
        this[`column_${columnNumber}`].blocks.push(block);
      }
      // and then, either way, increase the height and move on to the next block:
      y += 1;
    });
  };

  // Method 2: The Biome Builder - Deploy the Block Printer to render whole biomes, one column at a time as needed!

  // Takes just one argument: The columns (presumes an array, even if it's only got one member) to be rendered.
  // Information on which biome to use is given by the currentBiome<direction> attribute, which changes at the end of every biome!
  // Regarding the sudden proliferation of horizontal offsets: I think I just invented prop drilling!
  biomeBuilder = (columns) => {
    // For every column in the stated range, run the block printer for that column number, and fill with the
    // appropriate column from the current biome:
    columns.forEach((column) => {
      // If your column number is zero or higher you're going to the right:
      if (column >= 0) {
        this.blockPrinter(
          column,
          this.currentBiomeRight[this.currentRightwardBiomeIdx]
        );
        this.currentRightwardBiomeIdx++;
        // If you're at the last index position of the current biome, reset the index position counter and load a new biome:
        if (this.currentRightwardBiomeIdx === this.currentBiomeRight.length) {
          this.currentRightwardBiomeIdx = 0;
          // Random biome generator:
          this.currentBiomeRight =
            biomes[
              `biome${Math.floor(Math.random() * Object.keys(biomes).length)}`
            ];
        }
        // If your column number is negative you're going to the left:
      } else {
        // For every column in the stated range, run the block printer for that column number, and fill with the
        // appropriate column from the current biome:
        this.blockPrinter(
          column,
          this.currentBiomeLeft[this.currentLeftwardBiomeIdx]
        );
        this.currentLeftwardBiomeIdx++;
        if (this.currentLeftwardBiomeIdx === this.currentBiomeLeft.length) {
          this.currentLeftwardBiomeIdx = 0;
          this.currentBiomeLeft =
            biomes[
              `biome${Math.floor(Math.random() * Object.keys(biomes).length)}`
            ];
        }
      }
    });
  };

  // Method 3: Is Way Blocked? Returns the value of the target block's solidity, so you can fall into water again:

  isWayBlocked = (columnNumber, yPos) => {
    // the logic here is that the zero will be falsy, as in 'there is nothing in your way' and any other number will be truthy
    // as in "yes, your way is blocked, here is the number of the thing that's obstructing you."
    // The NEW logic is that you start out not blocked and if the thing that's in your way is NOT permeable, then you are blocked.
    let blocked = false;
    // Given a column, check all its blocks:
    this[`column_${columnNumber}`].blocks.forEach((block) => {
      // if one if them is at the target y position, return its type:
      if (block.y == yPos) blocked = !block.isPermeable;
    });
    return blocked;
  };

  // Method 4: Render just one block somewhere OFFSCREEN (for dynamic level-building):

  addOneBlock = (columnNumber, yPos, blockType) => {
    let renderBlock = false;
    if (
      columnNumber >= this.visibilityRange[0] &&
      columnNumber <= this.visibilityRange[1]
    ) {
      this[`column_${columnNumber}`].rendered = true;
      renderBlock = true;
    }
    let block = new Block(
      this.root,
      columnNumber,
      yPos,
      blockType,
      renderBlock
    );
    this[`column_${columnNumber}`].blocks.push(block);
    // Shift block immediately upon rendering. Later on we'll need to think about a vertical one...
    if (renderBlock) block.horizontalTranslate(this.visibilityRange[0]);
  };

  // Method 5: Remove just one block by targeting the block at given coordinates (for level setup):

  removeOneBlock = (column, yPos) => {
    const exBlock = this[`column_${column}`].blocks.find(
      (block) => block.y == yPos
    );
    // de-render a block that is onscreen as well as off:
    if (exBlock && exBlock.rendered) exBlock.toggleDisappear();
    // Filter out the 'ex-block' and return the newly truncated blocks list:
    this[`column_${column}`].blocks = this[`column_${column}`].blocks.filter(
      (block) => block.y != yPos
    );
  };

  // Method 6: Adding new empty columns AFTER the world's initial size has been determined:

  addNewColumns = (start, stop, direction) => {
    // instructions for this function are passed from the engine's level setup switch function.
    if (direction === 'right') {
      //  add 2 buffer columns to satisfy collision detector's needs:
      for (let i = start; i <= stop + 2; i++) {
        this[`column_${i}`] = {};
        this[`column_${i}`].blocks = [];
        this[`column_${i}`].rendered = false;
      }
    } else if (direction === 'left') {
      for (let i = start; i >= stop - 2; i--) {
        this[`column_${i}`] = {};
        this[`column_${i}`].blocks = [];
        this[`column_${i}`].rendered = false;
      }
    }
  };

  // Method 7: AKA the original Way Blocked function: kept in place to allow you to detect what is underneath you:

  blockTypeDetector = (column, yPos) => {
    // the logic here is that the zero will be falsy, as in 'there is nothing in your way' and any other number will be truthy
    // as in "yes, your way is blocked, here is the number of the thing that's obstructing you."
    let blocked = blocktionary[0];
    // Given a column, check all its blocks:
    this[`column_${column}`].blocks.forEach((block) => {
      // if one if them is at the target y position, return its type:
      if (block.y == yPos) blocked = block.blockData;
    });
    return blocked;
  };

  // Method 8: Moving through the world - Columns object must derender a column and shift the others as you move towards the edge:

  // Column de/rendering function for horizontal movement:

  toggleColumn = (columnNumber) => {
    this[`column_${columnNumber}`].rendered = !this[`column_${columnNumber}`]
      .rendered;
    this[`column_${columnNumber}`].blocks.forEach((block) => {
      // Add logic to only toggle blocks within VERTICAL render area:
      if (
        block.y >= this.verticalOffset &&
        block.y <= this.verticalOffset + SCREEN_HEIGHT_IN_BLOCKS
      )
        block.toggleDisappear();
    });
  };

  // Method 9: Multi-column vertical shifter:

  shiftColumnsVertically = (offset) => {
    // Then update this.verticalOffset for future calculations:
    this.verticalOffset = offset;
    // For each visible column,
    for (let i = this.visibilityRange[0]; i <= this.visibilityRange[1]; i++) {
      // For each block,
      this[`column_${i}`].blocks.forEach((block) => {
        // Apply its vertical translate method:
        block.verticalTranslate(offset);
      });
    }
  };

  // Method 10: Multi-column block de/renderer:

  // CURRENT STATUS: Works but the horizontal toggler needs to learn to play nicer...

  // The offset value will be combined with the direction of movement to determine which blocks to de/render:
  toggleOffscreenBlocks = (offset) => {
    const lowest_row_to_show = offset;
    const top_row_to_show = offset + SCREEN_HEIGHT_IN_BLOCKS;
    for (let i = this.visibilityRange[0]; i <= this.visibilityRange[1]; i++) {
      // Define list of blocks within each column that should be shown:
      const showers = this[`column_${i}`].blocks.filter(
        (block) => block.y >= lowest_row_to_show && block.y <= top_row_to_show
      );
      // Similarly, for each column define which blocks NOT to show:
      const hiders = this[`column_${i}`].blocks.filter(
        (block) => block.y < lowest_row_to_show || block.y > top_row_to_show
      );
      // Ensure all blocks within the visibility range are rendered by calling toggleDisappear if they are NOT rendered:
      showers.forEach((block) => {
        if (!block.rendered) block.toggleDisappear();
      });
      // And ensure all blocks outside the visibility range are DErendered by toggling them if they ARE rendered:
      hiders.forEach((block) => {
        if (block.rendered) block.toggleDisappear();
      });
    }
  };

  // Method X: Clear all blocks AND remove them from the game (for rendering new worlds/subworlds?!):

  clearAllColumns = () => {
    // derender all visible rows to remove their blocks' dom images:
    for (let i = this.visibilityRange[0]; i <= this.visibilityRange[1]; i++) {
      this.toggleColumn(i);
    }
    // then clear all blocks from all columns:
    for (let i = -WORLD_WIDTH; i <= WORLD_WIDTH; i++) {
      this[`column_${i}`].blocks = [];
    }
  };
}
