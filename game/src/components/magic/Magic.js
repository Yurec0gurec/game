import './style.css';
import $ from 'jquery';
import CallMagic from './CallMagic.js';
import GlobalVariables from '../load/variables.js';
import Task from '../task/Task.js';

class Magic {
  constructor() {
    this.self = document.getElementById('magic');
    this.type = 'Урон';
    this.kindsContainer = $('#magicSet');
    this.typeToggleButton = $('#magicTypeToggle');
    this.submitButton = $('#magicTask button');
    this.callMagic = new CallMagic();
    this.task = new Task();

    this.typeToggleButton.click(() => {
      if (this.type === 'Лечение') {
        this.setType('Урон');
        this.typeToggleButton.removeClass('green-bg');
      } else {
        this.setType('Лечение');
        this.typeToggleButton.addClass('green-bg');
      }
      this.typeToggleButton.text(this.type);
    });

    this.kindsContainer.click((event) => {
      if (event.target.nodeName === 'LI') {
        $('#modal .close').hide();
        const taskType = event.target.getAttribute('data-type');
        GlobalVariables.gamer.answer = null;
        $(this.typeToggleButton).add(this.kindsContainer).hide();
        this.task[taskType]();
        this.task.setCaption(taskType);
        this.task.active = true;
      }
    });

    this.submitButton.click((event) => {
      event.stopPropagation();
      event.preventDefault();
      this.task.active = false;
      this.task.self.fadeOut();
      this.task.check();
    });
  }

  setType(type) {
    this.type = type;
  }
}

export default Magic;
