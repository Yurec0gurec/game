const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  score: mongoose.Schema.Types.Number,
  name: mongoose.Schema.Types.String,
});

module.exports = Schema;
