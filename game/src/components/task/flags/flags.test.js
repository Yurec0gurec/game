import $ from 'jquery';
import flags from './flags.js';

describe('flags', () => {
  it('should show div #magicTask', () => {
    $('body').html('<div id ="magicTask"></div>');
    flags();
    expect($('#magicTask').css('display')).not.toBe('none');
  });
});
