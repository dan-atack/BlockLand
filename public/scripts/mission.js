// The Mission(S!) object will manipulate all information having to do with levels/missions, and will be responsible for populating
// the sidebar with relevant data, as well as calling individual missions from the missions library.

class Mission {
    // Expected root is sidebar, and subject is of course the player, followed by the contents of the array imported from the mission data file:
    constructor(root, subject, missionData) {
        this.root = root;
        this.subject = subject;
        // Unpack mission data array... somewhat ugly but effective:
        this.levelNumber = missionData[0];
        this.difficulty = missionData[1];
        this.brief = missionData[2];
        this.achievementStatement = missionData[3];
        this.objectivesRemaining = [];
        missionData[4].forEach(objectiveData => {
            let obj = new Objective(this.subject, objectiveData);
            this.objectivesRemaining.push(obj);
        });
        this.setupInstructions = missionData[5] || null;    // optional fifth parameter: thing/s to setup for the mission
        this.numberOfSetupSteps = 0;                        // will inform the engine how many instructions to follow for setup
        this.specialFX = missionData[6] || null;            // optional sixth parameter: special FX cues!
        // We'll store achieved objectives to keep, crossed off so we know we did them.
        this.objectivesAchieved = [];
        this.accomplished = false;
        this.victoryMessageAwarded = false;
    }

    // Engine will call this if an objective goes ping:
    manageAchievements() {
        // Display mission objectives/user xp on the sidebar:
        missionBar.innerText = `CURRENT MISSION: ${this.brief}`;
        playerXP.innerText = `PLAYER XP: ${this.subject.experience}`;
        // Filter out accomplished objectives:
        this.objectivesRemaining = this.objectivesRemaining.filter(objective => objective.achieved !== true);
        this.objectivesRemaining.forEach(objective => {
            objective.test();
            if (objective.achieved) {
                this.subject.experience += objective.xpValue;
                playerXP.classList.add("XP");
                this.objectivesAchieved.push(objective);
                let achievementTextHeight = (this.subject.y < 6) ? (this.subject.y + 1) : 7;
                let announcement = new Text(world, (this.subject.x - this.subject.horizontalOffset), (achievementTextHeight), 22, `${objective.achievementStatement} +${objective.xpValue} XP!`, "achievement");
                setTimeout(() => {
                    announcement.removeDOM();
                    playerXP.classList.remove("XP");
                }, 3000);
            }
        })
        if ((this.objectivesRemaining.length === 0) && !(this.victoryMessageAwarded)) {
            this.accomplished = true;
            // Hello Shiny text!
            playerXP.classList.add("levelup");
            missionBar.classList.add("levelup");
            let achievementTextHeight = (this.subject.y < 6) ? (this.subject.y + 2) : 8;
            let announcement = new Text(world, (this.subject.x - this.subject.horizontalOffset), (achievementTextHeight), 24, this.achievementStatement, "achievement");
                setTimeout(() => {
                    announcement.removeDOM();
                    playerXP.classList.remove("levelup");
                    missionBar.classList.remove("levelup");
                    this.victoryMessageAwarded = false;
                }, 4500);
            this.victoryMessageAwarded = true;
        };
    }

    loadNewMission(newMissionData) {
        // Clear out everything from the previous mission, then rerun all of the constructor function's mission data unpacking processes:
        this.accomplished = false;
        this.numberOfSetupSteps = 0;
        this.victoryMessageAwarded = false;
        this.objectivesAchieved = [];
        this.levelNumber = newMissionData[0];
        this.difficulty = newMissionData[1];
        this.brief = newMissionData[2];
        this.achievementStatement = newMissionData[3];
        this.objectivesRemaining = [];
        newMissionData[4].forEach(objectiveData => {
            let obj = new Objective(this.subject, objectiveData);
            this.objectivesRemaining.push(obj);
        });
        // Setup instructions will be another array of arrays; one array per set of instructions so you can change many things if needed:
        this.setupInstructions = newMissionData[5] || null;
        // The Missions module will report to the engine how many sets of setup instructions to execute when it loads the level:
        if (this.setupInstructions) this.numberOfSetupSteps = this.setupInstructions.length;
        this.specialFX = newMissionData[6] || null;
    }

};