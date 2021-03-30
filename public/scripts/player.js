// The Player Class! Also known as 'the sprite that is you.'

class Player extends Sprite {
  constructor(root, xStart, yStart, hitpoints=3) {
    super(root, xStart, yStart, hitpoints);
    this.domElement.src = './assets/sprites/player-standing.gif';
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
    this.running = false;   // This boolean tracks when the player starts or stops running, to control animations.
    // Let's RPG it up a bit!
    this.justLeveledUp = false;   // Flag to act as an event for the Engine to pick up on and trigger visual effects for levelup.
    this.justDemoted = false;     // Flag to act as an event for the Engine to pick up on and trigger effects for a DEMOTION.
    this.experience = 0;                      // the number of XP points you have collected
    this.level = 1;                           // the number of your current level
    this.nextLevelXP = 10;                    // the number of XP points needed for the next level
    this.previousLevelsXP = [0];                 // records the XP costs of ALL previous levels attained in case of multi-level loss.
    this.experienceGainedThisInning = 0;      // the number of XP points gained since your last death/mission accomplishment.
    this.levelsGainedThisInning = 0;          // the number of Levelups gained since your last death/mission accomplishment.
    this.hpCheckpoint = this.maxHP;          // the amount of HP you will have when you respawn (updated at each mission checkpoint).
    this.skillsList = [skills.find((skill) => skill.id === 'BASIC')];    // the list of skill objects the player benefits from.
    this.skillsAvailable = 0;                 // calculated from the difference between your level and the length of your skills list.
    // SKILL RELATED ATTRIBUTES:
    this.intelligence = 100;                  // Raptors have an initial IQ of 100
    // COMBAT ZONE :
    this.attackAnimation.id = 'player-attack';
    this.clawAttackBaseDamage = 1;        // Each attack will have a base damage value that can be modified as the Player levels up.
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

  // Runs each cycle to determine what image to use based on the player's state of motion:
  updatePlayerImage = () => {
    const moving = this.movingLeft || this.movingRight  // Do you have momentum right now?
    if (moving && !this.running) {  // If you have momentum but have not yet declared running, you have just started to run:
      this.domElement.src = './assets/sprites/player-running.gif';
      this.running = true;
    }
    else if (!moving && this.running) { // If you don't have momentum but are 'running' then you have just stopped:
      this.domElement.src = './assets/sprites/player-standing.gif';
      this.running = false;
    }
  }

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
      this.attackCountdown = 6;
      this.currentAttackDamage = this.clawAttackBaseDamage + this.attackModifier;
      this.currentAttackKnockback = 0.25;     // Knockback is converted into kinetic motion (request)
      // then call the attack rendering function, and tell it which animation to use:
      this.attack('claw');
      playSound(`slash-${Math.floor(Math.random() * 3)}-sound`);  // Play one of three slash sound effects!
      const data = [this.root, this.x, this.y, this.horizontalOffset, this.verticalOffset, {id: 1000, text: '', type: 'announcement'}];
      makePopup(data);
    }
  }

  // Figure out what medium you're in (basically air or water are your options at the moment):
  determineMedium(columns) {
    this.medium = columns.blockTypeDetector(this.gridX, this.y);
  }

  // Items and special statuses:
  pickupItem = (item) => {
    playSound(`${item.type}-sound`); // all items play a sound when they get picked up.
    // Popup generator's data parameter needs a LOT of information:
    let popupData = [
      this.root,
      this.x,
      this.y,
      this.horizontalOffset,
      this.verticalOffset,
      {id: this.gridX + this.gridY, text: '', type: ''},
    ];

    switch (item.type) {
      case 'health':  // Determine how much HP you're allowed to increase by, then apply and announce:
        const increase = Math.min(this.currentHP + item.power, this.maxHP) - this.currentHP;
        this.currentHP += increase;
        popupData[5] = {id: this.gridX + this.gridY, text: `+${increase} HP`, type: 'announcement-health'};
        break;
      case 'experience':
        this.gainExperience(item.power);
        popupData[1] -= 2;  // Reposition text to be more centered over the player!
        popupData[5] = {id: this.gridX + this.gridY, text: `Gained ${item.power} experience!`, type: 'announcement-experience'};
        break;
      case 'steroids':
        this.handleTemporaryItem(item, ['jumpImpulse', 'topSpeed'] )
        popupData[1] -= 3;
        popupData[5] = {
            id: this.gridX + this.gridY,
            text: `SUPER STRENGTH FOR NEXT ${item.duration / 20} SECONDS!`,
            type: 'announcement-steroids',
            duration: 2,
        };
        break;
      case 'serum':
        this.handleTemporaryItem(item, ['attackModifier']);
        popupData[1] -= 3;
        popupData[5] = {
          id: this.gridX + this.gridY,
          text: `DOUBLE DAMAGE FOR ${item.duration / 20} SECONDS!`,
          type: 'announcement-steroids',
          duration: 2.5,
      };
    }
    makePopup(popupData);
  }

  // item = data from mission_data, props = list of Sprite properties affected (e.g. topSpeed, jumpImpulse, etc.)
  handleTemporaryItem = (item, props) => {  
    // First, remove any previous special effect (including any steroids previously consumed):
    this.removeItemEffects();
    this.itemEffect.properties = props;
    this.itemEffect.value = item.power;
    this.itemEffect.timeRemaining = item.duration;
    this.itemEffect.properties.forEach((prop) => this[prop] += this.itemEffect.value);
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

  // Reset HP, XP counters for the current 'inning' whenever a mission is completed:
  missionCheckpoint = () => {
    this.hpCheckpoint = this.currentHP; // 'Save' the current HP value, so that if you die this is what you respawn with.
    this.experienceGainedThisInning = 0;
    this.levelsGainedThisInning = 0;
  }

  // Detect levelups and manage values when they occur:
  checkForLevelUp = () => {
    if (this.experience >= this.nextLevelXP) {
      this.handleLevelUp();
    }
  }

  handleLevelUp = () => {
    playSound('levelup-sound');
    if (this.level === 1) {
      makeArrow([document.getElementById('sidebar')]);
    }
    this.justLeveledUp = true;
    const popupData = [
      this.root,
      this.x,
      this.y + 2,
      this.horizontalOffset,
      this.verticalOffset,
      {id: this.gridX + this.gridY, text: `LEVEL ${this.level + 1}`, type: 'announcement-levelup', duration: 2},
    ];
    makePopup(popupData);
    this.skillsAvailable += 1;
    this.level += 1;
    this.levelsGainedThisInning += 1;
    this.previousLevelsXP.push(this.nextLevelXP);
    // Cost of next level increases by ten percent times your current level - (your IQ points over 100)%:
    const xpModifier = (this.intelligence - 100) / 100;
    this.nextLevelXP += Math.floor((this.nextLevelXP * (1 + this.level / 10)) * (1 - xpModifier));
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
      playSound('lava-death-sound');
      this.currentHP = 0;
      this.handleDeath();
      }
    // Call Sprite-class collision-damage calculation method:
    this.handleCollisions();
  }

  // Carry out death procedures:
  handleDeath() {
    this.isDead = true;
    playSound('player-death-0-sound');
    this.domElement.src = './assets/sprites/player-dying.gif';    // replace sprite with death animation.
    if (
      !((this.standingOn.properties.length > 0 &&
        this.standingOn.properties.includes('lethal')) ||
      (this.medium.properties.length > 0 &&
        this.medium.properties.includes('lethal')))
    ) this.domElement.classList.add('dead-player');   // only add special CSS style if the death was not caused by lava.
    // Remove all experience and levels gained this inning (i.e. since the last checkpoint):
    this.experience -= this.experienceGainedThisInning;
    this.level -= this.levelsGainedThisInning;
    //  Roll back the list of previous levels' XP thresholds once per level lost:
    if (this.levelsGainedThisInning > 0)  {
      this.justDemoted = true;  // Alert the Engine that a demotion has occurred.
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
    this.domElement.src = './assets/sprites/player-standing.gif'; // restore default player image.
    this.domElement.classList.remove('dead-player');
    // Next, eliminate player statuses related to death:
    this.standingOn = blocktionary[0];
    this.medium = blocktionary[0];
    this.damageReceived = 0;
    this.currentHP = this.hpCheckpoint;   // No free HP from dying/respawning!
  }
}
