// The Animation effect subclass is used to produce short-lived, self-removing GIFs, primarily to illustrate damage in combat:

class Animation extends Effect {
    // Same params as the Effect Class, plus src which is a string name of a specific animation, and direction of the animation's flow:
    constructor(root, xStart, yStart, xOffset, yOffset, spriteId, src, direction) {
        super(root, xStart, yStart, xOffset, yOffset);
        this.domElement.id = `animation-${spriteId}`;   // ID must correspond to the name of the Sprite being wounded, to avoid duplicates.
        this.domElement.src = `./assets/effects/animations/${src}.gif`;
        if (direction === 'right') {
            this.domElement.style.transform = 'rotateY(0deg)';
            this.x -= 2;
        } else {
            this.domElement.style.transform = 'rotateY(180deg)';
            this.x += 0.4;
        }
        this.domElement.classList.add('damage');
        this.duration = 0.5;
    }

    deRender = () => {
        this.domElement.src = '';
        this.root.removeChild(this.domElement);
    }
}