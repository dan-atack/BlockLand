class Text {
  // text constructor needs quite a few arguments depending on which type of text you're rendering, the last of which
  // will be its CSS class so we can do special effects with it:
  constructor(root, x, y, size, text, messageClass = 'text') {
    this.root = root;
    this.x = x;
    this.y = y;
    this.size = size;
    this.text = text;
    this.messageClass = messageClass;
    this.domElement = document.createElement('p');
    this.domElement.style.left = `${x * BLOCK_WIDTH}px`;
    this.domElement.style.bottom = `${y * BLOCK_WIDTH}px`;
    this.domElement.style.fontSize = `${size}px`;
    this.domElement.innerText = text;
    this.domElement.id = `text-${this.text.split(' ')[0]}`;
    this.domElement.style.zIndex = 1000;
    this.domElement.classList.add(this.messageClass);
    this.root.appendChild(this.domElement);
  }

  removeDOM() {
    this.root.removeChild(this.domElement);
  }

  deRender() {
    this.root.removeChild(this.domElement);
  }
}
