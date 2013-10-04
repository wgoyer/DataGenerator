ObjectReader = require '../rally_api/ObjectReader'

class ProjectReader extends ObjectReader
  uri: '/project'

exports.read = (req, response) ->
  
  console.log 'hit project endpoint'

  new ProjectReader(req.body, response).sendRequest()
