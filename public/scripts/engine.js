// The Game Engine Object will be the central controller for all the things that happen in our little world:

class Engine {
  // Engine's Root will be the HTML body since it will control the whole world as well as the sidebar which is a sort of metaphysical
  // space...
  constructor(root) {
    // first and foremost:
    this.root = root;
    // Next, make a new Columns object to store the blocks by column for easy manipulation:
    this.blocks = new Columns(world, WORLD_WIDTH, [0, 8]);
    // Screen width is easy to figure out but this will unclutter some later calculations:
    this.screenWidth = SCREEN_WIDTH / BLOCK_WIDTH;
    // The World will be wider than just one screen; to keep track of distant blocks, we'll introduce the horizontal offset value:
    this.horizontalOffset = 0;
    // the screenScrollDistance attribute tells the engine how far from the side of the screen to get before it starts scrolling
    // the landscape. A value of 1 means wait till you're right at the edge.
    this.screenScrollDistance = 3;
    // The player is created through the game engine so it can handle everything that happens to you:
    this.player = new Player(world, 5, 8);
    // The Baddies will be in an array, since their numbers will be many:
    this.baddies = [];
    // Cue experimental baddie deployment!
    this.baddies.push(
      // Must always meet baddies at the far edge of their range (they always start walking towards you... instead of into the abyss):
      new Baddie(world, -10, 5, 1002, 1001, [-9, -8, -7, -6, -5, -4, -3, -2])
    );
    // this.baddies.push(
    //   new Baddie(world, -9, 5, 1001, 1001, [-9, -8, -7, -6, -5, -4, -3])
    // );
    // this.baddies.push(
    //   new Baddie(world, -7, 5, 1002, 1001, [-7, -6, -5, -4, -3])
    // );
    // this.baddies.push(new Baddie(world, 11, 6, 1001, 1001, true));
    // Mission objectives come next!
    this.currentMission = 0; // We'll use this to keep track of which mission you're on to update between levels:
    this.mission = new Mission(
      sidebar,
      this.player,
      missions[this.currentMission]
    );
    // We also have a clock, for a great man once said: "take something that already exists, and stick a clock on it" so we did:
    this.theTime = new Date();
    this.clock = clock;
    // NEW! Physics Object handles motion and collision detection...
    this.playerPhysics = new Physics(this.blocks, this.player);
    // ... FOR EVERY INDIVIDUAL SPRITE??
    this.scripts = [];
    this.baddies.forEach((baddie) =>
      this.scripts.push(new Physics(this.blocks, baddie))
    );
    // Game loop will only run when game is "on"; main file's any key sets this to true when you start; dying should make it false.
    this.gameOn = false;
    this.resetButton = resetButton;
  }
  // Engine Methods:

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
      this.blocks.toggleColumn(
        this.player.gridX - (this.screenWidth - this.screenScrollDistance)
      );
      // Then, if there are any, re-render any tiles that exist in front of you, or create some new ones if there aren't any!
      if (
        this.blocks[`column_${this.player.gridX + this.screenScrollDistance}`]
          .blocks.length !== 0
      ) {
        this.blocks.toggleColumn(this.player.gridX + this.screenScrollDistance);
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
      this.blocks.toggleColumn(
        this.player.gridX + (this.screenWidth - this.screenScrollDistance)
      );
      // Rendering calculations: if a column already exists render it; else create it:
      if (
        this.blocks[`column_${this.player.gridX - this.screenScrollDistance}`]
          .blocks.length !== 0
      ) {
        this.blocks.toggleColumn(this.player.gridX - this.screenScrollDistance);
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

  // Game Loop is called Clock Running:

  clockRunning() {
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
        // Before movement is calculated, check what surface the player is standing on, and what medium (if any) they are immersed in:
        this.player.updateStandingOnDisplay(this.blocks);
        this.player.determineMedium(this.blocks);
        // The New Physics: Now completely in the hands of the Physics object... Now ~ 83% bug free!
        this.playerPhysics.collisionManager();
        // Run physics for the bad guys:
        this.scripts.forEach((physicsPack) => {
          if (physicsPack.subject.hasBeenRendered)
            physicsPack.collisionManager();
        });
        // Distance: If the player gets close to the edge then we translate the world around them:
        this.checkScreenScroll();
        // Say hello to the bad guys:
        this.handleBaddieMotion();
        // Victory: Filter out accomplished objectives, then check for mission objective achievements, then update sidebar:
        this.mission.manageAchievements();
        // The game will freeze if you finish a mission, then unfreeze after 4.5 seconds and load a new mission:
        if (this.mission.objectivesRemaining.length == 0) this.updateMission();
        // Lastly, check for DEATH:
        this.checkForPlayerDeath();
        // Refresh the universe every 40 ms
      }
    }, 40);
  }

  updateMission() {
    this.gameOn = false;
    // When the mission updates we update the engine's mission level counter:
    this.currentMission += 1;
    // Then activate the Mission object's loadNewMission function with the current mission number:
    this.mission.loadNewMission(missions[this.currentMission]);
    // Check to see whether there are any setup instructions for the next level and run setupMission method accordingly:
    if (this.mission.numberOfSetupSteps > 0) {
      this.mission.setupInstructions.forEach((setOfInstructions) =>
        this.setupNextMission(setOfInstructions)
      );
    }
    // Additionally, run special effects if there are any:
    if (this.mission.specialFX) this.handleSpecialFX();
    // Finally, set a 5-second timer before resuming gameplay:
    setTimeout(
      () => {
        this.gameOn = true;
        // freeze the game for as long as the missions special FX cue requires, or 500ms as a default:
      },
      this.mission.specialFX ? this.mission.specialFX[2] * 1000 : 500
    );
  }

  setupNextMission(instructions) {
    // Instructions for next level setup will be tuples, the first element of which will be the code for what type of setup to perform:
    switch (instructions[0]) {
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
        this.blocks.clearAllColumns();
        this.blocks.currentLeftwardBiomeIdx = 0;
        this.blocks.currentRightwardBiomeIdx = 0;
        break;
      case 'reset-stage':
        const [rightBiome, leftBiome, columns] = instructions[1];
        const buildArea = [];
        for (
          let i = columns[0] + this.horizontalOffset;
          i <= columns[1] + this.horizontalOffset;
          i++
        ) {
          buildArea.push(i);
        }
        this.blocks.currentBiomeRight = rightBiome;
        this.blocks.currentBiomeLeft = leftBiome;
        this.blocks.biomeBuilder(buildArea);
        for (
          let i = columns[0] + this.horizontalOffset;
          i <= columns[1] + this.horizontalOffset;
          i++
        ) {
          this.blocks[`column_${i}`].blocks.forEach((block) => {
            block.horizontalTranslate(this.horizontalOffset);
          });
        }
        break;
      case 'contact-server':
        sendWorldData(instructions[1]);
      default:
        console.log('no special instructions recieved for this level.');
    }
  }

  handleSpecialFX() {
    this.mission.specialFX[0].classList.add(this.mission.specialFX[1]);
    setTimeout(() => {
      this.mission.specialFX[0].classList.remove(this.mission.specialFX[1]);
    }, this.mission.specialFX[2] * 1000);
  }

  checkForPlayerDeath() {
    // currently only standing on lava will kill you, which makes for a nice simple conditional:
    if (this.player.standingOn.id === '004') {
      this.player.isDead = true;
      this.gameOn = false;
      this.resetButton.style.display = 'initial';
      this.resetButton.style.width = '192px';
      pauseButton.style.display = 'none';
      this.playerPhysics.displaySubjectStandingOn.innerText =
        'YOU HAVE FALLEN INTO LAVA!';
      // this.announcement = new Text COMING SOON!
    }
  }

  handleReset() {
    // we'll move you back to the start real quick when you die:
    this.player.y = 8;
    let distFromStart = this.player.x - 5;
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
    // Then we have to strip away your XP and reset the *current* mission objectives:
    this.player.experience = 0;
    this.mission.objectivesAchieved.forEach(
      (objective) => (objective.achieved = false)
    );
    if (this.mission.objectivesAchieved.length > 0)
      this.mission.objectivesRemaining.push(
        this.mission.objectivesAchieved.pop()
      );
    this.gameOn = true;
    this.resetButton.style.display = 'none';
  }

  // Bad-guy management section:
  // This function will test every baddie's location every cycle to determine if they should be visible or not.
  // Arguments passed to baddie-render method: array with start/end columns to determine rendering, and H-offset(#):
  handleBaddieMotion = () => {
    this.baddies.forEach((baddie) => {
      baddie.handleRender(
        [this.blocks.visibilityRange[0], this.blocks.visibilityRange[1]],
        this.horizontalOffset
      );
      baddie.patrol();
    });
  };
}
