import $ from 'jquery';
import riddles from './riddles.js';

describe('riddles', () => {
  it('should show div #magicTask', () => {
    $('body').html('<div id ="magicTask"></div>');
    riddles();
    expect($('#magicTask').css('display')).not.toBe('none');
  });
});
