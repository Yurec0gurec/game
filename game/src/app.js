import './reset.css';
import Game from './components/game/game.js';

require('./favicon.ico');
const game = new Game();
game.init();

export default game;
