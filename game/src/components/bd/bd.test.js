import { createLi } from './bd.js';

describe('task', () => {
  describe('createLi', () => {
    it('should return li element', () => {
      expect(createLi({ name: 'test', record: 'test' }).tagName).toBe('LI');
    });
  });
});
