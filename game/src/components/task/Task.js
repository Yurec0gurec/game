import './style.css';
import $ from 'jquery';
import taskCaptions from './taskCaptions.js';
import { arithmetics } from './arithmetics/arithmetics.js';
import translate from './translate/translate.js';
import { reshuffle } from './reshuffle/reshuffle.js';
import asc from './ascdesc/asc.js';
import desc from './ascdesc/desc.js';
import flags from './flags/flags.js';
import capitals from './capitals/capitals.js';
import GlobalVariables from '../load/variables.js';
import months from './months/months.js';
import riddles from './riddles/riddles.js';
import { modalWindowHide } from '../modal/modal.js';
import game from '../../app.js';

class Task {
  constructor() {
    this.self = $('#magicTask');
    this.body = $('#taskBody');
    this.active = false;
    this.userAnswer = null;
    this.captions = taskCaptions;
    this.arithmetics = arithmetics;
    this.translate = translate;
    this.reshuffle = reshuffle;
    this.desc = desc;
    this.asc = asc;
    this.flags = flags;
    this.capitals = capitals;
    this.months = months;
    this.riddles = riddles;
  }

  setCaption(caption) {
    $('#taskCaption').text(this.captions[caption]);
  }

  check() {
    modalWindowHide();
    // $('#modal').removeClass('flex');
    // $('#magic').hide();
    // $('#modal .close').show();
    this.userAnswer = $('#taskBody>input').val() || GlobalVariables.gamer.answer;
    // $('#taskBody').html(null);
    if (this.userAnswer) this.userAnswer = this.userAnswer.toLowerCase();
    if (GlobalVariables.answer.includes(this.userAnswer)) {
      if ($('#magicTypeToggle').text() === 'Лечение') {
        game.hero.heal();
      } else {
        game.HeroAttack();
      }
    } else {
      game.EnemyAttack();
    }
  }
}

export default Task;
