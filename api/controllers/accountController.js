'use strict';


var mongoose = require('mongoose'),
  soap = require('soap'),
  convert = require('xml-js'),
  Account = mongoose.model('Accounts');

 var url = 'https://entv3-200.totalegame.net/?WSDL';
 //var url = 'https://entservices.totalegame.net/';
exports.add_account = function(req, res) {
  var guid = "";

  // Check login session
  
//  soap.createClient(url, function(err, client) {
  //    var args = {
        //"IsAuthenticate": {
          //"-xmlns": "https://entservices.totalegame.net",
    //      "loginName": "api234446",
      //    "pinCode": "885dc2"
        //}
      //};

      //client.addHttpHeader('soapAction',
        //`https://entservices.totalegame.net/IsAuthenticate`);

      //client.IsAuthenticate(args, async function(err, result) {
          //console.log(result);
          //console.log(err.message);
          //let converted = JSON.parse(convert.xml2json(result, {compact: true, spaces: 4}));

        //  guid = await result.IsAuthenticateResult.SessionGUID;
         // console.log(guid);
      //});
 // });


   // <?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" 
   // xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body>
   // <IsAuthenticateResponse xmlns="https://entservices.totalegame.net"><IsAuthenticateResult><SessionGUID>556ed097-0806-4a66-80c3-557478a5bcf5</SessionGUID><ErrorCode>0</ErrorCode><IPAddress>119.9.104.93</IPAddress><IsExtendSession>true</IsExtendSession><IsSucceed>true</IsSucceed></IsAuthenticateResult></IsAuthenticateResponse></soap:Body></soap:Envelope>[root@task test]#
 


  
  soap.createClientAsync(url).then((client) => {
    var args = {
      "loginName": "api234446",
      "pinCode": "885dc2"
    };
    return client.IsAuthenticateAsync(args);
  }).then((result) => {
    console.log(result[0]);
    guid = result[0].IsAuthenticateResult.SessionGUID;

    // Add Account
    soap.createClient(url, function(err, client) {
         var acc_args = {
           "password": "123456a789",
           "firstName": "Abry Abry",
           "lastName": "Abry abry",
           "email": "abry33a@gmail.com",
           "BettingProfileId": "101",
           "currency": "5"
         };

       //client.addHttpHeader('soapAction',
       //  'https://entservices.totalegame.net/AddAccount');

       var soapHeader = {
         "AgentSession": {
           //"-xmlns": "https://entservices.totalegame.net",
           "SessionGUID": guid,
           "ErrorCode": "0",
           "IPAddress": "119.9.104.93",
           "IsExtendSession": "true"
         }
       }

       client.addSoapHeader(soapHeader,null,null,"https://entservices.totalegame.net");

       client.AddAccount(acc_args, function(err, result) {
           //console.log(client);
           //console.log(result);
           console.log(err);
       });
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
