// The Entity is the most general class of worldly things. Every class that appears in the game world is subclassed from it.

class Entity {
  // The most basic inputs about things are their root (worldly attachment), and their x and y coordinates:
  constructor(root, xStart, yStart) {
    this.root = root;
    this.x = xStart;
    this.y = yStart;
    // Traits which are universal to all entities but do not require input ab initio:
    this.rendered = false;
    this.horizontalOffset = 0;
    this.verticalOffset = 0;
    this.domElement = document.createElement('img');
    this.domElement.id = '';
  }

  // Entity Methods control the most general things, such as rendering on and off, and horizontal/vertical translation:

  render() {
    if (!this.rendered) {
      this.root.appendChild(this.domElement);
      this.rendered = true;
    }
  }

  deRender() {
    if (this.rendered) {
      this.root.removeChild(this.domElement);
      this.rendered = false;
    }
  }

  // For updating the root element of an entity after UI changes:
  updateRoot(root) {
    // Re-assign new root element:
    this.root = root;
  }

  horizontalTranslate(horizontalOffset) {
    // Entities' DOM elements are shifted when the screen moves. Value for horizontal offset increases as player goes to the right.
    // To make the blocks appear to go to the left, we subtract the horizontal offset from their apparent position:
    this.horizontalOffset = horizontalOffset;
    this.domElement.style.left = `${
      (this.x - horizontalOffset) * BLOCK_WIDTH
    }px`;
  }

  verticalTranslate(verticalOffset) {
    // Similarly to the horizontal case, Entities' DOM elements are shifted downwards as the player moves upwards, and vice versa:
    this.verticalOffset = verticalOffset;
    this.domElement.style.bottom = `${
      (this.y - verticalOffset) * BLOCK_WIDTH
    }px`;
  }
}
