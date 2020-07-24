'use strict';
module.exports = function(app) {
  var account = require('../controllers/accountController');

  app.route('/addaccount')
    .post(account.add_account);
};