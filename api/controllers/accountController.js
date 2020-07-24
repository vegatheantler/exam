'use strict';


var mongoose = require('mongoose'),
  soap = require('soap'),
  convert = require('xml-js'),
  Account = mongoose.model('Accounts');

var url = 'https://entv3-200.totalegame.net/?WSDL';
  exports.add_account = function(req, res) {
  var guid = "";



  
  soap.createClientAsync(url).then((client) => {
    // Authentication
    var args = {
      "loginName": "api234446",
      "pinCode": "885dc2"
    };
    return client.IsAuthenticateAsync(args);
  }).then((result) => {
    guid = result[0].IsAuthenticateResult.SessionGUID;

    soap.createClientAsync(url).then((client) => {
    // Add Account
      var acc_args = {
        "password": "123456a789",
        "firstName": "Abryy Abry",
        "lastName": "Abryy abry",
        "email": "abry373a@gmail.com",
        "BettingProfileId": "101",
        "currency": "5"
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
