import $ from 'jquery';
import { modalWindowShow } from '../modal/modal.js';
import { INITIAL_VALUES, CANVAS_SIZES, IMAGE_DATA, FRAMES_SKIP } from '../load/constants.js';
import game from '../../app.js';

class Hero {
  constructor() {
    this.HP = INITIAL_VALUES.HP;
    this.kills = INITIAL_VALUES.kills;
    this.x = INITIAL_VALUES.x;
    this.healY = INITIAL_VALUES.healY;
    this.tick_count = INITIAL_VALUES.tick_count;
    this.animationTypes = {};
    this.animationType = 'standing';
    this.gender = 'unknown';
  }

  loadImage(name) {
    this.animationTypes[name] = new Image();
    this.animationTypes[name].src = `img/animateHero/${name}.png`;
  }

  draw(gender) {
    this.context = $('#hero_canvas')[0].getContext('2d');
    if (gender === 'Female') {
      this.context.canvas.height = CANVAS_SIZES.femaleCanvasHeight;
      this.context.canvas.width = CANVAS_SIZES.femaleCanvasWidth;
      this.spriteWidth = CANVAS_SIZES.femaleSpriteWidth;
      this.spriteWidth2 = CANVAS_SIZES.femaleSpriteWidth;
      this.spriteWidth3 = CANVAS_SIZES.femaleSpriteWidth;
      this.spriteHeight = CANVAS_SIZES.femaleSpriteHeight;
      this.step = CANVAS_SIZES.femaleStep;
      this.y = CANVAS_SIZES.femaleY;
      this.maxSteps = CANVAS_SIZES.femaleMaxSteps;
      $('#hero_canvas').css('bottom', '-45px');
    } else {
      this.context.canvas.height = CANVAS_SIZES.maleCanvasHeight;
      this.context.canvas.width = CANVAS_SIZES.maleCanvasWidth;
      this.spriteWidth = CANVAS_SIZES.maleSpriteWidth;
      this.spriteWidth2 = CANVAS_SIZES.maleSpriteWidth2;
      this.spriteWidth3 = CANVAS_SIZES.maleSpriteWidth3;
      this.spriteHeight = CANVAS_SIZES.maleSpriteHeight;
      this.y = CANVAS_SIZES.maleY;
      this.step = CANVAS_SIZES.maleStep;
      this.maxSteps = CANVAS_SIZES.maleMaxSteps;
    }
    IMAGE_DATA.heroAnimations.forEach((item) => { this.loadImage(`${item}${gender}`); });
  }

  animate() {
    switch (this.animationType) {
      case 'standing':
        this.standingAnimation();
        break;
      case 'attacking':
        this.attackingAnimation();
        break;
      case 'hurt':
        this.hurtAnimation();
        break;
      case 'die':
        this.dieAnimation();
        break;
      case 'heal':
        this.healAnimation();
        break;
      default:
    }
  }

  hurtAnimation() {
    if (this.tick_count > FRAMES_SKIP.hero.hurt) {
      this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
      if (this.x === -this.step * 4 && this.gender === 'Male') {
        this.x -= this.step * 2;
      }
      if (this.x === -this.step * this.maxSteps) {
        this.animationType = 'standing';
        this.x = INITIAL_VALUES.x;
      } else {
        this.x -= this.step;
      }
      if (this.gender === 'Male') {
        this.context.drawImage(this.animationTypes.hurtMale, this.x, this.y, this.spriteWidth2, this.spriteHeight);
      } else {
        this.context.drawImage(this.animationTypes.hurtFemale, this.x, this.y, this.spriteWidth2, this.spriteHeight);
      }

      this.tick_count = INITIAL_VALUES.tick_count;
    }
    this.tick_count++;
  }

  standingAnimation() {
    if (this.tick_count > FRAMES_SKIP.hero.standing) {
      this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
      if (this.x === -this.step * 4 && this.gender === 'Male') {
        this.x -= this.step * 2;
      }
      this.x = (this.x === -this.step * this.maxSteps ? INITIAL_VALUES.x : this.x - this.step);
      if (this.gender === 'Male') {
        this.context.drawImage(this.animationTypes.standingMale, this.x, this.y, this.spriteWidth, this.spriteHeight);
      } else {
        this.context.drawImage(this.animationTypes.standingFemale, this.x, this.y, this.spriteWidth, this.spriteHeight);
      }
      this.tick_count = INITIAL_VALUES.tick_count;
    }
    this.tick_count++;
  }

  attackingAnimation() {
    if (this.tick_count > FRAMES_SKIP.hero.attack) {
      this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
      if (this.x === -this.step * 4 && this.gender === 'Male') {
        this.x -= this.step * 2;
      }
      if (this.x === -this.step * this.maxSteps) {
        this.animationType = 'standing';
        this.x = INITIAL_VALUES.x;
      } else {
        this.x -= this.step;
      }
      if (this.gender === 'Male') {
        this.context.drawImage(this.animationTypes.attackingMale, this.x, this.y, this.spriteWidth, this.spriteHeight);
      } else {
        this.context.drawImage(this.animationTypes.attackingFemale, this.x, this.y, this.spriteWidth, this.spriteHeight);
      }
      this.tick_count = INITIAL_VALUES.tick_count;
    }
    this.tick_count++;
  }

  dieAnimation() {
    if (this.tick_count > FRAMES_SKIP.hero.die) {
      this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
      if (this.x === -this.step * 4 && this.gender === 'Male') {
        this.x -= this.step * 2;
      }
      if (this.x === -this.step * this.maxSteps) {
        this.x = -this.step * 3;
        if (this.gender === 'Male') {
          this.context.drawImage(this.animationTypes.dieMale, this.x, this.y, this.spriteWidth3, this.spriteHeight);
        } else {
          this.context.drawImage(this.animationTypes.dieFemale, this.x, this.y, this.spriteWidth3, this.spriteHeight);
        }
        game.gameOver();
      } else {
        this.x -= this.step;
      }
      if (this.gender === 'Male') {
        this.context.drawImage(this.animationTypes.dieMale, this.x, this.y, this.spriteWidth3, this.spriteHeight);
      } else {
        this.context.drawImage(this.animationTypes.dieFemale, this.x, this.y, this.spriteWidth3, this.spriteHeight);
      }

      this.tick_count = INITIAL_VALUES.tick_count;
    }
    this.tick_count++;
  }

  heal() {
    $('body').prepend('<canvas id="heal_canvas">');
    game.healCanvas = $('#heal_canvas')[0].getContext('2d');
    game.healCanvas.canvas.height = CANVAS_SIZES.healCanvasHeight;
    game.healCanvas.canvas.width = CANVAS_SIZES.healCanvasWidth;
    this.animationType = 'heal';
    if (this.HP + INITIAL_VALUES.HP / 2 > INITIAL_VALUES.HP) {
      this.HP = INITIAL_VALUES.HP;
    } else {
      this.HP += INITIAL_VALUES.HP / 2;
    }
    game.audio.audioEffect('heal');
    game.redrawHP('hero');
    modalWindowShow();
  }

  healAnimation() {
    if (this.tick_count > FRAMES_SKIP.hero.heal) {
      game.healCanvas.clearRect(0, 0, game.healCanvas.width, game.healCanvas.height);
      if (this.healY === -CANVAS_SIZES.healStep * 4) {
        $('#heal_canvas').remove();
        this.animationType = 'standing';
        this.healY = INITIAL_VALUES.healY;
      } else {
        this.healY -= CANVAS_SIZES.healStep;
      }
      if (this.gender === 'Male') {
        game.healCanvas.drawImage(this.animationTypes.healMale, CANVAS_SIZES.healX, this.healY, CANVAS_SIZES.healSpriteWidth, CANVAS_SIZES.healSpriteHeight);
      } else {
        game.healCanvas.drawImage(this.animationTypes.healFemale, CANVAS_SIZES.healX, this.healY, CANVAS_SIZES.healSpriteWidth, CANVAS_SIZES.healSpriteHeight);
      }
      this.tick_count = INITIAL_VALUES.tick_count;
    }
    this.tick_count++;
  }
}

export default Hero;
