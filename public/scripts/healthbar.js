// The healthbar is a little div that floats above damaged baddies, indicating how much HP they have left:

class Healthbar extends Entity {
    constructor(root, x, y, xOffset, yOffset, owner_id) {
        super(root, x, y + 1.5);  // Add one to the y value to make the bar appear above the baddie!
        this.horizontalOffset = xOffset;
        this.verticalOffset = yOffset;
        this.id = `${owner_id}-healthbar`;
        this.domElement = document.createElement('div');
        this.domElement.id = this.id;
        this.domElement.classList.add('baddie-healthbar');
        this.fullness = 100;        // Fullness = % HP converted to width value.
    }

    handleRender = () => {
        this.render();
        this.horizontalTranslate(this.horizontalOffset);
        this.verticalTranslate(this.verticalOffset);
    }

    // Use two 2-part lists to update position!
    updatePosition = (x, y, xOffset, yOffset) => {
        this.x = x;
        this.y = y;
        this.horizontalOffset = xOffset;
        this.verticalOffset = yOffset;
        this.horizontalTranslate(this.horizontalOffset);
        this.verticalTranslate(this.verticalOffset);
    }

    // Each cycle the baddie passes their HP, as a fraction of 1, to update the width of the health bar:
    updateFullness = (fraction) => {
        this.fullness = fraction;
        let hpColor = fraction > 0.7 ?
        'limegreen' : fraction > 0.4 ?
        'yellow' :
        'red';
        this.domElement.style.backgroundColor = hpColor;
        this.domElement.style.width = `${this.fullness * PLAYER_WIDTH}px`;
    }
}