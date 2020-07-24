'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AccountSchema = new Schema({
  CustomerId: {
    type: Number,
  },
  FirstName: {
    type: String,
  },
  LastName: {
    type: String,
  },
  PinCode: {
    type: String,
  },
  ProfileId: {
    type: Number,
  },
});

module.exports = mongoose.model('Accounts', AccountSchema);