import months from './months.js';
import GlobalVariables from '../../load/variables.js';

describe('months', () => {
  it('should set GlobalVariables.answer with string value', () => {
    months();
    expect(typeof GlobalVariables.answer).toBe('string');
  });
});
