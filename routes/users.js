(function() {
  var UserCreator;

  UserCreator = require('./UserCreator');

  exports.createUsers = function(req, response) {
    var userCreator;
    userCreator = new UserCreator(req.body, response);
    return userCreator.sendRequests();
  };

}).call(this);
