ReleaseCreator = require '../rally_api/ReleaseCreator'

exports.createRelease = (req, response) ->

  releaseCreator = new ReleaseCreator req.body, response

  releaseCreator.sendRequests()
