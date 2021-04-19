// The Sprite is the most general Class of Entities that are capable of Movement.

class Sprite extends Entity {
  constructor(root, xStart, yStart, hitpoints=1) {
    super(root, xStart, yStart);
    // Essential characteristics of Sprites which also do not require immediate inputs (or can be derived from them):
    this.gridX = xStart;
    this.gridY = yStart;
    this.facing = 'right';
    this.isDead = false; // That's a bit morbid, isn't it?
    // MOVEMENT-RELATED:
    this.topSpeed = 0.25;
    this.jumpImpulse = 0.6875
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.standingOn = { id: '000', name: 'Air', properties: ['permeable'] };
    this.grip = 0;    // A higher value here lowers your stopping distance on land
    // The medium you're in can affect your movement (air is normal, water will be slower)
    this.medium = { id: '000', name: 'Air', properties: ['permeable'] };
    // Movement Related properties:
    this.lastMoveAttemptStart = null;    // Last position that movement was attempted from, to see if one is bumping into something.
    this.lastJumpInitialHeight = null;
    // MOVEMENT 2.0: Key responders/baddie scripts set movement requests, which are converted by movement-handler functions to x/y speeds:
    this.movingRight = false;
    this.movingLeft = false;
    this.jumping = false;
    this.crouching = false;
    this.running = false;   // This boolean tracks when the sprite starts or stops running, to control animations.
    // Experimental:
    this.speechBubble = null;
    // COMBAT-RELATED:
    this.maxHP = hitpoints;
    this.currentHP = hitpoints;
    // If you get hit, you Receive damage and you have been hit (granting momentary invulnerability):
    this.damageReceived = 0;
    this.hasBeenHit = false;
    // Set this value to true when an attack is initiated:
    this.isAttacking = false;
    // When an attack is made it will do a certain amount of damage AND impart momentum in the form of a 'knockback':
    this.currentAttackDamage = 0;
    this.currentAttackKnockback = 0;
    this.attackModifier = 0; // this value stores damage bonuses from temporary effects (i.e. drugs).
    // Attack position represents the attack animation's absolute position:
    this.attackPosition = 0;
    // Your width is also needed to complete the attack animation's position calculation:
    this.spriteWidth = 1;
    // Attack Radius controls combat calculations to see if you kill people:
    this.attackRadius = 0;
    this.attackCountdown = 0;
    this.attackAnimation = document.createElement('img');
    // Speech Related:
    this.dialoguesUttered = [];
    this.dialogueCountdown = 0;
    this.currentDialogue = null;
    // Get ready to show a healthbar if damaged:
    this.healthbar = null;
  }

  // Sprite Methods control the most general things about moving entities:
  
  // A - Moving and jumping:

  moveRight() {
    // Cancel attacks when you turn around:
    if (this.facing === 'left' && this.isAttacking) {
      this.haltAttack();
    }
    // Execute movement:
    this.facing = 'right';
    this.domElement.style.transform = 'rotateY(0deg)';
    this.xSpeed = this.topSpeed;
    this.lastMoveAttemptStart = this.x;
  }

  moveLeft() {
    // Cancel attacks when you turn around:
    if (this.facing === 'right' && this.isAttacking) {
      this.haltAttack();
    }
    // execute movement:
    this.facing = 'left';
    this.domElement.style.transform = 'rotateY(180deg)';
    this.xSpeed = -this.topSpeed;
    this.lastMoveAttemptStart = this.x;
  }

  jump() {
    // If you're standing on something and it isn't air, you can jump (disable this condition to allow flight):
    if (
      Number.isInteger(this.y) &&
      this.standingOn.id != '000'
    ) {
      this.ySpeed = this.jumpImpulse;
      this.lastJumpInitialHeight = this.y;
    }
  }

  // Only the player has the ability (not to mention the motivation) to want to crouch/stand up, but any sprite has the right:

  crouch() {
    // It seems a logical thing that a raptor should be able to crouch...
    if (!(this.y == 0)) {
      this.domElement.style.height = `${PLAYER_WIDTH * 0.6}px`;
    }
  }

  standUp() {
    this.domElement.style.height = `${PLAYER_WIDTH}px`;
  }

  // Runs each cycle to determine what image to use based on the player's state of motion:
  updateImage = () => {
    const moving = this.movingLeft || this.movingRight  // Do you have momentum right now?
    if (moving && !this.running) {  // If you have momentum but have not yet declared running, you have just started to run.
      // Make sure to use the right sprite for either the player of whatever baddie we're supposed to see:
      this.domElement.src = `./assets/sprites/${this.id === 'player' ? 'player' : `baddie-${this.type}`}-running.gif`;
      this.running = true;
    }
    else if (!moving && this.running) { // If you don't have momentum but are 'running' then you have just stopped:
      this.domElement.src = `./assets/sprites/${this.id === 'player' ? 'player' : `baddie-${this.type}`}-standing.gif`;
      this.running = false;
    }
  }

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

  // B - Translation methods for Sprites and their attack animations:

  horizontalTranslate(horizontalOffset) {
    // As a Sprite moves around the world, their X value will keep an absolute frame of reference,
    // but the dom element must be translated. Subracting the horizontal offset makes an image
    // appear further to the left than its absolute position suggests...
    this.horizontalOffset = horizontalOffset;
    this.domElement.style.left = `${
      (this.x - horizontalOffset) * PLAYER_WIDTH
    }px`;
  }

  verticalTranslate = (verticalOffset) => {
    // Analogous to the h-offset, Subtracting the vertical offset from an image makes it appear lower than its absolute position:
    this.verticalOffset = verticalOffset;
    this.domElement.style.bottom = `${
      (this.y - verticalOffset) * PLAYER_WIDTH
    }px`;
  };

  translateAttackAnimation = () => {
    // This method handles all aspects of the attack animation's vertical and horizontal translation:
    this.facing === 'right'
        ? (this.attackAnimation.style.left = `${
            (this.attackPosition - this.horizontalOffset) * PLAYER_WIDTH
          }px`)
        : (this.attackAnimation.style.left = `${
            (this.attackPosition - this.horizontalOffset) * PLAYER_WIDTH
          }px`);
      this.attackAnimation.style.bottom = `${(this.y - this.verticalOffset) * PLAYER_WIDTH}px`;
  }

  // C - Attacking:  General attacks are called by Subclass-specific methods which supply the attackType argument.

  // C-1): The basic attack function sets your isAttacking property and takes care of the attack's initial rendering:
  attack(attackType) {
    this.isAttacking = true;
    // Determine initial attack position and orientation:
    if (this.facing === 'right') {
      // Righthanded animation starts exactly your width away from your (left) edge:
      this.attackPosition = this.x + this.spriteWidth;
      this.attackAnimation.style.transform = 'rotateY(180deg)';
    } else {
      // Lefthanded animation begins the width of your attack away from you to your left:
      this.attackPosition = this.x - this.attackRadius;
      this.attackAnimation.style.transform = 'rotateY(0deg)';
    }
    this.attackAnimation.style.bottom = `${(this.y - this.verticalOffset) * PLAYER_WIDTH}px`;
    // Set width of attack animation:
    this.attackAnimation.style.width = `${this.attackRadius * PLAYER_WIDTH}px`;
    // Ensure prominence with z-index value:
    this.attackAnimation.style.zIndex = 10;
    if (this.id === 'player') {
      this.attackAnimation.className = 'player-attack';
    } else {
      this.attackAnimation.className = 'attack';
    }
    // Translate BEFORE rendering:
    this.translateAttackAnimation();
    // Add attack animation:
    this.attackAnimation.src = `./assets/effects/animations/${attackType}.gif`;
    this.root.appendChild(this.attackAnimation);
  }

  // C-2) This method runs every cycle while your attack is active:
  // Advance countdown: Reduce the counter and update attack range based on player's current position.
  // When countdown reaches zero remove attack animation and radius.
  // NOTE: Turning around cancels a regular attack (see movement responder rules):
  advanceAttackCountdown() {
    // IF attack is counting down that means you are in the state of attacking:
    if (this.attackCountdown > 0) {
      // begin cooling down:
      this.attackCountdown -= 1;
      // calculate attack position based on sprite width (right-handed) and attack animation width (lefthanded):
      this.attackPosition = this.facing === 'right' ? this.x + this.spriteWidth : this.x - this.attackRadius;
      // render attack animation in the appropriate position:
      this.translateAttackAnimation()
    } else {
      // if the countdown expires, halt the attack:
      this.haltAttack();
    }
  }

  // C-3) Deactivate attack: the scram function to cancel attacks fast - NOTE: this doesn't affect cooldowns, it just stops attacks.
  haltAttack() {
    if (this.isAttacking) {
      this.isAttacking = false;
      this.attackPosition = 0;
      this.attackRadius = 0;
      this.currentAttackDamage = 0;
      this.currentAttackKnockback = 0;
      this.attackAnimation.src = '';
      this.root.removeChild(this.attackAnimation);
    }
  }

  // D - Taking Damage and getting thrown around:

  // General formula for what to do when you are 'hit':
  handleCollisions = () => {
    if (!this.hasBeenHit) {             // If you HAVEN'T just been hit...
      if (this.damageReceived > 0) {    // ... Then if you take damage it hurts:
        // If this is your first time taking damage (And you're not the player) get ready to show a healthbar:
        if (this.currentHP === this.maxHP && this.id != 'player') {
          this.renderHealthbar();
        // Alternately, if you ARE the player, this is where your damage sound is emitted:
        } else if (this.id === 'player' && this.currentHP > 1) {  // (unless you have only 1 HP in which case don't play hurt sound)
          playSound(`player-hurt-${Math.floor(Math.random() * 3)}-sound`);
        }
        this.currentHP -= this.damageReceived;
        this.damageReceived = 0;
        this.hasBeenHit = true;
        if (this.currentHP <= 0) {
          this.handleDeath();   // ... Or maybe even is fatal!
        }
      }
    } else {                            // If you have just been hit you get a free pass however.
      this.hasBeenHit = false;
    }
  }

  // Specific sub-routine for the physical consequences of violence:
  getKnockedBack = (x, y) => {
    this.xSpeed = x;  // Collisions module sets X and Y speed of a sprite to 'knock it back.'
    this.ySpeed = y;
    // Only animate if this sprite does not currently have an animation playing:
    if (!document.getElementById(`animation-${this.id}`)) {
      const direction = x > 0 ? 'right' : 'left'; // If X is positive you are moved to the right, thus have been hit from the left.
    const whichBlood = Math.floor(Math.random() * 2);
    const blood = new Animation(
      this.root,
      this.x,
      this.y,
      this.horizontalOffset,
      this.verticalOffset,
      this.id,
      `blood-splatter-${whichBlood}`,
      direction
    );
    blood.render();
    };
  }

  // E - Dialogue and Thought Bubbles:

  // This method is called by the Engine whenever a Sprite fulfills a condition for speech:
  handleDialogue = (dialogue) => {
    if (this.dialogueCountdown === 0) {   // Wait until the countdown for any current dialogue finishes.
      if (!this.dialoguesUttered.includes(dialogue.id) || dialogue.repeating) {
        if (!this.dialoguesUttered.includes(dialogue.id)) this.dialoguesUttered.push(dialogue.id);
        this.createDialogue(dialogue);        
      }
    } else if (this.dialogueCountdown === 1) {  // De-render a frame before the next dialogue appears
      this.cleanupDialogue();
    }
  }

  // Updates the dialogue countdown every cycle:
  updateDialogueCountdown = () => {
    if (this.dialogueCountdown > 0) {
      this.dialogueCountdown -= 1;
      if (this.currentDialogue) {
        this.currentDialogue.repositionToParent(this.x, this.y, this.horizontalOffset, this.verticalOffset, this.facing);
      }
    } else if (this.currentDialogue){   // Ensure old dialogues are always cleaned up.
      this.cleanupDialogue();
    }
  }

  createDialogue = (dialogue) => {
    this.currentDialogue = new Dialogue(this.root, this.x, this.y, dialogue);
    this.currentDialogue.render();
    // Position dialogue so that the bubble-tick is near to the Sprite:
    this.currentDialogue.repositionToParent(this.x, this.y, this.horizontalOffset, this.verticalOffset, this.facing);
    this.dialogueCountdown = dialogue.duration;
  }

  cleanupDialogue = () => {
    if (this.currentDialogue) {
      this.currentDialogue.deRender();
      this.currentDialogue = null;
    };
  }

  // F - Render and Update Healthbar (for baddies only...?)

  renderHealthbar = () => {
    if (!this.healthbar) {
      this.healthbar = new Healthbar(this.root, this.x, this.y, this.horizontalOffset, this.verticalOffset, this.id);
      this.healthbar.handleRender();
    }
  }

  updateHealthbar = () => {
    if (this.healthbar) {
      this.healthbar.updatePosition(this.x, this.y + 1.5, this.horizontalOffset, this.verticalOffset);
      const hp = (this.currentHP / this.maxHP);
      this.healthbar.updateFullness(hp);
    }
  }

  // G - Update root node for sprite and attack animation:
  updateRoot(root) {
    // Re-assign new root element:
    this.root = root;
    if (this.isAttacking) {
      this.root.appendChild(this.attackAnimation);
    }
  }

}
