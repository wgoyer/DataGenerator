IterationCreator = require '../rally_api/IterationCreator'

exports.createIteration = (req, response) ->

  iterationCreator = new IterationCreator req.body, response

  iterationCreator.sendRequests()
