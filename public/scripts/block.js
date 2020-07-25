// Since this is a block game, we'll need a block object class.
// Constructor takes no arguments for now, but in future might have a 'type' that can be specified when
// we make it so there are multiple block types.

class Block {
  // constructor takes 5 arguments: root HTML element, x and y position, and block type which represents an ID in the blocktionary,
  // plus we now have the rendered value which is contingent on whether it is appearing in a visible column.
  constructor(root, x, y, type = '001', rendered, horizontalOffset = 0) {
    this.root = root;
    this.x = x;
    this.y = y;
    this.blockData = {};
    // Ensure block's id number is a string with 3 numerical digits (so we can still use 1 or 2 digit numbers in map-making exercises):
    if (type.toString().length != 3) {
      type.toString().length == 2
        ? // then use that ID to locate the appropriate data in the BLOCKTIONARY!!!
          (this.blockData = blocktionary.find(
            (block) => block.id === `0${type}`
          ))
        : (this.blockData = blocktionary.find(
            (block) => block.id === `00${type}`
          ));
    } else {
      this.blockData = blocktionary.find(
        (block) => block.id === type.toString()
      );
    }
    // For now, all blocks contain the possibility of having special attributes; the Blocktionary determines which are activated:
    this.isPermeable = false;
    this.isAnimated = false;
    this.hasAbnormalFriction = false;
    this.isLethal = false;
    // Block DOM elements get created here:
    this.domElement = document.createElement('img');
    this.domElement.src = `./assets/blocks/block${this.blockData.id}.png`;
    // Block dom Element positions are new given in terms of coordinates multiplied by width, to form a 'pseudo-grid':
    this.domElement.style.left = `${(x - horizontalOffset) * BLOCK_WIDTH}px`;
    this.domElement.style.bottom = `${y * BLOCK_WIDTH}px`;
    this.domElement.classList.add('block');
    this.domElement.id = `${this.x},${this.y}`;
    // Now use Blocktionary's properties array to determine the block's attributes:
    if (this.blockData.properties.length > 0) {
      this.blockData.properties.forEach((property) => {
        switch (property) {
          case 'permeable':
            this.isPermeable = true;
            this.domElement.style.opacity = 0.5;
            break;
          // certain blocks appear solid but can in fact be bypassed:
          case 'passable':
            this.isPermeable = true;
            this.domElement.style.zIndex = 0;
          case 'lethal':
            this.isLethal = true;
            break;
          case 'low_friction':
            // Still working on this one.. probably won't keep this shape for long.
            this.hasAbnormalFriction = true;
            break;
          case 'animated':
            this.isAnimated = true;
            break;
          // Default is you are not at all special. And you're a block. My boy's a block!!!
        }
      });
    }
    // Blocks will only appear if the printer tells them to:
    this.rendered = rendered;
    if (this.rendered) root.appendChild(this.domElement);
    // We'll use this value to enable the disappear function:

    // Special FX for 'bonus' blocks:
    switch (this.blockData.id) {
      case '999':
        this.domElement.classList.add('golden-egg');
        break;
      case '989':
        this.domElement.classList.add('portal');
        break;
    }
  }

  horizontalTranslate(horizontalOffset) {
    // blocks' dom elements are shifted when the screen moves. The value for horizontal offset increases as the player goes to the right;
    // So, to make the blocks appear to go to the left, we subtract the horizontal offset from their apparent position:
    this.domElement.style.left = `${
      (this.x - horizontalOffset) * BLOCK_WIDTH
    }px`;
  }

  toggleDisappear() {
    if (this.rendered) {
      this.root.removeChild(this.domElement);
      this.rendered = false;
    } else {
      this.root.appendChild(this.domElement);
      this.rendered = true;
    }
  }
}
