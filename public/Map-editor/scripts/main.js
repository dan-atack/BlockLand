// Get main HTML elements from the page:
const stage = document.getElementById('stage');
const palette = document.getElementById('palette');
const controlPanel = document.getElementById('control-panel');
const mapNameInput = document.getElementById('write-file');

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

// RUN ZONE:

const ed = new Editor(stage, palette, controlPanel);

ed.populateInitialStage();
ed.populatePalette();