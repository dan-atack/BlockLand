// The Mission(S!) object will manipulate all information having to do with levels/missions, and will be responsible for populating
// the sidebar with relevant data, as well as calling individual missions from the missions library.

class Mission {
  // Subject is of course the player, followed by the contents of the array imported from the mission data file:
  constructor(subject, missionData) {
    this.subject = subject;
    // Unpack mission data array... somewhat ugly but effective:
    this.levelNumber = missionData.levelNumber;
    this.levelName = missionData.levelName;
    this.brief = missionData.brief;
    this.achievementStatement = missionData.achievementStatement;
    this.objectivesRemaining = [];
    missionData.objectives.forEach((objectiveData) => {
      let obj = new Objective(this.subject, objectiveData);
      this.objectivesRemaining.push(obj);
    });
    this.setupInstructions = missionData.setupInstructions; // optional fifth parameter: thing/s to setup for the mission
    this.numberOfSetupSteps = 0; // will inform the engine how many instructions to follow for setup
    this.specialFX = missionData.specialFX; // optional sixth parameter: special FX cues!
    this.dialogue = missionData.dialogue;   // optional dictionary of dialogue options
    // We'll store achieved objectives to keep, crossed off so we know we did them.
    this.objectivesAchieved = [];
    this.accomplished = false;
    this.victoryMessageAwarded = false;
  }

  // Engine will call this if an objective goes ping:
  manageAchievements() {
    // Filter out accomplished objectives:
    this.objectivesRemaining = this.objectivesRemaining.filter(
      (objective) => objective.achieved !== true
    );
    this.objectivesRemaining.forEach((objective) => {
      objective.test();
      if (objective.achieved) {
        this.subject.gainExperience(objective.xpValue);
        this.objectivesAchieved.push(objective);
        const announcement = new Text(
          document.getElementById('world'),
          0,
          0,
          22,
          objective.achievementStatement,
          'achievement'
        );
        const popupData = [
          this.subject.root,
          this.subject.x,
          this.subject.y,
          this.subject.horizontalOffset,
          this.subject.verticalOffset,
          {id: this.subject.gridX + this.subject.gridY, text: `+ ${objective.xpValue + 1} XP`, type: 'announcement-xp-gain', duration: 2},
        ];
        makePopup(popupData)
        setTimeout(() => {
          announcement.removeDOM();          
        }, 3000);
      }
    });
    if (this.objectivesRemaining.length === 0 && !this.victoryMessageAwarded) {
      this.accomplished = true;
      // Hello Shiny text!
      let announcement = new Text(
        document.getElementById('world'),
        0,
        0,
        24,
        this.achievementStatement,
        'achievement'
      );
      setTimeout(() => {
        announcement.removeDOM();
        this.victoryMessageAwarded = false;
      }, 4500);
      this.victoryMessageAwarded = true;
    }
  }

  loadNewMission(newMissionData) {
    // Clear out everything from the previous mission, then rerun all of the constructor function's mission data unpacking processes:
    this.accomplished = false;
    this.numberOfSetupSteps = 0;
    this.victoryMessageAwarded = false;
    this.objectivesAchieved = [];
    this.levelNumber = newMissionData.levelNumber;
    this.levelName = newMissionData.levelName;
    this.brief = newMissionData.brief;
    this.achievementStatement = newMissionData.achievementStatement;
    this.objectivesRemaining = [];
    newMissionData.objectives.forEach((objectiveData) => {
      let obj = new Objective(this.subject, objectiveData);
      this.objectivesRemaining.push(obj);
    });
    // Setup instructions will be another array of arrays; one array per set of instructions so you can change many things if needed:
    this.setupInstructions = newMissionData.setupInstructions || null;
    // The Missions module will report to the engine how many sets of setup instructions to execute when it loads the level:
    if (this.setupInstructions)
      this.numberOfSetupSteps = this.setupInstructions.length;
    this.specialFX = newMissionData.specialFX || null;
    // Ensure special FX cues are pointed towards existing DOM elements:
    if (this.specialFX) {
      this.specialFX.forEach((effect, idx) => {
        effect.target = document.getElementById(`${newMissionData.specialFX[idx]['target']}`)
      })
    }
    // Reset dialogue cues:
    this.dialogue = newMissionData.dialogue;
  }
}
