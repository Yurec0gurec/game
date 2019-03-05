import $ from 'jquery';
import capitals from './capitals.js';
import capitalsList from './capitalsList.js';

describe('capitals', () => {
  it('should add to dom capital from capitalsList', () => {
    $('body').html('<span id ="country"></span>');
    capitals();
    expect(Object.keys(capitalsList)).toContain($('#country').text());
  });
});
