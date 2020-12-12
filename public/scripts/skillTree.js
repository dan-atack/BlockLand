class SkillTree {
    // The app will create the skill-tree element, and assign it as the root when this class is instantiated.
    // SkillsAvailable parameter indicates how many new skills the Player can buy:
    constructor(root, skillsAvailable, skillsPurchased) {
        this.root = root;
        this.skillsAvailable = skillsAvailable;
        this.displayRemaining = new Text(this.root, 0, 7.75, 18, `Skills Available: ${this.skillsAvailable}`, 'skill-tree-pts-remaining');
        // Skills the Player already has will have the status 'purchased':
        this.skillsPurchased = skillsPurchased;
        // Keep track, separately, if which skills have been purchased during this session:
        this.purchasedNow = [];
        // All nodes are in one list, and differentiated by their status (can be available, purchased, or unavailable)
        this.treeNodes = [];
        // Introduce a drop of flexibility here... Just make sure you always have at least as many position options as you have skills!
        this.nodePositions = [[7, 4], [4, 4], [10, 4], [7, 7], [7, 1], [12, 6], [1, 1]];
    }

    renderSkillTree = () => {
        // Map all of the skills using the nodePositions for positioning, and the skillsAvailable/purchased to determine status:
        skills.forEach((skill, idx) => {
            const x = this.nodePositions[idx][0];
            const y = this.nodePositions[idx][1];
            const skillData = skills[idx];
            // Set Skill availability status: start as available, then change to purchased if it's in the skillsPurchased list:
            let status = 'available';
            if (this.skillsPurchased.some((perk) => perk.id === skill.id)) status = 'purchased';
            // If you have no points to spend, change status to unavailable (unless it is purchased already, of course):
            if (this.skillsAvailable <= 0 && status === 'available') status = 'unavailable'
            // Finally, check if a node has any unpurchased prerequisites, and make it unavailable if there are any:
            let idsPurchased = [];
            this.skillsPurchased.forEach((skill) => idsPurchased.push(skill.id));
            skill.prerequisites.forEach((prereq) => {
                console.log(prereq);
                // If any prerequisite is missing from the id's purchased list, make the skill unavailable:
                if (!idsPurchased.includes(prereq)) {
                    status = 'unavailable';
                } 
            })
            const node = new SkillTreeNode(this.root, x, y, skillData, status);
            this.treeNodes.push(node);
        });
        this.root.addEventListener('click', this.listenOnClick);
    }

    cleanup = () => {
        this.treeNodes.forEach((node) => node.deRender());
        this.root.removeEventListener('click', this.listenOnClick);
    }

    // Click listener is activated to monitor changes to the child nodes:
    listenOnClick = () => {
        // check if each node has just been purchased:
        this.treeNodes.forEach((node) => {
            if (node.justPurchased) {
                this.handleSkillPurchase(node);
            }
        });
        // if no skill points remain, set all unpurchased skills to 'unavailable':
        if (this.skillsAvailable <= 0) {
            this.treeNodes.forEach((node) => {
                if (node.status != 'purchased') {
                    node.makeUnavailable();
                }
            })
        }
    }

    updateSkillsAvailable = (delta) => {
        this.skillsAvailable += delta;
        this.displayRemaining.domElement.innerText = `Skills Available: ${this.skillsAvailable}`;
    }

    // If an available skill is selected, this function will be called, to handle the purchase:
    handleSkillPurchase = (skill) => {
        // Reduce the currency available to be spent:
        this.updateSkillsAvailable(-1);
        // THIS ADDS TO THE PLAYER'S SKILL SET AUTOMATICALLY:
        this.skillsPurchased.push(skill.skillData);
        // Keep track of the new skill (just the skill data, not the whole object) so the App knows which skills to augment:
        this.purchasedNow.push(skill.skillData);
        // Set skill's just purchased flag to false, to prevent multiple firings:
        skill.justPurchased = false;
    }
}