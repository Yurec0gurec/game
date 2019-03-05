import { reshuffle } from '../reshuffle/reshuffle.js';

const descDifficulty = 500;
function desc() {
  const seq = Array(5).fill(0).map(() => (Math.floor(Math.random() * descDifficulty)));
  seq.sort((a, b) => b - a);
  reshuffle(seq);
  return seq;
}

export default desc;
