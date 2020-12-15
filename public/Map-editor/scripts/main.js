const filenameInput = document.getElementById('write-file');

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

// Take input from HTML Filename element and create a new text file with that name!
const fileMaker = (ev) => {
    ev.preventDefault();
    if (filenameInput.value.length > 3) {
        const listicle = [40, 3, 3, 1, 2];
        let jsString = `const map_0 = [\n  [${listicle}],\n`;
        for (let i = 0; i < 20; i++) {
            jsString += `  [${listicle}],\n`;
        }
        jsString += ']';
        fetch('/writefile', {
            method: 'POST',
            body: JSON.stringify({filename: filenameInput.value, mapData: jsString}),
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