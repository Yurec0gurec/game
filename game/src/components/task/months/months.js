import $ from 'jquery';
import GlobalVariables from '../../load/variables.js';

const monthsArr = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь',
];

const daysArr = [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function months() {
  const random = Math.round(Math.random() * 11);
  const month = monthsArr[random];
  const days = daysArr[random];
  GlobalVariables.answer = String(days);
  $('#taskBody').html(`
    <span id="month">${month}</span>
    <input type="text">
  `);
  $('#magicTask').show();
}

export default months;
