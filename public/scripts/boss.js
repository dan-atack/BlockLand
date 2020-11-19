class Boss extends Baddie {
  constructor(root, xStart, yStart, baddieType = 1003, baddieSerial, xRange, hitpoints=5) {
    super(root, xStart, yStart, (baddieType = 1003), baddieSerial, xRange, hitpoints);
    this.domElement.classList.add('boss');
    this.patrolInterval = 9;
    // Bosses have bigger everything:
    this.attackAnimationWidth = 1.5;
    this.spriteWidth = 1.5;
  }

  // Boss's Patrol method will also include instructions to call the attack method:
  patrol() {
    // You can't patrol if you're dying, and you also have to have been rendered at least once:
    if (!this.isDying && this.hasBeenRendered) {
      // Add a tick:
      this.patrolTick += 1;
      // If it's time to move then we enter our first block, and reset the ticker:
      if (this.patrolTick === this.patrolInterval) {
        // Reset jump height history if movement has been successful:
        if (!this.verifyXObstruction()) this.lastJumpInitialHeight = null;
        this.patrolTick = 0;
        // If you've already jumped and you're still stuck, turn around:
        if (this.verifyYObstruction() && this.verifyXObstruction()) {
          // depending on which way you're facing, move the other way:
          this.facing === 'right' ? this.moveLeft() : this.moveRight();
          // Reset jump evaluator:
          this.lastJumpInitialHeight = null;
          // If the baddie encounters an obstacle, jump:
        } else if (this.verifyXObstruction()) {
          this.jump();
        }
        // Next determine the direction of movement. We'll do rightwards first:
        if (this.facing === 'right') {
          // Final condition: if you're going right, where are you now? If not at the right edge, keep going (add to x):
          if (this.x < this.xRange[1]) {
            this.moveRight();
          } else {
            // If you ARE at the far right, turn around and move leftwards by reducing x:
            this.moveLeft();
          }
          // Leftward motion:
        } else {
          // Leftward edge detection - the mirror image:
          if (this.x > this.xRange[0]) {
            this.moveLeft();
          } else {
            this.moveRight();
          }
        }
        // Every patrol cycle, attack!
        this.electricityAttack();
      }
    }
  }

  handleDeath() {
    // Engine can check a baddie for deathLoops and remove them when the counter reaches zero:
    if (this.deathLoops > 0) {
      // Death of a baddie: baddie sprite is replaced by a gif of them dying which plays for a certain amount of game loops:
      if (this.deathLoops === 20) {
        // collision status is the key to HP: hit by Attack object: {name: 'claws', id: 101, dmg: 5, type: 'slashing'}
        this.domElement.src = `./assets/effects/animations/baddie-${this.type}-death.gif`;
        // ensure proper sprite orientation:
        this.facing === 'right'
          ? (this.domElement.style.transform = 'rotateY(0deg)')
          : 'rotate&(180deg)';
      }
      this.isDying = true;
      // Override normal styling to make bosses bigger:
      this.domElement.style.width = `${BOSS_WIDTH}px`;
      this.domElement.style.width - `${BOSS_WIDTH}px`;
      this.domElement.style.zIndex = 100;
      // Countdown to sprite removal:
      this.deathLoops -= 1;
    } else {
      this.isDying = false;
      this.isDead = true;
      this.deRender();
    }
  }

  // Specific attacks info is fed into the general attack function:

  electricityAttack() {
    if (this.attackCountdown === 0) {
      this.attackRadius = 1.5;
      this.attackCountdown = 9;
      this.currentAttackDamage = 2;
      this.currentAttackKnockback = 0.5;
      // then call the general purpose attack function, and tell it which animation to use:
      this.attack('electricity');
      this.attackAnimation.classList.add('boss');
    }
  }
}
