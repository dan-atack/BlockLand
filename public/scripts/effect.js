class Effect extends Entity {
    constructor(root, x, y, xOffset, yOffset) {
        super(root, x, y);
        this.horizontalOffset = xOffset;
        this.verticalOffset = yOffset;
        this.duration = 1;  // Default duration is 1 second.
    }

    render = () => {
        this.horizontalTranslate(this.horizontalOffset);
        this.verticalTranslate(this.verticalOffset);
        this.root.appendChild(this.domElement);
        this.rendered = true;
        setTimeout(this.deRender, this.duration * 1000);
    }

    deRender = () => {
        this.root.removeChild(this.domElement);
    }
}