import $ from 'jquery';
import GlobalVariables from '../load/variables.js';

function createLi(item) {
  const li = document.createElement('li');
  const spanName = document.createElement('span');
  const spanScore = document.createElement('span');
  spanName.innerHTML = item.name;
  spanScore.innerHTML = item.score;
  li.append(spanName);
  li.append(spanScore);
  return li;
}

async function addUser(name) {
  const response = await fetch(`/user?name=${name}`);
  const data = response.json();
  return data;
}

async function createUser(name) {
  const id = await addUser(name);
  GlobalVariables.gamer.name = name;
  GlobalVariables.gamer.id = id;
}

function incScore() {
  fetch(`/score?id=${GlobalVariables.gamer.id}`);
}

async function win() {
  incScore();
}

function getScores() {
  return fetch('/scores').then(response => response.json());
}

async function loose() {
  $('.gameOver').hide();
  const list = $('#scoreList');
  const scores = await getScores();
  const ul = document.createDocumentFragment();
  scores.forEach(item => ul.append(createLi(item)));
  list.append(ul);
  list.show();
  $('#magic').hide();
  $('#modal .close').hide();
  $('.toLending').show();
  $('#modal').addClass('flex scroll');
}

export {
  createUser, win, loose, createLi,
};
