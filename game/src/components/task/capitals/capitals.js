import $ from 'jquery';
import GlobalVariables from '../../load/variables.js';
import capitalsList from './capitalsList.js';

const capitalsTemplate = `
  <span id="country"></span>
  <input type="text">
`;

function capitals() {
  $('#taskBody').html(capitalsTemplate);
  const capitalsArr = Object.keys(capitalsList);
  const country = capitalsArr[Math.round(Math.random() * (capitalsArr.length - 1))];
  const capital = capitalsList[country];
  $('#country').text(country);
  GlobalVariables.answer = capital;
  $('#magicTask').show();
}

export default capitals;
