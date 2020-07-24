'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AccountSchema = new Schema({
  CustomerId: {
    type: Number,
  },
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  PinCode: {
    type: String,
    required: true,
    min: 6,
    max: 12,
  },
  ProfileId: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Accounts', AccountSchema);