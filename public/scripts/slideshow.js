// The Slideshow class will handle the rendering of slides and text for cut scenes.
class Slideshow {
    constructor (root) {
        this.root = root;               // The slideshow's root element (a div of the slideshow class)
        this.currentSlide = 0;          // Index position of the current slide (in the slides dictionary array)
        this.timeToNextSlide = 0;       // Countdown for how long to show the current slide
        this.lastSlide = true;          // Flag for when to end the show if the skip button isn't pressed
        this.isPlaying = false;         // Flag for when the show is on (to allow the interval to run)
    }

    renderSlide = () => {
        // Render an image and text, taken from a library file?
    }

    deRenderSlide = () => {
        // De-render the current slide, including image and text elements
    }

    advanceSlide = () => {
        // Increment the current slide number and then derender previous, then render new. Reset timer.
    }

    updateSlide = () => {
        // Updater function to run each cycle.
    }

    startPlayLoop = () => {
        setInterval(() => {
            if (this.isPlaying) {
                console.log('Play on!')
            }
        }, 1000)
    }

}