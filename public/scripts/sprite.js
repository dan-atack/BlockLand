// The Sprite is the most general Class of Entities that are capable of Movement.

class Sprite extends Entity {
  constructor(
    root,
    xStart,
    yStart,
    rendered,
    horizontalOffset,
    verticalOffset
  ) {
    super(root, xStart, yStart, rendered, horizontalOffset, verticalOffset);
    // Essential characteristics of Sprites - Movement and directionality:
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.facing = 'right';
  }
}
