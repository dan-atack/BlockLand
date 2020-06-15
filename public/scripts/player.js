// The Player Class! You'll start out as a little sprite and maybe eventually you'll be able to move. If you're good.
// Addendum: Who would have thought moving would be so hard!
class Player {
  constructor(root, xStart, yStart) {
    this.root = root;
    this.x = xStart;
    this.y = yStart;
    this.gridX = Math.floor(xStart);
    this.gridY = Math.floor(yStart);
    this.facing = 'right';
    this.domElement = document.createElement('img');
    this.domElement.src = './assets/sprites/player.png';
    this.domElement.style.left = `${this.x * PLAYER_WIDTH}px`;
    this.domElement.style.bottom = `${this.y * PLAYER_WIDTH}px`;
    this.position = `${this.x},${this.y}`;
    this.id = 'player';
    this.domElement.id = 'player';
    this.domElement.className = 'player';
    root.appendChild(this.domElement);
    // We'll keep track of the horizontal offset here to regulate the player's movement animation so you don't move off screen:
    this.horizontalOffset = 0;
    // The type of block you are standing on will inform your movement over it
    this.standingOn = 0;
    // The medium you're in will affect your movement (air is normal, water will be slower)
    this.medium = { id: '000', name: 'Air', properties: ['permeable'] };
    // Collision status will record your interactions with other sprites (AKA baddies):
    this.collisionStatus = 'clear';
    this.topSpeed = 0.25;
    // Movement handling now in the form of speed requests, which get handled by the physics object in the engine:
    this.xSpeed = 0;
    this.ySpeed = 0;
    // Let's RPG it up a bit!
    this.experience = 0;
    this.isDead = false; // That's a bit morbid, isn't it?
    // Location Display Updaters:
    this.displayPlayerStandingOn = playerStandingOnBlockType;
    // Display medium (water and such):
    this.displayPlayerMedium = playerStandingInMedium;
    // COMBAT ZONE - Player attack status and cooldown:
    this.isAttacking = false;
    this.attackRange = 0;
    // Experimental upgraded combat system test:
    this.attackRadius = 0;
    // We'll keep the attack animation here to make it easier to render/de-render:
    this.attackAnimation = document.createElement('img');
    this.root.appendChild(this.attackAnimation);
    this.attackCountdown = 0;
  }

  // Player methods!
  // Movement responders come first, taking keydown inputs and translating to physics module impulse requests:

  handlePlayerMovement = (event) => {
    // Adding one reference to the game's engine here:
    if (thomas.gameOn) {
      // Relocate the blockade check?! YES.
      switch (event.code) {
        case 'ArrowLeft':
          // Cancel attacks when you turn around:
          if (this.facing === 'right' && this.isAttacking) {
            this.isAttacking = false;
            this.attackRange = 0;
            this.attackRadius = 0;
            this.attackAnimation.style.display = 'none';
          }
          // face the appropriate direction:
          this.facing = 'left';
          this.domElement.style.transform = 'rotateY(180deg)';
          this.xSpeed = -this.topSpeed;
          break;
        case 'ArrowRight':
          // Cancel attacks when you turn around:
          if (this.facing === 'left' && this.isAttacking) {
            this.isAttacking = false;
            this.attackRange = 0;
            this.attackRadius = 0;
            this.attackAnimation.style.display = 'none';
          }
          this.facing = 'right';
          this.domElement.style.transform = 'rotateY(0deg)';
          this.xSpeed = this.topSpeed;
          break;
        case 'ArrowUp':
          // If you're not at the top of the board, and you're not standing on air (disable second and third conditions to allow flight):
          if (
            this.y <= SCREEN_HEIGHT / PLAYER_WIDTH - 1 &&
            this.standingOn != 0 &&
            Number.isInteger(this.y)
          ) {
            this.ySpeed = 0.6875;
          }
          break;
        case 'ArrowDown':
          // if you're not at the bottom you can move down...
          if (!(this.y == 0)) {
            this.ySpeed = -0.25;
          }
          break;
        // Key responder for spacebar activates attack sequence:
        case 'Space':
          this.clawAttack();
          break;
      }
    }
  };

  // Attack method: the general attack method takes care of the attack's paperwork, being requested by a specific attack type:

  attack(attackType) {
    // set attacking to true:
    this.isAttacking = true;
    // attack range will represent the ABSOLUTE x value of the attack's kill zone, such that anything between that and you is hit:
    // Deprecation in progress:
    this.attackRange = this.facing === 'right' ? this.x + 1 : this.x - 1;
    // set width of attack animation:
    this.attackAnimation.style.width = `${this.attackRadius * PLAYER_WIDTH}px`;
    // set display to visible and ensure prominence with z-index value:
    this.attackAnimation.style.zIndex = 10;
    this.attackAnimation.style.display = 'initial';
    this.attackAnimation.style.bottom = `${this.y * PLAYER_WIDTH}px`;
    this.attackAnimation.className = 'attack';
    this.attackAnimation.id = 'attack';
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
    // Add attack animation:
    this.attackAnimation.src = `./assets/effects/animations/${attackType}.gif`;
  }

  // Specific attacks are linked to keys and contain only the specific info needed for a particular attack:

  clawAttack() {
    if (this.attackCountdown === 0) {
      // NOTE ON ATTACK RANGE: When you're facing to the right, add one to your position when factoring in attack radii
      // Since your position is counted starting from the leftmost edge!
      this.attackRadius = 0.6;
      this.attackCountdown = 10;
      // then call the general purpose attack function, and tell it which animation to use:
      this.attack('slash');
    }
  }

  // Advance countdown: Reduce the counter and update attack range based on player's current position;
  // when countdown reaches zero remove attack animation and radius:
  // NOTE: Turning around cancels a regular attack (see movement responder rules):
  advanceAttackCountdown() {
    // IF attack is cooling down that means you are in the state of attacking:
    if (this.attackCountdown > 0) {
      // begin cooling down:
      this.attackCountdown -= 1;
      // calculate attack Range (your position +/- 1)
      this.attackRange = this.facing === 'right' ? this.x + 1 : this.x - 1;
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
      this.attackAnimation.style.bottom = `${this.y * PLAYER_WIDTH}px`;
      // make sure there is an attack animation before attempting to reset it!
    } else if (this.attackAnimation) {
      // current attack is replacing isattacking to switch between attack moves:
      this.isAttacking = false;
      this.attackRange = 0;
      this.attackRadius = 0;
      this.attackAnimation.src = '';
    }
  }

  // And down at the bottom we have the method for horizontal dom element translation, distinct from regular motion:

  horizontalTranslate(horizontalOffset) {
    // as the player moves through the world, the player's x value will keep an absolute frame of reference,
    // but the dom element must stay centered, so it will be translated. Subracting the h offset makes it
    // so that your character appears further to the left than their absolute position suggests...
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

  // Player Vital Display Functions:

  updateStandingOnDisplay(columns) {
    this.displayPlayerStandingOn.innerText = `Standing on block type: ${this.standingOn.name}`;
  }

  // And a function to tell what medium you're in (basically air or water are your options at the moment):
  determineMedium(columns) {
    this.medium = columns.blockTypeDetector(this.gridX, this.y);
    // Show the first word of the name of the medium you're in (excluding air):
    if (this.medium.name.split('_').length > 1) {
      this.displayPlayerMedium.innerText = `Player is in ${
        this.medium.name.split('_')[0]
      }`;
    } else {
      this.displayPlayerMedium.innerText = '';
    }
  }

  // Check for death:
  checkForDeath() {
    // Check for terrain death: if what you're ON or what you're IN is lethal, it's a terrain death:
    if (
      (this.standingOn.properties.length > 0 &&
        this.standingOn.properties.includes('lethal')) ||
      (this.medium.properties.length > 0 &&
        this.medium.properties.includes('lethal'))
    ) {
      this.isDead = true;
      this.experience = 0;
      this.displayPlayerStandingOn.innerText = `Player has been killed by ${this.standingOn.name}!`;
      // Player's collision status will be modified by the Engine (which sort of acts as the state here I suppose) and then
      // the player itself will determine what happens based on that. A healthy and confusion-free division of tasks!
    } else if (this.collisionStatus != 'clear') {
      this.isDead = true;
      this.experience = 0;
      this.displayPlayerStandingOn.innerText = `Player has been killed by ${this.collisionStatus}!`;
      console.log('I am killed!');
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
