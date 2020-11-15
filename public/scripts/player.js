// The Player Class! You'll start out as a little sprite and maybe eventually you'll be able to move. If you're good.
// Addendum: Who would have thought moving would be so hard!
class Player extends Sprite {
  constructor(root, xStart, yStart) {
    super(root, xStart, yStart);
    this.domElement.src = './assets/sprites/player.png';
    this.domElement.style.left = `${this.x * PLAYER_WIDTH}px`;
    this.domElement.style.bottom = `${this.y * PLAYER_WIDTH}px`;
    this.position = `${this.x},${this.y}`;
    this.domElement.zIndex = 1;
    this.id = 'player';
    this.domElement.id = 'player';
    this.domElement.className = 'player';
    // MOVEMENT 2.0: Key responders set movement requests, which are converted by movement-handler functions to x/y speeds:
    this.movingRight = false;
    this.movingLeft = false;
    this.jumping = false;
    this.crouching = false;
    // Let's RPG it up a bit!
    this.experience = 0;
    // COMBAT ZONE :
    this.attackAnimation.id = 'player-attack';
    // Player will keep score of baddies killed for objective-scoring purposes (this is prop drilling):
    this.baddiesDestroyed = 0;
    this.baddiesKilledThisInning = 0;
    // A list of the dudes you've killed:
    this.baddieDogTags = [];
  }

  // Movement responder comes in two parts: Part I - Keydown responder series:

  handlePlayerKeydowns = (event) => {
    // Adding one reference to the game's engine here:
    if (app.engine.gameOn) {
      switch (event.code) {
        // Now with paired switch cases to allow WASD controls!
        case 'ArrowLeft':
        case 'KeyA':
          this.movingLeft = true;
          break;
        case 'ArrowRight':
        case 'KeyD':
          this.movingRight = true;
          break;
        case 'ArrowUp':
        case 'KeyW':
          this.jumping = true;
          break;
        case 'ArrowDown':
        case 'KeyS':
          this.crouching = true;
          break;
        // Key responder for spacebar activates attack sequence:
        case 'Space':
          this.clawAttack();
          break;
      }
    }
  };

  // Movement Responses Part II: Keyup responder (cancels keydown effects):

  handlePlayerKeyups = (event) => {
    switch (event.code) {
      case 'ArrowLeft':
      case 'KeyA':
        this.movingLeft = false;
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.movingRight = false;
        break;
      case 'ArrowUp':
      case 'KeyW':
        this.jumping = false;
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.crouching = false;
        break;
      // No case needed yet for spacebar handler, since it still calls the attack function directly!
    }
  };

  // Final stage of the new movement process: Movement Request Handler calls movement functions each game cycle
  // based on what keys are still depressed vs keyed up. Should result in smoother jumping and responsiveness:
  handleMovementRequests = () => {
    // For each type of movement, check if it's requested:
    if (this.movingRight) this.moveRight();
    if (this.movingLeft) this.moveLeft();
    if (this.jumping) this.jump();
    if (this.crouching) {
      this.crouch();
    } else {
      this.standUp();
    }
  };

  // Only the player has the ability (not to mention the motivation) to want to crouch/stand up:

  crouch() {
    // It seems a logical thing that a raptor should be able to crouch...
    if (!(this.y == 0)) {
      this.domElement.style.height = `${PLAYER_WIDTH * 0.6}px`;
    }
  }

  standUp() {
    this.domElement.style.height = `${PLAYER_WIDTH}px`;
  }

  // Specific attacks are linked to keys and contain the info needed for a particular attack to be rendered:

  clawAttack() {
    if (this.attackCountdown === 0) {
      // Set attacking to true and set all other initial attack values:
      this.attackRadius = 0.5;
      this.attackCountdown = 10;
      // then call the attack rendering function, and tell it which animation to use:
      this.attack('slash');
    }
  }

  // Figure out what medium you're in (basically air or water are your options at the moment):
  determineMedium(columns) {
    this.medium = columns.blockTypeDetector(this.gridX, this.y);
  }

  checkForDeath() {
    // Check for terrain death: if what you're ON or what you're IN is lethal, it's a terrain death:
    if (
      (this.standingOn.properties.length > 0 &&
        this.standingOn.properties.includes('lethal')) ||
      (this.medium.properties.length > 0 &&
        this.medium.properties.includes('lethal'))
    ) {
      this.handleDeath('terrain');
      // Otherwise, if your collision status isn't clear... well...
    } else if (this.collisionStatus != 'clear') {
      this.handleDeath('collision');
    }
  }

  // Carry out death procedures:
  handleDeath(type) {
    this.isDead = true;
    // You don't have to lose EVERYTHING when you die:
    if (this.experience > 0) this.experience--;
    // But you do have to stop moving and attacking:
    this.movingRight = false;
    this.movingLeft = false;
    this.jumping = false;
    this.crouching = false;
    this.xSpeed = 0;
    this.ySpeed = 0;
    // Stop your attack animation if it was in progress at the moment of death:
    if (this.attackAnimation) {
      this.haltAttack();
    }
    // Update text in the sidebar status indicator based on type of death:
    switch (type) {
      case 'collision':
        const phrase = this.collisionStatus.split('-').join(' ');
        document.getElementById('playerStandingOnBlockType').innerText = `Player has been killed by ${phrase}!`;
        break;
      case 'terrain':
        document.getElementById('playerStandingOnBlockType').innerText = `Player has been killed by ${this.standingOn.name}!`;
        break;
    }
  }

  // And since this is video games and not real life, resurrect the player when the restart button is pressed:
  resurrect() {
    // Resurrection: first, undeclare your legally dead status:
    this.isDead = false;
    // Next, eliminate player statuses related to death:
    this.standingOn = blocktionary[0];
    this.medium = blocktionary[0];
    this.collisionStatus = 'clear';
  }
}
