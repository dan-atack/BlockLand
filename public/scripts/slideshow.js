// The Slideshow class will handle the rendering of slides and text for cut scenes.
class Slideshow {
    constructor (root) {
        this.root = root;               // The slideshow's root element (a div of the slideshow class)
        this.currentSlide = 0;          // Index position of the current slide (in the slides dictionary array)
        this.currentSlideTimeLeft = 0;  // Countdown for how long to show the current slide
        this.lastSlide = false;          // Flag for when to end the show if the skip button isn't pressed
        this.isPlaying = false;         // Flag for when the show is on (to allow the interval to run)
        this.image = null;
        this.caption = null;
    }

    renderSlide = () => {
        // Load image data and present it on the screen:
        this.image = document.createElement('img');
        this.image.src = `assets/intro/slide${this.currentSlide}.png`;
        this.image.id = `slide-${this.currentSlide}`;
        this.image.classList.add('slide');
        this.root.appendChild(this.image);
        // Create text object with caption data (scale text to always fit based on number of characters):
        const words = slideData[this.currentSlide].caption;
        const fittedSize = Math.min(72, (240 * (1 / Math.sqrt(words.length)))); // Max allowed font size is 72px
        this.caption = new Text(this.root, 0, 0, fittedSize, words, 'obituary');
    }

    deRenderSlide = () => {
        this.root.removeChild(this.image);
        if (this.caption) this.caption.deRender();
        this.image = null;
        this.caption = null;
    }

    advanceSlide = () => {
        // Derender previous slide, increment the current slide number, reset time remaining, then render new one:
        console.log('advancing to next slide: ', this.currentSlide + 1);
        this.deRenderSlide();
        this.currentSlide += 1;
        const newSlide = slideData[this.currentSlide];
        this.currentSlideTimeLeft = newSlide.duration;
        this.lastSlide = newSlide.lastInScene;
        this.renderSlide();
        this.updateSlide();
    }

    updateSlide = () => {    // Instead of an interval, use a timeout which recusively calls itself until a flag is set to false:
        if (this.currentSlideTimeLeft > 0) {
            setTimeout(() => {
                this.currentSlideTimeLeft -= 1;
                console.log('tick ', this.currentSlideTimeLeft)
                this.updateSlide();
            }, 1000)
        } else {        // When the time runs out, check if it's the last slide, and advance to the next slide if it ISN'T:
            if (!this.lastSlide) {
                this.advanceSlide();
            } else {    // If it is the last slide, then set the isPlaying flag to false (this will cue the start of the game??):
                this.isPlaying = false;
                console.log('show is over, folks.');
            }
        }
    }

    startSlideshow = () => {
        // Special modification of the advanceSlide's functionality, called once to kickstart the show:
        this.isPlaying = true;
        this.currentSlideTimeLeft = slideData[this.currentSlide].duration;
        this.renderSlide();
        this.updateSlide();
    }

    stopSlideshow = () => {
        this.currentSlideTimeLeft = 0;
        this.isPlaying = false;
        this.lastSlide = true;
    }

}