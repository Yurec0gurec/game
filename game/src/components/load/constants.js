const INITIAL_VALUES = {
  HP: 100,
  kills: 0,
  zero: 0,
  x: 0,
  tick_count: 0,
  healY: 0,
  breathInc: 0.1,
  breathDir: 1,
  breathAmt: 0,
  breathMax: 2,
  monsterFace: 0,
  oneSecond: 1000,
  halfSecond: 500,
  oneFifthSecond: 200,
  name_array_1: ['Мерзкий', 'Благоухающий', 'Смышленый', 'Злой', 'Сопливый'],
  name_array_2: ['Огр', 'Орк', 'Тролль', 'Гоблин', 'Урукхай'],
  name_array_3: ['Семен', 'Ибрагим', 'Зюзя', 'Насрулла', 'Феогнид'],
  bgArray: ['img/1_game_background.png', 'img/2_game_background.png', 'img/3_game_background.png', 'img/4_game_background.png'],
};

const CANVAS_SIZES = {
  maleCanvasHeight: 350,
  maleCanvasWidth: 295,
  femaleCanvasHeight: 350,
  femaleCanvasWidth: 220,
  maleMaxSteps: 6,
  femaleMaxSteps: 4,
  maleY: 155,
  femaleY: 100,
  maleStep: 300,
  femaleStep: 217.5,
  maleSpriteWidth: 1750,
  maleSpriteWidth2: 1700,
  maleSpriteWidth3: 1715,
  maleSpriteHeight: 350,
  femaleSpriteHeight: 220,
  femaleSpriteWidth: 1100,
  monsterCanvasHeight: 250,
  monsterCanvasWidth: 200,
  healCanvasWidth: 150,
  healCanvasHeight: 125,
  healStep: 135,
  healX: 30,
  healSpriteWidth: 768,
  healSpriteHeight: 630,
  maleDistance: 65,
  femaleDistance: 71,
};

const IMAGE_DATA = {
  monsterParts: ['Body', 'LeftArm', 'LeftHand', 'LeftLeg', 'RightArm', 'RightHand', 'RightLeg', 'Face', 'weapon', 'Head', 'Hurt', 'Blink', 'Attack'],
  heroAnimations: ['standing', 'attacking', 'hurt', 'heal', 'die'],
};
const AUDIO_DATA = {
  audioEffects: ['FemaleDeath', 'MaleDeath', 'gameOver', 'heal', 'heroHit', 'monsterDeath', 'monsterHit']
};
const FRAMES_SKIP = {
  monster: {
    hurt: 25,
    attack: 25,
    die: 70,
    standing: 1,
  },
  hero: {
    hurt: 8,
    standing: 15,
    attack: 5,
    die: 15,
    heal: 7,
  },
};

export {
  INITIAL_VALUES,
  CANVAS_SIZES,
  IMAGE_DATA,
  AUDIO_DATA,
  FRAMES_SKIP,
};
