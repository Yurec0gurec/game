import GlobalVariables from '../../load/variables.js';

class Letters {
  constructor(ul, mousedownCase) {
    this.self = ul;
    this.children = ul.children;
    [this.current] = ul.children;
    this.currentIndex = null;
    this.order = [];
    this.buffer = [];
    this.potentialPlace = 0;
    this.offsets = [];
    this.offsetStep = null;
    this.offsetMiddles = [];
    this.answer = [];
    this.mousedown = mousedownCase;
  }

  setCurrent(elem) {
    this.current = elem;
  }

  reset() {
    this.order = [];
    [this.current] = this.children;
    this.currentIndex = null;
    this.potentialPlace = 0;
    this.offsets = [];
    this.offsetStep = null;
    this.offsetMiddles = [];
    this.answer = [];
  }

  setAnswer() {
    this.answer = this.order.map(elem => this.children[elem].innerText);
    GlobalVariables.gamer.answer = this.answer.join('');
  }

  setOffsets() {
    this.offsets = [].map.call(this.children, ((elem, i) => {
      const offset = elem.offsetLeft;
      const step = elem.offsetWidth / 2;
      this.offsetMiddles.push(offset + step);
      elem.style.left = offset + 'px';// eslint-disable-line
      this.order.push(i);
      return offset;
    }));
    this.offsetStep = this.offsets[1] - this.offsets[0];
  }

  fly(coordX, coordY) {
    this.current.style.left = `${this.mousedown.elemX + coordX - this.mousedown.mouseX}px`;
    this.current.style.top = `${this.mousedown.elemY + coordY - this.mousedown.mouseY}px`;
  }

  fix() {
    this.current.style.left = `${this.offsets[this.potentialPlace]}px`;
    this.current.style.top = `${this.mousedown.elemY}px`;
  }

  setAbsPos() {
    [].forEach.call(this.children, ((elem) => {
      elem.style.position = 'absolute';// eslint-disable-line
    }));
  }

  setPotentialPlace(x) {
    const count = this.offsets.length;
    const first = this.offsetMiddles[0];
    const last = this.offsetMiddles[count - 1];
    if (x < first) this.potentialPlace = 0;
    if (x > last) this.potentialPlace = count - 1;
    if (x > first && x < last) {
      for (let i = 0; i < count; i++) {
        if (x > this.offsetMiddles[i]) {
          this.potentialPlace = i + 1;
        }
      }
    }
  }

  setCurrentIndex(event) {
    this.currentIndex = Math.floor(event.target.offsetLeft / this.offsetStep);
  }

  setOrder(currentIndexValue) {
    this.order.splice(this.currentIndex, 1);
    this.order.splice(this.potentialPlace, 0, currentIndexValue);
  }
}

export default Letters;
