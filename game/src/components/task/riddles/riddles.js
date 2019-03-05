import $ from 'jquery';
import './style.css';
import GlobalVariables from '../../load/variables.js';
import riddlesList from './riddlesList.js';

const riddlesTemplate = `
  <p id="riddle"></p>
  <input type="text">
`;

function questions() {
  $('#taskBody').html(riddlesTemplate);
  const riddlesArr = Object.keys(riddlesList);
  const answer = riddlesArr[Math.round(Math.random() * (riddlesArr.length - 1))];
  $('#riddle').text(riddlesList[answer]);
  GlobalVariables.answer = [answer];
  $('#magicTask').show();
}

export default questions;
