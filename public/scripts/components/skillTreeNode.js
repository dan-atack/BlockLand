class SkillTreeNode {
    // The Skill Tree Node object is a two-part element in the DOM - A div containing a span.
    // Six initial attributes needed: root node, x and y coords, text and status (either 'available', 'purchased' or 'unavailable')
    // Branches is an optional argument that will position connector images at a given angle:
    constructor(root, x, y, skillData, status='available') {
        this.root = root;
        this.x = x;
        this.y = y;
        this.skillData = skillData;
        this.id = skillData.id;
        this.text = skillData.text;
        this.tooltipText = skillData.tooltipText;
        this.status = status;
        this.branches = [];     // This list will keep track of any branch elements to be displayed/derendered.
        // These booleans will be flipped in the event that the node is clicked on and available:
        this.justSelected = false;    // Flag for whether this Skill has just been selected.
        this.justPurchased = false;   // Flag for whether this Skill has just been purchased.
        // Create elements:
        this.container = document.createElement('div');
        this.textField = document.createElement('span');
        this.tooltip = document.createElement('span');
        this.textField.innerText = this.text;
        this.tooltip.innerText = this.tooltipText;
        // Give elements unique IDs:
        this.containerId = `ST-Node-${this.text.split(' ')[0]}-${x}-${y}`;
        this.textFieldId = `ST-Text-${this.text.split(' ')[0]}-${x}-${y}`;
        // Assign CSS classes: General class for each element, and a specific class for the skill's status:
        this.container.classList.add('skill-tree-container');
        this.container.classList.add(this.status);
        this.textField.classList.add('skill-tree-text');
        this.tooltip.classList.add('tooltiptext');
        // Position the container:
        this.container.style.bottom = `${this.y * BLOCK_WIDTH}px`;
        this.container.style.left = `${this.x * BLOCK_WIDTH}px`;
        // EXPERIMENTAL: Can we click the div as if it were a button? YES WE CAN!!!
        this.container.onmouseup = this.handleSelect;
        // Now the tricky bit: append the container to the root, and the text field to the container. Anh.
        this.root.append(this.container);
        this.container.append(this.textField);
        this.container.append(this.tooltip);
    }

    // Branches will be rendered separately from the constructor function, and passed as a list of angles at which to render a branch:
    renderBranches = (branches) => {
        branches.forEach((angle) => {
            const branch = document.createElement('img');
            branch.src = './assets/effects/animations/dna.gif';
            branch.classList.add('skill-tree-branch');
            branch.style.transform = `rotateZ(${angle}deg)`;
            switch (angle) {
                case 45:
                    branch.style.bottom = '16px';
                    branch.style.left = '75%';
                    break;
                case 90:
                    branch.style.bottom = '-40%';
                    branch.style.left = '20px';
                    break;
                case 180:
                    branch.style.bottom = '30px';
                    branch.style.right = '100%';
                    break;
                case 270:
                    branch.style.top = '-40%';
                    branch.style.left = '20px';
                    break;
                case 325:
                    branch.style.bottom = '-4px';
                    branch.style.left = '-45%';
                    break;
                case 0:
                    branch.style.bottom = '30px';
                    branch.style.left = '100%';
            }
            this.branches.push(branch);
            this.container.append(branch);
        })
    }

    // DOM element cleanup:
    deRender = () => {
        this.branches.forEach((branch) => this.container.removeChild(branch));
        this.container.removeChild(this.textField);
        this.container.removeChild(this.tooltip);
        this.root.removeChild(this.container);
    }

    // Handler for user interaction:
    handleSelect = () => {
        if (this.status === 'unavailable') {
            const popupData = [
                this.root,
                this.x - 2,
                this.y,
                0,
                0,
                {id: this.x + this.y, text: `${this.text} cannot be obtained... yet!`, type: 'skill-tree-alert', duration: 2.5},
              ];
              makePopup(popupData);
              playSound('purchase-fail-sound');
        } else if (this.status === 'available') {
            const popupData = [
                this.root,
                this.x - 2,
                this.y,
                0,
                0,
                {id: this.x + this.y, text: 'Click again to confirm skill purchase!', type: 'skill-tree-select', duration: 2.5},
            ];
            makePopup(popupData);
            playSound('select-sound');
            this.container.classList.add('selected');
            this.container.onmouseup = this.handleConfirm;
            this.justSelected = true;
        } else if (this.status === 'purchased') {
            const popupData = [
                this.root,
                this.x - 2,
                this.y,
                0,
                0,
                {id: this.x + this.y, text: 'You already have this skill!', type: 'skill-tree-select', duration: 2.5},
              ];
              makePopup(popupData);
        }
    }

    handleConfirm = () => {
        const popupData = [
            this.root,
            this.x - 2,
            this.y,
            0,
            0,
            {id: this.x + this.y, text: `${this.text} purchased!`, type: 'skill-tree-confirm', duration: 2.5},
        ];
        makePopup(popupData);
        playSound('confirm-sound');
        this.status = 'purchased';
        this.justPurchased = true;
        this.container.classList.remove('selected');
        this.container.classList.add('purchased');
    }

    makeUnavailable = () => {
        this.status = 'unavailable';
        this.container.classList.add('unavailable');
    }

}