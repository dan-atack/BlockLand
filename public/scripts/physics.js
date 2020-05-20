// There will be a Physics object for each entity in the game (right now just the player) and it will handle all obstruction checks
// and movement management for that entity. The player's button handler will still set speed, but the physics object will be in charge
// of allowing/restricting all movement, and applying forces such as gravity and friction, based on terrain.

class Physics {
    constructor(columns, subject) {
        this.columns = columns;
        this.subject = subject;
        // As with earlier CD models, x/y Obstruction will be the value of the block in the way (0 = empty):
        this.xObstruction = 0;
        // Similarly, distance to obstruction will measure the player's distance from the next column/row, whether or not it is occupied:
        this.xDist = 0;
        this.yObstruction = 0;
        this.yDist = 0;
        // If you have motion in both x and y directions the collision detector will attempt to prevent you moving into a corner:
        this.diagonal = 0;
        // Possibles here are 'UpRight', 'UpLeft', 'DownRight' or 'DownLeft' and will be interpreted by the movement manager:
        this.diagonalDirection = '';
        // Output Display Updaters:
        this.displaySubjectCoords = playerCoords;
        this.displaySubjectStandingOn = playerStandingOnBlockType;
        this.displaySubjectMedium = playerStandingInMedium;
    };

    // Laws of motion methods:

    // The Physics Engine will take over everything to do with Collision Detection and Movement Management.
    // CD is broken into smaller components to reduce confusion and perhaps finally isolate the remaining movement-related bugs.
    // There will be 4 possible collision checks, up to two of which will be called by one main 'collision management' method, then the
    // Movement Management method will move the player (and other sprites in time), based on the output of the collision detectors.

    // Collision Checks:
    collisionManager() {
        // Check for horizontal momentum:
        if (this.subject.xSpeed != 0) {
            (this.subject.xSpeed > 0) ? 
            this.collisionCheckRight() : 
            this.collisionCheckLeft();
        };
        // Check for vertical motion:
        if (this.subject.ySpeed != 0) {
            (this.subject.ySpeed > 0) ? 
            this.collisionCheckUp() : 
            this.collisionCheckDown();
        };
        // Check those corners if you have speed in both x and y directions AND you're at a grid intersection on at least one axis:
        if ((Math.abs(this.xDist) < Math.abs(this.subject.xSpeed)) && (Math.abs(this.yDist) < Math.abs(this.subject.ySpeed))) this.detectDiagonals();
        this.movementManager();
    };

    // Individual directional obstruction checks will report the distance to the next column/row, and what is in that position:
    collisionCheckRight() {
        // Test for World edge first:
        if (this.subject.x < WORLD_WIDTH) {
            // define the distance to the next column as the difference between current x position and x position CEIL (dist is positive):
            this.xDist = (Math.ceil(this.subject.x) - this.subject.x);
            // Test for the next block/s to the RIGHT (use ceil(x) and upper and lower y-values to catch all):
            this.xObstruction = this.columns.isWayBlocked(Math.ceil(this.subject.x+1), Math.floor(this.subject.y)) || 
            this.columns.isWayBlocked(Math.ceil(this.subject.x+1), Math.ceil(this.subject.y));
        } else {
            this.subject.x = WORLD_WIDTH;
            this.xObstruction = 100;
        }
    };

    collisionCheckLeft() {
        if (this.subject.x > -WORLD_WIDTH) {
            // define the distance to the next column as the difference between current x position and x position FLOOR (dist is negative):
        this.xDist = (Math.floor(this.subject.x) - this.subject.x);
        // Test for the next block/s to the LEFT (use floor(x) and upper and lower y-values to catch all):
        this.xObstruction = this.columns.isWayBlocked(Math.floor(this.subject.x-1), Math.floor(this.subject.y)) || 
        this.columns.isWayBlocked(Math.floor(this.subject.x-1), Math.ceil(this.subject.y));
        } else {
            this.subject.x = -WORLD_WIDTH;
            this.xObstruction = 100;
        }
    };

    collisionCheckUp() { 
        if (this.subject.y < (SCREEN_HEIGHT/PLAYER_WIDTH)) {
            // define the distance to the next row as the difference between current y position and y position CEIL (dist is positive):
        this.yDist = (Math.ceil(this.subject.y) - this.subject.y);
        // Test for the next block/s to the right (use floor(x) and upper and lower y-values to catch all):
        this.yObstruction = this.columns.isWayBlocked(Math.floor(this.subject.x), Math.ceil(this.subject.y+1)) || 
        this.columns.isWayBlocked(Math.ceil(this.subject.x), Math.ceil(this.subject.y+1));
        } else {
            this.subject.y = (SCREEN_HEIGHT/PLAYER_WIDTH);
            this.yObstruction = 100;
        }
    };

    collisionCheckDown() { 
        // define the distance to the next row as the difference between current y position and y position FLOOR (dist is negative):
        this.yDist = (Math.floor(this.subject.y) - this.subject.y);
        // Test for the next block/s to the right (use floor(x) and upper and lower y-values to catch all):
        this.yObstruction = this.columns.isWayBlocked(Math.floor(this.subject.x), Math.floor(this.subject.y-1)) || 
        this.columns.isWayBlocked(Math.ceil(this.subject.x), Math.floor(this.subject.y-1));
    };

    detectDiagonals() {
        if (this.subject.xSpeed > 0) {
            if (this.subject.ySpeed > 0) {
                // UpRight first:
                this.diagonal = this.columns.isWayBlocked(Math.ceil(this.subject.x+1), Math.ceil(this.subject.y+1)) ||
                this.columns.isWayBlocked(Math.ceil(this.subject.x+1), Math.ceil(this.subject.y+1))
                if (this.diagonal) this.diagonalDirection = 'UpRight';
            } else {
                // DownRight:
                this.diagonal = this.columns.isWayBlocked(Math.ceil(this.subject.x+1), Math.floor(this.subject.y-1)) ||
                this.columns.isWayBlocked(Math.ceil(this.subject.x+1), Math.floor(this.subject.y-1));
                if (this.diagonal) this.diagonalDirection = 'DownRight';
            }
        } else {
            if (this.subject.ySpeed > 0) {
                // UpLeft:
                this.diagonal = this.columns.isWayBlocked(Math.floor(this.subject.x-1), Math.floor(this.subject.y+1)) ||
                this.columns.isWayBlocked(Math.floor(this.subject.x-1), Math.ceil(this.subject.y+1));
                if (this.diagonal) this.diagonalDirection = 'UpLeft';
            } else {
                // DownLeft:
                this.diagonal = this.columns.isWayBlocked(Math.floor(this.subject.x-1), Math.floor(this.subject.y-1)) ||
                this.columns.isWayBlocked(Math.floor(this.subject.x-1), Math.floor(this.y-1));
                if (this.diagonal) this.diagonalDirection = 'DownLeft';
            }
        }
    }

    movementManager() {

        // A.1 - Firstly, if there is an obstacle right next to you in any direction, cancel movement immediately:
        if (this.xObstruction && (this.xDist == 0)) this.subject.xSpeed = 0;
        if (this.yObstruction && (this.yDist == 0)) this.subject.ySpeed = 0;
        // A.2 - Nuke the diagonals!!!!!
        switch(this.diagonalDirection) {
            case "UpRight":
                this.subject.xSpeed = 0;
                this.diagonal = 0;
                this.diagonalDirection = '';
                break;
            case "DownRight":
                this.subject.ySpeed = 0;
                this.diagonal = 0;
                this.diagonalDirection = '';
                break;
            case "UpLeft":
                this.subject.xSpeed = 0;
                this.diagonal = 0;
                this.diagonalDirection = '';
                break;
            case "DownLeft":
                this.subject.ySpeed = 0;
                this.diagonal = 0;
                this.diagonalDirection = '';
                break;
        };

        // B - Next, if you're obstructed but still some ways away from it, check the distance vs speed and reduce movement based on that:
        if (this.xObstruction && (Math.abs(this.subject.xSpeed)) > (Math.abs(this.xDist))) this.subject.xSpeed = this.xDist;
        if (this.yObstruction && (Math.abs(this.subject.ySpeed)) > (Math.abs(this.yDist))) this.subject.ySpeed = this.yDist;

        // C - MANAGE MOVEMENT: HORIZONTAL:
        if (this.subject.xSpeed != 0) {
            // These lines work ambidirectionally since your speed is negative if you're moving left:
            this.subject.x += this.subject.xSpeed; 
            this.subject.gridX = Math.round(this.subject.x);
            this.subject.domElement.style.left = `${(this.subject.x - thomas.horizontalOffset) * PLAYER_WIDTH}px`;
        // C.2 - Coefficients of Friction to reduce X momentum:
            // Since this DOES depend on the direction of your movement, we'll do separate RHS and LHS versions of the switch block:
            if (this.subject.xSpeed > 0) {
                switch(this.subject.standingOn) {
                    case 0:     // air first
                        this.subject.xSpeed -= airFriction;
                        break;
                    case "008":     // ice
                        this.subject.xSpeed -= iceFriction;
                        break;
                    default:   // All other terrain
                        this.subject.xSpeed -= landFriction;
                        if (this.subject.xSpeed < 0) this.subject.xSpeed = 0;
                };
            } else {
                switch(this.subject.standingOn) {
                    case 0:
                        this.subject.xSpeed += airFriction;
                        break;
                    case "008":
                        this.subject.xSpeed += iceFriction;
                        break;
                    default:
                        this.subject.xSpeed += landFriction;
                        if (this.subject.xSpeed > 0) this.subject.xSpeed = 0;
                };
            }
            // (this.subject.xSpeed > 0) ? this.subject.xSpeed -= landFriction : this.subject.xSpeed += landFriction;
        };
        // Eliminate marginal movement due to imperfect intervals:
        if ((this.subject.xSpeed > 0) && (this.subject.xSpeed <= minimumVelocity)) this.subject.xSpeed = 0;
        if ((this.subject.xSpeed < 0) && (this.subject.xSpeed >= -minimumVelocity)) this.subject.xSpeed = 0;
        
        // D - MANAGE MOVEMENT: VERTICAL:
        if (this.subject.ySpeed != 0) {
            this.subject.y += this.subject.ySpeed;
            if (this.subject.ySpeed > -terminalVelocity) this.subject.ySpeed -= gravity;
            this.subject.gridY = Math.round(this.subject.y);
            this.subject.domElement.style.bottom = `${this.subject.y * PLAYER_WIDTH}px`;
        };
        // Round off and eliminate remainder momentum:
        if ((this.subject.ySpeed > 0) && (this.subject.ySpeed < minimumVelocity)) this.subject.ySpeed = 0;
        if ((this.subject.ySpeed < 0) && (this.subject.ySpeed > minimumVelocity)) this.subject.ySpeed = 0;

        // E - Reset all blockage values for the next cycle:
        this.xObstruction = 0;
        this.xDist = 0;
        this.yObstruction = 0;
        this.yDist = 0;

        // F - Update Player Coordinates Display:
        this.displaySubjectCoords.innerText = `PLAYER COORDS: ${this.subject.x.toFixed(2)}, ${this.subject.y.toFixed(2)}`;

        // G - Apply gravity for the next cycle:
        if (this.subject.ySpeed === 0) this.subject.ySpeed -= gravity;
    };

    // Quick function to determine what you're standing on. NOTE: Tweak to allow jumping when you're > 50% over a ledge:
    determineSurface() {
        if (Number.isInteger(this.subject.y)) {
            this.subject.standingOn = this.columns.blockTypeDetector(this.subject.gridX, (this.subject.y-1));
            this.displaySubjectStandingOn.innerText = `Standing on block type: ${this.subject.standingOn}`;
          } else {
            this.subject.standingOn = 0;
            this.displaySubjectStandingOn.innerText = `Standing on block type: ${this.subject.standingOn}`;
          }
    }

    // And a function to tell what medium you're in (basically air or water are your options at the moment):
    determineMedium() {
        this.subject.medium = this.columns.blockTypeDetector(this.subject.gridX, (this.subject.y));
        (this.subject.medium == 5) ? this.displaySubjectMedium.innerText = 'Player is in water!':
        this.displaySubjectMedium.innerText = '';
    }
};