import './style.css';
import $ from 'jquery';
import vocabulary from '../translate/vocabulary.js';
import MousedownCase from './MousedownCase.js';
import GlobalVariables from '../../load/variables.js';
import Letters from './Letters.js';

const reshuffleTemplate = document.createDocumentFragment();
const ul = document.createElement('ul');
ul.classList.add('shuffle');

function mix(arr) {
  const arrToMix = [...arr];
  const etalon = arr.join();
  while (arrToMix.join() === etalon) {
    arrToMix.sort(() => 0.5 - Math.random());
  }
  return arrToMix;
}

const mousedownCase = new MousedownCase();

const letters = new Letters(ul, mousedownCase);
/*
const mousedownCase = {
  isMousedown: false,
  mouseX: 0,
  mouseY: 0,
  elemX: 0,
  elemY: 0,
  setIsMousedown(reset) {
    this.isMousedown = reset;
  },
  keepCoords(event) {
    this.elemX = event.target.offsetLeft;
    this.elemY = event.target.offsetTop;
    this.mouseX = event.pageX;
    this.mouseY = event.pageY;
  },
};
*/

/*
const letters = {
  self: ul.children,
  current: ul.children[0],
  currentIndex: null,
  order: [],
  buffer: [],
  potentialPlace: 0,
  offsets: [],
  offsetStep: null,
  offsetMiddles: [],
  answer: [],
  setCurrent(elem) {
    this.current = elem;
  },
  reset() {
    this.order = [];
    [this.current] = ul.children;
    this.currentIndex = null;
    this.potentialPlace = 0;
    this.offsets = [];
    this.offsetStep = null;
    this.offsetMiddles = [];
    this.answer = [];
  },
  setAnswer() {
    this.answer = this.order.map(elem => this.self[elem].innerText);
    GlobalVariables.gamer.answer = this.answer.join('');
  },
  setOffsets() {
    this.offsets = [].map.call(this.self, ((elem, i) => {
      const offset = elem.offsetLeft;
      const step = elem.offsetWidth / 2;
      this.offsetMiddles.push(offset + step);
      elem.style.left = offset + 'px';// eslint-disable-line
      this.order.push(i);
      return offset;
    }));
    this.offsetStep = this.offsets[1] - this.offsets[0];
  },
  fly(coordX, coordY) {
    this.current.style.left = `${mousedownCase.elemX + coordX - mousedownCase.mouseX}px`;
    this.current.style.top = `${mousedownCase.elemY + coordY - mousedownCase.mouseY}px`;
  },
  fix() {
    this.current.style.left = `${this.offsets[this.potentialPlace]}px`;
    this.current.style.top = `${mousedownCase.elemY}px`;
  },
  setAbsPos() {
    [].forEach.call(this.self, ((elem) => {
      elem.style.position = 'absolute';// eslint-disable-line
    }));
  },
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
  },
  setCurrentIndex(event) {
    this.currentIndex = Math.floor(event.target.offsetLeft / this.offsetStep);
  },
  setOrder(currentIndexValue) {
    this.order.splice(letters.currentIndex, 1);
    this.order.splice(letters.potentialPlace, 0, currentIndexValue);
  },
};
*/

function startMove(event) {
  if (event.target.tagName === 'LI') {
    event.preventDefault();
    letters.setCurrentIndex(event);
    letters.setCurrent(event.target);
    letters.setPotentialPlace(letters.current.offsetLeft);
    mousedownCase.setIsMousedown(true);
    mousedownCase.keepCoords(event);
    event.target.classList.add('over');
  }
}

function move(event) {
  if (mousedownCase.isMousedown) {
    letters.fly(event.pageX, event.pageY);
    letters.setPotentialPlace(letters.current.offsetLeft);

    const size = ul.children.length;
    const lastInOrder = letters.order[letters.order.length - 1];
    for (let i = 0, k = 0; i < size; i++, k++) {
      const isCurrent = ul.children[letters.order[i]] === letters.current;
      const isNotLast = ul.children[letters.order[i]] !== ul.children[lastInOrder];
      if (isCurrent && isNotLast) i++;
      if (k === letters.potentialPlace) k++;
      ul.children[letters.order[i]].style.left = `${letters.offsets[k]}px`;
    }
  }
}

function endMove(event) {
  mousedownCase.setIsMousedown(false);
  if (letters.current) letters.fix();
  if (event.target.tagName === 'LI' && event.target.hasAttribute('data-order')) {
    letters.setOrder(letters.order[letters.currentIndex]);
    letters.setAnswer();
  }
  event.target.classList.remove('over');
}

function reshuffle(arr) {
  ul.style.marginLeft = 0;
  ul.innerHTML = null;
  letters.reset();
  let randomSeq = arr;
  if (!randomSeq) {
    const words = Object.keys(vocabulary);
    randomSeq = Array.from(words[Math.round(Math.random() * (words.length - 1))]);
  }
  GlobalVariables.answer = randomSeq.join('');

  mix(randomSeq).forEach((letter, i) => {
    const li = document.createElement('li');
    li.innerHTML = letter;
    li.setAttribute('data-order', i);
    ul.append(li);
  });

  reshuffleTemplate.append(ul);
  $('#magicTask div').html(reshuffleTemplate);
  $('#magicTask').show();
  letters.setOffsets();
  const ulWidth = letters.offsetStep * letters.offsets.length;
  ul.style.marginLeft = `${($('#magic').width() - ulWidth) / 2}px`;
  letters.setAbsPos();
}

window.onload = () => {
  window.modal.addEventListener('mousemove', move);
  window.modal.addEventListener('mouseup', endMove);
  ul.addEventListener('mousedown', startMove);
};

export { reshuffle, mix, letters };
