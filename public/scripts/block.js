// Since this is a block game, we'll need a block object class.
// Constructor takes no arguments for now, but in future might have a 'type' that can be specified when
// we make it so there are multiple block types.

class Block {
    // constructor takes 5 arguments: root HTML element, x and y position and block type are all givens, plus we now have
    // the rendered value which is contingent on whether it is appearing in a visible column.
    constructor(root,x,y,type = 1, rendered, horizontalOffset=0) {
        this.root = root;
        this.x = x;
        this.y = y;
        this.type = type;
        // initial block features will be booleans:
        this.isSolid = true;
        if (this.type === 0 || this.type === 5 || this.type === 989) this.isSolid = false;
        this.domElement = document.createElement("img");
        // Ensure block's id number is a string with 3 numerical digits (so we can still use 1 or 2 digit numbers in map-making exercises):
        if (this.type.toString().length != 3) {
            (this.type.toString().length == 2) ? this.type = `0${type}` : this.type = `00${type}`;
        }
        this.domElement.src = `./assets/blocks/block${this.type}.png`;
        // Block dom Element positions are new given in terms of coordinates multiplied by width, to form a 'pseudo-grid':
        this.domElement.style.position = "absolute";
        this.domElement.style.left = `${((x-horizontalOffset)*BLOCK_WIDTH)}px`;
        // I'm tired of y values descending from the cieling. Let's change that:
        this.domElement.style.bottom = `${(y*BLOCK_WIDTH)}px`;
        this.domElement.classList.add("block");
        this.domElement.id = `${this.x},${this.y}`;
        // Blocks will only appear if the printer tells them to:
        this.rendered = rendered;
        if (this.rendered) root.appendChild(this.domElement);
        // We'll use this value to enable the disappear function:
        
        // Special FX for 'bonus' blocks:
        switch(this.type){
            case 999:
                this.domElement.classList.add("golden-egg");
                break;
            case 989:
                this.domElement.classList.add("portal");
                break;
        };
    };

    horizontalTranslate(horizontalOffset) {
        // blocks' dom elements are shifted when the screen moves. The value for horizontal offset increases as the player goes to the right;
        // So, to make the blocks appear to go to the left, we subtract the horizontal offset from their apparent position:
        this.domElement.style.left = `${(this.x - horizontalOffset) * BLOCK_WIDTH}px`;
    }

    toggleDisappear() {
        if (this.rendered) {
            this.root.removeChild(this.domElement);
            this.rendered = false;
        } else {
            this.root.appendChild(this.domElement);
           this.rendered = true;
        }
    }

};