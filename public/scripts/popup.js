// The Popup will be a short-lived entity, whose purpose is to quickly display some info, then manage its own disappearance.

// Prop Types: root = HTML Node, x & y = origin coords, offsets = parent's offsets, dialogueData has this shape:
// {
//     id: number,
//     text: string,
//     type: string of CSS classname e.g. 'announcement-health'
//     duration: number of milliseconds
// }

class Popup extends Entity {
    constructor(root, xStart, yStart, xOffset, yOffset, dialogueData) {
        super(root, xStart, yStart);
        this.horizontalOffset = xOffset;
        this.verticalOffset = yOffset;
        this.domElement = document.createElement('p');
        this.domElement.innerText = dialogueData.text;
        this.type = dialogueData.type;
        this.id = `dialogue-${dialogueData.id}`;
        this.duration = dialogueData.duration || 1;   // Set 1 second as default duration for popups
        this.domElement.classList.add('popup');
        this.domElement.classList.add(this.type);
    }

    render = () => {
        this.horizontalTranslate(this.horizontalOffset);
        this.verticalTranslate(this.verticalOffset);
        this.root.appendChild(this.domElement);
        this.rendered = true;
        setTimeout(this.deRender, this.duration * 1000);
    }

    deRender = () => {
        this.root.removeChild(this.domElement)
    }
}