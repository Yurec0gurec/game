import $ from 'jquery';
import vocabulary from './vocabulary.js';
import GlobalVariables from '../../load/variables.js';

const translateTemplate = `
  <span id="englishWord"></span>
  <input type="text">
`;

function translate() {
  $('#taskBody').html(translateTemplate);
  const english = Object.keys(vocabulary);
  const englishWord = english[Math.round(Math.random() * (english.length - 1))];
  $('#englishWord').text(englishWord);
  GlobalVariables.answer = vocabulary[englishWord];
  $('#magicTask').show();
}

export default translate;
