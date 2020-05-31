// The Player Class! You'll start out as a little sprite and maybe eventually you'll be able to move. If you're good.
// Addendum: Who would have thought moving would be so hard!
class Player {
  constructor(root, xStart, yStart) {
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
    // Movement handling now in the form of impulse values, largely handled by the physics object now:
    this.xSpeed = 0;
    this.ySpeed = 0;
    // Let's RPG it up a bit!
    this.experience = 0;
    this.isDead = false; // That's a bit morbid, isn't it?
    // Location Display Updaters:
    this.displayPlayerStandingOn = playerStandingOnBlockType;
    // Display medium (water and such):
    this.displayPlayerMedium = playerStandingInMedium;
  }

  // Player methods!
  // Movement responders come first, now bundled into one mega function (but with switch cases, to mitigate the chunkiness):

  handlePlayerMovement = (event) => {
    // Adding one reference to the game's engine here:
    if (thomas.gameOn) {
      // Relocate the blockade check?! YES.
      switch (event.code) {
        case 'ArrowLeft':
          // face the appropriate direction:
          this.facing = 'left';
          this.domElement.style.transform = 'rotateY(180deg)';
          this.xSpeed = -this.topSpeed;
          break;
        case 'ArrowRight':
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
      }
    }
  };

  // And down at the bottom we have the method for horizontal dom element translation, distinct from regular motion:

  horizontalTranslate(horizontalOffset) {
    // as the player moves through the world, the player's x value will keep an absolute frame of reference,
    // but the dom element must stay centered, so it will be translated. Subracting the h offset makes it
    // so that your character appears further to the left than their absolute position suggests...
    this.horizontalOffset = horizontalOffset;
    this.domElement.style.left = `${
      (this.x - horizontalOffset) * PLAYER_WIDTH
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
