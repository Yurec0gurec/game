import asc from './asc.js';
import { letters } from '../reshuffle/reshuffle.js';

describe('ascdesc', () => {
  describe('asc', () => {
    it('should return array', () => {
      expect(Array.isArray(asc())).toBe(true);
    });
    it('should insert values to each item of letters ul', () => {
      asc().forEach((item, i, arr) => {
        expect(arr).toContain(Number(letters.children.item(i).innerHTML));
      });
    });
  });
});
