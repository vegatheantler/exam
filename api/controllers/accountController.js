'use strict';


var mongoose = require('mongoose'),
  soap = require('soap'),
  convert = require('xml-js'),
  Account = mongoose.model('Accounts');

var url = process.env.API_ENDPOINT;
exports.add_account = function(req, res) {
  var guid = "";
  var data = req.body;
console.log(req.body);

  soap.createClientAsync(url).then((client) => {
    // Authentication
    var args = {
      "loginName": process.env.API_USER,
      "pinCode": process.env.API_PASS
    };
    return client.IsAuthenticateAsync(args);
  }).then((result) => {
    guid = result[0].IsAuthenticateResult.SessionGUID;

    soap.createClientAsync(url).then((client) => {
    // Add Account
      var acc_args = {
        "password": data['password'],
        "firstName": data['firstName'],
        "lastName": data['lastName'],
        "email": data['email'],
        "BettingProfileId": data['profileId'],
        "currency": data['currency']
      };

      var soapHeader = {
        "AgentSession": {
          "SessionGUID": guid,
          "ErrorCode": "0",
          "IPAddress": "119.9.104.93",
          "IsExtendSession": "true"
        }
      }

      client.addSoapHeader(soapHeader,null,null,"https://entservices.totalegame.net");

      return client.AddAccountAsync(acc_args);
    }).then((result) => {
      var new_account = new Account(result[0].AddAccountResult);
      console.log(new_account);
      new_account.save(function(err, account) {
        if (err)
          res.send(err);
        res.json(account);
      });
    });
  });
};
