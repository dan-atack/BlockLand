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
    this.standingOn = 0;
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
}
