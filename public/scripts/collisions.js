// The Obstructions Object will calculate the positions and relative distances between all moving entities in the game.
// Its compare method will look up close interactions in the Baddie Actions Dictionary (given below) to determine an outcome.

class Collisions {
  // Constructor will take the player and baddies separately, compare their positions each cycle, and update the collision status of
  // any sprites involved in a collision (i.e. the player + one or more baddies):
  constructor(player, baddies) {
    this.baddies = baddies;
    this.player = player;
  }

  // DF method will determine who faces who in collisions that occur between player and baddie:
  determineFacing(deltaX, player, baddie) {
    let absDeltaX = Math.abs(deltaX);
    console.log(
      `player faces ${player.facing} at ${absDeltaX} range from baddie, who faces ${baddie.facing}`
    );
    // Enter the logic tree: If delta x is greater than zero, player is to the right of the baddie:
    if (deltaX > 0) {
      if (player.facing === 'right') {
        // If you're to the right, and you and the enemy face right, enemy is behind you:
        if (baddie.facing === 'right') {
          console.log('they came from behind!');
          // For every situation, check if player is attacking and if their distance is within the appropriate range:
          if (
            player.isAttacking &&
            absDeltaX >
              badDictionary[baddie.id].baddieBehind.attackSuccessRange[0] &&
            absDeltaX <
              badDictionary[baddie.id].baddieBehind.attackSuccessRange[1]
          ) {
            // if they are, the baddie is killed!
            baddie.collisionStatus = 'hitFromFunnyAngle';
            console.log('kill successful at range', absDeltaX);
          } else if (
            absDeltaX < badDictionary[baddie.id].baddieBehind.killRadius
          ) {
            player.collisionStatus = 'impact';
          }
        } else {
          console.log('back to back');
          if (
            player.isAttacking &&
            absDeltaX >
              badDictionary[baddie.id].backToBack.attackSuccessRange[0] &&
            absDeltaX <
              badDictionary[baddie.id].backToBack.attackSuccessRange[1]
          ) {
            // if they are, the baddie is killed!
            baddie.collisionStatus = 'hitFromElsewhere';
            console.log('kill successful at range', absDeltaX);
          } else if (
            absDeltaX < badDictionary[baddie.id].backToBack.killRadius
          ) {
            player.collisionStatus = 'impact';
          }
        }
        // player faces left:
      } else {
        if (baddie.facing === 'right') {
          console.log('face to face');
          if (
            player.isAttacking &&
            absDeltaX >
              badDictionary[baddie.id].faceToFace.attackSuccessRange[0] &&
            absDeltaX <
              badDictionary[baddie.id].faceToFace.attackSuccessRange[1]
          ) {
            // if they are, the baddie is killed!
            baddie.collisionStatus = 'hitFromFront';
            console.log('kill successful at range', absDeltaX);
          } else if (
            absDeltaX < badDictionary[baddie.id].faceToFace.killRadius
          ) {
            player.collisionStatus = 'impact';
          }
        } else {
          console.log('you came from behind.');
          if (
            player.isAttacking &&
            absDeltaX >
              badDictionary[baddie.id].playerBehind.attackSuccessRange[0] &&
            absDeltaX <
              badDictionary[baddie.id].playerBehind.attackSuccessRange[1]
          ) {
            // if they are, the baddie is killed!
            baddie.collisionStatus = 'hitFromBehind';
            console.log('kill successful at range', absDeltaX);
          } else if (
            absDeltaX < badDictionary[baddie.id].playerBehind.killRadius
          ) {
            player.collisionStatus = 'impact';
          }
        }
      }
    } else {
      // If your delta X is less than zero you are left of the baddie:
      if (player.facing === 'right') {
        // If you are left of the baddie, facing right, and baddie faces right, you are behind him:
        if (baddie.facing === 'right') {
          console.log('you came from behind.');
          if (
            player.isAttacking &&
            absDeltaX >
              badDictionary[baddie.id].playerBehind.attackSuccessRange[0] &&
            absDeltaX <
              badDictionary[baddie.id].playerBehind.attackSuccessRange[1]
          ) {
            // if they are, the baddie is killed!
            baddie.collisionStatus = 'hitFromBehind';
            console.log('kill successful at range', absDeltaX);
          } else if (
            absDeltaX < badDictionary[baddie.id].playerBehind.killRadius
          ) {
            player.collisionStatus = 'impact';
          }
        } else {
          console.log('face to face');
          if (
            player.isAttacking &&
            absDeltaX >
              badDictionary[baddie.id].faceToFace.attackSuccessRange[0] &&
            absDeltaX <
              badDictionary[baddie.id].faceToFace.attackSuccessRange[1]
          ) {
            // if they are, the baddie is killed!
            baddie.collisionStatus = 'hitFromFront';
            console.log('kill successful at range', absDeltaX);
          } else if (
            absDeltaX < badDictionary[baddie.id].faceToFace.killRadius
          ) {
            player.collisionStatus = 'impact';
          }
        }
        // player faces left:
      } else {
        if (baddie.facing === 'right') {
          console.log('back to back');
          if (
            player.isAttacking &&
            absDeltaX >
              badDictionary[baddie.id].backToBack.attackSuccessRange[0] &&
            absDeltaX <
              badDictionary[baddie.id].backToBack.attackSuccessRange[1]
          ) {
            // if they are, the baddie is killed!
            baddie.collisionStatus = 'hitFromFunnyAngle';
            console.log('kill successful at range', absDeltaX);
          } else if (
            absDeltaX < badDictionary[baddie.id].backToBack.killRadius
          ) {
            player.collisionStatus = 'impact';
          }
        } else {
          console.log('they came from behind!');
          if (
            player.isAttacking &&
            absDeltaX >
              badDictionary[baddie.id].baddieBehind.attackSuccessRange[0] &&
            absDeltaX <
              badDictionary[baddie.id].baddieBehind.attackSuccessRange[1]
          ) {
            // if they are, the baddie is killed!
            baddie.collisionStatus = 'hitFromElsewhere';
            console.log('kill successful at range', absDeltaX);
          } else if (
            absDeltaX < badDictionary[baddie.id].baddieBehind.killRadius
          ) {
            player.collisionStatus = 'impact';
          }
        }
      }
    }
    baddie.handleCollisions();
  }

  // The compare method will assess the distance between the player and each baddie,
  // And call the DF method if the total distance (considering x and y) is within a given range:
  compare(range) {
    this.baddies.forEach((baddie) => {
      if (!baddie.isDead) {
        let xDist = this.player.x - baddie.x;
        let yDist = this.player.y - baddie.y;
        // When the player is within the proximity range, figure out the angles involved:
        if ((xDist ** 2 + yDist ** 2) ** 0.5 < range) {
          console.log((xDist ** 2 + yDist ** 2) ** 0.5);
          // calculate the the (non-absolute) distance, and find which direction both sprites are facing:
          let deltaX = this.player.x - baddie.x;
          this.determineFacing(deltaX, this.player, baddie);
        }
      }
    });
  }
}

// The BAD reference matrix will tell you the outcomes to all manner of encounters with bad-guys.
// Structure is as follows: Baddie type --> encounter angle --> {(attack?) + distance} --> outcome,
// If the player is making an attack, check if the distance is within the attack's min/max range; if it isn't, or if the player
// is not making an attack, check if the distance is within the kill radius. If the player is making an attack and the distance is
// within the acceptable range, the baddie dies. If the player is outside of the successful attack range but within the kill radius,
// the player dies. If neither range is applicable, then no outcome is produced.
const badDictionary = {
  // For this baddie type,
  baddie_1001: {
    // For this type of encounter,
    faceToFace: {
      // attacks (if they're taking place and if they're allowed) must occur within a specified range to succeed:
      attackSuccessRange: [0.5, 1.5],
      // If no attack is made, or it is out of the 'goldilocks zone', use the kill radius to determine outcome:
      killRadius: 1,
    },
    baddieBehind: {
      attackSuccessRange: [0, 0], // an attack range of zero means that from this angle no attacks are possible.
      killRadius: 1,
    },
    playerBehind: {
      attackSuccessRange: [0.5, 1.5], // Note that attacking this baddie from behind has a wider tolerance range for success.
      killRadius: 1, // Note that attacking the stegosaurus from behind is riskier than it is with the foot soldier!
    },
    backToBack: {
      attackSuccessRange: [0, 0],
      killRadius: 1,
    },
  },
  baddie_1002: {
    // For this type of encounter (initially there are four possible encounter angles),
    faceToFace: {
      // attacks (if they're taking place and if they're allowed) must occur within a specified range to succeed:
      attackSuccessRange: [0.5, 1.5],
      // If no attack is made, or it is out of the 'goldilocks zone', use the kill radius to determine outcome:
      killRadius: 1,
    },
    baddieBehind: {
      attackSuccessRange: [0, 0], // an attack range of zero means that from this angle no attacks are possible.
      killRadius: 1,
    },
    playerBehind: {
      attackSuccessRange: [0.5, 1.5], // Note that attacking this baddie from behind has a wider tolerance range for success...
      killRadius: 0.6, // ... and a narrower kill radius against you!
    },
    bothFaceAway: {
      attackSuccessRange: [0, 0],
      killRadius: 0.6,
    },
  },
};
