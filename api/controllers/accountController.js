'use strict';


var mongoose = require('mongoose'),
  soap = require('soap'),
  convert = require('xml-js'),
  Account = mongoose.model('Accounts');

 var url = 'https://entv3-200.totalegame.net/';

exports.add_account = function(req, res) {

  var guid = "";

  // Check login session
  soap.createClient(url, function(err, client) {
      var args = {
        "IsAuthenticate": {
          "-xmlns": "https://entservices.totalegame.net",
          "loginName": "api234446",
          "pinCode": "885dc2"
        }
      };

      client.addHttpHeader('soapAction',
        `https://entservices.totalegame.net/IsAuthenticate`);

      client.MyFunction(args, function(err, result) {
          console.log(result);
          let converted = JSON.parse(convert.xml2json(xml, {compact: true, spaces: 4}));

          guid = converted.IsAuthenticateResult.SessionGUID._text;
      });
  });

   // <?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" 
   // xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body>
   // <IsAuthenticateResponse xmlns="https://entservices.totalegame.net"><IsAuthenticateResult><SessionGUID>556ed097-0806-4a66-80c3-557478a5bcf5</SessionGUID><ErrorCode>0</ErrorCode><IPAddress>119.9.104.93</IPAddress><IsExtendSession>true</IsExtendSession><IsSucceed>true</IsSucceed></IsAuthenticateResult></IsAuthenticateResponse></soap:Body></soap:Envelope>[root@task test]#
 


  // Add Account
  soap.createClient(url, function(err, client) {
      var args = {
        "AddAccount": {
          "-xmlns": "https://entservices.totalegame.net",
          "password": "1234",
          "firstName": "Abry2",
          "lastName": "DV2",
          "email": "abry2@test.com",
          "BettingProfileId": "1",
          "currency": "1"
        }
      };

      client.addHttpHeader('soapAction',
        `https://entservices.totalegame.net/AddAccount`);

      var soapHeader = {
        "AgentSession": {
          "-xmlns": "https://entservices.totalegame.net",
          "SessionGUID": guid,
          "ErrorCode": "0",
          "IPAddress": "119.9.104.93",
          "IsExtendSession": "true"
        }
      };

      client.addSoapHeader(soapHeader);

      client.MyFunction(args, function(err, result) {
          console.log(result);
      });
  });

  // Save to DB
  var new_account = new Account(req.body);
  new_account.save(function(err, account) {
    if (err)
      res.send(err);
    res.json(account);
  });
};
