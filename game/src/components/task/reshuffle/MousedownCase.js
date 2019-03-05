class MousedownCase {
  constructor() {
    this.isMousedown = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.elemX = 0;
    this.elemY = 0;
  }

  setIsMousedown(reset) {
    this.isMousedown = reset;
  }

  keepCoords(event) {
    this.elemX = event.target.offsetLeft;
    this.elemY = event.target.offsetTop;
    this.mouseX = event.pageX;
    this.mouseY = event.pageY;
  }
}

export default MousedownCase;
