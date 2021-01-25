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
        console.log(x - horizontalOffset);
        if (facing === 'right') {
            this.x = x - 1.5;
            this.bubbleTick.style.transform = 'rotateY(0deg)';
        } else {
            this.x = x - 4;
            this.bubbleTick.style.transform = 'rotateY(180deg)';
        }
        // Override normal rules if subject is too close to the edge of the screen:
        if (x - horizontalOffset > 17) {
            this.x = x - 5;
            this.bubbleTick.style.transform = 'rotateY(180deg)';
            // this.bubbleTick.style.left = `${(x - horizontalOffset - 16) * 25}%`;
        } else if (x - horizontalOffset < 3) {
            this.x = x + 1;
            this.bubbleTick.style.transform = 'rotateY(0deg)';
        }
        this.y = y + 1.5;
        this.horizontalTranslate(horizontalOffset);
        this.verticalTranslate(verticalOffset);
    }
}