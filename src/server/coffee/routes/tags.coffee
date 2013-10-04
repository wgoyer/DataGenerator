TagCreator = require '../rally_api/TagCreator'

exports.createTags = (req, response) ->

  new TagCreator(req.body, response).sendRequests()
