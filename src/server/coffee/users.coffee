UserCreator = require './UserCreator'

exports.createUsers = (req, response) ->

  userCreator = new UserCreator req.body, response

  userCreator.sendRequests()
