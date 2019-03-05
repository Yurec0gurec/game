const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const schema = require('./schema');

const PORT = process.env.PORT || 5000;
mongoose.connect('mongodb://admin:admin2019@ds149414.mlab.com:49414/rssgame');

const Model = mongoose.model('users', schema);

const app = express();
app.use(express.static(path.join(__dirname, './../../dist')));

function read(id) {
  return Model.findOne({ _id: id });
}
function readAll() {
  return Model.find({}).sort({ 'score': 'desc' });//eslint-disable-line
}

function score(id) {
  Model.findOneAndUpdate({ _id: id }, { $inc: { 'score': 1 } }).exec(); //eslint-disable-line
}

function createUser(name) {
  const user = new Model();
  user.name = name;
  user.score = 0;
  user.save();
  return user.id;
}

app.get('/user', (req, res) => {
  async function get() {
    const data = await createUser(req.query.name);
    res.json(data);
  }
  get();
});

app.get('/read', (req, res) => {
  async function get() {
    const data = await read(req.query.id);
    res.json(data);
  }
  get();
});

app.get('/score', (req, res) => {
  async function get() {
    score(req.query.id);
    res.end();
  }
  get();
});

app.get('/scores', (req, res) => {
  async function get() {
    const data = await readAll();
    res.json(data);
    res.end();
  }
  get();
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));//eslint-disable-line
