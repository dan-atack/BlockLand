// The Obstructions Object will be a summary of the position and relative distance between an entity and the terrain around it,
// and will be used to guide the Physics object's movement management system:

class Obstruction {
    constructor() {
        // First show data for obstructions in the x-axis:
        this.xDirection = '';    // we'll use a string for 'left' or 'right'
        this.distanceToXObstruction = 0;
        this.yDirection = '';    // same for 'up' and 'down'
        this.distanceToYObstruction = 0;
        // if a diagonal obstruction is signaled we'll pass its x and y directions to the physics engine and have it 'split'
        // the subject's movement vector to cancel momentum in one direction to avoid the corner.
        this.diagonal = '';      // e.g. 'upLeft', 'downRight', etc.
    }
}