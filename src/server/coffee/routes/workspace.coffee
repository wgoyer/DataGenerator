ObjectReader = require '../rally_api/ObjectReader'

class WorkspaceReader extends ObjectReader
  uri: '/workspace'

exports.read = (req, response) ->

  new WorkspaceReader(req.body, response).sendRequest()
