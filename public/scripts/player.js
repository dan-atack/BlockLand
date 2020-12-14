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
    this.experience = 0;                      // the number of XP points you have collected
    this.level = 1;                           // the number of your current level
    this.nextLevelXP = 10;                    // the number of XP points needed for the next level
    this.previousLevelsXP = [0];                 // records the XP costs of ALL previous levels attained in case of multi-level loss.
    this.experienceGainedThisInning = 0;      // the number of XP points gained since your last death/mission accomplishment.
    this.levelsGainedThisInning = 0;          // the number of Levelups gained since your last death/mission accomplishment.
    this.skillsList = [skills.find((skill) => skill.id === 'BASIC')];    // the list of skill objects the player benefits from.
    this.skillsAvailable = 0;                 // calculated from the difference between your level and the length of your skills list.
    // SKILL RELATED ATTRIBUTES:
    this.intelligence = 100;                  // Raptors have an initial IQ of 100
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
        this.gainExperience(item.power);
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

  // Gain Experience: No matter where it comes from, the Player Class can alter its own XP value, thank you very much:
  gainExperience = (exp) => {
    this.experience += exp;
    this.experienceGainedThisInning += exp;
    this.checkForLevelUp();
  }

  // Reset XP counters for the current 'inning' whenever a mission is completed:
  experienceCheckpoint = () => {
    this.experienceGainedThisInning = 0;
    this.levelsGainedThisInning = 0;
  }

  // Detect levelups and manage values when they occur:
  checkForLevelUp = () => {
    if (this.experience >= this.nextLevelXP) {
      this.skillsAvailable += 1;
      this.level += 1;
      this.levelsGainedThisInning += 1;
      this.previousLevelsXP.push(this.nextLevelXP);
      // Cost of next level increases by ten percent times your current level - (your IQ points over 100)%:
      const xpModifier = (this.intelligence - 100) / 100;
      this.nextLevelXP += Math.floor((this.nextLevelXP * (1 + this.level / 10)) * (1 - xpModifier));
    }
  }

  // Handle everything to do with gaining skills (skills are passed as a list of skill objects):
  gainSkills = (skills) => {
    if (skills.length > 0) {
      skills.forEach((skill) => {
        this[skill.attributeAffected] += skill.value;   // augment the appropriate attribute
        this.skillsAvailable -= 1;            // Last but certainly not least, reduce the amount of skills you can buy next time!
      })
    }
  }

  // Handle everything to do with LOSING a skill (processed one skill at a time):
  loseSkill = (skill) => {
    this[skill.attributeAffected] -= skill.value;
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
      this.handleDeath();
      }
    // Call Sprite-class collision-damage calculation method:
    this.handleCollisions();
  }

  // Carry out death procedures:
  handleDeath() {
    console.log(this.skillsAvailable);
    this.isDead = true;
    // Remove all experience and levels gained this inning (i.e. since the last checkpoint):
    this.experience -= this.experienceGainedThisInning;
    this.level -= this.levelsGainedThisInning;
    //  Roll back the list of previous levels' XP thresholds once per level lost:
    if (this.levelsGainedThisInning > 0)  {
      for (let i = 0; i < this.levelsGainedThisInning; i++) {
        this.nextLevelXP = this.previousLevelsXP.pop();
      }
    }
    // If you purchased a skill with a level that has been lost, remove the skill and whatever attribute boost is associated with it:
    if (this.skillsList.length > this.level) {
      const extraLevels = this.skillsList.length - this.level;
      // console.log("Losing ", extraLevels, " skills");
      for (let i = 0; i < extraLevels; i++) {
        this.loseSkill(this.skillsList.pop());
      }
    }
    // Finally, ensure that the Player doesn't have more skillsAvailable points than their level allows:
    this.skillsAvailable = this.level - this.skillsList.length;
    // Reset subtractors:
    this.experienceGainedThisInning = 0;
    this.levelsGainedThisInning = 0;
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
