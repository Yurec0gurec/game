import '../../app.js';

describe('Magic', () => {
  it('should prepend to body button element', () => {
    expect(document.body.children[0].nodeName).toBe('BUTTON');
  });
});
