'use strict';
module.exports = function(app) {
  var account = require('../controllers/accountController');

  app.route('/AddAccount')
    .post(account.add_account);
};