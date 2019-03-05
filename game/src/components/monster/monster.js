import $ from 'jquery';
import {
  INITIAL_VALUES,
  CANVAS_SIZES,
  IMAGE_DATA,
  FRAMES_SKIP,
} from '../load/constants.js';
import game from '../../app.js';

class Monster {
  constructor() {
    this.name = '';
    this.HP = INITIAL_VALUES.HP;
    this.x = INITIAL_VALUES.x;
    this.monsterFace = INITIAL_VALUES.monsterFace;
    this.tick_count = INITIAL_VALUES.tick_count;
    this.BodyParts = {
      Face: INITIAL_VALUES.monsterFace,
    };
    this.animationType = 'standing';
    this.breathInc = INITIAL_VALUES.breathInc;
    this.breathDir = INITIAL_VALUES.breathDir;
    this.breathAmt = INITIAL_VALUES.breathAmt;
    this.breathMax = INITIAL_VALUES.breathMax;
  }

  generateName() {
    let rand = Math.floor(Math.random() * INITIAL_VALUES.name_array_1.length);
    let tempNick = '';
    tempNick = `${INITIAL_VALUES.name_array_1[rand]} `;
    rand = Math.floor(Math.random() * INITIAL_VALUES.name_array_2.length);
    tempNick += `${INITIAL_VALUES.name_array_2[rand]} `;
    rand = Math.floor(Math.random() * INITIAL_VALUES.name_array_3.length);
    tempNick += INITIAL_VALUES.name_array_3[rand];
    this.name = tempNick;
    $('.monster_name').empty();
    $('.monster_name').append(this.name);
  }

  preloadImage(name) {
    const rand = Math.floor(1 + Math.random() * 3);
    this.BodyParts[name] = new Image();
    if (name === 'Face') {
      this.monsterFace = rand;
      this.BodyParts[name].src = `img/bodyParts_demo/${name}${rand}.png`;
    } else if (name === 'Blink' || name === 'Hurt') {
      this.BodyParts[name].src = `img/bodyParts_demo/${name}${this.monsterFace}.png`;
    } else {
      this.BodyParts[name].src = `img/bodyParts_demo/${name}${rand}.png`;
    }
  }

  draw() {
    this.context = $('#enemy_canvas')[0].getContext('2d');
    this.context.canvas.height = CANVAS_SIZES.monsterCanvasHeight;
    this.context.canvas.width = CANVAS_SIZES.monsterCanvasWidth;
    this.redraw = (change) => {
      this.context.canvas.width = this.context.canvas.width;
      this.context.drawImage(this.BodyParts.weapon, 6, 169 - this.breathAmt, 110, 55);
      this.context.drawImage(this.BodyParts.LeftLeg, 85, 200, 50, 50);
      this.context.drawImage(this.BodyParts.RightLeg, 120, 200, 50, 50);
      this.context.drawImage(this.BodyParts.LeftHand, 65, 167 - this.breathAmt, 50, 50);
      this.context.drawImage(this.BodyParts.LeftArm, 65, 143 - this.breathAmt, 50, 50);
      this.context.drawImage(this.BodyParts.Body, 65, 120, 130, 130);
      this.context.drawImage(this.BodyParts.RightHand, 130, 166 - this.breathAmt, 50, 50);
      this.context.drawImage(this.BodyParts.RightArm, 130, 142 - this.breathAmt, 50, 50);
      this.context.drawImage(this.BodyParts.Head, 60, 45 - this.breathAmt, 140, 140);
      switch (change) {
        case 'attack':
          this.context.drawImage(this.BodyParts.Attack, 5, 65 - this.breathAmt, 110, 110);
          this.context.drawImage(this.BodyParts.Face, 65, 65 - this.breathAmt, 110, 110);
          break;
        case 'hurt':
          this.context.drawImage(this.BodyParts.Hurt, 65, 65 - this.breathAmt, 110, 110);
          break;
        case 'die':
          this.context.drawImage(this.BodyParts.Hurt, 65, 65 - this.breathAmt, 110, 110);
          break;
        default:
          this.context.drawImage(this.BodyParts.Face, 65, 65 - this.breathAmt, 110, 110);
          break;
      }
    };
    IMAGE_DATA.monsterParts.forEach((item) => { this.preloadImage(item); });
  }

  hurtAnimation() {
    if (this.tick_count > FRAMES_SKIP.monster.hurt) {
      this.animationType = 'standing';
    }
    this.redraw('hurt');
    this.tick_count++;
  }

  standingAnimation() {
    if (this.tick_count > FRAMES_SKIP.monster.standing) {
      this.redraw();
      if (this.breathDir === INITIAL_VALUES.breathDir) {
        this.breathAmt -= this.breathInc;
        if (this.breathAmt < -this.breathMax) {
          this.breathDir = -INITIAL_VALUES.breathDir;
        }
      } else {
        this.breathAmt += this.breathInc;
        if (this.breathAmt > this.breathMax) {
          this.breathDir = INITIAL_VALUES.breathDir;
        }
      }
      this.tick_count = INITIAL_VALUES.tick_count;
    }
    this.tick_count++;
  }

  attackingAnimation() {
    if (this.tick_count > FRAMES_SKIP.monster.attack) {
      this.animationType = 'standing';
    }
    this.redraw('attack');
    this.tick_count++;
  }

  dieAnimation() {
    if (this.tick_count > FRAMES_SKIP.monster.die) {
      this.HP = INITIAL_VALUES.HP;
      game.redrawHP('monster');
      this.generateName();
      this.draw();
      $('#enemy_canvas').removeAttr('style');
      this.animationType = 'standing';
    }
    this.redraw('die');
    this.tick_count++;
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
      default:
    }
  }
}

export default Monster;
