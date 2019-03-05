import $ from 'jquery';
import './style.css';
import GlobalVariables from '../load/variables.js';
import game from '../../app.js'

function modalWindowHide(event) {
  $('#modal').removeClass('flex scroll');
  $('#magic').fadeOut();
  if (event) {
    $('#scoreList').html(null).hide();
    $('#magicTypeToggle').add('#magicSet').show();
    $('#callMagic').show();
  } else {
    $('#modal .close').show();
  }
}

function modalWindowShow() {
  $('#modal .close').show();
  $('#magicTypeToggle').add('#magicSet').fadeOut();
  $('#magicTypeToggle').add('#magicSet').fadeIn();
  if (game.hero.HP > 0) {
    $('#callMagic').show();
  }
}

$('#modal .close').click(modalWindowHide);

export { modalWindowHide, modalWindowShow };
