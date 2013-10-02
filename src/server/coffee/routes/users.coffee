UserCreator = require '../rally_api/UserCreator'

exports.createUsers = (req, response) ->

  userCreator = new UserCreator req.body, response

  userCreator.sendRequests()
