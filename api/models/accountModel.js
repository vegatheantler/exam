'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AccountSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  BettingProfileId: {
    type: Number,
  },
  currency: {
    type: Number,
  },
});

module.exports = mongoose.model('Accounts', AccountSchema);