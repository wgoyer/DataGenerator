DefectCreator = require '../rally_api/DefectCreator'

exports.createDefects = (req, response) ->

  defectCreator = new DefectCreator req.body, response

  defectCreator.sendRequests()
