// The Highly Anticipated Bad Doods have arrived!

class Baddie {
  // Just like the player class! Oh boy, it's like they're RELATED or something >:-(
  // New to the bad guys since they're not unique: type (for which sprite to render) and serial number (for the engine)
  // xRange is an array of the start/stop values of the baddie's territory.
  constructor(root, xStart, yStart, baddieType = 1001, baddieSerial, xRange) {
    this.root = root;
    this.x = xStart;
    this.y = yStart;
    this.type = baddieType;
    this.serialNum = baddieSerial;
    // X range is the territory a baddie will patrol:
    this.xRange = xRange;
    // Presumes that all enemies start off the initial screen; corrected further below after DOM element is appended to document:
    this.rendered = false;
    this.hasBeenRendered = false;
    this.gridX = xStart;
    this.gridY = yStart;
    this.facing = 'right';
    this.domElement = document.createElement('img');
    // Dynamic baddie types are ON the menu!! Baddie ID codes start at 1001 so they can be entered as numbers OR strings:
    this.domElement.src = `./assets/sprites/baddie_${baddieType}.png`;
    this.domElement.style.zIndex = 100;
    // Player width is still the standard unit of reference... for NOW!
    this.domElement.style.left = `${this.x * PLAYER_WIDTH}px`;
    this.domElement.style.bottom = `${this.y * PLAYER_WIDTH}px`;
    this.domElement.id = `baddie_${baddieSerial}`;
    this.id = `baddie_${baddieSerial}`;
    // Initial CSS image class is baddie-trans, which is short for 'translation-mode,' used for lockstep motion with passing terrain:
    this.domElement.className = 'baddie-trans';
    root.appendChild(this.domElement);
    // Start invisible if you're outside the screen:
    if (!this.x >= 0 && this.x <= SCREEN_WIDTH_IN_BLOCKS) {
      this.domElement.style.display = 'none';
    } else {
      this.domElement.display = 'initial';
      this.rendered = true;
    }
    this.horizontalOffset = 0;
    this.verticalOffset = 0;
    this.standingOn = 0;
    this.topSpeed = 0.25;
    // Inverse speed value: patrol interval refers to how many game cycles pass between movement impulses:
    this.patrolInterval = 10;
    // patrol interval ticker:
    this.patrolTick = 0;
    this.xSpeed = 0;
    this.ySpeed = 0;
    // This will eventually be used to kill the baddie (or the player!):
    this.collisionStatus = 'clear';
    // Only you can change this:
    this.isDead = false;
    // Baddies stick around so you can watch them die, but we say they're dying so they can't harm you while they perish:
    this.isDying = false;
    // DeathLoops! A value for how many cycles the engine should keep your sprite around for to watch you die:
    this.deathLoops = 20;
    // For future games:
    this.movementScript = null;
    // Movement obstructions checker - record the last x-value that movement was attempted from:
    this.lastMoveAttemptStart = null;
    // Also record the starting height of the previous jump:
    this.lastJumpInitialHeight = null;
    this.xObstructions = 0;
    // Attack control section:
    this.isAttacking = false;
    this.defaultAnimationWidth = 1.5; // This value determines what attackRange gets set to when it isn't zero.
    this.attackRange = 0; // For animation location control
    this.attackRadius = 0; // For combat calculations
    // Image control for baddie attack animation:
    this.attackAnimation = document.createElement('img');
    this.attackAnimation.id = `${this.serialNum}-attack`;
    this.attackCountdown = 0;
  }

  // Baddie Methods: First, Render. Then, fall. Then jump... THEN ANNIHILIATE!!!

  // Control Rendering: The baddy is told what columns are visible and renders itself accordingly.
  handleRender = (range, horizontalOffset, verticalOffset) => {
    // if baddie is within render range, set render to true, then call horizontal translator for positioning:
    // OR condition extends their render range after initial rendering so they don't disappear when they reach the edge,
    // but move satisfyingly out of frame:
    if (
      (this.x >= range[0] - 1 &&
        this.x <= range[1] + 1 &&
        this.hasBeenRendered) ||
      (this.x >= range[0] && this.x <= range[1])
    ) {
      this.domElement.style.display = 'initial';
      this.rendered = true;
      // Have you ever been experienced? This will make physics work once you see a baddie for the first time:
      this.hasBeenRendered = true;
      this.horizontalTranslate(horizontalOffset);
    } else {
      this.domElement.style.display = 'none';
      this.rendered = false;
    }
    // VERTICAL RENDERING DETERMINATION:
    if (
      this.y < verticalOffset ||
      this.y > verticalOffset + SCREEN_HEIGHT_IN_BLOCKS
    ) {
      this.domElement.style.display = 'none';
      this.rendered = false;
    } else if (
      this.x >= range[0] - 1 &&
      this.x <= range[1] + 1 &&
      this.hasBeenRendered
    ) {
      this.domElement.style.display = 'initial';
      this.rendered = true;
    }
  };

  // Horizontal and Vertical Translation methods are next:

  horizontalTranslate(horizontalOffset) {
    // as the player moves through the world, move bad-guy elements to keep their position relative to everything else:
    this.horizontalOffset = horizontalOffset;
    this.domElement.style.left = `${
      (this.x - this.horizontalOffset) * PLAYER_WIDTH
    }px`;
    if (this.isAttacking)
      this.attackAnimation.style.left = `${
        (this.attackRange - this.horizontalOffset) * PLAYER_WIDTH
      }px`;
  }

  verticalTranslate = (verticalOffset) => {
    this.verticalOffset = verticalOffset;
    this.domElement.style.bottom = `${
      (this.y - verticalOffset) * PLAYER_WIDTH
    }px`;
    if (this.isAttacking)
      this.attackAnimation.style.bottom = `${
        (this.y - this.verticalOffset) * PLAYER_WIDTH
      }px`;
  };

  // Run the patrol method every engine cycle. Patrol will first tick off an internal counter (movement every 5 engine cycles),
  // then determine where a baddie is in terms of his patrol route, then move then reset the counter.
  patrol() {
    // You can't patrol if you're dying, and you also have to have been rendered at least once:
    if (!this.isDying && this.hasBeenRendered) {
      // Add a tick:
      this.patrolTick += 1;
      // If it's time to move then we enter our first block, and reset the ticker:
      if (this.patrolTick === this.patrolInterval) {
        // Reset jump height history if movement has been successful:
        if (!this.verifyXObstruction()) this.lastJumpInitialHeight = null;
        this.domElement.classList.add('baddie-moving');
        this.patrolTick = 0;
        // If you've already jumped and you're still stuck, turn around:
        if (this.verifyYObstruction() && this.verifyXObstruction()) {
          // depending on which way you're facing, move the other way:
          this.facing === 'right' ? this.moveLeft() : this.moveRight();
          // Resent jump evaluator:
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
      }
    }
  }

  moveRight() {
    this.facing = 'right';
    this.domElement.style.transform = 'rotateY(0deg)';
    this.xSpeed = this.topSpeed;
    this.lastMoveAttemptStart = this.x;
  }

  moveLeft() {
    this.facing = 'left';
    this.domElement.style.transform = 'rotateY(180deg)';
    this.xSpeed = -this.topSpeed;
    this.lastMoveAttemptStart = this.x;
  }

  // Jump! To be used in case a baddie gets stuck:
  jump() {
    if (
      this.y <= SCREEN_HEIGHT / PLAYER_WIDTH - 1 &&
      this.standingOn != 0 &&
      Number.isInteger(this.y)
    ) {
      this.ySpeed = 0.6875;
      this.lastJumpInitialHeight = this.y;
    }
  }

  // Verify obstruction: If you're trying to leave from the same place as your last attempt was made from, you are stuck:
  verifyXObstruction() {
    if (this.hasBeenRendered) return this.x === this.lastMoveAttemptStart;
  }

  verifyYObstruction() {
    if (this.hasBeenRendered) return this.y === this.lastJumpInitialHeight;
  }

  // Handle Collision: Like the player class, baddies will register collisions they're involved in:
  handleCollisions() {
    if (this.collisionStatus !== 'clear') {
      // Forward thinking here: when HP are introduced there will be more options here, and the collision status
      // is the key (status should be the name of a type of attack, or better still an attack object with a name and a damage amount!)
      this.handleDeath();
    }
  }

  // Death - A baddie's final moments are his finest:
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
      this.domElement.style.width = `${PLAYER_WIDTH}px`;
      this.domElement.style.height = `${PLAYER_WIDTH}px`;
      this.domElement.style.zIndex = 100;
      // Countdown to sprite removal:
      this.deathLoops -= 1;
    } else {
      this.isDying = false;
      this.isDead = true;
      this.root.removeChild(this.domElement);
    }
    if (this.attackAnimation) {
      this.haltAttack();
    }
  }

  // Baddie Class attack methods:

  attack(attackType) {
    // set attacking to true:
    this.isAttacking = true;
    // attack range will represent the ABSOLUTE x value of the attack's animation, such that anything between that and you is hit:
    // Deprecation in progress:
    this.attackRange =
      this.facing === 'right'
        ? this.x + this.defaultAnimationWidth
        : this.x - this.defaultAnimationWidth;
    // Add attack animation:
    this.attackAnimation.src = `./assets/effects/animations/${attackType}.gif`;
    // set width of attack animation:
    this.attackAnimation.style.width = `${this.attackRadius * PLAYER_WIDTH}px`;
    // set display to visible and ensure prominence with z-index value:
    this.attackAnimation.style.zIndex = 10;
    this.attackAnimation.style.bottom = `${
      (this.y - this.verticalOffset) * PLAYER_WIDTH
    }px`;
    this.attackAnimation.className = 'attack';
    // Position attack animation (rightward orientation first):
    if (this.facing === 'right') {
      // Horizontal offset is introduced into the animation here since the animation is the offset (non-absolute) position:
      this.attackAnimation.style.left = `${
        (this.attackRange - this.horizontalOffset) * PLAYER_WIDTH
      }px`;
      this.attackAnimation.style.transform = 'rotateY(180deg)';
      // Leftward orientation and positioning:
    } else {
      this.attackAnimation.style.transform = 'rotateY(0deg)';
      // ensure attack animation is rendered as originating from the edge of the player's sprite:
      this.attackAnimation.style.left = `${
        (this.attackRange - this.horizontalOffset + (1 - this.attackRadius)) *
        PLAYER_WIDTH
      }px`;
    }
    this.root.appendChild(this.attackAnimation);
  }

  advanceAttackCountdown() {
    // If attack is counting down that means baddie is in the state of attacking:
    if (this.attackCountdown > 0) {
      // begin cooling down:
      this.attackCountdown -= 1;
      // calculate attack Range (your position +/- 1)
      this.attackRange =
        this.facing === 'right'
          ? this.x + this.defaultAnimationWidth
          : this.x - this.defaultAnimationWidth;
      // render attack animation in the appropriate position:
      this.facing === 'right'
        ? (this.attackAnimation.style.left = `${
            (this.attackRange - this.horizontalOffset) * PLAYER_WIDTH
          }px`)
        : (this.attackAnimation.style.left = `${
            (this.attackRange -
              this.horizontalOffset +
              (1 - this.attackRadius)) *
            PLAYER_WIDTH
          }px`);
      this.attackAnimation.style.bottom = `${
        (this.y - this.verticalOffset) * PLAYER_WIDTH
      }px`;
      // make sure there is an attack animation before attempting to reset it!
    } else if (this.isAttacking) {
      // if the countdown expires, halt the attack:
      this.haltAttack();
    }
  }

  // Deactivate attack: the scram function to cancel attacks fast - NOTE: this doesn't affect cooldowns, it just stops attacks.
  haltAttack() {
    if (this.isAttacking) {
      this.root.removeChild(this.attackAnimation);
    }
    this.isAttacking = false;
    this.attackRange = 0;
    this.attackRadius = 0;
  }
}
