// The Obstructions Object will calculate the positions and relative distances between all moving entities in the game.
// Its compare method will look up close interactions in the Baddie Actions Dictionary (given below) to determine an outcome.

class Collisions {
  // Constructor will take the player and baddies separately, compare their positions each cycle, and update the collision status of
  // any sprites involved in a collision (i.e. the player + one or more baddies):
  constructor(player) {
    this.player = player;
  }

  // DF method will determine who faces who in collisions that occur between player and baddie:
  determineFacing(deltaX, deltaEu, player, baddie) {
    let absDeltaX = Math.abs(deltaX);
    // Enter the logic tree: If delta x is greater than zero, player is to the right of the baddie:
    if (deltaX > 0) {
      if (player.facing === 'right') {
        if (baddie.facing === 'right') {
          // Player is to the right, player faces right, baddie faces right: baddie is behind you!
          // If enemy is behind you then it doesn't matter if you're attacking:
          if (
            deltaEu <
            badDictionary[`baddie_${baddie.type}`].baddieBehind.killRadius
          ) {
            player.collisionStatus = `impact-with-${baddie.id}`;
            console.log('they came from... behind!');
            console.log(
              `your position: ${player.x}, ${player.y}; their position: ${baddie.x}, ${baddie.y}, euclid: ${deltaEu}`
            );
          }
        } else {
          // Player is to the right, player faces right, baddie faces left: you stand back-to-back.
          // if you and baddie stand back to back then it doesn't matter if you're attacking:
          if (
            deltaEu <
            badDictionary[`baddie_${baddie.type}`].backToBack.killRadius
          ) {
            player.collisionStatus = `impact-with-${baddie.id}`;
            console.log('back to back');
            console.log(
              `your position: ${player.x}, ${player.y}; their position: ${baddie.x}, ${baddie.y}, euclid: ${deltaEu}`
            );
          }
        }
        // Player faces left:
      } else {
        if (baddie.facing === 'right') {
          // Player is to the right, player faces left, baddie faces right: you face each other:
          // Since you face the baddie, attacking IS possible:
          if (
            // Player must be in the attacking state to consider whether a strike is successful:
            player.isAttacking &&
            // Distance-to-strike calculus: Strike succeeds if (player attack radius > [Euclidean distance MINUS baddie WIDTH])
            player.attackRadius >
              deltaEu - badDictionary[`baddie_${baddie.type}`].spriteWidth
          ) {
            // if attack is successful, the baddie is killed!
            baddie.collisionStatus = 'hit-from-front';
            console.log(
              'kill successful at relative distance ',
              deltaEu - badDictionary[`baddie_${baddie.type}`].spriteWidth
            );
            // If your strike fails we must consider whether you can now be killed by them:
          } else if (
            deltaEu <
            badDictionary[`baddie_${baddie.type}`].faceToFace.killRadius
          ) {
            player.collisionStatus = `impact-with-${baddie.id}`;
            console.log('face to face');
            console.log(
              `your position: ${player.x}, ${player.y}; their position: ${
                baddie.x
              }, ${baddie.y}, euclid: ${deltaEu}, attack rad: ${
                player.attackRadius
              }, thickness: ${baddie.spriteWidth}, relative distance: ${
                deltaEu - baddie.spriteWidth
              }`
            );
          }
        } else {
          // Player is to the right, player faces left, baddie faces left: player is behind baddie!
          // This is the last case where the player stands to the right of a baddie and has the opportunity to attack:
          if (
            player.isAttacking &&
            player.attackRadius >
              deltaEu - badDictionary[`baddie_${baddie.type}`].spriteWidth
          ) {
            // if attack succeeds, the baddie is killed!
            baddie.collisionStatus = 'hit-from-behind';
            console.log(
              'kill successful at relative distance ',
              deltaEu - badDictionary[`baddie_${baddie.type}`].spriteWidth
            );
          } else if (
            deltaEu <
            badDictionary[`baddie_${baddie.type}`].playerBehind.killRadius
          ) {
            player.collisionStatus = `impact-with-${baddie.id}`;
            console.log('you came from behind.');
            console.log(
              `your position: ${player.x}, ${player.y}; their position: ${baddie.x}, ${baddie.y}, euclid: ${deltaEu}`
            );
          }
        }
      }
    } else {
      // If your delta X is less than zero Player is LEFT of the baddie:
      if (player.facing === 'right') {
        if (baddie.facing === 'right') {
          // Player is left of the baddie, facing right, and baddie faces right: player is behind baddie!
          // Since you face the baddie you can attempt an attack:
          if (
            player.isAttacking &&
            player.attackRadius >
              deltaEu - badDictionary[`baddie_${baddie.type}`].spriteWidth
          ) {
            // if they are, the baddie is killed!
            baddie.collisionStatus = 'hit-from-behind';
            console.log(
              'kill successful at relative distance ',
              deltaEu - badDictionary[`baddie_${baddie.type}`].spriteWidth
            );
          } else if (
            deltaEu <
            badDictionary[`baddie_${baddie.type}`].playerBehind.killRadius
          ) {
            player.collisionStatus = `impact-with-${baddie.id}`;
            console.log('you came from behind.');
            console.log(
              `your position: ${player.x}, ${player.y}; their position: ${baddie.x}, ${baddie.y}, euclid: ${deltaEu}`
            );
          }
        } else {
          // Player is left of the baddie, player faces right, baddie faces left (head-on collision):
          // Attempt attack:
          if (
            player.isAttacking &&
            player.attackRadius >
              deltaEu - badDictionary[`baddie_${baddie.type}`].spriteWidth
          ) {
            // if they are, the baddie is killed!
            baddie.collisionStatus = 'hitFromFront';
            console.log(
              'kill successful at relative distance ',
              deltaEu - badDictionary[`baddie_${baddie.type}`].spriteWidth
            );
          } else if (
            deltaEu <
            badDictionary[`baddie_${baddie.type}`].faceToFace.killRadius
          ) {
            player.collisionStatus = `impact-with-${baddie.id}`;
            console.log('face to face');
            console.log(
              `your position: ${player.x}, ${player.y}; their position: ${baddie.x}, ${baddie.y}, euclid: ${deltaEu}`
            );
          }
        }
        // player faces left:
      } else {
        // Player stands to the left, player faces left, baddie faces right: you face away from each other.
        // No player attack is possible from this angle, so we go straight to seeing if they kill you:
        if (baddie.facing === 'right') {
          if (
            deltaEu <
            badDictionary[`baddie_${baddie.type}`].backToBack.killRadius
          ) {
            player.collisionStatus = `impact-with-${baddie.id}`;
            console.log('back to back');
            console.log(
              `your position: ${player.x}, ${player.y}; their position: ${baddie.x}, ${baddie.y}, euclid: ${deltaEu}`
            );
          }
        } else {
          // Player stands to the left, player faces left, baddie faces left: baddie is behind you!
          // No player attack possible:
          if (
            deltaEu <
            badDictionary[`baddie_${baddie.type}`].baddieBehind.killRadius
          ) {
            player.collisionStatus = `impact-with-${baddie.id}`;
            console.log('they came from behind!');
            console.log(
              `your position: ${player.x}, ${player.y}; their position: ${baddie.x}, ${baddie.y}, euclid: ${deltaEu}`
            );
          }
        }
      }
    }
    baddie.handleCollisions();
  }

  // The compare method will assess the distance between the player and each baddie,
  // And call the DF method if the total distance (considering x and y) is within a given range:
  compare(range, baddies) {
    baddies.forEach((baddie) => {
      // the dead and dying can't hurt you (unless they come back as zombies, but that's in version 7):
      if (!baddie.isDying && !baddie.isDead) {
        const xDist = this.player.x - baddie.x;
        const yDist = this.player.y - baddie.y;
        const euclideanDist = (xDist ** 2 + yDist ** 2) ** 0.5;
        // When the player is within the proximity range, figure out the angles involved:
        if (euclideanDist < range) {
          // let baddieRect = baddie.domElement.getBoundingClientRect();
          // let goodieRect = this.player.domElement.getBoundingClientRect();
          // console.log(
          //   'your left edge: ',
          //   goodieRect,
          //   ' baddie right edge: ',
          //   baddieRect
          // );
          // calculate the (signed) x-distance, and find which direction both sprites are facing:
          let deltaX = this.player.x - baddie.x;
          this.determineFacing(deltaX, euclideanDist, this.player, baddie);
        }
      }
    });
  }
}

// The BAD reference matrix will tell you the outcomes to all angles of encounters with bad-guys.
// The killRadius = the minimum Euclidean distance from a baddie that gets you killed.

const badDictionary = {
  // For this baddie type,
  baddie_1001: {
    // Sprite width is worth taking into account since some baddies will be wider than a single column:
    spriteWidth: 1.125, // width is given in terms of columns
    // For this type of encounter,
    faceToFace: {
      // use the kill radius to determine outcome:
      killRadius: 0.9,
    },
    baddieBehind: {
      killRadius: 0.85,
    },
    playerBehind: {
      killRadius: 0.95, // Note that attacking the stegosaurus from behind is riskier than it is with the foot soldier!
    },
    backToBack: {
      killRadius: 1,
    },
  },
  baddie_1002: {
    spriteWidth: 1,
    // For this type of encounter (initially there are four possible encounter angles),
    faceToFace: {
      // Use the kill radius to determine how close is too close for comfort:
      killRadius: 1,
    },
    baddieBehind: {
      killRadius: 0.8,
    },
    playerBehind: {
      // Baddie kill radii change depend on what angle you're approaching from:
      killRadius: 0.6,
    },
    bothFaceAway: {
      killRadius: 0.65,
    },
  },
};
