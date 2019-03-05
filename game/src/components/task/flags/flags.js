import $ from 'jquery';
import './blank.gif';
import './flags.css';
import countries from './countries.js';
import GlobalVariables from '../../load/variables.js';

function flags() {
  const countriesArr = Object.keys(countries);
  const countryAlias = countriesArr[Math.round(Math.random() * (countriesArr.length - 1))];
  GlobalVariables.answer = countries[countryAlias].toLowerCase();
  $('#taskBody').html(`
    <img src="img/blank.gif" class="flag flag-${countryAlias}" alt="${countries[countryAlias]}">
    <input type="text">`);
  $('#magicTask').show();
}

export default flags;
