class Boss extends Baddie {
  constructor(root, xStart, yStart, baddieType, baddieSerial, xRange, hitpoints=25) {
    super(root, xStart, yStart, baddieType, baddieSerial, xRange, hitpoints);
    this.domElement.classList.add('boss');
    this.patrolInterval = 4;
    // Bosses have bigger everything:
    this.spriteWidth = 2; // Okay, so this is... hackis in extremis, since this property is ALSO in the baddie dictionary, *and* it's a different number in there, but I had to do it because this is the value that the Sprite's attack positioner looks for when it calculates rightward-facing X-offset!
    this.lineOfSight = 4;
    this.attackAnimationWidth = 2;
    this.facingPlayer = false;  // Keep track of whether boss is facing the player.
    this.heightRelativeToPlayer = 0 // Keep track of elevation relative to player ( positive numbers = baddie is higher than player).
    // Separate countdown sequence for Big Boss attacks:
    this.firingSequenceCountdown = 0; // Counts down to zero while attack is in progress; interrupts regular movement.
  }

  // Boss lookAhead registers the player's location relative to the boss and sets that as a property:
  lookAhead = (playerCoords) => {
    this.enemySpotted = false;  // Reset this flag to false by default.
    this.facingPlayer = false;  // Reset this flag to false by default as well.
    if (this.facing === 'right') {  // To be 'seen' the baddie must be downstream (to the left) and within range
      if (this.x < playerCoords[0] && this.x + this.lineOfSight >= playerCoords[0] && this.gridY === playerCoords[1]) {
        this.enemySpotted = true;
        this.facingPlayer = true;
      } else if (this.x < playerCoords[0]) {
        this.facingPlayer = true;
      }
    } else if (this.facing === 'left') {  // To be seen the baddie must be upstream (to the right of player), and within range
      if (this.x > playerCoords[0] && this.x - this.lineOfSight <= playerCoords[0] && this.gridY === playerCoords[1]) {
        this.enemySpotted = true;
        this.facingPlayer = true;
      } else if (this.x > playerCoords[0]){
        this.facingPlayer = true;
      }
    }
    this.determineElevationRelativeToPlayer(playerCoords);
  }

  determineElevationRelativeToPlayer  = (playerCoords) => {
    this.heightRelativeToPlayer = this.y - playerCoords[1];
  }

  patrol = () => {
    if (!this.isDying && this.hasBeenRendered) {
      this.patrolTick += 1;
      // If it's time to act then we enter our action block, and reset the ticker:
      if (this.patrolTick === this.patrolInterval) {
        this.patrolTick = 0;          // First, reset the ticker.
        if (this.firingSequenceCountdown > 0) { // Next, check if the gun is being fired (or prepared to fire):
          this.advanceFiringSequence();
        } else {
          this.handleJumps();           // Next, take care of whether to jump over an obstacle.
          // Next determine movement and attacks. Unlike regular baddies, the boss will move towards the player rather than patrolling:
          if (this.facing === 'right') {
            if (this.enemySpotted) {  // If player is in range, start to fire on them:
              this.firingSequenceCountdown = 12;
            // Otherwise, if the boss is facing the player AND is on their level, move towards them:
            } else if (this.facingPlayer && this.heightRelativeToPlayer === 0) {
              this.movingRight = true;
              this.movingLeft = false;
            // Otherwise if the player is NOT on the same elevation, hang loose and console log it (for now):
            } else if (this.facingPlayer) {
              this.movingRight = false;
              this.movingLeft = false;
            // Finally, if the player is behind the baddie, turn around:
            } else {
              this.movingRight = false;
              this.movingLeft = true;
            }
          // Leftward motion:
          } else {
            if (this.enemySpotted) {  // If player is in range, fire on them:
              this.firingSequenceCountdown = 12;
            // Otherwise, if the boss is facing the player AND is on their level, move towards them:
            } else if (this.facingPlayer && this.heightRelativeToPlayer === 0) {
              this.movingRight = false;
              this.movingLeft = true;
            // Otherwise if the player is NOT on the same elevation, hang loose and console log it (for now):
            } else if (this.facingPlayer) {
              this.movingRight = false;
              this.movingLeft = false;
            // Finally, if the player is behind the baddie, turn around:
            } else {
              this.movingRight = true;
              this.movingLeft = false;
            }
          }
        }
      }
    }
  }

  advanceFiringSequence = () => {
    if (this.firingSequenceCountdown === 12) {
      playSound('gatling-gun-windup-sound');
    }
    if (this.firingSequenceCountdown === 9) {
      this.gatlingGunAttack();
    }
    this.firingSequenceCountdown -= 1;
  }

  handleJumps = () => {
    // Reset jump height history if movement has been successful:
    if (!this.verifyXObstruction()) this.lastJumpInitialHeight = null;
    this.domElement.classList.add('baddie-moving');
    // If you've already jumped and you're still stuck, turn around:
    if (this.verifyYObstruction() && this.verifyXObstruction()) {
      // depending on which way you're facing, move the other way:
      this.facing === 'right' ? this.movingLeft = true : this.movingRight = true;
      this.facing === 'right' ? this.movingRight = false : this.movingLeft = false;
      // Reset jump evaluator:
      this.lastJumpInitialHeight = null;
      // If the baddie encounters an obstacle, jump:
    } else if (this.verifyXObstruction()) {
      this.jumping = true;
    }
  }

  gatlingGunAttack = () => {
    this.attackRadius = 5;
    this.attackCountdown = 50;
    this.currentAttackDamage = 2;
    this.currentAttackKnockback = 0.5;
    this.attack('gatling-gun');
    playSound('gatling-gun-fire-sound');
  }

  handleDeath() {
  // Engine can check a baddie for deathLoops and remove them when the counter reaches zero:
  if (this.deathLoops > 0) {
    // Death of a baddie: baddie sprite is replaced by a gif of them dying which plays for a certain amount of game loops:
      if (this.deathLoops === 20) {
        this.domElement.src = `./assets/effects/animations/baddie-${this.type}-death.gif`;
        // ensure proper sprite orientation:
        this.facing === 'right'
          ? (this.domElement.style.transform = 'rotateY(0deg)')
          : 'rotate&(180deg)';
      }
      this.isDying = true;
      // Override normal styling to make bosses bigger:
      this.domElement.style.width = `${BOSS_WIDTH}px`;
      this.domElement.style.height = `${BOSS_WIDTH}px`;
      this.domElement.style.zIndex = 100;
      // Countdown to sprite removal:
      this.deathLoops -= 1;
    } else {
      this.isDying = false;
      this.isDead = true;
      this.deRender();
    }
  }

}
