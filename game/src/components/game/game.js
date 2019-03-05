import $ from 'jquery';
import '../load/vendor/jquery.lineProgressbar.min.css';
import '../load/style.css';
import Hero from '../hero/Hero.js';
import Monster from '../monster/monster.js';
import AudioGame from '../audio/audio.js';
import { win, loose, createUser } from '../bd/bd.js';
import { modalWindowShow } from '../modal/modal.js';
import { INITIAL_VALUES, AUDIO_DATA } from '../load/constants.js';
import Magic from '../magic/Magic.js';

require('../load/vendor/jquery.lineProgressbar.js');

class Game {
  constructor() {
    this.hero = new Hero();
    this.monster = new Monster();
    this.audio = new AudioGame();
    this.level = null;
    this.animation = null;
  }

  init() {
    this.loadBG();
    this.enterNickname();
    new Magic();
  }

  loadBG() {
    const rand = Math.floor(Math.random() * INITIAL_VALUES.bgArray.length);
    $('body').css('backgroundImage', `url(${INITIAL_VALUES.bgArray[rand]})`);
    this.level = rand;
  }

  enterNickname() {
    const $NicknameForm = $('<input/>').attr({
      type: 'text',
      placeholder: 'Имя',
      class: 'NicknameForm',
    });
    const $Start = $('<input/>').attr({
      type: 'button',
      value: 'Вперед!',
      class: 'StartBtn',
    });
    const tempWrapper = $('body');
    $(tempWrapper).append('<section class="enterNickname">');
    $('.enterNickname').append('<p>Назови своё имя, герой</p>');
    $('.enterNickname').append('<article class="nickname_form">');
    $('.nickname_form').append($NicknameForm);
    $('.nickname_form').append($Start);
    $('.nickname_form').delegate('input:last-child', 'click', () => {
      if ($('input:first-child').val()) {
        this.hero.Nickname = $('input:first-child').val();
        createUser(this.hero.Nickname);
        $('.enterNickname').remove();
        this.ChooseCharacter();
      } else {
        $('input:first-child').addClass('errorNickname');
        $('input:first-child').css('background-color', '#FFDAB9');
        $('input:first-child').attr('placeholder', 'Представься...');
      }
    });
  }

  ChooseCharacter() {
    const $btnMale = $('<input/>').attr({
      type: 'button',
      name: 'male',
      value: 'Мальчик',
      class: 'maleBtn',
    });
    const $btnFemale = $('<input/>').attr({
      type: 'button',
      name: 'female',
      value: 'Девочка',
      class: 'femaleBtn',
    });
    const context = this;
    $('body').append('<section class="chooseCharacter">');
    $('.chooseCharacter').append('<p>Выбери пол</p>');
    $('.chooseCharacter').append('<article class="buttons_character">');
    $('.buttons_character').append($btnMale);
    $('.buttons_character').append($btnFemale);
    $('.buttons_character').on('click', 'input', { context: context }, this.start);
  }

  setGender(character) {
    this.hero.gender = character;
    console.log(this);
  }

  start(ctx) {
    let tempValue = 'unknown';
    if ($(this).val() === 'Мальчик') {
      tempValue = 'Male';
    } else {
      tempValue = 'Female';
    }
    console.log(ctx);
    const context = ctx.data.context;
    const tempWrapper = $('body');
    context.setGender(tempValue);
    $('.chooseCharacter').remove();
    $(tempWrapper).prepend('<div class="mainCharacter_container">');
    $(tempWrapper).prepend('<canvas id="enemy_canvas">');
    $(tempWrapper).prepend('<canvas id="hero_canvas">');
    $(tempWrapper).prepend('<article class="enemy_bar">');
    $(tempWrapper).prepend('<article class="hero_bar">');
    $(tempWrapper).prepend('<section class="duel_names">');
    $(tempWrapper).prepend('<article class="killsCount">');
    $('.killsCount').append('<p>Монстров убито:</p>');
    $('.killsCount').append(`<p>${context.hero.kills}</p>`);
    $('.duel_names').append('<p class="hero_name">');
    $('.duel_names').append('<p class="monster_name">');
    $('.hero_name').append(context.hero.Nickname);
    $('#callMagic').show();
    context.redrawHP('monster');
    context.redrawHP('hero');
    AUDIO_DATA.audioEffects.forEach((item) => { context.audio.loadAudio(item); });
    context.monster.generateName();
    context.hero.draw(tempValue);
    context.monster.draw();
    context.animate();
    context.audio.musicOn();
  }

  tick() {
    this.animation = requestAnimationFrame(this.tick.bind(this));
    this.hero.animate();
    this.monster.animate();
  }

  animate() {
    this.animation = requestAnimationFrame(this.tick.bind(this));
  }

  gameOver() {
    cancelAnimationFrame(this.animation);
    this.audio.musicOff();
    this.audio.audioEffect('gameOver');
    const $btnAgain = $('<input/>').attr({
      type: 'button',
      name: 'reset',
      value: 'Заново',
      class: 'resetButton',
    });
    const $btnExit = $('<input/>').attr({
      type: 'button',
      name: 'exit',
      value: 'Выйти',
      class: 'exitButton',
    });
    $('body').append('<section class="gameOver">');
    $('.gameOver').append(`${'<p>Игра окончена.</br>Ты победил <b>'}${this.hero.kills}</b> Монстров</p>`);
    $('.gameOver').append('<article class="buttons_gameOver">');
    $('.buttons_gameOver').append($btnAgain);
    $('.buttons_gameOver').append($btnExit);
    $('.resetButton').on('click', this.resetGame.bind(this));
    $('.exitButton').on('click', loose);
  }

  redrawHP(character) {
    this.tick_count = INITIAL_VALUES.tick_count;
    switch (character) {
      case 'monster':
        $('.enemy_bar').LineProgressbar({
          percentage: this.monster.HP,
          duration: INITIAL_VALUES.zero,
          fillBackgroundColor: 'brown',
          height: '30px',
          width: '100%',
          radius: '5px',
          backgroundColor: '#EEEEEE',
        });
        break;
      case 'hero':
        $('.hero_bar').LineProgressbar({
          percentage: this.hero.HP,
          duration: INITIAL_VALUES.zero,
          fillBackgroundColor: '#3498db',
          height: '30px',
          width: '100%',
          radius: '5px',
          backgroundColor: '#EEEEEE',
        });
        break;
      default:
    }
  }

  HeroAttack() {
    const attack = Math.floor(25 + Math.random() * 35);
    let distance = 65;
    if (this.hero.gender === 'Female') distance = 71;
    if (this.monster.HP - attack < INITIAL_VALUES.zero) {
      this.monster.HP = INITIAL_VALUES.zero;
    } else {
      this.monster.HP -= attack;
    }
    $('#hero_canvas').animate({
      left: `${distance}%`,
    }, INITIAL_VALUES.halfSecond, () => {
      this.hero.x = INITIAL_VALUES.x;
      this.hero.tick_count = INITIAL_VALUES.tick_count;
      this.hero.animationType = 'attacking';
      if (this.monster.HP <= INITIAL_VALUES.zero) {
        win();
        this.audio.audioEffect('heroHit');
        this.audio.audioEffect('monsterDeath');
        $('#enemy_canvas').css({
          transition: '0.5s ease-in-out',
          bottom: '-45px',
          left: '87%',
          transform: 'rotate(90deg)',
        });
        this.monster.animationType = 'die';
        this.hero.kills++;
        $('.killsCount > p:last').empty();
        $('.killsCount > p:last').append(this.hero.kills);
      } else {
        this.audio.audioEffect('heroHit');
        this.monster.animationType = 'hurt';
      }
    });
    this.redrawHP('monster');
    $('#hero_canvas').delay(INITIAL_VALUES.oneSecond).animate({
      left: `${2}%`,
    }, INITIAL_VALUES.halfSecond, modalWindowShow);
  }

  EnemyAttack() {
    const attack = Math.floor(15 + Math.random() * (35 + 1 - 15));

    function resolve() {
      this.monster.animationType = 'attacking';
      if (this.hero.HP - attack < INITIAL_VALUES.zero) {
        this.hero.HP = INITIAL_VALUES.zero;
      } else {
        this.hero.HP -= attack;
      }
      this.redrawHP('hero');
      if (this.hero.HP <= INITIAL_VALUES.zero) {
        this.hero.x = INITIAL_VALUES.x;
        this.audio.audioEffect(`${this.hero.gender}Death`);
        this.hero.animationType = 'die';
        this.hero.tick_count = INITIAL_VALUES.tick_count;
      } else {
        this.hero.x = INITIAL_VALUES.x;
        this.hero.animationType = 'hurt';
        this.hero.tick_count = INITIAL_VALUES.tick_count;
      }
      this.audio.audioEffect('monsterHit');
    }
    $('#enemy_canvas').animate({
      left: `${12}%`,
    }, INITIAL_VALUES.halfSecond, resolve.bind(this));

    $('#enemy_canvas').delay(INITIAL_VALUES.halfSecond).animate({
      left: `${80}%`,
    }, INITIAL_VALUES.oneFifthSecond, modalWindowShow);
  }

  resetGame() {
    this.tick_count = INITIAL_VALUES.tick_count;
    $('.gameOver').remove();
    this.audio.musicOn();
    this.hero.x = INITIAL_VALUES.x;
    this.hero.animationType = 'standing';
    this.hero.kills = INITIAL_VALUES.kills;
    this.hero.HP = INITIAL_VALUES.HP;
    this.monster.HP = INITIAL_VALUES.HP;
    this.redrawHP('hero');
    this.redrawHP('monster');
    $('.killsCount > p:last').empty();
    $('.killsCount > p:last').append(this.hero.kills);
    this.animate();
    modalWindowShow();
  }
}

export default Game;
