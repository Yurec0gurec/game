import desc from './desc.js';
import { letters } from '../reshuffle/reshuffle.js';

describe('ascdesc', () => {
  describe('desc', () => {
    it('should return array', () => {
      expect(Array.isArray(desc())).toBe(true);
    });
    it('should insert values to each item of letters ul', () => {
      desc().forEach((item, i, arr) => {
        expect(arr).toContain(Number(letters.children.item(i).innerHTML));
      });
    });
  });
});
