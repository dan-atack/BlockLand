class SkillTreeNode {
    // The Skill Tree Node object is a two-part element in the DOM - A div containing a span.
    // Six initial attributes needed: root node, x and y coords, text and status (either 'available', 'purchased' or 'unavailable')
    constructor(root, x, y, skillData, status='available') {
        this.root = root;
        this.x = x;
        this.y = y;
        this.skillData = skillData;
        this.id = skillData.id;
        this.text = skillData.text;
        this.status = status;
        // This boolean will be flipped in the event that the node is clicked on and available:
        this.justPurchased = false;
        // Create elements:
        this.container = document.createElement('div');
        this.textField = document.createElement('span');
        this.textField.innerText = this.text;
        // Give elements unique IDs:
        this.containerId = `ST-Node-${this.text.split(' ')[0]}-${x}-${y}`;
        this.textFieldId = `ST-Text-${this.text.split(' ')[0]}-${x}-${y}`;
        // Assign CSS classes: General class for each element, and a specific class for the skill's status:
        this.container.classList.add('skill-tree-container');
        this.container.classList.add(this.status);
        this.textField.classList.add('skill-tree-text');
        // Position the container:
        this.container.style.bottom = `${this.y * BLOCK_WIDTH}px`;
        this.container.style.left = `${this.x * BLOCK_WIDTH}px`;
        // EXPERIMENTAL: Can we click the div as if it were a button? YES WE CAN!!!
        this.container.onmouseup = this.handleSelect;
        // Now the tricky bit: append the container to the root, and the text field to the container. Anh.
        this.root.append(this.container);
        this.container.append(this.textField);
    }

    // DOM element cleanup:
    deRender = () => {
        this.container.removeChild(this.textField);
        this.root.removeChild(this.container);
    }

    // Handler for user interaction:
    handleSelect = () => {
        if (this.status === 'unavailable') {
            console.log('This skill cannot be unlocked... yet!');
        } else if (this.status === 'available') {
            console.log('purchasing ', this.text);
            this.status = 'purchased';
            this.justPurchased = true;
            this.container.classList.add('purchased');
        } else if (this.status === 'purchased') {
            console.log('You already have this skill!');
        }
    }

    makeUnavailable = () => {
        this.status = 'unavailable';
        this.container.classList.add('unavailable');
    }

}