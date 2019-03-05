import game from '../../app.js';

class AudioGame {
  constructor() {
    this.bgMusic = null;
    this.audioEffects = {};
  }
  musicOn() {
    this.bgMusic = new Audio();
    switch (game.level) {
      case 0:
        this.bgMusic.src = 'sound/music/Epidemic%20Sound%20-%20Happy%20And%20Joyful%2014.mp3';
        break;
      case 1:
        this.bgMusic.src = 'sound/music/Epidemic%20Sound%20-%20Sneaking%20Up%201.mp3';
        break;
      case 2:
        this.bgMusic.src = 'sound/music/Epidemic%20Sound%20-%20Thieves%20Adventures%205.mp3';
        break;
      case 3:
        this.bgMusic.src = 'sound/music/Epidemic%20Sound%20-%20Mystery%20Minute%209.mp3';
        break;
      default:
    }
    this.bgMusic.loop = true;
    this.bgMusic.volume = 0.3;
    this.bgMusic.autoplay = true;
  }

  musicOff() {
    this.bgMusic.pause();
    this.bgMusic.currentTime = 0;
  }

  loadAudio(name) {
    this.audioEffects[name] = new Audio();
  }

  audioEffect(event) {
    this.audioEffects[event].src = `sound/${event}.mp3`;
    this.audioEffects[event].volume = 0.4;
    this.audioEffects[event].autoplay = true;
  }
}

export default AudioGame;
