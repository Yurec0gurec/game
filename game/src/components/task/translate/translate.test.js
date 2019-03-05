import $ from 'jquery';
import translate from './translate.js';
import vocabulary from './vocabulary.js';

describe('translate', () => {
  it('should add to dom word from vocablurary', () => {
    $('body').html('<span id ="englishWord"></span>');
    translate();
    expect(Object.keys(vocabulary)).toContain($('#englishWord').text());
  });
});
