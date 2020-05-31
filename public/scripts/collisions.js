// The Obstructions Object will be a summary of the positions and relative distances between all moving entities in the game.
// Its compare method will initially ping whenever a baddie gets within a given distance of the player.

class Collisions {
  // Constructor will take the player and baddies separately, compare their positions each cycle, and update the collision status of
  // any sprites involved in a collision (i.e. the player + one or more baddies):
  constructor(player, baddies) {
    this.baddies = baddies;
    this.player = player;
  }

  // Sub-function will determine who faces who in collisions that occur between player and baddie:
  determineFacing(deltaX, player, baddie) {
    console.log(
      `player faces ${player.facing} at ${deltaX} range from baddie, who faces ${baddie.facing}`
    );
    player.collisionStatus = 'impact';
    baddie.collisionStatus = 'impact';
    baddie.handleCollisions();
    // switch (baddie.facing) {
    //   // if enemy faces right
    //   case 'right':
    //      //and your x value is greater, enemy faces you:
    //     if (this.player.facing === 'right' && pla)
    // }
  }

  // The methods:
  compare(range) {
    this.baddies.forEach((baddie) => {
      let xDist = this.player.x - baddie.x;
      let yDist = this.player.y - baddie.y;
      // When the player is within the proximity range, figure out the angles involved:
      if ((xDist ** 2 + yDist ** 2) ** 0.5 < range) {
        console.log((xDist ** 2 + yDist ** 2) ** 0.5);
        // calculate the the (non-absolute) distance, and find which direction both sprites are facing:
        let deltaX = this.player.x - baddie.x;
        this.determineFacing(deltaX, this.player, baddie);
      }
    });
  }
}

// Math.abs(xDist) < range && Math.abs(yDist) < range
