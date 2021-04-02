class Arrow extends Effect {
    constructor(root, xStart=-8, yStart=9, xOffset=0, yOffset=0) {  // Default position values for the sidebar menu button
        super(root, xStart, yStart, xOffset, yOffset);
        this.domElement.src = 'assets/effects/keyframes/arrow/arrow.png';
        this.domElement.classList.add('pointer');
        this.domElement.classList.add(this.type);
        this.duration = 5;
    }
}