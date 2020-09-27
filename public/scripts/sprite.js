// The Sprite is the most general Class of Entities that are capable of Movement.

class Sprite extends Entity {
  constructor(root, xStart, yStart) {
    super(root, xStart, yStart);
    // Essential characteristics of Sprites which also do not require immediate inputs (or can be derived from them):
    this.gridX = xStart;
    this.gridY = yStart;
    this.facing = 'right';
    this.isDead = false; // That's a bit morbid, isn't it?
    // MOVEMENT-RELATED:
    this.topSpeed = 0.25;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.standingOn = { id: '000', name: 'Air', properties: ['permeable'] };
    // The medium you're in can affect your movement (air is normal, water will be slower)
    this.medium = { id: '000', name: 'Air', properties: ['permeable'] };
    // COMBAT-RELATED:
    this.collisionStatus = 'clear';
    this.isAttacking = false;
    // Attack range controls the attack animation:
    this.attackRange = 0;
    // Attack Radius controls combat calculations to see if you kill people:
    this.attackRadius = 0;
    this.attackCountdown = 0;
    this.attackAnimation = document.createElement('img');
  }

  // Sprite Methods control the most general things about moving entities, such as translating their attack animations:

  horizontalTranslate(horizontalOffset) {
    // As a Sprite moves around the world, their X value will keep an absolute frame of reference,
    // but the dom element must be translated. Subracting the horizontal offset makes an image
    // appear further to the left than its absolute position suggests...
    this.horizontalOffset = horizontalOffset;
    this.domElement.style.left = `${
      (this.x - horizontalOffset) * PLAYER_WIDTH
    }px`;
    // if attacking, ensure the attack animation is also shifted:
    if (this.isAttacking)
      this.attackAnimation.style.left = `${
        (this.attackRange - this.horizontalOffset) * PLAYER_WIDTH
      }px`;
  }

  verticalTranslate = (verticalOffset) => {
    // Analogous to the h-offset, Subtracting the vertical offset from an image makes it appear lower than its absolute position:
    this.verticalOffset = verticalOffset;
    this.domElement.style.bottom = `${
      (this.y - verticalOffset) * PLAYER_WIDTH
    }px`;
    if (this.isAttacking)
      this.attackAnimation.style.bottom = `${
        (this.y - this.verticalOffset) * PLAYER_WIDTH
      }px`;
  };

}
