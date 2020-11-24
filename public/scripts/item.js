// Items will be placed throughout the world for the Player to pick up and will confer various bonuses:

class Item extends Entity {
    // Trying a new approach to constructors here: the itemData parameter will be a dictionary containing several bits of info:
    constructor(root, x, y, itemData) {       // Namely, 'affects', 'power' and 'duration' to start.
        super(root, x, y);
        this.type = itemData.type;
        this.affects = itemData.affects;
        this.power = itemData.power;
        this.duration = itemData.duration;
        this.domElement.src = `./assets/items/${this.type}.png`;
        this.domElement.id = `${this.type}-${this.x}-${this.y}`;
        this.domElement.classList.add('item');
        this.domElement.style.left = `${this.x * BLOCK_WIDTH}px`;
        this.domElement.style.bottom = `${this.y * BLOCK_WIDTH}px`;
    }

    handleRender = (horizontalRange, verticalRange) => {
        let withinHorizontalRange = false;
        let withinVerticalRange = false;
        // Extend render range by 1 so Items don't disappear abruptly when the screen moves away from them:
        withinHorizontalRange = (this.x >= horizontalRange[0] - 1 && this.x <= horizontalRange[1] + 1)
        withinVerticalRange = (this.y >= verticalRange[0] - 1 && this.y <= verticalRange[1] + 1)
        // If an Item is within both the horizontal AND vertical range, render them (and set has-been-rendered flag).
        if (withinHorizontalRange && withinVerticalRange) {
          this.render()
        } else {
          this.deRender()
        }
      };
}