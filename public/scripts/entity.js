// The Entity is the most general class of worldly things. Every class that appears in the game world is subclassed from it.

class Entity {
  // The most basic facts about things are that they are worldly, their x and y coordinates.
  constructor(
    root,
    xStart,
    yStart,
    rendered = false,
    horizontalOffset = 0,
    verticalOffset = 0
  ) {
    this.root = root;
    this.x = xStart;
    this.y = yStart;
    this.rendered = rendered;
    this.horizontalOffset = horizontalOffset;
    this.verticalOffset = verticalOffset;
    this.domElement = document.createElement('img');
    this.domElement.id = '';
  }
}
