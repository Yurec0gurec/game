import { getRandomNumber } from './arithmetics.js';

describe('arithmetics', () => {
  describe('#getRandomNumber', () => {
    it('should return number from 0 to parameter', () => {
      const parameter = 100;
      const value = getRandomNumber(parameter);
      expect(value).not.toBeGreaterThan(parameter);
      expect(value).not.toBeLessThan(0);
    });
  });
});
