// Well it's come to this: an objective object! Sounds like motherfucking Foucault or some shit, amiright?

class Objective{
    // Since the data for the objectives comes in the form of an array, unpacking it is not great vis-a-vis readability, but what can ya do?
    constructor(subject, objectiveData){
        this.subject = subject;
        this.statement = objectiveData[0];
        this.achievementStatement = objectiveData[1];
        this.testType = objectiveData[2];
        this.coords = objectiveData[3];
        this.xpValue = objectiveData[4];
        this.achieved = false;
    }

    // Objective) Test Method:

        // test uses this.test, and this.coords to test for all kinds of position-related achievements!
    test() {
        switch(this.testType){
            case "position":
                // if there's only one coordinate then it's the x value, so we just check that and award xp if it's reached:
                if (this.coords.length === 1) {
                    this.achieved = (this.subject.gridX === this.coords[0]);
                // if there are two coordinates we require a match for each:
                } else {
                    this.achieved = ((this.subject.gridX === this.coords[0]) && (this.subject.y === this.coords[1]));
                };
        }
    }
};