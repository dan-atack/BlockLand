// The Dialogue is a composite element, made up of a paragraph, and an image of a bubble-tick.

// It gets passed all of the info in the dialogue DB (text, id, speaker, etc) passed as a single prop: dialogueData:
class Dialogue extends Entity {
    constructor (root, xStart, yStart, dialogueData) {
        super(root, xStart, yStart)
        this.type = dialogueData.type;
        this.text = dialogueData.text;
        this.id = `dialogue-${dialogueData.id}`;
        // Make element body:
        this.domElement = document.createElement('p');
        this.domElement.id = `dialogue-bubble-${this.id}`;
        this.domElement.classList.add('dialogue');
        this.domElement.innerText = this.text;
        // Make element tail:
        this.bubbleTick = document.createElement('img');
        // Determine whether this dialogue is a spoken text or a thought (currently this only affects the tail image):
        this.type === 'speech' ? this.bubbleTick.src = './assets/bubble-tick.png' : this.bubbleTick.src = './assets/thought-bubble.png';
        this.bubbleTick.id = `bubble-tick-${this.id}`;
        this.bubbleTick.classList.add('bubble-tick');
    }

    render() {
        if (!this.rendered) {
          this.root.appendChild(this.domElement);
          this.domElement.appendChild(this.bubbleTick);
          this.rendered = true;
        }
      }
    
    deRender() {
    if (this.rendered) {
        this.domElement.removeChild(this.bubbleTick);
        this.root.removeChild(this.domElement);
        this.rendered = false;
        }
    }
    
    repositionToParent(x, y, horizontalOffset, verticalOffset, facing) {
        if (facing === 'right') {
            this.x = x - 1.5;
            this.bubbleTick.classList.remove('facing-left');
        } else {
            this.x = x - 4;
            this.bubbleTick.classList.add('facing-left');
        }
        this.avoidHorizontalEdge(x, horizontalOffset);
        // TODO: Use V-offset to override regular positioning if subject is too close to the toporbottom
        this.avoidVerticalEdge(y, verticalOffset, facing);
        this.horizontalTranslate(horizontalOffset);
        this.verticalTranslate(verticalOffset);
    }

    avoidHorizontalEdge = (x, horizontalOffset) => {
        // Override normal rules if subject is too close to the edge of the screen:
        if (x - horizontalOffset > SCREEN_WIDTH_IN_BLOCKS - 4) {
            this.x = x - 5;
            this.bubbleTick.classList.add('facing-left');
        } else if (x - horizontalOffset < 3) {
            this.x = x + 1;
            this.bubbleTick.classList.remove('facing-left');
        }
    }

    avoidVerticalEdge = (y, verticalOffset, facing) => {
        // Override position if subject is too close to the vertical edge as well:
        if (y - verticalOffset > SCREEN_HEIGHT_IN_BLOCKS - 3) {
            this.y = y - 3.5;
            // Invert bubble tick if speech is too high:
            this.bubbleTick.classList.add('bubble-tick-from-above');
            // Flip to face the baddie:
            if (facing === 'right') {
                this.bubbleTick.classList.remove('facing-left');
                this.bubbleTick.classList.remove('bubble-tick-vertical-left');
                this.bubbleTick.classList.add('bubble-tick-vertical-right');
            } else {
                this.bubbleTick.classList.remove('bubble-tick-vertical-right');
                this.bubbleTick.classList.remove('facing-left');
                this.bubbleTick.classList.add('bubble-tick-vertical-left');
            }
        } else if (y - verticalOffset < 3) {
            this.bubbleTick.classList.remove('bubble-tick-from-above');
            this.bubbleTick.classList.remove('bubble-tick-vertical-right');
            this.bubbleTick.classList.remove('bubble-tick-vertical-left');
            this.y = y + 2.5;
        } else {
            this.y = y + 1.5;   // Regular bubble tick orientation (1.5 blocks above the utterer is a good default position).
            this.bubbleTick.classList.remove('bubble-tick-from-above');
            this.bubbleTick.classList.remove('bubble-tick-vertical-right');
            this.bubbleTick.classList.remove('bubble-tick-vertical-left');
        }
    }
}