(function() {
  var UserCreator;

  UserCreator = require('../rally_api/UserCreator');

  exports.createUsers = function(req, response) {
    var userCreator;
    userCreator = new UserCreator(req.body, response);
    return userCreator.sendRequests();
  };

}).call(this);
