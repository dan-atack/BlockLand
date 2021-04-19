class Boss extends Baddie {
  constructor(root, xStart, yStart, baddieType = 1003, baddieSerial, xRange, hitpoints=10) {
    super(root, xStart, yStart, (baddieType = 1003), baddieSerial, xRange, hitpoints);
    this.domElement.classList.add('boss');
    this.patrolInterval = 9;
    // Bosses have bigger everything:
    this.attackAnimationWidth = 1.5;
    this.spriteWidth = 1.5;
    // Override normal styling to make bosses bigger:
    this.domElement.style.width = `${BOSS_WIDTH}px`;
    this.domElement.style.height = `${BOSS_WIDTH}px`;
  }

    handleDeath() {
    // Engine can check a baddie for deathLoops and remove them when the counter reaches zero:
    if (this.deathLoops > 0) {
      // Death of a baddie: baddie sprite is replaced by a gif of them dying which plays for a certain amount of game loops:
      if (this.deathLoops === 20) {
        // collision status is the key to HP: hit by Attack object: {name: 'claws', id: 101, dmg: 5, type: 'slashing'}
        this.domElement.src = `./assets/effects/animations/baddie-${this.type}-death.gif`;
        // ensure proper sprite orientation:
        this.facing === 'right'
          ? (this.domElement.style.transform = 'rotateY(0deg)')
          : 'rotate&(180deg)';
      }
      this.isDying = true;
      // Override normal styling to make bosses bigger:
      this.domElement.style.width = `${BOSS_WIDTH}px`;
      this.domElement.style.height = `${BOSS_WIDTH}px`;
      this.domElement.style.zIndex = 100;
      // Countdown to sprite removal:
      this.deathLoops -= 1;
    } else {
      this.isDying = false;
      this.isDead = true;
      this.deRender();
    }
  }

}
