// The Game Engine Object will be the central controller for all the things that happen in our little world:

class Engine {
  // Engine's Root is the HTML <body> since it controls the whole world as well as the sidebar which is a sort of metaphysical space...
  constructor(root) {
    // first and foremost:
    this.root = root;
    // Next, make a new Columns object to store the blocks by column for easy manipulation:
    this.blocks = new Columns(document.getElementById('world'), WORLD_WIDTH, [
      0,
      SCREEN_WIDTH / BLOCK_WIDTH - 1,
    ]);
    // Screen width is easy to figure out but this will unclutter some later calculations (ditto with the height):
    this.screenWidth = SCREEN_WIDTH / BLOCK_WIDTH;
    this.screenHeight = SCREEN_HEIGHT / BLOCK_WIDTH;
    // The world will be wider than just one screen; we'll introduce the horizontal offset, which increases as you move to the right:
    this.horizontalOffset = 0;
    // The world will be taller than just one screen; we'll introduce the vertical offset, which increases as you move upwards:
    this.verticalOffset = 0;
    // The screenScrollDistance attribute tells the engine how far from the side of the screen to get before it starts scrolling.
    // A value of 1 means wait till you're right at the edge.
    this.screenScrollDistance = 6;
    // Same principle applies to the vertical:
    this.verticalScreenScrollDistance = 3;
    // The player is created through the game engine so it can handle everything that happens to you:
    this.player = new Player(document.getElementById('world'), 12, 9);
    // The Baddies will be in an array, since their numbers will be many:
    this.baddies = [];
    // Since the amount of baddies will fluctuate, we wish to keep track of the statistics:
    this.baddiesAdded = 0;
    // This data will be passed to the player as well for the benefit of the objectives:
    this.baddiesDestroyed = 0;
    // Used to track your kills for a particular level for objective-scoring purposes:
    this.baddiesKilledThisInning = 0;
    // Track all items currently in the game:
    this.currentItems = [];
    // Mission objectives come next! We'll use currentMission to keep track of which mission you're on to update between levels:
    this.currentMission = 0;
    this.mission = new Mission(
      this.player,
      missions[this.currentMission]
    );
    this.unreadObjectives = true; // Boolean for whether the Player has ever seen the current mission objectives.
    this.theTime = new Date();
    // Dictionary is used to associate Engine-updated sidebar elements to their HTML elements' ID strings:
    this.sidebarElements = {
      clock: 'clock',
      displayPlayerHPLabel: 'text-Player',
      displayPlayerHP: 'playerHP',
      displayPlayerXPLabel: 'text-Experience',
      displayPlayerXP: 'playerXP-inner',
      displayPlayerXPContainer: 'playerXP-outer',
      resetButton: 'resetButton',
      prevLvl: 'text-prev-lvl',
      nextLvl: 'text-next-lvl',
      mainMenuButton: 'inGameMenuButton'  // This is just to change its colour when you level up.
    }
    // This sidebar elements dictionary is then used to map each element to an Engine attribute with the same name:
    Object.keys(this.sidebarElements).forEach((element) => this[element] = document.getElementById(this.sidebarElements[element]));
    // Uncomment these for DEV MODE (uncomment the updateSidebarDisplay and updateSidebarRoot methods too)
    if (DEV_MODE) {
      this.displayPlayerCoords = document.getElementById('playerCoords');
    }
    // Physics Object handles motion and collision detection. One Physics per sprite (hello relativity!)
    this.playerPhysics = new Physics(this.blocks, this.player);
    // Scripts is the list of all the baddies' physics packs:
    this.scripts = [];
    this.baddies.forEach((baddie) =>
      this.scripts.push(new Physics(this.blocks, baddie))
    );
    // Collisions monitor checks the player's coords vs each of the baddies (passed as an array)
    this.collisions = new Collisions(this.player, this.baddies);
    // Game loop will only run when game is "on"; main file's any key sets this to true when you start; dying should make it false.
    this.gameOn = false;   
    // Use this to update player respawn coordinates:
    this.playerRespawnCoords = [12, 9];
    // Finally, run the setup instructions for the first level (all other levels will be setup by the game loop process):
    this.mission.setupInstructions.forEach((instruction) => {
      this.setupNextMission(instruction);
    });
    // When the in-game menu is opened, every entity that is rendered at that time must be de-rendered and kept in this list:
    this.onScreenEntities = [];
  }

  // ENGINE METHODS:

  // The HORIZONTAL Screen Scroll Check (runs every cycle and shifts things to the left/right when necessary):
  checkScreenScroll() {
    // FIRST CONDITIONAL LEADS TO RIGHT-HAND MOVEMENT; SECOND CONDITIONAL TO LEFT-HAND MOVEMENT.
    // if the player's x position is within the 'scroll distance' of the right edge, after calculating the screen's horizontal offset:
    if (
      this.player.gridX ===
        this.screenWidth - this.screenScrollDistance + this.horizontalOffset &&
      !(this.player.gridX === WORLD_WIDTH - this.screenScrollDistance + 1)
    ) {
      // increase horizontal offset value:
      this.horizontalOffset += 1;
      // alter columns' visible range:
      this.blocks.visibilityRange[0] += 1;
      this.blocks.visibilityRange[1] += 1;
      // As player's x value increases:
      // First, de-render columns that are behind your x-position by the difference between the screen width and the scroll distance:
      this.blocks.derenderColumn(
        this.player.gridX - (this.screenWidth - this.screenScrollDistance)
      );
      // Then, if there are any, re-render any tiles that exist in front of you, or create some new ones if there aren't any!
      if (
        this.blocks[`column_${this.player.gridX + this.screenScrollDistance}`]
          .blocks.length !== 0
      ) {
        this.blocks.renderColumn(this.player.gridX + this.screenScrollDistance);
      } else {
        // Latest block Printer function now eats an array of numbers, representing different block types:
        this.blocks.biomeBuilder([
          this.player.gridX + this.screenScrollDistance,
        ]);
      }
      // Then, the player character image is translated backward with the terrain:
      this.player.horizontalTranslate(this.horizontalOffset);
      // Lastly, shift all visible columns' dom elements back (their coordinates don't change since they're not actually moving):
      for (
        let i = this.horizontalOffset;
        i <= this.player.gridX + this.screenScrollDistance;
        i++
      ) {
        this.blocks[`column_${i}`].blocks.forEach((block) => {
          block.horizontalTranslate(this.horizontalOffset);
        });
      }
      // PHEW! Now for leftward movement:

      // The lefthand movement version of this function is almost a perfect mirror, but you have to subtract 1 from all
      // calculations involving the h-offset AND the player's x value because the column count starts at zero:
    } else if (
      this.player.gridX ===
        this.screenScrollDistance + this.horizontalOffset - 1 &&
      !(this.player.gridX === -WORLD_WIDTH + this.screenScrollDistance - 1)
    ) {
      this.horizontalOffset -= 1;
      this.blocks.visibilityRange[0] -= 1;
      this.blocks.visibilityRange[1] -= 1;
      this.blocks.visibilityRange.forEach((num) => (num -= 1));
      this.blocks.derenderColumn(
        this.player.gridX + (this.screenWidth - this.screenScrollDistance)
      );
      // Rendering calculations: if a column already exists render it; else create it:
      if (
        this.blocks[`column_${this.player.gridX - this.screenScrollDistance}`]
          .blocks.length !== 0
      ) {
        this.blocks.renderColumn(this.player.gridX - this.screenScrollDistance);
      } else {
        this.blocks.biomeBuilder([
          this.player.gridX - this.screenScrollDistance,
        ]);
      }
      this.player.horizontalTranslate(this.horizontalOffset);
      for (
        let i = this.horizontalOffset;
        i <= this.screenWidth + this.horizontalOffset - 1;
        i++
      ) {
        this.blocks[`column_${i}`].blocks.forEach((block) => {
          block.horizontalTranslate(this.horizontalOffset);
        });
      }
    }
  }

  // The Vertical Screen Scroll check will also be performed every game cycle, to control vertical offset values:
  checkVerticalScreenScroll = () => {
    // Calculate player's distance from the top/bottom of the screen: apparent height = player height - vertical offset:
    const apparentPlayerHeight = this.player.y - this.verticalOffset;
    // Check if player's apparent height is within range of the top of the screen first:
    if (
      apparentPlayerHeight >
      this.screenHeight - this.verticalScreenScrollDistance
    ) {
      // If moving upwards increase vertical offset value,
      this.verticalOffset += 1;
    } else if (apparentPlayerHeight < this.verticalScreenScrollDistance) {
      // If moving downwards decrease it,
      this.verticalOffset -= 1;
    }
    // Then displace the blocks and the player (baddies' translations are handled in baddie movement method):
    this.blocks.shiftColumnsVertically(this.verticalOffset);
    this.player.verticalTranslate(this.verticalOffset);
  };

  // THE GAME CYCLE is called Clock Running:

  clockRunning = () => {
    setInterval(() => {
      // Everything in here is part of the constant cycle, which will run only if the game is "on:"
      if (this.gameOn) {
        // Time: Clock updates (if necessary) with every game cycle:
        this.theTime = new Date();
        let hour = this.theTime.getHours();
        hour = ('0' + hour).slice(-2);
        let min = this.theTime.getMinutes();
        min = ('0' + min).slice(-2);
        let sec = this.theTime.getSeconds();
        sec = ('0' + sec).slice(-2);
        let timeString = `${hour} : ${min} : ${sec}`;
        this.clock.innerText = timeString;
        this.player.determineMedium(this.blocks);
        // Next, the player movement system: Check which movement requests the player is going to perform:
        this.player.handleMovementRequests();
        this.player.updateImage();  // Determine whether the Player is running or standing still.
        // Advance player attack countdown:
        this.player.advanceAttackCountdown();
        // The New Physics: Now completely in the hands of the Physics object... Now ~ 83% bug free!
        this.playerPhysics.collisionManager();
        // Update Item effects for player:
        this.player.advanceItemStatusCounter();
        // Control de/rendering of blocks that are at the edges of the screen:
        this.blocks.manageColumnRendering(this.verticalOffset);
        // Distance: If the player gets close to the edge then we translate the world around them:
        this.checkScreenScroll();
        this.checkVerticalScreenScroll();
        // Say hello to the bad guys:
        // Run physics for the bad guys:
        this.scripts.forEach((physicsPack) => {
          if (physicsPack.subject.hasBeenRendered)
            physicsPack.collisionManager();
        });
        // Manage items updates (rendering, being picked up):
        this.handleItemUpdates();
        // Then, update baddies' various tickers:
        this.handleBaddieUpdates();
        // Initiate collision detection between objects in motion (first argument = max distance at which to calculate for collision):
        this.collisions.compare(5, this.baddies);
        this.baddies.forEach((baddie) => {
          baddie.handleCollisions();
          if (baddie.checkForTerrainDeath()) {
            baddie.handleDeath();
            playSound('lava-death-sound');
          } 
          if (baddie.isDying) baddie.handleDeath();
        });
        this.checkforBaddieDeaths();
        // Victory: Filter out accomplished objectives, then check for mission objective achievements, then update sidebar:
        this.mission.manageAchievements();
        // The game will freeze if you finish a mission, then unfreeze after a few seconds and load a new mission:
        if (this.mission.objectivesRemaining.length == 0) this.updateMission();
        // Lastly, check for DEATH: First the player checks, then the engine follows up in case of death:
        this.player.checkForDeath();
        this.checkForPlayerDeath();
        // Dialogue handler updates:
        this.handleMissionDialogue();
        this.baddies.forEach((baddie) => baddie.updateDialogueCountdown());
        this.player.updateDialogueCountdown();
        // Sidebar elements are updated:
        this.updateSidebarDisplays();
        // Refresh the universe every 50 ms
      }
    }, 50);
  };

  // updateMission method briely pauses the game cycle to load new Mission data, while optional special FX plays:
  updateMission() {
    // Pause the game when mission update begins:
    this.gameOn = false;
    // Reset baddies-killed-this-inning counter and give player experience checkpoint:
    this.baddiesKilledThisInning = 0;
    this.player.missionCheckpoint();
    // Cancel all current baddie attacks:
    this.baddies.forEach((baddie) => baddie.haltAttack());
    // When the mission updates we update the engine's mission level counter:
    this.currentMission += 1;
    // Then activate the Mission object's loadNewMission function with the current mission number:
    this.mission.loadNewMission(missions[this.currentMission]);
    this.unreadObjectives = true; // Update objectives-read boolean.
    // Check to see whether there are any setup instructions for the next level and run setupMission method accordingly:
    if (this.mission.numberOfSetupSteps > 0) {
      this.mission.setupInstructions.forEach((setOfInstructions) =>
        this.setupNextMission(setOfInstructions)
      );
    }
    // Additionally, run special effects if there are any:
    if (this.mission.specialFX) this.handleSpecialFX();
    // Finally, set interval to check if the game is in the World interface before resuming gameplay.
    // Timer duration is derived from special FX cues (if any) or 500 ms by default:
    const resumer = setInterval(() => {
      if (app.currentUI === 'Game World') {
        this.gameOn = true;
        clearInterval(resumer);
      }
      // freeze the game for as long as the missions special FX cue requires, or 0ms as a default:
    },
    this.mission.specialFX ? this.mission.specialFX[2] * 1000 : 0
    );
  }

  // When a new mission is loaded, a huge Reducer-like function converts instructions into changes to the game's environment:
  setupNextMission(instructions) {
    // Instructions for next level setup will be tuples, the first element of which will be the code for what type of setup to perform:
    switch (instructions[0]) {
      case 'add-baddies':
        instructions[1].forEach((baddieArray) => {
          // Determine if the baddie has never been created before, and update its root element accordingly:
          if (typeof baddieArray[4] == 'object') {
            baddieArray.unshift(document.getElementById('world'));
          } else {
            baddieArray[0] = document.getElementById('world')
          }
          // for each baddie in the instructions array, make a baddie and add to the engine's list:
          this.baddies.push(new Baddie(...baddieArray));
          // and give them a physics pack too!
          this.scripts.push(
            new Physics(
              this.blocks,
              this.baddies.find((baddie) => baddie.serialNum === baddieArray[4])
            )
          );
          this.baddiesAdded++;
        });
        break;
      case 'add-boss':
        // Ensure proper rendering point set:
        if (typeof instructions[1][4] == 'object') {
          instructions[1].unshift(document.getElementById('world'));
        } else {
          instructions[1][0] = document.getElementById('world')
        }
        this.baddies.push(new Boss(...instructions[1]));
        this.scripts.push(
          new Physics(this.blocks, this.baddies[this.baddies.length - 1])
        );
        this.baddiesAdded++;
        break;
      case 'add-item':
        const item = new Item(document.getElementById('world'), ...instructions[1]);
        this.currentItems.push(item);
        break;
      case 'clear-baddies':
        this.baddies.forEach((baddie) => {
          // baddies are instantly removed from the game:
          baddie.deRender();
          // Note that this method of baddie removal does not count toward 'baddies destroyed' counter.
        });
        this.baddies = [];
        this.scripts = [];
        break;
      case 'clear-items':
        if (this.currentItems.length > 0) {
          this.currentItems.forEach((item) => item.deRender());
          this.currentItems = [];
        }
        break;
      case 'create-block':
        // practising array destructuring here on part 2 of setup tuple:
        const [coords, blockType] = instructions[1];
        this.blocks.addOneBlock(coords[0], coords[1], blockType);
        break;
      case 'remove-block':
        const [x, y] = instructions[1];
        this.blocks.removeOneBlock(x, y);
        break;
      case 'add-columns':
        const [rightwardColumns, leftwardColumns] = instructions[1];
        this.blocks.addNewColumns(
          rightwardColumns[0],
          rightwardColumns[1],
          'right'
        );
        this.blocks.addNewColumns(
          leftwardColumns[0],
          leftwardColumns[1],
          'left'
        );
        // World width should be expanded to equal the highest column number from the rightward direction,
        // so for now we'll need to keep columnal expansion symmetrical...
        WORLD_WIDTH = rightwardColumns[1];
        break;
      case 'set-world-width':
        WORLD_WIDTH = instructions[1];
        break;
      case 'clear-stage':
        this.blocks.deRenderAllColumns();
        this.blocks.deleteAllColumns();
        this.blocks.currentLeftwardBiomeIdx = 0;
        this.blocks.currentRightwardBiomeIdx = 0;
        break;
      case 'reset-stage':
        // This takes a pair of new biomes and starts printing them outward from the player's current position (player starts in the righthand biome):
        const [rightBiome, leftBiome] = instructions[1];
        const rightmostColumn = this.horizontalOffset;
        const leftmostColumn = SCREEN_WIDTH_IN_BLOCKS + this.horizontalOffset;
        let buildArea = [];
        for (
          let i = rightmostColumn;
          i <= leftmostColumn;
          i++
        ) {
          buildArea.push(i);
        }
        // ensure negative number range begins from smallest ABSOLUTE value since we always build out from zero
        // (i.e. buildArea should be like this: -1, -2, -3, 0, 1, 2, 3... as opposed to -3, -2, -1, 0, 1, 2, 3...):
        let negatives = buildArea.filter((num) => num < 0);
        buildArea = buildArea.filter((num) => num >= 0);
        const negativeNumsLength = negatives.length;
        for (let i = 0; i < negativeNumsLength; i++) {
          buildArea.push(negatives.pop());
        }
        // Set new biomes and reset their indexes:
        this.blocks.currentBiomeRight = rightBiome;
        this.currentRightwardBiomeIdx = 0;
        this.blocks.currentBiomeLeft = leftBiome;
        this.currentLeftwardBiomeIdx = 0;
        this.blocks.biomeBuilder(buildArea);
        for (
          let i = rightmostColumn;
          i <= leftmostColumn;
          i++
        ) {
          this.blocks[`column_${i}`].blocks.forEach((block) => {
            block.horizontalTranslate(this.horizontalOffset);
          });
        }
        break;
      case 'update-player-respawn':
        this.playerRespawnCoords = instructions[1];
        break;
      case 'contact-server':
        sendWorldData(instructions[1]);
        break;
      default:
        break;
    }
  }

  // Method for playing special FX:
  handleSpecialFX() {
    // Since there might be many special effects, they arrive in the form of a list, for easy looping:
    this.mission.specialFX.forEach((effect) => {
      // Special Effects instructions will use an object, as a prototype for a new way of doing business:
      effect.target.classList.add(effect.effect);
      setTimeout(() => {
        try {
          effect.target.classList.remove(effect.effect);
        } catch {
          // Umm... try again later?
        }
      }, effect.duration * 1000);
    });
  }

  // Method to run each cycle and check if anyone is supposed to be talking:
  handleMissionDialogue() {
    if (this.mission.dialogue) {
      Object.keys(this.mission.dialogue).forEach((character) => {
        this.mission.dialogue[character].forEach((saying) => {
          if (character === 'player') {
            switch (saying.condition[0]) {
              case 'position':
                if (this[character].gridX === saying.condition[1]) {
                  if (saying.condition[2] && this[character].gridY === saying.condition[2]) {
                    this.player.handleDialogue(saying); // If a Y coordinate is also provided, test for it as well.
                  } else if (!saying.condition[2]) {
                    this.player.handleDialogue(saying); // If there is no Y coordinate, also show the dialogue.
                  }
                }
            }
          } else {
            switch (saying.condition[0]) {
              case 'position':
                try {
                  const baddie = this.baddies.find((baddie) => baddie.id === character)
                  // Baddies can only speak if they're both alive and onscreen (the player can take these conditions for granted):
                  if (!baddie.isDying && baddie.rendered && baddie.gridX === saying.condition[1]) {
                    baddie.handleDialogue(saying);
                  }
                } catch {
                  // If the baddie is dead he says nothing.
                }
            }
          }
        })
      })
    }
  }

  // High-level function for altering the appearance of the Sidebar when the Player gains or loses a level:
  checkForLevelUp = () => {
    // If the Player has unspent skill points, direct them to the Menu button by altering its appearance:
    if (this.player.skillsAvailable > 0) {
      this.mainMenuButton.innerText = 'LEVEL UP! CHOOSE NEW SKILL';
      this.mainMenuButton.classList.add('levelup');
    } else {    // Restore Menu button's normal appearance when all skill points are spent:
      this.mainMenuButton.innerText = 'MENU';
      this.mainMenuButton.classList.remove('levelup');
    }
    // Check if the Player has just leveled up (or demoted) and if so, initiate a one-time effect on the XP bar:
    if (this.player.justLeveledUp) this.handlePlayerLevelup();
    if (this.player.justDemoted) this.handlePlayerLevelDown();
  }

  // Gives the XP bar a one-time shine effect when you level up:
  handlePlayerLevelup = () => {
    this.player.justLeveledUp = false;    // Reset the Player's flag as an acknowledgement of the signal.
    this.displayPlayerXPContainer.classList.add('XP');
    setTimeout(() => {
      this.displayPlayerXPContainer.classList.remove('XP');
    }, 1500);
  }

  // Gives the XP bar a one-time red glare effect when you lose a level:
  handlePlayerLevelDown = () => {
    this.player.justDemoted = false;    // Reset the Player's flag as an acknowledgement of the signal.
    this.displayPlayerXPContainer.classList.add('obituary');
    setTimeout(() => {
      this.displayPlayerXPContainer.classList.remove('obituary');
    }, 1500);
  }

  // Player Death check occurs every game cycle:
  checkForPlayerDeath() {
    // the player can handle their own death now, but some things the engine's gotta do itself:
    if (this.player.isDead) {
      this.gameOn = false;
      this.resetButton.style.display = 'initial';
      this.resetButton.style.width = '224px';
      this.resetButton.classList.add('restart-button');
      // Allow use of the any key to reset the game:
      document.addEventListener('keydown', app.resetButtonHandler);
      // Temporarily disable main menu button when player dies:
      this.mainMenuButton.onmouseup = null;
      this.mainMenuButton.classList.add('disabled');
      document.getElementById('pauseButton').style.display = 'none';
      this.announcement1 = new Text(
        document.getElementById('world'),
        0,
        0,
        64,
        'YOU GOT KILLED!',
        'obituary'
      );
      this.announcement2 = new Text(
        document.getElementById('world'),
        0,
        0,
        16,
        'Press R to resume from last checkpoint',
        'obituary'
      );
      // Lastly, make the baddies all stand still:
      this.baddies.forEach((baddie) => baddie.displayStandingGif());
    }
  }

  updateSidebarDisplays = () => {
    // Dev mode only:
    if (DEV_MODE) {
      this.displayPlayerCoords.innerText = `PLAYER COORDS: ${this.player.x.toFixed(2)}, ${this.player.y.toFixed(2)}`;
    }
    this.updateXPBar();
    this.updateHealthBar();
    // UX enhancement for levelup flow:
    this.checkForLevelUp();
  }

  updateHealthBar = () => {
    // Show each player HP as a heart:
    let healthHearts = '';
    for (let i = 0; i < this.player.currentHP; i++) {
      healthHearts += ' + ';
    };
    // Determine colour of HP display element based on player's health percentage:
    let hpColor = this.player.currentHP / this.player.maxHP > 0.7 ?
    'limegreen' : this.player.currentHP / this.player.maxHP > 0.4 ?
    'yellow' :
    'red';
    this.displayPlayerHPLabel.innerText = `Player HP (Max: ${this.player.maxHP})`;
    this.displayPlayerHP.innerText = `${healthHearts}`;
    this.displayPlayerHP.style.width = `${this.player.currentHP * 10}%`;
    this.displayPlayerHP.style.backgroundColor = hpColor;
    if (this.player.currentHP === 0) {
      this.displayPlayerHP.classList.add('rounded');
    } else {
      this.displayPlayerHP.classList.remove('rounded');
    }
  }

  updateXPBar = () => {
    // Get Previous level XP threshold to use as the low end of the bar:
    const previousLevel = this.player.previousLevelsXP[this.player.previousLevelsXP.length - 1]
    const pointsNeeded = this.player.nextLevelXP - previousLevel;
    // Calculate Player's progress towards the next level, from the previous one:
    const nextPercent = (this.player.experience - previousLevel) / pointsNeeded * 100;
    this.displayPlayerXP.style.width = `${nextPercent}%`;
    this.displayPlayerXPLabel.innerText = `Experience: ${this.player.experience} / ${this.player.nextLevelXP}`;
    this.prevLvl.innerText = `Level ${this.player.level}`;
    this.nextLvl.innerText = `Level ${this.player.level + 1}`;
  }

  // In case, in answer to the question 'would you like to play again?'... the user has selected... YES:
  handleReset() {
    // First, resurrect the player and play a sound:
    playSound('confirm-sound');
    this.player.resurrect();
    // Then, remove your obituary notices:
    this.announcement1.removeDOM();
    this.announcement2.removeDOM();
    // Then, unhighlight the reset button itself:
    this.resetButton.classList.remove('restart-button');
    // Remove any key event listener from the reset button:
    document.addEventListener('keydown', app.resetButtonHandler);
    // Reactivate the Menu button:
    this.mainMenuButton.onmouseup = app.inGameMenuHandler;
    this.mainMenuButton.classList.remove('disabled');
    // we'll move you back to a specified position when you die:
    this.player.y = this.playerRespawnCoords[1];
    this.player.domElement.style.bottom = `${this.player.y * PLAYER_WIDTH}px`;
    let distFromStart = this.player.x - this.playerRespawnCoords[0];
    if (distFromStart > 0) {
      // if you're to the right of the start when you die, we'll move you to the left, and vice-versa:
      for (let i = distFromStart; i > 0; i--) {
        this.player.x -= 1;
        this.player.gridX -= 1;
        this.checkScreenScroll();
      }
    } else {
      for (let i = distFromStart; i < 0; i++) {
        this.player.x += 1;
        this.player.gridX += 1;
        this.checkScreenScroll();
      }
    }
    // Then, snap the player's DOM element to the right place:
    this.player.domElement.style.left = `${
      (this.player.x - this.horizontalOffset) * PLAYER_WIDTH
    }px`;
    // Then we have to reset the *current* mission objectives:
    this.mission.objectivesAchieved.forEach(
      (objective) => (objective.achieved = false)
    );
    if (this.mission.objectivesAchieved.length > 0)
      this.mission.objectivesRemaining.push(
        this.mission.objectivesAchieved.pop()
      );
    // Then reset the current (and global) baddies-killed counters, and halt any baddie attacks that are in progress:
    this.baddiesDestroyed -= this.baddiesKilledThisInning;
    this.baddiesKilledThisInning = 0;
    this.baddies.forEach((baddie) => {
      baddie.haltAttack();
      baddie.cleanupDialogue(); 
    });
    // Update player's kill data too:
    this.player.baddiesDestroyed = this.baddiesDestroyed;
    this.player.baddiesKilledThisInning = this.baddiesKilledThisInning;
    // Then respawn any baddies that belong to the current mission:
    this.respawnBaddies();
    // Then respawn any items needed for the level:
    this.regenerateItems();
    // Finally, resume gameplay!
    this.gameOn = true;
    document.getElementById('pauseButton').style.display = 'initial';
    this.resetButton.style.display = 'none';
  }

  // Bad-guy management section:
  // This function will test every baddie's location every cycle to determine if they should be visible or not.
  // Arguments passed to baddie-render method: array with start/end columns to determine rendering, and H-offset(#):
  handleBaddieUpdates = () => {
    this.baddies.forEach((baddie) => {
      baddie.handleRender(
        this.blocks.visibilityRange,
        this.blocks.verticalRange
      );
      baddie.lookAhead([this.player.x, this.player.gridY]); // Grid Y is used to make an easy match with baddie's height.
      baddie.horizontalTranslate(this.horizontalOffset);
      baddie.verticalTranslate(this.verticalOffset);
      baddie.advanceAttackCountdown()
      baddie.patrol();
      baddie.updateImage();
      baddie.handleMovementRequests();
      baddie.updateHealthbar();
    });
  };

  // Check if any baddies have died and remove them and keep track of dead removed:
  checkforBaddieDeaths() {
    let init = this.baddies.length;
    let casualties = this.baddies.filter((baddie) => baddie.isDead);
    this.baddies = this.baddies.filter((baddie) => !baddie.isDead);
    this.baddiesDestroyed += init - this.baddies.length;
    this.baddiesKilledThisInning += init - this.baddies.length;
    this.player.baddiesDestroyed = this.baddiesDestroyed;
    this.player.baddiesKilledThisInning = this.baddiesKilledThisInning;
    // when you kill a baddie you eat his data and gain his courage!
    if (casualties.length > 0) this.player.baddieDogTags.push(...casualties);
  }

  // Respawns baddies that have been killed during the current mission if you get killed:
  respawnBaddies() {
    // find if the current mission contains instructions to spawn baddies. If so, remove all baddies and re-run the baddie-adder:
    let respawnList = [];
    try {
      respawnList = this.mission.setupInstructions.filter(
        (instructions) =>
          instructions[0] === 'add-baddies' || instructions[0] === 'add-boss'
      );
    } catch {
      // If the current mission does not contain any baddies you will have an empty list, and no one will respawn.
      respawnList = [];
    }
    if (respawnList.length > 0) {
      // if you are respawning guys, don't count them again towards the baddiesAdded counter:
      this.baddiesAdded -= respawnList.length;
      // Remove all current baddies to avoid duplicates:
      this.setupNextMission(['clear-baddies']);
      // Then respawn all baddies associated with the current mission:
      respawnList.forEach((instruction) => {
        this.setupNextMission(instruction);
      });
    }
  }

  // Regenerates any items associated with the current mission when you die:
  regenerateItems = () => {
    // First, tidy up any leftover items:
    this.setupNextMission(['clear-items']);
    let itemList = [];
    try {
      itemList = this.mission.setupInstructions.filter(
        (instructions) =>
          instructions[0] === 'add-item'
      )
    } catch {
      itemList = [];
    }
    if (itemList.length > 0) {
      itemList.forEach((item) => {
        this.setupNextMission(item);
      })
    }
  }

  // Item management section:
  handleItemUpdates = () => {
    // Every cycle, update each item's render/offsets:
    this.currentItems.forEach((item) => {
      item.handleRender(this.blocks.visibilityRange, this.blocks.verticalRange);
      item.horizontalTranslate(this.horizontalOffset);
      item.verticalTranslate(this.verticalOffset);
      // Then, check for proximity to Player:
      if (this.player.gridX === item.x && this.player.gridY === item.y) {
        this.handleItemPickup(item);
      }
    })
  };

  // If an item has been picked up, pass it to the Player and remove it from the game:
  handleItemPickup = (item) => {
    this.player.pickupItem(item);
    item.deRender();
    this.currentItems = this.currentItems.filter((thing) => item.id != thing.id);
  }

  // When the game menu is opened, de-render everything that's on-screen and remember it:
  deRenderGameEntities = () => {
    // De-render player:
    this.player.deRender();
    this.onScreenEntities.push(this.player);
    // De-render baddies:
    this.baddies.forEach((baddie) => {
      baddie.deRender();
      this.onScreenEntities.push(baddie);
    })
    // De-render items:
    this.currentItems.forEach((item) => {
      item.deRender();
      this.onScreenEntities.push(item);
    })
    // De-render blocks:
    this.blocks.deRenderAllColumns();
  }

  // When the game menu is closed, re-render everything that was removed:
  reRenderGameEntities = (root) => {
    this.root = root;
    this.onScreenEntities.forEach((entity) => {
      entity.updateRoot(this.root);
    });
    this.player.render();
    this.blocks.updateWorldDiv(this.root);
    this.blocks.restoreScreen();
    this.onScreenEntities = [];
  }

  // Whenever the game interface comes back, ensure all Sidebar display elements are updated correctly:
  updateSidebarRoots = () => {
    // OLD ELEMENTS WITH POTENTIAL DEV-RELATED USEFULNESS:
    if (DEV_MODE) {
      this.displayPlayerCoords = document.getElementById('playerCoords');
    }
    // Re-map all connections to newly generated elements:
    Object.keys(this.sidebarElements).forEach((element) => this[element] = document.getElementById(this.sidebarElements[element]));
  }
  
}
