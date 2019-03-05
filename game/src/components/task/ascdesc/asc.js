import { reshuffle } from '../reshuffle/reshuffle.js';

const ascDifficulty = 500;
function asc() {
  const seq = Array(5).fill(0).map(() => (Math.floor(Math.random() * ascDifficulty)));
  seq.sort((a, b) => a - b);
  reshuffle(seq);
  return seq;
}

export default asc;
