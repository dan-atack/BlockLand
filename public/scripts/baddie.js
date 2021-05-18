// The Highly Anticipated Bad Doods have arrived!

class Baddie extends Sprite {
  // Just like the player class! Oh boy, it's like they're RELATED or something >:-(
  // New to the bad guys since they're not unique: type (for which sprite to render) and serial number (for the engine)
  // xRange is an array of the start/stop values of the baddie's territory.
  constructor(root, xStart, yStart, baddieType, baddieSerial, xRange, hitpoints=3) {
    // Presumes that all enemies start off the initial screen; corrected further below after DOM element is appended to document:
    super(root, xStart, yStart, hitpoints);
    this.type = baddieType;
    this.serialNum = baddieSerial;
    // X range is the territory a baddie will patrol:
    this.xRange = xRange;
    // A Baddie's physics must not start until he has been rendered, so we keep track of when that happens:
    this.hasBeenRendered = false;
    // Dynamic baddie types are ON the menu!! Baddie ID codes start at 1001 so they can be entered as numbers OR strings:
    this.domElement.src = `./assets/sprites/baddie_${baddieType}.png`;
    this.domElement.style.zIndex = 100;
    // Player width is still the standard unit of reference... for NOW!
    this.domElement.style.left = `${this.x * PLAYER_WIDTH}px`;
    this.domElement.style.bottom = `${this.y * PLAYER_WIDTH}px`;
    this.domElement.id = `baddie_${baddieSerial}`;
    this.id = `baddie_${baddieSerial}`;
    // Initial CSS image class is baddie-trans, which is short for 'translation-mode,' used for lockstep motion with passing terrain:
    this.domElement.classList.add('baddie');
    this.domElement.classList.add('baddie-trans');
    // Patrol interval refers to how many game cycles pass between movement impulses (differs per baddie type)
    this.patrolInterval = badDictionary[`baddie_${this.type}`].patrolInterval;
    this.topSpeed = badDictionary[`baddie_${this.type}`].topSpeed;
    // Patrol interval ticker:
    this.patrolTick = 0;
    // This is the amount of game frames to show the running animation before resetting to the standing gif.
    this.runningGifMaxFrames = 4;
    this.runningFramesShown = 0;
    // Range within which baddie can 'see' the player:
    this.lineOfSight = 4;
    if (this.type === 1005) this.lineOfSight = 7; // Bugs sense you from further away!
    this.enemySpotted = false; // This variable will control whether to attack, and is set by the lookAhead method called each round.
    // Baddies stick around so you can watch them die, but we say they're dying so they can't harm you while they perish:
    this.isDying = false;
    // DeathLoops! A value for how many cycles the engine should keep your sprite around for to watch you die:
    this.deathLoops = 20;
    // For future games:
    this.movementScript = null;
    // Also record the starting height of the previous jump:
    this.lastJumpInitialHeight = null;
    this.xObstructions = 0;
    // Image control for baddie attack animation:
    this.attackAnimation.id = `${this.serialNum}-attack`;
  }

  // Control Rendering: The baddy is told what columns are visible and renders itself accordingly.
  // Translation will be handled separately.
  handleRender = (horizontalRange, verticalRange) => {
    let withinHorizontalRange = false;
    let withinVerticalRange = false;
    // For first-time renders, use the proper range so baddies don't appear before the floor beneath them is brought into being:
    if (!this.hasBeenRendered) {
      withinHorizontalRange =  this.x >= horizontalRange[0] && this.x <= horizontalRange[1]
      withinVerticalRange = this.y >= verticalRange[0] && this.y <= verticalRange[1]
    } else {
      // However, once a baddie is rendered, extend render range by 1 so baddies don't disappear abruptly when they move off screen:
      withinHorizontalRange = (this.x >= horizontalRange[0] - 1 && this.x <= horizontalRange[1] + 1)
      withinVerticalRange = (this.y >= verticalRange[0] - 1 && this.y <= verticalRange[1] + 1)
    }
    // If a Baddie is within both the horizontal AND vertical range, render them (and set has-been-rendered flag).
    if (withinHorizontalRange && withinVerticalRange) {
      this.render()
      // If baddie has been damaged, also show his HP bar:
      if (this.currentHP < this.maxHP) this.renderHealthbar();
      this.hasBeenRendered = true;
    } else {
      this.deRender();
    }
  };

  // Custom derender job: gets rid of more mess than the rest!
  deRender = () => {
    if (this.rendered) {
      this.root.removeChild(this.domElement);
      this.rendered = false;
      // Specifically, if a baddie has a healthbar it needs to be cleaned up whenever the baddie goes away.
      if (this.healthbar) {
        this.healthbar.deRender();
        this.healthbar = null;
      }
      if (this.currentDialogue) this.cleanupDialogue();
    }
  }

  // Run the patrol method every engine cycle. Patrol will first tick off an internal counter (movement every 5 engine cycles),
  // then determine where a baddie is in terms of his patrol route, then move then reset the counter.
  patrol() {
    // You can't patrol if you're dying, and you also have to have been rendered at least once:
    if (!this.isDying && this.hasBeenRendered) {
      // Add a tick:
      this.patrolTick += 1;
      // If it's time to move then we enter our action block, and reset the ticker:
      if (this.patrolTick === this.patrolInterval) {
        // For baddies with an attack, activate that attack if the player is in view:
        if (this.enemySpotted) {
          switch (this.type) {
            case 1003:
              this.electricityAttack();
              break;
            case 1004:
              this.gunshotAttack();
              break;
            case 1005:
              this.bugAttack();
              break;
            default:
              // No attack is the default behaviour for human baddies.
          }  
        }
        // Reset jump height history if movement has been successful:
        if (!this.verifyXObstruction()) this.lastJumpInitialHeight = null;
        this.domElement.classList.add('baddie-moving');
        this.patrolTick = 0;
        // If you've already jumped and you're still stuck, turn around:
        if (this.verifyYObstruction() && this.verifyXObstruction()) {
          // depending on which way you're facing, move the other way:
          this.facing === 'right' ? this.movingLeft = true : this.movingRight = true;
          this.facing === 'right' ? this.movingRight = false : this.movingLeft = false;
          // Resent jump evaluator:
          this.lastJumpInitialHeight = null;
          // If the baddie encounters an obstacle, jump:
        } else if (this.verifyXObstruction()) {
          this.jumping = true;
        }
        // Next determine the direction of movement. We'll do rightwards first:
        if (this.facing === 'right') {
          // Final condition: if you're going right, where are you now? If not at the right edge, keep going (add to x):
          if (this.x < this.xRange[1]) {
            this.movingRight = true;
            this.movingLeft = false;
          } else {
            // If you ARE at the far right, turn around and move leftwards by reducing x:
            this.movingLeft = true;
            this.movingRight = false;
          }
          // Leftward motion:
        } else {
          // Leftward edge detection - the mirror image:
          if (this.x > this.xRange[0]) {
            this.movingLeft = true;
            this.movingRight = false;
          } else {
            this.movingRight = true;
            this.movingLeft = false;
          }
        }
      }
    }
  }

  // Given the player's coords, return true if the player is within the line of sight and on the same level vertically
  lookAhead = (playerCoords) => {
    this.enemySpotted = false;  // Reset this flag to false by default.
    if (this.facing === 'right') {  // To be 'seen' the baddie must be downstream (to the left) and within range
      if (this.x < playerCoords[0] && this.x + this.lineOfSight >= playerCoords[0] && this.gridY === playerCoords[1]) {
        this.enemySpotted = true;
      } 
    } else if (this.facing === 'left') {  // To be seen the baddie must be upstream (to the right of player), and within range
      if (this.x > playerCoords[0] && this.x - this.lineOfSight <= playerCoords[0] && this.gridY === playerCoords[1]) {
        this.enemySpotted = true;
      }
    }
  }

  // The baddie version of this method comes with a deactivation function, so they don't run forever:
  handleMovementRequests = () => {
    // For each type of movement, check if it's requested:
    if (this.movingRight) {
      this.moveRight();
      this.movingRight = false;
    }
    if (this.movingLeft) {
      this.moveLeft();
      this.movingLeft = false;
    }
    if (this.jumping) {
      this.jump();
      this.jumping = false;
    }
  };

  updateImage = () => {
    const moving = this.movingLeft || this.movingRight  // Do you have momentum right now?
    if (moving && this.runningFramesShown === 0) {  // If moving but have not yet shown any running frames, you have just started to run.
      // Make sure to use the right sprite for either the player of whatever baddie we're supposed to see:
      this.domElement.src = `./assets/sprites/${this.id === 'player' ? 'player' : `baddie-${this.type}`}-running.gif`;
      this.runningFramesShown += 1;
    }
    else if (!moving && this.runningFramesShown === this.runningGifMaxFrames) { // If you don't have momentum but are 'running' then you have just stopped:
      this.displayStandingGif();
      this.runningFramesShown = 0;
    }
  }

  displayStandingGif = () => {
    this.domElement.src = `./assets/sprites/${this.id === 'player' ? 'player' : `baddie-${this.type}`}-standing.gif`;
  }

  // Verify obstruction: If one is trying to leave from the same place as one's last attempt was made from, one is stuck:
  verifyXObstruction() {
    if (this.hasBeenRendered) return this.x === this.lastMoveAttemptStart;
  }

  verifyYObstruction() {
    if (this.hasBeenRendered) return this.y === this.lastJumpInitialHeight;
  }

  // Checked once per cycle, this function will ring true if the baddie falls into something lethal:
  checkForTerrainDeath = () => {
    const inLava = this.standingOn.properties.includes('lethal');
    return inLava
  }

  // Death - A baddie's final moments are his finest. Running this function means the baddie's isDying property is true:
  handleDeath() {
    // Engine can check a baddie for deathLoops and remove them when the counter reaches zero:
    if (this.deathLoops > 0) {        // Passing this condition means you're not quite dead yet.
      // Death of a baddie: baddie sprite is replaced by a gif of them dying which plays for a certain amount of game loops:
      if (this.deathLoops === 20) {   // Passing this condition means you've just started dying.
        this.isDying = true;
        if (this.type != 1005 ) {
          playSound(`baddie-death-${Math.floor(Math.random() * 4)}-sound`);   // Play one of four unique baddie death sounds!!!
        } else {  // Different sound plays for non-human baddie deaths:
          playSound(`bug-death-${Math.floor(Math.random() * 3)}-sound`);
        }
        
        this.domElement.src = `./assets/effects/animations/baddie-${this.type}-death.gif`;
        // ensure proper sprite orientation:
        this.facing === 'right'
          ? (this.domElement.style.transform = 'rotateY(0deg)')
          : 'rotate&(180deg)';
      }
      this.domElement.style.width = `${PLAYER_WIDTH}px`;
      this.domElement.style.height = `${PLAYER_WIDTH}px`;
      this.domElement.style.zIndex = 100;
      // Countdown to sprite removal:
      this.deathLoops -= 1;
    } else {                        // Passing THIS condition means that you are all-the-way dead. Goodbye.
      this.isDying = false;
      this.isDead = true;
      this.deRender();
    }
    if (this.attackAnimation) {     // Halt any ongoing attack animation/effect immediately when baddie starts to die.
      this.haltAttack();
    }
    if (this.currentDialogue) {     // Halt any ongoing dialogue bubbles immediately when baddie starts to die.
      this.cleanupDialogue();
    }
  }

  // Specific attacks info is fed into the general attack function:

  electricityAttack() {
    if (this.attackCountdown === 0) {
      this.attackRadius = 1.25;
      this.attackCountdown = 8;
      this.currentAttackDamage = 1;
      this.currentAttackKnockback = 0.75;
      // then call the general purpose attack function, and tell it which animation to use:
      this.attack('electricity');
      this.attackAnimation.classList.add('boss');
      playSound('electricity-sound');
    }
  }

  gunshotAttack = () => {
    this.attackRadius = 4;
    this.attackCountdown = 6;
    this.currentAttackDamage = 1;
    this.currentAttackKnockback = 0.75;
    this.attack('gunshot');
    playSound('gunshot-sound');
  }

  bugAttack = () => {
    this.attackRadius = 0.1;
    this.attackCountdown = 24;
    this.currentAttackDamage = 1;
    this.currentAttackKnockback = 0.5;
    this.attack('slash');
    playSound('bug-attack-sound');
  }

}
