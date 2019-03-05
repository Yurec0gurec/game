import $ from 'jquery';
import GlobalVariables from '../../load/variables.js';

const levelDifficulty = 10;
const operators = ['+', '-', '*'];

function getRandomNumber(max) {
  return Math.round(Math.random() * max);
}

function arithmetics() {
  const operator = operators[getRandomNumber(operators.length - 1)];
  const leftOperand = getRandomNumber(levelDifficulty);
  const rightOperand = getRandomNumber(levelDifficulty);
  const arithmeticsTemplate = `
    <span id="leftOperand">${leftOperand}</span>
    <span id="operator">${operator}</span>
    <span id="rightOperand">${rightOperand}</span>
    <input type="text">
  `;
  $('#taskBody').html(arithmeticsTemplate);

  switch (operator) {
    case '+': GlobalVariables.answer = [String(leftOperand + rightOperand)]; break;
    case '-': GlobalVariables.answer = [String(leftOperand - rightOperand)]; break;
    default: GlobalVariables.answer = [String(leftOperand * rightOperand)];
  }

  $('#magicTask').show();
}

export { arithmetics, getRandomNumber };
