// Well it's come to this: an objective object! Sounds like motherfucking Foucault or some shit, amiright?

class Objective {
  // Since the data for the objectives comes in the form of an array, unpacking it is not great vis-a-vis readability, but what can ya do?
  constructor(subject, objectiveData) {
    this.subject = subject;
    this.statement = objectiveData[0];
    this.achievementStatement = objectiveData[1];
    this.testType = objectiveData[2];
    // this.details was formerly this.coords until it was necessary to broaden the kind of info needed to perform a test:
    this.details = objectiveData[3];
    this.xpValue = objectiveData[4];
    this.achieved = false;
  }

  // Objective) Test Method:
  test() {
    switch (this.testType) {
      case 'position':
        // For positional tests, this.details is a list of one or two coordinates.
        // if there's only one coordinate then it's just the x value, so we check that column and award XP if it's reached:
        if (this.details.length === 1) {
          this.achieved = this.subject.gridX === this.details[0];
          // if there are two coordinates we require a match for each:
        } else {
          this.achieved =
            this.subject.gridX === this.details[0] &&
            this.subject.y === this.details[1];
        }
        break;
      case 'mission-kill-count':
        // For mission-specific, general kill-count-related objectives, this.details is the target number of kills:
        this.achieved = this.subject.baddiesKilledThisInning >= this.details[0];
        break;
      case 'kill-particular-individual':
        // For assassinating a particular individual, this.details is the baddie.serial of the target:
        this.achieved =
          this.subject.baddieDogTags.filter(
            (baddie) => baddie.id === `baddie_${this.details[0]}`
          ).length > 0;
        break;
    }
  }
}
