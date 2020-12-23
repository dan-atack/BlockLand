// Get main HTML elements from the page:
const stage = document.getElementById('stage');
const palette = document.getElementById('palette');
const controlPanel = document.getElementById('control-panel');
const mapNameInput = document.getElementById('write-file');
// Buttons (grouped together as an object)
const editorButtons = {};
editorButtons.panRight = document.getElementById('pan-right');
editorButtons.panLeft = document.getElementById('pan-left');
editorButtons.panUp = document.getElementById('pan-up');
editorButtons.panDown = document.getElementById('pan-down');
editorButtons.palettePrev = document.getElementById('palette-prev');
editorButtons.paletteNext = document.getElementById('palette-next');
editorButtons.brushSmall = document.getElementById('brush-small');
editorButtons.brushMedium = document.getElementById('brush-medium');
editorButtons.brushLarge = document.getElementById('brush-large');
editorButtons.addBedrock = document.getElementById('add-bedrock');
// Labels (grouped together as object)
const editorLabels = {};
editorLabels.leftAxisLabel = document.getElementById('x-axis-left');
editorLabels.rightAxisLabel = document.getElementById('x-axis-right');
editorLabels.topAxisLabel = document.getElementById('y-axis-top');
editorLabels.bottomAxisLabel = document.getElementById('y-axis-bottom');
editorLabels.paletteCurrentBlock = document.getElementById('palette-current-block');
// Input fields (group'd t'gether as object)
const editorInputs = {};
editorInputs.topLayer = document.getElementById('bedrock-top-input');
editorInputs.bottomLayer = document.getElementById('bedrock-bottom-input');
editorInputs.bedrockHeight = document.getElementById('bedrock-height-input');

// Read experimental text file and print its contents:
const fileReader = (ev, filename='test.txt') => {
    ev.preventDefault();
    fetch(`/readfile/${filename}`)
    .then((reply) => {
        return reply.json();
    })
    .then((data) => {
        console.log(data);
    })
};

// Take input from the Editor and create a new JS const with that name!
const fileMaker = (ev) => {
    ev.preventDefault();
    if (mapNameInput.value.length > 3) {
        // get the output from the Editor:
        const editorOutput = ed.output;
        let jsString = `const ${mapNameInput.value} = [\n  [${editorOutput[0]}],\n`;
        for (let i = 0; i < editorOutput.length; i++) {
            jsString += `  [${editorOutput[i]}],\n`;
        }
        jsString += ']\n\n';
        fetch('/writefile', {
            method: 'POST',
            body: JSON.stringify({mapData: jsString}),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((res) => {
            return res.json();
        })
        .then((reply) => console.log(reply));
    } else {
        console.log('Please enter a filename of at least 4 characters length.')
    }
    console.log('Bloop.');
};

// RUN ZONE: Create and setup the editor:

const ed = new Editor(stage, palette, controlPanel, editorButtons, editorInputs, editorLabels);

ed.populateInitialStage();
ed.populatePalette();
ed.updateAxisLabels();