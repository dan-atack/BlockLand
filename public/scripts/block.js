// Since this is a block game, we'll need a block object class.
// Constructor takes no arguments for now, but in future might have a 'type' that can be specified when
// we make it so there are multiple block types.

class Block extends Entity {
  // Blocks are created by the Columns Class's blockPrinter and addOneBlock methods.
  constructor(root, xStart, yStart, rendered, type = '001') {
    super(root, xStart, yStart);
    this.rendered = rendered;
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
    this.domElement.src = `./assets/blocks/block${this.blockData.id}.png`;
    // Block dom Element positions are new given in terms of coordinates multiplied by width, to form a 'pseudo-grid':
    this.domElement.style.left = `${
      (xStart - this.horizontalOffset) * BLOCK_WIDTH
    }px`;
    this.domElement.style.bottom = `${yStart * BLOCK_WIDTH}px`;
    this.domElement.classList.add('block');
    this.domElement.id = `${xStart},${yStart}`;
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
          // blocks can be .gif files too! Just add 'gif' to their properties array :)
          case 'gif':
            this.domElement.src = `./assets/blocks/block${this.blockData.id}.gif`;
            break;
          // Many block properties map directly to CSS properties:
          case 'flowing-left':
          case 'flowing-right':
          case 'flowing-up':
          case 'flowing-down':
          case 'facing-left':
          case 'green-glow':
          case 'red-glow':
            this.domElement.classList.add(property);
            break;
          case 'opaque':
            this.domElement.style.opacity = 1;
            break;
        }
      });
    }
    if (this.rendered) root.appendChild(this.domElement);
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
}
