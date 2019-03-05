import { mix } from './reshuffle.js';

describe('reshuffle', () => {
  describe('#mix()', () => {
    it('should return array', () => {
      expect(Array.isArray(mix([1, 2, 3]))).toBe(true);
    });
    it('should return new array which is not equal initial array', () => {
      expect(mix([1, 2, 3]).join()).not.toBe('1,2,3');
    });
  });
});
