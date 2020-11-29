// The Player Class! You'll start out as a little sprite and maybe eventually you'll be able to move. If you're good.
// Addendum: Who would have thought moving would be so hard!
class Player extends Sprite {
  constructor(root, xStart, yStart, hitpoints=3) {
    super(root, xStart, yStart, hitpoints);
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
    this.experience = 0;                    // the number of XP points you have collected
    this.level = 1;                         // the number of your current level
    this.requiredXP = 10;                   // the number of XP points needed for the next level
    this.previousLevelXp = 1;               // the number of XP points needed for your last level
    this.experienceGainedThisInning = 0;    // the number of XP points gained since your last death/mission accomplishment.
    this.levelsGainedThisInning = 0;        // the number of Levelups gained since your last death/mission accomplishment.
    this.perksList = [];                    // the list of perk objects the player benefits from.
    // COMBAT ZONE :
    this.attackAnimation.id = 'player-attack';
    // Player will keep score of baddies killed for objective-scoring purposes (this is prop drilling):
    this.baddiesDestroyed = 0;
    this.baddiesKilledThisInning = 0;
    // A list of the dudes you've killed:
    this.baddieDogTags = [];
    // Item/special status management:
    // Item Effect is a dictionary containing the property that is affected, how much it is affected, and for how long:
    this.itemEffect = {properties: [], value: 0, timeRemaining: 0};
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
      this.currentAttackDamage = 1;
      this.currentAttackKnockback = 0.25;     // Knockback is converted into kinetic motion (request)
      // then call the attack rendering function, and tell it which animation to use:
      this.attack('slash');
    }
  }

  // Figure out what medium you're in (basically air or water are your options at the moment):
  determineMedium(columns) {
    this.medium = columns.blockTypeDetector(this.gridX, this.y);
  }

  // Items and special statuses:
  pickupItem = (item) => {
    switch (item.type) {
      case 'health':
        if (this.currentHP < this.maxHP) {
          this.currentHP = Math.min(this.currentHP += item.power, this.maxHP);
        }
        break;
      case 'experience':
        this.experience += item.power;
        break;
      case 'steroids':
        // First, remove any previous special effect (including any steroids previously consumed):
        this.removeItemEffects();
        // Taking steroids makes you momentarily run faster and jump higher, by changing those properties for a set duration:
        this.itemEffect.properties = ['topSpeed', 'jumpImpulse'];
        this.itemEffect.value = item.power;
        this.itemEffect.timeRemaining = item.duration;
        this.itemEffect.properties.forEach((prop) => this[prop] += this.itemEffect.value);
        break;
    }
  }

  // Advance Item special status countdown (to regulate long-lasting effects)
  advanceItemStatusCounter = () => {
    if (this.itemEffect.timeRemaining > 0) {
      this.itemEffect.timeRemaining -= 1;
    } else {
      this.removeItemEffects();
    }
  }

  // Remove special status from an Item:
  removeItemEffects = () => {
    this.itemEffect.properties.forEach((prop) => this[prop] -= this.itemEffect.value);
    this.itemEffect = {properties: [], value: 0, timeRemaining: 0};
  }

  checkForDeath() {
    // Check for terrain death: if what you're ON or what you're IN is lethal, it's a terrain death:
    if (
      (this.standingOn.properties.length > 0 &&
        this.standingOn.properties.includes('lethal')) ||
      (this.medium.properties.length > 0 &&
        this.medium.properties.includes('lethal'))
    ) {
      this.currentHP = 0;
      this.handleDeath('terrain');
      }
    // Call Sprite-class collision-damage calculation method:
    this.handleCollisions();
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
    // Also, whatever special status you might have had is removed:
    this.removeItemEffects();
    // Stop your attack animation if it was in progress at the moment of death:
    if (this.attackAnimation) {
      this.haltAttack();
    }
  }

  // And since this is video games and not real life, resurrect the player when the restart button is pressed:
  resurrect() {
    // Resurrection: first, undeclare your legally dead status:
    this.isDead = false;
    // Next, eliminate player statuses related to death:
    this.standingOn = blocktionary[0];
    this.medium = blocktionary[0];
    this.damageRecieved = 0;
    this.currentHP = this.maxHP;
  }
}
