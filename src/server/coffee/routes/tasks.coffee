TaskCreator = require '../rally_api/TaskCreator'

exports.createTasks = (req, response) ->

  new TaskCreator(req.body, response).sendRequests()
