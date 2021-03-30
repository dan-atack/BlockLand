const playSound = (id) => {
    try {
        const sound = document.getElementById(id);
        sound.play();
    } catch {
        console.log('Sound file not found for', id);
    }
}

// This function takes an ARRAY as its sole argument. Editor's Note: WHERE IS THE TypeScript SUPPORT?!
// Data: [root, x, y, x-offset, y-offset, {id: number, text: string, type: string, duration: number of milliseconds}]
const makePopup = (data) => {
    const effect = new Popup(...data);
    effect.render();
}

const makeArrow = (data) => {
    const arrow = new Arrow(...data);
    arrow.render();
}